import React from "react";
import { ArrowUpRight, BadgeCheck, Crown } from "lucide-react";

export default function PlanBenefitsCard({
  title = "Plan actual",
  planLabel,
  perks = [],
  history = [],
  onUpgrade,
  upgradeLabel = "Actualizar plan",
}) {
  return (
    <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#2F1A55]">{title}</span>
        <span className="inline-flex items-center gap-2 rounded-full bg-[#F3EEFF] px-3 py-1 text-xs font-semibold text-[#5E30A5]">
          <Crown size={14} className="text-[#5E30A5]" />
          {planLabel}
        </span>
      </div>
      <ul className="text-xs text-slate-500 space-y-1">
        {perks.map((perk) => (
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
          {history.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={onUpgrade}
        className="mt-2 inline-flex items-center gap-2 rounded-xl bg-[#5E30A5] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#4B2488]"
      >
        {upgradeLabel}
        <ArrowUpRight size={14} />
      </button>
    </div>
  );
}
