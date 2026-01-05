import React from "react";
import { Pencil, TriangleAlert } from "lucide-react";

export default function NegocioIdentityCard({
  title,
  subtitle,
  warningText,
  showWarning,
  items = [],
  onEdit,
  valueClass = "text-[13px]",
}) {
  return (
    <div className="relative rounded-[28px] border border-[#E9E2F7] px-5 pb-5 pt-4">
      <div className="absolute -top-2 left-4 right-4 flex items-center gap-3">
        <span className="bg-white px-2 text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
          {title}
        </span>
      </div>
      {showWarning ? (
        <div className="mt-1 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 flex items-center gap-3 text-xs text-red-500">
          <TriangleAlert size={16} className="text-red-500" />
          {warningText}
        </div>
      ) : subtitle ? (
        <div className="mt-1 text-xs text-slate-500 text-center">
          {subtitle}
        </div>
      ) : null}
      <div className="mt-5">
        <div className="mt-3 space-y-4">
          {items.map((item, index) => (
            <div key={item.id || `negocio-${index}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-4">
                  <div className="text-xs font-semibold text-[#2F1A55]">
                    {item.label}
                  </div>
                  <div
                    className={`${valueClass} ${
                      item.missing ? "text-red-500" : "text-slate-500"
                    }`}
                  >
                    {item.value}
                  </div>
                </div>
                {onEdit ? (
                  <button
                    type="button"
                    onClick={() => onEdit(item.raw, item.index)}
                    className="text-[#5E30A5]"
                    aria-label={`Editar ${item.label}`}
                  >
                    <Pencil size={16} />
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
