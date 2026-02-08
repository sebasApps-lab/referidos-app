// src/services/addressSearchClient.js
import { supabase } from "../lib/supabaseClient";

const CACHE_TTL_MS = 10 * 60 * 1000;
const MIN_INTERVAL_MS = 700;
const MIN_QUERY_LENGTH = 4;

const memoryCache = new Map();
const inFlight = new Map();
let lastRequestAt = 0;

function normalizeQuery(value) {
  let text = String(value || "").toLowerCase().trim();
  text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  text = text.replace(/c\//g, "calle ");
  text = text.replace(/[^a-z0-9\s]/g, " ");
  const tokens = text
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => {
      if (token === "av" || token === "ave" || token === "avda") {
        return "avenida";
      }
      if (token === "cl" || token === "cll") {
        return "calle";
      }
      return token;
    });
  return tokens.join(" ");
}

function buildKey(query, { limit, country, language }) {
  return `${normalizeQuery(query)}|${limit}|${country}|${language}`;
}

async function waitMs(ms) {
  if (ms <= 0) return;
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function searchAddresses(
  query,
  {
    limit = 6,
    country = "ec",
    language = "es",
    skipCache = false,
  } = {}
) {
  const trimmed = String(query || "").trim();
  if (trimmed.length < MIN_QUERY_LENGTH) {
    return { ok: true, results: [], skipped: true };
  }

  const key = buildKey(trimmed, { limit, country, language });
  const cached = memoryCache.get(key);
  if (!skipCache && cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return { ok: true, results: cached.results, cached: true };
  }

  if (inFlight.has(key)) {
    return inFlight.get(key);
  }

  const now = Date.now();
  const wait = Math.max(0, MIN_INTERVAL_MS - (now - lastRequestAt));

  const requestPromise = (async () => {
    await waitMs(wait);
    lastRequestAt = Date.now();

    const { data: { session } = {} } = await supabase.auth.getSession();
    if (!session?.access_token) {
      return { ok: false, error: "no_session" };
    }

    const { data, error } = await supabase.functions.invoke("address-search", {
      headers: { Authorization: `Bearer ${session.access_token}` },
      body: {
        query: trimmed,
        limit,
        country,
        language,
      },
    });

    if (error) {
      return { ok: false, error: error.message || String(error) };
    }

    const provider = data?.provider || data?.source || "edge";
    const results = Array.isArray(data?.results)
      ? data.results.map((item) => {
        const rawLabel = item?.raw_label || item?.label || "";
        const displayLabel = item?.display_label || item?.label || "";
        return {
          ...item,
          label: rawLabel || item?.label || "",
          raw_label: rawLabel,
          display_label: displayLabel,
          provider: item?.provider || provider,
        };
      })
      : [];
    memoryCache.set(key, { ts: Date.now(), results });
    return { ok: true, results, source: data?.source || "edge" };
  })();

  inFlight.set(key, requestPromise);
  const response = await requestPromise;
  inFlight.delete(key);
  return response;
}
