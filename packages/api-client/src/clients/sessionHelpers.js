export async function getAccessToken(supabase) {
  const { data: { session } = {} } = await supabase.auth.getSession();
  return session?.access_token || null;
}

export async function invokeWithSession(supabase, fnName, { body, timeout } = {}) {
  const accessToken = await getAccessToken(supabase);
  if (!accessToken) return { ok: false, error: "no_session" };

  const { data, error, response } = await supabase.functions.invoke(fnName, {
    headers: { Authorization: `Bearer ${accessToken}` },
    body,
    ...(timeout ? { timeout } : {}),
  });

  if (error) {
    return {
      ok: false,
      error: error.message || String(error),
      errorType: error.name,
      status: response?.status ?? error.context?.status,
    };
  }
  return { ok: true, data: data ?? null };
}
