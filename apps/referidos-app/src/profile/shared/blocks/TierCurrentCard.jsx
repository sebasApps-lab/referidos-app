import React from "react";
import { BadgeCheck, Sparkles } from "lucide-react";

export default function TierCurrentCard({
  title = "Tier actual",
  badgeLabel,
  pointsLabel,
  goalLabel,
  progress = 0,
  perks = [],
}) {
  const percent = Math.max(0, Math.min(100, Math.round(progress * 100)));

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#E9E2F7] bg-white p-4 space-y-4">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(94,48,165,0.22), transparent 78%)",
        }}
      />
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#2F1A55]">{title}</span>
        <span className="inline-flex items-center gap-2 rounded-full bg-[#F3EEFF] px-3 py-1 text-[11px] font-semibold text-[#5E30A5] border border-[#E9E2F7]">
          <Sparkles size={12} />
          {badgeLabel}
        </span>
      </div>
      <div>
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Puntos acumulados</span>
          <span>
            {pointsLabel} / {goalLabel}
          </span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-[#F3EEFF] overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${percent}%`,
              background: "#5E30A5",
            }}
          />
        </div>
      </div>
      <ul className="text-xs text-slate-500 space-y-1">
        {perks.map((perk) => (
          <li key={perk} className="inline-flex items-center gap-2">
            <BadgeCheck size={14} className="text-emerald-500" />
            {perk}
          </li>
        ))}
      </ul>
    </div>
  );
}
