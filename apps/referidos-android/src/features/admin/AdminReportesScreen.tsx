import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import StaffSelect from "@features/staff/StaffSelect";
import StaffTable, { StaffTableBadge, type StaffTableColumn } from "@features/staff/StaffTable";
import StaffTablePage, { tableText } from "@features/staff/StaffTablePage";
import { fetchAdminReportes, updateAdminReporteStatus } from "@shared/services/adminOps";
import { formatDateTime, readFirst } from "@shared/services/entityQueries";
import { observability } from "@shared/services/mobileApi";
import { useModalStore } from "@shared/store/modalStore";

const REPORTE_STATUS_OPTIONS = [
  { id: "abierto", label: "Abierto" },
  { id: "en_revision", label: "En revisión" },
  { id: "resuelto", label: "Resuelto" },
] as const;

const REPORTE_STATUS_FILTERS = [{ id: "todos", label: "Todos" }, ...REPORTE_STATUS_OPTIONS] as const;
type StatusFilter = (typeof REPORTE_STATUS_FILTERS)[number]["id"];

function reportView(row: Record<string, unknown>) {
  const id = String(readFirst(row, ["id"], "")).trim();
  const code = String(readFirst(row, ["public_id", "id"], "—"));
  const reporterId = String(readFirst(row, ["reporterid", "reporter_id", "reporterId"], ""));
  return {
    id,
    key: id || code,
    code,
    summary: String(readFirst(row, ["texto", "descripcion", "detalle"], "Sin detalle")),
    reporter: String(readFirst(row, ["reporter_nombre", "reporter_name"], reporterId || "—")),
    reporterId,
    reporterRole: String(readFirst(row, ["reporterrole", "reporter_role", "reporterRole"], "")),
    targetType: String(readFirst(row, ["targettype", "target_type", "targetType"], "—")),
    targetId: String(readFirst(row, ["targetid", "target_id", "targetId"], "—")),
    status: String(readFirst(row, ["estado", "status"], "abierto")).trim().toLowerCase(),
    createdAt: readFirst(row, ["created_at", "fechacreacion", "fecha_creacion", "fechaCreacion", "fecha"], null),
  };
}

type Report = ReturnType<typeof reportView>;

function reportStatusLabel(status: string) {
  return REPORTE_STATUS_OPTIONS.find((item) => item.id === status)?.label || status;
}

function reportStatusTone(status: string) {
  if (status === "abierto") return "danger";
  if (status === "en_revision") return "warning";
  return status === "resuelto" ? "positive" : "neutral";
}

export default function AdminReportesScreen() {
  const { width } = useWindowDimensions();
  const openPicker = useModalStore((state) => state.openPicker);
  const openAlert = useModalStore((state) => state.openAlert);
  const [rows, setRows] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos");
  const [busyId, setBusyId] = useState("");
  const activeRequest = useRef<"reload" | "update" | null>(null);

  const loadRows = useCallback(async (manual = false) => {
    if (activeRequest.current) return;
    activeRequest.current = "reload";
    if (manual) setRefreshing(true);
    try {
      const result = await fetchAdminReportes(120);
      if (result.ok) {
        setRows((result.data || []).map(reportView));
        setError("");
      } else {
        setError(result.error || "No se pudieron cargar los reportes.");
      }
    } catch {
      setError("No se pudieron cargar los reportes.");
    } finally {
      activeRequest.current = null;
      setLoading(false);
      if (manual) setRefreshing(false);
    }
  }, []);

  useEffect(() => { void loadRows(); }, [loadRows]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return rows.filter((row) => (
      (statusFilter === "todos" || row.status === statusFilter) &&
      [row.code, row.summary, row.reporter, row.reporterId, row.targetType, row.targetId]
        .some((value) => value.toLowerCase().includes(term))
    ));
  }, [query, rows, statusFilter]);
  const openTotal = rows.filter((row) => row.status === "abierto").length;
  const reviewTotal = rows.filter((row) => row.status === "en_revision").length;
  const resolvedTotal = rows.filter((row) => row.status === "resuelto").length;

  const handleChangeStatus = useCallback((row: Report) => {
    if (!row.id || activeRequest.current) return;

    openPicker({
      title: "Estado del reporte",
      message: "Selecciona el estado operativo del reporte.",
      options: REPORTE_STATUS_OPTIONS.map((option) => ({ ...option })),
      selectedId: row.status,
      onSelect: async (nextStatus) => {
        if (activeRequest.current || nextStatus === row.status) return;

        activeRequest.current = "update";
        setBusyId(row.id);
        try {
          await updateAdminReporteStatus(row.id, nextStatus);
          setRows((current) => current.map((item) => item.id === row.id ? { ...item, status: nextStatus } : item));
          void observability.track({
            level: "info",
            category: "audit",
            message: "admin_reporte_status_updated",
            context: { reporte_id: row.id, status: nextStatus },
          }).catch(() => undefined);
        } catch (statusError) {
          openAlert({
            title: "No se pudo actualizar",
            message: statusError instanceof Error ? statusError.message : "No se pudo actualizar el reporte.",
            tone: "warning",
          });
        } finally {
          activeRequest.current = null;
          setBusyId("");
        }
      },
    });
  }, [openAlert, openPicker]);

  const columns: StaffTableColumn<Report>[] = [
    { key: "report", label: "Reporte", width: 180, render: (row) => (
      <View>
        <Text style={tableText.name} numberOfLines={1}>{row.code}</Text>
        <Text style={tableText.metadata} numberOfLines={2}>{row.summary}</Text>
      </View>
    ) },
    { key: "reporter", label: "Reporter", width: 133, render: (row) => (
      <Text style={tableText.metadata} numberOfLines={2}>
        {row.reporter}{row.reporterRole ? ` (${row.reporterRole})` : ""}
      </Text>
    ) },
    { key: "target", label: "Objetivo", width: 133, render: (row) => (
      <Text style={tableText.metadata} numberOfLines={2}>{row.targetType} / {row.targetId}</Text>
    ) },
    { key: "status", label: "Estado", width: 114, render: (row) => (
      <StaffTableBadge value={reportStatusLabel(row.status)} tone={reportStatusTone(row.status)} />
    ) },
  ];
  if (width >= 768) columns.push({ key: "created", label: "Fecha", width: 148, render: (row) => (
    <Text style={tableText.metadata}>{formatDateTime(row.createdAt)}</Text>
  ) });
  columns.push({ key: "action", label: "Acciones", width: 122, align: "right", render: (row) => {
    const disabled = !row.id || refreshing || Boolean(busyId);
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Revisar reporte ${row.code}`}
        disabled={disabled} onPress={() => handleChangeStatus(row)} style={[tableText.action, disabled && tableText.actionDisabled]}>
        <Text style={tableText.actionLabel}>{busyId && busyId === row.id ? "Actualizando…" : "Revisar"}</Text>
      </Pressable>
    );
  } });

  return (
    <StaffTablePage
      title="Reportes"
      subtitle="Quejas y casos pendientes"
      description="Gestión de quejas y moderación de contenido."
      searchPlaceholder="Buscar reporte"
      query={query}
      onChangeQuery={setQuery}
      filters={<StaffSelect label="Estado" value={statusFilter} options={REPORTE_STATUS_FILTERS} onSelect={setStatusFilter} />}
      loading={loading}
      error={error}
      onRefresh={loading || refreshing || busyId ? undefined : () => { void loadRows(true); }}
    >
      <StaffTable columns={columns} rows={filtered} getKey={(row) => row.key} emptyMessage="No hay reportes para los filtros actuales." />
      {rows.length > 0 && (
        <Text style={tableText.metadata}>{filtered.length} de {rows.length} reportes · {openTotal} abiertos · {reviewTotal} en revisión · {resolvedTotal} resueltos</Text>
      )}
    </StaffTablePage>
  );
}
