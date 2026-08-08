import React, { useState, useEffect } from 'react';
import { FileText, Clock, CheckCircle2, XCircle, Plus, LogOut, Terminal, Layers, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { BlogPost, ArticleStatus } from '../types/blog';
import { articleService } from '../services/articleService';
import { AdminDashboard } from './AdminDashboard';
import { AdminEditor } from './AdminEditor';
import { AdminPreview } from './AdminPreview';
import { N8nSimulatorModal } from './N8nSimulatorModal';
import { SarpamEmblem } from '../components/SarpamEmblem';
import { supabase } from '../lib/supabase';

interface Props {
  onExitAdmin: () => void;
}

type AdminTab = 'dashboard' | 'drafts' | 'review' | 'published' | 'rejected' | 'editor' | 'preview' | 'new';

export const AdminLayout: React.FC<Props> = ({ onExitAdmin }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Partial<BlogPost> | null>(null);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [dbStatus, setDbStatus] = useState<'connected' | 'error' | 'testing'>('testing');
  const [dbError, setDbError] = useState<string | null>(null);

  const fetchAdminArticles = async () => {
    setLoading(true);
    setDbStatus('testing');
    
    // Diagnostic query test
    if (supabase) {
      const diag = await supabase.from('blogs').select('id,title,slug,status,created_at').order('created_at', { ascending: false });
      console.log('SUPABASE BLOGS TEST:', diag);
      if (diag.error) {
        console.error('Supabase test query error:', diag.error);
        setDbStatus('error');
        setDbError(diag.error.message);
      } else {
        setDbStatus('connected');
        setDbError(null);
      }
    }

    const result = await articleService.getAdminArticlesByStatus();
    console.log('ADMIN ARTICLES FROM SUPABASE:', result.articles);
    setArticles(result.articles);
    if (result.error) {
      setDbStatus('error');
      setDbError(result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAdminArticles();
  }, []);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    onExitAdmin();
  };

  // Action Handlers
  const handleSaveDraft = async (artPayload: Partial<BlogPost>) => {
    if (artPayload.id) {
      await articleService.updateArticle(artPayload.id, { ...artPayload, status: 'draft' });
      showNotify('Draft saved successfully.');
    } else {
      const res = await articleService.createArticle({ ...artPayload, status: 'draft' });
      if (res.article) setSelectedArticle(res.article);
      showNotify('New draft created.');
    }
    fetchAdminArticles();
  };

  const handleMoveToReview = async (articleId: string) => {
    await articleService.moveToReview(articleId);
    showNotify('Article moved to Review Queue.');
    fetchAdminArticles();
    setActiveTab('review');
  };

  const handleReject = async (articleId: string, reason: string) => {
    await articleService.rejectArticle(articleId, reason);
    showNotify('Article rejected with feedback.');
    fetchAdminArticles();
    setActiveTab('rejected');
  };

  const handleApproveAndPublish = async (articleId: string) => {
    const res = await articleService.approveAndPublish(articleId);
    if (res.success) {
      showNotify('Article approved & published to Supabase! Now live publicly.');
      fetchAdminArticles();
      setActiveTab('published');
    } else {
      showNotify(`Publication Error: ${res.error}`);
    }
  };

  const filteredArticles = articles.filter(a => {
    if (activeTab === 'drafts') return a.status === 'draft';
    if (activeTab === 'review') return a.status === 'review';
    if (activeTab === 'published') return a.status === 'published';
    if (activeTab === 'rejected') return a.status === 'rejected';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#09090B] text-[#F8FAFC] flex flex-col font-sans selection:bg-[#0F766E]/40 selection:text-[#D4AF37]">
      
      {/* CMS Header */}
      <header className="sticky top-0 z-40 bg-[#111113]/90 backdrop-blur-xl border-b border-white/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <SarpamEmblem className="w-8 h-8 text-[#0F766E]" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-xl text-white">SARPAM</span>
                <span className="px-2 py-0.5 rounded bg-[#0F766E]/20 text-[#5EEAD4] border border-[#0F766E]/40 text-[10px] font-mono uppercase font-bold">
                  Admin CMS
                </span>
              </div>
              <p className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-widest">
                Human Editorial Approval Gate
              </p>
            </div>
          </div>

          {/* CMS Tabs Navigation */}
          <nav className="flex items-center gap-1 glass-panel p-1 rounded-full border border-white/10 text-xs font-mono">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-1.5 rounded-full transition-colors ${
                activeTab === 'dashboard' ? 'bg-[#0F766E] text-white font-bold' : 'text-[#A1A1AA] hover:text-white'
              }`}
            >
              Control Center
            </button>
            <button
              onClick={() => setActiveTab('drafts')}
              className={`px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1 ${
                activeTab === 'drafts' ? 'bg-[#0F766E] text-white font-bold' : 'text-[#A1A1AA] hover:text-white'
              }`}
            >
              <span>Drafts</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white/10 text-[10px]">
                {articles.filter(a => a.status === 'draft').length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('review')}
              className={`px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1 ${
                activeTab === 'review' ? 'bg-[#0F766E] text-white font-bold' : 'text-[#A1A1AA] hover:text-white'
              }`}
            >
              <span>Review Queue</span>
              <span className="px-1.5 py-0.2 rounded-full bg-[#5EEAD4]/20 text-[#5EEAD4] text-[10px]">
                {articles.filter(a => a.status === 'review').length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('published')}
              className={`px-3.5 py-1.5 rounded-full transition-colors ${
                activeTab === 'published' ? 'bg-[#0F766E] text-white font-bold' : 'text-[#A1A1AA] hover:text-white'
              }`}
            >
              Published ({articles.filter(a => a.status === 'published').length})
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`px-3.5 py-1.5 rounded-full transition-colors ${
                activeTab === 'rejected' ? 'bg-[#0F766E] text-white font-bold' : 'text-[#A1A1AA] hover:text-white'
              }`}
            >
              Rejected ({articles.filter(a => a.status === 'rejected').length})
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Supabase Connection Status Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
              <span className={`w-2 h-2 rounded-full ${dbStatus === 'connected' ? 'bg-[#10B981] animate-pulse' : dbStatus === 'error' ? 'bg-red-400' : 'bg-[#D4AF37]'}`} />
              <span className="text-[#A1A1AA]">
                Supabase: <strong className={dbStatus === 'connected' ? 'text-[#10B981]' : dbStatus === 'error' ? 'text-red-400' : 'text-[#D4AF37]'}>
                  {dbStatus === 'connected' ? 'Connected' : dbStatus === 'error' ? 'Connection Error' : 'Testing...'}
                </strong>
              </span>
            </div>

            {/* Refresh Articles Button */}
            <button
              onClick={fetchAdminArticles}
              title="Refresh Articles from Supabase Database"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors text-xs font-mono flex items-center gap-1.5 px-3"
            >
              <span>Refresh Articles</span>
            </button>

            <button
              onClick={() => setIsSimulatorOpen(true)}
              title="Simulate POST draft ingestion"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#5EEAD4] border border-white/10 transition-colors text-xs font-mono flex items-center gap-1.5 px-3"
            >
              <Terminal className="w-4 h-4" />
              <span className="hidden sm:inline">Simulate Ingestion</span>
            </button>

            <button
              onClick={handleSignOut}
              title="Exit Admin CMS"
              className="p-2 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main CMS View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Toast Notification */}
        {notification && (
          <div className="mb-6 p-4 rounded-xl bg-[#0F766E]/20 border border-[#0F766E]/40 text-[#5EEAD4] text-xs font-mono flex items-center gap-2 animate-fade-in shadow-emerald-glow">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>{notification}</span>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <AdminDashboard
            articles={articles}
            onSelectTab={(tab) => {
              if (tab === 'new') {
                setSelectedArticle({ title: '', content: '', category: 'LLMs' });
                setActiveTab('new');
              } else {
                setActiveTab(tab);
              }
            }}
            onSelectArticle={(art) => {
              setSelectedArticle(art);
              setActiveTab('preview');
            }}
          />
        )}

        {activeTab === 'new' && (
          <AdminEditor
            article={{ title: '', content: '', category: 'LLMs' }}
            onSaveDraft={handleSaveDraft}
            onPreview={(art) => {
              setSelectedArticle(art);
              setActiveTab('preview');
            }}
            onBack={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'editor' && selectedArticle && (
          <AdminEditor
            article={selectedArticle}
            onSaveDraft={handleSaveDraft}
            onPreview={(art) => {
              setSelectedArticle(art);
              setActiveTab('preview');
            }}
            onBack={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'preview' && selectedArticle && (
          <AdminPreview
            article={selectedArticle}
            onSaveDraft={handleSaveDraft}
            onMoveToReview={handleMoveToReview}
            onReject={handleReject}
            onApproveAndPublish={handleApproveAndPublish}
            onBackToEdit={() => setActiveTab('editor')}
          />
        )}

        {(activeTab === 'drafts' || activeTab === 'review' || activeTab === 'published' || activeTab === 'rejected') && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display font-bold text-white capitalize">{activeTab} Articles</h2>
                <p className="text-xs font-mono text-[#A1A1AA]">
                  {activeTab === 'drafts' && 'Articles ingested from pipeline or created manually awaiting review.'}
                  {activeTab === 'review' && 'Articles currently in peer fact-checking and metadata verification.'}
                  {activeTab === 'published' && 'Articles currently live on the public Sarpam website.'}
                  {activeTab === 'rejected' && 'Articles rejected due to factual or source verification issues.'}
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedArticle({ title: '', content: '', category: 'LLMs' });
                  setActiveTab('new');
                }}
                className="px-5 py-2.5 rounded-full bg-[#0F766E] text-white text-xs font-mono font-semibold hover:bg-[#14B8A6] flex items-center gap-2 shadow-emerald-glow"
              >
                <Plus className="w-4 h-4" />
                <span>New Article</span>
              </button>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="py-16 text-center glass-panel rounded-2xl border border-white/5 space-y-2">
                <p className="font-display text-lg text-white">No articles in {activeTab} stage.</p>
                <p className="text-xs text-[#A1A1AA]">Automated research drafts will appear here as they are generated.</p>
              </div>
            ) : (
              <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden divide-y divide-white/5">
                {filteredArticles.map(art => (
                  <div
                    key={art.id}
                    className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="space-y-1.5 max-w-3xl">
                      <div className="flex items-center gap-3 text-xs font-mono">
                        <span className="text-[#5EEAD4] font-bold">{art.category}</span>
                        <span>•</span>
                        <span className="text-[#A1A1AA]">Source: {art.content_source || 'Autonomous Pipeline'}</span>
                        {art.rejection_reason && (
                          <span className="text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                            Reason: {art.rejection_reason}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-display font-semibold text-white">
                        {art.title}
                      </h3>
                      <p className="text-xs text-[#A1A1AA] line-clamp-2">
                        {art.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
                      <button
                        onClick={() => {
                          setSelectedArticle(art);
                          setActiveTab('editor');
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedArticle(art);
                          setActiveTab('preview');
                        }}
                        className="px-4 py-1.5 rounded-lg bg-[#0F766E] text-white font-semibold hover:bg-[#14B8A6] shadow-emerald-glow"
                      >
                        Preview & Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* Simulator Modal */}
      <N8nSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        onDraftCreated={() => {
          fetchAdminArticles();
          setActiveTab('drafts');
        }}
      />

    </div>
  );
};
