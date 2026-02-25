import { CATEGORY_LABELS, supabaseAdmin } from "./support.ts";

type CacheCategoryRow = {
  id: string;
  code: string | null;
  label: string | null;
  description: string | null;
  app_targets: string[] | null;
  sort_order: number | null;
  status: string | null;
};

type CacheMacroRow = {
  id: string;
  category_id: string | null;
  category_code: string | null;
  audience_roles: string[] | null;
  app_targets: string[] | null;
  status: string | null;
};

export type AnonymousSupportCategory = {
  id: string;
  code: string;
  label: string;
  description: string | null;
  app_targets: string[];
  sort_order: number;
  macro_count: number;
};

const APP_CHANNEL_ALIASES = new Map<string, string>([
  ["all", "all"],
  ["undetermined", "undetermined"],
  ["unknown", "undetermined"],
  ["app", "referidos_app"],
  ["pwa", "referidos_app"],
  ["referidos_app", "referidos_app"],
  ["referidos-app", "referidos_app"],
  ["referidos-pwa", "referidos_app"],
  ["prelaunch", "prelaunch_web"],
  ["prelaunch_web", "prelaunch_web"],
  ["prelaunch-web", "prelaunch_web"],
  ["landing", "prelaunch_web"],
  ["android", "android_app"],
  ["android_app", "android_app"],
  ["android-app", "android_app"],
  ["referidos-android", "android_app"],
]);

function asString(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed || fallback;
}

function normalizeArray(values: unknown, fallback: string[] = []) {
  if (!Array.isArray(values)) {
    const raw = asString(values);
    if (raw) {
      const normalizedRaw = raw.startsWith("{") && raw.endsWith("}")
        ? raw.slice(1, -1)
        : raw;
      const parsed = Array.from(
        new Set(
          normalizedRaw
            .split(",")
            .map((item) => asString(item).replace(/^"+|"+$/g, "").toLowerCase())
            .filter(Boolean),
        ),
      );
      if (parsed.length > 0) return parsed;
    }
    return [...fallback];
  }
  const normalized = Array.from(
    new Set(
      values
        .map((item) => asString(item).toLowerCase())
        .filter(Boolean),
    ),
  );
  return normalized.length > 0 ? normalized : [...fallback];
}

export function normalizeSupportAppChannel(value: unknown, fallback = "undetermined") {
  const normalized = asString(value).toLowerCase();
  if (!normalized) return fallback;
  return APP_CHANNEL_ALIASES.get(normalized) || fallback;
}

export function normalizeSupportCategoryCode(value: unknown, fallback = "") {
  const normalized = asString(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return normalized || fallback;
}

function supportsAppTarget(targets: unknown, appChannel: string) {
  const normalizedTargets = normalizeArray(targets, ["all"]);
  return normalizedTargets.includes("all") || normalizedTargets.includes(appChannel);
}

function normalizeRoleToken(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_]+/g, "")
    .toLowerCase();
}

function hasAnonymousAudience(audienceRoles: unknown) {
  const roles = normalizeArray(audienceRoles, []).map(normalizeRoleToken);
  if (roles.length === 0) return false;
  return roles.includes("anonimo") || roles.includes("anonymous") || roles.includes("anon");
}

function humanizeCategoryCode(code: string) {
  return code
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function categoryLabelForCode(code: string) {
  if (!code) return "Soporte";
  return CATEGORY_LABELS[code] || humanizeCategoryCode(code);
}

function buildAnonymousCategoryList({
  macros,
  categories,
  appChannel,
}: {
  macros: CacheMacroRow[];
  categories: CacheCategoryRow[];
  appChannel?: string;
}) {
  const normalizedAppChannel = appChannel
    ? normalizeSupportAppChannel(appChannel, "prelaunch_web")
    : "";

  const categoriesById = new Map<string, CacheCategoryRow>();
  const categoriesByCode = new Map<string, CacheCategoryRow>();
  for (const category of categories) {
    const categoryId = asString(category.id);
    const categoryCode = normalizeSupportCategoryCode(category.code);
    if (categoryId) categoriesById.set(categoryId, category);
    if (categoryCode) categoriesByCode.set(categoryCode, category);
  }

  const categoryMap = new Map<string, AnonymousSupportCategory>();

  for (const macro of macros) {
    if (!hasAnonymousAudience(macro.audience_roles)) continue;
    if (normalizedAppChannel && !supportsAppTarget(macro.app_targets, normalizedAppChannel)) continue;

    const macroCategoryId = asString(macro.category_id);
    const macroCategoryCode = normalizeSupportCategoryCode(macro.category_code);

    let category = macroCategoryId ? categoriesById.get(macroCategoryId) : null;
    if (!category && macroCategoryCode) {
      category = categoriesByCode.get(macroCategoryCode) || null;
    }

    const code = normalizeSupportCategoryCode(category?.code || macroCategoryCode);
    if (!code) continue;

    const key = category?.id || code;
    const existing = categoryMap.get(key);
    if (existing) {
      existing.macro_count += 1;
      continue;
    }

    const appTargets = normalizeArray(category?.app_targets, ["all"]);

    categoryMap.set(key, {
      id: asString(category?.id, code),
      code,
      label: asString(category?.label, categoryLabelForCode(code)),
      description: asString(category?.description) || null,
      app_targets: appTargets,
      sort_order: Number(category?.sort_order || 100),
      macro_count: 1,
    });
  }

  const categoryList = Array.from(categoryMap.values()).sort((a, b) => {
    if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order;
    return a.label.localeCompare(b.label, "es", { sensitivity: "base" });
  });

  return categoryList;
}

export async function listAnonymousMacroCategoriesFromCache({
  appChannel = "prelaunch_web",
}: {
  appChannel?: string;
} = {}): Promise<{
  categories: AnonymousSupportCategory[];
  error: string | null;
}> {
  const [{ data: macrosData, error: macrosError }, { data: categoriesData, error: categoriesError }] =
    await Promise.all([
      supabaseAdmin
        .from("support_macros_cache")
        .select("id, category_id, category_code, audience_roles, app_targets, status")
        .in("status", ["published", "active"]),
      supabaseAdmin
        .from("support_macro_categories_cache")
        .select("id, code, label, description, app_targets, sort_order, status")
        .in("status", ["published", "active"]),
    ]);

  if (macrosError || categoriesError) {
    return {
      categories: [],
      error: macrosError?.message || categoriesError?.message || "catalog_query_failed",
    };
  }

  const macros = (macrosData || []) as CacheMacroRow[];
  const categories = (categoriesData || []) as CacheCategoryRow[];

  const strictList = buildAnonymousCategoryList({
    macros,
    categories,
    appChannel,
  });
  if (strictList.length > 0) {
    return {
      categories: strictList,
      error: null,
    };
  }

  // Fallback robusto: si no hay match por app, devolver catalogo anonimo global.
  const crossAppList = buildAnonymousCategoryList({
    macros,
    categories,
  });

  return {
    categories: crossAppList,
    error: null,
  };
}
