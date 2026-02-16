import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowRightLeft,
  CheckCircle2,
  GitCompare,
  RefreshCw,
  Rocket,
  Send,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import Table from "../../components/ui/Table";
import {
  approveDeployRequest,
  executeDeployRequest,
  fetchDeployRequests,
  fetchDrift,
  fetchLatestReleases,
  fetchReleasesByProductEnv,
  fetchVersioningCatalog,
  promoteRelease,
  rejectDeployRequest,
  requestDeploy,
  triggerDeployPipeline,
} from "./services/versioningService";

const ENV_OPTIONS = ["dev", "staging", "prod"];
const DEPLOY_ENV_OPTIONS = ["staging", "prod"];

function VersionCard({ row }) {
  return (
    <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
      <div className="text-xs uppercase tracking-[0.1em] text-slate-400">{row.product_name}</div>
      <div className="mt-2 text-2xl font-extrabold text-[#2F1A55]">{row.version_label}</div>
      <div className="mt-2 text-xs text-slate-500">Estado: {row.status}</div>
      <div className="text-xs text-slate-500">Commit: {row.source_commit_sha || "-"}</div>
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
  const [activeEnv, setActiveEnv] = useState("prod");
  const [latestReleases, setLatestReleases] = useState([]);
  const [driftFrom, setDriftFrom] = useState("staging");
  const [driftTo, setDriftTo] = useState("prod");
  const [driftProduct, setDriftProduct] = useState("");
  const [driftRows, setDriftRows] = useState([]);
  const [deployRequests, setDeployRequests] = useState([]);

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

  const load = useCallback(
    async (manual = false) => {
      if (manual) setRefreshing(true);
      else setLoading(true);
      setError("");
      try {
        const [dataCatalog, dataLatest, requests] = await Promise.all([
          fetchVersioningCatalog(),
          fetchLatestReleases(activeEnv),
          fetchDeployRequests(),
        ]);

        setCatalog(dataCatalog);
        setLatestReleases(dataLatest);
        setDeployRequests(requests);

        const firstProduct = dataCatalog.products?.[0]?.product_key || "";
        const selectedProduct = driftProduct || firstProduct;
        setDriftProduct(selectedProduct);
        if (selectedProduct) {
          const drift = await fetchDrift(selectedProduct, driftFrom, driftTo);
          setDriftRows(drift);
        } else {
          setDriftRows([]);
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
    [activeEnv, deployForm.productKey, driftFrom, driftProduct, driftTo, promoteForm.productKey]
  );

  useEffect(() => {
    load(false);
  }, [load]);

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

  const driftSummary = useMemo(() => {
    const total = driftRows.length;
    const differs = driftRows.filter((row) => row.differs).length;
    return { total, differs };
  }, [driftRows]);

  const pendingDeployCount = useMemo(
    () => deployRequests.filter((row) => row.status === "pending").length,
    [deployRequests]
  );

  const approvedDeployCount = useMemo(
    () => deployRequests.filter((row) => row.status === "approved").length,
    [deployRequests]
  );

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
      setDeployMessage("Selecciona producto, entorno y version para solicitar deploy.");
      return;
    }

    setDeployingActionId("create");
    try {
      await requestDeploy({
        productKey: deployForm.productKey,
        envKey: deployForm.envKey,
        semver: deployForm.semver,
        notes: deployForm.notes,
      });
      setDeployMessage("Solicitud de deploy creada en estado pending.");
      await load(true);
    } catch (err) {
      setDeployMessage(err?.message || "No se pudo crear la solicitud de deploy.");
    } finally {
      setDeployingActionId("");
    }
  };

  const handleApproveRequest = async (requestId, forceAdminOverride = false) => {
    setDeployMessage("");
    setDeployingActionId(`approve-${requestId}`);
    try {
      await approveDeployRequest({
        requestId,
        forceAdminOverride,
      });
      setDeployMessage(
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
    setDeployMessage("");
    setDeployingActionId(`reject-${requestId}`);
    try {
      await rejectDeployRequest({
        requestId,
        reason,
      });
      setDeployMessage("Solicitud rechazada.");
      await load(true);
    } catch (err) {
      setDeployMessage(err?.message || "No se pudo rechazar la solicitud.");
    } finally {
      setDeployingActionId("");
    }
  };

  const handleTriggerDeploy = async (requestId, forceAdminOverride = false) => {
    setDeployMessage("");
    setDeployingActionId(`trigger-${requestId}`);
    try {
      const result = await triggerDeployPipeline({
        requestId,
        forceAdminOverride,
      });
      setDeployMessage(
        `Deploy disparado correctamente. deployment_id=${result.deployment_id || "-"}`
      );
      await load(true);
    } catch (err) {
      setDeployMessage(err?.message || "No se pudo disparar el pipeline de deploy.");
    } finally {
      setDeployingActionId("");
    }
  };

  const handleMarkFailed = async (requestId) => {
    const deploymentId = window.prompt("ID de deployment fallido (opcional):", "") || "";
    const logsUrl = window.prompt("URL de logs (opcional):", "") || "";
    setDeployMessage("");
    setDeployingActionId(`failed-${requestId}`);
    try {
      await executeDeployRequest({
        requestId,
        status: "failed",
        deploymentId,
        logsUrl,
      });
      setDeployMessage("Request marcado como failed y registrado.");
      await load(true);
    } catch (err) {
      setDeployMessage(err?.message || "No se pudo marcar failed.");
    } finally {
      setDeployingActionId("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {ENV_OPTIONS.map((env) => (
            <button
              key={env}
              type="button"
              onClick={() => setActiveEnv(env)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                activeEnv === env
                  ? "border-[#2F1A55] bg-[#2F1A55] text-white"
                  : "border-[#E9E2F7] bg-white text-[#2F1A55]"
              }`}
            >
              {env}
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
          <div className="grid gap-4 md:grid-cols-3">
            {latestReleases.map((row) => (
              <VersionCard key={`${row.product_key}-${row.env_key}`} row={row} />
            ))}
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
                <GitCompare size={15} />
                Drift de versiones
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                <select
                  value={driftProduct}
                  onChange={(event) => setDriftProduct(event.target.value)}
                  className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
                >
                  {catalog.products.map((product) => (
                    <option key={product.id} value={product.product_key}>
                      {product.name}
                    </option>
                  ))}
                </select>
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
              </div>
              <button
                type="button"
                onClick={async () => {
                  if (!driftProduct) return;
                  const rows = await fetchDrift(driftProduct, driftFrom, driftTo);
                  setDriftRows(rows);
                }}
                className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs font-semibold text-[#5E30A5]"
              >
                Comparar drift
              </button>
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

            <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
                <ArrowRightLeft size={15} />
                Promocionar release
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <select
                  value={promoteForm.productKey}
                  onChange={(event) =>
                    setPromoteForm((prev) => ({ ...prev, productKey: event.target.value, semver: "" }))
                  }
                  className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
                >
                  {catalog.products.map((product) => (
                    <option key={`promote-${product.id}`} value={product.product_key}>
                      {product.name}
                    </option>
                  ))}
                </select>
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
            </div>
          </div>

          <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
                <ShieldCheck size={15} />
                Pre-deploy approval gate
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-amber-100 px-2 py-1 text-amber-700">
                  Pending: {pendingDeployCount}
                </span>
                <span className="rounded-full bg-indigo-100 px-2 py-1 text-indigo-700">
                  Approved: {approvedDeployCount}
                </span>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-4">
              <select
                value={deployForm.productKey}
                onChange={(event) =>
                  setDeployForm((prev) => ({ ...prev, productKey: event.target.value, semver: "" }))
                }
                className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
              >
                {catalog.products.map((product) => (
                  <option key={`deploy-product-${product.id}`} value={product.product_key}>
                    {product.name}
                  </option>
                ))}
              </select>
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
                <option value="">Version</option>
                {deployOptions.map((version) => (
                  <option key={`deploy-semver-${version}`} value={version}>
                    {version}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleCreateDeployRequest}
                disabled={deployingActionId === "create"}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5E30A5] px-3 py-2 text-xs font-semibold text-white disabled:opacity-60"
              >
                <Send size={14} />
                {deployingActionId === "create" ? "Solicitando..." : "Solicitar deploy"}
              </button>
            </div>
            <textarea
              value={deployForm.notes}
              onChange={(event) =>
                setDeployForm((prev) => ({ ...prev, notes: event.target.value }))
              }
              className="min-h-[72px] w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#5E30A5] resize-none"
              placeholder="Notas de solicitud de deploy"
            />

            {deployMessage ? (
              <div className="rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-600">
                {deployMessage}
              </div>
            ) : null}

            <Table
              className="mt-1"
              columns={[
                { key: "version", label: "Release" },
                { key: "status", label: "Estado", align: "center" },
                { key: "requester", label: "Solicitante" },
                { key: "approved", label: "Aprobacion" },
                { key: "actions", label: "Acciones", align: "right" },
              ]}
            >
              {deployRequests.slice(0, 25).map((row) => (
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
                            onClick={() => handleApproveRequest(row.id, true)}
                            disabled={deployingActionId === `approve-${row.id}`}
                            className="inline-flex items-center gap-1 rounded-lg border border-indigo-200 bg-indigo-50 px-2 py-1 text-[11px] font-semibold text-indigo-700 disabled:opacity-60"
                          >
                            <ShieldCheck size={12} />
                            Override
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
                          <button
                            type="button"
                            onClick={() => handleTriggerDeploy(row.id, true)}
                            disabled={deployingActionId === `trigger-${row.id}`}
                            className="inline-flex items-center gap-1 rounded-lg border border-[#E9E2F7] bg-[#F7F2FF] px-2 py-1 text-[11px] font-semibold text-[#5E30A5] disabled:opacity-60"
                          >
                            <Rocket size={12} />
                            Deploy directo
                          </button>
                        </>
                      ) : null}

                      {row.status === "approved" ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleTriggerDeploy(row.id, false)}
                            disabled={deployingActionId === `trigger-${row.id}`}
                            className="inline-flex items-center gap-1 rounded-lg border border-[#E9E2F7] bg-[#F7F2FF] px-2 py-1 text-[11px] font-semibold text-[#5E30A5] disabled:opacity-60"
                          >
                            <Rocket size={12} />
                            Ejecutar pipeline
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMarkFailed(row.id)}
                            disabled={deployingActionId === `failed-${row.id}`}
                            className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-[11px] font-semibold text-red-700 disabled:opacity-60"
                          >
                            <XCircle size={12} />
                            Marcar failed
                          </button>
                        </>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </Table>
          </div>

          <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
              <Activity size={15} />
              Releases actuales ({activeEnv})
            </div>
            <Table
              columns={[
                { key: "product", label: "Producto" },
                { key: "version", label: "Version", align: "right" },
                { key: "status", label: "Estado", align: "center" },
                { key: "commit", label: "Commit" },
              ]}
              className="mt-3"
            >
              {latestReleases.map((row) => (
                <tr key={`latest-${row.product_key}-${row.env_key}`} className="hover:bg-[#FAF8FF]">
                  <td className="px-4 py-3 text-slate-700">{row.product_name}</td>
                  <td className="px-4 py-3 text-right font-semibold text-[#2F1A55]">
                    {row.version_label}
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-slate-600">{row.status}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">
                    {row.source_commit_sha || "-"}
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
