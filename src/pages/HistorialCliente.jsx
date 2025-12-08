// src/pages/HistorialCliente.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAppStore } from "../store/appStore";
import { sanitizeText } from "../utils/sanitize";

export default function HistorialCliente() {
  const usuario = useAppStore((s) => s.usuario);
  const qrsUsuario = useAppStore((s) => s.qrEscaneados);

  if (!usuario) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-4">
        <p className="text-lg text-gray-700">
          Debes iniciar sesión para ver tu historial.
        </p>

        <Link
          to="/cliente/inicio"
          className="mt-4 bg-[#5E30A5] text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4 pb-24 relative">

      <h1 className="text-2xl font-bold text-[#5E30A5] mb-6">
        Historial
      </h1>

      {/* Si no hay historial */}
      {qrsUsuario.length === 0 ? (
        <p className="text-gray-600 mt-6">
          Aún no tienes códigos QR escaneados.
        </p>
      ) : (
        <div className="w-full max-w-md bg-gray-50 border rounded-2xl shadow-lg p-4">
          {qrsUsuario.map((qr) => (
            <div
              key={qr.id}
              className="border-b last:border-none py-3 flex flex-col items-start"
            >
              <p className="font-semibold text-[#5E30A5] text-left">
                {sanitizeText(qr.promoTitulo)}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                {sanitizeText(qr.fecha)}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                ID: {sanitizeText(qr.id)}
              </p>
            </div>
          ))}
        </div>
      )}

      <Link
        to="/cliente/inicio"
        className="mt-6 bg-[#FFC21C] text-[#5E30A5] px-5 py-2 rounded-lg font-semibold shadow hover:bg-yellow-400 transition"
      >
        ⬅ Volver al inicio
      </Link>

      <div className="absolute bottom-3 right-3 text-xs text-gray-500 opacity-60">
        ALPHA v0.0.1
      </div>
    </div>
  );
}
