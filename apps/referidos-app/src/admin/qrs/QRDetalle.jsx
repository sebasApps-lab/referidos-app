// src/admin/qrs/QRDetalle.jsx
import React from "react";
import { Fingerprint, ShieldAlert } from "lucide-react";
import Badge from "../../components/ui/Badge";

export default function QRDetalle({ open, onClose, qr }) {
  if (!open || !qr) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        role="button"
        tabIndex={0}
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400">
              QR detalle
            </div>
            <div className="text-xl font-bold text-[#2F1A55]">{qr.id}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#E9E2F7] px-3 py-1 text-xs font-semibold text-slate-500"
          >
            Cerrar
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="purple">{qr.promo}</Badge>
          <Badge variant="info">{qr.estado}</Badge>
        </div>

        <div className="mt-6 space-y-3 rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] p-4">
          <div className="text-sm font-semibold text-[#2F1A55]">Contexto</div>
          <div className="space-y-2 text-xs text-slate-500">
            <div>Cliente: {qr.cliente}</div>
            <div>Negocio: {qr.negocio}</div>
            <div>Creado: {qr.fechaCreacion}</div>
            <div>Expira: {qr.fechaExpira}</div>
            <div>Canje: {qr.fechaCanje}</div>
          </div>
        </div>

        <div className="mt-4 space-y-3 rounded-2xl border border-[#E9E2F7] bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
            <Fingerprint size={16} />
            Huellas
          </div>
          <div className="space-y-2 text-xs text-slate-500">
            <div>Hash: 9d1a0f...f4b2</div>
            <div>Firma: 22aa...bb91</div>
            <div>Version: v2-hmac</div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#F3DADA] bg-[#FFF5F5] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-rose-600">
            <ShieldAlert size={16} />
            Acciones antifraude
          </div>
          <div className="mt-3 grid gap-2">
            <button
              type="button"
              className="rounded-xl border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600"
            >
              Marcar como sospechoso
            </button>
            <button
              type="button"
              className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
            >
              Forzar expiracion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
