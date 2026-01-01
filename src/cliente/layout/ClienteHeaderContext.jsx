import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const ClienteHeaderContext = createContext({
  mode: "default",
  onSearchBack: null,
  headerVisible: true,
  setHeaderOptions: () => {},
});

export function ClienteHeaderProvider({ children }) {
  const [mode, setMode] = useState("default");
  const [onSearchBack, setOnSearchBack] = useState(null);
  const [headerVisible, setHeaderVisible] = useState(true);

  const setHeaderOptions = useCallback((options = {}) => {
    const nextMode = options.mode || "default";
    setMode(nextMode);
    setOnSearchBack(() => options.onSearchBack || null);
    const nextHeaderVisible =
      typeof options.headerVisible === "boolean" ? options.headerVisible : true;
    setHeaderVisible(nextHeaderVisible);
  }, []);

  const value = useMemo(
    () => ({ mode, onSearchBack, headerVisible, setHeaderOptions }),
    [mode, onSearchBack, headerVisible, setHeaderOptions]
  );

  return (
    <ClienteHeaderContext.Provider value={value}>
      {children}
    </ClienteHeaderContext.Provider>
  );
}

export function useClienteHeader() {
  return useContext(ClienteHeaderContext);
}
