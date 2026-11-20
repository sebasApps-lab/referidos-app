import React, { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import StaffSectionCard from "@features/staff/StaffSectionCard";
import StaffScreenScaffold from "@features/staff/StaffScreenScaffold";
import { StaffTableBadge } from "@features/staff/StaffTable";
import { tableText } from "@features/staff/StaffTablePage";
import { fetchAdminIssueEventDetail } from "@shared/services/adminOps";
import { formatDateTime, readFirst } from "@shared/services/entityQueries";
import BlockSkeleton from "@shared/ui/BlockSkeleton";

function safeJson(value: unknown) {
  try {
    return JSON.stringify(value ?? null, null, 2);
  } catch {
    return "{}";
  }
}

function levelTone(level: string) {
  if (level === "fatal" || level === "error") return "danger";
  return level === "warn" ? "warning" : "neutral";
}

type EventRequest = { eventId: string; issueId: string };
type EventView = EventRequest & { row: Record<string, unknown> | null };

export default function AdminIssueEventDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const issueId = String(route?.params?.issueId || "").trim();
  const eventId = String(route?.params?.eventId || "").trim();
  const issueTitle = String(route?.params?.issueTitle || "").trim();
  const [view, setView] = useState<EventView | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const activeRequest = useRef<EventRequest | null>(null);

  const loadRow = useCallback(async (manual = false) => {
    if (!eventId || !issueId) {
      activeRequest.current = null;
      setView(null);
      setError("Falta identificar el issue o el evento.");
      setLoading(false);
      setRefreshing(false);
      return;
    }
    if (activeRequest.current?.eventId === eventId && activeRequest.current.issueId === issueId) return;
    const request = { eventId, issueId };
    activeRequest.current = request;
    setLoading(!manual);
    setRefreshing(manual);
    setError("");
    try {
      const result = await fetchAdminIssueEventDetail(eventId);
      if (activeRequest.current !== request) return;
      if (!result.ok) {
        setError(result.error || "No se pudo cargar el detalle del evento.");
        return;
      }

      const row = result.data;
      const matching = row && String(readFirst(row, ["issue_id"], "")).trim() === issueId;
      setView({ eventId, issueId, row: matching ? row : null });
    } catch {
      if (activeRequest.current === request) setError("No se pudo cargar el detalle del evento.");
    } finally {
      if (activeRequest.current === request) {
        activeRequest.current = null;
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, [eventId, issueId]);

  useEffect(() => {
    void loadRow();
    return () => { activeRequest.current = null; };
  }, [loadRow]);

  const row = view?.eventId === eventId && view.issueId === issueId ? view.row : null;
  const level = String(readFirst(row, ["level"], "info")).trim().toLowerCase();
  const code = String(readFirst(row, ["error_code"], ""));
  const eventType = String(readFirst(row, ["event_type"], "Evento"));
  const title = issueTitle || "Detalle completo del evento";
  const canGoBack = navigation.canGoBack();

  return (
    <StaffScreenScaffold
      title="Issues"
      subtitle="Detalle completo del evento"
      onRefresh={!eventId || !issueId || loading || refreshing ? undefined : () => { void loadRow(true); }}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <StaffSectionCard
          title={title}
          subtitle={eventId || undefined}
          right={canGoBack ? (
            <Pressable accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.back}>
              <Text style={tableText.actionLabel}>Volver a eventos</Text>
            </Pressable>
          ) : undefined}
        >
          {row ? (
            <View style={styles.metaRow}>
              <StaffTableBadge value={level} tone={levelTone(level)} />
              <Text style={tableText.name}>{eventType}</Text>
              {code ? <StaffTableBadge value={code} tone="purple" /> : null}
              <Text style={tableText.metadata}>{formatDateTime(readFirst(row, ["occurred_at", "created_at"], null))}</Text>
            </View>
          ) : null}
        </StaffSectionCard>

        {error ? <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text> : null}
        {loading ? <BlockSkeleton lines={6} compact /> : null}
        {!loading && !error && !row ? (
          <Text style={styles.empty}>El detalle de este evento no está disponible.</Text>
        ) : null}

        {!loading && row ? (
          <>
            <StaffSectionCard title="Mensaje">
              <Text style={styles.message}>{String(readFirst(row, ["message"], "Sin mensaje"))}</Text>
            </StaffSectionCard>

            <StaffSectionCard title="Contexto técnico" subtitle="Release, request, trace y usuario">
              <View style={styles.context}>
                {[
                  ["Issue", issueId],
                  ["Request", readFirst(row, ["request_id"], "—")],
                  ["Trace", readFirst(row, ["trace_id"], "—")],
                  ["Session", readFirst(row, ["session_id"], "—")],
                  ["App", readFirst(row, ["app_id"], "—")],
                  ["Release", readFirst(row, ["release_version_label"], "—")],
                  ["Componente", readFirst(row, ["resolved_component_key"], "—")],
                  ["Usuario", readFirst(row, ["user_display_name", "user_email"], "—")],
                ].map(([label, value]) => (
                  <View key={label} style={styles.metaCard}>
                    <Text style={styles.fieldLabel}>{label}</Text>
                    <Text style={tableText.metadata}>{String(value)}</Text>
                  </View>
                ))}
              </View>
            </StaffSectionCard>

            <StaffSectionCard title="Stack preview">
              <Text style={styles.codeText}>{String(readFirst(row, ["stack_preview", "stack_raw"], "Sin stack"))}</Text>
            </StaffSectionCard>

            <DetailDisclosure key={`context-${eventId}`} title="Contexto JSON">
              <Text style={styles.codeText}>{safeJson(readFirst(row, ["context"], {}))}</Text>
            </DetailDisclosure>

            <DetailDisclosure key={`metadata-${eventId}`} title="Release, dispositivo y breadcrumbs">
              <Text style={styles.codeText}>{safeJson({
                release: readFirst(row, ["release"], null),
                device: readFirst(row, ["device"], null),
                user_ref: readFirst(row, ["user_ref"], null),
                breadcrumbs: readFirst(row, ["breadcrumbs"], null),
                support_context_extra: readFirst(row, ["support_context_extra"], null),
              })}</Text>
            </DetailDisclosure>
          </>
        ) : null}
      </ScrollView>
    </StaffScreenScaffold>
  );
}

function DetailDisclosure({ title, children }: { title: string; children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <StaffSectionCard
      title={title}
      right={(
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${expanded ? "Ocultar" : "Ver"} ${title}`}
          accessibilityState={{ expanded }}
          onPress={() => setExpanded((current) => !current)}
          style={tableText.action}
        >
          <Text style={tableText.actionLabel}>{expanded ? "Ocultar" : "Ver detalle"}</Text>
        </Pressable>
      )}
    >
      {expanded ? children : null}
    </StaffSectionCard>
  );
}

const styles = StyleSheet.create({
  content: { gap: 16, paddingBottom: 48 },
  back: { borderWidth: 1, borderColor: "#D9C8FF", borderRadius: 12, paddingHorizontal: 10, paddingVertical: 7 },
  metaRow: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 8 },
  context: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  metaCard: { flexBasis: 150, flexGrow: 1, borderWidth: 1, borderColor: "#E9E2F7", borderRadius: 12, padding: 10, gap: 4, backgroundColor: "#FAF8FF" },
  fieldLabel: { color: "#2F1A55", fontSize: 12, fontWeight: "600" },
  message: { color: "#334155", fontSize: 14, lineHeight: 20 },
  codeText: { color: "#334155", fontFamily: "monospace", fontSize: 11, lineHeight: 17, padding: 10, backgroundColor: "#FAF8FF", borderRadius: 10 },
  empty: { color: "#64748B", textAlign: "center", padding: 12, fontSize: 12 },
  error: { color: "#B91C1C", borderColor: "#FECACA", borderWidth: 1, borderRadius: 12, padding: 12, backgroundColor: "#FFF1F2" },
});
