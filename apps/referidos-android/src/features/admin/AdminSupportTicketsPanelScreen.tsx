import React, { useCallback, useMemo, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { STACK_ROUTES } from "@navigation/routeKeys";
import AdminCollectionScreen from "./components/AdminCollectionScreen";
import SectionCard from "@features/staff/StaffSectionCard";
import { mobileApi, observability, supabase } from "@shared/services/mobileApi";
import { useModalStore } from "@shared/store/modalStore";
import {
  fetchSupportAgentsDashboard,
  fetchSupportInboxRows,
  fetchSupportStatusSummary,
} from "@shared/services/supportDeskQueries";
import { readFirst } from "@shared/services/entityQueries";
import { SupportButton } from "@features/support/SupportTicketUi";
import { AdminSupportThreadCard, agentDisplayName } from "./components/AdminSupportUi";

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
    setLoading(true);
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
  }, []);

  const refreshAll = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadAll();
    } catch {
      setError("No se pudieron cargar los tickets.");
      setLoading(false);
    } finally {
      setRefreshing(false);
    }
  }, [loadAll]);

  useFocusEffect(useCallback(() => {
    void refreshAll();
  }, [refreshAll]));

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
      title="Panel de tickets"
      subtitle="Consulta el estado de los tickets, asigna asesores y gestiona la cola."
      searchPlaceholder="Buscar ticket, usuario, categoría o resumen"
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
            { id: "new", label: "Nuevos" },
            { id: "starting", label: "Empezando" },
            { id: "assigned", label: "Asignados" },
            { id: "in_progress", label: "En progreso" },
            { id: "waiting_user", label: "Esperando al usuario" },
            { id: "queued", label: "En cola" },
            { id: "closing", label: "Cerrando" },
            { id: "closed", label: "Resueltos" },
          ],
        },
      ]}
      onRefresh={() => { void refreshAll(); }}
      emptyText={!loading && filtered.length === 0 ? "No hay tickets para este filtro." : ""}
    >
      {!loading && filtered.length ? (
        <SectionCard title="Tickets" subtitle={filtered.length + " resultados"}>
          {filtered.map((row, index) => {
            const id = String(readFirst(row, ["public_id"], "")).trim();
            const status = String(readFirst(row, ["status"], "new"));
            const agent = agents.find((entry) => entry.user_id === row.assigned_agent_id);
            return (
              <AdminSupportThreadCard key={id || index} thread={row} assignedLabel={agent ? agentDisplayName(agent) : undefined}>
                <SupportButton label="Ver ticket" disabled={!id} onPress={() => navigation.navigate(STACK_ROUTES.ADMIN.SUPPORT_TICKET, { threadPublicId: id })} />
                <SupportButton
                  label={busyKey === "assign:" + id ? "Asignando…" : row.assigned_agent_id ? "Reasignar" : "Asignar"}
                  kind="primary"
                  disabled={!id || Boolean(busyKey) || availableAgents.length === 0}
                  onPress={() => assignTicket(row)}
                />
                {status !== "queued" && status !== "closed" ? (
                  <SupportButton label="Liberar a cola" disabled={!id || Boolean(busyKey)} onPress={() => { void releaseToQueue(row); }} />
                ) : null}
              </AdminSupportThreadCard>
            );
          })}
        </SectionCard>
      ) : null}
    </AdminCollectionScreen>
  );
}
