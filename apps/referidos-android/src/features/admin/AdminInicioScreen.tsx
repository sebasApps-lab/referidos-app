import React from "react";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import FeaturePlaceholder from "@shared/ui/FeaturePlaceholder";

export default function AdminInicioScreen() {
  return (
    <ScreenScaffold title="Admin Inicio">
      <FeaturePlaceholder
        feature="Sprint 11"
        description="KPIs, estado operativo y acceso rapido a modulos admin."
      />
    </ScreenScaffold>
  );
}
