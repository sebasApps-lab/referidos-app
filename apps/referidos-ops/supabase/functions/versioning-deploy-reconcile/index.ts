import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { supabaseAdmin } from "../_shared/support.ts";
import { type DeployRequest, verifyArtifactForRequest } from "../_shared/deploy-artifact-check.ts";
import { dispatchReservedDeployAttempt } from "../_shared/deploy-dispatch.mjs";
import { readExactDeployWorkflow } from "../_shared/deploy-github-proof.mjs";
import { runObsReleaseSync } from "../_shared/deploy-obs-sync.ts";
import { runDeployReconciliation } from "../_shared/deploy-reconciliation.mjs";
import { getGithubAuthConfig } from "../_shared/github-auth.ts";

async function authorize(received: string, expected: string) {
  if (!received || !expected) return false;
  const encoder = new TextEncoder();
  const [actual, secret] = await Promise.all([received, expected].map(async (value) =>
    new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value)))));
  let difference = 0;
  for (let index = 0; index < secret.length; index += 1) difference |= actual[index] ^ secret[index];
  return difference === 0;
}

serve(async (req) => {
  if (req.method !== "POST") return Response.json({ ok: false, error: "method_not_allowed" }, { status: 405 });
  const expected = Deno.env.get("VERSIONING_DEPLOY_RECONCILE_TOKEN") ?? "";
  const received = req.headers.get("x-versioning-reconcile-token") ?? "";
  if (expected === Deno.env.get("VERSIONING_DEPLOY_CALLBACK_TOKEN") || !(await authorize(received, expected))) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const envKey = body?.env_key ?? "staging";
  const allowed = (Deno.env.get("VERSIONING_DEPLOY_RECONCILE_ENVS") ?? "staging").split(",").map((env) => env.trim());
  if (!["staging", "prod"].includes(envKey) || !allowed.includes(envKey)) {
    return Response.json({ ok: false, error: "reconciliation_environment_not_authorized" }, { status: 403 });
  }

  try {
    let auth: ReturnType<typeof getGithubAuthConfig> | undefined;
    const githubConfig = () => auth ??= getGithubAuthConfig();
    const result = await runDeployReconciliation({
      database: supabaseAdmin,
      envKey,
      netlifyToken: Deno.env.get("NETLIFY_AUTH_TOKEN") ?? "",
      async dispatchReserved(attempt) {
        const config = await githubConfig();
        if (!config.ok) return { accepted: false, reason: "github_dispatch_configuration_unavailable" };
        return await dispatchReservedDeployAttempt({ supabase: supabaseAdmin, executionId: attempt.execution_id,
          token: config.data.token, repository: `${config.data.owner}/${config.data.repo}` });
      },
      async observeGithub(attempt) {
        const config = await githubConfig();
        if (!config.ok) return { status: "unknown", reason: "github_proof_configuration_unavailable" };
        return await readExactDeployWorkflow(attempt, { token: config.data.token, repository: `${config.data.owner}/${config.data.repo}` });
      },
      async verifyArtifact(attempt) {
        const { data: request, error } = await supabaseAdmin.from("version_deploy_requests_labeled")
          .select("id, tenant_id, product_id, product_key, release_id, env_id, env_key, version_label, status, deployment_status, deployment_id, updated_at, metadata")
          .eq("id", attempt.request_id).maybeSingle<DeployRequest>();
        if (error || !request || request.deployment_id !== attempt.execution_id) {
          return { ok: false, reason: "deploy_attempt_changed" };
        }
        return await verifyArtifactForRequest(request, attempt.callback_binding);
      },
      syncObservability: runObsReleaseSync,
    });
    if (!result.ok) return Response.json({ ok: false, error: "reconciliation_claim_failed" }, { status: 503 });
    // Individual attempt errors and private targets remain in OPS.
    return Response.json({ ok: true, processed: result.processed });
  } catch {
    return Response.json({ ok: false, error: "reconciliation_unavailable" }, { status: 503 });
  }
});
