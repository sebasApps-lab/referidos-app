import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import {
  createSupportMacro,
  createSupportMacroCategory,
  deleteSupportMacro,
  deleteSupportMacroCategory,
  dispatchSupportMacrosSync,
  listSupportMacroCatalog,
  setSupportMacroCategoryStatus,
  setSupportMacroStatus,
  updateSupportMacro,
  updateSupportMacroCategory,
} from "@shared/services/supportOps";

const EMPTY_CATEGORY_FORM = {
  id: "",
  code: "",
  label: "",
  description: "",
  appTargets: "all",
};

const EMPTY_MACRO_FORM = {
  id: "",
  title: "",
  body: "",
  categoryId: "",
  threadStatus: "new",
  audienceRoles: "cliente,negocio",
  appTargets: "all",
  envTargets: "all",
};

function toCsv(values: any) {
  return Array.isArray(values) ? values.join(",") : String(values || "");
}

function normalizeCategory(row: any) {
  return {
    id: String(row?.id || ""),
    code: String(row?.code || ""),
    label: String(row?.label || row?.code || "Categoria"),
    description: String(row?.description || ""),
    status: String(row?.status || "active"),
    app_targets: Array.isArray(row?.app_targets) ? row.app_targets : ["all"],
  };
}

function normalizeMacro(row: any) {
  return {
    id: String(row?.id || ""),
    title: String(row?.title || "Macro"),
    body: String(row?.body || ""),
    category_id: String(row?.category_id || ""),
    category_code: String(row?.category_code || ""),
    thread_status: String(row?.thread_status || "new"),
    audience_roles: Array.isArray(row?.audience_roles) ? row.audience_roles : ["cliente", "negocio"],
    app_targets: Array.isArray(row?.app_targets) ? row.app_targets : ["all"],
    env_targets: Array.isArray(row?.env_targets) ? row.env_targets : ["all"],
    status: String(row?.status || "draft"),
  };
}

export default function AdminSupportCatalogScreen() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [macros, setMacros] = useState<any[]>([]);
  const [categoryForm, setCategoryForm] = useState(EMPTY_CATEGORY_FORM);
  const [macroForm, setMacroForm] = useState(EMPTY_MACRO_FORM);

  const loadCatalog = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await listSupportMacroCatalog({
        includeArchived: true,
        includeDraft: true,
      });
      setCategories((data?.categories || []).map(normalizeCategory));
      setMacros((data?.macros || []).map(normalizeMacro));
    } catch (err: any) {
      setCategories([]);
      setMacros([]);
      setError(String(err?.message || err || "No se pudo cargar el catalogo de soporte."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCatalog();
  }, [loadCatalog]);

  const groupedMacros = useMemo(() => {
    const byCategory = new Map<string, any[]>();
    macros.forEach((macro) => {
      const key = macro.category_id || macro.category_code || "general";
      if (!byCategory.has(key)) byCategory.set(key, []);
      byCategory.get(key)?.push(macro);
    });
    return categories.map((category) => ({
      ...category,
      macros: byCategory.get(category.id) || byCategory.get(category.code) || [],
    }));
  }, [categories, macros]);

  const syncCatalog = useCallback(async () => {
    setSyncing(true);
    setError("");
    setOk("");
    try {
      await dispatchSupportMacrosSync({
        mode: "hot",
        panelKey: "android_admin_support_catalog",
        forceFull: true,
      });
      setOk("Sincronizacion de macros ejecutada.");
      await loadCatalog();
    } catch (err: any) {
      setError(String(err?.message || err || "No se pudo sincronizar macros."));
    } finally {
      setSyncing(false);
    }
  }, [loadCatalog]);

  const submitCategory = useCallback(async () => {
    setSaving(true);
    setError("");
    setOk("");
    try {
      const payload = {
        category_id: categoryForm.id || undefined,
        code: categoryForm.code.trim().toLowerCase(),
        label: categoryForm.label.trim(),
        description: categoryForm.description.trim(),
        app_targets: categoryForm.appTargets.split(",").map((item) => item.trim()).filter(Boolean),
      };
      if (!payload.code || !payload.label) {
        throw new Error("Completa code y label de la categoria.");
      }
      if (categoryForm.id) {
        await updateSupportMacroCategory(payload);
        setOk("Categoria actualizada.");
      } else {
        await createSupportMacroCategory(payload);
        setOk("Categoria creada.");
      }
      setCategoryForm(EMPTY_CATEGORY_FORM);
      await syncCatalog();
    } catch (err: any) {
      setError(String(err?.message || err || "No se pudo guardar la categoria."));
    } finally {
      setSaving(false);
    }
  }, [categoryForm, syncCatalog]);

  const submitMacro = useCallback(async () => {
    setSaving(true);
    setError("");
    setOk("");
    try {
      const payload = {
        macro_id: macroForm.id || undefined,
        title: macroForm.title.trim(),
        body: macroForm.body.trim(),
        category_id: macroForm.categoryId.trim() || null,
        thread_status: macroForm.threadStatus.trim() || "new",
        audience_roles: macroForm.audienceRoles.split(",").map((item) => item.trim()).filter(Boolean),
        app_targets: macroForm.appTargets.split(",").map((item) => item.trim()).filter(Boolean),
        env_targets: macroForm.envTargets.split(",").map((item) => item.trim()).filter(Boolean),
      };
      if (!payload.title || !payload.body) {
        throw new Error("Completa titulo y body de la macro.");
      }
      if (macroForm.id) {
        await updateSupportMacro(payload);
        setOk("Macro actualizada.");
      } else {
        await createSupportMacro(payload);
        setOk("Macro creada.");
      }
      setMacroForm(EMPTY_MACRO_FORM);
      await syncCatalog();
    } catch (err: any) {
      setError(String(err?.message || err || "No se pudo guardar la macro."));
    } finally {
      setSaving(false);
    }
  }, [macroForm, syncCatalog]);

  const selectCategory = useCallback((row: any) => {
    setCategoryForm({
      id: row.id,
      code: row.code,
      label: row.label,
      description: row.description,
      appTargets: toCsv(row.app_targets),
    });
  }, []);

  const selectMacro = useCallback((row: any) => {
    setMacroForm({
      id: row.id,
      title: row.title,
      body: row.body,
      categoryId: row.category_id,
      threadStatus: row.thread_status,
      audienceRoles: toCsv(row.audience_roles),
      appTargets: toCsv(row.app_targets),
      envTargets: toCsv(row.env_targets),
    });
  }, []);

  const updateCategoryStatus = useCallback(async (row: any, nextStatus: string) => {
    setSaving(true);
    setError("");
    setOk("");
    try {
      await setSupportMacroCategoryStatus({
        categoryId: row.id,
        status: nextStatus,
      });
      setOk(`Categoria ${nextStatus}.`);
      await syncCatalog();
    } catch (err: any) {
      setError(String(err?.message || err || "No se pudo actualizar categoria."));
    } finally {
      setSaving(false);
    }
  }, [syncCatalog]);

  const removeCategory = useCallback(async (row: any) => {
    setSaving(true);
    setError("");
    setOk("");
    try {
      await deleteSupportMacroCategory({ categoryId: row.id });
      setOk("Categoria eliminada.");
      setCategoryForm(EMPTY_CATEGORY_FORM);
      await syncCatalog();
    } catch (err: any) {
      setError(String(err?.message || err || "No se pudo eliminar categoria."));
    } finally {
      setSaving(false);
    }
  }, [syncCatalog]);

  const updateMacroStatus = useCallback(async (row: any, nextStatus: string) => {
    setSaving(true);
    setError("");
    setOk("");
    try {
      await setSupportMacroStatus({
        macroId: row.id,
        status: nextStatus,
      });
      setOk(`Macro ${nextStatus}.`);
      await syncCatalog();
    } catch (err: any) {
      setError(String(err?.message || err || "No se pudo actualizar macro."));
    } finally {
      setSaving(false);
    }
  }, [syncCatalog]);

  const removeMacro = useCallback(async (row: any) => {
    setSaving(true);
    setError("");
    setOk("");
    try {
      await deleteSupportMacro({ macroId: row.id });
      setOk("Macro eliminada.");
      setMacroForm(EMPTY_MACRO_FORM);
      await syncCatalog();
    } catch (err: any) {
      setError(String(err?.message || err || "No se pudo eliminar macro."));
    } finally {
      setSaving(false);
    }
  }, [syncCatalog]);

  return (
    <ScreenScaffold title="Admin Support Catalog" subtitle="Categorias y macros runtime de soporte">
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard
          title="Estado"
          subtitle="CRUD contra support-ops-proxy"
          right={
            <Pressable onPress={() => void syncCatalog()} disabled={syncing} style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>{syncing ? "..." : "Sync OPS"}</Text>
            </Pressable>
          }
        >
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {ok ? <Text style={styles.okText}>{ok}</Text> : null}
        </SectionCard>

        <SectionCard title={categoryForm.id ? "Editar categoria" : "Nueva categoria"}>
          <TextInput
            value={categoryForm.code}
            onChangeText={(value) => setCategoryForm((prev) => ({ ...prev, code: value }))}
            placeholder="code"
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            value={categoryForm.label}
            onChangeText={(value) => setCategoryForm((prev) => ({ ...prev, label: value }))}
            placeholder="label"
            style={styles.input}
          />
          <TextInput
            value={categoryForm.description}
            onChangeText={(value) => setCategoryForm((prev) => ({ ...prev, description: value }))}
            placeholder="description"
            style={styles.input}
          />
          <TextInput
            value={categoryForm.appTargets}
            onChangeText={(value) => setCategoryForm((prev) => ({ ...prev, appTargets: value }))}
            placeholder="app_targets csv"
            autoCapitalize="none"
            style={styles.input}
          />
          <View style={styles.actionsRow}>
            <Pressable onPress={() => void submitCategory()} disabled={saving} style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>{categoryForm.id ? "Guardar categoria" : "Crear categoria"}</Text>
            </Pressable>
            {categoryForm.id ? (
              <Pressable onPress={() => setCategoryForm(EMPTY_CATEGORY_FORM)} style={styles.outlineBtn}>
                <Text style={styles.outlineBtnText}>Cancelar</Text>
              </Pressable>
            ) : null}
          </View>
        </SectionCard>

        <SectionCard title={macroForm.id ? "Editar macro" : "Nueva macro"}>
          <TextInput
            value={macroForm.title}
            onChangeText={(value) => setMacroForm((prev) => ({ ...prev, title: value }))}
            placeholder="title"
            style={styles.input}
          />
          <TextInput
            value={macroForm.body}
            onChangeText={(value) => setMacroForm((prev) => ({ ...prev, body: value }))}
            placeholder="body"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            style={[styles.input, styles.textArea]}
          />
          <TextInput
            value={macroForm.categoryId}
            onChangeText={(value) => setMacroForm((prev) => ({ ...prev, categoryId: value }))}
            placeholder="category_id"
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            value={macroForm.threadStatus}
            onChangeText={(value) => setMacroForm((prev) => ({ ...prev, threadStatus: value }))}
            placeholder="thread_status"
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            value={macroForm.audienceRoles}
            onChangeText={(value) => setMacroForm((prev) => ({ ...prev, audienceRoles: value }))}
            placeholder="audience_roles csv"
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            value={macroForm.appTargets}
            onChangeText={(value) => setMacroForm((prev) => ({ ...prev, appTargets: value }))}
            placeholder="app_targets csv"
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            value={macroForm.envTargets}
            onChangeText={(value) => setMacroForm((prev) => ({ ...prev, envTargets: value }))}
            placeholder="env_targets csv"
            autoCapitalize="none"
            style={styles.input}
          />
          <View style={styles.actionsRow}>
            <Pressable onPress={() => void submitMacro()} disabled={saving} style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>{macroForm.id ? "Guardar macro" : "Crear macro"}</Text>
            </Pressable>
            {macroForm.id ? (
              <Pressable onPress={() => setMacroForm(EMPTY_MACRO_FORM)} style={styles.outlineBtn}>
                <Text style={styles.outlineBtnText}>Cancelar</Text>
              </Pressable>
            ) : null}
          </View>
        </SectionCard>

        <SectionCard title="Catalogo actual" subtitle={`${categories.length} categorias | ${macros.length} macros`}>
          {loading ? <BlockSkeleton lines={8} compact /> : null}
          {!loading && groupedMacros.length === 0 ? (
            <Text style={styles.emptyText}>No hay categorias ni macros cargadas.</Text>
          ) : null}
          {!loading
            ? groupedMacros.map((category) => (
                <View key={category.id} style={styles.categoryCard}>
                  <View style={styles.rowTop}>
                    <Text style={styles.rowTitle}>{category.label}</Text>
                    <Text style={[styles.badge, category.status === "active" ? styles.badgeOk : styles.badgeMuted]}>
                      {String(category.status).toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.metaText}>
                    code: {category.code} | apps: {toCsv(category.app_targets)}
                  </Text>
                  <Text style={styles.metaText}>{category.description || "Sin descripcion"}</Text>
                  <View style={styles.actionsRow}>
                    <Pressable onPress={() => selectCategory(category)} style={styles.secondaryBtn}>
                      <Text style={styles.secondaryBtnText}>Editar</Text>
                    </Pressable>
                    <Pressable
                      onPress={() =>
                        void updateCategoryStatus(category, category.status === "active" ? "inactive" : "active")
                      }
                      style={styles.outlineBtn}
                    >
                      <Text style={styles.outlineBtnText}>
                        {category.status === "active" ? "Inactivar" : "Activar"}
                      </Text>
                    </Pressable>
                    <Pressable onPress={() => void removeCategory(category)} style={styles.dangerBtn}>
                      <Text style={styles.dangerBtnText}>Eliminar</Text>
                    </Pressable>
                  </View>
                  {category.macros.map((macro: any) => (
                    <View key={macro.id} style={styles.macroCard}>
                      <View style={styles.rowTop}>
                        <Text style={styles.rowTitle}>{macro.title}</Text>
                        <Text style={[styles.badge, macro.status === "published" ? styles.badgeOk : styles.badgeWarn]}>
                          {String(macro.status).toUpperCase()}
                        </Text>
                      </View>
                      <Text style={styles.metaText}>
                        status: {macro.thread_status} | roles: {toCsv(macro.audience_roles)}
                      </Text>
                      <Text style={styles.metaText}>
                        apps: {toCsv(macro.app_targets)} | envs: {toCsv(macro.env_targets)}
                      </Text>
                      <Text style={styles.bodyText} numberOfLines={3}>
                        {macro.body}
                      </Text>
                      <View style={styles.actionsRow}>
                        <Pressable onPress={() => selectMacro(macro)} style={styles.secondaryBtn}>
                          <Text style={styles.secondaryBtnText}>Editar</Text>
                        </Pressable>
                        <Pressable
                          onPress={() =>
                            void updateMacroStatus(
                              macro,
                              macro.status === "published" ? "archived" : "published",
                            )
                          }
                          style={styles.outlineBtn}
                        >
                          <Text style={styles.outlineBtnText}>
                            {macro.status === "published" ? "Archivar" : "Publicar"}
                          </Text>
                        </Pressable>
                        <Pressable onPress={() => void removeMacro(macro)} style={styles.dangerBtn}>
                          <Text style={styles.dangerBtnText}>Eliminar</Text>
                        </Pressable>
                      </View>
                    </View>
                  ))}
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
  textArea: {
    minHeight: 92,
  },
  categoryCard: {
    borderWidth: 1,
    borderColor: "#DDD6FE",
    backgroundColor: "#FAF7FF",
    borderRadius: 12,
    padding: 10,
    gap: 6,
  },
  macroCard: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
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
  bodyText: {
    fontSize: 12,
    color: "#475569",
  },
  metaText: {
    fontSize: 11,
    color: "#64748B",
  },
  actionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
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
  outlineBtn: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  outlineBtnText: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "700",
  },
  dangerBtn: {
    backgroundColor: "#B91C1C",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  dangerBtnText: {
    color: "#FFFFFF",
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
});
