import {
  createPrelaunchClient,
  extractUtmFromSearch,
} from "@referidos/api-client/prelaunch";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY;
const TENANT_HINT = import.meta.env.VITE_DEFAULT_TENANT_ID || "ReferidosAPP";
const APP_CHANNEL = import.meta.env.VITE_APP_CHANNEL || "prelaunch_web";

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

export async function ingestPrelaunchEvent(eventType, { path, props = {}, utm } = {}) {
  const client = getPrelaunchClient();
  if (!client) return { ok: false, error: "missing_env" };
  return client.analytics.ingest({
    event_type: eventType,
    path,
    props,
    utm: utm || getDefaultUtm(),
  });
}
