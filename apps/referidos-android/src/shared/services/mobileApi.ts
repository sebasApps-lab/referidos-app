import { createMobileApi, createSupabaseMobileClient } from "@referidos/mobile-api";
import { createMobileObservabilityClient } from "@referidos/mobile-observability";
import { MOBILE_ENV, assertMobileEnv } from "@shared/constants/env";

assertMobileEnv();

export const supabase = createSupabaseMobileClient({
  url: MOBILE_ENV.SUPABASE_URL,
  anonKey: MOBILE_ENV.SUPABASE_ANON_KEY,
});

export const mobileApi = createMobileApi(supabase);

export const observability = createMobileObservabilityClient({
  api: mobileApi,
  baseContext: {
    app_version: MOBILE_ENV.APP_VERSION,
    platform: "android",
    channel: "react-native",
  },
});
