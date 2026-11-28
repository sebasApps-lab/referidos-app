import { selectFixture } from "./edge-fixture.ts";
import "../../../apps/referidos-ops/supabase/functions/versioning-deploy-reconcile/index.ts";

const callbackToken = "test-callback-token";
const reconcilerToken = "test-reconcile-token";
const url = "https://fixture.example.test/functions/v1/versioning-deploy-reconcile";

function assertEqual<T>(actual: T, expected: T) {
  if (actual !== expected) throw new Error(`Expected ${expected}, got ${actual}`);
}

Deno.test("reconciliation route requires its own token before leasing any work", async () => {
  Deno.env.set("VERSIONING_DEPLOY_CALLBACK_TOKEN", callbackToken);
  Deno.env.set("VERSIONING_DEPLOY_RECONCILE_TOKEN", reconcilerToken);
  Deno.env.set("VERSIONING_DEPLOY_RECONCILE_ENVS", "staging");
  let claims = 0;
  const handler = selectFixture({
    from() { throw new Error("Unexpected database read"); },
    rpc(name, args) {
      assertEqual(name, "versioning_claim_deploy_reconciliation");
      assertEqual(args.p_limit, 3);
      assertEqual(args.p_env_key, "staging");
      claims += 1;
      return { data: { ok: true, attempts: [] } };
    },
  });

  assertEqual((await handler(new Request(url))).status, 405);
  assertEqual((await handler(new Request(url, { method: "POST" }))).status, 401);
  const headers = { "x-versioning-reconcile-token": callbackToken, "x-versioning-callback-token": callbackToken };
  assertEqual((await handler(new Request(url, { method: "POST", headers }))).status, 401);
  Deno.env.set("VERSIONING_DEPLOY_RECONCILE_TOKEN", callbackToken);
  assertEqual((await handler(new Request(url, { method: "POST", headers }))).status, 401);
  assertEqual(claims, 0);

  Deno.env.set("VERSIONING_DEPLOY_RECONCILE_TOKEN", reconcilerToken);
  const workerHeaders = { "x-versioning-reconcile-token": reconcilerToken };
  const prodResponse = await handler(new Request(url, { method: "POST", headers: workerHeaders, body: '{"env_key":"prod"}' }));
  assertEqual(prodResponse.status, 403);
  assertEqual(claims, 0);
  const response = await handler(new Request(url, { method: "POST", headers: workerHeaders }));
  assertEqual(response.status, 200);
  assertEqual((await response.json()).processed, 0);
  assertEqual(claims, 1);
});
