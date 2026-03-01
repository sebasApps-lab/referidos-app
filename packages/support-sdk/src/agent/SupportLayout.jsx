import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SupportSidebar from "./SupportSidebar";
import SupportTopbar from "./SupportTopbar";

const SUPPORT_SIDEBAR_COLLAPSED_KEY = "support.sidebar.collapsed";

function resolveRouteMeta(pathname) {
  if (pathname.startsWith("/soporte/inicio")) {
    return { title: "Inicio", subtitle: "Resumen operativo del asesor" };
  }
  if (pathname.startsWith("/soporte/inbox")) {
    return { title: "Inbox", subtitle: "Tickets disponibles, asignados y resueltos" };
  }
  if (pathname.startsWith("/soporte/ticket/")) {
    return { title: "Detalle de ticket", subtitle: "Seguimiento operativo del caso" };
  }
  if (pathname.startsWith("/soporte/jornadas")) {
    return { title: "Jornadas", subtitle: "Historial unificado de jornadas y sesiones" };
  }
  if (pathname.startsWith("/soporte/issues")) {
    return { title: "Issues", subtitle: "Listado de issues y eventos observability" };
  }
  if (pathname.startsWith("/soporte/catalogo-errores")) {
    return { title: "Catalogo errores", subtitle: "Referencia de codigos observability" };
  }
  return { title: "Soporte", subtitle: "Panel operativo de soporte" };
}

export default function SupportLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(SUPPORT_SIDEBAR_COLLAPSED_KEY) === "1";
  });
  const location = useLocation();
  const navigate = useNavigate();

  const routeMeta = useMemo(
    () => resolveRouteMeta(location.pathname || ""),
    [location.pathname],
  );

  const handleRefreshPanel = useCallback(() => {
    const params = new URLSearchParams(location.search || "");
    params.set("__pr", String(Date.now()));
    const nextSearch = params.toString();
    navigate(
      {
        pathname: location.pathname,
        search: nextSearch ? `?${nextSearch}` : "",
      },
      { replace: true },
    );
  }, [location.pathname, location.search, navigate]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      SUPPORT_SIDEBAR_COLLAPSED_KEY,
      sidebarCollapsed ? "1" : "0",
    );
  }, [sidebarCollapsed]);

  return (
    <div className="min-h-screen bg-[#F6F2FB] text-slate-700">
      <SupportSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapsed={() => setSidebarCollapsed((prev) => !prev)}
      />

      <div className={sidebarCollapsed ? "lg:pl-20" : "lg:pl-64"}>
        <SupportTopbar
          title={routeMeta.title}
          subtitle={routeMeta.subtitle}
          onOpenMenu={() => setSidebarOpen(true)}
          onRefreshPanel={handleRefreshPanel}
        />

        <main className="px-4 pb-16 pt-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
