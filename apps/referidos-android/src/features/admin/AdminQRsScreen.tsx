import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import AdminCollectionScreen from "./components/AdminCollectionScreen";
import SectionCard from "@shared/ui/SectionCard";
import { fetchAdminQrs } from "@shared/services/adminOps";
import { formatDateTime, readFirst } from "@shared/services/entityQueries";
import { adminRuntimeStyles as shared } from "./components/adminRuntimeStyles";

export default function AdminQRsScreen() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const loadRows = useCallback(async () => {
    if (!refreshing) setLoading(true);
    const result = await fetchAdminQrs(120);
    if (!result.ok) {
      setRows([]);
      setError(result.error || "No se pudo cargar QRs.");
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
      const code = String(readFirst(row, ["code", "codigo", "token", "id"], "")).toLowerCase();
      const cliente = String(readFirst(row, ["clienteid", "cliente_id"], "")).toLowerCase();
      const negocio = String(readFirst(row, ["negocioid", "negocio_id"], "")).toLowerCase();
      const status = String(readFirst(row, ["estado", "status"], "valido")).trim();
      const matchesQuery = !term || code.includes(term) || cliente.includes(term) || negocio.includes(term);
      const matchesStatus = statusFilter === "todos" || status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, rows, statusFilter]);

  const metrics = useMemo(() => {
    const byStatus: Record<string, number> = {
      valido: 0,
      canjeado: 0,
      expirado: 0,
    };
    rows.forEach((row) => {
      const status = String(readFirst(row, ["estado", "status"], "valido")).trim().toLowerCase();
      if (status in byStatus) byStatus[status] += 1;
    });
    return [
      { label: "Total", value: rows.length },
      { label: "Validos", value: byStatus.valido },
      { label: "Canjeados", value: byStatus.canjeado },
      { label: "Expirados", value: byStatus.expirado },
    ];
  }, [rows]);

  return (
    <AdminCollectionScreen
      title="Admin QRs"
      subtitle="Auditoria de codigos y canjes"
      searchPlaceholder="Buscar QR, cliente o negocio"
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
            { id: "valido", label: "Valido" },
            { id: "canjeado", label: "Canjeado" },
            { id: "expirado", label: "Expirado" },
          ],
        },
      ]}
      onRefresh={() => void refreshAll()}
      emptyText={!loading && filtered.length === 0 ? "No hay QRs para este filtro." : ""}
    >
      <SectionCard title="Listado" subtitle={`QRs encontrados: ${filtered.length}`}>
        <View style={shared.listWrap}>
          {filtered.map((row, index) => {
            const code = String(readFirst(row, ["code", "codigo", "token", "id"], "QR"));
            const promo = String(readFirst(row, ["promoid", "promo_id"], "sin promo"));
            const status = String(readFirst(row, ["estado", "status"], "valido"));
            return (
              <View key={`${code}-${index}`} style={shared.card}>
                <Text style={shared.cardTitle}>{code}</Text>
                <View style={shared.badgeRow}>
                  <View style={shared.badge}>
                    <Text style={shared.badgeText}>{status}</Text>
                  </View>
                </View>
                <Text style={shared.metaText}>
                  cliente: {String(readFirst(row, ["clienteid", "cliente_id"], "sin cliente"))}
                </Text>
                <Text style={shared.metaText}>
                  negocio: {String(readFirst(row, ["negocioid", "negocio_id"], "sin negocio"))}
                </Text>
                <Text style={shared.metaText}>promo: {promo}</Text>
                <Text style={shared.metaText}>
                  creado: {formatDateTime(readFirst(row, ["created_at", "fecha"], null))}
                </Text>
                <Text style={shared.metaText}>
                  canje: {formatDateTime(readFirst(row, ["fecha_canje", "redeemed_at"], null))}
                </Text>
              </View>
            );
          })}
        </View>
      </SectionCard>
    </AdminCollectionScreen>
  );
}
