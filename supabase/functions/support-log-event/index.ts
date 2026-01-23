import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  safeTrim,
  supabaseAdmin,
} from "../_shared/support.ts";

const MAX_PER_MINUTE = 40;
const MAX_PER_MINUTE_IP = 120;
const PERFORMANCE_SAMPLE_RATE = 0.2;
const MAX_BATCH = 20;
const DEDUPE_WINDOW_MS = 2 * 60 * 1000;
const MAX_MESSAGE_LEN = 500;
const MAX_CONTEXT_LEN = 4096;
const ALLOWED_LEVELS = new Set(["info", "warn", "error"]);
const ALLOWED_CATEGORIES = new Set([
  "auth",
  "onboarding",
  "scanner",
  "promos",
  "payments",
  "network",
  "ui_flow",
  "performance",
]);

function maskEmail(value: string) {
  const [local, domain] = value.split("@");
  if (!domain || local.length < 2) return value;
  return `${local[0]}***@${domain[0]}***`;
}

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 4) return value;
  return `${"*".repeat(digits.length - 4)}${digits.slice(-4)}`;
}

function scrubValue(value: string) {
  let next = value;
  next = next.replace(/bearer\s+[a-z0-9\-_\.]+/gi, "bearer [redacted]");
  next = next.replace(/(access|refresh)_token\"?\s*:\s*\"[^\"]+\"/gi, "$1_token\":\"[redacted]\"");
  next = next.replace(/authorization\"?\s*:\s*\"[^\"]+\"/gi, "authorization\":\"[redacted]\"");
  next = next.replace(/cookie\"?\s*:\s*\"[^\"]+\"/gi, "cookie\":\"[redacted]\"");
  next = next.replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, (match) =>
    maskEmail(match)
  );
  next = next.replace(/\+?\d[\d\s-]{7,}\d/g, (match) => maskPhone(match));
  return next;
}

function normalizeMessage(value: string) {
  return value.toLowerCase().replace(/\d+/g, "0").replace(/\s+/g, " ").trim();
}

async function hashValue(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const bytes = Array.from(new Uint8Array(digest));
  return bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function safeStringify(value: unknown, limit: number) {
  try {
    const raw = JSON.stringify(value ?? {});
    if (raw.length <= limit) return raw;
    return raw.slice(0, limit);
  } catch {
    return "{}";
  }
}

function pickStandardContext(context: Record<string, unknown>) {
  return {
    route: typeof context.route === "string" ? context.route : null,
    role: typeof context.role === "string" ? context.role : null,
    screen: typeof context.screen === "string" ? context.screen : null,
    app_version: typeof context.app_version === "string" ? context.app_version : null,
    device: typeof context.device === "string" ? context.device : null,
    network: typeof context.network === "string" ? context.network : null,
    session_id: typeof context.session_id === "string" ? context.session_id : null,
    flow: typeof context.flow === "string" ? context.flow : null,
    flow_step: typeof context.flow_step === "string" ? context.flow_step : null,
    request_id: typeof context.request_id === "string" ? context.request_id : null,
    thread_id: typeof context.thread_id === "string"
      ? context.thread_id
      : typeof context.ticket_id === "string"
        ? context.ticket_id
        : null,
    user_agent: typeof context.user_agent === "string" ? context.user_agent : null,
  };
}

function isUuid(value: string | null) {
  if (!value) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "method_not_allowed" }, 405, cors);
  }

  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.replace("Bearer ", "").trim();
  if (!token) {
    return jsonResponse({ ok: false, error: "missing_token" }, 401, cors);
  }

  const { user, error: authErr } = await requireAuthUser(token);
  if (authErr || !user) {
    return jsonResponse({ ok: false, error: "unauthorized" }, 401, cors);
  }

  const { usuario, error: profileErr } = await getUsuarioByAuthId(user.id);
  if (profileErr || !usuario) {
    return jsonResponse({ ok: false, error: "profile_not_found" }, 404, cors);
  }

  const body = await req.json().catch(() => ({}));
  const rawEvents = Array.isArray(body.events)
    ? body.events.slice(0, MAX_BATCH)
    : [body];
  const receivedAt = new Date().toISOString();
  const ip =
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const ipHash = await hashValue(ip);
  const since = new Date(Date.now() - 60 * 1000).toISOString();

  const { count, error: countErr } = await supabaseAdmin
    .from("support_user_logs")
    .select("id", { count: "exact", head: true })
    .eq("user_id", usuario.id)
    .gte("created_at", since);

  if (countErr) {
    return jsonResponse({ ok: false, error: "rate_check_failed" }, 500, cors);
  }

  const { count: ipCount, error: ipErr } = await supabaseAdmin
    .from("support_user_logs")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);

  if (ipErr) {
    return jsonResponse({ ok: false, error: "rate_check_failed" }, 500, cors);
  }

  if ((count ?? 0) >= MAX_PER_MINUTE || (ipCount ?? 0) >= MAX_PER_MINUTE_IP) {
    return jsonResponse({ ok: true, skipped: true }, 200, cors);
  }

  const toInsert: Record<string, unknown>[] = [];
  let skipped = 0;

  for (const event of rawEvents) {
    const level = ALLOWED_LEVELS.has(event.level) ? event.level : "info";
    const category = ALLOWED_CATEGORIES.has(event.category)
      ? event.category
      : "ui_flow";
    let message = safeTrim(event.message, MAX_MESSAGE_LEN);
    if (!message) {
      skipped += 1;
      continue;
    }
    message = scrubValue(message);
    if (category === "performance" && Math.random() > PERFORMANCE_SAMPLE_RATE) {
      skipped += 1;
      continue;
    }

    const context =
      typeof event.context === "object" && event.context ? event.context : {};
    const normalized = normalizeMessage(message);
    const standard = pickStandardContext(context);
    const stack = typeof context.stack === "string"
      ? context.stack.split("\n")[0]
      : "";
    const fingerprint = await hashValue(
      `${category}|${normalized}|${standard.route ?? ""}|${stack ?? ""}`,
    );
    const dedupeSince = new Date(Date.now() - DEDUPE_WINDOW_MS).toISOString();
    const { count: dupCount } = await supabaseAdmin
      .from("support_user_logs")
      .select("id", { count: "exact", head: true })
      .eq("user_id", usuario.id)
      .eq("fingerprint", fingerprint)
      .gte("created_at", dedupeSince);
    if ((dupCount ?? 0) > 0) {
      skipped += 1;
      continue;
    }

    const contextExtraRaw =
      typeof event.context_extra === "object" && event.context_extra
        ? event.context_extra
        : {};
    const contextExtra = safeStringify(contextExtraRaw, MAX_CONTEXT_LEN);

    const threadId = isUuid(standard.thread_id) ? standard.thread_id : null;
    toInsert.push({
      user_id: usuario.id,
      role: usuario.role,
      level,
      category,
      message,
      request_id: safeTrim(event.request_id, 64) || standard.request_id || null,
      session_id: standard.session_id,
      route: standard.route,
      screen: standard.screen,
      app_version: standard.app_version,
      device: standard.device,
      network: standard.network,
      flow: standard.flow,
      flow_step: standard.flow_step,
      thread_id: threadId,
      user_agent: standard.user_agent || req.headers.get("user-agent"),
      ip_hash: ipHash,
      fingerprint,
      context: safeStringify(context, MAX_CONTEXT_LEN),
      context_extra: contextExtra,
      received_at: receivedAt,
    });
  }

  if (!toInsert.length) {
    return jsonResponse({ ok: true, skipped: true }, 200, cors);
  }

  const insertResponse = await supabaseAdmin
    .from("support_user_logs")
    .insert(toInsert);

  if (insertResponse.error) {
    return jsonResponse({ ok: false, error: "log_insert_failed" }, 500, cors);
  }

  return jsonResponse({ ok: true, inserted: toInsert.length, skipped }, 200, cors);
});
