import React from 'react';
import { FileText, Clock, CheckCircle2, XCircle, Plus, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { BlogPost, ArticleStatus } from '../types/blog';

interface Props {
  articles: BlogPost[];
  onSelectTab: (tab: 'drafts' | 'review' | 'published' | 'rejected' | 'new') => void;
  onSelectArticle: (article: BlogPost) => void;
}

export const AdminDashboard: React.FC<Props> = ({ articles, onSelectTab, onSelectArticle }) => {
  const drafts = articles.filter(a => a.status === 'draft');
  const reviewQueue = articles.filter(a => a.status === 'review');
  const published = articles.filter(a => a.status === 'published');
  const rejected = articles.filter(a => a.status === 'rejected');

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#0F766E]">
            Editorial Governance
          </span>
          <h1 className="text-3xl font-display font-bold text-white">
            Newsroom Control Center
          </h1>
        </div>

        <button
          onClick={() => onSelectTab('new')}
          className="px-6 py-3 rounded-full bg-[#0F766E] text-white text-xs font-mono font-semibold hover:bg-[#14B8A6] transition-colors flex items-center gap-2 shadow-emerald-glow active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Create Manual Article</span>
        </button>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Drafts */}
        <div
          onClick={() => onSelectTab('drafts')}
          className="cursor-pointer glass-panel p-6 rounded-2xl border border-white/8 hover:border-[#D4AF37]/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-[#A1A1AA] uppercase">Ingested & Manual Drafts</span>
            <FileText className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <p className="text-4xl font-display font-bold text-white group-hover:text-[#D4AF37] transition-colors">
            {drafts.length}
          </p>
          <p className="text-xs text-[#A1A1AA] mt-2">Awaiting Editorial Review</p>
        </div>

        {/* Review Queue */}
        <div
          onClick={() => onSelectTab('review')}
          className="cursor-pointer glass-panel p-6 rounded-2xl border border-white/8 hover:border-[#5EEAD4]/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-[#A1A1AA] uppercase">Awaiting Verification</span>
            <Clock className="w-5 h-5 text-[#5EEAD4]" />
          </div>
          <p className="text-4xl font-display font-bold text-white group-hover:text-[#5EEAD4] transition-colors">
            {reviewQueue.length}
          </p>
          <p className="text-xs text-[#A1A1AA] mt-2">In Active Peer Verification</p>
        </div>

        {/* Published */}
        <div
          onClick={() => onSelectTab('published')}
          className="cursor-pointer glass-panel p-6 rounded-2xl border border-white/8 hover:border-[#10B981]/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-[#A1A1AA] uppercase">Published Papers</span>
            <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
          </div>
          <p className="text-4xl font-display font-bold text-white group-hover:text-[#10B981] transition-colors">
            {published.length}
          </p>
          <p className="text-xs text-[#A1A1AA] mt-2">Live on Public Website</p>
        </div>

        {/* Rejected */}
        <div
          onClick={() => onSelectTab('rejected')}
          className="cursor-pointer glass-panel p-6 rounded-2xl border border-white/8 hover:border-red-500/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-[#A1A1AA] uppercase">Rejected Submissions</span>
            <XCircle className="w-5 h-5 text-red-400" />
          </div>
          <p className="text-4xl font-display font-bold text-white group-hover:text-red-400 transition-colors">
            {rejected.length}
          </p>
          <p className="text-xs text-[#A1A1AA] mt-2">Failed Fact Check</p>
        </div>
      </div>

      {/* Recent Submissions List */}
      <div className="glass-panel rounded-2xl border border-white/10 p-6 space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#0F766E]" />
            <span>Recent Ingested Articles</span>
          </h3>
          <span className="text-xs font-mono text-[#A1A1AA]">Total: {articles.length}</span>
        </div>

        <div className="divide-y divide-white/5">
          {articles.slice(0, 20).map(art => (
            <div
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="py-4 cursor-pointer group hover:bg-white/[0.02] px-2 rounded-xl transition-colors flex items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
                  <span className="text-[#5EEAD4] font-bold">{art.category}</span>
                  <span>•</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                    art.status === 'published' ? 'bg-[#10B981]/20 text-[#10B981]' :
                    art.status === 'review' ? 'bg-[#5EEAD4]/20 text-[#5EEAD4]' :
                    art.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                    'bg-[#D4AF37]/20 text-[#D4AF37]'
                  }`}>
                    {art.status}
                  </span>
                  <span>•</span>
                  <span className="text-[#A1A1AA]">
                    {art.created_at ? new Date(art.created_at).toLocaleDateString() : 'Recent'}
                  </span>
                  {art.author && (
                    <>
                      <span>•</span>
                      <span className="text-[#F8FAFC]/80">{art.author}</span>
                    </>
                  )}
                  {art.ai_model && (
                    <>
                      <span>•</span>
                      <span className="text-[#D4AF37]">{art.ai_model}</span>
                    </>
                  )}
                </div>
                <h4 className="text-base font-display font-semibold text-white group-hover:text-[#5EEAD4] transition-colors">
                  {art.title}
                </h4>
              </div>

              <ArrowRight className="w-5 h-5 text-[#A1A1AA] group-hover:text-white group-hover:translate-x-1 transition-transform shrink-0" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
