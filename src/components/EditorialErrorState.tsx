import React from 'react';
import { RotateCcw, AlertTriangle, Database } from 'lucide-react';
import { SarpamEmblem } from './SarpamEmblem';

interface Props {
  onRetry: () => void;
  message?: string;
}

export const EditorialErrorState: React.FC<Props> = ({ onRetry, message }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full bg-[#111113] border border-red-500/20 flex items-center justify-center shadow-emerald-glow">
          <SarpamEmblem className="w-10 h-10 text-red-400" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#09090B] border border-red-500/30 flex items-center justify-center text-red-400">
          <AlertTriangle className="w-3.5 h-3.5" />
        </div>
      </div>

      <span className="text-xs uppercase tracking-[0.25em] text-[#A1A1AA] font-mono mb-3">
        Archives Latency Error
      </span>

      <h2 className="text-2xl sm:text-3xl font-display font-semibold text-[#F8FAFC] mb-3 max-w-md">
        Research Archive Temporarily Unavailable
      </h2>

      <p className="text-[#A1A1AA] max-w-md text-sm leading-relaxed mb-8">
        {message || 'The research vault is undergoing maintenance or experiencing connection latency. Please refresh or retry.'}
      </p>

      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111113] border border-[#0F766E]/40 text-[#F8FAFC] hover:border-[#0F766E] hover:bg-[#0F766E]/10 transition-all font-medium text-sm shadow-emerald-glow active:scale-95"
      >
        <RotateCcw className="w-4 h-4 text-[#5EEAD4]" />
        <span>Retry Connection</span>
      </button>
    </div>
  );
};
