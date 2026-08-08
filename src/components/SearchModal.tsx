import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, Filter, Clock, Calendar, ArrowUpRight, Sparkles } from 'lucide-react';
import { BlogPost, BlogCategory } from '../types/blog';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  articles: BlogPost[];
  onSelectArticle: (article: BlogPost) => void;
}

const CATEGORIES: BlogCategory[] = [
  'LLMs',
  'AI Agents',
  'Open Source',
  'Robotics',
  'Research Papers',
  'Computer Vision',
  'Generative AI',
  'Startups',
  'Tutorials'
];

export const SearchModal: React.FC<Props> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'newest' | 'trending'>('newest');

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    articles.forEach(a => a.tags?.forEach(t => set.add(t)));
    return Array.from(set);
  }, [articles]);

  // Handle ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Filtered & sorted articles
  const filteredArticles = useMemo(() => {
    let result = articles.filter(article => {
      const q = query.toLowerCase().trim();
      const matchesQuery =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.content.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q) ||
        article.tags?.some(t => t.toLowerCase().includes(q));

      const matchesCat = selectedCategory === 'ALL' || article.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesTag = selectedTag === 'ALL' || article.tags?.includes(selectedTag);

      return matchesQuery && matchesCat && matchesTag;
    });

    if (sortBy === 'trending') {
      result.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else {
      result.sort((a, b) => {
        const timeB = b.published_at ? new Date(b.published_at).getTime() : 0;
        const timeA = a.published_at ? new Date(a.published_at).getTime() : 0;
        return timeB - timeA;
      });
    }

    return result;
  }, [articles, query, selectedCategory, selectedTag, sortBy]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto pb-12">
      <div className="relative w-full max-w-4xl glass-panel rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        
        {/* Search Bar Input */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center gap-3 bg-[#111113]">
          <Search className="w-5 h-5 text-[#0F766E] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Instant search by paper title, deep topics, code, or author..."
            className="w-full bg-transparent text-[#F8FAFC] placeholder-[#A1A1AA] text-base sm:text-lg focus:outline-none font-sans"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#A1A1AA] hover:text-white text-xs font-mono px-2 py-1 bg-white/5 rounded"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 text-[#A1A1AA] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters Toolbar */}
        <div className="p-4 bg-[#09090B] border-b border-white/5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
              <span className="text-[#A1A1AA] font-mono text-[11px] uppercase mr-1">Category:</span>
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                  selectedCategory === 'ALL'
                    ? 'bg-[#0F766E] text-white font-semibold'
                    : 'bg-white/5 text-[#A1A1AA] hover:text-white'
                }`}
              >
                ALL
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-colors whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#0F766E] text-white font-semibold'
                      : 'bg-white/5 text-[#A1A1AA] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Toggle */}
            <div className="flex items-center gap-1 font-mono text-xs bg-white/5 p-1 rounded-lg">
              <button
                onClick={() => setSortBy('newest')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  sortBy === 'newest' ? 'bg-[#0F766E] text-white' : 'text-[#A1A1AA]'
                }`}
              >
                Newest
              </button>
              <button
                onClick={() => setSortBy('trending')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  sortBy === 'trending' ? 'bg-[#0F766E] text-white' : 'text-[#A1A1AA]'
                }`}
              >
                Trending
              </button>
            </div>
          </div>

          {/* Tag Selector */}
          {allTags.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs">
              <span className="text-[#A1A1AA] font-mono text-[11px] uppercase mr-1">Tag Filter:</span>
              <button
                onClick={() => setSelectedTag('ALL')}
                className={`px-2.5 py-0.5 rounded text-[11px] font-mono ${
                  selectedTag === 'ALL'
                    ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40'
                    : 'bg-white/5 text-[#A1A1AA]'
                }`}
              >
                #all
              </button>
              {allTags.slice(0, 10).map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-mono transition-colors ${
                    selectedTag === tag
                      ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40'
                      : 'bg-white/5 text-[#A1A1AA] hover:text-white'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results List */}
        <div className="p-4 sm:p-6 max-h-[55vh] overflow-y-auto divide-y divide-white/5">
          <div className="text-xs text-[#A1A1AA] font-mono mb-3 flex items-center justify-between">
            <span>Showing {filteredArticles.length} research papers</span>
            {query && <span>Query: "{query}"</span>}
          </div>

          {filteredArticles.length === 0 ? (
            <div className="py-12 text-center text-[#A1A1AA]">
              <p className="font-display text-lg mb-1 text-white">No research articles match your search criteria.</p>
              <p className="text-xs">Try clearing tag or category filters.</p>
            </div>
          ) : (
            filteredArticles.map(article => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article);
                  onClose();
                }}
                className="py-4 cursor-pointer group hover:bg-white/[0.02] px-2 rounded-xl transition-colors flex items-start justify-between gap-4"
              >
                <div className="space-y-1 max-w-3xl">
                  <div className="flex items-center gap-3 text-[11px] text-[#A1A1AA] font-mono">
                    <span className="text-[#5EEAD4] font-medium">{article.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#D4AF37]" />
                      {article.reading_time}
                    </span>
                    <span>•</span>
                    <span>{article.published_at ? new Date(article.published_at).toLocaleDateString() : 'Draft'}</span>
                  </div>

                  <h4 className="text-base font-display font-semibold text-[#F8FAFC] group-hover:text-[#5EEAD4] transition-colors leading-snug">
                    {article.title}
                  </h4>

                  <p className="text-xs text-[#A1A1AA] line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <ArrowUpRight className="w-5 h-5 text-[#D4AF37] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0 mt-2" />
              </div>
            ))
          )}
        </div>

        <div className="p-3 bg-[#09090B] border-t border-white/10 text-center text-[11px] text-[#A1A1AA] font-mono">
          Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white">ESC</kbd> or click outside to dismiss
        </div>
      </div>
    </div>
  );
};
