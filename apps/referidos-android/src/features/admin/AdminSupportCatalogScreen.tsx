import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ScreenScaffold from "@features/staff/StaffScreenScaffold";
import SectionCard from "@features/staff/StaffSectionCard";
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
import { useModalStore } from "@shared/store/modalStore";
import { SupportBadge, SupportButton, SupportNotice } from "@features/support/SupportTicketUi";
import { SupportDiagnosticItem, SupportSearchBar, supportDetailStyles as shared } from "@features/support/SupportDiagnosticsUi";

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
  const openPicker = useModalStore((state) => state.openPicker);
  const openConfirm = useModalStore((state) => state.openConfirm);
  const [query, setQuery] = useState("");
  const [panel, setPanel] = useState<"categories" | "macros">("categories");
  const [editor, setEditor] = useState<"category" | "macro" | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("");
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
      setOk("Solicitud de sincronización enviada.");
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
      setEditor(null);
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
      setEditor(null);
      await syncCatalog();
    } catch (err: any) {
      setError(String(err?.message || err || "No se pudo guardar la macro."));
    } finally {
      setSaving(false);
    }
  }, [macroForm, syncCatalog]);

  const selectCategory = useCallback((row: any) => {
    setEditor("category");
    setCategoryForm({
      id: row.id,
      code: row.code,
      label: row.label,
      description: row.description,
      appTargets: toCsv(row.app_targets),
    });
  }, []);

  const selectMacro = useCallback((row: any) => {
    setEditor("macro");
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

  const catalogBusy = loading || saving || syncing;
  const search = query.trim().toLowerCase();
  const listedCategories = categories.filter((row) => !search || [row.code, row.label, row.description].filter(Boolean).join(" ").toLowerCase().includes(search));
  const listedMacros = macros.filter((row) => {
    if (categoryFilter && row.category_id !== categoryFilter && row.category_code !== categoryFilter) return false;
    return !search || [row.title, row.body, row.thread_status, row.status].filter(Boolean).join(" ").toLowerCase().includes(search);
  });
  const selectedCategory = categories.find((row) => row.id === categoryFilter || row.code === categoryFilter);

  function confirmDelete(kind: "category" | "macro", row: any) {
    openConfirm({
      title: kind === "category" ? "Eliminar categoría" : "Eliminar macro",
      message: kind === "category" ? String(row.label || row.code) : String(row.title),
      confirmLabel: "Eliminar",
      cancelLabel: "Cancelar",
      tone: "danger",
      onConfirm: () => { void (kind === "category" ? removeCategory(row) : removeMacro(row)); },
    });
  }

  return (
    <ScreenScaffold title="Catálogo de macros" subtitle="Consulta y administra las categorías y macros de soporte." onRefresh={catalogBusy ? undefined : () => { void loadCatalog(); }}>
      <ScrollView key={editor || panel} keyboardShouldPersistTaps="handled" contentContainerStyle={shared.content}>
        <View style={shared.row}>
          <SupportButton label="Categorías" selected={!editor && panel === "categories"} kind={!editor && panel === "categories" ? "primary" : "outline"} disabled={saving || syncing} onPress={() => { setEditor(null); setPanel("categories"); }} />
          <SupportButton label="Macros" selected={!editor && panel === "macros"} kind={!editor && panel === "macros" ? "primary" : "outline"} disabled={saving || syncing} onPress={() => { setEditor(null); setPanel("macros"); }} />
          <SupportButton label={syncing ? "Sincronizando…" : "Sincronizar catálogo"} disabled={catalogBusy} onPress={() => { void syncCatalog(); }} />
        </View>
        {error ? <SupportNotice tone="warning">{error}</SupportNotice> : null}
        {ok ? <SupportNotice>{ok}</SupportNotice> : null}

        {editor === "category" ? (
          <SectionCard title={categoryForm.id ? "Editar categoría" : "Nueva categoría"}>
            <CatalogField label="Código" value={categoryForm.code} onChange={(value) => setCategoryForm((prev) => ({ ...prev, code: value }))} />
            <CatalogField label="Nombre" value={categoryForm.label} onChange={(value) => setCategoryForm((prev) => ({ ...prev, label: value }))} />
            <CatalogField label="Descripción" value={categoryForm.description} onChange={(value) => setCategoryForm((prev) => ({ ...prev, description: value }))} multiline />
            <CatalogField label="Aplicaciones, separadas por comas" value={categoryForm.appTargets} onChange={(value) => setCategoryForm((prev) => ({ ...prev, appTargets: value }))} />
            <View style={shared.row}>
              <SupportButton label={categoryForm.id ? "Guardar categoría" : "Crear categoría"} kind="primary" disabled={catalogBusy} onPress={() => { void submitCategory(); }} />
              <SupportButton label="Cancelar" disabled={saving} onPress={() => { setCategoryForm(EMPTY_CATEGORY_FORM); setEditor(null); }} />
            </View>
          </SectionCard>
        ) : null}

        {editor === "macro" ? (
          <SectionCard title={macroForm.id ? "Editar macro" : "Nueva macro"}>
            <CatalogField label="Título" value={macroForm.title} onChange={(value) => setMacroForm((prev) => ({ ...prev, title: value }))} />
            <CatalogField label="Mensaje" value={macroForm.body} onChange={(value) => setMacroForm((prev) => ({ ...prev, body: value }))} multiline />
            <Text style={styles.fieldLabel}>Categoría</Text>
            <SupportButton
              label={categories.find((row) => row.id === macroForm.categoryId)?.label || macroForm.categoryId || "General"}
              disabled={catalogBusy}
              onPress={() => openPicker({
                title: "Categoría de la macro",
                selectedId: macroForm.categoryId || "__general__",
                options: [{ id: "__general__", label: "General" }, ...categories.map((row) => ({ id: String(row.id), label: String(row.label) }))],
                onSelect: (id) => setMacroForm((prev) => ({ ...prev, categoryId: id === "__general__" ? "" : id })),
              })}
            />
            <CatalogField label="Estado requerido del ticket" value={macroForm.threadStatus} onChange={(value) => setMacroForm((prev) => ({ ...prev, threadStatus: value }))} />
            <CatalogField label="Roles, separados por comas" value={macroForm.audienceRoles} onChange={(value) => setMacroForm((prev) => ({ ...prev, audienceRoles: value }))} />
            <CatalogField label="Aplicaciones, separadas por comas" value={macroForm.appTargets} onChange={(value) => setMacroForm((prev) => ({ ...prev, appTargets: value }))} />
            <CatalogField label="Entornos, separados por comas" value={macroForm.envTargets} onChange={(value) => setMacroForm((prev) => ({ ...prev, envTargets: value }))} />
            <View style={shared.row}>
              <SupportButton label={macroForm.id ? "Guardar macro" : "Crear macro"} kind="primary" disabled={catalogBusy} onPress={() => { void submitMacro(); }} />
              <SupportButton label="Cancelar" disabled={saving} onPress={() => { setMacroForm(EMPTY_MACRO_FORM); setEditor(null); }} />
            </View>
          </SectionCard>
        ) : null}

        {!editor ? (
          <>
            <SupportSearchBar value={query} onChange={setQuery} placeholder={panel === "categories" ? "Buscar categorías" : "Buscar por macro, mensaje o estado"} loading={catalogBusy} onRefresh={() => { void loadCatalog(); }} />
            {panel === "macros" && selectedCategory ? (
              <View style={shared.row}>
                <Text style={shared.meta}>Categoría: {selectedCategory.label}</Text>
                <SupportButton label="Todas las macros" onPress={() => setCategoryFilter("")} />
              </View>
            ) : null}

            {panel === "categories" ? (
              <SectionCard title="Categorías" subtitle={listedCategories.length + " resultados"} right={<SupportButton label="Nueva categoría" kind="primary" disabled={catalogBusy} onPress={() => { setCategoryForm(EMPTY_CATEGORY_FORM); setEditor("category"); }} />}>
                {loading ? <BlockSkeleton lines={6} compact /> : null}
                {!loading && !listedCategories.length ? <Text style={shared.meta}>No hay categorías para este filtro.</Text> : null}
                {!loading ? listedCategories.map((row) => (
                  <SupportDiagnosticItem key={row.id} title={row.label} badge={<SupportBadge tone={row.status === "active" ? "positive" : "neutral"}>{row.status === "active" ? "Activa" : row.status === "inactive" ? "Inactiva" : row.status}</SupportBadge>}>
                    <Text style={shared.meta}>{row.code} · Aplicaciones: {toCsv(row.app_targets)}</Text>
                    {row.description ? <Text style={shared.description}>{row.description}</Text> : null}
                    <View style={shared.row}>
                      <SupportButton label="Ver macros" onPress={() => { setCategoryFilter(row.id || row.code); setQuery(""); setPanel("macros"); }} />
                      <SupportButton label="Editar" disabled={catalogBusy} onPress={() => selectCategory(row)} />
                      <SupportButton label={row.status === "active" ? "Inactivar" : "Activar"} disabled={catalogBusy} onPress={() => { void updateCategoryStatus(row, row.status === "active" ? "inactive" : "active"); }} />
                      <SupportButton label="Eliminar" disabled={catalogBusy} onPress={() => confirmDelete("category", row)} />
                    </View>
                  </SupportDiagnosticItem>
                )) : null}
              </SectionCard>
            ) : (
              <SectionCard title="Macros" subtitle={listedMacros.length + " resultados"} right={<SupportButton label="Nueva macro" kind="primary" disabled={catalogBusy} onPress={() => { setMacroForm({ ...EMPTY_MACRO_FORM, categoryId: selectedCategory?.id || "" }); setEditor("macro"); }} />}>
                {loading ? <BlockSkeleton lines={6} compact /> : null}
                {!loading && !listedMacros.length ? <Text style={shared.meta}>No hay macros para este filtro.</Text> : null}
                {!loading ? listedMacros.map((row) => (
                  <SupportDiagnosticItem key={row.id} title={row.title} badge={<SupportBadge tone={row.status === "published" ? "positive" : "warning"}>{row.status === "published" ? "Publicada" : row.status === "archived" ? "Archivada" : row.status === "draft" ? "Borrador" : row.status}</SupportBadge>}>
                    <Text style={shared.meta}>Estado del ticket: {row.thread_status} · Roles: {toCsv(row.audience_roles)}</Text>
                    <Text style={shared.meta}>Aplicaciones: {toCsv(row.app_targets)} · Entornos: {toCsv(row.env_targets)}</Text>
                    <Text numberOfLines={3} style={shared.description}>{row.body}</Text>
                    <View style={shared.row}>
                      <SupportButton label="Editar" disabled={catalogBusy} onPress={() => selectMacro(row)} />
                      <SupportButton label={row.status === "published" ? "Archivar" : "Publicar"} disabled={catalogBusy} onPress={() => { void updateMacroStatus(row, row.status === "published" ? "archived" : "published"); }} />
                      <SupportButton label="Eliminar" disabled={catalogBusy} onPress={() => confirmDelete("macro", row)} />
                    </View>
                  </SupportDiagnosticItem>
                )) : null}
              </SectionCard>
            )}
          </>
        ) : null}
      </ScrollView>
    </ScreenScaffold>
  );
}

function CatalogField({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        value={value}
        onChangeText={onChange}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        style={[styles.input, multiline && styles.textArea]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: 5 },
  fieldLabel: { color: "#2F1A55", fontSize: 12, fontWeight: "700" },
  input: { minHeight: 44, borderWidth: 1, borderColor: "#E9E2F7", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 9, color: "#2F1A55", backgroundColor: "#FFFFFF", fontSize: 14 },
  textArea: { minHeight: 96 },
});
