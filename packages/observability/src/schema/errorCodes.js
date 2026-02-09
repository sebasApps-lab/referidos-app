export const OBS_ERROR_CODES = Object.freeze({
  AUTH_UNAUTHORIZED: "auth_unauthorized",
  AUTH_TOKEN_INVALID: "auth_token_invalid",
  SESSION_REVOKED: "session_revoked",
  SESSION_UNREGISTERED: "session_unregistered",
  SESSION_LOOKUP_FAILED: "session_lookup_failed",
  SESSION_REGISTER_FAILED: "session_register_failed",
  POLICY_UNAVAILABLE: "policy_unavailable",
  POLICY_MISSING: "policy_missing",
  TENANT_RESOLUTION_FAILED: "tenant_resolution_failed",
  RATE_LIMITED_USER: "rate_limited_user",
  RATE_LIMITED_IP: "rate_limited_ip",
  NETWORK_ERROR: "network_error",
  EDGE_UNAVAILABLE: "edge_unavailable",
  EDGE_TIMEOUT: "edge_timeout",
  UNKNOWN: "unknown_error",
});

export const AUTHORITATIVE_LOGOUT_CODES = new Set([
  OBS_ERROR_CODES.AUTH_UNAUTHORIZED,
  OBS_ERROR_CODES.AUTH_TOKEN_INVALID,
  OBS_ERROR_CODES.SESSION_REVOKED,
  OBS_ERROR_CODES.SESSION_UNREGISTERED,
]);

export const TRANSIENT_CODES = new Set([
  OBS_ERROR_CODES.NETWORK_ERROR,
  OBS_ERROR_CODES.EDGE_UNAVAILABLE,
  OBS_ERROR_CODES.EDGE_TIMEOUT,
  OBS_ERROR_CODES.POLICY_UNAVAILABLE,
  OBS_ERROR_CODES.SESSION_LOOKUP_FAILED,
]);

export function normalizeErrorCode(value) {
  if (typeof value !== "string") return OBS_ERROR_CODES.UNKNOWN;
  const key = value.trim().toLowerCase();
  return key || OBS_ERROR_CODES.UNKNOWN;
}
