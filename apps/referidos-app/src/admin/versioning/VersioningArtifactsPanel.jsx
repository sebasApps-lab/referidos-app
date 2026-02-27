import React, { useCallback, useEffect, useMemo, useState } from "react";
import { HardDriveDownload, RefreshCw, ServerCog } from "lucide-react";
import Table from "../../components/ui/Table";
import {
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

export default function VersioningArtifactsPanel({ activeProductKey = "", selectedProductLabel = "" }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [artifacts, setArtifacts] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [syncRows, setSyncRows] = useState([]);
  const [selectedNodeKey, setSelectedNodeKey] = useState("");
  const [syncingReleaseId, setSyncingReleaseId] = useState("");
  const [savingNode, setSavingNode] = useState(false);
  const [nodeDraft, setNodeDraft] = useState({
    nodeKey: "",
    displayName: "",
    runnerLabel: "",
    osName: "",
  });

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
        if (!selectedNodeKey && nextNodes.length > 0) {
          setSelectedNodeKey(String(nextNodes[0].node_key || ""));
        }
      } catch (err) {
        setError(err?.message || "No se pudo cargar catálogo de builds.");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [activeProductKey, selectedNodeKey]
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
        active: true,
      });
      setMessage(`Nodo local guardado: ${nodeKey}`);
      setNodeDraft({ nodeKey: "", displayName: "", runnerLabel: "", osName: "" });
      await loadData(true);
      if (!selectedNodeKey) setSelectedNodeKey(nodeKey);
    } catch (err) {
      setError(err?.message || "No se pudo guardar nodo local.");
    } finally {
      setSavingNode(false);
    }
  }, [loadData, nodeDraft, selectedNodeKey]);

  const handleSyncRelease = useCallback(
    async (releaseId, semver) => {
      if (!selectedNodeKey) {
        setError("Selecciona un nodo local para sincronizar.");
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

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-[#2F1A55]">Catálogo de builds</div>
            <div className="text-xs text-slate-500">
              {selectedProductLabel || "Producto"} · Build única por release para sync/deploy
            </div>
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

        <div className="mt-3 grid gap-2 md:grid-cols-4">
          <div>
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Nodo</div>
            <select
              value={selectedNodeKey}
              onChange={(event) => setSelectedNodeKey(event.target.value)}
              className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
            >
              <option value="">Selecciona nodo local</option>
              {nodes.map((node) => (
                <option key={node.id} value={node.node_key}>
                  {node.display_name} ({node.runner_label})
                </option>
              ))}
            </select>
          </div>
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
              placeholder="Laptop Sebas"
            />
          </div>
          <div>
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">runnerLabel</div>
            <div className="flex gap-2">
              <input
                value={nodeDraft.runnerLabel}
                onChange={(event) => setNodeDraft((prev) => ({ ...prev, runnerLabel: event.target.value }))}
                className="w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
                placeholder="pc-sebas"
              />
              <button
                type="button"
                onClick={handleSaveNode}
                disabled={savingNode}
                className="inline-flex items-center gap-1 rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs font-semibold text-[#5E30A5] disabled:opacity-60"
              >
                <ServerCog size={13} />
                {savingNode ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
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
        <div className="mb-2 text-sm font-semibold text-[#2F1A55]">Builds registradas</div>
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
              return (
                <tr key={row.id} className="hover:bg-[#FAF8FF]">
                  <td className="px-4 py-3 text-xs text-slate-700">
                    <div className="font-semibold">{semver}</div>
                    <div className="text-[11px] text-slate-500">{row.product_key} · {row.env_key}</div>
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
                      onClick={() => handleSyncRelease(releaseId, semver)}
                      disabled={!selectedNodeKey || syncingReleaseId === releaseId || !releaseId}
                      className="inline-flex items-center gap-1 rounded-lg border border-[#E9E2F7] bg-white px-2 py-1 text-[11px] font-semibold text-[#5E30A5] disabled:opacity-60"
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

      <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
        <div className="mb-2 text-sm font-semibold text-[#2F1A55]">Sincronizaciones locales</div>
        <Table
          columns={[
            { key: "release", label: "Release" },
            { key: "node", label: "Nodo" },
            { key: "status", label: "Estado", align: "center" },
            { key: "workflow", label: "Workflow", align: "center" },
            { key: "local", label: "Ruta local" },
          ]}
        >
          {(syncRows || []).slice(0, 40).map((row) => (
            <tr key={row.id} className="hover:bg-[#FAF8FF]">
              <td className="px-4 py-3 text-xs text-slate-700">
                <div className="font-semibold">{row.version_label || "-"}</div>
                <div className="text-[11px] text-slate-500">{row.product_key} · {row.env_key || "-"}</div>
                <div className="text-[11px] text-slate-500">{formatDate(row.created_at)}</div>
              </td>
              <td className="px-4 py-3 text-xs text-slate-600">
                <div>{row.node_name || row.node_key || "-"}</div>
                <div className="text-[11px] text-slate-500">{row.runner_label || "-"}</div>
              </td>
              <td className="px-4 py-3 text-center text-xs">
                <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${syncStatusBadgeClass(row.status)}`}>
                  {row.status || "-"}
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
      </div>
    </div>
  );
}
