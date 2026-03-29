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
    visibilityAware: true,
  }),
  soporte: Object.freeze({
    mode: "hybrid",
    pollIntervalMs: 5000,
    realtime: true,
    visibilityAware: true,
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

export function normalizeNotificationRole(rawRole) {
  const normalized = String(rawRole || "").trim().toLowerCase();
  if (normalized === "support") return "soporte";
  if (normalized === "soporte") return "soporte";
  if (normalized === "admin") return "admin";
  if (normalized === "cliente") return "cliente";
  if (normalized === "negocio") return "negocio";
  return "cliente";
}

export function createNotificationPolicy(role, overrides = {}) {
  const normalizedRole = normalizeNotificationRole(role);
  const base = ROLE_POLICIES[normalizedRole] || DEFAULT_POLICY;
  return {
    ...DEFAULT_POLICY,
    ...base,
    ...(overrides || {}),
  };
}

export function canPollByPolicy(policy) {
  const mode = String(policy?.mode || "mount").toLowerCase();
  return mode === "poll" || mode === "hybrid";
}

export function canRealtimeByPolicy(policy) {
  const mode = String(policy?.mode || "mount").toLowerCase();
  if (!policy?.realtime) return false;
  return mode === "realtime" || mode === "hybrid";
}
