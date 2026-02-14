import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchPrelaunchMetrics } from "../services/prelaunchMetrics";

const INITIAL_FILTERS = {
  days: 7,
  appChannel: "",
};

export function usePrelaunchMetrics(initialFilters = INITIAL_FILTERS) {
  const [filters, setFilters] = useState({
    days: Number(initialFilters.days) || INITIAL_FILTERS.days,
    appChannel: initialFilters.appChannel || INITIAL_FILTERS.appChannel,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [metrics, setMetrics] = useState(null);
  const [lastUpdatedAt, setLastUpdatedAt] = useState(null);

  const reload = useCallback(async ({ silent = false } = {}) => {
    if (silent) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError("");

    const result = await fetchPrelaunchMetrics(filters);
    if (!result.ok) {
      setError(result.error || "No se pudo cargar analytics");
      if (!silent) setLoading(false);
      setRefreshing(false);
      return;
    }

    setMetrics(result.data || null);
    setLastUpdatedAt(new Date().toISOString());
    if (!silent) setLoading(false);
    setRefreshing(false);
  }, [filters]);

  useEffect(() => {
    reload();
  }, [reload]);

  const summary = useMemo(() => {
    return metrics?.metrics || {
      unique_visitors: 0,
      new_visitors: 0,
      recurrent_visitors: 0,
      waitlist_submits: 0,
      waitlist_conversion: 0,
      support_tickets_created: 0,
    };
  }, [metrics]);

  return {
    filters,
    setFilters,
    loading,
    refreshing,
    error,
    metrics,
    summary,
    lastUpdatedAt,
    reload,
  };
}

