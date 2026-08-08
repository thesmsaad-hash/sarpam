import React from 'react';
import { Home, Compass, ArrowLeft } from 'lucide-react';
import { SarpamEmblem } from '../components/SarpamEmblem';

interface Props {
  onNavigateHome: () => void;
  onNavigateArticles: () => void;
}

export const NotFoundPage: React.FC<Props> = ({ onNavigateHome, onNavigateArticles }) => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-20 relative">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-[#111113] border border-[#0F766E]/30 flex items-center justify-center shadow-emerald-glow">
          <SarpamEmblem className="w-12 h-12 text-[#0F766E]" />
        </div>
        <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#09090B] font-mono text-xs font-bold">
          404
        </span>
      </div>

      <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#A1A1AA] mb-2">
        Coordinates Unmapped
      </span>

      <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-[#F8FAFC] mb-4">
        Research Paper Lost in Cyberspace
      </h1>

      <p className="text-[#A1A1AA] max-w-md text-sm sm:text-base leading-relaxed mb-8">
        The research article slug or route you requested does not exist in the research archive or may have been relocated.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={onNavigateHome}
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#0F766E] text-white text-xs font-mono font-semibold hover:bg-[#14B8A6] transition-colors flex items-center justify-center gap-2 shadow-emerald-glow"
        >
          <Home className="w-4 h-4" />
          <span>Return to Front Page</span>
        </button>

        <button
          onClick={onNavigateArticles}
          className="w-full sm:w-auto px-6 py-3 rounded-full glass-panel border border-white/10 text-white text-xs font-mono font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
        >
          <Compass className="w-4 h-4 text-[#D4AF37]" />
          <span>Browse Research Archive</span>
        </button>
      </div>
    </div>
  );
};
