import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { mobileApi, observability, supabase } from "@shared/services/mobileApi";
import { useAppStore } from "@shared/store/appStore";
import {
  fetchActiveAgentSession,
  fetchSupportAgentsDashboard,
  fetchSupportInboxRows,
} from "@shared/services/supportDeskQueries";
import { formatDateTime } from "@shared/services/entityQueries";

const ACTIVE_THREAD_STATUSES = ["new", "assigned", "in_progress", "waiting_user", "queued"];

function agentDisplayName(agent: any) {
  const nombre = String(agent?.user?.nombre || "").trim();
  const apellido = String(agent?.user?.apellido || "").trim();
  const full = `${nombre} ${apellido}`.trim();
  if (full) return full;
  return String(agent?.user?.public_id || agent?.user_id || "agente");
}

export default function AdminSoporteScreen() {
  const adminUser = useAppStore((state) => state.onboarding?.usuario || null);
  const adminUserId = String(adminUser?.id || "").trim();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [sessionError, setSessionError] = useState("");
  const [adminSession, setAdminSession] = useState<any | null>(null);
  const [agents, setAgents] = useState<any[]>([]);
  const [threads, setThreads] = useState<any[]>([]);
  const [busyKey, setBusyKey] = useState("");

  const sessionActive = Boolean(adminSession?.id);

  const availableAgents = useMemo(
    () =>
      agents.filter(
        (agent) =>
          agent?.authorized_for_work &&
          !agent?.blocked &&
          Boolean(agent?.open_session?.id),
      ),
    [agents],
  );

  const activeThreads = useMemo(
    () =>
      threads.filter((thread) =>
        ACTIVE_THREAD_STATUSES.includes(String(thread?.status || "")),
      ),
    [threads],
  );

  const loadAll = useCallback(async () => {
    if (!adminUserId) return;
    if (!refreshing) setLoading(true);

    const [sessionResult, agentsResult, threadsResult] = await Promise.all([
      fetchActiveAgentSession(supabase, adminUserId),
      fetchSupportAgentsDashboard(supabase, 120),
      fetchSupportInboxRows(supabase, {
        isAdmin: true,
        usuarioId: adminUserId,
        limit: 200,
      }),
    ]);

    setAdminSession(sessionResult.ok ? sessionResult.data : null);
    setAgents(agentsResult.ok ? agentsResult.data : []);
    setThreads(threadsResult.ok ? threadsResult.data : []);

    const nextError = sessionResult.error || agentsResult.error || threadsResult.error || "";
    setError(nextError);
    setLoading(false);
  }, [adminUserId, refreshing]);

  const refreshAll = useCallback(async () => {
    setRefreshing(true);
    await loadAll();
    setRefreshing(false);
  }, [loadAll]);

  useEffect(() => {
    void refreshAll();
  }, [refreshAll]);

  useEffect(() => {
    if (!sessionActive) return undefined;
    const timer = setInterval(async () => {
      await mobileApi.support.pingAdminSession({});
    }, 30000);
    return () => clearInterval(timer);
  }, [sessionActive]);

  const handleStartAdminSession = useCallback(async () => {
    if (!adminUserId) return;
    setSessionError("");
    setBusyKey("admin_session_start");
    const result = await mobileApi.support.startAdminSession({ agent_id: adminUserId });
    setBusyKey("");
    if (!result?.ok) {
      setSessionError(result?.error || "No se pudo iniciar jornada admin.");
      return;
    }
    await observability.track({
      level: "info",
      category: "audit",
      message: "admin_support_session_start",
      context: { agent_id: adminUserId },
    });
    await refreshAll();
  }, [adminUserId, refreshAll]);

  const handleEndAdminSession = useCallback(async () => {
    if (!adminUserId) return;
    setSessionError("");
    setBusyKey("admin_session_end");
    const result = await mobileApi.support.endAdminSession({
      agent_id: adminUserId,
      reason: "manual_end",
    });
    setBusyKey("");
    if (!result?.ok) {
      setSessionError(result?.error || "No se pudo finalizar jornada admin.");
      return;
    }
    await observability.track({
      level: "info",
      category: "audit",
      message: "admin_support_session_end",
      context: { agent_id: adminUserId },
    });
    await refreshAll();
  }, [adminUserId, refreshAll]);

  const handleAuthorize = useCallback(
    async (agent: any, authorized: boolean) => {
      setBusyKey(`authorize:${agent?.user_id}`);
      const payload: any = {
        user_id: agent?.user_id,
        authorized_for_work: authorized,
        blocked: false,
      };
      if (authorized) {
        const until = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();
        payload.authorized_until = until;
      } else {
        payload.authorized_until = null;
      }

      const { error: updateError } = await supabase
        .from("support_agent_profiles")
        .upsert(payload, { onConflict: "user_id" });
      setBusyKey("");
      if (updateError) {
        setError(updateError.message || "No se pudo actualizar autorizacion.");
        return;
      }
      await refreshAll();
    },
    [refreshAll],
  );

  const handleStartAgentSession = useCallback(
    async (agentId: string) => {
      setBusyKey(`start:${agentId}`);
      const result = await mobileApi.support.startAdminSession({ agent_id: agentId });
      setBusyKey("");
      if (!result?.ok) {
        setError(result?.error || "No se pudo iniciar sesion del agente.");
        return;
      }
      await refreshAll();
    },
    [refreshAll],
  );

  const handleEndAgentSession = useCallback(
    async (agentId: string) => {
      setBusyKey(`end:${agentId}`);
      const result = await mobileApi.support.endAdminSession({
        agent_id: agentId,
        reason: "admin_revoke",
      });
      setBusyKey("");
      if (!result?.ok) {
        setError(result?.error || "No se pudo cerrar sesion del agente.");
        return;
      }
      await refreshAll();
    },
    [refreshAll],
  );

  const handleDenyRequest = useCallback(
    async (agentId: string) => {
      setBusyKey(`deny:${agentId}`);
      const result = await mobileApi.support.denyAdminSession({ agent_id: agentId });
      setBusyKey("");
      if (!result?.ok) {
        setError(result?.error || "No se pudo denegar solicitud.");
        return;
      }
      await refreshAll();
    },
    [refreshAll],
  );

  const handleAssign = useCallback(
    async (threadPublicId: string, agentId: string) => {
      setBusyKey(`assign:${threadPublicId}:${agentId}`);
      const result = await mobileApi.support.assignThread({
        thread_public_id: threadPublicId,
        agent_id: agentId,
      });
      setBusyKey("");
      if (!result?.ok) {
        setError(result?.error || "No se pudo asignar/reasignar ticket.");
        return;
      }
      await observability.track({
        level: "info",
        category: "audit",
        message: "admin_assign_ticket",
        context: {
          thread_public_id: threadPublicId,
          agent_id: agentId,
        },
      });
      await refreshAll();
    },
    [refreshAll],
  );

  return (
    <ScreenScaffold title="Admin Soporte" subtitle="Asesores, sesiones y asignacion/reasignacion de tickets">
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard
          title="Jornada admin soporte"
          subtitle="Requerida para operar como asesor/admin en cola"
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
          {loading ? <BlockSkeleton lines={3} compact /> : null}
          {!loading ? (
            <>
              <Text style={styles.metaText}>Sesion admin: {sessionActive ? "activa" : "inactiva"}</Text>
              {adminSession?.start_at ? (
                <Text style={styles.metaText}>
                  Inicio: {formatDateTime(adminSession.start_at)}
                </Text>
              ) : null}
              {sessionError ? <Text style={styles.errorText}>{sessionError}</Text> : null}
            </>
          ) : null}
          <View style={styles.actionsRow}>
            {!sessionActive ? (
              <Pressable
                onPress={handleStartAdminSession}
                disabled={busyKey === "admin_session_start"}
                style={[styles.primaryBtn, busyKey === "admin_session_start" && styles.btnDisabled]}
              >
                <Text style={styles.primaryBtnText}>Iniciar jornada admin</Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={handleEndAdminSession}
                disabled={busyKey === "admin_session_end"}
                style={[styles.outlineBtn, busyKey === "admin_session_end" && styles.btnDisabled]}
              >
                <Text style={styles.outlineBtnText}>Finalizar jornada admin</Text>
              </Pressable>
            )}
          </View>
        </SectionCard>

        <SectionCard title="Asesores" subtitle={`Total ${agents.length} | activos ${availableAgents.length}`}>
          {loading ? <BlockSkeleton lines={8} compact /> : null}
          {!loading && agents.length === 0 ? (
            <Text style={styles.emptyText}>Sin asesores registrados en support_agent_profiles.</Text>
          ) : null}
          {!loading
            ? agents.map((agent, index) => {
                const agentId = String(agent?.user_id || "");
                const sessionOpen = Boolean(agent?.open_session?.id);
                const pending = String(agent?.session_request_status || "") === "pending";
                return (
                  <View key={`${agentId || index}-${index}`} style={styles.card}>
                    <Text style={styles.cardTitle}>{agentDisplayName(agent)}</Text>
                    <Text style={styles.metaText}>
                      {String(agent?.user?.public_id || "-")} | {String(agent?.user?.role || "-")}
                    </Text>
                    <Text style={styles.metaText}>
                      autorizado: {agent?.authorized_for_work ? "si" : "no"} | bloqueado:{" "}
                      {agent?.blocked ? "si" : "no"}
                    </Text>
                    <Text style={styles.metaText}>sesion: {sessionOpen ? "activa" : "inactiva"}</Text>
                    {agent?.authorized_until ? (
                      <Text style={styles.metaText}>
                        autorizado hasta: {formatDateTime(agent.authorized_until)}
                      </Text>
                    ) : null}
                    {agent?.active_ticket?.public_id ? (
                      <Text style={styles.metaText}>
                        ticket activo: {String(agent.active_ticket.public_id)}
                      </Text>
                    ) : (
                      <Text style={styles.metaText}>ticket activo: ninguno</Text>
                    )}

                    <View style={styles.actionsRow}>
                      <Pressable
                        onPress={() => void handleAuthorize(agent, !agent?.authorized_for_work)}
                        disabled={busyKey === `authorize:${agentId}`}
                        style={[
                          styles.secondaryBtn,
                          busyKey === `authorize:${agentId}` && styles.btnDisabled,
                        ]}
                      >
                        <Text style={styles.secondaryBtnText}>
                          {agent?.authorized_for_work ? "Revocar" : "Autorizar"}
                        </Text>
                      </Pressable>

                      {!sessionOpen ? (
                        <Pressable
                          onPress={() => void handleStartAgentSession(agentId)}
                          disabled={busyKey === `start:${agentId}`}
                          style={[styles.primaryBtn, busyKey === `start:${agentId}` && styles.btnDisabled]}
                        >
                          <Text style={styles.primaryBtnText}>Iniciar sesion</Text>
                        </Pressable>
                      ) : (
                        <Pressable
                          onPress={() => void handleEndAgentSession(agentId)}
                          disabled={busyKey === `end:${agentId}`}
                          style={[styles.outlineBtn, busyKey === `end:${agentId}` && styles.btnDisabled]}
                        >
                          <Text style={styles.outlineBtnText}>Cerrar sesion</Text>
                        </Pressable>
                      )}

                      {pending ? (
                        <Pressable
                          onPress={() => void handleDenyRequest(agentId)}
                          disabled={busyKey === `deny:${agentId}`}
                          style={[
                            styles.outlineBtn,
                            busyKey === `deny:${agentId}` && styles.btnDisabled,
                          ]}
                        >
                          <Text style={styles.outlineBtnText}>Denegar solicitud</Text>
                        </Pressable>
                      ) : null}
                    </View>
                  </View>
                );
              })
            : null}
        </SectionCard>

        <SectionCard title="Asignacion/Reasignacion de tickets" subtitle={`Tickets activos: ${activeThreads.length}`}>
          {loading ? <BlockSkeleton lines={7} compact /> : null}
          {!loading && activeThreads.length === 0 ? (
            <Text style={styles.emptyText}>No hay tickets activos para asignar.</Text>
          ) : null}
          {!loading
            ? activeThreads.map((thread, index) => (
                <View key={`${String(thread?.public_id || index)}-${index}`} style={styles.card}>
                  <Text style={styles.cardTitle}>{String(thread?.public_id || "TKT")}</Text>
                  <Text style={styles.metaText}>
                    {String(thread?.summary || "Sin resumen")}
                  </Text>
                  <Text style={styles.metaText}>
                    estado: {String(thread?.status || "-")} | origen:{" "}
                    {String(thread?.request_origin || "registered")}
                  </Text>
                  <Text style={styles.metaText}>
                    asignado a: {String(thread?.assigned_agent_id || "sin asignar")}
                  </Text>
                  <View style={styles.actionsRow}>
                    {availableAgents.length === 0 ? (
                      <Text style={styles.emptyText}>Sin asesores activos para asignar.</Text>
                    ) : (
                      availableAgents.map((agent) => {
                        const agentId = String(agent?.user_id || "");
                        const buttonKey = `assign:${String(thread?.public_id || "")}:${agentId}`;
                        return (
                          <Pressable
                            key={buttonKey}
                            onPress={() =>
                              void handleAssign(String(thread?.public_id || ""), agentId)
                            }
                            disabled={busyKey === buttonKey}
                            style={[styles.secondaryBtn, busyKey === buttonKey && styles.btnDisabled]}
                          >
                            <Text style={styles.secondaryBtnText}>
                              {agentDisplayName(agent)}
                            </Text>
                          </Pressable>
                        );
                      })
                    )}
                  </View>
                </View>
              ))
            : null}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
  card: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 11,
    padding: 10,
    backgroundColor: "#F8FAFC",
    gap: 4,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },
  metaText: {
    fontSize: 11,
    color: "#475569",
  },
  actionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 6,
  },
  primaryBtn: {
    backgroundColor: "#1D4ED8",
    borderRadius: 9,
    paddingHorizontal: 11,
    paddingVertical: 8,
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
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  secondaryBtnText: {
    color: "#1D4ED8",
    fontSize: 12,
    fontWeight: "700",
  },
  outlineBtn: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  outlineBtnText: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "700",
  },
  emptyText: {
    fontSize: 12,
    color: "#64748B",
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 12,
    fontWeight: "600",
  },
  btnDisabled: {
    opacity: 0.55,
  },
});
