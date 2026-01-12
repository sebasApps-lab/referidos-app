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

type DisplayFields = {
  provincia: string | null;
  ciudad: string | null;
  sector: string | null;
  calles: string | null;
  postcode: string | null;
  house_number: string | null;
  canton: string | null;
  parroquia: string | null;
  country: string | null;
};

export type NormalizedResult = {
  id: string;
  label: string;
  raw_label: string;
  display_label: string;
  display_fields: DisplayFields;
  display_parts: Array<string | null>;
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

const LOWERCASE_WORDS = new Set([
  "a",
  "al",
  "de",
  "del",
  "el",
  "la",
  "las",
  "los",
  "y",
  "e",
  "o",
  "u",
  "en",
]);

function toTitleCaseEs(value: string | null) {
  const text = String(value || "").trim();
  if (!text) return null;
  const lower = text.toLowerCase().replace(/\s+/g, " ");
  const words = lower.split(" ");
  const mapped = words.map((word, index) => {
    if (!word) return word;
    const parts = word.split(/([-/'’])/);
    return parts
      .map((part) => {
        if (part === "-" || part === "/" || part === "'" || part === "’") {
          return part;
        }
        if (!part) return part;
        if (index > 0 && LOWERCASE_WORDS.has(part)) {
          return part;
        }
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join("");
  });
  return mapped.join(" ");
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

function formatProvince(value: string | null) {
  return toTitleCaseEs(value);
}

function buildDisplayParts(
  fields: DisplayFields,
  options: { includePostcode: boolean; includeHouseNumber: boolean }
) {
  const parts: Array<string | null> = new Array(4).fill(null);
  const parroquiaOrCiudad = fields.parroquia || fields.ciudad || null;
  const cantonFallback = !parroquiaOrCiudad ? fields.canton || null : null;

  let calles = fields.calles || null;
  if (calles && options.includeHouseNumber && fields.house_number) {
    calles = `${calles} ${fields.house_number}`.trim();
  }

  const locality = parroquiaOrCiudad || cantonFallback;

  const sectorWithPostcode = [
    fields.postcode || null,
    fields.sector || null,
  ].filter((value) => value).join(" ").trim() || null;

  parts[0] = calles;
  parts[1] = locality;
  parts[2] = fields.provincia || null;
  parts[3] = sectorWithPostcode;

  return parts;
}

function buildDisplayKey(parts: Array<string | null>) {
  return parts
    .map((part) => normalizeText(part || ""))
    .join("|")
    .trim();
}

function applyDisplayParts(results: NormalizedResult[]) {
  const baseKeys = new Map<string, number>();
  const baseParts = results.map((item) => {
    const parts = buildDisplayParts(item.display_fields, {
      includePostcode: false,
      includeHouseNumber: false,
    });
    const key = buildDisplayKey(parts);
    baseKeys.set(key, (baseKeys.get(key) || 0) + 1);
    return { parts, key };
  });

  const includePostcode = baseParts.map(({ key }) => (baseKeys.get(key) || 0) > 1);

  const postcodeKeys = new Map<string, number>();
  const postcodeParts = results.map((item, index) => {
    const parts = buildDisplayParts(item.display_fields, {
      includePostcode: includePostcode[index],
      includeHouseNumber: false,
    });
    const key = buildDisplayKey(parts);
    postcodeKeys.set(key, (postcodeKeys.get(key) || 0) + 1);
    return { parts, key };
  });

  const includeHouseNumber = postcodeParts.map(({ key }, index) =>
    includePostcode[index] && (postcodeKeys.get(key) || 0) > 1
  );

  results.forEach((item, index) => {
    const parts = buildDisplayParts(item.display_fields, {
      includePostcode: includePostcode[index],
      includeHouseNumber: includeHouseNumber[index],
    });
    item.display_parts = parts;
    item.display_label = parts.filter(Boolean).join(", ");
  });

  return results;
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
    const formattedLabel = toTitleCaseEs(rawLabel) || rawLabel;
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
      parroquiaText = parroquiaMatch.nombre;
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

    const formattedCalles = calles ? toTitleCaseEs(calles) : null;
    const formattedSector = sector ? toTitleCaseEs(sector) : null;
    const formattedCiudad = ciudad ? toTitleCaseEs(ciudad) : null;
    const formattedCanton = cantonName ? toTitleCaseEs(cantonName) : null;
    const formattedParroquia = parroquiaText ? toTitleCaseEs(parroquiaText) : null;
    const formattedProvincia = provinciaName ? toTitleCaseEs(provinciaName) : null;
    const formattedCountry = result.country
      ? toTitleCaseEs(String(result.country))
      : null;

    const displayFields: DisplayFields = {
      provincia: formatProvince(formattedProvincia || null),
      ciudad: formattedCiudad || null,
      sector: formattedSector || null,
      calles: formattedCalles || null,
      postcode: postcode || null,
      house_number: houseNumber || null,
      canton: formattedCanton || null,
      parroquia: formattedParroquia || null,
      country: formattedCountry || null,
    };
    return {
      id: String(result.id || rawLabel),
      label: formattedLabel,
      raw_label: formattedLabel,
      display_label: "",
      display_fields: displayFields,
      display_parts: [],
      lat: Number(result.lat ?? 0),
      lng: Number(result.lng ?? 0),
      calles: formattedCalles || null,
      house_number: houseNumber || null,
      sector: formattedSector || null,
      ciudad: formattedCiudad || null,
      provincia_id: provinciaId || null,
      provincia: formattedProvincia || null,
      canton_id: cantonId || null,
      canton: formattedCanton || null,
      parroquia_id: parroquiaId || null,
      parroquia: formattedParroquia || null,
      postcode: postcode || null,
      country: formattedCountry || null,
      provider: "maptiler",
      normalized: true,
    } as NormalizedResult;
  });

  return applyDisplayParts(normalized);
}

export function normalizeNominatimResults(results: ProviderResult[]) {
  const normalized = results.map((result) => {
    const rawLabel = String(result.label || "");
    const formattedLabel = toTitleCaseEs(rawLabel) || rawLabel;
    const calleLabel = cleanStreet(result.street || "", result.house_number ?? null);
    const formattedCalles = calleLabel ? toTitleCaseEs(calleLabel) : null;
    const formattedSector = result.city ? toTitleCaseEs(String(result.city)) : null;
    const formattedProvincia = result.region
      ? toTitleCaseEs(String(result.region))
      : null;
    const formattedCountry = result.country
      ? toTitleCaseEs(String(result.country))
      : null;
    const displayFields: DisplayFields = {
      provincia: formatProvince(formattedProvincia || null),
      ciudad: null,
      sector: formattedSector || null,
      calles: formattedCalles || null,
      postcode: result.postcode ?? null,
      house_number: result.house_number ?? null,
      canton: null,
      parroquia: null,
      country: formattedCountry || null,
    };
    return {
      id: String(result.id || rawLabel),
      label: formattedLabel,
      raw_label: formattedLabel,
      display_label: "",
      display_fields: displayFields,
      display_parts: [],
      lat: Number(result.lat ?? 0),
      lng: Number(result.lng ?? 0),
      calles: formattedCalles || null,
      house_number: result.house_number ?? null,
      sector: formattedSector || null,
      ciudad: null,
      provincia_id: null,
      provincia: formattedProvincia || null,
      canton_id: null,
      canton: null,
      parroquia_id: null,
      parroquia: null,
      postcode: result.postcode ?? null,
      country: formattedCountry || null,
      provider: "nominatim",
      normalized: false,
    } as NormalizedResult;
  });
  return applyDisplayParts(normalized);
}
