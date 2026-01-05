import React from "react";
import { Check, Mail, Pencil, Phone, User } from "lucide-react";

export default function PersonalDataBlock({
  editingNames,
  editingContact,
  fullName,
  nombres,
  apellidos,
  addressItems = [],
  addressEmptyText = "Sin direccion.",
  email,
  telefono,
  expandedEmail = false,
  emailVerified = false,
  onEditNames = () => {},
  onEditAddress = () => {},
  onEditContact = () => {},
  onChangeNombres = () => {},
  onChangeApellidos = () => {},
  onChangeEmail = () => {},
  onChangeTelefono = () => {},
  onCancelNames = () => {},
  onCancelContact = () => {},
  onSaveNames = () => {},
  onSaveContact = () => {},
  showSaveNames,
  showSaveContact,
  saveContactDisabled,
  onToggleExpandedEmail = () => {},
}) {
  return (
    <div className="space-y-11">
      <div>
        <div className="flex items-center justify-between pb-1">
          <span className="text-xs font-semibold text-[#2F1A55]">
            Nombres y apellidos
          </span>
          {!editingNames ? (
            <button
              type="button"
              onClick={onEditNames}
              className="text-[#5E30A5]"
              aria-label="Editar nombres"
            >
              <Pencil size={16} />
            </button>
          ) : null}
        </div>
        {editingNames ? (
          <div className="mt-6 space-y-7">
            <div className="relative rounded-2xl border border-[#E9E2F7] bg-white px-3 py-2">
              <span className="absolute -top-3 left-3 bg-white px-2 text-[13px] text-slate-500">
                Nombres
              </span>
              <div className="flex items-center gap-2">
                <User size={16} className="text-slate-400" />
                <input
                  value={nombres}
                  onChange={onChangeNombres}
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
                  value={apellidos}
                  onChange={onChangeApellidos}
                  className="w-full bg-transparent text-sm text-slate-600 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm font-semibold px-4">
              <button
                type="button"
                onClick={onCancelNames}
                className="text-[#2F1A55]"
              >
                Cancelar
              </button>
              {showSaveNames ? (
                <button
                  type="button"
                  onClick={onSaveNames}
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
          <span className="text-xs font-semibold text-[#2F1A55]">Direccion</span>
          <button
            type="button"
            onClick={onEditAddress}
            className="text-[#5E30A5]"
            aria-label="Editar direccion"
          >
            <Pencil size={16} />
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {addressItems.length ? (
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
            <span className="text-sm text-slate-600">{addressEmptyText}</span>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#2F1A55]">
            Informacion de contacto
          </span>
          {!editingContact ? (
            <button
              type="button"
              onClick={onEditContact}
              className="text-[#5E30A5]"
              aria-label="Editar contacto"
            >
              <Pencil size={16} />
            </button>
          ) : null}
        </div>
        {editingContact ? (
          <div className="mt-7 space-y-7">
            <div className="relative rounded-2xl border border-[#E9E2F7] bg-white px-3 py-2">
              <span className="absolute -top-3 left-3 bg-white px-2 text-[13px] text-slate-500">
                Correo
              </span>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-slate-400" />
                <input
                  value={email}
                  onChange={onChangeEmail}
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
                  value={telefono}
                  onChange={onChangeTelefono}
                  className="w-full bg-transparent text-sm text-slate-600 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm font-semibold px-3">
              <button
                type="button"
                onClick={onCancelContact}
                className="text-[#2F1A55]"
              >
                Cancelar
              </button>
              {showSaveContact ? (
                <button
                  type="button"
                  onClick={onSaveContact}
                  disabled={saveContactDisabled}
                  className={
                    saveContactDisabled ? "text-slate-400" : "text-[#5E30A5]"
                  }
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
              onClick={onToggleExpandedEmail}
              className="flex w-full items-center gap-2 flex-nowrap min-w-0 overflow-hidden text-left"
            >
              <Mail size={16} className="text-slate-400 shrink-0" />
              <span className="truncate whitespace-nowrap flex-1 min-w-0">
                {email || "Sin correo"}
              </span>
              {!emailVerified ? (
                <span
                  className={`ml-auto inline-flex items-center rounded-full bg-amber-50 text-[11px] font-semibold text-amber-600 shrink-0 transition-all duration-200 ease-out ${
                    expandedEmail ? "px-1.5 py-0.5 h-5" : "gap-1 px-2 py-0.5 h-5"
                  }`}
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F4B740] text-[12px] font-black text-white leading-none">
                    -
                  </span>
                  <span
                    className={`overflow-hidden transition-all duration-200 ease-out ${
                      expandedEmail
                        ? "max-w-0 opacity-0"
                        : "max-w-[120px] opacity-100"
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
            {telefono?.trim() ? (
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-slate-400" />
                <span>{telefono}</span>
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
  );
}
