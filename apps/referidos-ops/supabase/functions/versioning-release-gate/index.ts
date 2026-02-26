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

type ReleaseRow = {
  id: string;
  tenant_id: string;
  product_key: string;
  env_key: string;
  version_label: string;
  source_changeset_id: string | null;
  source_commit_sha: string | null;
};

type RequiredMigration = {
  version: string;
  file_name: string;
  path: string;
};

const INTERNAL_HEADER = "x-versioning-proxy-token";

const OPS_REQUIRED_KEYS_BASE = [
  "GITHUB_DEPLOY_OWNER",
  "GITHUB_DEPLOY_REPO",
  "DEPLOY_BRANCH_DEV",
  "DEPLOY_BRANCH_STAGING",
  "DEPLOY_BRANCH_PROD",
  "VERSIONING_DEPLOY_WORKFLOW",
  "VERSIONING_DEPLOY_WORKFLOW_REF",
  "VERSIONING_DEPLOY_CALLBACK_TOKEN",
  "VERSIONING_PROXY_SHARED_TOKEN",
  "VERSIONING_APPLY_MIGRATIONS_WORKFLOW",
  "VERSIONING_APPLY_MIGRATIONS_WORKFLOW_REF",
];

const GITHUB_REQUIRED_GLOBAL_SECRETS = [
  "NETLIFY_AUTH_TOKEN",
  "VERSIONING_DEPLOY_CALLBACK_TOKEN",
  "VITE_SUPABASE_URL_STAGING",
  "VITE_SUPABASE_ANON_KEY_STAGING",
  "VITE_SUPABASE_URL_PROD",
  "VITE_SUPABASE_ANON_KEY_PROD",
  "OBS_SUPABASE_URL_STAGING",
  "OBS_SUPABASE_SECRET_KEY_STAGING",
  "OBS_SUPABASE_URL_PROD",
  "OBS_SUPABASE_SECRET_KEY_PROD",
  "SUPABASE_ACCESS_TOKEN",
];

function asString(value: unknown, fallback = ""): string {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim();
  return normalized || fallback;
}

function asBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === "boolean") return value;
  return fallback;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function envVarKey(input: string): string {
  return input.replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "").toUpperCase();
}

function isInternalProxyAuthorized(req: Request) {
  const expected = asString(Deno.env.get("VERSIONING_PROXY_SHARED_TOKEN"));
  if (!expected) return false;
  const received = asString(req.headers.get(INTERNAL_HEADER));
  return Boolean(received) && received === expected;
}

function corsWithInternalHeader(origin: string | null) {
  const base = corsHeaders(origin);
  const current = base["Access-Control-Allow-Headers"] || "";
  return {
    ...base,
    "Access-Control-Allow-Headers": `${current}, ${INTERNAL_HEADER}`,
  };
}

function resolveRuntimeBaseUrl(envKey: string) {
  const token = envVarKey(envKey);
  const explicit = asString(Deno.env.get(`VERSIONING_RUNTIME_URL_${token}`));
  if (explicit) return explicit;
  const legacy = asString(Deno.env.get(`OBS_RELEASE_SYNC_URL_${token}`));
  if (legacy) return legacy;
  return "";
}

function resolveRuntimeProjectRef(envKey: string) {
  const token = envVarKey(envKey);
  const explicit = asString(Deno.env.get(`VERSIONING_RUNTIME_PROJECT_REF_${token}`));
  if (explicit) return explicit;

  const runtimeUrl = resolveRuntimeBaseUrl(envKey);
  if (!runtimeUrl) return "";

  try {
    const hostname = new URL(runtimeUrl).hostname;
    return asString(hostname.split(".")[0]);
  } catch {
    return "";
  }
}

function resolveTargetBranch(envKey: string) {
  const devBranch = asString(Deno.env.get("DEPLOY_BRANCH_DEV"), "dev");
  const stagingBranch = asString(Deno.env.get("DEPLOY_BRANCH_STAGING"), "staging");
  const prodBranch = asString(Deno.env.get("DEPLOY_BRANCH_PROD"), "main");
  if (envKey === "prod") return prodBranch;
  if (envKey === "staging") return stagingBranch;
  return devBranch;
}

function normalizeChangedPaths(value: unknown): string[] {
  const out: string[] = [];
  for (const item of asArray(value)) {
    if (typeof item === "string") {
      const path = item.trim();
      if (path) out.push(path);
      continue;
    }
    if (item && typeof item === "object") {
      const row = item as JsonObject;
      const fromPath = asString(row.path || row.file || row.changed_path);
      if (fromPath) out.push(fromPath);
    }
  }
  return out;
}

function parseMigrationFromPath(pathValue: string): RequiredMigration | null {
  const normalized = asString(pathValue).replace(/\\/g, "/");
  if (!normalized.includes("/supabase/migrations/")) return null;
  if (!normalized.toLowerCase().endsWith(".sql")) return null;

  const parts = normalized.split("/");
  const fileName = asString(parts[parts.length - 1]);
  if (!fileName) return null;

  const match = fileName.match(/^(\d{8})_[^/]+\.sql$/);
  if (!match) return null;

  return {
    version: match[1],
    file_name: fileName,
    path: normalized,
  };
}

async function resolveRelease(productKey: string, envKey: string, semver: string) {
  const { data, error } = await supabaseAdmin
    .from("version_releases_labeled")
    .select("id, tenant_id, product_key, env_key, version_label, source_changeset_id, source_commit_sha")
    .eq("product_key", productKey)
    .eq("env_key", envKey)
    .eq("version_label", semver)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<ReleaseRow>();

  if (error || !data) {
    return {
      ok: false,
      error: "release_not_found",
      detail: error?.message || `No se encontro release ${productKey}/${envKey}/${semver}`,
      release: null as ReleaseRow | null,
    };
  }

  return { ok: true, error: "", detail: "", release: data };
}

async function loadRequiredMigrationsFromRelease(release: ReleaseRow) {
  const changesetId = asString(release.source_changeset_id);
  if (!changesetId) {
    return {
      required_migrations: [] as RequiredMigration[],
      required_versions: [] as string[],
      from_changeset: false,
    };
  }

  const { data, error } = await supabaseAdmin
    .from("version_changeset_items")
    .select("changed_paths")
    .eq("changeset_id", changesetId);

  if (error) {
    throw new Error(error.message);
  }

  const byVersion = new Map<string, RequiredMigration>();
  for (const row of data || []) {
    const changedPaths = normalizeChangedPaths((row as JsonObject).changed_paths);
    for (const changedPath of changedPaths) {
      const parsed = parseMigrationFromPath(changedPath);
      if (!parsed) continue;
      if (!byVersion.has(parsed.version)) {
        byVersion.set(parsed.version, parsed);
      }
    }
  }

  const requiredMigrations = Array.from(byVersion.values()).sort((a, b) =>
    a.version.localeCompare(b.version)
  );
  const requiredVersions = requiredMigrations.map((row) => row.version);

  return {
    required_migrations: requiredMigrations,
    required_versions: requiredVersions,
    from_changeset: true,
  };
}

async function invokeRuntimeMigrations({
  envKey,
  operation,
  payload = {},
}: {
  envKey: string;
  operation: "list_applied_migrations" | "check_versions" | "health";
  payload?: JsonObject;
}) {
  const runtimeUrl = resolveRuntimeBaseUrl(envKey);
  const sharedToken = asString(Deno.env.get("VERSIONING_PROXY_SHARED_TOKEN"));

  if (!runtimeUrl) {
    return {
      ok: false,
      status: 500,
      error: "missing_runtime_url",
      detail: `Missing VERSIONING_RUNTIME_URL_${envVarKey(envKey)} (or OBS_RELEASE_SYNC_URL_${envVarKey(
        envKey
      )}) in ops runtime.`,
      payload: {},
    };
  }

  if (!sharedToken) {
    return {
      ok: false,
      status: 500,
      error: "missing_proxy_shared_token",
      detail: "Missing VERSIONING_PROXY_SHARED_TOKEN in ops runtime.",
      payload: {},
    };
  }

  const endpoint = `${runtimeUrl.replace(/\/+$/, "")}/functions/v1/versioning-runtime-migrations`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [INTERNAL_HEADER]: sharedToken,
    },
    body: JSON.stringify({
      operation,
      ...payload,
    }),
  });

  const raw = await response.text();
  let parsed: JsonObject = {};
  try {
    parsed = raw ? (JSON.parse(raw) as JsonObject) : {};
  } catch {
    parsed = { raw };
  }

  if (!response.ok || parsed.ok === false) {
    return {
      ok: false,
      status: response.status,
      error: asString(parsed.error, "runtime_migrations_call_failed"),
      detail: asString(parsed.detail, "Runtime call failed"),
      payload: parsed,
      endpoint,
    };
  }

  return {
    ok: true,
    status: response.status,
    error: "",
    detail: "ok",
    payload: parsed,
    endpoint,
  };
}

async function checkReleaseMigrations({
  productKey,
  envKey,
  semver,
}: {
  productKey: string;
  envKey: string;
  semver: string;
}) {
  const releaseResult = await resolveRelease(productKey, envKey, semver);
  if (!releaseResult.ok || !releaseResult.release) {
    return {
      ok: false,
      status: 404,
      error: releaseResult.error,
      detail: releaseResult.detail,
      payload: {},
    };
  }

  const release = releaseResult.release;
  const migrations = await loadRequiredMigrationsFromRelease(release);
  const runtimeResult = await invokeRuntimeMigrations({
    envKey,
    operation: "list_applied_migrations",
  });
  if (!runtimeResult.ok) {
    return {
      ok: false,
      status: runtimeResult.status,
      error: runtimeResult.error,
      detail: runtimeResult.detail,
      payload: {
        release,
        required_migrations: migrations.required_migrations,
        required_versions: migrations.required_versions,
        runtime: runtimeResult,
      },
    };
  }

  const appliedVersions = Array.from(
    new Set(
      asArray((runtimeResult.payload as JsonObject).applied_versions)
        .map((value) => asString(value))
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b));

  const appliedSet = new Set(appliedVersions);
  const missingVersions = migrations.required_versions.filter((version) => !appliedSet.has(version));
  const missingMigrations = migrations.required_migrations.filter((row) =>
    missingVersions.includes(row.version)
  );

  return {
    ok: true,
    status: 200,
    error: "",
    detail: missingVersions.length
      ? "missing_required_migrations"
      : "all_required_migrations_applied",
    payload: {
      gate_passed: missingVersions.length === 0,
      release,
      required_migrations: migrations.required_migrations,
      required_versions: migrations.required_versions,
      applied_versions: appliedVersions,
      missing_versions: missingVersions,
      missing_migrations: missingMigrations,
      runtime_endpoint: runtimeResult.endpoint,
      runtime_project_ref: asString((runtimeResult.payload as JsonObject).project_ref),
    },
  };
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
        "User-Agent": "referidos-versioning-edge",
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

async function fetchGithubSecretNames({
  owner,
  repo,
  token,
}: {
  owner: string;
  repo: string;
  token: string;
}) {
  const names = new Set<string>();
  let page = 1;

  while (page <= 10) {
    const url = new URL(`https://api.github.com/repos/${owner}/${repo}/actions/secrets`);
    url.searchParams.set("per_page", "100");
    url.searchParams.set("page", String(page));

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "referidos-versioning-edge",
      },
    });

    const raw = await response.text();
    let parsed: JsonObject = {};
    try {
      parsed = raw ? (JSON.parse(raw) as JsonObject) : {};
    } catch {
      parsed = { raw };
    }

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        detail: asString(parsed.message, "github_list_secrets_failed"),
        names: [] as string[],
      };
    }

    const rows = asArray(parsed.secrets);
    for (const row of rows) {
      if (!row || typeof row !== "object") continue;
      const name = asString((row as JsonObject).name);
      if (name) names.add(name);
    }

    if (rows.length < 100) break;
    page += 1;
  }

  return {
    ok: true,
    status: 200,
    detail: "ok",
    names: Array.from(names.values()).sort((a, b) => a.localeCompare(b)),
  };
}

function requiredGithubSiteSecret(productKey: string, envKey: string) {
  if (productKey === "referidos_app" && envKey === "staging") {
    return "NETLIFY_SITE_ID_REFERIDOS_APP_STAGING";
  }
  if (productKey === "referidos_app" && envKey === "prod") {
    return "NETLIFY_SITE_ID_REFERIDOS_APP_PROD";
  }
  if (productKey === "prelaunch_web" && envKey === "staging") {
    return "NETLIFY_SITE_ID_PRELAUNCH_WEB_STAGING";
  }
  if (productKey === "prelaunch_web" && envKey === "prod") {
    return "NETLIFY_SITE_ID_PRELAUNCH_WEB_PROD";
  }
  return "";
}

async function resolveTenantProductEnv({
  productKey,
  envKey,
}: {
  productKey: string;
  envKey: string;
}) {
  const { data: productRow, error: productError } = await supabaseAdmin
    .from("version_products")
    .select("id, tenant_id, product_key")
    .eq("product_key", productKey)
    .limit(1)
    .maybeSingle<{ id: string; tenant_id: string; product_key: string }>();

  if (productError || !productRow) {
    return {
      ok: false,
      detail: productError?.message || `product_key ${productKey} not found`,
      tenantId: "",
      productId: "",
      envId: "",
    };
  }

  const { data: envRow, error: envError } = await supabaseAdmin
    .from("version_environments")
    .select("id, tenant_id, env_key")
    .eq("tenant_id", productRow.tenant_id)
    .eq("env_key", envKey)
    .limit(1)
    .maybeSingle<{ id: string; tenant_id: string; env_key: string }>();

  if (envError || !envRow) {
    return {
      ok: false,
      detail: envError?.message || `env_key ${envKey} not found for tenant`,
      tenantId: productRow.tenant_id,
      productId: productRow.id,
      envId: "",
    };
  }

  return {
    ok: true,
    detail: "ok",
    tenantId: productRow.tenant_id,
    productId: productRow.id,
    envId: envRow.id,
  };
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const cors = corsWithInternalHeader(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "method_not_allowed" }, 405, cors);
  }

  const body = (await req.json().catch(() => ({}))) as JsonObject;
  const internalProxyCall = isInternalProxyAuthorized(req);

  let actor = asString(body.actor, "admin:proxy");
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
  }

  const operation = asString(body.operation).toLowerCase();
  const productKey = asString(body.product_key).toLowerCase();
  const envKey = asString(body.to_env || body.env_key).toLowerCase();
  const semver = asString(body.semver);

  if (!["check_release_migrations", "apply_release_migrations", "validate_environment"].includes(operation)) {
    return jsonResponse(
      {
        ok: false,
        error: "invalid_operation",
        detail:
          "operation permitido: check_release_migrations | apply_release_migrations | validate_environment",
      },
      400,
      cors
    );
  }

  if (!productKey || !envKey) {
    return jsonResponse(
      { ok: false, error: "missing_params", detail: "product_key y to_env/env_key son requeridos." },
      400,
      cors
    );
  }

  if (!["staging", "prod"].includes(envKey)) {
    return jsonResponse(
      {
        ok: false,
        error: "invalid_target_env",
        detail: "Fase 4 aplica para staging/prod.",
      },
      400,
      cors
    );
  }

  if (operation === "check_release_migrations") {
    if (!semver) {
      return jsonResponse(
        { ok: false, error: "missing_semver", detail: "semver es requerido para check_release_migrations." },
        400,
        cors
      );
    }

    try {
      const gateResult = await checkReleaseMigrations({
        productKey,
        envKey,
        semver,
      });

      if (!gateResult.ok) {
        return jsonResponse(
          {
            ok: false,
            error: gateResult.error,
            detail: gateResult.detail,
            ...gateResult.payload,
          },
          gateResult.status,
          cors
        );
      }

      await supabaseAdmin.from("version_audit_log").insert({
        tenant_id: asString((gateResult.payload.release as JsonObject).tenant_id),
        actor,
        action: "check_release_migrations",
        entity_type: "version_releases",
        entity_id: asString((gateResult.payload.release as JsonObject).id),
        payload: {
          product_key: productKey,
          env_key: envKey,
          semver,
          gate_passed: asBoolean((gateResult.payload as JsonObject).gate_passed),
          required_versions: (gateResult.payload as JsonObject).required_versions || [],
          missing_versions: (gateResult.payload as JsonObject).missing_versions || [],
        },
      });

      return jsonResponse(
        {
          ok: true,
          operation,
          ...gateResult.payload,
        },
        200,
        cors
      );
    } catch (error) {
      return jsonResponse(
        {
          ok: false,
          error: "check_release_migrations_failed",
          detail: error instanceof Error ? error.message : "unknown_error",
        },
        500,
        cors
      );
    }
  }

  if (operation === "apply_release_migrations") {
    if (!semver) {
      return jsonResponse(
        { ok: false, error: "missing_semver", detail: "semver es requerido para apply_release_migrations." },
        400,
        cors
      );
    }

    try {
      const gateResult = await checkReleaseMigrations({
        productKey,
        envKey,
        semver,
      });

      if (!gateResult.ok) {
        return jsonResponse(
          {
            ok: false,
            error: gateResult.error,
            detail: gateResult.detail,
            ...gateResult.payload,
          },
          gateResult.status,
          cors
        );
      }

      const gatePayload = gateResult.payload as JsonObject;
      const missingVersions = asArray(gatePayload.missing_versions)
        .map((value) => asString(value))
        .filter(Boolean);
      const release = gatePayload.release as JsonObject;

      if (missingVersions.length === 0) {
        return jsonResponse(
          {
            ok: true,
            operation,
            already_applied: true,
            gate_passed: true,
            missing_versions: [],
            release,
            detail: "No hay migraciones faltantes para esta release.",
          },
          200,
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

      const workflowId = asString(
        Deno.env.get("VERSIONING_APPLY_MIGRATIONS_WORKFLOW"),
        "versioning-apply-migrations.yml"
      );
      const workflowRef = asString(
        Deno.env.get("VERSIONING_APPLY_MIGRATIONS_WORKFLOW_REF"),
        resolveTargetBranch("dev")
      );
      const targetProjectRef = resolveRuntimeProjectRef(envKey);
      if (!targetProjectRef) {
        return jsonResponse(
          {
            ok: false,
            error: "missing_runtime_project_ref",
            detail:
              `Missing VERSIONING_RUNTIME_PROJECT_REF_${envVarKey(envKey)} and could not infer from runtime URL.`,
          },
          500,
          cors
        );
      }

      const sourceBranch = asString(body.source_branch);
      const targetBranch = asString(body.target_branch, resolveTargetBranch(envKey));
      const workflowRequestId = crypto.randomUUID();

      const dispatch = await dispatchGithubWorkflow({
        owner: githubAuth.data.owner,
        repo: githubAuth.data.repo,
        token: githubAuth.data.token,
        workflowId,
        workflowRef,
        inputs: {
          request_id: workflowRequestId,
          product_key: productKey,
          env_key: envKey,
          semver,
          target_project_ref: targetProjectRef,
          source_commit_sha: asString(release.source_commit_sha),
          source_branch: sourceBranch,
          target_branch: targetBranch,
          required_migrations: JSON.stringify(missingVersions),
        },
      });

      if (!dispatch.ok) {
        return jsonResponse(
          {
            ok: false,
            error: "github_workflow_dispatch_failed",
            detail: dispatch.detail,
            github: dispatch.payload,
          },
          502,
          cors
        );
      }

      const logsUrl = `https://github.com/${githubAuth.data.owner}/${githubAuth.data.repo}/actions/workflows/${workflowId}`;

      await supabaseAdmin.from("version_audit_log").insert({
        tenant_id: asString(release.tenant_id),
        actor,
        action: "apply_release_migrations",
        entity_type: "version_releases",
        entity_id: asString(release.id),
        payload: {
          product_key: productKey,
          env_key: envKey,
          semver,
          request_id: workflowRequestId,
          workflow_id: workflowId,
          workflow_ref: workflowRef,
          logs_url: logsUrl,
          target_project_ref: targetProjectRef,
          missing_versions: missingVersions,
          github_auth_mode: githubAuth.data.authMode,
        },
      });

      return jsonResponse(
        {
          ok: true,
          operation,
          dispatched: true,
          request_id: workflowRequestId,
          logs_url: logsUrl,
          workflow: {
            id: workflowId,
            ref: workflowRef,
          },
          target_project_ref: targetProjectRef,
          missing_versions: missingVersions,
          gate_passed: false,
          detail: "Workflow de apply migrations disparado.",
        },
        200,
        cors
      );
    } catch (error) {
      return jsonResponse(
        {
          ok: false,
          error: "apply_release_migrations_failed",
          detail: error instanceof Error ? error.message : "unknown_error",
        },
        500,
        cors
      );
    }
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

  const context = await resolveTenantProductEnv({ productKey, envKey });
  if (!context.ok) {
    return jsonResponse(
      {
        ok: false,
        error: "product_or_env_not_found",
        detail: context.detail,
      },
      404,
      cors
    );
  }

  const runtimeCheck = await invokeRuntimeMigrations({
    envKey,
    operation: "health",
  });

  const opsRequiredKeys = [
    ...OPS_REQUIRED_KEYS_BASE,
    `VERSIONING_RUNTIME_URL_${envVarKey(envKey)}`,
  ];
  const opsStatusByKey: Record<string, boolean> = {};
  for (const key of opsRequiredKeys) {
    opsStatusByKey[key] = Boolean(asString(Deno.env.get(key)));
  }
  const opsMissingKeys = opsRequiredKeys.filter((key) => !opsStatusByKey[key]);

  const githubSecretsResult = await fetchGithubSecretNames({
    owner: githubAuth.data.owner,
    repo: githubAuth.data.repo,
    token: githubAuth.data.token,
  });
  const githubSecretNames = githubSecretsResult.ok ? githubSecretsResult.names : [];
  const githubSecretSet = new Set(githubSecretNames);
  const requiredSiteSecret = requiredGithubSiteSecret(productKey, envKey);
  const githubRequired = requiredSiteSecret
    ? [...GITHUB_REQUIRED_GLOBAL_SECRETS, requiredSiteSecret]
    : [...GITHUB_REQUIRED_GLOBAL_SECRETS];
  const githubMissing = githubRequired.filter((secretName) => !githubSecretSet.has(secretName));

  const runtimePayload = runtimeCheck.ok ? (runtimeCheck.payload as JsonObject) : {};
  const runtimeMissing = runtimeCheck.ok
    ? asArray(runtimePayload.runtime_missing_env).map((value) => asString(value)).filter(Boolean)
    : [];

  const overallOk =
    opsMissingKeys.length === 0 &&
    githubSecretsResult.ok &&
    githubMissing.length === 0 &&
    runtimeCheck.ok &&
    runtimeMissing.length === 0;

  const validationDetails = {
    product_key: productKey,
    env_key: envKey,
    checked_at: new Date().toISOString(),
    ops: {
      required: opsRequiredKeys,
      status_by_key: opsStatusByKey,
      missing: opsMissingKeys,
    },
    github: {
      auth_mode: githubAuth.data.authMode,
      owner: githubAuth.data.owner,
      repo: githubAuth.data.repo,
      required_secrets: githubRequired,
      available_secret_names: githubSecretNames,
      missing_secrets: githubMissing,
      list_ok: githubSecretsResult.ok,
      list_error_detail: githubSecretsResult.ok ? null : githubSecretsResult.detail,
    },
    runtime: runtimeCheck.ok
      ? {
          endpoint: runtimeCheck.endpoint,
          project_ref: asString(runtimePayload.project_ref),
          required_env: asArray(runtimePayload.runtime_required_env),
          status_by_key: runtimePayload.runtime_status_by_key || {},
          missing_env: runtimeMissing,
        }
      : {
          endpoint: runtimeCheck.endpoint,
          error: runtimeCheck.error,
          detail: runtimeCheck.detail,
        },
  };

  const summary = overallOk
    ? "Entorno validado correctamente."
    : "Entorno con observaciones. Revisa faltantes de OPS/GitHub/runtime.";

  const { error: validationInsertError } = await supabaseAdmin
    .from("version_env_validations")
    .insert({
      tenant_id: context.tenantId,
      product_id: context.productId,
      env_id: context.envId,
      status: overallOk ? "ok" : "failed",
      summary,
      details: validationDetails,
      validated_by: actor,
      validated_at: new Date().toISOString(),
    });

  if (validationInsertError) {
    return jsonResponse(
      {
        ok: false,
        error: "validation_persist_failed",
        detail: validationInsertError.message,
        validation: validationDetails,
      },
      500,
      cors
    );
  }

  await supabaseAdmin.from("version_audit_log").insert({
    tenant_id: context.tenantId,
    actor,
    action: "validate_environment_contract",
    entity_type: "version_environments",
    entity_id: context.envId,
    payload: validationDetails,
  });

  return jsonResponse(
    {
      ok: true,
      operation,
      validation_ok: overallOk,
      summary,
      details: validationDetails,
    },
    200,
    cors
  );
});

