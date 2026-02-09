import React from "react";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import FeaturePlaceholder from "@shared/ui/FeaturePlaceholder";

export default function SoporteIrregularScreen() {
  return (
    <ScreenScaffold title="Soporte Ticket Irregular">
      <FeaturePlaceholder
        feature="Sprint 10"
        description="Creacion manual de ticket irregular y cola personal del asesor."
      />
    </ScreenScaffold>
  );
}
