import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchLatestReleases } from "../../versioning/services/versioningService";
import { DASHBOARD_PRODUCTS } from "../dashboardProducts";

function toReleaseMap(rows = []) {
  const map = new Map();
  for (const row of rows) {
    const productKey = String(row?.product_key || "").trim().toLowerCase();
    if (!productKey || map.has(productKey)) continue;
    map.set(productKey, row);
  }
  return map;
}

export function useDashboardProdVersions() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [rows, setRows] = useState([]);

  const reload = useCallback(async ({ silent = false } = {}) => {
    if (silent) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError("");

    try {
      const data = await fetchLatestReleases("prod");
      setRows(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.message || "No se pudieron cargar las versiones de produccion.");
    } finally {
      if (silent) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const releaseByProduct = useMemo(() => toReleaseMap(rows), [rows]);

  const products = useMemo(
    () =>
      DASHBOARD_PRODUCTS.map((product) => ({
        ...product,
        release: releaseByProduct.get(product.key) || null,
      })),
    [releaseByProduct],
  );

  return {
    loading,
    refreshing,
    error,
    products,
    reload,
  };
}

