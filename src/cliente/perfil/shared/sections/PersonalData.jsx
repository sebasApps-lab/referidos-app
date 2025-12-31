import React, { useEffect, useMemo, useState } from "react";
import { Check, Mail, Pencil, Phone, User } from "lucide-react";

export default function PersonalData({ usuario, setUser, verification }) {
  const initial = useMemo(() => {
    const nombre = usuario?.nombre || "";
    const parts = nombre.split(" ").filter(Boolean);
    return {
      nombres: usuario?.nombres || parts.slice(0, 1).join(" ") || nombre,
      apellidos: usuario?.apellidos || parts.slice(1).join(" "),
      direccion: usuario?.direccion || usuario?.ubicacion || usuario?.ciudad || "",
      email: usuario?.email || "",
      telefono: usuario?.telefono || usuario?.phone || "",
    };
  }, [usuario]);

  const [form, setForm] = useState(initial);
  const [confirmedSensitive, setConfirmedSensitive] = useState(false);
  const [editing, setEditing] = useState({
    names: false,
    contact: false,
  });
  const [expandedEmail, setExpandedEmail] = useState(false);

  useEffect(() => {
    setForm(initial);
  }, [
    initial.nombres,
    initial.apellidos,
    initial.direccion,
    initial.email,
    initial.telefono,
  ]);

  useEffect(() => {
    if (editing.contact) {
      setExpandedEmail(false);
    }
  }, [editing.contact]);

  const emailChanged = form.email !== initial.email;
  const phoneChanged = form.telefono !== initial.telefono;

  const needsSensitiveVerification = emailChanged || phoneChanged;
  const verifiedForSensitive =
    (!emailChanged || verification.emailVerified) &&
    (!phoneChanged || verification.phoneVerified) &&
    (!needsSensitiveVerification || confirmedSensitive);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSaveNames = () => {
    if (!usuario) return;
    const nombreCompleto = [form.nombres, form.apellidos].filter(Boolean).join(" ");
    setUser({
      ...usuario,
      nombres: form.nombres,
      apellidos: form.apellidos,
      nombre: nombreCompleto || usuario?.nombre,
    });
    if (form.nombres?.trim() && form.apellidos?.trim()) {
      setEditing((prev) => ({ ...prev, names: false }));
    }
  };

  const handleSaveContact = () => {
    if (!usuario) return;
    if (!verifiedForSensitive) return;
    setUser({ ...usuario, email: form.email, telefono: form.telefono });
    if (form.email?.trim() && form.telefono?.trim()) {
      setEditing((prev) => ({ ...prev, contact: false }));
    }
  };

  const handleCancelNames = () => {
    setForm((prev) => ({
      ...prev,
      nombres: initial.nombres || "",
      apellidos: initial.apellidos || "",
    }));
    setEditing((prev) => ({
      ...prev,
      names: false,
    }));
    document.activeElement?.blur();
  };

  const handleCancelContact = () => {
    setForm((prev) => ({
      ...prev,
      email: initial.email || "",
      telefono: initial.telefono || "",
    }));
    setConfirmedSensitive(false);
    setEditing((prev) => ({
      ...prev,
      contact: false,
    }));
    document.activeElement?.blur();
  };

  const fullName = [form.nombres, form.apellidos].filter(Boolean).join(" ");
  const addressItems = [
    {
      label: "Casa",
      value: form.direccion || "Sin direccion",
    },
  ];

  return (
    <section className="relative rounded-[32px] border border-[#E9E2F7] px-6 pb-8 pt-4 space-y-7">
      <div className="absolute -top-2 left-4 right-4 flex items-center gap-3">
        <span className="bg-white px-2 text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
          Datos personales
        </span>
      </div>
      <div className="mt-1">
        <p className="text-xs text-slate-500 text-center">
          Manten tu informacion actualizada.
        </p>
      </div>

      <div className="space-y-11">
        <div>
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-semibold text-[#2F1A55]">
              Nombres y apellidos
            </span>
            {!editing.names ? (
              <button
                type="button"
                onClick={() => setEditing((prev) => ({ ...prev, names: true }))}
                className="text-[#5E30A5]"
                aria-label="Editar nombres"
              >
                <Pencil size={16} />
              </button>
            ) : null}
          </div>
          {editing.names ? (
            <div className="mt-6 space-y-7">
              <div className="relative rounded-2xl border border-[#E9E2F7] bg-white px-3 py-2">
                <span className="absolute -top-3 left-3 bg-white px-2 text-[13px] text-slate-500">
                  Nombres
                </span>
                <div className="flex items-center gap-2">
                  <User size={16} className="text-slate-400" />
                  <input
                    value={form.nombres}
                    onChange={handleChange("nombres")}
                    className="w-full bg-transparent text-sm text-slate-600 focus:outline-none"
                  />
                </div>
              </div>
              <div className="relative rounded-2xl border border-[#E9E2F7] bg-white px-3 py-2">
                <span className="absolute -top-3 left-3 bg-white px-2 text-[13px] text-slate-500">
                  Apellidos
                </span>
                <div className="flex items-center gap-2">
                  <User size={16} className="text-slate-400" />
                  <input
                    value={form.apellidos}
                    onChange={handleChange("apellidos")}
                    className="w-full bg-transparent text-sm text-slate-600 focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm font-semibold px-4">
                <button
                  type="button"
                  onClick={handleCancelNames}
                  className="text-[#2F1A55]"
                >
                  Cancelar
                </button>
                {form.nombres?.trim() || form.apellidos?.trim() ? (
                  <button
                    type="button"
                    onClick={handleSaveNames}
                    className="text-[#5E30A5]"
                  >
                    Guardar
                  </button>
                ) : null}
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-600 line-clamp-2">
              {fullName || "Sin nombre"}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#2F1A55]">
              Direccion
            </span>
            <button
              type="button"
              className="text-[#5E30A5]"
              aria-label="Editar direccion"
            >
              <Pencil size={16} />
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {form.direccion?.trim() ? (
              addressItems.map((item, index) => (
                <div
                  key={`${item.label}-${index}`}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs text-slate-600"
                >
                  <span className="font-semibold text-[#2F1A55]">
                    {item.label}
                  </span>
                  <span className="text-right">{item.value}</span>
                </div>
              ))
            ) : (
              <span className="text-sm text-slate-600">
                Sin dirección.
              </span>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#2F1A55]">
              Informacion de contacto
            </span>
            {!editing.contact ? (
              <button
                type="button"
                onClick={() => setEditing((prev) => ({ ...prev, contact: true }))}
                className="text-[#5E30A5]"
                aria-label="Editar contacto"
              >
                <Pencil size={16} />
              </button>
            ) : null}
          </div>
          {editing.contact ? (
            <div className="mt-7 space-y-7">
              <div className="relative rounded-2xl border border-[#E9E2F7] bg-white px-3 py-2">
                <span className="absolute -top-3 left-3 bg-white px-2 text-[13px] text-slate-500">
                  Correo
                </span>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-slate-400" />
                  <input
                    value={form.email}
                    onChange={handleChange("email")}
                    className="w-full bg-transparent text-sm text-slate-600 focus:outline-none"
                  />
                </div>
              </div>
              <div className="relative rounded-2xl border border-[#E9E2F7] bg-white px-3 py-2">
                <span className="absolute -top-3 left-3 bg-white px-2 text-[13px] text-slate-500">
                  Telefono
                </span>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-slate-400" />
                  <input
                    value={form.telefono}
                    onChange={handleChange("telefono")}
                    className="w-full bg-transparent text-sm text-slate-600 focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm font-semibold px-3">
                <button
                  type="button"
                  onClick={handleCancelContact}
                  className="text-[#2F1A55]"
                >
                  Cancelar
                </button>
                {form.email?.trim() || form.telefono?.trim() ? (
                  <button
                    type="button"
                    onClick={handleSaveContact}
                    disabled={!verifiedForSensitive}
                    className={verifiedForSensitive ? "text-[#5E30A5]" : "text-slate-400"}
                  >
                    Guardar
                  </button>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-5 text-sm text-slate-600">
              <button
                type="button"
                onClick={() => setExpandedEmail((prev) => !prev)}
                className="flex w-full items-center gap-2 flex-nowrap min-w-0 overflow-hidden text-left"
              >
                <Mail size={16} className="text-slate-400 shrink-0" />
                <span className="truncate whitespace-nowrap flex-1 min-w-0">
                  {form.email || "Sin correo"}
                </span>
                {!verification.emailVerified ? (
                  <span
                    className={`ml-auto inline-flex items-center rounded-full bg-amber-50 text-[11px] font-semibold text-amber-600 shrink-0 transition-all duration-200 ease-out ${
                      expandedEmail ? "px-1.5 py-0.5 h-5" : "gap-1 px-2 py-0.5 h-5"
                    }`}
                  >
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F4B740] text-[12px] font-black text-white leading-none">
                      —
                    </span>
                    <span
                      className={`overflow-hidden transition-all duration-200 ease-out ${
                        expandedEmail ? "max-w-0 opacity-0" : "max-w-[120px] opacity-100"
                      }`}
                    >
                      Sin verificar
                    </span>
                  </span>
                ) : (
                  <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 p-1 text-emerald-600 shrink-0">
                    <Check size={12} />
                  </span>
                )}
              </button>
              {form.telefono?.trim() ? (
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-slate-400" />
                  <span>{form.telefono}</span>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Phone size={16} className="text-slate-400" />
                  <span>Aun no has anadido un telefono.</span>
                </div>
              )}
            </div>
          )}
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
    </section>
  );
}
