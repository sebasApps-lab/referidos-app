type ProviderResult = {
  id: string;
  label: string;
  lat: number;
  lng: number;
  street?: string | null;
  house_number?: string | null;
  city?: string | null;
  region?: string | null;
  country?: string | null;
  postcode?: string | null;
};

type Provincia = { id: string; nombre: string };
type Canton = { id: string; provincia_id?: string | null; nombre: string };
type Parroquia = {
  id: string;
  canton_id?: string | null;
  provincia_id?: string | null;
  nombre: string;
  tipo?: string | null;
};

export type NormalizedResult = {
  id: string;
  label: string;
  raw_label: string;
  display_label: string;
  lat: number;
  lng: number;
  calles?: string | null;
  house_number?: string | null;
  sector?: string | null;
  ciudad?: string | null;
  provincia_id?: string | null;
  provincia?: string | null;
  canton_id?: string | null;
  canton?: string | null;
  parroquia_id?: string | null;
  parroquia?: string | null;
  postcode?: string | null;
  country?: string | null;
  provider?: string | null;
  normalized?: boolean;
};

const TERRITORY_TTL_MS = 10 * 60 * 1000;
let territoryCache: {
  ts: number;
  provincias: Provincia[];
  cantones: Canton[];
  parroquias: Parroquia[];
  provinciaByName: Map<string, Provincia>;
  cantonByName: Map<string, Canton>;
  parroquiaByName: Map<string, Parroquia>;
  provinciaById: Map<string, Provincia>;
  cantonById: Map<string, Canton>;
  cabeceraByCantonId: Map<string, Parroquia>;
} | null = null;

function normalizeText(value: string) {
  let text = String(value || "").toLowerCase().trim();
  text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  text = text.replace(/[^a-z0-9\s]/g, " ");
  return text.replace(/\s+/g, " ").trim();
}

function normalizeTerritoryName(value: string) {
  let text = normalizeText(value);
  text = text.replace(/\bprovincia\b/g, "");
  text = text.replace(/\bprovincia de\b/g, "");
  text = text.replace(/\bcanton\b/g, "");
  text = text.replace(/\bcanton de\b/g, "");
  text = text.replace(/\bparroquia\b/g, "");
  text = text.replace(/\bdistrito metropolitano de\b/g, "");
  text = text.replace(/\bdistrito metropolitano\b/g, "");
  text = text.replace(/\bdmq\b/g, "");
  return text.replace(/\s+/g, " ").trim();
}

function buildTerritoryMaps(data: {
  provincias: Provincia[];
  cantones: Canton[];
  parroquias: Parroquia[];
}) {
  const provinciaByName = new Map<string, Provincia>();
  const cantonByName = new Map<string, Canton>();
  const parroquiaByName = new Map<string, Parroquia>();
  const provinciaById = new Map<string, Provincia>();
  const cantonById = new Map<string, Canton>();
  const cabeceraByCantonId = new Map<string, Parroquia>();

  data.provincias.forEach((prov) => {
    provinciaById.set(prov.id, prov);
    const key = normalizeTerritoryName(prov.nombre);
    if (key && !provinciaByName.has(key)) {
      provinciaByName.set(key, prov);
    }
  });

  data.cantones.forEach((canton) => {
    cantonById.set(canton.id, canton);
    const key = normalizeTerritoryName(canton.nombre);
    if (key && !cantonByName.has(key)) {
      cantonByName.set(key, canton);
    }
  });

  data.parroquias.forEach((parroquia) => {
    const key = normalizeTerritoryName(parroquia.nombre);
    if (key && !parroquiaByName.has(key)) {
      parroquiaByName.set(key, parroquia);
    }
    const tipo = normalizeText(parroquia.tipo || "");
    if (tipo.includes("cabecera cantonal") && parroquia.canton_id) {
      if (!cabeceraByCantonId.has(parroquia.canton_id)) {
        cabeceraByCantonId.set(parroquia.canton_id, parroquia);
      }
    }
  });

  return {
    provinciaByName,
    cantonByName,
    parroquiaByName,
    provinciaById,
    cantonById,
    cabeceraByCantonId,
  };
}

async function loadTerritories(supabaseAdmin: any) {
  if (territoryCache && Date.now() - territoryCache.ts < TERRITORY_TTL_MS) {
    return territoryCache;
  }

  const [provRes, cantonRes, parroRes] = await Promise.all([
    supabaseAdmin.from("provincias").select("id, nombre"),
    supabaseAdmin.from("cantones").select("id, provincia_id, nombre"),
    supabaseAdmin.from("parroquias").select("id, canton_id, provincia_id, nombre, tipo"),
  ]);

  const provincias = Array.isArray(provRes.data) ? provRes.data : [];
  const cantones = Array.isArray(cantonRes.data) ? cantonRes.data : [];
  const parroquias = Array.isArray(parroRes.data) ? parroRes.data : [];

  const maps = buildTerritoryMaps({ provincias, cantones, parroquias });

  territoryCache = {
    ts: Date.now(),
    provincias,
    cantones,
    parroquias,
    ...maps,
  };

  return territoryCache;
}

function parseLabel(rawLabel: string) {
  const parts = String(rawLabel || "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  const streetLabel = parts[0] || "";
  const secondPart = parts[1] || "";
  const match = secondPart.match(/(\d{4,7})/);
  const postcode = match ? match[1] : null;
  let afterPostcode = secondPart;
  if (match) {
    afterPostcode = secondPart.slice(match.index + match[1].length).trim();
  }
  afterPostcode = afterPostcode.replace(/^[-\s,]+/, "").trim();
  return { streetLabel, postcode, afterPostcode };
}

function cleanStreet(street: string, houseNumber: string | null) {
  let value = String(street || "").trim();
  if (!value) return "";
  if (houseNumber) {
    const escaped = houseNumber.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`\\b${escaped}\\b`, "i");
    value = value.replace(re, " ").trim();
  }
  return value.replace(/\s+/g, " ").trim();
}

function buildDisplayLabel(result: {
  ciudad?: string | null;
  canton?: string | null;
  parroquia?: string | null;
  sector?: string | null;
  calles?: string | null;
  postcode?: string | null;
  provincia?: string | null;
}) {
  const parts: string[] = [];
  if (result.ciudad) {
    parts.push(result.ciudad);
  } else if (result.canton) {
    parts.push(result.canton);
  } else if (result.parroquia) {
    parts.push(result.parroquia);
  }
  if (result.sector) parts.push(result.sector);
  if (result.calles) parts.push(result.calles);
  if (result.postcode) parts.push(result.postcode);
  if (result.provincia) parts.push(result.provincia);
  return parts.filter(Boolean).join(", ");
}

export async function normalizeMapTilerResults(
  results: ProviderResult[],
  supabaseAdmin: any,
) {
  const territory = await loadTerritories(supabaseAdmin);

  const normalized = results.map((result) => {
    const rawLabel = String(result.label || "");
    const { streetLabel, postcode: labelPostcode, afterPostcode } =
      parseLabel(rawLabel);
    const houseNumber = result.house_number ?? null;
    const calles = cleanStreet(result.street || streetLabel, houseNumber);
    const sector = result.city ? String(result.city) : null;
    const postcode = result.postcode || labelPostcode || null;

    const segment = normalizeTerritoryName(afterPostcode);
    let cantonMatch: Canton | null = null;
    let parroquiaMatch: Parroquia | null = null;
    if (segment) {
      cantonMatch = territory.cantonByName.get(segment) ?? null;
      if (!cantonMatch) {
        parroquiaMatch = territory.parroquiaByName.get(segment) ?? null;
      }
    }

    let cantonId: string | null = null;
    let cantonName: string | null = null;
    let parroquiaId: string | null = null;
    let parroquiaText: string | null = null;
    let ciudad: string | null = null;
    let provinciaId: string | null = null;
    let provinciaName: string | null = null;

    if (cantonMatch) {
      cantonId = cantonMatch.id;
      cantonName = cantonMatch.nombre;
      provinciaId = cantonMatch.provincia_id ?? null;
      const cabecera = cantonId
        ? territory.cabeceraByCantonId.get(cantonId) ?? null
        : null;
      ciudad = cabecera?.nombre ?? null;
    } else if (parroquiaMatch) {
      parroquiaId = parroquiaMatch.id;
      cantonId = parroquiaMatch.canton_id ?? null;
      cantonName = cantonId ? territory.cantonById.get(cantonId)?.nombre ?? null : null;
      provinciaId = parroquiaMatch.provincia_id ?? null;
      ciudad = null;
    } else if (afterPostcode) {
      parroquiaText = afterPostcode;
    }

    if (!provinciaId && result.region) {
      const regionKey = normalizeTerritoryName(result.region);
      const provinciaMatch = territory.provinciaByName.get(regionKey) ?? null;
      provinciaId = provinciaMatch?.id ?? null;
    }

    if (provinciaId) {
      provinciaName = territory.provinciaById.get(provinciaId)?.nombre ?? null;
    }

    if (!provinciaName && result.region) {
      provinciaName = String(result.region);
    }

    const displayLabel = buildDisplayLabel({
      ciudad,
      canton: cantonName,
      parroquia: parroquiaText,
      sector,
      calles,
      postcode,
      provincia: provinciaName,
    });

    return {
      id: String(result.id || rawLabel),
      label: rawLabel,
      raw_label: rawLabel,
      display_label: displayLabel,
      lat: Number(result.lat ?? 0),
      lng: Number(result.lng ?? 0),
      calles: calles || null,
      house_number: houseNumber || null,
      sector: sector || null,
      ciudad: ciudad || null,
      provincia_id: provinciaId || null,
      provincia: provinciaName || null,
      canton_id: cantonId || null,
      canton: cantonName || null,
      parroquia_id: parroquiaId || null,
      parroquia: parroquiaText || null,
      postcode: postcode || null,
      country: result.country ? String(result.country) : null,
      provider: "maptiler",
      normalized: true,
    } as NormalizedResult;
  });

  const counts = new Map<string, number>();
  normalized.forEach((item) => {
    const key = item.display_label || "";
    if (!key) return;
    counts.set(key, (counts.get(key) || 0) + 1);
  });

  normalized.forEach((item) => {
    const key = item.display_label || "";
    const duplicates = key && (counts.get(key) || 0) > 1;
    if (!duplicates || !item.house_number) return;
    item.display_label = [key, item.house_number].filter(Boolean).join(", ");
  });

  return normalized;
}

export function normalizeNominatimResults(results: ProviderResult[]) {
  return results.map((result) => {
    const rawLabel = String(result.label || "");
    const displayLabel = rawLabel;
    const calleLabel = cleanStreet(result.street || "", result.house_number ?? null);
    return {
      id: String(result.id || rawLabel),
      label: rawLabel,
      raw_label: rawLabel,
      display_label: displayLabel,
      lat: Number(result.lat ?? 0),
      lng: Number(result.lng ?? 0),
      calles: calleLabel || null,
      house_number: result.house_number ?? null,
      sector: result.city ? String(result.city) : null,
      ciudad: null,
      provincia_id: null,
      provincia: result.region ? String(result.region) : null,
      canton_id: null,
      canton: null,
      parroquia_id: null,
      parroquia: null,
      postcode: result.postcode ?? null,
      country: result.country ? String(result.country) : null,
      provider: "nominatim",
      normalized: false,
    } as NormalizedResult;
  });
}

