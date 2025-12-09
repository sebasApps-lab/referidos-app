import React, { useEffect, useRef, useState } from "react";
import { useAppStore } from "../store/appStore";
import { redeemValidQr } from "../services/qrService";
import { handleError } from "../utils/errorUtils";
import { sanitizeText } from "../utils/sanitize";

const parseCode = (raw) => {
  if (!raw) throw new Error("QR vacío");
  const value = raw.trim();
  if (value.startsWith("qrv-")) return { type: "valid", code: value };
  if (value.startsWith("qrs-")) return { type: "static", code: value };
  throw new Error("QR no reconocido");
};

const StatusBanner = ({ status, message }) => {
  if (!status && !message) return null;
  const map = {
    valido: { color: "#10B981", text: "Válido" },
    canjeado: { color: "#1DA1F2", text: "Canjeado" },
    expirado: { color: "#EF4444", text: "Expirado" },
    info: { color: "#5E30A5", text: "Info" },
  };
  const cfg = map[status] || map.info;
  return (
    <div
      className="w-full rounded-xl px-4 py-3 text-sm font-semibold shadow border"
      style={{
        background: `${cfg.color}15`,
        color: cfg.color,
        borderColor: `${cfg.color}55`,
      }}
    >
      {cfg.text}: {message}
    </div>
  );
};

const ResultCard = ({ data }) => {
  if (!data) return null;
  return (
    <div className="w-full bg-white border border-gray-100 rounded-2xl shadow p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Estado</p>
        <span
          className="px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            background: data.status === "valido" ? "#10B98122" : data.status === "canjeado" ? "#1DA1F222" : "#EF444422",
            color: data.status === "valido" ? "#10B981" : data.status === "canjeado" ? "#1DA1F2" : "#EF4444",
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          {data.status}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-base font-semibold text-[#5E30A5]">
          {sanitizeText(data.promoTitulo || "Promo")}
        </p>
        <p className="text-sm text-gray-600">
          Cliente: {sanitizeText(data.clienteNombre || data.clienteId || "N/D")}
        </p>
        <p className="text-sm text-gray-600">
          Negocio: {sanitizeText(data.negocioNombre || "N/D")}
        </p>
        {data.status === "valido" && data.expiresAt && (
          <p className="text-xs text-gray-500">
            Expira: {new Date(data.expiresAt).toLocaleTimeString()}
          </p>
        )}
        {data.status === "canjeado" && data.redeemedAt && (
          <p className="text-xs text-gray-500">
            Canjeado: {new Date(data.redeemedAt).toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default function Escanear() {
  const usuario = useAppStore((s) => s.usuario);
  const isNegocio = usuario?.role === "negocio";

  const videoRef = useRef(null);
  const detectorRef = useRef(null);
  const rafRef = useRef(null);

  const [camSupported, setCamSupported] = useState(true);
  const [camGranted, setCamGranted] = useState(true);
  const [manualValue, setManualValue] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [statusType, setStatusType] = useState("info");
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
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
        setManualFallbackVisible(true);
        setStatusMsg("Activa la cámara o pega el código manualmente.");
      }
    };
    start();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const scanLoop = async () => {
    try {
      if (detectorRef.current && videoRef.current?.readyState >= 2) {
        const codes = await detectorRef.current.detect(videoRef.current);
        if (codes.length) {
          handleCode(codes[0].rawValue);
        }
      }
    } catch (err) {
      setStatusMsg(handleError(err));
      setStatusType("info");
    } finally {
      rafRef.current = requestAnimationFrame(scanLoop);
    }
  };

  const handleCode = async (raw) => {
    if (!raw || processing) return;
    setProcessing(true);
    setStatusMsg("");
    setResult(null);
    try {
      const parsed = parseCode(raw);
      if (!isNegocio) {
        if (parsed.type === "valid") {
          setStatusMsg("Muestra este QR al negocio para canjear tu promo.");
        } else {
          setStatusMsg("Este es un QR base. Genera tu QR válido en el detalle de la promo.");
        }
        setStatusType("info");
        return;
      }

      if (parsed.type !== "valid") {
        setStatusMsg("Este QR no es canjeable. Solicita un QR válido al cliente.");
        setStatusType("info");
        return;
      }

      const { ok, data, error } = await redeemValidQr(parsed.code);
      if (!ok) {
        if (error?.includes("expired") || error?.includes("expir")) {
          setStatusMsg("Este QR ha expirado.");
          setStatusType("expirado");
        } else if (error?.includes("canjeado") || error?.includes("redeemed")) {
          setStatusMsg("Este QR ya fue canjeado.");
          setStatusType("canjeado");
        } else {
          setStatusMsg(error || "No se pudo canjear.");
          setStatusType("info");
        }
        return;
      }

      setResult({
        ...data,
        expiresAt: data.expiresAt,
        redeemedAt: data.redeemedAt,
      });

      if (data.status === "valido") {
        setStatusMsg("QR válido. Canje registrado correctamente.");
        setStatusType("valido");
      } else if (data.status === "canjeado") {
        setStatusMsg("Este QR ya fue canjeado.");
        setStatusType("canjeado");
      } else {
        setStatusMsg("Este QR ha expirado.");
        setStatusType("expirado");
      }
    } catch (err) {
      setStatusMsg(handleError(err));
      setStatusType("info");
    } finally {
      setProcessing(false);
    }
  };

  const showCamera = camSupported && camGranted;
  const showManual = !camSupported || !camGranted || manualFallbackVisible;
  const manualDisabled = processing || !manualValue.trim();

  return (
    <div
      className="flex flex-col flex-1 w-full bg-white relative"
      style={{ minHeight: "100%", padding: "16px 16px 72px" }}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold text-[#5E30A5]">
          {isNegocio ? "Escáner de canje" : "Escanea tu QR"}
        </h1>
        {processing && <span className="text-xs text-gray-500">Procesando...</span>}
      </div>

      {showCamera && !showManual && (
        <div className="relative w-full max-w-sm self-center mb-4">
          <div
            className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden shadow-xl bg-black transition border-4"
            style={{ borderColor: "#5E30A5" }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#FFC21C] animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {showManual && (
        <div className="flex flex-col items-center justify-center w-full max-w-sm gap-3 self-center">
          <input
            className="w-11/12 md:w-4/5 px-4 py-3.5 rounded-2xl border text-base bg-white"
            style={{ borderColor: "#D1D5DB", maxWidth: 360 }}
            placeholder="Pega aquí el contenido del QR"
            value={manualValue}
            onChange={(e) => setManualValue(e.target.value)}
          />
          <button
            onClick={() => handleCode(manualValue)}
            disabled={manualDisabled}
            className={`w-10/12 md:w-3/5 px-4 py-2.5 rounded-2xl font-semibold shadow ${
              manualDisabled ? "bg-[#CBB3F0] text-white cursor-not-allowed" : "bg-[#5E30A5] text-white"
            }`}
            style={{ maxWidth: 320 }}
          >
            Escanear
          </button>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-3 w-full max-w-lg self-center">
        <StatusBanner status={statusType} message={statusMsg} />
        <ResultCard data={result} />
      </div>
    </div>
  );
}
