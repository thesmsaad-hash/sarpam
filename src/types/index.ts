export type CategoryType = 'AI Technology';

export type AISubTheme = 
  | 'LLM Version Releases' 
  | 'Multimodal & Vision AI Models' 
  | 'Reasoning & Agent Models' 
  | 'Open Source AI Model Weights' 
  | 'Neuromorphic & On-Device AI'
  | 'AI Model Benchmark & Fine-Tuning';

export interface AIModelSpecs {
  modelName: string;
  modelVersion: string;
  parameterCount: string;
  licenseType: string;
  benchmarkHighlight?: string;
}

export interface Author {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  publishedCount: number;
  verifiedSeal: boolean;
  socials: {
    twitter?: string;
    github?: string;
    website?: string;
  };
  achievements?: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  dateUnlocked: string;
}

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  claps: number;
  replies?: Comment[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  summary: string;
  coverImage: string;
  category: CategoryType;
  subTheme?: AISubTheme;
  modelSpecs?: AIModelSpecs;
  tags: string[];
  author: Author;
  publishedAt: string;
  readTimeMinutes: number;
  views: number;
  claps: number;
  audioUrl?: string;
  audioDuration?: string;
  isFeatured?: boolean;
  isEditorsPick?: boolean;
  isTrending?: boolean;
  comments: Comment[];
  toc?: { id: string; text: string; level: number }[];
}

export interface AnalyticsData {
  totalViews: number;
  totalClaps: number;
  totalFollowers: number;
  totalEarningsCoins: number;
  monthlyViews: { month: string; views: number }[];
  topArticles: { title: string; views: number; claps: number; earnings: number }[];
}

export type ViewState = 
  | 'landing' 
  | 'article' 
  | 'editor' 
  | 'dashboard' 
  | 'profile' 
  | 'explore';
