import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApiClient, createSupabaseClient } from "@referidos/api-client";
import { createObservabilityClient } from "@referidos/observability-sdk";
import { MOBILE_ENV, assertMobileEnv } from "@shared/constants/env";

assertMobileEnv();

const AUTH_REQUEST_TIMEOUT_MS = 20_000;
const authEndpoint = MOBILE_ENV.SUPABASE_URL.replace(/\/+$/, "") + "/auth/v1/";

const fetchWithAuthTimeout: typeof fetch = async (input, options) => {
  const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  if (!url.startsWith(authEndpoint) || options?.signal) {
    return fetch(input, options);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), AUTH_REQUEST_TIMEOUT_MS);
  try {
    return await fetch(input, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
};

export const supabase = createSupabaseClient({
  url: MOBILE_ENV.SUPABASE_URL,
  anonKey: MOBILE_ENV.SUPABASE_ANON_KEY,
  options: {
    auth: { storage: AsyncStorage },
    global: { fetch: fetchWithAuthTimeout },
  },
});

export const mobileApi = createApiClient(supabase);

export const observability = createObservabilityClient({
  api: mobileApi,
  baseContext: {
    app_id: "referidos-android",
    app_version: MOBILE_ENV.APP_VERSION,
    build_id: MOBILE_ENV.APP_VERSION,
    env: __DEV__ ? "development" : "production",
    platform: "android",
    channel: "react-native",
  },
});
