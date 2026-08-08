import React, { useState } from 'react';
import { Save, Eye, ArrowLeft, Plus, Trash2, CheckCircle2, Sparkles } from 'lucide-react';
import { BlogPost, BlogCategory, ResearchSource } from '../types/blog';

interface Props {
  article: Partial<BlogPost>;
  onSaveDraft: (article: Partial<BlogPost>) => void;
  onPreview: (article: Partial<BlogPost>) => void;
  onBack: () => void;
}

const CATEGORIES: BlogCategory[] = [
  'LLMs',
  'AI Agents',
  'Open Source',
  'Robotics',
  'Research Papers',
  'Computer Vision',
  'Generative AI',
  'Startups',
  'Tutorials'
];

export const AdminEditor: React.FC<Props> = ({ article, onSaveDraft, onPreview, onBack }) => {
  const [title, setTitle] = useState(article.title || '');
  const [slug, setSlug] = useState(article.slug || '');
  const [excerpt, setExcerpt] = useState(article.excerpt || '');
  const [content, setContent] = useState(article.content || '');
  const [featuredImage, setFeaturedImage] = useState(article.featured_image || '');
  const [category, setCategory] = useState<string>(article.category || 'LLMs');
  const [tagsInput, setTagsInput] = useState((article.tags || []).join(', '));
  const [readingTime, setReadingTime] = useState(article.reading_time || '5 min read');
  const [metaTitle, setMetaTitle] = useState(article.meta_title || '');
  const [metaDescription, setMetaDescription] = useState(article.meta_description || '');
  const [sourceUrl, setSourceUrl] = useState(article.source_url || '');
  const [author, setAuthor] = useState(article.author || 'Sarpam Editorial Team');
  const [aiModel, setAiModel] = useState(article.ai_model || 'Manual / Editorial');
  const [researchSources, setResearchSources] = useState<ResearchSource[]>(article.research_sources || []);

  // Research Source Form State
  const [srcTitle, setSrcTitle] = useState('');
  const [srcPublisher, setSrcPublisher] = useState('');
  const [srcUrl, setSrcUrl] = useState('');

  const handleAddSource = () => {
    if (srcTitle && srcUrl) {
      setResearchSources([...researchSources, { title: srcTitle, publisher: srcPublisher || 'ArXiv', url: srcUrl }]);
      setSrcTitle('');
      setSrcPublisher('');
      setSrcUrl('');
    }
  };

  const handleRemoveSource = (idx: number) => {
    setResearchSources(researchSources.filter((_, i) => i !== idx));
  };

  const buildArticlePayload = (): Partial<BlogPost> => {
    const tagsArr = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    return {
      ...article,
      title,
      slug: slug || title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
      excerpt,
      content,
      featured_image: featuredImage,
      category,
      tags: tagsArr,
      reading_time: readingTime,
      meta_title: metaTitle || title,
      meta_description: metaDescription || excerpt,
      source_url: sourceUrl,
      research_sources: researchSources,
      author,
      ai_model: aiModel,
      content_source: article.content_source || 'manual'
    };
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!article.id) {
      setSlug(val.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'));
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <button onClick={onBack} className="text-xs font-mono text-[#A1A1AA] hover:text-white flex items-center gap-1.5">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Control Center</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onSaveDraft(buildArticlePayload())}
            className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-mono transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-[#D4AF37]" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={() => onPreview(buildArticlePayload())}
            className="px-6 py-2.5 rounded-full bg-[#0F766E] text-white text-xs font-mono font-semibold hover:bg-[#14B8A6] transition-colors flex items-center gap-2 shadow-emerald-glow"
          >
            <Eye className="w-4 h-4" />
            <span>Visual Preview & Review</span>
          </button>
        </div>
      </div>

      {/* Main Form Fields */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        
        {/* Title */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-[#A1A1AA] uppercase">Paper Title</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="e.g. Autonomous Reasoning Chains: Overcoming Deliberation Latency"
            className="w-full px-4 py-3 rounded-xl bg-[#09090B] border border-white/10 text-lg font-display text-white focus:outline-none focus:border-[#0F766E]"
          />
        </div>

        {/* Slug & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-[#A1A1AA] uppercase">URL Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#09090B] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-[#A1A1AA] uppercase">Research Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#09090B] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#0F766E]"
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-[#A1A1AA] uppercase">Editorial Excerpt</label>
          <textarea
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Concise technical summary..."
            className="w-full px-4 py-3 rounded-xl bg-[#09090B] border border-white/10 text-sm text-white focus:outline-none focus:border-[#0F766E]"
          />
        </div>

        {/* Markdown Content */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono text-[#A1A1AA] uppercase">Article Markdown Body</label>
            <span className="text-[11px] font-mono text-[#5EEAD4]">Supports Headings (##), Code (```), Tables, Blockquotes</span>
          </div>
          <textarea
            rows={14}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="# Write or edit article markdown here..."
            className="w-full p-4 rounded-xl bg-[#09090B] border border-white/10 text-xs font-mono text-emerald-200/90 leading-relaxed focus:outline-none focus:border-[#0F766E] scrollbar-thin"
          />
        </div>

        {/* Featured Image URL & Reading Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-[#A1A1AA] uppercase">Featured Image URL</label>
            <input
              type="text"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#09090B] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-[#A1A1AA] uppercase">Reading Time</label>
            <input
              type="text"
              value={readingTime}
              onChange={(e) => setReadingTime(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#09090B] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#0F766E]"
            />
          </div>
        </div>

        {/* Author & AI Model */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-[#A1A1AA] uppercase">Author Name</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#09090B] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-[#A1A1AA] uppercase">AI Model / Pipeline</label>
            <input
              type="text"
              value={aiModel}
              onChange={(e) => setAiModel(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#09090B] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#0F766E]"
            />
          </div>
        </div>

        {/* Research Sources Section */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <label className="text-xs font-mono text-[#D4AF37] uppercase flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Research Sources & Further Reading Citations</span>
          </label>

          {/* List existing sources */}
          <div className="space-y-2">
            {researchSources.map((src, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#09090B] border border-white/10 text-xs font-mono">
                <div>
                  <span className="text-[#5EEAD4] font-bold">[{src.publisher}]</span> {src.title}
                  <p className="text-[11px] text-[#A1A1AA] truncate max-w-md">{src.url}</p>
                </div>
                <button onClick={() => handleRemoveSource(idx)} className="text-red-400 hover:text-red-300 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add source inline inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={srcTitle}
              onChange={(e) => setSrcTitle(e.target.value)}
              placeholder="Source Title"
              className="px-3 py-2 rounded-lg bg-[#09090B] border border-white/10 text-xs text-white"
            />
            <input
              type="text"
              value={srcPublisher}
              onChange={(e) => setSrcPublisher(e.target.value)}
              placeholder="Publisher (e.g. OpenAI / ArXiv)"
              className="px-3 py-2 rounded-lg bg-[#09090B] border border-white/10 text-xs text-white"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={srcUrl}
                onChange={(e) => setSrcUrl(e.target.value)}
                placeholder="https://..."
                className="flex-1 px-3 py-2 rounded-lg bg-[#09090B] border border-white/10 text-xs text-white"
              />
              <button
                type="button"
                onClick={handleAddSource}
                className="px-3 py-2 rounded-lg bg-[#0F766E] text-white text-xs font-mono font-bold"
              >
                Add
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
