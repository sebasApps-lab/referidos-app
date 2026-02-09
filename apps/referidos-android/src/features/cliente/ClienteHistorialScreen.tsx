import React from "react";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import FeaturePlaceholder from "@shared/ui/FeaturePlaceholder";

export default function ClienteHistorialScreen() {
  return (
    <ScreenScaffold title="Cliente Historial">
      <FeaturePlaceholder
        feature="Sprint 5"
        description="Historial de canjes, filtros y estado offline-ready por bloques."
      />
    </ScreenScaffold>
  );
}
