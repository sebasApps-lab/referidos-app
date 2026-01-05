import React from "react";

export default function SessionsList({
  items = [],
  renderLeading,
  leadingClassName = "bg-[#F3EEFF] text-[#5E30A5]",
  getPrimaryText,
  getSecondaryText,
  renderTrailing,
}) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={item?.id ?? index}
          className="rounded-2xl border border-[#E9E2F7] bg-white p-4 flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <span
              className={`h-10 w-10 rounded-xl flex items-center justify-center ${leadingClassName}`}
            >
              {renderLeading ? renderLeading(item, index) : null}
            </span>
            <div>
              <p className="text-xs font-semibold text-[#2F1A55]">
                {getPrimaryText ? getPrimaryText(item, index) : null}
              </p>
              <p className="text-[11px] text-slate-400">
                {getSecondaryText ? getSecondaryText(item, index) : null}
              </p>
            </div>
          </div>
          {renderTrailing ? (
            renderTrailing(item, index)
          ) : (
            <div className="h-9 w-9" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
}
