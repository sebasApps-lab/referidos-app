// supabase/functions/waitlist-signup/index.ts
// Waitlist signup for prelaunch/beta access (analytics + antifraude baseline, sin captcha).

import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("URL") ?? Deno.env.get("SUPABASE_URL");
const publishableKey =
  Deno.env.get("PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY");
const secretKey =
  Deno.env.get("SECRET_KEY") ?? Deno.env.get("SUPABASE_SECRET_KEY");

if (!supabaseUrl || !publishableKey || !secretKey) {
  throw new Error(
    "Missing Supabase env vars: SUPABASE_URL/URL, PUBLISHABLE_KEY, SECRET_KEY",
  );
}

const supabaseAdmin = createClient(supabaseUrl, secretKey);

const DEFAULT_TENANT_HINT = "ReferidosAPP";
const DEFAULT_APP_CHANNEL = "prelaunch_web";
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_IP = 5;
const RATE_LIMIT_MAX_ANON = 12;
const UA_PEPPER = Deno.env.get("PRELAUNCH_UA_PEPPER") || "prelaunch_ua_pepper_v1";
const IP_RISK_PEPPER = Deno.env.get("PRELAUNCH_IP_RISK_PEPPER") || "prelaunch_ip_risk_pepper_v1";

serve(async (req) => {
  const origin = req.headers.get("origin") || "*";
  const corsHeaders = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ ok: false, message: "method_not_allowed" }, 405, corsHeaders);
  }

  const payload = await safeJson(req);
  if (!payload || typeof payload !== "object") {
    return json({ ok: false, message: "invalid_payload" }, 400, corsHeaders);
  }

  const honeypot = String(payload.honeypot || "").trim();
  if (honeypot) {
    return json({ ok: true, spam: true }, 200, corsHeaders);
  }

  const rawEmail = String(payload.email || "").trim();
  if (!rawEmail) {
    return json({ ok: false, message: "invalid_email" }, 400, corsHeaders);
  }

  const email = rawEmail.toLowerCase();
  if (!isValidEmail(email)) {
    return json({ ok: false, message: "invalid_email" }, 400, corsHeaders);
  }

  const tenantHint = cleanText(payload.tenant_hint, 120) || DEFAULT_TENANT_HINT;
  const appChannel = cleanText(payload.app_channel, 60) || DEFAULT_APP_CHANNEL;
  const tenantId = await resolveTenantId(req, tenantHint);
  if (!tenantId) {
    return json({ ok: false, message: "tenant_not_found" }, 400, corsHeaders);
  }

  const roleIntentRaw = cleanText(payload.role_intent ?? payload.role, 40);
  const roleIntent = normalizeRoleIntent(roleIntentRaw);
  const legacyRole = roleIntent === "negocio" ? "negocio_interest" : "cliente";
  const source = cleanText(payload.source, 80) || "landing";
  const consentVersion = cleanText(payload.consent_version, 40) || "privacy_v1";
  const anonId = parseUuid(payload.anon_id);
  const visitSessionId = parseUuid(payload.visit_session_id);
  const utm = sanitizeUtm(payload.utm);

  const ip = getClientIp(req);
  const ipRiskId = ip ? await buildIpRiskId(ip) : null;
  const ipHash = ipRiskId;
  const userAgentRaw = cleanText(req.headers.get("user-agent"), 500);
  const uaHash = userAgentRaw ? await sha256(`${UA_PEPPER}|${userAgentRaw}`) : null;
  const emailHash = await sha256(email);
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();

  if (ipRiskId) {
    const { count, error } = await supabaseAdmin
      .from("waitlist_signups")
      .select("id", { count: "exact", head: true })
      .eq("tenant_id", tenantId)
      .eq("ip_risk_id", ipRiskId)
      .gte("created_at", since);

    if (!error && (count ?? 0) >= RATE_LIMIT_MAX_IP) {
      return json({ ok: false, message: "rate_limited" }, 429, corsHeaders);
    }
  }

  if (anonId) {
    const { count, error } = await supabaseAdmin
      .from("waitlist_signups")
      .select("id", { count: "exact", head: true })
      .eq("tenant_id", tenantId)
      .eq("anon_id", anonId)
      .gte("created_at", since);

    if (!error && (count ?? 0) >= RATE_LIMIT_MAX_ANON) {
      return json({ ok: false, message: "rate_limited" }, 429, corsHeaders);
    }
  }

  const { data: existingByHash } = await supabaseAdmin
    .from("waitlist_signups")
    .select("id")
    .eq("tenant_id", tenantId)
    .eq("email_hash", emailHash)
    .limit(1)
    .maybeSingle();

  if (existingByHash?.id) {
    return json({ ok: true, already: true }, 200, corsHeaders);
  }

  const { error } = await supabaseAdmin
    .from("waitlist_signups")
    .insert({
      tenant_id: tenantId,
      app_channel: appChannel,
      email,
      email_hash: emailHash,
      role: legacyRole,
      role_intent: roleIntent,
      source,
      consent_version: consentVersion,
      anon_id: anonId,
      visit_session_id: visitSessionId,
      status: "active",
      ip_hash: ipHash,
      ip_risk_id: ipRiskId,
      ua_hash: uaHash,
      user_agent: null,
      utm,
      risk_flags: {},
    });

  if (error) {
    if (isDuplicate(error)) {
      return json({ ok: true, already: true }, 200, corsHeaders);
    }
    return json({ ok: false, message: "insert_failed" }, 500, corsHeaders);
  }

  return json({ ok: true, already: false }, 200, corsHeaders);
});

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function cleanText(value: unknown, maxLength: number) {
  if (!value) return "";
  return String(value).trim().slice(0, maxLength);
}

function normalizeRoleIntent(value: string) {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "negocio" || normalized === "negocio_interest") return "negocio";
  return "cliente";
}

function parseUuid(value: unknown): string | null {
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

function sanitizeUtm(value: unknown) {
  const utm = value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
  return {
    source: cleanText(utm.source, 120) || null,
    medium: cleanText(utm.medium, 120) || null,
    campaign: cleanText(utm.campaign, 160) || null,
    term: cleanText(utm.term, 160) || null,
    content: cleanText(utm.content, 160) || null,
  };
}

function normalizeOrigin(value: string | null) {
  if (!value) return null;
  const normalized = value.trim().toLowerCase().replace(/\/+$/, "");
  return normalized || null;
}

function parseOriginFromReferer(value: string | null) {
  if (!value) return null;
  try {
    return normalizeOrigin(new URL(value).origin);
  } catch {
    return null;
  }
}

function getOriginCandidates(req: Request) {
  const origin = normalizeOrigin(req.headers.get("origin"));
  const refererOrigin = parseOriginFromReferer(req.headers.get("referer"));
  const host = cleanText(req.headers.get("host"), 255);
  const proto = cleanText(req.headers.get("x-forwarded-proto"), 10) || "https";
  const hostOrigin = host ? normalizeOrigin(`${proto}://${host}`) : null;
  return [...new Set([origin, refererOrigin, hostOrigin].filter(Boolean))] as string[];
}

async function resolveTenantId(req: Request, tenantHint: string) {
  const origins = getOriginCandidates(req);
  for (const origin of origins) {
    const { data } = await supabaseAdmin
      .from("tenant_origins")
      .select("tenant_id")
      .ilike("origin", origin)
      .limit(1)
      .maybeSingle();
    if (data?.tenant_id) return String(data.tenant_id);
  }

  const hint = cleanText(tenantHint, 120);
  if (hint) {
    const { data } = await supabaseAdmin
      .from("tenants")
      .select("id")
      .ilike("name", hint)
      .limit(1)
      .maybeSingle();
    if (data?.id) return String(data.id);
  }

  const { data } = await supabaseAdmin
    .from("tenants")
    .select("id")
    .eq("name", DEFAULT_TENANT_HINT)
    .limit(1)
    .maybeSingle();
  return data?.id ? String(data.id) : null;
}

function getClientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for") || "";
  const direct = forwarded.split(",")[0]?.trim();
  return (
    direct ||
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    ""
  ).trim();
}

async function sha256(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function buildIpRiskId(ip: string) {
  const daySalt = new Date().toISOString().slice(0, 10);
  return sha256(`${IP_RISK_PEPPER}|${daySalt}|${ip}`);
}

async function safeJson(req: Request) {
  try {
    return await req.json();
  } catch {
    return null;
  }
}

function isDuplicate(error: { code?: string; message?: string; details?: string }) {
  if (error.code === "23505") return true;
  const message = `${error.message || ""} ${error.details || ""}`.toLowerCase();
  return message.includes("duplicate") || message.includes("already exists");
}

function json(
  body: unknown,
  status = 200,
  headers: Record<string, string> = {},
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}
