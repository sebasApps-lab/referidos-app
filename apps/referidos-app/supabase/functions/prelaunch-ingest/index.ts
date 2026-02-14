import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  jsonResponse,
  parseUserAgentSummary,
  resolveTenantIdByHint,
  resolveTenantIdByOrigin,
  scrubUnknown,
  sha256Hex,
  supabaseAdmin,
} from "../_shared/observability.ts";

const DEFAULT_TENANT_HINT = "ReferidosAPP";
const DEFAULT_APP_CHANNEL = "prelaunch_web";
const RATE_LIMIT_IP_PER_MIN = 60;
const RATE_LIMIT_ANON_PER_MIN = 120;
const DEDUPE_WINDOW_MS = 10 * 1000;
const UA_PEPPER = Deno.env.get("PRELAUNCH_UA_PEPPER") || "prelaunch_ua_pepper_v1";
const IP_RISK_PEPPER = Deno.env.get("PRELAUNCH_IP_RISK_PEPPER") || "prelaunch_ip_risk_pepper_v1";

const ALLOWED_EVENT_TYPES = new Set([
  "page_view",
  "cta_toggle_role",
  "cta_waitlist_open",
  "waitlist_submit",
  "download_click",
  "support_ticket_created",
  "support_ticket_message",
]);

function safeTrim(value: unknown, max = 255) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
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

function getClientIp(req: Request) {
  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    ""
  ).trim();
}

function normalizeEventType(value: unknown) {
  const eventType = safeTrim(value, 80).toLowerCase();
  if (!ALLOWED_EVENT_TYPES.has(eventType)) return null;
  return eventType;
}

function sanitizeProps(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const scrubbed = scrubUnknown(value);
  if (!scrubbed || typeof scrubbed !== "object" || Array.isArray(scrubbed)) return {};
  return scrubbed as Record<string, unknown>;
}

function sanitizeUtm(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {
      source: null,
      medium: null,
      campaign: null,
      term: null,
      content: null,
    };
  }
  const obj = value as Record<string, unknown>;
  return {
    source: safeTrim(obj.source, 120) || null,
    medium: safeTrim(obj.medium, 120) || null,
    campaign: safeTrim(obj.campaign, 160) || null,
    term: safeTrim(obj.term, 160) || null,
    content: safeTrim(obj.content, 160) || null,
  };
}

async function buildIpRiskId(ip: string) {
  const daySalt = new Date().toISOString().slice(0, 10);
  return sha256Hex(`${IP_RISK_PEPPER}|${daySalt}|${ip}`);
}

serve(async (req) => {
  const cors = corsHeaders(req.headers.get("origin"));

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "method_not_allowed" }, 405, cors);
  }

  const body = await req.json().catch(() => ({}));
  const eventType = normalizeEventType(body?.event_type || body?.type);
  if (!eventType) {
    return jsonResponse({ ok: false, error: "invalid_event_type" }, 400, cors);
  }

  const anonId = parseUuid(body?.anon_id);
  if (!anonId) {
    return jsonResponse({ ok: false, error: "invalid_anon_id" }, 400, cors);
  }

  const visitSessionId = parseUuid(body?.visit_session_id);
  const appChannel = safeTrim(body?.app_channel, 60) || DEFAULT_APP_CHANNEL;
  const path = safeTrim(body?.path, 240) || "/";
  const props = sanitizeProps(body?.props);
  const utm = sanitizeUtm(body?.utm);
  const tenantHint = safeTrim(body?.tenant_hint, 120) || DEFAULT_TENANT_HINT;

  let tenantId = await resolveTenantIdByOrigin(req);
  if (!tenantId) tenantId = await resolveTenantIdByHint(tenantHint);
  if (!tenantId) {
    const { data: tenantByDefault } = await supabaseAdmin
      .from("tenants")
      .select("id")
      .eq("name", DEFAULT_TENANT_HINT)
      .limit(1)
      .maybeSingle();
    tenantId = tenantByDefault?.id ? String(tenantByDefault.id) : null;
  }

  if (!tenantId) {
    return jsonResponse({ ok: false, error: "tenant_not_found" }, 400, cors);
  }

  const nowIso = new Date().toISOString();
  const minuteAgoIso = new Date(Date.now() - 60 * 1000).toISOString();
  const dedupeAgoIso = new Date(Date.now() - DEDUPE_WINDOW_MS).toISOString();
  const ip = getClientIp(req);
  const ipRiskId = ip ? await buildIpRiskId(ip) : null;
  const userAgent = req.headers.get("user-agent") || "";
  const uaHash = userAgent ? await sha256Hex(`${UA_PEPPER}|${userAgent}`) : null;
  const uaSummary = parseUserAgentSummary(userAgent);

  if (ipRiskId) {
    const { count: ipCount } = await supabaseAdmin
      .from("prelaunch_events")
      .select("id", { count: "exact", head: true })
      .eq("tenant_id", tenantId)
      .eq("app_channel", appChannel)
      .eq("ip_risk_id", ipRiskId)
      .gte("event_at", minuteAgoIso);

    if ((ipCount || 0) >= RATE_LIMIT_IP_PER_MIN) {
      return jsonResponse({ ok: false, error: "rate_limited" }, 429, cors);
    }
  }

  const { count: anonCount } = await supabaseAdmin
    .from("prelaunch_events")
    .select("id", { count: "exact", head: true })
    .eq("tenant_id", tenantId)
    .eq("app_channel", appChannel)
    .eq("anon_id", anonId)
    .gte("event_at", minuteAgoIso);

  if ((anonCount || 0) >= RATE_LIMIT_ANON_PER_MIN) {
    return jsonResponse({ ok: false, error: "rate_limited" }, 429, cors);
  }

  if (eventType === "page_view") {
    let dedupeQuery = supabaseAdmin
      .from("prelaunch_events")
      .select("id", { count: "exact", head: true })
      .eq("tenant_id", tenantId)
      .eq("app_channel", appChannel)
      .eq("anon_id", anonId)
      .eq("event_type", eventType)
      .eq("path", path)
      .gte("event_at", dedupeAgoIso);

    if (visitSessionId) {
      dedupeQuery = dedupeQuery.eq("visit_session_id", visitSessionId);
    }

    const { count: duplicateCount } = await dedupeQuery;
    if ((duplicateCount || 0) > 0) {
      return jsonResponse({ ok: true, deduped: true }, 200, cors);
    }
  }

  const { data: existingVisitor } = await supabaseAdmin
    .from("prelaunch_visitors")
    .select("id, visit_count")
    .eq("tenant_id", tenantId)
    .eq("app_channel", appChannel)
    .eq("anon_id", anonId)
    .maybeSingle();

  if (existingVisitor?.id) {
    await supabaseAdmin
      .from("prelaunch_visitors")
      .update({
        last_seen_at: nowIso,
        visit_count: Number(existingVisitor.visit_count || 0) + 1,
        ua_hash: uaHash,
        ua_family: uaSummary.browser,
        os_family: uaSummary.os,
        ip_risk_id: ipRiskId,
        last_utm_source: utm.source,
        last_utm_campaign: utm.campaign,
        updated_at: nowIso,
      })
      .eq("id", existingVisitor.id);
  } else {
    await supabaseAdmin
      .from("prelaunch_visitors")
      .insert({
        tenant_id: tenantId,
        app_channel: appChannel,
        anon_id: anonId,
        first_seen_at: nowIso,
        last_seen_at: nowIso,
        visit_count: 1,
        ua_hash: uaHash,
        ua_family: uaSummary.browser,
        os_family: uaSummary.os,
        ip_risk_id: ipRiskId,
        last_utm_source: utm.source,
        last_utm_campaign: utm.campaign,
      });
  }

  const eventProps = {
    ...props,
    utm,
  };

  const { error: insertErr } = await supabaseAdmin
    .from("prelaunch_events")
    .insert({
      tenant_id: tenantId,
      app_channel: appChannel,
      anon_id: anonId,
      visit_session_id: visitSessionId,
      event_type: eventType,
      event_at: nowIso,
      path,
      props: eventProps,
      ua_hash: uaHash,
      ua_family: uaSummary.browser,
      os_family: uaSummary.os,
      ip_risk_id: ipRiskId,
    });

  if (insertErr) {
    return jsonResponse({ ok: false, error: "insert_failed" }, 500, cors);
  }

  return jsonResponse(
    {
      ok: true,
      event_type: eventType,
      tenant_id: tenantId,
      app_channel: appChannel,
    },
    200,
    cors,
  );
});
