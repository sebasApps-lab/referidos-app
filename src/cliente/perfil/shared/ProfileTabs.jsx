import React from "react";

export default function ProfileTabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
      {tabs.map((tab) => {
        const isActive = active === tab.key;
        const Icon = tab.icon;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`min-w-[180px] md:min-w-0 text-left rounded-2xl border transition ${
              isActive
                ? "border-black/10 bg-[#1D1B1A] text-white shadow"
                : "border-white/60 bg-white/90 text-black/60 hover:text-black"
            }`}
          >
            <div className="px-4 py-3 flex items-center gap-3">
              {Icon && (
                <span
                  className={`h-9 w-9 rounded-2xl flex items-center justify-center ${
                    isActive ? "bg-white/15 text-white" : "bg-white text-[#E07A5F]"
                  }`}
                >
                  <Icon size={18} />
                </span>
              )}
              <div>
                <p className="text-sm font-semibold">{tab.label}</p>
                {tab.description && (
                  <p className="text-xs opacity-70">{tab.description}</p>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
