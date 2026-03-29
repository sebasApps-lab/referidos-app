import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import AdminCollectionScreen from "./components/AdminCollectionScreen";
import SectionCard from "@shared/ui/SectionCard";
import { countAdminRows, fetchAdminNegocios, fetchAdminPromos, fetchAdminReportes } from "@shared/services/adminOps";
import { supabase } from "@shared/services/mobileApi";
import { fetchObservabilityEvents, readFirst } from "@shared/services/entityQueries";
import { fetchSupportStatusSummary } from "@shared/services/supportDeskQueries";
import { adminRuntimeStyles as shared } from "./components/adminRuntimeStyles";

type DataState = {
  usersTotal: number;
  businessesTotal: number;
  promosTotal: number;
  qrsTotal: number;
  reportesTotal: number;
  supportByStatus: Record<string, number>;
  sectors: Record<string, number>;
  promoStatuses: Record<string, number>;
  reportStatuses: Record<string, number>;
  obsErrors: number;
};

const EMPTY_STATE: DataState = {
  usersTotal: 0,
  businessesTotal: 0,
  promosTotal: 0,
  qrsTotal: 0,
  reportesTotal: 0,
  supportByStatus: {},
  sectors: {},
  promoStatuses: {},
  reportStatuses: {},
  obsErrors: 0,
};

export default function AdminDatosScreen() {
  const [state, setState] = useState<DataState>(EMPTY_STATE);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadAll = useCallback(async () => {
    if (!refreshing) setLoading(true);

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
    ] = await Promise.all([
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
    ]);

    const nextErrors = [
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
    ]
      .filter((item: any) => item && item.ok === false && item.error)
      .map((item: any) => item.error);

    const sectors: Record<string, number> = {};
    (negociosResult.ok ? negociosResult.data : []).forEach((row: any) => {
      const sector = String(readFirst(row, ["sector", "categoria"], "sin sector")).trim();
      sectors[sector] = (sectors[sector] || 0) + 1;
    });

    const promoStatuses: Record<string, number> = {};
    (promosResult.ok ? promosResult.data : []).forEach((row: any) => {
      const status = String(readFirst(row, ["estado", "status"], "pendiente")).trim();
      promoStatuses[status] = (promoStatuses[status] || 0) + 1;
    });

    const reportStatuses: Record<string, number> = {};
    (reportesResult.ok ? reportesResult.data : []).forEach((row: any) => {
      const status = String(readFirst(row, ["estado"], "abierto")).trim();
      reportStatuses[status] = (reportStatuses[status] || 0) + 1;
    });

    const obsErrors = (obsResult.ok ? obsResult.data : []).filter((row: any) => {
      const level = String(readFirst(row, ["level"], "info")).trim().toLowerCase();
      return level === "fatal" || level === "error";
    }).length;

    setState({
      usersTotal: usersCount.ok ? usersCount.count : 0,
      businessesTotal: businessesCount.ok ? businessesCount.count : 0,
      promosTotal: promosCount.ok ? promosCount.count : 0,
      qrsTotal: qrsCount.ok ? qrsCount.count : 0,
      reportesTotal: reportesCount.ok ? reportesCount.count : 0,
      supportByStatus: supportSummary.ok ? supportSummary.data.byStatus : {},
      sectors,
      promoStatuses,
      reportStatuses,
      obsErrors,
    });
    setError(nextErrors[0] || "");
    setLoading(false);
  }, [refreshing]);

  const refreshAll = useCallback(async () => {
    setRefreshing(true);
    await loadAll();
    setRefreshing(false);
  }, [loadAll]);

  useEffect(() => {
    void refreshAll();
  }, [refreshAll]);

  const metrics = useMemo(() => {
    return [
      { label: "Usuarios", value: state.usersTotal },
      { label: "Negocios", value: state.businessesTotal },
      { label: "Promos", value: state.promosTotal },
      { label: "QRs", value: state.qrsTotal },
      { label: "Reportes", value: state.reportesTotal },
      { label: "Errores obs", value: state.obsErrors },
    ];
  }, [state]);

  return (
    <AdminCollectionScreen
      title="Admin Datos"
      subtitle="Analisis avanzado y tendencias"
      loading={loading}
      refreshing={refreshing}
      error={error}
      metrics={metrics}
      onRefresh={() => void refreshAll()}
    >
      <SectionCard title="Conversion por sector" subtitle="Distribucion actual de negocios">
        <View style={shared.listWrap}>
          {Object.keys(state.sectors).length === 0 && !loading ? (
            <Text style={shared.emptyText}>Sin sectores para mostrar.</Text>
          ) : null}
          {Object.entries(state.sectors)
            .sort((a, b) => b[1] - a[1])
            .map(([sector, count]) => (
              <View key={sector} style={shared.card}>
                <Text style={shared.cardTitle}>{sector}</Text>
                <Text style={shared.metaText}>negocios: {count}</Text>
              </View>
            ))}
        </View>
      </SectionCard>

      <SectionCard title="Promos y soporte" subtitle="Estados operativos recientes">
        <View style={shared.listWrap}>
          {Object.entries(state.promoStatuses).map(([status, count]) => (
            <View key={`promo-${status}`} style={shared.card}>
              <Text style={shared.cardTitle}>Promo: {status}</Text>
              <Text style={shared.metaText}>total: {count}</Text>
            </View>
          ))}
          {Object.entries(state.supportByStatus).map(([status, count]) => (
            <View key={`support-${status}`} style={shared.card}>
              <Text style={shared.cardTitle}>Ticket: {status}</Text>
              <Text style={shared.metaText}>total: {count}</Text>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Reportes" subtitle="Estado de moderacion">
        <View style={shared.listWrap}>
          {Object.keys(state.reportStatuses).length === 0 && !loading ? (
            <Text style={shared.emptyText}>Sin reportes para mostrar.</Text>
          ) : null}
          {Object.entries(state.reportStatuses).map(([status, count]) => (
            <View key={`report-${status}`} style={shared.card}>
              <Text style={shared.cardTitle}>{status}</Text>
              <Text style={shared.metaText}>total: {count}</Text>
            </View>
          ))}
        </View>
      </SectionCard>
    </AdminCollectionScreen>
  );
}
