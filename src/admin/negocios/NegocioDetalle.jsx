// src/admin/negocios/NegocioDetalle.jsx
import React from "react";
import { Building, MapPin, Shield, Store } from "lucide-react";
import Badge from "../../components/ui/Badge";

export default function NegocioDetalle({ open, onClose, negocio }) {
  if (!open || !negocio) return null;

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
              Negocio
            </div>
            <div className="text-xl font-bold text-[#2F1A55]">
              {negocio.nombre}
            </div>
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
          <Badge variant="purple">{negocio.sector}</Badge>
          <Badge variant="success">{negocio.estado}</Badge>
        </div>

        <div className="mt-6 space-y-3 rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
            <Store size={16} />
            Datos generales
          </div>
          <div className="space-y-2 text-xs text-slate-500">
            <div>ID: {negocio.id}</div>
            <div>Propietario: {negocio.propietario}</div>
            <div>Promos activas: {negocio.promosActivas}</div>
            <div>Sucursales: {negocio.sucursales}</div>
          </div>
        </div>

        <div className="mt-4 space-y-3 rounded-2xl border border-[#E9E2F7] bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
            <MapPin size={16} />
            Ubicacion
          </div>
          <div className="text-xs text-slate-500">
            Direccion principal: {negocio.direccion}
          </div>
        </div>

        <div className="mt-4 space-y-3 rounded-2xl border border-[#E9E2F7] bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
            <Building size={16} />
            Actividad
          </div>
          <div className="space-y-2 text-xs text-slate-500">
            <div>QRs generados: 420</div>
            <div>QRs canjeados: 268</div>
            <div>Reportes recibidos: 3</div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#F3DADA] bg-[#FFF5F5] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-rose-600">
            <Shield size={16} />
            Acciones
          </div>
          <div className="mt-3 grid gap-2">
            <button
              type="button"
              className="rounded-xl border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600"
            >
              Suspender promos
            </button>
            <button
              type="button"
              className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
            >
              Revisar actividad
            </button>
            <button
              type="button"
              className="rounded-xl bg-rose-600 px-3 py-2 text-xs font-semibold text-white"
            >
              Bloquear negocio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
