import { useCallback, useMemo, useState } from "react";

export function useSearchMode({ defaultQuery = "" } = {}) {
  const [query, setQueryState] = useState(defaultQuery);
  const [active, setActive] = useState(false);

  const setQuery = useCallback((next) => {
    const trimmed = next.trim();
    setQueryState(next);
    if (trimmed.length > 0) {
      setActive(true);
    }
  }, []);

  const onFocus = useCallback(() => {
    setActive(true);
  }, []);

  const onCancel = useCallback(() => {
    setQueryState("");
    setActive(false);
  }, []);

  const isSearching = useMemo(
    () => active || query.trim().length > 0,
    [active, query]
  );

  return { query, setQuery, isSearching, onFocus, onCancel };
}
