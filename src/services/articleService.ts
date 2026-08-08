import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { BlogPost, ArticleStatus } from '../types/blog';
import { mockArticles } from '../data/mockBlogs';

export interface FetchArticlesResult {
  articles: BlogPost[];
  error: string | null;
  isMock: boolean;
  totalCount?: number;
}

export interface FetchSingleArticleResult {
  article: BlogPost | null;
  error: string | null;
  isMock: boolean;
}

const env = (import.meta as any).env || {};
const isMockDataAllowed = env.VITE_USE_MOCK_DATA === 'true' || (!env.PROD && env.VITE_USE_MOCK_DATA !== 'false');

export const articleService = {
  /**
   * PUBLIC QUERY: Fetch published articles (status = 'published' ONLY).
   */
  async getPublishedArticles(options?: {
    category?: string | null;
    limit?: number;
    offset?: number;
  }): Promise<FetchArticlesResult> {
    if (!isSupabaseConfigured) {
      return {
        articles: mockArticles.filter(a => a.status === 'published'),
        error: null,
        isMock: true,
        totalCount: mockArticles.length
      };
    }

    try {
      let query = supabase!
        .from('blogs')
        .select('*', { count: 'exact' })
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (options?.category) {
        query = query.ilike('category', options.category);
      }

      if (options?.limit) {
        const from = options.offset || 0;
        const to = from + options.limit - 1;
        query = query.range(from, to);
      }

      const { data, error, count } = await query;

      if (error) {
        console.error('Supabase blogs error:', error.message || error);
        return {
          articles: [],
          error: error.message,
          isMock: false
        };
      }

      return {
        articles: (data as BlogPost[]) || [],
        error: null,
        isMock: false,
        totalCount: count || data?.length || 0
      };
    } catch (err: any) {
      console.error('Supabase blogs exception:', err);
      return {
        articles: [],
        error: err.message || 'Database query exception',
        isMock: false
      };
    }
  },

  /**
   * PUBLIC QUERY: Fetch single published article by slug.
   */
  async getArticleBySlug(slug: string): Promise<FetchSingleArticleResult> {
    if (!isSupabaseConfigured) {
      const found = mockArticles.find(a => a.slug === slug && a.status === 'published') || null;
      return { article: found, error: null, isMock: true };
    }

    try {
      const { data, error } = await supabase!
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) {
        console.error('Supabase blog single error:', error.message || error);
        return { article: null, error: error.message, isMock: false };
      }

      return { article: data as BlogPost, error: null, isMock: false };
    } catch (err: any) {
      console.error('Supabase single article exception:', err);
      return { article: null, error: err.message, isMock: false };
    }
  },

  // ==================================================
  // ADMIN CMS OPERATIONS (AUTH / ADMIN ROLE ONLY)
  // ==================================================

  /**
   * ADMIN: Fetch all articles regardless of status for CMS management.
   */
  async getAdminArticlesByStatus(status?: ArticleStatus): Promise<FetchArticlesResult> {
    if (!isSupabaseConfigured) {
      let list = mockArticles;
      if (status) list = list.filter(a => a.status === status);
      return { articles: list, error: null, isMock: true };
    }

    try {
      let query = supabase!
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;
      if (error) {
        console.error('Supabase blogs error:', error.message || error);
        return { articles: [], error: error.message, isMock: false };
      }

      return { articles: (data as BlogPost[]) || [], error: null, isMock: false };
    } catch (err: any) {
      console.error('Supabase blogs exception:', err);
      return { articles: [], error: err.message, isMock: false };
    }
  },

  /**
   * ADMIN: Move draft to review status.
   */
  async moveToReview(articleId: string): Promise<{ success: boolean; error: string | null }> {
    if (!isSupabaseConfigured) {
      const art = mockArticles.find(a => a.id === articleId);
      if (art) {
        art.status = 'review';
        art.reviewed_at = new Date().toISOString();
      }
      return { success: true, error: null };
    }

    try {
      const { error } = await supabase!
        .from('blogs')
        .update({
          status: 'review',
          reviewed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', articleId);

      if (error) return { success: false, error: error.message };
      return { success: true, error: null };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  /**
   * ADMIN: Reject article with reason.
   */
  async rejectArticle(articleId: string, reason: string): Promise<{ success: boolean; error: string | null }> {
    if (!isSupabaseConfigured) {
      const art = mockArticles.find(a => a.id === articleId);
      if (art) {
        art.status = 'rejected';
        art.rejection_reason = reason;
      }
      return { success: true, error: null };
    }

    try {
      const { error } = await supabase!
        .from('blogs')
        .update({
          status: 'rejected',
          rejection_reason: reason,
          reviewed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', articleId);

      if (error) return { success: false, error: error.message };
      return { success: true, error: null };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  /**
   * ADMIN: Approve & Publish article via RPC function.
   */
  async approveAndPublish(articleId: string): Promise<{ success: boolean; error: string | null; article?: BlogPost }> {
    if (!isSupabaseConfigured) {
      const art = mockArticles.find(a => a.id === articleId);
      if (art) {
        art.status = 'published';
        art.published_at = new Date().toISOString();
        art.reviewed_at = new Date().toISOString();
      }
      return { success: true, error: null, article: art };
    }

    try {
      // Execute atomic RPC function approve_and_publish_article
      const { data, error } = await supabase!.rpc('approve_and_publish_article', {
        article_id: articleId
      });

      if (error) {
        // Fallback update if RPC not yet created in SQL
        const { data: fallbackData, error: fallbackErr } = await supabase!
          .from('blogs')
          .update({
            status: 'published',
            published_at: new Date().toISOString(),
            reviewed_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', articleId)
          .select()
          .single();

        if (fallbackErr) return { success: false, error: fallbackErr.message };
        return { success: true, error: null, article: fallbackData as BlogPost };
      }

      return { success: true, error: null, article: data as BlogPost };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  /**
   * ADMIN: Create manual article draft or published article.
   */
  async createArticle(article: Partial<BlogPost>): Promise<{ success: boolean; error: string | null; article?: BlogPost }> {
    if (!isSupabaseConfigured) {
      const newArt: BlogPost = {
        id: `manual-${Date.now()}`,
        title: article.title || 'Untitled Research',
        slug: article.slug || `manual-${Date.now()}`,
        excerpt: article.excerpt || '',
        content: article.content || '',
        featured_image: article.featured_image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200',
        category: article.category || 'LLMs',
        tags: article.tags || [],
        reading_time: article.reading_time || '5 min read',
        meta_title: article.meta_title || article.title || '',
        meta_description: article.meta_description || article.excerpt || '',
        published_at: article.status === 'published' ? new Date().toISOString() : null,
        status: article.status || 'draft',
        source_url: article.source_url || '',
        research_sources: article.research_sources || [],
        author: article.author || 'Sarpam Editorial Team',
        ai_model: article.ai_model || 'Manual Editorial',
        content_source: 'manual',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockArticles.unshift(newArt);
      return { success: true, error: null, article: newArt };
    }

    try {
      const payload = {
        ...article,
        published_at: article.status === 'published' ? new Date().toISOString() : null,
        content_source: article.content_source || 'manual',
        status: article.status || 'draft'
      };

      const { data, error } = await supabase!
        .from('blogs')
        .insert([payload])
        .select()
        .single();

      if (error) return { success: false, error: error.message };
      return { success: true, error: null, article: data as BlogPost };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  /**
   * ADMIN: Update existing article.
   */
  async updateArticle(articleId: string, updates: Partial<BlogPost>): Promise<{ success: boolean; error: string | null }> {
    if (!isSupabaseConfigured) {
      const art = mockArticles.find(a => a.id === articleId);
      if (art) {
        Object.assign(art, updates);
        art.updated_at = new Date().toISOString();
      }
      return { success: true, error: null };
    }

    try {
      const { error } = await supabase!
        .from('blogs')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', articleId);

      if (error) return { success: false, error: error.message };
      return { success: true, error: null };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }
};
