// src/pages/NegocioHome.jsx
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

export default function NegocioHome() {
  const { usuario, data } = useContext(AppContext);

  return (
    <div className="min-h-screen p-4 bg-white">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-[#5E30A5]">Área del negocio</h1>
        <p className="text-sm text-gray-600">Bienvenido{usuario?.nombre ? `, ${usuario.nombre}` : ""} — panel de promociones.</p>
      </header>

      <main className="space-y-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-2">Acciones rápidas</h2>
          <div className="flex gap-2">
            <Link to="/scanner" className="flex-1 text-center bg-[#5E30A5] text-white py-2 rounded">Escanear QR</Link>
            <Link to="/promos" className="flex-1 text-center bg-yellow-400 text-black py-2 rounded">Mis promos</Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-2">Tus promociones</h2>
          <div className="space-y-3">
            {/* Si el usuario es negocio, mostramos sus promos; si no, una lista vacía */}
            {usuario && usuario.role === "negocio" ? (
              (usuario.promociones || data.negocios.find(n => n.id === usuario.id)?.promociones || []).map(p => (
                <div key={p.id} className="border rounded p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{p.titulo}</div>
                      <div className="text-xs text-gray-500">{p.inicio} → {p.fin}</div>
                    </div>
                    <div className="text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${p.activo ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                        {p.activo ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">No hay promociones para mostrar. Inicia sesión como negocio para ver y gestionar tus promociones.</p>
            )}
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-6">
          <div className="mb-2">Número de soporte: <strong className="text-[#5E30A5]">{data.soporteNumero}</strong></div>
          <div className="opacity-60 text-xs">ALPHA v0.0.1</div>
        </div>
      </main>
    </div>
  );
}