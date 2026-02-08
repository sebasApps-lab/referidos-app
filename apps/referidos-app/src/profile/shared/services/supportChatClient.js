import { supabase } from "../../../lib/supabaseClient";

export async function createSupportChatThread(payload) {
  const { data, error } = await supabase.functions.invoke(
    "support-create-thread",
    { body: payload }
  );
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, data };
}

export async function fetchSupportChatTickets() {
  const { data, error } = await supabase
    .from("support_threads_public")
    .select(
      "public_id, category, severity, status, summary, created_at, closed_at, resolution, assigned_agent_phone, wa_message_text, wa_link"
    )
    .order("created_at", { ascending: false });
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, data: data || [] };
}
