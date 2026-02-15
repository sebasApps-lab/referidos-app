import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { supabase } from "@shared/services/mobileApi";
import { useAppStore } from "@shared/store/appStore";
import { TAB_ROUTES } from "@navigation/routeKeys";
import {
  fetchBusinessByUserId,
  fetchBranchesByBusinessId,
  fetchCurrentUserRow,
  fetchPromosByBusinessId,
  formatDateTime,
  readFirst,
} from "@shared/services/entityQueries";

function normalizePromoStatus(rawValue: any): "activo" | "pendiente" | "inactivo" {
  const value = String(rawValue || "").trim().toLowerCase();
  if (value.includes("activ")) return "activo";
  if (value.includes("pend")) return "pendiente";
  return "inactivo";
}

export default function NegocioInicioScreen() {
  const navigation = useNavigation<any>();
  const onboarding = useAppStore((state) => state.onboarding);
  const bootstrapAuth = useAppStore((state) => state.bootstrapAuth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [business, setBusiness] = useState<any | null>(onboarding?.negocio || null);
  const [branches, setBranches] = useState<any[]>([]);
  const [promos, setPromos] = useState<any[]>([]);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");

    const onboardingUser = onboarding?.usuario?.id || null;
    let userId = onboardingUser;
    if (!userId) {
      const current = await fetchCurrentUserRow(supabase);
      userId = current.ok ? current.data?.id : null;
    }
    if (!userId) {
      setLoading(false);
      setError("No se pudo resolver usuario negocio.");
      return;
    }

    const businessResult = await fetchBusinessByUserId(supabase, userId);
    if (!businessResult.ok || !businessResult.data?.id) {
      setLoading(false);
      setError(businessResult.error || "No se encontro negocio.");
      setBusiness(null);
      setBranches([]);
      setPromos([]);
      return;
    }

    setBusiness(businessResult.data);
    const [branchesResult, promosResult] = await Promise.all([
      fetchBranchesByBusinessId(supabase, businessResult.data.id, 20),
      fetchPromosByBusinessId(supabase, businessResult.data.id, 12),
    ]);

    setBranches(branchesResult.ok ? branchesResult.data : []);
    setPromos(promosResult.ok ? promosResult.data : []);
    setLoading(false);
  }, [onboarding?.usuario?.id]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const refreshAll = useCallback(async () => {
    await bootstrapAuth();
    await loadDashboard();
  }, [bootstrapAuth, loadDashboard]);

  const promoStats = useMemo(() => {
    const next = { activo: 0, pendiente: 0, inactivo: 0 };
    for (const promo of promos) {
      const status = normalizePromoStatus(readFirst(promo, ["estado", "status"], ""));
      next[status] += 1;
    }
    return next;
  }, [promos]);

  const hasPendingNotices = promoStats.pendiente > 0 || promoStats.inactivo > 0;

  return (
    <ScreenScaffold title="Inicio negocio" subtitle="Dashboard operativo del negocio">
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard
          title={readFirst(business, ["nombre"], "Tu negocio")}
          subtitle="Resumen general"
          right={
            <Pressable onPress={refreshAll} style={styles.refreshButton}>
              <Text style={styles.refreshText}>Refrescar</Text>
            </Pressable>
          }
        >
          {loading ? <BlockSkeleton lines={4} /> : null}
          {!loading && error ? <Text style={styles.error}>{error}</Text> : null}
          {!loading && !error ? (
            <>
              <View style={styles.kpiRow}>
                <View style={styles.kpiCard}>
                  <Text style={styles.kpiLabel}>Activas</Text>
                  <Text style={styles.kpiValue}>{promoStats.activo}</Text>
                </View>
                <View style={styles.kpiCard}>
                  <Text style={styles.kpiLabel}>Pendientes</Text>
                  <Text style={styles.kpiValue}>{promoStats.pendiente}</Text>
                </View>
                <View style={styles.kpiCard}>
                  <Text style={styles.kpiLabel}>Inactivas</Text>
                  <Text style={styles.kpiValue}>{promoStats.inactivo}</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Sucursales:</Text>
                <Text style={styles.infoValue}>{branches.length}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Categoria:</Text>
                <Text style={styles.infoValue}>
                  {readFirst(business, ["categoria"], "sin categoria")}
                </Text>
              </View>
              <View style={styles.quickActionsRow}>
                <Pressable
                  onPress={() => navigation.navigate(TAB_ROUTES.NEGOCIO.GESTIONAR)}
                  style={styles.quickActionPrimary}
                >
                  <Text style={styles.quickActionPrimaryText}>Gestionar</Text>
                </Pressable>
                <Pressable
                  onPress={() => navigation.navigate(TAB_ROUTES.NEGOCIO.ESCANER)}
                  style={styles.quickActionSecondary}
                >
                  <Text style={styles.quickActionSecondaryText}>Ir a escaner</Text>
                </Pressable>
              </View>
            </>
          ) : null}
        </SectionCard>

        {!loading && !error ? (
          <SectionCard title="Estado y avisos">
            {hasPendingNotices ? (
              <>
                {promoStats.pendiente > 0 ? (
                  <Text style={styles.noticeText}>
                    Tienes {promoStats.pendiente} promo(s) pendientes de activacion.
                  </Text>
                ) : null}
                {promoStats.inactivo > 0 ? (
                  <Text style={styles.noticeText}>
                    Tienes {promoStats.inactivo} promo(s) inactivas. Revisa transiciones en Gestionar.
                  </Text>
                ) : null}
              </>
            ) : (
              <Text style={styles.okNotice}>Operacion estable: no hay avisos pendientes.</Text>
            )}
          </SectionCard>
        ) : null}

        <SectionCard title="Promociones recientes">
          {loading ? <BlockSkeleton lines={5} compact /> : null}
          {!loading && !error && promos.length === 0 ? (
            <Text style={styles.emptyText}>No hay promociones en este negocio.</Text>
          ) : null}
          {!loading && !error
            ? promos.slice(0, 6).map((promo, index) => (
                <View key={`${readFirst(promo, ["id", "public_id"], index)}-${index}`} style={styles.item}>
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {String(readFirst(promo, ["titulo", "nombre", "descripcion"], `Promo ${index + 1}`))}
                  </Text>
                  <Text style={styles.itemMeta}>
                    {String(readFirst(promo, ["estado", "status"], "sin_estado"))}
                  </Text>
                  <Text style={styles.itemMeta}>
                    {formatDateTime(readFirst(promo, ["created_at", "updated_at", "fechacreacion"], null))}
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
  infoRow: {
    flexDirection: "row",
    gap: 6,
  },
  infoLabel: {
    width: 78,
    color: "#6B7280",
    fontSize: 12,
  },
  infoValue: {
    flex: 1,
    color: "#111827",
    fontSize: 12,
  },
  quickActionsRow: {
    marginTop: 4,
    flexDirection: "row",
    gap: 8,
  },
  quickActionPrimary: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#6D28D9",
    paddingVertical: 10,
    alignItems: "center",
  },
  quickActionPrimaryText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  quickActionSecondary: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    alignItems: "center",
  },
  quickActionSecondaryText: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "700",
  },
  noticeText: {
    color: "#7C2D12",
    fontSize: 12,
    fontWeight: "600",
  },
  okNotice: {
    color: "#047857",
    fontSize: 12,
    fontWeight: "600",
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
    fontSize: 13,
  },
  itemMeta: {
    color: "#6B7280",
    fontSize: 11,
  },
});
