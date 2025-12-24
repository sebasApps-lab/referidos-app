import React, { useState } from "react";
import { useAppStore } from "../../store/appStore";
import { redeemValidQr } from "../../services/qrService";
import { handleError } from "../../utils/errorUtils";
import { sanitizeText } from "../../utils/sanitize";
import EscanerCamera from "./EscanerCamera";
import EscanerPermisos from "./EscanerPermisos";
import EscanerFallback from "./EscanerFallback";

const parseCode = (raw) => {
  if (!raw) throw new Error("QR vacio");
  const value = raw.trim();
  if (value.startsWith("qrv-")) return { type: "valid", code: value };
  if (value.startsWith("qrs-")) return { type: "static", code: value };
  throw new Error("QR no reconocido");
};

const StatusBanner = ({ status, message }) => {
  if (!status && !message) return null;
  const map = {
    valido: { color: "#10B981", text: "Valido" },
    canjeado: { color: "#1DA1F2", text: "Canjeado" },
    expirado: { color: "#EF4444", text: "Expirado" },
    info: { color: "#5E30A5", text: "Info" },
  };
  const cfg = map[status] || map.info;

  return (
    <div
      className="w-full rounded-2xl px-4 py-3 text-xs font-semibold border shadow-sm"
      style={{
        background: `${cfg.color}12`,
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
    <div className="w-full rounded-2xl border border-[#E9E2F7] bg-white shadow-sm p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">Estado</p>
        <span
          className="px-3 py-1 rounded-full text-[10px] font-semibold"
          style={{
            background:
              data.status === "valido"
                ? "#10B98122"
                : data.status === "canjeado"
                ? "#1DA1F222"
                : "#EF444422",
            color:
              data.status === "valido"
                ? "#10B981"
                : data.status === "canjeado"
                ? "#1DA1F2"
                : "#EF4444",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          {data.status}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-[#2F1A55]">
          {sanitizeText(data.promoTitulo || "Promo")}
        </p>
        <p className="text-xs text-slate-500">
          Cliente: {sanitizeText(data.clienteNombre || data.clienteId || "N/D")}
        </p>
        <p className="text-xs text-slate-500">
          Negocio: {sanitizeText(data.negocioNombre || "N/D")}
        </p>
        {data.status === "valido" && data.expiresAt && (
          <p className="text-[11px] text-slate-400">
            Expira: {new Date(data.expiresAt).toLocaleTimeString()}
          </p>
        )}
        {data.status === "canjeado" && data.redeemedAt && (
          <p className="text-[11px] text-slate-400">
            Canjeado: {new Date(data.redeemedAt).toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default function EscanerView() {
  const usuario = useAppStore((s) => s.usuario);
  const isNegocio = usuario?.role === "negocio";

  const [camSupported, setCamSupported] = useState(true);
  const [camGranted, setCamGranted] = useState(true);
  const [manualValue, setManualValue] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [statusType, setStatusType] = useState("info");
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [manualFallbackVisible, setManualFallbackVisible] = useState(false);

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
          setStatusMsg("Este es un QR base. Genera tu QR valido en el detalle.");
        }
        setStatusType("info");
        return;
      }

      if (parsed.type !== "valid") {
        setStatusMsg("Este QR no es canjeable. Solicita un QR valido.");
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
        setStatusMsg("QR valido. Canje registrado correctamente.");
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
    <div className="flex flex-col flex-1 w-full px-4 pb-12 pt-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-base font-semibold text-[#2F1A55]">
          {isNegocio ? "Escaner de canje" : "Escanea tu QR"}
        </h1>
        {processing && (
          <span className="text-xs text-slate-400">Procesando...</span>
        )}
      </div>

      <div className="space-y-4">
        {showCamera && !showManual && (
          <EscanerCamera
            active={showCamera && !showManual}
            disabled={processing}
            onDetected={handleCode}
            onSupportChange={setCamSupported}
            onPermissionChange={setCamGranted}
            onFallback={() => setManualFallbackVisible(true)}
            onStatus={(msg) => {
              setStatusMsg(msg);
              setStatusType("info");
            }}
          />
        )}

        <EscanerPermisos
          camSupported={camSupported}
          camGranted={camGranted}
          onManual={() => setManualFallbackVisible(true)}
        />

        {showManual && (
          <EscanerFallback
            value={manualValue}
            onChange={setManualValue}
            onSubmit={() => handleCode(manualValue)}
            disabled={manualDisabled}
          />
        )}
      </div>

      <div className="mt-5 flex flex-col gap-3 w-full max-w-lg self-center">
        <StatusBanner status={statusType} message={statusMsg} />
        <ResultCard data={result} />
      </div>
    </div>
  );
}
