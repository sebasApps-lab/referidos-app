import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { corsHeaders, jsonResponse, safeTrim, supabaseAdmin } from "../_shared/support.ts";

async function sha256(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function maskContact(channel: string | null, value: string | null) {
  if (!value) return null;
  if (channel === "email") {
    const local = value.split("@")[0] || "";
    const domain = value.split("@")[1] || "";
    if (!domain) return value;
    if (local.length <= 2) return `${"*".repeat(Math.max(local.length, 1))}@${domain}`;
    return `${local.slice(0, 1)}${"*".repeat(Math.max(local.length - 2, 1))}${local.slice(-1)}@${domain}`;
  }
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 4) return digits;
  return `${"*".repeat(Math.max(digits.length - 4, 1))}${digits.slice(-4)}`;
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
  const threadPublicId = safeTrim(body.thread_public_id, 32);
  const trackingToken = safeTrim(body.tracking_token, 128);

  if (!threadPublicId || !trackingToken) {
    return jsonResponse({ ok: false, error: "missing_params" }, 400, cors);
  }

  const { data: thread, error: threadErr } = await supabaseAdmin
    .from("support_threads")
    .select(
      "id, public_id, request_origin, status, category, severity, summary, resolution, created_at, updated_at, closed_at, wa_link, wa_message_text, origin_source, anon_tracking_token_hash, anon_profile:anon_support_profiles(public_id, display_name, contact_channel, contact_value)",
    )
    .eq("public_id", threadPublicId)
    .eq("request_origin", "anonymous")
    .maybeSingle();

  if (threadErr || !thread) {
    return jsonResponse({ ok: false, error: "thread_not_found" }, 404, cors);
  }

  const expectedHash = await sha256(trackingToken);
  if (!thread.anon_tracking_token_hash || thread.anon_tracking_token_hash !== expectedHash) {
    return jsonResponse({ ok: false, error: "forbidden" }, 403, cors);
  }

  return jsonResponse(
    {
      ok: true,
      thread: {
        public_id: thread.public_id,
        request_origin: thread.request_origin,
        status: thread.status,
        category: thread.category,
        severity: thread.severity,
        summary: thread.summary,
        resolution: thread.resolution,
        created_at: thread.created_at,
        updated_at: thread.updated_at,
        closed_at: thread.closed_at,
        wa_link: thread.wa_link,
        wa_message_text: thread.wa_message_text,
        origin_source: thread.origin_source,
        anon_profile: thread.anon_profile
          ? {
              public_id: thread.anon_profile.public_id,
              display_name: thread.anon_profile.display_name,
              contact_channel: thread.anon_profile.contact_channel,
              contact_masked: maskContact(
                thread.anon_profile.contact_channel,
                thread.anon_profile.contact_value,
              ),
            }
          : null,
      },
    },
    200,
    cors,
  );
});
