import React from "react";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import FeaturePlaceholder from "@shared/ui/FeaturePlaceholder";

export default function ClienteEscanerScreen() {
  return (
    <ScreenScaffold title="Cliente Escaner">
      <FeaturePlaceholder
        feature="Sprint 8"
        description="Scanner nativo Android y flujo QR equivalente al web scanner actual."
      />
    </ScreenScaffold>
  );
}
