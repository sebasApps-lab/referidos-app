export type ScannerRole = "cliente" | "negocio";

export type ScannerStatusType = "info" | "valido" | "canjeado" | "expirado";

export type ScannerParsedCode = {
  type: "valid" | "static";
  code: string;
};

export type ScannerCopy = {
  header: {
    manualTitle: string;
    negocioTitle: string;
  };
  permissionIntro: {
    title: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
  };
  processingHint: string;
  status: {
    cliente: {
      valid: string;
      static: string;
    };
    negocio: {
      invalid: string;
      expired: string;
      redeemed: string;
      success: string;
      generic: string;
    };
  };
  resultCard: {
    statusLabel: string;
    promoFallback: string;
    clienteLabel: string;
    negocioLabel: string;
    expiraLabel: string;
    canjeadoLabel: string;
  };
};
