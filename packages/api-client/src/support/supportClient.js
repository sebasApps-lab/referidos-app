import { invokeWithSession } from "../clients/sessionHelpers.js";

async function invokeSupport(supabase, fnName, payload = {}) {
  return invokeWithSession(supabase, fnName, { body: payload });
}

async function invokeSupportPublic(supabase, fnName, payload = {}) {
  const { data, error } = await supabase.functions.invoke(fnName, {
    body: payload,
  });
  if (error) {
    return { ok: false, error: error.message || String(error) };
  }
  return { ok: true, data: data ?? null };
}

export async function createSupportThread(supabase, payload) {
  return invokeSupport(supabase, "support-create-thread", payload);
}

export async function assignSupportThread(supabase, payload) {
  return invokeSupport(supabase, "support-assign-thread", payload);
}

export async function updateSupportStatus(supabase, payload) {
  return invokeSupport(supabase, "support-update-status", payload);
}

export async function addSupportNote(supabase, payload) {
  return invokeSupport(supabase, "support-add-note", payload);
}

export async function closeSupportThread(supabase, payload) {
  return invokeSupport(supabase, "support-close-thread", payload);
}

export async function createIrregularThread(supabase, payload) {
  return invokeSupport(supabase, "support-create-irregular-thread", payload);
}

export async function startSupportSession(supabase, payload = {}) {
  return invokeSupport(supabase, "support-start-session", payload);
}

export async function endSupportSession(supabase, payload = {}) {
  return invokeSupport(supabase, "support-end-session", payload);
}

export async function pingSupportSession(supabase) {
  return invokeSupport(supabase, "support-agent-ping", {});
}

export async function startAdminSupportSession(supabase, payload = {}) {
  return invokeSupport(supabase, "support-admin-start-session", payload);
}

export async function endAdminSupportSession(supabase, payload = {}) {
  return invokeSupport(supabase, "support-admin-end-session", payload);
}

export async function pingAdminSupportSession(supabase, payload = {}) {
  return invokeSupport(supabase, "support-admin-ping", payload);
}

export async function denyAdminSupportSession(supabase, payload = {}) {
  return invokeSupport(supabase, "support-admin-deny-session", payload);
}

export async function createSupportAdminUser(supabase, payload = {}) {
  return invokeSupport(supabase, "support-admin-create-user", payload);
}

export async function cancelSupportThread(supabase, payload = {}) {
  return invokeSupport(supabase, "support-cancel-thread", payload);
}

export async function createAnonymousSupportThread(supabase, payload = {}) {
  return invokeSupportPublic(supabase, "support-create-anon-thread", payload);
}

export async function getAnonymousSupportThreadStatus(supabase, payload = {}) {
  return invokeSupportPublic(supabase, "support-anon-thread-status", payload);
}

export async function requestSupportThreadRetake(supabase, payload = {}) {
  return invokeSupportPublic(supabase, "support-retake-thread", payload);
}

export async function markSupportOpeningMessageSent(supabase, payload = {}) {
  return invokeSupport(supabase, "support-opening-message-sent", payload);
}

export async function markSupportWhatsAppNameChanged(supabase, payload = {}) {
  return invokeSupport(supabase, "support-whatsapp-name-updated", payload);
}

export async function sendSupportWorkflowAction(supabase, payload = {}) {
  return invokeSupport(supabase, "support-thread-workflow-action", payload);
}

export async function setSupportAutoAssignMode(supabase, payload = {}) {
  return invokeSupport(supabase, "support-set-auto-assign-mode", payload);
}

export async function linkAnonymousThreadToUser(supabase, payload = {}) {
  return invokeSupport(supabase, "support-link-anon-to-user", payload);
}

export async function trackSupportMacroEvents(
  supabase,
  { events = [] } = {},
) {
  if (!Array.isArray(events) || events.length === 0) {
    return { ok: true, data: { inserted: 0 } };
  }

  const payload = events
    .filter((event) => event && typeof event === "object")
    .map((event) => ({
      macro_id: event.macro_id,
      macro_code: event.macro_code,
      category_code: event.category_code || null,
      thread_public_id: event.thread_public_id || null,
      event_type: event.event_type,
      app_key: event.app_key,
      env_key: event.env_key,
      metadata: event.metadata || {},
    }))
    .filter(
      (event) =>
        typeof event.macro_id === "string" &&
        typeof event.macro_code === "string" &&
        typeof event.event_type === "string" &&
        typeof event.app_key === "string" &&
        typeof event.env_key === "string",
    );

  if (!payload.length) {
    return { ok: true, data: { inserted: 0 } };
  }

  const { error } = await supabase
    .from("support_macro_usage_events")
    .insert(payload);

  if (error) {
    return { ok: false, error: error.message || String(error) };
  }

  return { ok: true, data: { inserted: payload.length } };
}
