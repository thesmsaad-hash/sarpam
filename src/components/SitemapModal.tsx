import React, { useState } from 'react';
import { X, Network, Copy, Check, Download } from 'lucide-react';
import { BlogPost } from '../types/blog';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  articles: BlogPost[];
}

export const SitemapModal: React.FC<Props> = ({ isOpen, onClose, articles }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sarpam.ai/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://sarpam.ai/articles</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://sarpam.ai/categories</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://sarpam.ai/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  ${articles.map(article => `
  <url>
    <loc>https://sarpam.ai/article/${article.slug}</loc>
    <lastmod>${new Date(article.updated_at || article.published_at || Date.now()).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sitemapXml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([sitemapXml], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl glass-panel rounded-2xl border border-white/10 p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F766E]/20 border border-[#0F766E]/40 flex items-center justify-center text-[#5EEAD4]">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-[#F8FAFC]">
                XML Sitemap Overview
              </h3>
              <p className="text-xs text-[#A1A1AA] font-mono">
                Index of all search engine indexable routes and articles.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono px-1">
            <span className="text-[#5EEAD4]">{articles.length + 4} Total URLs Indexed</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors text-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy XML'}</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F766E] text-white hover:bg-[#14B8A6] transition-colors text-xs font-semibold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download sitemap.xml</span>
              </button>
            </div>
          </div>

          <div className="rounded-xl bg-[#09090B] border border-white/10 p-4 font-mono text-xs text-teal-200/80 overflow-x-auto max-h-[360px] scrollbar-thin">
            <pre>{sitemapXml}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
