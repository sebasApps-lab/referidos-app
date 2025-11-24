// src/db/auth.js
import { supabase } from "../lib/supabaseClient";
import { shortId } from "./utils/idGen";

/**
 * Auth helpers (basic)
 * - findUserByEmail
 * - createUser
 * - loginLocal (simple password compare; for production use Supabase Auth)
 */

// find by email
export async function findUserByEmail(email) {
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("email", email)
    .limit(1);
  if (error) return { ok: false, error };
  return { ok: true, data: data?.[0] || null };
}

// create user record (caller may later integrate Supabase Auth)
export async function createUser(payload) {
  // payload should NOT include plain-sensitive fallback in prod;
  const user = {
    ...payload,
    id: payload.id || `USR_${shortId("")}`,
    fechaCreacion: new Date().toISOString(),
  };
  const { data, error } = await supabase
    .from("usuarios")
    .insert(user)
    .select()
    .single();
  if (error) return { ok: false, error };
  return { ok: true, data };
}

// simple login against usuarios table (development)
export async function loginLocal(email, password) {
  const r = await findUserByEmail(email);
  if (!r.ok) return r;
  const user = r.data;
  if (!user) return { ok: false, error: "Usuario no encontrado" };
  if (user.password !== password) return { ok: false, error: "Contraseña incorrecta" };
  return { ok: true, user };
}
