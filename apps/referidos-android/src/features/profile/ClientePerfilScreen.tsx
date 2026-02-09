import React from "react";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import FeaturePlaceholder from "@shared/ui/FeaturePlaceholder";

export default function ClientePerfilScreen() {
  return (
    <ScreenScaffold title="Cliente Perfil">
      <FeaturePlaceholder
        feature="Sprint 5/9/10"
        description="Perfil, acceso local (PIN/biometria), ayuda, tickets y soporte para cliente."
      />
    </ScreenScaffold>
  );
}
