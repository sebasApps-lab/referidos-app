import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";
import ScreenScaffold from "@features/staff/StaffScreenScaffold";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { supabase } from "@shared/services/mobileApi";
import { fetchSupportIssueEventsContext, fetchSupportIssuesContext } from "@shared/services/supportDeskQueries";
import { formatDateTime } from "@shared/services/entityQueries";
import { SupportBadge, SupportButton, SupportNotice } from "./SupportTicketUi";
import { SupportDiagnosticItem, SupportSearchBar, supportDetailStyles as styles } from "./SupportDiagnosticsUi";

type Issue = {
  id: string;
  title?: string;
  level?: string;
  status?: string;
  count_total?: number;
  count_24h?: number;
  last_release?: string;
  last_seen_at?: string;
  last_user_display_name?: string;
  last_user_email?: string;
};

type Event = {
  id: string;
  issue_id?: string;
  message?: string;
  error_code?: string;
  event_type?: string;
  level?: string;
  app_id?: string;
  release_version_label?: string;
  user_display_name?: string;
  user_email?: string;
  occurred_at?: string;
};

type ResultItem = { type: "issue"; item: Issue } | { type: "event"; item: Event };

function LevelBadge({ level = "info" }: { level?: string }) {
  const normalized = String(level || "info").toLowerCase();
  const emphasized = ["fatal", "error", "warn", "warning"].includes(normalized);
  return <SupportBadge tone={emphasized ? "warning" : "info"}>{normalized}</SupportBadge>;
}

export default function SoporteIssuesScreen() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedIssueId, setSelectedIssueId] = useState("all");
  const [panel, setPanel] = useState<"issues" | "events">("issues");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [issuesRes, eventsRes] = await Promise.all([
        fetchSupportIssuesContext(supabase, 150),
        fetchSupportIssueEventsContext(supabase, 200),
      ]);
      setIssues(issuesRes.ok ? issuesRes.data : []);
      setEvents(eventsRes.ok ? eventsRes.data : []);
      if (!issuesRes.ok || !eventsRes.ok) {
        setError(issuesRes.error || eventsRes.error || "No se pudieron cargar las incidencias o los eventos.");
      }
    } catch {
      setIssues([]);
      setEvents([]);
      setError("No se pudieron cargar las incidencias o los eventos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadData(); }, [loadData]);

  const issueMap = useMemo(() => new Map(issues.map((issue) => [issue.id, issue])), [issues]);
  const filteredIssues = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return issues;
    return issues.filter((issue) => [
      issue.title,
      issue.id,
      issue.level,
      issue.status,
      issue.last_release,
      issue.last_user_display_name,
      issue.last_user_email,
    ].filter(Boolean).join(" ").toLowerCase().includes(term));
  }, [issues, query]);
  const filteredEvents = useMemo(() => {
    const term = query.trim().toLowerCase();
    return events.filter((event) => {
      if (selectedIssueId !== "all" && event.issue_id !== selectedIssueId) return false;
      if (!term) return true;
      return [
        event.issue_id,
        event.issue_id ? issueMap.get(event.issue_id)?.title : "",
        event.message,
        event.error_code,
        event.event_type,
        event.level,
        event.app_id,
        event.release_version_label,
        event.user_display_name,
        event.user_email,
      ].filter(Boolean).join(" ").toLowerCase().includes(term);
    });
  }, [events, issueMap, query, selectedIssueId]);

  const visibleRows = useMemo<ResultItem[]>(() => panel === "issues"
    ? filteredIssues.map((item) => ({ type: "issue", item }))
    : filteredEvents.map((item) => ({ type: "event", item })), [filteredEvents, filteredIssues, panel]);
  const noResults = panel === "issues" ? "No hay incidencias para el filtro actual." : "No hay eventos para el filtro actual.";
  const selectedIssue = issueMap.get(selectedIssueId);

  return (
    <ScreenScaffold title="Incidencias y eventos" onRefresh={loading ? undefined : () => { void loadData(); }}>
      <FlatList
        key={panel}
        data={loading ? [] : visibleRows}
        keyExtractor={(entry) => entry.item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        ListHeaderComponent={(
          <View style={styles.headerStack}>
            <SupportSearchBar value={query} onChange={setQuery} placeholder="Buscar por mensaje, código o app" loading={loading} onRefresh={() => { void loadData(); }} />
            {error ? <SupportNotice tone="warning">{error}</SupportNotice> : null}
            <View style={styles.row}>
              <SupportButton
                label={"Incidencias (" + filteredIssues.length + ")"}
                kind={panel === "issues" ? "primary" : "outline"}
                selected={panel === "issues"}
                onPress={() => setPanel("issues")}
              />
              <SupportButton
                label={"Eventos (" + filteredEvents.length + ")"}
                kind={panel === "events" ? "primary" : "outline"}
                selected={panel === "events"}
                onPress={() => setPanel("events")}
              />
            </View>
            {panel === "events" && selectedIssueId !== "all" ? (
              <View style={styles.row}>
                <Text style={styles.meta}>Incidencia: {selectedIssue?.title || selectedIssueId}</Text>
                <SupportButton label="Todos los eventos" onPress={() => setSelectedIssueId("all")} />
              </View>
            ) : null}
          </View>
        )}
        ListEmptyComponent={loading ? <BlockSkeleton lines={6} compact /> : <Text style={styles.meta}>{noResults}</Text>}
        renderItem={({ item: entry }) => {
          if (entry.type === "issue") {
            const issue = entry.item;
            return (
              <SupportDiagnosticItem
                title={issue.title || issue.id}
                badge={<LevelBadge level={issue.level} />}
                selected={selectedIssueId === issue.id}
                onPress={() => {
                  setSelectedIssueId(issue.id);
                  setPanel("events");
                }}
              >
                <Text style={styles.meta}>{issue.status || "Sin estado"} · Total: {issue.count_total ?? 0} · 24 h: {issue.count_24h ?? 0}</Text>
                <Text style={styles.meta}>Último registro: {formatDateTime(issue.last_seen_at)}</Text>
                {issue.last_release ? <Text style={styles.meta}>Versión: {issue.last_release}</Text> : null}
                {issue.last_user_display_name || issue.last_user_email ? (
                  <Text style={styles.meta}>Usuario: {[issue.last_user_display_name, issue.last_user_email].filter(Boolean).join(" · ")}</Text>
                ) : null}
              </SupportDiagnosticItem>
            );
          }
          const event = entry.item;
          return (
            <SupportDiagnosticItem title={event.message || event.event_type || "Evento"} badge={<LevelBadge level={event.level} />}>
              <Text style={styles.meta}>{event.event_type || "Sin tipo"} · {formatDateTime(event.occurred_at)}</Text>
              {event.issue_id ? (
                <Text style={styles.meta}>Incidencia: {issueMap.get(event.issue_id)?.title || event.issue_id}</Text>
              ) : null}
              <Text style={styles.meta}>Código: {event.error_code || "—"} · App: {event.app_id || "—"} · Versión: {event.release_version_label || "—"}</Text>
              {event.user_display_name || event.user_email ? (
                <Text style={styles.meta}>Usuario: {[event.user_display_name, event.user_email].filter(Boolean).join(" · ")}</Text>
              ) : null}
            </SupportDiagnosticItem>
          );
        }}
      />
    </ScreenScaffold>
  );
}
