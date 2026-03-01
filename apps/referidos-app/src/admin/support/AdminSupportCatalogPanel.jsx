import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowUp, ChevronDown, ChevronUp, Plus, RefreshCw, Save, Search, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import { supabase } from "../../lib/supabaseClient";
import {
  createSupportMacro,
  deleteSupportMacroCategory,
  deleteSupportMacro,
  dispatchSupportMacrosSync,
  listSupportMacroCatalog,
  setSupportMacroCategoryStatus,
  setSupportMacroStatus,
  updateSupportMacroCategory,
  updateSupportMacro,
} from "./services/supportMacrosOpsService";

// Lint purge (no-unused-vars): se removieron `formatTargets`, `submitCreateCategory`, `submitCreateMacro`, `renderAdd` y estado `macroForm` (bloques legacy de catalogo/anadir).
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
  { id: "anonimo", label: "anonimo" },
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
const EMPTY_MACRO_FORM = {
  title: "",
  body: "",
  category_id: "",
  thread_status: "new",
  audience_roles: ["cliente", "negocio"],
  app_targets: ["all"],
  env_targets: ["all"],
};

const s = (v, d = "") => (typeof v === "string" && v.trim() ? v.trim() : d);
const arr = (v, d = []) => (Array.isArray(v) ? Array.from(new Set(v.map((x) => s(x).toLowerCase()).filter(Boolean))) : d);
const code = (v) => s(v).toLowerCase().replace(/\s+/g, "_");
const normCategoryCode = (value) => code(value).replace(/[^a-z0-9_]/g, "") || "general";
const short = (v, n = 180) => (s(v).length > n ? `${s(v).slice(0, n)}...` : s(v, "-"));
const matchApp = (targets, appFilter) => appFilter === "all" || arr(targets, ["all"]).includes("all") || arr(targets, ["all"]).includes(appFilter);
const normalizeAudienceRoles = (values) => {
  const allowed = new Set(["cliente", "negocio", "anonimo"]);
  const aliases = {
    anonymous: "anonimo",
  };
  const normalized = arr(values, [])
    .map((role) => aliases[role] || role)
    .filter((role) => allowed.has(role));
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
const categoryBadge = (status) => (
  status === "active"
    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
    : "border-slate-300 bg-slate-100 text-slate-700"
);
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const resolveAppTagLabels = (targets) => {
  const normalized = arr(targets, ["all"]);
  if (normalized.includes("all")) {
    return APP_OPTIONS.filter((opt) => opt.id !== "all").map((opt) => opt.label);
  }
  return normalized.map((id) => APP_OPTIONS.find((opt) => opt.id === id)?.label || id);
};
const resolveEnvTagLabels = (targets) => {
  const normalized = arr(targets, ["all"]);
  if (normalized.includes("all")) return ["dev", "staging", "production"];
  const labels = [];
  if (normalized.includes("dev")) labels.push("dev");
  if (normalized.includes("staging")) labels.push("staging");
  if (normalized.includes("prod")) labels.push("production");
  return labels;
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

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [catalogHint, setCatalogHint] = useState("");
  const [priorityFloatingMessage, setPriorityFloatingMessage] = useState("");

  const [groupBy, setGroupBy] = useState("categoria");
  const [selectedGroupKey, setSelectedGroupKey] = useState("");
  const [appFilter, setAppFilter] = useState("all");
  const [macroStatusFilter, setMacroStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [categories, setCategories] = useState([]);
  const [macros, setMacros] = useState([]);
  const [baselineSortOrders, setBaselineSortOrders] = useState({});
  const [collapsedMacroGroups, setCollapsedMacroGroups] = useState({});
  const [inlineAddContext, setInlineAddContext] = useState(null);
  const [workspaceMacroSubgroup, setWorkspaceMacroSubgroup] = useState(null);

  const [workspaceAddForm, setWorkspaceAddForm] = useState({ ...EMPTY_MACRO_FORM });
  const [editForm, setEditForm] = useState({
    code: "",
    title: "",
    body: "",
    category_id: "",
    thread_status: "new",
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
  const [defaultUsageWindow, setDefaultUsageWindow] = useState("7d");
  const priorityMessageTimerRef = useRef(null);

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
        status: s(c.status, "active"),
        sort_order: Number(c.sort_order || 100),
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
            "Catálogo OPS vacío (sin categorías ni macros). Crea categorías/macros con el botón + AÑADIR o ejecuta un seed inicial.",
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

  useEffect(
    () => () => {
      if (priorityMessageTimerRef.current) {
        clearTimeout(priorityMessageTimerRef.current);
      }
    },
    []
  );

  useEffect(() => {
    if (loading) return;
    loadMacroUsageSummary(macros, appFilter);
  }, [appFilter, loading, loadMacroUsageSummary, macros]);

  useEffect(() => {
    setCollapsedMacroGroups({});
  }, [groupBy, selectedGroupKey]);

  useEffect(() => {
    setWorkspaceMacroSubgroup(null);
  }, [groupBy, selectedGroupKey]);

  useEffect(() => {
    if (!inlineAddContext) return;
    if (inlineAddContext.groupBy !== groupBy || inlineAddContext.parentGroupKey !== selectedGroupKey) {
      setInlineAddContext(null);
    }
  }, [groupBy, inlineAddContext, selectedGroupKey]);

  useEffect(() => {
    if (!macroId || !inlineAddContext) return;
    setInlineAddContext(null);
  }, [inlineAddContext, macroId]);

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
        status: "active",
        sort_order: 0,
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

  const catalogGroups = useMemo(() => {
    if (groupBy === "estado") {
      return groupedStatus.map((group) => ({
        id: group.id,
        label: group.label,
        description: "Agrupado por estado de ticket.",
        list: [...group.list].sort(sortByPriority),
        status: null,
      }));
    }

    if (groupBy === "rol") {
      return groupedRole.map((group) => ({
        id: group.id,
        label: group.label,
        description: "Agrupado por rol de audiencia.",
        list: [...group.list].sort(sortByPriority),
        status: null,
      }));
    }

    return [...categoryStats]
      .map((category) => {
        const normalizedCode = normCategoryCode(category.code);
        const normalizedStatus = category.status === "active" ? "active" : "inactive";
        const list = filteredMacros
          .filter((macro) => normCategoryCode(macro.category_code) === normalizedCode)
          .sort(sortByPriority);
        return {
          id: normalizedCode,
          category_id: category.id,
          label: category.label,
          code: category.code,
          description: category.description || "Sin descripcion",
          status: normalizedStatus,
          sort_order: Number(category.sort_order || 100),
          list,
        };
      })
      .sort((a, b) => {
        const statusDiff = (a.status === "active" ? 0 : 1) - (b.status === "active" ? 0 : 1);
        if (statusDiff !== 0) return statusDiff;
        const sortDiff = Number(a.sort_order || 100) - Number(b.sort_order || 100);
        if (sortDiff !== 0) return sortDiff;
        return s(a.label).localeCompare(s(b.label), "es", { sensitivity: "base" });
      });
  }, [categoryStats, filteredMacros, groupBy, groupedRole, groupedStatus]);

  useEffect(() => {
    if (!catalogGroups.length) {
      if (selectedGroupKey) setSelectedGroupKey("");
      return;
    }

    if (selectedGroupKey && catalogGroups.some((group) => group.id === selectedGroupKey)) {
      return;
    }

    const currentEditing = macros.find((macro) => macro.id === macroId) || null;
    if (currentEditing) {
      let fallbackGroupKey = "";
      if (groupBy === "estado") {
        fallbackGroupKey = s(currentEditing.thread_status, "sin_estado");
      } else if (groupBy === "rol") {
        fallbackGroupKey = s(arr(currentEditing.audience_roles, ["sin_rol"])[0], "sin_rol");
      } else {
        fallbackGroupKey = normCategoryCode(s(currentEditing.category_code, "general"));
      }
      if (fallbackGroupKey && catalogGroups.some((group) => group.id === fallbackGroupKey)) {
        setSelectedGroupKey(fallbackGroupKey);
        return;
      }
    }

    setSelectedGroupKey("");
  }, [catalogGroups, groupBy, macroId, macros, selectedGroupKey]);

  const selectedGroup = useMemo(
    () => catalogGroups.find((group) => group.id === selectedGroupKey) || null,
    [catalogGroups, selectedGroupKey]
  );

  const selectedGroupMacrosByStatus = useMemo(() => {
    const groups = {};
    (selectedGroup?.list || []).forEach((macro) => {
      const status = s(macro.thread_status, "sin_estado");
      groups[status] ||= [];
      groups[status].push(macro);
    });
    return Object.entries(groups)
      .sort((a, b) => rank(a[0]) - rank(b[0]))
      .map(([status, list]) => ({
        id: status,
        label: THREAD_STATUS_LABEL[status] || status,
        list: [...list].sort(sortByPriority),
      }));
  }, [selectedGroup]);

  const selectedGroupMacrosByCategory = useMemo(() => {
    const groups = {};
    (selectedGroup?.list || []).forEach((macro) => {
      const byId = categories.find((category) => s(category.id) === s(macro.category_id));
      const byCode = categories.find(
        (category) => normCategoryCode(category.code) === normCategoryCode(s(macro.category_code, "general"))
      );
      const category = byId || byCode || null;
      const categoryCode = category ? normCategoryCode(category.code) : "general";
      groups[categoryCode] ||= {
        id: categoryCode,
        code: categoryCode,
        label: category?.label || "General",
        category_id: category?.id || "",
        sort_order: Number(category?.sort_order || 0),
        app_targets: category ? arr(category.app_targets, ["all"]) : ["all"],
        list: [],
      };
      groups[categoryCode].list.push(macro);
    });

    return Object.values(groups)
      .map((group) => ({
        ...group,
        list: [...group.list].sort(sortByPriority),
      }))
      .sort((a, b) => {
        const sortDiff = Number(a.sort_order || 0) - Number(b.sort_order || 0);
        if (sortDiff !== 0) return sortDiff;
        return s(a.label).localeCompare(s(b.label), "es", { sensitivity: "base" });
      });
  }, [categories, selectedGroup]);

  const selectedGroupFlatMacros = useMemo(
    () => [...(selectedGroup?.list || [])].sort(sortByPriority),
    [selectedGroup]
  );

  const workspaceLeftMacros = useMemo(() => {
    const base = [...(selectedGroup?.list || [])].sort(sortByPriority);
    if (!workspaceMacroSubgroup || workspaceMacroSubgroup.groupBy !== groupBy) return base;
    if (groupBy === "categoria") {
      return base.filter(
        (macro) => s(macro.thread_status, "sin_estado") === s(workspaceMacroSubgroup.subgroupId)
      );
    }
    if (groupBy === "rol") {
      return base.filter(
        (macro) => normCategoryCode(s(macro.category_code, "general")) === s(workspaceMacroSubgroup.subgroupId)
      );
    }
    return base;
  }, [groupBy, selectedGroup, workspaceMacroSubgroup]);

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
      thread_status: editing.thread_status === "sin_estado" ? "new" : editing.thread_status,
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
    () => {
      const orderedCategories = [...categories].sort((a, b) => {
        const statusDiff = (a.status === "active" ? 0 : 1) - (b.status === "active" ? 0 : 1);
        if (statusDiff !== 0) return statusDiff;
        const sortDiff = Number(a.sort_order || 100) - Number(b.sort_order || 100);
        if (sortDiff !== 0) return sortDiff;
        return s(a.label).localeCompare(s(b.label), "es", { sensitivity: "base" });
      });
      return [
        { id: "", label: "Sin categoria (general)" },
        ...orderedCategories.map((c) => ({
          id: c.id,
          label: `${c.label} (${c.code})`,
        })),
      ];
    },
    [categories]
  );

  const openInlineAddMacro = useCallback(
    (context) => {
      const next = {
        ...EMPTY_MACRO_FORM,
        category_id: s(context?.category_id),
        thread_status: s(context?.thread_status, "new"),
        audience_roles: normalizeAudienceRoles(context?.audience_roles),
        app_targets: arr(context?.app_targets, appFilter !== "all" ? [appFilter] : ["all"]),
        env_targets: arr(context?.env_targets, ["all"]),
      };
      setInlineAddContext({
        ...context,
        groupBy,
        parentGroupKey: selectedGroupKey,
      });
      setWorkspaceAddForm(next);
      setError("");
      setOk("");
    },
    [appFilter, groupBy, selectedGroupKey]
  );

  const closeInlineAddMacro = useCallback(() => {
    setInlineAddContext(null);
    setWorkspaceAddForm({ ...EMPTY_MACRO_FORM });
  }, []);

  const submitInlineAddMacro = async (event) => {
    event.preventDefault();
    setError("");
    setOk("");
    if (!s(workspaceAddForm.title) || !s(workspaceAddForm.body)) {
      setError("Título/body de macro inválidos.");
      return;
    }
    setSaving(true);
    try {
      const created = await createSupportMacro({
        title: s(workspaceAddForm.title),
        body: s(workspaceAddForm.body),
        category_id: s(workspaceAddForm.category_id) || null,
        thread_status: s(workspaceAddForm.thread_status, "new"),
        audience_roles: normalizeAudienceRoles(workspaceAddForm.audience_roles),
        app_targets: arr(workspaceAddForm.app_targets, ["all"]),
        env_targets: arr(workspaceAddForm.env_targets, ["all"]),
        status: "draft",
      });
      const createdId = s(created?.id);
      setOk("Macro creado en draft.");
      await load(true);
      if (createdId) {
        navigate(`/admin/macros/${createdId}`);
      } else {
        closeInlineAddMacro();
      }
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
      setError("Título/body de macro inválidos.");
      return;
    }
    setSaving(true);
    try {
      await updateSupportMacro({
        macro_id: macroId,
        title: s(editForm.title),
        body: s(editForm.body),
        category_id: s(editForm.category_id) || null,
        thread_status: s(editForm.thread_status, "new"),
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
      navigate("/admin/macros");
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
      active: "activar",
      inactive: "inactivar",
    };
    openCategoryConfirm({
      action: `status:${nextStatus}`,
      title: `Confirmar ${verbs[nextStatus] || "cambio"} de categoria`,
      confirmLabel: verbs[nextStatus] || "Confirmar",
      message:
        nextStatus === "inactive"
          ? "Esta accion inactiva la categoria y archivara los macros asociados que se muestran abajo."
          : "Se activara la categoria. Los macros asociados conservan su estado actual.",
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
        navigate("/admin/macros");
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
    setPriorityFloatingMessage("Cambios de prioridad revertidos.");
    if (priorityMessageTimerRef.current) {
      clearTimeout(priorityMessageTimerRef.current);
    }
    priorityMessageTimerRef.current = setTimeout(() => {
      setPriorityFloatingMessage("");
      priorityMessageTimerRef.current = null;
    }, 5000);
  };

  const getMacroDisplayTitle = useCallback(
    (macro) => {
      const rawTitle = s(macro?.title, "Sin titulo");
      const categoryFromId = categories.find((category) => s(category.id) === s(macro?.category_id));
      const categoryFromCode = categories.find(
        (category) => normCategoryCode(category.code) === normCategoryCode(s(macro?.category_code, "general"))
      );
      const category = categoryFromId || categoryFromCode || null;
      const prefixes = Array.from(
        new Set(
          [
            s(category?.label),
            s(category?.code),
            s(macro?.category_code),
            s(category?.code).replace(/_/g, " "),
            s(macro?.category_code).replace(/_/g, " "),
          ].filter(Boolean),
        ),
      );

      let cleaned = rawTitle;
      for (const prefix of prefixes) {
        const regex = new RegExp(`^\\s*${escapeRegExp(prefix)}\\s*[-:|]\\s*`, "i");
        cleaned = cleaned.replace(regex, "").trim();
      }
      return s(cleaned, rawTitle);
    },
    [categories]
  );

  const macroCard = (macro, key, controls = null, onOpenMacro = null, view = "full", isSelected = false) => {
    const usage = usageByMacroId[macro.id] || EMPTY_USAGE;
    const macroUsageWindow = defaultUsageWindow;
    const shownValue = Number(usage[`shown_${macroUsageWindow}`] || 0);
    const copiedValue = Number(usage[`copied_${macroUsageWindow}`] || 0);
    const compactWorkspaceView = view === "workspace-left";
    const rightPanelView = !compactWorkspaceView;
    const displayTitle = getMacroDisplayTitle(macro);
    const appTagLabels = rightPanelView ? resolveAppTagLabels(macro.app_targets) : [];
    const roleTagLabels = rightPanelView ? arr(macro.audience_roles, []) : [];
    const envTagLabels = rightPanelView ? resolveEnvTagLabels(macro.env_targets) : [];
    return (
      <div key={key} className="flex items-stretch gap-2">
        <button
          type="button"
          onClick={() =>
            (onOpenMacro || ((item) => navigate(`/admin/macros/${item.id}`)))(macro)
          }
          className={`flex-1 rounded-lg border px-3 py-2 text-left transition ${
            isSelected
              ? "border-[#BFC7D1] bg-[#F3EEFF]"
              : "border-[#D1D5DB] bg-[#FCFBFF] hover:border-[#BFC7D1] hover:bg-[#F9F7FF]"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="min-w-0 flex-1">
              <div className={`flex items-start ${rightPanelView ? "gap-3" : "gap-2"}`}>
                <div className="min-w-0 flex-1 text-xs font-semibold text-[#2F1A55]">{displayTitle}</div>
                {!rightPanelView ? (
                  <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${badge(macro.status)}`}>
                    {macro.status}
                  </span>
                ) : null}
                {rightPanelView ? (
                  <div className="ml-auto flex max-w-[55%] flex-wrap items-center justify-end text-[9px] font-medium text-slate-900">
                    {appTagLabels.map((label, index) => (
                      <React.Fragment key={`${macro.id}-app-${label}`}>
                        {index > 0 ? <span className="px-2 text-slate-900">/</span> : null}
                        <span>{label}</span>
                      </React.Fragment>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className={rightPanelView ? "mt-3 text-xs text-slate-600" : "mt-2 text-xs text-slate-600"}>
                {short(macro.body, 220)}
              </div>
              {rightPanelView ? (
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex flex-wrap items-center text-[9px] font-medium text-slate-600">
                    {roleTagLabels.map((role, index) => (
                      <React.Fragment key={`${macro.id}-role-${role}`}>
                        {index > 0 ? <span className="px-2 text-slate-600">/</span> : null}
                        <span>{role}</span>
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="ml-auto flex flex-wrap items-center justify-end text-[9px] font-medium text-orange-600">
                    {envTagLabels.map((label, index) => (
                      <React.Fragment key={`${macro.id}-env-${label}`}>
                        {index > 0 ? <span className="px-2 text-orange-600">/</span> : null}
                        <span>{label}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            {rightPanelView ? (
              <div className="ml-auto flex shrink-0 items-start gap-1">
                <div className="w-[136px] rounded-xl border border-[#E9E2F7] bg-white px-2 py-2 text-center text-[11px]">
                  <div className="text-[#5E30A5]">
                    Mostrado: <strong>{shownValue}</strong>
                  </div>
                  <div className="mt-1 text-[#1E5E9A]">
                    Copiado: <strong>{copiedValue}</strong>
                  </div>
                </div>
                <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${badge(macro.status)}`}>
                  {macro.status}
                </span>
              </div>
            ) : null}
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
            <span className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-md border border-[#E9E2F7] bg-white text-[11px] font-semibold text-[#5E30A5]">
              {controls.position ?? ""}
            </span>
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

  const renderCatalog = () => {
    const selectionLabel = groupBy === "categoria" ? "categoría" : groupBy === "estado" ? "estado" : "rol";
    const selectionArticle = groupBy === "categoria" ? "una" : "un";
    const showMacroWorkspace = Boolean(macroId);
    const showRightWorkspace = Boolean(macroId) || Boolean(inlineAddContext);
    const rightPanelGroupedMacros = groupBy === "rol" ? selectedGroupMacrosByCategory : selectedGroupMacrosByStatus;
    const supportsGroupedActions = groupBy === "categoria" || groupBy === "rol";
    const showCollapseToggle = supportsGroupedActions && rightPanelGroupedMacros.length > 1;

    const renderInlineAddWorkspace = () => (
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3 px-1 py-0.5">
          <div className="text-sm font-semibold text-[#2F1A55]">
            Añadir macro
            {inlineAddContext?.title ? (
              <span className="ml-2 text-xs font-medium text-slate-500">{inlineAddContext.title}</span>
            ) : null}
          </div>
          <button
            type="button"
            onClick={closeInlineAddMacro}
            className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] px-3 py-1.5 text-xs font-semibold text-[#5E30A5]"
          >
            <ArrowLeft size={14} />
            Volver
          </button>
        </div>

        <form className="space-y-4" onSubmit={submitInlineAddMacro}>
          <input
            value={workspaceAddForm.title}
            onChange={(e) => setWorkspaceAddForm((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="título"
            className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm"
          />
          <textarea
            rows={5}
            value={workspaceAddForm.body}
            onChange={(e) => setWorkspaceAddForm((prev) => ({ ...prev, body: e.target.value }))}
            placeholder="body"
            className="w-full resize-none rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm"
          />
          <div className="grid gap-3 md:grid-cols-2">
            <select
              value={workspaceAddForm.category_id}
              onChange={(e) => setWorkspaceAddForm((prev) => ({ ...prev, category_id: e.target.value }))}
              className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm"
            >
              {categoryOptions.map((option) => (
                <option key={option.id || "general"} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={workspaceAddForm.thread_status}
              onChange={(e) => setWorkspaceAddForm((prev) => ({ ...prev, thread_status: e.target.value }))}
              className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm"
            >
              {THREAD_STATUS_ORDER.filter((status) => status !== "sin_estado").map((status) => (
                <option key={status} value={status}>
                  {THREAD_STATUS_LABEL[status]}
                </option>
              ))}
            </select>
          </div>
          <TogglePills
            options={ROLE_OPTIONS}
            values={workspaceAddForm.audience_roles}
            onChange={(values) => setWorkspaceAddForm((prev) => ({ ...prev, audience_roles: values }))}
          />
          <TogglePills
            options={APP_OPTIONS}
            values={workspaceAddForm.app_targets}
            onChange={(values) => setWorkspaceAddForm((prev) => ({ ...prev, app_targets: values }))}
          />
          <TogglePills
            options={ENV_OPTIONS}
            values={workspaceAddForm.env_targets}
            onChange={(values) => setWorkspaceAddForm((prev) => ({ ...prev, env_targets: values }))}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-white ${
                saving ? "bg-[#C9B6E8]" : "bg-[#5E30A5]"
              }`}
            >
              <Plus size={14} />
              Crear macro draft
            </button>
          </div>
        </form>
      </div>
    );

    return (
      <Card
        title={<span className="text-lg font-extrabold tracking-wide text-[#2F1A55]">CATÁLOGO DE MACROS</span>}
        headerRight={(
          <div className="flex items-center gap-1">
            <label className="text-xs font-semibold text-slate-500">Periodo de tiempo</label>
            <div className="flex flex-wrap gap-1">
              {USAGE_WINDOWS.map((windowKey) => (
                <button
                  key={`catalog-window-${windowKey}`}
                  type="button"
                  onClick={() => setDefaultUsageWindow(windowKey)}
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                    defaultUsageWindow === windowKey
                      ? "border-[#2F1A55] bg-[#2F1A55] text-white"
                      : "border-[#E9E2F7] bg-white text-[#2F1A55]"
                  }`}
                >
                  {windowKey}
                </button>
              ))}
            </div>
          </div>
        )}
      >
        <div className="grid items-end gap-3 sm:grid-cols-12">
          <div className="sm:col-span-3">
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
          <div className="sm:col-span-3">
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
          <div className="sm:col-span-6">
            <label className="text-xs font-semibold text-slate-500">Buscar</label>
            <div className="relative mt-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Título, body, code..."
                className="w-full rounded-xl border border-[#E9E2F7] py-2 pl-9 pr-3 text-xs"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-10">
          <div className="space-y-2 lg:col-span-3">
            {!showRightWorkspace ? (
              <div className="px-3 pt-2 pb-0">
                <div className="flex min-h-[24px] flex-nowrap items-center gap-2 overflow-x-auto">
                  <span className="shrink-0 text-xs font-semibold text-slate-500">Grupo</span>
                  {GROUP_OPTIONS.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => {
                        setGroupBy(g.id);
                        if (macroId) navigate("/admin/macros");
                      }}
                      className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                        groupBy === g.id ? "border-[#2F1A55] bg-[#2F1A55] text-white" : "border-[#E9E2F7] bg-white text-[#2F1A55]"
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            {showMacroWorkspace ? (
              <div className="space-y-2">
                {workspaceLeftMacros.length ? (
                  <div className="space-y-2">
                    {workspaceLeftMacros.map((macro, index) =>
                      macroCard(
                        macro,
                        `left-workspace-${macro.id}`,
                        groupBy === "categoria"
                          ? {
                              canMoveUp: index > 0,
                              canMoveDown: index < workspaceLeftMacros.length - 1,
                              position: index + 1,
                              onMoveUp: () => moveMacroPriorityWithinList(workspaceLeftMacros, index, -1),
                              onMoveDown: () => moveMacroPriorityWithinList(workspaceLeftMacros, index, 1),
                            }
                          : null,
                        () => navigate(`/admin/macros/${macro.id}`),
                        "workspace-left",
                        macro.id === macroId
                      )
                    )}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-[#E9E2F7] bg-white px-3 py-4 text-center text-xs text-slate-500">
                    No hay macros en este grupo.
                  </div>
                )}
              </div>
            ) : (
              catalogGroups.map((group) => {
                const isSelected = selectedGroup?.id === group.id;
                return (
                  <div
                    key={`group-${groupBy}-${group.id}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedGroupKey(group.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelectedGroupKey(group.id);
                      }
                    }}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      isSelected
                        ? "border-[#BFC7D1] bg-[#F7F2FF]"
                        : "border-[#D1D5DB] bg-[#FCFBFF] hover:border-[#BFC7D1] hover:bg-[#F9F7FF]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold text-[#2F1A55]">{group.label}</span>
                          {groupBy === "categoria" ? <span className="text-xs text-slate-400">({group.code || group.id})</span> : null}
                        </div>
                        <div className="text-xs text-slate-500">{group.description || "Sin descripcion"}</div>
                      </div>
                      <div className="text-right text-[11px] text-slate-600">
                        {groupBy === "categoria" ? (
                          <div>
                            <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${categoryBadge(group.status)}`}>
                              {group.status}
                            </span>
                          </div>
                        ) : null}
                        <div className={groupBy === "categoria" ? "mt-1" : ""}>
                          Macros: <strong>{group.list.length}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className={`lg:col-span-7 ${showRightWorkspace ? "lg:border-l lg:border-[#E9E2F7] lg:pl-4" : ""}`}>
            {showRightWorkspace ? (
              macroId ? renderEdit(true) : renderInlineAddWorkspace()
            ) : selectedGroup ? (
              groupBy === "estado" ? (
                selectedGroupFlatMacros.length ? (
                  <div className="space-y-2">
                    {selectedGroupFlatMacros.map((macro) =>
                      macroCard(
                        macro,
                        `right-flat-${macro.id}`,
                        null,
                        () => {
                          setWorkspaceMacroSubgroup(null);
                          navigate(`/admin/macros/${macro.id}`);
                        }
                      )
                    )}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-[#E9E2F7] bg-white px-3 py-5 text-center text-xs text-slate-500">
                    Sin macros para este grupo.
                  </div>
                )
              ) : (
                <div className="space-y-3">
                  {rightPanelGroupedMacros.length ? (
                    rightPanelGroupedMacros.map((macroGroup) => {
                      const groupUiKey = `right-${groupBy}-${selectedGroup.id}-${macroGroup.id}`;
                      const collapsed = Boolean(collapsedMacroGroups[groupUiKey]);
                      return (
                        <div key={groupUiKey} className="rounded-xl border border-[#EFE9FA] bg-white px-3 py-2">
                          <div className="mb-2 flex items-center justify-between gap-2">
                            <div className="flex min-w-0 items-center gap-2">
                              <div className="truncate text-xs font-semibold text-[#2F1A55]">{macroGroup.label}</div>
                              <span className="text-xs text-slate-400">({macroGroup.id})</span>
                              {supportsGroupedActions ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    openInlineAddMacro(
                                      groupBy === "categoria"
                                        ? {
                                            title: `${selectedGroup?.label || "categoría"} / ${macroGroup.label}`,
                                            category_id:
                                              s(selectedGroup?.category_id) && s(selectedGroup?.category_id) !== "general"
                                                ? s(selectedGroup?.category_id)
                                                : "",
                                            thread_status: macroGroup.id === "sin_estado" ? "new" : macroGroup.id,
                                            audience_roles: ["cliente", "negocio"],
                                            app_targets: arr(selectedGroup?.app_targets, appFilter !== "all" ? [appFilter] : ["all"]),
                                            env_targets: ["all"],
                                          }
                                        : {
                                            title: `${macroGroup.label} / ${selectedGroup?.label || "rol"}`,
                                            category_id: s(macroGroup.category_id),
                                            thread_status: "new",
                                            audience_roles: [s(selectedGroup?.id)],
                                            app_targets: arr(macroGroup.app_targets, appFilter !== "all" ? [appFilter] : ["all"]),
                                            env_targets: ["all"],
                                          }
                                    )
                                  }
                                  className="inline-flex items-center gap-1 rounded-lg border border-[#E9E2F7] bg-white px-2 py-1 text-[10px] font-semibold text-[#5E30A5] hover:bg-[#F9F7FF]"
                                >
                                  <Plus size={12} />
                                  AÑADIR
                                </button>
                              ) : null}
                            </div>
                            {showCollapseToggle ? (
                              <button
                                type="button"
                                onClick={() =>
                                  setCollapsedMacroGroups((prev) => ({
                                    ...prev,
                                    [groupUiKey]: !prev[groupUiKey],
                                  }))
                                }
                                className="inline-flex items-center justify-center p-0.5 text-slate-500 transition hover:text-[#5E30A5]"
                                aria-label={collapsed ? "Expandir grupo" : "Contraer grupo"}
                                title={collapsed ? "Expandir grupo" : "Contraer grupo"}
                              >
                                {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                              </button>
                            ) : null}
                          </div>
                          {!collapsed ? (
                            <div className="space-y-2">
                              {macroGroup.list.map((macro, index) =>
                                macroCard(
                                  macro,
                                  `right-${macroGroup.id}-${macro.id}`,
                                  groupBy === "categoria"
                                    ? {
                                        canMoveUp: index > 0,
                                        canMoveDown: index < macroGroup.list.length - 1,
                                        position: index + 1,
                                        onMoveUp: () => moveMacroPriorityWithinList(macroGroup.list, index, -1),
                                        onMoveDown: () => moveMacroPriorityWithinList(macroGroup.list, index, 1),
                                      }
                                    : null,
                                  () => {
                                    setWorkspaceMacroSubgroup({ groupBy, subgroupId: macroGroup.id });
                                    navigate(`/admin/macros/${macro.id}`);
                                  }
                                )
                              )}
                            </div>
                          ) : null}
                        </div>
                      );
                    })
                  ) : (
                    <div className="rounded-xl border border-dashed border-[#E9E2F7] bg-white px-3 py-5 text-center text-xs text-slate-500">
                      Sin macros para este grupo.
                    </div>
                  )}
                </div>
              )
            ) : (
              <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-[#E9E2F7] bg-[#FCFBFF] px-4 text-center text-sm text-slate-500">
                Selecciona {selectionArticle} {selectionLabel} para ver los macros.
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  };

  const renderCategoryEdit = () => {
    if (loading) return <Card title="Cargando..." subtitle="Buscando categoria seleccionada." />;
    if (!editingCategory) {
      return (
        <Card title="Categoria no encontrada" subtitle="No existe en el catalogo actual.">
          <Link to="/admin/macros" className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs font-semibold text-[#5E30A5]">
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
          <Link to="/admin/macros" className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs font-semibold text-[#5E30A5]">
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
              <button type="button" disabled={saving} onClick={() => triggerCategoryLifecycle("active")} className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">Activar</button>
              <button type="button" disabled={saving} onClick={() => triggerCategoryLifecycle("inactive")} className="rounded-xl border border-slate-300 bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">Inactivar</button>
              <button type="button" disabled={saving} onClick={removeCategory} className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700"><Trash2 size={12} />Eliminar</button>
            </div>
            <button type="submit" disabled={saving} className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-white ${saving ? "bg-[#C9B6E8]" : "bg-[#5E30A5]"}`}><Save size={14} />Guardar cambios</button>
          </div>
        </form>
      </Card>
    );
  };

  const renderEdit = (workspace = false) => {
    if (loading) {
      return workspace ? (
        <div className="px-1 py-0.5 text-sm font-semibold text-[#2F1A55]">Cargando...</div>
      ) : (
        <Card title="Cargando..." subtitle="Buscando macro seleccionada." />
      );
    }
    if (!editing) {
      if (workspace) {
        return (
          <div className="px-1 py-0.5 text-sm font-semibold text-[#2F1A55]">
            Macro no encontrada
          </div>
        );
      }
      return (
        <Card title="Macro no encontrada" subtitle="No existe en el catalogo actual.">
          <Link to="/admin/macros" className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs font-semibold text-[#5E30A5]">
            <ArrowLeft size={14} />
            Volver
          </Link>
        </Card>
      );
    }

    const heading = (
      <div className="flex items-center justify-between gap-3 px-1 py-0.5">
        <div className="text-sm font-semibold">
          <span className="text-[#2F1A55]">Modo Edición</span>
          <span className="ml-2 font-medium text-slate-500">{s(editing.code, "sin_code")}</span>
        </div>
        <Link to="/admin/macros" className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] px-3 py-1.5 text-xs font-semibold text-[#5E30A5]">
          <ArrowLeft size={14} />
          Volver
        </Link>
      </div>
    );

    const form = (
      <form className="space-y-4" onSubmit={submitSaveMacro}>
        <input value={editForm.title} onChange={(e) => setEditForm((p) => ({ ...p, title: e.target.value }))} placeholder="titulo" className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm" />
        <textarea rows={5} value={editForm.body} onChange={(e) => setEditForm((p) => ({ ...p, body: e.target.value }))} placeholder="body" className="w-full resize-none rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm" />
        <div className="grid gap-3 md:grid-cols-2">
          <select value={editForm.category_id} onChange={(e) => setEditForm((p) => ({ ...p, category_id: e.target.value }))} className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm">{categoryOptions.map((o) => <option key={o.id || "general"} value={o.id}>{o.label}</option>)}</select>
          <select value={editForm.thread_status} onChange={(e) => setEditForm((p) => ({ ...p, thread_status: e.target.value }))} className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm">{THREAD_STATUS_ORDER.filter((st) => st !== "sin_estado").map((st) => <option key={st} value={st}>{THREAD_STATUS_LABEL[st]}</option>)}</select>
        </div>
        <TogglePills options={ROLE_OPTIONS} values={editForm.audience_roles} onChange={(values) => setEditForm((p) => ({ ...p, audience_roles: values }))} />
        <TogglePills options={APP_OPTIONS} values={editForm.app_targets} onChange={(values) => setEditForm((p) => ({ ...p, app_targets: values }))} />
        <TogglePills options={ENV_OPTIONS} values={editForm.env_targets} onChange={(values) => setEditForm((p) => ({ ...p, env_targets: values }))} />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <button type="button" disabled={saving} onClick={() => setMacroLifecycle("draft")} className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">Pasar a draft</button>
            <button
              type="button"
              disabled={saving}
              onClick={() => setMacroLifecycle(editing.status === "published" ? "archived" : "published")}
              className={`rounded-xl px-3 py-2 text-xs font-semibold ${
                editing.status === "published"
                  ? "border border-slate-300 bg-slate-100 text-slate-700"
                  : "border border-emerald-200 bg-emerald-50 text-emerald-700"
              }`}
            >
              {editing.status === "published" ? "Archivar" : "Publicar"}
            </button>
            <button type="button" disabled={saving} onClick={removeMacro} className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700"><Trash2 size={12} />Eliminar</button>
          </div>
          <button type="submit" disabled={saving} className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-white ${saving ? "bg-[#C9B6E8]" : "bg-[#5E30A5]"}`}><Save size={14} />Guardar cambios</button>
        </div>
      </form>
    );

    if (workspace) {
      return (
        <div className="space-y-3">
          {heading}
          {form}
        </div>
      );
    }

    return (
      <Card
        title={`Modo Edición ${s(editing.code, "sin_code")}`}
        headerRight={(
          <Link to="/admin/macros" className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs font-semibold text-[#5E30A5]">
            <ArrowLeft size={14} />
            Volver
          </Link>
        )}
      >
        {form}
      </Card>
    );
  };

  return (
    <AdminLayout title="Macros" subtitle="Catálogo operativo y CRUD desde panel admin">
      {hasPendingPriorityChanges || priorityFloatingMessage ? (
        <div className="fixed left-1/2 top-0 z-40 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-b-2xl border-x border-b border-t-0 border-[#BCC5D1] bg-slate-100/92 px-3 py-2 shadow-lg backdrop-blur">
            <span className="text-xs font-semibold text-[#2F1A55]">
              {hasPendingPriorityChanges ? "Cambios de prioridad pendientes" : priorityFloatingMessage}
            </span>
            {hasPendingPriorityChanges ? (
              <>
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
              </>
            ) : null}
          </div>
        </div>
      ) : null}
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-end gap-3">
            <button type="button" onClick={() => load(true)} disabled={loading || refreshing || saving} className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs font-semibold text-[#5E30A5] disabled:opacity-60"><RefreshCw size={14} className={loading || refreshing ? "animate-spin" : ""} />Refrescar</button>
          </div>
          {error ? <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">{error}</div> : null}
          {catalogHint ? <div className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-xs text-amber-700">{catalogHint}</div> : null}
          {ok ? <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">{ok}</div> : null}
        </div>
        {categoryId ? renderCategoryEdit() : renderCatalog()}
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


