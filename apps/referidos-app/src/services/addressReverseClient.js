// src/services/addressReverseClient.js
import { supabase } from "../lib/supabaseClient";

const CACHE_TTL_MS = 10 * 60 * 1000;
const MIN_INTERVAL_MS = 700;

const memoryCache = new Map();
const inFlight = new Map();
let lastRequestAt = 0;

function buildKey(lat, lng, { language }) {
  const latKey = Number(lat).toFixed(6);
  const lngKey = Number(lng).toFixed(6);
  return `${latKey}|${lngKey}|${language}`;
}

async function waitMs(ms) {
  if (ms <= 0) return;
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function reverseGeocode(
  lat,
  lng,
  { language = "es", skipCache = false } = {}
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

    const { data, error } = await supabase.functions.invoke("address-reverse", {
      headers: { Authorization: `Bearer ${session.access_token}` },
      body: {
        lat: latNum,
        lng: lngNum,
        language,
      },
    });

    if (error) {
      return { ok: false, error: error.message || String(error) };
    }

    const result = data?.result || data?.data || null;
    if (!result) {
      return { ok: false, error: "no_result" };
    }
    const rawLabel = result?.raw_label || result?.label || "";
    const displayLabel = result?.display_label || result?.label || "";
    const payload = {
      ...result,
      label: rawLabel || result?.label || "",
      raw_label: rawLabel,
      display_label: displayLabel,
      provider: result.provider || data?.provider,
    };
    memoryCache.set(key, { ts: Date.now(), data: payload });
    return { ok: true, data: payload, source: data?.source || "edge" };
  })();

  inFlight.set(key, requestPromise);
  const response = await requestPromise;
  inFlight.delete(key);
  return response;
}
