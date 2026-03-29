import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Check, Pencil, Plus, RefreshCw, RotateCcw, Trash2, X } from "lucide-react";
import {
  createSupportApp,
  fetchSupportApps,
  formatAliasesInput,
  parseAliasesInput,
  setSupportAppActive,
  updateSupportApp,
} from "./services/supportAppsService";

function getCountdownLabel(purgeAfter, nowMs) {
  if (!purgeAfter) return "";
  const deadline = new Date(purgeAfter).getTime();
  if (!Number.isFinite(deadline)) return "";
  const remainingMs = deadline - nowMs;
  if (remainingMs <= 0) return "Eliminacion pendiente";
  const totalHours = Math.ceil(remainingMs / (60 * 60 * 1000));
  if (totalHours <= 24) return `Elimina en ${totalHours}h`;
  const totalDays = Math.ceil(remainingMs / (24 * 60 * 60 * 1000));
  return `Elimina en ${totalDays}d`;
}

function emptyCreateDraft() {
  return {
    appKey: "",
    appCode: "",
    displayName: "",
    originSourceDefault: "user",
    aliasesInput: "",
  };
}

function toEditDraft(app) {
  return {
    appCode: String(app?.app_code || ""),
    displayName: String(app?.display_name || ""),
    originSourceDefault: String(app?.origin_source_default || "user"),
    aliasesInput: formatAliasesInput(app?.aliases || []),
  };
}

export default function AdminAppsPanel() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [selectedAppId, setSelectedAppId] = useState("");
  const [editing, setEditing] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createDraft, setCreateDraft] = useState(() => emptyCreateDraft());
  const [editDraft, setEditDraft] = useState({
    appCode: "",
    displayName: "",
    originSourceDefault: "user",
    aliasesInput: "",
  });
  const [nowMs, setNowMs] = useState(() => Date.now());

  const loadApps = useCallback(async (silent = false) => {
    if (silent) setRefreshing(true);
    else setLoading(true);
    setError("");
    try {
      const rows = await fetchSupportApps();
      setApps(rows);
      setSelectedAppId((current) => {
        if (current && rows.some((row) => row.id === current)) return current;
        return rows[0]?.id || "";
      });
    } catch (err) {
      setError(err?.message || "No se pudo cargar el catalogo de apps.");
      setApps([]);
      setSelectedAppId("");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadApps(false);
  }, [loadApps]);

  useEffect(() => {
    const timer = setInterval(() => setNowMs(Date.now()), 60_000);
    return () => clearInterval(timer);
  }, []);

  const selectedApp = useMemo(
    () => apps.find((row) => row.id === selectedAppId) || null,
    [apps, selectedAppId]
  );

  useEffect(() => {
    if (!selectedApp) return;
    setEditDraft(toEditDraft(selectedApp));
    setEditing(false);
  }, [selectedApp]);

  const handleRefresh = async () => {
    await loadApps(true);
  };

  const handleSelectApp = (appId) => {
    setSelectedAppId(appId);
    setCreateOpen(false);
    setCreateDraft(emptyCreateDraft());
    setMessage("");
    setError("");
  };

  const handleOpenCreate = () => {
    setCreateOpen((prev) => !prev);
    setCreateDraft(emptyCreateDraft());
    setEditing(false);
    setMessage("");
    setError("");
  };

  const handleCreate = async () => {
    const appKey = String(createDraft.appKey || "").trim().toLowerCase();
    const appCode = String(createDraft.appCode || "").trim().toLowerCase();
    const displayName = String(createDraft.displayName || "").trim();
    const originSourceDefault = String(createDraft.originSourceDefault || "").trim().toLowerCase();
    if (!appKey || !appCode || !displayName || !originSourceDefault) {
      setError("appKey, codigo, nombre y origen por defecto son requeridos.");
      return;
    }

    setCreating(true);
    setError("");
    setMessage("");
    try {
      const created = await createSupportApp({
        appKey,
        appCode,
        displayName,
        originSourceDefault,
        aliases: parseAliasesInput(createDraft.aliasesInput),
      });
      setMessage(`App creada: ${created.display_name}`);
      setCreateOpen(false);
      setCreateDraft(emptyCreateDraft());
      await loadApps(true);
      setSelectedAppId(created.id);
    } catch (err) {
      setError(err?.message || "No se pudo crear la app.");
    } finally {
      setCreating(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedApp) return;
    const appCode = String(editDraft.appCode || "").trim().toLowerCase();
    const displayName = String(editDraft.displayName || "").trim();
    const originSourceDefault = String(editDraft.originSourceDefault || "").trim().toLowerCase();
    if (!appCode || !displayName || !originSourceDefault) {
      setError("Codigo, nombre y origen por defecto son requeridos.");
      return;
    }

    setSavingEdit(true);
    setError("");
    setMessage("");
    try {
      await updateSupportApp(selectedApp.id, {
        appCode,
        displayName,
        originSourceDefault,
        aliases: parseAliasesInput(editDraft.aliasesInput),
      });
      setMessage(`App actualizada: ${displayName}`);
      setEditing(false);
      await loadApps(true);
    } catch (err) {
      setError(err?.message || "No se pudo actualizar la app.");
    } finally {
      setSavingEdit(false);
    }
  };

  const handleSoftDelete = async () => {
    if (!selectedApp) return;
    const ok = window.confirm(
      `La app "${selectedApp.display_name}" quedara inactiva y se eliminara en 30 dias. Continuar?`
    );
    if (!ok) return;

    setSavingEdit(true);
    setError("");
    setMessage("");
    try {
      await setSupportAppActive(selectedApp.id, false);
      setMessage(`App inactiva: ${selectedApp.display_name} (retencion 30 dias).`);
      setEditing(false);
      await loadApps(true);
    } catch (err) {
      setError(err?.message || "No se pudo inactivar la app.");
    } finally {
      setSavingEdit(false);
    }
  };

  const handleRestore = async () => {
    if (!selectedApp) return;
    setSavingEdit(true);
    setError("");
    setMessage("");
    try {
      await setSupportAppActive(selectedApp.id, true);
      setMessage(`App reactivada: ${selectedApp.display_name}.`);
      setEditing(false);
      await loadApps(true);
    } catch (err) {
      setError(err?.message || "No se pudo reactivar la app.");
    } finally {
      setSavingEdit(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-lg font-semibold text-[#2F1A55]">Catalogo de Apps</div>
          <div className="text-xs text-slate-500">
            `app_key` es inmutable para proteger tickets, logs y macros. Se edita solo identidad publica.
          </div>
        </div>
        <button
          type="button"
          onClick={handleRefresh}
          disabled={loading || refreshing}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#E9E2F7] text-[#5E30A5] disabled:opacity-60"
          title="Refrescar"
        >
          <RefreshCw size={14} className={loading || refreshing ? "animate-spin" : ""} />
        </button>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
          {error}
        </div>
      ) : null}
      {message ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
          {message}
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <button
              type="button"
              onClick={handleOpenCreate}
              className="group aspect-square rounded-2xl border border-dashed border-[#D6C8F2] bg-[#FAF8FF] p-4 text-left transition hover:bg-[#F4EDFF]"
            >
              <div className="flex h-full flex-col justify-between">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#5E30A5]">
                  {createOpen ? <X size={16} /> : <Plus size={16} />}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#2F1A55]">
                    {createOpen ? "Cerrar alta" : "Anadir app"}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    Registra nueva identidad de app.
                  </div>
                </div>
              </div>
            </button>

            {apps.map((app) => {
              const selected = app.id === selectedAppId;
              const countdown = app.is_active ? "" : getCountdownLabel(app.purge_after, nowMs);
              return (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => handleSelectApp(app.id)}
                  className={`aspect-square rounded-2xl border p-4 text-left transition ${
                    selected
                      ? "border-[#C7AFEF] bg-[#F3EDFF]"
                      : "border-[#E9E2F7] bg-white hover:bg-[#FAF8FF]"
                  }`}
                >
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${
                          app.is_active
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {app.is_active ? "Activa" : "Inactiva"}
                      </span>
                      {!app.is_active && countdown ? (
                        <span className="text-[10px] font-semibold text-[#8B5CF6]">{countdown}</span>
                      ) : null}
                    </div>

                    <div>
                      <div className="line-clamp-2 text-sm font-semibold text-[#2F1A55]">
                        {app.display_name}
                      </div>
                      <div className="mt-1 text-xs text-slate-500">{app.app_code}</div>
                      <div className="mt-1 text-[11px] text-slate-400">{app.app_key}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {createOpen ? (
            <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                    appKey (inmutable)
                  </div>
                  <input
                    value={createDraft.appKey}
                    onChange={(event) =>
                      setCreateDraft((prev) => ({ ...prev, appKey: event.target.value }))
                    }
                    placeholder="referidos_app"
                    className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
                  />
                </div>
                <div>
                  <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                    Codigo publico
                  </div>
                  <input
                    value={createDraft.appCode}
                    onChange={(event) =>
                      setCreateDraft((prev) => ({ ...prev, appCode: event.target.value }))
                    }
                    placeholder="referidos-pwa"
                    className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
                  />
                </div>
                <div>
                  <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                    Nombre
                  </div>
                  <input
                    value={createDraft.displayName}
                    onChange={(event) =>
                      setCreateDraft((prev) => ({ ...prev, displayName: event.target.value }))
                    }
                    placeholder="PWA"
                    className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
                  />
                </div>
                <div>
                  <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                    Origin default
                  </div>
                  <select
                    value={createDraft.originSourceDefault}
                    onChange={(event) =>
                      setCreateDraft((prev) => ({
                        ...prev,
                        originSourceDefault: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
                  >
                    <option value="user">user</option>
                    <option value="admin_support">admin_support</option>
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                  Aliases (coma separada)
                </div>
                <input
                  value={createDraft.aliasesInput}
                  onChange={(event) =>
                    setCreateDraft((prev) => ({ ...prev, aliasesInput: event.target.value }))
                  }
                  placeholder="app, pwa, referidos-app"
                  className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
                />
              </div>
              <div className="mt-3">
                <button
                  type="button"
                  onClick={handleCreate}
                  disabled={creating}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs font-semibold text-[#5E30A5] disabled:opacity-60"
                >
                  <Plus size={13} />
                  {creating ? "Creando..." : "Crear"}
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
          {!selectedApp ? (
            <div className="text-sm text-slate-500">Selecciona una app para ver detalle.</div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold text-[#2F1A55]">{selectedApp.display_name}</div>
                  <div className="text-xs text-slate-500">{selectedApp.app_key}</div>
                </div>
                {!editing ? (
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(true);
                      setError("");
                      setMessage("");
                    }}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#E9E2F7] text-[#5E30A5]"
                    title="Editar"
                  >
                    <Pencil size={13} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setEditDraft(toEditDraft(selectedApp));
                    }}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#E9E2F7] text-slate-500"
                    title="Cerrar edicion"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              <div className="grid gap-3">
                <div>
                  <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                    appKey (inmutable)
                  </div>
                  <input
                    value={selectedApp.app_key}
                    disabled
                    className="w-full rounded-xl border border-[#E9E2F7] bg-slate-50 px-3 py-2 text-xs text-slate-500"
                  />
                </div>

                <div>
                  <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                    Codigo publico
                  </div>
                  <input
                    value={editing ? editDraft.appCode : selectedApp.app_code}
                    disabled={!editing}
                    onChange={(event) =>
                      setEditDraft((prev) => ({ ...prev, appCode: event.target.value }))
                    }
                    className={`w-full rounded-xl border px-3 py-2 text-xs ${
                      editing
                        ? "border-[#E9E2F7] bg-white text-slate-700"
                        : "border-[#E9E2F7] bg-slate-50 text-slate-500"
                    }`}
                  />
                </div>

                <div>
                  <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                    Nombre
                  </div>
                  <input
                    value={editing ? editDraft.displayName : selectedApp.display_name}
                    disabled={!editing}
                    onChange={(event) =>
                      setEditDraft((prev) => ({ ...prev, displayName: event.target.value }))
                    }
                    className={`w-full rounded-xl border px-3 py-2 text-xs ${
                      editing
                        ? "border-[#E9E2F7] bg-white text-slate-700"
                        : "border-[#E9E2F7] bg-slate-50 text-slate-500"
                    }`}
                  />
                </div>

                <div>
                  <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                    Origin default
                  </div>
                  <select
                    value={editing ? editDraft.originSourceDefault : selectedApp.origin_source_default}
                    disabled={!editing}
                    onChange={(event) =>
                      setEditDraft((prev) => ({
                        ...prev,
                        originSourceDefault: event.target.value,
                      }))
                    }
                    className={`w-full rounded-xl border px-3 py-2 text-xs ${
                      editing
                        ? "border-[#E9E2F7] bg-white text-slate-700"
                        : "border-[#E9E2F7] bg-slate-50 text-slate-500"
                    }`}
                  >
                    <option value="user">user</option>
                    <option value="admin_support">admin_support</option>
                  </select>
                </div>

                <div>
                  <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                    Aliases
                  </div>
                  <input
                    value={editing ? editDraft.aliasesInput : formatAliasesInput(selectedApp.aliases || [])}
                    disabled={!editing}
                    onChange={(event) =>
                      setEditDraft((prev) => ({ ...prev, aliasesInput: event.target.value }))
                    }
                    className={`w-full rounded-xl border px-3 py-2 text-xs ${
                      editing
                        ? "border-[#E9E2F7] bg-white text-slate-700"
                        : "border-[#E9E2F7] bg-slate-50 text-slate-500"
                    }`}
                  />
                </div>
              </div>

              {!selectedApp.is_active && selectedApp.purge_after ? (
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
                  Inactiva. {getCountdownLabel(selectedApp.purge_after, nowMs)}.
                </div>
              ) : null}

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {editing ? (
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    disabled={savingEdit}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#5E30A5] px-3 py-2 text-xs font-semibold text-white disabled:opacity-60"
                  >
                    <Check size={13} />
                    {savingEdit ? "Guardando..." : "Guardar"}
                  </button>
                ) : null}

                {selectedApp.is_active ? (
                  <button
                    type="button"
                    onClick={handleSoftDelete}
                    disabled={savingEdit}
                    className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 disabled:opacity-60"
                  >
                    <Trash2 size={13} />
                    Borrar app
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleRestore}
                    disabled={savingEdit}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs font-semibold text-[#5E30A5] disabled:opacity-60"
                  >
                    <RotateCcw size={13} />
                    Reactivar
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

