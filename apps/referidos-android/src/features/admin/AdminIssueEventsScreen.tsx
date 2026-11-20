import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import StaffSectionCard from "@features/staff/StaffSectionCard";
import { StaffTableBadge } from "@features/staff/StaffTable";
import StaffTablePage, { tableText } from "@features/staff/StaffTablePage";
import { STACK_ROUTES } from "@navigation/routeKeys";
import { cacheAdminIssue } from "@shared/services/adminOps";
import { formatDateTime, readFirst } from "@shared/services/entityQueries";
import { supabase } from "@shared/services/mobileApi";
import { fetchSupportIssueEventsContext, fetchSupportIssuesContext } from "@shared/services/supportDeskQueries";

type Request = { issueId: string };

function eventView(row: Record<string, unknown>) {
  return {
    id: String(readFirst(row, ["id"], "")).trim(),
    type: String(readFirst(row, ["event_type"], "event")),
    level: String(readFirst(row, ["level"], "info")).trim().toLowerCase(),
    code: String(readFirst(row, ["error_code"], "")),
    message: String(readFirst(row, ["message"], "Sin mensaje")),
    app: String(readFirst(row, ["app_id"], "—")),
    release: String(readFirst(row, ["release_version_label"], "—")),
    occurredAt: readFirst(row, ["occurred_at"], null),
  };
}

type IssueEvent = ReturnType<typeof eventView>;

function levelTone(level: string) {
  if (level === "fatal" || level === "error") return "danger";
  return level === "warn" ? "warning" : "neutral";
}

export default function AdminIssueEventsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const issueId = String(route?.params?.issueId || "").trim();
  const issueTitleParam = String(route?.params?.issueTitle || "").trim();
  const [view, setView] = useState<{ issueId: string; issue: Record<string, unknown> | null; rows: IssueEvent[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);
  const activeRequest = useRef<Request | null>(null);

  const loadRows = useCallback(async (manual = false) => {
    if (!issueId) {
      activeRequest.current = null;
      setView(null);
      setError("Falta el ID del issue.");
      setLoading(false);
      setRefreshing(false);
      setBusy(false);
      return;
    }
    if (activeRequest.current?.issueId === issueId) return;
    const request: Request = { issueId };
    activeRequest.current = request;
    setLoading(!manual);
    setRefreshing(manual);
    setBusy(false);
    setError("");
    try {
      const [issuesResult, eventsResult] = await Promise.all([
        fetchSupportIssuesContext(supabase, 1, { issueId }),
        fetchSupportIssueEventsContext(supabase, 80, { issueId }),
      ]);
      if (activeRequest.current !== request) return;

      setView((current) => ({
        issueId,
        issue: issuesResult.ok ? issuesResult.data[0] || null : current?.issueId === issueId ? current.issue : null,
        rows: eventsResult.ok ? eventsResult.data.map(eventView) : current?.issueId === issueId ? current.rows : [],
      }));
      setError(
        (!issuesResult.ok && issuesResult.error) ||
        (!eventsResult.ok && eventsResult.error) ||
        "",
      );
    } catch {
      if (activeRequest.current === request) setError("No se pudieron cargar los eventos.");
    } finally {
      if (activeRequest.current === request) {
        activeRequest.current = null;
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, [issueId]);

  useEffect(() => {
    void loadRows();
    return () => { activeRequest.current = null; };
  }, [loadRows]);

  const handleCacheIssue = useCallback(async () => {
    if (!issueId || activeRequest.current) return;
    const request: Request = { issueId };
    activeRequest.current = request;
    setBusy(true);
    setError("");
    try {
      await cacheAdminIssue(issueId);
      if (activeRequest.current !== request) return;
      activeRequest.current = null;
      await loadRows(true);
    } catch (cacheError) {
      if (activeRequest.current === request) {
        setError(cacheError instanceof Error ? cacheError.message : "No se pudo cachear el issue.");
      }
    } finally {
      if (activeRequest.current === request) {
        activeRequest.current = null;
        setBusy(false);
      }
    }
  }, [issueId, loadRows]);

  const current = view?.issueId === issueId ? view : null;
  const issue = current?.issue;
  const title = String(readFirst(issue, ["title"], issueTitleParam || "Issue"));
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return (current?.rows || []).filter((row) => (
      [row.level, row.type, row.message, row.code].some((field) => field.toLowerCase().includes(term))
    ));
  }, [current, query]);
  const disabled = !issueId || loading || busy || refreshing;

  return (
    <StaffTablePage
      title="Issues"
      subtitle="Eventos del issue seleccionado"
      description="Busca entre los eventos de la incidencia."
      searchPlaceholder="Buscar por nivel, tipo, mensaje o código"
      query={query}
      onChangeQuery={setQuery}
      loading={loading}
      error={error}
      filters={null}
      onRefresh={disabled ? undefined : () => { void loadRows(true); }}
    >
      {issueId ? (
        <StaffSectionCard
          title={title}
          subtitle={`${issueId} | release: ${String(readFirst(issue, ["last_release"], "—"))}`}
          right={(
            <Pressable accessibilityRole="button" disabled={disabled} onPress={() => { void handleCacheIssue(); }}
              style={[styles.toolbarButton, disabled && tableText.actionDisabled]}>
              <Text style={tableText.actionLabel}>{busy ? "Cacheando…" : "Cachear issue (30d)"}</Text>
            </Pressable>
          )}
        >
          <Text style={tableText.metadata}>Estado: {String(readFirst(issue, ["status"], "—"))}</Text>
          <Text style={tableText.metadata}>Usuario: {String(readFirst(issue, ["last_user_display_name", "last_user_email"], "—"))}</Text>
        </StaffSectionCard>
      ) : null}

      <View style={styles.events}>
        {filtered.map((row) => (
          <Pressable
            key={row.id}
            accessibilityRole="button"
            accessibilityLabel={`Ver detalle de evento ${row.type}`}
            disabled={!row.id}
            onPress={() => navigation.navigate(STACK_ROUTES.ADMIN.ISSUE_EVENT_DETAILS, { issueId, eventId: row.id, issueTitle: title })}
            style={({ pressed }) => [styles.event, pressed && styles.eventPressed]}
          >
            <View style={styles.eventHeader}>
              <StaffTableBadge value={row.level} tone={levelTone(row.level)} />
              <Text style={tableText.name}>{row.type}</Text>
              <Text style={tableText.metadata}>{formatDateTime(row.occurredAt)}</Text>
            </View>
            <Text style={styles.message} numberOfLines={3}>{row.message}</Text>
            <View style={styles.eventHeader}>
              <Text style={tableText.metadata}>Código: {row.code || "—"}</Text>
              <Text style={tableText.metadata}>App: {row.app}</Text>
              <Text style={tableText.metadata}>Release: {row.release}</Text>
            </View>
          </Pressable>
        ))}
        {issueId && !error && filtered.length === 0 ? (
          <Text style={styles.empty}>No hay eventos para este issue.</Text>
        ) : null}
      </View>
    </StaffTablePage>
  );
}

const styles = StyleSheet.create({
  toolbarButton: { borderWidth: 1, borderColor: "#D9C8FF", borderRadius: 12, paddingHorizontal: 10, paddingVertical: 7 },
  events: { gap: 8 },
  event: { gap: 4, borderWidth: 1, borderColor: "#EFE9FA", borderRadius: 12, backgroundColor: "#FCFBFF", paddingHorizontal: 12, paddingVertical: 8 },
  eventPressed: { borderColor: "#D9C8FF", backgroundColor: "#F7F4FF" },
  eventHeader: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", columnGap: 8, rowGap: 3 },
  message: { fontSize: 14, lineHeight: 20, color: "#334155" },
  empty: { color: "#64748B", textAlign: "center", borderWidth: 1, borderStyle: "dashed", borderRadius: 12, borderColor: "#DDD4F3", padding: 14, fontSize: 12 },
});
