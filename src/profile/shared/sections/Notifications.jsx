import React, { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";
import { useModal } from "../../../modals/useModal";

const Toggle = ({ active, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`w-12 h-7 rounded-full border transition flex items-center ${
      active ? "bg-[#5E30A5] border-[#5E30A5] justify-end" : "bg-slate-200 border-slate-300 justify-start"
    }`}
  >
    <span className="h-5 w-5 rounded-full bg-white shadow-sm mx-1" />
  </button>
);

const DEFAULTS = {
  promos: true,
  novedades: true,
  seguridad: true,
};

const CHANNELS = [
  { key: "promos", label: "Notificaciones de Promos" },
  { key: "novedades", label: "Novedades" },
  { key: "seguridad", label: "Seguridad" },
];

export default function Notifications() {
  const [prefs, setPrefs] = useState(DEFAULTS);
  const { openModal } = useModal();
  const [permission, setPermission] = useState("default");
  const [pushEnabled, setPushEnabled] = useState(false);
  const [dismissedWarning, setDismissedWarning] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const nextPermission =
      typeof Notification !== "undefined" ? Notification.permission : "default";
    setPermission(nextPermission);

    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.ready
      .then((reg) => reg.pushManager?.getSubscription?.())
      .then((sub) => {
        setPushEnabled(Boolean(sub));
      })
      .catch(() => {
        setPushEnabled(false);
      });
  }, []);

  const toggle = (section) => {
    setPrefs((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
    openModal("Notifications");
  };

  const statusLabel =
    permission === "granted"
      ? "Permitidas"
      : permission === "denied"
        ? "Bloqueadas"
        : "No configuradas";

  const showChannels = permission === "granted";
  const showWarning = !showChannels && !dismissedWarning;

  return (
    <section className="relative rounded-[30px] border border-[#E9E2F7] bg-white px-6 pb-6 pt-6 space-y-6">
      <div className="absolute -top-3 left-4 right-4 flex items-center gap-3">
        <span className="bg-white px-2 text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
          Notificaciones
        </span>
      </div>
      <div className="mt-1">
        <p className="text-xs text-slate-500 text-center">
          Elige como quieres recibir tus alertas.
        </p>
      </div>

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
          {statusLabel}
        </span>
      </div>

      {showChannels ? (
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 space-y-3">
          {CHANNELS.map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#2F1A55]">
                <Bell size={14} className="text-[#5E30A5]" />
                {item.label}
              </span>
              <Toggle
                active={prefs[item.key]}
                onChange={() => toggle(item.key)}
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
            onClick={() => setDismissedWarning(true)}
            className="text-slate-400 hover:text-slate-500"
            aria-label="Cerrar aviso"
          >
            <X size={14} />
          </button>
        </div>
      ) : null}
    </section>
  );
}
