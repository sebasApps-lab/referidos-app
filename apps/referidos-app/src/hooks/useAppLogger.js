import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAppStore } from "../store/appStore";
import {
  initLogger,
  logBreadcrumb,
  logError,
  setLoggerContext,
  setLoggerEnabled,
  setLoggerUser,
} from "../services/loggingClient";

const resolveFlow = (pathname = "") => {
  if (pathname.startsWith("/cliente")) return "cliente";
  if (pathname.startsWith("/negocio")) return "negocio";
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/soporte")) return "soporte";
  if (pathname.startsWith("/auth")) return "auth";
  return "app";
};

export default function useAppLogger() {
  const location = useLocation();
  const usuario = useAppStore((s) => s.usuario);
  const onboarding = useAppStore((s) => s.onboarding);
  const lastPath = useRef(null);

  useEffect(() => {
    initLogger();
  }, []);

  useEffect(() => {
    const hasSession = Boolean(usuario?.id_auth);
    setLoggerEnabled(hasSession);
    setLoggerUser({ role: usuario?.role });
  }, [usuario?.id_auth, usuario?.role]);

  useEffect(() => {
    const pathname = location.pathname;
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    const flow = resolveFlow(pathname);
    setLoggerContext({
      route: pathname,
      screen: pathname,
      flow,
      flow_step: onboarding?.current_step || null,
    });
    logBreadcrumb(`NAVIGATE ${pathname}`, { route: pathname });
  }, [location.pathname, onboarding?.current_step]);

  useEffect(() => {
    const handleError = (event) => {
      logError(event?.error || event?.message, {
        route: location.pathname,
        source: "window_error",
      });
    };
    const handleRejection = (event) => {
      logError(event?.reason || "unhandled_rejection", {
        route: location.pathname,
        source: "unhandled_rejection",
      });
    };
    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);
    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, [location.pathname]);
}
