import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { STACK_ROUTES, TAB_ROUTES } from "@navigation/routeKeys";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import { mobileApi, observability } from "@shared/services/mobileApi";
import { useSupportDeskStore } from "@shared/store/supportDeskStore";
import { loadSupportCatalogFromCache } from "@shared/services/supportCatalog";
import { dispatchSupportMacrosSync } from "@shared/services/supportOps";

export default function SoporteIrregularScreen() {
  const navigation = useNavigation<any>();
  const setSelectedThreadPublicId = useSupportDeskStore(
    (state) => state.setSelectedThreadPublicId,
  );

  const [categories, setCategories] = useState<any[]>([]);
  const [userPublicId, setUserPublicId] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [creating, setCreating] = useState(false);
  const [status, setStatus] = useState("");
  const [statusTone, setStatusTone] = useState<"ok" | "error">("ok");
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState("");

  const loadCategories = useCallback(async (forceSync = false) => {
    setLoadingCategories(true);
    setCategoriesError("");
    let result = await loadSupportCatalogFromCache({ publishedOnly: true });
    if (forceSync || result.categories.length === 0) {
      try {
        await dispatchSupportMacrosSync({
          mode: "hot",
          panelKey: "android_support_irregular",
        });
      } catch (syncErr: any) {
        setCategoriesError(String(syncErr?.message || syncErr || "sync_dispatch_failed"));
      }
      result = await loadSupportCatalogFromCache({ publishedOnly: true });
    }
    const nextCategories = (result.categories || [])
      .filter((item) => ["published", "active"].includes(String(item?.status || "published").toLowerCase()))
      .map((item) => ({
        id: String(item?.code || item?.id || "").trim(),
        label: String(item?.label || item?.code || item?.id || "").trim(),
      }))
      .filter((item) => item.id);
    setCategories(nextCategories);
    if (!nextCategories.length && result.error) {
      setCategoriesError(String(result.error));
    }
    setLoadingCategories(false);
  }, []);

  useEffect(() => {
    void loadCategories(false);
  }, [loadCategories]);

  useEffect(() => {
    if (!category && categories[0]?.id) {
      setCategory(categories[0].id);
    }
  }, [categories, category]);

  const visibleCategories = useMemo(() => categories, [categories]);

  const handleCreate = async () => {
    const safePublicId = userPublicId.trim();
    const safeSummary = summary.trim();
    if (!safePublicId || !safeSummary || !category) {
      setStatusTone("error");
      setStatus("Debes ingresar user_public_id, resumen y categoría.");
      return;
    }
    setCreating(true);
    const result = await mobileApi.support.createIrregular({
      user_public_id: safePublicId,
      summary: safeSummary,
      category,
      severity: "s2",
      app_channel: "android-app",
      origin_source: "admin_support",
      context: {
        route: "/soporte/irregulares",
        role: "soporte",
        source: "react-native",
      },
    });
    setCreating(false);
    if (!result?.ok) {
      setStatusTone("error");
      setStatus(result?.error || "No se pudo crear ticket irregular.");
      return;
    }
    const createdThread = result?.data?.thread || result?.data || {};
    const threadPublicId = String(createdThread?.public_id || "").trim();
    setStatusTone("ok");
    setStatus(`Ticket irregular creado${threadPublicId ? `: ${threadPublicId}` : "."}`);
    setUserPublicId("");
    setSummary("");
    await observability.track({
      level: "info",
      category: "audit",
      message: "support_irregular_ticket_created",
      context: {
        thread_public_id: threadPublicId || null,
        category,
      },
    });
    if (threadPublicId) {
      setSelectedThreadPublicId(threadPublicId);
      navigation.navigate(STACK_ROUTES.SOPORTE.TICKET);
    }
  };

  return (
    <ScreenScaffold
      title="Soporte Ticket Irregular"
      subtitle="Creacion manual para casos fuera del flujo regular"
    >
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard title="Nuevo ticket irregular" subtitle="Usuario, categoria y resumen">
          <TextInput
            value={userPublicId}
            onChangeText={setUserPublicId}
            placeholder="Public ID usuario (USR-*, NEG-*, EMP-*)"
            style={styles.input}
            autoCapitalize="characters"
            autoCorrect={false}
          />

          <Text style={styles.label}>Categoria</Text>
          <View style={styles.chipsWrap}>
            {visibleCategories.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => setCategory(item.id)}
                style={[styles.chip, category === item.id && styles.chipActive]}
              >
                <Text style={[styles.chipText, category === item.id && styles.chipTextActive]}>
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <TextInput
            value={summary}
            onChangeText={setSummary}
            placeholder="Resumen del caso"
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          <View style={styles.actionsRow}>
            <Pressable
              onPress={handleCreate}
              disabled={creating || loadingCategories || visibleCategories.length === 0}
              style={[
                styles.primaryBtn,
                (creating || loadingCategories || visibleCategories.length === 0) && styles.btnDisabled,
              ]}
            >
              <Text style={styles.primaryBtnText}>
                {creating ? "Creando..." : loadingCategories ? "Cargando categorías..." : "Crear ticket irregular"}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate(TAB_ROUTES.SOPORTE.INBOX)}
              style={styles.secondaryBtn}
            >
              <Text style={styles.secondaryBtnText}>Volver inbox</Text>
            </Pressable>
          </View>

          {categoriesError ? <Text style={styles.errorText}>{categoriesError}</Text> : null}
          {!loadingCategories && visibleCategories.length === 0 ? (
            <Text style={styles.errorText}>No hay categorías runtime disponibles.</Text>
          ) : null}
          {status ? (
            <Text style={statusTone === "error" ? styles.errorText : styles.successText}>
              {status}
            </Text>
          ) : null}
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
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#475569",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 9,
    backgroundColor: "#FFFFFF",
    color: "#0F172A",
    fontSize: 13,
  },
  textArea: {
    minHeight: 90,
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#FFFFFF",
  },
  chipActive: {
    borderColor: "#1D4ED8",
    backgroundColor: "#DBEAFE",
  },
  chipText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#334155",
  },
  chipTextActive: {
    color: "#1E3A8A",
  },
  actionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  primaryBtn: {
    backgroundColor: "#1D4ED8",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#1D4ED8",
    backgroundColor: "#EFF6FF",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  secondaryBtnText: {
    color: "#1D4ED8",
    fontSize: 12,
    fontWeight: "700",
  },
  btnDisabled: {
    opacity: 0.55,
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 12,
    fontWeight: "600",
  },
  successText: {
    color: "#166534",
    fontSize: 12,
    fontWeight: "600",
  },
});
