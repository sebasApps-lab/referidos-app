// src/services/addressSearchClient.js
import { supabase } from "../lib/supabaseClient";

const CACHE_TTL_MS = 5 * 60 * 1000;
const MIN_INTERVAL_MS = 500;
const MIN_QUERY_LENGTH = 3;

const memoryCache = new Map();
const inFlight = new Map();
let lastRequestAt = 0;

function normalizeQuery(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
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

    const results = Array.isArray(data?.results) ? data.results : [];
    memoryCache.set(key, { ts: Date.now(), results });
    return { ok: true, results, source: data?.source || "edge" };
  })();

  inFlight.set(key, requestPromise);
  const response = await requestPromise;
  inFlight.delete(key);
  return response;
}
