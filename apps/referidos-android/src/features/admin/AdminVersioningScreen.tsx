import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
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
  fetchLocalArtifactNodes,
  fetchLocalArtifactSyncRequests,
  fetchPromotionHistory,
  fetchReleaseArtifacts,
  fetchReleaseComponents,
  fetchReleaseSnapshot,
  fetchReleasesByProductEnv,
  fetchVersioningCatalog,
  fetchWorkflowPackStatus,
  formatVersionLabel,
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

type Tab = "overview" | "operations" | "artifacts";

const PRODUCT_PRIORITY = ["referidos_app", "prelaunch_web", "android_app"];
const DEPLOY_ENVS = ["staging", "prod"];

function safeText(value: any, fallback = "-") {
  const next = String(value || "").trim();
  return next || fallback;
}

function safeVersionLabel(row: any) {
  if (
    Number.isFinite(Number(row?.semver_major)) &&
    Number.isFinite(Number(row?.semver_minor)) &&
    Number.isFinite(Number(row?.semver_patch))
  ) {
    return formatVersionLabel(row);
  }
  return safeText(row?.version_label || row?.semver, "-");
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
  const [tab, setTab] = useState<Tab>("overview");
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

  const selectedRelease = useMemo(
    () =>
      sortedReleases.find((row) => String(row?.id || row?.version_label || "") === selectedReleaseId) ||
      null,
    [selectedReleaseId, sortedReleases],
  );

  const deployRows = useMemo(
    () =>
      deployRequests.filter(
        (row) => safeText(row?.product_key || selectedProduct, selectedProduct) === selectedProduct,
      ),
    [deployRequests, selectedProduct],
  );

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
    const releaseId = safeText(row?.id || row?.release_id, "");
    if (!releaseId) return;
    setSelectedReleaseId(releaseId);
    setDetailLoading(true);
    const envKey = String(row?.env_key || "").trim().toLowerCase();
    const semver = safeVersionLabel(row);
    const [snapshotResult, componentsResult] = await Promise.allSettled([
      fetchReleaseSnapshot({ releaseId, productKey, envKey, semver }),
      fetchReleaseComponents(releaseId),
    ]);
    setReleaseSnapshot(settledValue(snapshotResult, null));
    setReleaseComponents(settledValue(componentsResult, []));
    const detailError = settledError(snapshotResult) || settledError(componentsResult);
    if (detailError) setError(detailError);
    setDetailLoading(false);
  }, []);

  const loadAll = useCallback(
    async (productKey?: string) => {
      setLoading(true);
      setError("");
      try {
        const catalog = await fetchVersioningCatalog();
        const productRows = Array.isArray(catalog?.products) ? catalog.products : [];
        const sortedProducts = [...productRows].sort((a, b) => {
          const aIndex = PRODUCT_PRIORITY.indexOf(String(a?.product_key || ""));
          const bIndex = PRODUCT_PRIORITY.indexOf(String(b?.product_key || ""));
          if (aIndex !== -1 || bIndex !== -1) {
            return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
          }
          return safeText(a?.name, "").localeCompare(safeText(b?.name, ""), "es");
        });
        const effectiveProduct = productKey || selectedProduct || sortedProducts[0]?.product_key || "referidos_app";
        const effectiveMeta =
          sortedProducts.find((row) => row?.product_key === effectiveProduct) || null;

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
        ]);

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

        if (nextNodes.length > 0) {
          setSelectedArtifactNode((current) => current || String(nextNodes[0]?.node_key || ""));
        }

        const firstError = results.map(settledError).find(Boolean);
        if (firstError) setError(String(firstError));

        if (nextReleases.length > 0) {
          const current =
            nextReleases.find((row) => String(row?.id || row?.version_label || "") === selectedReleaseId) ||
            nextReleases[0];
          await loadReleaseDetails(current, effectiveProduct);
        } else {
          setSelectedReleaseId("");
          setReleaseSnapshot(null);
          setReleaseComponents([]);
        }
      } catch (err: any) {
        setError(String(err?.message || err || "No se pudo cargar versioning."));
      } finally {
        setLoading(false);
      }
    },
    [loadReleaseDetails, selectedProduct],
  );

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  const runAction = useCallback(
    async (key: string, action: () => Promise<any>, successMessage: string, reloadAfter = true) => {
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
        setBusyKey("");
      }
    },
    [loadAll, selectedProduct],
  );

  const handlePreviewDevRelease = useCallback(async () => {
    setBusyKey("preview_dev_release");
    setError("");
    setOk("");
    try {
      const result = await previewDevRelease({ productKey: selectedProduct, ref: "dev" });
      setPreviewData(result || null);
      setOk("Preview de release cargado.");
    } catch (err: any) {
      setError(String(err?.message || err || "No se pudo previsualizar el release."));
    } finally {
      setBusyKey("");
    }
  }, [selectedProduct]);

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

  const handleDrift = useCallback(async () => {
    setBusyKey("drift");
    setError("");
    setOk("");
    try {
      const rows = await fetchDrift(selectedProduct, driftFrom, driftTo);
      setDriftRows(Array.isArray(rows) ? rows : []);
      setOk("Drift cargado.");
    } catch (err: any) {
      setError(String(err?.message || err || "No se pudo comparar drift."));
    } finally {
      setBusyKey("");
    }
  }, [driftFrom, driftTo, selectedProduct]);

  return (
    <ScreenScaffold title="Admin Versioning" subtitle="Release explorer, promote, deploy y artifacts">
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard
          title="Producto"
          subtitle="Paridad con versioning-ops-proxy y panel web"
          right={
            <Pressable
              onPress={() => void loadAll(selectedProduct)}
              disabled={loading}
              style={[styles.secondaryBtn, loading && styles.btnDisabled]}
            >
              <Text style={styles.secondaryBtnText}>{loading ? "..." : "Recargar"}</Text>
            </Pressable>
          }
        >
          <View style={styles.chipsWrap}>
            {products.map((product) => {
              const key = safeText(product?.product_key, "");
              const active = selectedProduct === key;
              return (
                <Pressable
                  key={key}
                  onPress={() => void loadAll(key)}
                  style={[styles.chip, active && styles.chipActive]}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {safeText(product?.name || key)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          {selectedProductMeta ? (
            <Text style={styles.metaText}>
              product_key: {safeText(selectedProductMeta?.product_key)} | initialized:{" "}
              {selectedProductMeta?.initialized ? "si" : "no"}
            </Text>
          ) : null}
          {workflowStatus ? (
            <Text style={styles.metaText}>
              workflow pack: {safeText(workflowStatus?.status || workflowStatus?.summary)}
            </Text>
          ) : null}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {ok ? <Text style={styles.okText}>{ok}</Text> : null}
        </SectionCard>

        <View style={styles.tabRow}>
          {([
            { id: "overview", label: "Overview" },
            { id: "operations", label: "Operaciones" },
            { id: "artifacts", label: "Artifacts" },
          ] as Array<{ id: Tab; label: string }>).map((item) => (
            <Pressable
              key={item.id}
              onPress={() => setTab(item.id)}
              style={[styles.tabChip, tab === item.id && styles.tabChipActive]}
            >
              <Text style={[styles.tabChipText, tab === item.id && styles.tabChipTextActive]}>
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {tab === "overview" ? (
          <>
            <SectionCard title="Release development" subtitle="Preview, create release y workflow pack">
              {loading ? <BlockSkeleton lines={4} compact /> : null}
              {!loading ? (
                <>
                  <TextInput
                    value={devReleaseNotes}
                    onChangeText={setDevReleaseNotes}
                    placeholder="Notas del release"
                    style={styles.input}
                  />
                  <View style={styles.actionsRow}>
                    <Pressable
                      onPress={() => void handlePreviewDevRelease()}
                      disabled={busyKey === "preview_dev_release"}
                      style={[styles.secondaryBtn, busyKey === "preview_dev_release" && styles.btnDisabled]}
                    >
                      <Text style={styles.secondaryBtnText}>Preview</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => void handleCreateDevRelease()}
                      disabled={busyKey === "create_dev_release"}
                      style={[styles.primaryBtn, busyKey === "create_dev_release" && styles.btnDisabled]}
                    >
                      <Text style={styles.primaryBtnText}>Crear release</Text>
                    </Pressable>
                    <Pressable
                      onPress={() =>
                        void runAction(
                          "workflow_pack_full",
                          () => syncWorkflowPack({ sourceRef: "dev", syncStaging: true, syncProd: true }),
                          "Workflow pack sincronizado.",
                        )
                      }
                      disabled={busyKey === "workflow_pack_full"}
                      style={[styles.outlineBtn, busyKey === "workflow_pack_full" && styles.btnDisabled]}
                    >
                      <Text style={styles.outlineBtnText}>Sync workflow pack</Text>
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
                </>
              ) : null}
            </SectionCard>

            <SectionCard title="Release explorer" subtitle="Detalle y componentes de la release seleccionada">
              {loading ? <BlockSkeleton lines={7} compact /> : null}
              {!loading && sortedReleases.length === 0 ? (
                <Text style={styles.emptyText}>Sin releases para este producto.</Text>
              ) : null}
              {!loading ? (
                <>
                  <View style={styles.chipsWrap}>
                    {sortedReleases.map((row, index) => {
                      const rowId = String(row?.id || row?.version_label || index);
                      const active = selectedReleaseId === rowId;
                      return (
                        <Pressable
                          key={rowId}
                          onPress={() => void loadReleaseDetails(row, selectedProduct)}
                          style={[styles.chip, active && styles.chipActive]}
                        >
                          <Text style={[styles.chipText, active && styles.chipTextActive]}>
                            {safeVersionLabel(row)} [{safeText(row?.env_key, "-").toUpperCase()}]
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                  {detailLoading ? <BlockSkeleton lines={4} compact /> : null}
                  {!detailLoading && selectedRelease ? (
                    <InfoCard
                      title={`${safeVersionLabel(selectedRelease)} [${safeText(selectedRelease?.env_key, "-").toUpperCase()}]`}
                      lines={[
                        `status: ${safeText(selectedRelease?.status)} | commit: ${safeText(selectedRelease?.source_commit_sha)}`,
                        `creado: ${dateLabel(selectedRelease?.created_at)} | canal: ${safeText(selectedRelease?.channel || selectedRelease?.env_key)}`,
                        `snapshot: ${safeText(releaseSnapshot?.env_key || selectedRelease?.env_key)} | componentes: ${Array.isArray(releaseComponents) ? releaseComponents.length : 0}`,
                      ]}
                    />
                  ) : null}
                  {releaseComponents.slice(0, 12).map((row, index) => (
                    <InfoCard
                      key={`${safeText(row?.component_key || row?.id, String(index))}-${index}`}
                      title={safeText(row?.component_key || row?.name || row?.id)}
                      lines={[
                        `version: ${safeText(row?.version_label || row?.version || row?.revision)}`,
                        `hash: ${safeText(row?.checksum || row?.hash || row?.artifact_sha)}`,
                      ]}
                    />
                  ))}
                </>
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

        {tab === "operations" ? (
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
                        onPress={async () => {
                          setBusyKey(`gate:${semver}:${selectedDeployEnv}`);
                          setError("");
                          setOk("");
                          try {
                            const result = await checkReleaseMigrations({
                              productKey: selectedProduct,
                              envKey: selectedDeployEnv,
                              semver,
                            });
                            setMigrationGate(result || null);
                            setOk(`Gate calculado para ${selectedDeployEnv} ${semver}.`);
                          } catch (err: any) {
                            setError(String(err?.message || err || "No se pudo calcular el gate."));
                          } finally {
                            setBusyKey("");
                          }
                        }}
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

        {tab === "artifacts" ? (
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

            <SectionCard title="Artifacts" subtitle={`${visibleArtifacts.length} filas | nodo: ${selectedArtifactNode || "ninguno"}`}>
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

            <SectionCard title="Sync requests locales" subtitle={`${localSyncRequests.length} filas`}>
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
    gap: 12,
    paddingBottom: 24,
  },
  tabRow: {
    flexDirection: "row",
    gap: 8,
  },
  tabChip: {
    flex: 1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    alignItems: "center",
  },
  tabChipActive: {
    borderColor: "#5B21B6",
    backgroundColor: "#F5F3FF",
  },
  tabChipText: {
    color: "#475569",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  tabChipTextActive: {
    color: "#5B21B6",
  },
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
    borderColor: "#CBD5E1",
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  chipActive: {
    borderColor: "#5B21B6",
    backgroundColor: "#F5F3FF",
  },
  chipText: {
    color: "#334155",
    fontSize: 11,
    fontWeight: "700",
  },
  chipTextActive: {
    color: "#5B21B6",
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
    backgroundColor: "#1D4ED8",
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
    borderColor: "#1D4ED8",
    borderRadius: 9,
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  secondaryBtnText: {
    color: "#1D4ED8",
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
  },
  okText: {
    color: "#166534",
    fontSize: 12,
    fontWeight: "600",
  },
  emptyText: {
    color: "#64748B",
    fontSize: 12,
  },
});
