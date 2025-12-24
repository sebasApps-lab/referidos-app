import React, { useState } from "react";
import { Bell, Mail } from "lucide-react";

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
  promos: { push: true, email: false },
  seguridad: { push: true, email: true },
  novedades: { push: false, email: false },
};

export default function Notifications() {
  const [prefs, setPrefs] = useState(DEFAULTS);
  const [status, setStatus] = useState("");

  const toggle = (section, channel) => {
    setPrefs((prev) => ({
      ...prev,
      [section]: { ...prev[section], [channel]: !prev[section][channel] },
    }));
  };

  const handleSave = () => {
    setStatus("Cambios guardados");
    alert("Datos guardados");
  };

  return (
    <section className="rounded-2xl border border-[#E9E2F7] bg-white p-6 shadow-sm space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-[#2F1A55]">
          Notificaciones
        </h3>
        <p className="text-xs text-slate-500">
          Elige como quieres recibir tus alertas.
        </p>
      </div>

      {[
        { key: "promos", label: "Promos" },
        { key: "seguridad", label: "Seguridad" },
        { key: "novedades", label: "Novedades" },
      ].map((item) => (
        <div
          key={item.key}
          className="rounded-2xl border border-[#E9E2F7] bg-white p-4 space-y-3"
        >
          <p className="text-xs font-semibold text-[#2F1A55]">{item.label}</p>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-xs text-slate-500">
              <Bell size={14} />
              Push
            </span>
            <Toggle
              active={prefs[item.key].push}
              onChange={() => toggle(item.key, "push")}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-xs text-slate-500">
              <Mail size={14} />
              Email
            </span>
            <Toggle
              active={prefs[item.key].email}
              onChange={() => toggle(item.key, "email")}
            />
          </div>
        </div>
      ))}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-xl bg-[#5E30A5] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#4B2488]"
        >
          Guardar cambios
        </button>
        <span className="text-xs text-slate-500">{status}</span>
      </div>
    </section>
  );
}
