import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { STACK_ROUTES } from "@navigation/routeKeys";
import AdminCollectionScreen from "./components/AdminCollectionScreen";
import SectionCard from "@features/staff/StaffSectionCard";
import { mobileApi, observability, supabase } from "@shared/services/mobileApi";
import {
  fetchSupportAgentEventsHistory,
  fetchSupportAgentsDashboard,
} from "@shared/services/supportDeskQueries";
import { formatDateTime, readFirst } from "@shared/services/entityQueries";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { SupportButton, SupportNotice } from "@features/support/SupportTicketUi";
import { SupportDiagnosticItem, supportDetailStyles as styles } from "@features/support/SupportDiagnosticsUi";
import { AdminSupportAgentCard, agentDisplayName } from "./components/AdminSupportUi";

export default function AdminSupportAgentsScreen() {
  const navigation = useNavigation<any>();
  const [rows, setRows] = useState<any[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [events, setEvents] = useState<any[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsError, setEventsError] = useState("");
  const [panel, setPanel] = useState<"agents" | "history">("agents");
  const eventRequest = useRef(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [busyKey, setBusyKey] = useState("");

  const loadRows = useCallback(async () => {
    setLoading(true);
    const result = await fetchSupportAgentsDashboard(supabase, 160);
    if (!result.ok) {
      setRows([]);
      setError(result.error || "No se pudo cargar asesores.");
      setLoading(false);
      return;
    }
    const nextRows = result.data || [];
    setRows(nextRows);
    setSelectedAgentId((current) => current || String(readFirst(nextRows[0], ["user_id"], "")));
    setError("");
    setLoading(false);
  }, []);

  const loadEvents = useCallback(async (agentId: string) => {
    const safeId = agentId.trim();
    const request = ++eventRequest.current;
    setEvents([]);
    setEventsError("");
    setEventsLoading(Boolean(safeId));
    if (!safeId) return;
    try {
      const result = await fetchSupportAgentEventsHistory(supabase, safeId);
      if (request !== eventRequest.current) return;
      setEvents(result.ok ? result.data : []);
      if (!result.ok) setEventsError(result.error || "No se pudo cargar el historial del asesor.");
    } catch {
      if (request === eventRequest.current) setEventsError("No se pudo cargar el historial del asesor.");
    } finally {
      if (request === eventRequest.current) setEventsLoading(false);
    }
  }, []);

  const refreshAll = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadRows();
    } catch {
      setError("No se pudieron cargar los asesores.");
      setLoading(false);
    } finally {
      setRefreshing(false);
    }
  }, [loadRows]);

  useFocusEffect(useCallback(() => {
    void refreshAll();
  }, [refreshAll]));

  useEffect(() => {
    void loadEvents(selectedAgentId);
  }, [loadEvents, selectedAgentId]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return rows.filter((row) => {
      const name = agentDisplayName(row).toLowerCase();
      const publicId = String(readFirst(row?.user, ["public_id"], "")).toLowerCase();
      const email = String(readFirst(row?.user, ["email"], "")).toLowerCase();
      return !term || name.includes(term) || publicId.includes(term) || email.includes(term);
    });
  }, [query, rows]);

  const metrics = useMemo(() => {
    const authorized = rows.filter((row) => row?.authorized_for_work && !row?.blocked).length;
    const active = rows.filter((row) => Boolean(row?.open_session?.id)).length;
    const blocked = rows.filter((row) => Boolean(row?.blocked)).length;
    return [
      { label: "Asesores", value: rows.length },
      { label: "Autorizados", value: authorized },
      { label: "Sesiones activas", value: active },
      { label: "Bloqueados", value: blocked },
    ];
  }, [rows]);

  const updateAuthorization = useCallback(
    async (row: any, authorized: boolean) => {
      const agentId = String(readFirst(row, ["user_id"], "")).trim();
      if (!agentId) return;
      setBusyKey(`authorize:${agentId}`);
      const payload: any = {
        user_id: agentId,
        authorized_for_work: authorized,
        blocked: false,
      };
      payload.authorized_until = authorized
        ? new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString()
        : null;

      const { error: updateError } = await supabase
        .from("support_agent_profiles")
        .upsert(payload, { onConflict: "user_id" });
      setBusyKey("");
      if (updateError) {
        setError(updateError.message || "No se pudo actualizar el asesor.");
        return;
      }
      await observability.track({
        level: "info",
        category: "audit",
        message: "admin_support_agent_authorized",
        context: { agent_id: agentId, authorized },
      });
      await refreshAll();
    },
    [refreshAll],
  );

  const startAgentSession = useCallback(
    async (agentId: string) => {
      setBusyKey(`start:${agentId}`);
      const result = await mobileApi.support.startAdminSession({ agent_id: agentId });
      setBusyKey("");
      if (!result?.ok) {
        setError(result?.error || "No se pudo iniciar sesion.");
        return;
      }
      await refreshAll();
    },
    [refreshAll],
  );

  const endAgentSession = useCallback(
    async (agentId: string) => {
      setBusyKey(`end:${agentId}`);
      const result = await mobileApi.support.endAdminSession({
        agent_id: agentId,
        reason: "admin_revoke",
      });
      setBusyKey("");
      if (!result?.ok) {
        setError(result?.error || "No se pudo cerrar sesion.");
        return;
      }
      await refreshAll();
    },
    [refreshAll],
  );

  const denyRequest = useCallback(
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

  const selectedAgent = rows.find((agent) => String(agent.user_id) === selectedAgentId);

  return (
    <AdminCollectionScreen
      key={panel}
      title="Asesores de soporte"
      subtitle="Gestiona la autorización y las jornadas de cada asesor."
      searchPlaceholder="Buscar asesor, ID público o correo"
      query={query}
      onQueryChange={setQuery}
      loading={loading}
      refreshing={refreshing}
      error={error}
      metrics={metrics}
      headerActions={(
        <View style={styles.row}>
          <SupportButton label="Asesores" selected={panel === "agents"} kind={panel === "agents" ? "primary" : "outline"} onPress={() => setPanel("agents")} />
          <SupportButton label="Historial" selected={panel === "history"} kind={panel === "history" ? "primary" : "outline"} disabled={!selectedAgentId} onPress={() => setPanel("history")} />
        </View>
      )}
      onRefresh={() => { void refreshAll(); }}
      emptyText={panel === "agents" && !loading && filtered.length === 0 ? "No hay asesores para este filtro." : ""}
    >
      {panel === "agents" && !loading && filtered.length ? (
        <SectionCard title="Asesores" subtitle={filtered.length + " resultados"}>
          {filtered.map((row, index) => {
            const agentId = String(readFirst(row, ["user_id"], "")).trim();
            const sessionOpen = Boolean(row.open_session?.id);
            const activeTicketId = String(readFirst(row.active_ticket, ["public_id"], "")).trim();
            return (
              <AdminSupportAgentCard key={agentId || index} agent={row}>
                <SupportButton label={row.authorized_for_work ? "Revocar" : "Autorizar"} disabled={!agentId || Boolean(busyKey)} onPress={() => { void updateAuthorization(row, !row.authorized_for_work); }} />
                <SupportButton label={sessionOpen ? "Cerrar sesión" : "Iniciar sesión"} kind={sessionOpen ? "outline" : "primary"} disabled={!agentId || Boolean(busyKey)} onPress={() => { void (sessionOpen ? endAgentSession(agentId) : startAgentSession(agentId)); }} />
                {row.session_request_status === "pending" ? (
                  <SupportButton label="Denegar solicitud" disabled={!agentId || Boolean(busyKey)} onPress={() => { void denyRequest(agentId); }} />
                ) : null}
                {activeTicketId ? (
                  <SupportButton label="Ver ticket" onPress={() => navigation.navigate(STACK_ROUTES.ADMIN.SUPPORT_TICKET, { threadPublicId: activeTicketId })} />
                ) : null}
                <SupportButton label="Ver historial" disabled={!agentId} onPress={() => { setSelectedAgentId(agentId); setPanel("history"); }} />
              </AdminSupportAgentCard>
            );
          })}
        </SectionCard>
      ) : null}

      {panel === "history" ? (
        <SectionCard title="Historial del asesor" subtitle={selectedAgent ? agentDisplayName(selectedAgent) : selectedAgentId}>
          {eventsLoading ? <BlockSkeleton lines={5} compact /> : null}
          {eventsError ? <SupportNotice tone="warning">{eventsError}</SupportNotice> : null}
          {!eventsLoading && !eventsError && !events.length ? <Text style={styles.meta}>No hay eventos recientes.</Text> : null}
          {!eventsLoading ? events.map((row, index) => (
            <SupportDiagnosticItem key={String(readFirst(row, ["id"], index))} title={String(readFirst(row, ["event_type"], "Evento"))}>
              <Text style={styles.meta}>Actor: {String(readFirst(row, ["actor_id"], "—"))} · {formatDateTime(readFirst(row, ["created_at"], null))}</Text>
              <Text style={styles.description}>{JSON.stringify(readFirst(row, ["details"], {}))}</Text>
            </SupportDiagnosticItem>
          )) : null}
        </SectionCard>
      ) : null}
    </AdminCollectionScreen>
  );
}
