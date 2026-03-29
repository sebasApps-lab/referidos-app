import { supabase } from "../../../lib/supabaseClient";
import { logCatalogBreadcrumb } from "../../../services/loggingClient";

export async function createSupportChatThread(payload) {
  logCatalogBreadcrumb("support.ticket.create.start", {
    category: payload?.category || null,
    has_summary: Boolean(payload?.summary),
  });
  const { data, error } = await supabase.functions.invoke(
    "support-create-thread",
    { body: payload }
  );
  if (error) {
    logCatalogBreadcrumb("support.ticket.create.error", {
      category: payload?.category || null,
      error: error.message || "support_create_failed",
    });
    return { ok: false, error: error.message };
  }
  logCatalogBreadcrumb("support.ticket.create.ok", {
    category: payload?.category || null,
    thread_public_id: data?.thread_public_id || null,
    status: data?.status || null,
  });
  return { ok: true, data };
}

export async function fetchSupportChatTickets() {
  logCatalogBreadcrumb("support.ticket.list.start");
  const { data, error } = await supabase
    .from("support_threads_public")
    .select(
      "public_id, category, severity, status, summary, created_at, closed_at, resolution, assigned_agent_phone, wa_message_text, wa_link, personal_queue, app_channel, retake_requested_at, released_to_general_at, general_queue_entered_at"
    )
    .order("created_at", { ascending: false });
  if (error) {
    logCatalogBreadcrumb("support.ticket.list.error", {
      error: error.message || "support_list_failed",
    });
    return { ok: false, error: error.message };
  }
  logCatalogBreadcrumb("support.ticket.list.ok", {
    count: Array.isArray(data) ? data.length : 0,
  });
  return { ok: true, data: data || [] };
}

export async function requestSupportChatRetake(payload = {}) {
  logCatalogBreadcrumb("support.ticket.retake.start", {
    thread_public_id: payload?.thread_public_id || null,
  });
  const { data, error } = await supabase.functions.invoke("support-retake-thread", {
    body: payload,
  });
  if (error) {
    logCatalogBreadcrumb("support.ticket.retake.error", {
      thread_public_id: payload?.thread_public_id || null,
      error: error.message || "support_retake_failed",
    });
    return { ok: false, error: error.message };
  }
  logCatalogBreadcrumb("support.ticket.retake.ok", {
    thread_public_id: payload?.thread_public_id || null,
    estimated_delay_seconds: data?.estimated_delay_seconds || null,
  });
  return { ok: true, data };
}
