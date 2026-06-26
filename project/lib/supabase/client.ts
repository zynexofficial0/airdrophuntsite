import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

function getSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Supabase configuration missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.'
    );
  }

  return { supabaseUrl, supabaseAnonKey };
}

const getClient = (): SupabaseClient<Database> => {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });
};

export function getSupabaseClient(): SupabaseClient<Database> {
  return getClient();
}

let browserClient: SupabaseClient<Database> | null = null;
export function getBrowserSupabase(): SupabaseClient<Database> {
  if (browserClient) return browserClient;

  browserClient = getClient();
  return browserClient;
}
