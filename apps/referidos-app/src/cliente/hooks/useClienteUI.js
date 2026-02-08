import { useCallback, useState } from "react";

export function useClienteUI(options = {}) {
  const {
    defaultHistoryTab = "activos",
    defaultProfileTab = "overview",
    defaultFiltersOpen = false,
  } = options;

  const [historyTab, setHistoryTab] = useState(defaultHistoryTab);
  const [profileTab, setProfileTab] = useState(defaultProfileTab);
  const [filtersOpen, setFiltersOpen] = useState(defaultFiltersOpen);
  const [searchVisible, setSearchVisible] = useState(true);

  const toggleFilters = useCallback(() => {
    setFiltersOpen((prev) => !prev);
  }, []);

  const toggleSearch = useCallback(() => {
    setSearchVisible((prev) => !prev);
  }, []);

  return {
    historyTab,
    setHistoryTab,
    profileTab,
    setProfileTab,
    filtersOpen,
    setFiltersOpen,
    toggleFilters,
    searchVisible,
    toggleSearch,
  };
}
