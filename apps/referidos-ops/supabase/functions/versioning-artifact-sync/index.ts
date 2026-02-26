import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  supabaseAdmin,
} from "../_shared/support.ts";
import { getGithubAuthConfig } from "../_shared/github-auth.ts";

type JsonObject = Record<string, unknown>;

const INTERNAL_PROXY_HEADER = "x-versioning-proxy-token";
const LOCAL_SYNC_HEADER = "x-versioning-local-sync-token";
const DEFAULT_ARTIFACTS_BUCKET = "versioning-artifacts";

function asString(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim();
  return normalized || fallback;
}

function asNumber(value: unknown, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function asBoolean(value: unknown, fallback = false) {
  if (typeof value === "boolean") return value;
  return fallback;
}

function asObject(value: unknown): JsonObject {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as JsonObject;
  }
  return {};
}

function normalizeLimit(value: unknown, fallback = 50, min = 1, max = 200) {
  const parsed = asNumber(value, fallback);
  return Math.min(Math.max(parsed, min), max);
}

function envVarKey(input: string): string {
  return input.replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "").toUpperCase();
}

function normalizeSignedUrl(rawUrl: string) {
  const trimmed = asString(rawUrl);
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  const base = asString(Deno.env.get("SUPABASE_URL"));
  if (!base) return trimmed;

  const normalizedBase = base.replace(/\/+$/, "");
  if (trimmed.startsWith("/storage/")) return `${normalizedBase}${trimmed}`;
  if (trimmed.startsWith("/object/")) return `${normalizedBase}/storage/v1${trimmed}`;
  return `${normalizedBase}/storage/v1/${trimmed.replace(/^\/+/, "")}`;
}

function isInternalProxyAuthorized(req: Request) {
  const expected = asString(Deno.env.get("VERSIONING_PROXY_SHARED_TOKEN"));
  if (!expected) return false;
  const received = asString(req.headers.get(INTERNAL_PROXY_HEADER));
  return Boolean(received) && received === expected;
}

function isLocalSyncTokenAuthorized(req: Request) {
  const expected = asString(Deno.env.get("VERSIONING_LOCAL_SYNC_TOKEN"));
  if (!expected) return false;
  const received = asString(req.headers.get(LOCAL_SYNC_HEADER));
  return Boolean(received) && received === expected;
}

function corsWithCustomHeaders(origin: string | null) {
  const base = corsHeaders(origin);
  const current = base["Access-Control-Allow-Headers"] || "";
  return {
    ...base,
    "Access-Control-Allow-Headers": `${current}, ${INTERNAL_PROXY_HEADER}, ${LOCAL_SYNC_HEADER}`,
  };
}

async function resolveTenantId(tenantHint = "") {
  const trimmed = asString(tenantHint);
  if (trimmed) {
    const { data } = await supabaseAdmin
      .from("tenants")
      .select("id")
      .eq("id", trimmed)
      .limit(1)
      .maybeSingle<{ id: string }>();
    if (data?.id) return data.id;
  }

  const { data } = await supabaseAdmin
    .from("tenants")
    .select("id")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle<{ id: string }>();

  return asString(data?.id);
}

async function resolveReleaseId({
  releaseId,
  productKey,
  envKey,
  semver,
}: {
  releaseId: string;
  productKey: string;
  envKey: string;
  semver: string;
}) {
  if (releaseId) return releaseId;
  if (!productKey || !envKey || !semver) {
    throw new Error("release_id or product_key/env_key/semver are required");
  }

  const { data, error } = await supabaseAdmin
    .from("version_releases_labeled")
    .select("id")
    .eq("product_key", productKey)
    .eq("env_key", envKey)
    .eq("version_label", semver)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<{ id: string }>();

  if (error || !data?.id) {
    throw new Error(error?.message || "release_not_found");
  }

  return data.id;
}

async function fetchReleaseArtifactByReleaseId(releaseId: string) {
  const { data, error } = await supabaseAdmin
    .from("version_release_artifacts_labeled")
    .select("*")
    .eq("release_id", releaseId)
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    throw new Error(error?.message || "release_artifact_not_found");
  }
  return data as JsonObject;
}

async function fetchNodeByKey({ tenantId, nodeKey }: { tenantId: string; nodeKey: string }) {
  const { data, error } = await supabaseAdmin
    .from("version_local_nodes")
    .select("*")
    .eq("tenant_id", tenantId)
    .eq("node_key", nodeKey)
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    throw new Error(error?.message || "local_node_not_found");
  }

  return data as JsonObject;
}

async function createStorageSignedUrl({
  bucket,
  artifactPath,
}: {
  bucket: string;
  artifactPath: string;
}) {
  const { data, error } = await supabaseAdmin.storage.from(bucket).createSignedUrl(artifactPath, 60 * 60);
  if (error) {
    throw new Error(error.message || "artifact_signed_url_failed");
  }
  const signedUrl = normalizeSignedUrl(asString(data?.signedUrl));
  if (!signedUrl) {
    throw new Error("artifact_signed_url_missing");
  }
  return signedUrl;
}

async function dispatchGithubWorkflow({
  owner,
  repo,
  token,
  workflowId,
  workflowRef,
  inputs,
}: {
  owner: string;
  repo: string;
  token: string;
  workflowId: string;
  workflowRef: string;
  inputs: Record<string, string>;
}) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "referidos-versioning-artifact-sync",
      },
      body: JSON.stringify({
        ref: workflowRef,
        inputs,
      }),
    }
  );

  const text = await response.text();
  let parsed: JsonObject = {};
  try {
    parsed = text ? (JSON.parse(text) as JsonObject) : {};
  } catch {
    parsed = { raw: text };
  }

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      detail: asString(parsed.message, "github_workflow_dispatch_failed"),
      payload: parsed,
    };
  }

  return {
    ok: true,
    status: response.status,
    detail: "workflow_dispatched",
    payload: parsed,
  };
}

async function updateLocalSyncRequest({
  requestId,
  actor,
  status,
  workflowRunId,
  workflowRunUrl,
  localPath,
  errorDetail,
  metadata,
}: {
  requestId: string;
  actor: string;
  status: string;
  workflowRunId?: number | null;
  workflowRunUrl?: string | null;
  localPath?: string | null;
  errorDetail?: string | null;
  metadata?: JsonObject;
}) {
  const { data, error } = await supabaseAdmin.rpc("versioning_update_local_sync_request", {
    p_request_id: requestId,
    p_actor: actor,
    p_status: status,
    p_workflow_run_id: workflowRunId || null,
    p_workflow_run_url: workflowRunUrl || null,
    p_local_path: localPath || null,
    p_error_detail: errorDetail || null,
    p_metadata: metadata || {},
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function fetchSyncRequestRow(requestId: string) {
  const { data, error } = await supabaseAdmin
    .from("version_local_sync_requests_labeled")
    .select("*")
    .eq("id", requestId)
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    throw new Error(error?.message || "sync_request_not_found");
  }

  return data as JsonObject;
}

async function handleOperation({
  operation,
  payload,
  actor,
  internalProxyCall,
  localSyncCall,
}: {
  operation: string;
  payload: JsonObject;
  actor: string;
  internalProxyCall: boolean;
  localSyncCall: boolean;
}) {
  const allowAdminOrProxy = internalProxyCall || !localSyncCall;

  switch (operation) {
    case "list_release_artifacts": {
      if (!allowAdminOrProxy) {
        throw new Error("forbidden_operation");
      }
      const productKey = asString(payload.product_key || payload.productKey).toLowerCase();
      const limit = normalizeLimit(payload.limit, 100, 1, 400);

      let query = supabaseAdmin
        .from("version_release_artifacts_labeled")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (productKey) query = query.eq("product_key", productKey);

      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data || [];
    }

    case "list_local_nodes": {
      if (!allowAdminOrProxy) {
        throw new Error("forbidden_operation");
      }
      const onlyActive = asBoolean(payload.only_active, false);
      const limit = normalizeLimit(payload.limit, 200, 1, 500);

      let query = supabaseAdmin
        .from("version_local_nodes_labeled")
        .select("*")
        .order("active", { ascending: false })
        .order("display_name", { ascending: true })
        .limit(limit);

      if (onlyActive) query = query.eq("active", true);

      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data || [];
    }

    case "upsert_local_node": {
      if (!allowAdminOrProxy) {
        throw new Error("forbidden_operation");
      }

      const tenantId = await resolveTenantId(asString(payload.tenant_id));
      if (!tenantId) throw new Error("tenant_not_found");

      const nodeKey = asString(payload.node_key || payload.nodeKey).toLowerCase();
      const displayName = asString(payload.display_name || payload.displayName, nodeKey || "Local node");
      const runnerLabel = asString(payload.runner_label || payload.runnerLabel, nodeKey || "local-runner");
      const osName = asString(payload.os_name || payload.osName);
      const active = asBoolean(payload.active, true);
      const metadata = asObject(payload.metadata);

      if (!nodeKey) throw new Error("node_key_required");

      const { data, error } = await supabaseAdmin
        .from("version_local_nodes")
        .upsert(
          {
            tenant_id: tenantId,
            node_key: nodeKey,
            display_name: displayName,
            runner_label: runnerLabel,
            os_name: osName || null,
            active,
            metadata,
            last_seen_at: new Date().toISOString(),
          },
          { onConflict: "tenant_id,node_key" }
        )
        .select("*")
        .limit(1)
        .maybeSingle();

      if (error || !data) throw new Error(error?.message || "upsert_local_node_failed");
      return data;
    }

    case "request_local_sync": {
      if (!allowAdminOrProxy) {
        throw new Error("forbidden_operation");
      }

      const releaseId = await resolveReleaseId({
        releaseId: asString(payload.release_id || payload.releaseId),
        productKey: asString(payload.product_key || payload.productKey).toLowerCase(),
        envKey: asString(payload.env_key || payload.envKey).toLowerCase(),
        semver: asString(payload.semver),
      });

      const artifact = await fetchReleaseArtifactByReleaseId(releaseId);
      const tenantId = asString(artifact.tenant_id);
      const nodeKey = asString(payload.node_key || payload.nodeKey).toLowerCase();
      if (!nodeKey) throw new Error("node_key_required");
      const node = await fetchNodeByKey({ tenantId, nodeKey });

      const artifactProvider = asString(artifact.artifact_provider).toLowerCase();
      const artifactPath = asString(artifact.artifact_path);
      const artifactMetadata = asObject(artifact.metadata);
      const artifactBucket =
        asString(artifactMetadata.storage_bucket) ||
        asString(Deno.env.get("VERSIONING_ARTIFACTS_BUCKET")) ||
        DEFAULT_ARTIFACTS_BUCKET;

      const { data: requestIdRaw, error: requestErr } = await supabaseAdmin.rpc(
        "versioning_request_local_artifact_sync",
        {
          p_release_id: releaseId,
          p_node_key: nodeKey,
          p_actor: actor,
          p_notes: asString(payload.notes) || null,
          p_metadata: asObject(payload.metadata),
        }
      );

      if (requestErr) throw new Error(requestErr.message);
      const requestId = asString(requestIdRaw);
      if (!requestId) throw new Error("sync_request_not_created");

      const githubAuth = await getGithubAuthConfig();
      if (!githubAuth.ok) {
        await updateLocalSyncRequest({
          requestId,
          actor,
          status: "failed",
          errorDetail: githubAuth.data.detail,
          metadata: {
            error: githubAuth.data.error,
          },
        });
        throw new Error(githubAuth.data.detail);
      }

      const workflowId = asString(
        Deno.env.get("VERSIONING_LOCAL_SYNC_WORKFLOW"),
        "versioning-local-artifact-sync.yml"
      );
      const workflowRef = asString(
        Deno.env.get("VERSIONING_LOCAL_SYNC_WORKFLOW_REF"),
        asString(Deno.env.get("DEPLOY_BRANCH_DEV"), "dev")
      );

      const githubRepository =
        asString(artifact.github_repository) || `${githubAuth.data.owner}/${githubAuth.data.repo}`;
      let artifactDownloadUrl = "";
      if (artifactProvider && artifactProvider !== "github_actions" && artifactProvider !== "supabase_storage") {
        throw new Error(`artifact_provider_not_supported:${artifactProvider}`);
      }
      if (artifactProvider === "supabase_storage") {
        if (!artifactPath) throw new Error("artifact_path_missing_for_storage_provider");
        artifactDownloadUrl = await createStorageSignedUrl({
          bucket: artifactBucket,
          artifactPath,
        });
      } else {
        const runId = asNumber(artifact.github_run_id, 0);
        if (!runId) {
          throw new Error("artifact_github_run_id_missing");
        }
      }

      const dispatch = await dispatchGithubWorkflow({
        owner: githubAuth.data.owner,
        repo: githubAuth.data.repo,
        token: githubAuth.data.token,
        workflowId,
        workflowRef,
        inputs: {
          request_id: requestId,
          node_key: nodeKey,
          runner_label: asString(node.runner_label),
          artifact_provider: artifactProvider || "github_actions",
          artifact_name: asString(artifact.artifact_name),
          artifact_key: asString(artifact.artifact_key),
          artifact_storage_bucket: artifactBucket,
          artifact_storage_path: artifactPath,
          artifact_download_url: artifactDownloadUrl,
          github_run_id: String(asNumber(artifact.github_run_id, 0)),
          github_repository: githubRepository,
          product_key: asString(artifact.product_key),
          env_key: asString(artifact.env_key),
          semver: asString(artifact.version_label),
          source_commit_sha: asString(artifact.commit_sha),
          actor,
        },
      });

      if (!dispatch.ok) {
        await updateLocalSyncRequest({
          requestId,
          actor,
          status: "failed",
          errorDetail: dispatch.detail,
          metadata: {
            workflow_id: workflowId,
            workflow_ref: workflowRef,
            artifact_provider: artifactProvider || "github_actions",
            artifact_storage_bucket: artifactBucket,
            artifact_storage_path: artifactPath || null,
            dispatch_error: dispatch.payload,
          },
        });
        throw new Error(dispatch.detail || "local_sync_dispatch_failed");
      }

      const workflowRunUrl = `https://github.com/${githubAuth.data.owner}/${githubAuth.data.repo}/actions/workflows/${workflowId}`;

      await updateLocalSyncRequest({
        requestId,
        actor,
        status: "queued",
        workflowRunUrl,
        metadata: {
          workflow_id: workflowId,
          workflow_ref: workflowRef,
          github_auth_mode: githubAuth.data.authMode,
          github_repository: githubRepository,
          artifact_provider: artifactProvider || "github_actions",
          artifact_storage_bucket: artifactBucket,
          artifact_storage_path: artifactPath || null,
          dispatch_status: dispatch.status,
        },
      });

      const requestRow = await fetchSyncRequestRow(requestId);
      return {
        request: requestRow,
        workflow: {
          id: workflowId,
          ref: workflowRef,
          logs_url: workflowRunUrl,
        },
      };
    }

    case "list_local_sync_requests": {
      if (!allowAdminOrProxy) {
        throw new Error("forbidden_operation");
      }
      const limit = normalizeLimit(payload.limit, 100, 1, 400);
      const productKey = asString(payload.product_key || payload.productKey).toLowerCase();
      const envKey = asString(payload.env_key || payload.envKey).toLowerCase();
      const status = asString(payload.status).toLowerCase();
      const nodeKey = asString(payload.node_key || payload.nodeKey).toLowerCase();

      let query = supabaseAdmin
        .from("version_local_sync_requests_labeled")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (productKey) query = query.eq("product_key", productKey);
      if (envKey) query = query.eq("env_key", envKey);
      if (status) query = query.eq("status", status);
      if (nodeKey) query = query.eq("node_key", nodeKey);

      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data || [];
    }

    case "get_local_sync_request": {
      if (!(localSyncCall || internalProxyCall || allowAdminOrProxy)) {
        throw new Error("forbidden_operation");
      }

      const requestId = asString(payload.request_id || payload.requestId);
      if (!requestId) throw new Error("request_id_required");
      return fetchSyncRequestRow(requestId);
    }

    case "heartbeat_local_node": {
      if (!(localSyncCall || internalProxyCall || allowAdminOrProxy)) {
        throw new Error("forbidden_operation");
      }

      const nodeKey = asString(payload.node_key || payload.nodeKey).toLowerCase();
      if (!nodeKey) throw new Error("node_key_required");
      const tenantId = await resolveTenantId(asString(payload.tenant_id));
      if (!tenantId) throw new Error("tenant_not_found");

      const metadata = asObject(payload.metadata);
      const { data, error } = await supabaseAdmin
        .from("version_local_nodes")
        .update({
          last_seen_at: new Date().toISOString(),
          metadata,
          updated_at: new Date().toISOString(),
        })
        .eq("tenant_id", tenantId)
        .eq("node_key", nodeKey)
        .select("*")
        .limit(1)
        .maybeSingle();

      if (error || !data) {
        throw new Error(error?.message || "node_not_found");
      }

      return data;
    }

    case "finalize_local_sync": {
      if (!(localSyncCall || internalProxyCall)) {
        throw new Error("forbidden_operation");
      }

      const requestId = asString(payload.request_id || payload.requestId);
      if (!requestId) throw new Error("request_id_required");

      await updateLocalSyncRequest({
        requestId,
        actor: asString(payload.actor, actor),
        status: asString(payload.status, "failed").toLowerCase(),
        workflowRunId: asNumber(payload.workflow_run_id, 0) || null,
        workflowRunUrl: asString(payload.workflow_run_url),
        localPath: asString(payload.local_path),
        errorDetail: asString(payload.error_detail),
        metadata: asObject(payload.metadata),
      });

      const requestRow = await fetchSyncRequestRow(requestId);
      return requestRow;
    }

    case "register_release_artifact": {
      if (!(internalProxyCall || localSyncCall)) {
        throw new Error("forbidden_operation");
      }

      const releaseId = asString(payload.release_id || payload.releaseId);
      if (!releaseId) throw new Error("release_id_required");

      const { data, error } = await supabaseAdmin.rpc("versioning_upsert_release_artifact", {
        p_release_id: releaseId,
        p_actor: asString(payload.actor, actor),
        p_artifact_provider: asString(payload.artifact_provider, "github_actions"),
        p_artifact_name: asString(payload.artifact_name),
        p_artifact_key: asString(payload.artifact_key),
        p_artifact_path: asString(payload.artifact_path) || null,
        p_github_repository: asString(payload.github_repository) || null,
        p_github_run_id: asNumber(payload.github_run_id, 0) || null,
        p_github_run_number: asNumber(payload.github_run_number, 0) || null,
        p_github_artifact_id: asNumber(payload.github_artifact_id, 0) || null,
        p_github_artifact_url: asString(payload.github_artifact_url) || null,
        p_size_bytes: asNumber(payload.size_bytes, 0) || null,
        p_checksum_sha256: asString(payload.checksum_sha256) || null,
        p_metadata: asObject(payload.metadata),
      });

      if (error) throw new Error(error.message);

      const artifactId = asString(data);
      const { data: artifactRow, error: artifactError } = await supabaseAdmin
        .from("version_release_artifacts_labeled")
        .select("*")
        .eq("id", artifactId)
        .limit(1)
        .maybeSingle();

      if (artifactError) throw new Error(artifactError.message);

      return artifactRow || { id: artifactId };
    }

    default:
      throw new Error(`operation_not_supported:${operation}`);
  }
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const cors = corsWithCustomHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "method_not_allowed" }, 405, cors);
  }

  const internalProxyCall = isInternalProxyAuthorized(req);
  const localSyncCall = isLocalSyncTokenAuthorized(req);

  let actor = "admin:proxy";
  let tenantId = "";

  if (!internalProxyCall && !localSyncCall) {
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
    tenantId = asString(usuario.tenant_id);
  } else if (localSyncCall) {
    actor = asString(req.headers.get("x-versioning-local-sync-actor"), "runner:local-sync");
  }

  const body = (await req.json().catch(() => ({}))) as JsonObject;
  const operation = asString(body.operation).toLowerCase();
  const payload = asObject(body.payload);

  if (!operation) {
    return jsonResponse({ ok: false, error: "missing_operation" }, 400, cors);
  }

  if (tenantId && !payload.tenant_id) {
    payload.tenant_id = tenantId;
  }

  try {
    const data = await handleOperation({
      operation,
      payload,
      actor,
      internalProxyCall,
      localSyncCall,
    });

    return jsonResponse({ ok: true, operation, data }, 200, cors);
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        operation,
        error: "versioning_artifact_sync_failed",
        detail: error instanceof Error ? error.message : "unknown_error",
      },
      500,
      cors
    );
  }
});
