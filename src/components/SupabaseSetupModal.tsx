import React, { useState } from 'react';
import { X, Copy, Check, Database, ShieldCheck, Terminal } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseSetupModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sqlSchema = `-- ==================================================
-- SARPAM SUPABASE DATABASE SCHEMA
-- Execute in Supabase SQL Editor
-- ==================================================

-- 1. Create blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  reading_time TEXT DEFAULT '5 min read',
  meta_title TEXT,
  meta_description TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'published',
  source_url TEXT,
  research_sources JSONB DEFAULT '[]'::jsonb,
  author TEXT DEFAULT 'Sarpam Research Collective',
  ai_model TEXT DEFAULT 'Claude 3.5 Sonnet',
  content_source TEXT DEFAULT 'n8n',
  views INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- 3. Public read policy for published articles ONLY
CREATE POLICY "Public can read published blogs"
ON public.blogs
FOR SELECT
USING (status = 'published');

-- 4. Create Index on status & published_at for instant queries
CREATE INDEX IF NOT EXISTS idx_blogs_status_date 
ON public.blogs (status, published_at DESC);

-- 5. Create Index on slug
CREATE INDEX IF NOT EXISTS idx_blogs_slug 
ON public.blogs (slug);`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl glass-panel rounded-2xl border border-white/10 p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F766E]/20 border border-[#0F766E]/40 flex items-center justify-center text-[#5EEAD4]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-[#F8FAFC]">
                Supabase Schema Setup
              </h3>
              <p className="text-xs text-[#A1A1AA] font-mono">
                Copy SQL script to initialize your Supabase <code className="text-[#5EEAD4]">blogs</code> table with RLS.
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
          <div className="flex items-center justify-between text-xs text-[#A1A1AA] font-mono px-1">
            <span className="flex items-center gap-1.5 text-[#5EEAD4]">
              <ShieldCheck className="w-4 h-4" />
              <span>Includes Row Level Security (RLS) Policy</span>
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F766E] text-white hover:bg-[#14B8A6] transition-colors text-xs font-semibold"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy SQL</span>
                </>
              )}
            </button>
          </div>

          <div className="relative rounded-xl bg-[#09090B] border border-white/10 p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-[380px] scrollbar-thin">
            <pre>{sqlSchema}</pre>
          </div>

          <div className="p-4 rounded-xl bg-[#111113] border border-[#D4AF37]/20 text-xs text-[#A1A1AA] flex items-start gap-3">
            <Terminal className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <p className="text-[#F8FAFC] font-semibold mb-1">Single Source of Truth Principle</p>
              <p className="leading-relaxed">
                n8n workflows write directly into this Supabase table using the Service Role Key. The public website securely reads published articles (<code className="text-[#D4AF37]">status = 'published'</code>) using the public Anon Key.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors text-sm font-medium"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
