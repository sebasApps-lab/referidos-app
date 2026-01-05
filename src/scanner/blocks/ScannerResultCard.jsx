import React from "react";
import { sanitizeText } from "../../utils/sanitize";

export default function ScannerResultCard({
  data,
  labels = {},
}) {
  if (!data) return null;
  const {
    statusLabel = "Estado",
    promoFallback = "Promo",
    clienteLabel = "Cliente",
    negocioLabel = "Negocio",
    expiraLabel = "Expira",
    canjeadoLabel = "Canjeado",
  } = labels;

  return (
    <div className="w-full rounded-2xl border border-[#E9E2F7] bg-white shadow-sm p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">{statusLabel}</p>
        <span
          className="px-3 py-1 rounded-full text-[10px] font-semibold"
          style={{
            background:
              data.status === "valido"
                ? "#10B98122"
                : data.status === "canjeado"
                ? "#1DA1F222"
                : "#EF444422",
            color:
              data.status === "valido"
                ? "#10B981"
                : data.status === "canjeado"
                ? "#1DA1F2"
                : "#EF4444",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          {data.status}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-[#2F1A55]">
          {sanitizeText(data.promoTitulo || promoFallback)}
        </p>
        <p className="text-xs text-slate-500">
          {clienteLabel}: {sanitizeText(data.clienteNombre || data.clienteId || "N/D")}
        </p>
        <p className="text-xs text-slate-500">
          {negocioLabel}: {sanitizeText(data.negocioNombre || "N/D")}
        </p>
        {data.status === "valido" && data.expiresAt ? (
          <p className="text-[11px] text-slate-400">
            {expiraLabel}: {new Date(data.expiresAt).toLocaleTimeString()}
          </p>
        ) : null}
        {data.status === "canjeado" && data.redeemedAt ? (
          <p className="text-[11px] text-slate-400">
            {canjeadoLabel}: {new Date(data.redeemedAt).toLocaleTimeString()}
          </p>
        ) : null}
      </div>
    </div>
  );
}
