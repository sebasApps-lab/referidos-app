# Paquetes compartidos · intake-guard

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`packages/intake-guard/src/index.js`](../../../packages/intake-guard/src/index.js#L1)

## Símbolos y conexiones

### [`packages/intake-guard/src/index.js`](../../../packages/intake-guard/src/index.js#L1)

Normaliza inputs, extrae IP, construye hashes y huellas de envío, calcula ventanas y registra señales en el runtime. Mantiene la política particular en cada endpoint.

**Superficie que exporta.** [`safeTrim`](../../../packages/intake-guard/src/index.js#L6), [`isRecord`](../../../packages/intake-guard/src/index.js#L13), [`parseUuid`](../../../packages/intake-guard/src/index.js#L17), [`getClientIp`](../../../packages/intake-guard/src/index.js#L30), [`sha256Hex`](../../../packages/intake-guard/src/index.js#L39), [`buildDailyIpRiskId`](../../../packages/intake-guard/src/index.js#L47), [`buildUserAgentHash`](../../../packages/intake-guard/src/index.js#L55), [`buildContactHash`](../../../packages/intake-guard/src/index.js#L64), [`normalizeMessageForHash`](../../../packages/intake-guard/src/index.js#L70), [`buildMessageHash`](../../../packages/intake-guard/src/index.js#L74), [`buildSubmissionFingerprint`](../../../packages/intake-guard/src/index.js#L80), [`isoSince`](../../../packages/intake-guard/src/index.js#L90), [`prepareIntakeGuard`](../../../packages/intake-guard/src/index.js#L94), [`countIntakeGuardEvents`](../../../packages/intake-guard/src/index.js#L130), [`recordIntakeGuardEvent`](../../../packages/intake-guard/src/index.js#L169).

**Módulos que lo cargan.** [`shared.js`](../../../packages/feedback-sdk/src/shared.js#L1) (importa).

#### [`DEFAULT_UA_PEPPER`](../../../packages/intake-guard/src/index.js#L1) · variable de módulo

Declara `DEFAULT_UA_PEPPER` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`globalThis.Deno.env.get`](../../../packages/intake-guard/src/index.js#L2).
- **Lo usa** [`buildUserAgentHash`](../../../packages/intake-guard/src/index.js#L57) (referencia), [`prepareIntakeGuard`](../../../packages/intake-guard/src/index.js#L101) (referencia).

#### [`DEFAULT_IP_RISK_PEPPER`](../../../packages/intake-guard/src/index.js#L3) · variable de módulo

Declara `DEFAULT_IP_RISK_PEPPER` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`globalThis.Deno.env.get`](../../../packages/intake-guard/src/index.js#L4).
- **Lo usa** [`buildDailyIpRiskId`](../../../packages/intake-guard/src/index.js#L49) (referencia), [`prepareIntakeGuard`](../../../packages/intake-guard/src/index.js#L100) (referencia).

#### [`safeTrim`](../../../packages/intake-guard/src/index.js#L6) · función · exportado

Implementa `safe Trim` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`, `limit = valor por defecto`.
- **Condiciones que evalúa** `value`, `trimmed.length`.
- **Llamadas directas en el cuerpo** [`trim`](../../../packages/intake-guard/src/index.js#L8), [`trimmed.slice`](../../../packages/intake-guard/src/index.js#L10).
- **Lo usa** [`buildUserAgentHash`](../../../packages/intake-guard/src/index.js#L59) (llama), [`buildContactHash`](../../../packages/intake-guard/src/index.js#L65) (llama), [`normalizeMessageForHash`](../../../packages/intake-guard/src/index.js#L71) (llama), [`buildSubmissionFingerprint`](../../../packages/intake-guard/src/index.js#L82) (llama), [`prepareIntakeGuard`](../../../packages/intake-guard/src/index.js#L104) (llama), [`countIntakeGuardEvents`](../../../packages/intake-guard/src/index.js#L149) (llama), [`recordIntakeGuardEvent`](../../../packages/intake-guard/src/index.js#L195) (llama), [`normalizeFeedbackOriginRole`](../../../packages/feedback-sdk/src/shared.js#L8) (llama), [`normalizeFeedbackName`](../../../packages/feedback-sdk/src/shared.js#L14) (llama), [`normalizeFeedbackEmail`](../../../packages/feedback-sdk/src/shared.js#L19) (llama), [`normalizeFeedbackMessage`](../../../packages/feedback-sdk/src/shared.js#L26) (llama).

#### [`isRecord`](../../../packages/intake-guard/src/index.js#L13) · función · exportado

Comprueba `Record` para decidir si se admite o continúa la operación.

- **Entradas** `value`.
- **Lo usa** [`recordIntakeGuardEvent`](../../../packages/intake-guard/src/index.js#L211) (llama).

#### [`parseUuid`](../../../packages/intake-guard/src/index.js#L17) · función · exportado

Extrae o interpreta `Uuid` de los argumentos, estado o datos de entrada.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `string`, `ausencia de trimmed`, `test`.
- **Llamadas directas en el cuerpo** [`value.trim`](../../../packages/intake-guard/src/index.js#L19), [`test`](../../../packages/intake-guard/src/index.js#L22), [`trimmed.toLowerCase`](../../../packages/intake-guard/src/index.js#L25).

#### [`getClientIp`](../../../packages/intake-guard/src/index.js#L30) · función · exportado

Obtiene o resuelve `Client Ip` para entregarlo al consumidor.

- **Entradas** `req`.
- **Llamadas directas en el cuerpo** [`trim`](../../../packages/intake-guard/src/index.js#L31), [`req.headers.get`](../../../packages/intake-guard/src/index.js#L32), [`0.trim`](../../../packages/intake-guard/src/index.js#L33), [`split`](../../../packages/intake-guard/src/index.js#L33).
- **Lo usa** [`prepareIntakeGuard`](../../../packages/intake-guard/src/index.js#L103) (llama).

#### [`sha256Hex`](../../../packages/intake-guard/src/index.js#L39) · función · asíncrona · exportado

Implementa `sha256 Hex` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Efectos y APIs** `crypto.subtle.digest`.
- **Llamadas directas en el cuerpo** [`encode`](../../../packages/intake-guard/src/index.js#L40), [`crypto.subtle.digest`](../../../packages/intake-guard/src/index.js#L41), [`join`](../../../packages/intake-guard/src/index.js#L42), [`map`](../../../packages/intake-guard/src/index.js#L42), [`padStart`](../../../packages/intake-guard/src/index.js#L43), [`byte.toString`](../../../packages/intake-guard/src/index.js#L43).
- **Lo usa** [`buildDailyIpRiskId`](../../../packages/intake-guard/src/index.js#L52) (llama), [`buildUserAgentHash`](../../../packages/intake-guard/src/index.js#L61) (llama), [`buildContactHash`](../../../packages/intake-guard/src/index.js#L67) (llama), [`buildMessageHash`](../../../packages/intake-guard/src/index.js#L77) (llama), [`buildSubmissionFingerprint`](../../../packages/intake-guard/src/index.js#L87) (llama).

#### [`buildDailyIpRiskId`](../../../packages/intake-guard/src/index.js#L47) · función · asíncrona · exportado

Construye `Daily Ip Risk Id` a partir de los datos del flujo.

- **Entradas** `ip`, `{pepper, date} = valor por defecto`.
- **Llamadas directas en el cuerpo** [`slice`](../../../packages/intake-guard/src/index.js#L51), [`date.toISOString`](../../../packages/intake-guard/src/index.js#L51), [`sha256Hex`](../../../packages/intake-guard/src/index.js#L52).
- **Lo usa** [`prepareIntakeGuard`](../../../packages/intake-guard/src/index.js#L105) (llama).

#### [`buildUserAgentHash`](../../../packages/intake-guard/src/index.js#L55) · función · asíncrona · exportado

Construye `User Agent Hash` a partir de los datos del flujo.

- **Entradas** `userAgent`, `{pepper} = valor por defecto`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de normalized`.
- **Llamadas directas en el cuerpo** [`safeTrim`](../../../packages/intake-guard/src/index.js#L59), [`sha256Hex`](../../../packages/intake-guard/src/index.js#L61).
- **Lo usa** [`prepareIntakeGuard`](../../../packages/intake-guard/src/index.js#L107) (llama).

#### [`buildContactHash`](../../../packages/intake-guard/src/index.js#L64) · función · asíncrona · exportado

Construye `Contact Hash` a partir de los datos del flujo.

- **Entradas** `contactValue`, `{channel} = valor por defecto`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de normalized`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/intake-guard/src/index.js#L65), [`safeTrim`](../../../packages/intake-guard/src/index.js#L65), [`sha256Hex`](../../../packages/intake-guard/src/index.js#L67).
- **Lo usa** [`prepareIntakeGuard`](../../../packages/intake-guard/src/index.js#L110) (llama).

#### [`normalizeMessageForHash`](../../../packages/intake-guard/src/index.js#L70) · función · exportado

Normaliza `Message For Hash` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`, `max = valor por defecto`.
- **Efectos y APIs** `replace`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/intake-guard/src/index.js#L71), [`replace`](../../../packages/intake-guard/src/index.js#L71), [`safeTrim`](../../../packages/intake-guard/src/index.js#L71).
- **Lo usa** [`buildMessageHash`](../../../packages/intake-guard/src/index.js#L75) (llama).

#### [`buildMessageHash`](../../../packages/intake-guard/src/index.js#L74) · función · asíncrona · exportado

Construye `Message Hash` a partir de los datos del flujo.

- **Entradas** `message`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de normalized`.
- **Llamadas directas en el cuerpo** [`normalizeMessageForHash`](../../../packages/intake-guard/src/index.js#L75), [`sha256Hex`](../../../packages/intake-guard/src/index.js#L77).
- **Lo usa** [`prepareIntakeGuard`](../../../packages/intake-guard/src/index.js#L112) (llama).

#### [`buildSubmissionFingerprint`](../../../packages/intake-guard/src/index.js#L80) · función · asíncrona · exportado

Construye `Submission Fingerprint` a partir de los datos del flujo.

- **Entradas** `parts = valor por defecto`.
- **Retorno visible o tipo declarado** `null`.
- **Efectos y APIs** `part.replace`.
- **Condiciones que evalúa** `ausencia de normalized.length`.
- **Llamadas directas en el cuerpo** [`map`](../../../packages/intake-guard/src/index.js#L81), [`filter`](../../../packages/intake-guard/src/index.js#L81), [`parts.map`](../../../packages/intake-guard/src/index.js#L81), [`safeTrim`](../../../packages/intake-guard/src/index.js#L82), [`toLowerCase`](../../../packages/intake-guard/src/index.js#L84), [`part.replace`](../../../packages/intake-guard/src/index.js#L84), [`sha256Hex`](../../../packages/intake-guard/src/index.js#L87), [`normalized.join`](../../../packages/intake-guard/src/index.js#L87).
- **Lo usa** [`prepareIntakeGuard`](../../../packages/intake-guard/src/index.js#L113) (llama).

#### [`isoSince`](../../../packages/intake-guard/src/index.js#L90) · función · exportado

Comprueba `o Since` para decidir si se admite o continúa la operación.

- **Entradas** `windowMs`, `now = valor por defecto`.
- **Llamadas directas en el cuerpo** [`toISOString`](../../../packages/intake-guard/src/index.js#L91).

#### [`prepareIntakeGuard`](../../../packages/intake-guard/src/index.js#L94) · función · asíncrona · exportado

Implementa `prepare Intake Guard` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `{req, channel, contactValue, message, fingerprintParts, ipPepper, uaPepper} = valor por defecto`.
- **Retorno visible o tipo declarado** `ip`, `userAgent`, `ipRiskId`, `uaHash`, `contactHash`, `messageHash`, `fingerprint`.
- **Llamadas directas en el cuerpo** [`getClientIp`](../../../packages/intake-guard/src/index.js#L103), [`safeTrim`](../../../packages/intake-guard/src/index.js#L104), [`req.headers.get`](../../../packages/intake-guard/src/index.js#L104), [`buildDailyIpRiskId`](../../../packages/intake-guard/src/index.js#L105), [`buildUserAgentHash`](../../../packages/intake-guard/src/index.js#L107), [`buildContactHash`](../../../packages/intake-guard/src/index.js#L110), [`buildMessageHash`](../../../packages/intake-guard/src/index.js#L112), [`buildSubmissionFingerprint`](../../../packages/intake-guard/src/index.js#L113).

#### [`countIntakeGuardEvents`](../../../packages/intake-guard/src/index.js#L130) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`intake_guard_events`](../../../apps/referidos-app/supabase/migrations/20260330_000047_feedback_and_intake_guard.sql#L26) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `{tenantId, systemKey, actionKey, sinceIso, outcomes, ipRiskId, contactHash, anonId, visitSessionId, fingerprint} = valor por defecto`.
- **Retorno visible o tipo declarado** `count`, `error`.
- **Condiciones que evalúa** `Array.isArray y outcomes.length`, `ipRiskId`, `contactHash`, `anonId`, `visitSessionId`, `fingerprint`.
- **Contrato de datos** tabla o vista [`intake_guard_events`](../../../apps/referidos-app/supabase/migrations/20260330_000047_feedback_and_intake_guard.sql#L26) (`select`) en [`index.js:145`](../../../packages/intake-guard/src/index.js#L145), tabla o bucket [`intake_guard_events`](../../../apps/referidos-app/supabase/migrations/20260330_000047_feedback_and_intake_guard.sql#L26) en [`index.js:145`](../../../packages/intake-guard/src/index.js#L145).
- **Llamadas directas en el cuerpo** [`gte`](../../../packages/intake-guard/src/index.js#L145), [`eq`](../../../packages/intake-guard/src/index.js#L145), [`select`](../../../packages/intake-guard/src/index.js#L145), [`supabase.from`](../../../packages/intake-guard/src/index.js#L145), [`safeTrim`](../../../packages/intake-guard/src/index.js#L149), [`query.in`](../../../packages/intake-guard/src/index.js#L154), [`filter`](../../../packages/intake-guard/src/index.js#L154), [`outcomes.map`](../../../packages/intake-guard/src/index.js#L154), [`query.eq`](../../../packages/intake-guard/src/index.js#L156).

#### [`recordIntakeGuardEvent`](../../../packages/intake-guard/src/index.js#L169) · función · asíncrona · exportado

Guarda datos en tabla o vista [`intake_guard_events`](../../../apps/referidos-app/supabase/migrations/20260330_000047_feedback_and_intake_guard.sql#L26) y coordina las demás operaciones de esta ficha.

- **Entradas** `supabase`, `{tenantId, systemKey, actionKey, originRole, appChannel, sourceRoute, sourceSurface, anonId, visitSessionId, contactHash, messageHash, fingerprint, ipRiskId, uaHash, outcome, reason, riskScore, riskFlags, meta} = valor por defecto`.
- **Contrato de datos** tabla o vista [`intake_guard_events`](../../../apps/referidos-app/supabase/migrations/20260330_000047_feedback_and_intake_guard.sql#L26) (`insert`) en [`index.js:193`](../../../packages/intake-guard/src/index.js#L193), tabla o bucket [`intake_guard_events`](../../../apps/referidos-app/supabase/migrations/20260330_000047_feedback_and_intake_guard.sql#L26) en [`index.js:193`](../../../packages/intake-guard/src/index.js#L193).
- **Llamadas directas en el cuerpo** [`insert`](../../../packages/intake-guard/src/index.js#L193), [`supabase.from`](../../../packages/intake-guard/src/index.js#L193), [`safeTrim`](../../../packages/intake-guard/src/index.js#L195), [`isRecord`](../../../packages/intake-guard/src/index.js#L211).
