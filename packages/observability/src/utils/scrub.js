const TOKEN_RE = /bearer\s+[a-z0-9\-_.]+/gi;
const ACCESS_TOKEN_RE = /(access|refresh)_token"?\s*:\s*"[^"]+"/gi;
const AUTH_HEADER_RE = /authorization"?\s*:\s*"[^"]+"/gi;
const COOKIE_RE = /cookie"?\s*:\s*"[^"]+"/gi;
const EMAIL_RE = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const PHONE_RE = /\+?\d[\d\s\-()]{7,}\d/g;
const QUERY_RE = /([?&](token|code|key|apikey|password|pass|secret|auth)=)([^&#]+)/gi;

function maskEmail(value) {
  const [local, domain] = value.split("@");
  if (!domain || local.length < 2) return value;
  return `${local[0]}***@${domain[0]}***`;
}

function maskPhone(value) {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 4) return value;
  return `${"*".repeat(Math.max(digits.length - 4, 2))}${digits.slice(-4)}`;
}

export function scrubString(value) {
  if (typeof value !== "string") return value;
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

export function scrubUnknown(value, depth = 0) {
  if (depth > 5) return "[truncated]";
  if (typeof value === "string") return scrubString(value);
  if (value == null || typeof value === "number" || typeof value === "boolean") {
    return value;
  }
  if (Array.isArray(value)) {
    return value.slice(0, 80).map((item) => scrubUnknown(item, depth + 1));
  }
  if (typeof value === "object") {
    const out = {};
    for (const [key, entry] of Object.entries(value)) {
      if (/(password|secret|token|cookie|authorization|apikey|key)/i.test(key)) {
        out[key] = "[redacted]";
      } else {
        out[key] = scrubUnknown(entry, depth + 1);
      }
    }
    return out;
  }
  return "[unsupported]";
}
