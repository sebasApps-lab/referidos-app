import React from "react";
import {
  formatReadableDate,
  getRoleLabel,
  getVerificationStatus,
} from "../../services/clienteUI";

export default function ProfilePanel({ activeTab, sections, usuario, setUser }) {
  const Section = sections[activeTab];
  const verification = getVerificationStatus(usuario);
  const showAccountStatus = activeTab === "manage";

  return (
    <div className="flex flex-col gap-6">
      {showAccountStatus ? (
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
                Estado de cuenta
              </p>
              <h2 className="text-base font-semibold text-[#2F1A55]">
                {verification.accountVerified ? "Cuenta verificada" : "Cuenta sin verificar"}
              </h2>
              <p className="text-xs text-slate-500">
                Rol: {getRoleLabel(usuario)} - Miembro desde{" "}
                {formatReadableDate(usuario?.created_at || usuario?.createdAt)}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                verification.accountVerified
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-amber-50 text-amber-600"
              }`}
            >
              {verification.accountVerified ? "Verificada" : "Sin verificar"}
            </span>
          </div>
        </div>
      ) : null}

      {Section ? (
        <Section usuario={usuario} setUser={setUser} verification={verification} />
      ) : (
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-6 text-sm text-slate-500">
          Selecciona una seccion para continuar.
        </div>
      )}
    </div>
  );
}
