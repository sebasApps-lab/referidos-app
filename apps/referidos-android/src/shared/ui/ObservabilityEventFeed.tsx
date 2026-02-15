import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { observability, supabase } from "@shared/services/mobileApi";
import { fetchObservabilityEvents, formatDateTime } from "@shared/services/entityQueries";

type ObsDomain = "observability" | "support";
type LevelFilter = "all" | "fatal" | "error" | "warn" | "info" | "debug";

type Props = {
  title?: string;
  subtitle?: string;
  defaultDomain?: ObsDomain | "all";
  allowedDomains?: ObsDomain[];
  limit?: number;
  screenTag?: string;
};

const LEVEL_OPTIONS: LevelFilter[] = ["all", "fatal", "error", "warn", "info", "debug"];

function normalizeDomain(value: unknown): ObsDomain | "all" {
  if (value === "support") return "support";
  if (value === "observability") return "observability";
  return "all";
}

function shortId(value: unknown) {
  const text = String(value || "").trim();
  if (!text) return "n/a";
  if (text.length <= 16) return text;
  return `${text.slice(0, 9)}...${text.slice(-4)}`;
}

function readContextObject(value: unknown) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

function toSearchBucket(event: any) {
  const context = readContextObject(event?.context);
  return [
    String(event?.message || ""),
    String(event?.request_id || ""),
    String(event?.trace_id || ""),
    String(event?.session_id || ""),
    String(event?.support_route || ""),
    String(event?.support_screen || ""),
    String(context.route || ""),
    String(context.screen || ""),
    String(event?.event_domain || ""),
  ]
    .join(" ")
    .toLowerCase();
}

function levelChipStyle(level: string) {
  const safeLevel = String(level || "info").toLowerCase();
  if (safeLevel === "fatal" || safeLevel === "error") return styles.levelError;
  if (safeLevel === "warn") return styles.levelWarn;
  if (safeLevel === "debug") return styles.levelDebug;
  return styles.levelInfo;
}

export default function ObservabilityEventFeed({
  title,
  subtitle,
  defaultDomain = "all",
  allowedDomains = ["observability", "support"],
  limit = 40,
  screenTag = "unknown_screen",
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("all");
  const [domainFilter, setDomainFilter] = useState<ObsDomain | "all">(
    normalizeDomain(defaultDomain),
  );

  const domainOptions = useMemo(() => {
    if (!allowedDomains?.length) return ["all", "observability", "support"] as Array<ObsDomain | "all">;
    if (allowedDomains.length === 1) return [allowedDomains[0]] as Array<ObsDomain | "all">;
    return ["all", ...allowedDomains] as Array<ObsDomain | "all">;
  }, [allowedDomains]);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await fetchObservabilityEvents(supabase, {
      limit,
      level: levelFilter === "all" ? null : levelFilter,
      domain: domainFilter === "all" ? null : domainFilter,
    });
    if (!result.ok) {
      const nextError = result.error || "observability_query_failed";
      setEvents([]);
      setError(nextError);
      void observability.track({
        level: "warn",
        category: "audit",
        message: "obs_feed_query_failed",
        context: {
          screen: screenTag,
          error: nextError,
          level_filter: levelFilter,
          domain_filter: domainFilter,
        },
      });
      setLoading(false);
      return;
    }
    setEvents(Array.isArray(result.data) ? result.data : []);
    setLoading(false);
  }, [domainFilter, levelFilter, limit, screenTag]);

  useEffect(() => {
    void loadEvents();
  }, [loadEvents]);

  const filteredEvents = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return events;
    return events.filter((event) => toSearchBucket(event).includes(term));
  }, [events, search]);

  return (
    <View style={styles.root}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}

      <Text style={styles.filterLabel}>Nivel</Text>
      <View style={styles.chipRow}>
        {LEVEL_OPTIONS.map((level) => {
          const active = levelFilter === level;
          return (
            <Pressable
              key={level}
              onPress={() => setLevelFilter(level)}
              style={[styles.chip, active ? styles.chipActive : null]}
            >
              <Text style={[styles.chipText, active ? styles.chipTextActive : null]}>
                {level.toUpperCase()}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.filterLabel}>Dominio</Text>
      <View style={styles.chipRow}>
        {domainOptions.map((domain) => {
          const active = domainFilter === domain;
          return (
            <Pressable
              key={domain}
              onPress={() => setDomainFilter(domain)}
              style={[styles.chip, active ? styles.chipActive : null]}
            >
              <Text style={[styles.chipText, active ? styles.chipTextActive : null]}>
                {String(domain).toUpperCase()}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.searchRow}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar por mensaje / request / trace / session"
          placeholderTextColor="#94A3B8"
          style={styles.searchInput}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Pressable style={styles.refreshButton} onPress={() => void loadEvents()}>
          <Text style={styles.refreshText}>Refrescar</Text>
        </Pressable>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="small" color="#2563EB" />
          <Text style={styles.centeredText}>Cargando eventos...</Text>
        </View>
      ) : null}

      {error ? <Text style={styles.errorText}>Error: {error}</Text> : null}

      {!loading && !error && filteredEvents.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.centeredText}>Sin eventos para los filtros actuales.</Text>
        </View>
      ) : null}

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {filteredEvents.map((event, index) => {
          const context = readContextObject(event?.context);
          const level = String(event?.level || "info").toLowerCase();
          const domain = String(event?.event_domain || "observability");
          const route = String(event?.support_route || context.route || "sin_ruta");
          const screen = String(event?.support_screen || context.screen || "sin_pantalla");
          return (
            <View
              key={String(event?.id || `${event?.occurred_at || "event"}-${index}`)}
              style={styles.card}
            >
              <View style={styles.cardHead}>
                <Text style={[styles.levelChip, levelChipStyle(level)]}>{level.toUpperCase()}</Text>
                <Text style={styles.timeText}>
                  {formatDateTime(event?.occurred_at || event?.created_at)}
                </Text>
              </View>
              <Text style={styles.messageText}>{String(event?.message || "Sin mensaje")}</Text>
              <Text style={styles.metaText}>
                dominio: {domain} | tipo: {String(event?.event_type || "log")}
              </Text>
              <Text style={styles.metaText}>
                ruta: {route} | pantalla: {screen}
              </Text>
              <Text style={styles.metaText}>
                req: {shortId(event?.request_id)} | trace: {shortId(event?.trace_id)} | sesion:{" "}
                {shortId(event?.session_id)}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  subtitle: {
    marginTop: 2,
    marginBottom: 8,
    fontSize: 13,
    color: "#475569",
  },
  filterLabel: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "700",
    color: "#475569",
  },
  chipRow: {
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
  },
  chipActive: {
    borderColor: "#1D4ED8",
    backgroundColor: "#DBEAFE",
  },
  chipText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#334155",
  },
  chipTextActive: {
    color: "#1E3A8A",
  },
  searchRow: {
    marginTop: 4,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    color: "#0F172A",
    fontSize: 13,
  },
  refreshButton: {
    borderWidth: 1,
    borderColor: "#1D4ED8",
    backgroundColor: "#EFF6FF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  refreshText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1D4ED8",
  },
  centered: {
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  centeredText: {
    fontSize: 13,
    color: "#64748B",
  },
  errorText: {
    marginTop: 8,
    color: "#B91C1C",
    fontSize: 12,
    fontWeight: "600",
  },
  list: {
    flex: 1,
    marginTop: 6,
  },
  listContent: {
    gap: 10,
    paddingBottom: 28,
  },
  card: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    gap: 6,
  },
  cardHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  levelChip: {
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 4,
    fontSize: 10,
    fontWeight: "700",
    overflow: "hidden",
  },
  levelError: {
    color: "#991B1B",
    backgroundColor: "#FEE2E2",
  },
  levelWarn: {
    color: "#92400E",
    backgroundColor: "#FEF3C7",
  },
  levelInfo: {
    color: "#1E3A8A",
    backgroundColor: "#DBEAFE",
  },
  levelDebug: {
    color: "#1E293B",
    backgroundColor: "#E2E8F0",
  },
  timeText: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "600",
  },
  messageText: {
    fontSize: 14,
    color: "#0F172A",
    fontWeight: "600",
  },
  metaText: {
    fontSize: 12,
    color: "#475569",
  },
});
