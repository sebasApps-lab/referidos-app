# Android · Pantallas por función y rol · 5 de 9

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L1)
- [`apps/referidos-android/src/features/auth/blocks/BusinessDataStepBlock.tsx`](../../../apps/referidos-android/src/features/auth/blocks/BusinessDataStepBlock.tsx#L1)
- [`apps/referidos-android/src/features/auth/blocks/BusinessVerifyStepBlock.tsx`](../../../apps/referidos-android/src/features/auth/blocks/BusinessVerifyStepBlock.tsx#L1)
- [`apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L1)
- [`apps/referidos-android/src/features/auth/blocks/VerifyEmailStepBlock.tsx`](../../../apps/referidos-android/src/features/auth/blocks/VerifyEmailStepBlock.tsx#L1)
- [`apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L1)
- [`apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L1)

## Símbolos y conexiones

### [`apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L1)

Resuelve dirección por mapa, permiso GPS, dirección buscada o selección manual. Carga provincias, cantones y parroquias según dependencia, solicita coordenadas de respaldo y completa con geocodificación inversa. Devuelve datos listos para que el motor guarde domicilio o sucursal.

**Superficie que exporta.** [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127).

**Módulos que lo cargan.** [`AuthFlowScreen.tsx`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L14) (importa).

**Dependencias del archivo.** `react`, `react-native`, `@react-native-community/geolocation`, `react-native-maps`, [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/store/modalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts).

#### [`FALLBACK_COORDS`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L18) · variable de módulo

Agrupa la configuración o catálogo de `FALLBACK COORDS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `latitude`, `longitude`.
- **Lo usa** [`FALLBACK_REGION`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L24) (referencia), [`mapCanConfirm`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L377) (accede al módulo).

#### [`FALLBACK_REGION`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L23) · variable de módulo

Agrupa la configuración o catálogo de `FALLBACK REGION` para que sus consumidores lean claves comunes.

- **Campos o contexto** `latitudeDelta`, `longitudeDelta`.
- **Lo usa** [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L153) (referencia).

#### [`CLOSE_REGION_DELTA`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L29) · variable de módulo

Agrupa la configuración o catálogo de `CLOSE REGION DELTA` para que sus consumidores lean claves comunes.

- **Campos o contexto** `latitudeDelta`, `longitudeDelta`.
- **Lo usa** [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L150) (referencia), [`useEffect · callback`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L352) (referencia), [`applyAddressResult`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L416) (referencia), [`requestLocation`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L495) (referencia), [`Pressable.onPress`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L665) (referencia).

#### [`AddressResult`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L34) · tipo TypeScript

Describe la forma del contrato de `Address Result`, con campos `id`, `lat`, `lng`, `display_label`, `label`, `provider`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `id`, `lat`, `lng`, `display_label`, `label`, `provider`, `raw_label`, `display_fields`.

#### [`TerritoryItem`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L46) · tipo TypeScript

Describe la forma del contrato de `Territory Item`, con campos `id`, `nombre`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `id`, `nombre`.

#### [`Props`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L51) · tipo TypeScript

Describe la forma del contrato de `Props`, con campos `role`, `loading`, `value`, `onChange`, `onSubmit`, `showError`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `role`, `loading`, `value`, `onChange`, `onSubmit`, `showError`.

#### [`parseStreetFromLabel`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L83) · función

Extrae o interpreta `Street From Label` de los argumentos, estado o datos de entrada.

- **Entradas** `label`.
- **Condiciones que evalúa** `ausencia de text`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L84), [`text.split`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L86).
- **Lo usa** [`applyAddressResult`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L386) (llama).

#### [`normalizeRegionTitle`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L90) · función

Normaliza `Region Title` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de raw`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L91), [`trim`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L91), [`join`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L93), [`map`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L93), [`filter`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L93), [`raw.split`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L93), [`toUpperCase`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L96), [`part.charAt`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L96), [`part.slice`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L96).
- **Lo usa** [`applyAddressResult`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L403) (llama).

#### [`buildDefaultSchedule`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L100) · función

Construye `Default Schedule` a partir de los datos del flujo.

- **Retorno visible o tipo declarado** `semanal`, `excepciones`.

#### [`toTimeInput`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L115) · función

Implementa `to Time Input` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Efectos y APIs** `replace`.
- **Condiciones que evalúa** `clean.length`.
- **Llamadas directas en el cuerpo** [`slice`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L116), [`replace`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L116), [`clean.slice`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L118).
- **Lo usa** [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L883) (llama), [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L891) (llama).

#### [`toHourMinute`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L121) · función

Implementa `to Hour Minute` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`, `fallback`.
- **Condiciones que evalúa** `test`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L122), [`test`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L123).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L185) (llama).

#### [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127) · componente React · exportación por defecto

Monta `View`, `MapView`, `Pressable`, `Text`, `TextInput`, `ScrollView`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{role, loading, value, onChange, onSubmit, showError}`.
- **Retorno visible o tipo declarado** `latitude`, `longitude`, `JSX`.
- **Estado o valores vinculados** `[phase, setPhase] mediante useState`, `[region, setRegion] mediante useState`, `[searchText, setSearchText] mediante useState`, `[searching, setSearching] mediante useState`, `[results, setResults] mediante useState`, `[selected, setSelected] mediante useState`, `[reverseLoading, setReverseLoading] mediante useState`, `[resolvedAddress, setResolvedAddress] mediante useState`, `openPicker mediante useModalStore`, `selector state.openPicker`, `[territoryLoading, setTerritoryLoading] mediante useState`, `[territoryError, setTerritoryError] mediante useState`, `[provincias, setProvincias] mediante useState`, `[cantones, setCantones] mediante useState` y 11 más.
- **Interfaz que monta** `View`, `MapView`, `Pressable`, `Text`, `TextInput`, `ScrollView`, `DetailRow`, `ScheduleRow`, `Modal`, `ModalCard`.
- **Hooks que llama** `useState`, `useModalStore`, `useEffect`.
- **Condiciones que evalúa** `Number.isFinite`.
- **Usa código de** [`useModalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L136), [`results.map`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L653).
- **Lo usa** [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L228) (renderiza).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L181) · callback de infraestructura · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AddressStepBlock`.

- **Actualizaciones de estado o acciones** `setHorarios`.
- **Condiciones que evalúa** `phase`, `role`.
- **Llamadas directas en el cuerpo** [`toHourMinute`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L185), [`onChange.setHorarios`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L193).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L206) · callback de infraestructura · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AddressStepBlock`.

- **Actualizaciones de estado o acciones** `setResolvedAddress`.
- **Condiciones que evalúa** `initialHasAddress`.
- **Llamadas directas en el cuerpo** [`setResolvedAddress`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L208).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L222) · callback de infraestructura · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AddressStepBlock`.

- **Actualizaciones de estado o acciones** `setTerritoryLoading`, `setTerritoryError`, `setProvincias`.
- **Condiciones que evalúa** `ausencia de mounted`, `ausencia de response.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setTerritoryLoading`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L225), [`setTerritoryError`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L226), [`mobileApi.address.fetchProvincias`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L227), [`setProvincias`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L231), [`filter`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L237), [`rows.map`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L237).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L250) · callback de infraestructura · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AddressStepBlock`.

- **Actualizaciones de estado o acciones** `setCantones`, `setCantonId`, `setParroquiaId`, `setTerritoryError`.
- **Condiciones que evalúa** `ausencia de provinciaId`, `value.cantonId`, `value.parroquiaId`, `ausencia de mounted`, `ausencia de response.ok`, `value.cantonId y ausencia de rows.some`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L252), [`setCantones`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L254), [`onChange.setCantonId`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L255), [`onChange.setParroquiaId`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L256), [`mobileApi.address.fetchCantones`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L263), [`setTerritoryError`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L267), [`filter`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L272), [`rows.map`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L272), [`rows.some`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L279).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L291) · callback de infraestructura · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AddressStepBlock`.

- **Actualizaciones de estado o acciones** `setParroquias`, `setParroquiaId`, `setTerritoryError`.
- **Condiciones que evalúa** `ausencia de cantonId`, `value.parroquiaId`, `ausencia de mounted`, `ausencia de response.ok`, `value.parroquiaId y ausencia de rows.some`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L293), [`setParroquias`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L295), [`onChange.setParroquiaId`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L296), [`mobileApi.address.fetchParroquias`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L303), [`setTerritoryError`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L307), [`filter`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L312), [`rows.map`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L312), [`rows.some`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L319).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L330) · callback de infraestructura · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AddressStepBlock`.

- **Actualizaciones de estado o acciones** `setLoadingStoredGps`, `setRegion`.
- **Condiciones que evalúa** `phase o hasCoords o selected`, `ausencia de mounted`, `ausencia de fallback.ok o ausencia de fallback.location`, `ausencia de Number.isFinite`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setLoadingStoredGps`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L341), [`mobileApi.address.getGpsFallback`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L342), [`setRegion`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L349).

#### [`selectedProvinciaName`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L362) · cálculo memorizado · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Procesa `ed Provincia Name` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`provincias.find`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L362).
- **Lo usa** [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L700) (referencia).

#### [`selectedCantonName`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L367) · cálculo memorizado · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Procesa `ed Canton Name` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`cantones.find`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L367).
- **Lo usa** [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L705) (referencia).

#### [`selectedParroquiaName`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L372) · cálculo memorizado · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Procesa `ed Parroquia Name` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`parroquias.find`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L372).
- **Lo usa** [`applyAddressResult`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L397) (referencia), [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L711) (referencia).

#### [`mapCanConfirm`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L376) · cálculo memorizado · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Construye `Can Confirm` a partir de los datos del flujo.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L683) (referencia).

#### [`applyAddressResult`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L383) · callback React · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Aplica o guarda `Address Result` para que el estado refleje la operación.

- **Entradas** `address`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setCalles`, `setCiudad`, `setSector`, `setProvinciaId`, `setCantonId`, `setParroquiaId`, `setParroquia`, `setLat`, `setLng`, `setResolvedAddress`, `setRegion`, `setPhase`.
- **Llamadas directas en el cuerpo** [`parseStreetFromLabel`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L386), [`trim`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L393), [`onChange.setCalles`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L402), [`onChange.setCiudad`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L403), [`normalizeRegionTitle`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L403), [`onChange.setSector`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L404), [`onChange.setProvinciaId`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L405), [`onChange.setCantonId`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L406), [`onChange.setParroquiaId`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L407), [`onChange.setParroquia`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L408), [`onChange.setLat`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L409), [`onChange.setLng`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L410) y 3 más.
- **Lo usa** [`resolveCenterAddress`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L471) (llama).

#### [`handleSearch`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L432) · callback React · asíncrona · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSearching`, `setResults`.
- **Condiciones que evalúa** `query.length`, `ausencia de response.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L433), [`showError`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L435), [`setSearching`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L438), [`mobileApi.address.search`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L439), [`setResults`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L447).
- **Lo usa** [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L645) (pasa a onPress).

#### [`resolveCenterAddress`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L453) · callback React · asíncrona · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setReverseLoading`.
- **Condiciones que evalúa** `ausencia de response.ok o ausencia de response.data`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setReverseLoading`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L454), [`mobileApi.address.reverse`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L457), [`showError`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L462), [`applyAddressResult`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L471).
- **Lo usa** [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L682) (pasa a onPress).

#### [`requestLocation`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L474) · callback React · asíncrona · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setUnavailableModal`, `setAskLocationModal`, `setRegion`, `setDeniedModal`.
- **Condiciones que evalúa** `Platform.OS`, `ausencia de hasPermission`, `geoError.code`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setUnavailableModal`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L476), [`PermissionsAndroid.check`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L480), [`setAskLocationModal`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L484), [`Geolocation.getCurrentPosition`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L488), [`setRegion`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L492), [`mobileApi.address.saveGpsFallback`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L497), [`setDeniedModal`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L500).
- **Lo usa** [`handleGrantLocation`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L516) (llama), [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L628) (pasa a onPress).

#### [`handleGrantLocation`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L507) · callback React · asíncrona · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Atiende `ModalCard.onPrimary` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `ModalCard.onPrimary`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setAskLocationModal`, `setDeniedModal`.
- **Condiciones que evalúa** `result`.
- **Llamadas directas en el cuerpo** [`setAskLocationModal`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L508), [`PermissionsAndroid.request`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L509), [`setDeniedModal`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L513), [`requestLocation`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L516).
- **Lo usa** [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L818) (pasa a onPrimary).

#### [`openProvinciaPicker`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L519) · callback React · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `ausencia de provincias.length`.
- **Llamadas directas en el cuerpo** [`showError`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L521), [`openPicker`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L524), [`provincias.map`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L528).
- **Lo usa** [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L718) (pasa a onPress).

#### [`onSelect`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L534) · función · dentro de [`openProvinciaPicker`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L519)

Maneja `Select` y coordina las acciones indicadas abajo.

- **Entradas** `id`.
- **Actualizaciones de estado o acciones** `setProvinciaId`, `setCantonId`, `setParroquiaId`.
- **Llamadas directas en el cuerpo** [`onChange.setProvinciaId`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L536), [`onChange.setCantonId`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L537), [`onChange.setParroquiaId`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L538).

#### [`openCantonPicker`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L543) · callback React · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `ausencia de value.provinciaId`, `ausencia de cantones.length`.
- **Llamadas directas en el cuerpo** [`showError`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L545), [`openPicker`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L552), [`cantones.map`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L556).
- **Lo usa** [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L728) (pasa a onPress).

#### [`onSelect`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L562) · función · dentro de [`openCantonPicker`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L543)

Maneja `Select` y coordina las acciones indicadas abajo.

- **Entradas** `id`.
- **Actualizaciones de estado o acciones** `setCantonId`, `setParroquiaId`.
- **Llamadas directas en el cuerpo** [`onChange.setCantonId`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L564), [`onChange.setParroquiaId`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L565).

#### [`openParroquiaPicker`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L570) · callback React · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `ausencia de value.cantonId`, `ausencia de parroquias.length`.
- **Llamadas directas en el cuerpo** [`showError`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L572), [`openPicker`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L579), [`parroquias.map`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L583).
- **Lo usa** [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L741) (pasa a onPress).

#### [`onSelect`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L589) · función · dentro de [`openParroquiaPicker`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L570)

Maneja `Select` y coordina las acciones indicadas abajo.

- **Entradas** `id`.
- **Actualizaciones de estado o acciones** `setParroquiaId`, `setParroquia`.
- **Llamadas directas en el cuerpo** [`onChange.setParroquiaId`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L590), [`parroquias.find`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L591), [`onChange.setParroquia`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L592).

#### [`handleSubmitDetails`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L597) · callback React · asíncrona · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `role`, `ausencia de anyDayEnabled`, `ausencia de trim`.
- **Llamadas directas en el cuerpo** [`showError`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L601), [`trim`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L605), [`onSubmit`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L609).
- **Lo usa** [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L802) (pasa a onPress).

#### [`MapView.onRegionChangeComplete`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L621) · callback JSX · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Responde al evento de interfaz `MapView.onRegionChangeComplete`. La lógica ocurre al interactuar con ese control.

- **Entradas** `next`.
- **Actualizaciones de estado o acciones** `setRegion`.
- **Llamadas directas en el cuerpo** [`setRegion`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L621).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L659) · callback JSX · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSelected`, `setRegion`.
- **Condiciones que evalúa** `Number.isFinite`.
- **Llamadas directas en el cuerpo** [`setSelected`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L660), [`setRegion`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L662).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L755) · callback JSX · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `text`.
- **Actualizaciones de estado o acciones** `setParroquia`, `setParroquiaId`.
- **Condiciones que evalúa** `value.parroquiaId`.
- **Llamadas directas en el cuerpo** [`onChange.setParroquia`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L756), [`onChange.setParroquiaId`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L757).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L787) · callback JSX · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setIsSucursalPrincipal`.
- **Llamadas directas en el cuerpo** [`onChange.setIsSucursalPrincipal`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L787).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L798) · callback JSX · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setPhase`.
- **Llamadas directas en el cuerpo** [`setPhase`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L798).

#### [`Modal.onRequestClose`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L812) · callback JSX · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Responde al evento de interfaz `Modal.onRequestClose`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setAskLocationModal`.
- **Llamadas directas en el cuerpo** [`setAskLocationModal`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L812).

#### [`ModalCard.onSecondary`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L819) · callback JSX · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Responde al evento de interfaz `ModalCard.onSecondary`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setAskLocationModal`.
- **Llamadas directas en el cuerpo** [`setAskLocationModal`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L819).

#### [`Modal.onRequestClose`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L823) · callback JSX · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Responde al evento de interfaz `Modal.onRequestClose`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setDeniedModal`.
- **Llamadas directas en el cuerpo** [`setDeniedModal`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L823).

#### [`ModalCard.onPrimary`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L828) · callback JSX · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Responde al evento de interfaz `ModalCard.onPrimary`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setDeniedModal`.
- **Llamadas directas en el cuerpo** [`setDeniedModal`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L828).

#### [`Modal.onRequestClose`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L832) · callback JSX · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Responde al evento de interfaz `Modal.onRequestClose`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setUnavailableModal`.
- **Llamadas directas en el cuerpo** [`setUnavailableModal`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L832).

#### [`ModalCard.onPrimary`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L837) · callback JSX · dentro de [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L127)

Responde al evento de interfaz `ModalCard.onPrimary`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setUnavailableModal`.
- **Llamadas directas en el cuerpo** [`setUnavailableModal`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L837).

#### [`DetailRow`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L844) · componente React

Monta `View`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{label, value}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `View`, `Text`.
- **Lo usa** [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L698) (renderiza).

#### [`ScheduleRow`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L855) · componente React

Monta `View`, `Pressable`, `Text`, `TextInput`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{label, enabled, onToggle, open, close, setOpen, setClose}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `View`, `Pressable`, `Text`, `TextInput`.
- **Lo usa** [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L768) (renderiza).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L874) · callback JSX · dentro de [`ScheduleRow`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L855)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onToggle`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L874).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L883) · callback JSX · dentro de [`ScheduleRow`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L855)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `v`.
- **Actualizaciones de estado o acciones** `setOpen`.
- **Llamadas directas en el cuerpo** [`setOpen`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L883), [`toTimeInput`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L883).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L891) · callback JSX · dentro de [`ScheduleRow`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L855)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `v`.
- **Actualizaciones de estado o acciones** `setClose`.
- **Llamadas directas en el cuerpo** [`setClose`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L891), [`toTimeInput`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L891).

#### [`ModalCard`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L899) · componente React

Monta `View`, `Text`, `Pressable`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, text, primaryLabel, secondaryLabel, onPrimary, onSecondary}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `View`, `Text`, `Pressable`.
- **Lo usa** [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L813) (renderiza).

#### [`styles`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L934) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L934).
- **Lo usa** [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L613) (accede al módulo), [`DetailRow`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L846) (accede al módulo), [`ScheduleRow`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L873) (accede al módulo), [`ModalCard`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L915) (accede al módulo).

### [`apps/referidos-android/src/features/auth/blocks/BusinessDataStepBlock.tsx`](../../../apps/referidos-android/src/features/auth/blocks/BusinessDataStepBlock.tsx#L1)

Pide los datos del negocio y permite escoger categoría. Recibe estado/acciones para que la categoría capturada y la que persiste el motor sean la misma.

**Superficie que exporta.** [`BusinessDataStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/BusinessDataStepBlock.tsx#L21).

**Módulos que lo cargan.** [`AuthFlowScreen.tsx`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L16) (importa).

**Dependencias del archivo.** `react`, `react-native`.

#### [`Category`](../../../apps/referidos-android/src/features/auth/blocks/BusinessDataStepBlock.tsx#L4) · tipo TypeScript

Describe la forma del contrato de `Category`, con campos `id`, `label`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `id`, `label`.

#### [`Props`](../../../apps/referidos-android/src/features/auth/blocks/BusinessDataStepBlock.tsx#L9) · tipo TypeScript

Describe la forma del contrato de `Props`, con campos `nombreNegocio`, `categoriaNegocio`, `ruc`, `categories`, `loading`, `onNombreNegocioChange`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `nombreNegocio`, `categoriaNegocio`, `ruc`, `categories`, `loading`, `onNombreNegocioChange`, `onCategoriaChange`, `onRucChange`, `onSubmit`.

#### [`BusinessDataStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/BusinessDataStepBlock.tsx#L21) · componente React · exportación por defecto

Monta `View`, `Text`, `TextInput`, `Pressable`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{nombreNegocio, categoriaNegocio, ruc, categories, loading, onNombreNegocioChange, onCategoriaChange, onRucChange, onSubmit}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `View`, `Text`, `TextInput`, `Pressable`.
- **Llamadas directas en el cuerpo** [`categories.map`](../../../apps/referidos-android/src/features/auth/blocks/BusinessDataStepBlock.tsx#L47).
- **Lo usa** [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L212) (renderiza).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/auth/blocks/BusinessDataStepBlock.tsx#L50) · callback JSX · dentro de [`BusinessDataStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/BusinessDataStepBlock.tsx#L21)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onCategoriaChange`](../../../apps/referidos-android/src/features/auth/blocks/BusinessDataStepBlock.tsx#L50).

#### [`styles`](../../../apps/referidos-android/src/features/auth/blocks/BusinessDataStepBlock.tsx#L72) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/auth/blocks/BusinessDataStepBlock.tsx#L72).
- **Lo usa** [`BusinessDataStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/BusinessDataStepBlock.tsx#L33) (accede al módulo).

### [`apps/referidos-android/src/features/auth/blocks/BusinessVerifyStepBlock.tsx`](../../../apps/referidos-android/src/features/auth/blocks/BusinessVerifyStepBlock.tsx#L1)

Reúne datos para la verificación de negocio. Usa acciones del contenedor para enviar y avanzar cuando los datos son aceptados. Está separado del registro inicial porque se trata de una etapa con requisitos propios.

**Superficie que exporta.** [`BusinessVerifyStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/BusinessVerifyStepBlock.tsx#L14).

**Módulos que lo cargan.** [`AuthFlowScreen.tsx`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L18) (importa).

**Dependencias del archivo.** `react`, `react-native`.

#### [`Props`](../../../apps/referidos-android/src/features/auth/blocks/BusinessVerifyStepBlock.tsx#L4) · tipo TypeScript

Describe la forma del contrato de `Props`, con campos `ruc`, `telefono`, `loading`, `onRucChange`, `onTelefonoChange`, `onContinue`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `ruc`, `telefono`, `loading`, `onRucChange`, `onTelefonoChange`, `onContinue`, `onSkip`.

#### [`BusinessVerifyStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/BusinessVerifyStepBlock.tsx#L14) · componente React · exportación por defecto

Monta `View`, `Text`, `TextInput`, `Pressable`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{ruc, telefono, loading, onRucChange, onTelefonoChange, onContinue, onSkip}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `View`, `Text`, `TextInput`, `Pressable`.
- **Lo usa** [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L273) (renderiza).

#### [`styles`](../../../apps/referidos-android/src/features/auth/blocks/BusinessVerifyStepBlock.tsx#L52) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/auth/blocks/BusinessVerifyStepBlock.tsx#L52).
- **Lo usa** [`BusinessVerifyStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/BusinessVerifyStepBlock.tsx#L24) (accede al módulo).

### [`apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L1)

Presenta los campos personales del titular, incluidos datos de nombre, nacimiento y contacto. El motor valida y persiste esos datos, lo que permite usar el bloque en el paso elegido por las reglas del flujo.

**Superficie que exporta.** [`OwnerProfileStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L25).

**Módulos que lo cargan.** [`AuthFlowScreen.tsx`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L15) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@referidos/domain`](../../../packages/domain/src/index.js).

#### [`GENDER_OPTIONS`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L5) · variable de módulo

Conserva la lista de `GENDER OPTIONS` usada por el módulo.

- **Lo usa** [`OwnerProfileStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L55) (accede al módulo).

#### [`Props`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L12) · tipo TypeScript

Describe la forma del contrato de `Props`, con campos `nombre`, `apellido`, `genero`, `fechaNacimiento`, `loading`, `onNombreChange`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `nombre`, `apellido`, `genero`, `fechaNacimiento`, `loading`, `onNombreChange`, `onApellidoChange`, `onGeneroChange`, `onFechaNacimientoChange`, `onSubmit`.

#### [`OwnerProfileStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L25) · componente React · exportación por defecto

Monta `View`, `FieldLabel`, `TextInput`, `Pressable`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{nombre, apellido, genero, fechaNacimiento, loading, onNombreChange, onApellidoChange, onGeneroChange, onFechaNacimientoChange, onSubmit}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `View`, `FieldLabel`, `TextInput`, `Pressable`, `Text`.
- **Usa código de** [`formatBirthdateInput`](../../../packages/domain/src/normalizers/userProfile.js#L36) (llama).
- **Llamadas directas en el cuerpo** [`GENDER_OPTIONS.map`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L55), [`formatBirthdateInput`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L75).
- **Lo usa** [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L195) (renderiza).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L42) · callback JSX · dentro de [`OwnerProfileStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L25)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `text`.
- **Usa código de** [`normalizeUserName`](../../../packages/domain/src/normalizers/userProfile.js#L28) (llama).
- **Llamadas directas en el cuerpo** [`onNombreChange`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L42), [`normalizeUserName`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L42).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L49) · callback JSX · dentro de [`OwnerProfileStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L25)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `text`.
- **Usa código de** [`normalizeUserName`](../../../packages/domain/src/normalizers/userProfile.js#L28) (llama).
- **Llamadas directas en el cuerpo** [`onApellidoChange`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L49), [`normalizeUserName`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L49).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L58) · callback JSX · dentro de [`OwnerProfileStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L25)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onGeneroChange`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L58).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L76) · callback JSX · dentro de [`OwnerProfileStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L25)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `text`.
- **Usa código de** [`formatBirthdateInput`](../../../packages/domain/src/normalizers/userProfile.js#L36) (llama).
- **Llamadas directas en el cuerpo** [`onFechaNacimientoChange`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L76), [`formatBirthdateInput`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L76).

#### [`FieldLabel`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L94) · componente React

Monta `Text`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{text}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Text`.
- **Lo usa** [`OwnerProfileStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L39) (renderiza).

#### [`styles`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L98) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L98).
- **Lo usa** [`OwnerProfileStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L38) (accede al módulo), [`FieldLabel`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L95) (accede al módulo).

### [`apps/referidos-android/src/features/auth/blocks/VerifyEmailStepBlock.tsx`](../../../apps/referidos-android/src/features/auth/blocks/VerifyEmailStepBlock.tsx#L1)

Guía el paso de confirmación de correo, ofrece reenviar y volver a comprobar. Permite que el motor espere el evento externo de Auth sin mezclarlo con el formulario de registro.

**Superficie que exporta.** [`VerifyEmailStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/VerifyEmailStepBlock.tsx#L13).

**Módulos que lo cargan.** [`AuthFlowScreen.tsx`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L19) (importa).

**Dependencias del archivo.** `react`, `react-native`.

#### [`Props`](../../../apps/referidos-android/src/features/auth/blocks/VerifyEmailStepBlock.tsx#L4) · tipo TypeScript

Describe la forma del contrato de `Props`, con campos `emailText`, `emailConfirmed`, `loading`, `onSendEmail`, `onRefresh`, `onSkip`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `emailText`, `emailConfirmed`, `loading`, `onSendEmail`, `onRefresh`, `onSkip`.

#### [`VerifyEmailStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/VerifyEmailStepBlock.tsx#L13) · componente React · exportación por defecto

Monta `View`, `Text`, `Pressable`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{emailText, emailConfirmed, loading, onSendEmail, onRefresh, onSkip}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `View`, `Text`, `Pressable`.
- **Lo usa** [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L291) (renderiza).

#### [`styles`](../../../apps/referidos-android/src/features/auth/blocks/VerifyEmailStepBlock.tsx#L43) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/auth/blocks/VerifyEmailStepBlock.tsx#L43).
- **Lo usa** [`VerifyEmailStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/VerifyEmailStepBlock.tsx#L22) (accede al módulo).

### [`apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L1)

Mantiene el borrador de cada paso y lo hidrata desde onboarding. Interpreta el callback de OAuth, intercambia el código PKCE, vuelve a cargar sesión y usa reglas de dominio para elegir registro o verificación. Gestiona login, creación de cuenta, datos de dueño y negocio, persistencia de dirección, estados de verificación y reenvío de correo. Persiste por etapas para que el flujo pueda volver a abrirse con datos parciales.

**Superficie que exporta.** [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L82).

**Módulos que lo cargan.** [`AuthFlowScreen.tsx`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L13) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@referidos/domain`](../../../packages/domain/src/index.js), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/store/appStore`](../../../apps/referidos-android/src/shared/store/appStore.ts), [`@shared/constants/env`](../../../apps/referidos-android/src/shared/constants/env.ts).

#### [`DEFAULT_HORARIOS`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L21) · variable de módulo

Agrupa la configuración o catálogo de `DEFAULT HORARIOS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `semanal`, `excepciones`.
- **Lo usa** [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L111) (referencia), [`submitAddressData`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L735) (referencia).

#### [`parseAuthCallbackParams`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L34) · función

Extrae los campos de retorno del enlace de Auth para que el motor complete el intercambio de sesión según la forma recibida.

- **Entradas** `url`.
- **Retorno visible o tipo declarado** `null`, `code`, `accessToken`, `refreshToken`, `error`.
- **Condiciones que evalúa** `ausencia de safeUrl`, `ausencia de code y ausencia de accessToken y ausencia de refreshToken y ausencia de error`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L35), [`safeUrl.indexOf`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L38), [`safeUrl.slice`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L42), [`query.get`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L48), [`hash.get`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L48).
- **Lo usa** [`completeOAuthCallback`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L127) (llama).

#### [`getCurrentUserRow`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L63) · función · asíncrona

Consulta o invoca tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `ausencia de authUserId`, `error o ausencia de data`.
- **Contrato de datos** Auth `getSession` en [`useAuthEngine.ts:64`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L64), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`useAuthEngine.ts:68`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L68), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`useAuthEngine.ts:68`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L68).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.getSession`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L64), [`maybeSingle`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L68), [`eq`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L68), [`select`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L68), [`supabase.from`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L68).
- **Lo usa** [`submitOwnerProfile`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L528) (llama), [`submitBusinessData`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L562) (llama), [`submitAddressData`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L631) (llama), [`markVerificationStatus`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L788) (llama), [`submitBusinessVerificationData`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L872) (llama), [`savePassword`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L947) (llama).

#### [`getCurrentAuthEmail`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L77) · función · asíncrona

Opera sobre Auth `getSession`. El resultado se adapta al contrato del consumidor.

- **Contrato de datos** Auth `getSession` en [`useAuthEngine.ts:78`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L78).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.getSession`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L78).
- **Lo usa** [`sendVerificationEmail`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L831) (llama).

#### [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L82) · hook React · exportado

Orquesta los pasos de autenticación móvil y estado de formulario. Usa reglas del dominio compartido y llama al runtime para registro, onboarding y datos de la sesión.

- **Retorno visible o tipo declarado** `step`, `setStep`, `loading`, `error`, `setError`, `info`, `onboarding`, `role`, `allowAccess`, `reasons`, `email`, `setEmail`, `password`, `setPassword`, `passwordConfirm`, `setPasswordConfirm`, `selectedRole`, `setSelectedRole` y 52 más.
- **Estado o valores vinculados** `bootStatus mediante useAppStore`, `selector state.bootStatus`, `onboarding mediante useAppStore`, `selector state.onboarding`, `role mediante useAppStore`, `selector state.role`, `allowAccess mediante useAppStore`, `selector state.allowAccess`, `reasons mediante useAppStore`, `selector state.reasons`, `bootstrapAuth mediante useAppStore`, `selector state.bootstrapAuth`, `[step, setStep] mediante useState`, `[loading, setLoading] mediante useState` y 26 más.
- **Hooks que llama** `useAppStore`, `useState`, `useRef`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37) (llama), [`AUTH_STEPS`](../../../packages/domain/src/auth/authSteps.js#L1) (accede al módulo).
- **Lo usa** [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L23) (llama).

#### [`completeOAuthCallback`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L126) · callback React · asíncrona · dentro de [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L82)

Opera sobre Auth `exchangeCodeForSession` y coordina las demás operaciones de esta ficha.

- **Entradas** `url`.
- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setStep`, `setLoading`, `setError`, `setInfo`, `setSession`.
- **Condiciones que evalúa** `ausencia de parsed`, `handledOAuthUrlsRef.current.has`, `parsed.error`, `parsed.code`, `exchangeError`, `parsed.accessToken y parsed.refreshToken`, `sessionError`.
- **Contrato de datos** Auth `exchangeCodeForSession` en [`useAuthEngine.ts:145`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L145), Auth `setSession` en [`useAuthEngine.ts:157`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L157).
- **Usa código de** [`AUTH_STEPS`](../../../packages/domain/src/auth/authSteps.js#L1) (accede al módulo), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`parseAuthCallbackParams`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L127), [`handledOAuthUrlsRef.current.has`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L130), [`handledOAuthUrlsRef.current.add`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L131), [`setStep`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L133), [`setLoading`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L134), [`setError`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L135), [`setInfo`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L136), [`supabase.auth.exchangeCodeForSession`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L145), [`bootstrapAuth`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L152), [`supabase.auth.setSession`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L157).
- **Lo usa** [`handleInitialUrl`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L318) (llama), [`addEventListener · callback`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L328) (llama), [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L335) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L181) · callback de infraestructura · dentro de [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L82)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useAuthEngine`.

- **Actualizaciones de estado o acciones** `setEmail`, `setNombre`, `setApellido`, `setGenero`, `setFechaNacimiento`, `setTelefono`, `setNombreNegocio`, `setCategoriaNegocio`, `setRuc`, `setCalles`, `setCiudad`, `setSector` y 8 más.
- **Condiciones que evalúa** `ausencia de onboarding.ok`, `ausencia de email y usuarioRow.email`, `ausencia de nombre y usuarioRow.nombre`, `ausencia de apellido y usuarioRow.apellido`, `genero o ausencia de genero y usuarioRow.genero`, `ausencia de fechaNacimiento y usuarioRow.fecha_nacimiento`, `ausencia de telefono y usuarioRow.telefono`, `ausencia de nombreNegocio y negocioRow.nombre` y 13 más.
- **Usa código de** [`formatBirthdateForInput`](../../../packages/domain/src/normalizers/userProfile.js#L127) (llama).
- **Llamadas directas en el cuerpo** [`setEmail`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L194), [`setNombre`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L195), [`setApellido`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L196), [`setGenero`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L198), [`setFechaNacimiento`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L201), [`formatBirthdateForInput`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L201), [`setTelefono`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L203), [`setNombreNegocio`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L205), [`setCategoriaNegocio`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L207), [`setRuc`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L209), [`setCalles`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L211), [`setCiudad`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L212) y 9 más.

#### [`shouldAutoValidateRegistration`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L253) · cálculo memorizado · dentro de [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L82)

Comprueba `Auto Validate Registration` para decidir si se admite o continúa la operación.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `allowAccess`, `list.length`.
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L287) (referencia), [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L309) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L260) · callback de infraestructura · dentro de [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L82)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useAuthEngine`.

- **Actualizaciones de estado o acciones** `setStep`.
- **Condiciones que evalúa** `bootStatus`, `ausencia de onboarding.ok`, `allowAccess`, `verificationStep`.
- **Usa código de** [`AUTH_STEPS`](../../../packages/domain/src/auth/authSteps.js#L1) (accede al módulo), [`resolveVerificationStep`](../../../packages/domain/src/auth/flowRules.js#L75) (llama), [`resolveRegistrationStep`](../../../packages/domain/src/auth/flowRules.js#L31) (llama).
- **Llamadas directas en el cuerpo** [`setStep`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L263), [`resolveVerificationStep`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L268), [`resolveRegistrationStep`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L279).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L286) · callback de infraestructura · dentro de [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L82)

Opera sobre Auth `runValidateRegistration`. El resultado se adapta al contrato del consumidor.

- **Actualizaciones de estado o acciones** `setLoading`, `setInfo`, `setError`.
- **Condiciones que evalúa** `ausencia de shouldAutoValidateRegistration`, `cancelled`, `ausencia de result.ok`, `result.valid`.
- **Contrato de datos** Auth `runValidateRegistration` en [`useAuthEngine.ts:293`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L293).
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L291), [`setInfo`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L292), [`mobileApi.auth.runValidateRegistration`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L293), [`bootstrapAuth`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L295), [`setError`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L297).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L311) · callback de infraestructura · dentro de [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L82)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useAuthEngine`.

- **Efectos y APIs** `Linking.addEventListener`.
- **Llamadas directas en el cuerpo** [`handleInitialUrl`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L324), [`Linking.addEventListener`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L326), [`subscription.remove`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L333).

#### [`handleInitialUrl`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L314) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L311)

Maneja `Initial Url` y coordina las acciones indicadas abajo.

- **Efectos y APIs** `Linking.getInitialURL`.
- **Condiciones que evalúa** `ausencia de isMounted o ausencia de initialUrl`.
- **Llamadas directas en el cuerpo** [`Linking.getInitialURL`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L316), [`completeOAuthCallback`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L318).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L324) (llama).

#### [`addEventListener · callback`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L326) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L311)

Recibe eventos de la suscripción o listener registrado por `useEffect · callback`.

- **Entradas** `event`.
- **Condiciones que evalúa** `ausencia de event.url`.
- **Llamadas directas en el cuerpo** [`completeOAuthCallback`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L328).

#### [`submitLogin`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L337) · callback React · asíncrona · dentro de [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L82)

Opera sobre Auth `signInWithPassword`. El resultado se adapta al contrato del consumidor.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`, `setInfo`, `setLoading`.
- **Condiciones que evalúa** `ausencia de validateEmail`, `ausencia de password`, `signInError`.
- **Contrato de datos** Auth `signInWithPassword` en [`useAuthEngine.ts:349`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L349).
- **Usa código de** [`validateEmail`](../../../packages/domain/src/validators/index.js#L6) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L338), [`setInfo`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L339), [`validateEmail`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L340), [`setLoading`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L348), [`supabase.auth.signInWithPassword`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L349), [`email.trim`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L350), [`bootstrapAuth`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L358).
- **Lo usa** [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L1066) (referencia).

#### [`submitRegister`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L363) · callback React · asíncrona · dentro de [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L82)

Opera sobre Auth `signUp`. El resultado se adapta al contrato del consumidor.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`, `setInfo`, `setLoading`.
- **Condiciones que evalúa** `ausencia de validateEmail`, `password.length`, `ausencia de test`, `password`, `signUpError`.
- **Contrato de datos** Auth `signUp` en [`useAuthEngine.ts:384`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L384).
- **Usa código de** [`validateEmail`](../../../packages/domain/src/validators/index.js#L6) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L364), [`setInfo`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L365), [`validateEmail`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L366), [`test`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L374), [`setLoading`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L383), [`supabase.auth.signUp`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L384), [`email.trim`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L385), [`bootstrapAuth`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L393).
- **Lo usa** [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L1067) (referencia).

#### [`startOAuth`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L399) · callback React · asíncrona · dentro de [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L82)

Opera sobre Auth `signInWithOAuth`. El resultado se adapta al contrato del consumidor.

- **Entradas** `provider = valor por defecto`.
- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`, `setInfo`, `setLoading`, `setStep`.
- **Efectos y APIs** `Linking.canOpenURL`, `Linking.openURL`.
- **Condiciones que evalúa** `oauthError`, `ausencia de data.url`, `ausencia de canOpen`.
- **Contrato de datos** Auth `signInWithOAuth` en [`useAuthEngine.ts:407`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L407).
- **Usa código de** [`AUTH_STEPS`](../../../packages/domain/src/auth/authSteps.js#L1) (accede al módulo), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo), [`MOBILE_ENV`](../../../apps/referidos-android/src/shared/constants/env.ts#L37) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L402), [`setInfo`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L403), [`setLoading`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L404), [`setStep`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L405), [`supabase.auth.signInWithOAuth`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L407), [`Linking.canOpenURL`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L424), [`Linking.openURL`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L430).
- **Lo usa** [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L1068) (referencia).

#### [`submitRoleSelection`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L444) · callback React · asíncrona · dentro de [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L82)

Consulta o invoca tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Entradas** `roleValue`.
- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`, `setInfo`, `setLoading`, `setSelectedRole`.
- **Condiciones que evalúa** `ausencia de authUserId o ausencia de authEmail`, `existingErr`, `ausencia de existing`, `insertErr`, `ausencia de existing.role`, `updateErr`.
- **Contrato de datos** Auth `getSession` en [`useAuthEngine.ts:449`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L449), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`useAuthEngine.ts:458`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L458), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`useAuthEngine.ts:458`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L458), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`insert`) en [`useAuthEngine.ts:471`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L471), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`useAuthEngine.ts:483`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L483).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo), [`AUTH_ROLES`](../../../packages/domain/src/auth/authRoles.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L445), [`setInfo`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L446), [`setLoading`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L447), [`supabase.auth.getSession`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L449), [`email.trim`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L451), [`maybeSingle`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L458), [`eq`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L458), [`select`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L458), [`supabase.from`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L458), [`insert`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L471), [`update`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L483), [`setSelectedRole`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L494) y 1 más.
- **Lo usa** [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L1069) (referencia).

#### [`submitOwnerProfile`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L500) · callback React · asíncrona · dentro de [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L82)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`, `setInfo`, `setLoading`.
- **Condiciones que evalúa** `ausencia de status.nombre.trim`, `ausencia de status.apellido.trim`, `ausencia de status.genero.trim`, `ausencia de status.birthStatus.isValid`, `status.birthStatus.isUnderage`, `ausencia de isoBirth`, `ausencia de current.ok`, `updateErr`.
- **Contrato de datos** tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`useAuthEngine.ts:542`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L542), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`useAuthEngine.ts:542`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L542).
- **Usa código de** [`AUTH_ROLES`](../../../packages/domain/src/auth/authRoles.js#L1) (accede al módulo), [`getUserProfileStatus`](../../../packages/domain/src/normalizers/userProfile.js#L138) (llama), [`buildBirthdateISO`](../../../packages/domain/src/normalizers/userProfile.js#L99) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L501), [`setInfo`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L502), [`getUserProfileStatus`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L504), [`status.nombre.trim`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L511), [`status.apellido.trim`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L512), [`status.genero.trim`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L513), [`buildBirthdateISO`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L525), [`getCurrentUserRow`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L528), [`setLoading`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L534), [`eq`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L542), [`update`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L542), [`supabase.from`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L542) y 1 más.
- **Lo usa** [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L1070) (referencia).

#### [`submitBusinessData`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L556) · callback React · asíncrona · dentro de [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L82)

Consulta o invoca tabla o vista [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) y coordina las demás operaciones de esta ficha.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`, `setInfo`, `setLoading`.
- **Condiciones que evalúa** `ausencia de nombreNegocio.trim`, `ausencia de categoriaNegocio.trim`, `ausencia de current.ok`, `current.data.role`, `negErr`, `existingNeg.id`, `updateErr`, `insertErr`.
- **Contrato de datos** tabla o vista [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) (`select`) en [`useAuthEngine.ts:573`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L573), tabla o bucket [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) en [`useAuthEngine.ts:573`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L573), tabla o vista [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) (`update`) en [`useAuthEngine.ts:592`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L592), tabla o vista [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) (`insert`) en [`useAuthEngine.ts:602`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L602).
- **Usa código de** [`AUTH_ROLES`](../../../packages/domain/src/auth/authRoles.js#L1) (accede al módulo), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo), [`validateRucFromCedula`](../../../packages/domain/src/validators/index.js#L36) (llama).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L557), [`setInfo`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L558), [`nombreNegocio.trim`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L559), [`categoriaNegocio.trim`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L560), [`getCurrentUserRow`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L562), [`setLoading`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L572), [`maybeSingle`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L573), [`eq`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L573), [`select`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L573), [`supabase.from`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L573), [`validateRucFromCedula`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L588), [`update`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L592) y 2 más.
- **Lo usa** [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L1071) (referencia).

#### [`submitAddressData`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L615) · callback React · asíncrona · dentro de [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L82)

Consulta o invoca tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) y coordina las demás operaciones de esta ficha.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`, `setInfo`, `setLoading`.
- **Condiciones que evalúa** `ausencia de calles.trim`, `ausencia de sector.trim`, `ausencia de provinciaId.trim o ausencia de cantonId.trim`, `ausencia de Number.isFinite`, `ausencia de current.ok`, `existingDirErr`, `direccionId`, `updateErr` y 9 más.
- **Contrato de datos** tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) (`select`) en [`useAuthEngine.ts:652`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L652), tabla o bucket [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) en [`useAuthEngine.ts:652`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L652), tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) (`update`) en [`useAuthEngine.ts:669`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L669), tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) (`insert + select`) en [`useAuthEngine.ts:679`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L679), tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) (`insert`) en [`useAuthEngine.ts:679`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L679), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`useAuthEngine.ts:693`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L693), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`useAuthEngine.ts:693`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L693), tabla o vista [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) (`select`) en [`useAuthEngine.ts:707`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L707), tabla o bucket [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) en [`useAuthEngine.ts:707`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L707), tabla o vista [`sucursales`](../../../apps/referidos-app/supabase/migrations/20250227_000001_restore_sucursales_flags_verificacion.sql#L6) (`select`) en [`useAuthEngine.ts:718`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L718), tabla o bucket [`sucursales`](../../../apps/referidos-app/supabase/migrations/20250227_000001_restore_sucursales_flags_verificacion.sql#L6) en [`useAuthEngine.ts:718`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L718), tabla o vista [`sucursales`](../../../apps/referidos-app/supabase/migrations/20250227_000001_restore_sucursales_flags_verificacion.sql#L6) (`update`) en [`useAuthEngine.ts:740`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L740), tabla o vista [`sucursales`](../../../apps/referidos-app/supabase/migrations/20250227_000001_restore_sucursales_flags_verificacion.sql#L6) (`insert`) en [`useAuthEngine.ts:750`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L750), Auth `runValidateRegistration` en [`useAuthEngine.ts:760`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L760).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo), [`AUTH_ROLES`](../../../packages/domain/src/auth/authRoles.js#L1) (accede al módulo), [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L616), [`setInfo`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L617), [`calles.trim`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L620), [`sector.trim`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L621), [`provinciaId.trim`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L622), [`cantonId.trim`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L622), [`getCurrentUserRow`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L631), [`ciudad.trim`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L640), [`parroquiaId.trim`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L644), [`parroquia.trim`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L645), [`setLoading`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L651), [`maybeSingle`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L652) y 9 más.
- **Lo usa** [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L1072) (referencia).

#### [`markVerificationStatus`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L787) · callback React · asíncrona · dentro de [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L82)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Entradas** `status`.
- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`.
- **Condiciones que evalúa** `ausencia de current.ok`, `updateErr`.
- **Contrato de datos** tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`useAuthEngine.ts:793`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L793), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`useAuthEngine.ts:793`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L793).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`getCurrentUserRow`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L788), [`setError`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L790), [`eq`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L793), [`update`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L793), [`supabase.from`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L793), [`bootstrapAuth`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L801).
- **Lo usa** [`startVerification`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L810) (llama), [`skipVerification`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L823) (llama), [`finalizeVerification`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L997) (llama).

#### [`startVerification`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L807) · callback React · asíncrona · dentro de [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L82)

Inicia `Verification` y prepara sus dependencias.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`, `setInfo`, `markVerificationStatus`, `setStep`.
- **Condiciones que evalúa** `ausencia de ok`, `next`.
- **Usa código de** [`resolveVerificationStep`](../../../packages/domain/src/auth/flowRules.js#L75) (llama), [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L808), [`setInfo`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L809), [`markVerificationStatus`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L810), [`resolveVerificationStep`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L812), [`useAppStore.getState`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L813), [`setStep`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L816).
- **Lo usa** [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L1073) (referencia).

#### [`skipVerification`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L820) · callback React · asíncrona · dentro de [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L82)

Coordina cambios de estado durante `skip Verification`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`, `setInfo`, `markVerificationStatus`.
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L821), [`setInfo`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L822), [`markVerificationStatus`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L823).
- **Lo usa** [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L1074) (referencia).

#### [`sendVerificationEmail`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L826) · callback React · asíncrona · dentro de [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L82)

Opera sobre Auth `resend`. El resultado se adapta al contrato del consumidor.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`, `setInfo`, `setLoading`.
- **Condiciones que evalúa** `ausencia de targetEmail`, `resendErr`.
- **Contrato de datos** Auth `resend` en [`useAuthEngine.ts:839`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L839).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L827), [`setInfo`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L828), [`getCurrentAuthEmail`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L831), [`email.trim`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L832), [`setLoading`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L838), [`supabase.auth.resend`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L839).
- **Lo usa** [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L1075) (referencia).

#### [`submitBusinessVerificationData`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L853) · callback React · asíncrona · dentro de [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L82)

Consulta o invoca tabla o vista [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) y coordina las demás operaciones de esta ficha.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`, `setInfo`, `setLoading`.
- **Condiciones que evalúa** `ausencia de parsedPhone.digits`, `ausencia de isPhoneValidForCountry`, `ruc y ausencia de validateRucFromCedula`, `ausencia de current.ok`, `current.data.role`, `negErr o ausencia de negocio.id`, `userErr`, `businessErr`.
- **Contrato de datos** tabla o vista [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) (`select`) en [`useAuthEngine.ts:883`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L883), tabla o bucket [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) en [`useAuthEngine.ts:883`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L883), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`useAuthEngine.ts:894`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L894), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`useAuthEngine.ts:894`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L894), tabla o vista [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) (`update`) en [`useAuthEngine.ts:905`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L905).
- **Usa código de** [`parsePhoneWithCountry`](../../../packages/domain/src/normalizers/phone.js#L14) (llama), [`isPhoneValidForCountry`](../../../packages/domain/src/normalizers/phone.js#L41) (llama), [`toStoragePhone`](../../../packages/domain/src/normalizers/phone.js#L47) (llama), [`validateRucFromCedula`](../../../packages/domain/src/validators/index.js#L36) (llama), [`AUTH_ROLES`](../../../packages/domain/src/auth/authRoles.js#L1) (accede al módulo), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L854), [`setInfo`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L855), [`parsePhoneWithCountry`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L857), [`isPhoneValidForCountry`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L862), [`toStoragePhone`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L866), [`validateRucFromCedula`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L867), [`getCurrentUserRow`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L872), [`setLoading`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L882), [`maybeSingle`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L883), [`eq`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L883), [`select`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L883), [`supabase.from`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L883) y 2 más.
- **Lo usa** [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L1076) (referencia).

#### [`savePassword`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L921) · callback React · asíncrona · dentro de [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L82)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Entradas** `newPassword`, `confirmPassword`.
- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`, `setInfo`, `setLoading`.
- **Condiciones que evalúa** `newPassword.length`, `newPassword`, `ausencia de test`, `updateErr`, `current.ok`.
- **Contrato de datos** Auth `updateUser` en [`useAuthEngine.ts:938`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L938), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`useAuthEngine.ts:949`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L949), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`useAuthEngine.ts:949`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L949).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L922), [`setInfo`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L923), [`test`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L932), [`setLoading`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L937), [`supabase.auth.updateUser`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L938), [`getCurrentUserRow`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L947), [`eq`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L949), [`update`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L949), [`supabase.from`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L949), [`bootstrapAuth`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L955).
- **Lo usa** [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L1077) (referencia).

#### [`finalizeVerification`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L963) · callback React · asíncrona · dentro de [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L82)

Opera sobre Auth `runOnboardingCheck`. El resultado se adapta al contrato del consumidor.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`, `setInfo`, `markVerificationStatus`.
- **Condiciones que evalúa** `ausencia de latest.ok`, `isEmailOnly y ausencia de latest.email_confirmed`, `isOauthPrimary y ausencia de latestHasPassword y ausencia de latestHasMfa`, `ausencia de ok`.
- **Contrato de datos** Auth `runOnboardingCheck` en [`useAuthEngine.ts:966`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L966).
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L964), [`setInfo`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L965), [`mobileApi.auth.runOnboardingCheck`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L966), [`providers.includes`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L986), [`markVerificationStatus`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L997).
- **Lo usa** [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L1078) (referencia).

#### [`refreshOnboarding`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L1003) · callback React · asíncrona · dentro de [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L82)

Coordina cambios de estado durante `refresh Onboarding`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`, `setInfo`.
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L1004), [`setInfo`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L1005), [`bootstrapAuth`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L1006).
- **Lo usa** [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L1079) (referencia).

### [`apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L1)

Une la lectura nativa y manual en `handleValidatePreview`. Clasifica por prefijo, comprueba onboarding y muestra el tipo detectado junto a un historial breve propio. La clasificación es informativa. El canje se decide en una operación de negocio.

**Superficie que exporta.** [`ClienteEscanerScreen`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L25).

**Módulos que lo cargan.** [`RoleTabs.tsx`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L8) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/ui/BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/store/appStore`](../../../apps/referidos-android/src/shared/store/appStore.ts), [`@features/scanner/NativeQrScannerBlock`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts).

#### [`ScannerOutcome`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L16) · tipo TypeScript

Describe la forma del contrato de `Scanner Outcome`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`resolveScannerOutcome`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L18) · función

Obtiene o resuelve `Scanner Outcome` para entregarlo al consumidor.

- **Entradas** `code`.
- **Retorno visible o tipo declarado** `ScannerOutcome`.
- **Condiciones que evalúa** `normalized.startsWith`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L19), [`trim`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L19), [`normalized.startsWith`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L20).
- **Lo usa** [`handleValidatePreview`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L65) (llama).

#### [`ClienteEscanerScreen`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L25) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `NativeQrScannerBlock`, `SectionCard`, `Text`, `TextInput`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `onboarding mediante useAppStore`, `selector state.onboarding`, `[manualCode, setManualCode] mediante useState`, `[result, setResult] mediante useState`, `[messageError, setMessageError] mediante useState`, `[loadingRecent, setLoadingRecent] mediante useState`, `[recent, setRecent] mediante useState`.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `NativeQrScannerBlock`, `SectionCard`, `Text`, `TextInput`, `Pressable`, `View`, `BlockSkeleton`.
- **Hooks que llama** `useAppStore`, `useState`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37) (llama), [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`NativeQrScannerBlock`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L11) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L9) (renderiza), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`recent.map`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L165), [`readFirst`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L166), [`formatDateTime`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L173).
- **Lo usa** [`ClienteTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L108) (referencia).

#### [`loadRecent`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L33) · callback React · asíncrona · dentro de [`ClienteEscanerScreen`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L25)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoadingRecent`, `setRecent`.
- **Condiciones que evalúa** `ausencia de userId`.
- **Usa código de** [`fetchCurrentUserRow`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L99) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia), [`fetchQrHistoryByClientId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L147) (llama).
- **Llamadas directas en el cuerpo** [`setLoadingRecent`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L34), [`fetchCurrentUserRow`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L38), [`setRecent`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L42), [`fetchQrHistoryByClientId`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L46).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L52) (llama), [`ClienteEscanerScreen`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L53) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L51) · callback de infraestructura · dentro de [`ClienteEscanerScreen`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L25)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClienteEscanerScreen`.

- **Llamadas directas en el cuerpo** [`loadRecent`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L52).

#### [`handleValidatePreview`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L55) · callback React · asíncrona · dentro de [`ClienteEscanerScreen`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L25)

Opera sobre Auth `runOnboardingCheck`. El resultado se adapta al contrato del consumidor.

- **Entradas** `incomingCode?`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setResult`, `setMessageError`, `setManualCode`.
- **Condiciones que evalúa** `clean.length`, `ausencia de data.ok`, `outcome`.
- **Contrato de datos** Auth `runOnboardingCheck` en [`ClienteEscanerScreen.tsx:73`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L73).
- **Usa código de** [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo), [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setResult`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L56), [`setMessageError`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L57), [`trim`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L58), [`setManualCode`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L63), [`resolveScannerOutcome`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L65), [`observability.track`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L66), [`mobileApi.auth.runOnboardingCheck`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L73).
- **Lo usa** [`NativeQrScannerBlock.onDetected`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L104) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L119) (llama).

#### [`NativeQrScannerBlock.onDetected`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L103) · callback JSX · dentro de [`ClienteEscanerScreen`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L25)

Responde al evento de interfaz `NativeQrScannerBlock.onDetected`. La lógica ocurre al interactuar con ese control.

- **Entradas** `code`.
- **Llamadas directas en el cuerpo** [`handleValidatePreview`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L104).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L119) · callback JSX · dentro de [`ClienteEscanerScreen`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L25)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleValidatePreview`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L119).

#### [`styles`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L184) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L184).
- **Lo usa** [`ClienteEscanerScreen`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L101) (accede al módulo).
