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

export async function linkAnonymousThreadToUser(supabase, payload = {}) {
  return invokeSupport(supabase, "support-link-anon-to-user", payload);
}
