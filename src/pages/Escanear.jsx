// src/pages/Escanear.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAppStore } from "../store/appStore";
import { handleError } from "../utils/errorUtils";
import { sanitizeText } from "../utils/sanitize";

const parseQrPayload = (raw) => {
  try {
    const parsed = JSON.parse(raw);
    if (!parsed.qrBase || !parsed.promoId || !parsed.clienteId) {
      throw new Error("QR incompleto");
    }
    return parsed;
  } catch {
    throw new Error("QR invalido");
  }
};

const CameraFrame = React.forwardRef(({ scanning, borderColor }, ref) => (
  <div
    className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden shadow-xl bg-black transition border-4"
    style={{ borderColor: borderColor || "#5E30A5" }}
  >
    <video
      ref={ref}
      className="w-full h-full object-cover"
      autoPlay
      playsInline
      muted
    />
    {scanning && (
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#FFC21C] animate-pulse" />
      </div>
    )}
  </div>
));

const PartyAvatars = ({ items }) => {
  if (!items.length) return null;
  return (
    <div className="flex items-center gap-2 absolute top-4 right-4">
      {items.map((c) => (
        <div
          key={c.clienteId}
          className="w-9 h-9 rounded-full bg-[#5E30A5] text-white flex items-center justify-center text-sm font-semibold shadow"
        >
          {sanitizeText(c.alias || c.clienteId).slice(0, 2).toUpperCase()}
        </div>
      ))}
    </div>
  );
};

const PartyTimer = ({ progress }) => (
  <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
    <div
      className="h-full bg-[#5E30A5] transition-all"
      style={{ width: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
    />
  </div>
);

const ResultCardCliente = ({ qrBase, promo }) => (
  <div className="mt-4 w-full max-w-md bg-white rounded-2xl shadow-lg border border-[#1DA1F2] p-4">
    <div className="text-sm text-gray-600 mb-2">QR listo para presentar al negocio:</div>
    <div className="border-2 border-[#1DA1F2] rounded-lg p-3 bg-[#E8F5FD] text-center font-mono text-sm break-all">
      {qrBase}
    </div>
    <div className="mt-3">
      <p className="text-[#5E30A5] font-semibold">{sanitizeText(promo?.titulo || "Promo")}</p>
      <p className="text-sm text-gray-700 mt-1">{sanitizeText(promo?.descripcion || "")}</p>
      <p className="text-sm text-gray-500 mt-1">
        Negocio: {sanitizeText(promo?.nombreLocal || "N/D")}
      </p>
    </div>
  </div>
);

export default function Escanear() {
  const usuario = useAppStore((s) => s.usuario);
  const isNegocio = usuario?.role === "negocio";

  const videoRef = useRef(null);
  const detectorRef = useRef(null);
  const rafRef = useRef(null);
  const [camSupported, setCamSupported] = useState(true);
  const [camGranted, setCamGranted] = useState(true);
  const [manualValue, setManualValue] = useState("");
  const [scannerError, setScannerError] = useState("");
  const [status, setStatus] = useState("");
  const [resultCliente, setResultCliente] = useState(null);
  const [party, setParty] = useState([]);
  const [partyProgress, setPartyProgress] = useState(1);
  const [feedback, setFeedback] = useState(null); // 'success' | 'error' | null
  const [manualFallbackVisible, setManualFallbackVisible] = useState(false);

  useEffect(() => {
    let stream;
    const start = async () => {
      try {
        const supportsBarcode = "BarcodeDetector" in window;
        setCamSupported(supportsBarcode);
        if (supportsBarcode) detectorRef.current = new window.BarcodeDetector({ formats: ["qr_code"] });
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        setCamGranted(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        if (supportsBarcode) scanLoop();
      } catch (err) {
        setCamGranted(false);
        const msg = handleError(err);
        if (import.meta.env.DEV) {
          console.warn("Camera access error:", msg);
        }
        setScannerError("");
        setManualFallbackVisible(true);
      }
    };
    start();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const scanLoop = async () => {
    try {
      if (detectorRef.current && videoRef.current?.readyState >= 2) {
        const codes = await detectorRef.current.detect(videoRef.current);
        if (codes.length) {
          handleScan(codes[0].rawValue);
        }
      }
    } catch (err) {
      setScannerError(handleError(err));
    } finally {
      rafRef.current = requestAnimationFrame(scanLoop);
    }
  };

  const handleScan = (raw) => {
    try {
      setScannerError("");
      const payload = parseQrPayload(raw);
      if (isNegocio) {
        handleScanNegocio(payload);
      } else {
        handleScanCliente(payload);
      }
      setFeedback("success");
      if (navigator.vibrate) navigator.vibrate(50);
    } catch (err) {
      setFeedback("error");
      if (navigator.vibrate) navigator.vibrate(80);
      setStatus(err.message);
    }
  };

  const handleScanCliente = (payload) => {
    setStatus("");
    setResultCliente({
      qrBase: `${payload.qrBase}:${usuario?.id}`,
      promo: {
        titulo: payload.promoTitulo || "Promo",
        descripcion: payload.promoDescripcion || "",
        nombreLocal: payload.negocioNombre || "",
      },
    });
  };

  const handleScanNegocio = (payload) => {
    setStatus("");
    const now = Date.now();
    setParty((prev) => {
      const exists = prev.find((p) => p.clienteId === payload.clienteId);
      if (exists) return prev;
      return [...prev, { ...payload, ts: now }];
    });
    setPartyProgress(1);
  };

  useEffect(() => {
    if (!isNegocio || party.length === 0) return;
    const WINDOW_MS = 30000;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, WINDOW_MS - elapsed);
      setPartyProgress(remaining / WINDOW_MS);
      if (remaining === 0) {
        setParty([]);
        setStatus("Ventana cerrada, vuelve a escanear clientes.");
      }
    }, 500);
    return () => clearInterval(timer);
  }, [isNegocio, party.length]);

  const manualSubmit = () => {
    if (!manualValue.trim()) return;
    handleScan(manualValue.trim());
  };

  const partyValid = useMemo(() => party.length >= 2, [party.length]);

  const showCamera = camSupported && camGranted;
  const showManual = !camSupported || !camGranted || manualFallbackVisible;
  const accessMessage = showManual
    ? !camGranted
      ? "Permite acceso a la camara para escaneo."
      : "Tu dispositivo no soporta escaneo de QR."
    : "";
  const inputHasValue = manualValue.trim().length > 0;
  const inputValid = inputHasValue;
  const inputBorder = feedback === "error" ? "#EF4444" : feedback === "success" ? "#10B981" : "#D1D5DB";
  const buttonDisabled = !inputValid;
  return (
    <div
      className="flex flex-col flex-1 w-full bg-white relative"
      style={{ minHeight: "100%", padding: "16px 16px 72px" }}
    >
      {accessMessage && (
        <div className="w-full max-w-sm bg-[#FFF8D8] border border-[#FFC21C] text-[#5E30A5] text-sm p-3 rounded-lg shadow text-center self-center">
          {accessMessage}
        </div>
      )}
      <div
        className="flex-1 w-full flex items-center justify-center"
        style={{ minHeight: "45vh", paddingTop: accessMessage ? 12 : 0 }}
      >
        {showCamera && !showManual && (
          <div className="relative w-full max-w-sm">
            <CameraFrame
              ref={videoRef}
              scanning={camGranted}
              borderColor={
                feedback === "error" ? "#EF4444" : feedback === "success" ? "#10B981" : "#5E30A5"
              }
            />
            {isNegocio && party.length > 0 && <PartyAvatars items={party} />}
          </div>
        )}

        {showManual && (
          <div className="flex flex-col items-center justify-center w-full max-w-sm gap-3">
            <input
              className="w-11/12 md:w-4/5 px-4 py-3.5 rounded-2xl border text-base bg-white"
              style={{ borderColor: inputBorder, maxWidth: 320 }}
              placeholder="Pega aqui el contenido del QR"
              value={manualValue}
              onChange={(e) => setManualValue(e.target.value)}
            />
            <button
              onClick={manualSubmit}
              disabled={buttonDisabled}
              className={`w-10/12 md:w-3/5 px-4 py-2.5 rounded-2xl font-semibold shadow ${
                buttonDisabled ? "bg-[#CBB3F0] text-white cursor-not-allowed" : "bg-[#5E30A5] text-white"
              }`}
              style={{ maxWidth: 320 }}
            >
              Escanear
            </button>
          </div>
        )}
      </div>

      {scannerError && (
        <p className="text-red-500 text-sm text-center">{scannerError}</p>
      )}
      {status && !scannerError && (
        <p className="text-gray-700 text-sm text-center">{status}</p>
      )}

      {!isNegocio && resultCliente && (
        <ResultCardCliente qrBase={resultCliente.qrBase} promo={resultCliente.promo} />
      )}

      {isNegocio && party.length > 0 && (
        <div className="w-full max-w-md bg-gray-50 border rounded-2xl shadow p-4">
          <div className="flex items-center gap-2 mb-3">
            <p className="text-sm text-gray-700 font-semibold">Grupo:</p>
            {party.map((c) => (
              <div
                key={c.clienteId}
                className="w-8 h-8 rounded-full bg-[#5E30A5] text-white flex items-center justify-center text-xs font-semibold shadow"
              >
                {sanitizeText(c.clienteId).slice(0, 2).toUpperCase()}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mb-3">
            <PartyTimer progress={partyProgress} />
          </div>
          <div className="text-sm text-gray-600">
            {partyValid
              ? "Escanea siguiente cliente o termina el grupo."
              : "Necesitas 2 o mas clientes validos en la misma promo."}
          </div>
          <div className="mt-3">
            <button
              onClick={() => {
                setParty([]);
                setStatus("Grupo cerrado, puedes iniciar otro.");
                setPartyProgress(1);
              }}
              className="bg-[#5E30A5] text-white px-4 py-2 rounded-lg font-semibold shadow"
            >
              Terminar escaneo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
