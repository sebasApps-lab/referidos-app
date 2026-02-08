import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  assertCurrentSessionRegisteredAndActive,
  corsHeaders,
  getAuthedUser,
  getSessionIdFromToken,
  json,
  supabaseAdmin,
} from "../_shared/session.ts";

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

  const currentSessionId = getSessionIdFromToken(auth.token);
  if (!currentSessionId) {
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
    currentSessionId,
    cors,
  );
  if (!sessionState.ok) return sessionState.response;

  const { data, error } = await supabaseAdmin
    .from("user_session_devices")
    .update({ revoked_at: new Date().toISOString() })
    .eq("user_id", auth.user.id)
    .is("revoked_at", null)
    .select("id");

  if (error) {
    return json(
      {
        ok: false,
        code: "session_revoke_all_failed",
        message: "Could not revoke all sessions",
      },
      500,
      cors,
    );
  }

  // Supabase auth global signout invalidates refresh/access sessions server-side.
  // Some runtime versions can type this differently, so we keep it tolerant.
  // deno-lint-ignore no-explicit-any
  const adminApi = supabaseAdmin.auth.admin as any;
  let signOutError: string | null = null;
  if (typeof adminApi?.signOut === "function") {
    // Current SDK supports: signOut(jwt, scope)
    const { error: authError } = await adminApi.signOut(auth.token, "global");
    signOutError = authError?.message ?? null;
  }

  return json(
    {
      ok: true,
      revoked_count: Array.isArray(data) ? data.length : 0,
      current_session_revoked: true,
      auth_global_signout: !signOutError,
      auth_global_signout_error: signOutError,
    },
    200,
    cors,
  );
});
