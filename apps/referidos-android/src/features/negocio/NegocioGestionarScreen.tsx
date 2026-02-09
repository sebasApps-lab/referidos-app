import React from "react";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import FeaturePlaceholder from "@shared/ui/FeaturePlaceholder";

export default function NegocioGestionarScreen() {
  return (
    <ScreenScaffold title="Negocio Gestionar">
      <FeaturePlaceholder
        feature="Sprint 6"
        description="Promos, sucursales, estados, configuraciones y soporte negocio."
      />
    </ScreenScaffold>
  );
}
