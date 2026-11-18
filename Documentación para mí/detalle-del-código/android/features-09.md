# Android · Pantallas por función y rol · 9 de 9

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-android/src/features/support/SoporteTicketScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L1)

## Símbolos y conexiones

### [`apps/referidos-android/src/features/support/SoporteTicketScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L1)

Centro del flujo de atención. Lee hilo, notas y eventos, presenta macros elegibles, implementa transiciones de apertura, atención, espera y cierre, y registra acciones como apertura por WhatsApp, nota interna y resolución. Usa ID público para operar y el ID interno donde las consultas lo requieren.

**Superficie que exporta.** [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101).

**Módulos que lo cargan.** [`AdminSupportTicketScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketScreen.tsx#L4) (importa), [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L30) (importa).

**Dependencias del archivo.** `react`, `react-native`, `@react-navigation/native`, [`@navigation/routeKeys`](../../../apps/referidos-android/src/navigation/routeKeys.ts), [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/ui/BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/store/appStore`](../../../apps/referidos-android/src/shared/store/appStore.ts), [`@shared/store/supportDeskStore`](../../../apps/referidos-android/src/shared/store/supportDeskStore.ts), [`@shared/services/supportDeskQueries`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts), [`@shared/services/supportCatalog`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts), [`@shared/services/supportOps`](../../../apps/referidos-android/src/shared/services/supportOps.ts).

#### [`FLOW`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L25) · variable de módulo

Declara `FLOW` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`initialFlow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L69) (accede al módulo), [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L122) (accede al módulo), [`macroThread`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L223) (accede al módulo), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L405) (accede al módulo), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L406) (accede al módulo), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L407) (accede al módulo), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L408) (accede al módulo), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L409) (accede al módulo), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L410) (accede al módulo), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L411) (accede al módulo), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L412) (accede al módulo), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L413) (accede al módulo) y 11 más.

#### [`WAIT_MS`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L39) · variable de módulo

Declara `WAIT_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L250) (referencia).

#### [`pickFirstString`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L41) · función

Extrae o interpreta `First String` de los argumentos, estado o datos de entrada.

- **Entradas** `...values`.
- **Condiciones que evalúa** `string y value.trim`, `number`.
- **Llamadas directas en el cuerpo** [`value.trim`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L43).
- **Lo usa** [`initialFlow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L60) (llama), [`loadThread`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L193) (llama), [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L371) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L406) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L413) (llama).

#### [`asRecord`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L49) · función

Implementa `as Record` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Lo usa** [`latestAction`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L55) (llama), [`initialFlow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L65) (llama), [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L462) (llama).

#### [`latestAction`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L53) · función

Implementa `latest Action` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `events`, `action`.
- **Llamadas directas en el cuerpo** [`find`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L54), [`toLowerCase`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L55), [`trim`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L55), [`asRecord`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L55).
- **Lo usa** [`initialFlow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L61) (llama), [`loadThread`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L193) (llama).

#### [`initialFlow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L59) · función

Inicia `ial Flow` y prepara sus dependencias.

- **Entradas** `thread`, `events`.
- **Condiciones que evalúa** `thread.status`, `ausencia de whatsappDone`, `ausencia de hasOpening`.
- **Llamadas directas en el cuerpo** [`pickFirstString`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L60), [`latestAction`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L61), [`some`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L62), [`toLowerCase`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L64), [`asRecord`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L65), [`getTime`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L68).
- **Lo usa** [`loadThread`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L188) (llama).

#### [`statusLabel`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L79) · función

Implementa `status Label` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L91), [`trim`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L91).
- **Lo usa** [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L368) (llama).

#### [`formatClock`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L94) · función

Formatea `Clock` para que el consumidor lo pueda presentar.

- **Entradas** `ms`.
- **Llamadas directas en el cuerpo** [`padStart`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L98).
- **Lo usa** [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L375) (llama).

#### [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101) · componente React · exportación por defecto

Monta `ScreenScaffold`, `BlockSkeleton`, `ScrollView`, `SectionCard`, `TextInput`, `View`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `role mediante useAppStore`, `selector state.role`, `shownRef mediante useRef`, `[threadIdInput, setThreadIdInput] mediante useState`, `[loading, setLoading] mediante useState`, `[catalogLoading, setCatalogLoading] mediante useState`, `[error, setError] mediante useState`, `[catalogError, setCatalogError] mediante useState`, `[thread, setThread] mediante useState`, `[events, setEvents] mediante useState`, `[notes, setNotes] mediante useState`, `[logs, setLogs] mediante useState`, `[catalog, setCatalog] mediante useState`, `[flow, setFlow] mediante useState` y 8 más.
- **Interfaz que monta** `ScreenScaffold`, `BlockSkeleton`, `ScrollView`, `SectionCard`, `TextInput`, `View`, `Pressable`, `Text`.
- **Hooks que llama** `useNavigation`, `useRoute`, `useAppStore`, `useSupportDeskStore`, `useRef`, `useState`, `useEffect`.
- **Condiciones que evalúa** `loading`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37) (llama), [`useSupportDeskStore`](../../../apps/referidos-android/src/shared/store/supportDeskStore.ts#L9) (llama), [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo), [`TAB_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L9) (accede al módulo), [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L9) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L109), [`getTime`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L250), [`statusLabel`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L368), [`pickFirstString`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L371), [`formatDateTime`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L372), [`formatClock`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L375), [`macros.map`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L434), [`notes.map`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L449), [`events.map`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L458), [`asRecord`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L462), [`logs.map`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L468).
- **Lo usa** [`AdminSupportTicketScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketScreen.tsx#L17) (renderiza), [`SoporteStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L91) (pasa a component).

#### [`runtimeEnvKey`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L108) · cálculo memorizado · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Maneja `time Env Key` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`normalizeSupportEnvKey`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L157) (llama).
- **Llamadas directas en el cuerpo** [`normalizeSupportEnvKey`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L108).
- **Lo usa** [`macros`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L245) (referencia), [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L275) (referencia), [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L283) (referencia), [`useMacro`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L324) (referencia).

#### [`loadCatalog`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L132) · callback React · asíncrona · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Obtiene o resuelve `Catalog` para entregarlo al consumidor.

- **Entradas** `forceSync = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setCatalogLoading`, `setCatalogError`, `setCatalog`.
- **Condiciones que evalúa** `forceSync o result.categories.length o result.macros.length`, `ausencia de result.categories.length y ausencia de result.macros.length y result.error`.
- **Usa código de** [`loadSupportCatalogFromCache`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L163) (llama), [`dispatchSupportMacrosSync`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L65) (llama).
- **Llamadas directas en el cuerpo** [`setCatalogLoading`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L133), [`loadSupportCatalogFromCache`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L134), [`dispatchSupportMacrosSync`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L137), [`setCatalogError`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L139), [`setCatalog`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L143).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L199) (llama), [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L200) (referencia), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L431) (llama).

#### [`loadThread`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L153) · callback React · asíncrona · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Obtiene o resuelve el valor de hilo para entregarlo al consumidor.

- **Entradas** `forcedId?`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`, `setLoading`, `setThread`, `setEvents`, `setNotes`, `setLogs`, `setThreadIdInput`, `setSelectedThreadPublicId`, `setFlow`, `setActiveMacro`, `setClosingComment`, `setIssueReason` y 2 más.
- **Condiciones que evalúa** `ausencia de nextId`, `ausencia de detail.ok o ausencia de detail.data`.
- **Usa código de** [`fetchSupportThreadDetail`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L108) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia), [`fetchSupportThreadEvents`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L141) (llama), [`fetchSupportThreadNotes`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L173) (llama), [`fetchSupportLogEvents`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L189) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L154), [`setError`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L156), [`setLoading`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L159), [`fetchSupportThreadDetail`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L161), [`setThread`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L163), [`setEvents`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L164), [`setNotes`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L165), [`setLogs`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L166), [`fetchSupportThreadEvents`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L173), [`fetchSupportThreadNotes`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L174), [`fetchSupportLogEvents`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L175), [`setThreadIdInput`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L183) y 11 más.
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L206) (llama), [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L207) (referencia), [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L212) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L360) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L198) · callback de infraestructura · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SoporteTicketScreen`.

- **Llamadas directas en el cuerpo** [`loadCatalog`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L199).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L202) · callback de infraestructura · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SoporteTicketScreen`.

- **Actualizaciones de estado o acciones** `setThreadIdInput`, `setSelectedThreadPublicId`.
- **Condiciones que evalúa** `ausencia de routeThreadPublicId`.
- **Llamadas directas en el cuerpo** [`setThreadIdInput`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L204), [`setSelectedThreadPublicId`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L205), [`loadThread`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L206).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L209) · callback de infraestructura · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SoporteTicketScreen`.

- **Actualizaciones de estado o acciones** `setThreadIdInput`.
- **Condiciones que evalúa** `ausencia de selectedThreadPublicId`.
- **Llamadas directas en el cuerpo** [`setThreadIdInput`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L211), [`loadThread`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L212).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L215) · callback de infraestructura · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SoporteTicketScreen`.

- **Actualizaciones de estado o acciones** `clearInterval`.
- **Efectos y APIs** `globalThis.setInterval`, `globalThis.clearInterval`.
- **Llamadas directas en el cuerpo** [`globalThis.setInterval`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L216), [`globalThis.clearInterval`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L217).

#### [`setInterval · callback`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L216) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L215)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setNowMs`.
- **Llamadas directas en el cuerpo** [`setNowMs`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L216).

#### [`macroThread`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L220) · cálculo memorizado · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Función auxiliar de `SoporteTicketScreen` para `macro Thread`.

- **Retorno visible o tipo declarado** `null`, `status`, `category`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de thread`.
- **Llamadas directas en el cuerpo** [`includes`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L228).
- **Lo usa** [`macros`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L240) (referencia).

#### [`macros`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L239) · cálculo memorizado · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Función auxiliar de `SoporteTicketScreen` para `macros`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de macroThread`.
- **Usa código de** [`filterSupportMacrosForThread`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L215) (llama).
- **Llamadas directas en el cuerpo** [`filterSupportMacrosForThread`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L241).
- **Lo usa** [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L249) (accede al módulo), [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L259) (accede al módulo).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L258) · callback de infraestructura · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SoporteTicketScreen`.

- **Retorno visible o tipo declarado** `null`, `macro_id`, `macro_code`, `category_code`, `thread_public_id`, `event_type`, `app_key`, `env_key`, `metadata`.
- **Condiciones que evalúa** `ausencia de thread.public_id o ausencia de macros.length`, `ausencia de id o ausencia de code`, `shownRef.current.has`, `payload.length`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L260), [`macros.map`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L260), [`shownRef.current.has`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L266), [`shownRef.current.add`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L267), [`catch`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L281), [`mobileApi.support.trackMacroEvents`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L281).

#### [`runAction`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L285) · callback React · asíncrona · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Maneja el valor de acción y coordina las acciones indicadas abajo.

- **Entradas** `fn`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setBusy`.
- **Llamadas directas en el cuerpo** [`setBusy`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L286), [`fn`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L288).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L406) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L407) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L409) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L410) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L411) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L412) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L413) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L414) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L415) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L417) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L418) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L419) (llama) y 7 más.

#### [`persistWorkflow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L294) · callback React · asíncrona · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Aplica o guarda `Workflow` para que el estado refleje la operación.

- **Entradas** `action`, `payload = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`mobileApi.support.workflowAction`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L295).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L409) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L410) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L413) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L417) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L418) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L420) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L421) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L422) (llama).

#### [`setStatus`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L302) · callback React · asíncrona · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Aplica o guarda el valor de estado para que el estado refleje la operación.

- **Entradas** `status`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setThread`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`mobileApi.support.updateStatus`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L303), [`setThread`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L308).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L407) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L411) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L412) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L414) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L415) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L419) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L423) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L424) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L425) (llama).

#### [`useMacro`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L311) · callback React · asíncrona · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Coordina cambios de estado durante `Macro`.

- **Entradas** `macro`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setActiveMacro`.
- **Condiciones que evalúa** `ausencia de id o ausencia de code o ausencia de thread.public_id`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setActiveMacro`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L312), [`catch`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L316), [`mobileApi.support.trackMacroEvents`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L316).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L439) (llama).

#### [`addNote`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L330) · callback React · asíncrona · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Coordina cambios de estado durante `add Note`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setNoteDraft`, `setNotes`.
- **Condiciones que evalúa** `ausencia de body`, `ausencia de result.ok`, `nextNotes.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo), [`fetchSupportThreadNotes`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L173) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia), [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo).
- **Llamadas directas en el cuerpo** [`noteDraft.trim`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L331), [`mobileApi.support.addNote`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L333), [`setNoteDraft`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L335), [`fetchSupportThreadNotes`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L336), [`setNotes`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L337), [`observability.track`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L338).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L448) (referencia).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L360) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`loadThread`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L360).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L361) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L361).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L405) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setFlow`.
- **Llamadas directas en el cuerpo** [`setFlow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L405).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L406) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `markWhatsAppNameChanged`, `setFlow`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L406), [`mobileApi.support.markWhatsAppNameChanged`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L406), [`pickFirstString`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L406), [`setFlow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L406).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L407) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `markOpeningMessageSent`, `setStatus`, `setFlow`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L407), [`mobileApi.support.markOpeningMessageSent`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L407), [`setStatus`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L407), [`setFlow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L407).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L408) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setFlow`.
- **Llamadas directas en el cuerpo** [`setFlow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L408).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L409) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setThread`, `setFlow`.
- **Condiciones que evalúa** `ausencia de response.ok`.
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L409), [`persistWorkflow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L409), [`setThread`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L409), [`setFlow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L409).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L410) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setFlow`.
- **Condiciones que evalúa** `ausencia de response.ok`.
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L410), [`persistWorkflow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L410), [`setFlow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L410).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L411) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setStatus`, `setFlow`.
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L411), [`setStatus`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L411), [`setFlow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L411).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L412) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setStatus`, `setFlow`.
- **Condiciones que evalúa** `includes`.
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L412), [`includes`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L412), [`setStatus`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L412), [`setFlow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L412).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L413) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setClosingSentAt`, `setFlow`.
- **Condiciones que evalúa** `ausencia de response.ok`.
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L413), [`persistWorkflow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L413), [`pickFirstString`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L413), [`toISOString`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L413), [`setClosingSentAt`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L413), [`setFlow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L413).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L414) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setStatus`, `setFlow`.
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L414), [`setStatus`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L414), [`setFlow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L414).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L415) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setStatus`, `setFlow`.
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L415), [`setStatus`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L415), [`setFlow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L415).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L416) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setFlow`.
- **Llamadas directas en el cuerpo** [`setFlow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L416).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L417) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setThread`, `setFlow`.
- **Condiciones que evalúa** `ausencia de closingComment.trim`, `ausencia de response.ok`, `ausencia de close.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L417), [`closingComment.trim`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L417), [`persistWorkflow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L417), [`mobileApi.support.closeThread`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L417), [`setThread`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L417), [`setFlow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L417).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L418) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setThread`, `setFlow`.
- **Condiciones que evalúa** `ausencia de closingComment.trim`, `ausencia de response.ok`, `ausencia de close.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L418), [`closingComment.trim`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L418), [`persistWorkflow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L418), [`mobileApi.support.closeThread`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L418), [`setThread`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L418), [`setFlow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L418).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L419) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setStatus`, `setFlow`.
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L419), [`setStatus`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L419), [`setFlow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L419).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L420) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setFlow`.
- **Condiciones que evalúa** `ausencia de issueReason.trim`, `ausencia de response.ok`.
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L420), [`issueReason.trim`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L420), [`persistWorkflow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L420), [`setFlow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L420).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L421) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setFlow`.
- **Condiciones que evalúa** `ausencia de issueReason.trim`, `ausencia de response.ok`.
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L421), [`issueReason.trim`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L421), [`persistWorkflow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L421), [`setFlow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L421).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L422) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setFlow`.
- **Condiciones que evalúa** `ausencia de response.ok`.
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L422), [`persistWorkflow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L422), [`issueReason.trim`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L422), [`setFlow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L422).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L423) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setStatus`.
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L423), [`setStatus`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L423).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L424) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setStatus`, `setFlow`.
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L424), [`setStatus`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L424), [`setFlow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L424).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L425) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setStatus`, `setFlow`.
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L425), [`setStatus`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L425), [`setFlow`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L425).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L426) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L426).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L431) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`loadCatalog`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L431).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L439) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Hooks que llama** `useMacro`.

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L440) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setNoteDraft`.
- **Llamadas directas en el cuerpo** [`setNoteDraft`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L440).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L448) · callback JSX · dentro de [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L101)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L448).

#### [`styles`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L482) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L482).
- **Lo usa** [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L356) (accede al módulo).
