# Runtime · observabilidad y puentes operativos · 2

Ingesta, políticas, simbolicación, telemetría, integración con el proyecto OPS y versionado.

[Índice Edge Functions](README.md)

## Archivos de este capítulo

- [`versioning-ops-proxy/index.ts`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts)
- [`versioning-runtime-migrations/index.ts`](../../../apps/referidos-app/supabase/functions/versioning-runtime-migrations/index.ts)

## `versioning-ops-proxy/index.ts`

Valida el actor admin local y despacha una lista explícita de consultas y acciones de versionado en OPS. Combina lecturas limitadas de vistas, RPCs y llamadas a Edge Functions de release, migración y artefactos. Es la entrada que usa el panel web.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L519).
- **Referencias literales al nombre del endpoint:** [versioningService.ts](../../../apps/referidos-android/src/shared/services/versioningService.ts#L23), [versioningService.js](../../../apps/referidos-app/src/admin/versioning/services/versioningService.js#L23).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `resolveUsuarioProfileFailure`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`, `https://esm.sh/@supabase/supabase-js@2`.
- **Configuración que lee al inicializarse:** `VERSIONING_OPS_URL`, `VERSIONING_OPS_SECRET_KEY`, `VERSIONING_PROXY_SHARED_TOKEN`.
- **Tipos declarados:** [`JsonObject`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L11).

### Funciones, handlers y clases

- [`asString(value: unknown, fallback = …)`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L13) · Función. Convierte una entrada en texto utilizable y aplica el fallback recibido cuando la entrada no aporta un valor válido.
  - **Tipo de retorno declarado:** `string`.
  - **Dónde se usa:** [ámbito de módulo · versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L34), [`invokeOpsFunction` · versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L107), [`handleAction` · versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L181), [handler HTTP · versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L1299).
- [`asNumber(value: unknown, fallback = …)`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L19) · Función. Normaliza un valor numérico con el fallback previsto por el llamador.
  - **Tipo de retorno declarado:** `number`.
  - **Dónde se usa:** [`normalizeLimit` · versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L30), [`handleAction` · versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L450).
- [`asBoolean(value: unknown, fallback = …)`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L24) · Función. Normaliza una opción booleana sin delegar la interpretación al consumidor.
  - **Tipo de retorno declarado:** `boolean`.
  - **Dónde se usa:** [`handleAction` · versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L589).
- [`normalizeLimit(value: unknown, fallback = …, min = …, max = …)`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L29) · Función. Normaliza el límite de paginación o procesamiento del proceso operativo.
  - **Dónde se usa:** [`handleAction` · versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L395).
  - **Delega en:** [`asNumber`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L19).
- [`ensureOpsEnv()`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L38) · Función. Verifica o prepara el valor o paso `ops env` del proceso operativo.
  - **Dónde se usa:** [handler HTTP · versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L1269).
  - **Retornos explícitos:** objeto con `ok`, `error`, `detail`.
- [`sleep(ms: number)`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L57) · Función. Implementa el paso `sleep` del proceso operativo.
  - **Dónde se usa:** [`invokeOpsFunction` · versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L120).
- [`isHtmlPayload(text: string)`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L61) · Función. Comprueba el valor o paso `html payload` del proceso operativo.
  - **Dónde se usa:** [`sanitizeOpsDetail` · versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L69).
- [`sanitizeOpsDetail(rawDetail: string, status: number)`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L66) · Función. Sanea los detalles de operación devueltos a la capa de administración del proceso operativo.
  - **Dónde se usa:** [`invokeOpsFunction` · versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L112).
  - **Delega en:** [`isHtmlPayload`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L61).
- [`invokeOpsFunction(functionName: string, payload: JsonObject)`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L80) · Función, asíncrona. Llama a una función del proyecto de operaciones mediante el canal de servidor.
  - **Dónde se usa:** [`handleAction` · versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L655).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L13), [`sanitizeOpsDetail`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L66), [`sleep`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L57).
  - **Integraciones:** `fetch`.
  - **Retornos explícitos:** objeto con `ok`, `status`, `detail`, `payload`.
- [`handleAction(action: string, payload: JsonObject, actor: string)`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L163) · Función, asíncrona. Implementa el paso `handle action` del proceso operativo.
  - **Dónde se usa:** [handler HTTP · versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L1307).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L13), [`normalizeLimit`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L29), [`asNumber`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L19), [`asBoolean`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L24), [`invokeOpsFunction`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L80).
  - **Relaciones consultadas en este cuerpo:** [`version_products`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L168) → [20260220_000014_versioning_system.sql](../../../apps/referidos-app/supabase/migrations/20260220_000014_versioning_system.sql#L55) (`select`), [`version_environments`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L172) → [20260220_000014_versioning_system.sql](../../../apps/referidos-app/supabase/migrations/20260220_000014_versioning_system.sql#L72) (`select`), [`version_components`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L185) → [20260220_000014_versioning_system.sql](../../../apps/referidos-app/supabase/migrations/20260220_000014_versioning_system.sql#L84) (`select`), [`version_releases_labeled`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L212) → [20260220_000014_versioning_system.sql](../../../apps/referidos-app/supabase/migrations/20260220_000014_versioning_system.sql#L350) (`select`), [`version_release_components_labeled`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L259) → [20260220_000014_versioning_system.sql](../../../apps/referidos-app/supabase/migrations/20260220_000014_versioning_system.sql#L404) (`select`), [`version_component_paths`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L365) → [20260220_000014_versioning_system.sql](../../../apps/referidos-app/supabase/migrations/20260220_000014_versioning_system.sql#L109) (`select`), [`version_component_revisions`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L397) → [20260220_000014_versioning_system.sql](../../../apps/referidos-app/supabase/migrations/20260220_000014_versioning_system.sql#L133) (`select`), [`version_component_latest_revisions`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L420) → [20260220_000014_versioning_system.sql](../../../apps/referidos-app/supabase/migrations/20260220_000014_versioning_system.sql#L433) (`select`), [`version_promotions`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L495) → [20260220_000014_versioning_system.sql](../../../apps/referidos-app/supabase/migrations/20260220_000014_versioning_system.sql#L268) (`select`), [`version_deploy_requests_labeled`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L545) → [20260221_000015_versioning_deploy_gate.sql](../../../apps/referidos-app/supabase/migrations/20260221_000015_versioning_deploy_gate.sql#L59) (`select`), [`version_build_timeline_labeled`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L1172) (`select`), [`version_env_config_versions_labeled`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L1198) (`select`).
  - **RPC:** [`versioning_get_drift`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L464) → [20260220_000014_versioning_system.sql](../../../apps/referidos-app/supabase/migrations/20260220_000014_versioning_system.sql#L462), [`versioning_promote_release`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L479) → [20260220_000014_versioning_system.sql](../../../apps/referidos-app/supabase/migrations/20260220_000014_versioning_system.sql#L584), [`versioning_request_deploy`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L574) → [20260221_000015_versioning_deploy_gate.sql](../../../apps/referidos-app/supabase/migrations/20260221_000015_versioning_deploy_gate.sql#L112), [20260223_000017_versioning_request_deploy_env_guard.sql](../../../apps/referidos-app/supabase/migrations/20260223_000017_versioning_request_deploy_env_guard.sql#L6), [`versioning_approve_deploy_request`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L591) → [20260221_000015_versioning_deploy_gate.sql](../../../apps/referidos-app/supabase/migrations/20260221_000015_versioning_deploy_gate.sql#L242), [`versioning_reject_deploy_request`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L620) → [20260221_000015_versioning_deploy_gate.sql](../../../apps/referidos-app/supabase/migrations/20260221_000015_versioning_deploy_gate.sql#L323), [`versioning_execute_deploy_request`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L639) → [20260221_000015_versioning_deploy_gate.sql](../../../apps/referidos-app/supabase/migrations/20260221_000015_versioning_deploy_gate.sql#L389), [20260224_000018_versioning_deploy_artifact_finalize.sql](../../../apps/referidos-app/supabase/migrations/20260224_000018_versioning_deploy_artifact_finalize.sql#L6).
  - **Propiedades de entrada leídas:** `payload.envKey`, `payload.productKey`, `payload.releaseId`, `payload.semver`, `payload.versionLabel`, `payload.componentId`, `payload.limit`, `payload.envA`, `payload.envB`, `payload.fromEnv`, `payload.toEnv`, `payload.notes`, `payload.actor`, `payload.productId`, `payload.status`, `payload.metadata` y 54 más.
  - **Retornos explícitos:** objeto con `component_count`, `initialized`, `products`, `environments`, `release`, `components`, `path_globs`, `product_key`, `from_env_key`, `from_version_label`, `to_env_key`, `to_version_label`, `already_processed`.
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L1258) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `versioning-ops-proxy` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`ensureOpsEnv`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L38), [`requireAuthUser`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L54), [`getUsuarioByAuthId`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L65), [`resolveUsuarioProfileFailure`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L86), [`asString`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L13), [`handleAction`](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L163).
  - **Propiedades de entrada leídas:** `body.action`, `body.payload`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `405`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `action`, `data`, `detail`, `payload`.

## `versioning-runtime-migrations/index.ts`

Autentica la llamada interna, expone el inventario entregado por versioning_list_applied_migrations y devuelve el proyecto consultado. Es la parte runtime del gate de migraciones antes de un deploy.

[Abrir archivo fuente](../../../apps/referidos-app/supabase/functions/versioning-runtime-migrations/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-app/supabase/functions/versioning-runtime-migrations/config.toml) y [sección del proyecto](../../../apps/referidos-app/supabase/config.toml#L522).
- **Referencias literales al nombre del endpoint:** [versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L271).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-app/supabase/functions/_shared/support.ts) · `corsHeaders`, `jsonResponse`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.
- **Tipos declarados:** [`JsonObject`](../../../apps/referidos-app/supabase/functions/versioning-runtime-migrations/index.ts#L4).

### Funciones, handlers y clases

- [`asString(value: unknown, fallback = …)`](../../../apps/referidos-app/supabase/functions/versioning-runtime-migrations/index.ts#L8) · Función. Convierte una entrada en texto utilizable y aplica el fallback recibido cuando la entrada no aporta un valor válido.
  - **Tipo de retorno declarado:** `string`.
  - **Dónde se usa:** [`resolveProjectRefFromUrl` · versioning-runtime-migrations](../../../apps/referidos-app/supabase/functions/versioning-runtime-migrations/index.ts#L28), [`isAuthorized` · versioning-runtime-migrations](../../../apps/referidos-app/supabase/functions/versioning-runtime-migrations/index.ts#L39), [handler HTTP · versioning-runtime-migrations](../../../apps/referidos-app/supabase/functions/versioning-runtime-migrations/index.ts#L62).
- [`asArray(value: unknown)`](../../../apps/referidos-app/supabase/functions/versioning-runtime-migrations/index.ts#L14) · Función. Reduce una entrada desconocida a una lista para que los consumidores puedan iterar con seguridad.
  - **Tipo de retorno declarado:** `unknown[]`.
  - **Dónde se usa:** [handler HTTP · versioning-runtime-migrations](../../../apps/referidos-app/supabase/functions/versioning-runtime-migrations/index.ts#L115).
- [`corsWithInternalHeader(origin: string | null)`](../../../apps/referidos-app/supabase/functions/versioning-runtime-migrations/index.ts#L18) · Función. Prepara los encabezados CORS de la respuesta para el canal interno.
  - **Dónde se usa:** [handler HTTP · versioning-runtime-migrations](../../../apps/referidos-app/supabase/functions/versioning-runtime-migrations/index.ts#L47).
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L34).
- [`resolveProjectRefFromUrl()`](../../../apps/referidos-app/supabase/functions/versioning-runtime-migrations/index.ts#L27) · Función. Determina el valor o paso `project ref from url` del proceso operativo.
  - **Dónde se usa:** [handler HTTP · versioning-runtime-migrations](../../../apps/referidos-app/supabase/functions/versioning-runtime-migrations/index.ts#L91).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/versioning-runtime-migrations/index.ts#L8).
  - **Nombres de configuración consultada:** `SUPABASE_URL`, `URL`.
- [`isAuthorized(req: Request)`](../../../apps/referidos-app/supabase/functions/versioning-runtime-migrations/index.ts#L38) · Función. Comprueba el valor o paso `authorized` del proceso operativo.
  - **Dónde se usa:** [handler HTTP · versioning-runtime-migrations](../../../apps/referidos-app/supabase/functions/versioning-runtime-migrations/index.ts#L57).
  - **Delega en:** [`asString`](../../../apps/referidos-app/supabase/functions/versioning-runtime-migrations/index.ts#L8).
  - **Retornos explícitos:** booleanos explícitos.
  - **Nombres de configuración consultada:** `VERSIONING_PROXY_SHARED_TOKEN`.
- [`handler HTTP(req)`](../../../apps/referidos-app/supabase/functions/versioning-runtime-migrations/index.ts#L45) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `versioning-runtime-migrations` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsWithInternalHeader`](../../../apps/referidos-app/supabase/functions/versioning-runtime-migrations/index.ts#L18), [`jsonResponse`](../../../apps/referidos-app/supabase/functions/_shared/support.ts#L43), [`isAuthorized`](../../../apps/referidos-app/supabase/functions/versioning-runtime-migrations/index.ts#L38), [`asString`](../../../apps/referidos-app/supabase/functions/versioning-runtime-migrations/index.ts#L8), [`resolveProjectRefFromUrl`](../../../apps/referidos-app/supabase/functions/versioning-runtime-migrations/index.ts#L27), [`asArray`](../../../apps/referidos-app/supabase/functions/versioning-runtime-migrations/index.ts#L14).
  - **RPC:** [`versioning_list_applied_migrations`](../../../apps/referidos-app/supabase/functions/versioning-runtime-migrations/index.ts#L102) → [20260313_000035_versioning_runtime_migrations_rpc.sql](../../../apps/referidos-app/supabase/migrations/20260313_000035_versioning_runtime_migrations_rpc.sql#L3).
  - **Propiedades de entrada leídas:** `body.operation`, `body.required_versions`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `405`, `500` · encabezados leídos `origin` · campos de respuesta `ok`, `error`, `detail`, `operation`, `project_ref`, `runtime_required_env`, `runtime_status_by_key`, `runtime_missing_env`, `runtime_ok`, `applied_versions`, `rows`, `required_versions`, `missing_versions`, `gate_passed`.
  - **Retornos explícitos:** objeto con `version`, `name`, `statements`.
