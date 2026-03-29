import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { supabase } from "@shared/services/mobileApi";
import { useAppStore } from "@shared/store/appStore";
import {
  fetchActiveAgentSession,
  fetchSupportAgentEventsHistory,
  fetchSupportAgentProfile,
} from "@shared/services/supportDeskQueries";
import { formatDateTime } from "@shared/services/entityQueries";

function classifyStatusByWindow(startAt: any, endAt: any) {
  const now = Date.now();
  const start = startAt ? new Date(startAt) : null;
  const end = endAt ? new Date(endAt) : null;
  if (start && !Number.isNaN(start.getTime()) && start.getTime() > now) {
    return "futura";
  }
  if (end && !Number.isNaN(end.getTime()) && end.getTime() < now) {
    return "pasada";
  }
  return "actual";
}

function eventTitle(eventType: string) {
  if (eventType === "agent_authorized") return "Jornada autorizada";
  if (eventType === "agent_revoked") return "Jornada revocada";
  if (eventType === "agent_login") return "Sesion iniciada";
  if (eventType === "agent_logout") return "Sesion finalizada";
  return eventType || "Evento";
}

export default function SoporteJornadasScreen() {
  const usuario = useAppStore((state) => state.onboarding?.usuario || null);
  const usuarioId = String(usuario?.id || "").trim();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [rows, setRows] = useState<any[]>([]);

  const loadHistory = useCallback(async () => {
    if (!usuarioId) {
      setRows([]);
      setLoading(false);
      return;
    }

    const [profileRes, sessionsRes, eventsRes] = await Promise.all([
      fetchSupportAgentProfile(supabase, usuarioId),
      supabase
        .from("support_agent_sessions")
        .select("id, agent_id, start_at, end_at, end_reason, last_seen_at, authorized_by")
        .eq("agent_id", usuarioId)
        .order("start_at", { ascending: false })
        .limit(150),
      fetchSupportAgentEventsHistory(supabase, usuarioId),
    ]);

    if (!profileRes.ok || sessionsRes.error || !eventsRes.ok) {
      setError(
        profileRes.error ||
          String(sessionsRes.error?.message || "") ||
          eventsRes.error ||
          "No se pudo cargar el historial.",
      );
      setRows([]);
      setLoading(false);
      return;
    }

    const profile = profileRes.data || null;
    const sessions = Array.isArray(sessionsRes.data) ? sessionsRes.data : [];
    const events = eventsRes.data || [];

    const actorIds = Array.from(
      new Set(
        [
          ...sessions.map((session: any) => session.authorized_by).filter(Boolean),
          ...events.map((event: any) => event.actor_id).filter(Boolean),
        ].map(String),
      ),
    );

    let usersById: Record<string, any> = {};
    if (actorIds.length) {
      const { data: usersData } = await supabase
        .from("usuarios")
        .select("id, nombre, apellido, public_id")
        .in("id", actorIds);
      usersById = (usersData || []).reduce((acc: Record<string, any>, row: any) => {
        acc[row.id] = row;
        return acc;
      }, {});
    }

    const actorLabel = (actorId: string) => {
      if (!actorId) return "Sistema";
      const row = usersById[actorId];
      if (!row) return actorId;
      const fullName = [row.nombre, row.apellido].filter(Boolean).join(" ").trim();
      return fullName || row.public_id || actorId;
    };

    const sessionRows = sessions.map((session: any) => {
      const status = session.end_at
        ? classifyStatusByWindow(session.start_at, session.end_at)
        : classifyStatusByWindow(session.start_at, null);
      return {
        id: `session-${session.id}`,
        type: "session",
        status,
        occurred_at: session.start_at || session.last_seen_at,
        title: session.end_at ? "Sesion finalizada" : "Sesion activa",
        subtitle: `Inicio: ${formatDateTime(session.start_at)} | Fin: ${
          session.end_at ? formatDateTime(session.end_at) : "En curso"
        }`,
        metadata: [
          `ID: ${session.id}`,
          `Last seen: ${formatDateTime(session.last_seen_at)}`,
          `Fin: ${session.end_reason || "manual_end"}`,
          `Autorizado por: ${actorLabel(session.authorized_by)}`,
        ],
      };
    });

    const eventRows = events.map((event: any) => ({
      id: `event-${event.id}`,
      type: "evento",
      status: classifyStatusByWindow(event.created_at, event.created_at),
      occurred_at: event.created_at,
      title: eventTitle(event.event_type),
      subtitle: `Actor: ${actorLabel(event.actor_id)}`,
      metadata: [
        `Tipo: ${event.event_type}`,
        `Fecha: ${formatDateTime(event.created_at)}`,
        `Detalle: ${JSON.stringify(event.details || {})}`,
      ],
    }));

    const profileRows = [];
    if (profile?.session_request_status === "pending") {
      profileRows.push({
        id: "profile-pending",
        type: "jornada",
        status: "actual",
        occurred_at: profile.session_request_at || profile.authorized_until || profile.authorized_from,
        title: "Solicitud de jornada pendiente",
        subtitle: "Tu solicitud sigue en espera de aprobacion.",
        metadata: [`Solicitado: ${formatDateTime(profile.session_request_at)}`],
      });
    }

    if (profile?.authorized_for_work) {
      const status = classifyStatusByWindow(profile.authorized_from, profile.authorized_until);
      profileRows.push({
        id: "profile-authorized",
        type: "jornada",
        status,
        occurred_at: profile.authorized_from || profile.authorized_until,
        title: status === "futura" ? "Jornada programada" : "Jornada autorizada",
        subtitle: `Desde: ${formatDateTime(profile.authorized_from)} | Hasta: ${formatDateTime(
          profile.authorized_until,
        )}`,
        metadata: [
          `Bloqueado: ${profile.blocked ? "si" : "no"}`,
        ],
      });
    }

    const unifiedRows = [...profileRows, ...sessionRows, ...eventRows]
      .filter((row) => row.occurred_at)
      .sort((a, b) => new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime());

    setRows(unifiedRows);
    setError("");
    setLoading(false);
  }, [usuarioId]);

  useEffect(() => {
    setLoading(true);
    void loadHistory();
  }, [loadHistory]);

  const groupedCount = useMemo(() => {
    return {
      actual: rows.filter((row) => row.status === "actual").length,
      futura: rows.filter((row) => row.status === "futura").length,
      pasada: rows.filter((row) => row.status === "pasada").length,
    };
  }, [rows]);

  const badgeStyleByStatus = useMemo(
    () => ({
      actual: styles.badge_actual,
      futura: styles.badge_futura,
      pasada: styles.badge_pasada,
    }),
    [],
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadHistory();
    setRefreshing(false);
  }, [loadHistory]);

  return (
    <ScreenScaffold
      title="Soporte Jornadas"
      subtitle="Historial unificado de autorizaciones, sesiones y eventos"
    >
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard
          title="Resumen"
          subtitle="Jornadas pasadas, actuales y futuras"
          right={
            <Pressable onPress={onRefresh} disabled={loading || refreshing} style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>{loading || refreshing ? "..." : "Recargar"}</Text>
            </Pressable>
          }
        >
          {loading ? <BlockSkeleton lines={3} compact /> : null}
          {!loading ? (
            <View style={styles.metricsWrap}>
              <MetricCard label="Actual" value={groupedCount.actual} />
              <MetricCard label="Futura" value={groupedCount.futura} />
              <MetricCard label="Pasada" value={groupedCount.pasada} />
            </View>
          ) : null}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </SectionCard>

        <SectionCard title="Historial">
          {loading ? <BlockSkeleton lines={8} compact /> : null}
          {!loading && rows.length === 0 ? (
            <Text style={styles.emptyText}>No hay jornadas o sesiones registradas.</Text>
          ) : null}
          {!loading
            ? rows.map((row) => (
                <View key={row.id} style={styles.rowCard}>
                  <View style={styles.rowTop}>
                    <Text style={[styles.badge, badgeStyleByStatus[row.status as keyof typeof badgeStyleByStatus]]}>
                      {String(row.status).toUpperCase()}
                    </Text>
                    <Text style={styles.rowMeta}>{formatDateTime(row.occurred_at)}</Text>
                  </View>
                  <Text style={styles.rowTitle}>{row.title}</Text>
                  <Text style={styles.rowSubtitle}>{row.subtitle}</Text>
                  {Array.isArray(row.metadata)
                    ? row.metadata.map((item: string) => (
                        <Text key={`${row.id}-${item}`} style={styles.rowMeta}>
                          {item}
                        </Text>
                      ))
                    : null}
                </View>
              ))
            : null}
        </SectionCard>
      </ScrollView>
    </ScreenScaffold>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 12,
    paddingBottom: 24,
  },
  metricsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  metricCard: {
    minWidth: 100,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 2,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },
  metricLabel: {
    fontSize: 11,
    color: "#64748B",
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
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 10,
    fontWeight: "700",
    overflow: "hidden",
  },
  badge_actual: {
    backgroundColor: "#DCFCE7",
    color: "#15803D",
  },
  badge_futura: {
    backgroundColor: "#F3E8FF",
    color: "#7E22CE",
  },
  badge_pasada: {
    backgroundColor: "#E2E8F0",
    color: "#475569",
  },
  rowTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },
  rowSubtitle: {
    fontSize: 12,
    color: "#475569",
  },
  rowMeta: {
    fontSize: 11,
    color: "#64748B",
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 12,
    fontWeight: "600",
  },
  emptyText: {
    color: "#64748B",
    fontSize: 12,
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
