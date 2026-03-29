import { supabase } from "../../../lib/supabaseClient";

function toUniqueLowerArray(values = []) {
  if (!Array.isArray(values)) return [];
  return Array.from(
    new Set(
      values
        .map((value) => String(value || "").trim().toLowerCase())
        .filter(Boolean)
    )
  );
}

export function parseAliasesInput(value) {
  return toUniqueLowerArray(
    String(value || "")
      .split(",")
      .map((item) => item.trim())
  );
}

export function formatAliasesInput(values) {
  return toUniqueLowerArray(values).join(", ");
}

async function invokeSupportOps(action, payload = {}) {
  const { data, error } = await supabase.functions.invoke("support-ops-proxy", {
    body: {
      action,
      payload,
    },
  });

  if (error) {
    throw new Error(error.message || "No se pudo contactar support-ops-proxy.");
  }
  if (!data?.ok) {
    const proxyError = new Error(data?.detail || data?.error || "support-ops-proxy failed");
    proxyError.code = data?.error || "support_ops_proxy_failed";
    proxyError.payload = data?.payload || null;
    throw proxyError;
  }

  return data.data;
}

export async function dispatchSupportAppsSync({
  mode = "hot",
  forceFull = true,
  trigger = "admin_support_apps",
} = {}) {
  const { data, error } = await supabase.functions.invoke("ops-support-apps-sync-dispatch", {
    body: {
      mode,
      force_full: Boolean(forceFull),
      trigger,
    },
  });

  if (error) {
    throw new Error(error.message || "No se pudo ejecutar ops-support-apps-sync-dispatch.");
  }
  if (!data?.ok) {
    const syncError = new Error(data?.detail || data?.error || "ops-support-apps-sync-dispatch failed");
    syncError.code = data?.error || "ops_support_apps_sync_failed";
    syncError.payload = data || null;
    throw syncError;
  }
  return data;
}

export async function fetchSupportApps() {
  const result = await invokeSupportOps("list_support_apps", {
    include_inactive: true,
    include_expired_inactive: false,
  });

  try {
    await dispatchSupportAppsSync({
      mode: "hot",
      forceFull: true,
      trigger: "admin_support_apps_list",
    });
  } catch {
    // Non-blocking for catalog listing.
  }

  const rows = Array.isArray(result?.apps) ? result.apps : [];
  return rows;
}

export async function createSupportApp(payload) {
  const appKey = String(payload?.appKey || "")
    .trim()
    .toLowerCase();
  const appCode = String(payload?.appCode || "")
    .trim()
    .toLowerCase();
  const displayName = String(payload?.displayName || "").trim();
  const originSourceDefault = String(payload?.originSourceDefault || "user")
    .trim()
    .toLowerCase();
  const aliases = toUniqueLowerArray(payload?.aliases);

  const created = await invokeSupportOps("create_support_app", {
    app_key: appKey,
    app_code: appCode,
    display_name: displayName,
    origin_source_default: originSourceDefault,
    aliases,
    is_active: true,
  });

  await dispatchSupportAppsSync({
    mode: "hot",
    forceFull: true,
    trigger: "admin_support_apps_create",
  });
  return created;
}

export async function updateSupportApp(appId, payload) {
  const appCode = String(payload?.appCode || "")
    .trim()
    .toLowerCase();
  const displayName = String(payload?.displayName || "").trim();
  const originSourceDefault = String(payload?.originSourceDefault || "user")
    .trim()
    .toLowerCase();
  const aliases = toUniqueLowerArray(payload?.aliases);

  const updated = await invokeSupportOps("update_support_app", {
    app_id: appId,
    app_code: appCode,
    display_name: displayName,
    origin_source_default: originSourceDefault,
    aliases,
  });

  await dispatchSupportAppsSync({
    mode: "hot",
    forceFull: true,
    trigger: "admin_support_apps_update",
  });
  return updated;
}

export async function setSupportAppActive(appId, active) {
  const updated = await invokeSupportOps("set_support_app_active", {
    app_id: appId,
    is_active: Boolean(active),
  });

  await dispatchSupportAppsSync({
    mode: "hot",
    forceFull: true,
    trigger: active ? "admin_support_apps_restore" : "admin_support_apps_deactivate",
  });
  return updated;
}
