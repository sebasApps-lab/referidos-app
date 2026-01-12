// src/services/territoryClient.js
import { supabase } from "../lib/supabaseClient";
import { toTitleCaseEs } from "../utils/textCase";

const CACHE_TTL_MS = 10 * 60 * 1000;

const cache = {
  provincias: { ts: 0, data: [] },
  cantonesByProvincia: new Map(),
  parroquiasByCanton: new Map(),
};

function isFresh(entry) {
  return Date.now() - entry.ts < CACHE_TTL_MS;
}

export async function fetchProvincias() {
  if (isFresh(cache.provincias)) {
    return { ok: true, data: cache.provincias.data, cached: true };
  }

  const { data, error } = await supabase
    .from("provincias")
    .select("id, nombre")
    .order("nombre", { ascending: true });

  if (error) {
    return { ok: false, error: error.message || "No se pudo cargar provincias" };
  }

  const rows = (Array.isArray(data) ? data : []).map((row) => ({
    ...row,
    nombre: toTitleCaseEs(row.nombre),
  }));
  cache.provincias = { ts: Date.now(), data: rows };
  return { ok: true, data: rows, cached: false };
}

export async function fetchCantonesByProvincia(provinciaId) {
  if (!provinciaId) {
    return { ok: true, data: [] };
  }

  const cached = cache.cantonesByProvincia.get(provinciaId);
  if (cached && isFresh(cached)) {
    return { ok: true, data: cached.data, cached: true };
  }

  const { data, error } = await supabase
    .from("cantones")
    .select("id, nombre, provincia_id")
    .eq("provincia_id", provinciaId)
    .order("nombre", { ascending: true });

  if (error) {
    return { ok: false, error: error.message || "No se pudo cargar cantones" };
  }

  const rows = (Array.isArray(data) ? data : []).map((row) => ({
    ...row,
    nombre: toTitleCaseEs(row.nombre),
  }));
  cache.cantonesByProvincia.set(provinciaId, { ts: Date.now(), data: rows });
  return { ok: true, data: rows, cached: false };
}

export async function fetchParroquiasByCanton(cantonId) {
  if (!cantonId) {
    return { ok: true, data: [] };
  }

  const cached = cache.parroquiasByCanton.get(cantonId);
  if (cached && isFresh(cached)) {
    return { ok: true, data: cached.data, cached: true };
  }

  const { data, error } = await supabase
    .from("parroquias")
    .select("id, nombre, canton_id")
    .eq("canton_id", cantonId)
    .order("nombre", { ascending: true });

  if (error) {
    return { ok: false, error: error.message || "No se pudo cargar parroquias" };
  }

  const rows = (Array.isArray(data) ? data : []).map((row) => ({
    ...row,
    nombre: toTitleCaseEs(row.nombre),
  }));
  cache.parroquiasByCanton.set(cantonId, { ts: Date.now(), data: rows });
  return { ok: true, data: rows, cached: false };
}
