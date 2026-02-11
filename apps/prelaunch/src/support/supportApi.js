const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY;

async function invokePublicFunction(fnName, payload = {}) {
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    return { ok: false, error: "missing_env" };
  }

  const response = await fetch(`${SUPABASE_URL}/functions/v1/${fnName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    return {
      ok: false,
      error: data?.error || data?.message || `http_${response.status}`,
      data,
    };
  }
  return { ok: true, data };
}

export function createAnonymousSupportThread(payload = {}) {
  return invokePublicFunction("support-create-anon-thread", payload);
}

export function getAnonymousSupportThreadStatus(payload = {}) {
  return invokePublicFunction("support-anon-thread-status", payload);
}

export function cancelAnonymousSupportThread(payload = {}) {
  return invokePublicFunction("support-anon-cancel-thread", payload);
}
