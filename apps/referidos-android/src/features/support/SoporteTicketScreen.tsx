import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { STACK_ROUTES, TAB_ROUTES } from "@navigation/routeKeys";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { mobileApi, observability, supabase } from "@shared/services/mobileApi";
import { useAppStore } from "@shared/store/appStore";
import { useSupportDeskStore } from "@shared/store/supportDeskStore";
import {
  fetchSupportLogEvents,
  fetchSupportThreadDetail,
  fetchSupportThreadEvents,
  fetchSupportThreadNotes,
} from "@shared/services/supportDeskQueries";
import { formatDateTime } from "@shared/services/entityQueries";
import {
  filterSupportMacrosForThread,
  loadSupportCatalogFromCache,
  normalizeSupportEnvKey,
} from "@shared/services/supportCatalog";
import { dispatchSupportMacrosSync } from "@shared/services/supportOps";

const FLOW = {
  START: "screen_1_starting_intro",
  GUIDE: "screen_2_whatsapp_guide",
  OPENING: "screen_3_opening_message",
  OPENING_WAIT: "screen_4_opening_followup",
  ACTIVE: "screen_5_resolution_active",
  ACTIVE_WAIT: "screen_6_resolution_followup",
  CLOSING: "screen_7_closing_prepare",
  CLOSING_WAIT: "screen_8_closing_wait",
  CONFIRM: "screen_9_closing_confirm",
  ISSUE: "screen_10_new_issue_decision",
  ISSUE_INFO: "screen_11_new_issue_info",
} as const;

const WAIT_MS = 10 * 60 * 1000;

function pickFirstString(...values: any[]) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number") return String(value);
  }
  return "";
}

function asRecord(value: any) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function latestAction(events: any[], action: string) {
  return (events || []).find(
    (event) => String(asRecord(event?.details).action || "").trim().toLowerCase() === action,
  );
}

function initialFlow(thread: any, events: any[]) {
  const openingSentAt = pickFirstString(thread?.opening_message_sent_at);
  const resetAt = pickFirstString(latestAction(events, "opening_message_reset")?.created_at);
  const whatsappDone = (events || []).some(
    (event) =>
      String(event?.event_type || "").toLowerCase() === "status_changed" &&
      String(asRecord(event?.details).action || "").toLowerCase() === "whatsapp_name_changed",
  );
  const hasOpening = Boolean(openingSentAt) &&
    !(resetAt && new Date(resetAt).getTime() > new Date(openingSentAt).getTime());
  if (thread?.status === "closed" || thread?.status === "cancelled") return FLOW.ACTIVE;
  if (!whatsappDone) return FLOW.START;
  if (!hasOpening) return FLOW.OPENING;
  if (thread?.status === "closing") {
    return latestAction(events, "closing_message_sent") ? FLOW.CLOSING_WAIT : FLOW.CLOSING;
  }
  if (thread?.status === "waiting_user" || thread?.status === "queued") return FLOW.ACTIVE_WAIT;
  return FLOW.ACTIVE;
}

function statusLabel(value: any) {
  const labels: Record<string, string> = {
    new: "Nuevo",
    starting: "Empezando",
    assigned: "Asignado",
    in_progress: "Resolviendo",
    waiting_user: "Esperando usuario",
    queued: "En cola",
    closing: "Cerrando",
    closed: "Cerrado",
    cancelled: "Cancelado",
  };
  return labels[String(value || "").trim().toLowerCase()] || String(value || "sin estado");
}

function formatClock(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function SoporteTicketScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const role = useAppStore((state) => state.role);
  const selectedThreadPublicId = useSupportDeskStore((state) => state.selectedThreadPublicId);
  const setSelectedThreadPublicId = useSupportDeskStore((state) => state.setSelectedThreadPublicId);
  const shownRef = useRef(new Set<string>());
  const runtimeEnvKey = useMemo(() => normalizeSupportEnvKey(__DEV__ ? "dev" : "prod", "dev"), []);
  const routeThreadPublicId = String(route?.params?.threadPublicId || "").trim();
  const isAdminTicketRoute =
    role === "admin" || String(route?.name || "") === STACK_ROUTES.ADMIN.SUPPORT_TICKET;
  const [threadIdInput, setThreadIdInput] = useState(selectedThreadPublicId || "");
  const [loading, setLoading] = useState(false);
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [error, setError] = useState("");
  const [catalogError, setCatalogError] = useState("");
  const [thread, setThread] = useState<any | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [catalog, setCatalog] = useState({ categories: [] as any[], macros: [] as any[] });
  const [flow, setFlow] = useState<string>(FLOW.START);
  const [activeMacro, setActiveMacro] = useState<any | null>(null);
  const [noteDraft, setNoteDraft] = useState("");
  const [closingComment, setClosingComment] = useState("");
  const [issueReason, setIssueReason] = useState("");
  const [issueCategory, setIssueCategory] = useState("");
  const [closingSentAt, setClosingSentAt] = useState("");
  const [busy, setBusy] = useState(false);
  const [nowMs, setNowMs] = useState(Date.now());

  const loadCatalog = useCallback(async (forceSync = false) => {
    setCatalogLoading(true);
    let result = await loadSupportCatalogFromCache({ publishedOnly: true });
    if (forceSync || result.categories.length === 0 || result.macros.length === 0) {
      try {
        await dispatchSupportMacrosSync({ mode: "hot", panelKey: "android_support_ticket" });
      } catch (syncErr: any) {
        setCatalogError(String(syncErr?.message || syncErr || "sync_dispatch_failed"));
      }
      result = await loadSupportCatalogFromCache({ publishedOnly: true });
    }
    setCatalog({
      categories: result.categories || [],
      macros: result.macros || [],
    });
    if (!result.categories.length && !result.macros.length && result.error) {
      setCatalogError(String(result.error));
    }
    setCatalogLoading(false);
  }, []);

  const loadThread = useCallback(async (forcedId?: string) => {
    const nextId = String(forcedId || threadIdInput || selectedThreadPublicId || "").trim();
    if (!nextId) {
      setError("Ingresa o selecciona un ticket para cargar detalle.");
      return;
    }
    setLoading(true);
    setError("");
    const detail = await fetchSupportThreadDetail(supabase, nextId);
    if (!detail.ok || !detail.data) {
      setThread(null);
      setEvents([]);
      setNotes([]);
      setLogs([]);
      setError(detail.error || "No se pudo cargar el ticket.");
      setLoading(false);
      return;
    }
    const nextThread = detail.data;
    const [eventsResult, notesResult, logsResult] = await Promise.all([
      fetchSupportThreadEvents(supabase, String(nextThread.id || "")),
      fetchSupportThreadNotes(supabase, String(nextThread.id || "")),
      fetchSupportLogEvents(supabase, {
        threadId: String(nextThread.id || ""),
        userId: String(nextThread.user_id || ""),
        limit: 60,
      }),
    ]);
    const nextEvents = eventsResult.ok ? eventsResult.data : [];
    setThread(nextThread);
    setThreadIdInput(String(nextThread.public_id || nextId));
    setSelectedThreadPublicId(String(nextThread.public_id || nextId));
    setEvents(nextEvents);
    setNotes(notesResult.ok ? notesResult.data : []);
    setLogs(logsResult.ok ? logsResult.data : []);
    setFlow(initialFlow(nextThread, nextEvents));
    setActiveMacro(null);
    setClosingComment("");
    setIssueReason("");
    setIssueCategory(String(nextThread.category || ""));
    setClosingSentAt(pickFirstString(latestAction(nextEvents, "closing_message_sent")?.created_at));
    shownRef.current.clear();
    setLoading(false);
  }, [selectedThreadPublicId, setSelectedThreadPublicId, threadIdInput]);

  useEffect(() => {
    void loadCatalog(false);
  }, [loadCatalog]);

  useEffect(() => {
    if (!routeThreadPublicId) return;
    setThreadIdInput(routeThreadPublicId);
    setSelectedThreadPublicId(routeThreadPublicId);
    void loadThread(routeThreadPublicId);
  }, [loadThread, routeThreadPublicId, setSelectedThreadPublicId]);

  useEffect(() => {
    if (!selectedThreadPublicId) return;
    setThreadIdInput(selectedThreadPublicId);
    void loadThread(selectedThreadPublicId);
  }, [loadThread, selectedThreadPublicId]);

  useEffect(() => {
    const timer = globalThis.setInterval(() => setNowMs(Date.now()), 1000);
    return () => globalThis.clearInterval(timer);
  }, []);

  const macroThread = useMemo(() => {
    if (!thread) return null;
    const status =
      flow === FLOW.OPENING || flow === FLOW.OPENING_WAIT
        ? "starting"
        : flow === FLOW.CLOSING || flow === FLOW.CLOSING_WAIT || flow === FLOW.CONFIRM
          ? "closing"
          : flow === FLOW.ACTIVE_WAIT
            ? ["waiting_user", "queued"].includes(String(thread.status || "")) ? thread.status : "in_progress"
            : ["new", "starting", "assigned"].includes(flow)
              ? String(thread.status || "new")
              : "in_progress";
    return {
      ...thread,
      status,
      category: flow === FLOW.ISSUE || flow === FLOW.ISSUE_INFO ? issueCategory || thread.category : thread.category,
    };
  }, [flow, issueCategory, thread]);

  const macros = useMemo(() => {
    if (!macroThread) return [];
    return filterSupportMacrosForThread({
      thread: macroThread,
      macros: catalog.macros,
      categories: catalog.categories,
      runtimeEnvKey,
    });
  }, [catalog.categories, catalog.macros, macroThread, runtimeEnvKey]);

  const selectedMacro = activeMacro || macros[0] || null;
  const remainingMs = closingSentAt ? Math.max(0, WAIT_MS - (nowMs - new Date(closingSentAt).getTime())) : WAIT_MS;
  const backRoute = isAdminTicketRoute
    ? STACK_ROUTES.ADMIN.SUPPORT_TICKETS_PANEL
    : TAB_ROUTES.SOPORTE.INBOX;
  const auxRoute = isAdminTicketRoute
    ? TAB_ROUTES.ADMIN.SOPORTE
    : STACK_ROUTES.SOPORTE.JORNADAS;

  useEffect(() => {
    if (!thread?.public_id || !macros.length) return;
    const payload = macros
      .map((macro) => {
        const id = String(macro?.id || "");
        const code = String(macro?.code || "");
        if (!id || !code) return null;
        const key = `${thread.public_id}:${id}`;
        if (shownRef.current.has(key)) return null;
        shownRef.current.add(key);
        return {
          macro_id: id,
          macro_code: code,
          category_code: macro.category_code || "general",
          thread_public_id: thread.public_id,
          event_type: "shown",
          app_key: "android_app",
          env_key: runtimeEnvKey,
          metadata: { source: "android_support_ticket" },
        };
      })
      .filter(Boolean);
    if (payload.length) {
      void mobileApi.support.trackMacroEvents({ events: payload }).catch(() => {});
    }
  }, [macros, runtimeEnvKey, thread?.public_id]);

  const runAction = useCallback(async (fn: () => Promise<void>) => {
    setBusy(true);
    try {
      await fn();
    } finally {
      setBusy(false);
    }
  }, []);

  const persistWorkflow = useCallback(async (action: string, payload: Record<string, any> = {}) => {
    return mobileApi.support.workflowAction({
      thread_public_id: thread?.public_id,
      action,
      payload: { ...payload, flow_screen: flow },
    });
  }, [flow, thread?.public_id]);

  const setStatus = useCallback(async (status: string) => {
    const result = await mobileApi.support.updateStatus({
      thread_public_id: thread?.public_id,
      status,
    });
    if (!result?.ok) throw new Error(result?.error || "status_update_failed");
    setThread((current: any) => current ? { ...current, ...(result?.data?.thread || {}), status } : current);
  }, [thread?.public_id]);

  const useMacro = useCallback(async (macro: any) => {
    setActiveMacro(macro);
    const id = String(macro?.id || "");
    const code = String(macro?.code || "");
    if (!id || !code || !thread?.public_id) return;
    await mobileApi.support.trackMacroEvents({
      events: [{
        macro_id: id,
        macro_code: code,
        category_code: macro.category_code || "general",
        thread_public_id: thread.public_id,
        event_type: "copied",
        app_key: "android_app",
        env_key: runtimeEnvKey,
        metadata: { source: "android_support_ticket", flow_screen: flow },
      }],
    }).catch(() => {});
  }, [flow, runtimeEnvKey, thread?.public_id]);

  const addNote = useCallback(async () => {
    const body = noteDraft.trim();
    if (!body) throw new Error("La nota no puede estar vacia.");
    const result = await mobileApi.support.addNote({ thread_public_id: thread?.public_id, body });
    if (!result?.ok) throw new Error(result?.error || "note_failed");
    setNoteDraft("");
    const nextNotes = await fetchSupportThreadNotes(supabase, String(thread?.id || ""));
    if (nextNotes.ok) setNotes(nextNotes.data);
    await observability.track({
      level: "info",
      category: "audit",
      message: "support_note_added",
      context: { thread_public_id: thread?.public_id },
    });
  }, [noteDraft, thread?.id, thread?.public_id]);

  if (loading) {
    return (
      <ScreenScaffold title="Soporte Ticket" subtitle="Flujo guiado, macros runtime y control operativo">
        <BlockSkeleton lines={10} />
      </ScreenScaffold>
    );
  }

  return (
    <ScreenScaffold title="Soporte Ticket" subtitle="Flujo guiado, macros runtime y control operativo">
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard title="Buscar ticket">
          <TextInput value={threadIdInput} onChangeText={setThreadIdInput} style={styles.input} placeholder="Public ID del ticket" autoCapitalize="characters" />
          <View style={styles.row}>
            <Pressable onPress={() => void loadThread()} style={styles.primaryBtn}><Text style={styles.primaryBtnText}>Cargar ticket</Text></Pressable>
            <Pressable onPress={() => navigation.navigate(backRoute)} style={styles.secondaryBtn}><Text style={styles.secondaryBtnText}>{isAdminTicketRoute ? "Volver panel" : "Volver inbox"}</Text></Pressable>
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </SectionCard>

        {thread ? (
          <>
            <SectionCard title={`Ticket ${String(thread.public_id || "-")}`} subtitle={statusLabel(thread.status)}>
              <Text style={styles.titleText}>{String(thread.summary || "Sin resumen")}</Text>
              <Text style={styles.metaText}>Categoria: {String(thread.category || "-")} | Severidad: {String(thread.severity || "s2")}</Text>
              <Text style={styles.metaText}>Usuario: {thread.request_origin === "anonymous" ? pickFirstString(thread?.anon_public_id, thread?.user_public_id, "anon") : pickFirstString(thread?.user_public_id, "usuario")}</Text>
              <Text style={styles.metaText}>Creado: {formatDateTime(thread.created_at || null)} | Actualizado: {formatDateTime(thread.updated_at || thread.created_at || null)}</Text>
            </SectionCard>

            <SectionCard title={flow === FLOW.CLOSING_WAIT ? `Espera cierre (${formatClock(remainingMs)})` : "Flujo guiado"}>
              <Text style={styles.bodyText}>
                {flow === FLOW.START && "Revisa el ticket y comienza el flujo operativo."}
                {flow === FLOW.GUIDE && "Confirma el cambio de nombre en WhatsApp antes de escribir."}
                {flow === FLOW.OPENING && "Usa una macro de apertura y registra el primer mensaje."}
                {flow === FLOW.OPENING_WAIT && "Espera respuesta inicial o reabre la apertura."}
                {flow === FLOW.ACTIVE && "Resuelve el caso y registra los mensajes enviados."}
                {flow === FLOW.ACTIVE_WAIT && "El ticket está en espera o en cola. Retómalo cuando el usuario responda."}
                {flow === FLOW.CLOSING && "Envía el mensaje de cierre antes de confirmar."}
                {flow === FLOW.CLOSING_WAIT && "Espera la ventana mínima antes de confirmar cierre."}
                {flow === FLOW.CONFIRM && "Deja comentario obligatorio y cierra el ticket."}
                {flow === FLOW.ISSUE && "Define si es nueva inquietud o continuidad del mismo caso."}
                {flow === FLOW.ISSUE_INFO && "Pide la información adicional y vuelve a resolución."}
              </Text>
              {selectedMacro ? (
                <View style={styles.focusCard}>
                  <Text style={styles.focusTitle}>{String(selectedMacro.title || "Macro")}</Text>
                  <Text style={styles.bodyText}>{String(selectedMacro.body || "")}</Text>
                </View>
              ) : null}
              {flow === FLOW.CONFIRM ? (
                <TextInput value={closingComment} onChangeText={setClosingComment} style={[styles.input, styles.textArea]} placeholder="Comentario final de cierre" multiline numberOfLines={3} textAlignVertical="top" />
              ) : null}
              {flow === FLOW.ISSUE ? (
                <>
                  <TextInput value={issueReason} onChangeText={setIssueReason} style={[styles.input, styles.textArea]} placeholder="Razón para continuar" multiline numberOfLines={3} textAlignVertical="top" />
                  <TextInput value={issueCategory} onChangeText={setIssueCategory} style={styles.input} placeholder="Categoría" />
                </>
              ) : null}
              <View style={styles.row}>
                {flow === FLOW.START ? <Pressable disabled={busy} onPress={() => setFlow(FLOW.GUIDE)} style={styles.primaryBtn}><Text style={styles.primaryBtnText}>Empezar</Text></Pressable> : null}
                {flow === FLOW.GUIDE ? <Pressable disabled={busy} onPress={() => void runAction(async () => { const result = await mobileApi.support.markWhatsAppNameChanged({ thread_public_id: thread.public_id, target_label: pickFirstString(thread?.user_public_id, thread?.anon_public_id, "ticket") }); if (!result?.ok) throw new Error(result?.error || "whatsapp_failed"); setFlow(FLOW.OPENING); })} style={styles.primaryBtn}><Text style={styles.primaryBtnText}>Ya cambié el nombre</Text></Pressable> : null}
                {flow === FLOW.OPENING ? <Pressable disabled={busy} onPress={() => void runAction(async () => { const result = await mobileApi.support.markOpeningMessageSent({ thread_public_id: thread.public_id }); if (!result?.ok) throw new Error(result?.error || "opening_failed"); await setStatus("in_progress"); setFlow(FLOW.OPENING_WAIT); })} style={styles.primaryBtn}><Text style={styles.primaryBtnText}>Ya envié apertura</Text></Pressable> : null}
                {flow === FLOW.OPENING_WAIT ? <Pressable disabled={busy} onPress={() => setFlow(FLOW.ACTIVE)} style={styles.primaryBtn}><Text style={styles.primaryBtnText}>Usuario respondió</Text></Pressable> : null}
                {flow === FLOW.OPENING_WAIT ? <Pressable disabled={busy} onPress={() => void runAction(async () => { const response = await persistWorkflow("opening_message_reset"); if (!response?.ok) throw new Error(response?.error || "opening_reset_failed"); setThread((current: any) => current ? { ...current, opening_message_sent_at: null } : current); setFlow(FLOW.OPENING); })} style={styles.secondaryBtn}><Text style={styles.secondaryBtnText}>Reabrir apertura</Text></Pressable> : null}
                {flow === FLOW.ACTIVE ? <Pressable disabled={busy} onPress={() => void runAction(async () => { const response = await persistWorkflow("resolution_message_sent"); if (!response?.ok) throw new Error(response?.error || "resolution_message_failed"); setFlow(FLOW.ACTIVE_WAIT); })} style={styles.primaryBtn}><Text style={styles.primaryBtnText}>Mensaje enviado</Text></Pressable> : null}
                {flow === FLOW.ACTIVE ? <Pressable disabled={busy} onPress={() => void runAction(async () => { await setStatus("closing"); setFlow(FLOW.CLOSING); })} style={styles.warningBtn}><Text style={styles.warningBtnText}>Marcar resuelto</Text></Pressable> : null}
                {flow === FLOW.ACTIVE_WAIT ? <Pressable disabled={busy} onPress={() => void runAction(async () => { if (["waiting_user", "queued"].includes(String(thread.status || ""))) await setStatus("in_progress"); setFlow(FLOW.ACTIVE); })} style={styles.primaryBtn}><Text style={styles.primaryBtnText}>Usuario respondió</Text></Pressable> : null}
                {flow === FLOW.CLOSING ? <Pressable disabled={busy} onPress={() => void runAction(async () => { const response = await persistWorkflow("closing_message_sent"); if (!response?.ok) throw new Error(response?.error || "closing_message_failed"); const at = pickFirstString(response?.data?.event_at, new Date().toISOString()); setClosingSentAt(at); setFlow(FLOW.CLOSING_WAIT); })} style={styles.primaryBtn}><Text style={styles.primaryBtnText}>Mensaje de cierre enviado</Text></Pressable> : null}
                {flow === FLOW.CLOSING ? <Pressable disabled={busy} onPress={() => void runAction(async () => { await setStatus("in_progress"); setFlow(FLOW.ACTIVE); })} style={styles.secondaryBtn}><Text style={styles.secondaryBtnText}>Continuar resolución</Text></Pressable> : null}
                {flow === FLOW.CLOSING_WAIT ? <Pressable disabled={busy} onPress={() => void runAction(async () => { await setStatus("in_progress"); setFlow(FLOW.ISSUE); })} style={styles.secondaryBtn}><Text style={styles.secondaryBtnText}>Continuar resolución</Text></Pressable> : null}
                {flow === FLOW.CLOSING_WAIT ? <Pressable disabled={busy || remainingMs > 0} onPress={() => setFlow(FLOW.CONFIRM)} style={[styles.primaryBtn, (busy || remainingMs > 0) && styles.btnDisabled]}><Text style={styles.primaryBtnText}>Confirmar cierre</Text></Pressable> : null}
                {flow === FLOW.CONFIRM ? <Pressable disabled={busy} onPress={() => void runAction(async () => { if (!closingComment.trim()) throw new Error("Debes ingresar comentario de cierre."); const response = await persistWorkflow("close_outcome", { outcome: "user_confirmed", comment: closingComment.trim() }); if (!response?.ok) throw new Error(response?.error || "close_outcome_failed"); const close = await mobileApi.support.closeThread({ thread_public_id: thread.public_id, resolution: closingComment.trim(), root_cause: "user_confirmed" }); if (!close?.ok) throw new Error(close?.error || "close_failed"); setThread((current: any) => current ? { ...current, ...(close?.data?.thread || {}), status: "closed" } : current); setFlow(FLOW.ACTIVE); })} style={styles.primaryBtn}><Text style={styles.primaryBtnText}>Usuario confirma</Text></Pressable> : null}
                {flow === FLOW.CONFIRM ? <Pressable disabled={busy} onPress={() => void runAction(async () => { if (!closingComment.trim()) throw new Error("Debes ingresar comentario de cierre."); const response = await persistWorkflow("close_outcome", { outcome: "inactive_close", comment: closingComment.trim() }); if (!response?.ok) throw new Error(response?.error || "inactive_close_failed"); const close = await mobileApi.support.closeThread({ thread_public_id: thread.public_id, resolution: closingComment.trim(), root_cause: "inactive_close" }); if (!close?.ok) throw new Error(close?.error || "close_failed"); setThread((current: any) => current ? { ...current, ...(close?.data?.thread || {}), status: "closed" } : current); setFlow(FLOW.ACTIVE); })} style={styles.warningBtn}><Text style={styles.warningBtnText}>Cierre por inactividad</Text></Pressable> : null}
                {flow === FLOW.CONFIRM ? <Pressable disabled={busy} onPress={() => void runAction(async () => { await setStatus("in_progress"); setFlow(FLOW.ISSUE); })} style={styles.secondaryBtn}><Text style={styles.secondaryBtnText}>Continuar resolución</Text></Pressable> : null}
                {flow === FLOW.ISSUE ? <Pressable disabled={busy} onPress={() => void runAction(async () => { if (!issueReason.trim()) throw new Error("Debes registrar la razón."); const response = await persistWorkflow("issue_context_set", { mode: "new_issue", reason: issueReason.trim(), category: issueCategory || thread.category || null }); if (!response?.ok) throw new Error(response?.error || "issue_context_failed"); setFlow(FLOW.ISSUE_INFO); })} style={styles.primaryBtn}><Text style={styles.primaryBtnText}>Nueva inquietud</Text></Pressable> : null}
                {flow === FLOW.ISSUE ? <Pressable disabled={busy} onPress={() => void runAction(async () => { if (!issueReason.trim()) throw new Error("Debes registrar la razón."); const response = await persistWorkflow("issue_context_set", { mode: "same_issue", reason: issueReason.trim(), category: issueCategory || thread.category || null }); if (!response?.ok) throw new Error(response?.error || "issue_context_failed"); setFlow(FLOW.ISSUE_INFO); })} style={styles.secondaryBtn}><Text style={styles.secondaryBtnText}>Misma inquietud</Text></Pressable> : null}
                {flow === FLOW.ISSUE_INFO ? <Pressable disabled={busy} onPress={() => void runAction(async () => { const response = await persistWorkflow("info_message_sent", { reason: issueReason.trim(), category: issueCategory || thread.category || null }); if (!response?.ok) throw new Error(response?.error || "info_message_failed"); setFlow(FLOW.ACTIVE); })} style={styles.primaryBtn}><Text style={styles.primaryBtnText}>Mensaje de info enviado</Text></Pressable> : null}
                <Pressable disabled={busy} onPress={() => void runAction(async () => { await setStatus("in_progress"); })} style={styles.outlineBtn}><Text style={styles.outlineBtnText}>En progreso</Text></Pressable>
                <Pressable disabled={busy} onPress={() => void runAction(async () => { await setStatus("waiting_user"); setFlow(FLOW.ACTIVE_WAIT); })} style={styles.outlineBtn}><Text style={styles.outlineBtnText}>Esperando usuario</Text></Pressable>
                <Pressable disabled={busy} onPress={() => void runAction(async () => { await setStatus("queued"); setFlow(FLOW.ACTIVE_WAIT); })} style={styles.outlineBtn}><Text style={styles.outlineBtnText}>Liberar a cola</Text></Pressable>
                <Pressable onPress={() => navigation.navigate(auxRoute)} style={styles.outlineBtn}><Text style={styles.outlineBtnText}>{isAdminTicketRoute ? "Desk admin" : "Jornadas"}</Text></Pressable>
              </View>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </SectionCard>

            <SectionCard title="Macros sugeridas" subtitle={`Disponibles: ${macros.length}`} right={<Pressable onPress={() => void loadCatalog(true)} style={styles.secondaryBtn}><Text style={styles.secondaryBtnText}>{catalogLoading ? "..." : "Refresh"}</Text></Pressable>}>
              {catalogError ? <Text style={styles.errorText}>{catalogError}</Text> : null}
              {!macros.length ? <Text style={styles.metaText}>No hay macros publicadas para este estado/app.</Text> : null}
              {macros.map((macro) => (
                <View key={String(macro?.id || macro?.code)} style={styles.card}>
                  <Text style={styles.cardTitle}>{String(macro?.title || "Macro")}</Text>
                  <Text style={styles.bodyText} numberOfLines={3}>{String(macro?.body || "")}</Text>
                  <View style={styles.row}>
                    <Pressable onPress={() => void useMacro(macro)} style={styles.secondaryBtn}><Text style={styles.secondaryBtnText}>Usar macro</Text></Pressable>
                    <Pressable onPress={() => setNoteDraft(String(macro?.body || ""))} style={styles.outlineBtn}><Text style={styles.outlineBtnText}>Usar en nota</Text></Pressable>
                  </View>
                </View>
              ))}
            </SectionCard>

            <SectionCard title="Notas internas">
              <TextInput value={noteDraft} onChangeText={setNoteDraft} style={[styles.input, styles.textArea]} placeholder="Escribe una nota interna" multiline numberOfLines={3} textAlignVertical="top" />
              <Pressable disabled={busy} onPress={() => void runAction(addNote)} style={styles.primaryBtn}><Text style={styles.primaryBtnText}>Guardar nota</Text></Pressable>
              {notes.map((note, index) => (
                <View key={`${String(note?.id || index)}-${index}`} style={styles.card}>
                  <Text style={styles.bodyText}>{String(note?.body || "")}</Text>
                  <Text style={styles.metaText}>{formatDateTime(note?.created_at || null)}</Text>
                </View>
              ))}
            </SectionCard>

            <SectionCard title="Timeline">
              {events.map((event, index) => (
                <View key={`${String(event?.id || index)}-${index}`} style={styles.card}>
                  <Text style={styles.cardTitle}>{String(event?.event_type || "evento")}</Text>
                  <Text style={styles.metaText}>actor: {String(event?.actor_role || "n/a")} | {formatDateTime(event?.created_at || null)}</Text>
                  {Object.keys(asRecord(event?.details)).length ? <Text style={styles.bodyText}>{JSON.stringify(event.details)}</Text> : null}
                </View>
              ))}
            </SectionCard>

            <SectionCard title="Logs soporte">
              {logs.map((log, index) => (
                <View key={`${String(log?.id || index)}-${index}`} style={styles.card}>
                  <Text style={styles.metaText}>{String(log?.level || "info")} | {String(log?.category || "log")} | {formatDateTime(log?.occurred_at || log?.created_at || null)}</Text>
                  <Text style={styles.bodyText}>{String(log?.message || "")}</Text>
                </View>
              ))}
            </SectionCard>
          </>
        ) : null}
      </ScrollView>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  content: { gap: 12, paddingBottom: 24 },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  input: { borderWidth: 1, borderColor: "#CBD5E1", borderRadius: 10, backgroundColor: "#FFFFFF", color: "#0F172A", paddingHorizontal: 10, paddingVertical: 9, fontSize: 13 },
  textArea: { minHeight: 88 },
  primaryBtn: { backgroundColor: "#1D4ED8", borderRadius: 9, paddingHorizontal: 12, paddingVertical: 9 },
  primaryBtnText: { color: "#FFFFFF", fontWeight: "700", fontSize: 12 },
  secondaryBtn: { borderWidth: 1, borderColor: "#1D4ED8", backgroundColor: "#EFF6FF", borderRadius: 9, paddingHorizontal: 12, paddingVertical: 9 },
  secondaryBtnText: { color: "#1D4ED8", fontWeight: "700", fontSize: 12 },
  outlineBtn: { borderWidth: 1, borderColor: "#CBD5E1", backgroundColor: "#FFFFFF", borderRadius: 9, paddingHorizontal: 12, paddingVertical: 9 },
  outlineBtnText: { color: "#334155", fontWeight: "700", fontSize: 12 },
  warningBtn: { backgroundColor: "#B45309", borderRadius: 9, paddingHorizontal: 12, paddingVertical: 9 },
  warningBtnText: { color: "#FFFFFF", fontWeight: "700", fontSize: 12 },
  btnDisabled: { opacity: 0.55 },
  errorText: { fontSize: 12, color: "#B91C1C", fontWeight: "600" },
  titleText: { fontSize: 14, color: "#0F172A", fontWeight: "600" },
  metaText: { fontSize: 12, color: "#64748B" },
  bodyText: { fontSize: 12, color: "#334155", lineHeight: 18 },
  focusCard: { borderWidth: 1, borderColor: "#E9D5FF", backgroundColor: "#FAF5FF", borderRadius: 12, padding: 12, gap: 6 },
  focusTitle: { fontSize: 12, fontWeight: "700", color: "#4C1D95" },
  card: { borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 12, backgroundColor: "#F8FAFC", padding: 10, gap: 6 },
  cardTitle: { fontSize: 12, fontWeight: "700", color: "#0F172A" },
});
