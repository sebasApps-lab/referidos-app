import { supabaseAdmin, supabasePublic } from "./support.ts";

export { supabaseAdmin, supabasePublic };

export const OBS_MAX_BATCH = 20;
export const OBS_MAX_MESSAGE_LEN = 1200;
export const OBS_MAX_CONTEXT_SIZE = 24_000;
export const OBS_MAX_BREADCRUMBS = 50;
export const OBS_DEDUPE_WINDOW_MS = 2 * 60 * 1000;
export const OBS_RATE_USER_PER_MIN = 120;
export const OBS_RATE_IP_PER_MIN = 240;

export const ALLOWED_LEVELS = new Set([
  "fatal",
  "error",
  "warn",
  "info",
  "debug",
]);
export const ALLOWED_EVENT_TYPES = new Set([
  "error",
  "log",
  "performance",
  "security",
  "audit",
]);
export const ALLOWED_SOURCES = new Set(["web", "edge", "worker"]);

const TOKEN_RE = /bearer\s+[a-z0-9\-_.]+/gi;
const ACCESS_TOKEN_RE = /(access|refresh)_token\"?\s*:\s*\"[^\"]+\"/gi;
const AUTH_HEADER_RE = /authorization\"?\s*:\s*\"[^\"]+\"/gi;
const COOKIE_RE = /cookie\"?\s*:\s*\"[^\"]+\"/gi;
const EMAIL_RE = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const PHONE_RE = /\+?\d[\d\s\-()]{7,}\d/g;
const QUERY_RE = /([?&](token|code|key|apikey|password|pass|secret|auth)=)([^&#]+)/gi;

export function corsHeaders(origin: string | null) {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-request-id, x-trace-id",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

export function jsonResponse(
  body: unknown,
  status = 200,
  headers: Record<string, string> = {},
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

export async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function maskEmail(value: string) {
  const [local, domain] = value.split("@");
  if (!domain || local.length < 2) return value;
  return `${local[0]}***@${domain[0]}***`;
}

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 4) return value;
  return `${"*".repeat(Math.max(digits.length - 4, 2))}${digits.slice(-4)}`;
}

export function scrubString(value: string) {
  let next = value;
  next = next.replace(TOKEN_RE, "bearer [redacted]");
  next = next.replace(ACCESS_TOKEN_RE, "$1_token\":\"[redacted]\"");
  next = next.replace(AUTH_HEADER_RE, "authorization\":\"[redacted]\"");
  next = next.replace(COOKIE_RE, "cookie\":\"[redacted]\"");
  next = next.replace(QUERY_RE, "$1[redacted]");
  next = next.replace(EMAIL_RE, (match) => maskEmail(match));
  next = next.replace(PHONE_RE, (match) => maskPhone(match));
  return next;
}

export function scrubUnknown(value: unknown, depth = 0): unknown {
  if (depth > 4) return "[truncated]";
  if (typeof value === "string") return scrubString(value);
  if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.slice(0, 60).map((item) => scrubUnknown(item, depth + 1));
  }
  if (typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
      if (/(password|secret|token|cookie|authorization|apikey|key)/i.test(key)) {
        out[key] = "[redacted]";
        continue;
      }
      out[key] = scrubUnknown(entry, depth + 1);
    }
    return out;
  }
  return "[unsupported]";
}

export function truncateText(value: string, max: number) {
  if (value.length <= max) return value;
  return value.slice(0, max);
}

export function normalizeMessage(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return truncateText(scrubString(trimmed), OBS_MAX_MESSAGE_LEN);
}

export function normalizeLevel(value: unknown): string {
  const next = typeof value === "string" ? value.toLowerCase() : "error";
  return ALLOWED_LEVELS.has(next) ? next : "error";
}

export function normalizeEventType(value: unknown): string {
  const next = typeof value === "string" ? value.toLowerCase() : "error";
  return ALLOWED_EVENT_TYPES.has(next) ? next : "error";
}

export function normalizeSource(value: unknown): string {
  const next = typeof value === "string" ? value.toLowerCase() : "web";
  return ALLOWED_SOURCES.has(next) ? next : "web";
}

export function parseStackPreview(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const first = value.split("\n")[0]?.trim();
  if (!first) return null;
  return truncateText(scrubString(first), 700);
}

export function normalizeTimestamp(value: unknown): string {
  if (typeof value !== "string") return new Date().toISOString();
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return new Date().toISOString();
  return parsed.toISOString();
}

export function stableFingerprintSeed(input: string) {
  return input.toLowerCase().replace(/\d+/g, "0").replace(/\s+/g, " ").trim();
}

export async function buildFingerprint({
  errorName,
  errorCode,
  stackPreview,
  route,
  message,
  eventType,
}: {
  errorName: string | null;
  errorCode: string | null;
  stackPreview: string | null;
  route: string | null;
  message: string;
  eventType: string;
}) {
  const seed = [
    stableFingerprintSeed(errorName || ""),
    stableFingerprintSeed(errorCode || ""),
    stableFingerprintSeed(stackPreview || ""),
    stableFingerprintSeed(route || ""),
    stableFingerprintSeed(message),
    stableFingerprintSeed(eventType),
  ].join("|");
  return await sha256Hex(seed);
}

export function parseUserAgentSummary(ua: string | null) {
  const lower = (ua || "").toLowerCase();
  let browser = "unknown";
  if (lower.includes("edg/")) browser = "edge";
  else if (lower.includes("chrome/")) browser = "chrome";
  else if (lower.includes("safari/") && !lower.includes("chrome/")) browser = "safari";
  else if (lower.includes("firefox/")) browser = "firefox";

  let os = "unknown";
  if (lower.includes("android")) os = "android";
  else if (lower.includes("iphone") || lower.includes("ipad") || lower.includes("ios")) os = "ios";
  else if (lower.includes("windows")) os = "windows";
  else if (lower.includes("mac os")) os = "macos";
  else if (lower.includes("linux")) os = "linux";

  return { browser, os };
}

export function extractRequestIds(req: Request) {
  return {
    requestId:
      req.headers.get("x-request-id") ||
      req.headers.get("cf-ray") ||
      req.headers.get("x-correlation-id") ||
      null,
    traceId:
      req.headers.get("x-trace-id") ||
      req.headers.get("traceparent") ||
      null,
  };
}

export function getTokenFromRequest(req: Request): string | null {
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.replace("Bearer ", "").trim();
  return token || null;
}

export async function getOptionalAuthedUser(req: Request) {
  const token = getTokenFromRequest(req);
  if (!token) {
    return { token: null, authUser: null, authError: null as string | null };
  }
  const {
    data: { user },
    error,
  } = await supabasePublic.auth.getUser(token);
  if (error || !user) {
    return { token, authUser: null, authError: "unauthorized_token" };
  }
  return { token, authUser: user, authError: null as string | null };
}

export async function getUsuarioByAuthId(authId: string) {
  const { data, error } = await supabaseAdmin
    .from("usuarios")
    .select("id, id_auth, role, tenant_id, public_id")
    .eq("id_auth", authId)
    .order("id", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) return { usuario: null, error: error.message };
  return { usuario: data, error: null as string | null };
}

function parseOriginFromReferer(value: string | null): string | null {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

export function originCandidates(req: Request): string[] {
  const origin = req.headers.get("origin");
  const refererOrigin = parseOriginFromReferer(req.headers.get("referer"));
  const host = req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") || "https";
  const hostOrigin = host ? `${proto}://${host}` : null;

  const all = [origin, refererOrigin, hostOrigin]
    .filter((value): value is string => Boolean(value))
    .map((value) => value.trim().toLowerCase().replace(/\/+$/, ""));

  return [...new Set(all)];
}

export async function resolveTenantIdByOrigin(req: Request): Promise<string | null> {
  const candidates = originCandidates(req);
  for (const candidate of candidates) {
    const { data } = await supabaseAdmin
      .from("tenant_origins")
      .select("tenant_id")
      .ilike("origin", candidate)
      .limit(1)
      .maybeSingle();
    if (data?.tenant_id) return data.tenant_id;
  }
  return null;
}

export async function resolveTenantIdByHint(tenantHint: string | null): Promise<string | null> {
  if (!tenantHint) return null;
  const normalized = tenantHint.trim();
  if (!normalized) return null;
  const { data } = await supabaseAdmin
    .from("tenants")
    .select("id")
    .ilike("name", normalized)
    .limit(1)
    .maybeSingle();
  return data?.id || null;
}

export async function currentRateCountByUser(
  tenantId: string,
  userId: string,
  sinceIso: string,
) {
  const { count } = await supabaseAdmin
    .from("obs_events")
    .select("id", { count: "exact", head: true })
    .eq("tenant_id", tenantId)
    .eq("user_id", userId)
    .gte("occurred_at", sinceIso);
  return count || 0;
}

export async function currentRateCountByIp(
  tenantId: string,
  ipHash: string,
  sinceIso: string,
) {
  const { count } = await supabaseAdmin
    .from("obs_events")
    .select("id", { count: "exact", head: true })
    .eq("tenant_id", tenantId)
    .eq("ip_hash", ipHash)
    .gte("occurred_at", sinceIso);
  return count || 0;
}

export async function hasRecentDuplicate(
  tenantId: string,
  fingerprint: string,
  sinceIso: string,
) {
  const { count } = await supabaseAdmin
    .from("obs_events")
    .select("id", { count: "exact", head: true })
    .eq("tenant_id", tenantId)
    .eq("fingerprint", fingerprint)
    .gte("occurred_at", sinceIso);
  return (count || 0) > 0;
}

export function shouldSample(level: string, eventType: string) {
  const random = Math.random();
  if (level === "fatal" || level === "error") return true;
  if (level === "warn") return random <= 0.5;
  if (eventType === "performance") return random <= 0.03;
  if (level === "info") return random <= 0.15;
  return random <= 0.08;
}

export function normalizeBreadcrumbs(input: unknown) {
  if (!Array.isArray(input)) return [];
  return input.slice(-OBS_MAX_BREADCRUMBS).map((item) => {
    const safe = scrubUnknown(item);
    if (safe && typeof safe === "object") return safe;
    return { message: String(safe ?? "") };
  });
}

export function safeJsonString(input: unknown, maxLen = OBS_MAX_CONTEXT_SIZE) {
  try {
    const serialized = JSON.stringify(input ?? {});
    if (serialized.length <= maxLen) return serialized;
    return serialized.slice(0, maxLen);
  } catch {
    return "{}";
  }
}
