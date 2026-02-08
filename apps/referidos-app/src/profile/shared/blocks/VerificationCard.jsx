import React from "react";
import { ShieldCheck } from "lucide-react";

export default function VerificationCard({ onVerify }) {
  return (
    <div className="relative rounded-[28px] px-4 pb-4 pt-5 mb-8">
      <div className="absolute -top-3 left-4 right-4 flex items-center gap-3">
        <span className="bg-white px-2 text-base font-semibold text-[#2F1A55]">
          Cuenta sin verificar
        </span>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1.5 text-[11px] font-semibold text-amber-600">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F4B740] text-[12px] font-black text-white leading-none">
            -
          </span>
          Sin verificar
        </span>
      </div>
      <div className="mt-1 space-y-3 text-sm text-slate-600">
        <div className="flex items-center justify-center gap-3 mr-1">
          <button
            type="button"
            onClick={onVerify}
            className="inline-flex items-center gap-2 rounded-lg bg-[#FFC21C] px-3 py-1.5 text-xs font-semibold text-white shadow active:scale-[0.98]"
          >
            <ShieldCheck size={17} />
            Verificar cuenta
          </button>
        </div>
      </div>
    </div>
  );
}
