# PWA principal · Cliente · 2 de 2

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/cliente/layout/ClienteLayout.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L1)
- [`apps/referidos-app/src/cliente/services/clienteUI.js`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L1)
- [`apps/referidos-app/src/cliente/views/ClienteEscanerView.jsx`](../../../apps/referidos-app/src/cliente/views/ClienteEscanerView.jsx#L1)
- [`apps/referidos-app/src/cliente/views/ClienteHistorialView.jsx`](../../../apps/referidos-app/src/cliente/views/ClienteHistorialView.jsx#L1)
- [`apps/referidos-app/src/cliente/views/ClienteInicioView.jsx`](../../../apps/referidos-app/src/cliente/views/ClienteInicioView.jsx#L1)
- [`apps/referidos-app/src/cliente/views/ClientePerfilView.jsx`](../../../apps/referidos-app/src/cliente/views/ClientePerfilView.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/cliente/layout/ClienteLayout.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L1)

Fija cabecera, área de scroll y menú inferior, precarga el caché de pestañas y sincroniza el acceso del dispositivo para cliente.

**Superficie que exporta.** [`ClienteLayout`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L322).

**Módulos que lo cargan.** [`ClienteEscaner.jsx`](../../../apps/referidos-app/src/pages/cliente/ClienteEscaner.jsx#L2) (importa), [`ClienteHistorial.jsx`](../../../apps/referidos-app/src/pages/cliente/ClienteHistorial.jsx#L2) (importa), [`ClienteInicio.jsx`](../../../apps/referidos-app/src/pages/cliente/ClienteInicio.jsx#L2) (importa), [`ClientePerfil.jsx`](../../../apps/referidos-app/src/pages/cliente/ClientePerfil.jsx#L2) (importa), [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L8) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, [`./ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx), [`./ClienteFooter`](../../../apps/referidos-app/src/cliente/layout/ClienteFooter.jsx), [`../../components/menus/MenuLateral`](../../../apps/referidos-app/src/components/menus/MenuLateral.jsx), [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../services/clienteUI`](../../../apps/referidos-app/src/cliente/services/clienteUI.js), [`./ClienteHeaderContext`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx), [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js), [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../../services/secureStorageService`](../../../apps/referidos-app/src/services/secureStorageService.js), [`../../cache/CacheOutlet`](../../../apps/referidos-app/src/cache/CacheOutlet.jsx), [`../../cache/cacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js), [`../../cache/cacheKeys`](../../../apps/referidos-app/src/cache/cacheKeys.js), [`../base/ClienteInicioBase`](../../../apps/referidos-app/src/cliente/base/ClienteInicioBase.jsx), [`../base/ClienteEscanerBase`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx), [`../base/ClienteHistorialBase`](../../../apps/referidos-app/src/cliente/base/ClienteHistorialBase.jsx), [`../base/ClientePerfilBase`](../../../apps/referidos-app/src/cliente/base/ClientePerfilBase.jsx).

#### [`FALLBACK_HEADER_HEIGHT`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L24) · variable de módulo

Declara `FALLBACK_HEADER_HEIGHT` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`ClienteLayoutInner`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L35) (referencia), [`updateHeaderHeight`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L93) (referencia).

#### [`ClienteLayoutInner`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L26) · componente React

Monta `ClienteHeader`, `CacheOutlet`, `Outlet`, `ClienteFooter`, `MenuLateral`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{children}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `bootstrap mediante useAppStore`, `selector s.bootstrap`, `logout mediante useAppStore`, `selector s.logout`, `setAccessMethods mediante useAppStore`, `selector s.setAccessMethods`, `setUser mediante useAppStore`, `selector s.setUser`, `[menuOpen, setMenuOpen] mediante useState`, `[headerHeight, setHeaderHeight] mediante useState`, `[headerElevated, setHeaderElevated] mediante useState`, `[viewportMetrics, setViewportMetrics] mediante useState` y 10 más.
- **Interfaz que monta** `ClienteHeader`, `CacheOutlet`, `Outlet`, `ClienteFooter`, `MenuLateral`.
- **Hooks que llama** `useAppStore`, `useModal`, `useState`, `useRef`, `useClienteHeader`, `useLocation`, `useCacheStore`, `useLayoutEffect`, `useEffect`.
- **Condiciones que evalúa** `bootstrap o undefined`, `hideUntilPreloaded`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama), [`useClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L91) (llama), [`useCacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js#L12) (llama), [`ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L23) (renderiza), [`getAvatarSrc`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L116) (llama), [`CacheOutlet`](../../../apps/referidos-app/src/cache/CacheOutlet.jsx#L6) (renderiza), [`ClienteFooter`](../../../apps/referidos-app/src/cliente/layout/ClienteFooter.jsx#L8) (renderiza), [`MenuLateral`](../../../apps/referidos-app/src/components/menus/MenuLateral.jsx#L7) (renderiza).
- **Llamadas directas en el cuerpo** [`getAvatarSrc`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L274).
- **Lo usa** [`ClienteLayout`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L325) (renderiza).

#### [`cacheEntries`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L68) · cálculo memorizado · dentro de [`ClienteLayoutInner`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L26)

Prepara contenido JSX usando `ClienteInicioBase`, `ClienteEscanerBase`, `ClienteHistorialBase`, `ClientePerfilBase`.

- **Retorno visible o tipo declarado** `lista`.
- **Interfaz que monta** `ClienteInicioBase`, `ClienteEscanerBase`, `ClienteHistorialBase`, `ClientePerfilBase`.
- **Hooks que llama** `useMemo`.
- **Usa código de** [`CACHE_KEYS`](../../../apps/referidos-app/src/cache/cacheKeys.js#L1) (accede al módulo), [`ClienteInicioBase`](../../../apps/referidos-app/src/cliente/base/ClienteInicioBase.jsx#L4) (renderiza), [`ClienteEscanerBase`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L16) (renderiza), [`ClienteHistorialBase`](../../../apps/referidos-app/src/cliente/base/ClienteHistorialBase.jsx#L4) (renderiza), [`ClientePerfilBase`](../../../apps/referidos-app/src/cliente/base/ClientePerfilBase.jsx#L4) (renderiza).
- **Lo usa** [`useLayoutEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L84) (referencia), [`ClienteLayoutInner`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L85) (referencia).

#### [`useLayoutEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L81) · callback de infraestructura · dentro de [`ClienteLayoutInner`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L26)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClienteLayoutInner`.

- **Condiciones que evalúa** `ausencia de useCache`, `isPreloaded`.
- **Llamadas directas en el cuerpo** [`preloadScope`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L84).

#### [`updateHeaderHeight`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L87) · callback React · dentro de [`ClienteLayoutInner`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L26)

Aplica o guarda `Header Height` para que el estado refleje la operación.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setHeaderHeight`.
- **Condiciones que evalúa** `ausencia de headerVisible`, `ausencia de headerRef.current`.
- **Llamadas directas en el cuerpo** [`setHeaderHeight`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L89).
- **Lo usa** [`useLayoutEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L100) (llama), [`ClienteLayoutInner`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L119) (referencia).

#### [`useLayoutEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L99) · callback de infraestructura · dentro de [`ClienteLayoutInner`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L26)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClienteLayoutInner`.

- **Efectos y APIs** `window.addEventListener`, `window.removeEventListener`.
- **Condiciones que evalúa** `headerVisible y undefined y headerRef.current`, `headerVisible`, `observer`.
- **Llamadas directas en el cuerpo** [`updateHeaderHeight`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L100), [`observer.observe`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L108), [`window.addEventListener`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L110), [`observer.disconnect`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L114), [`window.removeEventListener`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L116).

#### [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L121) · callback de infraestructura · dentro de [`ClienteLayoutInner`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L26)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClienteLayoutInner`.

- **Efectos y APIs** `window.visualViewport.addEventListener`, `window.addEventListener`, `window.visualViewport.removeEventListener`, `window.removeEventListener`.
- **Llamadas directas en el cuerpo** [`updateViewport`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L137), [`window.visualViewport.addEventListener`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L138), [`window.addEventListener`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L140), [`window.visualViewport.removeEventListener`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L142), [`window.removeEventListener`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L144).

#### [`updateViewport`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L122) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L121)

Aplica o guarda `Viewport` para que el estado refleje la operación.

- **Actualizaciones de estado o acciones** `setViewportMetrics`, `setSuspendViewportAfterNext`, `setSuspendViewportResize`.
- **Condiciones que evalúa** `suspendViewportResize`, `suspendViewportAfterNext`.
- **Llamadas directas en el cuerpo** [`setViewportMetrics`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L127), [`setSuspendViewportAfterNext`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L133), [`setSuspendViewportResize`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L134).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L137) (llama).

#### [`updateHeaderElevation`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L153) · callback React · dentro de [`ClienteLayoutInner`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L26)

Aplica o guarda `Header Elevation` para que el estado refleje la operación.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setHeaderElevated`.
- **Llamadas directas en el cuerpo** [`setHeaderElevated`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L158).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L162) (llama), [`ClienteLayoutInner`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L178) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L161) · callback de infraestructura · dentro de [`ClienteLayoutInner`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L26)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClienteLayoutInner`.

- **Efectos y APIs** `current.addEventListener`, `window.addEventListener`, `current.removeEventListener`, `window.removeEventListener`.
- **Condiciones que evalúa** `current`.
- **Llamadas directas en el cuerpo** [`updateHeaderElevation`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L162), [`current.addEventListener`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L165), [`window.addEventListener`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L169), [`current.removeEventListener`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L174), [`window.removeEventListener`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L176).

#### [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L180) · callback de infraestructura · dentro de [`ClienteLayoutInner`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L26)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClienteLayoutInner`.

- **Efectos y APIs** `current.addEventListener`, `current.removeEventListener`.
- **Condiciones que evalúa** `ausencia de current o ausencia de activeCacheKey`.
- **Llamadas directas en el cuerpo** [`current.addEventListener`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L186), [`current.removeEventListener`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L188).

#### [`handleScroll`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L183) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L180)

Maneja `Scroll` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setScrollPosition`.
- **Llamadas directas en el cuerpo** [`setScrollPosition`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L184).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L186) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L192) · callback de infraestructura · dentro de [`ClienteLayoutInner`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L26)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClienteLayoutInner`.

- **Condiciones que evalúa** `ausencia de current o ausencia de activeCacheKey`.
- **Llamadas directas en el cuerpo** [`getScrollPosition`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L195), [`document.activeElement.blur`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L197).

#### [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L200) · callback de infraestructura · dentro de [`ClienteLayoutInner`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L26)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Actualizaciones de estado o acciones** `setAccessMethods`, `setUser`, `setItem`.
- **Efectos y APIs** `window.localStorage.getItem`, `window.sessionStorage.getItem`, `window.sessionStorage.setItem`, `openModal`.
- **Condiciones que evalúa** `bootstrap o ausencia de usuario`, `undefined`, `ausencia de active o storageMode.mode`, `ausencia de active o ausencia de token`, `ausencia de userId`, `ausencia de active`, `usuario.has_pin`, `usuario.has_biometrics` y 5 más.
- **Contrato de datos** Auth `getSession` en [`ClienteLayout.jsx:207`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L207), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`ClienteLayout.jsx:223`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L223), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`ClienteLayout.jsx:223`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L223).
- **Usa código de** [`getSecureStorageMode`](../../../apps/referidos-app/src/services/secureStorageService.js#L56) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo), [`loadPinHash`](../../../apps/referidos-app/src/services/secureStorageService.js#L207) (llama), [`loadBiometricToken`](../../../apps/referidos-app/src/services/secureStorageService.js#L187) (llama).
- **Llamadas directas en el cuerpo** [`getSecureStorageMode`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L205), [`supabase.auth.getSession`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L207), [`loadPinHash`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L213), [`loadBiometricToken`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L214), [`setAccessMethods`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L218), [`eq`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L223), [`update`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L223), [`supabase.from`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L223), [`setUser`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L225), [`window.localStorage.getItem`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L228), [`window.sessionStorage.getItem`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L231), [`window.sessionStorage.setItem`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L233) y 1 más.

#### [`ClienteHeader.onOpenMenu`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L275) · callback JSX · dentro de [`ClienteLayoutInner`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L26)

Responde al evento de interfaz `ClienteHeader.onOpenMenu`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setMenuOpen`.
- **Llamadas directas en el cuerpo** [`setMenuOpen`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L275).

#### [`MenuLateral.onClose`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L313) · callback JSX · dentro de [`ClienteLayoutInner`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L26)

Responde al evento de interfaz `MenuLateral.onClose`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setMenuOpen`.
- **Llamadas directas en el cuerpo** [`setMenuOpen`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L313).

#### [`ClienteLayout`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L322) · componente React · exportación por defecto

Monta `ClienteHeaderProvider`, `ClienteLayoutInner`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{children}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `ClienteHeaderProvider`, `ClienteLayoutInner`.
- **Usa código de** [`ClienteHeaderProvider`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L22) (renderiza).
- **Lo usa** [`ClienteEscaner`](../../../apps/referidos-app/src/pages/cliente/ClienteEscaner.jsx#L7) (renderiza), [`ClienteHistorial`](../../../apps/referidos-app/src/pages/cliente/ClienteHistorial.jsx#L7) (renderiza), [`ClienteInicio`](../../../apps/referidos-app/src/pages/cliente/ClienteInicio.jsx#L7) (renderiza), [`ClientePerfil`](../../../apps/referidos-app/src/pages/cliente/ClientePerfil.jsx#L7) (renderiza), [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L81) (renderiza).

### [`apps/referidos-app/src/cliente/services/clienteUI.js`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L1)

Adapta la información del usuario a etiquetas, avatar y otras piezas de presentación de cliente.

**Superficie que exporta.** [`formatCompactNumber`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L41), [`getUserAlias`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L49), [`getUserShortName`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L60), [`getRoleLabel`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L70), [`getTierMeta`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L74), [`getTierKey`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L79), [`getTierJourney`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L87), [`getTierProgress`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L101), [`getAvatarSrc`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L116), [`getInitials`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L124), [`getVerificationStatus`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L134), [`formatReadableDate`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L158), [`getDisplayEmail`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L169), [`getDisplayPhone`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L173), [`getDisplayLocation`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L177), [`getCercanasTitle`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L181), [`getSessionListFallback`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L188), [`getPlanFallback`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L207).

**Módulos que lo cargan.** [`InicioBeneficios.jsx`](../../../apps/referidos-app/src/cliente/inicio/InicioBeneficios.jsx#L3) (importa), [`InicioHero.jsx`](../../../apps/referidos-app/src/cliente/inicio/InicioHero.jsx#L4) (importa), [`ClienteHeader.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L16) (importa), [`ClienteLayout.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L7) (importa), [`MenuLateral.jsx`](../../../apps/referidos-app/src/components/menus/MenuLateral.jsx#L5) (importa), [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L34) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L35) (importa), [`ProfilePanel.jsx`](../../../apps/referidos-app/src/profile/shared/ProfilePanel.jsx#L2) (importa).

#### [`AVATAR_FEMALE`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L1) · variable de módulo

Declara `AVATAR_FEMALE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`getAvatarSrc`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L119) (referencia).

#### [`AVATAR_MALE`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L2) · variable de módulo

Declara `AVATAR_MALE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`getAvatarSrc`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L120) (referencia).

#### [`AVATAR_NEUTRAL`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L3) · variable de módulo

Declara `AVATAR_NEUTRAL` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`getAvatarSrc`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L121) (referencia).

#### [`TIER_META`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L6) · variable de módulo

Agrupa la configuración o catálogo de `TIER META` para que sus consumidores lean claves comunes.

- **Campos o contexto** `explorador`, `conector`, `impulsor`, `embajador`.
- **Lo usa** [`getTierMeta`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L76) (accede al módulo), [`getTierJourney`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L96) (accede al módulo).

#### [`ROLE_LABELS`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L33) · variable de módulo

Agrupa la configuración o catálogo de `ROLE LABELS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `cliente`, `negocio`, `admin`.
- **Lo usa** [`getRoleLabel`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L71) (accede al módulo).

#### [`TIER_ORDER`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L39) · variable de módulo

Conserva la lista de `TIER ORDER` usada por el módulo.

- **Lo usa** [`getTierKey`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L84) (accede al módulo), [`getTierJourney`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L89) (accede al módulo).

#### [`formatCompactNumber`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L41) · función · exportado

Formatea `Compact Number` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de Number.isFinite`, `number`.
- **Llamadas directas en el cuerpo** [`toFixed`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L45).
- **Lo usa** [`InicioHero`](../../../apps/referidos-app/src/cliente/inicio/InicioHero.jsx#L55) (llama), [`BeneficiosPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1329) (llama).

#### [`getUserAlias`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L49) · función · exportado

Obtiene o resuelve `User Alias` para entregarlo al consumidor.

- **Entradas** `usuario`.
- **Condiciones que evalúa** `ausencia de usuario`.
- **Llamadas directas en el cuerpo** [`usuario.email.split`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L55).

#### [`getUserShortName`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L60) · función · exportado

Obtiene o resuelve `User Short Name` para entregarlo al consumidor.

- **Entradas** `usuario`.
- **Llamadas directas en el cuerpo** [`base.split`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L67).
- **Lo usa** [`ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L41) (llama).

#### [`getRoleLabel`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L70) · función · exportado

Obtiene o resuelve `Role Label` para entregarlo al consumidor.

- **Entradas** `usuario`.
- **Lo usa** [`MenuLateral`](../../../apps/referidos-app/src/components/menus/MenuLateral.jsx#L58) (llama), [`OverviewPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1377) (llama), [`OverviewPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1438) (llama).

#### [`getTierMeta`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L74) · función · exportado

Obtiene o resuelve `Tier Meta` para entregarlo al consumidor.

- **Entradas** `usuario`.
- **Llamadas directas en el cuerpo** [`getTierKey`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L75).
- **Lo usa** [`InicioBeneficios`](../../../apps/referidos-app/src/cliente/inicio/InicioBeneficios.jsx#L33) (llama), [`ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L40) (llama), [`BeneficiosPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1318) (llama), [`OverviewPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1379) (llama).

#### [`getTierKey`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L79) · función · exportado

Obtiene o resuelve `Tier Key` para entregarlo al consumidor.

- **Entradas** `usuario`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L81), [`toString`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L81), [`TIER_ORDER.includes`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L84).
- **Lo usa** [`getTierMeta`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L75) (llama), [`getTierJourney`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L88) (llama).

#### [`getTierJourney`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L87) · función · exportado

Obtiene o resuelve `Tier Journey` para entregarlo al consumidor.

- **Entradas** `usuario`.
- **Retorno visible o tipo declarado** `currentKey`, `nextKey`, `current`, `next`.
- **Llamadas directas en el cuerpo** [`getTierKey`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L88), [`TIER_ORDER.indexOf`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L89).
- **Lo usa** [`InicioHero`](../../../apps/referidos-app/src/cliente/inicio/InicioHero.jsx#L22) (llama).

#### [`getTierProgress`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L101) · función · exportado

Obtiene o resuelve `Tier Progress` para entregarlo al consumidor.

- **Entradas** `usuario`.
- **Retorno visible o tipo declarado** `points`, `nextGoal`, `progress`.
- **Lo usa** [`InicioHero`](../../../apps/referidos-app/src/cliente/inicio/InicioHero.jsx#L21) (llama), [`BeneficiosPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1319) (llama).

#### [`getAvatarSrc`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L116) · función · exportado

Obtiene o resuelve `Avatar Src` para entregarlo al consumidor.

- **Entradas** `usuario`, `explicit`.
- **Condiciones que evalúa** `explicit`, `usuario.avatarUrl o usuario.avatar`, `usuario.genero`.
- **Lo usa** [`ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L44) (llama), [`ClienteLayoutInner`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L274) (llama), [`MenuLateral`](../../../apps/referidos-app/src/components/menus/MenuLateral.jsx#L50) (llama), [`OverviewPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1394) (llama), [`OverviewPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1455) (llama).

#### [`getInitials`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L124) · función · exportado

Obtiene o resuelve `Initials` para entregarlo al consumidor.

- **Entradas** `usuario`.
- **Llamadas directas en el cuerpo** [`join`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L126), [`map`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L126), [`slice`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L126), [`filter`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L126), [`base.split`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L126), [`p.0.toUpperCase`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L130).

#### [`getVerificationStatus`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L134) · función · exportado

Obtiene o resuelve `Verification Status` para entregarlo al consumidor.

- **Entradas** `usuario`.
- **Retorno visible o tipo declarado** `emailVerified`, `phoneVerified`, `accountVerified`.
- **Lo usa** [`ProfilePanel`](../../../apps/referidos-app/src/profile/shared/ProfilePanel.jsx#L6) (llama).

#### [`formatReadableDate`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L158) · función · exportado

Formatea `Readable Date` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de value`, `Number.isNaN`.
- **Llamadas directas en el cuerpo** [`date.getTime`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L161), [`date.toLocaleDateString`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L162).
- **Lo usa** [`OverviewPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1374) (llama), [`OverviewPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1435) (llama).

#### [`getDisplayEmail`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L169) · función · exportado

Obtiene o resuelve `Display Email` para entregarlo al consumidor.

- **Entradas** `usuario`.

#### [`getDisplayPhone`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L173) · función · exportado

Obtiene o resuelve `Display Phone` para entregarlo al consumidor.

- **Entradas** `usuario`.

#### [`getDisplayLocation`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L177) · función · exportado

Obtiene o resuelve `Display Location` para entregarlo al consumidor.

- **Entradas** `usuario`.

#### [`getCercanasTitle`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L181) · función · exportado

Obtiene o resuelve `Cercanas Title` para entregarlo al consumidor.

- **Entradas** `usuario`.

#### [`getSessionListFallback`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L188) · función · exportado

Obtiene o resuelve `Session List Fallback` para entregarlo al consumidor.

- **Retorno visible o tipo declarado** `lista`.

#### [`getPlanFallback`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L207) · función · exportado

Obtiene o resuelve `Plan Fallback` para entregarlo al consumidor.

- **Entradas** `role`.
- **Retorno visible o tipo declarado** `plan`, `perks`, `upgrades`.
- **Condiciones que evalúa** `role`.
- **Lo usa** [`BeneficiosPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1317) (llama), [`OverviewPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1380) (llama), [`BeneficiosPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1300) (llama), [`ManageAccountPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1321) (llama), [`OverviewPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1440) (llama).

### [`apps/referidos-app/src/cliente/views/ClienteEscanerView.jsx`](../../../apps/referidos-app/src/cliente/views/ClienteEscanerView.jsx#L1)

Punto de enrutado que activa `CLIENTE_ESCANEAR` en el scope `cliente` mediante `CacheView`. El contenido real lo monta el layout, con `CLIENTE_INICIO` como destino de arranque si hace falta precargar el caché.

**Superficie que exporta.** [`ClienteEscanerView`](../../../apps/referidos-app/src/cliente/views/ClienteEscanerView.jsx#L5).

**Módulos que lo cargan.** [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L11) (importa).

**Dependencias del archivo.** `react`, [`../../cache/CacheView`](../../../apps/referidos-app/src/cache/CacheView.jsx), [`../../cache/cacheKeys`](../../../apps/referidos-app/src/cache/cacheKeys.js).

#### [`ClienteEscanerView`](../../../apps/referidos-app/src/cliente/views/ClienteEscanerView.jsx#L5) · componente React · exportación por defecto

Monta `CacheView`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `CacheView`.
- **Usa código de** [`CacheView`](../../../apps/referidos-app/src/cache/CacheView.jsx#L5) (renderiza), [`CACHE_KEYS`](../../../apps/referidos-app/src/cache/cacheKeys.js#L1) (accede al módulo).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L88) (renderiza).

### [`apps/referidos-app/src/cliente/views/ClienteHistorialView.jsx`](../../../apps/referidos-app/src/cliente/views/ClienteHistorialView.jsx#L1)

Punto de enrutado que activa `CLIENTE_HISTORIAL` en el scope `cliente` mediante `CacheView`. El contenido real lo monta el layout, con `CLIENTE_INICIO` como destino de arranque si hace falta precargar el caché.

**Superficie que exporta.** [`ClienteHistorialView`](../../../apps/referidos-app/src/cliente/views/ClienteHistorialView.jsx#L5).

**Módulos que lo cargan.** [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L12) (importa).

**Dependencias del archivo.** `react`, [`../../cache/CacheView`](../../../apps/referidos-app/src/cache/CacheView.jsx), [`../../cache/cacheKeys`](../../../apps/referidos-app/src/cache/cacheKeys.js).

#### [`ClienteHistorialView`](../../../apps/referidos-app/src/cliente/views/ClienteHistorialView.jsx#L5) · componente React · exportación por defecto

Monta `CacheView`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `CacheView`.
- **Usa código de** [`CacheView`](../../../apps/referidos-app/src/cache/CacheView.jsx#L5) (renderiza), [`CACHE_KEYS`](../../../apps/referidos-app/src/cache/cacheKeys.js#L1) (accede al módulo).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L90) (renderiza).

### [`apps/referidos-app/src/cliente/views/ClienteInicioView.jsx`](../../../apps/referidos-app/src/cliente/views/ClienteInicioView.jsx#L1)

Punto de enrutado que activa `CLIENTE_INICIO` en el scope `cliente` mediante `CacheView`. El contenido real lo monta el layout.

**Superficie que exporta.** [`ClienteInicioView`](../../../apps/referidos-app/src/cliente/views/ClienteInicioView.jsx#L5).

**Módulos que lo cargan.** [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L10) (importa).

**Dependencias del archivo.** `react`, [`../../cache/CacheView`](../../../apps/referidos-app/src/cache/CacheView.jsx), [`../../cache/cacheKeys`](../../../apps/referidos-app/src/cache/cacheKeys.js).

#### [`ClienteInicioView`](../../../apps/referidos-app/src/cliente/views/ClienteInicioView.jsx#L5) · componente React · exportación por defecto

Monta `CacheView`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `CacheView`.
- **Usa código de** [`CacheView`](../../../apps/referidos-app/src/cache/CacheView.jsx#L5) (renderiza), [`CACHE_KEYS`](../../../apps/referidos-app/src/cache/cacheKeys.js#L1) (accede al módulo).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L87) (renderiza).

### [`apps/referidos-app/src/cliente/views/ClientePerfilView.jsx`](../../../apps/referidos-app/src/cliente/views/ClientePerfilView.jsx#L1)

Punto de enrutado que activa `CLIENTE_PERFIL` en el scope `cliente` mediante `CacheView`. El contenido real lo monta el layout, con `CLIENTE_INICIO` como destino de arranque si hace falta precargar el caché.

**Superficie que exporta.** [`ClientePerfilView`](../../../apps/referidos-app/src/cliente/views/ClientePerfilView.jsx#L5).

**Módulos que lo cargan.** [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L13) (importa).

**Dependencias del archivo.** `react`, [`../../cache/CacheView`](../../../apps/referidos-app/src/cache/CacheView.jsx), [`../../cache/cacheKeys`](../../../apps/referidos-app/src/cache/cacheKeys.js).

#### [`ClientePerfilView`](../../../apps/referidos-app/src/cliente/views/ClientePerfilView.jsx#L5) · componente React · exportación por defecto

Monta `CacheView`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `CacheView`.
- **Usa código de** [`CacheView`](../../../apps/referidos-app/src/cache/CacheView.jsx#L5) (renderiza), [`CACHE_KEYS`](../../../apps/referidos-app/src/cache/cacheKeys.js#L1) (accede al módulo).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L89) (renderiza).
