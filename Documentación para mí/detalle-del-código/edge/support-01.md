# Runtime · soporte

Entradas de tickets y mensajes, cola del agente, jornadas y catálogo. Los archivos de este módulo comparten la lógica de autorización y los contratos de la base.

[Índice Edge Functions](README.md)

## Archivos de este capítulo

- [`ops-support-apps-sync-dispatch/index.ts`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts)
- [`ops-support-macros-sync-dispatch/index.ts`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts)
- [`support-add-note/index.ts`](../../../apps/referidos-app/supabase/functions/support-add-note/index.ts)
- [`support-admin-create-user/index.ts`](../../../apps/referidos-app/supabase/functions/support-admin-create-user/index.ts)
- [`support-admin-deny-session/index.ts`](../../../apps/referidos-app/supabase/functions/support-admin-deny-session/index.ts)
- [`support-admin-end-session/index.ts`](../../../apps/referidos-app/supabase/functions/support-admin-end-session/index.ts)
- [`support-admin-ping/index.ts`](../../../apps/referidos-app/supabase/functions/support-admin-ping/index.ts)
- [`support-admin-start-session/index.ts`](../../../apps/referidos-app/supabase/functions/support-admin-start-session/index.ts)
- [`support-agent-ping/index.ts`](../../../apps/referidos-app/supabase/functions/support-agent-ping/index.ts)
- [`support-anon-cancel-thread/index.ts`](../../../apps/referidos-app/supabase/functions/support-anon-cancel-thread/index.ts)
- [`support-anon-categories/index.ts`](../../../apps/referidos-app/supabase/functions/support-anon-categories/index.ts)
- [`support-anon-thread-status/index.ts`](../../../apps/referidos-app/supabase/functions/support-anon-thread-status/index.ts)
- [`support-assign-thread/index.ts`](../../../apps/referidos-app/supabase/functions/support-assign-thread/index.ts)
- [`support-cancel-thread/index.ts`](../../../apps/referidos-app/supabase/functions/support-cancel-thread/index.ts)
- [`support-close-thread/index.ts`](../../../apps/referidos-app/supabase/functions/support-close-thread/index.ts)
- [`support-create-anon-thread/index.ts`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts)
- [`support-create-irregular-thread/index.ts`](../../../apps/referidos-app/supabase/functions/support-create-irregular-thread/index.ts)
- [`support-create-thread/index.ts`](../../../apps/referidos-app/supabase/functions/support-create-thread/index.ts)
- [`support-end-session/index.ts`](../../../apps/referidos-app/supabase/functions/support-end-session/index.ts)
- [`support-link-anon-to-user/index.ts`](../../../apps/referidos-app/supabase/functions/support-link-anon-to-user/index.ts)
- [`support-log-event/index.ts`](../../../apps/referidos-app/supabase/functions/support-log-event/index.ts)
- [`support-opening-message-sent/index.ts`](../../../apps/referidos-app/supabase/functions/support-opening-message-sent/index.ts)

## `ops-support-apps-sync-dispatch/index.ts`

Autoriza llamada interna o actor permitido, solicita el snapshot de aplicaciones a OPS y actualiza support_apps y support_app_sync_state. El runtime puede resolver identificadores de origen a través de una copia cercana.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L531).
- **Referencias literales al nombre del endpoint:** [supportOps.ts](../../../apps/referidos-android/src/shared/services/supportOps.ts#L49), [supportAppsService.js](../../../apps/referidos-app/src/admin/apps/services/supportAppsService.js#L52), [supportAppIdentity.ts](../../../apps/referidos-app/supabase/functions/_shared/supportAppIdentity.ts#L70).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.
- **Configuración que lee al inicializarse:** `SUPPORT_OPS_URL`, `SUPPORT_OPS_SECRET_KEY`, `SUPPORT_OPS_SHARED_TOKEN`, `SUPPORT_APPS_SOURCE_PROJECT_REF`, `SUPPORT_APPS_SOURCE_ENV_KEY`.
- **Tipos declarados:** [`JsonObject`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L10), [`OpsAppRow`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L12) (`tenant_id`, `app_key`, `app_code`, `display_name`, `origin_source_default`, `aliases`, `is_active`, `soft_deleted_at`, `purge_after`).

### Funciones, handlers y clases

- [`asString(value: unknown, fallback = …)`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L24) · Función. Convierte una entrada en texto utilizable y aplica el fallback recibido cuando la entrada no aporta un valor válido.
  - **Dónde se usa:** [`normalizeAliases` · ops-support-apps-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L50), [ámbito de módulo · ops-support-apps-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L58), [`inferProjectRefFromUrl` · ops-support-apps-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L65), [`isInternalProxyAuthorized` · ops-support-apps-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L91), [`resolveTenantIdForActor` · ops-support-apps-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L105), [`invokeOpsAppsAdmin` · ops-support-apps-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L154), 2 más en el código.
- [`asBoolean(value: unknown, fallback = …)`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L30) · Función. Normaliza una opción booleana sin delegar la interpretación al consumidor.
  - **Dónde se usa:** [handler HTTP · ops-support-apps-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L319).
- [`asObject(value: unknown)`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L35) · Función. Normaliza una entrada a un objeto de propiedades para consumir payloads opcionales.
  - **Tipo de retorno declarado:** `JsonObject`.
  - **Dónde se usa:** [handler HTTP · ops-support-apps-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L274).
- [`asArray(value: unknown)`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L41) · Función. Reduce una entrada desconocida a una lista para que los consumidores puedan iterar con seguridad.
  - **Tipo de retorno declarado:** `T[]`.
  - **Dónde se usa:** [handler HTTP · ops-support-apps-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L354).
- [`normalizeAliases(value: unknown, appCode: string)`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L45) · Función. Normaliza el valor o paso `aliases` de la operación de soporte.
  - **Dónde se usa:** [`applySupportAppsSnapshot` · ops-support-apps-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L213).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L24).
- [`inferProjectRefFromUrl()`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L64) · Función. Determina el valor o paso `project ref from url` de la operación de soporte.
  - **Dónde se usa:** [ámbito de módulo · ops-support-apps-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L76).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L24).
  - **Nombres de configuración consultada:** `SUPABASE_URL`, `URL`.
- [`ensureEnv()`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L78) · Función. Verifica o prepara el valor o paso `env` de la operación de soporte.
  - **Dónde se usa:** [handler HTTP · ops-support-apps-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L269).
  - **Retornos explícitos:** objeto con `ok`, `error`, `detail`.
- [`isInternalProxyAuthorized(req: Request)`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L90) · Función. Resuelve si la solicitud corresponde a un canal interno autorizado. La decisión se usa antes de tomar la ruta operativa.
  - **Dónde se usa:** [handler HTTP · ops-support-apps-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L275).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L24).
  - **HTTP:** encabezados leídos `x-support-ops-token`.
  - **Retornos explícitos:** booleanos explícitos.
  - **Nombres de configuración consultada:** `SUPPORT_OPS_SHARED_TOKEN`.
- [`resolveTenantIdForActor(actorTenantId: string)`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L97) · Función, asíncrona. Selecciona el ámbito de datos a partir del actor previamente resuelto.
  - **Dónde se usa:** [handler HTTP · ops-support-apps-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L305).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L24).
  - **Relaciones consultadas en este cuerpo:** [`tenants`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L99) → [20260209_000004_observability_core.sql](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L6) (`select`).
- [`invokeOpsAppsAdmin(payload: JsonObject)`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L129) · Función, asíncrona. Consulta la administración de apps en OPS para reconstruir el catálogo que necesita el runtime.
  - **Dónde se usa:** [handler HTTP · ops-support-apps-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L322).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L24).
  - **Integraciones:** `fetch`.
  - **Retornos explícitos:** objeto con `ok`, `status`, `detail`, `payload`.
- [`upsertSyncState(tenantId: string, { syncedCount, errorMessage, success })`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L166) · Función, asíncrona. Crea o actualiza el cursor y el estado que permiten continuar la sincronización.
  - **Dónde se usa:** [handler HTTP · ops-support-apps-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L334).
  - **Relaciones consultadas en este cuerpo:** [`support_app_sync_state`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L189) → [20260320_000039_support_apps_ops_cache_sync.sql](../../../apps/referidos-app/supabase/migrations/20260320_000039_support_apps_ops_cache_sync.sql#L6) (`upsert`).
- [`applySupportAppsSnapshot(tenantId: string, sourceRows: OpsAppRow[])`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L195) · Función, asíncrona. Materializa el catálogo de aplicaciones de OPS en las tablas que lee soporte en runtime.
  - **Dónde se usa:** [handler HTTP · ops-support-apps-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L357).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L24), [`normalizeAliases`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L45).
  - **Relaciones consultadas en este cuerpo:** [`support_apps`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L225) → [20260319_000038_support_apps_registry.sql](../../../apps/referidos-app/supabase/migrations/20260319_000038_support_apps_registry.sql#L20) (`upsert`, `select`, `delete`).
  - **Retornos explícitos:** objeto con `tenant_id`, `app_key`, `app_code`, `display_name`, `origin_source_default`, `aliases`, `is_active`, `soft_deleted_at`, `purge_after`, `upserted_count`, `deleted_count`, `app_keys` · null explícito.
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L258) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `ops-support-apps-sync-dispatch` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`ensureEnv`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L78), [`asObject`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L35), [`isInternalProxyAuthorized`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L90), [`asString`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L24), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`resolveTenantIdForActor`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L97), [`asBoolean`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L30), [`invokeOpsAppsAdmin`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L129), [`upsertSyncState`](../../../apps/referidos-app/supabase/functions/ops-support-apps-sync-dispatch/index.ts#L166) y 2 más.
  - **Propiedades de entrada leídas:** `body.actor`, `body.tenant_id`, `body.mode`, `body.force_full`, `body.trigger`, `payload.data`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `401`, `403`, `404`, `405`, `500`, `502` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `detail`, `payload`, `actor`, `tenant_id`, `source_project_ref`, `source_env_key`, `mode`, `force_full`, `trigger`, `source_count`.

## `ops-support-macros-sync-dispatch/index.ts`

Autoriza actor, proxy o cron según el modo, solicita lotes a partir del último seq, normaliza estados y aplica macros y categorías a caché. Guarda el cursor para continuar incrementalmente.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts)

- **Gateway:** [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L528).
- **Referencias literales al nombre del endpoint:** [supportOps.ts](../../../apps/referidos-android/src/shared/services/supportOps.ts#L85), [supportMacrosOpsService.js](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L91), [support-anon-categories](../../../apps/referidos-app/supabase/functions/support-anon-categories/index.ts#L19), [20260304_000026_support_macros_cache_sync.sql](../../../apps/referidos-app/supabase/migrations/20260304_000026_support_macros_cache_sync.sql#L163), [SupportInbox.jsx](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L316).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.
- **Configuración que lee al inicializarse:** `SUPPORT_OPS_URL`, `SUPPORT_OPS_SECRET_KEY`, `SUPPORT_OPS_SHARED_TOKEN`, `SUPPORT_MACROS_SOURCE_PROJECT_REF`, `SUPPORT_MACROS_SOURCE_ENV_KEY`, `SUPPORT_MACROS_HOT_BATCH_LIMIT`, `SUPPORT_MACROS_COLD_BATCH_LIMIT`, `SUPPORT_MACROS_CRON_TOKEN`.
- **Tipos declarados:** [`JsonObject`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L10), [`ChangeRow`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L12) (`seq`, `entity_type`, `op`, `payload`), [`RuntimeConfigRow`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L19) (`cron_token`, `enabled`).

### Funciones, handlers y clases

- [`asString(value: unknown, fallback = …)`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L24) · Función. Convierte una entrada en texto utilizable y aplica el fallback recibido cuando la entrada no aporta un valor válido.
  - **Dónde se usa:** [`normalizeStringList` · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L83), [`normalizeCategoryStatus` · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L117), [`normalizeMacroStatus` · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L124), [`normalizeThreadStatus` · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L131), [ámbito de módulo · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L191), [`inferProjectRefFromUrl` · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L201), 6 más en el código.
- [`asNumber(value: unknown, fallback = …)`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L30) · Función. Normaliza un valor numérico con el fallback previsto por el llamador.
  - **Dónde se usa:** [`clampLimit` · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L51), [`applyChanges` · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L381), [handler HTTP · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L579).
- [`asBoolean(value: unknown, fallback = …)`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L35) · Función. Normaliza una opción booleana sin delegar la interpretación al consumidor.
  - **Dónde se usa:** [handler HTTP · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L558).
- [`asObject(value: unknown)`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L40) · Función. Normaliza una entrada a un objeto de propiedades para consumir payloads opcionales.
  - **Tipo de retorno declarado:** `JsonObject`.
  - **Dónde se usa:** [`applyChanges` · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L362), [handler HTTP · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L517).
- [`asArray(value: unknown)`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L46) · Función. Reduce una entrada desconocida a una lista para que los consumidores puedan iterar con seguridad.
  - **Tipo de retorno declarado:** `unknown[]`.
  - **Dónde se usa:** [handler HTTP · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L646).
- [`clampLimit(value: unknown, fallback: number)`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L50) · Función. Acota el límite de paginación o procesamiento de la operación de soporte.
  - **Dónde se usa:** [ámbito de módulo · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L196), [handler HTTP · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L557).
  - **Delega en:** [`asNumber`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L30).
- [`normalizeByAlias(value: string, aliases: Record<string, string>)`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L69) · Función. Normaliza el valor o paso `by alias` de la operación de soporte.
  - **Dónde se usa:** [`normalizeAllowedArray` · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L107), [`normalizeThreadStatus` · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L143).
- [`canonicalToken(value: string)`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L73) · Función. Comprueba el valor o paso `onical token` de la operación de soporte.
  - **Dónde se usa:** [`normalizeAllowedArray` · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L106).
- [`normalizeStringList(value: unknown, fallback: string[])`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L81) · Función. Normaliza una lista de textos aceptables para el contrato de la operación de soporte.
  - **Dónde se usa:** [`normalizeAllowedArray` · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L102).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L24).
- [`normalizeAllowedArray(value: unknown, { fallback, allowed, aliases })`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L90) · Función. Normaliza el valor o paso `allowed array` de la operación de soporte.
  - **Dónde se usa:** [`normalizeAppTargets` · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L148), [`normalizeEnvTargets` · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L164), [`normalizeAudienceRoles` · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L175).
  - **Delega en:** [`normalizeStringList`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L81), [`canonicalToken`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L73), [`normalizeByAlias`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L69).
- [`normalizeCategoryStatus(value: unknown)`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L116) · Función. Normaliza el estado normalizado de categoría de la operación de soporte.
  - **Dónde se usa:** [`applyChanges` · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L382).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L24).
- [`normalizeMacroStatus(value: unknown)`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L123) · Función. Normaliza el estado de disponibilidad de macro de la operación de soporte.
  - **Dónde se usa:** [`applyChanges` · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L415).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L24).
- [`normalizeThreadStatus(value: unknown)`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L130) · Función. Normaliza el estado de ciclo de vida del ticket de la operación de soporte.
  - **Dónde se usa:** [`applyChanges` · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L410).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L24), [`normalizeByAlias`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L69).
- [`normalizeAppTargets(value: unknown)`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L147) · Función. Normaliza los destinos de aplicación aplicables de la operación de soporte.
  - **Dónde se usa:** [`applyChanges` · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L380).
  - **Delega en:** [`normalizeAllowedArray`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L90).
- [`normalizeEnvTargets(value: unknown)`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L163) · Función. Normaliza los entornos a los que aplica la operación de la operación de soporte.
  - **Dónde se usa:** [`applyChanges` · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L413).
  - **Delega en:** [`normalizeAllowedArray`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L90).
- [`normalizeAudienceRoles(value: unknown)`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L174) · Función. Normaliza los roles de audiencia de la operación de soporte.
  - **Dónde se usa:** [`applyChanges` · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L411).
  - **Delega en:** [`normalizeAllowedArray`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L90).
- [`inferProjectRefFromUrl()`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L200) · Función. Determina el valor o paso `project ref from url` de la operación de soporte.
  - **Dónde se usa:** [ámbito de módulo · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L212).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L24).
  - **Nombres de configuración consultada:** `SUPABASE_URL`, `URL`.
- [`ensureEnv()`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L214) · Función. Verifica o prepara el valor o paso `env` de la operación de soporte.
  - **Dónde se usa:** [handler HTTP · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L512).
  - **Retornos explícitos:** objeto con `ok`, `error`, `detail`.
- [`isInternalProxyAuthorized(req: Request)`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L226) · Función. Resuelve si la solicitud corresponde a un canal interno autorizado. La decisión se usa antes de tomar la ruta operativa.
  - **Dónde se usa:** [handler HTTP · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L519).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L24).
  - **HTTP:** encabezados leídos `x-support-ops-token`.
  - **Retornos explícitos:** booleanos explícitos.
  - **Nombres de configuración consultada:** `SUPPORT_OPS_SHARED_TOKEN`.
- [`validateCronToken(token: string)`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L233) · Función, asíncrona. Comprueba la identidad del canal de tareas programadas antes de aceptar despacho interno.
  - **Dónde se usa:** [handler HTTP · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L520).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L24).
  - **Relaciones consultadas en este cuerpo:** [`ops_sync_runtime_config`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L238) → [20260301_000022_ops_telemetry_outbox_sync.sql](../../../apps/referidos-app/supabase/migrations/20260301_000022_ops_telemetry_outbox_sync.sql#L66) (`select`).
  - **Retornos explícitos:** booleanos explícitos.
- [`resolveTenantIdForActor(actorTenantId: string)`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L249) · Función, asíncrona. Selecciona el ámbito de datos a partir del actor previamente resuelto.
  - **Dónde se usa:** [handler HTTP · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L563).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L24).
  - **Relaciones consultadas en este cuerpo:** [`tenants`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L251) → [20260209_000004_observability_core.sql](../../../apps/referidos-app/supabase/migrations/20260209_000004_observability_core.sql#L6) (`select`).
- [`invokeOpsSync(payload: JsonObject)`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L281) · Función, asíncrona. Pide al backend OPS sincronizar entradas posteriores al cursor actual.
  - **Dónde se usa:** [handler HTTP · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L610).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L24).
  - **Integraciones:** `fetch`.
  - **Retornos explícitos:** objeto con `ok`, `status`, `detail`, `payload`.
- [`loadSyncState(tenantId: string)`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L318) · Función, asíncrona. Lee la última posición y el estado guardado de la sincronización.
  - **Dónde se usa:** [handler HTTP · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L578).
  - **Relaciones consultadas en este cuerpo:** [`support_macro_sync_state`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L319) → [20260304_000026_support_macros_cache_sync.sql](../../../apps/referidos-app/supabase/migrations/20260304_000026_support_macros_cache_sync.sql#L88) (`select`).
- [`upsertSyncState(tenantId: string, { lastSeq, errorMessage, success })`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L329) · Función, asíncrona. Crea o actualiza el cursor y el estado que permiten continuar la sincronización.
  - **Dónde se usa:** [handler HTTP · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L625).
  - **Relaciones consultadas en este cuerpo:** [`support_macro_sync_state`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L350) → [20260304_000026_support_macros_cache_sync.sql](../../../apps/referidos-app/supabase/migrations/20260304_000026_support_macros_cache_sync.sql#L88) (`upsert`).
- [`applyChanges(tenantId: string, changes: ChangeRow[])`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L356) · Función, asíncrona. Aplica el valor o paso `changes` de la operación de soporte.
  - **Dónde se usa:** [handler HTTP · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L670).
  - **Delega en:** [`asObject`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L40), [`asString`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L24), [`normalizeAppTargets`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L147), [`asNumber`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L30), [`normalizeCategoryStatus`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L116), [`normalizeThreadStatus`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L130), [`normalizeAudienceRoles`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L174), [`normalizeEnvTargets`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L163), [`normalizeMacroStatus`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L123).
  - **Relaciones consultadas en este cuerpo:** [`support_macros_cache`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L443) → [20260304_000026_support_macros_cache_sync.sql](../../../apps/referidos-app/supabase/migrations/20260304_000026_support_macros_cache_sync.sql#L38) (`delete`, `upsert`), [`support_macro_categories_cache`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L452) → [20260304_000026_support_macros_cache_sync.sql](../../../apps/referidos-app/supabase/migrations/20260304_000026_support_macros_cache_sync.sql#L8) (`delete`, `upsert`).
  - **Propiedades de entrada leídas:** `payload.id`, `payload.code`, `payload.label`, `payload.description`, `payload.app_targets`, `payload.sort_order`, `payload.status`, `payload.metadata`, `payload.updated_at`, `payload.category_id`, `payload.category_code`, `payload.title`, `payload.body`, `payload.thread_status`, `payload.audience_roles`, `payload.env_targets`.
  - **Retornos explícitos:** objeto con `categories_upserted`, `categories_deleted`, `macros_upserted`, `macros_deleted`.
- [`isRuntimeCacheEmpty(tenantId: string)`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L482) · Función, asíncrona. Comprueba el valor o paso `runtime cache empty` de la operación de soporte.
  - **Dónde se usa:** [handler HTTP · ops-support-macros-sync-dispatch](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L594).
  - **Relaciones consultadas en este cuerpo:** [`support_macro_categories_cache`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L485) → [20260304_000026_support_macros_cache_sync.sql](../../../apps/referidos-app/supabase/migrations/20260304_000026_support_macros_cache_sync.sql#L8) (`select`), [`support_macros_cache`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L489) → [20260304_000026_support_macros_cache_sync.sql](../../../apps/referidos-app/supabase/migrations/20260304_000026_support_macros_cache_sync.sql#L38) (`select`).
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L501) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `ops-support-macros-sync-dispatch` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`ensureEnv`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L214), [`asObject`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L40), [`asString`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L24), [`isInternalProxyAuthorized`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L226), [`validateCronToken`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L233), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`clampLimit`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L50), [`asBoolean`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L35), [`resolveTenantIdForActor`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts#L249) y 7 más.
  - **Propiedades de entrada leídas:** `body.mode`, `body.tenant_id`, `body.limit`, `body.force_full`, `body.panel_key`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `401`, `403`, `404`, `405`, `500`, `502` · encabezados leídos `origin`, `x-ops-sync-cron-token`, `authorization` · campos de respuesta `ok`, `error`, `detail`, `payload`, `processed_changes`, `mode`, `actor`, `panel_key`, `tenant_id`, `after_seq`, `force_full`, `runtime_cache_empty`, `synced_seq`, `received_changes`.

## `support-add-note/index.ts`

Comprueba rol y acceso al ticket, crea nota interna y registra su evento. Las notas del equipo quedan separadas del relato inicial del usuario.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-add-note/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/support-add-note/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L465).
- **Referencias literales al nombre del endpoint:** [supportClient.js](../../../packages/support-sdk/src/supportClient.js#L134), [supportClient.js](../../../packages/api-client/src/support/supportClient.js#L30).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `safeTrim`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-add-note/index.ts#L11) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-add-note` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`safeTrim`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L139).
  - **Relaciones consultadas en este cuerpo:** [`support_threads`](../../../apps/referidos-app/supabase/functions/support-add-note/index.ts#L49) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L252) (`select`), [`support_thread_notes`](../../../apps/referidos-app/supabase/functions/support-add-note/index.ts#L63) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L315) (`insert`, `select`), [`support_thread_events`](../../../apps/referidos-app/supabase/functions/support-add-note/index.ts#L77) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L302) (`insert`).
  - **Propiedades de entrada leídas:** `body.thread_public_id`, `body.body`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `note`.

## `support-admin-create-user/index.ts`

Valida rol admin y crea la identidad y el perfil interno con must_change_password. Si falla el upsert del perfil, intenta retirar la identidad creada. Es la ruta controlada para cuentas de personal, distinta de la invitación del producto.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-admin-create-user/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/support-admin-create-user/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L495).
- **Referencias literales al nombre del endpoint:** [supportClient.js](../../../packages/api-client/src/support/supportClient.js#L70).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`generatePassword(length = …)`](../../../apps/referidos-app/supabase/functions/support-admin-create-user/index.ts#L13) · Función. Genera material temporal de credenciales que el flujo de alta de cuenta entrega a Auth.
  - **Dónde se usa:** [handler HTTP · support-admin-create-user](../../../apps/referidos-app/supabase/functions/support-admin-create-user/index.ts#L63).
  - **Integraciones:** `crypto.getRandomValues`.
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-admin-create-user/index.ts#L21) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-admin-create-user` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`generatePassword`](../../../apps/referidos-app/supabase/functions/support-admin-create-user/index.ts#L13).
  - **Relaciones consultadas en este cuerpo:** [`usuarios`](../../../apps/referidos-app/supabase/functions/support-admin-create-user/index.ts#L86) → [20250205_000003_auth_and_users.sql](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L39) (`upsert`, `select`).
  - **Integraciones:** `supabaseAdmin.auth.admin.createUser`, `supabaseAdmin.auth.admin.deleteUser`.
  - **Propiedades de entrada leídas:** `body.email`, `body.nombre`, `body.apellido`, `body.fecha_nacimiento`, `body.role`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `code`, `message`, `email`, `password`, `role`, `user_id`, `public_id`.

## `support-admin-deny-session/index.ts`

Registra el rechazo administrativo de la solicitud de sesión en el perfil y en los eventos. Permite distinguir pendiente, denegada y activa en el panel.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-admin-deny-session/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/support-admin-deny-session/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L492).
- **Referencias literales al nombre del endpoint:** [supportClient.js](../../../packages/api-client/src/support/supportClient.js#L66).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-admin-deny-session/index.ts#L10) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-admin-deny-session` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65).
  - **Relaciones consultadas en este cuerpo:** [`support_agent_profiles`](../../../apps/referidos-app/supabase/functions/support-admin-deny-session/index.ts#L47) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L334) (`update`), [`support_agent_events`](../../../apps/referidos-app/supabase/functions/support-admin-deny-session/index.ts#L59) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L386) (`insert`).
  - **Propiedades de entrada leídas:** `body.agent_id`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`.

## `support-admin-end-session/index.ts`

Cierra la jornada desde administración, actualiza tickets pendientes y registra eventos. Deja constancia de quién intervino y restituye capacidad a la cola.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-admin-end-session/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/support-admin-end-session/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L486).
- **Referencias literales al nombre del endpoint:** [supportClient.js](../../../packages/api-client/src/support/supportClient.js#L58).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `supabaseAdmin` | [../_shared/supportAutoAssign.ts](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts) · `runSupportAutoAssignCycle`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-admin-end-session/index.ts#L11) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-admin-end-session` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`runSupportAutoAssignCycle`](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts#L820).
  - **Relaciones consultadas en este cuerpo:** [`support_agent_sessions`](../../../apps/referidos-app/supabase/functions/support-admin-end-session/index.ts#L50) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L373) (`update`, `select`), [`support_threads`](../../../apps/referidos-app/supabase/functions/support-admin-end-session/index.ts#L78) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L252) (`select`, `update`), [`support_thread_events`](../../../apps/referidos-app/supabase/functions/support-admin-end-session/index.ts#L105) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L302) (`insert`), [`support_agent_events`](../../../apps/referidos-app/supabase/functions/support-admin-end-session/index.ts#L122) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L386) (`insert`).
  - **Propiedades de entrada leídas:** `body.reason`, `body.agent_id`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `details`, `agent_id`, `ended`.

## `support-admin-ping/index.ts`

Actualiza la presencia de una jornada con actor administrativo y ejecuta mantenimiento de asignación. Mantiene la intervención de administración separada del heartbeat normal del agente.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-admin-ping/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/support-admin-ping/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L489).
- **Referencias literales al nombre del endpoint:** [supportClient.js](../../../packages/api-client/src/support/supportClient.js#L62).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `supabaseAdmin` | [../_shared/supportAutoAssign.ts](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts) · `runSupportAutoAssignCycle`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-admin-ping/index.ts#L11) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-admin-ping` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`runSupportAutoAssignCycle`](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts#L820).
  - **Relaciones consultadas en este cuerpo:** [`support_agent_sessions`](../../../apps/referidos-app/supabase/functions/support-admin-ping/index.ts#L42) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L373) (`select`, `update`), [`support_threads`](../../../apps/referidos-app/supabase/functions/support-admin-ping/index.ts#L50) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L252) (`select`, `update`), [`support_agent_events`](../../../apps/referidos-app/supabase/functions/support-admin-ping/index.ts#L57) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L386) (`insert`), [`support_thread_events`](../../../apps/referidos-app/supabase/functions/support-admin-ping/index.ts#L105) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L302) (`insert`).
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `401`, `403`, `404`, `405` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`.

## `support-admin-start-session/index.ts`

Abre o autoriza la sesión operativa de un agente concreto desde administración, actualiza el perfil y registra la acción por actor. Ayuda a operar jornadas supervisadas.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-admin-start-session/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/support-admin-start-session/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L483).
- **Referencias literales al nombre del endpoint:** [supportClient.js](../../../packages/api-client/src/support/supportClient.js#L54).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `loadSupportRuntimeFlags`, `requireAuthUser`, `supabaseAdmin` | [../_shared/supportAutoAssign.ts](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts) · `runSupportAutoAssignCycle`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-admin-start-session/index.ts#L12) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-admin-start-session` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`loadSupportRuntimeFlags`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L120), [`runSupportAutoAssignCycle`](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts#L820).
  - **Relaciones consultadas en este cuerpo:** [`usuarios`](../../../apps/referidos-app/supabase/functions/support-admin-start-session/index.ts#L45) → [20250205_000003_auth_and_users.sql](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L39) (`select`), [`support_agent_profiles`](../../../apps/referidos-app/supabase/functions/support-admin-start-session/index.ts#L52) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L334) (`upsert`, `select`, `update`), [`support_agent_sessions`](../../../apps/referidos-app/supabase/functions/support-admin-start-session/index.ts#L90) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L373) (`select`, `insert`), [`support_agent_events`](../../../apps/referidos-app/supabase/functions/support-admin-start-session/index.ts#L119) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L386) (`insert`).
  - **Propiedades de entrada leídas:** `body.agent_id`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `401`, `403`, `404`, `405`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `session_id`.

## `support-agent-ping/index.ts`

Actualiza presencia de la sesión activa, registra actividad y llama al motor para interpretar capacidad y estados. Permite dinamizar la cola según agentes disponibles.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-agent-ping/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/support-agent-ping/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L480).
- **Referencias literales al nombre del endpoint:** [supportClient.js](../../../packages/api-client/src/support/supportClient.js#L50).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `supabaseAdmin` | [../_shared/supportAutoAssign.ts](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts) · `runSupportAutoAssignCycle`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-agent-ping/index.ts#L11) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-agent-ping` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`runSupportAutoAssignCycle`](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts#L820).
  - **Relaciones consultadas en este cuerpo:** [`support_agent_sessions`](../../../apps/referidos-app/supabase/functions/support-agent-ping/index.ts#L42) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L373) (`select`, `update`), [`support_threads`](../../../apps/referidos-app/supabase/functions/support-agent-ping/index.ts#L50) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L252) (`select`, `update`), [`support_agent_events`](../../../apps/referidos-app/supabase/functions/support-agent-ping/index.ts#L57) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L386) (`insert`), [`support_thread_events`](../../../apps/referidos-app/supabase/functions/support-agent-ping/index.ts#L105) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L302) (`insert`).
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `401`, `403`, `404`, `405` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`.

## `support-anon-cancel-thread/index.ts`

Valida token de seguimiento y transición permitida para el ticket anónimo. Actualiza su estado y registra el evento sin requerir una sesión de Auth.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-anon-cancel-thread/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/support-anon-cancel-thread/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L540).
- **Referencias literales al nombre del endpoint:** [createPrelaunchClient.js](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L150).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `jsonResponse`, `safeTrim`, `supabaseAdmin` | [../_shared/supportAutoAssign.ts](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts) · `runSupportAutoAssignCycle`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`sha256(value: string)`](../../../apps/referidos-app/supabase/functions/support-anon-cancel-thread/index.ts#L12) · Función, asíncrona. Implementa el paso `sha256` de la operación de soporte.
  - **Dónde se usa:** [handler HTTP · support-anon-cancel-thread](../../../apps/referidos-app/supabase/functions/support-anon-cancel-thread/index.ts#L51).
  - **Integraciones:** `crypto.subtle.digest`.
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-anon-cancel-thread/index.ts#L20) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-anon-cancel-thread` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`safeTrim`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L139), [`sha256`](../../../apps/referidos-app/supabase/functions/support-anon-cancel-thread/index.ts#L12), [`runSupportAutoAssignCycle`](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts#L820).
  - **Relaciones consultadas en este cuerpo:** [`support_threads`](../../../apps/referidos-app/supabase/functions/support-anon-cancel-thread/index.ts#L40) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L252) (`select`, `update`), [`support_thread_events`](../../../apps/referidos-app/supabase/functions/support-anon-cancel-thread/index.ts#L88) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L302) (`insert`).
  - **Propiedades de entrada leídas:** `body.thread_public_id`, `body.tracking_token`, `body.reason`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `403`, `404`, `405`, `409`, `500` · encabezados leídos `origin` · campos de respuesta `ok`, `error`, `already_closed`, `thread_public_id`, `status`.

## `support-anon-categories/index.ts`

Resuelve la app de origen y obtiene categorías disponibles desde el catálogo local. Si la caché no alcanza, puede intentar sincronizarla. Las categorías públicas se derivan de macros elegibles y no requieren editar la landing.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-anon-categories/index.ts)

- **Gateway:** [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L534).
- **Referencias literales al nombre del endpoint:** [createPrelaunchClient.js](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L146).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `jsonResponse`, `safeTrim`, `supabaseAdmin` | [../_shared/supportMacroCatalog.ts](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts) · `listAnonymousMacroCategoriesFromCache` | [../_shared/supportAppIdentity.ts](../../../apps/referidos-app/supabase/functions/_shared/supportAppIdentity.ts) · `resolveSupportAppChannel`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.
- **Tipos declarados:** [`SyncAttemptResult`](../../../apps/referidos-app/supabase/functions/support-anon-categories/index.ts#L10) (`ok`, `detail`, `status`).

### Funciones, handlers y clases

- [`trySyncMacrosCache()`](../../../apps/referidos-app/supabase/functions/support-anon-categories/index.ts#L16) · Función, asíncrona. Solicita o intenta sincronizar la caché de macros para que el siguiente listado use la versión disponible.
  - **Tipo de retorno declarado:** `Promise<SyncAttemptResult>`.
  - **Dónde se usa:** [handler HTTP · support-anon-categories](../../../apps/referidos-app/supabase/functions/support-anon-categories/index.ts#L81).
  - **Delega en:** [`safeTrim`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L139).
  - **Integraciones:** `supabaseAdmin.functions.invoke`.
  - **Propiedades de entrada leídas:** `payload.ok`, `payload.detail`, `payload.error`, `payload.status`.
  - **Retornos explícitos:** objeto con `ok`, `detail`, `status`.
  - **Nombres de configuración consultada:** `SUPPORT_OPS_SHARED_TOKEN`.
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-anon-categories/index.ts#L62) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-anon-categories` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`resolveSupportAppChannel`](../../../apps/referidos-app/supabase/functions/_shared/supportAppIdentity.ts#L120), [`safeTrim`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L139), [`trySyncMacrosCache`](../../../apps/referidos-app/supabase/functions/support-anon-categories/index.ts#L16), [`listAnonymousMacroCategoriesFromCache`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L200).
  - **Propiedades de entrada leídas:** `body.app_channel`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `405`, `500`, `502` · encabezados leídos `origin` · campos de respuesta `ok`, `error`, `detail`, `app_channel`, `categories`.

## `support-anon-thread-status/index.ts`

Compara el hash del token de seguimiento y devuelve campos seleccionados del ticket con datos de contacto enmascarados. El contrato reduce información visible en una consulta pública.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-anon-thread-status/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/support-anon-thread-status/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L546).
- **Referencias literales al nombre del endpoint:** [createPrelaunchClient.js](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L154), [supportClient.js](../../../packages/api-client/src/support/supportClient.js#L82).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `jsonResponse`, `safeTrim`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`sha256(value: string)`](../../../apps/referidos-app/supabase/functions/support-anon-thread-status/index.ts#L4) · Función, asíncrona. Implementa el paso `sha256` de la operación de soporte.
  - **Dónde se usa:** [handler HTTP · support-anon-thread-status](../../../apps/referidos-app/supabase/functions/support-anon-thread-status/index.ts#L58).
  - **Integraciones:** `crypto.subtle.digest`.
- [`maskContact(channel: string | null, value: string | null)`](../../../apps/referidos-app/supabase/functions/support-anon-thread-status/index.ts#L12) · Función. Implementa el paso `mask contact` de la operación de soporte.
  - **Dónde se usa:** [handler HTTP · support-anon-thread-status](../../../apps/referidos-app/supabase/functions/support-anon-thread-status/index.ts#L91).
  - **Retornos explícitos:** null explícito.
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-anon-thread-status/index.ts#L26) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-anon-thread-status` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`safeTrim`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L139), [`sha256`](../../../apps/referidos-app/supabase/functions/support-anon-thread-status/index.ts#L4), [`maskContact`](../../../apps/referidos-app/supabase/functions/support-anon-thread-status/index.ts#L12).
  - **Relaciones consultadas en este cuerpo:** [`support_threads`](../../../apps/referidos-app/supabase/functions/support-anon-thread-status/index.ts#L45) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L252) (`select`).
  - **Propiedades de entrada leídas:** `body.thread_public_id`, `body.tracking_token`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `403`, `404`, `405` · encabezados leídos `origin` · campos de respuesta `ok`, `error`, `thread`.

## `support-assign-thread/index.ts`

Verifica perfil del actor, estado de jornada y capacidad, y delega la asignación manual al motor común. Concentra las reglas de elegibilidad y el tratamiento de conflictos de asignación.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-assign-thread/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/support-assign-thread/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L459).
- **Referencias literales al nombre del endpoint:** [supportClient.js](../../../packages/api-client/src/support/supportClient.js#L22).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `loadSupportRuntimeFlags`, `requireAuthUser`, `supabaseAdmin` | [../_shared/supportAutoAssign.ts](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts) · `manualAssignThread`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-assign-thread/index.ts#L12) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-assign-thread` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`loadSupportRuntimeFlags`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L120), [`manualAssignThread`](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts#L881).
  - **Relaciones consultadas en este cuerpo:** [`support_agent_sessions`](../../../apps/referidos-app/supabase/functions/support-assign-thread/index.ts#L51) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L373) (`select`), [`support_agent_profiles`](../../../apps/referidos-app/supabase/functions/support-assign-thread/index.ts#L64) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L334) (`select`), [`support_threads`](../../../apps/referidos-app/supabase/functions/support-assign-thread/index.ts#L84) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L252) (`select`).
  - **Propiedades de entrada leídas:** `body.thread_public_id`, `body.agent_id`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `409`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `thread`, `mode`, `cycle`.

## `support-cancel-thread/index.ts`

Valida al titular autenticado del ticket, comprueba la transición de estado, actualiza cancelación y registra el evento. La distinción entre cancelado y cerrado conserva la diferencia entre retirar la solicitud y resolverla.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-cancel-thread/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/support-cancel-thread/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L498).
- **Referencias literales al nombre del endpoint:** [supportClient.js](../../../packages/api-client/src/support/supportClient.js#L74).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `supabaseAdmin` | [../_shared/supportAutoAssign.ts](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts) · `runSupportAutoAssignCycle`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-cancel-thread/index.ts#L11) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-cancel-thread` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`runSupportAutoAssignCycle`](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts#L820).
  - **Relaciones consultadas en este cuerpo:** [`support_threads`](../../../apps/referidos-app/supabase/functions/support-cancel-thread/index.ts#L44) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L252) (`select`, `update`), [`support_thread_events`](../../../apps/referidos-app/supabase/functions/support-cancel-thread/index.ts#L80) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L302) (`insert`).
  - **Propiedades de entrada leídas:** `body.thread_public_id`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `409`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`.

## `support-close-thread/index.ts`

Valida el agente asignado o admin y guarda resolución y causa raíz cuando corresponde. Devuelve el resultado existente si se repite la acción sobre un ticket cerrado y activa el motor para liberar capacidad. El historial de cierre queda en support_thread_events.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-close-thread/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/support-close-thread/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L468).
- **Referencias literales al nombre del endpoint:** [supportClient.js](../../../packages/api-client/src/support/supportClient.js#L34).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `safeTrim`, `supabaseAdmin` | [../_shared/supportAutoAssign.ts](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts) · `runSupportAutoAssignCycle`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-close-thread/index.ts#L12) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-close-thread` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`safeTrim`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L139), [`runSupportAutoAssignCycle`](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts#L820).
  - **Relaciones consultadas en este cuerpo:** [`support_threads`](../../../apps/referidos-app/supabase/functions/support-close-thread/index.ts#L51) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L252) (`select`, `update`), [`support_thread_events`](../../../apps/referidos-app/supabase/functions/support-close-thread/index.ts#L114) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L302) (`insert`).
  - **Propiedades de entrada leídas:** `body.thread_public_id`, `body.resolution`, `body.root_cause`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `thread`.

## `support-create-anon-thread/index.ts`

Valida resumen, origen, categoría y contacto, aplica controles de entrada y upsert de perfil anónimo. Crea thread y eventos, emite token de seguimiento y puede invocar asignación. El cliente público puede consultar su solicitud sin exponer toda la bandeja.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L537).
- **Referencias literales al nombre del endpoint:** [createPrelaunchClient.js](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L148), [supportClient.js](../../../packages/api-client/src/support/supportClient.js#L78).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `CATEGORY_LABELS`, `SUPPORT_FALLBACK_CATEGORY`, `buildSupportMessage`, `corsHeaders`, `jsonResponse`, `resolveSupportThreadCategory`, `safeTrim`, `supabaseAdmin` | [../_shared/supportMacroCatalog.ts](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts) · `categoryLabelForCode`, `listAnonymousMacroCategoriesFromCache`, `normalizeSupportCategoryCode` | [../_shared/supportAppIdentity.ts](../../../apps/referidos-app/supabase/functions/_shared/supportAppIdentity.ts) · `resolveSupportAppIdentity` | [../_shared/supportAutoAssign.ts](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts) · `runSupportAutoAssignCycle`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.
- **Configuración que lee al inicializarse:** `PRELAUNCH_UA_PEPPER`, `PRELAUNCH_IP_RISK_PEPPER`.

### Funciones, handlers y clases

- [`isRecord(value: unknown)`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L36) · Función. Comprueba el valor o paso `record` de la operación de soporte.
  - **Dónde se usa:** [`normalizeBuildSnapshot` · support-create-anon-thread](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L59), [handler HTTP · support-create-anon-thread](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L189).
- [`pickText(value: unknown, max = …)`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L40) · Función. Determina el valor o paso `text` de la operación de soporte.
  - **Dónde se usa:** [`normalizeBuildSnapshot` · support-create-anon-thread](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L62), [handler HTTP · support-create-anon-thread](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L191).
  - **Delega en:** [`safeTrim`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L139).
  - **Retornos explícitos:** null explícito.
- [`pickBuildNumber(value: unknown)`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L46) · Función. Determina el valor o paso `build number` de la operación de soporte.
  - **Dónde se usa:** [`normalizeBuildSnapshot` · support-create-anon-thread](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L60).
  - **Retornos explícitos:** null explícito.
- [`normalizeBuildSnapshot(value: unknown)`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L58) · Función. Normaliza los datos del snapshot de compilación de la operación de soporte.
  - **Dónde se usa:** [handler HTTP · support-create-anon-thread](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L200).
  - **Delega en:** [`isRecord`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L36), [`pickBuildNumber`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L46), [`pickText`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L40).
  - **Retornos explícitos:** null explícito.
- [`normalizeWhatsapp(value: string)`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L80) · Función. Normaliza el dato de contacto de WhatsApp de la operación de soporte.
  - **Dónde se usa:** [handler HTTP · support-create-anon-thread](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L250).
  - **Retornos explícitos:** null explícito.
- [`normalizeEmail(value: string)`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L86) · Función. Normaliza el dato de dirección de correo de la operación de soporte.
  - **Dónde se usa:** [handler HTTP · support-create-anon-thread](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L249).
  - **Retornos explícitos:** null explícito.
- [`parseUuid(value: unknown)`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L92) · Función. Interpreta el valor o paso `uuid` de la operación de soporte.
  - **Dónde se usa:** [handler HTTP · support-create-anon-thread](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L183).
  - **Retornos explícitos:** null explícito.
- [`createTrackingToken()`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L105) · Función. Crea un identificador de seguimiento para vincular el estado del hilo con su contexto de ingreso.
  - **Dónde se usa:** [`issueTrackingToken` · support-create-anon-thread](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L110), [handler HTTP · support-create-anon-thread](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L519).
  - **Integraciones:** `crypto.randomUUID`.
- [`issueTrackingToken(threadId: string)`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L109) · Función, asíncrona. Comprueba el valor o paso `sue tracking token` de la operación de soporte.
  - **Dónde se usa:** [handler HTTP · support-create-anon-thread](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L371).
  - **Delega en:** [`createTrackingToken`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L105), `sha256Hex`.
  - **Relaciones consultadas en este cuerpo:** [`support_threads`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L112) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L252) (`update`).
- [`cancelAnonymousThread(threadId: string, reason: string, tenantId: string | null = …)`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L122) · Función, asíncrona. Aplica el cierre por cancelación en un hilo asociado a la identidad pública resuelta.
  - **Dónde se usa:** [handler HTTP · support-create-anon-thread](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L425).
  - **Delega en:** [`runSupportAutoAssignCycle`](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts#L820).
  - **Relaciones consultadas en este cuerpo:** [`support_threads`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L125) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L252) (`update`), [`support_thread_events`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L136) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L302) (`insert`).
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L152) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-create-anon-thread` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`safeTrim`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L139), [`resolveSupportAppIdentity`](../../../apps/referidos-app/supabase/functions/_shared/supportAppIdentity.ts#L32), [`normalizeSupportCategoryCode`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L92), [`parseUuid`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L92), [`isRecord`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L36), [`pickText`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L40), [`normalizeBuildSnapshot`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L58), [`listAnonymousMacroCategoriesFromCache`](../../../apps/referidos-app/supabase/functions/_shared/supportMacroCatalog.ts#L200), [`resolveSupportThreadCategory`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L214), [`normalizeEmail`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L86) y 11 más.
  - **Relaciones consultadas en este cuerpo:** [`anon_support_profiles`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L333) → [20260215_000009_support_anonymous_unified.sql](../../../apps/referidos-app/supabase/migrations/20260215_000009_support_anonymous_unified.sql#L17) (`upsert`, `select`), [`support_threads`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L361) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L252) (`select`, `insert`, `update`), [`support_thread_events`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L601) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L302) (`insert`).
  - **RPC:** [`resolve_default_tenant_id`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L179) → [20260303_000025_usuarios_auto_tenant.sql](../../../apps/referidos-app/supabase/migrations/20260303_000025_usuarios_auto_tenant.sql#L6).
  - **Propiedades de entrada leídas:** `body.honeypot`, `body.channel`, `body.summary`, `body.contact`, `body.severity`, `body.app_channel`, `body.category`, `body.anon_id`, `body.visit_session_id`, `body.client_request_id`, `body.display_name`, `body.error_on_active`, `body.replace_existing`, `body.context`, `body.source_route`, `body.locale` y 6 más.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `405`, `409`, `429`, `500` · encabezados leídos `origin` · campos de respuesta `ok`, `error`, `spam`, `detail`, `reused`, `thread_public_id`, `anon_public_id`, `status`, `wa_link`, `wa_message_text`, `tracking_token`, `channel`, `requested_channel`.
- [`recordGuard(outcome: string, reason: string, meta: Record<string, unknown> = …)`](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L290) · Función. Implementa el paso `record guard` de la operación de soporte.
  - **Dónde se usa:** [handler HTTP · support-create-anon-thread](../../../apps/referidos-app/supabase/functions/support-create-anon-thread/index.ts#L315).
  - **Delega en:** `recordIntakeGuardEvent`.

## `support-create-irregular-thread/index.ts`

Valida rol agente o admin y resuelve el contexto del usuario y origen ingresado por el operador. Abre el caso y conserva el evento como entrada irregular en vez de simular un ticket iniciado por el cliente.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-create-irregular-thread/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/support-create-irregular-thread/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L471).
- **Referencias literales al nombre del endpoint:** [supportClient.js](../../../packages/api-client/src/support/supportClient.js#L38).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `SUPPORT_FALLBACK_CATEGORY`, `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `resolveSupportThreadCategory`, `safeTrim`, `supabaseAdmin` | [../_shared/supportAppIdentity.ts](../../../apps/referidos-app/supabase/functions/_shared/supportAppIdentity.ts) · `resolveSupportAppIdentity` | [../_shared/supportAutoAssign.ts](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts) · `runSupportAutoAssignCycle`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-create-irregular-thread/index.ts#L15) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-create-irregular-thread` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`safeTrim`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L139), [`resolveSupportThreadCategory`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L214), [`resolveSupportAppIdentity`](../../../apps/referidos-app/supabase/functions/_shared/supportAppIdentity.ts#L32), [`runSupportAutoAssignCycle`](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts#L820).
  - **Relaciones consultadas en este cuerpo:** [`support_agent_profiles`](../../../apps/referidos-app/supabase/functions/support-create-irregular-thread/index.ts#L45) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L334) (`select`), [`usuarios`](../../../apps/referidos-app/supabase/functions/support-create-irregular-thread/index.ts#L75) → [20250205_000003_auth_and_users.sql](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L39) (`select`), [`support_threads`](../../../apps/referidos-app/supabase/functions/support-create-irregular-thread/index.ts#L85) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L252) (`select`, `insert`), [`support_thread_events`](../../../apps/referidos-app/supabase/functions/support-create-irregular-thread/index.ts#L128) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L302) (`insert`).
  - **Propiedades de entrada leídas:** `body.user_public_id`, `body.summary`, `body.category`, `body.severity`, `body.app_channel`, `body.context`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `thread`.

## `support-create-thread/index.ts`

Verifica usuario y perfil, aplica límite, normaliza categoría, app y snapshot de build. Crea ticket autenticado y evento, y llama al motor cuando procede. Deja una relación trazable entre usuario, reporte y versión del producto.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-create-thread/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/support-create-thread/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L456).
- **Referencias literales al nombre del endpoint:** [supportClient.js](../../../packages/api-client/src/support/supportClient.js#L18).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `CATEGORY_LABELS`, `SUPPORT_FALLBACK_CATEGORY`, `buildSupportMessage`, `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `resolveSupportThreadCategory`, `safeTrim`, `supabaseAdmin` | [../_shared/supportAutoAssign.ts](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts) · `runSupportAutoAssignCycle` | [../_shared/supportAppIdentity.ts](../../../apps/referidos-app/supabase/functions/_shared/supportAppIdentity.ts) · `resolveSupportAppIdentity`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`isRecord(value: unknown)`](../../../apps/referidos-app/supabase/functions/support-create-thread/index.ts#L19) · Función. Comprueba el valor o paso `record` de la operación de soporte.
  - **Dónde se usa:** [`normalizeBuildSnapshot` · support-create-thread](../../../apps/referidos-app/supabase/functions/support-create-thread/index.ts#L42), [handler HTTP · support-create-thread](../../../apps/referidos-app/supabase/functions/support-create-thread/index.ts#L97).
- [`pickText(value: unknown, max = …)`](../../../apps/referidos-app/supabase/functions/support-create-thread/index.ts#L23) · Función. Determina el valor o paso `text` de la operación de soporte.
  - **Dónde se usa:** [`normalizeBuildSnapshot` · support-create-thread](../../../apps/referidos-app/supabase/functions/support-create-thread/index.ts#L45), [handler HTTP · support-create-thread](../../../apps/referidos-app/supabase/functions/support-create-thread/index.ts#L99).
  - **Delega en:** [`safeTrim`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L139).
  - **Retornos explícitos:** null explícito.
- [`pickBuildNumber(value: unknown)`](../../../apps/referidos-app/supabase/functions/support-create-thread/index.ts#L29) · Función. Determina el valor o paso `build number` de la operación de soporte.
  - **Dónde se usa:** [`normalizeBuildSnapshot` · support-create-thread](../../../apps/referidos-app/supabase/functions/support-create-thread/index.ts#L43).
  - **Retornos explícitos:** null explícito.
- [`normalizeBuildSnapshot(value: unknown)`](../../../apps/referidos-app/supabase/functions/support-create-thread/index.ts#L41) · Función. Normaliza los datos del snapshot de compilación de la operación de soporte.
  - **Dónde se usa:** [handler HTTP · support-create-thread](../../../apps/referidos-app/supabase/functions/support-create-thread/index.ts#L106).
  - **Delega en:** [`isRecord`](../../../apps/referidos-app/supabase/functions/support-create-thread/index.ts#L19), [`pickBuildNumber`](../../../apps/referidos-app/supabase/functions/support-create-thread/index.ts#L29), [`pickText`](../../../apps/referidos-app/supabase/functions/support-create-thread/index.ts#L23).
  - **Retornos explícitos:** null explícito.
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-create-thread/index.ts#L63) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-create-thread` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`resolveSupportThreadCategory`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L214), [`safeTrim`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L139), [`resolveSupportAppIdentity`](../../../apps/referidos-app/supabase/functions/_shared/supportAppIdentity.ts#L32), [`isRecord`](../../../apps/referidos-app/supabase/functions/support-create-thread/index.ts#L19), [`pickText`](../../../apps/referidos-app/supabase/functions/support-create-thread/index.ts#L23), [`normalizeBuildSnapshot`](../../../apps/referidos-app/supabase/functions/support-create-thread/index.ts#L41), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`buildSupportMessage`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L146), [`runSupportAutoAssignCycle`](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts#L820).
  - **Relaciones consultadas en este cuerpo:** [`support_threads`](../../../apps/referidos-app/supabase/functions/support-create-thread/index.ts#L150) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L252) (`select`, `insert`, `update`), [`support_thread_events`](../../../apps/referidos-app/supabase/functions/support-create-thread/index.ts#L268) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L302) (`insert`).
  - **Propiedades de entrada leídas:** `body.category`, `body.severity`, `body.summary`, `body.client_request_id`, `body.app_channel`, `body.origin_source`, `body.context`, `body.source_route`, `body.locale`, `body.language`, `body.timezone`, `body.platform`, `body.user_agent`, `body.build`, `body.build_snapshot`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `404`, `405`, `429`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `thread_public_id`, `user_public_id`, `wa_link`, `wa_message_text`, `reused`, `suggested_contact_name`, `suggested_tags`.

## `support-end-session/index.ts`

Comprueba tickets pendientes, requiere confirmar abandono cuando corresponde y libera o devuelve trabajo a la cola. Registra eventos y estado de traspaso antes de recalcular asignación.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-end-session/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/support-end-session/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L477).
- **Referencias literales al nombre del endpoint:** [supportClient.js](../../../packages/api-client/src/support/supportClient.js#L46).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `supabaseAdmin` | [../_shared/supportAutoAssign.ts](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts) · `runSupportAutoAssignCycle`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-end-session/index.ts#L11) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-end-session` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`runSupportAutoAssignCycle`](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts#L820).
  - **Relaciones consultadas en este cuerpo:** [`support_agent_sessions`](../../../apps/referidos-app/supabase/functions/support-end-session/index.ts#L46) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L373) (`select`, `update`), [`support_threads`](../../../apps/referidos-app/supabase/functions/support-end-session/index.ts#L55) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L252) (`select`, `update`), [`support_agent_profiles`](../../../apps/referidos-app/supabase/functions/support-end-session/index.ts#L102) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L334) (`update`), [`support_thread_events`](../../../apps/referidos-app/supabase/functions/support-end-session/index.ts#L131) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L302) (`insert`), [`support_agent_events`](../../../apps/referidos-app/supabase/functions/support-end-session/index.ts#L151) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L386) (`insert`).
  - **Propiedades de entrada leídas:** `body.reason`, `body.abandonment_confirmed`, `body.abandonment_message_sent`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `401`, `403`, `404`, `405` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `requires_confirmation`, `threads`.

## `support-link-anon-to-user/index.ts`

Valida rol habilitado, localiza ticket y perfil de destino, y registra el vínculo y su evento. Permite integrar un ticket que llegó antes de identificar a una cuenta.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-link-anon-to-user/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/support-link-anon-to-user/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L501).
- **Referencias literales al nombre del endpoint:** [supportClient.js](../../../packages/api-client/src/support/supportClient.js#L106).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `safeTrim`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-link-anon-to-user/index.ts#L11) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-link-anon-to-user` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`safeTrim`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L139).
  - **Relaciones consultadas en este cuerpo:** [`support_threads`](../../../apps/referidos-app/supabase/functions/support-link-anon-to-user/index.ts#L50) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L252) (`select`, `update`), [`usuarios`](../../../apps/referidos-app/supabase/functions/support-link-anon-to-user/index.ts#L61) → [20250205_000003_auth_and_users.sql](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L39) (`select`), [`support_thread_events`](../../../apps/referidos-app/supabase/functions/support-link-anon-to-user/index.ts#L92) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L302) (`insert`).
  - **Propiedades de entrada leídas:** `body.thread_public_id`, `body.user_public_id`, `body.user_id`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `thread_public_id`, `user_id`, `user_public_id`.

## `support-log-event/index.ts`

Adaptador fino del nombre de función de soporte a la misma ruta de ingesta unificada. Conviene revisar referencias de ambos alias al cambiar el formato de eventos.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-log-event/index.ts)

- **Llamadas entrantes:** sin referencia literal encontrada en el monorepo. Puede estar invocada por configuración, un nombre dinámico o un sistema externo.
- **Importaciones locales:** [../_shared/supportLogBridge.ts](../../../apps/referidos-app/supabase/functions/_shared/supportLogBridge.ts) · `forwardSupportLogsToObsIngest`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-log-event/index.ts#L4) · Entrada HTTP. Registra la entrada HTTP de `support-log-event` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`forwardSupportLogsToObsIngest`](../../../apps/referidos-app/supabase/functions/_shared/supportLogBridge.ts#L83).

## `support-opening-message-sent/index.ts`

Registra quién marcó enviado el mensaje inicial y cuándo, y ejecuta el avance aplicable del motor. Así la cola distingue asignación de contacto efectivo.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/support-opening-message-sent/index.ts)

- **Referencias literales al nombre del endpoint:** [supportClient.js](../../../packages/api-client/src/support/supportClient.js#L90).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `safeTrim`, `supabaseAdmin` | [../_shared/supportAutoAssign.ts](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts) · `markSupportOpeningMessageSent`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/support-opening-message-sent/index.ts#L12) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `support-opening-message-sent` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`safeTrim`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L139), [`markSupportOpeningMessageSent`](../../../apps/referidos-app/supabase/functions/_shared/supportAutoAssign.ts#L1025).
  - **Relaciones consultadas en este cuerpo:** [`support_threads`](../../../apps/referidos-app/supabase/functions/support-opening-message-sent/index.ts#L48) → [20250309_000003_support_system.sql](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L252) (`select`).
  - **Propiedades de entrada leídas:** `body.thread_public_id`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `thread_public_id`, `opening_message_sent_at`.
