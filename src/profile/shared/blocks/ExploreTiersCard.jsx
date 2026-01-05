import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function ExploreTiersCard({
  title = "Explorar Tiers",
  description = "Descubre los beneficios de cada nivel.",
  onExplore,
}) {
  return (
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
            <p className="text-sm font-semibold text-[#2F1A55]">{title}</p>
            <p className="text-[11px] text-slate-500">{description}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onExplore}
          className="h-9 w-9 rounded-full bg-[#5E30A5] text-white flex items-center justify-center"
          aria-label="Explorar tiers"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
