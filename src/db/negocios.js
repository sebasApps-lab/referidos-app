// src/db/negocios.js
import { supabase } from "../lib/supabaseClient";
import { shortId } from "./utils/idGen";

export async function getNegocioById(id) {
  const { data, error } = await supabase.from("negocios").select("*").eq("id", id).single();
  if (error) return { ok: false, error };
  return { ok: true, data };
}

export async function createNegocio(n) {
  const payload = { ...n, id: n.id || `NEG_${shortId("")}`, fechaCreacion: new Date().toISOString() };
  const { data, error } = await supabase.from("negocios").insert(payload).select().single();
  if (error) return { ok: false, error };
  return { ok: true, data };
}

export async function listNegocios(limit = 100) {
  const { data, error } = await supabase.from("negocios").select("*").limit(limit);
  if (error) return { ok: false, error };
  return { ok: true, data };
}
