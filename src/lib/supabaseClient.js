// src/lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

/**
 * Profesional / seguro: usar SOLO variables de entorno (no fallback en el código).
 * Necesitas definir en .env (Vite):
 * VITE_SUPABASE_URL=https://...supabase.co
 * VITE_SUPABASE_ANON_KEY=ey...
 */
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Missing Supabase env vars. Define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env"
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export default supabase;
