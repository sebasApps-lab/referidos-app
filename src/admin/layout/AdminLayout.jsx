// src/admin/layout/AdminLayout.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminLayout({ children, title, subtitle }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-dvh bg-[#F6F2FB] text-slate-700">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64">
        <AdminTopbar
          title={title}
          subtitle={subtitle}
          onOpenMenu={() => setSidebarOpen(true)}
        />

        <main className="px-4 pb-16 pt-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
