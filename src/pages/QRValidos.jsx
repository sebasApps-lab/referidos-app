// src/pages/QRValidos.jsx

import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

/**
 * QRValidos.jsx — ALPHA v0.0.1
 * 
 * Muestra los códigos QR que el cliente ha escaneado exitosamente.
 * En esta versión se simula la data (desde el contexto global).
 */

export default function QRValidos() {
  const { usuario, data } = useContext(AppContext);

  if (!usuario) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-4">
        <p className="text-lg text-gray-700">
          Debes iniciar sesión para ver tus QR válidos.
        </p>
        <Link
          to="/"
          className="mt-4 bg-[#5E30A5] text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  // Simulamos QR válidos (en una app real vendrían del backend)
  const qrsUsuario = data.qrValidos?.filter(qr => qr.userId === usuario.id) || [];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4 text-center relative">
      <h1 className="text-2xl font-bold text-[#5E30A5] mb-4">
        Mis QR Válidos
      </h1>

      {qrsUsuario.length === 0 ? (
        <p className="text-gray-600 mt-6">
          Aún no tienes códigos QR registrados.
        </p>
      ) : (
        <div className="w-full max-w-md bg-gray-50 border rounded-xl shadow p-4">
          {qrsUsuario.map((qr) => (
            <div
              key={qr.id}
              className="border-b last:border-none py-2 flex flex-col items-center"
            >
              <p className="font-semibold text-[#5E30A5]">
                {qr.promoTitulo}
              </p>
              <p className="text-sm text-gray-600">
                Escaneado: {qr.fecha}
              </p>
            </div>
          ))}
        </div>
      )}

      <Link
        to="/"
        className="mt-6 bg-[#FFC21C] text-[#5E30A5] px-5 py-2 rounded-lg font-semibold shadow hover:bg-yellow-400 transition"
      >
        ⬅ Volver al inicio
      </Link>

      {/* Versión ALPHA */}
      <div className="absolute bottom-3 right-3 text-xs text-gray-500 opacity-60">
        ALPHA v0.0.1
      </div>
    </div>
  );
}
