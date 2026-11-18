# PWA principal · Componentes compartidos, layouts y modales

[Volver a la guía de la PWA](../02-pwa-principal.md) · [Índice general](../README.md)

El registro de modales y la cabecera se usan desde varias rutas. Algunas familias tienen variantes con el mismo nombre. Usa las importaciones al pie de cada ficha para encontrar la que se renderiza desde tu pantalla.

102 archivos de `apps/referidos-app`. Las rutas de esta referencia se leen desde ese workspace. Los enlaces de importación y exportación se extraen del código actual y muestran las conexiones más cercanas a cada pieza.

## `src/components/cards`

### [`HistorialItemCard.jsx`](../../apps/referidos-app/src/components/cards/HistorialItemCard.jsx)

Reutiliza la presentación visual de actividad y de estado entre listados de historial.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`PromoCardCercanas.jsx`](../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx)

Dibuja una promo pensada para la sección de cercanía y muestra sus datos destacados.

**Exporta** `default PromoCardCercanas`.

**Se apoya en** [`../../utils/dateUtils`](../../apps/referidos-app/src/utils/dateUtils.js), [`../../utils/sanitize`](../../apps/referidos-app/src/utils/sanitize.js).

**Lo importa** [`cliente/inicio/ClienteInicio.jsx`](../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx), [`cliente/inicio/InicioPromosPreview.jsx`](../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx), [`components/sections/PromoSection.jsx`](../../apps/referidos-app/src/components/sections/PromoSection.jsx).

### [`PromoCardHot.jsx`](../../apps/referidos-app/src/components/cards/PromoCardHot.jsx)

Dibuja una promo destacada con recursos y encabezado visual de la variante Hot.

**Exporta** `default PromoCardHot`.

**Estado en el módulo** `isMarquee`, `marqueeDistance`, `marqueeDuration`, `isCardVisible`, `isNameVisible`, `isAnimating`.

**Se apoya en** [`../../utils/sanitize`](../../apps/referidos-app/src/utils/sanitize.js), [`../../assets/badges/badge-promo-hot.png`](../../apps/referidos-app/src/assets/badges/badge-promo-hot.png), [`../../assets/images/embers-bg.png`](../../apps/referidos-app/src/assets/images/embers-bg.png), [`../../assets/overlays/hot-sparkles-overlay.png`](../../apps/referidos-app/src/assets/overlays/hot-sparkles-overlay.png).

**Lo importa** [`cliente/inicio/InicioPromosPreview.jsx`](../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx), [`components/search/SearchIdle.jsx`](../../apps/referidos-app/src/components/search/SearchIdle.jsx), [`search/SearchIdle.jsx`](../../apps/referidos-app/src/search/SearchIdle.jsx).

### [`PromoCardNuevas.jsx`](../../apps/referidos-app/src/components/cards/PromoCardNuevas.jsx)

Dibuja una promo pensada para el listado de novedades.

**Exporta** `default PromoCardNuevas`.

**Se apoya en** [`../../utils/sanitize`](../../apps/referidos-app/src/utils/sanitize.js).

**Lo importa** [`cliente/inicio/InicioPromosPreview.jsx`](../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx).

### [`PromoCardVariant.jsx`](../../apps/referidos-app/src/components/cards/PromoCardVariant.jsx)

Selecciona o adapta una variante de tarjeta desde las props comunes de una promoción.

**Exporta** `default PromoCardHot`.

**Se apoya en** [`../../utils/sanitize`](../../apps/referidos-app/src/utils/sanitize.js).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

## `src/components/desktop`

### [`Footer.jsx`](../../apps/referidos-app/src/components/desktop/Footer.jsx)

Compone uno de los pies de página de la experiencia web de escritorio. Sigue su consumidor para identificar la variante.

**Exporta** `default FooterAlt`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`FooterAlt.jsx`](../../apps/referidos-app/src/components/desktop/FooterAlt.jsx)

Alternativa visual de pie de escritorio que conserva una composición independiente.

**Exporta** `default Footer`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`FooterWEB.jsx`](../../apps/referidos-app/src/components/desktop/FooterWEB.jsx)

Pie usado por una variante de la página web con navegación y enlaces propios.

**Exporta** `default Footer`.

**Estado en el módulo** `usuario`, `onboarding`, `bootstrap`.

**Se apoya en** [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`FooterWEBup.jsx`](../../apps/referidos-app/src/components/desktop/FooterWEBup.jsx)

Compone la franja superior de la variante de pie WEB.

**Exporta** `default Header`.

**Estado en el módulo** `usuario`, `bootstrap`, `onboarding`.

**Se apoya en** [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`HeaderWEB.jsx`](../../apps/referidos-app/src/components/desktop/HeaderWEB.jsx)

Monta navegación del encabezado para la composición de sitio de escritorio.

**Exporta** `default HeaderAlt`.

**Estado en el módulo** `usuario`, `onboarding`, `bootstrap`.

**Se apoya en** [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

## `src/components/footer`

### [`Footer.jsx`](../../apps/referidos-app/src/components/footer/Footer.jsx)

Compone el pie compartido en la variante de shell que lo importe.

**Exporta** `default Footer`.

**Estado en el módulo** `usuario`, `onboarding`, `bootstrap`.

**Se apoya en** [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../../cliente/layout/ClienteFooter`](../../apps/referidos-app/src/cliente/layout/ClienteFooter.jsx).

**Lo importa** [`layouts/MainLayout.jsx`](../../apps/referidos-app/src/layouts/MainLayout.jsx).

## `src/components/gestionar`

### [`GestionarPanel.jsx`](../../apps/referidos-app/src/components/gestionar/GestionarPanel.jsx)

Selecciona la sección del panel de gestión según la pestaña activa.

**Exporta** `default GestionarPanel`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`GestionarTabs.jsx`](../../apps/referidos-app/src/components/gestionar/GestionarTabs.jsx)

Declara etiquetas y navegación entre las secciones de gestión.

**Exporta** `default GestionarTabs`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

## `src/components/gestionar/sections`

### [`Dispositivos.jsx`](../../apps/referidos-app/src/components/gestionar/sections/Dispositivos.jsx)

Compone la presentación de dispositivos para la sección Gestionar; las sesiones reales del perfil usan sessionDevicesService.

**Exporta** `default Dispositivos`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`Grupos.jsx`](../../apps/referidos-app/src/components/gestionar/sections/Grupos.jsx)

Presenta tarjetas de segmentos con datos de ejemplo. La estructura visual sirve para ubicar el futuro flujo de administración de segmentos.

**Exporta** `default Grupos`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`Metricas.jsx`](../../apps/referidos-app/src/components/gestionar/sections/Metricas.jsx)

Agrupa tarjetas y representaciones del área de métricas de gestión.

**Exporta** `default Metricas`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`Seguridad.jsx`](../../apps/referidos-app/src/components/gestionar/sections/Seguridad.jsx)

Presenta controles o estado del área de seguridad dentro de Gestionar, separado de la autorización del servidor.

**Exporta** `default Seguridad`.

**Estado en el módulo** `settings`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

## `src/components/header-elements`

### [`HeaderActions.jsx`](../../apps/referidos-app/src/components/header-elements/HeaderActions.jsx)

Agrupa los botones disponibles en la cabecera y emite sus acciones al contenedor.

**Exporta** `default HeaderActions`.

**Lo importa** [`components/header-elements/index.js`](../../apps/referidos-app/src/components/header-elements/index.js).

### [`index.js`](../../apps/referidos-app/src/components/header-elements/index.js)

Punto de importación público de `header-elements`. Reexporta sus piezas para que un consumidor pueda importar desde la carpeta.

**Exporta** `UserIdentity`, `HeaderActions`, `TabTitle`.

**Se apoya en** [`./UserIdentity`](../../apps/referidos-app/src/components/header-elements/UserIdentity.jsx), [`./HeaderActions`](../../apps/referidos-app/src/components/header-elements/HeaderActions.jsx), [`./TabTitle`](../../apps/referidos-app/src/components/header-elements/TabTitle.jsx).

**Lo importa** [`cliente/layout/ClienteHeader.jsx`](../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx).

### [`TabTitle.jsx`](../../apps/referidos-app/src/components/header-elements/TabTitle.jsx)

Muestra el título de la pestaña o sección que el contexto de rol seleccionó.

**Exporta** `default TabTitle`.

**Lo importa** [`components/header-elements/index.js`](../../apps/referidos-app/src/components/header-elements/index.js).

### [`UserIdentity.jsx`](../../apps/referidos-app/src/components/header-elements/UserIdentity.jsx)

Dibuja nombre, imagen y otros elementos de identidad en cabecera.

**Exporta** `default UserIdentity`.

**Lo importa** [`components/header-elements/index.js`](../../apps/referidos-app/src/components/header-elements/index.js).

## `src/components/header-panels`

### [`HeaderPanelContainer.jsx`](../../apps/referidos-app/src/components/header-panels/HeaderPanelContainer.jsx)

Proporciona la estructura visual para que los paneles se monten con dimensiones y separación consistentes.

**Exporta** `default HeaderPanelContainer`.

**Lo importa** [`components/header-panels/index.js`](../../apps/referidos-app/src/components/header-panels/index.js).

### [`index.js`](../../apps/referidos-app/src/components/header-panels/index.js)

Punto de importación público de `header-panels`. Reexporta sus piezas para que un consumidor pueda importar desde la carpeta.

**Exporta** `HeaderPanelContainer`, `LocationPanel`, `NotificationsPanel`, `QueuePanel`, `SearchbarPanel`.

**Se apoya en** [`./HeaderPanelContainer`](../../apps/referidos-app/src/components/header-panels/HeaderPanelContainer.jsx), [`./LocationPanel`](../../apps/referidos-app/src/components/header-panels/LocationPanel.jsx), [`./NotificationsPanel`](../../apps/referidos-app/src/components/header-panels/NotificationsPanel.jsx), [`./QueuePanel`](../../apps/referidos-app/src/components/header-panels/QueuePanel.jsx), [`./SearchbarPanel`](../../apps/referidos-app/src/components/header-panels/SearchbarPanel.jsx).

**Lo importa** [`cliente/inicio/ClienteInicio.jsx`](../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx), [`cliente/layout/ClienteHeader.jsx`](../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx), [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx).

### [`LocationPanel.jsx`](../../apps/referidos-app/src/components/header-panels/LocationPanel.jsx)

Expone opciones de ubicación dentro de la cabecera y pasa las callbacks al panel activo.

**Exporta** `default LocationPanel`.

**Se apoya en** [`../ui/Badge`](../../apps/referidos-app/src/components/ui/Badge.jsx).

**Lo importa** [`components/header-panels/index.js`](../../apps/referidos-app/src/components/header-panels/index.js).

### [`NotificationsPanel.jsx`](../../apps/referidos-app/src/components/header-panels/NotificationsPanel.jsx)

Muestra la superficie de notificaciones como panel de cabecera.

**Exporta** `default NotificationsPanel`.

**Lo importa** [`components/header-panels/index.js`](../../apps/referidos-app/src/components/header-panels/index.js).

### [`QueuePanel.jsx`](../../apps/referidos-app/src/components/header-panels/QueuePanel.jsx)

Presenta el estado de cola de soporte en la cabecera y sus acciones.

**Exporta** `default QueuePanel`.

**Lo importa** [`components/header-panels/index.js`](../../apps/referidos-app/src/components/header-panels/index.js).

### [`SearchbarPanel.jsx`](../../apps/referidos-app/src/components/header-panels/SearchbarPanel.jsx)

Coloca la barra o controles de búsqueda dentro de la superficie de cabecera.

**Exporta** `default SearchbarPanel`.

**Se apoya en** [`../../search/SearchBar`](../../apps/referidos-app/src/search/SearchBar.jsx).

**Lo importa** [`components/header-panels/index.js`](../../apps/referidos-app/src/components/header-panels/index.js).

## `src/components/header/cliente`

### [`HeaderCliente.jsx`](../../apps/referidos-app/src/components/header/cliente/HeaderCliente.jsx)

Compone la variante de cabecera cliente en el árbol components/header, diferente de cliente/layout.

**Exporta** `default HeaderCliente`.

**Se apoya en** [`../../../cliente/layout/ClienteHeader`](../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx).

**Lo importa** [`components/header/Header.jsx`](../../apps/referidos-app/src/components/header/Header.jsx).

## `src/components/header`

### [`Header.jsx`](../../apps/referidos-app/src/components/header/Header.jsx)

Arma una cabecera compartida y conecta las variantes o controles ligados a su consumidor.

**Exporta** `default Header`.

**Estado en el módulo** `expanded`, `locationBarHeight`, `overlayTop`, `usuario`, `bootstrap`, `onboarding`.

**Se apoya en** [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`./cliente/HeaderCliente`](../../apps/referidos-app/src/components/header/cliente/HeaderCliente.jsx), [`./negocio/HeaderNegocio`](../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx).

**Lo importa** [`layouts/MainLayout.jsx`](../../apps/referidos-app/src/layouts/MainLayout.jsx).

## `src/components/header/negocio`

### [`HeaderNegocio.jsx`](../../apps/referidos-app/src/components/header/negocio/HeaderNegocio.jsx)

Compone la variante de cabecera negocio en el árbol components/header, diferente de negocio/layout.

**Exporta** `default HeaderNegocio`.

**Estado en el módulo** `splitIndex`, `isCollapsing`, `revealActive`.

**Lo importa** [`components/header/Header.jsx`](../../apps/referidos-app/src/components/header/Header.jsx).

## `src/components/maps`

### [`LeafletMapPicker.jsx`](../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx)

Integra Leaflet para que la selección y movimiento del mapa se conviertan en coordenadas de formulario.

**Exporta** `default LeafletMapPicker`.

**Se apoya en** `leaflet`, [`../../config/runtimeConfig`](../../apps/referidos-app/src/config/runtimeConfig.js).

**Lo importa** [`auth/steps/UserAddressStep.jsx`](../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx).

## `src/components/menus`

### [`MenuFilters.jsx`](../../apps/referidos-app/src/components/menus/MenuFilters.jsx)

Muestra opciones de filtrado y comunica selección sin poseer el listado principal.

**Exporta** `default MenuFilters`.

**Estado en el módulo** `categoria`, `sector`, `descuento`, `orden`.

**Lo importa** [`cliente/inicio/ClienteInicio.jsx`](../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx).

### [`MenuLateral.jsx`](../../apps/referidos-app/src/components/menus/MenuLateral.jsx)

Compone el menú lateral de navegación y sus acciones de sesión, usado desde layouts de rol.

**Exporta** `default MenuLateral`.

**Estado en el módulo** `usuario`, `bootstrap`, `onboarding`, `logout`.

**Se apoya en** [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../../cliente/services/clienteUI`](../../apps/referidos-app/src/cliente/services/clienteUI.js).

**Lo importa** [`cliente/layout/ClienteLayout.jsx`](../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx), [`layouts/MainLayout.jsx`](../../apps/referidos-app/src/layouts/MainLayout.jsx), [`negocio/layout/NegocioLayout.jsx`](../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx).

## `src/components/modals`

### [`ModalAbandonarRegistro.jsx`](../../apps/referidos-app/src/components/modals/ModalAbandonarRegistro.jsx)

Pide confirmar salida del alta para evitar descartar pasos por accidente.

**Exporta** `default ModalAbandonarRegistro`.

**Se apoya en** [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalAccessMethods.jsx`](../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx)

Expone acciones para activar o revisar métodos de desbloqueo local.

**Exporta** `default ModalAccessMethods`.

**Acceso directo** `supabase.auth.getSession`, tabla o vista `usuarios`, `supabase.auth.getUser`.

**Estado en el módulo** `view`, `fingerprintEnabled`, `pinEnabled`, `error`, `skipPrompt`, `webauthnAvailable`, `usuario`, `setAccessMethods`, `setUser`.

**Se apoya en** [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../../hooks/usePinSetup`](../../apps/referidos-app/src/hooks/usePinSetup.js), [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js), [`../../services/secureStorageService`](../../apps/referidos-app/src/services/secureStorageService.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalAccountVerifySkip.jsx`](../../apps/referidos-app/src/components/modals/ModalAccountVerifySkip.jsx)

Pide confirmación antes de omitir la verificación si el flujo habilita esa opción.

**Exporta** `default ModalAccountVerifySkip`.

**Se apoya en** [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalBase.jsx`](../../apps/referidos-app/src/components/modals/ModalBase.jsx)

Implementa el contenedor común de diálogo, overlay y cierre para piezas de modal.

**Exporta** `default ModalBase`.

**Se apoya en** [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js).

**Lo importa** [`components/modals/ModalBeneficios.jsx`](../../apps/referidos-app/src/components/modals/ModalBeneficios.jsx), [`components/modals/ModalCodigoNegocio.jsx`](../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx), [`components/modals/ModalTier.jsx`](../../apps/referidos-app/src/components/modals/ModalTier.jsx).

### [`ModalBeneficios.jsx`](../../apps/referidos-app/src/components/modals/ModalBeneficios.jsx)

Muestra información ampliada de beneficios desde una pantalla de producto.

**Exporta** `default ModalBeneficios`.

**Se apoya en** [`./ModalBase`](../../apps/referidos-app/src/components/modals/ModalBase.jsx), [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalCliente.jsx`](../../apps/referidos-app/src/components/modals/ModalCliente.jsx)

Encapsula una composición de diálogo para la experiencia de cliente.

**Exporta** `default ModalCliente`.

**Estado en el módulo** `email`, `password`, `error`.

**Se apoya en** `../context/AppContext`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`ModalCodigoNegocio.jsx`](../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx)

Solicita el código de registro de un negocio y entrega el valor al flujo que lo valida.

**Exporta** `default ModalCodigoNegocio`.

**Estado en el módulo** `codigo`, `valid`, `formatOk`.

**Se apoya en** [`./ModalBase`](../../apps/referidos-app/src/components/modals/ModalBase.jsx), [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js), [`../../utils/validators`](../../apps/referidos-app/src/utils/validators.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalConfirmAction.jsx`](../../apps/referidos-app/src/components/modals/ModalConfirmAction.jsx)

Modal de confirmación reutilizable para acciones definidas por el caller.

**Exporta** `default ModalConfirmAction`.

**Se apoya en** [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalConfirmarCambios.jsx`](../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx)

Advierte sobre cambios pendientes y conecta confirmación o cancelación a su flujo.

**Exporta** `default ModalConfirmarCambios`.

**Estado en el módulo** `status`, `message`, `pinValue`, `passwordValue`.

**Se apoya en** [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalCuentaExistente.jsx`](../../apps/referidos-app/src/components/modals/ModalCuentaExistente.jsx)

Orienta al usuario cuando sus datos o credenciales corresponden a una cuenta existente.

**Exporta** `default ModalCuentaExistente`.

**Se apoya en** [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalEliminarCuenta.jsx`](../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx)

Presenta el consentimiento para eliminación y conecta el flujo seguro del perfil.

**Exporta** `default ModalEliminarCuenta`.

**Estado en el módulo** `countdown`, `submitting`.

**Se apoya en** [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalEmailReauth.jsx`](../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx)

Coordina la UI de reautenticación por correo y las acciones del cliente Auth.

**Exporta** `default ModalEmailReauth`.

**Acceso directo** `supabase.auth.reauthenticate`, `supabase.auth.signInWithOtp`.

**Estado en el módulo** `sending`, `emailSent`, `message`, `error`.

**Se apoya en** [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalEmailVerification.jsx`](../../apps/referidos-app/src/components/modals/ModalEmailVerification.jsx)

Presenta etapas y acciones de verificación de correo para cuenta.

**Exporta** `default ModalEmailVerification`.

**Acceso directo** `supabase.auth.getUser`.

**Estado en el módulo** `emailConfirmed`.

**Se apoya en** [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js), [`../../auth/blocks/EmailVerificationBlock`](../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalFingerprintPrompt.jsx`](../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx)

Solicita la comprobación o alta de una credencial biométrica local.

**Exporta** `default ModalFingerprintPrompt`.

**Estado en el módulo** `status`, `message`.

**Se apoya en** [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalForcePasswordChange.jsx`](../../apps/referidos-app/src/components/modals/ModalForcePasswordChange.jsx)

Impone el recorrido de cambio de contraseña al entrar con un perfil obligado a hacerlo.

**Exporta** `default ModalForcePasswordChange`.

**Estado en el módulo** `usuario`, `setUser`.

**Se apoya en** [`../../profile/shared/blocks/PasswordAccessCard`](../../apps/referidos-app/src/profile/shared/blocks/PasswordAccessCard.jsx), [`../../auth/hooks/usePasswordAccess`](../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js), [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalGrupo.jsx`](../../apps/referidos-app/src/components/modals/ModalGrupo.jsx)

Muestra un diálogo para datos o detalles de grupos en sus consumidores.

**Exporta** `default ModalGrupo`.

**Se apoya en** [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`ModalLocationDenied.jsx`](../../apps/referidos-app/src/components/modals/ModalLocationDenied.jsx)

Explica cómo continuar cuando el navegador deniega acceso a ubicación.

**Exporta** `default ModalLocationDenied`.

**Se apoya en** [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalLocationPermission.jsx`](../../apps/referidos-app/src/components/modals/ModalLocationPermission.jsx)

Explica el uso de ubicación antes de activar la solicitud de permiso.

**Exporta** `default ModalLocationPermission`.

**Se apoya en** [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalLocationUnavailable.jsx`](../../apps/referidos-app/src/components/modals/ModalLocationUnavailable.jsx)

Informa que no se obtuvo ubicación y presenta acciones de recuperación.

**Exporta** `default ModalLocationUnavailable`.

**Se apoya en** [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalNotifications.jsx`](../../apps/referidos-app/src/components/modals/ModalNotifications.jsx)

Muestra la bandeja de notificaciones en un diálogo global.

**Exporta** `default ModalNotifications`.

**Se apoya en** [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalPasswordReauth.jsx`](../../apps/referidos-app/src/components/modals/ModalPasswordReauth.jsx)

Pide contraseña para el flujo de reautenticación antes de continuar una acción.

**Exporta** `default ModalPasswordReauth`.

**Acceso directo** `supabase.auth.signInWithPassword`.

**Estado en el módulo** `password`, `sending`, `error`.

**Se apoya en** [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalPinVerify.jsx`](../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx)

Recoge y verifica el PIN local y devuelve resultado al flujo que solicitó desbloqueo.

**Exporta** `default ModalPinVerify`.

**Estado en el módulo** `pinValue`, `error`, `lockedUntil`.

**Se apoya en** [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js), [`../../services/secureStorageService`](../../apps/referidos-app/src/services/secureStorageService.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalSplashChoiceOverlay.jsx`](../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx)

Muestra una elección dentro de la transición visual de auth.

**Exporta** `default ModalSplashChoiceOverlay`.

**Estado en el módulo** `selected`, `mounted`, `error`, `showCodeModal`, `code`, `codeFormatOk`.

**Se apoya en** [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js), [`../../utils/validators`](../../apps/referidos-app/src/utils/validators.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalSplashEmailConfirmation.jsx`](../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx)

Presenta confirmación de correo con la composición splash del flujo de auth.

**Exporta** `default ModalSplashEmailConfirmation`.

**Acceso directo** `supabase.auth.resend`.

**Estado en el módulo** `email`, `loading`, `message`, `error`, `signedUp`.

**Se apoya en** [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalSupportQueue.jsx`](../../apps/referidos-app/src/components/modals/ModalSupportQueue.jsx)

Presenta el seguimiento de cola de un ticket abierta desde la app.

**Exporta** `default ModalSupportQueue`.

**Se apoya en** [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalSupportQueueCancel.jsx`](../../apps/referidos-app/src/components/modals/ModalSupportQueueCancel.jsx)

Pide consentimiento antes de cancelar una solicitud en espera.

**Exporta** `default ModalSupportQueueCancel`.

**Se apoya en** [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalTier.jsx`](../../apps/referidos-app/src/components/modals/ModalTier.jsx)

Amplía información de nivel que se abre desde el perfil o beneficios.

**Exporta** `default ModalTier`.

**Se apoya en** [`./ModalBase`](../../apps/referidos-app/src/components/modals/ModalBase.jsx), [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalTimePicker.jsx`](../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx)

Selecciona una hora para el formulario que lo invoca sin duplicar controles.

**Exporta** `default ModalTimePicker`.

**Estado en el módulo** `hour`, `minute`.

**Se apoya en** [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalTwoFADisable.jsx`](../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx)

Coordina confirmación y desactivación de un factor desde la interfaz.

**Exporta** `default ModalTwoFADisable`.

**Acceso directo** `supabase.auth.getSession`, `supabase.auth.signInWithPassword`.

**Estado en el módulo** `email`, `password`, `sending`, `error`.

**Se apoya en** [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js), [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`../../services/mfaService`](../../apps/referidos-app/src/services/mfaService.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalTwoFAEnroll.jsx`](../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx)

Presenta alta TOTP, QR o secreto de enrolamiento y confirmación de código.

**Exporta** `default ModalTwoFAEnroll`.

**Estado en el módulo** `loading`, `enrollError`, `mode`, `factorId`, `qrCode`, `qrUri`.

**Se apoya en** `react-qr-code`, [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js), [`../../services/mfaService`](../../apps/referidos-app/src/services/mfaService.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

### [`ModalTwoFAVerify.jsx`](../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx)

Presenta el desafío de segundo factor y recibe el código que debe verificarse.

**Exporta** `default ModalTwoFAVerify`.

**Estado en el módulo** `loading`, `factorId`, `error`, `code`, `submitting`.

**Se apoya en** [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js), [`../../services/mfaService`](../../apps/referidos-app/src/services/mfaService.js).

**Lo importa** [`modals/modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js).

## `src/components/search`

### [`SearchBar.jsx`](../../apps/referidos-app/src/components/search/SearchBar.jsx)

Implementa el campo de búsqueda y propaga texto o teclado a su contenedor. Hay variantes para distintos shells.

**Exporta** `default SearchBar`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`SearchContainer.jsx`](../../apps/referidos-app/src/components/search/SearchContainer.jsx)

Une el campo de búsqueda y sus estados visuales para un consumidor de components/search.

**Exporta** `default SearchContainer`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`SearchEmpty.jsx`](../../apps/referidos-app/src/components/search/SearchEmpty.jsx)

Representa que una consulta no devolvió resultados.

**Exporta** `default SearchEmpty`.

**Lo importa** [`components/search/SearchResults.jsx`](../../apps/referidos-app/src/components/search/SearchResults.jsx).

### [`SearchHeader.jsx`](../../apps/referidos-app/src/components/search/SearchHeader.jsx)

Compone la barra de cabecera del modo de búsqueda y su retorno.

**Exporta** `default SearchHeader`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`SearchIdle.jsx`](../../apps/referidos-app/src/components/search/SearchIdle.jsx)

Presenta el estado de búsqueda antes de ingresar un criterio.

**Exporta** `default SearchIdle`.

**Se apoya en** [`../cards/PromoCardHot`](../../apps/referidos-app/src/components/cards/PromoCardHot.jsx), [`../sections/PromoSection`](../../apps/referidos-app/src/components/sections/PromoSection.jsx), [`../sections/SectionTitle`](../../apps/referidos-app/src/components/sections/SectionTitle.jsx), [`../../cliente/inicio/InicioPromosPreview`](../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`SearchResults.jsx`](../../apps/referidos-app/src/components/search/SearchResults.jsx)

Dibuja el conjunto de resultados que prepara el contexto que activó la búsqueda.

**Exporta** `default SearchResults`.

**Se apoya en** [`./SearchEmpty`](../../apps/referidos-app/src/components/search/SearchEmpty.jsx).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`useSearchMode.js`](../../apps/referidos-app/src/components/search/useSearchMode.js)

Coordina apertura, cierre y estado contextual del modo de búsqueda.

**Exporta** `useSearchMode`.

**Estado en el módulo** `query`, `active`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

## `src/components/sections`

### [`PromoSection.jsx`](../../apps/referidos-app/src/components/sections/PromoSection.jsx)

Compone encabezado y contenido de una sección de promociones a partir de props.

**Exporta** `default PromoSection`.

**Estado en el módulo** `autoActive`.

**Se apoya en** [`../cards/PromoCardCercanas`](../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx), [`./SectionTitle`](../../apps/referidos-app/src/components/sections/SectionTitle.jsx), [`../../hooks/useCarousel`](../../apps/referidos-app/src/hooks/useCarousel.js), [`../../hooks/useAutoCarousel`](../../apps/referidos-app/src/hooks/useAutoCarousel.js).

**Lo importa** [`cliente/inicio/InicioPromos.jsx`](../../apps/referidos-app/src/cliente/inicio/InicioPromos.jsx), [`components/search/SearchIdle.jsx`](../../apps/referidos-app/src/components/search/SearchIdle.jsx), [`search/SearchIdle.jsx`](../../apps/referidos-app/src/search/SearchIdle.jsx).

### [`SectionTitle.jsx`](../../apps/referidos-app/src/components/sections/SectionTitle.jsx)

Presenta títulos reutilizables de secciones de promociones.

**Exporta** `default SectionTitle`.

**Lo importa** [`components/search/SearchIdle.jsx`](../../apps/referidos-app/src/components/search/SearchIdle.jsx), [`components/sections/PromoSection.jsx`](../../apps/referidos-app/src/components/sections/PromoSection.jsx), [`negocio/inicio/InicioPromos.jsx`](../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx), [`search/SearchIdle.jsx`](../../apps/referidos-app/src/search/SearchIdle.jsx).

## `src/components/ui`

### [`Badge.jsx`](../../apps/referidos-app/src/components/ui/Badge.jsx)

Etiqueta visual reutilizable para estados o categorías.

**Exporta** `default Badge`.

**Lo importa** [`admin/layout/AdminSidebar.jsx`](../../apps/referidos-app/src/admin/layout/AdminSidebar.jsx), [`admin/logs/LogsTable.jsx`](../../apps/referidos-app/src/admin/logs/LogsTable.jsx), [`admin/negocios/NegocioDetalle.jsx`](../../apps/referidos-app/src/admin/negocios/NegocioDetalle.jsx), [`admin/negocios/NegociosTable.jsx`](../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx), [`admin/observability/ErrorCatalogTable.jsx`](../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx), [`admin/observability/IssuesTable.jsx`](../../apps/referidos-app/src/admin/observability/IssuesTable.jsx), [`admin/promos/PromosTable.jsx`](../../apps/referidos-app/src/admin/promos/PromosTable.jsx) y 8 módulos más.

### [`ConfirmDialog.jsx`](../../apps/referidos-app/src/components/ui/ConfirmDialog.jsx)

Presenta decisiones de confirmación con una composición compartida.

**Exporta** `default ConfirmDialog`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`LoaderOverlay.jsx`](../../apps/referidos-app/src/components/ui/LoaderOverlay.jsx)

Cubre una pantalla mientras hay carga y permite diferenciar interacción bloqueada.

**Exporta** `default LoaderOverlay`.

**Lo importa** [`cliente/inicio/ClienteInicio.jsx`](../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx), [`negocio/inicio/NegocioInicio.jsx`](../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx).

### [`SearchBar.jsx`](../../apps/referidos-app/src/components/ui/SearchBar.jsx)

Implementa el campo de búsqueda y propaga texto o teclado a su contenedor. Hay variantes para distintos shells.

**Exporta** `default SearchBar`.

**Se apoya en** [`../../search/SearchBar`](../../apps/referidos-app/src/search/SearchBar.jsx).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`Spinner.jsx`](../../apps/referidos-app/src/components/ui/Spinner.jsx)

Renderiza el indicador de progreso genérico que consumen paneles y botones.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`Table.jsx`](../../apps/referidos-app/src/components/ui/Table.jsx)

Compone estructura de tabla reusable para listados que le entregan filas o columnas.

**Exporta** `default Table`.

**Lo importa** [`admin/logs/LogsTable.jsx`](../../apps/referidos-app/src/admin/logs/LogsTable.jsx), [`admin/negocios/NegociosTable.jsx`](../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx), [`admin/observability/ErrorCatalogTable.jsx`](../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx), [`admin/observability/IssuesTable.jsx`](../../apps/referidos-app/src/admin/observability/IssuesTable.jsx), [`admin/prelaunch/PrelaunchAnalyticsPanel.jsx`](../../apps/referidos-app/src/admin/prelaunch/PrelaunchAnalyticsPanel.jsx), [`admin/promos/PromosTable.jsx`](../../apps/referidos-app/src/admin/promos/PromosTable.jsx), [`admin/qrs/QRsTable.jsx`](../../apps/referidos-app/src/admin/qrs/QRsTable.jsx) y 6 módulos más.

## `src/components/ui/skeleton`

### [`skeleton.css`](../../apps/referidos-app/src/components/ui/skeleton/skeleton.css)

Almacena reglas de forma o animación compartidas por los skeletons.

**Lo importa** [`components/ui/skeleton/SkeletonBase.jsx`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonBase.jsx).

**Reglas para ubicar cambios** `.skeleton-base`, `@keyframes skeleton-shimmer`.

### [`SkeletonAvatar.jsx`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonAvatar.jsx)

Dibuja un placeholder con forma de avatar al cargar.

**Exporta** `default SkeletonAvatar`.

**Se apoya en** [`./SkeletonBase`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonBase.jsx).

**Lo importa** [`components/ui/skeleton/SkeletonCard.jsx`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonCard.jsx).

### [`SkeletonBase.jsx`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonBase.jsx)

Define el elemento básico utilizado por los skeletons de distintas piezas.

**Exporta** `default SkeletonBase`.

**Se apoya en** [`./skeleton.css`](../../apps/referidos-app/src/components/ui/skeleton/skeleton.css).

**Lo importa** [`components/ui/skeleton/SkeletonAvatar.jsx`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonAvatar.jsx), [`components/ui/skeleton/SkeletonBlock.jsx`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx).

### [`SkeletonBlock.jsx`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx)

Dibuja un bloque de contenido en espera.

**Exporta** `default SkeletonBlock`.

**Se apoya en** [`./SkeletonBase`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonBase.jsx).

**Lo importa** [`cliente/historial/HistorialSkeleton.jsx`](../../apps/referidos-app/src/cliente/historial/HistorialSkeleton.jsx), [`cliente/inicio/ClienteInicioSkeleton.jsx`](../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx), [`components/ui/skeleton/SkeletonCard.jsx`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonCard.jsx), [`components/ui/skeleton/SkeletonText.jsx`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx), [`negocio/inicio/InicioSkeleton.jsx`](../../apps/referidos-app/src/negocio/inicio/InicioSkeleton.jsx).

### [`SkeletonCard.jsx`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonCard.jsx)

Dibuja la forma esperada de una tarjeta antes de recibir datos.

**Exporta** `default SkeletonCard`.

**Se apoya en** [`./SkeletonBlock`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx), [`./SkeletonText`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx), [`./SkeletonAvatar`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonAvatar.jsx).

**Lo importa** [`cliente/inicio/ClienteInicioSkeleton.jsx`](../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx).

### [`SkeletonList.jsx`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonList.jsx)

Repite partes de skeleton para anticipar una lista durante carga.

**Exporta** `default SkeletonList`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`SkeletonText.jsx`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx)

Anticipa líneas de texto y conserva la estructura antes de cargar.

**Exporta** `default SkeletonText`.

**Se apoya en** [`./SkeletonBlock`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx).

**Lo importa** [`cliente/historial/HistorialSkeleton.jsx`](../../apps/referidos-app/src/cliente/historial/HistorialSkeleton.jsx), [`cliente/inicio/ClienteInicioSkeleton.jsx`](../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx), [`components/ui/skeleton/SkeletonCard.jsx`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonCard.jsx), [`negocio/inicio/InicioSkeleton.jsx`](../../apps/referidos-app/src/negocio/inicio/InicioSkeleton.jsx).

## `src/layouts/footer`

### [`BottomNavBase.jsx`](../../apps/referidos-app/src/layouts/footer/BottomNavBase.jsx)

Proporciona botones y disposición de navegación inferior que pueden configurar diferentes roles.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

## `src/layouts/header-elements`

### [`HeaderActions.jsx`](../../apps/referidos-app/src/layouts/header-elements/HeaderActions.jsx)

Agrupa los botones disponibles en la cabecera y emite sus acciones al contenedor.

**Exporta** `default HeaderActions`.

**Lo importa** [`layouts/header-elements/index.js`](../../apps/referidos-app/src/layouts/header-elements/index.js).

### [`index.js`](../../apps/referidos-app/src/layouts/header-elements/index.js)

Punto de importación público de `header-elements`. Reexporta sus piezas para que un consumidor pueda importar desde la carpeta.

**Exporta** `UserIdentity`, `HeaderActions`, `TabTitle`.

**Se apoya en** [`./UserIdentity`](../../apps/referidos-app/src/layouts/header-elements/UserIdentity.jsx), [`./HeaderActions`](../../apps/referidos-app/src/layouts/header-elements/HeaderActions.jsx), [`./TabTitle`](../../apps/referidos-app/src/layouts/header-elements/TabTitle.jsx).

**Lo importa** [`negocio/layout/NegocioHeader.jsx`](../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx).

### [`TabTitle.jsx`](../../apps/referidos-app/src/layouts/header-elements/TabTitle.jsx)

Muestra el título de la pestaña o sección que el contexto de rol seleccionó.

**Exporta** `default TabTitle`.

**Lo importa** [`layouts/header-elements/index.js`](../../apps/referidos-app/src/layouts/header-elements/index.js).

### [`UserIdentity.jsx`](../../apps/referidos-app/src/layouts/header-elements/UserIdentity.jsx)

Dibuja nombre, imagen y otros elementos de identidad en cabecera.

**Exporta** `default UserIdentity`.

**Lo importa** [`layouts/header-elements/index.js`](../../apps/referidos-app/src/layouts/header-elements/index.js).

## `src/layouts/header-panels`

### [`HeaderPanelContainer.jsx`](../../apps/referidos-app/src/layouts/header-panels/HeaderPanelContainer.jsx)

Proporciona la estructura visual para que los paneles se monten con dimensiones y separación consistentes.

**Exporta** `default HeaderPanelContainer`.

**Lo importa** [`layouts/header-panels/index.js`](../../apps/referidos-app/src/layouts/header-panels/index.js).

### [`index.js`](../../apps/referidos-app/src/layouts/header-panels/index.js)

Punto de importación público de `header-panels`. Reexporta sus piezas para que un consumidor pueda importar desde la carpeta.

**Exporta** `HeaderPanelContainer`, `LocationPanel`, `NotificationsPanel`, `QueuePanel`, `SearchbarPanel`.

**Se apoya en** [`./HeaderPanelContainer`](../../apps/referidos-app/src/layouts/header-panels/HeaderPanelContainer.jsx), [`./LocationPanel`](../../apps/referidos-app/src/layouts/header-panels/LocationPanel.jsx), [`./NotificationsPanel`](../../apps/referidos-app/src/layouts/header-panels/NotificationsPanel.jsx), [`./QueuePanel`](../../apps/referidos-app/src/layouts/header-panels/QueuePanel.jsx), [`./SearchbarPanel`](../../apps/referidos-app/src/layouts/header-panels/SearchbarPanel.jsx).

**Lo importa** [`negocio/layout/NegocioHeader.jsx`](../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`LocationPanel.jsx`](../../apps/referidos-app/src/layouts/header-panels/LocationPanel.jsx)

Expone opciones de ubicación dentro de la cabecera y pasa las callbacks al panel activo.

**Exporta** `default LocationPanel`.

**Se apoya en** [`../../components/ui/Badge`](../../apps/referidos-app/src/components/ui/Badge.jsx).

**Lo importa** [`layouts/header-panels/index.js`](../../apps/referidos-app/src/layouts/header-panels/index.js).

### [`NotificationsPanel.jsx`](../../apps/referidos-app/src/layouts/header-panels/NotificationsPanel.jsx)

Muestra la superficie de notificaciones como panel de cabecera.

**Exporta** `default NotificationsPanel`.

**Lo importa** [`layouts/header-panels/index.js`](../../apps/referidos-app/src/layouts/header-panels/index.js).

### [`QueuePanel.jsx`](../../apps/referidos-app/src/layouts/header-panels/QueuePanel.jsx)

Presenta el estado de cola de soporte en la cabecera y sus acciones.

**Exporta** `default QueuePanel`.

**Lo importa** [`layouts/header-panels/index.js`](../../apps/referidos-app/src/layouts/header-panels/index.js).

### [`SearchbarPanel.jsx`](../../apps/referidos-app/src/layouts/header-panels/SearchbarPanel.jsx)

Coloca la barra o controles de búsqueda dentro de la superficie de cabecera.

**Exporta** `default SearchbarPanel`.

**Se apoya en** [`../../search/SearchBar`](../../apps/referidos-app/src/search/SearchBar.jsx).

**Lo importa** [`layouts/header-panels/index.js`](../../apps/referidos-app/src/layouts/header-panels/index.js).

## `src/layouts`

### [`MainLayout.jsx`](../../apps/referidos-app/src/layouts/MainLayout.jsx)

Agrupa el shell general en los consumidores que no montan un layout de rol especializado.

**Exporta** `default MainLayout`.

**Estado en el módulo** `headerHeight`, `menuOpen`, `usuario`, `bootstrap`, `logout`.

**Se apoya en** [`../components/header/Header`](../../apps/referidos-app/src/components/header/Header.jsx), [`../components/footer/Footer`](../../apps/referidos-app/src/components/footer/Footer.jsx), [`../components/menus/MenuLateral`](../../apps/referidos-app/src/components/menus/MenuLateral.jsx), [`../store/appStore`](../../apps/referidos-app/src/store/appStore.js).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

## `src/modals`

### [`ModalProvider.jsx`](../../apps/referidos-app/src/modals/ModalProvider.jsx)

Monta el diálogo activo consultando el store y el registro global.

**Exporta** `default ModalProvider`.

**Estado en el módulo** `viewportH`, `baseH`, `activeModal`, `modalProps`, `closeModal`.

**Se apoya en** `react-dom`, [`./modalStore`](../../apps/referidos-app/src/modals/modalStore.js), [`./modalRegistry`](../../apps/referidos-app/src/modals/modalRegistry.js).

**Lo importa** [`App.jsx`](../../apps/referidos-app/src/App.jsx).

### [`modalRegistry.js`](../../apps/referidos-app/src/modals/modalRegistry.js)

Asocia nombres que reciben los handlers de openModal a componentes concretos.

**Exporta** `modalRegistry`.

**Se apoya en** [`../components/modals/ModalTier`](../../apps/referidos-app/src/components/modals/ModalTier.jsx), [`../components/modals/ModalBeneficios`](../../apps/referidos-app/src/components/modals/ModalBeneficios.jsx), [`../components/modals/ModalCodigoNegocio`](../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx), [`../components/modals/ModalCuentaExistente`](../../apps/referidos-app/src/components/modals/ModalCuentaExistente.jsx), [`../components/modals/ModalAbandonarRegistro`](../../apps/referidos-app/src/components/modals/ModalAbandonarRegistro.jsx), [`../components/modals/ModalEliminarCuenta`](../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx), [`../components/modals/ModalSplashChoiceOverlay`](../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx), [`../components/modals/ModalSplashEmailConfirmation`](../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx), [`../components/modals/ModalFingerprintPrompt`](../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx), [`../components/modals/ModalNotifications`](../../apps/referidos-app/src/components/modals/ModalNotifications.jsx) y 18 dependencias más del módulo.

**Lo importa** [`modals/ModalProvider.jsx`](../../apps/referidos-app/src/modals/ModalProvider.jsx).

### [`modalStore.js`](../../apps/referidos-app/src/modals/modalStore.js)

Guarda nombre, props y acciones para abrir y cerrar modales desde cualquier pantalla.

**Exporta** `useModalStore`.

**Se apoya en** `zustand`.

**Lo importa** [`modals/ModalProvider.jsx`](../../apps/referidos-app/src/modals/ModalProvider.jsx), [`modals/useModal.js`](../../apps/referidos-app/src/modals/useModal.js), [`services/errorPolicyService.js`](../../apps/referidos-app/src/services/errorPolicyService.js), [`store/appStore.js`](../../apps/referidos-app/src/store/appStore.js).

### [`useModal.js`](../../apps/referidos-app/src/modals/useModal.js)

Da a la pantalla una API de acceso al estado y operaciones de modales sin acoplarla al host global.

**Exporta** `useModal`.

**Se apoya en** [`./modalStore`](../../apps/referidos-app/src/modals/modalStore.js).

**Lo importa** [`auth/hooks/useLocationStep.js`](../../apps/referidos-app/src/auth/hooks/useLocationStep.js), [`auth/steps/EmailVerifyStep.jsx`](../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx), [`auth/steps/UserAddressStep.jsx`](../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx), [`cliente/layout/ClienteLayout.jsx`](../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx), [`components/modals/ModalAbandonarRegistro.jsx`](../../apps/referidos-app/src/components/modals/ModalAbandonarRegistro.jsx), [`components/modals/ModalAccessMethods.jsx`](../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx), [`components/modals/ModalAccountVerifySkip.jsx`](../../apps/referidos-app/src/components/modals/ModalAccountVerifySkip.jsx) y 34 módulos más.
