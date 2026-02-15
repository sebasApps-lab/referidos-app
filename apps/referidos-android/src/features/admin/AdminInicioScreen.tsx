import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { supabase } from "@shared/services/mobileApi";
import { fetchObservabilityEvents } from "@shared/services/entityQueries";
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
};

type CountResult = {
  ok: boolean;
  count: number;
  error?: string;
};

const RN_INCLUDED_MODULES = [
  "Inicio",
  "Usuarios",
  "Soporte / asesores",
  "Observabilidad",
  "Sistema (perfil/sesion)",
];

const RN_DEFERRED_MODULES = ["Negocios", "Promos", "QRs", "Reportes", "Logs del sistema"];

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
    if (!refreshing) setLoading(true);

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
    });

    setErrors(nextErrors);
    setLoading(false);
  }, [refreshing]);

  const refreshAll = useCallback(async () => {
    setRefreshing(true);
    await loadOverview();
    setRefreshing(false);
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
    <ScreenScaffold title="Admin Inicio" subtitle="KPIs operativos del alcance RN">
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard
          title="Estado general"
          subtitle="Resumen de plataforma, soporte y observabilidad"
          right={
            <Pressable
              onPress={refreshAll}
              disabled={refreshing}
              style={[styles.secondaryBtn, refreshing && styles.btnDisabled]}
            >
              <Text style={styles.secondaryBtnText}>{refreshing ? "..." : "Recargar"}</Text>
            </Pressable>
          }
        >
          {loading ? <BlockSkeleton lines={4} compact /> : null}
          {!loading && hasErrors ? (
            <View style={styles.errorsWrap}>
              {errors.map((item, index) => (
                <Text key={`${item}-${index}`} style={styles.errorText}>
                  {item}
                </Text>
              ))}
            </View>
          ) : null}
          {!loading && !hasErrors ? (
            <Text style={styles.okText}>Lectura de KPIs completada sin errores.</Text>
          ) : null}
        </SectionCard>

        <SectionCard title="Plataforma">
          {loading ? <BlockSkeleton lines={4} compact /> : null}
          {!loading ? (
            <View style={styles.metricsGrid}>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>{overview.platform.usersTotal}</Text>
                <Text style={styles.metricLabel}>Usuarios</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>{overview.platform.usersActive}</Text>
                <Text style={styles.metricLabel}>Usuarios activos</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>{overview.platform.businessesTotal}</Text>
                <Text style={styles.metricLabel}>Negocios</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>{overview.platform.promosTotal}</Text>
                <Text style={styles.metricLabel}>Promos</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>{overview.platform.qrsTotal}</Text>
                <Text style={styles.metricLabel}>QR validos</Text>
              </View>
            </View>
          ) : null}
          {!loading ? <Text style={styles.metaText}>Roles: {roleSummary}</Text> : null}
        </SectionCard>

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

        <SectionCard title="Alcance RN Fase 8">
          <Text style={styles.scopeTitle}>Incluido en RN</Text>
          {RN_INCLUDED_MODULES.map((item) => (
            <Text key={item} style={styles.scopeText}>
              - {item}
            </Text>
          ))}
          <Text style={styles.scopeTitle}>Diferido (PWA-only por decision de alcance)</Text>
          {RN_DEFERRED_MODULES.map((item) => (
            <Text key={item} style={styles.scopeText}>
              - {item}
            </Text>
          ))}
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
  errorsWrap: {
    gap: 4,
  },
  errorText: {
    fontSize: 12,
    color: "#B91C1C",
    fontWeight: "600",
  },
  okText: {
    fontSize: 12,
    color: "#166534",
    fontWeight: "700",
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
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#1D4ED8",
    backgroundColor: "#EFF6FF",
    borderRadius: 9,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  secondaryBtnText: {
    color: "#1D4ED8",
    fontSize: 12,
    fontWeight: "700",
  },
  btnDisabled: {
    opacity: 0.55,
  },
  scopeTitle: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "700",
    color: "#334155",
  },
  scopeText: {
    fontSize: 12,
    color: "#475569",
  },
});
