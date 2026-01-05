import React from "react";
import { BadgeCheck, Sparkles } from "lucide-react";

export default function TierNextCard({
  title = "Siguiente tier",
  badgeLabel = "Conector",
  perks = [],
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#E9E2F7] bg-white p-4 space-y-3">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(143,211,0,0.22), transparent 65%)",
        }}
      />
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#2F1A55]">{title}</span>
        <span className="inline-flex items-center gap-2 rounded-full bg-[#EFF9E4] px-3 py-1 text-[11px] font-semibold text-[#6BB100] border border-[#E9E2F7]">
          <Sparkles size={12} />
          {badgeLabel}
        </span>
      </div>
      <ul className="text-xs text-slate-500 space-y-1">
        {perks.map((perk) => (
          <li key={`next-${perk}`} className="inline-flex items-center gap-2">
            <BadgeCheck size={14} className="text-emerald-500" />
            {perk}
          </li>
        ))}
      </ul>
    </div>
  );
}
