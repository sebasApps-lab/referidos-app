import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator, BackHandler, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native";
import ScreenScaffold from "@features/staff/StaffScreenScaffold";
import SectionCard from "@features/staff/StaffSectionCard";
import { staffIcons } from "@features/staff/staffNavigation";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import VersioningReleaseDetail, { groupVersioningReleases, releaseIdentity, versionLabel as safeVersionLabel } from "./VersioningReleaseDetail";
import {
  approveDeployRequest,
  applyReleaseMigrations,
  backfillReleaseArtifact,
  cancelLocalArtifactSyncRequest,
  checkReleaseMigrations,
  createDevRelease,
  executeDeployRequest,
  fetchBuildTimeline,
  fetchDeployRequests,
  fetchDrift,
  fetchEnvConfigVersions,
  fetchLatestReleases,
  fetchLocalArtifactNodes,
  fetchLocalArtifactSyncRequests,
  fetchPromotionHistory,
  fetchReleaseArtifacts,
  fetchReleaseComponents,
  fetchReleaseSnapshot,
  fetchReleasesByProductEnv,
  fetchVersioningCatalog,
  fetchWorkflowPackStatus,
  previewDevRelease,
  promoteRelease,
  rejectDeployRequest,
  requestDeploy,
  requestLocalArtifactSync,
  syncReleaseBranch,
  syncWorkflowPack,
  triggerDeployPipeline,
  upsertLocalArtifactNode,
  validateEnvironmentContract,
} from "@shared/services/versioningService";

type Tab = "updates" | "artifacts";

const PRODUCT_PRIORITY = ["referidos_app", "prelaunch_web", "android_app"];
const ENVIRONMENTS = [
  { key: "dev", label: "DEVELOPMENT" },
  { key: "staging", label: "STAGING" },
  { key: "prod", label: "PRODUCTION" },
];
const DEPLOY_ENVS = ["staging", "prod"];

function productLabel(product: any) {
  const key = safeText(product?.product_key, "");
  if (key === "referidos_app") return "REFERIDOS PWA";
  if (key === "prelaunch_web") return "PRELAUNCH WEB";
  if (key === "android_app") return "ANDROID APP";
  return safeText(product?.name || key, "APP").toUpperCase();
}

function safeText(value: any, fallback = "-") {
  const next = String(value || "").trim();
  return next || fallback;
}

function nextPromoteEnv(envKey: any) {
  const env = String(envKey || "").trim().toLowerCase();
  if (env === "dev") return "staging";
  if (env === "staging") return "prod";
  return "";
}

function envRank(envKey: any) {
  const env = String(envKey || "").trim().toLowerCase();
  if (env === "dev") return 0;
  if (env === "staging") return 1;
  if (env === "prod") return 2;
  return 99;
}

function dateLabel(value: any) {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return safeText(value, "-");
  return parsed.toLocaleString("es-EC", { timeZone: "America/Guayaquil" });
}

function settledValue<T>(result: PromiseSettledResult<any>, fallback: T): T {
  if (!result || result.status !== "fulfilled") return fallback;
  return (result.value as T) ?? fallback;
}

function settledError(result: PromiseSettledResult<any>) {
  if (!result || result.status !== "rejected") return "";
  return String((result.reason as any)?.message || result.reason || "").trim();
}

function shortHash(value: any, length = 8) {
  return safeText(value).slice(0, length);
}

function VersioningTab({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="tab" accessibilityState={{ selected }} onPress={onPress}
      style={[styles.tabChip, selected && styles.tabChipActive]}>
      <Text style={[styles.tabChipText, selected && styles.tabChipTextActive]}>{label}</Text>
    </Pressable>
  );
}

function CurrentReleaseCard({ label, release, artifact, deployed, onPress, wide }: {
  label: string; release: any; artifact: boolean; deployed: boolean; onPress: () => void; wide: boolean;
}) {
  const canOpen = Boolean(releaseIdentity(release));
  const merged = release?.merged === true || release?.merge_state === "merged";
  const rawStatus = safeText(release?.status, "pending").toLowerCase();
  const status = rawStatus === "validated" ? "released" : rawStatus === "draft" ? "pending" : rawStatus;
  return (
    <View style={[styles.environmentCard, wide && styles.environmentCardWide]}>
      <View style={styles.environmentHeading}>
        <Text accessibilityRole="header" style={styles.environmentLabel}>{label}</Text>
        {canOpen && (
          <Pressable accessibilityRole="button" accessibilityLabel={`Ver detalle de ${label}`} onPress={onPress} style={styles.inspect}>
            <Text style={styles.inspectLabel}>Detalle</Text>
          </Pressable>
        )}
      </View>
      <Text style={styles.releaseVersion}>{safeVersionLabel(release)}</Text>
      <Text style={styles.metaText}>build {safeText(release?.build_number, artifact ? "artifact" : "-")} · channel {safeText(release?.channel || release?.env_key)}</Text>
      <View style={styles.releaseStatus}>
        <Text style={styles.metaText}>{status[0].toUpperCase() + status.slice(1)}</Text>
        <View style={styles.statusTags}>
          {artifact && <Text style={styles.statusTag}>built</Text>}
          {merged && <Text style={styles.statusTag}>merged</Text>}
          {deployed && <Text style={styles.statusTag}>deployed</Text>}
        </View>
      </View>
      <Text selectable style={styles.metaText}>Commit: {safeText(release?.source_commit_sha)}</Text>
    </View>
  );
}

function InfoCard({
  title,
  lines,
  children,
}: {
  title: string;
  lines?: string[];
  children?: React.ReactNode;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.rowTitle}>{title}</Text>
      {(lines || []).map((line, index) => (
        <Text key={`${title}-${index}`} style={styles.metaText}>
          {line}
        </Text>
      ))}
      {children}
    </View>
  );
}

export default function AdminVersioningScreen() {
  const [screen, setScreen] = useState<"global" | "detail">("global");
  const [tab, setTab] = useState<Tab>("updates");
  const { width } = useWindowDimensions();
  const scroll = useRef<ScrollView>(null);
  const loadGeneration = useRef(0);
  const detailGeneration = useRef(0);
  const selectedProductRef = useRef("referidos_app");
  const selectedReleaseRef = useRef("");
  const operationInFlight = useRef(false);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [busyKey, setBusyKey] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("referidos_app");
  const [selectedReleaseId, setSelectedReleaseId] = useState("");
  const [selectedDeployEnv, setSelectedDeployEnv] = useState("staging");
  const [selectedArtifactNode, setSelectedArtifactNode] = useState("");
  const [devReleaseNotes, setDevReleaseNotes] = useState("");
  const [promoteNotes, setPromoteNotes] = useState("");
  const [deployNotes, setDeployNotes] = useState("");
  const [artifactNotes, setArtifactNotes] = useState("");
  const [driftFrom, setDriftFrom] = useState("staging");
  const [driftTo, setDriftTo] = useState("prod");
  const [nodeDraft, setNodeDraft] = useState({
    nodeKey: "",
    displayName: "",
    runnerLabel: "",
    osName: "",
  });
  const [previewData, setPreviewData] = useState<any | null>(null);
  const [releases, setReleases] = useState<any[]>([]);
  const [latestReleases, setLatestReleases] = useState<any[]>([]);
  const [artifacts, setArtifacts] = useState<any[]>([]);
  const [deployRequests, setDeployRequests] = useState<any[]>([]);
  const [promotionHistory, setPromotionHistory] = useState<any[]>([]);
  const [buildTimelineRows, setBuildTimelineRows] = useState<any[]>([]);
  const [envConfigRows, setEnvConfigRows] = useState<any[]>([]);
  const [driftRows, setDriftRows] = useState<any[]>([]);
  const [localNodes, setLocalNodes] = useState<any[]>([]);
  const [localSyncRequests, setLocalSyncRequests] = useState<any[]>([]);
  const [workflowStatus, setWorkflowStatus] = useState<any | null>(null);
  const [releaseSnapshot, setReleaseSnapshot] = useState<any | null>(null);
  const [releaseComponents, setReleaseComponents] = useState<any[]>([]);
  const [migrationGate, setMigrationGate] = useState<any | null>(null);

  const selectedProductMeta = useMemo(
    () => products.find((row) => row?.product_key === selectedProduct) || null,
    [products, selectedProduct],
  );

  const sortedReleases = useMemo(
    () =>
      [...releases]
        .sort((a, b) => {
          const envDiff = envRank(a?.env_key) - envRank(b?.env_key);
          if (envDiff !== 0) return envDiff;
          return new Date(String(b?.created_at || 0)).getTime() -
            new Date(String(a?.created_at || 0)).getTime();
        })
        .slice(0, 24),
    [releases],
  );

  const productOptions = useMemo(() => products.map((product) => ({
    id: safeText(product?.product_key, ""),
    label: productLabel(product),
  })).filter((option) => option.id), [products]);

  const currentEnvironmentRows = useMemo(() => ENVIRONMENTS.map((env) => ({
    ...env,
    release: latestReleases.find((row) => row?.product_key === selectedProduct && row?.env_key === env.key)
      || sortedReleases.find((row) => row?.env_key === env.key),
  })), [latestReleases, selectedProduct, sortedReleases]);

  const detailReleases = useMemo(() => {
    const known = new Set(releases.map(releaseIdentity));
    return releases.concat(latestReleases.filter((row) => row?.product_key === selectedProduct && !known.has(releaseIdentity(row))));
  }, [latestReleases, releases, selectedProduct]);

  const deployRows = useMemo(
    () =>
      deployRequests.filter(
        (row) => safeText(row?.product_key || selectedProduct, selectedProduct) === selectedProduct,
      ),
    [deployRequests, selectedProduct],
  );

  const latestDeploy = useMemo(() => {
    const latest = new Map<string, any>();
    const sorted = [...deployRows].sort((left, right) => (Date.parse(right?.created_at) || 0) - (Date.parse(left?.created_at) || 0));
    for (const row of sorted) {
      const key = `${safeText(row?.env_key || row?.to_env_key).toLowerCase()}:${safeText(row?.version_label || row?.semver)}`;
      if (!latest.has(key)) latest.set(key, row);
    }
    return latest;
  }, [deployRows]);

  const visibleArtifacts = useMemo(
    () =>
      artifacts.filter((row) => {
        if (!selectedArtifactNode) return true;
        if (!row?.node_key) return true;
        return String(row.node_key) === selectedArtifactNode;
      }),
    [artifacts, selectedArtifactNode],
  );

  const loadReleaseDetails = useCallback(async (row: any, productKey: string) => {
    const releaseId = releaseIdentity(row);
    if (!releaseId) return;
    const request = ++detailGeneration.current;
    selectedReleaseRef.current = releaseId;
    setSelectedReleaseId(releaseId);
    setReleaseSnapshot(null);
    setReleaseComponents([]);
    setDetailLoading(true);
    const envKey = String(row?.env_key || "").trim().toLowerCase();
    const semver = safeVersionLabel(row);
    const [snapshotResult, componentsResult] = await Promise.allSettled([
      fetchReleaseSnapshot({ releaseId, productKey, envKey, semver }),
      fetchReleaseComponents(releaseId),
    ]);
    if (request !== detailGeneration.current) return;
    setReleaseSnapshot(settledValue(snapshotResult, null));
    setReleaseComponents(settledValue(componentsResult, []));
    const detailError = settledError(snapshotResult) || settledError(componentsResult);
    if (detailError) setError(detailError);
    setDetailLoading(false);
  }, []);

  const loadAll = useCallback(
    async (productKey?: string) => {
      const request = ++loadGeneration.current;
      detailGeneration.current += 1;
      setLoading(true);
      setError("");
      try {
        const catalog = await fetchVersioningCatalog();
        if (request !== loadGeneration.current) return;
        const productRows = Array.isArray(catalog?.products) ? catalog.products : [];
        const sortedProducts = [...productRows].sort((a, b) => {
          const aIndex = PRODUCT_PRIORITY.indexOf(String(a?.product_key || ""));
          const bIndex = PRODUCT_PRIORITY.indexOf(String(b?.product_key || ""));
          if (aIndex !== -1 || bIndex !== -1) {
            return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
          }
          return safeText(a?.name, "").localeCompare(safeText(b?.name, ""), "es");
        });
        const requestedProduct = productKey || selectedProductRef.current;
        const effectiveProduct = sortedProducts.some((row) => row?.product_key === requestedProduct)
          ? requestedProduct : sortedProducts[0]?.product_key || requestedProduct;
        const effectiveMeta =
          sortedProducts.find((row) => row?.product_key === effectiveProduct) || null;

        const switched = effectiveProduct !== selectedProductRef.current;
        selectedProductRef.current = effectiveProduct;
        if (switched) {
          selectedReleaseRef.current = "";
          setSelectedReleaseId("");
          setPreviewData(null);
          setDriftRows([]);
          setMigrationGate(null);
        }
        setProducts(sortedProducts);
        setSelectedProduct(effectiveProduct);

        const results = await Promise.allSettled([
          fetchReleasesByProductEnv(effectiveProduct, ""),
          fetchReleaseArtifacts({ productKey: effectiveProduct, limit: 80 }),
          fetchDeployRequests({ productKey: effectiveProduct }),
          effectiveMeta?.id
            ? fetchPromotionHistory({ productId: effectiveMeta.id, limit: 60 })
            : Promise.resolve([]),
          fetchBuildTimeline({ productKey: effectiveProduct, limit: 80 }),
          fetchEnvConfigVersions({ productKey: effectiveProduct, limit: 40 }),
          fetchLocalArtifactNodes({ onlyActive: false, limit: 80 }),
          fetchLocalArtifactSyncRequests({ productKey: effectiveProduct, limit: 80 }),
          fetchWorkflowPackStatus({ sourceRef: "dev" }),
          fetchLatestReleases(),
        ]);

        if (request !== loadGeneration.current) return;

        const nextReleases = settledValue<any[]>(results[0], []);
        const nextNodes = settledValue<any[]>(results[6], []);

        setReleases(nextReleases);
        setArtifacts(settledValue(results[1], []));
        setDeployRequests(settledValue(results[2], []));
        setPromotionHistory(settledValue(results[3], []));
        setBuildTimelineRows(settledValue(results[4], []));
        setEnvConfigRows(settledValue(results[5], []));
        setLocalNodes(nextNodes);
        setLocalSyncRequests(settledValue(results[7], []));
        setWorkflowStatus(settledValue(results[8], null));
        setLatestReleases(settledValue(results[9], []));

        if (nextNodes.length > 0) {
          setSelectedArtifactNode((current) => current || String(nextNodes[0]?.node_key || ""));
        }

        const firstError = results.slice(0, 9).map(settledError).find(Boolean);
        if (firstError) setError(String(firstError));

        const current = nextReleases.find((row) => releaseIdentity(row) === selectedReleaseRef.current)
          || groupVersioningReleases(nextReleases)[0]?.canonical;
        if (current) {
          await loadReleaseDetails(current, effectiveProduct);
        } else {
          selectedReleaseRef.current = "";
          setSelectedReleaseId("");
          setReleaseSnapshot(null);
          setReleaseComponents([]);
          setDetailLoading(false);
        }
      } catch (err: any) {
        if (request === loadGeneration.current) {
          setError(String(err?.message || err || "No se pudo cargar versionado."));
          setDetailLoading(false);
        }
      } finally {
        if (request === loadGeneration.current) setLoading(false);
      }
    },
    [loadReleaseDetails],
  );

  useEffect(() => {
    void loadAll();
    return () => {
      loadGeneration.current += 1;
      detailGeneration.current += 1;
    };
  }, [loadAll]);

  const runAction = useCallback(
    async (key: string, action: () => Promise<any>, successMessage: string, reloadAfter = true) => {
      if (operationInFlight.current) return null;
      operationInFlight.current = true;
      setBusyKey(key);
      setError("");
      setOk("");
      try {
        const result = await action();
        setOk(successMessage);
        if (reloadAfter) await loadAll(selectedProduct);
        return result;
      } catch (err: any) {
        setError(String(err?.message || err || "No se pudo completar la operacion."));
        return null;
      } finally {
        operationInFlight.current = false;
        setBusyKey("");
      }
    },
    [loadAll, selectedProduct],
  );

  const handlePreviewDevRelease = useCallback(() => runAction(
    "preview_dev_release",
    async () => {
      const result = await previewDevRelease({ productKey: selectedProduct, ref: "dev" });
      setPreviewData(result || null);
      return result;
    },
    "Preview de release cargado.",
    false,
  ), [runAction, selectedProduct]);

  const handleCreateDevRelease = useCallback(
    async () =>
      runAction(
        "create_dev_release",
        async () => {
          const result = await createDevRelease({
            productKey: selectedProduct,
            ref: "dev",
            releaseNotes: devReleaseNotes,
          });
          setPreviewData(result || null);
          return result;
        },
        "Release development solicitado.",
      ),
    [devReleaseNotes, runAction, selectedProduct],
  );

  const handleDrift = useCallback(() => runAction(
    "drift",
    async () => {
      const rows = await fetchDrift(selectedProduct, driftFrom, driftTo);
      setDriftRows(Array.isArray(rows) ? rows : []);
      return rows;
    },
    "Drift cargado.",
    false,
  ), [driftFrom, driftTo, runAction, selectedProduct]);

  function showScreen(next: "global" | "detail") {
    setScreen(next);
    scroll.current?.scrollTo({ y: 0, animated: false });
  }

  function selectRelease(row: any) {
    if (loading || releaseIdentity(row) === selectedReleaseId) return;
    setError("");
    void loadReleaseDetails(row, selectedProduct);
  }

  useFocusEffect(useCallback(() => {
    if (screen !== "detail") return;
    const listener = BackHandler.addEventListener("hardwareBackPress", () => {
      setScreen("global");
      scroll.current?.scrollTo({ y: 0, animated: false });
      return true;
    });
    return () => listener.remove();
  }, [screen]));

  const initialized = selectedProductMeta?.initialized === true || Number(selectedProductMeta?.component_count || 0) > 0
    || selectedProductMeta?.metadata?.versioning?.initialized === true;
  const workflowCurrent = workflowStatus?.staging?.matches_source === true && workflowStatus?.production?.matches_source === true;
  const workflowUpdating = busyKey === "workflow_pack_full";

  return (
    <ScreenScaffold
      onRefresh={loading || busyKey ? undefined : () => { void loadAll(selectedProduct); }}
      title={screen === "global" ? "Versionado Global" : "Versionado Detalle"}
      subtitle={screen === "global" ? "Mapa por entorno, drift y promociones de release" : "Releases por app, snapshot de componentes e historial"}
    >
      <ScrollView ref={scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.toolbar}>
          <View accessibilityRole="tablist" style={styles.segment}>
            <VersioningTab label="Versionado global" selected={screen === "global"} onPress={() => showScreen("global")} />
            <VersioningTab label="Detalle" selected={screen === "detail"} onPress={() => showScreen("detail")} />
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="Refrescar versión" onPress={() => void loadAll(selectedProduct)}
            disabled={loading || Boolean(busyKey)} style={[styles.refresh, (loading || Boolean(busyKey)) && styles.btnDisabled]}>
            {loading ? <ActivityIndicator size="small" color="#5E30A5" /> : <Image source={staffIcons.refresh} style={styles.refreshIcon} />}
          </Pressable>
        </View>

        {error ? <Text accessibilityLiveRegion="polite" style={styles.errorText}>{error}</Text> : null}
        {ok ? <Text accessibilityLiveRegion="polite" style={styles.okText}>{ok}</Text> : null}

        {screen === "detail" ? (
          <VersioningReleaseDetail
            product={selectedProduct}
            productOptions={productOptions}
            onProductChange={(key) => { if (!busyKey) void loadAll(key); }}
            isInitialized={initialized}
            releases={detailReleases}
            selectedReleaseId={selectedReleaseId}
            onReleaseChange={selectRelease}
            snapshot={releaseSnapshot}
            components={releaseComponents}
            loading={loading}
            detailLoading={detailLoading}
          />
        ) : (
          <>
            <View accessibilityRole="tablist" style={styles.segment}>
              <VersioningTab label="Updates" selected={tab === "updates"} onPress={() => setTab("updates")} />
              <VersioningTab label="Builds" selected={tab === "artifacts"} onPress={() => setTab("artifacts")} />
            </View>

            {tab === "updates" && (
              <SectionCard title="Workflow pack" right={(
                <Pressable
                  accessibilityRole="button"
                  onPress={() => void runAction(
                    "workflow_pack_full",
                    () => syncWorkflowPack({ sourceRef: "dev", syncStaging: true, syncProd: true }),
                    "Workflow pack sincronizado.",
                  )}
                  disabled={loading || Boolean(busyKey) || workflowCurrent}
                  style={[styles.primaryBtn, (loading || Boolean(busyKey) || workflowCurrent) && styles.btnDisabled]}
                >
                  <Text style={styles.primaryBtnText}>{workflowUpdating ? "Actualizando…" : "Update"}</Text>
                </Pressable>
              )}>
                <View style={styles.workflowRow}>
                  <Text style={styles.metaText}><Text style={styles.strong}>DEV: </Text>{shortHash(workflowStatus?.source?.pack_hash)}</Text>
                  <Text style={styles.metaText}><Text style={styles.strong}>PROD: </Text>{shortHash(workflowStatus?.production?.pack_hash)} ({shortHash(workflowStatus?.production?.head_sha, 7)})</Text>
                  <Text style={workflowCurrent ? styles.workflowOk : styles.workflowWarning}>
                    {workflowUpdating ? "Actualizando…" : !workflowStatus ? "Sin estado" : workflowCurrent ? "Actualizado" : "Desactualizado"}
                  </Text>
                </View>
              </SectionCard>
            )}

            <View style={styles.productSection}>
              <View style={styles.productTitle}>
                <Image source={staffIcons.activity} style={styles.activityIcon} />
                <Text accessibilityRole="header" style={styles.productTitleText}>{tab === "updates" ? "Releases actuales" : "Builds"}</Text>
              </View>
              <View style={styles.chipsWrap}>
                {productOptions.map(({ id, label }) => (
                  <Pressable key={id} accessibilityRole="button" accessibilityState={{ selected: id === selectedProduct }}
                    disabled={Boolean(busyKey)} onPress={() => { if (id !== selectedProduct) void loadAll(id); }}
                    style={[styles.chip, id === selectedProduct && styles.chipActive, Boolean(busyKey) && id !== selectedProduct && styles.btnDisabled]}>
                    <Text style={[styles.chipText, id === selectedProduct && styles.chipTextActive]}>{label}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {loading ? <SectionCard title="Cargando versionado"><BlockSkeleton lines={4} compact /></SectionCard> : (
              tab === "updates" && (
                <View style={[styles.environmentGrid, width >= 880 && styles.environmentGridWide]}>
                  {currentEnvironmentRows.map(({ key, label, release }) => (
                    <CurrentReleaseCard
                      key={key}
                      label={label}
                      release={release}
                      artifact={artifacts.some((row) => Boolean(releaseIdentity(release)) && String(row?.release_id) === releaseIdentity(release))}
                      deployed={/^(deployed|success)$/i.test(safeText(latestDeploy.get(`${key}:${safeVersionLabel(release)}`)?.deployment_status, ""))}
                      onPress={() => { selectRelease(release); showScreen("detail"); }}
                      wide={width >= 880}
                    />
                  ))}
                </View>
              )
            )}
          </>
        )}

        {screen === "global" && tab === "updates" && !loading ? (
          <>
            <SectionCard title="Release development" subtitle="Previsualiza y crea una release de desarrollo">
              <TextInput value={devReleaseNotes} onChangeText={setDevReleaseNotes} placeholder="Notas del release" style={styles.input} />
              <View style={styles.actionsRow}>
                <Pressable accessibilityRole="button" onPress={() => void handlePreviewDevRelease()} disabled={Boolean(busyKey)}
                  style={[styles.secondaryBtn, Boolean(busyKey) && styles.btnDisabled]}>
                  <Text style={styles.secondaryBtnText}>Preview</Text>
                </Pressable>
                <Pressable accessibilityRole="button" onPress={() => void handleCreateDevRelease()} disabled={Boolean(busyKey)}
                  style={[styles.primaryBtn, Boolean(busyKey) && styles.btnDisabled]}>
                  <Text style={styles.primaryBtnText}>Crear release</Text>
                </Pressable>
              </View>
              {previewData ? (
                <InfoCard
                  title={`Sugerida: ${safeText(previewData?.suggested_semver || previewData?.semver)}`}
                  lines={[
                    `source: ${safeText(previewData?.suggestion_source || previewData?.source)}`,
                    `archivos: ${safeText(previewData?.changed_files_count || previewData?.changedFilesCount || 0)}`,
                  ]}
                />
              ) : null}
            </SectionCard>

            <SectionCard title="Runtime history" subtitle="Timeline, config versions y promotions">
              <InfoCard
                title={`Timeline: ${buildTimelineRows.length} eventos`}
                lines={buildTimelineRows.slice(0, 3).map((row) => `${safeText(row?.event_type || row?.status)} | ${safeText(row?.env_key || row?.to_env_key, "-").toUpperCase()} | ${safeText(row?.version_label || row?.semver)} | ${dateLabel(row?.created_at || row?.updated_at)}`)}
              />
              <InfoCard
                title={`Env config: ${envConfigRows.length} versiones`}
                lines={envConfigRows.slice(0, 3).map((row) => `${safeText(row?.config_key || "app-config.js")} | ${safeText(row?.env_key, "-").toUpperCase()} | ${safeText(row?.version_label)} | hash ${safeText(row?.config_hash || row?.checksum)}`)}
              />
              <InfoCard
                title={`Promotions/deploys: ${promotionHistory.length} filas`}
                lines={promotionHistory.slice(0, 3).map((row) => `${safeText(row?.to_env_key || row?.env_key, "-").toUpperCase()} | ${safeText(row?.to_version_label || row?.version_label)} | ${safeText(row?.deployment_status || row?.status)}`)}
              />
            </SectionCard>
          </>
        ) : null}

        {screen === "global" && tab === "updates" && !loading ? (
          <>
            <SectionCard title="Controles" subtitle="Validaciones, drift y gate de migraciones">
              <View style={styles.actionsRow}>
                <Pressable
                  onPress={() =>
                    void runAction(
                      "validate_staging",
                      () => validateEnvironmentContract({ productKey: selectedProduct, envKey: "staging" }),
                      "Validacion staging completada.",
                      false,
                    )
                  }
                  disabled={busyKey === "validate_staging"}
                  style={[styles.secondaryBtn, busyKey === "validate_staging" && styles.btnDisabled]}
                >
                  <Text style={styles.secondaryBtnText}>Validar staging</Text>
                </Pressable>
                <Pressable
                  onPress={() =>
                    void runAction(
                      "validate_prod",
                      () => validateEnvironmentContract({ productKey: selectedProduct, envKey: "prod" }),
                      "Validacion prod completada.",
                      false,
                    )
                  }
                  disabled={busyKey === "validate_prod"}
                  style={[styles.secondaryBtn, busyKey === "validate_prod" && styles.btnDisabled]}
                >
                  <Text style={styles.secondaryBtnText}>Validar prod</Text>
                </Pressable>
              </View>
              <View style={styles.actionsRow}>
                <TextInput value={driftFrom} onChangeText={setDriftFrom} style={styles.smallInput} />
                <TextInput value={driftTo} onChangeText={setDriftTo} style={styles.smallInput} />
                <Pressable
                  onPress={() => void handleDrift()}
                  disabled={busyKey === "drift"}
                  style={[styles.outlineBtn, busyKey === "drift" && styles.btnDisabled]}
                >
                  <Text style={styles.outlineBtnText}>Comparar drift</Text>
                </Pressable>
              </View>
              {driftRows.slice(0, 4).map((row, index) => (
                <InfoCard
                  key={`${safeText(row?.component_key, String(index))}-${index}`}
                  title={safeText(row?.component_key)}
                  lines={[
                    `${driftFrom}: ${safeText(row?.revision_a)} | ${driftTo}: ${safeText(row?.revision_b)}`,
                    `estado: ${row?.differs ? "drift" : "igual"}`,
                  ]}
                />
              ))}
              {migrationGate ? (
                <InfoCard
                  title={`Gate ${migrationGate?.gate_passed ? "OK" : "bloqueado"}`}
                  lines={[
                    `env: ${safeText(migrationGate?.env_key, "-").toUpperCase()} | release: ${safeText(migrationGate?.semver)}`,
                    `faltantes: ${Array.isArray(migrationGate?.missing_versions) && migrationGate.missing_versions.length ? migrationGate.missing_versions.join(", ") : "ninguna"}`,
                  ]}
                />
              ) : null}
            </SectionCard>

            <SectionCard title="Notas operativas" subtitle="Se usan para promote, deploy y artifacts">
              <TextInput value={promoteNotes} onChangeText={setPromoteNotes} placeholder="Notas promote" style={styles.input} />
              <TextInput value={deployNotes} onChangeText={setDeployNotes} placeholder="Notas deploy / approve / reject" style={styles.input} />
              <TextInput value={artifactNotes} onChangeText={setArtifactNotes} placeholder="Notas backfill / sync" style={styles.input} />
              <View style={styles.chipsWrap}>
                {DEPLOY_ENVS.map((envKey) => {
                  const active = selectedDeployEnv === envKey;
                  return (
                    <Pressable key={envKey} onPress={() => setSelectedDeployEnv(envKey)} style={[styles.chip, active && styles.chipActive]}>
                      <Text style={[styles.chipText, active && styles.chipTextActive]}>target {envKey}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </SectionCard>

            <SectionCard title="Release actions" subtitle="Backfill, promote, sync, migraciones y deploy">
              {sortedReleases.slice(0, 12).map((row, index) => {
                const semver = safeVersionLabel(row);
                const envKey = safeText(row?.env_key, "").toLowerCase();
                const promoteTarget = nextPromoteEnv(envKey);
                const releaseId = safeText(row?.id || row?.release_id, String(index));
                return (
                  <InfoCard
                    key={`${releaseId}-${index}`}
                    title={`${semver} [${envKey.toUpperCase() || "-"}]`}
                    lines={[
                      `status: ${safeText(row?.status)} | commit: ${safeText(row?.source_commit_sha)}`,
                      `creado: ${dateLabel(row?.created_at)}`,
                    ]}
                  >
                    <View style={styles.actionsRow}>
                      <Pressable
                        onPress={() =>
                          void runAction(
                            `backfill:${releaseId}`,
                            () =>
                              backfillReleaseArtifact({
                                releaseId,
                                productKey: selectedProduct,
                                ref: "dev",
                                sourceCommitSha: safeText(row?.source_commit_sha, ""),
                                releaseNotes: artifactNotes || devReleaseNotes,
                              }),
                            `Backfill solicitado para ${semver}.`,
                          )
                        }
                        style={styles.secondaryBtn}
                      >
                        <Text style={styles.secondaryBtnText}>Backfill</Text>
                      </Pressable>
                      {promoteTarget ? (
                        <Pressable
                          onPress={() =>
                            void runAction(
                              `promote:${envKey}:${promoteTarget}:${semver}`,
                              () =>
                                promoteRelease({
                                  productKey: selectedProduct,
                                  fromEnv: envKey,
                                  toEnv: promoteTarget,
                                  semver,
                                  notes: promoteNotes,
                                }),
                              `Release ${semver} promovida a ${promoteTarget}.`,
                            )
                          }
                          style={styles.primaryBtn}
                        >
                          <Text style={styles.primaryBtnText}>Promote</Text>
                        </Pressable>
                      ) : null}
                      <Pressable
                        onPress={() =>
                          void runAction(
                            `sync:${envKey}:${selectedDeployEnv}:${semver}`,
                            () =>
                              syncReleaseBranch({
                                productKey: selectedProduct,
                                fromEnv: envKey,
                                toEnv: selectedDeployEnv,
                                semver,
                                operation: "sync",
                              }),
                            `Release ${semver} sincronizada a ${selectedDeployEnv}.`,
                          )
                        }
                        style={styles.outlineBtn}
                      >
                        <Text style={styles.outlineBtnText}>Sync release</Text>
                      </Pressable>
                      <Pressable
                        onPress={() => void runAction(
                          `gate:${semver}:${selectedDeployEnv}`,
                          async () => {
                            const result = await checkReleaseMigrations({
                              productKey: selectedProduct,
                              envKey: selectedDeployEnv,
                              semver,
                            });
                            setMigrationGate(result || null);
                            return result;
                          },
                          `Gate calculado para ${selectedDeployEnv} ${semver}.`,
                          false,
                        )}
                        style={styles.outlineBtn}
                      >
                        <Text style={styles.outlineBtnText}>Gate migr.</Text>
                      </Pressable>
                      <Pressable
                        onPress={() =>
                          void runAction(
                            `apply:${selectedDeployEnv}:${semver}`,
                            () =>
                              applyReleaseMigrations({
                                productKey: selectedProduct,
                                envKey: selectedDeployEnv,
                                semver,
                              }),
                            `Migraciones aplicadas para ${selectedDeployEnv} ${semver}.`,
                          )
                        }
                        style={styles.outlineBtn}
                      >
                        <Text style={styles.outlineBtnText}>Aplicar migr.</Text>
                      </Pressable>
                      <Pressable
                        onPress={() =>
                          void runAction(
                            `deploy:${selectedDeployEnv}:${semver}`,
                            () =>
                              requestDeploy({
                                productKey: selectedProduct,
                                envKey: selectedDeployEnv,
                                semver,
                                notes: deployNotes,
                                metadata: { source: "android_admin_versioning" },
                              }),
                            `Deploy solicitado para ${selectedDeployEnv} ${semver}.`,
                          )
                        }
                        style={styles.primaryBtn}
                      >
                        <Text style={styles.primaryBtnText}>Request deploy</Text>
                      </Pressable>
                    </View>
                  </InfoCard>
                );
              })}
            </SectionCard>

            <SectionCard title="Deploy requests" subtitle={`${deployRows.length} filas`}>
              {deployRows.slice(0, 16).map((row, index) => {
                const requestId = safeText(row?.id, String(index));
                return (
                  <InfoCard
                    key={`${requestId}-${index}`}
                    title={`${safeText(row?.env_key || row?.to_env_key, "-").toUpperCase()} / ${safeText(row?.version_label || row?.semver)}`}
                    lines={[
                      `request: ${safeText(row?.status)} | deploy: ${safeText(row?.deployment_status)}`,
                      `id: ${requestId} | deployment_id: ${safeText(row?.deployment_id)}`,
                    ]}
                  >
                    <View style={styles.actionsRow}>
                      <Pressable
                        onPress={() =>
                          void runAction(
                            `approve:${requestId}`,
                            () => approveDeployRequest({ requestId, notes: deployNotes }),
                            `Deploy request ${requestId} aprobada.`,
                          )
                        }
                        style={styles.secondaryBtn}
                      >
                        <Text style={styles.secondaryBtnText}>Approve</Text>
                      </Pressable>
                      <Pressable
                        onPress={() =>
                          void runAction(
                            `reject:${requestId}`,
                            () => rejectDeployRequest({ requestId, reason: deployNotes || "rejected_from_android_admin" }),
                            `Deploy request ${requestId} rechazada.`,
                          )
                        }
                        style={styles.outlineBtn}
                      >
                        <Text style={styles.outlineBtnText}>Reject</Text>
                      </Pressable>
                      <Pressable
                        onPress={() =>
                          void runAction(
                            `pipeline:${requestId}`,
                            () => triggerDeployPipeline({ requestId, syncRelease: false, syncOnly: false }),
                            `Pipeline ejecutado para ${requestId}.`,
                          )
                        }
                        style={styles.primaryBtn}
                      >
                        <Text style={styles.primaryBtnText}>Run pipeline</Text>
                      </Pressable>
                      <Pressable
                        onPress={() =>
                          void runAction(
                            `execute:${requestId}`,
                            () =>
                              executeDeployRequest({
                                requestId,
                                status: "success",
                                deploymentId: safeText(row?.deployment_id, ""),
                                metadata: { source: "android_admin_versioning_manual_execute" },
                              }),
                            `Deploy request ${requestId} marcada como ejecutada.`,
                          )
                        }
                        style={styles.outlineBtn}
                      >
                        <Text style={styles.outlineBtnText}>Marcar ejecutado</Text>
                      </Pressable>
                    </View>
                  </InfoCard>
                );
              })}
              {!loading && deployRows.length === 0 ? (
                <Text style={styles.emptyText}>Sin deploy requests para este producto.</Text>
              ) : null}
            </SectionCard>
          </>
        ) : null}

        {screen === "global" && tab === "artifacts" && !loading ? (
          <>
            <SectionCard title="Nodos locales" subtitle="Catalogo local para sync de builds">
              <TextInput value={nodeDraft.nodeKey} onChangeText={(value) => setNodeDraft((prev) => ({ ...prev, nodeKey: value }))} placeholder="node_key" style={styles.input} autoCapitalize="none" />
              <TextInput value={nodeDraft.displayName} onChangeText={(value) => setNodeDraft((prev) => ({ ...prev, displayName: value }))} placeholder="display_name" style={styles.input} />
              <TextInput value={nodeDraft.runnerLabel} onChangeText={(value) => setNodeDraft((prev) => ({ ...prev, runnerLabel: value }))} placeholder="runner_label" style={styles.input} autoCapitalize="none" />
              <TextInput value={nodeDraft.osName} onChangeText={(value) => setNodeDraft((prev) => ({ ...prev, osName: value }))} placeholder="os_name" style={styles.input} autoCapitalize="none" />
              <Pressable
                onPress={() =>
                  void runAction(
                    `node:${safeText(nodeDraft.nodeKey, "new")}`,
                    () =>
                      upsertLocalArtifactNode({
                        nodeKey: safeText(nodeDraft.nodeKey, "").toLowerCase(),
                        displayName: safeText(nodeDraft.displayName, ""),
                        runnerLabel: safeText(nodeDraft.runnerLabel, ""),
                        osName: nodeDraft.osName,
                        active: true,
                      }),
                    `Nodo ${safeText(nodeDraft.nodeKey, "").toLowerCase()} guardado.`,
                  )
                }
                style={styles.primaryBtn}
              >
                <Text style={styles.primaryBtnText}>Guardar nodo</Text>
              </Pressable>
              <View style={styles.chipsWrap}>
                {localNodes.map((row, index) => {
                  const nodeKey = safeText(row?.node_key, String(index));
                  const active = selectedArtifactNode === nodeKey;
                  return (
                    <Pressable key={`${nodeKey}-${index}`} onPress={() => setSelectedArtifactNode(nodeKey)} style={[styles.chip, active && styles.chipActive]}>
                      <Text style={[styles.chipText, active && styles.chipTextActive]}>
                        {safeText(row?.display_name || nodeKey)}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </SectionCard>

            <SectionCard title="Catálogo de builds" subtitle={`${visibleArtifacts.length} filas · Nodo: ${selectedArtifactNode || "ninguno"}`}>
              <TextInput value={artifactNotes} onChangeText={setArtifactNotes} placeholder="Notas para sync local" style={styles.input} />
              {visibleArtifacts.slice(0, 16).map((row, index) => (
                <InfoCard
                  key={`${safeText(row?.id || row?.release_id, String(index))}-${index}`}
                  title={safeText(row?.artifact_path || row?.artifact_name)}
                  lines={[
                    `${safeText(row?.env_key, "-").toUpperCase()} / ${safeText(row?.version_label)}`,
                    `build: ${safeText(row?.build_id)} | sha: ${safeText(row?.source_commit_sha)}`,
                  ]}
                >
                  <View style={styles.actionsRow}>
                    <Pressable
                      onPress={() =>
                        void runAction(
                          `local_sync:${selectedArtifactNode}:${safeText(row?.release_id || row?.id, String(index))}`,
                          () =>
                            requestLocalArtifactSync({
                              releaseId: safeText(row?.release_id || row?.id, ""),
                              productKey: selectedProduct,
                              envKey: safeText(row?.env_key, ""),
                              semver: safeText(row?.version_label || safeVersionLabel(row), ""),
                              nodeKey: selectedArtifactNode,
                              notes: artifactNotes,
                              metadata: { source: "android_admin_artifacts" },
                            }),
                          `Sync local solicitada para ${safeText(row?.version_label || safeVersionLabel(row), "-")}.`,
                        )
                      }
                      disabled={!selectedArtifactNode}
                      style={[styles.secondaryBtn, !selectedArtifactNode && styles.btnDisabled]}
                    >
                      <Text style={styles.secondaryBtnText}>Solicitar sync</Text>
                    </Pressable>
                  </View>
                </InfoCard>
              ))}
              {!loading && visibleArtifacts.length === 0 ? (
                <Text style={styles.emptyText}>Sin artifacts para este filtro.</Text>
              ) : null}
            </SectionCard>

            <SectionCard title="Sincronizaciones locales" subtitle={`${localSyncRequests.length} filas`}>
              {localSyncRequests.slice(0, 16).map((row, index) => {
                const requestId = safeText(row?.id, String(index));
                return (
                  <InfoCard
                    key={`${requestId}-${index}`}
                    title={`${safeText(row?.node_name || row?.node_key)} / ${safeText(row?.version_label)}`}
                    lines={[
                      `status: ${safeText(row?.status)} | env: ${safeText(row?.env_key, "-").toUpperCase()}`,
                      `runner: ${safeText(row?.runner_label)} | creado: ${dateLabel(row?.created_at)}`,
                    ]}
                  >
                    <View style={styles.actionsRow}>
                      <Pressable
                        onPress={() =>
                          void runAction(
                            `cancel_sync:${requestId}`,
                            () => cancelLocalArtifactSyncRequest({ requestId }),
                            `Sync local ${requestId} cancelada.`,
                          )
                        }
                        style={styles.outlineBtn}
                      >
                        <Text style={styles.outlineBtnText}>Cancelar</Text>
                      </Pressable>
                    </View>
                  </InfoCard>
                );
              })}
              {!loading && localSyncRequests.length === 0 ? (
                <Text style={styles.emptyText}>Sin sync requests locales.</Text>
              ) : null}
            </SectionCard>
          </>
        ) : null}
      </ScrollView>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 16,
    paddingBottom: 24,
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  segment: {
    alignSelf: "flex-start",
    flexDirection: "row",
    flexShrink: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9E2F7",
    backgroundColor: "#FFFFFF",
    padding: 4,
  },
  tabChip: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    minHeight: 30,
    paddingHorizontal: 12,
  },
  tabChipActive: {
    backgroundColor: "#2F1A55",
  },
  tabChipText: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "600",
  },
  tabChipTextActive: {
    color: "#FFFFFF",
  },
  refresh: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9E2F7",
    justifyContent: "center",
    alignItems: "center",
  },
  refreshIcon: { width: 14, height: 14, tintColor: "#5E30A5" },
  workflowRow: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 8 },
  strong: { color: "#2F1A55", fontWeight: "600" },
  workflowOk: { fontSize: 12, color: "#047857", fontWeight: "600" },
  workflowWarning: { fontSize: 12, color: "#92400E", fontWeight: "600" },
  productSection: { gap: 8 },
  productTitle: { flexDirection: "row", alignItems: "center", gap: 8 },
  productTitleText: { fontSize: 18, lineHeight: 24, color: "#2F1A55", fontWeight: "600" },
  activityIcon: { width: 15, height: 15, tintColor: "#2F1A55" },
  environmentGrid: { gap: 12 },
  environmentGridWide: { flexDirection: "row", alignItems: "stretch" },
  environmentCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E9E2F7",
    backgroundColor: "#FFFFFF",
    padding: 16,
    gap: 6,
    elevation: 1,
  },
  environmentCardWide: { flex: 1 },
  environmentHeading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 4 },
  environmentLabel: { fontSize: 12, color: "#64748B", letterSpacing: 1.2 },
  inspect: { borderRadius: 8, borderWidth: 1, borderColor: "#E9E2F7", paddingHorizontal: 8, paddingVertical: 4 },
  inspectLabel: { fontSize: 11, color: "#5E30A5", fontWeight: "600" },
  releaseVersion: { color: "#2F1A55", fontSize: 24, lineHeight: 30, fontWeight: "800" },
  releaseStatus: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 4 },
  statusTags: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  statusTag: { color: "#047857", backgroundColor: "#D1FAE5", borderRadius: 12, paddingVertical: 3, paddingHorizontal: 7, fontSize: 10, fontWeight: "600", overflow: "hidden" },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    color: "#0F172A",
    paddingHorizontal: 10,
    paddingVertical: 9,
    fontSize: 13,
  },
  smallInput: {
    minWidth: 92,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    color: "#0F172A",
    paddingHorizontal: 10,
    paddingVertical: 9,
    fontSize: 13,
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: "#E9E2F7",
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  chipActive: {
    borderColor: "#2F1A55",
    backgroundColor: "#2F1A55",
  },
  chipText: {
    color: "#2F1A55",
    fontSize: 12,
    fontWeight: "600",
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
  actionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 10,
    gap: 4,
  },
  rowTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },
  metaText: {
    fontSize: 11,
    color: "#64748B",
  },
  primaryBtn: {
    borderRadius: 9,
    backgroundColor: "#2F1A55",
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#E9E2F7",
    borderRadius: 9,
    backgroundColor: "#FAF8FF",
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  secondaryBtnText: {
    color: "#5E30A5",
    fontSize: 12,
    fontWeight: "700",
  },
  outlineBtn: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  outlineBtnText: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "700",
  },
  btnDisabled: {
    opacity: 0.55,
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 12,
    fontWeight: "600",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FEE2E2",
    backgroundColor: "#FEF2F2",
  },
  okText: {
    color: "#166534",
    fontSize: 12,
    fontWeight: "600",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DCFCE7",
    backgroundColor: "#F0FDF4",
  },
  emptyText: {
    color: "#64748B",
    fontSize: 12,
  },
});
