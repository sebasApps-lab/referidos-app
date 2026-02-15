import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TAB_ROUTES } from "@navigation/routeKeys";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { mobileApi, observability, supabase } from "@shared/services/mobileApi";
import { useSupportDeskStore } from "@shared/store/supportDeskStore";
import { SUPPORT_MACROS } from "@shared/constants/supportDesk";
import {
  fetchSupportLogEvents,
  fetchSupportThreadDetail,
  fetchSupportThreadEvents,
  fetchSupportThreadNotes,
} from "@shared/services/supportDeskQueries";
import { formatDateTime } from "@shared/services/entityQueries";

const STATUS_ACTIONS = [
  { id: "in_progress", label: "En progreso" },
  { id: "waiting_user", label: "Esperando usuario" },
  { id: "queued", label: "Liberar a cola" },
] as const;

export default function SoporteTicketScreen() {
  const navigation = useNavigation<any>();
  const selectedThreadPublicId = useSupportDeskStore((state) => state.selectedThreadPublicId);
  const setSelectedThreadPublicId = useSupportDeskStore(
    (state) => state.setSelectedThreadPublicId,
  );

  const [threadIdInput, setThreadIdInput] = useState(selectedThreadPublicId || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [thread, setThread] = useState<any | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [noteDraft, setNoteDraft] = useState("");
  const [resolution, setResolution] = useState("");
  const [rootCause, setRootCause] = useState("");
  const [saving, setSaving] = useState(false);
  const [closing, setClosing] = useState(false);

  const loadThread = useCallback(
    async (forcedThreadPublicId?: string) => {
      const nextThreadPublicId = String(
        forcedThreadPublicId || threadIdInput || selectedThreadPublicId || "",
      ).trim();
      if (!nextThreadPublicId) {
        setError("Ingresa o selecciona un ticket para cargar detalle.");
        return;
      }
      setLoading(true);
      setError("");

      const detailResult = await fetchSupportThreadDetail(supabase, nextThreadPublicId);
      if (!detailResult.ok || !detailResult.data) {
        setThread(null);
        setEvents([]);
        setNotes([]);
        setLogs([]);
        setError(detailResult.error || "No se pudo cargar detalle del ticket.");
        setLoading(false);
        return;
      }

      const nextThread = detailResult.data;
      setThread(nextThread);
      setThreadIdInput(String(nextThread.public_id || nextThreadPublicId));
      setSelectedThreadPublicId(String(nextThread.public_id || nextThreadPublicId));

      const [eventsResult, notesResult, logsResult] = await Promise.all([
        fetchSupportThreadEvents(supabase, String(nextThread.id || "")),
        fetchSupportThreadNotes(supabase, String(nextThread.id || "")),
        fetchSupportLogEvents(supabase, {
          threadId: String(nextThread.id || ""),
          userId: String(nextThread.user_id || ""),
          limit: 60,
        }),
      ]);

      setEvents(eventsResult.ok ? eventsResult.data : []);
      setNotes(notesResult.ok ? notesResult.data : []);
      setLogs(logsResult.ok ? logsResult.data : []);
      if (!eventsResult.ok || !notesResult.ok || !logsResult.ok) {
        setError(
          eventsResult.error ||
            notesResult.error ||
            logsResult.error ||
            "Hubo errores parciales al cargar datos del ticket.",
        );
      }
      setLoading(false);
    },
    [selectedThreadPublicId, setSelectedThreadPublicId, threadIdInput],
  );

  useEffect(() => {
    if (!selectedThreadPublicId) return;
    setThreadIdInput(selectedThreadPublicId);
    void loadThread(selectedThreadPublicId);
  }, [loadThread, selectedThreadPublicId]);

  const availableMacros = useMemo(() => {
    const status = String(thread?.status || "").trim();
    if (!status) return [];
    return SUPPORT_MACROS.filter((item) => item.status === status);
  }, [thread?.status]);

  const handleAddNote = useCallback(async () => {
    const safeNote = noteDraft.trim();
    if (!thread?.public_id) {
      setError("No hay ticket cargado.");
      return;
    }
    if (!safeNote) {
      setError("La nota no puede estar vacia.");
      return;
    }
    setSaving(true);
    const result = await mobileApi.support.addNote({
      thread_public_id: thread.public_id,
      body: safeNote,
    });
    setSaving(false);
    if (!result?.ok) {
      setError(result?.error || "No se pudo guardar nota.");
      return;
    }
    setNoteDraft("");
    await observability.track({
      level: "info",
      category: "audit",
      message: "support_note_added",
      context: { thread_public_id: thread.public_id },
    });
    const notesResult = await fetchSupportThreadNotes(supabase, String(thread.id || ""));
    if (notesResult.ok) setNotes(notesResult.data);
  }, [noteDraft, thread?.id, thread?.public_id]);

  const handleStatus = useCallback(
    async (nextStatus: string) => {
      if (!thread?.public_id) {
        setError("No hay ticket cargado.");
        return;
      }
      setSaving(true);
      const result = await mobileApi.support.updateStatus({
        thread_public_id: thread.public_id,
        status: nextStatus,
      });
      setSaving(false);
      if (!result?.ok) {
        setError(result?.error || "No se pudo cambiar estado.");
        return;
      }
      await observability.track({
        level: "info",
        category: "audit",
        message: "support_status_update",
        context: {
          thread_public_id: thread.public_id,
          to: nextStatus,
        },
      });
      await loadThread(thread.public_id);
    },
    [loadThread, thread?.public_id],
  );

  const handleCloseThread = useCallback(async () => {
    if (!thread?.public_id) {
      setError("No hay ticket cargado.");
      return;
    }
    const safeResolution = resolution.trim();
    if (!safeResolution) {
      setError("Debes ingresar una resolucion para cerrar.");
      return;
    }
    setClosing(true);
    const result = await mobileApi.support.closeThread({
      thread_public_id: thread.public_id,
      resolution: safeResolution,
      root_cause: rootCause.trim(),
    });
    setClosing(false);
    if (!result?.ok) {
      setError(result?.error || "No se pudo cerrar ticket.");
      return;
    }
    await observability.track({
      level: "info",
      category: "audit",
      message: "support_close_ticket",
      context: { thread_public_id: thread.public_id },
    });
    setResolution("");
    setRootCause("");
    await loadThread(thread.public_id);
  }, [loadThread, resolution, rootCause, thread?.public_id]);

  return (
    <ScreenScaffold title="Soporte Ticket" subtitle="Detalle, timeline, notas y cierre operativo">
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard title="Buscar ticket">
          <TextInput
            value={threadIdInput}
            onChangeText={setThreadIdInput}
            placeholder="Public ID del ticket (ej: TKT-XXXX)"
            style={styles.input}
            autoCapitalize="characters"
            autoCorrect={false}
          />
          <View style={styles.actionsRow}>
            <Pressable
              onPress={() => void loadThread(threadIdInput)}
              disabled={loading}
              style={[styles.primaryBtn, loading && styles.btnDisabled]}
            >
              <Text style={styles.primaryBtnText}>{loading ? "Cargando..." : "Cargar ticket"}</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate(TAB_ROUTES.SOPORTE.INBOX)}
              style={styles.secondaryBtn}
            >
              <Text style={styles.secondaryBtnText}>Volver inbox</Text>
            </Pressable>
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </SectionCard>

        {loading ? <BlockSkeleton lines={8} /> : null}

        {!loading && thread ? (
          <>
            <SectionCard title={`Ticket ${String(thread.public_id || "-")}`}>
              <Text style={styles.metaText}>
                Estado: {String(thread.status || "-")} | Categoria: {String(thread.category || "-")} | Severidad:{" "}
                {String(thread.severity || "s2")}
              </Text>
              <Text style={styles.summaryText}>{String(thread.summary || "Sin resumen")}</Text>
              <Text style={styles.metaText}>
                Usuario:{" "}
                {thread.request_origin === "anonymous"
                  ? String(thread.anon_public_id || thread.user_public_id || "anon")
                  : String(thread.user_public_id || "usuario")}
              </Text>
              <Text style={styles.metaText}>
                Creado: {formatDateTime(thread.created_at || null)} | Actualizado:{" "}
                {formatDateTime(thread.updated_at || thread.created_at || null)}
              </Text>
              {thread.request_origin === "anonymous" && thread.contact_display ? (
                <Text style={styles.metaText}>Contacto anonimo: {String(thread.contact_display)}</Text>
              ) : null}
              <Text style={styles.contextTitle}>Contexto:</Text>
              <Text selectable style={styles.contextText}>
                {JSON.stringify(thread.context || {}, null, 2)}
              </Text>
            </SectionCard>

            <SectionCard title="Transiciones">
              <View style={styles.actionsRow}>
                {STATUS_ACTIONS.map((item) => (
                  <Pressable
                    key={item.id}
                    onPress={() => void handleStatus(item.id)}
                    disabled={saving || closing || String(thread.status || "") === item.id}
                    style={[
                      styles.secondaryBtn,
                      (saving || closing || String(thread.status || "") === item.id) && styles.btnDisabled,
                    ]}
                  >
                    <Text style={styles.secondaryBtnText}>{item.label}</Text>
                  </Pressable>
                ))}
              </View>
            </SectionCard>

            <SectionCard title="Notas internas">
              <TextInput
                value={noteDraft}
                onChangeText={setNoteDraft}
                placeholder="Escribe una nota interna"
                style={[styles.input, styles.textArea]}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
              <Pressable
                onPress={() => void handleAddNote()}
                disabled={saving || closing}
                style={[styles.primaryBtn, (saving || closing) && styles.btnDisabled]}
              >
                <Text style={styles.primaryBtnText}>{saving ? "Guardando..." : "Guardar nota"}</Text>
              </Pressable>
              {notes.length === 0 ? <Text style={styles.emptyText}>Sin notas.</Text> : null}
              {notes.map((note, index) => (
                <View key={`${String(note?.id || index)}-${index}`} style={styles.listItem}>
                  <Text style={styles.listBody}>{String(note?.body || "")}</Text>
                  <Text style={styles.listMeta}>{formatDateTime(note?.created_at || null)}</Text>
                </View>
              ))}
            </SectionCard>

            <SectionCard title="Macros sugeridas">
              {availableMacros.length === 0 ? (
                <Text style={styles.emptyText}>Sin macros para este estado.</Text>
              ) : null}
              {availableMacros.map((macro) => (
                <View key={macro.id} style={styles.listItem}>
                  <Text style={styles.listTitle}>{macro.title}</Text>
                  <Text style={styles.listBody}>{macro.body}</Text>
                  <Pressable
                    onPress={() => setNoteDraft(macro.body)}
                    style={styles.secondaryBtn}
                  >
                    <Text style={styles.secondaryBtnText}>Usar en nota</Text>
                  </Pressable>
                </View>
              ))}
            </SectionCard>

            <SectionCard title="Timeline">
              {events.length === 0 ? <Text style={styles.emptyText}>Sin eventos.</Text> : null}
              {events.map((event, index) => (
                <View key={`${String(event?.id || index)}-${index}`} style={styles.listItem}>
                  <Text style={styles.listTitle}>{String(event?.event_type || "evento")}</Text>
                  <Text style={styles.listMeta}>
                    actor: {String(event?.actor_role || "n/a")} | {formatDateTime(event?.created_at || null)}
                  </Text>
                </View>
              ))}
            </SectionCard>

            <SectionCard title="Logs soporte">
              {logs.length === 0 ? <Text style={styles.emptyText}>Sin logs recientes.</Text> : null}
              {logs.map((log, index) => (
                <View key={`${String(log?.id || index)}-${index}`} style={styles.listItem}>
                  <Text style={styles.listMeta}>
                    {String(log?.level || "info")} | {String(log?.category || "log")} |{" "}
                    {formatDateTime(log?.occurred_at || log?.created_at || null)}
                  </Text>
                  <Text style={styles.listBody}>{String(log?.message || "")}</Text>
                  {log?.route || log?.screen ? (
                    <Text style={styles.listMeta}>
                      {log?.route ? `ruta:${String(log.route)}` : ""}
                      {log?.route && log?.screen ? " | " : ""}
                      {log?.screen ? `pantalla:${String(log.screen)}` : ""}
                    </Text>
                  ) : null}
                </View>
              ))}
            </SectionCard>

            <SectionCard title="Cerrar ticket" subtitle="Requiere resolucion obligatoria">
              <TextInput
                value={resolution}
                onChangeText={setResolution}
                placeholder="Resolucion"
                style={styles.input}
              />
              <TextInput
                value={rootCause}
                onChangeText={setRootCause}
                placeholder="Causa raiz (opcional)"
                style={styles.input}
              />
              <Pressable
                onPress={() => void handleCloseThread()}
                disabled={closing || saving}
                style={[styles.dangerBtn, (closing || saving) && styles.btnDisabled]}
              >
                <Text style={styles.dangerBtnText}>{closing ? "Cerrando..." : "Confirmar cierre"}</Text>
              </Pressable>
            </SectionCard>
          </>
        ) : null}
      </ScrollView>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 12,
    paddingBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    color: "#0F172A",
    paddingHorizontal: 10,
    paddingVertical: 9,
    fontSize: 13,
  },
  textArea: {
    minHeight: 88,
  },
  actionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  primaryBtn: {
    backgroundColor: "#1D4ED8",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#1D4ED8",
    backgroundColor: "#EFF6FF",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  secondaryBtnText: {
    color: "#1D4ED8",
    fontWeight: "700",
    fontSize: 12,
  },
  dangerBtn: {
    backgroundColor: "#B91C1C",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  dangerBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },
  btnDisabled: {
    opacity: 0.55,
  },
  errorText: {
    fontSize: 12,
    color: "#B91C1C",
    fontWeight: "600",
  },
  emptyText: {
    fontSize: 12,
    color: "#64748B",
  },
  summaryText: {
    fontSize: 14,
    color: "#0F172A",
    fontWeight: "600",
  },
  metaText: {
    fontSize: 12,
    color: "#475569",
  },
  contextTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#334155",
  },
  contextText: {
    fontFamily: "monospace",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    padding: 8,
    fontSize: 11,
    color: "#334155",
  },
  listItem: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 9,
    gap: 4,
  },
  listTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0F172A",
  },
  listBody: {
    fontSize: 12,
    color: "#334155",
  },
  listMeta: {
    fontSize: 11,
    color: "#64748B",
  },
});
