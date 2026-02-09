import React from "react";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import FeaturePlaceholder from "@shared/ui/FeaturePlaceholder";

export default function NegocioInicioScreen() {
  return (
    <ScreenScaffold title="Negocio Inicio">
      <FeaturePlaceholder
        feature="Sprint 6"
        description="Dashboard de negocio, estado de cuenta y accesos directos."
      />
    </ScreenScaffold>
  );
}
