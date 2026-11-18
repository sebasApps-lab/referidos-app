# PWA principal · Administración y soporte

[Volver a la guía de la PWA](../02-pwa-principal.md) · [Índice general](../README.md)

Las páginas montan el shell administrativo y los módulos de dominio presentan la operación. Las llamadas a OPS pasan por proxies del runtime. Las pantallas del agente de soporte están en packages/support-sdk.

85 archivos de `apps/referidos-app`. Las rutas de esta referencia se leen desde ese workspace. Los enlaces de importación y exportación se extraen del código actual y muestran las conexiones más cercanas a cada pieza.

## `src/admin/apps`

### [`AdminAppsPanel.jsx`](../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx)

Permite consultar y gestionar las aplicaciones del circuito de soporte. Las actualizaciones operativas pasan por el proxy OPS.

**Exporta** `default AdminAppsPanel`.

**Estado en el módulo** `apps`, `loading`, `refreshing`, `message`, `error`, `selectedAppId`.

**Se apoya en** [`./services/supportAppsService`](../../apps/referidos-app/src/admin/apps/services/supportAppsService.js).

**Lo importa** [`pages/admin/AdminApps.jsx`](../../apps/referidos-app/src/pages/admin/AdminApps.jsx).

## `src/admin/apps/services`

### [`supportAppsService.js`](../../apps/referidos-app/src/admin/apps/services/supportAppsService.js)

Envuelve acciones del registro de apps y dispara la sincronización de OPS hacia el runtime.

**Exporta** `parseAliasesInput`, `formatAliasesInput`, `dispatchSupportAppsSync`, `fetchSupportApps`, `createSupportApp`, `updateSupportApp`, `setSupportAppActive`.

**Acceso directo** Edge `support-ops-proxy`, Edge `ops-support-apps-sync-dispatch`.

**Se apoya en** [`../../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js).

**Lo importa** [`admin/apps/AdminAppsPanel.jsx`](../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx).

## `src/admin/dashboard`

### [`AdminDashboardAnalyticsPanel.jsx`](../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx)

Presenta el área de analítica del dashboard y selecciona el panel según el producto.

**Exporta** `default AdminDashboardAnalyticsPanel`.

**Se apoya en** [`../ops/useOpsTelemetryHotSync`](../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js), [`../prelaunch/PrelaunchAnalyticsPanel`](../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx), [`./dashboardProducts`](../../apps/referidos-app/src/admin/dashboard/dashboardProducts.js), [`./hooks/useDashboardProdVersions`](../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js).

**Lo importa** [`pages/admin/AdminDashboardAnalytics.jsx`](../../apps/referidos-app/src/pages/admin/AdminDashboardAnalytics.jsx).

### [`AdminDashboardDlqEventsPanel.jsx`](../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx)

Muestra eventos de un grupo de fallos de ingestión y navega su paginación. El cambio local reemplaza el JSON del evento por metadatos de tamaño y forma.

**Exporta** `default AdminDashboardDlqEventsPanel`.

**Estado en el módulo** `loading`, `refreshing`, `error`, `events`, `totalCount`, `nextPurgeAt`.

**Se apoya en** [`./services/opsTelemetryDlqService`](../../apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js).

**Lo importa** [`pages/admin/AdminDashboardDlqEvents.jsx`](../../apps/referidos-app/src/pages/admin/AdminDashboardDlqEvents.jsx).

### [`AdminDashboardOverviewPanel.jsx`](../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx)

Resume versiones, métricas por producto y estado de la cola en la portada del dashboard.

**Exporta** `default AdminDashboardOverviewPanel`.

**Se apoya en** [`./hooks/useDashboardProdVersions`](../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js), [`./OpsTelemetryDlqPanel`](../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx).

**Lo importa** [`pages/admin/AdminDashboard.jsx`](../../apps/referidos-app/src/pages/admin/AdminDashboard.jsx).

### [`dashboardProducts.js`](../../apps/referidos-app/src/admin/dashboard/dashboardProducts.js)

Define productos y etiquetas para que overview, analítica y versiones se refieran a las mismas claves.

**Exporta** `DASHBOARD_PRODUCTS`, `normalizeDashboardProductKey`, `getDashboardProductMeta`.

**Lo importa** [`admin/dashboard/AdminDashboardAnalyticsPanel.jsx`](../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx), [`admin/dashboard/hooks/useDashboardProdVersions.js`](../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js).

### [`OpsTelemetryDlqPanel.jsx`](../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx)

Muestra el agregado de la cola de eventos fallidos y permite navegar hacia su desglose.

**Exporta** `default OpsTelemetryDlqPanel`.

**Estado en el módulo** `loading`, `refreshing`, `error`, `summary`, `groups`.

**Se apoya en** [`./services/opsTelemetryDlqService`](../../apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js).

**Lo importa** [`admin/dashboard/AdminDashboardOverviewPanel.jsx`](../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx).

## `src/admin/dashboard/hooks`

### [`useDashboardProdVersions.js`](../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js)

Carga las versiones de producción que se presentan junto a los productos del dashboard.

**Exporta** `useDashboardProdVersions`.

**Estado en el módulo** `loading`, `refreshing`, `error`, `rows`.

**Se apoya en** [`../../versioning/services/versioningService`](../../apps/referidos-app/src/admin/versioning/services/versioningService.js), [`../dashboardProducts`](../../apps/referidos-app/src/admin/dashboard/dashboardProducts.js).

**Lo importa** [`admin/dashboard/AdminDashboardAnalyticsPanel.jsx`](../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx), [`admin/dashboard/AdminDashboardOverviewPanel.jsx`](../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx).

## `src/admin/dashboard/services`

### [`opsTelemetryDlqService.js`](../../apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js)

Invoca ops-telemetry-admin-proxy y traduce acciones de resumen, grupos y eventos a respuestas del panel.

**Exporta** `fetchDlqPurgePreview`, `fetchDlqPurgeEvents`.

**Acceso directo** Edge `ops-telemetry-admin-proxy`.

**Se apoya en** [`../../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js).

**Lo importa** [`admin/dashboard/AdminDashboardDlqEventsPanel.jsx`](../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx), [`admin/dashboard/OpsTelemetryDlqPanel.jsx`](../../apps/referidos-app/src/admin/dashboard/OpsTelemetryDlqPanel.jsx).

## `src/admin/datos`

### [`ChartsAvanzados.jsx`](../../apps/referidos-app/src/admin/datos/ChartsAvanzados.jsx)

Contiene las gráficas que se presentan en el área de datos administrativos.

**Exporta** `default ChartsAvanzados`.

**Lo importa** [`pages/admin/AdminDatos.jsx`](../../apps/referidos-app/src/pages/admin/AdminDatos.jsx).

## `src/admin/docs`

### [`AdminDocumentationPanel.jsx`](../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx)

Monta el navegador interno de documentación operativa con artículos del registro.

**Exporta** `default AdminDocumentationPanel`.

**Estado en el módulo** `activeGroup`, `search`, `activeDocId`.

**Se apoya en** [`./docsRegistry`](../../apps/referidos-app/src/admin/docs/docsRegistry.js), [`./MarkdownArticle`](../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx).

**Lo importa** [`pages/admin/AdminDocumentation.jsx`](../../apps/referidos-app/src/pages/admin/AdminDocumentation.jsx).

### [`docsRegistry.js`](../../apps/referidos-app/src/admin/docs/docsRegistry.js)

Selecciona y organiza los artículos que están disponibles en el panel interno, con sus identificadores de navegación.

**Exporta** `DOC_GROUPS`, `DOCS_REGISTRY`.

**Se apoya en** `../../../../../README.md?raw`, `../../../../../docs/README.md?raw`, `../../../../../docs/versioning-system.md?raw`, `../../../../../docs/referidos-system/README.md?raw`, `../../../../../docs/referidos-system/operacion-sin-pr-netlify.md?raw`, `../../../../../docs/referidos-system/entornos-y-secrets.md?raw`, `../../../../../docs/referidos-system/support-macros-ops-cache.md?raw`, `../../../docs/README.md?raw`, `../../../../../apps/prelaunch/docs/README.md?raw`, `../../../../../apps/referidos-android/docs/README.md?raw` y 5 dependencias más del módulo.

**Lo importa** [`admin/docs/AdminDocumentationPanel.jsx`](../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx).

### [`MarkdownArticle.jsx`](../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx)

Renderiza bloques Markdown para mostrar los artículos de operación dentro de la app admin.

**Exporta** `default MarkdownArticle`.

**Lo importa** [`admin/docs/AdminDocumentationPanel.jsx`](../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx), [`admin/legal/AdminLegalPanel.jsx`](../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx).

## `src/admin/hooks`

### [`useAdminUser.js`](../../apps/referidos-app/src/admin/hooks/useAdminUser.js)

Proporciona al área de admin el estado y resolución del usuario ya autenticado.

**Exporta** `useAdminUser`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

## `src/admin/inicio`

### [`GithubTokenRenewalCard.jsx`](../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx)

Muestra un recordatorio local de renovación de credenciales de GitHub y guarda la fecha registrada. Las credenciales se gestionan fuera del navegador.

**Exporta** `default GithubTokenRenewalCard`.

**Estado en el módulo** `lastRenewedInput`, `savedMessage`.

**Lo importa** [`pages/admin/AdminInicio.jsx`](../../apps/referidos-app/src/pages/admin/AdminInicio.jsx).

### [`InicioCharts.jsx`](../../apps/referidos-app/src/admin/inicio/InicioCharts.jsx)

Agrupa gráficas presentadas en el inicio de administración.

**Exporta** `default InicioCharts`.

**Lo importa** [`pages/admin/AdminInicio.jsx`](../../apps/referidos-app/src/pages/admin/AdminInicio.jsx).

### [`InicioKPIs.jsx`](../../apps/referidos-app/src/admin/inicio/InicioKPIs.jsx)

Construye las tarjetas de indicadores de la portada administrativa.

**Exporta** `default InicioKPIs`.

**Lo importa** [`pages/admin/AdminInicio.jsx`](../../apps/referidos-app/src/pages/admin/AdminInicio.jsx).

### [`NetlifyTokenRenewalCard.jsx`](../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx)

Muestra un recordatorio local equivalente para Netlify. El estado local representa seguimiento de fecha.

**Exporta** `default NetlifyTokenRenewalCard`.

**Estado en el módulo** `lastRenewedInput`, `savedMessage`.

**Lo importa** [`pages/admin/AdminInicio.jsx`](../../apps/referidos-app/src/pages/admin/AdminInicio.jsx).

## `src/admin/layout`

### [`AdminLayout.jsx`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx)

Monta estructura admin, barra, navegación y contenido para mantener contexto entre paneles.

**Exporta** `default AdminLayout`.

**Estado en el módulo** `sidebarOpen`, `sidebarCollapsed`.

**Se apoya en** [`./AdminSidebar`](../../apps/referidos-app/src/admin/layout/AdminSidebar.jsx), [`./AdminTopbar`](../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx), [`../observability/AdminRuntimeErrorModalHost`](../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx).

**Lo importa** [`admin/support/AdminSupportAgents.jsx`](../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx), [`admin/support/AdminSupportCatalogPanel.jsx`](../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx), [`admin/support/AdminSupportControlPanel.jsx`](../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx), [`admin/support/AdminSupportDesk.jsx`](../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx), [`admin/support/AdminSupportTicket.jsx`](../../apps/referidos-app/src/admin/support/AdminSupportTicket.jsx), [`pages/admin/AdminApps.jsx`](../../apps/referidos-app/src/pages/admin/AdminApps.jsx), [`pages/admin/AdminDashboard.jsx`](../../apps/referidos-app/src/pages/admin/AdminDashboard.jsx) y 20 módulos más.

### [`AdminSidebar.jsx`](../../apps/referidos-app/src/admin/layout/AdminSidebar.jsx)

Define grupos de accesos administrativos y los enlaces correspondientes del menú lateral.

**Exporta** `default AdminSidebar`.

**Se apoya en** [`../../components/ui/Badge`](../../apps/referidos-app/src/components/ui/Badge.jsx).

**Lo importa** [`admin/layout/AdminLayout.jsx`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx).

### [`AdminTopbar.jsx`](../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx)

Presenta el encabezado común de administración, incluidas acciones que coinciden con la ruta activa.

**Exporta** `default AdminTopbar`.

**Estado en el módulo** `usuario`, `logout`.

**Se apoya en** [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../../config/runtimeConfig`](../../apps/referidos-app/src/config/runtimeConfig.js).

**Lo importa** [`admin/layout/AdminLayout.jsx`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx).

## `src/admin/legal`

### [`AdminLegalPanel.jsx`](../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx)

Organiza la consulta de publicaciones legales desde administración.

**Exporta** `default AdminLegalPanel`.

**Estado en el módulo** `search`, `activeDocId`.

**Se apoya en** [`../docs/MarkdownArticle`](../../apps/referidos-app/src/admin/docs/MarkdownArticle.jsx), [`./legalDocsRegistry`](../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js).

**Lo importa** [`pages/admin/AdminLegal.jsx`](../../apps/referidos-app/src/pages/admin/AdminLegal.jsx).

### [`legalDocsRegistry.js`](../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js)

Selecciona los documentos legales que expone el panel de admin y unifica nombres de documento.

**Exporta** `LEGAL_DOCS`, `LEGAL_POLICY_SUMMARY`.

**Se apoya en** `../../../../../docs/legal/README.md?raw`, `../../../../../docs/legal/brand-icon-policy.md?raw`, `../../../../../docs/legal/brand-icon-manifest.md?raw`, `../../../../../packages/legal-content/content/es/privacy.md?raw`, `../../../../../packages/legal-content/content/es/terms.md?raw`, `../../../../../packages/legal-content/content/es/data-deletion.md?raw`, `../../../../../packages/legal-content/content/en/privacy.md?raw`, `../../../../../packages/legal-content/content/en/terms.md?raw`, `../../../../../packages/legal-content/content/en/data-deletion.md?raw`, [`../observability/brandIconPolicy`](../../apps/referidos-app/src/admin/observability/brandIconPolicy.js).

**Lo importa** [`admin/legal/AdminLegalPanel.jsx`](../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx).

## `src/admin/logs`

### [`LogsTable.jsx`](../../apps/referidos-app/src/admin/logs/LogsTable.jsx)

Consulta y organiza eventos de soporte para la pantalla de logs.

**Exporta** `default LogsTable`.

**Acceso directo** tabla o vista `support_log_events`.

**Estado en el módulo** `logs`, `query`, `loading`, `error`.

**Se apoya en** [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`../../components/ui/Badge`](../../apps/referidos-app/src/components/ui/Badge.jsx), [`../../components/ui/Table`](../../apps/referidos-app/src/components/ui/Table.jsx).

**Lo importa** [`pages/admin/AdminLogs.jsx`](../../apps/referidos-app/src/pages/admin/AdminLogs.jsx).

## `src/admin/negocios`

### [`NegocioDetalle.jsx`](../../apps/referidos-app/src/admin/negocios/NegocioDetalle.jsx)

Expone datos y acciones del negocio elegido desde su listado administrativo.

**Exporta** `default NegocioDetalle`.

**Se apoya en** [`../../components/ui/Badge`](../../apps/referidos-app/src/components/ui/Badge.jsx).

**Lo importa** [`admin/negocios/NegociosTable.jsx`](../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx).

### [`NegociosTable.jsx`](../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx)

Controla filtros, selección y acciones sobre el listado de negocios que usa el panel.

**Exporta** `default NegociosTable`.

**Estado en el módulo** `query`, `sectorFilter`, `selected`, `drawerOpen`.

**Se apoya en** [`../../components/ui/Badge`](../../apps/referidos-app/src/components/ui/Badge.jsx), [`../../components/ui/Table`](../../apps/referidos-app/src/components/ui/Table.jsx), [`./NegocioDetalle`](../../apps/referidos-app/src/admin/negocios/NegocioDetalle.jsx).

**Lo importa** [`pages/admin/AdminNegocios.jsx`](../../apps/referidos-app/src/pages/admin/AdminNegocios.jsx).

## `src/admin/observability`

### [`AdminRuntimeErrorModalHost.jsx`](../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx)

Traduce errores del runtime de administración a un modal de diagnóstico o recuperación.

**Exporta** `default AdminRuntimeErrorModalHost`.

**Estado en el módulo** `queue`, `setLastByKey`.

**Se apoya en** [`../../services/loggingClient`](../../apps/referidos-app/src/services/loggingClient.js).

**Lo importa** [`admin/layout/AdminLayout.jsx`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx).

### [`brandIconPolicy.js`](../../apps/referidos-app/src/admin/observability/brandIconPolicy.js)

Define criterios de uso de activos de marca para identificar fuentes en observabilidad.

**Exporta** `BRAND_ICON_LEGAL_STATUS`, `BRAND_ICON_POLICY_META`, `BRAND_ICON_UI_NOTICE`, `BRAND_ICON_ANDROID_ATTRIBUTION`, `resolveBrandIcon`, `getBrandIconPolicy`.

**Lo importa** [`admin/legal/legalDocsRegistry.js`](../../apps/referidos-app/src/admin/legal/legalDocsRegistry.js), [`admin/observability/IssuesTable.jsx`](../../apps/referidos-app/src/admin/observability/IssuesTable.jsx).

### [`ErrorCatalogTable.jsx`](../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx)

Presenta el catálogo obs_error_catalog para dar contexto y clasificación a los códigos de error.

**Exporta** `default ErrorCatalogTable`.

**Acceso directo** tabla o vista `obs_error_catalog`.

**Estado en el módulo** `rows`, `query`, `loading`, `error`.

**Se apoya en** `@referidos/observability`, [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`../../components/ui/Badge`](../../apps/referidos-app/src/components/ui/Badge.jsx), [`../../components/ui/Table`](../../apps/referidos-app/src/components/ui/Table.jsx).

**Lo importa** [`pages/admin/AdminDevErrors.jsx`](../../apps/referidos-app/src/pages/admin/AdminDevErrors.jsx).

### [`IssuesTable.jsx`](../../apps/referidos-app/src/admin/observability/IssuesTable.jsx)

Consulta incidencias y eventos relacionados, administra selección y pide simbolización para detalle de stack.

**Exporta** `default IssuesTable`.

**Acceso directo** tabla o vista `obs_issues_context`, tabla o vista `obs_events_context`, Edge `obs-symbolicate`.

**Estado en el módulo** `issues`, `events`, `eventDetails`, `query`, `loadingIssues`, `loadingEvents`.

**Se apoya en** [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`../../components/ui/Badge`](../../apps/referidos-app/src/components/ui/Badge.jsx), [`../../components/ui/Table`](../../apps/referidos-app/src/components/ui/Table.jsx), [`./brandIconPolicy`](../../apps/referidos-app/src/admin/observability/brandIconPolicy.js).

**Lo importa** [`pages/admin/AdminObservability.jsx`](../../apps/referidos-app/src/pages/admin/AdminObservability.jsx).

## `src/admin/ops`

### [`useOpsTelemetryHotSync.js`](../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js)

Dispara o programa sincronización de telemetría del runtime mediante la Edge Function de dispatch.

**Exporta** `default useOpsTelemetryHotSync`.

**Acceso directo** Edge `ops-telemetry-sync-dispatch`.

**Se apoya en** [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js).

**Lo importa** [`admin/dashboard/AdminDashboardAnalyticsPanel.jsx`](../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx), [`pages/admin/AdminObservability.jsx`](../../apps/referidos-app/src/pages/admin/AdminObservability.jsx), [`pages/admin/AdminPrelaunchAnalytics.jsx`](../../apps/referidos-app/src/pages/admin/AdminPrelaunchAnalytics.jsx).

## `src/admin/prelaunch/components`

### [`svgChartUtils.js`](../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js)

Comparte cálculos de escala, puntos, fechas o formato para tarjetas de gráficas SVG.

**Exporta** `clampChartMax`, `buildLineChartGeometry`, `buildVerticalBarGeometry`, `getMeterRatio`.

**Lo importa** [`admin/prelaunch/components/SvgMetricAverageCard.jsx`](../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricAverageCard.jsx), [`admin/prelaunch/components/SvgMetricCompareCard.jsx`](../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricCompareCard.jsx), [`admin/prelaunch/components/SvgMetricLineCard.jsx`](../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricLineCard.jsx).

### [`SvgMetricAverageCard.jsx`](../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricAverageCard.jsx)

Dibuja una tarjeta SVG para un valor promedio con la serie que la acompaña.

**Exporta** `default SvgMetricAverageCard`.

**Se apoya en** [`./svgChartUtils`](../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js).

**Lo importa** [`admin/prelaunch/PrelaunchAnalyticsPanel.jsx`](../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx).

### [`SvgMetricCompareCard.jsx`](../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricCompareCard.jsx)

Dibuja métricas que comparan períodos o valores bajo un mismo formato.

**Exporta** `default SvgMetricCompareCard`.

**Se apoya en** [`./svgChartUtils`](../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js).

**Lo importa** [`admin/prelaunch/PrelaunchAnalyticsPanel.jsx`](../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx).

### [`SvgMetricLineCard.jsx`](../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricLineCard.jsx)

Representa la serie temporal de una métrica y su lectura en el panel.

**Exporta** `default SvgMetricLineCard`.

**Se apoya en** [`./svgChartUtils`](../../apps/referidos-app/src/admin/prelaunch/components/svgChartUtils.js).

**Lo importa** [`admin/prelaunch/PrelaunchAnalyticsPanel.jsx`](../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx).

## `src/admin/prelaunch/hooks`

### [`usePrelaunchMetrics.js`](../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js)

Administra filtros, carga y resultado. Elige métricas mock en modo Vite DEV y el servicio en otros builds.

**Exporta** `usePrelaunchMetrics`.

**Estado en el módulo** `filters`, `loading`, `refreshing`, `error`, `metrics`, `lastUpdatedAt`.

**Se apoya en** [`../mockPrelaunchMetrics`](../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js), [`../services/prelaunchMetrics`](../../apps/referidos-app/src/admin/prelaunch/services/prelaunchMetrics.js).

**Lo importa** [`admin/prelaunch/PrelaunchAnalyticsPanel.jsx`](../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx).

## `src/admin/prelaunch`

### [`mockPrelaunchMetrics.js`](../../apps/referidos-app/src/admin/prelaunch/mockPrelaunchMetrics.js)

Produce muestras de analítica para ver estados y gráficos en desarrollo.

**Exporta** `buildMockPrelaunchMetrics`.

**Lo importa** [`admin/prelaunch/hooks/usePrelaunchMetrics.js`](../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js).

### [`PrelaunchAnalyticsPanel.jsx`](../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx)

Compone filtros y gráficas de conversión de Prelaunch para el panel de administración.

**Exporta** `default PrelaunchAnalyticsPanel`.

**Estado en el módulo** `activeTab`.

**Se apoya en** [`../../components/ui/Table`](../../apps/referidos-app/src/components/ui/Table.jsx), [`./components/SvgMetricAverageCard`](../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricAverageCard.jsx), [`./components/SvgMetricCompareCard`](../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricCompareCard.jsx), [`./components/SvgMetricLineCard`](../../apps/referidos-app/src/admin/prelaunch/components/SvgMetricLineCard.jsx), [`./hooks/usePrelaunchMetrics`](../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js).

**Lo importa** [`admin/dashboard/AdminDashboardAnalyticsPanel.jsx`](../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx), [`pages/admin/AdminPrelaunchAnalytics.jsx`](../../apps/referidos-app/src/pages/admin/AdminPrelaunchAnalytics.jsx).

## `src/admin/prelaunch/services`

### [`prelaunchMetrics.js`](../../apps/referidos-app/src/admin/prelaunch/services/prelaunchMetrics.js)

Pide datos administrativos de Prelaunch a su Edge Function y prepara la interacción con el hook.

**Exporta** `fetchPrelaunchMetrics`.

**Acceso directo** `supabase.auth.getSession`.

**Se apoya en** [`../../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js).

**Lo importa** [`admin/prelaunch/hooks/usePrelaunchMetrics.js`](../../apps/referidos-app/src/admin/prelaunch/hooks/usePrelaunchMetrics.js).

## `src/admin/promos`

### [`PromosTable.jsx`](../../apps/referidos-app/src/admin/promos/PromosTable.jsx)

Presenta promociones, filtros y selección administrativa para inspección y cambios de estado.

**Exporta** `default PromosTable`.

**Estado en el módulo** `query`, `statusFilter`.

**Se apoya en** [`../../components/ui/Badge`](../../apps/referidos-app/src/components/ui/Badge.jsx), [`../../components/ui/Table`](../../apps/referidos-app/src/components/ui/Table.jsx).

**Lo importa** [`pages/admin/AdminPromos.jsx`](../../apps/referidos-app/src/pages/admin/AdminPromos.jsx).

## `src/admin/qrs`

### [`QRDetalle.jsx`](../../apps/referidos-app/src/admin/qrs/QRDetalle.jsx)

Presenta datos de un QR seleccionado para que admin revise su estado y acciones.

**Exporta** `default QRDetalle`.

**Se apoya en** [`../../components/ui/Badge`](../../apps/referidos-app/src/components/ui/Badge.jsx).

**Lo importa** [`admin/qrs/QRsTable.jsx`](../../apps/referidos-app/src/admin/qrs/QRsTable.jsx).

### [`QRsTable.jsx`](../../apps/referidos-app/src/admin/qrs/QRsTable.jsx)

Presenta inventario y filtros de administración QR y conecta el acceso al detalle.

**Exporta** `default QRsTable`.

**Estado en el módulo** `query`, `statusFilter`, `selected`, `drawerOpen`.

**Se apoya en** [`../../components/ui/Badge`](../../apps/referidos-app/src/components/ui/Badge.jsx), [`../../components/ui/Table`](../../apps/referidos-app/src/components/ui/Table.jsx), [`./QRDetalle`](../../apps/referidos-app/src/admin/qrs/QRDetalle.jsx).

**Lo importa** [`pages/admin/AdminQRs.jsx`](../../apps/referidos-app/src/pages/admin/AdminQRs.jsx).

## `src/admin/reportes`

### [`ReportesTable.jsx`](../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx)

Lista reportes que requieren operación administrativa y coloca sus acciones de estado.

**Exporta** `default ReportesTable`.

**Estado en el módulo** `query`, `statusFilter`.

**Se apoya en** [`../../components/ui/Badge`](../../apps/referidos-app/src/components/ui/Badge.jsx), [`../../components/ui/Table`](../../apps/referidos-app/src/components/ui/Table.jsx).

**Lo importa** [`pages/admin/AdminReportes.jsx`](../../apps/referidos-app/src/pages/admin/AdminReportes.jsx).

## `src/admin/services`

### [`adminUser.js`](../../apps/referidos-app/src/admin/services/adminUser.js)

Agrupa la resolución del usuario administrador que comparten páginas y hooks.

**Exporta** `fetchAdminUser`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

## `src/admin/sistema`

### [`FeatureFlags.jsx`](../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx)

Presenta controles o estado de configuración operativa en la pantalla Sistema.

**Exporta** `default FeatureFlags`.

**Estado en el módulo** `state`, `supportAuthState`, `supportAuthLoading`, `supportAuthError`, `savingSupportFlag`, `supportConfigDraft`, `usuario`.

**Se apoya en** `@referidos/support-sdk/runtime/systemFeatureFlags`, `@referidos/support-sdk/runtime/supportRuntimeFlags`, [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js).

**Lo importa** [`pages/admin/AdminSistema.jsx`](../../apps/referidos-app/src/pages/admin/AdminSistema.jsx).

### [`RegistroCodes.jsx`](../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx)

Carga y gestiona códigos de alta mediante funciones Edge de creación, listado y revocación.

**Exporta** `default RegistroCodes`.

**Acceso directo** `supabase.auth.getSession`.

**Estado en el módulo** `codes`, `loading`, `creating`, `revokingId`, `error`.

**Se apoya en** [`../../components/ui/Badge`](../../apps/referidos-app/src/components/ui/Badge.jsx), [`../../components/ui/Table`](../../apps/referidos-app/src/components/ui/Table.jsx), [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js).

**Lo importa** [`pages/admin/AdminSistema.jsx`](../../apps/referidos-app/src/pages/admin/AdminSistema.jsx).

## `src/admin/support`

### [`AdminSupportAgents.jsx`](../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx)

Consulta perfiles, jornadas y tickets de agentes. Coordina control operativo y acciones sobre disponibilidad.

**Exporta** `default AdminSupportAgents`.

**Acceso directo** tabla o vista `support_agent_profiles`, tabla o vista `usuarios`, tabla o vista `support_agent_sessions`, tabla o vista `support_threads`.

**Estado en el módulo** `agents`, `loading`, `phoneDrafts`, `authorizedUntilDrafts`, `authorizedFromDrafts`, `usersMap`.

**Se apoya en** [`../layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), `@referidos/support-sdk/supportClient`.

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`AdminSupportCatalogPanel.jsx`](../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx)

Administra macros y categorías, enlaza su navegación y consulta uso de macros.

**Exporta** `default AdminSupportCatalogPanel`.

**Acceso directo** RPC `support_macro_usage_summary`.

**Estado en el módulo** `loading`, `refreshing`, `saving`, `error`, `ok`, `catalogHint`.

**Se apoya en** [`../layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`./services/supportMacrosOpsService`](../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`AdminSupportControlPanel.jsx`](../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx)

Cruza hilos, eventos y cachés de macros para mostrar el estado de operación del soporte.

**Exporta** `default AdminSupportControlPanel`.

**Acceso directo** tabla o vista `support_threads`, tabla o vista `support_thread_events`, tabla o vista `support_threads_inbox`, tabla o vista `support_macros_cache`, tabla o vista `support_macro_categories_cache`, tabla o vista `usuarios`.

**Estado en el módulo** `panel`, `viewByPanel`, `ticketsTab`, `loading`, `refreshing`, `error`.

**Se apoya en** [`../layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`./services/supportMacrosOpsService`](../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js).

**Lo importa** [`admin/support/AdminSupportTicketsPanel.jsx`](../../apps/referidos-app/src/admin/support/AdminSupportTicketsPanel.jsx).

### [`AdminSupportDesk.jsx`](../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx)

Monta la mesa de ayuda del administrador y consulta las sesiones de agentes para su estado.

**Exporta** `default AdminSupportDesk`.

**Acceso directo** tabla o vista `support_agent_sessions`.

**Estado en el módulo** `sessionActive`, `sessionLoading`, `sessionError`, `usuario`.

**Se apoya en** [`../layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), `@referidos/support-sdk/agent/SupportInbox`, [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js), `@referidos/support-sdk/supportClient`.

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`AdminSupportTicket.jsx`](../../apps/referidos-app/src/admin/support/AdminSupportTicket.jsx)

Muestra la vista administrativa para un ticket identificado en la ruta y conecta sus acciones operativas.

**Exporta** `default AdminSupportTicket`.

**Se apoya en** [`../layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), `@referidos/support-sdk/agent/SupportTicket`.

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`AdminSupportTicketsPanel.jsx`](../../apps/referidos-app/src/admin/support/AdminSupportTicketsPanel.jsx)

Presenta o encuadra el listado operativo de tickets accesible por la ruta administrativa.

**Exporta** `default AdminSupportTicketsPanel`.

**Se apoya en** [`./AdminSupportControlPanel`](../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

## `src/admin/support/services`

### [`supportMacrosOpsService.js`](../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js)

Opera el catálogo de macros mediante support-ops-proxy y pide aplicar cambios del catálogo al caché runtime.

**Exporta** `listSupportMacroCatalog`, `createSupportMacroCategory`, `updateSupportMacroCategory`, `setSupportMacroCategoryStatus`, `deleteSupportMacroCategory`, `createSupportMacro`, `updateSupportMacro`, `setSupportMacroStatus`, `deleteSupportMacro`, `dispatchSupportMacrosSync`.

**Acceso directo** Edge `support-ops-proxy`, Edge `ops-support-macros-sync-dispatch`.

**Se apoya en** [`../../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js).

**Lo importa** [`admin/support/AdminSupportCatalogPanel.jsx`](../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx), [`admin/support/AdminSupportControlPanel.jsx`](../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx).

## `src/admin/usuarios`

### [`usuarioCliente.js`](../../apps/referidos-app/src/admin/usuarios/usuarioCliente.js)

Define información de presentación y ayudas de diagnóstico para usuarios cliente.

**Exporta** `clienteInsights`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`UsuarioDrawer.jsx`](../../apps/referidos-app/src/admin/usuarios/UsuarioDrawer.jsx)

Abre el detalle del usuario seleccionado y concentra los controles que presenta su panel.

**Exporta** `default UsuarioDrawer`.

**Se apoya en** [`../../components/ui/Badge`](../../apps/referidos-app/src/components/ui/Badge.jsx).

**Lo importa** [`admin/usuarios/UsuariosTable.jsx`](../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx).

### [`usuarioNegocio.js`](../../apps/referidos-app/src/admin/usuarios/usuarioNegocio.js)

Define información de presentación y ayudas de diagnóstico para usuarios negocio.

**Exporta** `negocioInsights`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`usuariosCliente.ts`](../../apps/referidos-app/src/admin/usuarios/usuariosCliente.ts)

Define reglas y metadatos TypeScript para la vista administrativa de usuario cliente.

**Exporta** `usuariosClienteRules`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`usuariosNegocio.ts`](../../apps/referidos-app/src/admin/usuarios/usuariosNegocio.ts)

Define reglas y metadatos TypeScript para la vista administrativa de usuario negocio.

**Exporta** `usuariosNegocioRules`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`UsuariosTable.jsx`](../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx)

Compone la tabla y filtros de usuarios y comunica una selección al detalle.

**Exporta** `default UsuariosTable`.

**Estado en el módulo** `query`, `roleFilter`, `statusFilter`, `emailFilter`, `selectedUser`, `drawerOpen`.

**Se apoya en** [`../../components/ui/Badge`](../../apps/referidos-app/src/components/ui/Badge.jsx), [`../../components/ui/Table`](../../apps/referidos-app/src/components/ui/Table.jsx), [`./UsuarioDrawer`](../../apps/referidos-app/src/admin/usuarios/UsuarioDrawer.jsx).

**Lo importa** [`pages/admin/AdminUsuarios.jsx`](../../apps/referidos-app/src/pages/admin/AdminUsuarios.jsx), [`pages/admin/AdminUsuariosClientes.jsx`](../../apps/referidos-app/src/pages/admin/AdminUsuariosClientes.jsx), [`pages/admin/AdminUsuariosNegocios.jsx`](../../apps/referidos-app/src/pages/admin/AdminUsuariosNegocios.jsx).

## `src/admin/versioning/services`

### [`versioningService.js`](../../apps/referidos-app/src/admin/versioning/services/versioningService.js)

Encapsula acciones a versioning-ops-proxy. Los componentes usan nombres de operación de este módulo en lugar de hablar con OPS directo.

**Exporta** `formatVersionLabel`, `fetchVersioningCatalog`, `fetchLatestReleases`, `fetchReleasesByProductEnv`, `fetchReleaseComponents`, `fetchReleaseSnapshot`, `fetchComponentHistory`, `fetchComponentCatalog`, `fetchDrift`, `promoteRelease`, `fetchPromotionHistory`, `fetchDeployRequests`, `requestDeploy`, `approveDeployRequest`, `rejectDeployRequest`, `executeDeployRequest`, `triggerDeployPipeline`, `fetchDeployPipelineStatus`, `syncReleaseBranch`, `fetchWorkflowPackStatus`, `syncWorkflowPack`, `previewDevRelease`, `createDevRelease`, `backfillReleaseArtifact`, `fetchDevReleaseStatus`, `checkReleaseMigrations`, `applyReleaseMigrations`, `validateEnvironmentContract`, `fetchReleaseArtifacts`, `fetchLocalArtifactNodes`, `upsertLocalArtifactNode`, `fetchLocalArtifactSyncRequests`, `requestLocalArtifactSync`, `fetchBuildTimeline`, `fetchEnvConfigVersions`, `cancelLocalArtifactSyncRequest`.

**Acceso directo** Edge `versioning-ops-proxy`.

**Se apoya en** [`../../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js).

**Lo importa** [`admin/dashboard/hooks/useDashboardProdVersions.js`](../../apps/referidos-app/src/admin/dashboard/hooks/useDashboardProdVersions.js), [`admin/versioning/VersioningArtifactsPanel.jsx`](../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx), [`admin/versioning/VersioningOverviewPanel.jsx`](../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx), [`admin/versioning/VersioningReleaseExplorerPanel.jsx`](../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx).

## `src/admin/versioning`

### [`VersioningArtifactsPanel.jsx`](../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx)

Muestra inventario y operaciones disponibles para artefactos de release.

**Exporta** `default VersioningArtifactsPanel`.

**Estado en el módulo** `loading`, `refreshing`, `error`, `message`, `artifacts`, `nodes`.

**Se apoya en** [`../../components/ui/Table`](../../apps/referidos-app/src/components/ui/Table.jsx), [`./services/versioningService`](../../apps/referidos-app/src/admin/versioning/services/versioningService.js).

**Lo importa** [`admin/versioning/VersioningOverviewPanel.jsx`](../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx).

### [`VersioningOverviewPanel.jsx`](../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx)

Compone el mapa de productos, entornos y versiones dentro del área de versionado.

**Exporta** `default VersioningOverviewPanel`.

**Estado en el módulo** `detailsExpanded`, `versioningTab`, `loading`, `refreshing`, `error`, `catalog`.

**Se apoya en** [`../../components/ui/Table`](../../apps/referidos-app/src/components/ui/Table.jsx), [`./services/versioningService`](../../apps/referidos-app/src/admin/versioning/services/versioningService.js), [`./VersioningArtifactsPanel`](../../apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx).

**Lo importa** [`pages/admin/AdminVersioningOverview.jsx`](../../apps/referidos-app/src/pages/admin/AdminVersioningOverview.jsx).

### [`VersioningReleaseExplorerPanel.jsx`](../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx)

Navega releases y su detalle, incluyendo los estados disponibles de promoción y despliegue.

**Exporta** `default VersioningReleaseExplorerPanel`.

**Estado en el módulo** `loading`, `refreshing`, `error`, `products`, `selectedProduct`, `releaseGroups`.

**Se apoya en** [`../../components/ui/Table`](../../apps/referidos-app/src/components/ui/Table.jsx), [`./services/versioningService`](../../apps/referidos-app/src/admin/versioning/services/versioningService.js).

**Lo importa** [`pages/admin/AdminVersioningReleases.jsx`](../../apps/referidos-app/src/pages/admin/AdminVersioningReleases.jsx).

## `src/pages/admin`

### [`AdminApps.jsx`](../../apps/referidos-app/src/pages/admin/AdminApps.jsx)

Abre el registro de apps de soporte en el shell administrativo.

**Exporta** `default AdminApps`.

**Se apoya en** [`../../admin/layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../admin/apps/AdminAppsPanel`](../../apps/referidos-app/src/admin/apps/AdminAppsPanel.jsx).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`AdminDashboard.jsx`](../../apps/referidos-app/src/pages/admin/AdminDashboard.jsx)

Abre la portada del dashboard de productos y estado operacional.

**Exporta** `default AdminDashboard`.

**Se apoya en** [`../../admin/layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../admin/dashboard/AdminDashboardOverviewPanel`](../../apps/referidos-app/src/admin/dashboard/AdminDashboardOverviewPanel.jsx).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`AdminDashboardAnalytics.jsx`](../../apps/referidos-app/src/pages/admin/AdminDashboardAnalytics.jsx)

Abre la pantalla de analítica de producto dentro del dashboard.

**Exporta** `default AdminDashboardAnalytics`.

**Se apoya en** [`../../admin/layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../admin/dashboard/AdminDashboardAnalyticsPanel`](../../apps/referidos-app/src/admin/dashboard/AdminDashboardAnalyticsPanel.jsx).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`AdminDashboardDlqEvents.jsx`](../../apps/referidos-app/src/pages/admin/AdminDashboardDlqEvents.jsx)

Abre la página de eventos de ingestión fallidos desde el dashboard.

**Exporta** `default AdminDashboardDlqEvents`.

**Se apoya en** [`../../admin/layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../admin/dashboard/AdminDashboardDlqEventsPanel`](../../apps/referidos-app/src/admin/dashboard/AdminDashboardDlqEventsPanel.jsx).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`AdminDatos.jsx`](../../apps/referidos-app/src/pages/admin/AdminDatos.jsx)

Monta la sección de datos y gráficas de administración.

**Exporta** `default AdminDatos`.

**Se apoya en** [`../../admin/layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../admin/datos/ChartsAvanzados`](../../apps/referidos-app/src/admin/datos/ChartsAvanzados.jsx).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`AdminDevErrors.jsx`](../../apps/referidos-app/src/pages/admin/AdminDevErrors.jsx)

Panel enrutado de catálogo de códigos de error para administración.

**Exporta** `default AdminDevErrors`.

**Se apoya en** [`../../admin/layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../admin/observability/ErrorCatalogTable`](../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`AdminDocumentation.jsx`](../../apps/referidos-app/src/pages/admin/AdminDocumentation.jsx)

Punto de entrada al lector de documentación interna.

**Exporta** `default AdminDocumentation`.

**Se apoya en** [`../../admin/layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../admin/docs/AdminDocumentationPanel`](../../apps/referidos-app/src/admin/docs/AdminDocumentationPanel.jsx).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`AdminInicio.jsx`](../../apps/referidos-app/src/pages/admin/AdminInicio.jsx)

Monta la portada administrativa, sus KPIs, gráficas y recordatorios cuando corresponde.

**Exporta** `default AdminInicio`.

**Se apoya en** [`../../admin/layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../admin/inicio/InicioKPIs`](../../apps/referidos-app/src/admin/inicio/InicioKPIs.jsx), [`../../admin/inicio/InicioCharts`](../../apps/referidos-app/src/admin/inicio/InicioCharts.jsx), [`../../admin/inicio/GithubTokenRenewalCard`](../../apps/referidos-app/src/admin/inicio/GithubTokenRenewalCard.jsx), [`../../admin/inicio/NetlifyTokenRenewalCard`](../../apps/referidos-app/src/admin/inicio/NetlifyTokenRenewalCard.jsx).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`AdminLegal.jsx`](../../apps/referidos-app/src/pages/admin/AdminLegal.jsx)

Enruta el contenido legal administrable dentro de su layout común.

**Exporta** `default AdminLegal`.

**Se apoya en** [`../../admin/layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../admin/legal/AdminLegalPanel`](../../apps/referidos-app/src/admin/legal/AdminLegalPanel.jsx).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`AdminLogs.jsx`](../../apps/referidos-app/src/pages/admin/AdminLogs.jsx)

Abre la pantalla de logs operativos y sus tablas.

**Exporta** `default AdminLogs`.

**Se apoya en** [`../../admin/layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../admin/logs/LogsTable`](../../apps/referidos-app/src/admin/logs/LogsTable.jsx).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`AdminNegocios.jsx`](../../apps/referidos-app/src/pages/admin/AdminNegocios.jsx)

Carga el listado de negocios para admin y sus cambios se canalizan por funciones Edge.

**Exporta** `default AdminNegocios`.

**Se apoya en** [`../../admin/layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../admin/negocios/NegociosTable`](../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`AdminObservability.jsx`](../../apps/referidos-app/src/pages/admin/AdminObservability.jsx)

Monta inspección de incidencias y eventos en las rutas de observabilidad.

**Exporta** `default AdminObservability`.

**Estado en el módulo** `role`.

**Se apoya en** [`../../admin/layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../admin/observability/IssuesTable`](../../apps/referidos-app/src/admin/observability/IssuesTable.jsx), [`../../admin/ops/useOpsTelemetryHotSync`](../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js), [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`AdminPrelaunchAnalytics.jsx`](../../apps/referidos-app/src/pages/admin/AdminPrelaunchAnalytics.jsx)

Envuelve el panel específico de analítica Prelaunch. El enrutador vigente monta la variante de dashboard.

**Exporta** `default AdminPrelaunchAnalytics`.

**Estado en el módulo** `activeTab`, `role`.

**Se apoya en** [`../../admin/layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../admin/prelaunch/PrelaunchAnalyticsPanel`](../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx), [`../../admin/ops/useOpsTelemetryHotSync`](../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js), [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`AdminPromos.jsx`](../../apps/referidos-app/src/pages/admin/AdminPromos.jsx)

Monta promociones para admin, consultas de listado y cambios autorizados por Edge.

**Exporta** `default AdminPromos`.

**Se apoya en** [`../../admin/layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../admin/promos/PromosTable`](../../apps/referidos-app/src/admin/promos/PromosTable.jsx).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`AdminQRs.jsx`](../../apps/referidos-app/src/pages/admin/AdminQRs.jsx)

Carga QR e implementa las operaciones que presenta la tabla de administración.

**Exporta** `default AdminQRs`.

**Se apoya en** [`../../admin/layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../admin/qrs/QRsTable`](../../apps/referidos-app/src/admin/qrs/QRsTable.jsx).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`AdminReportes.jsx`](../../apps/referidos-app/src/pages/admin/AdminReportes.jsx)

Carga reportes y conecta cambios de estado con el backend.

**Exporta** `default AdminReportes`.

**Se apoya en** [`../../admin/layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../admin/reportes/ReportesTable`](../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`AdminSistema.jsx`](../../apps/referidos-app/src/pages/admin/AdminSistema.jsx)

Reúne las superficies de configuración, flags y códigos de alta.

**Exporta** `default AdminSistema`.

**Se apoya en** [`../../admin/layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../admin/sistema/FeatureFlags`](../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx), [`../../admin/sistema/RegistroCodes`](../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`AdminUsuarios.jsx`](../../apps/referidos-app/src/pages/admin/AdminUsuarios.jsx)

Carga y administra usuarios y sus filtros, selección y cambios de datos.

**Exporta** `default AdminUsuarios`.

**Se apoya en** [`../../admin/layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../admin/usuarios/UsuariosTable`](../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`AdminUsuariosClientes.jsx`](../../apps/referidos-app/src/pages/admin/AdminUsuariosClientes.jsx)

Variante de página para usuarios cliente. La ruta de usuarios activa se encuentra en routes.jsx.

**Exporta** `default AdminUsuariosClientes`.

**Se apoya en** [`../../admin/layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../admin/usuarios/UsuariosTable`](../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`AdminUsuariosNegocios.jsx`](../../apps/referidos-app/src/pages/admin/AdminUsuariosNegocios.jsx)

Variante de página para usuarios negocio. La ruta de usuarios activa se encuentra en routes.jsx.

**Exporta** `default AdminUsuariosNegocios`.

**Se apoya en** [`../../admin/layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../admin/usuarios/UsuariosTable`](../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`AdminVersioningOverview.jsx`](../../apps/referidos-app/src/pages/admin/AdminVersioningOverview.jsx)

Entrada de rutas al panel global de versionado.

**Exporta** `default AdminVersioningOverview`.

**Se apoya en** [`../../admin/layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../admin/versioning/VersioningOverviewPanel`](../../apps/referidos-app/src/admin/versioning/VersioningOverviewPanel.jsx).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`AdminVersioningReleases.jsx`](../../apps/referidos-app/src/pages/admin/AdminVersioningReleases.jsx)

Entrada de rutas al detalle y explorador de release.

**Exporta** `default AdminVersioningReleases`.

**Se apoya en** [`../../admin/layout/AdminLayout`](../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../admin/versioning/VersioningReleaseExplorerPanel`](../../apps/referidos-app/src/admin/versioning/VersioningReleaseExplorerPanel.jsx).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).
