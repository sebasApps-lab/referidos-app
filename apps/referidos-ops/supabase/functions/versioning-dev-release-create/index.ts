import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  supabaseAdmin,
} from "../_shared/support.ts";
import { getGithubAuthConfig } from "../_shared/github-auth.ts";

function asString(value: unknown, fallback = ""): string {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim();
  return normalized || fallback;
}

function isValidProductKey(value: string) {
  return ["referidos_app", "prelaunch_web", "android_app"].includes(value);
}

function isInternalProxyAuthorized(req: Request) {
  const expected = asString(Deno.env.get("VERSIONING_PROXY_SHARED_TOKEN"));
  if (!expected) return false;
  const received = asString(req.headers.get("x-versioning-proxy-token"));
  return Boolean(received) && received === expected;
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
  const internalProxyCall = isInternalProxyAuthorized(req);

  let actor = "admin:proxy";
  let tenantIdFromUser = "";
  if (!internalProxyCall) {
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
    if (usuario.role !== "admin") {
      return jsonResponse({ ok: false, error: "forbidden" }, 403, cors);
    }

    actor = `admin:${asString(usuario.id) || asString(user.id)}`;
    tenantIdFromUser = asString(usuario?.tenant_id);
  } else {
    actor = asString(body.actor, "admin:proxy");
    tenantIdFromUser = asString(body.tenant_id);
  }

  const productKey = asString(body.product_key).toLowerCase();
  const requestedRef = asString(body.ref);
  const overrideSemver = asString(body.override_semver);
  const releaseNotes = asString(body.release_notes);

  if (productKey && !isValidProductKey(productKey)) {
    return jsonResponse(
      {
        ok: false,
        error: "invalid_product_key",
        detail: "Valores permitidos: referidos_app | prelaunch_web | android_app",
      },
      400,
      cors
    );
  }

  const githubAuth = await getGithubAuthConfig();
  if (!githubAuth.ok) {
    return jsonResponse(
      {
        ok: false,
        error: githubAuth.data.error,
        detail: githubAuth.data.detail,
      },
      500,
      cors
    );
  }
  const owner = githubAuth.data.owner;
  const repo = githubAuth.data.repo;
  const tokenGithub = githubAuth.data.token;
  const workflowId = asString(
    Deno.env.get("VERSIONING_DEV_RELEASE_WORKFLOW"),
    "versioning-release-dev.yml"
  );
  const defaultDevRef = asString(
    Deno.env.get("VERSIONING_DEV_RELEASE_REF"),
    asString(Deno.env.get("DEPLOY_BRANCH_DEV"), "dev")
  );

  const allowRefsRaw = asString(
    Deno.env.get("VERSIONING_DEV_RELEASE_ALLOWED_REFS"),
    `${defaultDevRef},develop`
  );
  const allowRefs = new Set(
    allowRefsRaw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  );
  const ref = requestedRef || defaultDevRef;
  if (!allowRefs.has(ref)) {
    return jsonResponse(
      {
        ok: false,
        error: "invalid_ref",
        detail: `Ref no permitida. permitidas=${Array.from(allowRefs).join(", ")}`,
      },
      400,
      cors
    );
  }

  let releaseBaseRef = "";
  if (productKey) {
    const { data: latestRows, error: latestError } = await supabaseAdmin
      .from("version_releases_labeled")
      .select("source_commit_sha")
      .eq("product_key", productKey)
      .eq("env_key", "dev")
      .order("semver_major", { ascending: false })
      .order("semver_minor", { ascending: false })
      .order("semver_patch", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(1);
    if (latestError) {
      return jsonResponse(
        {
          ok: false,
          error: "load_latest_release_failed",
          detail: latestError.message,
        },
        500,
        cors
      );
    }
    releaseBaseRef = asString(latestRows?.[0]?.source_commit_sha);
  }

  const payload = {
    ref,
    inputs: {
      base_ref: releaseBaseRef || "",
      product_filter: productKey || "",
      override_semver: overrideSemver || "",
      release_notes: releaseNotes || "",
    },
  };

  const dispatchResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenGithub}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "referidos-versioning-edge",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!dispatchResponse.ok) {
    const raw = await dispatchResponse.text();
    let parsed: Record<string, unknown> = {};
    try {
      parsed = raw ? JSON.parse(raw) : {};
    } catch {
      parsed = { raw };
    }
    return jsonResponse(
      {
        ok: false,
        error: "github_workflow_dispatch_failed",
        status: dispatchResponse.status,
        detail: parsed.message || parsed.raw || "dispatch_failed",
      },
      502,
      cors
    );
  }

  let tenantId: string | null = tenantIdFromUser || null;
  if (!tenantId) {
    const { data: tenantRow } = await supabaseAdmin
      .from("tenants")
      .select("id")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    tenantId = tenantRow?.id || null;
  }

  if (tenantId) {
    await supabaseAdmin.from("version_audit_log").insert({
      tenant_id: tenantId,
      actor,
      action: "dispatch_dev_release",
      entity_type: "workflow",
      entity_id: workflowId,
      payload: {
        ref,
        base_ref: releaseBaseRef || null,
        product_key: productKey || null,
        override_semver: overrideSemver || null,
        release_notes: releaseNotes || null,
      },
    });
  }

  return jsonResponse(
    {
      ok: true,
      workflow: workflowId,
      ref,
      base_ref: releaseBaseRef || null,
      product_key: productKey || null,
      override_semver: overrideSemver || null,
      detail: "Workflow de release dev disparado correctamente.",
    },
    200,
    cors
  );
});
