import React from "react";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import FeaturePlaceholder from "@shared/ui/FeaturePlaceholder";

export default function NegocioEscanerScreen() {
  return (
    <ScreenScaffold title="Negocio Escaner">
      <FeaturePlaceholder
        feature="Sprint 8"
        description="Escaner para redenciones y validaciones de codigos QR."
      />
    </ScreenScaffold>
  );
}
