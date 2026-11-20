import React, { useCallback } from "react";
import ScannerGateway from "@features/scanner/ScannerGateway";
import { type ScannerFeedback } from "@features/scanner/ScannerFeedbackCard";
import useScannerHistory from "@features/scanner/useScannerHistory";
import { formatDateTime, readFirst, redeemValidQrCode } from "@shared/services/entityQueries";
import { observability, supabase } from "@shared/services/mobileApi";

function redeemFailure(message: string, code: string): ScannerFeedback {
  const normalized = message.toLowerCase();
  if (normalized.includes("canjeado") || normalized.includes("redeemed")) {
    return { message: "Este QR ya fue canjeado.", tone: "redeemed", result: { code, status: "Canjeado" } };
  }
  if (normalized.includes("expir") || normalized.includes("venc")) {
    return { message: "Este QR ha expirado.", tone: "error", result: { code, status: "Expirado" } };
  }
  return { message: "No se pudo canjear este QR. Verifica el código e inténtalo de nuevo.", tone: "error" };
}

export default function NegocioEscanerScreen() {
  const history = useScannerHistory(true);
  const refresh = history.onRefresh;

  const processCode = useCallback(async (code: string): Promise<ScannerFeedback> => {
    const normalized = code.toLowerCase();
    if (normalized.startsWith("qrs-")) {
      return {
        message: "Este QR no es canjeable. Solicita un QR válido.",
        tone: "info",
        result: { code, status: "Estático" },
      };
    }
    if (!normalized.startsWith("qrv-")) return { message: "QR no reconocido. Debe iniciar con qrv- o qrs-.", tone: "error" };

    void observability.track({
      level: "info",
      category: "scanner",
      message: "negocio_scanner_redeem_attempt",
      context: { code_length: code.length },
    }).catch(() => {});

    const redeem = await redeemValidQrCode(supabase, code);
    if (!redeem.ok) return redeemFailure(redeem.error || "", code);
    const row = Array.isArray(redeem.data) ? redeem.data[0] : redeem.data;
    if (!row) return redeemFailure("", code);
    const status = String(readFirst(row, ["status", "estado"], "")).toLowerCase();
    if (["expirado", "expired", "vencido", "invalido", "invalid"].includes(status)) return redeemFailure(status, code);

    const redeemedAt = readFirst(row, ["redeemed_at", "redeemedAt"], null);
    const alreadyRedeemed = status === "canjeado" || status === "redeemed";
    void refresh();
    return {
      message: alreadyRedeemed ? "Este QR ya está canjeado." : "QR válido. Canje registrado correctamente.",
      tone: alreadyRedeemed ? "redeemed" : "success",
      result: {
        code,
        status: "Canjeado",
        promotion: readFirst(row, ["promo_titulo", "promoTitulo"], ""),
        client: readFirst(row, ["cliente_nombre", "clienteNombre"], ""),
        business: readFirst(row, ["negocio_nombre", "negocioNombre"], ""),
        time: redeemedAt ? { label: "Canjeado", value: formatDateTime(redeemedAt) } : undefined,
      },
    };
  }, [refresh]);

  return <ScannerGateway isBusiness onProcess={processCode} history={history} />;
}
