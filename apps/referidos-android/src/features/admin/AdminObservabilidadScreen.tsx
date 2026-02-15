import React from "react";
import ScreenScaffold from "@shared/ui/ScreenScaffold";
import ObservabilityEventFeed from "@shared/ui/ObservabilityEventFeed";

export default function AdminObservabilidadScreen() {
  return (
    <ScreenScaffold
      title="Admin Observabilidad"
      subtitle="Eventos reales de RN con filtros por nivel, dominio y correlacion."
    >
      <ObservabilityEventFeed
        title="Eventos recientes"
        subtitle="Incluye request_id, trace_id, session_id y contexto de ruta/pantalla."
        defaultDomain="all"
        allowedDomains={["observability", "support"]}
        limit={60}
        screenTag="admin_observabilidad"
      />
    </ScreenScaffold>
  );
}
