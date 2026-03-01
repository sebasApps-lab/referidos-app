import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  CalendarClock,
  LayoutGrid,
  List,
  ShieldCheck,
} from "lucide-react";
import { useAppStore } from "../../store/appStore";

const NAV_GROUPS = [
  {
    title: "Paneles",
    items: [
      { label: "Inicio", to: "/soporte/inicio", Icon: LayoutGrid },
      { label: "Inbox", to: "/soporte/inbox", Icon: List },
      { label: "Jornadas", to: "/soporte/jornadas", Icon: CalendarClock },
      { label: "Issues", to: "/soporte/issues", Icon: Activity },
      {
        label: "Catalogo errores",
        to: "/soporte/catalogo-errores",
        Icon: AlertTriangle,
      },
    ],
  },
];

function badgeTone(status) {
  if (status === "actual") return "bg-emerald-100 text-emerald-700";
  if (status === "futura") return "bg-[#F0EBFF] text-[#5E30A5]";
  return "bg-slate-100 text-slate-600";
}

export default function SupportSidebar({
  open,
  onClose,
  collapsed = false,
  onToggleCollapsed,
}) {
  const location = useLocation();
  const logout = useAppStore((s) => s.logout);

  const isActive = (path) => {
    if (path === "/soporte/inbox" && location.pathname.startsWith("/soporte/ticket/")) {
      return true;
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen transform flex-col overflow-visible border-r border-[#E9E2F7] bg-white pb-6 pt-6 shadow-lg transition-[transform,width,padding] duration-300 lg:translate-x-0 ${
          collapsed ? "w-20 px-2" : "w-60 px-4"
        } ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <div
            className={
              collapsed
                ? "flex items-center justify-center"
                : "flex items-center justify-between gap-2"
            }
          >
            <div
              className={`flex min-w-0 items-center ${
                collapsed ? "justify-center" : "gap-2"
              }`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F2ECFF] text-[#5E30A5]">
                <ShieldCheck size={18} />
              </div>
              {!collapsed ? (
                <div className="truncate text-lg font-extrabold text-[#5E30A5]">
                  Referidos
                </div>
              ) : null}
            </div>
            {!collapsed ? (
              <span className="rounded-full bg-[#F0EBFF] px-2 py-1 text-[11px] font-semibold text-[#5E30A5]">
                Soporte
              </span>
            ) : null}
          </div>

          <div className={`mt-6 ${collapsed ? "space-y-4" : "space-y-6"}`}>
            {NAV_GROUPS.map((group) => (
              <div key={group.title} className="space-y-2">
                {!collapsed ? (
                  <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    {group.title}
                  </div>
                ) : (
                  <div className="space-y-1 px-1">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-[#E9E2F7] to-transparent" />
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-[#E9E2F7] to-transparent" />
                  </div>
                )}
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const active = isActive(item.to);
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        aria-label={item.label}
                        title={item.label}
                        className={`flex items-center rounded-xl px-3 py-2 text-sm font-semibold transition ${
                          collapsed ? "justify-center" : "gap-3"
                        } ${
                          active
                            ? "bg-[#F0EBFF] text-[#5E30A5]"
                            : "text-slate-600 hover:bg-[#F7F4FF]"
                        }`}
                      >
                        <item.Icon size={18} />
                        {!collapsed ? <span>{item.label}</span> : null}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => logout?.()}
            className={`mt-auto flex items-center rounded-2xl border border-[#EFE9FA] bg-[#FAF8FF] text-sm font-semibold text-slate-600 transition hover:bg-[#F7F4FF] ${
              collapsed ? "justify-center px-2 py-2" : "gap-3 px-3 py-2"
            }`}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#5E30A5] shadow-sm">
              <ShieldCheck size={18} />
            </div>
            {!collapsed ? (
              <div className="flex flex-col items-start leading-tight">
                <span>Cerrar sesion</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${badgeTone("actual")}`}>
                  Seguro
                </span>
              </div>
            ) : null}
          </button>
        </div>

        <button
          type="button"
          onClick={() => onToggleCollapsed?.()}
          className="absolute right-0 top-1/2 z-[70] hidden h-[50px] w-[36px] -translate-y-1/2 translate-x-[45%] items-center justify-center rounded-2xl border border-[#DCCEF6] bg-white text-xs font-medium leading-none text-[#5E30A5] shadow-md transition hover:bg-[#F7F4FF] lg:inline-flex"
          aria-label={collapsed ? "Extender sidebar" : "Contraer sidebar"}
          title={collapsed ? "Extender sidebar" : "Contraer sidebar"}
        >
          <span
            className="inline-block origin-center"
            style={{ transform: "translateY(-2px) scale(0.82, 2.35)" }}
          >
            {collapsed ? ">>" : "<<"}
          </span>
        </button>
      </aside>
    </>
  );
}
