import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import AdminCollectionScreen from "./components/AdminCollectionScreen";
import SectionCard from "@shared/ui/SectionCard";
import { fetchAdminIssueEventDetail } from "@shared/services/adminOps";
import { formatDateTime, readFirst } from "@shared/services/entityQueries";
import { adminRuntimeStyles as shared } from "./components/adminRuntimeStyles";

function safeJson(value: any) {
  try {
    return JSON.stringify(value ?? null, null, 2);
  } catch {
    return "{}";
  }
}

export default function AdminIssueEventDetailScreen() {
  const route = useRoute<any>();
  const issueId = String(route?.params?.issueId || "").trim();
  const eventId = String(route?.params?.eventId || "").trim();
  const issueTitle = String(route?.params?.issueTitle || "").trim();
  const [row, setRow] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadRow = useCallback(async () => {
    if (!eventId) {
      setRow(null);
      setError("Falta eventId.");
      setLoading(false);
      return;
    }
    if (!refreshing) setLoading(true);
    const result = await fetchAdminIssueEventDetail(eventId);
    if (!result.ok) {
      setRow(null);
      setError(result.error || "No se pudo cargar el detalle del evento.");
      setLoading(false);
      return;
    }
    setRow(result.data || null);
    setError("");
    setLoading(false);
  }, [eventId, refreshing]);

  const refreshAll = useCallback(async () => {
    setRefreshing(true);
    await loadRow();
    setRefreshing(false);
  }, [loadRow]);

  useEffect(() => {
    void refreshAll();
  }, [refreshAll]);

  const metrics = useMemo(() => {
    return [
      { label: "Issue", value: issueId || "-" },
      { label: "Evento", value: eventId || "-" },
      { label: "Nivel", value: String(readFirst(row, ["level"], "-")) },
    ];
  }, [eventId, issueId, row]);

  return (
    <AdminCollectionScreen
      title="Admin Event Detail"
      subtitle={issueTitle || "Detalle completo del evento"}
      loading={loading}
      refreshing={refreshing}
      error={error}
      metrics={metrics}
      onRefresh={() => void refreshAll()}
    >
      <SectionCard title="Identidad" subtitle={String(readFirst(row, ["event_type"], "event"))}>
        <Text style={shared.metaText}>eventId: {eventId || "-"}</Text>
        <Text style={shared.metaText}>issueId: {issueId || "-"}</Text>
        <Text style={shared.metaText}>
          nivel: {String(readFirst(row, ["level"], "-"))}
        </Text>
        <Text style={shared.metaText}>
          codigo: {String(readFirst(row, ["error_code"], "-"))}
        </Text>
        <Text style={shared.metaText}>
          fecha: {formatDateTime(readFirst(row, ["occurred_at", "created_at"], null))}
        </Text>
      </SectionCard>

      <SectionCard title="Mensaje">
        <Text style={shared.bodyText}>
          {String(readFirst(row, ["message"], "Sin mensaje"))}
        </Text>
      </SectionCard>

      <SectionCard title="Contexto tecnico" subtitle="Release, request, trace y usuario">
        <Text style={shared.metaText}>
          request: {String(readFirst(row, ["request_id"], "-"))}
        </Text>
        <Text style={shared.metaText}>
          trace: {String(readFirst(row, ["trace_id"], "-"))}
        </Text>
        <Text style={shared.metaText}>
          session: {String(readFirst(row, ["session_id"], "-"))}
        </Text>
        <Text style={shared.metaText}>
          app: {String(readFirst(row, ["app_id"], "-"))}
        </Text>
        <Text style={shared.metaText}>
          release: {String(readFirst(row, ["release_version_label"], "-"))}
        </Text>
        <Text style={shared.metaText}>
          component: {String(readFirst(row, ["resolved_component_key"], "-"))}
        </Text>
        <Text style={shared.metaText}>
          usuario: {String(readFirst(row, ["user_display_name", "user_email"], "-"))}
        </Text>
      </SectionCard>

      <SectionCard title="Stack preview">
        <View style={shared.jsonBox}>
          <Text style={shared.jsonText}>
            {String(readFirst(row, ["stack_preview", "stack_raw"], "Sin stack"))}
          </Text>
        </View>
      </SectionCard>

      <SectionCard title="Context JSON">
        <View style={shared.jsonBox}>
          <Text style={shared.jsonText}>{safeJson(readFirst(row, ["context"], {}))}</Text>
        </View>
      </SectionCard>

      <SectionCard title="Release / Device / UserRef">
        <View style={shared.jsonBox}>
          <Text style={shared.jsonText}>
            {safeJson({
              release: readFirst(row, ["release"], null),
              device: readFirst(row, ["device"], null),
              user_ref: readFirst(row, ["user_ref"], null),
              breadcrumbs: readFirst(row, ["breadcrumbs"], null),
              support_context_extra: readFirst(row, ["support_context_extra"], null),
            })}
          </Text>
        </View>
      </SectionCard>
    </AdminCollectionScreen>
  );
}
