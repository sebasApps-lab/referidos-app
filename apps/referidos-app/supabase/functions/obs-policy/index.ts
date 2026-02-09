import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getOptionalAuthedUser,
  getUsuarioByAuthId,
  jsonResponse,
  resolveTenantIdByHint,
  resolveTenantIdByOrigin,
  supabaseAdmin,
} from "../_shared/observability.ts";

type PolicyRule = {
  id: string;
  priority: number;
  scope: string;
  match: Record<string, unknown>;
  action: Record<string, unknown>;
};

function safeString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

function toLower(value: unknown): string | null {
  const str = safeString(value);
  return str ? str.toLowerCase() : null;
}

function getInputContext(body: Record<string, unknown>) {
  const context = (body?.context && typeof body.context === "object")
    ? (body.context as Record<string, unknown>)
    : {};
  return {
    errorCode: toLower(body.error_code) || toLower(context.error_code),
    fingerprint: safeString(body.fingerprint) || safeString(context.fingerprint),
    route: safeString(body.route) || safeString(context.route),
    role: toLower(body.role) || toLower(context.role),
    appId: safeString(body.app_id) || safeString(context.app_id),
  };
}

function ruleMatches(rule: PolicyRule, input: ReturnType<typeof getInputContext>) {
  const match = rule.match || {};
  const ruleErrorCode = toLower(match.error_code);
  const ruleFingerprint = safeString(match.fingerprint);
  const ruleRoute = safeString(match.route);
  const ruleRole = toLower(match.role);
  const ruleAppId = safeString(match.app_id);

  if (ruleErrorCode && ruleErrorCode !== input.errorCode) return false;
  if (ruleFingerprint && ruleFingerprint !== input.fingerprint) return false;
  if (ruleRoute && ruleRoute !== input.route) return false;
  if (ruleRole && ruleRole !== input.role) return false;
  if (ruleAppId && ruleAppId !== input.appId) return false;
  return true;
}

function defaultPolicy(input: ReturnType<typeof getInputContext>) {
  const authoritative = new Set([
    "auth_unauthorized",
    "auth_token_invalid",
    "session_revoked",
    "session_unregistered",
  ]);
  const transient = new Set([
    "network_error",
    "edge_unavailable",
    "edge_timeout",
    "policy_unavailable",
    "session_lookup_failed",
  ]);

  if (input.errorCode && authoritative.has(input.errorCode)) {
    return {
      ui: {
        type: "modal",
        severity: "error",
        message_key: input.errorCode,
      },
      auth: {
        signOut: "local",
        authoritative: true,
      },
      retry: {
        allowed: false,
        backoff_ms: 0,
      },
      uam: {
        degrade_to: null,
        sensitive_only: true,
      },
    };
  }

  if (input.errorCode && transient.has(input.errorCode)) {
    return {
      ui: {
        type: "modal",
        severity: "warning",
        message_key: input.errorCode,
      },
      auth: {
        signOut: "none",
        authoritative: false,
      },
      retry: {
        allowed: true,
        backoff_ms: 800,
      },
      uam: {
        degrade_to: "reauth_sensitive",
        sensitive_only: true,
      },
    };
  }

  return {
    ui: {
      type: "none",
      severity: "info",
      message_key: null,
    },
    auth: {
      signOut: "none",
      authoritative: false,
    },
    retry: {
      allowed: false,
      backoff_ms: 0,
    },
    uam: {
      degrade_to: null,
      sensitive_only: true,
    },
  };
}

serve(async (req) => {
  const cors = corsHeaders(req.headers.get("origin"));

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (req.method !== "POST") {
    return jsonResponse(
      { ok: false, code: "method_not_allowed", message: "Method not allowed" },
      405,
      cors,
    );
  }

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const auth = await getOptionalAuthedUser(req);
  if (auth.authError) {
    return jsonResponse(
      { ok: false, code: auth.authError, message: "Invalid bearer token" },
      401,
      cors,
    );
  }

  let tenantId: string | null = null;
  if (auth.authUser?.id) {
    const profile = await getUsuarioByAuthId(auth.authUser.id);
    if (profile.error || !profile.usuario) {
      return jsonResponse(
        { ok: false, code: "profile_not_found", message: "Auth profile not found" },
        404,
        cors,
      );
    }
    tenantId = String((profile.usuario as Record<string, unknown>).tenant_id || "");
  }

  if (!tenantId) tenantId = await resolveTenantIdByOrigin(req);
  if (!tenantId) tenantId = await resolveTenantIdByHint(safeString(body.tenant_hint));
  if (!tenantId) {
    return jsonResponse(
      {
        ok: false,
        code: "tenant_resolution_failed",
        message: "Could not resolve tenant by origin or tenant_hint",
      },
      400,
      cors,
    );
  }

  const input = getInputContext(body);
  const { data, error } = await supabaseAdmin
    .from("obs_policy_rules")
    .select("id, priority, scope, match, action")
    .eq("tenant_id", tenantId)
    .eq("is_enabled", true)
    .order("priority", { ascending: false });

  if (error) {
    return jsonResponse(
      { ok: false, code: "policy_query_failed", message: "Could not query policy rules" },
      500,
      cors,
    );
  }

  const rules = Array.isArray(data) ? data as PolicyRule[] : [];
  const matched = rules.find((rule) => ruleMatches(rule, input)) || null;
  const action = matched?.action || defaultPolicy(input);

  return jsonResponse(
    {
      ok: true,
      tenant_id: tenantId,
      matched_rule_id: matched?.id || null,
      action,
    },
    200,
    cors,
  );
});
