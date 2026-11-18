# OPS · soporte, telemetría y releases · 2

Plano operativo separado. Los endpoints y helpers de este capítulo pertenecen a su propio proyecto y base de datos.

[Índice Edge Functions](README.md)

## Archivos de este capítulo

- [`versioning-deploy-callback/index.ts`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts)
- [`versioning-deploy-execute/index.ts`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts)
- [`versioning-dev-release-create/index.ts`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts)
- [`versioning-dev-release-preview/index.ts`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts)
- [`versioning-release-gate/index.ts`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts)

## `versioning-deploy-callback/index.ts`

Valida callback, asocia el evento al intento y registra inicio o resultado. Finaliza datos de release, versión de configuración y artefacto por entorno, y coordina limpieza y sync de release a observabilidad cuando procede. El pipeline devuelve así el estado concreto de la publicación a OPS.

[Abrir archivo fuente](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts)

- **Gateway:** [sección del proyecto](../../../apps/referidos-ops/supabase/config.toml#L42).
- **Referencias literales al nombre del endpoint:** [versioning-deploy-execute](../../../apps/referidos-app/supabase/functions/versioning-deploy-execute/index.ts#L52), [versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L76). El nombre también existe en el otro proyecto. Confirma el proyecto de destino en la llamada.
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-ops/supabase/functions/_shared/support.ts) · `corsHeaders`, `jsonResponse`, `supabaseAdmin`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.
- **Tipos declarados:** [`JsonObject`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L4).

### Funciones, handlers y clases

- [`asString(value: unknown, fallback = …)`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L9) · Función. Convierte una entrada en texto utilizable y aplica el fallback recibido cuando la entrada no aporta un valor válido.
  - **Dónde se usa:** [`asUuid` · versioning-deploy-callback](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L23), [`resolveObsReleaseSyncUrl` · versioning-deploy-callback](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L58), [`registerWorkflowStarted` · versioning-deploy-callback](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L105), [`runObsReleaseSync` · versioning-deploy-callback](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L184), [`runStorageArtifactGc` · versioning-deploy-callback](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L257), [handler HTTP · versioning-deploy-callback](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L438).
- [`asObject(value: unknown)`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L15) · Función. Normaliza una entrada a un objeto de propiedades para consumir payloads opcionales.
  - **Tipo de retorno declarado:** `JsonObject`.
  - **Dónde se usa:** [`registerWorkflowStarted` · versioning-deploy-callback](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L102), [`runStorageArtifactGc` · versioning-deploy-callback](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L298), [handler HTTP · versioning-deploy-callback](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L462).
- [`asUuid(value: unknown)`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L22) · Función. Normaliza una referencia UUID antes de consultar filas o devolver el enlace.
  - **Tipo de retorno declarado:** `string | null`.
  - **Dónde se usa:** [`emitBuildEvent` · versioning-deploy-callback](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L397), [handler HTTP · versioning-deploy-callback](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L757).
  - **Delega en:** [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L9).
  - **Retornos explícitos:** null explícito.
- [`envVarKey(input: string)`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L30) · Función. Implementa el paso `env var key` del flujo de OPS.
  - **Tipo de retorno declarado:** `string`.
  - **Dónde se usa:** [`resolveObsReleaseSyncUrl` · versioning-deploy-callback](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L57), [`runObsReleaseSync` · versioning-deploy-callback](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L200).
- [`corsWithCallbackHeader(origin: string | null)`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L34) · Función. Añade soporte de CORS para el canal servidor del callback.
  - **Dónde se usa:** [handler HTTP · versioning-deploy-callback](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L429).
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-ops/supabase/functions/_shared/support.ts#L24).
- [`mapProductToAppId(productKey: string)`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L43) · Función. Traduce el valor o paso `product to app id` del flujo de OPS.
  - **Dónde se usa:** [`runObsReleaseSync` · versioning-deploy-callback](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L206).
- [`resolveObsReleaseSyncUrl(envKey: string)`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L56) · Función. Determina el valor o paso `obs release sync url` del flujo de OPS.
  - **Dónde se usa:** [`runObsReleaseSync` · versioning-deploy-callback](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L194).
  - **Delega en:** [`envVarKey`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L30), [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L9).
- [`registerWorkflowStarted({ requestId, actor, deploymentId, logsUrl, metadata })`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L65) · Función, asíncrona. Registra el arranque del proceso de CI para que OPS conserve el vínculo entre release y run.
  - **Dónde se usa:** [handler HTTP · versioning-deploy-callback](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L506).
  - **Delega en:** [`asObject`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L15), [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L9).
  - **Relaciones consultadas en este cuerpo:** [`version_deploy_requests`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L78) → [20260222_000015_versioning_deploy_gate.sql](../../../apps/referidos-ops/supabase/migrations/20260222_000015_versioning_deploy_gate.sql#L6) (`select`, `update`), [`version_deployments`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L134) → [20260221_000014_versioning_system.sql](../../../apps/referidos-ops/supabase/migrations/20260221_000014_versioning_system.sql#L282) (`select`, `update`).
  - **Retornos explícitos:** objeto con `ok`, `error`, `detail`, `deployment_id`, `logs_url`.
- [`runObsReleaseSync({ requestId, releaseId, productKey, envKey, versionLabel, deploymentId, actor })`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L167) · Función, asíncrona. Inicia la sincronización del snapshot de release con la instancia de observabilidad correspondiente.
  - **Dónde se usa:** [handler HTTP · versioning-deploy-callback](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L574).
  - **Delega en:** [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L9), [`resolveObsReleaseSyncUrl`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L56), [`envVarKey`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L30), [`mapProductToAppId`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L43).
  - **Integraciones:** `fetch`.
  - **Propiedades de entrada leídas:** `payload.ok`, `payload.detail`.
  - **Retornos explícitos:** objeto con `ok`, `skipped`, `reason`, `detail`, `status`, `url`, `payload`.
  - **Nombres de configuración consultada:** `OBS_RELEASE_SYNC_TOKEN`, `OBS_RELEASE_SYNC_TENANT_HINT`.
- [`runStorageArtifactGc({ tenantId, actor, limit })`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L248) · Función, asíncrona. Coordina limpieza de artefactos en Storage bajo las reglas operativas de retención.
  - **Dónde se usa:** [handler HTTP · versioning-deploy-callback](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L824).
  - **Delega en:** [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L9), [`asObject`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L15).
  - **Relaciones consultadas en este cuerpo:** [`version_release_artifacts`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L267) → [20260315_000031_versioning_artifact_registry_local_sync.sql](../../../apps/referidos-ops/supabase/migrations/20260315_000031_versioning_artifact_registry_local_sync.sql#L3) (`select`, `update`), [`version_artifact_env_heads`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L304) → [20260315_000031_versioning_artifact_registry_local_sync.sql](../../../apps/referidos-ops/supabase/migrations/20260315_000031_versioning_artifact_registry_local_sync.sql#L46) (`select`).
  - **Retornos explícitos:** objeto con `ok`, `skipped`, `reason`, `detail`, `deleted_count`, `kept_by_head`, `skipped_already_deleted`, `errors`, `deleted`.
  - **Nombres de configuración consultada:** `VERSIONING_ARTIFACTS_BUCKET`.
- [`emitBuildEvent({ tenantId, releaseId, deployRequestId, artifactId, eventKey, eventType, status, actor, detail, workflowName, workflowJob, workflowRunId, workflowRunNumber, metadata })`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L365) · Función, asíncrona. Persiste un evento del build para que el panel pueda mostrar su progreso.
  - **Dónde se usa:** [handler HTTP · versioning-deploy-callback](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L526).
  - **Delega en:** [`asUuid`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L22).
  - **RPC:** [`versioning_emit_build_event`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L418) → [20260317_000033_versioning_build_events_and_env_config.sql](../../../apps/referidos-ops/supabase/migrations/20260317_000033_versioning_build_events_and_env_config.sql#L94).
- [`handler HTTP(req)`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L427) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `versioning-deploy-callback` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsWithCallbackHeader`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L34), [`jsonResponse`](../../../apps/referidos-ops/supabase/functions/_shared/support.ts#L33), [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L9), [`asObject`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L15), [`registerWorkflowStarted`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L65), [`emitBuildEvent`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L365), [`runObsReleaseSync`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L167), [`asUuid`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L22), [`runStorageArtifactGc`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L248).
  - **Relaciones consultadas en este cuerpo:** [`version_deploy_requests_labeled`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L479) → [20260222_000015_versioning_deploy_gate.sql](../../../apps/referidos-ops/supabase/migrations/20260222_000015_versioning_deploy_gate.sql#L59) (`select`).
  - **RPC:** [`versioning_finalize_deploy_request`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L600) → [20260225_000018_versioning_deploy_artifact_finalize.sql](../../../apps/referidos-ops/supabase/migrations/20260225_000018_versioning_deploy_artifact_finalize.sql#L157), [20260302_000021_versioning_promoted_status.sql](../../../apps/referidos-ops/supabase/migrations/20260302_000021_versioning_promoted_status.sql#L448), [`versioning_finalize_release_metadata`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L651) → [20260313_000029_versioning_release_metadata_builds.sql](../../../apps/referidos-ops/supabase/migrations/20260313_000029_versioning_release_metadata_builds.sql#L192), [20260329_000038_versioning_finalize_release_metadata_fix.sql](../../../apps/referidos-ops/supabase/migrations/20260329_000038_versioning_finalize_release_metadata_fix.sql#L1), [`versioning_mark_env_artifact_head`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L704) → [20260315_000031_versioning_artifact_registry_local_sync.sql](../../../apps/referidos-ops/supabase/migrations/20260315_000031_versioning_artifact_registry_local_sync.sql#L294), [20260316_000032_versioning_artifact_storage_gc.sql](../../../apps/referidos-ops/supabase/migrations/20260316_000032_versioning_artifact_storage_gc.sql#L13), [`versioning_register_env_config_version`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts#L760) → [20260317_000033_versioning_build_events_and_env_config.sql](../../../apps/referidos-ops/supabase/migrations/20260317_000033_versioning_build_events_and_env_config.sql#L368).
  - **Propiedades de entrada leídas:** `body.request_id`, `body.actor`, `body.deployment_id`, `body.logs_url`, `body.status`, `body.metadata`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `404`, `405`, `500` · encabezados leídos `origin` · campos de respuesta `ok`, `error`, `detail`, `request_id`, `status`, `deployment_id`, `logs_url`, `obs_release_sync`, `deployment_row_id`, `release_metadata`, `artifact_head`, `env_config`, `artifact_gc`.
  - **Nombres de configuración consultada:** `VERSIONING_DEPLOY_CALLBACK_TOKEN`.

## `versioning-deploy-execute/index.ts`

Resuelve la solicitud aprobada, comprueba archivo y commit asociados a release, rama destino y gate de migración. Las operaciones dispatch y status permiten disparar y seguir el workflow. Guarda el estado inicial por RPC y se apoya en callback para el resultado.

[Abrir archivo fuente](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts)

- **Gateway:** [sección del proyecto](../../../apps/referidos-ops/supabase/config.toml#L45).
- **Referencias literales al nombre del endpoint:** [versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L655), [versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L687). El nombre también existe en el otro proyecto. Confirma el proyecto de destino en la llamada.
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-ops/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `resolveUsuarioProfileFailure`, `supabaseAdmin` | [../_shared/github-auth.ts](../../../apps/referidos-ops/supabase/functions/_shared/github-auth.ts) · `getGithubAuthConfig`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.
- **Tipos declarados:** [`JsonObject`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L12), [`DeployRequestRow`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L14) (`id`, `release_id`, `product_key`, `env_key`, `version_label`, `status`, `requested_by`, `admin_override`, `deployment_id`, `deployment_status`, `logs_url`, `metadata`), [`BranchCheckResult`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L29) (`ok`, `inBranch`, `statusCode`, `statusText`, `mergeBaseSha`, `detail`, `payload`), [`MigrationGateResult`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L39) (`ok`, `status`, `error`, `detail`, `payload`).

### Funciones, handlers y clases

- [`asString(value: unknown, fallback = …)`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L49) · Función. Convierte una entrada en texto utilizable y aplica el fallback recibido cuando la entrada no aporta un valor válido.
  - **Tipo de retorno declarado:** `string`.
  - **Dónde se usa:** [`isInternalProxyAuthorized` · versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L60), [`resolveWorkflowCallbackUrl` · versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L71), [`resolveOpsBaseUrl` · versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L80), [`resolveBranchForEnv` · versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L94), [`getNestedString` · versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L146), [`fetchGithubJson` · versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L181), 6 más en el código.
- [`asBoolean(value: unknown, fallback = …)`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L54) · Función. Normaliza una opción booleana sin delegar la interpretación al consumidor.
  - **Tipo de retorno declarado:** `boolean`.
  - **Dónde se usa:** [handler HTTP · versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L666).
- [`isInternalProxyAuthorized(req: Request)`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L59) · Función. Resuelve si la solicitud corresponde a un canal interno autorizado. La decisión se usa antes de tomar la ruta operativa.
  - **Dónde se usa:** [handler HTTP · versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L622).
  - **Delega en:** [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L49).
  - **Retornos explícitos:** booleanos explícitos.
  - **Nombres de configuración consultada:** `VERSIONING_PROXY_SHARED_TOKEN`.
- [`envVarKey(input: string)`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L66) · Función. Implementa el paso `env var key` del flujo de OPS.
  - **Tipo de retorno declarado:** `string`.
  - **Dónde se usa:** [`resolveBranchForEnv` · versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L92).
- [`resolveWorkflowCallbackUrl()`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L70) · Función. Determina el valor o paso `workflow callback url` del flujo de OPS.
  - **Dónde se usa:** [handler HTTP · versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L974).
  - **Delega en:** [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L49).
  - **Nombres de configuración consultada:** `VERSIONING_DEPLOY_CALLBACK_URL`, `SUPABASE_URL`, `URL`.
- [`resolveOpsBaseUrl()`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L79) · Función. Determina el valor o paso `ops base url` del flujo de OPS.
  - **Dónde se usa:** [`checkReleaseMigrationGate` · versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L546).
  - **Delega en:** [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L49).
  - **Nombres de configuración consultada:** `SUPABASE_URL`, `URL`.
- [`resolveBranchForEnv({ productKey, envKey, kind })`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L83) · Función. Determina el valor o paso `branch for env` del flujo de OPS.
  - **Dónde se usa:** [`resolveBranches` · versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L121).
  - **Delega en:** [`envVarKey`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L66), [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L49).
  - **Nombres de configuración consultada:** `DEPLOY_BRANCH_DEV`, `DEPLOY_BRANCH_STAGING`, `DEPLOY_BRANCH_PROD`.
- [`resolveBranches({ productKey, targetEnvKey, sourceEnvKey, sourceBranchInput, targetBranchInput })`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L106) · Función. Determina el valor o paso `branches` del flujo de OPS.
  - **Dónde se usa:** [handler HTTP · versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L891).
  - **Delega en:** [`resolveBranchForEnv`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L83).
  - **Retornos explícitos:** objeto con `sourceBranch`, `targetBranch`.
- [`getNestedString(input: Record<string, unknown>, path: string[])`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L140) · Función. Obtiene el valor o paso `nested string` del flujo de OPS.
  - **Tipo de retorno declarado:** `string`.
  - **Dónde se usa:** [`checkCommitInBranch` · versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L513), [handler HTTP · versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L745).
  - **Delega en:** [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L49).
- [`asNumber(value: unknown, fallback = …)`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L149) · Función. Normaliza un valor numérico con el fallback previsto por el llamador.
  - **Tipo de retorno declarado:** `number`.
  - **Dónde se usa:** [`resolveWorkflowRunAndJobs` · versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L304), [`checkCommitInBranch` · versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L528), [handler HTTP · versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L739).
- [`fetchGithubJson(url: string, token: string)`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L154) · Función, asíncrona. Obtiene el valor o paso `github json` del flujo de OPS.
  - **Tipo de retorno declarado:** `Promise<{ ok, status, data, detail }>`.
  - **Dónde se usa:** [`resolveWorkflowRunAndJobs` · versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L242).
  - **Delega en:** [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L49).
  - **Integraciones:** `fetch`.
  - **Retornos explícitos:** objeto con `ok`, `status`, `data`, `detail`.
- [`normalizeWorkflowState({ status, conclusion })`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L193) · Función. Normaliza el estado de ejecución que consume el flujo del flujo de OPS.
  - **Tipo de retorno declarado:** `literal`.
  - **Dónde se usa:** [`resolveWorkflowRunAndJobs` · versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L343).
  - **Delega en:** [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L49).
- [`resolveWorkflowRunAndJobs({ owner, repo, workflowId, token, ref, runId, dispatchStartedAt })`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L222) · Función, asíncrona. Cruza el run y sus trabajos para presentar el estado de la compilación a los clientes.
  - **Dónde se usa:** [handler HTTP · versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L747).
  - **Delega en:** [`fetchGithubJson`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L154), [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L49), [`asNumber`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L149), [`normalizeWorkflowState`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L193).
  - **Integraciones:** `fetchGithubJson`.
  - **Retornos explícitos:** objeto con `ok`, `error`, `detail`, `status`, `run`, `jobs`, `summary`, `number`, `name`, `conclusion`, `state`, `started_at`, `completed_at`, `id`, `html_url` y 1 más · booleanos explícitos.
- [`dispatchGithubWorkflow({ owner, repo, token, workflowId, workflowRef, inputs })`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L409) · Función, asíncrona. Inicia un workflow de GitHub Actions con los parámetros de la operación ya validada.
  - **Dónde se usa:** [handler HTTP · versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L1001).
  - **Delega en:** [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L49).
  - **Integraciones:** `fetch`.
  - **Retornos explícitos:** objeto con `ok`, `status`, `message`, `payload`.
- [`checkCommitInBranch({ owner, repo, token, commitSha, branch })`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L466) · Función, asíncrona. Implementa el paso `check commit in branch` del flujo de OPS.
  - **Tipo de retorno declarado:** `Promise<BranchCheckResult>`.
  - **Dónde se usa:** [handler HTTP · versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L899).
  - **Delega en:** [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L49), [`getNestedString`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L140), [`asNumber`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L149).
  - **Integraciones:** `fetch`.
  - **Retornos explícitos:** objeto con `ok`, `inBranch`, `statusCode`, `statusText`, `mergeBaseSha`, `detail`, `payload`.
- [`checkReleaseMigrationGate({ productKey, envKey, semver, actor })`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L535) · Función, asíncrona. Coordina la validación de migraciones requerida por las operaciones de release.
  - **Tipo de retorno declarado:** `Promise<MigrationGateResult>`.
  - **Dónde se usa:** [handler HTTP · versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L831).
  - **Delega en:** [`resolveOpsBaseUrl`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L79), [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L49).
  - **Integraciones:** `fetch`.
  - **Retornos explícitos:** objeto con `ok`, `status`, `error`, `detail`, `payload`.
  - **Nombres de configuración consultada:** `VERSIONING_PROXY_SHARED_TOKEN`.
- [`handler HTTP(req)`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L610) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `versioning-deploy-execute` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-ops/supabase/functions/_shared/support.ts#L24), [`jsonResponse`](../../../apps/referidos-ops/supabase/functions/_shared/support.ts#L33), [`isInternalProxyAuthorized`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L59), [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L49), [`requireAuthUser`](../../../apps/referidos-ops/supabase/functions/_shared/support.ts#L44), [`getUsuarioByAuthId`](../../../apps/referidos-ops/supabase/functions/_shared/support.ts#L55), [`resolveUsuarioProfileFailure`](../../../apps/referidos-ops/supabase/functions/_shared/support.ts#L76), [`asBoolean`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L54), [`getGithubAuthConfig`](../../../apps/referidos-ops/supabase/functions/_shared/github-auth.ts#L123), [`asNumber`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L149), [`getNestedString`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L140), [`resolveWorkflowRunAndJobs`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L222) y 5 más.
  - **Relaciones consultadas en este cuerpo:** [`version_deploy_requests_labeled`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L676) → [20260222_000015_versioning_deploy_gate.sql](../../../apps/referidos-ops/supabase/migrations/20260222_000015_versioning_deploy_gate.sql#L59) (`select`), [`version_releases`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L807) → [20260221_000014_versioning_system.sql](../../../apps/referidos-ops/supabase/migrations/20260221_000014_versioning_system.sql#L199) (`select`), [`version_promotions`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L872) → [20260221_000014_versioning_system.sql](../../../apps/referidos-ops/supabase/migrations/20260221_000014_versioning_system.sql#L268) (`select`), [`version_releases_labeled`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L882) → [20260221_000014_versioning_system.sql](../../../apps/referidos-ops/supabase/migrations/20260221_000014_versioning_system.sql#L350), [20260313_000029_versioning_release_metadata_builds.sql](../../../apps/referidos-ops/supabase/migrations/20260313_000029_versioning_release_metadata_builds.sql#L327) (`select`).
  - **RPC:** [`versioning_execute_deploy_request`](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L1043) → [20260222_000015_versioning_deploy_gate.sql](../../../apps/referidos-ops/supabase/migrations/20260222_000015_versioning_deploy_gate.sql#L389), [20260303_000022_versioning_admin_override_service_role.sql](../../../apps/referidos-ops/supabase/migrations/20260303_000022_versioning_admin_override_service_role.sql#L87).
  - **Propiedades de entrada leídas:** `body.operation`, `body.actor`, `body.request_id`, `body.force_admin_override`, `body.sync_release`, `body.sync_only`, `body.source_branch`, `body.target_branch`, `body.run_id`, `body.dispatch_started_at`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `409`, `500`, `502` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `detail`, `status`, `operation`, `request_id`, `workflow`, `ref`, `run`, `jobs`, `summary`, `gate_error`, `gate_status`, `gate_payload` y 18 más.
  - **Nombres de configuración consultada:** `VERSIONING_DEPLOY_WORKFLOW`, `DEPLOY_BRANCH_DEV`, `VERSIONING_DEPLOY_WORKFLOW_REF`, `VERSIONING_DEPLOY_CALLBACK_TOKEN`.

## `versioning-dev-release-create/index.ts`

Recibe operaciones dispatch y status para el workflow dev. Admite creación de release y backfill de artefacto, valida producto, referencia y release según el modo, y registra auditoría. Permite que el panel siga la ejecución al salir de la petición HTTP inicial.

[Abrir archivo fuente](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts)

- **Gateway:** [sección del proyecto](../../../apps/referidos-ops/supabase/config.toml#L48).
- **Referencias literales al nombre del endpoint:** [versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L804), [versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L837), [versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L866). El nombre también existe en el otro proyecto. Confirma el proyecto de destino en la llamada.
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-ops/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `resolveUsuarioProfileFailure`, `supabaseAdmin` | [../_shared/github-auth.ts](../../../apps/referidos-ops/supabase/functions/_shared/github-auth.ts) · `getGithubAuthConfig`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.

### Funciones, handlers y clases

- [`asString(value: unknown, fallback = …)`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L12) · Función. Convierte una entrada en texto utilizable y aplica el fallback recibido cuando la entrada no aporta un valor válido.
  - **Tipo de retorno declarado:** `string`.
  - **Dónde se usa:** [`isInternalProxyAuthorized` · versioning-dev-release-create](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L28), [`fetchGithubJson` · versioning-dev-release-create](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L61), [`normalizeWorkflowState` · versioning-dev-release-create](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L80), [`resolveWorkflowRunAndJobs` · versioning-dev-release-create](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L159), [handler HTTP · versioning-dev-release-create](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L331).
- [`asNumber(value: unknown, fallback = …)`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L18) · Función. Normaliza un valor numérico con el fallback previsto por el llamador.
  - **Tipo de retorno declarado:** `number`.
  - **Dónde se usa:** [`resolveWorkflowRunAndJobs` · versioning-dev-release-create](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L186), [handler HTTP · versioning-dev-release-create](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L418).
- [`isValidProductKey(value: string)`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L23) · Función. Comprueba el valor o paso `valid product key` del flujo de OPS.
  - **Dónde se usa:** [handler HTTP · versioning-dev-release-create](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L347).
- [`isInternalProxyAuthorized(req: Request)`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L27) · Función. Resuelve si la solicitud corresponde a un canal interno autorizado. La decisión se usa antes de tomar la ruta operativa.
  - **Dónde se usa:** [handler HTTP · versioning-dev-release-create](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L302).
  - **Delega en:** [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L12).
  - **HTTP:** encabezados leídos `x-versioning-proxy-token`.
  - **Retornos explícitos:** booleanos explícitos.
  - **Nombres de configuración consultada:** `VERSIONING_PROXY_SHARED_TOKEN`.
- [`fetchGithubJson(url: string, tokenGithub: string)`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L34) · Función, asíncrona. Obtiene el valor o paso `github json` del flujo de OPS.
  - **Tipo de retorno declarado:** `Promise<{ ok, status, data, detail }>`.
  - **Dónde se usa:** [`resolveWorkflowRunAndJobs` · versioning-dev-release-create](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L122).
  - **Delega en:** [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L12).
  - **Integraciones:** `fetch`.
  - **Retornos explícitos:** objeto con `ok`, `status`, `data`, `detail`.
- [`normalizeWorkflowState({ status, conclusion })`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L73) · Función. Normaliza el estado de ejecución que consume el flujo del flujo de OPS.
  - **Tipo de retorno declarado:** `literal`.
  - **Dónde se usa:** [`resolveWorkflowRunAndJobs` · versioning-dev-release-create](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L225).
  - **Delega en:** [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L12).
- [`resolveWorkflowRunAndJobs({ owner, repo, workflowId, tokenGithub, ref, runId, dispatchStartedAt })`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L102) · Función, asíncrona. Cruza el run y sus trabajos para presentar el estado de la compilación a los clientes.
  - **Dónde se usa:** [handler HTTP · versioning-dev-release-create](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L420).
  - **Delega en:** [`fetchGithubJson`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L34), [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L12), [`asNumber`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L18), [`normalizeWorkflowState`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L73).
  - **Integraciones:** `fetchGithubJson`.
  - **Retornos explícitos:** objeto con `ok`, `error`, `detail`, `status`, `run`, `jobs`, `summary`, `number`, `name`, `conclusion`, `state`, `started_at`, `completed_at`, `id`, `html_url` y 1 más · booleanos explícitos.
- [`handler HTTP(req)`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L290) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `versioning-dev-release-create` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-ops/supabase/functions/_shared/support.ts#L24), [`jsonResponse`](../../../apps/referidos-ops/supabase/functions/_shared/support.ts#L33), [`isInternalProxyAuthorized`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L27), [`requireAuthUser`](../../../apps/referidos-ops/supabase/functions/_shared/support.ts#L44), [`getUsuarioByAuthId`](../../../apps/referidos-ops/supabase/functions/_shared/support.ts#L55), [`resolveUsuarioProfileFailure`](../../../apps/referidos-ops/supabase/functions/_shared/support.ts#L76), [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L12), [`isValidProductKey`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L23), [`getGithubAuthConfig`](../../../apps/referidos-ops/supabase/functions/_shared/github-auth.ts#L123), [`asNumber`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L18), [`resolveWorkflowRunAndJobs`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L102).
  - **Relaciones consultadas en este cuerpo:** [`version_releases_labeled`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L480) → [20260221_000014_versioning_system.sql](../../../apps/referidos-ops/supabase/migrations/20260221_000014_versioning_system.sql#L350), [20260313_000029_versioning_release_metadata_builds.sql](../../../apps/referidos-ops/supabase/migrations/20260313_000029_versioning_release_metadata_builds.sql#L327) (`select`), [`tenants`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L614) → [20260219_000013_ops_versioning_prereqs.sql](../../../apps/referidos-ops/supabase/migrations/20260219_000013_ops_versioning_prereqs.sql#L8) (`select`), [`version_audit_log`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-create/index.ts#L624) → [20260221_000014_versioning_system.sql](../../../apps/referidos-ops/supabase/migrations/20260221_000014_versioning_system.sql#L302) (`insert`).
  - **Integraciones:** `fetch`.
  - **Propiedades de entrada leídas:** `body.actor`, `body.tenant_id`, `body.product_key`, `body.ref`, `body.override_semver`, `body.release_notes`, `body.operation`, `body.mode`, `body.release_id`, `body.releaseId`, `body.source_commit_sha`, `body.sourceCommitSha`, `body.run_id`, `body.dispatch_started_at`, `body.started_at`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `500`, `502` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `detail`, `status`, `operation`, `mode`, `workflow`, `ref`, `run`, `jobs`, `summary`, `base_ref`, `product_key`, `release_id` y 3 más.
  - **Nombres de configuración consultada:** `VERSIONING_DEV_RELEASE_WORKFLOW`, `VERSIONING_DEV_RELEASE_REF`, `DEPLOY_BRANCH_DEV`, `VERSIONING_DEV_RELEASE_ALLOWED_REFS`.

## `versioning-dev-release-preview/index.ts`

Lee archivos y commits del repositorio y reglas del catálogo para clasificar el cambio y sugerir bump y semver. La vista previa ayuda a elegir la release antes de disparar la compilación.

[Abrir archivo fuente](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts)

- **Gateway:** [sección del proyecto](../../../apps/referidos-ops/supabase/config.toml#L51).
- **Referencias literales al nombre del endpoint:** [versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L893).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-ops/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `resolveUsuarioProfileFailure`, `supabaseAdmin` | [../_shared/github-auth.ts](../../../apps/referidos-ops/supabase/functions/_shared/github-auth.ts) · `getGithubAuthConfig`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.
- **Tipos declarados:** [`JsonObject`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L12), [`BumpLevel`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L13), [`ChangedFile`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L14) (`path`, `status`).

### Funciones, handlers y clases

- [`asString(value: unknown, fallback = …)`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L24) · Función. Convierte una entrada en texto utilizable y aplica el fallback recibido cuando la entrada no aporta un valor válido.
  - **Tipo de retorno declarado:** `string`.
  - **Dónde se usa:** [`isInternalProxyAuthorized` · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L225), [`githubJson` · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L247), [`loadComponentMapFromGithub` · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L267), [handler HTTP · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L326).
- [`toPosixPath(value: string)`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L30) · Función. Convierte la ruta de archivo a separadores POSIX del flujo de OPS.
  - **Dónde se usa:** [`normalizeGlob` · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L35), [`matchesGlob` · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L47), [`rootContainsFile` · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L56), [handler HTTP · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L446).
- [`normalizeGlob(glob: string)`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L34) · Función. Normaliza el valor o paso `glob` del flujo de OPS.
  - **Dónde se usa:** [`globToRegExp` · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L39), [`rootContainsFile` · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L55).
  - **Delega en:** [`toPosixPath`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L30).
- [`globToRegExp(glob: string)`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L38) · Función. Implementa el paso `glob to reg exp` del flujo de OPS.
  - **Dónde se usa:** [`matchesGlob` · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L47).
  - **Delega en:** [`normalizeGlob`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L34).
- [`matchesGlob(filePath: string, glob: string)`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L46) · Función. Verifica el valor o paso `glob` del flujo de OPS.
  - **Dónde se usa:** [`matchesAnyGlob` · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L51).
  - **Delega en:** [`globToRegExp`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L38), [`toPosixPath`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L30).
- [`matchesAnyGlob(filePath: string, globs: string[] = …)`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L50) · Función. Verifica el valor o paso `any glob` del flujo de OPS.
  - **Dónde se usa:** [`computeBumpForProduct` · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L172), [handler HTTP · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L471).
  - **Delega en:** [`matchesGlob`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L46).
- [`rootContainsFile(root: string, filePath: string)`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L54) · Función. Implementa el paso `root contains file` del flujo de OPS.
  - **Dónde se usa:** [`filterByRoots` · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L152).
  - **Delega en:** [`normalizeGlob`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L34), [`toPosixPath`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L30).
  - **Retornos explícitos:** booleanos explícitos.
- [`highestBump(...levels)`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L62) · Función. Implementa el paso `highest bump` del flujo de OPS.
  - **Dónde se usa:** [`deriveBumpFromCommits` · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L77), [`computeBumpForProduct` · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L201).
- [`deriveBumpFromCommits(messages: string[])`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L71) · Función. Deriva el tipo de incremento a partir de los mensajes del historial de commits.
  - **Dónde se usa:** [`computeBumpForProduct` · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L169).
  - **Delega en:** [`highestBump`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L62).
- [`parseSemver(value: string)`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L95) · Función. Interpreta el valor o paso `semver` del flujo de OPS.
  - **Dónde se usa:** [`bumpSemver` · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L110).
  - **Retornos explícitos:** objeto con `major`, `minor`, `patch` · null explícito.
- [`semverToString(semver: { major, minor, patch })`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L105) · Función. Implementa el paso `semver to string` del flujo de OPS.
  - **Dónde se usa:** [`bumpSemver` · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L114).
- [`bumpSemver(currentSemver: string, bumpLevel: BumpLevel)`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L109) · Función. Calcula una nueva versión semántica a partir de la versión actual y el nivel de incremento.
  - **Dónde se usa:** [handler HTTP · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L493).
  - **Delega en:** [`parseSemver`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L95), [`semverToString`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L105).
- [`normalizeStatus(status: string)`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L126) · Función. Normaliza el valor o paso `status` del flujo de OPS.
  - **Tipo de retorno declarado:** `literal`.
  - **Dónde se usa:** [handler HTTP · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L445).
- [`dedupeChangedFiles(rows: ChangedFile[])`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L135) · Función. Implementa el paso `dedupe changed files` del flujo de OPS.
  - **Dónde se usa:** [handler HTTP · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L456).
- [`filterByRoots(files: ChangedFile[], roots: string[])`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L151) · Función. Implementa el paso `filter by roots` del flujo de OPS.
  - **Dónde se usa:** [handler HTTP · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L472).
  - **Delega en:** [`rootContainsFile`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L54).
- [`computeBumpForProduct({ changedFiles, commitMessages, docOnlyGlobs, contractGlobs, minorGlobs })`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L155) · Función. Combina paths, componentes y reglas de incremento para proponer una versión por producto.
  - **Dónde se usa:** [handler HTTP · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L479).
  - **Delega en:** [`deriveBumpFromCommits`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L71), [`matchesAnyGlob`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L50), [`highestBump`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L62).
  - **Retornos explícitos:** objeto con `bumpLevel`, `source`, `requiresMajorAck`, `contractHits`, `minorHits`, `docOnly`.
- [`isValidProductKey(value: string)`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L220) · Función. Comprueba el valor o paso `valid product key` del flujo de OPS.
  - **Dónde se usa:** [handler HTTP · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L327).
- [`isInternalProxyAuthorized(req: Request)`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L224) · Función. Resuelve si la solicitud corresponde a un canal interno autorizado. La decisión se usa antes de tomar la ruta operativa.
  - **Dónde se usa:** [handler HTTP · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L302).
  - **Delega en:** [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L24).
  - **HTTP:** encabezados leídos `x-versioning-proxy-token`.
  - **Retornos explícitos:** booleanos explícitos.
  - **Nombres de configuración consultada:** `VERSIONING_PROXY_SHARED_TOKEN`.
- [`githubJson(url: string, token: string)`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L231) · Función, asíncrona. Implementa el paso `github json` del flujo de OPS.
  - **Dónde se usa:** [`loadComponentMapFromGithub` · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L266), [handler HTTP · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L398).
  - **Delega en:** [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L24).
  - **Integraciones:** `fetch`.
- [`loadComponentMapFromGithub({ owner, repo, ref, token })`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L253) · Función, asíncrona. Lee desde el repositorio el mapa de productos y componentes necesario para clasificar cambios.
  - **Dónde se usa:** [handler HTTP · versioning-dev-release-preview](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L458).
  - **Delega en:** [`githubJson`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L231), [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L24).
- [`handler HTTP(req)`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L290) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `versioning-dev-release-preview` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-ops/supabase/functions/_shared/support.ts#L24), [`jsonResponse`](../../../apps/referidos-ops/supabase/functions/_shared/support.ts#L33), [`isInternalProxyAuthorized`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L224), [`requireAuthUser`](../../../apps/referidos-ops/supabase/functions/_shared/support.ts#L44), [`getUsuarioByAuthId`](../../../apps/referidos-ops/supabase/functions/_shared/support.ts#L55), [`resolveUsuarioProfileFailure`](../../../apps/referidos-ops/supabase/functions/_shared/support.ts#L76), [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L24), [`isValidProductKey`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L220), [`getGithubAuthConfig`](../../../apps/referidos-ops/supabase/functions/_shared/github-auth.ts#L123), [`githubJson`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L231), [`normalizeStatus`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L126), [`toPosixPath`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L30) y 6 más.
  - **Relaciones consultadas en este cuerpo:** [`version_releases_labeled`](../../../apps/referidos-ops/supabase/functions/versioning-dev-release-preview/index.ts#L385) → [20260221_000014_versioning_system.sql](../../../apps/referidos-ops/supabase/migrations/20260221_000014_versioning_system.sql#L350), [20260313_000029_versioning_release_metadata_builds.sql](../../../apps/referidos-ops/supabase/migrations/20260313_000029_versioning_release_metadata_builds.sql#L327) (`select`).
  - **Propiedades de entrada leídas:** `body.product_key`, `body.ref`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `405`, `500` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `detail`, `product_key`, `ref`, `compare_base_sha`, `compare_head_sha`, `compare_base_mode`, `compare_fallback_reason`, `current_semver`, `suggested_semver`, `suggested_bump`, `suggestion_source`, `requires_major_ack` y 9 más.
  - **Nombres de configuración consultada:** `VERSIONING_DEV_RELEASE_REF`, `DEPLOY_BRANCH_DEV`, `VERSIONING_DEV_RELEASE_ALLOWED_REFS`.

## `versioning-release-gate/index.ts`

Resuelve release y destino, obtiene migraciones requeridas de cambios registrados y consulta el inventario runtime. También coordina el workflow de aplicar migraciones cuando se pide y registra validaciones de entorno. Cubre dependencias de DB y configuración antes de sacar una release.

[Abrir archivo fuente](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts)

- **Gateway:** [ajuste de esta función](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/config.toml) y [sección del proyecto](../../../apps/referidos-ops/supabase/config.toml#L60).
- **Referencias literales al nombre del endpoint:** [versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L920), [versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L954), [versioning-ops-proxy](../../../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts#L989), [versioning-deploy-execute](../../../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts#L567).
- **Importaciones locales:** [../_shared/support.ts](../../../apps/referidos-ops/supabase/functions/_shared/support.ts) · `corsHeaders`, `getUsuarioByAuthId`, `jsonResponse`, `requireAuthUser`, `resolveUsuarioProfileFailure`, `supabaseAdmin` | [../_shared/github-auth.ts](../../../apps/referidos-ops/supabase/functions/_shared/github-auth.ts) · `getGithubAuthConfig`.
- **Dependencias externas:** `https://deno.land/std@0.193.0/http/server.ts`.
- **Tipos declarados:** [`JsonObject`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L12), [`ReleaseRow`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L14) (`id`, `tenant_id`, `product_key`, `env_key`, `version_label`, `source_changeset_id`, `source_commit_sha`), [`RequiredMigration`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L24) (`version`, `file_name`, `path`).

### Funciones, handlers y clases

- [`asString(value: unknown, fallback = …)`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L66) · Función. Convierte una entrada en texto utilizable y aplica el fallback recibido cuando la entrada no aporta un valor válido.
  - **Tipo de retorno declarado:** `string`.
  - **Dónde se usa:** [`isInternalProxyAuthorized` · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L86), [`resolveRuntimeBaseUrl` · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L103), [`resolveRuntimeProjectRef` · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L112), [`resolveTargetBranch` · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L127), [`normalizeChangedPaths` · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L145), [`parseMigrationFromPath` · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L153), 6 más en el código.
- [`asBoolean(value: unknown, fallback = …)`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L72) · Función. Normaliza una opción booleana sin delegar la interpretación al consumidor.
  - **Tipo de retorno declarado:** `boolean`.
  - **Dónde se usa:** [handler HTTP · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L693).
- [`asArray(value: unknown)`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L77) · Función. Reduce una entrada desconocida a una lista para que los consumidores puedan iterar con seguridad.
  - **Tipo de retorno declarado:** `unknown[]`.
  - **Dónde se usa:** [`normalizeChangedPaths` · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L137), [`checkReleaseMigrations` · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L356), [`fetchGithubSecretNames` · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L490), [handler HTTP · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L751).
- [`envVarKey(input: string)`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L81) · Función. Implementa el paso `env var key` del flujo de OPS.
  - **Tipo de retorno declarado:** `string`.
  - **Dónde se usa:** [`resolveRuntimeBaseUrl` · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L102), [`resolveRuntimeProjectRef` · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L111), [`invokeRuntimeMigrations` · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L254), [handler HTTP · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L800).
- [`isInternalProxyAuthorized(req: Request)`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L85) · Función. Resuelve si la solicitud corresponde a un canal interno autorizado. La decisión se usa antes de tomar la ruta operativa.
  - **Dónde se usa:** [handler HTTP · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L588).
  - **Delega en:** [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L66).
  - **Retornos explícitos:** booleanos explícitos.
  - **Nombres de configuración consultada:** `VERSIONING_PROXY_SHARED_TOKEN`.
- [`corsWithInternalHeader(origin: string | null)`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L92) · Función. Prepara los encabezados CORS de la respuesta para el canal interno.
  - **Dónde se usa:** [handler HTTP · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L578).
  - **Delega en:** [`corsHeaders`](../../../apps/referidos-ops/supabase/functions/_shared/support.ts#L24).
- [`resolveRuntimeBaseUrl(envKey: string)`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L101) · Función. Resuelve la URL configurada para el runtime del entorno.
  - **Dónde se usa:** [`resolveRuntimeProjectRef` · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L115), [`invokeRuntimeMigrations` · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L246).
  - **Delega en:** [`envVarKey`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L81), [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L66).
- [`resolveRuntimeProjectRef(envKey: string)`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L110) · Función. Identifica el proyecto runtime vinculado al entorno de release.
  - **Dónde se usa:** [handler HTTP · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L793).
  - **Delega en:** [`envVarKey`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L81), [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L66), [`resolveRuntimeBaseUrl`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L101).
- [`resolveTargetBranch(envKey: string)`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L126) · Función. Determina la rama Git de destino del flujo de OPS.
  - **Dónde se usa:** [handler HTTP · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L791).
  - **Delega en:** [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L66).
  - **Nombres de configuración consultada:** `DEPLOY_BRANCH_DEV`, `DEPLOY_BRANCH_STAGING`, `DEPLOY_BRANCH_PROD`.
- [`normalizeChangedPaths(value: unknown)`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L135) · Función. Normaliza los paths de archivo modificados del flujo de OPS.
  - **Tipo de retorno declarado:** `string[]`.
  - **Dónde se usa:** [`loadRequiredMigrationsFromRelease` · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L215).
  - **Delega en:** [`asArray`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L77), [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L66).
- [`parseMigrationFromPath(pathValue: string)`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L152) · Función. Interpreta el valor o paso `migration from path` del flujo de OPS.
  - **Tipo de retorno declarado:** `RequiredMigration | null`.
  - **Dónde se usa:** [`loadRequiredMigrationsFromRelease` · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L217).
  - **Delega en:** [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L66).
  - **Retornos explícitos:** objeto con `version`, `file_name`, `path` · null explícito.
- [`resolveRelease(productKey: string, envKey: string, semver: string)`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L171) · Función, asíncrona. Determina el valor o paso `release` del flujo de OPS.
  - **Dónde se usa:** [`checkReleaseMigrations` · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L322).
  - **Relaciones consultadas en este cuerpo:** [`version_releases_labeled`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L172) → [20260221_000014_versioning_system.sql](../../../apps/referidos-ops/supabase/migrations/20260221_000014_versioning_system.sql#L350), [20260313_000029_versioning_release_metadata_builds.sql](../../../apps/referidos-ops/supabase/migrations/20260313_000029_versioning_release_metadata_builds.sql#L327) (`select`).
  - **Retornos explícitos:** objeto con `ok`, `error`, `detail`, `release`.
- [`loadRequiredMigrationsFromRelease(release: ReleaseRow)`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L194) · Función, asíncrona. Obtiene de los cambios y metadatos de release la lista que se verificará contra el runtime.
  - **Dónde se usa:** [`checkReleaseMigrations` · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L334).
  - **Delega en:** [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L66), [`normalizeChangedPaths`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L135), [`parseMigrationFromPath`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L152).
  - **Relaciones consultadas en este cuerpo:** [`version_changeset_items`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L204) → [20260221_000014_versioning_system.sql](../../../apps/referidos-ops/supabase/migrations/20260221_000014_versioning_system.sql#L183) (`select`).
  - **Retornos explícitos:** objeto con `required_migrations`, `required_versions`, `from_changeset`.
- [`invokeRuntimeMigrations({ envKey, operation, payload })`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L237) · Función, asíncrona. Consulta o coordina con el endpoint runtime encargado de las migraciones del entorno.
  - **Dónde se usa:** [`checkReleaseMigrations` · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L335), [handler HTTP · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L923).
  - **Delega en:** [`resolveRuntimeBaseUrl`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L101), [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L66), [`envVarKey`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L81).
  - **Integraciones:** `fetch`.
  - **Retornos explícitos:** objeto con `ok`, `status`, `error`, `detail`, `payload`, `endpoint`.
  - **Nombres de configuración consultada:** `VERSIONING_PROXY_SHARED_TOKEN`.
- [`checkReleaseMigrations({ productKey, envKey, semver })`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L313) · Función, asíncrona. Compara las migraciones necesarias para la release con el inventario obtenido del runtime.
  - **Dónde se usa:** [handler HTTP · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L664).
  - **Delega en:** [`resolveRelease`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L171), [`loadRequiredMigrationsFromRelease`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L194), [`invokeRuntimeMigrations`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L237), [`asArray`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L77), [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L66).
  - **Retornos explícitos:** objeto con `ok`, `status`, `error`, `detail`, `payload`.
- [`dispatchGithubWorkflow({ owner, repo, token, workflowId, workflowRef, inputs })`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L389) · Función, asíncrona. Inicia un workflow de GitHub Actions con los parámetros de la operación ya validada.
  - **Dónde se usa:** [handler HTTP · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L811).
  - **Delega en:** [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L66).
  - **Integraciones:** `fetch`.
  - **Retornos explícitos:** objeto con `ok`, `status`, `detail`, `payload`.
- [`fetchGithubSecretNames({ owner, repo, token })`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L446) · Función, asíncrona. Obtiene el valor o paso `github secret names` del flujo de OPS.
  - **Dónde se usa:** [handler HTTP · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L938).
  - **Delega en:** [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L66), [`asArray`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L77).
  - **Integraciones:** `fetch`.
  - **Retornos explícitos:** objeto con `ok`, `status`, `detail`, `names`.
- [`requiredGithubSiteSecret(productKey: string, envKey: string)`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L509) · Función. Implementa el paso `required github site secret` del flujo de OPS.
  - **Dónde se usa:** [handler HTTP · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L945).
- [`resolveTenantProductEnv({ productKey, envKey })`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L525) · Función, asíncrona. Ubica el ámbito completo de tenant, producto y entorno en la base de versionado.
  - **Dónde se usa:** [handler HTTP · versioning-release-gate](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L910).
  - **Relaciones consultadas en este cuerpo:** [`version_products`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L532) → [20260221_000014_versioning_system.sql](../../../apps/referidos-ops/supabase/migrations/20260221_000014_versioning_system.sql#L55) (`select`), [`version_environments`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L549) → [20260221_000014_versioning_system.sql](../../../apps/referidos-ops/supabase/migrations/20260221_000014_versioning_system.sql#L72) (`select`).
  - **Retornos explícitos:** objeto con `ok`, `detail`, `tenantId`, `productId`, `envId`.
- [`handler HTTP(req)`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L576) · Entrada HTTP, asíncrona. Registra la entrada HTTP de `versioning-release-gate` y traduce el resultado del flujo descrito arriba a una respuesta.
  - **Delega en:** [`corsWithInternalHeader`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L92), [`jsonResponse`](../../../apps/referidos-ops/supabase/functions/_shared/support.ts#L33), [`isInternalProxyAuthorized`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L85), [`asString`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L66), [`requireAuthUser`](../../../apps/referidos-ops/supabase/functions/_shared/support.ts#L44), [`getUsuarioByAuthId`](../../../apps/referidos-ops/supabase/functions/_shared/support.ts#L55), [`resolveUsuarioProfileFailure`](../../../apps/referidos-ops/supabase/functions/_shared/support.ts#L76), [`checkReleaseMigrations`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L313), [`asBoolean`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L72), [`asArray`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L77), [`getGithubAuthConfig`](../../../apps/referidos-ops/supabase/functions/_shared/github-auth.ts#L123), [`resolveTargetBranch`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L126) y 7 más.
  - **Relaciones consultadas en este cuerpo:** [`version_audit_log`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L683) → [20260221_000014_versioning_system.sql](../../../apps/referidos-ops/supabase/migrations/20260221_000014_versioning_system.sql#L302) (`insert`), [`version_env_validations`](../../../apps/referidos-ops/supabase/functions/versioning-release-gate/index.ts#L1001) → [20260314_000030_versioning_phase4_env_validation.sql](../../../apps/referidos-ops/supabase/migrations/20260314_000030_versioning_phase4_env_validation.sql#L3) (`insert`).
  - **Integraciones:** `crypto.randomUUID`, `fetchGithubSecretNames`.
  - **Propiedades de entrada leídas:** `body.actor`, `body.operation`, `body.product_key`, `body.to_env`, `body.env_key`, `body.semver`, `body.source_branch`, `body.target_branch`.
  - **HTTP:** métodos comparados `OPTIONS`, `POST` · estados de respuesta visibles `200`, `400`, `401`, `403`, `404`, `405`, `500`, `502` · encabezados leídos `origin`, `authorization` · campos de respuesta `ok`, `error`, `detail`, `operation`, `already_applied`, `gate_passed`, `missing_versions`, `release`, `github`, `dispatched`, `request_id`, `logs_url`, `workflow`, `target_project_ref` y 4 más.
  - **Nombres de configuración consultada:** `VERSIONING_APPLY_MIGRATIONS_WORKFLOW`, `VERSIONING_APPLY_MIGRATIONS_WORKFLOW_REF`.
