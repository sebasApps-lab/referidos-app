import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AdminCollectionScreen from "./components/AdminCollectionScreen";
import SectionCard from "@shared/ui/SectionCard";
import { STACK_ROUTES } from "@navigation/routeKeys";
import { supabase } from "@shared/services/mobileApi";
import { fetchSupportIssuesContext } from "@shared/services/supportDeskQueries";
import { formatDateTime, readFirst } from "@shared/services/entityQueries";
import { adminRuntimeStyles as shared } from "./components/adminRuntimeStyles";

export default function AdminIssuesScreen() {
  const navigation = useNavigation<any>();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("todos");

  const loadRows = useCallback(async () => {
    if (!refreshing) setLoading(true);
    const result = await fetchSupportIssuesContext(supabase, 180);
    if (!result.ok) {
      setRows([]);
      setError(result.error || "No se pudo cargar issues.");
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
      const title = String(readFirst(row, ["title"], "")).toLowerCase();
      const level = String(readFirst(row, ["level"], "info")).trim().toLowerCase();
      const status = String(readFirst(row, ["status"], "")).toLowerCase();
      const release = String(readFirst(row, ["last_release"], "")).toLowerCase();
      const user = String(readFirst(row, ["last_user_display_name", "last_user_email"], "")).toLowerCase();
      const matchesQuery =
        !term ||
        title.includes(term) ||
        status.includes(term) ||
        release.includes(term) ||
        user.includes(term);
      const matchesLevel = levelFilter === "todos" || level === levelFilter;
      return matchesQuery && matchesLevel;
    });
  }, [levelFilter, query, rows]);

  const metrics = useMemo(() => {
    const total24h = rows.reduce((acc, row) => acc + Number(readFirst(row, ["count_24h"], 0) || 0), 0);
    const fatalOrError = rows.filter((row) => {
      const level = String(readFirst(row, ["level"], "info")).trim().toLowerCase();
      return level === "fatal" || level === "error";
    }).length;
    return [
      { label: "Issues", value: rows.length },
      { label: "Criticos", value: fatalOrError },
      { label: "Eventos 24h", value: total24h },
      { label: "Filtrados", value: filtered.length },
    ];
  }, [filtered.length, rows]);

  return (
    <AdminCollectionScreen
      title="Admin Issues"
      subtitle="Selecciona un issue para ver sus eventos"
      searchPlaceholder="Buscar issue, release o usuario"
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
            { id: "fatal", label: "Fatal" },
            { id: "error", label: "Error" },
            { id: "warn", label: "Warn" },
            { id: "info", label: "Info" },
          ],
        },
      ]}
      onRefresh={() => void refreshAll()}
      emptyText={!loading && filtered.length === 0 ? "No hay issues para este filtro." : ""}
    >
      <SectionCard title="Issues" subtitle={`Resultados: ${filtered.length}`}>
        <View style={shared.listWrap}>
          {filtered.map((row, index) => {
            const issueId = String(readFirst(row, ["id"], "")).trim();
            return (
              <Pressable
                key={`${issueId || index}-${index}`}
                onPress={() =>
                  navigation.navigate(STACK_ROUTES.ADMIN.ISSUE_EVENTS, {
                    issueId,
                    issueTitle: String(readFirst(row, ["title"], "Issue")),
                  })
                }
                style={shared.card}
              >
                <Text style={shared.cardTitle}>
                  {String(readFirst(row, ["title"], "Issue"))}
                </Text>
                <View style={shared.badgeRow}>
                  <View style={shared.badge}>
                    <Text style={shared.badgeText}>
                      {String(readFirst(row, ["level"], "info"))}
                    </Text>
                  </View>
                  <View style={shared.codePill}>
                    <Text style={shared.codePillText}>
                      24h: {String(readFirst(row, ["count_24h"], 0))}
                    </Text>
                  </View>
                </View>
                <Text style={shared.metaText}>
                  estado: {String(readFirst(row, ["status"], "-"))}
                </Text>
                <Text style={shared.metaText}>
                  release: {String(readFirst(row, ["last_release"], "-"))}
                </Text>
                <Text style={shared.metaText}>
                  usuario: {String(readFirst(row, ["last_user_display_name", "last_user_email"], "-"))}
                </Text>
                <Text style={shared.metaText}>
                  ultimo visto: {formatDateTime(readFirst(row, ["last_seen_at"], null))}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </SectionCard>
    </AdminCollectionScreen>
  );
}
