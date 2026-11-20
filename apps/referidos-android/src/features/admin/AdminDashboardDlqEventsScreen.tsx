import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import StaffScreenScaffold from "@features/staff/StaffScreenScaffold";
import { staffIcons } from "@features/staff/staffNavigation";
import { STACK_ROUTES } from "@navigation/routeKeys";
import { formatDateTime } from "@shared/services/entityQueries";
import { fetchDlqEvents, formatDlqBytes, type DlqEvent, type DlqGroup } from "./components/TelemetryDlqData";

const PAGE_SIZE = 25;

function label(value: unknown, fallback: string) {
  return typeof value === "string" ? value.trim() || fallback : fallback;
}

function dateLabel(value?: string) {
  return value ? formatDateTime(value) : "—";
}

function SourceLabels({ source }: { source: Pick<DlqGroup, "domain" | "source_project_ref" | "source_env_key"> }) {
  return (
    <>
      <Text style={styles.body}>Dominio: {label(source.domain, "Sin dominio")}</Text>
      <Text style={styles.body}>Proyecto: {label(source.source_project_ref, "Sin proyecto")}</Text>
      <Text style={styles.body}>Entorno: {label(source.source_env_key, "Sin entorno")}</Text>
    </>
  );
}

function FieldSet({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.fieldset}>
      <Text style={styles.label}>{title}</Text>
      {children}
    </View>
  );
}

function EventCard({ event }: { event: DlqEvent }) {
  return (
    <View style={styles.card}>
      <View style={styles.eventSummary}>
        <Text style={styles.eventTitle}>{label(event.reason, "Sin motivo reportado")}</Text>
        <View style={styles.metaRow}><SourceLabels source={event} /></View>
        <View style={styles.dates}>
          <Text style={styles.body}>Creado: {dateLabel(event.created_at)}</Text>
          <Text style={styles.body}>Expira: {dateLabel(event.expires_at)}</Text>
        </View>
      </View>
      <FieldSet title="source_event_key">
        <Text selectable style={styles.body}>{label(event.source_event_key, "Sin source_event_key")}</Text>
      </FieldSet>
      <FieldSet title="Origen">
        <Text style={styles.body}>App: {label(event.source_app_id, "Sin app")}</Text>
        <Text style={styles.body}>Tabla: {label(event.source_table, "Sin tabla")}</Text>
        <Text selectable style={styles.body}>Fila: {label(event.source_row_id, "Sin fila")}</Text>
      </FieldSet>
      <FieldSet title="Evento">
        <Text style={styles.body}>Tipo: {label(event.event_type, "Sin tipo")}</Text>
        <Text style={styles.body}>Retención: {label(event.retention_tier, "Sin tier")}</Text>
        <Text style={styles.body}>Ocurrió: {dateLabel(event.occurred_at)}</Text>
      </FieldSet>
      <FieldSet title="Payload">
        <Text style={styles.body}>Tipo: {event.payload_type || "—"}</Text>
        <Text style={styles.body}>Claves: {event.payload_key_count ?? 0}</Text>
        <Text style={styles.body}>Tamaño: {formatDlqBytes(event.payload_size_bytes)}</Text>
        <Text style={styles.body}>Evento original: {formatDlqBytes(event.raw_event_size_bytes)}</Text>
      </FieldSet>
      <FieldSet title="Ingesta">
        <Text style={styles.body}>Modo: {event.ingest_mode || "—"}</Text>
        <Text style={styles.body}>Panel: {event.panel_key || "—"}</Text>
      </FieldSet>
      <FieldSet title="Claves top-level del payload">
        <View style={styles.tags}>
          {Array.isArray(event.payload_keys) && event.payload_keys.length > 0
            ? event.payload_keys.map((key) => <Text key={key} style={styles.tag}>{key}</Text>)
            : <Text style={styles.body}>Sin claves registradas</Text>}
        </View>
      </FieldSet>
    </View>
  );
}

export default function AdminDashboardDlqEventsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const params = route.params as { groupKey?: string; group?: DlqGroup } | undefined;
  const groupKey = label(params?.groupKey, "");
  const [data, setData] = useState<{ groupKey: string; page: number; total: number; events: DlqEvent[]; nextPurge: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const activeRequest = useRef<{ groupKey: string } | null>(null);

  const loadEvents = useCallback(async (targetPage = 0, silent = false) => {
    if (activeRequest.current?.groupKey === groupKey) return;
    const request = { groupKey };
    activeRequest.current = request;
    setLoading(!silent);
    setRefreshing(silent);
    setError("");
    try {
      const result = await fetchDlqEvents(groupKey, PAGE_SIZE, targetPage * PAGE_SIZE);
      if (activeRequest.current !== request) return;
      setData({
        groupKey,
        page: targetPage,
        total: Number(result?.total_count || 0),
        events: Array.isArray(result?.events) ? result.events : [],
        nextPurge: result?.next_purge_at || "",
      });
    } catch {
      if (activeRequest.current === request) setError("No se pudieron cargar los eventos pendientes de borrado.");
    } finally {
      if (activeRequest.current === request) {
        activeRequest.current = null;
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, [groupKey]);

  useEffect(() => {
    void loadEvents();
    return () => { activeRequest.current = null; };
  }, [loadEvents]);

  const current = data?.groupKey === groupKey ? data : null;
  const page = current?.page ?? 0;
  const total = current?.total ?? 0;
  const events = current?.events ?? [];
  const nextPurge = current?.nextPurge;
  const group = groupKey
    ? (params?.group?.group_key === groupKey ? params.group : events[0])
    : null;
  const busy = loading || refreshing;
  const refresh = useCallback(() => { void loadEvents(page, true); }, [loadEvents, page]);
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  return (
    <StaffScreenScaffold title="Eventos de borrado DLQ" subtitle="Detalle de los eventos fallidos de telemetría que se eliminarán en el siguiente purge" onRefresh={busy ? undefined : refresh}>
      <ScrollView contentContainerStyle={styles.content} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}>
        <View style={[styles.card, styles.intro]}>
          <Pressable accessibilityRole="button" onPress={() => navigation.dispatch(StackActions.popTo(STACK_ROUTES.ADMIN.DASHBOARD))} style={styles.back}>
            <Image source={require("@features/cliente/inicio/assets/arrow-left.png")} style={styles.backIcon} />
            <Text style={styles.backLabel}>Volver al dashboard</Text>
          </Pressable>
          <View>
            <Text accessibilityRole="header" style={styles.heading}>Eventos listos para borrado</Text>
            <Text style={styles.description}>{groupKey
              ? "Vista detallada del grupo seleccionado para el siguiente purge."
              : "Vista completa de todos los eventos que se eliminarán en el siguiente purge."}</Text>
            <View style={[styles.metaRow, styles.metaSpacing]}>
              <Text style={styles.body}>Siguiente purge: {dateLabel(nextPurge)}</Text>
              <Text style={styles.body}>Total eventos: {total}</Text>
              {groupKey ? <Text style={styles.body}>Filtro por grupo activo</Text> : null}
            </View>
            {group ? (
              <View style={[styles.metaRow, styles.metaSpacing]}>
                <Text style={styles.body}>Motivo: {label(group.reason, "Sin motivo reportado")}</Text>
                <SourceLabels source={group} />
              </View>
            ) : null}
          </View>
          <Pressable accessibilityRole="button" accessibilityState={{ disabled: busy }} disabled={busy}
            onPress={refresh} style={[styles.refreshButton, busy && styles.disabled]}>
            <Image source={staffIcons.refresh} style={styles.refreshIcon} />
            <Text style={styles.refreshLabel}>{refreshing ? "Actualizando…" : "Actualizar"}</Text>
          </Pressable>
        </View>
        {error ? <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text> : null}
        {loading ? <View style={[styles.card, styles.messageCard]}><Text style={styles.body}>Cargando eventos…</Text></View> : null}
        {!loading && !error && !events.length ? (
          <View style={[styles.card, styles.messageCard]}><Text style={styles.body}>No hay eventos programados para el siguiente ciclo de borrado con el filtro actual.</Text></View>
        ) : null}
        {events.length > 0 ? (
          <>
            <View style={styles.eventList}>
              {events.map((event, index) => <EventCard key={event.id || event.source_event_key || index} event={event} />)}
            </View>
            <View style={[styles.card, styles.pagination]}>
              <Text style={styles.description}>Página {page + 1} de {pageCount}</Text>
              <View style={styles.pageActions}>
                <PageButton label="Anterior" disabled={page === 0 || busy} onPress={() => { void loadEvents(page - 1, true); }} />
                <PageButton label="Siguiente" disabled={page + 1 >= pageCount || busy} onPress={() => { void loadEvents(page + 1, true); }} />
              </View>
            </View>
          </>
        ) : null}
      </ScrollView>
    </StaffScreenScaffold>
  );
}

function PageButton({ label, disabled, onPress }: { label: string; disabled: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[styles.pageButton, disabled && styles.disabled]}
    >
      <Text style={styles.pageLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: { gap: 24, paddingBottom: 24 },
  card: { borderRadius: 16, borderWidth: 1, borderColor: "#E9E2F7", backgroundColor: "#FFFFFF", padding: 16, gap: 12, elevation: 1 },
  intro: { borderRadius: 24, padding: 20, gap: 16 },
  back: { alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 8 },
  backIcon: { width: 16, height: 16, tintColor: "#5E30A5" },
  backLabel: { color: "#5E30A5", fontSize: 14, lineHeight: 20, fontWeight: "600" },
  refreshButton: { alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 8, borderRadius: 16, borderWidth: 1, borderColor: "#E9E2F7", backgroundColor: "#FFFFFF", paddingHorizontal: 16, paddingVertical: 8 },
  refreshIcon: { width: 16, height: 16, tintColor: "#2F1A55" },
  refreshLabel: { color: "#2F1A55", fontSize: 14, lineHeight: 20, fontWeight: "600" },
  messageCard: { padding: 24 },
  eventList: { gap: 16 },
  eventSummary: { gap: 8 },
  metaRow: { flexDirection: "row", flexWrap: "wrap", columnGap: 16, rowGap: 4 },
  metaSpacing: { marginTop: 12 },
  fieldset: { backgroundColor: "#F8FAFC", borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 16, padding: 12, gap: 4 },
  heading: { fontSize: 24, lineHeight: 32, fontWeight: "800", color: "#2F1A55", includeFontPadding: false },
  description: { marginTop: 8, color: "#64748B", fontSize: 14, lineHeight: 20, includeFontPadding: false },
  eventTitle: { fontSize: 14, fontWeight: "600", color: "#2F1A55" },
  label: { color: "#334155", fontSize: 12, fontWeight: "600" },
  body: { color: "#64748B", fontSize: 12, lineHeight: 16, includeFontPadding: false },
  dates: { backgroundColor: "#F8F4FF", borderRadius: 16, paddingHorizontal: 12, paddingVertical: 8, gap: 4 },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  tag: { backgroundColor: "#FFFFFF", color: "#5E30A5", fontSize: 11, borderWidth: 1, borderColor: "#E9E2F7", borderRadius: 16, paddingVertical: 4, paddingHorizontal: 8 },
  pagination: { gap: 12 },
  pageActions: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 8 },
  pageButton: { backgroundColor: "#FFFFFF", borderRadius: 12, borderWidth: 1, borderColor: "#E9E2F7", paddingHorizontal: 12, paddingVertical: 9 },
  pageLabel: { fontSize: 12, fontWeight: "600", color: "#2F1A55" },
  disabled: { opacity: 0.45 },
  error: { color: "#B91C1C", backgroundColor: "#FEF2F2", padding: 12, borderRadius: 12 },
});
