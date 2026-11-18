# Android · Pantallas por función y rol · 1 de 9

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L1)
- [`apps/referidos-android/src/features/admin/AdminAppsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L1)
- [`apps/referidos-android/src/features/admin/adminContentRegistry.ts`](../../../apps/referidos-android/src/features/admin/adminContentRegistry.ts#L1)
- [`apps/referidos-android/src/features/admin/AdminDatosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L1)
- [`apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L1)
- [`apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L1)
- [`apps/referidos-android/src/features/admin/AdminInicioScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L1)
- [`apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L1)
- [`apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L1)
- [`apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L1)
- [`apps/referidos-android/src/features/admin/AdminLegalScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminLegalScreen.tsx#L1)
- [`apps/referidos-android/src/features/admin/AdminLogsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L1)

## Símbolos y conexiones

### [`apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L1)

Consulta métricas de Prelaunch con filtros y muestra un resumen. Delega la función autenticada de métricas a `adminOps.ts`.

**Superficie que exporta.** [`AdminAnalyticsScreen`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L25).

**Módulos que lo cargan.** [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L15) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`./components/AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/services/adminOps`](../../../apps/referidos-android/src/shared/services/adminOps.ts), [`./components/adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts).

#### [`DAY_OPTIONS`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L8) · variable de módulo

Conserva la lista de `DAY OPTIONS` usada por el módulo.

- **Lo usa** [`AdminAnalyticsScreen`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L101) (accede al módulo).

#### [`CHANNEL_OPTIONS`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L9) · variable de módulo

Conserva la lista de `CHANNEL OPTIONS` usada por el módulo.

- **Lo usa** [`AdminAnalyticsScreen`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L115) (accede al módulo).

#### [`TABS`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L15) · variable de módulo

Declara `TABS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`AdminAnalyticsScreen`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L28) (referencia).

#### [`formatNumber`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L17) · función

Formatea `Number` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`toLocaleString`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L18).
- **Lo usa** [`metrics`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L75) (llama), [`AdminAnalyticsScreen`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L165) (llama).

#### [`formatPercent`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L21) · función

Formatea `Percent` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`toFixed`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L22).
- **Lo usa** [`metrics`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L79) (llama).

#### [`AdminAnalyticsScreen`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L25) · componente React · exportación por defecto

Monta `AdminCollectionScreen`, `View`, `Pressable`, `Text`, `SectionCard`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[days, setDays] mediante useState`, `[channel, setChannel] mediante useState`, `[tab, setTab] mediante useState`, `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[error, setError] mediante useState`, `[payload, setPayload] mediante useState`, `[lastUpdatedAt, setLastUpdatedAt] mediante useState`.
- **Interfaz que monta** `AdminCollectionScreen`, `View`, `Pressable`, `Text`, `SectionCard`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L49) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts#L3) (accede al módulo).
- **Llamadas directas en el cuerpo** [`DAY_OPTIONS.map`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L101), [`CHANNEL_OPTIONS.map`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L115), [`TABS.map`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L139), [`timeline.map`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L162), [`formatNumber`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L165), [`map`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L181), [`topIpRisk.map`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L247).
- **Lo usa** [`AdminStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L47) (pasa a component).

#### [`loadMetrics`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L35) · callback React · asíncrona · dentro de [`AdminAnalyticsScreen`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L25)

Obtiene o resuelve `Metrics` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setPayload`, `setError`, `setLastUpdatedAt`.
- **Condiciones que evalúa** `ausencia de refreshing`.
- **Usa código de** [`fetchAdminPrelaunchMetrics`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L157) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L36), [`fetchAdminPrelaunchMetrics`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L38), [`setPayload`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L42), [`setError`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L43), [`setLastUpdatedAt`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L44), [`toISOString`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L44).
- **Lo usa** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L54) (llama).

#### [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L52) · callback React · asíncrona · dentro de [`AdminAnalyticsScreen`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L25)

Coordina cambios de estado durante `refresh All`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`.
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L53), [`loadMetrics`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L54).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L59) (llama), [`AdminAnalyticsScreen`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L60) (referencia), [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L98) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L58) · callback de infraestructura · dentro de [`AdminAnalyticsScreen`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L25)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminAnalyticsScreen`.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L59).

#### [`summary`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L62) · cálculo memorizado · dentro de [`AdminAnalyticsScreen`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L25)

Función auxiliar de `AdminAnalyticsScreen` para `summary`.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`metrics`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L75) (accede al módulo).

#### [`metrics`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L73) · cálculo memorizado · dentro de [`AdminAnalyticsScreen`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L25)

Función auxiliar de `AdminAnalyticsScreen` para `metrics`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`formatNumber`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L75), [`formatPercent`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L79).
- **Lo usa** [`AdminAnalyticsScreen`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L97) (pasa a metrics).

#### [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L98) · callback JSX · dentro de [`AdminAnalyticsScreen`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L25)

Responde al evento de interfaz `AdminCollectionScreen.onRefresh`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L98).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L106) · callback JSX · dentro de [`AdminAnalyticsScreen`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L25)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setDays`.
- **Llamadas directas en el cuerpo** [`setDays`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L106).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L120) · callback JSX · dentro de [`AdminAnalyticsScreen`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L25)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setChannel`.
- **Llamadas directas en el cuerpo** [`setChannel`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L120).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L144) · callback JSX · dentro de [`AdminAnalyticsScreen`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L25)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setTab`.
- **Llamadas directas en el cuerpo** [`setTab`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L144).

#### [`styles`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L260) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L260).
- **Lo usa** [`AdminAnalyticsScreen`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L100) (accede al módulo).

### [`apps/referidos-android/src/features/admin/AdminAppsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L1)

Mantiene la configuración de apps para soporte: clave, código, alias, origen y estado. Usa el proxy OPS para la edición y permite pedir la sincronización de apps hacia el runtime.

**Superficie que exporta.** [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L35).

**Módulos que lo cargan.** [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L13) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/ui/BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx), [`@shared/services/supportOps`](../../../apps/referidos-android/src/shared/services/supportOps.ts).

#### [`normalizeAppRow`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L15) · función

Normaliza `App Row` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `row`.
- **Retorno visible o tipo declarado** `id`, `app_key`, `app_code`, `display_name`, `origin_source_default`, `aliases`, `is_active`.
- **Lo usa** [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L50) (referencia).

#### [`EMPTY_FORM`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L27) · variable de módulo

Agrupa la configuración o catálogo de `EMPTY FORM` para que sus consumidores lean claves comunes.

- **Campos o contexto** `appKey`, `appCode`, `displayName`, `originSourceDefault`, `aliases`.
- **Lo usa** [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L43) (referencia), [`resetForm`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L65) (referencia).

#### [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L35) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `SectionCard`, `View`, `Pressable`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[loading, setLoading] mediante useState`, `[saving, setSaving] mediante useState`, `[syncing, setSyncing] mediante useState`, `[error, setError] mediante useState`, `[ok, setOk] mediante useState`, `[rows, setRows] mediante useState`, `[editingId, setEditingId] mediante useState`, `[form, setForm] mediante useState`.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `SectionCard`, `View`, `Pressable`, `Text`, `TextInput`, `BlockSkeleton`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L9) (renderiza).
- **Llamadas directas en el cuerpo** [`orderedRows.map`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L237), [`row.aliases.join`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L249).
- **Lo usa** [`AdminStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L45) (pasa a component).

#### [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L45) · callback React · asíncrona · dentro de [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L35)

Obtiene o resuelve `Rows` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setError`, `setRows`.
- **Usa código de** [`fetchSupportApps`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L97) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L46), [`setError`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L47), [`fetchSupportApps`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L49), [`setRows`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L50), [`map`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L50).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L60) (llama), [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L61) (referencia), [`handleSubmit`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L104) (llama), [`handleSync`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L123) (llama), [`handleToggleActive`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L139) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L59) · callback de infraestructura · dentro de [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L35)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminAppsScreen`.

- **Llamadas directas en el cuerpo** [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L60).

#### [`resetForm`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L63) · callback React · dentro de [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L35)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setEditingId`, `setForm`.
- **Llamadas directas en el cuerpo** [`setEditingId`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L64), [`setForm`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L65).
- **Lo usa** [`handleSubmit`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L103) (llama), [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L175) (pasa a onPress).

#### [`orderedRows`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L69) · cálculo memorizado · dentro de [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L35)

Función auxiliar de `AdminAppsScreen` para `ordered Rows`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `a.is_active`.
- **Llamadas directas en el cuerpo** [`sort`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L70), [`a.display_name.localeCompare`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L72).
- **Lo usa** [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L231) (accede al módulo).

#### [`handleSubmit`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L77) · callback React · asíncrona · dentro de [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L35)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSaving`, `setError`, `setOk`.
- **Condiciones que evalúa** `editingId`.
- **Usa código de** [`updateSupportApp`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L142) (llama), [`createSupportApp`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L116) (llama).
- **Llamadas directas en el cuerpo** [`setSaving`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L78), [`setError`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L79), [`setOk`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L80), [`form.appKey.trim`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L82), [`form.appCode.trim`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L82), [`form.displayName.trim`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L82), [`updateSupportApp`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L86), [`map`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L90), [`form.aliases.split`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L90), [`item.trim`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L90), [`createSupportApp`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L94), [`resetForm`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L103) y 1 más.
- **Lo usa** [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L221) (pasa a onPress).

#### [`handleSync`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L112) · callback React · asíncrona · dentro de [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L35)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSyncing`, `setError`, `setOk`.
- **Usa código de** [`dispatchSupportAppsSync`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L44) (llama).
- **Llamadas directas en el cuerpo** [`setSyncing`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L113), [`setError`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L114), [`setOk`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L115), [`dispatchSupportAppsSync`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L117), [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L123).
- **Lo usa** [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L171) (pasa a onPress).

#### [`handleToggleActive`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L132) · callback React · asíncrona · dentro de [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L35)

Maneja `Toggle Active` y coordina las acciones indicadas abajo.

- **Entradas** `row`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSaving`, `setError`, `setOk`, `setSupportAppActive`.
- **Usa código de** [`setSupportAppActive`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L169) (llama).
- **Llamadas directas en el cuerpo** [`setSaving`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L133), [`setError`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L134), [`setOk`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L135), [`setSupportAppActive`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L137), [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L139).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L256) (llama).

#### [`startEdit`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L149) · callback React · dentro de [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L35)

Inicia `Edit` y prepara sus dependencias.

- **Entradas** `row`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setEditingId`, `setForm`.
- **Usa código de** [`formatAliasesInput`](../../../apps/referidos-android/src/shared/services/supportOps.ts#L20) (llama).
- **Llamadas directas en el cuerpo** [`setEditingId`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L150), [`setForm`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L151), [`formatAliasesInput`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L156).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L252) (llama).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L184) · callback JSX · dentro de [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L35)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setForm`.
- **Llamadas directas en el cuerpo** [`setForm`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L184).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L191) · callback JSX · dentro de [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L35)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setForm`.
- **Llamadas directas en el cuerpo** [`setForm`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L191).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L198) · callback JSX · dentro de [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L35)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setForm`.
- **Llamadas directas en el cuerpo** [`setForm`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L198).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L204) · callback JSX · dentro de [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L35)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setForm`.
- **Llamadas directas en el cuerpo** [`setForm`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L205).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L213) · callback JSX · dentro de [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L35)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setForm`.
- **Llamadas directas en el cuerpo** [`setForm`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L213).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L252) · callback JSX · dentro de [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L35)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`startEdit`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L252).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L256) · callback JSX · dentro de [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L35)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleToggleActive`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L256).

#### [`styles`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L274) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L274).
- **Lo usa** [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L165) (accede al módulo).

### [`apps/referidos-android/src/features/admin/adminContentRegistry.ts`](../../../apps/referidos-android/src/features/admin/adminContentRegistry.ts#L1)

Define grupos, documentos y snapshot legal para las vistas administrativas. Describe qué documentos ve el operador sin codificarlo en cada render.

**Superficie que exporta.** [`ADMIN_DOC_GROUPS`](../../../apps/referidos-android/src/features/admin/adminContentRegistry.ts#L1), [`ADMIN_DOCS_REGISTRY`](../../../apps/referidos-android/src/features/admin/adminContentRegistry.ts#L8), [`ADMIN_LEGAL_DOCS`](../../../apps/referidos-android/src/features/admin/adminContentRegistry.ts#L116), [`ADMIN_LEGAL_POLICY_SUMMARY`](../../../apps/referidos-android/src/features/admin/adminContentRegistry.ts#L191).

**Módulos que lo cargan.** [`AdminDocumentationScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L5) (importa), [`AdminLegalScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminLegalScreen.tsx#L5) (importa).

#### [`ADMIN_DOC_GROUPS`](../../../apps/referidos-android/src/features/admin/adminContentRegistry.ts#L1) · variable de módulo · exportado

Declara `ADMIN_DOC_GROUPS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`filteredGroups`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L12) (accede al módulo).

#### [`ADMIN_DOCS_REGISTRY`](../../../apps/referidos-android/src/features/admin/adminContentRegistry.ts#L8) · variable de módulo · exportado

Declara `ADMIN_DOCS_REGISTRY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`filteredGroups`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L14) (accede al módulo).

#### [`ADMIN_LEGAL_DOCS`](../../../apps/referidos-android/src/features/admin/adminContentRegistry.ts#L116) · variable de módulo · exportado

Declara `ADMIN_LEGAL_DOCS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`ADMIN_LEGAL_POLICY_SUMMARY`](../../../apps/referidos-android/src/features/admin/adminContentRegistry.ts#L194) (accede al módulo), [`AdminLegalScreen`](../../../apps/referidos-android/src/features/admin/AdminLegalScreen.tsx#L21) (accede al módulo).

#### [`ADMIN_LEGAL_POLICY_SUMMARY`](../../../apps/referidos-android/src/features/admin/adminContentRegistry.ts#L191) · variable de módulo · exportado

Declara `ADMIN_LEGAL_POLICY_SUMMARY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`ADMIN_LEGAL_DOCS.filter`](../../../apps/referidos-android/src/features/admin/adminContentRegistry.ts#L195).
- **Lo usa** [`AdminLegalScreen`](../../../apps/referidos-android/src/features/admin/AdminLegalScreen.tsx#L13) (accede al módulo).

### [`apps/referidos-android/src/features/admin/AdminDatosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L1)

Carga diferentes conjuntos en paralelo y agrega métricas y resúmenes recientes para consultar el estado de datos y errores desde una sola vista.

**Superficie que exporta.** [`AdminDatosScreen`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L37).

**Módulos que lo cargan.** [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L12) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`./components/AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/services/adminOps`](../../../apps/referidos-android/src/shared/services/adminOps.ts), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts), [`@shared/services/supportDeskQueries`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts), [`./components/adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts).

#### [`DataState`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L11) · tipo TypeScript

Describe la forma del contrato de `Data State`, con campos `usersTotal`, `businessesTotal`, `promosTotal`, `qrsTotal`, `reportesTotal`, `supportByStatus`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `usersTotal`, `businessesTotal`, `promosTotal`, `qrsTotal`, `reportesTotal`, `supportByStatus`, `sectors`, `promoStatuses`, `reportStatuses`, `obsErrors`.

#### [`EMPTY_STATE`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L24) · variable de módulo

Agrupa la configuración o catálogo de `EMPTY STATE` para que sus consumidores lean claves comunes.

- **Campos o contexto** `usersTotal`, `businessesTotal`, `promosTotal`, `qrsTotal`, `reportesTotal`, `supportByStatus`, `sectors`, `promoStatuses`, `reportStatuses`, `obsErrors`.
- **Lo usa** [`AdminDatosScreen`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L38) (referencia).

#### [`AdminDatosScreen`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L37) · componente React · exportación por defecto

Monta `AdminCollectionScreen`, `SectionCard`, `View`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[state, setState] mediante useState`, `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[error, setError] mediante useState`.
- **Interfaz que monta** `AdminCollectionScreen`, `SectionCard`, `View`, `Text`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L49) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts#L3) (accede al módulo).
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L160), [`sort`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L160).
- **Lo usa** [`AdminStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L44) (pasa a component).

#### [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L43) · callback React · asíncrona · dentro de [`AdminDatosScreen`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L37)

Obtiene o resuelve `All` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setState`, `setError`.
- **Condiciones que evalúa** `ausencia de refreshing`.
- **Usa código de** [`countAdminRows`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L101) (llama), [`fetchSupportStatusSummary`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L369) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia), [`fetchAdminNegocios`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L114) (llama), [`fetchAdminPromos`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L121) (llama), [`fetchAdminReportes`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L135) (llama), [`fetchObservabilityEvents`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L204) (llama), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L44), [`countAdminRows`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L58), [`fetchSupportStatusSummary`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L63), [`fetchAdminNegocios`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L64), [`fetchAdminPromos`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L65), [`fetchAdminReportes`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L66), [`fetchObservabilityEvents`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L67), [`map`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L70), [`filter`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L70), [`forEach`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L86), [`trim`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L87), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L87) y 3 más.
- **Lo usa** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L126) (llama).

#### [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L124) · callback React · asíncrona · dentro de [`AdminDatosScreen`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L37)

Coordina cambios de estado durante `refresh All`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`.
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L125), [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L126).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L131) (llama), [`AdminDatosScreen`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L132) (referencia), [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L153) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L130) · callback de infraestructura · dentro de [`AdminDatosScreen`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L37)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminDatosScreen`.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L131).

#### [`metrics`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L134) · cálculo memorizado · dentro de [`AdminDatosScreen`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L37)

Función auxiliar de `AdminDatosScreen` para `metrics`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Lo usa** [`AdminDatosScreen`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L152) (pasa a metrics).

#### [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L153) · callback JSX · dentro de [`AdminDatosScreen`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L37)

Responde al evento de interfaz `AdminCollectionScreen.onRefresh`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L153).

### [`apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L1)

Renderiza un índice buscable de documentación registrada para operadores. Consume el registro estático y no lee archivos Markdown de la instalación.

**Superficie que exporta.** [`AdminDocumentationScreen`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L7).

**Módulos que lo cargan.** [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L21) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`./adminContentRegistry`](../../../apps/referidos-android/src/features/admin/adminContentRegistry.ts).

#### [`AdminDocumentationScreen`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L7) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `SectionCard`, `TextInput`, `Text`, `View`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[query, setQuery] mediante useState`.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `SectionCard`, `TextInput`, `Text`, `View`, `Pressable`.
- **Hooks que llama** `useState`.
- **Usa código de** [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza).
- **Llamadas directas en el cuerpo** [`filteredGroups.map`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L33), [`group.docs.map`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L40).
- **Lo usa** [`AdminStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L62) (pasa a component).

#### [`filteredGroups`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L10) · cálculo memorizado · dentro de [`AdminDocumentationScreen`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L7)

Procesa `ed Groups` según el criterio del módulo.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de term`.
- **Usa código de** [`ADMIN_DOC_GROUPS`](../../../apps/referidos-android/src/features/admin/adminContentRegistry.ts#L1) (accede al módulo), [`ADMIN_DOCS_REGISTRY`](../../../apps/referidos-android/src/features/admin/adminContentRegistry.ts#L8) (accede al módulo).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L11), [`query.trim`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L11), [`filter`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L12), [`ADMIN_DOC_GROUPS.map`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L12), [`ADMIN_DOCS_REGISTRY.filter`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L14), [`includes`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L16).
- **Lo usa** [`AdminDocumentationScreen`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L33) (accede al módulo).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L61) · callback JSX · dentro de [`AdminDocumentationScreen`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L7)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setQuery`.
- **Llamadas directas en el cuerpo** [`setQuery`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L61).

#### [`styles`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L70) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L70).
- **Lo usa** [`AdminDocumentationScreen`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L23) (accede al módulo).

### [`apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L1)

Consulta códigos centralizados, filtra por atributos y presenta métricas de su estado. Comparte la consulta de catálogo con soporte.

**Superficie que exporta.** [`AdminErrorCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L10).

**Módulos que lo cargan.** [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L19) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`./components/AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/services/supportDeskQueries`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts), [`./components/adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts).

#### [`AdminErrorCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L10) · componente React · exportación por defecto

Monta `AdminCollectionScreen`, `SectionCard`, `Text`, `View`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[rows, setRows] mediante useState`, `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[error, setError] mediante useState`, `[query, setQuery] mediante useState`, `[statusFilter, setStatusFilter] mediante useState`.
- **Interfaz que monta** `AdminCollectionScreen`, `SectionCard`, `Text`, `View`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L49) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts#L3) (accede al módulo), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`filtered.map`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L111), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L112), [`formatDateTime`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L138).
- **Lo usa** [`AdminStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L59) (pasa a component).

#### [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L18) · callback React · asíncrona · dentro de [`AdminErrorCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L10)

Obtiene o resuelve `Rows` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setRows`, `setError`.
- **Condiciones que evalúa** `ausencia de refreshing`, `ausencia de result.ok`.
- **Usa código de** [`fetchSupportErrorCatalog`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L442) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L19), [`fetchSupportErrorCatalog`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L20), [`setRows`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L22), [`setError`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L23).
- **Lo usa** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L34) (llama).

#### [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L32) · callback React · asíncrona · dentro de [`AdminErrorCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L10)

Coordina cambios de estado durante `refresh All`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`.
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L33), [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L34).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L39) (llama), [`AdminErrorCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L40) (referencia), [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L103) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L38) · callback de infraestructura · dentro de [`AdminErrorCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L10)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminErrorCatalogScreen`.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L39).

#### [`filtered`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L42) · cálculo memorizado · dentro de [`AdminErrorCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L10)

Procesa `ed` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L43), [`query.trim`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L43), [`rows.filter`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L44), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L45), [`trim`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L46), [`code.includes`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L52), [`message.includes`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L53), [`route.includes`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L54), [`category.includes`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L55).
- **Lo usa** [`AdminErrorCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L104) (accede al módulo).

#### [`metrics`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L61) · cálculo memorizado · dentro de [`AdminErrorCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L10)

Función auxiliar de `AdminErrorCatalogScreen` para `metrics`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `status`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`rows.forEach`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L67), [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L68), [`trim`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L68), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L68).
- **Lo usa** [`AdminErrorCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L89) (pasa a metrics).

#### [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L103) · callback JSX · dentro de [`AdminErrorCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L10)

Responde al evento de interfaz `AdminCollectionScreen.onRefresh`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L103).

### [`apps/referidos-android/src/features/admin/AdminInicioScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L1)

Portada de operaciones. Lee conteos y actividad de usuarios, negocios, promociones, QR, soporte y eventos. Las tarjetas dirigen a la ruta detallada para actuar sobre cada dominio.

**Superficie que exporta.** [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129).

**Módulos que lo cargan.** [`RoleTabs.tsx`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L15) (importa).

**Dependencias del archivo.** `react`, `@react-navigation/native`, `react-native`, [`@navigation/routeKeys`](../../../apps/referidos-android/src/navigation/routeKeys.ts), [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/ui/BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts), [`@shared/services/supportDeskQueries`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts).

#### [`PlatformKpis`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L19) · tipo TypeScript

Describe la forma del contrato de `Platform Kpis`, con campos `usersTotal`, `usersActive`, `businessesTotal`, `promosTotal`, `qrsTotal`, `usersByRole`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `usersTotal`, `usersActive`, `businessesTotal`, `promosTotal`, `qrsTotal`, `usersByRole`.

#### [`SupportKpis`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L28) · tipo TypeScript

Describe la forma del contrato de `Support Kpis`, con campos `ticketsTotal`, `newCount`, `inProgressCount`, `waitingCount`, `closedCount`, `activeAgents`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `ticketsTotal`, `newCount`, `inProgressCount`, `waitingCount`, `closedCount`, `activeAgents`, `pendingRequests`.

#### [`ObservabilityKpis`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L38) · tipo TypeScript

Describe la forma del contrato de `Observability Kpis`, con campos `total`, `errorLike`, `warnLike`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `total`, `errorLike`, `warnLike`.

#### [`OverviewState`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L44) · tipo TypeScript

Describe la forma del contrato de `Overview State`, con campos `platform`, `support`, `observability`, `businesses`, `promos`, `qrs`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `platform`, `support`, `observability`, `businesses`, `promos`, `qrs`, `systemLogs`.

#### [`CountResult`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L54) · tipo TypeScript

Describe la forma del contrato de `Count Result`, con campos `ok`, `count`, `error`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `ok`, `count`, `error`.

#### [`RN_INCLUDED_MODULES`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L60) · variable de módulo

Conserva la lista de `RN INCLUDED MODULES` usada por el módulo.

- **Lo usa** [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L632) (accede al módulo).

#### [`RN_DEFERRED_MODULES`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L84) · variable de módulo

Conserva la lista de `RN DEFERRED MODULES` usada por el módulo.

- **Lo usa** [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L638) (accede al módulo).

#### [`EMPTY_OVERVIEW`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L86) · variable de módulo

Agrupa la configuración o catálogo de `EMPTY OVERVIEW` para que sus consumidores lean claves comunes.

- **Campos o contexto** `platform`, `support`, `observability`, `businesses`, `promos`, `qrs`, `systemLogs`.
- **Lo usa** [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L134) (referencia).

#### [`countRows`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L115) · función · asíncrona

Procesa `Rows` según el criterio del módulo.

- **Entradas** `table`.
- **Retorno visible o tipo declarado** `Promise`, `ok`, `count`, `error`.
- **Condiciones que evalúa** `error`.
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`select`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L116), [`supabase.from`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L116).
- **Lo usa** [`loadOverview`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L157) (llama).

#### [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `BlockSkeleton`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[errors, setErrors] mediante useState`, `[overview, setOverview] mediante useState`.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `BlockSkeleton`, `View`, `NavCard`.
- **Hooks que llama** `useNavigation`, `useState`, `useEffect`.
- **Usa código de** [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L9) (renderiza), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`errors.map`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L312), [`overview.businesses.map`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L520), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L523), [`formatDateTime`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L530), [`overview.promos.map`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L543), [`overview.qrs.map`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L566), [`map`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L613), [`overview.systemLogs.slice`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L613), [`RN_INCLUDED_MODULES.map`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L632), [`RN_DEFERRED_MODULES.map`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L641).
- **Lo usa** [`AdminTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L145) (referencia).

#### [`loadOverview`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L138) · callback React · asíncrona · dentro de [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129)

Consulta o invoca tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setOverview`, `setErrors`.
- **Efectos y APIs** `nextErrors.push`.
- **Condiciones que evalúa** `ausencia de refreshing`, `ausencia de usersCount.ok`, `ausencia de businessesCount.ok`, `ausencia de promosCount.ok`, `ausencia de qrsCount.ok`, `usersResult.error`, `status`, `ausencia de supportSummaryResult.ok` y 6 más.
- **Contrato de datos** tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`AdminInicioScreen.tsx:161`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L161), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`AdminInicioScreen.tsx:161`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L161), tabla o vista [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) (`select`) en [`AdminInicioScreen.tsx:171`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L171), tabla o bucket [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) en [`AdminInicioScreen.tsx:171`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L171), tabla o vista [`promos`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L82) (`select`) en [`AdminInicioScreen.tsx:172`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L172), tabla o bucket [`promos`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L82) en [`AdminInicioScreen.tsx:172`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L172), tabla o vista [`qr_validos`](../../../apps/referidos-app/supabase/migrations/20250209_000001_qr_hmac.sql#L93) (`select`) en [`AdminInicioScreen.tsx:173`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L173), tabla o bucket [`qr_validos`](../../../apps/referidos-app/supabase/migrations/20250209_000001_qr_hmac.sql#L93) en [`AdminInicioScreen.tsx:173`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L173).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo), [`fetchSupportStatusSummary`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L369) (llama), [`fetchSupportAgentsDashboard`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L302) (llama), [`fetchObservabilityEvents`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L204) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L139), [`countRows`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L157), [`limit`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L161), [`select`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L161), [`supabase.from`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L161), [`fetchSupportStatusSummary`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L165), [`fetchSupportAgentsDashboard`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L166), [`fetchObservabilityEvents`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L167), [`order`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L171), [`nextErrors.push`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L180), [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L193), [`trim`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L193) y 4 más.
- **Lo usa** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L276) (llama).

#### [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L274) · callback React · asíncrona · dentro de [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`.
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L275), [`loadOverview`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L276).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L281) (llama), [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L282) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L280) · callback de infraestructura · dentro de [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminInicioScreen`.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L281).

#### [`roleSummary`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L284) · cálculo memorizado · dentro de [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129)

Función auxiliar de `AdminInicioScreen` para `role Summary`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `entries.length`.
- **Llamadas directas en el cuerpo** [`join`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L287), [`map`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L287), [`entries.sort`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L287), [`a.localeCompare`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L288).
- **Lo usa** [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L455) (referencia).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L329) · callback JSX · dentro de [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`TAB_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L9) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L329).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L334) · callback JSX · dentro de [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`TAB_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L9) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L334).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L339) · callback JSX · dentro de [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`TAB_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L9) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L339).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L344) · callback JSX · dentro de [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L344).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L349) · callback JSX · dentro de [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L349).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L354) · callback JSX · dentro de [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L354).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L359) · callback JSX · dentro de [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L359).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L364) · callback JSX · dentro de [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L364).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L369) · callback JSX · dentro de [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L369).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L374) · callback JSX · dentro de [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L374).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L379) · callback JSX · dentro de [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L379).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L384) · callback JSX · dentro de [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L384).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L389) · callback JSX · dentro de [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L389).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L394) · callback JSX · dentro de [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L394).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L399) · callback JSX · dentro de [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L399).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L404) · callback JSX · dentro de [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L404).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L409) · callback JSX · dentro de [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L409).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L414) · callback JSX · dentro de [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L414).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L419) · callback JSX · dentro de [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L419).

#### [`NavCard.onPress`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L424) · callback JSX · dentro de [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L129)

Responde al evento de interfaz `NavCard.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L424).

#### [`NavCard`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L653) · componente React

Monta `Pressable`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, description, onPress}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Pressable`, `Text`.
- **Lo usa** [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L326) (renderiza).

#### [`styles`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L671) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L671).
- **Lo usa** [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L295) (accede al módulo), [`NavCard`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L663) (accede al módulo).

### [`apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L1)

Recupera un evento concreto mediante `fetchAdminIssueEventDetail` y presenta sus campos de diagnóstico y correlación. Vale la pena comenzar aquí cuando ya se conoce el evento ID.

**Superficie que exporta.** [`AdminIssueEventDetailScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L18).

**Módulos que lo cargan.** [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L18) (importa).

**Dependencias del archivo.** `react`, `react-native`, `@react-navigation/native`, [`./components/AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/services/adminOps`](../../../apps/referidos-android/src/shared/services/adminOps.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts), [`./components/adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts).

#### [`safeJson`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L10) · función

Implementa `safe Json` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Lo usa** [`AdminIssueEventDetailScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L130) (llama).

#### [`AdminIssueEventDetailScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L18) · componente React · exportación por defecto

Monta `AdminCollectionScreen`, `SectionCard`, `Text`, `View`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[row, setRow] mediante useState`, `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[error, setError] mediante useState`.
- **Interfaz que monta** `AdminCollectionScreen`, `SectionCard`, `Text`, `View`.
- **Hooks que llama** `useRoute`, `useState`, `useEffect`.
- **Usa código de** [`AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L49) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts#L3) (accede al módulo), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L20), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L76), [`formatDateTime`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L86), [`safeJson`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L130).
- **Lo usa** [`AdminStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L55) (pasa a component).

#### [`loadRow`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L28) · callback React · asíncrona · dentro de [`AdminIssueEventDetailScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L18)

Obtiene o resuelve `Row` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRow`, `setError`, `setLoading`.
- **Condiciones que evalúa** `ausencia de eventId`, `ausencia de refreshing`, `ausencia de result.ok`.
- **Usa código de** [`fetchAdminIssueEventDetail`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L167) (llama).
- **Llamadas directas en el cuerpo** [`setRow`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L30), [`setError`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L31), [`setLoading`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L32), [`fetchAdminIssueEventDetail`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L36).
- **Lo usa** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L50) (llama).

#### [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L48) · callback React · asíncrona · dentro de [`AdminIssueEventDetailScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L18)

Coordina cambios de estado durante `refresh All`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`.
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L49), [`loadRow`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L50).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L55) (llama), [`AdminIssueEventDetailScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L56) (referencia), [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L74) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L54) · callback de infraestructura · dentro de [`AdminIssueEventDetailScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L18)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminIssueEventDetailScreen`.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L55).

#### [`metrics`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L58) · cálculo memorizado · dentro de [`AdminIssueEventDetailScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L18)

Función auxiliar de `AdminIssueEventDetailScreen` para `metrics`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L62).
- **Lo usa** [`AdminIssueEventDetailScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L73) (pasa a metrics).

#### [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L74) · callback JSX · dentro de [`AdminIssueEventDetailScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L18)

Responde al evento de interfaz `AdminCollectionScreen.onRefresh`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L74).

### [`apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L1)

Muestra eventos relacionados, permite filtrar niveles y ofrece solicitar el guardado en caché de un issue. Vincula el identificador del evento a la pantalla de detalle.

**Superficie que exporta.** [`AdminIssueEventsScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L16).

**Módulos que lo cargan.** [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L17) (importa).

**Dependencias del archivo.** `react`, `react-native`, `@react-navigation/native`, [`./components/AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@navigation/routeKeys`](../../../apps/referidos-android/src/navigation/routeKeys.ts), [`@shared/services/adminOps`](../../../apps/referidos-android/src/shared/services/adminOps.ts), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/services/supportDeskQueries`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts), [`./components/adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts).

#### [`AdminIssueEventsScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L16) · componente React · exportación por defecto

Monta `AdminCollectionScreen`, `Pressable`, `Text`, `SectionCard`, `View`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[issue, setIssue] mediante useState`, `[rows, setRows] mediante useState`, `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[error, setError] mediante useState`, `[query, setQuery] mediante useState`, `[busy, setBusy] mediante useState`.
- **Interfaz que monta** `AdminCollectionScreen`, `Pressable`, `Text`, `SectionCard`, `View`.
- **Hooks que llama** `useNavigation`, `useRoute`, `useState`, `useEffect`.
- **Usa código de** [`AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L49) (renderiza), [`adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts#L3) (accede al módulo), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L19), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L132), [`filtered.map`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L144), [`formatDateTime`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L185).
- **Lo usa** [`AdminStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L51) (pasa a component).

#### [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L29) · callback React · asíncrona · dentro de [`AdminIssueEventsScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L16)

Obtiene o resuelve `Rows` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRows`, `setIssue`, `setError`, `setLoading`.
- **Condiciones que evalúa** `ausencia de issueId`, `ausencia de refreshing`.
- **Usa código de** [`fetchSupportIssuesContext`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L412) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia), [`fetchSupportIssueEventsContext`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L427) (llama), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`setRows`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L31), [`setIssue`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L32), [`setError`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L33), [`setLoading`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L34), [`fetchSupportIssuesContext`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L39), [`fetchSupportIssueEventsContext`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L40), [`find`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L44), [`trim`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L44), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L44), [`filter`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L47).
- **Lo usa** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L62) (llama).

#### [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L60) · callback React · asíncrona · dentro de [`AdminIssueEventsScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L16)

Coordina cambios de estado durante `refresh All`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`.
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L61), [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L62).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L67) (llama), [`AdminIssueEventsScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L68) (referencia), [`handleCacheIssue`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L98) (llama), [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L117) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L66) · callback de infraestructura · dentro de [`AdminIssueEventsScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L16)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminIssueEventsScreen`.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L67).

#### [`filtered`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L70) · cálculo memorizado · dentro de [`AdminIssueEventsScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L16)

Procesa `ed` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L71), [`query.trim`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L71), [`rows.filter`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L72), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L73), [`level.includes`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L77), [`eventType.includes`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L77), [`message.includes`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L77), [`errorCode.includes`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L77).
- **Lo usa** [`AdminIssueEventsScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L127) (accede al módulo).

#### [`metrics`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L81) · cálculo memorizado · dentro de [`AdminIssueEventsScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L16)

Función auxiliar de `AdminIssueEventsScreen` para `metrics`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`rows.filter`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L82), [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L83), [`trim`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L83), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L83).
- **Lo usa** [`AdminIssueEventsScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L116) (pasa a metrics).

#### [`handleCacheIssue`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L93) · callback React · asíncrona · dentro de [`AdminIssueEventsScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L16)

Maneja `Cache Issue` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setBusy`, `setError`.
- **Condiciones que evalúa** `ausencia de issueId`.
- **Usa código de** [`cacheAdminIssue`](../../../apps/referidos-android/src/shared/services/adminOps.ts#L185) (llama).
- **Llamadas directas en el cuerpo** [`setBusy`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L95), [`cacheAdminIssue`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L97), [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L98), [`setError`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L100).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L120) (llama).

#### [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L117) · callback JSX · dentro de [`AdminIssueEventsScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L16)

Responde al evento de interfaz `AdminCollectionScreen.onRefresh`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L117).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L120) · callback JSX · dentro de [`AdminIssueEventsScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L16)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleCacheIssue`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L120).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L149) · callback JSX · dentro de [`AdminIssueEventsScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L16)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L150).

### [`apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L1)

Lee issues con contexto y permite navegar al listado de eventos de un issue. Las métricas y filtros facilitan priorizar estados y niveles.

**Superficie que exporta.** [`AdminIssuesScreen`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L12).

**Módulos que lo cargan.** [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L16) (importa).

**Dependencias del archivo.** `react`, `react-native`, `@react-navigation/native`, [`./components/AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@navigation/routeKeys`](../../../apps/referidos-android/src/navigation/routeKeys.ts), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/services/supportDeskQueries`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts), [`./components/adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts).

#### [`AdminIssuesScreen`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L12) · componente React · exportación por defecto

Monta `AdminCollectionScreen`, `SectionCard`, `View`, `Pressable`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[rows, setRows] mediante useState`, `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[error, setError] mediante useState`, `[query, setQuery] mediante useState`, `[levelFilter, setLevelFilter] mediante useState`.
- **Interfaz que monta** `AdminCollectionScreen`, `SectionCard`, `View`, `Pressable`, `Text`.
- **Hooks que llama** `useNavigation`, `useState`, `useEffect`.
- **Usa código de** [`AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L49) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts#L3) (accede al módulo), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`filtered.map`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L108), [`trim`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L109), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L109), [`formatDateTime`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L146).
- **Lo usa** [`AdminStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L48) (pasa a component).

#### [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L21) · callback React · asíncrona · dentro de [`AdminIssuesScreen`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L12)

Obtiene o resuelve `Rows` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setRows`, `setError`.
- **Condiciones que evalúa** `ausencia de refreshing`, `ausencia de result.ok`.
- **Usa código de** [`fetchSupportIssuesContext`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L412) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L22), [`fetchSupportIssuesContext`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L23), [`setRows`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L25), [`setError`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L26).
- **Lo usa** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L37) (llama).

#### [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L35) · callback React · asíncrona · dentro de [`AdminIssuesScreen`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L12)

Coordina cambios de estado durante `refresh All`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`.
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L36), [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L37).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L42) (llama), [`AdminIssuesScreen`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L43) (referencia), [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L103) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L41) · callback de infraestructura · dentro de [`AdminIssuesScreen`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L12)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminIssuesScreen`.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L42).

#### [`filtered`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L45) · cálculo memorizado · dentro de [`AdminIssuesScreen`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L12)

Procesa `ed` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L46), [`query.trim`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L46), [`rows.filter`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L47), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L48), [`trim`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L49), [`title.includes`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L55), [`status.includes`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L56), [`release.includes`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L57), [`user.includes`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L58).
- **Lo usa** [`metrics`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L74) (accede al módulo), [`AdminIssuesScreen`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L104) (accede al módulo).

#### [`metrics`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L64) · cálculo memorizado · dentro de [`AdminIssuesScreen`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L12)

Función auxiliar de `AdminIssuesScreen` para `metrics`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`rows.reduce`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L65), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L65), [`rows.filter`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L66), [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L67), [`trim`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L67).
- **Lo usa** [`AdminIssuesScreen`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L88) (pasa a metrics).

#### [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L103) · callback JSX · dentro de [`AdminIssuesScreen`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L12)

Responde al evento de interfaz `AdminCollectionScreen.onRefresh`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L103).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L113) · callback JSX · dentro de [`AdminIssuesScreen`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L12)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`STACK_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L38) (accede al módulo), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L114), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L116).

### [`apps/referidos-android/src/features/admin/AdminLegalScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminLegalScreen.tsx#L1)

Presenta el conjunto de documentos y el resumen legal configurado para admin. Remite al registro de contenido que consume la interfaz.

**Superficie que exporta.** [`AdminLegalScreen`](../../../apps/referidos-android/src/features/admin/AdminLegalScreen.tsx#L7).

**Módulos que lo cargan.** [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L22) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`./adminContentRegistry`](../../../apps/referidos-android/src/features/admin/adminContentRegistry.ts).

#### [`AdminLegalScreen`](../../../apps/referidos-android/src/features/admin/AdminLegalScreen.tsx#L7) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `SectionCard`, `View`, `MetricCard`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `SectionCard`, `View`, `MetricCard`, `Text`.
- **Usa código de** [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`ADMIN_LEGAL_POLICY_SUMMARY`](../../../apps/referidos-android/src/features/admin/adminContentRegistry.ts#L191) (accede al módulo), [`ADMIN_LEGAL_DOCS`](../../../apps/referidos-android/src/features/admin/adminContentRegistry.ts#L116) (accede al módulo).
- **Llamadas directas en el cuerpo** [`ADMIN_LEGAL_DOCS.map`](../../../apps/referidos-android/src/features/admin/AdminLegalScreen.tsx#L22).
- **Lo usa** [`AdminStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L63) (pasa a component).

#### [`MetricCard`](../../../apps/referidos-android/src/features/admin/AdminLegalScreen.tsx#L38) · componente React

Monta `View`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{label, value}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `View`, `Text`.
- **Lo usa** [`AdminLegalScreen`](../../../apps/referidos-android/src/features/admin/AdminLegalScreen.tsx#L13) (renderiza).

#### [`styles`](../../../apps/referidos-android/src/features/admin/AdminLegalScreen.tsx#L47) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/admin/AdminLegalScreen.tsx#L47).
- **Lo usa** [`AdminLegalScreen`](../../../apps/referidos-android/src/features/admin/AdminLegalScreen.tsx#L10) (accede al módulo), [`MetricCard`](../../../apps/referidos-android/src/features/admin/AdminLegalScreen.tsx#L40) (accede al módulo).

### [`apps/referidos-android/src/features/admin/AdminLogsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L1)

Consulta eventos operativos a través de `fetchSupportLogEvents`, los filtra y presenta métricas. Comparte acceso a registros con soporte pero aplica su propia vista administrativa.

**Superficie que exporta.** [`AdminLogsScreen`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L10).

**Módulos que lo cargan.** [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L11) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`./components/AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/services/supportDeskQueries`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts), [`./components/adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts).

#### [`AdminLogsScreen`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L10) · componente React · exportación por defecto

Monta `AdminCollectionScreen`, `SectionCard`, `Text`, `View`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[rows, setRows] mediante useState`, `[loading, setLoading] mediante useState`, `[refreshing, setRefreshing] mediante useState`, `[error, setError] mediante useState`, `[query, setQuery] mediante useState`, `[levelFilter, setLevelFilter] mediante useState`.
- **Interfaz que monta** `AdminCollectionScreen`, `SectionCard`, `Text`, `View`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L49) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts#L3) (accede al módulo), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`filtered.map`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L113), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L114), [`formatDateTime`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L138).
- **Lo usa** [`AdminStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L43) (pasa a component).

#### [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L18) · callback React · asíncrona · dentro de [`AdminLogsScreen`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L10)

Obtiene o resuelve `Rows` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setRows`, `setError`.
- **Condiciones que evalúa** `ausencia de refreshing`, `ausencia de result.ok`.
- **Usa código de** [`fetchSupportLogEvents`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L189) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L19), [`fetchSupportLogEvents`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L20), [`setRows`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L22), [`setError`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L23).
- **Lo usa** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L34) (llama).

#### [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L32) · callback React · asíncrona · dentro de [`AdminLogsScreen`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L10)

Coordina cambios de estado durante `refresh All`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRefreshing`.
- **Llamadas directas en el cuerpo** [`setRefreshing`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L33), [`loadRows`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L34).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L39) (llama), [`AdminLogsScreen`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L40) (referencia), [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L105) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L38) · callback de infraestructura · dentro de [`AdminLogsScreen`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L10)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminLogsScreen`.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L39).

#### [`filtered`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L42) · cálculo memorizado · dentro de [`AdminLogsScreen`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L10)

Procesa `ed` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L43), [`query.trim`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L43), [`rows.filter`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L44), [`trim`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L45), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L45), [`category.includes`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L52), [`message.includes`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L53), [`route.includes`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L54), [`screen.includes`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L55).
- **Lo usa** [`AdminLogsScreen`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L106) (accede al módulo).

#### [`metrics`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L61) · cálculo memorizado · dentro de [`AdminLogsScreen`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L10)

Función auxiliar de `AdminLogsScreen` para `metrics`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `level`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`rows.forEach`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L67), [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L68), [`trim`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L68), [`readFirst`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L68).
- **Lo usa** [`AdminLogsScreen`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L91) (pasa a metrics).

#### [`AdminCollectionScreen.onRefresh`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L105) · callback JSX · dentro de [`AdminLogsScreen`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L10)

Responde al evento de interfaz `AdminCollectionScreen.onRefresh`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L105).
