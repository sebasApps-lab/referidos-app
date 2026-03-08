import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { supabase } from "@shared/services/mobileApi";
import {
  fetchSupportIssueEventsContext,
  fetchSupportIssuesContext,
} from "@shared/services/supportDeskQueries";
import { formatDateTime } from "@shared/services/entityQueries";

function levelStyle(level: string) {
  if (level === "fatal" || level === "error") return styles.levelError;
  if (level === "warn") return styles.levelWarn;
  return styles.levelInfo;
}

export default function SoporteIssuesScreen() {
  const [issues, setIssues] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedIssueId, setSelectedIssueId] = useState("all");

  const loadData = useCallback(async () => {
    const [issuesRes, eventsRes] = await Promise.all([
      fetchSupportIssuesContext(supabase, 150),
      fetchSupportIssueEventsContext(supabase, 200),
    ]);

    if (!issuesRes.ok || !eventsRes.ok) {
      setError(
        issuesRes.error || eventsRes.error || "No se pudieron cargar issues/eventos.",
      );
      setIssues([]);
      setEvents([]);
      setLoading(false);
      return;
    }

    setIssues(issuesRes.data || []);
    setEvents(eventsRes.data || []);
    setError("");
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    void loadData();
  }, [loadData]);

  const issueMap = useMemo(
    () =>
      issues.reduce((acc: Record<string, any>, issue: any) => {
        acc[issue.id] = issue;
        return acc;
      }, {}),
    [issues],
  );

  const filteredIssues = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return issues;
    return issues.filter((issue) => {
      const haystack = [
        issue.title,
        issue.id,
        issue.level,
        issue.status,
        issue.last_release,
        issue.last_user_display_name,
        issue.last_user_email,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [issues, query]);

  const filteredEvents = useMemo(() => {
    const term = query.trim().toLowerCase();
    return events.filter((event) => {
      if (selectedIssueId !== "all" && event.issue_id !== selectedIssueId) return false;
      if (!term) return true;
      const haystack = [
        event.issue_id,
        event.message,
        event.error_code,
        event.event_type,
        event.level,
        event.app_id,
        event.release_version_label,
        event.user_display_name,
        event.user_email,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [events, query, selectedIssueId]);

  return (
    <ScreenScaffold
      title="Soporte Issues"
      subtitle="Issues y eventos de observabilidad relacionados con soporte"
    >
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard
          title="Busqueda"
          subtitle="Filtra por issue, mensaje, code, app o release"
          right={
            <Pressable onPress={loadData} disabled={loading} style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>{loading ? "..." : "Recargar"}</Text>
            </Pressable>
          }
        >
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar issues o eventos"
            style={styles.input}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </SectionCard>

        <SectionCard title="Issues" subtitle={`${filteredIssues.length} registros`}>
          {loading ? <BlockSkeleton lines={6} compact /> : null}
          {!loading ? (
            <View style={styles.filtersWrap}>
              <IssueFilterChip
                active={selectedIssueId === "all"}
                label="Todos"
                onPress={() => setSelectedIssueId("all")}
              />
              {filteredIssues.slice(0, 12).map((issue) => (
                <IssueFilterChip
                  key={issue.id}
                  active={selectedIssueId === issue.id}
                  label={issue.title || issue.id}
                  onPress={() => setSelectedIssueId(issue.id)}
                />
              ))}
            </View>
          ) : null}
          {!loading && filteredIssues.length === 0 ? (
            <Text style={styles.emptyText}>No hay issues para el filtro actual.</Text>
          ) : null}
          {!loading
            ? filteredIssues.slice(0, 30).map((issue) => (
                <View key={issue.id} style={styles.itemCard}>
                  <View style={styles.itemTop}>
                    <Text style={styles.itemTitle}>{issue.title}</Text>
                    <Text style={[styles.levelBadge, levelStyle(String(issue.level || "info"))]}>
                      {String(issue.level || "info").toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.itemMeta}>
                    status: {issue.status || "-"} | total: {issue.count_total || 0} | 24h:{" "}
                    {issue.count_24h || 0}
                  </Text>
                  <Text style={styles.itemMeta}>
                    ultimo release: {issue.last_release || "-"} | ultimo usuario:{" "}
                    {issue.last_user_display_name || issue.last_user_email || "-"}
                  </Text>
                  <Text style={styles.itemMeta}>
                    ultimo visto: {formatDateTime(issue.last_seen_at)}
                  </Text>
                </View>
              ))
            : null}
        </SectionCard>

        <SectionCard title="Eventos" subtitle={`${filteredEvents.length} registros`}>
          {loading ? <BlockSkeleton lines={8} compact /> : null}
          {!loading && filteredEvents.length === 0 ? (
            <Text style={styles.emptyText}>No hay eventos para el filtro actual.</Text>
          ) : null}
          {!loading
            ? filteredEvents.slice(0, 40).map((event) => (
                <View key={event.id} style={styles.itemCard}>
                  <View style={styles.itemTop}>
                    <Text style={styles.itemTitle}>{event.message || "-"}</Text>
                    <Text style={[styles.levelBadge, levelStyle(String(event.level || "info"))]}>
                      {String(event.level || "info").toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.itemMeta}>
                    issue: {issueMap[event.issue_id]?.title || event.issue_id || "-"}
                  </Text>
                  <Text style={styles.itemMeta}>
                    tipo: {event.event_type || "-"} | code: {event.error_code || "-"}
                  </Text>
                  <Text style={styles.itemMeta}>
                    app: {event.app_id || "-"} | release: {event.release_version_label || "-"}
                  </Text>
                  <Text style={styles.itemMeta}>
                    usuario: {event.user_display_name || event.user_email || "-"}
                  </Text>
                  <Text style={styles.itemMeta}>
                    fecha: {formatDateTime(event.occurred_at)}
                  </Text>
                </View>
              ))
            : null}
        </SectionCard>
      </ScrollView>
    </ScreenScaffold>
  );
}

function IssueFilterChip({
  active,
  label,
  onPress,
}: {
  active: boolean;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.chipText, active && styles.chipTextActive]} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
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
  filtersWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    maxWidth: "100%",
  },
  chipActive: {
    borderColor: "#5B21B6",
    backgroundColor: "#F5F3FF",
  },
  chipText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#334155",
  },
  chipTextActive: {
    color: "#5B21B6",
  },
  itemCard: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 10,
    gap: 3,
  },
  itemTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  itemTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },
  itemMeta: {
    fontSize: 11,
    color: "#64748B",
  },
  levelBadge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 10,
    fontWeight: "700",
    overflow: "hidden",
  },
  levelError: {
    backgroundColor: "#FEE2E2",
    color: "#B91C1C",
  },
  levelWarn: {
    backgroundColor: "#FEF3C7",
    color: "#B45309",
  },
  levelInfo: {
    backgroundColor: "#E2E8F0",
    color: "#475569",
  },
  emptyText: {
    fontSize: 12,
    color: "#64748B",
  },
  errorText: {
    fontSize: 12,
    color: "#B91C1C",
    fontWeight: "600",
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#1D4ED8",
    backgroundColor: "#EFF6FF",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  secondaryBtnText: {
    color: "#1D4ED8",
    fontSize: 12,
    fontWeight: "700",
  },
});
