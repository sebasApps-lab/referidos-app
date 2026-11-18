# Android · Pantallas por función y rol · 6 de 9

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L1)
- [`apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L1)
- [`apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L1)
- [`apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L1)
- [`apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L1)
- [`apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L1)
- [`apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L1)

## Símbolos y conexiones

### [`apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L1)

Resuelve el identificador del perfil, carga sus QR y aplica filtros de la vista. Reutiliza normalización de estado y fechas para entender registros con formatos históricos.

**Superficie que exporta.** [`ClienteHistorialScreen`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L38).

**Módulos que lo cargan.** [`RoleTabs.tsx`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L9) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/ui/BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/store/appStore`](../../../apps/referidos-android/src/shared/store/appStore.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts).

#### [`HistoryFilter`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L16) · tipo TypeScript

Describe la forma del contrato de `History Filter`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`toHistoryCategory`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L18) · función

Implementa `to History Category` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `row`.
- **Retorno visible o tipo declarado** `Exclude`.
- **Condiciones que evalúa** `rawStatus.includes`, `expiresAt`, `ausencia de Number.isNaN y expiresTime`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L19), [`trim`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L19), [`readFirst`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L19), [`rawStatus.includes`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L20), [`getTime`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L32).
- **Lo usa** [`listRows`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L82) (llama).

#### [`ClienteHistorialScreen`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L38) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `View`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `onboarding mediante useAppStore`, `selector state.onboarding`, `[loading, setLoading] mediante useState`, `[rows, setRows] mediante useState`, `[error, setError] mediante useState`, `[filter, setFilter] mediante useState`, `[detailKey, setDetailKey] mediante useState`.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `View`, `BlockSkeleton`.
- **Hooks que llama** `useAppStore`, `useState`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37) (llama), [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L9) (renderiza), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L128), [`formatDateTime`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L156), [`filteredRows.map`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L164).
- **Lo usa** [`ClienteTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L112) (referencia).

#### [`loadHistory`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L46) · callback React · asíncrona · dentro de [`ClienteHistorialScreen`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L38)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setError`, `setRows`.
- **Condiciones que evalúa** `ausencia de userId`, `ausencia de current.ok o ausencia de current.data.id`, `ausencia de history.ok`.
- **Usa código de** [`fetchCurrentUserRow`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L99) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia), [`fetchQrHistoryByClientId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L147) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L47), [`setError`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L48), [`fetchCurrentUserRow`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L53), [`setRows`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L57), [`fetchQrHistoryByClientId`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L63).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L76) (llama), [`ClienteHistorialScreen`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L77) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L75) · callback de infraestructura · dentro de [`ClienteHistorialScreen`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L38)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClienteHistorialScreen`.

- **Llamadas directas en el cuerpo** [`loadHistory`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L76).

#### [`listRows`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L80) · cálculo memorizado · dentro de [`ClienteHistorialScreen`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L38)

Obtiene o resuelve `Rows` para entregarlo al consumidor.

- **Retorno visible o tipo declarado** `key`, `row`, `category`, `statusLabel`, `code`, `promo`, `created`.
- **Hooks que llama** `useMemo`.
- **Usa código de** [`toDisplayStatus`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L523) (llama), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`rows.map`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L81), [`toHistoryCategory`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L82), [`toDisplayStatus`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L83), [`readFirst`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L83).
- **Lo usa** [`filteredRows`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L106) (referencia), [`detailItem`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L111) (accede al módulo).

#### [`filteredRows`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L105) · cálculo memorizado · dentro de [`ClienteHistorialScreen`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L38)

Procesa `ed Rows` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `filter`.
- **Llamadas directas en el cuerpo** [`listRows.filter`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L107).
- **Lo usa** [`ClienteHistorialScreen`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L146) (accede al módulo).

#### [`detailItem`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L111) · cálculo memorizado · dentro de [`ClienteHistorialScreen`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L38)

Función auxiliar de `ClienteHistorialScreen` para `detail Item`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`listRows.find`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L111).
- **Lo usa** [`ClienteHistorialScreen`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L150) (referencia).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L131) · callback JSX · dentro de [`ClienteHistorialScreen`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L38)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setFilter`, `setDetailKey`.
- **Llamadas directas en el cuerpo** [`setFilter`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L132), [`setDetailKey`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L133).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L157) · callback JSX · dentro de [`ClienteHistorialScreen`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L38)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setDetailKey`.
- **Llamadas directas en el cuerpo** [`setDetailKey`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L157).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L187) · callback JSX · dentro de [`ClienteHistorialScreen`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L38)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setDetailKey`.
- **Llamadas directas en el cuerpo** [`setDetailKey`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L187).

#### [`styles`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L199) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L199).
- **Lo usa** [`ClienteHistorialScreen`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L117) (accede al módulo).

### [`apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L1)

Usa el perfil inicial y carga una selección de promociones. Muestra avisos de cuenta y accesos rápidos al escáner e historial. Abre enlaces externos mediante `Linking` cuando una promoción los aporta.

**Superficie que exporta.** [`ClienteInicioScreen`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L13).

**Módulos que lo cargan.** [`RoleTabs.tsx`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L7) (importa).

**Dependencias del archivo.** `react`, `react-native`, `@react-navigation/native`, [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/ui/BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/store/appStore`](../../../apps/referidos-android/src/shared/store/appStore.ts), [`@shared/store/modalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts), [`@navigation/routeKeys`](../../../apps/referidos-android/src/navigation/routeKeys.ts).

#### [`ClienteInicioScreen`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L13) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `View`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `onboarding mediante useAppStore`, `selector state.onboarding`, `bootstrapAuth mediante useAppStore`, `selector state.bootstrapAuth`, `openAlert mediante useModalStore`, `selector state.openAlert`, `[promosLoading, setPromosLoading] mediante useState`, `[promos, setPromos] mediante useState`, `[error, setError] mediante useState`.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `View`, `BlockSkeleton`.
- **Hooks que llama** `useNavigation`, `useAppStore`, `useModalStore`, `useState`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37) (llama), [`useModalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70) (llama), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L9) (renderiza), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`readFirst`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L32), [`split`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L102), [`promos.map`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L155), [`formatDateTime`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L179).
- **Lo usa** [`ClienteTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L107) (referencia).

#### [`alias`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L24) · cálculo memorizado · dentro de [`ClienteInicioScreen`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L13)

Función auxiliar de `ClienteInicioScreen` para `alias`.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`readFirst`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L25).
- **Lo usa** [`ClienteInicioScreen`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L102) (referencia).

#### [`loadPromos`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L34) · callback React · asíncrona · dentro de [`ClienteInicioScreen`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L13)

Obtiene o resuelve el valor de promociones para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setPromosLoading`, `setError`, `setPromos`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`fetchPromoFeed`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L138) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia).
- **Llamadas directas en el cuerpo** [`setPromosLoading`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L35), [`setError`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L36), [`fetchPromoFeed`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L37), [`setPromos`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L40).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L49) (llama), [`ClienteInicioScreen`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L50) (referencia), [`onRefresh`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L54) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L48) · callback de infraestructura · dentro de [`ClienteInicioScreen`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L13)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClienteInicioScreen`.

- **Llamadas directas en el cuerpo** [`loadPromos`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L49).

#### [`onRefresh`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L52) · callback React · asíncrona · dentro de [`ClienteInicioScreen`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L13)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`bootstrapAuth`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L53), [`loadPromos`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L54).
- **Lo usa** [`ClienteInicioScreen`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L105) (pasa a onPress).

#### [`openPromoLink`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L58) · callback React · asíncrona · dentro de [`ClienteInicioScreen`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L13)

Inicia `Promo Link` y prepara sus dependencias.

- **Entradas** `promo`.
- **Hooks que llama** `useCallback`.
- **Efectos y APIs** `Linking.canOpenURL`, `Linking.openURL`.
- **Condiciones que evalúa** `ausencia de externalLink`, `ausencia de canOpen`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L59), [`readFirst`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L60), [`openAlert`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L68), [`Linking.canOpenURL`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L77), [`Linking.openURL`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L86).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L180) (llama).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L134) · callback JSX · dentro de [`ClienteInicioScreen`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L13)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`TAB_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L9) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L134).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L140) · callback JSX · dentro de [`ClienteInicioScreen`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L13)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`TAB_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L9) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L140).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L180) · callback JSX · dentro de [`ClienteInicioScreen`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L13)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openPromoLink`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L180).

#### [`styles`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L193) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L193).
- **Lo usa** [`ClienteInicioScreen`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L100) (accede al módulo).

### [`apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L1)

Lee cámara o entrada manual, clasifica el código e invoca `redeemValidQrCode` para el canje de un QR válido. Muestra resultado y recarga los registros recientes del negocio.

**Superficie que exporta.** [`NegocioEscanerScreen`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L34).

**Módulos que lo cargan.** [`RoleTabs.tsx`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L12) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/ui/BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/store/appStore`](../../../apps/referidos-android/src/shared/store/appStore.ts), [`@features/scanner/NativeQrScannerBlock`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts).

#### [`ScannerOutcome`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L18) · tipo TypeScript

Describe la forma del contrato de `Scanner Outcome`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`parseQrKind`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L20) · función

Extrae o interpreta `Qr Kind` de los argumentos, estado o datos de entrada.

- **Entradas** `code`.
- **Condiciones que evalúa** `normalized.startsWith`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L21), [`trim`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L21), [`normalized.startsWith`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L22).
- **Lo usa** [`handleProcessCode`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L80) (llama).

#### [`mapRedeemFailure`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L27) · función

Construye `Redeem Failure` a partir de los datos del flujo.

- **Entradas** `message`.
- **Retorno visible o tipo declarado** `ScannerOutcome`.
- **Condiciones que evalúa** `text.includes`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L28), [`text.includes`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L29).
- **Lo usa** [`handleProcessCode`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L103) (llama).

#### [`NegocioEscanerScreen`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L34) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `NativeQrScannerBlock`, `SectionCard`, `Text`, `TextInput`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `onboarding mediante useAppStore`, `selector state.onboarding`, `[manualCode, setManualCode] mediante useState`, `[error, setError] mediante useState`, `[result, setResult] mediante useState`, `[recentLoading, setRecentLoading] mediante useState`, `[recent, setRecent] mediante useState`.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `NativeQrScannerBlock`, `SectionCard`, `Text`, `TextInput`, `Pressable`, `View`, `BlockSkeleton`.
- **Hooks que llama** `useAppStore`, `useState`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37) (llama), [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`NativeQrScannerBlock`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L11) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L9) (renderiza), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`recent.map`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L196), [`readFirst`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L197), [`formatDateTime`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L205).
- **Lo usa** [`NegocioTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L127) (referencia).

#### [`loadRecent`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L42) · callback React · asíncrona · dentro de [`NegocioEscanerScreen`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L34)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRecentLoading`, `setRecent`.
- **Condiciones que evalúa** `ausencia de userId`, `ausencia de businessResult.ok o ausencia de businessResult.data.id`.
- **Usa código de** [`fetchCurrentUserRow`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L99) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia), [`fetchBusinessByUserId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L115) (llama), [`fetchQrHistoryByBusinessId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L155) (llama).
- **Llamadas directas en el cuerpo** [`setRecentLoading`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L43), [`fetchCurrentUserRow`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L47), [`setRecent`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L51), [`fetchBusinessByUserId`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L55), [`fetchQrHistoryByBusinessId`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L61).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L67) (llama), [`NegocioEscanerScreen`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L68) (referencia), [`handleProcessCode`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L122) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L66) · callback de infraestructura · dentro de [`NegocioEscanerScreen`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L34)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioEscanerScreen`.

- **Llamadas directas en el cuerpo** [`loadRecent`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L67).

#### [`handleProcessCode`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L70) · callback React · asíncrona · dentro de [`NegocioEscanerScreen`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L34)

Maneja `Process Code` y coordina las acciones indicadas abajo.

- **Entradas** `incomingCode?`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setResult`, `setError`, `setManualCode`.
- **Condiciones que evalúa** `clean.length`, `kind`, `ausencia de redeem.ok`.
- **Usa código de** [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo), [`redeemValidQrCode`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L246) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`setResult`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L71), [`setError`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L72), [`trim`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L73), [`setManualCode`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L78), [`parseQrKind`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L80), [`observability.track`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L94), [`redeemValidQrCode`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L101), [`mapRedeemFailure`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L103), [`readFirst`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L120), [`loadRecent`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L122).
- **Lo usa** [`NativeQrScannerBlock.onDetected`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L130) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L145) (llama).

#### [`NativeQrScannerBlock.onDetected`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L129) · callback JSX · dentro de [`NegocioEscanerScreen`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L34)

Responde al evento de interfaz `NativeQrScannerBlock.onDetected`. La lógica ocurre al interactuar con ese control.

- **Entradas** `code`.
- **Llamadas directas en el cuerpo** [`handleProcessCode`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L130).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L145) · callback JSX · dentro de [`NegocioEscanerScreen`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L34)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleProcessCode`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L145).

#### [`styles`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L216) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L216).
- **Lo usa** [`NegocioEscanerScreen`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L127) (accede al módulo).

### [`apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L1)

Carga negocio y sucursales, crea y actualiza promociones, cambia estados, borra con confirmación y mantiene la relación promo–sucursal. Usa los servicios que toleran variaciones de columnas para que presentación y consultas no queden acopladas a cada nombre histórico.

**Superficie que exporta.** [`NegocioGestionarScreen`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L48).

**Módulos que lo cargan.** [`RoleTabs.tsx`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L13) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/ui/BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/store/appStore`](../../../apps/referidos-android/src/shared/store/appStore.ts), [`@shared/store/modalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts).

#### [`ManageTab`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L25) · tipo TypeScript

Describe la forma del contrato de `Manage Tab`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`normalizePromoStatus`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L27) · función

Normaliza `Promo Status` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Condiciones que evalúa** `raw.includes`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L28), [`trim`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L28), [`raw.includes`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L29).
- **Lo usa** [`nextPromoStatus`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L35) (llama).

#### [`nextPromoStatus`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L34) · función

Implementa `next Promo Status` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `status`.
- **Condiciones que evalúa** `current`.
- **Llamadas directas en el cuerpo** [`normalizePromoStatus`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L35).
- **Lo usa** [`changePromoStatus`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L172) (llama).

#### [`nextBranchState`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L41) · función

Implementa `next Branch State` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `current`.
- **Condiciones que evalúa** `value.includes`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L42), [`trim`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L42), [`value.includes`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L43).
- **Lo usa** [`transitionBranchState`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L265) (llama), [`NegocioGestionarScreen`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L400) (llama).

#### [`NegocioGestionarScreen`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L48) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `BlockSkeleton`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `onboarding mediante useAppStore`, `selector state.onboarding`, `openConfirm mediante useModalStore`, `selector state.openConfirm`, `openAlert mediante useModalStore`, `selector state.openAlert`, `openPicker mediante useModalStore`, `selector state.openPicker`, `[activeTab, setActiveTab] mediante useState`, `[loading, setLoading] mediante useState`, `[error, setError] mediante useState`, `[promos, setPromos] mediante useState`, `[branches, setBranches] mediante useState`, `[businessId, setBusinessId] mediante useState` y 6 más.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `BlockSkeleton`, `View`, `TextInput`.
- **Hooks que llama** `useAppStore`, `useModalStore`, `useState`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37) (llama), [`useModalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70) (llama), [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L9) (renderiza), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L310), [`promos.slice`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L354), [`trim`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L355), [`readFirst`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L355), [`linkedBranchIds.map`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L357), [`branchById.get`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L358), [`formatDateTime`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L368), [`linkedBranchNames.join`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L371), [`branches.slice`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L398), [`nextBranchState`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L400).
- **Lo usa** [`NegocioTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L131) (referencia).

#### [`branchById`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L66) · cálculo memorizado · dentro de [`NegocioGestionarScreen`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L48)

Función auxiliar de `NegocioGestionarScreen` para `branch By Id`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `id`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L69), [`readFirst`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L69), [`map.set`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L70).
- **Lo usa** [`NegocioGestionarScreen`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L358) (accede al módulo).

#### [`loadPromoLinks`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L75) · callback React · asíncrona · dentro de [`NegocioGestionarScreen`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L48)

Obtiene o resuelve `Promo Links` para entregarlo al consumidor.

- **Entradas** `promoRows`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setPromoBranchLinks`.
- **Condiciones que evalúa** `ausencia de promoId`, `ausencia de links.ok`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`fetchPromoBranchLinksByPromoId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L477) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia).
- **Llamadas directas en el cuerpo** [`promoRows.map`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L77), [`trim`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L78), [`readFirst`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L78), [`fetchPromoBranchLinksByPromoId`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L80), [`filter`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L82), [`map`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L82), [`setPromoBranchLinks`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L96).
- **Lo usa** [`loadData`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L130) (llama).

#### [`loadData`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L99) · callback React · asíncrona · dentro de [`NegocioGestionarScreen`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L48)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setError`, `setBusinessId`, `setPromos`, `setBranches`.
- **Condiciones que evalúa** `ausencia de userId`, `ausencia de businessResult.ok o ausencia de businessResult.data.id`.
- **Usa código de** [`fetchCurrentUserRow`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L99) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia), [`fetchBusinessByUserId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L115) (llama), [`fetchPromosByBusinessId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L130) (llama), [`fetchBranchesByBusinessId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L122) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L100), [`setError`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L101), [`fetchCurrentUserRow`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L105), [`fetchBusinessByUserId`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L114), [`setBusinessId`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L122), [`fetchPromosByBusinessId`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L124), [`fetchBranchesByBusinessId`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L125), [`setPromos`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L128), [`setBranches`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L129), [`loadPromoLinks`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L130).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L135) (llama), [`NegocioGestionarScreen`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L136) (referencia), [`createPromo`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L164) (llama), [`changePromoStatus`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L179) (llama), [`onConfirm`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L203) (llama), [`removePromo`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L208) (referencia), [`onSelect`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L252) (llama), [`openBranchLinking`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L257) (referencia), [`transitionBranchState`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L272) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L134) · callback de infraestructura · dentro de [`NegocioGestionarScreen`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L48)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioGestionarScreen`.

- **Llamadas directas en el cuerpo** [`loadData`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L135).

#### [`createPromo`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L138) · callback React · asíncrona · dentro de [`NegocioGestionarScreen`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L48)

Construye el valor de promoción a partir de los datos del flujo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setActionMessage`, `setActionError`, `setCreatingPromo`, `setNewPromoTitle`, `setNewPromoDescription`.
- **Condiciones que evalúa** `ausencia de businessId`, `length`, `ausencia de created.ok`.
- **Usa código de** [`createPromoForBusiness`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L261) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia).
- **Llamadas directas en el cuerpo** [`setActionMessage`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L139), [`setActionError`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L140), [`newPromoTitle.trim`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L145), [`setCreatingPromo`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L149), [`createPromoForBusiness`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L150), [`newPromoDescription.trim`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L153), [`setNewPromoTitle`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L162), [`setNewPromoDescription`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L163), [`loadData`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L164).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L339) (llama).

#### [`changePromoStatus`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L168) · callback React · asíncrona · dentro de [`NegocioGestionarScreen`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L48)

Coordina cambios de estado durante `change Promo Status`.

- **Entradas** `promo`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setActionError`, `setActionMessage`.
- **Condiciones que evalúa** `ausencia de promoId`, `ausencia de result.ok`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`updatePromoStatusById`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L313) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L169), [`readFirst`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L169), [`nextPromoStatus`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L172), [`updatePromoStatusById`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L173), [`setActionError`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L175), [`setActionMessage`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L178), [`loadData`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L179).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L374) (llama).

#### [`removePromo`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L185) · callback React · dentro de [`NegocioGestionarScreen`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L48)

Limpia o restablece el valor de promoción como parte de este flujo.

- **Entradas** `promo`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `ausencia de promoId`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L186), [`readFirst`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L186), [`openConfirm`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L189).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L380) (llama).

#### [`onConfirm`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L195) · función · dentro de [`removePromo`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L185)

Maneja `Confirm` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setActionError`, `setActionMessage`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`deletePromoById`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L342) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia).
- **Llamadas directas en el cuerpo** [`deletePromoById`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L197), [`setActionError`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L199), [`setActionMessage`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L202), [`loadData`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L203).

#### [`openBranchLinking`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L212) · callback React · dentro de [`NegocioGestionarScreen`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L48)

Inicia `Branch Linking` y prepara sus dependencias.

- **Entradas** `promo`.
- **Retorno visible o tipo declarado** `id`, `label`, `description`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `ausencia de promoId`, `branches.length`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L213), [`readFirst`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L213), [`openAlert`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L216), [`openPicker`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L225), [`branches.map`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L228), [`selected.has`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L235).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L377) (llama).

#### [`onSelect`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L241) · función · dentro de [`openBranchLinking`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L212)

Maneja `Select` y coordina las acciones indicadas abajo.

- **Entradas** `branchId`.
- **Actualizaciones de estado o acciones** `setActionError`, `setActionMessage`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`unlinkPromoFromBranch`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L445) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia), [`linkPromoToBranch`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L406) (llama).
- **Llamadas directas en el cuerpo** [`selected.has`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L243), [`unlinkPromoFromBranch`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L245), [`linkPromoToBranch`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L246), [`setActionError`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L248), [`setActionMessage`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L251), [`loadData`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L252).

#### [`transitionBranchState`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L261) · callback React · asíncrona · dentro de [`NegocioGestionarScreen`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L48)

Coordina cambios de estado durante `transition Branch State`.

- **Entradas** `branch`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setActionError`, `setActionMessage`.
- **Condiciones que evalúa** `ausencia de branchId`, `ausencia de result.ok`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`updateBranchStateById`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L362) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L262), [`readFirst`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L262), [`nextBranchState`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L265), [`updateBranchStateById`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L266), [`setActionError`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L268), [`setActionMessage`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L271), [`loadData`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L272).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L415) (llama).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L313) · callback JSX · dentro de [`NegocioGestionarScreen`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L48)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setActiveTab`.
- **Llamadas directas en el cuerpo** [`setActiveTab`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L313).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L338) · callback JSX · dentro de [`NegocioGestionarScreen`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L48)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`createPromo`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L339).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L374) · callback JSX · dentro de [`NegocioGestionarScreen`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L48)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`changePromoStatus`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L374).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L377) · callback JSX · dentro de [`NegocioGestionarScreen`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L48)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `openBranchLinking`.
- **Llamadas directas en el cuerpo** [`openBranchLinking`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L377).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L380) · callback JSX · dentro de [`NegocioGestionarScreen`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L48)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`removePromo`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L380).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L415) · callback JSX · dentro de [`NegocioGestionarScreen`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L48)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`transitionBranchState`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L415).

#### [`styles`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L444) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L444).
- **Lo usa** [`NegocioGestionarScreen`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L279) (accede al módulo).

### [`apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L1)

Busca el negocio que corresponde al usuario y obtiene sucursales y promociones. Deriva métricas y avisos y da acceso directo a gestión y escáner.

**Superficie que exporta.** [`NegocioInicioScreen`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L26).

**Módulos que lo cargan.** [`RoleTabs.tsx`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L11) (importa).

**Dependencias del archivo.** `react`, `react-native`, `@react-navigation/native`, [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/ui/BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/store/appStore`](../../../apps/referidos-android/src/shared/store/appStore.ts), [`@navigation/routeKeys`](../../../apps/referidos-android/src/navigation/routeKeys.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts).

#### [`normalizePromoStatus`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L19) · función

Normaliza `Promo Status` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `rawValue`.
- **Condiciones que evalúa** `value.includes`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L20), [`trim`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L20), [`value.includes`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L21).
- **Lo usa** [`promoStats`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L85) (llama).

#### [`NegocioInicioScreen`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L26) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `BlockSkeleton`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `onboarding mediante useAppStore`, `selector state.onboarding`, `bootstrapAuth mediante useAppStore`, `selector state.bootstrapAuth`, `[loading, setLoading] mediante useState`, `[error, setError] mediante useState`, `[business, setBusiness] mediante useState`, `[branches, setBranches] mediante useState`, `[promos, setPromos] mediante useState`.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `BlockSkeleton`, `View`.
- **Hooks que llama** `useNavigation`, `useAppStore`, `useState`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37) (llama), [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L9) (renderiza), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`readFirst`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L97), [`map`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L178), [`promos.slice`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L178), [`formatDateTime`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L187).
- **Lo usa** [`NegocioTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L126) (referencia).

#### [`loadDashboard`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L36) · callback React · asíncrona · dentro de [`NegocioInicioScreen`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L26)

Obtiene o resuelve `Dashboard` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setError`, `setBusiness`, `setBranches`, `setPromos`.
- **Condiciones que evalúa** `ausencia de userId`, `ausencia de businessResult.ok o ausencia de businessResult.data.id`.
- **Usa código de** [`fetchCurrentUserRow`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L99) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia), [`fetchBusinessByUserId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L115) (llama), [`fetchBranchesByBusinessId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L122) (llama), [`fetchPromosByBusinessId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L130) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L37), [`setError`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L38), [`fetchCurrentUserRow`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L43), [`fetchBusinessByUserId`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L52), [`setBusiness`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L56), [`setBranches`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L57), [`setPromos`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L58), [`fetchBranchesByBusinessId`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L64), [`fetchPromosByBusinessId`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L65).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L74) (llama), [`NegocioInicioScreen`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L75) (referencia), [`refreshAll`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L79) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L73) · callback de infraestructura · dentro de [`NegocioInicioScreen`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L26)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioInicioScreen`.

- **Llamadas directas en el cuerpo** [`loadDashboard`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L74).

#### [`refreshAll`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L77) · callback React · asíncrona · dentro de [`NegocioInicioScreen`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L26)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`bootstrapAuth`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L78), [`loadDashboard`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L79).
- **Lo usa** [`NegocioInicioScreen`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L100) (pasa a onPress).

#### [`promoStats`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L82) · cálculo memorizado · dentro de [`NegocioInicioScreen`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L26)

Función auxiliar de `NegocioInicioScreen` para `promo Stats`.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`normalizePromoStatus`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L85), [`readFirst`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L85).
- **Lo usa** [`NegocioInicioScreen`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L91) (accede al módulo).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L135) · callback JSX · dentro de [`NegocioInicioScreen`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L26)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`TAB_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L9) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L135).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L141) · callback JSX · dentro de [`NegocioInicioScreen`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L26)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigation.navigate`.
- **Usa código de** [`TAB_ROUTES`](../../../apps/referidos-android/src/navigation/routeKeys.ts#L9) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigation.navigate`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L141).

#### [`styles`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L198) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L198).
- **Lo usa** [`NegocioInicioScreen`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L95) (accede al módulo).

### [`apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L1)

Enlaza la cuenta administrativa a paneles de acceso, proveedores vinculados, notificaciones y sesiones. Usa el perfil normalizado que proviene de onboarding.

**Superficie que exporta.** [`AdminPerfilScreen`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L14).

**Módulos que lo cargan.** [`RoleTabs.tsx`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L19) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/store/appStore`](../../../apps/referidos-android/src/shared/store/appStore.ts), [`@shared/store/modalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts), [`@shared/services/systemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts), [`./components/ProfileRuntimePanels`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx).

#### [`AdminPerfilScreen`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L14) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `SectionCard`, `Text`, `Pressable`, `LinkedProvidersSection`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `onboarding mediante useAppStore`, `selector state.onboarding`, `signOut mediante useAppStore`, `selector state.signOut`, `openConfirm mediante useModalStore`, `selector state.openConfirm`, `[appleEnabled, setAppleEnabled] mediante useState`.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `SectionCard`, `Text`, `Pressable`, `LinkedProvidersSection`, `NotificationsSection`, `SessionsSection`.
- **Hooks que llama** `useAppStore`, `useModalStore`, `useState`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37) (llama), [`useModalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70) (llama), [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`LinkedProvidersSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L27) (renderiza), [`NotificationsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L67) (renderiza), [`SessionsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L144) (renderiza).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L28), [`trim`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L28).
- **Lo usa** [`AdminTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L153) (referencia).

#### [`providers`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L19) · cálculo memorizado · dentro de [`AdminPerfilScreen`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L14)

Función auxiliar de `AdminPerfilScreen` para `providers`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `onboarding.usuario.email`.
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L21), [`map`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L21), [`toLowerCase`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L22), [`trim`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L22), [`unique.add`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L25).
- **Lo usa** [`AdminPerfilScreen`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L71) (pasa a providers).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L30) · callback de infraestructura · dentro de [`AdminPerfilScreen`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L14)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminPerfilScreen`.

- **Actualizaciones de estado o acciones** `setAppleEnabled`.
- **Condiciones que evalúa** `mounted`.
- **Usa código de** [`fetchSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L45) (llama).
- **Llamadas directas en el cuerpo** [`then`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L32), [`fetchSystemFeatureFlags`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L32), [`setAppleEnabled`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L33).

#### [`handleSignOut`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L40) · callback React · dentro de [`AdminPerfilScreen`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L14)

Atiende `Pressable.onPress`, `SessionsSection.onCurrentSessionRevoked` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`, `SessionsSection.onCurrentSessionRevoked`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`openConfirm`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L41).
- **Lo usa** [`AdminPerfilScreen`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L66) (pasa a onPress).

#### [`onConfirm`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L47) · función · dentro de [`handleSignOut`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L40)

Maneja `Confirm` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`signOut`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L48).

#### [`styles`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L82) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L82).
- **Lo usa** [`AdminPerfilScreen`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L55) (accede al módulo).

### [`apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L1)

Organiza métodos de seguridad, sesiones, información, beneficios y soporte del cliente. Carga sus tickets por identificador público, envía uno nuevo, solicita retomar un hilo y expone el flujo de eliminación de cuenta.

**Superficie que exporta.** [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45).

**Módulos que lo cargan.** [`RoleTabs.tsx`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L10) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/ui/BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/store/appStore`](../../../apps/referidos-android/src/shared/store/appStore.ts), [`@shared/store/modalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts), [`@shared/constants/supportCategories`](../../../apps/referidos-android/src/shared/constants/supportCategories.ts), [`@shared/services/systemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts), [`./components/AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx), [`./components/ProfileRuntimePanels`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx), [`./components/ProfileExtendedSections`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts), [`@shared/services/accountLifecycle`](../../../apps/referidos-android/src/shared/services/accountLifecycle.ts).

#### [`ProfileTab`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L39) · tipo TypeScript

Describe la forma del contrato de `Profile Tab`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`generateClientRequestId`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L41) · función

Implementa `generate Client Request Id` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Llamadas directas en el cuerpo** [`slice`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L42), [`toString`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L42).
- **Lo usa** [`handleCreateTicket`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L173) (llama).

#### [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `View`, `Pressable`, `Text`, `SectionCard`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `onboarding mediante useAppStore`, `selector state.onboarding`, `bootstrapAuth mediante useAppStore`, `selector state.bootstrapAuth`, `signOut mediante useAppStore`, `selector state.signOut`, `openConfirm mediante useModalStore`, `selector state.openConfirm`, `openAlert mediante useModalStore`, `selector state.openAlert`, `openPicker mediante useModalStore`, `selector state.openPicker`, `[profileTab, setProfileTab] mediante useState`, `[category, setCategory] mediante useState` y 10 más.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `View`, `Pressable`, `Text`, `SectionCard`, `TextInput`, `ProfileBenefitsSection`, `AccessSecurityPanel`, `LinkedProvidersSection`, `SessionsSection`, `NotificationsSection`, `ProfilePreferencesSection`, `ProfileFaqSection`, `BlockSkeleton`.
- **Hooks que llama** `useAppStore`, `useModalStore`, `useState`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37) (llama), [`useModalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70) (llama), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`ProfileBenefitsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L48) (renderiza), [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L29) (renderiza), [`LinkedProvidersSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L27) (renderiza), [`SessionsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L144) (renderiza), [`NotificationsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L67) (renderiza) y 5 más.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L82), [`trim`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L82), [`readFirst`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L84), [`map`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L348), [`visibleCategories.find`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L505), [`visibleCategories.map`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L512), [`tickets.map`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L575), [`toDisplayStatus`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L582), [`formatDateTime`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L589).
- **Lo usa** [`ClienteTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L114) (referencia).

#### [`visibleCategories`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L70) · cálculo memorizado · dentro de [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45)

Función auxiliar de `ClientePerfilScreen` para `visible Categories`.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`SUPPORT_CHAT_CATEGORIES`](../../../apps/referidos-android/src/shared/constants/supportCategories.ts#L10) (accede al módulo).
- **Llamadas directas en el cuerpo** [`SUPPORT_CHAT_CATEGORIES.filter`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L70), [`item.roles.includes`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L70).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L87) (accede al módulo), [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L91) (referencia), [`openCategoryPicker`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L204) (accede al módulo).

#### [`linkedProviders`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L73) · cálculo memorizado · dentro de [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45)

Función auxiliar de `ClientePerfilScreen` para `linked Providers`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `usuario.email`.
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L75), [`map`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L75), [`toLowerCase`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L76), [`trim`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L76), [`unique.add`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L79).
- **Lo usa** [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L474) (pasa a providers).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L86) · callback de infraestructura · dentro de [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClientePerfilScreen`.

- **Actualizaciones de estado o acciones** `setCategory`.
- **Condiciones que evalúa** `ausencia de visibleCategories.length`, `ausencia de visibleCategories.some`.
- **Llamadas directas en el cuerpo** [`visibleCategories.some`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L88), [`setCategory`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L89).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L93) · callback de infraestructura · dentro de [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClientePerfilScreen`.

- **Actualizaciones de estado o acciones** `setProfileDraft`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`setProfileDraft`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L94), [`trim`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L95), [`readFirst`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L95).

#### [`loadTickets`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L101) · callback React · asíncrona · dentro de [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setTicketsLoading`, `setTicketsError`, `setTicketOwnerPublicId`, `setTickets`.
- **Condiciones que evalúa** `ausencia de ownerPublicId`, `current.ok y current.data`, `ausencia de result.ok`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`fetchCurrentUserRow`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L99) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia), [`fetchSupportTicketsByUserPublicId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L176) (llama).
- **Llamadas directas en el cuerpo** [`setTicketsLoading`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L102), [`setTicketsError`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L103), [`trim`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L105), [`readFirst`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L106), [`fetchCurrentUserRow`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L109), [`setTicketOwnerPublicId`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L116), [`setTickets`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L117), [`fetchSupportTicketsByUserPublicId`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L124).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L137) (llama), [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L138) (referencia), [`handleCreateTicket`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L184) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L136) · callback de infraestructura · dentro de [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClientePerfilScreen`.

- **Llamadas directas en el cuerpo** [`loadTickets`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L137).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L140) · callback de infraestructura · dentro de [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClientePerfilScreen`.

- **Actualizaciones de estado o acciones** `setAppleEnabled`.
- **Condiciones que evalúa** `mounted`.
- **Usa código de** [`fetchSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L45) (llama).
- **Llamadas directas en el cuerpo** [`then`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L142), [`fetchSystemFeatureFlags`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L142), [`setAppleEnabled`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L143).

#### [`handleCreateTicket`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L150) · callback React · asíncrona · dentro de [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`, `setCreating`, `setCreated`, `setSummary`.
- **Condiciones que evalúa** `length`, `ausencia de result.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L151), [`summary.trim`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L152), [`openAlert`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L154), [`setCreating`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L162), [`generateClientRequestId`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L173), [`mobileApi.support.createThread`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L176), [`setCreated`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L182), [`setSummary`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L183), [`loadTickets`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L184).
- **Lo usa** [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L534) (pasa a onPress).

#### [`handleSignOut`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L187) · callback React · dentro de [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45)

Atiende `Pressable.onPress`, `SessionsSection.onCurrentSessionRevoked` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`, `SessionsSection.onCurrentSessionRevoked`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`openConfirm`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L188).
- **Lo usa** [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L408) (pasa a onPress).

#### [`onConfirm`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L194) · función · dentro de [`handleSignOut`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L187)

Maneja `Confirm` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`signOut`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L195).

#### [`openCategoryPicker`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L200) · callback React · dentro de [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`openPicker`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L201), [`visibleCategories.map`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L204).
- **Lo usa** [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L507) (pasa a onPress).

#### [`onSelect`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L212) · función · dentro de [`openCategoryPicker`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L200)

Maneja `Select` y coordina las acciones indicadas abajo.

- **Entradas** `id`.
- **Actualizaciones de estado o acciones** `setCategory`.
- **Llamadas directas en el cuerpo** [`setCategory`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L212).

#### [`handleOpenWhatsapp`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L216) · callback React · asíncrona · dentro de [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Efectos y APIs** `Linking.openURL`.
- **Condiciones que evalúa** `ausencia de link`.
- **Llamadas directas en el cuerpo** [`Linking.openURL`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L219).
- **Lo usa** [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L548) (pasa a onPress).

#### [`handleOpenSupportEmail`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L222) · callback React · asíncrona · dentro de [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Efectos y APIs** `Linking.openURL`.
- **Llamadas directas en el cuerpo** [`Linking.openURL`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L224), [`openAlert`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L226).
- **Lo usa** [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L495) (pasa a onPress).

#### [`handleOpenTicketWhatsapp`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L240) · callback React · asíncrona · dentro de [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45)

Maneja `Open Ticket Whatsapp` y coordina las acciones indicadas abajo.

- **Entradas** `ticket`.
- **Hooks que llama** `useCallback`.
- **Efectos y APIs** `Linking.openURL`.
- **Condiciones que evalúa** `ausencia de link`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L241), [`readFirst`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L241), [`Linking.openURL`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L244), [`openAlert`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L246).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L594) (llama).

#### [`handleRequestRetake`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L257) · callback React · dentro de [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45)

Maneja `Request Retake` y coordina las acciones indicadas abajo.

- **Entradas** `ticket`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `ausencia de threadPublicId`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L258), [`readFirst`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L258), [`openConfirm`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L260).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L603) (llama).

#### [`onConfirm`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L266) · función · asíncrona · dentro de [`handleRequestRetake`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L257)

Maneja `Confirm` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setTickets`.
- **Condiciones que evalúa** `ausencia de result.ok o result.data.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`mobileApi.support.requestRetake`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L267), [`openAlert`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L271), [`setTickets`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L278), [`current.map`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L279), [`readFirst`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L280), [`toISOString`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L284).

#### [`handleDeleteAccount`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L295) · callback React · dentro de [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`openConfirm`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L296).
- **Lo usa** [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L431) (pasa a onPress).

#### [`onConfirm`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L302) · función · asíncrona · dentro de [`handleDeleteAccount`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L295)

Maneja `Confirm` y coordina las acciones indicadas abajo.

- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`deleteCurrentUserAccount`](../../../apps/referidos-android/src/shared/services/accountLifecycle.ts#L7) (llama).
- **Llamadas directas en el cuerpo** [`deleteCurrentUserAccount`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L303), [`openAlert`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L305), [`signOut`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L312).

#### [`handleSaveProfile`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L317) · callback React · asíncrona · dentro de [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `ausencia de userAuthId`, `updateError`.
- **Contrato de datos** tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`ClientePerfilScreen.tsx:319`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L319), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`ClientePerfilScreen.tsx:319`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L319).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`eq`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L319), [`update`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L319), [`supabase.from`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L319), [`profileDraft.nombre.trim`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L322), [`profileDraft.telefono.trim`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L323), [`profileDraft.direccion.trim`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L324), [`openAlert`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L329), [`bootstrapAuth`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L336).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L402) (llama).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L351) · callback JSX · dentro de [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setProfileTab`.
- **Llamadas directas en el cuerpo** [`setProfileTab`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L351).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L368) · callback JSX · dentro de [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setProfileDraft`.
- **Llamadas directas en el cuerpo** [`setProfileDraft`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L368).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L381) · callback JSX · dentro de [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setProfileDraft`.
- **Llamadas directas en el cuerpo** [`setProfileDraft`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L381).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L390) · callback JSX · dentro de [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setProfileDraft`.
- **Llamadas directas en el cuerpo** [`setProfileDraft`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L390).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L402) · callback JSX · dentro de [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleSaveProfile`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L402).

#### [`AccessSecurityPanel.onReload`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L468) · callback JSX · asíncrona · dentro de [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45)

Responde al evento de interfaz `AccessSecurityPanel.onReload`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`bootstrapAuth`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L469).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L515) · callback JSX · dentro de [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setCategory`.
- **Llamadas directas en el cuerpo** [`setCategory`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L515).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L594) · callback JSX · dentro de [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleOpenTicketWhatsapp`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L594).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L603) · callback JSX · dentro de [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L45)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleRequestRetake`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L603).

#### [`styles`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L630) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L630).
- **Lo usa** [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L346) (accede al módulo).
