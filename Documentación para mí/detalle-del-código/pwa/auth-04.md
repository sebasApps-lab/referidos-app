# PWA principal · Auth y onboarding · 4 de 5

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/auth/steps/UserAddressStep.jsx`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1)
- [`apps/referidos-app/src/auth/steps/UserProfileStep.jsx`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L1)
- [`apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L1)
- [`apps/referidos-app/src/auth/steps/WelcomeStep.jsx`](../../../apps/referidos-app/src/auth/steps/WelcomeStep.jsx#L1)
- [`apps/referidos-app/src/auth/utils/authMappers.js`](../../../apps/referidos-app/src/auth/utils/authMappers.js#L1)
- [`apps/referidos-app/src/auth/utils/businessDataUtils.js`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/auth/steps/UserAddressStep.jsx`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1)

Monta los controles de búsqueda, mapa y territorio para completar la dirección.

**Superficie que exporta.** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L15) (importa).

**Dependencias del archivo.** `react`, [`../blocks/ErrorBanner`](../../../apps/referidos-app/src/auth/blocks/ErrorBanner.jsx), [`../../services/addressSearchClient`](../../../apps/referidos-app/src/services/addressSearchClient.js), [`../../services/addressReverseClient`](../../../apps/referidos-app/src/services/addressReverseClient.js), [`../../services/gpsFallbackClient`](../../../apps/referidos-app/src/services/gpsFallbackClient.js), [`../../services/territoryClient`](../../../apps/referidos-app/src/services/territoryClient.js), [`../../components/maps/LeafletMapPicker`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx), [`../../search/auth/AddressStepSearch`](../../../apps/referidos-app/src/search/auth/AddressStepSearch.jsx), [`../../utils/textCase`](../../../apps/referidos-app/src/utils/textCase.js), [`../hooks/useLocationStep`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js), [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js).

#### [`DEFAULT_MAP_CENTER`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L18) · variable de módulo

Agrupa la configuración o catálogo de `DEFAULT MAP CENTER` para que sus consumidores lean claves comunes.

- **Campos o contexto** `lat`, `lng`.
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L861) (referencia), [`LeafletMapPicker.onCenterChange`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1197) (accede al módulo).

#### [`FALLBACK_ZOOM`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L19) · variable de módulo

Declara `FALLBACK_ZOOM` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L93) (referencia), [`startConfirmZoom`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L358) (referencia), [`clearSearchState`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L899) (referencia), [`LeafletMapPicker.onZoomChange`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1220) (referencia).

#### [`CLOSE_ZOOM`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L20) · variable de módulo

Declara `CLOSE_ZOOM` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L299) (referencia), [`applySearchSelection`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L487) (referencia).

#### [`DEFAULT_HORARIOS`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L21) · variable de módulo

Agrupa la configuración o catálogo de `DEFAULT HORARIOS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `semanal`, `excepciones`.
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L613) (referencia).

#### [`WEEK_DAYS`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L33) · variable de módulo

Conserva la lista de `WEEK DAYS` usada por el módulo.

- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L615) (accede al módulo).

#### [`WEEKDAY_KEYS`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L42) · variable de módulo

Conserva la lista de `WEEKDAY KEYS` usada por el módulo.

- **Lo usa** [`toggleGroupSelection`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L750) (referencia), [`updateGroupTime`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L773) (referencia), [`openGroupPicker`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L795) (referencia), [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1057) (referencia), [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1462) (accede al módulo), [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1499) (accede al módulo), [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1509) (accede al módulo).

#### [`WEEKEND_KEYS`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L43) · variable de módulo

Conserva la lista de `WEEKEND KEYS` usada por el módulo.

- **Lo usa** [`toggleGroupSelection`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L750) (referencia), [`updateGroupTime`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L773) (referencia), [`openGroupPicker`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L795) (referencia), [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1058) (referencia), [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1655) (accede al módulo), [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1692) (accede al módulo), [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1702) (accede al módulo).

#### [`CLIENT_ADDRESS_TAGS`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L44) · variable de módulo

Conserva la lista de `CLIENT ADDRESS TAGS` usada por el módulo.

- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L235) (accede al módulo), [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L607) (accede al módulo), [`handleStartCustom`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L630) (accede al módulo).

#### [`CLIENT_ADDRESS_OTHER`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L45) · variable de módulo

Declara `CLIENT_ADDRESS_OTHER` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L609) (referencia).

#### [`CLIENT_ADDRESS_CUSTOM_KEY`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L46) · variable de módulo

Declara `CLIENT_ADDRESS_CUSTOM_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L241) (referencia), [`handleStartCustom`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L628) (referencia), [`handleCustomChange`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L638) (referencia), [`handleCustomConfirm`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L647) (referencia), [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1429) (referencia).

#### [`CLIENT_ADDRESS_TAG_KEY`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L47) · variable de módulo

Declara `CLIENT_ADDRESS_TAG_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L226) (referencia), [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L258) (referencia).

#### [`CLIENT_ADDRESS_TAG_DRAFT_KEY`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L48) · variable de módulo

Declara `CLIENT_ADDRESS_TAG_DRAFT_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L230) (referencia), [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L264) (referencia).

#### [`CLIENT_ADDRESS_MIN_LENGTH`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L49) · variable de módulo

Declara `CLIENT_ADDRESS_MIN_LENGTH` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L604) (referencia), [`handleCustomConfirm`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L643) (referencia).

#### [`CLIENT_ADDRESS_MAX_DIGITS`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L50) · variable de módulo

Declara `CLIENT_ADDRESS_MAX_DIGITS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L605) (referencia), [`handleCustomChange`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L636) (referencia), [`handleCustomConfirm`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L644) (referencia).

#### [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54) · componente React · exportación por defecto

Monta `PinOutlineIcon`, `input`, `button`, `SearchTiltIcon`, `AddressStepSearch`, `ErrorBanner`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{innerRef, searchModeOpen, onSearchModeChange, isAddressPrefillReady, isSucursalPrincipal, onChangeSucursalPrincipal, horarios, onChangeHorarios, direccionPayload, onChangeDireccionPayload, subtitle, error, onSubmit, mode, requireHorarios, onSkip, primaryLabel}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[stage, setStage] mediante useState`, `[searchValue, setSearchValue] mediante useState`, `[selectedSearchItem, setSelectedSearchItem] mediante useState`, `[isSearching, setIsSearching] mediante useState`, `[searchError, setSearchError] mediante useState`, `[hasSearched, setHasSearched] mediante useState`, `[, setAddressLabel] mediante useState`, `[reverseError, setReverseError] mediante useState`, `[isReverseLoading, setIsReverseLoading] mediante useState`, `[coords, setCoords] mediante useState`, `[coordsSource, setCoordsSource] mediante useState`, `[localError, setLocalError] mediante useState`, `[mapStatus, setMapStatus] mediante useState`, `[mapZoom, setMapZoom] mediante useState` y 25 más.
- **Interfaz que monta** `PinOutlineIcon`, `input`, `button`, `SearchTiltIcon`, `AddressStepSearch`, `ErrorBanner`, `XIcon`, `LeafletMapPicker`, `CompassIcon`, `SearchableSelect`, `PencilIcon`, `CheckIcon`, `MinusIcon`, `ChevronIcon`.
- **Hooks que llama** `useState`, `useRef`, `useModal`, `useEffect`, `useLocationStep`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama), [`useLocationStep`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L5) (llama), [`toTitleCaseEs`](../../../apps/referidos-app/src/utils/textCase.js#L17) (llama), [`AddressStepSearch`](../../../apps/referidos-app/src/search/auth/AddressStepSearch.jsx#L3) (renderiza), [`ErrorBanner`](../../../apps/referidos-app/src/auth/blocks/ErrorBanner.jsx#L3) (renderiza), [`LeafletMapPicker`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L5) (renderiza).
- **Llamadas directas en el cuerpo** [`toTitleCaseEs`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L591), [`countDigits`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L601), [`customTagInput.trim`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L602), [`CLIENT_ADDRESS_TAGS.includes`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L607), [`WEEK_DAYS.some`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L615), [`trim`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L828), [`searchValue.trim`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L850), [`getGroupInfo`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1057), [`searchResults.map`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1078), [`formatDisplayParts`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1090), [`CLIENT_ADDRESS_TAGS.map`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1384), [`getEntry`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1455) y 4 más.
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L703) (renderiza).

#### [`setIsSearchModeOpen`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L79) · callback React · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Aplica o guarda `Is Search Mode Open` para que el estado refleje la operación.

- **Entradas** `next`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`onSearchModeChange`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L80).
- **Lo usa** [`applySearchSelection`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L478) (llama), [`clearSearchState`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L897) (llama), [`handleSearch`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L995) (llama), [`input.onFocus`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1032) (llama), [`input.onChange`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1040) (llama), [`AddressStepSearch.onBack`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1109) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L132) · callback de infraestructura · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `UserAddressStep`.

- **Llamadas directas en el cuerpo** [`loadProvincias`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L159).

#### [`loadProvincias`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L135) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L132)

Obtiene o resuelve `Provincias` para entregarlo al consumidor.

- **Actualizaciones de estado o acciones** `setIsLoadingTerritory`, `setTerritoryError`, `setTerritory`.
- **Condiciones que evalúa** `ausencia de active`, `ausencia de result.ok`.
- **Usa código de** [`fetchProvincias`](../../../apps/referidos-app/src/services/territoryClient.js#L17) (llama).
- **Llamadas directas en el cuerpo** [`setIsLoadingTerritory`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L136), [`setTerritoryError`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L137), [`fetchProvincias`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L138), [`forEach`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L147), [`setTerritory`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L151).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L159) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L165) · callback de infraestructura · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `UserAddressStep`.

- **Actualizaciones de estado o acciones** `setProvinciaId`, `setCantonId`.
- **Condiciones que evalúa** `ausencia de provinciaId y direccionPayload.provincia_id`, `ausencia de cantonId y direccionPayload.canton_id`.
- **Llamadas directas en el cuerpo** [`setProvinciaId`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L167), [`setCantonId`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L170).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L174) · callback de infraestructura · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `UserAddressStep`.

- **Actualizaciones de estado o acciones** `setCantonId`, `setParroquiaId`.
- **Condiciones que evalúa** `ausencia de provinciaId`.
- **Llamadas directas en el cuerpo** [`setCantonId`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L176), [`setParroquiaId`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L177).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L181) · callback de infraestructura · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `UserAddressStep`.

- **Actualizaciones de estado o acciones** `setParroquiaId`.
- **Condiciones que evalúa** `ausencia de cantonId`.
- **Llamadas directas en el cuerpo** [`setParroquiaId`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L183).

#### [`buildDireccionPayload`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L188) · callback React · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Construye `Direccion Payload` a partir de los datos del flujo.

- **Entradas** `overrides = valor por defecto`.
- **Retorno visible o tipo declarado** `place_id`, `label`, `display_label`, `provider`, `lat`, `lng`, `parroquia_id`, `parroquia`, `ciudad`, `sector`, `calles`, `house_number`, `postcode`, `referencia`, `provincia`, `canton`, `country`, `provincia_id` y 1 más.
- **Hooks que llama** `useCallback`.
- **Lo usa** [`updateDireccionPayload`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L216) (llama).

#### [`updateDireccionPayload`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L215) · callback React · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Aplica o guarda `Direccion Payload` para que el estado refleje la operación.

- **Entradas** `overrides = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`onChangeDireccionPayload`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L216), [`buildDireccionPayload`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L216).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L279) (llama), [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L280) (referencia), [`handleConfirm`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L418) (llama), [`resetDireccionPayload`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L443) (llama), [`applySearchSelection`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L489) (llama), [`handleSearch`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L970) (llama), [`LeafletMapPicker.onCenterChange`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1204) (llama), [`input.onChange`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1372) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L221) · callback de infraestructura · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `UserAddressStep`.

- **Actualizaciones de estado o acciones** `setActiveTag`, `setAddressTag`, `setCustomTagInput`, `setIsCustomEditing`.
- **Efectos y APIs** `localStorage.getItem`.
- **Condiciones que evalúa** `isBusiness`, `addressTagInitRef.current`, `initialLabel`, `CLIENT_ADDRESS_TAGS.includes`.
- **Llamadas directas en el cuerpo** [`localStorage.getItem`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L226), [`trim`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L232), [`CLIENT_ADDRESS_TAGS.includes`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L235), [`setActiveTag`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L236), [`setAddressTag`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L237), [`setCustomTagInput`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L238), [`setIsCustomEditing`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L239).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L255) · callback de infraestructura · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `UserAddressStep`.

- **Actualizaciones de estado o acciones** `setItem`.
- **Efectos y APIs** `localStorage.setItem`.
- **Condiciones que evalúa** `isBusiness`, `undefined`.
- **Llamadas directas en el cuerpo** [`localStorage.setItem`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L258).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L261) · callback de infraestructura · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `UserAddressStep`.

- **Actualizaciones de estado o acciones** `setItem`.
- **Efectos y APIs** `localStorage.setItem`.
- **Condiciones que evalúa** `isBusiness`, `undefined`.
- **Llamadas directas en el cuerpo** [`localStorage.setItem`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L264).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L267) · callback de infraestructura · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `UserAddressStep`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `setTimeout`, `clearTimeout`.
- **Condiciones que evalúa** `ausencia de isCustomEditing`.
- **Llamadas directas en el cuerpo** [`setTimeout`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L269), [`clearTimeout`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L272).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L269) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L267)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Llamadas directas en el cuerpo** [`customInputRef.current.focus`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L270).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L275) · callback de infraestructura · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `UserAddressStep`.

- **Condiciones que evalúa** `isBusiness`, `addressTag`.
- **Llamadas directas en el cuerpo** [`updateDireccionPayload`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L279).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L282) · callback de infraestructura · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `UserAddressStep`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `clearTimeout`.
- **Condiciones que evalúa** `zoomSequenceRef.current`.
- **Llamadas directas en el cuerpo** [`clearTimeout`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L285).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L310) · callback de infraestructura · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `UserAddressStep`.

- **Actualizaciones de estado o acciones** `setStage`.
- **Condiciones que evalúa** `ausencia de isPrefillReady`, `stage`, `hasSavedAddress y stage`, `ausencia de hasSavedAddress y stage`.
- **Llamadas directas en el cuerpo** [`setStage`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L313).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L324) · callback de infraestructura · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `UserAddressStep`.

- **Condiciones que evalúa** `stage`, `coordsSource o coords`.
- **Llamadas directas en el cuerpo** [`loadFallbackLocation`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L346).

#### [`loadFallbackLocation`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L333) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L324)

Obtiene o resuelve `Fallback Location` para entregarlo al consumidor.

- **Actualizaciones de estado o acciones** `setCoords`, `setCoordsSource`.
- **Condiciones que evalúa** `ausencia de active o ausencia de result.ok o ausencia de result.location`, `coords`.
- **Usa código de** [`getGpsFallbackLocation`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L66) (llama).
- **Llamadas directas en el cuerpo** [`getGpsFallbackLocation`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L334), [`setCoords`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L342), [`setCoordsSource`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L343).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L346) (llama).

#### [`startConfirmZoom`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L352) · función · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Inicia `Confirm Zoom` y prepara sus dependencias.

- **Actualizaciones de estado o acciones** `clearTimeout`, `setAnimateZoom`.
- **Efectos y APIs** `clearTimeout`, `steps.push`.
- **Condiciones que evalúa** `animateZoom`, `zoomSequenceRef.current`, `steps.length`.
- **Llamadas directas en el cuerpo** [`clearTimeout`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L355), [`setAnimateZoom`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L357), [`steps.push`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L362), [`tick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L383).
- **Lo usa** [`handleConfirm`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L402) (llama).

#### [`tick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L369) · función · dentro de [`startConfirmZoom`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L352)

Coordina cambios de estado durante `tick`.

- **Actualizaciones de estado o acciones** `setMapZoom`.
- **Efectos y APIs** `setTimeout`.
- **Condiciones que evalúa** `index`.
- **Llamadas directas en el cuerpo** [`setMapZoom`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L372), [`setTimeout`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L376).
- **Lo usa** [`startConfirmZoom`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L383) (llama).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L376) · callback de infraestructura · dentro de [`tick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L369)

Ejecuta trabajo diferido o periódico iniciado por `tick`.

- **Actualizaciones de estado o acciones** `setAnimateZoom`.
- **Llamadas directas en el cuerpo** [`setAnimateZoom`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L377).

#### [`handleConfirm`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L386) · función · asíncrona · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setLocalError`, `setReverseError`, `setShowZoomHint`, `setIsReverseLoading`, `setAddressLabel`, `setStage`.
- **Condiciones que evalúa** `ausencia de center`, `ausencia de isOffFallback`, `mapZoom`, `ausencia de result.ok`.
- **Usa código de** [`reverseGeocode`](../../../apps/referidos-app/src/services/addressReverseClient.js#L22) (llama).
- **Llamadas directas en el cuerpo** [`setLocalError`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L387), [`setReverseError`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L388), [`setShowZoomHint`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L401), [`startConfirmZoom`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L402), [`setIsReverseLoading`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L406), [`reverseGeocode`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L407), [`formatDisplayParts`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L415), [`setAddressLabel`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L417), [`updateDireccionPayload`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L418), [`setStage`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L439).
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1293) (pasa a onClick).

#### [`resetDireccionPayload`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L442) · función · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Limpia o restablece `Direccion Payload` como parte de este flujo.

- **Entradas** `overrides = valor por defecto`.
- **Llamadas directas en el cuerpo** [`updateDireccionPayload`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L443).
- **Lo usa** [`handleProvinciaChange`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L907) (llama), [`handleCantonChange`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L914) (llama), [`handleProvinciaClear`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L927) (llama), [`handleCantonClear`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L934) (llama).

#### [`handleSelectSuggestion`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L466) · función · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Maneja `Select Suggestion` y coordina las acciones indicadas abajo.

- **Entradas** `item`.
- **Actualizaciones de estado o acciones** `setSelectedSearchItem`.
- **Llamadas directas en el cuerpo** [`setSelectedSearchItem`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L467).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1082) (llama).

#### [`applySearchSelection`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L470) · función · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Aplica o guarda `Search Selection` para que el estado refleje la operación.

- **Entradas** `item`.
- **Actualizaciones de estado o acciones** `setSearchValue`, `setSearchResults`, `setSearchError`, `setHasSearched`, `setIsSearchModeOpen`, `setCoords`, `setCoordsSource`, `setMapZoom`.
- **Condiciones que evalúa** `item.lat y item.lng`.
- **Llamadas directas en el cuerpo** [`formatDisplayParts`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L472), [`setSearchValue`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L474), [`setSearchResults`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L475), [`setSearchError`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L476), [`setHasSearched`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L477), [`setIsSearchModeOpen`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L478), [`setCoords`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L481), [`setCoordsSource`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L485), [`setMapZoom`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L487), [`updateDireccionPayload`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L489).
- **Lo usa** [`handleConfirmSearch`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1019) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L512) · callback de infraestructura · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `UserAddressStep`.

- **Llamadas directas en el cuerpo** [`loadCantones`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L539).

#### [`loadCantones`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L514) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L512)

Obtiene o resuelve `Cantones` para entregarlo al consumidor.

- **Actualizaciones de estado o acciones** `setTerritoryError`, `setTerritory`.
- **Condiciones que evalúa** `ausencia de provinciaId`, `ausencia de active`, `ausencia de result.ok`.
- **Usa código de** [`fetchCantonesByProvincia`](../../../apps/referidos-app/src/services/territoryClient.js#L39) (llama).
- **Llamadas directas en el cuerpo** [`fetchCantonesByProvincia`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L516), [`setTerritoryError`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L519), [`forEach`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L523), [`setTerritory`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L526).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L539) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L545) · callback de infraestructura · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `UserAddressStep`.

- **Llamadas directas en el cuerpo** [`loadParroquias`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L572).

#### [`loadParroquias`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L547) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L545)

Obtiene o resuelve `Parroquias` para entregarlo al consumidor.

- **Actualizaciones de estado o acciones** `setTerritoryError`, `setTerritory`.
- **Condiciones que evalúa** `ausencia de cantonId`, `ausencia de active`, `ausencia de result.ok`.
- **Usa código de** [`fetchParroquiasByCanton`](../../../apps/referidos-app/src/services/territoryClient.js#L67) (llama).
- **Llamadas directas en el cuerpo** [`fetchParroquiasByCanton`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L549), [`setTerritoryError`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L552), [`forEach`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L556), [`setTerritory`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L559).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L572) (llama).

#### [`cantonOptions`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L580) · cálculo memorizado · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Comprueba `ton Options` para decidir si se admite o continúa la operación.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1261) (pasa a options).

#### [`parroquiaOptions`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L584) · cálculo memorizado · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Función auxiliar de `UserAddressStep` para `parroquia Options`.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1271) (pasa a options).

#### [`handleSelectTag`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L620) · callback React · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Maneja `Select Tag` y coordina las acciones indicadas abajo.

- **Entradas** `tag`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setActiveTag`, `setAddressTag`, `setIsCustomEditing`.
- **Llamadas directas en el cuerpo** [`setActiveTag`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L621), [`setAddressTag`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L622), [`setIsCustomEditing`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L623).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1390) (llama).

#### [`handleStartCustom`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L627) · callback React · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setActiveTag`, `setIsCustomEditing`, `setCustomTagInput`.
- **Condiciones que evalúa** `ausencia de customTagInput y addressTag y ausencia de CLIENT_ADDRESS_TAGS.includes`.
- **Llamadas directas en el cuerpo** [`setActiveTag`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L628), [`setIsCustomEditing`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L629), [`CLIENT_ADDRESS_TAGS.includes`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L630), [`setCustomTagInput`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L631).
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1427) (pasa a onClick).

#### [`handleCustomChange`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L634) · callback React · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Atiende `input.onChange` y aplica la acción vinculada a ese control.

- **Entradas** `event`.
- **Recibe eventos de** `input.onChange`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setCustomTagInput`, `setActiveTag`, `setAddressTag`.
- **Condiciones que evalúa** `CLIENT_ADDRESS_MAX_DIGITS`.
- **Llamadas directas en el cuerpo** [`countDigits`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L636), [`setCustomTagInput`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L637), [`setActiveTag`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L638), [`setAddressTag`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L639), [`next.trim`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L639).
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1410) (pasa a onChange).

#### [`handleCustomConfirm`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L641) · callback React · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setAddressTag`, `setCustomTagInput`, `setActiveTag`, `setIsCustomEditing`.
- **Condiciones que evalúa** `trimmed.length`, `CLIENT_ADDRESS_MAX_DIGITS`.
- **Llamadas directas en el cuerpo** [`customTagInput.trim`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L642), [`countDigits`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L644), [`setAddressTag`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L645), [`setCustomTagInput`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L646), [`setActiveTag`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L647), [`setIsCustomEditing`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L648).
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1417) (pasa a onClick).

#### [`updateHorarios`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L652) · callback React · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Aplica o guarda `Horarios` para que el estado refleje la operación.

- **Entradas** `nextValue`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`onChangeHorarios`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L653).
- **Lo usa** [`handleToggleDay`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L672) (llama), [`updateDayTime`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L693) (llama), [`toggleGroupSelection`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L766) (llama), [`updateGroupTime`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L788) (llama).

#### [`handleToggleDay`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L659) · callback React · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Maneja `Toggle Day` y coordina las acciones indicadas abajo.

- **Entradas** `dayKey`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `entries.length`.
- **Llamadas directas en el cuerpo** [`updateHorarios`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L672).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1462) (llama), [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1602) (llama), [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1655) (llama), [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1795) (llama).

#### [`updateDayTime`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L678) · callback React · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Aplica o guarda `Day Time` para que el estado refleje la operación.

- **Entradas** `dayKey`, `field`, `value`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`updateHorarios`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L693).
- **Lo usa** [`onConfirm`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L816) (llama), [`openTimePicker`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L819) (referencia).

#### [`getEntry`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L699) · callback React · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Obtiene o resuelve `Entry` para entregarlo al consumidor.

- **Entradas** `dayKey`.
- **Hooks que llama** `useCallback`.
- **Lo usa** [`getGroupInfo`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L705) (llama), [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1455) (llama).

#### [`getGroupInfo`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L704) · callback React · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Obtiene o resuelve `Group Info` para entregarlo al consumidor.

- **Entradas** `keys`.
- **Retorno visible o tipo declarado** `anySelected`, `allSelected`, `partial`, `timeLabel`, `showPersonalizado`, `baseEntry`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `allSelected y activeEntries.length`, `ausencia de anySelected`, `allSelected y sameHours`.
- **Llamadas directas en el cuerpo** [`keys.map`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L705), [`getEntry`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L705), [`entries.filter`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L706), [`activeEntries.every`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L712).
- **Lo usa** [`toggleGroupSelection`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L751) (llama), [`updateGroupTime`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L774) (llama), [`openGroupPicker`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L796) (llama), [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1057) (llama).

#### [`toggleGroupSelection`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L749) · callback React · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Función auxiliar de `UserAddressStep` para `toggle Group Selection`.

- **Entradas** `groupKey`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `info.allSelected`.
- **Llamadas directas en el cuerpo** [`getGroupInfo`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L751), [`keys.forEach`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L757), [`updateHorarios`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L766).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1463) (llama), [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1656) (llama).

#### [`updateGroupTime`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L772) · callback React · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Aplica o guarda `Group Time` para que el estado refleje la operación.

- **Entradas** `groupKey`, `field`, `value`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`getGroupInfo`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L774), [`keys.forEach`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L780), [`updateHorarios`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L788).
- **Lo usa** [`onConfirm`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L805) (llama), [`openGroupPicker`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L808) (referencia).

#### [`openGroupPicker`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L794) · callback React · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Inicia `Group Picker` y prepara sus dependencias.

- **Entradas** `groupKey`, `field`, `_currentLabel`, `showPersonalizado`.
- **Hooks que llama** `useCallback`.
- **Efectos y APIs** `openModal`.
- **Llamadas directas en el cuerpo** [`getGroupInfo`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L796), [`openModal`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L797).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1522) (llama), [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1538) (llama), [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1555) (llama), [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1715) (llama), [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1731) (llama), [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1748) (llama).

#### [`onConfirm`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L805) · función · dentro de [`openGroupPicker`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L794)

Maneja `Confirm` y coordina las acciones indicadas abajo.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`updateGroupTime`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L805).

#### [`openTimePicker`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L812) · callback React · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Inicia `Time Picker` y prepara sus dependencias.

- **Entradas** `dayKey`, `field`, `currentValue`.
- **Hooks que llama** `useCallback`.
- **Efectos y APIs** `openModal`.
- **Llamadas directas en el cuerpo** [`openModal`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L813).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1499) (llama), [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1509) (llama), [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1618) (llama), [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1628) (llama), [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1692) (llama), [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1702) (llama), [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1811) (llama), [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1821) (llama).

#### [`onConfirm`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L816) · función · dentro de [`openTimePicker`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L812)

Maneja `Confirm` y coordina las acciones indicadas abajo.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`updateDayTime`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L816).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L871) · callback de infraestructura · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `UserAddressStep`.

- **Efectos y APIs** `document.addEventListener`, `document.removeEventListener`.
- **Condiciones que evalúa** `ausencia de expandedGroup`.
- **Llamadas directas en el cuerpo** [`document.addEventListener`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L881), [`document.removeEventListener`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L882).

#### [`handleOutside`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L873) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L871)

Maneja `Outside` y coordina las acciones indicadas abajo.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setExpandedGroup`.
- **Condiciones que evalúa** `ausencia de insideWeekdays y ausencia de insideWeekend`.
- **Llamadas directas en el cuerpo** [`weekdaysRef.current.contains`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L875), [`weekendRef.current.contains`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L876), [`setExpandedGroup`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L878).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L881) (referencia).

#### [`clearSearchState`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L885) · función · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Limpia o restablece `Search State` como parte de este flujo.

- **Actualizaciones de estado o acciones** `setSearchValue`, `setSearchResults`, `setSearchError`, `setHasSearched`, `setAddressLabel`, `setReverseError`, `setSelectedSearchItem`, `setCoords`, `setCoordsSource`, `setHasMapMoved`, `setHasMapZoomed`, `setIsSearchModeOpen` y 1 más.
- **Llamadas directas en el cuerpo** [`setSearchValue`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L886), [`setSearchResults`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L887), [`setSearchError`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L888), [`setHasSearched`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L889), [`setAddressLabel`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L890), [`setReverseError`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L891), [`setSelectedSearchItem`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L892), [`setCoords`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L893), [`setCoordsSource`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L894), [`setHasMapMoved`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L895), [`setHasMapZoomed`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L896), [`setIsSearchModeOpen`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L897) y 1 más.
- **Lo usa** [`handleProvinciaChange`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L906) (llama), [`handleCantonChange`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L913) (llama), [`handleParroquiaChange`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L919) (llama), [`handleProvinciaClear`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L926) (llama), [`handleCantonClear`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L933) (llama), [`handleParroquiaClear`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L939) (llama).

#### [`handleProvinciaChange`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L902) · función · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Atiende `SearchableSelect.onChange` y aplica la acción vinculada a ese control.

- **Entradas** `value`.
- **Recibe eventos de** `SearchableSelect.onChange`.
- **Actualizaciones de estado o acciones** `setProvinciaId`, `setCantonId`, `setParroquiaId`, `clearSearchState`.
- **Llamadas directas en el cuerpo** [`setProvinciaId`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L903), [`setCantonId`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L904), [`setParroquiaId`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L905), [`clearSearchState`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L906), [`resetDireccionPayload`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L907).
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1253) (pasa a onChange).

#### [`handleCantonChange`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L910) · función · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Atiende `SearchableSelect.onChange` y aplica la acción vinculada a ese control.

- **Entradas** `value`.
- **Recibe eventos de** `SearchableSelect.onChange`.
- **Actualizaciones de estado o acciones** `setCantonId`, `setParroquiaId`, `clearSearchState`.
- **Llamadas directas en el cuerpo** [`setCantonId`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L911), [`setParroquiaId`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L912), [`clearSearchState`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L913), [`resetDireccionPayload`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L914).
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1263) (pasa a onChange).

#### [`handleParroquiaChange`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L917) · función · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Atiende `SearchableSelect.onChange` y aplica la acción vinculada a ese control.

- **Entradas** `value`.
- **Recibe eventos de** `SearchableSelect.onChange`.
- **Actualizaciones de estado o acciones** `setParroquiaId`, `clearSearchState`.
- **Llamadas directas en el cuerpo** [`setParroquiaId`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L918), [`clearSearchState`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L919).
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1273) (pasa a onChange).

#### [`handleProvinciaClear`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L922) · función · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Atiende `SearchableSelect.onClear` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `SearchableSelect.onClear`.
- **Actualizaciones de estado o acciones** `setProvinciaId`, `setCantonId`, `setParroquiaId`, `clearSearchState`.
- **Llamadas directas en el cuerpo** [`setProvinciaId`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L923), [`setCantonId`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L924), [`setParroquiaId`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L925), [`clearSearchState`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L926), [`resetDireccionPayload`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L927).
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1254) (pasa a onClear).

#### [`handleCantonClear`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L930) · función · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Atiende `SearchableSelect.onClear` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `SearchableSelect.onClear`.
- **Actualizaciones de estado o acciones** `setCantonId`, `setParroquiaId`, `clearSearchState`.
- **Llamadas directas en el cuerpo** [`setCantonId`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L931), [`setParroquiaId`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L932), [`clearSearchState`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L933), [`resetDireccionPayload`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L934).
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1264) (pasa a onClear).

#### [`handleParroquiaClear`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L937) · función · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Atiende `SearchableSelect.onClear` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `SearchableSelect.onClear`.
- **Actualizaciones de estado o acciones** `setParroquiaId`, `clearSearchState`.
- **Llamadas directas en el cuerpo** [`setParroquiaId`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L938), [`clearSearchState`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L939).
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1274) (pasa a onClear).

#### [`handleSearch`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L942) · función · asíncrona · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setLocalError`, `setSearchError`, `setIsSearching`, `setHasSearched`, `setSearchResults`, `setReverseError`, `setSelectedSearchItem`, `setIsSearchModeOpen`.
- **Efectos y APIs** `queryParts.push`.
- **Condiciones que evalúa** `isManualFallback`, `ausencia de provinciaId`, `ausencia de cantonId`, `ausencia de parroquiaId`, `street.length`, `ausencia de result.ok`, `coords.lat y coords.lng`.
- **Usa código de** [`searchAddresses`](../../../apps/referidos-app/src/services/addressSearchClient.js#L41) (llama).
- **Llamadas directas en el cuerpo** [`setLocalError`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L943), [`searchValue.trim`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L944), [`setSearchError`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L947), [`queryParts.push`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L965), [`join`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L968), [`queryParts.filter`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L968), [`updateDireccionPayload`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L970), [`setIsSearching`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L989), [`setHasSearched`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L990), [`setSearchResults`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L992), [`setReverseError`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L993), [`setSelectedSearchItem`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L994) y 3 más.
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1046) (pasa a onClick).

#### [`handleConfirmSearch`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1017) · función · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setSelectedSearchItem`.
- **Condiciones que evalúa** `ausencia de selectedSearchItem`.
- **Llamadas directas en el cuerpo** [`applySearchSelection`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1019), [`setSelectedSearchItem`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1020).
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1129) (pasa a onClick).

#### [`input.onFocus`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1032) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `input.onFocus`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setIsSearchModeOpen`.
- **Llamadas directas en el cuerpo** [`setIsSearchModeOpen`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1032).

#### [`input.onChange`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1033) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setSearchValue`, `setSearchResults`, `setSearchError`, `setHasSearched`, `setSelectedSearchItem`, `setIsSearchModeOpen`.
- **Llamadas directas en el cuerpo** [`setSearchValue`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1035), [`setSearchResults`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1036), [`setSearchError`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1037), [`setHasSearched`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1038), [`setSelectedSearchItem`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1039), [`setIsSearchModeOpen`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1040).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1082) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleSelectSuggestion`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1082).

#### [`AddressStepSearch.onBack`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1109) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `AddressStepSearch.onBack`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setIsSearchModeOpen`.
- **Llamadas directas en el cuerpo** [`setIsSearchModeOpen`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1109).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1171) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setShowZoomHint`.
- **Llamadas directas en el cuerpo** [`setShowZoomHint`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1171).

#### [`LeafletMapPicker.onReady`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1183) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `LeafletMapPicker.onReady`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setMapStatus`.
- **Llamadas directas en el cuerpo** [`setMapStatus`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1183).

#### [`LeafletMapPicker.onError`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1184) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `LeafletMapPicker.onError`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setMapStatus`.
- **Llamadas directas en el cuerpo** [`setMapStatus`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1184).

#### [`LeafletMapPicker.onCenterChange`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1185) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `LeafletMapPicker.onCenterChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `nextCenter`.
- **Actualizaciones de estado o acciones** `setCoords`, `setCoordsSource`, `setHasMapMoved`.
- **Condiciones que evalúa** `ausencia de initialMoveSkippedRef.current`, `programmaticMoveRef.current`, `movedEnough`.
- **Llamadas directas en el cuerpo** [`setCoords`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1194), [`setCoordsSource`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1195), [`setHasMapMoved`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1202), [`updateDireccionPayload`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1204).

#### [`LeafletMapPicker.onZoomChange`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1209) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `LeafletMapPicker.onZoomChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `nextZoom`.
- **Actualizaciones de estado o acciones** `setMapZoom`, `setHasMapZoomed`.
- **Condiciones que evalúa** `ausencia de initialZoomSkippedRef.current`, `programmaticZoomRef.current`, `1`.
- **Llamadas directas en el cuerpo** [`setMapZoom`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1216), [`setHasMapZoomed`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1221).

#### [`input.onChange`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1371) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`updateDireccionPayload`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1372).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1390) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleSelectTag`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1390).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1460) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleToggleDay`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1462), [`toggleGroupSelection`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1463).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1498) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openTimePicker`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1499).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1508) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openTimePicker`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1509).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1521) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openGroupPicker`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1522).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1537) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openGroupPicker`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1538).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1554) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openGroupPicker`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1555).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1573) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setExpandedGroup`.
- **Llamadas directas en el cuerpo** [`setExpandedGroup`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1574).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1602) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleToggleDay`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1602).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1617) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openTimePicker`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1618).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1627) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openTimePicker`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1628).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1653) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleToggleDay`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1655), [`toggleGroupSelection`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1656).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1691) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openTimePicker`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1692).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1701) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openTimePicker`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1702).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1714) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openGroupPicker`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1715).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1730) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openGroupPicker`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1731).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1747) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openGroupPicker`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1748).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1766) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setExpandedGroup`.
- **Llamadas directas en el cuerpo** [`setExpandedGroup`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1767).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1795) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleToggleDay`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1795).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1810) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openTimePicker`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1811).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1820) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openTimePicker`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1821).

#### [`input.onChange`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1842) · callback JSX · dentro de [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L54)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`onChangeSucursalPrincipal`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1843).

#### [`formatDisplayParts`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1877) · función

Formatea `Display Parts` para que el consumidor lo pueda presentar.

- **Entradas** `item`.
- **Efectos y APIs** `rawLabel.replace`.
- **Condiciones que evalúa** `filtered.length`, `ausencia de calles y baseCalles`, `calles y houseNumber`, `fallback.length`, `ausencia de rawLabel`.
- **Llamadas directas en el cuerpo** [`parts.filter`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1879), [`filtered.join`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1880), [`formatProvince`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1882), [`trim`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1895), [`join`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1899), [`filter`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1899), [`fallback.join`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1906), [`rawLabel.replace`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1912).
- **Lo usa** [`handleConfirm`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L415) (llama), [`applySearchSelection`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L472) (llama), [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1090) (llama).

#### [`formatProvince`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1915) · función

Formatea `Province` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de text`.
- **Usa código de** [`toTitleCaseEs`](../../../apps/referidos-app/src/utils/textCase.js#L17) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1916), [`toTitleCaseEs`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1918).
- **Lo usa** [`formatDisplayParts`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1882) (llama).

#### [`countDigits`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1921) · función

Procesa `Digits` según el criterio del módulo.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`match`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1922).
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L601) (llama), [`handleCustomChange`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L636) (llama), [`handleCustomConfirm`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L644) (llama).

#### [`haversineDistance`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1927) · función

Implementa `haversine Distance` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `a`, `b`.
- **Llamadas directas en el cuerpo** [`toRad`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1929).
- **Lo usa** [`sortByDistance`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1949) (llama).

#### [`toRad`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1928) · función · dentro de [`haversineDistance`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1927)

Función auxiliar de `haversineDistance` para `to Rad`.

- **Entradas** `value`.
- **Lo usa** [`haversineDistance`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1929) (llama).

#### [`sortByDistance`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1940) · función

Procesa `By Distance` según el criterio del módulo.

- **Entradas** `results`, `origin`.
- **Condiciones que evalúa** `ausencia de aValid y ausencia de bValid`, `ausencia de aValid`, `ausencia de bValid`.
- **Llamadas directas en el cuerpo** [`sort`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1941), [`haversineDistance`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1949).
- **Lo usa** [`handleSearch`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1009) (llama).

#### [`SearchableSelect`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1955) · componente React

Monta `input`, `button`, `XIcon`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{label, placeholder, value, options, onChange, onClear, disabled}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[isOpen, setIsOpen] mediante useState`, `[inputValue, setInputValue] mediante useState`, `[isFocused, setIsFocused] mediante useState`, `inputRef mediante useRef`, `lastSelectedRef mediante useRef`.
- **Interfaz que monta** `input`, `button`, `XIcon`.
- **Hooks que llama** `useState`, `useRef`, `useEffect`.
- **Llamadas directas en el cuerpo** [`filtered.map`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2063).
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1243) (renderiza).

#### [`selected`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1971) · cálculo memorizado · dentro de [`SearchableSelect`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1955)

Procesa `ed` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`options.find`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1971).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1976) (referencia), [`SearchableSelect`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1980) (referencia), [`setTimeout · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2012) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1975) · callback de infraestructura · dentro de [`SearchableSelect`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1955)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SearchableSelect`.

- **Actualizaciones de estado o acciones** `setInputValue`.
- **Condiciones que evalúa** `selected`.
- **Llamadas directas en el cuerpo** [`setInputValue`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1976).

#### [`filtered`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1982) · cálculo memorizado · dentro de [`SearchableSelect`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1955)

Procesa `ed` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de query`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1983), [`inputValue.trim`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1983), [`options.filter`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1985), [`includes`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1986), [`item.nombre.toLowerCase`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1986).
- **Lo usa** [`SearchableSelect`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2058) (accede al módulo).

#### [`handleSelect`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1990) · función · dentro de [`SearchableSelect`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1955)

Maneja `Select` y coordina las acciones indicadas abajo.

- **Entradas** `item`.
- **Actualizaciones de estado o acciones** `setInputValue`, `setIsOpen`.
- **Llamadas directas en el cuerpo** [`onChange`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1992), [`setInputValue`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1993), [`setIsOpen`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1994), [`inputRef.current.blur`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1995).
- **Lo usa** [`button.onMouseDown`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2069) (llama).

#### [`handleClear`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1998) · función · dentro de [`SearchableSelect`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1955)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setInputValue`, `setIsOpen`.
- **Condiciones que evalúa** `ausencia de isFocused`.
- **Llamadas directas en el cuerpo** [`setInputValue`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1999), [`setIsOpen`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2000), [`onClear`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2002), [`inputRef.current.focus`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2004).
- **Lo usa** [`SearchableSelect`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2049) (pasa a onClick).

#### [`handleBlur`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2008) · función · dentro de [`SearchableSelect`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1955)

Atiende `input.onBlur` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `input.onBlur`.
- **Actualizaciones de estado o acciones** `setIsFocused`.
- **Efectos y APIs** `setTimeout`.
- **Llamadas directas en el cuerpo** [`setIsFocused`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2009), [`setTimeout`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2010).
- **Lo usa** [`SearchableSelect`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2041) (pasa a onBlur).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2010) · callback de infraestructura · dentro de [`handleBlur`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2008)

Ejecuta trabajo diferido o periódico iniciado por `handleBlur`.

- **Actualizaciones de estado o acciones** `setIsOpen`, `setInputValue`.
- **Condiciones que evalúa** `ausencia de fallback`.
- **Llamadas directas en el cuerpo** [`setIsOpen`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2011), [`setInputValue`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2014).

#### [`input.onFocus`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2030) · callback JSX · dentro de [`SearchableSelect`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1955)

Responde al evento de interfaz `input.onFocus`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setIsFocused`, `setIsOpen`.
- **Condiciones que evalúa** `ausencia de disabled`.
- **Llamadas directas en el cuerpo** [`setIsFocused`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2031), [`setIsOpen`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2032).

#### [`input.onClick`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2034) · callback JSX · dentro de [`SearchableSelect`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1955)

Responde al evento de interfaz `input.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setIsOpen`.
- **Condiciones que evalúa** `ausencia de disabled`.
- **Llamadas directas en el cuerpo** [`setIsOpen`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2035).

#### [`input.onChange`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2037) · callback JSX · dentro de [`SearchableSelect`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1955)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setInputValue`, `setIsOpen`.
- **Condiciones que evalúa** `ausencia de disabled`.
- **Llamadas directas en el cuerpo** [`setInputValue`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2038), [`setIsOpen`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2039).

#### [`button.onMouseDown`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2048) · callback JSX · dentro de [`SearchableSelect`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1955)

Responde al evento de interfaz `button.onMouseDown`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`event.preventDefault`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2048).

#### [`button.onMouseDown`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2067) · callback JSX · dentro de [`SearchableSelect`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1955)

Responde al evento de interfaz `button.onMouseDown`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`event.preventDefault`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2068), [`handleSelect`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2069).

#### [`CheckIcon`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2084) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1476) (renderiza).

#### [`MinusIcon`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2100) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1480) (renderiza).

#### [`ChevronIcon`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2116) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1580) (renderiza).

#### [`XIcon`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2132) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1175) (renderiza), [`SearchableSelect`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2053) (renderiza).

#### [`PencilIcon`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2149) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1436) (renderiza).

#### [`PinOutlineIcon`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2166) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1025) (renderiza).

#### [`SearchTiltIcon`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2183) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1051) (renderiza).

#### [`CompassIcon`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2200) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1233) (renderiza).

### [`apps/referidos-app/src/auth/steps/UserProfileStep.jsx`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L1)

Captura los datos personales según el rol y la fase del alta.

**Superficie que exporta.** [`UserProfileStep`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L10).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L12) (importa).

**Dependencias del archivo.** `react`, [`../blocks/ErrorBanner`](../../../apps/referidos-app/src/auth/blocks/ErrorBanner.jsx), [`../utils/userProfileUtils`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js).

#### [`UserProfileStep`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L10) · componente React · exportación por defecto

Monta `ErrorBanner`, `input`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{error, inputClassName, nombreDueno, apellidoDueno, genero, fechaNacimiento, subtitle, underageMessage, minAge, onChangeNombre, onChangeApellido, onChangeGenero, onChangeFechaNacimiento, onSubmit, onSkip, innerRef, primaryDisabled}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `ErrorBanner`, `input`, `button`.
- **Usa código de** [`ErrorBanner`](../../../apps/referidos-app/src/auth/blocks/ErrorBanner.jsx#L3) (renderiza).
- **Llamadas directas en el cuerpo** [`genderOptions.map`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L108).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L643) (renderiza).

#### [`birthStatus`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L30) · cálculo memorizado · dentro de [`UserProfileStep`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L10)

Función auxiliar de `UserProfileStep` para `birth Status`.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`getBirthdateStatus`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L108) (llama).
- **Llamadas directas en el cuerpo** [`getBirthdateStatus`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L30).
- **Lo usa** [`UserProfileStep`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L95) (accede al módulo).

#### [`input.onChange`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L64) · callback JSX · dentro de [`UserProfileStep`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L10)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Usa código de** [`normalizeUserName`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L28) (llama).
- **Llamadas directas en el cuerpo** [`onChangeNombre`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L65), [`normalizeUserName`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L65).

#### [`input.onChange`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L76) · callback JSX · dentro de [`UserProfileStep`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L10)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Usa código de** [`normalizeUserName`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L28) (llama).
- **Llamadas directas en el cuerpo** [`onChangeApellido`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L77), [`normalizeUserName`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L77).

#### [`input.onChange`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L90) · callback JSX · dentro de [`UserProfileStep`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L10)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Usa código de** [`formatBirthdateInput`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L36) (llama).
- **Llamadas directas en el cuerpo** [`onChangeFechaNacimiento`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L91), [`formatBirthdateInput`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L91).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L114) · callback JSX · dentro de [`UserProfileStep`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L10)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onChangeGenero`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L114).

### [`apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L1)

Muestra la variante de confirmación de correo que monta el paso VERIFY_EMAIL.

**Superficie que exporta.** [`VerifyEmailStep`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L6).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L19) (importa).

**Dependencias del archivo.** `react`, [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../blocks/EmailVerificationBlock`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx).

#### [`VerifyEmailStep`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L6) · componente React · exportación por defecto

Monta `EmailVerificationBlock`, `input`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{innerRef, emailConfirmed, onContinue, onSkip}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[emailValue, setEmailValue] mediante useState`, `[error, setError] mediante useState`, `[saving, setSaving] mediante useState`, `[acceptsUpdates, setAcceptsUpdates] mediante useState`, `bootstrapAuth mediante useAppStore`, `selector s.bootstrapAuth`.
- **Interfaz que monta** `EmailVerificationBlock`, `input`, `button`.
- **Hooks que llama** `useState`, `useAppStore`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`EmailVerificationBlock`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx#L21) (renderiza).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L759) (renderiza).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L18) · callback de infraestructura · dentro de [`VerifyEmailStep`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L6)

Opera sobre Auth `getUser`. El resultado se adapta al contrato del consumidor.

- **Actualizaciones de estado o acciones** `setEmailValue`.
- **Condiciones que evalúa** `emailValue`, `active y authEmail`.
- **Contrato de datos** Auth `getUser` en [`VerifyEmailStep.jsx:24`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L24).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.getUser`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L24), [`setEmailValue`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L27).

#### [`handleContinue`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L35) · función · asíncrona · dentro de [`VerifyEmailStep`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L6)

Opera sobre Auth `getUser`. El resultado se adapta al contrato del consumidor.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setSaving`, `setError`.
- **Condiciones que evalúa** `saving`, `authErr`, `ausencia de data.user.email_confirmed_at`.
- **Contrato de datos** Auth `getUser` en [`VerifyEmailStep.jsx:40`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L40).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setSaving`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L37), [`setError`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L38), [`supabase.auth.getUser`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L40), [`bootstrapAuth`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L49), [`onContinue`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L50).
- **Lo usa** [`VerifyEmailStep`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L115) (pasa a onClick).

#### [`handleSkip`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L56) · función · asíncrona · dentro de [`VerifyEmailStep`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L6)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setSaving`, `setError`.
- **Condiciones que evalúa** `saving`, `ausencia de userId`, `updErr`.
- **Contrato de datos** Auth `getSession` en [`VerifyEmailStep.jsx:61`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L61), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`VerifyEmailStep.jsx:67`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L67), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`VerifyEmailStep.jsx:67`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L67).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setSaving`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L58), [`setError`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L59), [`supabase.auth.getSession`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L61), [`eq`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L67), [`update`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L67), [`supabase.from`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L67), [`bootstrapAuth`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L75), [`onSkip`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L76).
- **Lo usa** [`VerifyEmailStep`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L123) (pasa a onClick).

#### [`input.onChange`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L101) · callback JSX · dentro de [`VerifyEmailStep`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L6)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setAcceptsUpdates`.
- **Llamadas directas en el cuerpo** [`setAcceptsUpdates`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L101).

### [`apps/referidos-app/src/auth/steps/WelcomeStep.jsx`](../../../apps/referidos-app/src/auth/steps/WelcomeStep.jsx#L1)

Expone las opciones iniciales de acceso y alta que disparan AuthFlow.

**Superficie que exporta.** [`WelcomeStep`](../../../apps/referidos-app/src/auth/steps/WelcomeStep.jsx#L8).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L11) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, [`../blocks/AuthCard`](../../../apps/referidos-app/src/auth/blocks/AuthCard.jsx), [`../blocks/AuthHeader`](../../../apps/referidos-app/src/auth/blocks/AuthHeader.jsx), [`../blocks/ErrorBanner`](../../../apps/referidos-app/src/auth/blocks/ErrorBanner.jsx), [`../blocks/OAuthButtons`](../../../apps/referidos-app/src/auth/blocks/OAuthButtons.jsx).

#### [`WelcomeStep`](../../../apps/referidos-app/src/auth/steps/WelcomeStep.jsx#L8) · componente React · exportación por defecto

Monta `AuthCard`, `ErrorBanner`, `AuthHeader`, `Link`, `MailIcon`, `OAuthButtons`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{error, loading, oauthLoading, oauthProvider, enableApple, onEmail, onGoogle, onFacebook, onApple, onTwitter, onDiscord}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `AuthCard`, `ErrorBanner`, `AuthHeader`, `Link`, `MailIcon`, `OAuthButtons`.
- **Usa código de** [`AuthCard`](../../../apps/referidos-app/src/auth/blocks/AuthCard.jsx#L3) (renderiza), [`ErrorBanner`](../../../apps/referidos-app/src/auth/blocks/ErrorBanner.jsx#L3) (renderiza), [`AuthHeader`](../../../apps/referidos-app/src/auth/blocks/AuthHeader.jsx#L3) (renderiza), [`OAuthButtons`](../../../apps/referidos-app/src/auth/blocks/OAuthButtons.jsx#L3) (renderiza).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L550) (renderiza).

#### [`MailIcon`](../../../apps/referidos-app/src/auth/steps/WelcomeStep.jsx#L81) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`WelcomeStep`](../../../apps/referidos-app/src/auth/steps/WelcomeStep.jsx#L40) (renderiza).

### [`apps/referidos-app/src/auth/utils/authMappers.js`](../../../apps/referidos-app/src/auth/utils/authMappers.js#L1)

Transforma la respuesta de onboarding al estado de pasos y vista.

**Superficie que exporta.** [`splitDireccion`](../../../apps/referidos-app/src/auth/utils/authMappers.js#L1), [`mapNegocioPrefill`](../../../apps/referidos-app/src/auth/utils/authMappers.js#L6), [`mapClientePrefill`](../../../apps/referidos-app/src/auth/utils/authMappers.js#L23).

**Módulos que lo cargan.** [`useAuthPrefill.js`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L3) (importa).

#### [`splitDireccion`](../../../apps/referidos-app/src/auth/utils/authMappers.js#L1) · función · exportado

Implementa `split Direccion` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `rawDireccion = valor por defecto`.
- **Retorno visible o tipo declarado** `calle1`, `calle2`.
- **Llamadas directas en el cuerpo** [`rawDireccion.split`](../../../apps/referidos-app/src/auth/utils/authMappers.js#L2).
- **Lo usa** [`mapNegocioPrefill`](../../../apps/referidos-app/src/auth/utils/authMappers.js#L8) (llama).

#### [`mapNegocioPrefill`](../../../apps/referidos-app/src/auth/utils/authMappers.js#L6) · función · exportado

Construye `Negocio Prefill` a partir de los datos del flujo.

- **Entradas** `{usuario, onboarding}`.
- **Retorno visible o tipo declarado** `nombreDueno`, `apellidoDueno`, `telefono`, `ruc`, `nombreNegocio`, `categoriaNegocio`, `sectorNegocio`, `calle1`, `calle2`.
- **Llamadas directas en el cuerpo** [`splitDireccion`](../../../apps/referidos-app/src/auth/utils/authMappers.js#L8).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L326) (llama).

#### [`mapClientePrefill`](../../../apps/referidos-app/src/auth/utils/authMappers.js#L23) · función · exportado

Construye `Cliente Prefill` a partir de los datos del flujo.

- **Entradas** `{usuario}`.
- **Retorno visible o tipo declarado** `nombreDueno`, `apellidoDueno`, `telefono`.
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L220) (llama).

### [`apps/referidos-app/src/auth/utils/businessDataUtils.js`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L1)

Agrupa transformaciones y comprobaciones de los campos comerciales.

**Superficie que exporta.** [`BUSINESS_NAME_MAX`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L1), [`normalizeBusinessName`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L7), [`normalizeBusinessRuc`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L15), [`getBusinessDataStatus`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L19).

**Módulos que lo cargan.** [`useAuthActions.js`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L17) (importa), [`BusinessDataStep.jsx`](../../../apps/referidos-app/src/auth/steps/BusinessDataStep.jsx#L3) (importa).

#### [`BUSINESS_NAME_MAX`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L1) · variable de módulo · exportado

Declara `BUSINESS_NAME_MAX` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeBusinessName`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L12) (referencia).

#### [`NAME_CLEAN_RE`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L3) · variable de módulo

Declara `NAME_CLEAN_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeBusinessName`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L9) (referencia).

#### [`MULTI_SPACE_RE`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L4) · variable de módulo

Declara `MULTI_SPACE_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeBusinessName`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L10) (referencia).

#### [`RUC_CLEAN_RE`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L5) · variable de módulo

Declara `RUC_CLEAN_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeBusinessRuc`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L16) (referencia).

#### [`normalizeBusinessName`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L7) · función · exportado

Normaliza `Business Name` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value = valor por defecto`.
- **Efectos y APIs** `replace`, `value.replace`.
- **Llamadas directas en el cuerpo** [`trimStart`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L8), [`replace`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L8), [`value.replace`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L8), [`cleaned.slice`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L12).
- **Lo usa** [`getBusinessDataStatus`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L20) (llama), [`handleBusinessData`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L633) (llama), [`input.onChange`](../../../apps/referidos-app/src/auth/steps/BusinessDataStep.jsx#L47) (llama).

#### [`normalizeBusinessRuc`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L15) · función · exportado

Normaliza `Business Ruc` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value = valor por defecto`.
- **Efectos y APIs** `value.replace`.
- **Llamadas directas en el cuerpo** [`slice`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L16), [`value.replace`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L16).
- **Lo usa** [`getBusinessDataStatus`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L21) (llama).

#### [`getBusinessDataStatus`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L19) · función · exportado

Obtiene o resuelve `Business Data Status` para entregarlo al consumidor.

- **Entradas** `{nombreNegocio, ruc, categoriaNegocio}`.
- **Retorno visible o tipo declarado** `nombre`, `ruc`, `categoria`, `canSubmit`.
- **Llamadas directas en el cuerpo** [`normalizeBusinessName`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L20), [`normalizeBusinessRuc`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L21), [`trim`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L22), [`nombreValue.trim`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L23), [`rucValue.trim`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L24).
- **Lo usa** [`handleBusinessData`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L618) (llama).
