import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, QrCode, User, X } from "lucide-react";
import { useAppStore } from "../../store/appStore";
import { getAvatarSrc, getRoleLabel } from "../../cliente/services/clienteUI";

export default function MenuLateral({ visible, onClose }) {
  const usuario = useAppStore((s) => s.usuario);
  const bootstrap = useAppStore((s) => s.bootstrap);
  const onboarding = useAppStore((s) => s.onboarding);
  const logout = useAppStore((s) => s.logout);
  const navigate = useNavigate();

  if (!visible) return null;
  if (bootstrap || typeof usuario === "undefined") return null;
  if (!usuario || !onboarding?.allowAccess) return null;
  if (!usuario.role) return null;

  const base =
    usuario?.role === "cliente"
      ? "/cliente"
      : usuario?.role === "negocio"
      ? "/negocio"
      : usuario.role === "admin"
      ? "/admin"
      : "";

  if (!base) return null;

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 transition-opacity ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 2000 }}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-72 max-w-[90vw] transition-transform ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 2100 }}
      >
        <div className="h-full flex flex-col gap-6 p-6 border-l border-[#E9E2F7] bg-white shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={getAvatarSrc(usuario)}
                alt="avatar"
                className="h-12 w-12 rounded-2xl border border-[#E9E2F7] bg-white object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-[#2F1A55]">
                  {usuario?.nombre || "Usuario"}
                </p>
                <p className="text-xs text-slate-500">{getRoleLabel(usuario)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="h-9 w-9 rounded-xl border border-[#E9E2F7] bg-white flex items-center justify-center text-slate-400 hover:text-[#5E30A5]"
              aria-label="Cerrar menu"
            >
              <X size={16} />
            </button>
          </div>

          <nav className="flex flex-col gap-3 text-sm text-slate-600">
            <Link
              to={`${base}/perfil`}
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl border border-[#E9E2F7] bg-white px-4 py-3 hover:border-[#5E30A5]/40"
            >
              <User size={18} className="text-[#5E30A5]" />
              Mi perfil
            </Link>

            <Link
              to={`${base}/qr-validos`}
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl border border-[#E9E2F7] bg-white px-4 py-3 hover:border-[#5E30A5]/40"
            >
              <QrCode size={18} className="text-[#5E30A5]" />
              Mis QR validos
            </Link>
          </nav>

          <div className="mt-auto">
            <button
              onClick={async () => {
                try {
                  await logout();
                } finally {
                  onClose?.();
                  navigate("/", { replace: true });
                }
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-100"
            >
              <LogOut size={18} />
              Cerrar sesion
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
