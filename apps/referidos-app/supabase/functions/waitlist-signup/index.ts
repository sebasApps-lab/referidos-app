// supabase/functions/waitlist-signup/index.ts
// Waitlist signup for prelaunch/beta access.

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

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

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
    return json({ ok: false, message: "Method not allowed" }, 405, corsHeaders);
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

  const role = payload.role === "negocio_interest" ? "negocio_interest" : "cliente";
  const source = cleanText(payload.source, 80) || "landing";
  const consentVersion = cleanText(payload.consent_version, 40) || "privacy_v1";

  const ip = getClientIp(req);
  const ipHash = ip ? await sha256(ip) : null;
  const userAgent = cleanText(req.headers.get("user-agent"), 200);

  if (ipHash) {
    const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    const { count, error } = await supabaseAdmin
      .from("waitlist_signups")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", since);

    if (!error && (count ?? 0) >= RATE_LIMIT_MAX) {
      return json({ ok: false, message: "rate_limited" }, 429, corsHeaders);
    }
  }

  const { error } = await supabaseAdmin
    .from("waitlist_signups")
    .insert({
      email,
      role,
      source,
      consent_version: consentVersion,
      ip_hash: ipHash,
      user_agent: userAgent,
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
