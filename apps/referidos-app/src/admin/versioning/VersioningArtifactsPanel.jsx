import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, HardDriveDownload, Plus, RefreshCw } from "lucide-react";
import {
  cancelLocalArtifactSyncRequest,
  fetchLocalArtifactNodes,
  fetchLocalArtifactSyncRequests,
  fetchReleaseArtifacts,
  requestLocalArtifactSync,
  upsertLocalArtifactNode,
} from "./services/versioningService";

const sectionClass = "min-w-0 rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm";
const cardClass = "min-w-0 rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] p-3";
const headingClass = "text-sm font-semibold text-[#2F1A55]";
const detailClass = "text-xs text-slate-600";
const actionClass = "inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-[#E9E2F7] bg-white px-3 py-1.5 text-xs font-semibold text-[#5E30A5] disabled:cursor-not-allowed disabled:opacity-50";
const inputClass = "w-full rounded-lg border border-[#E9E2F7] bg-white px-3 py-2 text-sm text-slate-700 disabled:bg-slate-100";
const linkClass = "inline-flex items-center gap-1 text-xs font-semibold text-[#5E30A5] underline";
const statusLabels = {
  pending: "Pendiente",
  queued: "En cola",
  running: "En ejecución",
  success: "Completada",
  failed: "Fallida",
  cancelled: "Cancelada",
};
const historyFilters = [
  { key: "all", label: "Todas" },
  { key: "success", label: "Completadas" },
  { key: "failed", label: "Fallidas" },
  { key: "cancelled", label: "Canceladas" },
];
const runnerOsOptions = [
  { value: "windows", label: "Windows" },
  { value: "linux", label: "Linux" },
  { value: "macos", label: "macOS" },
];

function formatDate(value) {
  const date = new Date(value || "");
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleString("es-EC");
}

function isSyncInProgress(status) {
  return ["pending", "queued", "running"].includes(status);
}

function workflowLink(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.hostname === "github.com" ? parsed.href : "";
  } catch {
    return "";
  }
}

function artifactRunLink(artifact) {
  const repository = String(artifact.github_repository || "");
  const runId = String(artifact.github_run_id || "");
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository) || !/^\d+$/.test(runId)) return "";
  return `https://github.com/${repository}/actions/runs/${runId}`;
}

function artifactSource(artifact) {
  if (artifact.artifact_provider === "supabase_storage") {
    if (!artifact.artifact_path) return "El registro no incluye la ruta del archivo en Supabase.";
    if (artifact.metadata?.storage_deleted_at) return "El archivo de Supabase fue eliminado.";
    return "";
  }
  if (artifact.artifact_provider === "github_actions") {
    return artifact.github_run_id && artifact.artifact_name ? "" : "El respaldo de GitHub está incompleto.";
  }
  return "Esta copia no tiene un origen compatible con la sincronización.";
}

function nodeFormData(node) {
  return {
    nodeKey: String(node?.node_key || ""),
    displayName: String(node?.display_name || ""),
    runnerLabel: String(node?.runner_label || ""),
    osName: String(node?.os_name || ""),
    active: node?.active !== false,
  };
}

function NodeForm({ node, saving, onSave, onClose }) {
  const [draft, setDraft] = useState(() => nodeFormData(node));
  const update = (field, value) => setDraft((current) => ({ ...current, [field]: value }));
  return (
    <form className={`${cardClass} mt-2 space-y-3`} onSubmit={(event) => {
      event.preventDefault();
      onSave(draft);
    }}>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className={detailClass}>
          Clave del nodo
          <input className={inputClass} value={draft.nodeKey} required disabled={Boolean(node)} onChange={(event) => update("nodeKey", event.target.value)} />
        </label>
        <label className={detailClass}>
          Nombre del equipo
          <input className={inputClass} value={draft.displayName} required onChange={(event) => update("displayName", event.target.value)} />
        </label>
        <label className={detailClass}>
          Etiqueta del runner de GitHub
          <input className={inputClass} value={draft.runnerLabel} required onChange={(event) => update("runnerLabel", event.target.value)} />
        </label>
        <label className={detailClass}>
          Sistema operativo
          <select className={inputClass} value={draft.osName} onChange={(event) => update("osName", event.target.value)}>
            <option value="">Sin especificar</option>
            {draft.osName && !runnerOsOptions.some((option) => option.value === draft.osName) ? (
              <option value={draft.osName}>{draft.osName}</option>
            ) : null}
            {runnerOsOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
      </div>
      <label className={`inline-flex items-center gap-2 ${detailClass}`}>
        <input type="checkbox" checked={draft.active} onChange={(event) => update("active", event.target.checked)} />
        Habilitado para recibir copias
      </label>
      <div className="flex flex-wrap gap-2">
        <button className={actionClass} type="submit" disabled={saving}>{saving ? "Guardando…" : "Guardar equipo"}</button>
        <button className={actionClass} type="button" disabled={saving} onClick={onClose}>Cerrar</button>
      </div>
    </form>
  );
}

export default function VersioningArtifactsPanel({ activeProductKey = "", isActive = true }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadErrors, setLoadErrors] = useState({});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [artifacts, setArtifacts] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [syncRows, setSyncRows] = useState([]);
  const [selectedNodeKey, setSelectedNodeKey] = useState("");
  const [syncingReleaseId, setSyncingReleaseId] = useState("");
  const [cancellingRequestId, setCancellingRequestId] = useState("");
  const [confirmCancelId, setConfirmCancelId] = useState("");
  const [savingNode, setSavingNode] = useState(false);
  const [editingNodeKey, setEditingNodeKey] = useState(null);
  const [historyFilter, setHistoryFilter] = useState("all");
  const visibleProduct = useRef(null);
  const latestLoad = useRef(0);
  const loadInProgress = useRef(false);

  const loadData = useCallback(async (silent = false, ifIdle = false) => {
    if (visibleProduct.current !== activeProductKey) return;
    if (ifIdle && loadInProgress.current) return;
    const loadId = ++latestLoad.current;
    loadInProgress.current = true;
    if (silent) setRefreshing(true);
    else setLoading(true);

    const results = await Promise.allSettled([
      fetchReleaseArtifacts({ productKey: activeProductKey, limit: 220 }),
      fetchLocalArtifactNodes({ onlyActive: false, limit: 200 }),
      fetchLocalArtifactSyncRequests({ productKey: activeProductKey, limit: 200 }),
    ]);
    if (latestLoad.current !== loadId) return;

    const [artifactResult, nodeResult, historyResult] = results;
    const record = {};
    if (artifactResult.status === "fulfilled") setArtifacts(Array.isArray(artifactResult.value) ? artifactResult.value : []);
    else record.artifacts = artifactResult.reason?.message || "No se pudo cargar el inventario de builds.";
    if (historyResult.status === "fulfilled") setSyncRows(Array.isArray(historyResult.value) ? historyResult.value : []);
    else record.history = historyResult.reason?.message || "No se pudieron cargar las solicitudes.";
    if (nodeResult.status === "fulfilled") {
      const nextNodes = Array.isArray(nodeResult.value) ? nodeResult.value : [];
      const activeNodes = nextNodes.filter((node) => node.active !== false);
      setNodes(nextNodes);
      setSelectedNodeKey((current) => {
        if (nextNodes.some((node) => node.node_key === current)) return current;
        return activeNodes.length === 1 ? activeNodes[0].node_key : "";
      });
    } else record.nodes = nodeResult.reason?.message || "No se pudieron cargar los equipos.";
    setLoadErrors(record);
    loadInProgress.current = false;
    setLoading(false);
    setRefreshing(false);
  }, [activeProductKey]);

  useEffect(() => {
    if (!isActive) return undefined;
    visibleProduct.current = activeProductKey;
    loadData();
    return () => {
      visibleProduct.current = null;
      latestLoad.current += 1;
      loadInProgress.current = false;
    };
  }, [activeProductKey, isActive, loadData]);

  const productArtifacts = artifacts.filter((row) => !activeProductKey || row.product_key === activeProductKey);
  const productSyncRows = useMemo(() => syncRows.filter(
    (row) => !activeProductKey || row.product_key === activeProductKey
  ), [activeProductKey, syncRows]);
  const activeRequests = productSyncRows.filter((row) => isSyncInProgress(row.status));
  const hasActiveRequests = activeRequests.length > 0;
  const historyRows = productSyncRows.filter(
    (row) => (!selectedNodeKey || row.node_key === selectedNodeKey)
      && !isSyncInProgress(row.status)
      && (historyFilter === "all" || row.status === historyFilter)
  );
  const selectedNode = nodes.find((node) => node.node_key === selectedNodeKey);
  const localCopies = useMemo(() => {
    const copies = new Map();
    const timestamp = (item) => Date.parse(item.finished_at || item.updated_at || item.created_at) || 0;
    for (const row of productSyncRows) {
      if (row.status !== "success" || !row.local_path || !row.artifact_id) continue;
      const byNode = copies.get(row.artifact_id) || new Map();
      const previous = byNode.get(row.node_key);
      if (!previous || timestamp(row) > timestamp(previous)) byNode.set(row.node_key, row);
      copies.set(row.artifact_id, byNode);
    }
    return copies;
  }, [productSyncRows]);

  useEffect(() => {
    if (!isActive || !hasActiveRequests) return undefined;
    const timer = setInterval(() => loadData(true, true), 5000);
    return () => clearInterval(timer);
  }, [hasActiveRequests, isActive, loadData]);

  async function handleSaveNode(draft) {
    const nodeKey = draft.nodeKey.trim().toLowerCase();
    const displayName = draft.displayName.trim();
    const runnerLabel = draft.runnerLabel.trim();
    setError("");
    setMessage("");
    if (!nodeKey || !displayName || !runnerLabel) {
      setError("Completa la clave, el nombre y la etiqueta del runner.");
      return;
    }
    const existingNode = nodes.find((node) => node.node_key === nodeKey);
    if (editingNodeKey === "" && existingNode) {
      setError("Ya hay un equipo con esa clave. Edítalo desde la lista.");
      return;
    }
    setSavingNode(true);
    try {
      await upsertLocalArtifactNode({
        nodeKey,
        displayName,
        runnerLabel,
        osName: draft.osName.trim(),
        active: draft.active,
        metadata: existingNode?.metadata || {},
      });
      setMessage(`Equipo guardado: ${displayName}.`);
      setEditingNodeKey(null);
      await loadData(true);
      setSelectedNodeKey(nodeKey);
    } catch (err) {
      setError(err?.message || "No se pudo guardar el equipo.");
    } finally {
      setSavingNode(false);
    }
  }

  async function handleSync(artifact) {
    setSyncingReleaseId(artifact.release_id);
    setError("");
    setMessage("");
    try {
      await requestLocalArtifactSync({
        releaseId: artifact.release_id,
        nodeKey: selectedNodeKey,
        metadata: { source: "admin_versioning_catalog" },
      });
      setMessage(`Sincronización solicitada para ${artifact.version_label || artifact.semver} en ${selectedNode.display_name || selectedNodeKey}.`);
      await loadData(true);
    } catch (err) {
      setError(err?.message || "No se pudo solicitar la sincronización.");
      await loadData(true);
    } finally {
      setSyncingReleaseId("");
    }
  }

  async function handleCancel(requestId) {
    setCancellingRequestId(requestId);
    setError("");
    setMessage("");
    try {
      const result = await cancelLocalArtifactSyncRequest({
        requestId,
        errorDetail: "cancelled_by_user",
        metadata: { source: "admin_versioning_catalog" },
      });
      setMessage(result?.status === "success" || result?.status === "failed"
        ? "La solicitud ya había terminado."
        : "Se registró la solicitud de cancelación.");
      setConfirmCancelId("");
      await loadData(true);
    } catch (err) {
      setError(err?.message || "No se pudo solicitar la cancelación.");
    } finally {
      setCancellingRequestId("");
    }
  }

  return (
    <div className="space-y-4">
      <section className={sectionClass} aria-label="Inventario de builds">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className={headingClass}>Inventario de builds</h3>
            <p className={detailClass}>Archivos registrados en Supabase y GitHub, y copias reportadas por cada equipo.</p>
          </div>
          <button className={actionClass} type="button" onClick={() => loadData(true)} disabled={loading || refreshing}>
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            Actualizar
          </button>
        </div>
        <label className={`mt-4 block max-w-sm space-y-1 ${detailClass}`}>
          <span className="font-semibold">Equipo de destino</span>
          <select className={inputClass} value={selectedNodeKey} onChange={(event) => setSelectedNodeKey(event.target.value)}>
            <option value="">Selecciona un equipo</option>
            {nodes.map((node) => (
              <option key={node.id} value={node.node_key}>
                {node.display_name || node.node_key}{node.active === false ? " (deshabilitado)" : ""}
              </option>
            ))}
          </select>
        </label>
        {loadErrors.nodes ? <p className="mt-2 text-xs text-red-700" role="alert">{loadErrors.nodes}</p> : null}
        {message ? <p className={`${cardClass} mt-3 text-xs text-[#2F1A55]`} role="status">{message}</p> : null}
        {error ? <p className="mt-3 rounded-lg bg-red-50 p-3 text-xs text-red-700" role="alert">{error}</p> : null}
        {loading ? <p className={`mt-3 ${detailClass}`} role="status">Cargando inventario…</p> : null}
        {loadErrors.artifacts ? <p className="mt-3 text-xs text-red-700" role="alert">{loadErrors.artifacts}</p> : null}
        {!loading && !loadErrors.artifacts && productArtifacts.length === 0 ? (
          <p className={`${cardClass} mt-3 ${detailClass}`}>No hay builds registrados para este producto.</p>
        ) : null}
        {!loading && productArtifacts.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {productArtifacts.map((artifact) => {
              const version = artifact.version_label || artifact.semver || "Versión desconocida";
              const runUrl = artifactRunLink(artifact);
              const hasBackup = Boolean(artifact.github_artifact_id || artifact.metadata?.backup_artifact_id);
              const deletedAt = artifact.metadata?.storage_deleted_at;
              const storageRegistered = artifact.artifact_provider === "supabase_storage" && Boolean(artifact.artifact_path);
              const copies = [...(localCopies.get(artifact.id)?.values() || [])];
              const pending = activeRequests.some((row) => row.artifact_id === artifact.id && row.node_key === selectedNodeKey);
              const isSubmitting = syncingReleaseId === artifact.release_id;
              const sourceError = artifactSource(artifact);
              const unavailable = !selectedNode ? "Selecciona un equipo."
                : selectedNode.active === false ? "El equipo está deshabilitado."
                  : pending ? "Ya hay una solicitud para este equipo."
                    : loadErrors.history ? "No se pudo comprobar si hay una solicitud en curso."
                      : sourceError;
              const envHeads = Array.isArray(artifact.env_heads) ? artifact.env_heads : [];
              return (
                <li key={artifact.id} className={cardClass}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className={headingClass}>{version} <span className="font-normal text-slate-500">· {artifact.env_key || "Entorno desconocido"}</span></h4>
                      <p className={`break-all ${detailClass}`}>{artifact.artifact_name || "Archivo sin nombre"}</p>
                      {artifact.commit_sha ? <p className={`break-all font-mono ${detailClass}`}>{artifact.commit_sha}</p> : null}
                      <p className={detailClass}>{formatDate(artifact.created_at)}</p>
                    </div>
                    <div className="max-w-full">
                      <button
                        className={actionClass}
                        type="button"
                        aria-label={`Sincronizar copia de ${version}`}
                        disabled={Boolean(unavailable || syncingReleaseId || !artifact.release_id || loadErrors.nodes || loadErrors.artifacts)}
                        onClick={() => handleSync(artifact)}
                      >
                        <HardDriveDownload size={14} />
                        {isSubmitting ? "Solicitando…" : "Sincronizar copia"}
                      </button>
                      {unavailable ? <p className={`mt-1 ${detailClass}`}>{unavailable}</p> : null}
                    </div>
                  </div>
                  <dl className="mt-3 grid gap-3 border-t border-[#E9E2F7] pt-3 text-xs md:grid-cols-3">
                    <div className="min-w-0">
                      <dt className="font-semibold text-[#2F1A55]">Supabase Storage</dt>
                      <dd className={detailClass}>{deletedAt ? `Eliminada · ${formatDate(deletedAt)}` : storageRegistered ? "Copia registrada" : "Sin copia registrada"}</dd>
                      {storageRegistered ? (
                        <dd className={`break-all ${detailClass}`}>
                          {artifact.metadata?.storage_bucket || "versioning-artifacts"}/{artifact.artifact_path}
                        </dd>
                      ) : null}
                      {envHeads.length ? <dd className={detailClass}>Referenciada en {envHeads.join(", ")}</dd> : null}
                    </div>
                    <div className="min-w-0">
                      <dt className="font-semibold text-[#2F1A55]">GitHub Actions</dt>
                      <dd className={detailClass}>{hasBackup ? "Respaldo registrado. Disponibilidad sin verificar." : "Sin respaldo registrado"}</dd>
                      {runUrl ? <dd><a href={runUrl} className={linkClass} target="_blank" rel="noreferrer">Ver ejecución <ExternalLink size={12} /></a></dd> : null}
                    </div>
                    <div className="min-w-0">
                      <dt className="font-semibold text-[#2F1A55]">Copias locales reportadas</dt>
                      {copies.length ? copies.map((copy) => (
                        <dd key={copy.id} className={`mt-1 ${detailClass}`}>
                          <span className="block font-medium">{copy.node_name || copy.node_key} · {formatDate(copy.finished_at || copy.updated_at)}</span>
                          <span className="break-all">{copy.local_path}</span>
                        </dd>
                      )) : <dd className={detailClass}>{loadErrors.history ? "Historial no disponible" : "Sin copia en el historial consultado"}</dd>}
                    </div>
                  </dl>
                </li>
              );
            })}
          </ul>
        ) : null}
      </section>

      <section className={sectionClass} aria-label="Solicitudes de sincronización">
        <h3 className={headingClass}>Solicitudes de sincronización</h3>
        {loading ? <p className={`mt-2 ${detailClass}`} role="status">Cargando solicitudes…</p> : null}
        {loadErrors.history ? <p className="mt-2 text-xs text-red-700" role="alert">{loadErrors.history}</p> : null}
        {activeRequests.length > 0 ? (
          <div className="mt-3 space-y-2">
            <h4 className={headingClass}>En proceso</h4>
            {activeRequests.map((row) => (
              <div key={row.id} className={`${cardClass} flex flex-wrap items-start justify-between gap-2`}>
                <div className="min-w-0">
                  <p className={headingClass}>{row.version_label || "Versión desconocida"} · {row.node_name || row.node_key}</p>
                  <p className={detailClass}>{statusLabels[row.status]} · {formatDate(row.created_at)}</p>
                  {workflowLink(row.workflow_run_url) ? (
                    <a href={workflowLink(row.workflow_run_url)} className={linkClass} target="_blank" rel="noreferrer">Ver workflow <ExternalLink size={12} /></a>
                  ) : null}
                </div>
                {confirmCancelId === row.id ? (
                  <div className="flex flex-wrap gap-2">
                    <button className={`${actionClass} text-red-700`} type="button" disabled={Boolean(cancellingRequestId)} onClick={() => handleCancel(row.id)}>
                      {cancellingRequestId === row.id ? "Solicitando…" : "Confirmar cancelación"}
                    </button>
                    <button className={actionClass} type="button" disabled={Boolean(cancellingRequestId)} onClick={() => setConfirmCancelId("")}>Mantener solicitud</button>
                  </div>
                ) : (
                  <button className={actionClass} type="button" disabled={Boolean(cancellingRequestId)} onClick={() => setConfirmCancelId(row.id)}>Cancelar solicitud</button>
                )}
              </div>
            ))}
          </div>
        ) : null}
        {!loading ? (
          <div className="mt-4 space-y-2">
            <h4 className={headingClass}>Historial {selectedNode ? `· ${selectedNode.display_name || selectedNodeKey}` : "· Todos los equipos"}</h4>
            <div className="flex flex-wrap gap-2" aria-label="Filtrar por estado">
              {historyFilters.map((filter) => (
                <button
                  key={filter.key}
                  className={`${actionClass} ${historyFilter === filter.key ? "ring-1 ring-[#5E30A5]" : ""}`}
                  type="button"
                  aria-pressed={historyFilter === filter.key}
                  onClick={() => setHistoryFilter(filter.key)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            {!loadErrors.history && historyRows.length === 0 ? (
              <p className={detailClass}>No hay solicitudes que coincidan con este filtro.</p>
            ) : null}
            {historyRows.slice(0, 40).map((row) => {
              const url = workflowLink(row.workflow_run_url);
              return (
                <div key={row.id} className={cardClass}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className={headingClass}>{row.version_label || "Versión desconocida"} · {row.node_name || row.node_key}</p>
                    <p className={detailClass}>{statusLabels[row.status] || row.status} · {formatDate(row.finished_at || row.updated_at || row.created_at)}</p>
                  </div>
                  {row.local_path ? <p className={`break-all ${detailClass}`}>{row.local_path}</p> : null}
                  {row.error_detail ? <p className="break-words text-xs text-slate-600">{row.error_detail === "cancelled_by_user" ? "Cancelada por un administrador." : row.error_detail}</p> : null}
                  {url ? <a href={url} className={linkClass} target="_blank" rel="noreferrer">Ver workflow <ExternalLink size={12} /></a> : null}
                </div>
              );
            })}
            {historyRows.length > 40 ? <p className={detailClass}>Se muestran las 40 solicitudes más recientes.</p> : null}
          </div>
        ) : null}
      </section>

      <details className={sectionClass}>
        <summary className={`cursor-pointer ${headingClass}`}>Equipos y runners ({nodes.length})</summary>
        <div className="mt-3 space-y-2">
          <button
            className={actionClass}
            type="button"
            disabled={savingNode || Boolean(loadErrors.nodes)}
            onClick={() => setEditingNodeKey(editingNodeKey === "" ? null : "")}
          >
            <Plus size={14} /> Añadir equipo
          </button>
          {editingNodeKey === "" ? <NodeForm key="new" saving={savingNode} onSave={handleSaveNode} onClose={() => setEditingNodeKey(null)} /> : null}
          {!loading && !loadErrors.nodes && nodes.length === 0 ? <p className={detailClass}>No hay equipos registrados.</p> : null}
          {nodes.map((node) => (
            <div key={node.id} className={cardClass}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className={headingClass}>{node.display_name || node.node_key} · {node.active === false ? "Deshabilitado" : "Habilitado"}</p>
                  <p className={`break-words ${detailClass}`}>{node.node_key} · Runner {node.runner_label || "sin etiqueta"} · {node.os_name || "Sistema operativo sin especificar"}</p>
                </div>
                <button className={actionClass} type="button" disabled={savingNode} onClick={() => setEditingNodeKey(node.node_key)}>
                  Editar
                </button>
              </div>
              {editingNodeKey === node.node_key ? <NodeForm key={node.node_key} node={node} saving={savingNode} onSave={handleSaveNode} onClose={() => setEditingNodeKey(null)} /> : null}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
