import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native";
import StaffScreenScaffold from "@features/staff/StaffScreenScaffold";
import StaffSectionCard from "@features/staff/StaffSectionCard";
import { staffIcons } from "@features/staff/staffNavigation";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { createSupportApp, dispatchSupportAppsSync, fetchSupportApps, formatAliasesInput, setSupportAppActive, updateSupportApp } from "@shared/services/supportOps";

type AppEntry = ReturnType<typeof normalizeAppRow>;
const EMPTY_FORM = { appKey: "", appCode: "", displayName: "", originSourceDefault: "user", aliases: "" };
type AppForm = typeof EMPTY_FORM;

function normalizeAppRow(row: any) {
  return {
    id: String(row?.id || ""),
    appKey: String(row?.app_key || row?.key || ""),
    appCode: String(row?.app_code || row?.code || ""),
    displayName: String(row?.display_name || row?.name || "App"),
    originSourceDefault: String(row?.origin_source_default || "user"),
    aliases: formatAliasesInput(Array.isArray(row?.aliases) ? row.aliases : []),
    active: Boolean(row?.is_active ?? true),
    purgeAfter: String(row?.purge_after || ""),
  };
}

export function appPurgeCountdown(value: string, now: number) {
  const deadline = Date.parse(value);
  if (!Number.isFinite(deadline)) return "";
  const hours = Math.ceil((deadline - now) / 3_600_000);
  if (hours <= 0) return "Eliminación pendiente";
  return hours <= 24 ? `Elimina en ${hours} h` : `Elimina en ${Math.ceil(hours / 24)} d`;
}

export default function AdminAppsScreen() {
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [rows, setRows] = useState<AppEntry[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [action, setAction] = useState<"view" | "create" | "edit">("view");
  const [form, setForm] = useState(EMPTY_FORM);
  const [now, setNow] = useState(() => Date.now());
  const scroll = useRef<ScrollView>(null);
  const detailOffset = useRef(0);
  const layoutOffset = useRef(0);
  const writeInProgress = useRef(false);
  const generation = useRef(0);
  const selected = rows.find((row) => row.id === selectedId);
  const wide = width >= 1000;

  const loadRows = useCallback(async (selectAppKey?: string) => {
    const request = ++generation.current;
    setLoading(true);
    setError("");
    try {
      const data: unknown = await fetchSupportApps();
      if (request !== generation.current) return;
      const next = (Array.isArray(data) ? data : []).map(normalizeAppRow);
      setRows(next);
      setSelectedId((previous) => next.find((row) => selectAppKey && row.appKey === selectAppKey)?.id
        || next.find((row) => row.id === previous)?.id || next[0]?.id || "");
    } catch (failure: any) {
      if (request === generation.current) setError(String(failure?.message || "No se pudo cargar el catálogo de apps."));
    } finally {
      if (request === generation.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRows();
    return () => { generation.current += 1; };
  }, [loadRows]);

  const hasInactive = rows.some((row) => !row.active && row.purgeAfter);
  useEffect(() => {
    if (!hasInactive) return;
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(timer);
  }, [hasInactive]);

  async function mutate(kind: string, task: () => Promise<void>) {
    if (writeInProgress.current) return;
    writeInProgress.current = true;
    setBusy(kind);
    setError("");
    setSuccess("");
    try {
      await task();
    } catch (failure: any) {
      setError(String(failure?.message || "No se pudo completar la operación."));
    } finally {
      writeInProgress.current = false;
      setBusy("");
    }
  }

  function chooseApp(id: string) {
    setSelectedId(id);
    setAction("view");
    setError("");
    setSuccess("");
    if (!wide) requestAnimationFrame(() => scroll.current?.scrollTo({ y: layoutOffset.current + detailOffset.current, animated: true }));
  }

  function toggleCreate() {
    setAction(action === "create" ? "view" : "create");
    setForm(EMPTY_FORM);
    setError("");
  }

  function saveForm() {
    const appKey = form.appKey.trim().toLowerCase();
    const payload = {
      appCode: form.appCode.trim().toLowerCase(),
      displayName: form.displayName.trim(),
      originSourceDefault: form.originSourceDefault,
      aliases: form.aliases.split(",").map((value) => value.trim()).filter(Boolean),
    };
    if (!appKey || !payload.appCode || !payload.displayName || !payload.originSourceDefault) {
      setError("Completa appKey, código, nombre y origen por defecto.");
      return;
    }
    const editing = action === "edit" && selected;
    void mutate("saving", async () => {
      if (editing) await updateSupportApp(editing.id, payload);
      else await createSupportApp({ appKey, ...payload });
      setSuccess(`${editing ? "App actualizada" : "App creada"}: ${payload.displayName}.`);
      setAction("view");
      await loadRows(appKey);
    });
  }

  function changeActive(row: AppEntry) {
    const run = () => void mutate("saving", async () => {
      await setSupportAppActive(row.id, !row.active);
      setSuccess(`${row.active ? "App inactiva" : "App reactivada"}: ${row.displayName}.`);
      setAction("view");
      await loadRows();
    });
    if (!row.active) run();
    else Alert.alert("Borrar app", `La app ${row.displayName} quedará inactiva y se eliminará en 30 días.`, [
      { text: "Cancelar", style: "cancel" }, { text: "Borrar app", style: "destructive", onPress: run },
    ]);
  }

  function syncApps() {
    void mutate("syncing", async () => {
      await dispatchSupportAppsSync({ mode: "hot", forceFull: true, trigger: "android_admin_apps_screen" });
      setSuccess("Sincronización OPS ejecutada.");
      await loadRows();
    });
  }

  const blocked = loading || Boolean(busy);
  const tile = width >= 1280 ? styles.tileThird : width >= 640 ? styles.tileHalf : styles.tileFull;

  return (
    <StaffScreenScaffold title="Apps" subtitle="Identidad canónica de apps para tickets, logs y macros" onRefresh={blocked ? undefined : () => void loadRows()}>
      <ScrollView ref={scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.heading}>
          <View style={styles.headingCopy}>
            <Text accessibilityRole="header" style={styles.headingTitle}>Catálogo de Apps</Text>
            <Text style={styles.caption}>app_key es inmutable. Edita la identidad pública de cada app.</Text>
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="Refrescar apps" onPress={() => void loadRows()} disabled={blocked} style={styles.refresh}>
            {loading ? <ActivityIndicator size="small" color="#5E30A5" /> : <Image source={staffIcons.refresh} style={styles.refreshIcon} />}
          </Pressable>
        </View>
        {error ? <Text accessibilityLiveRegion="polite" style={[styles.notice, styles.error]}>{error}</Text> : null}
        {success ? <Text accessibilityLiveRegion="polite" style={[styles.notice, styles.success]}>{success}</Text> : null}

        <View style={[styles.layout, wide && styles.layoutWide]} onLayout={(event) => { layoutOffset.current = event.nativeEvent.layout.y; }}>
          <View style={[styles.catalog, wide && styles.catalogWide]}>
            <View style={styles.tiles}>
              <Pressable accessibilityRole="button" accessibilityState={{ expanded: action === "create", disabled: blocked }}
                disabled={blocked} onPress={toggleCreate} style={[styles.tile, tile, styles.addTile]}>
                <Text style={styles.addIcon}>{action === "create" ? "×" : "+"}</Text>
                <View>
                  <Text style={styles.tileTitle}>{action === "create" ? "Cerrar alta" : "Añadir app"}</Text>
                  <Text style={styles.caption}>Registra nueva identidad de app.</Text>
                </View>
              </Pressable>
              {rows.map((row) => (
                <Pressable key={row.id} accessibilityRole="button" accessibilityState={{ selected: row.id === selectedId, disabled: blocked }}
                  disabled={blocked} onPress={() => chooseApp(row.id)} style={[styles.tile, tile, row.id === selectedId && styles.tileSelected]}>
                  <View style={styles.tileTop}>
                    <Text style={[styles.badge, row.active ? styles.activeBadge : styles.inactiveBadge]}>{row.active ? "ACTIVA" : "INACTIVA"}</Text>
                    {!row.active && !!row.purgeAfter && <Text style={styles.countdown}>{appPurgeCountdown(row.purgeAfter, now)}</Text>}
                  </View>
                  <View>
                    <Text numberOfLines={2} style={styles.tileTitle}>{row.displayName}</Text>
                    <Text numberOfLines={1} style={styles.caption}>{row.appCode}</Text>
                    <Text numberOfLines={1} style={styles.path}>{row.appKey}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
            {loading && !rows.length && <BlockSkeleton lines={4} compact />}
            {action === "create" && (
              <StaffSectionCard title="Añadir app">
                <AppFields form={form} onChange={setForm} editable={!blocked} create />
                <Action label={busy === "saving" ? "Guardando…" : "Crear app"} disabled={blocked} onPress={saveForm} />
              </StaffSectionCard>
            )}
          </View>
          <View style={wide && styles.detailWide} onLayout={(event) => { detailOffset.current = event.nativeEvent.layout.y; }}>
            <StaffSectionCard title={selected?.displayName || "Detalle de app"} subtitle={selected?.appKey}
              right={selected && <Action label={action === "edit" ? "Cerrar edición" : "Editar"} disabled={blocked}
                onPress={() => { setAction(action === "edit" ? "view" : "edit"); setForm(selected); }} />}>
              {selected ? (
                <>
                  <AppFields form={action === "edit" ? form : selected} onChange={setForm} editable={action === "edit" && !blocked} />
                  {!selected.active && !!selected.purgeAfter && <Text style={[styles.notice, styles.warning]}>Inactiva. {appPurgeCountdown(selected.purgeAfter, now)}.</Text>}
                  <View style={styles.actions}>
                    {action === "edit" && <Action label={busy === "saving" ? "Guardando…" : "Guardar"} primary disabled={blocked} onPress={saveForm} />}
                    <Action label={selected.active ? "Borrar app" : "Reactivar"} danger={selected.active} disabled={blocked} onPress={() => changeActive(selected)} />
                  </View>
                </>
              ) : <Text style={styles.caption}>Selecciona una app para ver detalle.</Text>}
            </StaffSectionCard>
          </View>
        </View>
        <Action label={busy === "syncing" ? "Sincronizando…" : "Sincronizar OPS"} disabled={blocked} onPress={syncApps} />
      </ScrollView>
    </StaffScreenScaffold>
  );
}

function AppFields({ form, onChange, editable, create = false }: { form: AppForm; onChange: (form: AppForm) => void; editable: boolean; create?: boolean }) {
  const fields = [
    { key: "appKey", label: create ? "appKey" : "appKey (inmutable)", editable: editable && create },
    { key: "appCode", label: "Código público", editable },
    { key: "displayName", label: "Nombre", editable },
    { key: "originSourceDefault", label: "Origin default", editable },
    { key: "aliases", label: "Aliases", editable },
  ] as const;
  return (
    <View style={styles.fields}>
      {fields.map(({ key, label, editable: fieldEditable }) => (
        <View key={key} style={styles.field}>
          <Text style={styles.fieldLabel}>{label}</Text>
          {key === "originSourceDefault" && fieldEditable ? (
            <Pressable accessibilityRole="button" accessibilityLabel={`${label}: ${form[key]}`} style={[styles.input, styles.origin]}
              onPress={() => Alert.alert(label, undefined, [
                { text: "Cancelar", style: "cancel" },
                ...["user", "admin_support"].map((value) => ({ text: value, onPress: () => onChange({ ...form, [key]: value }) })),
              ])}>
              <Text style={styles.originText}>{form[key]}</Text>
              <Text style={styles.caption}>⌄</Text>
            </Pressable>
          ) : <TextInput accessibilityLabel={label} editable={fieldEditable} value={form[key]} autoCapitalize={key === "displayName" ? "words" : "none"}
            placeholder={key === "aliases" ? "Separados por coma" : undefined} placeholderTextColor="#94A3B8"
            onChangeText={(value) => onChange({ ...form, [key]: value })} style={[styles.input, !fieldEditable && styles.inputReadOnly]} />}
        </View>
      ))}
    </View>
  );
}

function Action({ label, primary, danger, disabled, onPress }: { label: string; primary?: boolean; danger?: boolean; disabled?: boolean; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityState={{ disabled: Boolean(disabled) }} disabled={disabled} onPress={onPress}
      style={[styles.action, primary && styles.actionPrimary, danger && styles.actionDanger, disabled && styles.disabled]}>
      <Text style={[styles.actionLabel, primary && styles.actionLabelPrimary, danger && styles.actionLabelDanger]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: { gap: 16, paddingBottom: 24 },
  heading: { flexDirection: "row", alignItems: "center", gap: 12 },
  headingCopy: { flex: 1, gap: 4 },
  headingTitle: { fontSize: 18, lineHeight: 24, color: "#2F1A55", fontWeight: "600" },
  caption: { fontSize: 12, color: "#64748B" },
  refresh: { width: 36, height: 36, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#E9E2F7", borderRadius: 12 },
  refreshIcon: { width: 14, height: 14, tintColor: "#5E30A5" },
  layout: { gap: 16 },
  layoutWide: { flexDirection: "row", alignItems: "flex-start" },
  catalog: { gap: 12 },
  catalogWide: { flex: 1.35 },
  detailWide: { flex: 1 },
  tiles: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  tile: { aspectRatio: 1, minWidth: 0, padding: 16, justifyContent: "space-between", borderWidth: 1, borderColor: "#E9E2F7", backgroundColor: "#FFFFFF", borderRadius: 16 },
  tileFull: { width: "100%" },
  tileHalf: { width: "48%" },
  tileThird: { width: "31%" },
  tileSelected: { borderColor: "#C7AFEF", backgroundColor: "#F3EDFF" },
  addTile: { borderStyle: "dashed", borderColor: "#D6C8F2", backgroundColor: "#FAF8FF" },
  addIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: "#FFFFFF", overflow: "hidden", color: "#5E30A5", fontSize: 22, lineHeight: 36, textAlign: "center", includeFontPadding: false },
  tileTop: { flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "space-between", alignItems: "center" },
  tileTitle: { fontSize: 14, fontWeight: "600", color: "#2F1A55", marginBottom: 4 },
  path: { color: "#94A3B8", fontSize: 11, marginTop: 4 },
  badge: { borderRadius: 999, paddingHorizontal: 8, paddingVertical: 4, fontSize: 10, letterSpacing: 0.8, fontWeight: "600", overflow: "hidden" },
  activeBadge: { backgroundColor: "#D1FAE5", color: "#047857" },
  inactiveBadge: { backgroundColor: "#E2E8F0", color: "#334155" },
  countdown: { fontSize: 10, color: "#8B5CF6", fontWeight: "600" },
  fields: { gap: 12 },
  field: { gap: 4 },
  fieldLabel: { color: "#64748B", fontSize: 11, fontWeight: "600", letterSpacing: 0.8, textTransform: "uppercase" },
  input: { minHeight: 38, paddingHorizontal: 12, paddingVertical: 7, borderWidth: 1, borderColor: "#E9E2F7", borderRadius: 12, backgroundColor: "#FFFFFF", color: "#334155", fontSize: 12 },
  inputReadOnly: { backgroundColor: "#F8FAFC", color: "#64748B" },
  origin: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  originText: { color: "#334155", fontSize: 12 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  action: { alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: "#E9E2F7", borderRadius: 12, backgroundColor: "#FFFFFF" },
  actionPrimary: { backgroundColor: "#5E30A5", borderColor: "#5E30A5" },
  actionDanger: { borderColor: "#FECACA" },
  actionLabel: { color: "#5E30A5", fontSize: 12, fontWeight: "600" },
  actionLabelPrimary: { color: "#FFFFFF" },
  actionLabelDanger: { color: "#B91C1C" },
  disabled: { opacity: 0.6 },
  notice: { paddingHorizontal: 12, paddingVertical: 8, fontSize: 12, borderRadius: 12, borderWidth: 1 },
  error: { color: "#B91C1C", backgroundColor: "#FEF2F2", borderColor: "#FECACA" },
  success: { color: "#047857", backgroundColor: "#ECFDF5", borderColor: "#A7F3D0" },
  warning: { color: "#B45309", backgroundColor: "#FFFBEB", borderColor: "#FDE68A" },
});
