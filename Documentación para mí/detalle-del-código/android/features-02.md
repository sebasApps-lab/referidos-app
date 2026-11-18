# Android · Pantallas por función y rol · 2 de 9

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L1)
- [`apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L1)
- [`apps/referidos-android/src/features/admin/AdminPromosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L1)
- [`apps/referidos-android/src/features/admin/AdminQRsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L1)
- [`apps/referidos-android/src/features/admin/AdminReportesScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L1)
- [`apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L1)
- [`apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L1)
- [`apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L1)

## Símbolos y conexiones

### [`apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L1)

Lee negocios del runtime, muestra métricas, filtros de estado y sector y detalle resumido. La consulta se comparte con otras vistas y se adapta a columnas disponibles.

**Superficie que exporta.** [`AdminNegociosScreen`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L9).

**Módulos que lo cargan.** [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L7) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`./components/AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/services/adminOps`](../../../apps/referidos-android/src/shared/services/adminOps.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts), [`./components/adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts).

#### [`AdminNegociosScreen`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L9) · componente React · exportación por defecto

Monta `AdminCollectionScreen`, `SectionCard`, `Text`, `View`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[rows, setRows] mediante useState`, `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[error, setError] mediante useState`, `[query, setQuery] mediante useState`, `[sectorFilter, setSectorFilter] mediante useState`, `[statusFilter, setStatusFilter] mediante useState`.
- **Interfaz que monta** `AdminCollectionScreen`, `SectionCard`, `Text`, `View`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L49) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts#L3) (accede al módulo), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`filtered.map`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L129), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L130), [`formatDateTime`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L151).
- **Lo usa** [`AdminStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L39) (pasa a component).

#### [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L18) · callback React · asíncrona · dentro de [`AdminNegociosScreen`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L9)

Obtiene o resuelve `Rows` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setRows`, `setError`.
- **Condiciones que evalúa** `ausencia de refreshing`, `ausencia de result.ok`.
- **Usa código de** [`fetchAdminNegocios`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L114) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L19), [`fetchAdminNegocios`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L20), [`setRows`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L22), [`setError`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L23).
- **Lo usa** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L34) (llama).

#### [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L32) · callback React · asíncrona · dentro de [`AdminNegociosScreen`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L9)

Coordina cambios de estado durante `refresh All`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`.
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L33), [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L34).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L39) (llama), [`AdminNegociosScreen`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L40) (referencia), [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L121) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L38) · callback de infraestructura · dentro de [`AdminNegociosScreen`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L9)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminNegociosScreen`.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L39).

#### [`sectors`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L42) · cálculo memorizado · dentro de [`AdminNegociosScreen`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L9)

Función auxiliar de `AdminNegociosScreen` para `sectors`.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`sort`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L43), [`filter`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L45), [`rows.map`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L45), [`trim`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L46), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L46), [`a.localeCompare`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L49).
- **Lo usa** [`filters`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L92) (accede al módulo).

#### [`filtered`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L52) · cálculo memorizado · dentro de [`AdminNegociosScreen`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L9)

Procesa `ed` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L53), [`query.trim`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L53), [`rows.filter`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L54), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L55), [`trim`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L56), [`nombre.includes`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L62), [`direccion.includes`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L63), [`owner.includes`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L64).
- **Lo usa** [`metrics`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L80) (accede al módulo), [`AdminNegociosScreen`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L122) (accede al módulo).

#### [`metrics`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L71) · cálculo memorizado · dentro de [`AdminNegociosScreen`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L9)

Función auxiliar de `AdminNegociosScreen` para `metrics`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`rows.filter`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L72), [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L73), [`trim`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L73), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L73).
- **Lo usa** [`AdminNegociosScreen`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L119) (pasa a metrics).

#### [`filters`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L84) · cálculo memorizado · dentro de [`AdminNegociosScreen`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L9)

Función auxiliar de `AdminNegociosScreen` para `filters`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`sectors.map`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L92).
- **Lo usa** [`AdminNegociosScreen`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L120) (pasa a filters).

#### [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L121) · callback JSX · dentro de [`AdminNegociosScreen`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L9)

Responde al evento de interfaz `AdminCollectionScreen.onRefresh`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L121).

### [`apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L1)

Punto de entrada de diagnóstico con listados de eventos recientes y vínculos a issues, error codes y logs. Reutiliza el feed de eventos.

**Superficie que exporta.** [`AdminObservabilidadScreen`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L9).

**Módulos que lo cargan.** [`RoleTabs.tsx`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L18) (importa).

**Dependencias del archivo.** `react`, `@react-navigation/native`, `react-native`, [`@navigation/routeKeys`](../../../apps/referidos-android/src/navigation/routeKeys.ts), [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/ui/ObservabilityEventFeed`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx).

#### [`AdminObservabilidadScreen`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L9) · componente React · exportación por defecto

Monta `ScreenScaffold`, `View`, `SectionCard`, `NavCard`, `ObservabilityEventFeed`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `ScreenScaffold`, `View`, `SectionCard`, `NavCard`, `ObservabilityEventFeed`.
- **Hooks que llama** `useNavigation`.
- **Usa código de** [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`ObservabilityEventFeed`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L73) (renderiza).
- **Lo usa** [`AdminTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L151) (referencia).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L23) · callback JSX · dentro de [`AdminObservabilidadScreen`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L9)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L23).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L28) · callback JSX · dentro de [`AdminObservabilidadScreen`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L9)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L28).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L33) · callback JSX · dentro de [`AdminObservabilidadScreen`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L9)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L33).

#### [`NavCard`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L50) · componente React

Monta `Pressable`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, description, onPress}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Pressable`, `Text`.
- **Lo usa** [`AdminObservabilidadScreen`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L20) (renderiza).

#### [`styles`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L68) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L68).
- **Lo usa** [`AdminObservabilidadScreen`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L17) (accede al módulo), [`NavCard`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L60) (accede al módulo).

### [`apps/referidos-android/src/features/admin/AdminPromosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L1)

Lee promociones, agrega indicadores y habilita el cambio de estado seleccionado desde un modal. Usa el servicio que actualiza la fila y vuelve a cargar la lista.

**Superficie que exporta.** [`AdminPromosScreen`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L21).

**Módulos que lo cargan.** [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L8) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`./components/AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/services/adminOps`](../../../apps/referidos-android/src/shared/services/adminOps.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts), [`@shared/store/modalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`./components/adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts).

#### [`PROMO_STATUS_OPTIONS`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L15) · variable de módulo

Conserva la lista de `PROMO STATUS OPTIONS` usada por el módulo.

- **Lo usa** [`handleChangeStatus`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L96) (accede al módulo), [`AdminPromosScreen`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L157) (referencia).

#### [`AdminPromosScreen`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L21) · componente React · exportación por defecto

Monta `AdminCollectionScreen`, `SectionCard`, `View`, `Text`, `Pressable`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `openPicker mediante useModalStore`, `selector state.openPicker`, `openAlert mediante useModalStore`, `selector state.openAlert`, `[rows, setRows] mediante useState`, `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[error, setError] mediante useState`, `[query, setQuery] mediante useState`, `[statusFilter, setStatusFilter] mediante useState`, `[busyId, setBusyId] mediante useState`.
- **Interfaz que monta** `AdminCollectionScreen`, `SectionCard`, `View`, `Text`, `Pressable`.
- **Hooks que llama** `useModalStore`, `useState`, `useEffect`.
- **Usa código de** [`useModalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70) (llama), [`AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L49) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts#L3) (accede al módulo), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`filtered.map`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L166), [`trim`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L167), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L167), [`formatDateTime`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L185).
- **Lo usa** [`AdminStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L40) (pasa a component).

#### [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L32) · callback React · asíncrona · dentro de [`AdminPromosScreen`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L21)

Obtiene o resuelve `Rows` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setRows`, `setError`.
- **Condiciones que evalúa** `ausencia de refreshing`, `ausencia de result.ok`.
- **Usa código de** [`fetchAdminPromos`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L121) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L33), [`fetchAdminPromos`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L34), [`setRows`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L36), [`setError`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L37).
- **Lo usa** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L48) (llama).

#### [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L46) · callback React · asíncrona · dentro de [`AdminPromosScreen`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L21)

Coordina cambios de estado durante `refresh All`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`.
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L47), [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L48).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L53) (llama), [`AdminPromosScreen`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L54) (referencia), [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L161) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L52) · callback de infraestructura · dentro de [`AdminPromosScreen`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L21)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminPromosScreen`.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L53).

#### [`filtered`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L56) · cálculo memorizado · dentro de [`AdminPromosScreen`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L21)

Procesa `ed` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L57), [`query.trim`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L57), [`rows.filter`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L58), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L59), [`trim`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L61), [`title.includes`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L62), [`negocio.includes`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L62).
- **Lo usa** [`AdminPromosScreen`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L162) (accede al módulo).

#### [`metrics`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L68) · cálculo memorizado · dentro de [`AdminPromosScreen`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L21)

Función auxiliar de `AdminPromosScreen` para `metrics`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `status`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`rows.forEach`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L74), [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L75), [`trim`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L75), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L75).
- **Lo usa** [`AdminPromosScreen`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L149) (pasa a metrics).

#### [`handleChangeStatus`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L89) · callback React · dentro de [`AdminPromosScreen`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L21)

Maneja `Change Status` y coordina las acciones indicadas abajo.

- **Entradas** `row`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `ausencia de promoId`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L90), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L90), [`openPicker`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L93), [`PROMO_STATUS_OPTIONS.map`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L96).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L192) (llama).

#### [`onSelect`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L101) · función · asíncrona · dentro de [`handleChangeStatus`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L89)

Maneja `Select` y coordina las acciones indicadas abajo.

- **Entradas** `nextStatus`.
- **Actualizaciones de estado o acciones** `setBusyId`, `setRows`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`updatePromoStatusById`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L313) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setBusyId`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L102), [`updatePromoStatusById`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L103), [`openAlert`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L106), [`setRows`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L113), [`current.map`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L114), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L115), [`observability.track`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L124).

#### [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L161) · callback JSX · dentro de [`AdminPromosScreen`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L21)

Responde al evento de interfaz `AdminCollectionScreen.onRefresh`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L161).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L192) · callback JSX · dentro de [`AdminPromosScreen`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L21)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleChangeStatus`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L192).

### [`apps/referidos-android/src/features/admin/AdminQRsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L1)

Lista registros de `qr_validos` con filtros y métricas. Da una vista administrativa del estado de códigos y su uso, mientras el canje cotidiano vive en el escáner de negocio.

**Superficie que exporta.** [`AdminQRsScreen`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L9).

**Módulos que lo cargan.** [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L9) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`./components/AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/services/adminOps`](../../../apps/referidos-android/src/shared/services/adminOps.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts), [`./components/adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts).

#### [`AdminQRsScreen`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L9) · componente React · exportación por defecto

Monta `AdminCollectionScreen`, `SectionCard`, `View`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[rows, setRows] mediante useState`, `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[error, setError] mediante useState`, `[query, setQuery] mediante useState`, `[statusFilter, setStatusFilter] mediante useState`.
- **Interfaz que monta** `AdminCollectionScreen`, `SectionCard`, `View`, `Text`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L49) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts#L3) (accede al módulo), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`filtered.map`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L101), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L102), [`formatDateTime`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L121).
- **Lo usa** [`AdminStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L41) (pasa a component).

#### [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L17) · callback React · asíncrona · dentro de [`AdminQRsScreen`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L9)

Obtiene o resuelve `Rows` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setRows`, `setError`.
- **Condiciones que evalúa** `ausencia de refreshing`, `ausencia de result.ok`.
- **Usa código de** [`fetchAdminQrs`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L128) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L18), [`fetchAdminQrs`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L19), [`setRows`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L21), [`setError`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L22).
- **Lo usa** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L33) (llama).

#### [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L31) · callback React · asíncrona · dentro de [`AdminQRsScreen`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L9)

Coordina cambios de estado durante `refresh All`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`.
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L32), [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L33).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L38) (llama), [`AdminQRsScreen`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L39) (referencia), [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L96) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L37) · callback de infraestructura · dentro de [`AdminQRsScreen`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L9)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminQRsScreen`.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L38).

#### [`filtered`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L41) · cálculo memorizado · dentro de [`AdminQRsScreen`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L9)

Procesa `ed` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L42), [`query.trim`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L42), [`rows.filter`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L43), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L44), [`trim`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L47), [`code.includes`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L48), [`cliente.includes`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L48), [`negocio.includes`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L48).
- **Lo usa** [`AdminQRsScreen`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L97) (accede al módulo).

#### [`metrics`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L54) · cálculo memorizado · dentro de [`AdminQRsScreen`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L9)

Función auxiliar de `AdminQRsScreen` para `metrics`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `status`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`rows.forEach`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L60), [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L61), [`trim`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L61), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L61).
- **Lo usa** [`AdminQRsScreen`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L82) (pasa a metrics).

#### [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L96) · callback JSX · dentro de [`AdminQRsScreen`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L9)

Responde al evento de interfaz `AdminCollectionScreen.onRefresh`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L96).

### [`apps/referidos-android/src/features/admin/AdminReportesScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L1)

Agrupa reportes por estado, los filtra y ofrece cambios de estado mediante `adminOps`. El control pasa por la función administrativa en el runtime.

**Superficie que exporta.** [`AdminReportesScreen`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L17).

**Módulos que lo cargan.** [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L10) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`./components/AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/services/adminOps`](../../../apps/referidos-android/src/shared/services/adminOps.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/store/modalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts), [`./components/adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts).

#### [`REPORTE_STATUS_OPTIONS`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L11) · variable de módulo

Conserva la lista de `REPORTE STATUS OPTIONS` usada por el módulo.

- **Lo usa** [`handleChangeStatus`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L98) (accede al módulo), [`AdminReportesScreen`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L154) (referencia).

#### [`AdminReportesScreen`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L17) · componente React · exportación por defecto

Monta `AdminCollectionScreen`, `SectionCard`, `View`, `Text`, `Pressable`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `openPicker mediante useModalStore`, `selector state.openPicker`, `openAlert mediante useModalStore`, `selector state.openAlert`, `[rows, setRows] mediante useState`, `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[error, setError] mediante useState`, `[query, setQuery] mediante useState`, `[statusFilter, setStatusFilter] mediante useState`, `[busyId, setBusyId] mediante useState`.
- **Interfaz que monta** `AdminCollectionScreen`, `SectionCard`, `View`, `Text`, `Pressable`.
- **Hooks que llama** `useModalStore`, `useState`, `useEffect`.
- **Usa código de** [`useModalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70) (llama), [`AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L49) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts#L3) (accede al módulo), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`filtered.map`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L162), [`trim`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L163), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L163), [`formatDateTime`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L189).
- **Lo usa** [`AdminStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L42) (pasa a component).

#### [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L28) · callback React · asíncrona · dentro de [`AdminReportesScreen`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L17)

Obtiene o resuelve `Rows` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setRows`, `setError`.
- **Condiciones que evalúa** `ausencia de refreshing`, `ausencia de result.ok`.
- **Usa código de** [`fetchAdminReportes`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L135) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L29), [`fetchAdminReportes`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L30), [`setRows`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L32), [`setError`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L33).
- **Lo usa** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L44) (llama).

#### [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L42) · callback React · asíncrona · dentro de [`AdminReportesScreen`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L17)

Coordina cambios de estado durante `refresh All`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`.
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L43), [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L44).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L49) (llama), [`AdminReportesScreen`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L50) (referencia), [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L157) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L48) · callback de infraestructura · dentro de [`AdminReportesScreen`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L17)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminReportesScreen`.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L49).

#### [`filtered`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L52) · cálculo memorizado · dentro de [`AdminReportesScreen`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L17)

Procesa `ed` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L53), [`query.trim`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L53), [`rows.filter`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L54), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L55), [`trim`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L59), [`summary.includes`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L62), [`target.includes`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L63), [`targetId.includes`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L64), [`reporter.includes`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L65).
- **Lo usa** [`AdminReportesScreen`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L158) (accede al módulo).

#### [`metrics`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L71) · cálculo memorizado · dentro de [`AdminReportesScreen`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L17)

Función auxiliar de `AdminReportesScreen` para `metrics`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `status`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`rows.forEach`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L77), [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L78), [`trim`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L78), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L78).
- **Lo usa** [`AdminReportesScreen`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L148) (pasa a metrics).

#### [`handleChangeStatus`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L90) · callback React · dentro de [`AdminReportesScreen`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L17)

Maneja `Change Status` y coordina las acciones indicadas abajo.

- **Entradas** `row`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `ausencia de reporteId`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L91), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L91), [`openPicker`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L95), [`REPORTE_STATUS_OPTIONS.map`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L98).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L193) (llama).

#### [`onSelect`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L103) · función · asíncrona · dentro de [`handleChangeStatus`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L90)

Maneja `Select` y coordina las acciones indicadas abajo.

- **Entradas** `nextStatus`.
- **Actualizaciones de estado o acciones** `setBusyId`, `setRows`.
- **Usa código de** [`updateAdminReporteStatus`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L142) (llama), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setBusyId`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L104), [`updateAdminReporteStatus`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L106), [`setRows`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L107), [`current.map`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L108), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L109), [`observability.track`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L114), [`openAlert`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L124).

#### [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L157) · callback JSX · dentro de [`AdminReportesScreen`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L17)

Responde al evento de interfaz `AdminCollectionScreen.onRefresh`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L157).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L193) · callback JSX · dentro de [`AdminReportesScreen`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L17)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleChangeStatus`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L193).

### [`apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L1)

Reúne flags del dispositivo y flags persistidos de soporte, configuración de autoasignación y códigos de registro. Distingue el contrato de cada grupo mediante sus servicios.

**Superficie que exporta.** [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L71).

**Módulos que lo cargan.** [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L14) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/ui/BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx), [`@shared/store/appStore`](../../../apps/referidos-android/src/shared/store/appStore.ts), [`@shared/services/supportOps`](../../../apps/referidos-android/src/shared/services/supportOps.ts), [`@shared/services/systemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts), [`@shared/services/supportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts).

#### [`SYSTEM_FLAGS`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L25) · variable de módulo

Declara `SYSTEM_FLAGS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L240) (accede al módulo).

#### [`SUPPORT_AUTH_FLAGS`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L53) · variable de módulo

Declara `SUPPORT_AUTH_FLAGS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L255) (accede al módulo).

#### [`statusOfCode`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L64) · función

Implementa `status Of Code` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `row`.
- **Condiciones que evalúa** `row.revoked_at`, `row.used_at`, `row.expires_at`.
- **Llamadas directas en el cuerpo** [`getTime`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L67).
- **Lo usa** [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L378) (llama).

#### [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L71) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `BlockSkeleton`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[loading, setLoading] mediante useState`, `[saving, setSaving] mediante useState`, `[creatingCode, setCreatingCode] mediante useState`, `[error, setError] mediante useState`, `[ok, setOk] mediante useState`, `[systemFlags, setSystemFlags] mediante useState`, `[supportFlags, setSupportFlags] mediante useState`, `[supportDraft, setSupportDraft] mediante useState`, `[codes, setCodes] mediante useState`.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `BlockSkeleton`, `ToggleRow`, `NumericField`, `View`.
- **Hooks que llama** `useAppStore`, `useState`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37) (llama), [`DEFAULT_SYSTEM_FEATURE_FLAGS`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L5) (referencia), [`SupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L3) (referencia), [`DEFAULT_SUPPORT_RUNTIME_FLAGS`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L18) (referencia), [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L9) (renderiza).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L72), [`SYSTEM_FLAGS.map`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L240), [`SUPPORT_AUTH_FLAGS.map`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L255), [`codes.map`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L377), [`statusOfCode`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L378), [`status.toUpperCase`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L393).
- **Lo usa** [`AdminStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L46) (pasa a component).

#### [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L87) · callback React · asíncrona · dentro de [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L71)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setError`, `setSystemFlags`, `setSupportFlags`, `setSupportDraft`, `setCodes`.
- **Usa código de** [`fetchSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L45) (llama), [`fetchSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L134) (llama), [`listRegistrationCodes`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L268) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L88), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L89), [`fetchSystemFeatureFlags`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L92), [`fetchSupportRuntimeFlags`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L93), [`listRegistrationCodes`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L94), [`setSystemFlags`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L96), [`setSupportFlags`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L97), [`setSupportDraft`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L98), [`setCodes`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L99).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L108) (llama), [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L109) (referencia), [`handleCreateCode`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L195) (llama), [`handleRevokeCode`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L211) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L107) · callback de infraestructura · dentro de [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L71)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSistemaScreen`.

- **Llamadas directas en el cuerpo** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L108).

#### [`toggleSystemFlag`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L112) · callback React · asíncrona · dentro de [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L71)

Coordina cambios de estado durante `toggle System Flag`.

- **Entradas** `key`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSaving`, `setError`, `setOk`, `setSystemFeatureFlag`, `setSystemFlags`.
- **Usa código de** [`DEFAULT_SYSTEM_FEATURE_FLAGS`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L5) (referencia), [`setSystemFeatureFlag`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L72) (llama).
- **Llamadas directas en el cuerpo** [`setSaving`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L113), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L114), [`setOk`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L115), [`setSystemFeatureFlag`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L117), [`setSystemFlags`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L118).
- **Lo usa** [`ToggleRow.onPress`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L246) (llama).

#### [`toggleSupportFlag`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L130) · callback React · asíncrona · dentro de [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L71)

Coordina cambios de estado durante `toggle Support Flag`.

- **Entradas** `key`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSaving`, `setError`, `setOk`, `setSupportRuntimeFlag`, `setSupportFlags`, `setSupportDraft`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`DEFAULT_SUPPORT_RUNTIME_FLAGS`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L18) (referencia), [`setSupportRuntimeFlag`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L202) (llama).
- **Llamadas directas en el cuerpo** [`setSaving`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L131), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L132), [`setOk`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L133), [`setSupportRuntimeFlag`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L135), [`setSupportFlags`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L143), [`setSupportDraft`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L144).
- **Lo usa** [`ToggleRow.onPress`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L261) (llama).

#### [`handleSaveRuntimeConfig`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L150) · callback React · asíncrona · dentro de [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L71)

Maneja `Save Runtime Config` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSaving`, `setError`, `setOk`, `setSupportFlags`, `setSupportDraft`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`updateSupportRuntimeFlags`](../../../apps/referidos-android/src/shared/services/supportRuntimeFlags.ts#L164) (llama).
- **Llamadas directas en el cuerpo** [`setSaving`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L151), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L152), [`setOk`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L153), [`updateSupportRuntimeFlags`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L154), [`setSupportFlags`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L183), [`setSupportDraft`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L184).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L353) (llama).

#### [`handleCreateCode`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L188) · callback React · asíncrona · dentro de [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L71)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setCreatingCode`, `setError`, `setOk`.
- **Usa código de** [`createRegistrationCode`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L273) (llama).
- **Llamadas directas en el cuerpo** [`setCreatingCode`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L189), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L190), [`setOk`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L191), [`createRegistrationCode`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L193), [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L195).
- **Lo usa** [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L367) (pasa a onPress).

#### [`handleRevokeCode`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L204) · callback React · asíncrona · dentro de [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L71)

Maneja `Revoke Code` y coordina las acciones indicadas abajo.

- **Entradas** `id`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSaving`, `setError`, `setOk`.
- **Usa código de** [`revokeRegistrationCode`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L277) (llama).
- **Llamadas directas en el cuerpo** [`setSaving`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L205), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L206), [`setOk`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L207), [`revokeRegistrationCode`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L209), [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L211).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L401) (llama).

#### [`ToggleRow.onPress`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L246) · callback JSX · dentro de [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L71)

Responde al evento de interfaz `ToggleRow.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`toggleSystemFlag`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L246).

#### [`ToggleRow.onPress`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L261) · callback JSX · dentro de [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L71)

Responde al evento de interfaz `ToggleRow.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`toggleSupportFlag`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L261).

#### [`ToggleRow.onPress`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L271) · callback JSX · dentro de [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L71)

Responde al evento de interfaz `ToggleRow.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSupportDraft`.
- **Llamadas directas en el cuerpo** [`setSupportDraft`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L272).

#### [`NumericField.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L281) · callback JSX · dentro de [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L71)

Responde al evento de interfaz `NumericField.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setSupportDraft`.
- **Llamadas directas en el cuerpo** [`setSupportDraft`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L282).

#### [`NumericField.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L288) · callback JSX · dentro de [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L71)

Responde al evento de interfaz `NumericField.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setSupportDraft`.
- **Llamadas directas en el cuerpo** [`setSupportDraft`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L289).

#### [`NumericField.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L295) · callback JSX · dentro de [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L71)

Responde al evento de interfaz `NumericField.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setSupportDraft`.
- **Llamadas directas en el cuerpo** [`setSupportDraft`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L296).

#### [`NumericField.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L305) · callback JSX · dentro de [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L71)

Responde al evento de interfaz `NumericField.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setSupportDraft`.
- **Llamadas directas en el cuerpo** [`setSupportDraft`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L306).

#### [`NumericField.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L315) · callback JSX · dentro de [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L71)

Responde al evento de interfaz `NumericField.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setSupportDraft`.
- **Llamadas directas en el cuerpo** [`setSupportDraft`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L316).

#### [`NumericField.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L325) · callback JSX · dentro de [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L71)

Responde al evento de interfaz `NumericField.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setSupportDraft`.
- **Llamadas directas en el cuerpo** [`setSupportDraft`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L326).

#### [`NumericField.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L335) · callback JSX · dentro de [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L71)

Responde al evento de interfaz `NumericField.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setSupportDraft`.
- **Llamadas directas en el cuerpo** [`setSupportDraft`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L336).

#### [`NumericField.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L345) · callback JSX · dentro de [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L71)

Responde al evento de interfaz `NumericField.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setSupportDraft`.
- **Llamadas directas en el cuerpo** [`setSupportDraft`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L346).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L353) · callback JSX · dentro de [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L71)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleSaveRuntimeConfig`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L353).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L401) · callback JSX · dentro de [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L71)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleRevokeCode`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L401).

#### [`ToggleRow`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L417) · componente React

Monta `View`, `Text`, `Pressable`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, description, enabled, onPress}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `View`, `Text`, `Pressable`.
- **Lo usa** [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L241) (renderiza).

#### [`NumericField`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L441) · componente React

Monta `View`, `Text`, `TextInput`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{label, value, onChangeText}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `View`, `Text`, `TextInput`.
- **Lo usa** [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L278) (renderiza).

#### [`styles`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L463) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L463).
- **Lo usa** [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L223) (accede al módulo), [`ToggleRow`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L429) (accede al módulo), [`NumericField`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L451) (accede al módulo).

### [`apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L1)

Controla la propia jornada administrativa, acciones sobre jornadas de asesores, permisos y asignación/reasignación. También concentra accesos a módulos especializados de soporte.

**Superficie que exporta.** [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L27).

**Módulos que lo cargan.** [`RoleTabs.tsx`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L17) (importa).

**Dependencias del archivo.** `react`, `@react-navigation/native`, `react-native`, [`@navigation/routeKeys`](../../../apps/referidos-android/src/navigation/routeKeys.ts), [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/ui/BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/store/appStore`](../../../apps/referidos-android/src/shared/store/appStore.ts), [`@shared/services/supportDeskQueries`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts).

#### [`ACTIVE_THREAD_STATUSES`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L17) · variable de módulo

Conserva la lista de `ACTIVE THREAD STATUSES` usada por el módulo.

- **Lo usa** [`activeThreads`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L57) (accede al módulo).

#### [`agentDisplayName`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L19) · función

Implementa `agent Display Name` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `agent`.
- **Condiciones que evalúa** `full`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L20).
- **Lo usa** [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L327) (llama).

#### [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L27) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `SectionCard`, `View`, `Pressable`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `adminUser mediante useAppStore`, `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[error, setError] mediante useState`, `[sessionError, setSessionError] mediante useState`, `[adminSession, setAdminSession] mediante useState`, `[agents, setAgents] mediante useState`, `[threads, setThreads] mediante useState`, `[busyKey, setBusyKey] mediante useState`.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `SectionCard`, `View`, `Pressable`, `Text`, `BlockSkeleton`.
- **Hooks que llama** `useNavigation`, `useAppStore`, `useState`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37) (llama), [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L9) (renderiza), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L30), [`formatDateTime`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L288), [`agents.map`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L321), [`agentDisplayName`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L327), [`activeThreads.map`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L406), [`availableAgents.map`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L423).
- **Lo usa** [`AdminTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L147) (referencia).

#### [`availableAgents`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L44) · cálculo memorizado · dentro de [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L27)

Función auxiliar de `AdminSoporteScreen` para `available Agents`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`agents.filter`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L45).
- **Lo usa** [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L315) (accede al módulo).

#### [`activeThreads`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L55) · cálculo memorizado · dentro de [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L27)

Función auxiliar de `AdminSoporteScreen` para `active Threads`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`threads.filter`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L56), [`ACTIVE_THREAD_STATUSES.includes`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L57).
- **Lo usa** [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L400) (accede al módulo).

#### [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L62) · callback React · asíncrona · dentro de [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L27)

Obtiene o resuelve `All` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setAdminSession`, `setAgents`, `setThreads`, `setError`.
- **Condiciones que evalúa** `ausencia de adminUserId`, `ausencia de refreshing`.
- **Usa código de** [`fetchActiveAgentSession`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L284) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia), [`fetchSupportAgentsDashboard`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L302) (llama), [`fetchSupportInboxRows`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L51) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L64), [`fetchActiveAgentSession`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L67), [`fetchSupportAgentsDashboard`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L68), [`fetchSupportInboxRows`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L69), [`setAdminSession`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L76), [`setAgents`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L77), [`setThreads`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L78), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L81).
- **Lo usa** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L87) (llama).

#### [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L85) · callback React · asíncrona · dentro de [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L27)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`.
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L86), [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L87).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L92) (llama), [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L93) (referencia), [`handleStartAdminSession`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L119) (llama), [`handleEndAdminSession`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L141) (llama), [`handleAuthorize`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L167) (llama), [`handleStartAgentSession`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L181) (llama), [`handleEndAgentSession`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L198) (llama), [`handleDenyRequest`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L212) (llama), [`handleAssign`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L238) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L91) · callback de infraestructura · dentro de [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L27)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSoporteScreen`.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L92).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L95) · callback de infraestructura · dentro de [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L27)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSoporteScreen`.

- **Actualizaciones de estado o acciones** `clearInterval`.
- **Efectos y APIs** `setInterval`, `clearInterval`.
- **Condiciones que evalúa** `ausencia de sessionActive`.
- **Llamadas directas en el cuerpo** [`setInterval`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L97), [`clearInterval`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L100).

#### [`setInterval · callback`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L97) · callback de infraestructura · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L95)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`mobileApi.support.pingAdminSession`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L98).

#### [`handleStartAdminSession`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L103) · callback React · asíncrona · dentro de [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L27)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSessionError`, `setBusyKey`.
- **Condiciones que evalúa** `ausencia de adminUserId`, `ausencia de result.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo), [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setSessionError`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L105), [`setBusyKey`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L106), [`mobileApi.support.startAdminSession`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L107), [`observability.track`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L113), [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L119).
- **Lo usa** [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L297) (pasa a onPress).

#### [`handleEndAdminSession`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L122) · callback React · asíncrona · dentro de [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L27)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSessionError`, `setBusyKey`.
- **Condiciones que evalúa** `ausencia de adminUserId`, `ausencia de result.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo), [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setSessionError`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L124), [`setBusyKey`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L125), [`mobileApi.support.endAdminSession`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L126), [`observability.track`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L135), [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L141).
- **Lo usa** [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L305) (pasa a onPress).

#### [`handleAuthorize`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L145) · callback React · asíncrona · dentro de [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L27)

Guarda datos en tabla o vista [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) y coordina las demás operaciones de esta ficha.

- **Entradas** `agent`, `authorized`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setBusyKey`, `setError`.
- **Condiciones que evalúa** `authorized`, `updateError`.
- **Contrato de datos** tabla o vista [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) (`upsert`) en [`AdminSoporteScreen.tsx:159`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L159), tabla o bucket [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) en [`AdminSoporteScreen.tsx:159`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L159).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setBusyKey`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L146), [`toISOString`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L153), [`upsert`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L159), [`supabase.from`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L159), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L164), [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L167).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L351) (llama).

#### [`handleStartAgentSession`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L173) · callback React · asíncrona · dentro de [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L27)

Maneja `Start Agent Session` y coordina las acciones indicadas abajo.

- **Entradas** `agentId`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setBusyKey`, `setError`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setBusyKey`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L174), [`mobileApi.support.startAdminSession`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L175), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L178), [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L181).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L365) (llama).

#### [`handleEndAgentSession`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L187) · callback React · asíncrona · dentro de [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L27)

Maneja `End Agent Session` y coordina las acciones indicadas abajo.

- **Entradas** `agentId`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setBusyKey`, `setError`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setBusyKey`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L188), [`mobileApi.support.endAdminSession`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L189), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L195), [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L198).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L373) (llama).

#### [`handleDenyRequest`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L204) · callback React · asíncrona · dentro de [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L27)

Maneja `Deny Request` y coordina las acciones indicadas abajo.

- **Entradas** `agentId`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setBusyKey`, `setError`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setBusyKey`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L205), [`mobileApi.support.denyAdminSession`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L206), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L209), [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L212).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L383) (llama).

#### [`handleAssign`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L218) · callback React · asíncrona · dentro de [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L27)

Maneja `Assign` y coordina las acciones indicadas abajo.

- **Entradas** `threadPublicId`, `agentId`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setBusyKey`, `setError`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo), [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setBusyKey`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L219), [`mobileApi.support.assignThread`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L220), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L226), [`observability.track`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L229), [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L238).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L430) (llama).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L249) · callback JSX · dentro de [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L27)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L249).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L255) · callback JSX · dentro de [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L27)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L255).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L261) · callback JSX · dentro de [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L27)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L261).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L351) · callback JSX · dentro de [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L27)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleAuthorize`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L351).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L365) · callback JSX · dentro de [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L27)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleStartAgentSession`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L365).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L373) · callback JSX · dentro de [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L27)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleEndAgentSession`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L373).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L383) · callback JSX · dentro de [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L27)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleDenyRequest`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L383).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L429) · callback JSX · dentro de [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L27)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleAssign`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L430).

#### [`styles`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L453) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L453).
- **Lo usa** [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L245) (accede al módulo).

### [`apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L1)

Amplía la vista de asesores con métricas, historial de eventos, autorización y decisiones sobre sesiones. Usa los servicios de consultas y de acciones de soporte.

**Superficie que exporta.** [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L23).

**Módulos que lo cargan.** [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L26) (importa).

**Dependencias del archivo.** `react`, `react-native`, `@react-navigation/native`, [`@navigation/routeKeys`](../../../apps/referidos-android/src/navigation/routeKeys.ts), [`./components/AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/services/supportDeskQueries`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts), [`./components/adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts).

#### [`agentDisplayName`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L15) · función

Implementa `agent Display Name` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `agent`.
- **Condiciones que evalúa** `full`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L16), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L16).
- **Lo usa** [`filtered`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L84) (llama), [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L213) (llama).

#### [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L23) · componente React · exportación por defecto

Monta `AdminCollectionScreen`, `SectionCard`, `View`, `Pressable`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[rows, setRows] mediante useState`, `[selectedAgentId, setSelectedAgentId] mediante useState`, `[events, setEvents] mediante useState`, `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[error, setError] mediante useState`, `[query, setQuery] mediante useState`, `[busyKey, setBusyKey] mediante useState`.
- **Interfaz que monta** `AdminCollectionScreen`, `SectionCard`, `View`, `Pressable`, `Text`.
- **Hooks que llama** `useNavigation`, `useState`, `useEffect`.
- **Usa código de** [`AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L49) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts#L3) (accede al módulo), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`filtered.map`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L197), [`trim`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L198), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L198), [`agentDisplayName`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L213), [`events.map`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L289), [`formatDateTime`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L298).
- **Lo usa** [`AdminStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L75) (pasa a component).

#### [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L34) · callback React · asíncrona · dentro de [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L23)

Obtiene o resuelve `Rows` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setRows`, `setError`, `setSelectedAgentId`.
- **Condiciones que evalúa** `ausencia de refreshing`, `ausencia de result.ok`, `ausencia de selectedAgentId y nextRows.length`.
- **Usa código de** [`fetchSupportAgentsDashboard`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L302) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L35), [`fetchSupportAgentsDashboard`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L36), [`setRows`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L38), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L39), [`setSelectedAgentId`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L46), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L46).
- **Lo usa** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L69) (llama).

#### [`loadEvents`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L52) · callback React · asíncrona · dentro de [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L23)

Obtiene o resuelve el valor de eventos para entregarlo al consumidor.

- **Entradas** `agentId`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setEvents`, `setError`.
- **Condiciones que evalúa** `ausencia de safeAgentId`, `ausencia de result.ok`.
- **Usa código de** [`fetchSupportAgentEventsHistory`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L157) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L53), [`setEvents`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L55), [`fetchSupportAgentEventsHistory`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L58), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L61).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L78) (llama), [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L79) (referencia).

#### [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L67) · callback React · asíncrona · dentro de [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L23)

Coordina cambios de estado durante `refresh All`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`.
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L68), [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L69).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L74) (llama), [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L75) (referencia), [`updateAuthorization`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L131) (llama), [`startAgentSession`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L145) (llama), [`endAgentSession`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L162) (llama), [`denyRequest`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L176) (llama), [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L192) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L73) · callback de infraestructura · dentro de [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L23)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSupportAgentsScreen`.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L74).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L77) · callback de infraestructura · dentro de [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L23)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminSupportAgentsScreen`.

- **Llamadas directas en el cuerpo** [`loadEvents`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L78).

#### [`filtered`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L81) · cálculo memorizado · dentro de [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L23)

Procesa `ed` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L82), [`query.trim`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L82), [`rows.filter`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L83), [`agentDisplayName`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L84), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L85), [`name.includes`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L87), [`publicId.includes`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L87), [`email.includes`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L87).
- **Lo usa** [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L193) (accede al módulo).

#### [`metrics`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L91) · cálculo memorizado · dentro de [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L23)

Función auxiliar de `AdminSupportAgentsScreen` para `metrics`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`rows.filter`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L92).
- **Lo usa** [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L191) (pasa a metrics).

#### [`updateAuthorization`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L104) · callback React · asíncrona · dentro de [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L23)

Guarda datos en tabla o vista [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) y coordina las demás operaciones de esta ficha.

- **Entradas** `row`, `authorized`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setBusyKey`, `setError`.
- **Condiciones que evalúa** `ausencia de agentId`, `updateError`.
- **Contrato de datos** tabla o vista [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) (`upsert`) en [`AdminSupportAgentsScreen.tsx:117`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L117), tabla o bucket [`support_agent_profiles`](../../../apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql#L332) en [`AdminSupportAgentsScreen.tsx:117`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L117).
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo), [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L105), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L105), [`setBusyKey`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L107), [`toISOString`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L114), [`upsert`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L117), [`supabase.from`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L117), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L122), [`observability.track`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L125), [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L131).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L231) (llama).

#### [`startAgentSession`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L137) · callback React · asíncrona · dentro de [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L23)

Inicia `Agent Session` y prepara sus dependencias.

- **Entradas** `agentId`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setBusyKey`, `setError`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setBusyKey`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L138), [`mobileApi.support.startAdminSession`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L139), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L142), [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L145).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L241) (llama).

#### [`endAgentSession`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L151) · callback React · asíncrona · dentro de [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L23)

Finaliza `Agent Session` y ajusta el estado que depende de esa operación.

- **Entradas** `agentId`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setBusyKey`, `setError`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setBusyKey`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L152), [`mobileApi.support.endAdminSession`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L153), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L159), [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L162).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L249) (llama).

#### [`denyRequest`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L168) · callback React · asíncrona · dentro de [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L23)

Coordina cambios de estado durante `deny Request`.

- **Entradas** `agentId`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setBusyKey`, `setError`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setBusyKey`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L169), [`mobileApi.support.denyAdminSession`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L170), [`setError`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L173), [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L176).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L258) (llama).

#### [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L192) · callback JSX · dentro de [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L23)

Responde al evento de interfaz `AdminCollectionScreen.onRefresh`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L192).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L204) · callback JSX · dentro de [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L23)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSelectedAgentId`.
- **Llamadas directas en el cuerpo** [`setSelectedAgentId`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L204).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L231) · callback JSX · dentro de [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L23)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`updateAuthorization`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L231).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L241) · callback JSX · dentro de [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L23)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`startAgentSession`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L241).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L249) · callback JSX · dentro de [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L23)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`endAgentSession`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L249).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L258) · callback JSX · dentro de [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L23)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`denyRequest`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L258).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L267) · callback JSX · dentro de [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L23)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L268).
