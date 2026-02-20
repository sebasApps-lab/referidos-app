import { supabase } from "../lib/supabaseClient";

const DEVICE_ID_KEY = "referidos:device-id";

function getOrCreateDeviceId() {
  if (typeof window === "undefined") return null;
  const existing = window.localStorage.getItem(DEVICE_ID_KEY);
  if (existing && existing.length >= 8) return existing;
  const next = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
  window.localStorage.setItem(DEVICE_ID_KEY, next);
  return next;
}

function getPlatform() {
  if (typeof window === "undefined") return "web";
  const isStandalone = window.matchMedia?.("(display-mode: standalone)")?.matches;
  return isStandalone ? "pwa" : "web";
}

async function invokeSessionFunction(name, body = {}) {
  const {
    data: { session } = {},
  } = await supabase.auth.getSession();
  if (!session?.access_token) {
    return {
      ok: false,
      code: "no_session",
      status: 401,
      error: "Sesion no disponible",
    };
  }

  const { data, error } = await supabase.functions.invoke(name, {
    body,
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (error) {
    return await normalizeFunctionError(error);
  }

  if (!data || typeof data !== "object") {
    return {
      ok: false,
      code: "empty_response",
      status: 502,
      error: "Respuesta vacia de la funcion",
    };
  }

  if (data.ok === false) {
    return {
      ok: false,
      code: data.code || "session_function_error",
      status: data.status || 400,
      error: data.message || data.error || "Error de sesion",
      ...data,
    };
  }

  return data;
}

async function normalizeFunctionError(error) {
  let code = "function_invoke_failed";
  let status = null;
  let message = error?.message || "No se pudo invocar la funcion";
  let details = null;

  const response = error?.context;
  if (response && typeof response === "object") {
    status = typeof response.status === "number" ? response.status : null;
    try {
      const payload = await response.clone().json();
      if (payload && typeof payload === "object") {
        code = payload.code || code;
        message = payload.message || payload.error || message;
        details = payload.details || null;
      }
    } catch {
      // no-op: keep fallback message
    }
  }

  const normalizedMessage = String(message || "").toLowerCase();
  if (code === 401 || String(code) === "401" || normalizedMessage.includes("invalid jwt")) {
    code = "auth_token_invalid";
    if (!status) status = 401;
  }

  return {
    ok: false,
    code,
    status,
    details,
    error: message,
  };
}

function formatLastActive(isoDate) {
  if (!isoDate) return "Sin actividad";
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "Sin actividad";
  const deltaMs = Date.now() - date.getTime();
  if (deltaMs < 60 * 1000) return "Activa ahora";
  const mins = Math.round(deltaMs / (60 * 1000));
  if (mins < 60) return `Hace ${mins} min`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `Hace ${hours} h`;
  const days = Math.round(hours / 24);
  return `Hace ${days} dias`;
}

function mapSession(session) {
  return {
    id: session.id ?? session.session_id,
    sessionId: session.session_id,
    device: session.device || "Dispositivo",
    platform: session.platform || "web",
    location: session.location || "Ubicacion no disponible",
    lastActive: formatLastActive(session.last_seen_at),
    current: Boolean(session.current),
    revokedAt: session.revoked_at ?? null,
  };
}

export async function registerCurrentSessionDevice() {
  const deviceId = getOrCreateDeviceId();
  if (!deviceId) return { ok: false, error: "device_id_unavailable" };
  return await invokeSessionFunction("session-register", {
    device_id: deviceId,
    platform: getPlatform(),
  });
}

export async function listCurrentUserSessions() {
  const response = await invokeSessionFunction("session-list");
  if (!response?.ok) return response;
  return {
    ok: true,
    currentSessionId: response.current_session_id ?? null,
    sessions: Array.isArray(response.sessions) ? response.sessions.map(mapSession) : [],
  };
}

export async function revokeSessionById(sessionId) {
  return await invokeSessionFunction("session-revoke", { session_id: sessionId });
}

export async function revokeAllSessions() {
  return await invokeSessionFunction("session-revoke-all");
}
