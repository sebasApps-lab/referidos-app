// src/admin/layout/AdminLayout.jsx
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import AdminRuntimeErrorModalHost from "../observability/AdminRuntimeErrorModalHost";

const ADMIN_SIDEBAR_COLLAPSED_KEY = "admin.sidebar.collapsed";

export default function AdminLayout({ children, title, subtitle }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(ADMIN_SIDEBAR_COLLAPSED_KEY) === "1";
  });
  const location = useLocation();
  const navigate = useNavigate();

  const handleRefreshPanel = useCallback(() => {
    const params = new URLSearchParams(location.search || "");
    params.set("__pr", String(Date.now()));
    const nextSearch = params.toString();
    navigate(
      {
        pathname: location.pathname,
        search: nextSearch ? `?${nextSearch}` : "",
      },
      { replace: true }
    );
  }, [location.pathname, location.search, navigate]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      ADMIN_SIDEBAR_COLLAPSED_KEY,
      sidebarCollapsed ? "1" : "0"
    );
  }, [sidebarCollapsed]);

  return (
    <div className="min-h-screen bg-[#F6F2FB] text-slate-700">
      <AdminRuntimeErrorModalHost />
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapsed={() => setSidebarCollapsed((prev) => !prev)}
      />

      <div className={sidebarCollapsed ? "lg:pl-20" : "lg:pl-64"}>
        <AdminTopbar
          title={title}
          subtitle={subtitle}
          onOpenMenu={() => setSidebarOpen(true)}
          onRefreshPanel={handleRefreshPanel}
        />

        <main className="px-4 pb-16 pt-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
