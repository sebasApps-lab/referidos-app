// src/App.jsx
import { Suspense, useEffect } from "react";
import { useAppStore } from "./store/appStore";
import { useLocation } from "react-router-dom";
import { pwaGuard } from "./router/guards/pwaGuard";
import AppRoutes from "./routes";
import ModalProvider from "./modals/ModalProvider";

function PwaGuardWrapper({ children }) {
  const usuario = useAppStore((s) => s.usuario);
  const location = useLocation();

  useEffect(() => {
    const redir = pwaGuard(usuario, location.pathname);
    if (redir) window.location.replace(redir);
  }, [usuario, location.pathname]);

  return children;
}

export default function App() {
  const restoreSession = useAppStore((s) => s.restoreSession);

  // 🔥 RESTAURAR SESIÓN AL CARGAR
  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  return (
    <>
      <ModalProvider />
      <PwaGuardWrapper>
        <Suspense fallback={<div className="p-4">Cargando...</div>}>
          <AppRoutes />
        </Suspense>
      </PwaGuardWrapper>
    </>
  );
}