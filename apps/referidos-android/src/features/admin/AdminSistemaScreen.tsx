import React, { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import { useAppStore } from "@shared/store/appStore";
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
    title: "Deshabilitar generacion de QR",
    desc: "Bloquea nuevos QR desde la app.",
  },
  {
    key: "maintenance",
    title: "Modo mantenimiento",
    desc: "Pausa flujos criticos y permite mensajes de mantenimiento.",
  },
  {
    key: "freeze_registro",
    title: "Bloquear registros",
    desc: "Evita nuevas altas de usuarios y negocios.",
  },
  {
    key: "support_live_updates",
    title: "Support live updates",
    desc: "Permite realtime/polling agresivo para soporte.",
  },
  {
    key: "oauth_apple_enabled",
    title: "Apple OAuth",
    desc: "Muestra Apple en autenticacion Android.",
  },
] as const;

const SUPPORT_AUTH_FLAGS = [
  {
    key: "require_session_authorization",
    title: "Requerir autorizacion de sesion",
  },
  {
    key: "require_jornada_authorization",
    title: "Requerir autorizacion de jornada",
  },
] as const;

function statusOfCode(row: any) {
  if (row?.revoked_at) return "revocado";
  if (row?.used_at) return "usado";
  if (row?.expires_at && new Date(row.expires_at).getTime() <= Date.now()) return "expirado";
  return "activo";
}

export default function AdminSistemaScreen() {
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
  const [codes, setCodes] = useState<any[]>([]);

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

  return (
    <ScreenScaffold title="Admin Sistema" subtitle="Feature flags, runtime support y codigos de registro">
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard
          title="Estado"
          subtitle="Mismo backend y runtime de referidos-app"
          right={
            <Pressable onPress={loadAll} disabled={loading} style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>{loading ? "..." : "Recargar"}</Text>
            </Pressable>
          }
        >
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {ok ? <Text style={styles.okText}>{ok}</Text> : null}
        </SectionCard>

        <SectionCard title="System feature flags">
          {loading ? <BlockSkeleton lines={5} compact /> : null}
          {!loading
            ? SYSTEM_FLAGS.map((flag) => (
                <ToggleRow
                  key={flag.key}
                  title={flag.title}
                  description={flag.desc}
                  enabled={Boolean(systemFlags[flag.key])}
                  onPress={() => void toggleSystemFlag(flag.key)}
                />
              ))
            : null}
        </SectionCard>

        <SectionCard title="Soporte runtime">
          {loading ? <BlockSkeleton lines={7} compact /> : null}
          {!loading
            ? SUPPORT_AUTH_FLAGS.map((flag) => (
                <ToggleRow
                  key={flag.key}
                  title={flag.title}
                  description="Persistido en support_runtime_flags."
                  enabled={Boolean(supportFlags[flag.key])}
                  onPress={() => void toggleSupportFlag(flag.key)}
                />
              ))
            : null}
          {!loading ? (
            <>
              <ToggleRow
                title="Autoasignacion"
                description="Activa o pausa el reparto automatico."
                enabled={Boolean(supportDraft.auto_assign_enabled)}
                onPress={() =>
                  setSupportDraft((prev) => ({
                    ...prev,
                    auto_assign_enabled: !prev.auto_assign_enabled,
                  }))
                }
              />
              <NumericField
                label="Max tickets asignados"
                value={supportDraft.max_assigned_tickets}
                onChangeText={(value) =>
                  setSupportDraft((prev) => ({ ...prev, max_assigned_tickets: Number(value || 0) }))
                }
              />
              <NumericField
                label="Max tickets en proceso"
                value={supportDraft.max_processing_tickets}
                onChangeText={(value) =>
                  setSupportDraft((prev) => ({ ...prev, max_processing_tickets: Number(value || 0) }))
                }
              />
              <NumericField
                label="Espera usuario -> cola personal (min)"
                value={supportDraft.wait_user_to_personal_queue_minutes}
                onChangeText={(value) =>
                  setSupportDraft((prev) => ({
                    ...prev,
                    wait_user_to_personal_queue_minutes: Number(value || 0),
                  }))
                }
              />
              <NumericField
                label="Cola personal -> general (min)"
                value={supportDraft.personal_queue_release_minutes}
                onChangeText={(value) =>
                  setSupportDraft((prev) => ({
                    ...prev,
                    personal_queue_release_minutes: Number(value || 0),
                  }))
                }
              />
              <NumericField
                label="Release por sobrecarga (min)"
                value={supportDraft.personal_queue_release_overload_minutes}
                onChangeText={(value) =>
                  setSupportDraft((prev) => ({
                    ...prev,
                    personal_queue_release_overload_minutes: Number(value || 0),
                  }))
                }
              />
              <NumericField
                label="Umbral de sobrecarga"
                value={supportDraft.personal_queue_overload_threshold}
                onChangeText={(value) =>
                  setSupportDraft((prev) => ({
                    ...prev,
                    personal_queue_overload_threshold: Number(value || 0),
                  }))
                }
              />
              <NumericField
                label="Ventana retake (horas)"
                value={supportDraft.retake_reassignment_window_hours}
                onChangeText={(value) =>
                  setSupportDraft((prev) => ({
                    ...prev,
                    retake_reassignment_window_hours: Number(value || 0),
                  }))
                }
              />
              <NumericField
                label="Multiplicador retake"
                value={supportDraft.retake_reassignment_multiplier}
                onChangeText={(value) =>
                  setSupportDraft((prev) => ({
                    ...prev,
                    retake_reassignment_multiplier: Number(value || 0),
                  }))
                }
              />
              <Pressable
                onPress={() => void handleSaveRuntimeConfig()}
                disabled={saving}
                style={[styles.primaryBtn, saving && styles.btnDisabled]}
              >
                <Text style={styles.primaryBtnText}>Guardar configuracion runtime</Text>
              </Pressable>
            </>
          ) : null}
        </SectionCard>

        <SectionCard
          title="Codigos de registro"
          subtitle={`${codes.length} registros`}
          right={
            <Pressable onPress={handleCreateCode} disabled={creatingCode} style={styles.primaryInlineBtn}>
              <Text style={styles.primaryInlineBtnText}>{creatingCode ? "..." : "Crear codigo"}</Text>
            </Pressable>
          }
        >
          {loading ? <BlockSkeleton lines={4} compact /> : null}
          {!loading && codes.length === 0 ? (
            <Text style={styles.emptyText}>No hay codigos disponibles.</Text>
          ) : null}
          {!loading
            ? codes.map((row) => {
                const status = statusOfCode(row);
                return (
                  <View key={String(row?.id || row?.code)} style={styles.codeCard}>
                    <View style={styles.codeTop}>
                      <Text style={styles.codeTitle}>{String(row?.code || "-")}</Text>
                      <Text
                        style={[
                          styles.badge,
                          status === "activo"
                            ? styles.badgeOk
                            : status === "expirado"
                              ? styles.badgeWarn
                              : styles.badgeMuted,
                        ]}
                      >
                        {status.toUpperCase()}
                      </Text>
                    </View>
                    <Text style={styles.metaText}>id: {String(row?.id || "-")}</Text>
                    <Text style={styles.metaText}>
                      creado: {String(row?.created_at || "-")} | usado: {String(row?.used_at || "-")}
                    </Text>
                    <Pressable
                      onPress={() => void handleRevokeCode(String(row?.id || ""))}
                      disabled={saving || status === "revocado"}
                      style={styles.outlineBtn}
                    >
                      <Text style={styles.outlineBtnText}>Revocar</Text>
                    </Pressable>
                  </View>
                );
              })
            : null}
        </SectionCard>
      </ScrollView>
    </ScreenScaffold>
  );
}

function ToggleRow({
  title,
  description,
  enabled,
  onPress,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onPress: () => void;
}) {
  return (
    <View style={styles.toggleRow}>
      <View style={styles.toggleCopy}>
        <Text style={styles.toggleTitle}>{title}</Text>
        <Text style={styles.metaText}>{description}</Text>
      </View>
      <Pressable onPress={onPress} style={[styles.toggle, enabled && styles.toggleActive]}>
        <View style={[styles.toggleKnob, enabled && styles.toggleKnobActive]} />
      </Pressable>
    </View>
  );
}

function NumericField({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string | number;
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.toggleTitle}>{label}</Text>
      <TextInput
        value={String(value ?? "")}
        onChangeText={onChangeText}
        keyboardType="numeric"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 12,
    paddingBottom: 24,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    backgroundColor: "#F8FAFC",
    padding: 10,
  },
  toggleCopy: {
    flex: 1,
    gap: 2,
  },
  toggleTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0F172A",
  },
  toggle: {
    width: 46,
    height: 28,
    borderRadius: 999,
    backgroundColor: "#CBD5E1",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  toggleActive: {
    backgroundColor: "#7C3AED",
  },
  toggleKnob: {
    width: 22,
    height: 22,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
  },
  toggleKnobActive: {
    alignSelf: "flex-end",
  },
  fieldWrap: {
    gap: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    color: "#0F172A",
    paddingHorizontal: 10,
    paddingVertical: 9,
    fontSize: 13,
  },
  codeCard: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    backgroundColor: "#F8FAFC",
    padding: 10,
    gap: 4,
  },
  codeTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    alignItems: "center",
  },
  codeTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },
  primaryBtn: {
    backgroundColor: "#1D4ED8",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  primaryInlineBtn: {
    backgroundColor: "#1D4ED8",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  primaryInlineBtnText: {
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
    paddingVertical: 8,
  },
  secondaryBtnText: {
    color: "#1D4ED8",
    fontSize: 12,
    fontWeight: "700",
  },
  outlineBtn: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  outlineBtnText: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "700",
  },
  metaText: {
    fontSize: 11,
    color: "#64748B",
  },
  errorText: {
    fontSize: 12,
    color: "#B91C1C",
    fontWeight: "600",
  },
  okText: {
    fontSize: 12,
    color: "#166534",
    fontWeight: "600",
  },
  emptyText: {
    fontSize: 12,
    color: "#64748B",
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 10,
    fontWeight: "700",
    overflow: "hidden",
  },
  badgeOk: {
    backgroundColor: "#DCFCE7",
    color: "#15803D",
  },
  badgeWarn: {
    backgroundColor: "#FEF3C7",
    color: "#B45309",
  },
  badgeMuted: {
    backgroundColor: "#E2E8F0",
    color: "#475569",
  },
  btnDisabled: {
    opacity: 0.55,
  },
});
