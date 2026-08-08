import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1. Verify Bearer Secret Token
    const authHeader = req.headers.get('Authorization');
    const expectedSecret = Deno.env.get('INGESTION_SECRET');

    if (!expectedSecret || authHeader !== `Bearer ${expectedSecret}`) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Invalid ingestion secret token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Parse & Validate Payload
    const payload = await req.json();
    const {
      title,
      slug,
      excerpt,
      content,
      featured_image,
      category,
      tags,
      reading_time,
      meta_title,
      meta_description,
      source_url,
      research_sources,
      author,
      ai_model
    } = payload;

    if (!title || !slug || !content || !category) {
      return new Response(
        JSON.stringify({ error: 'Validation Error: title, slug, content, and category are required.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 3. Initialize Supabase Admin Client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 4. Check Duplicate Slug
    const { data: existing } = await supabase
      .from('blogs')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existing) {
      return new Response(
        JSON.stringify({ error: `Conflict: Article with slug "${slug}" already exists.`, existingId: existing.id }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 5. Insert Draft Record
    const { data, error } = await supabase
      .from('blogs')
      .insert([
        {
          title,
          slug,
          excerpt: excerpt || title,
          content,
          featured_image: featured_image || null,
          category,
          tags: tags || [],
          reading_time: reading_time || '5 min read',
          meta_title: meta_title || title,
          meta_description: meta_description || excerpt || title,
          source_url: source_url || null,
          research_sources: research_sources || [],
          author: author || 'Sarpam Research Collective',
          ai_model: ai_model || 'n8n Autonomous Agent',
          content_source: 'n8n',
          status: payload.status || 'published',
          published_at: payload.status === 'draft' ? null : new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Article created successfully',
        article: {
          id: data.id,
          title: data.title,
          slug: data.slug,
          featured_image: data.featured_image,
          status: data.status,
          published_at: data.published_at
        }
      }),
      { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
