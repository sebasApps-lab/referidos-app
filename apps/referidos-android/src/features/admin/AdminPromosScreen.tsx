import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import StaffSelect from "@features/staff/StaffSelect";
import StaffSectionCard from "@features/staff/StaffSectionCard";
import StaffTable, { StaffTableBadge, type StaffTableColumn } from "@features/staff/StaffTable";
import StaffTablePage, { StaffTableDetails, tableText } from "@features/staff/StaffTablePage";
import { fetchAdminPromos } from "@shared/services/adminOps";
import { formatDateTime, readFirst, updatePromoStatusById } from "@shared/services/entityQueries";
import { observability, supabase } from "@shared/services/mobileApi";
import { useModalStore } from "@shared/store/modalStore";

const PROMO_STATUS_OPTIONS = [
  { id: "activo", label: "Activo" },
  { id: "pendiente", label: "Pendiente" },
  { id: "pausado", label: "Pausado" },
] as const;

const PROMO_STATUS_FILTERS = [{ id: "todos", label: "Todos" }, ...PROMO_STATUS_OPTIONS] as const;
type StatusFilter = (typeof PROMO_STATUS_FILTERS)[number]["id"];

function promoView(row: Record<string, unknown>) {
  const id = String(readFirst(row, ["id"], "")).trim();
  const publicId = String(readFirst(row, ["public_id", "id"], "—"));
  const start = String(readFirst(row, ["inicio", "fecha_inicio", "starts_at"], ""));
  const end = String(readFirst(row, ["fin", "fecha_fin", "ends_at", "expires_at"], ""));
  return {
    id,
    key: id || publicId,
    publicId,
    title: String(readFirst(row, ["titulo", "nombre", "title"], "Promo")),
    businessName: String(readFirst(row, ["nombreLocal", "nombre_local", "negocio_nombre", "negocioid", "negocio_id"], "Sin negocio")),
    businessId: String(readFirst(row, ["negocioid", "negocio_id", "negocioId"], "")),
    status: String(readFirst(row, ["estado", "status"], "pendiente")).trim().toLowerCase(),
    redemptions: String(readFirst(row, ["canjeados_count", "canjeadosCount", "canjeadoscount", "canjeados"], "—")),
    period: start || end ? `${start.slice(0, 10) || "—"} a ${end.slice(0, 10) || "—"}` : "—",
    createdAt: readFirst(row, ["created_at", "fecha_creacion", "fechacreacion", "fechaCreacion"], null),
    description: String(readFirst(row, ["descripcion", "description"], "Sin descripción")),
  };
}

type Promo = ReturnType<typeof promoView>;

function promoTone(status: string) {
  if (status === "activo") return "positive";
  if (status === "pendiente") return "warning";
  return status === "pausado" ? "danger" : "neutral";
}

export default function AdminPromosScreen() {
  const { width } = useWindowDimensions();
  const openPicker = useModalStore((state) => state.openPicker);
  const openAlert = useModalStore((state) => state.openAlert);
  const [rows, setRows] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos");
  const [busyId, setBusyId] = useState("");
  const [selectedKey, setSelectedKey] = useState("");
  const activeRequest = useRef<"reload" | "update" | null>(null);

  const loadRows = useCallback(async (manual = false) => {
    if (activeRequest.current) return;
    activeRequest.current = "reload";
    if (manual) setRefreshing(true);
    try {
      const result = await fetchAdminPromos(120);
      if (result.ok) {
        setRows((result.data || []).map(promoView));
        setError("");
      } else {
        setError(result.error || "No se pudieron cargar las promos.");
      }
    } catch {
      setError("No se pudieron cargar las promos.");
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
      [row.title, row.businessName, row.businessId].some((value) => value.toLowerCase().includes(term))
    ));
  }, [query, rows, statusFilter]);
  const selected = selectedKey ? rows.find((row) => row.key === selectedKey) : null;
  const activeTotal = rows.filter((row) => row.status === "activo").length;
  const pendingTotal = rows.filter((row) => row.status === "pendiente").length;
  const pausedTotal = rows.filter((row) => row.status === "pausado").length;

  const handleChangeStatus = useCallback((row: Promo) => {
    if (!row.id || activeRequest.current) return;
    openPicker({
      title: "Estado de promo",
      message: "Selecciona el estado operativo de la promoción.",
      options: PROMO_STATUS_OPTIONS.map((option) => ({ ...option })),
      selectedId: row.status,
      onSelect: async (nextStatus) => {
        if (activeRequest.current || nextStatus === row.status) return;
        activeRequest.current = "update";
        setBusyId(row.id);
        try {
          const result = await updatePromoStatusById(supabase, row.id, nextStatus);
          if (!result.ok) {
            openAlert({
              title: "No se pudo actualizar",
              message: result.error || "No se pudo actualizar el estado de la promo.",
              tone: "warning",
            });
            return;
          }
          setRows((current) => current.map((item) => item.id === row.id ? { ...item, status: nextStatus } : item));
          void observability.track({
            level: "info",
            category: "audit",
            message: "admin_promo_status_updated",
            context: { promo_id: row.id, status: nextStatus },
          }).catch(() => undefined);
        } catch {
          openAlert({ title: "No se pudo actualizar", message: "No se pudo actualizar el estado de la promo.", tone: "warning" });
        } finally {
          activeRequest.current = null;
          setBusyId("");
        }
      },
    });
  }, [openAlert, openPicker]);

  const columns: StaffTableColumn<Promo>[] = [
    { key: "promo", label: "Promo", width: 156, render: (row) => (
      <Pressable accessibilityRole="button" accessibilityLabel={`Ver promo ${row.title}`} onPress={() => setSelectedKey(row.key)}>
        <Text style={tableText.name} numberOfLines={2}>{row.title}</Text>
        <Text style={tableText.metadata} numberOfLines={1}>{row.publicId}</Text>
      </Pressable>
    ) },
    { key: "business", label: "Negocio", width: 132, render: (row) => <Text numberOfLines={2} style={tableText.metadata}>{row.businessName}</Text> },
    { key: "status", label: "Estado", width: 106, render: (row) => <StaffTableBadge value={row.status} tone={promoTone(row.status)} /> },
    { key: "redemptions", label: "Canjeados", width: 108, render: (row) => <Text style={tableText.metadata}>{row.redemptions}</Text> },
  ];
  if (width >= 768) columns.push({ key: "period", label: "Periodo", width: 156, render: (row) => <Text style={tableText.metadata}>{row.period}</Text> });
  columns.push({ key: "action", label: "Acciones", width: 144, align: "right", render: (row) => {
    const disabled = !row.id || refreshing || Boolean(busyId);
    return (
      <Pressable
        accessibilityRole="button" accessibilityLabel={`Cambiar estado de ${row.title}`} disabled={disabled}
        onPress={() => handleChangeStatus(row)} style={[tableText.action, disabled && tableText.actionDisabled]}
      >
        <Text style={tableText.actionLabel}>{busyId === row.id && busyId ? "Actualizando…" : "Cambiar estado"}</Text>
      </Pressable>
    );
  } });

  return (
    <>
      <StaffTablePage
        title="Promos"
        subtitle="Moderación y control de promociones"
        description="Moderación de promos activas y sospechosas."
        searchPlaceholder="Buscar promo"
        query={query}
        onChangeQuery={setQuery}
        loading={loading}
        error={error}
        filters={<StaffSelect label="Estado" value={statusFilter} options={PROMO_STATUS_FILTERS} onSelect={setStatusFilter} />}
        onRefresh={loading || refreshing || busyId ? undefined : () => { void loadRows(true); }}
      >
        <StaffTable columns={columns} rows={filtered} getKey={(row) => row.key} emptyMessage="No hay promos para los filtros actuales." />
        {rows.length > 0 && (
          <Text style={tableText.metadata}>{filtered.length} de {rows.length} promos · {activeTotal} activas · {pendingTotal} pendientes · {pausedTotal} pausadas</Text>
        )}
      </StaffTablePage>
      {selected && (
        <StaffTableDetails caption="Promo" title={selected.title} onClose={() => setSelectedKey("")}>
          <View style={tableText.badges}><StaffTableBadge value={selected.status} tone={promoTone(selected.status)} /></View>
          <StaffSectionCard title="Datos generales">
            <Text style={tableText.metadata}>ID: {selected.publicId}</Text>
            <Text style={tableText.metadata}>Negocio: {selected.businessName}</Text>
            <Text style={tableText.metadata}>Alta: {formatDateTime(selected.createdAt)}</Text>
            <Text style={tableText.metadata}>Periodo: {selected.period}</Text>
            <Text style={tableText.metadata}>Canjeados: {selected.redemptions}</Text>
          </StaffSectionCard>
          <StaffSectionCard title="Descripción"><Text style={tableText.metadata}>{selected.description}</Text></StaffSectionCard>
        </StaffTableDetails>
      )}
    </>
  );
}
