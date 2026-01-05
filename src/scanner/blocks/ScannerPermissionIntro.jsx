import React from "react";
import { Camera, QrCode } from "lucide-react";

export default function ScannerPermissionIntro({
  title,
  description,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
}) {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#F7F2FF] via-white to-white" />
      <div className="absolute -top-20 -right-10 h-52 w-52 rounded-full bg-[#E9DFFF] opacity-70 blur-3xl" />
      <div className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-[#EFE7FF] opacity-80 blur-3xl" />
      <div className="relative z-10 w-full h-full max-w-md px-6 text-center">
        <div className="relative mx-auto h-36 w-36">
          <div className="absolute inset-0 rounded-[36px] bg-[#F3EEFF] shadow-[0_20px_50px_rgba(94,48,165,0.18)]" />
          <div className="absolute inset-0 flex items-center justify-center text-[#5E30A5]">
            <Camera size={62} strokeWidth={1.6} />
          </div>
          <div className="absolute -bottom-3 -right-3 h-12 w-12 rounded-full border-2 border-white bg-[#5E30A5] text-white flex items-center justify-center shadow-sm">
            <QrCode size={18} strokeWidth={2} />
          </div>
        </div>

        <h2 className="mt-8 text-2xl font-semibold text-[#2F1A55]">
          {title}
        </h2>
        <p className="mt-3 text-[15px] text-slate-500">{description}</p>

        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            onClick={onPrimary}
            className="w-full rounded-2xl bg-[#5E30A5] px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4B2488]"
          >
            {primaryLabel}
          </button>
          <button
            type="button"
            onClick={onSecondary}
            className="w-full rounded-2xl border border-[#E9E2F7] px-4 py-3.5 text-sm font-semibold text-[#5E30A5] transition hover:bg-[#F5F3FF]"
          >
            {secondaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
