import { supabase } from "@shared/services/mobileApi";

export type DlqGroup = {
  group_key: string;
  reason?: string;
  domain?: string;
  source_project_ref?: string;
  source_env_key?: string;
  event_count?: number;
  approx_raw_event_bytes?: number;
};

export type DlqPreview = {
  summary?: {
    next_purge_at?: string;
    total_events?: number;
    total_groups?: number;
    approx_raw_event_bytes?: number;
  };
  groups?: DlqGroup[];
};

export type DlqEvent = {
  id?: string;
  source_event_key?: string;
  domain?: string;
  source_project_ref?: string;
  source_env_key?: string;
  source_app_id?: string;
  source_table?: string;
  source_row_id?: string;
  event_type?: string;
  retention_tier?: string;
  occurred_at?: string;
  created_at?: string;
  expires_at?: string;
  reason?: string;
  ingest_mode?: string;
  panel_key?: string;
  payload_type?: string;
  payload_key_count?: number;
  payload_size_bytes?: number;
  raw_event_size_bytes?: number;
  payload_keys?: string[];
};

async function readDlq<T>(action: "fetch_dlq_purge_preview" | "fetch_dlq_purge_events", payload: Record<string, string | number>) {
  const { data, error } = await supabase.functions.invoke("ops-telemetry-admin-proxy", {
    body: { action, payload },
    timeout: 20_000,
  });
  if (error || !data?.ok) throw new Error("No se pudo consultar la cola de telemetría.");
  return data.data as T;
}

export function fetchDlqPreview() {
  return readDlq<DlqPreview>("fetch_dlq_purge_preview", { limit: 12 });
}

export function fetchDlqEvents(groupKey: string, limit: number, offset: number) {
  return readDlq<{ events?: DlqEvent[]; total_count?: number; next_purge_at?: string }>(
    "fetch_dlq_purge_events",
    { groupKey, limit, offset },
  );
}

export function formatDlqBytes(value: unknown) {
  const bytes = Number(value);
  if (!Number.isFinite(bytes) || bytes < 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
}
