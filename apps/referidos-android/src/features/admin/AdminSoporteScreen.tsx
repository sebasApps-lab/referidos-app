import React from "react";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import FeaturePlaceholder from "@shared/ui/FeaturePlaceholder";

export default function AdminSoporteScreen() {
  return (
    <ScreenScaffold title="Admin Soporte">
      <FeaturePlaceholder
        feature="Sprint 10/11"
        description="Panel de asesores, autorizaciones, sesiones y ticket routing."
      />
    </ScreenScaffold>
  );
}
