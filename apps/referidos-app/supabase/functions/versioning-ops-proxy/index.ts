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

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isHtmlPayload(text: string) {
  const normalized = String(text || "").trim().toLowerCase();
  return normalized.startsWith("<!doctype html") || normalized.startsWith("<html");
}

function sanitizeOpsDetail(rawDetail: string, status: number) {
  const detail = String(rawDetail || "").trim();
  if (!detail) return status ? `OPS request failed (${status}).` : "OPS request failed.";
  if (isHtmlPayload(detail)) {
    return status
      ? `OPS host unavailable (${status}). Intenta nuevamente en unos segundos.`
      : "OPS host unavailable. Intenta nuevamente en unos segundos.";
  }
  if (detail.length > 500) {
    return `${detail.slice(0, 500)}...`;
  }
  return detail;
}

async function invokeOpsFunction(functionName: string, payload: JsonObject) {
  const url = `${opsUrl.replace(/\/+$/, "")}/functions/v1/${functionName}`;
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
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
        const rawDetail =
          asString(parsed.detail) ||
          asString(parsed.message) ||
          asString(parsed.error) ||
          asString(parsed.raw) ||
          "ops_function_failed";
        const safeDetail = sanitizeOpsDetail(rawDetail, response.status);
        const normalizedPayload: JsonObject = {
          ...parsed,
          detail: safeDetail,
        };

        const shouldRetry = [502, 503, 504].includes(response.status) && attempt < maxAttempts;
        if (shouldRetry) {
          await sleep(350 * attempt);
          continue;
        }

        return {
          ok: false,
          status: response.status,
          detail: safeDetail,
          payload: normalizedPayload,
        };
      }

      return {
        ok: true,
        status: response.status,
        payload: parsed,
      };
    } catch (error) {
      const detail = sanitizeOpsDetail(
        error instanceof Error ? error.message : "ops_request_exception",
        0
      );
      if (attempt < maxAttempts) {
        await sleep(350 * attempt);
        continue;
      }
      return {
        ok: false,
        status: 0,
        detail,
        payload: { detail },
      };
    }
  }

  return {
    ok: false,
    status: 0,
    detail: "OPS request failed.",
    payload: { detail: "OPS request failed." },
  };
}

async function handleAction(action: string, payload: JsonObject, actor: string) {
  switch (action) {
    case "fetch_versioning_catalog": {
      const [{ data: products, error: productsError }, { data: envs, error: envsError }] =
        await Promise.all([
          opsAdmin
            .from("version_products")
            .select("id, product_key, name, active, metadata, created_at")
            .order("name", { ascending: true }),
          opsAdmin
            .from("version_environments")
            .select("id, env_key, name, active, created_at")
            .order("env_key", { ascending: true }),
        ]);
      if (productsError) throw new Error(productsError.message);
      if (envsError) throw new Error(envsError.message);

      const productIds = Array.from(
        new Set((products || []).map((row) => asString((row as JsonObject).id)).filter(Boolean))
      );
      const componentCountByProduct = new Map<string, number>();
      if (productIds.length > 0) {
        const { data: componentRows, error: componentRowsError } = await opsAdmin
          .from("version_components")
          .select("product_id")
          .in("product_id", productIds);
        if (componentRowsError) throw new Error(componentRowsError.message);
        for (const row of componentRows || []) {
          const productId = asString((row as JsonObject).product_id);
          if (!productId) continue;
          componentCountByProduct.set(productId, (componentCountByProduct.get(productId) || 0) + 1);
        }
      }

      const enrichedProducts = (products || []).map((product) => {
        const productId = asString((product as JsonObject).id);
        const count = componentCountByProduct.get(productId) || 0;
        return {
          ...product,
          component_count: count,
          initialized: count > 0,
        };
      });

      return { products: enrichedProducts, environments: envs || [] };
    }

    case "fetch_latest_releases": {
      const envKey = asString(payload.envKey);
      let query = opsAdmin
        .from("version_releases_labeled")
        .select("*")
        .order("product_name", { ascending: true })
        .order("env_key", { ascending: true })
        .order("semver_major", { ascending: false })
        .order("semver_minor", { ascending: false })
        .order("semver_patch", { ascending: false })
        .order("created_at", { ascending: false });
      if (envKey) query = query.eq("env_key", envKey);
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      const rows = data || [];
      const latestByProductEnv = new Map<string, JsonObject>();
      for (const row of rows) {
        const productKey = asString((row as JsonObject).product_key);
        const rowEnvKey = asString((row as JsonObject).env_key);
        const key = `${productKey}::${rowEnvKey}`;
        if (!latestByProductEnv.has(key)) {
          latestByProductEnv.set(key, row as JsonObject);
        }
      }
      return Array.from(latestByProductEnv.values());
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
            "build_number",
            "channel",
            "pr_number",
            "tag_name",
            "release_notes_auto",
            "release_notes_final",
            "ci_run_id",
            "ci_run_number",
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

    case "fetch_component_catalog": {
      const productKey = asString(payload.productKey);
      if (!productKey) throw new Error("productKey requerido");

      const { data: productRow, error: productError } = await opsAdmin
        .from("version_products")
        .select("id, tenant_id")
        .eq("product_key", productKey)
        .limit(1)
        .maybeSingle();
      if (productError) throw new Error(productError.message);
      if (!productRow?.id) return [];

      const { data, error } = await opsAdmin
        .from("version_component_latest_revisions")
        .select(
          [
            "tenant_id",
            "component_id",
            "product_id",
            "component_key",
            "component_type",
            "display_name",
            "revision_id",
            "revision_no",
            "content_hash",
            "source_commit_sha",
            "source_branch",
            "bump_level",
            "created_at",
          ].join(", ")
        )
        .eq("tenant_id", asString((productRow as JsonObject).tenant_id))
        .eq("product_id", asString((productRow as JsonObject).id))
        .order("component_key", { ascending: true });
      if (error) throw new Error(error.message);

      return (data || []).map((row) => ({
        component_id: asString((row as JsonObject).component_id),
        component_key: asString((row as JsonObject).component_key),
        component_type: asString((row as JsonObject).component_type),
        component_name: asString((row as JsonObject).display_name),
        revision_id: asString((row as JsonObject).revision_id),
        revision_no: asNumber((row as JsonObject).revision_no, 0),
        bump_level: asString((row as JsonObject).bump_level),
        content_hash: asString((row as JsonObject).content_hash),
        source_commit_sha: asString((row as JsonObject).source_commit_sha),
        source_branch: asString((row as JsonObject).source_branch),
        revision_created_at: asString((row as JsonObject).created_at),
      }));
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
      if (error) {
        const message = String(error.message || "");
        if (message.includes("is not pending")) {
          const { data: requestRow, error: requestError } = await opsAdmin
            .from("version_deploy_requests_labeled")
            .select("id, status, approved_by, approved_at, executed_at, deployment_status, deployment_id")
            .eq("id", requestId)
            .maybeSingle();
          if (!requestError && requestRow) {
            return {
              ...requestRow,
              already_processed: true,
            };
          }
        }
        throw new Error(message);
      }
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

    case "sync_release_branch": {
      const productKey = asString(payload.productKey);
      const toEnv = asString(payload.toEnv).toLowerCase();
      const semver = asString(payload.semver);
      if (!productKey || !toEnv || !semver) {
        throw new Error("productKey, toEnv y semver requeridos.");
      }

      const result = await invokeOpsFunction("versioning-release-sync", {
        operation: asString(payload.operation) || null,
        product_key: productKey,
        from_env: asString(payload.fromEnv) || null,
        to_env: toEnv,
        semver,
        source_branch: asString(payload.sourceBranch) || null,
        target_branch: asString(payload.targetBranch) || null,
        check_only: asBoolean(payload.checkOnly, false),
        auto_merge: asBoolean(payload.autoMerge, !asBoolean(payload.checkOnly, false)),
        create_pr: asBoolean(payload.createPr, true),
        pull_number: asNumber(payload.pullNumber, 0) || null,
        comment_body: asString(payload.commentBody) || null,
        actor: asString(payload.actor, actor),
      });

      if (!result.ok) {
        const detail = asString(
          result.payload?.detail,
          asString(result.payload?.error, result.detail)
        );
        const syncError = new Error(detail || "No se pudo sincronizar release a rama destino.");
        (syncError as Error & { code?: string; payload?: unknown }).code = asString(
          result.payload?.error,
          "release_sync_failed"
        );
        (syncError as Error & { code?: string; payload?: unknown }).payload = result.payload;
        throw syncError;
      }

      return result.payload;
    }

    case "fetch_workflow_pack_status": {
      const result = await invokeOpsFunction("versioning-release-sync", {
        operation: "workflow_pack_status",
        source_ref: asString(payload.sourceRef || payload.source_ref) || null,
        actor: asString(payload.actor, actor),
      });

      if (!result.ok) {
        const detail = asString(
          result.payload?.detail,
          asString(result.payload?.error, result.detail)
        );
        const statusError = new Error(detail || "No se pudo cargar estado de workflow pack.");
        (statusError as Error & { code?: string; payload?: unknown }).code = asString(
          result.payload?.error,
          "workflow_pack_status_failed"
        );
        (statusError as Error & { code?: string; payload?: unknown }).payload = result.payload;
        throw statusError;
      }

      return result.payload;
    }

    case "sync_workflow_pack": {
      const result = await invokeOpsFunction("versioning-release-sync", {
        operation: "workflow_pack_sync",
        source_ref: asString(payload.sourceRef || payload.source_ref) || null,
        sync_staging: asBoolean(payload.syncStaging ?? payload.sync_staging, true),
        sync_prod: asBoolean(payload.syncProd ?? payload.sync_prod, true),
        actor: asString(payload.actor, actor),
      });

      if (!result.ok) {
        const detail = asString(
          result.payload?.detail,
          asString(result.payload?.error, result.detail)
        );
        const syncError = new Error(detail || "No se pudo sincronizar workflow pack.");
        (syncError as Error & { code?: string; payload?: unknown }).code = asString(
          result.payload?.error,
          "workflow_pack_sync_failed"
        );
        (syncError as Error & { code?: string; payload?: unknown }).payload = result.payload;
        throw syncError;
      }

      return result.payload;
    }

    case "create_dev_release": {
      const result = await invokeOpsFunction("versioning-dev-release-create", {
        operation: "dispatch",
        mode: "release",
        product_key: asString(payload.productKey) || null,
        ref: asString(payload.ref, "dev"),
        override_semver: asString(payload.overrideSemver) || null,
        release_notes: asString(payload.releaseNotes) || null,
        actor: asString(payload.actor, actor),
      });

      if (!result.ok) {
        throw new Error(
          asString(result.payload?.detail, asString(result.payload?.error, "No se pudo crear release de development."))
        );
      }

      return result.payload;
    }

    case "backfill_release_artifact": {
      const releaseId = asString(payload.releaseId || payload.release_id);
      if (!releaseId) {
        throw new Error("releaseId requerido");
      }

      const result = await invokeOpsFunction("versioning-dev-release-create", {
        operation: "dispatch",
        mode: "backfill_artifact",
        release_id: releaseId,
        product_key: asString(payload.productKey || payload.product_key) || null,
        ref: asString(payload.ref, "dev"),
        source_commit_sha: asString(payload.sourceCommitSha || payload.source_commit_sha) || null,
        release_notes: asString(payload.releaseNotes || payload.release_notes) || null,
        actor: asString(payload.actor, actor),
      });

      if (!result.ok) {
        throw new Error(
          asString(
            result.payload?.detail,
            asString(result.payload?.error, "No se pudo ejecutar backfill de build.")
          )
        );
      }

      return result.payload;
    }

    case "dev_release_status": {
      const result = await invokeOpsFunction("versioning-dev-release-create", {
        operation: "status",
        product_key: asString(payload.productKey) || null,
        ref: asString(payload.ref, "dev"),
        run_id: asNumber(payload.runId, 0) || null,
        dispatch_started_at: asString(payload.dispatchStartedAt) || null,
        actor: asString(payload.actor, actor),
      });

      if (!result.ok) {
        throw new Error(
          asString(
            result.payload?.detail,
            asString(result.payload?.error, "No se pudo consultar estado del release de development.")
          )
        );
      }

      return result.payload;
    }

    case "preview_dev_release": {
      const result = await invokeOpsFunction("versioning-dev-release-preview", {
        product_key: asString(payload.productKey) || null,
        ref: asString(payload.ref, "dev"),
        actor: asString(payload.actor, actor),
      });

      if (!result.ok) {
        throw new Error(
          asString(
            result.payload?.detail,
            asString(result.payload?.error, "No se pudo calcular preview de release de development.")
          )
        );
      }

      return result.payload;
    }

    case "check_release_migrations": {
      const productKey = asString(payload.productKey || payload.product_key).toLowerCase();
      const envKey = asString(payload.envKey || payload.env_key || payload.toEnv || payload.to_env)
        .toLowerCase();
      const semver = asString(payload.semver);
      if (!productKey || !envKey || !semver) {
        throw new Error("productKey/envKey/semver requeridos para check_release_migrations.");
      }

      const result = await invokeOpsFunction("versioning-release-gate", {
        operation: "check_release_migrations",
        product_key: productKey,
        to_env: envKey,
        semver,
        actor: asString(payload.actor, actor),
      });

      if (!result.ok) {
        const detail = asString(
          result.payload?.detail,
          asString(result.payload?.error, result.detail)
        );
        const gateError = new Error(detail || "No se pudo validar gate de migraciones.");
        (gateError as Error & { code?: string; payload?: unknown }).code = asString(
          result.payload?.error,
          "check_release_migrations_failed"
        );
        (gateError as Error & { code?: string; payload?: unknown }).payload = result.payload;
        throw gateError;
      }

      return result.payload;
    }

    case "apply_release_migrations": {
      const productKey = asString(payload.productKey || payload.product_key).toLowerCase();
      const envKey = asString(payload.envKey || payload.env_key || payload.toEnv || payload.to_env)
        .toLowerCase();
      const semver = asString(payload.semver);
      if (!productKey || !envKey || !semver) {
        throw new Error("productKey/envKey/semver requeridos para apply_release_migrations.");
      }

      const result = await invokeOpsFunction("versioning-release-gate", {
        operation: "apply_release_migrations",
        product_key: productKey,
        to_env: envKey,
        semver,
        source_branch: asString(payload.sourceBranch || payload.source_branch) || null,
        target_branch: asString(payload.targetBranch || payload.target_branch) || null,
        actor: asString(payload.actor, actor),
      });

      if (!result.ok) {
        const detail = asString(
          result.payload?.detail,
          asString(result.payload?.error, result.detail)
        );
        const applyError = new Error(detail || "No se pudo disparar apply migrations.");
        (applyError as Error & { code?: string; payload?: unknown }).code = asString(
          result.payload?.error,
          "apply_release_migrations_failed"
        );
        (applyError as Error & { code?: string; payload?: unknown }).payload = result.payload;
        throw applyError;
      }

      return result.payload;
    }

    case "validate_environment": {
      const productKey = asString(payload.productKey || payload.product_key).toLowerCase();
      const envKey = asString(payload.envKey || payload.env_key || payload.toEnv || payload.to_env)
        .toLowerCase();
      if (!productKey || !envKey) {
        throw new Error("productKey/envKey requeridos para validate_environment.");
      }

      const result = await invokeOpsFunction("versioning-release-gate", {
        operation: "validate_environment",
        product_key: productKey,
        to_env: envKey,
        actor: asString(payload.actor, actor),
      });

      if (!result.ok) {
        const detail = asString(
          result.payload?.detail,
          asString(result.payload?.error, result.detail)
        );
        const validationError = new Error(detail || "No se pudo validar entorno.");
        (validationError as Error & { code?: string; payload?: unknown }).code = asString(
          result.payload?.error,
          "validate_environment_failed"
        );
        (validationError as Error & { code?: string; payload?: unknown }).payload = result.payload;
        throw validationError;
      }

      return result.payload;
    }

    case "fetch_release_artifacts": {
      const result = await invokeOpsFunction("versioning-artifact-sync", {
        operation: "list_release_artifacts",
        payload: {
          product_key: asString(payload.productKey || payload.product_key).toLowerCase() || null,
          limit: normalizeLimit(payload.limit, 120, 1, 400),
        },
      });

      if (!result.ok) {
        throw new Error(
          asString(
            result.payload?.detail,
            asString(
              result.payload?.message,
              asString(result.payload?.error, asString(result.detail, "No se pudo cargar catalogo de artefactos."))
            )
          )
        );
      }
      if (result.payload && typeof result.payload === "object" && "data" in result.payload) {
        return (result.payload as Record<string, unknown>).data;
      }
      return result.payload;
    }

    case "fetch_local_artifact_nodes": {
      const result = await invokeOpsFunction("versioning-artifact-sync", {
        operation: "list_local_nodes",
        payload: {
          only_active: asBoolean(payload.onlyActive, false),
          limit: normalizeLimit(payload.limit, 200, 1, 500),
        },
      });
      if (!result.ok) {
        throw new Error(
          asString(
            result.payload?.detail,
            asString(
              result.payload?.message,
              asString(result.payload?.error, asString(result.detail, "No se pudo cargar nodos locales."))
            )
          )
        );
      }
      if (result.payload && typeof result.payload === "object" && "data" in result.payload) {
        return (result.payload as Record<string, unknown>).data;
      }
      return result.payload;
    }

    case "upsert_local_artifact_node": {
      const result = await invokeOpsFunction("versioning-artifact-sync", {
        operation: "upsert_local_node",
        payload: {
          node_key: asString(payload.nodeKey || payload.node_key).toLowerCase(),
          display_name: asString(payload.displayName || payload.display_name),
          runner_label: asString(payload.runnerLabel || payload.runner_label),
          os_name: asString(payload.osName || payload.os_name),
          active: asBoolean(payload.active, true),
          metadata:
            payload.metadata && typeof payload.metadata === "object"
              ? (payload.metadata as JsonObject)
              : {},
        },
      });

      if (!result.ok) {
        throw new Error(
          asString(
            result.payload?.detail,
            asString(result.payload?.error, "No se pudo guardar nodo local.")
          )
        );
      }
      if (result.payload && typeof result.payload === "object" && "data" in result.payload) {
        return (result.payload as Record<string, unknown>).data;
      }
      return result.payload;
    }

    case "fetch_local_artifact_sync_requests": {
      const result = await invokeOpsFunction("versioning-artifact-sync", {
        operation: "list_local_sync_requests",
        payload: {
          product_key: asString(payload.productKey || payload.product_key).toLowerCase() || null,
          env_key: asString(payload.envKey || payload.env_key).toLowerCase() || null,
          status: asString(payload.status).toLowerCase() || null,
          node_key: asString(payload.nodeKey || payload.node_key).toLowerCase() || null,
          limit: normalizeLimit(payload.limit, 120, 1, 400),
        },
      });
      if (!result.ok) {
        throw new Error(
          asString(
            result.payload?.detail,
            asString(
              result.payload?.message,
              asString(
                result.payload?.error,
                asString(result.detail, "No se pudo cargar historial de sincronizacion local.")
              )
            )
          )
        );
      }
      if (result.payload && typeof result.payload === "object" && "data" in result.payload) {
        return (result.payload as Record<string, unknown>).data;
      }
      return result.payload;
    }

    case "request_local_artifact_sync": {
      const result = await invokeOpsFunction("versioning-artifact-sync", {
        operation: "request_local_sync",
        payload: {
          release_id: asString(payload.releaseId || payload.release_id) || null,
          product_key: asString(payload.productKey || payload.product_key).toLowerCase() || null,
          env_key: asString(payload.envKey || payload.env_key).toLowerCase() || null,
          semver: asString(payload.semver) || null,
          node_key: asString(payload.nodeKey || payload.node_key).toLowerCase(),
          notes: asString(payload.notes) || null,
          metadata:
            payload.metadata && typeof payload.metadata === "object"
              ? (payload.metadata as JsonObject)
              : {},
        },
      });
      if (!result.ok) {
        const detail = asString(
          result.payload?.detail,
          asString(
            result.payload?.message,
            asString(result.payload?.error, asString(result.detail, "No se pudo encolar sync local."))
          )
        );
        const syncError = new Error(detail);
        (syncError as Error & { code?: string; payload?: unknown }).code = asString(
          result.payload?.error,
          "request_local_artifact_sync_failed"
        );
        (syncError as Error & { code?: string; payload?: unknown }).payload = result.payload;
        throw syncError;
      }
      if (result.payload && typeof result.payload === "object" && "data" in result.payload) {
        return (result.payload as Record<string, unknown>).data;
      }
      return result.payload;
    }

    case "fetch_build_timeline": {
      const limit = normalizeLimit(payload.limit, 120, 1, 500);
      const productKey = asString(payload.productKey || payload.product_key).toLowerCase();
      const envKey = asString(payload.envKey || payload.env_key).toLowerCase();
      const semver = asString(payload.semver || payload.versionLabel || payload.version_label);
      const releaseId = asString(payload.releaseId || payload.release_id);
      const eventType = asString(payload.eventType || payload.event_type).toLowerCase();
      const status = asString(payload.status).toLowerCase();

      let query = opsAdmin
        .from("version_build_timeline_labeled")
        .select("*")
        .order("occurred_at", { ascending: false })
        .limit(limit);

      if (productKey) query = query.eq("product_key", productKey);
      if (envKey) query = query.eq("env_key", envKey);
      if (semver) query = query.eq("version_label", semver);
      if (releaseId) query = query.eq("release_id", releaseId);
      if (eventType) query = query.eq("event_type", eventType);
      if (status) query = query.eq("status", status);

      const { data, error } = await query;
      if (error) throw new Error(error.message || "No se pudo cargar timeline de builds.");
      return data || [];
    }

    case "fetch_env_config_versions": {
      const limit = normalizeLimit(payload.limit, 80, 1, 300);
      const productKey = asString(payload.productKey || payload.product_key).toLowerCase();
      const envKey = asString(payload.envKey || payload.env_key).toLowerCase();
      const semver = asString(payload.semver || payload.versionLabel || payload.version_label);
      const releaseId = asString(payload.releaseId || payload.release_id);
      const configKey = asString(payload.configKey || payload.config_key).toLowerCase();

      let query = opsAdmin
        .from("version_env_config_versions_labeled")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (productKey) query = query.eq("product_key", productKey);
      if (envKey) query = query.eq("env_key", envKey);
      if (semver) query = query.eq("version_label", semver);
      if (releaseId) query = query.eq("release_id", releaseId);
      if (configKey) query = query.eq("config_key", configKey);

      const { data, error } = await query;
      if (error) throw new Error(error.message || "No se pudo cargar versionado de configuracion.");
      return data || [];
    }

    case "cancel_local_artifact_sync": {
      const requestId = asString(payload.requestId || payload.request_id);
      if (!requestId) {
        throw new Error("requestId requerido para cancelar sync local.");
      }
      const result = await invokeOpsFunction("versioning-artifact-sync", {
        operation: "cancel_local_sync",
        payload: {
          request_id: requestId,
          error_detail: asString(payload.errorDetail || payload.error_detail) || "cancelled_by_user",
          metadata:
            payload.metadata && typeof payload.metadata === "object"
              ? (payload.metadata as JsonObject)
              : {},
        },
      });
      if (!result.ok) {
        const detail = asString(
          result.payload?.detail,
          asString(
            result.payload?.message,
            asString(result.payload?.error, asString(result.detail, "No se pudo cancelar sync local."))
          )
        );
        const cancelError = new Error(detail);
        (cancelError as Error & { code?: string; payload?: unknown }).code = asString(
          result.payload?.error,
          "cancel_local_artifact_sync_failed"
        );
        (cancelError as Error & { code?: string; payload?: unknown }).payload = result.payload;
        throw cancelError;
      }
      if (result.payload && typeof result.payload === "object" && "data" in result.payload) {
        return (result.payload as Record<string, unknown>).data;
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
