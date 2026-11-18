# Paquetes compartidos · feedback-sdk

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`packages/feedback-sdk/src/index.js`](../../../packages/feedback-sdk/src/index.js#L1)
- [`packages/feedback-sdk/src/publicClient.js`](../../../packages/feedback-sdk/src/publicClient.js#L1)
- [`packages/feedback-sdk/src/shared.js`](../../../packages/feedback-sdk/src/shared.js#L1)

## Símbolos y conexiones

### [`packages/feedback-sdk/src/index.js`](../../../packages/feedback-sdk/src/index.js#L1)

Agrega exports de normalización y transporte de feedback.

**Reexporta.** `*` de [`shared.js`](../../../packages/feedback-sdk/src/shared.js), `*` de [`publicClient.js`](../../../packages/feedback-sdk/src/publicClient.js).

El archivo participa como entrada, adaptador de imports o reexportación.

### [`packages/feedback-sdk/src/publicClient.js`](../../../packages/feedback-sdk/src/publicClient.js#L1)

Invoca feedback-submit a través de Supabase o un invocador público inyectado según el consumidor. Uniforma resultado y error.

**Superficie que exporta.** [`submitPublicFeedback`](../../../packages/feedback-sdk/src/publicClient.js#L1), [`invokePublicFeedbackSubmit`](../../../packages/feedback-sdk/src/publicClient.js#L13).

**Módulos que lo cargan.** [`createPrelaunchClient.js`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L2) (importa), [`index.js`](../../../packages/feedback-sdk/src/index.js#L2) (reexporta).

#### [`submitPublicFeedback`](../../../packages/feedback-sdk/src/publicClient.js#L1) · función · asíncrona · exportado

Consulta o invoca Edge [`feedback-submit`](../../../apps/referidos-app/supabase/functions/feedback-submit/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `supabase`, `payload = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Edge [`feedback-submit`](../../../apps/referidos-app/supabase/functions/feedback-submit/index.ts) en [`publicClient.js:2`](../../../packages/feedback-sdk/src/publicClient.js#L2).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/feedback-sdk/src/publicClient.js#L2).

#### [`invokePublicFeedbackSubmit`](../../../packages/feedback-sdk/src/publicClient.js#L13) · función · asíncrona · exportado

Consulta o invoca Edge o adaptador [`feedback-submit`](../../../apps/referidos-app/supabase/functions/feedback-submit/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `invokePublic`, `payload = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `error`.
- **Condiciones que evalúa** `ausencia de response.ok`.
- **Contrato de datos** Edge o adaptador [`feedback-submit`](../../../apps/referidos-app/supabase/functions/feedback-submit/index.ts) en [`publicClient.js:14`](../../../packages/feedback-sdk/src/publicClient.js#L14).
- **Llamadas directas en el cuerpo** [`invokePublic`](../../../packages/feedback-sdk/src/publicClient.js#L14).
- **Lo usa** [`submit`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L169) (llama).

### [`packages/feedback-sdk/src/shared.js`](../../../packages/feedback-sdk/src/shared.js#L1)

Define tamaños, normaliza nombre, correo, texto y audiencia, y genera rangos de longitud para analítica.

**Superficie que exporta.** [`FEEDBACK_NAME_MAX`](../../../packages/feedback-sdk/src/shared.js#L3), [`FEEDBACK_EMAIL_MAX`](../../../packages/feedback-sdk/src/shared.js#L4), [`FEEDBACK_MESSAGE_MAX`](../../../packages/feedback-sdk/src/shared.js#L5), [`normalizeFeedbackOriginRole`](../../../packages/feedback-sdk/src/shared.js#L7), [`normalizeFeedbackName`](../../../packages/feedback-sdk/src/shared.js#L13), [`normalizeFeedbackEmail`](../../../packages/feedback-sdk/src/shared.js#L18), [`normalizeFeedbackMessage`](../../../packages/feedback-sdk/src/shared.js#L25), [`bucketFeedbackMessageLength`](../../../packages/feedback-sdk/src/shared.js#L30).

**Módulos que lo cargan.** [`createPrelaunchClient.js`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L3) (importa), [`index.js`](../../../packages/feedback-sdk/src/index.js#L1) (reexporta).

**Dependencias del archivo.** [`../../intake-guard/src/index.js`](../../../packages/intake-guard/src/index.js).

#### [`FEEDBACK_NAME_MAX`](../../../packages/feedback-sdk/src/shared.js#L3) · variable de módulo · exportado

Declara `FEEDBACK_NAME_MAX` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeFeedbackName`](../../../packages/feedback-sdk/src/shared.js#L14) (referencia).

#### [`FEEDBACK_EMAIL_MAX`](../../../packages/feedback-sdk/src/shared.js#L4) · variable de módulo · exportado

Declara `FEEDBACK_EMAIL_MAX` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeFeedbackEmail`](../../../packages/feedback-sdk/src/shared.js#L19) (referencia).

#### [`FEEDBACK_MESSAGE_MAX`](../../../packages/feedback-sdk/src/shared.js#L5) · variable de módulo · exportado

Declara `FEEDBACK_MESSAGE_MAX` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeFeedbackMessage`](../../../packages/feedback-sdk/src/shared.js#L25) (referencia).

#### [`normalizeFeedbackOriginRole`](../../../packages/feedback-sdk/src/shared.js#L7) · función · exportado

Normaliza `Feedback Origin Role` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Condiciones que evalúa** `normalized`.
- **Usa código de** [`safeTrim`](../../../packages/intake-guard/src/index.js#L6) (llama).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/feedback-sdk/src/shared.js#L8), [`safeTrim`](../../../packages/feedback-sdk/src/shared.js#L8).
- **Lo usa** [`submit`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L175) (llama).

#### [`normalizeFeedbackName`](../../../packages/feedback-sdk/src/shared.js#L13) · función · exportado

Normaliza `Feedback Name` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Usa código de** [`safeTrim`](../../../packages/intake-guard/src/index.js#L6) (llama).
- **Llamadas directas en el cuerpo** [`safeTrim`](../../../packages/feedback-sdk/src/shared.js#L14).

#### [`normalizeFeedbackEmail`](../../../packages/feedback-sdk/src/shared.js#L18) · función · exportado

Normaliza `Feedback Email` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de normalized`, `ausencia de test`.
- **Usa código de** [`safeTrim`](../../../packages/intake-guard/src/index.js#L6) (llama).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/feedback-sdk/src/shared.js#L19), [`safeTrim`](../../../packages/feedback-sdk/src/shared.js#L19), [`test`](../../../packages/feedback-sdk/src/shared.js#L21).

#### [`normalizeFeedbackMessage`](../../../packages/feedback-sdk/src/shared.js#L25) · función · exportado

Normaliza `Feedback Message` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`, `max = valor por defecto`.
- **Efectos y APIs** `replace`.
- **Usa código de** [`safeTrim`](../../../packages/intake-guard/src/index.js#L6) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../packages/feedback-sdk/src/shared.js#L26), [`replace`](../../../packages/feedback-sdk/src/shared.js#L26), [`safeTrim`](../../../packages/feedback-sdk/src/shared.js#L26).

#### [`bucketFeedbackMessageLength`](../../../packages/feedback-sdk/src/shared.js#L30) · función · exportado

Implementa `bucket Feedback Message Length` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `length`.
- **Condiciones que evalúa** `ausencia de Number.isFinite o length`, `length`.
