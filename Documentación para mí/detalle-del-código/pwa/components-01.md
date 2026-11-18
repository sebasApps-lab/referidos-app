# PWA principal · Componentes reutilizables · 1 de 4

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/components/cards/HistorialItemCard.jsx`](../../../apps/referidos-app/src/components/cards/HistorialItemCard.jsx#L1)
- [`apps/referidos-app/src/components/cards/PromoCardCercanas.jsx`](../../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx#L1)
- [`apps/referidos-app/src/components/cards/PromoCardHot.jsx`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L1)
- [`apps/referidos-app/src/components/cards/PromoCardNuevas.jsx`](../../../apps/referidos-app/src/components/cards/PromoCardNuevas.jsx#L1)
- [`apps/referidos-app/src/components/cards/PromoCardVariant.jsx`](../../../apps/referidos-app/src/components/cards/PromoCardVariant.jsx#L1)
- [`apps/referidos-app/src/components/desktop/Footer.jsx`](../../../apps/referidos-app/src/components/desktop/Footer.jsx#L1)
- [`apps/referidos-app/src/components/desktop/FooterAlt.jsx`](../../../apps/referidos-app/src/components/desktop/FooterAlt.jsx#L1)
- [`apps/referidos-app/src/components/desktop/FooterWEB.jsx`](../../../apps/referidos-app/src/components/desktop/FooterWEB.jsx#L1)
- [`apps/referidos-app/src/components/desktop/FooterWEBup.jsx`](../../../apps/referidos-app/src/components/desktop/FooterWEBup.jsx#L1)
- [`apps/referidos-app/src/components/desktop/HeaderWEB.jsx`](../../../apps/referidos-app/src/components/desktop/HeaderWEB.jsx#L1)
- [`apps/referidos-app/src/components/errors/AppErrorBoundary.jsx`](../../../apps/referidos-app/src/components/errors/AppErrorBoundary.jsx#L1)
- [`apps/referidos-app/src/components/footer/Footer.jsx`](../../../apps/referidos-app/src/components/footer/Footer.jsx#L1)
- [`apps/referidos-app/src/components/gestionar/GestionarPanel.jsx`](../../../apps/referidos-app/src/components/gestionar/GestionarPanel.jsx#L1)
- [`apps/referidos-app/src/components/gestionar/GestionarTabs.jsx`](../../../apps/referidos-app/src/components/gestionar/GestionarTabs.jsx#L1)
- [`apps/referidos-app/src/components/gestionar/sections/Dispositivos.jsx`](../../../apps/referidos-app/src/components/gestionar/sections/Dispositivos.jsx#L1)
- [`apps/referidos-app/src/components/gestionar/sections/Grupos.jsx`](../../../apps/referidos-app/src/components/gestionar/sections/Grupos.jsx#L1)
- [`apps/referidos-app/src/components/gestionar/sections/Metricas.jsx`](../../../apps/referidos-app/src/components/gestionar/sections/Metricas.jsx#L1)
- [`apps/referidos-app/src/components/gestionar/sections/Seguridad.jsx`](../../../apps/referidos-app/src/components/gestionar/sections/Seguridad.jsx#L1)
- [`apps/referidos-app/src/components/header-elements/HeaderActions.jsx`](../../../apps/referidos-app/src/components/header-elements/HeaderActions.jsx#L1)
- [`apps/referidos-app/src/components/header-elements/index.js`](../../../apps/referidos-app/src/components/header-elements/index.js#L1)
- [`apps/referidos-app/src/components/header-elements/TabTitle.jsx`](../../../apps/referidos-app/src/components/header-elements/TabTitle.jsx#L1)
- [`apps/referidos-app/src/components/header-elements/UserIdentity.jsx`](../../../apps/referidos-app/src/components/header-elements/UserIdentity.jsx#L1)
- [`apps/referidos-app/src/components/header-panels/HeaderPanelContainer.jsx`](../../../apps/referidos-app/src/components/header-panels/HeaderPanelContainer.jsx#L1)
- [`apps/referidos-app/src/components/header-panels/index.js`](../../../apps/referidos-app/src/components/header-panels/index.js#L1)
- [`apps/referidos-app/src/components/header-panels/LocationPanel.jsx`](../../../apps/referidos-app/src/components/header-panels/LocationPanel.jsx#L1)
- [`apps/referidos-app/src/components/header-panels/NotificationsPanel.jsx`](../../../apps/referidos-app/src/components/header-panels/NotificationsPanel.jsx#L1)
- [`apps/referidos-app/src/components/header-panels/QueuePanel.jsx`](../../../apps/referidos-app/src/components/header-panels/QueuePanel.jsx#L1)
- [`apps/referidos-app/src/components/header-panels/SearchbarPanel.jsx`](../../../apps/referidos-app/src/components/header-panels/SearchbarPanel.jsx#L1)
- [`apps/referidos-app/src/components/header/cliente/HeaderCliente.jsx`](../../../apps/referidos-app/src/components/header/cliente/HeaderCliente.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/components/cards/HistorialItemCard.jsx`](../../../apps/referidos-app/src/components/cards/HistorialItemCard.jsx#L1)

Reutiliza la presentación visual de actividad y de estado entre listados de historial.

El archivo participa como entrada, adaptador de imports o reexportación.

### [`apps/referidos-app/src/components/cards/PromoCardCercanas.jsx`](../../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx#L1)

Dibuja una promo pensada para la sección de cercanía y muestra sus datos destacados.

**Superficie que exporta.** [`PromoCardCercanas`](../../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx#L7).

**Módulos que lo cargan.** [`ClienteInicio.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L5) (importa), [`InicioPromosPreview.jsx`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L4) (importa), [`PromoSection.jsx`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L2) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, `lucide-react`, [`../../utils/dateUtils`](../../../apps/referidos-app/src/utils/dateUtils.js), [`../../utils/sanitize`](../../../apps/referidos-app/src/utils/sanitize.js).

#### [`PromoCardCercanas`](../../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx#L7) · componente React · exportación por defecto

Monta `img`, `MapPin`, `Calendar`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{promo, className, wrapperProps}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Interfaz que monta** `img`, `MapPin`, `Calendar`.
- **Hooks que llama** `useNavigate`.
- **Condiciones que evalúa** `ausencia de promo`.
- **Usa código de** [`sanitizeText`](../../../apps/referidos-app/src/utils/sanitize.js#L2) (llama), [`formatDateIsoToDdMmYyyy`](../../../apps/referidos-app/src/utils/dateUtils.js#L2) (llama).
- **Llamadas directas en el cuerpo** [`sanitizeText`](../../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx#L12), [`join`](../../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx#L24), [`filter`](../../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx#L24), [`formatDateIsoToDdMmYyyy`](../../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx#L67).
- **Lo usa** [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L177) (renderiza), [`SECTIONS`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L207) (referencia), [`PromoSection`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L12) (referencia).

#### [`goDetalle`](../../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx#L11) · función · dentro de [`PromoCardCercanas`](../../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx#L7)

Atiende `article.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `article.onClick`.
- **Efectos y APIs** `navigate`.
- **Llamadas directas en el cuerpo** [`navigate`](../../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx#L11).
- **Lo usa** [`PromoCardCercanas`](../../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx#L35) (pasa a onClick).

### [`apps/referidos-app/src/components/cards/PromoCardHot.jsx`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L1)

Dibuja una promo destacada con recursos y encabezado visual de la variante Hot.

**Superficie que exporta.** [`PromoCardHot`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L8).

**Módulos que lo cargan.** [`InicioPromosPreview.jsx`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L5) (importa), [`SearchIdle.jsx`](../../../apps/referidos-app/src/components/search/SearchIdle.jsx#L1) (importa), [`SearchIdle.jsx`](../../../apps/referidos-app/src/search/SearchIdle.jsx#L1) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, [`../../utils/sanitize`](../../../apps/referidos-app/src/utils/sanitize.js), [`../../assets/badges/badge-promo-hot.png`](../../../apps/referidos-app/src/assets/badges/badge-promo-hot.png), [`../../assets/images/embers-bg.png`](../../../apps/referidos-app/src/assets/images/embers-bg.png), [`../../assets/overlays/hot-sparkles-overlay.png`](../../../apps/referidos-app/src/assets/overlays/hot-sparkles-overlay.png).

#### [`PromoCardHot`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L8) · componente React · exportación por defecto

Monta `img`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{promo, className, wrapperProps}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Estado o valores vinculados** `cardRef mediante useRef`, `localWrapperRef mediante useRef`, `localTextRef mediante useRef`, `[isMarquee, setIsMarquee] mediante useState`, `[marqueeDistance, setMarqueeDistance] mediante useState`, `[marqueeDuration, setMarqueeDuration] mediante useState`, `[isCardVisible, setIsCardVisible] mediante useState`, `[isNameVisible, setIsNameVisible] mediante useState`, `[isAnimating, setIsAnimating] mediante useState`, `animationTimerRef mediante useRef`, `stableVisibilityTimerRef mediante useRef`, `[isVisibilityStable, setIsVisibilityStable] mediante useState`.
- **Interfaz que monta** `img`.
- **Hooks que llama** `useNavigate`, `useRef`, `useState`, `useEffect`.
- **Condiciones que evalúa** `ausencia de safePromo`.
- **Usa código de** [`sanitizeText`](../../../apps/referidos-app/src/utils/sanitize.js#L2) (llama), [`sparklesOverlay`](../../../apps/referidos-app/src/assets/overlays/hot-sparkles-overlay.png) (pasa a src), [`embersBg`](../../../apps/referidos-app/src/assets/images/embers-bg.png) (pasa a src), [`badgeHot`](../../../apps/referidos-app/src/assets/badges/badge-promo-hot.png) (pasa a src).
- **Llamadas directas en el cuerpo** [`sanitizeText`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L16), [`join`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L39), [`filter`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L39).
- **Lo usa** [`SECTIONS`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L214) (referencia), [`SearchIdle`](../../../apps/referidos-app/src/components/search/SearchIdle.jsx#L33) (pasa a CardComponent), [`SearchIdle`](../../../apps/referidos-app/src/search/SearchIdle.jsx#L33) (pasa a CardComponent).

#### [`goDetalle`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L12) · función · dentro de [`PromoCardHot`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L8)

Atiende `article.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `article.onClick`.
- **Efectos y APIs** `navigate`.
- **Condiciones que evalúa** `ausencia de safePromo.id`.
- **Llamadas directas en el cuerpo** [`navigate`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L14).
- **Lo usa** [`PromoCardHot`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L180) (pasa a onClick).

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L43) · callback de infraestructura · dentro de [`PromoCardHot`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L8)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `PromoCardHot`.

- **Efectos y APIs** `window.addEventListener`, `window.removeEventListener`.
- **Condiciones que evalúa** `ausencia de wrapper o ausencia de text`, `resizeObserver`.
- **Llamadas directas en el cuerpo** [`update`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L64), [`resizeObserver.observe`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L72), [`window.addEventListener`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L75), [`resizeObserver.disconnect`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L80), [`window.removeEventListener`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L82).

#### [`update`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L48) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L43)

Coordina cambios de estado durante `update`.

- **Actualizaciones de estado o acciones** `setIsMarquee`, `setMarqueeDistance`, `setMarqueeDuration`.
- **Condiciones que evalúa** `ausencia de overflow`.
- **Llamadas directas en el cuerpo** [`setIsMarquee`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L52), [`setMarqueeDistance`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L54), [`setMarqueeDuration`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L55).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L64) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L87) · callback de infraestructura · dentro de [`PromoCardHot`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L8)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `PromoCardHot`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `clearTimeout`, `setTimeout`.
- **Condiciones que evalúa** `stableVisibilityTimerRef.current`.
- **Llamadas directas en el cuerpo** [`clearTimeout`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L89), [`setTimeout`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L93).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L93) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L87)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setIsVisibilityStable`.
- **Llamadas directas en el cuerpo** [`setIsVisibilityStable`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L94).

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L105) · callback de infraestructura · dentro de [`PromoCardHot`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L8)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `PromoCardHot`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `clearTimeout`, `setTimeout`.
- **Condiciones que evalúa** `animationTimerRef.current`, `ausencia de isVisibilityStable o isAnimating`, `undefined y window.matchMedia y matches`.
- **Llamadas directas en el cuerpo** [`clearTimeout`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L107), [`window.matchMedia`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L116), [`setTimeout`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L121).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L121) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L105)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setIsAnimating`.
- **Llamadas directas en el cuerpo** [`setIsAnimating`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L122).

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L133) · callback de infraestructura · dentro de [`PromoCardHot`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L8)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `PromoCardHot`.

- **Actualizaciones de estado o acciones** `setIsCardVisible`, `setIsNameVisible`.
- **Condiciones que evalúa** `undefined`, `ausencia de card o ausencia de name`.
- **Llamadas directas en el cuerpo** [`setIsCardVisible`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L135), [`setIsNameVisible`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L136), [`cardObserver.observe`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L161), [`nameObserver.observe`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L162), [`cardObserver.disconnect`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L165), [`nameObserver.disconnect`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L166).

#### [`span.onAnimationEnd`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L245) · callback JSX · dentro de [`PromoCardHot`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L8)

Responde al evento de interfaz `span.onAnimationEnd`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setIsAnimating`.
- **Llamadas directas en el cuerpo** [`setIsAnimating`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L245).

### [`apps/referidos-app/src/components/cards/PromoCardNuevas.jsx`](../../../apps/referidos-app/src/components/cards/PromoCardNuevas.jsx#L1)

Dibuja una promo pensada para el listado de novedades.

**Superficie que exporta.** [`PromoCardNuevas`](../../../apps/referidos-app/src/components/cards/PromoCardNuevas.jsx#L7).

**Módulos que lo cargan.** [`InicioPromosPreview.jsx`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L6) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, `lucide-react`, [`../../utils/sanitize`](../../../apps/referidos-app/src/utils/sanitize.js).

#### [`PromoCardNuevas`](../../../apps/referidos-app/src/components/cards/PromoCardNuevas.jsx#L7) · componente React · exportación por defecto

Monta `img`, `MapPin`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{promo, className, wrapperProps}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Interfaz que monta** `img`, `MapPin`.
- **Hooks que llama** `useNavigate`.
- **Condiciones que evalúa** `ausencia de promo`.
- **Usa código de** [`sanitizeText`](../../../apps/referidos-app/src/utils/sanitize.js#L2) (llama).
- **Llamadas directas en el cuerpo** [`sanitizeText`](../../../apps/referidos-app/src/components/cards/PromoCardNuevas.jsx#L12), [`join`](../../../apps/referidos-app/src/components/cards/PromoCardNuevas.jsx#L23), [`filter`](../../../apps/referidos-app/src/components/cards/PromoCardNuevas.jsx#L23).
- **Lo usa** [`SECTIONS`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L198) (referencia).

#### [`goDetalle`](../../../apps/referidos-app/src/components/cards/PromoCardNuevas.jsx#L11) · función · dentro de [`PromoCardNuevas`](../../../apps/referidos-app/src/components/cards/PromoCardNuevas.jsx#L7)

Atiende `article.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `article.onClick`.
- **Efectos y APIs** `navigate`.
- **Llamadas directas en el cuerpo** [`navigate`](../../../apps/referidos-app/src/components/cards/PromoCardNuevas.jsx#L11).
- **Lo usa** [`PromoCardNuevas`](../../../apps/referidos-app/src/components/cards/PromoCardNuevas.jsx#L34) (pasa a onClick).

### [`apps/referidos-app/src/components/cards/PromoCardVariant.jsx`](../../../apps/referidos-app/src/components/cards/PromoCardVariant.jsx#L1)

Selecciona o adapta una variante de tarjeta desde las props comunes de una promoción.

**Superficie que exporta.** [`PromoCardHot`](../../../apps/referidos-app/src/components/cards/PromoCardVariant.jsx#L6).

**Dependencias del archivo.** `react`, `react-router-dom`, `lucide-react`, [`../../utils/sanitize`](../../../apps/referidos-app/src/utils/sanitize.js).

#### [`PromoCardHot`](../../../apps/referidos-app/src/components/cards/PromoCardVariant.jsx#L6) · componente React · exportación por defecto

Monta `img`, `MapPin`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{promo, className, wrapperProps}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Interfaz que monta** `img`, `MapPin`.
- **Hooks que llama** `useNavigate`.
- **Condiciones que evalúa** `ausencia de promo`.
- **Usa código de** [`sanitizeText`](../../../apps/referidos-app/src/utils/sanitize.js#L2) (llama).
- **Llamadas directas en el cuerpo** [`sanitizeText`](../../../apps/referidos-app/src/components/cards/PromoCardVariant.jsx#L11), [`join`](../../../apps/referidos-app/src/components/cards/PromoCardVariant.jsx#L21), [`filter`](../../../apps/referidos-app/src/components/cards/PromoCardVariant.jsx#L21).

#### [`goDetalle`](../../../apps/referidos-app/src/components/cards/PromoCardVariant.jsx#L10) · función · dentro de [`PromoCardHot`](../../../apps/referidos-app/src/components/cards/PromoCardVariant.jsx#L6)

Atiende `article.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `article.onClick`.
- **Efectos y APIs** `navigate`.
- **Llamadas directas en el cuerpo** [`navigate`](../../../apps/referidos-app/src/components/cards/PromoCardVariant.jsx#L10).
- **Lo usa** [`PromoCardHot`](../../../apps/referidos-app/src/components/cards/PromoCardVariant.jsx#L32) (pasa a onClick).

### [`apps/referidos-app/src/components/desktop/Footer.jsx`](../../../apps/referidos-app/src/components/desktop/Footer.jsx#L1)

Compone uno de los pies de página de la experiencia web de escritorio. Sigue su consumidor para identificar la variante.

**Superficie que exporta.** [`FooterAlt`](../../../apps/referidos-app/src/components/desktop/Footer.jsx#L6).

**Dependencias del archivo.** `react`, `react-router-dom`, `lucide-react`.

#### [`FooterAlt`](../../../apps/referidos-app/src/components/desktop/Footer.jsx#L6) · componente React · exportación por defecto

Monta `Link`, `Mail`, `Github`, `Heart`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Link`, `Mail`, `Github`, `Heart`.

### [`apps/referidos-app/src/components/desktop/FooterAlt.jsx`](../../../apps/referidos-app/src/components/desktop/FooterAlt.jsx#L1)

Alternativa visual de pie de escritorio que conserva una composición independiente.

**Superficie que exporta.** [`Footer`](../../../apps/referidos-app/src/components/desktop/FooterAlt.jsx#L6).

**Dependencias del archivo.** `framer-motion`, `lucide-react`.

#### [`Footer`](../../../apps/referidos-app/src/components/desktop/FooterAlt.jsx#L6) · componente React · exportación por defecto

Monta `TEMP_MOTION_SPLASH_TAG`, `Phone`, `Info`, `Github`, `Heart`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `TEMP_MOTION_SPLASH_TAG`, `Phone`, `Info`, `Github`, `Heart`.

### [`apps/referidos-app/src/components/desktop/FooterWEB.jsx`](../../../apps/referidos-app/src/components/desktop/FooterWEB.jsx#L1)

Pie usado por una variante de la página web con navegación y enlaces propios.

**Superficie que exporta.** [`Footer`](../../../apps/referidos-app/src/components/desktop/FooterWEB.jsx#L7).

**Dependencias del archivo.** `react`, `react-router-dom`, `lucide-react`, [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js).

#### [`Footer`](../../../apps/referidos-app/src/components/desktop/FooterWEB.jsx#L7) · componente React · exportación por defecto

Monta `Link`, `Mail`, `Github`, `Heart`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `onboarding mediante useAppStore`, `selector s.onboarding`, `bootstrap mediante useAppStore`, `selector s.bootstrap`.
- **Interfaz que monta** `Link`, `Mail`, `Github`, `Heart`.
- **Hooks que llama** `useAppStore`.
- **Condiciones que evalúa** `bootstrap o undefined`, `ausencia de usuario o ausencia de onboarding.allowAccess`, `ausencia de usuario.role`, `role`, `links.length`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama).
- **Llamadas directas en el cuerpo** [`links.map`](../../../apps/referidos-app/src/components/desktop/FooterWEB.jsx#L57).

### [`apps/referidos-app/src/components/desktop/FooterWEBup.jsx`](../../../apps/referidos-app/src/components/desktop/FooterWEBup.jsx#L1)

Compone la franja superior de la variante de pie WEB.

**Superficie que exporta.** [`Header`](../../../apps/referidos-app/src/components/desktop/FooterWEBup.jsx#L7).

**Dependencias del archivo.** `react`, `framer-motion`, `lucide-react`, [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js).

#### [`Header`](../../../apps/referidos-app/src/components/desktop/FooterWEBup.jsx#L7) · componente React · exportación por defecto

Monta `button`, `TEMP_MOTION_SPLASH_TAG`, `Phone`, `Info`, `Github`, `Heart`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{locAllowed, hideLocationBar, onCloseLocationBar, onHeaderHeightChange}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `bootstrap mediante useAppStore`, `selector s.bootstrap`, `onboarding mediante useAppStore`, `selector s.onboarding`, `headerRef mediante useRef`.
- **Interfaz que monta** `button`, `TEMP_MOTION_SPLASH_TAG`, `Phone`, `Info`, `Github`, `Heart`.
- **Hooks que llama** `useAppStore`, `useRef`, `useLayoutEffect`.
- **Condiciones que evalúa** `bootstrap o undefined`, `ausencia de usuario o ausencia de onboarding.allowAccess`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama).

#### [`useLayoutEffect · callback`](../../../apps/referidos-app/src/components/desktop/FooterWEBup.jsx#L21) · callback de infraestructura · dentro de [`Header`](../../../apps/referidos-app/src/components/desktop/FooterWEBup.jsx#L7)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `Header`.

- **Condiciones que evalúa** `bootstrap o undefined`, `ausencia de usuario o ausencia de onboarding.allowAccess`, `headerRef.current y onHeaderHeightChange`.
- **Llamadas directas en el cuerpo** [`onHeaderHeightChange`](../../../apps/referidos-app/src/components/desktop/FooterWEBup.jsx#L25).

### [`apps/referidos-app/src/components/desktop/HeaderWEB.jsx`](../../../apps/referidos-app/src/components/desktop/HeaderWEB.jsx#L1)

Monta navegación del encabezado para la composición de sitio de escritorio.

**Superficie que exporta.** [`HeaderAlt`](../../../apps/referidos-app/src/components/desktop/HeaderWEB.jsx#L16).

**Dependencias del archivo.** `react`, `react-router-dom`, `lucide-react`, `framer-motion`, [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js).

#### [`HeaderAlt`](../../../apps/referidos-app/src/components/desktop/HeaderWEB.jsx#L16) · componente React · exportación por defecto

Monta `Link`, `TEMP_MOTION_SPLASH_TAG`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `onboarding mediante useAppStore`, `selector s.onboarding`, `bootstrap mediante useAppStore`, `selector s.bootstrap`.
- **Interfaz que monta** `Link`, `TEMP_MOTION_SPLASH_TAG`.
- **Hooks que llama** `useLocation`, `useAppStore`.
- **Condiciones que evalúa** `bootstrap o undefined`, `ausencia de usuario o ausencia de onboarding.allowAccess`, `ausencia de usuario.role`, `role`, `links.length`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama).
- **Llamadas directas en el cuerpo** [`links.map`](../../../apps/referidos-app/src/components/desktop/HeaderWEB.jsx#L81), [`isActive`](../../../apps/referidos-app/src/components/desktop/HeaderWEB.jsx#L82), [`React.createElement`](../../../apps/referidos-app/src/components/desktop/HeaderWEB.jsx#L91).

#### [`isActive`](../../../apps/referidos-app/src/components/desktop/HeaderWEB.jsx#L68) · función · dentro de [`HeaderAlt`](../../../apps/referidos-app/src/components/desktop/HeaderWEB.jsx#L16)

Comprueba `Active` para decidir si se admite o continúa la operación.

- **Entradas** `path`.
- **Llamadas directas en el cuerpo** [`location.pathname.startsWith`](../../../apps/referidos-app/src/components/desktop/HeaderWEB.jsx#L71).
- **Lo usa** [`HeaderAlt`](../../../apps/referidos-app/src/components/desktop/HeaderWEB.jsx#L82) (llama).

### [`apps/referidos-app/src/components/errors/AppErrorBoundary.jsx`](../../../apps/referidos-app/src/components/errors/AppErrorBoundary.jsx#L1)

Captura errores lanzados por el render React para registrar el fallo y mostrar una recuperación de interfaz.

**Superficie que exporta.** [`AppErrorBoundary`](../../../apps/referidos-app/src/components/errors/AppErrorBoundary.jsx#L4).

**Módulos que lo cargan.** [`App.jsx`](../../../apps/referidos-app/src/App.jsx#L10) (importa).

**Dependencias del archivo.** `react`, [`../../services/loggingClient`](../../../apps/referidos-app/src/services/loggingClient.js).

#### [`AppErrorBoundary`](../../../apps/referidos-app/src/components/errors/AppErrorBoundary.jsx#L4) · clase · exportación por defecto

Agrupa `App Error Boundary` y los métodos que comparten su estado o ciclo de vida.

- **Campos o contexto** `extiende React.Component`.
- **Lo usa** [`AppErrorBoundary.jsx`](../../../apps/referidos-app/src/components/errors/AppErrorBoundary.jsx#L58) (referencia), [`App`](../../../apps/referidos-app/src/App.jsx#L43) (renderiza).

#### [`AppErrorBoundary.constructor`](../../../apps/referidos-app/src/components/errors/AppErrorBoundary.jsx#L5) · método de clase

Implementa el valor de function Object() { [native code] } dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `props`.
- **Llamadas directas en el cuerpo** [`super`](../../../apps/referidos-app/src/components/errors/AppErrorBoundary.jsx#L6).

#### [`AppErrorBoundary.getDerivedStateFromError`](../../../apps/referidos-app/src/components/errors/AppErrorBoundary.jsx#L10) · método de clase

Obtiene o resuelve `Derived State From Error` para entregarlo al consumidor.

- **Retorno visible o tipo declarado** `hasError`.

#### [`AppErrorBoundary.componentDidCatch`](../../../apps/referidos-app/src/components/errors/AppErrorBoundary.jsx#L14) · método de clase

Implementa `component Did Catch` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `error`, `info`.
- **Usa código de** [`logError`](../../../apps/referidos-app/src/services/loggingClient.js#L185) (llama), [`reportError`](../../../apps/referidos-app/src/services/loggingClient.js#L190) (llama).
- **Llamadas directas en el cuerpo** [`logError`](../../../apps/referidos-app/src/components/errors/AppErrorBoundary.jsx#L15), [`reportError`](../../../apps/referidos-app/src/components/errors/AppErrorBoundary.jsx#L19).

#### [`AppErrorBoundary.handleReload`](../../../apps/referidos-app/src/components/errors/AppErrorBoundary.jsx#L28) · función

Maneja `Reload` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`window.location.reload`](../../../apps/referidos-app/src/components/errors/AppErrorBoundary.jsx#L29).

#### [`AppErrorBoundary.render`](../../../apps/referidos-app/src/components/errors/AppErrorBoundary.jsx#L32) · método de clase

Prepara contenido JSX usando `button`.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`.
- **Condiciones que evalúa** `this.state.hasError`.

### [`apps/referidos-app/src/components/footer/Footer.jsx`](../../../apps/referidos-app/src/components/footer/Footer.jsx#L1)

Compone el pie compartido en la variante de shell que lo importe.

**Superficie que exporta.** [`Footer`](../../../apps/referidos-app/src/components/footer/Footer.jsx#L10).

**Módulos que lo cargan.** [`MainLayout.jsx`](../../../apps/referidos-app/src/layouts/MainLayout.jsx#L4) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, `lucide-react`, `framer-motion`, [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../../cliente/layout/ClienteFooter`](../../../apps/referidos-app/src/cliente/layout/ClienteFooter.jsx).

#### [`Footer`](../../../apps/referidos-app/src/components/footer/Footer.jsx#L10) · componente React · exportación por defecto

Monta `ClienteFooter`, `Link`, `TEMP_MOTION_SPLASH_TAG`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `onboarding mediante useAppStore`, `selector s.onboarding`, `bootstrap mediante useAppStore`, `selector s.bootstrap`.
- **Interfaz que monta** `ClienteFooter`, `Link`, `TEMP_MOTION_SPLASH_TAG`.
- **Hooks que llama** `useLocation`, `useAppStore`.
- **Condiciones que evalúa** `bootstrap o undefined`, `ausencia de usuario o ausencia de onboarding.allowAccess`, `ausencia de usuario.role`, `role`, `linksMobile.length`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`ClienteFooter`](../../../apps/referidos-app/src/cliente/layout/ClienteFooter.jsx#L8) (renderiza).
- **Llamadas directas en el cuerpo** [`linksMobile.map`](../../../apps/referidos-app/src/components/footer/Footer.jsx#L96), [`isActive`](../../../apps/referidos-app/src/components/footer/Footer.jsx#L97), [`React.createElement`](../../../apps/referidos-app/src/components/footer/Footer.jsx#L113).
- **Lo usa** [`MainLayout`](../../../apps/referidos-app/src/layouts/MainLayout.jsx#L71) (renderiza).

#### [`GestionarIcon`](../../../apps/referidos-app/src/components/footer/Footer.jsx#L34) · componente React · dentro de [`Footer`](../../../apps/referidos-app/src/components/footer/Footer.jsx#L10)

Monta `Octagon`, `Plus`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{size}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Octagon`, `Plus`.
- **Lo usa** [`Footer`](../../../apps/referidos-app/src/components/footer/Footer.jsx#L74) (referencia).

#### [`isActive`](../../../apps/referidos-app/src/components/footer/Footer.jsx#L53) · función · dentro de [`Footer`](../../../apps/referidos-app/src/components/footer/Footer.jsx#L10)

Comprueba `Active` para decidir si se admite o continúa la operación.

- **Entradas** `path`.
- **Llamadas directas en el cuerpo** [`location.pathname.startsWith`](../../../apps/referidos-app/src/components/footer/Footer.jsx#L56).
- **Lo usa** [`Footer`](../../../apps/referidos-app/src/components/footer/Footer.jsx#L97) (llama).

### [`apps/referidos-app/src/components/gestionar/GestionarPanel.jsx`](../../../apps/referidos-app/src/components/gestionar/GestionarPanel.jsx#L1)

Selecciona la sección del panel de gestión según la pestaña activa.

**Superficie que exporta.** [`GestionarPanel`](../../../apps/referidos-app/src/components/gestionar/GestionarPanel.jsx#L5).

**Dependencias del archivo.** `react`, `framer-motion`.

#### [`GestionarPanel`](../../../apps/referidos-app/src/components/gestionar/GestionarPanel.jsx#L5) · componente React · exportación por defecto

Monta `TEMP_MOTION_SPLASH_TAG`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{activeId, children}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `TEMP_MOTION_SPLASH_TAG`.

### [`apps/referidos-app/src/components/gestionar/GestionarTabs.jsx`](../../../apps/referidos-app/src/components/gestionar/GestionarTabs.jsx#L1)

Declara etiquetas y navegación entre las secciones de gestión.

**Superficie que exporta.** [`GestionarTabs`](../../../apps/referidos-app/src/components/gestionar/GestionarTabs.jsx#L5).

**Dependencias del archivo.** `react`, `framer-motion`.

#### [`GestionarTabs`](../../../apps/referidos-app/src/components/gestionar/GestionarTabs.jsx#L5) · componente React · exportación por defecto

Monta `TEMP_MOTION_SPLASH_TAG`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{tabs, activeId, onChange}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `TEMP_MOTION_SPLASH_TAG`, `button`.
- **Llamadas directas en el cuerpo** [`tabs.map`](../../../apps/referidos-app/src/components/gestionar/GestionarTabs.jsx#L17).

#### [`button.onClick`](../../../apps/referidos-app/src/components/gestionar/GestionarTabs.jsx#L24) · callback JSX · dentro de [`GestionarTabs`](../../../apps/referidos-app/src/components/gestionar/GestionarTabs.jsx#L5)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onChange`](../../../apps/referidos-app/src/components/gestionar/GestionarTabs.jsx#L24).

### [`apps/referidos-app/src/components/gestionar/sections/Dispositivos.jsx`](../../../apps/referidos-app/src/components/gestionar/sections/Dispositivos.jsx#L1)

Compone la presentación de dispositivos para la sección Gestionar; las sesiones reales del perfil usan sessionDevicesService.

**Superficie que exporta.** [`Dispositivos`](../../../apps/referidos-app/src/components/gestionar/sections/Dispositivos.jsx#L6).

**Dependencias del archivo.** `react`, `framer-motion`, `lucide-react`.

#### [`Dispositivos`](../../../apps/referidos-app/src/components/gestionar/sections/Dispositivos.jsx#L6) · componente React · exportación por defecto

Monta `button`, `TEMP_MOTION_SPLASH_TAG`, `Wifi`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `TEMP_MOTION_SPLASH_TAG`, `Wifi`.
- **Llamadas directas en el cuerpo** [`devices.map`](../../../apps/referidos-app/src/components/gestionar/sections/Dispositivos.jsx#L54).

### [`apps/referidos-app/src/components/gestionar/sections/Grupos.jsx`](../../../apps/referidos-app/src/components/gestionar/sections/Grupos.jsx#L1)

Presenta tarjetas de segmentos con datos de ejemplo. La estructura visual sirve para ubicar el futuro flujo de administración de segmentos.

**Superficie que exporta.** [`Grupos`](../../../apps/referidos-app/src/components/gestionar/sections/Grupos.jsx#L6).

**Dependencias del archivo.** `react`, `framer-motion`, `lucide-react`.

#### [`Grupos`](../../../apps/referidos-app/src/components/gestionar/sections/Grupos.jsx#L6) · componente React · exportación por defecto

Monta `button`, `TEMP_MOTION_SPLASH_TAG`, `Target`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `TEMP_MOTION_SPLASH_TAG`, `Target`.
- **Llamadas directas en el cuerpo** [`groups.map`](../../../apps/referidos-app/src/components/gestionar/sections/Grupos.jsx#L54), [`map`](../../../apps/referidos-app/src/components/gestionar/sections/Grupos.jsx#L88).

### [`apps/referidos-app/src/components/gestionar/sections/Metricas.jsx`](../../../apps/referidos-app/src/components/gestionar/sections/Metricas.jsx#L1)

Agrupa tarjetas y representaciones del área de métricas de gestión.

**Superficie que exporta.** [`Metricas`](../../../apps/referidos-app/src/components/gestionar/sections/Metricas.jsx#L6).

**Dependencias del archivo.** `react`, `framer-motion`, `lucide-react`.

#### [`Metricas`](../../../apps/referidos-app/src/components/gestionar/sections/Metricas.jsx#L6) · componente React · exportación por defecto

Monta `TEMP_MOTION_SPLASH_TAG`, `ArrowUpRight`, `Sparkles`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `TEMP_MOTION_SPLASH_TAG`, `ArrowUpRight`, `Sparkles`.
- **Llamadas directas en el cuerpo** [`kpis.map`](../../../apps/referidos-app/src/components/gestionar/sections/Metricas.jsx#L47), [`bars.map`](../../../apps/referidos-app/src/components/gestionar/sections/Metricas.jsx#L88), [`topPromos.map`](../../../apps/referidos-app/src/components/gestionar/sections/Metricas.jsx#L106).

### [`apps/referidos-app/src/components/gestionar/sections/Seguridad.jsx`](../../../apps/referidos-app/src/components/gestionar/sections/Seguridad.jsx#L1)

Presenta controles o estado del área de seguridad dentro de Gestionar, separado de la autorización del servidor.

**Superficie que exporta.** [`Seguridad`](../../../apps/referidos-app/src/components/gestionar/sections/Seguridad.jsx#L6).

**Dependencias del archivo.** `react`, `framer-motion`, `lucide-react`.

#### [`Seguridad`](../../../apps/referidos-app/src/components/gestionar/sections/Seguridad.jsx#L6) · componente React · exportación por defecto

Monta `button`, `TEMP_MOTION_SPLASH_TAG`, `KeyRound`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[settings, setSettings] mediante useState`.
- **Interfaz que monta** `button`, `TEMP_MOTION_SPLASH_TAG`, `KeyRound`.
- **Hooks que llama** `useState`.
- **Llamadas directas en el cuerpo** [`rows.map`](../../../apps/referidos-app/src/components/gestionar/sections/Seguridad.jsx#L61).

#### [`toggle`](../../../apps/referidos-app/src/components/gestionar/sections/Seguridad.jsx#L16) · función · dentro de [`Seguridad`](../../../apps/referidos-app/src/components/gestionar/sections/Seguridad.jsx#L6)

Coordina cambios de estado durante `toggle`.

- **Entradas** `key`.
- **Actualizaciones de estado o acciones** `setSettings`.
- **Llamadas directas en el cuerpo** [`setSettings`](../../../apps/referidos-app/src/components/gestionar/sections/Seguridad.jsx#L17).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/components/gestionar/sections/Seguridad.jsx#L86) (llama).

#### [`button.onClick`](../../../apps/referidos-app/src/components/gestionar/sections/Seguridad.jsx#L86) · callback JSX · dentro de [`Seguridad`](../../../apps/referidos-app/src/components/gestionar/sections/Seguridad.jsx#L6)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`toggle`](../../../apps/referidos-app/src/components/gestionar/sections/Seguridad.jsx#L86).

### [`apps/referidos-app/src/components/header-elements/HeaderActions.jsx`](../../../apps/referidos-app/src/components/header-elements/HeaderActions.jsx#L1)

Agrupa los botones disponibles en la cabecera y emite sus acciones al contenedor.

**Superficie que exporta.** [`HeaderActions`](../../../apps/referidos-app/src/components/header-elements/HeaderActions.jsx#L3).

**Módulos que lo cargan.** [`index.js`](../../../apps/referidos-app/src/components/header-elements/index.js#L2) (reexporta HeaderActions).

**Dependencias del archivo.** `lucide-react`.

#### [`HeaderActions`](../../../apps/referidos-app/src/components/header-elements/HeaderActions.jsx#L3) · componente React · exportación por defecto

Monta `button`, `MapPin`, `Bell`, `Timer`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onToggleLocation, locationOpen, locationPanel, onToggleNotifications, notificationsOpen, notificationsPanel, onToggleQueue, queueOpen, queuePanel, notiCount}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `MapPin`, `Bell`, `Timer`.
- **Lo usa** [`ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L156) (renderiza).

### [`apps/referidos-app/src/components/header-elements/index.js`](../../../apps/referidos-app/src/components/header-elements/index.js#L1)

Punto de importación público de `header-elements`. Reexporta sus piezas para que un consumidor pueda importar desde la carpeta.

**Reexporta.** `UserIdentity` de [`default`](../../../apps/referidos-app/src/components/header-elements/UserIdentity.jsx), `HeaderActions` de [`default`](../../../apps/referidos-app/src/components/header-elements/HeaderActions.jsx), `TabTitle` de [`default`](../../../apps/referidos-app/src/components/header-elements/TabTitle.jsx).

**Módulos que lo cargan.** [`ClienteHeader.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L9) (importa).

El archivo participa como entrada, adaptador de imports o reexportación.

### [`apps/referidos-app/src/components/header-elements/TabTitle.jsx`](../../../apps/referidos-app/src/components/header-elements/TabTitle.jsx#L1)

Muestra el título de la pestaña o sección que el contexto de rol seleccionó.

**Superficie que exporta.** [`TabTitle`](../../../apps/referidos-app/src/components/header-elements/TabTitle.jsx#L1).

**Módulos que lo cargan.** [`index.js`](../../../apps/referidos-app/src/components/header-elements/index.js#L3) (reexporta TabTitle).

#### [`TabTitle`](../../../apps/referidos-app/src/components/header-elements/TabTitle.jsx#L1) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{title, action}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L123) (renderiza).

### [`apps/referidos-app/src/components/header-elements/UserIdentity.jsx`](../../../apps/referidos-app/src/components/header-elements/UserIdentity.jsx#L1)

Dibuja nombre, imagen y otros elementos de identidad en cabecera.

**Superficie que exporta.** [`UserIdentity`](../../../apps/referidos-app/src/components/header-elements/UserIdentity.jsx#L3).

**Módulos que lo cargan.** [`index.js`](../../../apps/referidos-app/src/components/header-elements/index.js#L1) (reexporta UserIdentity).

**Dependencias del archivo.** `react-router-dom`.

#### [`UserIdentity`](../../../apps/referidos-app/src/components/header-elements/UserIdentity.jsx#L3) · componente React · exportación por defecto

Monta `Link`, `img`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{profilePath, avatarSrc, tier, displayName}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Link`, `img`.
- **Lo usa** [`ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L150) (renderiza).

### [`apps/referidos-app/src/components/header-panels/HeaderPanelContainer.jsx`](../../../apps/referidos-app/src/components/header-panels/HeaderPanelContainer.jsx#L1)

Proporciona la estructura visual para que los paneles se monten con dimensiones y separación consistentes.

**Superficie que exporta.** [`HeaderPanelContainer`](../../../apps/referidos-app/src/components/header-panels/HeaderPanelContainer.jsx#L3).

**Módulos que lo cargan.** [`index.js`](../../../apps/referidos-app/src/components/header-panels/index.js#L1) (reexporta HeaderPanelContainer).

**Dependencias del archivo.** `react`.

#### [`HeaderPanelContainer`](../../../apps/referidos-app/src/components/header-panels/HeaderPanelContainer.jsx#L3) · componente React · exportación por defecto

Monta `Wrapper`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{open, wrapperClassName, panelClassName, panelProps, children}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Wrapper`.
- **Lo usa** [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L153) (renderiza), [`ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L170) (renderiza), [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1816) (renderiza).

### [`apps/referidos-app/src/components/header-panels/index.js`](../../../apps/referidos-app/src/components/header-panels/index.js#L1)

Punto de importación público de `header-panels`. Reexporta sus piezas para que un consumidor pueda importar desde la carpeta.

**Reexporta.** `HeaderPanelContainer` de [`default`](../../../apps/referidos-app/src/components/header-panels/HeaderPanelContainer.jsx), `LocationPanel` de [`default`](../../../apps/referidos-app/src/components/header-panels/LocationPanel.jsx), `NotificationsPanel` de [`default`](../../../apps/referidos-app/src/components/header-panels/NotificationsPanel.jsx), `QueuePanel` de [`default`](../../../apps/referidos-app/src/components/header-panels/QueuePanel.jsx), `SearchbarPanel` de [`default`](../../../apps/referidos-app/src/components/header-panels/SearchbarPanel.jsx).

**Módulos que lo cargan.** [`ClienteInicio.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L6) (importa), [`ClienteHeader.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L2) (importa), [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L45) (importa).

El archivo participa como entrada, adaptador de imports o reexportación.

### [`apps/referidos-app/src/components/header-panels/LocationPanel.jsx`](../../../apps/referidos-app/src/components/header-panels/LocationPanel.jsx#L1)

Expone opciones de ubicación dentro de la cabecera y pasa las callbacks al panel activo.

**Superficie que exporta.** [`LocationPanel`](../../../apps/referidos-app/src/components/header-panels/LocationPanel.jsx#L4).

**Módulos que lo cargan.** [`index.js`](../../../apps/referidos-app/src/components/header-panels/index.js#L2) (reexporta LocationPanel).

**Dependencias del archivo.** `lucide-react`, [`../ui/Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx).

#### [`LocationPanel`](../../../apps/referidos-app/src/components/header-panels/LocationPanel.jsx#L4) · componente React · exportación por defecto

Monta `Badge`, `button`, `Pencil`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{locations, open, onEditLocation, onViewAll}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Badge`, `button`, `Pencil`.
- **Usa código de** [`Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx#L1) (renderiza).
- **Llamadas directas en el cuerpo** [`safeLocations.map`](../../../apps/referidos-app/src/components/header-panels/LocationPanel.jsx#L26).
- **Lo usa** [`ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L176) (renderiza).

#### [`button.onClick`](../../../apps/referidos-app/src/components/header-panels/LocationPanel.jsx#L36) · callback JSX · dentro de [`LocationPanel`](../../../apps/referidos-app/src/components/header-panels/LocationPanel.jsx#L4)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onEditLocation`](../../../apps/referidos-app/src/components/header-panels/LocationPanel.jsx#L36).

#### [`button.onClick`](../../../apps/referidos-app/src/components/header-panels/LocationPanel.jsx#L47) · callback JSX · dentro de [`LocationPanel`](../../../apps/referidos-app/src/components/header-panels/LocationPanel.jsx#L4)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onViewAll`](../../../apps/referidos-app/src/components/header-panels/LocationPanel.jsx#L47).

### [`apps/referidos-app/src/components/header-panels/NotificationsPanel.jsx`](../../../apps/referidos-app/src/components/header-panels/NotificationsPanel.jsx#L1)

Muestra la superficie de notificaciones como panel de cabecera.

**Superficie que exporta.** [`NotificationsPanel`](../../../apps/referidos-app/src/components/header-panels/NotificationsPanel.jsx#L1).

**Módulos que lo cargan.** [`index.js`](../../../apps/referidos-app/src/components/header-panels/index.js#L3) (reexporta NotificationsPanel).

#### [`NotificationsPanel`](../../../apps/referidos-app/src/components/header-panels/NotificationsPanel.jsx#L1) · componente React · exportación por defecto

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{notifications}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`.
- **Llamadas directas en el cuerpo** [`notifications.map`](../../../apps/referidos-app/src/components/header-panels/NotificationsPanel.jsx#L11).
- **Lo usa** [`ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L202) (renderiza).

### [`apps/referidos-app/src/components/header-panels/QueuePanel.jsx`](../../../apps/referidos-app/src/components/header-panels/QueuePanel.jsx#L1)

Presenta el estado de cola de soporte en la cabecera y sus acciones.

**Superficie que exporta.** [`QueuePanel`](../../../apps/referidos-app/src/components/header-panels/QueuePanel.jsx#L1).

**Módulos que lo cargan.** [`index.js`](../../../apps/referidos-app/src/components/header-panels/index.js#L4) (reexporta QueuePanel).

#### [`QueuePanel`](../../../apps/referidos-app/src/components/header-panels/QueuePanel.jsx#L1) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L227) (renderiza).

### [`apps/referidos-app/src/components/header-panels/SearchbarPanel.jsx`](../../../apps/referidos-app/src/components/header-panels/SearchbarPanel.jsx#L1)

Coloca la barra o controles de búsqueda dentro de la superficie de cabecera.

**Superficie que exporta.** [`SearchbarPanel`](../../../apps/referidos-app/src/components/header-panels/SearchbarPanel.jsx#L3).

**Módulos que lo cargan.** [`index.js`](../../../apps/referidos-app/src/components/header-panels/index.js#L5) (reexporta SearchbarPanel).

**Dependencias del archivo.** [`../../search/SearchBar`](../../../apps/referidos-app/src/search/SearchBar.jsx).

#### [`SearchbarPanel`](../../../apps/referidos-app/src/components/header-panels/SearchbarPanel.jsx#L3) · componente React · exportación por defecto

Monta `SearchBar`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{value, onChange, onFilters, onFocus, onCancel, showBack, autoFocus}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SearchBar`.
- **Usa código de** [`SearchBar`](../../../apps/referidos-app/src/search/SearchBar.jsx#L3) (renderiza).
- **Lo usa** [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L158) (renderiza), [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1833) (renderiza).

### [`apps/referidos-app/src/components/header/cliente/HeaderCliente.jsx`](../../../apps/referidos-app/src/components/header/cliente/HeaderCliente.jsx#L1)

Compone la variante de cabecera cliente en el árbol components/header, diferente de cliente/layout.

**Superficie que exporta.** [`HeaderCliente`](../../../apps/referidos-app/src/components/header/cliente/HeaderCliente.jsx#L4).

**Módulos que lo cargan.** [`Header.jsx`](../../../apps/referidos-app/src/components/header/Header.jsx#L5) (importa).

**Dependencias del archivo.** `react`, [`../../../cliente/layout/ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx).

#### [`HeaderCliente`](../../../apps/referidos-app/src/components/header/cliente/HeaderCliente.jsx#L4) · componente React · exportación por defecto

Monta `ClienteHeader`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{collapsedRef, expandedRef, ...rest}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `ClienteHeader`.
- **Usa código de** [`ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L23) (renderiza).
- **Lo usa** [`Header`](../../../apps/referidos-app/src/components/header/Header.jsx#L236) (renderiza).
