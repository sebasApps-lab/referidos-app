import React from "react";

export default function ProfileTabs({
  groups = [],
  active,
  onChange,
}) {
  return (
    <div className="flex flex-col gap-4 px-2 pb-2 pt-2">
      {groups.map((group) => (
        <div key={group.title} className="flex flex-col gap-2">
          <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
            {group.title}
          </p>
          <div className="flex flex-col gap-0 border border-white/20 rounded-2xl overflow-hidden">
            {group.items.map((tab) => {
              const isActive = active === tab.key;
              const Icon = tab.icon;
              const isDisabled = tab.disabled;
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    if (!isDisabled) onChange(tab.key);
                  }}
                  disabled={isDisabled}
                  className={`w-full text-left border transition ${
                    isActive
                      ? "border-white/20 bg-white/15 text-white shadow-sm"
                      : "border-white/12 bg-transparent text-white/70 hover:text-white"
                  } ${isDisabled ? "opacity-50 cursor-default" : ""}`}
                >
                  <div className="px-0 flex items-center gap-4">
                    {Icon && (
                      <span
                        className={`h-14 w-14 flex items-center justify-center ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-white/8 text-white"
                        }`}
                      >
                        <Icon size={18} />
                      </span>
                    )}
                    <p className="text-sm font-semibold">{tab.label}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
