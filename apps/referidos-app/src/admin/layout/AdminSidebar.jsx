// src/admin/layout/AdminSidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AlertTriangle,
  Activity,
  BarChart3,
  FileText,
  LayoutGrid,
  QrCode,
  Settings,
  ShieldCheck,
  Store,
  Tag,
  Users,
} from "lucide-react";
import Badge from "../../components/ui/Badge";

const NAV_GROUPS = [
  {
    title: "Dashboard",
    items: [{ label: "Inicio", to: "/admin/inicio", Icon: LayoutGrid }],
  },
  {
    title: "Gestion",
    items: [
      { label: "Usuarios", to: "/admin/usuarios", Icon: Users },
      { label: "Negocios", to: "/admin/negocios", Icon: Store },
      { label: "Promos", to: "/admin/promos", Icon: Tag },
    ],
  },
  {
    title: "Operacion",
    items: [
      { label: "QRs", to: "/admin/qrs", Icon: QrCode },
      { label: "Reportes", to: "/admin/reportes", Icon: AlertTriangle },
      { label: "Soporte", to: "/admin/soporte", Icon: ShieldCheck },
    ],
  },
  {
    title: "Sistema",
    items: [
      { label: "Logs", to: "/admin/logs", Icon: FileText },
      { label: "Observability", to: "/admin/observability", Icon: Activity },
      { label: "Dev Errores", to: "/admin/dev/errors", Icon: AlertTriangle },
      { label: "Datos", to: "/admin/datos", Icon: BarChart3 },
      { label: "Prelaunch Analytics", to: "/admin/prelaunch-analytics", Icon: BarChart3 },
      { label: "Sistema", to: "/admin/sistema", Icon: Settings },
      { label: "Asesores", to: "/admin/asesores", Icon: Users },
    ],
  },
];

export default function AdminSidebar({ open, onClose }) {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 transform flex-col overflow-y-auto border-r border-[#E9E2F7] bg-white px-4 pb-6 pt-6 shadow-lg transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="text-lg font-extrabold text-[#5E30A5]">
            Referidos Admin
          </div>
          <Badge variant="purple" size="sm">
            Admin
          </Badge>
        </div>

        <div className="mt-6 space-y-6">
          {NAV_GROUPS.map((group) => (
            <div key={group.title} className="space-y-2">
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                {group.title}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = isActive(item.to);
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                        active
                          ? "bg-[#F0EBFF] text-[#5E30A5]"
                          : "text-slate-600 hover:bg-[#F7F4FF]"
                      }`}
                    >
                      <item.Icon size={18} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-3 rounded-2xl border border-[#EFE9FA] bg-[#FAF8FF] px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#5E30A5] shadow-sm">
            <ShieldCheck size={18} />
          </div>
          <div>
            <div className="text-sm font-semibold text-[#2F1A55]">
              Panel seguro
            </div>
            <div className="text-[11px] text-slate-400">
              Acceso restringido
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
