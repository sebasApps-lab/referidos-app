const CACHE_TTL_MS = 10 * 60 * 1000;

const cache = {
  provincias: { ts: 0, data: [] },
  cantonesByProvincia: new Map(),
  parroquiasByCanton: new Map(),
};

function toTitleCaseEs(value) {
  const text = String(value || "").trim().toLowerCase();
  if (!text) return "";
  return text
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function isFresh(ts) {
  return Date.now() - Number(ts || 0) < CACHE_TTL_MS;
}

export async function fetchProvincias(supabase) {
  if (isFresh(cache.provincias.ts)) {
    return { ok: true, data: cache.provincias.data, cached: true };
  }

  const { data, error } = await supabase
    .from("provincias")
    .select("id, nombre")
    .order("nombre", { ascending: true });

  if (error) {
    return { ok: false, error: error.message || "No se pudo cargar provincias." };
  }

  const rows = (Array.isArray(data) ? data : []).map((row) => ({
    ...row,
    nombre: toTitleCaseEs(row?.nombre),
  }));
  cache.provincias = { ts: Date.now(), data: rows };
  return { ok: true, data: rows, cached: false };
}

export async function fetchCantonesByProvincia(supabase, provinciaId) {
  const provincia = String(provinciaId || "").trim();
  if (!provincia) return { ok: true, data: [] };

  const cached = cache.cantonesByProvincia.get(provincia);
  if (cached && isFresh(cached.ts)) {
    return { ok: true, data: cached.data, cached: true };
  }

  const { data, error } = await supabase
    .from("cantones")
    .select("id, nombre, provincia_id")
    .eq("provincia_id", provincia)
    .order("nombre", { ascending: true });

  if (error) {
    return { ok: false, error: error.message || "No se pudo cargar cantones." };
  }

  const rows = (Array.isArray(data) ? data : []).map((row) => ({
    ...row,
    nombre: toTitleCaseEs(row?.nombre),
  }));
  cache.cantonesByProvincia.set(provincia, { ts: Date.now(), data: rows });
  return { ok: true, data: rows, cached: false };
}

export async function fetchParroquiasByCanton(supabase, cantonId) {
  const canton = String(cantonId || "").trim();
  if (!canton) return { ok: true, data: [] };

  const cached = cache.parroquiasByCanton.get(canton);
  if (cached && isFresh(cached.ts)) {
    return { ok: true, data: cached.data, cached: true };
  }

  const { data, error } = await supabase
    .from("parroquias")
    .select("id, nombre, canton_id")
    .eq("canton_id", canton)
    .order("nombre", { ascending: true });

  if (error) {
    return { ok: false, error: error.message || "No se pudo cargar parroquias." };
  }

  const rows = (Array.isArray(data) ? data : []).map((row) => ({
    ...row,
    nombre: toTitleCaseEs(row?.nombre),
  }));
  cache.parroquiasByCanton.set(canton, { ts: Date.now(), data: rows });
  return { ok: true, data: rows, cached: false };
}
