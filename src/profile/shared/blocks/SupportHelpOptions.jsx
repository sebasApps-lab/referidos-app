import React from "react";

export default function SupportHelpOptions({ options = [] }) {
  return (
    <div className="space-y-3">
      {options.map((item) => (
        <button
          key={item}
          type="button"
          className="w-full rounded-2xl border border-[#E9E2F7] bg-white px-4 py-3 text-left text-sm font-semibold text-[#2F1A55]"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
