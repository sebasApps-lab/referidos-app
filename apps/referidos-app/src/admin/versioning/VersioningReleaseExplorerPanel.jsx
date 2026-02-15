import React, { useEffect, useMemo, useState } from "react";
import { History, Layers3, RefreshCw } from "lucide-react";
import Table from "../../components/ui/Table";
import {
  fetchComponentHistory,
  fetchReleaseComponents,
  fetchReleasesByProductEnv,
  fetchVersioningCatalog,
  formatVersionLabel,
} from "./services/versioningService";

const ENV_OPTIONS = ["dev", "staging", "prod"];

export default function VersioningReleaseExplorerPanel() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedEnv, setSelectedEnv] = useState("prod");
  const [releases, setReleases] = useState([]);
  const [selectedReleaseId, setSelectedReleaseId] = useState("");
  const [components, setComponents] = useState([]);
  const [selectedComponentId, setSelectedComponentId] = useState("");
  const [historyRows, setHistoryRows] = useState([]);

  const selectedRelease = useMemo(
    () => releases.find((release) => release.id === selectedReleaseId) || null,
    [releases, selectedReleaseId]
  );

  const loadCatalog = async () => {
    const catalog = await fetchVersioningCatalog();
    setProducts(catalog.products || []);
    if (!selectedProduct && catalog.products?.[0]) {
      setSelectedProduct(catalog.products[0].product_key);
    }
  };

  const loadReleases = async (productKey, envKey) => {
    if (!productKey) {
      setReleases([]);
      setSelectedReleaseId("");
      return;
    }
    const rows = await fetchReleasesByProductEnv(productKey, envKey);
    setReleases(rows);
    if (!rows.find((release) => release.id === selectedReleaseId)) {
      setSelectedReleaseId(rows[0]?.id || "");
    }
  };

  const loadComponents = async (releaseId) => {
    if (!releaseId) {
      setComponents([]);
      setSelectedComponentId("");
      return;
    }
    const rows = await fetchReleaseComponents(releaseId);
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
        await loadReleases(selectedProduct, selectedEnv);
      } catch (err) {
        setError(err?.message || "No se pudieron cargar releases.");
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct, selectedEnv]);

  useEffect(() => {
    const run = async () => {
      try {
        await loadComponents(selectedReleaseId);
      } catch (err) {
        setError(err?.message || "No se pudieron cargar componentes.");
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedReleaseId]);

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
        <div className="grid gap-2 sm:grid-cols-3">
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
            value={selectedEnv}
            onChange={(event) => setSelectedEnv(event.target.value)}
            className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
          >
            {ENV_OPTIONS.map((env) => (
              <option key={env} value={env}>
                {env}
              </option>
            ))}
          </select>
          <select
            value={selectedReleaseId}
            onChange={(event) => setSelectedReleaseId(event.target.value)}
            className="rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs text-slate-700"
          >
            {releases.map((release) => (
              <option key={release.id} value={release.id}>
                {formatVersionLabel(release)} ({release.status})
              </option>
            ))}
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
                {selectedRelease ? `${formatVersionLabel(selectedRelease)} (${selectedRelease.status})` : "-"}
              </strong>
            </div>
            <Table
              className="mt-3"
              columns={[
                { key: "component", label: "Componente" },
                { key: "type", label: "Tipo", align: "center" },
                { key: "revision", label: "Revision", align: "right" },
                { key: "bump", label: "Bump", align: "center" },
                { key: "commit", label: "Commit" },
              ]}
            >
              {components.map((row) => (
                <tr
                  key={`${row.component_id}-${row.revision_id}`}
                  className={`hover:bg-[#FAF8FF] cursor-pointer ${
                    selectedComponentId === row.component_id ? "bg-[#F4EEFF]" : ""
                  }`}
                  onClick={() => setSelectedComponentId(row.component_id)}
                >
                  <td className="px-4 py-3 text-xs text-slate-700">{row.component_key}</td>
                  <td className="px-4 py-3 text-center text-xs text-slate-600">{row.component_type}</td>
                  <td className="px-4 py-3 text-right text-xs font-semibold text-[#2F1A55]">
                    r{row.revision_no}
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-slate-600">{row.bump_level}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{row.source_commit_sha}</td>
                </tr>
              ))}
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
                { key: "bump", label: "Bump", align: "center" },
                { key: "branch", label: "Branch" },
                { key: "commit", label: "Commit" },
                { key: "date", label: "Fecha" },
              ]}
            >
              {historyRows.map((row) => (
                <tr key={row.id} className="hover:bg-[#FAF8FF]">
                  <td className="px-4 py-3 text-right text-xs font-semibold text-[#2F1A55]">
                    r{row.revision_no}
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-slate-600">{row.bump_level}</td>
                  <td className="px-4 py-3 text-xs text-slate-600">{row.source_branch}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{row.source_commit_sha}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {new Date(row.created_at).toLocaleString("es-EC")}
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
