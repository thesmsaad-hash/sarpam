import React from 'react';
import { ShieldCheck, Cpu, Database, Rss, ArrowRight, Sparkles, Network } from 'lucide-react';
import { SarpamEmblem } from '../components/SarpamEmblem';

interface Props {
  onNavigateArticles: () => void;
  onOpenSupabaseModal: () => void;
}

export const AboutPage: React.FC<Props> = ({ onNavigateArticles }) => {
  return (
    <div className="pt-28 sm:pt-36 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#0F766E]/40 text-[#5EEAD4] text-xs font-mono mb-4">
          <SarpamEmblem className="w-4 h-4 text-[#0F766E]" />
          <span>Editorial Manifesto & System Architecture</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-[#F8FAFC]">
          Autonomous Research.{' '}
          <span className="emerald-gradient-text">Modern Intelligence.</span>
        </h1>

        <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
          Sarpam is a premium AI research publication platform engineered for high-speed, distraction-free scientific reading.
        </p>
      </div>

      {/* Brand Identity & Naga Philosophy */}
      <section className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-6">
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>Brand Identity & Ancient Symbolism</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F8FAFC]">
          The Synthesis of Naga Symbolism and Autonomous Intelligence
        </h2>

        <div className="space-y-4 text-[#CBD5E1] text-base sm:text-lg leading-relaxed">
          <p>
            In ancient civilizations, the <strong>Naga (Serpent)</strong> symbolized deep, protected wisdom, cyclical renewal, and unyielding vigilance. Sarpam fuses this ancient motif with modern autonomous artificial intelligence.
          </p>
          <p>
            The platform DOES NOT generate content interactively or allow manual browser editing. Instead, every paper on Sarpam is autonomously researched, fact-checked, written, optimized, and published by background multi-agent research pipelines.
          </p>
        </div>
      </section>

      {/* System Architecture Diagram & Rules */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#0F766E]">
            Decoupled Architecture
          </span>
          <h2 className="text-3xl font-display font-bold text-white">
            How Content Flow Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/8 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F766E]/20 text-[#5EEAD4] flex items-center justify-center font-mono font-bold text-sm">
              01
            </div>
            <h3 className="text-lg font-display font-semibold text-white">Research Engine</h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              Background agent workflows discover ArXiv papers, verify mathematical citations, write markdown research, and format JSON citations.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/8 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-mono font-bold text-sm">
              02
            </div>
            <h3 className="text-lg font-display font-semibold text-white">Knowledge Archive</h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              Articles are committed to an immutable knowledge vault. Security policies enforce public read access exclusively for verified publications.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/8 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 text-[#10B981] flex items-center justify-center font-mono font-bold text-sm">
              03
            </div>
            <h3 className="text-lg font-display font-semibold text-white">Sarpam Magazine</h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              A pure read-only luxury editorial interface with zero admin overhead, providing instant sub-100ms reading experience worldwide.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
