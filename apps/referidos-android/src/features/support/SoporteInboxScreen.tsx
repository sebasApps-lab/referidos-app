import React from "react";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import FeaturePlaceholder from "@shared/ui/FeaturePlaceholder";

export default function SoporteInboxScreen() {
  return (
    <ScreenScaffold title="Soporte Inbox">
      <FeaturePlaceholder
        feature="Sprint 10"
        description="Inbox de tickets, filtros por estado y asignacion con reglas de jornada."
      />
    </ScreenScaffold>
  );
}
