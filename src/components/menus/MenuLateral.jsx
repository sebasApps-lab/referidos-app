// src/components/menus/MenuLateral.jsx

import { Link } from "react-router-dom";

export default function MenuLateral({ visible, onClose, usuario, logout }) {
  const base =
    usuario?.role === "cliente"
      ? "/cliente"
      : usuario?.role === "negocio"
      ? "/negocio"
      : "/admin";

  return (
    <>
      {/* BACKDROP + BLUR */}
      <div
        onClick={onClose}
        className={`fixed inset-0 backdrop-blur-sm bg-black/40 transition-opacity ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 2000 }}
      />

      {/* MENÚ DESDE LA DERECHA */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl p-6 transition-transform ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 2100 }}
      >
        <h2 className="text-lg font-bold text-[#5E30A5] mb-4">
          {usuario?.nombre || "Usuario"}
        </h2>

        <nav className="flex flex-col gap-4 text-gray-700">
          <Link to={`${base}/perfil`} onClick={onClose}>
            Mi Perfil
          </Link>

          <Link to={`${base}/qr-validos`} onClick={onClose}>
            Mis QR válidos
          </Link>
        </nav>

        <button
          onClick={() => {
            logout();
            onClose();
          }}
          className="mt-10 text-red-500 underline"
        >
          Cerrar sesión
        </button>
      </div>
    </>
  );
}
