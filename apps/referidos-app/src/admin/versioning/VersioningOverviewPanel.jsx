import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  approveDeployRequest,
  createDevRelease,
  fetchDeployRequests,
  fetchDrift,
  fetchLatestReleases,
  fetchPromotionHistory,
  fetchReleasesByProductEnv,
  fetchVersioningCatalog,
  previewDevRelease,
  promoteRelease,
  rejectDeployRequest,
  requestDeploy,
  syncReleaseBranch,
  triggerDeployPipeline,
} from "./services/versioningService";

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
  disabled = false,
  deployState = "",
  mergeState = null,
}) {
  const envKey = String(row?.env_key || "").toLowerCase();
  const isDevelopment = envKey === "dev";
  const isDeployTrackedEnv = envKey === "staging" || envKey === "prod";
  const statusLabel = normalizeReleaseStatus(row?.env_key, row?.status);
  const actionList = Array.isArray(actions) && actions.length ? actions : action ? [action] : [];

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
      <div className="mt-2 flex items-center justify-between gap-2 text-xs text-slate-500">
        <span>Estado: {statusLabel}</span>
        <div className="flex items-center gap-1">
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
      {message ? (
        <div className="mt-2 rounded-lg border border-[#E9E2F7] bg-[#FAF8FF] px-2 py-1 text-[11px] text-slate-600">
          {message}
        </div>
      ) : null}
    </div>
  );
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
  const [devReleasePreviewInfo, setDevReleasePreviewInfo] = useState(null);
  const [devReleasePreviewLoading, setDevReleasePreviewLoading] = useState(false);
  const [devReleasePreviewError, setDevReleasePreviewError] = useState("");
  const [devReleaseDraft, setDevReleaseDraft] = useState(null);
  const [devReleaseDraftError, setDevReleaseDraftError] = useState("");
  const [devReleaseSyncing, setDevReleaseSyncing] = useState(null);
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

  const [approvalMessage, setApprovalMessage] = useState("");
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

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
        const [dataCatalog, dataLatest, requests] = await Promise.all([
          fetchVersioningCatalog(),
          fetchLatestReleases(),
          fetchDeployRequests(),
        ]);

        setCatalog(dataCatalog);
        setLatestReleases(dataLatest);
        setDeployRequests(requests);

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

  useEffect(() => {
    if (!devReleaseSyncing) return undefined;
    let cancelled = false;
    let timerId;
    const POLL_INTERVAL_MS = 4000;
    const MAX_WAIT_MS = 120000;

    const tick = async () => {
      if (cancelled) return;
      try {
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
        const isNewReleaseDetected = devReleaseSyncing.hadPreviousRelease
          ? hasAnyDevRelease &&
            (versionLabel !== String(devReleaseSyncing.previousVersionLabel || "").trim() ||
              sourceCommitSha !== String(devReleaseSyncing.previousSourceCommitSha || "").trim())
          : hasAnyDevRelease;

        if (isNewReleaseDetected) {
          await load(true);
          if (cancelled) return;
          setDevReleaseMessage(`Release DEVELOPMENT creada: ${versionLabel}.`);
          setDevReleaseSyncing(null);
          return;
        }
      } catch {
        // Keep polling on transient errors.
      }

      if (Date.now() - Number(devReleaseSyncing.startedAt || 0) >= MAX_WAIT_MS) {
        setDevReleaseMessage(
          "Release en cola. Sigue en ejecucion; revisa el workflow si tarda mas de lo esperado."
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
  }, [devReleaseSyncing, refreshLatestReleaseRows, load]);

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
  }, [activeProductKey, envCards, isActiveProductInitialized]);

  useEffect(() => {
    refreshMergeStatuses();
  }, [refreshMergeStatuses]);

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

    try {
      const result = await syncReleaseBranch({
        productKey: activeProductKey,
        toEnv: envKey,
        semver,
      });
      setEnvCardMessages((current) => ({
        ...current,
        [envKey]: `Release ${semver} mergeada a ${normalizeEnvLabel(envKey)} (${result?.branches?.target || "-"})`,
      }));
      await load(true);
      await refreshMergeStatuses();
    } catch (err) {
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

    try {
      await promoteRelease({
        productKey: activeProductKey,
        fromEnv,
        toEnv,
        semver,
        notes,
      });

      if (syncRelease) {
        if (!DEPLOYABLE_PRODUCTS.includes(activeProductKey) || !DEPLOY_ENV_OPTIONS.includes(toEnv)) {
          setPromoteMessage(
            `Release ${semver} promovida de ${fromEnv} a ${toEnv}. Merge automatico no disponible para esta app/entorno.`
          );
          setPromoteDraft(null);
          await load(true);
          return;
        }

        try {
          const syncResult = await syncReleaseBranch({
            productKey: activeProductKey,
            fromEnv,
            toEnv,
            semver,
          });
          setPromoteMessage(
            `Release ${semver} promovida de ${fromEnv} a ${toEnv} y subida a rama destino (${syncResult?.branches?.target || "-"})`
          );
          setPromoteDraft(null);
          await load(true);
          return;
        } catch (syncErr) {
          setPromoteMessage(
            `Release ${semver} promovida de ${fromEnv} a ${toEnv}, pero no se pudo subir a la rama destino: ${
              syncErr?.message || "error de sync"
            }`
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
      setPromoteMessage(err?.message || "No se pudo promover la release.");
    } finally {
      setPromotingActionId("");
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
    try {
      await syncReleaseBranch({
        productKey: activeProductKey,
        toEnv: envKey,
        semver,
      });

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
        `Deploy ejecutado (${envKey} ${semver}). deployment_id=${result?.deployment_id || "-"}`
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
        `Release de DEVELOPMENT en cola. workflow=${result?.workflow || "-"} ref=${result?.ref || "dev"}. Actualizando estado...`
      );
      setDevReleaseSyncing({
        productKey: activeProductKey,
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
    } finally {
      setCreatingDevRelease(false);
    }
  };

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

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
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
              {envCards.map((row) => {
                const envKey = String(row.env_key || "").toLowerCase();
                const normalizedStatus = normalizeReleaseStatus(envKey, row.status);
                const releaseVersion = String(row.version_label || "").trim();
                const hasValidVersion = releaseVersion && releaseVersion !== "-";
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
                    hasValidVersion &&
                    !devPreviewHasPendingRelease;

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
                  } else if (showPromoteAction) {
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
                    message={
                      envCardMessages[envKey] ||
                      (envKey === "dev"
                        ? devReleaseMessage || devPreviewSummaryMessage
                        : "")
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

                <textarea
                  value={deployNotes}
                  onChange={(event) => setDeployNotes(event.target.value)}
                  className="min-h-[64px] w-full rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#5E30A5] resize-none"
                  placeholder="Notas opcionales de deploy"
                />

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
