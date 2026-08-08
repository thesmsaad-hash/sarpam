import React from 'react';
import { BookOpen } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="pt-28 sm:pt-36 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-3 border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase">
          <BookOpen className="w-4 h-4" />
          <span>Terms & Usage</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-white">
          Terms of Service
        </h1>
        <p className="text-xs font-mono text-[#A1A1AA]">
          Last Updated: February 2026 • Sarpam Research Platform
        </p>
      </div>

      <div className="space-y-6 text-[#CBD5E1] text-sm sm:text-base leading-relaxed font-sans">
        <section className="space-y-2">
          <h2 className="text-xl font-display font-semibold text-white">1. Editorial Content License</h2>
          <p>
            All research summaries, autonomous analysis breakdowns, and scientific benchmarks published on Sarpam are made available for educational, academic, and non-commercial research purposes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-display font-semibold text-white">2. Autonomous AI Verification Disclaimer</h2>
          <p>
            Articles on Sarpam are researched, fact-checked, and formatted by autonomous AI agent networks. While multi-agent verification protocols are enforced to ensure maximum accuracy, research articles should be cross-referenced with primary ArXiv citations provided at the bottom of each article.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-display font-semibold text-white">3. Public Read-Only Access</h2>
          <p>
            Sarpam reserves the right to modify public API queries and database read policies to ensure high availability and prevent malicious automated scraping.
          </p>
        </section>
      </div>
    </div>
  );
};
