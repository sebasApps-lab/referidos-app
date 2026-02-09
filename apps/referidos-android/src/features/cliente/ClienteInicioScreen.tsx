import React from "react";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import FeaturePlaceholder from "@shared/ui/FeaturePlaceholder";

export default function ClienteInicioScreen() {
  return (
    <ScreenScaffold title="Cliente Inicio">
      <FeaturePlaceholder
        feature="Sprint 5"
        description="Feed, promos, search mode, cache outlet equivalente, skeletons por bloque."
      />
    </ScreenScaffold>
  );
}
