import { createClient } from '@supabase/supabase-js';

let cached: ReturnType<typeof createClient<any>> | null = null;

export function getSupabaseAdmin() {
  if (cached) return cached;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Supabase is not configured. Add SUPABASE_URL and SUPABASE_SECRET_KEY to the environment variables.');
  }
  cached = createClient<any>(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { headers: { 'X-Client-Info': 'queuezero-college-demo' } },
  });
  return cached;
}
