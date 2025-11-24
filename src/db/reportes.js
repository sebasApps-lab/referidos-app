// src/db/reportes.js
import { supabase } from "../lib/supabaseClient";
import { shortId } from "./utils/idGen";

export async function createReport({ reporterId, reporterRole, targetId, targetType, texto }) {
  const id = `REP_${shortId("")}`;
  const payload = { id, reporterId, reporterRole, targetId, targetType, texto, fechaCreacion: new Date().toISOString() };
  const { data, error } = await supabase.from("reportes").insert(payload).select().single();
  if (error) return { ok: false, error };
  return { ok: true, data };
}

export async function listReports(limit = 50) {
  const { data, error } = await supabase.from("reportes").select("*").limit(limit);
  if (error) return { ok: false, error };
  return { ok: true, data };
}
