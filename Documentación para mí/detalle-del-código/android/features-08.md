# Android · Pantallas por función y rol · 8 de 9

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L1)
- [`apps/referidos-android/src/features/support/SoporteInboxScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L1)
- [`apps/referidos-android/src/features/support/SoporteInicioScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L1)
- [`apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L1)
- [`apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L1)
- [`apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L1)

## Símbolos y conexiones

### [`apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L1)

Consulta el catálogo de códigos de error y permite buscar por código, estado o texto. Sirve para la interpretación durante el diagnóstico de un caso.

**Superficie que exporta.** [`SoporteErrorCatalogScreen`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L50).

**Módulos que lo cargan.** [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L29) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/ui/BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/services/supportDeskQueries`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts).

#### [`EXTRA_KNOWN_CODES`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L10) · variable de módulo

Conserva la lista de `EXTRA KNOWN CODES` usada por el módulo.

- **Lo usa** [`buildFallbackRows`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L27) (accede al módulo).

#### [`buildFallbackRows`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L25) · función

Construye `Fallback Rows` a partir de los datos del flujo.

- **Llamadas directas en el cuerpo** [`toISOString`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L26), [`EXTRA_KNOWN_CODES.map`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L27).
- **Lo usa** [`loadRows`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L62) (llama).

#### [`statusStyle`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L44) · función

Implementa `status Style` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `status`.
- **Condiciones que evalúa** `status`.
- **Lo usa** [`SoporteErrorCatalogScreen`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L127) (llama).

#### [`SoporteErrorCatalogScreen`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L50) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `TextInput`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[rows, setRows] mediante useState`, `[query, setQuery] mediante useState`, `[loading, setLoading] mediante useState`, `[error, setError] mediante useState`.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `TextInput`, `BlockSkeleton`, `View`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L9) (renderiza), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`filtered.map`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L123), [`statusStyle`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L127), [`toUpperCase`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L128), [`formatDateTime`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L135).
- **Lo usa** [`SoporteStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L89) (pasa a component).

#### [`loadRows`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L56) · callback React · asíncrona · dentro de [`SoporteErrorCatalogScreen`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L50)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setError`, `setRows`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`fetchSupportErrorCatalog`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L442) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L57), [`setError`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L58), [`fetchSupportErrorCatalog`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L59), [`setRows`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L62), [`buildFallbackRows`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L62).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L71) (llama), [`SoporteErrorCatalogScreen`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L72) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L70) · callback de infraestructura · dentro de [`SoporteErrorCatalogScreen`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L50)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SoporteErrorCatalogScreen`.

- **Llamadas directas en el cuerpo** [`loadRows`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L71).

#### [`filtered`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L74) · cálculo memorizado · dentro de [`SoporteErrorCatalogScreen`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L50)

Procesa `ed` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de term`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L75), [`query.trim`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L75), [`rows.filter`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L77), [`join`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L78), [`filter`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L78), [`haystack.includes`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L89).
- **Lo usa** [`SoporteErrorCatalogScreen`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L117) (accede al módulo).

#### [`styles`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L149) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L149).
- **Lo usa** [`statusStyle`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L45) (accede al módulo), [`SoporteErrorCatalogScreen`](../../../apps/referidos-android/src/features/support/SoporteErrorCatalogScreen.tsx#L98) (accede al módulo).

### [`apps/referidos-android/src/features/support/SoporteInboxScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L1)

Lee inbox con filtros, carga estado de jornada, permite acciones de sesión y asignación y abre el hilo por identificador público. Presenta también eventos de observabilidad para soporte.

**Superficie que exporta.** [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L27).

**Módulos que lo cargan.** [`RoleTabs.tsx`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L21) (importa).

**Dependencias del archivo.** `react`, `react-native`, `@react-navigation/native`, [`@navigation/routeKeys`](../../../apps/referidos-android/src/navigation/routeKeys.ts), [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/ui/BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx), [`@shared/ui/ObservabilityEventFeed`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/store/appStore`](../../../apps/referidos-android/src/shared/store/appStore.ts), [`@shared/store/supportDeskStore`](../../../apps/referidos-android/src/shared/store/supportDeskStore.ts), [`@shared/constants/supportDesk`](../../../apps/referidos-android/src/shared/constants/supportDesk.ts), [`@shared/services/supportDeskQueries`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts).

#### [`ACTIVE_AGENT_STATUSES`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L25) · variable de módulo

Conserva la lista de `ACTIVE AGENT STATUSES` usada por el módulo.

- **Lo usa** [`hasActiveThread`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L55) (accede al módulo).

#### [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L27) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `BlockSkeleton`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[threads, setThreads] mediante useState`, `[error, setError] mediante useState`, `[activeStatus, setActiveStatus] mediante useState`, `[activeOrigin, setActiveOrigin] mediante useState`, `[sessionLoading, setSessionLoading] mediante useState`, `[sessionError, setSessionError] mediante useState`, `[agentProfile, setAgentProfile] mediante useState`, `[activeSession, setActiveSession] mediante useState`.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `BlockSkeleton`, `View`, `ObservabilityEventFeed`.
- **Hooks que llama** `useNavigation`, `useAppStore`, `useSupportDeskStore`, `useState`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37) (llama), [`useSupportDeskStore`](../../../apps/referidos-android/src/shared/store/supportDeskStore.ts#L9) (llama), [`SupportStatusId`](../../../apps/referidos-android/src/shared/constants/supportDesk.ts#L16) (referencia), [`SupportOriginFilterId`](../../../apps/referidos-android/src/shared/constants/supportDesk.ts#L17) (referencia), [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L9) (renderiza), [`SUPPORT_STATUS_GROUPS`](../../../apps/referidos-android/src/shared/constants/supportDesk.ts#L1) (accede al módulo), [`SUPPORT_ORIGIN_FILTERS`](../../../apps/referidos-android/src/shared/constants/supportDesk.ts#L10) (accede al módulo), [`toSupportThreadSubtitle`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L457) (llama) y 1 más.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L45), [`SUPPORT_STATUS_GROUPS.map`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L260), [`SUPPORT_ORIGIN_FILTERS.map`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L275), [`filteredThreads.map`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L297), [`toSupportThreadSubtitle`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L310).
- **Lo usa** [`SoporteTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L166) (referencia).

#### [`hasActiveThread`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L50) · cálculo memorizado · dentro de [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L27)

Comprueba `Active Thread` para decidir si se admite o continúa la operación.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de usuarioId`.
- **Llamadas directas en el cuerpo** [`threads.some`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L52), [`ACTIVE_AGENT_STATUSES.includes`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L55).
- **Lo usa** [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L326) (referencia).

#### [`filteredThreads`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L59) · cálculo memorizado · dentro de [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L27)

Procesa `ed Threads` según el criterio del módulo.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `activeStatus`, `activeOrigin`.
- **Llamadas directas en el cuerpo** [`threads.filter`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L60).
- **Lo usa** [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L289) (accede al módulo).

#### [`loadSessionState`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L67) · callback React · asíncrona · dentro de [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L27)

Obtiene o resuelve `Session State` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSessionLoading`, `setAgentProfile`, `setSessionError`, `setActiveSession`.
- **Condiciones que evalúa** `ausencia de usuarioId`, `ausencia de profileResult.ok`, `ausencia de sessionError`, `ausencia de sessionResult.ok`.
- **Usa código de** [`fetchSupportAgentProfile`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L267) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia), [`fetchActiveAgentSession`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L284) (llama).
- **Llamadas directas en el cuerpo** [`setSessionLoading`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L69), [`fetchSupportAgentProfile`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L71), [`fetchActiveAgentSession`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L72), [`setAgentProfile`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L75), [`setSessionError`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L76), [`setActiveSession`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L82).
- **Lo usa** [`refreshAll`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L113) (llama).

#### [`loadThreads`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L92) · callback React · asíncrona · dentro de [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L27)

Obtiene o resuelve `Threads` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setThreads`, `setError`.
- **Condiciones que evalúa** `ausencia de usuarioId`, `ausencia de refreshing`, `ausencia de result.ok`.
- **Usa código de** [`fetchSupportInboxRows`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L51) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L94), [`fetchSupportInboxRows`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L95), [`setThreads`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L101), [`setError`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L102).
- **Lo usa** [`refreshAll`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L113) (llama), [`handleTakeThread`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L191) (llama).

#### [`refreshAll`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L111) · callback React · asíncrona · dentro de [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L27)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`.
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L112), [`loadSessionState`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L113), [`loadThreads`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L113).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L118) (llama), [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L119) (referencia), [`handleRequestSession`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L148) (llama), [`handleEndSession`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L164) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L117) · callback de infraestructura · dentro de [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L27)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SoporteInboxScreen`.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L118).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L121) · callback de infraestructura · dentro de [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L27)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SoporteInboxScreen`.

- **Actualizaciones de estado o acciones** `clearInterval`.
- **Efectos y APIs** `setInterval`, `clearInterval`.
- **Condiciones que evalúa** `ausencia de sessionActive`.
- **Llamadas directas en el cuerpo** [`setInterval`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L123), [`clearInterval`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L129).

#### [`setInterval · callback`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L123) · callback de infraestructura · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L121)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setSessionError`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`mobileApi.support.pingSession`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L124), [`setSessionError`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L126).

#### [`handleRequestSession`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L132) · callback React · asíncrona · dentro de [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L27)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSessionError`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo), [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setSessionError`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L133), [`mobileApi.support.startSession`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L134), [`observability.track`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L139), [`refreshAll`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L148).
- **Lo usa** [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L244) (pasa a onPress).

#### [`handleEndSession`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L151) · callback React · asíncrona · dentro de [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L27)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSessionError`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo), [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setSessionError`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L152), [`mobileApi.support.endSession`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L153), [`observability.track`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L158), [`refreshAll`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L164).
- **Lo usa** [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L250) (pasa a onPress).

#### [`handleTakeThread`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L168) · callback React · asíncrona · dentro de [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L27)

Maneja `Take Thread` y coordina las acciones indicadas abajo.

- **Entradas** `threadPublicId`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSessionError`.
- **Condiciones que evalúa** `ausencia de sessionActive`, `ausencia de isAuthorized`, `ausencia de result.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo), [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setSessionError`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L169), [`mobileApi.support.assignThread`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L178), [`observability.track`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L185), [`loadThreads`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L191).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L325) (llama).

#### [`openTicket`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L197) · callback React · dentro de [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L27)

Inicia el valor de ticket y prepara sus dependencias.

- **Entradas** `threadPublicId`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSelectedThreadPublicId`.
- **Efectos y APIs** `navigation.navigate`.
- **Condiciones que evalúa** `ausencia de safeId`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L198), [`setSelectedThreadPublicId`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L200), [`navigation.navigate`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L201).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L320) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L335) (llama).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L263) · callback JSX · dentro de [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L27)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setActiveStatus`.
- **Llamadas directas en el cuerpo** [`setActiveStatus`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L263).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L278) · callback JSX · dentro de [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L27)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setActiveOrigin`.
- **Llamadas directas en el cuerpo** [`setActiveOrigin`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L278).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L320) · callback JSX · dentro de [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L27)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openTicket`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L320).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L325) · callback JSX · dentro de [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L27)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleTakeThread`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L325).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L335) · callback JSX · dentro de [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L27)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openTicket`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L335).

#### [`styles`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L364) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L364).
- **Lo usa** [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L208) (accede al módulo).

### [`apps/referidos-android/src/features/support/SoporteInicioScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L1)

Entrada informativa para el agente y enlaces a inbox, jornadas, issues, errores e irregulares. Reúne el estado del asesor y el contexto para comenzar su operación.

**Superficie que exporta.** [`SoporteInicioScreen`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L17).

**Módulos que lo cargan.** [`RoleTabs.tsx`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L20) (importa).

**Dependencias del archivo.** `react`, `react-native`, `@react-navigation/native`, [`@navigation/routeKeys`](../../../apps/referidos-android/src/navigation/routeKeys.ts), [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/ui/BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/store/appStore`](../../../apps/referidos-android/src/shared/store/appStore.ts), [`@shared/services/supportDeskQueries`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts).

#### [`SoporteInicioScreen`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L17) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `BlockSkeleton`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `[loading, setLoading] mediante useState`, `[error, setError] mediante useState`, `[profile, setProfile] mediante useState`, `[session, setSession] mediante useState`, `[summary, setSummary] mediante useState`.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `BlockSkeleton`, `View`, `MetricCard`, `NavCard`.
- **Hooks que llama** `useNavigation`, `useAppStore`, `useState`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37) (llama), [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L9) (renderiza).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L20).
- **Lo usa** [`SoporteTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L165) (referencia).

#### [`loadOverview`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L35) · callback React · asíncrona · dentro de [`SoporteInicioScreen`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L17)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setProfile`, `setSession`, `setError`, `setSummary`.
- **Condiciones que evalúa** `ausencia de usuarioId`, `ausencia de inboxResult.ok`.
- **Usa código de** [`fetchSupportAgentProfile`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L267) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia), [`fetchActiveAgentSession`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L284) (llama), [`fetchSupportInboxRows`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L51) (llama), [`fetchSupportStatusSummary`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L369) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L37), [`fetchSupportAgentProfile`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L39), [`fetchActiveAgentSession`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L40), [`fetchSupportInboxRows`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L41), [`fetchSupportStatusSummary`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L46), [`setProfile`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L49), [`setSession`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L50), [`setError`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L53), [`setSummary`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L54), [`rows.filter`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L69).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L86) (llama), [`SoporteInicioScreen`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L87) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L85) · callback de infraestructura · dentro de [`SoporteInicioScreen`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L17)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SoporteInicioScreen`.

- **Llamadas directas en el cuerpo** [`loadOverview`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L86).

#### [`sessionStateLabel`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L89) · cálculo memorizado · dentro de [`SoporteInicioScreen`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L17)

Función auxiliar de `SoporteInicioScreen` para `session State Label`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `profile.blocked`, `ausencia de profile.authorized_for_work`, `session.id`.
- **Lo usa** [`SoporteInicioScreen`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L114) (referencia).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L145) · callback JSX · dentro de [`SoporteInicioScreen`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L17)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`TAB_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L9) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L145).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L150) · callback JSX · dentro de [`SoporteInicioScreen`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L17)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L150).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L155) · callback JSX · dentro de [`SoporteInicioScreen`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L17)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L155).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L160) · callback JSX · dentro de [`SoporteInicioScreen`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L17)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L160).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L165) · callback JSX · dentro de [`SoporteInicioScreen`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L17)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`TAB_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L9) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L165).

#### [`MetricCard`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L174) · componente React

Monta `View`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{label, value}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `View`, `Text`.
- **Lo usa** [`SoporteInicioScreen`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L130) (renderiza).

#### [`NavCard`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L183) · componente React

Monta `Pressable`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, description, onPress}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Pressable`, `Text`.
- **Lo usa** [`SoporteInicioScreen`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L142) (renderiza).

#### [`styles`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L201) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L201).
- **Lo usa** [`SoporteInicioScreen`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L101) (accede al módulo), [`MetricCard`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L176) (accede al módulo), [`NavCard`](../../../apps/referidos-android/src/features/support/SoporteInicioScreen.tsx#L193) (accede al módulo).

### [`apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L1)

Abre un caso operativo con el identificador público del usuario, categoría disponible en el catálogo del runtime y el resumen indicado. Mantiene ese ingreso fuera del formulario de autoservicio del perfil.

**Superficie que exporta.** [`SoporteIrregularScreen`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L12).

**Módulos que lo cargan.** [`RoleTabs.tsx`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L22) (importa).

**Dependencias del archivo.** `react`, `react-native`, `@react-navigation/native`, [`@navigation/routeKeys`](../../../apps/referidos-android/src/navigation/routeKeys.ts), [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/store/supportDeskStore`](../../../apps/referidos-android/src/shared/store/supportDeskStore.ts), [`@shared/services/supportCatalog`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts), [`@shared/services/supportOps`](../../../apps/referidos-android/src/shared/services/supportOps.ts).

#### [`SoporteIrregularScreen`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L12) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `SectionCard`, `TextInput`, `Text`, `View`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[categories, setCategories] mediante useState`, `[userPublicId, setUserPublicId] mediante useState`, `[summary, setSummary] mediante useState`, `[category, setCategory] mediante useState`, `[creating, setCreating] mediante useState`, `[status, setStatus] mediante useState`, `[statusTone, setStatusTone] mediante useState`, `[loadingCategories, setLoadingCategories] mediante useState`, `[categoriesError, setCategoriesError] mediante useState`.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `SectionCard`, `TextInput`, `Text`, `View`, `Pressable`.
- **Hooks que llama** `useNavigation`, `useSupportDeskStore`, `useState`, `useEffect`.
- **Usa código de** [`useSupportDeskStore`](../../../apps/referidos-android/src/shared/store/supportDeskStore.ts#L9) (llama), [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza).
- **Llamadas directas en el cuerpo** [`visibleCategories.map`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L136).
- **Lo usa** [`SoporteTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L170) (referencia).

#### [`loadCategories`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L28) · callback React · asíncrona · dentro de [`SoporteIrregularScreen`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L12)

Obtiene o resuelve `Categories` para entregarlo al consumidor.

- **Entradas** `forceSync = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoadingCategories`, `setCategoriesError`, `setCategories`.
- **Condiciones que evalúa** `forceSync o result.categories.length`, `ausencia de nextCategories.length y result.error`.
- **Usa código de** [`loadSupportCatalogFromCache`](../../../apps/referidos-android/src/shared/services/supportCatalog.ts#L163) (llama), [`dispatchSupportMacrosSync`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L65) (llama).
- **Llamadas directas en el cuerpo** [`setLoadingCategories`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L29), [`setCategoriesError`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L30), [`loadSupportCatalogFromCache`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L31), [`dispatchSupportMacrosSync`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L34), [`filter`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L43), [`map`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L43), [`includes`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L44), [`toLowerCase`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L44), [`trim`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L46), [`setCategories`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L50).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L58) (llama), [`SoporteIrregularScreen`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L59) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L57) · callback de infraestructura · dentro de [`SoporteIrregularScreen`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L12)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SoporteIrregularScreen`.

- **Llamadas directas en el cuerpo** [`loadCategories`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L58).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L61) · callback de infraestructura · dentro de [`SoporteIrregularScreen`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L12)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SoporteIrregularScreen`.

- **Actualizaciones de estado o acciones** `setCategory`.
- **Condiciones que evalúa** `ausencia de category y categories.0.id`.
- **Llamadas directas en el cuerpo** [`setCategory`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L63).

#### [`visibleCategories`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L67) · cálculo memorizado · dentro de [`SoporteIrregularScreen`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L12)

Función auxiliar de `SoporteIrregularScreen` para `visible Categories`.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`SoporteIrregularScreen`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L136) (accede al módulo).

#### [`handleCreate`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L69) · función · asíncrona · dentro de [`SoporteIrregularScreen`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L12)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Actualizaciones de estado o acciones** `setStatusTone`, `setStatus`, `setCreating`, `setUserPublicId`, `setSummary`, `setSelectedThreadPublicId`.
- **Efectos y APIs** `navigation.navigate`.
- **Condiciones que evalúa** `ausencia de safePublicId o ausencia de safeSummary o ausencia de category`, `ausencia de result.ok`, `threadPublicId`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo), [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo), [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`userPublicId.trim`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L70), [`summary.trim`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L71), [`setStatusTone`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L73), [`setStatus`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L74), [`setCreating`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L77), [`mobileApi.support.createIrregular`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L78), [`trim`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L98), [`setUserPublicId`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L101), [`setSummary`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L102), [`observability.track`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L103), [`setSelectedThreadPublicId`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L113), [`navigation.navigate`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L114).
- **Lo usa** [`SoporteIrregularScreen`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L161) (pasa a onPress).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L139) · callback JSX · dentro de [`SoporteIrregularScreen`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L12)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setCategory`.
- **Llamadas directas en el cuerpo** [`setCategory`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L139).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L173) · callback JSX · dentro de [`SoporteIrregularScreen`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L12)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`TAB_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L9) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L173).

#### [`styles`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L195) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L195).
- **Lo usa** [`SoporteIrregularScreen`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L123) (accede al módulo).

### [`apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L1)

Lista y filtra issues con contexto y eventos visibles para soporte. Facilita relacionar fallas que reportó el usuario con su registro operativo.

**Superficie que exporta.** [`SoporteIssuesScreen`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L19).

**Módulos que lo cargan.** [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L28) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/ui/BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/services/supportDeskQueries`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts).

#### [`levelStyle`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L13) · función

Implementa `level Style` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `level`.
- **Condiciones que evalúa** `level`.
- **Lo usa** [`SoporteIssuesScreen`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L157) (llama).

#### [`SoporteIssuesScreen`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L19) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `TextInput`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[issues, setIssues] mediante useState`, `[events, setEvents] mediante useState`, `[loading, setLoading] mediante useState`, `[error, setError] mediante useState`, `[query, setQuery] mediante useState`, `[selectedIssueId, setSelectedIssueId] mediante useState`.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `TextInput`, `BlockSkeleton`, `View`, `IssueFilterChip`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L9) (renderiza), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L139), [`filteredIssues.slice`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L139), [`levelStyle`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L157), [`toUpperCase`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L158), [`formatDateTime`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L170), [`filteredEvents.slice`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L183).
- **Lo usa** [`SoporteStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L86) (pasa a component).

#### [`loadData`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L27) · callback React · asíncrona · dentro de [`SoporteIssuesScreen`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L19)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`, `setIssues`, `setEvents`, `setLoading`.
- **Condiciones que evalúa** `ausencia de issuesRes.ok o ausencia de eventsRes.ok`.
- **Usa código de** [`fetchSupportIssuesContext`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L412) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia), [`fetchSupportIssueEventsContext`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L427) (llama).
- **Llamadas directas en el cuerpo** [`fetchSupportIssuesContext`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L29), [`fetchSupportIssueEventsContext`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L30), [`setError`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L34), [`setIssues`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L37), [`setEvents`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L38), [`setLoading`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L39).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L51) (llama), [`SoporteIssuesScreen`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L52) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L49) · callback de infraestructura · dentro de [`SoporteIssuesScreen`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L19)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SoporteIssuesScreen`.

- **Actualizaciones de estado o acciones** `setLoading`.
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L50), [`loadData`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L51).

#### [`issueMap`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L55) · cálculo memorizado · dentro de [`SoporteIssuesScreen`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L19)

Comprueba `sue Map` para decidir si se admite o continúa la operación.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`issues.reduce`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L56).
- **Lo usa** [`SoporteIssuesScreen`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L192) (accede al módulo).

#### [`filteredIssues`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L63) · cálculo memorizado · dentro de [`SoporteIssuesScreen`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L19)

Procesa `ed Issues` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de term`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L64), [`query.trim`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L64), [`issues.filter`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L66), [`join`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L67), [`filter`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L67), [`haystack.includes`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L79).
- **Lo usa** [`SoporteIssuesScreen`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L130) (accede al módulo).

#### [`filteredEvents`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L83) · cálculo memorizado · dentro de [`SoporteIssuesScreen`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L19)

Procesa `ed Events` según el criterio del módulo.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `selectedIssueId y event.issue_id`, `ausencia de term`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L84), [`query.trim`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L84), [`events.filter`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L85), [`join`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L88), [`filter`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L88), [`haystack.includes`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L102).
- **Lo usa** [`SoporteIssuesScreen`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L177) (accede al módulo).

#### [`IssueFilterChip.onPress`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L137) · callback JSX · dentro de [`SoporteIssuesScreen`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L19)

Responde al evento de interfaz `IssueFilterChip.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSelectedIssueId`.
- **Llamadas directas en el cuerpo** [`setSelectedIssueId`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L137).

#### [`IssueFilterChip.onPress`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L144) · callback JSX · dentro de [`SoporteIssuesScreen`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L19)

Responde al evento de interfaz `IssueFilterChip.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSelectedIssueId`.
- **Llamadas directas en el cuerpo** [`setSelectedIssueId`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L144).

#### [`IssueFilterChip`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L215) · componente React

Monta `Pressable`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{active, label, onPress}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Pressable`, `Text`.
- **Lo usa** [`SoporteIssuesScreen`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L134) (renderiza).

#### [`styles`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L233) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L233).
- **Lo usa** [`levelStyle`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L14) (accede al módulo), [`SoporteIssuesScreen`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L111) (accede al módulo), [`IssueFilterChip`](../../../apps/referidos-android/src/features/support/SoporteIssuesScreen.tsx#L225) (accede al módulo).

### [`apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L1)

Reúne estado del asesor, petición pendiente y actividad de jornadas. Separa el historial de trabajo de la lista de casos del inbox.

**Superficie que exporta.** [`SoporteJornadasScreen`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L36).

**Módulos que lo cargan.** [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L27) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/ui/BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/store/appStore`](../../../apps/referidos-android/src/shared/store/appStore.ts), [`@shared/services/supportDeskQueries`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts).

#### [`classifyStatusByWindow`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L15) · función

Implementa `classify Status By Window` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `startAt`, `endAt`.
- **Condiciones que evalúa** `start y ausencia de Number.isNaN y now`, `end y ausencia de Number.isNaN y now`.
- **Llamadas directas en el cuerpo** [`start.getTime`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L19), [`end.getTime`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L22).
- **Lo usa** [`loadHistory`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L109) (llama).

#### [`eventTitle`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L28) · función

Implementa `event Title` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `eventType`.
- **Condiciones que evalúa** `eventType`.
- **Lo usa** [`loadHistory`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L134) (llama).

#### [`SoporteJornadasScreen`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L36) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `BlockSkeleton`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[error, setError] mediante useState`, `[rows, setRows] mediante useState`.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `BlockSkeleton`, `View`, `MetricCard`.
- **Hooks que llama** `useAppStore`, `useState`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37) (llama), [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L9) (renderiza), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L38), [`rows.map`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L242), [`toUpperCase`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L246), [`formatDateTime`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L248), [`row.metadata.map`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L253).
- **Lo usa** [`SoporteStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L85) (pasa a component).

#### [`loadHistory`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L44) · callback React · asíncrona · dentro de [`SoporteJornadasScreen`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L36)

Consulta o invoca tabla o vista [`support_agent_sessions`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L371) y coordina las demás operaciones de esta ficha.

- **Retorno visible o tipo declarado** `id`, `type`, `status`, `occurred_at`, `title`, `subtitle`, `metadata`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRows`, `setLoading`, `setError`.
- **Efectos y APIs** `profileRows.push`.
- **Condiciones que evalúa** `ausencia de usuarioId`, `ausencia de profileRes.ok o sessionsRes.error o ausencia de eventsRes.ok`, `actorIds.length`, `profile.session_request_status`, `profile.authorized_for_work`.
- **Contrato de datos** tabla o vista [`support_agent_sessions`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L371) (`select`) en [`SoporteJornadasScreen.tsx:53`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L53), tabla o bucket [`support_agent_sessions`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L371) en [`SoporteJornadasScreen.tsx:53`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L53), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`SoporteJornadasScreen.tsx:89`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L89), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`SoporteJornadasScreen.tsx:89`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L89).
- **Usa código de** [`fetchSupportAgentProfile`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L267) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia), [`fetchSupportAgentEventsHistory`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L157) (llama), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`setRows`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L46), [`setLoading`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L47), [`fetchSupportAgentProfile`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L52), [`limit`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L53), [`order`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L53), [`eq`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L53), [`select`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L53), [`supabase.from`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L53), [`fetchSupportAgentEventsHistory`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L59), [`setError`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L63), [`map`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L80), [`filter`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L81) y 11 más.
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L184) (llama), [`SoporteJornadasScreen`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L185) (referencia), [`onRefresh`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L206) (llama).

#### [`actorLabel`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L99) · función · dentro de [`loadHistory`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L44)

Función auxiliar de `loadHistory` para `actor Label`.

- **Entradas** `actorId`.
- **Condiciones que evalúa** `ausencia de actorId`, `ausencia de row`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L103), [`join`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L103), [`filter`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L103).
- **Lo usa** [`loadHistory`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L124) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L182) · callback de infraestructura · dentro de [`SoporteJornadasScreen`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L36)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SoporteJornadasScreen`.

- **Actualizaciones de estado o acciones** `setLoading`.
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L183), [`loadHistory`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L184).

#### [`groupedCount`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L187) · cálculo memorizado · dentro de [`SoporteJornadasScreen`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L36)

Procesa `ed Count` según el criterio del módulo.

- **Retorno visible o tipo declarado** `actual`, `futura`, `pasada`.
- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`rows.filter`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L189).
- **Lo usa** [`SoporteJornadasScreen`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L228) (accede al módulo).

#### [`badgeStyleByStatus`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L196) · cálculo memorizado · dentro de [`SoporteJornadasScreen`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L36)

Función auxiliar de `SoporteJornadasScreen` para `badge Style By Status`.

- **Retorno visible o tipo declarado** `actual`, `futura`, `pasada`.
- **Hooks que llama** `useMemo`.
- **Lo usa** [`SoporteJornadasScreen`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L245) (accede al módulo).

#### [`onRefresh`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L204) · callback React · asíncrona · dentro de [`SoporteJornadasScreen`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L36)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`.
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L205), [`loadHistory`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L206).
- **Lo usa** [`SoporteJornadasScreen`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L220) (pasa a onPress).

#### [`MetricCard`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L268) · componente React

Monta `View`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{label, value}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `View`, `Text`.
- **Lo usa** [`SoporteJornadasScreen`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L228) (renderiza).

#### [`styles`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L277) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L277).
- **Lo usa** [`badgeStyleByStatus`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L197) (accede al módulo), [`SoporteJornadasScreen`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L215) (accede al módulo), [`MetricCard`](../../../apps/referidos-android/src/features/support/SoporteJornadasScreen.tsx#L270) (accede al módulo).
