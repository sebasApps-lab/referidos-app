import { invokeWithSession } from "../clients/sessionHelpers.js";

const CACHE_TTL_MS = 10 * 60 * 1000;
const MIN_INTERVAL_MS = 700;

const memoryCache = new Map();
const inFlight = new Map();
let lastRequestAt = 0;

function buildKey(lat, lng, { language }) {
  return `${Number(lat).toFixed(6)}|${Number(lng).toFixed(6)}|${language}`;
}

async function waitMs(ms) {
  if (ms <= 0) return;
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function reverseGeocode(
  supabase,
  lat,
  lng,
  { language = "es", skipCache = false } = {},
) {
  const latNum = Number(lat);
  const lngNum = Number(lng);
  if (!Number.isFinite(latNum) || !Number.isFinite(lngNum)) {
    return { ok: false, error: "invalid_coords" };
  }

  const key = buildKey(latNum, lngNum, { language });
  const cached = memoryCache.get(key);
  if (!skipCache && cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return { ok: true, data: cached.data, cached: true };
  }

  if (inFlight.has(key)) return inFlight.get(key);

  const requestPromise = (async () => {
    const wait = Math.max(0, MIN_INTERVAL_MS - (Date.now() - lastRequestAt));
    await waitMs(wait);
    lastRequestAt = Date.now();

    const response = await invokeWithSession(supabase, "address-reverse", {
      body: { lat: latNum, lng: lngNum, language },
    });
    if (!response.ok) return response;

    const result = response.data?.result || response.data?.data || null;
    if (!result) return { ok: false, error: "no_result" };
    const payload = {
      ...result,
      label: result?.raw_label || result?.label || "",
      raw_label: result?.raw_label || result?.label || "",
      display_label: result?.display_label || result?.label || "",
      provider: result.provider || response.data?.provider,
    };
    memoryCache.set(key, { ts: Date.now(), data: payload });
    return { ok: true, data: payload, source: response.data?.source || "edge" };
  })();

  inFlight.set(key, requestPromise);
  const response = await requestPromise;
  inFlight.delete(key);
  return response;
}
