import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Copy, ClipboardCheck } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import {
  addSupportNote,
  closeSupportThread,
  updateSupportStatus,
} from "../supportClient";
import { SUPPORT_MACROS } from "../data/supportMacros";

export default function SupportTicket() {
  const { threadId } = useParams();
  const [thread, setThread] = useState(null);
  const [events, setEvents] = useState([]);
  const [notes, setNotes] = useState([]);
  const [noteDraft, setNoteDraft] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [closing, setClosing] = useState(false);
  const [resolution, setResolution] = useState("");
  const [rootCause, setRootCause] = useState("");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data: threadData } = await supabase
        .from("support_threads")
        .select("*")
        .eq("public_id", threadId)
        .maybeSingle();
      const { data: eventData } = await supabase
        .from("support_thread_events")
        .select("event_type, actor_role, actor_id, details, created_at")
        .eq("thread_id", threadData?.id ?? "")
        .order("created_at", { ascending: false });
      const { data: noteData } = await supabase
        .from("support_thread_notes")
        .select("id, body, created_at, author_id")
        .eq("thread_id", threadData?.id ?? "")
        .order("created_at", { ascending: false });
      const { data: logData } = await supabase
        .from("support_user_logs")
        .select("level, category, message, created_at")
        .eq("user_id", threadData?.user_id ?? "")
        .order("created_at", { ascending: false })
        .limit(50);
      if (!active) return;
      setThread(threadData);
      setEvents(eventData || []);
      setNotes(noteData || []);
      setLogs(logData || []);
    };
    load();
    return () => {
      active = false;
    };
  }, [threadId]);

  const macros = useMemo(() => {
    if (!thread) return [];
    return SUPPORT_MACROS.filter((macro) => {
      if (macro.status && macro.status !== thread.status) return false;
      if (macro.category && macro.category !== thread.category) return false;
      return true;
    });
  }, [thread]);

  const handleCopy = async (text, id) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleAddNote = async () => {
    if (!noteDraft.trim()) return;
    const result = await addSupportNote({
      thread_public_id: thread.public_id,
      body: noteDraft.trim(),
    });
    if (result.ok) {
      setNotes((prev) => [
        { ...result.data.note, body: noteDraft.trim() },
        ...prev,
      ]);
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
    }
  };

  const handleClose = async () => {
    const result = await closeSupportThread({
      thread_public_id: thread.public_id,
      resolution,
      root_cause: rootCause,
    });
    if (result.ok) {
      setThread((prev) => ({ ...prev, status: "closed", resolution, root_cause: rootCause }));
      setClosing(false);
    }
  };

  if (!thread) {
    return <div className="text-sm text-slate-500">Cargando ticket...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="text-xs uppercase tracking-[0.25em] text-[#5E30A5]/70">
          Ticket {thread.public_id}
        </div>
        <h1 className="text-2xl font-extrabold text-[#2F1A55]">
          {thread.summary || "Detalle de ticket"}
        </h1>
        <p className="text-sm text-slate-500">
          Estado actual: {thread.status}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5 space-y-3">
            <div className="text-sm font-semibold text-[#2F1A55]">Contexto</div>
            <pre className="whitespace-pre-wrap text-xs text-slate-600 bg-[#FAF8FF] rounded-2xl p-3 border border-[#E9E2F7]">
              {JSON.stringify(thread.context || {}, null, 2)}
            </pre>
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
                  <div>{new Date(event.created_at).toLocaleString()}</div>
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
              Logs del usuario
            </div>
            {logs.length === 0 ? (
              <div className="text-xs text-slate-500">
                No hay logs recientes.
              </div>
            ) : (
              <div className="space-y-2 text-xs text-slate-600">
                {logs.map((log, index) => (
                  <div
                    key={`${log.category}-${index}`}
                    className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2"
                  >
                    <div className="text-[11px] text-slate-400">
                      {log.level} • {log.category} •{" "}
                      {new Date(log.created_at).toLocaleString()}
                    </div>
                    <div className="mt-1">{log.message}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5 space-y-4">
            <div className="text-sm font-semibold text-[#2F1A55]">
              Macros sugeridas
            </div>
            <div className="space-y-3">
              {macros.map((macro) => (
                <div
                  key={macro.id}
                  className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-600 space-y-2"
                >
                  <div className="font-semibold text-[#2F1A55]">
                    {macro.title}
                  </div>
                  <div>{macro.body}</div>
                  <button
                    type="button"
                    onClick={() => handleCopy(macro.body, macro.id)}
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
              className="rounded-2xl bg-[#B42318] px-3 py-2 text-xs font-semibold text-white"
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
