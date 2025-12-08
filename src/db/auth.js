// src/db/auth.js
import { supabase } from "../lib/supabaseClient";
import { shortId } from "./utils/idGen";

/**
 * Auth helpers (lectura/creación de perfiles, no maneja contraseñas).
 */

export async function findUserByEmail(email) {
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("email", email)
    .limit(1);
  if (error) return { ok: false, error };
  return { ok: true, data: data?.[0] || null };
}

// Crea/actualiza perfil de usuario (sin password)
export async function createUser(payload) {
  const { password: _password, ...rest } = payload;
  const user = {
    ...rest,
    id: payload.id || `USR_${shortId("")}`,
    fechaCreacion: new Date().toISOString(),
  };
  const { data, error } = await supabase.from("usuarios").upsert(user).select().single();
  if (error) return { ok: false, error };
  return { ok: true, data };
}

// Deshabilitado: la app debe usar Supabase Auth (PKCE)
export async function loginLocal() {
  return { ok: false, error: "loginLocal deshabilitado: usa Supabase Auth" };
}
