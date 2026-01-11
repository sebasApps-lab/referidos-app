// supabase/functions/address-reverse/index.ts
// Reverse geocoding with provider fallback and cache.

import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  normalizeMapTilerResults,
  normalizeNominatimResults,
  type NormalizedResult,
} from "../_shared/addressNormalize.ts";

const supabaseUrl = Deno.env.get("URL") ?? Deno.env.get("SUPABASE_URL");
const publishableKey =
  Deno.env.get("PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY");
const secretKey =
  Deno.env.get("SECRET_KEY") ?? Deno.env.get("SUPABASE_SECRET_KEY");

if (!supabaseUrl || !publishableKey || !secretKey) {
  throw new Error(
    "Missing Supabase env vars: SUPABASE_URL/URL, PUBLISHABLE_KEY, SECRET_KEY",
  );
}

const supabasePublic = createClient(supabaseUrl, publishableKey);
const supabaseAdmin = createClient(supabaseUrl, secretKey);

const MAPTILER_KEY =
  Deno.env.get("MAPTILER_API_KEY") ?? Deno.env.get("MAPTILER_KEY") ?? "";
const MAPTILER_BASE =
  Deno.env.get("MAPTILER_BASE_URL") ?? "https://api.maptiler.com/geocoding";
const OSM_BASE =
  Deno.env.get("OSM_BASE_URL") ?? "https://nominatim.openstreetmap.org";
const OSM_USER_AGENT =
  Deno.env.get("OSM_USER_AGENT") ??
  "referidos-app/1.0 (contacto@referidos.app)";
const OSM_EMAIL = Deno.env.get("OSM_EMAIL") ?? "";

const CACHE_TTL_DAYS = parseInt(
  Deno.env.get("ADDRESS_CACHE_TTL_DAYS") ?? "30",
  10,
);
const OSM_MIN_INTERVAL_MS = parseInt(
  Deno.env.get("OSM_MIN_INTERVAL_MS") ?? "1100",
  10,
);

let lastOsmRequestAt = 0;

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

serve(async (req) => {
  const origin = req.headers.get("origin") || "*";
  const corsHeaders = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ ok: false, message: "Method not allowed" }, 405, corsHeaders);
  }

  const auth = await getAuthUser(req, corsHeaders);
  if (auth instanceof Response) return auth;

  let payload: { lat?: number; lng?: number; language?: string } = {};
  try {
    payload = await req.json();
  } catch {
    return json({ ok: false, message: "Invalid JSON" }, 400, corsHeaders);
  }

  const lat = Number(payload.lat);
  const lng = Number(payload.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return json({ ok: false, message: "Missing coordinates" }, 400, corsHeaders);
  }

  const language = String(payload.language ?? "es").trim().toLowerCase();
  const queryKey = buildReverseKey(lat, lng, language);

  const cached = await getCachedResult(queryKey, false);
  if (cached?.results?.length) {
    return json(
      {
        ok: true,
        source: "cache",
        cached: true,
        provider: cached.provider,
        result: cached.results[0],
      },
      200,
      corsHeaders,
    );
  }

  let maptilerRateLimited = false;
  if (MAPTILER_KEY) {
    const maptiler = await reverseMapTiler({ lat, lng, language });
    if (maptiler.ok && maptiler.result) {
      const normalized = await normalizeMapTilerResults(
        [maptiler.result],
        supabaseAdmin,
      );
      const result = normalized[0] ?? null;
      if (result) {
        await storeCache({
          query: `${lat},${lng}`,
          queryKey,
          provider: "maptiler",
          results: [result],
        });
        return json(
          {
            ok: true,
            source: "maptiler",
            cached: false,
            provider: "maptiler",
            result,
          },
          200,
          corsHeaders,
        );
      }
    }
    maptilerRateLimited = maptiler.rateLimited === true;
  }

  if (!MAPTILER_KEY || maptilerRateLimited) {
    const osm = await reverseNominatim({ lat, lng, language });
    if (osm.ok && osm.result) {
      const normalized = normalizeNominatimResults([osm.result]);
      const result = normalized[0] ?? null;
      if (result) {
        await storeCache({
          query: `${lat},${lng}`,
          queryKey,
          provider: "nominatim",
          results: [result],
        });
        return json(
          {
            ok: true,
            source: "nominatim",
            cached: false,
            provider: "nominatim",
            result,
          },
          200,
          corsHeaders,
        );
      }
    }
  }

  const stale = await getCachedResult(queryKey, true);
  if (stale?.results?.length) {
    return json(
      {
        ok: true,
        source: "cache-stale",
        cached: true,
        provider: stale.provider,
        result: stale.results[0],
      },
      200,
      corsHeaders,
    );
  }

  return json({ ok: false, message: "No result" }, 200, corsHeaders);
});

async function getAuthUser(req: Request, corsHeaders: Record<string, string>) {
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.replace("Bearer ", "").trim();
  if (!token) {
    return json({ ok: false, message: "Unauthorized" }, 401, corsHeaders);
  }

  const {
    data: { user },
    error,
  } = await supabasePublic.auth.getUser(token);

  if (error || !user) {
    return json({ ok: false, message: "Unauthorized" }, 401, corsHeaders);
  }

  return user;
}

function buildReverseKey(lat: number, lng: number, language: string) {
  const latKey = lat.toFixed(6);
  const lngKey = lng.toFixed(6);
  return `reverse|${latKey}|${lngKey}|${language}`;
}

async function getCachedResult(queryKey: string, allowExpired: boolean) {
  const nowIso = new Date().toISOString();
  const baseQuery = supabaseAdmin
    .from("address_search_cache")
    .select("provider, results, expires_at, created_at")
    .eq("query_key", queryKey)
    .order("created_at", { ascending: false })
    .limit(1);

  const { data } = allowExpired
    ? await baseQuery.maybeSingle()
    : await baseQuery.gt("expires_at", nowIso).maybeSingle();

  if (!data) return null;
  return data as { provider: string; results: NormalizedResult[] };
}

async function storeCache({
  query,
  queryKey,
  provider,
  results,
}: {
  query: string;
  queryKey: string;
  provider: string;
  results: NormalizedResult[];
}) {
  const expiresAt = new Date(
    Date.now() + CACHE_TTL_DAYS * 24 * 60 * 60 * 1000,
  ).toISOString();

  await supabaseAdmin
    .from("address_search_cache")
    .upsert(
      {
        query,
        query_key: queryKey,
        provider,
        results,
        expires_at: expiresAt,
      },
      { onConflict: "query_key,provider" },
    );
}

async function reverseMapTiler({
  lat,
  lng,
  language,
}: {
  lat: number;
  lng: number;
  language: string;
}) {
  if (!MAPTILER_KEY) {
    return { ok: false, rateLimited: false, result: null };
  }

  const url = new URL(`${MAPTILER_BASE}/${lng},${lat}.json`);
  url.searchParams.set("key", MAPTILER_KEY);
  url.searchParams.set("language", language);

  const res = await fetch(url.toString());
  if (res.status === 429 || res.status === 402) {
    return { ok: false, rateLimited: true, result: null };
  }
  if (!res.ok) return { ok: false, rateLimited: false, result: null };

  const data = await res.json();
  const feature = Array.isArray(data?.features) ? data.features[0] : null;
  if (!feature) return { ok: false, result: null };

  const center = Array.isArray(feature?.center) ? feature.center : [];
  const [centerLng, centerLat] = center;
  const context = Array.isArray(feature?.context) ? feature.context : [];
  const pickContext = (prefixes: string[]) =>
    context.find((item: any) =>
      prefixes.some((prefix) => String(item?.id || "").startsWith(prefix)),
    )?.text ?? null;

  const result: ProviderResult = {
    id: String(feature?.id ?? feature?.place_name ?? ""),
    label: String(feature?.place_name ?? feature?.text ?? ""),
    lat: Number(centerLat ?? lat),
    lng: Number(centerLng ?? lng),
    street: feature?.text ?? null,
    house_number: feature?.address ?? null,
    city: pickContext(["place", "locality", "neighborhood", "district"]),
    region: pickContext(["region"]),
    country: pickContext(["country"]),
    postcode: pickContext(["postcode"]),
  };

  return { ok: true, rateLimited: false, result };
}

async function reverseNominatim({
  lat,
  lng,
  language,
}: {
  lat: number;
  lng: number;
  language: string;
}) {
  const now = Date.now();
  const waitMs = Math.max(0, OSM_MIN_INTERVAL_MS - (now - lastOsmRequestAt));
  if (waitMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }
  lastOsmRequestAt = Date.now();

  const url = new URL(`${OSM_BASE}/reverse`);
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lng));
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("addressdetails", "1");
  if (language) url.searchParams.set("accept-language", language);
  if (OSM_EMAIL) url.searchParams.set("email", OSM_EMAIL);

  const res = await fetch(url.toString(), {
    headers: {
      "User-Agent": OSM_USER_AGENT,
    },
  });

  if (!res.ok) return { ok: false, result: null };

  const data = await res.json();
  const result: ProviderResult = {
    id: String(data?.place_id ?? data?.osm_id ?? ""),
    label: String(data?.display_name ?? ""),
    lat: Number(data?.lat ?? lat),
    lng: Number(data?.lon ?? lng),
    street: data?.address?.road ?? null,
    house_number: data?.address?.house_number ?? null,
    city: data?.address?.city ?? data?.address?.town ?? data?.address?.village ??
      null,
    region: data?.address?.state ?? null,
    country: data?.address?.country ?? null,
    postcode: data?.address?.postcode ?? null,
  };

  return { ok: true, result };
}

function json(
  body: unknown,
  status = 200,
  headers: Record<string, string> = {},
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}
