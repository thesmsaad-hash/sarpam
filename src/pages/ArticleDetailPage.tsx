import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Bookmark, BookmarkCheck, ArrowLeft, Share2, Check } from 'lucide-react';
import { BlogPost } from '../types/blog';
import { ArticleRenderer } from '../components/ArticleRenderer';
import { ArticleCard } from '../components/ArticleCard';
import { SEOHead } from '../components/SEOHead';

interface Props {
  article: BlogPost;
  allArticles: BlogPost[];
  onSelectArticle: (article: BlogPost) => void;
  onBack: () => void;
  onNavigateCategory: (category: string) => void;
}

export const ArticleDetailPage: React.FC<Props> = ({
  article,
  allArticles,
  onSelectArticle,
  onBack,
  onNavigateCategory
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Scroll Reading Progress Indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const saved = localStorage.getItem(`sarpam_bookmark_${article.id}`);
    setIsBookmarked(saved === 'true');
  }, [article.id]);

  const toggleBookmark = () => {
    const nextState = !isBookmarked;
    setIsBookmarked(nextState);
    localStorage.setItem(`sarpam_bookmark_${article.id}`, String(nextState));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const relatedArticles = allArticles
    .filter(a => a.id !== article.id && a.category === article.category && a.status === 'published')
    .slice(0, 3);

  return (
    <div className="pt-24 pb-20">
      <SEOHead article={article} />

      {/* Sticky Framer Motion Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0F766E] via-[#5EEAD4] to-[#D4AF37] z-50 origin-left"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs & Toolbar */}
        <div className="py-6 flex items-center justify-between text-xs font-mono text-[#A1A1AA]">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <span>/</span>
            <button onClick={() => onNavigateCategory(article.category)} className="text-[#5EEAD4] hover:underline">
              {article.category}
            </button>
            <span>/</span>
            <span className="truncate max-w-xs text-white/50">{article.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleBookmark}
              title="Bookmark Article"
              className={`p-2 rounded-full border transition-colors ${
                isBookmarked
                  ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]'
                  : 'bg-white/5 border-white/10 text-[#A1A1AA] hover:text-white'
              }`}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
            <button
              onClick={handleShare}
              title="Share Article Link"
              className="p-2 rounded-full bg-white/5 border border-white/10 text-[#A1A1AA] hover:text-white transition-colors"
            >
              {copiedLink ? <Check className="w-4 h-4 text-[#10B981]" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Shared Article Renderer */}
        <ArticleRenderer article={article} />

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="mt-24 pt-12 border-t border-white/10 max-w-5xl mx-auto">
            <h3 className="text-2xl font-display font-bold text-white mb-8">
              Related Research Publications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.id} article={rel} onSelect={onSelectArticle} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
