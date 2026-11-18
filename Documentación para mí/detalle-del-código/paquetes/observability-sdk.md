# Paquetes compartidos · observability-sdk

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`packages/observability-sdk/src/createMobileObservabilityClient.js`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L1)
- [`packages/observability-sdk/src/index.js`](../../../packages/observability-sdk/src/index.js#L1)

## Símbolos y conexiones

### [`packages/observability-sdk/src/createMobileObservabilityClient.js`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L1)

Normaliza contexto, limpia valores, aplica límites y muestreo y programa el envío mediante el API móvil.

**Superficie que exporta.** [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L164).

**Módulos que lo cargan.** [`index.js`](../../../packages/observability-sdk/src/index.js#L1) (reexporta), [`index.js`](../../../packages/observability-sdk/src/index.js#L3) (reexporta createObservabilityClient).

#### [`DEFAULT_MAX_PER_MINUTE`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L1) · variable de módulo

Declara `DEFAULT_MAX_PER_MINUTE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L167) (referencia).

#### [`DEFAULT_PER_LEVEL_PER_MINUTE`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L2) · variable de módulo

Declara `DEFAULT_PER_LEVEL_PER_MINUTE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizePerLevelLimits`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L91) (referencia), [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L168) (referencia).

#### [`DEFAULT_CATEGORY_SAMPLING`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L9) · variable de módulo

Declara `DEFAULT_CATEGORY_SAMPLING` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeSampling`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L80) (referencia), [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L169) (referencia).

#### [`DEFAULT_FLUSH_SIZE`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L13) · variable de módulo

Declara `DEFAULT_FLUSH_SIZE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L170) (referencia).

#### [`DEFAULT_FLUSH_INTERVAL_MS`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L14) · variable de módulo

Declara `DEFAULT_FLUSH_INTERVAL_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L171) (referencia).

#### [`DEFAULT_DEDUPE_WINDOW_MS`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L15) · variable de módulo

Declara `DEFAULT_DEDUPE_WINDOW_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L172) (referencia).

#### [`MAX_QUEUE`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L16) · variable de módulo

Declara `MAX_QUEUE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`track`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L383) (referencia).

#### [`ALLOWED_LEVELS`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L18) · variable de módulo

Declara `ALLOWED_LEVELS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeLevel`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L58) (accede al módulo).

#### [`TOKEN_RE`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L20) · variable de módulo

Declara `TOKEN_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`scrubString`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L116) (referencia).

#### [`ACCESS_TOKEN_RE`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L21) · variable de módulo

Declara `ACCESS_TOKEN_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`scrubString`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L117) (referencia).

#### [`AUTH_HEADER_RE`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L22) · variable de módulo

Declara `AUTH_HEADER_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`scrubString`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L118) (referencia).

#### [`COOKIE_RE`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L23) · variable de módulo

Declara `COOKIE_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`scrubString`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L119) (referencia).

#### [`EMAIL_RE`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L24) · variable de módulo

Declara `EMAIL_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`scrubString`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L121) (referencia).

#### [`PHONE_RE`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L25) · variable de módulo

Declara `PHONE_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`scrubString`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L122) (referencia).

#### [`QUERY_RE`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L26) · variable de módulo

Declara `QUERY_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`scrubString`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L120) (referencia).

#### [`nowMinuteKey`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L28) · función

Implementa `now Minute Key` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Llamadas directas en el cuerpo** [`now.getUTCFullYear`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L30), [`now.getUTCMonth`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L30), [`now.getUTCDate`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L30), [`now.getUTCHours`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L30), [`now.getUTCMinutes`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L30).
- **Lo usa** [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L197) (llama), [`resetMinuteIfNeeded`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L207) (llama).

#### [`stableHash`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L33) · función

Implementa `stable Hash` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `input`.
- **Llamadas directas en el cuerpo** [`input.charCodeAt`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L36).
- **Lo usa** [`shouldDedupe`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L241) (llama), [`buildFingerprint`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L277) (llama).

#### [`randomId`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L42) · función

Implementa `random Id` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `prefix`.
- **Efectos y APIs** `globalThis.crypto.randomUUID`.
- **Condiciones que evalúa** `globalThis.crypto.randomUUID`.
- **Llamadas directas en el cuerpo** [`globalThis.crypto.randomUUID`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L44), [`slice`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L46), [`toString`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L46).
- **Lo usa** [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L193) (llama).

#### [`clampText`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L49) · función

Implementa `clamp Text` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`, `maxLen`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `string`, `ausencia de trimmed`.
- **Llamadas directas en el cuerpo** [`value.trim`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L51), [`trimmed.slice`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L53).
- **Lo usa** [`buildFingerprint`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L266) (llama), [`normalizePayload`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L284) (llama).

#### [`normalizeLevel`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L56) · función

Normaliza `Level` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L57), [`ALLOWED_LEVELS.has`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L58).
- **Lo usa** [`canSend`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L224) (llama), [`normalizePayload`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L281) (llama).

#### [`normalizeCategory`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L61) · función

Normaliza `Category` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L62), [`trim`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L62).
- **Lo usa** [`normalizePayload`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L282) (llama).

#### [`normalizeEventType`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L66) · función

Normaliza `Event Type` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `rawType`, `category`.
- **Condiciones que evalúa** `eventType`, `category`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L67), [`trim`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L67).
- **Lo usa** [`normalizePayload`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L283) (llama).

#### [`normalizeSampling`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L79) · función

Normaliza `Sampling` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `input = valor por defecto`.
- **Condiciones que evalúa** `Number.isFinite y parsed y parsed`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L84).
- **Lo usa** [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L191) (llama).

#### [`normalizePerLevelLimits`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L90) · función

Normaliza `Per Level Limits` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `input = valor por defecto`.
- **Condiciones que evalúa** `Number.isFinite y parsed`.
- **Lo usa** [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L190) (llama).

#### [`maskEmail`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L101) · función

Implementa `mask Email` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de domain o local.length`.
- **Llamadas directas en el cuerpo** [`value.split`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L102).
- **Lo usa** [`scrubString`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L121) (llama).

#### [`maskPhone`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L107) · función

Implementa `mask Phone` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Efectos y APIs** `value.replace`.
- **Condiciones que evalúa** `digits.length`.
- **Llamadas directas en el cuerpo** [`value.replace`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L108), [`*.repeat`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L110), [`digits.slice`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L110).
- **Lo usa** [`scrubString`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L122) (llama).

#### [`scrubString`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L113) · función

Implementa `scrub String` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Efectos y APIs** `next.replace`.
- **Condiciones que evalúa** `string`.
- **Llamadas directas en el cuerpo** [`next.replace`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L116), [`maskEmail`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L121), [`maskPhone`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L122).
- **Lo usa** [`scrubUnknown`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L128) (llama), [`buildFingerprint`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L266) (llama), [`normalizePayload`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L284) (llama).

#### [`scrubUnknown`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L126) · función

Implementa `scrub Unknown` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`, `depth = valor por defecto`.
- **Condiciones que evalúa** `depth`, `string`, `value o number o boolean`, `Array.isArray`, `object`, `test`.
- **Llamadas directas en el cuerpo** [`scrubString`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L128), [`map`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L133), [`value.slice`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L133), [`scrubUnknown`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L133), [`test`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L138).
- **Lo usa** [`resolveContext`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L252) (llama), [`normalizePayload`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L301) (llama).

#### [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L164) · función · exportado

Construye `Mobile Observability Client` a partir de los datos del flujo.

- **Entradas** `{api, baseContext, maxPerMinute, perLevelPerMinute, categorySampling, flushSize, flushIntervalMs, dedupeWindowMs} = valor por defecto`.
- **Retorno visible o tipo declarado** `track`, `flush`, `shutdown`, `setContext`, `setContextProvider`, `getState`.
- **Llamadas directas en el cuerpo** [`normalizePerLevelLimits`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L190), [`normalizeSampling`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L191), [`randomId`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L193), [`nowMinuteKey`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L197).
- **Lo usa** [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (llama).

#### [`resetMinuteIfNeeded`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L206) · función · dentro de [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L164)

Limpia o restablece `Minute If Needed` como parte de este flujo.

- **Condiciones que evalúa** `key`.
- **Llamadas directas en el cuerpo** [`nowMinuteKey`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L207).
- **Lo usa** [`canSend`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L222) (llama).

#### [`shouldSample`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L215) · función · dentro de [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L164)

Comprueba `Sample` para decidir si se admite o continúa la operación.

- **Entradas** `category`.
- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `number`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L216).
- **Lo usa** [`normalizePayload`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L286) (llama).

#### [`canSend`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L221) · función · dentro de [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L164)

Comprueba `Send` para decidir si se admite o continúa la operación.

- **Entradas** `level`.
- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `countInMinute`, `perLevelCount.safeLevel`.
- **Llamadas directas en el cuerpo** [`resetMinuteIfNeeded`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L222), [`normalizeLevel`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L224).
- **Lo usa** [`normalizePayload`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L287) (llama).

#### [`nextRequestId`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L231) · función · dentro de [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L164)

Función auxiliar de `createMobileObservabilityClient` para `next Request Id`.

- **Llamadas directas en el cuerpo** [`padStart`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L233).
- **Lo usa** [`normalizePayload`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L292) (llama).

#### [`shouldDedupe`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L236) · función · dentro de [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L164)

Comprueba `Dedupe` para decidir si se admite o continúa la operación.

- **Entradas** `payload`.
- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `last y safeDedupeWindowMs`.
- **Llamadas directas en el cuerpo** [`stableHash`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L241), [`dedupe.get`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L243), [`dedupe.set`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L245).
- **Lo usa** [`normalizePayload`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L355) (llama).

#### [`resolveContext`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L249) · función · dentro de [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L164)

Obtiene o resuelve `Context` para entregarlo al consumidor.

- **Entradas** `eventContext = valor por defecto`.
- **Llamadas directas en el cuerpo** [`contextProvider`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L251), [`scrubUnknown`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L252).
- **Lo usa** [`normalizePayload`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L290) (llama).

#### [`buildFingerprint`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L265) · función · dentro de [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L164)

Construye `Fingerprint` a partir de los datos del flujo.

- **Entradas** `input`.
- **Efectos y APIs** `replace`.
- **Condiciones que evalúa** `explicit`.
- **Llamadas directas en el cuerpo** [`clampText`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L266), [`scrubString`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L266), [`join`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L268), [`toLowerCase`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L269), [`replace`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L271), [`stableHash`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L277).
- **Lo usa** [`normalizePayload`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L352) (llama).

#### [`normalizePayload`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L280) · función · dentro de [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L164)

Normaliza `Payload` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `input = valor por defecto`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de message`, `ausencia de shouldSample`, `ausencia de canSend`, `supportThreadId`, `shouldDedupe`.
- **Llamadas directas en el cuerpo** [`normalizeLevel`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L281), [`normalizeCategory`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L282), [`normalizeEventType`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L283), [`clampText`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L284), [`scrubString`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L284), [`shouldSample`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L286), [`canSend`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L287), [`toISOString`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L289), [`resolveContext`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L290), [`nextRequestId`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L292), [`scrubUnknown`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L301), [`slice`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L333) y 2 más.
- **Lo usa** [`track`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L380) (llama).

#### [`flush`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L359) · función · asíncrona · dentro de [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L164)

Función auxiliar de `createMobileObservabilityClient` para `flush`.

- **Condiciones que evalúa** `flushInProgress o queue.length`, `function`, `queue.length`.
- **Llamadas directas en el cuerpo** [`queue.slice`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L363), [`batch.map`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L365), [`api.logs.logEvent`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L365), [`scheduleFlush`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L367).
- **Lo usa** [`setTimeout · callback`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L374) (llama), [`track`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L387) (llama), [`shutdown`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L410) (llama), [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L415) (referencia).

#### [`scheduleFlush`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L370) · función · dentro de [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L164)

Coordina `Flush` con la planificación o reintento del flujo.

- **Efectos y APIs** `setTimeout`.
- **Condiciones que evalúa** `timer`.
- **Llamadas directas en el cuerpo** [`setTimeout`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L372).
- **Lo usa** [`flush`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L367) (llama), [`track`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L390) (llama).

#### [`setTimeout · callback`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L372) · callback de infraestructura · asíncrona · dentro de [`scheduleFlush`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L370)

Ejecuta trabajo diferido o periódico iniciado por `scheduleFlush`.

- **Llamadas directas en el cuerpo** [`flush`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L374).

#### [`track`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L378) · función · asíncrona · dentro de [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L164)

Función auxiliar de `createMobileObservabilityClient` para `track`.

- **Entradas** `event`.
- **Retorno visible o tipo declarado** `null`.
- **Efectos y APIs** `queue.push`.
- **Condiciones que evalúa** `ausencia de event o object`, `ausencia de payload`, `queue.length`, `payload.level o queue.length`.
- **Llamadas directas en el cuerpo** [`normalizePayload`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L380), [`queue.push`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L382), [`queue.slice`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L384), [`flush`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L387), [`scheduleFlush`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L390).
- **Lo usa** [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L414) (referencia).

#### [`setContext`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L394) · función · dentro de [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L164)

Aplica o guarda `Context` para que el estado refleje la operación.

- **Entradas** `partial = valor por defecto`.
- **Lo usa** [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L417) (referencia).

#### [`setContextProvider`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L401) · función · dentro de [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L164)

Aplica o guarda `Context Provider` para que el estado refleje la operación.

- **Entradas** `provider`.
- **Lo usa** [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L418) (referencia).

#### [`shutdown`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L405) · función · asíncrona · dentro de [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L164)

Coordina cambios de estado durante `shutdown`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `clearTimeout`.
- **Condiciones que evalúa** `timer`.
- **Llamadas directas en el cuerpo** [`clearTimeout`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L407), [`flush`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L410).
- **Lo usa** [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L416) (referencia).

#### [`getState`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L419) · función · dentro de [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js#L164)

Obtiene o resuelve el valor de estado para entregarlo al consumidor.

- **Retorno visible o tipo declarado** `queueSize`, `sessionId`, `context`.

### [`packages/observability-sdk/src/index.js`](../../../packages/observability-sdk/src/index.js#L1)

Entrada pública del SDK de observabilidad para Android.

**Reexporta.** `*` de [`createMobileObservabilityClient.js`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js), `createObservabilityClient` de [`createMobileObservabilityClient`](../../../packages/observability-sdk/src/createMobileObservabilityClient.js).

**Módulos que lo cargan.** [`mobileApi.ts`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L2) (importa).

El archivo participa como entrada, adaptador de imports o reexportación.
