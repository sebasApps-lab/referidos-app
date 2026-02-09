// src/App.jsx
import { Suspense, useEffect } from "react";
import { useAppStore } from "./store/appStore";
import { useLocation } from "react-router-dom";
import { pwaGuard } from "./router/guards/pwaGuard";
import AppRoutes from "./routes";
import ModalProvider from "./modals/ModalProvider";
import useBootstrapAuth from "./hooks/useBootstrapAuth";
import useAppLogger from "./hooks/useAppLogger";
import AppErrorBoundary from "./components/errors/AppErrorBoundary";
import ErrorRuntimeBridge from "./errors/ErrorRuntimeBridge";

function PwaGuardWrapper({ children }) {
  const usuario = useAppStore((s) => s.usuario);
  const bootstrap = useAppStore((s) => s.bootstrap);
  const location = useLocation();

  //No redirigir mientras bootstrap está activo
  useEffect(() => {
    if (bootstrap) return;
    try {
      const redir = pwaGuard({
        usuario,
        onboarding: useAppStore.getState().onboarding,
        bootstrap,
        pathname: location.pathname,
    });
      if (redir) window.location.replace(redir);
    } catch (error) {
      if (import.meta.env.DEV) console.error("pwaGuard error", error);
    }
  }, [bootstrap, usuario, location.pathname]);

  return children;
}

export default function App() {
  //Arranca bootstrap (session + onboarding) una sola vez
  useBootstrapAuth();
  useAppLogger();

  return (
    <AppErrorBoundary>
      <ErrorRuntimeBridge />
      <ModalProvider />
      <PwaGuardWrapper>
        <Suspense fallback={<div className="p-4">Cargando...</div>}>
          <AppRoutes />
        </Suspense>
      </PwaGuardWrapper>
    </AppErrorBoundary>
  );
}
