import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import AdminCollectionScreen from "./components/AdminCollectionScreen";
import SectionCard from "@shared/ui/SectionCard";
import { fetchAdminPromos } from "@shared/services/adminOps";
import {
  formatDateTime,
  readFirst,
  updatePromoStatusById,
} from "@shared/services/entityQueries";
import { useModalStore } from "@shared/store/modalStore";
import { observability, supabase } from "@shared/services/mobileApi";
import { adminRuntimeStyles as shared } from "./components/adminRuntimeStyles";

const PROMO_STATUS_OPTIONS = [
  { id: "activo", label: "Activo" },
  { id: "pendiente", label: "Pendiente" },
  { id: "pausado", label: "Pausado" },
];

export default function AdminPromosScreen() {
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
    const result = await fetchAdminPromos(120);
    if (!result.ok) {
      setRows([]);
      setError(result.error || "No se pudo cargar promos.");
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
      const title = String(readFirst(row, ["titulo", "nombre", "title"], "")).toLowerCase();
      const negocio = String(readFirst(row, ["negocioid", "negocio_id"], "")).toLowerCase();
      const status = String(readFirst(row, ["estado", "status"], "pendiente")).trim();
      const matchesQuery = !term || title.includes(term) || negocio.includes(term);
      const matchesStatus = statusFilter === "todos" || status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, rows, statusFilter]);

  const metrics = useMemo(() => {
    const byStatus = {
      activo: 0,
      pendiente: 0,
      pausado: 0,
    };
    rows.forEach((row) => {
      const status = String(readFirst(row, ["estado", "status"], "pendiente")).trim().toLowerCase();
      if (status in byStatus) {
        byStatus[status as keyof typeof byStatus] += 1;
      }
    });
    return [
      { label: "Total", value: rows.length },
      { label: "Activas", value: byStatus.activo },
      { label: "Pendientes", value: byStatus.pendiente },
      { label: "Pausadas", value: byStatus.pausado },
    ];
  }, [rows]);

  const handleChangeStatus = useCallback(
    (row: any) => {
      const promoId = String(readFirst(row, ["id"], "")).trim();
      if (!promoId) return;
      const currentStatus = String(readFirst(row, ["estado", "status"], "pendiente")).trim();
      openPicker({
        title: "Estado de promo",
        message: "Selecciona el estado operativo de la promocion.",
        options: PROMO_STATUS_OPTIONS.map((item) => ({
          id: item.id,
          label: item.label,
        })),
        selectedId: currentStatus,
        onSelect: async (nextStatus) => {
          setBusyId(promoId);
          const result = await updatePromoStatusById(supabase, promoId, nextStatus);
          setBusyId("");
          if (!result.ok) {
            openAlert({
              title: "No se pudo actualizar",
              message: result.error || "No se pudo actualizar el estado de la promo.",
              tone: "warning",
            });
            return;
          }
          setRows((current) =>
            current.map((item) =>
              String(readFirst(item, ["id"], "")) === promoId
                ? {
                    ...item,
                    estado: nextStatus,
                    status: nextStatus,
                  }
                : item,
            ),
          );
          await observability.track({
            level: "info",
            category: "audit",
            message: "admin_promo_status_updated",
            context: {
              promo_id: promoId,
              status: nextStatus,
            },
          });
        },
      });
    },
    [openAlert, openPicker],
  );

  return (
    <AdminCollectionScreen
      title="Admin Promos"
      subtitle="Moderacion y control de promociones"
      searchPlaceholder="Buscar promo o negocio"
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
          options: [
            { id: "todos", label: "Todos" },
            ...PROMO_STATUS_OPTIONS,
          ],
        },
      ]}
      onRefresh={() => void refreshAll()}
      emptyText={!loading && filtered.length === 0 ? "No hay promos para este filtro." : ""}
    >
      <SectionCard title="Listado" subtitle={`Promos encontradas: ${filtered.length}`}>
        <View style={shared.listWrap}>
          {filtered.map((row, index) => {
            const promoId = String(readFirst(row, ["id"], "")).trim();
            const title = String(readFirst(row, ["titulo", "nombre", "title"], "Promo"));
            const publicId = String(readFirst(row, ["public_id", "id"], "-"));
            const negocio = String(readFirst(row, ["negocioid", "negocio_id"], "sin negocio"));
            const status = String(readFirst(row, ["estado", "status"], "pendiente"));
            return (
              <View key={`${publicId}-${index}`} style={shared.card}>
                <Text style={shared.cardTitle}>{title}</Text>
                <View style={shared.badgeRow}>
                  <View style={shared.codePill}>
                    <Text style={shared.codePillText}>{publicId}</Text>
                  </View>
                  <View style={shared.badge}>
                    <Text style={shared.badgeText}>{status}</Text>
                  </View>
                </View>
                <Text style={shared.metaText}>negocio: {negocio}</Text>
                <Text style={shared.metaText}>
                  alta: {formatDateTime(readFirst(row, ["created_at"], null))}
                </Text>
                <Text style={shared.bodyText} numberOfLines={2}>
                  {String(readFirst(row, ["descripcion", "description"], "Sin descripcion"))}
                </Text>
                <View style={shared.actionsRow}>
                  <Pressable
                    onPress={() => handleChangeStatus(row)}
                    disabled={busyId === promoId}
                    style={[shared.secondaryBtn, busyId === promoId && shared.btnDisabled]}
                  >
                    <Text style={shared.secondaryBtnText}>
                      {busyId === promoId ? "..." : "Cambiar estado"}
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
