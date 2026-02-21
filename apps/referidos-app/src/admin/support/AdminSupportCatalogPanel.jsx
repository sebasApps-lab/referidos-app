import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowUp, ChevronDown, ChevronUp, Plus, RefreshCw, Save, Search, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import { supabase } from "../../lib/supabaseClient";
import {
  createSupportMacro,
  createSupportMacroCategory,
  deleteSupportMacroCategory,
  deleteSupportMacro,
  dispatchSupportMacrosSync,
  listSupportMacroCatalog,
  setSupportMacroCategoryStatus,
  setSupportMacroStatus,
  updateSupportMacroCategory,
  updateSupportMacro,
} from "./services/supportMacrosOpsService";

const GROUP_OPTIONS = [
  { id: "categoria", label: "categoria" },
  { id: "estado", label: "estado" },
  { id: "rol", label: "rol" },
];

const APP_OPTIONS = [
  { id: "all", label: "Todas apps" },
  { id: "referidos_app", label: "PWA" },
  { id: "prelaunch_web", label: "Prelaunch web" },
  { id: "android_app", label: "Android app" },
];

const ENV_OPTIONS = [
  { id: "all", label: "Todos" },
  { id: "dev", label: "Dev" },
  { id: "staging", label: "Staging" },
  { id: "prod", label: "Prod" },
];

const ROLE_OPTIONS = [
  { id: "cliente", label: "cliente" },
  { id: "negocio", label: "negocio" },
];

const THREAD_STATUS_ORDER = ["new", "assigned", "in_progress", "waiting_user", "queued", "closed", "cancelled", "sin_estado"];
const THREAD_STATUS_LABEL = {
  new: "Nuevo",
  assigned: "Asignado",
  in_progress: "En progreso",
  waiting_user: "Esperando usuario",
  queued: "En cola",
  closed: "Cerrado",
  cancelled: "Cancelado",
  sin_estado: "Sin estado",
};

const LIFECYCLE_OPTIONS = ["draft", "published", "archived"];
const USAGE_WINDOWS = ["1d", "7d", "15d", "30d"];
const EMPTY_USAGE = {
  shown_1d: 0,
  shown_7d: 0,
  shown_15d: 0,
  shown_30d: 0,
  copied_1d: 0,
  copied_7d: 0,
  copied_15d: 0,
  copied_30d: 0,
};

const s = (v, d = "") => (typeof v === "string" && v.trim() ? v.trim() : d);
const arr = (v, d = []) => (Array.isArray(v) ? Array.from(new Set(v.map((x) => s(x).toLowerCase()).filter(Boolean))) : d);
const code = (v) => s(v).toLowerCase().replace(/\s+/g, "_");
const normCategoryCode = (value) => code(value).replace(/[^a-z0-9_]/g, "") || "general";
const short = (v, n = 180) => (s(v).length > n ? `${s(v).slice(0, n)}...` : s(v, "-"));
const matchApp = (targets, appFilter) => appFilter === "all" || arr(targets, ["all"]).includes("all") || arr(targets, ["all"]).includes(appFilter);
const normalizeAudienceRoles = (values) => {
  const allowed = new Set(["cliente", "negocio"]);
  const normalized = arr(values, []).filter((role) => allowed.has(role));
  return normalized.length ? normalized : ["cliente", "negocio"];
};
const rank = (status) => {
  const idx = THREAD_STATUS_ORDER.indexOf(status);
  return idx === -1 ? THREAD_STATUS_ORDER.length + 1 : idx;
};
const sortByPriority = (a, b) => {
  const aSort = Number(a.sort_order || 100);
  const bSort = Number(b.sort_order || 100);
  if (aSort !== bSort) return aSort - bSort;
  return s(a.title).localeCompare(s(b.title), "es", { sensitivity: "base" });
};
const badge = (status) => {
  if (status === "published") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (status === "archived") return "border-slate-300 bg-slate-100 text-slate-700";
  return "border-amber-200 bg-amber-50 text-amber-700";
};
const formatTargets = (targets, options) => {
  const map = options.reduce((acc, opt) => ((acc[opt.id] = opt.label), acc), {});
  return arr(targets, ["all"]).map((id) => map[id] || id).join(", ");
};
const toggleMulti = (values, item) => {
  const list = arr(values, []);
  if (item === "all") return list.includes("all") ? [] : ["all"];
  const withoutAll = list.filter((v) => v !== "all");
  if (withoutAll.includes(item)) {
    const next = withoutAll.filter((v) => v !== item);
    return next.length ? next : ["all"];
  }
  return [...withoutAll, item];
};

function Card({ title, subtitle, headerRight, children }) {
  return (
    <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5 space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-[#2F1A55]">{title}</div>
          {subtitle ? <div className="text-xs text-slate-500">{subtitle}</div> : null}
        </div>
        {headerRight ? <div className="shrink-0">{headerRight}</div> : null}
      </div>
      {children}
    </div>
  );
}

function TogglePills({ options, values, onChange }) {
  const selected = arr(values, []);
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt.id);
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(toggleMulti(selected, opt.id))}
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${
              active ? "border-[#2F1A55] bg-[#2F1A55] text-white" : "border-[#E9E2F7] bg-white text-[#2F1A55]"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default function AdminSupportCatalogPanel() {
  const navigate = useNavigate();
  const { macroId = "", categoryId = "" } = useParams();

  const [tab, setTab] = useState("catalogo");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [catalogHint, setCatalogHint] = useState("");

  const [groupBy, setGroupBy] = useState("categoria");
  const [expanded, setExpanded] = useState({});
  const [appFilter, setAppFilter] = useState("all");
  const [macroStatusFilter, setMacroStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [categories, setCategories] = useState([]);
  const [macros, setMacros] = useState([]);
  const [baselineSortOrders, setBaselineSortOrders] = useState({});

  const [categoryForm, setCategoryForm] = useState({ label: "", description: "", app_targets: ["all"] });
  const [macroForm, setMacroForm] = useState({
    title: "",
    body: "",
    category_id: "",
    thread_status: "",
    audience_roles: ["cliente", "negocio"],
    app_targets: ["all"],
    env_targets: ["all"],
  });
  const [editForm, setEditForm] = useState({
    code: "",
    title: "",
    body: "",
    category_id: "",
    thread_status: "",
    audience_roles: ["cliente", "negocio"],
    app_targets: ["all"],
    env_targets: ["all"],
  });
  const [categoryEditForm, setCategoryEditForm] = useState({
    code: "",
    label: "",
    description: "",
    app_targets: ["all"],
  });
  const [categoryConfirm, setCategoryConfirm] = useState({
    open: false,
    action: "",
    title: "",
    confirmLabel: "",
    message: "",
    macros: [],
    payload: {},
  });
  const [usageByMacroId, setUsageByMacroId] = useState({});
  const [usageWindowByMacroId, setUsageWindowByMacroId] = useState({});

  const loadMacroUsageSummary = useCallback(async (macroList, selectedAppFilter) => {
    const macroIds = Array.from(
      new Set((macroList || []).map((macro) => s(macro.id)).filter(Boolean))
    );
    if (!macroIds.length) {
      setUsageByMacroId({});
      return;
    }

    const payload = { p_macro_ids: macroIds };
    if (selectedAppFilter && selectedAppFilter !== "all") {
      payload.p_app_key = selectedAppFilter;
    }

    const { data, error: usageError } = await supabase.rpc("support_macro_usage_summary", payload);
    if (usageError) {
      setCatalogHint((prev) =>
        prev ||
        `No se pudo cargar analitica de macros (${usageError.message || "summary_failed"}).`
      );
      setUsageByMacroId({});
      return;
    }

    const next = {};
    (data || []).forEach((row) => {
      const macroId = s(row.macro_id);
      if (!macroId) return;
      next[macroId] = {
        shown_1d: Number(row.shown_1d || 0),
        shown_7d: Number(row.shown_7d || 0),
        shown_15d: Number(row.shown_15d || 0),
        shown_30d: Number(row.shown_30d || 0),
        copied_1d: Number(row.copied_1d || 0),
        copied_7d: Number(row.copied_7d || 0),
        copied_15d: Number(row.copied_15d || 0),
        copied_30d: Number(row.copied_30d || 0),
      };
    });
    setUsageByMacroId(next);
  }, []);

  const load = useCallback(async (manual = false) => {
    manual ? setRefreshing(true) : setLoading(true);
    setError("");
    setCatalogHint("");
    try {
      const initialCatalog = await listSupportMacroCatalog({ includeArchived: true, includeDraft: true });

      let catalog = initialCatalog;
      const initialMacroCount = Array.isArray(initialCatalog?.macros) ? initialCatalog.macros.length : 0;
      const initialCategoryCount = Array.isArray(initialCatalog?.categories) ? initialCatalog.categories.length : 0;

      if (initialMacroCount === 0) {
        try {
          await dispatchSupportMacrosSync({
            mode: "hot",
            panelKey: "admin_support_macros",
          });
          catalog = await listSupportMacroCatalog({ includeArchived: true, includeDraft: true });
        } catch (syncErr) {
          setCatalogHint(
            `No se pudo sincronizar macros desde OPS (${syncErr?.message || "error_sync"}).`,
          );
        }
      }

      const nextCategories = (catalog?.categories || []).map((c) => ({
        id: s(c.id),
        code: normCategoryCode(s(c.code, s(c.id))),
        label: s(c.label, s(c.code, "Sin label")),
        description: s(c.description),
        status: s(c.status, "draft"),
        app_targets: arr(c.app_targets, ["all"]),
      }));
      const byId = nextCategories.reduce((acc, c) => ((acc[c.id] = c.code), acc), {});
      const nextMacros = (catalog?.macros || []).map((m) => ({
        id: s(m.id),
        code: s(m.code),
        title: s(m.title, "Sin titulo"),
        body: s(m.body),
        category_id: s(m.category_id),
        category_code: normCategoryCode(s(m.category_code, s(byId[s(m.category_id)], "general"))),
        thread_status: s(m.thread_status, "sin_estado"),
        audience_roles: normalizeAudienceRoles(m.audience_roles),
        app_targets: arr(m.app_targets, ["all"]),
        env_targets: arr(m.env_targets, ["all"]),
        sort_order: Number(m.sort_order || 100),
        status: s(m.status, "draft"),
      }));

      if (nextMacros.length === 0) {
        if (initialCategoryCount > 0 || nextCategories.length > 0) {
          setCatalogHint(
            "No hay macros en OPS para este tenant. El catalogo ahora vive en OPS y los macros legacy no se migran automaticamente.",
          );
        } else {
          setCatalogHint(
            "Catalogo OPS vacio (sin categorias ni macros). Crea categorias/macros en la tab Anadir o ejecuta un seed inicial.",
          );
        }
      }

      setCategories(nextCategories);
      setMacros(nextMacros);
      setBaselineSortOrders(
        nextMacros.reduce((acc, macro) => {
          acc[s(macro.id)] = Number(macro.sort_order || 100);
          return acc;
        }, {})
      );
    } catch (err) {
      setError(err?.message || "No se pudo cargar catalogo.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load(false);
  }, [load]);

  useEffect(() => {
    if (!macroId && !categoryId) setTab("catalogo");
  }, [macroId, categoryId]);

  useEffect(() => {
    if (!categoryId) return;
    navigate("/admin/soporte/panel-tickets?tab=categorias", { replace: true });
  }, [categoryId, navigate]);

  useEffect(() => {
    if (loading) return;
    loadMacroUsageSummary(macros, appFilter);
  }, [appFilter, loading, loadMacroUsageSummary, macros]);

  const filteredCategories = useMemo(
    () => categories.filter((c) => matchApp(c.app_targets, appFilter)),
    [categories, appFilter]
  );

  const filteredMacros = useMemo(() => {
    const query = search.trim().toLowerCase();
    return macros
      .filter((m) => matchApp(m.app_targets, appFilter))
      .filter((m) => macroStatusFilter === "all" || m.status === macroStatusFilter)
      .filter((m) => !query || `${m.title} ${m.body} ${m.code} ${m.category_code}`.toLowerCase().includes(query))
      .sort(sortByPriority);
  }, [macros, appFilter, macroStatusFilter, search]);

  const categoryStats = useMemo(() => {
    const macroCount = {};
    const byThreadStatus = {};

    filteredMacros.forEach((m) => {
      const c = s(m.category_code, "general");
      macroCount[c] = (macroCount[c] || 0) + 1;
      byThreadStatus[c] ||= {};
      byThreadStatus[c][m.thread_status] ||= [];
      byThreadStatus[c][m.thread_status].push(m);
    });

    const base = [
      {
        id: "general",
        code: "general",
        label: "General",
        description: "Consultas generales sin categoria especifica.",
        status: "published",
        app_targets: ["all"],
      },
      ...filteredCategories,
    ];

    return base.map((c) => ({
      ...c,
      macros: macroCount[c.code] || 0,
      byThreadStatus: byThreadStatus[c.code] || {},
    }));
  }, [filteredMacros, filteredCategories]);

  const groupedStatus = useMemo(() => {
    const groups = {};
    filteredMacros.forEach((m) => {
      groups[m.thread_status] ||= [];
      groups[m.thread_status].push(m);
    });
    return Object.entries(groups)
      .sort((a, b) => rank(a[0]) - rank(b[0]))
      .map(([id, list]) => ({ id, label: THREAD_STATUS_LABEL[id] || id, list: [...list].sort(sortByPriority) }));
  }, [filteredMacros]);

  const groupedRole = useMemo(() => {
    const groups = {};
    filteredMacros.forEach((m) => {
      m.audience_roles.forEach((r) => {
        groups[r] ||= [];
        groups[r].push(m);
      });
    });
    return Object.entries(groups)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([id, list]) => ({ id, label: id, list: [...list].sort(sortByPriority) }));
  }, [filteredMacros]);

  const editing = useMemo(() => macros.find((m) => m.id === macroId) || null, [macros, macroId]);
  const editingCategory = useMemo(
    () => categories.find((category) => category.id === categoryId) || null,
    [categories, categoryId]
  );
  const categoryMacros = useMemo(() => {
    if (!editingCategory) return [];
    const categoryCode = normCategoryCode(editingCategory.code);
    return macros.filter(
      (macro) =>
        s(macro.category_id) === editingCategory.id ||
        normCategoryCode(macro.category_code) === categoryCode
    );
  }, [editingCategory, macros]);

  useEffect(() => {
    if (!editing) return;
    setEditForm({
      code: editing.code,
      title: editing.title,
      body: editing.body,
      category_id: editing.category_id || "",
      thread_status: editing.thread_status === "sin_estado" ? "" : editing.thread_status,
      audience_roles: normalizeAudienceRoles(editing.audience_roles),
      app_targets: arr(editing.app_targets, ["all"]),
      env_targets: arr(editing.env_targets, ["all"]),
    });
  }, [editing]);

  useEffect(() => {
    if (!editingCategory) return;
    setCategoryEditForm({
      code: editingCategory.code,
      label: editingCategory.label,
      description: editingCategory.description || "",
      app_targets: arr(editingCategory.app_targets, ["all"]),
    });
  }, [editingCategory]);

  const categoryOptions = useMemo(
    () => [{ id: "", label: "Sin categoria (general)" }, ...categories.map((c) => ({ id: c.id, label: `${c.label} (${c.code})` }))],
    [categories]
  );

  const submitCreateCategory = async (event) => {
    event.preventDefault();
    setError("");
    setOk("");
    if (!s(categoryForm.label)) {
      setError("Label de categoria invalido.");
      return;
    }
    setSaving(true);
    try {
      await createSupportMacroCategory({
        label: s(categoryForm.label),
        description: s(categoryForm.description),
        app_targets: arr(categoryForm.app_targets, ["all"]),
        status: "draft",
      });
      setOk("Categoria creada en draft con code automatico.");
      setCategoryForm({ label: "", description: "", app_targets: ["all"] });
      await load(true);
    } catch (err) {
      setError(err?.message || "No se pudo crear categoria.");
    } finally {
      setSaving(false);
    }
  };

  const submitCreateMacro = async (event) => {
    event.preventDefault();
    setError("");
    setOk("");
    if (!s(macroForm.title) || !s(macroForm.body)) {
      setError("Titulo/body de macro invalidos.");
      return;
    }
    setSaving(true);
    try {
      await createSupportMacro({
        title: s(macroForm.title),
        body: s(macroForm.body),
        category_id: s(macroForm.category_id) || null,
        thread_status: s(macroForm.thread_status) || null,
        audience_roles: normalizeAudienceRoles(macroForm.audience_roles),
        app_targets: arr(macroForm.app_targets, ["all"]),
        env_targets: arr(macroForm.env_targets, ["all"]),
        status: "draft",
      });
      setOk("Macro creado en draft con code automatico.");
      setMacroForm({
        title: "",
        body: "",
        category_id: "",
        thread_status: "",
        audience_roles: ["cliente", "negocio"],
        app_targets: ["all"],
        env_targets: ["all"],
      });
      await load(true);
    } catch (err) {
      setError(err?.message || "No se pudo crear macro.");
    } finally {
      setSaving(false);
    }
  };

  const submitSaveMacro = async (event) => {
    event.preventDefault();
    if (!macroId) return;
    setError("");
    setOk("");
    if (!s(editForm.title) || !s(editForm.body)) {
      setError("Titulo/body de macro invalidos.");
      return;
    }
    setSaving(true);
    try {
      await updateSupportMacro({
        macro_id: macroId,
        title: s(editForm.title),
        body: s(editForm.body),
        category_id: s(editForm.category_id) || null,
        thread_status: s(editForm.thread_status) || null,
        audience_roles: normalizeAudienceRoles(editForm.audience_roles),
        app_targets: arr(editForm.app_targets, ["all"]),
        env_targets: arr(editForm.env_targets, ["all"]),
      });
      setOk("Macro actualizada.");
      await load(true);
    } catch (err) {
      setError(err?.message || "No se pudo actualizar macro.");
    } finally {
      setSaving(false);
    }
  };

  const setMacroLifecycle = async (status) => {
    if (!macroId) return;
    setSaving(true);
    setError("");
    setOk("");
    try {
      await setSupportMacroStatus({ macroId, status });
      setOk(`Macro movida a ${status}.`);
      await load(true);
    } catch (err) {
      setError(err?.message || "No se pudo cambiar estado.");
    } finally {
      setSaving(false);
    }
  };

  const removeMacro = async () => {
    if (!macroId || !window.confirm("Eliminar macro permanentemente.")) return;
    setSaving(true);
    setError("");
    setOk("");
    try {
      await deleteSupportMacro({ macroId });
      navigate("/admin/soporte/macros");
      await load(true);
    } catch (err) {
      setError(err?.message || "No se pudo eliminar macro.");
    } finally {
      setSaving(false);
    }
  };

  const openCategoryConfirm = ({
    action,
    title,
    confirmLabel,
    message,
    payload = {},
  }) => {
    setCategoryConfirm({
      open: true,
      action,
      title,
      confirmLabel,
      message,
      macros: categoryMacros,
      payload,
    });
  };

  const closeCategoryConfirm = () => {
    setCategoryConfirm({
      open: false,
      action: "",
      title: "",
      confirmLabel: "",
      message: "",
      macros: [],
      payload: {},
    });
  };

  const submitSaveCategory = (event) => {
    event.preventDefault();
    if (!editingCategory) return;
    if (!s(categoryEditForm.label)) {
      setError("Label de categoria invalido.");
      return;
    }

    openCategoryConfirm({
      action: "save",
      title: "Confirmar edicion de categoria",
      confirmLabel: "Guardar categoria",
      message:
        "Se guardaran los cambios de la categoria. Los macros listados seguiran asociados a esta categoria.",
      payload: {
        category_id: editingCategory.id,
        label: s(categoryEditForm.label),
        description: s(categoryEditForm.description),
        app_targets: arr(categoryEditForm.app_targets, ["all"]),
      },
    });
  };

  const triggerCategoryLifecycle = (nextStatus) => {
    if (!editingCategory) return;
    const verbs = {
      published: "publicar",
      archived: "archivar",
      draft: "degradar a draft",
    };
    openCategoryConfirm({
      action: `status:${nextStatus}`,
      title: `Confirmar ${verbs[nextStatus] || "cambio"} de categoria`,
      confirmLabel: verbs[nextStatus] || "Confirmar",
      message:
        nextStatus === "archived" || nextStatus === "draft"
          ? "Esta accion tambien cambiara el estado de los macros asociados a la categoria."
          : "Se publicara la categoria. Los macros asociados no cambian automaticamente a published.",
      payload: { category_id: editingCategory.id, status: nextStatus },
    });
  };

  const removeCategory = () => {
    if (!editingCategory) return;
    openCategoryConfirm({
      action: "delete",
      title: "Confirmar eliminacion de categoria",
      confirmLabel: "Eliminar categoria",
      message:
        "Se eliminara la categoria y tambien se eliminaran los macros asociados que se muestran abajo.",
      payload: { category_id: editingCategory.id },
    });
  };

  const executeCategoryConfirm = async () => {
    const targetCategoryId = s(categoryConfirm.payload?.category_id, s(editingCategory?.id));
    if (!targetCategoryId) return;
    setSaving(true);
    setError("");
    setOk("");
    try {
      if (categoryConfirm.action === "save") {
        await updateSupportMacroCategory(categoryConfirm.payload || {});
        setOk("Categoria actualizada.");
      } else if (categoryConfirm.action.startsWith("status:")) {
        const nextStatus = categoryConfirm.action.split(":")[1];
        await setSupportMacroCategoryStatus({
          categoryId: targetCategoryId,
          status: nextStatus,
        });
        setOk(`Categoria movida a ${nextStatus}.`);
      } else if (categoryConfirm.action === "delete") {
        await deleteSupportMacroCategory({ categoryId: targetCategoryId });
        setOk("Categoria eliminada junto con sus macros.");
        navigate("/admin/soporte/macros");
      }
      closeCategoryConfirm();
      await load(true);
    } catch (err) {
      setError(err?.message || "No se pudo ejecutar accion de categoria.");
    } finally {
      setSaving(false);
    }
  };

  const pendingPriorityChanges = useMemo(
    () =>
      macros.filter((macro) => {
        const macroId = s(macro.id);
        if (!macroId || baselineSortOrders[macroId] === undefined) return false;
        return Number(macro.sort_order || 100) !== Number(baselineSortOrders[macroId]);
      }),
    [baselineSortOrders, macros]
  );
  const hasPendingPriorityChanges = pendingPriorityChanges.length > 0;

  const getMacroUsageWindow = useCallback(
    (macroId) => usageWindowByMacroId[s(macroId)] || "7d",
    [usageWindowByMacroId]
  );

  const setMacroUsageWindow = useCallback((macroId, windowKey) => {
    const normalizedId = s(macroId);
    if (!normalizedId || !USAGE_WINDOWS.includes(windowKey)) return;
    setUsageWindowByMacroId((prev) => ({
      ...prev,
      [normalizedId]: windowKey,
    }));
  }, []);

  const moveMacroPriorityWithinList = useCallback((orderedList, index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= orderedList.length) return;

    const orderedIds = orderedList.map((macro) => s(macro.id)).filter(Boolean);
    if (!orderedIds.length) return;

    const movedId = orderedIds[index];
    orderedIds.splice(index, 1);
    orderedIds.splice(targetIndex, 0, movedId);

    const base = 100;
    const step = 10;
    const nextSortById = orderedIds.reduce((acc, macroId, idx) => {
      acc[macroId] = base + idx * step;
      return acc;
    }, {});

    setMacros((prev) =>
      prev.map((macro) => {
        const macroId = s(macro.id);
        if (nextSortById[macroId] === undefined) return macro;
        return {
          ...macro,
          sort_order: nextSortById[macroId],
        };
      })
    );
  }, []);

  const applyPriorityChanges = async () => {
    if (!hasPendingPriorityChanges) return;
    setSaving(true);
    setError("");
    setOk("");
    try {
      await Promise.all(
        pendingPriorityChanges.map((macro) =>
          updateSupportMacro({
            macro_id: macro.id,
            sort_order: Number(macro.sort_order || 100),
          })
        )
      );
      setOk("Prioridades aplicadas.");
      await load(true);
    } catch (err) {
      setError(err?.message || "No se pudieron aplicar los cambios de prioridad.");
    } finally {
      setSaving(false);
    }
  };

  const revertPriorityChanges = () => {
    setMacros((prev) =>
      prev.map((macro) => {
        const macroId = s(macro.id);
        if (baselineSortOrders[macroId] === undefined) return macro;
        return {
          ...macro,
          sort_order: Number(baselineSortOrders[macroId]),
        };
      })
    );
    setOk("Cambios de prioridad revertidos.");
  };

  const macroCard = (macro, key, controls = null) => {
    const usage = usageByMacroId[macro.id] || EMPTY_USAGE;
    const macroUsageWindow = getMacroUsageWindow(macro.id);
    const shownValue = Number(usage[`shown_${macroUsageWindow}`] || 0);
    const copiedValue = Number(usage[`copied_${macroUsageWindow}`] || 0);
    return (
      <div key={key} className="flex items-stretch gap-2">
        <button
          type="button"
          onClick={() => navigate(`/admin/soporte/macros/${macro.id}`)}
          className="flex-1 rounded-lg border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2 text-left hover:border-[#CDBAF1]"
        >
          <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2 text-xs">
                <div className="font-semibold text-[#2F1A55]">{macro.title}</div>
                <div className="flex items-start gap-2">
                  <div className="w-[190px] shrink-0 rounded-xl border border-[#E9E2F7] bg-white px-2 py-2 text-[11px]">
                    <div className="flex flex-wrap gap-1">
                      {USAGE_WINDOWS.map((windowKey) => (
                        <button
                          key={`${macro.id}-${windowKey}`}
                          type="button"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            setMacroUsageWindow(macro.id, windowKey);
                          }}
                          className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                            macroUsageWindow === windowKey
                              ? "border-[#2F1A55] bg-[#2F1A55] text-white"
                              : "border-[#E9E2F7] bg-white text-[#2F1A55]"
                          }`}
                        >
                          {windowKey}
                        </button>
                      ))}
                    </div>
                    <div className="mt-2 text-[#5E30A5]">
                      Mostrado: <strong>{shownValue}</strong>
                    </div>
                    <div className="mt-1 text-[#1E5E9A]">
                      Copiado: <strong>{copiedValue}</strong>
                    </div>
                  </div>
                  <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${badge(macro.status)}`}>{macro.status}</span>
                </div>
              </div>
              <div className="mt-1 text-[11px] text-slate-500">
                Categoria: {macro.category_code} | Estado ticket: {THREAD_STATUS_LABEL[macro.thread_status] || macro.thread_status} | Roles:{" "}
                {arr(macro.audience_roles, []).join(", ")}
              </div>
              <div className="mt-1 text-[11px] text-slate-500">
                Apps: {formatTargets(macro.app_targets, APP_OPTIONS)} | Entornos: {formatTargets(macro.env_targets, ENV_OPTIONS)}
              </div>
              <div className="mt-1 text-xs text-slate-600">{short(macro.body, 220)}</div>
            </div>
          </div>
        </button>
        {controls ? (
          <div className="flex shrink-0 flex-col justify-center gap-1">
            {controls.canMoveUp ? (
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  controls.onMoveUp?.();
                }}
                className="rounded-md border border-[#E9E2F7] bg-white p-1 text-[#5E30A5] hover:border-[#CDBAF1]"
                aria-label="Subir prioridad"
              >
                <ArrowUp size={12} />
              </button>
            ) : (
              <span className="h-[22px] w-[22px]" />
            )}
            {controls.canMoveDown ? (
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  controls.onMoveDown?.();
                }}
                className="rounded-md border border-[#E9E2F7] bg-white p-1 text-[#5E30A5] hover:border-[#CDBAF1]"
                aria-label="Bajar prioridad"
              >
                <ArrowDown size={12} />
              </button>
            ) : (
              <span className="h-[22px] w-[22px]" />
            )}
          </div>
        ) : null}
      </div>
    );
  };

  const renderCatalog = () => (
    <Card
      title="Categorias y catalogo de macros"
      subtitle="Catalogo con filtro por app y estado."
      headerRight={(
        <div className="flex flex-wrap gap-2">
          {GROUP_OPTIONS.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => {
                setGroupBy(g.id);
                setExpanded({});
              }}
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                groupBy === g.id ? "border-[#2F1A55] bg-[#2F1A55] text-white" : "border-[#E9E2F7] bg-white text-[#2F1A55]"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      )}
    >
      <div className="flex items-end gap-3 overflow-x-auto pb-1">
        <div className="min-w-[180px] shrink-0">
          <label className="text-xs font-semibold text-slate-500">App</label>
          <select
            value={appFilter}
            onChange={(e) => setAppFilter(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs"
          >
            {APP_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-[180px] shrink-0">
          <label className="text-xs font-semibold text-slate-500">Estado macro</label>
          <select
            value={macroStatusFilter}
            onChange={(e) => setMacroStatusFilter(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs"
          >
            <option value="all">Todos</option>
            {LIFECYCLE_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-[280px] flex-1">
          <label className="text-xs font-semibold text-slate-500">Buscar</label>
          <div className="relative mt-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Titulo, body, code..."
              className="w-full rounded-xl border border-[#E9E2F7] py-2 pl-9 pr-3 text-xs"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {groupBy === "categoria" &&
          categoryStats.map((c) => {
            const key = `cat:${c.code}`;
            const open = !!expanded[key];
            const byStatus = Object.entries(c.byThreadStatus).sort((a, b) => rank(a[0]) - rank(b[0]));
            return (
              <div key={key} className="overflow-hidden rounded-2xl border border-[#EFE9FA] bg-[#FCFBFF]">
                <div className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {c.id && c.id !== "general" ? (
                        <button
                          type="button"
                          onClick={() => navigate("/admin/soporte/panel-tickets?tab=categorias")}
                          className="text-sm font-semibold text-[#2F1A55] underline decoration-dotted underline-offset-4 hover:text-[#5E30A5]"
                        >
                          {c.label}
                        </button>
                      ) : (
                        <span className="text-sm font-semibold text-[#2F1A55]">{c.label}</span>
                      )}
                      <span className="text-xs text-slate-400">({c.code})</span>
                      <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${badge(c.status)}`}>{c.status}</span>
                    </div>
                    <div className="text-xs text-slate-500">{c.description || "Sin descripcion"}</div>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Macros: <strong>{c.macros}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => setExpanded((p) => ({ ...p, [key]: !p[key] }))}
                    className="text-[#5E30A5]"
                    aria-label={open ? "Colapsar categoria" : "Expandir categoria"}
                  >
                    {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
                {open ? (
                  <div className="space-y-3 border-t border-[#EFE9FA] px-4 py-3">
                    {byStatus.length ? (
                      byStatus.map(([st, list]) => {
                        const orderedList = [...list].sort(sortByPriority);
                        return (
                        <div key={`${key}-${st}`} className="rounded-xl border border-[#EFE9FA] bg-white px-3 py-2">
                          <div className="mb-2 text-xs font-semibold text-[#2F1A55]">
                            {THREAD_STATUS_LABEL[st] || st} <span className="text-slate-400">({st})</span>
                          </div>
                          <div className="space-y-2">
                            {orderedList.map((m, index) =>
                              macroCard(m, `${key}-${st}-${m.id}`, {
                                canMoveUp: index > 0,
                                canMoveDown: index < orderedList.length - 1,
                                onMoveUp: () => moveMacroPriorityWithinList(orderedList, index, -1),
                                onMoveDown: () => moveMacroPriorityWithinList(orderedList, index, 1),
                              })
                            )}
                          </div>
                        </div>
                      );
                    })
                    ) : (
                      <div className="rounded-xl border border-[#EFE9FA] bg-white px-3 py-2 text-xs text-slate-500">
                        Sin macros para esta categoria.
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            );
          })}

        {groupBy === "estado" &&
          groupedStatus.map((g) => {
            const key = `status:${g.id}`;
            const open = !!expanded[key];
            return (
              <div key={key} className="overflow-hidden rounded-2xl border border-[#EFE9FA] bg-[#FCFBFF]">
                <button
                  type="button"
                  onClick={() => setExpanded((p) => ({ ...p, [key]: !p[key] }))}
                  className="flex w-full items-center justify-between px-4 py-3 text-left"
                >
                  <div className="text-sm font-semibold text-[#2F1A55]">{g.label}</div>
                  <div className="text-[11px] text-slate-600">
                    Macros: <strong>{g.list.length}</strong>
                  </div>
                  <div className="text-[#5E30A5]">{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</div>
                </button>
                {open ? <div className="space-y-2 border-t border-[#EFE9FA] px-4 py-3">{g.list.map((m) => macroCard(m, `${key}-${m.id}`))}</div> : null}
              </div>
            );
          })}

        {groupBy === "rol" &&
          groupedRole.map((g) => {
            const key = `role:${g.id}`;
            const open = !!expanded[key];
            return (
              <div key={key} className="overflow-hidden rounded-2xl border border-[#EFE9FA] bg-[#FCFBFF]">
                <button
                  type="button"
                  onClick={() => setExpanded((p) => ({ ...p, [key]: !p[key] }))}
                  className="flex w-full items-center justify-between px-4 py-3 text-left"
                >
                  <div className="text-sm font-semibold text-[#2F1A55]">{g.label}</div>
                  <div className="text-[11px] text-slate-600">
                    Macros: <strong>{g.list.length}</strong>
                  </div>
                  <div className="text-[#5E30A5]">{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</div>
                </button>
                {open ? <div className="space-y-2 border-t border-[#EFE9FA] px-4 py-3">{g.list.map((m) => macroCard(m, `${key}-${m.id}`))}</div> : null}
              </div>
            );
          })}
      </div>
    </Card>
  );

  const renderAdd = () => (
    <div className="space-y-5">
      <div className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-600">
        Las categorias ahora se gestionan solo desde <strong>Panel Tickets &gt; Categorias</strong>.
      </div>

      <Card title="Anadir macro (draft)" subtitle="Macro nueva lista para editar/publicar.">
        <form className="space-y-4" onSubmit={submitCreateMacro}>
          <input value={macroForm.title} onChange={(e) => setMacroForm((p) => ({ ...p, title: e.target.value }))} placeholder="titulo" className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm" />
          <textarea rows={4} value={macroForm.body} onChange={(e) => setMacroForm((p) => ({ ...p, body: e.target.value }))} placeholder="body" className="w-full resize-none rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm" />
          <div className="grid gap-3 md:grid-cols-2">
            <select value={macroForm.category_id} onChange={(e) => setMacroForm((p) => ({ ...p, category_id: e.target.value }))} className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm">{categoryOptions.map((o) => <option key={o.id || "general"} value={o.id}>{o.label}</option>)}</select>
            <select value={macroForm.thread_status} onChange={(e) => setMacroForm((p) => ({ ...p, thread_status: e.target.value }))} className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm"><option value="">Sin estado</option>{THREAD_STATUS_ORDER.filter((st) => st !== "sin_estado").map((st) => <option key={st} value={st}>{THREAD_STATUS_LABEL[st]}</option>)}</select>
          </div>
          <TogglePills options={ROLE_OPTIONS} values={macroForm.audience_roles} onChange={(values) => setMacroForm((p) => ({ ...p, audience_roles: values }))} />
          <TogglePills options={APP_OPTIONS} values={macroForm.app_targets} onChange={(values) => setMacroForm((p) => ({ ...p, app_targets: values }))} />
          <TogglePills options={ENV_OPTIONS} values={macroForm.env_targets} onChange={(values) => setMacroForm((p) => ({ ...p, env_targets: values }))} />
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
            El code de macro se genera automaticamente segun categoria/estado/contenido.
          </div>
          <button type="submit" disabled={saving} className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-white ${saving ? "bg-[#C9B6E8]" : "bg-[#5E30A5]"}`}><Plus size={14} />Crear macro draft</button>
        </form>
      </Card>
    </div>
  );

  const renderCategoryEdit = () => {
    if (loading) return <Card title="Cargando..." subtitle="Buscando categoria seleccionada." />;
    if (!editingCategory) {
      return (
        <Card title="Categoria no encontrada" subtitle="No existe en el catalogo actual.">
          <Link to="/admin/soporte/macros" className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs font-semibold text-[#5E30A5]">
            <ArrowLeft size={14} />
            Volver
          </Link>
        </Card>
      );
    }

    return (
      <Card
        title={`Editar categoria: ${editingCategory.label}`}
        subtitle="Gestion completa de categoria con confirmacion de macros afectados."
        headerRight={(
          <Link to="/admin/soporte/macros" className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs font-semibold text-[#5E30A5]">
            <ArrowLeft size={14} />
            Volver
          </Link>
        )}
      >
        <form className="space-y-4" onSubmit={submitSaveCategory}>
          <div className="grid gap-3 md:grid-cols-2">
            <input value={categoryEditForm.code} readOnly className="rounded-xl border border-[#E9E2F7] bg-slate-100 px-3 py-2 text-sm text-slate-600" />
            <input value={categoryEditForm.label} onChange={(e) => setCategoryEditForm((p) => ({ ...p, label: e.target.value }))} placeholder="label" className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm" />
          </div>
          <textarea rows={4} value={categoryEditForm.description} onChange={(e) => setCategoryEditForm((p) => ({ ...p, description: e.target.value }))} placeholder="descripcion" className="w-full resize-none rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm" />
          <div className="rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-600">
            Macros asociadas: <strong>{categoryMacros.length}</strong>
          </div>
          <TogglePills options={APP_OPTIONS} values={categoryEditForm.app_targets} onChange={(values) => setCategoryEditForm((p) => ({ ...p, app_targets: values }))} />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <button type="button" disabled={saving} onClick={() => triggerCategoryLifecycle("draft")} className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">Degradar a draft</button>
              <button type="button" disabled={saving} onClick={() => triggerCategoryLifecycle("published")} className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">Publicar</button>
              <button type="button" disabled={saving} onClick={() => triggerCategoryLifecycle("archived")} className="rounded-xl border border-slate-300 bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">Archivar</button>
              <button type="button" disabled={saving} onClick={removeCategory} className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700"><Trash2 size={12} />Eliminar</button>
            </div>
            <button type="submit" disabled={saving} className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-white ${saving ? "bg-[#C9B6E8]" : "bg-[#5E30A5]"}`}><Save size={14} />Guardar cambios</button>
          </div>
        </form>
      </Card>
    );
  };

  const renderEdit = () => {
    if (loading) return <Card title="Cargando..." subtitle="Buscando macro seleccionada." />;
    if (!editing) {
      return (
        <Card title="Macro no encontrada" subtitle="No existe en el catalogo actual.">
          <Link to="/admin/soporte/macros" className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs font-semibold text-[#5E30A5]">
            <ArrowLeft size={14} />
            Volver
          </Link>
        </Card>
      );
    }

    return (
      <Card
        title={`Editar macro: ${editing.title}`}
        subtitle="Edicion completa del macro seleccionado."
        headerRight={(
          <Link to="/admin/soporte/macros" className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs font-semibold text-[#5E30A5]">
            <ArrowLeft size={14} />
            Volver
          </Link>
        )}
      >
        <form className="space-y-4" onSubmit={submitSaveMacro}>
          <div className="grid gap-3 md:grid-cols-2">
            <input value={editForm.code} readOnly className="rounded-xl border border-[#E9E2F7] bg-slate-100 px-3 py-2 text-sm text-slate-600" />
            <input value={editForm.title} onChange={(e) => setEditForm((p) => ({ ...p, title: e.target.value }))} placeholder="titulo" className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm" />
          </div>
          <textarea rows={5} value={editForm.body} onChange={(e) => setEditForm((p) => ({ ...p, body: e.target.value }))} placeholder="body" className="w-full resize-none rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm" />
          <div className="grid gap-3 md:grid-cols-3">
            <select value={editForm.category_id} onChange={(e) => setEditForm((p) => ({ ...p, category_id: e.target.value }))} className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm">{categoryOptions.map((o) => <option key={o.id || "general"} value={o.id}>{o.label}</option>)}</select>
            <select value={editForm.thread_status} onChange={(e) => setEditForm((p) => ({ ...p, thread_status: e.target.value }))} className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm"><option value="">Sin estado</option>{THREAD_STATUS_ORDER.filter((st) => st !== "sin_estado").map((st) => <option key={st} value={st}>{THREAD_STATUS_LABEL[st]}</option>)}</select>
            <div className="rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-600">
              Prioridad numerica gestionada en catalogo (flechas)
            </div>
          </div>
          <TogglePills options={ROLE_OPTIONS} values={editForm.audience_roles} onChange={(values) => setEditForm((p) => ({ ...p, audience_roles: values }))} />
          <TogglePills options={APP_OPTIONS} values={editForm.app_targets} onChange={(values) => setEditForm((p) => ({ ...p, app_targets: values }))} />
          <TogglePills options={ENV_OPTIONS} values={editForm.env_targets} onChange={(values) => setEditForm((p) => ({ ...p, env_targets: values }))} />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <button type="button" disabled={saving} onClick={() => setMacroLifecycle("draft")} className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">Pasar a draft</button>
              <button type="button" disabled={saving} onClick={() => setMacroLifecycle("published")} className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">Publicar</button>
              <button type="button" disabled={saving} onClick={() => setMacroLifecycle("archived")} className="rounded-xl border border-slate-300 bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">Archivar</button>
              <button type="button" disabled={saving} onClick={removeMacro} className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700"><Trash2 size={12} />Eliminar</button>
            </div>
            <button type="submit" disabled={saving} className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-white ${saving ? "bg-[#C9B6E8]" : "bg-[#5E30A5]"}`}><Save size={14} />Guardar cambios</button>
          </div>
        </form>
      </Card>
    );
  };

  return (
    <AdminLayout title="Macros" subtitle="Catalogo operativo y CRUD desde panel admin">
      {hasPendingPriorityChanges ? (
        <div className="fixed left-1/2 top-20 z-40 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-2xl border border-[#E9E2F7] bg-white/95 px-3 py-2 shadow-lg backdrop-blur">
            <span className="text-xs font-semibold text-[#2F1A55]">
              Cambios de prioridad pendientes
            </span>
            <button
              type="button"
              onClick={applyPriorityChanges}
              disabled={saving}
              className={`rounded-xl px-3 py-1 text-xs font-semibold text-white ${saving ? "bg-[#C9B6E8]" : "bg-[#5E30A5]"}`}
            >
              Aplicar cambios
            </button>
            <button
              type="button"
              onClick={revertPriorityChanges}
              disabled={saving}
              className="rounded-xl border border-[#E9E2F7] bg-white px-3 py-1 text-xs font-semibold text-[#5E30A5]"
            >
              Revertir
            </button>
          </div>
        </div>
      ) : null}
      <div className="space-y-6">
        <div className="space-y-3">
          {!macroId && !categoryId ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setTab("catalogo")} className={`rounded-full border px-3 py-1 text-xs font-semibold ${tab === "catalogo" ? "border-[#2F1A55] bg-[#2F1A55] text-white" : "border-[#E9E2F7] bg-white text-[#2F1A55]"}`}>Catalogo</button>
                <button type="button" onClick={() => setTab("anadir")} className={`rounded-full border px-3 py-1 text-xs font-semibold ${tab === "anadir" ? "border-[#2F1A55] bg-[#2F1A55] text-white" : "border-[#E9E2F7] bg-white text-[#2F1A55]"}`}>Anadir</button>
              </div>
              <button type="button" onClick={() => load(true)} disabled={loading || refreshing || saving} className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs font-semibold text-[#5E30A5] disabled:opacity-60"><RefreshCw size={14} className={loading || refreshing ? "animate-spin" : ""} />Refrescar</button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#E9E2F7] bg-white px-4 py-3">
              <div className="text-xs text-slate-500">{macroId ? "Editando macro individual." : "Editando categoria."}</div>
              <Link to="/admin/soporte/macros" className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs font-semibold text-[#5E30A5]"><ArrowLeft size={14} />Volver a catalogo</Link>
            </div>
          )}
          {error ? <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">{error}</div> : null}
          {catalogHint ? <div className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-xs text-amber-700">{catalogHint}</div> : null}
          {ok ? <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">{ok}</div> : null}
        </div>
        {categoryId ? renderCategoryEdit() : macroId ? renderEdit() : tab === "catalogo" ? renderCatalog() : renderAdd()}
      </div>
      {categoryConfirm.open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <div className="w-full max-w-2xl rounded-3xl border border-[#E9E2F7] bg-white p-5 shadow-2xl">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-[#2F1A55]">{categoryConfirm.title}</h3>
              <p className="text-xs text-slate-600">{categoryConfirm.message}</p>
            </div>

            <div className="mt-4 rounded-2xl border border-[#EFE9FA] bg-[#FCFBFF] p-3">
              <div className="text-xs font-semibold text-[#2F1A55]">Macros afectados ({categoryConfirm.macros.length})</div>
              <div className="mt-2 max-h-56 space-y-2 overflow-y-auto">
                {categoryConfirm.macros.length ? (
                  categoryConfirm.macros.map((macro) => (
                    <div key={`confirm-${macro.id}`} className="rounded-xl border border-[#EFE9FA] bg-white px-3 py-2 text-xs">
                      <div className="font-semibold text-[#2F1A55]">{macro.title}</div>
                      <div className="text-slate-500">{macro.code} | {macro.status}</div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-[#E9E2F7] bg-white px-3 py-2 text-xs text-slate-500">
                    No hay macros asociados a esta categoria.
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={closeCategoryConfirm}
                disabled={saving}
                className="rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs font-semibold text-[#5E30A5]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={executeCategoryConfirm}
                disabled={saving}
                className={`rounded-xl px-3 py-2 text-xs font-semibold text-white ${saving ? "bg-[#C9B6E8]" : "bg-[#5E30A5]"}`}
              >
                {categoryConfirm.confirmLabel || "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </AdminLayout>
  );
}


