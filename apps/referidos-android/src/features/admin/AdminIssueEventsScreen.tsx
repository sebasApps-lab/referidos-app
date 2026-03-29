import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AdminCollectionScreen from "./components/AdminCollectionScreen";
import SectionCard from "@shared/ui/SectionCard";
import { STACK_ROUTES } from "@navigation/routeKeys";
import { cacheAdminIssue } from "@shared/services/adminOps";
import { supabase } from "@shared/services/mobileApi";
import {
  fetchSupportIssueEventsContext,
  fetchSupportIssuesContext,
} from "@shared/services/supportDeskQueries";
import { formatDateTime, readFirst } from "@shared/services/entityQueries";
import { adminRuntimeStyles as shared } from "./components/adminRuntimeStyles";

export default function AdminIssueEventsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const issueId = String(route?.params?.issueId || "").trim();
  const issueTitleParam = String(route?.params?.issueTitle || "").trim();
  const [issue, setIssue] = useState<any | null>(null);
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);

  const loadRows = useCallback(async () => {
    if (!issueId) {
      setRows([]);
      setIssue(null);
      setError("Falta issueId.");
      setLoading(false);
      return;
    }
    if (!refreshing) setLoading(true);
    const [issuesResult, eventsResult] = await Promise.all([
      fetchSupportIssuesContext(supabase, 180),
      fetchSupportIssueEventsContext(supabase, 400),
    ]);

    const nextIssue = issuesResult.ok
      ? (issuesResult.data || []).find((item: any) => String(readFirst(item, ["id"], "")).trim() === issueId) || null
      : null;
    const nextEvents = eventsResult.ok
      ? (eventsResult.data || []).filter((item: any) => String(readFirst(item, ["issue_id"], "")).trim() === issueId)
      : [];

    setIssue(nextIssue);
    setRows(nextEvents);
    setError(
      (!issuesResult.ok && issuesResult.error) ||
      (!eventsResult.ok && eventsResult.error) ||
      "",
    );
    setLoading(false);
  }, [issueId, refreshing]);

  const refreshAll = useCallback(async () => {
    setRefreshing(true);
    await loadRows();
    setRefreshing(false);
  }, [loadRows]);

  useEffect(() => {
    void refreshAll();
  }, [refreshAll]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return rows.filter((row) => {
      const level = String(readFirst(row, ["level"], "info")).toLowerCase();
      const eventType = String(readFirst(row, ["event_type"], "")).toLowerCase();
      const message = String(readFirst(row, ["message"], "")).toLowerCase();
      const errorCode = String(readFirst(row, ["error_code"], "")).toLowerCase();
      return !term || level.includes(term) || eventType.includes(term) || message.includes(term) || errorCode.includes(term);
    });
  }, [query, rows]);

  const metrics = useMemo(() => {
    const errorLike = rows.filter((row) => {
      const level = String(readFirst(row, ["level"], "info")).trim().toLowerCase();
      return level === "fatal" || level === "error";
    }).length;
    return [
      { label: "Eventos", value: rows.length },
      { label: "Error/Fatal", value: errorLike },
      { label: "Issue", value: issueId || "-" },
    ];
  }, [issueId, rows]);

  const handleCacheIssue = useCallback(async () => {
    if (!issueId) return;
    setBusy(true);
    try {
      await cacheAdminIssue(issueId);
      await refreshAll();
    } catch (cacheError: any) {
      setError(String(cacheError?.message || cacheError || "No se pudo cachear el issue."));
    } finally {
      setBusy(false);
    }
  }, [issueId, refreshAll]);

  return (
    <AdminCollectionScreen
      title="Admin Issue Events"
      subtitle={issue?.title || issueTitleParam || "Eventos del issue seleccionado"}
      searchPlaceholder="Buscar nivel, tipo, mensaje o error code"
      query={query}
      onQueryChange={setQuery}
      loading={loading}
      refreshing={refreshing}
      error={error}
      metrics={metrics}
      onRefresh={() => void refreshAll()}
      headerActions={
        <Pressable
          onPress={() => void handleCacheIssue()}
          disabled={busy}
          style={[shared.secondaryBtn, busy && shared.btnDisabled]}
        >
          <Text style={shared.secondaryBtnText}>{busy ? "Cacheando..." : "Cachear issue (30d)"}</Text>
        </Pressable>
      }
      emptyText={!loading && filtered.length === 0 ? "No hay eventos para este issue." : ""}
    >
      <SectionCard title="Issue seleccionado" subtitle={issueTitleParam || issue?.title || issueId}>
        <Text style={shared.metaText}>issueId: {issueId || "-"}</Text>
        <Text style={shared.metaText}>
          release: {String(readFirst(issue, ["last_release"], "-"))}
        </Text>
        <Text style={shared.metaText}>
          estado: {String(readFirst(issue, ["status"], "-"))}
        </Text>
        <Text style={shared.metaText}>
          usuario: {String(readFirst(issue, ["last_user_display_name", "last_user_email"], "-"))}
        </Text>
      </SectionCard>

      <SectionCard title="Eventos" subtitle={`Eventos encontrados: ${filtered.length}`}>
        <View style={shared.listWrap}>
          {filtered.map((row, index) => {
            const eventId = String(readFirst(row, ["id"], "")).trim();
            return (
              <Pressable
                key={`${eventId || index}-${index}`}
                onPress={() =>
                  navigation.navigate(STACK_ROUTES.ADMIN.ISSUE_EVENT_DETAILS, {
                    issueId,
                    eventId,
                    issueTitle: issueTitleParam || issue?.title || issueId,
                  })
                }
                style={shared.card}
              >
                <Text style={shared.cardTitle}>
                  {String(readFirst(row, ["event_type"], "event"))}
                </Text>
                <View style={shared.badgeRow}>
                  <View style={shared.badge}>
                    <Text style={shared.badgeText}>
                      {String(readFirst(row, ["level"], "info"))}
                    </Text>
                  </View>
                  {readFirst(row, ["error_code"], "") ? (
                    <View style={shared.codePill}>
                      <Text style={shared.codePillText}>
                        {String(readFirst(row, ["error_code"], "-"))}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <Text style={shared.bodyText} numberOfLines={3}>
                  {String(readFirst(row, ["message"], "Sin mensaje"))}
                </Text>
                <Text style={shared.metaText}>
                  app: {String(readFirst(row, ["app_id"], "-"))}
                </Text>
                <Text style={shared.metaText}>
                  release: {String(readFirst(row, ["release_version_label"], "-"))}
                </Text>
                <Text style={shared.metaText}>
                  fecha: {formatDateTime(readFirst(row, ["occurred_at"], null))}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </SectionCard>
    </AdminCollectionScreen>
  );
}
