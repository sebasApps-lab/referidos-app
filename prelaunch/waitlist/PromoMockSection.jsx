import React from "react";

export default function PromoMockSection() {
  return (
    <div className="mt-12 w-full">
      <div className="relative w-full">
        <div className="floaty absolute -top-6 left-6 h-16 w-16 rounded-2xl bg-white shadow-xl" />
        <div className="floaty absolute -bottom-10 right-6 h-20 w-20 rounded-full bg-[var(--brand-yellow)]/70 blur-xl" />
        <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white/70 shadow-2xl backdrop-blur">
          <div className="relative h-[360px] md:h-[420px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("https://images.pexels.com/photos/8830498/pexels-photo-8830498.jpeg?cs=srgb&dl=pexels-n-voitkevich-8830498.jpg&fm=jpg")',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/40 to-transparent" />

            <div className="absolute right-10 top-6 w-[230px] rounded-[28px] border border-white/70 bg-white/95 p-3 shadow-xl md:right-14 md:top-8 md:w-[270px]">
              <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                Referidos
              </div>
              <div className="mt-3 rounded-2xl bg-slate-100 p-3">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white shadow-inner">
                  <div className="h-full w-full rounded-xl bg-[linear-gradient(90deg,rgba(94,48,165,0.12)_25%,transparent_25%,transparent_75%,rgba(94,48,165,0.12)_75%),linear-gradient(0deg,rgba(94,48,165,0.12)_25%,transparent_25%,transparent_75%,rgba(94,48,165,0.12)_75%)] bg-[length:22px_22px]" />
                  <div className="absolute inset-4 rounded-lg border border-[var(--brand-purple)]/20 bg-white/80" />
                </div>
              </div>
              <p className="mt-3 text-center text-[11px] font-semibold text-[var(--brand-purple)]">
                Escanea para canjear
              </p>
            </div>

            <div className="absolute inset-x-0 bottom-4">
              <div className="mx-auto flex w-full max-w-5xl gap-3 px-6 opacity-30">
                {["2x1 en cafés", "30% en sushi", "Promo delivery", "Combo familiar"].map((title) => (
                  <div
                    key={title}
                    className="flex-1 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-xs font-semibold text-slate-600 shadow"
                  >
                    {title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
