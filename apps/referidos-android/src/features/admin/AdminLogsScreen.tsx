import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, Text, useWindowDimensions } from "react-native";
import StaffSelect from "@features/staff/StaffSelect";
import StaffTable, { StaffTableBadge, type StaffTableColumn } from "@features/staff/StaffTable";
import StaffTablePage, { StaffTableDetails, tableText } from "@features/staff/StaffTablePage";
import { formatDateTime } from "@shared/services/entityQueries";
import { supabase } from "@shared/services/mobileApi";
import { fetchSupportLogEvents } from "@shared/services/supportDeskQueries";

type LogRow = {
  id: string;
  level?: string;
  category?: string;
  message?: string;
  route?: string;
  screen?: string;
  source?: string;
  app_id?: string;
  user_id?: string;
  user_ref?: { public_user_id?: unknown };
  thread_id?: string;
  occurred_at?: string;
  created_at?: string;
  release_version_label?: string;
  resolved_component_key?: string;
};

const LEVELS = [
  { id: "todos", label: "Todos" },
  { id: "error", label: "Error/Fatal" },
  { id: "warn", label: "Warn" },
  { id: "info", label: "Info" },
  { id: "debug", label: "Debug" },
] as const;

type LevelFilter = (typeof LEVELS)[number]["id"];

function getLevel(row: LogRow) {
  return String(row.level || "info").trim().toLowerCase();
}

function isErrorLevel(level: string) {
  return level === "error" || level === "fatal";
}

function actorLabel(row: LogRow) {
  const id = row.user_ref?.public_user_id;
  const publicId = typeof id === "string" ? id.trim() : "";
  return publicId || (row.user_id ? `user:${row.user_id.slice(0, 8)}` : "Anónimo");
}

function ticketLabel(row: LogRow) {
  return row.thread_id ? `Ticket ${row.thread_id.slice(0, 8)}` : "Sin ticket";
}

export default function AdminLogsScreen() {
  const { width } = useWindowDimensions();
  const [rows, setRows] = useState<LogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("todos");
  const [selected, setSelected] = useState<LogRow | null>(null);
  const pending = useRef(false);

  const loadRows = useCallback(async () => {
    if (pending.current) return;
    pending.current = true;
    try {
      const { data, error: requestError } = await supabase
        .from("support_log_events")
        .select("id, level, category, message, occurred_at, created_at, route, source, app_id, user_id, user_ref, thread_id, release_version_label, resolved_component_key")
        .order("occurred_at", { ascending: false })
        .limit(200);
      if (requestError) {
        const unavailableView = ["42P01", "42703", "PGRST204", "PGRST205"].includes(requestError.code);
        if (!unavailableView) throw requestError;
        const fallback = await fetchSupportLogEvents(supabase, { limit: 120 });
        if (!fallback.ok) throw new Error(fallback.error || "No se pudieron cargar los logs.");
        setRows(fallback.data);
      } else {
        setRows(data || []);
      }
      setError("");
    } catch (cause) {
      const message = (cause as { message?: string } | undefined)?.message;
      setError(message || "No se pudieron cargar los logs.");
    } finally {
      pending.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRows();
  }, [loadRows]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return rows.filter((row) => {
      const level = getLevel(row);
      const matchesLevel = levelFilter === "todos" || (levelFilter === "error" ? isErrorLevel(level) : levelFilter === level);
      const matchesQuery = !term || [row.category, row.message, row.route, row.screen, actorLabel(row), row.thread_id, row.resolved_component_key, row.release_version_label]
        .some((value) => value?.toLowerCase().includes(term));
      return matchesLevel && matchesQuery;
    });
  }, [levelFilter, query, rows]);

  const wide = width >= 768;
  const columns: StaffTableColumn<LogRow>[] = [
    {
      key: "event", label: "Evento", width: wide ? 255 : 148,
      render: (row) => (
        <Pressable accessibilityRole="button" onPress={() => setSelected(row)}>
          <Text style={tableText.name} numberOfLines={2}>{row.category || "General"}</Text>
          <Text style={tableText.metadata} numberOfLines={2}>{row.message || "—"}</Text>
        </Pressable>
      ),
    },
    {
      key: "actor", label: "Actor", width: wide ? 140 : 98,
      render: (row) => (
        <>
          <Text style={tableText.metadata} numberOfLines={2}>{actorLabel(row)}</Text>
          <Text style={tableText.metadata} numberOfLines={1}>{ticketLabel(row)}</Text>
        </>
      ),
    },
    {
      key: "status", label: "Estado", width: 84,
      render: (row) => {
        const level = getLevel(row);
        return <StaffTableBadge value={level} tone={isErrorLevel(level) ? "danger" : level === "warn" ? "warning" : "neutral"} />;
      },
    },
  ];
  if (wide) {
    columns.push(
      { key: "date", label: "Fecha", width: 150, render: (row) => <Text style={tableText.metadata}>{formatDateTime(row.occurred_at || row.created_at)}</Text> },
      { key: "source", label: "Origen", width: 155, render: (row) => <Text style={tableText.metadata}>{row.route || row.source || "—"}</Text> },
    );
  }

  return (
    <>
      <StaffTablePage
        title="Logs"
        subtitle="Auditoría del sistema"
        description="Eventos de soporte unificados desde observabilidad."
        searchPlaceholder="Buscar por categoría, mensaje, ruta, actor o ticket"
        query={query}
        onChangeQuery={setQuery}
        filters={<StaffSelect label="Nivel" value={levelFilter} options={LEVELS} onSelect={setLevelFilter} />}
        loading={loading}
        error={error}
        onRefresh={() => void loadRows()}
      >
        <StaffTable columns={columns} rows={filtered} getKey={(row) => row.id} emptyMessage="Sin eventos para estos filtros." />
        <Text style={tableText.metadata}>{filtered.length} de {rows.length} eventos recientes</Text>
      </StaffTablePage>
      {selected ? (
        <StaffTableDetails title={selected.category || "General"} caption="Evento de soporte" onClose={() => setSelected(null)}>
          <Text style={tableText.name}>{selected.message || "Sin mensaje"}</Text>
          <Text style={tableText.metadata}>{formatDateTime(selected.occurred_at || selected.created_at)}</Text>
          <Text style={tableText.metadata}>{actorLabel(selected)} · {ticketLabel(selected)}</Text>
          {selected.route ? <Text style={tableText.metadata}>Ruta · {selected.route}</Text> : null}
          {selected.screen ? <Text style={tableText.metadata}>Pantalla · {selected.screen}</Text> : null}
          {selected.app_id ? <Text style={tableText.metadata}>Aplicación · {selected.app_id}</Text> : null}
          {selected.source ? <Text style={tableText.metadata}>Origen · {selected.source}</Text> : null}
          {selected.release_version_label ? <Text style={tableText.metadata}>Versión · {selected.release_version_label}</Text> : null}
          {selected.resolved_component_key ? <Text style={tableText.metadata}>Componente · {selected.resolved_component_key}</Text> : null}
        </StaffTableDetails>
      ) : null}
    </>
  );
}
