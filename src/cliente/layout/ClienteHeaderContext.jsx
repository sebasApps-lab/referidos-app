import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const ClienteHeaderContext = createContext({
  mode: "default",
  onSearchBack: null,
  setHeaderOptions: () => {},
});

export function ClienteHeaderProvider({ children }) {
  const [mode, setMode] = useState("default");
  const [onSearchBack, setOnSearchBack] = useState(null);

  const setHeaderOptions = useCallback((options = {}) => {
    const nextMode = options.mode || "default";
    setMode(nextMode);
    setOnSearchBack(() => options.onSearchBack || null);
  }, []);

  const value = useMemo(
    () => ({ mode, onSearchBack, setHeaderOptions }),
    [mode, onSearchBack, setHeaderOptions]
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
