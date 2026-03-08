import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import SectionCard from "@shared/ui/SectionCard";
import BlockSkeleton from "@shared/ui/BlockSkeleton";
import {
  createDevRelease,
  fetchDeployRequests,
  fetchDrift,
  fetchReleaseArtifacts,
  fetchReleasesByProductEnv,
  fetchVersioningCatalog,
  previewDevRelease,
  validateEnvironmentContract,
} from "@shared/services/versioningService";

function versionLabel(row: any) {
  if (!row) return "-";
  const base = `${row.semver_major}.${row.semver_minor}.${row.semver_patch}`;
  if (!row.prerelease_tag) return base;
  return `${base}-${row.prerelease_tag}.${row.prerelease_no}`;
}

const PRODUCT_PRIORITY = ["referidos_app", "prelaunch_web", "android_app"];

export default function AdminVersioningScreen() {
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("referidos_app");
  const [releases, setReleases] = useState<any[]>([]);
  const [artifacts, setArtifacts] = useState<any[]>([]);
  const [deployRequests, setDeployRequests] = useState<any[]>([]);
  const [driftRows, setDriftRows] = useState<any[]>([]);
  const [driftFrom, setDriftFrom] = useState("staging");
  const [driftTo, setDriftTo] = useState("prod");
  const [devReleaseNotes, setDevReleaseNotes] = useState("");
  const [previewData, setPreviewData] = useState<any | null>(null);

  const loadAll = useCallback(
    async (productKey?: string) => {
      const nextProduct = productKey || selectedProduct;
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
          return String(a?.name || "").localeCompare(String(b?.name || ""), "es");
        });
        setProducts(sortedProducts);
        const effectiveProduct = nextProduct || sortedProducts[0]?.product_key || "referidos_app";
        setSelectedProduct(effectiveProduct);

        const [nextReleases, nextArtifacts, nextDeployRequests] = await Promise.all([
          fetchReleasesByProductEnv(effectiveProduct, ""),
          fetchReleaseArtifacts({ productKey: effectiveProduct, limit: 50 }),
          fetchDeployRequests({ productKey: effectiveProduct }),
        ]);
        setReleases(Array.isArray(nextReleases) ? nextReleases.slice(0, 20) : []);
        setArtifacts(Array.isArray(nextArtifacts) ? nextArtifacts.slice(0, 20) : []);
        setDeployRequests(Array.isArray(nextDeployRequests) ? nextDeployRequests.slice(0, 20) : []);
      } catch (err: any) {
        setError(String(err?.message || err || "No se pudo cargar versioning."));
      } finally {
        setLoading(false);
      }
    },
    [selectedProduct],
  );

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  const selectedProductMeta = useMemo(
    () => products.find((row) => row.product_key === selectedProduct) || null,
    [products, selectedProduct],
  );

  const handlePreviewDevRelease = useCallback(async () => {
    setBusy(true);
    setError("");
    setOk("");
    try {
      const result = await previewDevRelease({
        productKey: selectedProduct,
        ref: "dev",
      });
      setPreviewData(result || null);
      setOk("Preview de release cargado.");
    } catch (err: any) {
      setError(String(err?.message || err || "No se pudo previsualizar el release."));
    } finally {
      setBusy(false);
    }
  }, [selectedProduct]);

  const handleCreateDevRelease = useCallback(async () => {
    setBusy(true);
    setError("");
    setOk("");
    try {
      const result = await createDevRelease({
        productKey: selectedProduct,
        ref: "dev",
        releaseNotes: devReleaseNotes,
      });
      setPreviewData(result || null);
      setOk("Release development solicitado.");
      await loadAll(selectedProduct);
    } catch (err: any) {
      setError(String(err?.message || err || "No se pudo crear el release."));
    } finally {
      setBusy(false);
    }
  }, [devReleaseNotes, loadAll, selectedProduct]);

  const handleValidateEnv = useCallback(
    async (envKey: string) => {
      setBusy(true);
      setError("");
      setOk("");
      try {
        const result = await validateEnvironmentContract({
          productKey: selectedProduct,
          envKey,
        });
        setOk(`Validacion ${envKey}: ${result?.summary || "ok"}`);
      } catch (err: any) {
        setError(String(err?.message || err || "No se pudo validar el ambiente."));
      } finally {
        setBusy(false);
      }
    },
    [selectedProduct],
  );

  const handleDrift = useCallback(async () => {
    setBusy(true);
    setError("");
    setOk("");
    try {
      const rows = await fetchDrift(selectedProduct, driftFrom, driftTo);
      setDriftRows(Array.isArray(rows) ? rows : []);
      setOk("Drift cargado.");
    } catch (err: any) {
      setError(String(err?.message || err || "No se pudo comparar drift."));
    } finally {
      setBusy(false);
    }
  }, [driftFrom, driftTo, selectedProduct]);

  return (
    <ScreenScaffold title="Admin Versioning" subtitle="Overview runtime del sistema de releases">
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard
          title="Producto"
          subtitle="Mismo versioning-ops-proxy que usa la web"
          right={
            <Pressable onPress={() => void loadAll(selectedProduct)} disabled={loading} style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>{loading ? "..." : "Recargar"}</Text>
            </Pressable>
          }
        >
          <View style={styles.chipsWrap}>
            {products.map((product) => {
              const active = selectedProduct === product.product_key;
              return (
                <Pressable
                  key={product.id || product.product_key}
                  onPress={() => void loadAll(product.product_key)}
                  style={[styles.chip, active && styles.chipActive]}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {String(product.name || product.product_key)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          {selectedProductMeta ? (
            <Text style={styles.metaText}>
              product_key: {selectedProductMeta.product_key} | initialized:{" "}
              {selectedProductMeta.initialized ? "si" : "no"}
            </Text>
          ) : null}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {ok ? <Text style={styles.okText}>{ok}</Text> : null}
        </SectionCard>

        <SectionCard title="Release development">
          {loading ? <BlockSkeleton lines={5} compact /> : null}
          {!loading ? (
            <>
              <TextInput
                value={devReleaseNotes}
                onChangeText={setDevReleaseNotes}
                placeholder="Notas del release (opcional)"
                style={styles.input}
              />
              <View style={styles.actionsRow}>
                <Pressable onPress={() => void handlePreviewDevRelease()} disabled={busy} style={styles.secondaryBtn}>
                  <Text style={styles.secondaryBtnText}>Preview</Text>
                </Pressable>
                <Pressable onPress={() => void handleCreateDevRelease()} disabled={busy} style={styles.primaryBtn}>
                  <Text style={styles.primaryBtnText}>Crear release</Text>
                </Pressable>
                <Pressable onPress={() => void handleValidateEnv("staging")} disabled={busy} style={styles.outlineBtn}>
                  <Text style={styles.outlineBtnText}>Validar staging</Text>
                </Pressable>
                <Pressable onPress={() => void handleValidateEnv("prod")} disabled={busy} style={styles.outlineBtn}>
                  <Text style={styles.outlineBtnText}>Validar prod</Text>
                </Pressable>
              </View>
              {previewData ? (
                <View style={styles.card}>
                  <Text style={styles.rowTitle}>
                    sugerida: {String(previewData?.suggested_semver || previewData?.semver || "-")}
                  </Text>
                  <Text style={styles.metaText}>
                    source: {String(previewData?.suggestion_source || previewData?.source || "-")}
                  </Text>
                  <Text style={styles.metaText}>
                    archivos: {String(previewData?.changed_files_count || previewData?.changedFilesCount || 0)}
                  </Text>
                </View>
              ) : null}
            </>
          ) : null}
        </SectionCard>

        <SectionCard title="Releases recientes">
          {loading ? <BlockSkeleton lines={6} compact /> : null}
          {!loading && releases.length === 0 ? (
            <Text style={styles.emptyText}>Sin releases para este producto.</Text>
          ) : null}
          {!loading
            ? releases.map((row) => (
                <View key={String(row?.id || versionLabel(row))} style={styles.card}>
                  <View style={styles.rowTop}>
                    <Text style={styles.rowTitle}>{versionLabel(row)}</Text>
                    <Text style={styles.metaBadge}>{String(row?.env_key || "-").toUpperCase()}</Text>
                  </View>
                  <Text style={styles.metaText}>
                    status: {String(row?.status || "-")} | commit: {String(row?.source_commit_sha || "-")}
                  </Text>
                  <Text style={styles.metaText}>
                    canal: {String(row?.channel || row?.env_key || "-")} | creado:{" "}
                    {String(row?.created_at || "-")}
                  </Text>
                </View>
              ))
            : null}
        </SectionCard>

        <SectionCard title="Artifacts" subtitle={`${artifacts.length} filas`}>
          {loading ? <BlockSkeleton lines={4} compact /> : null}
          {!loading && artifacts.length === 0 ? (
            <Text style={styles.emptyText}>Sin artifacts registrados.</Text>
          ) : null}
          {!loading
            ? artifacts.map((row) => (
                <View key={String(row?.id || row?.release_id || Math.random())} style={styles.card}>
                  <Text style={styles.rowTitle}>{String(row?.artifact_path || row?.artifact_name || "-")}</Text>
                  <Text style={styles.metaText}>
                    build: {String(row?.build_id || "-")} | sha: {String(row?.source_commit_sha || "-")}
                  </Text>
                </View>
              ))
            : null}
        </SectionCard>

        <SectionCard title="Deploy requests" subtitle={`${deployRequests.length} filas`}>
          {loading ? <BlockSkeleton lines={4} compact /> : null}
          {!loading && deployRequests.length === 0 ? (
            <Text style={styles.emptyText}>Sin deploy requests para este producto.</Text>
          ) : null}
          {!loading
            ? deployRequests.map((row) => (
                <View key={String(row?.id || Math.random())} style={styles.card}>
                  <Text style={styles.rowTitle}>
                    {String(row?.to_env_key || row?.env_key || "-").toUpperCase()} /{" "}
                    {String(row?.version_label || "-")}
                  </Text>
                  <Text style={styles.metaText}>
                    status: {String(row?.status || "-")} | deployment: {String(row?.deployment_status || "-")}
                  </Text>
                </View>
              ))
            : null}
        </SectionCard>

        <SectionCard title="Drift">
          <View style={styles.actionsRow}>
            <TextInput value={driftFrom} onChangeText={setDriftFrom} style={styles.smallInput} />
            <TextInput value={driftTo} onChangeText={setDriftTo} style={styles.smallInput} />
            <Pressable onPress={() => void handleDrift()} disabled={busy} style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>Comparar</Text>
            </Pressable>
          </View>
          {driftRows.length === 0 ? (
            <Text style={styles.emptyText}>Aun no se ha ejecutado comparacion.</Text>
          ) : null}
          {driftRows.slice(0, 20).map((row) => (
            <View key={String(row?.component_key || Math.random())} style={styles.card}>
              <Text style={styles.rowTitle}>{String(row?.component_key || "-")}</Text>
              <Text style={styles.metaText}>
                {driftFrom}: {String(row?.revision_a ?? "-")} | {driftTo}: {String(row?.revision_b ?? "-")}
              </Text>
              <Text style={styles.metaText}>estado: {row?.differs ? "drift" : "igual"}</Text>
            </View>
          ))}
        </SectionCard>
      </ScrollView>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 12,
    paddingBottom: 24,
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
    fontSize: 11,
    fontWeight: "700",
    color: "#334155",
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
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  rowTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },
  metaBadge: {
    borderRadius: 999,
    backgroundColor: "#E2E8F0",
    color: "#334155",
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 10,
    fontWeight: "700",
    overflow: "hidden",
  },
  metaText: {
    fontSize: 11,
    color: "#64748B",
  },
  primaryBtn: {
    backgroundColor: "#1D4ED8",
    borderRadius: 9,
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
    backgroundColor: "#EFF6FF",
    borderRadius: 9,
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
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  outlineBtnText: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "700",
  },
  errorText: {
    fontSize: 12,
    color: "#B91C1C",
    fontWeight: "600",
  },
  okText: {
    fontSize: 12,
    color: "#166534",
    fontWeight: "600",
  },
  emptyText: {
    fontSize: 12,
    color: "#64748B",
  },
});
