# PWA principal · Admin y operación · 6 de 9

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1)
- [`apps/referidos-app/src/admin/support/AdminSupportDesk.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L1)
- [`apps/referidos-app/src/admin/support/AdminSupportTicket.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportTicket.jsx#L1)
- [`apps/referidos-app/src/admin/support/AdminSupportTicketsPanel.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportTicketsPanel.jsx#L1)
- [`apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L1)
- [`apps/referidos-app/src/admin/usuarios/usuarioCliente.js`](../../../apps/referidos-app/src/admin/usuarios/usuarioCliente.js#L1)
- [`apps/referidos-app/src/admin/usuarios/UsuarioDrawer.jsx`](../../../apps/referidos-app/src/admin/usuarios/UsuarioDrawer.jsx#L1)
- [`apps/referidos-app/src/admin/usuarios/usuarioNegocio.js`](../../../apps/referidos-app/src/admin/usuarios/usuarioNegocio.js#L1)
- [`apps/referidos-app/src/admin/usuarios/usuariosCliente.ts`](../../../apps/referidos-app/src/admin/usuarios/usuariosCliente.ts#L1)
- [`apps/referidos-app/src/admin/usuarios/usuariosNegocio.ts`](../../../apps/referidos-app/src/admin/usuarios/usuariosNegocio.ts#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1)

Cruza hilos, eventos y cachés de macros para mostrar el estado de operación del soporte.

**Superficie que exporta.** [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293).

**Módulos que lo cargan.** [`AdminSupportTicketsPanel.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportTicketsPanel.jsx#L2) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, `react-router-dom`, [`../layout/AdminLayout`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`./services/supportMacrosOpsService`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js).

#### [`ACTIVE`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L31) · variable de módulo

Conserva la lista de `ACTIVE` usada por el módulo.

- **Lo usa** [`activeTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L559) (accede al módulo).

#### [`FLOW`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L32) · variable de módulo

Conserva la lista de `FLOW` usada por el módulo.

- **Lo usa** [`visitedFlow`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1216) (accede al módulo), [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2035) (accede al módulo).

#### [`STATUS_LABEL`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L33) · variable de módulo

Agrupa la configuración o catálogo de `STATUS LABEL` para que sus consumidores lean claves comunes.

- **Campos o contexto** `new`, `starting`, `assigned`, `in_progress`, `waiting_user`, `queued`, `closed`, `cancelled`.
- **Lo usa** [`MACRO_STATUS_LABEL`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L45) (referencia), [`renderAdvancedTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1306) (accede al módulo), [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2023) (accede al módulo).

#### [`MACRO_STATUS_ORDER`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L43) · variable de módulo

Conserva la lista de `MACRO STATUS ORDER` usada por el módulo.

- **Lo usa** [`statusRank`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L62) (accede al módulo).

#### [`MACRO_STATUS_LABEL`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L44) · variable de módulo

Agrupa la configuración o catálogo de `MACRO STATUS LABEL` para que sus consumidores lean claves comunes.

- **Campos o contexto** `sin_estado`.
- **Lo usa** [`groupedByStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1014) (accede al módulo), [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2211) (accede al módulo).

#### [`CATALOG_GROUP_OPTIONS`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L48) · variable de módulo

Conserva la lista de `CATALOG GROUP OPTIONS` usada por el módulo.

- **Lo usa** [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2138) (accede al módulo).

#### [`CATEGORY_STATUS_OPTIONS`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L53) · variable de módulo

Conserva la lista de `CATEGORY STATUS OPTIONS` usada por el módulo.

- **Lo usa** [`changeCategoryStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1158) (accede al módulo).

#### [`CATEGORY_APP_OPTIONS`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L54) · variable de módulo

Conserva la lista de `CATEGORY APP OPTIONS` usada por el módulo.

- **Lo usa** [`formatCategoryTargets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1050) (accede al módulo), [`renderTicketCategories`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1799) (accede al módulo).

#### [`SEV_RANK`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L60) · variable de módulo

Agrupa la configuración o catálogo de `SEV RANK` para que sus consumidores lean claves comunes.

- **Campos o contexto** `s0`, `s1`, `s2`, `s3`.
- **Lo usa** [`activeTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L561) (accede al módulo).

#### [`statusRank`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L61) · función

Implementa `status Rank` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `status`.
- **Llamadas directas en el cuerpo** [`MACRO_STATUS_ORDER.indexOf`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L62).
- **Lo usa** [`groupedByStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1009) (llama), [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2164) (llama).

#### [`roleLabel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L65) · función

Implementa `role Label` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `role`.
- **Condiciones que evalúa** `ausencia de role`.
- **Lo usa** [`categoriesStats`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L925) (llama), [`groupedByRole`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1024) (llama), [`formatMacroRoles`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1042) (llama).

#### [`roleRank`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L69) · función

Implementa `role Rank` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `role`.
- **Llamadas directas en el cuerpo** [`base.indexOf`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L71).
- **Lo usa** [`categoriesStats`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L955) (llama), [`groupedByRole`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1031) (llama).

#### [`THREAD_STATUS_VALUES`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L74) · variable de módulo

Conserva la lista de `THREAD STATUS VALUES` usada por el módulo.

- **Lo usa** [`normalizeThreadStatusCandidate`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L140) (accede al módulo).

#### [`TERMINAL_THREAD_STATUSES`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L75) · variable de módulo

Declara `TERMINAL_THREAD_STATUSES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`TIMELINE_DEFAULT_SEQUENCE`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L76) · variable de módulo

Conserva la lista de `TIMELINE DEFAULT SEQUENCE` usada por el módulo.

- **Lo usa** [`timelineRows`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L720) (referencia).

#### [`TIMELINE_RECOVERY_SEQUENCE`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L77) · variable de módulo

Conserva la lista de `TIMELINE RECOVERY SEQUENCE` usada por el módulo.

- **Lo usa** [`timelineRows`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L719) (referencia).

#### [`TIMELINE_RELEASE_EVENT_TYPES`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L78) · variable de módulo

Declara `TIMELINE_RELEASE_EVENT_TYPES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`timelineRows`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L630) (accede al módulo).

#### [`TERMINAL_TIMELINE_STATUSES`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L79) · variable de módulo

Declara `TERMINAL_TIMELINE_STATUSES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`timelineRows`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L704) (accede al módulo).

#### [`TIMELINE_BLOCK_LABELS`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L80) · variable de módulo

Agrupa la configuración o catálogo de `TIMELINE BLOCK LABELS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `new`, `starting`, `assigned`, `in_progress`, `waiting_user`, `queued`, `postponed`, `released`, `closed`, `cancelled`.
- **Lo usa** [`createSegment`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L583) (accede al módulo).

#### [`EVENT_TYPE_LABELS`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L92) · variable de módulo

Agrupa la configuración o catálogo de `EVENT TYPE LABELS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `created`, `assigned`, `status_changed`, `waiting_user`, `resumed`, `queued`, `closed`, `note_added`, `agent_timeout_release`, `agent_manual_release`, `cancelled`, `linked_to_user`.
- **Lo usa** [`renderAdvancedTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1454) (accede al módulo).

#### [`TIMELINE_BLOCK_REACHED_CLASSES`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L106) · variable de módulo

Agrupa la configuración o catálogo de `TIMELINE BLOCK REACHED CLASSES` para que sus consumidores lean claves comunes.

- **Campos o contexto** `new`, `starting`, `assigned`, `in_progress`, `waiting_user`, `queued`, `postponed`, `released`, `closed`, `cancelled`.
- **Lo usa** [`renderAdvancedTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1341) (accede al módulo).

#### [`normalizeThreadStatusCandidate`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L118) · función

Normaliza `Thread Status Candidate` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `null`.
- **Efectos y APIs** `raw.replace`.
- **Condiciones que evalúa** `string`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L120), [`value.trim`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L120), [`raw.replace`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L121), [`THREAD_STATUS_VALUES.includes`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L140).
- **Lo usa** [`deriveNextThreadStatusFromEvent`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L149) (llama), [`timelineRows`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L653) (llama).

#### [`deriveNextThreadStatusFromEvent`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L142) · función

Implementa `derive Next Thread Status From Event` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `event`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de event o object`, `ausencia de type`, `type`, `statusFromType`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L144), [`event.event_type.trim`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L144), [`normalizeThreadStatusCandidate`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L149).
- **Lo usa** [`timelineRows`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L637) (llama).

#### [`getEventDetails`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L160) · función

Obtiene o resuelve `Event Details` para entregarlo al consumidor.

- **Entradas** `event`.
- **Lo usa** [`deriveQueueKindFromEvent`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L172) (llama).

#### [`normalizeQueueKind`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L163) · función

Normaliza `Queue Kind` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `null`.
- **Efectos y APIs** `replace`.
- **Condiciones que evalúa** `string`, `ausencia de normalized`, `includes`.
- **Llamadas directas en el cuerpo** [`replace`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L165), [`toLowerCase`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L165), [`value.trim`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L165), [`includes`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L167).
- **Lo usa** [`deriveQueueKindFromEvent`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L177) (llama).

#### [`deriveQueueKindFromEvent`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L171) · función

Implementa `derive Queue Kind From Event` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `event`, `thread`.
- **Condiciones que evalúa** `boolean`, `queueKind`, `eventType y thread.status`, `thread.personal_queue o Boolean`.
- **Llamadas directas en el cuerpo** [`getEventDetails`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L172), [`normalizeQueueKind`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L177), [`toLowerCase`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L182), [`event.event_type.trim`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L182).
- **Lo usa** [`timelineRows`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L640) (llama).

#### [`statusToTimelineStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L188) · función

Implementa `status To Timeline Status` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `status`, `queueKind = valor por defecto`.
- **Condiciones que evalúa** `status`.
- **Lo usa** [`splitLaneToQueue`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L618) (llama), [`timelineRows`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L641) (llama).

#### [`buildCollapsedResolvingLane`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L192) · función

Construye `Collapsed Resolving Lane` a partir de los datos del flujo.

- **Entradas** `segments`.
- **Retorno visible o tipo declarado** `hasCollapsedResolving`, `collapsedSegments`, `collapsedSegmentId`.
- **Efectos y APIs** `resolvingIndexes.push`.
- **Condiciones que evalúa** `segment.status`, `resolvingIndexes.length`, `lastIndex`.
- **Llamadas directas en el cuerpo** [`segments.forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L194), [`resolvingIndexes.push`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L195), [`segments.slice`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L213), [`groupedSegments.flatMap`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L219).
- **Lo usa** [`renderAdvancedTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1246) (llama).

#### [`fmt`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L233) · función

Implementa `fmt` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `v`.
- **Condiciones que evalúa** `ausencia de v`, `Number.isNaN`.
- **Llamadas directas en el cuerpo** [`d.getTime`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L236), [`d.toLocaleString`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L237).
- **Lo usa** [`renderAdvancedTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1425) (llama), [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2024) (llama).

#### [`mins`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L239) · función

Implementa `mins` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `a`, `b`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `Number.isNaN o y`.
- **Llamadas directas en el cuerpo** [`getTime`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L240).
- **Lo usa** [`metrics`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L766) (llama).

#### [`hoursAgo`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L245) · función

Implementa `hours Ago` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `a`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `Number.isNaN`.
- **Llamadas directas en el cuerpo** [`getTime`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L246).
- **Lo usa** [`metrics`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L806) (llama), [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2081) (llama).

#### [`avg`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L250) · función

Implementa `avg` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `arr`.
- **Llamadas directas en el cuerpo** [`arr.reduce`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L250).
- **Lo usa** [`metrics`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L845) (llama).

#### [`short`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L251) · función

Implementa `short` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `t`, `n = valor por defecto`.
- **Condiciones que evalúa** `ausencia de s`.
- **Llamadas directas en el cuerpo** [`t.trim`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L252), [`s.slice`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L254).
- **Lo usa** [`renderAdvancedTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1303) (llama), [`renderCatalogMacroCard`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1850) (llama), [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2021) (llama).

#### [`nameOf`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L256) · función

Implementa `name Of` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `u`.
- **Condiciones que evalúa** `ausencia de u`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L258).
- **Lo usa** [`metrics`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L851) (llama), [`renderAdvancedTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1459) (llama), [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2027) (llama).

#### [`Metric`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L262) · componente React

Monta `Icon`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, value, hint, icon}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Icon`.
- **Lo usa** [`renderAdvancedTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1478) (renderiza), [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2078) (renderiza).

#### [`Card`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L275) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{title, subtitle, headerRight, children}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`renderAdvancedTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1232) (renderiza), [`renderTicketCategories`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1599) (renderiza), [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1901) (renderiza).

#### [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293) · componente React · exportación por defecto

Monta `AdminLayout`, `button`, `RefreshCw`, `Card`, `ArrowLeft`, `React.Fragment`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{lockedPanel, title, subtitle}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[panel, setPanel] mediante useState`, `[viewByPanel, setViewByPanel] mediante useState`, `[ticketsTab, setTicketsTab] mediante useState`, `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[error, setError] mediante useState`, `[categoryError, setCategoryError] mediante useState`, `[categoryOk, setCategoryOk] mediante useState`, `[categorySaving, setCategorySaving] mediante useState`, `[categoryEditId, setCategoryEditId] mediante useState`, `[categoryFormMode, setCategoryFormMode] mediante useState`, `[categoryForm, setCategoryForm] mediante useState`, `[threads, setThreads] mediante useState`, `[events, setEvents] mediante useState` y 11 más.
- **Interfaz que monta** `AdminLayout`, `button`, `RefreshCw`, `Card`, `ArrowLeft`, `React.Fragment`, `Metric`, `ChevronUp`, `ChevronDown`.
- **Hooks que llama** `useLocation`, `useNavigate`, `useState`, `useRef`, `useEffect`.
- **Condiciones que evalúa** `undefined`.
- **Usa código de** [`AdminLayout`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L10) (renderiza).
- **Llamadas directas en el cuerpo** [`get`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L304), [`map`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1861), [`renderTicketCategories`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2003), [`renderAdvancedTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2003), [`short`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2021), [`fmt`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2024), [`nameOf`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2027), [`FLOW.map`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2035), [`visitedFlow.has`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2037), [`reverse`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2060), [`activeTickets.filter`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2079), [`hoursAgo`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2081) y 15 más.
- **Lo usa** [`AdminSupportTicketsPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportTicketsPanel.jsx#L6) (renderiza).

#### [`load`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L335) · callback React · asíncrona · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Consulta o invoca tabla o vista [`support_threads`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L251) y coordina las demás operaciones de esta ficha.

- **Entradas** `manual = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`, `setLoading`, `setError`, `setThreads`, `setEvents`, `setInbox`, `setMacros`, `setMacroCategories`, `setUsersById`.
- **Condiciones que evalúa** `manual`, `ids.length`, `tRes.error o eRes.error o mRes.error o iRes.error o cRes.error`.
- **Contrato de datos** tabla o vista [`support_threads`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L251) (`select`) en [`AdminSupportControlPanel.jsx:346`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L346), tabla o bucket [`support_threads`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L251) en [`AdminSupportControlPanel.jsx:346`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L346), tabla o vista [`support_thread_events`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L300) (`select`) en [`AdminSupportControlPanel.jsx:353`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L353), tabla o bucket [`support_thread_events`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L300) en [`AdminSupportControlPanel.jsx:353`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L353), tabla o vista [`support_threads_inbox`](../../../apps/referidos-app/supabase/migrations/20260327_000046_support_handoff_abandonment.sql#L138) (`select`) en [`AdminSupportControlPanel.jsx:358`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L358), tabla o bucket [`support_threads_inbox`](../../../apps/referidos-app/supabase/migrations/20260327_000046_support_handoff_abandonment.sql#L138) en [`AdminSupportControlPanel.jsx:358`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L358), tabla o vista [`support_macros_cache`](../../../apps/referidos-app/supabase/migrations/20260304_000026_support_macros_cache_sync.sql#L36) (`select`) en [`AdminSupportControlPanel.jsx:363`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L363), tabla o bucket [`support_macros_cache`](../../../apps/referidos-app/supabase/migrations/20260304_000026_support_macros_cache_sync.sql#L36) en [`AdminSupportControlPanel.jsx:363`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L363), tabla o vista [`support_macro_categories_cache`](../../../apps/referidos-app/supabase/migrations/20260304_000026_support_macros_cache_sync.sql#L6) (`select`) en [`AdminSupportControlPanel.jsx:371`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L371), tabla o bucket [`support_macro_categories_cache`](../../../apps/referidos-app/supabase/migrations/20260304_000026_support_macros_cache_sync.sql#L6) en [`AdminSupportControlPanel.jsx:371`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L371), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`AdminSupportControlPanel.jsx:436`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L436), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`AdminSupportControlPanel.jsx:436`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L436).
- **Usa código de** [`listSupportMacroCatalog`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L24) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L336), [`setLoading`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L337), [`setError`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L338), [`catch`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L340), [`listSupportMacroCatalog`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L340), [`limit`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L346), [`order`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L346), [`select`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L346), [`supabase.from`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L346), [`map`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L380), [`filter`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L428), [`nextThreads.map`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L429) y 9 más.
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L472) (llama), [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L473) (referencia), [`submitCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1144) (llama), [`changeCategoryStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1173) (llama), [`removeCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1202) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1886) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1958) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L471) · callback de infraestructura · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSupportControlPanel`.

- **Llamadas directas en el cuerpo** [`load`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L472).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L475) · callback de infraestructura · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSupportControlPanel`.

- **Actualizaciones de estado o acciones** `setExpandedResolvingByLane`, `clearTimeout`.
- **Efectos y APIs** `clearTimeout`.
- **Condiciones que evalúa** `timerId`.
- **Llamadas directas en el cuerpo** [`setExpandedResolvingByLane`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L476), [`forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L477), [`clearTimeout`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L478).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L484) · callback de infraestructura · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSupportControlPanel`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `clearTimeout`.
- **Condiciones que evalúa** `timerId`.
- **Llamadas directas en el cuerpo** [`forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L485), [`clearTimeout`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L486).

#### [`resetCategoryForm`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L498) · callback React · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setCategoryFormMode`, `setCategoryEditId`, `setCategoryForm`.
- **Llamadas directas en el cuerpo** [`setCategoryFormMode`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L499), [`setCategoryEditId`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L500), [`setCategoryForm`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L501).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L996) (llama), [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L998) (referencia), [`submitCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1143) (llama), [`removeCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1200) (llama), [`renderTicketCategories`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1731) (pasa a onClick).

#### [`setTicketsTabWithUrl`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L510) · callback React · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Aplica o guarda `Tickets Tab With Url` para que el estado refleje la operación.

- **Entradas** `nextTab`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setTicketsTab`.
- **Efectos y APIs** `navigate`.
- **Condiciones que evalúa** `ausencia de isTicketsLocked`, `normalized`.
- **Llamadas directas en el cuerpo** [`setTicketsTab`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L512), [`params.set`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L515), [`params.delete`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L516), [`params.toString`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L517), [`navigate`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L518).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1943) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L529) · callback de infraestructura · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSupportControlPanel`.

- **Actualizaciones de estado o acciones** `setTicketsTab`.
- **Condiciones que evalúa** `ausencia de isTicketsLocked`.
- **Llamadas directas en el cuerpo** [`get`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L531), [`setTicketsTab`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L532).

#### [`inboxByPublic`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L536) · cálculo memorizado · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Función auxiliar de `AdminSupportControlPanel` para `inbox By Public`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`inbox.reduce`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L536).
- **Lo usa** [`metrics`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L813) (accede al módulo), [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2029) (accede al módulo).

#### [`byPublic`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L540) · cálculo memorizado · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Función auxiliar de `AdminSupportControlPanel` para `by Public`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`threads.reduce`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L540).
- **Lo usa** [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L567) (accede al módulo).

#### [`eventsByThread`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L543) · cálculo memorizado · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Función auxiliar de `AdminSupportControlPanel` para `events By Thread`.

- **Hooks que llama** `useMemo`.
- **Efectos y APIs** `out.e.thread_id.push`.
- **Condiciones que evalúa** `ausencia de e.thread_id`, `ausencia de out.e.thread_id`.
- **Llamadas directas en el cuerpo** [`events.forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L545), [`out.e.thread_id.push`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L548), [`forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L550), [`arr.sort`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L551), [`getTime`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L551).
- **Lo usa** [`selectedTimeline`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L569) (accede al módulo), [`timelineRows`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L577) (accede al módulo), [`metrics`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L761) (accede al módulo).

#### [`activeTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L557) · cálculo memorizado · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Función auxiliar de `AdminSupportControlPanel` para `active Tickets`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`sort`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L558), [`threads.filter`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L558), [`ACTIVE.includes`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L559), [`getTime`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L562).
- **Lo usa** [`metrics`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L779) (accede al módulo), [`categoriesStats`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L908) (accede al módulo), [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2078) (accede al módulo).

#### [`selectedTimeline`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L569) · cálculo memorizado · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Procesa `ed Timeline` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`visitedFlow`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1215) (accede al módulo), [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2060) (referencia).

#### [`timelineRows`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L572) · cálculo memorizado · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Función auxiliar de `AdminSupportControlPanel` para `timeline Rows`.

- **Retorno visible o tipo declarado** `threadId`, `threadPublicId`, `threadStatus`, `summary`, `lanes`.
- **Hooks que llama** `useMemo`.
- **Efectos y APIs** `current.events.push`, `currentLane.segments.push`, `displaySegments.push`.
- **Condiciones que evalúa** `ausencia de current`, `TIMELINE_RELEASE_EVENT_TYPES.has`, `ausencia de nextStatus`, `ausencia de nextTimelineStatus o nextTimelineStatus`, `nextStatus`, `currentThreadStatus`, `ausencia de current o currentTimelineStatus`, `current` y 3 más.
- **Llamadas directas en el cuerpo** [`sort`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L573), [`getTime`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L574), [`sortedThreads.map`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L576), [`createLane`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L601), [`toISOString`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L603), [`orderedEvents.forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L621), [`toLowerCase`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L622), [`event.event_type.trim`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L622), [`getCurrentSegment`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L624), [`TIMELINE_RELEASE_EVENT_TYPES.has`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L630), [`splitLaneToQueue`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L631), [`current.events.push`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L635) y 19 más.
- **Lo usa** [`renderAdvancedTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1236) (accede al módulo).

#### [`createSegment`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L580) · función · dentro de [`timelineRows`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L572)

Construye `Segment` a partir de los datos del flujo.

- **Entradas** `status`, `startedAt`, `isReached = valor por defecto`, `queueKind = valor por defecto`.
- **Retorno visible o tipo declarado** `id`, `status`, `label`, `startedAt`, `endedAt`, `events`, `isReached`, `queueKind`.
- **Lo usa** [`createLane`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L595) (llama), [`splitLaneToQueue`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L612) (llama), [`timelineRows`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L650) (llama).

#### [`createLane`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L591) · función · dentro de [`timelineRows`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L572)

Construye `Lane` a partir de los datos del flujo.

- **Entradas** `firstStatus`, `startedAt`, `queueKind = valor por defecto`.
- **Efectos y APIs** `lanes.push`.
- **Llamadas directas en el cuerpo** [`createSegment`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L595), [`lanes.push`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L597).
- **Lo usa** [`timelineRows`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L601) (llama), [`splitLaneToQueue`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L618) (llama).

#### [`getCurrentSegment`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L606) · función · dentro de [`timelineRows`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L572)

Obtiene o resuelve `Current Segment` para entregarlo al consumidor.

- **Lo usa** [`splitLaneToQueue`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L608) (llama), [`timelineRows`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L624) (llama).

#### [`splitLaneToQueue`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L607) · función · dentro de [`timelineRows`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L572)

Función auxiliar de `timelineRows` para `split Lane To Queue`.

- **Entradas** `transitionAt`, `queueKind = valor por defecto`, `eventForRelease = valor por defecto`.
- **Efectos y APIs** `releaseSegment.events.push`, `currentLane.segments.push`.
- **Condiciones que evalúa** `current`, `eventForRelease`.
- **Llamadas directas en el cuerpo** [`getCurrentSegment`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L608), [`createSegment`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L612), [`releaseSegment.events.push`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L614), [`currentLane.segments.push`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L617), [`createLane`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L618), [`statusToTimelineStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L618).
- **Lo usa** [`timelineRows`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L631) (llama).

#### [`orderStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L721) · función · dentro de [`timelineRows`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L572)

Función auxiliar de `timelineRows` para `order Status`.

- **Entradas** `status`.
- **Lo usa** [`timelineRows`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L723) (llama).

#### [`metrics`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L754) · cálculo memorizado · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Función auxiliar de `AdminSupportControlPanel` para `metrics`.

- **Retorno visible o tipo declarado** `sla`, `workload`, `queue`, `quality`, `risk`, `audit`, `config`.
- **Hooks que llama** `useMemo`.
- **Efectos y APIs** `firstResponse.push`, `queueToAssigned.push`.
- **Condiciones que evalúa** `a`, `b`, `ausencia de t.assigned_agent_id`, `ausencia de t.assigned_agent_id o Number.isNaN`, `closeTs`, `ausencia de key`, `ausencia de t.user_public_id`, `m.active`.
- **Llamadas directas en el cuerpo** [`threads.filter`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L755), [`threads.forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L760), [`tl.find`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L762), [`includes`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L763), [`mins`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L766), [`firstResponse.push`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L768), [`queueToAssigned.push`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L769), [`map`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L772), [`filter`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L772), [`closed.map`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L772), [`activeTickets.forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L779), [`closed.forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L783) y 19 más.
- **Lo usa** [`renderAdvancedTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1481) (accede al módulo), [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2119) (accede al módulo).

#### [`top`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L837) · función · dentro de [`metrics`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L754)

Función auxiliar de `metrics` para `top`.

- **Entradas** `obj`, `n = valor por defecto`.
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L838), [`slice`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L838), [`sort`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L838).
- **Lo usa** [`metrics`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L851) (llama).

#### [`catalogMacros`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L887) · cálculo memorizado · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Función auxiliar de `AdminSupportControlPanel` para `catalog Macros`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`macros.map`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L888).
- **Lo usa** [`categoriesStats`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L912) (accede al módulo), [`catalogMacroSummary`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L960) (accede al módulo), [`groupedByStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1002) (accede al módulo), [`groupedByRole`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1021) (accede al módulo), [`changeCategoryStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1161) (accede al módulo).

#### [`categoriesStats`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L896) · cálculo memorizado · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Función auxiliar de `AdminSupportControlPanel` para `categories Stats`.

- **Hooks que llama** `useMemo`.
- **Efectos y APIs** `macroByCategoryStatus.cat.status.push`, `macroListByCategory.cat.push`.
- **Condiciones que evalúa** `m.active`, `ausencia de macroByCategoryStatus.cat`, `ausencia de macroByCategoryStatus.cat.status`, `ausencia de macroListByCategory.cat`, `ausencia de roleSetByCategory.cat`.
- **Llamadas directas en el cuerpo** [`threads.forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L904), [`activeTickets.forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L908), [`catalogMacros.forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L912), [`macroByCategoryStatus.cat.status.push`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L920), [`macroListByCategory.cat.push`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L922), [`audiences.forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L925), [`roleSetByCategory.cat.add`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L925), [`roleLabel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L925), [`baseCategories.map`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L937), [`filter`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L938), [`known.has`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L940), [`extraIds.map`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L941) y 3 más.
- **Lo usa** [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2160) (accede al módulo).

#### [`catalogMacroSummary`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L959) · cálculo memorizado · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Función auxiliar de `AdminSupportControlPanel` para `catalog Macro Summary`.

- **Retorno visible o tipo declarado** `total`, `active`, `covered`.
- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`catalogMacros.map`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L960), [`catalogMacros.filter`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L963).
- **Lo usa** [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2127) (accede al módulo).

#### [`ticketCategoryRows`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L968) · cálculo memorizado · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Función auxiliar de `AdminSupportControlPanel` para `ticket Category Rows`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `statusDiff`, `aSort`.
- **Llamadas directas en el cuerpo** [`sort`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L969), [`localeCompare`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L975), [`dynamic.map`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L980).
- **Lo usa** [`editingCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L988) (accede al módulo), [`renderTicketCategories`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1645) (accede al módulo).

#### [`editingCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L986) · cálculo memorizado · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Función auxiliar de `AdminSupportControlPanel` para `editing Category`.

- **Retorno visible o tipo declarado** `null`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `categoryFormMode o ausencia de categoryEditId`.
- **Llamadas directas en el cuerpo** [`ticketCategoryRows.find`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L988), [`trim`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L989).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L995) (referencia), [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L998) (referencia), [`renderTicketCategories`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1725) (referencia), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1763) (referencia), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1777) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L994) · callback de infraestructura · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSupportControlPanel`.

- **Condiciones que evalúa** `categoryFormMode y categoryEditId y ausencia de editingCategory`.
- **Llamadas directas en el cuerpo** [`resetCategoryForm`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L996).

#### [`groupedByStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1000) · cálculo memorizado · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Procesa `ed By Status` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Efectos y APIs** `groups.status.push`.
- **Condiciones que evalúa** `ausencia de groups.status`.
- **Llamadas directas en el cuerpo** [`catalogMacros.forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1002), [`groups.status.push`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1005), [`map`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1007), [`sort`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1007), [`statusRank`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1009), [`a.0.localeCompare`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1010).
- **Lo usa** [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2236) (accede al módulo).

#### [`groupedByRole`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1019) · cálculo memorizado · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Procesa `ed By Role` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Efectos y APIs** `groups.key.push`.
- **Condiciones que evalúa** `ausencia de groups.key`.
- **Llamadas directas en el cuerpo** [`catalogMacros.forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1021), [`audiences.forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1023), [`roleLabel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1024), [`groups.key.push`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1026), [`map`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1029), [`sort`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1029), [`roleRank`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1031), [`a.0.localeCompare`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1032).
- **Lo usa** [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2278) (accede al módulo).

#### [`formatMacroRoles`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1041) · callback React · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Formatea `Macro Roles` para que el consumidor lo pueda presentar.

- **Entradas** `audience`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`audience.map`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1042), [`roleLabel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1042), [`roles.join`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1043).
- **Lo usa** [`renderCatalogMacroCard`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1848) (llama).

#### [`formatCategoryTargets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1046) · callback React · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Formatea `Category Targets` para que el consumidor lo pueda presentar.

- **Entradas** `targets`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `source.includes`.
- **Llamadas directas en el cuerpo** [`source.includes`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1048), [`join`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1049), [`source.map`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1049), [`CATEGORY_APP_OPTIONS.find`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1050).
- **Lo usa** [`renderTicketCategories`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1679) (llama).

#### [`toggleCategoryTarget`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1054) · callback React · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Coordina cambios de estado durante `toggle Category Target`.

- **Entradas** `targetId`.
- **Retorno visible o tipo declarado** `app_targets`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setCategoryForm`.
- **Condiciones que evalúa** `targetId`.
- **Llamadas directas en el cuerpo** [`setCategoryForm`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1055), [`current.includes`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1062), [`current.filter`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1065), [`withoutAll.includes`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1066), [`withoutAll.filter`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1068).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1805) (llama).

#### [`beginEditCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1077) · callback React · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Coordina cambios de estado durante `begin Edit Category`.

- **Entradas** `category`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setCategoryFormMode`, `setCategoryEditId`, `setCategoryForm`, `setCategoryError`, `setCategoryOk`.
- **Condiciones que evalúa** `ausencia de categoryId`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1078), [`setCategoryFormMode`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1080), [`setCategoryEditId`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1081), [`setCategoryForm`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1082), [`setCategoryError`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1091), [`setCategoryOk`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1092).
- **Lo usa** [`renderTicketCategories`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1654) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1685) (llama).

#### [`openCreateCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1095) · callback React · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setCategoryFormMode`, `setCategoryEditId`, `setCategoryForm`, `setCategoryError`, `setCategoryOk`.
- **Llamadas directas en el cuerpo** [`setCategoryFormMode`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1096), [`setCategoryEditId`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1097), [`setCategoryForm`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1098), [`setCategoryError`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1104), [`setCategoryOk`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1105).
- **Lo usa** [`renderTicketCategories`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1606) (pasa a onClick).

#### [`submitCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1109) · callback React · asíncrona · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Atiende `form.onSubmit` y aplica la acción vinculada a ese control.

- **Entradas** `event`.
- **Recibe eventos de** `form.onSubmit`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setCategoryError`, `setCategorySaving`, `setCategoryOk`.
- **Condiciones que evalúa** `ausencia de label`, `categoryEditId`.
- **Usa código de** [`updateSupportMacroCategory`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L38) (llama), [`createSupportMacroCategory`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L34) (llama).
- **Llamadas directas en el cuerpo** [`event.preventDefault`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1110), [`trim`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1111), [`setCategoryError`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1113), [`setCategorySaving`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1117), [`setCategoryOk`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1119), [`updateSupportMacroCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1131), [`createSupportMacroCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1137), [`resetCategoryForm`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1143), [`load`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1144).
- **Lo usa** [`renderTicketCategories`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1744) (pasa a onSubmit).

#### [`changeCategoryStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1155) · callback React · asíncrona · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Coordina cambios de estado durante `change Category Status`.

- **Entradas** `category`, `status`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setCategorySaving`, `setCategoryError`, `setCategoryOk`, `setSupportMacroCategoryStatus`.
- **Condiciones que evalúa** `ausencia de categoryId`, `ausencia de CATEGORY_STATUS_OPTIONS.includes`, `status`, `ausencia de confirmed`.
- **Usa código de** [`setSupportMacroCategoryStatus`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L42) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1156), [`CATEGORY_STATUS_OPTIONS.includes`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1158), [`catalogMacros.filter`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1161), [`globalThis.confirm`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1162), [`setCategorySaving`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1167), [`setCategoryError`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1168), [`setCategoryOk`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1169), [`setSupportMacroCategoryStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1171), [`load`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1173).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1693) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1762) (llama).

#### [`removeCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1184) · callback React · asíncrona · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Limpia o restablece `Category` como parte de este flujo.

- **Entradas** `category`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setCategorySaving`, `setCategoryError`, `setCategoryOk`.
- **Condiciones que evalúa** `ausencia de categoryId`, `ausencia de confirmed`, `categoryEditId`.
- **Usa código de** [`deleteSupportMacroCategory`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L49) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1185), [`globalThis.confirm`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1188), [`setCategorySaving`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1193), [`setCategoryError`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1194), [`setCategoryOk`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1195), [`deleteSupportMacroCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1197), [`resetCategoryForm`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1200), [`load`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1202).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1704) (llama), [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1777) (llama).

#### [`visitedFlow`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1212) · cálculo memorizado · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Función auxiliar de `AdminSupportControlPanel` para `visited Flow`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de selected`, `FLOW.includes`, `e.event_type`, `e.event_type y e.details y object`, `string`.
- **Llamadas directas en el cuerpo** [`selectedTimeline.forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1215), [`FLOW.includes`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1216), [`v.add`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1216).
- **Lo usa** [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2037) (accede al módulo).

#### [`renderAdvancedTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1230) · función · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Prepara contenido JSX usando `Card`, `button`, `ChevronUp`, `ChevronDown`.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Card`, `button`, `ChevronUp`, `ChevronDown`, `Metric`.
- **Llamadas directas en el cuerpo** [`timelineRows.map`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1242), [`row.lanes.flatMap`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1245), [`buildCollapsedResolvingLane`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1246), [`find`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1249), [`row.lanes.flat`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1249), [`collapsedSegments.find`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1250), [`short`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1303), [`row.lanes.map`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1313), [`renderSegments.map`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1335), [`fmt`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1425), [`expandedSegment.events.map`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1447), [`nameOf`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1459) y 7 más.
- **Lo usa** [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2003) (llama).

#### [`clearAllLaneCollapseTimers`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1252) · función · dentro de [`renderAdvancedTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1230)

Limpia o restablece `All Lane Collapse Timers` como parte de este flujo.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `clearTimeout`.
- **Condiciones que evalúa** `timerId`.
- **Llamadas directas en el cuerpo** [`forEach`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1253), [`clearTimeout`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1254).
- **Lo usa** [`button.onMouseEnter`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1359) (llama).

#### [`setLaneExpanded`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1258) · función · dentro de [`renderAdvancedTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1230)

Aplica o guarda `Lane Expanded` para que el estado refleje la operación.

- **Entradas** `laneKey`, `value`.
- **Retorno visible o tipo declarado** `laneKey`.
- **Actualizaciones de estado o acciones** `setExpandedResolvingByLane`.
- **Condiciones que evalúa** `value`, `currentExpandedLane`, `ausencia de prev.laneKey`.
- **Llamadas directas en el cuerpo** [`setExpandedResolvingByLane`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1259), [`find`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1261).
- **Lo usa** [`setTimeout · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1281) (llama), [`button.onMouseEnter`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1360) (llama).

#### [`clearLaneCollapseTimer`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1271) · función · dentro de [`renderAdvancedTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1230)

Limpia o restablece `Lane Collapse Timer` como parte de este flujo.

- **Entradas** `laneKey`.
- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `clearTimeout`.
- **Condiciones que evalúa** `timerId`.
- **Llamadas directas en el cuerpo** [`clearTimeout`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1274).
- **Lo usa** [`scheduleLaneCollapse`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1279) (llama), [`div.onMouseEnter`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1327) (llama).

#### [`scheduleLaneCollapse`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1278) · función · dentro de [`renderAdvancedTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1230)

Coordina `Lane Collapse` con la planificación o reintento del flujo.

- **Entradas** `laneKey`.
- **Actualizaciones de estado o acciones** `clearLaneCollapseTimer`.
- **Efectos y APIs** `setTimeout`.
- **Llamadas directas en el cuerpo** [`clearLaneCollapseTimer`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1279), [`setTimeout`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1280).
- **Lo usa** [`div.onMouseLeave`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1331) (llama).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1280) · callback de infraestructura · dentro de [`scheduleLaneCollapse`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1278)

Ejecuta trabajo diferido o periódico iniciado por `scheduleLaneCollapse`.

- **Actualizaciones de estado o acciones** `setLaneExpanded`.
- **Llamadas directas en el cuerpo** [`setLaneExpanded`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1281).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1289) · callback JSX · dentro de [`renderAdvancedTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1230)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setExpandedTimelineThreadId`, `setExpandedTimelineSegmentByThread`.
- **Llamadas directas en el cuerpo** [`setExpandedTimelineThreadId`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1290), [`setExpandedTimelineSegmentByThread`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1291).

#### [`div.onMouseEnter`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1326) · callback JSX · dentro de [`renderAdvancedTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1230)

Responde al evento de interfaz `div.onMouseEnter`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `clearLaneCollapseTimer`.
- **Condiciones que evalúa** `isResolvingExpanded`.
- **Llamadas directas en el cuerpo** [`clearLaneCollapseTimer`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1327).

#### [`div.onMouseLeave`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1329) · callback JSX · dentro de [`renderAdvancedTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1230)

Responde al evento de interfaz `div.onMouseLeave`. La lógica ocurre al interactuar con ese control.

- **Condiciones que evalúa** `compression.hasCollapsedResolving y isResolvingExpanded`.
- **Llamadas directas en el cuerpo** [`scheduleLaneCollapse`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1331).

#### [`button.onMouseEnter`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1357) · callback JSX · dentro de [`renderAdvancedTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1230)

Responde al evento de interfaz `button.onMouseEnter`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `clearAllLaneCollapseTimers`, `setLaneExpanded`.
- **Condiciones que evalúa** `isCollapsedResolving`.
- **Llamadas directas en el cuerpo** [`clearAllLaneCollapseTimers`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1359), [`setLaneExpanded`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1360).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1363) · callback JSX · dentro de [`renderAdvancedTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1230)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setExpandedTimelineSegmentByThread`.
- **Llamadas directas en el cuerpo** [`event.stopPropagation`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1364), [`setExpandedTimelineSegmentByThread`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1365).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1429) · callback JSX · dentro de [`renderAdvancedTickets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1230)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setExpandedTimelineSegmentByThread`.
- **Llamadas directas en el cuerpo** [`setExpandedTimelineSegmentByThread`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1430).

#### [`renderTicketCategories`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1592) · función · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Prepara contenido JSX usando `Card`, `button`, `Plus`, `Pencil`.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Card`, `button`, `Plus`, `Pencil`, `Trash2`, `X`, `form`, `input`, `textarea`.
- **Condiciones que evalúa** `event.key`.
- **Llamadas directas en el cuerpo** [`ticketCategoryRows.map`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1645), [`trim`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1646), [`beginEditCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1654), [`event.preventDefault`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1659), [`formatCategoryTargets`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1679), [`CATEGORY_APP_OPTIONS.map`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1799), [`includes`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1800).
- **Lo usa** [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2003) (llama).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1685) · callback JSX · dentro de [`renderTicketCategories`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1592)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`beginEditCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1685).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1693) · callback JSX · dentro de [`renderTicketCategories`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1592)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`changeCategoryStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1693).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1704) · callback JSX · dentro de [`renderTicketCategories`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1592)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`removeCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1704).

#### [`input.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1748) · callback JSX · dentro de [`renderTicketCategories`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1592)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setCategoryForm`.
- **Llamadas directas en el cuerpo** [`setCategoryForm`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1749).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1761) · callback JSX · dentro de [`renderTicketCategories`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1592)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`changeCategoryStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1762).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1777) · callback JSX · dentro de [`renderTicketCategories`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1592)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`removeCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1777).

#### [`textarea.onChange`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1789) · callback JSX · dentro de [`renderTicketCategories`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1592)

Responde al evento de interfaz `textarea.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setCategoryForm`.
- **Llamadas directas en el cuerpo** [`setCategoryForm`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1790).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1805) · callback JSX · dentro de [`renderTicketCategories`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1592)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`toggleCategoryTarget`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1805).

#### [`renderCatalogMacroCard`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1838) · función · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Función auxiliar de `AdminSupportControlPanel` para `render Catalog Macro Card`.

- **Entradas** `m`, `key`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`formatMacroRoles`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1848), [`short`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1850).
- **Lo usa** [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2219) (llama).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1868) · callback JSX · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setViewByPanel`.
- **Llamadas directas en el cuerpo** [`setViewByPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1869).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1886) · callback JSX · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`load`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1886).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1919) · callback JSX · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setPanel`, `setSelectedPublicId`.
- **Llamadas directas en el cuerpo** [`setPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1920), [`setSelectedPublicId`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1921).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1943) · callback JSX · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setTicketsTabWithUrl`.
- **Llamadas directas en el cuerpo** [`setTicketsTabWithUrl`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1943).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1958) · callback JSX · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`load`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1958).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1975) · callback JSX · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setViewByPanel`.
- **Llamadas directas en el cuerpo** [`setViewByPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1976).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2009) · callback JSX · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSelectedPublicId`.
- **Llamadas directas en el cuerpo** [`setSelectedPublicId`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2009).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2088) · callback JSX · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSelectedPublicId`.
- **Llamadas directas en el cuerpo** [`setSelectedPublicId`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2088).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2142) · callback JSX · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setCatalogGroupBy`, `setExpandedCatalogGroups`.
- **Llamadas directas en el cuerpo** [`setCatalogGroupBy`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2143), [`setExpandedCatalogGroups`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2144).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2171) · callback JSX · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setExpandedCatalogGroups`.
- **Llamadas directas en el cuerpo** [`setExpandedCatalogGroups`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2172).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2243) · callback JSX · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setExpandedCatalogGroups`.
- **Llamadas directas en el cuerpo** [`setExpandedCatalogGroups`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2244).

#### [`button.onClick`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2285) · callback JSX · dentro de [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setExpandedCatalogGroups`.
- **Llamadas directas en el cuerpo** [`setExpandedCatalogGroups`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L2286).

### [`apps/referidos-app/src/admin/support/AdminSupportDesk.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L1)

Monta la mesa de ayuda del administrador y consulta las sesiones de agentes para su estado.

**Superficie que exporta.** [`AdminSupportDesk`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L12).

**Módulos que lo cargan.** [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L26) (importa).

**Dependencias del archivo.** `react`, [`../layout/AdminLayout`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`@referidos/support-sdk/agent/SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx), [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`@referidos/support-sdk/supportClient`](../../../packages/support-sdk/src/supportClient.js).

#### [`AdminSupportDesk`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L12) · componente React · exportación por defecto

Monta `AdminLayout`, `button`, `SupportInbox`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `[sessionActive, setSessionActive] mediante useState`, `[sessionLoading, setSessionLoading] mediante useState`, `[sessionError, setSessionError] mediante useState`.
- **Interfaz que monta** `AdminLayout`, `button`, `SupportInbox`.
- **Hooks que llama** `useAppStore`, `useState`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`AdminLayout`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L10) (renderiza), [`SupportInbox`](../../../packages/support-sdk/src/agent/SupportInbox.jsx#L116) (renderiza).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L335) (renderiza).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L18) · callback de infraestructura · dentro de [`AdminSupportDesk`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L12)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSupportDesk`.

- **Llamadas directas en el cuerpo** [`loadSession`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L35).

#### [`loadSession`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L20) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L18)

Consulta o invoca tabla o vista [`support_agent_sessions`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L371) y coordina las demás operaciones de esta ficha.

- **Actualizaciones de estado o acciones** `setSessionLoading`, `setSessionActive`.
- **Condiciones que evalúa** `ausencia de usuario.id`, `ausencia de active`.
- **Contrato de datos** tabla o vista [`support_agent_sessions`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L371) (`select`) en [`AdminSupportDesk.jsx:23`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L23), tabla o bucket [`support_agent_sessions`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L371) en [`AdminSupportDesk.jsx:23`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L23).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setSessionLoading`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L22), [`maybeSingle`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L23), [`limit`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L23), [`order`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L23), [`is`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L23), [`eq`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L23), [`select`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L23), [`supabase.from`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L23), [`setSessionActive`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L32).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L35) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L41) · callback de infraestructura · dentro de [`AdminSupportDesk`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L12)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSupportDesk`.

- **Actualizaciones de estado o acciones** `clearInterval`.
- **Efectos y APIs** `setInterval`, `clearInterval`.
- **Condiciones que evalúa** `ausencia de sessionActive`.
- **Llamadas directas en el cuerpo** [`setInterval`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L43), [`clearInterval`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L46).

#### [`setInterval · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L43) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L41)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Usa código de** [`pingAdminSupportSession`](../../../packages/support-sdk/src/supportClient.js#L233) (llama).
- **Llamadas directas en el cuerpo** [`pingAdminSupportSession`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L44).

#### [`handleStart`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L49) · función · asíncrona · dentro de [`AdminSupportDesk`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L12)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setSessionError`, `setSessionActive`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`startAdminSupportSession`](../../../packages/support-sdk/src/supportClient.js#L211) (llama).
- **Llamadas directas en el cuerpo** [`setSessionError`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L50), [`startAdminSupportSession`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L51), [`setSessionActive`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L56).
- **Lo usa** [`AdminSupportDesk`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L102) (pasa a onClick).

#### [`handleEnd`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L59) · función · asíncrona · dentro de [`AdminSupportDesk`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L12)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setSessionError`, `setSessionActive`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`endAdminSupportSession`](../../../packages/support-sdk/src/supportClient.js#L222) (llama).
- **Llamadas directas en el cuerpo** [`setSessionError`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L60), [`endAdminSupportSession`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L61), [`setSessionActive`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L66).
- **Lo usa** [`AdminSupportDesk`](../../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx#L93) (pasa a onClick).

### [`apps/referidos-app/src/admin/support/AdminSupportTicket.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportTicket.jsx#L1)

Muestra la vista administrativa para un ticket identificado en la ruta y conecta sus acciones operativas.

**Superficie que exporta.** [`AdminSupportTicket`](../../../apps/referidos-app/src/admin/support/AdminSupportTicket.jsx#L5).

**Módulos que lo cargan.** [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L28) (importa).

**Dependencias del archivo.** `react`, [`../layout/AdminLayout`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx), [`@referidos/support-sdk/agent/SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx).

#### [`AdminSupportTicket`](../../../apps/referidos-app/src/admin/support/AdminSupportTicket.jsx#L5) · componente React · exportación por defecto

Monta `AdminLayout`, `SupportTicket`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `AdminLayout`, `SupportTicket`.
- **Usa código de** [`AdminLayout`](../../../apps/referidos-app/src/admin/layout/AdminLayout.jsx#L10) (renderiza), [`SupportTicket`](../../../packages/support-sdk/src/agent/SupportTicket.jsx#L396) (renderiza).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L407) (renderiza).

### [`apps/referidos-app/src/admin/support/AdminSupportTicketsPanel.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportTicketsPanel.jsx#L1)

Presenta o encuadra el listado operativo de tickets accesible por la ruta administrativa.

**Superficie que exporta.** [`AdminSupportTicketsPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportTicketsPanel.jsx#L4).

**Módulos que lo cargan.** [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L29) (importa).

**Dependencias del archivo.** `react`, [`./AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx).

#### [`AdminSupportTicketsPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportTicketsPanel.jsx#L4) · componente React · exportación por defecto

Monta `AdminSupportControlPanel`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `AdminSupportControlPanel`.
- **Usa código de** [`AdminSupportControlPanel`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L293) (renderiza).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L345) (renderiza).

### [`apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L1)

Opera el catálogo de macros mediante support-ops-proxy y pide aplicar cambios del catálogo al caché runtime.

**Superficie que exporta.** [`listSupportMacroCatalog`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L24), [`createSupportMacroCategory`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L34), [`updateSupportMacroCategory`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L38), [`setSupportMacroCategoryStatus`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L42), [`deleteSupportMacroCategory`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L49), [`createSupportMacro`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L55), [`updateSupportMacro`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L59), [`setSupportMacroStatus`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L63), [`deleteSupportMacro`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L70), [`dispatchSupportMacrosSync`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L76).

**Módulos que lo cargan.** [`AdminSupportCatalogPanel.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L6) (importa), [`AdminSupportControlPanel.jsx`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L23) (importa).

**Dependencias del archivo.** [`../../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js).

#### [`invokeSupportOps`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L3) · función · asíncrona

Consulta o invoca Edge [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `action`, `payload = valor por defecto`.
- **Condiciones que evalúa** `error`, `ausencia de data.ok`.
- **Contrato de datos** Edge [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts) en [`supportMacrosOpsService.js:4`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L4).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L4).
- **Lo usa** [`listSupportMacroCatalog`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L28) (llama), [`createSupportMacroCategory`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L35) (llama), [`updateSupportMacroCategory`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L39) (llama), [`setSupportMacroCategoryStatus`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L43) (llama), [`deleteSupportMacroCategory`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L50) (llama), [`createSupportMacro`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L56) (llama), [`updateSupportMacro`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L60) (llama), [`setSupportMacroStatus`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L64) (llama), [`deleteSupportMacro`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L71) (llama).

#### [`listSupportMacroCatalog`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L24) · función · asíncrona · exportado

Consulta o invoca acción de proxy `list_catalog` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{includeArchived, includeDraft} = valor por defecto`.
- **Contrato de datos** acción de proxy `list_catalog` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts) en [`supportMacrosOpsService.js:28`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L28).
- **Llamadas directas en el cuerpo** [`invokeSupportOps`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L28).
- **Lo usa** [`load`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L284) (llama), [`load`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L340) (llama).

#### [`createSupportMacroCategory`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L34) · función · asíncrona · exportado

Consulta o invoca acción de proxy `create_category` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload`.
- **Contrato de datos** acción de proxy `create_category` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts) en [`supportMacrosOpsService.js:35`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L35).
- **Llamadas directas en el cuerpo** [`invokeSupportOps`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L35).
- **Lo usa** [`submitCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1137) (llama).

#### [`updateSupportMacroCategory`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L38) · función · asíncrona · exportado

Consulta o invoca acción de proxy `update_category` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload`.
- **Contrato de datos** acción de proxy `update_category` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts) en [`supportMacrosOpsService.js:39`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L39).
- **Llamadas directas en el cuerpo** [`invokeSupportOps`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L39).
- **Lo usa** [`executeCategoryConfirm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L891) (llama), [`submitCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1131) (llama).

#### [`setSupportMacroCategoryStatus`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L42) · función · asíncrona · exportado

Consulta o invoca acción de proxy `set_category_status` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{categoryId, status}`.
- **Contrato de datos** acción de proxy `set_category_status` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts) en [`supportMacrosOpsService.js:43`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L43).
- **Llamadas directas en el cuerpo** [`invokeSupportOps`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L43).
- **Lo usa** [`executeCategoryConfirm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L895) (llama), [`changeCategoryStatus`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1171) (llama).

#### [`deleteSupportMacroCategory`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L49) · función · asíncrona · exportado

Consulta o invoca acción de proxy `delete_category` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{categoryId}`.
- **Contrato de datos** acción de proxy `delete_category` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts) en [`supportMacrosOpsService.js:50`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L50).
- **Llamadas directas en el cuerpo** [`invokeSupportOps`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L50).
- **Lo usa** [`executeCategoryConfirm`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L901) (llama), [`removeCategory`](../../../apps/referidos-app/src/admin/support/AdminSupportControlPanel.jsx#L1197) (llama).

#### [`createSupportMacro`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L55) · función · asíncrona · exportado

Consulta o invoca acción de proxy `create_macro` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload`.
- **Contrato de datos** acción de proxy `create_macro` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts) en [`supportMacrosOpsService.js:56`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L56).
- **Llamadas directas en el cuerpo** [`invokeSupportOps`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L56).
- **Lo usa** [`submitInlineAddMacro`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L713) (llama).

#### [`updateSupportMacro`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L59) · función · asíncrona · exportado

Consulta o invoca acción de proxy `update_macro` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload`.
- **Contrato de datos** acción de proxy `update_macro` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts) en [`supportMacrosOpsService.js:60`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L60).
- **Llamadas directas en el cuerpo** [`invokeSupportOps`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L60).
- **Lo usa** [`submitSaveMacro`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L749) (llama), [`applyPriorityChanges`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L963) (llama).

#### [`setSupportMacroStatus`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L63) · función · asíncrona · exportado

Consulta o invoca acción de proxy `set_macro_status` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{macroId, status}`.
- **Contrato de datos** acción de proxy `set_macro_status` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts) en [`supportMacrosOpsService.js:64`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L64).
- **Llamadas directas en el cuerpo** [`invokeSupportOps`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L64).
- **Lo usa** [`setMacroLifecycle`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L774) (llama).

#### [`deleteSupportMacro`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L70) · función · asíncrona · exportado

Consulta o invoca acción de proxy `delete_macro` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{macroId}`.
- **Contrato de datos** acción de proxy `delete_macro` mediante [`support-ops-proxy`](../../../apps/referidos-app/supabase/functions/support-ops-proxy/index.ts) en [`supportMacrosOpsService.js:71`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L71).
- **Llamadas directas en el cuerpo** [`invokeSupportOps`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L71).
- **Lo usa** [`removeMacro`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L790) (llama).

#### [`dispatchSupportMacrosSync`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L76) · función · asíncrona · exportado

Consulta o invoca Edge [`ops-support-macros-sync-dispatch`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `{mode, panelKey, forceFull, limit} = valor por defecto`.
- **Condiciones que evalúa** `Number.isFinite`, `error`, `ausencia de data.ok`.
- **Contrato de datos** Edge [`ops-support-macros-sync-dispatch`](../../../apps/referidos-app/supabase/functions/ops-support-macros-sync-dispatch/index.ts) en [`supportMacrosOpsService.js:91`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L91).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.functions.invoke`](../../../apps/referidos-app/src/admin/support/services/supportMacrosOpsService.js#L91).
- **Lo usa** [`load`](../../../apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx#L292) (llama).

### [`apps/referidos-app/src/admin/usuarios/usuarioCliente.js`](../../../apps/referidos-app/src/admin/usuarios/usuarioCliente.js#L1)

Define información de presentación y ayudas de diagnóstico para usuarios cliente.

**Superficie que exporta.** [`clienteInsights`](../../../apps/referidos-app/src/admin/usuarios/usuarioCliente.js#L2).

#### [`clienteInsights`](../../../apps/referidos-app/src/admin/usuarios/usuarioCliente.js#L2) · variable de módulo · exportado

Agrupa la configuración o catálogo de `cliente Insights` para que sus consumidores lean claves comunes.

- **Campos o contexto** `destacados`, `bloqueados`, `reportados`.

### [`apps/referidos-app/src/admin/usuarios/UsuarioDrawer.jsx`](../../../apps/referidos-app/src/admin/usuarios/UsuarioDrawer.jsx#L1)

Abre el detalle del usuario seleccionado y concentra los controles que presenta su panel.

**Superficie que exporta.** [`UsuarioDrawer`](../../../apps/referidos-app/src/admin/usuarios/UsuarioDrawer.jsx#L6).

**Módulos que lo cargan.** [`UsuariosTable.jsx`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L6) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../components/ui/Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx).

#### [`UsuarioDrawer`](../../../apps/referidos-app/src/admin/usuarios/UsuarioDrawer.jsx#L6) · componente React · exportación por defecto

Monta `button`, `Badge`, `User`, `Mail`, `Phone`, `Shield`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{open, onClose, usuario}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Interfaz que monta** `button`, `Badge`, `User`, `Mail`, `Phone`, `Shield`.
- **Condiciones que evalúa** `ausencia de open o ausencia de usuario`.
- **Usa código de** [`Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx#L1) (renderiza).
- **Lo usa** [`UsuariosTable`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L236) (renderiza).

### [`apps/referidos-app/src/admin/usuarios/usuarioNegocio.js`](../../../apps/referidos-app/src/admin/usuarios/usuarioNegocio.js#L1)

Define información de presentación y ayudas de diagnóstico para usuarios negocio.

**Superficie que exporta.** [`negocioInsights`](../../../apps/referidos-app/src/admin/usuarios/usuarioNegocio.js#L2).

#### [`negocioInsights`](../../../apps/referidos-app/src/admin/usuarios/usuarioNegocio.js#L2) · variable de módulo · exportado

Agrupa la configuración o catálogo de `negocio Insights` para que sus consumidores lean claves comunes.

- **Campos o contexto** `sinPromos`, `suspendidos`, `reportados`.

### [`apps/referidos-app/src/admin/usuarios/usuariosCliente.ts`](../../../apps/referidos-app/src/admin/usuarios/usuariosCliente.ts#L1)

Define reglas y metadatos TypeScript para la vista administrativa de usuario cliente.

**Superficie que exporta.** [`usuariosClienteRules`](../../../apps/referidos-app/src/admin/usuarios/usuariosCliente.ts#L2).

#### [`usuariosClienteRules`](../../../apps/referidos-app/src/admin/usuarios/usuariosCliente.ts#L2) · variable de módulo · exportado

Agrupa la configuración o catálogo de `usuarios Cliente Rules` para que sus consumidores lean claves comunes.

- **Campos o contexto** `destacados`, `bloqueados`, `reportados`.

### [`apps/referidos-app/src/admin/usuarios/usuariosNegocio.ts`](../../../apps/referidos-app/src/admin/usuarios/usuariosNegocio.ts#L1)

Define reglas y metadatos TypeScript para la vista administrativa de usuario negocio.

**Superficie que exporta.** [`usuariosNegocioRules`](../../../apps/referidos-app/src/admin/usuarios/usuariosNegocio.ts#L2).

#### [`usuariosNegocioRules`](../../../apps/referidos-app/src/admin/usuarios/usuariosNegocio.ts#L2) · variable de módulo · exportado

Agrupa la configuración o catálogo de `usuarios Negocio Rules` para que sus consumidores lean claves comunes.

- **Campos o contexto** `sinPromos`, `suspendidos`, `reportados`.
