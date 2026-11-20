import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import StaffSelect from "@features/staff/StaffSelect";
import StaffTable, { StaffTableBadge, type StaffTableColumn } from "@features/staff/StaffTable";
import StaffTablePage, { tableText } from "@features/staff/StaffTablePage";
import { supabase } from "@shared/services/mobileApi";
import { fetchSupportErrorCatalog } from "@shared/services/supportDeskQueries";
import { formatDateTime, readFirst } from "@shared/services/entityQueries";

const STATUS_OPTIONS = [
  { id: "todos", label: "Todos" },
  { id: "pending", label: "Pending" },
  { id: "defined", label: "Defined" },
  { id: "ignored", label: "Ignored" },
] as const;

type StatusFilter = (typeof STATUS_OPTIONS)[number]["id"];

function catalogView(row: Record<string, unknown>) {
  const context = row.sample_context as Record<string, unknown> | null;
  return {
    id: String(readFirst(row, ["id", "error_code"], "")),
    code: String(readFirst(row, ["error_code"], "unknown_error")),
    status: String(readFirst(row, ["status"], "pending")).trim().toLowerCase(),
    total: Number(readFirst(row, ["count_total"], 0)),
    source: String(readFirst(row, ["source_hint"], "")),
    route: String(readFirst(row, ["sample_route"], "")),
    message: String(readFirst(row, ["sample_message"], "")),
    category: String(readFirst(context, ["category"], "")),
    lastSeen: readFirst(row, ["last_seen_at"], null),
  };
}

type CatalogEntry = ReturnType<typeof catalogView>;

function statusTone(status: string) {
  if (status === "defined") return "positive";
  return status === "pending" ? "warning" : "neutral";
}

export default function AdminErrorCatalogScreen() {
  const { width } = useWindowDimensions();
  const [rows, setRows] = useState<CatalogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos");
  const activeRequest = useRef(false);

  const loadRows = useCallback(async (manual = false) => {
    if (activeRequest.current) return;
    activeRequest.current = true;
    if (manual) setRefreshing(true);
    try {
      const result = await fetchSupportErrorCatalog(supabase, 250);
      if (result.ok) {
        setRows((result.data || []).map(catalogView));
        setError("");
      } else {
        setError(result.error || "No se pudo cargar el catálogo.");
      }
    } catch {
      setError("No se pudo cargar el catálogo.");
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
      (statusFilter === "todos" || row.status === statusFilter) &&
      [row.code, row.status, row.message, row.route, row.category]
        .some((value) => value.toLowerCase().includes(term))
    ));
  }, [query, rows, statusFilter]);

  const columns: StaffTableColumn<CatalogEntry>[] = [
    { key: "code", label: "Error code", width: 192, render: (row) => (
      <View>
        <Text style={tableText.name} numberOfLines={2}>{row.code}</Text>
        <Text style={tableText.metadata} numberOfLines={1}>{row.route || "—"}</Text>
        {width < 768 ? <Text style={tableText.metadata} numberOfLines={2}>{row.message || "—"}</Text> : null}
      </View>
    ) },
    { key: "status", label: "Estado", width: 106, render: (row) => <StaffTableBadge value={row.status} tone={statusTone(row.status)} /> },
    { key: "total", label: "Total", width: 80, render: (row) => <Text style={tableText.metadata}>{row.total}</Text> },
    { key: "category", label: "Categoría", width: 118, render: (row) => <Text style={tableText.metadata} numberOfLines={2}>{row.category || "—"}</Text> },
    { key: "source", label: "Origen", width: 118, render: (row) => <Text style={tableText.metadata} numberOfLines={2}>{row.source || "—"}</Text> },
  ];
  if (width >= 768) columns.push(
    { key: "last", label: "Último visto", width: 148, render: (row) => <Text style={tableText.metadata}>{formatDateTime(row.lastSeen)}</Text> },
    { key: "sample", label: "Muestra", width: 230, render: (row) => (
      <Text style={tableText.metadata} numberOfLines={2}>{row.message || "—"}</Text>
    ) },
  );

  return (
    <StaffTablePage
      title="Error codes"
      subtitle="Errores detectados, pendientes y definidos"
      description="Catálogo de códigos de error observados."
      searchPlaceholder="Buscar por código, estado, ruta o mensaje"
      query={query}
      onChangeQuery={setQuery}
      loading={loading}
      error={error}
      filters={<StaffSelect label="Estado" value={statusFilter} options={STATUS_OPTIONS} onSelect={setStatusFilter} />}
      onRefresh={loading || refreshing ? undefined : () => { void loadRows(true); }}
    >
      <StaffTable columns={columns} rows={filtered} getKey={(row) => row.id} emptyMessage="No hay errores para este filtro." />
    </StaffTablePage>
  );
}
