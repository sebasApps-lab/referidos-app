import React from "react";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import FeaturePlaceholder from "@shared/ui/FeaturePlaceholder";

export default function AdminObservabilidadScreen() {
  return (
    <ScreenScaffold title="Admin Observabilidad">
      <FeaturePlaceholder
        feature="Sprint 11"
        description="Consulta de logs y errores con filtros por categoria, nivel y request_id."
      />
    </ScreenScaffold>
  );
}
