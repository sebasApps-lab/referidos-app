import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import StaffSelect from "@features/staff/StaffSelect";
import StaffSectionCard from "@features/staff/StaffSectionCard";
import StaffTable, { StaffTableBadge, type StaffTableColumn } from "@features/staff/StaffTable";
import StaffTablePage, { StaffTableDetails, tableText } from "@features/staff/StaffTablePage";
import { fetchAdminNegocios } from "@shared/services/adminOps";
import { formatDateTime, readFirst } from "@shared/services/entityQueries";

const BUSINESS_STATUSES = [
  { id: "todos", label: "Todos" },
  { id: "activo", label: "Activo" },
  { id: "inactivo", label: "Inactivo" },
  { id: "suspendido", label: "Suspendido" },
] as const;

function businessView(row: Record<string, unknown>) {
  return {
    id: String(readFirst(row, ["id", "public_id"], "")),
    publicId: String(readFirst(row, ["public_id", "id"], "—")),
    name: String(readFirst(row, ["nombre", "razon_social", "name"], "Negocio")),
    sector: String(readFirst(row, ["sector", "categoria"], "")).trim(),
    status: String(readFirst(row, ["estado", "status", "account_status"], "activo")).trim().toLowerCase(),
    address: String(readFirst(row, ["direccion", "ubicacion"], "")),
    owner: String(readFirst(row, ["propietario_nombre", "nombre_propietario", "usuarioid", "usuario_id"], "Sin propietario")),
    createdAt: readFirst(row, ["created_at", "fecha_creacion", "fechacreacion"], null),
    promos: String(readFirst(row, ["promos_activas", "promosActivas", "promosactivas"], "—")),
    branches: String(readFirst(row, ["sucursales_count", "sucursalesCount", "sucursalescount"], "—")),
  };
}

type Business = ReturnType<typeof businessView>;

function businessTone(status: string) {
  if (status === "activo") return "positive";
  if (status === "suspendido") return "danger";
  return status === "inactivo" ? "warning" : "neutral";
}

export default function AdminNegociosScreen() {
  const { width } = useWindowDimensions();
  const [rows, setRows] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState<(typeof BUSINESS_STATUSES)[number]["id"]>("todos");
  const [selectedId, setSelectedId] = useState("");

  const loadRows = useCallback(async () => {
    try {
      const result = await fetchAdminNegocios(100);
      if (result.ok) {
        setRows((result.data || []).map(businessView));
        setError("");
      } else {
        setError(result.error || "No se pudieron cargar los negocios.");
      }
    } catch {
      setError("No se pudieron cargar los negocios.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadRows(); }, [loadRows]);

  const refreshAll = useCallback(async () => {
    setRefreshing(true);
    try { await loadRows(); } finally { setRefreshing(false); }
  }, [loadRows]);

  const sectors = useMemo(() => Array.from(new Set(rows.map((row) => row.sector).filter(Boolean)))
    .sort((left, right) => left.localeCompare(right, "es")), [rows]);
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return rows.filter((row) => (
      (sectorFilter === "todos" || row.sector === sectorFilter) &&
      (statusFilter === "todos" || row.status === statusFilter) &&
      [row.name, row.address, row.owner].some((value) => value.toLowerCase().includes(term))
    ));
  }, [query, rows, sectorFilter, statusFilter]);
  const selected = selectedId ? rows.find((row) => row.id === selectedId) : null;
  const activeCount = rows.filter((row) => row.status === "activo").length;
  const withAddress = rows.filter((row) => row.address).length;

  const columns: StaffTableColumn<Business>[] = [
    { key: "business", label: "Negocio", width: 167, render: (row) => (
      <Pressable accessibilityRole="button" onPress={() => setSelectedId(row.id)}>
        <Text style={tableText.name} numberOfLines={2}>{row.name}</Text>
        <Text style={tableText.metadata} numberOfLines={1}>{row.publicId}</Text>
      </Pressable>
    ) },
    { key: "sector", label: "Sector", width: 122, render: (row) => <Text style={tableText.metadata}>{row.sector || "—"}</Text> },
    { key: "status", label: "Estado", width: 120, render: (row) => <StaffTableBadge value={row.status} tone={businessTone(row.status)} /> },
    { key: "promos", label: "Promos", width: 90, render: (row) => <Text style={tableText.metadata}>{row.promos}</Text> },
  ];
  if (width >= 768) columns.push({ key: "branches", label: "Sucursales", width: 108, render: (row) => <Text style={tableText.metadata}>{row.branches}</Text> });
  columns.push({ key: "action", label: "Acciones", width: 126, align: "right", render: (row) => (
    <Pressable accessibilityRole="button" accessibilityLabel={`Ver detalle de ${row.name}`} onPress={() => setSelectedId(row.id)} style={tableText.action}>
      <Text style={tableText.actionLabel}>Ver detalle</Text>
    </Pressable>
  ) });

  return (
    <>
      <StaffTablePage
        title="Negocios"
        subtitle="Supervisión de locales y sucursales"
        description="Vista global de negocios y actividad."
        searchPlaceholder="Buscar negocio"
        query={query}
        onChangeQuery={setQuery}
        loading={loading}
        error={error}
        onRefresh={loading || refreshing ? undefined : refreshAll}
        filters={(
          <>
            <StaffSelect label="Sector" value={sectorFilter} options={[{ id: "todos", label: "Todos" }, ...sectors.map((sector) => ({ id: sector, label: sector }))]} onSelect={setSectorFilter} />
            <StaffSelect label="Estado" value={statusFilter} options={BUSINESS_STATUSES} onSelect={setStatusFilter} />
          </>
        )}
      >
        <StaffTable columns={columns} rows={filtered} getKey={(row) => row.id} emptyMessage="No hay negocios para los filtros actuales." />
        {rows.length > 0 && <Text style={tableText.metadata}>{filtered.length} de {rows.length} negocios · {activeCount} activos · {withAddress} con dirección</Text>}
      </StaffTablePage>
      {selected && (
        <StaffTableDetails caption="Negocio" title={selected.name} onClose={() => setSelectedId("")}>
          <View style={tableText.badges}>
            {selected.sector !== "" && <StaffTableBadge value={selected.sector} tone="purple" />}
            <StaffTableBadge value={selected.status} tone={businessTone(selected.status)} />
          </View>
          <StaffSectionCard title="Datos generales">
            <Text style={tableText.metadata}>ID: {selected.publicId}</Text>
            <Text style={tableText.metadata}>Propietario: {selected.owner}</Text>
            <Text style={tableText.metadata}>Promos activas: {selected.promos}</Text>
            <Text style={tableText.metadata}>Sucursales: {selected.branches}</Text>
            <Text style={tableText.metadata}>Alta: {formatDateTime(selected.createdAt)}</Text>
          </StaffSectionCard>
          <StaffSectionCard title="Ubicación">
            <Text style={tableText.metadata}>{selected.address || "Sin dirección"}</Text>
          </StaffSectionCard>
        </StaffTableDetails>
      )}
    </>
  );
}
