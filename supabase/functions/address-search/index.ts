// supabase/functions/address-search/index.ts
// Address autocomplete with provider fallback and cache.

import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
const MAX_LIMIT = parseInt(Deno.env.get("ADDRESS_SEARCH_MAX_LIMIT") ?? "8", 10);
const OSM_MIN_INTERVAL_MS = parseInt(
  Deno.env.get("OSM_MIN_INTERVAL_MS") ?? "1100",
  10,
);

let lastOsmRequestAt = 0;

type NormalizedResult = {
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

  let payload: {
    query?: string;
    q?: string;
    limit?: number;
    country?: string;
    language?: string;
  } = {};

  try {
    payload = await req.json();
  } catch {
    return json({ ok: false, message: "Invalid JSON" }, 400, corsHeaders);
  }

  const rawQuery = String(payload.query ?? payload.q ?? "").trim();
  if (!rawQuery) {
    return json({ ok: false, message: "Missing query" }, 400, corsHeaders);
  }

  const limit = clampNumber(payload.limit ?? 6, 1, MAX_LIMIT);
  const country = String(payload.country ?? "ec").trim().toLowerCase();
  const language = String(payload.language ?? "es").trim().toLowerCase();

  const queryKey = buildQueryKey(rawQuery, { limit, country, language });
  const cached = await getCachedResult(queryKey, false);
  if (cached) {
    return json(
      {
        ok: true,
        source: "cache",
        cached: true,
        provider: cached.provider,
        results: cached.results,
      },
      200,
      corsHeaders,
    );
  }

  if (MAPTILER_KEY) {
    const maptiler = await searchMapTiler({
      query: rawQuery,
      limit,
      country,
      language,
    });

    if (maptiler.ok) {
      await storeCache({
        query: rawQuery,
        queryKey,
        provider: "maptiler",
        results: maptiler.results,
      });

      if (maptiler.results.length > 0) {
        return json(
          {
            ok: true,
            source: "maptiler",
            cached: false,
            provider: "maptiler",
            results: maptiler.results,
          },
          200,
          corsHeaders,
        );
      }
    }
  }

  const osm = await searchNominatim({ query: rawQuery, limit, country, language });
  if (osm.ok) {
    await storeCache({
      query: rawQuery,
      queryKey,
      provider: "nominatim",
      results: osm.results,
    });
    return json(
      {
        ok: true,
        source: "nominatim",
        cached: false,
        provider: "nominatim",
        results: osm.results,
      },
      200,
      corsHeaders,
    );
  }

  const stale = await getCachedResult(queryKey, true);
  if (stale) {
    return json(
      {
        ok: true,
        source: "cache-stale",
        cached: true,
        provider: stale.provider,
        results: stale.results,
      },
      200,
      corsHeaders,
    );
  }

  return json(
    { ok: false, message: "No results" },
    200,
    corsHeaders,
  );
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

function normalizeQuery(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function buildQueryKey(
  query: string,
  options: { limit: number; country: string; language: string },
) {
  const normalized = normalizeQuery(query);
  return `${normalized}|${options.limit}|${options.country}|${options.language}`;
}

function clampNumber(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Number(value) || min));
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

async function searchMapTiler({
  query,
  limit,
  country,
  language,
}: {
  query: string;
  limit: number;
  country: string;
  language: string;
}) {
  if (!MAPTILER_KEY) return { ok: false, results: [] as NormalizedResult[] };

  const url = new URL(`${MAPTILER_BASE}/${encodeURIComponent(query)}.json`);
  url.searchParams.set("key", MAPTILER_KEY);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("autocomplete", "true");
  if (country) url.searchParams.set("country", country);
  if (language) url.searchParams.set("language", language);

  const res = await fetch(url.toString());
  if (!res.ok) return { ok: false, results: [] as NormalizedResult[] };

  const data = await res.json();
  const features = Array.isArray(data?.features) ? data.features : [];

  const results = features.map((feature: any) => {
    const center = Array.isArray(feature?.center) ? feature.center : [];
    const [lng, lat] = center;
    const context = Array.isArray(feature?.context) ? feature.context : [];
    const pickContext = (prefixes: string[]) =>
      context.find((item: any) =>
        prefixes.some((prefix) => String(item?.id || "").startsWith(prefix)),
      )?.text ?? null;

    return {
      id: String(feature?.id ?? feature?.place_name ?? feature?.text ?? ""),
      label: String(feature?.place_name ?? feature?.text ?? query),
      lat: Number(lat ?? 0),
      lng: Number(lng ?? 0),
      street: feature?.text ?? null,
      house_number: feature?.address ?? null,
      city: pickContext(["place", "locality", "neighborhood", "district"]),
      region: pickContext(["region"]),
      country: pickContext(["country"]),
      postcode: pickContext(["postcode"]),
    };
  }).filter((result: NormalizedResult) => Boolean(result.label));

  return { ok: true, results };
}

async function searchNominatim({
  query,
  limit,
  country,
  language,
}: {
  query: string;
  limit: number;
  country: string;
  language: string;
}) {
  const now = Date.now();
  const waitMs = Math.max(0, OSM_MIN_INTERVAL_MS - (now - lastOsmRequestAt));
  if (waitMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }
  lastOsmRequestAt = Date.now();

  const url = new URL(`${OSM_BASE}/search`);
  url.searchParams.set("q", query);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("limit", String(limit));
  if (country) url.searchParams.set("countrycodes", country);
  if (language) url.searchParams.set("accept-language", language);
  if (OSM_EMAIL) url.searchParams.set("email", OSM_EMAIL);

  const res = await fetch(url.toString(), {
    headers: {
      "User-Agent": OSM_USER_AGENT,
    },
  });

  if (!res.ok) return { ok: false, results: [] as NormalizedResult[] };

  const data = await res.json();
  const results = Array.isArray(data)
    ? data.map((row: any) => ({
      id: String(row?.place_id ?? row?.osm_id ?? ""),
      label: String(row?.display_name ?? query),
      lat: Number(row?.lat ?? 0),
      lng: Number(row?.lon ?? 0),
      street: row?.address?.road ?? null,
      house_number: row?.address?.house_number ?? null,
      city: row?.address?.city ?? row?.address?.town ?? row?.address?.village ??
        null,
      region: row?.address?.state ?? null,
      country: row?.address?.country ?? null,
      postcode: row?.address?.postcode ?? null,
    }))
    : [];

  return { ok: true, results };
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
