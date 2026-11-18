# Paquetes compartidos · support-sdk · 1 de 3

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`packages/support-sdk/lib/supabaseClient.js`](../../../packages/support-sdk/lib/supabaseClient.js#L1)
- [`packages/support-sdk/src/agent/SupportDevDebugBanner.jsx`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L1)
- [`packages/support-sdk/src/agent/SupportErrorCatalog.jsx`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L1)
- [`packages/support-sdk/src/agent/SupportGate.jsx`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L1)
- [`packages/support-sdk/src/agent/SupportInbox.jsx`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L1)
- [`packages/support-sdk/src/agent/SupportInicio.jsx`](../../../packages/support-sdk/src/agent/SupportInicio.jsx#L1)
- [`packages/support-sdk/src/agent/SupportIrregular.jsx`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L1)
- [`packages/support-sdk/src/agent/SupportIssues.jsx`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L1)
- [`packages/support-sdk/src/agent/SupportJornadas.jsx`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L1)

## Símbolos y conexiones

### [`packages/support-sdk/lib/supabaseClient.js`](../../../packages/support-sdk/lib/supabaseClient.js#L1)

Resuelve el cliente web con una clave global de singleton compartida por convención. Revisa el orden de inicialización y los valores efectivos al aislar el SDK.

**Superficie que exporta.** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23).

**Módulos que lo cargan.** [`SupportErrorCatalog.jsx`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L4) (importa), [`SupportGate.jsx`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L3) (importa), [`SupportInbox.jsx`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L4) (importa), [`SupportIssues.jsx`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L3) (importa), [`SupportJornadas.jsx`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L3) (importa), [`SupportTicket.jsx`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L27) (importa), [`SupportWorkQueueDock.jsx`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L4) (importa), [`supportCatalog.js`](../../../packages/support-sdk/src/data/supportCatalog.js#L1) (importa), [`supportRuntimeFlags.js`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L1) (importa), [`supportClient.js`](../../../packages/support-sdk/src/supportClient.js#L1) (importa).

**Dependencias del archivo.** `@supabase/supabase-js`.

#### Acciones al cargar el módulo

- **Condiciones que evalúa** `ausencia de SUPABASE_URL o ausencia de SUPABASE_ANON_KEY`, `ausencia de globalScope.SUPABASE_SINGLETON_KEY`.
- **Llamadas directas en el cuerpo** [`createClient`](../../../packages/support-sdk/lib/supabaseClient.js#L13).

#### [`SUPABASE_URL`](../../../packages/support-sdk/lib/supabaseClient.js#L3) · variable de módulo

Declara `SUPABASE_URL` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`supabaseClient.js`](../../../packages/support-sdk/lib/supabaseClient.js#L7) (referencia).

#### [`SUPABASE_ANON_KEY`](../../../packages/support-sdk/lib/supabaseClient.js#L4) · variable de módulo

Declara `SUPABASE_ANON_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`supabaseClient.js`](../../../packages/support-sdk/lib/supabaseClient.js#L7) (referencia).

#### [`SUPABASE_SINGLETON_KEY`](../../../packages/support-sdk/lib/supabaseClient.js#L5) · variable de módulo

Declara `SUPABASE_SINGLETON_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`supabaseClient.js`](../../../packages/support-sdk/lib/supabaseClient.js#L12) (referencia), [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (referencia).

#### [`globalScope`](../../../packages/support-sdk/lib/supabaseClient.js#L11) · variable de módulo

Declara `globalScope` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`supabaseClient.js`](../../../packages/support-sdk/lib/supabaseClient.js#L12) (accede al módulo), [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).

#### [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) · variable de módulo · exportación por defecto

Declara `supabase` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`supabaseClient.js`](../../../packages/support-sdk/lib/supabaseClient.js#L25) (referencia), [`loadRows`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L72) (accede al módulo), [`syncStatus`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L49) (accede al módulo), [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L312) (accede al módulo), [`loadInboxRows`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L63) (accede al módulo), [`refreshSessionState`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L167) (accede al módulo), [`loadSession`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L205) (accede al módulo), [`loadAutoAssignModeState`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L239) (accede al módulo), [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L257) (accede al módulo), [`runHotSync`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L310) (accede al módulo), [`loadData`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L35) (accede al módulo), [`loadHistory`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L65) (accede al módulo) y 30 más.

### [`packages/support-sdk/src/agent/SupportDevDebugBanner.jsx`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L1)

Presenta información de diagnóstico en el contexto de desarrollo del agente.

**Superficie que exporta.** [`SupportDevDebugBanner`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L12).

**Módulos que lo cargan.** [`SupportInbox.jsx`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L7) (importa), [`SupportTicket.jsx`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L43) (importa).

**Dependencias del archivo.** `react`.

#### [`MAX_ITEMS`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L3) · variable de módulo

Declara `MAX_ITEMS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`SupportDevDebugBanner`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L24) (referencia), [`push`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L48) (referencia).

#### [`STORAGE_KEY`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L4) · variable de módulo

Declara `STORAGE_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`SupportDevDebugBanner`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L21) (referencia), [`push`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L45) (referencia), [`button.onClick`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L157) (referencia).

#### [`formatNow`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L6) · función

Formatea `Now` para que el consumidor lo pueda presentar.

- **Llamadas directas en el cuerpo** [`toLocaleTimeString`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L7).
- **Lo usa** [`push`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L35) (llama).

#### [`SupportDevDebugBanner`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L12) · componente React · exportación por defecto

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{scope, position, zIndexClass}`.
- **Retorno visible o tipo declarado** `lista`, `null`, `JSX`.
- **Estado o valores vinculados** `[items, setItems] mediante useState`.
- **Interfaz que monta** `button`.
- **Hooks que llama** `useState`, `useEffect`.
- **Efectos y APIs** `window.sessionStorage.getItem`.
- **Condiciones que evalúa** `ausencia de enabled`, `ausencia de raw`.
- **Llamadas directas en el cuerpo** [`window.sessionStorage.getItem`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L21), [`parsed.slice`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L24), [`items.map`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L171).
- **Lo usa** [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L136) (renderiza), [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L901) (renderiza).

#### [`push`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L31) · cálculo memorizado · dentro de [`SupportDevDebugBanner`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L12)

Coordina cambios de estado durante `push`.

- **Hooks que llama** `useMemo`.
- **Actualizaciones de estado o acciones** `setItem`, `setItems`.
- **Efectos y APIs** `window.sessionStorage.getItem`, `window.sessionStorage.setItem`.
- **Condiciones que evalúa** `ausencia de enabled`, `persisted`.
- **Llamadas directas en el cuerpo** [`slice`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L34), [`toString`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L34), [`formatNow`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L35), [`window.sessionStorage.getItem`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L45), [`window.sessionStorage.setItem`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L49), [`setItems`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L55).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L72) (llama), [`onFocus`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L79) (llama), [`onBlur`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L80) (llama), [`onVisibility`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L81) (llama), [`onPageShow`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L82) (llama), [`onPageHide`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L83) (llama), [`onBeforeUnload`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L84) (llama), [`onOnline`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L85) (llama), [`onOffline`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L86) (llama), [`onError`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L87) (llama), [`onUnhandled`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L88) (llama), [`onBeforeUpdate`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L103) (llama) y 5 más.

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L69) · callback de infraestructura · dentro de [`SupportDevDebugBanner`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L12)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportDevDebugBanner`.

- **Efectos y APIs** `push`, `window.addEventListener`, `document.addEventListener`, `window.removeEventListener`, `document.removeEventListener`.
- **Condiciones que evalúa** `ausencia de enabled`, `navEntry.type`, `import.meta.hot.on`.
- **Llamadas directas en el cuerpo** [`push`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L72), [`performance.getEntriesByType`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L74), [`window.addEventListener`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L90), [`document.addEventListener`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L92), [`import.meta.hot.on`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L111), [`cleanupHot`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L128), [`window.removeEventListener`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L129), [`document.removeEventListener`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L131).

#### [`onFocus`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L79) · función · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L69)

Maneja `Focus` y coordina las acciones indicadas abajo.

- **Efectos y APIs** `push`.
- **Llamadas directas en el cuerpo** [`push`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L79).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L90) (referencia).

#### [`onBlur`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L80) · función · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L69)

Maneja `Blur` y coordina las acciones indicadas abajo.

- **Efectos y APIs** `push`.
- **Llamadas directas en el cuerpo** [`push`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L80).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L91) (referencia).

#### [`onVisibility`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L81) · función · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L69)

Maneja `Visibility` y coordina las acciones indicadas abajo.

- **Efectos y APIs** `push`.
- **Llamadas directas en el cuerpo** [`push`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L81).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L92) (referencia).

#### [`onPageShow`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L82) · función · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L69)

Maneja `Page Show` y coordina las acciones indicadas abajo.

- **Entradas** `event`.
- **Efectos y APIs** `push`.
- **Llamadas directas en el cuerpo** [`push`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L82).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L93) (referencia).

#### [`onPageHide`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L83) · función · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L69)

Maneja `Page Hide` y coordina las acciones indicadas abajo.

- **Entradas** `event`.
- **Efectos y APIs** `push`.
- **Llamadas directas en el cuerpo** [`push`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L83).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L94) (referencia).

#### [`onBeforeUnload`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L84) · función · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L69)

Maneja `Before Unload` y coordina las acciones indicadas abajo.

- **Efectos y APIs** `push`.
- **Llamadas directas en el cuerpo** [`push`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L84).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L95) (referencia).

#### [`onOnline`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L85) · función · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L69)

Maneja `Online` y coordina las acciones indicadas abajo.

- **Efectos y APIs** `push`.
- **Llamadas directas en el cuerpo** [`push`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L85).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L96) (referencia).

#### [`onOffline`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L86) · función · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L69)

Maneja `Offline` y coordina las acciones indicadas abajo.

- **Efectos y APIs** `push`.
- **Llamadas directas en el cuerpo** [`push`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L86).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L97) (referencia).

#### [`onError`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L87) · función · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L69)

Maneja el valor de error y coordina las acciones indicadas abajo.

- **Entradas** `event`.
- **Efectos y APIs** `push`.
- **Llamadas directas en el cuerpo** [`push`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L87).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L98) (referencia).

#### [`onUnhandled`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L88) · función · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L69)

Maneja `Unhandled` y coordina las acciones indicadas abajo.

- **Entradas** `event`.
- **Efectos y APIs** `push`.
- **Llamadas directas en el cuerpo** [`push`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L88).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L99) (referencia).

#### [`cleanupHot`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L101) · función · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L69)

Normaliza `up Hot` antes de validarlo, mostrarlo o enviarlo.

- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L128) (llama).

#### [`onBeforeUpdate`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L103) · función · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L69)

Maneja `Before Update` y coordina las acciones indicadas abajo.

- **Efectos y APIs** `push`.
- **Llamadas directas en el cuerpo** [`push`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L103).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L111) (referencia), [`cleanupHot`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L119) (referencia).

#### [`onAfterUpdate`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L104) · función · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L69)

Maneja `After Update` y coordina las acciones indicadas abajo.

- **Efectos y APIs** `push`.
- **Llamadas directas en el cuerpo** [`push`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L104).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L112) (referencia), [`cleanupHot`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L120) (referencia).

#### [`onBeforeFullReload`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L105) · función · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L69)

Maneja `Before Full Reload` y coordina las acciones indicadas abajo.

- **Entradas** `payload`.
- **Efectos y APIs** `push`.
- **Llamadas directas en el cuerpo** [`push`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L106), [`trim`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L106).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L113) (referencia), [`cleanupHot`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L121) (referencia).

#### [`onInvalidate`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L107) · función · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L69)

Maneja `Invalidate` y coordina las acciones indicadas abajo.

- **Entradas** `payload`.
- **Efectos y APIs** `push`.
- **Llamadas directas en el cuerpo** [`push`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L108), [`trim`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L108).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L114) (referencia), [`cleanupHot`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L122) (referencia).

#### [`onErrorHot`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L109) · función · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L69)

Maneja `Error Hot` y coordina las acciones indicadas abajo.

- **Entradas** `payload`.
- **Efectos y APIs** `push`.
- **Llamadas directas en el cuerpo** [`push`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L109).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L115) (referencia), [`cleanupHot`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L123) (referencia).

#### [`cleanupHot`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L117) · función asignada · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L69)

Normaliza `up Hot` antes de validarlo, mostrarlo o enviarlo.

- **Condiciones que evalúa** `ausencia de import.meta.hot.off`.
- **Llamadas directas en el cuerpo** [`import.meta.hot.off`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L119).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L154) · callback JSX · dentro de [`SupportDevDebugBanner`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L12)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setItems`.
- **Efectos y APIs** `window.sessionStorage.removeItem`.
- **Llamadas directas en el cuerpo** [`setItems`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L155), [`window.sessionStorage.removeItem`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L157).

### [`packages/support-sdk/src/agent/SupportErrorCatalog.jsx`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L1)

Vista del catálogo de errores para consulta durante atención.

**Superficie que exporta.** [`SupportErrorCatalog`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L63).

**Módulos que lo cargan.** [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L25) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`@referidos/observability`](../../../packages/observability/src/index.js), [`../../lib/supabaseClient`](../../../packages/support-sdk/lib/supabaseClient.js).

#### [`STATUS_VARIANT`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L6) · variable de módulo

Agrupa la configuración o catálogo de `STATUS VARIANT` para que sus consumidores lean claves comunes.

- **Campos o contexto** `pending`, `defined`, `ignored`.
- **Lo usa** [`SupportErrorCatalog`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L160) (accede al módulo).

#### [`EXTRA_KNOWN_CODES`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L12) · variable de módulo

Conserva la lista de `EXTRA KNOWN CODES` usada por el módulo.

- **Lo usa** [`KNOWN_CODES`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L28) (referencia).

#### [`KNOWN_CODES`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L27) · variable de módulo

Declara `KNOWN_CODES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`OBS_ERROR_CODES`](../../../packages/observability/src/schema/errorCodes.js#L1) (referencia).
- **Llamadas directas en el cuerpo** [`sort`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L27).
- **Lo usa** [`buildFallbackRows`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L33) (accede al módulo).

#### [`buildFallbackRows`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L31) · función

Construye `Fallback Rows` a partir de los datos del flujo.

- **Llamadas directas en el cuerpo** [`toISOString`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L32), [`KNOWN_CODES.map`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L33).
- **Lo usa** [`loadRows`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L81) (llama).

#### [`formatDate`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L50) · función

Formatea el valor de fecha para que el consumidor lo pueda presentar.

- **Entradas** `iso`.
- **Condiciones que evalúa** `ausencia de iso`, `Number.isNaN`.
- **Llamadas directas en el cuerpo** [`date.getTime`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L53), [`format`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L54).
- **Lo usa** [`SupportErrorCatalog`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L168) (llama).

#### [`SupportErrorCatalog`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L63) · componente React · exportación por defecto

Monta `Search`, `input`, `button`, `RefreshCw`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[rows, setRows] mediante useState`, `[query, setQuery] mediante useState`, `[loading, setLoading] mediante useState`, `[error, setError] mediante useState`.
- **Interfaz que monta** `Search`, `input`, `button`, `RefreshCw`.
- **Hooks que llama** `useState`, `useEffect`.
- **Llamadas directas en el cuerpo** [`filtered.map`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L153), [`formatDate`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L168).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L456) (renderiza).

#### [`loadRows`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L69) · función · asíncrona · dentro de [`SupportErrorCatalog`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L63)

Consulta o invoca tabla o vista [`obs_error_catalog`](../../../apps/referidos-app/supabase/migrations/20260213_000007_observability_error_catalog.sql#L1) y coordina las demás operaciones de esta ficha.

- **Actualizaciones de estado o acciones** `setLoading`, `setError`, `setRows`.
- **Condiciones que evalúa** `fetchError`.
- **Contrato de datos** tabla o vista [`obs_error_catalog`](../../../apps/referidos-app/supabase/migrations/20260213_000007_observability_error_catalog.sql#L1) (`select`) en [`SupportErrorCatalog.jsx:72`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L72), tabla o bucket [`obs_error_catalog`](../../../apps/referidos-app/supabase/migrations/20260213_000007_observability_error_catalog.sql#L1) en [`SupportErrorCatalog.jsx:72`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L72).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L70), [`setError`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L71), [`limit`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L72), [`order`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L72), [`select`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L72), [`supabase.from`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L72), [`setRows`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L81), [`buildFallbackRows`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L81).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L90) (llama), [`button.onClick`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L130) (llama).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L89) · callback de infraestructura · dentro de [`SupportErrorCatalog`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L63)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportErrorCatalog`.

- **Llamadas directas en el cuerpo** [`loadRows`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L90).

#### [`filtered`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L93) · cálculo memorizado · dentro de [`SupportErrorCatalog`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L63)

Procesa `ed` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de term`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L94), [`query.trim`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L94), [`rows.filter`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L96), [`join`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L97), [`filter`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L97), [`haystack.includes`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L108).
- **Lo usa** [`SupportErrorCatalog`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L149) (accede al módulo).

#### [`input.onChange`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L122) · callback JSX · dentro de [`SupportErrorCatalog`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L63)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setQuery`.
- **Llamadas directas en el cuerpo** [`setQuery`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L122).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L129) · callback JSX · dentro de [`SupportErrorCatalog`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L63)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`loadRows`](../../../packages/support-sdk/src/agent/SupportErrorCatalog.jsx#L130).

### [`packages/support-sdk/src/agent/SupportGate.jsx`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L1)

Interfaz de habilitación de la sesión de soporte. Ubica el requisito local y busca el permiso real en backend.

**Superficie que exporta.** [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L17).

**Módulos que lo cargan.** [`SupportInbox.jsx`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L6) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../lib/supabaseClient`](../../../packages/support-sdk/lib/supabaseClient.js), [`../../store/appStore`](../../../packages/support-sdk/store/appStore.js), [`../runtime/systemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js), [`../runtime/supportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js), [`../supportClient`](../../../packages/support-sdk/src/supportClient.js).

#### [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L17) · componente React · exportación por defecto

Monta `ShieldAlert`, `button`, `RefreshCw`, `ShieldCheck`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{children, showSessionActions}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `[profile, setProfile] mediante useState`, `[loading, setLoading] mediante useState`, `[sessionActive, setSessionActive] mediante useState`, `[requestPending, setRequestPending] mediante useState`, `[startLoading, setStartLoading] mediante useState`, `[endLoading, setEndLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[sessionEndError, setSessionEndError] mediante useState`, `[abandonmentFlowStep, setAbandonmentFlowStep] mediante useState`, `[abandonmentThreads, setAbandonmentThreads] mediante useState`, `[abandonmentSubmitting, setAbandonmentSubmitting] mediante useState`, `[runtimeFlags, setRuntimeFlags] mediante useState`.
- **Interfaz que monta** `ShieldAlert`, `button`, `RefreshCw`, `ShieldCheck`.
- **Hooks que llama** `useAppStore`, `useState`, `useEffect`.
- **Condiciones que evalúa** `loading`, `ausencia de profile o profile.blocked`, `ausencia de hasJornadaAuthorization`, `ausencia de sessionActive`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`isSupportLiveUpdatesEnabled`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L63) (llama), [`getCachedSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L123) (llama).
- **Llamadas directas en el cuerpo** [`isSupportLiveUpdatesEnabled`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L19), [`getCachedSupportRuntimeFlags`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L32), [`renderAbandonmentModals`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L356), [`children`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L542).
- **Lo usa** [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L735) (renderiza).

#### [`syncStatus`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L41) · callback React · asíncrona · dentro de [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L17)

Consulta o invoca tabla o vista [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) y coordina las demás operaciones de esta ficha.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setProfile`, `setSessionActive`, `setRequestPending`.
- **Condiciones que evalúa** `ausencia de usuario.id`, `ausencia de profileData`.
- **Contrato de datos** tabla o vista [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) (`select`) en [`SupportGate.jsx:49`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L49), tabla o bucket [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) en [`SupportGate.jsx:49`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L49), tabla o vista [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) (`upsert`) en [`SupportGate.jsx:59`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L59), tabla o vista [`support_agent_sessions`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L371) (`select`) en [`SupportGate.jsx:77`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L77), tabla o bucket [`support_agent_sessions`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L371) en [`SupportGate.jsx:77`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L77).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setProfile`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L43), [`setSessionActive`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L44), [`setRequestPending`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L45), [`maybeSingle`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L49), [`limit`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L49), [`eq`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L49), [`select`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L49), [`supabase.from`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L49), [`upsert`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L59), [`order`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L77), [`is`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L77).
- **Lo usa** [`loadProfile`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L106) (llama), [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L121) (referencia), [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L323) (llama), [`setInterval · callback`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L338) (llama), [`button.onClick`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L378) (llama), [`button.onClick`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L423) (llama), [`button.onClick`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L440) (llama), [`button.onClick`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L476) (llama), [`button.onClick`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L494) (llama).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L88) · callback de infraestructura · dentro de [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L17)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportGate`.

- **Efectos y APIs** `unsubscribe`.
- **Usa código de** [`subscribeSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L208) (llama).
- **Llamadas directas en el cuerpo** [`loadFlags`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L95), [`subscribeSupportRuntimeFlags`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L96), [`unsubscribe`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L99).

#### [`loadFlags`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L90) · función · asíncrona · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L88)

Obtiene o resuelve `Flags` para entregarlo al consumidor.

- **Actualizaciones de estado o acciones** `setRuntimeFlags`.
- **Condiciones que evalúa** `ausencia de active`.
- **Usa código de** [`fetchSupportRuntimeFlags`](../../../packages/support-sdk/src/runtime/supportRuntimeFlags.js#L127) (llama).
- **Llamadas directas en el cuerpo** [`fetchSupportRuntimeFlags`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L91), [`setRuntimeFlags`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L93).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L95) (llama).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L103) · callback de infraestructura · dentro de [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L17)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportGate`.

- **Actualizaciones de estado o acciones** `setLoading`, `setProfile`, `setSessionActive`, `setRequestPending`.
- **Condiciones que evalúa** `usuario.id`.
- **Llamadas directas en el cuerpo** [`loadProfile`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L111), [`setLoading`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L113), [`setProfile`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L114), [`setSessionActive`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L115), [`setRequestPending`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L116).

#### [`loadProfile`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L105) · función · asíncrona · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L103)

Obtiene o resuelve el valor de perfil para entregarlo al consumidor.

- **Actualizaciones de estado o acciones** `setLoading`.
- **Condiciones que evalúa** `ausencia de active`.
- **Llamadas directas en el cuerpo** [`syncStatus`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L106), [`setLoading`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L108).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L111) (llama).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L123) · callback de infraestructura · dentro de [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L17)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportGate`.

- **Actualizaciones de estado o acciones** `clearInterval`.
- **Efectos y APIs** `setInterval`, `clearInterval`.
- **Condiciones que evalúa** `ausencia de profile.authorized_for_work`.
- **Llamadas directas en el cuerpo** [`setInterval`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L125), [`clearInterval`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L130).

#### [`setInterval · callback`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L125) · callback de infraestructura · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L123)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Condiciones que evalúa** `sessionActive`.
- **Usa código de** [`pingSupportSession`](../../../packages/support-sdk/src/supportClient.js#L200) (llama).
- **Llamadas directas en el cuerpo** [`pingSupportSession`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L127).

#### [`resetAbandonmentFlow`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L133) · callback React · dentro de [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L17)

Limpia o restablece `Abandonment Flow` como parte de este flujo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setAbandonmentFlowStep`, `setAbandonmentThreads`, `setAbandonmentSubmitting`.
- **Llamadas directas en el cuerpo** [`setAbandonmentFlowStep`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L134), [`setAbandonmentThreads`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L135), [`setAbandonmentSubmitting`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L136).
- **Lo usa** [`requestEndSession`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L149) (llama), [`closeAbandonmentFlow`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L193) (llama).

#### [`requestEndSession`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L140) · callback React · asíncrona · dentro de [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L17)

Coordina cambios de estado durante `request End Session`.

- **Entradas** `payload = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSessionEndError`, `setSessionActive`, `setAbandonmentThreads`, `setAbandonmentFlowStep`.
- **Condiciones que evalúa** `result.ok`, `result.error`.
- **Usa código de** [`endSupportSession`](../../../packages/support-sdk/src/supportClient.js#L180) (llama).
- **Llamadas directas en el cuerpo** [`setSessionEndError`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L141), [`endSupportSession`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L142), [`setSessionActive`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L148), [`resetAbandonmentFlow`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L149), [`setAbandonmentThreads`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L157), [`setAbandonmentFlowStep`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L158).
- **Lo usa** [`handleEndSession`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L170) (llama), [`handleSendAbandonmentMessage`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L182) (llama).

#### [`handleEndSession`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L168) · callback React · asíncrona · dentro de [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L17)

Maneja `End Session` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setEndLoading`.
- **Llamadas directas en el cuerpo** [`setEndLoading`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L169), [`requestEndSession`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L170).
- **Lo usa** [`button.onClick`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L526) (llama), [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L545) (referencia).

#### [`handleConfirmAbandonment`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L175) · función · dentro de [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L17)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setSessionEndError`, `setAbandonmentFlowStep`.
- **Llamadas directas en el cuerpo** [`setSessionEndError`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L176), [`setAbandonmentFlowStep`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L177).
- **Lo usa** [`renderAbandonmentModals`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L250) (pasa a onClick).

#### [`handleSendAbandonmentMessage`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L180) · función · asíncrona · dentro de [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L17)

Maneja `Send Abandonment Message` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setAbandonmentSubmitting`, `setSessionEndError`.
- **Condiciones que evalúa** `ausencia de result.ok y result.error`.
- **Llamadas directas en el cuerpo** [`setAbandonmentSubmitting`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L181), [`requestEndSession`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L182), [`setSessionEndError`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L188).
- **Lo usa** [`button.onClick`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L291) (llama).

#### [`closeAbandonmentFlow`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L192) · función · dentro de [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L17)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setSessionEndError`.
- **Llamadas directas en el cuerpo** [`resetAbandonmentFlow`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L193), [`setSessionEndError`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L194).
- **Lo usa** [`renderAbandonmentModals`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L243) (pasa a onClick).

#### [`renderAbandonmentModals`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L197) · función · dentro de [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L17)

Prepara contenido JSX usando `AlertTriangle`, `button`.

- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Interfaz que monta** `AlertTriangle`, `button`.
- **Condiciones que evalúa** `abandonmentFlowStep`.
- **Llamadas directas en el cuerpo** [`abandonmentThreads.map`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L220).
- **Lo usa** [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L356) (llama).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L290) · callback JSX · dentro de [`renderAbandonmentModals`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L197)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleSendAbandonmentMessage`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L291).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L308) · callback de infraestructura · dentro de [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L17)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportGate`.

- **Efectos y APIs** `subscribe`, `supabase.channel`.
- **Condiciones que evalúa** `ausencia de liveUpdatesEnabled`, `ausencia de usuario.id`.
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`subscribe`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L312), [`on`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L312), [`supabase.channel`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L312), [`syncStatus`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L323), [`supabase.removeChannel`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L329).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L333) · callback de infraestructura · dentro de [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L17)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportGate`.

- **Actualizaciones de estado o acciones** `clearInterval`.
- **Efectos y APIs** `globalThis.setInterval`, `globalThis.clearInterval`.
- **Condiciones que evalúa** `ausencia de liveUpdatesEnabled`, `ausencia de usuario.id o sessionActive`, `ausencia de requestPending y ausencia de profile.authorized_for_work`.
- **Llamadas directas en el cuerpo** [`globalThis.setInterval`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L337), [`globalThis.clearInterval`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L341).

#### [`setInterval · callback`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L337) · callback de infraestructura · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L333)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Llamadas directas en el cuerpo** [`syncStatus`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L338).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L376) · callback JSX · asíncrona · dentro de [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L17)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setRefreshing`.
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L377), [`syncStatus`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L378).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L417) · callback JSX · asíncrona · dentro de [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L17)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setStartLoading`, `setRequestPending`, `setSessionActive`.
- **Condiciones que evalúa** `result.ok y result.data.pending`, `result.ok`.
- **Usa código de** [`startSupportSession`](../../../packages/support-sdk/src/supportClient.js#L169) (llama).
- **Llamadas directas en el cuerpo** [`setStartLoading`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L418), [`startSupportSession`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L419), [`setRequestPending`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L422), [`syncStatus`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L423), [`setSessionActive`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L425).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L438) · callback JSX · asíncrona · dentro de [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L17)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setRefreshing`.
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L439), [`syncStatus`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L440).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L474) · callback JSX · asíncrona · dentro de [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L17)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setRefreshing`.
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L475), [`syncStatus`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L476).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L488) · callback JSX · asíncrona · dentro de [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L17)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setStartLoading`, `setRequestPending`, `setSessionActive`.
- **Condiciones que evalúa** `result.ok y result.data.pending`, `result.ok`.
- **Usa código de** [`startSupportSession`](../../../packages/support-sdk/src/supportClient.js#L169) (llama).
- **Llamadas directas en el cuerpo** [`setStartLoading`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L489), [`startSupportSession`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L490), [`setRequestPending`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L493), [`syncStatus`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L494), [`setSessionActive`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L496).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L525) · callback JSX · dentro de [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L17)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleEndSession`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L526).

### [`packages/support-sdk/src/agent/SupportInbox.jsx`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L1)

Lista, filtra y actualiza tickets. Su configuración permite reutilizar el inbox en superficies de administración.

**Superficie que exporta.** [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L116).

**Módulos que lo cargan.** [`AdminSupportDesk.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L3) (importa), [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L20) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, `lucide-react`, [`../../lib/supabaseClient`](../../../packages/support-sdk/lib/supabaseClient.js), [`../../store/appStore`](../../../packages/support-sdk/store/appStore.js), [`./SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx), [`./SupportDevDebugBanner`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx), [`../supportClient`](../../../packages/support-sdk/src/supportClient.js), [`../runtime/systemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js).

#### [`INBOX_GROUPS`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L17) · variable de módulo

Conserva la lista de `INBOX GROUPS` usada por el módulo.

- **Lo usa** [`renderContent`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L546) (accede al módulo).

#### [`normalizeThreadRow`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L23) · función

Normaliza `Thread Row` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `thread`.
- **Retorno visible o tipo declarado** `request_origin`, `origin_source`, `app_channel`, `contact_display`, `anon_public_id`, `personal_queue`, `assigned_at`, `released_to_general_at`, `retake_requested_at`, `handoff_required`, `handoff_reason`, `handoff_at`, `handoff_message_confirmed_at`, `updated_at`.
- **Lo usa** [`loadInboxRows`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L78) (referencia).

#### [`computeTicketTimer`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L43) · función

Implementa `compute Ticket Timer` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `thread`, `nowMs`.
- **Retorno visible o tipo declarado** `expired`, `paused`, `progress`, `color`.
- **Condiciones que evalúa** `ausencia de Number.isFinite`, `elapsedMs`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L51), [`trim`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L51).
- **Lo usa** [`renderContent`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L571) (llama).

#### [`loadInboxRows`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L62) · función · asíncrona

Consulta o invoca tabla o vista [`support_threads_inbox`](../../../apps/referidos-app/supabase/migrations/20260327_000046_support_handoff_abandonment.sql#L138) y coordina las demás operaciones de esta ficha.

- **Entradas** `{isAdmin, usuarioId}`.
- **Condiciones que evalúa** `ausencia de isAdmin`, `ausencia de inboxResult.error`, `ausencia de legacyResult.error`.
- **Contrato de datos** tabla o vista [`support_threads_inbox`](../../../apps/referidos-app/supabase/migrations/20260327_000046_support_handoff_abandonment.sql#L138) (`select`) en [`SupportInbox.jsx:63`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L63), tabla o bucket [`support_threads_inbox`](../../../apps/referidos-app/supabase/migrations/20260327_000046_support_handoff_abandonment.sql#L138) en [`SupportInbox.jsx:63`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L63), tabla o vista [`support_threads`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L251) (`select`) en [`SupportInbox.jsx:81`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L81), tabla o bucket [`support_threads`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L251) en [`SupportInbox.jsx:81`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L81).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`order`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L63), [`select`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L63), [`supabase.from`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L63), [`inboxQuery.or`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L71), [`map`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L78), [`legacyQuery.or`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L89), [`legacyCompatQuery.or`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L107).
- **Lo usa** [`loadThreads`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L183) (llama).

#### [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L116) · componente React · exportación por defecto

Monta `SupportDevDebugBanner`, `SupportGate`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{isAdmin, basePath}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `[threads, setThreads] mediante useState`, `[loading, setLoading] mediante useState`, `[activeGroup, setActiveGroup] mediante useState`, `[sessionActive, setSessionActive] mediante useState`, `[sessionError, setSessionError] mediante useState`, `[sessionLoading, setSessionLoading] mediante useState`, `[refreshNonce, setRefreshNonce] mediante useState`, `[nowMs, setNowMs] mediante useState`, `[adminAssignModeResolved, setAdminAssignModeResolved] mediante useState`, `[adminAssignModeSaving, setAdminAssignModeSaving] mediante useState`, `[assignModePrompt, setAssignModePrompt] mediante useState`, `syncInFlightRef mediante useRef`.
- **Interfaz que monta** `SupportDevDebugBanner`, `SupportGate`.
- **Hooks que llama** `useAppStore`, `useNavigate`, `useState`, `useRef`, `useEffect`.
- **Condiciones que evalúa** `isAdmin`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`isSupportLiveUpdatesEnabled`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L63) (llama), [`SupportDevDebugBanner`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L12) (renderiza), [`SupportGate`](../../../packages/support-sdk/src/agent/SupportGate.jsx#L17) (renderiza).
- **Llamadas directas en el cuerpo** [`isSupportLiveUpdatesEnabled`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L118), [`renderContent`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L733).
- **Lo usa** [`AdminSupportDesk`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L114) (renderiza), [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L453) (renderiza).

#### [`formatDateTime`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L139) · función · dentro de [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L116)

Formatea `Date Time` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`toLocaleString`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L140).
- **Lo usa** [`renderContent`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L650) (llama).

#### [`formatAppChannelBadge`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L144) · función · dentro de [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L116)

Formatea `App Channel Badge` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `includes`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L145), [`trim`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L145), [`includes`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L146).
- **Lo usa** [`renderContent`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L633) (llama).

#### [`refreshSessionState`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L161) · callback React · asíncrona · dentro de [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L116)

Consulta o invoca tabla o vista [`support_agent_sessions`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L371) y coordina las demás operaciones de esta ficha.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSessionActive`.
- **Condiciones que evalúa** `ausencia de isAdmin`, `ausencia de usuario.id`.
- **Contrato de datos** tabla o vista [`support_agent_sessions`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L371) (`select`) en [`SupportInbox.jsx:167`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L167), tabla o bucket [`support_agent_sessions`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L371) en [`SupportInbox.jsx:167`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L167).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setSessionActive`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L163), [`maybeSingle`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L167), [`limit`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L167), [`order`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L167), [`is`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L167), [`eq`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L167), [`select`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L167), [`supabase.from`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L167).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L268) (llama), [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L276) (referencia), [`handleRefresh`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L475) (llama).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L178) · callback de infraestructura · dentro de [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L116)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportInbox`.

- **Llamadas directas en el cuerpo** [`loadThreads`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L188).

#### [`loadThreads`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L180) · función · asíncrona · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L178)

Obtiene o resuelve `Threads` para entregarlo al consumidor.

- **Actualizaciones de estado o acciones** `setLoading`, `setThreads`.
- **Condiciones que evalúa** `ausencia de usuario`, `ausencia de active`.
- **Llamadas directas en el cuerpo** [`setLoading`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L182), [`loadInboxRows`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L183), [`setThreads`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L185).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L188) (llama).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L194) · callback de infraestructura · dentro de [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L116)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportInbox`.

- **Llamadas directas en el cuerpo** [`loadSession`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L217).

#### [`loadSession`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L196) · función · asíncrona · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L194)

Consulta o invoca tabla o vista [`support_agent_sessions`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L371) y coordina las demás operaciones de esta ficha.

- **Actualizaciones de estado o acciones** `setSessionActive`, `setSessionLoading`.
- **Condiciones que evalúa** `ausencia de isAdmin`, `ausencia de active`, `ausencia de usuario.id`.
- **Contrato de datos** tabla o vista [`support_agent_sessions`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L371) (`select`) en [`SupportInbox.jsx:205`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L205), tabla o bucket [`support_agent_sessions`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L371) en [`SupportInbox.jsx:205`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L205).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setSessionActive`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L199), [`setSessionLoading`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L200), [`maybeSingle`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L205), [`limit`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L205), [`order`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L205), [`is`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L205), [`eq`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L205), [`select`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L205), [`supabase.from`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L205).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L217) (llama).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L223) · callback de infraestructura · dentro de [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L116)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportInbox`.

- **Actualizaciones de estado o acciones** `clearInterval`.
- **Efectos y APIs** `globalThis.setInterval`, `globalThis.clearInterval`.
- **Llamadas directas en el cuerpo** [`globalThis.setInterval`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L224), [`globalThis.clearInterval`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L228).

#### [`setInterval · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L224) · callback de infraestructura · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L223)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setNowMs`.
- **Llamadas directas en el cuerpo** [`setNowMs`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L225).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L232) · callback de infraestructura · dentro de [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L116)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportInbox`.

- **Llamadas directas en el cuerpo** [`loadAutoAssignModeState`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L247).

#### [`loadAutoAssignModeState`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L234) · función · asíncrona · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L232)

Consulta o invoca tabla o vista [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) y coordina las demás operaciones de esta ficha.

- **Actualizaciones de estado o acciones** `setAdminAssignModeResolved`.
- **Condiciones que evalúa** `ausencia de isAdmin o ausencia de usuario.id`, `ausencia de active`.
- **Contrato de datos** tabla o vista [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) (`select`) en [`SupportInbox.jsx:239`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L239), tabla o bucket [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) en [`SupportInbox.jsx:239`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L239).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setAdminAssignModeResolved`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L236), [`maybeSingle`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L239), [`eq`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L239), [`select`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L239), [`supabase.from`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L239).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L247) (llama).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L253) · callback de infraestructura · dentro de [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L116)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportInbox`.

- **Efectos y APIs** `subscribe`, `supabase.channel`.
- **Condiciones que evalúa** `ausencia de liveUpdatesEnabled`, `ausencia de usuario.id`.
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`subscribe`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L257), [`on`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L257), [`supabase.channel`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L257), [`refreshSessionState`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L268), [`supabase.removeChannel`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L274).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L278) · callback de infraestructura · dentro de [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L116)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportInbox`.

- **Efectos y APIs** `window.addEventListener`, `window.removeEventListener`.
- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`window.addEventListener`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L283), [`window.removeEventListener`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L285).

#### [`handleTicketAssigned`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L280) · función · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L278)

Maneja `Ticket Assigned` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setRefreshNonce`.
- **Llamadas directas en el cuerpo** [`setRefreshNonce`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L281).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L283) (referencia).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L289) · callback de infraestructura · dentro de [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L116)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportInbox`.

- **Actualizaciones de estado o acciones** `clearInterval`.
- **Efectos y APIs** `globalThis.setInterval`, `document.addEventListener`, `globalThis.clearInterval`, `document.removeEventListener`.
- **Condiciones que evalúa** `ausencia de liveUpdatesEnabled`, `ausencia de usuario.id`, `ausencia de includes`, `undefined`.
- **Llamadas directas en el cuerpo** [`includes`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L292), [`runHotSync`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L330), [`globalThis.setInterval`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L332), [`document.addEventListener`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L343), [`globalThis.clearInterval`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L348), [`document.removeEventListener`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L350).

#### [`runHotSync`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L297) · función · asíncrona · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L289)

Consulta o invoca Edge [`ops-telemetry-sync-dispatch`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts) y coordina las demás operaciones de esta ficha.

- **Entradas** `force = valor por defecto`.
- **Condiciones que evalúa** `disposed o syncInFlightRef.current`, `ausencia de force y undefined y document.visibilityState`.
- **Contrato de datos** Edge [`ops-telemetry-sync-dispatch`](../../../apps/referidos-app/supabase/functions/ops-telemetry-sync-dispatch/index.ts) en [`SupportInbox.jsx:310`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L310), Edge [`ops-support-macros-sync-dispatch`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts) en [`SupportInbox.jsx:316`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L316).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L310).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L330) (llama), [`setInterval · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L333) (llama), [`handleVisibility`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L338) (llama).

#### [`setInterval · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L332) · callback de infraestructura · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L289)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Llamadas directas en el cuerpo** [`runHotSync`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L333).

#### [`handleVisibility`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L336) · función · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L289)

Maneja `Visibility` y coordina las acciones indicadas abajo.

- **Condiciones que evalúa** `document.visibilityState`.
- **Llamadas directas en el cuerpo** [`runHotSync`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L338).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L343) (referencia).

#### [`filtered`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L356) · cálculo memorizado · dentro de [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L116)

Procesa `ed` según el criterio del módulo.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `activeGroup`, `includes`, `thread.status y ausencia de isUnassigned`.
- **Llamadas directas en el cuerpo** [`threads.filter`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L360), [`isUnassigned`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L363), [`includes`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L369), [`isMine`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L370).
- **Lo usa** [`renderContent`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L565) (accede al módulo).

#### [`isMine`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L357) · función · dentro de [`filtered`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L356)

Comprueba `Mine` para decidir si se admite o continúa la operación.

- **Entradas** `thread`.
- **Lo usa** [`filtered`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L370) (llama).

#### [`isUnassigned`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L358) · función · dentro de [`filtered`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L356)

Comprueba `Unassigned` para decidir si se admite o continúa la operación.

- **Entradas** `thread`.
- **Lo usa** [`filtered`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L363) (llama).

#### [`hasActive`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L388) · cálculo memorizado · dentro de [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L116)

Comprueba `Active` para decidir si se admite o continúa la operación.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de usuario`.
- **Llamadas directas en el cuerpo** [`threads.some`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L390), [`includes`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L393).
- **Lo usa** [`handleAssign`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L445) (referencia).

#### [`ensureSession`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L397) · función · asíncrona · dentro de [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L116)

Coordina cambios de estado durante `ensure Session`.

- **Retorno visible o tipo declarado** `booleano`.
- **Actualizaciones de estado o acciones** `setSessionError`, `setSessionActive`.
- **Condiciones que evalúa** `sessionActive`, `ausencia de isAdmin`, `ausencia de result.ok`.
- **Usa código de** [`startAdminSupportSession`](../../../packages/support-sdk/src/supportClient.js#L211) (llama).
- **Llamadas directas en el cuerpo** [`setSessionError`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L400), [`startAdminSupportSession`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L404), [`setSessionActive`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L409).
- **Lo usa** [`assignThreadNow`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L414) (llama).

#### [`assignThreadNow`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L413) · función · asíncrona · dentro de [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L116)

Coordina cambios de estado durante `assign Thread Now`.

- **Entradas** `publicId`.
- **Actualizaciones de estado o acciones** `setSessionError`, `setThreads`, `setRefreshNonce`.
- **Condiciones que evalúa** `ausencia de ok`, `ausencia de result.ok`.
- **Usa código de** [`assignSupportThread`](../../../packages/support-sdk/src/supportClient.js#L55) (llama).
- **Llamadas directas en el cuerpo** [`ensureSession`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L414), [`assignSupportThread`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L416), [`setSessionError`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L418), [`setThreads`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L429), [`prev.map`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L430), [`setRefreshNonce`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L441).
- **Lo usa** [`handleAssign`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L452) (llama), [`handleSelectAdminAssignMode`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L468) (llama).

#### [`handleAssign`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L444) · función · asíncrona · dentro de [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L116)

Maneja `Assign` y coordina las acciones indicadas abajo.

- **Entradas** `publicId`.
- **Actualizaciones de estado o acciones** `setAssignModePrompt`.
- **Condiciones que evalúa** `isAdmin y ausencia de hasActive y ausencia de adminAssignModeResolved`.
- **Llamadas directas en el cuerpo** [`setAssignModePrompt`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L446), [`assignThreadNow`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L452).
- **Lo usa** [`button.onClick`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L677) (llama).

#### [`handleSelectAdminAssignMode`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L455) · función · asíncrona · dentro de [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L116)

Maneja `Select Admin Assign Mode` y coordina las acciones indicadas abajo.

- **Entradas** `mode`.
- **Actualizaciones de estado o acciones** `setAdminAssignModeSaving`, `setSessionError`, `setSupportAutoAssignMode`, `setAdminAssignModeResolved`, `setAssignModePrompt`.
- **Condiciones que evalúa** `ausencia de assignModePrompt.threadPublicId`, `ausencia de result.ok`.
- **Usa código de** [`setSupportAutoAssignMode`](../../../packages/support-sdk/src/supportClient.js#L120) (llama).
- **Llamadas directas en el cuerpo** [`setAdminAssignModeSaving`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L457), [`setSessionError`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L458), [`setSupportAutoAssignMode`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L459), [`setAdminAssignModeResolved`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L465), [`setAssignModePrompt`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L467), [`assignThreadNow`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L468).
- **Lo usa** [`button.onClick`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L709) (llama), [`button.onClick`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L719) (llama).

#### [`handleRefresh`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L471) · callback React · asíncrona · dentro de [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L116)

Maneja `Refresh` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshNonce`, `setSessionLoading`.
- **Condiciones que evalúa** `isAdmin`.
- **Usa código de** [`pingAdminSupportSession`](../../../packages/support-sdk/src/supportClient.js#L233) (llama), [`pingSupportSession`](../../../packages/support-sdk/src/supportClient.js#L200) (llama).
- **Llamadas directas en el cuerpo** [`setRefreshNonce`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L472), [`setSessionLoading`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L473), [`refreshSessionState`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L475), [`pingAdminSupportSession`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L477), [`pingSupportSession`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L479).
- **Lo usa** [`button.onClick`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L523) (llama).

#### [`renderContent`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L486) · función · dentro de [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L116)

Prepara contenido JSX usando `button`, `RefreshCw`.

- **Entradas** `{gateSessionActive, gateEndLoading, handleGateEndSession} = valor por defecto`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `RefreshCw`.
- **Efectos y APIs** `replace`.
- **Llamadas directas en el cuerpo** [`INBOX_GROUPS.map`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L546), [`filtered.map`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L570), [`computeTicketTimer`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L571), [`replace`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L578), [`ch.toUpperCase`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L580), [`formatAppChannelBadge`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L633), [`formatDateTime`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L650).
- **Lo usa** [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L733) (llama).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L507) · callback JSX · dentro de [`renderContent`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L486)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleGateEndSession`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L508).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L522) · callback JSX · dentro de [`renderContent`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L486)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleRefresh`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L523).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L550) · callback JSX · dentro de [`renderContent`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L486)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setActiveGroup`.
- **Llamadas directas en el cuerpo** [`setActiveGroup`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L550).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L665) · callback JSX · dentro de [`renderContent`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L486)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigate`.
- **Llamadas directas en el cuerpo** [`navigate`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L666).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L676) · callback JSX · dentro de [`renderContent`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L486)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleAssign`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L677).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L708) · callback JSX · dentro de [`renderContent`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L486)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleSelectAdminAssignMode`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L709).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L718) · callback JSX · dentro de [`renderContent`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L486)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleSelectAdminAssignMode`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L719).

### [`packages/support-sdk/src/agent/SupportInicio.jsx`](../../../packages/support-sdk/src/agent/SupportInicio.jsx#L1)

Entrada del rol de soporte con el estado de disponibilidad y sus accesos.

**Superficie que exporta.** [`SupportInicio`](../../../packages/support-sdk/src/agent/SupportInicio.jsx#L25).

**Módulos que lo cargan.** [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L19) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`MOCK_CARDS`](../../../packages/support-sdk/src/agent/SupportInicio.jsx#L4) · variable de módulo

Conserva la lista de `MOCK CARDS` usada por el módulo.

- **Lo usa** [`SupportInicio`](../../../packages/support-sdk/src/agent/SupportInicio.jsx#L43) (accede al módulo).

#### [`SupportInicio`](../../../packages/support-sdk/src/agent/SupportInicio.jsx#L25) · componente React · exportación por defecto

Monta `Sparkles`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Sparkles`.
- **Llamadas directas en el cuerpo** [`MOCK_CARDS.map`](../../../packages/support-sdk/src/agent/SupportInicio.jsx#L43).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L452) (renderiza).

### [`packages/support-sdk/src/agent/SupportIrregular.jsx`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L1)

Flujo de captura de un caso irregular iniciado por el agente.

**Superficie que exporta.** [`SupportIrregular`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L8).

**Módulos que lo cargan.** [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L22) (importa).

**Dependencias del archivo.** `react`, [`../supportClient`](../../../packages/support-sdk/src/supportClient.js), [`../data/supportCatalog`](../../../packages/support-sdk/src/data/supportCatalog.js).

#### [`SupportIrregular`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L8) · componente React · exportación por defecto

Monta `input`, `select`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[userPublicId, setUserPublicId] mediante useState`, `[summary, setSummary] mediante useState`, `[category, setCategory] mediante useState`, `[appChannel, setAppChannel] mediante useState`, `[status, setStatus] mediante useState`, `[catalogCategories, setCatalogCategories] mediante useState`.
- **Interfaz que monta** `input`, `select`, `button`.
- **Hooks que llama** `useState`, `useEffect`.
- **Llamadas directas en el cuerpo** [`categories.map`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L117).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L459) (renderiza).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L16) · callback de infraestructura · dentro de [`SupportIrregular`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L8)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportIrregular`.

- **Llamadas directas en el cuerpo** [`loadCatalog`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L23).

#### [`loadCatalog`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L18) · función · asíncrona · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L16)

Obtiene o resuelve `Catalog` para entregarlo al consumidor.

- **Actualizaciones de estado o acciones** `setCatalogCategories`.
- **Condiciones que evalúa** `ausencia de active`.
- **Usa código de** [`loadSupportCatalogFromCache`](../../../packages/support-sdk/src/data/supportCatalog.js#L163) (llama).
- **Llamadas directas en el cuerpo** [`loadSupportCatalogFromCache`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L19), [`setCatalogCategories`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L21).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L23) (llama).

#### [`categories`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L29) · cálculo memorizado · dentro de [`SupportIrregular`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L8)

Función auxiliar de `SupportIrregular` para `categories`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`map`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L30), [`catalogCategories.filter`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L30), [`targets.includes`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L33).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L43) (accede al módulo), [`SupportIrregular`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L47) (referencia), [`handleCreate`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L50) (accede al módulo).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L42) · callback de infraestructura · dentro de [`SupportIrregular`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L8)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportIrregular`.

- **Actualizaciones de estado o acciones** `setCategory`.
- **Condiciones que evalúa** `ausencia de categories.length`, `ausencia de categories.some`.
- **Llamadas directas en el cuerpo** [`categories.some`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L44), [`setCategory`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L45).

#### [`handleCreate`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L49) · función · asíncrona · dentro de [`SupportIrregular`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L8)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setStatus`, `setUserPublicId`, `setSummary`.
- **Condiciones que evalúa** `ausencia de categories.length`, `result.ok`.
- **Usa código de** [`createIrregularThread`](../../../packages/support-sdk/src/supportClient.js#L156) (llama).
- **Llamadas directas en el cuerpo** [`setStatus`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L51), [`createIrregularThread`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L55), [`userPublicId.trim`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L56), [`summary.trim`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L57), [`setUserPublicId`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L64), [`setSummary`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L65).
- **Lo usa** [`SupportIrregular`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L134) (pasa a onClick).

#### [`input.onChange`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L91) · callback JSX · dentro de [`SupportIrregular`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L8)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setUserPublicId`.
- **Llamadas directas en el cuerpo** [`setUserPublicId`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L91).

#### [`select.onChange`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L100) · callback JSX · dentro de [`SupportIrregular`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L8)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setAppChannel`.
- **Usa código de** [`normalizeSupportAppKey`](../../../packages/support-sdk/src/data/supportCatalog.js#L151) (llama).
- **Llamadas directas en el cuerpo** [`setAppChannel`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L101), [`normalizeSupportAppKey`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L101).

#### [`select.onChange`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L114) · callback JSX · dentro de [`SupportIrregular`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L8)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setCategory`.
- **Llamadas directas en el cuerpo** [`setCategory`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L114).

#### [`input.onChange`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L128) · callback JSX · dentro de [`SupportIrregular`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L8)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setSummary`.
- **Llamadas directas en el cuerpo** [`setSummary`](../../../packages/support-sdk/src/agent/SupportIrregular.jsx#L128).

### [`packages/support-sdk/src/agent/SupportIssues.jsx`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L1)

Consulta incidencias de observabilidad relacionadas con el trabajo de soporte.

**Superficie que exporta.** [`SupportIssues`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L24).

**Módulos que lo cargan.** [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L24) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../lib/supabaseClient`](../../../packages/support-sdk/lib/supabaseClient.js).

#### [`LEVEL_BADGE`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L5) · variable de módulo

Agrupa la configuración o catálogo de `LEVEL BADGE` para que sus consumidores lean claves comunes.

- **Campos o contexto** `fatal`, `error`, `warn`, `info`, `debug`.
- **Lo usa** [`levelBadgeClass`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L14) (accede al módulo).

#### [`levelBadgeClass`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L13) · función

Implementa `level Badge Class` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `level`.
- **Lo usa** [`SupportIssues`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L198) (llama).

#### [`formatDate`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L17) · función

Formatea el valor de fecha para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de value`, `Number.isNaN`.
- **Llamadas directas en el cuerpo** [`date.getTime`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L20), [`date.toLocaleString`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L21).
- **Lo usa** [`SupportIssues`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L211) (llama).

#### [`SupportIssues`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L24) · componente React · exportación por defecto

Monta `Search`, `input`, `button`, `RefreshCw`, `AlertCircle`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[issues, setIssues] mediante useState`, `[events, setEvents] mediante useState`, `[loading, setLoading] mediante useState`, `[error, setError] mediante useState`, `[query, setQuery] mediante useState`, `[selectedIssueId, setSelectedIssueId] mediante useState`.
- **Interfaz que monta** `Search`, `input`, `button`, `RefreshCw`, `AlertCircle`.
- **Hooks que llama** `useState`, `useEffect`.
- **Llamadas directas en el cuerpo** [`filteredIssues.map`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L185), [`levelBadgeClass`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L198), [`formatDate`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L211), [`filteredEvents.map`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L232).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L455) (renderiza).

#### [`loadData`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L32) · callback React · asíncrona · dentro de [`SupportIssues`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L24)

Consulta o invoca tabla o vista [`obs_issues_context`](../../../apps/referidos-app/supabase/migrations/20260318_000037_support_ticket_obs_context_and_obs_identity_views.sql#L77) y coordina las demás operaciones de esta ficha.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`, `setIssues`, `setEvents`, `setLoading`.
- **Condiciones que evalúa** `issuesRes.error o eventsRes.error`.
- **Contrato de datos** tabla o vista [`obs_issues_context`](../../../apps/referidos-app/supabase/migrations/20260318_000037_support_ticket_obs_context_and_obs_identity_views.sql#L77) (`select`) en [`SupportIssues.jsx:35`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L35), tabla o bucket [`obs_issues_context`](../../../apps/referidos-app/supabase/migrations/20260318_000037_support_ticket_obs_context_and_obs_identity_views.sql#L77) en [`SupportIssues.jsx:35`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L35), tabla o vista [`obs_events_context`](../../../apps/referidos-app/supabase/migrations/20260318_000037_support_ticket_obs_context_and_obs_identity_views.sql#L53) (`select`) en [`SupportIssues.jsx:42`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L42), tabla o bucket [`obs_events_context`](../../../apps/referidos-app/supabase/migrations/20260318_000037_support_ticket_obs_context_and_obs_identity_views.sql#L53) en [`SupportIssues.jsx:42`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L42).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setError`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L33), [`limit`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L35), [`order`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L35), [`select`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L35), [`supabase.from`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L35), [`setIssues`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L57), [`setEvents`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L58), [`setLoading`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L59).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L70) (llama), [`SupportIssues`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L71) (referencia), [`button.onClick`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L144) (llama).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L68) · callback de infraestructura · dentro de [`SupportIssues`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L24)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportIssues`.

- **Actualizaciones de estado o acciones** `setLoading`.
- **Llamadas directas en el cuerpo** [`setLoading`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L69), [`loadData`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L70).

#### [`issueMap`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L74) · cálculo memorizado · dentro de [`SupportIssues`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L24)

Comprueba `sue Map` para decidir si se admite o continúa la operación.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`issues.reduce`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L75).
- **Lo usa** [`SupportIssues`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L250) (accede al módulo).

#### [`filteredIssues`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L82) · cálculo memorizado · dentro de [`SupportIssues`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L24)

Procesa `ed Issues` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de term`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L83), [`query.trim`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L83), [`issues.filter`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L85), [`join`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L86), [`filter`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L86), [`haystack.includes`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L98).
- **Lo usa** [`SupportIssues`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L165) (accede al módulo).

#### [`filteredEvents`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L102) · cálculo memorizado · dentro de [`SupportIssues`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L24)

Procesa `ed Events` según el criterio del módulo.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `selectedIssueId y event.issue_id`, `ausencia de term`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L103), [`query.trim`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L103), [`events.filter`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L104), [`join`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L107), [`filter`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L107), [`haystack.includes`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L121).
- **Lo usa** [`SupportIssues`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L222) (accede al módulo).

#### [`input.onChange`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L135) · callback JSX · dentro de [`SupportIssues`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L24)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setQuery`.
- **Llamadas directas en el cuerpo** [`setQuery`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L135).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L142) · callback JSX · dentro de [`SupportIssues`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L24)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setLoading`.
- **Llamadas directas en el cuerpo** [`setLoading`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L143), [`loadData`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L144).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L170) · callback JSX · dentro de [`SupportIssues`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L24)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSelectedIssueId`.
- **Llamadas directas en el cuerpo** [`setSelectedIssueId`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L170).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L189) · callback JSX · dentro de [`SupportIssues`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L24)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSelectedIssueId`.
- **Llamadas directas en el cuerpo** [`setSelectedIssueId`](../../../packages/support-sdk/src/agent/SupportIssues.jsx#L189).

### [`packages/support-sdk/src/agent/SupportJornadas.jsx`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L1)

Muestra el estado e historial de jornadas/sesiones y expone las acciones correspondientes.

**Superficie que exporta.** [`SupportJornadas`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L49).

**Módulos que lo cargan.** [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L23) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../lib/supabaseClient`](../../../packages/support-sdk/lib/supabaseClient.js), [`../../store/appStore`](../../../packages/support-sdk/store/appStore.js).

#### [`formatDateTime`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L6) · función

Formatea `Date Time` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de value`, `Number.isNaN`.
- **Llamadas directas en el cuerpo** [`date.getTime`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L9), [`date.toLocaleString`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L10).
- **Lo usa** [`loadHistory`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L134) (llama), [`SupportJornadas`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L306) (llama).

#### [`classifyStatusByWindow`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L13) · función

Implementa `classify Status By Window` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `startAt`, `endAt`.
- **Condiciones que evalúa** `start y ausencia de Number.isNaN y now`, `end y ausencia de Number.isNaN y now`.
- **Llamadas directas en el cuerpo** [`start.getTime`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L18), [`end.getTime`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L21).
- **Lo usa** [`loadHistory`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L126) (llama).

#### [`statusBadgeClass`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L27) · función

Implementa `status Badge Class` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `status`.
- **Condiciones que evalúa** `status`.
- **Lo usa** [`SupportJornadas`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L298) (llama).

#### [`eventTitle`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L33) · función

Implementa `event Title` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `eventType`.
- **Condiciones que evalúa** `eventType`.
- **Lo usa** [`loadHistory`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L151) (llama).

#### [`actorLabel`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L41) · función

Implementa `actor Label` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `actorId`, `usersById`.
- **Condiciones que evalúa** `ausencia de actorId`, `ausencia de row`.
- **Llamadas directas en el cuerpo** [`trim`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L45), [`join`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L45), [`filter`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L45).
- **Lo usa** [`loadHistory`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L141) (llama).

#### [`SupportJornadas`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L49) · componente React · exportación por defecto

Monta `CalendarClock`, `button`, `RefreshCw`, `ShieldCheck`, `ShieldX`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `[rows, setRows] mediante useState`, `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[error, setError] mediante useState`.
- **Interfaz que monta** `CalendarClock`, `button`, `RefreshCw`, `ShieldCheck`, `ShieldX`.
- **Hooks que llama** `useAppStore`, `useState`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama).
- **Llamadas directas en el cuerpo** [`rows.map`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L291), [`statusBadgeClass`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L298), [`formatDateTime`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L306), [`row.metadata.map`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L320).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L454) (renderiza).

#### [`loadHistory`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L56) · callback React · asíncrona · dentro de [`SupportJornadas`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L49)

Consulta o invoca tabla o vista [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) y coordina las demás operaciones de esta ficha.

- **Retorno visible o tipo declarado** `id`, `type`, `status`, `occurred_at`, `title`, `subtitle`, `metadata`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRows`, `setLoading`, `setError`.
- **Efectos y APIs** `profileRows.push`.
- **Condiciones que evalúa** `ausencia de usuario.id`, `profileRes.error o sessionsRes.error o eventsRes.error`, `actorIds.length`, `profile.session_request_status`, `profile.authorized_for_work`, `profile.authorized_until`.
- **Contrato de datos** tabla o vista [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) (`select`) en [`SupportJornadas.jsx:65`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L65), tabla o bucket [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) en [`SupportJornadas.jsx:65`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L65), tabla o vista [`support_agent_sessions`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L371) (`select`) en [`SupportJornadas.jsx:72`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L72), tabla o bucket [`support_agent_sessions`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L371) en [`SupportJornadas.jsx:72`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L72), tabla o vista [`support_agent_events`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L384) (`select`) en [`SupportJornadas.jsx:78`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L78), tabla o bucket [`support_agent_events`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L384) en [`SupportJornadas.jsx:78`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L78), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`SupportJornadas.jsx:114`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L114), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`SupportJornadas.jsx:114`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L114).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setRows`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L58), [`setLoading`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L59), [`setError`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L63), [`maybeSingle`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L65), [`eq`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L65), [`select`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L65), [`supabase.from`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L65), [`limit`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L72), [`order`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L72), [`in`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L78), [`map`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L105), [`filter`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L106) y 10 más.
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L216) (llama), [`SupportJornadas`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L217) (referencia), [`onRefresh`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L229) (llama).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L214) · callback de infraestructura · dentro de [`SupportJornadas`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L49)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportJornadas`.

- **Actualizaciones de estado o acciones** `setLoading`.
- **Llamadas directas en el cuerpo** [`setLoading`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L215), [`loadHistory`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L216).

#### [`groupedCount`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L219) · cálculo memorizado · dentro de [`SupportJornadas`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L49)

Procesa `ed Count` según el criterio del módulo.

- **Retorno visible o tipo declarado** `actual`, `futura`, `pasada`.
- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`rows.filter`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L221).
- **Lo usa** [`SupportJornadas`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L264) (accede al módulo).

#### [`onRefresh`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L227) · función · asíncrona · dentro de [`SupportJornadas`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L49)

Maneja `Refresh` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setRefreshing`.
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L228), [`loadHistory`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L229).
- **Lo usa** [`button.onClick`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L251) (llama).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L250) · callback JSX · dentro de [`SupportJornadas`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L49)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onRefresh`](../../../packages/support-sdk/src/agent/SupportJornadas.jsx#L251).
