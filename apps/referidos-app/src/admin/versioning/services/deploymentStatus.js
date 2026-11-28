export function deploymentStateFromRequest(row) {
  if (!row) return "not_deployed";
  const metadata = row.metadata ?? {};
  const publication = metadata.publication?.status;
  const reconciliation = metadata.ops_reconciliation?.status;
  const durable = metadata.deploy_attempt_protocol === "durable_v1";
  const requestStatus = String(row.status ?? "").toLowerCase();
  const deploymentStatus = String(row.deployment_status ?? "").toLowerCase();

  if (publication === "published") {
    if (reconciliation === "complete" && ["success", "deployed"].includes(deploymentStatus)) {
      return durable ? "deployed" : "historical";
    }
    return "published_incomplete";
  }
  if (publication === "not_confirmed" || ["incomplete", "needs_review"].includes(reconciliation)) return "unconfirmed";
  if (["success", "deployed"].includes(deploymentStatus)) return durable ? "unconfirmed" : "historical";
  if (deploymentStatus === "failed" || requestStatus === "failed") return "failed";
  if (deploymentStatus === "started") return "running";
  if (["pending", "approved", "rejected"].includes(requestStatus)) return requestStatus;
  if (requestStatus === "executed") return "unconfirmed";
  return "not_deployed";
}
