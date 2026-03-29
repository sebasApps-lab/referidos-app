import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import AdminCollectionScreen from "./components/AdminCollectionScreen";
import SectionCard from "@shared/ui/SectionCard";
import { supabase } from "@shared/services/mobileApi";
import { fetchSupportErrorCatalog } from "@shared/services/supportDeskQueries";
import { formatDateTime, readFirst } from "@shared/services/entityQueries";
import { adminRuntimeStyles as shared } from "./components/adminRuntimeStyles";

export default function AdminErrorCatalogScreen() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const loadRows = useCallback(async () => {
    if (!refreshing) setLoading(true);
    const result = await fetchSupportErrorCatalog(supabase, 250);
    if (!result.ok) {
      setRows([]);
      setError(result.error || "No se pudo cargar catalogo de errores.");
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
      const code = String(readFirst(row, ["error_code"], "")).toLowerCase();
      const status = String(readFirst(row, ["status"], "pending")).trim();
      const message = String(readFirst(row, ["sample_message"], "")).toLowerCase();
      const route = String(readFirst(row, ["sample_route"], "")).toLowerCase();
      const category = String(readFirst(row, ["sample_context"], "")).toLowerCase();
      const matchesQuery =
        !term ||
        code.includes(term) ||
        message.includes(term) ||
        route.includes(term) ||
        category.includes(term);
      const matchesStatus = statusFilter === "todos" || status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, rows, statusFilter]);

  const metrics = useMemo(() => {
    const byStatus: Record<string, number> = {
      pending: 0,
      defined: 0,
      ignored: 0,
    };
    rows.forEach((row) => {
      const status = String(readFirst(row, ["status"], "pending")).trim().toLowerCase();
      if (status in byStatus) byStatus[status] += 1;
    });
    return [
      { label: "Total", value: rows.length },
      { label: "Pending", value: byStatus.pending },
      { label: "Defined", value: byStatus.defined },
      { label: "Ignored", value: byStatus.ignored },
    ];
  }, [rows]);

  return (
    <AdminCollectionScreen
      title="Admin Error Codes"
      subtitle="Errores detectados, pendientes y definidos"
      searchPlaceholder="Buscar error code, ruta o mensaje"
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
            { id: "pending", label: "Pending" },
            { id: "defined", label: "Defined" },
            { id: "ignored", label: "Ignored" },
          ],
        },
      ]}
      onRefresh={() => void refreshAll()}
      emptyText={!loading && filtered.length === 0 ? "No hay errores para este filtro." : ""}
    >
      <SectionCard title="Catalogo" subtitle={`Errores encontrados: ${filtered.length}`}>
        {filtered.length === 0 && !loading ? (
          <Text style={shared.emptyText}>Sin errores catalogados.</Text>
        ) : null}
        <View style={shared.listWrap}>
          {filtered.map((row, index) => (
            <View key={`${String(readFirst(row, ["id", "error_code"], index))}-${index}`} style={shared.card}>
              <Text style={shared.cardTitle}>
                {String(readFirst(row, ["error_code"], "unknown_error"))}
              </Text>
              <View style={shared.badgeRow}>
                <View style={shared.badge}>
                  <Text style={shared.badgeText}>
                    {String(readFirst(row, ["status"], "pending"))}
                  </Text>
                </View>
                <View style={shared.codePill}>
                  <Text style={shared.codePillText}>
                    total: {String(readFirst(row, ["count_total"], 0))}
                  </Text>
                </View>
              </View>
              <Text style={shared.bodyText} numberOfLines={2}>
                {String(readFirst(row, ["sample_message"], "Sin muestra"))}
              </Text>
              <Text style={shared.metaText}>
                ruta: {String(readFirst(row, ["sample_route"], "-"))}
              </Text>
              <Text style={shared.metaText}>
                source: {String(readFirst(row, ["source_hint"], "-"))}
              </Text>
              <Text style={shared.metaText}>
                ultimo visto: {formatDateTime(readFirst(row, ["last_seen_at"], null))}
              </Text>
            </View>
          ))}
        </View>
      </SectionCard>
    </AdminCollectionScreen>
  );
}
