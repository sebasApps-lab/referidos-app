import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { supabase } from "@shared/services/mobileApi";

export const DEFAULT_NOTIFICATION_PREFS = Object.freeze({
  promos: true,
  novedades: true,
  seguridad: true,
});

const PREFS_STORAGE_KEY = "referidos_rn_notification_prefs_v1";
const DEFAULT_POLICY = Object.freeze({
  mode: "mount",
  pollIntervalMs: 0,
  realtime: false,
  visibilityAware: false,
});

const ROLE_POLICIES = Object.freeze({
  admin: Object.freeze({
    mode: "hybrid",
    pollIntervalMs: 5000,
    realtime: true,
    visibilityAware: false,
  }),
  soporte: Object.freeze({
    mode: "hybrid",
    pollIntervalMs: 5000,
    realtime: true,
    visibilityAware: false,
  }),
  cliente: Object.freeze({
    mode: "mount",
    pollIntervalMs: 0,
    realtime: false,
    visibilityAware: false,
  }),
  negocio: Object.freeze({
    mode: "mount",
    pollIntervalMs: 0,
    realtime: false,
    visibilityAware: false,
  }),
});

function isTableMissing(error: any) {
  const message = String(error?.message || "").toLowerCase();
  return message.includes("app_notifications") && message.includes("does not exist");
}

export function normalizeNotificationRole(rawRole: any) {
  const normalized = String(rawRole || "").trim().toLowerCase();
  if (normalized === "support") return "soporte";
  if (normalized === "soporte") return "soporte";
  if (normalized === "admin") return "admin";
  if (normalized === "cliente") return "cliente";
  if (normalized === "negocio") return "negocio";
  return "cliente";
}

export function createNotificationPolicy(role: any, overrides: Record<string, any> = {}) {
  const normalizedRole = normalizeNotificationRole(role);
  const base = (ROLE_POLICIES as any)[normalizedRole] || DEFAULT_POLICY;
  return {
    ...DEFAULT_POLICY,
    ...base,
    ...(overrides || {}),
  };
}

export function canPollByPolicy(policy: any) {
  const mode = String(policy?.mode || "mount").toLowerCase();
  return mode === "poll" || mode === "hybrid";
}

export function canRealtimeByPolicy(policy: any) {
  const mode = String(policy?.mode || "mount").toLowerCase();
  if (!policy?.realtime) return false;
  return mode === "realtime" || mode === "hybrid";
}

export async function fetchAppNotifications({
  limit = 30,
  unreadOnly = false,
  scope = null,
} = {}) {
  let query = supabase
    .from("app_notifications")
    .select(
      "id, role_target, recipient_user_id, scope, event_type, title, body, payload, is_read, read_at, created_at, expires_at",
    )
    .order("created_at", { ascending: false })
    .limit(Math.max(1, Math.min(Number(limit) || 30, 200)));

  if (unreadOnly) query = query.eq("is_read", false);
  if (scope) query = query.eq("scope", String(scope));

  const { data, error } = await query;
  if (error) {
    if (isTableMissing(error)) {
      return { ok: true, data: [] };
    }
    return { ok: false, error: error.message || "fetch_notifications_failed", data: [] };
  }

  return { ok: true, data: data || [] };
}

export async function markAppNotificationsRead(ids: string[] = []) {
  const normalizedIds = (ids || []).filter(Boolean);
  if (normalizedIds.length === 0) return { ok: true, updated: 0 };

  const { data, error } = await supabase.rpc("notifications_mark_read", {
    p_ids: normalizedIds,
  });
  if (error) {
    if (isTableMissing(error)) {
      return { ok: true, updated: 0 };
    }
    return { ok: false, error: error.message || "mark_notifications_read_failed", updated: 0 };
  }
  return { ok: true, updated: Number(data) || 0 };
}

export async function markAllAppNotificationsRead(scope: string | null = null) {
  const payload = scope ? { p_scope: String(scope) } : {};
  const { data, error } = await supabase.rpc("notifications_mark_all_read", payload);
  if (error) {
    if (isTableMissing(error)) {
      return { ok: true, updated: 0 };
    }
    return {
      ok: false,
      error: error.message || "mark_all_notifications_read_failed",
      updated: 0,
    };
  }
  return { ok: true, updated: Number(data) || 0 };
}

function normalizePrefs(raw: any) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { ...DEFAULT_NOTIFICATION_PREFS };
  }
  return {
    promos: Boolean(raw.promos ?? DEFAULT_NOTIFICATION_PREFS.promos),
    novedades: Boolean(raw.novedades ?? DEFAULT_NOTIFICATION_PREFS.novedades),
    seguridad: Boolean(raw.seguridad ?? DEFAULT_NOTIFICATION_PREFS.seguridad),
  };
}

export async function getNotificationPrefs() {
  try {
    const raw = await AsyncStorage.getItem(PREFS_STORAGE_KEY);
    return raw ? normalizePrefs(JSON.parse(raw)) : { ...DEFAULT_NOTIFICATION_PREFS };
  } catch {
    return { ...DEFAULT_NOTIFICATION_PREFS };
  }
}

export async function setNotificationPrefs(nextPrefs: Record<string, boolean>) {
  const normalized = normalizePrefs(nextPrefs);
  try {
    await AsyncStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(normalized));
  } catch {
    // ignore
  }
  return normalized;
}

export async function toggleNotificationPref(key: keyof typeof DEFAULT_NOTIFICATION_PREFS) {
  const current = await getNotificationPrefs();
  const next = {
    ...current,
    [key]: !current[key],
  };
  return setNotificationPrefs(next);
}

export function getDeviceNotificationPermissionLabel() {
  return Platform.OS === "android" ? "Configurable desde el sistema" : "No configurado";
}
