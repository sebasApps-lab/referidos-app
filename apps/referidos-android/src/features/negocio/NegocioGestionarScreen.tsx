import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
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

type ManageTab = "promos" | "sucursales" | "seguridad";

function normalizePromoStatus(value: any): "pendiente" | "activo" | "inactivo" {
  const raw = String(value || "").trim().toLowerCase();
  if (raw.includes("activ")) return "activo";
  if (raw.includes("pend")) return "pendiente";
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
  if (value.includes("activo")) return "pausado";
  if (value.includes("paus")) return "draft";
  return "activo";
}

export default function NegocioGestionarScreen() {
  const onboarding = useAppStore((state) => state.onboarding);
  const openConfirm = useModalStore((state) => state.openConfirm);
  const openAlert = useModalStore((state) => state.openAlert);
  const openPicker = useModalStore((state) => state.openPicker);
  const [activeTab, setActiveTab] = useState<ManageTab>("promos");
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

  return (
    <ScreenScaffold title="Gestionar negocio" subtitle="Promos, sucursales y transiciones">
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
            <>
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
              {actionMessage ? <Text style={styles.ok}>{actionMessage}</Text> : null}
              {actionError ? <Text style={styles.error}>{actionError}</Text> : null}
            </>
          ) : null}
        </SectionCard>

        <View style={styles.tabRow}>
          {(["promos", "sucursales", "seguridad"] as ManageTab[]).map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tabChip, activeTab === tab && styles.tabChipActive]}
            >
              <Text style={[styles.tabChipText, activeTab === tab && styles.tabChipTextActive]}>
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        {activeTab === "promos" ? (
          <SectionCard title="Promociones (CRUD)">
            <TextInput
              value={newPromoTitle}
              onChangeText={setNewPromoTitle}
              style={styles.input}
              placeholder="Titulo de la promocion"
            />
            <TextInput
              value={newPromoDescription}
              onChangeText={setNewPromoDescription}
              style={styles.input}
              placeholder="Descripcion corta"
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
          </SectionCard>
        ) : null}

        {activeTab === "sucursales" ? (
          <SectionCard title="Sucursales y direccion">
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
          </SectionCard>
        ) : null}

        {activeTab === "seguridad" ? (
          <SectionCard title="Seguridad operativa">
            <Text style={styles.itemMeta}>
              Revisa dispositivos y permisos antes de canjear en terminales del negocio.
            </Text>
            <View style={styles.securityBox}>
              <Text style={styles.securityTitle}>Checklist rapido</Text>
              <Text style={styles.securityItem}>1. Cambia contrasena del propietario periodicamente.</Text>
              <Text style={styles.securityItem}>2. Mantén 2FA activo para accesos sensibles.</Text>
              <Text style={styles.securityItem}>3. Revoca sesiones antiguas desde Perfil cuando sea necesario.</Text>
            </View>
          </SectionCard>
        ) : null}
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
  tabRow: {
    flexDirection: "row",
    gap: 8,
  },
  tabChip: {
    flex: 1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingVertical: 8,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  tabChipActive: {
    borderColor: "#6D28D9",
    backgroundColor: "#F5F3FF",
  },
  tabChipText: {
    textTransform: "uppercase",
    color: "#6B7280",
    fontSize: 11,
    fontWeight: "700",
  },
  tabChipTextActive: {
    color: "#5B21B6",
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
    backgroundColor: "#6D28D9",
    borderRadius: 10,
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
