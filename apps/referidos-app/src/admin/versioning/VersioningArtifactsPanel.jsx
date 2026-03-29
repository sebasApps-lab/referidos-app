import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircle2, HardDriveDownload, Plus, RefreshCw, ServerCog, X } from "lucide-react";
import Table from "../../components/ui/Table";
import {
  cancelLocalArtifactSyncRequest,
  fetchLocalArtifactNodes,
  fetchLocalArtifactSyncRequests,
  fetchReleaseArtifacts,
  requestLocalArtifactSync,
  upsertLocalArtifactNode,
} from "./services/versioningService";

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString("es-EC");
}

function syncStatusBadgeClass(status) {
  const normalized = String(status || "").toLowerCase();
  if (normalized === "success") return "bg-emerald-100 text-emerald-700";
  if (normalized === "failed") return "bg-red-100 text-red-700";
  if (normalized === "running") return "bg-indigo-100 text-indigo-700";
  if (normalized === "queued" || normalized === "pending") return "bg-amber-100 text-amber-700";
  if (normalized === "cancelled") return "bg-slate-200 text-slate-700";
  return "bg-slate-100 text-slate-600";
}

const SYNC_STATUS_FILTERS = [
  { key: "success", label: "success" },
  { key: "failed", label: "failed" },
  { key: "all", label: "all" },
];

const RUNNER_OS_OPTIONS = [
  { value: "windows", label: "Windows" },
  { value: "linux", label: "Linux" },
  { value: "macos", label: "macOS" },
];

function normalizeHistorySyncStatus(status) {
  const normalized = String(status || "").toLowerCase();
  if (normalized === "cancelled") return "failed";
  return normalized;
}

function isSyncInProgress(status) {
  const normalized = String(status || "").toLowerCase();
  return normalized === "queued" || normalized === "pending" || normalized === "running";
}

function inProgressStepStates(status) {
  const normalized = String(status || "").toLowerCase();
  if (normalized === "running") {
    return {
      queued: "success",
      running: "running",
      finalize: "pending",
    };
  }
  return {
    queued: "running",
    running: "pending",
    finalize: "pending",
  };
}

function toNodeDraft(node) {
  return {
    nodeKey: String(node?.node_key || "").trim().toLowerCase(),
    displayName: String(node?.display_name || "").trim(),
    runnerLabel: String(node?.runner_label || "").trim(),
    osName: String(node?.os_name || "").trim(),
    active: node?.active !== false,
  };
}

function emptyNodeDraft() {
  return {
    nodeKey: "",
    displayName: "",
    runnerLabel: "",
    osName: "",
    active: true,
  };
}

export default function VersioningArtifactsPanel({ activeProductKey = "" }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [artifacts, setArtifacts] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [syncRows, setSyncRows] = useState([]);
  const [selectedNodeKey, setSelectedNodeKey] = useState("");
  const [syncingReleaseId, setSyncingReleaseId] = useState("");
  const [cancellingSyncRequestId, setCancellingSyncRequestId] = useState("");
  const [savingNode, setSavingNode] = useState(false);
  const [addNodeFormOpen, setAddNodeFormOpen] = useState(false);
  const [editingNodeKey, setEditingNodeKey] = useState("");
  const [syncStatusFilter, setSyncStatusFilter] = useState("success");
  const [nodeDraft, setNodeDraft] = useState(emptyNodeDraft());

  const loadData = useCallback(
    async (silent = false) => {
      if (silent) setRefreshing(true);
      else setLoading(true);
      setError("");
      try {
        const [artifactRows, nodeRows, syncRequestRows] = await Promise.all([
          fetchReleaseArtifacts({
            productKey: activeProductKey || "",
            limit: 220,
          }),
          fetchLocalArtifactNodes({ onlyActive: false, limit: 200 }),
          fetchLocalArtifactSyncRequests({
            productKey: activeProductKey || "",
            limit: 200,
          }),
        ]);

        setArtifacts(Array.isArray(artifactRows) ? artifactRows : []);
        const nextNodes = Array.isArray(nodeRows) ? nodeRows : [];
        setNodes(nextNodes);
        setSyncRows(Array.isArray(syncRequestRows) ? syncRequestRows : []);

        setSelectedNodeKey((current) => {
          const keys = new Set(nextNodes.map((node) => String(node.node_key || "")));
          if (current && keys.has(current)) return current;
          if (nextNodes.length === 1) return String(nextNodes[0]?.node_key || "");
          return "";
        });
      } catch (err) {
        setError(err?.message || "No se pudo cargar catálogo de builds.");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [activeProductKey]
  );

  useEffect(() => {
    loadData(false);
  }, [loadData]);

  const productArtifacts = useMemo(
    () =>
      (artifacts || []).filter((row) => {
        if (!activeProductKey) return true;
        return String(row.product_key || "") === String(activeProductKey);
      }),
    [artifacts, activeProductKey]
  );

  const scopedNodeSyncRows = useMemo(() => {
    if (!selectedNodeKey) return [];
    return (syncRows || []).filter((row) => {
      if (String(row.node_key || "") !== String(selectedNodeKey)) return false;
      if (!activeProductKey) return true;
      return String(row.product_key || "") === String(activeProductKey);
    });
  }, [activeProductKey, selectedNodeKey, syncRows]);

  const inProgressSyncRows = useMemo(
    () => scopedNodeSyncRows.filter((row) => isSyncInProgress(row.status)),
    [scopedNodeSyncRows]
  );

  const filteredSyncRows = useMemo(() => {
    const historyRows = scopedNodeSyncRows.filter((row) => !isSyncInProgress(row.status));
    if (syncStatusFilter === "all") return historyRows;
    if (syncStatusFilter === "failed") {
      return historyRows.filter(
        (row) => normalizeHistorySyncStatus(row.status) === "failed"
      );
    }
    return historyRows.filter(
      (row) => normalizeHistorySyncStatus(row.status) === "success"
    );
  }, [scopedNodeSyncRows, syncStatusFilter]);

  useEffect(() => {
    if (!selectedNodeKey) return undefined;
    if (inProgressSyncRows.length === 0) return undefined;
    const timer = setInterval(() => {
      loadData(true);
    }, 5000);
    return () => clearInterval(timer);
  }, [inProgressSyncRows.length, loadData, selectedNodeKey]);

  const openCreateNodeForm = useCallback(() => {
    setAddNodeFormOpen((current) => {
      const next = !current;
      if (next) {
        setEditingNodeKey("");
        setNodeDraft(emptyNodeDraft());
      }
      return next;
    });
  }, []);

  const handleEditNode = useCallback((node) => {
    setAddNodeFormOpen(false);
    setEditingNodeKey(String(node?.node_key || "").trim().toLowerCase());
    setNodeDraft(toNodeDraft(node));
  }, []);

  const handleSaveNode = useCallback(async () => {
    const nodeKey = String(nodeDraft.nodeKey || "").trim().toLowerCase();
    const displayName = String(nodeDraft.displayName || "").trim();
    const runnerLabel = String(nodeDraft.runnerLabel || "").trim();
    if (!nodeKey || !displayName || !runnerLabel) {
      setError("nodeKey, displayName y runnerLabel son requeridos.");
      return;
    }

    setSavingNode(true);
    setError("");
    setMessage("");
    try {
      await upsertLocalArtifactNode({
        nodeKey,
        displayName,
        runnerLabel,
        osName: String(nodeDraft.osName || "").trim(),
        active: nodeDraft.active !== false,
      });
      setMessage(editingNodeKey ? `Nodo actualizado: ${nodeKey}` : `Nodo creado: ${nodeKey}`);
      setNodeDraft(emptyNodeDraft());
      if (editingNodeKey) {
        setEditingNodeKey("");
      } else {
        setAddNodeFormOpen(false);
      }
      await loadData(true);
      setSelectedNodeKey(nodeKey);
    } catch (err) {
      setError(err?.message || "No se pudo guardar nodo local.");
    } finally {
      setSavingNode(false);
    }
  }, [editingNodeKey, loadData, nodeDraft]);

  const handleSyncRelease = useCallback(
    async (releaseId, semver) => {
      if (!selectedNodeKey) {
        setError("Selecciona nodo antes de sincronizar.");
        return;
      }
      setSyncingReleaseId(String(releaseId));
      setMessage("");
      setError("");
      try {
        const result = await requestLocalArtifactSync({
          releaseId,
          nodeKey: selectedNodeKey,
          metadata: {
            source: "admin_versioning_catalog",
          },
        });
        const requestId = result?.request?.id || "-";
        setMessage(`Sync local encolada para ${semver}. request_id=${requestId}`);
        await loadData(true);
      } catch (err) {
        setError(err?.message || "No se pudo encolar sincronización local.");
      } finally {
        setSyncingReleaseId("");
      }
    },
    [loadData, selectedNodeKey]
  );

  const handleCancelSyncRequest = useCallback(
    async (requestId) => {
      const normalizedRequestId = String(requestId || "").trim();
      if (!normalizedRequestId) return;
      setCancellingSyncRequestId(normalizedRequestId);
      setError("");
      setMessage("");
      try {
        await cancelLocalArtifactSyncRequest({
          requestId: normalizedRequestId,
          errorDetail: "cancelled_by_user",
          metadata: {
            source: "admin_versioning_catalog",
          },
        });
        setMessage(`Sync cancelada: ${normalizedRequestId}`);
        await loadData(true);
      } catch (err) {
        setError(err?.message || "No se pudo cancelar sincronizacion local.");
      } finally {
        setCancellingSyncRequestId("");
      }
    },
    [loadData]
  );

  const renderProgressStepIcon = (state) => {
    if (state === "success") return <CheckCircle2 size={13} className="text-emerald-600" />;
    if (state === "running") return <RefreshCw size={13} className="animate-spin text-[#5E30A5]" />;
    return <span className="inline-block h-[9px] w-[9px] rounded-full border border-slate-300" />;
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-[#2F1A55]">Nodos locales</div>
            <div className="text-xs text-slate-500">Gestiona nodos para sincronizar builds a PC</div>
          </div>
          <button
            type="button"
            onClick={() => loadData(true)}
            disabled={loading || refreshing}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#E9E2F7] text-[#5E30A5] disabled:opacity-60"
            title="Refrescar"
          >
            <RefreshCw size={14} className={loading || refreshing ? "animate-spin" : ""} />
          </button>
        </div>

        <div className="mt-3 rounded-xl border border-dashed border-[#D6C8F2] bg-[#FAF8FF]">
          <div className="flex items-center justify-between gap-2 px-3 py-2">
            <button
              type="button"
              onClick={openCreateNodeForm}
              className="inline-flex items-center justify-start gap-2 text-xs font-semibold text-[#5E30A5]"
            >
              <Plus size={13} />
              Anadir nuevo nodo
            </button>
            {addNodeFormOpen ? (
              <button
                type="button"
                onClick={() => {
                  setAddNodeFormOpen(false);
                  setNodeDraft(emptyNodeDraft());
                }}
                className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-[#E9E2F7] bg-white text-slate-500"
                title="Cerrar"
              >
                <X size={12} />
              </button>
            ) : null}
          </div>
          {addNodeFormOpen ? (
            <div className="border-t border-[#E9E2F7] bg-white p-3">
              <div className="grid gap-2 md:grid-cols-4">
                <div>
                  <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">nodeKey</div>
                  <input
                    value={nodeDraft.nodeKey}
                    onChange={(event) => setNodeDraft((prev) => ({ ...prev, nodeKey: event.target.value }))}
                    className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
                    placeholder="pc-sebas"
                  />
                </div>
                <div>
                  <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">displayName</div>
                  <input
                    value={nodeDraft.displayName}
                    onChange={(event) => setNodeDraft((prev) => ({ ...prev, displayName: event.target.value }))}
                    className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
                    placeholder="Build Node - CI Windows 01"
                  />
                </div>
                <div>
                  <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">runnerLabel</div>
                  <input
                    value={nodeDraft.runnerLabel}
                    onChange={(event) => setNodeDraft((prev) => ({ ...prev, runnerLabel: event.target.value }))}
                    className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
                    placeholder="pc-sebas"
                  />
                </div>
                <div>
                  <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">OS</div>
                  <select
                    value={nodeDraft.osName}
                    onChange={(event) => setNodeDraft((prev) => ({ ...prev, osName: event.target.value }))}
                    className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
                  >
                    <option value="">Selecciona OS</option>
                    {nodeDraft.osName &&
                    !RUNNER_OS_OPTIONS.some((item) => item.value === nodeDraft.osName) ? (
                      <option value={nodeDraft.osName}>{nodeDraft.osName}</option>
                    ) : null}
                    {RUNNER_OS_OPTIONS.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={handleSaveNode}
                  disabled={savingNode}
                  className="inline-flex items-center gap-1 rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs font-semibold text-[#5E30A5] disabled:opacity-60"
                >
                  <ServerCog size={13} />
                  {savingNode ? "Procesando..." : "Crear"}
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-3 space-y-2">
          {nodes.length ? (
            nodes.map((node) => {
              const nodeKey = String(node.node_key || "");
              const selected = String(selectedNodeKey || "") === nodeKey;
              return (
                <div
                  key={node.id}
                  className={`rounded-xl border px-3 py-2 ${
                    selected
                      ? "border-[#BFA7EA] bg-[#F6F0FF]"
                      : "border-[#E9E2F7] bg-white hover:bg-[#FAF8FF]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedNodeKey(nodeKey);
                        if (addNodeFormOpen) setAddNodeFormOpen(false);
                      }}
                      className="min-w-0 flex-1 text-left"
                    >
                      <div className="text-xs font-semibold text-[#2F1A55]">{node.display_name || nodeKey}</div>
                      <div className="text-[11px] text-slate-600">{nodeKey} - {node.runner_label || "-"}</div>
                      <div className="text-[11px] text-slate-500">{node.os_name || "OS no definido"}</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (editingNodeKey === nodeKey) {
                          setEditingNodeKey("");
                          setNodeDraft(emptyNodeDraft());
                          return;
                        }
                        handleEditNode(node);
                      }}
                      className="inline-flex items-center rounded-lg border border-[#E9E2F7] px-2 py-1 text-[11px] font-semibold text-[#5E30A5]"
                    >
                      {editingNodeKey === nodeKey ? <X size={12} /> : "Editar"}
                    </button>
                  </div>
                  {editingNodeKey === nodeKey ? (
                    <div className="mt-2 rounded-xl border border-[#E9E2F7] bg-white p-3">
                      <div className="grid gap-2 md:grid-cols-4">
                        <div>
                          <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">nodeKey</div>
                          <input
                            value={nodeDraft.nodeKey}
                            disabled
                            className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700 disabled:bg-slate-50"
                          />
                        </div>
                        <div>
                          <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">displayName</div>
                          <input
                            value={nodeDraft.displayName}
                            onChange={(event) =>
                              setNodeDraft((prev) => ({ ...prev, displayName: event.target.value }))
                            }
                            className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
                            placeholder="Build Node - CI Windows 01"
                          />
                        </div>
                        <div>
                          <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">runnerLabel</div>
                          <input
                            value={nodeDraft.runnerLabel}
                            onChange={(event) =>
                              setNodeDraft((prev) => ({ ...prev, runnerLabel: event.target.value }))
                            }
                            className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
                            placeholder="pc-sebas"
                          />
                        </div>
                        <div>
                          <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">OS</div>
                          <select
                            value={nodeDraft.osName}
                            onChange={(event) =>
                              setNodeDraft((prev) => ({ ...prev, osName: event.target.value }))
                            }
                            className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
                          >
                            <option value="">Selecciona OS</option>
                            {nodeDraft.osName &&
                            !RUNNER_OS_OPTIONS.some((item) => item.value === nodeDraft.osName) ? (
                              <option value={nodeDraft.osName}>{nodeDraft.osName}</option>
                            ) : null}
                            {RUNNER_OS_OPTIONS.map((item) => (
                              <option key={item.value} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={handleSaveNode}
                          disabled={savingNode}
                          className="inline-flex items-center gap-1 rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs font-semibold text-[#5E30A5] disabled:opacity-60"
                        >
                          <ServerCog size={13} />
                          {savingNode ? "Procesando..." : "Actualizar"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingNodeKey("");
                            setNodeDraft(emptyNodeDraft());
                          }}
                          className="inline-flex items-center rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs font-semibold text-slate-600"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })
          ) : (
            <div className="rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-500">
              No hay nodos registrados.
            </div>
          )}
        </div>

        {message ? (
          <div className="mt-3 rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-600">
            {message}
          </div>
        ) : null}
        {error ? (
          <div className="mt-3 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">
            {error}
          </div>
        ) : null}
      </div>

      <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
        <div className="mb-2 text-sm font-semibold text-[#2F1A55]">Catálogo de builds</div>
        <div className="mb-2 text-xs text-slate-500">Build única por release para sync/deploy</div>
        {loading ? (
          <div className="rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-500">
            Cargando builds...
          </div>
        ) : (
          <Table
            columns={[
              { key: "release", label: "Release" },
              { key: "source", label: "Source" },
              { key: "heads", label: "Heads", align: "center" },
              { key: "run", label: "Run", align: "center" },
              { key: "action", label: "Sync local", align: "right" },
            ]}
          >
            {productArtifacts.map((row) => {
              const envHeads = Array.isArray(row.env_heads) ? row.env_heads : [];
              const releaseId = String(row.release_id || "");
              const semver = String(row.version_label || row.semver || "-");
              const actionId = `${releaseId}:${selectedNodeKey}`;
              const hardDisabled = syncingReleaseId === releaseId || !releaseId;
              const noNodeSelected = !selectedNodeKey;
              return (
                <tr key={row.id} className="hover:bg-[#FAF8FF]">
                  <td className="px-4 py-3 text-xs text-slate-700">
                    <div className="font-semibold">{semver}</div>
                    <div className="text-[11px] text-slate-500">{row.product_key} - {row.env_key}</div>
                    <div className="font-mono text-[11px] text-slate-500">{row.commit_sha || "-"}</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">
                    <div>{row.artifact_name || "-"}</div>
                    <div className="text-[11px] text-slate-500">{row.artifact_provider || "-"}</div>
                    <div className="text-[11px] text-slate-500">{formatDate(row.created_at)}</div>
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-slate-600">
                    {envHeads.length ? envHeads.join(" / ") : "-"}
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-slate-600">
                    {row.github_run_id ? `#${row.github_run_id}` : "-"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => {
                        if (noNodeSelected) {
                          setError("Selecciona nodo antes de sincronizar.");
                          return;
                        }
                        handleSyncRelease(releaseId, semver);
                      }}
                      disabled={hardDisabled}
                      className={`inline-flex items-center gap-1 rounded-lg border border-[#E9E2F7] bg-white px-2 py-1 text-[11px] font-semibold text-[#5E30A5] ${
                        hardDisabled || noNodeSelected ? "opacity-60" : ""
                      }`}
                      title={noNodeSelected ? "Selecciona nodo antes de sincronizar" : "Sync a PC"}
                    >
                      <HardDriveDownload size={12} />
                      {syncingReleaseId === releaseId && actionId ? "Encolando..." : "Sync a PC"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </Table>
        )}
      </div>

      {selectedNodeKey && inProgressSyncRows.length > 0 ? (
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
            <RefreshCw size={14} className="animate-spin text-[#5E30A5]" />
            Sincronizando
          </div>
          <div className="space-y-2">
            {inProgressSyncRows.slice(0, 20).map((row) => {
              const steps = inProgressStepStates(row.status);
              const rowRequestId = String(row.id || "");
              const isCancelling = cancellingSyncRequestId === rowRequestId;
              return (
                <div
                  key={row.id}
                  className="rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs font-semibold text-[#2F1A55]">
                      {row.version_label || "-"} - {row.product_key || "-"}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCancelSyncRequest(rowRequestId)}
                      disabled={!rowRequestId || isCancelling}
                      className="inline-flex items-center rounded-lg border border-[#E9E2F7] bg-white px-2 py-1 text-[11px] font-semibold text-red-600 disabled:opacity-60"
                    >
                      {isCancelling ? "Cancelando..." : "Cancelar"}
                    </button>
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">
                    {row.node_name || row.node_key || "-"} | {formatDate(row.created_at)}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-slate-600">
                    <span className="inline-flex items-center gap-1">
                      {renderProgressStepIcon(steps.queued)}
                      Encolado
                    </span>
                    <span className="inline-flex items-center gap-1">
                      {renderProgressStepIcon(steps.running)}
                      Ejecutando workflow
                    </span>
                    <span className="inline-flex items-center gap-1">
                      {renderProgressStepIcon(steps.finalize)}
                      Finalizando sync
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {selectedNodeKey ? (
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm font-semibold text-[#2F1A55]">Sincronizaciones locales</div>
            <div className="flex flex-wrap gap-2">
              {SYNC_STATUS_FILTERS.map((filter) => {
                const active = syncStatusFilter === filter.key;
                return (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() => setSyncStatusFilter(filter.key)}
                    className={`rounded-full px-2 py-1 text-[11px] font-semibold ${syncStatusBadgeClass(
                      filter.key
                    )} ${active ? "ring-1 ring-[#5E30A5]" : "opacity-80"}`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
          <Table
            columns={[
              { key: "release", label: "Release" },
              { key: "node", label: "Nodo" },
              { key: "status", label: "Estado", align: "center" },
              { key: "workflow", label: "Workflow", align: "center" },
              { key: "local", label: "Ruta local" },
            ]}
          >
            {filteredSyncRows.slice(0, 40).map((row) => (
              <tr key={row.id} className="hover:bg-[#FAF8FF]">
                <td className="px-4 py-3 text-xs text-slate-700">
                  <div className="font-semibold">{row.version_label || "-"}</div>
                  <div className="text-[11px] text-slate-500">{row.product_key} - {row.env_key || "-"}</div>
                  <div className="text-[11px] text-slate-500">{formatDate(row.created_at)}</div>
                </td>
                <td className="px-4 py-3 text-xs text-slate-600">
                  <div>{row.node_name || row.node_key || "-"}</div>
                  <div className="text-[11px] text-slate-500">{row.runner_label || "-"}</div>
                </td>
                <td className="px-4 py-3 text-center text-xs">
                  <span
                    className={`rounded-full px-2 py-1 text-[11px] font-semibold ${syncStatusBadgeClass(
                      normalizeHistorySyncStatus(row.status)
                    )}`}
                  >
                    {normalizeHistorySyncStatus(row.status) || "-"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-xs text-slate-600">
                  {row.workflow_run_url ? (
                    <a
                      href={row.workflow_run_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-semibold text-[#5E30A5] underline"
                    >
                      Ver
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-slate-500">{row.local_path || row.error_detail || "-"}</td>
              </tr>
            ))}
          </Table>
          {filteredSyncRows.length === 0 ? (
            <div className="mt-3 rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-500">
              No hay sincronizaciones para este nodo y filtro.
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
