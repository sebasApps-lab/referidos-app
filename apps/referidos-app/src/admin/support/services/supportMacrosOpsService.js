import { supabase } from "../../../lib/supabaseClient";

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

export async function listSupportMacroCatalog({
  includeArchived = true,
  includeDraft = true,
} = {}) {
  return invokeSupportOps("list_catalog", {
    include_archived: includeArchived,
    include_draft: includeDraft,
  });
}

export async function createSupportMacroCategory(payload) {
  return invokeSupportOps("create_category", payload);
}

export async function updateSupportMacroCategory(payload) {
  return invokeSupportOps("update_category", payload);
}

export async function setSupportMacroCategoryStatus({ categoryId, status }) {
  return invokeSupportOps("set_category_status", {
    category_id: categoryId,
    status,
  });
}

export async function deleteSupportMacroCategory({ categoryId }) {
  return invokeSupportOps("delete_category", {
    category_id: categoryId,
  });
}

export async function createSupportMacro(payload) {
  return invokeSupportOps("create_macro", payload);
}

export async function updateSupportMacro(payload) {
  return invokeSupportOps("update_macro", payload);
}

export async function setSupportMacroStatus({ macroId, status }) {
  return invokeSupportOps("set_macro_status", {
    macro_id: macroId,
    status,
  });
}

export async function deleteSupportMacro({ macroId }) {
  return invokeSupportOps("delete_macro", {
    macro_id: macroId,
  });
}

export async function dispatchSupportMacrosSync({
  mode = "hot",
  panelKey = "admin_support_macros",
  forceFull = false,
  limit,
} = {}) {
  const body = {
    mode,
    panel_key: panelKey,
    force_full: Boolean(forceFull),
  };
  if (Number.isFinite(limit)) {
    body.limit = Number(limit);
  }

  const { data, error } = await supabase.functions.invoke("ops-support-macros-sync-dispatch", {
    body,
  });

  if (error) {
    throw new Error(error.message || "No se pudo ejecutar ops-support-macros-sync-dispatch.");
  }
  if (!data?.ok) {
    const syncError = new Error(data?.detail || data?.error || "ops-support-macros-sync-dispatch failed");
    syncError.code = data?.error || "ops_support_macros_sync_failed";
    syncError.payload = data || null;
    throw syncError;
  }

  return data;
}
