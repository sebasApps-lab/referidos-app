import React from "react";
import { Minus, Plus } from "lucide-react";

const DEFAULT_PROVIDERS = [
  { key: "Google", badge: "G", bg: "#4285F4", color: "#FFFFFF" },
  { key: "Facebook", badge: "f", bg: "#1877F2", color: "#FFFFFF" },
  { key: "Apple", badge: "A", bg: "#111111", color: "#FFFFFF" },
  {
    key: "Instagram",
    badge: "IG",
    bg: "linear-gradient(135deg, #F58529 0%, #DD2A7B 50%, #515BD4 100%)",
    color: "#FFFFFF",
  },
  { key: "Discord", badge: "D", bg: "#5865F2", color: "#FFFFFF" },
];

export default function LinkedAccountsCard({
  title = "Gestionar cuentas",
  providers = DEFAULT_PROVIDERS,
  linked = {},
  verified = false,
  onToggle,
  verificationHint = "Verifica para activar cambios en cuentas vinculadas.",
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-[#2F1A55]">{title}</p>
      </div>
      <div className="grid gap-2">
        {providers.map((provider) => {
          const isLinked = Boolean(linked[provider.key]);
          return (
            <div
              key={provider.key}
              className="flex items-center justify-between rounded-xl border border-[#E9E2F7] bg-white px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold uppercase"
                  style={{ background: provider.bg, color: provider.color }}
                >
                  {provider.badge}
                </span>
                <span className="text-xs text-slate-500">{provider.key}</span>
              </div>
              <button
                type="button"
                onClick={() => verified && onToggle?.(provider.key)}
                className={`h-8 w-8 rounded-full flex items-center justify-center border ${
                  isLinked
                    ? "border-red-300 text-red-500"
                    : "border-emerald-300 text-emerald-500"
                }`}
                aria-label={isLinked ? "Desvincular" : "Vincular"}
              >
                {isLinked ? <Minus size={14} /> : <Plus size={14} />}
              </button>
            </div>
          );
        })}
      </div>
      {!verified && (
        <p className="text-[11px] text-slate-400">{verificationHint}</p>
      )}
    </div>
  );
}
