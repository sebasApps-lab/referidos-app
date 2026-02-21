import { supabase } from "../../lib/supabaseClient";

const APP_ALIASES = new Map([
  ["all", "all"],
  ["undetermined", "undetermined"],
  ["unknown", "undetermined"],
  ["app", "referidos_app"],
  ["pwa", "referidos_app"],
  ["referidos-pwa", "referidos_app"],
  ["referidos_app", "referidos_app"],
  ["referidos-app", "referidos_app"],
  ["prelaunch", "prelaunch_web"],
  ["prelaunch_web", "prelaunch_web"],
  ["prelaunch-web", "prelaunch_web"],
  ["landing", "prelaunch_web"],
  ["android", "android_app"],
  ["android_app", "android_app"],
  ["android-app", "android_app"],
  ["referidos-android", "android_app"],
]);

const ENV_ALIASES = new Map([
  ["dev", "dev"],
  ["development", "dev"],
  ["staging", "staging"],
  ["stage", "staging"],
  ["prod", "prod"],
  ["production", "prod"],
]);

function asString(value, fallback = "") {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim();
  return normalized || fallback;
}

function normalizeArray(values, fallback = []) {
  if (!Array.isArray(values)) return fallback;
  const normalized = Array.from(
    new Set(values.map((value) => asString(value).toLowerCase()).filter(Boolean))
  );
  return normalized.length ? normalized : fallback;
}

export function normalizeSupportAppKey(value, fallback = "undetermined") {
  const normalized = asString(value).toLowerCase();
  if (!normalized) return fallback;
  return APP_ALIASES.get(normalized) || fallback;
}

export function normalizeSupportEnvKey(value, fallback = "dev") {
  const normalized = asString(value).toLowerCase();
  if (!normalized) return fallback;
  return ENV_ALIASES.get(normalized) || fallback;
}

export async function loadSupportCatalogFromCache({ publishedOnly = true } = {}) {
  let categoriesQuery = supabase
    .from("support_macro_categories_cache")
    .select("id, code, label, description, app_targets, sort_order, status, metadata")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  let macrosQuery = supabase
    .from("support_macros_cache")
    .select(
      "id, code, title, body, category_id, category_code, thread_status, audience_roles, app_targets, env_targets, sort_order, status, metadata"
    )
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (publishedOnly) {
    categoriesQuery = categoriesQuery.eq("status", "published");
    macrosQuery = macrosQuery.eq("status", "published");
  }

  const [{ data: categories, error: categoriesError }, { data: macros, error: macrosError }] =
    await Promise.all([categoriesQuery, macrosQuery]);

  if (categoriesError || macrosError) {
    return {
      source: "cache_error",
      categories: [],
      macros: [],
      error: categoriesError?.message || macrosError?.message || "cache_load_failed",
    };
  }

  const normalizedCategories = (categories || []).map((category) => ({
    ...category,
    app_targets: normalizeArray(category.app_targets, ["all"]),
  }));

  const normalizedMacros = (macros || []).map((macro) => ({
    ...macro,
    audience_roles: normalizeArray(macro.audience_roles, ["cliente", "negocio"]),
    app_targets: normalizeArray(macro.app_targets, ["all"]),
    env_targets: normalizeArray(macro.env_targets, ["all"]),
  }));

  return {
    source: "cache",
    categories: normalizedCategories,
    macros: normalizedMacros,
    error: null,
  };
}

export function filterSupportMacrosForThread({
  thread,
  macros,
  categories,
  runtimeEnvKey = "dev",
}) {
  if (!thread) return [];

  const appKey = normalizeSupportAppKey(
    thread.app_channel || thread.origin_source || "",
    "undetermined"
  );
  const normalizedEnv = normalizeSupportEnvKey(runtimeEnvKey, "dev");
  const publishedCategoryCodes = new Set(
    (categories || [])
      .filter((category) => asString(category.status, "published") === "published")
      .map((category) => asString(category.code || category.id))
      .filter(Boolean)
  );

  return (macros || [])
    .filter((macro) => {
      const macroStatus = asString(macro.status, "published");
      if (macroStatus !== "published") return false;

      const threadStatus = asString(macro.thread_status || macro.status_thread || macro.status);
      if (threadStatus && threadStatus !== asString(thread.status)) return false;

      const categoryCode = asString(macro.category_code || macro.category);
      if (categoryCode) {
        if (categoryCode !== asString(thread.category)) return false;
        if (publishedCategoryCodes.size > 0 && !publishedCategoryCodes.has(categoryCode)) {
          return false;
        }
      }

      const appTargets = normalizeArray(macro.app_targets, ["all"]);
      const envTargets = normalizeArray(macro.env_targets, ["all"]);
      const appAllowed = appTargets.includes("all") || appTargets.includes(appKey);
      const envAllowed = envTargets.includes("all") || envTargets.includes(normalizedEnv);

      return appAllowed && envAllowed;
    })
    .sort((a, b) => {
      const aSort = Number(a.sort_order || 100);
      const bSort = Number(b.sort_order || 100);
      if (aSort !== bSort) return aSort - bSort;
      return asString(a.title).localeCompare(asString(b.title), "es", { sensitivity: "base" });
    });
}
