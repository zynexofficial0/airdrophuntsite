import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export function getSupabaseClient() {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });
}

let browserClient: ReturnType<typeof createClient<Database>> | null = null;
export function getBrowserSupabase() {
  if (browserClient) return browserClient;
  browserClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });
  return browserClient;
}
