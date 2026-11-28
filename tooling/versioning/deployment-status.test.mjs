import assert from "node:assert/strict";
import { test } from "node:test";
import { deploymentStateFromRequest } from "../../apps/referidos-app/src/admin/versioning/services/deploymentStatus.js";

const executed = { status: "executed", deployment_status: "success" };
const durable = { deploy_attempt_protocol: "durable_v1", publication: { status: "published" } };

test("a Netlify publication counts as deployed only after the official closure", () => {
  for (const status of [undefined, "pending", "incomplete", "needs_review"]) {
    assert.equal(deploymentStateFromRequest({ ...executed, metadata: { ...durable, ops_reconciliation: { status } } }), "published_incomplete");
  }
  assert.equal(deploymentStateFromRequest({
    ...executed, metadata: { ...durable, ops_reconciliation: { status: "complete" }, ops_observability: { status: "failed" } },
  }), "deployed");
});

test("legacy success remains visible without qualifying as an official closing", () => {
  assert.equal(deploymentStateFromRequest(executed), "historical");
  assert.equal(deploymentStateFromRequest({ ...executed, metadata: { deploy_attempt_protocol: "durable_v1" } }), "unconfirmed");
  assert.equal(deploymentStateFromRequest({ status: "executed", deployment_status: "started",
    metadata: { ...durable, publication: { status: "not_confirmed" } },
  }), "unconfirmed");
});
