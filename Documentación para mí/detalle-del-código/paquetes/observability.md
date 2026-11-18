# Paquetes compartidos · observability

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`packages/observability/src/breadcrumbs/catalog.js`](../../../packages/observability/src/breadcrumbs/catalog.js#L1)
- [`packages/observability/src/client/createObservabilityClient.js`](../../../packages/observability/src/client/createObservabilityClient.js#L1)
- [`packages/observability/src/index.js`](../../../packages/observability/src/index.js#L1)
- [`packages/observability/src/policy/uxPolicy.js`](../../../packages/observability/src/policy/uxPolicy.js#L1)
- [`packages/observability/src/runtime/createErrorRuntime.js`](../../../packages/observability/src/runtime/createErrorRuntime.js#L1)
- [`packages/observability/src/runtime/errorBus.js`](../../../packages/observability/src/runtime/errorBus.js#L1)
- [`packages/observability/src/schema/envelope.js`](../../../packages/observability/src/schema/envelope.js#L1)
- [`packages/observability/src/schema/errorCodes.js`](../../../packages/observability/src/schema/errorCodes.js#L1)
- [`packages/observability/src/utils/scrub.js`](../../../packages/observability/src/utils/scrub.js#L1)

## Símbolos y conexiones

### [`packages/observability/src/breadcrumbs/catalog.js`](../../../packages/observability/src/breadcrumbs/catalog.js#L1)

Catálogo de acciones diagnósticas y su versión. Construye breadcrumbs con vocabulario estable para analizar secuencias.

**Superficie que exporta.** [`OBS_BREADCRUMB_CATALOG_VERSION`](../../../packages/observability/src/breadcrumbs/catalog.js#L1), [`OBS_BREADCRUMB_CATALOG`](../../../packages/observability/src/breadcrumbs/catalog.js#L5), [`getBreadcrumbTemplate`](../../../packages/observability/src/breadcrumbs/catalog.js#L109), [`buildCatalogBreadcrumb`](../../../packages/observability/src/breadcrumbs/catalog.js#L115).

**Módulos que lo cargan.** [`createObservabilityClient.js`](../../../packages/observability/src/client/createObservabilityClient.js#L6) (importa), [`index.js`](../../../packages/observability/src/index.js#L17) (reexporta OBS_BREADCRUMB_CATALOG_VERSION).

#### [`OBS_BREADCRUMB_CATALOG_VERSION`](../../../packages/observability/src/breadcrumbs/catalog.js#L1) · variable de módulo · exportado

Declara `OBS_BREADCRUMB_CATALOG_VERSION` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`buildBreadcrumbMeta`](../../../packages/observability/src/client/createObservabilityClient.js#L373) (referencia).

#### [`OBS_BREADCRUMB_CATALOG`](../../../packages/observability/src/breadcrumbs/catalog.js#L5) · variable de módulo · exportado

Declara `OBS_BREADCRUMB_CATALOG` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`getBreadcrumbTemplate`](../../../packages/observability/src/breadcrumbs/catalog.js#L112) (accede al módulo).

#### [`getBreadcrumbTemplate`](../../../packages/observability/src/breadcrumbs/catalog.js#L109) · función · exportado

Obtiene o resuelve `Breadcrumb Template` para entregarlo al consumidor.

- **Entradas** `code`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de key`.
- **Llamadas directas en el cuerpo** [`code.trim`](../../../packages/observability/src/breadcrumbs/catalog.js#L110).
- **Lo usa** [`buildCatalogBreadcrumb`](../../../packages/observability/src/breadcrumbs/catalog.js#L116) (llama), [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L174) (llama).

#### [`buildCatalogBreadcrumb`](../../../packages/observability/src/breadcrumbs/catalog.js#L115) · función · exportado

Construye `Catalog Breadcrumb` a partir de los datos del flujo.

- **Entradas** `code`, `data = valor por defecto`, `overrides = valor por defecto`.
- **Retorno visible o tipo declarado** `null`, `code`, `type`, `message`, `channel`, `timestamp`, `data`.
- **Condiciones que evalúa** `ausencia de safeCode`.
- **Llamadas directas en el cuerpo** [`getBreadcrumbTemplate`](../../../packages/observability/src/breadcrumbs/catalog.js#L116), [`code.trim`](../../../packages/observability/src/breadcrumbs/catalog.js#L117), [`toISOString`](../../../packages/observability/src/breadcrumbs/catalog.js#L124).
- **Lo usa** [`addCatalogBreadcrumb`](../../../packages/observability/src/client/createObservabilityClient.js#L273) (llama).

### [`packages/observability/src/client/createObservabilityClient.js`](../../../packages/observability/src/client/createObservabilityClient.js#L1)

Facilita captura de errores, cola, deduplicación, envío por lotes y breadcrumbs de contexto. Se configura por app y destino.

**Superficie que exporta.** [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142).

**Módulos que lo cargan.** [`index.js`](../../../packages/observability/src/index.js#L1) (reexporta createObservabilityClient).

**Dependencias del archivo.** [`../schema/envelope.js`](../../../packages/observability/src/schema/envelope.js), [`../breadcrumbs/catalog.js`](../../../packages/observability/src/breadcrumbs/catalog.js), [`../utils/scrub.js`](../../../packages/observability/src/utils/scrub.js).

#### [`MAX_QUEUE`](../../../packages/observability/src/client/createObservabilityClient.js#L9) · variable de módulo

Declara `MAX_QUEUE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`loadQueue`](../../../packages/observability/src/client/createObservabilityClient.js#L199) (referencia), [`flush`](../../../packages/observability/src/client/createObservabilityClient.js#L326) (referencia), [`enqueue`](../../../packages/observability/src/client/createObservabilityClient.js#L340) (referencia).

#### [`MAX_BATCH`](../../../packages/observability/src/client/createObservabilityClient.js#L10) · variable de módulo

Declara `MAX_BATCH` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`flush`](../../../packages/observability/src/client/createObservabilityClient.js#L312) (referencia).

#### [`FLUSH_INTERVAL_MS`](../../../packages/observability/src/client/createObservabilityClient.js#L11) · variable de módulo

Declara `FLUSH_INTERVAL_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`scheduleFlush`](../../../packages/observability/src/client/createObservabilityClient.js#L291) (referencia).

#### [`DEDUPE_WINDOW_MS`](../../../packages/observability/src/client/createObservabilityClient.js#L12) · variable de módulo

Declara `DEDUPE_WINDOW_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`shouldDedupe`](../../../packages/observability/src/client/createObservabilityClient.js#L281) (referencia).

#### [`STORAGE_KEY`](../../../packages/observability/src/client/createObservabilityClient.js#L13) · variable de módulo

Declara `STORAGE_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`persistQueue`](../../../packages/observability/src/client/createObservabilityClient.js#L186) (referencia), [`loadQueue`](../../../packages/observability/src/client/createObservabilityClient.js#L195) (referencia).

#### [`SESSION_KEY`](../../../packages/observability/src/client/createObservabilityClient.js#L14) · variable de módulo

Declara `SESSION_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`getSessionId`](../../../packages/observability/src/client/createObservabilityClient.js#L48) (referencia).

#### [`BREADCRUMB_STORAGE_KEY`](../../../packages/observability/src/client/createObservabilityClient.js#L15) · variable de módulo

Declara `BREADCRUMB_STORAGE_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`persistBreadcrumbs`](../../../packages/observability/src/client/createObservabilityClient.js#L219) (referencia), [`loadPersistedBreadcrumbs`](../../../packages/observability/src/client/createObservabilityClient.js#L232) (referencia).

#### [`MAX_BREADCRUMBS`](../../../packages/observability/src/client/createObservabilityClient.js#L16) · variable de módulo

Declara `MAX_BREADCRUMBS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`pruneBreadcrumbList`](../../../packages/observability/src/client/createObservabilityClient.js#L120) (referencia).

#### [`DEFAULT_BREADCRUMB_TTL_MS`](../../../packages/observability/src/client/createObservabilityClient.js#L17) · variable de módulo

Declara `DEFAULT_BREADCRUMB_TTL_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L154) (referencia).

#### [`stableHash`](../../../packages/observability/src/client/createObservabilityClient.js#L19) · función

Implementa `stable Hash` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `input`.
- **Llamadas directas en el cuerpo** [`input.charCodeAt`](../../../packages/observability/src/client/createObservabilityClient.js#L22).
- **Lo usa** [`capture`](../../../packages/observability/src/client/createObservabilityClient.js#L429) (llama).

#### [`routePath`](../../../packages/observability/src/client/createObservabilityClient.js#L28) · función

Implementa `route Path` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Condiciones que evalúa** `undefined`.
- **Lo usa** [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L173) (llama), [`capture`](../../../packages/observability/src/client/createObservabilityClient.js#L418) (llama), [`setEnabled`](../../../packages/observability/src/client/createObservabilityClient.js#L505) (llama), [`onError`](../../../packages/observability/src/client/createObservabilityClient.js#L520) (llama), [`onRejection`](../../../packages/observability/src/client/createObservabilityClient.js#L531) (llama), [`init`](../../../packages/observability/src/client/createObservabilityClient.js#L616) (llama), [`onOnline`](../../../packages/observability/src/client/createObservabilityClient.js#L626) (llama), [`onVisibilityChange`](../../../packages/observability/src/client/createObservabilityClient.js#L631) (llama).

#### [`safeInteger`](../../../packages/observability/src/client/createObservabilityClient.js#L33) · función

Implementa `safe Integer` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`, `fallback`.
- **Condiciones que evalúa** `ausencia de Number.isFinite o parsed`.
- **Lo usa** [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L157) (llama).

#### [`toIso`](../../../packages/observability/src/client/createObservabilityClient.js#L39) · función

Implementa `to Iso` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`, `fallbackIso = valor por defecto`.
- **Condiciones que evalúa** `ausencia de value`, `Number.isNaN`.
- **Llamadas directas en el cuerpo** [`toISOString`](../../../packages/observability/src/client/createObservabilityClient.js#L40), [`parsed.getTime`](../../../packages/observability/src/client/createObservabilityClient.js#L42), [`parsed.toISOString`](../../../packages/observability/src/client/createObservabilityClient.js#L43).
- **Lo usa** [`normalizeBreadcrumbEntry`](../../../packages/observability/src/client/createObservabilityClient.js#L100) (llama).

#### [`getSessionId`](../../../packages/observability/src/client/createObservabilityClient.js#L46) · función

Obtiene o resuelve `Session Id` para entregarlo al consumidor.

- **Retorno visible o tipo declarado** `null`.
- **Actualizaciones de estado o acciones** `setItem`.
- **Efectos y APIs** `sessionStorage.getItem`, `globalThis.crypto.randomUUID`, `sessionStorage.setItem`.
- **Condiciones que evalúa** `undefined`, `existing`.
- **Llamadas directas en el cuerpo** [`sessionStorage.getItem`](../../../packages/observability/src/client/createObservabilityClient.js#L48), [`globalThis.crypto.randomUUID`](../../../packages/observability/src/client/createObservabilityClient.js#L51), [`slice`](../../../packages/observability/src/client/createObservabilityClient.js#L52), [`toString`](../../../packages/observability/src/client/createObservabilityClient.js#L52), [`sessionStorage.setItem`](../../../packages/observability/src/client/createObservabilityClient.js#L53).
- **Lo usa** [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L174) (llama).

#### [`asObject`](../../../packages/observability/src/client/createObservabilityClient.js#L57) · función

Implementa `as Object` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Condiciones que evalúa** `value y object y ausencia de Array.isArray`.
- **Lo usa** [`normalizeBreadcrumbEntry`](../../../packages/observability/src/client/createObservabilityClient.js#L89) (llama), [`buildBreadcrumbMeta`](../../../packages/observability/src/client/createObservabilityClient.js#L378) (llama).

#### [`asString`](../../../packages/observability/src/client/createObservabilityClient.js#L62) · función

Implementa `as String` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `string`, `number o boolean`.
- **Llamadas directas en el cuerpo** [`value.trim`](../../../packages/observability/src/client/createObservabilityClient.js#L64).
- **Lo usa** [`normalizeBreadcrumbEntry`](../../../packages/observability/src/client/createObservabilityClient.js#L91) (llama), [`setRuntimeHealth`](../../../packages/observability/src/client/createObservabilityClient.js#L510) (llama), [`onError`](../../../packages/observability/src/client/createObservabilityClient.js#L521) (llama), [`window.fetch`](../../../packages/observability/src/client/createObservabilityClient.js#L587) (llama), [`init`](../../../packages/observability/src/client/createObservabilityClient.js#L651) (llama).

#### [`normalizeBreadcrumbEntry`](../../../packages/observability/src/client/createObservabilityClient.js#L73) · función

Normaliza `Breadcrumb Entry` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `entry`.
- **Retorno visible o tipo declarado** `null`, `type`, `timestamp`, `message`, `code`, `channel`, `data`.
- **Condiciones que evalúa** `ausencia de entry`, `string`, `ausencia de message`, `object o Array.isArray`.
- **Usa código de** [`scrubUnknown`](../../../packages/observability/src/utils/scrub.js#L34) (llama).
- **Llamadas directas en el cuerpo** [`entry.trim`](../../../packages/observability/src/client/createObservabilityClient.js#L76), [`toISOString`](../../../packages/observability/src/client/createObservabilityClient.js#L80), [`asObject`](../../../packages/observability/src/client/createObservabilityClient.js#L89), [`scrubUnknown`](../../../packages/observability/src/client/createObservabilityClient.js#L89), [`asString`](../../../packages/observability/src/client/createObservabilityClient.js#L91), [`toIso`](../../../packages/observability/src/client/createObservabilityClient.js#L100).
- **Lo usa** [`pruneBreadcrumbList`](../../../packages/observability/src/client/createObservabilityClient.js#L114) (llama), [`rememberBreadcrumb`](../../../packages/observability/src/client/createObservabilityClient.js#L258) (llama).

#### [`pruneBreadcrumbList`](../../../packages/observability/src/client/createObservabilityClient.js#L108) · función

Procesa `Breadcrumb List` según el criterio del módulo.

- **Entradas** `list`, `ttlMs`.
- **Efectos y APIs** `normalized.push`.
- **Condiciones que evalúa** `ausencia de next`, `Number.isNaN o atMs`, `normalized.length`.
- **Llamadas directas en el cuerpo** [`normalizeBreadcrumbEntry`](../../../packages/observability/src/client/createObservabilityClient.js#L114), [`normalized.push`](../../../packages/observability/src/client/createObservabilityClient.js#L118), [`normalized.slice`](../../../packages/observability/src/client/createObservabilityClient.js#L121).
- **Lo usa** [`persistBreadcrumbs`](../../../packages/observability/src/client/createObservabilityClient.js#L217) (llama), [`loadPersistedBreadcrumbs`](../../../packages/observability/src/client/createObservabilityClient.js#L238) (llama), [`pruneStateBreadcrumbs`](../../../packages/observability/src/client/createObservabilityClient.js#L250) (llama), [`rememberBreadcrumb`](../../../packages/observability/src/client/createObservabilityClient.js#L261) (llama), [`capture`](../../../packages/observability/src/client/createObservabilityClient.js#L401) (llama), [`init`](../../../packages/observability/src/client/createObservabilityClient.js#L613) (llama).

#### [`inferMissingBreadcrumbReason`](../../../packages/observability/src/client/createObservabilityClient.js#L124) · función

Implementa `infer Missing Breadcrumb Reason` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `{count, runtimeInitialized, runtimeHealth, storageStatus, sourceHint, explicitProvided}`.
- **Condiciones que evalúa** `count`, `runtimeInitialized`, `runtimeHealth`, `storageStatus`, `sourceHint y explicitProvided`.
- **Lo usa** [`buildBreadcrumbMeta`](../../../packages/observability/src/client/createObservabilityClient.js#L384) (llama).

#### [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142) · función · exportado

Construye el cliente web de eventos. Arma contexto de entorno y release, mantiene breadcrumbs, deduplica eventos y coordina su envío por lotes.

- **Entradas** `options = valor por defecto`.
- **Retorno visible o tipo declarado** `init`, `flush`, `setContext`, `setEnabled`, `setRuntimeHealth`, `addBreadcrumb`, `addCatalogBreadcrumb`, `captureMessage`, `captureException`, `fetchPolicy`, `getState`.
- **Usa código de** [`buildReleaseFromEnv`](../../../packages/observability/src/schema/envelope.js#L7) (llama).
- **Llamadas directas en el cuerpo** [`safeInteger`](../../../packages/observability/src/client/createObservabilityClient.js#L157), [`buildReleaseFromEnv`](../../../packages/observability/src/client/createObservabilityClient.js#L158), [`routePath`](../../../packages/observability/src/client/createObservabilityClient.js#L173), [`getSessionId`](../../../packages/observability/src/client/createObservabilityClient.js#L174).
- **Lo usa** [`initPrelaunchObservability`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L85) (llama), [`loggingClient.js`](../../../apps/referidos-app/src/services/loggingClient.js#L43) (llama).

#### [`persistQueue`](../../../packages/observability/src/client/createObservabilityClient.js#L183) · función · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Aplica o guarda `Queue` para que el estado refleje la operación.

- **Actualizaciones de estado o acciones** `setItem`.
- **Efectos y APIs** `localStorage.setItem`.
- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`localStorage.setItem`](../../../packages/observability/src/client/createObservabilityClient.js#L186).
- **Lo usa** [`flush`](../../../packages/observability/src/client/createObservabilityClient.js#L314) (llama), [`enqueue`](../../../packages/observability/src/client/createObservabilityClient.js#L343) (llama).

#### [`loadQueue`](../../../packages/observability/src/client/createObservabilityClient.js#L192) · función · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Obtiene o resuelve `Queue` para entregarlo al consumidor.

- **Efectos y APIs** `localStorage.getItem`.
- **Condiciones que evalúa** `undefined`, `ausencia de raw`, `Array.isArray`.
- **Llamadas directas en el cuerpo** [`localStorage.getItem`](../../../packages/observability/src/client/createObservabilityClient.js#L195), [`parsed.slice`](../../../packages/observability/src/client/createObservabilityClient.js#L199).
- **Lo usa** [`init`](../../../packages/observability/src/client/createObservabilityClient.js#L610) (llama).

#### [`markBreadcrumbStorageStatus`](../../../packages/observability/src/client/createObservabilityClient.js#L206) · función · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Función auxiliar de `createObservabilityClient` para `mark Breadcrumb Storage Status`.

- **Entradas** `status`.
- **Condiciones que evalúa** `ausencia de status o status`.
- **Lo usa** [`persistBreadcrumbs`](../../../packages/observability/src/client/createObservabilityClient.js#L214) (llama), [`loadPersistedBreadcrumbs`](../../../packages/observability/src/client/createObservabilityClient.js#L229) (llama).

#### [`persistBreadcrumbs`](../../../packages/observability/src/client/createObservabilityClient.js#L211) · función · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Aplica o guarda `Breadcrumbs` para que el estado refleje la operación.

- **Actualizaciones de estado o acciones** `markBreadcrumbStorageStatus`, `setItem`.
- **Efectos y APIs** `localStorage.setItem`.
- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`markBreadcrumbStorageStatus`](../../../packages/observability/src/client/createObservabilityClient.js#L214), [`pruneBreadcrumbList`](../../../packages/observability/src/client/createObservabilityClient.js#L217), [`localStorage.setItem`](../../../packages/observability/src/client/createObservabilityClient.js#L219).
- **Lo usa** [`pruneStateBreadcrumbs`](../../../packages/observability/src/client/createObservabilityClient.js#L252) (llama), [`rememberBreadcrumb`](../../../packages/observability/src/client/createObservabilityClient.js#L268) (llama).

#### [`loadPersistedBreadcrumbs`](../../../packages/observability/src/client/createObservabilityClient.js#L226) · función · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Obtiene o resuelve `Persisted Breadcrumbs` para entregarlo al consumidor.

- **Retorno visible o tipo declarado** `lista`.
- **Actualizaciones de estado o acciones** `markBreadcrumbStorageStatus`.
- **Efectos y APIs** `localStorage.getItem`.
- **Condiciones que evalúa** `undefined`, `ausencia de raw`.
- **Llamadas directas en el cuerpo** [`markBreadcrumbStorageStatus`](../../../packages/observability/src/client/createObservabilityClient.js#L229), [`localStorage.getItem`](../../../packages/observability/src/client/createObservabilityClient.js#L232), [`pruneBreadcrumbList`](../../../packages/observability/src/client/createObservabilityClient.js#L238).
- **Lo usa** [`init`](../../../packages/observability/src/client/createObservabilityClient.js#L611) (llama).

#### [`pruneStateBreadcrumbs`](../../../packages/observability/src/client/createObservabilityClient.js#L248) · función · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Procesa `State Breadcrumbs` según el criterio del módulo.

- **Entradas** `{persist} = valor por defecto`.
- **Condiciones que evalúa** `persist y before`.
- **Llamadas directas en el cuerpo** [`pruneBreadcrumbList`](../../../packages/observability/src/client/createObservabilityClient.js#L250), [`persistBreadcrumbs`](../../../packages/observability/src/client/createObservabilityClient.js#L252).
- **Lo usa** [`capture`](../../../packages/observability/src/client/createObservabilityClient.js#L397) (llama).

#### [`rememberBreadcrumb`](../../../packages/observability/src/client/createObservabilityClient.js#L256) · función · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Función auxiliar de `createObservabilityClient` para `remember Breadcrumb`.

- **Entradas** `entry`, `options = valor por defecto`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de normalized`, `countAsMemory`, `persist`.
- **Llamadas directas en el cuerpo** [`normalizeBreadcrumbEntry`](../../../packages/observability/src/client/createObservabilityClient.js#L258), [`pruneBreadcrumbList`](../../../packages/observability/src/client/createObservabilityClient.js#L261), [`state.breadcrumbs.concat`](../../../packages/observability/src/client/createObservabilityClient.js#L262), [`persistBreadcrumbs`](../../../packages/observability/src/client/createObservabilityClient.js#L268).
- **Lo usa** [`addCatalogBreadcrumb`](../../../packages/observability/src/client/createObservabilityClient.js#L275) (llama), [`addBreadcrumb`](../../../packages/observability/src/client/createObservabilityClient.js#L466) (llama).

#### [`addCatalogBreadcrumb`](../../../packages/observability/src/client/createObservabilityClient.js#L272) · función · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Función auxiliar de `createObservabilityClient` para `add Catalog Breadcrumb`.

- **Entradas** `code`, `data = valor por defecto`, `overrides = valor por defecto`, `options = valor por defecto`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de built`.
- **Usa código de** [`buildCatalogBreadcrumb`](../../../packages/observability/src/breadcrumbs/catalog.js#L115) (llama), [`scrubUnknown`](../../../packages/observability/src/utils/scrub.js#L34) (llama).
- **Llamadas directas en el cuerpo** [`buildCatalogBreadcrumb`](../../../packages/observability/src/client/createObservabilityClient.js#L273), [`scrubUnknown`](../../../packages/observability/src/client/createObservabilityClient.js#L273), [`rememberBreadcrumb`](../../../packages/observability/src/client/createObservabilityClient.js#L275).
- **Lo usa** [`setEnabled`](../../../packages/observability/src/client/createObservabilityClient.js#L504) (llama), [`onError`](../../../packages/observability/src/client/createObservabilityClient.js#L519) (llama), [`onRejection`](../../../packages/observability/src/client/createObservabilityClient.js#L530) (llama), [`window.fetch`](../../../packages/observability/src/client/createObservabilityClient.js#L567) (llama), [`init`](../../../packages/observability/src/client/createObservabilityClient.js#L616) (llama), [`onOnline`](../../../packages/observability/src/client/createObservabilityClient.js#L626) (llama), [`onVisibilityChange`](../../../packages/observability/src/client/createObservabilityClient.js#L631) (llama), [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L670) (referencia).

#### [`shouldDedupe`](../../../packages/observability/src/client/createObservabilityClient.js#L278) · función · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Comprueba `Dedupe` para decidir si se admite o continúa la operación.

- **Entradas** `key`.
- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `last y DEDUPE_WINDOW_MS`.
- **Llamadas directas en el cuerpo** [`state.dedupe.get`](../../../packages/observability/src/client/createObservabilityClient.js#L280), [`state.dedupe.set`](../../../packages/observability/src/client/createObservabilityClient.js#L282).
- **Lo usa** [`capture`](../../../packages/observability/src/client/createObservabilityClient.js#L432) (llama).

#### [`scheduleFlush`](../../../packages/observability/src/client/createObservabilityClient.js#L286) · función · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Coordina `Flush` con la planificación o reintento del flujo.

- **Efectos y APIs** `setTimeout`.
- **Condiciones que evalúa** `state.timer`.
- **Llamadas directas en el cuerpo** [`setTimeout`](../../../packages/observability/src/client/createObservabilityClient.js#L288).
- **Lo usa** [`flush`](../../../packages/observability/src/client/createObservabilityClient.js#L323) (llama), [`enqueue`](../../../packages/observability/src/client/createObservabilityClient.js#L344) (llama).

#### [`setTimeout · callback`](../../../packages/observability/src/client/createObservabilityClient.js#L288) · callback de infraestructura · dentro de [`scheduleFlush`](../../../packages/observability/src/client/createObservabilityClient.js#L286)

Ejecuta trabajo diferido o periódico iniciado por `scheduleFlush`.

- **Llamadas directas en el cuerpo** [`flush`](../../../packages/observability/src/client/createObservabilityClient.js#L290).

#### [`invokeFn`](../../../packages/observability/src/client/createObservabilityClient.js#L294) · función · asíncrona · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Función auxiliar de `createObservabilityClient` para `invoke Fn`.

- **Entradas** `name`, `body`.
- **Condiciones que evalúa** `ausencia de supabase.functions.invoke`, `error`.
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/observability/src/client/createObservabilityClient.js#L298).
- **Lo usa** [`flush`](../../../packages/observability/src/client/createObservabilityClient.js#L322) (llama), [`fetchPolicy`](../../../packages/observability/src/client/createObservabilityClient.js#L479) (llama).

#### [`flush`](../../../packages/observability/src/client/createObservabilityClient.js#L303) · función · asíncrona · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Función auxiliar de `createObservabilityClient` para `flush`.

- **Retorno visible o tipo declarado** `ok`, `code`, `queued`, `error`.
- **Condiciones que evalúa** `ausencia de state.enabled`, `state.flushRunning`, `ausencia de state.queue.length`, `undefined y ausencia de navigator.onLine`, `state.queue.length`.
- **Llamadas directas en el cuerpo** [`state.queue.slice`](../../../packages/observability/src/client/createObservabilityClient.js#L312), [`persistQueue`](../../../packages/observability/src/client/createObservabilityClient.js#L314), [`invokeFn`](../../../packages/observability/src/client/createObservabilityClient.js#L322), [`scheduleFlush`](../../../packages/observability/src/client/createObservabilityClient.js#L323), [`slice`](../../../packages/observability/src/client/createObservabilityClient.js#L326), [`batch.concat`](../../../packages/observability/src/client/createObservabilityClient.js#L326).
- **Lo usa** [`setTimeout · callback`](../../../packages/observability/src/client/createObservabilityClient.js#L290) (llama), [`onOnline`](../../../packages/observability/src/client/createObservabilityClient.js#L627) (llama), [`onVisibilityChange`](../../../packages/observability/src/client/createObservabilityClient.js#L632) (llama), [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L665) (referencia).

#### [`enqueue`](../../../packages/observability/src/client/createObservabilityClient.js#L338) · función · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Función auxiliar de `createObservabilityClient` para `enqueue`.

- **Entradas** `envelope`.
- **Efectos y APIs** `state.queue.push`.
- **Condiciones que evalúa** `state.queue.length`.
- **Llamadas directas en el cuerpo** [`state.queue.push`](../../../packages/observability/src/client/createObservabilityClient.js#L339), [`state.queue.slice`](../../../packages/observability/src/client/createObservabilityClient.js#L341), [`persistQueue`](../../../packages/observability/src/client/createObservabilityClient.js#L343), [`scheduleFlush`](../../../packages/observability/src/client/createObservabilityClient.js#L344).
- **Lo usa** [`capture`](../../../packages/observability/src/client/createObservabilityClient.js#L434) (llama).

#### [`resolveBreadcrumbSourceHint`](../../../packages/observability/src/client/createObservabilityClient.js#L347) · función · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Obtiene o resuelve `Breadcrumb Source Hint` para entregarlo al consumidor.

- **Entradas** `explicitProvided`.
- **Condiciones que evalúa** `explicitProvided`, `fromStorage y fromMemory`, `fromStorage`, `fromMemory`.
- **Lo usa** [`buildBreadcrumbMeta`](../../../packages/observability/src/client/createObservabilityClient.js#L364) (llama).

#### [`buildBreadcrumbMeta`](../../../packages/observability/src/client/createObservabilityClient.js#L357) · función · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Construye `Breadcrumb Meta` a partir de los datos del flujo.

- **Entradas** `{breadcrumbs, explicitProvided, explicitMeta}`.
- **Usa código de** [`OBS_BREADCRUMB_CATALOG_VERSION`](../../../packages/observability/src/breadcrumbs/catalog.js#L1) (referencia), [`scrubUnknown`](../../../packages/observability/src/utils/scrub.js#L34) (llama).
- **Llamadas directas en el cuerpo** [`resolveBreadcrumbSourceHint`](../../../packages/observability/src/client/createObservabilityClient.js#L364), [`asObject`](../../../packages/observability/src/client/createObservabilityClient.js#L378), [`scrubUnknown`](../../../packages/observability/src/client/createObservabilityClient.js#L378), [`inferMissingBreadcrumbReason`](../../../packages/observability/src/client/createObservabilityClient.js#L384).
- **Lo usa** [`capture`](../../../packages/observability/src/client/createObservabilityClient.js#L405) (llama).

#### [`capture`](../../../packages/observability/src/client/createObservabilityClient.js#L395) · función · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Función auxiliar de `createObservabilityClient` para `capture`.

- **Entradas** `input = valor por defecto`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de state.enabled`, `ausencia de valid.ok`, `shouldDedupe`.
- **Usa código de** [`normalizeEnvelope`](../../../packages/observability/src/schema/envelope.js#L55) (llama), [`validateEnvelope`](../../../packages/observability/src/schema/envelope.js#L108) (llama).
- **Llamadas directas en el cuerpo** [`pruneStateBreadcrumbs`](../../../packages/observability/src/client/createObservabilityClient.js#L397), [`pruneBreadcrumbList`](../../../packages/observability/src/client/createObservabilityClient.js#L401), [`buildBreadcrumbMeta`](../../../packages/observability/src/client/createObservabilityClient.js#L405), [`normalizeEnvelope`](../../../packages/observability/src/client/createObservabilityClient.js#L411), [`routePath`](../../../packages/observability/src/client/createObservabilityClient.js#L418), [`validateEnvelope`](../../../packages/observability/src/client/createObservabilityClient.js#L426), [`stableHash`](../../../packages/observability/src/client/createObservabilityClient.js#L429), [`shouldDedupe`](../../../packages/observability/src/client/createObservabilityClient.js#L432), [`enqueue`](../../../packages/observability/src/client/createObservabilityClient.js#L434).
- **Lo usa** [`captureMessage`](../../../packages/observability/src/client/createObservabilityClient.js#L439) (llama), [`captureException`](../../../packages/observability/src/client/createObservabilityClient.js#L450) (llama).

#### [`captureMessage`](../../../packages/observability/src/client/createObservabilityClient.js#L438) · función · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Función auxiliar de `createObservabilityClient` para `capture Message`.

- **Entradas** `level`, `message`, `context = valor por defecto`, `extras = valor por defecto`.
- **Llamadas directas en el cuerpo** [`capture`](../../../packages/observability/src/client/createObservabilityClient.js#L439).
- **Lo usa** [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L671) (referencia).

#### [`captureException`](../../../packages/observability/src/client/createObservabilityClient.js#L448) · función · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Función auxiliar de `createObservabilityClient` para `capture Exception`.

- **Entradas** `error`, `context = valor por defecto`, `extras = valor por defecto`.
- **Llamadas directas en el cuerpo** [`capture`](../../../packages/observability/src/client/createObservabilityClient.js#L450).
- **Lo usa** [`onError`](../../../packages/observability/src/client/createObservabilityClient.js#L523) (llama), [`onRejection`](../../../packages/observability/src/client/createObservabilityClient.js#L533) (llama), [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L672) (referencia).

#### [`addBreadcrumb`](../../../packages/observability/src/client/createObservabilityClient.js#L464) · función · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Función auxiliar de `createObservabilityClient` para `add Breadcrumb`.

- **Entradas** `messageOrEntry`, `data = valor por defecto`.
- **Condiciones que evalúa** `messageOrEntry y object y ausencia de Array.isArray`.
- **Usa código de** [`scrubUnknown`](../../../packages/observability/src/utils/scrub.js#L34) (llama).
- **Llamadas directas en el cuerpo** [`rememberBreadcrumb`](../../../packages/observability/src/client/createObservabilityClient.js#L466), [`toISOString`](../../../packages/observability/src/client/createObservabilityClient.js#L470), [`scrubUnknown`](../../../packages/observability/src/client/createObservabilityClient.js#L472).
- **Lo usa** [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L669) (referencia).

#### [`fetchPolicy`](../../../packages/observability/src/client/createObservabilityClient.js#L477) · función · asíncrona · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Obtiene o resuelve `Policy` para entregarlo al consumidor.

- **Entradas** `input = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `code`, `error`.
- **Llamadas directas en el cuerpo** [`invokeFn`](../../../packages/observability/src/client/createObservabilityClient.js#L479).
- **Lo usa** [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L673) (referencia).

#### [`setContext`](../../../packages/observability/src/client/createObservabilityClient.js#L493) · función · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Aplica o guarda `Context` para que el estado refleje la operación.

- **Entradas** `partial = valor por defecto`.
- **Lo usa** [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L666) (referencia).

#### [`setEnabled`](../../../packages/observability/src/client/createObservabilityClient.js#L500) · función · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Aplica o guarda `Enabled` para que el estado refleje la operación.

- **Entradas** `value`.
- **Condiciones que evalúa** `state.enabled`.
- **Llamadas directas en el cuerpo** [`addCatalogBreadcrumb`](../../../packages/observability/src/client/createObservabilityClient.js#L504), [`routePath`](../../../packages/observability/src/client/createObservabilityClient.js#L505).
- **Lo usa** [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L667) (referencia).

#### [`setRuntimeHealth`](../../../packages/observability/src/client/createObservabilityClient.js#L509) · función · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Aplica o guarda `Runtime Health` para que el estado refleje la operación.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de next`.
- **Llamadas directas en el cuerpo** [`asString`](../../../packages/observability/src/client/createObservabilityClient.js#L510).
- **Lo usa** [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L668) (referencia).

#### [`installGlobalHandlers`](../../../packages/observability/src/client/createObservabilityClient.js#L515) · función · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Función auxiliar de `createObservabilityClient` para `install Global Handlers`.

- **Efectos y APIs** `window.addEventListener`, `window.removeEventListener`.
- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`window.addEventListener`](../../../packages/observability/src/client/createObservabilityClient.js#L538), [`window.removeEventListener`](../../../packages/observability/src/client/createObservabilityClient.js#L541).
- **Lo usa** [`init`](../../../packages/observability/src/client/createObservabilityClient.js#L619) (llama).

#### [`onError`](../../../packages/observability/src/client/createObservabilityClient.js#L517) · función · dentro de [`installGlobalHandlers`](../../../packages/observability/src/client/createObservabilityClient.js#L515)

Maneja el valor de error y coordina las acciones indicadas abajo.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`addCatalogBreadcrumb`](../../../packages/observability/src/client/createObservabilityClient.js#L519), [`routePath`](../../../packages/observability/src/client/createObservabilityClient.js#L520), [`asString`](../../../packages/observability/src/client/createObservabilityClient.js#L521), [`captureException`](../../../packages/observability/src/client/createObservabilityClient.js#L523).
- **Lo usa** [`installGlobalHandlers`](../../../packages/observability/src/client/createObservabilityClient.js#L538) (referencia).

#### [`onRejection`](../../../packages/observability/src/client/createObservabilityClient.js#L528) · función · dentro de [`installGlobalHandlers`](../../../packages/observability/src/client/createObservabilityClient.js#L515)

Maneja `Rejection` y coordina las acciones indicadas abajo.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`addCatalogBreadcrumb`](../../../packages/observability/src/client/createObservabilityClient.js#L530), [`routePath`](../../../packages/observability/src/client/createObservabilityClient.js#L531), [`captureException`](../../../packages/observability/src/client/createObservabilityClient.js#L533).
- **Lo usa** [`installGlobalHandlers`](../../../packages/observability/src/client/createObservabilityClient.js#L539) (referencia).

#### [`installNetworkBreadcrumbs`](../../../packages/observability/src/client/createObservabilityClient.js#L546) · función · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Coordina cambios de estado durante `install Network Breadcrumbs`.

- **Actualizaciones de estado o acciones** `window.fetch`.
- **Condiciones que evalúa** `undefined o function`.
- **Llamadas directas en el cuerpo** [`window.fetch.bind`](../../../packages/observability/src/client/createObservabilityClient.js#L550).
- **Lo usa** [`init`](../../../packages/observability/src/client/createObservabilityClient.js#L621) (llama).

#### [`window.fetch`](../../../packages/observability/src/client/createObservabilityClient.js#L551) · función asignada · asíncrona · dentro de [`installNetworkBreadcrumbs`](../../../packages/observability/src/client/createObservabilityClient.js#L546)

Función auxiliar de `installNetworkBreadcrumbs` para `fetch`.

- **Entradas** `...args`.
- **Condiciones que evalúa** `string`, `input.url`, `init.method`.
- **Llamadas directas en el cuerpo** [`performance.now`](../../../packages/observability/src/client/createObservabilityClient.js#L552), [`toUpperCase`](../../../packages/observability/src/client/createObservabilityClient.js#L562), [`originalFetch`](../../../packages/observability/src/client/createObservabilityClient.js#L565), [`addCatalogBreadcrumb`](../../../packages/observability/src/client/createObservabilityClient.js#L567), [`asString`](../../../packages/observability/src/client/createObservabilityClient.js#L587).

#### [`init`](../../../packages/observability/src/client/createObservabilityClient.js#L599) · función · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Función auxiliar de `createObservabilityClient` para `init`.

- **Efectos y APIs** `window.addEventListener`, `document.addEventListener`.
- **Condiciones que evalúa** `state.initialized`, `persistedBreadcrumbs.length`, `undefined`.
- **Llamadas directas en el cuerpo** [`loadQueue`](../../../packages/observability/src/client/createObservabilityClient.js#L610), [`loadPersistedBreadcrumbs`](../../../packages/observability/src/client/createObservabilityClient.js#L611), [`pruneBreadcrumbList`](../../../packages/observability/src/client/createObservabilityClient.js#L613), [`addCatalogBreadcrumb`](../../../packages/observability/src/client/createObservabilityClient.js#L616), [`routePath`](../../../packages/observability/src/client/createObservabilityClient.js#L616), [`installGlobalHandlers`](../../../packages/observability/src/client/createObservabilityClient.js#L619), [`installNetworkBreadcrumbs`](../../../packages/observability/src/client/createObservabilityClient.js#L621), [`window.addEventListener`](../../../packages/observability/src/client/createObservabilityClient.js#L635), [`document.addEventListener`](../../../packages/observability/src/client/createObservabilityClient.js#L636), [`asString`](../../../packages/observability/src/client/createObservabilityClient.js#L651), [`cleanupGlobal`](../../../packages/observability/src/client/createObservabilityClient.js#L657), [`cleanupNetwork`](../../../packages/observability/src/client/createObservabilityClient.js#L658) y 1 más.
- **Lo usa** [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L664) (referencia).

#### [`cleanupGlobal`](../../../packages/observability/src/client/createObservabilityClient.js#L605) · función · dentro de [`init`](../../../packages/observability/src/client/createObservabilityClient.js#L599)

Normaliza `up Global` antes de validarlo, mostrarlo o enviarlo.

- **Lo usa** [`init`](../../../packages/observability/src/client/createObservabilityClient.js#L657) (llama).

#### [`cleanupNetwork`](../../../packages/observability/src/client/createObservabilityClient.js#L606) · función · dentro de [`init`](../../../packages/observability/src/client/createObservabilityClient.js#L599)

Normaliza `up Network` antes de validarlo, mostrarlo o enviarlo.

- **Lo usa** [`init`](../../../packages/observability/src/client/createObservabilityClient.js#L658) (llama).

#### [`cleanupWindow`](../../../packages/observability/src/client/createObservabilityClient.js#L607) · función · dentro de [`init`](../../../packages/observability/src/client/createObservabilityClient.js#L599)

Normaliza `up Window` antes de validarlo, mostrarlo o enviarlo.

- **Lo usa** [`init`](../../../packages/observability/src/client/createObservabilityClient.js#L659) (llama).

#### [`onOnline`](../../../packages/observability/src/client/createObservabilityClient.js#L625) · función · dentro de [`init`](../../../packages/observability/src/client/createObservabilityClient.js#L599)

Maneja `Online` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`addCatalogBreadcrumb`](../../../packages/observability/src/client/createObservabilityClient.js#L626), [`routePath`](../../../packages/observability/src/client/createObservabilityClient.js#L626), [`flush`](../../../packages/observability/src/client/createObservabilityClient.js#L627).
- **Lo usa** [`init`](../../../packages/observability/src/client/createObservabilityClient.js#L635) (referencia), [`cleanupWindow`](../../../packages/observability/src/client/createObservabilityClient.js#L638) (referencia).

#### [`onVisibilityChange`](../../../packages/observability/src/client/createObservabilityClient.js#L629) · función · dentro de [`init`](../../../packages/observability/src/client/createObservabilityClient.js#L599)

Maneja `Visibility Change` y coordina las acciones indicadas abajo.

- **Condiciones que evalúa** `document.visibilityState`.
- **Llamadas directas en el cuerpo** [`addCatalogBreadcrumb`](../../../packages/observability/src/client/createObservabilityClient.js#L631), [`routePath`](../../../packages/observability/src/client/createObservabilityClient.js#L631), [`flush`](../../../packages/observability/src/client/createObservabilityClient.js#L632).
- **Lo usa** [`init`](../../../packages/observability/src/client/createObservabilityClient.js#L636) (referencia), [`cleanupWindow`](../../../packages/observability/src/client/createObservabilityClient.js#L639) (referencia).

#### [`cleanupWindow`](../../../packages/observability/src/client/createObservabilityClient.js#L637) · función asignada · dentro de [`init`](../../../packages/observability/src/client/createObservabilityClient.js#L599)

Normaliza `up Window` antes de validarlo, mostrarlo o enviarlo.

- **Efectos y APIs** `window.removeEventListener`, `document.removeEventListener`.
- **Llamadas directas en el cuerpo** [`window.removeEventListener`](../../../packages/observability/src/client/createObservabilityClient.js#L638), [`document.removeEventListener`](../../../packages/observability/src/client/createObservabilityClient.js#L639).

#### [`getState`](../../../packages/observability/src/client/createObservabilityClient.js#L674) · función · dentro de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142)

Obtiene o resuelve el valor de estado para entregarlo al consumidor.

- **Retorno visible o tipo declarado** `enabled`, `queueSize`, `context`, `breadcrumbsCount`, `breadcrumbsStorageStatus`, `runtimeInitialized`, `runtimeHealth`.

### [`packages/observability/src/index.js`](../../../packages/observability/src/index.js#L1)

Punto agregado para clientes que arman su runtime web.

**Reexporta.** `createObservabilityClient` de [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js), `buildReleaseFromEnv` de [`buildReleaseFromEnv`](../../../packages/observability/src/schema/envelope.js), `normalizeEnvelope` de [`normalizeEnvelope`](../../../packages/observability/src/schema/envelope.js), `validateEnvelope` de [`validateEnvelope`](../../../packages/observability/src/schema/envelope.js), `OBS_ERROR_CODES` de [`OBS_ERROR_CODES`](../../../packages/observability/src/schema/errorCodes.js), `AUTHORITATIVE_LOGOUT_CODES` de [`AUTHORITATIVE_LOGOUT_CODES`](../../../packages/observability/src/schema/errorCodes.js), `TRANSIENT_CODES` de [`TRANSIENT_CODES`](../../../packages/observability/src/schema/errorCodes.js), `normalizeErrorCode` de [`normalizeErrorCode`](../../../packages/observability/src/schema/errorCodes.js), `createPolicyRuntime` de [`createPolicyRuntime`](../../../packages/observability/src/policy/uxPolicy.js), `scrubString` de [`scrubString`](../../../packages/observability/src/utils/scrub.js), `scrubUnknown` de [`scrubUnknown`](../../../packages/observability/src/utils/scrub.js), `createErrorRuntime` de [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js), `errorBus` de [`errorBus`](../../../packages/observability/src/runtime/errorBus.js), `OBS_BREADCRUMB_CATALOG_VERSION` de [`OBS_BREADCRUMB_CATALOG_VERSION`](../../../packages/observability/src/breadcrumbs/catalog.js), `OBS_BREADCRUMB_CATALOG` de [`OBS_BREADCRUMB_CATALOG`](../../../packages/observability/src/breadcrumbs/catalog.js), `getBreadcrumbTemplate` de [`getBreadcrumbTemplate`](../../../packages/observability/src/breadcrumbs/catalog.js) y 1 más.

**Módulos que lo cargan.** [`prelaunchObservability.js`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L1) (importa), [`ErrorCatalogTable.jsx`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L3) (importa), [`loggingClient.js`](../../../apps/referidos-app/src/services/loggingClient.js#L1) (importa), [`SupportErrorCatalog.jsx`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L3) (importa).

El archivo participa como entrada, adaptador de imports o reexportación.

### [`packages/observability/src/policy/uxPolicy.js`](../../../packages/observability/src/policy/uxPolicy.js#L1)

Resuelve la respuesta de interfaz según el evento, el error y la configuración de política.

**Superficie que exporta.** [`createPolicyRuntime`](../../../packages/observability/src/policy/uxPolicy.js#L21).

**Módulos que lo cargan.** [`index.js`](../../../packages/observability/src/index.js#L13) (reexporta createPolicyRuntime).

**Dependencias del archivo.** [`../schema/errorCodes.js`](../../../packages/observability/src/schema/errorCodes.js).

#### [`RETRY_BUDGET_WINDOW_MS`](../../../packages/observability/src/policy/uxPolicy.js#L8) · variable de módulo

Declara `RETRY_BUDGET_WINDOW_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`decideLocal`](../../../packages/observability/src/policy/uxPolicy.js#L102) (referencia).

#### [`RETRY_BUDGET_MAX`](../../../packages/observability/src/policy/uxPolicy.js#L9) · variable de módulo

Declara `RETRY_BUDGET_MAX` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`decideLocal`](../../../packages/observability/src/policy/uxPolicy.js#L103) (referencia).

#### [`MODAL_ONCE_WINDOW_MS`](../../../packages/observability/src/policy/uxPolicy.js#L10) · variable de módulo

Declara `MODAL_ONCE_WINDOW_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`decideLocal`](../../../packages/observability/src/policy/uxPolicy.js#L73) (referencia).

#### [`LOGOUT_COOLDOWN_MS`](../../../packages/observability/src/policy/uxPolicy.js#L11) · variable de módulo

Declara `LOGOUT_COOLDOWN_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`decideLocal`](../../../packages/observability/src/policy/uxPolicy.js#L67) (referencia).

#### [`keyFor`](../../../packages/observability/src/policy/uxPolicy.js#L13) · función

Implementa `key For` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `input = valor por defecto`.
- **Lo usa** [`decideLocal`](../../../packages/observability/src/policy/uxPolicy.js#L64) (llama).

#### [`nowMs`](../../../packages/observability/src/policy/uxPolicy.js#L17) · función

Implementa `now Ms` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Lo usa** [`consumeBudget`](../../../packages/observability/src/policy/uxPolicy.js#L28) (llama), [`onceEvery`](../../../packages/observability/src/policy/uxPolicy.js#L43) (llama).

#### [`createPolicyRuntime`](../../../packages/observability/src/policy/uxPolicy.js#L21) · función · exportado

Construye `Policy Runtime` a partir de los datos del flujo.

- **Retorno visible o tipo declarado** `decideLocal`, `beginFlight`, `endFlight`.
- **Lo usa** [`initPrelaunchObservability`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L101) (llama), [`loggingClient.js`](../../../apps/referidos-app/src/services/loggingClient.js#L62) (llama).

#### [`consumeBudget`](../../../packages/observability/src/policy/uxPolicy.js#L27) · función · dentro de [`createPolicyRuntime`](../../../packages/observability/src/policy/uxPolicy.js#L21)

Función auxiliar de `createPolicyRuntime` para `consume Budget`.

- **Entradas** `map`, `key`, `windowMs`, `max`.
- **Retorno visible o tipo declarado** `allowed`, `count`.
- **Condiciones que evalúa** `ausencia de current o windowMs`, `current.count`.
- **Llamadas directas en el cuerpo** [`nowMs`](../../../packages/observability/src/policy/uxPolicy.js#L28), [`map.get`](../../../packages/observability/src/policy/uxPolicy.js#L29), [`map.set`](../../../packages/observability/src/policy/uxPolicy.js#L31).
- **Lo usa** [`decideLocal`](../../../packages/observability/src/policy/uxPolicy.js#L99) (llama).

#### [`onceEvery`](../../../packages/observability/src/policy/uxPolicy.js#L42) · función · dentro de [`createPolicyRuntime`](../../../packages/observability/src/policy/uxPolicy.js#L21)

Maneja `ce Every` y coordina las acciones indicadas abajo.

- **Entradas** `map`, `key`, `windowMs`.
- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `windowMs`.
- **Llamadas directas en el cuerpo** [`nowMs`](../../../packages/observability/src/policy/uxPolicy.js#L43), [`map.get`](../../../packages/observability/src/policy/uxPolicy.js#L44), [`map.set`](../../../packages/observability/src/policy/uxPolicy.js#L46).
- **Lo usa** [`decideLocal`](../../../packages/observability/src/policy/uxPolicy.js#L67) (llama).

#### [`beginFlight`](../../../packages/observability/src/policy/uxPolicy.js#L50) · función · dentro de [`createPolicyRuntime`](../../../packages/observability/src/policy/uxPolicy.js#L21)

Función auxiliar de `createPolicyRuntime` para `begin Flight`.

- **Entradas** `actionKey`.
- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `ausencia de actionKey`, `singleFlight.get`.
- **Llamadas directas en el cuerpo** [`singleFlight.get`](../../../packages/observability/src/policy/uxPolicy.js#L52), [`singleFlight.set`](../../../packages/observability/src/policy/uxPolicy.js#L53).
- **Lo usa** [`createPolicyRuntime`](../../../packages/observability/src/policy/uxPolicy.js#L134) (referencia).

#### [`endFlight`](../../../packages/observability/src/policy/uxPolicy.js#L57) · función · dentro de [`createPolicyRuntime`](../../../packages/observability/src/policy/uxPolicy.js#L21)

Finaliza `Flight` y ajusta el estado que depende de esa operación.

- **Entradas** `actionKey`.
- **Condiciones que evalúa** `ausencia de actionKey`.
- **Llamadas directas en el cuerpo** [`singleFlight.delete`](../../../packages/observability/src/policy/uxPolicy.js#L59).
- **Lo usa** [`createPolicyRuntime`](../../../packages/observability/src/policy/uxPolicy.js#L135) (referencia).

#### [`decideLocal`](../../../packages/observability/src/policy/uxPolicy.js#L62) · función · dentro de [`createPolicyRuntime`](../../../packages/observability/src/policy/uxPolicy.js#L21)

Función auxiliar de `createPolicyRuntime` para `decide Local`.

- **Entradas** `input = valor por defecto`.
- **Retorno visible o tipo declarado** `ui`, `auth`, `retry`, `uam`.
- **Condiciones que evalúa** `AUTHORITATIVE_LOGOUT_CODES.has`, `errorCode`, `TRANSIENT_CODES.has`.
- **Usa código de** [`normalizeErrorCode`](../../../packages/observability/src/schema/errorCodes.js#L34) (llama), [`AUTHORITATIVE_LOGOUT_CODES`](../../../packages/observability/src/schema/errorCodes.js#L19) (accede al módulo), [`OBS_ERROR_CODES`](../../../packages/observability/src/schema/errorCodes.js#L1) (accede al módulo), [`TRANSIENT_CODES`](../../../packages/observability/src/schema/errorCodes.js#L26) (accede al módulo).
- **Llamadas directas en el cuerpo** [`normalizeErrorCode`](../../../packages/observability/src/policy/uxPolicy.js#L63), [`keyFor`](../../../packages/observability/src/policy/uxPolicy.js#L64), [`AUTHORITATIVE_LOGOUT_CODES.has`](../../../packages/observability/src/policy/uxPolicy.js#L66), [`onceEvery`](../../../packages/observability/src/policy/uxPolicy.js#L67), [`TRANSIENT_CODES.has`](../../../packages/observability/src/policy/uxPolicy.js#L98), [`consumeBudget`](../../../packages/observability/src/policy/uxPolicy.js#L99).
- **Lo usa** [`createPolicyRuntime`](../../../packages/observability/src/policy/uxPolicy.js#L133) (referencia).

### [`packages/observability/src/runtime/createErrorRuntime.js`](../../../packages/observability/src/runtime/createErrorRuntime.js#L1)

Crea el orquestador que conecta bus, política, UI y envío de eventos.

**Superficie que exporta.** [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L57).

**Módulos que lo cargan.** [`index.js`](../../../packages/observability/src/index.js#L15) (reexporta createErrorRuntime).

**Dependencias del archivo.** [`../schema/errorCodes.js`](../../../packages/observability/src/schema/errorCodes.js), [`./errorBus.js`](../../../packages/observability/src/runtime/errorBus.js).

#### [`LEVELS`](../../../packages/observability/src/runtime/createErrorRuntime.js#L4) · variable de módulo

Declara `LEVELS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeLevel`](../../../packages/observability/src/runtime/createErrorRuntime.js#L9) (accede al módulo).

#### [`DEFAULT_CATEGORY`](../../../packages/observability/src/runtime/createErrorRuntime.js#L5) · variable de módulo

Declara `DEFAULT_CATEGORY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`logEvent`](../../../packages/observability/src/runtime/createErrorRuntime.js#L156) (referencia).

#### [`normalizeLevel`](../../../packages/observability/src/runtime/createErrorRuntime.js#L7) · función

Normaliza `Level` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`value.toLowerCase`](../../../packages/observability/src/runtime/createErrorRuntime.js#L8), [`LEVELS.has`](../../../packages/observability/src/runtime/createErrorRuntime.js#L9).
- **Lo usa** [`logEvent`](../../../packages/observability/src/runtime/createErrorRuntime.js#L163) (llama).

#### [`toCode`](../../../packages/observability/src/runtime/createErrorRuntime.js#L12) · función

Implementa `to Code` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `payload = valor por defecto`.
- **Usa código de** [`normalizeErrorCode`](../../../packages/observability/src/schema/errorCodes.js#L34) (llama).
- **Llamadas directas en el cuerpo** [`normalizeErrorCode`](../../../packages/observability/src/runtime/createErrorRuntime.js#L14).
- **Lo usa** [`evaluatePolicy`](../../../packages/observability/src/runtime/createErrorRuntime.js#L180) (llama), [`reportError`](../../../packages/observability/src/runtime/createErrorRuntime.js#L208) (llama).

#### [`mergePolicy`](../../../packages/observability/src/runtime/createErrorRuntime.js#L17) · función

Procesa `Policy` según el criterio del módulo.

- **Entradas** `localAction`, `remoteAction`.
- **Condiciones que evalúa** `ausencia de remoteAction o object`, `localAction.auth.signOut`, `localAction.retry.allowed`.
- **Lo usa** [`evaluatePolicy`](../../../packages/observability/src/runtime/createErrorRuntime.js#L197) (llama).

#### [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L57) · función · exportado

Construye `Error Runtime` a partir de los datos del flujo.

- **Entradas** `{observabilityClient, policyRuntime, appConfig, captureUnhandled} = valor por defecto`.
- **Retorno visible o tipo declarado** `init`, `setEnabled`, `setContext`, `addBreadcrumb`, `logEvent`, `logError`, `reportError`, `evaluatePolicy`, `beginPolicyAction`, `endPolicyAction`, `flush`, `subscribeErrors`.
- **Condiciones que evalúa** `ausencia de observabilityClient`, `ausencia de policyRuntime`.
- **Usa código de** [`errorBus`](../../../packages/observability/src/runtime/errorBus.js#L36) (accede al módulo).
- **Lo usa** [`initPrelaunchObservability`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L99) (llama), [`loggingClient.js`](../../../apps/referidos-app/src/services/loggingClient.js#L65) (llama).

#### [`init`](../../../packages/observability/src/runtime/createErrorRuntime.js#L81) · función · dentro de [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L57)

Función auxiliar de `createErrorRuntime` para `init`.

- **Efectos y APIs** `window.addEventListener`.
- **Condiciones que evalúa** `state.initialized`, `captureUnhandled y undefined`.
- **Llamadas directas en el cuerpo** [`observabilityClient.init`](../../../packages/observability/src/runtime/createErrorRuntime.js#L84), [`window.addEventListener`](../../../packages/observability/src/runtime/createErrorRuntime.js#L132).
- **Lo usa** [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L252) (referencia).

#### [`onError`](../../../packages/observability/src/runtime/createErrorRuntime.js#L86) · función · dentro de [`init`](../../../packages/observability/src/runtime/createErrorRuntime.js#L81)

Maneja el valor de error y coordina las acciones indicadas abajo.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setRuntimeHealth`.
- **Condiciones que evalúa** `function`.
- **Llamadas directas en el cuerpo** [`observabilityClient.setRuntimeHealth`](../../../packages/observability/src/runtime/createErrorRuntime.js#L88), [`observabilityClient.addBreadcrumb`](../../../packages/observability/src/runtime/createErrorRuntime.js#L90), [`toISOString`](../../../packages/observability/src/runtime/createErrorRuntime.js#L94), [`reportError`](../../../packages/observability/src/runtime/createErrorRuntime.js#L101).
- **Lo usa** [`init`](../../../packages/observability/src/runtime/createErrorRuntime.js#L132) (referencia), [`state.cleanupUnhandled`](../../../packages/observability/src/runtime/createErrorRuntime.js#L135) (referencia).

#### [`onRejection`](../../../packages/observability/src/runtime/createErrorRuntime.js#L109) · función · dentro de [`init`](../../../packages/observability/src/runtime/createErrorRuntime.js#L81)

Maneja `Rejection` y coordina las acciones indicadas abajo.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setRuntimeHealth`.
- **Condiciones que evalúa** `function`.
- **Llamadas directas en el cuerpo** [`observabilityClient.setRuntimeHealth`](../../../packages/observability/src/runtime/createErrorRuntime.js#L111), [`observabilityClient.addBreadcrumb`](../../../packages/observability/src/runtime/createErrorRuntime.js#L113), [`toISOString`](../../../packages/observability/src/runtime/createErrorRuntime.js#L117), [`reportError`](../../../packages/observability/src/runtime/createErrorRuntime.js#L124).
- **Lo usa** [`init`](../../../packages/observability/src/runtime/createErrorRuntime.js#L133) (referencia), [`state.cleanupUnhandled`](../../../packages/observability/src/runtime/createErrorRuntime.js#L136) (referencia).

#### [`state.cleanupUnhandled`](../../../packages/observability/src/runtime/createErrorRuntime.js#L134) · función asignada · dentro de [`init`](../../../packages/observability/src/runtime/createErrorRuntime.js#L81)

Normaliza `up Unhandled` antes de validarlo, mostrarlo o enviarlo.

- **Efectos y APIs** `window.removeEventListener`.
- **Llamadas directas en el cuerpo** [`window.removeEventListener`](../../../packages/observability/src/runtime/createErrorRuntime.js#L135).

#### [`setEnabled`](../../../packages/observability/src/runtime/createErrorRuntime.js#L141) · función · dentro de [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L57)

Aplica o guarda `Enabled` para que el estado refleje la operación.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setEnabled`.
- **Llamadas directas en el cuerpo** [`observabilityClient.setEnabled`](../../../packages/observability/src/runtime/createErrorRuntime.js#L143).
- **Lo usa** [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L253) (referencia).

#### [`setContext`](../../../packages/observability/src/runtime/createErrorRuntime.js#L146) · función · dentro de [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L57)

Aplica o guarda `Context` para que el estado refleje la operación.

- **Entradas** `partial = valor por defecto`.
- **Actualizaciones de estado o acciones** `setContext`.
- **Llamadas directas en el cuerpo** [`observabilityClient.setContext`](../../../packages/observability/src/runtime/createErrorRuntime.js#L147).
- **Lo usa** [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L254) (referencia).

#### [`addBreadcrumb`](../../../packages/observability/src/runtime/createErrorRuntime.js#L150) · función · dentro de [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L57)

Función auxiliar de `createErrorRuntime` para `add Breadcrumb`.

- **Entradas** `message`, `context = valor por defecto`.
- **Llamadas directas en el cuerpo** [`observabilityClient.addBreadcrumb`](../../../packages/observability/src/runtime/createErrorRuntime.js#L151).
- **Lo usa** [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L255) (referencia).

#### [`logEvent`](../../../packages/observability/src/runtime/createErrorRuntime.js#L154) · función · dentro de [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L57)

Emite o envía el valor de evento en el flujo del archivo.

- **Entradas** `{level, category, message, context, context_extra} = valor por defecto`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de state.enabled`.
- **Llamadas directas en el cuerpo** [`observabilityClient.captureMessage`](../../../packages/observability/src/runtime/createErrorRuntime.js#L162), [`normalizeLevel`](../../../packages/observability/src/runtime/createErrorRuntime.js#L163).
- **Lo usa** [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L256) (referencia).

#### [`logError`](../../../packages/observability/src/runtime/createErrorRuntime.js#L170) · función · dentro de [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L57)

Emite o envía el valor de error en el flujo del archivo.

- **Entradas** `error`, `context = valor por defecto`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de state.enabled`.
- **Llamadas directas en el cuerpo** [`observabilityClient.captureException`](../../../packages/observability/src/runtime/createErrorRuntime.js#L172).
- **Lo usa** [`reportError`](../../../packages/observability/src/runtime/createErrorRuntime.js#L216) (llama), [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L257) (referencia).

#### [`flush`](../../../packages/observability/src/runtime/createErrorRuntime.js#L175) · función · asíncrona · dentro de [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L57)

Función auxiliar de `createErrorRuntime` para `flush`.

- **Llamadas directas en el cuerpo** [`observabilityClient.flush`](../../../packages/observability/src/runtime/createErrorRuntime.js#L176).
- **Lo usa** [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L262) (referencia).

#### [`evaluatePolicy`](../../../packages/observability/src/runtime/createErrorRuntime.js#L179) · función · asíncrona · dentro de [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L57)

Función auxiliar de `createErrorRuntime` para `evaluate Policy`.

- **Entradas** `payload = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `code`, `policy`, `source`, `remoteError`.
- **Usa código de** [`OBS_ERROR_CODES`](../../../packages/observability/src/schema/errorCodes.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`toCode`](../../../packages/observability/src/runtime/createErrorRuntime.js#L180), [`policyRuntime.decideLocal`](../../../packages/observability/src/runtime/createErrorRuntime.js#L181), [`observabilityClient.fetchPolicy`](../../../packages/observability/src/runtime/createErrorRuntime.js#L187), [`mergePolicy`](../../../packages/observability/src/runtime/createErrorRuntime.js#L197).
- **Lo usa** [`reportError`](../../../packages/observability/src/runtime/createErrorRuntime.js#L217) (llama), [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L259) (referencia).

#### [`reportError`](../../../packages/observability/src/runtime/createErrorRuntime.js#L207) · función · asíncrona · dentro de [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L57)

Emite o envía el valor de error en el flujo del archivo.

- **Entradas** `error`, `payload = valor por defecto`.
- **Usa código de** [`errorBus`](../../../packages/observability/src/runtime/errorBus.js#L36) (accede al módulo).
- **Llamadas directas en el cuerpo** [`toCode`](../../../packages/observability/src/runtime/createErrorRuntime.js#L208), [`logError`](../../../packages/observability/src/runtime/createErrorRuntime.js#L216), [`evaluatePolicy`](../../../packages/observability/src/runtime/createErrorRuntime.js#L217), [`toISOString`](../../../packages/observability/src/runtime/createErrorRuntime.js#L227), [`errorBus.emit`](../../../packages/observability/src/runtime/createErrorRuntime.js#L239).
- **Lo usa** [`onError`](../../../packages/observability/src/runtime/createErrorRuntime.js#L101) (llama), [`onRejection`](../../../packages/observability/src/runtime/createErrorRuntime.js#L124) (llama), [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L258) (referencia).

#### [`beginPolicyAction`](../../../packages/observability/src/runtime/createErrorRuntime.js#L243) · función · dentro de [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L57)

Función auxiliar de `createErrorRuntime` para `begin Policy Action`.

- **Entradas** `actionKey`.
- **Llamadas directas en el cuerpo** [`policyRuntime.beginFlight`](../../../packages/observability/src/runtime/createErrorRuntime.js#L244).
- **Lo usa** [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L260) (referencia).

#### [`endPolicyAction`](../../../packages/observability/src/runtime/createErrorRuntime.js#L247) · función · dentro de [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L57)

Finaliza `Policy Action` y ajusta el estado que depende de esa operación.

- **Entradas** `actionKey`.
- **Llamadas directas en el cuerpo** [`policyRuntime.endFlight`](../../../packages/observability/src/runtime/createErrorRuntime.js#L248).
- **Lo usa** [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L261) (referencia).

### [`packages/observability/src/runtime/errorBus.js`](../../../packages/observability/src/runtime/errorBus.js#L1)

Distribución local de eventos o señales de errores entre componentes y runtime.

**Superficie que exporta.** [`errorBus`](../../../packages/observability/src/runtime/errorBus.js#L36).

**Módulos que lo cargan.** [`index.js`](../../../packages/observability/src/index.js#L16) (reexporta errorBus), [`createErrorRuntime.js`](../../../packages/observability/src/runtime/createErrorRuntime.js#L2) (importa).

#### Acciones al cargar el módulo

- **Condiciones que evalúa** `ausencia de globalScope.BUS_SINGLETON_KEY`.
- **Llamadas directas en el cuerpo** [`createBus`](../../../packages/observability/src/runtime/errorBus.js#L33).

#### [`createBus`](../../../packages/observability/src/runtime/errorBus.js#L1) · función

Construye `Bus` a partir de los datos del flujo.

- **Retorno visible o tipo declarado** `emit`, `subscribe`, `size`.
- **Lo usa** [`errorBus.js`](../../../packages/observability/src/runtime/errorBus.js#L33) (llama).

#### [`emit`](../../../packages/observability/src/runtime/errorBus.js#L4) · función · dentro de [`createBus`](../../../packages/observability/src/runtime/errorBus.js#L1)

Función auxiliar de `createBus` para `emit`.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`listeners.forEach`](../../../packages/observability/src/runtime/errorBus.js#L5), [`listener`](../../../packages/observability/src/runtime/errorBus.js#L7).
- **Lo usa** [`createBus`](../../../packages/observability/src/runtime/errorBus.js#L23) (referencia).

#### [`subscribe`](../../../packages/observability/src/runtime/errorBus.js#L14) · función · dentro de [`createBus`](../../../packages/observability/src/runtime/errorBus.js#L1)

Función auxiliar de `createBus` para `subscribe`.

- **Entradas** `listener`.
- **Condiciones que evalúa** `function`.
- **Llamadas directas en el cuerpo** [`listeners.add`](../../../packages/observability/src/runtime/errorBus.js#L16), [`listeners.delete`](../../../packages/observability/src/runtime/errorBus.js#L18).
- **Lo usa** [`createBus`](../../../packages/observability/src/runtime/errorBus.js#L24) (referencia).

#### [`size`](../../../packages/observability/src/runtime/errorBus.js#L25) · función · dentro de [`createBus`](../../../packages/observability/src/runtime/errorBus.js#L1)

Función auxiliar de `createBus` para `size`.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`BUS_SINGLETON_KEY`](../../../packages/observability/src/runtime/errorBus.js#L29) · variable de módulo

Declara `BUS_SINGLETON_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`errorBus.js`](../../../packages/observability/src/runtime/errorBus.js#L32) (referencia), [`errorBus`](../../../packages/observability/src/runtime/errorBus.js#L36) (referencia).

#### [`globalScope`](../../../packages/observability/src/runtime/errorBus.js#L30) · variable de módulo

Declara `globalScope` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`errorBus.js`](../../../packages/observability/src/runtime/errorBus.js#L32) (accede al módulo), [`errorBus`](../../../packages/observability/src/runtime/errorBus.js#L36) (accede al módulo).

#### [`errorBus`](../../../packages/observability/src/runtime/errorBus.js#L36) · variable de módulo · exportado

Declara `errorBus` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`reportError`](../../../packages/observability/src/runtime/createErrorRuntime.js#L239) (accede al módulo), [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L263) (accede al módulo).

### [`packages/observability/src/schema/envelope.js`](../../../packages/observability/src/schema/envelope.js#L1)

Normaliza y valida el esquema común de evento y metadatos de release.

**Superficie que exporta.** [`buildReleaseFromEnv`](../../../packages/observability/src/schema/envelope.js#L7), [`normalizeEnvelope`](../../../packages/observability/src/schema/envelope.js#L55), [`validateEnvelope`](../../../packages/observability/src/schema/envelope.js#L108).

**Módulos que lo cargan.** [`createObservabilityClient.js`](../../../packages/observability/src/client/createObservabilityClient.js#L1) (importa), [`index.js`](../../../packages/observability/src/index.js#L2) (reexporta buildReleaseFromEnv).

**Dependencias del archivo.** [`../utils/scrub.js`](../../../packages/observability/src/utils/scrub.js).

#### [`ALLOWED_LEVEL`](../../../packages/observability/src/schema/envelope.js#L3) · variable de módulo

Declara `ALLOWED_LEVEL` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeEnvelope`](../../../packages/observability/src/schema/envelope.js#L56) (accede al módulo), [`validateEnvelope`](../../../packages/observability/src/schema/envelope.js#L115) (accede al módulo).

#### [`ALLOWED_TYPE`](../../../packages/observability/src/schema/envelope.js#L4) · variable de módulo

Declara `ALLOWED_TYPE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeEnvelope`](../../../packages/observability/src/schema/envelope.js#L59) (accede al módulo), [`validateEnvelope`](../../../packages/observability/src/schema/envelope.js#L112) (accede al módulo).

#### [`ALLOWED_SOURCE`](../../../packages/observability/src/schema/envelope.js#L5) · variable de módulo

Declara `ALLOWED_SOURCE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeEnvelope`](../../../packages/observability/src/schema/envelope.js#L62) (accede al módulo), [`validateEnvelope`](../../../packages/observability/src/schema/envelope.js#L118) (accede al módulo).

#### [`buildReleaseFromEnv`](../../../packages/observability/src/schema/envelope.js#L7) · función · exportado

Construye `Release From Env` a partir de los datos del flujo.

- **Entradas** `importMetaEnv = valor por defecto`.
- **Retorno visible o tipo declarado** `app_version`, `version_label`, `semver`, `version_release_id`, `source_commit_sha`, `build_id`, `env`, `app_id`.
- **Lo usa** [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L158) (llama).

#### [`toIso`](../../../packages/observability/src/schema/envelope.js#L41) · función

Implementa `to Iso` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de value`, `Number.isNaN`.
- **Llamadas directas en el cuerpo** [`toISOString`](../../../packages/observability/src/schema/envelope.js#L42), [`parsed.getTime`](../../../packages/observability/src/schema/envelope.js#L44), [`parsed.toISOString`](../../../packages/observability/src/schema/envelope.js#L45).
- **Lo usa** [`normalizeEnvelope`](../../../packages/observability/src/schema/envelope.js#L87) (llama).

#### [`clampText`](../../../packages/observability/src/schema/envelope.js#L48) · función

Implementa `clamp Text` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`, `maxLen`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `string`, `ausencia de trimmed`.
- **Llamadas directas en el cuerpo** [`value.trim`](../../../packages/observability/src/schema/envelope.js#L50), [`trimmed.slice`](../../../packages/observability/src/schema/envelope.js#L52).
- **Lo usa** [`normalizeEnvelope`](../../../packages/observability/src/schema/envelope.js#L66) (llama).

#### [`normalizeEnvelope`](../../../packages/observability/src/schema/envelope.js#L55) · función · exportado

Normaliza `Envelope` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `input = valor por defecto`, `defaults = valor por defecto`.
- **Retorno visible o tipo declarado** `tenant_hint`, `app_id`, `source`, `event_type`, `level`, `timestamp`, `fingerprint`, `message`, `error`, `context`, `extras`, `device`, `release`, `tags`, `breadcrumbs`, `breadcrumbs_meta`, `request_id`, `trace_id` y 2 más.
- **Usa código de** [`scrubUnknown`](../../../packages/observability/src/utils/scrub.js#L34) (llama).
- **Llamadas directas en el cuerpo** [`ALLOWED_LEVEL.has`](../../../packages/observability/src/schema/envelope.js#L56), [`toLowerCase`](../../../packages/observability/src/schema/envelope.js#L56), [`ALLOWED_TYPE.has`](../../../packages/observability/src/schema/envelope.js#L59), [`ALLOWED_SOURCE.has`](../../../packages/observability/src/schema/envelope.js#L62), [`clampText`](../../../packages/observability/src/schema/envelope.js#L66), [`scrubUnknown`](../../../packages/observability/src/schema/envelope.js#L70), [`slice`](../../../packages/observability/src/schema/envelope.js#L74), [`toIso`](../../../packages/observability/src/schema/envelope.js#L87).
- **Lo usa** [`capture`](../../../packages/observability/src/client/createObservabilityClient.js#L411) (llama).

#### [`validateEnvelope`](../../../packages/observability/src/schema/envelope.js#L108) · función · exportado

Comprueba `Envelope` para decidir si se admite o continúa la operación.

- **Entradas** `envelope = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `code`.
- **Condiciones que evalúa** `ausencia de envelope.message o string`, `ausencia de envelope.event_type o ausencia de ALLOWED_TYPE.has`, `ausencia de envelope.level o ausencia de ALLOWED_LEVEL.has`, `ausencia de envelope.source o ausencia de ALLOWED_SOURCE.has`.
- **Llamadas directas en el cuerpo** [`ALLOWED_TYPE.has`](../../../packages/observability/src/schema/envelope.js#L112), [`ALLOWED_LEVEL.has`](../../../packages/observability/src/schema/envelope.js#L115), [`ALLOWED_SOURCE.has`](../../../packages/observability/src/schema/envelope.js#L118).
- **Lo usa** [`capture`](../../../packages/observability/src/client/createObservabilityClient.js#L426) (llama).

### [`packages/observability/src/schema/errorCodes.js`](../../../packages/observability/src/schema/errorCodes.js#L1)

Catálogo de códigos estables que evita analizar solo textos de error libres.

**Superficie que exporta.** [`OBS_ERROR_CODES`](../../../packages/observability/src/schema/errorCodes.js#L1), [`AUTHORITATIVE_LOGOUT_CODES`](../../../packages/observability/src/schema/errorCodes.js#L19), [`TRANSIENT_CODES`](../../../packages/observability/src/schema/errorCodes.js#L26), [`normalizeErrorCode`](../../../packages/observability/src/schema/errorCodes.js#L34).

**Módulos que lo cargan.** [`index.js`](../../../packages/observability/src/index.js#L7) (reexporta OBS_ERROR_CODES), [`uxPolicy.js`](../../../packages/observability/src/policy/uxPolicy.js#L1) (importa), [`createErrorRuntime.js`](../../../packages/observability/src/runtime/createErrorRuntime.js#L1) (importa).

#### [`OBS_ERROR_CODES`](../../../packages/observability/src/schema/errorCodes.js#L1) · variable de módulo · exportado

Declara `OBS_ERROR_CODES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`AUTHORITATIVE_LOGOUT_CODES`](../../../packages/observability/src/schema/errorCodes.js#L20) (accede al módulo), [`TRANSIENT_CODES`](../../../packages/observability/src/schema/errorCodes.js#L27) (accede al módulo), [`normalizeErrorCode`](../../../packages/observability/src/schema/errorCodes.js#L35) (accede al módulo), [`KNOWN_CODES`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L30) (referencia), [`decideLocal`](../../../packages/observability/src/policy/uxPolicy.js#L84) (accede al módulo), [`evaluatePolicy`](../../../packages/observability/src/runtime/createErrorRuntime.js#L203) (accede al módulo), [`KNOWN_CODES`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L28) (referencia).

#### [`AUTHORITATIVE_LOGOUT_CODES`](../../../packages/observability/src/schema/errorCodes.js#L19) · variable de módulo · exportado

Declara `AUTHORITATIVE_LOGOUT_CODES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`decideLocal`](../../../packages/observability/src/policy/uxPolicy.js#L66) (accede al módulo).

#### [`TRANSIENT_CODES`](../../../packages/observability/src/schema/errorCodes.js#L26) · variable de módulo · exportado

Declara `TRANSIENT_CODES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`decideLocal`](../../../packages/observability/src/policy/uxPolicy.js#L98) (accede al módulo).

#### [`normalizeErrorCode`](../../../packages/observability/src/schema/errorCodes.js#L34) · función · exportado

Normaliza `Error Code` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Condiciones que evalúa** `string`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/observability/src/schema/errorCodes.js#L36), [`value.trim`](../../../packages/observability/src/schema/errorCodes.js#L36).
- **Lo usa** [`decideLocal`](../../../packages/observability/src/policy/uxPolicy.js#L63) (llama), [`toCode`](../../../packages/observability/src/runtime/createErrorRuntime.js#L14) (llama).

### [`packages/observability/src/utils/scrub.js`](../../../packages/observability/src/utils/scrub.js#L1)

Enmascara patrones y campos sensibles en contexto. Su alcance depende de los valores y propiedades que reconozca.

**Superficie que exporta.** [`scrubString`](../../../packages/observability/src/utils/scrub.js#L21), [`scrubUnknown`](../../../packages/observability/src/utils/scrub.js#L34).

**Módulos que lo cargan.** [`createObservabilityClient.js`](../../../packages/observability/src/client/createObservabilityClient.js#L7) (importa), [`index.js`](../../../packages/observability/src/index.js#L14) (reexporta scrubString), [`envelope.js`](../../../packages/observability/src/schema/envelope.js#L1) (importa).

#### [`TOKEN_RE`](../../../packages/observability/src/utils/scrub.js#L1) · variable de módulo

Declara `TOKEN_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`scrubString`](../../../packages/observability/src/utils/scrub.js#L24) (referencia).

#### [`ACCESS_TOKEN_RE`](../../../packages/observability/src/utils/scrub.js#L2) · variable de módulo

Declara `ACCESS_TOKEN_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`scrubString`](../../../packages/observability/src/utils/scrub.js#L25) (referencia).

#### [`AUTH_HEADER_RE`](../../../packages/observability/src/utils/scrub.js#L3) · variable de módulo

Declara `AUTH_HEADER_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`scrubString`](../../../packages/observability/src/utils/scrub.js#L26) (referencia).

#### [`COOKIE_RE`](../../../packages/observability/src/utils/scrub.js#L4) · variable de módulo

Declara `COOKIE_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`scrubString`](../../../packages/observability/src/utils/scrub.js#L27) (referencia).

#### [`EMAIL_RE`](../../../packages/observability/src/utils/scrub.js#L5) · variable de módulo

Declara `EMAIL_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`scrubString`](../../../packages/observability/src/utils/scrub.js#L29) (referencia).

#### [`PHONE_RE`](../../../packages/observability/src/utils/scrub.js#L6) · variable de módulo

Declara `PHONE_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`scrubString`](../../../packages/observability/src/utils/scrub.js#L30) (referencia).

#### [`QUERY_RE`](../../../packages/observability/src/utils/scrub.js#L7) · variable de módulo

Declara `QUERY_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`scrubString`](../../../packages/observability/src/utils/scrub.js#L28) (referencia).

#### [`maskEmail`](../../../packages/observability/src/utils/scrub.js#L9) · función

Implementa `mask Email` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de domain o local.length`.
- **Llamadas directas en el cuerpo** [`value.split`](../../../packages/observability/src/utils/scrub.js#L10).
- **Lo usa** [`scrubString`](../../../packages/observability/src/utils/scrub.js#L29) (llama).

#### [`maskPhone`](../../../packages/observability/src/utils/scrub.js#L15) · función

Implementa `mask Phone` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Efectos y APIs** `value.replace`.
- **Condiciones que evalúa** `digits.length`.
- **Llamadas directas en el cuerpo** [`value.replace`](../../../packages/observability/src/utils/scrub.js#L16), [`*.repeat`](../../../packages/observability/src/utils/scrub.js#L18), [`digits.slice`](../../../packages/observability/src/utils/scrub.js#L18).
- **Lo usa** [`scrubString`](../../../packages/observability/src/utils/scrub.js#L30) (llama).

#### [`scrubString`](../../../packages/observability/src/utils/scrub.js#L21) · función · exportado

Implementa `scrub String` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Efectos y APIs** `next.replace`.
- **Condiciones que evalúa** `string`.
- **Llamadas directas en el cuerpo** [`next.replace`](../../../packages/observability/src/utils/scrub.js#L24), [`maskEmail`](../../../packages/observability/src/utils/scrub.js#L29), [`maskPhone`](../../../packages/observability/src/utils/scrub.js#L30).
- **Lo usa** [`scrubUnknown`](../../../packages/observability/src/utils/scrub.js#L36) (llama).

#### [`scrubUnknown`](../../../packages/observability/src/utils/scrub.js#L34) · función · exportado

Implementa `scrub Unknown` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`, `depth = valor por defecto`.
- **Condiciones que evalúa** `depth`, `string`, `value o number o boolean`, `Array.isArray`, `object`, `test`.
- **Llamadas directas en el cuerpo** [`scrubString`](../../../packages/observability/src/utils/scrub.js#L36), [`map`](../../../packages/observability/src/utils/scrub.js#L41), [`value.slice`](../../../packages/observability/src/utils/scrub.js#L41), [`scrubUnknown`](../../../packages/observability/src/utils/scrub.js#L41), [`test`](../../../packages/observability/src/utils/scrub.js#L46).
- **Lo usa** [`normalizeBreadcrumbEntry`](../../../packages/observability/src/client/createObservabilityClient.js#L89) (llama), [`addCatalogBreadcrumb`](../../../packages/observability/src/client/createObservabilityClient.js#L273) (llama), [`buildBreadcrumbMeta`](../../../packages/observability/src/client/createObservabilityClient.js#L378) (llama), [`addBreadcrumb`](../../../packages/observability/src/client/createObservabilityClient.js#L472) (llama), [`normalizeEnvelope`](../../../packages/observability/src/schema/envelope.js#L70) (llama).
