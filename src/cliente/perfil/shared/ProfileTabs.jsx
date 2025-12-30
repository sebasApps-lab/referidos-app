import React from "react";

export default function ProfileTabs({ tabs, active, onChange }) {
  return (
    <div className="flex flex-col">
      {tabs.map((tab) => {
        const isActive = active === tab.key;
        const Icon = tab.icon;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`w-full text-left border-t transition ${
              isActive
                ? "border-white/20 bg-white/15 text-white shadow-sm"
                : "border-white/10 bg-transparent text-white/70 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-6">
              {Icon && (
                <span
                  className={`h-13 w-13 flex items-center justify-center ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-white/10 text-white"
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
