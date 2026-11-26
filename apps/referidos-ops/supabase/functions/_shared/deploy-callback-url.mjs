const CALLBACK_PATH = "/functions/v1/versioning-deploy-callback";
const INVALID_OPS_ORIGIN = "Deploy callback requires a valid OPS HTTPS origin in SUPABASE_URL.";

export function resolveDeployCallbackUrl(opsUrl, requestedUrl) {
  const configuredOrigin = typeof opsUrl === "string" ? opsUrl.trim().replace(/\/$/, "") : "";
  let parsed;
  try {
    parsed = new URL(configuredOrigin);
  } catch {
    throw new Error(INVALID_OPS_ORIGIN);
  }

  if (parsed.protocol !== "https:" || parsed.origin !== configuredOrigin.toLowerCase()) {
    throw new Error(INVALID_OPS_ORIGIN);
  }

  const endpoint = parsed.origin + CALLBACK_PATH;
  if (requestedUrl !== undefined && requestedUrl !== endpoint) {
    throw new Error("Deploy callback URL does not match the configured OPS endpoint.");
  }
  return endpoint;
}
