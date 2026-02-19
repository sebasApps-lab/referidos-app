import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppStore } from "../../store/appStore";
import { redeemValidQr } from "../../services/qrService";
import { logCatalogBreadcrumb } from "../../services/loggingClient";
import { handleError } from "../../utils/errorUtils";
import { scannerCopy } from "../constants/scannerCopy";
import type {
  ScannerCopy,
  ScannerParsedCode,
  ScannerRole,
  ScannerStatusType,
} from "../constants/scannerTypes";

const parseCode = (raw: string): ScannerParsedCode => {
  if (!raw) throw new Error("QR vacio");
  const value = raw.trim();
  if (value.startsWith("qrv-")) return { type: "valid", code: value };
  if (value.startsWith("qrs-")) return { type: "static", code: value };
  throw new Error("QR no reconocido");
};

type ScannerStateOptions = {
  role: ScannerRole;
  copy?: ScannerCopy;
};

export function useScannerState({ role, copy = scannerCopy }: ScannerStateOptions) {
  const scannerPermissionPrompted = useAppStore(
    (s) => s.scannerPermissionPrompted
  );
  const setScannerPermissionPrompted = useAppStore(
    (s) => s.setScannerPermissionPrompted
  );
  const manualFallbackShown = useAppStore((s) => s.scannerManualFallbackShown);
  const setManualFallbackShown = useAppStore(
    (s) => s.setScannerManualFallbackShown
  );

  const [cameraAvailable, setCameraAvailable] = useState<boolean | null>(null);
  const [scanSupported, setScanSupported] = useState<boolean | null>(null);
  const [camGranted, setCamGranted] = useState<boolean | null>(null);
  const [manualValue, setManualValue] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [statusType, setStatusType] = useState<ScannerStatusType>("info");
  const [result, setResult] = useState<any>(null);
  const [processing, setProcessing] = useState(false);
  const [manualRequested, setManualRequested] = useState(false);
  const isNegocio = role === "negocio";

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
      .query({ name: "camera" as any })
      .then((status) => {
        if (!active) return;
        if (status.state === "granted") {
          logCatalogBreadcrumb("scanner.permission.granted", {
            source: "permissions_api",
            role,
          });
          setCamGranted(true);
          if (!scannerPermissionPrompted) {
            setScannerPermissionPrompted(true);
          }
        } else if (status.state === "denied") {
          logCatalogBreadcrumb("scanner.permission.denied", {
            source: "permissions_api",
            role,
          });
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
      (window.navigator as any).standalone ||
      false;
    const isAndroid = /Android/i.test(navigator.userAgent);
    return Boolean(standalone && isAndroid);
  }, []);

  const requestCameraPermission = useCallback(() => {
    logCatalogBreadcrumb("scanner.permission.request", { role });
    setScannerPermissionPrompted(true);
    if (typeof navigator === "undefined") return;
    if (isPwaAndroid) {
      logCatalogBreadcrumb("scanner.permission.settings_redirect", {
        role,
        source: "pwa_android",
      });
      window.location.href =
        "intent://settings#Intent;action=android.settings.APPLICATION_DETAILS_SETTINGS;end";
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      logCatalogBreadcrumb("scanner.permission.denied", {
        role,
        source: "media_devices_unavailable",
      });
      setCameraAvailable(false);
      setCamGranted(false);
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        stream.getTracks().forEach((track) => track.stop());
        logCatalogBreadcrumb("scanner.permission.granted", {
          role,
          source: "get_user_media",
        });
        setCamGranted(true);
      })
      .catch(() => {
        logCatalogBreadcrumb("scanner.permission.denied", {
          role,
          source: "get_user_media",
        });
        setCamGranted(false);
      });
  }, [isPwaAndroid, role, setScannerPermissionPrompted]);

  const skipPermissionIntro = useCallback(() => {
    logCatalogBreadcrumb("scanner.permission.skip_intro", { role });
    setScannerPermissionPrompted(true);
  }, [role, setScannerPermissionPrompted]);

  const handleStatusInfo = useCallback((msg: string) => {
    setStatusMsg(msg);
    setStatusType("info");
  }, []);

  const handleCode = useCallback(
    async (raw: string) => {
      if (!raw || processing) return;
      logCatalogBreadcrumb("scanner.start", {
        role,
        source: manualRequested ? "manual" : "camera",
        input_length: raw.length,
      });
      setProcessing(true);
      setStatusMsg("");
      setResult(null);
      try {
        const parsed = parseCode(raw);
        if (!isNegocio) {
          if (parsed.type === "valid") {
            setStatusMsg(copy.status.cliente.valid);
          } else {
            setStatusMsg(copy.status.cliente.static);
          }
          setStatusType("info");
          logCatalogBreadcrumb("scanner.ok", {
            role,
            mode: "cliente",
            parsed_type: parsed.type,
          });
          return;
        }

        if (parsed.type !== "valid") {
          setStatusMsg(copy.status.negocio.invalid);
          setStatusType("info");
          logCatalogBreadcrumb("scanner.invalid", {
            role,
            reason: "qr_not_valid_type",
            parsed_type: parsed.type,
          });
          return;
        }

        const { ok, data, error } = await redeemValidQr(parsed.code);
        if (!ok) {
          if (error?.includes("expired") || error?.includes("expir")) {
            setStatusMsg(copy.status.negocio.expired);
            setStatusType("expirado");
          } else if (error?.includes("canjeado") || error?.includes("redeemed")) {
            setStatusMsg(copy.status.negocio.redeemed);
            setStatusType("canjeado");
          } else {
            setStatusMsg(error || copy.status.negocio.generic);
            setStatusType("info");
          }
          logCatalogBreadcrumb("scanner.error", {
            role,
            reason: "redeem_failed",
            error: error || "unknown_redeem_error",
          });
          return;
        }

        setResult({
          ...data,
          expiresAt: data.expiresAt,
          redeemedAt: data.redeemedAt,
        });

        if (data.status === "valido") {
          setStatusMsg(copy.status.negocio.success);
          setStatusType("valido");
        } else if (data.status === "canjeado") {
          setStatusMsg(copy.status.negocio.redeemed);
          setStatusType("canjeado");
        } else {
          setStatusMsg(copy.status.negocio.expired);
          setStatusType("expirado");
        }
        logCatalogBreadcrumb("scanner.ok", {
          role,
          mode: "negocio",
          status: data.status || "unknown",
          promo_id: data?.promoId || null,
        });
      } catch (err) {
        const message = handleError(err);
        setStatusMsg(message);
        setStatusType("info");
        const reason = String((err as Error)?.message || message || "").toLowerCase();
        if (reason.includes("qr no reconocido") || reason.includes("qr vacio")) {
          logCatalogBreadcrumb("scanner.invalid", {
            role,
            reason: (err as Error)?.message || message,
          });
        } else {
          logCatalogBreadcrumb("scanner.error", {
            role,
            reason: (err as Error)?.message || message,
          });
        }
      } finally {
        setProcessing(false);
      }
    },
    [copy, isNegocio, manualRequested, processing, role]
  );

  const canScan = scanSupported !== false && cameraAvailable !== false;
  const showCamera = canScan && camGranted === true;
  const showPermissionIntro =
    !scannerPermissionPrompted && camGranted !== true && cameraAvailable !== false;
  const showPermisos =
    scannerPermissionPrompted && (!canScan || camGranted !== true);
  const showManual = manualFallbackShown;
  const manualReady = manualValue.replace(/[^0-9a-zA-Z]/g, "").length === 6;
  const manualDisabled = processing || !manualReady;

  const handleManualOpen = useCallback(() => {
    if (manualRequested) return;
    setManualRequested(true);
    setManualFallbackShown(true);
    logCatalogBreadcrumb("scanner.manual.open", { role });
  }, [manualRequested, role, setManualFallbackShown]);

  return {
    cameraAvailable,
    scanSupported,
    camGranted,
    setScanSupported,
    setCamGranted,
    manualValue,
    setManualValue,
    statusMsg,
    statusType,
    setStatusMsg,
    setStatusType,
    result,
    processing,
    manualRequested,
    canScan,
    showCamera,
    showPermissionIntro,
    showPermisos,
    showManual,
    manualReady,
    manualDisabled,
    requestCameraPermission,
    skipPermissionIntro,
    handleManualOpen,
    handleCode,
    handleStatusInfo,
  };
}
