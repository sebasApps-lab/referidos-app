import { getPrelaunchClient } from "../services/prelaunchSystem";

export function createAnonymousSupportThread(payload = {}) {
  const prelaunchClient = getPrelaunchClient();
  if (!prelaunchClient) return Promise.resolve({ ok: false, error: "missing_env" });
  return prelaunchClient.support.createAnonymousThread(payload);
}

export function cancelAnonymousSupportThread(payload = {}) {
  const prelaunchClient = getPrelaunchClient();
  if (!prelaunchClient) return Promise.resolve({ ok: false, error: "missing_env" });
  return prelaunchClient.support.cancelAnonymousThread(payload);
}

export function getAnonymousSupportThreadStatus(payload = {}) {
  const prelaunchClient = getPrelaunchClient();
  if (!prelaunchClient) return Promise.resolve({ ok: false, error: "missing_env" });
  return prelaunchClient.support.getAnonymousThreadStatus(payload);
}
