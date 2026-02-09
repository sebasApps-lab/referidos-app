export async function getAccessToken(supabase) {
  const { data: { session } = {} } = await supabase.auth.getSession();
  return session?.access_token || null;
}

export async function invokeWithSession(supabase, fnName, { body } = {}) {
  const accessToken = await getAccessToken(supabase);
  if (!accessToken) return { ok: false, error: "no_session" };

  const { data, error } = await supabase.functions.invoke(fnName, {
    headers: { Authorization: `Bearer ${accessToken}` },
    body,
  });

  if (error) {
    return { ok: false, error: error.message || String(error) };
  }
  return { ok: true, data: data ?? null };
}
