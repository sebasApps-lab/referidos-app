import { resolveDeployCallbackUrl } from "../../apps/referidos-ops/supabase/functions/_shared/deploy-callback-url.mjs";

export { resolveDeployCallbackUrl };

const CALLBACK_TIMEOUT_MS = 30_000;

export async function postDeployCallback({ opsUrl, requestedUrl, token, payload, fetchImpl = fetch }) {
  const endpoint = resolveDeployCallbackUrl(opsUrl, requestedUrl);
  if (typeof token !== "string" || !token.trim()) {
    throw new Error("Missing VERSIONING_DEPLOY_CALLBACK_TOKEN.");
  }

  let response;
  try {
    response = await fetchImpl(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-versioning-callback-token": token.trim(),
      },
      body: JSON.stringify(payload),
      redirect: "error",
      signal: AbortSignal.timeout(CALLBACK_TIMEOUT_MS),
    });
  } catch {
    throw new Error("Deploy callback request failed before receiving an HTTP response.");
  }

  if (!response.ok) {
    throw new Error(`Deploy callback failed with HTTP ${response.status}.`);
  }

  const confirmation = await response.json().catch(() => null);
  if (confirmation?.ok !== true) {
    throw new Error("Deploy callback response did not confirm the update.");
  }
}
