import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowRightLeft,
  CheckCircle2,
  GitCompare,
  RefreshCw,
  Rocket,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import Table from "../../components/ui/Table";
import {
  approveDeployRequest,
  createDevRelease,
  fetchDeployRequests,
  fetchDrift,
  fetchLatestReleases,
  fetchPromotionHistory,
  fetchReleasesByProductEnv,
  fetchVersioningCatalog,
  promoteRelease,
  rejectDeployRequest,
  requestDeploy,
  triggerDeployPipeline,
} from "./services/versioningService";

const ENV_OPTIONS = ["dev", "staging", "prod"];
const DEPLOY_ENV_OPTIONS = ["staging", "prod"];
const DEPLOYABLE_PRODUCTS = ["referidos_app", "prelaunch_web"];

function normalizeProductLabel(product) {
  const key = String(product?.product_key || "").toLowerCase();
  if (key === "referidos_app") return "REFERIDOS PWA";
  if (key === "prelaunch_web") return "PRELAUNCH WEB";
  if (key === "android_app") return "ANDROID APP";
  if (key === "app") return "APP";
  return String(product?.name || key || "APP").toUpperCase();
}

function normalizeEnvLabel(envKey) {
  const key = String(envKey || "").toLowerCase();
  if (key === "prod") return "PRODUCTION";
  if (key === "staging") return "STAGING";
  if (key === "dev") return "DEVELOPMENT";
  return String(envKey || "-").toUpperCase();
}

function normalizeReleaseStatus(envKey, status) {
  const normalizedEnv = String(envKey || "").toLowerCase();
  const normalizedStatus = String(status || "").toLowerCase();
  if (!normalizedStatus) return "-";

  if (normalizedEnv !== "dev") return normalizedStatus;

  if (normalizedStatus === "deployed") return "promoted";
  if (normalizedStatus === "approved" || normalizedStatus === "validated") return "released";
  if (normalizedStatus === "draft" || normalizedStatus === "sin release") return "pending";
  if (normalizedStatus === "rolled_back") return "failed";
  return normalizedStatus;
}

function VersionCard({ row, onRelease, releaseLoading = false, releaseMessage = "" }) {
  const isDevelopment = String(row?.env_key || "").toLowerCase() === "dev";
  const canRelease = isDevelopment && typeof onRelease === "function";
  const statusLabel = normalizeReleaseStatus(row?.env_key, row?.status);

  return (
    <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="text-xs uppercase tracking-[0.1em] text-slate-400">
          {normalizeEnvLabel(row.env_key)}
        </div>
        {canRelease ? (
          <button
            type="button"
            onClick={onRelease}
            disabled={releaseLoading}
            className="inline-flex items-center rounded-lg border border-[#E9E2F7] px-2 py-1 text-[11px] font-semibold text-[#5E30A5] disabled:opacity-60"
          >
            {releaseLoading ? "Creando..." : "Relase"}
          </button>
        ) : null}
      </div>
      <div className="mt-2 text-2xl font-extrabold text-[#2F1A55]">{row.version_label}</div>
      <div className="mt-2 text-xs text-slate-500">Estado: {statusLabel}</div>
      <div className="text-xs text-slate-500">Commit: {row.source_commit_sha || "-"}</div>
      {isDevelopment && releaseMessage ? (
        <div className="mt-2 rounded-lg border border-[#E9E2F7] bg-[#FAF8FF] px-2 py-1 text-[11px] text-slate-600">
          {releaseMessage}
        </div>
      ) : null}
    </div>
  );
}

function statusBadgeClass(status) {
  if (status === "pending") return "bg-amber-100 text-amber-700";
  if (status === "approved") return "bg-indigo-100 text-indigo-700";
  if (status === "executed") return "bg-emerald-100 text-emerald-700";
  if (status === "failed") return "bg-red-100 text-red-700";
  if (status === "rejected") return "bg-slate-200 text-slate-700";
  return "bg-slate-100 text-slate-600";
}

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString("es-EC");
}

export default function VersioningOverviewPanel() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [catalog, setCatalog] = useState({ products: [], environments: [] });
  const [activeProductKey, setActiveProductKey] = useState("");
  const [latestReleases, setLatestReleases] = useState([]);
  const [driftFrom, setDriftFrom] = useState("staging");
  const [driftTo, setDriftTo] = useState("prod");
  const [driftRows, setDriftRows] = useState([]);
  const [deployRequests, setDeployRequests] = useState([]);
  const [promotionHistory, setPromotionHistory] = useState([]);
  const [releaseOpsMode, setReleaseOpsMode] = useState("promote");
  const [creatingDevRelease, setCreatingDevRelease] = useState(false);
  const [devReleaseMessage, setDevReleaseMessage] = useState("");

  const [promoteForm, setPromoteForm] = useState({
    productKey: "",
    fromEnv: "staging",
    toEnv: "prod",
    semver: "",
    notes: "",
  });
  const [promoteOptions, setPromoteOptions] = useState([]);
  const [promoting, setPromoting] = useState(false);
  const [promoteMessage, setPromoteMessage] = useState("");

  const [deployForm, setDeployForm] = useState({
    productKey: "",
    envKey: "staging",
    semver: "",
    notes: "",
  });
  const [deployOptions, setDeployOptions] = useState([]);
  const [deployingActionId, setDeployingActionId] = useState("");
  const [deployMessage, setDeployMessage] = useState("");
  const [activeDeployRequestId, setActiveDeployRequestId] = useState("");
  const [deploySyncRequired, setDeploySyncRequired] = useState(null);
  const [approvalMessage, setApprovalMessage] = useState("");

  const load = useCallback(
    async (manual = false) => {
      if (manual) setRefreshing(true);
      else setLoading(true);
      setError("");
      try {
        const [dataCatalog, dataLatest, requests] = await Promise.all([
          fetchVersioningCatalog(),
          fetchLatestReleases(),
          fetchDeployRequests(),
        ]);

        setCatalog(dataCatalog);
        setLatestReleases(dataLatest);
        setDeployRequests(requests);

        const firstProduct = dataCatalog.products?.[0]?.product_key || "";
        const selectedProduct = activeProductKey || firstProduct;
        setActiveProductKey(selectedProduct);
        const selectedProductMeta =
          dataCatalog.products?.find((product) => product.product_key === selectedProduct) || null;
        if (selectedProduct) {
          const [drift, promotions] = await Promise.all([
            fetchDrift(selectedProduct, driftFrom, driftTo),
            selectedProductMeta?.id
              ? fetchPromotionHistory({
                  productId: selectedProductMeta.id,
                  limit: 50,
                })
              : Promise.resolve([]),
          ]);
          setDriftRows(drift);
          setPromotionHistory(promotions);
        } else {
          setDriftRows([]);
          setPromotionHistory([]);
        }

        if (!promoteForm.productKey && firstProduct) {
          setPromoteForm((prev) => ({ ...prev, productKey: firstProduct }));
        }
        if (!deployForm.productKey && firstProduct) {
          setDeployForm((prev) => ({ ...prev, productKey: firstProduct }));
        }
      } catch (err) {
        setError(err?.message || "No se pudo cargar versionado.");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [activeProductKey, deployForm.productKey, driftFrom, driftTo, promoteForm.productKey]
  );

  useEffect(() => {
    load(false);
  }, [load]);

  useEffect(() => {
    if (!activeProductKey) return;
    setPromoteForm((prev) =>
      prev.productKey === activeProductKey
        ? prev
        : { ...prev, productKey: activeProductKey, semver: "" }
    );
    setDeployForm((prev) =>
      prev.productKey === activeProductKey
        ? prev
        : { ...prev, productKey: activeProductKey, semver: "" }
    );
  }, [activeProductKey]);

  useEffect(() => {
    const loadPromoteReleases = async () => {
      if (!promoteForm.productKey || !promoteForm.fromEnv) {
        setPromoteOptions([]);
        return;
      }
      try {
        const releases = await fetchReleasesByProductEnv(
          promoteForm.productKey,
          promoteForm.fromEnv
        );
        const unique = [];
        const seen = new Set();
        for (const row of releases) {
          if (seen.has(row.version_label)) continue;
          seen.add(row.version_label);
          unique.push(row.version_label);
        }
        setPromoteOptions(unique);
        if (!promoteForm.semver && unique[0]) {
          setPromoteForm((prev) => ({ ...prev, semver: unique[0] }));
        }
      } catch {
        setPromoteOptions([]);
      }
    };
    loadPromoteReleases();
  }, [promoteForm.fromEnv, promoteForm.productKey, promoteForm.semver]);

  useEffect(() => {
    const loadDeployReleases = async () => {
      if (!deployForm.productKey || !deployForm.envKey) {
        setDeployOptions([]);
        return;
      }
      try {
        const releases = await fetchReleasesByProductEnv(deployForm.productKey, deployForm.envKey);
        const unique = [];
        const seen = new Set();
        for (const row of releases) {
          if (seen.has(row.version_label)) continue;
          seen.add(row.version_label);
          unique.push(row.version_label);
        }
        setDeployOptions(unique);
        if (!deployForm.semver && unique[0]) {
          setDeployForm((prev) => ({ ...prev, semver: unique[0] }));
        }
      } catch {
        setDeployOptions([]);
      }
    };
    loadDeployReleases();
  }, [deployForm.envKey, deployForm.productKey, deployForm.semver]);

  useEffect(() => {
    setActiveDeployRequestId("");
    setDeploySyncRequired(null);
    setDeployMessage("");
  }, [deployForm.productKey, deployForm.envKey, deployForm.semver]);

  const driftSummary = useMemo(() => {
    const total = driftRows.length;
    const differs = driftRows.filter((row) => row.differs).length;
    return { total, differs };
  }, [driftRows]);

  const pendingDeployCount = useMemo(
    () => deployRequests.filter((row) => row.product_key === activeProductKey && row.status === "pending").length,
    [deployRequests, activeProductKey]
  );

  const approvedDeployCount = useMemo(
    () => deployRequests.filter((row) => row.product_key === activeProductKey && row.status === "approved").length,
    [deployRequests, activeProductKey]
  );

  const executedDeployCount = useMemo(
    () => deployRequests.filter((row) => row.product_key === activeProductKey && row.status === "executed").length,
    [deployRequests, activeProductKey]
  );

  const sortedDeployRequests = useMemo(() => {
    const rank = {
      pending: 0,
      approved: 1,
      executed: 2,
      failed: 3,
      rejected: 4,
    };
    return deployRequests
      .filter((row) => row.product_key === activeProductKey)
      .slice()
      .sort((a, b) => {
        const rankA = rank[a.status] ?? 99;
        const rankB = rank[b.status] ?? 99;
        if (rankA !== rankB) return rankA - rankB;
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      });
  }, [deployRequests, activeProductKey]);

  const selectedProduct = useMemo(
    () => catalog.products.find((product) => product.product_key === activeProductKey) || null,
    [catalog.products, activeProductKey]
  );

  const selectedProductLabel = useMemo(
    () => normalizeProductLabel(selectedProduct),
    [selectedProduct]
  );

  const envCards = useMemo(() => {
    const rowsByEnv = new Map(
      latestReleases
        .filter((row) => row.product_key === activeProductKey)
        .map((row) => [row.env_key, row])
    );

    return ENV_OPTIONS.map((envKey) => {
      const row = rowsByEnv.get(envKey);
      if (row) return row;
      return {
        product_key: activeProductKey,
        env_key: envKey,
        version_label: "-",
        status: "sin release",
        source_commit_sha: "",
      };
    });
  }, [activeProductKey, latestReleases]);

  const handlePromote = async () => {
    setPromoteMessage("");
    if (!promoteForm.productKey || !promoteForm.semver) {
      setPromoteMessage("Selecciona producto y version.");
      return;
    }
    setPromoting(true);
    try {
      await promoteRelease({
        productKey: promoteForm.productKey,
        fromEnv: promoteForm.fromEnv,
        toEnv: promoteForm.toEnv,
        semver: promoteForm.semver,
        notes: promoteForm.notes,
      });
      setPromoteMessage("Promocion registrada correctamente.");
      await load(true);
    } catch (err) {
      setPromoteMessage(err?.message || "No se pudo promover la release.");
    } finally {
      setPromoting(false);
    }
  };

  const handleCreateDeployRequest = async () => {
    setDeployMessage("");
    if (!deployForm.productKey || !deployForm.envKey || !deployForm.semver) {
      setDeployMessage("Selecciona app, entorno y version para ejecutar deploy.");
      return;
    }
    if (!DEPLOYABLE_PRODUCTS.includes(deployForm.productKey)) {
      setDeployMessage(
        "Deploy por artifact exacto disponible solo para REFERIDOS PWA y PRELAUNCH WEB."
      );
      return;
    }
    if (!DEPLOY_ENV_OPTIONS.includes(deployForm.envKey)) {
      setDeployMessage("Deploy solo permitido en staging o prod.");
      return;
    }

    setDeployingActionId("deploy-admin");
    let normalizedRequestId = activeDeployRequestId || "";
    try {
      if (!normalizedRequestId) {
        const existingRequest = deployRequests.find(
          (row) =>
            row.product_key === deployForm.productKey &&
            row.env_key === deployForm.envKey &&
            row.version_label === deployForm.semver &&
            ["pending", "approved"].includes(row.status)
        );

        if (existingRequest?.id) {
          normalizedRequestId = existingRequest.id;
        } else {
          const requestId = await requestDeploy({
            productKey: deployForm.productKey,
            envKey: deployForm.envKey,
            semver: deployForm.semver,
            actor: "admin-ui-direct",
            notes: deployForm.notes,
            metadata: {
              trigger: "admin_direct_panel",
              mode: "direct_deploy",
            },
          });
          normalizedRequestId =
            typeof requestId === "string"
              ? requestId
              : requestId?.request_id || requestId?.id || "";
        }
      }

      if (!normalizedRequestId) {
        throw new Error("No se pudo resolver request_id para ejecutar deploy.");
      }

      setActiveDeployRequestId(normalizedRequestId);

      const result = await triggerDeployPipeline({
        requestId: normalizedRequestId,
        forceAdminOverride: true,
        syncRelease: false,
        syncOnly: false,
      });
      setDeploySyncRequired(null);
      setActiveDeployRequestId("");
      setDeployMessage(
        `Deploy como admin ejecutado. deployment_id=${result?.deployment_id || "-"}`
      );
      await load(true);
    } catch (err) {
      if (err?.code === "release_sync_required") {
        setDeploySyncRequired(err?.payload || null);
        setDeployMessage(
          err?.message ||
            "Este release aun no esta en la rama destino. Debes subir release antes de desplegar."
        );
        await load(true);
      } else {
        setDeployMessage(err?.message || "No se pudo ejecutar deploy como admin.");
      }
    } finally {
      setDeployingActionId("");
    }
  };

  const handleSyncRelease = async () => {
    const requestId = deploySyncRequired?.request_id || activeDeployRequestId;
    if (!requestId) {
      setDeployMessage("No se encontro solicitud de deploy para subir release.");
      return;
    }

    const confirmed = window.confirm(
      "El release aun no esta en la rama destino. Deseas subir release ahora?"
    );
    if (!confirmed) return;

    setDeployingActionId("sync-release");
    try {
      const result = await triggerDeployPipeline({
        requestId,
        forceAdminOverride: true,
        syncRelease: true,
        syncOnly: true,
      });
      setDeploySyncRequired(null);
      setDeployMessage(
        `Release subido correctamente a ${result?.branches?.target || "rama destino"}. Ahora puedes hacer deploy.`
      );
      await load(true);
    } catch (err) {
      setDeployMessage(err?.message || "No se pudo subir release a la rama destino.");
    } finally {
      setDeployingActionId("");
    }
  };

  const handleCreateDevRelease = async () => {
    setDevReleaseMessage("");
    if (!activeProductKey) {
      setDevReleaseMessage("Selecciona una app para crear release de development.");
      return;
    }

    setCreatingDevRelease(true);
    try {
      const result = await createDevRelease({
        productKey: activeProductKey,
        ref: "dev",
      });
      setDevReleaseMessage(
        `Release de DEVELOPMENT en cola. workflow=${result?.workflow || "-"} ref=${result?.ref || "dev"}`
      );
    } catch (err) {
      setDevReleaseMessage(err?.message || "No se pudo crear release de development.");
    } finally {
      setCreatingDevRelease(false);
    }
  };

  const handleApproveRequest = async (requestId, forceAdminOverride = false) => {
    setApprovalMessage("");
    setDeployingActionId(`approve-${requestId}`);
    try {
      await approveDeployRequest({
        requestId,
        forceAdminOverride,
      });
      setApprovalMessage(
        forceAdminOverride
          ? "Solicitud aprobada con admin override."
          : "Solicitud aprobada correctamente."
      );
      await load(true);
    } catch (err) {
      setDeployMessage(err?.message || "No se pudo aprobar la solicitud.");
    } finally {
      setDeployingActionId("");
    }
  };

  const handleRejectRequest = async (requestId) => {
    const reason = window.prompt("Motivo del rechazo (opcional):", "") || "";
    setApprovalMessage("");
    setDeployingActionId(`reject-${requestId}`);
    try {
      await rejectDeployRequest({
        requestId,
        reason,
      });
      setApprovalMessage("Solicitud rechazada.");
      await load(true);
    } catch (err) {
      setApprovalMessage(err?.message || "No se pudo rechazar la solicitud.");
    } finally {
      setDeployingActionId("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {catalog.products.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={async () => {
                const nextProductKey = product.product_key;
                setActiveProductKey(nextProductKey);
                try {
                  const [drift, promotions] = await Promise.all([
                    fetchDrift(nextProductKey, driftFrom, driftTo),
                    fetchPromotionHistory({
                      productId: product.id,
                      limit: 50,
                    }),
                  ]);
                  setDriftRows(drift);
                  setPromotionHistory(promotions);
                } catch (err) {
                  setError(err?.message || "No se pudo cargar drift para la app seleccionada.");
                }
              }}
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                activeProductKey === product.product_key
                  ? "border-[#2F1A55] bg-[#2F1A55] text-white"
                  : "border-[#E9E2F7] bg-white text-[#2F1A55]"
              }`}
            >
              {normalizeProductLabel(product)}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => load(true)}
          disabled={loading || refreshing}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#E9E2F7] text-[#5E30A5] disabled:opacity-60"
          title="Refrescar"
        >
          <RefreshCw size={14} className={loading || refreshing ? "animate-spin" : ""} />
        </button>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="rounded-2xl border border-[#E9E2F7] bg-white px-4 py-6 text-sm text-slate-500">
          Cargando versionado...
        </div>
      ) : (
        <>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-lg font-semibold text-[#2F1A55]">
              <Activity size={15} />
              Releases actuales
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {envCards.map((row) => (
                <VersionCard
                  key={`${row.product_key}-${row.env_key}`}
                  row={row}
                  onRelease={row.env_key === "dev" ? handleCreateDevRelease : null}
                  releaseLoading={row.env_key === "dev" ? creatingDevRelease : false}
                  releaseMessage={row.env_key === "dev" ? devReleaseMessage : ""}
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
                <ShieldCheck size={15} />
                Approval gate
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-amber-100 px-2 py-1 text-amber-700">
                  Pending: {pendingDeployCount}
                </span>
                <span className="rounded-full bg-indigo-100 px-2 py-1 text-indigo-700">
                  Approved: {approvedDeployCount}
                </span>
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">
                  Executed: {executedDeployCount}
                </span>
              </div>
            </div>
            <div className="text-xs text-slate-500">
              Pendientes arriba. Este bloque incluye historial de deploy para la app seleccionada.
            </div>
            {approvalMessage ? (
              <div className="rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-600">
                {approvalMessage}
              </div>
            ) : null}

            <Table
              className="mt-1"
              columns={[
                { key: "version", label: "Release" },
                { key: "status", label: "Estado", align: "center" },
                { key: "requester", label: "Solicitante" },
                { key: "approved", label: "Aprobacion" },
                { key: "deploy", label: "Deploy" },
                { key: "actions", label: "Acciones", align: "right" },
              ]}
            >
              {sortedDeployRequests.slice(0, 25).map((row) => (
                <tr key={row.id} className="hover:bg-[#FAF8FF]">
                  <td className="px-4 py-3">
                    <div className="text-xs font-semibold text-slate-700">
                      {row.product_key} / {row.env_key} / {row.version_label}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Creado: {formatDate(row.created_at)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${statusBadgeClass(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">
                    <div>{row.requested_by || "-"}</div>
                    {row.notes ? (
                      <div className="mt-1 max-w-[260px] truncate text-[11px] text-slate-500">
                        {row.notes}
                      </div>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">
                    <div>{row.approved_by || "-"}</div>
                    <div className="text-[11px] text-slate-500">
                      {row.approved_at ? formatDate(row.approved_at) : "-"}
                    </div>
                    {row.admin_override ? (
                      <div className="mt-1 inline-flex rounded-full bg-slate-200 px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] text-slate-700">
                        admin override
                      </div>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">
                    <div>Status deploy: {row.deployment_status || "-"}</div>
                    <div>ID: {row.deployment_id || "-"}</div>
                    <div className="text-[11px] text-slate-500">
                      Ejecutado: {row.executed_at ? formatDate(row.executed_at) : "-"}
                    </div>
                    {row.logs_url ? (
                      <a
                        href={row.logs_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-semibold text-[#5E30A5] underline"
                      >
                        Ver logs
                      </a>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap justify-end gap-2">
                      {row.status === "pending" ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleApproveRequest(row.id, false)}
                            disabled={deployingActionId === `approve-${row.id}`}
                            className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700 disabled:opacity-60"
                          >
                            <CheckCircle2 size={12} />
                            Aprobar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRejectRequest(row.id)}
                            disabled={deployingActionId === `reject-${row.id}`}
                            className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-[11px] font-semibold text-red-700 disabled:opacity-60"
                          >
                            <XCircle size={12} />
                            Rechazar
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-slate-400">-</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </Table>
          </div>

          <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <ArrowRightLeft size={15} />
                <button
                  type="button"
                  onClick={() => setReleaseOpsMode("promote")}
                  className={`text-sm font-semibold ${
                    releaseOpsMode === "promote" ? "text-[#2F1A55]" : "text-slate-300"
                  }`}
                >
                  Promocionar release
                </button>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={() => setReleaseOpsMode("deploy")}
                  className={`text-sm font-semibold ${
                    releaseOpsMode === "deploy" ? "text-[#2F1A55]" : "text-slate-300"
                  }`}
                >
                  Deploy
                </button>
              </div>
            </div>

            {releaseOpsMode === "promote" ? (
              <>
                <div className="grid gap-2 sm:grid-cols-4">
                  <div className="rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs font-semibold text-[#5E30A5]">
                    {selectedProductLabel}
                  </div>
                  <select
                    value={promoteForm.fromEnv}
                    onChange={(event) =>
                      setPromoteForm((prev) => ({ ...prev, fromEnv: event.target.value, semver: "" }))
                    }
                    className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
                  >
                    <option value="dev">dev</option>
                    <option value="staging">staging</option>
                  </select>
                  <select
                    value={promoteForm.toEnv}
                    onChange={(event) =>
                      setPromoteForm((prev) => ({ ...prev, toEnv: event.target.value }))
                    }
                    className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
                  >
                    <option value="staging">staging</option>
                    <option value="prod">prod</option>
                  </select>
                  <select
                    value={promoteForm.semver}
                    onChange={(event) =>
                      setPromoteForm((prev) => ({ ...prev, semver: event.target.value }))
                    }
                    className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
                  >
                    <option value="">Selecciona version</option>
                    {promoteOptions.map((version) => (
                      <option key={`semver-${version}`} value={version}>
                        {version}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  value={promoteForm.notes}
                  onChange={(event) =>
                    setPromoteForm((prev) => ({ ...prev, notes: event.target.value }))
                  }
                  className="min-h-[84px] w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#5E30A5] resize-none"
                  placeholder="Notas de promocion"
                />
                <button
                  type="button"
                  onClick={handlePromote}
                  disabled={promoting}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#5E30A5] px-3 py-2 text-xs font-semibold text-white disabled:opacity-60"
                >
                  <Rocket size={14} />
                  {promoting ? "Promoviendo..." : "Promover release"}
                </button>
                {promoteMessage ? (
                  <div className="rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-600">
                    {promoteMessage}
                  </div>
                ) : null}
              </>
            ) : (
              <>
                <div className="grid gap-2 sm:grid-cols-3">
                  <div className="rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs font-semibold text-[#5E30A5]">
                    {selectedProductLabel}
                  </div>
                  <select
                    value={deployForm.envKey}
                    onChange={(event) =>
                      setDeployForm((prev) => ({ ...prev, envKey: event.target.value, semver: "" }))
                    }
                    className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
                  >
                    {DEPLOY_ENV_OPTIONS.map((env) => (
                      <option key={`deploy-env-${env}`} value={env}>
                        {env}
                      </option>
                    ))}
                  </select>
                  <select
                    value={deployForm.semver}
                    onChange={(event) =>
                      setDeployForm((prev) => ({ ...prev, semver: event.target.value }))
                    }
                    className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
                  >
                    <option value="">Selecciona version</option>
                    {deployOptions.map((version) => (
                      <option key={`deploy-semver-${version}`} value={version}>
                        {version}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  value={deployForm.notes}
                  onChange={(event) =>
                    setDeployForm((prev) => ({ ...prev, notes: event.target.value }))
                  }
                  className="min-h-[84px] w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#5E30A5] resize-none"
                  placeholder="Notas de deploy directo como admin"
                />
                <button
                  type="button"
                  onClick={handleCreateDeployRequest}
                  disabled={deployingActionId === "deploy-admin"}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#5E30A5] px-3 py-2 text-xs font-semibold text-white disabled:opacity-60"
                >
                  <Rocket size={14} />
                  {deployingActionId === "deploy-admin" ? "Ejecutando..." : "Deploy como admin"}
                </button>
                {deploySyncRequired ? (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                    <div className="font-semibold">
                      El release aun no esta en la rama destino.
                    </div>
                    <div className="mt-1">
                      Commit: {deploySyncRequired?.source_commit_sha || "-"}
                    </div>
                    <div>
                      Rama origen: {deploySyncRequired?.branches?.source || "-"} | Rama destino:{" "}
                      {deploySyncRequired?.branches?.target || "-"}
                    </div>
                    <button
                      type="button"
                      onClick={handleSyncRelease}
                      disabled={deployingActionId === "sync-release"}
                      className="mt-2 inline-flex items-center gap-2 rounded-lg border border-amber-300 bg-white px-2 py-1 text-[11px] font-semibold text-amber-800 disabled:opacity-60"
                    >
                      {deployingActionId === "sync-release" ? "Subiendo..." : "Subir release"}
                    </button>
                  </div>
                ) : null}
                {deployMessage ? (
                  <div className="rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-600">
                    {deployMessage}
                  </div>
                ) : null}
              </>
            )}
          </div>

          <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
              <ArrowRightLeft size={15} />
              Historial de promociones
            </div>
            <Table
              columns={[
                { key: "created", label: "Fecha" },
                { key: "from", label: "Desde" },
                { key: "to", label: "Hacia" },
                { key: "actor", label: "Actor" },
                { key: "notes", label: "Notas" },
              ]}
            >
              {promotionHistory.slice(0, 25).map((row) => (
                <tr key={row.id} className="hover:bg-[#FAF8FF]">
                  <td className="px-4 py-3 text-xs text-slate-600">{formatDate(row.created_at)}</td>
                  <td className="px-4 py-3 text-xs text-slate-700">
                    {(row.from_env_key || "-").toUpperCase()} / {row.from_version_label || "-"}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-700">
                    {(row.to_env_key || "-").toUpperCase()} / {row.to_version_label || "-"}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">{row.promoted_by || "-"}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{row.notes || "-"}</td>
                </tr>
              ))}
            </Table>
            {promotionHistory.length === 0 ? (
              <div className="rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-600">
                No hay promociones registradas para esta app.
              </div>
            ) : null}
          </div>

          <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
              <GitCompare size={15} />
              Drift de versiones
            </div>
            <div className="grid gap-2 sm:grid-cols-4">
              <div className="rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs font-semibold text-[#5E30A5]">
                {selectedProductLabel}
              </div>
              <select
                value={driftFrom}
                onChange={(event) => setDriftFrom(event.target.value)}
                className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
              >
                {ENV_OPTIONS.map((env) => (
                  <option key={`from-${env}`} value={env}>
                    {env}
                  </option>
                ))}
              </select>
              <select
                value={driftTo}
                onChange={(event) => setDriftTo(event.target.value)}
                className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
              >
                {ENV_OPTIONS.map((env) => (
                  <option key={`to-${env}`} value={env}>
                    {env}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={async () => {
                  if (!activeProductKey) return;
                  try {
                    const rows = await fetchDrift(activeProductKey, driftFrom, driftTo);
                    setDriftRows(rows);
                  } catch (err) {
                    setError(err?.message || "No se pudo comparar drift.");
                  }
                }}
                className="w-40 rounded-xl border border-[#C7B8E8] px-3 py-2 text-xs font-semibold text-[#5E30A5] sm:justify-self-end sm:ml-2"
              >
                Comparar drift
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-600">
                Componentes: <strong>{driftSummary.total}</strong>
              </div>
              <div className="rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-600">
                Diferencias: <strong>{driftSummary.differs}</strong>
              </div>
            </div>
            <Table
              columns={[
                { key: "component", label: "Componente" },
                { key: "from", label: driftFrom, align: "right" },
                { key: "to", label: driftTo, align: "right" },
                { key: "state", label: "Estado", align: "center" },
              ]}
            >
              {driftRows.slice(0, 20).map((row) => (
                <tr key={row.component_key} className="hover:bg-[#FAF8FF]">
                  <td className="px-4 py-3 text-xs text-slate-700">{row.component_key}</td>
                  <td className="px-4 py-3 text-right text-xs text-slate-600">
                    {row.revision_a ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-right text-xs text-slate-600">
                    {row.revision_b ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-center text-xs">
                    {row.differs ? (
                      <span className="rounded-full bg-amber-100 px-2 py-1 text-amber-700">
                        Drift
                      </span>
                    ) : (
                      <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">
                        Igual
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </Table>
          </div>
        </>
      )}
    </div>
  );
}
