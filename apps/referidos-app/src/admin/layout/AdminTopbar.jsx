// src/admin/layout/AdminTopbar.jsx
import React from "react";
import {
  Bell,
  LogOut,
  Menu,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";
import { useAppStore } from "../../store/appStore";

export default function AdminTopbar({ title, subtitle, onOpenMenu, onRefreshPanel }) {
  const usuario = useAppStore((s) => s.usuario);
  const logout = useAppStore((s) => s.logout);

  const environmentLabel =
    import.meta.env.MODE === "production" ? "Produccion" : "Staging";

  const initials = (usuario?.nombre || "Admin")
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="sticky top-0 z-40 border-b border-[#EEE7FA] bg-[#F6F2FB]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-xl border border-[#E9E2F7] bg-white p-2 text-[#5E30A5] shadow-sm lg:hidden"
            onClick={() => onOpenMenu?.()}
            aria-label="Abrir menu"
          >
            <Menu size={18} />
          </button>
          <div>
            <div className="text-lg font-semibold text-[#2F1A55]">
              {title}
            </div>
            {subtitle && (
              <div className="text-xs text-slate-500">{subtitle}</div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-[#E9E2F7] bg-white px-3 py-1 text-xs text-[#5E30A5] sm:flex">
            <ShieldCheck size={14} />
            {environmentLabel}
          </div>

          <button
            type="button"
            className="rounded-xl border border-[#E9E2F7] bg-white p-2 text-slate-500 shadow-sm transition hover:text-[#5E30A5]"
            title="Refrescar"
            onClick={() => onRefreshPanel?.()}
          >
            <RefreshCcw size={16} />
          </button>

          <button
            type="button"
            className="rounded-xl border border-[#E9E2F7] bg-white p-2 text-slate-500 shadow-sm transition hover:text-[#5E30A5]"
            title="Alertas"
          >
            <Bell size={16} />
          </button>

          <div className="hidden items-center gap-2 rounded-full border border-[#E9E2F7] bg-white px-2 py-1 sm:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5E30A5] text-xs font-bold text-white">
              {initials}
            </div>
            <div className="text-xs">
              <div className="font-semibold text-slate-600">
                {usuario?.nombre || "Admin"}
              </div>
              <div className="text-[10px] uppercase text-slate-400">admin</div>
            </div>
          </div>

          <button
            type="button"
            className="rounded-xl bg-[#5E30A5] p-2 text-white shadow-sm transition hover:bg-[#4B2488]"
            title="Cerrar sesion"
            onClick={() => logout?.()}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
