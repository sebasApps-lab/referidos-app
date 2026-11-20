import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import StaffMetricTiles from "@features/staff/StaffMetricTiles";
import { staffIcons } from "@features/staff/staffNavigation";
import ScreenScaffold from "@features/staff/StaffScreenScaffold";
import SectionCard from "@features/staff/StaffSectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { supabase } from "@shared/services/mobileApi";
import {
  fetchObservabilityEvents,
  formatDateTime,
  readFirst,
} from "@shared/services/entityQueries";
import {
  fetchSupportAgentsDashboard,
  fetchSupportStatusSummary,
} from "@shared/services/supportDeskQueries";

type PlatformKpis = {
  usersTotal: number;
  usersActive: number;
  businessesTotal: number;
  promosTotal: number;
  qrsTotal: number;
  usersByRole: Record<string, number>;
};

type SupportKpis = {
  ticketsTotal: number;
  newCount: number;
  inProgressCount: number;
  waitingCount: number;
  closedCount: number;
  activeAgents: number;
  pendingRequests: number;
};

type ObservabilityKpis = {
  total: number;
  errorLike: number;
  warnLike: number;
};

type OverviewState = {
  platform: PlatformKpis;
  support: SupportKpis;
  observability: ObservabilityKpis;
  businesses: any[];
  promos: any[];
  qrs: any[];
  systemLogs: any[];
};

type CountResult = {
  ok: boolean;
  count: number;
  error?: string;
};

const EMPTY_OVERVIEW: OverviewState = {
  platform: {
    usersTotal: 0,
    usersActive: 0,
    businessesTotal: 0,
    promosTotal: 0,
    qrsTotal: 0,
    usersByRole: {},
  },
  support: {
    ticketsTotal: 0,
    newCount: 0,
    inProgressCount: 0,
    waitingCount: 0,
    closedCount: 0,
    activeAgents: 0,
    pendingRequests: 0,
  },
  observability: {
    total: 0,
    errorLike: 0,
    warnLike: 0,
  },
  businesses: [],
  promos: [],
  qrs: [],
  systemLogs: [],
};

async function countRows(table: string): Promise<CountResult> {
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });
  if (error) {
    return {
      ok: false,
      count: 0,
      error: String(error.message || error),
    };
  }
  return { ok: true, count: Number(count || 0) };
}

export default function AdminInicioScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [overview, setOverview] = useState<OverviewState>(EMPTY_OVERVIEW);

  const hasErrors = errors.length > 0;

  const loadOverview = useCallback(async () => {
    const nextErrors: string[] = [];

    const [
      usersCount,
      businessesCount,
      promosCount,
      qrsCount,
      usersResult,
      supportSummaryResult,
      agentsResult,
      obsResult,
      businessesResult,
      promosResult,
      qrsResult,
      systemLogsResult,
    ] = await Promise.all([
      countRows("usuarios"),
      countRows("negocios"),
      countRows("promos"),
      countRows("qr_validos"),
      supabase
        .from("usuarios")
        .select("role, account_status")
        .limit(500),
      fetchSupportStatusSummary(supabase),
      fetchSupportAgentsDashboard(supabase, 120),
      fetchObservabilityEvents(supabase, {
        domain: "support",
        limit: 80,
      }),
      supabase.from("negocios").select("*").order("created_at", { ascending: false }).limit(10),
      supabase.from("promos").select("*").order("created_at", { ascending: false }).limit(10),
      supabase.from("qr_validos").select("*").order("created_at", { ascending: false }).limit(10),
      fetchObservabilityEvents(supabase, {
        domain: "observability",
        limit: 40,
      }),
    ]);

    if (!usersCount.ok) nextErrors.push(`usuarios: ${usersCount.error}`);
    if (!businessesCount.ok) nextErrors.push(`negocios: ${businessesCount.error}`);
    if (!promosCount.ok) nextErrors.push(`promos: ${promosCount.error}`);
    if (!qrsCount.ok) nextErrors.push(`qr_validos: ${qrsCount.error}`);

    const usersRows = usersResult.error ? [] : usersResult.data || [];
    if (usersResult.error) {
      nextErrors.push(`usuarios (roles/estado): ${String(usersResult.error.message || usersResult.error)}`);
    }

    const usersByRole: Record<string, number> = {};
    let usersActive = 0;
    for (const row of usersRows) {
      const role = String(row?.role || "sin_rol").trim().toLowerCase() || "sin_rol";
      const status = String(row?.account_status || "active").trim().toLowerCase();
      usersByRole[role] = (usersByRole[role] || 0) + 1;
      if (status === "active") usersActive += 1;
    }

    if (!supportSummaryResult.ok) {
      nextErrors.push(`soporte (resumen): ${supportSummaryResult.error || "unknown_error"}`);
    }
    if (!agentsResult.ok) {
      nextErrors.push(`soporte (asesores): ${agentsResult.error || "unknown_error"}`);
    }
    if (!obsResult.ok) {
      nextErrors.push(`observabilidad: ${obsResult.error || "unknown_error"}`);
    }
    if (businessesResult.error) {
      nextErrors.push(`negocios (listado): ${String(businessesResult.error.message || businessesResult.error)}`);
    }
    if (promosResult.error) {
      nextErrors.push(`promos (listado): ${String(promosResult.error.message || promosResult.error)}`);
    }
    if (qrsResult.error) {
      nextErrors.push(`qr_validos (listado): ${String(qrsResult.error.message || qrsResult.error)}`);
    }
    if (!systemLogsResult.ok) {
      nextErrors.push(`sistema logs: ${systemLogsResult.error || "unknown_error"}`);
    }

    const supportSummary = supportSummaryResult.ok
      ? supportSummaryResult.data
      : { total: 0, byStatus: {}, byOrigin: {}, bySeverity: {} };
    const agents = agentsResult.ok ? agentsResult.data : [];
    const obsEvents = obsResult.ok ? obsResult.data : [];

    const activeAgents = agents.filter((agent: any) => Boolean(agent?.open_session?.id)).length;
    const pendingRequests = agents.filter(
      (agent: any) => String(agent?.session_request_status || "") === "pending",
    ).length;

    const errorLike = obsEvents.filter((event: any) => {
      const level = String(event?.level || "").toLowerCase();
      return level === "fatal" || level === "error";
    }).length;
    const warnLike = obsEvents.filter((event: any) => {
      const level = String(event?.level || "").toLowerCase();
      return level === "warn";
    }).length;

    setOverview({
      platform: {
        usersTotal: usersCount.count,
        usersActive,
        businessesTotal: businessesCount.count,
        promosTotal: promosCount.count,
        qrsTotal: qrsCount.count,
        usersByRole,
      },
      support: {
        ticketsTotal: Number(supportSummary.total || 0),
        newCount: Number(supportSummary.byStatus?.new || 0),
        inProgressCount: Number(supportSummary.byStatus?.in_progress || 0),
        waitingCount: Number(supportSummary.byStatus?.waiting_user || 0),
        closedCount: Number(supportSummary.byStatus?.closed || 0),
        activeAgents,
        pendingRequests,
      },
      observability: {
        total: obsEvents.length,
        errorLike,
        warnLike,
      },
      businesses: businessesResult.error ? [] : businessesResult.data || [],
      promos: promosResult.error ? [] : promosResult.data || [],
      qrs: qrsResult.error ? [] : qrsResult.data || [],
      systemLogs: systemLogsResult.ok ? systemLogsResult.data : [],
    });

    setErrors(nextErrors);
    setLoading(false);
  }, []);

  const refreshAll = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadOverview();
    } catch {
      setErrors(["No se pudieron cargar los indicadores de la plataforma."]);
      setLoading(false);
    } finally {
      setRefreshing(false);
    }
  }, [loadOverview]);

  useEffect(() => {
    void refreshAll();
  }, [refreshAll]);

  const roleSummary = useMemo(() => {
    const entries = Object.entries(overview.platform.usersByRole);
    if (entries.length === 0) return "Sin datos de roles.";
    return entries
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([role, count]) => `${role}: ${count}`)
      .join(" | ");
  }, [overview.platform.usersByRole]);

  return (
    <ScreenScaffold
      title="Inicio"
      subtitle="Vista global del estado de la plataforma"
      onRefresh={refreshing ? undefined : refreshAll}
    >
      <ScrollView contentContainerStyle={styles.content}>
        {loading ? (
          <SectionCard title="Cargando indicadores"><BlockSkeleton lines={4} /></SectionCard>
        ) : (
          <StaffMetricTiles items={[
            { label: "Total usuarios", value: overview.platform.usersTotal, icon: staffIcons.users },
            { label: "Usuarios activos", value: overview.platform.usersActive, icon: staffIcons.userCheck },
            { label: "Total negocios", value: overview.platform.businessesTotal, icon: staffIcons.store },
            { label: "Total promociones", value: overview.platform.promosTotal, icon: staffIcons.ticket },
            { label: "Total QRs registrados", value: overview.platform.qrsTotal, icon: staffIcons.qrCode },
          ]} />
        )}

        {!loading && hasErrors && (
          <SectionCard title="Datos pendientes">
            <View style={styles.errorsWrap}>
              {errors.map((item, index) => (
                <Text key={index} style={styles.errorText}>{item}</Text>
              ))}
            </View>
          </SectionCard>
        )}

        {!loading && <SectionCard title="Usuarios por rol"><Text style={styles.metaText}>{roleSummary}</Text></SectionCard>}

        <SectionCard title="Soporte">
          {loading ? <BlockSkeleton lines={4} compact /> : null}
          {!loading ? (
            <View style={styles.metricsGrid}>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>{overview.support.ticketsTotal}</Text>
                <Text style={styles.metricLabel}>Tickets</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>{overview.support.newCount}</Text>
                <Text style={styles.metricLabel}>Nuevos</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>{overview.support.inProgressCount}</Text>
                <Text style={styles.metricLabel}>En progreso</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>{overview.support.waitingCount}</Text>
                <Text style={styles.metricLabel}>Esperando usuario</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>{overview.support.closedCount}</Text>
                <Text style={styles.metricLabel}>Cerrados</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>{overview.support.activeAgents}</Text>
                <Text style={styles.metricLabel}>Asesores activos</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>{overview.support.pendingRequests}</Text>
                <Text style={styles.metricLabel}>Solicitudes pendientes</Text>
              </View>
            </View>
          ) : null}
        </SectionCard>

        <SectionCard title="Observabilidad soporte">
          {loading ? <BlockSkeleton lines={2} compact /> : null}
          {!loading ? (
            <View style={styles.metricsGrid}>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>{overview.observability.total}</Text>
                <Text style={styles.metricLabel}>Eventos recientes</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>{overview.observability.errorLike}</Text>
                <Text style={styles.metricLabel}>Errores/fatales</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>{overview.observability.warnLike}</Text>
                <Text style={styles.metricLabel}>Warnings</Text>
              </View>
            </View>
          ) : null}
        </SectionCard>

        <SectionCard title="Negocios (admin)" subtitle="Listado operativo reciente">
          {loading ? <BlockSkeleton lines={4} compact /> : null}
          {!loading && overview.businesses.length === 0 ? (
            <Text style={styles.metaText}>Sin negocios para mostrar.</Text>
          ) : null}
          {!loading
            ? overview.businesses.map((row: any, index) => (
                <View key={`${String(row?.id || index)}-${index}`} style={styles.listItem}>
                  <Text style={styles.listTitle}>
                    {String(readFirst(row, ["nombre", "razon_social", "name"], "Negocio"))}
                  </Text>
                  <Text style={styles.listMeta}>
                    {String(readFirst(row, ["public_id", "id"], "-"))} | estado:{" "}
                    {String(readFirst(row, ["status", "estado", "account_status"], "active"))}
                  </Text>
                  <Text style={styles.listMeta}>
                    alta: {formatDateTime(readFirst(row, ["created_at"], null))}
                  </Text>
                </View>
              ))
            : null}
        </SectionCard>

        <SectionCard title="Promos (admin)" subtitle="Visibilidad reciente de promociones">
          {loading ? <BlockSkeleton lines={4} compact /> : null}
          {!loading && overview.promos.length === 0 ? (
            <Text style={styles.metaText}>Sin promos para mostrar.</Text>
          ) : null}
          {!loading
            ? overview.promos.map((row: any, index) => (
                <View key={`${String(row?.id || index)}-${index}`} style={styles.listItem}>
                  <Text style={styles.listTitle}>
                    {String(readFirst(row, ["titulo", "nombre", "title"], "Promo"))}
                  </Text>
                  <Text style={styles.listMeta}>
                    {String(readFirst(row, ["public_id", "id"], "-"))} | estado:{" "}
                    {String(readFirst(row, ["status", "estado"], "pendiente"))}
                  </Text>
                  <Text style={styles.listMeta}>
                    alta: {formatDateTime(readFirst(row, ["created_at"], null))}
                  </Text>
                </View>
              ))
            : null}
        </SectionCard>

        <SectionCard title="QRs (admin)" subtitle="Auditoria de codigos recientes">
          {loading ? <BlockSkeleton lines={4} compact /> : null}
          {!loading && overview.qrs.length === 0 ? (
            <Text style={styles.metaText}>Sin QRs para mostrar.</Text>
          ) : null}
          {!loading
            ? overview.qrs.map((row: any, index) => (
                <View key={`${String(row?.id || index)}-${index}`} style={styles.listItem}>
                  <Text style={styles.listTitle}>
                    {String(readFirst(row, ["code", "codigo", "token", "id"], "QR"))}
                  </Text>
                  <Text style={styles.listMeta}>
                    estado: {String(readFirst(row, ["status", "estado"], "active"))} | negocio:{" "}
                    {String(readFirst(row, ["negocioid", "negocio_id"], "-"))}
                  </Text>
                  <Text style={styles.listMeta}>
                    alta: {formatDateTime(readFirst(row, ["created_at"], null))}
                  </Text>
                </View>
              ))
            : null}
        </SectionCard>

        <SectionCard title="Reportes (admin)" subtitle="Resumen operativo para toma de decisiones">
          {loading ? <BlockSkeleton lines={3} compact /> : null}
          {!loading ? (
            <View style={styles.metricsGrid}>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>{overview.support.newCount}</Text>
                <Text style={styles.metricLabel}>Tickets nuevos</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>{overview.support.waitingCount}</Text>
                <Text style={styles.metricLabel}>Esperando usuario</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>{overview.support.closedCount}</Text>
                <Text style={styles.metricLabel}>Tickets cerrados</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>{overview.observability.errorLike}</Text>
                <Text style={styles.metricLabel}>Errores soporte</Text>
              </View>
            </View>
          ) : null}
        </SectionCard>

        <SectionCard title="Sistema/Logs (admin)" subtitle="Eventos observability recientes">
          {loading ? <BlockSkeleton lines={4} compact /> : null}
          {!loading && overview.systemLogs.length === 0 ? (
            <Text style={styles.metaText}>Sin eventos de sistema recientes.</Text>
          ) : null}
          {!loading
            ? overview.systemLogs.slice(0, 12).map((row: any, index) => (
                <View key={`${String(row?.id || index)}-${index}`} style={styles.listItem}>
                  <Text style={styles.listTitle}>
                    {String(readFirst(row, ["event_type"], "log"))} |{" "}
                    {String(readFirst(row, ["level"], "info"))}
                  </Text>
                  <Text style={styles.listMeta}>
                    {String(readFirst(row, ["message"], "Sin mensaje"))}
                  </Text>
                  <Text style={styles.listMeta}>
                    {formatDateTime(readFirst(row, ["occurred_at", "created_at"], null))}
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
    gap: 24,
    paddingBottom: 48,
  },
  errorsWrap: {
    gap: 4,
  },
  errorText: {
    fontSize: 12,
    color: "#B91C1C",
    fontWeight: "600",
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  metricCard: {
    minWidth: 104,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 2,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
  },
  metricLabel: {
    fontSize: 11,
    color: "#475569",
  },
  metaText: {
    marginTop: 4,
    fontSize: 12,
    color: "#64748B",
  },
  listItem: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 2,
  },
  listTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0F172A",
  },
  listMeta: {
    fontSize: 11,
    color: "#475569",
  },
});
