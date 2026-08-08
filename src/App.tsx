import React, { useState, useEffect, useCallback } from 'react';
import { ViewState, BlogPost } from './types/blog';
import { articleService } from './services/articleService';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { RSSModal } from './components/RSSModal';
import { SitemapModal } from './components/SitemapModal';
import { SupabaseSetupModal } from './components/SupabaseSetupModal';
import { EditorialErrorState } from './components/EditorialErrorState';
import { SEOHead } from './components/SEOHead';

// Public Page Views
import { HomePage } from './pages/HomePage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin CMS Architecture
import { AdminAuth } from './admin/AdminAuth';
import { AdminLayout } from './admin/AdminLayout';

export const App: React.FC = () => {
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // View state & navigation parameters
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRssOpen, setIsRssOpen] = useState(false);
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);

  // Sync URL path with application state (/research, /research/:slug, /categories, /about, /admin)
  const parsePathAndSetState = useCallback((allArts: BlogPost[]) => {
    const path = window.location.pathname.toLowerCase();

    if (path === '/admin') {
      setCurrentView('admin');
    } else if (path === '/' || path === '') {
      setCurrentView('home');
      setSelectedArticle(null);
      setSelectedCategory(null);
    } else if (path === '/research' || path === '/articles') {
      setCurrentView('articles');
      setSelectedArticle(null);
      setSelectedCategory(null);
    } else if (path.startsWith('/research/') || path.startsWith('/articles/') || path.startsWith('/article/')) {
      const slug = path.replace('/research/', '').replace('/articles/', '').replace('/article/', '');
      const found = allArts.find(a => a.slug === slug);
      if (found) {
        setSelectedArticle(found);
        setCurrentView('article-detail');
      } else {
        setCurrentView('404');
      }
    } else if (path === '/categories') {
      setCurrentView('categories');
      setSelectedArticle(null);
      setSelectedCategory(null);
    } else if (path.startsWith('/categories/')) {
      const cat = decodeURIComponent(path.replace('/categories/', ''));
      setSelectedCategory(cat);
      setCurrentView('articles');
    } else if (path === '/about') {
      setCurrentView('about');
      setSelectedArticle(null);
    } else if (path === '/search') {
      setIsSearchOpen(true);
    } else if (path === '/privacy') {
      setCurrentView('privacy');
    } else if (path === '/terms') {
      setCurrentView('terms');
    } else {
      setCurrentView('404');
    }
  }, []);

  // Fetch published articles from Supabase (status = 'published' ONLY)
  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    const result = await articleService.getPublishedArticles();
    if (result.error) {
      setErrorMessage(result.error);
    } else {
      setArticles(result.articles);
      parsePathAndSetState(result.articles);
    }
    setIsLoading(false);
  }, [parsePathAndSetState]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Listen to popstate (Browser back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      parsePathAndSetState(articles);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [articles, parsePathAndSetState]);

  // Command+K search shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Clean Navigation Helper updating address bar URL
  const navigateTo = (view: ViewState, extraSlug?: string) => {
    setCurrentView(view);
    let targetPath = '/';

    if (view === 'admin') targetPath = '/admin';
    else if (view === 'home') targetPath = '/';
    else if (view === 'articles') targetPath = selectedCategory ? `/categories/${encodeURIComponent(selectedCategory)}` : '/research';
    else if (view === 'article-detail' && (extraSlug || selectedArticle?.slug)) targetPath = `/research/${extraSlug || selectedArticle?.slug}`;
    else if (view === 'categories') targetPath = '/categories';
    else if (view === 'about') targetPath = '/about';
    else if (view === 'privacy') targetPath = '/privacy';
    else if (view === 'terms') targetPath = '/terms';
    else if (view === '404') targetPath = '/404';

    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (article: BlogPost) => {
    setSelectedArticle(article);
    navigateTo('article-detail', article.slug);
  };

  const handleSelectCategory = (cat: string | null) => {
    setSelectedCategory(cat);
    if (cat) {
      if (window.location.pathname !== `/categories/${encodeURIComponent(cat)}`) {
        window.history.pushState({}, '', `/categories/${encodeURIComponent(cat)}`);
      }
      setCurrentView('articles');
    } else {
      navigateTo('articles');
    }
  };

  // Dedicated Admin Route View
  if (currentView === 'admin') {
    if (!isAdminAuthenticated) {
      return <AdminAuth onAuthenticated={() => setIsAdminAuthenticated(true)} />;
    }
    return <AdminLayout onExitAdmin={() => navigateTo('home')} />;
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-[#F8FAFC] flex flex-col justify-between font-sans selection:bg-[#0F766E]/40 selection:text-[#D4AF37] relative overflow-x-hidden">
      
      {/* Dynamic SEO & Structured Data */}
      <SEOHead article={currentView === 'article-detail' ? selectedArticle : null} />

      {/* Header Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenRss={() => setIsRssOpen(true)}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main View Router */}
      <main className="flex-1 relative z-10">
        
        {/* Loading Spinner */}
        {isLoading ? (
          <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 rounded-full border-2 border-[#0F766E]/30 border-t-[#0F766E] animate-spin" />
            <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-widest animate-pulse">
              Querying Published Research Vault...
            </p>
          </div>
        ) : errorMessage && articles.length === 0 ? (
          /* Editorial Failure Error State */
          <EditorialErrorState onRetry={fetchArticles} message={errorMessage} />
        ) : (
          <>
            {currentView === 'home' && (
              <HomePage
                articles={articles}
                onSelectArticle={handleSelectArticle}
                onNavigateArticles={() => navigateTo('articles')}
                onSelectCategory={handleSelectCategory}
              />
            )}

            {currentView === 'articles' && (
              <ArticlesPage
                articles={articles}
                onSelectArticle={handleSelectArticle}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            )}

            {currentView === 'article-detail' && selectedArticle && (
              <ArticleDetailPage
                article={selectedArticle}
                allArticles={articles}
                onSelectArticle={handleSelectArticle}
                onBack={() => navigateTo('articles')}
                onNavigateCategory={handleSelectCategory}
              />
            )}

            {currentView === 'categories' && (
              <CategoriesPage
                articles={articles}
                onSelectCategory={handleSelectCategory}
              />
            )}

            {currentView === 'about' && (
              <AboutPage
                onNavigateArticles={() => navigateTo('articles')}
                onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
              />
            )}

            {currentView === 'privacy' && <PrivacyPage />}

            {currentView === 'terms' && <TermsPage />}

            {currentView === '404' && (
              <NotFoundPage
                onNavigateHome={() => navigateTo('home')}
                onNavigateArticles={() => navigateTo('articles')}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenRss={() => setIsRssOpen(true)}
        onOpenSitemap={() => setIsSitemapOpen(true)}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
      />

      {/* Auxiliary Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={articles}
        onSelectArticle={handleSelectArticle}
      />

      <RSSModal
        isOpen={isRssOpen}
        onClose={() => setIsRssOpen(false)}
        articles={articles}
      />

      <SitemapModal
        isOpen={isSitemapOpen}
        onClose={() => setIsSitemapOpen(false)}
        articles={articles}
      />

      <SupabaseSetupModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
      />

    </div>
  );
};

export default App;
