import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAppStore } from "../store/appStore";
import {
  initLogger,
  logBreadcrumb,
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
    logBreadcrumb({
      code: "app.route.change",
      type: "ui",
      channel: "manual",
      message: `Route changed: ${pathname}`,
      data: { route: pathname, flow },
    });
    logBreadcrumb({
      code: "app.screen.enter",
      type: "ui",
      channel: "manual",
      message: `Screen entered: ${pathname}`,
      data: {
        route: pathname,
        flow,
        flow_step: onboarding?.current_step || null,
      },
    });
  }, [location.pathname, onboarding?.current_step]);

}
