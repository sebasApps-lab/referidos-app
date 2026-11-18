# Prelaunch · services

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/prelaunch/src/services/prelaunchSystem.js`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L1)

## Símbolos y conexiones

### [`apps/prelaunch/src/services/prelaunchSystem.js`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L1)

Construye el cliente público y la identidad técnica, lee UTM y prepara eventos. Ofrece envío normal, diferido y keepalive según el momento del evento.

**Superficie que exporta.** [`getPrelaunchClient`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L24), [`getDefaultUtm`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L28), [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L56), [`schedulePrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L64), [`ingestPrelaunchEventKeepalive`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L87).

**Módulos que lo cargan.** [`feedbackApi.js`](../../../apps/prelaunch/src/feedback/feedbackApi.js#L1) (importa), [`useLandingLeadCapture.js`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L2) (importa), [`usePrelaunchPageTracking.js`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L2) (importa), [`FeedbackPage.jsx`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L3) (importa), [`SupportRequestPage.jsx`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L10) (importa), [`supportApi.js`](../../../apps/prelaunch/src/support/supportApi.js#L1) (importa), [`useFeedbackPageController.js`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L4) (importa), [`useSupportOpenTicketController.js`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L3) (importa), [`DesktopWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/desktop/DesktopWaitlistLandingPage.jsx#L6) (importa), [`MobileWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L6) (importa), [`waitlistApi.js`](../../../apps/prelaunch/src/waitlist/waitlistApi.js#L2) (importa).

**Dependencias del archivo.** [`@referidos/api-client/prelaunch`](../../../packages/api-client/src/prelaunch/index.js), [`../config/runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js).

#### Acciones al cargar el módulo

- **Condiciones que evalúa** `SUPABASE_URL y SUPABASE_PUBLISHABLE_KEY`.
- **Usa código de** [`createPrelaunchClient`](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js#L42) (llama).
- **Llamadas directas en el cuerpo** [`createPrelaunchClient`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L15).

#### [`SUPABASE_URL`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L7) · variable de módulo

Declara `SUPABASE_URL` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L61) (accede al módulo).
- **Lo usa** [`prelaunchSystem.js`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L14) (referencia), [`ingestPrelaunchEventKeepalive`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L92) (referencia).

#### [`SUPABASE_PUBLISHABLE_KEY`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L8) · variable de módulo

Declara `SUPABASE_PUBLISHABLE_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L61) (accede al módulo).
- **Lo usa** [`prelaunchSystem.js`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L14) (referencia), [`ingestPrelaunchEventKeepalive`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L92) (referencia).

#### [`TENANT_HINT`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L9) · variable de módulo

Declara `TENANT_HINT` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L61) (accede al módulo).
- **Lo usa** [`prelaunchSystem.js`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L18) (referencia), [`buildEventPayload`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L47) (referencia).

#### [`APP_CHANNEL`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L10) · variable de módulo

Declara `APP_CHANNEL` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L61) (accede al módulo).
- **Lo usa** [`prelaunchSystem.js`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L19) (referencia), [`buildEventPayload`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L48) (referencia).

#### [`prelaunchClient`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L12) · variable de módulo

Declara `prelaunchClient` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`getPrelaunchClient`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L25) (referencia).

#### [`getPrelaunchClient`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L24) · función · exportado

Obtiene o resuelve `Prelaunch Client` para entregarlo al consumidor.

- **Lo usa** [`buildEventPayload`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L42) (llama), [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L60) (llama), [`submitPublicFeedback`](../../../apps/prelaunch/src/feedback/feedbackApi.js#L14) (llama), [`createAnonymousSupportThread`](../../../apps/prelaunch/src/support/supportApi.js#L4) (llama), [`listAnonymousSupportCategories`](../../../apps/prelaunch/src/support/supportApi.js#L10) (llama), [`cancelAnonymousSupportThread`](../../../apps/prelaunch/src/support/supportApi.js#L16) (llama), [`getAnonymousSupportThreadStatus`](../../../apps/prelaunch/src/support/supportApi.js#L22) (llama), [`requestAnonymousSupportThreadRetake`](../../../apps/prelaunch/src/support/supportApi.js#L28) (llama), [`submitWaitlistSignup`](../../../apps/prelaunch/src/waitlist/waitlistApi.js#L22) (llama).

#### [`getDefaultUtm`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L28) · función · exportado

Obtiene o resuelve `Default Utm` para entregarlo al consumidor.

- **Retorno visible o tipo declarado** `source`, `medium`, `campaign`, `term`, `content`.
- **Condiciones que evalúa** `undefined`.
- **Usa código de** [`extractUtmFromSearch`](../../../packages/api-client/src/prelaunch/anonIdentity.js#L88) (llama).
- **Llamadas directas en el cuerpo** [`extractUtmFromSearch`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L38).
- **Lo usa** [`buildEventPayload`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L52) (llama), [`submitPublicFeedback`](../../../apps/prelaunch/src/feedback/feedbackApi.js#L29) (llama), [`submitWaitlistSignup`](../../../apps/prelaunch/src/waitlist/waitlistApi.js#L41) (llama).

#### [`buildEventPayload`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L41) · función

Construye `Event Payload` a partir de los datos del flujo.

- **Entradas** `eventType`, `{path, props, utm} = valor por defecto`.
- **Retorno visible o tipo declarado** `null`, `tenant_hint`, `app_channel`, `event_type`, `path`, `props`, `utm`.
- **Condiciones que evalúa** `ausencia de client`.
- **Llamadas directas en el cuerpo** [`getPrelaunchClient`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L42), [`client.identity.get`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L46), [`getDefaultUtm`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L52).
- **Lo usa** [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L57) (llama), [`ingestPrelaunchEventKeepalive`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L91) (llama).

#### [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L56) · función · asíncrona · exportado

Implementa `ingest Prelaunch Event` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `eventType`, `{path, props, utm} = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `error`.
- **Condiciones que evalúa** `ausencia de payload`.
- **Llamadas directas en el cuerpo** [`buildEventPayload`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L57), [`getPrelaunchClient`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L60), [`client.analytics.ingest`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L61).
- **Lo usa** [`schedulePrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L70) (llama), [`run`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L75) (llama), [`submit`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L60) (llama), [`handleSubmit`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L82) (llama), [`useEffect · callback`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L251) (llama), [`submitConversation`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L382) (llama), [`useEffect · callback`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L121) (llama), [`handleSubmit`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L148) (llama), [`useEffect · callback`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L105) (llama), [`handleSubmit`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L182) (llama), [`handleScrollToWaitlist`](../../../apps/prelaunch/src/waitlist-landing/desktop/DesktopWaitlistLandingPage.jsx#L86) (llama), [`openBusinessModal`](../../../apps/prelaunch/src/waitlist-landing/desktop/DesktopWaitlistLandingPage.jsx#L148) (llama) y 8 más.

#### [`schedulePrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L64) · función · exportado

Coordina `Prelaunch Event` con la planificación o reintento del flujo.

- **Entradas** `eventType`, `{path, props, utm} = valor por defecto`, `{timeoutMs} = valor por defecto`.
- **Efectos y APIs** `window.requestIdleCallback`, `window.setTimeout`.
- **Condiciones que evalúa** `undefined`, `requestIdleCallback`.
- **Llamadas directas en el cuerpo** [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L70), [`window.requestIdleCallback`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L79), [`window.setTimeout`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L83).
- **Lo usa** [`emitEvent`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L34) (llama).

#### [`run`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L74) · función · dentro de [`schedulePrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L64)

Función auxiliar de `schedulePrelaunchEvent` para `run`.

- **Llamadas directas en el cuerpo** [`then`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L75), [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L75).
- **Lo usa** [`schedulePrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L79) (referencia).

#### [`ingestPrelaunchEventKeepalive`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L87) · función · asíncrona · exportado

Implementa `ingest Prelaunch Event Keepalive` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `eventType`, `{path, props, utm} = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Efectos y APIs** `solicitud HTTP por fetch`.
- **Condiciones que evalúa** `ausencia de payload o ausencia de SUPABASE_URL o ausencia de SUPABASE_PUBLISHABLE_KEY`, `ausencia de response.ok`.
- **Llamadas directas en el cuerpo** [`buildEventPayload`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L91), [`fetch`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L97), [`catch`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L107), [`response.json`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L107).
- **Lo usa** [`emitKeepaliveEvent`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L46) (llama).
