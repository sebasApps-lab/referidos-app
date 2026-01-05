import React from "react";

const Toggle = ({ active, onChange, disabled }) => (
  <button
    type="button"
    onClick={disabled ? undefined : onChange}
    aria-disabled={disabled}
    className={`w-12 h-7 rounded-full border transition flex items-center ${
      active
        ? "bg-[#5E30A5] border-[#5E30A5] justify-end"
        : "bg-slate-200 border-slate-300 justify-start"
    } ${disabled ? "cursor-not-allowed" : ""}`}
  >
    <span className="h-5 w-5 rounded-full bg-white shadow-sm mx-1" />
  </button>
);

export default function TwoFACard({ factors = [] }) {
  return (
    <div className="space-y-3">
      {factors.map((factor) => (
        <div
          key={factor.id}
          className={`rounded-2xl border border-[#E9E2F7] bg-white p-4 flex items-center justify-between ${
            factor.disabled ? "opacity-60" : ""
          }`}
        >
          <div>
            <p className="text-xs font-semibold text-[#2F1A55] flex items-center gap-2">
              {factor.title}
              {factor.badge ? (
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                  {factor.badge}
                </span>
              ) : null}
            </p>
            <p className="text-[11px] text-slate-400">{factor.description}</p>
          </div>
          <Toggle
            active={factor.toggle?.active}
            onChange={factor.toggle?.onChange}
            disabled={factor.toggle?.disabled}
          />
        </div>
      ))}
    </div>
  );
}
