import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  CATEGORY_LABELS,
  buildSupportMessage,
  corsHeaders,
  jsonResponse,
  safeTrim,
  supabaseAdmin,
} from "../_shared/support.ts";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_IP = 6;
const RATE_LIMIT_MAX_CONTACT = 3;
const ACTIVE_STATUSES = ["new", "assigned", "in_progress", "waiting_user", "queued"];
const ALLOWED_SEVERITIES = new Set(["s0", "s1", "s2", "s3"]);
const DEFAULT_APP_CHANNEL = "undetermined";
const UA_PEPPER = Deno.env.get("PRELAUNCH_UA_PEPPER") || "prelaunch_ua_pepper_v1";
const IP_RISK_PEPPER = Deno.env.get("PRELAUNCH_IP_RISK_PEPPER") || "prelaunch_ip_risk_pepper_v1";

function getClientIp(req: Request) {
  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
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

function normalizeWhatsapp(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 16) return null;
  return digits;
}

function normalizeEmail(value: string) {
  const normalized = value.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) return null;
  return normalized;
}

function parseUuid(value: unknown) {
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

function createTrackingToken() {
  return crypto.randomUUID().replace(/-/g, "");
}

async function issueTrackingToken(threadId: string) {
  const token = createTrackingToken();
  const tokenHash = await sha256(token);
  await supabaseAdmin
    .from("support_threads")
    .update({
      anon_tracking_token_hash: tokenHash,
      updated_at: new Date().toISOString(),
    })
    .eq("id", threadId);
  return token;
}

async function cancelAnonymousThread(threadId: string, reason: string) {
  const nowIso = new Date().toISOString();

  await supabaseAdmin
    .from("support_threads")
    .update({
      status: "cancelled",
      cancelled_at: nowIso,
      cancelled_by: null,
      updated_at: nowIso,
    })
    .eq("id", threadId)
    .in("status", ACTIVE_STATUSES);

  await supabaseAdmin.from("support_thread_events").insert({
    thread_id: threadId,
    event_type: "cancelled",
    actor_role: "anonymous",
    actor_id: null,
    details: { reason },
  });
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

  const body = await req.json().catch(() => ({}));
  const honeypot = safeTrim(body.honeypot, 120);
  if (honeypot) {
    return jsonResponse({ ok: true, spam: true }, 200, cors);
  }

  const requestedChannel = body.channel === "email" ? "email" : "whatsapp";
  const channel = requestedChannel;
  const summary = safeTrim(body.summary, 240);
  const rawContact = safeTrim(body.contact, 120);
  const category = Object.prototype.hasOwnProperty.call(CATEGORY_LABELS, body.category)
    ? body.category
    : "sugerencia";
  const severity = ALLOWED_SEVERITIES.has(body.severity) ? body.severity : "s2";
  const sourceRoute = safeTrim(body.source_route, 140) || null;
  const originSource = safeTrim(body.origin_source, 60) || "prelaunch";
  const appChannel = safeTrim(body.app_channel, 60) || DEFAULT_APP_CHANNEL;
  const anonId = parseUuid(body.anon_id);
  const visitSessionId = parseUuid(body.visit_session_id);
  const clientRequestId = safeTrim(body.client_request_id, 64) || null;
  const displayName = safeTrim(body.display_name, 80) || null;
  const errorOnActive = body.error_on_active === true;
  const replaceExisting = body.replace_existing === true;
  const contextInput =
    typeof body.context === "object" && body.context ? body.context : {};

  if (!summary) {
    return jsonResponse({ ok: false, error: "missing_summary" }, 400, cors);
  }
  if (!rawContact) {
    return jsonResponse({ ok: false, error: "missing_contact" }, 400, cors);
  }

  const contactValue = channel === "email"
    ? normalizeEmail(rawContact)
    : normalizeWhatsapp(rawContact);
  if (!contactValue) {
    return jsonResponse({ ok: false, error: "invalid_contact" }, 400, cors);
  }

  const ip = getClientIp(req);
  const ipRiskId = ip ? await buildIpRiskId(ip) : null;
  const uaRaw = req.headers.get("user-agent") || "";
  const uaHash = uaRaw ? await sha256(`${UA_PEPPER}|${uaRaw}`) : null;
  const contactHash = await sha256(`${channel}:${contactValue}`);
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();

  if (ipRiskId) {
    const { count: ipCount } = await supabaseAdmin
      .from("support_threads")
      .select("id", { count: "exact", head: true })
      .eq("request_origin", "anonymous")
      .gte("created_at", since)
      .contains("context", { ip_risk_id: ipRiskId });
    if ((ipCount || 0) >= RATE_LIMIT_MAX_IP) {
      return jsonResponse({ ok: false, error: "rate_limited" }, 429, cors);
    }
  }

  const profilePayload = {
    contact_channel: channel,
    contact_value: contactValue,
    display_name: displayName,
    meta: {
      last_origin_source: originSource,
      last_source_route: sourceRoute,
      last_app_channel: appChannel,
      contact_hash: contactHash,
    },
    last_seen_at: new Date().toISOString(),
  };

  const { data: anonProfile, error: profileErr } = await supabaseAdmin
    .from("anon_support_profiles")
    .upsert(profilePayload, {
      onConflict: "contact_channel,contact_value",
    })
    .select("id, public_id, contact_channel, contact_value, display_name")
    .single();

  if (profileErr || !anonProfile) {
    return jsonResponse({ ok: false, error: "anon_profile_failed" }, 500, cors);
  }

  const { count: recentContactCount } = await supabaseAdmin
    .from("support_threads")
    .select("id", { count: "exact", head: true })
    .eq("request_origin", "anonymous")
    .eq("anon_profile_id", anonProfile.id)
    .gte("created_at", since);
  if ((recentContactCount || 0) >= RATE_LIMIT_MAX_CONTACT) {
    return jsonResponse({ ok: false, error: "rate_limited" }, 429, cors);
  }

  if (clientRequestId) {
    const { data: existingByRequest } = await supabaseAdmin
      .from("support_threads")
      .select("id, public_id, status, wa_link, wa_message_text")
      .eq("request_origin", "anonymous")
      .eq("anon_profile_id", anonProfile.id)
      .eq("client_request_id", clientRequestId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (existingByRequest?.id) {
      const trackingToken = await issueTrackingToken(existingByRequest.id);
      return jsonResponse(
        {
          ok: true,
          reused: true,
          thread_public_id: existingByRequest.public_id,
          anon_public_id: anonProfile.public_id,
          status: existingByRequest.status,
          wa_link: existingByRequest.wa_link,
          wa_message_text: existingByRequest.wa_message_text,
          tracking_token: trackingToken,
        },
        200,
        cors,
      );
    }
  }

  const { data: activeThread } = await supabaseAdmin
    .from("support_threads")
    .select("id, public_id, status, wa_link, wa_message_text")
    .eq("request_origin", "anonymous")
    .eq("anon_profile_id", anonProfile.id)
    .in("status", ACTIVE_STATUSES)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (activeThread?.id) {
    if (errorOnActive && !replaceExisting) {
      const trackingToken = await issueTrackingToken(activeThread.id);
      return jsonResponse(
        {
          ok: false,
          error: "active_ticket_exists",
          thread_public_id: activeThread.public_id,
          anon_public_id: anonProfile.public_id,
          status: activeThread.status,
          tracking_token: trackingToken,
        },
        409,
        cors,
      );
    }

    if (replaceExisting) {
      await cancelAnonymousThread(activeThread.id, "replace_with_new");
    } else {
      const trackingToken = await issueTrackingToken(activeThread.id);
      return jsonResponse(
        {
          ok: true,
          reused: true,
          thread_public_id: activeThread.public_id,
          anon_public_id: anonProfile.public_id,
          status: activeThread.status,
          wa_link: activeThread.wa_link,
          wa_message_text: activeThread.wa_message_text,
          tracking_token: trackingToken,
        },
        200,
        cors,
      );
    }
  }

  const { data: activeAfterReplace } = await supabaseAdmin
    .from("support_threads")
    .select("id, public_id, status")
    .eq("request_origin", "anonymous")
    .eq("anon_profile_id", anonProfile.id)
    .in("status", ACTIVE_STATUSES)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (activeAfterReplace?.id) {
    const trackingToken = await issueTrackingToken(activeAfterReplace.id);
    return jsonResponse(
      {
        ok: false,
        error: "active_ticket_exists",
        thread_public_id: activeAfterReplace.public_id,
        anon_public_id: anonProfile.public_id,
        status: activeAfterReplace.status,
        tracking_token: trackingToken,
      },
      409,
      cors,
    );
  }

  const categoryLabel = CATEGORY_LABELS[category] ?? "Soporte";
  const context = {
    ...contextInput,
    source_route: sourceRoute,
    origin_source: originSource,
    app_channel: appChannel,
    contact_channel: channel,
    requested_channel: requestedChannel,
    ip_risk_id: ipRiskId,
    ua_hash: uaHash,
    contact_hash: contactHash,
    anon_id: anonId,
    visit_session_id: visitSessionId,
  };

  const trackingToken = createTrackingToken();
  const trackingTokenHash = await sha256(trackingToken);

  const { data: insertedThread, error: insertErr } = await supabaseAdmin
    .from("support_threads")
    .insert({
      user_id: null,
      user_public_id: anonProfile.public_id,
      category,
      severity,
      status: "new",
      summary,
      context,
      assigned_agent_id: null,
      assigned_agent_phone: null,
      created_by_user_id: null,
      created_by_agent_id: null,
      irregular: false,
      personal_queue: false,
      wa_message_text: null,
      wa_link: null,
      suggested_contact_name: displayName || anonProfile.public_id,
      suggested_tags: ["anonymous", category, severity, channel, requestedChannel, appChannel],
      resolution: null,
      root_cause: null,
      closed_at: null,
      client_request_id: clientRequestId,
      request_origin: "anonymous",
      anon_profile_id: anonProfile.id,
      origin_source: originSource,
      app_channel: appChannel,
      anon_id: anonId,
      visit_session_id: visitSessionId,
      ua_hash: uaHash,
      ip_risk_id: ipRiskId,
      is_anonymous: true,
      anon_tracking_token_hash: trackingTokenHash,
    })
    .select("id, public_id, status")
    .single();

  if (insertErr || !insertedThread) {
    return jsonResponse({ ok: false, error: "thread_create_failed" }, 500, cors);
  }

  const finalizedMessage = buildSupportMessage({
    userPublicId: anonProfile.public_id,
    threadPublicId: insertedThread.public_id,
    categoryLabel,
    summary,
    context: {
      ...context,
      contact: contactValue,
    },
  });

  // For anonymous flow we only expose wa_link once a real advisor is assigned.
  const waLink = null;
  const waMessageText = channel === "whatsapp" ? finalizedMessage : null;

  await supabaseAdmin
    .from("support_threads")
    .update({
      wa_message_text: waMessageText,
      wa_link: waLink,
      updated_at: new Date().toISOString(),
    })
    .eq("id", insertedThread.id);

  await supabaseAdmin.from("support_thread_events").insert({
    thread_id: insertedThread.id,
    event_type: "created",
    actor_role: "anonymous",
    actor_id: null,
    details: {
      origin_source: originSource,
      app_channel: appChannel,
      channel,
      requested_channel: requestedChannel,
      source_route: sourceRoute,
    },
  });

  return jsonResponse(
    {
      ok: true,
      reused: false,
      thread_public_id: insertedThread.public_id,
      anon_public_id: anonProfile.public_id,
      status: insertedThread.status,
      wa_link: waLink,
      wa_message_text: waMessageText,
      tracking_token: trackingToken,
      channel,
      requested_channel: requestedChannel,
    },
    200,
    cors,
  );
});
