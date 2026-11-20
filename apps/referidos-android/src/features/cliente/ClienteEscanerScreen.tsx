import React from "react";
import ScannerGateway from "@features/scanner/ScannerGateway";
import { type ScannerFeedback } from "@features/scanner/ScannerFeedbackCard";
import useScannerHistory from "@features/scanner/useScannerHistory";
import { mobileApi, observability } from "@shared/services/mobileApi";

async function previewCode(code: string): Promise<ScannerFeedback> {
  const normalized = code.toLowerCase();
  const outcome = normalized.startsWith("qrv-") ? "valido" : normalized.startsWith("qrs-") ? "estatico" : "invalido";
  void observability.track({
    level: "info",
    category: "scanner",
    message: "cliente_scanner_processed",
    context: { code_length: code.length, outcome },
  }).catch(() => {});

  const session = await mobileApi.auth.runOnboardingCheck();
  if (!session?.ok) return { message: "No se pudo validar tu sesión para previsualizar el QR.", tone: "error" };
  if (outcome === "valido") {
    return {
      message: "Muestra este QR al negocio para verificar el canje de tu promoción.",
      tone: "info",
      result: { code, status: "Formato válido" },
    };
  }
  if (outcome === "estatico") {
    return {
      message: "Este es un QR base. Genera tu QR válido en el detalle de la promoción.",
      tone: "info",
      result: { code, status: "Estático" },
    };
  }
  return { message: "QR no reconocido. Debe iniciar con qrv- o qrs-.", tone: "error" };
}

export default function ClienteEscanerScreen() {
  const history = useScannerHistory();
  return <ScannerGateway onProcess={previewCode} history={history} />;
}
