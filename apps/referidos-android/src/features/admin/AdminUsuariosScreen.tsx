import React from "react";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import FeaturePlaceholder from "@shared/ui/FeaturePlaceholder";

export default function AdminUsuariosScreen() {
  return (
    <ScreenScaffold title="Admin Usuarios">
      <FeaturePlaceholder
        feature="Sprint 11"
        description="Gestion de usuarios y acciones sensibles via edge functions admin."
      />
    </ScreenScaffold>
  );
}
