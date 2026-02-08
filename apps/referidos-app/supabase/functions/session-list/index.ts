import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  assertCurrentSessionRegisteredAndActive,
  corsHeaders,
  getAuthedUser,
  getSessionIdFromToken,
  json,
  supabaseAdmin,
} from "../_shared/session.ts";

type SessionRow = {
  id: string;
  session_id: string;
  device_id: string;
  label: string | null;
  platform: string;
  created_at: string;
  last_seen_at: string;
  revoked_at: string | null;
};

function titleFromPlatform(platform: string) {
  const normalized = (platform || "").toLowerCase();
  if (normalized.includes("ios") || normalized.includes("iphone")) {
    return "Movil iOS";
  }
  if (normalized.includes("android")) {
    return "Movil Android";
  }
  if (normalized.includes("pwa")) {
    return "PWA";
  }
  if (normalized.includes("web")) {
    return "Web";
  }
  return "Dispositivo";
}

serve(async (req) => {
  const cors = corsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (req.method !== "POST") {
    return json(
      { ok: false, code: "method_not_allowed", message: "Method not allowed" },
      405,
      cors,
    );
  }

  const auth = await getAuthedUser(req, cors);
  if (!auth.ok) return auth.response;

  const sessionId = getSessionIdFromToken(auth.token);
  if (!sessionId) {
    return json(
      {
        ok: false,
        code: "missing_session_id_claim",
        message: "Token is missing session_id claim",
      },
      400,
      cors,
    );
  }

  const sessionState = await assertCurrentSessionRegisteredAndActive(
    auth.user.id,
    sessionId,
    cors,
  );
  if (!sessionState.ok) return sessionState.response;

  // Best-effort heartbeat for current device activity.
  await supabaseAdmin
    .from("user_session_devices")
    .update({ last_seen_at: new Date().toISOString() })
    .eq("user_id", auth.user.id)
    .eq("session_id", sessionId)
    .is("revoked_at", null);

  const { data, error } = await supabaseAdmin
    .from("user_session_devices")
    .select(
      "id, session_id, device_id, label, platform, created_at, last_seen_at, revoked_at",
    )
    .eq("user_id", auth.user.id)
    .is("revoked_at", null)
    .order("last_seen_at", { ascending: false });

  if (error) {
    return json(
      {
        ok: false,
        code: "session_list_failed",
        message: "Could not list sessions",
      },
      500,
      cors,
    );
  }

  const sessions = (data as SessionRow[]).map((row) => ({
    id: row.id,
    session_id: row.session_id,
    device_id: row.device_id,
    device: row.label || titleFromPlatform(row.platform),
    platform: row.platform,
    location: "Ubicacion no disponible",
    created_at: row.created_at,
    last_seen_at: row.last_seen_at,
    revoked_at: row.revoked_at,
    current: row.session_id === sessionId,
  }));

  return json(
    {
      ok: true,
      current_session_id: sessionId,
      sessions,
    },
    200,
    cors,
  );
});
