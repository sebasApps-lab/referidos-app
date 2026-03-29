export async function submitPublicFeedback(supabase, payload = {}) {
  const { data, error } = await supabase.functions.invoke("feedback-submit", {
    body: payload,
  });

  if (error) {
    return { ok: false, error: error.message || String(error), data: null };
  }

  return { ok: true, data: data ?? null };
}

export async function invokePublicFeedbackSubmit(invokePublic, payload = {}) {
  const response = await invokePublic("feedback-submit", payload);
  if (!response?.ok) {
    return { ok: false, error: response?.error || "request_failed" };
  }
  return response.data ?? { ok: false, error: "empty_response" };
}
