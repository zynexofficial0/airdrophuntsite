export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      submitted_articles: {
        Row: {
          id: string;
          article_title: string;
          excerpt: string;
          author: string;
          category: string;
          article_content: string;
          article_logo_url: string;
          tags: string | null;
          status: string;
          featured: boolean;
          slug: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          article_title: string;
          excerpt: string;
          author: string;
          category: string;
          article_content: string;
          article_logo_url: string;
          tags?: string | null;
          status?: string;
          featured?: boolean;
          slug: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      submitted_airdrops: {
        Row: {
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
          status: string;
          featured: boolean;
          slug: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_name: string;
          short_description: string;
          full_description: string;
          participation_steps: string;
          category: string;
          chain: string;
          reward_info: string;
          start_date?: string | null;
          end_date?: string | null;
          website_url?: string | null;
          twitter_url?: string | null;
          telegram_url?: string | null;
          discord_url?: string | null;
          logo_url: string;
          submitter_name: string;
          status?: string;
          featured?: boolean;
          slug: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          type: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          type: string;
          created_at?: string;
        };
      };
    };
  };
}
