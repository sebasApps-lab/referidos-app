# Prelaunch · Analítica y observabilidad

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/prelaunch/src/observability/PrelaunchCheckpoint.jsx`](../../../apps/prelaunch/src/observability/PrelaunchCheckpoint.jsx#L1)
- [`apps/prelaunch/src/observability/prelaunchObservability.js`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L1)
- [`apps/prelaunch/src/observability/usePrelaunchPageTracking.js`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L1)

## Símbolos y conexiones

### [`apps/prelaunch/src/observability/PrelaunchCheckpoint.jsx`](../../../apps/prelaunch/src/observability/PrelaunchCheckpoint.jsx#L1)

Marca puntos de render o de navegación para que la inicialización de observabilidad pueda registrar el contexto de la página.

**Superficie que exporta.** [`PrelaunchCheckpoint`](../../../apps/prelaunch/src/observability/PrelaunchCheckpoint.jsx#L1).

**Módulos que lo cargan.** [`DesktopWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/desktop/DesktopWaitlistLandingPage.jsx#L4) (importa), [`DesktopFooterSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/desktop/sections/DesktopFooterSection.jsx#L2) (importa), [`DesktopWaitlistSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/desktop/sections/DesktopWaitlistSection.jsx#L2) (importa), [`DesktopWaitlistStepsSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/desktop/sections/DesktopWaitlistStepsSection.jsx#L2) (importa), [`MobileContactSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileContactSection.jsx#L1) (importa), [`MobileFooterSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L4) (importa), [`MobileHeroSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L3) (importa), [`MobileWaitlistSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistSection.jsx#L2) (importa), [`MobileWaitlistStepsSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistStepsSection.jsx#L2) (importa).

#### [`PrelaunchCheckpoint`](../../../apps/prelaunch/src/observability/PrelaunchCheckpoint.jsx#L1) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{id, order, surface, position}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`DesktopWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/desktop/DesktopWaitlistLandingPage.jsx#L259) (renderiza), [`DesktopFooterSection`](../../../apps/prelaunch/src/waitlist-landing/desktop/sections/DesktopFooterSection.jsx#L13) (renderiza), [`DesktopWaitlistSection`](../../../apps/prelaunch/src/waitlist-landing/desktop/sections/DesktopWaitlistSection.jsx#L26) (renderiza), [`DesktopWaitlistStepsSection`](../../../apps/prelaunch/src/waitlist-landing/desktop/sections/DesktopWaitlistStepsSection.jsx#L19) (renderiza), [`MobileContactSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileContactSection.jsx#L8) (renderiza), [`MobileFooterSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L73) (renderiza), [`MobileHeroSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L62) (renderiza), [`MobileWaitlistSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistSection.jsx#L27) (renderiza), [`MobileWaitlistStepsSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistStepsSection.jsx#L15) (renderiza).

### [`apps/prelaunch/src/observability/prelaunchObservability.js`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L1)

Arranca el cliente web de errores con un adaptador fetch. Registra metadatos de release y arma runtime y políticas de errores.

**Superficie que exporta.** [`initPrelaunchObservability`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L78).

**Módulos que lo cargan.** [`main.jsx`](../../../apps/prelaunch/src/main.jsx#L27) (carga diferida).

**Dependencias del archivo.** [`@referidos/observability`](../../../packages/observability/src/index.js), [`../config/runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js).

#### [`SUPABASE_URL`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L8) · variable de módulo

Declara `SUPABASE_URL` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L61) (accede al módulo).
- **Lo usa** [`createSupabaseInvokeAdapter`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L24) (referencia), [`invoke`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L28) (referencia).

#### [`SUPABASE_PUBLISHABLE_KEY`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L9) · variable de módulo

Declara `SUPABASE_PUBLISHABLE_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L61) (accede al módulo).
- **Lo usa** [`createSupabaseInvokeAdapter`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L24) (referencia), [`invoke`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L32) (referencia).

#### [`TENANT_HINT`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L10) · variable de módulo

Declara `TENANT_HINT` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L61) (accede al módulo).
- **Lo usa** [`registerReleaseOnce`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L57) (referencia), [`initPrelaunchObservability`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L89) (referencia).

#### [`APP_ID`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L11) · variable de módulo

Declara `APP_ID` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L61) (accede al módulo).
- **Lo usa** [`registerReleaseOnce`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L58) (referencia), [`initPrelaunchObservability`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L90) (referencia).

#### [`APP_ENV`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L12) · variable de módulo

Declara `APP_ENV` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L61) (accede al módulo).
- **Lo usa** [`registerReleaseOnce`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L61) (referencia), [`initPrelaunchObservability`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L93) (referencia).

#### [`APP_VERSION`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L13) · variable de módulo

Declara `APP_VERSION` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L61) (accede al módulo).
- **Lo usa** [`registerReleaseOnce`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L59) (referencia), [`initPrelaunchObservability`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L95) (referencia).

#### [`BUILD_ID`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L14) · variable de módulo

Declara `BUILD_ID` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L61) (accede al módulo).
- **Lo usa** [`registerReleaseOnce`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L60) (referencia), [`initPrelaunchObservability`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L96) (referencia).

#### [`RELEASE_ID`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L15) · variable de módulo

Declara `RELEASE_ID` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L61) (accede al módulo).
- **Lo usa** [`registerReleaseOnce`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L64) (referencia).

#### [`SOURCE_COMMIT_SHA`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L16) · variable de módulo

Declara `SOURCE_COMMIT_SHA` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L61) (accede al módulo).
- **Lo usa** [`registerReleaseOnce`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L65) (referencia).

#### [`client`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L18) · variable de módulo

Declara `client` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`initPrelaunchObservability`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L100) (referencia).

#### [`runtime`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L19) · variable de módulo

Declara `runtime` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`initPrelaunchObservability`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L79) (referencia).

#### [`initialized`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L20) · variable de módulo

Declara `initialized` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`initPrelaunchObservability`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L79) (referencia).

#### [`releaseRegistered`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L21) · variable de módulo

Declara `releaseRegistered` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`registerReleaseOnce`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L52) (referencia).

#### [`createSupabaseInvokeAdapter`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L23) · función

Construye `Supabase Invoke Adapter` a partir de los datos del flujo.

- **Retorno visible o tipo declarado** `null`, `functions`.
- **Condiciones que evalúa** `ausencia de SUPABASE_URL o ausencia de SUPABASE_PUBLISHABLE_KEY`.
- **Lo usa** [`initPrelaunchObservability`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L82) (llama).

#### [`invoke`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L27) · función · asíncrona · dentro de [`createSupabaseInvokeAdapter`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L23)

Función auxiliar de `createSupabaseInvokeAdapter` para `invoke`.

- **Entradas** `fnName`, `options = valor por defecto`.
- **Retorno visible o tipo declarado** `data`, `error`.
- **Efectos y APIs** `solicitud HTTP por fetch`.
- **Condiciones que evalúa** `ausencia de response.ok`.
- **Llamadas directas en el cuerpo** [`fetch`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L28), [`catch`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L36), [`response.json`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L36).

#### [`registerReleaseOnce`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L51) · función · asíncrona

Consulta o invoca Edge [`obs-release`](../../../apps/referidos-app/supabase/functions/obs-release/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `adapter`.
- **Condiciones que evalúa** `releaseRegistered`.
- **Contrato de datos** Edge [`obs-release`](../../../apps/referidos-app/supabase/functions/obs-release/index.ts) en [`prelaunchObservability.js:55`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L55).
- **Llamadas directas en el cuerpo** [`adapter.functions.invoke`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L55).
- **Lo usa** [`initPrelaunchObservability`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L120) (llama).

#### [`initPrelaunchObservability`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L78) · función · exportado

Inicia `Prelaunch Observability` y prepara sus dependencias.

- **Retorno visible o tipo declarado** `null`.
- **Actualizaciones de estado o acciones** `setContext`.
- **Condiciones que evalúa** `initialized`, `ausencia de adapter`.
- **Usa código de** [`createObservabilityClient`](../../../packages/observability/src/client/createObservabilityClient.js#L142) (llama), [`createErrorRuntime`](../../../packages/observability/src/runtime/createErrorRuntime.js#L57) (llama), [`createPolicyRuntime`](../../../packages/observability/src/policy/uxPolicy.js#L21) (llama).
- **Llamadas directas en el cuerpo** [`createSupabaseInvokeAdapter`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L82), [`createObservabilityClient`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L85), [`createErrorRuntime`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L99), [`createPolicyRuntime`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L101), [`runtime.init`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L109), [`runtime.setContext`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L110), [`runtime.logEvent`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L115), [`registerReleaseOnce`](../../../apps/prelaunch/src/observability/prelaunchObservability.js#L120).

### [`apps/prelaunch/src/observability/usePrelaunchPageTracking.js`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L1)

Coordina visitas, secciones, enlaces, modales y eventos de salida. Los componentes reportan la interacción mediante este hook y se conserva contexto de árbol y página.

**Superficie que exporta.** [`usePrelaunchPageTracking`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L12).

**Módulos que lo cargan.** [`DesktopWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/desktop/DesktopWaitlistLandingPage.jsx#L5) (importa), [`MobileWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L5) (importa).

**Dependencias del archivo.** `react`, [`../services/prelaunchSystem`](../../../apps/prelaunch/src/services/prelaunchSystem.js).

#### [`buildBaseProps`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L4) · función

Construye `Base Props` a partir de los datos del flujo.

- **Entradas** `page`, `tree`, `route`.
- **Retorno visible o tipo declarado** `page`, `tree`, `route`.
- **Lo usa** [`baseProps`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L30) (llama).

#### [`usePrelaunchPageTracking`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L12) · hook React · exportación por defecto

Agrupa estado, contexto o efectos de `Prelaunch Page Tracking` para sus consumidores React.

- **Entradas** `{path, page, tree, route, sections} = valor por defecto`.
- **Retorno visible o tipo declarado** `trackLinkClick`, `trackModalView`, `trackModalClose`, `trackEvent`.
- **Estado o valores vinculados** `startedAtRef mediante useRef`, `seenSectionsRef mediante useRef`, `lastSectionIdRef mediante useRef`, `lastSectionOrderRef mediante useRef`, `seenCheckpointsRef mediante useRef`, `lastCheckpointIdRef mediante useRef`, `lastCheckpointOrderRef mediante useRef`, `furthestCheckpointIdRef mediante useRef`, `furthestCheckpointOrderRef mediante useRef`, `leaveSentRef mediante useRef`.
- **Hooks que llama** `useRef`, `useEffect`.
- **Lo usa** [`DesktopWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/desktop/DesktopWaitlistLandingPage.jsx#L67) (llama), [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L78) (llama).

#### [`baseProps`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L30) · cálculo memorizado · dentro de [`usePrelaunchPageTracking`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L12)

Función auxiliar de `usePrelaunchPageTracking` para `base Props`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`buildBaseProps`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L30).
- **Lo usa** [`emitEvent`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L37) (referencia), [`emitKeepaliveEvent`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L49) (referencia).

#### [`emitEvent`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L33) · callback React · dentro de [`usePrelaunchPageTracking`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L12)

Emite o envía el valor de evento en el flujo del archivo.

- **Entradas** `eventType`, `props = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Usa código de** [`schedulePrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L64) (llama).
- **Llamadas directas en el cuerpo** [`schedulePrelaunchEvent`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L34).
- **Lo usa** [`trackLinkClick`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L64) (llama), [`trackModalView`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L76) (llama), [`trackModalClose`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L85) (llama), [`useEffect · callback`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L94) (llama), [`usePrelaunchPageTracking`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L95) (referencia), [`useEffect · callback`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L107) (llama), [`handleEntries`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L148) (llama), [`useEffect · callback`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L269) (llama).

#### [`emitKeepaliveEvent`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L45) · callback React · dentro de [`usePrelaunchPageTracking`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L12)

Emite o envía `Keepalive Event` en el flujo del archivo.

- **Entradas** `eventType`, `props = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Usa código de** [`ingestPrelaunchEventKeepalive`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L87) (llama).
- **Llamadas directas en el cuerpo** [`ingestPrelaunchEventKeepalive`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L46).
- **Lo usa** [`handleLeave`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L329) (llama), [`usePrelaunchPageTracking`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L348) (referencia).

#### [`trackLinkClick`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L57) · callback React · dentro de [`usePrelaunchPageTracking`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L12)

Emite o envía `Link Click` en el flujo del archivo.

- **Entradas** `{linkId, targetPath, targetKind, surface, label}`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`emitEvent`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L64).
- **Lo usa** [`usePrelaunchPageTracking`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L351) (referencia).

#### [`trackModalView`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L75) · callback React · dentro de [`usePrelaunchPageTracking`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L12)

Emite o envía `Modal View` en el flujo del archivo.

- **Entradas** `{modalId, surface}`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`emitEvent`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L76).
- **Lo usa** [`usePrelaunchPageTracking`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L352) (referencia).

#### [`trackModalClose`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L84) · callback React · dentro de [`usePrelaunchPageTracking`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L12)

Emite o envía `Modal Close` en el flujo del archivo.

- **Entradas** `{modalId, surface, reason}`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`emitEvent`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L85).
- **Lo usa** [`usePrelaunchPageTracking`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L353) (referencia).

#### [`useEffect · callback`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L93) · callback de infraestructura · dentro de [`usePrelaunchPageTracking`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L12)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `usePrelaunchPageTracking`.

- **Llamadas directas en el cuerpo** [`emitEvent`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L94).

#### [`useEffect · callback`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L97) · callback de infraestructura · dentro de [`usePrelaunchPageTracking`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L12)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `usePrelaunchPageTracking`.

- **Condiciones que evalúa** `undefined`, `ausencia de referralCode`.
- **Llamadas directas en el cuerpo** [`get`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L102), [`emitEvent`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L107).

#### [`useEffect · callback`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L112) · callback de infraestructura · dentro de [`usePrelaunchPageTracking`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L12)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `usePrelaunchPageTracking`.

- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`bindSections`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L212), [`mutationObserver.observe`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L217), [`mutationObserver.disconnect`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L223), [`observerGroups.forEach`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L224), [`nodes.forEach`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L225), [`observer.unobserve`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L225), [`observer.disconnect`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L226).

#### [`handleEntries`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L117) · función · dentro de [`useEffect · callback`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L112)

Maneja `Entries` y coordina las acciones indicadas abajo.

- **Entradas** `entries`.
- **Actualizaciones de estado o acciones** `setAttribute`.
- **Condiciones que evalúa** `ausencia de entry.isIntersecting`, `ausencia de sectionId`, `once`, `seenSectionsRef.current.has`, `sectionOrder`.
- **Llamadas directas en el cuerpo** [`entries.forEach`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L118), [`entry.target.getAttribute`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L123), [`entry.target.setAttribute`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L129), [`seenSectionsRef.current.has`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L132), [`seenSectionsRef.current.add`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L142), [`emitEvent`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L148).
- **Lo usa** [`ensureObserverGroup`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L163) (referencia).

#### [`ensureObserverGroup`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L159) · función · dentro de [`useEffect · callback`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L112)

Función auxiliar de `useEffect · callback` para `ensure Observer Group`.

- **Entradas** `threshold`.
- **Condiciones que evalúa** `ausencia de observerGroup`.
- **Llamadas directas en el cuerpo** [`observerGroups.get`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L160), [`observerGroups.set`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L168).
- **Lo usa** [`bindSection`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L202) (llama).

#### [`bindSection`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L173) · función · dentro de [`useEffect · callback`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L112)

Coordina cambios de estado durante `bind Section`.

- **Entradas** `section`.
- **Actualizaciones de estado o acciones** `setAttribute`.
- **Condiciones que evalúa** `ausencia de node`, `previousNode`, `section.reveal`.
- **Llamadas directas en el cuerpo** [`document.querySelector`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L175), [`document.getElementById`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L176), [`observedNodes.get`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L182), [`observerGroups.get`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L190), [`previousGroup.observer.unobserve`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L191), [`previousGroup.nodes.delete`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L192), [`node.setAttribute`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L195), [`ensureObserverGroup`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L202), [`observerGroup.observer.observe`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L203), [`observerGroup.nodes.add`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L204), [`observedNodes.set`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L205).
- **Lo usa** [`bindSections`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L209) (referencia).

#### [`bindSections`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L208) · función · dentro de [`useEffect · callback`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L112)

Función auxiliar de `useEffect · callback` para `bind Sections`.

- **Llamadas directas en el cuerpo** [`sections.forEach`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L209).
- **Lo usa** [`useEffect · callback`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L212) (llama).

#### [`useEffect · callback`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L231) · callback de infraestructura · dentro de [`usePrelaunchPageTracking`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L12)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `usePrelaunchPageTracking`.

- **Condiciones que evalúa** `undefined`, `ausencia de entry.isIntersecting`, `ausencia de checkpointId`, `checkpointOrder`, `seenCheckpointsRef.current.has`.
- **Llamadas directas en el cuerpo** [`entries.forEach`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L240), [`entry.target.getAttribute`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L245), [`seenCheckpointsRef.current.has`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L264), [`seenCheckpointsRef.current.add`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L268), [`emitEvent`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L269), [`bindCheckpoints`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L299), [`mutationObserver.observe`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L304), [`mutationObserver.disconnect`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L310), [`observedNodes.forEach`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L311), [`checkpointObserver.unobserve`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L311), [`checkpointObserver.disconnect`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L312).

#### [`bindCheckpoints`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L281) · función · dentro de [`useEffect · callback`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L231)

Función auxiliar de `useEffect · callback` para `bind Checkpoints`.

- **Condiciones que evalúa** `ausencia de checkpointId o node`, `previousNode`.
- **Llamadas directas en el cuerpo** [`document.querySelectorAll`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L282), [`checkpointNodes.forEach`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L283), [`node.getAttribute`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L284), [`observedNodes.get`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L285), [`checkpointObserver.unobserve`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L291), [`checkpointObserver.observe`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L294), [`observedNodes.set`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L295).
- **Lo usa** [`useEffect · callback`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L299) (llama).

#### [`useEffect · callback`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L316) · callback de infraestructura · dentro de [`usePrelaunchPageTracking`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L12)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `usePrelaunchPageTracking`.

- **Efectos y APIs** `window.addEventListener`, `window.removeEventListener`.
- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`window.addEventListener`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L344), [`window.removeEventListener`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L346).

#### [`handleLeave`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L321) · función · dentro de [`useEffect · callback`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L316)

Maneja `Leave` y coordina las acciones indicadas abajo.

- **Entradas** `reason`.
- **Condiciones que evalúa** `leaveSentRef.current`.
- **Llamadas directas en el cuerpo** [`emitKeepaliveEvent`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L329).
- **Lo usa** [`handlePageHide`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L341) (llama).

#### [`handlePageHide`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L340) · función · dentro de [`useEffect · callback`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L316)

Maneja `Page Hide` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`handleLeave`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L341).
- **Lo usa** [`useEffect · callback`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L344) (referencia).
