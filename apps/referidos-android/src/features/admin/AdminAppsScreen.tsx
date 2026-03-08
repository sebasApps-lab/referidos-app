import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import {
  createSupportApp,
  dispatchSupportAppsSync,
  fetchSupportApps,
  formatAliasesInput,
  setSupportAppActive,
  updateSupportApp,
} from "@shared/services/supportOps";

function normalizeAppRow(row: any) {
  return {
    id: String(row?.id || ""),
    app_key: String(row?.app_key || row?.key || ""),
    app_code: String(row?.app_code || row?.code || ""),
    display_name: String(row?.display_name || row?.name || "App"),
    origin_source_default: String(row?.origin_source_default || "user"),
    aliases: Array.isArray(row?.aliases) ? row.aliases : [],
    is_active: Boolean(row?.is_active ?? true),
  };
}

const EMPTY_FORM = {
  appKey: "",
  appCode: "",
  displayName: "",
  originSourceDefault: "user",
  aliases: "",
};

export default function AdminAppsScreen() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [rows, setRows] = useState<any[]>([]);
  const [editingId, setEditingId] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);

  const loadRows = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchSupportApps();
      setRows((data || []).map(normalizeAppRow));
    } catch (err: any) {
      setRows([]);
      setError(String(err?.message || err || "No se pudo cargar support apps."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRows();
  }, [loadRows]);

  const resetForm = useCallback(() => {
    setEditingId("");
    setForm(EMPTY_FORM);
  }, []);

  const orderedRows = useMemo(
    () =>
      [...rows].sort((a, b) => {
        if (a.is_active !== b.is_active) return a.is_active ? -1 : 1;
        return a.display_name.localeCompare(b.display_name, "es", { sensitivity: "base" });
      }),
    [rows],
  );

  const handleSubmit = useCallback(async () => {
    setSaving(true);
    setError("");
    setOk("");
    try {
      if (!form.appKey.trim() || !form.appCode.trim() || !form.displayName.trim()) {
        throw new Error("Completa app key, app code y display name.");
      }
      if (editingId) {
        await updateSupportApp(editingId, {
          appCode: form.appCode,
          displayName: form.displayName,
          originSourceDefault: form.originSourceDefault,
          aliases: form.aliases.split(",").map((item) => item.trim()),
        });
        setOk("App actualizada.");
      } else {
        await createSupportApp({
          appKey: form.appKey,
          appCode: form.appCode,
          displayName: form.displayName,
          originSourceDefault: form.originSourceDefault,
          aliases: form.aliases.split(",").map((item) => item.trim()),
        });
        setOk("App creada.");
      }
      resetForm();
      await loadRows();
    } catch (err: any) {
      setError(String(err?.message || err || "No se pudo guardar la app."));
    } finally {
      setSaving(false);
    }
  }, [editingId, form, loadRows, resetForm]);

  const handleSync = useCallback(async () => {
    setSyncing(true);
    setError("");
    setOk("");
    try {
      await dispatchSupportAppsSync({
        mode: "hot",
        forceFull: true,
        trigger: "android_admin_apps_screen",
      });
      setOk("Sincronizacion OPS ejecutada.");
      await loadRows();
    } catch (err: any) {
      setError(String(err?.message || err || "No se pudo sincronizar support apps."));
    } finally {
      setSyncing(false);
    }
  }, [loadRows]);

  const handleToggleActive = useCallback(
    async (row: any) => {
      setSaving(true);
      setError("");
      setOk("");
      try {
        await setSupportAppActive(String(row.id), !row.is_active);
        setOk(row.is_active ? "App desactivada." : "App reactivada.");
        await loadRows();
      } catch (err: any) {
        setError(String(err?.message || err || "No se pudo cambiar estado de la app."));
      } finally {
        setSaving(false);
      }
    },
    [loadRows],
  );

  const startEdit = useCallback((row: any) => {
    setEditingId(String(row.id || ""));
    setForm({
      appKey: String(row.app_key || ""),
      appCode: String(row.app_code || ""),
      displayName: String(row.display_name || ""),
      originSourceDefault: String(row.origin_source_default || "user"),
      aliases: formatAliasesInput(row.aliases || []),
    });
  }, []);

  return (
    <ScreenScaffold
      title="Admin Apps"
      subtitle="Registry runtime de support apps y sincronizacion OPS"
    >
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard
          title={editingId ? "Editar app" : "Nueva app"}
          subtitle="Mismo backend runtime que usa referidos-app"
          right={
            <View style={styles.actionsRow}>
              <Pressable onPress={handleSync} disabled={syncing} style={styles.secondaryBtn}>
                <Text style={styles.secondaryBtnText}>{syncing ? "..." : "Sync OPS"}</Text>
              </Pressable>
              {editingId ? (
                <Pressable onPress={resetForm} style={styles.outlineBtn}>
                  <Text style={styles.outlineBtnText}>Cancelar</Text>
                </Pressable>
              ) : null}
            </View>
          }
        >
          <TextInput
            value={form.appKey}
            onChangeText={(value) => setForm((prev) => ({ ...prev, appKey: value }))}
            placeholder="app_key"
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            value={form.appCode}
            onChangeText={(value) => setForm((prev) => ({ ...prev, appCode: value }))}
            placeholder="app_code"
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            value={form.displayName}
            onChangeText={(value) => setForm((prev) => ({ ...prev, displayName: value }))}
            placeholder="display_name"
            style={styles.input}
          />
          <TextInput
            value={form.originSourceDefault}
            onChangeText={(value) =>
              setForm((prev) => ({ ...prev, originSourceDefault: value }))
            }
            placeholder="origin_source_default"
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            value={form.aliases}
            onChangeText={(value) => setForm((prev) => ({ ...prev, aliases: value }))}
            placeholder="aliases separados por coma"
            autoCapitalize="none"
            style={styles.input}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {ok ? <Text style={styles.okText}>{ok}</Text> : null}
          <Pressable
            onPress={handleSubmit}
            disabled={saving}
            style={[styles.primaryBtn, saving && styles.btnDisabled]}
          >
            <Text style={styles.primaryBtnText}>
              {saving ? "Guardando..." : editingId ? "Guardar cambios" : "Crear app"}
            </Text>
          </Pressable>
        </SectionCard>

        <SectionCard title="Apps registradas" subtitle={`${orderedRows.length} filas`}>
          {loading ? <BlockSkeleton lines={8} compact /> : null}
          {!loading && orderedRows.length === 0 ? (
            <Text style={styles.emptyText}>No hay support apps registradas.</Text>
          ) : null}
          {!loading
            ? orderedRows.map((row) => (
                <View key={row.id} style={styles.rowCard}>
                  <View style={styles.rowTop}>
                    <Text style={styles.rowTitle}>{row.display_name}</Text>
                    <Text style={[styles.badge, row.is_active ? styles.badgeOk : styles.badgeMuted]}>
                      {row.is_active ? "ACTIVE" : "INACTIVE"}
                    </Text>
                  </View>
                  <Text style={styles.metaText}>
                    {row.app_key} | {row.app_code} | origin: {row.origin_source_default}
                  </Text>
                  <Text style={styles.metaText}>
                    aliases: {row.aliases.length ? row.aliases.join(", ") : "-"}
                  </Text>
                  <View style={styles.actionsRow}>
                    <Pressable onPress={() => startEdit(row)} style={styles.secondaryBtn}>
                      <Text style={styles.secondaryBtnText}>Editar</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => void handleToggleActive(row)}
                      disabled={saving}
                      style={styles.outlineBtn}
                    >
                      <Text style={styles.outlineBtnText}>
                        {row.is_active ? "Desactivar" : "Activar"}
                      </Text>
                    </Pressable>
                  </View>
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
    paddingBottom: 24,
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
  actionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  rowCard: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 10,
    gap: 4,
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  rowTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },
  metaText: {
    fontSize: 11,
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
  badgeMuted: {
    backgroundColor: "#E2E8F0",
    color: "#475569",
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
  },
  outlineBtnText: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "700",
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
  btnDisabled: {
    opacity: 0.55,
  },
});
