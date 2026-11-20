import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { STACK_ROUTES } from "@navigation/routeKeys";
import ScreenScaffold from "@features/staff/StaffScreenScaffold";
import SectionCard from "@features/staff/StaffSectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import ObservabilityEventFeed from "@shared/ui/ObservabilityEventFeed";
import { mobileApi, observability, supabase } from "@shared/services/mobileApi";
import { useAppStore } from "@shared/store/appStore";
import { useSupportDeskStore } from "@shared/store/supportDeskStore";
import {
  SUPPORT_ORIGIN_FILTERS,
  SupportOriginFilterId,
} from "@shared/constants/supportDesk";
import { SupportBadge, SupportButton, SupportNotice, supportChannelLabel, supportStatusLabel } from "./SupportTicketUi";
import {
  fetchActiveAgentSession,
  fetchSupportAgentProfile,
  fetchSupportInboxRows,
  toSupportThreadSubtitle,
} from "@shared/services/supportDeskQueries";

const ACTIVE_AGENT_STATUSES = ["starting", "assigned", "in_progress", "waiting_user", "queued", "closing"];
const INBOX_GROUPS = [
  { id: "available", label: "Disponibles" },
  { id: "assigned", label: "Asignados" },
  { id: "resolved", label: "Resueltos" },
] as const;
type Group = (typeof INBOX_GROUPS)[number]["id"];

export default function SoporteInboxScreen() {
  const navigation = useNavigation<any>();
  const usuario = useAppStore((state) => state.onboarding?.usuario || null);
  const setSelectedThreadPublicId = useSupportDeskStore(
    (state) => state.setSelectedThreadPublicId,
  );

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [threads, setThreads] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [activeGroup, setActiveGroup] = useState<Group>("available");
  const [activeOrigin, setActiveOrigin] = useState<SupportOriginFilterId>("all");
  const [sessionLoading, setSessionLoading] = useState(true);
  const [sessionError, setSessionError] = useState("");
  const [agentProfile, setAgentProfile] = useState<any | null>(null);
  const [activeSession, setActiveSession] = useState<any | null>(null);
  const [sessionBusy, setSessionBusy] = useState(false);
  const [taking, setTaking] = useState("");
  const refreshPending = useRef(false);
  const sessionPending = useRef(false);
  const takePending = useRef(false);

  const usuarioId = String(usuario?.id || "").trim();
  const sessionActive = Boolean(activeSession?.id);
  const isAuthorized = Boolean(agentProfile?.authorized_for_work && !agentProfile?.blocked);
  const requestPending = agentProfile?.session_request_status === "pending";

  const hasActiveThread = useMemo(() => {
    if (!usuarioId) return false;
    return threads.some(
      (thread) =>
        String(thread?.assigned_agent_id || "") === usuarioId &&
        ACTIVE_AGENT_STATUSES.includes(String(thread?.status || "")),
    );
  }, [threads, usuarioId]);

  const filteredThreads = useMemo(() => {
    return threads.filter((thread) => {
      if (activeOrigin !== "all" && String(thread?.request_origin || "registered") !== activeOrigin) return false;
      if (activeGroup === "available") return !thread.assigned_agent_id && ["new", "queued"].includes(thread.status);
      if (activeGroup === "assigned") return String(thread.assigned_agent_id || "") === usuarioId && ACTIVE_AGENT_STATUSES.includes(thread.status);
      return thread.status === "closed";
    });
  }, [activeGroup, activeOrigin, threads, usuarioId]);

  const loadSessionState = useCallback(async () => {
    if (!usuarioId) {
      setSessionLoading(false);
      return;
    }
    setSessionLoading(true);
    try {
      const [profileResult, sessionResult] = await Promise.all([
        fetchSupportAgentProfile(supabase, usuarioId),
        fetchActiveAgentSession(supabase, usuarioId),
      ]);
      setAgentProfile(profileResult.ok ? profileResult.data || null : null);
      setActiveSession(sessionResult.ok ? sessionResult.data || null : null);
      setSessionError(profileResult.error || sessionResult.error || "");
    } catch {
      setAgentProfile(null);
      setActiveSession(null);
      setSessionError("No se pudo cargar la jornada de soporte.");
    } finally {
      setSessionLoading(false);
    }
  }, [usuarioId]);

  const loadThreads = useCallback(async () => {
    if (!usuarioId) {
      setThreads([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const result = await fetchSupportInboxRows(supabase, { isAdmin: false, usuarioId, limit: 120 });
      setThreads(result.ok ? result.data : []);
      setError(result.ok ? "" : result.error || "No se pudo cargar la bandeja.");
    } catch {
      setThreads([]);
      setError("No se pudo cargar la bandeja.");
    } finally {
      setLoading(false);
    }
  }, [usuarioId]);

  const refreshAll = useCallback(async () => {
    if (refreshPending.current) return;
    refreshPending.current = true;
    setRefreshing(true);
    try {
      await Promise.all([loadSessionState(), loadThreads()]);
    } finally {
      refreshPending.current = false;
      setRefreshing(false);
    }
  }, [loadSessionState, loadThreads]);

  useFocusEffect(useCallback(() => {
    void refreshAll();
  }, [refreshAll]));

  useEffect(() => {
    if (!sessionActive) return undefined;
    const timer = setInterval(async () => {
      try {
        const result = await mobileApi.support.pingSession();
        if (!result?.ok) setSessionError(result?.error || "No se pudo mantener la jornada activa.");
      } catch {
        setSessionError("No se pudo comprobar si la jornada sigue activa.");
      }
    }, 30000);
    return () => clearInterval(timer);
  }, [sessionActive]);

  const changeSession = useCallback(async (ending: boolean) => {
    if (sessionPending.current) return;
    sessionPending.current = true;
    setSessionBusy(true);
    setSessionError("");
    const fallback = ending ? "No se pudo finalizar la jornada." : "No se pudo solicitar la jornada.";
    try {
      const result = ending
        ? await mobileApi.support.endSession({ reason: "manual_end" })
        : await mobileApi.support.startSession({});
      if (!result?.ok) {
        setSessionError(result?.error || fallback);
        return;
      }
      void observability.track({
        level: "info",
        category: "audit",
        message: ending ? "support_end_session" : "support_request_session",
        context: ending ? { role: "soporte" } : { role: "soporte", pending: Boolean(result?.data?.pending) },
      }).catch(() => {});
      await Promise.all([loadSessionState(), loadThreads()]);
    } catch {
      setSessionError(fallback);
    } finally {
      sessionPending.current = false;
      setSessionBusy(false);
    }
  }, [loadSessionState, loadThreads]);

  const handleTakeThread = useCallback(
    async (threadPublicId: string) => {
      if (!threadPublicId || takePending.current || hasActiveThread) return;
      setSessionError("");
      if (!sessionActive) {
        setSessionError("Debes tener jornada activa para tomar tickets.");
        return;
      }
      if (!isAuthorized) {
        setSessionError("No tienes autorización de jornada activa.");
        return;
      }
      takePending.current = true;
      setTaking(threadPublicId);
      try {
        const result = await mobileApi.support.assignThread({ thread_public_id: threadPublicId });
        if (!result?.ok) {
          setSessionError(result?.error || "No se pudo tomar el ticket.");
          return;
        }
        void observability.track({
          level: "info",
          category: "audit",
          message: "support_take_ticket",
          context: { thread_public_id: threadPublicId },
        }).catch(() => {});
        await loadThreads();
        setActiveGroup("assigned");
      } catch {
        setSessionError("No se pudo tomar el ticket.");
      } finally {
        takePending.current = false;
        setTaking("");
      }
    },
    [hasActiveThread, isAuthorized, loadThreads, sessionActive],
  );

  const openTicket = useCallback(
    (threadPublicId: string) => {
      const safeId = String(threadPublicId || "").trim();
      if (!safeId) return;
      setSelectedThreadPublicId(safeId);
      navigation.navigate(STACK_ROUTES.SOPORTE.TICKET, { threadPublicId: safeId });
    },
    [navigation, setSelectedThreadPublicId],
  );

  return (
    <ScreenScaffold
      title="Inbox de tickets"
      subtitle="Gestiona tickets según su estado, origen y prioridad."
      onRefresh={() => { void refreshAll(); }}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard
          title="Jornada de soporte"
          right={(
            <SupportButton
              label={sessionBusy ? "Procesando…" : sessionActive ? "Terminar jornada" : requestPending ? "Volver a solicitar" : isAuthorized ? "Iniciar jornada" : "Solicitar jornada"}
              onPress={() => { void changeSession(sessionActive); }}
              kind={sessionActive ? "outline" : "primary"}
              disabled={refreshing || sessionLoading || sessionBusy}
            />
          )}
        >
          {sessionLoading ? <BlockSkeleton lines={2} compact /> : (
            <View style={styles.row}>
              <SupportBadge tone={sessionActive ? "positive" : "neutral"}>{sessionActive ? "Jornada activa" : "Jornada inactiva"}</SupportBadge>
              <SupportBadge tone={isAuthorized ? "positive" : "warning"}>
                {agentProfile?.blocked ? "Bloqueado" : isAuthorized ? "Autorizado" : "Sin autorización"}
              </SupportBadge>
              {requestPending ? <SupportBadge tone="warning">Solicitud pendiente</SupportBadge> : null}
            </View>
          )}
          {sessionError ? <SupportNotice tone="warning">{sessionError}</SupportNotice> : null}
        </SectionCard>

        <View style={styles.filterGroup}>
          <View accessibilityLabel="Estado" style={styles.row}>
            {INBOX_GROUPS.map((group) => (
              <SupportButton
                key={group.id}
                label={group.label}
                kind={activeGroup === group.id ? "primary" : "outline"}
                selected={activeGroup === group.id}
                onPress={() => setActiveGroup(group.id)}
              />
            ))}
          </View>
          <View accessibilityLabel="Origen" style={styles.row}>
            {SUPPORT_ORIGIN_FILTERS.map((origin) => (
              <Pressable
                key={origin.id}
                accessibilityRole="button"
                accessibilityState={{ selected: activeOrigin === origin.id }}
                onPress={() => setActiveOrigin(origin.id)}
                style={[styles.origin, activeOrigin === origin.id && styles.originSelected]}
              >
                <Text style={[styles.originText, activeOrigin === origin.id && styles.originTextSelected]}>
                  {origin.id === "anonymous" ? "Anónimos" : origin.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <SectionCard title="Tickets">
          {loading ? <BlockSkeleton lines={6} compact /> : null}
          {!loading && error ? <SupportNotice tone="warning">{error}</SupportNotice> : null}
          {!loading && !error && !filteredThreads.length ? <Text style={styles.meta}>No hay tickets para estos filtros.</Text> : null}
          {!loading && !error ? filteredThreads.map((thread, index) => {
            const id = String(thread.public_id || "");
            const canTake = ["new", "queued"].includes(thread.status) && !thread.assigned_agent_id;
            const assignedToMe = String(thread.assigned_agent_id || "") === usuarioId;
            const anonymous = thread.request_origin === "anonymous";
            return (
              <View key={id || index} style={styles.ticketCard}>
                <View style={styles.ticketTop}>
                  <Text style={styles.ticketTitle}>{[id, thread.category].filter(Boolean).join(" · ") || "Ticket"}</Text>
                  {thread.severity ? <Text style={styles.meta}>{String(thread.severity).toUpperCase()}</Text> : null}
                </View>
                <Text style={styles.summary}>{String(thread.summary || "Sin resumen")}</Text>
                <View style={styles.row}>
                  <SupportBadge tone={anonymous ? "warning" : "positive"}>{anonymous ? "Anónimo" : "Registrado"}</SupportBadge>
                  {thread.app_channel ? <SupportBadge tone="info">{supportChannelLabel(thread.app_channel)}</SupportBadge> : null}
                  <SupportBadge>{supportStatusLabel(thread.status)}</SupportBadge>
                  {thread.handoff_required ? <SupportBadge tone="warning">Abandonado</SupportBadge> : null}
                </View>
                <Text style={styles.meta}>{toSupportThreadSubtitle(thread)}</Text>
                {anonymous && thread.contact_display ? <Text style={styles.meta}>Contacto: {String(thread.contact_display)}</Text> : null}
                {thread.handoff_required ? <SupportNotice tone="warning">El asesor anterior liberó este ticket por abandono.</SupportNotice> : null}
                <View style={styles.row}>
                  <SupportButton
                    label={assignedToMe && activeGroup === "assigned" ? "Continuar" : "Ver ticket"}
                    disabled={!id}
                    onPress={() => openTicket(id)}
                  />
                  {canTake ? (
                    <SupportButton
                      label={taking === id ? "Asignando…" : "Tomar ticket"}
                      kind="primary"
                      disabled={!id || !sessionActive || !isAuthorized || hasActiveThread || Boolean(taking) || sessionBusy}
                      onPress={() => { void handleTakeThread(id); }}
                    />
                  ) : null}
                </View>
              </View>
            );
          }) : null}
        </SectionCard>

        <SectionCard title="Observabilidad de soporte">
          <ObservabilityEventFeed
            title="Eventos de soporte recientes"
            defaultDomain="support"
            allowedDomains={["support"]}
            limit={30}
            screenTag="soporte_inbox"
          />
        </SectionCard>
      </ScrollView>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  content: { gap: 20, paddingBottom: 24 },
  row: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 8 },
  filterGroup: { gap: 8 },
  origin: { minHeight: 42, justifyContent: "center", borderRadius: 12, paddingHorizontal: 12 },
  originSelected: { backgroundColor: "#F0EBFF" },
  originText: { fontSize: 12, color: "#64748B", fontWeight: "600" },
  originTextSelected: { color: "#5E30A5" },
  ticketCard: { backgroundColor: "#FAF8FF", borderRadius: 16, borderWidth: 1, borderColor: "#E9E2F7", padding: 14, gap: 8 },
  ticketTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8 },
  ticketTitle: { flex: 1, color: "#2F1A55", fontWeight: "700", fontSize: 13, lineHeight: 18 },
  summary: { color: "#475569", fontSize: 14, lineHeight: 20 },
  meta: { color: "#64748B", fontSize: 12, lineHeight: 18 },
});
