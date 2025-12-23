// src/components/ui/Badge.jsx
import React from "react";

const VARIANTS = {
  neutral: "bg-slate-100 text-slate-600 border-slate-200",
  info: "bg-sky-50 text-sky-600 border-sky-100",
  success: "bg-emerald-50 text-emerald-600 border-emerald-100",
  warning: "bg-amber-50 text-amber-700 border-amber-100",
  danger: "bg-rose-50 text-rose-600 border-rose-100",
  purple: "bg-[#F0EBFF] text-[#5E30A5] border-[#E1D7FB]",
};

const SIZES = {
  sm: "px-2 py-0.5 text-[11px]",
  md: "px-2.5 py-1 text-xs",
};

export default function Badge({
  children,
  variant = "neutral",
  size = "sm",
  className = "",
}) {
  const variantClass = VARIANTS[variant] || VARIANTS.neutral;
  const sizeClass = SIZES[size] || SIZES.sm;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border ${sizeClass} font-semibold ${variantClass} ${className}`}
    >
      {children}
    </span>
  );
}
