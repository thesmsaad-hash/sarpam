import React from 'react';
import { ExternalLink, BookOpen, ShieldCheck } from 'lucide-react';
import { ResearchSource } from '../types/blog';

interface Props {
  sources?: ResearchSource[];
  sourceUrl?: string;
}

export const ResearchSources: React.FC<Props> = ({ sources = [], sourceUrl }) => {
  if ((!sources || sources.length === 0) && !sourceUrl) {
    return null;
  }

  return (
    <section className="mt-16 pt-10 border-t border-white/10">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-mono mb-2">
        <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
        <span>Verified Citations</span>
      </div>
      
      <h3 className="text-2xl font-display font-bold text-[#F8FAFC] mb-6 flex items-center gap-3">
        <span>SOURCES & FURTHER READING</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map((src, idx) => (
          <a
            key={idx}
            href={src.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-panel p-5 rounded-xl border border-white/5 hover:border-[#0F766E]/50 hover:bg-[#1A1A1D]/80 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-[#A1A1AA] font-mono mb-2">
                <span className="px-2 py-0.5 rounded bg-[#0F766E]/20 text-[#5EEAD4] border border-[#0F766E]/30">
                  {src.publisher}
                </span>
                <span className="text-white/40">Ref #{idx + 1}</span>
              </div>
              <h4 className="text-base font-semibold text-[#F8FAFC] group-hover:text-[#5EEAD4] transition-colors leading-snug line-clamp-2">
                {src.title}
              </h4>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#A1A1AA] group-hover:text-[#F8FAFC]">
              <span className="truncate max-w-[240px] font-mono">{src.url.replace(/^https?:\/\//, '')}</span>
              <ExternalLink className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        ))}

        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-panel p-5 rounded-xl border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#1A1A1D] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-[#D4AF37] font-mono mb-2">
                <span className="px-2 py-0.5 rounded bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
                  Primary Publication Source
                </span>
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-base font-semibold text-[#F8FAFC] group-hover:text-[#D4AF37] transition-colors leading-snug">
                Access ArXiv & Original Technical Artifacts
              </h4>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#A1A1AA] group-hover:text-[#F8FAFC]">
              <span className="truncate max-w-[240px] font-mono">{sourceUrl}</span>
              <ExternalLink className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        )}
      </div>
    </section>
  );
};
