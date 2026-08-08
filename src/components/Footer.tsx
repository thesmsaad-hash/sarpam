import React from 'react';
import { Rss, Network, Database, Shield, BookOpen, ExternalLink } from 'lucide-react';
import { ViewState } from '../types/blog';
import { SarpamEmblem } from './SarpamEmblem';

interface Props {
  onNavigate: (view: ViewState) => void;
  onOpenRss: () => void;
  onOpenSitemap: () => void;
  onOpenSupabaseModal: () => void;
}

export const Footer: React.FC<Props> = ({
  onNavigate,
  onOpenRss,
  onOpenSitemap,
  onOpenSupabaseModal
}) => {
  return (
    <footer className="relative bg-[#09090B] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0F766E]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <SarpamEmblem className="w-8 h-8 text-[#0F766E]" />
              <span className="font-display font-bold text-2xl tracking-wider text-[#F8FAFC]">
                SARPAM
              </span>
            </div>

            <p className="text-sm font-display text-[#D4AF37] italic">
              Autonomous Research. Modern Intelligence.
            </p>

            <p className="text-xs text-[#A1A1AA] leading-relaxed max-w-sm">
              Sarpam is a luxury AI research publication platform presenting autonomous AI-researched, fact-checked, and verified scientific papers.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-[#A1A1AA]">
              <span className="inline-flex items-center gap-1 text-[#5EEAD4]">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                Verified Research Archive
              </span>
              <span>•</span>
              <span>Automated Peer Pipeline</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-[#F8FAFC] font-semibold mb-4">
              Publication Routes
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A1A1AA]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#5EEAD4] transition-colors"
                >
                  Front Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('articles')}
                  className="hover:text-[#5EEAD4] transition-colors"
                >
                  Research Archive
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories')}
                  className="hover:text-[#5EEAD4] transition-colors"
                >
                  Subject Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#5EEAD4] transition-colors"
                >
                  Editorial Manifesto
                </button>
              </li>
            </ul>
          </div>

          {/* Feeds & Editorial Access */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-[#F8FAFC] font-semibold mb-4">
              Feeds & Access
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A1A1AA]">
              <li>
                <button
                  onClick={onOpenRss}
                  className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors"
                >
                  <Rss className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>RSS 2.0 Feed</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSitemap}
                  className="flex items-center gap-1.5 hover:text-[#5EEAD4] transition-colors"
                >
                  <Network className="w-3.5 h-3.5 text-[#5EEAD4]" />
                  <span>XML Sitemap</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="flex items-center gap-1.5 hover:text-[#5EEAD4] font-semibold text-[#5EEAD4] transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-[#5EEAD4]" />
                  <span>Admin Portal</span>
                </button>
              </li>
              <li>
                <a
                  href="https://arxiv.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#A1A1AA]" />
                  <span>ArXiv Repository</span>
                  <ExternalLink className="w-3 h-3 text-[#A1A1AA]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-[#F8FAFC] font-semibold mb-4">
              Legal & Policy
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A1A1AA]">
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <span className="text-[11px] text-[#A1A1AA]/60 block leading-tight pt-2">
                  Content published automatically via autonomous agent workflows.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A1A1AA] font-mono gap-4">
          <p>© {new Date().getFullYear()} Sarpam Research Platform. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-[11px]">WCAG AA Compliant</span>
            <span>•</span>
            <span className="text-[11px]">Playfair & Inter Typography</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
