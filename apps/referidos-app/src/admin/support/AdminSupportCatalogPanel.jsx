import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, Plus, RefreshCw, Save, Search, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import { supabase } from "../../lib/supabaseClient";
import {
  createSupportMacro,
  createSupportMacroCategory,
  deleteSupportMacro,
  dispatchSupportMacrosSync,
  listSupportMacroCatalog,
  setSupportMacroStatus,
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
  { id: "soporte", label: "soporte" },
  { id: "admin", label: "admin" },
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

const APP_ALIAS = new Map([
  ["all", "all"],
  ["app", "referidos_app"],
  ["pwa", "referidos_app"],
  ["referidos_app", "referidos_app"],
  ["referidos-app", "referidos_app"],
  ["prelaunch", "prelaunch_web"],
  ["prelaunch_web", "prelaunch_web"],
  ["prelaunch-web", "prelaunch_web"],
  ["android", "android_app"],
  ["android_app", "android_app"],
  ["android-app", "android_app"],
]);

const LIFECYCLE_OPTIONS = ["draft", "published", "archived"];

const s = (v, d = "") => (typeof v === "string" && v.trim() ? v.trim() : d);
const arr = (v, d = []) => (Array.isArray(v) ? Array.from(new Set(v.map((x) => s(x).toLowerCase()).filter(Boolean))) : d);
const code = (v) => s(v).toLowerCase().replace(/\s+/g, "_");
const short = (v, n = 180) => (s(v).length > n ? `${s(v).slice(0, n)}...` : s(v, "-"));
const appKey = (v, d = "referidos_app") => APP_ALIAS.get(s(v).toLowerCase()) || d;
const matchApp = (targets, appFilter) => appFilter === "all" || arr(targets, ["all"]).includes("all") || arr(targets, ["all"]).includes(appFilter);
const rank = (status) => {
  const idx = THREAD_STATUS_ORDER.indexOf(status);
  return idx === -1 ? THREAD_STATUS_ORDER.length + 1 : idx;
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
  const { macroId = "" } = useParams();

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

  const [threads, setThreads] = useState([]);
  const [categories, setCategories] = useState([]);
  const [macros, setMacros] = useState([]);

  const [categoryForm, setCategoryForm] = useState({ code: "", label: "", description: "", app_targets: ["all"], sort_order: 100 });
  const [macroForm, setMacroForm] = useState({
    code: "",
    title: "",
    body: "",
    category_id: "",
    thread_status: "",
    audience_roles: ["cliente", "negocio"],
    app_targets: ["all"],
    env_targets: ["all"],
    sort_order: 100,
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
    sort_order: 100,
  });

  const load = useCallback(async (manual = false) => {
    manual ? setRefreshing(true) : setLoading(true);
    setError("");
    setCatalogHint("");
    try {
      const [initialCatalog, threadRes] = await Promise.all([
        listSupportMacroCatalog({ includeArchived: true, includeDraft: true }),
        supabase
          .from("support_threads")
          .select("category,status,request_origin,origin_source,app_channel")
          .order("created_at", { ascending: false })
          .limit(3000),
      ]);

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
        code: s(c.code, s(c.id)),
        label: s(c.label, s(c.code, "Sin label")),
        description: s(c.description),
        status: s(c.status, "draft"),
        app_targets: arr(c.app_targets, ["all"]),
        sort_order: Number(c.sort_order || 100),
      }));
      const byId = nextCategories.reduce((acc, c) => ((acc[c.id] = c.code), acc), {});
      const nextMacros = (catalog?.macros || []).map((m) => ({
        id: s(m.id),
        code: s(m.code),
        title: s(m.title, "Sin titulo"),
        body: s(m.body),
        category_id: s(m.category_id),
        category_code: s(m.category_code, s(byId[s(m.category_id)], "general")),
        thread_status: s(m.thread_status, "sin_estado"),
        audience_roles: arr(m.audience_roles, ["cliente", "negocio"]),
        app_targets: arr(m.app_targets, ["all"]),
        env_targets: arr(m.env_targets, ["all"]),
        sort_order: Number(m.sort_order || 100),
        status: s(m.status, "draft"),
      }));
      const nextThreads = (threadRes.data || []).map((t) => ({
        category: s(t.category, "general"),
        status: s(t.status, "new"),
        app_key: appKey(s(t.app_channel || t.origin_source), t.request_origin === "anonymous" ? "prelaunch_web" : "referidos_app"),
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
      setThreads(nextThreads);
      if (threadRes.error) setError(threadRes.error.message || "No se pudieron cargar metricas.");
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
    if (!macroId) setTab("catalogo");
  }, [macroId]);

  const filteredThreads = useMemo(
    () => threads.filter((t) => appFilter === "all" || t.app_key === appFilter),
    [threads, appFilter]
  );

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
      .sort((a, b) => (a.sort_order !== b.sort_order ? a.sort_order - b.sort_order : a.title.localeCompare(b.title, "es")));
  }, [macros, appFilter, macroStatusFilter, search]);

  const categoryStats = useMemo(() => {
    const total = {};
    const active = {};
    const macroCount = {};
    const byThreadStatus = {};
    const roleSet = {};

    filteredThreads.forEach((t) => {
      total[t.category] = (total[t.category] || 0) + 1;
      if (["new", "assigned", "in_progress", "waiting_user", "queued"].includes(t.status)) {
        active[t.category] = (active[t.category] || 0) + 1;
      }
    });

    filteredMacros.forEach((m) => {
      const c = s(m.category_code, "general");
      macroCount[c] = (macroCount[c] || 0) + 1;
      byThreadStatus[c] ||= {};
      byThreadStatus[c][m.thread_status] ||= [];
      byThreadStatus[c][m.thread_status].push(m);
      roleSet[c] ||= new Set();
      m.audience_roles.forEach((r) => roleSet[c].add(r));
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
      total: total[c.code] || 0,
      active: active[c.code] || 0,
      macros: macroCount[c.code] || 0,
      byThreadStatus: byThreadStatus[c.code] || {},
      roles: Array.from(roleSet[c.code] || []).sort((a, b) => a.localeCompare(b)),
    }));
  }, [filteredThreads, filteredMacros, filteredCategories]);

  const groupedStatus = useMemo(() => {
    const groups = {};
    filteredMacros.forEach((m) => {
      groups[m.thread_status] ||= [];
      groups[m.thread_status].push(m);
    });
    return Object.entries(groups)
      .sort((a, b) => rank(a[0]) - rank(b[0]))
      .map(([id, list]) => ({ id, label: THREAD_STATUS_LABEL[id] || id, list }));
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
      .map(([id, list]) => ({ id, label: id, list }));
  }, [filteredMacros]);

  const editing = useMemo(() => macros.find((m) => m.id === macroId) || null, [macros, macroId]);

  useEffect(() => {
    if (!editing) return;
    setEditForm({
      code: editing.code,
      title: editing.title,
      body: editing.body,
      category_id: editing.category_id || "",
      thread_status: editing.thread_status === "sin_estado" ? "" : editing.thread_status,
      audience_roles: arr(editing.audience_roles, ["cliente", "negocio"]),
      app_targets: arr(editing.app_targets, ["all"]),
      env_targets: arr(editing.env_targets, ["all"]),
      sort_order: Number(editing.sort_order || 100),
    });
  }, [editing]);

  const categoryOptions = useMemo(
    () => [{ id: "", label: "Sin categoria (general)" }, ...categories.map((c) => ({ id: c.id, label: `${c.label} (${c.code})` }))],
    [categories]
  );

  const submitCreateCategory = async (event) => {
    event.preventDefault();
    setError("");
    setOk("");
    const c = code(categoryForm.code);
    if (!c || !/^[a-z0-9_]+$/.test(c) || !s(categoryForm.label)) {
      setError("Code/label de categoria invalidos.");
      return;
    }
    setSaving(true);
    try {
      await createSupportMacroCategory({
        code: c,
        label: s(categoryForm.label),
        description: s(categoryForm.description),
        app_targets: arr(categoryForm.app_targets, ["all"]),
        sort_order: Number(categoryForm.sort_order || 100),
        status: "draft",
      });
      setOk(`Categoria ${c} creada en draft.`);
      setCategoryForm({ code: "", label: "", description: "", app_targets: ["all"], sort_order: 100 });
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
    const c = code(macroForm.code);
    if (!c || !/^[a-z0-9_]+$/.test(c) || !s(macroForm.title) || !s(macroForm.body)) {
      setError("Code/titulo/body de macro invalidos.");
      return;
    }
    setSaving(true);
    try {
      await createSupportMacro({
        code: c,
        title: s(macroForm.title),
        body: s(macroForm.body),
        category_id: s(macroForm.category_id) || null,
        thread_status: s(macroForm.thread_status) || null,
        audience_roles: arr(macroForm.audience_roles, ["cliente", "negocio"]),
        app_targets: arr(macroForm.app_targets, ["all"]),
        env_targets: arr(macroForm.env_targets, ["all"]),
        sort_order: Number(macroForm.sort_order || 100),
        status: "draft",
      });
      setOk(`Macro ${c} creada en draft.`);
      setMacroForm({
        code: "",
        title: "",
        body: "",
        category_id: "",
        thread_status: "",
        audience_roles: ["cliente", "negocio"],
        app_targets: ["all"],
        env_targets: ["all"],
        sort_order: 100,
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
    const c = code(editForm.code);
    if (!c || !/^[a-z0-9_]+$/.test(c) || !s(editForm.title) || !s(editForm.body)) {
      setError("Code/titulo/body de macro invalidos.");
      return;
    }
    setSaving(true);
    try {
      await updateSupportMacro({
        macro_id: macroId,
        code: c,
        title: s(editForm.title),
        body: s(editForm.body),
        category_id: s(editForm.category_id) || null,
        thread_status: s(editForm.thread_status) || null,
        audience_roles: arr(editForm.audience_roles, ["cliente", "negocio"]),
        app_targets: arr(editForm.app_targets, ["all"]),
        env_targets: arr(editForm.env_targets, ["all"]),
        sort_order: Number(editForm.sort_order || 100),
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

  const macroCard = (macro, key) => (
    <button
      key={key}
      type="button"
      onClick={() => navigate(`/admin/soporte/macros/${macro.id}`)}
      className="w-full rounded-lg border border-[#EFE9FA] bg-[#FCFBFF] px-3 py-2 text-left hover:border-[#CDBAF1]"
    >
      <div className="flex items-center justify-between gap-2 text-xs">
        <div className="font-semibold text-[#2F1A55]">{macro.title}</div>
        <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${badge(macro.status)}`}>{macro.status}</span>
      </div>
      <div className="mt-1 text-[11px] text-slate-500">
        Categoria: {macro.category_code} | Estado ticket: {THREAD_STATUS_LABEL[macro.thread_status] || macro.thread_status} | Roles:{" "}
        {arr(macro.audience_roles, []).join(", ")}
      </div>
      <div className="mt-1 text-[11px] text-slate-500">
        Apps: {formatTargets(macro.app_targets, APP_OPTIONS)} | Entornos: {formatTargets(macro.env_targets, ENV_OPTIONS)}
      </div>
      <div className="mt-1 text-xs text-slate-600">{short(macro.body, 220)}</div>
    </button>
  );

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
                <button
                  type="button"
                  onClick={() => setExpanded((p) => ({ ...p, [key]: !p[key] }))}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-[#2F1A55]">{c.label}</span>
                      <span className="text-xs text-slate-400">({c.code})</span>
                      <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${badge(c.status)}`}>{c.status}</span>
                    </div>
                    <div className="text-xs text-slate-500">{c.description || "Sin descripcion"}</div>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Total: <strong>{c.total}</strong> | Activos: <strong>{c.active}</strong> | Macros: <strong>{c.macros}</strong>
                  </div>
                  <div className="text-[#5E30A5]">{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</div>
                </button>
                {open ? (
                  <div className="space-y-3 border-t border-[#EFE9FA] px-4 py-3">
                    {byStatus.length ? (
                      byStatus.map(([st, list]) => (
                        <div key={`${key}-${st}`} className="rounded-xl border border-[#EFE9FA] bg-white px-3 py-2">
                          <div className="mb-2 text-xs font-semibold text-[#2F1A55]">
                            {THREAD_STATUS_LABEL[st] || st} <span className="text-slate-400">({st})</span>
                          </div>
                          <div className="space-y-2">{list.map((m) => macroCard(m, `${key}-${st}-${m.id}`))}</div>
                        </div>
                      ))
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
      <Card title="Añadir categoria (draft)" subtitle="Nueva categoria editable desde panel.">
        <form className="space-y-4" onSubmit={submitCreateCategory}>
          <div className="grid gap-3 md:grid-cols-2">
            <input value={categoryForm.code} onChange={(e) => setCategoryForm((p) => ({ ...p, code: e.target.value }))} placeholder="code" className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm" />
            <input value={categoryForm.label} onChange={(e) => setCategoryForm((p) => ({ ...p, label: e.target.value }))} placeholder="label" className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm" />
          </div>
          <textarea rows={3} value={categoryForm.description} onChange={(e) => setCategoryForm((p) => ({ ...p, description: e.target.value }))} placeholder="descripcion" className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm" />
          <TogglePills options={APP_OPTIONS} values={categoryForm.app_targets} onChange={(values) => setCategoryForm((p) => ({ ...p, app_targets: values }))} />
          <button type="submit" disabled={saving} className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-white ${saving ? "bg-[#C9B6E8]" : "bg-[#5E30A5]"}`}><Plus size={14} />Crear categoria draft</button>
        </form>
      </Card>

      <Card title="Añadir macro (draft)" subtitle="Macro nueva lista para editar/publicar.">
        <form className="space-y-4" onSubmit={submitCreateMacro}>
          <div className="grid gap-3 md:grid-cols-2">
            <input value={macroForm.code} onChange={(e) => setMacroForm((p) => ({ ...p, code: e.target.value }))} placeholder="code" className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm" />
            <input value={macroForm.title} onChange={(e) => setMacroForm((p) => ({ ...p, title: e.target.value }))} placeholder="titulo" className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm" />
          </div>
          <textarea rows={4} value={macroForm.body} onChange={(e) => setMacroForm((p) => ({ ...p, body: e.target.value }))} placeholder="body" className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm" />
          <div className="grid gap-3 md:grid-cols-3">
            <select value={macroForm.category_id} onChange={(e) => setMacroForm((p) => ({ ...p, category_id: e.target.value }))} className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm">{categoryOptions.map((o) => <option key={o.id || "general"} value={o.id}>{o.label}</option>)}</select>
            <select value={macroForm.thread_status} onChange={(e) => setMacroForm((p) => ({ ...p, thread_status: e.target.value }))} className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm"><option value="">Sin estado</option>{THREAD_STATUS_ORDER.filter((st) => st !== "sin_estado").map((st) => <option key={st} value={st}>{THREAD_STATUS_LABEL[st]}</option>)}</select>
            <input type="number" value={macroForm.sort_order} onChange={(e) => setMacroForm((p) => ({ ...p, sort_order: Number(e.target.value || 0) }))} className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm" />
          </div>
          <TogglePills options={ROLE_OPTIONS} values={macroForm.audience_roles} onChange={(values) => setMacroForm((p) => ({ ...p, audience_roles: values }))} />
          <TogglePills options={APP_OPTIONS} values={macroForm.app_targets} onChange={(values) => setMacroForm((p) => ({ ...p, app_targets: values }))} />
          <TogglePills options={ENV_OPTIONS} values={macroForm.env_targets} onChange={(values) => setMacroForm((p) => ({ ...p, env_targets: values }))} />
          <button type="submit" disabled={saving} className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-white ${saving ? "bg-[#C9B6E8]" : "bg-[#5E30A5]"}`}><Plus size={14} />Crear macro draft</button>
        </form>
      </Card>
    </div>
  );

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
            <input value={editForm.code} onChange={(e) => setEditForm((p) => ({ ...p, code: e.target.value }))} placeholder="code" className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm" />
            <input value={editForm.title} onChange={(e) => setEditForm((p) => ({ ...p, title: e.target.value }))} placeholder="titulo" className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm" />
          </div>
          <textarea rows={5} value={editForm.body} onChange={(e) => setEditForm((p) => ({ ...p, body: e.target.value }))} placeholder="body" className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm" />
          <div className="grid gap-3 md:grid-cols-3">
            <select value={editForm.category_id} onChange={(e) => setEditForm((p) => ({ ...p, category_id: e.target.value }))} className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm">{categoryOptions.map((o) => <option key={o.id || "general"} value={o.id}>{o.label}</option>)}</select>
            <select value={editForm.thread_status} onChange={(e) => setEditForm((p) => ({ ...p, thread_status: e.target.value }))} className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm"><option value="">Sin estado</option>{THREAD_STATUS_ORDER.filter((st) => st !== "sin_estado").map((st) => <option key={st} value={st}>{THREAD_STATUS_LABEL[st]}</option>)}</select>
            <input type="number" value={editForm.sort_order} onChange={(e) => setEditForm((p) => ({ ...p, sort_order: Number(e.target.value || 0) }))} className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-sm" />
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
      <div className="space-y-6">
        <div className="space-y-3">
          {!macroId ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setTab("catalogo")} className={`rounded-full border px-3 py-1 text-xs font-semibold ${tab === "catalogo" ? "border-[#2F1A55] bg-[#2F1A55] text-white" : "border-[#E9E2F7] bg-white text-[#2F1A55]"}`}>Catalogo</button>
                <button type="button" onClick={() => setTab("anadir")} className={`rounded-full border px-3 py-1 text-xs font-semibold ${tab === "anadir" ? "border-[#2F1A55] bg-[#2F1A55] text-white" : "border-[#E9E2F7] bg-white text-[#2F1A55]"}`}>Añadir</button>
              </div>
              <button type="button" onClick={() => load(true)} disabled={loading || refreshing || saving} className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs font-semibold text-[#5E30A5] disabled:opacity-60"><RefreshCw size={14} className={loading || refreshing ? "animate-spin" : ""} />Refrescar</button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#E9E2F7] bg-white px-4 py-3">
              <div className="text-xs text-slate-500">Editando macro individual.</div>
              <Link to="/admin/soporte/macros" className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs font-semibold text-[#5E30A5]"><ArrowLeft size={14} />Volver a catalogo</Link>
            </div>
          )}
          {error ? <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">{error}</div> : null}
          {catalogHint ? <div className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-xs text-amber-700">{catalogHint}</div> : null}
          {ok ? <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">{ok}</div> : null}
        </div>
        {macroId ? renderEdit() : tab === "catalogo" ? renderCatalog() : renderAdd()}
      </div>
    </AdminLayout>
  );
}
