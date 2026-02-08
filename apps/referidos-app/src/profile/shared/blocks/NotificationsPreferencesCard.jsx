import React from "react";
import { Bell, X } from "lucide-react";

const Toggle = ({ active, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`w-12 h-7 rounded-full border transition flex items-center ${
      active
        ? "bg-[#5E30A5] border-[#5E30A5] justify-end"
        : "bg-slate-200 border-slate-300 justify-start"
    }`}
  >
    <span className="h-5 w-5 rounded-full bg-white shadow-sm mx-1" />
  </button>
);

export const DEFAULT_NOTIFICATION_PREFS = {
  promos: true,
  novedades: true,
  seguridad: true,
};

export const NOTIFICATION_CHANNELS = [
  { key: "promos", label: "Notificaciones de Promos" },
  { key: "novedades", label: "Novedades" },
  { key: "seguridad", label: "Seguridad" },
];

export default function NotificationsPreferencesCard({
  permission = "default",
  statusLabel,
  channels = NOTIFICATION_CHANNELS,
  prefs = DEFAULT_NOTIFICATION_PREFS,
  showChannels = true,
  showWarning = false,
  onToggle,
  onDismissWarning,
}) {
  const label =
    statusLabel ||
    (permission === "granted"
      ? "Permitidas"
      : permission === "denied"
        ? "Bloqueadas"
        : "No configuradas");

  return (
    <div className="space-y-4">
      <div className="flex items-stretch justify-between overflow-hidden rounded-2xl border border-[#E9E2F7] bg-white">
        <span className="px-4 py-3 text-xs font-semibold text-[#2F1A55]">
          Estado de notificaciones
        </span>
        <span
          className={`flex items-center px-4 py-3 text-[11px] font-semibold ${
            permission === "granted"
              ? "bg-emerald-50 text-emerald-600"
              : permission === "denied"
                ? "bg-amber-100 text-amber-700"
                : "bg-slate-100 text-slate-500"
          }`}
        >
          {label}
        </span>
      </div>

      {showChannels ? (
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 space-y-3">
          {channels.map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#2F1A55]">
                <Bell size={14} className="text-[#5E30A5]" />
                {item.label}
              </span>
              <Toggle
                active={Boolean(prefs[item.key])}
                onChange={() => onToggle?.(item.key)}
              />
            </div>
          ))}
        </div>
      ) : showWarning ? (
        <div className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] p-4 text-xs text-slate-500 flex items-center gap-3">
          <Bell size={16} className="text-[#5E30A5]" />
          <span className="flex-1">
            Es necesario activar notificaciones en las configuraciones del dispositivo para recibirlas.
          </span>
          <button
            type="button"
            onClick={onDismissWarning}
            className="text-slate-400 hover:text-slate-500"
            aria-label="Cerrar aviso"
          >
            <X size={14} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
