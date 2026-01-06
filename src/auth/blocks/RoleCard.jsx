import React from "react";

export default function RoleCard({ title, description, onClick, className = "", children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border border-white/30 bg-white/10 px-4 py-4 text-left text-white ${className}`}
    >
      <div className="text-sm font-semibold">{title}</div>
      {description ? (
        <div className="mt-1 text-xs text-white/70">{description}</div>
      ) : null}
      {children}
    </button>
  );
}
