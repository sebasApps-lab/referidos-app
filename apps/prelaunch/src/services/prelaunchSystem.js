import {
  createPrelaunchClient,
  extractUtmFromSearch,
} from "@referidos/api-client/prelaunch";
import { runtimeConfig } from "../config/runtimeConfig";

const SUPABASE_URL = runtimeConfig.supabaseUrl;
const SUPABASE_PUBLISHABLE_KEY = runtimeConfig.supabasePublishableKey;
const TENANT_HINT = runtimeConfig.defaultTenantId || "ReferidosAPP";
const APP_CHANNEL = runtimeConfig.appChannel || "prelaunch_web";

let prelaunchClient = null;

if (SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY) {
  prelaunchClient = createPrelaunchClient({
    supabaseUrl: SUPABASE_URL,
    publishableKey: SUPABASE_PUBLISHABLE_KEY,
    tenantHint: TENANT_HINT,
    appChannel: APP_CHANNEL,
    identityKeyPrefix: "referidos:prelaunch",
  });
}

export function getPrelaunchClient() {
  return prelaunchClient;
}

export function getDefaultUtm() {
  if (typeof window === "undefined") {
    return {
      source: null,
      medium: null,
      campaign: null,
      term: null,
      content: null,
    };
  }
  return extractUtmFromSearch(window.location.search);
}

function buildEventPayload(eventType, { path, props = {}, utm } = {}) {
  const client = getPrelaunchClient();
  if (!client) return null;

  return {
    ...client.identity.get(),
    tenant_hint: TENANT_HINT,
    app_channel: APP_CHANNEL,
    event_type: eventType,
    path: path || (typeof window !== "undefined" ? window.location.pathname || "/" : "/"),
    props,
    utm: utm || getDefaultUtm(),
  };
}

export async function ingestPrelaunchEvent(eventType, { path, props = {}, utm } = {}) {
  const payload = buildEventPayload(eventType, { path, props, utm });
  if (!payload) return { ok: false, error: "missing_env" };

  const client = getPrelaunchClient();
  return client.analytics.ingest(payload);
}

export async function ingestPrelaunchEventKeepalive(
  eventType,
  { path, props = {}, utm } = {},
) {
  const payload = buildEventPayload(eventType, { path, props, utm });
  if (!payload || !SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    return { ok: false, error: "missing_env" };
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/prelaunch-ingest`, {
      method: "POST",
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      return {
        ok: false,
        error: data?.message || data?.error || "request_failed",
      };
    }

    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "request_failed",
    };
  }
}
