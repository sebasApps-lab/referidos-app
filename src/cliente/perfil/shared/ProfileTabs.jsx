import React from "react";

export default function ProfileTabs({
  groups = [],
  active,
  onChange,
}) {
  return (
    <div className="flex flex-col gap-4 px-2 pb-2 pt-1">
      {groups.map((group) => (
        <div key={group.title} className="flex flex-col gap-2">
          <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
            {group.title}
          </p>
          <div className="flex flex-col gap-2">
            {group.items.map((tab) => {
              const isActive = active === tab.key;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => onChange(tab.key)}
                  className={`w-full text-left rounded-2xl border transition ${
                    isActive
                      ? "border-white/20 bg-white/15 text-white shadow-sm"
                      : "border-white/10 bg-transparent text-white/70 hover:text-white"
                  }`}
                >
                  <div className="px-4 py-3 flex items-center gap-3">
                    {Icon && (
                      <span
                        className={`h-9 w-9 rounded-xl flex items-center justify-center ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-white/10 text-white"
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
