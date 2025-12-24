import React from "react";
import {
  formatReadableDate,
  getRoleLabel,
  getVerificationStatus,
} from "../../services/clienteUI";

export default function ProfilePanel({ activeTab, sections, usuario, setUser }) {
  const Section = sections[activeTab];
  const verification = getVerificationStatus(usuario);

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-3xl border border-white/70 bg-white/90 p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-black/45">
              Estado de cuenta
            </p>
            <h2 className="text-base font-semibold text-[#1D1B1A]">
              {verification.accountVerified ? "Cuenta verificada" : "Cuenta sin verificar"}
            </h2>
            <p className="text-xs text-black/50">
              Rol: {getRoleLabel(usuario)} - Miembro desde{" "}
              {formatReadableDate(usuario?.created_at || usuario?.createdAt)}
            </p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
              verification.accountVerified
                ? "bg-[#10B98122] text-[#10B981]"
                : "bg-[#F59E0B22] text-[#F59E0B]"
            }`}
          >
            {verification.accountVerified ? "Verificada" : "Sin verificar"}
          </span>
        </div>
      </div>

      {Section ? (
        <Section usuario={usuario} setUser={setUser} verification={verification} />
      ) : (
        <div className="rounded-3xl border border-white/70 bg-white/90 p-6 text-sm text-black/50">
          Selecciona una seccion para continuar.
        </div>
      )}
    </div>
  );
}
