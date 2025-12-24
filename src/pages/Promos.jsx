// src/pages/Promos.jsx

import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

/**
 * Pantalla de lista de promociones
 * - Muestra todas las promociones disponibles
 * - Si el usuario es negocio, puede ver/editar sus promociones
 * - Si es cliente, puede reclamar
 * - Versión ALPHA v0.0.1
 */

export default function Promos() {
  const { data, usuario } = useContext(AppContext);

  return (
    <div className="min-h-dvh bg-white p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-[#5E30A5]">Promociones activas</h1>
        <p className="text-sm text-gray-600">Explora o gestiona tus promociones.</p>
      </header>

      <main className="space-y-4">
        {data.promociones && data.promociones.length > 0 ? (
          data.promociones.map((promo) => (
            <div
              key={promo.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg">{promo.titulo}</h2>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    promo.activo
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {promo.activo ? "Activa" : "Inactiva"}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3">{promo.descripcion}</p>
              <div className="text-xs text-gray-500 mb-2">
                Válido: {promo.inicio} → {promo.fin}
              </div>

              {usuario?.role === "negocio" ? (
                <button className="bg-[#5E30A5] text-white text-sm px-3 py-1 rounded">
                  Editar
                </button>
              ) : (
                <button className="bg-[#FFC21C] text-black text-sm px-3 py-1 rounded">
                  Ver detalles
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-sm">No hay promociones disponibles.</p>
        )}

        <div className="text-center mt-8 text-sm text-gray-500">
          <Link to="/" className="text-[#5E30A5] underline">
            ← Volver al inicio
          </Link>
          <div className="opacity-60 text-xs mt-2">ALPHA v0.0.1</div>
        </div>
      </main>
    </div>
  );
}
