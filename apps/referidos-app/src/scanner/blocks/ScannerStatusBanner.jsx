import React from "react";

const STATUS_STYLES = {
  info: "border-[#E9E2F7] bg-[#FAF8FF] text-slate-500",
  valido: "border-emerald-200 bg-emerald-50 text-emerald-600",
  canjeado: "border-sky-200 bg-sky-50 text-sky-600",
  expirado: "border-red-200 bg-red-50 text-red-600",
};

export default function ScannerStatusBanner({ message, type = "info" }) {
  if (!message) return null;
  const style = STATUS_STYLES[type] || STATUS_STYLES.info;

  return (
    <div className={`rounded-2xl border px-4 py-3 text-xs ${style}`}>
      {message}
    </div>
  );
}
