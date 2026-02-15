import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TAB_ROUTES } from "@navigation/routeKeys";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import ObservabilityEventFeed from "@shared/ui/ObservabilityEventFeed";
import { mobileApi, observability, supabase } from "@shared/services/mobileApi";
import { useAppStore } from "@shared/store/appStore";
import { useSupportDeskStore } from "@shared/store/supportDeskStore";
import {
  SUPPORT_ORIGIN_FILTERS,
  SUPPORT_STATUS_GROUPS,
  SupportOriginFilterId,
  SupportStatusId,
} from "@shared/constants/supportDesk";
import {
  fetchActiveAgentSession,
  fetchSupportAgentProfile,
  fetchSupportInboxRows,
  toSupportThreadSubtitle,
} from "@shared/services/supportDeskQueries";

const ACTIVE_AGENT_STATUSES = ["assigned", "in_progress", "waiting_user"];

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
  const [activeStatus, setActiveStatus] = useState<SupportStatusId>("new");
  const [activeOrigin, setActiveOrigin] = useState<SupportOriginFilterId>("all");
  const [sessionLoading, setSessionLoading] = useState(true);
  const [sessionError, setSessionError] = useState("");
  const [agentProfile, setAgentProfile] = useState<any | null>(null);
  const [activeSession, setActiveSession] = useState<any | null>(null);

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
      if (String(thread?.status || "") !== activeStatus) return false;
      if (activeOrigin === "all") return true;
      return String(thread?.request_origin || "registered") === activeOrigin;
    });
  }, [activeOrigin, activeStatus, threads]);

  const loadSessionState = useCallback(async () => {
    if (!usuarioId) return;
    setSessionLoading(true);
    const [profileResult, sessionResult] = await Promise.all([
      fetchSupportAgentProfile(supabase, usuarioId),
      fetchActiveAgentSession(supabase, usuarioId),
    ]);
    if (!profileResult.ok) {
      setAgentProfile(null);
      setSessionError(profileResult.error || "No se pudo leer perfil de soporte.");
    } else {
      setAgentProfile(profileResult.data || null);
      if (!sessionError) setSessionError("");
    }
    if (!sessionResult.ok) {
      setActiveSession(null);
      if (!profileResult.ok) {
        setSessionError(profileResult.error || sessionResult.error || "No se pudo leer sesion.");
      }
    } else {
      setActiveSession(sessionResult.data || null);
    }
    setSessionLoading(false);
  }, [sessionError, usuarioId]);

  const loadThreads = useCallback(async () => {
    if (!usuarioId) return;
    if (!refreshing) setLoading(true);
    const result = await fetchSupportInboxRows(supabase, {
      isAdmin: false,
      usuarioId,
      limit: 120,
    });
    if (!result.ok) {
      setThreads([]);
      setError(result.error || "No se pudo cargar inbox.");
      setLoading(false);
      return;
    }
    setThreads(result.data);
    setError("");
    setLoading(false);
  }, [refreshing, usuarioId]);

  const refreshAll = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([loadSessionState(), loadThreads()]);
    setRefreshing(false);
  }, [loadSessionState, loadThreads]);

  useEffect(() => {
    void refreshAll();
  }, [refreshAll]);

  useEffect(() => {
    if (!sessionActive) return undefined;
    const timer = setInterval(async () => {
      const result = await mobileApi.support.pingSession();
      if (!result?.ok) {
        setSessionError(result?.error || "No se pudo mantener la jornada activa.");
      }
    }, 30000);
    return () => clearInterval(timer);
  }, [sessionActive]);

  const handleRequestSession = useCallback(async () => {
    setSessionError("");
    const result = await mobileApi.support.startSession({});
    if (!result?.ok) {
      setSessionError(result?.error || "No se pudo enviar solicitud de jornada.");
      return;
    }
    await observability.track({
      level: "info",
      category: "audit",
      message: "support_request_session",
      context: {
        role: "soporte",
        pending: Boolean(result?.data?.pending),
      },
    });
    await refreshAll();
  }, [refreshAll]);

  const handleEndSession = useCallback(async () => {
    setSessionError("");
    const result = await mobileApi.support.endSession({ reason: "manual_end" });
    if (!result?.ok) {
      setSessionError(result?.error || "No se pudo finalizar la jornada.");
      return;
    }
    await observability.track({
      level: "info",
      category: "audit",
      message: "support_end_session",
      context: { role: "soporte" },
    });
    await refreshAll();
  }, [refreshAll]);

  const handleTakeThread = useCallback(
    async (threadPublicId: string) => {
      setSessionError("");
      if (!sessionActive) {
        setSessionError("Debes tener jornada activa para tomar tickets.");
        return;
      }
      if (!isAuthorized) {
        setSessionError("No tienes autorizacion de jornada activa.");
        return;
      }
      const result = await mobileApi.support.assignThread({
        thread_public_id: threadPublicId,
      });
      if (!result?.ok) {
        setSessionError(result?.error || "No se pudo tomar ticket.");
        return;
      }
      await observability.track({
        level: "info",
        category: "audit",
        message: "support_take_ticket",
        context: { thread_public_id: threadPublicId },
      });
      await loadThreads();
    },
    [isAuthorized, loadThreads, sessionActive],
  );

  const openTicket = useCallback(
    (threadPublicId: string) => {
      const safeId = String(threadPublicId || "").trim();
      if (!safeId) return;
      setSelectedThreadPublicId(safeId);
      navigation.navigate(TAB_ROUTES.SOPORTE.TICKET);
    },
    [navigation, setSelectedThreadPublicId],
  );

  return (
    <ScreenScaffold title="Soporte Inbox" subtitle="Cola operativa con control de jornada y asignacion">
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard
          title="Jornada soporte"
          subtitle="Control de acceso, solicitud y sesion activa"
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
          {sessionLoading ? <BlockSkeleton lines={3} compact /> : null}

          {!sessionLoading ? (
            <View style={styles.statusWrap}>
              <Text style={styles.statusText}>
                Perfil:{" "}
                {agentProfile?.blocked
                  ? "bloqueado"
                  : agentProfile?.authorized_for_work
                    ? "autorizado"
                    : "sin autorizacion"}
              </Text>
              <Text style={styles.statusText}>
                Sesion: {sessionActive ? "activa" : "inactiva"}
              </Text>
              {requestPending ? <Text style={styles.pendingText}>Solicitud pendiente de admin.</Text> : null}
              {sessionError ? <Text style={styles.errorText}>{sessionError}</Text> : null}
            </View>
          ) : null}

          <View style={styles.actionsRow}>
            {!sessionActive ? (
              <Pressable onPress={handleRequestSession} style={styles.primaryBtn}>
                <Text style={styles.primaryBtnText}>
                  {requestPending ? "Solicitar nuevamente" : "Solicitar/Iniciar jornada"}
                </Text>
              </Pressable>
            ) : (
              <Pressable onPress={handleEndSession} style={styles.outlineBtn}>
                <Text style={styles.outlineBtnText}>Finalizar jornada</Text>
              </Pressable>
            )}
          </View>
        </SectionCard>

        <SectionCard title="Filtros inbox">
          <Text style={styles.filterLabel}>Estado</Text>
          <View style={styles.chipsWrap}>
            {SUPPORT_STATUS_GROUPS.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => setActiveStatus(item.id)}
                style={[styles.chip, activeStatus === item.id && styles.chipActive]}
              >
                <Text style={[styles.chipText, activeStatus === item.id && styles.chipTextActive]}>
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.filterLabel}>Origen</Text>
          <View style={styles.chipsWrap}>
            {SUPPORT_ORIGIN_FILTERS.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => setActiveOrigin(item.id)}
                style={[styles.chip, activeOrigin === item.id && styles.chipActive]}
              >
                <Text style={[styles.chipText, activeOrigin === item.id && styles.chipTextActive]}>
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </SectionCard>

        <SectionCard title="Tickets" subtitle={`Mostrando ${filteredThreads.length} de ${threads.length}`}>
          {loading ? <BlockSkeleton lines={7} compact /> : null}
          {!loading && error ? <Text style={styles.errorText}>{error}</Text> : null}
          {!loading && !error && filteredThreads.length === 0 ? (
            <Text style={styles.emptyText}>No hay tickets en este estado/origen.</Text>
          ) : null}

          {!loading && !error
            ? filteredThreads.map((thread, index) => {
                const status = String(thread?.status || "new");
                const assignedToMe = String(thread?.assigned_agent_id || "") === usuarioId;
                const canTake = status === "new" && !thread?.assigned_agent_id;
                return (
                  <View key={`${thread?.public_id || index}-${index}`} style={styles.ticketCard}>
                    <View style={styles.ticketTop}>
                      <Text style={styles.ticketCode}>{String(thread?.public_id || "TKT")}</Text>
                      <Text style={styles.ticketStatus}>{status}</Text>
                    </View>
                    <Text style={styles.ticketSummary} numberOfLines={2}>
                      {String(thread?.summary || "Sin resumen")}
                    </Text>
                    <Text style={styles.ticketMeta}>{toSupportThreadSubtitle(thread)}</Text>
                    <Text style={styles.ticketMeta}>
                      origen: {String(thread?.request_origin || "registered")} | severidad:{" "}
                      {String(thread?.severity || "s2")}
                    </Text>
                    {thread?.request_origin === "anonymous" && thread?.contact_display ? (
                      <Text style={styles.ticketMeta}>contacto: {String(thread.contact_display)}</Text>
                    ) : null}

                    <View style={styles.actionsRow}>
                      <Pressable onPress={() => openTicket(String(thread?.public_id || ""))} style={styles.secondaryBtn}>
                        <Text style={styles.secondaryBtnText}>Ver ticket</Text>
                      </Pressable>
                      {canTake ? (
                        <Pressable
                          onPress={() => handleTakeThread(String(thread?.public_id || ""))}
                          disabled={!sessionActive || hasActiveThread}
                          style={[
                            styles.primaryBtn,
                            (!sessionActive || hasActiveThread) && styles.btnDisabled,
                          ]}
                        >
                          <Text style={styles.primaryBtnText}>Tomar</Text>
                        </Pressable>
                      ) : assignedToMe ? (
                        <Pressable onPress={() => openTicket(String(thread?.public_id || ""))} style={styles.outlineBtn}>
                          <Text style={styles.outlineBtnText}>Continuar</Text>
                        </Pressable>
                      ) : null}
                    </View>
                  </View>
                );
              })
            : null}
        </SectionCard>

        <SectionCard
          title="Observabilidad soporte"
          subtitle="Eventos RN de soporte para trazabilidad de inbox"
        >
          <ObservabilityEventFeed
            title="Eventos soporte recientes"
            subtitle="Filtra por nivel y correlacion request/trace/session."
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
  content: {
    gap: 12,
    paddingBottom: 24,
  },
  statusWrap: {
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    color: "#334155",
  },
  pendingText: {
    fontSize: 12,
    color: "#7C3AED",
    fontWeight: "700",
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
  filterLabel: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "700",
    color: "#475569",
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#FFFFFF",
  },
  chipActive: {
    borderColor: "#1D4ED8",
    backgroundColor: "#DBEAFE",
  },
  chipText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#334155",
  },
  chipTextActive: {
    color: "#1E3A8A",
  },
  ticketCard: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    padding: 10,
    gap: 6,
  },
  ticketTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    alignItems: "center",
  },
  ticketCode: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1E3A8A",
  },
  ticketStatus: {
    fontSize: 11,
    color: "#475569",
    fontWeight: "700",
  },
  ticketSummary: {
    fontSize: 13,
    color: "#0F172A",
    fontWeight: "600",
  },
  ticketMeta: {
    fontSize: 11,
    color: "#64748B",
  },
  actionsRow: {
    marginTop: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  primaryBtn: {
    backgroundColor: "#1D4ED8",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#1D4ED8",
    backgroundColor: "#EFF6FF",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryBtnText: {
    color: "#1D4ED8",
    fontSize: 12,
    fontWeight: "700",
  },
  outlineBtn: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  outlineBtnText: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "700",
  },
  btnDisabled: {
    opacity: 0.55,
  },
});
