import React from "react";

export default function ScannerProcessingHint({ label = "Procesando..." }) {
  return <span className="text-xs text-slate-400">{label}</span>;
}
