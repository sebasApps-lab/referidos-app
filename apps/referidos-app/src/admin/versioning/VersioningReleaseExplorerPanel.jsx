import React, { useEffect, useMemo, useState } from "react";
import { History, Layers3, RefreshCw } from "lucide-react";
import Table from "../../components/ui/Table";
import {
  fetchComponentCatalog,
  fetchComponentHistory,
  fetchReleaseComponents,
  fetchReleasesByProductEnv,
  fetchVersioningCatalog,
  formatVersionLabel,
} from "./services/versioningService";

const DEFAULT_PRODUCT_KEY = "referidos_app";
const ENV_ORDER = ["dev", "staging", "prod"];
const ENV_RANK = {
  dev: 1,
  staging: 2,
  prod: 3,
};
const EMPTY_COMPONENT_HASH = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

function semverRowSortDesc(a, b) {
  const aMajor = Number(a.semver_major || 0);
  const bMajor = Number(b.semver_major || 0);
  if (aMajor !== bMajor) return bMajor - aMajor;
  const aMinor = Number(a.semver_minor || 0);
  const bMinor = Number(b.semver_minor || 0);
  if (aMinor !== bMinor) return bMinor - aMinor;
  const aPatch = Number(a.semver_patch || 0);
  const bPatch = Number(b.semver_patch || 0);
  if (aPatch !== bPatch) return bPatch - aPatch;
  const aPre = Number(a.prerelease_no || 0);
  const bPre = Number(b.prerelease_no || 0);
  if (aPre !== bPre) return bPre - aPre;
  return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
}

function normalizeEnvList(rows) {
  const envSet = new Set(
    (rows || [])
      .map((row) => String(row.env_key || "").toLowerCase())
      .filter(Boolean)
  );
  return ENV_ORDER.filter((env) => envSet.has(env));
}

function pickCanonicalRelease(rows) {
  if (!rows?.length) return null;
  return rows.reduce((winner, current) => {
    if (!winner) return current;
    const winnerRank = ENV_RANK[String(winner.env_key || "").toLowerCase()] || 0;
    const currentRank = ENV_RANK[String(current.env_key || "").toLowerCase()] || 0;
    if (currentRank !== winnerRank) return currentRank > winnerRank ? current : winner;
    const winnerTs = new Date(winner.created_at || 0).getTime();
    const currentTs = new Date(current.created_at || 0).getTime();
    return currentTs > winnerTs ? current : winner;
  }, null);
}

function groupReleasesByVersion(rows) {
  const sortedRows = [...(rows || [])].sort(semverRowSortDesc);
  const map = new Map();

  for (const row of sortedRows) {
    const versionLabel = formatVersionLabel(row);
    if (!map.has(versionLabel)) {
      map.set(versionLabel, []);
    }
    map.get(versionLabel).push(row);
  }

  return [...map.entries()].map(([versionLabel, versionRows]) => {
    const canonical = pickCanonicalRelease(versionRows);
    const envs = normalizeEnvList(versionRows);
    return {
      versionLabel,
      canonical,
      envs,
      rows: versionRows,
    };
  });
}

function resolveComponentState(row) {
  if (String(row?.content_hash || "") === EMPTY_COMPONENT_HASH) return "deleted";
  const revisionNo = Number(row?.revision_no || 0);
  const sourceBranch = String(row?.source_branch || "").toLowerCase();
  const sourceCommit = String(row?.source_commit_sha || "").toLowerCase();
  if (
    revisionNo === 1 &&
    sourceBranch !== "bootstrap" &&
    !sourceCommit.startsWith("baseline-")
  ) {
    return "new";
  }
  return "active";
}

function stateBadge(state) {
  if (state === "deleted") {
    return (
      <span className="rounded-full bg-red-100 px-2 py-1 text-[11px] font-semibold text-red-700">
        Eliminado
      </span>
    );
  }
  if (state === "new") {
    return (
      <span className="rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-700">
        Nuevo
      </span>
    );
  }
  return (
    <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600">
      Activo
    </span>
  );
}

export default function VersioningReleaseExplorerPanel() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [releaseGroups, setReleaseGroups] = useState([]);
  const [selectedReleaseVersion, setSelectedReleaseVersion] = useState("");
  const [components, setComponents] = useState([]);
  const [selectedComponentId, setSelectedComponentId] = useState("");
  const [historyRows, setHistoryRows] = useState([]);
  const selectedProductMeta = useMemo(
    () => products.find((product) => product.product_key === selectedProduct) || null,
    [products, selectedProduct]
  );

  const selectedRelease = useMemo(
    () => releaseGroups.find((group) => group.versionLabel === selectedReleaseVersion) || null,
    [releaseGroups, selectedReleaseVersion]
  );
  const isInitialized =
    Boolean(selectedProductMeta?.initialized) ||
    Number(selectedProductMeta?.component_count || 0) > 0;

  const loadCatalog = async () => {
    const catalog = await fetchVersioningCatalog();
    setProducts(catalog.products || []);
    if (!selectedProduct && catalog.products?.length) {
      const defaultProduct =
        catalog.products.find((product) => product.product_key === DEFAULT_PRODUCT_KEY)?.product_key ||
        catalog.products[0].product_key;
      setSelectedProduct(defaultProduct);
    }
  };

  const loadReleases = async (productKey) => {
    if (!productKey) {
      setReleaseGroups([]);
      setSelectedReleaseVersion("");
      return;
    }
    const rows = await fetchReleasesByProductEnv(productKey, "");
    const grouped = groupReleasesByVersion(rows);
    setReleaseGroups(grouped);
    if (!grouped.find((group) => group.versionLabel === selectedReleaseVersion)) {
      setSelectedReleaseVersion(grouped[0]?.versionLabel || "");
    }
  };

  const loadComponents = async (releaseGroup) => {
    const releaseId = releaseGroup?.canonical?.id || "";
    let rows = [];
    if (releaseId) {
      rows = await fetchReleaseComponents(releaseId);
    } else if (selectedProduct && isInitialized) {
      rows = await fetchComponentCatalog(selectedProduct);
    }
    setComponents(rows);
    if (!rows.find((row) => row.component_id === selectedComponentId)) {
      setSelectedComponentId(rows[0]?.component_id || "");
    }
  };

  const loadHistory = async (componentId) => {
    if (!componentId) {
      setHistoryRows([]);
      return;
    }
    const rows = await fetchComponentHistory(componentId, 30);
    setHistoryRows(rows);
  };

  const load = async (manual = false) => {
    if (manual) setRefreshing(true);
    else setLoading(true);
    setError("");
    try {
      await loadCatalog();
    } catch (err) {
      setError(err?.message || "No se pudo cargar catalogo de versionado.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const run = async () => {
      try {
        await loadReleases(selectedProduct);
      } catch (err) {
        setError(err?.message || "No se pudieron cargar releases.");
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct]);

  useEffect(() => {
    const run = async () => {
      try {
        await loadComponents(selectedRelease);
      } catch (err) {
        setError(err?.message || "No se pudieron cargar componentes.");
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRelease, selectedProduct, isInitialized]);

  useEffect(() => {
    const run = async () => {
      try {
        await loadHistory(selectedComponentId);
      } catch (err) {
        setError(err?.message || "No se pudo cargar historial de componente.");
      }
    };
    run();
  }, [selectedComponentId]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="grid gap-2 sm:grid-cols-2">
          <select
            value={selectedProduct}
            onChange={(event) => setSelectedProduct(event.target.value)}
            className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
          >
            {products.map((product) => (
              <option key={product.id} value={product.product_key}>
                {product.name}
              </option>
            ))}
          </select>
          <select
            value={selectedReleaseVersion}
            onChange={(event) => setSelectedReleaseVersion(event.target.value)}
            disabled={!isInitialized || releaseGroups.length === 0}
            className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
          >
            {isInitialized && releaseGroups.length > 0 ? (
              releaseGroups.map((group) => (
                <option key={group.versionLabel} value={group.versionLabel}>
                  {group.versionLabel} [{group.envs.map((env) => env.toUpperCase()).join(" / ") || "-"}]
                </option>
              ))
            ) : (
              <option value="">Sin release (pendiente)</option>
            )}
          </select>
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
      {!loading && !isInitialized ? (
        <div className="rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-xs text-slate-600">
          Esta app aun no esta inicializada en versionado. Ejecuta bootstrap por producto para habilitar releases.
        </div>
      ) : null}

      {loading ? (
        <div className="rounded-2xl border border-[#E9E2F7] bg-white px-4 py-6 text-sm text-slate-500">
          Cargando explorer...
        </div>
      ) : (
        <>
          <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
              <Layers3 size={15} />
              Snapshot de componentes
            </div>
            <div className="mt-2 text-xs text-slate-500">
              Release seleccionada:{" "}
              <strong>
                {selectedRelease
                  ? `${selectedRelease.versionLabel} (${selectedRelease.envs.map((env) => env.toUpperCase()).join(" / ")})`
                  : isInitialized
                    ? "Sin release (pendiente)"
                    : "-"}
              </strong>
            </div>
            <Table
              className="mt-3"
              columns={[
                { key: "component", label: "Componente" },
                { key: "type", label: "Tipo", align: "center" },
                { key: "state", label: "Estado", align: "center" },
                { key: "revision", label: "Revision", align: "right" },
                { key: "bump", label: "Bump", align: "center" },
                { key: "commit", label: "Commit" },
              ]}
            >
              {components.map((row) => {
                const state = resolveComponentState(row);
                return (
                  <tr
                    key={`${row.component_id}-${row.revision_id}`}
                    className={`hover:bg-[#FAF8FF] cursor-pointer ${
                      selectedComponentId === row.component_id ? "bg-[#F4EEFF]" : ""
                    }`}
                    onClick={() => setSelectedComponentId(row.component_id)}
                  >
                    <td className="px-4 py-3 text-xs text-slate-700">{row.component_key}</td>
                    <td className="px-4 py-3 text-center text-xs text-slate-600">{row.component_type}</td>
                    <td className="px-4 py-3 text-center">{stateBadge(state)}</td>
                    <td className="px-4 py-3 text-right text-xs font-semibold text-[#2F1A55]">
                      r{row.revision_no}
                    </td>
                    <td className="px-4 py-3 text-center text-xs text-slate-600">{row.bump_level}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{row.source_commit_sha}</td>
                  </tr>
                );
              })}
            </Table>
          </div>

          <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
              <History size={15} />
              Historial del componente
            </div>
            <div className="mt-2 text-xs text-slate-500">
              Componente seleccionado: <strong>{selectedComponentId || "-"}</strong>
            </div>
            <Table
              className="mt-3"
              columns={[
                { key: "revision", label: "Revision", align: "right" },
                { key: "state", label: "Estado", align: "center" },
                { key: "bump", label: "Bump", align: "center" },
                { key: "branch", label: "Branch" },
                { key: "commit", label: "Commit" },
                { key: "date", label: "Fecha" },
              ]}
            >
              {historyRows.map((row) => {
                const state = resolveComponentState(row);
                return (
                  <tr key={row.id} className="hover:bg-[#FAF8FF]">
                    <td className="px-4 py-3 text-right text-xs font-semibold text-[#2F1A55]">
                      r{row.revision_no}
                    </td>
                    <td className="px-4 py-3 text-center">{stateBadge(state)}</td>
                    <td className="px-4 py-3 text-center text-xs text-slate-600">{row.bump_level}</td>
                    <td className="px-4 py-3 text-xs text-slate-600">{row.source_branch}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{row.source_commit_sha}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {new Date(row.created_at).toLocaleString("es-EC")}
                    </td>
                  </tr>
                );
              })}
            </Table>
          </div>
        </>
      )}
    </div>
  );
}
