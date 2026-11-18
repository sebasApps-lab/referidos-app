# Paquetes compartidos · support-sdk · 2 de 3

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`packages/support-sdk/src/agent/SupportLayout.jsx`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L1)
- [`packages/support-sdk/src/agent/SupportSidebar.jsx`](../../../packages/support-sdk/src/agent/SupportSidebar.jsx#L1)
- [`packages/support-sdk/src/agent/SupportTicket.jsx`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1)
- [`packages/support-sdk/src/agent/SupportTopbar.jsx`](../../../packages/support-sdk/src/agent/SupportTopbar.jsx#L1)

## Símbolos y conexiones

### [`packages/support-sdk/src/agent/SupportLayout.jsx`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L1)

Armazón de soporte con navegación, estado de sesión, señales de cola y outlet para cada pantalla.

**Superficie que exporta.** [`SupportLayout`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L31).

**Módulos que lo cargan.** [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L18) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, [`./SupportSidebar`](../../../packages/support-sdk/src/agent/SupportSidebar.jsx), [`./SupportTopbar`](../../../packages/support-sdk/src/agent/SupportTopbar.jsx), [`./SupportWorkQueueDock`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx).

#### [`SUPPORT_SIDEBAR_COLLAPSED_KEY`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L7) · variable de módulo

Declara `SUPPORT_SIDEBAR_COLLAPSED_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`SupportLayout`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L35) (referencia), [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L65) (referencia).

#### [`resolveRouteMeta`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L9) · función

Obtiene o resuelve `Route Meta` para entregarlo al consumidor.

- **Entradas** `pathname`.
- **Retorno visible o tipo declarado** `title`, `subtitle`.
- **Condiciones que evalúa** `pathname.startsWith`.
- **Llamadas directas en el cuerpo** [`pathname.startsWith`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L10).
- **Lo usa** [`routeMeta`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L41) (llama).

#### [`SupportLayout`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L31) · componente React · exportación por defecto

Monta `SupportSidebar`, `SupportTopbar`, `Outlet`, `SupportWorkQueueDock`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `booleano`, `JSX`.
- **Estado o valores vinculados** `[sidebarOpen, setSidebarOpen] mediante useState`, `[sidebarCollapsed, setSidebarCollapsed] mediante useState`.
- **Interfaz que monta** `SupportSidebar`, `SupportTopbar`, `Outlet`, `SupportWorkQueueDock`.
- **Hooks que llama** `useState`, `useLocation`, `useNavigate`, `useEffect`.
- **Efectos y APIs** `window.localStorage.getItem`.
- **Condiciones que evalúa** `undefined`.
- **Usa código de** [`SupportSidebar`](../../../packages/support-sdk/src/agent/SupportSidebar.jsx#L36) (renderiza), [`SupportTopbar`](../../../packages/support-sdk/src/agent/SupportTopbar.jsx#L17) (renderiza), [`SupportWorkQueueDock`](../../../packages/support-sdk/src/agent/SupportWorkQueueDock.jsx#L11) (renderiza).
- **Llamadas directas en el cuerpo** [`window.localStorage.getItem`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L35), [`location.pathname.startsWith`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L92).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L446) (renderiza).

#### [`routeMeta`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L41) · cálculo memorizado · dentro de [`SupportLayout`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L31)

Función auxiliar de `SupportLayout` para `route Meta`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`resolveRouteMeta`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L41).
- **Lo usa** [`SupportLayout`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L81) (accede al módulo).

#### [`handleRefreshPanel`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L45) · callback React · dentro de [`SupportLayout`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L31)

Atiende `SupportTopbar.onRefreshPanel` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `SupportTopbar.onRefreshPanel`.
- **Hooks que llama** `useCallback`.
- **Efectos y APIs** `navigate`.
- **Llamadas directas en el cuerpo** [`params.set`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L47), [`params.toString`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L48), [`navigate`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L49).
- **Lo usa** [`SupportLayout`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L84) (pasa a onRefreshPanel).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L58) · callback de infraestructura · dentro de [`SupportLayout`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L31)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportLayout`.

- **Actualizaciones de estado o acciones** `setSidebarOpen`.
- **Llamadas directas en el cuerpo** [`setSidebarOpen`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L59).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L62) · callback de infraestructura · dentro de [`SupportLayout`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L31)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportLayout`.

- **Actualizaciones de estado o acciones** `setItem`.
- **Efectos y APIs** `window.localStorage.setItem`.
- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`window.localStorage.setItem`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L64).

#### [`SupportSidebar.onClose`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L74) · callback JSX · dentro de [`SupportLayout`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L31)

Responde al evento de interfaz `SupportSidebar.onClose`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSidebarOpen`.
- **Llamadas directas en el cuerpo** [`setSidebarOpen`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L74).

#### [`SupportSidebar.onToggleCollapsed`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L76) · callback JSX · dentro de [`SupportLayout`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L31)

Responde al evento de interfaz `SupportSidebar.onToggleCollapsed`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSidebarCollapsed`.
- **Llamadas directas en el cuerpo** [`setSidebarCollapsed`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L76).

#### [`SupportTopbar.onOpenMenu`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L83) · callback JSX · dentro de [`SupportLayout`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L31)

Responde al evento de interfaz `SupportTopbar.onOpenMenu`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSidebarOpen`.
- **Llamadas directas en el cuerpo** [`setSidebarOpen`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L83).

### [`packages/support-sdk/src/agent/SupportSidebar.jsx`](../../../packages/support-sdk/src/agent/SupportSidebar.jsx#L1)

Navegación lateral del rol y acciones visibles por contexto.

**Superficie que exporta.** [`SupportSidebar`](../../../packages/support-sdk/src/agent/SupportSidebar.jsx#L36).

**Módulos que lo cargan.** [`SupportLayout.jsx`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L3) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, `lucide-react`, [`../../store/appStore`](../../../packages/support-sdk/store/appStore.js).

#### [`NAV_GROUPS`](../../../packages/support-sdk/src/agent/SupportSidebar.jsx#L13) · variable de módulo

Conserva la lista de `NAV GROUPS` usada por el módulo.

- **Lo usa** [`SupportSidebar`](../../../packages/support-sdk/src/agent/SupportSidebar.jsx#L98) (accede al módulo).

#### [`badgeTone`](../../../packages/support-sdk/src/agent/SupportSidebar.jsx#L30) · función

Implementa `badge Tone` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `status`.
- **Condiciones que evalúa** `status`.
- **Lo usa** [`SupportSidebar`](../../../packages/support-sdk/src/agent/SupportSidebar.jsx#L150) (llama).

#### [`SupportSidebar`](../../../packages/support-sdk/src/agent/SupportSidebar.jsx#L36) · componente React · exportación por defecto

Monta `ShieldCheck`, `Link`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{open, onClose, collapsed, onToggleCollapsed}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `logout mediante useAppStore`, `selector s.logout`.
- **Interfaz que monta** `ShieldCheck`, `Link`, `button`.
- **Hooks que llama** `useLocation`, `useAppStore`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama).
- **Llamadas directas en el cuerpo** [`NAV_GROUPS.map`](../../../packages/support-sdk/src/agent/SupportSidebar.jsx#L98), [`group.items.map`](../../../packages/support-sdk/src/agent/SupportSidebar.jsx#L111), [`isActive`](../../../packages/support-sdk/src/agent/SupportSidebar.jsx#L112), [`badgeTone`](../../../packages/support-sdk/src/agent/SupportSidebar.jsx#L150).
- **Lo usa** [`SupportLayout`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L72) (renderiza).

#### [`isActive`](../../../packages/support-sdk/src/agent/SupportSidebar.jsx#L45) · función · dentro de [`SupportSidebar`](../../../packages/support-sdk/src/agent/SupportSidebar.jsx#L36)

Comprueba `Active` para decidir si se admite o continúa la operación.

- **Entradas** `path`.
- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `path y location.pathname.startsWith`.
- **Llamadas directas en el cuerpo** [`location.pathname.startsWith`](../../../packages/support-sdk/src/agent/SupportSidebar.jsx#L46).
- **Lo usa** [`SupportSidebar`](../../../packages/support-sdk/src/agent/SupportSidebar.jsx#L112) (llama).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportSidebar.jsx#L139) · callback JSX · dentro de [`SupportSidebar`](../../../packages/support-sdk/src/agent/SupportSidebar.jsx#L36)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`logout`](../../../packages/support-sdk/src/agent/SupportSidebar.jsx#L139).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportSidebar.jsx#L160) · callback JSX · dentro de [`SupportSidebar`](../../../packages/support-sdk/src/agent/SupportSidebar.jsx#L36)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onToggleCollapsed`](../../../packages/support-sdk/src/agent/SupportSidebar.jsx#L160).

### [`packages/support-sdk/src/agent/SupportTicket.jsx`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1)

Detalle del hilo, mensajes, notas, macros, asignación y cambios de workflow. Consume estados y clientes compartidos.

**Superficie que exporta.** [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396).

**Módulos que lo cargan.** [`AdminSupportTicket.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportTicket.jsx#L3) (importa), [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L21) (importa).

**Dependencias del archivo.** `react`, `react-dom`, `react-router-dom`, `lucide-react`, [`../../lib/supabaseClient`](../../../packages/support-sdk/lib/supabaseClient.js), [`../supportClient`](../../../packages/support-sdk/src/supportClient.js), [`../data/supportCatalog`](../../../packages/support-sdk/src/data/supportCatalog.js), [`./SupportDevDebugBanner`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx).

#### [`THREAD_STATUS_VALUES`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L45) · variable de módulo

Conserva la lista de `THREAD STATUS VALUES` usada por el módulo.

- **Lo usa** [`normalizeThreadStatusCandidate`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L243) (accede al módulo).

#### [`TIMELINE_DEFAULT_SEQUENCE`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L46) · variable de módulo

Conserva la lista de `TIMELINE DEFAULT SEQUENCE` usada por el módulo.

- **Lo usa** [`timelineLanes`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1123) (referencia).

#### [`TIMELINE_RECOVERY_SEQUENCE`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L47) · variable de módulo

Conserva la lista de `TIMELINE RECOVERY SEQUENCE` usada por el módulo.

- **Lo usa** [`timelineLanes`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1122) (referencia).

#### [`TIMELINE_RELEASE_EVENT_TYPES`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L48) · variable de módulo

Declara `TIMELINE_RELEASE_EVENT_TYPES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`timelineLanes`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1046) (accede al módulo).

#### [`TERMINAL_TIMELINE_STATUSES`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L49) · variable de módulo

Declara `TERMINAL_TIMELINE_STATUSES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`timelineLanes`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1110) (accede al módulo).

#### [`TIMELINE_BLOCK_LABELS`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L50) · variable de módulo

Agrupa la configuración o catálogo de `TIMELINE BLOCK LABELS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `new`, `starting`, `assigned`, `in_progress`, `waiting_user`, `queued`, `closing`, `postponed`, `released`, `closed`, `cancelled`.
- **Lo usa** [`formatSupportThreadStatusLabel`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L175) (accede al módulo), [`createSegment`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1003) (accede al módulo).

#### [`EVENT_TYPE_LABELS`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L63) · variable de módulo

Agrupa la configuración o catálogo de `EVENT TYPE LABELS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `created`, `assigned`, `starting`, `status_changed`, `waiting_user`, `resumed`, `queued`, `closed`, `note_added`, `agent_timeout_release`, `agent_manual_release`, `retake_requested`, `cancelled`, `linked_to_user`.
- **Lo usa** [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2825) (accede al módulo).

#### [`TIMELINE_BLOCK_REACHED_CLASSES`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L79) · variable de módulo

Agrupa la configuración o catálogo de `TIMELINE BLOCK REACHED CLASSES` para que sus consumidores lean claves comunes.

- **Campos o contexto** `new`, `starting`, `assigned`, `in_progress`, `waiting_user`, `queued`, `closing`, `postponed`, `released`, `closed`, `cancelled`.
- **Lo usa** [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2649) (accede al módulo).

#### [`FLOW_SCREENS`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L93) · variable de módulo

Agrupa la configuración o catálogo de `FLOW SCREENS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `STARTING_INTRO`, `WHATSAPP_GUIDE`, `OPENING_MESSAGE`, `OPENING_FOLLOWUP`, `RESOLUTION_ACTIVE`, `RESOLUTION_FOLLOWUP`, `CLOSING_PREP`, `CLOSING_WAIT`, `CLOSING_CONFIRM`, `NEW_ISSUE_DECISION`, `NEW_ISSUE_INFO`.
- **Lo usa** [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L417) (accede al módulo), [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L478) (accede al módulo), [`load`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L617) (accede al módulo), [`macroStatusByScreen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L909) (accede al módulo), [`macroThread`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L928) (accede al módulo), [`handleCopy`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1292) (accede al módulo), [`handleClose`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1371) (accede al módulo), [`handleStartingContinue`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1411) (accede al módulo), [`handleMacroFlowUserResponded`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1439) (accede al módulo), [`handleStartWhatsappGuide`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1463) (accede al módulo), [`handleOpeningStepSubmit`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1473) (accede al módulo), [`handleOpeningResetForRecopy`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1495) (accede al módulo) y 13 más.

#### [`CLOSING_CONFIRM_WAIT_SECONDS`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L107) · variable de módulo

Declara `CLOSING_CONFIRM_WAIT_SECONDS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1732) (referencia).

#### [`normalizeThreadRow`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L109) · función

Normaliza `Thread Row` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `thread`.
- **Retorno visible o tipo declarado** `null`, `request_origin`, `origin_source`, `anon_profile`.
- **Condiciones que evalúa** `ausencia de thread`.
- **Lo usa** [`load`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L607) (llama).

#### [`splitMacroGroupAndTitle`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L119) · función

Implementa `split Macro Group And Title` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `rawTitle`.
- **Retorno visible o tipo declarado** `group`, `title`.
- **Condiciones que evalúa** `ausencia de match`, `ausencia de group o ausencia de normalizedTitle`.
- **Llamadas directas en el cuerpo** [`rawTitle.trim`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L120), [`fallback.match`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L122), [`match.1.trim`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L130), [`match.2.trim`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L131).
- **Lo usa** [`macroGroups`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L951) (llama).

#### [`asRecord`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L145) · función

Implementa `as Record` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de value o object o Array.isArray`.
- **Lo usa** [`load`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L602) (llama), [`threadContext`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L759) (llama), [`runtimeContext`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L760) (llama).

#### [`pickFirstString`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L150) · función

Extrae o interpreta `First String` de los argumentos, estado o datos de entrada.

- **Entradas** `...values`.
- **Condiciones que evalúa** `string`, `trimmed`, `number`.
- **Llamadas directas en el cuerpo** [`value.trim`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L153).
- **Lo usa** [`formatSupportCategoryLabel`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L163) (llama), [`formatSupportThreadStatusLabel`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L173) (llama), [`detectBrowserLabel`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L197) (llama), [`detectOsLabel`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L209) (llama), [`SupportIdentityCard`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L368) (llama), [`load`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L608) (llama), [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L761) (llama), [`contextCards`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L771) (llama), [`buildCards`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L874) (llama), [`macroThread`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L929) (llama), [`handleClose`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1356) (llama), [`handleClosingMessageSent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1547) (llama) y 3 más.

#### [`formatSupportCategoryLabel`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L162) · función

Formatea `Support Category Label` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Efectos y APIs** `replace`, `normalized.replace`.
- **Condiciones que evalúa** `ausencia de normalized`.
- **Llamadas directas en el cuerpo** [`pickFirstString`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L163), [`replace`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L165), [`trim`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L165), [`normalized.replace`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L165), [`char.toUpperCase`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L169).
- **Lo usa** [`categoryOptions`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1671) (llama), [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1727) (llama).

#### [`formatSupportThreadStatusLabel`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L172) · función

Formatea `Support Thread Status Label` para que el consumidor lo pueda presentar.

- **Entradas** `status`.
- **Efectos y APIs** `normalized.replace`, `replace`.
- **Condiciones que evalúa** `ausencia de normalized`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L173), [`pickFirstString`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L173), [`normalized.replace`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L175), [`replace`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L176), [`mapped.trim`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L176), [`char.toUpperCase`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L178).
- **Lo usa** [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1725) (llama).

#### [`formatElapsedClock`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L181) · función

Formatea `Elapsed Clock` para que el consumidor lo pueda presentar.

- **Entradas** `ms`.
- **Condiciones que evalúa** `hours`.
- **Llamadas directas en el cuerpo** [`padStart`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L189).
- **Lo usa** [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1731) (llama).

#### [`detectBrowserLabel`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L196) · función

Implementa `detect Browser Label` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `rawBrowser`, `userAgent`.
- **Condiciones que evalúa** `ausencia de raw`, `raw.includes`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L197), [`pickFirstString`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L197), [`raw.includes`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L199).
- **Lo usa** [`contextCards`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L778) (llama).

#### [`detectOsLabel`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L208) · función

Implementa `detect Os Label` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `rawOs`, `userAgent`.
- **Condiciones que evalúa** `ausencia de raw`, `raw.includes`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L209), [`pickFirstString`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L209), [`raw.includes`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L211).
- **Lo usa** [`contextCards`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L782) (llama).

#### [`normalizeThreadStatusCandidate`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L219) · función

Normaliza `Thread Status Candidate` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `null`.
- **Efectos y APIs** `raw.replace`.
- **Condiciones que evalúa** `string`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L221), [`value.trim`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L221), [`raw.replace`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L222), [`THREAD_STATUS_VALUES.includes`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L243).
- **Lo usa** [`deriveNextThreadStatusFromEvent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L253) (llama), [`timelineLanes`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1069) (llama).

#### [`deriveNextThreadStatusFromEvent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L246) · función

Implementa `derive Next Thread Status From Event` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `event`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de event o object`, `ausencia de type`, `type`, `statusFromType`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L248), [`event.event_type.trim`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L248), [`normalizeThreadStatusCandidate`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L253).
- **Lo usa** [`timelineLanes`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1053) (llama).

#### [`getEventDetails`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L265) · función

Obtiene o resuelve `Event Details` para entregarlo al consumidor.

- **Entradas** `event`.
- **Lo usa** [`findLatestActionEvent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L273) (llama), [`deriveQueueKindFromEvent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L288) (llama).

#### [`findLatestActionEvent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L269) · función

Obtiene o resuelve `Latest Action Event` para entregarlo al consumidor.

- **Entradas** `events`, `action`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de Array.isArray o ausencia de action`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L271), [`trim`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L271), [`events.find`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L272), [`getEventDetails`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L273).
- **Lo usa** [`load`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L605) (llama).

#### [`normalizeQueueKind`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L278) · función

Normaliza `Queue Kind` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `null`.
- **Efectos y APIs** `replace`.
- **Condiciones que evalúa** `string`, `ausencia de normalized`, `includes`.
- **Llamadas directas en el cuerpo** [`replace`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L280), [`toLowerCase`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L280), [`value.trim`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L280), [`includes`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L282).
- **Lo usa** [`deriveQueueKindFromEvent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L293) (llama).

#### [`deriveQueueKindFromEvent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L287) · función

Implementa `derive Queue Kind From Event` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `event`, `thread`.
- **Condiciones que evalúa** `boolean`, `queueKind`, `eventType y thread.status`, `thread.personal_queue o Boolean`.
- **Llamadas directas en el cuerpo** [`getEventDetails`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L288), [`normalizeQueueKind`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L293), [`toLowerCase`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L298), [`event.event_type.trim`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L298).
- **Lo usa** [`timelineLanes`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1056) (llama).

#### [`statusToTimelineStatus`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L305) · función

Implementa `status To Timeline Status` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `status`, `queueKind = valor por defecto`.
- **Condiciones que evalúa** `status`.
- **Lo usa** [`splitLaneToQueue`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1034) (llama), [`timelineLanes`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1057) (llama).

#### [`buildCollapsedResolvingLane`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L310) · función

Construye `Collapsed Resolving Lane` a partir de los datos del flujo.

- **Entradas** `segments`.
- **Retorno visible o tipo declarado** `hasCollapsedResolving`, `collapsedSegments`, `collapsedSegmentId`.
- **Efectos y APIs** `resolvingIndexes.push`.
- **Condiciones que evalúa** `segment.status`, `resolvingIndexes.length`, `lastIndex`.
- **Llamadas directas en el cuerpo** [`segments.forEach`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L312), [`resolvingIndexes.push`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L313), [`segments.slice`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L331), [`groupedSegments.flatMap`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L337).
- **Lo usa** [`timelineCollapsedSegments`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1144) (llama), [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2629) (llama).

#### [`SupportIdentityCard`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L351) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{title, value, Icon, tone, compact}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`pickFirstString`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L368), [`React.createElement`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L381).
- **Lo usa** [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2564) (renderiza).

#### [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396) · componente React · exportación por defecto

Monta `SupportDevDebugBanner`, `Check`, `button`, `Copy`, `ChevronRight`, `textarea`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[thread, setThread] mediante useState`, `[obsContext, setObsContext] mediante useState`, `[events, setEvents] mediante useState`, `[notes, setNotes] mediante useState`, `[noteDraft, setNoteDraft] mediante useState`, `[copiedId, setCopiedId] mediante useState`, `[closingRequest, setClosingRequest] mediante useState`, `[logs, setLogs] mediante useState`, `[catalog, setCatalog] mediante useState`, `[catalogLoadError, setCatalogLoadError] mediante useState`, `[refreshingMacros, setRefreshingMacros] mediante useState`, `[expandedMacroGroups, setExpandedMacroGroups] mediante useState`, `[openingSaving, setOpeningSaving] mediante useState`, `[openingStepError, setOpeningStepError] mediante useState` y 25 más.
- **Interfaz que monta** `SupportDevDebugBanner`, `Check`, `button`, `Copy`, `ChevronRight`, `textarea`, `select`, `SupportIdentityCard`.
- **Hooks que llama** `useParams`, `useNavigate`, `useLocation`, `useState`, `useRef`, `useEffect`.
- **Actualizaciones de estado o acciones** `setOpeningFocusedMacro`, `setResolutionFocusedMacro`, `setClosingFocusedMacro`, `setNewIssueInfoFocusedMacro`.
- **Condiciones que evalúa** `ausencia de thread`.
- **Usa código de** [`normalizeSupportEnvKey`](../../../packages/support-sdk/src/data/supportCatalog.js#L157) (llama), [`SupportDevDebugBanner`](../../../packages/support-sdk/src/agent/SupportDevDebugBanner.jsx#L12) (renderiza).
- **Llamadas directas en el cuerpo** [`normalizeSupportEnvKey`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L746), [`pickFirstString`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L761), [`location.pathname.startsWith`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L902), [`formatSupportThreadStatusLabel`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1725), [`formatSupportCategoryLabel`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1727), [`getTime`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1728), [`toISOString`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1729), [`formatElapsedClock`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1731), [`newIssueReasonDraft.trim`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1739), [`formatDateTime`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1973), [`personalQueueThreads.map`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1995), [`map`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2109) y 17 más.
- **Lo usa** [`AdminSupportTicket`](../../../apps/referidos-app/src/admin/support/AdminSupportTicket.jsx#L8) (renderiza), [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L458) (renderiza).

#### [`formatDateTime`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L445) · función · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Formatea `Date Time` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`toLocaleString`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L446).
- **Lo usa** [`buildCards`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L888) (llama), [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1973) (llama).

#### [`formatCommit`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L449) · función · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Formatea `Commit` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de value o string`.
- **Llamadas directas en el cuerpo** [`value.slice`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L451).
- **Lo usa** [`buildCards`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L863) (llama).

#### [`formatTimelineDate`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L453) · función · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Formatea `Timeline Date` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de value`, `Number.isNaN`.
- **Llamadas directas en el cuerpo** [`date.getTime`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L456), [`date.toLocaleString`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L457).
- **Lo usa** [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2797) (llama).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L460) · callback de infraestructura · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportTicket`.

- **Actualizaciones de estado o acciones** `clearInterval`.
- **Efectos y APIs** `globalThis.setInterval`, `globalThis.clearInterval`.
- **Llamadas directas en el cuerpo** [`globalThis.setInterval`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L461), [`globalThis.clearInterval`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L465).

#### [`setInterval · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L461) · callback de infraestructura · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L460)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setActiveNowMs`.
- **Llamadas directas en el cuerpo** [`setActiveNowMs`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L462).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L469) · callback de infraestructura · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportTicket`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `globalThis.clearTimeout`.
- **Condiciones que evalúa** `resolutionSendReminderTimerRef.current`.
- **Llamadas directas en el cuerpo** [`globalThis.clearTimeout`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L472).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L477) · callback de infraestructura · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportTicket`.

- **Actualizaciones de estado o acciones** `clearTimeout`, `setResolutionSendReminderOpen`.
- **Efectos y APIs** `globalThis.clearTimeout`.
- **Condiciones que evalúa** `flowScreen`, `resolutionSendReminderTimerRef.current`.
- **Llamadas directas en el cuerpo** [`globalThis.clearTimeout`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L480), [`setResolutionSendReminderOpen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L483).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L488) · callback de infraestructura · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportTicket`.

- **Actualizaciones de estado o acciones** `setAttribute`.
- **Condiciones que evalúa** `undefined`, `ausencia de body`, `hasBlockingModalOpen`.
- **Llamadas directas en el cuerpo** [`body.setAttribute`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L494), [`body.removeAttribute`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L496).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L504) · callback de infraestructura · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportTicket`.

- **Llamadas directas en el cuerpo** [`load`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L656).

#### [`load`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L506) · función · asíncrona · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L504)

Consulta o invoca tabla o vista [`support_threads`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L251) y coordina las demás operaciones de esta ficha.

- **Retorno visible o tipo declarado** `booleano`.
- **Actualizaciones de estado o acciones** `setThread`, `setObsContext`, `setEvents`, `setNotes`, `setLogs`, `setFlowScreen`, `setOpeningStepError`, `setOpeningFocusedMacro`, `setResolutionFocusedMacro`, `setClosingFocusedMacro`, `setNewIssueInfoFocusedMacro`, `setResolutionSendReminderOpen` y 8 más.
- **Condiciones que evalúa** `enrichedResult.error`, `ausencia de threadData.id`, `ausencia de active`, `mergedLogs.length`, `ausencia de event o event.event_type`, `normalizedThread.status`, `ausencia de hasWhatsAppNameMarked`, `ausencia de hasOpeningMessageSent`.
- **Contrato de datos** tabla o vista [`support_threads`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L251) (`select`) en [`SupportTicket.jsx:507`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L507), tabla o bucket [`support_threads`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L251) en [`SupportTicket.jsx:507`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L507), tabla o vista [`support_thread_events`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L300) (`select`) en [`SupportTicket.jsx:536`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L536), tabla o bucket [`support_thread_events`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L300) en [`SupportTicket.jsx:536`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L536), tabla o vista [`support_thread_notes`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L313) (`select`) en [`SupportTicket.jsx:541`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L541), tabla o bucket [`support_thread_notes`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L313) en [`SupportTicket.jsx:541`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L541), tabla o vista [`support_ticket_obs_context`](../../../apps/referidos-app/supabase/migrations/20260318_000037_support_ticket_obs_context_and_obs_identity_views.sql#L114) (`select`) en [`SupportTicket.jsx:546`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L546), tabla o bucket [`support_ticket_obs_context`](../../../apps/referidos-app/supabase/migrations/20260318_000037_support_ticket_obs_context_and_obs_identity_views.sql#L114) en [`SupportTicket.jsx:546`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L546), tabla o vista [`support_log_events`](../../../apps/referidos-app/supabase/migrations/20260226_000019_obs_release_snapshots_and_component_resolution.sql#L148) (`select`) en [`SupportTicket.jsx:566`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L566), tabla o bucket [`support_log_events`](../../../apps/referidos-app/supabase/migrations/20260226_000019_obs_release_snapshots_and_component_resolution.sql#L148) en [`SupportTicket.jsx:566`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L566).
- **Usa código de** [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`maybeSingle`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L507), [`eq`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L507), [`select`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L507), [`supabase.from`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L507), [`setThread`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L527), [`setObsContext`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L528), [`setEvents`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L529), [`setNotes`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L530), [`setLogs`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L531), [`order`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L536), [`neq`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L552), [`limit`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L566) y 26 más.
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L656) (llama).

#### [`fetchCatalog`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L662) · callback React · asíncrona · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Consulta o invoca Edge [`ops-support-macros-sync-dispatch`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{forceSync} = valor por defecto`.
- **Retorno visible o tipo declarado** `categories`, `macros`, `catalogError`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `shouldSync`, `error`, `data.ok`, `categories.length y macros.length`, `syncError`, `cacheError`.
- **Contrato de datos** Edge [`ops-support-macros-sync-dispatch`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts) en [`SupportTicket.jsx:671`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L671).
- **Usa código de** [`loadSupportCatalogFromCache`](../../../packages/support-sdk/src/data/supportCatalog.js#L163) (llama), [`supabase`](../../../packages/support-sdk/lib/supabaseClient.js#L23) (accede al módulo).
- **Llamadas directas en el cuerpo** [`loadSupportCatalogFromCache`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L663), [`supabase.functions.invoke`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L671).
- **Lo usa** [`refreshCatalog`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L711) (llama), [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L727) (llama), [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L744) (referencia).

#### [`refreshCatalog`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L708) · callback React · asíncrona · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Coordina cambios de estado durante `refresh Catalog`.

- **Entradas** `{forceSync} = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshingMacros`, `setCatalog`, `setCatalogLoadError`.
- **Llamadas directas en el cuerpo** [`setRefreshingMacros`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L709), [`fetchCatalog`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L711), [`setCatalog`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L712), [`setCatalogLoadError`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L716).
- **Lo usa** [`handleStatus`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1345) (llama), [`handleClose`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1375) (llama), [`handleCloseOutcome`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1607) (llama), [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1766) (llama).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L724) · callback de infraestructura · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportTicket`.

- **Actualizaciones de estado o acciones** `setRefreshingMacros`, `setCatalog`, `setCatalogLoadError`.
- **Condiciones que evalúa** `ausencia de active`.
- **Llamadas directas en el cuerpo** [`setRefreshingMacros`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L726), [`finally`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L727), [`then`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L727), [`fetchCatalog`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L727), [`setCatalog`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L730), [`setCatalogLoadError`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L734).

#### [`ticketAppKey`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L751) · cálculo memorizado · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Función auxiliar de `SupportTicket` para `ticket App Key`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de thread`.
- **Usa código de** [`normalizeSupportAppKey`](../../../packages/support-sdk/src/data/supportCatalog.js#L151) (llama).
- **Llamadas directas en el cuerpo** [`normalizeSupportAppKey`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L753).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1240) (referencia), [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1250) (referencia), [`executeMacroCopy`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1274) (referencia).

#### [`threadContext`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L759) · cálculo memorizado · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Función auxiliar de `SupportTicket` para `thread Context`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`asRecord`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L759).
- **Lo usa** [`runtimeContext`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L760) (accede al módulo), [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L763) (accede al módulo), [`contextCards`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L771) (accede al módulo).

#### [`runtimeContext`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L760) · cálculo memorizado · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Maneja `time Context` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`asRecord`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L760).
- **Lo usa** [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L762) (accede al módulo), [`contextCards`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L773) (accede al módulo).

#### [`contextCards`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L767) · cálculo memorizado · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Función auxiliar de `SupportTicket` para `context Cards`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`pickFirstString`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L771), [`detectBrowserLabel`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L778), [`detectOsLabel`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L782).
- **Lo usa** [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2563) (accede al módulo).

#### [`buildCards`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L835) · cálculo memorizado · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Construye `Cards` a partir de los datos del flujo.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`formatCommit`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L863), [`pickFirstString`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L874), [`formatDateTime`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L888).
- **Lo usa** [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2578) (accede al módulo).

#### [`backPath`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L896) · cálculo memorizado · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Función auxiliar de `SupportTicket` para `back Path`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `location.pathname.startsWith`.
- **Llamadas directas en el cuerpo** [`location.pathname.startsWith`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L897).
- **Lo usa** [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1939) (referencia).

#### [`macroStatusByScreen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L907) · cálculo memorizado · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Función auxiliar de `SupportTicket` para `macro Status By Screen`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de thread`, `flowScreen`, `thread.status`.
- **Lo usa** [`macroThread`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L933) (referencia).

#### [`macroThread`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L925) · cálculo memorizado · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Función auxiliar de `SupportTicket` para `macro Thread`.

- **Retorno visible o tipo declarado** `null`, `status`, `category`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de thread`.
- **Llamadas directas en el cuerpo** [`pickFirstString`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L929).
- **Lo usa** [`macros`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L940) (referencia).

#### [`macros`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L938) · cálculo memorizado · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Función auxiliar de `SupportTicket` para `macros`.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`filterSupportMacrosForThread`](../../../packages/support-sdk/src/data/supportCatalog.js#L215) (llama).
- **Llamadas directas en el cuerpo** [`filterSupportMacrosForThread`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L939).
- **Lo usa** [`macroGroups`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L950) (accede al módulo), [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1222) (accede al módulo), [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1250) (referencia), [`renderMacroSuggestionsContent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1819) (accede al módulo).

#### [`macroGroups`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L947) · cálculo memorizado · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Función auxiliar de `SupportTicket` para `macro Groups`.

- **Hooks que llama** `useMemo`.
- **Efectos y APIs** `items.push`.
- **Condiciones que evalúa** `ausencia de grouped.has`.
- **Llamadas directas en el cuerpo** [`macros.forEach`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L950), [`splitMacroGroupAndTitle`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L951), [`parsed.group.toLowerCase`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L952), [`grouped.has`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L953), [`grouped.set`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L954), [`items.push`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L960), [`grouped.get`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L960), [`sort`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L966), [`grouped.values`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L966), [`a.label.localeCompare`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L967).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L973) (accede al módulo), [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L983) (referencia), [`renderMacroSuggestionsContent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1824) (accede al módulo).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L971) · callback de infraestructura · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportTicket`.

- **Actualizaciones de estado o acciones** `setExpandedMacroGroups`.
- **Condiciones que evalúa** `validKeys.has`, `macroGroups.length`.
- **Llamadas directas en el cuerpo** [`setExpandedMacroGroups`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L972), [`macroGroups.map`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L973), [`forEach`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L975), [`validKeys.has`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L976).

#### [`toggleMacroGroup`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L985) · callback React · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Coordina cambios de estado durante `toggle Macro Group`.

- **Entradas** `groupKey`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setExpandedMacroGroups`.
- **Llamadas directas en el cuerpo** [`setExpandedMacroGroups`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L986).
- **Lo usa** [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1833) (llama).

#### [`timelineLanes`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L994) · cálculo memorizado · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Función auxiliar de `SupportTicket` para `timeline Lanes`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Efectos y APIs** `current.events.push`, `currentLane.segments.push`, `displaySegments.push`.
- **Condiciones que evalúa** `ausencia de thread`, `ausencia de current`, `TIMELINE_RELEASE_EVENT_TYPES.has`, `ausencia de nextStatus`, `ausencia de nextTimelineStatus o nextTimelineStatus`, `nextStatus`, `currentThreadStatus`, `ausencia de current o currentTimelineStatus` y 4 más.
- **Llamadas directas en el cuerpo** [`sort`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L996), [`getTime`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L997), [`createLane`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1021), [`toISOString`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1023), [`orderedEvents.forEach`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1037), [`toLowerCase`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1038), [`event.event_type.trim`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1038), [`getCurrentSegment`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1040), [`TIMELINE_RELEASE_EVENT_TYPES.has`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1046), [`splitLaneToQueue`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1047), [`current.events.push`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1051), [`deriveNextThreadStatusFromEvent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1053) y 18 más.
- **Lo usa** [`timelineCollapsedSegments`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1144) (accede al módulo), [`expandedTimelineSegment`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1150) (accede al módulo), [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2612) (accede al módulo).

#### [`createSegment`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1000) · función · dentro de [`timelineLanes`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L994)

Construye `Segment` a partir de los datos del flujo.

- **Entradas** `status`, `startedAt`, `isReached = valor por defecto`, `queueKind = valor por defecto`.
- **Retorno visible o tipo declarado** `id`, `status`, `label`, `startedAt`, `endedAt`, `events`, `isReached`, `queueKind`.
- **Lo usa** [`createLane`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1015) (llama), [`splitLaneToQueue`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1030) (llama), [`timelineLanes`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1066) (llama).

#### [`createLane`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1011) · función · dentro de [`timelineLanes`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L994)

Construye `Lane` a partir de los datos del flujo.

- **Entradas** `firstStatus`, `startedAt`, `queueKind = valor por defecto`.
- **Efectos y APIs** `lanes.push`.
- **Llamadas directas en el cuerpo** [`createSegment`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1015), [`lanes.push`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1017).
- **Lo usa** [`timelineLanes`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1021) (llama), [`splitLaneToQueue`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1034) (llama).

#### [`getCurrentSegment`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1026) · función · dentro de [`timelineLanes`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L994)

Obtiene o resuelve `Current Segment` para entregarlo al consumidor.

- **Lo usa** [`splitLaneToQueue`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1028) (llama), [`timelineLanes`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1040) (llama).

#### [`splitLaneToQueue`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1027) · función · dentro de [`timelineLanes`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L994)

Función auxiliar de `timelineLanes` para `split Lane To Queue`.

- **Entradas** `transitionAt`, `queueKind = valor por defecto`, `eventForRelease = valor por defecto`.
- **Efectos y APIs** `releaseSegment.events.push`, `currentLane.segments.push`.
- **Condiciones que evalúa** `current`, `eventForRelease`.
- **Llamadas directas en el cuerpo** [`getCurrentSegment`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1028), [`createSegment`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1030), [`releaseSegment.events.push`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1031), [`currentLane.segments.push`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1033), [`createLane`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1034), [`statusToTimelineStatus`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1034).
- **Lo usa** [`timelineLanes`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1047) (llama).

#### [`orderStatus`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1124) · función · dentro de [`timelineLanes`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L994)

Función auxiliar de `timelineLanes` para `order Status`.

- **Entradas** `status`.
- **Lo usa** [`timelineLanes`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1126) (llama).

#### [`timelineCollapsedSegments`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1144) · cálculo memorizado · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Función auxiliar de `SupportTicket` para `timeline Collapsed Segments`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`timelineLanes.flatMap`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1144), [`buildCollapsedResolvingLane`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1144).
- **Lo usa** [`expandedTimelineSegment`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1151) (accede al módulo).

#### [`expandedTimelineSegment`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1149) · cálculo memorizado · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Función auxiliar de `SupportTicket` para `expanded Timeline Segment`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`find`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1150), [`timelineLanes.flat`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1150), [`timelineCollapsedSegments.find`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1151).
- **Lo usa** [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2793) (referencia).

#### [`toggleLaneExpanded`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1156) · callback React · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Coordina cambios de estado durante `toggle Lane Expanded`.

- **Entradas** `laneKey`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setExpandedResolvingByLane`.
- **Llamadas directas en el cuerpo** [`setExpandedResolvingByLane`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1157).
- **Lo usa** [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2678) (llama), [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2750) (llama).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1160) · callback de infraestructura · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportTicket`.

- **Actualizaciones de estado o acciones** `setExpandedTimelineSegmentId`, `setExpandedResolvingByLane`.
- **Llamadas directas en el cuerpo** [`setExpandedTimelineSegmentId`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1161), [`setExpandedResolvingByLane`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1162).

#### [`handleTimelineDragStart`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1165) · callback React · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Atiende `div.onMouseDown` y aplica la acción vinculada a ese control.

- **Entradas** `event`.
- **Recibe eventos de** `div.onMouseDown`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setIsTimelineDragging`.
- **Condiciones que evalúa** `event.button`, `ausencia de container`.
- **Llamadas directas en el cuerpo** [`event.preventDefault`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1169), [`setIsTimelineDragging`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1176).
- **Lo usa** [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2624) (pasa a onMouseDown).

#### [`handleTimelineDragMove`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1179) · callback React · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Maneja `Timeline Drag Move` y coordina las acciones indicadas abajo.

- **Entradas** `event`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `ausencia de container o ausencia de state.active`, `3`.
- **Llamadas directas en el cuerpo** [`event.preventDefault`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1183).
- **Lo usa** [`onMove`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1207) (llama), [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1215) (referencia).

#### [`handleTimelineDragEnd`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1191) · callback React · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Maneja `Timeline Drag End` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setIsTimelineDragging`.
- **Condiciones que evalúa** `ausencia de state.active`, `state.moved`.
- **Llamadas directas en el cuerpo** [`setIsTimelineDragging`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1195).
- **Lo usa** [`onUp`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1208) (llama), [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1215) (referencia).

#### [`shouldIgnoreTimelineClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1202) · callback React · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Comprueba `Ignore Timeline Click` para decidir si se admite o continúa la operación.

- **Hooks que llama** `useCallback`.
- **Lo usa** [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2676) (llama), [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2749) (llama), [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2803) (llama).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1206) · callback de infraestructura · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportTicket`.

- **Efectos y APIs** `window.addEventListener`, `window.removeEventListener`.
- **Llamadas directas en el cuerpo** [`window.addEventListener`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1209), [`window.removeEventListener`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1212).

#### [`onMove`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1207) · función · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1206)

Maneja `Move` y coordina las acciones indicadas abajo.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`handleTimelineDragMove`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1207).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1209) (referencia).

#### [`onUp`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1208) · función · dentro de [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1206)

Maneja `Up` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`handleTimelineDragEnd`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1208).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1210) (referencia).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1217) · callback de infraestructura · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportTicket`.

- **Llamadas directas en el cuerpo** [`shownTrackerRef.current.clear`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1218).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1221) · callback de infraestructura · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportTicket`.

- **Efectos y APIs** `events.push`.
- **Condiciones que evalúa** `ausencia de thread.public_id o ausencia de macros.length`, `ausencia de macroId o ausencia de macroCode`, `shownTrackerRef.current.has`, `ausencia de events.length`.
- **Usa código de** [`trackSupportMacroEvents`](../../../packages/support-sdk/src/supportClient.js#L288) (llama).
- **Llamadas directas en el cuerpo** [`macros.forEach`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1225), [`shownTrackerRef.current.has`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1231), [`shownTrackerRef.current.add`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1232), [`events.push`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1234), [`catch`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1249), [`trackSupportMacroEvents`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1249).

#### [`executeMacroCopy`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1252) · función · asíncrona · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Aplica o guarda `Macro Copy` para que el estado refleje la operación.

- **Entradas** `macro`.
- **Retorno visible o tipo declarado** `booleano`.
- **Actualizaciones de estado o acciones** `setCopiedId`.
- **Efectos y APIs** `navigator.clipboard.writeText`, `setTimeout`.
- **Condiciones que evalúa** `ausencia de macroBody o ausencia de macroId o ausencia de macroCode`.
- **Usa código de** [`trackSupportMacroEvents`](../../../packages/support-sdk/src/supportClient.js#L288) (llama).
- **Llamadas directas en el cuerpo** [`navigator.clipboard.writeText`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1259), [`setCopiedId`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1260), [`setTimeout`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1261), [`catch`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1266), [`trackSupportMacroEvents`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1266).
- **Lo usa** [`handleCopy`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1289) (llama), [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2933) (llama).

#### [`setTimeout · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1261) · callback de infraestructura · dentro de [`executeMacroCopy`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1252)

Ejecuta trabajo diferido o periódico iniciado por `executeMacroCopy`.

- **Actualizaciones de estado o acciones** `setCopiedId`.
- **Llamadas directas en el cuerpo** [`setCopiedId`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1261).

#### [`handleCopy`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1287) · función · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Maneja `Copy` y coordina las acciones indicadas abajo.

- **Entradas** `macro`.
- **Actualizaciones de estado o acciones** `setOpeningFocusedMacro`, `setResolutionFocusedMacro`, `setResolutionReminderMacro`, `setResolutionSendReminderOpen`, `clearTimeout`, `setClosingFocusedMacro`, `setNewIssueInfoFocusedMacro`.
- **Efectos y APIs** `globalThis.clearTimeout`, `globalThis.setTimeout`.
- **Condiciones que evalúa** `ausencia de macro`, `ausencia de ok`, `flowScreen`, `resolutionSendReminderTimerRef.current`.
- **Llamadas directas en el cuerpo** [`then`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1289), [`executeMacroCopy`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1289), [`setOpeningFocusedMacro`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1293), [`setResolutionFocusedMacro`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1298), [`setResolutionReminderMacro`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1299), [`setResolutionSendReminderOpen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1300), [`globalThis.clearTimeout`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1302), [`globalThis.setTimeout`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1304), [`setClosingFocusedMacro`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1311), [`setNewIssueInfoFocusedMacro`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1316).
- **Lo usa** [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1788) (llama), [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1858) (llama).

#### [`setTimeout · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1304) · callback de infraestructura · dentro de [`handleCopy`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1287)

Ejecuta trabajo diferido o periódico iniciado por `handleCopy`.

- **Actualizaciones de estado o acciones** `setResolutionSendReminderOpen`.
- **Llamadas directas en el cuerpo** [`setResolutionSendReminderOpen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1305).

#### [`handleAddNote`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1321) · función · asíncrona · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setNotes`, `setNoteDraft`.
- **Condiciones que evalúa** `ausencia de noteDraft.trim`, `result.ok`.
- **Usa código de** [`addSupportNote`](../../../packages/support-sdk/src/supportClient.js#L133) (llama).
- **Llamadas directas en el cuerpo** [`noteDraft.trim`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1322), [`addSupportNote`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1323), [`setNotes`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1328), [`setNoteDraft`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1329).
- **Lo usa** [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2852) (pasa a onClick).

#### [`handleStatus`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1333) · función · asíncrona · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Maneja el valor de estado y coordina las acciones indicadas abajo.

- **Entradas** `status`.
- **Retorno visible o tipo declarado** `booleano`.
- **Actualizaciones de estado o acciones** `setThread`.
- **Condiciones que evalúa** `result.ok`.
- **Usa código de** [`updateSupportStatus`](../../../packages/support-sdk/src/supportClient.js#L68) (llama).
- **Llamadas directas en el cuerpo** [`updateSupportStatus`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1334), [`setThread`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1340), [`refreshCatalog`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1345).
- **Lo usa** [`handleOpeningMessageSent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1402) (llama), [`handleMacroFlowUserResponded`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1432) (llama), [`handleStartClosingFlow`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1517) (llama), [`handleBackToResolutionFollowup`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1528) (llama), [`handleBackToIssueDecision`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1555) (llama), [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1923) (llama).

#### [`handleClose`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1351) · función · asíncrona · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Maneja `Close` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setClosingRequest`, `setOpeningStepError`, `setThread`, `setFlowScreen`, `setResolutionSendReminderOpen`, `setResolutionFocusedMacro`, `setOpeningFocusedMacro`.
- **Condiciones que evalúa** `closingRequest`, `result.ok`.
- **Usa código de** [`closeSupportThread`](../../../packages/support-sdk/src/supportClient.js#L143) (llama).
- **Llamadas directas en el cuerpo** [`setClosingRequest`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1353), [`setOpeningStepError`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1354), [`pickFirstString`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1356), [`closeSupportThread`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1357), [`setThread`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1364), [`setFlowScreen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1371), [`setResolutionSendReminderOpen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1372), [`setResolutionFocusedMacro`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1373), [`setOpeningFocusedMacro`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1374), [`refreshCatalog`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1375).

#### [`handleOpeningMessageSent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1384) · función · asíncrona · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Maneja `Opening Message Sent` y coordina las acciones indicadas abajo.

- **Entradas** `{moveToInProgress} = valor por defecto`.
- **Retorno visible o tipo declarado** `booleano`.
- **Actualizaciones de estado o acciones** `setOpeningSaving`, `markSupportOpeningMessage`, `setThread`.
- **Condiciones que evalúa** `ausencia de thread.public_id o openingSaving`, `ausencia de result.ok`, `moveToInProgress`, `ausencia de statusOk`.
- **Usa código de** [`markSupportOpeningMessage`](../../../packages/support-sdk/src/supportClient.js#L81) (llama).
- **Llamadas directas en el cuerpo** [`setOpeningSaving`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1386), [`markSupportOpeningMessage`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1387), [`setThread`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1392), [`toISOString`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1397), [`handleStatus`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1402).
- **Lo usa** [`handleOpeningStepSubmit`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1468) (llama).

#### [`handleStartingContinue`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1408) · función · asíncrona · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Maneja `Starting Continue` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setFlowScreen`, `setStartingGuideError`, `setWhatsAppNameSaving`, `markSupportWhatsAppNameChanged`, `setWhatsAppNameMarked`.
- **Condiciones que evalúa** `ausencia de thread.public_id`, `whatsAppNameMarked`, `ausencia de result.ok`.
- **Usa código de** [`markSupportWhatsAppNameChanged`](../../../packages/support-sdk/src/supportClient.js#L94) (llama).
- **Llamadas directas en el cuerpo** [`setFlowScreen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1411), [`setStartingGuideError`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1414), [`setWhatsAppNameSaving`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1415), [`markSupportWhatsAppNameChanged`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1416), [`setWhatsAppNameMarked`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1425).
- **Lo usa** [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2095) (llama).

#### [`handleMacroFlowUserResponded`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1429) · función · asíncrona · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Maneja `Macro Flow User Responded` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setResolutionSendReminderOpen`, `clearTimeout`, `setFlowScreen`.
- **Efectos y APIs** `globalThis.clearTimeout`.
- **Condiciones que evalúa** `ausencia de thread.public_id`, `thread.status`, `ausencia de ok`, `resolutionSendReminderTimerRef.current`.
- **Llamadas directas en el cuerpo** [`handleStatus`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1432), [`setResolutionSendReminderOpen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1435), [`globalThis.clearTimeout`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1437), [`setFlowScreen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1439).
- **Lo usa** [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2221) (llama), [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2271) (llama).

#### [`persistWorkflowAction`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1442) · función · asíncrona · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Aplica o guarda `Workflow Action` para que el estado refleje la operación.

- **Entradas** `action`, `payload = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `data`.
- **Actualizaciones de estado o acciones** `setThread`.
- **Condiciones que evalúa** `ausencia de response.ok o response.data.ok`, `nextThread`.
- **Usa código de** [`sendSupportWorkflowAction`](../../../packages/support-sdk/src/supportClient.js#L107) (llama).
- **Llamadas directas en el cuerpo** [`sendSupportWorkflowAction`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1443), [`setThread`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1456).
- **Lo usa** [`handleOpeningResetForRecopy`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1480) (llama), [`handleResolutionMessageSent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1502) (llama), [`handleClosingMessageSent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1541) (llama), [`handleCloseOutcome`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1574) (llama), [`handleIssueContextSet`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1618) (llama), [`handleInfoMessageSent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1635) (llama).

#### [`handleStartWhatsappGuide`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1461) · función · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setStartingGuideError`, `setFlowScreen`.
- **Llamadas directas en el cuerpo** [`setStartingGuideError`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1462), [`setFlowScreen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1463).
- **Lo usa** [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2026) (pasa a onClick).

#### [`handleOpeningStepSubmit`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1466) · función · asíncrona · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Maneja `Opening Step Submit` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setOpeningStepError`, `setFlowScreen`.
- **Condiciones que evalúa** `ausencia de ok`.
- **Llamadas directas en el cuerpo** [`setOpeningStepError`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1467), [`handleOpeningMessageSent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1468), [`setFlowScreen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1473).
- **Lo usa** [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2201) (llama).

#### [`handleOpeningResetForRecopy`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1476) · función · asíncrona · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Maneja `Opening Reset For Recopy` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setWorkflowSaving`, `setOpeningStepError`, `setThread`, `setFlowScreen`.
- **Condiciones que evalúa** `ausencia de thread.public_id o workflowSaving`, `ausencia de response.ok`.
- **Llamadas directas en el cuerpo** [`setWorkflowSaving`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1478), [`setOpeningStepError`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1479), [`persistWorkflowAction`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1480), [`setThread`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1486), [`setFlowScreen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1495).
- **Lo usa** [`onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2484) (llama).

#### [`handleResolutionMessageSent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1498) · función · asíncrona · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Maneja `Resolution Message Sent` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setWorkflowSaving`, `setOpeningStepError`, `clearTimeout`, `setResolutionSendReminderOpen`, `setFlowScreen`.
- **Efectos y APIs** `globalThis.clearTimeout`.
- **Condiciones que evalúa** `ausencia de thread.public_id o workflowSaving`, `ausencia de response.ok`, `resolutionSendReminderTimerRef.current`.
- **Llamadas directas en el cuerpo** [`setWorkflowSaving`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1500), [`setOpeningStepError`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1501), [`persistWorkflowAction`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1502), [`globalThis.clearTimeout`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1509), [`setResolutionSendReminderOpen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1511), [`setFlowScreen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1512).
- **Lo usa** [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2241) (llama), [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2943) (llama).

#### [`handleStartClosingFlow`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1515) · función · asíncrona · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Maneja `Start Closing Flow` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setOpeningStepError`, `setClosingFocusedMacro`, `setFlowScreen`.
- **Condiciones que evalúa** `ausencia de ok`.
- **Llamadas directas en el cuerpo** [`setOpeningStepError`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1516), [`handleStatus`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1517), [`setClosingFocusedMacro`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1522), [`setFlowScreen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1523).
- **Lo usa** [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2251) (llama).

#### [`handleBackToResolutionFollowup`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1526) · función · asíncrona · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Maneja `Back To Resolution Followup` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setOpeningStepError`, `setClosingFocusedMacro`, `setFlowScreen`.
- **Condiciones que evalúa** `ausencia de ok`.
- **Llamadas directas en el cuerpo** [`setOpeningStepError`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1527), [`handleStatus`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1528), [`setClosingFocusedMacro`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1533), [`setFlowScreen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1534).
- **Lo usa** [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2287) (llama).

#### [`handleClosingMessageSent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1537) · función · asíncrona · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Maneja `Closing Message Sent` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setWorkflowSaving`, `setOpeningStepError`, `setClosingMessageSentAt`, `setClosingFocusedMacro`, `setFlowScreen`.
- **Condiciones que evalúa** `ausencia de thread.public_id o workflowSaving`, `ausencia de response.ok`.
- **Llamadas directas en el cuerpo** [`setWorkflowSaving`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1539), [`setOpeningStepError`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1540), [`persistWorkflowAction`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1541), [`pickFirstString`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1547), [`toISOString`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1547), [`setClosingMessageSentAt`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1548), [`setClosingFocusedMacro`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1549), [`setFlowScreen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1550).
- **Lo usa** [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2302) (llama).

#### [`handleBackToIssueDecision`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1553) · función · asíncrona · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Maneja `Back To Issue Decision` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setOpeningStepError`, `setClosingFocusedMacro`, `setFlowScreen`.
- **Condiciones que evalúa** `ausencia de ok`.
- **Llamadas directas en el cuerpo** [`setOpeningStepError`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1554), [`handleStatus`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1555), [`setClosingFocusedMacro`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1560), [`setFlowScreen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1561).
- **Lo usa** [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2324) (llama), [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2354) (llama).

#### [`handleCloseOutcome`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1564) · función · asíncrona · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Maneja `Close Outcome` y coordina las acciones indicadas abajo.

- **Entradas** `outcome`.
- **Actualizaciones de estado o acciones** `setOpeningStepError`, `setWorkflowSaving`, `setThread`, `setFlowScreen`, `setResolutionFocusedMacro`, `setOpeningFocusedMacro`, `setClosingFocusedMacro`.
- **Condiciones que evalúa** `ausencia de closingComment`, `ausencia de thread.public_id o workflowSaving`, `ausencia de response.ok`, `ausencia de closeResult.ok`.
- **Usa código de** [`closeSupportThread`](../../../packages/support-sdk/src/supportClient.js#L143) (llama).
- **Llamadas directas en el cuerpo** [`closingCommentDraft.trim`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1565), [`setOpeningStepError`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1567), [`setWorkflowSaving`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1572), [`persistWorkflowAction`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1574), [`closeSupportThread`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1584), [`setThread`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1596), [`setFlowScreen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1603), [`setResolutionFocusedMacro`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1604), [`setOpeningFocusedMacro`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1605), [`setClosingFocusedMacro`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1606), [`refreshCatalog`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1607).
- **Lo usa** [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2366) (llama), [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2376) (llama).

#### [`handleIssueContextSet`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1610) · función · asíncrona · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Maneja `Issue Context Set` y coordina las acciones indicadas abajo.

- **Entradas** `mode`.
- **Actualizaciones de estado o acciones** `setOpeningStepError`, `setWorkflowSaving`, `setFlowScreen`.
- **Condiciones que evalúa** `ausencia de thread.public_id o workflowSaving`, `ausencia de newIssueReasonDraft.trim`, `ausencia de response.ok`.
- **Llamadas directas en el cuerpo** [`newIssueReasonDraft.trim`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1612), [`setOpeningStepError`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1613), [`setWorkflowSaving`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1616), [`persistWorkflowAction`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1618), [`setFlowScreen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1628).
- **Lo usa** [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2415) (llama), [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2425) (llama).

#### [`handleInfoMessageSent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1631) · función · asíncrona · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Maneja `Info Message Sent` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setWorkflowSaving`, `setOpeningStepError`, `setFlowScreen`.
- **Condiciones que evalúa** `ausencia de thread.public_id o workflowSaving`, `ausencia de response.ok`.
- **Llamadas directas en el cuerpo** [`setWorkflowSaving`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1633), [`setOpeningStepError`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1634), [`persistWorkflowAction`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1635), [`newIssueReasonDraft.trim`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1636), [`setFlowScreen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1644).
- **Lo usa** [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2456) (llama).

#### [`availableCategories`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1648) · cálculo memorizado · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Función auxiliar de `SupportTicket` para `available Categories`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`filter`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1649), [`map`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1649), [`toLowerCase`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1651), [`pickFirstString`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1655).
- **Lo usa** [`categoryOptions`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1663) (accede al módulo).

#### [`categoryOptions`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1661) · cálculo memorizado · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Función auxiliar de `SupportTicket` para `category Options`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de item.code`, `currentCode y ausencia de byCode.has`.
- **Llamadas directas en el cuerpo** [`availableCategories.forEach`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1663), [`byCode.set`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1665), [`pickFirstString`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1667), [`byCode.has`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1668), [`formatSupportCategoryLabel`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1671), [`byCode.values`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1674).
- **Lo usa** [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1679) (accede al módulo), [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1682) (referencia).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1676) · callback de infraestructura · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportTicket`.

- **Actualizaciones de estado o acciones** `setNewIssueCategoryDraft`.
- **Condiciones que evalúa** `flowScreen`, `newIssueCategoryDraft`, `ausencia de fallbackCategory`.
- **Llamadas directas en el cuerpo** [`pickFirstString`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1679), [`setNewIssueCategoryDraft`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1681).

#### [`useEffect · callback`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1683) · callback de infraestructura · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportTicket`.

- **Actualizaciones de estado o acciones** `setNewIssueInfoFocusedMacro`.
- **Condiciones que evalúa** `flowScreen`.
- **Llamadas directas en el cuerpo** [`setNewIssueInfoFocusedMacro`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1685).

#### [`renderModalLayer`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1749) · función · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Función auxiliar de `SupportTicket` para `render Modal Layer`.

- **Entradas** `node`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `undefined o ausencia de document.body`.
- **Llamadas directas en el cuerpo** [`createPortal`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1751).
- **Lo usa** [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2918) (llama).

#### [`renderMacroSuggestionsContent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1753) · función · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Prepara contenido JSX usando `button`, `RefreshCw`, `ClipboardCheck`, `Copy`.

- **Entradas** `{focusedMacro, onBack, overlay} = valor por defecto`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `RefreshCw`, `ClipboardCheck`, `Copy`, `ChevronRight`, `ChevronDown`.
- **Llamadas directas en el cuerpo** [`macroGroups.map`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1824), [`group.items.map`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1847).
- **Lo usa** [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2471) (llama).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1765) · callback JSX · dentro de [`renderMacroSuggestionsContent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1753)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`refreshCatalog`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1766).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1788) · callback JSX · dentro de [`renderMacroSuggestionsContent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1753)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleCopy`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1788).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1833) · callback JSX · dentro de [`renderMacroSuggestionsContent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1753)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`toggleMacroGroup`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1833).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1858) · callback JSX · dentro de [`renderMacroSuggestionsContent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1753)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleCopy`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1858).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1923) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleStatus`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1923).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1939) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigate`.
- **Llamadas directas en el cuerpo** [`navigate`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L1939).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2078) · callback JSX · asíncrona · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigator.clipboard.writeText`.
- **Llamadas directas en el cuerpo** [`navigator.clipboard.writeText`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2080).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2094) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleStartingContinue`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2095).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2200) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleOpeningStepSubmit`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2201).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2220) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleMacroFlowUserResponded`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2221).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2240) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleResolutionMessageSent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2241).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2250) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleStartClosingFlow`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2251).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2270) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleMacroFlowUserResponded`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2271).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2286) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleBackToResolutionFollowup`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2287).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2301) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleClosingMessageSent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2302).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2323) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleBackToIssueDecision`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2324).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2332) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setFlowScreen`.
- **Llamadas directas en el cuerpo** [`setFlowScreen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2332).

#### [`textarea.onChange`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2346) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `textarea.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setClosingCommentDraft`.
- **Llamadas directas en el cuerpo** [`setClosingCommentDraft`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2346).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2353) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleBackToIssueDecision`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2354).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2365) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleCloseOutcome`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2366).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2375) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleCloseOutcome`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2376).

#### [`textarea.onChange`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2394) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `textarea.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setNewIssueReasonDraft`.
- **Llamadas directas en el cuerpo** [`setNewIssueReasonDraft`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2394).

#### [`select.onChange`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2401) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setNewIssueCategoryDraft`.
- **Llamadas directas en el cuerpo** [`setNewIssueCategoryDraft`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2401).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2414) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleIssueContextSet`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2415).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2424) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleIssueContextSet`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2425).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2442) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setFlowScreen`.
- **Llamadas directas en el cuerpo** [`setFlowScreen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2442).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2455) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleInfoMessageSent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2456).

#### [`onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2483) · función · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Maneja `Click` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`handleOpeningResetForRecopy`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2484).

#### [`onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2502) · función · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Maneja `Click` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setFlowScreen`, `setResolutionSendReminderOpen`.
- **Llamadas directas en el cuerpo** [`setFlowScreen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2503), [`setResolutionSendReminderOpen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2504).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2675) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setExpandedTimelineSegmentId`.
- **Condiciones que evalúa** `shouldIgnoreTimelineClick`, `canToggleResolvingFromBlock`, `isExpanded`.
- **Llamadas directas en el cuerpo** [`shouldIgnoreTimelineClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2676), [`toggleLaneExpanded`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2678), [`setExpandedTimelineSegmentId`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2679).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2747) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setExpandedTimelineSegmentId`.
- **Condiciones que evalúa** `shouldIgnoreTimelineClick`.
- **Llamadas directas en el cuerpo** [`event.stopPropagation`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2748), [`shouldIgnoreTimelineClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2749), [`toggleLaneExpanded`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2750), [`setExpandedTimelineSegmentId`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2751).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2802) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setExpandedTimelineSegmentId`.
- **Condiciones que evalúa** `shouldIgnoreTimelineClick`.
- **Llamadas directas en el cuerpo** [`shouldIgnoreTimelineClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2803), [`setExpandedTimelineSegmentId`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2804).

#### [`textarea.onChange`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2845) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `textarea.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setNoteDraft`.
- **Llamadas directas en el cuerpo** [`setNoteDraft`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2845).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2931) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Condiciones que evalúa** `resolutionReminderMacro`.
- **Llamadas directas en el cuerpo** [`executeMacroCopy`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2933).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2942) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleResolutionMessageSent`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2943).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2951) · callback JSX · dentro de [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setResolutionSendReminderOpen`.
- **Llamadas directas en el cuerpo** [`setResolutionSendReminderOpen`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L2951).

### [`packages/support-sdk/src/agent/SupportTopbar.jsx`](../../../packages/support-sdk/src/agent/SupportTopbar.jsx#L1)

Cabecera del agente con navegación y controles de estado.

**Superficie que exporta.** [`SupportTopbar`](../../../packages/support-sdk/src/agent/SupportTopbar.jsx#L17).

**Módulos que lo cargan.** [`SupportLayout.jsx`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L4) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../store/appStore`](../../../packages/support-sdk/store/appStore.js).

#### [`resolveEnvironmentLabel`](../../../packages/support-sdk/src/agent/SupportTopbar.jsx#L5) · función

Obtiene o resuelve `Environment Label` para entregarlo al consumidor.

- **Condiciones que evalúa** `envRaw`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../packages/support-sdk/src/agent/SupportTopbar.jsx#L6).
- **Lo usa** [`SupportTopbar`](../../../packages/support-sdk/src/agent/SupportTopbar.jsx#L25) (llama).

#### [`SupportTopbar`](../../../packages/support-sdk/src/agent/SupportTopbar.jsx#L17) · componente React · exportación por defecto

Monta `button`, `Menu`, `ShieldCheck`, `RefreshCcw`, `Bell`, `LogOut`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, subtitle, onOpenMenu, onRefreshPanel}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `logout mediante useAppStore`, `selector s.logout`.
- **Interfaz que monta** `button`, `Menu`, `ShieldCheck`, `RefreshCcw`, `Bell`, `LogOut`.
- **Hooks que llama** `useAppStore`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama).
- **Llamadas directas en el cuerpo** [`resolveEnvironmentLabel`](../../../packages/support-sdk/src/agent/SupportTopbar.jsx#L25), [`toUpperCase`](../../../packages/support-sdk/src/agent/SupportTopbar.jsx#L27), [`join`](../../../packages/support-sdk/src/agent/SupportTopbar.jsx#L27), [`map`](../../../packages/support-sdk/src/agent/SupportTopbar.jsx#L27), [`slice`](../../../packages/support-sdk/src/agent/SupportTopbar.jsx#L27), [`split`](../../../packages/support-sdk/src/agent/SupportTopbar.jsx#L27).
- **Lo usa** [`SupportLayout`](../../../packages/support-sdk/src/agent/SupportLayout.jsx#L80) (renderiza).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTopbar.jsx#L41) · callback JSX · dentro de [`SupportTopbar`](../../../packages/support-sdk/src/agent/SupportTopbar.jsx#L17)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onOpenMenu`](../../../packages/support-sdk/src/agent/SupportTopbar.jsx#L41).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTopbar.jsx#L66) · callback JSX · dentro de [`SupportTopbar`](../../../packages/support-sdk/src/agent/SupportTopbar.jsx#L17)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onRefreshPanel`](../../../packages/support-sdk/src/agent/SupportTopbar.jsx#L66).

#### [`button.onClick`](../../../packages/support-sdk/src/agent/SupportTopbar.jsx#L97) · callback JSX · dentro de [`SupportTopbar`](../../../packages/support-sdk/src/agent/SupportTopbar.jsx#L17)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`logout`](../../../packages/support-sdk/src/agent/SupportTopbar.jsx#L97).
