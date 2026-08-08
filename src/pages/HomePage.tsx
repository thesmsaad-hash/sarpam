import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Flame, BookOpen, ChevronRight, Mail, CheckCircle2 } from 'lucide-react';
import { BlogPost, BlogCategory } from '../types/blog';
import { ArticleCard } from '../components/ArticleCard';
import { SarpamEmblem } from '../components/SarpamEmblem';

interface Props {
  articles: BlogPost[];
  onSelectArticle: (article: BlogPost) => void;
  onNavigateArticles: () => void;
  onSelectCategory: (category: string) => void;
}

const FEATURED_CATEGORIES: Array<{ title: BlogCategory; count: string; desc: string }> = [
  { title: 'LLMs', count: 'Reasoning & Architecture', desc: 'Test-time compute, Tree-of-Thought search, and MCTS optimization.' },
  { title: 'AI Agents', count: 'Autonomous Workflows', desc: 'Multi-agent state graphs, conflict resolution, and execution pipelines.' },
  { title: 'Open Source', count: 'Weights & Inference', desc: 'DeepSeek, Llama 3.3, vLLM acceleration, and self-hosted AI models.' },
  { title: 'Robotics', count: 'Embodied Intelligence', desc: 'Vision-Language-Action spatial motors and humanoid physical control.' },
  { title: 'Research Papers', count: 'Mathematical Foundations', desc: 'Linear attention, State Space Models (Mamba), and loss functions.' },
  { title: 'Generative AI', count: 'Diffusion Transformers', desc: 'Spatial-temporal patches, video synthesis, and multimodal neural rendering.' }
];

export const HomePage: React.FC<Props> = ({
  articles,
  onSelectArticle,
  onNavigateArticles,
  onSelectCategory
}) => {
  const [subscribed, setSubscribed] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const featuredArticle = articles.find(a => a.is_featured) || articles[0];
  const trendingArticles = articles.filter(a => a.is_trending).slice(0, 3);
  const latestArticles = articles.filter(a => a.id !== featuredArticle?.id).slice(0, 6);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-36 pb-16 overflow-hidden serpent-subtle-pattern">
        
        {/* Glow ambient lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0F766E]/15 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-[#D4AF37]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#0F766E]/40 text-[#5EEAD4] text-xs font-mono mb-8 shadow-emerald-glow"
          >
            <SarpamEmblem className="w-4 h-4 text-[#0F766E]" />
            <span>Autonomous Intelligence Research Vault</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-[#F8FAFC] tracking-tight leading-[1.1] mb-6 max-w-5xl mx-auto"
          >
            Autonomous Research.{' '}
            <span className="emerald-gradient-text block sm:inline">
              Modern Intelligence.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-2xl font-light text-[#A1A1AA] max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
          >
            <span className="text-[#F8FAFC] font-medium">AI researched.</span>{' '}
            <span className="text-[#5EEAD4]">AI verified.</span>{' '}
            <span className="gold-gradient-text font-semibold">Human quality.</span>
          </motion.p>

          {/* CTAs & Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button
              onClick={onNavigateArticles}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-gradient text-white font-semibold text-base shadow-emerald-glow hover:opacity-95 transition-all flex items-center justify-center gap-2 group active:scale-95"
            >
              <span>Explore Research Archive</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#featured-story"
              className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel border border-white/10 text-[#F8FAFC] hover:bg-white/5 transition-all text-base font-medium flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Read Featured Story</span>
            </a>
          </motion.div>

          {/* Metrics bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/10 text-left font-mono">
            <div className="p-4 rounded-xl glass-panel border border-white/5">
              <p className="text-2xl font-bold text-[#F8FAFC]">100%</p>
              <p className="text-xs text-[#A1A1AA]">Autonomous Research</p>
            </div>
            <div className="p-4 rounded-xl glass-panel border border-white/5">
              <p className="text-2xl font-bold text-[#5EEAD4]">Neural Pipeline</p>
              <p className="text-xs text-[#A1A1AA]">Decoupled Agent Network</p>
            </div>
            <div className="p-4 rounded-xl glass-panel border border-white/5">
              <p className="text-2xl font-bold text-[#D4AF37]">Verified</p>
              <p className="text-xs text-[#A1A1AA]">ArXiv & IEEE Sources</p>
            </div>
            <div className="p-4 rounded-xl glass-panel border border-white/5">
              <p className="text-2xl font-bold text-[#F8FAFC]">Read-Only</p>
              <p className="text-xs text-[#A1A1AA]">Pure Editorial Speed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Research Story */}
      {featuredArticle && (
        <section id="featured-story" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#D4AF37]">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Frontier Lead Story</span>
            </div>
            <button
              onClick={onNavigateArticles}
              className="text-xs font-mono text-[#5EEAD4] hover:underline flex items-center gap-1"
            >
              <span>View All Papers</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <ArticleCard article={featuredArticle} onSelect={onSelectArticle} featured={true} />
        </section>
      )}

      {/* Trending Articles Section */}
      {trendingArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#5EEAD4]">
              <Flame className="w-4 h-4 text-[#0F766E]" />
              <span>Trending Research Papers</span>
            </div>
            <span className="text-xs font-mono text-[#A1A1AA]">Highest Reader Engagement</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingArticles.map(article => (
              <ArticleCard key={article.id} article={article} onSelect={onSelectArticle} />
            ))}
          </div>
        </section>
      )}

      {/* Categories Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#D4AF37]">
            Domain Knowledge
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#F8FAFC] mt-2 mb-4">
            Research Categories
          </h2>
          <p className="text-sm text-[#A1A1AA]">
            Filter scientific articles by artificial intelligence disciplines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => onSelectCategory(cat.title)}
              className="group cursor-pointer glass-panel p-6 rounded-2xl border border-white/8 hover:border-[#0F766E]/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#0F766E]/20 text-[#5EEAD4] border border-[#0F766E]/30">
                    {cat.count}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-xl font-display font-bold text-[#F8FAFC] group-hover:text-[#5EEAD4] transition-colors mb-2">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs font-mono text-[#D4AF37] group-hover:text-white">
                <span>Browse Papers</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Research Feed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#0F766E]">
              Fresh Publications
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F8FAFC]">
              Latest Research Articles
            </h2>
          </div>

          <button
            onClick={onNavigateArticles}
            className="px-5 py-2.5 rounded-full glass-panel border border-white/10 text-xs font-mono font-medium text-[#F8FAFC] hover:border-[#0F766E] transition-colors flex items-center gap-1.5"
          >
            <span>View Full Archive ({articles.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestArticles.map(article => (
            <ArticleCard key={article.id} article={article} onSelect={onSelectArticle} />
          ))}
        </div>
      </section>

      {/* Newsletter Subscription Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl glass-panel border border-[#0F766E]/30 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F766E]/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111113] border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono">
              <Mail className="w-3.5 h-3.5" />
              <span>Weekly Research Dispatch</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#F8FAFC]">
              Subscribe to Sarpam Research Briefings
            </h2>

            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Receive curated technical breakdowns, research benchmark summaries, and autonomous agent insights delivered directly to your inbox. No spam. Pure signal.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-xl bg-[#0F766E]/20 border border-[#0F766E]/40 text-[#5EEAD4] text-sm flex items-center justify-center gap-2 font-mono">
                <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                <span>You are subscribed to the Sarpam Research Dispatch!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 px-5 py-3.5 rounded-full bg-[#09090B] border border-white/10 text-white placeholder-[#A1A1AA] text-sm focus:outline-none focus:border-[#0F766E]"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-full bg-[#0F766E] text-white font-semibold text-sm hover:bg-[#14B8A6] transition-colors shadow-emerald-glow active:scale-95 shrink-0"
                >
                  Subscribe Free
                </button>
              </form>
            )}

            <p className="text-[11px] text-[#A1A1AA]/60 font-mono">
              Unsubscribe anytime. Your email is protected by Sarpam's strict privacy policy.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
