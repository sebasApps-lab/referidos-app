import { createClient } from "@supabase/supabase-js";

export function getSupabaseAdminClient() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const secret =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY;

  if (!url) {
    throw new Error("Missing SUPABASE_URL (or VITE_SUPABASE_URL)");
  }
  if (!secret) {
    throw new Error("Missing SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY)");
  }

  return createClient(url, secret, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function mustSingle(queryPromise, context) {
  const { data, error } = await queryPromise;
  if (error) throw new Error(`${context}: ${error.message}`);
  if (!data) throw new Error(`${context}: empty response`);
  return data;
}

export async function mustData(queryPromise, context) {
  const { data, error } = await queryPromise;
  if (error) throw new Error(`${context}: ${error.message}`);
  return data || [];
}
