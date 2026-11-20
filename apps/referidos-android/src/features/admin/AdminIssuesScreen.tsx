import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, Text, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import StaffSelect from "@features/staff/StaffSelect";
import StaffTable, { StaffTableBadge, type StaffTableColumn } from "@features/staff/StaffTable";
import StaffTablePage, { tableText } from "@features/staff/StaffTablePage";
import { STACK_ROUTES } from "@navigation/routeKeys";
import { supabase } from "@shared/services/mobileApi";
import { fetchSupportIssuesContext } from "@shared/services/supportDeskQueries";
import { formatDateTime, readFirst } from "@shared/services/entityQueries";

const LEVEL_OPTIONS = [
  { id: "todos", label: "Todos" },
  { id: "fatal", label: "Fatal" },
  { id: "error", label: "Error" },
  { id: "warn", label: "Warn" },
  { id: "info", label: "Info" },
  { id: "debug", label: "Debug" },
] as const;

type LevelFilter = (typeof LEVEL_OPTIONS)[number]["id"];

function issueView(row: Record<string, unknown>) {
  return {
    id: String(readFirst(row, ["id"], "")).trim(),
    title: String(readFirst(row, ["title"], "Issue")),
    user: String(readFirst(row, ["last_user_display_name", "last_user_email"], "—")),
    level: String(readFirst(row, ["level"], "info")).trim().toLowerCase(),
    status: String(readFirst(row, ["status"], "—")),
    release: String(readFirst(row, ["last_release"], "—")),
    total: Number(readFirst(row, ["count_total"], 0)),
    lastDay: Number(readFirst(row, ["count_24h"], 0)),
    lastSeen: readFirst(row, ["last_seen_at"], null),
  };
}

type Issue = ReturnType<typeof issueView>;

function levelTone(level: string) {
  if (level === "fatal" || level === "error") return "danger";
  return level === "warn" ? "warning" : "neutral";
}

export default function AdminIssuesScreen() {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();
  const [rows, setRows] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("todos");
  const activeRequest = useRef(false);

  const loadRows = useCallback(async (manual = false) => {
    if (activeRequest.current) return;
    activeRequest.current = true;
    if (manual) setRefreshing(true);
    try {
      const result = await fetchSupportIssuesContext(supabase, 180);
      if (result.ok) {
        setRows((result.data || []).map(issueView));
        setError("");
      } else {
        setError(result.error || "No se pudieron cargar los issues.");
      }
    } catch {
      setError("No se pudieron cargar los issues.");
    } finally {
      activeRequest.current = false;
      setLoading(false);
      if (manual) setRefreshing(false);
    }
  }, []);

  useEffect(() => { void loadRows(); }, [loadRows]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return rows.filter((row) => (
      (levelFilter === "todos" || row.level === levelFilter) &&
      [row.title, row.id, row.status, row.level, row.release, row.user]
        .some((value) => value.toLowerCase().includes(term))
    ));
  }, [levelFilter, query, rows]);

  const columns: StaffTableColumn<Issue>[] = [
    { key: "issue", label: "Issue", width: 225, render: (row) => (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Ver eventos de ${row.title}`}
        disabled={!row.id}
        onPress={() => navigation.navigate(STACK_ROUTES.ADMIN.ISSUE_EVENTS, { issueId: row.id, issueTitle: row.title })}
      >
        <Text style={tableText.name} numberOfLines={2}>{row.title}</Text>
        <Text style={tableText.metadata} numberOfLines={1}>{row.id || "—"}</Text>
        {width < 768 ? <Text style={tableText.metadata}>{formatDateTime(row.lastSeen)}</Text> : null}
        <Text style={tableText.actionLabel}>Ver eventos</Text>
      </Pressable>
    ) },
    { key: "user", label: "Usuario", width: 146, render: (row) => <Text style={tableText.metadata} numberOfLines={2}>{row.user}</Text> },
    { key: "level", label: "Nivel", width: 94, render: (row) => <StaffTableBadge value={row.level} tone={levelTone(row.level)} /> },
    { key: "status", label: "Estado", width: 110, render: (row) => <Text style={tableText.metadata}>{row.status}</Text> },
    { key: "count", label: "Eventos", width: 120, render: (row) => <Text style={tableText.metadata}>{row.total} (24h: {row.lastDay})</Text> },
  ];
  if (width >= 768) columns.push({ key: "last", label: "Última vez", width: 148, render: (row) => (
    <Text style={tableText.metadata}>{formatDateTime(row.lastSeen)}</Text>
  ) });

  return (
    <StaffTablePage
      title="Issues"
      subtitle="Selecciona un issue para ver sus eventos"
      description="Agrupación de eventos de observabilidad."
      searchPlaceholder="Buscar por título, nivel o release"
      query={query}
      onChangeQuery={setQuery}
      loading={loading}
      error={error}
      filters={<StaffSelect label="Nivel" value={levelFilter} options={LEVEL_OPTIONS} onSelect={setLevelFilter} />}
      onRefresh={loading || refreshing ? undefined : () => { void loadRows(true); }}
    >
      <StaffTable columns={columns} rows={filtered} getKey={(row) => row.id} emptyMessage="No hay issues para este filtro." />
    </StaffTablePage>
  );
}
