import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { STACK_ROUTES, TAB_ROUTES } from "@navigation/routeKeys";
import ScreenScaffold from "@features/staff/StaffScreenScaffold";
import SectionCard from "@features/staff/StaffSectionCard";
import { mobileApi, observability } from "@shared/services/mobileApi";
import { useModalStore, type ModalPickerOption } from "@shared/store/modalStore";
import { useSupportDeskStore } from "@shared/store/supportDeskStore";
import { loadSupportCatalogFromCache, normalizeSupportAppKey } from "@shared/services/supportCatalog";
import { dispatchSupportMacrosSync } from "@shared/services/supportOps";
import { SupportButton, SupportNotice } from "./SupportTicketUi";
import { supportDetailStyles } from "./SupportDiagnosticsUi";

const CHANNELS = [
  { id: "referidos_app", label: "PWA principal", apiChannel: "referidos_app" },
  { id: "prelaunch_web", label: "Prelaunch web", apiChannel: "prelaunch_web" },
  { id: "android_app", label: "Android", apiChannel: "android-app" },
] as const;

type Category = ModalPickerOption & { appTargets: string[] };
type Channel = (typeof CHANNELS)[number];

export default function SoporteIrregularScreen() {
  const navigation = useNavigation<any>();
  const setSelectedThreadPublicId = useSupportDeskStore((state) => state.setSelectedThreadPublicId);
  const openPicker = useModalStore((state) => state.openPicker);
  const creatingRef = useRef(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [channel, setChannel] = useState<Channel>(CHANNELS[2]);
  const [userPublicId, setUserPublicId] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [creating, setCreating] = useState(false);
  const [status, setStatus] = useState<{ message: string; error?: boolean } | null>(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState("");

  const loadCategories = useCallback(async () => {
    setLoadingCategories(true);
    setCategoriesError("");
    try {
      let result = await loadSupportCatalogFromCache({ publishedOnly: true });
      if (!result.categories.length) {
        try {
          await dispatchSupportMacrosSync({ mode: "hot", panelKey: "android_support_irregular" });
        } catch (cause) {
          setCategoriesError(cause instanceof Error ? cause.message : "No se pudo actualizar el catálogo.");
        }
        result = await loadSupportCatalogFromCache({ publishedOnly: true });
      }
      const next = (result.categories || [])
        .filter((item) => ["published", "active"].includes(String(item?.status || "published").toLowerCase()))
        .map((item) => ({
          id: String(item?.code || item?.id || "").trim(),
          label: String(item?.label || item?.code || item?.id || "").trim(),
          description: item?.description ? String(item.description) : undefined,
          appTargets: Array.isArray(item?.app_targets) && item.app_targets.length ? item.app_targets.map(String) : ["all"],
        }))
        .filter((item) => item.id);
      setCategories(next);
      if (!next.length && result.error) setCategoriesError(String(result.error));
    } catch {
      setCategoriesError("No se pudo cargar el catálogo de categorías.");
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  useEffect(() => { void loadCategories(); }, [loadCategories]);

  const visibleCategories = useMemo(() => categories.filter((item) => item.appTargets.some(
    (target) => target.toLowerCase() === "all" || normalizeSupportAppKey(target) === channel.id,
  )), [categories, channel.id]);
  const selectedCategory = visibleCategories.find((item) => item.id === category) || visibleCategories[0];
  const canCreate = Boolean(userPublicId.trim() && summary.trim() && selectedCategory);

  async function handleCreate() {
    if (creatingRef.current || !canCreate || !selectedCategory) return;
    creatingRef.current = true;
    setCreating(true);
    setStatus(null);
    try {
      const result = await mobileApi.support.createIrregular({
        user_public_id: userPublicId.trim(),
        summary: summary.trim(),
        category: selectedCategory.id,
        severity: "s2",
        app_channel: channel.apiChannel,
        origin_source: "admin_support",
        context: { route: "/soporte/irregulares", role: "soporte", source: "react-native" },
      });
      if (!result?.ok) {
        setStatus({ message: result?.error || "No se pudo crear el ticket irregular.", error: true });
        return;
      }
      const createdThread = result?.data?.thread || result?.data || {};
      const threadPublicId = String(createdThread?.public_id || "").trim();
      setStatus({ message: threadPublicId ? "Ticket irregular creado: " + threadPublicId : "Ticket irregular creado." });
      setUserPublicId("");
      setSummary("");
      void observability.track({
        level: "info",
        category: "audit",
        message: "support_irregular_ticket_created",
        context: { thread_public_id: threadPublicId || null, category: selectedCategory.id },
      }).catch(() => {});
      if (threadPublicId) {
        setSelectedThreadPublicId(threadPublicId);
        navigation.navigate(STACK_ROUTES.SOPORTE.TICKET, { threadPublicId });
      }
    } catch {
      setStatus({ message: "No se pudo crear el ticket irregular.", error: true });
    } finally {
      creatingRef.current = false;
      setCreating(false);
    }
  }

  return (
    <ScreenScaffold
      onRefresh={loadingCategories || creating ? undefined : () => { void loadCategories(); }}
      title="Ticket irregular"
      subtitle="Crea un ticket cuando el usuario contacte directamente por WhatsApp."
    >
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={supportDetailStyles.content}>
        <SectionCard title="Nuevo ticket irregular">
          <Text style={styles.label}>ID público del usuario</Text>
          <TextInput
            accessibilityLabel="ID público del usuario"
            editable={!creating}
            value={userPublicId}
            onChangeText={setUserPublicId}
            placeholder="USR-XXXX / NEG-XXXX / EMP-XXXX"
            placeholderTextColor="#64748B"
            style={styles.input}
            autoCapitalize="characters"
            autoCorrect={false}
          />

          <PickerField
            label="Aplicación"
            value={channel.label}
            disabled={creating}
            onPress={() => openPicker({
              title: "Aplicación",
              options: [...CHANNELS],
              selectedId: channel.id,
              onSelect: (id) => {
                const next = CHANNELS.find((item) => item.id === id);
                if (next) setChannel(next);
              },
            })}
          />
          <PickerField
            label="Categoría"
            value={loadingCategories ? "Cargando categorías…" : selectedCategory?.label || "Sin categorías"}
            disabled={creating || loadingCategories || !selectedCategory}
            onPress={() => openPicker({
              title: "Categoría",
              options: visibleCategories,
              selectedId: selectedCategory?.id,
              onSelect: setCategory,
            })}
          />
          {categoriesError ? <SupportNotice tone="warning">{categoriesError}</SupportNotice> : null}
          {!loadingCategories && !selectedCategory ? <Text style={supportDetailStyles.meta}>No hay categorías publicadas para esta aplicación.</Text> : null}

          <Text style={styles.label}>Resumen del caso</Text>
          <TextInput
            accessibilityLabel="Resumen del caso"
            editable={!creating}
            value={summary}
            onChangeText={setSummary}
            placeholder="Descripción corta"
            placeholderTextColor="#64748B"
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          <View style={supportDetailStyles.row}>
            <SupportButton label={creating ? "Creando…" : "Crear ticket irregular"} kind="primary" disabled={creating || loadingCategories || !canCreate} onPress={() => { void handleCreate(); }} />
            <SupportButton label="Volver a la bandeja" disabled={creating} onPress={() => navigation.navigate(TAB_ROUTES.SOPORTE.INBOX)} />
          </View>
          {status ? <SupportNotice tone={status.error ? "warning" : "neutral"}>{status.message}</SupportNotice> : null}
        </SectionCard>
      </ScrollView>
    </ScreenScaffold>
  );
}

function PickerField({ label, value, disabled, onPress }: { label: string; value: string; disabled: boolean; onPress: () => void }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Pressable accessibilityRole="button" accessibilityLabel={label + ": " + value} accessibilityState={{ disabled }} disabled={disabled} onPress={onPress} style={[styles.input, styles.picker]}>
        <Text style={styles.pickerValue}>{value}</Text>
        {!disabled ? <Text importantForAccessibility="no" style={styles.chevron}>⌄</Text> : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: 8 },
  label: { color: "#2F1A55", fontSize: 12, fontWeight: "700", marginTop: 4 },
  input: { minHeight: 44, color: "#334155", fontSize: 14, paddingHorizontal: 12, paddingVertical: 9, borderWidth: 1, borderRadius: 16, borderColor: "#E9E2F7", backgroundColor: "#FFFFFF" },
  picker: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  pickerValue: { color: "#334155", fontSize: 14, flex: 1 },
  chevron: { color: "#5E30A5", fontSize: 18 },
  textArea: { minHeight: 88 },
});
