import { useCallback, useState } from "react";

export function useNegocioUI(options = {}) {
  const {
    defaultProfileTab = "overview",
    defaultPromosTab = "activas",
    defaultFiltersOpen = false,
  } = options;

  const [profileTab, setProfileTab] = useState(defaultProfileTab);
  const [promosTab, setPromosTab] = useState(defaultPromosTab);
  const [filtersOpen, setFiltersOpen] = useState(defaultFiltersOpen);
  const [searchVisible, setSearchVisible] = useState(true);

  const toggleFilters = useCallback(() => {
    setFiltersOpen((prev) => !prev);
  }, []);

  const toggleSearch = useCallback(() => {
    setSearchVisible((prev) => !prev);
  }, []);

  return {
    profileTab,
    setProfileTab,
    promosTab,
    setPromosTab,
    filtersOpen,
    setFiltersOpen,
    toggleFilters,
    searchVisible,
    toggleSearch,
  };
}
