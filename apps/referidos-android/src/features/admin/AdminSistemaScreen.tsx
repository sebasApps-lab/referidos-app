import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View, type ImageSourcePropType } from "react-native";
import ScreenScaffold from "@features/staff/StaffScreenScaffold";
import SectionCard from "@features/staff/StaffSectionCard";
import StaffTable, { StaffTableBadge, type StaffTableColumn } from "@features/staff/StaffTable";
import StaffSelect from "@features/staff/StaffSelect";
import { staffIcons } from "@features/staff/staffNavigation";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { useAppStore } from "@shared/store/appStore";
import { formatDateTime } from "@shared/services/entityQueries";
import {
  createRegistrationCode,
  listRegistrationCodes,
  revokeRegistrationCode,
} from "@shared/services/supportOps";
import {
  DEFAULT_SYSTEM_FEATURE_FLAGS,
  fetchSystemFeatureFlags,
  setSystemFeatureFlag,
} from "@shared/services/systemFeatureFlags";
import {
  DEFAULT_SUPPORT_RUNTIME_FLAGS,
  fetchSupportRuntimeFlags,
  SupportRuntimeFlags,
  setSupportRuntimeFlag,
  updateSupportRuntimeFlags,
} from "@shared/services/supportRuntimeFlags";

const SYSTEM_FLAGS = [
  {
    key: "disable_qr",
    title: "Deshabilitar generación de QR",
    desc: "Bloquea la generación de nuevos QR en la app.",
  },
  {
    key: "maintenance",
    title: "Modo mantenimiento",
    desc: "Muestra un aviso general y pausa flujos críticos.",
  },
  {
    key: "freeze_registro",
    title: "Bloquear registros",
    desc: "Evita nuevas altas de usuarios y negocios.",
  },
  {
    key: "support_live_updates",
    title: "Soporte: actualización en vivo",
    desc: "Activa las actualizaciones de Inbox y jornada en clientes que las admiten.",
  },
  {
    key: "oauth_apple_enabled",
    title: "Auth: Apple OAuth",
    desc: "Habilita la opción de Apple en autenticación.",
  },
] as const;

const SUPPORT_AUTH_FLAGS = [
  {
    key: "require_session_authorization",
    title: "Requerir autorización de sesión",
    desc: "Un administrador debe aprobar el acceso de Soporte antes de iniciar sesión.",
  },
  {
    key: "require_jornada_authorization",
    title: "Requerir autorización de jornada",
    desc: "El asesor debe estar autorizado para iniciar una jornada.",
  },
] as const;

const RETAKE_WINDOWS = [
  { id: "2d", label: "2 días" },
  { id: "7d", label: "7 días" },
  { id: "15d", label: "15 días" },
  { id: "manual", label: "Manual (horas)" },
] as const;

type RegistrationCode = { id?: string; code?: string; revoked_at?: string; used_at?: string; expires_at?: string; created_at?: string };

function statusOfCode(row: RegistrationCode) {
  if (row?.revoked_at) return "revocado";
  if (row?.used_at) return "usado";
  if (row?.expires_at && new Date(row.expires_at).getTime() <= Date.now()) return "expirado";
  return "activo";
}

export default function AdminSistemaScreen() {
  const { width } = useWindowDimensions();
  const usuarioId = String(useAppStore((state) => state.onboarding?.usuario?.id || "")).trim();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [creatingCode, setCreatingCode] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [systemFlags, setSystemFlags] = useState({ ...DEFAULT_SYSTEM_FEATURE_FLAGS });
  const [supportFlags, setSupportFlags] = useState<SupportRuntimeFlags>({
    ...DEFAULT_SUPPORT_RUNTIME_FLAGS,
  });
  const [supportDraft, setSupportDraft] = useState<SupportRuntimeFlags>({
    ...DEFAULT_SUPPORT_RUNTIME_FLAGS,
  });
  const [codes, setCodes] = useState<RegistrationCode[]>([]);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [nextSystem, nextSupport, nextCodes] = await Promise.all([
        fetchSystemFeatureFlags({ force: true }),
        fetchSupportRuntimeFlags({ force: true }),
        listRegistrationCodes(100),
      ]);
      setSystemFlags(nextSystem);
      setSupportFlags(nextSupport);
      setSupportDraft(nextSupport);
      setCodes(Array.isArray(nextCodes) ? nextCodes : []);
    } catch (err: any) {
      setError(String(err?.message || err || "No se pudo cargar el panel sistema."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  const toggleSystemFlag = useCallback(
    async (key: keyof typeof DEFAULT_SYSTEM_FEATURE_FLAGS) => {
      setSaving(true);
      setError("");
      setOk("");
      try {
        const next = await setSystemFeatureFlag(key, !systemFlags[key]);
        setSystemFlags(next);
        setOk(`Flag ${key} actualizada.`);
      } catch (err: any) {
        setError(String(err?.message || err || "No se pudo actualizar system flag."));
      } finally {
        setSaving(false);
      }
    },
    [systemFlags],
  );

  const toggleSupportFlag = useCallback(
    async (key: keyof typeof DEFAULT_SUPPORT_RUNTIME_FLAGS) => {
      setSaving(true);
      setError("");
      setOk("");
      const nextValue = !Boolean(supportFlags[key]);
      const result = await setSupportRuntimeFlag(key, nextValue, {
        updatedBy: usuarioId || null,
      });
      setSaving(false);
      if (!result.ok) {
        setError(result.error || "No se pudo actualizar support runtime flag.");
        return;
      }
      setSupportFlags(result.flags);
      setSupportDraft(result.flags);
      setOk(`Runtime flag ${key} actualizada.`);
    },
    [supportFlags, usuarioId],
  );

  const handleSaveRuntimeConfig = useCallback(async () => {
    setSaving(true);
    setError("");
    setOk("");
    const result = await updateSupportRuntimeFlags(
      {
        ...supportDraft,
        max_assigned_tickets: Number(supportDraft.max_assigned_tickets || 5),
        max_processing_tickets: Number(supportDraft.max_processing_tickets || 1),
        wait_user_to_personal_queue_minutes: Number(
          supportDraft.wait_user_to_personal_queue_minutes || 10,
        ),
        personal_queue_release_minutes: Number(supportDraft.personal_queue_release_minutes || 5),
        personal_queue_release_overload_minutes: Number(
          supportDraft.personal_queue_release_overload_minutes || 1,
        ),
        personal_queue_overload_threshold: Number(
          supportDraft.personal_queue_overload_threshold || 5,
        ),
        retake_reassignment_window_hours: Number(
          supportDraft.retake_reassignment_window_hours || 168,
        ),
        retake_reassignment_multiplier: Number(
          supportDraft.retake_reassignment_multiplier || 1.25,
        ),
      },
      { updatedBy: usuarioId || null },
    );
    setSaving(false);
    if (!result.ok) {
      setError(result.error || "No se pudo guardar configuracion runtime.");
      return;
    }
    setSupportFlags(result.flags);
    setSupportDraft(result.flags);
    setOk("Configuracion runtime guardada.");
  }, [supportDraft, usuarioId]);

  const handleCreateCode = useCallback(async () => {
    setCreatingCode(true);
    setError("");
    setOk("");
    try {
      await createRegistrationCode();
      setOk("Codigo de registro creado.");
      await loadAll();
    } catch (err: any) {
      setError(String(err?.message || err || "No se pudo crear el codigo."));
    } finally {
      setCreatingCode(false);
    }
  }, [loadAll]);

  const handleRevokeCode = useCallback(
    async (id: string) => {
      setSaving(true);
      setError("");
      setOk("");
      try {
        await revokeRegistrationCode(id);
        setOk("Codigo revocado.");
        await loadAll();
      } catch (err: any) {
        setError(String(err?.message || err || "No se pudo revocar el codigo."));
      } finally {
        setSaving(false);
      }
    },
    [loadAll],
  );

  const wide = width >= 1024;
  const grid = width >= 768;
  const busy = loading || saving || creatingCode;
  const columns: StaffTableColumn<RegistrationCode>[] = [
    { key: "code", label: "Código", width: 139, render: (row) => (
      <>
        <Text style={styles.codeTitle} numberOfLines={2}>{row.code || "—"}</Text>
        <Text style={styles.metaText} numberOfLines={1}>{row.id || "—"}</Text>
      </>
    ) },
    { key: "status", label: "Estado", width: 99, render: (row) => {
      const status = statusOfCode(row);
      return <StaffTableBadge value={status} tone={status === "activo" ? "positive" : status === "expirado" ? "warning" : "neutral"} />;
    } },
    { key: "created", label: "Creado", width: 121, render: (row) => <Text style={styles.metaText}>{row.created_at ? formatDateTime(row.created_at) : "—"}</Text> },
  ];
  if (grid) columns.push({ key: "used", label: "Usado", width: 120, render: (row) => <Text style={styles.metaText}>{row.used_at ? formatDateTime(row.used_at) : "—"}</Text> });
  columns.push({ key: "action", label: "Acciones", width: 112, align: "right", render: (row) => {
    const disabled = busy || !row.id || statusOfCode(row) === "revocado";
    return (
      <Pressable accessibilityRole="button" disabled={disabled} onPress={() => { if (row.id) void handleRevokeCode(row.id); }} style={[styles.outlineBtn, disabled && styles.btnDisabled]}>
        <Image source={staffIcons.key} style={styles.smallIcon} />
        <Text style={styles.outlineBtnText}>Revocar</Text>
      </Pressable>
    );
  } });

  return (
    <ScreenScaffold title="Sistema" subtitle="Control global y herramientas administrativas" onRefresh={busy ? undefined : loadAll}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
        {error ? <Text accessibilityLiveRegion="polite" style={[styles.feedback, styles.errorText]}>{error}</Text> : null}
        {ok ? <Text accessibilityLiveRegion="polite" style={[styles.feedback, styles.okText]}>{ok}</Text> : null}
        <View style={[styles.columns, wide && styles.columnsWide]}>
          <View style={[styles.column, wide && styles.columnWide]}>
            <View>
              <Text accessibilityRole="header" style={styles.sectionTitle}>Feature flags</Text>
              <Text style={styles.metaText}>Controles globales de la plataforma.</Text>
            </View>
            {loading ? <BlockSkeleton lines={5} compact /> : SYSTEM_FLAGS.map((flag) => (
              <ToggleRow
                key={flag.key}
                title={flag.title}
                description={flag.desc}
                icon={staffIcons.toggle}
                enabled={Boolean(systemFlags[flag.key])}
                disabled={busy}
                onPress={() => void toggleSystemFlag(flag.key)}
              />
            ))}

            <SectionCard title="Soporte SDK" subtitle="Asignación y tiempos de atención de la bandeja">
              {loading ? <BlockSkeleton lines={7} compact /> : (
                <>
                  <ToggleRow
                    title="Autoasignación"
                    description="Activa o pausa el reparto automático."
                    enabled={Boolean(supportDraft.auto_assign_enabled)}
                    disabled={busy}
                    onPress={() => setSupportDraft((prev) => ({ ...prev, auto_assign_enabled: !prev.auto_assign_enabled }))}
                    inset
                  />
                  <View style={[styles.fieldsGrid, grid && styles.fieldsGridWide]}>
              <NumericField
                wide={grid}
                disabled={busy}
                label="Máximo de tickets asignados"
                value={supportDraft.max_assigned_tickets}
                onChangeText={(value) =>
                  setSupportDraft((prev) => ({ ...prev, max_assigned_tickets: Number(value || 0) }))
                }
              />
              <NumericField
                wide={grid}
                disabled={busy}
                label="Máximo de tickets en proceso"
                value={supportDraft.max_processing_tickets}
                onChangeText={(value) =>
                  setSupportDraft((prev) => ({ ...prev, max_processing_tickets: Number(value || 0) }))
                }
              />
              <NumericField
                wide={grid}
                disabled={busy}
                label="Espera de usuario a cola personal (min)"
                value={supportDraft.wait_user_to_personal_queue_minutes}
                onChangeText={(value) =>
                  setSupportDraft((prev) => ({
                    ...prev,
                    wait_user_to_personal_queue_minutes: Number(value || 0),
                  }))
                }
              />
              <NumericField
                wide={grid}
                disabled={busy}
                label="Cola personal a general (min)"
                value={supportDraft.personal_queue_release_minutes}
                onChangeText={(value) =>
                  setSupportDraft((prev) => ({
                    ...prev,
                    personal_queue_release_minutes: Number(value || 0),
                  }))
                }
              />
              <NumericField
                wide={grid}
                disabled={busy}
                label="Liberación por sobrecarga (min)"
                value={supportDraft.personal_queue_release_overload_minutes}
                onChangeText={(value) =>
                  setSupportDraft((prev) => ({
                    ...prev,
                    personal_queue_release_overload_minutes: Number(value || 0),
                  }))
                }
              />
              <NumericField
                wide={grid}
                disabled={busy}
                label="Umbral de sobrecarga"
                value={supportDraft.personal_queue_overload_threshold}
                onChangeText={(value) =>
                  setSupportDraft((prev) => ({
                    ...prev,
                    personal_queue_overload_threshold: Number(value || 0),
                  }))
                }
              />
              <View style={[styles.fieldWrap, grid && styles.fieldWrapWide]}>
                <Text style={styles.fieldLabel}>Ventana para retomar</Text>
                <StaffSelect
                  label="Ventana para retomar"
                  appearance="field"
                  value={supportDraft.retake_reassignment_window_mode}
                  options={RETAKE_WINDOWS}
                  disabled={busy}
                  onSelect={(value) => setSupportDraft((prev) => ({ ...prev, retake_reassignment_window_mode: value }))}
                />
              </View>
              <NumericField
                wide={grid}
                disabled={busy || supportDraft.retake_reassignment_window_mode !== "manual"}
                label="Horas de la ventana manual"
                value={supportDraft.retake_reassignment_window_hours}
                onChangeText={(value) =>
                  setSupportDraft((prev) => ({
                    ...prev,
                    retake_reassignment_window_hours: Number(value || 0),
                  }))
                }
              />
              <NumericField
                wide={grid}
                disabled={busy}
                label="Multiplicador de espera para retomar"
                value={supportDraft.retake_reassignment_multiplier}
                onChangeText={(value) =>
                  setSupportDraft((prev) => ({
                    ...prev,
                    retake_reassignment_multiplier: Number(value || 0),
                  }))
                }
              />

                  </View>
                  <Pressable accessibilityRole="button" onPress={() => void handleSaveRuntimeConfig()} disabled={busy} style={[styles.primaryBtn, styles.saveButton, busy && styles.btnDisabled]}>
                    <Text style={styles.primaryBtnText}>{saving ? "Guardando..." : "Guardar configuración"}</Text>
                  </Pressable>
                </>
              )}
            </SectionCard>

            <View>
              <Text accessibilityRole="header" style={styles.smallSectionTitle}>Autorización de soporte</Text>
              <Text style={styles.metaText}>Permisos para iniciar sesión y jornada.</Text>
            </View>
            {loading ? <BlockSkeleton lines={3} compact /> : SUPPORT_AUTH_FLAGS.map((flag) => (
              <ToggleRow
                key={flag.key}
                title={flag.title}
                description={flag.desc}
                icon={staffIcons.shield}
                enabled={Boolean(supportFlags[flag.key])}
                disabled={busy}
                onPress={() => void toggleSupportFlag(flag.key)}
              />
            ))}
          </View>

          <View style={[styles.column, wide && styles.columnWide]}>
            <View style={styles.codesHeader}>
              <View style={styles.headingCopy}>
                <Text accessibilityRole="header" style={styles.sectionTitle}>Códigos de registro</Text>
                <Text style={styles.metaText}>Control de onboarding para negocios.</Text>
              </View>
              <Pressable accessibilityRole="button" onPress={handleCreateCode} disabled={busy} style={[styles.primaryBtn, busy && styles.btnDisabled]}>
                <Image source={staffIcons.plus} style={styles.plusIcon} />
                <Text style={styles.primaryBtnText}>{creatingCode ? "Creando..." : "Crear código"}</Text>
              </Pressable>
            </View>
            {loading ? <BlockSkeleton lines={4} compact /> : (
              <StaffTable columns={columns} rows={codes} getKey={(row) => String(row.id || row.code)} emptyMessage="Sin códigos disponibles." />
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenScaffold>
  );
}

function ToggleRow({ title, description, icon, enabled, onPress, disabled, inset = false }: {
  title: string;
  description: string;
  icon?: ImageSourcePropType;
  enabled: boolean;
  onPress: () => void;
  disabled: boolean;
  inset?: boolean;
}) {
  return (
    <View style={[styles.toggleRow, inset && styles.toggleRowInset]}>
      {icon ? (
        <View style={styles.iconPlate}><Image source={icon} style={styles.toggleIcon} /></View>
      ) : null}
      <View style={styles.toggleCopy}>
        <Text style={styles.toggleTitle}>{title}</Text>
        <Text style={styles.metaText}>{description}</Text>
      </View>
      <Pressable
        accessibilityRole="switch"
        accessibilityLabel={title}
        accessibilityState={{ checked: enabled, disabled }}
        onPress={onPress}
        disabled={disabled}
        hitSlop={8}
        style={[styles.toggle, enabled && styles.toggleActive, disabled && styles.btnDisabled]}
      >
        <View style={[styles.toggleKnob, enabled && styles.toggleKnobActive]} />
      </Pressable>
    </View>
  );
}

function NumericField({ label, value, onChangeText, wide, disabled }: {
  label: string;
  value: string | number;
  onChangeText: (value: string) => void;
  wide: boolean;
  disabled: boolean;
}) {
  const [text, setText] = useState(String(value ?? ""));
  const focused = useRef(false);

  useEffect(() => {
    if (!focused.current) setText(String(value ?? ""));
  }, [value]);

  return (
    <View style={[styles.fieldWrap, wide && styles.fieldWrapWide]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        value={text}
        editable={!disabled}
        keyboardType="numeric"
        style={[styles.input, disabled && styles.inputDisabled]}
        onFocus={() => { focused.current = true; }}
        onBlur={() => { focused.current = false; setText(String(value ?? "")); }}
        onChangeText={(draft) => {
          setText(draft);
          const normalized = draft.trim().replace(",", ".");
          if (Number.isFinite(Number(normalized))) onChangeText(normalized);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { gap: 20, paddingBottom: 48 },
  columns: { gap: 24 },
  columnsWide: { flexDirection: "row", alignItems: "flex-start" },
  column: { gap: 12 },
  columnWide: { flex: 1, minWidth: 0 },
  sectionTitle: { color: "#2F1A55", fontSize: 18, lineHeight: 28, fontWeight: "600", includeFontPadding: false },
  smallSectionTitle: { color: "#2F1A55", fontSize: 14, lineHeight: 20, fontWeight: "600", includeFontPadding: false },
  toggleRow: { flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 1, borderColor: "#E9E2F7", borderRadius: 16, backgroundColor: "#FFFFFF", padding: 16, elevation: 1 },
  toggleRowInset: { borderRadius: 12, borderColor: "#EEE7FA", paddingHorizontal: 12, paddingVertical: 8, elevation: 0 },
  iconPlate: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: "#F7F4FF" },
  toggleIcon: { width: 18, height: 18, tintColor: "#5E30A5" },
  toggleCopy: { flex: 1, gap: 2 },
  toggleTitle: { fontSize: 14, lineHeight: 20, fontWeight: "600", color: "#2F1A55", includeFontPadding: false },
  toggle: { width: 44, height: 24, borderRadius: 12, backgroundColor: "#E2E8F0", justifyContent: "center", paddingHorizontal: 2 },
  toggleActive: { backgroundColor: "#5E30A5" },
  toggleKnob: { width: 20, height: 20, borderRadius: 10, backgroundColor: "#FFFFFF", elevation: 1 },
  toggleKnobActive: { alignSelf: "flex-end" },
  fieldsGrid: { gap: 12, marginTop: 4 },
  fieldsGridWide: { flexDirection: "row", flexWrap: "wrap" },
  fieldWrap: { gap: 4 },
  fieldWrapWide: { flexGrow: 1, flexBasis: "45%" },
  fieldLabel: { color: "#2F1A55", fontSize: 12, lineHeight: 16, fontWeight: "600", includeFontPadding: false },
  input: { minHeight: 40, borderWidth: 1, borderColor: "#E9E2F7", borderRadius: 12, backgroundColor: "#FFFFFF", color: "#334155", paddingHorizontal: 12, paddingVertical: 8, fontSize: 14 },
  inputDisabled: { color: "#94A3B8", backgroundColor: "#F8FAFC" },
  saveButton: { alignSelf: "flex-end", marginTop: 4 },
  codesHeader: { alignItems: "flex-start", gap: 12 },
  headingCopy: { flexShrink: 1, gap: 2 },
  codeTitle: { fontSize: 14, fontWeight: "600", color: "#334155" },
  primaryBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "#5E30A5", borderRadius: 12, paddingVertical: 8, paddingHorizontal: 12 },
  primaryBtnText: { color: "#FFFFFF", fontSize: 12, fontWeight: "600" },
  plusIcon: { width: 14, height: 14, tintColor: "#FFFFFF" },
  outlineBtn: { flexDirection: "row", alignItems: "center", gap: 4, borderWidth: 1, borderColor: "#E9E2F7", backgroundColor: "#FFFFFF", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  outlineBtnText: { color: "#64748B", fontSize: 12, fontWeight: "600" },
  smallIcon: { height: 12, width: 12, tintColor: "#64748B" },
  metaText: { fontSize: 12, lineHeight: 16, color: "#64748B", includeFontPadding: false },
  feedback: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, fontSize: 12, fontWeight: "600" },
  errorText: { color: "#B91C1C", backgroundColor: "#FFF1F2", borderColor: "#FECACA" },
  okText: { color: "#166534", backgroundColor: "#F0FDF4", borderColor: "#BBF7D0" },
  btnDisabled: { opacity: 0.55 },
});
