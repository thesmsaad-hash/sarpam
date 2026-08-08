import React, { useState } from 'react';
import { X, Rss, Copy, Check, Download } from 'lucide-react';
import { BlogPost } from '../types/blog';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  articles: BlogPost[];
}

export const RSSModal: React.FC<Props> = ({ isOpen, onClose, articles }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const rssFeedXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Sarpam — Autonomous AI Research Publication</title>
  <link>https://sarpam.ai</link>
  <description>Autonomous Research. Modern Intelligence. AI researched, verified scientific papers.</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  ${articles.map(article => `
  <item>
    <title><![CDATA[${article.title}]]></title>
    <link>https://sarpam.ai/article/${article.slug}</link>
    <guid isPermaLink="true">https://sarpam.ai/article/${article.slug}</guid>
    <pubDate>${article.published_at ? new Date(article.published_at).toUTCString() : new Date().toUTCString()}</pubDate>
    <category>${article.category}</category>
    <description><![CDATA[${article.excerpt}]]></description>
  </item>`).join('')}
</channel>
</rss>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rssFeedXml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([rssFeedXml], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rss.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl glass-panel rounded-2xl border border-white/10 p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Rss className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-[#F8FAFC]">
                RSS 2.0 Research Feed
              </h3>
              <p className="text-xs text-[#A1A1AA] font-mono">
                Subscribe to automated research updates in your favorite RSS reader.
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
            <span className="text-[#5EEAD4]">{articles.length} Published Articles Included</span>
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
                <span>Download rss.xml</span>
              </button>
            </div>
          </div>

          <div className="rounded-xl bg-[#09090B] border border-white/10 p-4 font-mono text-xs text-amber-200/80 overflow-x-auto max-h-[360px] scrollbar-thin">
            <pre>{rssFeedXml}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
