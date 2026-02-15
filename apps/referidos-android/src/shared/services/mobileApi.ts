import { createApiClient, createSupabaseClient } from "@referidos/api-client";
import { createObservabilityClient } from "@referidos/observability-sdk";
import { MOBILE_ENV, assertMobileEnv } from "@shared/constants/env";

assertMobileEnv();

export const supabase = createSupabaseClient({
  url: MOBILE_ENV.SUPABASE_URL,
  anonKey: MOBILE_ENV.SUPABASE_ANON_KEY,
} as any);

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
