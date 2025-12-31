import React, { useMemo, useState } from "react";
import { Mail, Phone, User, MapPin } from "lucide-react";
import {
  getDisplayEmail,
  getDisplayPhone,
  getDisplayLocation,
} from "../../../services/clienteUI";

export default function PersonalData({ usuario, setUser, verification }) {
  const initial = useMemo(() => {
    const nombre = usuario?.nombre || "";
    const parts = nombre.split(" ").filter(Boolean);
    return {
      nombres: usuario?.nombres || parts.slice(0, 1).join(" ") || nombre,
      apellidos: usuario?.apellidos || parts.slice(1).join(" "),
      direccion: usuario?.direccion || getDisplayLocation(usuario),
      email: getDisplayEmail(usuario),
      telefono: getDisplayPhone(usuario),
    };
  }, [usuario]);

  const [form, setForm] = useState(initial);
  const [confirmedSensitive, setConfirmedSensitive] = useState(false);
  const [status, setStatus] = useState("");

  const emailChanged = form.email !== initial.email;
  const phoneChanged = form.telefono !== initial.telefono;

  const needsSensitiveVerification = emailChanged || phoneChanged;
  const verifiedForSensitive =
    (!emailChanged || verification.emailVerified) &&
    (!phoneChanged || verification.phoneVerified) &&
    (!needsSensitiveVerification || confirmedSensitive);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setStatus("");
  };

  const handleSave = () => {
    if (!usuario) return;
    if (!verifiedForSensitive) return;
    const nombreCompleto = [form.nombres, form.apellidos].filter(Boolean).join(" ");
    setUser({ ...usuario, ...form, nombre: nombreCompleto || usuario?.nombre });
    setStatus("Cambios guardados");
    alert("Datos guardados");
  };

  return (
    <section className="relative rounded-[28px] border border-[#E9E2F7] px-4 pb-4 pt-5 space-y-5">
      <div className="absolute -top-3 left-4 right-4 flex items-center gap-3">
        <span className="bg-white px-2 text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
          Datos personales
        </span>
      </div>
      <div className="mt-2">
        <p className="text-xs text-slate-500">
          Manten tu informacion actualizada.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-[#2F1A55]">
            Nombres
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-[#E9E2F7] bg-white px-3 py-2">
            <User size={16} className="text-slate-400" />
            <input
              value={form.nombres}
              onChange={handleChange("nombres")}
              className="w-full bg-transparent text-sm text-slate-600 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-[#2F1A55]">
            Apellidos
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-[#E9E2F7] bg-white px-3 py-2">
            <User size={16} className="text-slate-400" />
            <input
              value={form.apellidos}
              onChange={handleChange("apellidos")}
              className="w-full bg-transparent text-sm text-slate-600 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-[#2F1A55]">
            Direccion
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-[#E9E2F7] bg-white px-3 py-2">
            <MapPin size={16} className="text-slate-400" />
            <input
              value={form.direccion}
              onChange={handleChange("direccion")}
              className="w-full bg-transparent text-sm text-slate-600 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-[#2F1A55]">
            Email {verification.emailVerified ? "(verificado)" : "(sin verificar)"}
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-[#E9E2F7] bg-white px-3 py-2">
            <Mail size={16} className="text-slate-400" />
            <input
              value={form.email}
              onChange={handleChange("email")}
              className="w-full bg-transparent text-sm text-slate-600 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-[#2F1A55]">
            Telefono {verification.phoneVerified ? "(verificado)" : "(sin verificar)"}
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-[#E9E2F7] bg-white px-3 py-2">
            <Phone size={16} className="text-slate-400" />
            <input
              value={form.telefono}
              onChange={handleChange("telefono")}
              className="w-full bg-transparent text-sm text-slate-600 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {needsSensitiveVerification && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-slate-600 space-y-2">
          <p className="font-semibold text-amber-600">
            Confirmacion requerida para cambios sensibles.
          </p>
          <input
            type="password"
            placeholder="Contrasena actual"
            className="w-full rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-sm text-slate-600 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setConfirmedSensitive(true)}
            className="rounded-xl bg-[#5E30A5] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#4B2488]"
          >
            Confirmar con contrasena
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={!verifiedForSensitive}
          className={`rounded-xl px-4 py-2 text-xs font-semibold shadow-sm ${
            verifiedForSensitive
              ? "bg-[#5E30A5] text-white hover:bg-[#4B2488]"
              : "bg-[#E9E2F7] text-slate-400 cursor-not-allowed"
          }`}
        >
          Guardar cambios
        </button>
        <span className="text-xs text-slate-500">
          {status ||
            (verifiedForSensitive
              ? "Actualiza tu informacion cuando lo necesites."
              : "Verifica para guardar email o telefono.")}
        </span>
      </div>
    </section>
  );
}
