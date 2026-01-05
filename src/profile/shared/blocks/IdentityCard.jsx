import React, { useRef } from "react";
import { Camera, ShieldCheck } from "lucide-react";

export default function IdentityCard({
  title,
  name,
  meta,
  avatarSrc,
  showVerified,
  onAvatarSelect,
}) {
  const fileRef = useRef(null);

  return (
    <div className="relative rounded-[28px] border border-[#E9E2F7] px-4 pb-4 pt-3">
      <div className="absolute -top-3 left-4 right-4 flex items-center gap-3">
        <span className="bg-white px-2 text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
          {title}
        </span>
        {showVerified ? (
          <span className="ml-auto inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
            <ShieldCheck size={14} />
            Verificado
          </span>
        ) : null}
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={avatarSrc}
              alt="avatar"
              className="h-20 w-20 rounded-2xl border border-[#E9E2F7] bg-white object-cover"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="absolute -bottom-2 -right-2 h-9 w-9 rounded-xl bg-[#5E30A5] text-white flex items-center justify-center shadow-sm transition hover:bg-[#4B2488]"
            >
              <Camera size={16} />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={() => {
                if (onAvatarSelect) {
                  onAvatarSelect();
                }
              }}
            />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#2F1A55]">{name}</h3>
            {meta ? (
              <p className="text-xs text-slate-500">{meta}</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
