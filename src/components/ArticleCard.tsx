import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { BlogPost } from '../types/blog';

interface Props {
  article: BlogPost;
  onSelect: (article: BlogPost) => void;
  featured?: boolean;
}

export const ArticleCard: React.FC<Props> = ({ article, onSelect, featured = false }) => {
  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : 'Draft';

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => onSelect(article)}
        className="group relative cursor-pointer glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-[#0F766E]/60 transition-all duration-300 shadow-2xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden">
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#111113]" />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#09090B]/80 backdrop-blur-md text-[#5EEAD4] border border-[#0F766E]/40 text-xs font-semibold uppercase tracking-wider font-mono">
                {article.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#D4AF37]/10 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Featured Research
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 text-xs text-[#A1A1AA] font-mono mb-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#0F766E]" />
                  {formattedDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {article.reading_time}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F8FAFC] group-hover:text-[#5EEAD4] transition-colors leading-tight mb-4">
                {article.title}
              </h2>

              <p className="text-[#A1A1AA] text-sm leading-relaxed line-clamp-3 mb-6">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#0F766E]/20 border border-[#0F766E]/40 flex items-center justify-center text-[#5EEAD4] text-xs font-mono">
                  AI
                </div>
                <div className="text-xs">
                  <p className="text-[#F8FAFC] font-medium leading-none">
                    {article.author || 'Sarpam Research Collective'}
                  </p>
                  <p className="text-[#A1A1AA] font-mono text-[10px] mt-0.5">
                    Verified Agent Pipeline
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#D4AF37] group-hover:text-[#5EEAD4] transition-colors font-mono">
                Read Research <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onClick={() => onSelect(article)}
      className="group relative cursor-pointer glass-panel rounded-xl overflow-hidden border border-white/8 hover:border-[#0F766E]/50 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="relative h-48 overflow-hidden bg-[#18181B]">
          <img
            src={article.featured_image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent opacity-60" />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-0.5 rounded-md bg-[#09090B]/80 backdrop-blur-md text-[#5EEAD4] border border-[#0F766E]/30 text-[11px] font-mono font-medium">
              {article.category}
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-3 text-[11px] text-[#A1A1AA] font-mono mb-2.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#0F766E]" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#D4AF37]" />
              {article.reading_time}
            </span>
          </div>

          <h3 className="text-lg font-display font-semibold text-[#F8FAFC] group-hover:text-[#5EEAD4] transition-colors leading-snug line-clamp-2 mb-2">
            {article.title}
          </h3>

          <p className="text-[#A1A1AA] text-xs leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
        <span className="text-[#A1A1AA] font-mono text-[11px] truncate max-w-[150px]">
          {article.ai_model || 'Sarpam Agent'}
        </span>
        <span className="flex items-center gap-1 text-[#D4AF37] group-hover:text-[#5EEAD4] font-medium font-mono text-[11px] transition-colors">
          Read <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>
      </div>
    </motion.div>
  );
};
