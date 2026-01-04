import React from "react";
import { BadgeCheck, ShieldCheck } from "lucide-react";
import DangerZone from "./DangerZone";
import { getPlanFallback } from "../../../cliente/services/clienteUI";

export default function ManageAccount({ usuario, setUser, verification }) {
  const isNegocio = usuario?.role === "negocio";
  const plan = getPlanFallback(usuario?.role);

  return (
    <section className="space-y-5">
      {!verification.accountVerified ? (
        <div className="relative rounded-[28px] border border-[#E9E2F7] px-4 pb-4 pt-5">
          <div className="absolute -top-3 left-4 right-4 flex items-center gap-3">
            <span className="bg-white px-2 text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
              Estado de cuenta
            </span>
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1.5 text-[11px] font-semibold text-amber-600">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F4B740] text-[12px] font-black text-white leading-none">
                -
              </span>
              Sin verificar
            </span>
          </div>
          <div className="mt-3 space-y-5 text-sm text-slate-600 pb-1">
            <p className="text-xs text-slate-500 text-center">
              {isNegocio
                ? "Verifica la cuenta para que puedas empezar a publicar promociones."
                : "Verifica tu cuenta para acceder a mejores beneficios."}
            </p>
            {isNegocio ? (
              <div className="space-y-3">
                <p className="text-xs font-semibold text-[#2F1A55] text-left">
                  Beneficios a los que puedes acceder:
                </p>
                <ul className="space-y-1 text-xs text-slate-400">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="inline-flex items-center gap-2">
                      <BadgeCheck size={14} className="text-slate-400" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="flex items-center justify-center gap-3 mr-1">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-[#FFC21C] px-3 py-2 text-xs font-semibold text-white shadow active:scale-[0.98]"
              >
                <ShieldCheck size={17} />
                Verificar cuenta
              </button>
            </div>
            {isNegocio ? (
              <p className="text-[11px] text-slate-400 text-center">
                Estos beneficios aplican al plan GRATUITO. Para ver planes
                pagados y con mejores beneficios revisa los planes{" "}
                <button
                  type="button"
                  className="inline p-0 font-semibold text-[#5E30A5] hover:underline"
                >
                  Ver Planes
                </button>
                .
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      <DangerZone usuario={usuario} setUser={setUser} />
    </section>
  );
}
