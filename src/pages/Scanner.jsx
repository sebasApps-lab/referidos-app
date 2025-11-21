// src/pages/Scanner.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * Scanner QR (simulado) — ALPHA v0.0.1
 * - Simula escaneo de QR con animación tipo láser
 * - Permite “detectar” un QR de prueba
 * - En versiones futuras integrará cámara real
 */

export default function Scanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedCode, setScannedCode] = useState(null);

  useEffect(() => {
    let timer;
    if (isScanning) {
      timer = setTimeout(() => {
        setScannedCode("QR-12345-DEMO");
        setIsScanning(false);
      }, 3000); // Simula el tiempo de escaneo
    }
    return () => clearTimeout(timer);
  }, [isScanning]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#5E30A5] text-white relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-4 left-4 text-sm opacity-80">
        <Link to="/" className="underline">
          ← Volver
        </Link>
      </div>

      {/* Título */}
      <h1 className="text-2xl font-bold mb-6 text-[#FFC21C]">Escáner QR</h1>

      {/* Marco del escáner */}
      <div className="relative w-72 h-72 border-4 border-[#FFC21C] rounded-xl overflow-hidden flex items-center justify-center">
        {/* Capa de animación láser */}
        {isScanning && (
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="animate-scan absolute top-0 left-0 w-full h-1 bg-[#FFC21C]" />
          </div>
        )}

        {/* Mensaje o código */}
        {scannedCode ? (
          <div className="text-center">
            <p className="text-lg font-semibold text-[#FFC21C] mb-2">
              Código detectado:
            </p>
            <p className="bg-white text-[#5E30A5] px-3 py-1 rounded-lg font-mono">
              {scannedCode}
            </p>
          </div>
        ) : (
          <p className="text-gray-200 text-sm">
            {isScanning ? "Escaneando..." : "Coloca el código QR dentro del marco"}
          </p>
        )}
      </div>

      {/* Botón de acción */}
      <button
        onClick={() => {
          setScannedCode(null);
          setIsScanning(true);
        }}
        disabled={isScanning}
        className={`mt-8 px-6 py-2 rounded-lg font-semibold transition ${
          isScanning
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#FFC21C] text-[#5E30A5] hover:bg-yellow-400"
        }`}
      >
        {isScanning ? "Escaneando..." : "Simular escaneo"}
      </button>

      {/* Versión */}
      <div className="absolute bottom-4 text-xs text-gray-300 opacity-70">
        ALPHA v0.0.1
      </div>

      {/* Animación Tailwind personalizada */}
      <style>
        {`
          @keyframes scan {
            0% { top: 0; }
            100% { top: 100%; }
          }
          .animate-scan {
            animation: scan 2s linear infinite alternate;
          }
        `}
      </style>
    </div>
  );
}
