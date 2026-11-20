import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import SectionCard from "@features/staff/StaffSectionCard";
import StaffScreenScaffold from "@features/staff/StaffScreenScaffold";
import { countAdminRows, fetchAdminNegocios, fetchAdminPromos, fetchAdminReportes } from "@shared/services/adminOps";
import { supabase } from "@shared/services/mobileApi";
import { fetchObservabilityEvents, readFirst } from "@shared/services/entityQueries";
import { fetchSupportStatusSummary } from "@shared/services/supportDeskQueries";
import BlockSkeleton from "@shared/ui/BlockSkeleton";

type DataState = {
  usersTotal: number | null;
  businessesTotal: number | null;
  promosTotal: number | null;
  qrsTotal: number | null;
  reportesTotal: number | null;
  supportByStatus: Record<string, number>;
  sectors: Record<string, number>;
  promoStatuses: Record<string, number>;
  reportStatuses: Record<string, number>;
  obsErrors: number | null;
};

const EMPTY_STATE: DataState = {
  usersTotal: null,
  businessesTotal: null,
  promosTotal: null,
  qrsTotal: null,
  reportesTotal: null,
  supportByStatus: {},
  sectors: {},
  promoStatuses: {},
  reportStatuses: {},
  obsErrors: null,
};

function groupByLabel(rows: Record<string, unknown>[], columns: string[], fallback: string) {
  return rows.reduce<Record<string, number>>((counts, row) => {
    const label = String(readFirst(row, columns, fallback)).trim() || fallback;
    counts[label] = (counts[label] || 0) + 1;
    return counts;
  }, Object.create(null));
}

export default function AdminDatosScreen() {
  const [state, setState] = useState<DataState>(EMPTY_STATE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const pending = useRef(false);

  const loadAll = useCallback(async () => {
    if (pending.current) return;
    pending.current = true;

    try {
      const results = await Promise.all([
        countAdminRows("usuarios"),
        countAdminRows("negocios"),
        countAdminRows("promos"),
        countAdminRows("qr_validos"),
        countAdminRows("reportes"),
        fetchSupportStatusSummary(supabase),
        fetchAdminNegocios(120),
        fetchAdminPromos(120),
        fetchAdminReportes(120),
        fetchObservabilityEvents(supabase, { domain: "support", limit: 120 }),
      ] as const);
      const [
        usersCount,
        businessesCount,
        promosCount,
        qrsCount,
        reportesCount,
        supportSummary,
        negociosResult,
        promosResult,
        reportesResult,
        obsResult,
      ] = results;

      const firstError = results.find((result) => !result.ok && result.error);
      const obsErrors = obsResult.ok ? obsResult.data.filter((row) => {
        const level = String(readFirst(row, ["level"], "info")).trim().toLowerCase();
        return level === "fatal" || level === "error";
      }).length : null;

      setState((previous) => ({
        usersTotal: usersCount.ok ? usersCount.count : previous.usersTotal,
        businessesTotal: businessesCount.ok ? businessesCount.count : previous.businessesTotal,
        promosTotal: promosCount.ok ? promosCount.count : previous.promosTotal,
        qrsTotal: qrsCount.ok ? qrsCount.count : previous.qrsTotal,
        reportesTotal: reportesCount.ok ? reportesCount.count : previous.reportesTotal,
        supportByStatus: supportSummary.ok ? supportSummary.data.byStatus : previous.supportByStatus,
        sectors: negociosResult.ok ? groupByLabel(negociosResult.data, ["sector", "categoria"], "Sin sector") : previous.sectors,
        promoStatuses: promosResult.ok ? groupByLabel(promosResult.data, ["estado", "status"], "Sin estado") : previous.promoStatuses,
        reportStatuses: reportesResult.ok ? groupByLabel(reportesResult.data, ["estado"], "Sin estado") : previous.reportStatuses,
        obsErrors: obsErrors ?? previous.obsErrors,
      }));
      setError(firstError?.error || "");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No se pudieron cargar los datos.");
    } finally {
      pending.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  const metrics = [
    { label: "Usuarios", value: state.usersTotal },
    { label: "Negocios", value: state.businessesTotal },
    { label: "Promos", value: state.promosTotal },
    { label: "QRs", value: state.qrsTotal },
    { label: "Reportes", value: state.reportesTotal },
    { label: "Errores de soporte recientes", value: state.obsErrors },
  ];

  return (
    <StaffScreenScaffold title="Datos" subtitle="Gráficos avanzados y tendencias" onRefresh={() => void loadAll()}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text accessibilityRole="header" style={styles.heading}>Gráficos avanzados</Text>
        {error ? <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text> : null}
        {loading ? <BlockSkeleton lines={6} /> : (
          <>
            <SectionCard title="Resumen operativo">
              <View style={styles.metrics}>
                {metrics.map(({ label, value }) => (
                  <View key={label} style={styles.metric}>
                    <Text style={styles.metricValue}>{value?.toLocaleString("es-EC") ?? "—"}</Text>
                    <Text style={styles.label}>{label}</Text>
                  </View>
                ))}
              </View>
            </SectionCard>
            <Distribution title="Negocios por sector" subtitle="Hasta 120 negocios recientes" values={state.sectors} />
            <Distribution title="Estado de promociones" subtitle="Hasta 120 promociones recientes" values={state.promoStatuses} />
            <Distribution title="Estado de soporte" values={state.supportByStatus} />
            <Distribution title="Estado de reportes" subtitle="Hasta 120 reportes recientes" values={state.reportStatuses} />
          </>
        )}
      </ScrollView>
    </StaffScreenScaffold>
  );
}

function Distribution({ title, subtitle, values }: { title: string; subtitle?: string; values: Record<string, number> }) {
  const rows = Object.entries(values).sort((left, right) => right[1] - left[1]);
  const total = rows.reduce((sum, [, value]) => sum + value, 0);

  return (
    <SectionCard title={title} subtitle={subtitle}>
      {rows.length === 0 ? <Text style={styles.label}>Sin datos disponibles.</Text> : rows.map(([label, value]) => (
        <View key={label} style={styles.barRow}>
          <View style={styles.barLabel}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.label}>{value.toLocaleString("es-EC")}</Text>
          </View>
          <View style={styles.track}>
            <View style={[styles.bar, { width: `${total > 0 ? value / total * 100 : 0}%` }]} />
          </View>
        </View>
      ))}
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  content: { gap: 16, paddingBottom: 48 },
  heading: { color: "#2F1A55", fontSize: 18, lineHeight: 28, fontWeight: "600" },
  metrics: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  metric: { flexGrow: 1, flexBasis: "46%", borderRadius: 12, backgroundColor: "#F7F4FF", padding: 12 },
  metricValue: { color: "#2F1A55", fontSize: 20, fontWeight: "700" },
  label: { color: "#64748B", fontSize: 12, lineHeight: 17 },
  barRow: { gap: 4, paddingVertical: 4 },
  barLabel: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  track: { borderRadius: 8, backgroundColor: "#F0EBFF", overflow: "hidden", height: 8 },
  bar: { borderRadius: 8, backgroundColor: "#8256D8", height: "100%" },
  error: { borderRadius: 12, padding: 12, color: "#B91C1C", backgroundColor: "#FFF1F2", fontSize: 12 },
});
