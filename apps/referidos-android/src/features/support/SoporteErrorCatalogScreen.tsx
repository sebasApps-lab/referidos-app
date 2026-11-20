import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";
import ScreenScaffold from "@features/staff/StaffScreenScaffold";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { supabase } from "@shared/services/mobileApi";
import { fetchSupportErrorCatalog } from "@shared/services/supportDeskQueries";
import { formatDateTime } from "@shared/services/entityQueries";
import { SupportBadge, SupportNotice } from "./SupportTicketUi";
import { SupportDiagnosticItem, SupportSearchBar, supportDetailStyles as styles } from "./SupportDiagnosticsUi";

const EXTRA_KNOWN_CODES = [
  "method_not_allowed",
  "empty_batch",
  "invalid_message",
  "invalid_body",
  "invalid_action",
  "profile_not_found",
  "tenant_missing",
  "issue_upsert_failed",
  "event_insert_failed",
  "event_not_found",
  "issue_not_found",
  "unauthorized",
];

type ErrorRow = {
  id: string;
  error_code: string;
  status?: string;
  count_total?: number;
  source_hint?: string;
  sample_message?: string;
  sample_route?: string;
  sample_context?: { category?: string; description?: string };
  last_seen_at?: string;
  local?: boolean;
};

const localRows: ErrorRow[] = EXTRA_KNOWN_CODES.map((code) => ({ id: "seed-" + code, error_code: code, local: true }));

function StatusBadge({ row }: { row: ErrorRow }) {
  if (row.local) return <SupportBadge>Referencia local</SupportBadge>;
  if (row.status === "defined") return <SupportBadge tone="positive">Definido</SupportBadge>;
  if (row.status === "ignored") return <SupportBadge>Ignorado</SupportBadge>;
  const label = !row.status || row.status === "pending" ? "Pendiente" : row.status;
  return <SupportBadge tone="warning">{label}</SupportBadge>;
}

export default function SoporteErrorCatalogScreen() {
  const [rows, setRows] = useState<ErrorRow[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRows = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await fetchSupportErrorCatalog(supabase, 300);
      if (!result.ok) {
        setRows(localRows);
        setError(result.error || "No se pudo cargar el catálogo.");
        return;
      }
      setRows(result.data.length ? result.data : localRows);
    } catch {
      setRows(localRows);
      setError("No se pudo cargar el catálogo.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadRows(); }, [loadRows]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((row) => [
      row.error_code,
      row.status,
      row.sample_message,
      row.sample_route,
      row.sample_context?.category,
      row.sample_context?.description,
    ].filter(Boolean).join(" ").toLowerCase().includes(term));
  }, [rows, query]);

  return (
    <ScreenScaffold title="Catálogo de errores" onRefresh={loading ? undefined : () => { void loadRows(); }}>
      <FlatList
        data={loading ? [] : filtered}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        ListHeaderComponent={(
          <View style={styles.headerStack}>
            <SupportSearchBar
              value={query}
              onChange={setQuery}
              placeholder="Buscar por código, estado o mensaje"
              loading={loading}
              onRefresh={() => { void loadRows(); }}
            />
            {error ? <SupportNotice tone="warning">{error}</SupportNotice> : null}
            <View style={styles.sectionHeader}>
              <Text accessibilityRole="header" style={styles.heading}>Catálogo</Text>
              {!loading ? <Text style={styles.meta}>{filtered.length} códigos</Text> : null}
            </View>
          </View>
        )}
        ListEmptyComponent={loading ? <BlockSkeleton lines={6} compact /> : <Text style={styles.meta}>No hay códigos para el filtro actual.</Text>}
        renderItem={({ item }) => (
          <SupportDiagnosticItem title={item.error_code} badge={<StatusBadge row={item} />}>
            {item.local ? null : (
              <>
                <Text style={styles.meta}>Categoría: {item.sample_context?.category || "—"} · Fuente: {item.source_hint || "—"}</Text>
                <Text style={styles.meta}>Total: {item.count_total ?? 0} · Último registro: {formatDateTime(item.last_seen_at)}</Text>
                {item.sample_route ? <Text style={styles.meta}>Ruta: {item.sample_route}</Text> : null}
                {item.sample_context?.description || item.sample_message ? (
                  <Text style={styles.description}>{item.sample_context?.description || item.sample_message}</Text>
                ) : null}
              </>
            )}
          </SupportDiagnosticItem>
        )}
      />
    </ScreenScaffold>
  );
}
