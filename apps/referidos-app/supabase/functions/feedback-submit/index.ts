import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  jsonResponse,
  resolveTenantIdByHint,
  resolveTenantIdByOrigin,
  scrubUnknown,
  supabaseAdmin,
} from "../_shared/observability.ts";
import {
  countIntakeGuardEvents,
  isoSince,
  isRecord,
  parseUuid,
  prepareIntakeGuard,
  recordIntakeGuardEvent,
  safeTrim,
} from "../../../../packages/intake-guard/src/index.js";
import {
  normalizeFeedbackEmail,
  normalizeFeedbackMessage,
  normalizeFeedbackName,
  normalizeFeedbackOriginRole,
} from "../../../../packages/feedback-sdk/src/shared.js";

const DEFAULT_TENANT_HINT = "ReferidosAPP";
const DEFAULT_APP_CHANNEL = "prelaunch_web";
const DEFAULT_SOURCE = "prelaunch";
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_IP = 8;
const RATE_LIMIT_MAX_CONTACT = 5;
const RATE_LIMIT_MAX_ANON = 10;
const DUPLICATE_WINDOW_MS = 72 * 60 * 60 * 1000;
const RATE_LIMIT_OUTCOMES = ["accepted", "duplicate"];

function sanitizeUtm(value: unknown) {
  const utm = isRecord(value) ? value : {};
  return {
    source: safeTrim(utm.source, 120) || null,
    medium: safeTrim(utm.medium, 120) || null,
    campaign: safeTrim(utm.campaign, 160) || null,
    term: safeTrim(utm.term, 160) || null,
    content: safeTrim(utm.content, 160) || null,
  };
}

function sanitizeContext(value: unknown) {
  if (!isRecord(value)) return {};
  const scrubbed = scrubUnknown(value);
  if (!isRecord(scrubbed)) return {};
  return scrubbed;
}

function feedbackResponse(status: string, row: { id: string; public_id: string }) {
  return {
    ok: true,
    status,
    feedback_id: row.id,
    feedback_public_id: row.public_id,
  };
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
  const tenantHint = safeTrim(body?.tenant_hint, 120) || DEFAULT_TENANT_HINT;
  const appChannel = safeTrim(body?.app_channel, 80) || DEFAULT_APP_CHANNEL;
  const originSource = safeTrim(body?.origin_source, 80) || DEFAULT_SOURCE;
  const sourceRoute = safeTrim(body?.source_route, 240) || "/feedback";
  const sourceSurface = safeTrim(body?.source_surface, 120) || "feedback_page";
  const originRole = normalizeFeedbackOriginRole(body?.origin_role ?? body?.origin);
  const anonId = parseUuid(body?.anon_id);
  const visitSessionId = parseUuid(body?.visit_session_id);
  const honeypot = safeTrim(body?.honeypot, 120);
  const name = normalizeFeedbackName(body?.name);
  const email = normalizeFeedbackEmail(body?.email);
  const message = normalizeFeedbackMessage(body?.message);
  const utm = sanitizeUtm(body?.utm);
  const context = sanitizeContext(body?.context);

  let tenantId = await resolveTenantIdByOrigin(req);
  if (!tenantId) tenantId = await resolveTenantIdByHint(tenantHint);
  if (!tenantId) {
    const { data } = await supabaseAdmin
      .from("tenants")
      .select("id")
      .eq("name", DEFAULT_TENANT_HINT)
      .limit(1)
      .maybeSingle();
    tenantId = data?.id ? String(data.id) : null;
  }

  if (!tenantId) {
    return jsonResponse({ ok: false, error: "tenant_not_found" }, 400, cors);
  }

  const guard = await prepareIntakeGuard({
    req,
    channel: email ? "email" : "anonymous",
    contactValue: email,
    message: message || "",
    fingerprintParts: [
      "feedback",
      tenantId,
      originRole,
      email || anonId || visitSessionId || "anon",
      message || "",
    ],
  });

  const recordGuard = (outcome: string, reason: string, meta: Record<string, unknown> = {}) =>
    recordIntakeGuardEvent(supabaseAdmin, {
      tenantId,
      systemKey: "feedback",
      actionKey: "submit",
      originRole,
      appChannel,
      sourceRoute,
      sourceSurface,
      anonId,
      visitSessionId,
      contactHash: guard.contactHash,
      messageHash: guard.messageHash,
      fingerprint: guard.fingerprint,
      ipRiskId: guard.ipRiskId,
      uaHash: guard.uaHash,
      outcome,
      reason,
      meta,
    });

  if (honeypot) {
    await recordGuard("blocked", "honeypot");
    return jsonResponse({ ok: true, status: "blocked", spam: true }, 200, cors);
  }

  if (!message) {
    return jsonResponse({ ok: false, error: "invalid_message" }, 400, cors);
  }

  if (body?.email && !email) {
    return jsonResponse({ ok: false, error: "invalid_email" }, 400, cors);
  }

  const sinceIso = isoSince(RATE_LIMIT_WINDOW_MS);

  if (guard.ipRiskId) {
    const { count } = await countIntakeGuardEvents(supabaseAdmin, {
      tenantId,
      systemKey: "feedback",
      actionKey: "submit",
      sinceIso,
      outcomes: RATE_LIMIT_OUTCOMES,
      ipRiskId: guard.ipRiskId,
    });
    if (count >= RATE_LIMIT_MAX_IP) {
      await recordGuard("rate_limited", "ip_window");
      return jsonResponse({ ok: false, error: "rate_limited" }, 429, cors);
    }
  }

  if (guard.contactHash) {
    const { count } = await countIntakeGuardEvents(supabaseAdmin, {
      tenantId,
      systemKey: "feedback",
      actionKey: "submit",
      sinceIso,
      outcomes: RATE_LIMIT_OUTCOMES,
      contactHash: guard.contactHash,
    });
    if (count >= RATE_LIMIT_MAX_CONTACT) {
      await recordGuard("rate_limited", "contact_window");
      return jsonResponse({ ok: false, error: "rate_limited" }, 429, cors);
    }
  }

  if (anonId) {
    const { count } = await countIntakeGuardEvents(supabaseAdmin, {
      tenantId,
      systemKey: "feedback",
      actionKey: "submit",
      sinceIso,
      outcomes: RATE_LIMIT_OUTCOMES,
      anonId,
    });
    if (count >= RATE_LIMIT_MAX_ANON) {
      await recordGuard("rate_limited", "anon_window");
      return jsonResponse({ ok: false, error: "rate_limited" }, 429, cors);
    }
  }

  const duplicateSince = isoSince(DUPLICATE_WINDOW_MS);
  const { data: existingDuplicate } = await supabaseAdmin
    .from("feedback_submissions")
    .select("id, public_id, repeat_count")
    .eq("tenant_id", tenantId)
    .eq("submission_fingerprint", guard.fingerprint)
    .gte("last_received_at", duplicateSince)
    .order("last_received_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const nowIso = new Date().toISOString();

  if (existingDuplicate?.id) {
    await supabaseAdmin
      .from("feedback_submissions")
      .update({
        app_channel: appChannel,
        source_route: sourceRoute,
        source_surface: sourceSurface,
        last_received_at: nowIso,
        repeat_count: Number(existingDuplicate.repeat_count || 1) + 1,
        ua_hash: guard.uaHash,
        ip_risk_id: guard.ipRiskId,
      })
      .eq("id", existingDuplicate.id);

    await supabaseAdmin.from("feedback_events").insert({
      feedback_id: existingDuplicate.id,
      event_type: "duplicate_detected",
      actor_role: "anonymous",
      actor_id: null,
      details: {
        source_route: sourceRoute,
        source_surface: sourceSurface,
        origin_source: originSource,
      },
    });

    await recordGuard("duplicate", "fingerprint_window", {
      feedback_id: existingDuplicate.id,
      feedback_public_id: existingDuplicate.public_id,
    });

    return jsonResponse(
      feedbackResponse("duplicate", existingDuplicate),
      200,
      cors,
    );
  }

  const insertPayload = {
    tenant_id: tenantId,
    app_channel: appChannel,
    origin_source: originSource,
    source_route: sourceRoute,
    source_surface: sourceSurface,
    origin_role: originRole,
    name,
    email,
    email_hash: guard.contactHash,
    message,
    message_hash: guard.messageHash,
    submission_fingerprint: guard.fingerprint,
    anon_id: anonId,
    visit_session_id: visitSessionId,
    utm,
    context,
    ua_hash: guard.uaHash,
    ip_risk_id: guard.ipRiskId,
    risk_score: 0,
    risk_flags: {},
    repeat_count: 1,
    first_received_at: nowIso,
    last_received_at: nowIso,
  };

  const { data: insertedFeedback, error: insertError } = await supabaseAdmin
    .from("feedback_submissions")
    .insert(insertPayload)
    .select("id, public_id")
    .single();

  if (insertError || !insertedFeedback) {
    await recordGuard("error", "insert_failed", {
      detail: insertError?.message || null,
    });
    return jsonResponse({ ok: false, error: "insert_failed" }, 500, cors);
  }

  await supabaseAdmin.from("feedback_events").insert({
    feedback_id: insertedFeedback.id,
    event_type: "created",
    actor_role: "anonymous",
    actor_id: null,
    details: {
      source_route: sourceRoute,
      source_surface: sourceSurface,
      origin_source: originSource,
    },
  });

  await recordGuard("accepted", "created", {
    feedback_id: insertedFeedback.id,
    feedback_public_id: insertedFeedback.public_id,
  });

  return jsonResponse(
    feedbackResponse("accepted", insertedFeedback),
    200,
    cors,
  );
});
