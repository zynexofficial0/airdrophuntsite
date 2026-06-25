export type ArticleStatus = 'pending' | 'approved' | 'rejected';
export type AirdropStatus = 'live' | 'upcoming' | 'ended' | 'pending';

export interface Article {
  id: string;
  article_title: string;
  excerpt: string;
  author: string;
  category: string;
  article_content: string;
  article_logo_url: string;
  tags: string | null;
  status: ArticleStatus;
  featured: boolean;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Airdrop {
  id: string;
  project_name: string;
  short_description: string;
  full_description: string;
  participation_steps: string;
  category: string;
  chain: string;
  reward_info: string;
  start_date: string | null;
  end_date: string | null;
  website_url: string | null;
  twitter_url: string | null;
  telegram_url: string | null;
  discord_url: string | null;
  logo_url: string;
  submitter_name: string;
  status: AirdropStatus;
  featured: boolean;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'article' | 'airdrop' | 'both';
  created_at: string;
}
