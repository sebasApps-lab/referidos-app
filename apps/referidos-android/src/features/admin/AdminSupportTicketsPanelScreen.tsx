import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { STACK_ROUTES } from "@navigation/routeKeys";
import AdminCollectionScreen from "./components/AdminCollectionScreen";
import SectionCard from "@shared/ui/SectionCard";
import { mobileApi, observability, supabase } from "@shared/services/mobileApi";
import { useModalStore } from "@shared/store/modalStore";
import {
  fetchSupportAgentsDashboard,
  fetchSupportInboxRows,
  fetchSupportStatusSummary,
  toSupportThreadSubtitle,
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

export default function AdminSupportTicketsPanelScreen() {
  const navigation = useNavigation<any>();
  const openPicker = useModalStore((state) => state.openPicker);
  const [rows, setRows] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>({ total: 0, byStatus: {} });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [busyKey, setBusyKey] = useState("");

  const loadAll = useCallback(async () => {
    if (!refreshing) setLoading(true);
    const [rowsResult, agentsResult, summaryResult] = await Promise.all([
      fetchSupportInboxRows(supabase, {
        isAdmin: true,
        usuarioId: "__admin_scope__",
        limit: 220,
      }),
      fetchSupportAgentsDashboard(supabase, 160),
      fetchSupportStatusSummary(supabase),
    ]);

    setRows(rowsResult.ok ? rowsResult.data : []);
    setAgents(agentsResult.ok ? agentsResult.data : []);
    setSummary(summaryResult.ok ? summaryResult.data : { total: 0, byStatus: {} });
    setError(rowsResult.error || agentsResult.error || summaryResult.error || "");
    setLoading(false);
  }, [refreshing]);

  const refreshAll = useCallback(async () => {
    setRefreshing(true);
    await loadAll();
    setRefreshing(false);
  }, [loadAll]);

  useEffect(() => {
    void refreshAll();
  }, [refreshAll]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return rows.filter((row) => {
      const code = String(readFirst(row, ["public_id"], "")).toLowerCase();
      const summaryText = String(readFirst(row, ["summary"], "")).toLowerCase();
      const category = String(readFirst(row, ["category"], "")).toLowerCase();
      const status = String(readFirst(row, ["status"], "new")).trim();
      const actor = String(readFirst(row, ["user_public_id", "anon_public_id"], "")).toLowerCase();
      const matchesQuery =
        !term ||
        code.includes(term) ||
        summaryText.includes(term) ||
        category.includes(term) ||
        actor.includes(term);
      const matchesStatus = statusFilter === "todos" || status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, rows, statusFilter]);

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

  const metrics = useMemo(() => {
    return [
      { label: "Tickets", value: rows.length },
      { label: "Nuevos", value: Number(summary?.byStatus?.new || 0) },
      { label: "En progreso", value: Number(summary?.byStatus?.in_progress || 0) },
      { label: "Esperando", value: Number(summary?.byStatus?.waiting_user || 0) },
      { label: "Asesores activos", value: availableAgents.length },
    ];
  }, [availableAgents.length, rows.length, summary]);

  const assignTicket = useCallback(
    (row: any) => {
      const threadPublicId = String(readFirst(row, ["public_id"], "")).trim();
      if (!threadPublicId) return;
      openPicker({
        title: "Asignar ticket",
        message: "Selecciona un asesor activo.",
        options: availableAgents.map((agent) => ({
          id: String(readFirst(agent, ["user_id"], "")),
          label: agentDisplayName(agent),
          description: String(readFirst(agent?.active_ticket, ["public_id"], "sin ticket activo")),
        })),
        selectedId: String(readFirst(row, ["assigned_agent_id"], "")).trim() || null,
        onSelect: async (agentId) => {
          setBusyKey(`assign:${threadPublicId}`);
          const result = await mobileApi.support.assignThread({
            thread_public_id: threadPublicId,
            agent_id: agentId,
          });
          setBusyKey("");
          if (!result?.ok) {
            setError(result?.error || "No se pudo asignar el ticket.");
            return;
          }
          await observability.track({
            level: "info",
            category: "audit",
            message: "admin_support_ticket_assigned",
            context: { thread_public_id: threadPublicId, agent_id: agentId },
          });
          await refreshAll();
        },
      });
    },
    [availableAgents, openPicker, refreshAll],
  );

  const releaseToQueue = useCallback(
    async (row: any) => {
      const threadPublicId = String(readFirst(row, ["public_id"], "")).trim();
      if (!threadPublicId) return;
      setBusyKey(`queue:${threadPublicId}`);
      const result = await mobileApi.support.updateStatus({
        thread_public_id: threadPublicId,
        status: "queued",
      });
      setBusyKey("");
      if (!result?.ok) {
        setError(result?.error || "No se pudo liberar el ticket.");
        return;
      }
      await refreshAll();
    },
    [refreshAll],
  );

  return (
    <AdminCollectionScreen
      title="Admin Support Tickets"
      subtitle="Flujo visual y control operativo de tickets"
      searchPlaceholder="Buscar ticket, actor, categoria o resumen"
      query={query}
      onQueryChange={setQuery}
      loading={loading}
      refreshing={refreshing}
      error={error}
      metrics={metrics}
      filters={[
        {
          title: "Estado",
          selectedId: statusFilter,
          onSelect: setStatusFilter,
          options: [
            { id: "todos", label: "Todos" },
            { id: "new", label: "New" },
            { id: "assigned", label: "Assigned" },
            { id: "in_progress", label: "In progress" },
            { id: "waiting_user", label: "Waiting user" },
            { id: "queued", label: "Queued" },
            { id: "closing", label: "Closing" },
            { id: "closed", label: "Closed" },
          ],
        },
      ]}
      onRefresh={() => void refreshAll()}
      emptyText={!loading && filtered.length === 0 ? "No hay tickets para este filtro." : ""}
    >
      <SectionCard title="Tickets" subtitle={`Resultados: ${filtered.length}`}>
        <View style={shared.listWrap}>
          {filtered.map((row, index) => {
            const threadPublicId = String(readFirst(row, ["public_id"], "")).trim();
            const status = String(readFirst(row, ["status"], "new"));
            return (
              <View key={`${threadPublicId || index}-${index}`} style={shared.card}>
                <Text style={shared.cardTitle}>{threadPublicId || "TKT"}</Text>
                <View style={shared.badgeRow}>
                  <View style={shared.badge}>
                    <Text style={shared.badgeText}>{status}</Text>
                  </View>
                  <View style={shared.codePill}>
                    <Text style={shared.codePillText}>
                      {String(readFirst(row, ["category"], "general"))}
                    </Text>
                  </View>
                </View>
                <Text style={shared.bodyText} numberOfLines={2}>
                  {String(readFirst(row, ["summary"], "Sin resumen"))}
                </Text>
                <Text style={shared.metaText}>{toSupportThreadSubtitle(row)}</Text>
                <Text style={shared.metaText}>
                  app: {String(readFirst(row, ["app_channel"], "undetermined"))}
                </Text>
                <Text style={shared.metaText}>
                  agente: {String(readFirst(row, ["assigned_agent_id"], "sin asignar"))}
                </Text>
                <Text style={shared.metaText}>
                  actualizado: {formatDateTime(readFirst(row, ["updated_at", "created_at"], null))}
                </Text>
                <View style={shared.actionsRow}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate(STACK_ROUTES.ADMIN.SUPPORT_TICKET, {
                        threadPublicId,
                      })
                    }
                    style={shared.primaryBtn}
                  >
                    <Text style={shared.primaryBtnText}>Abrir detalle</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => assignTicket(row)}
                    disabled={busyKey === `assign:${threadPublicId}` || availableAgents.length === 0}
                    style={[
                      shared.secondaryBtn,
                      (busyKey === `assign:${threadPublicId}` || availableAgents.length === 0) &&
                        shared.btnDisabled,
                    ]}
                  >
                    <Text style={shared.secondaryBtnText}>
                      {busyKey === `assign:${threadPublicId}` ? "..." : "Asignar"}
                    </Text>
                  </Pressable>
                  {status !== "queued" && status !== "closed" ? (
                    <Pressable
                      onPress={() => void releaseToQueue(row)}
                      disabled={busyKey === `queue:${threadPublicId}`}
                      style={[shared.outlineBtn, busyKey === `queue:${threadPublicId}` && shared.btnDisabled]}
                    >
                      <Text style={shared.outlineBtnText}>Liberar a cola</Text>
                    </Pressable>
                  ) : null}
                </View>
              </View>
            );
          })}
        </View>
      </SectionCard>
    </AdminCollectionScreen>
  );
}
