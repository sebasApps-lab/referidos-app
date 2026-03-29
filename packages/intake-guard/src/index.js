const DEFAULT_UA_PEPPER =
  globalThis.Deno?.env?.get?.("PRELAUNCH_UA_PEPPER") || "prelaunch_ua_pepper_v1";
const DEFAULT_IP_RISK_PEPPER =
  globalThis.Deno?.env?.get?.("PRELAUNCH_IP_RISK_PEPPER") || "prelaunch_ip_risk_pepper_v1";

export function safeTrim(value, limit = 500) {
  if (value == null) return "";
  const trimmed = String(value).trim();
  if (trimmed.length <= limit) return trimmed;
  return trimmed.slice(0, limit);
}

export function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function parseUuid(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      .test(trimmed)
  ) {
    return trimmed.toLowerCase();
  }
  return null;
}

export function getClientIp(req) {
  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    ""
  ).trim();
}

export async function sha256Hex(value) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function buildDailyIpRiskId(
  ip,
  { pepper = DEFAULT_IP_RISK_PEPPER, date = new Date() } = {},
) {
  const daySalt = date.toISOString().slice(0, 10);
  return sha256Hex(`${pepper}|${daySalt}|${ip}`);
}

export async function buildUserAgentHash(
  userAgent,
  { pepper = DEFAULT_UA_PEPPER } = {},
) {
  const normalized = safeTrim(userAgent, 500);
  if (!normalized) return null;
  return sha256Hex(`${pepper}|${normalized}`);
}

export async function buildContactHash(contactValue, { channel = "generic" } = {}) {
  const normalized = safeTrim(contactValue, 240).toLowerCase();
  if (!normalized) return null;
  return sha256Hex(`${channel}|${normalized}`);
}

export function normalizeMessageForHash(value, max = 4000) {
  return safeTrim(value, max).replace(/\s+/g, " ").toLowerCase();
}

export async function buildMessageHash(message) {
  const normalized = normalizeMessageForHash(message);
  if (!normalized) return null;
  return sha256Hex(normalized);
}

export async function buildSubmissionFingerprint(parts = []) {
  const normalized = parts
    .map((part) => safeTrim(part, 500))
    .filter(Boolean)
    .map((part) => part.replace(/\s+/g, " ").toLowerCase());

  if (!normalized.length) return null;
  return sha256Hex(normalized.join("|"));
}

export function isoSince(windowMs, now = Date.now()) {
  return new Date(now - windowMs).toISOString();
}

export async function prepareIntakeGuard({
  req,
  channel = null,
  contactValue = null,
  message = "",
  fingerprintParts = [],
  ipPepper = DEFAULT_IP_RISK_PEPPER,
  uaPepper = DEFAULT_UA_PEPPER,
} = {}) {
  const ip = getClientIp(req);
  const userAgent = safeTrim(req?.headers?.get?.("user-agent"), 500);
  const ipRiskId = ip ? await buildDailyIpRiskId(ip, { pepper: ipPepper }) : null;
  const uaHash = userAgent
    ? await buildUserAgentHash(userAgent, { pepper: uaPepper })
    : null;
  const contactHash = contactValue
    ? await buildContactHash(contactValue, { channel: channel || "generic" })
    : null;
  const messageHash = message ? await buildMessageHash(message) : null;
  const fingerprint = await buildSubmissionFingerprint([
    ...fingerprintParts,
    contactHash || "",
    messageHash || "",
  ]);

  return {
    ip,
    userAgent,
    ipRiskId,
    uaHash,
    contactHash,
    messageHash,
    fingerprint,
  };
}

export async function countIntakeGuardEvents(
  supabase,
  {
    tenantId,
    systemKey,
    actionKey,
    sinceIso,
    outcomes = null,
    ipRiskId = null,
    contactHash = null,
    anonId = null,
    visitSessionId = null,
    fingerprint = null,
  } = {},
) {
  let query = supabase
    .from("intake_guard_events")
    .select("id", { count: "exact", head: true })
    .eq("tenant_id", tenantId)
    .eq("system_key", safeTrim(systemKey, 80))
    .eq("action_key", safeTrim(actionKey, 80))
    .gte("created_at", sinceIso);

  if (Array.isArray(outcomes) && outcomes.length) {
    query = query.in("outcome", outcomes.map((outcome) => safeTrim(outcome, 40)).filter(Boolean));
  }
  if (ipRiskId) query = query.eq("ip_risk_id", ipRiskId);
  if (contactHash) query = query.eq("contact_hash", contactHash);
  if (anonId) query = query.eq("anon_id", anonId);
  if (visitSessionId) query = query.eq("visit_session_id", visitSessionId);
  if (fingerprint) query = query.eq("fingerprint", fingerprint);

  const { count, error } = await query;
  return {
    count: count || 0,
    error: error?.message || null,
  };
}

export async function recordIntakeGuardEvent(
  supabase,
  {
    tenantId,
    systemKey,
    actionKey,
    originRole = null,
    appChannel = null,
    sourceRoute = null,
    sourceSurface = null,
    anonId = null,
    visitSessionId = null,
    contactHash = null,
    messageHash = null,
    fingerprint = null,
    ipRiskId = null,
    uaHash = null,
    outcome,
    reason = null,
    riskScore = 0,
    riskFlags = {},
    meta = {},
  } = {},
) {
  return supabase.from("intake_guard_events").insert({
    tenant_id: tenantId,
    system_key: safeTrim(systemKey, 80),
    action_key: safeTrim(actionKey, 80),
    origin_role: originRole ? safeTrim(originRole, 20) : null,
    app_channel: appChannel ? safeTrim(appChannel, 80) : null,
    source_route: sourceRoute ? safeTrim(sourceRoute, 240) : null,
    source_surface: sourceSurface ? safeTrim(sourceSurface, 120) : null,
    anon_id: anonId,
    visit_session_id: visitSessionId,
    contact_hash: contactHash,
    message_hash: messageHash,
    fingerprint,
    ip_risk_id: ipRiskId,
    ua_hash: uaHash,
    outcome: safeTrim(outcome, 40),
    reason: reason ? safeTrim(reason, 120) : null,
    risk_score: Number.isFinite(riskScore) ? Math.trunc(riskScore) : 0,
    risk_flags: isRecord(riskFlags) ? riskFlags : {},
    meta: isRecord(meta) ? meta : {},
  });
}
