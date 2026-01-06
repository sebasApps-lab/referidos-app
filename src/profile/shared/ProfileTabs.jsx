import React from "react";

export default function ProfileTabs({
  groups = [],
  active,
  onChange,
}) {
  return (
    <div className="flex flex-col gap-4 px-2 pb-2 pt-2">
      {groups.map((group, groupIndex) => {
        const groupTone = group.tone;
        return (
          <div key={group.title || `group-${groupIndex}`} className="flex flex-col gap-2">
            {group.title ? (
              <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5E30A5]/60">
                {group.title}
              </p>
            ) : null}
            <div
              className={`flex flex-col gap-0 rounded-2xl overflow-hidden bg-white border divide-y ${
                groupTone === "danger"
                  ? "border-red-200 divide-red-200/60"
                  : "border-[#5E30A5]/20 divide-[#5E30A5]/12"
              }`}
            >
              {group.items?.map((tab, index) => {
              const isActive = active === tab.key;
              const Icon = tab.icon;
              const isDisabled = tab.disabled;
              const isDanger = tab.tone === "danger";
              const activeLine = isDanger ? "#FCA5A5" : "#D9CBFF";
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    if (!isDisabled) onChange(tab.key);
                  }}
                  disabled={isDisabled}
                  className={`relative w-full text-left transition ${
                    isActive
                      ? isDanger
                        ? "bg-[#FFF1F2] text-[#B91C1C]"
                        : "bg-[#F8F5FF] text-[#3B1A66]"
                      : isDanger
                      ? "bg-transparent text-red-500 hover:text-red-600"
                      : "bg-transparent text-[#5E30A5]/70 hover:text-[#5E30A5]"
                  } ${isDisabled ? "opacity-50 cursor-default" : ""}`}
                >
                  {isActive && (
                    <span
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
                      style={{ backgroundColor: activeLine }}
                    />
                  )}
                  {isActive && index > 0 && (
                    <span
                      className="pointer-events-none absolute inset-x-0 top-0 h-px"
                      style={{ backgroundColor: activeLine }}
                    />
                  )}
                  <div className="px-0 flex items-center gap-0">
                    {Icon && (
                      <span
                        className={`h-14 w-14 flex items-center justify-center ${
                          isActive
                            ? isDanger
                              ? "bg-[#FFE4E6] text-[#B91C1C]"
                              : "bg-[#F8F5FF] text-[#5E30A5] ring-1 ring-[#D9CBFF]/60"
                            : isDanger
                            ? "bg-red-50 text-red-500"
                            : "bg-[#F6F1FF] text-[#5E30A5]"
                        }`}
                      >
                        <Icon size={18} />
                      </span>
                    )}
                    <p className="text-sm font-semibold px-4 py-3">
                      {tab.label}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      );
      })}
    </div>
  );
}
