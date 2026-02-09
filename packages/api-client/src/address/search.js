import { normalizeLooseSearch } from "@referidos/domain";
import { invokeWithSession } from "../clients/sessionHelpers.js";

const CACHE_TTL_MS = 10 * 60 * 1000;
const MIN_INTERVAL_MS = 700;
const MIN_QUERY_LENGTH = 4;

const memoryCache = new Map();
const inFlight = new Map();
let lastRequestAt = 0;

function buildKey(query, { limit, country, language }) {
  return `${normalizeLooseSearch(query)}|${limit}|${country}|${language}`;
}

async function waitMs(ms) {
  if (ms <= 0) return;
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function searchAddresses(
  supabase,
  query,
  {
    limit = 6,
    country = "ec",
    language = "es",
    skipCache = false,
  } = {},
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

  if (inFlight.has(key)) return inFlight.get(key);

  const requestPromise = (async () => {
    const wait = Math.max(0, MIN_INTERVAL_MS - (Date.now() - lastRequestAt));
    await waitMs(wait);
    lastRequestAt = Date.now();

    const response = await invokeWithSession(supabase, "address-search", {
      body: { query: trimmed, limit, country, language },
    });
    if (!response.ok) return response;

    const provider = response.data?.provider || response.data?.source || "edge";
    const results = Array.isArray(response.data?.results)
      ? response.data.results.map((item) => ({
          ...item,
          label: item?.raw_label || item?.label || "",
          raw_label: item?.raw_label || item?.label || "",
          display_label: item?.display_label || item?.label || "",
          provider: item?.provider || provider,
        }))
      : [];
    memoryCache.set(key, { ts: Date.now(), results });
    return { ok: true, results, source: response.data?.source || "edge" };
  })();

  inFlight.set(key, requestPromise);
  const response = await requestPromise;
  inFlight.delete(key);
  return response;
}
