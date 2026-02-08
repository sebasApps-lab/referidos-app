import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const ClienteHeaderContext = createContext({
  mode: "default",
  onSearchBack: null,
  headerVisible: true,
  headerEntering: false,
  profileDockOpen: true,
  profileTitle: "Configuracion",
  setHeaderOptions: () => {},
});

export function ClienteHeaderProvider({ children }) {
  const [mode, setMode] = useState("default");
  const [onSearchBack, setOnSearchBack] = useState(null);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [headerEntering, setHeaderEntering] = useState(false);
  const [profileDockOpen, setProfileDockOpen] = useState(true);
  const [profileTitle, setProfileTitle] = useState("Configuracion");
  const prevHeaderVisible = useRef(headerVisible);

  const setHeaderOptions = useCallback((options = {}) => {
    const nextMode = options.mode || "default";
    setMode(nextMode);
    setOnSearchBack(() => options.onSearchBack || null);
    const nextHeaderVisible =
      typeof options.headerVisible === "boolean" ? options.headerVisible : true;
    setHeaderVisible(nextHeaderVisible);
    if (typeof options.profileDockOpen === "boolean") {
      setProfileDockOpen(options.profileDockOpen);
    }
    if (typeof options.profileTitle === "string") {
      setProfileTitle(options.profileTitle);
    }
  }, []);

  useEffect(() => {
    const wasVisible = prevHeaderVisible.current;
    if (!wasVisible && headerVisible) {
      setHeaderEntering(true);
      const timer = setTimeout(() => {
        setHeaderEntering(false);
      }, 360);
      prevHeaderVisible.current = headerVisible;
      return () => clearTimeout(timer);
    }
    if (!headerVisible) {
      setHeaderEntering(false);
    }
    prevHeaderVisible.current = headerVisible;
    return undefined;
  }, [headerVisible]);

  const value = useMemo(
    () => ({
      mode,
      onSearchBack,
      headerVisible,
      headerEntering,
      profileDockOpen,
      profileTitle,
      setHeaderOptions,
    }),
    [
      mode,
      onSearchBack,
      headerVisible,
      headerEntering,
      profileDockOpen,
      profileTitle,
      setHeaderOptions,
    ]
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
