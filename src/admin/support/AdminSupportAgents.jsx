import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { supabase } from "../../lib/supabaseClient";

export default function AdminSupportAgents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [phoneDrafts, setPhoneDrafts] = useState({});
  const [sessionsMap, setSessionsMap] = useState({});
  const [activeTicketsMap, setActiveTicketsMap] = useState({});
  const [recentTicketsMap, setRecentTicketsMap] = useState({});

  useEffect(() => {
    let active = true;
    const loadAgents = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("support_agent_profiles")
        .select("user_id, support_phone, authorized_for_work, blocked, authorized_until")
        .order("authorized_for_work", { ascending: false });
      if (!active) return;
      setAgents(data || []);
      const nextDrafts = {};
      (data || []).forEach((agent) => {
        nextDrafts[agent.user_id] = agent.support_phone || "";
      });
      setPhoneDrafts(nextDrafts);

      const { data: sessions } = await supabase
        .from("support_agent_sessions")
        .select("agent_id, start_at, last_seen_at")
        .is("end_at", null);
      const sessionLookup = {};
      (sessions || []).forEach((session) => {
        sessionLookup[session.agent_id] = session;
      });
      setSessionsMap(sessionLookup);

      const { data: activeThreads } = await supabase
        .from("support_threads")
        .select("assigned_agent_id, public_id, status")
        .in("status", ["assigned", "in_progress", "waiting_user"]);
      const ticketLookup = {};
      (activeThreads || []).forEach((thread) => {
        ticketLookup[thread.assigned_agent_id] = thread;
      });
      setActiveTicketsMap(ticketLookup);

      if (data && data.length > 0) {
        const agentIds = data.map((agent) => agent.user_id);
        const { data: recentThreads } = await supabase
          .from("support_threads")
          .select("assigned_agent_id, public_id, closed_at")
          .eq("status", "closed")
          .in("assigned_agent_id", agentIds)
          .order("closed_at", { ascending: false })
          .limit(200);
        const recentLookup = {};
        (recentThreads || []).forEach((thread) => {
          if (!thread.assigned_agent_id) return;
          const list = recentLookup[thread.assigned_agent_id] || [];
          if (list.length < 3) {
            list.push(thread);
            recentLookup[thread.assigned_agent_id] = list;
          }
        });
        setRecentTicketsMap(recentLookup);
      } else {
        setRecentTicketsMap({});
      }
      setLoading(false);
    };
    loadAgents();
    return () => {
      active = false;
    };
  }, []);

  const updateAgent = async (userId, patch) => {
    const { data } = await supabase
      .from("support_agent_profiles")
      .update(patch)
      .eq("user_id", userId)
      .select("user_id, support_phone, authorized_for_work, blocked, authorized_until")
      .single();
    if (!data) return;
    setAgents((prev) =>
      prev.map((agent) => (agent.user_id === userId ? data : agent))
    );
    setPhoneDrafts((prev) => ({
      ...prev,
      [userId]: data.support_phone || "",
    }));
  };

  return (
    <AdminLayout
      title="Asesores"
      subtitle="Gestiona disponibilidad y autorizaciones"
    >
      <div className="rounded-3xl border border-[#E9E2F7] bg-white p-6 space-y-4">
        {loading ? (
          <div className="text-sm text-slate-500">Cargando asesores...</div>
        ) : agents.length === 0 ? (
          <div className="text-sm text-slate-500">Sin asesores registrados.</div>
        ) : (
          <div className="space-y-3">
            {agents.map((agent) => (
              <div
                key={agent.user_id}
                className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] px-4 py-3 text-sm text-slate-600"
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-[#2F1A55]">
                    {agent.user_id}
                  </div>
                  <div className="text-xs">
                    {agent.authorized_for_work ? "Autorizado" : "Bloqueado"}
                  </div>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Tel: {agent.support_phone || "No definido"}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Hasta: {agent.authorized_until ? new Date(agent.authorized_until).toLocaleString() : "Sin limite"}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Sesion: {sessionsMap[agent.user_id] ? "Activa" : "Sin timbrar"}
                </div>
                {sessionsMap[agent.user_id]?.last_seen_at ? (
                  <div className="text-[11px] text-slate-300">
                    Ultimo ping: {new Date(sessionsMap[agent.user_id].last_seen_at).toLocaleString()}
                  </div>
                ) : null}
                <div className="text-xs text-slate-500 mt-2">
                  Ticket activo: {activeTicketsMap[agent.user_id]?.public_id || "Ninguno"}
                </div>
                {activeTicketsMap[agent.user_id]?.status ? (
                  <div className="text-[11px] text-slate-400">
                    Estado: {activeTicketsMap[agent.user_id].status}
                  </div>
                ) : null}
                {recentTicketsMap[agent.user_id]?.length ? (
                  <div className="text-[11px] text-slate-400 mt-2">
                    Ultimos tickets:{" "}
                    {recentTicketsMap[agent.user_id]
                      .map((thread) => thread.public_id)
                      .join(", ")}
                  </div>
                ) : null}
                <div className="mt-3 flex flex-wrap gap-2">
                  <input
                    value={phoneDrafts[agent.user_id] ?? ""}
                    onChange={(e) =>
                      setPhoneDrafts((prev) => ({
                        ...prev,
                        [agent.user_id]: e.target.value,
                      }))
                    }
                    placeholder="Telefono soporte"
                    className="rounded-full border border-[#E9E2F7] bg-white px-3 py-1 text-xs text-slate-600 outline-none focus:border-[#5E30A5]"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      updateAgent(agent.user_id, {
                        support_phone: phoneDrafts[agent.user_id] || null,
                      })
                    }
                    className="rounded-full border border-[#E9E2F7] px-3 py-1 text-xs font-semibold text-slate-600"
                  >
                    Guardar tel
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateAgent(agent.user_id, {
                        authorized_for_work: true,
                        blocked: false,
                      })
                    }
                    className="rounded-full bg-[#5E30A5] px-3 py-1 text-xs font-semibold text-white"
                  >
                    Autorizar
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateAgent(agent.user_id, {
                        authorized_for_work: false,
                        blocked: true,
                      })
                    }
                    className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-500"
                  >
                    Bloquear
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
