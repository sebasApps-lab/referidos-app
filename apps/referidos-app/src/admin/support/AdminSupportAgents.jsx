import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, ChevronUp, Pencil, RefreshCw, Users, X } from "lucide-react";
import AdminLayout from "../layout/AdminLayout";
import { supabase } from "../../lib/supabaseClient";
import {
  assignSupportThread,
  closeSupportThread,
  createSupportAdminUser,
  denyAdminSupportSession,
  endAdminSupportSession,
  startAdminSupportSession,
} from "@referidos/support-sdk/supportClient";

// Lint purge (no-unused-vars): se purgaron lecturas de `recentTicketsMap` y `nameDrafts` (estado inicial) y helper `updateUsuario` (bloque de mutaciones).
export default function AdminSupportAgents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [phoneDrafts, setPhoneDrafts] = useState({});
  const [authorizedUntilDrafts, setAuthorizedUntilDrafts] = useState({});
  const [authorizedFromDrafts, setAuthorizedFromDrafts] = useState({});
  const [usersMap, setUsersMap] = useState({});
  const [sessionsMap, setSessionsMap] = useState({});
  const [activeTicketsMap, setActiveTicketsMap] = useState({});
  const [, setRecentTicketsMap] = useState({});
  const [, setNameDrafts] = useState({});
  const [expandedMap, setExpandedMap] = useState({});
  const [agentErrors, setAgentErrors] = useState({});
  const [availableThreads, setAvailableThreads] = useState([]);
  const [assignErrors, setAssignErrors] = useState({});
  const [phoneEditingMap, setPhoneEditingMap] = useState({});
  const [timeFromEditingMap, setTimeFromEditingMap] = useState({});
  const [timeUntilEditingMap, setTimeUntilEditingMap] = useState({});
  const [refreshingMap, setRefreshingMap] = useState({});
  const [globalRefreshing, setGlobalRefreshing] = useState(false);
  const [actionLoadingMap, setActionLoadingMap] = useState({});
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
  const authorizedAgentsCount = useMemo(
    () => agents.filter((agent) => agent.authorized_for_work && !agent.blocked).length,
    [agents]
  );

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

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("es-EC", {
      day: "2-digit",
      month: "2-digit",
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

  const buildHourOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour += 1) {
      options.push(hour.toString().padStart(2, "0"));
    }
    return options;
  };

  const hourOptions = useMemo(() => buildHourOptions(), []);

  const pad2 = (value) => value.toString().padStart(2, "0");

  const parseTimeToMinutes = (value) => {
    if (!value) return null;
    const [h, m] = value.split(":").map((item) => parseInt(item, 10));
    if (Number.isNaN(h) || Number.isNaN(m)) return null;
    return h * 60 + m;
  };

  const clampToShift = (fromTime, untilTime) => {
    const fromMinutes = parseTimeToMinutes(fromTime);
    const untilMinutes = parseTimeToMinutes(untilTime);
    if (fromMinutes === null || untilMinutes === null) return untilTime;
    let diff = (untilMinutes - fromMinutes + 1440) % 1440;
    if (diff === 0) diff = 1440;
    if (diff <= 480) return untilTime;
    const maxMinutes = (fromMinutes + 480) % 1440;
    return `${pad2(Math.floor(maxMinutes / 60))}:${pad2(maxMinutes % 60)}`;
  };

  const getAllowedUntilMinutes = (fromTime) => {
    const fromMinutes = parseTimeToMinutes(fromTime);
    if (fromMinutes === null) return null;
    return (fromMinutes + 480) % 1440;
  };

  const isAfterLimit = (fromTime, untilTime) => {
    const fromMinutes = parseTimeToMinutes(fromTime);
    const untilMinutes = parseTimeToMinutes(untilTime);
    if (fromMinutes === null || untilMinutes === null) return false;
    let diff = (untilMinutes - fromMinutes + 1440) % 1440;
    if (diff === 0) diff = 1440;
    return diff > 480;
  };

  const getShiftDuration = (agent) => {
    if (!agent.authorized_from || !agent.authorized_until) return "";
    const start = new Date(agent.authorized_from);
    const end = new Date(agent.authorized_until);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "";
    const diffMs = end.getTime() - start.getTime();
    if (diffMs <= 0) return "";
    const minutes = Math.round(diffMs / 60000);
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours <= 0) return "";
    return mins ? `${hours}h ${pad2(mins)}m` : `${hours} horas`;
  };

  const getAgentFromTime = (agent) =>
    agent.authorized_from ? formatTime(agent.authorized_from) : "08:00";
  const getAgentUntilTime = (agent) =>
    agent.authorized_until ? formatTime(agent.authorized_until) : "18:00";
  const getAgentDateRange = (agent) => {
    if (!agent.authorized_from || !agent.authorized_until) return "";
    const startDate = formatDate(agent.authorized_from);
    const endDate = formatDate(agent.authorized_until);
    if (!startDate || !endDate || startDate === endDate) return "";
    return `${startDate} - ${endDate}`;
  };

  const hasAgentChanges = (agent) => {
    const phoneDraft = phoneDrafts[agent.user_id] ?? "";
    const currentPhone = agent.support_phone || "";
    const nextPhone = phoneDraft ? formatSupportPhoneForSave(phoneDraft) : null;
    const phoneChanged = (nextPhone || "") !== currentPhone;
    const fromChanged =
      (authorizedFromDrafts[agent.user_id] ?? "08:00") !== getAgentFromTime(agent);
    const untilChanged =
      (authorizedUntilDrafts[agent.user_id] ?? "18:00") !==
      getAgentUntilTime(agent);
    return phoneChanged || fromChanged || untilChanged;
  };

  const timeValueToIso = (timeValue, dayOffset = 0) => {
    if (!timeValue) return null;
    const [hours, minutes] = timeValue.split(":").map((value) => parseInt(value, 10));
    if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
    const offsetMs = 5 * 60 * 60 * 1000;
    const ecuNow = new Date(Date.now() - offsetMs);
    const utcTime = Date.UTC(
      ecuNow.getUTCFullYear(),
      ecuNow.getUTCMonth(),
      ecuNow.getUTCDate() + dayOffset,
      hours + 5,
      minutes,
      0,
      0
    );
    return new Date(utcTime).toISOString();
  };

  const buildEcuadorDate = (hour, minute = 0, dayOffset = 0) => {
    const offsetMs = 5 * 60 * 60 * 1000;
    const ecuNow = new Date(Date.now() - offsetMs);
    const utcTime = Date.UTC(
      ecuNow.getUTCFullYear(),
      ecuNow.getUTCMonth(),
      ecuNow.getUTCDate() + dayOffset,
      hour + 5,
      minute,
      0,
      0
    );
    return new Date(utcTime);
  };

  const computeGlow = (agent) => {
    if (agent.blocked) return "shadow-[0_0_0_1px_rgba(239,68,68,0.4)]";
    if (!agent.authorized_for_work) {
      return "shadow-[0_0_0_1px_rgba(148,163,184,0.4)]";
    }
    if (sessionsMap[agent.user_id]) {
      return "shadow-[0_0_0_1px_rgba(34,197,94,0.4)]";
    }
    const startAt = agent.authorized_from
      ? new Date(agent.authorized_from)
      : buildEcuadorDate(8, 0);
    const endAt = agent.authorized_until
      ? new Date(agent.authorized_until)
      : buildEcuadorDate(18, 0);
    if (Number.isNaN(startAt.getTime()) || Number.isNaN(endAt.getTime())) {
      return "shadow-[0_0_0_1px_rgba(148,163,184,0.4)]";
    }
    const now = Date.now();
    if (now < startAt.getTime()) {
      return "shadow-[0_0_0_1px_rgba(34,197,94,0.4)]";
    }
    if (now <= endAt.getTime()) {
      return "shadow-[0_0_0_1px_rgba(249,115,22,0.45)]";
    }
    return "shadow-[0_0_0_1px_rgba(148,163,184,0.4)]";
  };

  const loadAgents = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("support_agent_profiles")
      .select(
        "user_id, support_phone, authorized_for_work, blocked, authorized_until, authorized_from, session_request_status, session_request_at"
      )
      .order("authorized_for_work", { ascending: false });
    if (!mountedRef.current) return;
    setAgents(data || []);
    const nextDrafts = {};
    const nextUntilDrafts = {};
    const nextFromDrafts = {};
    (data || []).forEach((agent) => {
      nextDrafts[agent.user_id] = normalizeSupportPhoneInput(agent.support_phone || "");
      const fromValue = agent.authorized_from
        ? formatTime(agent.authorized_from)
        : "08:00";
      const untilValue = agent.authorized_until
        ? formatTime(agent.authorized_until)
        : "18:00";
      nextFromDrafts[agent.user_id] = fromValue;
      nextUntilDrafts[agent.user_id] = clampToShift(fromValue, untilValue);
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
    setRefreshingMap((prev) => ({ ...prev, [userId]: true }));
    const { data: agent } = await supabase
      .from("support_agent_profiles")
      .select(
        "user_id, support_phone, authorized_for_work, blocked, authorized_until, authorized_from, session_request_status, session_request_at"
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
    const fromValue = agent.authorized_from
      ? formatTime(agent.authorized_from)
      : "08:00";
    const untilValue = agent.authorized_until
      ? formatTime(agent.authorized_until)
      : "18:00";
    setAuthorizedUntilDrafts((prev) => ({
      ...prev,
      [userId]: clampToShift(fromValue, untilValue),
    }));
    setAuthorizedFromDrafts((prev) => ({
      ...prev,
      [userId]: fromValue,
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
    setRefreshingMap((prev) => ({ ...prev, [userId]: false }));
  };

  const refreshAllAgents = async () => {
    if (globalRefreshing) return;
    setGlobalRefreshing(true);
    try {
      await loadAgents();
    } finally {
      if (mountedRef.current) {
        setGlobalRefreshing(false);
      }
    }
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
    const dataFromValue = data.authorized_from
      ? formatTime(data.authorized_from)
      : "08:00";
    const dataUntilValue = data.authorized_until
      ? formatTime(data.authorized_until)
      : "18:00";
    setAuthorizedUntilDrafts((prev) => ({
      ...prev,
      [userId]: clampToShift(dataFromValue, dataUntilValue),
    }));
    setAuthorizedFromDrafts((prev) => ({
      ...prev,
      [userId]: dataFromValue,
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

        <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-[#E9E2F7] bg-white px-4 py-3">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.12em] text-slate-400">
                <span>Agentes autorizados</span>
                <Users size={14} className="text-[#5E30A5]" />
              </div>
              <div className="mt-2 text-xl font-extrabold text-[#2F1A55]">{authorizedAgentsCount}</div>
              <div className="mt-1 text-xs text-slate-500">Asesores habilitados para atencion.</div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#E9E2F7] bg-white p-6 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-[#2F1A55]">
              Estado de asesores
            </div>
            <button
              type="button"
              onClick={refreshAllAgents}
              disabled={loading || globalRefreshing}
              className="rounded-full border border-[#E9E2F7] p-2 text-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
              title="Refrescar todos los asesores"
              aria-label="Refrescar todos los asesores"
            >
              <RefreshCw
                size={14}
                className={loading || globalRefreshing ? "animate-spin" : ""}
              />
            </button>
          </div>
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
                      <RefreshCw
                        size={14}
                        className={
                          refreshingMap[agent.user_id] ? "animate-spin" : ""
                        }
                      />
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
                            {sessionsMap[agent.user_id]
                              ? "Sesion activa"
                              : "Sesion inactiva"}
                          </div>
                          <div className="text-slate-500">
                            {agent.authorized_from
                              ? formatTime(agent.authorized_from)
                              : "08:00"}
                            {" - "}
                            {agent.authorized_until
                              ? formatTime(agent.authorized_until)
                              : "18:00"}
                            {getShiftDuration(agent)
                              ? ` (turno de ${getShiftDuration(agent)})`
                              : ""}
                            {getAgentDateRange(agent)
                              ? ` (${getAgentDateRange(agent)})`
                              : ""}
                          </div>
                          {!agent.authorized_for_work &&
                          !agent.blocked &&
                          agent.support_phone &&
                          agent.authorized_from &&
                          agent.authorized_until ? (
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={async () => {
                                  setActionLoadingMap((prev) => ({
                                    ...prev,
                                    [agent.user_id]: true,
                                  }));
                                  const ok = await updateAgent(agent.user_id, {
                                    authorized_for_work: true,
                                    blocked: false,
                                  });
                                  setActionLoadingMap((prev) => ({
                                    ...prev,
                                    [agent.user_id]: false,
                                  }));
                                  if (ok) {
                                    setExpandedMap((prev) => ({
                                      ...prev,
                                      [agent.user_id]: false,
                                    }));
                                  }
                                }}
                                disabled={actionLoadingMap[agent.user_id]}
                                className={`rounded-full px-3 py-1 text-[11px] font-semibold text-white ${
                                  actionLoadingMap[agent.user_id]
                                    ? "bg-[#C9B6E8] cursor-not-allowed"
                                    : "bg-[#5E30A5]"
                                }`}
                              >
                                Autorizar
                              </button>
                              <button
                                type="button"
                                onClick={async () => {
                                  setActionLoadingMap((prev) => ({
                                    ...prev,
                                    [agent.user_id]: true,
                                  }));
                                  await updateAgent(agent.user_id, {
                                    authorized_for_work: false,
                                    blocked: true,
                                  });
                                  setActionLoadingMap((prev) => ({
                                    ...prev,
                                    [agent.user_id]: false,
                                  }));
                                }}
                                disabled={actionLoadingMap[agent.user_id]}
                                className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${
                                  actionLoadingMap[agent.user_id]
                                    ? "border-red-200 text-red-300 cursor-not-allowed"
                                    : "border-red-200 text-red-500"
                                }`}
                              >
                                Bloquear
                              </button>
                            </div>
                          ) : null}
                        </>
                      ) : null}
                    </div>
                    {agent.session_request_status === "pending" ? (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={async () => {
                            await startAdminSupportSession({
                              agent_id: agent.user_id,
                            });
                            await refreshAgentRow(agent.user_id);
                          }}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white"
                        >
                          <Check size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            await denyAdminSupportSession({
                              agent_id: agent.user_id,
                            });
                            await refreshAgentRow(agent.user_id);
                          }}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-500 text-white"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : null}
                    <div className="flex items-center gap-2">
                      {sessionsMap[agent.user_id] ? (
                        <button
                          type="button"
                          onClick={async () => {
                            await endAdminSupportSession({
                              agent_id: agent.user_id,
                              reason: "admin_revoke",
                            });
                            await refreshAgentRow(agent.user_id);
                          }}
                          className="rounded-full border border-[#E9E2F7] px-3 py-1 text-[11px] font-semibold text-slate-600"
                        >
                          Cerrar jornada
                        </button>
                      ) : null}
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
                              {agent.support_phone ? (
                                <button
                                  type="button"
                                  onClick={async () => {
                                    setPhoneDrafts((prev) => ({
                                      ...prev,
                                      [agent.user_id]: normalizeSupportPhoneInput(
                                        agent.support_phone || ""
                                      ),
                                    }));
                                    setPhoneEditingMap((prev) => ({
                                      ...prev,
                                      [agent.user_id]: false,
                                    }));
                                  }}
                                  className="rounded-full border border-[#E9E2F7] px-2 py-1 text-[10px] font-semibold text-slate-500"
                                >
                                  <X size={12} />
                                </button>
                              ) : null}
                            </>
                          ) : (
                            <>
                            <span className="text-slate-600">
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
                                className="ml-1 rounded-full border border-[#E9E2F7] px-2 py-1 text-[10px] font-semibold text-slate-500"
                              >
                                <Pencil size={12} />
                              </button>
                            </>
                          )}
                        </div>

                        <div className="grid grid-cols-[max-content_max-content_max-content] items-center gap-x-2 gap-y-3">
                          <div className="flex w-fit items-center gap-1">
                            <span className="min-w-[70px] text-slate-400">Desde</span>
                            {timeFromEditingMap[agent.user_id] ? (
                              <div className="flex w-fit items-center gap-2">
                                <select
                                  value={
                                    (authorizedFromDrafts[agent.user_id] ?? "08:00").split(":")[0]
                                  }
                                  onChange={(e) => {
                                    const nextHour = e.target.value;
                                    const current = authorizedFromDrafts[agent.user_id] ?? "08:00";
                                    const nextValue = `${nextHour}:${current.split(":")[1] ?? "00"}`;
                                    setAuthorizedFromDrafts((prev) => ({
                                      ...prev,
                                      [agent.user_id]: nextValue,
                                    }));
                                    const untilValue =
                                      authorizedUntilDrafts[agent.user_id] ?? "18:00";
                                    if (isAfterLimit(nextValue, untilValue)) {
                                      setAuthorizedUntilDrafts((prev) => ({
                                        ...prev,
                                        [agent.user_id]: getAllowedUntilMinutes(nextValue) !== null
                                          ? `${pad2(Math.floor(getAllowedUntilMinutes(nextValue) / 60))}:${pad2(getAllowedUntilMinutes(nextValue) % 60)}`
                                          : untilValue,
                                      }));
                                    }
                                  }}
                                  className="w-16 rounded-full border border-[#E9E2F7] bg-white px-2 py-1 text-xs text-slate-600 outline-none focus:border-[#5E30A5]"
                                >
                                  {hourOptions.map((option) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                                <span className="text-xs text-slate-400">:</span>
                                <select
                                  value={
                                    (authorizedFromDrafts[agent.user_id] ?? "08:00").split(":")[1] ??
                                    "00"
                                  }
                                  onChange={(e) => {
                                    const current = authorizedFromDrafts[agent.user_id] ?? "08:00";
                                    const nextValue = `${current.split(":")[0]}:${e.target.value}`;
                                    setAuthorizedFromDrafts((prev) => ({
                                      ...prev,
                                      [agent.user_id]: nextValue,
                                    }));
                                    const untilValue =
                                      authorizedUntilDrafts[agent.user_id] ?? "18:00";
                                    if (isAfterLimit(nextValue, untilValue)) {
                                      setAuthorizedUntilDrafts((prev) => ({
                                        ...prev,
                                        [agent.user_id]: getAllowedUntilMinutes(nextValue) !== null
                                          ? `${pad2(Math.floor(getAllowedUntilMinutes(nextValue) / 60))}:${pad2(getAllowedUntilMinutes(nextValue) % 60)}`
                                          : untilValue,
                                      }));
                                    }
                                  }}
                                  className="w-16 rounded-full border border-[#E9E2F7] bg-white px-2 py-1 text-xs text-slate-600 outline-none focus:border-[#5E30A5]"
                                >
                                  {Array.from({ length: 60 }).map((_, idx) => (
                                    <option key={idx} value={pad2(idx)}>
                                      {pad2(idx)}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ) : (
                              <span className="w-fit text-slate-600">
                                {getAgentFromTime(agent)}
                                {getAgentDateRange(agent)
                                  ? ` (${formatDate(agent.authorized_from)})`
                                  : ""}
                              </span>
                            )}
                          </div>

                          {!timeUntilEditingMap[agent.user_id] ? (
                            <button
                              type="button"
                              onClick={() => {
                                setTimeFromEditingMap((prev) => ({
                                  ...prev,
                                  [agent.user_id]: true,
                                }));
                                setTimeUntilEditingMap((prev) => ({
                                  ...prev,
                                  [agent.user_id]: true,
                                }));
                              }}
                              className="col-start-3 row-span-2 self-center rounded-full border border-[#E9E2F7] px-2 py-1 text-[10px] font-semibold text-slate-500"
                            >
                              <Pencil size={12} />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setAuthorizedFromDrafts((prev) => ({
                                  ...prev,
                                  [agent.user_id]: getAgentFromTime(agent),
                                }));
                                setAuthorizedUntilDrafts((prev) => ({
                                  ...prev,
                                  [agent.user_id]: getAgentUntilTime(agent),
                                }));
                                setTimeFromEditingMap((prev) => ({
                                  ...prev,
                                  [agent.user_id]: false,
                                }));
                                setTimeUntilEditingMap((prev) => ({
                                  ...prev,
                                  [agent.user_id]: false,
                                }));
                              }}
                              className="col-start-3 row-span-2 self-center rounded-full border border-[#E9E2F7] px-2 py-1 text-[10px] font-semibold text-slate-500"
                            >
                              <X size={12} />
                            </button>
                          )}

                          <div className="flex w-fit items-center gap-1">
                            <span className="min-w-[70px] text-slate-400">Hasta</span>
                            {timeUntilEditingMap[agent.user_id] ? (
                              <div className="flex w-fit items-center gap-2">
                                <select
                                  value={
                                    (authorizedUntilDrafts[agent.user_id] ?? "18:00").split(":")[0]
                                  }
                                  onChange={(e) => {
                                    const nextHour = e.target.value;
                                    const current =
                                      authorizedUntilDrafts[agent.user_id] ?? "18:00";
                                    setAuthorizedUntilDrafts((prev) => ({
                                      ...prev,
                                      [agent.user_id]: `${nextHour}:${current.split(":")[1] ?? "00"}`,
                                    }));
                                  }}
                                  className="w-16 rounded-full border border-[#E9E2F7] bg-white px-2 py-1 text-xs text-slate-600 outline-none focus:border-[#5E30A5]"
                                >
                                  {hourOptions.map((option) => {
                                    const fromValue =
                                      authorizedFromDrafts[agent.user_id] ?? "08:00";
                                    const optionValue = `${option}:00`;
                                    const disabled = isAfterLimit(fromValue, optionValue);
                                    return (
                                      <option
                                        key={option}
                                        value={option}
                                        disabled={disabled}
                                        style={disabled ? { color: "#CBD5E1" } : undefined}
                                      >
                                        {option}
                                      </option>
                                    );
                                  })}
                                </select>
                                <span className="text-xs text-slate-400">:</span>
                                <select
                                  value={
                                    (authorizedUntilDrafts[agent.user_id] ?? "18:00").split(":")[1] ??
                                    "00"
                                  }
                                  onChange={(e) => {
                                    const current =
                                      authorizedUntilDrafts[agent.user_id] ?? "18:00";
                                    setAuthorizedUntilDrafts((prev) => ({
                                      ...prev,
                                      [agent.user_id]: `${current.split(":")[0]}:${e.target.value}`,
                                    }));
                                  }}
                                  className="w-16 rounded-full border border-[#E9E2F7] bg-white px-2 py-1 text-xs text-slate-600 outline-none focus:border-[#5E30A5]"
                                >
                                  {Array.from({ length: 60 }).map((_, idx) => {
                                    const minuteValue = pad2(idx);
                                    const fromValue =
                                      authorizedFromDrafts[agent.user_id] ?? "08:00";
                                    const hourValue =
                                      (authorizedUntilDrafts[agent.user_id] ?? "18:00").split(":")[0];
                                    const optionValue = `${hourValue}:${minuteValue}`;
                                    const disabled = isAfterLimit(fromValue, optionValue);
                                    return (
                                      <option
                                        key={minuteValue}
                                        value={minuteValue}
                                        disabled={disabled}
                                        style={disabled ? { color: "#CBD5E1" } : undefined}
                                      >
                                        {minuteValue}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            ) : (
                              <span className="w-fit text-slate-600">
                                {getAgentUntilTime(agent)}
                                {getAgentDateRange(agent)
                                  ? ` (${formatDate(agent.authorized_until)})`
                                  : ""}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          {hasAgentChanges(agent) ? (
                            <button
                              type="button"
                              onClick={async () => {
                                const ok = await updateAgent(agent.user_id, {
                                  support_phone: isPhoneValid(
                                    phoneDrafts[agent.user_id]
                                  )
                                    ? formatSupportPhoneForSave(
                                        phoneDrafts[agent.user_id]
                                      )
                                    : agent.support_phone,
                                  authorized_from: timeValueToIso(
                                    authorizedFromDrafts[agent.user_id] || "08:00"
                                  ),
                                  authorized_until: timeValueToIso(
                                    authorizedUntilDrafts[agent.user_id],
                                    isAfterLimit(
                                      authorizedFromDrafts[agent.user_id] || "08:00",
                                      authorizedUntilDrafts[agent.user_id] || "18:00"
                                    )
                                      ? 1
                                      : authorizedUntilDrafts[agent.user_id] <
                                          (authorizedFromDrafts[agent.user_id] || "08:00")
                                        ? 1
                                        : 0
                                  ),
                                });
                                if (ok) {
                                  setPhoneEditingMap((prev) => ({
                                    ...prev,
                                    [agent.user_id]: false,
                                  }));
                                  setTimeFromEditingMap((prev) => ({
                                    ...prev,
                                    [agent.user_id]: false,
                                  }));
                                  setTimeUntilEditingMap((prev) => ({
                                    ...prev,
                                    [agent.user_id]: false,
                                  }));
                                }
                              }}
                              className="rounded-full bg-[#5E30A5] px-3 py-1 text-xs font-semibold text-white"
                            >
                              Guardar
                            </button>
                          ) : null}
                          {!agent.authorized_for_work ? (
                            <button
                              type="button"
                              onClick={async () => {
                                setActionLoadingMap((prev) => ({
                                  ...prev,
                                  [agent.user_id]: true,
                                }));
                                const ok = await updateAgent(agent.user_id, {
                                  authorized_for_work: true,
                                  blocked: false,
                                  authorized_from: timeValueToIso(
                                    authorizedFromDrafts[agent.user_id] || "08:00"
                                  ),
                                  authorized_until: timeValueToIso(
                                    authorizedUntilDrafts[agent.user_id],
                                    isAfterLimit(
                                      authorizedFromDrafts[agent.user_id] || "08:00",
                                      authorizedUntilDrafts[agent.user_id] || "18:00"
                                    )
                                      ? 1
                                      : authorizedUntilDrafts[agent.user_id] <
                                          (authorizedFromDrafts[agent.user_id] || "08:00")
                                        ? 1
                                        : 0
                                  ),
                                });
                                setActionLoadingMap((prev) => ({
                                  ...prev,
                                  [agent.user_id]: false,
                                }));
                                if (ok) {
                                  setExpandedMap((prev) => ({
                                    ...prev,
                                    [agent.user_id]: false,
                                  }));
                                }
                              }}
                              disabled={actionLoadingMap[agent.user_id]}
                              className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                                actionLoadingMap[agent.user_id]
                                  ? "bg-[#C9B6E8] cursor-not-allowed"
                                  : "bg-[#5E30A5]"
                              }`}
                            >
                              Autorizar
                            </button>
                          ) : null}
                          <button
                            type="button"
                            onClick={async () => {
                              setActionLoadingMap((prev) => ({
                                ...prev,
                                [agent.user_id]: true,
                              }));
                              await updateAgent(agent.user_id, {
                                authorized_for_work: false,
                                blocked: true,
                              });
                              setActionLoadingMap((prev) => ({
                                ...prev,
                                [agent.user_id]: false,
                              }));
                            }}
                            disabled={actionLoadingMap[agent.user_id]}
                            className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                              actionLoadingMap[agent.user_id]
                                ? "border-red-200 text-red-300 cursor-not-allowed"
                                : "border-red-200 text-red-500"
                            }`}
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

