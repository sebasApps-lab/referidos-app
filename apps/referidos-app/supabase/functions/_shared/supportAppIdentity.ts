import { safeTrim, supabaseAdmin } from "./support.ts";

const FALLBACK_KEY = "referidos_app";

function normalizeLegacyKey(value: unknown, fallback = FALLBACK_KEY) {
  const normalized = safeTrim(typeof value === "string" ? value : "", 80).toLowerCase();
  if (!normalized) return fallback;
  if (["app", "pwa", "referidos-pwa", "referidos-app", "referidos_app"].includes(normalized)) {
    return "referidos_app";
  }
  if (["prelaunch", "prelaunch-web", "prelaunch_web", "landing"].includes(normalized)) {
    return "prelaunch_web";
  }
  if (["android", "android-app", "android_app", "referidos-android"].includes(normalized)) {
    return "android_app";
  }
  if (["support", "soporte", "admin_support", "support_admin"].includes(normalized)) {
    return "referidos_app";
  }
  return normalized;
}

export type SupportResolvedAppIdentity = {
  appKey: string;
  appCode: string;
  displayName: string;
  originSourceDefault: string;
  isActive: boolean;
  purgeAfter: string | null;
};

export async function resolveSupportAppIdentity(
  rawValue: unknown,
  fallback = FALLBACK_KEY,
): Promise<SupportResolvedAppIdentity> {
  const normalizedFallback = normalizeLegacyKey(fallback, FALLBACK_KEY);
  const normalizedValue = normalizeLegacyKey(rawValue, normalizedFallback);

  const runLookup = async () => {
    const { data, error } = await supabaseAdmin.rpc("support_resolve_app_identity", {
      p_value: normalizedValue,
      p_fallback: normalizedFallback,
    });
    if (error || !Array.isArray(data) || data.length === 0) return null;
    const row = data[0] || {};
    const appKey = normalizeLegacyKey(row.app_key, normalizedFallback);
    const appCode = safeTrim(typeof row.app_code === "string" ? row.app_code : "", 120) || appKey;
    const displayName = safeTrim(typeof row.display_name === "string" ? row.display_name : "", 120) ||
      appCode;
    const originSourceDefault = safeTrim(
      typeof row.origin_source_default === "string" ? row.origin_source_default : "",
      80,
    ) || "app";
    const purgeAfter = safeTrim(typeof row.purge_after === "string" ? row.purge_after : "", 80) || null;
    return {
      appKey,
      appCode,
      displayName,
      originSourceDefault,
      isActive: row.is_active !== false,
      purgeAfter,
    };
  };

  try {
    const firstLookup = await runLookup();
    if (firstLookup) return firstLookup;

    const sharedToken = safeTrim(Deno.env.get("SUPPORT_OPS_SHARED_TOKEN"), 256);
    await supabaseAdmin.functions.invoke("ops-support-apps-sync-dispatch", {
      headers: sharedToken
        ? {
          "x-support-ops-token": sharedToken,
        }
        : undefined,
      body: {
        mode: "hot",
        force_full: true,
        trigger: "support_app_identity_empty_cache",
      },
    });

    const secondLookup = await runLookup();
    if (secondLookup) {
      return secondLookup;
    }
  } catch {
    // Fallback to static aliases when RPC is unavailable.
  }

  const fallbackKey = normalizeLegacyKey(normalizedValue, normalizedFallback);
  const fallbackCode = fallbackKey === "referidos_app"
    ? "referidos-pwa"
    : fallbackKey === "prelaunch_web"
    ? "prelaunch"
    : fallbackKey === "android_app"
    ? "android-app"
    : fallbackKey;
  const fallbackLabel = fallbackKey === "referidos_app"
    ? "PWA"
    : fallbackKey === "prelaunch_web"
    ? "waitlist"
    : fallbackKey === "android_app"
    ? "Android"
    : fallbackCode;
  const fallbackOrigin = fallbackKey === "prelaunch_web"
    ? "user"
    : "user";

  return {
    appKey: fallbackKey,
    appCode: fallbackCode,
    displayName: fallbackLabel,
    originSourceDefault: fallbackOrigin,
    isActive: true,
    purgeAfter: null,
  };
}

export async function resolveSupportAppChannel(rawValue: unknown, fallback = FALLBACK_KEY) {
  const identity = await resolveSupportAppIdentity(rawValue, fallback);
  return identity.appKey;
}
