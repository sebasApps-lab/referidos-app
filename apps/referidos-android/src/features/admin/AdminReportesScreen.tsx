import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import AdminCollectionScreen from "./components/AdminCollectionScreen";
import SectionCard from "@shared/ui/SectionCard";
import { fetchAdminReportes, updateAdminReporteStatus } from "@shared/services/adminOps";
import { formatDateTime, readFirst } from "@shared/services/entityQueries";
import { observability } from "@shared/services/mobileApi";
import { useModalStore } from "@shared/store/modalStore";
import { adminRuntimeStyles as shared } from "./components/adminRuntimeStyles";

const REPORTE_STATUS_OPTIONS = [
  { id: "abierto", label: "Abierto" },
  { id: "en_revision", label: "En revision" },
  { id: "resuelto", label: "Resuelto" },
];

export default function AdminReportesScreen() {
  const openPicker = useModalStore((state) => state.openPicker);
  const openAlert = useModalStore((state) => state.openAlert);
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [busyId, setBusyId] = useState("");

  const loadRows = useCallback(async () => {
    if (!refreshing) setLoading(true);
    const result = await fetchAdminReportes(120);
    if (!result.ok) {
      setRows([]);
      setError(result.error || "No se pudo cargar reportes.");
      setLoading(false);
      return;
    }
    setRows(result.data || []);
    setError("");
    setLoading(false);
  }, [refreshing]);

  const refreshAll = useCallback(async () => {
    setRefreshing(true);
    await loadRows();
    setRefreshing(false);
  }, [loadRows]);

  useEffect(() => {
    void refreshAll();
  }, [refreshAll]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return rows.filter((row) => {
      const summary = String(readFirst(row, ["texto", "descripcion", "detalle"], "")).toLowerCase();
      const target = String(readFirst(row, ["targettype", "target_type"], "")).toLowerCase();
      const targetId = String(readFirst(row, ["targetid", "target_id"], "")).toLowerCase();
      const reporter = String(readFirst(row, ["reporterid", "reporter_id"], "")).toLowerCase();
      const status = String(readFirst(row, ["estado"], "abierto")).trim();
      const matchesQuery =
        !term ||
        summary.includes(term) ||
        target.includes(term) ||
        targetId.includes(term) ||
        reporter.includes(term);
      const matchesStatus = statusFilter === "todos" || status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, rows, statusFilter]);

  const metrics = useMemo(() => {
    const byStatus: Record<string, number> = {
      abierto: 0,
      en_revision: 0,
      resuelto: 0,
    };
    rows.forEach((row) => {
      const status = String(readFirst(row, ["estado"], "abierto")).trim().toLowerCase();
      if (status in byStatus) byStatus[status] += 1;
    });
    return [
      { label: "Total", value: rows.length },
      { label: "Abiertos", value: byStatus.abierto },
      { label: "Revision", value: byStatus.en_revision },
      { label: "Resueltos", value: byStatus.resuelto },
    ];
  }, [rows]);

  const handleChangeStatus = useCallback(
    (row: any) => {
      const reporteId = String(readFirst(row, ["id"], "")).trim();
      const currentStatus = String(readFirst(row, ["estado"], "abierto")).trim();
      if (!reporteId) return;

      openPicker({
        title: "Estado del reporte",
        message: "Actualiza el estado operativo del reporte.",
        options: REPORTE_STATUS_OPTIONS.map((item) => ({
          id: item.id,
          label: item.label,
        })),
        selectedId: currentStatus,
        onSelect: async (nextStatus) => {
          setBusyId(reporteId);
          try {
            await updateAdminReporteStatus(reporteId, nextStatus);
            setRows((current) =>
              current.map((item) =>
                String(readFirst(item, ["id"], "")) === reporteId
                  ? { ...item, estado: nextStatus }
                  : item,
              ),
            );
            await observability.track({
              level: "info",
              category: "audit",
              message: "admin_reporte_status_updated",
              context: {
                reporte_id: reporteId,
                status: nextStatus,
              },
            });
          } catch (statusError: any) {
            openAlert({
              title: "No se pudo actualizar",
              message: String(statusError?.message || statusError || "No se pudo actualizar."),
              tone: "warning",
            });
          } finally {
            setBusyId("");
          }
        },
      });
    },
    [openAlert, openPicker],
  );

  return (
    <AdminCollectionScreen
      title="Admin Reportes"
      subtitle="Quejas y casos pendientes"
      searchPlaceholder="Buscar reporte, objetivo o reporter"
      query={query}
      onQueryChange={setQuery}
      loading={loading}
      refreshing={refreshing}
      error={error}
      metrics={metrics}
      filters={[
        {
          title: "Estado",
          selectedId: statusFilter,
          onSelect: setStatusFilter,
          options: [{ id: "todos", label: "Todos" }, ...REPORTE_STATUS_OPTIONS],
        },
      ]}
      onRefresh={() => void refreshAll()}
      emptyText={!loading && filtered.length === 0 ? "No hay reportes para este filtro." : ""}
    >
      <SectionCard title="Listado" subtitle={`Reportes encontrados: ${filtered.length}`}>
        <View style={shared.listWrap}>
          {filtered.map((row, index) => {
            const reporteId = String(readFirst(row, ["id"], "")).trim();
            const code = String(readFirst(row, ["public_id", "id"], "REP"));
            const status = String(readFirst(row, ["estado"], "abierto"));
            return (
              <View key={`${code}-${index}`} style={shared.card}>
                <View style={shared.badgeRow}>
                  <View style={shared.codePill}>
                    <Text style={shared.codePillText}>{code}</Text>
                  </View>
                  <View style={shared.badge}>
                    <Text style={shared.badgeText}>
                      {busyId === reporteId ? "..." : status}
                    </Text>
                  </View>
                </View>
                <Text style={shared.bodyText} numberOfLines={2}>
                  {String(readFirst(row, ["texto", "descripcion", "detalle"], "Sin detalle"))}
                </Text>
                <Text style={shared.metaText}>
                  reporter: {String(readFirst(row, ["reporterid", "reporter_id"], "sin reporter"))}
                </Text>
                <Text style={shared.metaText}>
                  objetivo: {String(readFirst(row, ["targettype", "target_type"], "-"))} /{" "}
                  {String(readFirst(row, ["targetid", "target_id"], "-"))}
                </Text>
                <Text style={shared.metaText}>
                  fecha: {formatDateTime(readFirst(row, ["created_at", "fecha"], null))}
                </Text>
                <View style={shared.actionsRow}>
                  <Pressable
                    onPress={() => handleChangeStatus(row)}
                    disabled={busyId === reporteId}
                    style={[shared.secondaryBtn, busyId === reporteId && shared.btnDisabled]}
                  >
                    <Text style={shared.secondaryBtnText}>
                      {busyId === reporteId ? "..." : "Actualizar estado"}
                    </Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>
      </SectionCard>
    </AdminCollectionScreen>
  );
}
