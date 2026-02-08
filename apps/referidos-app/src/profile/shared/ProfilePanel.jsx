import React from "react";
import { getVerificationStatus } from "../../cliente/services/clienteUI";

export default function ProfilePanel({ activeTab, sections, usuario, setUser }) {
  const Section = sections[activeTab];
  const verification = getVerificationStatus(usuario);
  return (
    <div className="flex flex-col gap-6">
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
