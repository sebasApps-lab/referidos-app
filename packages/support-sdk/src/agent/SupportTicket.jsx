import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ChevronDown, ChevronRight, Copy, ClipboardCheck, RefreshCw } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import {
  addSupportNote,
  closeSupportThread,
  trackSupportMacroEvents,
  updateSupportStatus,
} from "../supportClient";
import {
  filterSupportMacrosForThread,
  loadSupportCatalogFromCache,
  normalizeSupportAppKey,
  normalizeSupportEnvKey,
} from "../data/supportCatalog";
import SupportDevDebugBanner from "./SupportDevDebugBanner";

function normalizeThreadRow(thread) {
  if (!thread) return null;
  return {
    ...thread,
    request_origin: thread.request_origin || "registered",
    origin_source: thread.origin_source || "app",
    anon_profile: thread.anon_profile || null,
  };
}

function splitMacroGroupAndTitle(rawTitle) {
  const title = typeof rawTitle === "string" ? rawTitle.trim() : "";
  const fallback = title || "Macro sin titulo";
  const match = fallback.match(/^(.+?)\s*-\s*(.+)$/);
  if (!match) {
    return {
      group: "Varios",
      title: fallback,
    };
  }

  const group = match[1]?.trim();
  const normalizedTitle = match[2]?.trim();
  if (!group || !normalizedTitle) {
    return {
      group: "Varios",
      title: fallback,
    };
  }

  return {
    group,
    title: normalizedTitle,
  };
}

export default function SupportTicket() {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [thread, setThread] = useState(null);
  const [events, setEvents] = useState([]);
  const [notes, setNotes] = useState([]);
  const [noteDraft, setNoteDraft] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [closing, setClosing] = useState(false);
  const [closingRequest, setClosingRequest] = useState(false);
  const [resolution, setResolution] = useState("");
  const [rootCause, setRootCause] = useState("");
  const [logs, setLogs] = useState([]);
  const [catalog, setCatalog] = useState({ categories: [], macros: [] });
  const [catalogLoadError, setCatalogLoadError] = useState("");
  const [refreshingMacros, setRefreshingMacros] = useState(false);
  const [expandedMacroGroups, setExpandedMacroGroups] = useState({});
  const shownTrackerRef = useRef(new Set());

  const formatDateTime = (value) =>
    new Date(value).toLocaleString("es-EC", {
      timeZone: "America/Guayaquil",
    });

  useEffect(() => {
    let active = true;
    const load = async () => {
      const enrichedResult = await supabase
        .from("support_threads")
        .select(
          "*, anon_profile:anon_support_profiles(id, public_id, display_name, contact_channel, contact_value)"
        )
        .eq("public_id", threadId)
        .maybeSingle();

      let threadData = enrichedResult.data || null;
      if (enrichedResult.error) {
        const legacyResult = await supabase
          .from("support_threads")
          .select("*")
          .eq("public_id", threadId)
          .maybeSingle();
        threadData = legacyResult.data || null;
      }

      if (!threadData?.id) {
        if (!active) return;
        setThread(null);
        setEvents([]);
        setNotes([]);
        setLogs([]);
        return;
      }

      const [{ data: eventData }, { data: noteData }] = await Promise.all([
        supabase
          .from("support_thread_events")
          .select("event_type, actor_role, actor_id, details, created_at")
          .eq("thread_id", threadData.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("support_thread_notes")
          .select("id, body, created_at, author_id")
          .eq("thread_id", threadData.id)
          .order("created_at", { ascending: false }),
      ]);

      let logData = [];
      const [threadLogsResponse, userLogsResponse] = await Promise.all([
        threadData.id
          ? supabase
            .from("support_log_events")
            .select("id, level, category, message, occurred_at, created_at, route, screen")
            .eq("thread_id", threadData.id)
            .order("occurred_at", { ascending: false })
            .limit(50)
          : Promise.resolve({ data: [] }),
        threadData.user_id
          ? supabase
            .from("support_log_events")
            .select("id, level, category, message, occurred_at, created_at, route, screen")
            .eq("user_id", threadData.user_id)
            .order("occurred_at", { ascending: false })
            .limit(50)
          : Promise.resolve({ data: [] }),
      ]);

      const mergedLogs = [
        ...(threadLogsResponse?.data || []),
        ...(userLogsResponse?.data || []),
      ];
      if (mergedLogs.length) {
        const deduped = Array.from(
          new Map(mergedLogs.map((logItem) => [logItem.id, logItem])).values()
        );
        deduped.sort((a, b) => {
          const aTs = new Date(a.occurred_at || a.created_at || 0).getTime();
          const bTs = new Date(b.occurred_at || b.created_at || 0).getTime();
          return bTs - aTs;
        });
        logData = deduped.slice(0, 50);
      }

      if (!active) return;
      setThread(normalizeThreadRow(threadData));
      setEvents(eventData || []);
      setNotes(noteData || []);
      setLogs(logData);
    };
    load();
    return () => {
      active = false;
    };
  }, [threadId]);

  const fetchCatalog = useCallback(async ({ forceSync = false } = {}) => {
    let result = await loadSupportCatalogFromCache({ publishedOnly: true });
    let categories = result.categories || [];
    let macros = result.macros || [];
    let cacheError = typeof result.error === "string" ? result.error : "";
    let syncError = "";

    const shouldSync = forceSync || categories.length === 0 || macros.length === 0;
    if (shouldSync) {
      const { data, error } = await supabase.functions.invoke(
        "ops-support-macros-sync-dispatch",
        {
          body: {
            mode: "hot",
            panel_key: "support_ticket",
          },
        }
      );
      if (error) {
        syncError = error.message || "sync_dispatch_failed";
      } else if (data?.ok === false) {
        syncError = data?.detail || data?.error || "sync_dispatch_failed";
      }

      result = await loadSupportCatalogFromCache({ publishedOnly: true });
      categories = result.categories || [];
      macros = result.macros || [];
      cacheError = typeof result.error === "string" ? result.error : cacheError;
    }

    let catalogError = "";
    if (categories.length === 0 && macros.length === 0) {
      if (syncError) {
        catalogError = `No se pudo sincronizar macros desde OPS y el cache runtime esta vacio. Detalle: ${syncError}`;
      } else if (cacheError) {
        catalogError = `No se pudo leer el cache runtime de macros. Detalle: ${cacheError}`;
      } else if (shouldSync) {
        catalogError =
          "El cache runtime de macros sigue vacio despues de sincronizar. Verifica secretos de sync y tenant en runtime.";
      }
    }

    return { categories, macros, catalogError };
  }, []);

  const refreshCatalog = useCallback(
    async ({ forceSync = false } = {}) => {
      setRefreshingMacros(true);
      try {
        const nextCatalog = await fetchCatalog({ forceSync });
        setCatalog({
          categories: nextCatalog.categories || [],
          macros: nextCatalog.macros || [],
        });
        setCatalogLoadError(nextCatalog.catalogError || "");
      } finally {
        setRefreshingMacros(false);
      }
    },
    [fetchCatalog]
  );

  useEffect(() => {
    let active = true;
    setRefreshingMacros(true);
    fetchCatalog({ forceSync: false })
      .then((nextCatalog) => {
        if (!active) return;
        setCatalog({
          categories: nextCatalog.categories || [],
          macros: nextCatalog.macros || [],
        });
        setCatalogLoadError(nextCatalog.catalogError || "");
      })
      .finally(() => {
        if (!active) return;
        setRefreshingMacros(false);
      });

    return () => {
      active = false;
    };
  }, [fetchCatalog, threadId]);

  const runtimeEnvKey = normalizeSupportEnvKey(
    import.meta.env.VITE_ENV || import.meta.env.MODE || "dev",
    "dev"
  );

  const ticketAppKey = useMemo(() => {
    if (!thread) return "referidos_app";
    return normalizeSupportAppKey(
      thread.app_channel || thread.origin_source || "",
      "undetermined"
    );
  }, [thread]);

  const backPath = useMemo(() => {
    if (location.pathname.startsWith("/admin/")) return "/admin/soporte";
    return "/soporte/inbox";
  }, [location.pathname]);
  const debugBanner = import.meta.env.DEV ? (
    <SupportDevDebugBanner
      scope={location.pathname.startsWith("/admin/") ? "admin-ticket" : "support-ticket"}
    />
  ) : null;

  const macros = useMemo(() => {
    return filterSupportMacrosForThread({
      thread,
      macros: catalog.macros,
      categories: catalog.categories,
      runtimeEnvKey,
    });
  }, [catalog.categories, catalog.macros, runtimeEnvKey, thread]);

  const macroGroups = useMemo(() => {
    const grouped = new Map();

    macros.forEach((macro) => {
      const parsed = splitMacroGroupAndTitle(macro.title);
      const key = parsed.group.toLowerCase();
      if (!grouped.has(key)) {
        grouped.set(key, {
          key,
          label: parsed.group,
          items: [],
        });
      }
      grouped.get(key).items.push({
        ...macro,
        displayTitle: parsed.title,
      });
    });

    return Array.from(grouped.values()).sort((a, b) =>
      a.label.localeCompare(b.label, "es", { sensitivity: "base" })
    );
  }, [macros]);

  useEffect(() => {
    setExpandedMacroGroups((previous) => {
      const validKeys = new Set(macroGroups.map((group) => group.key));
      const next = {};
      Object.entries(previous).forEach(([key, isOpen]) => {
        if (validKeys.has(key)) next[key] = isOpen;
      });
      return next;
    });
  }, [macroGroups]);

  const toggleMacroGroup = useCallback((groupKey) => {
    setExpandedMacroGroups((previous) => ({
      ...previous,
      [groupKey]: !previous[groupKey],
    }));
  }, []);

  const hasCatalogData = catalog.categories.length > 0 || catalog.macros.length > 0;

  useEffect(() => {
    shownTrackerRef.current.clear();
  }, [thread?.public_id]);

  useEffect(() => {
    if (!thread?.public_id || !macros.length) return;
    const events = [];

    macros.forEach((macro) => {
      const macroId = typeof macro.id === "string" ? macro.id : "";
      const macroCode = typeof macro.code === "string" ? macro.code : "";
      if (!macroId || !macroCode) return;

      const dedupeKey = `${thread.public_id}:${macroId}:shown`;
      if (shownTrackerRef.current.has(dedupeKey)) return;
      shownTrackerRef.current.add(dedupeKey);

      events.push({
        macro_id: macroId,
        macro_code: macroCode,
        category_code: macro.category_code || "general",
        thread_public_id: thread.public_id,
        event_type: "shown",
        app_key: ticketAppKey,
        env_key: runtimeEnvKey,
        metadata: {
          source: "support_ticket",
        },
      });
    });

    if (!events.length) return;
    trackSupportMacroEvents({ events }).catch(() => {});
  }, [macros, runtimeEnvKey, thread?.public_id, ticketAppKey]);

  const handleCopy = async (macro) => {
    const macroBody = typeof macro?.body === "string" ? macro.body : "";
    const macroId = typeof macro?.id === "string" ? macro.id : "";
    const macroCode = typeof macro?.code === "string" ? macro.code : "";
    if (!macroBody || !macroId || !macroCode) return;

    try {
      await navigator.clipboard.writeText(macroBody);
      setCopiedId(macroId);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      return;
    }

    trackSupportMacroEvents({
      events: [
        {
          macro_id: macroId,
          macro_code: macroCode,
          category_code: macro.category_code || "general",
          thread_public_id: thread?.public_id || null,
          event_type: "copied",
          app_key: ticketAppKey,
          env_key: runtimeEnvKey,
          metadata: {
            source: "support_ticket",
          },
        },
      ],
    }).catch(() => {});
  };

  const handleAddNote = async () => {
    if (!noteDraft.trim()) return;
    const result = await addSupportNote({
      thread_public_id: thread.public_id,
      body: noteDraft.trim(),
    });
    if (result.ok) {
      setNotes((prev) => [{ ...result.data.note, body: noteDraft.trim() }, ...prev]);
      setNoteDraft("");
    }
  };

  const handleStatus = async (status) => {
    const result = await updateSupportStatus({
      thread_public_id: thread.public_id,
      status,
    });
    if (result.ok) {
      setThread((prev) => ({ ...prev, status }));
      await refreshCatalog({ forceSync: true });
    }
  };

  const handleClose = async () => {
    if (closingRequest) return;
    setClosingRequest(true);
    try {
      const result = await closeSupportThread({
        thread_public_id: thread.public_id,
        resolution,
        root_cause: rootCause,
      });
      if (result.ok) {
        setThread((prev) => ({ ...prev, status: "closed", resolution, root_cause: rootCause }));
        setClosing(false);
        await refreshCatalog({ forceSync: true });
      }
    } finally {
      setClosingRequest(false);
    }
  };

  if (!thread) {
    return <div className="text-sm text-slate-500">Cargando ticket...</div>;
  }

  return (
    <div className="space-y-6">
      {debugBanner}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs uppercase tracking-[0.25em] text-[#5E30A5]/70">
            Ticket {thread.public_id}
          </div>
          <button
            type="button"
            onClick={() => navigate(backPath)}
            className="rounded-full border border-[#E9E2F7] px-3 py-1 text-xs font-semibold text-slate-600"
          >
            Volver
          </button>
        </div>
        <h1 className="text-2xl font-extrabold text-[#2F1A55]">
          {thread.summary || "Detalle de ticket"}
        </h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <span>Estado actual: {thread.status}</span>
          <span
            className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
              thread.request_origin === "anonymous"
                ? "bg-[#FFF7E6] text-[#B46B00]"
                : "bg-[#EAF7F0] text-[#1B7F4B]"
            }`}
          >
            {thread.request_origin === "anonymous" ? "Anonimo" : "Registrado"}
          </span>
          {thread.origin_source ? (
            <span className="rounded-full bg-[#F0EBFF] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5E30A5]">
              {thread.origin_source}
            </span>
          ) : null}
          <span className="rounded-full bg-[#EAF4FF] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0D4F9A]">
            app: {ticketAppKey}
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5 space-y-3">
            <div className="text-sm font-semibold text-[#2F1A55]">Contexto</div>
            <pre className="whitespace-pre-wrap text-xs text-slate-600 bg-[#FAF8FF] rounded-2xl p-3 border border-[#E9E2F7]">
              {JSON.stringify(thread.context || {}, null, 2)}
            </pre>
            {thread.request_origin === "anonymous" && thread.anon_profile ? (
              <div className="rounded-2xl border border-[#F5E1B5] bg-[#FFF9ED] p-3 text-xs text-[#8A5A00] space-y-1">
                <div>
                  Perfil anonimo: {thread.anon_profile.public_id}
                </div>
                {thread.anon_profile.display_name ? (
                  <div>Nombre: {thread.anon_profile.display_name}</div>
                ) : null}
                <div>
                  Canal: {thread.anon_profile.contact_channel || "N/A"}
                </div>
                <div>
                  Contacto: {thread.anon_profile.contact_value || "N/A"}
                </div>
              </div>
            ) : null}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleStatus("in_progress")}
                className="rounded-full bg-[#5E30A5] px-3 py-1 text-xs font-semibold text-white"
              >
                En progreso
              </button>
              <button
                type="button"
                onClick={() => handleStatus("waiting_user")}
                className="rounded-full border border-[#5E30A5] px-3 py-1 text-xs font-semibold text-[#5E30A5]"
              >
                Esperando usuario
              </button>
              <button
                type="button"
                onClick={() => handleStatus("queued")}
                className="rounded-full border border-[#E9E2F7] px-3 py-1 text-xs font-semibold text-slate-600"
              >
                Liberar a cola
              </button>
              <button
                type="button"
                onClick={() => setClosing(true)}
                className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-500"
              >
                Cerrar caso
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5 space-y-4">
            <div className="text-sm font-semibold text-[#2F1A55]">
              Timeline
            </div>
            <div className="space-y-3 text-xs text-slate-500">
              {events.map((event, index) => (
                <div
                  key={`${event.event_type}-${index}`}
                  className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2"
                >
                  <div className="text-[#2F1A55] font-semibold">
                    {event.event_type}
                  </div>
                  <div>{formatDateTime(event.created_at)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5 space-y-4">
            <div className="text-sm font-semibold text-[#2F1A55]">Notas internas</div>
            <textarea
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              placeholder="Escribe una nota interna"
              className="w-full rounded-2xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-600 outline-none focus:border-[#5E30A5]"
              rows={3}
            />
            <button
              type="button"
              onClick={handleAddNote}
              className="rounded-2xl bg-[#5E30A5] px-4 py-2 text-xs font-semibold text-white"
            >
              Guardar nota
            </button>
            <div className="space-y-2">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-600"
                >
                  {note.body}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5 space-y-4">
            <div className="text-sm font-semibold text-[#2F1A55]">
              Logs de soporte
            </div>
            {logs.length === 0 ? (
              <div className="text-xs text-slate-500">
                No hay logs recientes.
              </div>
            ) : (
              <div className="space-y-2 text-xs text-slate-600">
                {logs.map((log, index) => (
                  <div
                    key={`${log.id || log.category}-${index}`}
                    className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2"
                  >
                    <div className="text-[11px] text-slate-400">
                      {log.level} - {log.category} -{" "}
                      {formatDateTime(log.occurred_at || log.created_at)}
                    </div>
                    <div className="mt-1">{log.message}</div>
                    {log.route || log.screen ? (
                      <div className="mt-1 text-[11px] text-slate-400">
                        {log.route ? `Ruta: ${log.route}` : null}
                        {log.route && log.screen ? " | " : null}
                        {log.screen ? `Pantalla: ${log.screen}` : null}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm font-semibold text-[#2F1A55]">
                Macros sugeridas
              </div>
              <button
                type="button"
                onClick={() => {
                  void refreshCatalog({ forceSync: true });
                }}
                disabled={refreshingMacros}
                className="inline-flex items-center gap-1 rounded-full border border-[#E9E2F7] px-2.5 py-1 text-[11px] font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw size={12} className={refreshingMacros ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>
            <div className="space-y-3">
              {catalogLoadError && !hasCatalogData ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                  {catalogLoadError}
                </div>
              ) : macros.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-500">
                  No hay macros publicadas para este estado/app.
                </div>
              ) : (
                macroGroups.map((group) => {
                  const isOpen = Boolean(expandedMacroGroups[group.key]);
                  return (
                    <div
                      key={group.key}
                      className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2"
                    >
                      <button
                        type="button"
                        onClick={() => toggleMacroGroup(group.key)}
                        className="flex w-full items-center justify-between gap-2 text-left"
                      >
                        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2F1A55]">
                          {group.label}
                        </div>
                        <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                          <span>{group.items.length}</span>
                          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </div>
                      </button>

                      {isOpen ? (
                        <div className="mt-2 space-y-2">
                          {group.items.map((macro) => (
                            <div
                              key={macro.id}
                              className="rounded-2xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs text-slate-600 space-y-2"
                            >
                              <div className="font-semibold text-[#2F1A55]">
                                {macro.displayTitle || macro.title}
                              </div>
                              <div>{macro.body}</div>
                              <button
                                type="button"
                                onClick={() => handleCopy(macro)}
                                className="inline-flex items-center gap-2 text-xs font-semibold text-[#5E30A5]"
                              >
                                {copiedId === macro.id ? (
                                  <>
                                    <ClipboardCheck size={14} /> Copiado
                                  </>
                                ) : (
                                  <>
                                    <Copy size={14} /> Copiar
                                  </>
                                )}
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {closing ? (
        <div className="rounded-3xl border border-[#F9C9C9] bg-[#FFF5F5] p-5 space-y-3">
          <div className="text-sm font-semibold text-[#B42318]">
            Cerrar ticket
          </div>
          <input
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            placeholder="Resolucion"
            className="w-full rounded-2xl border border-[#F9C9C9] bg-white px-3 py-2 text-xs text-slate-600 outline-none"
          />
          <input
            value={rootCause}
            onChange={(e) => setRootCause(e.target.value)}
            placeholder="Causa raiz (opcional)"
            className="w-full rounded-2xl border border-[#F9C9C9] bg-white px-3 py-2 text-xs text-slate-600 outline-none"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={closingRequest}
              className="rounded-2xl bg-[#B42318] px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              Confirmar cierre
            </button>
            <button
              type="button"
              onClick={() => setClosing(false)}
              className="rounded-2xl border border-[#F9C9C9] px-3 py-2 text-xs font-semibold text-[#B42318]"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
