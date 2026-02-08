import React from "react";

export default function BenefitsCard({ title, badgeLabel, BadgeIcon, perks = [] }) {
  return (
    <div className="relative rounded-[28px] border border-[#E9E2F7] px-4 pb-4 pt-5">
      <div className="absolute -top-3 left-4 right-4 flex items-center gap-3">
        <span className="bg-white px-2 text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
          {title}
        </span>
        <span className="ml-auto inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold bg-[#F3EEFF] text-[#5E30A5] border border-[#E9E2F7]">
          {BadgeIcon ? <BadgeIcon size={12} /> : null}
          {badgeLabel}
        </span>
      </div>
      <ul className="mt-2 space-y-2 text-sm text-slate-600">
        {perks.map((perk, index) => (
          <li key={`${perk}-${index}`} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#5E30A5]" />
            <span>{perk}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
