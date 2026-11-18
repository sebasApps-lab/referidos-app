# PWA principal · Páginas y rutas · 2 de 2

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/pages/negocio/NegocioGestionar.jsx`](../../../apps/referidos-app/src/pages/negocio/NegocioGestionar.jsx#L1)
- [`apps/referidos-app/src/pages/negocio/NegocioInicio.jsx`](../../../apps/referidos-app/src/pages/negocio/NegocioInicio.jsx#L1)
- [`apps/referidos-app/src/pages/negocio/NegocioPerfil.jsx`](../../../apps/referidos-app/src/pages/negocio/NegocioPerfil.jsx#L1)
- [`apps/referidos-app/src/pages/PromoDetalle.jsx`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L1)
- [`apps/referidos-app/src/pages/Promos.jsx`](../../../apps/referidos-app/src/pages/Promos.jsx#L1)
- [`apps/referidos-app/src/pages/RecuperarPassword.jsx`](../../../apps/referidos-app/src/pages/RecuperarPassword.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/pages/negocio/NegocioGestionar.jsx`](../../../apps/referidos-app/src/pages/negocio/NegocioGestionar.jsx#L1)

Wrapper de página para `NegocioGestionar` que compone `NegocioLayout` y `NegocioGestionarBase`. Las rutas de pestañas actuales apuntan a entradas en `negocio/views`.

**Superficie que exporta.** [`NegocioGestionar`](../../../apps/referidos-app/src/pages/negocio/NegocioGestionar.jsx#L4).

**Dependencias del archivo.** [`../../negocio/layout/NegocioLayout`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx), [`../../negocio/base/NegocioGestionarBase`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx).

#### [`NegocioGestionar`](../../../apps/referidos-app/src/pages/negocio/NegocioGestionar.jsx#L4) · componente React · exportación por defecto

Monta `NegocioLayout`, `NegocioGestionarBase`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `NegocioLayout`, `NegocioGestionarBase`.
- **Usa código de** [`NegocioLayout`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L325) (renderiza), [`NegocioGestionarBase`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L14) (renderiza).

### [`apps/referidos-app/src/pages/negocio/NegocioInicio.jsx`](../../../apps/referidos-app/src/pages/negocio/NegocioInicio.jsx#L1)

Wrapper de página para `NegocioInicio` que compone `NegocioLayout` y `NegocioInicioBase`. Las rutas de pestañas actuales apuntan a entradas en `negocio/views`.

**Superficie que exporta.** [`NegocioInicio`](../../../apps/referidos-app/src/pages/negocio/NegocioInicio.jsx#L5).

**Dependencias del archivo.** `react`, [`../../negocio/layout/NegocioLayout`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx), [`../../negocio/base/NegocioInicioBase`](../../../apps/referidos-app/src/negocio/base/NegocioInicioBase.jsx).

#### [`NegocioInicio`](../../../apps/referidos-app/src/pages/negocio/NegocioInicio.jsx#L5) · componente React · exportación por defecto

Monta `NegocioLayout`, `NegocioInicioBase`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `NegocioLayout`, `NegocioInicioBase`.
- **Usa código de** [`NegocioLayout`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L325) (renderiza), [`NegocioInicioBase`](../../../apps/referidos-app/src/negocio/base/NegocioInicioBase.jsx#L4) (renderiza).

### [`apps/referidos-app/src/pages/negocio/NegocioPerfil.jsx`](../../../apps/referidos-app/src/pages/negocio/NegocioPerfil.jsx#L1)

Wrapper de página para `NegocioPerfil` que compone `NegocioLayout` y `NegocioPerfilBase`. Las rutas de pestañas actuales apuntan a entradas en `negocio/views`.

**Superficie que exporta.** [`NegocioPerfil`](../../../apps/referidos-app/src/pages/negocio/NegocioPerfil.jsx#L5).

**Dependencias del archivo.** `react`, [`../../negocio/layout/NegocioLayout`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx), [`../../negocio/base/NegocioPerfilBase`](../../../apps/referidos-app/src/negocio/base/NegocioPerfilBase.jsx).

#### [`NegocioPerfil`](../../../apps/referidos-app/src/pages/negocio/NegocioPerfil.jsx#L5) · componente React · exportación por defecto

Monta `NegocioLayout`, `NegocioPerfilBase`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `NegocioLayout`, `NegocioPerfilBase`.
- **Usa código de** [`NegocioLayout`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L325) (renderiza), [`NegocioPerfilBase`](../../../apps/referidos-app/src/negocio/base/NegocioPerfilBase.jsx#L4) (renderiza).

### [`apps/referidos-app/src/pages/PromoDetalle.jsx`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L1)

Resuelve el id de ruta, carga la promo y su QR y actualiza vencimiento visible. Es el punto de entrada del flujo antes de pasar a historial.

**Superficie que exporta.** [`PromoDetalle`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L62).

**Módulos que lo cargan.** [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L58) (carga diferida).

**Dependencias del archivo.** `react`, `react-router-dom`, `react-qr-code`, [`../utils/sanitize`](../../../apps/referidos-app/src/utils/sanitize.js), [`../services/promoService`](../../../apps/referidos-app/src/services/promoService.js), [`../services/qrService`](../../../apps/referidos-app/src/services/qrService.js), [`../constants/branding`](../../../apps/referidos-app/src/constants/branding.js), [`../utils/dateUtils`](../../../apps/referidos-app/src/utils/dateUtils.js).

#### [`Badge`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L10) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{status}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Condiciones que evalúa** `ausencia de status`.
- **Usa código de** [`COLORS`](../../../apps/referidos-app/src/constants/branding.js#L1) (accede al módulo).

#### [`Timer`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L32) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{expiresAt}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Estado o valores vinculados** `[now, setNow] mediante useState`.
- **Hooks que llama** `useState`, `useEffect`.
- **Condiciones que evalúa** `ausencia de expiresAt`, `remaining`.
- **Llamadas directas en el cuerpo** [`padStart`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L51), [`toString`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L51).
- **Lo usa** [`PromoDetalle`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L310) (renderiza).

#### [`useEffect · callback`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L34) · callback de infraestructura · dentro de [`Timer`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L32)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `Timer`.

- **Actualizaciones de estado o acciones** `clearInterval`.
- **Efectos y APIs** `setInterval`, `clearInterval`.
- **Llamadas directas en el cuerpo** [`setInterval`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L35), [`clearInterval`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L36).

#### [`setInterval · callback`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L35) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L34)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setNow`.
- **Llamadas directas en el cuerpo** [`setNow`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L35).

#### [`remaining`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L39) · cálculo memorizado · dentro de [`Timer`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L32)

Función auxiliar de `Timer` para `remaining`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de expiresAt`.
- **Llamadas directas en el cuerpo** [`getTime`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L41).
- **Lo usa** [`Timer`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L46) (referencia).

#### [`PromoDetalle`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L62) · componente React · exportación por defecto

Monta `button`, `img`, `QRCode`, `Timer`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`, `null`.
- **Estado o valores vinculados** `[promo, setPromo] mediante useState`, `[loadingPromo, setLoadingPromo] mediante useState`, `[staticQr, setStaticQr] mediante useState`, `[validQr, setValidQr] mediante useState`, `[error, setError] mediante useState`, `[qrError, setQrError] mediante useState`, `[loadingQr, setLoadingQr] mediante useState`.
- **Interfaz que monta** `button`, `img`, `QRCode`, `Timer`.
- **Hooks que llama** `useParams`, `useNavigate`, `useEffect`, `useState`.
- **Condiciones que evalúa** `loadingPromo`, `error`, `ausencia de promo`, `finFmt`.
- **Usa código de** [`sanitizeText`](../../../apps/referidos-app/src/utils/sanitize.js#L2) (llama), [`formatDateIsoToDdMmYyyy`](../../../apps/referidos-app/src/utils/dateUtils.js#L2) (llama).
- **Llamadas directas en el cuerpo** [`sanitizeText`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L77), [`formatDateIsoToDdMmYyyy`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L190).
- **Lo usa** [`PromoDetalle`](../../../apps/referidos-app/src/routes.jsx#L58) (carga diferida).

#### [`useEffect · callback`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L65) · callback de infraestructura · dentro de [`PromoDetalle`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L62)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `PromoDetalle`.

- **Llamadas directas en el cuerpo** [`window.scrollTo`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L66).

#### [`status`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L79) · cálculo memorizado · dentro de [`PromoDetalle`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L62)

Función auxiliar de `PromoDetalle` para el valor de estado.

- **Retorno visible o tipo declarado** `null`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de validQr`, `validQr.status`, `remaining`.
- **Llamadas directas en el cuerpo** [`getTime`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L82).
- **Lo usa** [`PromoDetalle`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L310) (referencia).

#### [`loadPromo`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L87) · callback React · asíncrona · dentro de [`PromoDetalle`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L62)

Obtiene o resuelve el valor de promoción para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoadingPromo`, `setError`, `setPromo`.
- **Condiciones que evalúa** `ausencia de ok`.
- **Usa código de** [`getPromoById`](../../../apps/referidos-app/src/services/promoService.js#L46) (llama).
- **Llamadas directas en el cuerpo** [`setLoadingPromo`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L88), [`setError`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L89), [`getPromoById`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L90), [`setPromo`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L96).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L126) (llama), [`PromoDetalle`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L127) (referencia).

#### [`loadStaticQr`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L100) · callback React · asíncrona · dentro de [`PromoDetalle`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L62)

Obtiene o resuelve `Static Qr` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setQrError`, `setStaticQr`.
- **Condiciones que evalúa** `ausencia de ok`.
- **Usa código de** [`generatePromoQr`](../../../apps/referidos-app/src/services/qrService.js#L14) (llama).
- **Llamadas directas en el cuerpo** [`generatePromoQr`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L101), [`setQrError`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L103), [`setStaticQr`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L106).
- **Lo usa** [`loadQrs`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L121) (llama).

#### [`loadValidQr`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L109) · callback React · asíncrona · dentro de [`PromoDetalle`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L62)

Obtiene o resuelve `Valid Qr` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setQrError`, `setValidQr`.
- **Condiciones que evalúa** `ausencia de ok`.
- **Usa código de** [`getActiveValidQr`](../../../apps/referidos-app/src/services/qrService.js#L60) (llama).
- **Llamadas directas en el cuerpo** [`getActiveValidQr`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L110), [`setQrError`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L112), [`setValidQr`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L115).
- **Lo usa** [`loadQrs`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L121) (llama).

#### [`loadQrs`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L118) · callback React · asíncrona · dentro de [`PromoDetalle`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L62)

Obtiene o resuelve `Qrs` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoadingQr`, `setQrError`.
- **Llamadas directas en el cuerpo** [`setLoadingQr`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L119), [`setQrError`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L120), [`loadStaticQr`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L121), [`loadValidQr`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L121).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L131) (llama), [`PromoDetalle`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L132) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L125) · callback de infraestructura · dentro de [`PromoDetalle`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L62)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `PromoDetalle`.

- **Llamadas directas en el cuerpo** [`loadPromo`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L126).

#### [`useEffect · callback`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L129) · callback de infraestructura · dentro de [`PromoDetalle`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L62)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `PromoDetalle`.

- **Condiciones que evalúa** `ausencia de safeId`.
- **Llamadas directas en el cuerpo** [`loadQrs`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L131).

#### [`button.onClick`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L140) · callback JSX · dentro de [`PromoDetalle`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L62)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigate`.
- **Llamadas directas en el cuerpo** [`navigate`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L140).

#### [`button.onClick`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L162) · callback JSX · dentro de [`PromoDetalle`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L62)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigate`.
- **Llamadas directas en el cuerpo** [`navigate`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L162).

#### [`button.onClick`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L247) · callback JSX · dentro de [`PromoDetalle`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L62)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigate`.
- **Llamadas directas en el cuerpo** [`navigate`](../../../apps/referidos-app/src/pages/PromoDetalle.jsx#L247).

### [`apps/referidos-app/src/pages/Promos.jsx`](../../../apps/referidos-app/src/pages/Promos.jsx#L1)

Página standalone con listado de promociones. Comprueba las importaciones porque las rutas principales usan las vistas de rol.

**Superficie que exporta.** [`Promos`](../../../apps/referidos-app/src/pages/Promos.jsx#L15).

**Dependencias del archivo.** `react`, `../context/AppContext`, `react-router-dom`.

#### [`Promos`](../../../apps/referidos-app/src/pages/Promos.jsx#L15) · componente React · exportación por defecto

Monta `button`, `Link`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `{data, usuario} mediante useContext`.
- **Interfaz que monta** `button`, `Link`.
- **Hooks que llama** `useContext`.
- **Llamadas directas en el cuerpo** [`data.promociones.map`](../../../apps/referidos-app/src/pages/Promos.jsx#L27).

### [`apps/referidos-app/src/pages/RecuperarPassword.jsx`](../../../apps/referidos-app/src/pages/RecuperarPassword.jsx#L1)

Pantalla separada para recuperar credenciales. Su existencia no implica que tenga ruta activa en routes.jsx.

El archivo participa como entrada, adaptador de imports o reexportación.
