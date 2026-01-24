import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import AdminLayout from "../layout/AdminLayout";
import { supabase } from "../../lib/supabaseClient";
import {
  assignSupportThread,
  closeSupportThread,
  createSupportAdminUser,
} from "../../support/supportClient";

export default function AdminSupportAgents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [phoneDrafts, setPhoneDrafts] = useState({});
  const [authorizedUntilDrafts, setAuthorizedUntilDrafts] = useState({});
  const [authorizedFromDrafts, setAuthorizedFromDrafts] = useState({});
  const [usersMap, setUsersMap] = useState({});
  const [sessionsMap, setSessionsMap] = useState({});
  const [activeTicketsMap, setActiveTicketsMap] = useState({});
  const [recentTicketsMap, setRecentTicketsMap] = useState({});
  const [nameDrafts, setNameDrafts] = useState({});
  const [expandedMap, setExpandedMap] = useState({});
  const [agentErrors, setAgentErrors] = useState({});
  const [availableThreads, setAvailableThreads] = useState([]);
  const [assignErrors, setAssignErrors] = useState({});
  const [phoneEditingMap, setPhoneEditingMap] = useState({});
  const [timeFromEditingMap, setTimeFromEditingMap] = useState({});
  const [timeUntilEditingMap, setTimeUntilEditingMap] = useState({});
  const [createForm, setCreateForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    fecha_nacimiento: "",
    role: "soporte",
  });
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState("");
  const [createResult, setCreateResult] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const mountedRef = useRef(true);

  const formatTime = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleTimeString("es-EC", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Guayaquil",
    });
  };

  const formatSupportPhone = (rawValue) => {
    if (!rawValue) return "Sin numero";
    const digits = rawValue.replace(/\D/g, "");
    let local = digits;
    if (local.startsWith("593")) {
      local = local.slice(3);
    }
    if (local.length > 9) {
      local = local.slice(-9);
    }
    if (local.length === 9) {
      return `0${local}`;
    }
    return rawValue;
  };

  const normalizeSupportPhoneInput = (value) => {
    if (!value) return "";
    const digits = value.replace(/\D/g, "");
    if (digits.startsWith("593")) {
      const local = digits.slice(3);
      return local.length === 9 ? `0${local}` : local;
    }
    if (digits.length === 10 && digits.startsWith("0")) {
      return digits;
    }
    return digits;
  };

  const formatSupportPhoneForSave = (value) => {
    if (!value) return null;
    const digits = value.replace(/\D/g, "");
    if (digits.startsWith("593")) {
      return `+${digits}`;
    }
    if (digits.length === 10 && digits.startsWith("0")) {
      return `+593${digits.slice(1)}`;
    }
    if (digits.length === 9) {
      return `+593${digits}`;
    }
    return `+${digits}`;
  };

  const timeValueToIso = (timeValue) => {
    if (!timeValue) return null;
    const [hours, minutes] = timeValue.split(":").map((value) => parseInt(value, 10));
    if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now.toISOString();
  };

  const computeGlow = (agent) => {
    if (agent.blocked) return "shadow-[0_0_0_1px_rgba(239,68,68,0.4)]";
    if (!agent.authorized_for_work) {
      return "shadow-[0_0_0_1px_rgba(148,163,184,0.4)]";
    }
    if (sessionsMap[agent.user_id]) {
      return "shadow-[0_0_0_1px_rgba(34,197,94,0.4)]";
    }
    const fallbackStart = new Date();
    fallbackStart.setHours(8, 0, 0, 0);
    const startAt = agent.authorized_from
      ? new Date(agent.authorized_from)
      : fallbackStart;
    if (Number.isNaN(startAt.getTime())) {
      return "shadow-[0_0_0_1px_rgba(148,163,184,0.4)]";
    }
    if (Date.now() < startAt.getTime()) {
      return "shadow-[0_0_0_1px_rgba(34,197,94,0.4)]";
    }
    return "shadow-[0_0_0_1px_rgba(249,115,22,0.45)]";
  };

  const loadAgents = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("support_agent_profiles")
      .select(
        "user_id, support_phone, authorized_for_work, blocked, authorized_until, authorized_from"
      )
      .order("authorized_for_work", { ascending: false });
    if (!mountedRef.current) return;
    setAgents(data || []);
    const nextDrafts = {};
    const nextUntilDrafts = {};
    const nextFromDrafts = {};
    (data || []).forEach((agent) => {
      nextDrafts[agent.user_id] = normalizeSupportPhoneInput(agent.support_phone || "");
      nextUntilDrafts[agent.user_id] = agent.authorized_until
        ? new Date(agent.authorized_until).toISOString().slice(11, 16)
        : "18:00";
      nextFromDrafts[agent.user_id] = agent.authorized_from
        ? formatTime(agent.authorized_from)
        : "08:00";
    });
    setPhoneDrafts(nextDrafts);
    setAuthorizedUntilDrafts(nextUntilDrafts);
    setAuthorizedFromDrafts(nextFromDrafts);
    const nextPhoneEdit = {};
    const nextTimeFromEdit = {};
    const nextTimeUntilEdit = {};
    (data || []).forEach((agent) => {
      nextPhoneEdit[agent.user_id] = !agent.support_phone;
      nextTimeFromEdit[agent.user_id] = false;
      nextTimeUntilEdit[agent.user_id] = false;
    });
    setPhoneEditingMap(nextPhoneEdit);
    setTimeFromEditingMap(nextTimeFromEdit);
    setTimeUntilEditingMap(nextTimeUntilEdit);

    if (data && data.length > 0) {
      const agentIds = data.map((agent) => agent.user_id);
      const { data: users } = await supabase
        .from("usuarios")
        .select("id, nombre, apellido, public_id")
        .in("id", agentIds);
      const nextUsers = {};
      const nextNames = {};
      (users || []).forEach((u) => {
        nextUsers[u.id] = u;
        nextNames[u.id] = {
          nombre: u.nombre || "",
          apellido: u.apellido || "",
        };
      });
      setUsersMap(nextUsers);
      setNameDrafts(nextNames);
    } else {
      setUsersMap({});
      setNameDrafts({});
    }

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

    const { data: threads } = await supabase
      .from("support_threads")
      .select("id, public_id, status, category, created_at")
      .in("status", ["new", "queued"])
      .order("created_at", { ascending: true })
      .limit(12);
    setAvailableThreads(threads || []);
    setLoading(false);
  };

  const refreshAgentRow = async (userId) => {
    const { data: agent } = await supabase
      .from("support_agent_profiles")
      .select(
        "user_id, support_phone, authorized_for_work, blocked, authorized_until, authorized_from"
      )
      .eq("user_id", userId)
      .maybeSingle();
    if (!agent) return;
    setAgents((prev) =>
      prev.map((item) => (item.user_id === userId ? agent : item))
    );
    setPhoneDrafts((prev) => ({
      ...prev,
      [userId]: normalizeSupportPhoneInput(agent.support_phone || ""),
    }));
    setAuthorizedUntilDrafts((prev) => ({
      ...prev,
      [userId]: agent.authorized_until
        ? new Date(agent.authorized_until).toISOString().slice(11, 16)
        : "18:00",
    }));
    setAuthorizedFromDrafts((prev) => ({
      ...prev,
      [userId]: agent.authorized_from ? formatTime(agent.authorized_from) : "08:00",
    }));

    const { data: userRow } = await supabase
      .from("usuarios")
      .select("id, nombre, apellido, public_id")
      .eq("id", userId)
      .maybeSingle();
    if (userRow) {
      setUsersMap((prev) => ({ ...prev, [userId]: userRow }));
    }

    const { data: session } = await supabase
      .from("support_agent_sessions")
      .select("agent_id, start_at, last_seen_at")
      .eq("agent_id", userId)
      .is("end_at", null)
      .maybeSingle();
    setSessionsMap((prev) => ({
      ...prev,
      [userId]: session || null,
    }));

    const { data: activeThread } = await supabase
      .from("support_threads")
      .select("assigned_agent_id, public_id, status")
      .eq("assigned_agent_id", userId)
      .in("status", ["assigned", "in_progress", "waiting_user"])
      .maybeSingle();
    setActiveTicketsMap((prev) => ({
      ...prev,
      [userId]: activeThread || null,
    }));
  };

  useEffect(() => {
    mountedRef.current = true;
    loadAgents();
    // Realtime subscription (disabled until prod)
    // const channel = supabase
    //   .channel("support_admin_agents")
    //   .on(
    //     "postgres_changes",
    //     { event: "*", schema: "public", table: "support_agent_sessions" },
    //     loadAgents
    //   )
    //   .on(
    //     "postgres_changes",
    //     { event: "*", schema: "public", table: "support_agent_profiles" },
    //     loadAgents
    //   )
    //   .on(
    //     "postgres_changes",
    //     { event: "*", schema: "public", table: "support_threads" },
    //     loadAgents
    //   )
    //   .subscribe();
    return () => {
      mountedRef.current = false;
      // if (channel) supabase.removeChannel(channel);
    };
  }, []);

  const updateAgent = async (userId, patch) => {
    const { data, error } = await supabase
      .from("support_agent_profiles")
      .update(patch)
      .eq("user_id", userId)
      .select(
        "user_id, support_phone, authorized_for_work, blocked, authorized_until, authorized_from"
      )
      .single();
    if (error || !data) {
      setAgentErrors((prev) => ({
        ...prev,
        [userId]: error?.message || "No se pudo guardar los cambios.",
      }));
      return false;
    }
    setAgentErrors((prev) => ({
      ...prev,
      [userId]: "",
    }));
    setAgents((prev) =>
      prev.map((agent) => (agent.user_id === userId ? data : agent))
    );
    setPhoneDrafts((prev) => ({
      ...prev,
      [userId]: normalizeSupportPhoneInput(data.support_phone || ""),
    }));
    setAuthorizedUntilDrafts((prev) => ({
      ...prev,
      [userId]: data.authorized_until
        ? new Date(data.authorized_until).toISOString().slice(11, 16)
        : "18:00",
    }));
    setAuthorizedFromDrafts((prev) => ({
      ...prev,
      [userId]: data.authorized_from ? formatTime(data.authorized_from) : "08:00",
    }));
    return true;
  };

  const isPhoneValid = (rawValue) => {
    const digits = String(rawValue || "").replace(/\D/g, "");
    return (
      (digits.length === 10 && digits.startsWith("0")) || digits.length === 9
    );
  };

  const updateUsuario = async (userId, patch) => {
    const { data } = await supabase
      .from("usuarios")
      .update(patch)
      .eq("id", userId)
      .select("id, nombre, apellido, public_id")
      .single();
    if (!data) return;
    setUsersMap((prev) => ({
      ...prev,
      [userId]: data,
    }));
    setNameDrafts((prev) => ({
      ...prev,
      [userId]: {
        nombre: data.nombre || "",
        apellido: data.apellido || "",
      },
    }));
  };

  const handleCreateChange = (field) => (event) => {
    setCreateForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleCreate = async () => {
    setCreateError("");
    setCreateResult(null);
    const payload = {
      nombre: createForm.nombre.trim(),
      apellido: createForm.apellido.trim(),
      email: createForm.email.trim(),
      fecha_nacimiento: createForm.fecha_nacimiento || null,
      role: createForm.role,
    };
    if (!payload.nombre || !payload.apellido || !payload.email) {
      setCreateError("Completa todos los datos.");
      return;
    }
    setCreateLoading(true);
    const result = await createSupportAdminUser(payload);
    setCreateLoading(false);
    if (!result.ok) {
      setCreateError("No se pudo crear la cuenta.");
      return;
    }
    setCreateResult(result.data);
    setCreateForm({
      nombre: "",
      apellido: "",
      email: "",
      fecha_nacimiento: "",
      role: "soporte",
    });
    await loadAgents();
  };

  return (
    <AdminLayout
      title="Asesores"
      subtitle="Gestiona disponibilidad y autorizaciones"
    >
      <div className="space-y-6">
        <div className="rounded-3xl border border-[#E9E2F7] bg-white p-6 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-[#2F1A55]">
              Crear cuenta de soporte
            </div>
            <button
              type="button"
              onClick={() => setCreateOpen((prev) => !prev)}
              className="rounded-2xl border border-[#E9E2F7] px-4 py-2 text-xs font-semibold text-[#5E30A5]"
            >
              Crear cuenta
            </button>
          </div>
          {createOpen ? (
            <>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  value={createForm.nombre}
                  onChange={handleCreateChange("nombre")}
                  placeholder="Nombre"
                  className="rounded-2xl border border-[#E9E2F7] px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#5E30A5]"
                />
                <input
                  value={createForm.apellido}
                  onChange={handleCreateChange("apellido")}
                  placeholder="Apellido"
                  className="rounded-2xl border border-[#E9E2F7] px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#5E30A5]"
                />
                <input
                  value={createForm.email}
                  onChange={handleCreateChange("email")}
                  placeholder="Correo"
                  className="rounded-2xl border border-[#E9E2F7] px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#5E30A5]"
                />
                <input
                  type="date"
                  value={createForm.fecha_nacimiento}
                  onChange={handleCreateChange("fecha_nacimiento")}
                  className="rounded-2xl border border-[#E9E2F7] px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#5E30A5]"
                />
                <select
                  value={createForm.role}
                  onChange={handleCreateChange("role")}
                  className="rounded-2xl border border-[#E9E2F7] px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#5E30A5]"
                >
                  <option value="soporte">Soporte</option>
                  <option value="dev">Dev</option>
                  <option value="empleado">Empleado</option>
                </select>
              </div>
              {createError ? (
                <div className="text-xs text-red-500">{createError}</div>
              ) : null}
              {createResult ? (
                <div className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] px-4 py-3 text-xs text-slate-600 space-y-1">
                  <div>Correo: {createResult.email}</div>
                  <div>Contrasena provisional: {createResult.password}</div>
                </div>
              ) : null}
              <button
                type="button"
                onClick={handleCreate}
                disabled={createLoading}
                className={`rounded-2xl px-4 py-2 text-sm font-semibold text-white ${
                  createLoading ? "bg-[#C9B6E8]" : "bg-[#5E30A5]"
                }`}
              >
                {createLoading ? "Creando..." : "Crear cuenta"}
              </button>
            </>
          ) : null}
        </div>

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
                  className={`rounded-2xl border border-[#E9E2F7] bg-white px-4 py-3 text-sm text-slate-600 ${computeGlow(
                    agent
                  )}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <button
                        type="button"
                        onClick={() => refreshAgentRow(agent.user_id)}
                        className="rounded-full border border-[#E9E2F7] p-2 text-slate-500"
                      >
                        <RefreshCw size={14} />
                      </button>
                      <div className="font-semibold text-[#5E30A5]">
                        {usersMap[agent.user_id]?.nombre || usersMap[agent.user_id]?.apellido
                          ? `${usersMap[agent.user_id]?.nombre || ""} ${usersMap[agent.user_id]?.apellido || ""}`.trim()
                          : usersMap[agent.user_id]?.public_id || "Sin nombre"}
                      </div>
                      {!expandedMap[agent.user_id] ? (
                        <>
                          <div
                            className={
                              agent.support_phone ? "text-slate-500" : "text-slate-900"
                            }
                          >
                            {formatSupportPhone(agent.support_phone)}
                          </div>
                          <div
                            className={
                              sessionsMap[agent.user_id]
                                ? "text-slate-500"
                                : "text-slate-900"
                            }
                          >
                            {sessionsMap[agent.user_id] ? "Sesion activa" : "Sin timbrar"}
                          </div>
                          <div className="text-slate-500">
                            {agent.authorized_from
                              ? formatTime(agent.authorized_from)
                              : "08:00"}
                            {" - "}
                            {agent.authorized_until
                              ? formatTime(agent.authorized_until)
                              : "18:00"}
                          </div>
                        </>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedMap((prev) => ({
                          ...prev,
                          [agent.user_id]: !prev[agent.user_id],
                        }))
                      }
                      className="rounded-full border border-[#E9E2F7] p-2 text-slate-500"
                    >
                      {expandedMap[agent.user_id] ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  </div>

                  {activeTicketsMap[agent.user_id] ? (
                    <div className="mt-2 text-xs text-slate-500">
                      Ticket asignado: {activeTicketsMap[agent.user_id].public_id}
                    </div>
                  ) : null}

                      {expandedMap[agent.user_id] ? (
                    <div className="mt-4 grid gap-4 text-xs text-slate-500 md:grid-cols-[1fr_1fr]">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="min-w-[70px] text-slate-400">Tel</span>
                          {phoneEditingMap[agent.user_id] ? (
                            <>
                              <input
                                value={phoneDrafts[agent.user_id] ?? ""}
                                onChange={(e) =>
                                  setPhoneDrafts((prev) => ({
                                    ...prev,
                                    [agent.user_id]: normalizeSupportPhoneInput(
                                      e.target.value
                                    ),
                                  }))
                                }
                                placeholder="Sin numero"
                                className="w-1/4 rounded-full border border-[#E9E2F7] bg-white px-3 py-1 text-xs text-slate-600 outline-none focus:border-[#5E30A5]"
                              />
                              {isPhoneValid(phoneDrafts[agent.user_id]) ? (
                                <button
                                  type="button"
                                  onClick={async () => {
                                    await updateAgent(agent.user_id, {
                                      support_phone: formatSupportPhoneForSave(
                                        phoneDrafts[agent.user_id]
                                      ),
                                    });
                                    setPhoneEditingMap((prev) => ({
                                      ...prev,
                                      [agent.user_id]: false,
                                    }));
                                  }}
                                  className="rounded-full border border-[#E9E2F7] px-3 py-1 text-xs font-semibold text-slate-600"
                                >
                                  OK
                                </button>
                              ) : null}
                            </>
                          ) : (
                            <>
                              <span className="flex-1 text-slate-600">
                                {formatSupportPhone(agent.support_phone)}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  setPhoneEditingMap((prev) => ({
                                    ...prev,
                                    [agent.user_id]: true,
                                  }))
                                }
                                className="rounded-full border border-[#E9E2F7] px-2 py-1 text-[10px] font-semibold text-slate-500"
                              >
                                ✎
                              </button>
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="min-w-[70px] text-slate-400">Desde</span>
                          {timeFromEditingMap[agent.user_id] ? (
                            <input
                              type="time"
                              value={authorizedFromDrafts[agent.user_id] ?? "08:00"}
                              onChange={(e) =>
                                setAuthorizedFromDrafts((prev) => ({
                                  ...prev,
                                  [agent.user_id]: e.target.value,
                                }))
                              }
                              className="w-24 rounded-full border border-[#E9E2F7] bg-white px-3 py-1 text-xs text-slate-600 outline-none focus:border-[#5E30A5]"
                            />
                          ) : (
                            <span className="flex-1 text-slate-600">
                              {authorizedFromDrafts[agent.user_id] ?? "08:00"}
                            </span>
                          )}
                          {!timeFromEditingMap[agent.user_id] ? (
                            <button
                              type="button"
                              onClick={() =>
                                setTimeFromEditingMap((prev) => ({
                                  ...prev,
                                  [agent.user_id]: true,
                                }))
                              }
                              className="rounded-full border border-[#E9E2F7] px-2 py-1 text-[10px] font-semibold text-slate-500"
                            >
                              ✎
                            </button>
                          ) : agent.authorized_from ? (
                            <button
                              type="button"
                              onClick={() =>
                                setTimeFromEditingMap((prev) => ({
                                  ...prev,
                                  [agent.user_id]: false,
                                }))
                              }
                              className="rounded-full border border-[#E9E2F7] px-2 py-1 text-[10px] font-semibold text-slate-500"
                            >
                              ✕
                            </button>
                          ) : null}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="min-w-[70px] text-slate-400">Hasta</span>
                          {timeUntilEditingMap[agent.user_id] ? (
                            <input
                              type="time"
                              value={authorizedUntilDrafts[agent.user_id] ?? "18:00"}
                              onChange={(e) =>
                                setAuthorizedUntilDrafts((prev) => ({
                                  ...prev,
                                  [agent.user_id]: e.target.value,
                                }))
                              }
                              className="w-24 rounded-full border border-[#E9E2F7] bg-white px-3 py-1 text-xs text-slate-600 outline-none focus:border-[#5E30A5]"
                            />
                          ) : (
                            <span className="flex-1 text-slate-600">
                              {authorizedUntilDrafts[agent.user_id] ?? "18:00"}
                            </span>
                          )}
                          {!timeUntilEditingMap[agent.user_id] ? (
                            <button
                              type="button"
                              onClick={() =>
                                setTimeUntilEditingMap((prev) => ({
                                  ...prev,
                                  [agent.user_id]: true,
                                }))
                              }
                              className="rounded-full border border-[#E9E2F7] px-2 py-1 text-[10px] font-semibold text-slate-500"
                            >
                              ✎
                            </button>
                          ) : agent.authorized_until ? (
                            <button
                              type="button"
                              onClick={() =>
                                setTimeUntilEditingMap((prev) => ({
                                  ...prev,
                                  [agent.user_id]: false,
                                }))
                              }
                              className="rounded-full border border-[#E9E2F7] px-2 py-1 text-[10px] font-semibold text-slate-500"
                            >
                              ✕
                            </button>
                          ) : null}
                        </div>

                        <div className="mt-2 flex flex-wrap gap-2">
                          {!agent.authorized_for_work ? (
                            <button
                              type="button"
                              onClick={async () => {
                                const ok = await updateAgent(agent.user_id, {
                                  authorized_for_work: true,
                                  blocked: false,
                                  authorized_from: timeValueToIso(
                                    authorizedFromDrafts[agent.user_id] || "08:00"
                                  ),
                                  authorized_until: timeValueToIso(
                                    authorizedUntilDrafts[agent.user_id]
                                  ),
                                });
                                if (ok) {
                                  setExpandedMap((prev) => ({
                                    ...prev,
                                    [agent.user_id]: false,
                                  }));
                                }
                              }}
                              className="rounded-full bg-[#5E30A5] px-3 py-1 text-xs font-semibold text-white"
                            >
                              Autorizar
                            </button>
                          ) : null}
                          <button
                            type="button"
                            onClick={async () =>
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
                        {agentErrors[agent.user_id] ? (
                          <div className="text-xs text-red-500">
                            {agentErrors[agent.user_id]}
                          </div>
                        ) : null}
                      </div>

                      <div className="space-y-2 text-xs text-slate-500">
                        <div className="text-[11px] uppercase tracking-wide text-slate-400">
                          Tickets
                        </div>
                        {activeTicketsMap[agent.user_id] ? (
                          <div className="rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2">
                            <div className="font-semibold text-slate-600">
                              {activeTicketsMap[agent.user_id].public_id}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {activeTicketsMap[agent.user_id].status}
                            </div>
                            <button
                              type="button"
                              onClick={async () => {
                                const result = await closeSupportThread({
                                  thread_public_id:
                                    activeTicketsMap[agent.user_id].public_id,
                                  resolution: "Cierre forzado por admin",
                                  root_cause: "cierre_forzado",
                                });
                                if (!result.ok) {
                                  setAssignErrors((prev) => ({
                                    ...prev,
                                    [agent.user_id]:
                                      result.error || "No se pudo cerrar.",
                                  }));
                                  return;
                                }
                                setAssignErrors((prev) => ({
                                  ...prev,
                                  [agent.user_id]: "",
                                }));
                                await loadAgents();
                              }}
                              className="mt-2 rounded-full border border-[#E9E2F7] px-3 py-1 text-[11px] font-semibold text-slate-600"
                            >
                              Forzar cierre
                            </button>
                          </div>
                        ) : (
                          <>
                            {availableThreads.length === 0 ? (
                              <div className="text-xs text-slate-400">
                                Sin tickets disponibles
                              </div>
                            ) : (
                              <div className="space-y-2">
                                {availableThreads.slice(0, 4).map((thread) => (
                                  <div
                                    key={thread.id}
                                    className="flex items-center justify-between gap-2 rounded-xl border border-[#E9E2F7] px-3 py-2"
                                  >
                                    <div>
                                      <div className="font-semibold text-slate-600">
                                        {thread.public_id}
                                      </div>
                                      <div className="text-[11px] text-slate-400">
                                        {thread.status}
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={async () => {
                                        const result = await assignSupportThread({
                                          thread_public_id: thread.public_id,
                                          agent_id: agent.user_id,
                                        });
                                        if (!result.ok) {
                                          setAssignErrors((prev) => ({
                                            ...prev,
                                            [agent.user_id]:
                                              result.error || "No se pudo asignar.",
                                          }));
                                          return;
                                        }
                                        setAssignErrors((prev) => ({
                                          ...prev,
                                          [agent.user_id]: "",
                                        }));
                                        await loadAgents();
                                      }}
                                      className="rounded-full border border-[#E9E2F7] px-3 py-1 text-[11px] font-semibold text-slate-600"
                                    >
                                      Asignar
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                            {assignErrors[agent.user_id] ? (
                              <div className="text-xs text-red-500">
                                {assignErrors[agent.user_id]}
                              </div>
                            ) : null}
                          </>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
