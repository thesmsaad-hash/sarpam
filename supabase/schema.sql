-- ==================================================
-- SARPAM PRODUCTION DATABASE MIGRATION SCHEMA
-- Target Database: Supabase PostgreSQL
-- Execute in Supabase SQL Editor
-- ==================================================

-- 1. Create blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  reading_time TEXT DEFAULT '5 min read',
  meta_title TEXT,
  meta_description TEXT,
  source_url TEXT,
  research_sources JSONB DEFAULT '[]'::jsonb,
  author TEXT DEFAULT 'Sarpam Research Collective',
  ai_model TEXT,
  content_source TEXT DEFAULT 'n8n', -- 'n8n' | 'manual'
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'rejected')),
  rejection_reason TEXT,
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ DEFAULT NULL -- NULL until published!
);

-- 2. Create admin_users table for explicit admin authorization
CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Automatic updated_at trigger function
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS blogs_updated_at ON public.blogs;
CREATE TRIGGER blogs_updated_at
BEFORE UPDATE ON public.blogs
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 4. Security Definer Helper Function: is_admin()
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users WHERE user_id = auth.uid() AND role = 'admin'
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;

-- 5. Atomic Approve & Publish RPC Function
CREATE OR REPLACE FUNCTION public.approve_and_publish_article(article_id UUID)
RETURNS public.blogs LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  updated_record public.blogs;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied: Admin privileges required';
  END IF;

  UPDATE public.blogs
  SET status = 'published',
      published_at = NOW(),
      reviewed_at = NOW(),
      reviewed_by = auth.uid(),
      updated_at = NOW()
  WHERE id = article_id AND status IN ('draft', 'review')
  RETURNING * INTO updated_record;

  IF updated_record IS NULL THEN
    RAISE EXCEPTION 'Article not found or not in draft/review status';
  END IF;

  RETURN updated_record;
END;
$$;

REVOKE ALL ON FUNCTION public.approve_and_publish_article(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.approve_and_publish_article(UUID) TO authenticated;

-- 6. Row Level Security Policies
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Public & Admin SELECT policy (allows reading blogs table)
DROP POLICY IF EXISTS "Public can read published articles" ON public.blogs;
DROP POLICY IF EXISTS "Admins can read all articles" ON public.blogs;
CREATE POLICY "Anyone can read blogs"
ON public.blogs FOR SELECT
USING (true);

-- Admins can INSERT articles
DROP POLICY IF EXISTS "Admins can create articles" ON public.blogs;
CREATE POLICY "Admins can create articles"
ON public.blogs FOR INSERT TO authenticated
WITH CHECK (public.is_admin());

-- Admins can UPDATE articles
DROP POLICY IF EXISTS "Admins can update articles" ON public.blogs;
CREATE POLICY "Admins can update articles"
ON public.blogs FOR UPDATE TO authenticated
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 7. Supabase Storage Setup for blog-images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access for blog-images storage objects
DROP POLICY IF EXISTS "Public Read Access for blog-images" ON storage.objects;
CREATE POLICY "Public Read Access for blog-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');
