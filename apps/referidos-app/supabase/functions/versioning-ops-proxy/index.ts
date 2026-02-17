import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
} from "../_shared/support.ts";

type JsonObject = Record<string, unknown>;

function asString(value: unknown, fallback = ""): string {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim();
  return normalized || fallback;
}

function asNumber(value: unknown, fallback = 0): number {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function asBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === "boolean") return value;
  return fallback;
}

function normalizeLimit(value: unknown, fallback = 50, min = 1, max = 200) {
  const parsed = asNumber(value, fallback);
  return Math.min(Math.max(parsed, min), max);
}

const opsUrl = asString(Deno.env.get("VERSIONING_OPS_URL"));
const opsSecretKey = asString(Deno.env.get("VERSIONING_OPS_SECRET_KEY"));
const proxySharedToken = asString(Deno.env.get("VERSIONING_PROXY_SHARED_TOKEN"));

function ensureOpsEnv() {
  if (!opsUrl || !opsSecretKey || !proxySharedToken) {
    return {
      ok: false,
      error: "missing_ops_env",
      detail:
        "Missing VERSIONING_OPS_URL/VERSIONING_OPS_SECRET_KEY/VERSIONING_PROXY_SHARED_TOKEN in runtime project.",
    };
  }
  return { ok: true };
}

const opsAdmin = createClient(opsUrl || "https://invalid.local", opsSecretKey || "invalid", {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function invokeOpsFunction(functionName: string, payload: JsonObject) {
  const url = `${opsUrl.replace(/\/+$/, "")}/functions/v1/${functionName}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: opsSecretKey,
      Authorization: `Bearer ${opsSecretKey}`,
      "x-versioning-proxy-token": proxySharedToken,
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  let parsed: JsonObject = {};
  try {
    parsed = text ? (JSON.parse(text) as JsonObject) : {};
  } catch {
    parsed = { raw: text };
  }

  if (!response.ok || parsed.ok === false) {
    return {
      ok: false,
      status: response.status,
      detail: asString(parsed.detail, asString(parsed.error, "ops_function_failed")),
      payload: parsed,
    };
  }

  return {
    ok: true,
    status: response.status,
    payload: parsed,
  };
}

async function handleAction(action: string, payload: JsonObject, actor: string) {
  switch (action) {
    case "fetch_versioning_catalog": {
      const [{ data: products, error: productsError }, { data: envs, error: envsError }] =
        await Promise.all([
          opsAdmin
            .from("version_products")
            .select("id, product_key, name, active, created_at")
            .order("name", { ascending: true }),
          opsAdmin
            .from("version_environments")
            .select("id, env_key, name, active, created_at")
            .order("env_key", { ascending: true }),
        ]);
      if (productsError) throw new Error(productsError.message);
      if (envsError) throw new Error(envsError.message);
      return { products: products || [], environments: envs || [] };
    }

    case "fetch_latest_releases": {
      const envKey = asString(payload.envKey);
      let query = opsAdmin
        .from("version_latest_releases")
        .select("*")
        .order("product_name", { ascending: true });
      if (envKey) query = query.eq("env_key", envKey);
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data || [];
    }

    case "fetch_releases_by_product_env": {
      const productKey = asString(payload.productKey);
      const envKey = asString(payload.envKey);
      if (!productKey) throw new Error("productKey requerido");

      let query = opsAdmin
        .from("version_releases_labeled")
        .select("*")
        .eq("product_key", productKey)
        .order("semver_major", { ascending: false })
        .order("semver_minor", { ascending: false })
        .order("semver_patch", { ascending: false })
        .order("created_at", { ascending: false });
      if (envKey) query = query.eq("env_key", envKey);
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data || [];
    }

    case "fetch_release_components": {
      const releaseId = asString(payload.releaseId);
      if (!releaseId) throw new Error("releaseId requerido");
      const { data, error } = await opsAdmin
        .from("version_release_components_labeled")
        .select("*")
        .eq("release_id", releaseId)
        .order("component_key", { ascending: true });
      if (error) throw new Error(error.message);
      return data || [];
    }

    case "fetch_release_snapshot": {
      const releaseId = asString(payload.releaseId);
      const productKey = asString(payload.productKey).toLowerCase();
      const envKey = asString(payload.envKey).toLowerCase();
      const semver = asString(payload.semver || payload.versionLabel);

      let releaseQuery = opsAdmin
        .from("version_releases_labeled")
        .select(
          [
            "id",
            "tenant_id",
            "product_key",
            "product_name",
            "env_key",
            "env_name",
            "semver_major",
            "semver_minor",
            "semver_patch",
            "prerelease_tag",
            "prerelease_no",
            "version_label",
            "status",
            "source_commit_sha",
            "created_at",
            "updated_at",
          ].join(", ")
        );

      if (releaseId) {
        releaseQuery = releaseQuery.eq("id", releaseId);
      } else {
        if (!productKey || !envKey) {
          throw new Error("productKey y envKey requeridos cuando no se envia releaseId");
        }
        releaseQuery = releaseQuery.eq("product_key", productKey).eq("env_key", envKey);
        if (semver) {
          releaseQuery = releaseQuery.eq("version_label", semver);
        } else {
          releaseQuery = releaseQuery
            .order("semver_major", { ascending: false })
            .order("semver_minor", { ascending: false })
            .order("semver_patch", { ascending: false })
            .order("prerelease_no", { ascending: false })
            .order("created_at", { ascending: false })
            .limit(1);
        }
      }

      const { data: releaseRows, error: releaseError } = await releaseQuery.limit(1);
      if (releaseError) throw new Error(releaseError.message);
      const release = Array.isArray(releaseRows) ? releaseRows[0] : null;
      if (!release) {
        throw new Error("release_not_found");
      }

      const { data: components, error: componentsError } = await opsAdmin
        .from("version_release_components_labeled")
        .select(
          [
            "release_id",
            "component_id",
            "component_key",
            "component_type",
            "component_name",
            "revision_id",
            "revision_no",
            "bump_level",
            "content_hash",
            "source_commit_sha",
            "source_branch",
            "revision_created_at",
          ].join(", ")
        )
        .eq("release_id", asString(release.id))
        .order("component_key", { ascending: true });

      if (componentsError) throw new Error(componentsError.message);
      const componentRows = components || [];
      const componentIds = Array.from(
        new Set(
          componentRows
            .map((row) => asString((row as JsonObject).component_id))
            .filter(Boolean)
        )
      );

      const pathGlobsByComponent = new Map<string, string[]>();
      if (componentIds.length > 0) {
        const { data: pathRows, error: pathError } = await opsAdmin
          .from("version_component_paths")
          .select("component_id, path_glob, include")
          .in("component_id", componentIds)
          .eq("include", true);
        if (pathError) throw new Error(pathError.message);
        for (const row of pathRows || []) {
          const componentId = asString((row as JsonObject).component_id);
          const pathGlob = asString((row as JsonObject).path_glob);
          if (!componentId || !pathGlob) continue;
          const list = pathGlobsByComponent.get(componentId) || [];
          list.push(pathGlob);
          pathGlobsByComponent.set(componentId, list);
        }
      }

      return {
        release,
        components: componentRows.map((row) => {
          const componentId = asString((row as JsonObject).component_id);
          return {
            ...row,
            path_globs: pathGlobsByComponent.get(componentId) || [],
          };
        }),
      };
    }

    case "fetch_component_history": {
      const componentId = asString(payload.componentId);
      const limit = normalizeLimit(payload.limit, 50, 1, 200);
      if (!componentId) throw new Error("componentId requerido");
      const { data, error } = await opsAdmin
        .from("version_component_revisions")
        .select("id, revision_no, content_hash, source_commit_sha, source_branch, bump_level, created_at")
        .eq("component_id", componentId)
        .order("revision_no", { ascending: false })
        .limit(limit);
      if (error) throw new Error(error.message);
      return data || [];
    }

    case "fetch_drift": {
      const productKey = asString(payload.productKey);
      const envA = asString(payload.envA, "staging");
      const envB = asString(payload.envB, "prod");
      if (!productKey) throw new Error("productKey requerido");
      const { data, error } = await opsAdmin.rpc("versioning_get_drift", {
        p_product_key: productKey,
        p_env_a: envA,
        p_env_b: envB,
      });
      if (error) throw new Error(error.message);
      return data || [];
    }

    case "promote_release": {
      const productKey = asString(payload.productKey);
      const fromEnv = asString(payload.fromEnv);
      const toEnv = asString(payload.toEnv);
      const semver = asString(payload.semver);
      const notes = asString(payload.notes);
      const { data, error } = await opsAdmin.rpc("versioning_promote_release", {
        p_product_key: productKey,
        p_from_env: fromEnv,
        p_to_env: toEnv,
        p_semver: semver,
        p_actor: asString(payload.actor, actor),
        p_notes: notes || null,
      });
      if (error) throw new Error(error.message);
      return data || null;
    }

    case "fetch_promotion_history": {
      const productId = asString(payload.productId);
      const limit = normalizeLimit(payload.limit, 50, 1, 200);

      let query = opsAdmin
        .from("version_promotions")
        .select("id, product_id, from_release_id, to_release_id, promoted_by, notes, created_at")
        .order("created_at", { ascending: false })
        .limit(limit);
      if (productId) query = query.eq("product_id", productId);

      const { data: promotions, error: promotionsError } = await query;
      if (promotionsError) throw new Error(promotionsError.message);

      const rows = promotions || [];
      const releaseIds = Array.from(
        new Set(
          rows
            .flatMap((row) => [row.from_release_id, row.to_release_id])
            .filter(Boolean)
        )
      );

      const releasesById = new Map<string, JsonObject>();
      if (releaseIds.length > 0) {
        const { data: releases, error: releasesError } = await opsAdmin
          .from("version_releases_labeled")
          .select("id, product_key, env_key, version_label")
          .in("id", releaseIds);
        if (releasesError) throw new Error(releasesError.message);
        for (const release of releases || []) {
          releasesById.set(asString(release.id), release as JsonObject);
        }
      }

      return rows.map((row) => {
        const fromRelease = releasesById.get(asString(row.from_release_id)) || null;
        const toRelease = releasesById.get(asString(row.to_release_id)) || null;
        return {
          ...row,
          product_key: asString(toRelease?.product_key, asString(fromRelease?.product_key)) || null,
          from_env_key: asString(fromRelease?.env_key) || null,
          from_version_label: asString(fromRelease?.version_label) || null,
          to_env_key: asString(toRelease?.env_key) || null,
          to_version_label: asString(toRelease?.version_label) || null,
        };
      });
    }

    case "fetch_deploy_requests": {
      const envKey = asString(payload.envKey);
      const status = asString(payload.status);
      const productKey = asString(payload.productKey);

      let query = opsAdmin
        .from("version_deploy_requests_labeled")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (envKey) query = query.eq("env_key", envKey);
      if (status) query = query.eq("status", status);
      if (productKey) query = query.eq("product_key", productKey);

      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data || [];
    }

    case "request_deploy": {
      const productKey = asString(payload.productKey);
      const normalizedEnv = asString(payload.envKey).toLowerCase();
      const semver = asString(payload.semver);
      const notes = asString(payload.notes);
      const metadata =
        payload.metadata && typeof payload.metadata === "object"
          ? (payload.metadata as JsonObject)
          : {};

      if (!["staging", "prod"].includes(normalizedEnv)) {
        throw new Error("Deploy solo permitido en staging o prod.");
      }

      const { data, error } = await opsAdmin.rpc("versioning_request_deploy", {
        p_product_key: productKey,
        p_env_key: normalizedEnv,
        p_semver: semver,
        p_actor: asString(payload.actor, actor),
        p_notes: notes || null,
        p_metadata: metadata,
      });
      if (error) throw new Error(error.message);
      return data || null;
    }

    case "approve_deploy_request": {
      const requestId = asString(payload.requestId);
      const notes = asString(payload.notes);
      const forceAdminOverride = asBoolean(payload.forceAdminOverride, false);

      const { data, error } = await opsAdmin.rpc("versioning_approve_deploy_request", {
        p_request_id: requestId,
        p_actor: asString(payload.actor, actor),
        p_force_admin_override: forceAdminOverride,
        p_notes: notes || null,
      });
      if (error) throw new Error(error.message);
      return data || null;
    }

    case "reject_deploy_request": {
      const requestId = asString(payload.requestId);
      const reason = asString(payload.reason);
      const { data, error } = await opsAdmin.rpc("versioning_reject_deploy_request", {
        p_request_id: requestId,
        p_actor: asString(payload.actor, actor),
        p_reason: reason || null,
      });
      if (error) throw new Error(error.message);
      return data || null;
    }

    case "execute_deploy_request": {
      const requestId = asString(payload.requestId);
      const status = asString(payload.status, "success");
      const deploymentId = asString(payload.deploymentId);
      const logsUrl = asString(payload.logsUrl);
      const metadata =
        payload.metadata && typeof payload.metadata === "object"
          ? (payload.metadata as JsonObject)
          : {};

      const { data, error } = await opsAdmin.rpc("versioning_execute_deploy_request", {
        p_request_id: requestId,
        p_actor: asString(payload.actor, actor),
        p_status: status,
        p_deployment_id: deploymentId || null,
        p_logs_url: logsUrl || null,
        p_metadata: metadata,
      });
      if (error) throw new Error(error.message);
      return data || null;
    }

    case "trigger_deploy_pipeline": {
      const requestId = asString(payload.requestId);
      if (!requestId) throw new Error("requestId requerido");

      const result = await invokeOpsFunction("versioning-deploy-execute", {
        request_id: requestId,
        force_admin_override: asBoolean(payload.forceAdminOverride, false),
        skip_merge: asBoolean(payload.skipMerge, false),
        sync_release: asBoolean(payload.syncRelease, false),
        sync_only: asBoolean(payload.syncOnly, false),
        source_branch: asString(payload.sourceBranch) || null,
        target_branch: asString(payload.targetBranch) || null,
        actor: asString(payload.actor, actor),
      });

      if (!result.ok) {
        const detail = asString(
          result.payload?.detail,
          asString(result.payload?.error, result.detail)
        );
        const pipelineError = new Error(detail || "No se pudo ejecutar deploy pipeline.");
        (pipelineError as Error & { code?: string; payload?: unknown }).code = asString(
          result.payload?.error,
          "deploy_pipeline_failed"
        );
        (pipelineError as Error & { code?: string; payload?: unknown }).payload = result.payload;
        throw pipelineError;
      }

      return result.payload;
    }

    case "create_dev_release": {
      const result = await invokeOpsFunction("versioning-dev-release-create", {
        product_key: asString(payload.productKey) || null,
        ref: asString(payload.ref, "dev"),
        actor: asString(payload.actor, actor),
      });

      if (!result.ok) {
        throw new Error(
          asString(result.payload?.detail, asString(result.payload?.error, "No se pudo crear release de development."))
        );
      }

      return result.payload;
    }

    default:
      throw new Error(`Accion no soportada: ${action}`);
  }
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

  const envCheck = ensureOpsEnv();
  if (!envCheck.ok) {
    return jsonResponse(envCheck, 500, cors);
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

  const body = (await req.json().catch(() => ({}))) as JsonObject;
  const action = asString(body.action).toLowerCase();
  const payload =
    body.payload && typeof body.payload === "object" ? (body.payload as JsonObject) : {};
  if (!action) {
    return jsonResponse({ ok: false, error: "missing_action" }, 400, cors);
  }

  try {
    const data = await handleAction(action, payload, `admin:${asString(usuario.id)}`);
    return jsonResponse({ ok: true, action, data }, 200, cors);
  } catch (error) {
    const detail = error instanceof Error ? error.message : "proxy_error";
    const code =
      typeof error === "object" && error !== null && "code" in error
        ? asString((error as Record<string, unknown>).code, "proxy_action_failed")
        : "proxy_action_failed";
    const payloadError =
      typeof error === "object" && error !== null && "payload" in error
        ? (error as Record<string, unknown>).payload
        : null;
    return jsonResponse(
      {
        ok: false,
        action,
        error: code,
        detail,
        payload: payloadError,
      },
      500,
      cors
    );
  }
});
