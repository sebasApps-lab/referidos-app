import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import AdminCollectionScreen from "./components/AdminCollectionScreen";
import SectionCard from "@shared/ui/SectionCard";
import { fetchAdminNegocios } from "@shared/services/adminOps";
import { formatDateTime, readFirst } from "@shared/services/entityQueries";
import { adminRuntimeStyles as shared } from "./components/adminRuntimeStyles";

export default function AdminNegociosScreen() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("todos");

  const loadRows = useCallback(async () => {
    if (!refreshing) setLoading(true);
    const result = await fetchAdminNegocios(100);
    if (!result.ok) {
      setRows([]);
      setError(result.error || "No se pudo cargar negocios.");
      setLoading(false);
      return;
    }
    setRows(result.data || []);
    setError("");
    setLoading(false);
  }, [refreshing]);

  const refreshAll = useCallback(async () => {
    setRefreshing(true);
    await loadRows();
    setRefreshing(false);
  }, [loadRows]);

  useEffect(() => {
    void refreshAll();
  }, [refreshAll]);

  const sectors = useMemo(() => {
    return Array.from(
      new Set(
        rows
          .map((row) => String(readFirst(row, ["sector", "categoria"], "")).trim())
          .filter(Boolean),
      ),
    ).sort((a, b) => a.localeCompare(b));
  }, [rows]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return rows.filter((row) => {
      const nombre = String(readFirst(row, ["nombre", "razon_social", "name"], "")).toLowerCase();
      const sector = String(readFirst(row, ["sector", "categoria"], "")).trim();
      const status = String(readFirst(row, ["estado", "status", "account_status"], "activo")).trim();
      const direccion = String(readFirst(row, ["direccion", "ubicacion"], "")).toLowerCase();
      const owner = String(readFirst(row, ["usuarioid", "usuario_id"], "")).toLowerCase();
      const matchesQuery =
        !term ||
        nombre.includes(term) ||
        direccion.includes(term) ||
        owner.includes(term);
      const matchesSector = sectorFilter === "todos" || sector === sectorFilter;
      const matchesStatus = statusFilter === "todos" || status === statusFilter;
      return matchesQuery && matchesSector && matchesStatus;
    });
  }, [query, rows, sectorFilter, statusFilter]);

  const metrics = useMemo(() => {
    const activeCount = rows.filter((row) =>
      String(readFirst(row, ["estado", "status", "account_status"], "activo")).trim().toLowerCase() === "activo",
    ).length;
    const withAddress = rows.filter((row) => Boolean(readFirst(row, ["direccion", "ubicacion"], ""))).length;
    return [
      { label: "Total", value: rows.length },
      { label: "Activos", value: activeCount },
      { label: "Con direccion", value: withAddress },
      { label: "Filtrados", value: filtered.length },
    ];
  }, [filtered.length, rows]);

  const filters = useMemo(() => {
    return [
      {
        title: "Sector",
        selectedId: sectorFilter,
        onSelect: setSectorFilter,
        options: [
          { id: "todos", label: "Todos" },
          ...sectors.map((sector) => ({ id: sector, label: sector })),
        ],
      },
      {
        title: "Estado",
        selectedId: statusFilter,
        onSelect: setStatusFilter,
        options: [
          { id: "todos", label: "Todos" },
          { id: "activo", label: "Activo" },
          { id: "inactivo", label: "Inactivo" },
          { id: "suspendido", label: "Suspendido" },
        ],
      },
    ];
  }, [sectorFilter, sectors, statusFilter]);

  return (
    <AdminCollectionScreen
      title="Admin Negocios"
      subtitle="Supervision de locales y sucursales"
      searchPlaceholder="Buscar negocio, direccion o propietario"
      query={query}
      onQueryChange={setQuery}
      loading={loading}
      refreshing={refreshing}
      error={error}
      metrics={metrics}
      filters={filters}
      onRefresh={() => void refreshAll()}
      emptyText={!loading && filtered.length === 0 ? "No hay negocios para este filtro." : ""}
    >
      <SectionCard title="Listado" subtitle={`Negocios encontrados: ${filtered.length}`}>
        {filtered.length === 0 && !loading ? (
          <Text style={shared.emptyText}>Sin negocios disponibles.</Text>
        ) : null}
        <View style={shared.listWrap}>
          {filtered.map((row, index) => {
            const nombre = String(readFirst(row, ["nombre", "razon_social", "name"], "Negocio"));
            const publicId = String(readFirst(row, ["public_id", "id"], "-"));
            const sector = String(readFirst(row, ["sector", "categoria"], "sin sector"));
            const status = String(readFirst(row, ["estado", "status", "account_status"], "activo"));
            const direccion = String(readFirst(row, ["direccion", "ubicacion"], "Sin direccion"));
            const owner = String(readFirst(row, ["usuarioid", "usuario_id"], "sin propietario"));
            return (
              <View key={`${publicId}-${index}`} style={shared.card}>
                <Text style={shared.cardTitle}>{nombre}</Text>
                <View style={shared.badgeRow}>
                  <View style={shared.codePill}>
                    <Text style={shared.codePillText}>{publicId}</Text>
                  </View>
                  <View style={shared.badge}>
                    <Text style={shared.badgeText}>{status}</Text>
                  </View>
                </View>
                <Text style={shared.metaText}>sector: {sector}</Text>
                <Text style={shared.metaText}>direccion: {direccion}</Text>
                <Text style={shared.metaText}>propietario/base: {owner}</Text>
                <Text style={shared.metaText}>
                  alta: {formatDateTime(readFirst(row, ["created_at"], null))}
                </Text>
              </View>
            );
          })}
        </View>
      </SectionCard>
    </AdminCollectionScreen>
  );
}
