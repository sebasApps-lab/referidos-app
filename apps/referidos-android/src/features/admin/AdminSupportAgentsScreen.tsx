import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { STACK_ROUTES } from "@navigation/routeKeys";
import AdminCollectionScreen from "./components/AdminCollectionScreen";
import SectionCard from "@shared/ui/SectionCard";
import { mobileApi, observability, supabase } from "@shared/services/mobileApi";
import {
  fetchSupportAgentEventsHistory,
  fetchSupportAgentsDashboard,
} from "@shared/services/supportDeskQueries";
import { formatDateTime, readFirst } from "@shared/services/entityQueries";
import { adminRuntimeStyles as shared } from "./components/adminRuntimeStyles";

function agentDisplayName(agent: any) {
  const nombre = String(readFirst(agent?.user, ["nombre"], "")).trim();
  const apellido = String(readFirst(agent?.user, ["apellido"], "")).trim();
  const full = `${nombre} ${apellido}`.trim();
  if (full) return full;
  return String(readFirst(agent?.user, ["public_id"], agent?.user_id || "agente"));
}

export default function AdminSupportAgentsScreen() {
  const navigation = useNavigation<any>();
  const [rows, setRows] = useState<any[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [busyKey, setBusyKey] = useState("");

  const loadRows = useCallback(async () => {
    if (!refreshing) setLoading(true);
    const result = await fetchSupportAgentsDashboard(supabase, 160);
    if (!result.ok) {
      setRows([]);
      setError(result.error || "No se pudo cargar asesores.");
      setLoading(false);
      return;
    }
    const nextRows = result.data || [];
    setRows(nextRows);
    if (!selectedAgentId && nextRows.length > 0) {
      setSelectedAgentId(String(readFirst(nextRows[0], ["user_id"], "")));
    }
    setError("");
    setLoading(false);
  }, [refreshing, selectedAgentId]);

  const loadEvents = useCallback(async (agentId: string) => {
    const safeAgentId = String(agentId || "").trim();
    if (!safeAgentId) {
      setEvents([]);
      return;
    }
    const result = await fetchSupportAgentEventsHistory(supabase, safeAgentId);
    if (!result.ok) {
      setEvents([]);
      setError(result.error || "No se pudo cargar historial del asesor.");
      return;
    }
    setEvents(result.data || []);
  }, []);

  const refreshAll = useCallback(async () => {
    setRefreshing(true);
    await loadRows();
    setRefreshing(false);
  }, [loadRows]);

  useEffect(() => {
    void refreshAll();
  }, [refreshAll]);

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

  return (
    <AdminCollectionScreen
      title="Admin Support Agents"
      subtitle="Asesores, autorizacion y sesiones"
      searchPlaceholder="Buscar asesor, public_id o email"
      query={query}
      onQueryChange={setQuery}
      loading={loading}
      refreshing={refreshing}
      error={error}
      metrics={metrics}
      onRefresh={() => void refreshAll()}
      emptyText={!loading && filtered.length === 0 ? "No hay asesores para este filtro." : ""}
    >
      <SectionCard title="Asesores" subtitle={`Resultados: ${filtered.length}`}>
        <View style={shared.listWrap}>
          {filtered.map((row, index) => {
            const agentId = String(readFirst(row, ["user_id"], "")).trim();
            const sessionOpen = Boolean(row?.open_session?.id);
            const activeTicketId = String(readFirst(row?.active_ticket, ["public_id"], "")).trim();
            return (
              <Pressable
                key={`${agentId || index}-${index}`}
                onPress={() => setSelectedAgentId(agentId)}
                style={[
                  shared.card,
                  selectedAgentId === agentId && {
                    borderColor: "#1D4ED8",
                    backgroundColor: "#EFF6FF",
                  },
                ]}
              >
                <Text style={shared.cardTitle}>{agentDisplayName(row)}</Text>
                <Text style={shared.metaText}>
                  {String(readFirst(row?.user, ["public_id"], "-"))} | {String(readFirst(row?.user, ["email"], "-"))}
                </Text>
                <Text style={shared.metaText}>
                  autorizado: {row?.authorized_for_work ? "si" : "no"} | bloqueado: {row?.blocked ? "si" : "no"}
                </Text>
                <Text style={shared.metaText}>
                  sesion: {sessionOpen ? "activa" : "inactiva"} | solicitud: {String(readFirst(row, ["session_request_status"], "sin solicitud"))}
                </Text>
                {activeTicketId ? (
                  <Text style={shared.metaText}>ticket activo: {activeTicketId}</Text>
                ) : null}
                {readFirst(row, ["support_phone"], "") ? (
                  <Text style={shared.metaText}>soporte: {String(readFirst(row, ["support_phone"], "-"))}</Text>
                ) : null}
                <View style={shared.actionsRow}>
                  <Pressable
                    onPress={() => void updateAuthorization(row, !row?.authorized_for_work)}
                    disabled={busyKey === `authorize:${agentId}`}
                    style={[shared.secondaryBtn, busyKey === `authorize:${agentId}` && shared.btnDisabled]}
                  >
                    <Text style={shared.secondaryBtnText}>
                      {row?.authorized_for_work ? "Revocar" : "Autorizar"}
                    </Text>
                  </Pressable>
                  {!sessionOpen ? (
                    <Pressable
                      onPress={() => void startAgentSession(agentId)}
                      disabled={busyKey === `start:${agentId}`}
                      style={[shared.primaryBtn, busyKey === `start:${agentId}` && shared.btnDisabled]}
                    >
                      <Text style={shared.primaryBtnText}>Iniciar sesion</Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => void endAgentSession(agentId)}
                      disabled={busyKey === `end:${agentId}`}
                      style={[shared.outlineBtn, busyKey === `end:${agentId}` && shared.btnDisabled]}
                    >
                      <Text style={shared.outlineBtnText}>Cerrar sesion</Text>
                    </Pressable>
                  )}
                  {String(readFirst(row, ["session_request_status"], "")) === "pending" ? (
                    <Pressable
                      onPress={() => void denyRequest(agentId)}
                      disabled={busyKey === `deny:${agentId}`}
                      style={[shared.dangerBtn, busyKey === `deny:${agentId}` && shared.btnDisabled]}
                    >
                      <Text style={shared.dangerBtnText}>Denegar</Text>
                    </Pressable>
                  ) : null}
                  {activeTicketId ? (
                    <Pressable
                      onPress={() =>
                        navigation.navigate(STACK_ROUTES.ADMIN.SUPPORT_TICKET, {
                          threadPublicId: activeTicketId,
                        })
                      }
                      style={shared.outlineBtn}
                    >
                      <Text style={shared.outlineBtnText}>Abrir ticket</Text>
                    </Pressable>
                  ) : null}
                </View>
              </Pressable>
            );
          })}
        </View>
      </SectionCard>

      <SectionCard title="Historial del asesor" subtitle={selectedAgentId || "Selecciona un asesor"}>
        <View style={shared.listWrap}>
          {selectedAgentId && events.length === 0 ? (
            <Text style={shared.emptyText}>Sin eventos recientes para este asesor.</Text>
          ) : null}
          {events.map((row, index) => (
            <View key={`${String(readFirst(row, ["id"], index))}-${index}`} style={shared.card}>
              <Text style={shared.cardTitle}>
                {String(readFirst(row, ["event_type"], "event"))}
              </Text>
              <Text style={shared.metaText}>
                actor: {String(readFirst(row, ["actor_id"], "-"))}
              </Text>
              <Text style={shared.metaText}>
                fecha: {formatDateTime(readFirst(row, ["created_at"], null))}
              </Text>
              <Text style={shared.bodyText}>
                {JSON.stringify(readFirst(row, ["details"], {}))}
              </Text>
            </View>
          ))}
        </View>
      </SectionCard>
    </AdminCollectionScreen>
  );
}
