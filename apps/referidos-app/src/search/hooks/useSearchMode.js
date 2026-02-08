import { useCallback, useMemo, useState } from "react";

export function useSearchMode({ defaultQuery = "" } = {}) {
  const [query, setQueryState] = useState(defaultQuery);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);

  const setQuery = useCallback((next) => {
    const value = String(next ?? "");
    const trimmed = value.trim();
    setQueryState(value);
    if (trimmed.length > 0) {
      setOpen(true);
    }
  }, []);

  const onFocus = useCallback(() => {
    setFocused(true);
    setOpen(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocused(false);
  }, []);

  const onBack = useCallback(() => {
    setQueryState("");
    setOpen(false);
    setFocused(false);
  }, []);

  const isSearching = useMemo(
    () => open || query.trim().length > 0 || focused,
    [focused, open, query]
  );

  return {
    query,
    setQuery,
    open,
    setOpen,
    focused,
    isSearching,
    onFocus,
    onBlur,
    onBack,
  };
}
