# PWA principal · Cliente, negocio, perfil, búsqueda y escáner

[Volver a la guía de la PWA](../02-pwa-principal.md) · [Índice general](../README.md)

Las carpetas de rol separan navegación y montaje de la vista. El layout mantiene el caché. Los módulos de perfil, búsqueda y escáner reúnen interacciones que aparecen en varias pantallas.

146 archivos de `apps/referidos-app`. Las rutas de esta referencia se leen desde ese workspace. Los enlaces de importación y exportación se extraen del código actual y muestran las conexiones más cercanas a cada pieza.

## `src/cliente/base`

### [`ClienteEscanerBase.jsx`](../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx)

Monta ScannerView con rol cliente y coordina estado activo, cabecera y limpiado al abandonar la pestaña.

**Exporta** `default ClienteEscanerBase`.

**Estado en el módulo** `isActive`.

**Se apoya en** [`../../scanner/ScannerView`](../../apps/referidos-app/src/scanner/ScannerView.jsx), [`../../scanner/blocks/ScannerCameraBlock`](../../apps/referidos-app/src/scanner/blocks/ScannerCameraBlock.jsx), [`../../scanner/blocks/ScannerHeader`](../../apps/referidos-app/src/scanner/blocks/ScannerHeader.jsx), [`../../scanner/blocks/ScannerManualEntry`](../../apps/referidos-app/src/scanner/blocks/ScannerManualEntry.jsx), [`../../scanner/blocks/ScannerPermissionCard`](../../apps/referidos-app/src/scanner/blocks/ScannerPermissionCard.jsx), [`../../scanner/blocks/ScannerPermissionIntro`](../../apps/referidos-app/src/scanner/blocks/ScannerPermissionIntro.jsx), [`../../scanner/blocks/ScannerProcessingHint`](../../apps/referidos-app/src/scanner/blocks/ScannerProcessingHint.jsx), [`../../scanner/blocks/ScannerResultCard`](../../apps/referidos-app/src/scanner/blocks/ScannerResultCard.jsx), [`../../scanner/constants/scannerCopy`](../../apps/referidos-app/src/scanner/constants/scannerCopy.ts), [`../../scanner/hooks/useScannerState`](../../apps/referidos-app/src/scanner/hooks/useScannerState.ts) y 3 dependencias más del módulo.

**Lo importa** [`cliente/layout/ClienteLayout.jsx`](../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx), [`pages/cliente/ClienteEscaner.jsx`](../../apps/referidos-app/src/pages/cliente/ClienteEscaner.jsx).

### [`ClienteHistorialBase.jsx`](../../apps/referidos-app/src/cliente/base/ClienteHistorialBase.jsx)

Entrega HistorialView al caché del layout para preservar el estado del listado de QR.

**Exporta** `default ClienteHistorialBase`.

**Se apoya en** [`../historial/HistorialView`](../../apps/referidos-app/src/cliente/historial/HistorialView.jsx).

**Lo importa** [`cliente/layout/ClienteLayout.jsx`](../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx), [`pages/cliente/ClienteHistorial.jsx`](../../apps/referidos-app/src/pages/cliente/ClienteHistorial.jsx).

### [`ClienteInicioBase.jsx`](../../apps/referidos-app/src/cliente/base/ClienteInicioBase.jsx)

Entrega la implementación de inicio desde cliente/inicio al caché del layout.

**Exporta** `default ClienteInicioBase`.

**Se apoya en** [`../inicio/ClienteInicio`](../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx).

**Lo importa** [`cliente/layout/ClienteLayout.jsx`](../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx), [`pages/cliente/ClienteInicio.jsx`](../../apps/referidos-app/src/pages/cliente/ClienteInicio.jsx).

### [`ClientePerfilBase.jsx`](../../apps/referidos-app/src/cliente/base/ClientePerfilBase.jsx)

Monta el perfil de cliente del directorio profile en la pestaña conservada.

**Exporta** `default ClientePerfilBase`.

**Se apoya en** [`../../profile/cliente/ClientePerfil`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx).

**Lo importa** [`cliente/layout/ClienteLayout.jsx`](../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx), [`pages/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/pages/cliente/ClientePerfil.jsx).

## `src/cliente/historial`

### [`HistorialEmpty.jsx`](../../apps/referidos-app/src/cliente/historial/HistorialEmpty.jsx)

Explica por qué la pestaña no tiene actividad de QR y permite distinguir vacío de carga.

**Exporta** `default HistorialEmpty`.

**Lo importa** [`cliente/historial/HistorialView.jsx`](../../apps/referidos-app/src/cliente/historial/HistorialView.jsx).

### [`HistorialItem.jsx`](../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx)

Representa un elemento histórico en el listado con su estado y datos relevantes.

**Exporta** `default HistorialItem`.

**Estado en el módulo** `isLocalNameWrapped`.

**Se apoya en** [`../../utils/sanitize`](../../apps/referidos-app/src/utils/sanitize.js).

**Lo importa** [`cliente/historial/HistorialList.jsx`](../../apps/referidos-app/src/cliente/historial/HistorialList.jsx).

### [`HistorialItemActivo.jsx`](../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx)

Presenta el estado específico de un QR activo mientras sigue disponible.

**Exporta** `default HistorialItemActivo`.

**Estado en el módulo** `isAddressMarquee`, `addressDistance`, `addressDuration`, `isLocalNameWrapped`.

**Se apoya en** [`../../utils/sanitize`](../../apps/referidos-app/src/utils/sanitize.js).

**Lo importa** [`cliente/historial/HistorialList.jsx`](../../apps/referidos-app/src/cliente/historial/HistorialList.jsx).

### [`HistorialList.jsx`](../../apps/referidos-app/src/cliente/historial/HistorialList.jsx)

Compone las filas de historial y transmite acciones a la pantalla que posee la consulta.

**Exporta** `default HistorialList`.

**Se apoya en** [`./HistorialItem`](../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx), [`./HistorialItemActivo`](../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx).

**Lo importa** [`cliente/historial/HistorialView.jsx`](../../apps/referidos-app/src/cliente/historial/HistorialView.jsx).

### [`HistorialPromosPreview.js`](../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js)

Proporciona ejemplos de actividad para previsualizar la interfaz y sus distintos estados.

**Exporta** `buildHistorialPreview`, `HISTORIAL_PREVIEW_BY_TAB`.

**Se apoya en** [`../inicio/InicioPromosPreview`](../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx).

**Lo importa** [`cliente/historial/HistorialView.jsx`](../../apps/referidos-app/src/cliente/historial/HistorialView.jsx).

### [`HistorialSkeleton.jsx`](../../apps/referidos-app/src/cliente/historial/HistorialSkeleton.jsx)

Anticipa la estructura del historial mientras se ejecuta la consulta.

**Exporta** `default HistorialSkeleton`.

**Se apoya en** [`../../components/ui/skeleton/SkeletonBlock`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx), [`../../components/ui/skeleton/SkeletonText`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx).

**Lo importa** [`cliente/historial/HistorialView.jsx`](../../apps/referidos-app/src/cliente/historial/HistorialView.jsx).

### [`HistorialView.jsx`](../../apps/referidos-app/src/cliente/historial/HistorialView.jsx)

Carga getQrHistory, filtra y organiza por estado visible y actualiza la hora que usa su presentación.

**Exporta** `default HistorialView`.

**Estado en el módulo** `historial`, `loading`, `error`, `now`, `previewByTab`, `usuario`, `isActive`.

**Se apoya en** [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../../services/qrService`](../../apps/referidos-app/src/services/qrService.js), [`../../utils/errorUtils`](../../apps/referidos-app/src/utils/errorUtils.js), [`../hooks/useClienteUI`](../../apps/referidos-app/src/cliente/hooks/useClienteUI.js), [`../layout/ClienteHeaderContext`](../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx), [`../../cache/cacheStore`](../../apps/referidos-app/src/cache/cacheStore.js), [`../../cache/cacheKeys`](../../apps/referidos-app/src/cache/cacheKeys.js), [`./HistorialList`](../../apps/referidos-app/src/cliente/historial/HistorialList.jsx), [`./HistorialEmpty`](../../apps/referidos-app/src/cliente/historial/HistorialEmpty.jsx), [`./HistorialPromosPreview`](../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js) y 1 dependencias más del módulo.

**Lo importa** [`cliente/base/ClienteHistorialBase.jsx`](../../apps/referidos-app/src/cliente/base/ClienteHistorialBase.jsx).

## `src/cliente/hooks`

### [`useClienteUI.js`](../../apps/referidos-app/src/cliente/hooks/useClienteUI.js)

Agrupa información y callbacks comunes de la UI de cliente para sus distintas pantallas.

**Exporta** `useClienteUI`.

**Estado en el módulo** `historyTab`, `profileTab`, `filtersOpen`, `searchVisible`.

**Lo importa** [`cliente/historial/HistorialView.jsx`](../../apps/referidos-app/src/cliente/historial/HistorialView.jsx), [`cliente/inicio/ClienteInicio.jsx`](../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx), [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx).

### [`useSearchDock.js`](../../apps/referidos-app/src/cliente/hooks/useSearchDock.js)

Coordina apertura y estado de los controles de búsqueda puestos en una barra de interfaz.

**Exporta** `useSearchDock`.

**Estado en el módulo** `docked`, `heroVisible`.

**Lo importa** [`cliente/inicio/ClienteInicio.jsx`](../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx).

## `src/cliente/inicio`

### [`ClienteInicio.jsx`](../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx)

Compone cabecera, promos y beneficios. Coordina carga y visibilidad de promociones mediante el store y el contexto del rol.

**Exporta** `default ClienteInicio`.

**Estado en el módulo** `dockTarget`, `loadPromos`, `startPromosAutoRefresh`, `setPromosVisible`, `promos`.

**Se apoya en** `react-dom`, [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../../components/menus/MenuFilters`](../../apps/referidos-app/src/components/menus/MenuFilters.jsx), [`../../components/cards/PromoCardCercanas`](../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx), [`../../components/header-panels`](../../apps/referidos-app/src/components/header-panels/index.js), [`../../search/cliente/ClienteInicioSearch`](../../apps/referidos-app/src/search/cliente/ClienteInicioSearch.jsx), [`../../search/SearchResults`](../../apps/referidos-app/src/search/SearchResults.jsx), [`../../search/hooks/useSearchMode`](../../apps/referidos-app/src/search/hooks/useSearchMode.js), [`../../search/SearchIdle`](../../apps/referidos-app/src/search/SearchIdle.jsx), [`../../hooks/usePromoSearch`](../../apps/referidos-app/src/hooks/usePromoSearch.js) y 12 dependencias más del módulo.

**Lo importa** [`cliente/base/ClienteInicioBase.jsx`](../../apps/referidos-app/src/cliente/base/ClienteInicioBase.jsx).

### [`ClienteInicioSkeleton.jsx`](../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx)

Replica la estructura básica del inicio cliente durante su arranque y carga.

**Exporta** `default ClienteInicioSkeleton`.

**Se apoya en** [`../../components/ui/skeleton/SkeletonBlock`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx), [`../../components/ui/skeleton/SkeletonText`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx), [`../../components/ui/skeleton/SkeletonCard`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonCard.jsx).

**Lo importa** [`cliente/inicio/ClienteInicio.jsx`](../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx).

### [`InicioBeneficios.jsx`](../../apps/referidos-app/src/cliente/inicio/InicioBeneficios.jsx)

Presenta beneficios y acceso relacionado dentro del inicio cliente.

**Exporta** `default InicioBeneficios`.

**Se apoya en** [`../services/clienteUI`](../../apps/referidos-app/src/cliente/services/clienteUI.js).

**Lo importa** [`cliente/inicio/ClienteInicio.jsx`](../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx).

### [`InicioEmptyState.jsx`](../../apps/referidos-app/src/cliente/inicio/InicioEmptyState.jsx)

Muestra contexto y acciones cuando faltan datos en la sección de inicio.

**Exporta** `default InicioEmptyState`.

**Lo importa** [`cliente/inicio/ClienteInicio.jsx`](../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx).

### [`InicioHero.jsx`](../../apps/referidos-app/src/cliente/inicio/InicioHero.jsx)

Compone la tarjeta principal del rol con contenido introductorio y sus acciones.

**Exporta** `default InicioHero`.

**Se apoya en** [`../services/clienteUI`](../../apps/referidos-app/src/cliente/services/clienteUI.js), [`../../search/SearchBar`](../../apps/referidos-app/src/search/SearchBar.jsx).

**Lo importa** [`cliente/inicio/ClienteInicio.jsx`](../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx).

### [`InicioPromos.jsx`](../../apps/referidos-app/src/cliente/inicio/InicioPromos.jsx)

Ordena la presentación de promos de cliente en secciones y conecta navegación a detalle.

**Exporta** `default InicioPromos`.

**Se apoya en** [`../../components/sections/PromoSection`](../../apps/referidos-app/src/components/sections/PromoSection.jsx).

**Lo importa** [`cliente/inicio/InicioPromosPreview.jsx`](../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx).

### [`InicioPromosPreview.jsx`](../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx)

Proporciona tarjetas o datos de demostración para representar la sección sin un catálogo real.

**Exporta** `MOCK_PROMOS`, `HOT_PROMOS`, `default InicioPromosPreview`.

**Se apoya en** [`./InicioPromos`](../../apps/referidos-app/src/cliente/inicio/InicioPromos.jsx), [`../../components/cards/PromoCardCercanas`](../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx), [`../../components/cards/PromoCardHot`](../../apps/referidos-app/src/components/cards/PromoCardHot.jsx), [`../../components/cards/PromoCardNuevas`](../../apps/referidos-app/src/components/cards/PromoCardNuevas.jsx).

**Lo importa** [`cliente/historial/HistorialPromosPreview.js`](../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js), [`cliente/inicio/ClienteInicio.jsx`](../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx), [`components/search/SearchIdle.jsx`](../../apps/referidos-app/src/components/search/SearchIdle.jsx), [`search/SearchIdle.jsx`](../../apps/referidos-app/src/search/SearchIdle.jsx).

## `src/cliente/layout`

### [`ClienteFooter.jsx`](../../apps/referidos-app/src/cliente/layout/ClienteFooter.jsx)

Declara y compone las acciones de navegación inferior específicas de cliente.

**Exporta** `default ClienteFooter`.

**Estado en el módulo** `usuario`, `onboarding`, `bootstrap`.

**Se apoya en** [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js).

**Lo importa** [`cliente/layout/ClienteLayout.jsx`](../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx), [`components/footer/Footer.jsx`](../../apps/referidos-app/src/components/footer/Footer.jsx).

### [`ClienteHeader.jsx`](../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx)

Lee el contexto de cliente y selecciona título, identidad o paneles de búsqueda, ubicación y notificaciones.

**Exporta** `default ClienteHeader`.

**Estado en el módulo** `locationOpen`, `locationVisible`, `notificationsOpen`, `notificationsVisible`, `queueOpen`, `queueVisible`.

**Se apoya en** [`../../components/header-panels`](../../apps/referidos-app/src/components/header-panels/index.js), [`../../components/header-elements`](../../apps/referidos-app/src/components/header-elements/index.js), [`../../search/SearchHeader`](../../apps/referidos-app/src/search/SearchHeader.jsx), [`./ClienteHeaderContext`](../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx), [`../services/clienteUI`](../../apps/referidos-app/src/cliente/services/clienteUI.js).

**Lo importa** [`cliente/layout/ClienteLayout.jsx`](../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx), [`components/header/cliente/HeaderCliente.jsx`](../../apps/referidos-app/src/components/header/cliente/HeaderCliente.jsx).

### [`ClienteHeaderContext.jsx`](../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx)

Expone opciones y visibilidad de cabecera y permite que las pantallas del rol las actualicen sin remontar el layout.

**Exporta** `ClienteHeaderProvider`, `useClienteHeader`.

**Estado en el módulo** `mode`, `onSearchBack`, `headerVisible`, `headerEntering`, `profileDockOpen`, `profileTitle`.

**Lo importa** [`cliente/base/ClienteEscanerBase.jsx`](../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx), [`cliente/historial/HistorialView.jsx`](../../apps/referidos-app/src/cliente/historial/HistorialView.jsx), [`cliente/inicio/ClienteInicio.jsx`](../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx), [`cliente/layout/ClienteHeader.jsx`](../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx), [`cliente/layout/ClienteLayout.jsx`](../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx), [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx).

### [`ClienteLayout.jsx`](../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx)

Fija cabecera, área de scroll y menú inferior, precarga el caché de pestañas y sincroniza el acceso del dispositivo para cliente.

**Exporta** `default ClienteLayout`.

**Acceso directo** `supabase.auth.getSession`, tabla o vista `usuarios`.

**Estado en el módulo** `menuOpen`, `headerHeight`, `headerElevated`, `viewportMetrics`, `usuario`, `bootstrap`, `logout`, `setAccessMethods`.

**Se apoya en** [`./ClienteHeader`](../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx), [`./ClienteFooter`](../../apps/referidos-app/src/cliente/layout/ClienteFooter.jsx), [`../../components/menus/MenuLateral`](../../apps/referidos-app/src/components/menus/MenuLateral.jsx), [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../services/clienteUI`](../../apps/referidos-app/src/cliente/services/clienteUI.js), [`./ClienteHeaderContext`](../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx), [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js), [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`../../services/secureStorageService`](../../apps/referidos-app/src/services/secureStorageService.js), [`../../cache/CacheOutlet`](../../apps/referidos-app/src/cache/CacheOutlet.jsx) y 6 dependencias más del módulo.

**Lo importa** [`pages/cliente/ClienteEscaner.jsx`](../../apps/referidos-app/src/pages/cliente/ClienteEscaner.jsx), [`pages/cliente/ClienteHistorial.jsx`](../../apps/referidos-app/src/pages/cliente/ClienteHistorial.jsx), [`pages/cliente/ClienteInicio.jsx`](../../apps/referidos-app/src/pages/cliente/ClienteInicio.jsx), [`pages/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/pages/cliente/ClientePerfil.jsx), [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

## `src/cliente/services`

### [`clienteUI.js`](../../apps/referidos-app/src/cliente/services/clienteUI.js)

Adapta la información del usuario a etiquetas, avatar y otras piezas de presentación de cliente.

**Exporta** `formatCompactNumber`, `getUserAlias`, `getUserShortName`, `getRoleLabel`, `getTierMeta`, `getTierKey`, `getTierJourney`, `getTierProgress`, `getAvatarSrc`, `getInitials`, `getVerificationStatus`, `formatReadableDate`, `getDisplayEmail`, `getDisplayPhone`, `getDisplayLocation`, `getCercanasTitle`, `getSessionListFallback`, `getPlanFallback`.

**Lo importa** [`cliente/inicio/InicioBeneficios.jsx`](../../apps/referidos-app/src/cliente/inicio/InicioBeneficios.jsx), [`cliente/inicio/InicioHero.jsx`](../../apps/referidos-app/src/cliente/inicio/InicioHero.jsx), [`cliente/layout/ClienteHeader.jsx`](../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx), [`cliente/layout/ClienteLayout.jsx`](../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx), [`components/menus/MenuLateral.jsx`](../../apps/referidos-app/src/components/menus/MenuLateral.jsx), [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx) y 1 módulos más.

## `src/cliente/views`

### [`ClienteEscanerView.jsx`](../../apps/referidos-app/src/cliente/views/ClienteEscanerView.jsx)

Punto de enrutado que activa `CLIENTE_ESCANEAR` en el scope `cliente` mediante `CacheView`. El contenido real lo monta el layout, con `CLIENTE_INICIO` como destino de arranque si hace falta precargar el caché.

**Exporta** `default ClienteEscanerView`.

**Se apoya en** [`../../cache/CacheView`](../../apps/referidos-app/src/cache/CacheView.jsx), [`../../cache/cacheKeys`](../../apps/referidos-app/src/cache/cacheKeys.js).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`ClienteHistorialView.jsx`](../../apps/referidos-app/src/cliente/views/ClienteHistorialView.jsx)

Punto de enrutado que activa `CLIENTE_HISTORIAL` en el scope `cliente` mediante `CacheView`. El contenido real lo monta el layout, con `CLIENTE_INICIO` como destino de arranque si hace falta precargar el caché.

**Exporta** `default ClienteHistorialView`.

**Se apoya en** [`../../cache/CacheView`](../../apps/referidos-app/src/cache/CacheView.jsx), [`../../cache/cacheKeys`](../../apps/referidos-app/src/cache/cacheKeys.js).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`ClienteInicioView.jsx`](../../apps/referidos-app/src/cliente/views/ClienteInicioView.jsx)

Punto de enrutado que activa `CLIENTE_INICIO` en el scope `cliente` mediante `CacheView`. El contenido real lo monta el layout.

**Exporta** `default ClienteInicioView`.

**Se apoya en** [`../../cache/CacheView`](../../apps/referidos-app/src/cache/CacheView.jsx), [`../../cache/cacheKeys`](../../apps/referidos-app/src/cache/cacheKeys.js).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`ClientePerfilView.jsx`](../../apps/referidos-app/src/cliente/views/ClientePerfilView.jsx)

Punto de enrutado que activa `CLIENTE_PERFIL` en el scope `cliente` mediante `CacheView`. El contenido real lo monta el layout, con `CLIENTE_INICIO` como destino de arranque si hace falta precargar el caché.

**Exporta** `default ClientePerfilView`.

**Se apoya en** [`../../cache/CacheView`](../../apps/referidos-app/src/cache/CacheView.jsx), [`../../cache/cacheKeys`](../../apps/referidos-app/src/cache/cacheKeys.js).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

## `src/negocio/base`

### [`NegocioEscanerBase.jsx`](../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx)

Monta ScannerView con rol negocio para activar la rama de canje y configura su cabecera.

**Exporta** `default NegocioEscanerBase`.

**Estado en el módulo** `isActive`.

**Se apoya en** [`../../scanner/ScannerView`](../../apps/referidos-app/src/scanner/ScannerView.jsx), [`../../scanner/blocks/ScannerCameraBlock`](../../apps/referidos-app/src/scanner/blocks/ScannerCameraBlock.jsx), [`../../scanner/blocks/ScannerHeader`](../../apps/referidos-app/src/scanner/blocks/ScannerHeader.jsx), [`../../scanner/blocks/ScannerManualEntry`](../../apps/referidos-app/src/scanner/blocks/ScannerManualEntry.jsx), [`../../scanner/blocks/ScannerPermissionCard`](../../apps/referidos-app/src/scanner/blocks/ScannerPermissionCard.jsx), [`../../scanner/blocks/ScannerPermissionIntro`](../../apps/referidos-app/src/scanner/blocks/ScannerPermissionIntro.jsx), [`../../scanner/blocks/ScannerProcessingHint`](../../apps/referidos-app/src/scanner/blocks/ScannerProcessingHint.jsx), [`../../scanner/blocks/ScannerResultCard`](../../apps/referidos-app/src/scanner/blocks/ScannerResultCard.jsx), [`../../scanner/constants/scannerCopy`](../../apps/referidos-app/src/scanner/constants/scannerCopy.ts), [`../../scanner/hooks/useScannerState`](../../apps/referidos-app/src/scanner/hooks/useScannerState.ts) y 3 dependencias más del módulo.

**Lo importa** [`negocio/layout/NegocioLayout.jsx`](../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx), [`pages/negocio/NegocioEscaner.jsx`](../../apps/referidos-app/src/pages/negocio/NegocioEscaner.jsx).

### [`NegocioGestionarBase.jsx`](../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx)

Conecta los paneles de gestión, navegación y búsqueda contextual con el layout y caché de negocio.

**Exporta** `default NegocioGestionarBase`.

**Estado en el módulo** `activeId`, `onboarding`, `isActive`.

**Se apoya en** [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../layout/NegocioHeaderContext`](../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx), [`../../cache/cacheStore`](../../apps/referidos-app/src/cache/cacheStore.js), [`../../cache/cacheKeys`](../../apps/referidos-app/src/cache/cacheKeys.js), [`../gestionar/GestionarTabs`](../../apps/referidos-app/src/negocio/gestionar/GestionarTabs.jsx), [`../gestionar/GestionarPanel`](../../apps/referidos-app/src/negocio/gestionar/GestionarPanel.jsx), [`../gestionar/sections/Metricas`](../../apps/referidos-app/src/negocio/gestionar/sections/Metricas.jsx), [`../gestionar/sections/Dispositivos`](../../apps/referidos-app/src/negocio/gestionar/sections/Dispositivos.jsx), [`../gestionar/sections/Grupos`](../../apps/referidos-app/src/negocio/gestionar/sections/Grupos.jsx), [`../gestionar/sections/Seguridad`](../../apps/referidos-app/src/negocio/gestionar/sections/Seguridad.jsx).

**Lo importa** [`negocio/layout/NegocioLayout.jsx`](../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx), [`pages/negocio/NegocioGestionar.jsx`](../../apps/referidos-app/src/pages/negocio/NegocioGestionar.jsx).

### [`NegocioInicioBase.jsx`](../../apps/referidos-app/src/negocio/base/NegocioInicioBase.jsx)

Entrega la implementación del inicio de negocio al caché del layout.

**Exporta** `default NegocioInicioBase`.

**Se apoya en** [`../inicio/NegocioInicio`](../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx).

**Lo importa** [`negocio/layout/NegocioLayout.jsx`](../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx), [`pages/negocio/NegocioInicio.jsx`](../../apps/referidos-app/src/pages/negocio/NegocioInicio.jsx).

### [`NegocioPerfilBase.jsx`](../../apps/referidos-app/src/negocio/base/NegocioPerfilBase.jsx)

Usa el perfil de negocio en la pestaña conservada, separado de la capa de navegación.

**Exporta** `default NegocioPerfilBase`.

**Se apoya en** [`../../profile/negocio/NegocioPerfil`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

**Lo importa** [`negocio/layout/NegocioLayout.jsx`](../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx), [`pages/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/pages/negocio/NegocioPerfil.jsx).

## `src/negocio/gestionar`

### [`GestionarPanel.jsx`](../../apps/referidos-app/src/negocio/gestionar/GestionarPanel.jsx)

Selecciona la sección del panel de gestión según la pestaña activa.

**Exporta** `default GestionarPanel`.

**Lo importa** [`negocio/base/NegocioGestionarBase.jsx`](../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx).

### [`GestionarTabs.jsx`](../../apps/referidos-app/src/negocio/gestionar/GestionarTabs.jsx)

Declara etiquetas y navegación entre las secciones de gestión.

**Exporta** `default GestionarTabs`.

**Lo importa** [`negocio/base/NegocioGestionarBase.jsx`](../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx).

## `src/negocio/gestionar/sections`

### [`Dispositivos.jsx`](../../apps/referidos-app/src/negocio/gestionar/sections/Dispositivos.jsx)

Compone la presentación de dispositivos para la sección Gestionar; las sesiones reales del perfil usan sessionDevicesService.

**Exporta** `default Dispositivos`.

**Lo importa** [`negocio/base/NegocioGestionarBase.jsx`](../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx).

### [`Grupos.jsx`](../../apps/referidos-app/src/negocio/gestionar/sections/Grupos.jsx)

Presenta tarjetas de segmentos con datos de ejemplo. La estructura visual sirve para ubicar el futuro flujo de administración de segmentos.

**Exporta** `default Grupos`.

**Lo importa** [`negocio/base/NegocioGestionarBase.jsx`](../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx).

### [`Metricas.jsx`](../../apps/referidos-app/src/negocio/gestionar/sections/Metricas.jsx)

Agrupa tarjetas y representaciones del área de métricas de gestión.

**Exporta** `default Metricas`.

**Lo importa** [`negocio/base/NegocioGestionarBase.jsx`](../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx).

### [`Seguridad.jsx`](../../apps/referidos-app/src/negocio/gestionar/sections/Seguridad.jsx)

Presenta controles o estado del área de seguridad dentro de Gestionar, separado de la autorización del servidor.

**Exporta** `default Seguridad`.

**Estado en el módulo** `settings`.

**Lo importa** [`negocio/base/NegocioGestionarBase.jsx`](../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx).

## `src/negocio/hooks`

### [`useNegocioUI.js`](../../apps/referidos-app/src/negocio/hooks/useNegocioUI.js)

Agrupa información y callbacks de presentación para pantallas de negocio.

**Exporta** `useNegocioUI`.

**Estado en el módulo** `profileTab`, `promosTab`, `filtersOpen`, `searchVisible`.

**Lo importa** [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

## `src/negocio/inicio`

### [`InicioBeneficios.jsx`](../../apps/referidos-app/src/negocio/inicio/InicioBeneficios.jsx)

Presenta beneficios reservados a la experiencia comercial dentro del inicio negocio.

**Exporta** `default InicioBeneficios`.

**Se apoya en** [`../services/negocioUI`](../../apps/referidos-app/src/negocio/services/negocioUI.js).

**Lo importa** [`negocio/inicio/NegocioInicio.jsx`](../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx).

### [`InicioEmptyState.jsx`](../../apps/referidos-app/src/negocio/inicio/InicioEmptyState.jsx)

Muestra contexto y acciones cuando faltan datos en la sección de inicio.

**Exporta** `default InicioEmptyState`.

**Lo importa** [`negocio/inicio/NegocioInicio.jsx`](../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx).

### [`InicioHero.jsx`](../../apps/referidos-app/src/negocio/inicio/InicioHero.jsx)

Compone la tarjeta principal del rol con contenido introductorio y sus acciones.

**Exporta** `default InicioHero`.

**Se apoya en** [`../../assets/bg-home.png`](../../apps/referidos-app/src/assets/bg-home.png), [`../services/negocioUI`](../../apps/referidos-app/src/negocio/services/negocioUI.js).

**Lo importa** [`negocio/inicio/NegocioInicio.jsx`](../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx).

### [`InicioKPIs.jsx`](../../apps/referidos-app/src/negocio/inicio/InicioKPIs.jsx)

Construye las tarjetas de indicadores que recibe el panel de inicio.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`InicioPromos.jsx`](../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx)

Muestra promos del propio negocio y los datos de estado recibidos por props.

**Exporta** `default InicioPromos`.

**Estado en el módulo** `activeFilter`.

**Se apoya en** [`../../components/sections/SectionTitle`](../../apps/referidos-app/src/components/sections/SectionTitle.jsx), [`../../utils/dateUtils`](../../apps/referidos-app/src/utils/dateUtils.js).

**Lo importa** [`negocio/inicio/InicioPromosPreview.jsx`](../../apps/referidos-app/src/negocio/inicio/InicioPromosPreview.jsx), [`negocio/inicio/NegocioInicio.jsx`](../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx).

### [`InicioPromosPreview.jsx`](../../apps/referidos-app/src/negocio/inicio/InicioPromosPreview.jsx)

Proporciona tarjetas o datos de demostración para representar la sección sin un catálogo real.

**Exporta** `MOCK_PROMOS`, `default InicioPromosPreview`.

**Se apoya en** [`./InicioPromos`](../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx).

**Lo importa** [`negocio/inicio/NegocioInicio.jsx`](../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx).

### [`InicioSkeleton.jsx`](../../apps/referidos-app/src/negocio/inicio/InicioSkeleton.jsx)

Implementa el esqueleto de carga de la pantalla comercial para mantener estable el layout.

**Exporta** `default InicioSkeleton`.

**Se apoya en** [`../../components/ui/skeleton/SkeletonBlock`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx), [`../../components/ui/skeleton/SkeletonText`](../../apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx).

**Lo importa** [`negocio/inicio/NegocioInicio.jsx`](../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx).

### [`NegocioInicio.jsx`](../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx)

Resuelve el negocio del usuario, consulta sus promos, gestiona carga y errores y utiliza promos de ejemplo cuando su vista previa está activa.

**Exporta** `default NegocioInicio`.

**Acceso directo** tabla o vista `negocios`, tabla o vista `promos`.

**Estado en el módulo** `promos`, `loading`, `error`, `reloadKey`, `usuario`, `onboarding`, `isActive`.

**Se apoya en** [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`../../components/ui/LoaderOverlay`](../../apps/referidos-app/src/components/ui/LoaderOverlay.jsx), [`../layout/NegocioHeaderContext`](../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx), [`../../cache/cacheStore`](../../apps/referidos-app/src/cache/cacheStore.js), [`../../cache/cacheKeys`](../../apps/referidos-app/src/cache/cacheKeys.js), [`./InicioHero`](../../apps/referidos-app/src/negocio/inicio/InicioHero.jsx), [`./InicioPromos`](../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx), [`./InicioBeneficios`](../../apps/referidos-app/src/negocio/inicio/InicioBeneficios.jsx), [`./InicioEmptyState`](../../apps/referidos-app/src/negocio/inicio/InicioEmptyState.jsx) y 2 dependencias más del módulo.

**Lo importa** [`negocio/base/NegocioInicioBase.jsx`](../../apps/referidos-app/src/negocio/base/NegocioInicioBase.jsx).

## `src/negocio/layout`

### [`NegocioFooter.jsx`](../../apps/referidos-app/src/negocio/layout/NegocioFooter.jsx)

Declara la navegación inferior de negocio y usa la base de pestañas compartida.

**Exporta** `default NegocioFooter`.

**Estado en el módulo** `usuario`, `onboarding`, `bootstrap`.

**Se apoya en** [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js).

**Lo importa** [`negocio/layout/NegocioLayout.jsx`](../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx).

### [`NegocioHeader.jsx`](../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx)

Selecciona título y paneles de cabecera desde el contexto de negocio.

**Exporta** `default NegocioHeader`.

**Estado en el módulo** `supportOpen`, `supportVisible`, `notificationsOpen`, `notificationsVisible`.

**Se apoya en** [`../../layouts/header-panels`](../../apps/referidos-app/src/layouts/header-panels/index.js), [`../../layouts/header-elements`](../../apps/referidos-app/src/layouts/header-elements/index.js), [`../../search/SearchHeader`](../../apps/referidos-app/src/search/SearchHeader.jsx), [`./NegocioHeaderContext`](../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx), [`../services/negocioUI`](../../apps/referidos-app/src/negocio/services/negocioUI.js).

**Lo importa** [`negocio/layout/NegocioLayout.jsx`](../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx).

### [`NegocioHeaderContext.jsx`](../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx)

Guarda modos y opciones del encabezado y da acceso a las vistas anidadas.

**Exporta** `NegocioHeaderProvider`, `useNegocioHeader`.

**Estado en el módulo** `mode`, `onSearchBack`, `headerVisible`, `headerEntering`, `profileDockOpen`, `profileTitle`.

**Lo importa** [`negocio/base/NegocioEscanerBase.jsx`](../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx), [`negocio/base/NegocioGestionarBase.jsx`](../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx), [`negocio/inicio/NegocioInicio.jsx`](../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx), [`negocio/layout/NegocioHeader.jsx`](../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx), [`negocio/layout/NegocioLayout.jsx`](../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`NegocioLayout.jsx`](../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx)

Compone cabecera, navegación inferior, menú y precarga de pestañas de negocio. Coordina scroll y material local del usuario.

**Exporta** `default NegocioLayout`.

**Acceso directo** `supabase.auth.getSession`, tabla o vista `usuarios`.

**Estado en el módulo** `menuOpen`, `headerHeight`, `headerElevated`, `viewportMetrics`, `usuario`, `bootstrap`, `logout`, `setAccessMethods`.

**Se apoya en** [`./NegocioHeader`](../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx), [`./NegocioFooter`](../../apps/referidos-app/src/negocio/layout/NegocioFooter.jsx), [`../../components/menus/MenuLateral`](../../apps/referidos-app/src/components/menus/MenuLateral.jsx), [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../services/negocioUI`](../../apps/referidos-app/src/negocio/services/negocioUI.js), [`./NegocioHeaderContext`](../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx), [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js), [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`../../services/secureStorageService`](../../apps/referidos-app/src/services/secureStorageService.js), [`../../cache/CacheOutlet`](../../apps/referidos-app/src/cache/CacheOutlet.jsx) y 6 dependencias más del módulo.

**Lo importa** [`pages/negocio/NegocioEscaner.jsx`](../../apps/referidos-app/src/pages/negocio/NegocioEscaner.jsx), [`pages/negocio/NegocioGestionar.jsx`](../../apps/referidos-app/src/pages/negocio/NegocioGestionar.jsx), [`pages/negocio/NegocioInicio.jsx`](../../apps/referidos-app/src/pages/negocio/NegocioInicio.jsx), [`pages/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/pages/negocio/NegocioPerfil.jsx), [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

## `src/negocio/services`

### [`negocioUI.js`](../../apps/referidos-app/src/negocio/services/negocioUI.js)

Adapta información del usuario y su negocio a las piezas comunes de su interfaz.

**Exporta** `formatCompactNumber`, `getUserShortName`, `getNegocioRoleLabel`, `getAvatarSrc`, `getNegocioPlanMeta`, `getNegocioNombre`, `getNegocioSector`, `getNegocioDireccion`, `getNegocioImagen`, `getNegocioReferidos`.

**Lo importa** [`negocio/inicio/InicioBeneficios.jsx`](../../apps/referidos-app/src/negocio/inicio/InicioBeneficios.jsx), [`negocio/inicio/InicioHero.jsx`](../../apps/referidos-app/src/negocio/inicio/InicioHero.jsx), [`negocio/layout/NegocioHeader.jsx`](../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx), [`negocio/layout/NegocioLayout.jsx`](../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx).

## `src/negocio/views`

### [`NegocioEscanerView.jsx`](../../apps/referidos-app/src/negocio/views/NegocioEscanerView.jsx)

Punto de enrutado que activa `NEGOCIO_ESCANEAR` en el scope `negocio` mediante `CacheView`. El contenido real lo monta el layout, con `NEGOCIO_INICIO` como destino de arranque si hace falta precargar el caché.

**Exporta** `default NegocioEscanerView`.

**Se apoya en** [`../../cache/CacheView`](../../apps/referidos-app/src/cache/CacheView.jsx), [`../../cache/cacheKeys`](../../apps/referidos-app/src/cache/cacheKeys.js).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`NegocioGestionarView.jsx`](../../apps/referidos-app/src/negocio/views/NegocioGestionarView.jsx)

Punto de enrutado que activa `NEGOCIO_GESTIONAR` en el scope `negocio` mediante `CacheView`. El contenido real lo monta el layout, con `NEGOCIO_INICIO` como destino de arranque si hace falta precargar el caché.

**Exporta** `default NegocioGestionarView`.

**Se apoya en** [`../../cache/CacheView`](../../apps/referidos-app/src/cache/CacheView.jsx), [`../../cache/cacheKeys`](../../apps/referidos-app/src/cache/cacheKeys.js).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`NegocioInicioView.jsx`](../../apps/referidos-app/src/negocio/views/NegocioInicioView.jsx)

Punto de enrutado que activa `NEGOCIO_INICIO` en el scope `negocio` mediante `CacheView`. El contenido real lo monta el layout.

**Exporta** `default NegocioInicioView`.

**Se apoya en** [`../../cache/CacheView`](../../apps/referidos-app/src/cache/CacheView.jsx), [`../../cache/cacheKeys`](../../apps/referidos-app/src/cache/cacheKeys.js).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`NegocioPerfilView.jsx`](../../apps/referidos-app/src/negocio/views/NegocioPerfilView.jsx)

Punto de enrutado que activa `NEGOCIO_PERFIL` en el scope `negocio` mediante `CacheView`. El contenido real lo monta el layout, con `NEGOCIO_INICIO` como destino de arranque si hace falta precargar el caché.

**Exporta** `default NegocioPerfilView`.

**Se apoya en** [`../../cache/CacheView`](../../apps/referidos-app/src/cache/CacheView.jsx), [`../../cache/cacheKeys`](../../apps/referidos-app/src/cache/cacheKeys.js).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

## `src/pages/cliente`

### [`ClienteEscaner.jsx`](../../apps/referidos-app/src/pages/cliente/ClienteEscaner.jsx)

Wrapper de página para `ClienteEscaner` que compone `ClienteLayout` y `ClienteEscanerBase`. Las rutas de pestañas actuales apuntan a entradas en `cliente/views`.

**Exporta** `default ClienteEscaner`.

**Se apoya en** [`../../cliente/layout/ClienteLayout`](../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx), [`../../cliente/base/ClienteEscanerBase`](../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`ClienteHistorial.jsx`](../../apps/referidos-app/src/pages/cliente/ClienteHistorial.jsx)

Wrapper de página para `ClienteHistorial` que compone `ClienteLayout` y `ClienteHistorialBase`. Las rutas de pestañas actuales apuntan a entradas en `cliente/views`.

**Exporta** `default ClienteHistorial`.

**Se apoya en** [`../../cliente/layout/ClienteLayout`](../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx), [`../../cliente/base/ClienteHistorialBase`](../../apps/referidos-app/src/cliente/base/ClienteHistorialBase.jsx).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`ClienteInicio.jsx`](../../apps/referidos-app/src/pages/cliente/ClienteInicio.jsx)

Wrapper de página para `ClienteInicio` que compone `ClienteLayout` y `ClienteInicioBase`. Las rutas de pestañas actuales apuntan a entradas en `cliente/views`.

**Exporta** `default ClienteInicio`.

**Se apoya en** [`../../cliente/layout/ClienteLayout`](../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx), [`../../cliente/base/ClienteInicioBase`](../../apps/referidos-app/src/cliente/base/ClienteInicioBase.jsx).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`ClientePerfil.jsx`](../../apps/referidos-app/src/pages/cliente/ClientePerfil.jsx)

Wrapper de página para `ClientePerfil` que compone `ClienteLayout` y `ClientePerfilBase`. Las rutas de pestañas actuales apuntan a entradas en `cliente/views`.

**Exporta** `default ClientePerfil`.

**Se apoya en** [`../../cliente/layout/ClienteLayout`](../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx), [`../../cliente/base/ClientePerfilBase`](../../apps/referidos-app/src/cliente/base/ClientePerfilBase.jsx).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

## `src/pages/negocio`

### [`NegocioEscaner.jsx`](../../apps/referidos-app/src/pages/negocio/NegocioEscaner.jsx)

Wrapper de página para `NegocioEscaner` que compone `NegocioLayout` y `NegocioEscanerBase`. Las rutas de pestañas actuales apuntan a entradas en `negocio/views`.

**Exporta** `default NegocioEscaner`.

**Se apoya en** [`../../negocio/layout/NegocioLayout`](../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx), [`../../negocio/base/NegocioEscanerBase`](../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`NegocioGestionar.jsx`](../../apps/referidos-app/src/pages/negocio/NegocioGestionar.jsx)

Wrapper de página para `NegocioGestionar` que compone `NegocioLayout` y `NegocioGestionarBase`. Las rutas de pestañas actuales apuntan a entradas en `negocio/views`.

**Exporta** `default NegocioGestionar`.

**Se apoya en** [`../../negocio/layout/NegocioLayout`](../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx), [`../../negocio/base/NegocioGestionarBase`](../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`NegocioInicio.jsx`](../../apps/referidos-app/src/pages/negocio/NegocioInicio.jsx)

Wrapper de página para `NegocioInicio` que compone `NegocioLayout` y `NegocioInicioBase`. Las rutas de pestañas actuales apuntan a entradas en `negocio/views`.

**Exporta** `default NegocioInicio`.

**Se apoya en** [`../../negocio/layout/NegocioLayout`](../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx), [`../../negocio/base/NegocioInicioBase`](../../apps/referidos-app/src/negocio/base/NegocioInicioBase.jsx).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`NegocioPerfil.jsx`](../../apps/referidos-app/src/pages/negocio/NegocioPerfil.jsx)

Wrapper de página para `NegocioPerfil` que compone `NegocioLayout` y `NegocioPerfilBase`. Las rutas de pestañas actuales apuntan a entradas en `negocio/views`.

**Exporta** `default NegocioPerfil`.

**Se apoya en** [`../../negocio/layout/NegocioLayout`](../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx), [`../../negocio/base/NegocioPerfilBase`](../../apps/referidos-app/src/negocio/base/NegocioPerfilBase.jsx).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

## `src/pages`

### [`PromoDetalle.jsx`](../../apps/referidos-app/src/pages/PromoDetalle.jsx)

Resuelve el id de ruta, carga la promo y su QR y actualiza vencimiento visible. Es el punto de entrada del flujo antes de pasar a historial.

**Exporta** `default PromoDetalle`.

**Estado en el módulo** `now`, `promo`, `loadingPromo`, `staticQr`, `validQr`, `error`.

**Se apoya en** `react-qr-code`, [`../utils/sanitize`](../../apps/referidos-app/src/utils/sanitize.js), [`../services/promoService`](../../apps/referidos-app/src/services/promoService.js), [`../services/qrService`](../../apps/referidos-app/src/services/qrService.js), [`../constants/branding`](../../apps/referidos-app/src/constants/branding.js), [`../utils/dateUtils`](../../apps/referidos-app/src/utils/dateUtils.js).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`Promos.jsx`](../../apps/referidos-app/src/pages/Promos.jsx)

Página standalone con listado de promociones. Comprueba las importaciones porque las rutas principales usan las vistas de rol.

**Exporta** `default Promos`.

**Se apoya en** `../context/AppContext`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

## `src/profile/cliente`

### [`ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx)

Coordina las secciones y acciones reales de perfil de cliente, incluidas actualizaciones de cuenta y desbloqueos locales.

**Exporta** `default ClientePerfil`.

**Acceso directo** `supabase.auth.getSession`, tabla o vista `usuarios`.

**Estado en el módulo** `profileView`, `tabsActiveKey`, `searchValue`, `dockTarget`, `dockOpenForHeader`, `sessions`, `usuario`, `setUser`, `logout`, `accessMethods`.

**Se apoya en** `react-dom`, [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../../cliente/hooks/useClienteUI`](../../apps/referidos-app/src/cliente/hooks/useClienteUI.js), [`../../hooks/usePinSetup`](../../apps/referidos-app/src/hooks/usePinSetup.js), [`../../cliente/services/clienteUI`](../../apps/referidos-app/src/cliente/services/clienteUI.js), [`../shared/ProfileTabs`](../../apps/referidos-app/src/profile/shared/ProfileTabs.jsx), [`../shared/ProfilePanel`](../../apps/referidos-app/src/profile/shared/ProfilePanel.jsx), [`../../components/header-panels`](../../apps/referidos-app/src/components/header-panels/index.js), [`../../cliente/layout/ClienteHeaderContext`](../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx), [`../../cache/cacheStore`](../../apps/referidos-app/src/cache/cacheStore.js) y 45 dependencias más del módulo.

**Lo importa** [`cliente/base/ClientePerfilBase.jsx`](../../apps/referidos-app/src/cliente/base/ClientePerfilBase.jsx).

## `src/profile/negocio`

### [`NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx)

Coordina datos, secciones de perfil y operaciones de cuenta del usuario negocio con sus opciones particulares.

**Exporta** `default NegocioPerfil`.

**Acceso directo** `supabase.auth.getSession`, tabla o vista `usuarios`.

**Estado en el módulo** `profileView`, `tabsActiveKey`, `searchValue`, `dockTarget`, `dockOpenForHeader`, `ownerSessions`, `usuario`, `onboarding`, `setUser`, `logout`.

**Se apoya en** `react-dom`, [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../../hooks/usePinSetup`](../../apps/referidos-app/src/hooks/usePinSetup.js), [`../../negocio/hooks/useNegocioUI`](../../apps/referidos-app/src/negocio/hooks/useNegocioUI.js), [`../../cliente/services/clienteUI`](../../apps/referidos-app/src/cliente/services/clienteUI.js), [`../shared/ProfileTabs`](../../apps/referidos-app/src/profile/shared/ProfileTabs.jsx), [`../shared/ProfilePanel`](../../apps/referidos-app/src/profile/shared/ProfilePanel.jsx), [`../../layouts/header-panels`](../../apps/referidos-app/src/layouts/header-panels/index.js), [`../../negocio/layout/NegocioHeaderContext`](../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx), [`../../cache/cacheStore`](../../apps/referidos-app/src/cache/cacheStore.js) y 43 dependencias más del módulo.

**Lo importa** [`negocio/base/NegocioPerfilBase.jsx`](../../apps/referidos-app/src/negocio/base/NegocioPerfilBase.jsx).

## `src/profile/shared/blocks`

### [`AccountStatusCard.jsx`](../../apps/referidos-app/src/profile/shared/blocks/AccountStatusCard.jsx)

Resume el estado de cuenta que recibe el perfil para orientar al usuario en accesos restringidos.

**Exporta** `default AccountStatusCard`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`AliasCard.jsx`](../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx)

Presenta el alias visible de usuario con acciones de edición cuando las ofrece la pantalla.

**Exporta** `default AliasCard`.

**Estado en el módulo** `alias`, `baseAlias`, `isEditingAlias`, `invalidChars`, `viewportH`, `localStatus`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx).

### [`BenefitsCard.jsx`](../../apps/referidos-app/src/profile/shared/blocks/BenefitsCard.jsx)

Resume beneficios y su acceso desde la vista general de perfil.

**Exporta** `default BenefitsCard`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`DangerZone.jsx`](../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx)

Aísla controles de acción destructiva para que el flujo de cuenta pida confirmación explícita.

**Exporta** `default DangerZone`.

**Estado en el módulo** `deleting`, `deleteError`, `logout`.

**Se apoya en** [`../../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js), [`../../../services/authService`](../../apps/referidos-app/src/services/authService.js), [`../../../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js).

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`ExploreTiersCard.jsx`](../../apps/referidos-app/src/profile/shared/blocks/ExploreTiersCard.jsx)

Presenta la entrada a los niveles y beneficios disponibles.

**Exporta** `default ExploreTiersCard`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx).

### [`FaqContent.jsx`](../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx)

Renderiza el catálogo de preguntas frecuentes dentro de ayuda.

**Exporta** `default FaqContent`.

**Estado en el módulo** `openItems`.

**Se apoya en** [`../data/faqContent`](../../apps/referidos-app/src/profile/shared/data/faqContent.js).

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`FingerprintAccessCard.jsx`](../../apps/referidos-app/src/profile/shared/blocks/FingerprintAccessCard.jsx)

Expone estado y acción de biometría local. La comprobación real está en servicios y modales.

**Exporta** `default FingerprintAccessCard`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`FontSelector.jsx`](../../apps/referidos-app/src/profile/shared/blocks/FontSelector.jsx)

Pinta controles de representación tipográfica de la sección de apariencia.

**Exporta** `default FontSelector`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`IdentityCard.jsx`](../../apps/referidos-app/src/profile/shared/blocks/IdentityCard.jsx)

Muestra la identidad de cliente para personalizar el perfil sin repetir la estructura.

**Exporta** `default IdentityCard`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`LanguageSelector.jsx`](../../apps/referidos-app/src/profile/shared/blocks/LanguageSelector.jsx)

Muestra las opciones de idioma que presenta o admite la interfaz del perfil.

**Exporta** `default LanguageSelector`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`LinkedAccountsCard.jsx`](../../apps/referidos-app/src/profile/shared/blocks/LinkedAccountsCard.jsx)

Dibuja proveedores o cuentas enlazadas y expone las acciones del flujo.

**Exporta** `default LinkedAccountsCard`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`NegocioIdentityCard.jsx`](../../apps/referidos-app/src/profile/shared/blocks/NegocioIdentityCard.jsx)

Muestra identidad y datos visuales propios del perfil comercial.

**Exporta** `default NegocioIdentityCard`.

**Lo importa** [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`NotificationsPreferencesCard.jsx`](../../apps/referidos-app/src/profile/shared/blocks/NotificationsPreferencesCard.jsx)

Organiza los controles visibles de preferencias de avisos.

**Exporta** `DEFAULT_NOTIFICATION_PREFS`, `NOTIFICATION_CHANNELS`, `default NotificationsPreferencesCard`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`PasswordAccessCard.jsx`](../../apps/referidos-app/src/profile/shared/blocks/PasswordAccessCard.jsx)

Presenta si la cuenta tiene contraseña y los controles para activarla o modificarla.

**Exporta** `default PasswordAccessCard`.

**Lo importa** [`components/modals/ModalForcePasswordChange.jsx`](../../apps/referidos-app/src/components/modals/ModalForcePasswordChange.jsx), [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`PersonalDataBlock.jsx`](../../apps/referidos-app/src/profile/shared/blocks/PersonalDataBlock.jsx)

Distribuye el formulario o la lectura de datos personales y entrega cambios al contenedor.

**Exporta** `default PersonalDataBlock`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`PinAccessCard.jsx`](../../apps/referidos-app/src/profile/shared/blocks/PinAccessCard.jsx)

Presenta disponibilidad y cambios del PIN local. El hash y verificación se manejan fuera de esta vista.

**Exporta** `default PinAccessCard`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`PlanBenefitsCard.jsx`](../../apps/referidos-app/src/profile/shared/blocks/PlanBenefitsCard.jsx)

Muestra beneficios que el panel de perfil asocia a un plan.

**Exporta** `default PlanBenefitsCard`.

**Lo importa** [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`SessionsList.jsx`](../../apps/referidos-app/src/profile/shared/blocks/SessionsList.jsx)

Renderiza sesiones de dispositivos y acciones de revocación que expone el contenedor.

**Exporta** `default SessionsList`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`SupportChatHubBlock.jsx`](../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx)

Composición de chat, categorías y acciones para abrir una solicitud desde el perfil.

**Exporta** `default SupportChatHubBlock`.

**Estado en el módulo** `category`, `summary`, `includeContext`, `loading`, `created`, `queueCanceled`, `onboarding`.

**Se apoya en** [`../../../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js), [`../data/supportChatCategories`](../../apps/referidos-app/src/profile/shared/data/supportChatCategories.js), [`../services/supportChatClient`](../../apps/referidos-app/src/profile/shared/services/supportChatClient.js), `@referidos/support-sdk/supportClient`, [`../../../services/loggingClient`](../../apps/referidos-app/src/services/loggingClient.js), [`../../../config/runtimeConfig`](../../apps/referidos-app/src/config/runtimeConfig.js).

**Lo importa** [`profile/shared/sections/SupportChat.jsx`](../../apps/referidos-app/src/profile/shared/sections/SupportChat.jsx).

### [`SupportChatTicketsBlock.jsx`](../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx)

Muestra las solicitudes del usuario y opciones permitidas por su estado.

**Exporta** `default SupportChatTicketsBlock`.

**Estado en el módulo** `tickets`, `loading`, `retakeTarget`, `retakeLoading`, `retakeError`, `usuario`.

**Se apoya en** [`../services/supportChatClient`](../../apps/referidos-app/src/profile/shared/services/supportChatClient.js), [`../../../services/loggingClient`](../../apps/referidos-app/src/services/loggingClient.js), [`../../../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), `@referidos/notifications-sdk`.

**Lo importa** [`profile/shared/sections/SupportChat.jsx`](../../apps/referidos-app/src/profile/shared/sections/SupportChat.jsx).

### [`SupportFeedbackForm.jsx`](../../apps/referidos-app/src/profile/shared/blocks/SupportFeedbackForm.jsx)

Capta datos del comentario o problema y coordina la presentación del envío de feedback.

**Exporta** `default SupportFeedbackForm`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`SupportHelpOptions.jsx`](../../apps/referidos-app/src/profile/shared/blocks/SupportHelpOptions.jsx)

Reúne las entradas de ayuda y canales de soporte disponibles desde el perfil.

**Exporta** `default SupportHelpOptions`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`ThemeSelector.jsx`](../../apps/referidos-app/src/profile/shared/blocks/ThemeSelector.jsx)

Presenta las opciones visuales de tema de la sección de apariencia.

**Exporta** `default ThemeSelector`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`TierCurrentCard.jsx`](../../apps/referidos-app/src/profile/shared/blocks/TierCurrentCard.jsx)

Resume el nivel de beneficios que figura como actual para el usuario.

**Exporta** `default TierCurrentCard`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx).

### [`TierNextCard.jsx`](../../apps/referidos-app/src/profile/shared/blocks/TierNextCard.jsx)

Presenta el siguiente nivel y la información de avance disponible.

**Exporta** `default TierNextCard`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx).

### [`TwoFACard.jsx`](../../apps/referidos-app/src/profile/shared/blocks/TwoFACard.jsx)

Muestra el estado del segundo factor y ofrece acceso a sus acciones de alta o baja.

**Exporta** `default TwoFACard`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`VerificationCard.jsx`](../../apps/referidos-app/src/profile/shared/blocks/VerificationCard.jsx)

Presenta la indicación de verificación y la acción para completar el estado de cuenta.

**Exporta** `default VerificationCard`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

## `src/profile/shared/data`

### [`faqContent.js`](../../apps/referidos-app/src/profile/shared/data/faqContent.js)

Catálogo de contenido de ayuda consumido por el perfil.

**Exporta** `FAQ_SECTIONS`.

**Lo importa** [`profile/shared/blocks/FaqContent.jsx`](../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx).

### [`supportChatCategories.js`](../../apps/referidos-app/src/profile/shared/data/supportChatCategories.js)

Define categorías y copy que el perfil utiliza para orientar el comienzo de un ticket.

**Exporta** `SUPPORT_CHAT_CATEGORIES`.

**Lo importa** [`profile/shared/blocks/SupportChatHubBlock.jsx`](../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx).

## `src/profile/shared/hooks`

### [`useMfaState.js`](../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js)

Mantiene estado de factores TOTP y refresca la vista de perfil después de alta o baja de un factor.

**Exporta** `default useMfaState`.

**Estado en el módulo** `loading`, `error`, `totpFactors`, `activeTotp`, `totpStatus`.

**Se apoya en** [`../../../services/mfaService`](../../apps/referidos-app/src/services/mfaService.js).

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

## `src/profile/shared`

### [`ProfilePanel.jsx`](../../apps/referidos-app/src/profile/shared/ProfilePanel.jsx)

Compone el marco de contenidos del perfil y entrega la sección activa.

**Exporta** `default ProfilePanel`.

**Se apoya en** [`../../cliente/services/clienteUI`](../../apps/referidos-app/src/cliente/services/clienteUI.js).

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`ProfileTabs.jsx`](../../apps/referidos-app/src/profile/shared/ProfileTabs.jsx)

Ubica las pestañas del perfil y notifica cuándo hay que montar otra sección.

**Exporta** `default ProfileTabs`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

## `src/profile/shared/sections`

### [`Access.jsx`](../../apps/referidos-app/src/profile/shared/sections/Access.jsx)

Reúne contraseña, PIN y biometría como métodos de acceso y envía cada acción a su handler.

**Exporta** `default Access`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`AppAppearance.jsx`](../../apps/referidos-app/src/profile/shared/sections/AppAppearance.jsx)

Agrupa el selector de tema y otros controles visuales de apariencia del perfil.

**Exporta** `default AppAppearance`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`Beneficios.jsx`](../../apps/referidos-app/src/profile/shared/sections/Beneficios.jsx)

Monta el contenido de beneficios actuales y próximos según las props del perfil.

**Exporta** `default Beneficios`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`Feedback.jsx`](../../apps/referidos-app/src/profile/shared/sections/Feedback.jsx)

Expone el formulario de feedback dentro de las secciones del menú de perfil.

**Exporta** `default Feedback`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`Help.jsx`](../../apps/referidos-app/src/profile/shared/sections/Help.jsx)

Organiza FAQ y opciones de ayuda como entrada a los canales de soporte.

**Exporta** `default Help`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`Language.jsx`](../../apps/referidos-app/src/profile/shared/sections/Language.jsx)

Expone opciones de idioma del perfil mediante su bloque de selector.

**Exporta** `default Language`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`LinkedAccounts.jsx`](../../apps/referidos-app/src/profile/shared/sections/LinkedAccounts.jsx)

Pinta las cuentas o proveedores enlazables dentro de la navegación de perfil.

**Exporta** `default LinkedAccounts`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`ManageAccount.jsx`](../../apps/referidos-app/src/profile/shared/sections/ManageAccount.jsx)

Agrupa cambios y acciones sensibles de cuenta. Usa callbacks del perfil en lugar de ser el dueño de credenciales.

**Exporta** `default ManageAccount`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`Notifications.jsx`](../../apps/referidos-app/src/profile/shared/sections/Notifications.jsx)

Monta las preferencias de notificaciones dentro del perfil.

**Exporta** `default Notifications`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`PersonalData.jsx`](../../apps/referidos-app/src/profile/shared/sections/PersonalData.jsx)

Monta el bloque de datos personales y su modo de edición dentro del perfil.

**Exporta** `default PersonalData`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`ProfileOverview.jsx`](../../apps/referidos-app/src/profile/shared/sections/ProfileOverview.jsx)

Define la vista inicial de perfil con identidad, estado y accesos a otras secciones.

**Exporta** `default ProfileOverview`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`Sessions.jsx`](../../apps/referidos-app/src/profile/shared/sections/Sessions.jsx)

Entrega la lista de dispositivos y acciones de revocación al bloque correspondiente.

**Exporta** `default Sessions`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`SupportChat.jsx`](../../apps/referidos-app/src/profile/shared/sections/SupportChat.jsx)

Coordina el contenido de chat y lista de solicitudes en la sección de perfil.

**Exporta** `default SupportChat`.

**Estado en el módulo** `view`.

**Se apoya en** [`../blocks/SupportChatHubBlock`](../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx), [`../blocks/SupportChatTicketsBlock`](../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx).

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`SupportEmail.jsx`](../../apps/referidos-app/src/profile/shared/sections/SupportEmail.jsx)

Presenta el canal de soporte por correo en el árbol del perfil.

**Exporta** `default SupportEmail`.

**Se apoya en** [`../../../services/loggingClient`](../../apps/referidos-app/src/services/loggingClient.js).

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`TwoFA.jsx`](../../apps/referidos-app/src/profile/shared/sections/TwoFA.jsx)

Monta gestión del segundo factor dentro de la navegación de perfil.

**Exporta** `default TwoFA`.

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

## `src/profile/shared/services`

### [`supportChatClient.js`](../../apps/referidos-app/src/profile/shared/services/supportChatClient.js)

Abre y retoma hilos mediante Edge Functions y consulta support_threads_public para el estado de los tickets del usuario.

**Exporta** `createSupportChatThread`, `fetchSupportChatTickets`, `requestSupportChatRetake`.

**Acceso directo** Edge `support-create-thread`, tabla o vista `support_threads_public`, Edge `support-retake-thread`.

**Se apoya en** [`../../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`../../../services/loggingClient`](../../apps/referidos-app/src/services/loggingClient.js).

**Lo importa** [`profile/shared/blocks/SupportChatHubBlock.jsx`](../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx), [`profile/shared/blocks/SupportChatTicketsBlock.jsx`](../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx).

## `src/scanner/blocks`

### [`ScannerCameraBlock.jsx`](../../apps/referidos-app/src/scanner/blocks/ScannerCameraBlock.jsx)

Aísla la interfaz y componentes del área de captura para que el hook de estado permanezca reutilizable.

**Exporta** `default ScannerCameraBlock`.

**Se apoya en** [`../EscanerCamera`](../../apps/referidos-app/src/scanner/EscanerCamera.jsx).

**Lo importa** [`cliente/base/ClienteEscanerBase.jsx`](../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx), [`negocio/base/NegocioEscanerBase.jsx`](../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx).

### [`ScannerHeader.jsx`](../../apps/referidos-app/src/scanner/blocks/ScannerHeader.jsx)

Define la cabecera y el contexto visible de la operación de escaneo.

**Exporta** `default ScannerHeader`.

**Lo importa** [`cliente/base/ClienteEscanerBase.jsx`](../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx), [`negocio/base/NegocioEscanerBase.jsx`](../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx).

### [`ScannerManualEntry.jsx`](../../apps/referidos-app/src/scanner/blocks/ScannerManualEntry.jsx)

Recoge el código y llama al mismo procesador usado por el flujo de cámara.

**Exporta** `default ScannerManualEntry`.

**Se apoya en** [`../EscanerFallback`](../../apps/referidos-app/src/scanner/EscanerFallback.jsx).

**Lo importa** [`cliente/base/ClienteEscanerBase.jsx`](../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx), [`negocio/base/NegocioEscanerBase.jsx`](../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx).

### [`ScannerPermissionCard.jsx`](../../apps/referidos-app/src/scanner/blocks/ScannerPermissionCard.jsx)

Informa permisos y acciones si la cámara está bloqueada o requiere intervención.

**Exporta** `default ScannerPermissionCard`.

**Se apoya en** [`../EscanerPermisos`](../../apps/referidos-app/src/scanner/EscanerPermisos.jsx).

**Lo importa** [`cliente/base/ClienteEscanerBase.jsx`](../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx), [`negocio/base/NegocioEscanerBase.jsx`](../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx).

### [`ScannerPermissionIntro.jsx`](../../apps/referidos-app/src/scanner/blocks/ScannerPermissionIntro.jsx)

Presenta la introducción antes de solicitar el permiso de cámara.

**Exporta** `default ScannerPermissionIntro`.

**Lo importa** [`cliente/base/ClienteEscanerBase.jsx`](../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx), [`negocio/base/NegocioEscanerBase.jsx`](../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx).

### [`ScannerProcessingHint.jsx`](../../apps/referidos-app/src/scanner/blocks/ScannerProcessingHint.jsx)

Indica el estado ocupado durante el procesamiento de un código.

**Exporta** `default ScannerProcessingHint`.

**Lo importa** [`cliente/base/ClienteEscanerBase.jsx`](../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx), [`negocio/base/NegocioEscanerBase.jsx`](../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx).

### [`ScannerResultCard.jsx`](../../apps/referidos-app/src/scanner/blocks/ScannerResultCard.jsx)

Muestra el resultado estructurado que entrega el canje de QR.

**Exporta** `default ScannerResultCard`.

**Se apoya en** [`../../utils/sanitize`](../../apps/referidos-app/src/utils/sanitize.js).

**Lo importa** [`cliente/base/ClienteEscanerBase.jsx`](../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx), [`negocio/base/NegocioEscanerBase.jsx`](../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx).

### [`ScannerStatusBanner.jsx`](../../apps/referidos-app/src/scanner/blocks/ScannerStatusBanner.jsx)

Traduce un estado de procesamiento en texto y estilo de mensaje de la interfaz.

**Exporta** `default ScannerStatusBanner`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

## `src/scanner/constants`

### [`scannerCopy.ts`](../../apps/referidos-app/src/scanner/constants/scannerCopy.ts)

Textos por rol y estado para cámara, entrada manual, validación y canje.

**Exporta** `scannerCopy`.

**Se apoya en** [`./scannerTypes`](../../apps/referidos-app/src/scanner/constants/scannerTypes.ts).

**Lo importa** [`cliente/base/ClienteEscanerBase.jsx`](../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx), [`negocio/base/NegocioEscanerBase.jsx`](../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx), [`scanner/hooks/useScannerState.ts`](../../apps/referidos-app/src/scanner/hooks/useScannerState.ts).

### [`scannerTypes.ts`](../../apps/referidos-app/src/scanner/constants/scannerTypes.ts)

Contratos TypeScript para rol, códigos, estado y datos de escaneo y presentación.

**Exporta** `ScannerRole`, `ScannerStatusType`, `ScannerParsedCode`, `ScannerCopy`.

**Lo importa** [`scanner/constants/scannerCopy.ts`](../../apps/referidos-app/src/scanner/constants/scannerCopy.ts), [`scanner/hooks/useScannerState.ts`](../../apps/referidos-app/src/scanner/hooks/useScannerState.ts).

## `src/scanner`

### [`EscanerCamera.jsx`](../../apps/referidos-app/src/scanner/EscanerCamera.jsx)

Componente de captura web que abre cámara, detecta contenido y libera recursos cuando termina su ciclo.

**Exporta** `default EscanerCamera`.

**Lo importa** [`scanner/blocks/ScannerCameraBlock.jsx`](../../apps/referidos-app/src/scanner/blocks/ScannerCameraBlock.jsx), [`scanner/EscanerView.jsx`](../../apps/referidos-app/src/scanner/EscanerView.jsx).

### [`EscanerFallback.jsx`](../../apps/referidos-app/src/scanner/EscanerFallback.jsx)

Ofrece una entrada alternativa cuando el flujo automático de escaneo no resulta disponible.

**Exporta** `default EscanerFallback`.

**Lo importa** [`scanner/blocks/ScannerManualEntry.jsx`](../../apps/referidos-app/src/scanner/blocks/ScannerManualEntry.jsx), [`scanner/EscanerView.jsx`](../../apps/referidos-app/src/scanner/EscanerView.jsx).

### [`EscanerPermisos.jsx`](../../apps/referidos-app/src/scanner/EscanerPermisos.jsx)

Composición para explicar y solicitar el permiso de cámara en la variante de escáner correspondiente.

**Exporta** `default EscanerPermisos`.

**Lo importa** [`scanner/blocks/ScannerPermissionCard.jsx`](../../apps/referidos-app/src/scanner/blocks/ScannerPermissionCard.jsx), [`scanner/EscanerView.jsx`](../../apps/referidos-app/src/scanner/EscanerView.jsx).

### [`EscanerView.jsx`](../../apps/referidos-app/src/scanner/EscanerView.jsx)

Entrada de la interfaz de escaneo con la API de la variante Escaner. Confirma el import real frente al ScannerView usado por las bases.

**Exporta** `default EscanerView`.

**Estado en el módulo** `cameraAvailable`, `scanSupported`, `camGranted`, `manualValue`, `setStatusMsg`, `setStatusType`, `usuario`, `scannerPermissionPrompted`, `setScannerPermissionPrompted`, `manualFallbackShown`.

**Se apoya en** [`../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../services/qrService`](../../apps/referidos-app/src/services/qrService.js), [`../utils/errorUtils`](../../apps/referidos-app/src/utils/errorUtils.js), [`../utils/sanitize`](../../apps/referidos-app/src/utils/sanitize.js), [`./EscanerCamera`](../../apps/referidos-app/src/scanner/EscanerCamera.jsx), [`./EscanerPermisos`](../../apps/referidos-app/src/scanner/EscanerPermisos.jsx), [`./EscanerFallback`](../../apps/referidos-app/src/scanner/EscanerFallback.jsx).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`ScannerView.jsx`](../../apps/referidos-app/src/scanner/ScannerView.jsx)

Compone estados visuales de escaneo, cámara y alternativa manual conectados al hook compartido.

**Exporta** `default ScannerView`.

**Lo importa** [`cliente/base/ClienteEscanerBase.jsx`](../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx), [`negocio/base/NegocioEscanerBase.jsx`](../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx).

## `src/scanner/hooks`

### [`useScannerState.ts`](../../apps/referidos-app/src/scanner/hooks/useScannerState.ts)

Coordina medios disponibles, permisos, análisis de QR, estado pendiente y llamada de canje para negocio. Cliente recibe información local del tipo de QR.

**Exporta** `useScannerState`.

**Estado en el módulo** `cameraAvailable`, `scanSupported`, `camGranted`, `manualValue`, `statusMsg`, `statusType`, `scannerPermissionPrompted`, `setScannerPermissionPrompted`, `manualFallbackShown`, `setManualFallbackShown`.

**Se apoya en** [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../../services/qrService`](../../apps/referidos-app/src/services/qrService.js), [`../../services/loggingClient`](../../apps/referidos-app/src/services/loggingClient.js), [`../../utils/errorUtils`](../../apps/referidos-app/src/utils/errorUtils.js), [`../constants/scannerCopy`](../../apps/referidos-app/src/scanner/constants/scannerCopy.ts), [`../constants/scannerTypes`](../../apps/referidos-app/src/scanner/constants/scannerTypes.ts).

**Lo importa** [`cliente/base/ClienteEscanerBase.jsx`](../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx), [`negocio/base/NegocioEscanerBase.jsx`](../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx).

## `src/search/auth`

### [`AddressStepSearch.jsx`](../../apps/referidos-app/src/search/auth/AddressStepSearch.jsx)

Adapta la infraestructura de búsqueda de UI al dominio geográfico del paso de dirección.

**Exporta** `default AddressStepSearch`.

**Se apoya en** [`../SearchMode`](../../apps/referidos-app/src/search/SearchMode.jsx).

**Lo importa** [`auth/steps/UserAddressStep.jsx`](../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx).

## `src/search/cliente`

### [`ClienteInicioSearch.jsx`](../../apps/referidos-app/src/search/cliente/ClienteInicioSearch.jsx)

Adapta la búsqueda visual a las promociones del inicio cliente.

**Exporta** `default ClienteInicioSearch`.

**Se apoya en** [`../SearchMode`](../../apps/referidos-app/src/search/SearchMode.jsx).

**Lo importa** [`cliente/inicio/ClienteInicio.jsx`](../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx).

## `src/search/hooks`

### [`useSearchKeyboard.js`](../../apps/referidos-app/src/search/hooks/useSearchKeyboard.js)

Aísla comportamiento de foco y teclado para que los overlays puedan anticipar cambios de tamaño visible.

**Exporta** `useSearchKeyboard`.

**Lo importa** [`search/SearchMode.jsx`](../../apps/referidos-app/src/search/SearchMode.jsx).

### [`useSearchMode.js`](../../apps/referidos-app/src/search/hooks/useSearchMode.js)

Coordina apertura, cierre y estado contextual del modo de búsqueda.

**Exporta** `useSearchMode`.

**Estado en el módulo** `query`, `open`, `focused`.

**Lo importa** [`cliente/inicio/ClienteInicio.jsx`](../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx).

## `src/search/negocio`

### [`NegocioGestionarSearch.jsx`](../../apps/referidos-app/src/search/negocio/NegocioGestionarSearch.jsx)

Adapta la búsqueda a secciones y contenidos de la pantalla Gestionar de negocio.

**Exporta** `default NegocioGestionarSearch`.

**Se apoya en** [`../SearchMode`](../../apps/referidos-app/src/search/SearchMode.jsx).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

## `src/search/profile`

### [`PerfilSearch.jsx`](../../apps/referidos-app/src/search/profile/PerfilSearch.jsx)

Expone resultados y atajos de búsqueda de las secciones del perfil.

**Exporta** `default PerfilSearch`.

**Se apoya en** [`../SearchMode`](../../apps/referidos-app/src/search/SearchMode.jsx).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

## `src/search`

### [`SearchBar.jsx`](../../apps/referidos-app/src/search/SearchBar.jsx)

Implementa el campo de búsqueda y propaga texto o teclado a su contenedor. Hay variantes para distintos shells.

**Exporta** `default SearchBar`.

**Lo importa** [`cliente/inicio/InicioHero.jsx`](../../apps/referidos-app/src/cliente/inicio/InicioHero.jsx), [`components/header-panels/SearchbarPanel.jsx`](../../apps/referidos-app/src/components/header-panels/SearchbarPanel.jsx), [`components/ui/SearchBar.jsx`](../../apps/referidos-app/src/components/ui/SearchBar.jsx), [`layouts/header-panels/SearchbarPanel.jsx`](../../apps/referidos-app/src/layouts/header-panels/SearchbarPanel.jsx).

### [`SearchEmpty.jsx`](../../apps/referidos-app/src/search/SearchEmpty.jsx)

Representa que una consulta no devolvió resultados.

**Exporta** `default SearchEmpty`.

**Lo importa** [`search/SearchResults.jsx`](../../apps/referidos-app/src/search/SearchResults.jsx).

### [`SearchHeader.jsx`](../../apps/referidos-app/src/search/SearchHeader.jsx)

Compone la barra de cabecera del modo de búsqueda y su retorno.

**Exporta** `default SearchHeader`.

**Lo importa** [`cliente/layout/ClienteHeader.jsx`](../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx), [`negocio/layout/NegocioHeader.jsx`](../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx).

### [`SearchIdle.jsx`](../../apps/referidos-app/src/search/SearchIdle.jsx)

Presenta el estado de búsqueda antes de ingresar un criterio.

**Exporta** `default SearchIdle`.

**Se apoya en** [`../components/cards/PromoCardHot`](../../apps/referidos-app/src/components/cards/PromoCardHot.jsx), [`../components/sections/PromoSection`](../../apps/referidos-app/src/components/sections/PromoSection.jsx), [`../components/sections/SectionTitle`](../../apps/referidos-app/src/components/sections/SectionTitle.jsx), [`../cliente/inicio/InicioPromosPreview`](../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx).

**Lo importa** [`cliente/inicio/ClienteInicio.jsx`](../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx).

### [`SearchMode.jsx`](../../apps/referidos-app/src/search/SearchMode.jsx)

Compone el modo de búsqueda visible y conecta barras, resultados y callbacks.

**Exporta** `default SearchMode`.

**Se apoya en** [`./SearchOverlay`](../../apps/referidos-app/src/search/SearchOverlay.jsx), [`./hooks/useSearchKeyboard`](../../apps/referidos-app/src/search/hooks/useSearchKeyboard.js).

**Lo importa** [`search/auth/AddressStepSearch.jsx`](../../apps/referidos-app/src/search/auth/AddressStepSearch.jsx), [`search/cliente/ClienteInicioSearch.jsx`](../../apps/referidos-app/src/search/cliente/ClienteInicioSearch.jsx), [`search/negocio/NegocioGestionarSearch.jsx`](../../apps/referidos-app/src/search/negocio/NegocioGestionarSearch.jsx), [`search/profile/PerfilSearch.jsx`](../../apps/referidos-app/src/search/profile/PerfilSearch.jsx).

### [`SearchOverlay.jsx`](../../apps/referidos-app/src/search/SearchOverlay.jsx)

Presenta la búsqueda en capa sobre la pantalla activa para mantener la navegación contextual.

**Exporta** `default SearchOverlay`.

**Lo importa** [`search/SearchMode.jsx`](../../apps/referidos-app/src/search/SearchMode.jsx).

### [`SearchResults.jsx`](../../apps/referidos-app/src/search/SearchResults.jsx)

Dibuja el conjunto de resultados que prepara el contexto que activó la búsqueda.

**Exporta** `default SearchResults`.

**Se apoya en** [`./SearchEmpty`](../../apps/referidos-app/src/search/SearchEmpty.jsx).

**Lo importa** [`cliente/inicio/ClienteInicio.jsx`](../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx).
