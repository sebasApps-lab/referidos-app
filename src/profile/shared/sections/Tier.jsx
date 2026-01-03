import React from "react";
import { ArrowRight, ArrowUpRight, BadgeCheck, Crown, Sparkles } from "lucide-react";
import {
  formatCompactNumber,
  getPlanFallback,
  getTierMeta,
  getTierProgress,
} from "../../../cliente/services/clienteUI";

export default function Tier({ usuario }) {
  const isNegocio = usuario?.role === "negocio";
  const tier = getTierMeta(usuario);
  const progress = getTierProgress(usuario);
  const plan = getPlanFallback(usuario?.role);

  return (
    <section className="relative rounded-[30px] border border-[#E9E2F7] bg-white px-6 pb-6 pt-6 space-y-6">
      <div className="absolute -top-3 left-4 right-4 flex items-center gap-3">
        <span className="bg-white px-2 text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
          Tier (Liga)
        </span>
      </div>
      <div className="mt-1">
        <p className="text-xs text-slate-500 text-center">
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
        <div className="space-y-5">
          <div className="relative overflow-hidden rounded-2xl border border-[#E9E2F7] bg-white p-4 space-y-4">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 0%, rgba(94,48,165,0.22), transparent 78%)",
              }}
            />
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#2F1A55]">Tier actual</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#F3EEFF] px-3 py-1 text-[11px] font-semibold text-[#5E30A5] border border-[#E9E2F7]">
                <Sparkles size={12} />
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
          <div className="relative overflow-hidden rounded-2xl border border-[#E9E2F7] bg-white p-4 space-y-3">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 0%, rgba(143,211,0,0.22), transparent 65%)",
              }}
            />
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#2F1A55]">Siguiente tier</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#EFF9E4] px-3 py-1 text-[11px] font-semibold text-[#6BB100] border border-[#E9E2F7]">
                <Sparkles size={12} />
                Conector
              </span>
            </div>
            <ul className="text-xs text-slate-500 space-y-1">
              {plan.perks.map((perk) => (
                <li key={`next-${perk}`} className="inline-flex items-center gap-2">
                  <BadgeCheck size={14} className="text-emerald-500" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="rounded-2xl border border-[#E9E2F7] p-4"
            style={{
              background: "linear-gradient(135deg, #FFFFFF 0%, #F6F1FF 100%)",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 rounded-xl bg-[#F3EEFF] text-[#5E30A5] flex items-center justify-center">
                  <Sparkles size={16} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#2F1A55]">Explorar Tiers</p>
                  <p className="text-[11px] text-slate-500">
                    Descubre los beneficios de cada nivel.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="h-9 w-9 rounded-full bg-[#5E30A5] text-white flex items-center justify-center"
                aria-label="Explorar tiers"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
