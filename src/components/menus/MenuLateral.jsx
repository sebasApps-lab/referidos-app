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
        className={`fixed inset-0 backdrop-blur-sm bg-black/40 transition-opacity ${
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
        <div
          className="h-full flex flex-col gap-6 p-6 border-l border-white/40 shadow-2xl"
          style={{
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.96), rgba(255,255,255,0.88))",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={getAvatarSrc(usuario)}
                alt="avatar"
                className="h-12 w-12 rounded-2xl border border-white shadow-sm object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-[#1D1B1A]">
                  {usuario?.nombre || "Usuario"}
                </p>
                <p className="text-xs text-black/50">{getRoleLabel(usuario)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="h-9 w-9 rounded-2xl border border-black/10 bg-white/80 flex items-center justify-center"
              aria-label="Cerrar menu"
            >
              <X size={16} />
            </button>
          </div>

          <nav className="flex flex-col gap-3 text-sm text-black/70">
            <Link
              to={`${base}/perfil`}
              onClick={onClose}
              className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white/80 px-4 py-3 hover:shadow-sm"
            >
              <User size={18} className="text-[#3D5A80]" />
              Mi perfil
            </Link>

            <Link
              to={`${base}/qr-validos`}
              onClick={onClose}
              className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white/80 px-4 py-3 hover:shadow-sm"
            >
              <QrCode size={18} className="text-[#E07A5F]" />
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
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-100"
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
