import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ScreenScaffold from "@features/staff/StaffScreenScaffold";
import SectionCard from "@features/staff/StaffSectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { supabase } from "@shared/services/mobileApi";
import { useAppStore } from "@shared/store/appStore";
import {
  fetchSupportAgentEventsHistory,
  fetchSupportAgentProfile,
} from "@shared/services/supportDeskQueries";
import { formatDateTime } from "@shared/services/entityQueries";
import { SupportBadge, SupportButton, SupportNotice } from "./SupportTicketUi";
import { SupportDiagnosticItem, supportDetailStyles } from "./SupportDiagnosticsUi";

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
  if (eventType === "agent_login") return "Sesión iniciada";
  if (eventType === "agent_logout") return "Sesión finalizada";
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
        title: session.end_at ? "Sesión finalizada" : "Sesión activa",
        subtitle: `Inicio: ${formatDateTime(session.start_at)} | Fin: ${
          session.end_at ? formatDateTime(session.end_at) : "En curso"
        }`,
        metadata: [
          `ID: ${session.id}`,
          `Última actividad: ${formatDateTime(session.last_seen_at)}`,
          `Autorizado por: ${actorLabel(session.authorized_by)}`,
          ...(session.end_reason ? [`Motivo de cierre: ${session.end_reason}`] : []),
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
        subtitle: "Tu solicitud sigue en espera de aprobación.",
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
          `Bloqueado: ${profile.blocked ? "sí" : "no"}`,
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
    void loadHistory().catch(() => {
      setError("No se pudo cargar el historial.");
      setRows([]);
      setLoading(false);
    });
  }, [loadHistory]);

  const groupedCount = useMemo(() => {
    return {
      actual: rows.filter((row) => row.status === "actual").length,
      futura: rows.filter((row) => row.status === "futura").length,
      pasada: rows.filter((row) => row.status === "pasada").length,
    };
  }, [rows]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadHistory();
    } catch {
      setError("No se pudo cargar el historial.");
    } finally {
      setRefreshing(false);
    }
  }, [loadHistory]);

  return (
    <ScreenScaffold
      title="Jornadas y sesiones"
      onRefresh={refreshing || loading ? undefined : () => { void onRefresh(); }}
    >
      <FlatList
        data={loading ? [] : rows}
        keyExtractor={(row) => row.id}
        contentContainerStyle={supportDetailStyles.content}
        ListHeaderComponent={(
          <View style={supportDetailStyles.headerStack}>
            <SectionCard
              title="Jornadas y sesiones"
              subtitle="Historial de autorizaciones, sesiones y eventos."
              right={(
                <SupportButton label={refreshing || loading ? "Cargando…" : "Recargar"} disabled={loading || refreshing} onPress={() => { void onRefresh(); }} />
              )}
            >
              <View style={supportDetailStyles.row}>
                <SupportBadge>Historial unificado</SupportBadge>
              </View>
            </SectionCard>
            {!loading ? (
              <View style={styles.metricsWrap}>
                <MetricCard label="Actual" value={groupedCount.actual} color="#047857" />
                <MetricCard label="Futura" value={groupedCount.futura} color="#5E30A5" />
                <MetricCard label="Pasada" value={groupedCount.pasada} color="#475569" />
              </View>
            ) : null}
            {error ? <SupportNotice tone="warning">{error}</SupportNotice> : null}
            <Text accessibilityRole="header" style={supportDetailStyles.heading}>Historial</Text>
          </View>
        )}
        ListEmptyComponent={loading ? <BlockSkeleton lines={8} compact /> : <Text style={supportDetailStyles.meta}>No hay jornadas o sesiones registradas.</Text>}
        renderItem={({ item }) => (
          <SupportDiagnosticItem title={item.title} badge={<SupportBadge tone={item.status === "actual" ? "positive" : item.status === "futura" ? "info" : "neutral"}>{item.status}</SupportBadge>}>
            <Text style={supportDetailStyles.meta}>
              {item.type === "session" ? "Sesión" : item.type === "evento" ? "Evento" : "Jornada"} · {formatDateTime(item.occurred_at)}
            </Text>
            <Text style={supportDetailStyles.description}>{item.subtitle}</Text>
            {Array.isArray(item.metadata) ? item.metadata.map((entry: string, index: number) => (
              <Text key={index} style={supportDetailStyles.meta}>{entry}</Text>
            )) : null}
          </SupportDiagnosticItem>
        )}
      />
    </ScreenScaffold>
  );
}

function MetricCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  metricsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  metricCard: { flex: 1, minWidth: 76, padding: 12, borderWidth: 1, borderColor: "#E9E2F7", borderRadius: 16, backgroundColor: "#FFFFFF", gap: 4 },
  metricValue: { fontSize: 23, fontWeight: "800", color: "#2F1A55" },
  metricLabel: { color: "#64748B", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 },
});
