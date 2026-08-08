export type BlogCategory = 
  | 'LLMs'
  | 'AI Agents'
  | 'Open Source'
  | 'Robotics'
  | 'Research Papers'
  | 'Computer Vision'
  | 'Generative AI'
  | 'Startups'
  | 'Tutorials';

export type ArticleStatus = 'draft' | 'review' | 'published' | 'rejected';

export interface ResearchSource {
  title: string;
  publisher: string;
  url: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category: BlogCategory | string;
  tags: string[];
  reading_time: string;
  meta_title: string;
  meta_description: string;
  published_at: string | null;
  status: ArticleStatus;
  source_url?: string;
  research_sources?: ResearchSource[];
  created_at?: string;
  updated_at?: string;
  reviewed_at?: string;
  reviewed_by?: string;
  rejection_reason?: string;
  author?: string;
  views?: number;
  ai_model?: string;
  content_type?: string;
  content_source?: 'n8n' | 'manual' | string;
  is_featured?: boolean;
  is_trending?: boolean;
}

export type ViewState = 
  | 'home'
  | 'articles'
  | 'article-detail'
  | 'categories'
  | 'about'
  | 'privacy'
  | 'terms'
  | 'admin'
  | '404';
