# PWA principal · Componentes reutilizables · 2 de 4

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/components/header/Header.jsx`](../../../apps/referidos-app/src/components/header/Header.jsx#L1)
- [`apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L1)
- [`apps/referidos-app/src/components/maps/LeafletMapPicker.jsx`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L1)
- [`apps/referidos-app/src/components/menus/MenuFilters.jsx`](../../../apps/referidos-app/src/components/menus/MenuFilters.jsx#L1)
- [`apps/referidos-app/src/components/menus/MenuLateral.jsx`](../../../apps/referidos-app/src/components/menus/MenuLateral.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalAbandonarRegistro.jsx`](../../../apps/referidos-app/src/components/modals/ModalAbandonarRegistro.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalAccessMethods.jsx`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalAccountVerifySkip.jsx`](../../../apps/referidos-app/src/components/modals/ModalAccountVerifySkip.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalBase.jsx`](../../../apps/referidos-app/src/components/modals/ModalBase.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalBeneficios.jsx`](../../../apps/referidos-app/src/components/modals/ModalBeneficios.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalCliente.jsx`](../../../apps/referidos-app/src/components/modals/ModalCliente.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalConfirmAction.jsx`](../../../apps/referidos-app/src/components/modals/ModalConfirmAction.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalCuentaExistente.jsx`](../../../apps/referidos-app/src/components/modals/ModalCuentaExistente.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx`](../../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalEmailReauth.jsx`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalEmailVerification.jsx`](../../../apps/referidos-app/src/components/modals/ModalEmailVerification.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalForcePasswordChange.jsx`](../../../apps/referidos-app/src/components/modals/ModalForcePasswordChange.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalGrupo.jsx`](../../../apps/referidos-app/src/components/modals/ModalGrupo.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalLocationDenied.jsx`](../../../apps/referidos-app/src/components/modals/ModalLocationDenied.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalLocationPermission.jsx`](../../../apps/referidos-app/src/components/modals/ModalLocationPermission.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalLocationUnavailable.jsx`](../../../apps/referidos-app/src/components/modals/ModalLocationUnavailable.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalNotifications.jsx`](../../../apps/referidos-app/src/components/modals/ModalNotifications.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalPasswordReauth.jsx`](../../../apps/referidos-app/src/components/modals/ModalPasswordReauth.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalPinVerify.jsx`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/components/header/Header.jsx`](../../../apps/referidos-app/src/components/header/Header.jsx#L1)

Arma una cabecera compartida y conecta las variantes o controles ligados a su consumidor.

**Superficie que exporta.** [`Header`](../../../apps/referidos-app/src/components/header/Header.jsx#L16).

**Módulos que lo cargan.** [`MainLayout.jsx`](../../../apps/referidos-app/src/layouts/MainLayout.jsx#L3) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`./cliente/HeaderCliente`](../../../apps/referidos-app/src/components/header/cliente/HeaderCliente.jsx), [`./negocio/HeaderNegocio`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx).

#### [`BRAND_YELLOW`](../../../apps/referidos-app/src/components/header/Header.jsx#L8) · variable de módulo

Declara `BRAND_YELLOW` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`Header`](../../../apps/referidos-app/src/components/header/Header.jsx#L168) (referencia).

#### [`AVATAR_FEMALE`](../../../apps/referidos-app/src/components/header/Header.jsx#L10) · variable de módulo

Declara `AVATAR_FEMALE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`Header`](../../../apps/referidos-app/src/components/header/Header.jsx#L41) (referencia).

#### [`AVATAR_MALE`](../../../apps/referidos-app/src/components/header/Header.jsx#L11) · variable de módulo

Declara `AVATAR_MALE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`Header`](../../../apps/referidos-app/src/components/header/Header.jsx#L43) (referencia).

#### [`COLLAPSED_HEIGHT`](../../../apps/referidos-app/src/components/header/Header.jsx#L13) · variable de módulo

Declara `COLLAPSED_HEIGHT` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`useLayoutEffect · callback`](../../../apps/referidos-app/src/components/header/Header.jsx#L104) (referencia), [`Header`](../../../apps/referidos-app/src/components/header/Header.jsx#L230) (pasa a collapsedHeight).

#### [`SWIPE_THRESHOLD`](../../../apps/referidos-app/src/components/header/Header.jsx#L14) · variable de módulo

Declara `SWIPE_THRESHOLD` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`moveSwipe`](../../../apps/referidos-app/src/components/header/Header.jsx#L143) (referencia).

#### [`Header`](../../../apps/referidos-app/src/components/header/Header.jsx#L16) · componente React · exportación por defecto

Monta `button`, `HeaderNegocio`, `HeaderCliente`, `Link`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{locAllowed, hideLocationBar, onCloseLocationBar, onOpenTier, onOpenGrupo, onOpenMenu, onHeaderHeightChange}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Estado o valores vinculados** `[expanded, setExpanded] mediante useState`, `[locationBarHeight, setLocationBarHeight] mediante useState`, `[overlayTop, setOverlayTop] mediante useState`, `collapsedRef mediante useRef`, `expandedRef mediante useRef`, `locationBarRef mediante useRef`, `desktopRef mediante useRef`, `swipeRef mediante useRef`, `usuario mediante useAppStore`, `selector s.usuario`, `bootstrap mediante useAppStore`, `selector s.bootstrap`, `onboarding mediante useAppStore`, `selector s.onboarding`.
- **Interfaz que monta** `button`, `HeaderNegocio`, `HeaderCliente`, `Link`.
- **Hooks que llama** `useState`, `useLocation`, `useRef`, `useAppStore`, `useLayoutEffect`.
- **Condiciones que evalúa** `role`, `bootstrap o undefined`, `ausencia de usuario o ausencia de onboarding.allowAccess`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`HeaderNegocio`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L10) (renderiza), [`HeaderCliente`](../../../apps/referidos-app/src/components/header/cliente/HeaderCliente.jsx#L4) (renderiza).
- **Llamadas directas en el cuerpo** [`links.map`](../../../apps/referidos-app/src/components/header/Header.jsx#L268), [`isActive`](../../../apps/referidos-app/src/components/header/Header.jsx#L275).
- **Lo usa** [`MainLayout`](../../../apps/referidos-app/src/layouts/MainLayout.jsx#L37) (renderiza).

#### [`isActive`](../../../apps/referidos-app/src/components/header/Header.jsx#L83) · función · dentro de [`Header`](../../../apps/referidos-app/src/components/header/Header.jsx#L16)

Comprueba `Active` para decidir si se admite o continúa la operación.

- **Entradas** `path`.
- **Llamadas directas en el cuerpo** [`location.pathname.startsWith`](../../../apps/referidos-app/src/components/header/Header.jsx#L85).
- **Lo usa** [`Header`](../../../apps/referidos-app/src/components/header/Header.jsx#L275) (llama).

#### [`useLayoutEffect · callback`](../../../apps/referidos-app/src/components/header/Header.jsx#L89) · callback de infraestructura · dentro de [`Header`](../../../apps/referidos-app/src/components/header/Header.jsx#L16)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `Header`.

- **Actualizaciones de estado o acciones** `setLocationBarHeight`, `setOverlayTop`.
- **Condiciones que evalúa** `bootstrap o undefined`, `ausencia de usuario o ausencia de onboarding.allowAccess`, `currentLocationBarHeight`, `onHeaderHeightChange`.
- **Llamadas directas en el cuerpo** [`setLocationBarHeight`](../../../apps/referidos-app/src/components/header/Header.jsx#L98), [`setOverlayTop`](../../../apps/referidos-app/src/components/header/Header.jsx#L112), [`onHeaderHeightChange`](../../../apps/referidos-app/src/components/header/Header.jsx#L115).

#### [`beginSwipe`](../../../apps/referidos-app/src/components/header/Header.jsx#L131) · función · dentro de [`Header`](../../../apps/referidos-app/src/components/header/Header.jsx#L16)

Atiende `HeaderNegocio.onSwipeStart`, `HeaderCliente.onSwipeStart` y aplica la acción vinculada a ese control.

- **Entradas** `event`.
- **Recibe eventos de** `HeaderNegocio.onSwipeStart`, `HeaderCliente.onSwipeStart`.
- **Lo usa** [`Header`](../../../apps/referidos-app/src/components/header/Header.jsx#L231) (pasa a onSwipeStart).

#### [`moveSwipe`](../../../apps/referidos-app/src/components/header/Header.jsx#L137) · función · dentro de [`Header`](../../../apps/referidos-app/src/components/header/Header.jsx#L16)

Coordina cambios de estado durante `move Swipe`.

- **Entradas** `event`, `direction`.
- **Actualizaciones de estado o acciones** `setExpanded`.
- **Condiciones que evalúa** `ausencia de state.active o state.handled`, `direction y delta`.
- **Llamadas directas en el cuerpo** [`setExpanded`](../../../apps/referidos-app/src/components/header/Header.jsx#L144).
- **Lo usa** [`handlePointerMove`](../../../apps/referidos-app/src/components/header/Header.jsx#L160) (llama).

#### [`endSwipe`](../../../apps/referidos-app/src/components/header/Header.jsx#L154) · función · dentro de [`Header`](../../../apps/referidos-app/src/components/header/Header.jsx#L16)

Atiende `HeaderNegocio.onSwipeEnd`, `HeaderCliente.onSwipeEnd` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `HeaderNegocio.onSwipeEnd`, `HeaderCliente.onSwipeEnd`.
- **Lo usa** [`Header`](../../../apps/referidos-app/src/components/header/Header.jsx#L233) (pasa a onSwipeEnd).

#### [`handlePointerMove`](../../../apps/referidos-app/src/components/header/Header.jsx#L159) · función · dentro de [`Header`](../../../apps/referidos-app/src/components/header/Header.jsx#L16)

Atiende `HeaderNegocio.onSwipeMove`, `HeaderCliente.onSwipeMove` y aplica la acción vinculada a ese control.

- **Entradas** `event`.
- **Recibe eventos de** `HeaderNegocio.onSwipeMove`, `HeaderCliente.onSwipeMove`.
- **Llamadas directas en el cuerpo** [`moveSwipe`](../../../apps/referidos-app/src/components/header/Header.jsx#L160).
- **Lo usa** [`Header`](../../../apps/referidos-app/src/components/header/Header.jsx#L232) (pasa a onSwipeMove).

#### [`div.onClick`](../../../apps/referidos-app/src/components/header/Header.jsx#L312) · callback JSX · dentro de [`Header`](../../../apps/referidos-app/src/components/header/Header.jsx#L16)

Responde al evento de interfaz `div.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setExpanded`.
- **Llamadas directas en el cuerpo** [`setExpanded`](../../../apps/referidos-app/src/components/header/Header.jsx#L312).

### [`apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L1)

Compone la variante de cabecera negocio en el árbol components/header, diferente de negocio/layout.

**Superficie que exporta.** [`HeaderNegocio`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L10).

**Módulos que lo cargan.** [`Header.jsx`](../../../apps/referidos-app/src/components/header/Header.jsx#L6) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`BRAND_PURPLE`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L5) · variable de módulo

Declara `BRAND_PURPLE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`HeaderNegocio`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L101) (referencia).

#### [`SUBSCRIPTION_DEFAULT`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L6) · variable de módulo

Declara `SUBSCRIPTION_DEFAULT` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`HeaderNegocio`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L158) (referencia).

#### [`DEFAULT_SECTOR`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L7) · variable de módulo

Declara `DEFAULT_SECTOR` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`HeaderNegocio`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L25) (referencia).

#### [`DEFAULT_DIRECCION`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L8) · variable de módulo

Declara `DEFAULT_DIRECCION` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`HeaderNegocio`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L34) (referencia).

#### [`HeaderNegocio`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L10) · componente React · exportación por defecto

Monta `button`, `CategoryIcon`, `Menu`, `Store`, `img`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{usuario, negocio, avatarSrc, expanded, setExpanded, onOpenMenu, collapsedRef, expandedRef, collapsedHeight, onSwipeStart, onSwipeMove, onSwipeEnd}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `titleMeasureRef mediante useRef`, `[splitIndex, setSplitIndex] mediante useState`, `[isCollapsing, setIsCollapsing] mediante useState`, `[revealActive, setRevealActive] mediante useState`.
- **Interfaz que monta** `button`, `CategoryIcon`, `Menu`, `Store`, `img`.
- **Hooks que llama** `useRef`, `useState`, `useLayoutEffect`, `useEffect`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L26), [`filter`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L27), [`map`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L27), [`rawDireccion.split`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L27), [`item.trim`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L29), [`nombreNegocio.slice`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L48).
- **Lo usa** [`Header`](../../../apps/referidos-app/src/components/header/Header.jsx#L221) (renderiza).

#### [`handleExpand`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L39) · función · dentro de [`HeaderNegocio`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L10)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setExpanded`.
- **Llamadas directas en el cuerpo** [`setExpanded`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L39).
- **Lo usa** [`HeaderNegocio`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L129) (pasa a onClick).

#### [`useLayoutEffect · callback`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L54) · callback de infraestructura · dentro de [`HeaderNegocio`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L10)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `HeaderNegocio`.

- **Actualizaciones de estado o acciones** `setStart`, `setEnd`, `setSplitIndex`.
- **Condiciones que evalúa** `ausencia de expanded o ausencia de titleMeasureRef.current`, `ausencia de text o ausencia de textNode`, `rects.length`.
- **Llamadas directas en el cuerpo** [`document.createRange`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L61), [`range.setStart`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L68), [`range.setEnd`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L69), [`range.getClientRects`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L70), [`setSplitIndex`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L79).

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L82) · callback de infraestructura · dentro de [`HeaderNegocio`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L10)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `HeaderNegocio`.

- **Actualizaciones de estado o acciones** `setIsCollapsing`, `setRevealActive`, `clearTimeout`.
- **Efectos y APIs** `requestAnimationFrame`, `setTimeout`, `clearTimeout`.
- **Condiciones que evalúa** `expanded`.
- **Llamadas directas en el cuerpo** [`setIsCollapsing`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L84), [`setRevealActive`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L85), [`requestAnimationFrame`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L91), [`setTimeout`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L92), [`cancelAnimationFrame`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L95), [`clearTimeout`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L96).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L92) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L82)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setIsCollapsing`.
- **Llamadas directas en el cuerpo** [`setIsCollapsing`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L92).

#### [`button.onClick`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L222) · callback JSX · dentro de [`HeaderNegocio`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L10)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onOpenMenu`](../../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx#L222).

### [`apps/referidos-app/src/components/maps/LeafletMapPicker.jsx`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L1)

Integra Leaflet para que la selección y movimiento del mapa se conviertan en coordenadas de formulario.

**Superficie que exporta.** [`LeafletMapPicker`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L5).

**Módulos que lo cargan.** [`UserAddressStep.jsx`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L11) (importa).

**Dependencias del archivo.** `react`, `leaflet`, [`../../config/runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js).

#### [`LeafletMapPicker`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L5) · componente React · exportación por defecto

Monta `PinIcon`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{center, zoom, animateZoom, onCenterChange, onZoomChange, onReady, onError, className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `containerRef mediante useRef`, `mapRef mediante useRef`, `onCenterChangeRef mediante useRef`, `onZoomChangeRef mediante useRef`, `onReadyRef mediante useRef`, `onErrorRef mediante useRef`.
- **Interfaz que monta** `PinIcon`.
- **Hooks que llama** `useRef`, `useEffect`.
- **Usa código de** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L81) (accede al módulo).
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1180) (renderiza).

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L31) · callback de infraestructura · dentro de [`LeafletMapPicker`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L5)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `LeafletMapPicker`.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L35) · callback de infraestructura · dentro de [`LeafletMapPicker`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L5)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `LeafletMapPicker`.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L39) · callback de infraestructura · dentro de [`LeafletMapPicker`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L5)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `LeafletMapPicker`.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L43) · callback de infraestructura · dentro de [`LeafletMapPicker`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L5)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `LeafletMapPicker`.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L47) · callback de infraestructura · dentro de [`LeafletMapPicker`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L5)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `LeafletMapPicker`.

- **Actualizaciones de estado o acciones** `setPosition`, `setPrefix`, `setView`.
- **Condiciones que evalúa** `ausencia de containerRef.current o mapRef.current`, `mapInstance.attributionControl.setPosition`, `mapInstance.attributionControl.setPrefix`, `mapInstance`.
- **Llamadas directas en el cuerpo** [`L.map`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L55), [`mapInstance.attributionControl.setPosition`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L62), [`addTo`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L65), [`L.tileLayer`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L65), [`mapInstance.attributionControl.setPrefix`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L71), [`mapInstance.setView`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L74), [`mapInstance.on`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L88), [`onReadyRef.current`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L91), [`mapInstance.remove`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L94), [`onErrorRef.current`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L97), [`mapInstance.off`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L102).

#### [`handleMoveEnd`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L76) · función asignada · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L47)

Maneja `Move End` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`mapInstance.getCenter`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L77), [`onCenterChangeRef.current`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L78).

#### [`handleZoomEnd`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L83) · función asignada · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L47)

Maneja `Zoom End` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`mapInstance.getZoom`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L84), [`onZoomChangeRef.current`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L85).

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L109) · callback de infraestructura · dentro de [`LeafletMapPicker`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L5)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `LeafletMapPicker`.

- **Actualizaciones de estado o acciones** `setView`.
- **Condiciones que evalúa** `ausencia de map o ausencia de Number.isFinite o ausencia de Number.isFinite`, `ausencia de centerChanged y ausencia de zoomChanged`.
- **Llamadas directas en el cuerpo** [`map.getCenter`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L112), [`map.getZoom`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L113), [`map.setView`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L120).

#### [`PinIcon`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L133) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`LeafletMapPicker`](../../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx#L127) (renderiza).

### [`apps/referidos-app/src/components/menus/MenuFilters.jsx`](../../../apps/referidos-app/src/components/menus/MenuFilters.jsx#L1)

Muestra opciones de filtrado y comunica selección sin poseer el listado principal.

**Superficie que exporta.** [`MenuFilters`](../../../apps/referidos-app/src/components/menus/MenuFilters.jsx#L4).

**Módulos que lo cargan.** [`ClienteInicio.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L4) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`MenuFilters`](../../../apps/referidos-app/src/components/menus/MenuFilters.jsx#L4) · componente React · exportación por defecto

Monta `Filter`, `button`, `select`, `input`, `SlidersHorizontal`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onClose}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[categoria, setCategoria] mediante useState`, `[sector, setSector] mediante useState`, `[descuento, setDescuento] mediante useState`, `[orden, setOrden] mediante useState`.
- **Interfaz que monta** `Filter`, `button`, `select`, `input`, `SlidersHorizontal`.
- **Hooks que llama** `useState`.
- **Lo usa** [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L213) (renderiza).

#### [`select.onChange`](../../../apps/referidos-app/src/components/menus/MenuFilters.jsx#L40) · callback JSX · dentro de [`MenuFilters`](../../../apps/referidos-app/src/components/menus/MenuFilters.jsx#L4)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setCategoria`.
- **Llamadas directas en el cuerpo** [`setCategoria`](../../../apps/referidos-app/src/components/menus/MenuFilters.jsx#L40).

#### [`input.onChange`](../../../apps/referidos-app/src/components/menus/MenuFilters.jsx#L56) · callback JSX · dentro de [`MenuFilters`](../../../apps/referidos-app/src/components/menus/MenuFilters.jsx#L4)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setSector`.
- **Llamadas directas en el cuerpo** [`setSector`](../../../apps/referidos-app/src/components/menus/MenuFilters.jsx#L56).

#### [`select.onChange`](../../../apps/referidos-app/src/components/menus/MenuFilters.jsx#L68) · callback JSX · dentro de [`MenuFilters`](../../../apps/referidos-app/src/components/menus/MenuFilters.jsx#L4)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setDescuento`.
- **Llamadas directas en el cuerpo** [`setDescuento`](../../../apps/referidos-app/src/components/menus/MenuFilters.jsx#L68).

#### [`select.onChange`](../../../apps/referidos-app/src/components/menus/MenuFilters.jsx#L86) · callback JSX · dentro de [`MenuFilters`](../../../apps/referidos-app/src/components/menus/MenuFilters.jsx#L4)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setOrden`.
- **Llamadas directas en el cuerpo** [`setOrden`](../../../apps/referidos-app/src/components/menus/MenuFilters.jsx#L86).

#### [`button.onClick`](../../../apps/referidos-app/src/components/menus/MenuFilters.jsx#L102) · callback JSX · dentro de [`MenuFilters`](../../../apps/referidos-app/src/components/menus/MenuFilters.jsx#L4)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setCategoria`, `setSector`, `setDescuento`, `setOrden`.
- **Llamadas directas en el cuerpo** [`setCategoria`](../../../apps/referidos-app/src/components/menus/MenuFilters.jsx#L103), [`setSector`](../../../apps/referidos-app/src/components/menus/MenuFilters.jsx#L104), [`setDescuento`](../../../apps/referidos-app/src/components/menus/MenuFilters.jsx#L105), [`setOrden`](../../../apps/referidos-app/src/components/menus/MenuFilters.jsx#L106).

### [`apps/referidos-app/src/components/menus/MenuLateral.jsx`](../../../apps/referidos-app/src/components/menus/MenuLateral.jsx#L1)

Compone el menú lateral de navegación y sus acciones de sesión, usado desde layouts de rol.

**Superficie que exporta.** [`MenuLateral`](../../../apps/referidos-app/src/components/menus/MenuLateral.jsx#L7).

**Módulos que lo cargan.** [`ClienteLayout.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L5) (importa), [`MainLayout.jsx`](../../../apps/referidos-app/src/layouts/MainLayout.jsx#L5) (importa), [`NegocioLayout.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L5) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, `lucide-react`, [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../../cliente/services/clienteUI`](../../../apps/referidos-app/src/cliente/services/clienteUI.js).

#### [`MenuLateral`](../../../apps/referidos-app/src/components/menus/MenuLateral.jsx#L7) · componente React · exportación por defecto

Monta `img`, `button`, `X`, `Link`, `User`, `QrCode`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{visible, onClose}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `bootstrap mediante useAppStore`, `selector s.bootstrap`, `onboarding mediante useAppStore`, `selector s.onboarding`, `logout mediante useAppStore`, `selector s.logout`.
- **Interfaz que monta** `img`, `button`, `X`, `Link`, `User`, `QrCode`, `LogOut`.
- **Hooks que llama** `useAppStore`, `useNavigate`.
- **Condiciones que evalúa** `ausencia de visible`, `bootstrap o undefined`, `ausencia de usuario o ausencia de onboarding.allowAccess`, `ausencia de usuario.role`, `ausencia de base`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`getAvatarSrc`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L116) (llama), [`getRoleLabel`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L70) (llama).
- **Llamadas directas en el cuerpo** [`getAvatarSrc`](../../../apps/referidos-app/src/components/menus/MenuLateral.jsx#L50), [`getRoleLabel`](../../../apps/referidos-app/src/components/menus/MenuLateral.jsx#L58).
- **Lo usa** [`ClienteLayoutInner`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L311) (renderiza), [`MainLayout`](../../../apps/referidos-app/src/layouts/MainLayout.jsx#L74) (renderiza), [`NegocioLayoutInner`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L314) (renderiza).

#### [`button.onClick`](../../../apps/referidos-app/src/components/menus/MenuLateral.jsx#L93) · callback JSX · asíncrona · dentro de [`MenuLateral`](../../../apps/referidos-app/src/components/menus/MenuLateral.jsx#L7)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigate`.
- **Llamadas directas en el cuerpo** [`logout`](../../../apps/referidos-app/src/components/menus/MenuLateral.jsx#L95), [`onClose`](../../../apps/referidos-app/src/components/menus/MenuLateral.jsx#L97), [`navigate`](../../../apps/referidos-app/src/components/menus/MenuLateral.jsx#L98).

### [`apps/referidos-app/src/components/modals/ModalAbandonarRegistro.jsx`](../../../apps/referidos-app/src/components/modals/ModalAbandonarRegistro.jsx#L1)

Pide confirmar salida del alta para evitar descartar pasos por accidente.

**Superficie que exporta.** [`ModalAbandonarRegistro`](../../../apps/referidos-app/src/components/modals/ModalAbandonarRegistro.jsx#L4).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L7) (importa).

**Dependencias del archivo.** `react`, [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js).

#### [`ModalAbandonarRegistro`](../../../apps/referidos-app/src/components/modals/ModalAbandonarRegistro.jsx#L4) · componente React · exportación por defecto

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onAbandon, onStay}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`.
- **Hooks que llama** `useModal`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L37) (referencia).

#### [`handleAbandon`](../../../apps/referidos-app/src/components/modals/ModalAbandonarRegistro.jsx#L7) · función · dentro de [`ModalAbandonarRegistro`](../../../apps/referidos-app/src/components/modals/ModalAbandonarRegistro.jsx#L4)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Efectos y APIs** `closeModal`.
- **Llamadas directas en el cuerpo** [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalAbandonarRegistro.jsx#L8), [`onAbandon`](../../../apps/referidos-app/src/components/modals/ModalAbandonarRegistro.jsx#L9).
- **Lo usa** [`ModalAbandonarRegistro`](../../../apps/referidos-app/src/components/modals/ModalAbandonarRegistro.jsx#L48) (pasa a onClick).

#### [`handleStay`](../../../apps/referidos-app/src/components/modals/ModalAbandonarRegistro.jsx#L12) · función · dentro de [`ModalAbandonarRegistro`](../../../apps/referidos-app/src/components/modals/ModalAbandonarRegistro.jsx#L4)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Efectos y APIs** `closeModal`.
- **Llamadas directas en el cuerpo** [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalAbandonarRegistro.jsx#L13), [`onStay`](../../../apps/referidos-app/src/components/modals/ModalAbandonarRegistro.jsx#L14).
- **Lo usa** [`ModalAbandonarRegistro`](../../../apps/referidos-app/src/components/modals/ModalAbandonarRegistro.jsx#L56) (pasa a onClick).

### [`apps/referidos-app/src/components/modals/ModalAccessMethods.jsx`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L1)

Expone acciones para activar o revisar métodos de desbloqueo local.

**Superficie que exporta.** [`ModalAccessMethods`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L18).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L19) (importa).

**Dependencias del archivo.** `lucide-react`, `react`, [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../../hooks/usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js), [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js), [`../../services/secureStorageService`](../../../apps/referidos-app/src/services/secureStorageService.js).

#### [`ModalAccessMethods`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L18) · componente React · exportación por defecto

Monta `button`, `ArrowLeft`, `input`, `Fingerprint`, `Lock`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{initialView, initialFingerprintEnabled, initialPinEnabled, errorMessage}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `setAccessMethods mediante useAppStore`, `selector s.setAccessMethods`, `setUser mediante useAppStore`, `selector s.setUser`, `[view, setView] mediante useState`, `[fingerprintEnabled] mediante useState`, `[pinEnabled, setPinEnabled] mediante useState`, `[error, setError] mediante useState`, `[skipPrompt, setSkipPrompt] mediante useState`, `[webauthnAvailable, setWebauthnAvailable] mediante useState`, `prevViewRef mediante useRef`.
- **Interfaz que monta** `button`, `ArrowLeft`, `input`, `Fingerprint`, `Lock`.
- **Hooks que llama** `useModal`, `useAppStore`, `useState`, `useRef`, `useEffect`, `usePinSetup`.
- **Condiciones que evalúa** `view`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama), [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L3) (llama).
- **Llamadas directas en el cuerpo** [`pinSetup.pinSlots.findIndex`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L196), [`pinSetup.pinSlots.map`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L234).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L49) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L41) · callback de infraestructura · dentro de [`ModalAccessMethods`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L18)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ModalAccessMethods`.

- **Actualizaciones de estado o acciones** `setSkipPrompt`.
- **Efectos y APIs** `window.localStorage.getItem`.
- **Condiciones que evalúa** `ausencia de skipKey`.
- **Llamadas directas en el cuerpo** [`window.localStorage.getItem`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L43), [`setSkipPrompt`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L44).

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L47) · callback de infraestructura · dentro de [`ModalAccessMethods`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L18)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ModalAccessMethods`.

- **Actualizaciones de estado o acciones** `setWebauthnAvailable`.
- **Condiciones que evalúa** `ausencia de active`.
- **Usa código de** [`getSecureStorageMode`](../../../apps/referidos-app/src/services/secureStorageService.js#L56) (llama).
- **Llamadas directas en el cuerpo** [`getSecureStorageMode`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L50), [`setWebauthnAvailable`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L52).

#### [`savePin`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L59) · callback React · asíncrona · dentro de [`ModalAccessMethods`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L18)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Entradas** `pinValue`.
- **Retorno visible o tipo declarado** `ok`, `error`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setAccessMethods`, `setUser`.
- **Efectos y APIs** `window.crypto.getRandomValues`.
- **Condiciones que evalúa** `ausencia de userId`, `ausencia de webauthnAvailable`, `ausencia de existingSecret`, `ausencia de saved.ok`, `updErr`, `usuario`.
- **Contrato de datos** Auth `getSession` en [`ModalAccessMethods.jsx:60`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L60), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`ModalAccessMethods.jsx:85`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L85), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`ModalAccessMethods.jsx:85`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L85).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo), [`loadDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L227) (llama), [`saveDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L219) (llama), [`generatePinSalt`](../../../apps/referidos-app/src/services/secureStorageService.js#L155) (llama), [`hashPin`](../../../apps/referidos-app/src/services/secureStorageService.js#L158) (llama), [`savePinHash`](../../../apps/referidos-app/src/services/secureStorageService.js#L199) (llama).
- **Llamadas directas en el cuerpo** [`supabase.auth.getSession`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L60), [`loadDeviceSecret`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L68), [`window.crypto.getRandomValues`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L70), [`btoa`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L71), [`saveDeviceSecret`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L72), [`toISOString`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L72), [`generatePinSalt`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L74), [`hashPin`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L75), [`savePinHash`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L76), [`eq`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L85), [`update`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L85), [`supabase.from`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L85) y 2 más.
- **Lo usa** [`ModalAccessMethods`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L99) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L101) · callback de infraestructura · dentro de [`ModalAccessMethods`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L18)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ModalAccessMethods`.

- **Condiciones que evalúa** `prevViewRef.current y view`.
- **Llamadas directas en el cuerpo** [`pinSetup.focusHiddenInput`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L103).

#### [`handleFingerprint`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L108) · función · asíncrona · dentro de [`ModalAccessMethods`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L18)

Opera sobre Auth `getUser`. El resultado se adapta al contrato del consumidor.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setError`.
- **Efectos y APIs** `openModal`.
- **Condiciones que evalúa** `ausencia de webauthnAvailable`.
- **Contrato de datos** Auth `getUser` en [`ModalAccessMethods.jsx:114`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L114).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L109), [`supabase.auth.getUser`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L114), [`openModal`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L116).
- **Lo usa** [`ModalAccessMethods`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L364) (pasa a onClick).

#### [`onConfirm`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L120) · función · asíncrona · dentro de [`handleFingerprint`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L108)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Entradas** `credentialId`.
- **Actualizaciones de estado o acciones** `setAccessMethods`, `setUser`.
- **Efectos y APIs** `openModal`, `window.crypto.getRandomValues`.
- **Condiciones que evalúa** `ausencia de userId`, `ausencia de existingSecret`, `credentialId`, `updErr`, `usuario`.
- **Contrato de datos** Auth `getSession` en [`ModalAccessMethods.jsx:121`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L121), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`ModalAccessMethods.jsx:143`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L143), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`ModalAccessMethods.jsx:143`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L143).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo), [`loadDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L227) (llama), [`saveDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L219) (llama), [`saveBiometricToken`](../../../apps/referidos-app/src/services/secureStorageService.js#L179) (llama).
- **Llamadas directas en el cuerpo** [`supabase.auth.getSession`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L121), [`openModal`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L124), [`loadDeviceSecret`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L131), [`window.crypto.getRandomValues`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L133), [`btoa`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L134), [`saveDeviceSecret`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L135), [`toISOString`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L135), [`saveBiometricToken`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L138), [`eq`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L143), [`update`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L143), [`supabase.from`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L143), [`setAccessMethods`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L155) y 1 más.

#### [`onError`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L165) · función · dentro de [`handleFingerprint`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L108)

Maneja el valor de error y coordina las acciones indicadas abajo.

- **Entradas** `message`.
- **Efectos y APIs** `openModal`.
- **Llamadas directas en el cuerpo** [`openModal`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L166).

#### [`onCancel`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L172) · función · dentro de [`handleFingerprint`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L108)

Maneja `Cancel` y coordina las acciones indicadas abajo.

- **Efectos y APIs** `openModal`.
- **Llamadas directas en el cuerpo** [`openModal`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L173).

#### [`handlePinConfirm`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L182) · función · asíncrona · dentro de [`ModalAccessMethods`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L18)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setPinEnabled`, `setView`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Llamadas directas en el cuerpo** [`pinSetup.handlePinConfirm`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L183), [`setPinEnabled`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L185), [`pinSetup.resetPinForm`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L186), [`setView`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L187).
- **Lo usa** [`ModalAccessMethods`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L325) (pasa a onClick).

#### [`button.onClick`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L203) · callback JSX · dentro de [`ModalAccessMethods`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L18)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setView`, `setError`.
- **Llamadas directas en el cuerpo** [`pinSetup.resetPinForm`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L204), [`setView`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L205), [`setError`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L206).

#### [`input.onChange`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L226) · callback JSX · dentro de [`ModalAccessMethods`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L18)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`pinSetup.updatePinValueDirect`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L226).

#### [`input.onFocus`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L227) · callback JSX · dentro de [`ModalAccessMethods`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L18)

Responde al evento de interfaz `input.onFocus`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setPinFocus`.
- **Llamadas directas en el cuerpo** [`pinSetup.setPinFocus`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L227).

#### [`input.onBlur`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L228) · callback JSX · dentro de [`ModalAccessMethods`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L18)

Responde al evento de interfaz `input.onBlur`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setPinFocus`.
- **Llamadas directas en el cuerpo** [`pinSetup.setPinFocus`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L228).

#### [`button.onClick`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L373) · callback JSX · dentro de [`ModalAccessMethods`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L18)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setError`, `setView`.
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L374), [`setView`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L375).

#### [`input.onChange`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L388) · callback JSX · dentro de [`ModalAccessMethods`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L18)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setSkipPrompt`, `setItem`.
- **Efectos y APIs** `window.localStorage.setItem`, `window.localStorage.removeItem`.
- **Condiciones que evalúa** `skipKey`, `next`.
- **Llamadas directas en el cuerpo** [`setSkipPrompt`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L390), [`window.localStorage.setItem`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L393), [`window.localStorage.removeItem`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L395).

### [`apps/referidos-app/src/components/modals/ModalAccountVerifySkip.jsx`](../../../apps/referidos-app/src/components/modals/ModalAccountVerifySkip.jsx#L1)

Pide confirmación antes de omitir la verificación si el flujo habilita esa opción.

**Superficie que exporta.** [`ModalAccountVerifySkip`](../../../apps/referidos-app/src/components/modals/ModalAccountVerifySkip.jsx#L3).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L18) (importa).

**Dependencias del archivo.** [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js).

#### [`ModalAccountVerifySkip`](../../../apps/referidos-app/src/components/modals/ModalAccountVerifySkip.jsx#L3) · componente React · exportación por defecto

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onConfirm}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`.
- **Hooks que llama** `useModal`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L48) (referencia).

#### [`button.onClick`](../../../apps/referidos-app/src/components/modals/ModalAccountVerifySkip.jsx#L26) · callback JSX · dentro de [`ModalAccountVerifySkip`](../../../apps/referidos-app/src/components/modals/ModalAccountVerifySkip.jsx#L3)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `closeModal`.
- **Llamadas directas en el cuerpo** [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalAccountVerifySkip.jsx#L27), [`onConfirm`](../../../apps/referidos-app/src/components/modals/ModalAccountVerifySkip.jsx#L28).

### [`apps/referidos-app/src/components/modals/ModalBase.jsx`](../../../apps/referidos-app/src/components/modals/ModalBase.jsx#L1)

Implementa el contenedor común de diálogo, overlay y cierre para piezas de modal.

**Superficie que exporta.** [`ModalBase`](../../../apps/referidos-app/src/components/modals/ModalBase.jsx#L6).

**Módulos que lo cargan.** [`ModalBeneficios.jsx`](../../../apps/referidos-app/src/components/modals/ModalBeneficios.jsx#L3) (importa), [`ModalCodigoNegocio.jsx`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L3) (importa), [`ModalTier.jsx`](../../../apps/referidos-app/src/components/modals/ModalTier.jsx#L3) (importa).

**Dependencias del archivo.** `react`, [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js).

#### [`ModalBase`](../../../apps/referidos-app/src/components/modals/ModalBase.jsx#L6) · componente React · exportación por defecto

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{children, title}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`.
- **Hooks que llama** `useModal`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Lo usa** [`ModalBeneficios`](../../../apps/referidos-app/src/components/modals/ModalBeneficios.jsx#L54) (renderiza), [`ModalCodigoNegocio`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L41) (renderiza), [`ModalTier`](../../../apps/referidos-app/src/components/modals/ModalTier.jsx#L19) (renderiza).

### [`apps/referidos-app/src/components/modals/ModalBeneficios.jsx`](../../../apps/referidos-app/src/components/modals/ModalBeneficios.jsx#L1)

Muestra información ampliada de beneficios desde una pantalla de producto.

**Superficie que exporta.** [`ModalBeneficios`](../../../apps/referidos-app/src/components/modals/ModalBeneficios.jsx#L6).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L4) (importa).

**Dependencias del archivo.** `react`, [`./ModalBase`](../../../apps/referidos-app/src/components/modals/ModalBase.jsx), [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js).

#### [`ModalBeneficios`](../../../apps/referidos-app/src/components/modals/ModalBeneficios.jsx#L6) · componente React · exportación por defecto

Monta `ModalBase`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `ModalBase`, `button`.
- **Hooks que llama** `useModal`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama), [`ModalBase`](../../../apps/referidos-app/src/components/modals/ModalBase.jsx#L6) (renderiza).
- **Llamadas directas en el cuerpo** [`beneficios.map`](../../../apps/referidos-app/src/components/modals/ModalBeneficios.jsx#L72), [`b.list.map`](../../../apps/referidos-app/src/components/modals/ModalBeneficios.jsx#L84).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L34) (referencia).

#### [`button.onClick`](../../../apps/referidos-app/src/components/modals/ModalBeneficios.jsx#L56) · callback JSX · dentro de [`ModalBeneficios`](../../../apps/referidos-app/src/components/modals/ModalBeneficios.jsx#L6)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `openModal`.
- **Llamadas directas en el cuerpo** [`openModal`](../../../apps/referidos-app/src/components/modals/ModalBeneficios.jsx#L56).

### [`apps/referidos-app/src/components/modals/ModalCliente.jsx`](../../../apps/referidos-app/src/components/modals/ModalCliente.jsx#L1)

Encapsula una composición de diálogo para la experiencia de cliente.

**Superficie que exporta.** [`ModalCliente`](../../../apps/referidos-app/src/components/modals/ModalCliente.jsx#L6).

**Dependencias del archivo.** `react`, `../context/AppContext`.

#### [`ModalCliente`](../../../apps/referidos-app/src/components/modals/ModalCliente.jsx#L6) · componente React · exportación por defecto

Monta `input`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onClose}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `{login} mediante useContext`, `[email, setEmail] mediante useState`, `[password, setPassword] mediante useState`, `[error, setError] mediante useState`.
- **Interfaz que monta** `input`, `button`.
- **Hooks que llama** `useContext`, `useState`.
- **Llamadas directas en el cuerpo** [`encodeURIComponent`](../../../apps/referidos-app/src/components/modals/ModalCliente.jsx#L43).

#### [`handleLogin`](../../../apps/referidos-app/src/components/modals/ModalCliente.jsx#L12) · función · dentro de [`ModalCliente`](../../../apps/referidos-app/src/components/modals/ModalCliente.jsx#L6)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setError`.
- **Condiciones que evalúa** `ausencia de ok`.
- **Llamadas directas en el cuerpo** [`login`](../../../apps/referidos-app/src/components/modals/ModalCliente.jsx#L13), [`setError`](../../../apps/referidos-app/src/components/modals/ModalCliente.jsx#L14), [`onClose`](../../../apps/referidos-app/src/components/modals/ModalCliente.jsx#L15).
- **Lo usa** [`ModalCliente`](../../../apps/referidos-app/src/components/modals/ModalCliente.jsx#L41) (pasa a onClick).

#### [`input.onChange`](../../../apps/referidos-app/src/components/modals/ModalCliente.jsx#L27) · callback JSX · dentro de [`ModalCliente`](../../../apps/referidos-app/src/components/modals/ModalCliente.jsx#L6)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setEmail`.
- **Llamadas directas en el cuerpo** [`setEmail`](../../../apps/referidos-app/src/components/modals/ModalCliente.jsx#L27).

#### [`input.onChange`](../../../apps/referidos-app/src/components/modals/ModalCliente.jsx#L34) · callback JSX · dentro de [`ModalCliente`](../../../apps/referidos-app/src/components/modals/ModalCliente.jsx#L6)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setPassword`.
- **Llamadas directas en el cuerpo** [`setPassword`](../../../apps/referidos-app/src/components/modals/ModalCliente.jsx#L34).

### [`apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L1)

Solicita el código de registro de un negocio y entrega el valor al flujo que lo valida.

**Superficie que exporta.** [`ModalCodigoNegocio`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L17).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L5) (importa).

**Dependencias del archivo.** `react`, [`./ModalBase`](../../../apps/referidos-app/src/components/modals/ModalBase.jsx), [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js), [`../../utils/validators`](../../../apps/referidos-app/src/utils/validators.js).

#### [`DEFAULT_CODES`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L7) · variable de módulo

Conserva la lista de `DEFAULT CODES` usada por el módulo.

- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L30) (accede al módulo).

#### [`isPartialFormat`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L9) · función

Comprueba `Partial Format` para decidir si se admite o continúa la operación.

- **Entradas** `code`.
- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `ausencia de code`, `code`, `ausencia de code.startsWith`.
- **Llamadas directas en el cuerpo** [`code.startsWith`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L12), [`code.slice`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L13), [`test`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L14).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L28) (llama), [`input.onChange`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L57) (llama).

#### [`ModalCodigoNegocio`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L17) · componente React · exportación por defecto

Monta `ModalBase`, `input`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onConfirm}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[codigo, setCodigo] mediante useState`, `[valid, setValid] mediante useState`, `[formatOk, setFormatOk] mediante useState`.
- **Interfaz que monta** `ModalBase`, `input`, `button`.
- **Hooks que llama** `useModal`, `useState`, `useEffect`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama), [`ModalBase`](../../../apps/referidos-app/src/components/modals/ModalBase.jsx#L6) (renderiza).
- **Llamadas directas en el cuerpo** [`encodeURIComponent`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L24).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L35) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L26) · callback de infraestructura · dentro de [`ModalCodigoNegocio`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L17)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ModalCodigoNegocio`.

- **Actualizaciones de estado o acciones** `setFormatOk`, `setValid`.
- **Usa código de** [`CODE_RE`](../../../apps/referidos-app/src/utils/validators.js#L3) (accede al módulo).
- **Llamadas directas en el cuerpo** [`codigo.toUpperCase`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L27), [`isPartialFormat`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L28), [`setFormatOk`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L29), [`CODE_RE.test`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L30), [`DEFAULT_CODES.includes`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L30), [`setValid`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L31).

#### [`handleNext`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L34) · función · dentro de [`ModalCodigoNegocio`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L17)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Efectos y APIs** `closeModal`.
- **Condiciones que evalúa** `ausencia de valid`.
- **Llamadas directas en el cuerpo** [`onConfirm`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L36), [`codigo.toUpperCase`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L36), [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L37).
- **Lo usa** [`ModalCodigoNegocio`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L66) (pasa a onClick).

#### [`input.onChange`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L54) · callback JSX · dentro de [`ModalCodigoNegocio`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L17)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setCodigo`, `setFormatOk`.
- **Llamadas directas en el cuerpo** [`e.target.value.toUpperCase`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L55), [`setCodigo`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L56), [`setFormatOk`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L57), [`isPartialFormat`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L57).

### [`apps/referidos-app/src/components/modals/ModalConfirmAction.jsx`](../../../apps/referidos-app/src/components/modals/ModalConfirmAction.jsx#L1)

Modal de confirmación reutilizable para acciones definidas por el caller.

**Superficie que exporta.** [`ModalConfirmAction`](../../../apps/referidos-app/src/components/modals/ModalConfirmAction.jsx#L3).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L20) (importa).

**Dependencias del archivo.** [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js).

#### [`ModalConfirmAction`](../../../apps/referidos-app/src/components/modals/ModalConfirmAction.jsx#L3) · componente React · exportación por defecto

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, message, confirmLabel, cancelLabel, onConfirm}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`.
- **Hooks que llama** `useModal`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L50) (referencia).

#### [`button.onClick`](../../../apps/referidos-app/src/components/modals/ModalConfirmAction.jsx#L28) · callback JSX · dentro de [`ModalConfirmAction`](../../../apps/referidos-app/src/components/modals/ModalConfirmAction.jsx#L3)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `closeModal`.
- **Llamadas directas en el cuerpo** [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalConfirmAction.jsx#L29), [`onConfirm`](../../../apps/referidos-app/src/components/modals/ModalConfirmAction.jsx#L30).

### [`apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L1)

Advierte sobre cambios pendientes y conecta confirmación o cancelación a su flujo.

**Superficie que exporta.** [`ModalConfirmarCambios`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L16).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L13) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js).

#### [`createRandomBuffer`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L5) · función

Construye `Random Buffer` a partir de los datos del flujo.

- **Entradas** `size`.
- **Efectos y APIs** `window.crypto.getRandomValues`.
- **Llamadas directas en el cuerpo** [`window.crypto.getRandomValues`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L7).
- **Lo usa** [`handleFingerprintConfirm`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L91) (llama).

#### [`toBuffer`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L11) · función

Implementa `to Buffer` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`, `fallback`.
- **Llamadas directas en el cuerpo** [`encoder.encode`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L13).
- **Lo usa** [`handleFingerprintConfirm`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L94) (llama).

#### [`ModalConfirmarCambios`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L16) · componente React · exportación por defecto

Monta `Fingerprint`, `button`, `KeyRound`, `input`, `Lock`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{hasFingerprint, hasPin, hasPassword, userId, email, displayName, onConfirm, onOpenMethods}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[status, setStatus] mediante useState`, `[message, setMessage] mediante useState`, `[pinValue, setPinValue] mediante useState`, `[passwordValue, setPasswordValue] mediante useState`, `timeoutRef mediante useRef`.
- **Interfaz que monta** `Fingerprint`, `button`, `KeyRound`, `input`, `Lock`.
- **Hooks que llama** `useModal`, `useState`, `useRef`, `useEffect`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Llamadas directas en el cuerpo** [`passwordValue.trim`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L226).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L43) (referencia).

#### [`method`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L27) · cálculo memorizado · dentro de [`ModalConfirmarCambios`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L16)

Función auxiliar de `ModalConfirmarCambios` para `method`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `hasFingerprint`, `hasPin`, `hasPassword`.
- **Lo usa** [`ModalConfirmarCambios`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L138) (referencia).

#### [`cleanupTimeout`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L39) · función · dentro de [`ModalConfirmarCambios`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L16)

Normaliza `up Timeout` antes de validarlo, mostrarlo o enviarlo.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `clearTimeout`.
- **Condiciones que evalúa** `timeoutRef.current`.
- **Llamadas directas en el cuerpo** [`clearTimeout`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L41).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L48) (llama), [`handleComplete`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L56) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L46) · callback de infraestructura · dentro de [`ModalConfirmarCambios`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L16)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ModalConfirmarCambios`.

- **Llamadas directas en el cuerpo** [`cleanupTimeout`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L48).

#### [`handleComplete`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L53) · callback React · dentro de [`ModalConfirmarCambios`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L16)

Maneja `Complete` y coordina las acciones indicadas abajo.

- **Entradas** `nextStatus`, `nextMessage`, `closeDelay`, `shouldConfirm`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setStatus`, `setMessage`.
- **Efectos y APIs** `setTimeout`.
- **Llamadas directas en el cuerpo** [`setStatus`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L54), [`setMessage`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L55), [`cleanupTimeout`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L56), [`setTimeout`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L57).
- **Lo usa** [`handleFingerprintConfirm`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L73) (llama), [`handlePinConfirm`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L123) (llama), [`handlePasswordConfirm`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L128) (llama).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L57) · callback de infraestructura · dentro de [`handleComplete`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L53)

Ejecuta trabajo diferido o periódico iniciado por `handleComplete`.

- **Efectos y APIs** `closeModal`.
- **Condiciones que evalúa** `shouldConfirm y onConfirm`.
- **Llamadas directas en el cuerpo** [`onConfirm`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L59), [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L61).

#### [`handleFingerprintConfirm`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L67) · callback React · asíncrona · dentro de [`ModalConfirmarCambios`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L16)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setStatus`, `setMessage`.
- **Efectos y APIs** `navigator.credentials.create`.
- **Condiciones que evalúa** `status`, `ausencia de window.PublicKeyCredential o ausencia de window.crypto.getRandomValues`, `available`.
- **Llamadas directas en el cuerpo** [`setStatus`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L69), [`setMessage`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L70), [`handleComplete`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L73), [`PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L79), [`createRandomBuffer`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L91), [`toBuffer`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L94), [`navigator.credentials.create`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L110).
- **Lo usa** [`ModalConfirmarCambios`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L145) (pasa a onClick).

#### [`handlePinConfirm`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L121) · función · dentro de [`ModalConfirmarCambios`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L16)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Condiciones que evalúa** `pinValue.length`.
- **Llamadas directas en el cuerpo** [`handleComplete`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L123).
- **Lo usa** [`ModalConfirmarCambios`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L191) (pasa a onClick).

#### [`handlePasswordConfirm`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L126) · función · dentro de [`ModalConfirmarCambios`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L16)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Condiciones que evalúa** `ausencia de passwordValue.trim`.
- **Llamadas directas en el cuerpo** [`passwordValue.trim`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L127), [`handleComplete`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L128).
- **Lo usa** [`ModalConfirmarCambios`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L225) (pasa a onClick).

#### [`input.onChange`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L172) · callback JSX · dentro de [`ModalConfirmarCambios`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L16)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setPinValue`.
- **Efectos y APIs** `event.target.value.replace`.
- **Llamadas directas en el cuerpo** [`setPinValue`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L173), [`slice`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L173), [`event.target.value.replace`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L173).

#### [`input.onChange`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L211) · callback JSX · dentro de [`ModalConfirmarCambios`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L16)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setPasswordValue`.
- **Llamadas directas en el cuerpo** [`setPasswordValue`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L211).

#### [`button.onClick`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L246) · callback JSX · dentro de [`ModalConfirmarCambios`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L16)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `closeModal`.
- **Condiciones que evalúa** `onOpenMethods`.
- **Llamadas directas en el cuerpo** [`onOpenMethods`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L247), [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L248).

### [`apps/referidos-app/src/components/modals/ModalCuentaExistente.jsx`](../../../apps/referidos-app/src/components/modals/ModalCuentaExistente.jsx#L1)

Orienta al usuario cuando sus datos o credenciales corresponden a una cuenta existente.

**Superficie que exporta.** [`ModalCuentaExistente`](../../../apps/referidos-app/src/components/modals/ModalCuentaExistente.jsx#L4).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L6) (importa).

**Dependencias del archivo.** `react`, [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js).

#### [`ModalCuentaExistente`](../../../apps/referidos-app/src/components/modals/ModalCuentaExistente.jsx#L4) · componente React · exportación por defecto

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{message}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`.
- **Hooks que llama** `useModal`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L36) (referencia).

### [`apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx`](../../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx#L1)

Presenta el consentimiento para eliminación y conecta el flujo seguro del perfil.

**Superficie que exporta.** [`ModalEliminarCuenta`](../../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx#L4).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L8) (importa).

**Dependencias del archivo.** `react`, [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js).

#### [`ModalEliminarCuenta`](../../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx#L4) · componente React · exportación por defecto

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onConfirm, onCancel, deleting}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[countdown, setCountdown] mediante useState`, `[submitting, setSubmitting] mediante useState`.
- **Interfaz que monta** `button`.
- **Hooks que llama** `useModal`, `useState`, `useEffect`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L38) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx#L9) · callback de infraestructura · dentro de [`ModalEliminarCuenta`](../../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx#L4)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ModalEliminarCuenta`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `setTimeout`, `clearTimeout`.
- **Condiciones que evalúa** `countdown`.
- **Llamadas directas en el cuerpo** [`setTimeout`](../../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx#L11), [`clearTimeout`](../../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx#L12).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx#L11) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx#L9)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setCountdown`.
- **Llamadas directas en el cuerpo** [`setCountdown`](../../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx#L11).

#### [`handleCancel`](../../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx#L15) · función · dentro de [`ModalEliminarCuenta`](../../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx#L4)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Efectos y APIs** `closeModal`.
- **Condiciones que evalúa** `submitting o deleting`.
- **Llamadas directas en el cuerpo** [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx#L17), [`onCancel`](../../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx#L18).
- **Lo usa** [`ModalEliminarCuenta`](../../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx#L75) (pasa a onClick).

#### [`handleConfirm`](../../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx#L21) · función · asíncrona · dentro de [`ModalEliminarCuenta`](../../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx#L4)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setSubmitting`.
- **Efectos y APIs** `closeModal`.
- **Condiciones que evalúa** `countdown o deleting o submitting`.
- **Llamadas directas en el cuerpo** [`setSubmitting`](../../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx#L23), [`onConfirm`](../../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx#L25), [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx#L28).
- **Lo usa** [`ModalEliminarCuenta`](../../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx#L66) (pasa a onClick).

### [`apps/referidos-app/src/components/modals/ModalEmailReauth.jsx`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L1)

Coordina la UI de reautenticación por correo y las acciones del cliente Auth.

**Superficie que exporta.** [`ModalEmailReauth`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L20).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L23) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js).

#### [`maskEmail`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L6) · función

Implementa `mask Email` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de value o ausencia de value.includes`, `ausencia de local`.
- **Llamadas directas en el cuerpo** [`value.includes`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L7), [`value.split`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L8), [`test`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L11), [`local.slice`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L12), [`*.repeat`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L15), [`split`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L16).
- **Lo usa** [`maskedEmail`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L26) (llama).

#### [`ModalEmailReauth`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L20) · componente React · exportación por defecto

Monta `button`, `X`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{email, onConfirm}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[sending, setSending] mediante useState`, `[emailSent, setEmailSent] mediante useState`, `[message, setMessage] mediante useState`, `[error, setError] mediante useState`.
- **Interfaz que monta** `button`, `X`.
- **Hooks que llama** `useModal`, `useState`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L53) (referencia).

#### [`maskedEmail`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L26) · cálculo memorizado · dentro de [`ModalEmailReauth`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L20)

Función auxiliar de `ModalEmailReauth` para `masked Email`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`maskEmail`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L26).
- **Lo usa** [`ModalEmailReauth`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L86) (referencia).

#### [`handleClose`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L28) · función · dentro de [`ModalEmailReauth`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L20)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Efectos y APIs** `closeModal`.
- **Condiciones que evalúa** `emailSent`.
- **Llamadas directas en el cuerpo** [`onConfirm`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L30), [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L32).
- **Lo usa** [`ModalEmailReauth`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L71) (pasa a onClick).

#### [`handleSendEmail`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L35) · función · asíncrona · dentro de [`ModalEmailReauth`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L20)

Opera sobre Auth `reauthenticate` y coordina las demás operaciones de esta ficha.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setError`, `setMessage`, `setSending`, `setEmailSent`.
- **Condiciones que evalúa** `ausencia de email`, `function`, `reauthError`, `otpError`.
- **Contrato de datos** Auth `reauthenticate` en [`ModalEmailReauth.jsx:45`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L45), Auth `signInWithOtp` en [`ModalEmailReauth.jsx:48`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L48).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L36), [`setMessage`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L37), [`setSending`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L42), [`supabase.auth.reauthenticate`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L45), [`supabase.auth.signInWithOtp`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L48), [`setEmailSent`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L55).
- **Lo usa** [`ModalEmailReauth`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L97) (pasa a onClick).

### [`apps/referidos-app/src/components/modals/ModalEmailVerification.jsx`](../../../apps/referidos-app/src/components/modals/ModalEmailVerification.jsx#L1)

Presenta etapas y acciones de verificación de correo para cuenta.

**Superficie que exporta.** [`ModalEmailVerification`](../../../apps/referidos-app/src/components/modals/ModalEmailVerification.jsx#L7).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L22) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js), [`../../auth/blocks/EmailVerificationBlock`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx).

#### [`ModalEmailVerification`](../../../apps/referidos-app/src/components/modals/ModalEmailVerification.jsx#L7) · componente React · exportación por defecto

Monta `button`, `X`, `EmailVerificationBlock`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{email}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[emailConfirmed, setEmailConfirmed] mediante useState`.
- **Interfaz que monta** `button`, `X`, `EmailVerificationBlock`.
- **Hooks que llama** `useModal`, `useState`, `useEffect`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama), [`EmailVerificationBlock`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx#L21) (renderiza).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L52) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalEmailVerification.jsx#L11) · callback de infraestructura · dentro de [`ModalEmailVerification`](../../../apps/referidos-app/src/components/modals/ModalEmailVerification.jsx#L7)

Opera sobre Auth `getUser`. El resultado se adapta al contrato del consumidor.

- **Actualizaciones de estado o acciones** `setEmailConfirmed`.
- **Condiciones que evalúa** `ausencia de active`, `ausencia de error`.
- **Contrato de datos** Auth `getUser` en [`ModalEmailVerification.jsx:14`](../../../apps/referidos-app/src/components/modals/ModalEmailVerification.jsx#L14).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.getUser`](../../../apps/referidos-app/src/components/modals/ModalEmailVerification.jsx#L14), [`setEmailConfirmed`](../../../apps/referidos-app/src/components/modals/ModalEmailVerification.jsx#L17).

### [`apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L1)

Solicita la comprobación o alta de una credencial biométrica local.

**Superficie que exporta.** [`ModalFingerprintPrompt`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L16).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L11) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js).

#### [`createRandomBuffer`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L5) · función

Construye `Random Buffer` a partir de los datos del flujo.

- **Entradas** `size`.
- **Efectos y APIs** `window.crypto.getRandomValues`.
- **Llamadas directas en el cuerpo** [`window.crypto.getRandomValues`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L7).
- **Lo usa** [`handleConfirm`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L80) (llama).

#### [`toBuffer`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L11) · función

Implementa `to Buffer` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`, `fallback`.
- **Llamadas directas en el cuerpo** [`encoder.encode`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L13).
- **Lo usa** [`handleConfirm`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L83) (llama).

#### [`ModalFingerprintPrompt`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L16) · componente React · exportación por defecto

Monta `Fingerprint`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onConfirm, onError, onCancel, userId, email, displayName}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[status, setStatus] mediante useState`, `[message, setMessage] mediante useState`, `timeoutRef mediante useRef`, `promptOnceRef mediante useRef`.
- **Interfaz que monta** `Fingerprint`, `button`.
- **Hooks que llama** `useModal`, `useState`, `useRef`, `useEffect`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L41) (referencia).

#### [`cleanupTimeout`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L30) · función · dentro de [`ModalFingerprintPrompt`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L16)

Normaliza `up Timeout` antes de validarlo, mostrarlo o enviarlo.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `clearTimeout`.
- **Condiciones que evalúa** `timeoutRef.current`.
- **Llamadas directas en el cuerpo** [`clearTimeout`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L32).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L39) (llama), [`handleComplete`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L47) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L37) · callback de infraestructura · dentro de [`ModalFingerprintPrompt`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L16)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ModalFingerprintPrompt`.

- **Llamadas directas en el cuerpo** [`cleanupTimeout`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L39).

#### [`handleComplete`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L44) · callback React · dentro de [`ModalFingerprintPrompt`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L16)

Maneja `Complete` y coordina las acciones indicadas abajo.

- **Entradas** `nextStatus`, `nextMessage`, `closeDelay`, `shouldConfirm`, `payload`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setStatus`, `setMessage`.
- **Efectos y APIs** `setTimeout`.
- **Llamadas directas en el cuerpo** [`setStatus`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L45), [`setMessage`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L46), [`cleanupTimeout`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L47), [`setTimeout`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L48).
- **Lo usa** [`handleConfirm`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L68) (llama).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L48) · callback de infraestructura · dentro de [`handleComplete`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L44)

Ejecuta trabajo diferido o periódico iniciado por `handleComplete`.

- **Efectos y APIs** `closeModal`.
- **Condiciones que evalúa** `shouldConfirm y onConfirm`, `ausencia de shouldConfirm y onError`.
- **Llamadas directas en el cuerpo** [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L49), [`onConfirm`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L51), [`onError`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L54).

#### [`handleConfirm`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L61) · callback React · asíncrona · dentro de [`ModalFingerprintPrompt`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L16)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setStatus`, `setMessage`.
- **Efectos y APIs** `navigator.credentials.create`.
- **Condiciones que evalúa** `status o promptOnceRef.current`, `ausencia de window.PublicKeyCredential o ausencia de window.crypto.getRandomValues`, `available`.
- **Llamadas directas en el cuerpo** [`setStatus`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L64), [`setMessage`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L65), [`handleComplete`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L68), [`PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L73), [`createRandomBuffer`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L80), [`toBuffer`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L83), [`navigator.credentials.create`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L99).
- **Lo usa** [`ModalFingerprintPrompt`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L187) (pasa a onClick).

#### [`button.onClick`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L174) · callback JSX · dentro de [`ModalFingerprintPrompt`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L16)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `closeModal`.
- **Llamadas directas en el cuerpo** [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L175), [`onCancel`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L176).

### [`apps/referidos-app/src/components/modals/ModalForcePasswordChange.jsx`](../../../apps/referidos-app/src/components/modals/ModalForcePasswordChange.jsx#L1)

Impone el recorrido de cambio de contraseña al entrar con un perfil obligado a hacerlo.

**Superficie que exporta.** [`ModalForcePasswordChange`](../../../apps/referidos-app/src/components/modals/ModalForcePasswordChange.jsx#L7).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L25) (importa).

**Dependencias del archivo.** `react`, [`../../profile/shared/blocks/PasswordAccessCard`](../../../apps/referidos-app/src/profile/shared/blocks/PasswordAccessCard.jsx), [`../../auth/hooks/usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js), [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js).

#### [`ModalForcePasswordChange`](../../../apps/referidos-app/src/components/modals/ModalForcePasswordChange.jsx#L7) · componente React · exportación por defecto

Monta `PasswordAccessCard`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `setUser mediante useAppStore`, `selector s.setUser`.
- **Interfaz que monta** `PasswordAccessCard`.
- **Hooks que llama** `useAppStore`, `useModal`, `usePasswordAccess`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama), [`usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L5) (llama), [`PasswordAccessCard`](../../../apps/referidos-app/src/profile/shared/blocks/PasswordAccessCard.jsx#L12) (renderiza).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L55) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalForcePasswordChange.jsx#L52) · callback de infraestructura · dentro de [`ModalForcePasswordChange`](../../../apps/referidos-app/src/components/modals/ModalForcePasswordChange.jsx#L7)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ModalForcePasswordChange`.

- **Condiciones que evalúa** `ausencia de showPasswordForm`.
- **Llamadas directas en el cuerpo** [`onOpenAdd`](../../../apps/referidos-app/src/components/modals/ModalForcePasswordChange.jsx#L54).

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalForcePasswordChange.jsx#L58) · callback de infraestructura · dentro de [`ModalForcePasswordChange`](../../../apps/referidos-app/src/components/modals/ModalForcePasswordChange.jsx#L7)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ModalForcePasswordChange`.

- **Actualizaciones de estado o acciones** `setUser`.
- **Efectos y APIs** `closeModal`.
- **Condiciones que evalúa** `ausencia de passwordSaved`, `usuario`.
- **Llamadas directas en el cuerpo** [`setUser`](../../../apps/referidos-app/src/components/modals/ModalForcePasswordChange.jsx#L61), [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalForcePasswordChange.jsx#L67).

### [`apps/referidos-app/src/components/modals/ModalGrupo.jsx`](../../../apps/referidos-app/src/components/modals/ModalGrupo.jsx#L1)

Muestra un diálogo para datos o detalles de grupos en sus consumidores.

**Superficie que exporta.** [`ModalGrupo`](../../../apps/referidos-app/src/components/modals/ModalGrupo.jsx#L8).

**Dependencias del archivo.** `react`, [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js).

#### [`BRAND_PURPLE`](../../../apps/referidos-app/src/components/modals/ModalGrupo.jsx#L6) · variable de módulo

Declara `BRAND_PURPLE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`ModalGrupo`](../../../apps/referidos-app/src/components/modals/ModalGrupo.jsx#L59) (referencia).

#### [`ModalGrupo`](../../../apps/referidos-app/src/components/modals/ModalGrupo.jsx#L8) · componente React · exportación por defecto

Monta `button`, `img`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `img`.
- **Hooks que llama** `useModal`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Llamadas directas en el cuerpo** [`miembros.map`](../../../apps/referidos-app/src/components/modals/ModalGrupo.jsx#L98).

#### [`div.onClick`](../../../apps/referidos-app/src/components/modals/ModalGrupo.jsx#L36) · callback JSX · dentro de [`ModalGrupo`](../../../apps/referidos-app/src/components/modals/ModalGrupo.jsx#L8)

Responde al evento de interfaz `div.onClick`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Llamadas directas en el cuerpo** [`e.stopPropagation`](../../../apps/referidos-app/src/components/modals/ModalGrupo.jsx#L36).

### [`apps/referidos-app/src/components/modals/ModalLocationDenied.jsx`](../../../apps/referidos-app/src/components/modals/ModalLocationDenied.jsx#L1)

Explica cómo continuar cuando el navegador deniega acceso a ubicación.

**Superficie que exporta.** [`ModalLocationDenied`](../../../apps/referidos-app/src/components/modals/ModalLocationDenied.jsx#L4).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L15) (importa).

**Dependencias del archivo.** `react`, [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js).

#### [`ModalLocationDenied`](../../../apps/referidos-app/src/components/modals/ModalLocationDenied.jsx#L4) · componente React · exportación por defecto

Monta `LocationOffIcon`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `LocationOffIcon`, `button`.
- **Hooks que llama** `useModal`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L45) (referencia).

#### [`LocationOffIcon`](../../../apps/referidos-app/src/components/modals/ModalLocationDenied.jsx#L32) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`ModalLocationDenied`](../../../apps/referidos-app/src/components/modals/ModalLocationDenied.jsx#L10) (renderiza).

### [`apps/referidos-app/src/components/modals/ModalLocationPermission.jsx`](../../../apps/referidos-app/src/components/modals/ModalLocationPermission.jsx#L1)

Explica el uso de ubicación antes de activar la solicitud de permiso.

**Superficie que exporta.** [`ModalLocationPermission`](../../../apps/referidos-app/src/components/modals/ModalLocationPermission.jsx#L4).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L14) (importa).

**Dependencias del archivo.** `react`, [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js).

#### [`ModalLocationPermission`](../../../apps/referidos-app/src/components/modals/ModalLocationPermission.jsx#L4) · componente React · exportación por defecto

Monta `LocationPinIcon`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onConfirm, title}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `LocationPinIcon`, `button`.
- **Hooks que llama** `useModal`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L44) (referencia).

#### [`button.onClick`](../../../apps/referidos-app/src/components/modals/ModalLocationPermission.jsx#L30) · callback JSX · dentro de [`ModalLocationPermission`](../../../apps/referidos-app/src/components/modals/ModalLocationPermission.jsx#L4)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `closeModal`.
- **Llamadas directas en el cuerpo** [`onConfirm`](../../../apps/referidos-app/src/components/modals/ModalLocationPermission.jsx#L31), [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalLocationPermission.jsx#L32).

#### [`LocationPinIcon`](../../../apps/referidos-app/src/components/modals/ModalLocationPermission.jsx#L43) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`ModalLocationPermission`](../../../apps/referidos-app/src/components/modals/ModalLocationPermission.jsx#L13) (renderiza).

### [`apps/referidos-app/src/components/modals/ModalLocationUnavailable.jsx`](../../../apps/referidos-app/src/components/modals/ModalLocationUnavailable.jsx#L1)

Informa que no se obtuvo ubicación y presenta acciones de recuperación.

**Superficie que exporta.** [`ModalLocationUnavailable`](../../../apps/referidos-app/src/components/modals/ModalLocationUnavailable.jsx#L4).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L16) (importa).

**Dependencias del archivo.** `react`, [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js).

#### [`ModalLocationUnavailable`](../../../apps/referidos-app/src/components/modals/ModalLocationUnavailable.jsx#L4) · componente React · exportación por defecto

Monta `GpsOffIcon`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onRetry}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `GpsOffIcon`, `button`.
- **Hooks que llama** `useModal`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L46) (referencia).

#### [`button.onClick`](../../../apps/referidos-app/src/components/modals/ModalLocationUnavailable.jsx#L21) · callback JSX · dentro de [`ModalLocationUnavailable`](../../../apps/referidos-app/src/components/modals/ModalLocationUnavailable.jsx#L4)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `closeModal`.
- **Llamadas directas en el cuerpo** [`onRetry`](../../../apps/referidos-app/src/components/modals/ModalLocationUnavailable.jsx#L22), [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalLocationUnavailable.jsx#L23).

#### [`GpsOffIcon`](../../../apps/referidos-app/src/components/modals/ModalLocationUnavailable.jsx#L34) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`ModalLocationUnavailable`](../../../apps/referidos-app/src/components/modals/ModalLocationUnavailable.jsx#L10) (renderiza).

### [`apps/referidos-app/src/components/modals/ModalNotifications.jsx`](../../../apps/referidos-app/src/components/modals/ModalNotifications.jsx#L1)

Muestra la bandeja de notificaciones en un diálogo global.

**Superficie que exporta.** [`ModalNotifications`](../../../apps/referidos-app/src/components/modals/ModalNotifications.jsx#L5).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L12) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js).

#### [`ModalNotifications`](../../../apps/referidos-app/src/components/modals/ModalNotifications.jsx#L5) · componente React · exportación por defecto

Monta `Bell`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Bell`, `button`.
- **Hooks que llama** `useModal`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L42) (referencia).

### [`apps/referidos-app/src/components/modals/ModalPasswordReauth.jsx`](../../../apps/referidos-app/src/components/modals/ModalPasswordReauth.jsx#L1)

Pide contraseña para el flujo de reautenticación antes de continuar una acción.

**Superficie que exporta.** [`ModalPasswordReauth`](../../../apps/referidos-app/src/components/modals/ModalPasswordReauth.jsx#L6).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L24) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js).

#### [`ModalPasswordReauth`](../../../apps/referidos-app/src/components/modals/ModalPasswordReauth.jsx#L6) · componente React · exportación por defecto

Monta `button`, `X`, `input`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{email, onConfirm}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[password, setPassword] mediante useState`, `[sending, setSending] mediante useState`, `[error, setError] mediante useState`.
- **Interfaz que monta** `button`, `X`, `input`.
- **Hooks que llama** `useModal`, `useState`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L54) (referencia).

#### [`handleSubmit`](../../../apps/referidos-app/src/components/modals/ModalPasswordReauth.jsx#L12) · función · asíncrona · dentro de [`ModalPasswordReauth`](../../../apps/referidos-app/src/components/modals/ModalPasswordReauth.jsx#L6)

Opera sobre Auth `signInWithPassword`. El resultado se adapta al contrato del consumidor.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setError`, `setSending`.
- **Efectos y APIs** `closeModal`.
- **Condiciones que evalúa** `ausencia de email`, `ausencia de password`, `signInError`.
- **Contrato de datos** Auth `signInWithPassword` en [`ModalPasswordReauth.jsx:24`](../../../apps/referidos-app/src/components/modals/ModalPasswordReauth.jsx#L24).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-app/src/components/modals/ModalPasswordReauth.jsx#L13), [`setSending`](../../../apps/referidos-app/src/components/modals/ModalPasswordReauth.jsx#L22), [`supabase.auth.signInWithPassword`](../../../apps/referidos-app/src/components/modals/ModalPasswordReauth.jsx#L24), [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalPasswordReauth.jsx#L29), [`onConfirm`](../../../apps/referidos-app/src/components/modals/ModalPasswordReauth.jsx#L30).
- **Lo usa** [`ModalPasswordReauth`](../../../apps/referidos-app/src/components/modals/ModalPasswordReauth.jsx#L69) (pasa a onClick).

#### [`input.onChange`](../../../apps/referidos-app/src/components/modals/ModalPasswordReauth.jsx#L61) · callback JSX · dentro de [`ModalPasswordReauth`](../../../apps/referidos-app/src/components/modals/ModalPasswordReauth.jsx#L6)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setPassword`.
- **Llamadas directas en el cuerpo** [`setPassword`](../../../apps/referidos-app/src/components/modals/ModalPasswordReauth.jsx#L61).

### [`apps/referidos-app/src/components/modals/ModalPinVerify.jsx`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L1)

Recoge y verifica el PIN local y devuelve resultado al flujo que solicitó desbloqueo.

**Superficie que exporta.** [`ModalPinVerify`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L10).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L21) (importa).

**Dependencias del archivo.** `react`, [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js), [`../../services/secureStorageService`](../../../apps/referidos-app/src/services/secureStorageService.js).

#### [`ModalPinVerify`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L10) · componente React · exportación por defecto

Monta `input`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{userId, onConfirm}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[pinValue, setPinValue] mediante useState`, `[error, setError] mediante useState`, `[lockedUntil, setLockedUntil] mediante useState`.
- **Interfaz que monta** `input`, `button`.
- **Hooks que llama** `useModal`, `useState`, `useEffect`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L51) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L16) · callback de infraestructura · dentro de [`ModalPinVerify`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L10)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ModalPinVerify`.

- **Actualizaciones de estado o acciones** `setError`, `setLockedUntil`.
- **Condiciones que evalúa** `ausencia de userId`, `ausencia de active`, `state.lockedUntil`.
- **Usa código de** [`getPinAttemptState`](../../../apps/referidos-app/src/services/secureStorageService.js#L239) (llama).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L20), [`getPinAttemptState`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L23), [`setLockedUntil`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L26).

#### [`handleConfirm`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L35) · función · asíncrona · dentro de [`ModalPinVerify`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L10)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setError`, `setLockedUntil`.
- **Efectos y APIs** `closeModal`.
- **Condiciones que evalúa** `ausencia de userId`, `pinValue.length`, `lockedUntil`, `ausencia de stored.salt o ausencia de stored.hash`, `ausencia de ok`, `attempt.lockedUntil`.
- **Usa código de** [`loadPinHash`](../../../apps/referidos-app/src/services/secureStorageService.js#L207) (llama), [`hashPin`](../../../apps/referidos-app/src/services/secureStorageService.js#L158) (llama), [`recordPinAttempt`](../../../apps/referidos-app/src/services/secureStorageService.js#L242) (llama).
- **Llamadas directas en el cuerpo** [`loadPinHash`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L39), [`setError`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L41), [`hashPin`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L44), [`recordPinAttempt`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L47), [`setLockedUntil`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L49), [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L57), [`onConfirm`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L58).
- **Lo usa** [`ModalPinVerify`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L88) (pasa a onClick).

#### [`input.onChange`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L69) · callback JSX · dentro de [`ModalPinVerify`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L10)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setPinValue`.
- **Efectos y APIs** `event.target.value.replace`.
- **Llamadas directas en el cuerpo** [`setPinValue`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L70), [`slice`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L70), [`event.target.value.replace`](../../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx#L70).
