import React, { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { supabase } from "@shared/services/mobileApi";
import { useAppStore } from "@shared/store/appStore";
import {
  fetchBranchesByBusinessId,
  fetchBusinessByUserId,
  fetchCurrentUserRow,
  fetchPromosByBusinessId,
  formatDateTime,
  readFirst,
} from "@shared/services/entityQueries";

export default function NegocioGestionarScreen() {
  const onboarding = useAppStore((state) => state.onboarding);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [promos, setPromos] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [businessId, setBusinessId] = useState<string>("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    const onboardingUserId = onboarding?.usuario?.id || null;
    let userId = onboardingUserId;
    if (!userId) {
      const current = await fetchCurrentUserRow(supabase);
      userId = current.ok ? current.data?.id : null;
    }
    if (!userId) {
      setLoading(false);
      setError("No se pudo cargar usuario.");
      return;
    }

    const businessResult = await fetchBusinessByUserId(supabase, userId);
    if (!businessResult.ok || !businessResult.data?.id) {
      setLoading(false);
      setError(businessResult.error || "No se encontro negocio.");
      return;
    }

    setBusinessId(String(businessResult.data.id));
    const [promosResult, branchesResult] = await Promise.all([
      fetchPromosByBusinessId(supabase, businessResult.data.id, 25),
      fetchBranchesByBusinessId(supabase, businessResult.data.id, 25),
    ]);
    setPromos(promosResult.ok ? promosResult.data : []);
    setBranches(branchesResult.ok ? branchesResult.data : []);
    setLoading(false);
  }, [onboarding?.usuario?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <ScreenScaffold title="Gestionar negocio" subtitle="Promos, sucursales y estado actual">
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard
          title="Control rapido"
          subtitle={businessId ? `Negocio ID: ${businessId}` : "Sin negocio cargado"}
          right={
            <Pressable onPress={loadData} style={styles.refreshButton}>
              <Text style={styles.refreshText}>Recargar</Text>
            </Pressable>
          }
        >
          {loading ? <BlockSkeleton lines={3} compact /> : null}
          {!loading && error ? <Text style={styles.error}>{error}</Text> : null}
          {!loading && !error ? (
            <View style={styles.kpiRow}>
              <View style={styles.kpiCard}>
                <Text style={styles.kpiLabel}>Promos</Text>
                <Text style={styles.kpiValue}>{promos.length}</Text>
              </View>
              <View style={styles.kpiCard}>
                <Text style={styles.kpiLabel}>Sucursales</Text>
                <Text style={styles.kpiValue}>{branches.length}</Text>
              </View>
            </View>
          ) : null}
        </SectionCard>

        <SectionCard title="Promociones del negocio">
          {loading ? <BlockSkeleton lines={5} compact /> : null}
          {!loading && !error && promos.length === 0 ? (
            <Text style={styles.emptyText}>Aun no hay promociones.</Text>
          ) : null}
          {!loading && !error
            ? promos.slice(0, 10).map((promo, index) => (
                <View key={`${readFirst(promo, ["id", "public_id"], index)}-${index}`} style={styles.item}>
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {String(readFirst(promo, ["titulo", "nombre", "descripcion"], `Promo ${index + 1}`))}
                  </Text>
                  <Text style={styles.itemMeta}>
                    Estado: {String(readFirst(promo, ["estado", "status"], "sin_estado"))}
                  </Text>
                  <Text style={styles.itemMeta}>
                    {formatDateTime(readFirst(promo, ["created_at", "updated_at"], null))}
                  </Text>
                </View>
              ))
            : null}
        </SectionCard>

        <SectionCard title="Sucursales">
          {loading ? <BlockSkeleton lines={4} compact /> : null}
          {!loading && !error && branches.length === 0 ? (
            <Text style={styles.emptyText}>Aun no hay sucursales registradas.</Text>
          ) : null}
          {!loading && !error
            ? branches.slice(0, 10).map((branch, index) => (
                <View key={`${readFirst(branch, ["id"], index)}-${index}`} style={styles.item}>
                  <Text style={styles.itemTitle}>
                    {String(readFirst(branch, ["tipo"], "sucursal"))}
                  </Text>
                  <Text style={styles.itemMeta}>
                    Estado: {String(readFirst(branch, ["status"], "draft"))}
                  </Text>
                  <Text style={styles.itemMeta}>
                    Horarios: {readFirst(branch, ["horarios"], null) ? "configurados" : "sin horario"}
                  </Text>
                </View>
              ))
            : null}
        </SectionCard>
      </ScrollView>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 12,
    paddingBottom: 20,
  },
  refreshButton: {
    backgroundColor: "#F4EEFF",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  refreshText: {
    color: "#5B21B6",
    fontWeight: "700",
    fontSize: 12,
  },
  error: {
    color: "#B91C1C",
    fontSize: 12,
    fontWeight: "600",
  },
  kpiRow: {
    flexDirection: "row",
    gap: 8,
  },
  kpiCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#FAFBFF",
  },
  kpiLabel: {
    fontSize: 11,
    color: "#6B7280",
    textTransform: "uppercase",
  },
  kpiValue: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: "700",
    color: "#181B2A",
  },
  emptyText: {
    color: "#6B7280",
    fontSize: 12,
  },
  item: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 2,
  },
  itemTitle: {
    color: "#181B2A",
    fontWeight: "700",
    fontSize: 12,
  },
  itemMeta: {
    color: "#6B7280",
    fontSize: 11,
  },
});
