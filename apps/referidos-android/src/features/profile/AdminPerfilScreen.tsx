import React from "react";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import FeaturePlaceholder from "@shared/ui/FeaturePlaceholder";

export default function AdminPerfilScreen() {
  return (
    <ScreenScaffold title="Admin Perfil">
      <FeaturePlaceholder
        feature="Sprint 11"
        description="Preferencias admin, seguridad local y estado de sesion."
      />
    </ScreenScaffold>
  );
}
