# PWA principal · Conexiones de biblioteca

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/lib/supabaseClient.js`](../../../apps/referidos-app/src/lib/supabaseClient.js#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/lib/supabaseClient.js`](../../../apps/referidos-app/src/lib/supabaseClient.js#L1)

Instancia un cliente de Supabase bajo clave pública y PKCE. Es el punto común para sesiones y consultas desde navegador.

**Superficie que exporta.** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31).

**Módulos que lo cargan.** [`supportAppsService.js`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L1) (importa), [`opsTelemetryDlqService.js`](../../../apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js#L1) (importa), [`LogsTable.jsx`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L3) (importa), [`ErrorCatalogTable.jsx`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L4) (importa), [`IssuesTable.jsx`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L20) (importa), [`useOpsTelemetryHotSync.js`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L2) (importa), [`prelaunchMetrics.js`](../../../apps/referidos-app/src/admin/prelaunch/services/prelaunchMetrics.js#L1) (importa), [`RegistroCodes.jsx`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L6) (importa), [`AdminSupportAgents.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportAgents.jsx#L4) (importa), [`AdminSupportCatalogPanel.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L5) (importa), [`AdminSupportControlPanel.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L22) (importa), [`AdminSupportDesk.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L4) (importa), [`supportMacrosOpsService.js`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L1) (importa), [`versioningService.js`](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L1) (importa), [`useAuthActions.js`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L9) (importa), [`useAuthPrefill.js`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L8) (importa) y 38 más.

**Dependencias del archivo.** `@supabase/supabase-js`, [`../config/runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js).

#### Acciones al cargar el módulo

- **Condiciones que evalúa** `ausencia de SUPABASE_URL o ausencia de SUPABASE_ANON_KEY`, `ausencia de globalScope.SUPABASE_SINGLETON_KEY`.
- **Llamadas directas en el cuerpo** [`createClient`](../../../apps/referidos-app/src/lib/supabaseClient.js#L21).

#### [`SUPABASE_URL`](../../../apps/referidos-app/src/lib/supabaseClient.js#L11) · variable de módulo

Declara `SUPABASE_URL` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L81) (accede al módulo).
- **Lo usa** [`supabaseClient.js`](../../../apps/referidos-app/src/lib/supabaseClient.js#L15) (referencia).

#### [`SUPABASE_ANON_KEY`](../../../apps/referidos-app/src/lib/supabaseClient.js#L12) · variable de módulo

Declara `SUPABASE_ANON_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L81) (accede al módulo).
- **Lo usa** [`supabaseClient.js`](../../../apps/referidos-app/src/lib/supabaseClient.js#L15) (referencia).

#### [`SUPABASE_SINGLETON_KEY`](../../../apps/referidos-app/src/lib/supabaseClient.js#L13) · variable de módulo

Declara `SUPABASE_SINGLETON_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`supabaseClient.js`](../../../apps/referidos-app/src/lib/supabaseClient.js#L20) (referencia), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (referencia).

#### [`globalScope`](../../../apps/referidos-app/src/lib/supabaseClient.js#L19) · variable de módulo

Declara `globalScope` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`supabaseClient.js`](../../../apps/referidos-app/src/lib/supabaseClient.js#L20) (accede al módulo), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).

#### [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) · variable de módulo · exportación por defecto

Declara `supabase` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`supabaseClient.js`](../../../apps/referidos-app/src/lib/supabaseClient.js#L33) (referencia), [`invokeSupportOps`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L27) (accede al módulo), [`dispatchSupportAppsSync`](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L52) (accede al módulo), [`invokeOpsTelemetryAdmin`](../../../apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js#L4) (accede al módulo), [`loadLogs`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L53) (accede al módulo), [`loadRows`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L74) (accede al módulo), [`loadIssues`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L686) (accede al módulo), [`loadEvents`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L711) (accede al módulo), [`loadEventDetails`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L733) (accede al módulo), [`symbolicateEvent`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L756) (accede al módulo), [`cacheIssue`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L787) (accede al módulo), [`runSync`](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L30) (accede al módulo) y 114 más.
