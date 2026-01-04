import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Camera, QrCode } from "lucide-react";
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
  const scannerPermissionPrompted = useAppStore(
    (s) => s.scannerPermissionPrompted
  );
  const setScannerPermissionPrompted = useAppStore(
    (s) => s.setScannerPermissionPrompted
  );
  const manualFallbackShown = useAppStore(
    (s) => s.scannerManualFallbackShown
  );
  const setManualFallbackShown = useAppStore(
    (s) => s.setScannerManualFallbackShown
  );
  const isNegocio = usuario?.role === "negocio";

  const [cameraAvailable, setCameraAvailable] = useState(null);
  const [scanSupported, setScanSupported] = useState(null);
  const [camGranted, setCamGranted] = useState(null);
  const [manualValue, setManualValue] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [statusType, setStatusType] = useState("info");
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [manualRequested, setManualRequested] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    setScanSupported("BarcodeDetector" in window);
  }, []);

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    setCameraAvailable(!!navigator.mediaDevices?.getUserMedia);
  }, []);

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    if (!navigator.permissions?.query) return;
    let active = true;
    navigator.permissions
      .query({ name: "camera" })
      .then((status) => {
        if (!active) return;
        if (status.state === "granted") {
          setCamGranted(true);
          if (!scannerPermissionPrompted) {
            setScannerPermissionPrompted(true);
          }
        } else if (status.state === "denied") {
          setCamGranted(false);
          if (!scannerPermissionPrompted) {
            setScannerPermissionPrompted(true);
          }
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [scannerPermissionPrompted, setScannerPermissionPrompted]);

  const isPwaAndroid = useMemo(() => {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return false;
    }
    const standalone =
      window.matchMedia?.("(display-mode: standalone)")?.matches ||
      window.navigator.standalone ||
      false;
    const isAndroid = /Android/i.test(navigator.userAgent);
    return Boolean(standalone && isAndroid);
  }, []);

  const requestCameraPermission = useCallback(() => {
    setScannerPermissionPrompted(true);
    if (typeof navigator === "undefined") return;
    if (isPwaAndroid) {
      window.location.href =
        "intent://settings#Intent;action=android.settings.APPLICATION_DETAILS_SETTINGS;end";
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraAvailable(false);
      setCamGranted(false);
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        stream.getTracks().forEach((track) => track.stop());
        setCamGranted(true);
      })
      .catch(() => {
        setCamGranted(false);
      });
  }, [isPwaAndroid, setScannerPermissionPrompted]);

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

  const canScan = scanSupported !== false && cameraAvailable !== false;
  const showCamera = canScan && camGranted === true;
  const showPermissionIntro =
    !scannerPermissionPrompted && camGranted !== true && cameraAvailable !== false;
  const showPermisos =
    scannerPermissionPrompted && (!canScan || camGranted !== true);
  const showManual = manualFallbackShown;
  const manualReady =
    manualValue.replace(/[^0-9a-zA-Z]/g, "").length === 6;
  const manualDisabled = processing || !manualReady;

  const handleManualOpen = useCallback(() => {
    if (manualRequested) return;
    setManualRequested(true);
    setManualFallbackShown(true);
  }, [manualRequested, setManualFallbackShown]);

  return (
    <div
      className={`flex min-h-full flex-col flex-1 w-full ${showPermissionIntro ? "" : "px-4 pt-4"}`}
      style={{
        paddingBottom: showPermissionIntro
          ? 0
          : "calc(10px + env(safe-area-inset-bottom))",
      }}
    >
      {!showPermissionIntro && (
        <div className="flex justify-between items-center mb-4">
          {showPermisos ? (
            <h1 className="text-base font-semibold text-[#2F1A55]">
              Ingresa el codigo manualmente
            </h1>
          ) : isNegocio ? (
            <h1 className="text-base font-semibold text-[#2F1A55]">
              Escaner de canje
            </h1>
          ) : (
            <div />
          )}
          {processing && (
            <span className="text-xs text-slate-400">Procesando...</span>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col">
        {showCamera && !showManual && (
          <div className="space-y-4">
            <EscanerCamera
              active={showCamera && !showManual}
              disabled={processing}
              onDetected={handleCode}
              onSupportChange={setScanSupported}
              onPermissionChange={setCamGranted}
              onFallback={() => {
                setCamGranted(false);
              }}
              onStatus={(msg) => {
                setStatusMsg(msg);
                setStatusType("info");
              }}
            />
          </div>
        )}

        {showPermissionIntro && (
          <div className="relative flex flex-1 items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#F7F2FF] via-white to-white" />
            <div className="absolute -top-20 -right-10 h-52 w-52 rounded-full bg-[#E9DFFF] opacity-70 blur-3xl" />
            <div className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-[#EFE7FF] opacity-80 blur-3xl" />
            <div className="relative z-10 w-full h-full max-w-md px-6 text-center">
              <div className="relative mx-auto h-36 w-36">
                <div className="absolute inset-0 rounded-[36px] bg-[#F3EEFF] shadow-[0_20px_50px_rgba(94,48,165,0.18)]" />
                <div className="absolute inset-0 flex items-center justify-center text-[#5E30A5]">
                  <Camera size={62} strokeWidth={1.6} />
                </div>
                <div className="absolute -bottom-3 -right-3 h-12 w-12 rounded-full border-2 border-white bg-[#5E30A5] text-white flex items-center justify-center shadow-sm">
                  <QrCode size={18} strokeWidth={2} />
                </div>
              </div>

              <h2 className="mt-8 text-2xl font-semibold text-[#2F1A55]">
                Activa la camara para escanear codigos
              </h2>
              <p className="mt-3 text-[15px] text-slate-500">
                Al permitir el acceso a la camara podras leer tus codigos en
                segundos.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={requestCameraPermission}
                  className="w-full rounded-2xl bg-[#5E30A5] px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4B2488]"
                >
                  Continuar
                </button>
                <button
                  type="button"
                  onClick={() => setScannerPermissionPrompted(true)}
                  className="w-full rounded-2xl border border-[#E9E2F7] px-4 py-3.5 text-sm font-semibold text-[#5E30A5] transition hover:bg-[#F5F3FF]"
                >
                  En otro momento
                </button>
              </div>
            </div>
          </div>
        )}

        {showPermisos && (
          <div className="relative flex-1">
            <div
              className={`absolute left-0 right-0 flex flex-col items-center ${
                showManual ? "top-6 translate-y-0" : "top-1/2 -translate-y-1/2"
              }`}
              style={{
                transition: "top 520ms ease, transform 520ms ease",
                willChange: "top, transform",
              }}
            >
              <div className="w-full max-w-lg transition-transform duration-500 ease-out">
                <EscanerPermisos
                  camSupported={canScan}
                  camGranted={camGranted}
                  onManual={handleManualOpen}
                  onRequestCamera={requestCameraPermission}
                  showButton={!showManual}
                  manualDisabled={manualRequested}
                />
              </div>
              <div
                className={`absolute left-0 right-0 top-full mt-4 flex justify-center ${
                  showManual ? "" : "pointer-events-none"
                }`}
                style={{
                  opacity: showManual ? 1 : 0,
                  transform: showManual ? "translateY(0)" : "translateY(-8px)",
                  transition: `opacity 260ms ease ${
                    showManual ? "160ms" : "0ms"
                  }, transform 260ms ease ${showManual ? "160ms" : "0ms"}`,
                }}
              >
                <div className="w-full max-w-lg">
                  <EscanerFallback
                    value={manualValue}
                    onChange={setManualValue}
                    onSubmit={() => handleCode(manualValue)}
                    disabled={manualDisabled}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {!showPermissionIntro && (
        <div className="mt-5 flex flex-col gap-3 w-full max-w-lg self-center">
          <ResultCard data={result} />
        </div>
      )}
    </div>
  );
}

