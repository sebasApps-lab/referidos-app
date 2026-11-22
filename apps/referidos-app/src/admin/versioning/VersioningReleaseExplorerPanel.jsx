import React, { useCallback, useEffect, useMemo, useState } from "react";
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
const ENV_LABEL = {
  dev: "Desarrollo",
  staging: "Staging",
  prod: "Producción",
};
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
  const envs = [...new Set(rows.map(releaseEnv).filter(Boolean))];
  return [
    ...ENV_ORDER.filter((env) => envs.includes(env)),
    ...envs.filter((env) => !ENV_ORDER.includes(env)),
  ];
}

function releaseEnv(row) {
  return String(row?.env_key || "").trim().toLowerCase();
}

function pickCanonicalRelease(rows) {
  if (!rows?.length) return null;
  return rows.reduce((winner, current) => {
    if (!winner) return current;
    const winnerRank = ENV_RANK[releaseEnv(winner)] || 0;
    const currentRank = ENV_RANK[releaseEnv(current)] || 0;
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

function useExplorerRead(requestKey, read, errorMessage) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!requestKey) return undefined;
    let current = true;

    async function load() {
      try {
        const data = await read();
        if (current) setResult({ requestKey, data, error: "" });
      } catch (error) {
        if (current) setResult({ requestKey, data: null, error: error?.message || errorMessage });
      }
    }

    void load();
    return () => {
      current = false;
    };
  }, [requestKey, read, errorMessage]);

  const activeResult = requestKey && result?.requestKey === requestKey ? result : null;
  return {
    data: activeResult?.data ?? null,
    error: activeResult?.error || "",
    loading: Boolean(requestKey && !activeResult),
  };
}

function ReadNotice({ error, children }) {
  return (
    <p
      role={error ? "alert" : "status"}
      className={`rounded-xl border px-3 py-2 text-xs ${
        error ? "border-red-100 bg-red-50 text-red-600" : "border-[#E9E2F7] bg-[#FAF8FF] text-slate-600"
      }`}
    >
      {error || children}
    </p>
  );
}

function formatDate(value) {
  const date = new Date(value || "");
  return Number.isFinite(date.getTime()) ? date.toLocaleString("es-EC") : "—";
}

const FILTER_CLASS =
  "w-full rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-sm text-slate-700 disabled:bg-[#FAF8FF] disabled:text-slate-500";
const SECTION_CLASS = "space-y-3 rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm sm:p-5";

export default function VersioningReleaseExplorerPanel({ initialProductKey = "" }) {
  const [refreshCount, setRefreshCount] = useState(0);
  const [selection, setSelection] = useState(() => ({
    productKey: initialProductKey,
    version: "",
    env: "",
    componentId: "",
    productChange: 0,
    releaseChange: 0,
    componentChange: 0,
  }));

  // Descendant requests are scoped to their parent's result and selection generation.
  const catalogKey = `catalog:${refreshCount}`;
  const catalog = useExplorerRead(
    catalogKey,
    fetchVersioningCatalog,
    "No se pudo cargar el catálogo de versionado."
  );
  const products = catalog.data?.products || [];
  const selectedProduct =
    products.find((product) => product.product_key === selection.productKey) ||
    products.find((product) => product.product_key === DEFAULT_PRODUCT_KEY) ||
    products[0];
  const productKey = selectedProduct?.product_key || "";
  const isInitialized =
    Boolean(selectedProduct?.initialized) || Number(selectedProduct?.component_count || 0) > 0;

  const releasesKey = productKey ? `${catalogKey}:${selection.productChange}:${productKey}` : "";
  const readReleases = useCallback(() => fetchReleasesByProductEnv(productKey, ""), [productKey]);
  const releases = useExplorerRead(
    releasesKey,
    readReleases,
    "No se pudieron cargar las releases del producto."
  );
  const releaseGroups = useMemo(() => groupReleasesByVersion(releases.data), [releases.data]);
  const selectedGroup =
    releaseGroups.find((group) => group.versionLabel === selection.version) || releaseGroups[0];
  const selectedEnv = selectedGroup?.envs.includes(selection.env)
    ? selection.env
    : releaseEnv(selectedGroup?.canonical);
  const selectedRelease = selectedGroup
    ? pickCanonicalRelease(selectedGroup.rows.filter((row) => releaseEnv(row) === selectedEnv))
    : null;
  const releaseId = selectedRelease?.id || "";

  const componentsKey = releases.data && (releaseId || isInitialized)
    ? `${releasesKey}:${selection.releaseChange}:${releaseId || "component-catalog"}`
    : "";
  const readComponents = useCallback(
    () => (releaseId ? fetchReleaseComponents(releaseId) : fetchComponentCatalog(productKey)),
    [releaseId, productKey]
  );
  const snapshot = useExplorerRead(componentsKey, readComponents, "No se pudieron cargar los componentes.");
  const components = snapshot.data || [];
  const selectedComponent = components.find((row) => row.component_id === selection.componentId) || components[0];
  const componentId = selectedComponent?.component_id || "";

  const historyKey = componentId ? `${componentsKey}:${selection.componentChange}:${componentId}` : "";
  const readHistory = useCallback(() => fetchComponentHistory(componentId, 30), [componentId]);
  const history = useExplorerRead(historyKey, readHistory, "No se pudo cargar el historial del componente.");
  const historyRows = history.data || [];

  const refreshInProgress = catalog.loading || releases.loading || snapshot.loading || history.loading;
  const snapshotLoading = catalog.loading || releases.loading || snapshot.loading;

  function chooseProduct(productKey) {
    setSelection((current) => ({
      ...current,
      productKey,
      version: "",
      env: "",
      componentId: "",
      productChange: current.productChange + 1,
    }));
  }

  function chooseRelease(choice) {
    setSelection((current) => ({
      ...current,
      ...choice,
      releaseChange: current.releaseChange + 1,
    }));
  }

  function chooseComponent(nextId) {
    if (nextId === componentId) return;
    setSelection((current) => ({
      ...current,
      componentId: nextId,
      componentChange: current.componentChange + 1,
    }));
  }

  return (
    <div className="space-y-6">
      <section aria-labelledby="versioning-filters" className={SECTION_CLASS}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="versioning-filters" className="text-base font-semibold text-[#2F1A55]">Seleccionar release</h2>
          <button
            type="button"
            onClick={() => setRefreshCount((count) => count + 1)}
            disabled={refreshInProgress}
            className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs font-semibold text-[#5E30A5] hover:bg-[#FAF8FF] disabled:opacity-60"
          >
            <RefreshCw size={14} className={refreshInProgress ? "animate-spin" : ""} aria-hidden="true" />
            {refreshInProgress ? "Cargando…" : "Actualizar"}
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <label className="space-y-1 text-xs font-semibold text-slate-600">
            <span>Producto</span>
            <select value={productKey} onChange={(event) => chooseProduct(event.target.value)} disabled={!products.length} className={FILTER_CLASS}>
              {!products.length ? <option value="">{catalog.loading ? "Cargando productos…" : "Sin productos"}</option> : null}
              {products.map((product) => (
                <option key={product.id} value={product.product_key}>{product.name || product.product_key}</option>
              ))}
            </select>
          </label>
          <label className="space-y-1 text-xs font-semibold text-slate-600">
            <span>Versión</span>
            <select
              value={selectedGroup?.versionLabel || ""}
              onChange={(event) => chooseRelease({ version: event.target.value, env: "" })}
              disabled={!releaseGroups.length}
              className={FILTER_CLASS}
            >
              {!releaseGroups.length ? <option value="">{releases.loading ? "Cargando versiones…" : "Sin releases"}</option> : null}
              {releaseGroups.map((group) => (
                <option key={group.versionLabel} value={group.versionLabel}>{group.versionLabel}</option>
              ))}
            </select>
          </label>
          <label className="space-y-1 text-xs font-semibold text-slate-600">
            <span>Entorno del snapshot</span>
            <select
              value={selectedEnv}
              onChange={(event) => chooseRelease({ version: selectedGroup.versionLabel, env: event.target.value })}
              disabled={!selectedGroup?.envs.length}
              className={FILTER_CLASS}
            >
              {!selectedGroup?.envs.length ? <option value="">Sin entorno</option> : null}
              {selectedGroup?.envs.map((env) => (
                <option key={env} value={env}>{ENV_LABEL[env] || env}</option>
              ))}
            </select>
          </label>
        </div>

        {catalog.error || releases.error ? <ReadNotice error={catalog.error || releases.error} /> : null}
        {selectedProduct && !isInitialized && !releaseGroups.length && !releases.loading && !releases.error ? (
          <ReadNotice>Esta app aún no está inicializada en versionado. Ejecuta bootstrap por producto para habilitar releases.</ReadNotice>
        ) : null}
      </section>

      <section aria-labelledby="release-snapshot" className={SECTION_CLASS}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="release-snapshot" className="flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
            <Layers3 size={15} aria-hidden="true" />
            Snapshot de componentes
          </h2>
          {selectedRelease ? (
            <span className="rounded-full bg-[#F2ECFF] px-3 py-1 text-xs font-semibold text-[#5E30A5]">
              {selectedGroup.versionLabel} · {ENV_LABEL[selectedEnv] || selectedEnv}
            </span>
          ) : null}
        </div>
        {selectedRelease ? (
          <dl className="grid gap-3 rounded-xl bg-[#FAF8FF] p-3 text-xs sm:grid-cols-[minmax(0,2fr)_1fr_1fr]">
            <div>
              <dt className="font-semibold text-slate-600">Commit de origen</dt>
              <dd className="mt-1 break-all font-mono text-slate-700">{selectedRelease.source_commit_sha || "—"}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-600">Estado</dt>
              <dd className="mt-1 text-slate-700">{selectedRelease.status || "—"}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-600">Fecha de creación</dt>
              <dd className="mt-1 text-slate-700">{formatDate(selectedRelease.created_at)}</dd>
            </div>
          </dl>
        ) : null}

        {snapshotLoading ? (
          <ReadNotice>Cargando componentes…</ReadNotice>
        ) : snapshot.error ? (
          <ReadNotice error={snapshot.error} />
        ) : components.length ? (
          <>
            <p className="text-xs text-slate-500">
              {selectedRelease ? "Selecciona un componente para consultar sus revisiones." : "Últimas revisiones del catálogo mientras el producto no tenga releases."}
            </p>
            <Table
              columns={[
                { key: "component", label: "Componente" },
                { key: "type", label: "Tipo", align: "center" },
                { key: "state", label: "Estado", align: "center" },
                { key: "revision", label: "Revisión", align: "right" },
                { key: "bump", label: "Bump", align: "center" },
                { key: "commit", label: "Commit" },
              ]}
            >
              {components.map((row) => {
                const selected = componentId === row.component_id;
                return (
                  <tr
                    key={`${row.component_id}-${row.revision_id}`}
                    className={`cursor-pointer hover:bg-[#FAF8FF] ${selected ? "bg-[#F4EEFF]" : ""}`}
                    onClick={() => chooseComponent(row.component_id)}
                  >
                    <td className="px-4 py-3 text-xs">
                      <button type="button" aria-pressed={selected} className="rounded text-left font-semibold text-[#5E30A5] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2">
                        {row.component_key}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center text-xs text-slate-600">{row.component_type}</td>
                    <td className="px-4 py-3 text-center">{stateBadge(resolveComponentState(row))}</td>
                    <td className="px-4 py-3 text-right text-xs font-semibold text-[#2F1A55]">
                      r{row.revision_no}
                    </td>
                    <td className="px-4 py-3 text-center text-xs text-slate-600">{row.bump_level}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{row.source_commit_sha}</td>
                  </tr>
                );
              })}
            </Table>
          </>
        ) : (
          <ReadNotice>{selectedRelease ? "Esta release no tiene componentes registrados." : "No hay un snapshot de componentes para mostrar."}</ReadNotice>
        )}
      </section>

      <section aria-labelledby="component-revisions" className={SECTION_CLASS}>
        <h2 id="component-revisions" className="flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
          <History size={15} aria-hidden="true" />
          Historial de revisiones
        </h2>
        {selectedComponent ? (
          <div className="space-y-0.5 break-all text-xs text-slate-500">
            <p className="font-semibold text-slate-700">{selectedComponent.component_key}</p>
            <p className="font-mono">{componentId}</p>
          </div>
        ) : null}
        {history.loading || snapshotLoading ? (
          <ReadNotice>Cargando revisiones…</ReadNotice>
        ) : history.error ? (
          <ReadNotice error={history.error} />
        ) : historyRows.length ? (
          <Table
            columns={[
              { key: "revision", label: "Revisión", align: "right" },
              { key: "state", label: "Estado", align: "center" },
              { key: "bump", label: "Bump", align: "center" },
              { key: "branch", label: "Rama" },
              { key: "commit", label: "Commit" },
              { key: "date", label: "Fecha" },
            ]}
          >
            {historyRows.map((row) => (
              <tr key={row.id} className="hover:bg-[#FAF8FF]">
                <td className="px-4 py-3 text-right text-xs font-semibold text-[#2F1A55]">
                  r{row.revision_no}
                </td>
                <td className="px-4 py-3 text-center">{stateBadge(resolveComponentState(row))}</td>
                <td className="px-4 py-3 text-center text-xs text-slate-600">{row.bump_level}</td>
                <td className="px-4 py-3 text-xs text-slate-600">{row.source_branch}</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{row.source_commit_sha}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{formatDate(row.created_at)}</td>
              </tr>
            ))}
          </Table>
        ) : (
          <ReadNotice>{selectedComponent ? "No hay revisiones registradas para este componente." : "Selecciona un componente del snapshot para ver sus revisiones."}</ReadNotice>
        )}
      </section>
    </div>
  );
}
