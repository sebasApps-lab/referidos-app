import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowRightLeft,
  CheckCircle2,
  GitCompare,
  RefreshCw,
  Rocket,
  ShieldCheck,
  X,
  XCircle,
} from "lucide-react";
import Table from "../../components/ui/Table";
import {
  applyReleaseMigrations,
  backfillReleaseArtifact,
  approveDeployRequest,
  checkReleaseMigrations,
  createDevRelease,
  fetchDevReleaseStatus,
  fetchDeployRequests,
  fetchDrift,
  fetchLatestReleases,
  fetchPromotionHistory,
  fetchReleaseArtifacts,
  fetchReleasesByProductEnv,
  fetchVersioningCatalog,
  previewDevRelease,
  promoteRelease,
  rejectDeployRequest,
  requestDeploy,
  syncReleaseBranch,
  triggerDeployPipeline,
  validateEnvironmentContract,
} from "./services/versioningService";
import VersioningArtifactsPanel from "./VersioningArtifactsPanel";

const ENV_OPTIONS = ["dev", "staging", "prod"];
const DEPLOY_ENV_OPTIONS = ["staging", "prod"];
const DEPLOYABLE_PRODUCTS = ["referidos_app", "prelaunch_web"];
const PRODUCT_PRIORITY = ["referidos_app", "prelaunch_web"];

function compareProductsForTabs(a, b, isInitialized) {
  const keyA = String(a?.product_key || "");
  const keyB = String(b?.product_key || "");
  const priorityA = PRODUCT_PRIORITY.includes(keyA)
    ? PRODUCT_PRIORITY.indexOf(keyA)
    : PRODUCT_PRIORITY.length + 1;
  const priorityB = PRODUCT_PRIORITY.includes(keyB)
    ? PRODUCT_PRIORITY.indexOf(keyB)
    : PRODUCT_PRIORITY.length + 1;
  if (priorityA !== priorityB && (priorityA <= PRODUCT_PRIORITY.length || priorityB <= PRODUCT_PRIORITY.length)) {
    return priorityA - priorityB;
  }

  const initializedA = isInitialized(keyA);
  const initializedB = isInitialized(keyB);
  if (initializedA !== initializedB) return initializedA ? -1 : 1;

  const labelA = normalizeProductLabel(a);
  const labelB = normalizeProductLabel(b);
  return labelA.localeCompare(labelB, "es");
}

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

function normalizeProductMetadata(product) {
  const metadata = product?.metadata;
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) return {};
  return metadata;
}

function isProductInitialized(product) {
  if (!product) return false;
  if (product.initialized === true) return true;
  if (Number(product.component_count || 0) > 0) return true;
  const metadata = normalizeProductMetadata(product);
  return metadata?.versioning?.initialized === true;
}

function getInitialBaselineSemver(product) {
  const metadata = normalizeProductMetadata(product);
  const fromVersioning = String(metadata?.versioning?.initial_baseline_semver || "").trim();
  if (fromVersioning) return fromVersioning;
  const fromRoot = String(metadata?.initial_baseline_semver || "").trim();
  if (fromRoot) return fromRoot;
  return "0.1.0";
}

function normalizeReleaseStatus(envKey, status) {
  const normalizedStatus = String(status || "").toLowerCase();
  if (!normalizedStatus) return "-";

  if (normalizedStatus === "validated") return "released";
  if (normalizedStatus === "draft" || normalizedStatus === "sin release") return "pending";
  return normalizedStatus;
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

function versionKey(envKey, versionLabel) {
  return `${String(envKey || "").toLowerCase()}::${String(versionLabel || "").trim()}`;
}

function actionKey(prefix, ...parts) {
  const normalized = parts
    .map((part) => String(part || "").replace(/[^a-zA-Z0-9_-]/g, "_"))
    .join("-");
  return `${prefix}-${normalized}`;
}

function deploymentStateFromRequest(row) {
  if (!row) return "not_deployed";
  const requestStatus = String(row.status || "").toLowerCase();
  const deploymentStatus = String(row.deployment_status || "").toLowerCase();

  if (deploymentStatus === "success" || deploymentStatus === "deployed") return "deployed";
  if (requestStatus === "pending") return "pending";
  if (requestStatus === "approved") return "approved";
  if (requestStatus === "rejected") return "rejected";
  if (requestStatus === "failed" || deploymentStatus === "failed") return "failed";
  if (requestStatus === "executed") return deploymentStatus === "failed" ? "failed" : "deployed";
  return "not_deployed";
}

function deploymentStateBadgeClass(state) {
  if (state === "deployed") return "bg-emerald-100 text-emerald-700";
  if (state === "pending") return "bg-amber-100 text-amber-700";
  if (state === "approved") return "bg-indigo-100 text-indigo-700";
  if (state === "failed") return "bg-red-100 text-red-700";
  if (state === "rejected") return "bg-slate-200 text-slate-700";
  return "bg-slate-100 text-slate-600";
}

function deploymentStateLabel(state) {
  if (state === "deployed") return "deployed";
  if (state === "pending") return "pending";
  if (state === "approved") return "approved";
  if (state === "failed") return "failed";
  if (state === "rejected") return "rejected";
  return "not deployed";
}

function normalizeCheckState(value) {
  const normalized = String(value || "").toLowerCase();
  if (normalized === "success" || normalized === "failed" || normalized === "pending" || normalized === "missing") {
    return normalized;
  }
  return "missing";
}

function checkBadgeClass(state) {
  if (state === "success") return "bg-emerald-100 text-emerald-700";
  if (state === "failed") return "bg-red-100 text-red-700";
  if (state === "pending") return "bg-amber-100 text-amber-700";
  return "bg-slate-100 text-slate-600";
}

function checkBadgeLabel(state) {
  if (state === "success") return "OK";
  if (state === "failed") return "FAIL";
  if (state === "pending") return "PENDING";
  return "MISSING";
}

const DEV_RELEASE_STEPS = [
  { key: "dispatch", label: "Encolar workflow de release" },
  { key: "workflow", label: "Workflow versioning-release-dev.yml" },
  { key: "detect", label: "Detectar nueva release en DEVELOPMENT" },
  { key: "refresh", label: "Actualizar estado del panel" },
];

const DEV_BACKFILL_STEPS = [
  { key: "dispatch", label: "Encolar workflow de backfill" },
  { key: "workflow", label: "Workflow versioning-release-dev.yml" },
  { key: "detect", label: "Detectar build registrada en bucket" },
  { key: "refresh", label: "Actualizar estado del panel" },
];

function createProgressState({
  status = "running",
  headline = "Procesando",
  detail = "",
  steps = [],
}) {
  return {
    status,
    headline,
    detail,
    steps,
  };
}

function createDevReleaseProgress({
  status = "running",
  headline = "Releasing",
  detail = "",
  stepStatus = {},
}) {
  return createProgressState({
    status,
    headline,
    detail,
    steps: DEV_RELEASE_STEPS.map((step) => ({
      ...step,
      status: stepStatus[step.key] || "pending",
    })),
  });
}

function createBackfillProgress({
  status = "running",
  headline = "Backfilling build",
  detail = "",
  stepStatus = {},
}) {
  return createProgressState({
    status,
    headline,
    detail,
    steps: DEV_BACKFILL_STEPS.map((step) => ({
      ...step,
      status: stepStatus[step.key] || "pending",
    })),
  });
}

function workflowStateToProgress(status, conclusion) {
  const s = String(status || "").toLowerCase();
  const c = String(conclusion || "").toLowerCase();
  if (["success", "neutral", "skipped"].includes(c)) return "success";
  if (["failure", "cancelled", "timed_out", "action_required", "startup_failure", "stale"].includes(c)) {
    return "error";
  }
  if (s === "completed" && !c) return "success";
  if (["in_progress", "queued", "pending", "waiting", "requested"].includes(s)) return "running";
  return "pending";
}

function checkStateToProgress(state) {
  const normalized = normalizeCheckState(state);
  if (normalized === "success") return "success";
  if (normalized === "failed") return "error";
  if (normalized === "pending") return "running";
  return "pending";
}

function buildPromoteProgress({
  status = "running",
  detail = "",
  checks = null,
  prCreated = false,
  releaseSynced = false,
  mergeAttempted = false,
}) {
  const lint = checkStateToProgress(checks?.lint);
  const test = checkStateToProgress(checks?.test);
  const build = checkStateToProgress(checks?.build);
  const mergeState = releaseSynced
    ? "success"
    : mergeAttempted
      ? "error"
      : "pending";
  const verifyState = releaseSynced ? "success" : "pending";
  return createProgressState({
    status,
    headline: "Promoting",
    detail,
    steps: [
      { key: "promote", label: "Promover release en OPS", status: "success" },
      { key: "pr", label: "Crear / actualizar PR de sincronizacion", status: prCreated ? "success" : "running" },
      { key: "lint", label: "Check lint", status: lint },
      { key: "test", label: "Check test", status: test },
      { key: "build", label: "Check build", status: build },
      { key: "merge", label: "Merge PR", status: mergeState },
      { key: "verify", label: "Verificar release en rama destino", status: verifyState },
    ],
  });
}

function buildMergeProgress({
  status = "running",
  detail = "",
  checks = null,
  prCreated = false,
  releaseSynced = false,
  mergeAttempted = false,
}) {
  const lint = checkStateToProgress(checks?.lint);
  const test = checkStateToProgress(checks?.test);
  const build = checkStateToProgress(checks?.build);
  const mergeState = releaseSynced
    ? "success"
    : mergeAttempted
      ? "error"
      : "pending";
  const verifyState = releaseSynced ? "success" : "pending";
  return createProgressState({
    status,
    headline: "Merging",
    detail,
    steps: [
      { key: "pr", label: "Crear / actualizar PR de sincronizacion", status: prCreated ? "success" : "running" },
      { key: "lint", label: "Check lint", status: lint },
      { key: "test", label: "Check test", status: test },
      { key: "build", label: "Check build", status: build },
      { key: "merge", label: "Merge PR", status: mergeState },
      { key: "verify", label: "Verificar release en rama destino", status: verifyState },
    ],
  });
}

const DEPLOY_PROGRESS_STEPS = [
  { key: "gate", label: "Validar gate de migraciones" },
  { key: "sync", label: "Sincronizar release en rama destino" },
  { key: "request", label: "Crear / resolver request de deploy" },
  { key: "pipeline", label: "Ejecutar pipeline de deploy" },
  { key: "verify", label: "Verificar deploy" },
];

function createDeployProgress({
  status = "running",
  detail = "",
  stepStatus = {},
}) {
  return createProgressState({
    status,
    headline: "Deploying",
    detail,
    steps: DEPLOY_PROGRESS_STEPS.map((step) => ({
      ...step,
      status: stepStatus[step.key] || "pending",
    })),
  });
}

function uniqueReleaseRowsByVersion(rows) {
  const list = [];
  const seen = new Set();
  for (const row of rows || []) {
    const versionLabel = String(row.version_label || "").trim();
    if (!versionLabel || seen.has(versionLabel)) continue;
    seen.add(versionLabel);
    list.push(row);
  }
  return list;
}

function parseSemverLabel(value) {
  const match = String(value || "").trim().match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (!match) return null;
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
}

function compareSemverLabel(a, b) {
  const parsedA = parseSemverLabel(a);
  const parsedB = parseSemverLabel(b);
  if (!parsedA || !parsedB) return 0;
  if (parsedA.major !== parsedB.major) return parsedA.major - parsedB.major;
  if (parsedA.minor !== parsedB.minor) return parsedA.minor - parsedB.minor;
  return parsedA.patch - parsedB.patch;
}

function VersionCard({
  row,
  action = null,
  actions = [],
  message = "",
  progressState = null,
  disabled = false,
  deployState = "",
  mergeState = null,
  hasArtifact = false,
  buildDisplay = "-",
}) {
  const envKey = String(row?.env_key || "").toLowerCase();
  const isDevelopment = envKey === "dev";
  const isDeployTrackedEnv = envKey === "staging" || envKey === "prod";
  const statusLabel = normalizeReleaseStatus(row?.env_key, row?.status);
  const actionList = Array.isArray(actions) && actions.length ? actions : action ? [action] : [];
  const progress = progressState;

  const renderProgressIcon = (state) => {
    if (state === "success") {
      return <CheckCircle2 size={13} className="text-emerald-600" />;
    }
    if (state === "error") {
      return <XCircle size={13} className="text-red-600" />;
    }
    if (state === "running") {
      return <RefreshCw size={13} className="text-[#5E30A5] animate-spin" />;
    }
    return <span className="inline-block h-[9px] w-[9px] rounded-full border border-slate-300" />;
  };

  const progressHeadlineClass =
    progress?.status === "success"
      ? "text-emerald-700"
      : progress?.status === "error"
        ? "text-red-700"
        : "text-[#5E30A5]";

  return (
    <div
      className={`rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm ${
        disabled ? "opacity-60 grayscale-[0.1]" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="text-xs uppercase tracking-[0.1em] text-slate-400">
          {normalizeEnvLabel(row.env_key)}
        </div>
        {actionList.length ? (
          <div className="flex items-center gap-1">
            {actionList.map((item) => (
              <button
                key={item.key || item.label}
                type="button"
                onClick={item.onClick}
                disabled={disabled || item.disabled}
                className="inline-flex items-center rounded-lg border border-[#E9E2F7] px-2 py-1 text-[11px] font-semibold text-[#5E30A5] disabled:opacity-60"
              >
                {item.loading ? item.loadingLabel || "Procesando..." : item.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <div className="mt-2 text-2xl font-extrabold text-[#2F1A55]">{row.version_label}</div>
      <div className="mt-1 text-[11px] text-slate-500">
        {`build ${buildDisplay}`}
        {" | "}
        {row.channel || envKey ? `channel ${row.channel || envKey}` : "channel -"}
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 text-xs text-slate-500">
        <span>Estado: {statusLabel}</span>
        <div className="flex items-center gap-1">
          {hasArtifact ? (
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
              built
            </span>
          ) : null}
          {isDeployTrackedEnv && mergeState?.merged ? (
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
              merged
            </span>
          ) : null}
          {isDeployTrackedEnv && deployState === "deployed" ? (
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${deploymentStateBadgeClass(
                "deployed"
              )}`}
            >
              deployed
            </span>
          ) : null}
        </div>
      </div>
      <div className="text-xs text-slate-500">Commit: {row.source_commit_sha || "-"}</div>
      {disabled ? (
        <div className="mt-2 rounded-lg border border-[#E9E2F7] bg-[#FAF8FF] px-2 py-1 text-[11px] text-slate-600">
          No inicializado
        </div>
      ) : null}
      {!isDevelopment && isDeployTrackedEnv && mergeState?.checking ? (
        <div className="mt-2 rounded-lg border border-[#E9E2F7] bg-[#FAF8FF] px-2 py-1 text-[11px] text-slate-600">
          Verificando merge...
        </div>
      ) : null}
      {!isDevelopment && isDeployTrackedEnv && !mergeState?.checking && mergeState?.error ? (
        <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-2 py-1 text-[11px] text-amber-800">
          {mergeState.error}
        </div>
      ) : null}
      {progress ? (
        <div className="mt-2 rounded-lg border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-[11px]">
          <div className={`flex items-center justify-between font-semibold ${progressHeadlineClass}`}>
            <span>{progress.headline || "Releasing"}</span>
            {renderProgressIcon(progress.status)}
          </div>
          {progress.detail ? (
            <div className="mt-1 text-[10px] text-slate-600">{progress.detail}</div>
          ) : null}
          {Array.isArray(progress.steps) && progress.steps.length ? (
            <div className="mt-2 space-y-1">
              {progress.steps.map((step) => {
                const stepClass =
                  step.status === "success"
                    ? "text-emerald-700"
                    : step.status === "error"
                      ? "text-red-700"
                      : "text-slate-600";
                return (
                  <div key={step.key} className={`flex items-center justify-between ${stepClass}`}>
                    <span>{step.label}</span>
                    {renderProgressIcon(step.status)}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      ) : null}
      {message ? (
        <div className="mt-2 rounded-lg border border-[#E9E2F7] bg-[#FAF8FF] px-2 py-1 text-[11px] text-slate-600">
          {message}
        </div>
      ) : null}
    </div>
  );
}

export default function VersioningOverviewPanel() {
  const [versioningTab, setVersioningTab] = useState("pipeline");
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
  const [releaseArtifacts, setReleaseArtifacts] = useState([]);
  const [promotionHistory, setPromotionHistory] = useState([]);
  const [releaseOpsMode, setReleaseOpsMode] = useState("promote");

  const [creatingDevRelease, setCreatingDevRelease] = useState(false);
  const [devReleaseMessage, setDevReleaseMessage] = useState("");
  const [devReleaseProgress, setDevReleaseProgress] = useState(null);
  const [devReleasePreviewInfo, setDevReleasePreviewInfo] = useState(null);
  const [devReleasePreviewLoading, setDevReleasePreviewLoading] = useState(false);
  const [devReleasePreviewError, setDevReleasePreviewError] = useState("");
  const [devReleaseDraft, setDevReleaseDraft] = useState(null);
  const [devReleaseDraftError, setDevReleaseDraftError] = useState("");
  const [devReleaseSyncing, setDevReleaseSyncing] = useState(null);
  const [backfillActionId, setBackfillActionId] = useState("");
  const [promoteProgressByEnv, setPromoteProgressByEnv] = useState({});
  const [promoteSourceEnv, setPromoteSourceEnv] = useState("dev");
  const [promoteRows, setPromoteRows] = useState([]);
  const [promoteRowsLoading, setPromoteRowsLoading] = useState(false);
  const [promotingActionId, setPromotingActionId] = useState("");
  const [promoteMessage, setPromoteMessage] = useState("");
  const [promoteDraft, setPromoteDraft] = useState(null);

  const [deployTargetEnv, setDeployTargetEnv] = useState("staging");
  const [deployNotes, setDeployNotes] = useState("");
  const [deployingActionId, setDeployingActionId] = useState("");
  const [deployMessage, setDeployMessage] = useState("");
  const [activeDeployRequestId, setActiveDeployRequestId] = useState("");
  const [deploySyncRequired, setDeploySyncRequired] = useState(null);
  const [mergeStatusByVersion, setMergeStatusByVersion] = useState({});
  const [envCardMessages, setEnvCardMessages] = useState({});
  const [mergingActionId, setMergingActionId] = useState("");
  const [syncPipelineState, setSyncPipelineState] = useState(null);
  const [syncPipelineActionId, setSyncPipelineActionId] = useState("");
  const [deployMigrationGate, setDeployMigrationGate] = useState(null);
  const [migrationGateActionId, setMigrationGateActionId] = useState("");
  const [migrationApplyActionId, setMigrationApplyActionId] = useState("");
  const [envValidationState, setEnvValidationState] = useState(null);
  const [envValidationLoading, setEnvValidationLoading] = useState(false);

  const [approvalMessage, setApprovalMessage] = useState("");
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const autoBackfillAttemptedRef = useRef(new Set());

  const selectedProduct = useMemo(
    () => catalog.products.find((product) => product.product_key === activeProductKey) || null,
    [catalog.products, activeProductKey]
  );
  const initializedByProduct = useMemo(() => {
    const map = new Map();
    for (const product of catalog.products || []) {
      map.set(product.product_key, isProductInitialized(product));
    }
    return map;
  }, [catalog.products]);
  const orderedProducts = useMemo(() => {
    const withMeta = (catalog.products || []).map((product) => ({
      ...product,
      initializedInDev: initializedByProduct.get(product.product_key) === true,
    }));

    return withMeta.sort((a, b) =>
      compareProductsForTabs(a, b, (productKey) => initializedByProduct.get(productKey) === true)
    );
  }, [catalog.products, initializedByProduct]);
  const selectedProductLabel = useMemo(
    () => normalizeProductLabel(selectedProduct),
    [selectedProduct]
  );
  const promoteTargetEnv = useMemo(
    () => (promoteSourceEnv === "dev" ? "staging" : "prod"),
    [promoteSourceEnv]
  );

  const load = useCallback(
    async (manual = false) => {
      if (manual) setRefreshing(true);
      else setLoading(true);
      setError("");
      try {
        const [dataCatalog, dataLatest, requests, artifactRows] = await Promise.all([
          fetchVersioningCatalog(),
          fetchLatestReleases(),
          fetchDeployRequests(),
          fetchReleaseArtifacts({
            productKey: activeProductKey || "",
            limit: 400,
          }),
        ]);

        setCatalog(dataCatalog);
        setLatestReleases(dataLatest);
        setDeployRequests(requests);
        setReleaseArtifacts(Array.isArray(artifactRows) ? artifactRows : []);

        const initializedSet = new Set(
          (dataCatalog.products || [])
            .filter((product) => isProductInitialized(product))
            .map((product) => product.product_key)
            .filter(Boolean)
        );
        const sortedProducts = [...(dataCatalog.products || [])].sort((a, b) =>
          compareProductsForTabs(a, b, (productKey) => initializedSet.has(productKey))
        );

        const hasInitialized = sortedProducts.some((product) =>
          initializedSet.has(product.product_key)
        );
        const firstInitializedProductKey =
          sortedProducts.find((product) => initializedSet.has(product.product_key))?.product_key || "";
        const activeExists = sortedProducts.some(
          (product) => product.product_key === activeProductKey
        );
        const activeInitialized = initializedSet.has(activeProductKey);
        const firstProduct = sortedProducts[0]?.product_key || "";

        let selectedProductKey = activeProductKey || firstProduct;
        if (!activeExists || (hasInitialized && !activeInitialized)) {
          selectedProductKey = hasInitialized ? firstInitializedProductKey : firstProduct;
        }

        setActiveProductKey(selectedProductKey);
        const selectedProductMeta =
          dataCatalog.products?.find((product) => product.product_key === selectedProductKey) ||
          null;

        if (selectedProductKey) {
          const [drift, promotions] = await Promise.all([
            fetchDrift(selectedProductKey, driftFrom, driftTo),
            selectedProductMeta?.id
              ? fetchPromotionHistory({
                  productId: selectedProductMeta.id,
                  limit: 80,
                })
              : Promise.resolve([]),
          ]);
          setDriftRows(drift);
          setPromotionHistory(promotions);
        } else {
          setDriftRows([]);
          setPromotionHistory([]);
        }
      } catch (err) {
        setError(err?.message || "No se pudo cargar versionado.");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [activeProductKey, driftFrom, driftTo]
  );

  useEffect(() => {
    load(false);
  }, [load]);

  const refreshLatestReleaseRows = useCallback(async () => {
    const latest = await fetchLatestReleases();
    setLatestReleases(latest);
    return latest || [];
  }, []);

  const refreshReleaseArtifacts = useCallback(async () => {
    const artifacts = await fetchReleaseArtifacts({
      productKey: activeProductKey || "",
      limit: 400,
    });
    const rows = Array.isArray(artifacts) ? artifacts : [];
    setReleaseArtifacts(rows);
    return rows;
  }, [activeProductKey]);
  useEffect(() => {
    if (!devReleaseSyncing) return undefined;
    let cancelled = false;
    let timerId;
    const POLL_INTERVAL_MS = 4000;
    const MAX_WAIT_MS = 120000;

    const tick = async () => {
      if (cancelled) return;
      try {
        const workflowStatus = await fetchDevReleaseStatus({
          productKey: devReleaseSyncing.productKey,
          ref: devReleaseSyncing.ref || "dev",
          runId: Number(devReleaseSyncing.runId || 0),
          dispatchStartedAt: devReleaseSyncing.dispatchStartedAt || "",
        });
        if (cancelled) return;

        const run = workflowStatus?.run || null;
        const jobs = Array.isArray(workflowStatus?.jobs) ? workflowStatus.jobs : [];
        const runState = workflowStateToProgress(run?.status, run?.conclusion);
        const isBackfillMode = devReleaseSyncing.mode === "backfill_artifact";

        const dynamicSteps = [
          {
            key: "dispatch",
            label: isBackfillMode ? "Encolar workflow de backfill" : "Encolar workflow de release",
            status: "success",
          },
          {
            key: "workflow",
            label: run?.run_number
              ? `Workflow run #${run.run_number}`
              : "Workflow versioning-release-dev.yml",
            status: run ? runState : "running",
          },
        ];

        for (const job of jobs) {
          const jobSteps = Array.isArray(job?.steps) ? job.steps : [];
          if (jobSteps.length) {
            for (const step of jobSteps) {
              dynamicSteps.push({
                key: `job-${job.id || job.name}-${step.number || step.name}`,
                label: step?.name || job?.name || "Paso workflow",
                status: workflowStateToProgress(step?.status, step?.conclusion),
              });
            }
          } else {
            dynamicSteps.push({
              key: `job-${job.id || job.name}`,
              label: job?.name || "Job workflow",
              status: workflowStateToProgress(job?.status, job?.conclusion),
            });
          }
        }

        dynamicSteps.push({
          key: "detect",
          label: isBackfillMode
            ? "Detectar build registrada en bucket"
            : "Detectar nueva release en DEVELOPMENT",
          status: runState === "error" ? "error" : "running",
        });
        dynamicSteps.push({
          key: "refresh",
          label: "Actualizar estado del panel",
          status: "pending",
        });

        const isBuilding = dynamicSteps.some(
          (step) =>
            step?.status === "running" &&
            /build release artifact/i.test(String(step?.label || ""))
        );

        setDevReleaseProgress(
          createProgressState({
            status: runState === "error" ? "error" : "running",
            headline: isBuilding ? "Building" : isBackfillMode ? "Backfilling build" : "Releasing",
            detail: isBuilding ? "Building..." : "",
            steps: dynamicSteps,
          })
        );

        if (run && runState === "error") {
          setDevReleaseMessage(
            isBackfillMode
              ? "Backfill build con error. Revisa el workflow y vuelve a intentar."
              : "Release DEVELOPMENT con error. Revisa el workflow y vuelve a intentar."
          );
          setDevReleaseSyncing(null);
          return;
        }

        const latest = await refreshLatestReleaseRows();
        if (cancelled) return;

        const devRow = (latest || []).find(
          (row) =>
            String(row.product_key || "") === String(devReleaseSyncing.productKey || "") &&
            String(row.env_key || "").toLowerCase() === "dev"
        );

        const versionLabel = String(devRow?.version_label || "").trim();
        const sourceCommitSha = String(devRow?.source_commit_sha || "").trim();
        const hasAnyDevRelease = Boolean(devRow && versionLabel && versionLabel !== "-");
        let isCompleted = false;
        let successVersionLabel = versionLabel;

        if (isBackfillMode) {
          const artifacts = await refreshReleaseArtifacts();
          if (cancelled) return;
          const targetReleaseId = String(devReleaseSyncing.targetReleaseId || "").trim();
          isCompleted = Boolean(
            targetReleaseId &&
              (artifacts || []).some(
                (artifactRow) => String(artifactRow?.release_id || "").trim() === targetReleaseId
              )
          );
          successVersionLabel = String(devReleaseSyncing.targetVersionLabel || versionLabel || "").trim();
        } else {
          isCompleted = devReleaseSyncing.hadPreviousRelease
            ? hasAnyDevRelease &&
              (versionLabel !== String(devReleaseSyncing.previousVersionLabel || "").trim() ||
                sourceCommitSha !== String(devReleaseSyncing.previousSourceCommitSha || "").trim())
            : hasAnyDevRelease;
        }

        if (isCompleted) {
          const finalSteps = (dynamicSteps || []).map((step) => {
            if (step.key === "detect" || step.key === "refresh") {
              return { ...step, status: "success" };
            }
            if (step.status === "running") {
              return { ...step, status: runState === "error" ? "error" : "success" };
            }
            return step;
          });
          setDevReleaseProgress(
            createProgressState({
              status: "success",
              headline: isBackfillMode
                ? "Backfill build completado"
                : "Release DEVELOPMENT creada con éxito",
              detail: successVersionLabel || versionLabel || "-",
              steps: finalSteps,
            })
          );
          await load(true);
          if (cancelled) return;
          setDevReleaseMessage(
            isBackfillMode
              ? `Build backfill completada en DEVELOPMENT: ${successVersionLabel || versionLabel || "-"}.`
              : `Release DEVELOPMENT creada con éxito: ${versionLabel}.`
          );
          setDevReleaseSyncing(null);
          return;
        }
      } catch {
        // Keep polling on transient errors.
      }

      if (Date.now() - Number(devReleaseSyncing.startedAt || 0) >= MAX_WAIT_MS) {
        setDevReleaseMessage(
          devReleaseSyncing.mode === "backfill_artifact"
            ? "Backfill en cola. Sigue en ejecución; revisa el workflow si tarda más de lo esperado."
            : "Release en cola. Sigue en ejecución; revisa el workflow si tarda más de lo esperado."
        );
        setDevReleaseProgress((current) =>
          createProgressState({
            status: "error",
            headline:
              devReleaseSyncing.mode === "backfill_artifact"
                ? "Backfill build con error"
                : "Release DEVELOPMENT con error",
            detail:
              devReleaseSyncing.mode === "backfill_artifact"
                ? "No se detectó build registrada dentro del tiempo esperado."
                : "No se detectó una nueva release dentro del tiempo esperado.",
            steps: Array.isArray(current?.steps)
              ? current.steps.map((step) =>
                  step.status === "running" ? { ...step, status: "error" } : step
                )
              : [],
          })
        );
        setDevReleaseSyncing(null);
        return;
      }

      timerId = setTimeout(tick, POLL_INTERVAL_MS);
    };

    tick();

    return () => {
      cancelled = true;
      if (timerId) clearTimeout(timerId);
    };
  }, [devReleaseSyncing, refreshLatestReleaseRows, refreshReleaseArtifacts, load]);

  useEffect(() => {
    if (!activeProductKey) {
      setPromoteRows([]);
      return;
    }
    let cancelled = false;
    setPromoteRowsLoading(true);
    setError("");

    fetchReleasesByProductEnv(activeProductKey, promoteSourceEnv)
      .then((rows) => {
        if (cancelled) return;
        setPromoteRows(uniqueReleaseRowsByVersion(rows));
      })
      .catch((err) => {
        if (cancelled) return;
        setPromoteRows([]);
        setError(err?.message || "No se pudieron cargar releases para promocionar.");
      })
      .finally(() => {
        if (cancelled) return;
        setPromoteRowsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [activeProductKey, promoteSourceEnv]);

  useEffect(() => {
    setPromoteMessage("");
    setDeployMessage("");
    setApprovalMessage("");
    setDeploySyncRequired(null);
    setActiveDeployRequestId("");
    setPromoteDraft(null);
    setDevReleaseDraft(null);
    setDevReleaseDraftError("");
    setEnvCardMessages({});
    setSyncPipelineState(null);
    setSyncPipelineActionId("");
    setDeployMigrationGate(null);
    setMigrationGateActionId("");
    setMigrationApplyActionId("");
    setEnvValidationState(null);
    setEnvValidationLoading(false);
    setDevReleaseProgress(null);
    setBackfillActionId("");
    setPromoteProgressByEnv({});
  }, [activeProductKey]);

  useEffect(() => {
    setPromoteDraft(null);
  }, [promoteSourceEnv, releaseOpsMode]);

  useEffect(() => {
    const productInitialized = initializedByProduct.get(activeProductKey) === true;
    if (!activeProductKey || !productInitialized) {
      setDevReleasePreviewInfo(null);
      setDevReleasePreviewError("");
      setDevReleasePreviewLoading(false);
      return undefined;
    }

    let cancelled = false;
    setDevReleasePreviewLoading(true);
    setDevReleasePreviewError("");

    previewDevRelease({
      productKey: activeProductKey,
      ref: "dev",
    })
      .then((preview) => {
        if (cancelled) return;
        setDevReleasePreviewInfo(preview || null);
      })
      .catch((err) => {
        if (cancelled) return;
        setDevReleasePreviewInfo(null);
        setDevReleasePreviewError(
          err?.message || "No se pudo revisar cambios pendientes en DEVELOPMENT."
        );
      })
      .finally(() => {
        if (cancelled) return;
        setDevReleasePreviewLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [activeProductKey, initializedByProduct, latestReleases]);

  const driftSummary = useMemo(() => {
    const total = driftRows.length;
    const differs = driftRows.filter((row) => row.differs).length;
    return { total, differs };
  }, [driftRows]);

  const selectedProductDeployRequests = useMemo(
    () => deployRequests.filter((row) => row.product_key === activeProductKey),
    [deployRequests, activeProductKey]
  );

  const pendingDeployCount = useMemo(
    () => selectedProductDeployRequests.filter((row) => row.status === "pending").length,
    [selectedProductDeployRequests]
  );
  const approvedDeployCount = useMemo(
    () => selectedProductDeployRequests.filter((row) => row.status === "approved").length,
    [selectedProductDeployRequests]
  );
  const executedDeployCount = useMemo(
    () => selectedProductDeployRequests.filter((row) => row.status === "executed").length,
    [selectedProductDeployRequests]
  );

  const sortedDeployRequests = useMemo(() => {
    const rank = { pending: 0, approved: 1, executed: 2, failed: 3, rejected: 4 };
    return selectedProductDeployRequests
      .slice()
      .sort((a, b) => {
        const rankA = rank[a.status] ?? 99;
        const rankB = rank[b.status] ?? 99;
        if (rankA !== rankB) return rankA - rankB;
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      });
  }, [selectedProductDeployRequests]);

  const latestDeployRequestByVersion = useMemo(() => {
    const map = new Map();
    const sorted = selectedProductDeployRequests
      .slice()
      .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
    for (const row of sorted) {
      const key = versionKey(row.env_key, row.version_label);
      if (!map.has(key)) map.set(key, row);
    }
    return map;
  }, [selectedProductDeployRequests]);

  const getLatestDeployRequestForVersion = useCallback(
    (envKey, versionLabel) => latestDeployRequestByVersion.get(versionKey(envKey, versionLabel)) || null,
    [latestDeployRequestByVersion]
  );

  const getDeploymentStateForVersion = useCallback(
    (envKey, versionLabel) => deploymentStateFromRequest(getLatestDeployRequestForVersion(envKey, versionLabel)),
    [getLatestDeployRequestForVersion]
  );

  const getMergeStatusForVersion = useCallback(
    (envKey, versionLabel) => mergeStatusByVersion[versionKey(envKey, versionLabel)] || null,
    [mergeStatusByVersion]
  );

  const artifactReleaseIdSet = useMemo(() => {
    const set = new Set();
    for (const row of releaseArtifacts || []) {
      const releaseId = String(row?.release_id || "").trim();
      if (releaseId) set.add(releaseId);
    }
    return set;
  }, [releaseArtifacts]);

  const artifactByReleaseId = useMemo(() => {
    const map = new Map();
    for (const row of releaseArtifacts || []) {
      const releaseId = String(row?.release_id || "").trim();
      if (!releaseId || map.has(releaseId)) continue;
      map.set(releaseId, row);
    }
    return map;
  }, [releaseArtifacts]);

  const envCards = useMemo(() => {
    const rowsByEnv = new Map(
      latestReleases
        .filter((row) => row.product_key === activeProductKey)
        .map((row) => [row.env_key, row])
    );
    const baselineSemver = getInitialBaselineSemver(selectedProduct);

    return ENV_OPTIONS.map((envKey) => {
      const row = rowsByEnv.get(envKey);
      if (row) return row;
      const isDev = String(envKey).toLowerCase() === "dev";
      return {
        product_key: activeProductKey,
        env_key: envKey,
        version_label:
          isDev && isProductInitialized(selectedProduct) ? baselineSemver : "-",
        status: "sin release",
        source_commit_sha: "",
      };
    });
  }, [activeProductKey, latestReleases, selectedProduct]);

  const isActiveProductInitialized = useMemo(
    () => initializedByProduct.get(activeProductKey) === true,
    [activeProductKey, initializedByProduct]
  );

  const devPreviewHasPendingRelease = useMemo(() => {
    if (!devReleasePreviewInfo || !isActiveProductInitialized) return false;
    const shouldCreate = devReleasePreviewInfo?.should_create_release === true;
    const changedCount = Number(devReleasePreviewInfo?.changed_files_count || 0);
    const initialPending = devReleasePreviewInfo?.initial_release_pending === true;
    return initialPending || (shouldCreate && changedCount > 0);
  }, [devReleasePreviewInfo, isActiveProductInitialized]);

  const devPreviewSummaryMessage = useMemo(() => {
    if (!isActiveProductInitialized) return "";
    if (devReleasePreviewLoading) return "Revisando cambios pendientes en DEVELOPMENT...";
    if (devReleasePreviewError) return devReleasePreviewError;
    if (!devReleasePreviewInfo) return "";

    if (devPreviewHasPendingRelease) {
      const suggestedSemver = String(devReleasePreviewInfo?.suggested_semver || "").trim();
      const changedCount = Number(devReleasePreviewInfo?.changed_files_count || 0);
      if (suggestedSemver) {
        return `Cambios pendientes detectados (${changedCount}). Sugerida: ${suggestedSemver}.`;
      }
      return `Cambios pendientes detectados (${changedCount}).`;
    }
    return "";
  }, [
    devPreviewHasPendingRelease,
    devReleasePreviewError,
    devReleasePreviewInfo,
    devReleasePreviewLoading,
    isActiveProductInitialized,
  ]);

  const refreshMergeStatuses = useCallback(async () => {
    if (devReleaseSyncing || promotingActionId) {
      return;
    }

    if (!activeProductKey || !isActiveProductInitialized || !DEPLOYABLE_PRODUCTS.includes(activeProductKey)) {
      setMergeStatusByVersion({});
      return;
    }

    const targets = envCards
      .map((row) => ({
        envKey: String(row?.env_key || "").toLowerCase(),
        semver: String(row?.version_label || "").trim(),
      }))
      .filter(
        (row) => DEPLOY_ENV_OPTIONS.includes(row.envKey) && row.semver && row.semver !== "-"
      );

    if (!targets.length) {
      setMergeStatusByVersion({});
      return;
    }

    const checkingMap = Object.fromEntries(
      targets.map((target) => [versionKey(target.envKey, target.semver), { checking: true }])
    );
    setMergeStatusByVersion(checkingMap);

    const statusEntries = await Promise.all(
      targets.map(async (target) => {
        const key = versionKey(target.envKey, target.semver);
        try {
          const result = await syncReleaseBranch({
            productKey: activeProductKey,
            toEnv: target.envKey,
            semver: target.semver,
            checkOnly: true,
            autoMerge: false,
            createPr: false,
            operation: "refresh_pr",
          });
          return [
            key,
            {
              checking: false,
              merged: result?.release_synced === true || result?.already_synced === true,
              branches: result?.branches || null,
              sourceCommitSha: result?.source_commit_sha || "",
              error: "",
            },
          ];
        } catch (err) {
          return [
            key,
            {
              checking: false,
              merged: false,
              branches: null,
              sourceCommitSha: "",
              error: err?.message || "No se pudo verificar merge en rama destino.",
            },
          ];
        }
      })
    );

    setMergeStatusByVersion(Object.fromEntries(statusEntries));
  }, [activeProductKey, envCards, isActiveProductInitialized, devReleaseSyncing, promotingActionId]);

  useEffect(() => {
    refreshMergeStatuses();
  }, [refreshMergeStatuses]);

  const setSyncPipelineFromPayload = useCallback(
    (payload, context = {}, isError = false) => {
      const pr = payload?.pr || null;
      const checks = payload?.checks || null;
      if (!pr && !checks && !payload?.branches) return;
      setSyncPipelineState({
        productKey: context.productKey || activeProductKey || "",
        toEnv: String(context.toEnv || payload?.to_env || "").toLowerCase(),
        semver: String(context.semver || payload?.semver || "").trim(),
        source: context.source || "sync",
        error: isError,
        errorCode: payload?.error || "",
        detail: payload?.detail || "",
        branches: payload?.branches || null,
        pr,
        checks,
        updatedAt: Date.now(),
      });
    },
    [activeProductKey]
  );

  const setPromoteProgressForEnv = useCallback((envKey, progress) => {
    const key = String(envKey || "").toLowerCase();
    if (!key) return;
    setPromoteProgressByEnv((current) => ({
      ...current,
      [key]: progress,
    }));
  }, []);

  const setPromoteProgressFromSyncPayload = useCallback(
    (payload, { toEnv = "", detail = "", status = "running", mergeAttempted = false } = {}) => {
      const envKey = String(toEnv || payload?.to_env || "").toLowerCase();
      if (!envKey) return;
      const checks = payload?.checks || null;
      const prCreated = Boolean(payload?.pr);
      const releaseSynced = payload?.release_synced === true || payload?.already_synced === true;
      setPromoteProgressForEnv(
        envKey,
        buildPromoteProgress({
          status,
          detail,
          checks,
          prCreated,
          releaseSynced,
          mergeAttempted,
        })
      );
    },
    [setPromoteProgressForEnv]
  );

  useEffect(() => {
    if (!orderedProducts.length) return;
    const activeProduct = orderedProducts.find(
      (product) => product.product_key === activeProductKey
    );
    const hasInitialized = orderedProducts.some((product) => product.initializedInDev);

    if (activeProduct && (!hasInitialized || activeProduct.initializedInDev)) return;

    const firstInitialized = orderedProducts.find((product) => product.initializedInDev);
    const fallback = firstInitialized || orderedProducts[0] || null;
    if (fallback?.product_key && fallback.product_key !== activeProductKey) {
      setActiveProductKey(fallback.product_key);
    }
  }, [orderedProducts, activeProductKey]);

  const promotedToTargetVersionSet = useMemo(() => {
    const set = new Set();
    for (const row of promotionHistory || []) {
      if (String(row.to_env_key || "") === promoteTargetEnv) {
        const versionLabel = String(row.to_version_label || "").trim();
        if (versionLabel) set.add(versionLabel);
      }
    }
    return set;
  }, [promotionHistory, promoteTargetEnv]);

  const deployHistoryRows = useMemo(
    () =>
      (promotionHistory || []).filter(
        (row) => String(row.to_env_key || "").toLowerCase() === deployTargetEnv
      ),
    [promotionHistory, deployTargetEnv]
  );

  const openConfirmDialog = useCallback((dialog) => {
    setConfirmDialog(dialog);
  }, []);

  const closeConfirmDialog = useCallback(() => {
    if (confirmLoading) return;
    setConfirmDialog(null);
  }, [confirmLoading]);

  const handlePipelineRefreshChecks = async () => {
    if (!syncPipelineState?.productKey || !syncPipelineState?.toEnv || !syncPipelineState?.semver) return;
    setSyncPipelineActionId("refresh");
    try {
      const result = await syncReleaseBranch({
        productKey: syncPipelineState.productKey,
        toEnv: syncPipelineState.toEnv,
        semver: syncPipelineState.semver,
        sourceBranch: syncPipelineState?.branches?.source || "",
        targetBranch: syncPipelineState?.branches?.target || "",
        checkOnly: true,
        autoMerge: false,
        createPr: false,
        operation: "refresh_pr",
      });
      setSyncPipelineFromPayload(result, syncPipelineState, false);
      setPromoteProgressFromSyncPayload(result, {
        toEnv: syncPipelineState?.toEnv,
        detail: "Checks actualizados.",
        status: "running",
        mergeAttempted: false,
      });
      setPromoteMessage(
        `Checks actualizados. lint=${result?.checks?.lint || "-"}, test=${result?.checks?.test || "-"}, build=${result?.checks?.build || "-"}.`
      );
    } catch (err) {
      setSyncPipelineFromPayload(err?.payload || null, syncPipelineState, true);
      setPromoteProgressFromSyncPayload(err?.payload || {}, {
        toEnv: syncPipelineState?.toEnv,
        detail: err?.message || "No se pudieron refrescar los checks del PR.",
        status: "error",
        mergeAttempted: false,
      });
      setPromoteMessage(err?.message || "No se pudieron refrescar los checks del PR.");
    } finally {
      setSyncPipelineActionId("");
    }
  };

  const handlePipelineAutoMerge = async () => {
    if (!syncPipelineState?.productKey || !syncPipelineState?.toEnv || !syncPipelineState?.semver) return;
    setSyncPipelineActionId("auto-merge");
    try {
      const result = await syncReleaseBranch({
        productKey: syncPipelineState.productKey,
        toEnv: syncPipelineState.toEnv,
        semver: syncPipelineState.semver,
        sourceBranch: syncPipelineState?.branches?.source || "",
        targetBranch: syncPipelineState?.branches?.target || "",
        checkOnly: false,
        autoMerge: true,
        createPr: false,
        operation: "merge_pr",
      });
      setSyncPipelineFromPayload(result, syncPipelineState, false);
      setPromoteProgressFromSyncPayload(result, {
        toEnv: syncPipelineState?.toEnv,
        detail: `PR mergeado correctamente hacia ${normalizeEnvLabel(syncPipelineState?.toEnv || "-")}.`,
        status: "success",
        mergeAttempted: true,
      });
      setPromoteMessage(
        `PR mergeado correctamente a ${normalizeEnvLabel(syncPipelineState.toEnv)}.`
      );
      await load(true);
      await refreshMergeStatuses();
    } catch (err) {
      setSyncPipelineFromPayload(err?.payload || null, syncPipelineState, true);
      setPromoteProgressFromSyncPayload(err?.payload || {}, {
        toEnv: syncPipelineState?.toEnv,
        detail: err?.message || "No se pudo hacer auto-merge del PR.",
        status: "error",
        mergeAttempted: true,
      });
      setPromoteMessage(err?.message || "No se pudo hacer auto-merge del PR.");
      await refreshMergeStatuses();
    } finally {
      setSyncPipelineActionId("");
    }
  };

  const handlePipelineCancel = async () => {
    const pullNumber = Number(syncPipelineState?.pr?.number || 0);
    if (!pullNumber || !syncPipelineState?.productKey || !syncPipelineState?.toEnv || !syncPipelineState?.semver) return;
    setSyncPipelineActionId("cancel");
    try {
      const result = await syncReleaseBranch({
        productKey: syncPipelineState.productKey,
        toEnv: syncPipelineState.toEnv,
        semver: syncPipelineState.semver,
        operation: "close_pr",
        pullNumber,
      });
      setSyncPipelineFromPayload(result, syncPipelineState, false);
      setPromoteProgressForEnv(
        syncPipelineState?.toEnv,
        createProgressState({
          status: "error",
          headline: "Promoting",
          detail: `PR #${pullNumber} cerrado.`,
          steps: [
            { key: "promote", label: "Promover release en OPS", status: "success" },
            { key: "pr", label: "Crear / actualizar PR de sincronizacion", status: "error" },
          ],
        })
      );
      setPromoteMessage(`PR #${pullNumber} cerrado.`);
      await refreshMergeStatuses();
    } catch (err) {
      setSyncPipelineFromPayload(err?.payload || null, syncPipelineState, true);
      setPromoteProgressFromSyncPayload(err?.payload || {}, {
        toEnv: syncPipelineState?.toEnv,
        detail: err?.message || "No se pudo cerrar el PR.",
        status: "error",
        mergeAttempted: false,
      });
      setPromoteMessage(err?.message || "No se pudo cerrar el PR.");
    } finally {
      setSyncPipelineActionId("");
    }
  };

  const handleMergeRelease = async ({
    envKey,
    semver,
    source = "card",
  }) => {
    if (!activeProductKey || !envKey || !semver) {
      setDeployMessage("Faltan datos para ejecutar merge.");
      return;
    }
    if (!DEPLOYABLE_PRODUCTS.includes(activeProductKey) || !DEPLOY_ENV_OPTIONS.includes(envKey)) {
      setDeployMessage("Merge disponible solo para staging/prod en REFERIDOS PWA y PRELAUNCH WEB.");
      return;
    }

    const currentActionId = actionKey("merge", source, envKey, semver);
    setMergingActionId(currentActionId);
    setEnvCardMessages((current) => ({ ...current, [envKey]: "" }));
    setPromoteProgressForEnv(
      envKey,
      buildMergeProgress({
        status: "running",
        detail: `Iniciando merge de ${semver} hacia ${normalizeEnvLabel(envKey)}...`,
        checks: null,
        prCreated: false,
        releaseSynced: false,
        mergeAttempted: false,
      })
    );

    try {
      const result = await syncReleaseBranch({
        productKey: activeProductKey,
        toEnv: envKey,
        semver,
      });
      setSyncPipelineFromPayload(
        result,
        {
          productKey: activeProductKey,
          toEnv: envKey,
          semver,
          source,
        },
        false
      );
      setPromoteProgressForEnv(
        envKey,
        buildMergeProgress({
          status: "success",
          detail: `Release ${semver} mergeada a ${normalizeEnvLabel(envKey)}.`,
          checks: result?.checks || null,
          prCreated: Boolean(result?.pr),
          releaseSynced: true,
          mergeAttempted: true,
        })
      );
      setEnvCardMessages((current) => ({
        ...current,
        [envKey]: `Release ${semver} mergeada a ${normalizeEnvLabel(envKey)} (${result?.branches?.target || "-"})`,
      }));
      await load(true);
      await refreshMergeStatuses();
    } catch (err) {
      setSyncPipelineFromPayload(
        err?.payload || null,
        {
          productKey: activeProductKey,
          toEnv: envKey,
          semver,
          source,
        },
        true
      );
      setPromoteProgressForEnv(
        envKey,
        buildMergeProgress({
          status: "error",
          detail: err?.message || "No se pudo hacer merge a la rama destino.",
          checks: err?.payload?.checks || null,
          prCreated: Boolean(err?.payload?.pr),
          releaseSynced: false,
          mergeAttempted: true,
        })
      );
      setEnvCardMessages((current) => ({
        ...current,
        [envKey]: err?.message || "No se pudo hacer merge a la rama destino.",
      }));
      await refreshMergeStatuses();
    } finally {
      setMergingActionId("");
    }
  };

  const handlePromoteVersion = async ({
    semver,
    fromEnv = promoteSourceEnv,
    toEnv = promoteTargetEnv,
    source = "list",
    notes = "",
    syncRelease = false,
  }) => {
    if (!activeProductKey || !semver) {
      setPromoteMessage("Selecciona una version valida para promover.");
      return;
    }

    const currentActionId = actionKey("promote", source, fromEnv, toEnv, semver);
    setPromotingActionId(currentActionId);
    setPromoteMessage("");
    setPromoteProgressForEnv(
      toEnv,
      createProgressState({
        status: "running",
        headline: "Promoting",
        detail: `Promoviendo ${semver} de ${normalizeEnvLabel(fromEnv)} a ${normalizeEnvLabel(toEnv)}...`,
        steps: [
          { key: "promote", label: "Promover release en OPS", status: "running" },
          { key: "pr", label: "Crear / actualizar PR de sincronizacion", status: "pending" },
          { key: "lint", label: "Check lint", status: "pending" },
          { key: "test", label: "Check test", status: "pending" },
          { key: "build", label: "Check build", status: "pending" },
          { key: "merge", label: "Merge PR", status: "pending" },
          { key: "verify", label: "Verificar release en rama destino", status: "pending" },
        ],
      })
    );

    try {
      await promoteRelease({
        productKey: activeProductKey,
        fromEnv,
        toEnv,
        semver,
        notes,
      });

      if (!syncRelease) {
        setPromoteProgressForEnv(
          toEnv,
          createProgressState({
            status: "success",
            headline: "Promote completado",
            detail: `Release ${semver} promovida (sin merge automatico).`,
            steps: [{ key: "promote", label: "Promover release en OPS", status: "success" }],
          })
        );
      }

      if (syncRelease) {
        if (!DEPLOYABLE_PRODUCTS.includes(activeProductKey) || !DEPLOY_ENV_OPTIONS.includes(toEnv)) {
          setPromoteProgressForEnv(
            toEnv,
            createProgressState({
              status: "error",
              headline: "Promote completado con advertencia",
              detail: "Merge automatico no disponible para esta app/entorno.",
              steps: [
                { key: "promote", label: "Promover release en OPS", status: "success" },
                { key: "pr", label: "Crear / actualizar PR de sincronizacion", status: "error" },
              ],
            })
          );
          setPromoteMessage(
            `Release ${semver} promovida de ${fromEnv} a ${toEnv}. Merge automatico no disponible para esta app/entorno.`
          );
          setPromoteDraft(null);
          await load(true);
          return;
        }

        setPromoteProgressFromSyncPayload(
          {},
          {
            toEnv,
            detail: "Release promovida en OPS. Creando/actualizando PR...",
            status: "running",
          }
        );

        try {
          const syncResult = await syncReleaseBranch({
            productKey: activeProductKey,
            fromEnv,
            toEnv,
            semver,
            autoMerge: true,
            createPr: true,
          });
          setSyncPipelineFromPayload(
            syncResult,
            {
              productKey: activeProductKey,
              toEnv,
              semver,
              source,
            },
            false
          );
          setPromoteProgressFromSyncPayload(syncResult, {
            toEnv,
            detail: `Release ${semver} sincronizada por PR.`,
            status: "success",
            mergeAttempted: true,
          });
          setPromoteMessage(
            `Release ${semver} promovida de ${fromEnv} a ${toEnv} y sincronizada por PR a rama destino (${syncResult?.branches?.target || "-"}).`
          );
          setPromoteDraft(null);
          await load(true);
          return;
        } catch (syncErr) {
          setSyncPipelineFromPayload(
            syncErr?.payload || null,
            {
              productKey: activeProductKey,
              toEnv,
              semver,
              source,
            },
            true
          );
          setPromoteProgressFromSyncPayload(syncErr?.payload || {}, {
            toEnv,
            detail: syncErr?.message || "No se pudo sincronizar release por PR.",
            status: "error",
            mergeAttempted: true,
          });
          const checks = syncErr?.payload?.checks || null;
          const checksText = checks
            ? ` Checks: lint=${checks.lint || "-"}, test=${checks.test || "-"}, build=${checks.build || "-"}.`
            : "";
          const prNumber = syncErr?.payload?.pr?.number || null;
          const prText = prNumber ? ` PR #${prNumber}.` : "";
          setPromoteMessage(
            `Release ${semver} promovida de ${fromEnv} a ${toEnv}, pero no se pudo subir a la rama destino: ${
              syncErr?.message || "error de sync"
            }.${prText}${checksText}`
          );
          setPromoteDraft(null);
          await load(true);
          return;
        }
      }

      setPromoteMessage(`Release ${semver} promovida de ${fromEnv} a ${toEnv} (sin merge automatico).`);
      setPromoteDraft(null);
      await load(true);
    } catch (err) {
      setPromoteProgressForEnv(
        toEnv,
        createProgressState({
          status: "error",
          headline: "Promoting",
          detail: err?.message || "No se pudo promover la release.",
          steps: [{ key: "promote", label: "Promover release en OPS", status: "error" }],
        })
      );
      setPromoteMessage(err?.message || "No se pudo promover la release.");
    } finally {
      setPromotingActionId("");
    }
  };

  const handleCheckReleaseGateByVersion = async ({
    envKey,
    semver,
    source = "history",
  }) => {
    if (!activeProductKey || !envKey || !semver) return null;

    const actionId = actionKey("gate-check", source, envKey, semver);
    setMigrationGateActionId(actionId);
    setDeployMessage("");
    try {
      const result = await checkReleaseMigrations({
        productKey: activeProductKey,
        envKey,
        semver,
      });

      const gateState = {
        ...result,
        env_key: envKey,
        semver,
        checked_at: new Date().toISOString(),
      };
      setDeployMigrationGate(gateState);

      const missingCount = Array.isArray(result?.missing_versions)
        ? result.missing_versions.length
        : 0;
      if (result?.gate_passed) {
        setDeployMessage(`Gate de migraciones OK para ${envKey} ${semver}.`);
      } else {
        setDeployMessage(
          `Gate bloqueado para ${envKey} ${semver}. Faltan ${missingCount} migracion(es).`
        );
      }
      return gateState;
    } catch (err) {
      const payload = err?.payload || {};
      const gateState = {
        gate_passed: false,
        env_key: envKey,
        semver,
        checked_at: new Date().toISOString(),
        error: err?.code || payload?.error || "check_release_migrations_failed",
        detail: err?.message || payload?.detail || "No se pudo validar gate de migraciones.",
        missing_versions: Array.isArray(payload?.missing_versions) ? payload.missing_versions : [],
        missing_migrations: Array.isArray(payload?.missing_migrations)
          ? payload.missing_migrations
          : [],
      };
      setDeployMigrationGate(gateState);
      setDeployMessage(gateState.detail || "No se pudo validar gate de migraciones.");
      throw err;
    } finally {
      setMigrationGateActionId("");
    }
  };

  const handleApplyMigrationsForCurrentGate = async () => {
    const gate = deployMigrationGate || null;
    const envKey = String(gate?.env_key || deployTargetEnv || "").toLowerCase();
    const semver = String(gate?.semver || "").trim();
    if (!activeProductKey || !envKey || !semver) {
      setDeployMessage("No hay release seleccionada para aplicar migraciones.");
      return;
    }

    const actionId = actionKey("gate-apply", envKey, semver);
    setMigrationApplyActionId(actionId);
    setDeployMessage("");
    try {
      const result = await applyReleaseMigrations({
        productKey: activeProductKey,
        envKey,
        semver,
        sourceBranch: gate?.release?.source_branch || "",
        targetBranch: "",
      });

      const logsUrl = String(result?.logs_url || "").trim();
      if (result?.already_applied) {
        setDeployMessage(`No habia migraciones pendientes para ${envKey} ${semver}.`);
      } else {
        setDeployMessage(
          `Apply migrations disparado para ${envKey} ${semver}.${logsUrl ? ` Logs: ${logsUrl}` : ""}`
        );
      }

      const refreshedGate = await checkReleaseMigrations({
        productKey: activeProductKey,
        envKey,
        semver,
      });
      setDeployMigrationGate({
        ...refreshedGate,
        env_key: envKey,
        semver,
        checked_at: new Date().toISOString(),
      });
    } catch (err) {
      setDeployMessage(err?.message || "No se pudo disparar apply migrations.");
    } finally {
      setMigrationApplyActionId("");
    }
  };

  const handleValidateEnvironment = async () => {
    if (!activeProductKey || !deployTargetEnv) {
      setDeployMessage("Selecciona producto y entorno para validar.");
      return;
    }

    setEnvValidationLoading(true);
    setDeployMessage("");
    try {
      const validation = await validateEnvironmentContract({
        productKey: activeProductKey,
        envKey: deployTargetEnv,
      });
      setEnvValidationState(validation);
      setDeployMessage(validation?.summary || "Validacion de entorno completada.");
    } catch (err) {
      setEnvValidationState({
        validation_ok: false,
        summary: err?.message || "No se pudo validar entorno.",
        details: err?.payload || null,
      });
      setDeployMessage(err?.message || "No se pudo validar entorno.");
    } finally {
      setEnvValidationLoading(false);
    }
  };

  const handleDeployByVersion = async ({
    envKey,
    semver,
    source = "history",
    notes = "",
  }) => {
    setDeployMessage("");
    if (!activeProductKey || !envKey || !semver) {
      setDeployMessage("Faltan datos para ejecutar deploy.");
      return;
    }
    if (!DEPLOYABLE_PRODUCTS.includes(activeProductKey)) {
      setDeployMessage(
        "Deploy por artifact exacto disponible solo para REFERIDOS PWA y PRELAUNCH WEB."
      );
      return;
    }
    if (!DEPLOY_ENV_OPTIONS.includes(envKey)) {
      setDeployMessage("Deploy solo permitido en staging o prod.");
      return;
    }

    const currentActionId = actionKey("deploy", source, envKey, semver);
    setDeployingActionId(currentActionId);
    setReleaseOpsMode("deploy");
    setDeployTargetEnv(envKey);

    let normalizedRequestId = "";
    let currentStage = "gate";
    const deployStepStatus = {
      gate: "running",
      sync: "pending",
      request: "pending",
      pipeline: "pending",
      verify: "pending",
    };
    const updateDeployProgress = (status = "running", detail = "") => {
      setPromoteProgressForEnv(
        envKey,
        createDeployProgress({
          status,
          detail,
          stepStatus: deployStepStatus,
        })
      );
    };
    updateDeployProgress(
      "running",
      `Iniciando deploy de ${semver} hacia ${normalizeEnvLabel(envKey)}...`
    );

    try {
      const gateResult = await handleCheckReleaseGateByVersion({
        envKey,
        semver,
        source: `${source}-predeploy`,
      });
      if (!gateResult?.gate_passed) {
        deployStepStatus.gate = "error";
        updateDeployProgress(
          "error",
          gateResult?.detail || "Gate de migraciones no aprobado."
        );
        return;
      }
      deployStepStatus.gate = "success";
      deployStepStatus.sync = "running";
      updateDeployProgress("running", "Gate de migraciones OK. Sincronizando release...");

      currentStage = "sync";
      await syncReleaseBranch({
        productKey: activeProductKey,
        toEnv: envKey,
        semver,
      });
      deployStepStatus.sync = "success";
      deployStepStatus.request = "running";
      updateDeployProgress("running", "Release sincronizada. Resolviendo request de deploy...");
      currentStage = "request";

      const existingRequest = selectedProductDeployRequests.find(
        (row) =>
          row.env_key === envKey &&
          row.version_label === semver &&
          ["pending", "approved"].includes(String(row.status || "").toLowerCase())
      );

      if (existingRequest?.id) {
        normalizedRequestId = existingRequest.id;
      } else {
        const requestId = await requestDeploy({
          productKey: activeProductKey,
          envKey,
          semver,
          actor: "admin-ui-direct",
          notes: notes || deployNotes,
          metadata: {
            trigger: "admin_list_deploy",
            source,
          },
        });

        normalizedRequestId =
          typeof requestId === "string"
            ? requestId
            : requestId?.request_id || requestId?.id || "";
      }

      if (!normalizedRequestId) {
        throw new Error("No se pudo resolver request_id para ejecutar deploy.");
      }

      deployStepStatus.request = "success";
      deployStepStatus.pipeline = "running";
      updateDeployProgress("running", "Request listo. Ejecutando pipeline de deploy...");

      setActiveDeployRequestId(normalizedRequestId);
      currentStage = "pipeline";
      const result = await triggerDeployPipeline({
        requestId: normalizedRequestId,
        forceAdminOverride: true,
        syncRelease: false,
        syncOnly: false,
      });

      deployStepStatus.pipeline = "success";
      deployStepStatus.verify = "success";
      updateDeployProgress(
        "success",
        `Deploy ejecutado (${envKey} ${semver}). deployment_id=${result?.deployment_id || "-"}`
      );
      setDeploySyncRequired(null);
      setActiveDeployRequestId("");
      setDeployMessage(
        `Deploy ejecutado (${envKey} ${semver}). deployment_id=${result?.deployment_id || "-"}`
      );
      await load(true);
    } catch (err) {
      setSyncPipelineFromPayload(
        err?.payload || null,
        {
          productKey: activeProductKey,
          toEnv: envKey,
          semver,
          source,
        },
        true
      );
      if (err?.code === "release_sync_required") {
        deployStepStatus.sync = "error";
        updateDeployProgress(
          "error",
          err?.message ||
            "Este release aun no esta en la rama destino. Debes subir release antes de desplegar."
        );
        setDeploySyncRequired(err?.payload || null);
        setDeployMessage(
          err?.message ||
            "Este release aun no esta en la rama destino. Debes subir release antes de desplegar."
        );
        await load(true);
      } else {
        if (currentStage === "gate") deployStepStatus.gate = "error";
        else if (currentStage === "sync") deployStepStatus.sync = "error";
        else if (currentStage === "request") deployStepStatus.request = "error";
        else if (currentStage === "pipeline") deployStepStatus.pipeline = "error";
        updateDeployProgress(
          "error",
          err?.message || "No se pudo ejecutar deploy como admin."
        );
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

    const requestRow = (selectedProductDeployRequests || []).find(
      (row) => String(row.id || "") === String(requestId)
    );
    const toEnv = String(requestRow?.env_key || deployTargetEnv || "").toLowerCase();
    const semver = String(requestRow?.version_label || "").trim();

    setDeployingActionId("sync-release");
    try {
      if (!toEnv || !semver) {
        throw new Error("No se pudo resolver env/version para sincronizar release.");
      }

      const result = await syncReleaseBranch({
        productKey: activeProductKey,
        toEnv,
        semver,
        checkOnly: false,
        autoMerge: true,
        createPr: true,
      });
      setSyncPipelineFromPayload(
        result,
        {
          productKey: activeProductKey,
          toEnv,
          semver,
          source: "deploy-sync",
        },
        false
      );
      setDeploySyncRequired(null);
      const checks = result?.checks || null;
      const checksText = checks
        ? ` Checks: lint=${checks.lint || "-"}, test=${checks.test || "-"}, build=${checks.build || "-"}.`
        : "";
      const prNumber = result?.pr?.number || null;
      const prText = prNumber ? ` PR #${prNumber}.` : "";
      setDeployMessage(`Release sincronizada por PR a ${result?.branches?.target || "rama destino"}.${prText}${checksText} Ahora puedes hacer deploy.`);
      await load(true);
    } catch (err) {
      setSyncPipelineFromPayload(
        err?.payload || null,
        {
          productKey: activeProductKey,
          toEnv: toEnv || String(deployTargetEnv || "").toLowerCase(),
          semver,
          source: "deploy-sync",
        },
        true
      );
      const checks = err?.payload?.checks || null;
      const checksText = checks
        ? ` Checks: lint=${checks.lint || "-"}, test=${checks.test || "-"}, build=${checks.build || "-"}.`
        : "";
      const prNumber = err?.payload?.pr?.number || null;
      const prText = prNumber ? ` PR #${prNumber}.` : "";
      setDeployMessage(`${err?.message || "No se pudo sincronizar release por PR a la rama destino."}.${prText}${checksText}`);
    } finally {
      setDeployingActionId("");
    }
  };

  const requestCreateDevRelease = useCallback(async () => {
    setDevReleaseMessage("");
    setDevReleaseDraftError("");
    if (!activeProductKey) {
      setDevReleaseMessage("Selecciona una app para crear release de development.");
      return;
    }

    setCreatingDevRelease(true);
    try {
      const preview = await previewDevRelease({
        productKey: activeProductKey,
        ref: "dev",
      });

      setDevReleaseDraft({
        productKey: activeProductKey,
        productLabel: selectedProductLabel,
        ref: preview?.ref || "dev",
        currentSemver: preview?.current_semver || "-",
        suggestedSemver: preview?.suggested_semver || "",
        suggestedBump: preview?.suggested_bump || "patch",
        suggestionSource: preview?.suggestion_source || "unknown",
        shouldCreateRelease: preview?.should_create_release !== false,
        changedFilesCount: Number(preview?.changed_files_count || 0),
        changedFiles: Array.isArray(preview?.changed_files) ? preview.changed_files.slice(0, 12) : [],
        contractHits: Array.isArray(preview?.contract_hits) ? preview.contract_hits.slice(0, 8) : [],
        minorHits: Array.isArray(preview?.minor_hits) ? preview.minor_hits.slice(0, 8) : [],
        docOnly: preview?.doc_only === true,
        commitMessages: Array.isArray(preview?.commit_messages)
          ? preview.commit_messages.slice(0, 6)
          : [],
        mode: "suggested",
        customSemver: preview?.suggested_semver || "",
        notes: "",
      });
    } catch (err) {
      setDevReleaseMessage(
        err?.message || "No se pudo calcular la version sugerida para release de development."
      );
    } finally {
      setCreatingDevRelease(false);
    }
  }, [activeProductKey, selectedProductLabel]);

  const requestBackfillBuild = useCallback(
    ({ releaseId, semver, sourceCommitSha = "", source = "quick-dev-card" }) => {
      if (!releaseId) {
        setDevReleaseMessage("No se pudo resolver release_id para backfill.");
        return;
      }
      openConfirmDialog({
        title: "Confirmar backfill de build",
        copy: `Se generará artifact/bucket para la release ${semver || "-"} en DEVELOPMENT.`,
        confirmLabel: "Confirmar",
        action: {
          type: "backfill-build",
          payload: {
            releaseId,
            semver,
            sourceCommitSha,
            source,
          },
        },
      });
    },
    [openConfirmDialog]
  );

  const requestPromoteVersion = useCallback(
    ({ semver, fromEnv, toEnv, source = "list", notes = "" }) => {
      const canSyncMerge =
        DEPLOYABLE_PRODUCTS.includes(activeProductKey) &&
        DEPLOY_ENV_OPTIONS.includes(String(toEnv || "").toLowerCase());

      openConfirmDialog({
        title: "Confirmar promocion",
        copy: canSyncMerge
          ? `Vas a promover ${semver} desde ${normalizeEnvLabel(fromEnv)} hacia ${normalizeEnvLabel(
              toEnv
            )}. Tambien puedes subir esta release a la rama destino en el mismo paso.`
          : `Vas a promover ${semver} desde ${normalizeEnvLabel(fromEnv)} hacia ${normalizeEnvLabel(toEnv)}.`,
        confirmLabel: canSyncMerge ? "Continuar con merge" : "Confirmar",
        secondaryLabel: canSyncMerge ? "Continuar sin merge" : "",
        action: {
          type: "promote",
          payload: { semver, fromEnv, toEnv, source, notes, syncRelease: canSyncMerge },
        },
        secondaryAction: canSyncMerge
          ? {
              type: "promote",
              payload: { semver, fromEnv, toEnv, source, notes, syncRelease: false },
            }
          : null,
      });
    },
    [openConfirmDialog, activeProductKey]
  );

  const requestDeployVersion = useCallback(
    ({ envKey, semver, source = "history", notes = "" }) => {
      openConfirmDialog({
        title: "Confirmar deploy",
        copy: `Se ejecutara deploy de ${semver} hacia ${normalizeEnvLabel(envKey)}.`,
        confirmLabel: "Confirmar",
        action: {
          type: "deploy",
          payload: { envKey, semver, source, notes },
        },
      });
    },
    [openConfirmDialog]
  );

  const requestMergeVersion = useCallback(
    ({ envKey, semver, source = "card" }) => {
      openConfirmDialog({
        title: "Confirmar merge",
        copy: `Se intentara subir la release ${semver} hacia ${normalizeEnvLabel(envKey)} haciendo merge de ramas.`,
        confirmLabel: "Confirmar",
        action: {
          type: "merge-release",
          payload: { envKey, semver, source },
        },
      });
    },
    [openConfirmDialog]
  );

  const requestSyncRelease = useCallback(() => {
    openConfirmDialog({
      title: "Confirmar subida de release",
      copy: "El release aun no esta en la rama destino. Se intentara subir release para continuar con deploy.",
      confirmLabel: "Confirmar",
      action: {
        type: "sync-release",
      },
    });
  }, [openConfirmDialog]);

  const handleCreateDevRelease = async ({ overrideSemver = "", releaseNotes = "" } = {}) => {
    setDevReleaseMessage("");
    if (!activeProductKey) {
      setDevReleaseMessage("Selecciona una app para crear release de development.");
      return;
    }

    setCreatingDevRelease(true);
    setDevReleaseProgress(
      createDevReleaseProgress({
        status: "running",
        headline: "Releasing",
        detail: "Iniciando release de DEVELOPMENT...",
        stepStatus: {
          dispatch: "running",
          workflow: "pending",
          detect: "pending",
          refresh: "pending",
        },
      })
    );
    try {
      const previousDevRelease = (latestReleases || []).find(
        (row) =>
          String(row.product_key || "") === String(activeProductKey || "") &&
          String(row.env_key || "").toLowerCase() === "dev"
      );

      const result = await createDevRelease({
        productKey: activeProductKey,
        ref: "dev",
        overrideSemver: overrideSemver || "",
        releaseNotes: releaseNotes || "",
      });
      setDevReleaseMessage(
        "Releasing..."
      );
      setDevReleaseProgress(
        createDevReleaseProgress({
          status: "running",
          headline: "Releasing",
          detail: "Building...",
          stepStatus: {
            dispatch: "success",
            workflow: "running",
            detect: "pending",
            refresh: "pending",
          },
        })
      );
      setDevReleaseSyncing({
        mode: "release",
        productKey: activeProductKey,
        ref: result?.ref || "dev",
        runId: Number(result?.run?.id || 0),
        dispatchStartedAt:
          String(result?.dispatch_started_at || "").trim() ||
          new Date().toISOString(),
        hadPreviousRelease: Boolean(previousDevRelease),
        previousVersionLabel: previousDevRelease
          ? String(previousDevRelease.version_label || "").trim()
          : "",
        previousSourceCommitSha: previousDevRelease
          ? String(previousDevRelease.source_commit_sha || "").trim()
          : "",
        startedAt: Date.now(),
      });
      setDevReleaseDraft(null);
      setDevReleaseDraftError("");
    } catch (err) {
      setDevReleaseMessage(err?.message || "No se pudo crear release de development.");
      setDevReleaseProgress(
        createDevReleaseProgress({
          status: "error",
          headline: "Release DEVELOPMENT con error",
          detail: err?.message || "No se pudo crear release de development.",
          stepStatus: {
            dispatch: "error",
            workflow: "pending",
            detect: "pending",
            refresh: "pending",
          },
        })
      );
      setDevReleaseSyncing(null);
    } finally {
      setCreatingDevRelease(false);
    }
  };

  const handleBackfillDevArtifact = useCallback(async ({
    releaseId = "",
    semver = "",
    sourceCommitSha = "",
  } = {}) => {
    const resolvedReleaseId = String(releaseId || "").trim();
    const resolvedSemver = String(semver || "").trim();
    if (!resolvedReleaseId) {
      setDevReleaseMessage("release_id inválido para backfill.");
      return;
    }
    if (!activeProductKey) {
      setDevReleaseMessage("Selecciona una app para ejecutar backfill de build.");
      return;
    }

    const currentActionId = actionKey(
      "backfill-build",
      "dev",
      activeProductKey,
      resolvedSemver || resolvedReleaseId
    );

    setBackfillActionId(currentActionId);
    setDevReleaseMessage("");
    setDevReleaseProgress(
      createBackfillProgress({
        status: "running",
        headline: "Backfilling build",
        detail: "Iniciando backfill de build para DEVELOPMENT...",
        stepStatus: {
          dispatch: "running",
          workflow: "pending",
          detect: "pending",
          refresh: "pending",
        },
      })
    );

    try {
      const result = await backfillReleaseArtifact({
        releaseId: resolvedReleaseId,
        productKey: activeProductKey,
        ref: "dev",
        sourceCommitSha,
      });

      setDevReleaseMessage(
        "Building..."
      );
      setDevReleaseProgress(
        createBackfillProgress({
          status: "running",
          headline: "Backfilling build",
          detail: "Building...",
          stepStatus: {
            dispatch: "success",
            workflow: "running",
            detect: "pending",
            refresh: "pending",
          },
        })
      );

      setDevReleaseSyncing({
        mode: "backfill_artifact",
        productKey: activeProductKey,
        ref: result?.ref || "dev",
        runId: Number(result?.run?.id || 0),
        dispatchStartedAt:
          String(result?.dispatch_started_at || "").trim() || new Date().toISOString(),
        targetReleaseId: resolvedReleaseId,
        targetVersionLabel: resolvedSemver,
        startedAt: Date.now(),
      });
    } catch (err) {
      setDevReleaseMessage(err?.message || "No se pudo ejecutar backfill de build.");
      setDevReleaseProgress(
        createBackfillProgress({
          status: "error",
          headline: "Backfill build con error",
          detail: err?.message || "No se pudo ejecutar backfill de build.",
          stepStatus: {
            dispatch: "error",
            workflow: "pending",
            detect: "pending",
            refresh: "pending",
          },
        })
      );
      setDevReleaseSyncing(null);
    } finally {
      setBackfillActionId("");
    }
  }, [activeProductKey]);

  useEffect(() => {
    if (loading || refreshing) return;
    if (!activeProductKey || !isActiveProductInitialized) return;
    if (!Array.isArray(envCards) || !envCards.length) return;
    if (creatingDevRelease || devReleaseSyncing || backfillActionId) return;

    const devRow = envCards.find((row) => String(row?.env_key || "").toLowerCase() === "dev");
    if (!devRow) return;

    const releaseId = String(devRow?.id || "").trim();
    const releaseVersion = String(devRow?.version_label || "").trim();
    const normalizedStatus = normalizeReleaseStatus("dev", devRow?.status);
    const hasValidVersion = Boolean(releaseVersion && releaseVersion !== "-");
    const canBackfill =
      normalizedStatus === "released" &&
      hasValidVersion &&
      !devPreviewHasPendingRelease &&
      Boolean(releaseId) &&
      !artifactReleaseIdSet.has(releaseId);

    if (!canBackfill) return;

    const attemptKey = `${activeProductKey}::${releaseId}`;
    if (autoBackfillAttemptedRef.current.has(attemptKey)) return;
    autoBackfillAttemptedRef.current.add(attemptKey);

    handleBackfillDevArtifact({
      releaseId,
      semver: releaseVersion,
      sourceCommitSha: String(devRow?.source_commit_sha || ""),
    });
  }, [
    loading,
    refreshing,
    activeProductKey,
    isActiveProductInitialized,
    envCards,
    creatingDevRelease,
    devReleaseSyncing,
    backfillActionId,
    devPreviewHasPendingRelease,
    artifactReleaseIdSet,
    handleBackfillDevArtifact,
  ]);

  const closeDevReleaseDraft = () => {
    if (creatingDevRelease) return;
    setDevReleaseDraft(null);
    setDevReleaseDraftError("");
  };

  const submitDevReleaseDraft = async () => {
    if (!devReleaseDraft) return;
    setDevReleaseDraftError("");

    const mode = devReleaseDraft.mode === "custom" ? "custom" : "suggested";
    const customSemver = String(devReleaseDraft.customSemver || "").trim();
    const currentSemver = String(devReleaseDraft.currentSemver || "").trim();
    const suggestedSemver = String(devReleaseDraft.suggestedSemver || "").trim();

    if (mode === "custom") {
      if (!parseSemverLabel(customSemver)) {
        setDevReleaseDraftError("La version manual debe tener formato X.Y.Z.");
        return;
      }
      if (parseSemverLabel(currentSemver) && compareSemverLabel(customSemver, currentSemver) <= 0) {
        setDevReleaseDraftError(`La version manual debe ser mayor que ${currentSemver}.`);
        return;
      }
    } else if (!suggestedSemver || !parseSemverLabel(suggestedSemver)) {
      setDevReleaseDraftError("No hay version sugerida valida para crear release.");
      return;
    }

    if (devReleaseDraft.shouldCreateRelease === false && mode !== "custom") {
      setDevReleaseDraftError("No hay cambios suficientes para crear release con la sugerida.");
      return;
    }

    const overrideSemver = mode === "custom" ? customSemver : "";
    const releaseNotes = String(devReleaseDraft.notes || "").trim();
    await handleCreateDevRelease({
      overrideSemver,
      releaseNotes,
    });
  };

  const runConfirmAction = async (action) => {
    if (!action) return;
    const { type, payload } = action;
    if (type === "promote") {
      await handlePromoteVersion(payload || {});
    } else if (type === "backfill-build") {
      await handleBackfillDevArtifact(payload || {});
    } else if (type === "deploy") {
      await handleDeployByVersion(payload || {});
    } else if (type === "sync-release") {
      await handleSyncRelease();
    } else if (type === "merge-release") {
      await handleMergeRelease(payload || {});
    }
  };

  const handleConfirmAction = async () => {
    if (!confirmDialog?.action) return;
    setConfirmLoading(true);
    try {
      await runConfirmAction(confirmDialog.action);
      setConfirmDialog(null);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleSecondaryConfirmAction = async () => {
    if (!confirmDialog?.secondaryAction) return;
    setConfirmLoading(true);
    try {
      await runConfirmAction(confirmDialog.secondaryAction);
      setConfirmDialog(null);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleApproveRequest = async (requestId, forceAdminOverride = false) => {
    setApprovalMessage("");
    setDeployingActionId(`approve-${requestId}`);
    try {
      const result = await approveDeployRequest({
        requestId,
        forceAdminOverride,
      });
      const status = String(result?.status || "").toLowerCase();
      if (result?.already_processed || (status && status !== "pending")) {
        setApprovalMessage(`La solicitud ya no estaba pendiente (estado actual: ${status || "desconocido"}).`);
      } else {
        setApprovalMessage(
          forceAdminOverride
            ? "Solicitud aprobada con admin override."
            : "Solicitud aprobada correctamente."
        );
      }
      await load(true);
    } catch (err) {
      setApprovalMessage(err?.message || "No se pudo aprobar la solicitud.");
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

  const pipelineChecks = syncPipelineState?.checks || null;
  const pipelinePrNumber = Number(syncPipelineState?.pr?.number || 0);
  const pipelineChecksGreen = pipelineChecks?.required_green === true;
  const pipelineHasConflicts =
    syncPipelineState?.pr?.mergeable === false ||
    String(syncPipelineState?.errorCode || "") === "pr_has_conflicts";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-2">
          <div className="inline-flex rounded-xl border border-[#E9E2F7] bg-white p-1">
            <button
              type="button"
              onClick={() => setVersioningTab("pipeline")}
              className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                versioningTab === "pipeline" ? "bg-[#2F1A55] text-white" : "text-slate-500"
              }`}
            >
              Flujo release
            </button>
            <button
              type="button"
              onClick={() => setVersioningTab("artifacts")}
              className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                versioningTab === "artifacts" ? "bg-[#2F1A55] text-white" : "text-slate-500"
              }`}
            >
              Builds
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {orderedProducts.map((product) => {
              const disabled = !product.initializedInDev;
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => {
                    if (disabled) return;
                    setActiveProductKey(product.product_key);
                  }}
                  disabled={disabled}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    activeProductKey === product.product_key
                      ? "border-[#2F1A55] bg-[#2F1A55] text-white"
                      : disabled
                        ? "border-[#EEE8F8] bg-[#FAF8FF] text-slate-400"
                        : "border-[#E9E2F7] bg-white text-[#2F1A55]"
                  }`}
                >
                  {normalizeProductLabel(product)}
                </button>
              );
            })}
          </div>
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
      ) : versioningTab === "artifacts" ? (
        <VersioningArtifactsPanel
          activeProductKey={activeProductKey}
          selectedProductLabel={selectedProductLabel}
        />
      ) : (
        <>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-lg font-semibold text-[#2F1A55]">
              <Activity size={15} />
              Releases actuales
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {envCards.map((row) => {
                const envKey = String(row.env_key || "").toLowerCase();
                const releaseId = String(row.id || "").trim();
                const normalizedStatus = normalizeReleaseStatus(envKey, row.status);
                const releaseVersion = String(row.version_label || "").trim();
                const hasValidVersion = releaseVersion && releaseVersion !== "-";
                const hasArtifactForRelease = releaseId
                  ? artifactReleaseIdSet.has(releaseId)
                  : false;
                const artifactRowForRelease = releaseId
                  ? artifactByReleaseId.get(releaseId) || null
                  : null;
                const buildDisplay = row.build_number
                  ? String(row.build_number)
                  : hasArtifactForRelease
                    ? "artifact"
                    : "-";
                const deployStateForCard =
                  DEPLOY_ENV_OPTIONS.includes(envKey) && hasValidVersion
                    ? getDeploymentStateForVersion(envKey, releaseVersion)
                    : "";
                const mergeStateForCard =
                  DEPLOY_ENV_OPTIONS.includes(envKey) && hasValidVersion
                    ? getMergeStatusForVersion(envKey, releaseVersion)
                    : null;
                const isMergedForCard = mergeStateForCard?.merged === true;

                const actions = [];

                if (!isActiveProductInitialized) {
                  // no-op
                } else if (envKey === "dev") {
                  const showReleaseAction =
                    devPreviewHasPendingRelease ||
                    (normalizedStatus !== "released" && normalizedStatus !== "promoted");
                  const showPromoteAction =
                    normalizedStatus === "released" &&
                    hasValidVersion;
                  const showBackfillAction =
                    showPromoteAction && !hasArtifactForRelease && Boolean(releaseId);

                  if (showReleaseAction) {
                    const releaseActionId = actionKey("release", "quick-dev-card", releaseVersion || "pending");
                    actions.push({
                      key: releaseActionId,
                      label: "Release",
                      loadingLabel: "Creando...",
                      loading: creatingDevRelease,
                      disabled: creatingDevRelease,
                      onClick: requestCreateDevRelease,
                    });
                  }
                  if (showBackfillAction) {
                    const backfillBuildActionId = actionKey(
                      "backfill-build",
                      "quick-dev-card",
                      "dev",
                      releaseVersion || releaseId
                    );
                    actions.push({
                      key: backfillBuildActionId,
                      label: "Backfill build",
                      loadingLabel: "Backfilling...",
                      loading: backfillActionId === backfillBuildActionId,
                      disabled: backfillActionId === backfillBuildActionId,
                      onClick: () =>
                        requestBackfillBuild({
                          releaseId,
                          semver: releaseVersion,
                          sourceCommitSha: String(row.source_commit_sha || ""),
                          source: "quick-dev-card",
                        }),
                    });
                  }
                  if (showPromoteAction) {
                    const promoteActionId = actionKey(
                      "promote",
                      "quick-dev-card",
                      "dev",
                      "staging",
                      releaseVersion
                    );
                    actions.push({
                      key: promoteActionId,
                      label: "Promote",
                      loadingLabel: "Promoviendo...",
                      loading: promotingActionId === promoteActionId,
                      disabled: promotingActionId === promoteActionId,
                      onClick: () =>
                        requestPromoteVersion({
                          semver: releaseVersion,
                          fromEnv: "dev",
                          toEnv: "staging",
                          source: "quick-dev-card",
                        }),
                    });
                  }
                } else if (
                  DEPLOY_ENV_OPTIONS.includes(envKey) &&
                  DEPLOYABLE_PRODUCTS.includes(activeProductKey) &&
                  hasValidVersion
                ) {
                  if (!isMergedForCard) {
                    const mergeActionId = actionKey("merge", "quick-card", envKey, releaseVersion);
                    actions.push({
                      key: mergeActionId,
                      label: "Merge",
                      loadingLabel: "Mergeando...",
                      loading: mergingActionId === mergeActionId,
                      disabled: mergingActionId === mergeActionId || mergeStateForCard?.checking === true,
                      onClick: () =>
                        requestMergeVersion({
                          envKey,
                          semver: releaseVersion,
                          source: "quick-card",
                        }),
                    });
                  }

                  if (envKey === "staging" && normalizedStatus === "approved") {
                    const promoteActionId = actionKey(
                      "promote",
                      "quick-staging-card",
                      "staging",
                      "prod",
                      releaseVersion
                    );
                    actions.push({
                      key: promoteActionId,
                      label: "Promote",
                      loadingLabel: "Promoviendo...",
                      loading: promotingActionId === promoteActionId,
                      disabled: promotingActionId === promoteActionId,
                      onClick: () =>
                        requestPromoteVersion({
                          semver: releaseVersion,
                          fromEnv: "staging",
                          toEnv: "prod",
                          source: "quick-staging-card",
                        }),
                    });
                  }

                  const isRedeploy = deployStateForCard === "deployed";
                  const deployActionId = actionKey(
                    isRedeploy ? "redeploy" : "deploy",
                    "quick-card",
                    envKey,
                    releaseVersion
                  );
                  actions.push({
                    key: deployActionId,
                    label: isRedeploy ? "Redeploy" : "Deploy",
                    loadingLabel: "Ejecutando...",
                    loading: deployingActionId === deployActionId,
                    disabled: deployingActionId === deployActionId,
                    onClick: () =>
                      requestDeployVersion({
                        envKey,
                        semver: releaseVersion,
                        source: "quick-card",
                        notes: isRedeploy ? "quick_env_card_redeploy" : "quick_env_card",
                      }),
                  });
                }

                return (
                  <VersionCard
                    key={`${row.product_key}-${row.env_key}`}
                    row={row}
                    actions={actions}
                    deployState={deployStateForCard}
                    mergeState={mergeStateForCard}
                    hasArtifact={hasArtifactForRelease}
                    buildDisplay={buildDisplay}
                    message={
                      envCardMessages[envKey] ||
                      (envKey === "dev"
                        ? devReleaseMessage || devPreviewSummaryMessage
                        : "")
                    }
                    progressState={
                      envKey === "dev"
                        ? devReleaseProgress
                        : promoteProgressByEnv[String(envKey || "").toLowerCase()] || null
                    }
                    disabled={!isActiveProductInitialized}
                  />
                );
              })}
            </div>
            {!isActiveProductInitialized ? (
              <div className="rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-600">
                Esta app aun no esta inicializada. Ejecuta bootstrap por producto para habilitar release/promote/deploy.
              </div>
            ) : null}
          </div>

          <div
            className={`rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm space-y-3 ${
              isActiveProductInitialized ? "" : "opacity-60"
            }`}
          >
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
                    <span
                      className={`rounded-full px-2 py-1 text-[11px] font-semibold ${statusBadgeClass(
                        row.status
                      )}`}
                    >
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
                            onClick={() => handleApproveRequest(row.id, true)}
                            disabled={!isActiveProductInitialized || deployingActionId === `approve-${row.id}`}
                            className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700 disabled:opacity-60"
                          >
                            <CheckCircle2 size={12} />
                            Aprobar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRejectRequest(row.id)}
                            disabled={!isActiveProductInitialized || deployingActionId === `reject-${row.id}`}
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

          <div
            className={`rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm space-y-3 ${
              isActiveProductInitialized ? "" : "opacity-60 pointer-events-none"
            }`}
          >
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

            {syncPipelineState ? (
              <div className="rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs font-semibold text-[#2F1A55]">
                    Pipeline PR {pipelinePrNumber ? `#${pipelinePrNumber}` : ""} ({normalizeEnvLabel(syncPipelineState?.toEnv || "-")})
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {syncPipelineState?.semver ? `Release ${syncPipelineState.semver}` : "-"}
                  </div>
                </div>

                <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                  <div className="rounded-lg border border-[#E9E2F7] bg-white px-2 py-1 text-[11px] text-slate-600">
                    PR creado:{" "}
                    <span className={syncPipelineState?.pr ? "text-emerald-700 font-semibold" : "text-red-700 font-semibold"}>
                      {syncPipelineState?.pr ? "SI" : "NO"}
                    </span>
                  </div>
                  <div className="rounded-lg border border-[#E9E2F7] bg-white px-2 py-1 text-[11px] text-slate-600">
                    Conflictos:{" "}
                    <span className={pipelineHasConflicts ? "text-red-700 font-semibold" : "text-emerald-700 font-semibold"}>
                      {pipelineHasConflicts ? "SI" : "NO"}
                    </span>
                  </div>
                  {["lint", "test", "build"].map((checkKey) => {
                    const state = normalizeCheckState(pipelineChecks?.[checkKey]);
                    return (
                      <div key={`pipeline-check-${checkKey}`} className="rounded-lg border border-[#E9E2F7] bg-white px-2 py-1 text-[11px] text-slate-600">
                        <span className="mr-1 uppercase tracking-[0.08em] text-slate-500">{checkKey}:</span>
                        <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${checkBadgeClass(state)}`}>
                          {checkBadgeLabel(state)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {syncPipelineState?.detail ? (
                  <div className="mt-2 text-[11px] text-slate-600">{syncPipelineState.detail}</div>
                ) : null}

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePipelineRefreshChecks}
                    disabled={syncPipelineActionId === "refresh" || !pipelinePrNumber}
                    className="rounded-lg border border-[#E9E2F7] bg-white px-2 py-1 text-[11px] font-semibold text-[#5E30A5] disabled:opacity-60"
                  >
                    {syncPipelineActionId === "refresh" ? "Reintentando..." : "Reintentar checks"}
                  </button>
                  <button
                    type="button"
                    onClick={handlePipelineAutoMerge}
                    disabled={
                      syncPipelineActionId === "auto-merge" ||
                      !pipelinePrNumber ||
                      pipelineHasConflicts ||
                      !pipelineChecks ||
                      !pipelineChecksGreen
                    }
                    className="rounded-lg border border-[#E9E2F7] bg-[#2F1A55] px-2 py-1 text-[11px] font-semibold text-white disabled:opacity-60"
                  >
                    {syncPipelineActionId === "auto-merge" ? "Mergeando..." : "Auto-merge cuando esté verde"}
                  </button>
                  <button
                    type="button"
                    onClick={handlePipelineCancel}
                    disabled={syncPipelineActionId === "cancel" || !pipelinePrNumber}
                    className="rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-[11px] font-semibold text-red-700 disabled:opacity-60"
                  >
                    {syncPipelineActionId === "cancel" ? "Cancelando..." : "Cancelar PR"}
                  </button>
                  <div className="text-[11px] text-slate-500">
                    {pipelineChecksGreen ? "Checks obligatorios en verde." : "Checks pendientes/fallando."}
                  </div>
                </div>
              </div>
            ) : null}

            {releaseOpsMode === "promote" ? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs font-semibold text-[#5E30A5]">
                    {selectedProductLabel}
                  </div>
                  <div className="inline-flex rounded-xl border border-[#E9E2F7] bg-white p-1">
                    {["dev", "staging"].map((env) => (
                      <button
                        key={`promote-from-${env}`}
                        type="button"
                        onClick={() => setPromoteSourceEnv(env)}
                        className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                          promoteSourceEnv === env
                            ? "bg-[#2F1A55] text-white"
                            : "text-slate-500"
                        }`}
                      >
                        {normalizeEnvLabel(env)}
                      </button>
                    ))}
                  </div>
                </div>

                {promoteRowsLoading ? (
                  <div className="rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-600">
                    Cargando releases para promocionar...
                  </div>
                ) : (
                  <Table
                    columns={[
                      { key: "version", label: "Version" },
                      { key: "status", label: "Estado", align: "center" },
                      { key: "commit", label: "Commit" },
                      { key: "promoted", label: "Ya promovida", align: "center" },
                      { key: "action", label: "Accion", align: "right" },
                    ]}
                  >
                    {promoteRows.slice(0, 25).map((row) => {
                      const versionLabel = String(row.version_label || "").trim();
                      const alreadyPromoted = promotedToTargetVersionSet.has(versionLabel);
                      const currentActionId = actionKey(
                        "promote",
                        "list",
                        promoteSourceEnv,
                        promoteTargetEnv,
                        versionLabel
                      );

                      const isDraftOpen = promoteDraft?.actionId === currentActionId;
                      return (
                        <React.Fragment key={`${row.env_key}-${versionLabel}`}>
                          <tr className="hover:bg-[#FAF8FF]">
                            <td className="px-4 py-3 text-xs font-semibold text-slate-700">
                              {versionLabel}
                            </td>
                            <td className="px-4 py-3 text-center text-xs text-slate-600">
                              {normalizeReleaseStatus(promoteSourceEnv, row.status)}
                            </td>
                            <td className="px-4 py-3 font-mono text-xs text-slate-500">
                              {row.source_commit_sha || "-"}
                            </td>
                            <td className="px-4 py-3 text-center text-xs">
                              {alreadyPromoted ? (
                                <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">
                                  si
                                </span>
                              ) : (
                                <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-600">
                                  no
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-right">
                              {isDraftOpen ? (
                                <div className="inline-flex items-center gap-3">
                                  <button
                                    type="button"
                                    onClick={() => setPromoteDraft(null)}
                                    className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#D8C7F3] bg-white text-slate-500 hover:text-slate-700"
                                    aria-label="Cerrar notas"
                                  >
                                    <X size={14} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      requestPromoteVersion({
                                        semver: versionLabel,
                                        fromEnv: promoteSourceEnv,
                                        toEnv: promoteTargetEnv,
                                        source: "list",
                                        notes: promoteDraft.notes || "",
                                      })
                                    }
                                    disabled={promotingActionId === currentActionId}
                                    className="inline-flex items-center gap-1 rounded-lg border border-[#E9E2F7] bg-white px-2 py-1 text-[11px] font-semibold text-[#5E30A5] disabled:opacity-60"
                                  >
                                    {promotingActionId === currentActionId ? "Promoviendo..." : "CONTINUAR"}
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setPromoteDraft({
                                      actionId: currentActionId,
                                      semver: versionLabel,
                                      fromEnv: promoteSourceEnv,
                                      toEnv: promoteTargetEnv,
                                      source: "list",
                                      notes: "",
                                    })
                                  }
                                  disabled={alreadyPromoted || promotingActionId === currentActionId}
                                  className="inline-flex items-center gap-1 rounded-lg border border-[#E9E2F7] bg-white px-2 py-1 text-[11px] font-semibold text-[#5E30A5] disabled:opacity-60"
                                >
                                  <Rocket size={12} />
                                  {normalizeEnvLabel(promoteTargetEnv)}
                                </button>
                              )}
                            </td>
                          </tr>
                          {isDraftOpen ? (
                            <tr>
                              <td colSpan={5} className="px-4 pb-3 pt-0">
                                <textarea
                                  value={promoteDraft.notes || ""}
                                  onChange={(event) =>
                                    setPromoteDraft((current) =>
                                      current?.actionId === currentActionId
                                        ? { ...current, notes: event.target.value }
                                        : current
                                    )
                                  }
                                  className="min-h-[78px] w-full rounded-xl border border-[#CBB7EA] bg-white px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#5E30A5] resize-none"
                                  placeholder="Notas opcionales"
                                />
                              </td>
                            </tr>
                          ) : null}
                        </React.Fragment>
                      );
                    })}
                  </Table>
                )}

                {!promoteRowsLoading && promoteRows.length === 0 ? (
                  <div className="rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-600">
                    No hay releases disponibles para promocionar desde {normalizeEnvLabel(promoteSourceEnv)}.
                  </div>
                ) : null}

                {promoteMessage ? (
                  <div className="rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-600">
                    {promoteMessage}
                  </div>
                ) : null}
              </>
            ) : (
              <>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs font-semibold text-[#5E30A5]">
                    {selectedProductLabel}
                  </div>
                  <div className="inline-flex rounded-xl border border-[#E9E2F7] bg-white p-1">
                    {DEPLOY_ENV_OPTIONS.map((env) => (
                      <button
                        key={`deploy-env-${env}`}
                        type="button"
                        onClick={() => setDeployTargetEnv(env)}
                        className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                          deployTargetEnv === env
                            ? "bg-[#2F1A55] text-white"
                            : "text-slate-500"
                        }`}
                      >
                        {normalizeEnvLabel(env)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2">
                  <div className="text-xs text-slate-600">
                    Validacion de entorno (secrets + runtime + github)
                  </div>
                  <button
                    type="button"
                    onClick={handleValidateEnvironment}
                    disabled={envValidationLoading || !activeProductKey}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#E9E2F7] bg-white px-2 py-1 text-[11px] font-semibold text-[#5E30A5] disabled:opacity-60"
                  >
                    {envValidationLoading ? "Validando..." : "Validar entorno"}
                  </button>
                </div>

                {envValidationState ? (
                  <div
                    className={`rounded-xl border px-3 py-2 text-xs ${
                      envValidationState?.validation_ok
                        ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                        : "border-amber-200 bg-amber-50 text-amber-800"
                    }`}
                  >
                    <div className="font-semibold">
                      {envValidationState?.validation_ok ? "Entorno valido" : "Entorno con observaciones"}
                    </div>
                    <div className="mt-1">{envValidationState?.summary || "-"}</div>
                    <div className="mt-1">
                      OPS faltantes:{" "}
                      {Array.isArray(envValidationState?.details?.ops?.missing)
                        ? envValidationState.details.ops.missing.length
                        : 0}
                      {" | "}
                      GitHub faltantes:{" "}
                      {Array.isArray(envValidationState?.details?.github?.missing_secrets)
                        ? envValidationState.details.github.missing_secrets.length
                        : 0}
                      {" | "}
                      Runtime faltantes:{" "}
                      {Array.isArray(envValidationState?.details?.runtime?.missing_env)
                        ? envValidationState.details.runtime.missing_env.length
                        : 0}
                    </div>
                  </div>
                ) : null}

                <textarea
                  value={deployNotes}
                  onChange={(event) => setDeployNotes(event.target.value)}
                  className="min-h-[64px] w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#5E30A5] resize-none"
                  placeholder="Notas opcionales de deploy"
                />

                {deployMigrationGate ? (
                  <div
                    className={`rounded-xl border px-3 py-2 text-xs ${
                      deployMigrationGate?.gate_passed
                        ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                        : "border-amber-200 bg-amber-50 text-amber-800"
                    }`}
                  >
                    <div className="font-semibold">
                      Gate migraciones {deployMigrationGate?.gate_passed ? "OK" : "bloqueado"}
                    </div>
                    <div className="mt-1">
                      Release: {String(deployMigrationGate?.env_key || "-").toUpperCase()}{" "}
                      {deployMigrationGate?.semver || "-"}
                    </div>
                    <div className="mt-1">
                      Faltantes:{" "}
                      {Array.isArray(deployMigrationGate?.missing_versions)
                        ? deployMigrationGate.missing_versions.length
                        : 0}
                    </div>
                    {!deployMigrationGate?.gate_passed &&
                    Array.isArray(deployMigrationGate?.missing_versions) &&
                    deployMigrationGate.missing_versions.length ? (
                      <div className="mt-1 break-all">
                        {deployMigrationGate.missing_versions.join(", ")}
                      </div>
                    ) : null}
                    {!deployMigrationGate?.gate_passed ? (
                      <button
                        type="button"
                        onClick={handleApplyMigrationsForCurrentGate}
                        disabled={Boolean(migrationApplyActionId)}
                        className="mt-2 inline-flex items-center gap-1 rounded-lg border border-amber-300 bg-white px-2 py-1 text-[11px] font-semibold text-amber-800 disabled:opacity-60"
                      >
                        {migrationApplyActionId ? "Aplicando..." : "Apply migrations"}
                      </button>
                    ) : null}
                  </div>
                ) : null}

                <Table
                  columns={[
                    { key: "created", label: "Promovido" },
                    { key: "from", label: "Origen" },
                    { key: "version", label: "Version" },
                    { key: "state", label: "Deploy", align: "center" },
                    { key: "last", label: "Ultimo deploy" },
                    { key: "action", label: "Accion", align: "right" },
                  ]}
                >
                  {deployHistoryRows.slice(0, 25).map((row) => {
                    const versionLabel = String(row.to_version_label || "").trim();
                    const latestRequest = getLatestDeployRequestForVersion(
                      deployTargetEnv,
                      versionLabel
                    );
                    const deployState = deploymentStateFromRequest(latestRequest);
                    const currentActionId = actionKey(
                      "deploy",
                      "history",
                      deployTargetEnv,
                      versionLabel
                    );
                    const gateActionId = actionKey(
                      "gate-check",
                      "history",
                      deployTargetEnv,
                      versionLabel
                    );

                    return (
                      <tr key={row.id} className="hover:bg-[#FAF8FF]">
                        <td className="px-4 py-3 text-xs text-slate-600">{formatDate(row.created_at)}</td>
                        <td className="px-4 py-3 text-xs text-slate-700">
                          {(row.from_env_key || "-").toUpperCase()} / {row.from_version_label || "-"}
                        </td>
                        <td className="px-4 py-3 text-xs font-semibold text-slate-700">
                          {versionLabel || "-"}
                        </td>
                        <td className="px-4 py-3 text-center text-xs">
                          <span
                            className={`rounded-full px-2 py-1 text-[11px] font-semibold ${deploymentStateBadgeClass(
                              deployState
                            )}`}
                          >
                            {deploymentStateLabel(deployState)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-600">
                          <div>{latestRequest?.deployment_id || "-"}</div>
                          <div className="text-[11px] text-slate-500">
                            {latestRequest?.executed_at
                              ? formatDate(latestRequest.executed_at)
                              : latestRequest?.created_at
                                ? formatDate(latestRequest.created_at)
                                : "-"}
                          </div>
                          {latestRequest?.logs_url ? (
                            <a
                              href={latestRequest.logs_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] font-semibold text-[#5E30A5] underline"
                            >
                              Ver logs
                            </a>
                          ) : null}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              type="button"
                              onClick={async () => {
                                try {
                                  await handleCheckReleaseGateByVersion({
                                    envKey: deployTargetEnv,
                                    semver: versionLabel,
                                    source: "history",
                                  });
                                } catch {
                                  // handled by state/message
                                }
                              }}
                              disabled={migrationGateActionId === gateActionId}
                              className="inline-flex items-center gap-1 rounded-lg border border-[#E9E2F7] bg-white px-2 py-1 text-[11px] font-semibold text-[#5E30A5] disabled:opacity-60"
                            >
                              {migrationGateActionId === gateActionId ? "Gate..." : "Gate"}
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                requestDeployVersion({
                                  envKey: deployTargetEnv,
                                  semver: versionLabel,
                                  source: "history",
                                  notes: deployNotes,
                                })
                              }
                              disabled={deployingActionId === currentActionId}
                              className="inline-flex items-center gap-1 rounded-lg border border-[#E9E2F7] bg-white px-2 py-1 text-[11px] font-semibold text-[#5E30A5] disabled:opacity-60"
                            >
                              <Rocket size={12} />
                              {deployingActionId === currentActionId
                                ? "Ejecutando..."
                                : deployState === "deployed"
                                  ? "Re-deploy"
                                  : "Deploy"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </Table>

                {deployHistoryRows.length === 0 ? (
                  <div className="rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-600">
                    No hay promociones hacia {normalizeEnvLabel(deployTargetEnv)} para esta app.
                  </div>
                ) : null}

                {deploySyncRequired ? (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                    <div className="font-semibold">El release aun no esta en la rama destino.</div>
                    <div className="mt-1">Commit: {deploySyncRequired?.source_commit_sha || "-"}</div>
                    <div>
                      Rama origen: {deploySyncRequired?.branches?.source || "-"} | Rama destino:{" "}
                      {deploySyncRequired?.branches?.target || "-"}
                    </div>
                    <button
                      type="button"
                      onClick={requestSyncRelease}
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

          <div
            className={`rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm space-y-3 ${
              isActiveProductInitialized ? "" : "opacity-60 pointer-events-none"
            }`}
          >
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

      {devReleaseDraft ? (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/45 p-4">
          <button
            type="button"
            aria-label="Cerrar release development"
            onClick={closeDevReleaseDraft}
            className="absolute inset-0 h-full w-full"
          />
          <div className="relative z-[1201] w-full max-w-2xl rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-xl">
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm font-semibold text-[#2F1A55]">
                Release DEVELOPMENT ({devReleaseDraft.productLabel})
              </div>
              <button
                type="button"
                onClick={closeDevReleaseDraft}
                disabled={creatingDevRelease}
                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#E9E2F7] text-slate-500 disabled:opacity-60"
                aria-label="Cerrar"
              >
                <X size={14} />
              </button>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <div className="rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-700">
                Version actual: <strong>{devReleaseDraft.currentSemver || "-"}</strong>
              </div>
              <div className="rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-700">
                Sugerida: <strong>{devReleaseDraft.suggestedSemver || "-"}</strong> ({devReleaseDraft.suggestedBump})
              </div>
            </div>

            <div className="mt-2 rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs text-slate-600">
              Razon: <strong>{devReleaseDraft.suggestionSource}</strong> | Archivos detectados:{" "}
              <strong>{devReleaseDraft.changedFilesCount}</strong>
              {devReleaseDraft.docOnly ? " | Solo docs" : ""}
            </div>

            {devReleaseDraft.contractHits?.length ? (
              <div className="mt-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                Cambios de contrato detectados (major sugerido): {devReleaseDraft.contractHits.join(", ")}
              </div>
            ) : null}

            {devReleaseDraft.changedFiles?.length ? (
              <div className="mt-2 rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs text-slate-600">
                <div className="font-semibold text-slate-700">Archivos considerados</div>
                <div className="mt-1 max-h-28 overflow-auto space-y-1">
                  {devReleaseDraft.changedFiles.map((item, index) => (
                    <div key={`preview-file-${index}`} className="font-mono text-[11px] text-slate-500">
                      [{item.status}] {item.path}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-3 inline-flex rounded-xl border border-[#E9E2F7] bg-white p-1">
              <button
                type="button"
                onClick={() =>
                  setDevReleaseDraft((prev) => (prev ? { ...prev, mode: "suggested" } : prev))
                }
                className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                  devReleaseDraft.mode === "suggested" ? "bg-[#2F1A55] text-white" : "text-slate-500"
                }`}
              >
                Usar sugerida
              </button>
              <button
                type="button"
                onClick={() =>
                  setDevReleaseDraft((prev) => (prev ? { ...prev, mode: "custom" } : prev))
                }
                className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                  devReleaseDraft.mode === "custom" ? "bg-[#2F1A55] text-white" : "text-slate-500"
                }`}
              >
                Version manual
              </button>
            </div>

            {devReleaseDraft.mode === "custom" ? (
              <input
                value={devReleaseDraft.customSemver || ""}
                onChange={(event) =>
                  setDevReleaseDraft((prev) =>
                    prev ? { ...prev, customSemver: event.target.value } : prev
                  )
                }
                className="mt-2 w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#5E30A5]"
                placeholder="X.Y.Z (ej. 0.1.1)"
              />
            ) : null}

            <textarea
              value={devReleaseDraft.notes || ""}
              onChange={(event) =>
                setDevReleaseDraft((prev) => (prev ? { ...prev, notes: event.target.value } : prev))
              }
              className="mt-2 min-h-[70px] w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#5E30A5] resize-none"
              placeholder="Notas del release (opcional)"
            />

            {devReleaseDraftError ? (
              <div className="mt-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">
                {devReleaseDraftError}
              </div>
            ) : null}

            {!devReleaseDraft.shouldCreateRelease && devReleaseDraft.mode !== "custom" ? (
              <div className="mt-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                No hay cambios suficientes para crear release con la sugerida. Usa version manual si necesitas forzar un salto.
              </div>
            ) : null}

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={closeDevReleaseDraft}
                disabled={creatingDevRelease}
                className="rounded-lg border border-[#E9E2F7] bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 disabled:opacity-60"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={submitDevReleaseDraft}
                disabled={creatingDevRelease}
                className="rounded-lg border border-[#E9E2F7] bg-[#2F1A55] px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
              >
                {creatingDevRelease ? "Procesando..." : "Crear release"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {confirmDialog ? (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/45 p-4">
          <button
            type="button"
            aria-label="Cerrar confirmacion"
            onClick={closeConfirmDialog}
            className="absolute inset-0 h-full w-full"
          />
          <div className="relative z-[1201] w-full max-w-md rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-xl">
            <div className="text-sm font-semibold text-[#2F1A55]">{confirmDialog.title || "Confirmacion"}</div>
            <div className="mt-2 text-xs text-slate-600">
              {confirmDialog.copy || "Confirma esta accion para continuar."}
            </div>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={closeConfirmDialog}
                disabled={confirmLoading}
                className="rounded-lg border border-[#E9E2F7] bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 disabled:opacity-60"
              >
                {confirmDialog.cancelLabel || "Cancelar"}
              </button>
              {confirmDialog.secondaryAction ? (
                <button
                  type="button"
                  onClick={handleSecondaryConfirmAction}
                  disabled={confirmLoading}
                  className="rounded-lg border border-[#CBB7EA] bg-white px-3 py-1.5 text-xs font-semibold text-[#5E30A5] disabled:opacity-60"
                >
                  {confirmLoading
                    ? "Procesando..."
                    : confirmDialog.secondaryLabel || "Continuar sin merge"}
                </button>
              ) : null}
              <button
                type="button"
                onClick={handleConfirmAction}
                disabled={confirmLoading}
                className="rounded-lg border border-[#E9E2F7] bg-[#2F1A55] px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
              >
                {confirmLoading ? "Procesando..." : confirmDialog.confirmLabel || "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
