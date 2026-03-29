import { supabase } from "@shared/services/mobileApi";

function toUniqueLowerArray(values: any[] = []) {
  if (!Array.isArray(values)) return [];
  return Array.from(
    new Set(
      values.map((value) => String(value || "").trim().toLowerCase()).filter(Boolean),
    ),
  );
}

export function parseAliasesInput(value: any) {
  return toUniqueLowerArray(
    String(value || "")
      .split(",")
      .map((item) => item.trim()),
  );
}

export function formatAliasesInput(values: any[]) {
  return toUniqueLowerArray(values).join(", ");
}

async function invokeProxy(name: string, action: string, payload: Record<string, any> = {}) {
  const { data, error } = await supabase.functions.invoke(name, {
    body: {
      action,
      payload,
    },
  });

  if (error) {
    throw new Error(error.message || `No se pudo contactar ${name}.`);
  }
  if (!data?.ok) {
    const proxyError: any = new Error(data?.detail || data?.error || `${name} failed`);
    proxyError.code = data?.error || `${name}_failed`;
    proxyError.payload = data?.payload || null;
    throw proxyError;
  }
  return data.data;
}

export async function dispatchSupportAppsSync({
  mode = "hot",
  forceFull = true,
  trigger = "android_admin_support_apps",
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
    throw new Error(data?.detail || data?.error || "ops-support-apps-sync-dispatch failed");
  }
  return data;
}

export async function dispatchSupportMacrosSync({
  mode = "hot",
  panelKey = "android_admin_support_macros",
  forceFull = false,
  limit,
}: {
  mode?: string;
  panelKey?: string;
  forceFull?: boolean;
  limit?: number;
} = {}) {
  const body: Record<string, any> = {
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
    throw new Error(data?.detail || data?.error || "ops-support-macros-sync-dispatch failed");
  }
  return data;
}

export async function fetchSupportApps() {
  const result = await invokeProxy("support-ops-proxy", "list_support_apps", {
    include_inactive: true,
    include_expired_inactive: false,
  });

  try {
    await dispatchSupportAppsSync({
      mode: "hot",
      forceFull: true,
      trigger: "android_support_apps_list",
    });
  } catch {
    // non-blocking
  }

  return Array.isArray(result?.apps) ? result.apps : [];
}

export async function createSupportApp(payload: {
  appKey: string;
  appCode: string;
  displayName: string;
  originSourceDefault: string;
  aliases?: string[];
}) {
  const created = await invokeProxy("support-ops-proxy", "create_support_app", {
    app_key: String(payload?.appKey || "").trim().toLowerCase(),
    app_code: String(payload?.appCode || "").trim().toLowerCase(),
    display_name: String(payload?.displayName || "").trim(),
    origin_source_default: String(payload?.originSourceDefault || "user")
      .trim()
      .toLowerCase(),
    aliases: toUniqueLowerArray(payload?.aliases || []),
    is_active: true,
  });

  await dispatchSupportAppsSync({
    mode: "hot",
    forceFull: true,
    trigger: "android_support_apps_create",
  });
  return created;
}

export async function updateSupportApp(
  appId: string,
  payload: {
    appCode: string;
    displayName: string;
    originSourceDefault: string;
    aliases?: string[];
  },
) {
  const updated = await invokeProxy("support-ops-proxy", "update_support_app", {
    app_id: appId,
    app_code: String(payload?.appCode || "").trim().toLowerCase(),
    display_name: String(payload?.displayName || "").trim(),
    origin_source_default: String(payload?.originSourceDefault || "user")
      .trim()
      .toLowerCase(),
    aliases: toUniqueLowerArray(payload?.aliases || []),
  });

  await dispatchSupportAppsSync({
    mode: "hot",
    forceFull: true,
    trigger: "android_support_apps_update",
  });
  return updated;
}

export async function setSupportAppActive(appId: string, active: boolean) {
  const updated = await invokeProxy("support-ops-proxy", "set_support_app_active", {
    app_id: appId,
    is_active: Boolean(active),
  });

  await dispatchSupportAppsSync({
    mode: "hot",
    forceFull: true,
    trigger: active ? "android_support_apps_restore" : "android_support_apps_deactivate",
  });
  return updated;
}

export async function listSupportMacroCatalog({
  includeArchived = true,
  includeDraft = true,
} = {}) {
  return invokeProxy("support-ops-proxy", "list_catalog", {
    include_archived: includeArchived,
    include_draft: includeDraft,
  });
}

export async function createSupportMacroCategory(payload: Record<string, any>) {
  return invokeProxy("support-ops-proxy", "create_category", payload);
}

export async function updateSupportMacroCategory(payload: Record<string, any>) {
  return invokeProxy("support-ops-proxy", "update_category", payload);
}

export async function setSupportMacroCategoryStatus({
  categoryId,
  status,
}: {
  categoryId: string;
  status: string;
}) {
  return invokeProxy("support-ops-proxy", "set_category_status", {
    category_id: categoryId,
    status,
  });
}

export async function deleteSupportMacroCategory({ categoryId }: { categoryId: string }) {
  return invokeProxy("support-ops-proxy", "delete_category", {
    category_id: categoryId,
  });
}

export async function createSupportMacro(payload: Record<string, any>) {
  return invokeProxy("support-ops-proxy", "create_macro", payload);
}

export async function updateSupportMacro(payload: Record<string, any>) {
  return invokeProxy("support-ops-proxy", "update_macro", payload);
}

export async function setSupportMacroStatus({
  macroId,
  status,
}: {
  macroId: string;
  status: string;
}) {
  return invokeProxy("support-ops-proxy", "set_macro_status", {
    macro_id: macroId,
    status,
  });
}

export async function deleteSupportMacro({ macroId }: { macroId: string }) {
  return invokeProxy("support-ops-proxy", "delete_macro", {
    macro_id: macroId,
  });
}

export async function invokeRegistrationFunction(name: string, body: Record<string, any> = {}) {
  const {
    data: { session } = {},
  } = await supabase.auth.getSession();
  if (!session?.access_token) {
    throw new Error("No hay sesion activa");
  }
  const { data, error } = await supabase.functions.invoke(name, {
    body,
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (error) throw error;
  if (data?.ok === false) {
    throw new Error(data.message || "Error al procesar la solicitud");
  }
  return data;
}

export async function listRegistrationCodes(limit = 100) {
  const data = await invokeRegistrationFunction("list-registration-codes", { limit });
  return data?.data || [];
}

export async function createRegistrationCode() {
  return invokeRegistrationFunction("create-registration-code", {});
}

export async function revokeRegistrationCode(id: string) {
  return invokeRegistrationFunction("revoke-registration-code", { id });
}
