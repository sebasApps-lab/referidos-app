// src/admin/usuarios/UsuarioDrawer.jsx
import React from "react";
import { Mail, Phone, Shield, User } from "lucide-react";
import Badge from "../../components/ui/Badge";

export default function UsuarioDrawer({ open, onClose, usuario }) {
  if (!open || !usuario) return null;

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
              Usuario
            </div>
            <div className="text-xl font-bold text-[#2F1A55]">
              {usuario.nombre}
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
          <Badge variant="purple">{usuario.role}</Badge>
          <Badge variant="success">{usuario.account_status}</Badge>
        </div>

        <div className="mt-6 space-y-3 rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
            <User size={16} />
            Datos personales
          </div>
          <div className="space-y-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Mail size={14} /> {usuario.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} /> {usuario.telefono || "Sin telefono"}
            </div>
            <div>ID: {usuario.id}</div>
            <div>Registro: {usuario.fechaCreacion}</div>
          </div>
        </div>

        <div className="mt-4 space-y-3 rounded-2xl border border-[#E9E2F7] bg-white p-4">
          <div className="text-sm font-semibold text-[#2F1A55]">
            Relacion con negocios
          </div>
          <div className="space-y-2 text-xs text-slate-500">
            <div>Negocio principal: La Rueda</div>
            <div>Promos activas: 4</div>
            <div>Reportes recibidos: {usuario.reportes}</div>
          </div>
        </div>

        <div className="mt-4 space-y-3 rounded-2xl border border-[#E9E2F7] bg-white p-4">
          <div className="text-sm font-semibold text-[#2F1A55]">
            Actividad reciente
          </div>
          <div className="space-y-2 text-xs text-slate-500">
            <div>QRs generados: 12</div>
            <div>QRs canjeados: 7</div>
            <div>Ultima sesion: Hace 2 horas</div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#F3DADA] bg-[#FFF5F5] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-rose-600">
            <Shield size={16} />
            Acciones sensibles
          </div>
          <div className="mt-3 grid gap-2">
            <button
              type="button"
              className="rounded-xl border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600"
            >
              Bloquear usuario
            </button>
            <button
              type="button"
              className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
            >
              Forzar cierre de sesion
            </button>
            <button
              type="button"
              className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
            >
              Reset onboarding
            </button>
            <button
              type="button"
              className="rounded-xl bg-rose-600 px-3 py-2 text-xs font-semibold text-white"
            >
              Eliminar usuario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
