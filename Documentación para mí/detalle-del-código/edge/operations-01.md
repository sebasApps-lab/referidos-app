# Runtime · observabilidad y puentes operativos

Ingesta, políticas, simbolicación, telemetría, integración con el proyecto OPS y versionado.

[Índice Edge Functions](README.md)

## Archivos de este capítulo

- [`log-event/index.ts`](../../../apps/referidos-app/supabase/functions/log-event/index.ts)
- [`obs-ingest/index.ts`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts)
- [`obs-policy/index.ts`](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts)
- [`obs-release-sync/index.ts`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts)
- [`obs-release/index.ts`](../../../apps/referidos-app/supabase/functions/obs-release/index.ts)
- [`obs-symbolicate/index.ts`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts)
- [`ops-telemetry-admin-proxy/index.ts`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts)
- [`ops-telemetry-sync-dispatch/index.ts`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts)
- [`versioning-deploy-callback/index.ts`](../../../apps/referidos-app/supabase/functions/versioning-deploy-callback/index.ts)
- [`versioning-deploy-execute/index.ts`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts)
- [`versioning-dev-release-create/index.ts`](../../../apps/referidos-app/supabase/functions/versioning-dev-release-create/index.ts)

## `log-event/index.ts`

Entrada de compatibilidad que pasa el cuerpo y la cabecera de autenticación a forwardSupportLogsToObsIngest. Conserva el nombre que conocen clientes antiguos mientras la persistencia se concentra en obs-ingest.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/log-event/index.ts)

- **Llamadas entrantes:** sin referencia literal encontrada en el monorepo. Puede estar invocada por configuración, un nombre dinámico o un sistema externo.
- **Importaciones locales:** [../_shared/supportLogBridge.ts](../../../apps/referidos-app/supabase/functions/_shared/supportLogBridge.ts) · `forwardSupportLogsToObsIngest`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/log-event/index.ts#L4) · Entrada HTTP. Registra la entrada HTTP de `log-event` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`forwardSupportLogsToObsIngest`](../../../apps/referidos-app/supabase/functions/_shared/supportLogBridge.ts#L83).

## `obs-ingest/index.ts`

Valida lotes, sanea el contexto, resuelve actor y tenant, computa huellas de incidencias y persiste eventos. Enriquece con snapshot de release, revisión del componente, breadcrumbs y retención. Actualiza el catálogo según los códigos detectados, de modo que una incidencia agrupe eventos comparables.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts)

- **Gateway:** [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L380).
- **Referencias literales al nombre del endpoint:** [supportLogBridge.ts](../../../apps/referidos-app/supabase/functions/_shared/supportLogBridge.ts#L113), [prelaunchObservability.js](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L87), [loggingClient.js](../../../apps/referidos-app/src/services/loggingClient.js#L45), [createObservabilityClient.js](../../../packages/observability/src/client/createObservabilityClient.js#L145).
- **Importaciones locales:** [../_shared/observability.ts](../../../apps/referidos-app/supabase/functions/_shared/observability.ts) · `OBS_DEDUPE_WINDOW_MS`, `OBS_MAX_BATCH`, `OBS_RATE_IP_PER_MIN`, `OBS_RATE_USER_PER_MIN`, `buildFingerprint`, `corsHeaders`, `currentRateCountByIp`, `currentRateCountByUser`, `extractRequestIds`, `getOptionalAuthedUser`, `getUsuarioByAuthId`, `hasRecentDuplicate`, `jsonResponse`, `normalizeBreadcrumbs`, `normalizeEventType`, `normalizeLevel`, `normalizeMessage`, `normalizeSource`, `normalizeTimestamp`, `parseStackPreview`, `parseUserAgentSummary`, `parseStackFramesRaw`, `retentionExpiresAtIso`, `resolveTenantIdByHint`, `resolveTenantIdByOrigin`, `scrubUnknown`, `sanitizeStackRaw`, `sha256Hex`, `classifyRetentionTier`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.
- **Tipos declarados:** [`JsonObject`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L53), [`SnapshotComponent`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L55) (`component_key`, `component_type`, `revision_no`, `revision_id`, `path_globs`), [`ReleaseSnapshot`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L63) (`id`, `version_label`, `version_release_id`, `source_commit_sha`, `components`), [`BreadcrumbAssessment`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L133) (`count`, `lastAt`, `source`, `status`, `reason`, `meta`).

### Funciones, handlers y clases

- [`safeString(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L71) · Función. Normaliza de forma defensiva el texto del proceso operativo.
  - **Tipo de retorno declarado:** `string | null`.
  - **Dónde se usa:** [`parseIsoOrNull` · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L114), [`normalizeBreadcrumbSource` · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L122), [`normalizeBreadcrumbStatus` · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L128), [`classifyBreadcrumbs` · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L166), [`normalizeErrorCode` · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L233), [`normalizeDomain` · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L238), 5 más en el código.
  - **Retornos explícitos:** null explícito.
- [`safeObject(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L77) · Función. Normaliza de forma defensiva el objeto de propiedades del proceso operativo.
  - **Tipo de retorno declarado:** `Record<string, unknown>`.
  - **Dónde se usa:** [`extractBreadcrumbLastAt` · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L144), [`extractStackFiles` · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L339), [handler HTTP · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L564).
- [`safeArray(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L84) · Función. Normaliza de forma defensiva la lista del proceso operativo.
  - **Tipo de retorno declarado:** `unknown[]`.
  - **Dónde se usa:** [`parsePathGlobs` · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L331), [`extractStackFiles` · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L338).
- [`safeInteger(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L89) · Función. Normaliza de forma defensiva la entrada a un entero del proceso operativo.
  - **Tipo de retorno declarado:** `number | null`.
  - **Dónde se usa:** [`loadReleaseSnapshot` · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L432).
  - **Retornos explícitos:** null explícito.
- [`safePositiveInteger(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L95) · Función. Normaliza de forma defensiva la entrada a un entero positivo del proceso operativo.
  - **Tipo de retorno declarado:** `number | null`.
  - **Dónde se usa:** [handler HTTP · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L689).
  - **Retornos explícitos:** null explícito.
- [`safeBoolean(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L103) · Función. Normaliza de forma defensiva la señal booleana del proceso operativo.
  - **Tipo de retorno declarado:** `boolean | null`.
  - **Dónde se usa:** [`classifyBreadcrumbs` · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L165).
  - **Retornos explícitos:** null explícito · booleanos explícitos.
- [`parseIsoOrNull(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L113) · Función. Interpreta el valor o paso `iso or null` del proceso operativo.
  - **Tipo de retorno declarado:** `string | null`.
  - **Dónde se usa:** [`extractBreadcrumbLastAt` · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L145).
  - **Delega en:** [`safeString`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L71).
  - **Retornos explícitos:** null explícito.
- [`normalizeBreadcrumbSource(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L121) · Función. Normaliza el origen de la secuencia de contexto del proceso operativo.
  - **Tipo de retorno declarado:** `string | null`.
  - **Dónde se usa:** [`classifyBreadcrumbs` · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L168).
  - **Delega en:** [`safeString`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L71).
  - **Retornos explícitos:** null explícito.
- [`normalizeBreadcrumbStatus(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L127) · Función. Normaliza el estado de la secuencia de contexto del proceso operativo.
  - **Tipo de retorno declarado:** `string | null`.
  - **Dónde se usa:** [`classifyBreadcrumbs` · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L169).
  - **Delega en:** [`safeString`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L71).
  - **Retornos explícitos:** null explícito.
- [`extractBreadcrumbLastAt(breadcrumbs: Record<string, unknown>[])`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L142) · Función. Implementa el paso `extract breadcrumb last at` del proceso operativo.
  - **Dónde se usa:** [`classifyBreadcrumbs` · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L163).
  - **Delega en:** [`safeObject`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L77), [`parseIsoOrNull`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L113).
  - **Retornos explícitos:** null explícito.
- [`classifyBreadcrumbs({ item, source, breadcrumbs, breadcrumbsMetaRaw })`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L151) · Función. Clasifica el contexto de los breadcrumbs para su almacenamiento o presentación operativa.
  - **Tipo de retorno declarado:** `BreadcrumbAssessment`.
  - **Dónde se usa:** [handler HTTP · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L576).
  - **Delega en:** [`extractBreadcrumbLastAt`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L142), [`safeBoolean`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L103), [`safeString`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L71), [`normalizeBreadcrumbSource`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L121), [`normalizeBreadcrumbStatus`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L127).
  - **Retornos explícitos:** objeto con `count`, `lastAt`, `source`, `status`, `reason`, `meta`.
- [`normalizeErrorCode(value: string | null)`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L232) · Función. Normaliza el código de error que usa la API del proceso operativo.
  - **Dónde se usa:** [handler HTTP · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L605).
  - **Delega en:** [`safeString`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L71).
- [`normalizeDomain(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L237) · Función. Normaliza el dominio de telemetría que clasifica el evento del proceso operativo.
  - **Dónde se usa:** [handler HTTP · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L582).
  - **Delega en:** [`safeString`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L71).
- [`normalizeSupportCategory(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L241) · Función. Normaliza la categoría de soporte al vocabulario que comparte el runtime.
  - **Tipo de retorno declarado:** `string | null`.
  - **Dónde se usa:** [handler HTTP · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L615).
  - **Delega en:** [`safeString`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L71).
- [`parseUuid(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L246) · Función. Interpreta el valor o paso `uuid` del proceso operativo.
  - **Tipo de retorno declarado:** `string | null`.
  - **Dónde se usa:** [handler HTTP · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L618).
  - **Retornos explícitos:** null explícito.
- [`normalizeFingerprintMessage(value: string)`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L259) · Función. Normaliza el mensaje estable que se usa como huella del error del proceso operativo.
  - **Dónde se usa:** [handler HTTP · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L655).
- [`issueTitleForEvent({ errorName, errorCode, message, eventType })`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L263) · Función. Comprueba el valor o paso `sue title for event` del proceso operativo.
  - **Dónde se usa:** [handler HTTP · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L792).
- [`normalizeFilePath(value: string)`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L280) · Función. Normaliza la ruta de archivo del proceso operativo.
  - **Tipo de retorno declarado:** `string`.
  - **Dónde se usa:** [`globToRegExp` · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L305), [`extractStackFiles` · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L345), [`resolveComponentByStack` · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L366).
- [`escapeRegexChar(char: string)`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L300) · Función. Implementa el paso `escape regex char` del proceso operativo.
  - **Dónde se usa:** [`globToRegExp` · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L319).
- [`globToRegExp(pattern: string)`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L304) · Función. Implementa el paso `glob to reg exp` del proceso operativo.
  - **Tipo de retorno declarado:** `RegExp`.
  - **Dónde se usa:** [`resolveComponentByStack` · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L368).
  - **Delega en:** [`normalizeFilePath`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L280), [`escapeRegexChar`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L300).
- [`globSpecificity(pattern: string)`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L326) · Función. Implementa el paso `glob specificity` del proceso operativo.
  - **Dónde se usa:** [`resolveComponentByStack` · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L371).
- [`parsePathGlobs(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L330) · Función. Interpreta el valor o paso `path globs` del proceso operativo.
  - **Tipo de retorno declarado:** `string[]`.
  - **Dónde se usa:** [`loadReleaseSnapshot` · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L434).
  - **Delega en:** [`safeArray`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L84), [`safeString`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L71).
- [`extractStackFiles(stackFramesRaw: unknown)`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L337) · Función. Implementa el paso `extract stack files` del proceso operativo.
  - **Tipo de retorno declarado:** `string[]`.
  - **Dónde se usa:** [handler HTTP · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L745).
  - **Delega en:** [`safeArray`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L84), [`safeObject`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L77), [`safeString`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L71), [`normalizeFilePath`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L280).
- [`resolveComponentByStack({ components, stackFiles })`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L351) · Función. Intenta asociar paths y frames de un stack a un componente de la versión registrada.
  - **Tipo de retorno declarado:** `SnapshotComponent | null`.
  - **Dónde se usa:** [handler HTTP · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L746).
  - **Delega en:** [`normalizeFilePath`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L280), [`globToRegExp`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L304), [`globSpecificity`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L326).
  - **Retornos explícitos:** null explícito.
- [`loadReleaseSnapshot({ tenantId, appId, envKey, versionLabel })`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L384) · Función, asíncrona. Obtiene el valor o paso `release snapshot` del proceso operativo.
  - **Tipo de retorno declarado:** `Promise<ReleaseSnapshot | null>`.
  - **Dónde se usa:** [handler HTTP · obs-ingest](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L715).
  - **Delega en:** [`safeString`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L71), [`safeInteger`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L89), [`parsePathGlobs`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L330).
  - **Relaciones consultadas en este cuerpo:** [`obs_release_snapshots`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L397) → [20260226_000019_obs_release_snapshots_and_component_resolution.sql](../../../apps/referidos-app/supabase/migrations/20260226_000019_obs_release_snapshots_and_component_resolution.sql#L6) (`select`), [`obs_release_snapshot_components`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L411) → [20260226_000019_obs_release_snapshots_and_component_resolution.sql](../../../apps/referidos-app/supabase/migrations/20260226_000019_obs_release_snapshots_and_component_resolution.sql#L33) (`select`).
  - **Retornos explícitos:** objeto con `id`, `version_label`, `version_release_id`, `source_commit_sha`, `components` · null explícito.
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L446) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `obs-ingest` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L42), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L52), [`getOptionalAuthedUser`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L295), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L341), [`safeString`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L71), [`resolveTenantIdByOrigin`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L377), [`resolveTenantIdByHint`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L391), [`sha256Hex`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L63), [`parseUserAgentSummary`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L256), [`extractRequestIds`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L274), [`currentRateCountByUser`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L404), [`currentRateCountByIp`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L418) y 26 más.
  - **Relaciones consultadas en este cuerpo:** [`obs_events`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L819) → [20260209_000004_observability_core.sql](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L93) (`insert`, `select`), [`obs_issues`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L901) → [20260209_000004_observability_core.sql](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L73) (`update`).
  - **RPC:** [`obs_upsert_issue`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L799) → [20260209_000004_observability_core.sql](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L239), [`obs_upsert_error_catalog`](../../../apps/referidos-app/supabase/functions/obs-ingest/index.ts#L910) → [20260213_000007_observability_error_catalog.sql](../../../apps/referidos-app/supabase/migrations/20260213_000007_observability_error_catalog.sql#L34).
  - **Propiedades de entrada leídas:** `body.events`, `body.tenant_hint`, `body.app_id`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `405` · encabezados leídos `origin`, `cf-connecting-ip`, `x-forwarded-for`, `x-real-ip`, `user-agent` · campos de respuesta `ok`, `code`, `message`, `inserted`, `skipped`, `reason`, `issue_count`, `errors`.
  - **Nombres de configuración consultada:** `SUPABASE_ENV`.

## `obs-policy/index.ts`

Carga obs_policy_rules y aplica predicados al contexto de evento o cliente. Devuelve política aplicable o valores por defecto. Permite ajustar muestreo y tratamiento sin reinstalar todos los clientes.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts)

- **Gateway:** [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L377).
- **Llamadas entrantes:** sin referencia literal encontrada en el monorepo. Puede estar invocada por configuración, un nombre dinámico o un sistema externo.
- **Importaciones locales:** [../_shared/observability.ts](../../../apps/referidos-app/supabase/functions/_shared/observability.ts) · `corsHeaders`, `getOptionalAuthedUser`, `getUsuarioByAuthId`, `jsonResponse`, `resolveTenantIdByHint`, `resolveTenantIdByOrigin`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.
- **Tipos declarados:** [`PolicyRule`](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L12) (`id`, `priority`, `scope`, `match`, `action`).

### Funciones, handlers y clases

- [`safeString(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L20) · Función. Normaliza de forma defensiva el texto del proceso operativo.
  - **Tipo de retorno declarado:** `string | null`.
  - **Dónde se usa:** [`toLower` · obs-policy](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L27), [`getInputContext` · obs-policy](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L37), [`ruleMatches` · obs-policy](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L47), [handler HTTP · obs-policy](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L171).
  - **Retornos explícitos:** null explícito.
- [`toLower(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L26) · Función. Convierte el valor o paso `lower` del proceso operativo.
  - **Tipo de retorno declarado:** `string | null`.
  - **Dónde se usa:** [`getInputContext` · obs-policy](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L36), [`ruleMatches` · obs-policy](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L46).
  - **Delega en:** [`safeString`](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L20).
- [`getInputContext(body: Record<string, unknown>)`](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L31) · Función. Obtiene el contexto de entrada a partir de la solicitud del proceso operativo.
  - **Dónde se usa:** [handler HTTP · obs-policy](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L184).
  - **Delega en:** [`toLower`](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L26), [`safeString`](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L20).
  - **Propiedades de entrada leídas:** `body.context`, `body.error_code`, `body.fingerprint`, `body.route`, `body.role`, `body.app_id`.
  - **Retornos explícitos:** objeto con `errorCode`, `fingerprint`, `route`, `role`, `appId`.
- [`ruleMatches(rule: PolicyRule, input: ReturnType)`](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L44) · Función. Verifica el valor o paso `ruleMatches` del proceso operativo.
  - **Dónde se usa:** [handler HTTP · obs-policy](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L201).
  - **Delega en:** [`toLower`](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L26), [`safeString`](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L20).
  - **Propiedades de entrada leídas:** `input.errorCode`, `input.fingerprint`, `input.route`, `input.role`, `input.appId`.
  - **Retornos explícitos:** booleanos explícitos.
- [`defaultPolicy(input: ReturnType)`](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L60) · Función. Implementa el paso `default policy` del proceso operativo.
  - **Dónde se usa:** [handler HTTP · obs-policy](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L202).
  - **Propiedades de entrada leídas:** `input.errorCode`.
  - **Retornos explícitos:** objeto con `ui`, `auth`, `retry`, `uam`.
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L140) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `obs-policy` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L42), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L52), [`getOptionalAuthedUser`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L295), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L341), [`resolveTenantIdByOrigin`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L377), [`resolveTenantIdByHint`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L391), [`safeString`](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L20), [`getInputContext`](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L31), [`ruleMatches`](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L44), [`defaultPolicy`](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L60).
  - **Relaciones consultadas en este cuerpo:** [`obs_policy_rules`](../../../apps/referidos-app/supabase/functions/obs-policy/index.ts#L185) → [20260209_000004_observability_core.sql](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L158) (`select`).
  - **Propiedades de entrada leídas:** `body.tenant_hint`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `405`, `500` · encabezados leídos `origin` · campos de respuesta `ok`, `code`, `message`, `tenant_id`, `matched_rule_id`, `action`.

## `obs-release-sync/index.ts`

Valida la credencial interna, consulta release, componentes y artefactos en OPS y prepara un snapshot con hash. Guarda los datos en el runtime para que la ingesta y la symbolication resuelvan una versión sin consultar OPS por cada evento.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts)

- **Gateway:** [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L383).
- **Referencias literales al nombre del endpoint:** [versioning-deploy-callback](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L204).
- **Importaciones locales:** [../_shared/observability.ts](../../../apps/referidos-app/supabase/functions/_shared/observability.ts) · `corsHeaders`, `jsonResponse`, `resolveTenantIdByHint`, `sha256Hex`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`, `https://esm.sh/@supabase/supabase-js@2`.
- **Configuración que lee al inicializarse:** `VERSIONING_OPS_URL`, `VERSIONING_OPS_SECRET_KEY`, `OBS_RELEASE_SYNC_TOKEN`.
- **Tipos declarados:** [`JsonObject`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L11).

### Funciones, handlers y clases

- [`asString(value: unknown, fallback = …)`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L16) · Función. Convierte una entrada en texto utilizable y aplica el fallback recibido cuando la entrada no aporta un valor válido.
  - **Tipo de retorno declarado:** `string`.
  - **Dónde se usa:** [ámbito de módulo · obs-release-sync](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L62), [`resolveTenantId` · obs-release-sync](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L94), [`fetchReleaseSnapshotFromOps` · obs-release-sync](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L157), [`buildSnapshotHash` · obs-release-sync](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L239), [handler HTTP · obs-release-sync](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L265).
- [`asObject(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L22) · Función. Normaliza una entrada a un objeto de propiedades para consumir payloads opcionales.
  - **Tipo de retorno declarado:** `JsonObject`.
  - **Dónde se usa:** [handler HTTP · obs-release-sync](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L279).
- [`asArray(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L29) · Función. Reduce una entrada desconocida a una lista para que los consumidores puedan iterar con seguridad.
  - **Tipo de retorno declarado:** `unknown[]`.
  - **Dónde se usa:** [`buildSnapshotHash` · obs-release-sync](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L242), [handler HTTP · obs-release-sync](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L419).
- [`parseInteger(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L34) · Función. Interpreta la entrada a un entero del proceso operativo.
  - **Tipo de retorno declarado:** `number | null`.
  - **Dónde se usa:** [`buildSnapshotHash` · obs-release-sync](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L241), [handler HTTP · obs-release-sync](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L322).
  - **Retornos explícitos:** null explícito.
- [`parseBoolean(value: unknown, fallback = …)`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L42) · Función. Interpreta la señal booleana del proceso operativo.
  - **Tipo de retorno declarado:** `boolean`.
  - **Dónde se usa:** [handler HTTP · obs-release-sync](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L278).
- [`asJsonObject(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L47) · Función. Normaliza campos JSON opcionales antes de combinar sus propiedades.
  - **Tipo de retorno declarado:** `JsonObject`.
  - **Dónde se usa:** [`mergeMeta` · obs-release-sync](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L54).
- [`mergeMeta(base: JsonObject, next: JsonObject)`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L52) · Función. Consolida el valor o paso `meta` del proceso operativo.
  - **Tipo de retorno declarado:** `JsonObject`.
  - **Dónde se usa:** [handler HTTP · obs-release-sync](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L388).
  - **Delega en:** [`asJsonObject`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L47).
- [`ensureRuntimeEnv()`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L73) · Función. Verifica o prepara el valor o paso `runtime env` del proceso operativo.
  - **Dónde se usa:** [handler HTTP · obs-release-sync](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L260).
  - **Retornos explícitos:** objeto con `ok`, `error`, `detail`.
- [`resolveTenantId(tenantHint: string)`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L85) · Función, asíncrona. Determina el tenant cuyo ámbito se usará en las consultas del endpoint.
  - **Tipo de retorno declarado:** `Promise<string | null>`.
  - **Dónde se usa:** [handler HTTP · obs-release-sync](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L296).
  - **Delega en:** [`resolveTenantIdByHint`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L391), [`asString`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L16).
  - **Relaciones consultadas en este cuerpo:** [`tenants`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L88) → [20260209_000004_observability_core.sql](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L6) (`select`).
- [`fetchReleaseSnapshotFromOps({ productKey, envKey, semver, releaseId })`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L97) · Función, asíncrona. Recupera el snapshot remoto que enriquece la atribución de versión en el runtime.
  - **Dónde se usa:** [handler HTTP · obs-release-sync](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L310).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L16).
  - **Relaciones consultadas en este cuerpo:** [`version_releases_labeled`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L108) → [20260220_000014_versioning_system.sql](../../../apps/referidos-app/supabase/migrations/20260220_000014_versioning_system.sql#L350) (`select`), [`version_release_components_labeled`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L158) → [20260220_000014_versioning_system.sql](../../../apps/referidos-app/supabase/migrations/20260220_000014_versioning_system.sql#L404) (`select`), [`version_component_paths`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L193) → [20260220_000014_versioning_system.sql](../../../apps/referidos-app/supabase/migrations/20260220_000014_versioning_system.sql#L109) (`select`), [`version_release_artifacts_labeled`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L211) (`select`).
  - **Retornos explícitos:** objeto con `release`, `artifact_id`, `components`, `path_globs`.
- [`buildSnapshotHash(releaseId: string, components: JsonObject[])`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L236) · Función, asíncrona. Genera una huella para comparar el conjunto de filas de un catálogo con la versión anterior.
  - **Dónde se usa:** [handler HTTP · obs-release-sync](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L331).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L16), [`parseInteger`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L34), [`asArray`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L29), [`sha256Hex`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L63).
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L250) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `obs-release-sync` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L42), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L52), [`ensureRuntimeEnv`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L73), [`asString`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L16), [`parseBoolean`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L42), [`asObject`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L22), [`resolveTenantId`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L85), [`fetchReleaseSnapshotFromOps`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L97), [`parseInteger`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L34), [`buildSnapshotHash`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L236), [`mergeMeta`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L52), [`asArray`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L29).
  - **Relaciones consultadas en este cuerpo:** [`obs_release_snapshots`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L333) → [20260226_000019_obs_release_snapshots_and_component_resolution.sql](../../../apps/referidos-app/supabase/migrations/20260226_000019_obs_release_snapshots_and_component_resolution.sql#L6) (`select`, `upsert`), [`obs_release_snapshot_components`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L402) → [20260226_000019_obs_release_snapshots_and_component_resolution.sql](../../../apps/referidos-app/supabase/migrations/20260226_000019_obs_release_snapshots_and_component_resolution.sql#L33) (`delete`, `insert`), [`obs_releases`](../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts#L438) → [20260209_000004_observability_core.sql](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L170) (`select`, `upsert`).
  - **Integraciones:** `fetchReleaseSnapshotFromOps`.
  - **Propiedades de entrada leídas:** `body.tenant_hint`, `body.app_id`, `body.product_key`, `body.env_key`, `body.semver`, `body.version_label`, `body.release_id`, `body.actor`, `body.force`, `body.metadata`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `405`, `500` · encabezados leídos `origin` · campos de respuesta `ok`, `error`, `detail`, `tenant_id`, `app_id`, `product_key`, `env_key`, `version_label`, `version_release_id`, `snapshot_id`, `snapshot_hash`, `component_count`, `skipped_by_hash`.

## `obs-release/index.ts`

Registra app, entorno e identidad de build en obs_releases. Combina metadatos de una fila existente para que el primer evento y el pipeline converjan en un registro de release reutilizable.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/obs-release/index.ts)

- **Gateway:** [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L374).
- **Referencias literales al nombre del endpoint:** [prelaunchObservability.js](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L55), [loggingClient.js](../../../apps/referidos-app/src/services/loggingClient.js#L86).
- **Importaciones locales:** [../_shared/observability.ts](../../../apps/referidos-app/supabase/functions/_shared/observability.ts) · `corsHeaders`, `getOptionalAuthedUser`, `getUsuarioByAuthId`, `jsonResponse`, `resolveTenantIdByHint`, `resolveTenantIdByOrigin`, `scrubUnknown`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`safeString(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-release/index.ts#L13) · Función. Normaliza de forma defensiva el texto del proceso operativo.
  - **Tipo de retorno declarado:** `string | null`.
  - **Dónde se usa:** [handler HTTP · obs-release](../../../apps/referidos-app/supabase/functions/obs-release/index.ts#L64).
  - **Retornos explícitos:** null explícito.
- [`safeObject(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-release/index.ts#L19) · Función. Normaliza de forma defensiva el objeto de propiedades del proceso operativo.
  - **Tipo de retorno declarado:** `Record<string, unknown>`.
  - **Dónde se usa:** [`mergeMeta` · obs-release](../../../apps/referidos-app/supabase/functions/obs-release/index.ts#L40), [handler HTTP · obs-release](../../../apps/referidos-app/supabase/functions/obs-release/index.ts#L110).
- [`safeInteger(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-release/index.ts#L26) · Función. Normaliza de forma defensiva la entrada a un entero del proceso operativo.
  - **Tipo de retorno declarado:** `number | null`.
  - **Dónde se usa:** [handler HTTP · obs-release](../../../apps/referidos-app/supabase/functions/obs-release/index.ts#L112).
  - **Retornos explícitos:** null explícito.
- [`mergeMeta(base: Record<string, unknown>, next: Record<string, unknown>)`](../../../apps/referidos-app/supabase/functions/obs-release/index.ts#L34) · Función. Consolida el valor o paso `meta` del proceso operativo.
  - **Dónde se usa:** [handler HTTP · obs-release](../../../apps/referidos-app/supabase/functions/obs-release/index.ts#L134).
  - **Delega en:** [`safeObject`](../../../apps/referidos-app/supabase/functions/obs-release/index.ts#L19).
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/obs-release/index.ts#L49) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `obs-release` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L42), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L52), [`safeString`](../../../apps/referidos-app/supabase/functions/obs-release/index.ts#L13), [`getOptionalAuthedUser`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L295), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L341), [`resolveTenantIdByOrigin`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L377), [`resolveTenantIdByHint`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L391), [`scrubUnknown`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L95), [`safeObject`](../../../apps/referidos-app/supabase/functions/obs-release/index.ts#L19), [`safeInteger`](../../../apps/referidos-app/supabase/functions/obs-release/index.ts#L26), [`mergeMeta`](../../../apps/referidos-app/supabase/functions/obs-release/index.ts#L34).
  - **Relaciones consultadas en este cuerpo:** [`obs_releases`](../../../apps/referidos-app/supabase/functions/obs-release/index.ts#L123) → [20260209_000004_observability_core.sql](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L170) (`select`, `upsert`).
  - **Propiedades de entrada leídas:** `body.app_id`, `body.app_version`, `body.tenant_hint`, `body.build_id`, `body.env`, `body.meta`, `body.build_number`, `body.version_release_id`, `body.artifact_id`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `405`, `500` · encabezados leídos `origin` · campos de respuesta `ok`, `code`, `message`, `release`.

## `obs-symbolicate/index.ts`

Comprueba actor y acceso al evento, carga el manifiesto y mapas de la release, resuelve frames minificados y escribe el resultado y estado de symbolication. Elige eventos individuales o de una incidencia y reutiliza mapas según su ciclo de caché.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/obs-symbolicate/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L453).
- **Referencias literales al nombre del endpoint:** [IssuesTable.jsx](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L756), [IssuesTable.jsx](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L787), [adminOps.ts](../../../apps/referidos-android/src/shared/services/adminOps.ts#L190).
- **Importaciones locales:** [../_shared/observability.ts](../../../apps/referidos-app/supabase/functions/_shared/observability.ts) · `corsHeaders`, `getOptionalAuthedUser`, `getUsuarioByAuthId`, `jsonResponse`, `parseStackFramesRaw`, `scrubUnknown`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`, `npm:source-map-js@1.2.1`.
- **Tipos declarados:** [`ObsEventRecord`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L20) (`id`, `tenant_id`, `issue_id`, `user_id`, `app_id`, `release`, `message`, `stack_raw`, `stack_preview`, `stack_frames_raw`, `symbolicated_stack`, `symbolicated_at`, `symbolication_type`, `symbolication_status`, `symbolication_release`), [`ReleaseRecord`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L38) (`id`, `app_id`, `app_version`, `build_id`, `env`, `meta`), [`SourcemapManifest`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L175) (`release_key`, `maps`).

### Funciones, handlers y clases

- [`safeString(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L47) · Función. Normaliza de forma defensiva el texto del proceso operativo.
  - **Tipo de retorno declarado:** `string | null`.
  - **Dónde se usa:** [`normalizedFrameFile` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L83), [`loadReleaseForEvent` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L133), [`loadManifest` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L186), [`buildManifestLookup` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L219), [`normalizeEnvKey` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L263), [`inferEventEnv` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L269), 5 más en el código.
  - **Retornos explícitos:** null explícito.
- [`safeObject(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L53) · Función. Normaliza de forma defensiva el objeto de propiedades del proceso operativo.
  - **Tipo de retorno declarado:** `Record<string, unknown>`.
  - **Dónde se usa:** [`isCacheValid` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L75), [`loadReleaseForEvent` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L132), [`loadManifest` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L184), [`inferEventEnv` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L268), [`resolveErrorExcerpt` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L339), [`applySymbolicationToEvent` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L506).
- [`safeArray(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L60) · Función. Normaliza de forma defensiva la lista del proceso operativo.
  - **Tipo de retorno declarado:** `Array<Record<string, unknown>>`.
  - **Dónde se usa:** [`resolveErrorExcerpt` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L341), [`buildDevPassthroughPayload` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L375), [`applySymbolicationToEvent` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L572).
- [`cacheMsForType(value: string | null)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L65) · Función. Implementa el paso `cache ms for type` del proceso operativo.
  - **Dónde se usa:** [`isCacheValid` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L79).
- [`normalizeCacheType(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L69) · Función. Normaliza el tipo de respuesta que entra a la caché del proceso operativo.
  - **Dónde se usa:** [handler HTTP · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L721).
- [`isCacheValid(eventRow: ObsEventRecord, nowMs: number)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L73) · Función. Decide si la fila cacheada sigue vigente para la operación.
  - **Dónde se usa:** [`applySymbolicationToEvent` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L470).
  - **Delega en:** [`safeObject`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L53), [`cacheMsForType`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L65).
  - **Retornos explícitos:** booleanos explícitos.
- [`normalizedFrameFile(input: unknown)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L82) · Función. Normaliza el valor o paso `d frame file` del proceso operativo.
  - **Tipo de retorno declarado:** `string | null`.
  - **Dónde se usa:** [`buildManifestLookup` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L218), [`buildDevPassthroughPayload` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L390), [`applySymbolicationToEvent` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L582).
  - **Delega en:** [`safeString`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L47).
  - **Retornos explícitos:** null explícito.
- [`frameBasename(input: string | null)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L101) · Función. Implementa el paso `frame basename` del proceso operativo.
  - **Tipo de retorno declarado:** `string | null`.
  - **Dónde se usa:** [`buildManifestLookup` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L222), [`applySymbolicationToEvent` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L583).
  - **Retornos explícitos:** null explícito.
- [`blobToText(data: unknown)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L107) · Función, asíncrona. Implementa el paso `blob to text` del proceso operativo.
  - **Tipo de retorno declarado:** `Promise<string | null>`.
  - **Dónde se usa:** [`loadManifest` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L199), [`loadSourceMapConsumer` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L245).
  - **Retornos explícitos:** null explícito.
- [`canSupportAccessUser(supportAgentId: string, userId: string | null)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L115) · Función, asíncrona. Comprueba el valor o paso `support access user` del proceso operativo.
  - **Tipo de retorno declarado:** `Promise<boolean>`.
  - **Dónde se usa:** [handler HTTP · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L803).
  - **Relaciones consultadas en este cuerpo:** [`support_threads`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L120) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L252) (`select`).
  - **Retornos explícitos:** booleanos explícitos.
- [`loadReleaseForEvent(eventRow: ObsEventRecord)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L131) · Función, asíncrona. Obtiene el valor o paso `release for event` del proceso operativo.
  - **Tipo de retorno declarado:** `Promise<ReleaseRecord | null>`.
  - **Dónde se usa:** [`applySymbolicationToEvent` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L504).
  - **Delega en:** [`safeObject`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L53), [`safeString`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L47).
  - **Relaciones consultadas en este cuerpo:** [`obs_releases`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L138) → [20260209_000004_observability_core.sql](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L170) (`select`).
  - **Retornos explícitos:** null explícito.
- [`loadManifest(releaseRow: ReleaseRecord)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L183) · Función, asíncrona. Recupera el manifiesto que permite asociar archivos de release con sus mapas.
  - **Dónde se usa:** [`applySymbolicationToEvent` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L539).
  - **Delega en:** [`safeObject`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L53), [`safeString`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L47), [`blobToText`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L107).
  - **Retornos explícitos:** objeto con `ok`, `code`, `bucket`, `manifest`.
- [`buildManifestLookup(manifest: SourcemapManifest)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L212) · Función. Compone el valor o paso `manifest lookup` del proceso operativo.
  - **Dónde se usa:** [`applySymbolicationToEvent` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L569).
  - **Delega en:** [`normalizedFrameFile`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L82), [`safeString`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L47), [`frameBasename`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L101).
  - **Retornos explícitos:** objeto con `byFile`, `byBasename`.
- [`loadSourceMapConsumer(bucket: string, mapPath: string, cache: Map<string, SourceMapConsumer>)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L231) · Función, asíncrona. Obtiene el lector del sourcemap correspondiente al archivo compilado.
  - **Dónde se usa:** [`applySymbolicationToEvent` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L595).
  - **Delega en:** [`blobToText`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L107), `SourceMapConsumer`.
  - **Retornos explícitos:** null explícito.
- [`releaseLabel(releaseRow: ReleaseRecord)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L257) · Función. Implementa el paso `release label` del proceso operativo.
  - **Dónde se usa:** [`applySymbolicationToEvent` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L547).
- [`normalizeEnvKey(value: string | null)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L262) · Función. Normaliza la clave de entorno que identifica el destino del proceso operativo.
  - **Tipo de retorno declarado:** `string`.
  - **Dónde se usa:** [`inferEventEnv` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L267), [`isDevLikeEnv` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L273).
  - **Delega en:** [`safeString`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L47).
- [`inferEventEnv(eventRow: ObsEventRecord, releaseRow: ReleaseRecord | null)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L266) · Función. Determina el ambiente que se registra en el evento del proceso operativo.
  - **Dónde se usa:** [`applySymbolicationToEvent` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L541).
  - **Delega en:** [`normalizeEnvKey`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L262), [`safeObject`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L53), [`safeString`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L47).
- [`isDevLikeEnv(value: string | null)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L272) · Función. Comprueba el valor o paso `dev like env` del proceso operativo.
  - **Dónde se usa:** [`applySymbolicationToEvent` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L508).
  - **Delega en:** [`normalizeEnvKey`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L262).
- [`finiteNumber(value: unknown)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L277) · Función. Implementa el paso `finite number` del proceso operativo.
  - **Tipo de retorno declarado:** `number | null`.
  - **Dónde se usa:** [`buildDevPassthroughPayload` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L384).
  - **Retornos explícitos:** null explícito.
- [`splitSourceLines(sourceText: string)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L283) · Función. Implementa el paso `split source lines` del proceso operativo.
  - **Dónde se usa:** [`applySymbolicationToEvent` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L611).
- [`sanitizeSourceLine(value: string)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L287) · Función. Sanea la línea de código que entra al fragmento del error del proceso operativo.
  - **Dónde se usa:** [`buildSourceExcerptFromLines` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L308).
- [`buildSourceExcerptFromLines(sourceLines: string[], errorLine: number, errorColumn: number | null)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L293) · Función. Compone el fragmento fuente a mostrar a partir de las líneas disponibles del proceso operativo.
  - **Dónde se usa:** [`applySymbolicationToEvent` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L616).
  - **Delega en:** [`sanitizeSourceLine`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L287).
  - **Retornos explícitos:** objeto con `start_line`, `end_line`, `error_line`, `error_column`, `lines` · null explícito.
- [`isAppSourcePath(source: string | null)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L322) · Función. Comprueba el valor o paso `app source path` del proceso operativo.
  - **Dónde se usa:** [`resolveErrorExcerpt` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L350).
  - **Delega en:** [`safeString`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L47).
  - **Retornos explícitos:** booleanos explícitos.
- [`resolveErrorExcerpt(frames: Array<Record<string, unknown>>)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L336) · Función. Obtiene el fragmento que se muestra para inspeccionar el lugar original del error.
  - **Dónde se usa:** [`applySymbolicationToEvent` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L658).
  - **Delega en:** [`safeObject`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L53), [`safeArray`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L60), [`safeString`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L47), [`isAppSourcePath`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L322).
  - **Retornos explícitos:** objeto con `source`, `line`, `column`, `frame_name`, `excerpt` · null explícito.
- [`buildDevPassthroughPayload(eventRow: ObsEventRecord)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L374) · Función. Compone el valor o paso `dev passthrough payload` del proceso operativo.
  - **Dónde se usa:** [`persistDevPassthroughSymbolication` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L436).
  - **Delega en:** [`safeArray`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L60), [`parseStackFramesRaw`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L207), [`scrubUnknown`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L95), [`safeString`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L47), [`finiteNumber`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L277), [`normalizedFrameFile`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L82).
  - **Retornos explícitos:** objeto con `generated_file`, `map_path`, `symbolicated`, `original`, `payload`, `symbolicatedCount`.
- [`persistDevPassthroughSymbolication({ eventRow, actorUserId, cacheType, nowIso, releaseName, status })`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L421) · Función, asíncrona. Actualiza el valor o paso `dev passthrough symbolication` del proceso operativo.
  - **Dónde se usa:** [`applySymbolicationToEvent` · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L513).
  - **Delega en:** [`buildDevPassthroughPayload`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L374).
  - **Relaciones consultadas en este cuerpo:** [`obs_events`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L437) → [20260209_000004_observability_core.sql](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L93) (`update`).
  - **Retornos explícitos:** objeto con `ok`, `cached`, `event_id`, `symbolicated_stack`, `symbolication_status`, `symbolicated_at`, `symbolication_type`, `symbolication_release`.
- [`applySymbolicationToEvent(eventRow: ObsEventRecord, actorUserId: string, cacheType: literal, force: boolean)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L461) · Función, asíncrona. Enriquece un evento con frames transformados y actualiza el resultado de simbolicación.
  - **Dónde se usa:** [handler HTTP · obs-symbolicate](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L806).
  - **Delega en:** [`isCacheValid`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L73), [`loadReleaseForEvent`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L131), [`safeObject`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L53), [`safeString`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L47), [`isDevLikeEnv`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L272), [`persistDevPassthroughSymbolication`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L421), [`loadManifest`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L183), [`inferEventEnv`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L266), [`releaseLabel`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L257), [`buildManifestLookup`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L212), [`safeArray`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L60), [`parseStackFramesRaw`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L207) y 7 más.
  - **Relaciones consultadas en este cuerpo:** [`obs_events`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L472) → [20260209_000004_observability_core.sql](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L93) (`update`).
  - **Retornos explícitos:** objeto con `ok`, `cached`, `event_id`, `symbolicated_stack`, `symbolication_status`, `symbolicated_at`, `symbolication_type`, `symbolication_release`, `code`.
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L705) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `obs-symbolicate` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L42), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L52), [`safeString`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L47), [`normalizeCacheType`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L69), [`getOptionalAuthedUser`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L295), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/observability.ts#L341), [`canSupportAccessUser`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L115), [`applySymbolicationToEvent`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L461).
  - **Relaciones consultadas en este cuerpo:** [`obs_events`](../../../apps/referidos-app/supabase/functions/obs-symbolicate/index.ts#L777) → [20260209_000004_observability_core.sql](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L93) (`select`).
  - **Propiedades de entrada leídas:** `body.action`, `body.cache_type`, `body.force`, `body.event_id`, `body.issue_id`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `500` · encabezados leídos `origin` · campos de respuesta `ok`, `code`, `message`, `action`, `issue_id`, `total`, `processed`, `cached`, `failed`, `results`, `event_id`, `result`.

## `ops-telemetry-admin-proxy/index.ts`

Valida el perfil administrador en runtime y despacha únicamente acciones permitidas para resumen, grupos y eventos de la próxima purga. Consulta los RPC de OPS con credenciales de servidor para mantener el acceso al proyecto central fuera del cliente.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/config.toml).
- **Referencias literales al nombre del endpoint:** [opsTelemetryDlqService.js](../../../apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js#L4).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`, `https://esm.sh/@supabase/supabase-js@2`.
- **Configuración que lee al inicializarse:** `SUPPORT_OPS_URL`, `SUPPORT_OPS_SECRET_KEY`.
- **Tipos declarados:** [`JsonObject`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L10).

### Funciones, handlers y clases

- [`asString(value: unknown, fallback = …)`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L17) · Función. Convierte una entrada en texto utilizable y aplica el fallback recibido cuando la entrada no aporta un valor válido.
  - **Dónde se usa:** [ámbito de módulo · ops-telemetry-admin-proxy](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L42), [`handleAction` · ops-telemetry-admin-proxy](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L99), [handler HTTP · ops-telemetry-admin-proxy](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L167).
- [`asObject(value: unknown)`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L23) · Función. Normaliza una entrada a un objeto de propiedades para consumir payloads opcionales.
  - **Tipo de retorno declarado:** `JsonObject`.
  - **Dónde se usa:** [`handleAction` · ops-telemetry-admin-proxy](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L119), [handler HTTP · ops-telemetry-admin-proxy](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L166).
- [`asNumber(value: unknown, fallback = …)`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L29) · Función. Normaliza un valor numérico con el fallback previsto por el llamador.
  - **Dónde se usa:** [`normalizeLimit` · ops-telemetry-admin-proxy](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L35), [`normalizeOffset` · ops-telemetry-admin-proxy](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L39), [`handleAction` · ops-telemetry-admin-proxy](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L112).
- [`normalizeLimit(value: unknown, fallback = …, min = …, max = …)`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L34) · Función. Normaliza el límite de paginación o procesamiento del proceso operativo.
  - **Dónde se usa:** [`handleAction` · ops-telemetry-admin-proxy](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L66).
  - **Delega en:** [`asNumber`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L29).
- [`normalizeOffset(value: unknown, fallback = …)`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L38) · Función. Normaliza el desplazamiento de paginación del proceso operativo.
  - **Dónde se usa:** [`handleAction` · ops-telemetry-admin-proxy](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L101).
  - **Delega en:** [`asNumber`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L29).
- [`ensureEnv()`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L45) · Función. Verifica o prepara el valor o paso `env` del proceso operativo.
  - **Dónde se usa:** [handler HTTP · ops-telemetry-admin-proxy](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L142).
  - **Retornos explícitos:** objeto con `ok`, `error`, `detail`.
- [`handleAction(action: string, payload: JsonObject)`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L63) · Función, asíncrona. Implementa el paso `handle action` del proceso operativo.
  - **Dónde se usa:** [handler HTTP · ops-telemetry-admin-proxy](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L183).
  - **Delega en:** [`normalizeLimit`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L34), [`asString`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L17), [`normalizeOffset`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L38), [`asNumber`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L29), [`asObject`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L23).
  - **RPC:** [`ops_telemetry_ingest_dlq_summary_for_next_purge`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L72), [`ops_telemetry_ingest_dlq_groups_for_next_purge`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L73), [`ops_telemetry_ingest_dlq_events_for_next_purge`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L103).
  - **Propiedades de entrada leídas:** `payload.limit`, `payload.groupKey`, `payload.offset`.
  - **Retornos explícitos:** objeto con `summary`, `groups`, `total_count`, `next_purge_at`, `events`.
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L131) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `ops-telemetry-admin-proxy` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`ensureEnv`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L45), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`asObject`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L23), [`asString`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L17), [`handleAction`](../../../apps/referidos-app/supabase/functions/ops-telemetry-admin-proxy/index.ts#L63).
  - **Propiedades de entrada leídas:** `body.action`, `body.payload`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `detail`, `action`, `data`.

## `ops-telemetry-sync-dispatch/index.ts`

Autoriza llamada operativa o cron, reclama filas de ops_sync_outbox y las remite a la ingesta OPS en lotes. Separa aceptados de errores y marca reintentos con demora. El modo programado y el modo de panel comparten un contrato de ingestión.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts)

- **Gateway:** [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L386).
- **Referencias literales al nombre del endpoint:** [useOpsTelemetryHotSync.js](../../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js#L30), [20260301_000022_ops_telemetry_outbox_sync.sql](../../../apps/referidos-app/supabase/migrations/20260301_000022_ops_telemetry_outbox_sync.sql#L333), [SupportInbox.jsx](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L310).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.
- **Configuración que lee al inicializarse:** `OPS_TELEMETRY_INGEST_URL`, `OPS_TELEMETRY_SHARED_TOKEN`, `OPS_TELEMETRY_SOURCE_PROJECT_REF`, `OPS_TELEMETRY_SOURCE_ENV_KEY`, `OPS_TELEMETRY_CRON_TOKEN`, `OPS_TELEMETRY_HOT_BATCH_LIMIT`, `OPS_TELEMETRY_COLD_BATCH_LIMIT`.
- **Tipos declarados:** [`JsonObject`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L10), [`OutboxRow`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L12) (`id`, `tenant_id`, `domain`, `source_table`, `source_row_id`, `source_event_key`, `source_app_id`, `event_type`, `occurred_at`, `retention_tier`, `payload`, `attempts`), [`RuntimeConfigRow`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L27) (`cron_token`, `enabled`).

### Funciones, handlers y clases

- [`asString(value: unknown, fallback = …)`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L32) · Función. Convierte una entrada en texto utilizable y aplica el fallback recibido cuando la entrada no aporta un valor válido.
  - **Dónde se usa:** [ámbito de módulo · ops-telemetry-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L68), [`validateCronToken` · ops-telemetry-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L83), [handler HTTP · ops-telemetry-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L175).
- [`asBoolean(value: unknown, fallback = …)`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L38) · Función. Normaliza una opción booleana sin delegar la interpretación al consumidor.
  - **Dónde se usa:** [handler HTTP · ops-telemetry-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L211).
- [`asNumber(value: unknown, fallback: number)`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L43) · Función. Normaliza un valor numérico con el fallback previsto por el llamador.
  - **Dónde se usa:** [`clampLimit` · ops-telemetry-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L50).
- [`clampLimit(value: unknown, fallback: number)`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L49) · Función. Acota el límite de paginación o procesamiento del proceso operativo.
  - **Dónde se usa:** [ámbito de módulo · ops-telemetry-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L73), [handler HTTP · ops-telemetry-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L210).
  - **Delega en:** [`asNumber`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L43).
- [`backoffMinutes(attempts: number)`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L54) · Función. Implementa el paso `backoff minutes` del proceso operativo.
  - **Dónde se usa:** [`nextRetryIso` · ops-telemetry-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L60).
- [`nextRetryIso(attempts: number)`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L59) · Función. Ubica la próxima ventana de reintento de una entrega de telemetría.
  - **Dónde se usa:** [`markRowsFailed` · ops-telemetry-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L144).
  - **Delega en:** [`backoffMinutes`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L54).
- [`isObject(value: unknown)`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L64) · Función. Comprueba el objeto de propiedades del proceso operativo.
  - **Dónde se usa:** [`claimRows` · ops-telemetry-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L121).
- [`validateCronToken(token: string)`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L82) · Función, asíncrona. Comprueba la identidad del canal de tareas programadas antes de aceptar despacho interno.
  - **Dónde se usa:** [handler HTTP · ops-telemetry-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L176).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L32).
  - **Relaciones consultadas en este cuerpo:** [`ops_sync_runtime_config`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L87) → [20260301_000022_ops_telemetry_outbox_sync.sql](../../../apps/referidos-app/supabase/migrations/20260301_000022_ops_telemetry_outbox_sync.sql#L66) (`select`).
  - **Retornos explícitos:** booleanos explícitos.
- [`ensureEnv()`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L101) · Función. Verifica o prepara el valor o paso `env` del proceso operativo.
  - **Dónde se usa:** [handler HTTP · ops-telemetry-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L171).
  - **Retornos explícitos:** objeto con `ok`, `error`, `detail`.
- [`claimRows(limit: number)`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L113) · Función, asíncrona. Reserva filas de la cola de despacho para evitar procesarlas a la vez desde la misma ruta de trabajo.
  - **Dónde se usa:** [handler HTTP · ops-telemetry-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L216).
  - **Delega en:** [`isObject`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L64).
  - **RPC:** [`ops_sync_claim_outbox`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L114) → [20260301_000022_ops_telemetry_outbox_sync.sql](../../../apps/referidos-app/supabase/migrations/20260301_000022_ops_telemetry_outbox_sync.sql#L200).
- [`markRowsSent(rowIds: string[])`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L125) · Función, asíncrona. Marca como entregadas las filas que la ingesta remota aceptó.
  - **Dónde se usa:** [handler HTTP · ops-telemetry-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L326).
  - **Relaciones consultadas en este cuerpo:** [`ops_sync_outbox`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L127) → [20260301_000022_ops_telemetry_outbox_sync.sql](../../../apps/referidos-app/supabase/migrations/20260301_000022_ops_telemetry_outbox_sync.sql#L26) (`update`).
- [`markRowsFailed(rows: OutboxRow[], reason: string)`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L139) · Función, asíncrona. Devuelve las filas fallidas al control de reintentos con los datos del resultado.
  - **Dónde se usa:** [handler HTTP · ops-telemetry-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L280).
  - **Delega en:** [`nextRetryIso`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L59).
  - **Relaciones consultadas en este cuerpo:** [`ops_sync_outbox`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L148) → [20260301_000022_ops_telemetry_outbox_sync.sql](../../../apps/referidos-app/supabase/migrations/20260301_000022_ops_telemetry_outbox_sync.sql#L26) (`update`).
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L160) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `ops-telemetry-sync-dispatch` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`ensureEnv`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L101), [`asString`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L32), [`validateCronToken`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L82), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`clampLimit`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L49), [`asBoolean`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L38), [`claimRows`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L113), [`markRowsFailed`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L139), [`markRowsSent`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts#L125).
  - **Integraciones:** `fetch`.
  - **Propiedades de entrada leídas:** `body.mode`, `body.limit`, `body.force`, `body.panel_key`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `401`, `403`, `404`, `405`, `500`, `502` · encabezados leídos `origin`, `x-ops-sync-cron-token`, `authorization` · campos de respuesta `ok`, `error`, `detail`, `mode`, `actor`, `panel_key`, `force`, `claimed`, `sent`, `failed`.

## `versioning-deploy-callback/index.ts`

Consume el callback autenticado de un deploy en el camino histórico del runtime y finaliza la solicitud por RPC. La función equivalente de OPS registra también el contrato central de artefactos y observabilidad.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/versioning-deploy-callback/index.ts)

- **Gateway:** [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L371).
- **Referencias literales al nombre del endpoint:** [versioning-deploy-execute](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L52), [versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L76). El nombre también existe en el otro proyecto. Confirma el proyecto de destino en la llamada.
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `jsonResponse`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`asString(value: unknown, fallback = …)`](../../../apps/referidos-app/supabase/functions/versioning-deploy-callback/index.ts#L6) · Función. Convierte una entrada en texto utilizable y aplica el fallback recibido cuando la entrada no aporta un valor válido.
  - **Dónde se usa:** [handler HTTP · versioning-deploy-callback](../../../apps/referidos-app/supabase/functions/versioning-deploy-callback/index.ts#L32).
- [`corsWithCallbackHeader(origin: string | null)`](../../../apps/referidos-app/supabase/functions/versioning-deploy-callback/index.ts#L12) · Función. Añade soporte de CORS para el canal servidor del callback.
  - **Dónde se usa:** [handler HTTP · versioning-deploy-callback](../../../apps/referidos-app/supabase/functions/versioning-deploy-callback/index.ts#L23).
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34).
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/versioning-deploy-callback/index.ts#L21) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `versioning-deploy-callback` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsWithCallbackHeader`](../../../apps/referidos-app/supabase/functions/versioning-deploy-callback/index.ts#L12), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`asString`](../../../apps/referidos-app/supabase/functions/versioning-deploy-callback/index.ts#L6).
  - **RPC:** [`versioning_finalize_deploy_request`](../../../apps/referidos-app/supabase/functions/versioning-deploy-callback/index.ts#L73) → [20260224_000018_versioning_deploy_artifact_finalize.sql](../../../apps/referidos-app/supabase/migrations/20260224_000018_versioning_deploy_artifact_finalize.sql#L157).
  - **Propiedades de entrada leídas:** `body.request_id`, `body.actor`, `body.deployment_id`, `body.logs_url`, `body.status`, `body.metadata`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `405`, `500` · encabezados leídos `origin` · campos de respuesta `ok`, `error`, `detail`, `request_id`, `deployment_row_id`, `status`.
  - **Nombres de configuración consultada:** `VERSIONING_DEPLOY_CALLBACK_TOKEN`.

## `versioning-deploy-execute/index.ts`

Función histórica que lee solicitudes y promociones del runtime, verifica entorno y commit y llama al workflow. Conserva la ruta de compatibilidad distinta de la ejecución actual administrada en OPS.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts)

- **Referencias literales al nombre del endpoint:** [versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L655), [versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L687). El nombre también existe en el otro proyecto. Confirma el proyecto de destino en la llamada.
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `resolveUsuarioProfileFailure`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.
- **Tipos declarados:** [`DeployRequestRow`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L11) (`id`, `release_id`, `product_key`, `env_key`, `version_label`, `status`, `requested_by`, `admin_override`), [`BranchCheckResult`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L22) (`ok`, `inBranch`, `statusCode`, `statusText`, `mergeBaseSha`, `detail`, `payload`).

### Funciones, handlers y clases

- [`asString(value: unknown, fallback = …)`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L32) · Función. Convierte una entrada en texto utilizable y aplica el fallback recibido cuando la entrada no aporta un valor válido.
  - **Tipo de retorno declarado:** `string`.
  - **Dónde se usa:** [`resolveWorkflowCallbackUrl` · versioning-deploy-execute](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L47), [`resolveBranchForEnv` · versioning-deploy-execute](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L66), [`getNestedString` · versioning-deploy-execute](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L118), [`dispatchGithubWorkflow` · versioning-deploy-execute](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L170), [`checkCommitInBranch` · versioning-deploy-execute](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L222), [handler HTTP · versioning-deploy-execute](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L287).
- [`asBoolean(value: unknown, fallback = …)`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L37) · Función. Normaliza una opción booleana sin delegar la interpretación al consumidor.
  - **Tipo de retorno declarado:** `boolean`.
  - **Dónde se usa:** [handler HTTP · versioning-deploy-execute](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L288).
- [`envVarKey(input: string)`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L42) · Función. Implementa el paso `env var key` del proceso operativo.
  - **Tipo de retorno declarado:** `string`.
  - **Dónde se usa:** [`resolveBranchForEnv` · versioning-deploy-execute](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L64).
- [`resolveWorkflowCallbackUrl()`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L46) · Función. Determina el valor o paso `workflow callback url` del proceso operativo.
  - **Dónde se usa:** [handler HTTP · versioning-deploy-execute](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L499).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L32).
  - **Nombres de configuración consultada:** `VERSIONING_DEPLOY_CALLBACK_URL`, `SUPABASE_URL`, `URL`.
- [`resolveBranchForEnv({ productKey, envKey, kind })`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L55) · Función. Determina el valor o paso `branch for env` del proceso operativo.
  - **Dónde se usa:** [`resolveBranches` · versioning-deploy-execute](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L93).
  - **Delega en:** [`envVarKey`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L42), [`asString`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L32).
  - **Nombres de configuración consultada:** `DEPLOY_BRANCH_DEV`, `DEPLOY_BRANCH_STAGING`, `DEPLOY_BRANCH_PROD`.
- [`resolveBranches({ productKey, targetEnvKey, sourceEnvKey, sourceBranchInput, targetBranchInput })`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L78) · Función. Determina el valor o paso `branches` del proceso operativo.
  - **Dónde se usa:** [handler HTTP · versioning-deploy-execute](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L409).
  - **Delega en:** [`resolveBranchForEnv`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L55).
  - **Retornos explícitos:** objeto con `sourceBranch`, `targetBranch`.
- [`getNestedString(input: Record<string, unknown>, path: string[])`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L112) · Función. Obtiene el valor o paso `nested string` del proceso operativo.
  - **Tipo de retorno declarado:** `string`.
  - **Dónde se usa:** [`checkCommitInBranch` · versioning-deploy-execute](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L229).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L32).
- [`asNumber(value: unknown, fallback = …)`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L121) · Función. Normaliza un valor numérico con el fallback previsto por el llamador.
  - **Tipo de retorno declarado:** `number`.
  - **Dónde se usa:** [`checkCommitInBranch` · versioning-deploy-execute](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L244).
- [`dispatchGithubWorkflow({ owner, repo, token, workflowId, workflowRef, inputs })`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L126) · Función, asíncrona. Inicia un workflow de GitHub Actions con los parámetros de la operación ya validada.
  - **Dónde se usa:** [handler HTTP · versioning-deploy-execute](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L526).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L32).
  - **Integraciones:** `fetch`.
  - **Retornos explícitos:** objeto con `ok`, `status`, `message`, `payload`.
- [`checkCommitInBranch({ owner, repo, token, commitSha, branch })`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L183) · Función, asíncrona. Implementa el paso `check commit in branch` del proceso operativo.
  - **Tipo de retorno declarado:** `Promise<BranchCheckResult>`.
  - **Dónde se usa:** [handler HTTP · versioning-deploy-execute](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L417).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L32), [`getNestedString`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L112), [`asNumber`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L121).
  - **Integraciones:** `fetch`.
  - **Retornos explícitos:** objeto con `ok`, `inBranch`, `statusCode`, `statusText`, `mergeBaseSha`, `detail`, `payload`.
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L251) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `versioning-deploy-execute` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`resolveUsuarioProfileFailure`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L86), [`asString`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L32), [`asBoolean`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L37), [`resolveBranches`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L78), [`checkCommitInBranch`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L183), [`resolveWorkflowCallbackUrl`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L46), [`dispatchGithubWorkflow`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L126).
  - **Relaciones consultadas en este cuerpo:** [`version_deploy_requests_labeled`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L298) → [20260221_000015_versioning_deploy_gate.sql](../../../apps/referidos-app/supabase/migrations/20260221_000015_versioning_deploy_gate.sql#L59) (`select`), [`version_releases`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L365) → [20260220_000014_versioning_system.sql](../../../apps/referidos-app/supabase/migrations/20260220_000014_versioning_system.sql#L199) (`select`), [`version_promotions`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L389) → [20260220_000014_versioning_system.sql](../../../apps/referidos-app/supabase/migrations/20260220_000014_versioning_system.sql#L268) (`select`), [`version_releases_labeled`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L399) → [20260220_000014_versioning_system.sql](../../../apps/referidos-app/supabase/migrations/20260220_000014_versioning_system.sql#L350) (`select`).
  - **RPC:** [`versioning_execute_deploy_request`](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L561) → [20260221_000015_versioning_deploy_gate.sql](../../../apps/referidos-app/supabase/migrations/20260221_000015_versioning_deploy_gate.sql#L389), [20260224_000018_versioning_deploy_artifact_finalize.sql](../../../apps/referidos-app/supabase/migrations/20260224_000018_versioning_deploy_artifact_finalize.sql#L6).
  - **Propiedades de entrada leídas:** `body.request_id`, `body.force_admin_override`, `body.sync_release`, `body.sync_only`, `body.source_branch`, `body.target_branch`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `409`, `500`, `502` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `detail`, `status`, `branch_check`, `request_id`, `source_commit_sha`, `branches`, `sync_requested`, `sync_only`, `release_synced`, `already_synced`, `merge`, `github` y 4 más.
  - **Nombres de configuración consultada:** `GITHUB_DEPLOY_OWNER`, `GITHUB_DEPLOY_REPO`, `GITHUB_DEPLOY_TOKEN`, `VERSIONING_DEPLOY_WORKFLOW`, `VERSIONING_DEPLOY_WORKFLOW_REF`, `DEPLOY_BRANCH_DEV`, `VERSIONING_DEPLOY_CALLBACK_TOKEN`.

## `versioning-dev-release-create/index.ts`

Función histórica del runtime. Valida admin y producto, y solicita a GitHub la ejecución de creación de release dev en refs permitidas. El panel actual sigue la ruta por el proxy a la función homónima de OPS.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/versioning-dev-release-create/index.ts)

- **Referencias literales al nombre del endpoint:** [versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L804), [versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L837), [versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L866). El nombre también existe en el otro proyecto. Confirma el proyecto de destino en la llamada.
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `resolveUsuarioProfileFailure`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`asString(value: unknown, fallback = …)`](../../../apps/referidos-app/supabase/functions/versioning-dev-release-create/index.ts#L11) · Función. Convierte una entrada en texto utilizable y aplica el fallback recibido cuando la entrada no aporta un valor válido.
  - **Tipo de retorno declarado:** `string`.
  - **Dónde se usa:** [handler HTTP · versioning-dev-release-create](../../../apps/referidos-app/supabase/functions/versioning-dev-release-create/index.ts#L57).
- [`isValidProductKey(value: string)`](../../../apps/referidos-app/supabase/functions/versioning-dev-release-create/index.ts#L17) · Función. Comprueba el valor o paso `valid product key` del proceso operativo.
  - **Dónde se usa:** [handler HTTP · versioning-dev-release-create](../../../apps/referidos-app/supabase/functions/versioning-dev-release-create/index.ts#L60).
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/versioning-dev-release-create/index.ts#L21) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `versioning-dev-release-create` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`resolveUsuarioProfileFailure`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L86), [`asString`](../../../apps/referidos-app/supabase/functions/versioning-dev-release-create/index.ts#L11), [`isValidProductKey`](../../../apps/referidos-app/supabase/functions/versioning-dev-release-create/index.ts#L17).
  - **Relaciones consultadas en este cuerpo:** [`tenants`](../../../apps/referidos-app/supabase/functions/versioning-dev-release-create/index.ts#L163) → [20260209_000004_observability_core.sql](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L6) (`select`), [`version_audit_log`](../../../apps/referidos-app/supabase/functions/versioning-dev-release-create/index.ts#L173) → [20260220_000014_versioning_system.sql](../../../apps/referidos-app/supabase/migrations/20260220_000014_versioning_system.sql#L302) (`insert`).
  - **Integraciones:** `fetch`.
  - **Propiedades de entrada leídas:** `body.product_key`, `body.ref`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `405`, `500`, `502` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `detail`, `status`, `workflow`, `ref`, `product_key`.
  - **Nombres de configuración consultada:** `GITHUB_DEPLOY_OWNER`, `GITHUB_DEPLOY_REPO`, `GITHUB_DEPLOY_TOKEN`, `VERSIONING_DEV_RELEASE_WORKFLOW`, `VERSIONING_DEV_RELEASE_REF`, `DEPLOY_BRANCH_DEV`, `VERSIONING_DEV_RELEASE_ALLOWED_REFS`.
