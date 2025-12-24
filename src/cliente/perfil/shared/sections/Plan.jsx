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
    <section className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-[#1D1B1A]">
          {isNegocio ? "Plan de negocio" : "Tier de cliente"}
        </h3>
        <p className="text-xs text-black/50">
          {isNegocio
            ? "Revisa tu suscripcion actual."
            : "Avanza y desbloquea beneficios."}
        </p>
      </div>

      {isNegocio ? (
        <div className="rounded-2xl border border-black/10 bg-white/80 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-black/70">
              Plan actual
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#E07A5F22] px-3 py-1 text-xs font-semibold text-[#E07A5F]">
              <Crown size={14} />
              {plan.plan}
            </span>
          </div>
          <ul className="text-xs text-black/55 space-y-1">
            {plan.perks.map((perk) => (
              <li key={perk} className="inline-flex items-center gap-2">
                <BadgeCheck size={14} className="text-[#10B981]" />
                {perk}
              </li>
            ))}
          </ul>
          <div>
            <p className="text-[11px] font-semibold text-black/60">
              Historial reciente
            </p>
            <ul className="mt-1 text-[11px] text-black/50 space-y-1">
              {plan.upgrades.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            className="mt-2 inline-flex items-center gap-2 rounded-2xl bg-[#1D1B1A] px-4 py-2 text-xs font-semibold text-white"
          >
            Actualizar plan
            <ArrowUpRight size={14} />
          </button>
        </div>
      ) : (
        <div className="rounded-2xl border border-black/10 bg-white/80 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-black/70">Tier actual</span>
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                background: `${tier.glow}66`,
                color: tier.accent,
                border: `1px solid ${tier.glow}`,
              }}
            >
              {tier.label}
            </span>
          </div>
          <div>
            <div className="flex items-center justify-between text-[11px] text-black/45">
              <span>Puntos acumulados</span>
              <span>
                {formatCompactNumber(progress.points)} /{" "}
                {formatCompactNumber(progress.nextGoal)}
              </span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-black/5 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.round(progress.progress * 100)}%`,
                  background: `linear-gradient(90deg, ${tier.accent}, #E07A5F)`,
                }}
              />
            </div>
          </div>
          <ul className="text-xs text-black/55 space-y-1">
            {plan.perks.map((perk) => (
              <li key={perk} className="inline-flex items-center gap-2">
                <BadgeCheck size={14} className="text-[#10B981]" />
                {perk}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
