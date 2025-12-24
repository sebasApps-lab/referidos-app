import React from "react";
import { ArrowUpRight, BadgeCheck, Crown } from "lucide-react";
import {
  formatCompactNumber,
  getPlanFallback,
  getTierMeta,
  getTierProgress,
} from "../../../services/clienteUI";

export default function Plan({ usuario }) {
  const isNegocio = usuario?.role === "negocio";
  const tier = getTierMeta(usuario);
  const progress = getTierProgress(usuario);
  const plan = getPlanFallback(usuario?.role);

  return (
    <section className="rounded-2xl border border-[#E9E2F7] bg-white p-6 shadow-sm space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-[#2F1A55]">
          {isNegocio ? "Plan de negocio" : "Tier de cliente"}
        </h3>
        <p className="text-xs text-slate-500">
          {isNegocio
            ? "Revisa tu suscripcion actual."
            : "Avanza y desbloquea beneficios."}
        </p>
      </div>

      {isNegocio ? (
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#2F1A55]">
              Plan actual
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#F3EEFF] px-3 py-1 text-xs font-semibold text-[#5E30A5]">
              <Crown size={14} className="text-[#5E30A5]" />
              {plan.plan}
            </span>
          </div>
          <ul className="text-xs text-slate-500 space-y-1">
            {plan.perks.map((perk) => (
              <li key={perk} className="inline-flex items-center gap-2">
                <BadgeCheck size={14} className="text-emerald-500" />
                {perk}
              </li>
            ))}
          </ul>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">
              Historial reciente
            </p>
            <ul className="mt-1 text-[11px] text-slate-500 space-y-1">
              {plan.upgrades.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-[#5E30A5] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#4B2488]"
          >
            Actualizar plan
            <ArrowUpRight size={14} />
          </button>
        </div>
      ) : (
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#2F1A55]">Tier actual</span>
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-[#F3EEFF] text-[#5E30A5] border border-[#E9E2F7]">
              {tier.label}
            </span>
          </div>
          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Puntos acumulados</span>
              <span>
                {formatCompactNumber(progress.points)} /{" "}
                {formatCompactNumber(progress.nextGoal)}
              </span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-[#F3EEFF] overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.round(progress.progress * 100)}%`,
                  background: "#5E30A5",
                }}
              />
            </div>
          </div>
          <ul className="text-xs text-slate-500 space-y-1">
            {plan.perks.map((perk) => (
              <li key={perk} className="inline-flex items-center gap-2">
                <BadgeCheck size={14} className="text-emerald-500" />
                {perk}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
