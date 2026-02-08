import type { ScannerCopy } from "./scannerTypes";

export const scannerCopy: ScannerCopy = {
  header: {
    manualTitle: "Ingresa el codigo manualmente",
    negocioTitle: "Escaner de canje",
  },
  permissionIntro: {
    title: "Activa la camara para escanear codigos",
    description:
      "Al permitir acceso a la camara podras leer los codigos en segundos.",
    primaryAction: "Continuar",
    secondaryAction: "En otro momento",
  },
  processingHint: "Procesando...",
  status: {
    cliente: {
      valid: "Muestra este QR al negocio para canjear tu promo.",
      static: "Este es un QR base. Genera tu QR valido en el detalle.",
    },
    negocio: {
      invalid: "Este QR no es canjeable. Solicita un QR valido.",
      expired: "Este QR ha expirado.",
      redeemed: "Este QR ya fue canjeado.",
      success: "QR valido. Canje registrado correctamente.",
      generic: "No se pudo canjear.",
    },
  },
  resultCard: {
    statusLabel: "Estado",
    promoFallback: "Promo",
    clienteLabel: "Cliente",
    negocioLabel: "Negocio",
    expiraLabel: "Expira",
    canjeadoLabel: "Canjeado",
  },
};
