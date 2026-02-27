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

const THREAD_STATUS_ALIASES = new Map([
  ["new", "new"],
  ["nuevo", "new"],
  ["assigned", "assigned"],
  ["asignado", "assigned"],
  ["in_progress", "in_progress"],
  ["in-progress", "in_progress"],
  ["in progress", "in_progress"],
  ["inprogress", "in_progress"],
  ["resolviendo", "in_progress"],
  ["waiting_user", "waiting_user"],
  ["waiting-user", "waiting_user"],
  ["waiting user", "waiting_user"],
  ["esperando_usuario", "waiting_user"],
  ["esperando usuario", "waiting_user"],
  ["queued", "queued"],
  ["en_cola", "queued"],
  ["en cola", "queued"],
  ["closed", "closed"],
  ["cerrado", "closed"],
  ["cancelled", "cancelled"],
  ["cancelado", "cancelled"],
]);

const CATEGORY_WILDCARD_CODES = new Set([
  "general",
  "all",
  "sin_categoria",
  "sin-categoria",
  "uncategorized",
  "none",
]);

const CATEGORY_ALIASES = new Map([
  ["general", "general"],
  ["sin_categoria", "general"],
  ["acceso", "acceso"],
  ["acceso_cuenta", "acceso"],
  ["verificacion", "verificacion"],
  ["verificacion_identidad", "verificacion"],
  ["qr", "qr"],
  ["promos", "promos"],
  ["promocion", "promos"],
  ["promociones", "promos"],
  ["negocios_sucursales", "negocios_sucursales"],
  ["negocios_y_sucursales", "negocios_sucursales"],
  ["pagos_plan", "pagos_plan"],
  ["pagos_y_plan", "pagos_plan"],
  ["reporte_abuso", "reporte_abuso"],
  ["bug_performance", "bug_performance"],
  ["bug_rendimiento", "bug_performance"],
  ["sugerencia", "sugerencia"],
  ["tier_beneficios", "tier_beneficios"],
]);

const AUDIENCE_ROLE_ALIASES = new Map([
  ["cliente", "cliente"],
  ["negocio", "negocio"],
  ["anonimo", "anonimo"],
  ["anonymous", "anonimo"],
  ["soporte", "soporte"],
  ["support", "soporte"],
  ["admin", "admin"],
]);

const ALLOWED_AUDIENCE_ROLES = new Set([
  "cliente",
  "negocio",
  "anonimo",
  "soporte",
  "admin",
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

function normalizeAudienceRoles(values, fallback = ["cliente", "negocio"]) {
  const normalized = Array.from(
    new Set(
      normalizeArray(values, fallback)
        .map((value) => AUDIENCE_ROLE_ALIASES.get(value) || value)
        .filter((value) => ALLOWED_AUDIENCE_ROLES.has(value))
    )
  );
  return normalized.length ? normalized : fallback;
}

function normalizeThreadStatus(value) {
  const normalized = asString(value).toLowerCase().replace(/[\s-]+/g, "_");
  return THREAD_STATUS_ALIASES.get(normalized) || normalized;
}

function normalizeCategoryCode(value) {
  const normalized = asString(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  if (!normalized) return "";
  return CATEGORY_ALIASES.get(normalized) || normalized;
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
    categoriesQuery = categoriesQuery.in("status", ["published", "active"]);
    macrosQuery = macrosQuery.in("status", ["published", "active"]);
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
    audience_roles: normalizeAudienceRoles(macro.audience_roles, ["cliente", "negocio"]),
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

  const resolveThreadAudienceRole = () => {
    const requestOrigin = asString(thread.request_origin).toLowerCase();
    if (requestOrigin === "anonymous") return "anonimo";

    const explicitCandidates = [
      thread.audience_role,
      thread.role_intent,
      thread.user_role,
      thread.role,
    ];
    for (const candidate of explicitCandidates) {
      const normalized = AUDIENCE_ROLE_ALIASES.get(asString(candidate).toLowerCase()) || "";
      if (normalized === "cliente" || normalized === "negocio") return normalized;
    }

    const userPublicId = asString(thread.user_public_id).toUpperCase();
    if (userPublicId.startsWith("NEG-")) return "negocio";
    if (userPublicId.startsWith("USR-")) return "cliente";
    return "";
  };

  const appKey = normalizeSupportAppKey(
    thread.app_channel || thread.origin_source || "",
    "undetermined"
  );
  const normalizedEnv = normalizeSupportEnvKey(runtimeEnvKey, "dev");
  const threadAudienceRole = resolveThreadAudienceRole();
  const publishedCategoryCodes = new Set(
    (categories || [])
      .filter((category) => {
        const status = asString(category.status, "published").toLowerCase();
        return status === "published" || status === "active";
      })
      .map((category) => normalizeCategoryCode(category.code || category.id))
      .filter(Boolean)
  );

  const currentThreadStatus = normalizeThreadStatus(thread.status);
  const threadCategoryCode = normalizeCategoryCode(thread.category);
  const categoryCodeById = new Map(
    (categories || [])
      .map((category) => [asString(category.id), normalizeCategoryCode(category.code || category.id)])
      .filter(([id, code]) => id && code)
  );

  const sortMacros = (list) =>
    list.sort((a, b) => {
      const aSort = Number(a.sort_order || 100);
      const bSort = Number(b.sort_order || 100);
      if (aSort !== bSort) return aSort - bSort;
      return asString(a.title).localeCompare(asString(b.title), "es", { sensitivity: "base" });
    });

  const baseFiltered = (macros || []).filter((macro) => {
    const macroStatus = asString(macro.status, "published").toLowerCase();
    if (macroStatus !== "published" && macroStatus !== "active") return false;

    const metadataThreadStatus = normalizeThreadStatus(
      (macro.metadata && typeof macro.metadata === "object"
        ? asString(macro.metadata.thread_status)
        : "") || ""
    );
    const threadStatus = normalizeThreadStatus(
      macro.thread_status || macro.status_thread || metadataThreadStatus || ""
    );
    if (threadStatus && threadStatus !== currentThreadStatus) return false;

    const categoryCode = normalizeCategoryCode(
      macro.category_code ||
        macro.category ||
        categoryCodeById.get(asString(macro.category_id)) ||
        ""
    );
    if (categoryCode) {
      const isWildcardCategory = CATEGORY_WILDCARD_CODES.has(categoryCode);
      if (!isWildcardCategory && categoryCode !== threadCategoryCode) return false;
      if (
        !isWildcardCategory &&
        publishedCategoryCodes.size > 0 &&
        !publishedCategoryCodes.has(categoryCode)
      ) {
        return false;
      }
    }

    return true;
  });

  const strict = baseFiltered.filter((macro) => {
    const appTargets = normalizeArray(macro.app_targets, ["all"]);
    const envTargets = normalizeArray(macro.env_targets, ["all"]);
    const appAllowed = appTargets.includes("all") || appTargets.includes(appKey);
    const envAllowed = envTargets.includes("all") || envTargets.includes(normalizedEnv);
    return appAllowed && envAllowed;
  });

  const strictByRole = strict.filter((macro) => {
    if (!threadAudienceRole) return true;
    const roles = normalizeAudienceRoles(macro.audience_roles, ["cliente", "negocio"]);
    return roles.includes(threadAudienceRole);
  });
  if (strictByRole.length > 0) return sortMacros(strictByRole);
  if (strict.length > 0) return sortMacros(strict);

  const relaxEnv = baseFiltered.filter((macro) => {
    const appTargets = normalizeArray(macro.app_targets, ["all"]);
    return appTargets.includes("all") || appTargets.includes(appKey);
  });

  const relaxEnvByRole = relaxEnv.filter((macro) => {
    if (!threadAudienceRole) return true;
    const roles = normalizeAudienceRoles(macro.audience_roles, ["cliente", "negocio"]);
    return roles.includes(threadAudienceRole);
  });
  if (relaxEnvByRole.length > 0) return sortMacros(relaxEnvByRole);
  if (relaxEnv.length > 0) return sortMacros(relaxEnv);

  const baseByRole = baseFiltered.filter((macro) => {
    if (!threadAudienceRole) return true;
    const roles = normalizeAudienceRoles(macro.audience_roles, ["cliente", "negocio"]);
    return roles.includes(threadAudienceRole);
  });
  if (baseByRole.length > 0) return sortMacros(baseByRole);

  return sortMacros(baseFiltered);
}
