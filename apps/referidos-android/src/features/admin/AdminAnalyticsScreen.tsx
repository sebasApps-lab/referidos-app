import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AdminCollectionScreen from "./components/AdminCollectionScreen";
import SectionCard from "@shared/ui/SectionCard";
import { fetchAdminPrelaunchMetrics } from "@shared/services/adminOps";
import { adminRuntimeStyles as shared } from "./components/adminRuntimeStyles";

const DAY_OPTIONS = [1, 7, 14, 30, 60, 90];
const CHANNEL_OPTIONS = [
  { id: "", label: "Todos" },
  { id: "prelaunch_web", label: "Prelaunch Web" },
  { id: "pwa_web", label: "PWA" },
  { id: "android", label: "Android" },
];
const TABS = ["overview", "funnel", "waitlist", "tickets", "risk"] as const;

function formatNumber(value: any) {
  return Number(value || 0).toLocaleString("es-EC");
}

function formatPercent(value: any) {
  return `${(Number(value || 0) * 100).toFixed(1)}%`;
}

export default function AdminAnalyticsScreen() {
  const [days, setDays] = useState(7);
  const [channel, setChannel] = useState("");
  const [tab, setTab] = useState<(typeof TABS)[number]>("overview");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [payload, setPayload] = useState<any | null>(null);
  const [lastUpdatedAt, setLastUpdatedAt] = useState("");

  const loadMetrics = useCallback(async () => {
    if (!refreshing) setLoading(true);
    try {
      const result = await fetchAdminPrelaunchMetrics({
        days,
        appChannel: channel,
      });
      setPayload(result || null);
      setError("");
      setLastUpdatedAt(new Date().toISOString());
    } catch (metricsError: any) {
      setPayload(null);
      setError(String(metricsError?.message || metricsError || "No se pudo cargar analytics."));
    }
    setLoading(false);
  }, [channel, days, refreshing]);

  const refreshAll = useCallback(async () => {
    setRefreshing(true);
    await loadMetrics();
    setRefreshing(false);
  }, [loadMetrics]);

  useEffect(() => {
    void refreshAll();
  }, [refreshAll]);

  const summary = useMemo(() => {
    return payload?.metrics || {
      unique_visitors: 0,
      new_visitors: 0,
      recurrent_visitors: 0,
      waitlist_submits: 0,
      waitlist_conversion: 0,
      support_tickets_created: 0,
    };
  }, [payload]);

  const metrics = useMemo(() => {
    return [
      { label: "Visitantes", value: formatNumber(summary.unique_visitors) },
      { label: "Nuevos", value: formatNumber(summary.new_visitors) },
      { label: "Recurrentes", value: formatNumber(summary.recurrent_visitors) },
      { label: "Waitlist", value: formatNumber(summary.waitlist_submits) },
      { label: "Conversion", value: formatPercent(summary.waitlist_conversion) },
      { label: "Tickets", value: formatNumber(summary.support_tickets_created) },
    ];
  }, [summary]);

  const eventBreakdown = payload?.event_breakdown || {};
  const waitlistBreakdown = payload?.waitlist_breakdown || {};
  const supportBreakdown = payload?.support_breakdown || {};
  const timeline = payload?.timeline || [];
  const topIpRisk = payload?.top_ip_risk || [];

  return (
    <AdminCollectionScreen
      title="Admin Analytics"
      subtitle="Metricas de sesiones, waitlist, tickets anonimos y riesgo"
      loading={loading}
      refreshing={refreshing}
      error={error}
      metrics={metrics}
      onRefresh={() => void refreshAll()}
      headerActions={
        <View style={styles.topChips}>
          {DAY_OPTIONS.map((value) => {
            const active = value === days;
            return (
              <Pressable
                key={`days-${value}`}
                onPress={() => setDays(value)}
                style={[styles.filterChip, active && styles.filterChipActive]}
              >
                <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>
                  {value}d
                </Text>
              </Pressable>
            );
          })}
          {CHANNEL_OPTIONS.map((item) => {
            const active = item.id === channel;
            return (
              <Pressable
                key={`channel-${item.id || "all"}`}
                onPress={() => setChannel(item.id)}
                style={[styles.filterChip, active && styles.filterChipActive]}
              >
                <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      }
      footer={
        <SectionCard title="Ultima actualizacion">
          <Text style={shared.metaText}>{lastUpdatedAt || "Sin cargar"}</Text>
        </SectionCard>
      }
    >
      <SectionCard title="Panel" subtitle="Resumen, funnel, waitlist, tickets y riesgo">
        <View style={styles.tabRow}>
          {TABS.map((item) => {
            const active = item === tab;
            return (
              <Pressable
                key={item}
                onPress={() => setTab(item)}
                style={[styles.tabChip, active && styles.tabChipActive]}
              >
                <Text style={[styles.tabChipText, active && styles.tabChipTextActive]}>
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </SectionCard>

      {tab === "overview" ? (
        <SectionCard title="Timeline" subtitle="Actividad del rango seleccionado">
          <View style={shared.listWrap}>
            {timeline.length === 0 && !loading ? (
              <Text style={shared.emptyText}>Sin datos de timeline.</Text>
            ) : null}
            {timeline.map((row: any) => (
              <View key={String(row?.day || Math.random())} style={shared.card}>
                <Text style={shared.cardTitle}>{String(row?.day || "-")}</Text>
                <Text style={shared.metaText}>visitantes: {formatNumber(row?.unique_visitors)}</Text>
                <Text style={shared.metaText}>page views: {formatNumber(row?.page_views)}</Text>
                <Text style={shared.metaText}>waitlist: {formatNumber(row?.waitlist_submits)}</Text>
                <Text style={shared.metaText}>tickets: {formatNumber(row?.support_tickets_created)}</Text>
              </View>
            ))}
          </View>
        </SectionCard>
      ) : null}

      {tab === "funnel" ? (
        <SectionCard title="Eventos prelaunch" subtitle="Funnel del canal seleccionado">
          <View style={shared.listWrap}>
            {Object.keys(eventBreakdown).length === 0 && !loading ? (
              <Text style={shared.emptyText}>Sin eventos para el rango.</Text>
            ) : null}
            {Object.entries(eventBreakdown).map(([eventType, count]) => (
              <View key={eventType} style={shared.card}>
                <Text style={shared.cardTitle}>{eventType}</Text>
                <Text style={shared.metaText}>total: {formatNumber(count)}</Text>
              </View>
            ))}
          </View>
        </SectionCard>
      ) : null}

      {tab === "waitlist" ? (
        <SectionCard title="Waitlist" subtitle="Breakdown por rol, estado y fuente">
          <View style={shared.listWrap}>
            {(waitlistBreakdown?.by_role || []).map((row: any) => (
              <View key={`role-${row.role_intent}`} style={shared.card}>
                <Text style={shared.cardTitle}>rol: {String(row.role_intent || "-")}</Text>
                <Text style={shared.metaText}>total: {formatNumber(row.count)}</Text>
              </View>
            ))}
            {(waitlistBreakdown?.by_status || []).map((row: any) => (
              <View key={`status-${row.status}`} style={shared.card}>
                <Text style={shared.cardTitle}>estado: {String(row.status || "-")}</Text>
                <Text style={shared.metaText}>total: {formatNumber(row.count)}</Text>
              </View>
            ))}
            {(waitlistBreakdown?.top_sources || []).map((row: any) => (
              <View key={`source-${row.source}`} style={shared.card}>
                <Text style={shared.cardTitle}>source: {String(row.source || "-")}</Text>
                <Text style={shared.metaText}>total: {formatNumber(row.count)}</Text>
              </View>
            ))}
          </View>
        </SectionCard>
      ) : null}

      {tab === "tickets" ? (
        <SectionCard title="Tickets anonimos" subtitle="Categorias, estados y severidad">
          <View style={shared.listWrap}>
            {(supportBreakdown?.by_status || []).map((row: any) => (
              <View key={`support-status-${row.status}`} style={shared.card}>
                <Text style={shared.cardTitle}>estado: {String(row.status || "-")}</Text>
                <Text style={shared.metaText}>total: {formatNumber(row.count)}</Text>
              </View>
            ))}
            {(supportBreakdown?.by_severity || []).map((row: any) => (
              <View key={`support-severity-${row.severity}`} style={shared.card}>
                <Text style={shared.cardTitle}>severity: {String(row.severity || "-")}</Text>
                <Text style={shared.metaText}>total: {formatNumber(row.count)}</Text>
              </View>
            ))}
            {(supportBreakdown?.by_category || []).map((row: any) => (
              <View key={`support-category-${row.category}`} style={shared.card}>
                <Text style={shared.cardTitle}>categoria: {String(row.category || "-")}</Text>
                <Text style={shared.metaText}>total: {formatNumber(row.count)}</Text>
              </View>
            ))}
          </View>
        </SectionCard>
      ) : null}

      {tab === "risk" ? (
        <SectionCard title="Top IP Risk IDs" subtitle="Actividad por hash de riesgo">
          <View style={shared.listWrap}>
            {topIpRisk.length === 0 && !loading ? (
              <Text style={shared.emptyText}>Sin actividad de riesgo.</Text>
            ) : null}
            {topIpRisk.map((row: any) => (
              <View key={String(row?.ip_risk_id || Math.random())} style={shared.card}>
                <Text style={shared.cardTitle}>{String(row?.ip_risk_id || "-")}</Text>
                <Text style={shared.metaText}>eventos: {formatNumber(row?.count)}</Text>
              </View>
            ))}
          </View>
        </SectionCard>
      ) : null}
    </AdminCollectionScreen>
  );
}

const styles = StyleSheet.create({
  topChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  filterChipActive: {
    borderColor: "#5B21B6",
    backgroundColor: "#F5F3FF",
  },
  filterChipText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#475569",
  },
  filterChipTextActive: {
    color: "#5B21B6",
  },
  tabRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tabChip: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  tabChipActive: {
    borderColor: "#1D4ED8",
    backgroundColor: "#EFF6FF",
  },
  tabChipText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#475569",
    textTransform: "uppercase",
  },
  tabChipTextActive: {
    color: "#1D4ED8",
  },
});
