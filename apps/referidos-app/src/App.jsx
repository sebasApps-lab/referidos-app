// src/App.jsx
import { Suspense } from "react";
import AppRoutes from "./routes";
import ModalProvider from "./modals/ModalProvider";
import useBootstrapAuth from "./hooks/useBootstrapAuth";
import useAppLogger from "./hooks/useAppLogger";
import AppErrorBoundary from "./components/errors/AppErrorBoundary";
import ErrorRuntimeBridge from "./errors/ErrorRuntimeBridge";
import MfaGateBoundary from "./router/guards/MfaGateBoundary";

export default function App() {
  //Arranca bootstrap (session + onboarding) una sola vez
  useBootstrapAuth();
  useAppLogger();

  return (
    <AppErrorBoundary>
      <ErrorRuntimeBridge />
      <ModalProvider />
      <MfaGateBoundary>
        <Suspense fallback={<div className="p-4">Cargando...</div>}>
          <AppRoutes />
        </Suspense>
      </MfaGateBoundary>
    </AppErrorBoundary>
  );
}
