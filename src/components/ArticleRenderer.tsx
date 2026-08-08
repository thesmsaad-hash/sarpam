import React, { useState } from 'react';
import { Calendar, Clock, User, Sparkles, Copy, Check, ShieldCheck, Tag, ExternalLink, CheckCircle2 } from 'lucide-react';
import { BlogPost } from '../types/blog';
import { ResearchSources } from './ResearchSources';

interface Props {
  article: BlogPost;
  isPreview?: boolean;
}

export const ArticleRenderer: React.FC<Props> = ({ article, isPreview = false }) => {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    : 'Draft (Unpublished)';

  // Sanitize escaped literal newlines (e.g. "\\n" -> "\n")
  const rawContent = article.content || '';
  const cleanContent = rawContent.replace(/\\n/g, '\n');

  // Render Formatted Markdown
  const renderFormattedMarkdown = (markdown: string) => {
    if (!markdown) return null;
    const blocks = markdown.split('\n\n');
    let codeCounter = 0;

    return blocks.map((block, index) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith('# ')) {
        return (
          <h1 key={index} className="text-3xl sm:text-4xl font-display font-extrabold text-[#F8FAFC] mt-10 mb-6 leading-tight">
            {trimmed.replace('# ', '')}
          </h1>
        );
      }

      if (trimmed.startsWith('## ')) {
        const text = trimmed.replace('## ', '');
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        return (
          <h2 key={index} id={id} className="scroll-mt-32 text-2xl sm:text-3xl font-display font-bold text-[#F8FAFC] mt-12 mb-4 pb-2 border-b border-white/10 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0F766E] shrink-0" />
            <span>{text}</span>
          </h2>
        );
      }

      if (trimmed.startsWith('### ')) {
        const text = trimmed.replace('### ', '');
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        return (
          <h3 key={index} id={id} className="scroll-mt-32 text-xl font-display font-semibold text-[#F1F5F9] mt-8 mb-3">
            {text}
          </h3>
        );
      }

      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={index} className="my-6 p-5 rounded-2xl bg-[#0F766E]/10 border-l-4 border-[#0F766E] text-[#E2E8F0] italic font-display text-lg shadow-inner">
            {trimmed.replace(/^>\s*/gm, '')}
          </blockquote>
        );
      }

      if (trimmed.startsWith('```')) {
        const cIndex = codeCounter++;
        const lines = trimmed.split('\n');
        const lang = lines[0].replace('```', '') || 'code';
        const codeSnippet = lines.slice(1, -1).join('\n');

        const copyCode = () => {
          navigator.clipboard.writeText(codeSnippet);
          setCopiedCodeIndex(cIndex);
          setTimeout(() => setCopiedCodeIndex(null), 2000);
        };

        return (
          <div key={index} className="my-8 rounded-2xl bg-[#09090B] border border-white/10 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#111113] border-b border-white/10 font-mono text-xs text-[#A1A1AA]">
              <span className="text-[#5EEAD4] font-medium uppercase tracking-wider">{lang}</span>
              <button
                onClick={copyCode}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white transition-colors border border-white/10"
              >
                {copiedCodeIndex === cIndex ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#10B981]" />
                    <span className="text-[#10B981]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto font-mono text-xs sm:text-sm text-emerald-200/90 leading-relaxed scrollbar-thin">
              <code>{codeSnippet}</code>
            </pre>
          </div>
        );
      }

      if (trimmed.startsWith('|')) {
        const rows = trimmed.split('\n').filter(r => !r.includes('---'));
        if (rows.length === 0) return null;
        const headerCols = rows[0].split('|').filter(c => c.trim() !== '').map(c => c.trim());
        const dataRows = rows.slice(1).map(r => r.split('|').filter(c => c.trim() !== '').map(c => c.trim()));

        return (
          <div key={index} className="my-8 overflow-x-auto rounded-2xl border border-white/10 shadow-xl">
            <table className="w-full text-left text-xs sm:text-sm font-sans">
              <thead className="bg-[#18181B] text-white font-mono uppercase text-[11px] tracking-wider">
                <tr>
                  {headerCols.map((th, i) => (
                    <th key={i} className="p-3.5 border-b border-white/10 font-semibold text-[#5EEAD4]">{th}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-[#111113]/80">
                {dataRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-3.5 text-[#CBD5E1]">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const listItems = trimmed.split('\n').map(item => item.replace(/^[-*]\s*/, ''));
        return (
          <ul key={index} className="my-6 space-y-2.5 list-disc list-inside text-[#CBD5E1] leading-relaxed">
            {listItems.map((li, i) => (
              <li key={i} className="leading-relaxed text-base sm:text-lg">{li}</li>
            ))}
          </ul>
        );
      }

      if (/^\d+\.\s/.test(trimmed)) {
        const listItems = trimmed.split('\n').map(item => item.replace(/^\d+\.\s*/, ''));
        return (
          <ol key={index} className="my-6 space-y-2.5 list-decimal list-inside text-[#CBD5E1] leading-relaxed">
            {listItems.map((li, i) => (
              <li key={i} className="leading-relaxed text-base sm:text-lg">{li}</li>
            ))}
          </ol>
        );
      }

      return (
        <p key={index} className="my-5 text-[#CBD5E1] leading-relaxed text-base sm:text-lg">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <article className="max-w-4xl mx-auto space-y-8">
      {/* Preview Warning Badge */}
      {isPreview && (
        <div className="p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono flex items-center justify-between shadow-lg">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Admin Editorial Preview Mode — Visual Parity Verified</span>
          </span>
          <span className="uppercase px-2.5 py-1 rounded-full bg-[#D4AF37]/20 font-bold">
            Status: {article.status}
          </span>
        </div>
      )}

      {/* Header Metadata */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3.5 py-1 rounded-full bg-[#0F766E]/20 text-[#5EEAD4] border border-[#0F766E]/40 text-xs font-mono font-semibold uppercase tracking-wider">
            {article.category}
          </span>
          {article.ai_model && (
            <span className="px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> {article.ai_model}
            </span>
          )}
          {article.content_source && (
            <span className="px-3 py-1 rounded-full bg-white/5 text-[#A1A1AA] border border-white/10 text-xs font-mono">
              Source: {article.content_source}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-[#F8FAFC] leading-[1.15] tracking-tight">
          {article.title}
        </h1>

        {/* Publication Author & Date Bar */}
        <div className="pt-4 pb-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#A1A1AA]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0F766E]/20 border border-[#0F766E]/40 flex items-center justify-center text-[#5EEAD4]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[#F8FAFC] font-semibold text-sm">
                {article.author || 'Sarpam Research Collective'}
              </p>
              <p className="text-[11px] text-[#A1A1AA]">
                Human Editorial Pipeline
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#0F766E]" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              {article.reading_time || '5 min read'}
            </span>
          </div>
        </div>

        {/* Excerpt Lead Paragraph */}
        {article.excerpt && (
          <p className="text-lg sm:text-xl text-[#CBD5E1] leading-relaxed font-sans font-light p-5 rounded-2xl bg-white/[0.02] border border-white/5 italic">
            "{article.excerpt}"
          </p>
        )}
      </header>

      {/* 16:9 Editorial Featured Hero Image */}
      {article.featured_image ? (
        <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#111113] relative">
          <img
            src={article.featured_image}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      ) : (
        <div className="w-full aspect-video rounded-2xl border border-white/10 bg-[#111113] flex items-center justify-center text-[#A1A1AA]/60 text-xs font-mono">
          <span>Featured Image Unavailable</span>
        </div>
      )}

      {/* Article Body Content */}
      <div className="markdown-body">
        {renderFormattedMarkdown(cleanContent)}
      </div>

      {/* Key Takeaways Section */}
      {article.tags && article.tags.length > 0 && (
        <div className="p-6 rounded-2xl bg-[#0F766E]/10 border border-[#0F766E]/30 space-y-3">
          <h4 className="text-sm font-mono font-bold text-[#5EEAD4] uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span>Key Research Takeaways</span>
          </h4>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {article.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#F8FAFC]">
                • #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Citations & Sources */}
      <ResearchSources
        sources={article.research_sources}
        sourceUrl={article.source_url}
      />
    </article>
  );
};
