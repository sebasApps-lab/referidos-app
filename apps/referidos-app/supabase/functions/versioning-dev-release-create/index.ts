import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  supabaseAdmin,
} from "../_shared/support.ts";

function asString(value: unknown, fallback = ""): string {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim();
  return normalized || fallback;
}

function isValidProductKey(value: string) {
  return ["referidos_app", "prelaunch_web", "android_app"].includes(value);
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

  const body = await req.json().catch(() => ({}));
  const productKey = asString(body.product_key).toLowerCase();
  const requestedRef = asString(body.ref);

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

  const owner = asString(Deno.env.get("GITHUB_DEPLOY_OWNER"));
  const repo = asString(Deno.env.get("GITHUB_DEPLOY_REPO"));
  const tokenGithub = asString(Deno.env.get("GITHUB_DEPLOY_TOKEN"));
  const workflowId = asString(
    Deno.env.get("VERSIONING_DEV_RELEASE_WORKFLOW"),
    "versioning-release-dev.yml"
  );
  const defaultDevRef = asString(
    Deno.env.get("VERSIONING_DEV_RELEASE_REF"),
    asString(Deno.env.get("DEPLOY_BRANCH_DEV"), "dev")
  );

  if (!owner || !repo || !tokenGithub) {
    return jsonResponse(
      {
        ok: false,
        error: "missing_github_env",
        detail: "Missing GITHUB_DEPLOY_OWNER/GITHUB_DEPLOY_REPO/GITHUB_DEPLOY_TOKEN",
      },
      500,
      cors
    );
  }

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

  const payload = {
    ref,
    inputs: {
      product_filter: productKey || "",
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

  const tenantIdFromUser = asString(usuario?.tenant_id);
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
      actor: `admin:${usuario.id}`,
      action: "dispatch_dev_release",
      entity_type: "workflow",
      entity_id: workflowId,
      payload: {
        ref,
        product_key: productKey || null,
      },
    });
  }

  return jsonResponse(
    {
      ok: true,
      workflow: workflowId,
      ref,
      product_key: productKey || null,
      detail: "Workflow de release dev disparado correctamente.",
    },
    200,
    cors
  );
});
