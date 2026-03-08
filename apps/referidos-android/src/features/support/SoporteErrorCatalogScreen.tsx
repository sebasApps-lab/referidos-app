import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { supabase } from "@shared/services/mobileApi";
import { fetchSupportErrorCatalog } from "@shared/services/supportDeskQueries";
import { formatDateTime } from "@shared/services/entityQueries";

const EXTRA_KNOWN_CODES = [
  "method_not_allowed",
  "empty_batch",
  "invalid_message",
  "invalid_body",
  "invalid_action",
  "profile_not_found",
  "tenant_missing",
  "issue_upsert_failed",
  "event_insert_failed",
  "event_not_found",
  "issue_not_found",
  "unauthorized",
];

function buildFallbackRows() {
  const now = new Date().toISOString();
  return EXTRA_KNOWN_CODES.map((code) => ({
    id: `seed-${code}`,
    error_code: code,
    status: "defined",
    count_total: 0,
    source_hint: "seed",
    sample_message: "Catalog seed",
    sample_route: null,
    sample_context: {
      category: "catalog_seed",
      description: "Codigo sembrado desde contrato observability.",
    },
    first_seen_at: now,
    last_seen_at: now,
  }));
}

function statusStyle(status: string) {
  if (status === "defined") return styles.statusDefined;
  if (status === "ignored") return styles.statusIgnored;
  return styles.statusPending;
}

export default function SoporteErrorCatalogScreen() {
  const [rows, setRows] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadRows = useCallback(async () => {
    setLoading(true);
    setError("");
    const result = await fetchSupportErrorCatalog(supabase, 300);
    setLoading(false);
    if (!result.ok) {
      setRows(buildFallbackRows());
      setError(result.error || "No se pudo cargar catalogo.");
      return;
    }
    const next = Array.isArray(result.data) ? result.data : [];
    setRows(next.length ? next : buildFallbackRows());
  }, []);

  useEffect(() => {
    void loadRows();
  }, [loadRows]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((row) => {
      const haystack = [
        row.error_code,
        row.status,
        row.sample_message,
        row.sample_route,
        row.sample_context?.category,
        row.sample_context?.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [rows, query]);

  return (
    <ScreenScaffold
      title="Soporte Catalogo de Errores"
      subtitle="Codigos observability y contexto de muestra"
    >
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard
          title="Busqueda"
          subtitle="Filtra por code, status, ruta o mensaje"
          right={
            <Pressable onPress={loadRows} disabled={loading} style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>{loading ? "..." : "Recargar"}</Text>
            </Pressable>
          }
        >
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar por code, status o mensaje"
            style={styles.input}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </SectionCard>

        <SectionCard title="Catalogo" subtitle={`${filtered.length} codigos`}>
          {loading ? <BlockSkeleton lines={8} compact /> : null}
          {!loading && filtered.length === 0 ? (
            <Text style={styles.emptyText}>No hay codigos para el filtro actual.</Text>
          ) : null}
          {!loading
            ? filtered.map((row) => (
                <View key={row.id} style={styles.rowCard}>
                  <View style={styles.rowTop}>
                    <Text style={styles.rowTitle}>{row.error_code}</Text>
                    <Text style={[styles.statusBadge, statusStyle(String(row.status || "pending"))]}>
                      {String(row.status || "pending").toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.rowMeta}>
                    categoria: {row.sample_context?.category || "-"} | source: {row.source_hint || "-"}
                  </Text>
                  <Text style={styles.rowMeta}>
                    total: {row.count_total || 0} | ultimo visto: {formatDateTime(row.last_seen_at)}
                  </Text>
                  <Text style={styles.rowDescription}>
                    {row.sample_context?.description || row.sample_message || "-"}
                  </Text>
                </View>
              ))
            : null}
        </SectionCard>
      </ScrollView>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 12,
    paddingBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    color: "#0F172A",
    paddingHorizontal: 10,
    paddingVertical: 9,
    fontSize: 13,
  },
  rowCard: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 10,
    gap: 3,
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  rowTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },
  rowMeta: {
    fontSize: 11,
    color: "#64748B",
  },
  rowDescription: {
    fontSize: 12,
    color: "#475569",
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 10,
    fontWeight: "700",
    overflow: "hidden",
  },
  statusPending: {
    backgroundColor: "#FEF3C7",
    color: "#B45309",
  },
  statusDefined: {
    backgroundColor: "#DCFCE7",
    color: "#15803D",
  },
  statusIgnored: {
    backgroundColor: "#E2E8F0",
    color: "#475569",
  },
  emptyText: {
    fontSize: 12,
    color: "#64748B",
  },
  errorText: {
    fontSize: 12,
    color: "#B91C1C",
    fontWeight: "600",
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#1D4ED8",
    backgroundColor: "#EFF6FF",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  secondaryBtnText: {
    color: "#1D4ED8",
    fontSize: 12,
    fontWeight: "700",
  },
});
