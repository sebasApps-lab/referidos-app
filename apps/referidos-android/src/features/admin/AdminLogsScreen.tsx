import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import AdminCollectionScreen from "./components/AdminCollectionScreen";
import SectionCard from "@shared/ui/SectionCard";
import { supabase } from "@shared/services/mobileApi";
import { fetchSupportLogEvents } from "@shared/services/supportDeskQueries";
import { formatDateTime, readFirst } from "@shared/services/entityQueries";
import { adminRuntimeStyles as shared } from "./components/adminRuntimeStyles";

export default function AdminLogsScreen() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("todos");

  const loadRows = useCallback(async () => {
    if (!refreshing) setLoading(true);
    const result = await fetchSupportLogEvents(supabase, { limit: 120 });
    if (!result.ok) {
      setRows([]);
      setError(result.error || "No se pudo cargar logs.");
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
      const level = String(readFirst(row, ["level"], "info")).trim().toLowerCase();
      const category = String(readFirst(row, ["category", "event_type"], "")).toLowerCase();
      const message = String(readFirst(row, ["message"], "")).toLowerCase();
      const route = String(readFirst(row, ["route", "support_route"], "")).toLowerCase();
      const screen = String(readFirst(row, ["screen", "support_screen"], "")).toLowerCase();
      const matchesQuery =
        !term ||
        category.includes(term) ||
        message.includes(term) ||
        route.includes(term) ||
        screen.includes(term);
      const matchesLevel = levelFilter === "todos" || level === levelFilter;
      return matchesQuery && matchesLevel;
    });
  }, [levelFilter, query, rows]);

  const metrics = useMemo(() => {
    const levels = {
      error: 0,
      warn: 0,
      info: 0,
    };
    rows.forEach((row) => {
      const level = String(readFirst(row, ["level"], "info")).trim().toLowerCase();
      if (level === "fatal" || level === "error") levels.error += 1;
      else if (level === "warn") levels.warn += 1;
      else levels.info += 1;
    });
    return [
      { label: "Total", value: rows.length },
      { label: "Errores", value: levels.error },
      { label: "Warn", value: levels.warn },
      { label: "Info/Debug", value: levels.info },
    ];
  }, [rows]);

  return (
    <AdminCollectionScreen
      title="Admin Logs"
      subtitle="Auditoria del sistema"
      searchPlaceholder="Buscar categoria, mensaje o ruta"
      query={query}
      onQueryChange={setQuery}
      loading={loading}
      refreshing={refreshing}
      error={error}
      metrics={metrics}
      filters={[
        {
          title: "Nivel",
          selectedId: levelFilter,
          onSelect: setLevelFilter,
          options: [
            { id: "todos", label: "Todos" },
            { id: "error", label: "Error/Fatal" },
            { id: "warn", label: "Warn" },
            { id: "info", label: "Info" },
          ],
        },
      ]}
      onRefresh={() => void refreshAll()}
      emptyText={!loading && filtered.length === 0 ? "No hay logs para este filtro." : ""}
    >
      <SectionCard title="Eventos" subtitle={`Logs encontrados: ${filtered.length}`}>
        {filtered.length === 0 && !loading ? (
          <Text style={shared.emptyText}>Sin logs recientes.</Text>
        ) : null}
        <View style={shared.listWrap}>
          {filtered.map((row, index) => (
            <View key={`${String(readFirst(row, ["id"], index))}-${index}`} style={shared.card}>
              <Text style={shared.cardTitle}>
                {String(readFirst(row, ["category", "event_type"], "log"))}
              </Text>
              <View style={shared.badgeRow}>
                <View style={shared.badge}>
                  <Text style={shared.badgeText}>
                    {String(readFirst(row, ["level"], "info"))}
                  </Text>
                </View>
              </View>
              <Text style={shared.bodyText}>
                {String(readFirst(row, ["message"], "Sin mensaje"))}
              </Text>
              <Text style={shared.metaText}>
                ruta: {String(readFirst(row, ["route", "support_route"], "-"))}
              </Text>
              <Text style={shared.metaText}>
                pantalla: {String(readFirst(row, ["screen", "support_screen"], "-"))}
              </Text>
              <Text style={shared.metaText}>
                ticket: {String(readFirst(row, ["thread_id", "support_thread_id"], "-"))}
              </Text>
              <Text style={shared.metaText}>
                fecha: {formatDateTime(readFirst(row, ["occurred_at", "created_at"], null))}
              </Text>
            </View>
          ))}
        </View>
      </SectionCard>
    </AdminCollectionScreen>
  );
}
