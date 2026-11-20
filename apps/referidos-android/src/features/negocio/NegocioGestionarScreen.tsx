import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { SessionsSection } from "@features/profile/components/ProfileRuntimePanels";
import { TAB_ROUTES } from "@navigation/routeKeys";
import { supabase } from "@shared/services/mobileApi";
import { useAppStore } from "@shared/store/appStore";
import { useModalStore } from "@shared/store/modalStore";
import {
  createPromoForBusiness,
  deletePromoById,
  fetchBranchesByBusinessId,
  fetchBusinessByUserId,
  fetchCurrentUserRow,
  fetchPromoBranchLinksByPromoId,
  fetchPromosByBusinessId,
  formatDateTime,
  linkPromoToBranch,
  readFirst,
  unlinkPromoFromBranch,
  updateBranchStateById,
  updatePromoStatusById,
} from "@shared/services/entityQueries";

const MANAGE_TABS = [
  { id: "metricas", label: "Métricas", icon: require("@navigation/assets/chart.png") },
  { id: "dispositivos", label: "Dispositivos", icon: require("@navigation/assets/monitor-smartphone.png") },
  { id: "grupos", label: "Grupos", icon: require("@navigation/assets/users.png") },
  { id: "seguridad", label: "Seguridad", icon: require("@navigation/assets/shield-check.png") },
] as const;

type ManageTab = (typeof MANAGE_TABS)[number]["id"];

function normalizePromoStatus(value: any): "pendiente" | "activo" | "inactivo" {
  const raw = String(value || "").trim().toLowerCase();
  if (["activo", "activa", "active"].includes(raw)) return "activo";
  if (raw.startsWith("pend") || raw === "draft") return "pendiente";
  return "inactivo";
}

function nextPromoStatus(status: string): "pendiente" | "activo" | "inactivo" {
  const current = normalizePromoStatus(status);
  if (current === "pendiente") return "activo";
  if (current === "activo") return "inactivo";
  return "activo";
}

function nextBranchState(current: string): "activo" | "pausado" | "draft" {
  const value = String(current || "").trim().toLowerCase();
  if (value === "activo" || value === "active") return "pausado";
  if (value.includes("paus")) return "draft";
  return "activo";
}

export default function NegocioGestionarScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const creationRequest = (route.params as { createPromo?: number } | undefined)?.createPromo;
  const onboarding = useAppStore((state) => state.onboarding);
  const signOut = useAppStore((state) => state.signOut);
  const openConfirm = useModalStore((state) => state.openConfirm);
  const openAlert = useModalStore((state) => state.openAlert);
  const openPicker = useModalStore((state) => state.openPicker);
  const [activeTab, setActiveTab] = useState<ManageTab>("metricas");
  const [showPromoForm, setShowPromoForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [promos, setPromos] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [businessId, setBusinessId] = useState<string>("");
  const [newPromoTitle, setNewPromoTitle] = useState("");
  const [newPromoDescription, setNewPromoDescription] = useState("");
  const [creatingPromo, setCreatingPromo] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const [promoBranchLinks, setPromoBranchLinks] = useState<Record<string, string[]>>({});

  const branchById = useMemo(() => {
    const map = new Map<string, any>();
    for (const branch of branches) {
      const id = String(readFirst(branch, ["id"], "")).trim();
      if (id) map.set(id, branch);
    }
    return map;
  }, [branches]);

  const loadPromoLinks = useCallback(async (promoRows: any[]) => {
    const linkEntries = await Promise.all(
      promoRows.map(async (promo, index) => {
        const promoId = String(readFirst(promo, ["id", "public_id"], index)).trim();
        if (!promoId) return [promoId, [] as string[]] as const;
        const links = await fetchPromoBranchLinksByPromoId(supabase, promoId);
        if (!links.ok) return [promoId, [] as string[]] as const;
        const branchIds = (links.data || [])
          .map((link: any) =>
            String(readFirst(link, ["sucursalid", "sucursal_id", "sucursalId"], "")).trim(),
          )
          .filter(Boolean);
        return [promoId, Array.from(new Set(branchIds))] as const;
      }),
    );

    const nextLinks: Record<string, string[]> = {};
    for (const [promoId, ids] of linkEntries) {
      if (!promoId) continue;
      nextLinks[promoId] = ids;
    }
    setPromoBranchLinks(nextLinks);
  }, []);

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

    const resolvedBusinessId = String(businessResult.data.id);
    setBusinessId(resolvedBusinessId);
    const [promosResult, branchesResult] = await Promise.all([
      fetchPromosByBusinessId(supabase, resolvedBusinessId, 25),
      fetchBranchesByBusinessId(supabase, resolvedBusinessId, 25),
    ]);
    const promoRows = promosResult.ok ? promosResult.data : [];
    setPromos(promoRows);
    setBranches(branchesResult.ok ? branchesResult.data : []);
    await loadPromoLinks(promoRows);
    setLoading(false);
  }, [loadPromoLinks, onboarding?.usuario?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (creationRequest) {
      setActiveTab("metricas");
      setShowPromoForm(true);
    }
  }, [creationRequest]);

  const createPromo = useCallback(async () => {
    setActionMessage("");
    setActionError("");
    if (!businessId) {
      setActionError("No se encontro negocio para crear promocion.");
      return;
    }
    if (newPromoTitle.trim().length < 3) {
      setActionError("El titulo debe tener al menos 3 caracteres.");
      return;
    }
    setCreatingPromo(true);
    const created = await createPromoForBusiness(supabase, {
      businessId,
      title: newPromoTitle.trim(),
      description: newPromoDescription.trim(),
      status: "pendiente",
    });
    setCreatingPromo(false);
    if (!created.ok) {
      setActionError(created.error || "No se pudo crear la promocion.");
      return;
    }
    setActionMessage("Promocion creada en estado pendiente.");
    setNewPromoTitle("");
    setNewPromoDescription("");
    setShowPromoForm(false);
    await loadData();
  }, [businessId, loadData, newPromoDescription, newPromoTitle]);

  const changePromoStatus = useCallback(
    async (promo: any) => {
      const promoId = String(readFirst(promo, ["id", "public_id"], "")).trim();
      if (!promoId) return;
      const current = String(readFirst(promo, ["estado", "status"], "pendiente"));
      const next = nextPromoStatus(current);
      const result = await updatePromoStatusById(supabase, promoId, next);
      if (!result.ok) {
        setActionError(result.error || "No se pudo cambiar estado de promo.");
        return;
      }
      setActionMessage(`Promo actualizada a ${next}.`);
      await loadData();
    },
    [loadData],
  );

  const removePromo = useCallback(
    (promo: any) => {
      const promoId = String(readFirst(promo, ["id", "public_id"], "")).trim();
      const promoTitle = String(readFirst(promo, ["titulo", "nombre"], "Promocion"));
      if (!promoId) return;
      openConfirm({
        title: "Eliminar promocion",
        message: `Se eliminara "${promoTitle}" y sus vinculos de sucursal.`,
        tone: "warning",
        confirmLabel: "Eliminar",
        cancelLabel: "Cancelar",
        onConfirm: () => {
          void (async () => {
            const result = await deletePromoById(supabase, promoId);
            if (!result.ok) {
              setActionError(result.error || "No se pudo eliminar promocion.");
              return;
            }
            setActionMessage("Promocion eliminada.");
            await loadData();
          })();
        },
      });
    },
    [loadData, openConfirm],
  );

  const openBranchLinking = useCallback(
    (promo: any) => {
      const promoId = String(readFirst(promo, ["id", "public_id"], "")).trim();
      if (!promoId) return;
      if (branches.length === 0) {
        openAlert({
          title: "Sin sucursales",
          message: "Crea o habilita sucursales antes de vincular promociones.",
          tone: "warning",
        });
        return;
      }

      const selected = new Set(promoBranchLinks[promoId] || []);
      openPicker({
        title: "Vincular promo a sucursal",
        message: "Selecciona una sucursal. Si ya esta vinculada, se desvincula.",
        options: branches.map((branch, index) => {
          const id = String(readFirst(branch, ["id"], index)).trim();
          const label = String(readFirst(branch, ["tipo", "nombre"], `Sucursal ${index + 1}`));
          const state = String(readFirst(branch, ["status", "estado"], "draft"));
          return {
            id,
            label,
            description: `${state}${selected.has(id) ? " (vinculada)" : ""}`,
          };
        }),
        selectedId: null,
        confirmLabel: "Aplicar",
        cancelLabel: "Cancelar",
        onSelect: (branchId) => {
          void (async () => {
            const isLinked = selected.has(branchId);
            const result = isLinked
              ? await unlinkPromoFromBranch(supabase, promoId, branchId)
              : await linkPromoToBranch(supabase, promoId, branchId);
            if (!result.ok) {
              setActionError(result.error || "No se pudo actualizar vinculo promo-sucursal.");
              return;
            }
            setActionMessage(isLinked ? "Sucursal desvinculada de la promo." : "Sucursal vinculada a la promo.");
            await loadData();
          })();
        },
      });
    },
    [branches, loadData, openAlert, openPicker, promoBranchLinks],
  );

  const transitionBranchState = useCallback(
    async (branch: any) => {
      const branchId = String(readFirst(branch, ["id"], "")).trim();
      if (!branchId) return;
      const current = String(readFirst(branch, ["status", "estado", "tipo"], "draft"));
      const next = nextBranchState(current);
      const result = await updateBranchStateById(supabase, branchId, next);
      if (!result.ok) {
        setActionError(result.error || "No se pudo cambiar estado de sucursal.");
        return;
      }
      setActionMessage(`Sucursal actualizada a ${next}.`);
      await loadData();
    },
    [loadData],
  );

  const activePromos = promos.filter((promo) => normalizePromoStatus(readFirst(promo, ["estado", "status"], "")) === "activo").length;
  const hasMfa = Boolean(onboarding?.usuario?.mfa_totp_enabled || onboarding?.usuario?.mfa_primary_method);
  const showCreation = () => {
    setActiveTab("metricas");
    setShowPromoForm(true);
  };
  return (
      <ScrollView
        style={styles.root}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadData} colors={["#5E30A5"]} />}
      >
        <View style={styles.heading}>
          <Text style={styles.eyebrow}>PANEL</Text>
          <Text accessibilityRole="header" style={styles.title}>Gestionar</Text>
          <Text style={styles.description}>Controla promociones, equipos y seguridad desde un solo lugar.</Text>
        </View>
        <View style={styles.heroActions}>
          <View style={styles.operationBadge}>
            <View style={[styles.statusDot, error ? styles.errorDot : loading && styles.loadingDot]} />
            <Text style={styles.itemMeta}>{loading ? "Actualizando…" : error ? "Consulta pendiente" : "Operación estable"}</Text>
          </View>
          <Pressable accessibilityRole="button" onPress={showCreation} style={[styles.primaryButton, styles.newPromoButton]}>
            <Text style={styles.primaryButtonText}>Nueva promo</Text>
          </Pressable>
        </View>
        <View style={styles.businessBanner}>
          <Text style={styles.eyebrow}>NEGOCIO</Text>
          <Text style={styles.businessName}>{onboarding?.negocio?.nombre || "Tu negocio"}</Text>
          <Text style={styles.itemMeta}>Panel central de gestión y operaciones.</Text>
        </View>
        {error || actionError ? <Text accessibilityLiveRegion="polite" style={styles.error}>{actionError || error}</Text> : null}
        {actionMessage ? <Text accessibilityLiveRegion="polite" style={styles.ok}>{actionMessage}</Text> : null}

        <View style={styles.tabRow}>
          {MANAGE_TABS.map((tab) => (
            <Pressable
              key={tab.id}
              accessibilityRole="tab"
              accessibilityState={{ selected: activeTab === tab.id }}
              onPress={() => setActiveTab(tab.id)}
              style={[styles.tabChip, activeTab === tab.id && styles.tabChipActive]}
            >
              <Image source={tab.icon} style={[styles.tabIcon, activeTab === tab.id && styles.tabIconActive]} />
              <Text style={[styles.tabChipText, activeTab === tab.id && styles.tabChipTextActive]}>
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {activeTab === "metricas" ? (
          <View style={styles.panel}>
            {!loading && !error && (
              <View style={styles.kpiRow}>
                {[["Promos activas", activePromos], ["Sucursales", branches.length]].map(([label, value]) => (
                  <View key={label} style={styles.kpiCard}>
                    <Text style={styles.kpiValue}>{value}</Text>
                    <Text style={styles.kpiLabel}>{label}</Text>
                  </View>
                ))}
              </View>
            )}
            <Text accessibilityRole="header" style={styles.itemTitle}>Promociones</Text>
            {showPromoForm && <>
            <TextInput
              value={newPromoTitle}
              onChangeText={setNewPromoTitle}
              style={styles.input}
              placeholder="Título de la promoción"
              placeholderTextColor="#64748B"
            />
            <TextInput
              value={newPromoDescription}
              onChangeText={setNewPromoDescription}
              style={styles.input}
              placeholder="Descripción corta"
              placeholderTextColor="#64748B"
            />
            <Pressable
              onPress={() => {
                void createPromo();
              }}
              disabled={creatingPromo}
              style={[styles.primaryButton, creatingPromo && styles.disabledBtn]}
            >
              <Text style={styles.primaryButtonText}>
                {creatingPromo ? "Creando..." : "Crear promo"}
              </Text>
            </Pressable>
            <Pressable accessibilityRole="button" onPress={() => setShowPromoForm(false)} style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>Cancelar</Text>
            </Pressable>
            </>}

            {loading ? <BlockSkeleton lines={5} compact /> : null}
            {!loading && !error && promos.length === 0 ? (
              <Text style={styles.emptyText}>Aun no hay promociones.</Text>
            ) : null}
            {!loading && !error
              ? promos.slice(0, 12).map((promo, index) => {
                  const promoId = String(readFirst(promo, ["id", "public_id"], index)).trim();
                  const linkedBranchIds = promoBranchLinks[promoId] || [];
                  const linkedBranchNames = linkedBranchIds
                    .map((id) => readFirst(branchById.get(id), ["tipo", "nombre"], id))
                    .map((value) => String(value));
                  const status = String(readFirst(promo, ["estado", "status"], "pendiente"));
                  return (
                    <View key={`${promoId}-${index}`} style={styles.item}>
                      <Text style={styles.itemTitle} numberOfLines={1}>
                        {String(readFirst(promo, ["titulo", "nombre", "descripcion"], `Promo ${index + 1}`))}
                      </Text>
                      <Text style={styles.itemMeta}>Estado: {status}</Text>
                      <Text style={styles.itemMeta}>
                        {formatDateTime(readFirst(promo, ["created_at", "updated_at", "fechacreacion"], null))}
                      </Text>
                      <Text style={styles.itemMeta} numberOfLines={2}>
                        Sucursales: {linkedBranchNames.length ? linkedBranchNames.join(", ") : "sin vinculos"}
                      </Text>
                      <View style={styles.inlineActions}>
                        <Pressable onPress={() => { void changePromoStatus(promo); }} style={styles.secondaryBtn}>
                          <Text style={styles.secondaryBtnText}>Transicionar</Text>
                        </Pressable>
                        <Pressable onPress={() => openBranchLinking(promo)} style={styles.secondaryBtn}>
                          <Text style={styles.secondaryBtnText}>Vincular suc.</Text>
                        </Pressable>
                        <Pressable onPress={() => removePromo(promo)} style={styles.dangerBtn}>
                          <Text style={styles.dangerBtnText}>Eliminar</Text>
                        </Pressable>
                      </View>
                    </View>
                  );
                })
              : null}
          </View>
        ) : null}

        {activeTab === "grupos" ? (
          <View style={styles.panel}>
            <Text accessibilityRole="header" style={styles.itemTitle}>Sucursales y dirección</Text>
            {loading ? <BlockSkeleton lines={4} compact /> : null}
            {!loading && !error && branches.length === 0 ? (
              <Text style={styles.emptyText}>Aun no hay sucursales registradas.</Text>
            ) : null}
            {!loading && !error
              ? branches.slice(0, 12).map((branch, index) => {
                  const state = String(readFirst(branch, ["status", "estado", "tipo"], "draft"));
                  const nextState = nextBranchState(state);
                  const addressLinked = Boolean(readFirst(branch, ["direccion_id", "direccionId"], null));
                  return (
                    <View key={`${readFirst(branch, ["id"], index)}-${index}`} style={styles.item}>
                      <Text style={styles.itemTitle}>
                        {String(readFirst(branch, ["tipo", "nombre"], "sucursal"))}
                      </Text>
                      <Text style={styles.itemMeta}>Estado: {state}</Text>
                      <Text style={styles.itemMeta}>
                        Direccion: {addressLinked ? "vinculada" : "sin vinculo"}
                      </Text>
                      <Text style={styles.itemMeta}>
                        Horarios: {readFirst(branch, ["horarios"], null) ? "configurados" : "sin horario"}
                      </Text>
                      <View style={styles.inlineActions}>
                        <Pressable onPress={() => { void transitionBranchState(branch); }} style={styles.secondaryBtn}>
                          <Text style={styles.secondaryBtnText}>Pasar a {nextState}</Text>
                        </Pressable>
                      </View>
                    </View>
                  );
                })
              : null}
          </View>
        ) : null}

        {activeTab === "dispositivos" ? (
          <View style={styles.panel}>
            <Text accessibilityRole="header" style={styles.itemTitle}>Dispositivos</Text>
            <Text style={styles.itemMeta}>Revisa las sesiones activas de esta cuenta.</Text>
            <SessionsSection onCurrentSessionRevoked={signOut} />
          </View>
        ) : null}

        {activeTab === "seguridad" ? (
          <View style={styles.panel}>
            <Text accessibilityRole="header" style={styles.itemTitle}>Seguridad y accesos</Text>
            <Text style={styles.itemMeta}>
              Revisa dispositivos y permisos antes de canjear en terminales del negocio.
            </Text>
            <View style={styles.securityBox}>
              <Text style={styles.securityTitle}>Autenticación en dos pasos</Text>
              <Text style={styles.securityItem}>{hasMfa ? "Configurada" : "Por configurar"}</Text>
            </View>
            <Pressable accessibilityRole="button" onPress={() => navigation.navigate(TAB_ROUTES.NEGOCIO.PERFIL)} style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>Revisar configuración</Text>
            </Pressable>
          </View>
        ) : null}
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FFFFFF" },
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 28,
  },
  heading: { gap: 8 },
  eyebrow: { color: "#5E30A599", fontSize: 11, letterSpacing: 2.2 },
  title: { color: "#3F1F73", fontSize: 24, lineHeight: 32, fontWeight: "800" },
  description: { color: "#64748B", fontSize: 14, lineHeight: 20 },
  heroActions: { marginTop: 16, flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 12 },
  operationBadge: { flexDirection: "row", alignItems: "center", gap: 8, borderWidth: 1, borderColor: "#E9E2F7", padding: 10, borderRadius: 12 },
  statusDot: { width: 8, height: 8, borderRadius: 8, backgroundColor: "#34D399" },
  errorDot: { backgroundColor: "#EF4444" },
  loadingDot: { backgroundColor: "#F59E0B" },
  newPromoButton: { paddingHorizontal: 16 },
  businessBanner: { marginTop: 20, backgroundColor: "#FAF8FF", borderRadius: 16, borderWidth: 1, borderColor: "#EFE9FA", padding: 16, gap: 3 },
  businessName: { color: "#2F1A55", fontSize: 18, fontWeight: "600" },
  panel: { marginTop: 24, gap: 12, backgroundColor: "#FFFFFF", padding: 20, borderWidth: 1, borderColor: "#E9E2F7", borderRadius: 16 },
  kpiRow: {
    flexDirection: "row",
    gap: 8,
  },
  kpiCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E9E2F7",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#F8F5FF",
  },
  kpiLabel: {
    fontSize: 11,
    color: "#6B7280",
  },
  kpiValue: {
    marginTop: 2,
    fontSize: 24,
    fontWeight: "700",
    color: "#2F1A55",
  },
  tabRow: {
    marginTop: 24,
    flexDirection: "row",
    gap: 4,
    padding: 4,
    borderWidth: 1,
    borderColor: "#E9E2F7",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  tabChip: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    gap: 4,
  },
  tabChipActive: {
    backgroundColor: "#5E30A51A",
  },
  tabIcon: { width: 18, height: 18, tintColor: "#64748B" },
  tabIconActive: { tintColor: "#5E30A5", transform: [{ scale: 1.12 }] },
  tabChipText: {
    color: "#6B7280",
    fontSize: 11,
    fontWeight: "700",
  },
  tabChipTextActive: {
    color: "#5E30A5",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#111827",
    backgroundColor: "#FFFFFF",
    fontSize: 13,
  },
  primaryButton: {
    backgroundColor: "#5E30A5",
    borderRadius: 12,
    paddingVertical: 11,
    alignItems: "center",
  },
  disabledBtn: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
  secondaryBtn: {
    backgroundColor: "#F4EEFF",
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryBtnText: {
    color: "#5B21B6",
    fontWeight: "700",
    fontSize: 11,
  },
  dangerBtn: {
    backgroundColor: "#FEE2E2",
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  dangerBtnText: {
    color: "#B91C1C",
    fontWeight: "700",
    fontSize: 11,
  },
  ok: {
    color: "#047857",
    fontSize: 12,
    fontWeight: "600",
  },
  error: {
    color: "#B91C1C",
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
    backgroundColor: "#FFFFFF",
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
  inlineActions: {
    marginTop: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  securityBox: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    backgroundColor: "#FAFBFF",
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 4,
  },
  securityTitle: {
    color: "#181B2A",
    fontWeight: "700",
    fontSize: 12,
  },
  securityItem: {
    color: "#4B5563",
    fontSize: 12,
  },
});
