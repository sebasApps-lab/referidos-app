# Android · Pantallas por función y rol · 4 de 9

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L1)
- [`apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L1)
- [`apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts#L1)
- [`apps/referidos-android/src/features/auth/AuthFlowScreen.tsx`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L1)
- [`apps/referidos-android/src/features/auth/blocks/AccountVerifyMethodStepBlock.tsx`](../../../apps/referidos-android/src/features/auth/blocks/AccountVerifyMethodStepBlock.tsx#L1)
- [`apps/referidos-android/src/features/auth/blocks/AccountVerifyPromptStepBlock.tsx`](../../../apps/referidos-android/src/features/auth/blocks/AccountVerifyPromptStepBlock.tsx#L1)

## Símbolos y conexiones

### [`apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L1)

Consola de productos, componentes, releases, drift, gates, migraciones, promociones, historial, deployments y artefactos/nodos. La pantalla mantiene filtros, mensajes y solicitudes, delegando las operaciones a `versioningService.ts` y el proxy.

**Superficie que exporta.** [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115).

**Módulos que lo cargan.** [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L20) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/ui/BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx), [`@shared/services/versioningService`](../../../apps/referidos-android/src/shared/services/versioningService.ts).

#### [`Tab`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L40) · tipo TypeScript

Describe la forma del contrato de `Tab`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`PRODUCT_PRIORITY`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L42) · variable de módulo

Conserva la lista de `PRODUCT PRIORITY` usada por el módulo.

- **Lo usa** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L223) (accede al módulo).

#### [`DEPLOY_ENVS`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L43) · variable de módulo

Conserva la lista de `DEPLOY ENVS` usada por el módulo.

- **Lo usa** [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L618) (accede al módulo).

#### [`safeText`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L45) · función

Implementa `safe Text` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`, `fallback = valor por defecto`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L46).
- **Lo usa** [`safeVersionLabel`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L58) (llama), [`dateLabel`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L79) (llama), [`deployRows`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L182) (llama), [`loadReleaseDetails`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L198) (llama), [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L228) (llama), [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L380) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L654) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L826) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L857) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L903) (llama).

#### [`safeVersionLabel`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L50) · función

Implementa `safe Version Label` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `row`.
- **Condiciones que evalúa** `Number.isFinite`.
- **Usa código de** [`formatVersionLabel`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L16) (llama).
- **Llamadas directas en el cuerpo** [`formatVersionLabel`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L56), [`safeText`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L58).
- **Lo usa** [`loadReleaseDetails`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L203) (llama), [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L500) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L909) (llama).

#### [`nextPromoteEnv`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L61) · función

Implementa `next Promote Env` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `envKey`.
- **Condiciones que evalúa** `env`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L62), [`trim`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L62).
- **Lo usa** [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L633) (llama).

#### [`envRank`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L68) · función

Implementa `env Rank` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `envKey`.
- **Condiciones que evalúa** `env`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L69), [`trim`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L69).
- **Lo usa** [`sortedReleases`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L163) (llama).

#### [`dateLabel`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L76) · función

Implementa `date Label` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de value`, `Number.isNaN`.
- **Llamadas directas en el cuerpo** [`parsed.getTime`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L79), [`safeText`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L79), [`parsed.toLocaleString`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L80).
- **Lo usa** [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L512) (llama).

#### [`settledValue`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L83) · función

Aplica o guarda `tled Value` para que el estado refleje la operación.

- **Entradas** `result`, `fallback`.
- **Retorno visible o tipo declarado** `T`.
- **Condiciones que evalúa** `ausencia de result o result.status`.
- **Lo usa** [`loadReleaseDetails`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L208) (llama), [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L251) (llama).

#### [`settledError`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L88) · función

Aplica o guarda `tled Error` para que el estado refleje la operación.

- **Entradas** `result`.
- **Condiciones que evalúa** `ausencia de result o result.status`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L90).
- **Lo usa** [`loadReleaseDetails`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L210) (llama), [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L268) (referencia).

#### [`InfoCard`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L93) · componente React

Monta `View`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, lines, children}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `View`, `Text`.
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L105).
- **Lo usa** [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L470) (renderiza).

#### [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `View`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[tab, setTab] mediante useState`, `[loading, setLoading] mediante useState`, `[detailLoading, setDetailLoading] mediante useState`, `[busyKey, setBusyKey] mediante useState`, `[error, setError] mediante useState`, `[ok, setOk] mediante useState`, `[products, setProducts] mediante useState`, `[selectedProduct, setSelectedProduct] mediante useState`, `[selectedReleaseId, setSelectedReleaseId] mediante useState`, `[selectedDeployEnv, setSelectedDeployEnv] mediante useState`, `[selectedArtifactNode, setSelectedArtifactNode] mediante useState`, `[devReleaseNotes, setDevReleaseNotes] mediante useState`, `[promoteNotes, setPromoteNotes] mediante useState`, `[deployNotes, setDeployNotes] mediante useState` y 18 más.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `View`, `BlockSkeleton`, `TextInput`, `InfoCard`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L9) (renderiza).
- **Llamadas directas en el cuerpo** [`products.map`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L379), [`safeText`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L380), [`map`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L411), [`sortedReleases.map`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L490), [`safeVersionLabel`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L500), [`toUpperCase`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L500), [`dateLabel`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L512), [`releaseComponents.slice`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L517), [`buildTimelineRows.slice`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L534), [`envConfigRows.slice`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L538), [`promotionHistory.slice`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L542), [`driftRows.slice`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L592) y 10 más.
- **Lo usa** [`AdminStackNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L61) (pasa a component).

#### [`selectedProductMeta`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L155) · cálculo memorizado · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Procesa `ed Product Meta` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`products.find`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L155).
- **Lo usa** [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L395) (referencia).

#### [`sortedReleases`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L160) · cálculo memorizado · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Procesa `ed Releases` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `envDiff`.
- **Llamadas directas en el cuerpo** [`slice`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L161), [`sort`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L161), [`envRank`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L163), [`getTime`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L165).
- **Lo usa** [`selectedRelease`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L174) (accede al módulo), [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L484) (accede al módulo).

#### [`selectedRelease`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L173) · cálculo memorizado · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Procesa `ed Release` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`sortedReleases.find`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L174).
- **Lo usa** [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L507) (referencia).

#### [`deployRows`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L180) · cálculo memorizado · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Función auxiliar de `AdminVersioningScreen` para `deploy Rows`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`deployRequests.filter`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L181), [`safeText`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L182).
- **Lo usa** [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L769) (accede al módulo).

#### [`visibleArtifacts`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L188) · cálculo memorizado · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Función auxiliar de `AdminVersioningScreen` para `visible Artifacts`.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de selectedArtifactNode`, `ausencia de row.node_key`.
- **Llamadas directas en el cuerpo** [`artifacts.filter`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L189).
- **Lo usa** [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L888) (accede al módulo).

#### [`loadReleaseDetails`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L197) · callback React · asíncrona · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Obtiene o resuelve `Release Details` para entregarlo al consumidor.

- **Entradas** `row`, `productKey`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSelectedReleaseId`, `setDetailLoading`, `setReleaseSnapshot`, `setReleaseComponents`, `setError`.
- **Condiciones que evalúa** `ausencia de releaseId`, `detailError`.
- **Usa código de** [`fetchReleaseSnapshot`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L91) (llama), [`fetchReleaseComponents`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L85) (llama).
- **Llamadas directas en el cuerpo** [`safeText`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L198), [`setSelectedReleaseId`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L200), [`setDetailLoading`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L201), [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L202), [`trim`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L202), [`safeVersionLabel`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L203), [`fetchReleaseSnapshot`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L205), [`fetchReleaseComponents`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L206), [`setReleaseSnapshot`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L208), [`settledValue`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L208), [`setReleaseComponents`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L209), [`settledError`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L210) y 1 más.
- **Lo usa** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L275) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L496) (llama).

#### [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L216) · callback React · asíncrona · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Obtiene o resuelve `All` para entregarlo al consumidor.

- **Entradas** `productKey?`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setError`, `setProducts`, `setSelectedProduct`, `setReleases`, `setArtifacts`, `setDeployRequests`, `setPromotionHistory`, `setBuildTimelineRows`, `setEnvConfigRows`, `setLocalNodes`, `setLocalSyncRequests` y 5 más.
- **Condiciones que evalúa** `aIndex o bIndex`, `nextNodes.length`, `firstError`, `nextReleases.length`.
- **Usa código de** [`fetchVersioningCatalog`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L67) (llama), [`fetchReleasesByProductEnv`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L77) (llama), [`fetchReleaseArtifacts`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L165) (llama), [`fetchDeployRequests`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L126) (llama), [`fetchPromotionHistory`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L138) (llama), [`fetchBuildTimeline`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L145) (llama), [`fetchEnvConfigVersions`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L546) (llama), [`fetchLocalArtifactNodes`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L175) (llama), [`fetchLocalArtifactSyncRequests`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L210) (llama), [`fetchWorkflowPackStatus`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L294) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L217), [`setError`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L218), [`fetchVersioningCatalog`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L220), [`sort`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L222), [`PRODUCT_PRIORITY.indexOf`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L223), [`localeCompare`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L228), [`safeText`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L228), [`sortedProducts.find`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L232), [`setProducts`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L234), [`setSelectedProduct`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L235), [`fetchReleasesByProductEnv`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L238), [`fetchReleaseArtifacts`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L239) y 25 más.
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L291) (llama), [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L292) (referencia), [`runAction`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L302) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L370) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L385) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L290) · callback de infraestructura · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AdminVersioningScreen`.

- **Llamadas directas en el cuerpo** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L291).

#### [`runAction`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L295) · callback React · asíncrona · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Maneja el valor de acción y coordina las acciones indicadas abajo.

- **Entradas** `key`, `action`, `successMessage`, `reloadAfter = valor por defecto`.
- **Retorno visible o tipo declarado** `null`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setBusyKey`, `setError`, `setOk`.
- **Condiciones que evalúa** `reloadAfter`.
- **Llamadas directas en el cuerpo** [`setBusyKey`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L296), [`setError`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L297), [`setOk`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L298), [`action`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L300), [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L302).
- **Lo usa** [`handleCreateDevRelease`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L331) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L457) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L554) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L568) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L647) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L667) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L687) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L729) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L746) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L784) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L796) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L808) (llama) y 4 más.

#### [`handlePreviewDevRelease`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L314) · callback React · asíncrona · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Maneja `Preview Dev Release` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setBusyKey`, `setError`, `setOk`, `setPreviewData`.
- **Usa código de** [`previewDevRelease`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L254) (llama).
- **Llamadas directas en el cuerpo** [`setBusyKey`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L315), [`setError`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L316), [`setOk`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L317), [`previewDevRelease`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L319), [`setPreviewData`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L320).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L442) (llama).

#### [`handleCreateDevRelease`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L330) · callback React · asíncrona · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Maneja `Create Dev Release` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setPreviewData`.
- **Usa código de** [`createDevRelease`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L264) (llama).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L331), [`createDevRelease`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L334), [`setPreviewData`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L339).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L449) (llama).

#### [`handleDrift`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L347) · callback React · asíncrona · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Maneja `Drift` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setBusyKey`, `setError`, `setOk`, `setDriftRows`.
- **Usa código de** [`fetchDrift`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L118) (llama).
- **Llamadas directas en el cuerpo** [`setBusyKey`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L348), [`setError`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L349), [`setOk`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L350), [`fetchDrift`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L352), [`setDriftRows`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L353).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L585) (llama).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L370) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L370).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L385) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`loadAll`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L385).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L418) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setTab`.
- **Llamadas directas en el cuerpo** [`setTab`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L418).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L442) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handlePreviewDevRelease`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L442).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L449) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleCreateDevRelease`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L449).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L456) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`syncWorkflowPack`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L302) (llama).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L457), [`syncWorkflowPack`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L459).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L496) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`loadReleaseDetails`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L496).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L553) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`validateEnvironmentContract`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L314) (llama).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L554), [`validateEnvironmentContract`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L556).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L567) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`validateEnvironmentContract`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L314) (llama).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L568), [`validateEnvironmentContract`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L570).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L585) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleDrift`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L585).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L621) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSelectedDeployEnv`.
- **Llamadas directas en el cuerpo** [`setSelectedDeployEnv`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L621).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L646) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`backfillReleaseArtifact`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L278) (llama).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L647), [`backfillReleaseArtifact`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L650), [`safeText`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L654).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L666) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`promoteRelease`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L365) (llama).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L667), [`promoteRelease`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L670).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L686) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`syncReleaseBranch`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L503) (llama).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L687), [`syncReleaseBranch`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L690).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L705) · callback JSX · asíncrona · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setBusyKey`, `setError`, `setOk`, `setMigrationGate`.
- **Usa código de** [`checkReleaseMigrations`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L327) (llama).
- **Llamadas directas en el cuerpo** [`setBusyKey`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L706), [`setError`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L707), [`setOk`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L708), [`checkReleaseMigrations`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L710), [`setMigrationGate`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L715).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L728) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`applyReleaseMigrations`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L343) (llama).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L729), [`applyReleaseMigrations`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L732).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L745) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`requestDeploy`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L390) (llama).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L746), [`requestDeploy`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L749).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L783) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`approveDeployRequest`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L415) (llama).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L784), [`approveDeployRequest`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L786).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L795) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`rejectDeployRequest`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L459) (llama).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L796), [`rejectDeployRequest`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L798).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L807) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`triggerDeployPipeline`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L475) (llama).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L808), [`triggerDeployPipeline`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L810).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L819) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`executeDeployRequest`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L434) (llama).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L820), [`executeDeployRequest`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L823), [`safeText`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L826).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L850) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setNodeDraft`.
- **Llamadas directas en el cuerpo** [`setNodeDraft`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L850).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L851) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setNodeDraft`.
- **Llamadas directas en el cuerpo** [`setNodeDraft`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L851).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L852) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setNodeDraft`.
- **Llamadas directas en el cuerpo** [`setNodeDraft`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L852).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L853) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setNodeDraft`.
- **Llamadas directas en el cuerpo** [`setNodeDraft`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L853).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L855) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`upsertLocalArtifactNode`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L185) (llama).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L856), [`safeText`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L857), [`upsertLocalArtifactNode`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L859), [`toLowerCase`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L860).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L878) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSelectedArtifactNode`.
- **Llamadas directas en el cuerpo** [`setSelectedArtifactNode`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L878).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L901) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`requestLocalArtifactSync`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L226) (llama).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L902), [`safeText`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L903), [`requestLocalArtifactSync`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L905), [`safeVersionLabel`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L909).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L944) · callback JSX · dentro de [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L115)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`cancelLocalArtifactSyncRequest`](../../../apps/referidos-android/src/shared/services/versioningService.ts#L564) (llama).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L945), [`cancelLocalArtifactSyncRequest`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L947).

#### [`styles`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L970) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L970).
- **Lo usa** [`InfoCard`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L103) (accede al módulo), [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L364) (accede al módulo).

### [`apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L1)

Plantilla compartida de listados admin con controles, métricas, estados vacíos, acción de refresco y render de filas provisto por cada pantalla.

**Superficie que exporta.** [`AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L49).

**Módulos que lo cargan.** [`AdminAnalyticsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L3) (importa), [`AdminDatosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L3) (importa), [`AdminErrorCatalogScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L3) (importa), [`AdminIssueEventDetailScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L4) (importa), [`AdminIssueEventsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L4) (importa), [`AdminIssuesScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L4) (importa), [`AdminLogsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L3) (importa), [`AdminNegociosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L3) (importa), [`AdminPromosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L3) (importa), [`AdminQRsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L3) (importa), [`AdminReportesScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L3) (importa), [`AdminSupportAgentsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L5) (importa), [`AdminSupportTicketsPanelScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L5) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/ui/BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx).

#### [`Metric`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L14) · tipo TypeScript

Describe la forma del contrato de `Metric`, con campos `label`, `value`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `label`, `value`.

#### [`FilterOption`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L19) · tipo TypeScript

Describe la forma del contrato de `Filter Option`, con campos `id`, `label`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `id`, `label`.

#### [`FilterGroup`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L24) · tipo TypeScript

Describe la forma del contrato de `Filter Group`, con campos `title`, `selectedId`, `options`, `onSelect`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `title`, `selectedId`, `options`, `onSelect`.

#### [`Props`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L31) · tipo TypeScript

Describe la forma del contrato de `Props`, con campos `title`, `subtitle`, `searchPlaceholder`, `query`, `onQueryChange`, `loading`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `title`, `subtitle`, `searchPlaceholder`, `query`, `onQueryChange`, `loading`, `refreshing`, `error`, `emptyText`, `metrics`, `filters`, `onRefresh`, `headerActions`, `footer` y 1 más.

#### [`AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L49) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `TextInput`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, subtitle, searchPlaceholder, query, onQueryChange, loading, refreshing, error, emptyText, metrics, filters, onRefresh, headerActions, footer, children}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `SectionCard`, `Pressable`, `Text`, `TextInput`, `View`, `BlockSkeleton`.
- **Usa código de** [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L9) (renderiza).
- **Llamadas directas en el cuerpo** [`metricRows.map`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L110), [`filters.map`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L120), [`filter.options.map`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L124).
- **Lo usa** [`AdminAnalyticsScreen`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L91) (renderiza), [`AdminDatosScreen`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L146) (renderiza), [`AdminErrorCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L80) (renderiza), [`AdminIssueEventDetailScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L67) (renderiza), [`AdminIssueEventsScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L107) (renderiza), [`AdminIssuesScreen`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L79) (renderiza), [`AdminLogsScreen`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L82) (renderiza), [`AdminNegociosScreen`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L110) (renderiza), [`AdminPromosScreen`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L140) (renderiza), [`AdminQRsScreen`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L73) (renderiza), [`AdminReportesScreen`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L139) (renderiza), [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L182) (renderiza) y 1 más.

#### [`metricRows`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L71) · cálculo memorizado · dentro de [`AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L49)

Función auxiliar de `AdminCollectionScreen` para `metric Rows`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`metrics.slice`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L71).
- **Lo usa** [`AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L108) (accede al módulo).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L129) · callback JSX · dentro de [`AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L49)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`filter.onSelect`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L129).

#### [`styles`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L157) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L157).
- **Lo usa** [`AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L75) (accede al módulo).

### [`apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts#L1)

Mantiene estilos para tarjetas, listas, indicadores y acciones de pantallas operativas Android. Cambiarlo puede afectar varias colecciones a la vez.

**Superficie que exporta.** [`adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts#L3).

**Módulos que lo cargan.** [`AdminAnalyticsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L6) (importa), [`AdminDatosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L9) (importa), [`AdminErrorCatalogScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L8) (importa), [`AdminIssueEventDetailScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L8) (importa), [`AdminIssueEventsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L14) (importa), [`AdminIssuesScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L10) (importa), [`AdminLogsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L8) (importa), [`AdminNegociosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L7) (importa), [`AdminPromosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L13) (importa), [`AdminQRsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L7) (importa), [`AdminReportesScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L9) (importa), [`AdminSupportAgentsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L13) (importa), [`AdminSupportTicketsPanelScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L16) (importa).

**Dependencias del archivo.** `react-native`.

#### [`adminRuntimeStyles`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts#L3) · variable de módulo · exportado

Declara `adminRuntimeStyles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/admin/components/adminRuntimeStyles.ts#L3).
- **Lo usa** [`AdminAnalyticsScreen`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L133) (accede al módulo), [`AdminDatosScreen`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L156) (accede al módulo), [`AdminErrorCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L108) (accede al módulo), [`AdminIssueEventDetailScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L77) (accede al módulo), [`AdminIssueEventsScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L122) (accede al módulo), [`AdminIssuesScreen`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L107) (accede al módulo), [`AdminLogsScreen`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L110) (accede al módulo), [`AdminNegociosScreen`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L126) (accede al módulo), [`AdminPromosScreen`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L165) (accede al módulo), [`AdminQRsScreen`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L100) (accede al módulo), [`AdminReportesScreen`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L161) (accede al módulo), [`AdminSupportAgentsScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportAgentsScreen.tsx#L196) (accede al módulo) y 1 más.

### [`apps/referidos-android/src/features/auth/AuthFlowScreen.tsx`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L1)

Ensambla formularios de login, registro, selección de rol, contraseña y estado visual del onboarding. Para cada paso renderiza el bloque correspondiente y pasa los handlers del motor. Mantiene presentación, mensajes, inputs y botones fuera de la lógica que modifica la sesión.

**Superficie que exporta.** [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L22).

**Módulos que lo cargan.** [`RootNavigator.tsx`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L3) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@referidos/domain`](../../../packages/domain/src/index.js), [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/services/systemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts), [`./hooks/useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts), [`./blocks/AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx), [`./blocks/OwnerProfileStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx), [`./blocks/BusinessDataStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/BusinessDataStepBlock.tsx), [`./blocks/AccountVerifyPromptStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AccountVerifyPromptStepBlock.tsx), [`./blocks/BusinessVerifyStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/BusinessVerifyStepBlock.tsx), [`./blocks/VerifyEmailStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/VerifyEmailStepBlock.tsx), [`./blocks/AccountVerifyMethodStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AccountVerifyMethodStepBlock.tsx).

#### [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L22) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `StatusBanners`, `Card`, `Text`, `PrimaryButton`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[newPassword, setNewPassword] mediante useState`, `[confirmPassword, setConfirmPassword] mediante useState`, `[appleEnabled, setAppleEnabled] mediante useState`.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `StatusBanners`, `Card`, `Text`, `PrimaryButton`, `SecondaryButton`, `LabeledInput`, `RoleButton`, `OwnerProfileStepBlock`, `BusinessDataStepBlock`, `AddressStepBlock`, `AccountVerifyPromptStepBlock`, `BusinessVerifyStepBlock`, `VerifyEmailStepBlock`, `AccountVerifyMethodStepBlock`.
- **Hooks que llama** `useAuthEngine`, `useState`, `useEffect`.
- **Usa código de** [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L82) (llama), [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`AUTH_STEPS`](../../../packages/domain/src/auth/authSteps.js#L1) (accede al módulo), [`AUTH_ROLES`](../../../packages/domain/src/auth/authRoles.js#L1) (accede al módulo), [`OwnerProfileStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L25) (renderiza), [`BusinessDataStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/BusinessDataStepBlock.tsx#L21) (renderiza), [`BUSINESS_CATEGORIES`](../../../packages/domain/src/catalogs/businessCategories.js#L1) (accede al módulo), [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127) (renderiza), [`AccountVerifyPromptStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AccountVerifyPromptStepBlock.tsx#L9) (renderiza), [`BusinessVerifyStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/BusinessVerifyStepBlock.tsx#L14) (renderiza) y 2 más.
- **Llamadas directas en el cuerpo** [`providers.includes`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L53), [`oauthButtons.map`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L80), [`BUSINESS_CATEGORIES.slice`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L216).
- **Lo usa** [`RootNavigator`](../../../apps/referidos-android/src/navigation/RootNavigator.tsx#L119) (pasa a component).

#### [`providers`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L29) · cálculo memorizado · dentro de [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L22)

Función auxiliar de `AuthFlowScreen` para `providers`.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L53) (accede al módulo).

#### [`oauthButtons`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L33) · cálculo memorizado · dentro de [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L22)

Función auxiliar de `AuthFlowScreen` para `oauth Buttons`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L34).
- **Lo usa** [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L80) (accede al módulo).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L57) · callback de infraestructura · dentro de [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L22)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AuthFlowScreen`.

- **Actualizaciones de estado o acciones** `setAppleEnabled`.
- **Condiciones que evalúa** `mounted`.
- **Usa código de** [`fetchSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L45) (llama).
- **Llamadas directas en el cuerpo** [`then`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L59), [`fetchSystemFeatureFlags`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L59), [`setAppleEnabled`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L60).

#### [`PrimaryButton.onPress`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L84) · callback JSX · dentro de [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L22)

Responde al evento de interfaz `PrimaryButton.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`engine.startOAuth`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L84).

#### [`PrimaryButton.onPress`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L90) · callback JSX · dentro de [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L22)

Responde al evento de interfaz `PrimaryButton.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setStep`.
- **Usa código de** [`AUTH_STEPS`](../../../packages/domain/src/auth/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`engine.setStep`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L90).

#### [`SecondaryButton.onPress`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L94) · callback JSX · dentro de [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L22)

Responde al evento de interfaz `SecondaryButton.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setStep`.
- **Usa código de** [`AUTH_STEPS`](../../../packages/domain/src/auth/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`engine.setStep`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L94).

#### [`SecondaryButton.onPress`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L111) · callback JSX · dentro de [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L22)

Responde al evento de interfaz `SecondaryButton.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setStep`.
- **Usa código de** [`AUTH_STEPS`](../../../packages/domain/src/auth/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`engine.setStep`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L111).

#### [`SecondaryButton.onPress`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L134) · callback JSX · dentro de [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L22)

Responde al evento de interfaz `SecondaryButton.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setStep`.
- **Usa código de** [`AUTH_STEPS`](../../../packages/domain/src/auth/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`engine.setStep`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L134).

#### [`SecondaryButton.onPress`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L167) · callback JSX · dentro de [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L22)

Responde al evento de interfaz `SecondaryButton.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setStep`.
- **Usa código de** [`AUTH_STEPS`](../../../packages/domain/src/auth/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`engine.setStep`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L167).

#### [`RoleButton.onPress`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L177) · callback JSX · dentro de [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L22)

Responde al evento de interfaz `RoleButton.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSelectedRole`.
- **Usa código de** [`AUTH_ROLES`](../../../packages/domain/src/auth/authRoles.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`engine.setSelectedRole`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L177).

#### [`RoleButton.onPress`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L182) · callback JSX · dentro de [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L22)

Responde al evento de interfaz `RoleButton.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSelectedRole`.
- **Usa código de** [`AUTH_ROLES`](../../../packages/domain/src/auth/authRoles.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`engine.setSelectedRole`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L182).

#### [`PrimaryButton.onPress`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L186) · callback JSX · dentro de [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L22)

Responde al evento de interfaz `PrimaryButton.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`engine.submitRoleSelection`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L186).

#### [`BusinessVerifyStepBlock.onContinue`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L279) · callback JSX · asíncrona · dentro de [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L22)

Responde al evento de interfaz `BusinessVerifyStepBlock.onContinue`. La lógica ocurre al interactuar con ese control.

- **Condiciones que evalúa** `ausencia de ok`.
- **Llamadas directas en el cuerpo** [`engine.submitBusinessVerificationData`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L280), [`engine.refreshOnboarding`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L282).

#### [`AccountVerifyMethodStepBlock.onSavePassword`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L315) · callback JSX · dentro de [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L22)

Responde al evento de interfaz `AccountVerifyMethodStepBlock.onSavePassword`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`engine.savePassword`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L315).

#### [`StatusBanners`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L348) · componente React

Monta `View`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{loading, error, info}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `View`, `Text`.
- **Lo usa** [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L73) (renderiza).

#### [`Card`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L366) · componente React

Monta `View`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, children}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `View`, `Text`.
- **Lo usa** [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L76) (renderiza).

#### [`LabeledInput`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L381) · componente React

Monta `View`, `Text`, `TextInput`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `props`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `View`, `Text`, `TextInput`.
- **Lo usa** [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L118) (renderiza).

#### [`PrimaryButton`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L391) · componente React

Monta `Pressable`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{label, onPress, disabled, loading}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Pressable`, `Text`.
- **Lo usa** [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L81) (renderiza).

#### [`SecondaryButton`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L413) · componente React

Monta `Pressable`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{label, onPress}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Pressable`, `Text`.
- **Lo usa** [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L92) (renderiza).

#### [`RoleButton`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L427) · componente React

Monta `Pressable`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{label, selected, onPress}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Pressable`, `Text`.
- **Lo usa** [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L174) (renderiza).

#### [`styles`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L446) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L446).
- **Lo usa** [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L72) (accede al módulo), [`StatusBanners`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L358) (accede al módulo), [`Card`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L374) (accede al módulo), [`LabeledInput`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L384) (accede al módulo), [`PrimaryButton`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L406) (accede al módulo), [`SecondaryButton`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L421) (accede al módulo), [`RoleButton`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L439) (accede al módulo).

### [`apps/referidos-android/src/features/auth/blocks/AccountVerifyMethodStepBlock.tsx`](../../../apps/referidos-android/src/features/auth/blocks/AccountVerifyMethodStepBlock.tsx#L1)

Muestra los métodos de verificación y calcula si se permite finalizar con el estado recibido. La decisión aparece junto al paso, con persistencia y refresco en el motor.

**Superficie que exporta.** [`AccountVerifyMethodStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AccountVerifyMethodStepBlock.tsx#L21).

**Módulos que lo cargan.** [`AuthFlowScreen.tsx`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L20) (importa).

**Dependencias del archivo.** `react`, `react-native`.

#### [`Props`](../../../apps/referidos-android/src/features/auth/blocks/AccountVerifyMethodStepBlock.tsx#L4) · tipo TypeScript

Describe la forma del contrato de `Props`, con campos `showPasswordSetup`, `showEmailVerification`, `hasPassword`, `hasMfa`, `emailConfirmed`, `newPassword`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `showPasswordSetup`, `showEmailVerification`, `hasPassword`, `hasMfa`, `emailConfirmed`, `newPassword`, `confirmPassword`, `loading`, `onNewPasswordChange`, `onConfirmPasswordChange`, `onSavePassword`, `onSendEmail`, `onFinalize`, `onSkip`.

#### [`AccountVerifyMethodStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AccountVerifyMethodStepBlock.tsx#L21) · componente React · exportación por defecto

Monta `View`, `Text`, `TextInput`, `Pressable`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{showPasswordSetup, showEmailVerification, hasPassword, hasMfa, emailConfirmed, newPassword, confirmPassword, loading, onNewPasswordChange, onConfirmPasswordChange, onSavePassword, onSendEmail, onFinalize, onSkip}`.
- **Retorno visible o tipo declarado** `booleano`, `JSX`.
- **Interfaz que monta** `View`, `Text`, `TextInput`, `Pressable`.
- **Condiciones que evalúa** `showEmailVerification y ausencia de emailConfirmed`, `showPasswordSetup y ausencia de hasPassword y ausencia de hasMfa`.
- **Lo usa** [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L304) (renderiza).

#### [`styles`](../../../apps/referidos-android/src/features/auth/blocks/AccountVerifyMethodStepBlock.tsx#L105) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/auth/blocks/AccountVerifyMethodStepBlock.tsx#L105).
- **Lo usa** [`AccountVerifyMethodStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AccountVerifyMethodStepBlock.tsx#L44) (accede al módulo).

### [`apps/referidos-android/src/features/auth/blocks/AccountVerifyPromptStepBlock.tsx`](../../../apps/referidos-android/src/features/auth/blocks/AccountVerifyPromptStepBlock.tsx#L1)

Ofrece empezar la verificación ahora o diferirla. El motor persiste el estado de la decisión y el bloque mantiene explícito el punto de entrada.

**Superficie que exporta.** [`AccountVerifyPromptStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AccountVerifyPromptStepBlock.tsx#L9).

**Módulos que lo cargan.** [`AuthFlowScreen.tsx`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L17) (importa).

**Dependencias del archivo.** `react`, `react-native`.

#### [`Props`](../../../apps/referidos-android/src/features/auth/blocks/AccountVerifyPromptStepBlock.tsx#L4) · tipo TypeScript

Describe la forma del contrato de `Props`, con campos `onVerifyNow`, `onSkip`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `onVerifyNow`, `onSkip`.

#### [`AccountVerifyPromptStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AccountVerifyPromptStepBlock.tsx#L9) · componente React · exportación por defecto

Monta `View`, `Text`, `Pressable`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onVerifyNow, onSkip}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `View`, `Text`, `Pressable`.
- **Lo usa** [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L264) (renderiza).

#### [`styles`](../../../apps/referidos-android/src/features/auth/blocks/AccountVerifyPromptStepBlock.tsx#L31) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/auth/blocks/AccountVerifyPromptStepBlock.tsx#L31).
- **Lo usa** [`AccountVerifyPromptStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AccountVerifyPromptStepBlock.tsx#L11) (accede al módulo).
