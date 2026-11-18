# PWA principal · Componentes reutilizables · 4 de 4

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/components/ui/Table.jsx`](../../../apps/referidos-app/src/components/ui/Table.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/components/ui/Table.jsx`](../../../apps/referidos-app/src/components/ui/Table.jsx#L1)

Compone estructura de tabla reusable para listados que le entregan filas o columnas.

**Superficie que exporta.** [`Table`](../../../apps/referidos-app/src/components/ui/Table.jsx#L10).

**Módulos que lo cargan.** [`LogsTable.jsx`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L5) (importa), [`NegociosTable.jsx`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L5) (importa), [`ErrorCatalogTable.jsx`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L6) (importa), [`IssuesTable.jsx`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L22) (importa), [`PrelaunchAnalyticsPanel.jsx`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L3) (importa), [`PromosTable.jsx`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L5) (importa), [`QRsTable.jsx`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L5) (importa), [`ReportesTable.jsx`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L5) (importa), [`RegistroCodes.jsx`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L5) (importa), [`UsuariosTable.jsx`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L5) (importa), [`VersioningArtifactsPanel.jsx`](../../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx#L3) (importa), [`VersioningOverviewPanel.jsx`](../../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx#L14) (importa), [`VersioningReleaseExplorerPanel.jsx`](../../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx#L3) (importa).

**Dependencias del archivo.** `react`.

#### [`alignClass`](../../../apps/referidos-app/src/components/ui/Table.jsx#L4) · función

Implementa `align Class` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `align`.
- **Condiciones que evalúa** `align`.
- **Lo usa** [`Table`](../../../apps/referidos-app/src/components/ui/Table.jsx#L22) (llama).

#### [`Table`](../../../apps/referidos-app/src/components/ui/Table.jsx#L10) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{columns, children, className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`columns.map`](../../../apps/referidos-app/src/components/ui/Table.jsx#L19), [`alignClass`](../../../apps/referidos-app/src/components/ui/Table.jsx#L22).
- **Lo usa** [`LogsTable`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L139) (renderiza), [`NegociosTable`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L112) (renderiza), [`ErrorCatalogTable`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L148) (renderiza), [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1526) (renderiza), [`renderEngagement`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L486) (renderiza), [`renderWaitlist`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L571) (renderiza), [`renderTickets`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L612) (renderiza), [`renderRisk`](../../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx#L656) (renderiza), [`PromosTable`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L101) (renderiza), [`QRsTable`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L110) (renderiza), [`ReportesTable`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L104) (renderiza), [`RegistroCodes`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L147) (renderiza) y 4 más.
