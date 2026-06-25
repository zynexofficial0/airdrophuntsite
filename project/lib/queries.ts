import { getServerSupabase } from '@/lib/supabase/server';
import type { Article, Airdrop } from '@/types';

export async function getFeaturedAirdrops(limit = 6): Promise<Airdrop[]> {
  const supabase = getServerSupabase();
  const { data } = await supabase
    .from('submitted_airdrops')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limit);
  return (data as unknown as Airdrop[]) ?? [];
}

export async function getLatestAirdrops(limit = 12): Promise<Airdrop[]> {
  const supabase = getServerSupabase();
  const { data } = await supabase
    .from('submitted_airdrops')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  return (data as unknown as Airdrop[]) ?? [];
}

export async function getAirdropBySlug(slug: string): Promise<Airdrop | null> {
  const supabase = getServerSupabase();
  const { data } = await supabase
    .from('submitted_airdrops')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  return (data as unknown as Airdrop) ?? null;
}

export async function getRelatedAirdrops(
  category: string,
  excludeId: string,
  limit = 3
): Promise<Airdrop[]> {
  const supabase = getServerSupabase();
  const { data } = await supabase
    .from('submitted_airdrops')
    .select('*')
    .eq('category', category)
    .neq('id', excludeId)
    .order('created_at', { ascending: false })
    .limit(limit);
  return (data as unknown as Airdrop[]) ?? [];
}

export async function getFeaturedArticles(limit = 4): Promise<Article[]> {
  const supabase = getServerSupabase();
  const { data } = await supabase
    .from('submitted_articles')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limit);
  return (data as unknown as Article[]) ?? [];
}

export async function getLatestArticles(limit = 12): Promise<Article[]> {
  const supabase = getServerSupabase();
  const { data } = await supabase
    .from('submitted_articles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  return (data as unknown as Article[]) ?? [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = getServerSupabase();
  const { data } = await supabase
    .from('submitted_articles')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  return (data as unknown as Article) ?? null;
}

export async function getRelatedArticles(
  category: string,
  excludeId: string,
  limit = 3
): Promise<Article[]> {
  const supabase = getServerSupabase();
  const { data } = await supabase
    .from('submitted_articles')
    .select('*')
    .eq('category', category)
    .neq('id', excludeId)
    .order('created_at', { ascending: false })
    .limit(limit);
  return (data as unknown as Article[]) ?? [];
}

export async function getStats() {
  const supabase = getServerSupabase();
  const [airdropsRes, articlesRes, activeRes] = await Promise.all([
    supabase.from('submitted_airdrops').select('*', { count: 'exact', head: true }),
    supabase.from('submitted_articles').select('*', { count: 'exact', head: true }),
    supabase
      .from('submitted_airdrops')
      .select('*', { count: 'exact', head: true })
      .in('status', ['live', 'upcoming']),
  ]);
  return {
    airdrops: airdropsRes.count ?? 0,
    articles: articlesRes.count ?? 0,
    active: activeRes.count ?? 0,
  };
}
