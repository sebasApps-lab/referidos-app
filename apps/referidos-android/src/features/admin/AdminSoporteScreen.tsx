import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScrollView, Text, View } from "react-native";
import { STACK_ROUTES } from "@navigation/routeKeys";
import ScreenScaffold from "@features/staff/StaffScreenScaffold";
import SectionCard from "@features/staff/StaffSectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { mobileApi, observability, supabase } from "@shared/services/mobileApi";
import { useAppStore } from "@shared/store/appStore";
import {
  fetchActiveAgentSession,
  fetchSupportAgentsDashboard,
  fetchSupportInboxRows,
} from "@shared/services/supportDeskQueries";
import { formatDateTime } from "@shared/services/entityQueries";
import { useModalStore } from "@shared/store/modalStore";
import { SupportBadge, SupportButton, SupportNotice } from "@features/support/SupportTicketUi";
import { supportDetailStyles as styles } from "@features/support/SupportDiagnosticsUi";
import { AdminSupportAgentCard, AdminSupportThreadCard, agentDisplayName } from "./components/AdminSupportUi";

const ACTIVE_THREAD_STATUSES = ["new", "assigned", "in_progress", "waiting_user", "queued"];

export default function AdminSoporteScreen() {
  const navigation = useNavigation<any>();
  const openPicker = useModalStore((state) => state.openPicker);
  const [deskPanel, setDeskPanel] = useState<"tickets" | "agents">("tickets");
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
    if (!adminUserId) { setLoading(false); return; }
    setLoading(true);

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
  }, [adminUserId]);

  const refreshAll = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadAll();
    } catch {
      setError("No se pudo cargar la bandeja de soporte.");
      setLoading(false);
    } finally {
      setRefreshing(false);
    }
  }, [loadAll]);

  useFocusEffect(useCallback(() => {
    void refreshAll();
  }, [refreshAll]));

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

  function selectAssignee(thread: any) {
    const id = String(thread.public_id || "").trim();
    if (!id || !availableAgents.length) return;
    openPicker({
      title: "Asignar ticket",
      options: availableAgents.map((agent) => ({ id: String(agent.user_id), label: agentDisplayName(agent) })),
      selectedId: thread.assigned_agent_id || null,
      onSelect: (agentId) => { void handleAssign(id, agentId); },
    });
  }

  return (
    <ScreenScaffold
      title="Soporte"
      subtitle="Gestiona la jornada, los asesores y la cola de tickets."
      onRefresh={refreshing || loading ? undefined : () => { void refreshAll(); }}
    >
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
        <SectionCard title="Jornada de soporte" subtitle="Inicia tu jornada para operar como asesor.">
          <View style={styles.row}>
            <SupportBadge tone={sessionActive ? "positive" : "neutral"}>{sessionActive ? "Jornada activa" : "Jornada inactiva"}</SupportBadge>
            {adminSession?.start_at ? <Text style={styles.meta}>Inicio: {formatDateTime(adminSession.start_at)}</Text> : null}
          </View>
          <View style={styles.row}>
            <SupportButton
              label={sessionActive ? "Finalizar jornada" : "Iniciar jornada"}
              kind={sessionActive ? "outline" : "primary"}
              disabled={loading || Boolean(busyKey)}
              onPress={sessionActive ? handleEndAdminSession : handleStartAdminSession}
            />
            <SupportButton label={refreshing ? "Cargando…" : "Recargar"} disabled={refreshing || loading} onPress={() => { void refreshAll(); }} />
          </View>
          {sessionError ? <SupportNotice tone="warning">{sessionError}</SupportNotice> : null}
        </SectionCard>

        <SectionCard title="Administración de soporte">
          <View style={styles.row}>
            <SupportButton label="Asesores" onPress={() => navigation.navigate(STACK_ROUTES.ADMIN.SUPPORT_AGENTS)} />
            <SupportButton label="Panel de tickets" onPress={() => navigation.navigate(STACK_ROUTES.ADMIN.SUPPORT_TICKETS_PANEL)} />
            <SupportButton label="Catálogo de macros" onPress={() => navigation.navigate(STACK_ROUTES.ADMIN.SUPPORT_CATALOG)} />
          </View>
        </SectionCard>

        {error ? <SupportNotice tone="warning">{error}</SupportNotice> : null}
        <View style={styles.row}>
          <SupportButton label="Cola de tickets" selected={deskPanel === "tickets"} kind={deskPanel === "tickets" ? "primary" : "outline"} onPress={() => setDeskPanel("tickets")} />
          <SupportButton label="Asesores en soporte" selected={deskPanel === "agents"} kind={deskPanel === "agents" ? "primary" : "outline"} onPress={() => setDeskPanel("agents")} />
        </View>

        {deskPanel === "agents" ? (
          <SectionCard title="Asesores" subtitle={agents.length + " registrados · " + availableAgents.length + " activos"}>
            {loading ? <BlockSkeleton lines={5} compact /> : null}
            {!loading && !agents.length ? <Text style={styles.meta}>No hay asesores registrados.</Text> : null}
            {!loading ? agents.map((agent, index) => {
              const id = String(agent.user_id || "");
              const sessionOpen = Boolean(agent.open_session?.id);
              return (
                <AdminSupportAgentCard key={id || index} agent={agent}>
                  <SupportButton label={agent.authorized_for_work ? "Revocar" : "Autorizar"} disabled={!id || Boolean(busyKey)} onPress={() => { void handleAuthorize(agent, !agent.authorized_for_work); }} />
                  <SupportButton label={sessionOpen ? "Cerrar sesión" : "Iniciar sesión"} kind={sessionOpen ? "outline" : "primary"} disabled={!id || Boolean(busyKey)} onPress={() => { void (sessionOpen ? handleEndAgentSession(id) : handleStartAgentSession(id)); }} />
                  {agent.session_request_status === "pending" ? (
                    <SupportButton label="Denegar solicitud" disabled={!id || Boolean(busyKey)} onPress={() => { void handleDenyRequest(id); }} />
                  ) : null}
                </AdminSupportAgentCard>
              );
            }) : null}
          </SectionCard>
        ) : (
          <SectionCard title="Cola de tickets" subtitle={activeThreads.length + " activos"}>
            {loading ? <BlockSkeleton lines={6} compact /> : null}
            {!loading && !activeThreads.length ? <Text style={styles.meta}>No hay tickets activos para asignar.</Text> : null}
            {!loading && activeThreads.length > 0 && !availableAgents.length ? (
              <Text style={styles.meta}>No hay asesores activos para asignar tickets.</Text>
            ) : null}
            {!loading ? activeThreads.map((thread, index) => {
              const id = String(thread.public_id || "");
              const assigned = agents.find((agent) => agent.user_id === thread.assigned_agent_id);
              return (
                <AdminSupportThreadCard key={id || index} thread={thread} assignedLabel={assigned ? agentDisplayName(assigned) : undefined}>
                  <SupportButton label="Ver ticket" disabled={!id} onPress={() => navigation.navigate(STACK_ROUTES.ADMIN.SUPPORT_TICKET, { threadPublicId: id })} />
                  <SupportButton label={thread.assigned_agent_id ? "Reasignar" : "Asignar"} kind="primary" disabled={!id || !availableAgents.length || Boolean(busyKey)} onPress={() => selectAssignee(thread)} />
                </AdminSupportThreadCard>
              );
            }) : null}
          </SectionCard>
        )}
      </ScrollView>
    </ScreenScaffold>
  );
}
