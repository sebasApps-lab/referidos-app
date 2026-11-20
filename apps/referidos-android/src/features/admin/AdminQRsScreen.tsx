import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import StaffSectionCard from "@features/staff/StaffSectionCard";
import StaffSelect from "@features/staff/StaffSelect";
import StaffTable, { StaffTableBadge, type StaffTableColumn } from "@features/staff/StaffTable";
import StaffTablePage, { StaffTableDetails, tableText } from "@features/staff/StaffTablePage";
import { fetchAdminQrs } from "@shared/services/adminOps";
import { formatDateTime, readFirst } from "@shared/services/entityQueries";

const QR_STATUS_OPTIONS = [
  { id: "todos", label: "Todos" },
  { id: "valido", label: "Válido" },
  { id: "canjeado", label: "Canjeado" },
  { id: "expirado", label: "Expirado" },
] as const;

type StatusFilter = (typeof QR_STATUS_OPTIONS)[number]["id"];

function qrView(row: Record<string, unknown>) {
  const id = String(readFirst(row, ["id"], "")).trim();
  const code = String(readFirst(row, ["code", "codigo", "token"], "")).trim();
  const clientId = String(readFirst(row, ["clienteid", "cliente_id"], ""));
  const businessId = String(readFirst(row, ["negocioid", "negocio_id"], ""));
  return {
    key: id || code,
    reference: id || code || "—",
    code,
    promo: String(readFirst(row, ["promo_titulo", "promo_title", "promoid", "promo_id"], "—")),
    client: String(readFirst(row, ["cliente_nombre"], clientId || "—")),
    business: String(readFirst(row, ["negocio_nombre"], businessId || "—")),
    clientId,
    businessId,
    status: String(readFirst(row, ["estado", "status"], "")).trim().toLowerCase(),
    createdAt: readFirst(row, ["created_at", "fechacreacion", "fecha_creacion", "fecha"], null),
    expiresAt: readFirst(row, ["expires_at", "fecha_expira", "fechaexpira"], null),
    redeemedAt: readFirst(row, ["redeemed_at", "fecha_canje", "fechacanje"], null),
  };
}

type Qr = ReturnType<typeof qrView>;

function qrStatusLabel(status: string) {
  return QR_STATUS_OPTIONS.find((item) => item.id === status)?.label || status || "Sin estado";
}

function qrStatusTone(status: string) {
  if (status === "valido") return "positive";
  if (status === "canjeado") return "purple";
  return status === "expirado" ? "danger" : "neutral";
}

export default function AdminQRsScreen() {
  const { width } = useWindowDimensions();
  const [rows, setRows] = useState<Qr[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos");
  const [selectedKey, setSelectedKey] = useState("");
  const activeRequest = useRef(false);

  const loadRows = useCallback(async (manual = false) => {
    if (activeRequest.current) return;
    activeRequest.current = true;
    if (manual) setRefreshing(true);
    try {
      const result = await fetchAdminQrs(120);
      if (result.ok) {
        setRows((result.data || []).map(qrView));
        setError("");
      } else {
        setError(result.error || "No se pudieron cargar los QRs.");
      }
    } catch {
      setError("No se pudieron cargar los QRs.");
    } finally {
      activeRequest.current = false;
      setLoading(false);
      if (manual) setRefreshing(false);
    }
  }, []);

  useEffect(() => { void loadRows(); }, [loadRows]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return rows.filter((row) => (
      (statusFilter === "todos" || row.status === statusFilter) &&
      [row.reference, row.code, row.client, row.clientId, row.business, row.businessId]
        .some((value) => value.toLowerCase().includes(term))
    ));
  }, [query, rows, statusFilter]);
  const selected = selectedKey ? rows.find((row) => row.key === selectedKey) : null;
  const validTotal = rows.filter((row) => row.status === "valido").length;
  const redeemedTotal = rows.filter((row) => row.status === "canjeado").length;
  const expiredTotal = rows.filter((row) => row.status === "expirado").length;

  const columns: StaffTableColumn<Qr>[] = [
    { key: "qr", label: "QR", width: 154, render: (row) => (
      <Pressable accessibilityRole="button" accessibilityLabel={`Ver QR ${row.reference}`}
        disabled={!row.key} onPress={() => setSelectedKey(row.key)}>
        <Text style={tableText.name} numberOfLines={1}>{row.reference}</Text>
        <Text style={tableText.metadata} numberOfLines={1}>{row.promo}</Text>
      </Pressable>
    ) },
    { key: "client", label: "Cliente", width: 126, render: (row) => <Text style={tableText.metadata} numberOfLines={2}>{row.client}</Text> },
    { key: "business", label: "Negocio", width: 126, render: (row) => <Text style={tableText.metadata} numberOfLines={2}>{row.business}</Text> },
    { key: "status", label: "Estado", width: 110, render: (row) => (
      <StaffTableBadge value={qrStatusLabel(row.status)} tone={qrStatusTone(row.status)} />
    ) },
  ];
  if (width >= 768) columns.push({ key: "created", label: "Creado", width: 148, render: (row) => (
    <Text style={tableText.metadata}>{formatDateTime(row.createdAt)}</Text>
  ) });
  columns.push({ key: "action", label: "Acciones", width: 114, align: "right", render: (row) => (
    <Pressable accessibilityRole="button" accessibilityLabel={`Ver detalle del QR ${row.reference}`}
      disabled={!row.key} onPress={() => setSelectedKey(row.key)} style={[tableText.action, !row.key && tableText.actionDisabled]}>
      <Text style={tableText.actionLabel}>Detalle</Text>
    </Pressable>
  ) });

  return (
    <>
      <StaffTablePage
        title="QRs"
        subtitle="Auditoría de códigos y canjes"
        description="Estado global de QR válidos y canjeados."
        searchPlaceholder="Buscar QR"
        query={query}
        onChangeQuery={setQuery}
        filters={<StaffSelect label="Estado" value={statusFilter} options={QR_STATUS_OPTIONS} onSelect={setStatusFilter} />}
        loading={loading}
        error={error}
        onRefresh={loading || refreshing ? undefined : () => { void loadRows(true); }}
      >
        <StaffTable columns={columns} rows={filtered} getKey={(row) => row.key} emptyMessage="No hay QRs para los filtros actuales." />
        {rows.length > 0 && (
          <Text style={tableText.metadata}>{filtered.length} de {rows.length} QRs · {validTotal} válidos · {redeemedTotal} canjeados · {expiredTotal} expirados</Text>
        )}
      </StaffTablePage>
      {selected && (
        <StaffTableDetails caption="QR detalle" title={selected.reference} onClose={() => setSelectedKey("")}>
          <View style={tableText.badges}>
            <StaffTableBadge value={selected.promo} tone="purple" />
            <StaffTableBadge value={qrStatusLabel(selected.status)} tone={qrStatusTone(selected.status)} />
          </View>
          <StaffSectionCard title="Contexto">
            {selected.code && selected.code !== selected.reference ? (
              <Text style={tableText.metadata}>Código: {selected.code}</Text>
            ) : null}
            <Text style={tableText.metadata}>Cliente: {selected.client}</Text>
            <Text style={tableText.metadata}>Negocio: {selected.business}</Text>
            <Text style={tableText.metadata}>Creado: {formatDateTime(selected.createdAt)}</Text>
            <Text style={tableText.metadata}>Expira: {formatDateTime(selected.expiresAt)}</Text>
            <Text style={tableText.metadata}>Canje: {formatDateTime(selected.redeemedAt)}</Text>
          </StaffSectionCard>
        </StaffTableDetails>
      )}
    </>
  );
}
