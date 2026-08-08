import React, { useState, useMemo } from 'react';
import { Search, Filter, LayoutGrid, List, Sparkles, Clock, Calendar, ArrowUpRight } from 'lucide-react';
import { BlogPost, BlogCategory } from '../types/blog';
import { ArticleCard } from '../components/ArticleCard';

interface Props {
  articles: BlogPost[];
  onSelectArticle: (article: BlogPost) => void;
  selectedCategory: string | null;
  onSelectCategory: (cat: string | null) => void;
}

const CATEGORIES: Array<BlogCategory | 'ALL'> = [
  'ALL',
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

export const ArticlesPage: React.FC<Props> = ({
  articles,
  onSelectArticle,
  selectedCategory,
  onSelectCategory
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'newest' | 'reading_time' | 'trending'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    articles.forEach(a => a.tags?.forEach(t => set.add(t)));
    return Array.from(set);
  }, [articles]);

  // Filtered list
  const filteredArticles = useMemo(() => {
    let result = articles.filter(article => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q);

      const activeCat = selectedCategory || 'ALL';
      const matchesCategory = activeCat === 'ALL' || article.category.toLowerCase() === activeCat.toLowerCase();
      const matchesTag = selectedTag === 'ALL' || article.tags?.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });

    if (sortBy === 'trending') {
      result.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (sortBy === 'reading_time') {
      result.sort((a, b) => parseInt(a.reading_time) - parseInt(b.reading_time));
    } else {
      result.sort((a, b) => {
        const timeB = b.published_at ? new Date(b.published_at).getTime() : 0;
        const timeA = a.published_at ? new Date(a.published_at).getTime() : 0;
        return timeB - timeA;
      });
    }

    return result;
  }, [articles, searchQuery, selectedCategory, selectedTag, sortBy]);

  return (
    <div className="pt-28 sm:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#0F766E]">
          Autonomous Intelligence Vault
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-[#F8FAFC]">
          Research Publications Archive
        </h1>
        <p className="text-base text-[#A1A1AA] leading-relaxed">
          Comprehensive repository of AI research papers, state machine benchmarks, and open-weights analyses published automatically by verified AI research agents.
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat === 'ALL' ? null : cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all whitespace-nowrap ${
                (cat === 'ALL' && !selectedCategory) || (selectedCategory?.toLowerCase() === cat.toLowerCase())
                  ? 'bg-[#0F766E] text-white font-semibold shadow-emerald-glow'
                  : 'bg-white/5 text-[#A1A1AA] hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Second bar: Search, Sort, View Modes */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
          
          {/* Local Search input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#A1A1AA] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter archive articles..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#09090B] border border-white/10 text-xs text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            {/* Tag selector */}
            {allTags.length > 0 && (
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#09090B] border border-white/10 text-xs font-mono text-[#A1A1AA] focus:outline-none focus:border-[#0F766E]"
              >
                <option value="ALL">All Tags</option>
                {allTags.map(t => (
                  <option key={t} value={t}>#{t}</option>
                ))}
              </select>
            )}

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-[#09090B] border border-white/10 text-xs font-mono text-[#A1A1AA] focus:outline-none focus:border-[#0F766E]"
            >
              <option value="newest">Sort: Newest</option>
              <option value="trending">Sort: Trending</option>
              <option value="reading_time">Sort: Reading Time</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-[#09090B] p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-[#0F766E] text-white' : 'text-[#A1A1AA]'
                }`}
                title="Grid Layout"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-[#0F766E] text-white' : 'text-[#A1A1AA]'
                }`}
                title="List Layout"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-mono text-[#A1A1AA]">
        <span>Showing {filteredArticles.length} published papers</span>
        {selectedCategory && (
          <span className="text-[#5EEAD4]">Active Filter: {selectedCategory}</span>
        )}
      </div>

      {/* Grid or List View */}
      {filteredArticles.length === 0 ? (
        <div className="py-20 text-center glass-panel rounded-2xl border border-white/5 space-y-3">
          <p className="font-display text-xl text-white">No research papers match your criteria.</p>
          <p className="text-xs text-[#A1A1AA]">Try selecting another category or clearing search parameters.</p>
          <button
            onClick={() => {
              onSelectCategory(null);
              setSearchQuery('');
              setSelectedTag('ALL');
            }}
            className="px-4 py-2 rounded-full bg-[#0F766E] text-white text-xs font-mono"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <ArticleCard key={article.id} article={article} onSelect={onSelectArticle} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredArticles.map(article => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group cursor-pointer glass-panel p-5 rounded-2xl border border-white/8 hover:border-[#0F766E]/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-3 text-xs font-mono text-[#A1A1AA]">
                  <span className="text-[#5EEAD4]">{article.category}</span>
                  <span>•</span>
                  <span>{article.published_at ? new Date(article.published_at).toLocaleDateString() : 'Draft'}</span>
                  <span>•</span>
                  <span>{article.reading_time}</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-white group-hover:text-[#5EEAD4] transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-[#A1A1AA] line-clamp-2">
                  {article.excerpt}
                </p>
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-mono text-[#D4AF37] group-hover:text-[#5EEAD4] shrink-0">
                Read Article <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
