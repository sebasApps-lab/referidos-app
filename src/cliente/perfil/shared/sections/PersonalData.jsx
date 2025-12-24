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
    <section className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-[#1D1B1A]">Datos personales</h3>
        <p className="text-xs text-black/50">
          Manten tu informacion actualizada.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-black/70">
            Nombres
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-2xl border border-black/10 bg-white/80 px-3 py-2">
            <User size={16} className="text-black/40" />
            <input
              value={form.nombres}
              onChange={handleChange("nombres")}
              className="w-full bg-transparent text-sm text-black/70 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-black/70">
            Apellidos
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-2xl border border-black/10 bg-white/80 px-3 py-2">
            <User size={16} className="text-black/40" />
            <input
              value={form.apellidos}
              onChange={handleChange("apellidos")}
              className="w-full bg-transparent text-sm text-black/70 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-black/70">
            Direccion
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-2xl border border-black/10 bg-white/80 px-3 py-2">
            <MapPin size={16} className="text-black/40" />
            <input
              value={form.direccion}
              onChange={handleChange("direccion")}
              className="w-full bg-transparent text-sm text-black/70 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-black/70">
            Email {verification.emailVerified ? "(verificado)" : "(sin verificar)"}
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-2xl border border-black/10 bg-white/80 px-3 py-2">
            <Mail size={16} className="text-black/40" />
            <input
              value={form.email}
              onChange={handleChange("email")}
              className="w-full bg-transparent text-sm text-black/70 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-black/70">
            Telefono {verification.phoneVerified ? "(verificado)" : "(sin verificar)"}
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-2xl border border-black/10 bg-white/80 px-3 py-2">
            <Phone size={16} className="text-black/40" />
            <input
              value={form.telefono}
              onChange={handleChange("telefono")}
              className="w-full bg-transparent text-sm text-black/70 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {needsSensitiveVerification && (
        <div className="rounded-2xl border border-[#F59E0B33] bg-[#F59E0B0F] p-4 text-xs text-black/60 space-y-2">
          <p className="font-semibold text-[#F59E0B]">
            Confirmacion requerida para cambios sensibles.
          </p>
          <input
            type="password"
            placeholder="Contrasena actual"
            className="w-full rounded-2xl border border-black/10 bg-white/80 px-3 py-2 text-sm text-black/70 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setConfirmedSensitive(true)}
            className="rounded-2xl bg-[#1D1B1A] px-3 py-2 text-xs font-semibold text-white"
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
          className={`rounded-2xl px-4 py-2 text-xs font-semibold shadow ${
            verifiedForSensitive
              ? "bg-[#1D1B1A] text-white"
              : "bg-black/10 text-black/40 cursor-not-allowed"
          }`}
        >
          Guardar cambios
        </button>
        <span className="text-xs text-black/50">
          {status ||
            (verifiedForSensitive
              ? "Actualiza tu informacion cuando lo necesites."
              : "Verifica para guardar email o telefono.")}
        </span>
      </div>
    </section>
  );
}
