# PWA principal · Negocio

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L1)
- [`apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L1)
- [`apps/referidos-app/src/negocio/base/NegocioInicioBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioInicioBase.jsx#L1)
- [`apps/referidos-app/src/negocio/base/NegocioPerfilBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioPerfilBase.jsx#L1)
- [`apps/referidos-app/src/negocio/gestionar/GestionarPanel.jsx`](../../../apps/referidos-app/src/negocio/gestionar/GestionarPanel.jsx#L1)
- [`apps/referidos-app/src/negocio/gestionar/GestionarTabs.jsx`](../../../apps/referidos-app/src/negocio/gestionar/GestionarTabs.jsx#L1)
- [`apps/referidos-app/src/negocio/gestionar/sections/Dispositivos.jsx`](../../../apps/referidos-app/src/negocio/gestionar/sections/Dispositivos.jsx#L1)
- [`apps/referidos-app/src/negocio/gestionar/sections/Grupos.jsx`](../../../apps/referidos-app/src/negocio/gestionar/sections/Grupos.jsx#L1)
- [`apps/referidos-app/src/negocio/gestionar/sections/Metricas.jsx`](../../../apps/referidos-app/src/negocio/gestionar/sections/Metricas.jsx#L1)
- [`apps/referidos-app/src/negocio/gestionar/sections/Seguridad.jsx`](../../../apps/referidos-app/src/negocio/gestionar/sections/Seguridad.jsx#L1)
- [`apps/referidos-app/src/negocio/hooks/useNegocioUI.js`](../../../apps/referidos-app/src/negocio/hooks/useNegocioUI.js#L1)
- [`apps/referidos-app/src/negocio/inicio/InicioBeneficios.jsx`](../../../apps/referidos-app/src/negocio/inicio/InicioBeneficios.jsx#L1)
- [`apps/referidos-app/src/negocio/inicio/InicioEmptyState.jsx`](../../../apps/referidos-app/src/negocio/inicio/InicioEmptyState.jsx#L1)
- [`apps/referidos-app/src/negocio/inicio/InicioHero.jsx`](../../../apps/referidos-app/src/negocio/inicio/InicioHero.jsx#L1)
- [`apps/referidos-app/src/negocio/inicio/InicioKPIs.jsx`](../../../apps/referidos-app/src/negocio/inicio/InicioKPIs.jsx#L1)
- [`apps/referidos-app/src/negocio/inicio/InicioPromos.jsx`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L1)
- [`apps/referidos-app/src/negocio/inicio/InicioPromosPreview.jsx`](../../../apps/referidos-app/src/negocio/inicio/InicioPromosPreview.jsx#L1)
- [`apps/referidos-app/src/negocio/inicio/InicioSkeleton.jsx`](../../../apps/referidos-app/src/negocio/inicio/InicioSkeleton.jsx#L1)
- [`apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L1)
- [`apps/referidos-app/src/negocio/layout/NegocioFooter.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioFooter.jsx#L1)
- [`apps/referidos-app/src/negocio/layout/NegocioHeader.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L1)
- [`apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L1)
- [`apps/referidos-app/src/negocio/layout/NegocioLayout.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L1)
- [`apps/referidos-app/src/negocio/services/negocioUI.js`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L1)
- [`apps/referidos-app/src/negocio/views/NegocioEscanerView.jsx`](../../../apps/referidos-app/src/negocio/views/NegocioEscanerView.jsx#L1)
- [`apps/referidos-app/src/negocio/views/NegocioGestionarView.jsx`](../../../apps/referidos-app/src/negocio/views/NegocioGestionarView.jsx#L1)
- [`apps/referidos-app/src/negocio/views/NegocioInicioView.jsx`](../../../apps/referidos-app/src/negocio/views/NegocioInicioView.jsx#L1)
- [`apps/referidos-app/src/negocio/views/NegocioPerfilView.jsx`](../../../apps/referidos-app/src/negocio/views/NegocioPerfilView.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L1)

Monta ScannerView con rol negocio para activar la rama de canje y configura su cabecera.

**Superficie que exporta.** [`NegocioEscanerBase`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L16).

**Módulos que lo cargan.** [`NegocioLayout.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L20) (importa), [`NegocioEscaner.jsx`](../../../apps/referidos-app/src/pages/negocio/NegocioEscaner.jsx#L3) (importa).

**Dependencias del archivo.** `react`, [`../../scanner/ScannerView`](../../../apps/referidos-app/src/scanner/ScannerView.jsx), [`../../scanner/blocks/ScannerCameraBlock`](../../../apps/referidos-app/src/scanner/blocks/ScannerCameraBlock.jsx), [`../../scanner/blocks/ScannerHeader`](../../../apps/referidos-app/src/scanner/blocks/ScannerHeader.jsx), [`../../scanner/blocks/ScannerManualEntry`](../../../apps/referidos-app/src/scanner/blocks/ScannerManualEntry.jsx), [`../../scanner/blocks/ScannerPermissionCard`](../../../apps/referidos-app/src/scanner/blocks/ScannerPermissionCard.jsx), [`../../scanner/blocks/ScannerPermissionIntro`](../../../apps/referidos-app/src/scanner/blocks/ScannerPermissionIntro.jsx), [`../../scanner/blocks/ScannerProcessingHint`](../../../apps/referidos-app/src/scanner/blocks/ScannerProcessingHint.jsx), [`../../scanner/blocks/ScannerResultCard`](../../../apps/referidos-app/src/scanner/blocks/ScannerResultCard.jsx), [`../../scanner/constants/scannerCopy`](../../../apps/referidos-app/src/scanner/constants/scannerCopy.ts), [`../../scanner/hooks/useScannerState`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts), [`../layout/NegocioHeaderContext`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx), [`../../cache/cacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js), [`../../cache/cacheKeys`](../../../apps/referidos-app/src/cache/cacheKeys.js).

#### [`NegocioEscanerBase`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L16) · componente React · exportación por defecto

Monta `ScannerView`, `ScannerHeader`, `ScannerProcessingHint`, `ScannerCameraBlock`, `ScannerPermissionIntro`, `ScannerPermissionCard`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `ScannerView`, `ScannerHeader`, `ScannerProcessingHint`, `ScannerCameraBlock`, `ScannerPermissionIntro`, `ScannerPermissionCard`, `ScannerManualEntry`, `ScannerResultCard`.
- **Hooks que llama** `useNegocioHeader`, `useCacheStore`, `useScannerState`, `useLayoutEffect`.
- **Usa código de** [`useNegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L91) (llama), [`useCacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js#L12) (llama), [`CACHE_KEYS`](../../../apps/referidos-app/src/cache/cacheKeys.js#L1) (accede al módulo), [`useScannerState`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L27) (llama), [`scannerCopy`](../../../apps/referidos-app/src/scanner/constants/scannerCopy.ts#L3) (accede al módulo), [`ScannerView`](../../../apps/referidos-app/src/scanner/ScannerView.jsx#L3) (renderiza), [`ScannerHeader`](../../../apps/referidos-app/src/scanner/blocks/ScannerHeader.jsx#L3) (renderiza), [`ScannerProcessingHint`](../../../apps/referidos-app/src/scanner/blocks/ScannerProcessingHint.jsx#L3) (renderiza), [`ScannerCameraBlock`](../../../apps/referidos-app/src/scanner/blocks/ScannerCameraBlock.jsx#L4) (renderiza), [`ScannerPermissionIntro`](../../../apps/referidos-app/src/scanner/blocks/ScannerPermissionIntro.jsx#L4) (renderiza) y 3 más.
- **Lo usa** [`cacheEntries`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L71) (renderiza), [`NegocioEscaner`](../../../apps/referidos-app/src/pages/negocio/NegocioEscaner.jsx#L8) (renderiza).

#### [`useLayoutEffect · callback`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L47) · callback de infraestructura · dentro de [`NegocioEscanerBase`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L16)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioEscanerBase`.

- **Actualizaciones de estado o acciones** `setHeaderOptions`.
- **Condiciones que evalúa** `ausencia de isActive`.
- **Llamadas directas en el cuerpo** [`setHeaderOptions`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L49).

#### [`ScannerCameraBlock.onFallback`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L91) · callback JSX · dentro de [`NegocioEscanerBase`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L16)

Responde al evento de interfaz `ScannerCameraBlock.onFallback`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setCamGranted`.
- **Llamadas directas en el cuerpo** [`setCamGranted`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L91).

#### [`ScannerManualEntry.onSubmit`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L120) · callback JSX · dentro de [`NegocioEscanerBase`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L16)

Responde al evento de interfaz `ScannerManualEntry.onSubmit`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleCode`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L120).

### [`apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L1)

Conecta los paneles de gestión, navegación y búsqueda contextual con el layout y caché de negocio.

**Superficie que exporta.** [`NegocioGestionarBase`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L14).

**Módulos que lo cargan.** [`NegocioLayout.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L21) (importa), [`NegocioGestionar.jsx`](../../../apps/referidos-app/src/pages/negocio/NegocioGestionar.jsx#L2) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../layout/NegocioHeaderContext`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx), [`../../cache/cacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js), [`../../cache/cacheKeys`](../../../apps/referidos-app/src/cache/cacheKeys.js), [`../gestionar/GestionarTabs`](../../../apps/referidos-app/src/negocio/gestionar/GestionarTabs.jsx), [`../gestionar/GestionarPanel`](../../../apps/referidos-app/src/negocio/gestionar/GestionarPanel.jsx), [`../gestionar/sections/Metricas`](../../../apps/referidos-app/src/negocio/gestionar/sections/Metricas.jsx), [`../gestionar/sections/Dispositivos`](../../../apps/referidos-app/src/negocio/gestionar/sections/Dispositivos.jsx), [`../gestionar/sections/Grupos`](../../../apps/referidos-app/src/negocio/gestionar/sections/Grupos.jsx), [`../gestionar/sections/Seguridad`](../../../apps/referidos-app/src/negocio/gestionar/sections/Seguridad.jsx).

#### [`NegocioGestionarBase`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L14) · componente React · exportación por defecto

Monta `button`, `GestionarTabs`, `GestionarPanel`, `ActiveSection`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `onboarding mediante useAppStore`, `selector s.onboarding`, `[activeId, setActiveId] mediante useState`.
- **Interfaz que monta** `button`, `GestionarTabs`, `GestionarPanel`, `ActiveSection`.
- **Hooks que llama** `useAppStore`, `useNegocioHeader`, `useCacheStore`, `useState`, `useLayoutEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`useNegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L91) (llama), [`useCacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js#L12) (llama), [`CACHE_KEYS`](../../../apps/referidos-app/src/cache/cacheKeys.js#L1) (accede al módulo), [`GestionarTabs`](../../../apps/referidos-app/src/negocio/gestionar/GestionarTabs.jsx#L5) (renderiza), [`GestionarPanel`](../../../apps/referidos-app/src/negocio/gestionar/GestionarPanel.jsx#L5) (renderiza).
- **Llamadas directas en el cuerpo** [`tabs.find`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L38).
- **Lo usa** [`cacheEntries`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L72) (renderiza), [`NegocioGestionar`](../../../apps/referidos-app/src/pages/negocio/NegocioGestionar.jsx#L7) (renderiza).

#### [`tabs`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L24) · cálculo memorizado · dentro de [`NegocioGestionarBase`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L14)

Función auxiliar de `NegocioGestionarBase` para `tabs`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Usa código de** [`Metricas`](../../../apps/referidos-app/src/negocio/gestionar/sections/Metricas.jsx#L6) (referencia), [`Dispositivos`](../../../apps/referidos-app/src/negocio/gestionar/sections/Dispositivos.jsx#L6) (referencia), [`Grupos`](../../../apps/referidos-app/src/negocio/gestionar/sections/Grupos.jsx#L6) (referencia), [`Seguridad`](../../../apps/referidos-app/src/negocio/gestionar/sections/Seguridad.jsx#L6) (referencia).
- **Lo usa** [`NegocioGestionarBase`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L38) (accede al módulo).

#### [`useLayoutEffect · callback`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L41) · callback de infraestructura · dentro de [`NegocioGestionarBase`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L14)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioGestionarBase`.

- **Actualizaciones de estado o acciones** `setHeaderOptions`.
- **Condiciones que evalúa** `ausencia de isActive`.
- **Llamadas directas en el cuerpo** [`setHeaderOptions`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L43).

### [`apps/referidos-app/src/negocio/base/NegocioInicioBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioInicioBase.jsx#L1)

Entrega la implementación del inicio de negocio al caché del layout.

**Superficie que exporta.** [`NegocioInicioBase`](../../../apps/referidos-app/src/negocio/base/NegocioInicioBase.jsx#L4).

**Módulos que lo cargan.** [`NegocioLayout.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L19) (importa), [`NegocioInicio.jsx`](../../../apps/referidos-app/src/pages/negocio/NegocioInicio.jsx#L3) (importa).

**Dependencias del archivo.** `react`, [`../inicio/NegocioInicio`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx).

#### [`NegocioInicioBase`](../../../apps/referidos-app/src/negocio/base/NegocioInicioBase.jsx#L4) · componente React · exportación por defecto

Monta `NegocioInicioView`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `NegocioInicioView`.
- **Usa código de** [`NegocioInicio`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L15) (renderiza).
- **Lo usa** [`cacheEntries`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L70) (renderiza), [`NegocioInicio`](../../../apps/referidos-app/src/pages/negocio/NegocioInicio.jsx#L8) (renderiza).

### [`apps/referidos-app/src/negocio/base/NegocioPerfilBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioPerfilBase.jsx#L1)

Usa el perfil de negocio en la pestaña conservada, separado de la capa de navegación.

**Superficie que exporta.** [`NegocioPerfilBase`](../../../apps/referidos-app/src/negocio/base/NegocioPerfilBase.jsx#L4).

**Módulos que lo cargan.** [`NegocioLayout.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L22) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/pages/negocio/NegocioPerfil.jsx#L3) (importa).

**Dependencias del archivo.** `react`, [`../../profile/negocio/NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

#### [`NegocioPerfilBase`](../../../apps/referidos-app/src/negocio/base/NegocioPerfilBase.jsx#L4) · componente React · exportación por defecto

Monta `NegocioPerfilView`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `NegocioPerfilView`.
- **Usa código de** [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122) (renderiza).
- **Lo usa** [`cacheEntries`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L73) (renderiza), [`NegocioPerfil`](../../../apps/referidos-app/src/pages/negocio/NegocioPerfil.jsx#L8) (renderiza).

### [`apps/referidos-app/src/negocio/gestionar/GestionarPanel.jsx`](../../../apps/referidos-app/src/negocio/gestionar/GestionarPanel.jsx#L1)

Selecciona la sección del panel de gestión según la pestaña activa.

**Superficie que exporta.** [`GestionarPanel`](../../../apps/referidos-app/src/negocio/gestionar/GestionarPanel.jsx#L5).

**Módulos que lo cargan.** [`NegocioGestionarBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L8) (importa).

**Dependencias del archivo.** `react`, `framer-motion`.

#### [`GestionarPanel`](../../../apps/referidos-app/src/negocio/gestionar/GestionarPanel.jsx#L5) · componente React · exportación por defecto

Monta `TEMP_MOTION_SPLASH_TAG`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{activeId, children}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `TEMP_MOTION_SPLASH_TAG`.
- **Lo usa** [`NegocioGestionarBase`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L112) (renderiza).

### [`apps/referidos-app/src/negocio/gestionar/GestionarTabs.jsx`](../../../apps/referidos-app/src/negocio/gestionar/GestionarTabs.jsx#L1)

Declara etiquetas y navegación entre las secciones de gestión.

**Superficie que exporta.** [`GestionarTabs`](../../../apps/referidos-app/src/negocio/gestionar/GestionarTabs.jsx#L5).

**Módulos que lo cargan.** [`NegocioGestionarBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L7) (importa).

**Dependencias del archivo.** `react`, `framer-motion`.

#### [`GestionarTabs`](../../../apps/referidos-app/src/negocio/gestionar/GestionarTabs.jsx#L5) · componente React · exportación por defecto

Monta `TEMP_MOTION_SPLASH_TAG`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{tabs, activeId, onChange}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `TEMP_MOTION_SPLASH_TAG`, `button`.
- **Llamadas directas en el cuerpo** [`tabs.map`](../../../apps/referidos-app/src/negocio/gestionar/GestionarTabs.jsx#L17).
- **Lo usa** [`NegocioGestionarBase`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L109) (renderiza).

#### [`button.onClick`](../../../apps/referidos-app/src/negocio/gestionar/GestionarTabs.jsx#L24) · callback JSX · dentro de [`GestionarTabs`](../../../apps/referidos-app/src/negocio/gestionar/GestionarTabs.jsx#L5)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onChange`](../../../apps/referidos-app/src/negocio/gestionar/GestionarTabs.jsx#L24).

### [`apps/referidos-app/src/negocio/gestionar/sections/Dispositivos.jsx`](../../../apps/referidos-app/src/negocio/gestionar/sections/Dispositivos.jsx#L1)

Compone la presentación de dispositivos para la sección Gestionar; las sesiones reales del perfil usan sessionDevicesService.

**Superficie que exporta.** [`Dispositivos`](../../../apps/referidos-app/src/negocio/gestionar/sections/Dispositivos.jsx#L6).

**Módulos que lo cargan.** [`NegocioGestionarBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L10) (importa).

**Dependencias del archivo.** `react`, `framer-motion`, `lucide-react`.

#### [`Dispositivos`](../../../apps/referidos-app/src/negocio/gestionar/sections/Dispositivos.jsx#L6) · componente React · exportación por defecto

Monta `button`, `TEMP_MOTION_SPLASH_TAG`, `Wifi`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `TEMP_MOTION_SPLASH_TAG`, `Wifi`.
- **Llamadas directas en el cuerpo** [`devices.map`](../../../apps/referidos-app/src/negocio/gestionar/sections/Dispositivos.jsx#L54).
- **Lo usa** [`tabs`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L30) (referencia).

### [`apps/referidos-app/src/negocio/gestionar/sections/Grupos.jsx`](../../../apps/referidos-app/src/negocio/gestionar/sections/Grupos.jsx#L1)

Presenta tarjetas de segmentos con datos de ejemplo. La estructura visual sirve para ubicar el futuro flujo de administración de segmentos.

**Superficie que exporta.** [`Grupos`](../../../apps/referidos-app/src/negocio/gestionar/sections/Grupos.jsx#L6).

**Módulos que lo cargan.** [`NegocioGestionarBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L11) (importa).

**Dependencias del archivo.** `react`, `framer-motion`, `lucide-react`.

#### [`Grupos`](../../../apps/referidos-app/src/negocio/gestionar/sections/Grupos.jsx#L6) · componente React · exportación por defecto

Monta `button`, `TEMP_MOTION_SPLASH_TAG`, `Target`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `TEMP_MOTION_SPLASH_TAG`, `Target`.
- **Llamadas directas en el cuerpo** [`groups.map`](../../../apps/referidos-app/src/negocio/gestionar/sections/Grupos.jsx#L54), [`map`](../../../apps/referidos-app/src/negocio/gestionar/sections/Grupos.jsx#L88).
- **Lo usa** [`tabs`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L32) (referencia).

### [`apps/referidos-app/src/negocio/gestionar/sections/Metricas.jsx`](../../../apps/referidos-app/src/negocio/gestionar/sections/Metricas.jsx#L1)

Agrupa tarjetas y representaciones del área de métricas de gestión.

**Superficie que exporta.** [`Metricas`](../../../apps/referidos-app/src/negocio/gestionar/sections/Metricas.jsx#L6).

**Módulos que lo cargan.** [`NegocioGestionarBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L9) (importa).

**Dependencias del archivo.** `react`, `framer-motion`, `lucide-react`.

#### [`Metricas`](../../../apps/referidos-app/src/negocio/gestionar/sections/Metricas.jsx#L6) · componente React · exportación por defecto

Monta `TEMP_MOTION_SPLASH_TAG`, `ArrowUpRight`, `Sparkles`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `TEMP_MOTION_SPLASH_TAG`, `ArrowUpRight`, `Sparkles`.
- **Llamadas directas en el cuerpo** [`kpis.map`](../../../apps/referidos-app/src/negocio/gestionar/sections/Metricas.jsx#L47), [`bars.map`](../../../apps/referidos-app/src/negocio/gestionar/sections/Metricas.jsx#L88), [`topPromos.map`](../../../apps/referidos-app/src/negocio/gestionar/sections/Metricas.jsx#L106).
- **Lo usa** [`tabs`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L25) (referencia).

### [`apps/referidos-app/src/negocio/gestionar/sections/Seguridad.jsx`](../../../apps/referidos-app/src/negocio/gestionar/sections/Seguridad.jsx#L1)

Presenta controles o estado del área de seguridad dentro de Gestionar, separado de la autorización del servidor.

**Superficie que exporta.** [`Seguridad`](../../../apps/referidos-app/src/negocio/gestionar/sections/Seguridad.jsx#L6).

**Módulos que lo cargan.** [`NegocioGestionarBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L12) (importa).

**Dependencias del archivo.** `react`, `framer-motion`, `lucide-react`.

#### [`Seguridad`](../../../apps/referidos-app/src/negocio/gestionar/sections/Seguridad.jsx#L6) · componente React · exportación por defecto

Monta `button`, `TEMP_MOTION_SPLASH_TAG`, `KeyRound`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[settings, setSettings] mediante useState`.
- **Interfaz que monta** `button`, `TEMP_MOTION_SPLASH_TAG`, `KeyRound`.
- **Hooks que llama** `useState`.
- **Llamadas directas en el cuerpo** [`rows.map`](../../../apps/referidos-app/src/negocio/gestionar/sections/Seguridad.jsx#L61).
- **Lo usa** [`tabs`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L33) (referencia).

#### [`toggle`](../../../apps/referidos-app/src/negocio/gestionar/sections/Seguridad.jsx#L16) · función · dentro de [`Seguridad`](../../../apps/referidos-app/src/negocio/gestionar/sections/Seguridad.jsx#L6)

Coordina cambios de estado durante `toggle`.

- **Entradas** `key`.
- **Actualizaciones de estado o acciones** `setSettings`.
- **Llamadas directas en el cuerpo** [`setSettings`](../../../apps/referidos-app/src/negocio/gestionar/sections/Seguridad.jsx#L17).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/negocio/gestionar/sections/Seguridad.jsx#L86) (llama).

#### [`button.onClick`](../../../apps/referidos-app/src/negocio/gestionar/sections/Seguridad.jsx#L86) · callback JSX · dentro de [`Seguridad`](../../../apps/referidos-app/src/negocio/gestionar/sections/Seguridad.jsx#L6)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`toggle`](../../../apps/referidos-app/src/negocio/gestionar/sections/Seguridad.jsx#L86).

### [`apps/referidos-app/src/negocio/hooks/useNegocioUI.js`](../../../apps/referidos-app/src/negocio/hooks/useNegocioUI.js#L1)

Agrupa información y callbacks de presentación para pantallas de negocio.

**Superficie que exporta.** [`useNegocioUI`](../../../apps/referidos-app/src/negocio/hooks/useNegocioUI.js#L3).

**Módulos que lo cargan.** [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L34) (importa).

**Dependencias del archivo.** `react`.

#### [`useNegocioUI`](../../../apps/referidos-app/src/negocio/hooks/useNegocioUI.js#L3) · hook React · exportado

Agrupa estado, contexto o efectos de `Negocio UI` para sus consumidores React.

- **Entradas** `options = valor por defecto`.
- **Retorno visible o tipo declarado** `profileTab`, `setProfileTab`, `promosTab`, `setPromosTab`, `filtersOpen`, `setFiltersOpen`, `toggleFilters`, `searchVisible`, `toggleSearch`.
- **Estado o valores vinculados** `[profileTab, setProfileTab] mediante useState`, `[promosTab, setPromosTab] mediante useState`, `[filtersOpen, setFiltersOpen] mediante useState`, `[searchVisible, setSearchVisible] mediante useState`.
- **Hooks que llama** `useState`.
- **Lo usa** [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L142) (llama).

#### [`toggleFilters`](../../../apps/referidos-app/src/negocio/hooks/useNegocioUI.js#L15) · callback React · dentro de [`useNegocioUI`](../../../apps/referidos-app/src/negocio/hooks/useNegocioUI.js#L3)

Coordina cambios de estado durante `toggle Filters`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setFiltersOpen`.
- **Llamadas directas en el cuerpo** [`setFiltersOpen`](../../../apps/referidos-app/src/negocio/hooks/useNegocioUI.js#L16).
- **Lo usa** [`useNegocioUI`](../../../apps/referidos-app/src/negocio/hooks/useNegocioUI.js#L30) (referencia).

#### [`toggleSearch`](../../../apps/referidos-app/src/negocio/hooks/useNegocioUI.js#L19) · callback React · dentro de [`useNegocioUI`](../../../apps/referidos-app/src/negocio/hooks/useNegocioUI.js#L3)

Coordina cambios de estado durante `toggle Search`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSearchVisible`.
- **Llamadas directas en el cuerpo** [`setSearchVisible`](../../../apps/referidos-app/src/negocio/hooks/useNegocioUI.js#L20).
- **Lo usa** [`useNegocioUI`](../../../apps/referidos-app/src/negocio/hooks/useNegocioUI.js#L32) (referencia).

### [`apps/referidos-app/src/negocio/inicio/InicioBeneficios.jsx`](../../../apps/referidos-app/src/negocio/inicio/InicioBeneficios.jsx#L1)

Presenta beneficios reservados a la experiencia comercial dentro del inicio negocio.

**Superficie que exporta.** [`InicioBeneficios`](../../../apps/referidos-app/src/negocio/inicio/InicioBeneficios.jsx#L33).

**Módulos que lo cargan.** [`NegocioInicio.jsx`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L10) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, `react-router-dom`, [`../services/negocioUI`](../../../apps/referidos-app/src/negocio/services/negocioUI.js).

#### [`BENEFITS`](../../../apps/referidos-app/src/negocio/inicio/InicioBeneficios.jsx#L12) · variable de módulo

Conserva la lista de `BENEFITS` usada por el módulo.

- **Lo usa** [`InicioBeneficios`](../../../apps/referidos-app/src/negocio/inicio/InicioBeneficios.jsx#L60) (accede al módulo).

#### [`InicioBeneficios`](../../../apps/referidos-app/src/negocio/inicio/InicioBeneficios.jsx#L33) · componente React · exportación por defecto

Monta `Icon`, `Crown`, `Link`, `ArrowUpRight`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{negocio, usuario}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Icon`, `Crown`, `Link`, `ArrowUpRight`.
- **Usa código de** [`getNegocioPlanMeta`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L45) (llama).
- **Llamadas directas en el cuerpo** [`getNegocioPlanMeta`](../../../apps/referidos-app/src/negocio/inicio/InicioBeneficios.jsx#L34), [`BENEFITS.map`](../../../apps/referidos-app/src/negocio/inicio/InicioBeneficios.jsx#L60).
- **Lo usa** [`NegocioInicio`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L173) (renderiza).

### [`apps/referidos-app/src/negocio/inicio/InicioEmptyState.jsx`](../../../apps/referidos-app/src/negocio/inicio/InicioEmptyState.jsx#L1)

Muestra contexto y acciones cuando faltan datos en la sección de inicio.

**Superficie que exporta.** [`InicioEmptyState`](../../../apps/referidos-app/src/negocio/inicio/InicioEmptyState.jsx#L18).

**Módulos que lo cargan.** [`NegocioInicio.jsx`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L11) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, `lucide-react`.

#### [`EMPTY_COPY`](../../../apps/referidos-app/src/negocio/inicio/InicioEmptyState.jsx#L5) · variable de módulo

Agrupa la configuración o catálogo de `EMPTY COPY` para que sus consumidores lean claves comunes.

- **Campos o contexto** `promos`, `error`.
- **Lo usa** [`InicioEmptyState`](../../../apps/referidos-app/src/negocio/inicio/InicioEmptyState.jsx#L19) (accede al módulo).

#### [`InicioEmptyState`](../../../apps/referidos-app/src/negocio/inicio/InicioEmptyState.jsx#L18) · componente React · exportación por defecto

Monta `Icon`, `button`, `Link`, `PlusCircle`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{variant, onRetry}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Icon`, `button`, `Link`, `PlusCircle`.
- **Lo usa** [`NegocioInicio`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L163) (renderiza).

### [`apps/referidos-app/src/negocio/inicio/InicioHero.jsx`](../../../apps/referidos-app/src/negocio/inicio/InicioHero.jsx#L1)

Compone la tarjeta principal del rol con contenido introductorio y sus acciones.

**Superficie que exporta.** [`InicioHero`](../../../apps/referidos-app/src/negocio/inicio/InicioHero.jsx#L22).

**Módulos que lo cargan.** [`NegocioInicio.jsx`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L8) (importa).

**Dependencias del archivo.** `react`, `framer-motion`, `lucide-react`, `react-router-dom`, [`../../assets/bg-home.png`](../../../apps/referidos-app/src/assets/bg-home.png), [`../services/negocioUI`](../../../apps/referidos-app/src/negocio/services/negocioUI.js).

#### [`InicioHero`](../../../apps/referidos-app/src/negocio/inicio/InicioHero.jsx#L22) · componente React · exportación por defecto

Monta `TEMP_MOTION_SPLASH_TAG`, `img`, `Store`, `MapPin`, `Link`, `Crown`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{usuario, negocio, stats}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `TEMP_MOTION_SPLASH_TAG`, `img`, `Store`, `MapPin`, `Link`, `Crown`, `PlusCircle`, `LayoutGrid`, `BarChart3`.
- **Usa código de** [`getNegocioPlanMeta`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L45) (llama), [`getNegocioNombre`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L57) (llama), [`getNegocioSector`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L66) (llama), [`getNegocioDireccion`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L70) (llama), [`getNegocioImagen`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L82) (llama), [`negocioFallback`](../../../apps/referidos-app/src/assets/bg-home.png) (referencia), [`getNegocioRoleLabel`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L30) (llama).
- **Llamadas directas en el cuerpo** [`getNegocioPlanMeta`](../../../apps/referidos-app/src/negocio/inicio/InicioHero.jsx#L26), [`getNegocioNombre`](../../../apps/referidos-app/src/negocio/inicio/InicioHero.jsx#L27), [`getNegocioSector`](../../../apps/referidos-app/src/negocio/inicio/InicioHero.jsx#L28), [`getNegocioDireccion`](../../../apps/referidos-app/src/negocio/inicio/InicioHero.jsx#L29), [`getNegocioImagen`](../../../apps/referidos-app/src/negocio/inicio/InicioHero.jsx#L30), [`getNegocioRoleLabel`](../../../apps/referidos-app/src/negocio/inicio/InicioHero.jsx#L31).
- **Lo usa** [`NegocioInicio`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L155) (renderiza).

### [`apps/referidos-app/src/negocio/inicio/InicioKPIs.jsx`](../../../apps/referidos-app/src/negocio/inicio/InicioKPIs.jsx#L1)

Construye las tarjetas de indicadores que recibe el panel de inicio.

El archivo participa como entrada, adaptador de imports o reexportación.

### [`apps/referidos-app/src/negocio/inicio/InicioPromos.jsx`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L1)

Muestra promos del propio negocio y los datos de estado recibidos por props.

**Superficie que exporta.** [`InicioPromos`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L50).

**Módulos que lo cargan.** [`InicioPromosPreview.jsx`](../../../apps/referidos-app/src/negocio/inicio/InicioPromosPreview.jsx#L3) (importa), [`NegocioInicio.jsx`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L9) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, `react-router-dom`, [`../../components/sections/SectionTitle`](../../../apps/referidos-app/src/components/sections/SectionTitle.jsx), [`../../utils/dateUtils`](../../../apps/referidos-app/src/utils/dateUtils.js).

#### [`STATUS_META`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L7) · variable de módulo

Agrupa la configuración o catálogo de `STATUS META` para que sus consumidores lean claves comunes.

- **Campos o contexto** `activo`, `pendiente`, `inactivo`.
- **Lo usa** [`InicioPromos`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L109) (accede al módulo).

#### [`SummaryCard`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L28) · componente React

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{label, value, active, onClick}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`.
- **Lo usa** [`InicioPromos`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L77) (renderiza).

#### [`InicioPromos`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L50) · componente React · exportación por defecto

Monta `SectionTitle`, `Link`, `SummaryCard`, `Icon`, `Calendar`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{promos, stats}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[activeFilter, setActiveFilter] mediante useState`.
- **Interfaz que monta** `SectionTitle`, `Link`, `SummaryCard`, `Icon`, `Calendar`.
- **Hooks que llama** `useState`.
- **Usa código de** [`SectionTitle`](../../../apps/referidos-app/src/components/sections/SectionTitle.jsx#L2) (renderiza), [`formatDateIsoToDdMmYyyy`](../../../apps/referidos-app/src/utils/dateUtils.js#L2) (llama).
- **Llamadas directas en el cuerpo** [`latest.map`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L108), [`formatDateIsoToDdMmYyyy`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L140).
- **Lo usa** [`InicioPromosPreview`](../../../apps/referidos-app/src/negocio/inicio/InicioPromosPreview.jsx#L44) (renderiza), [`NegocioInicio`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L170) (renderiza).

#### [`filteredPromos`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L52) · cálculo memorizado · dentro de [`InicioPromos`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L50)

Procesa `ed Promos` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de activeFilter`.
- **Llamadas directas en el cuerpo** [`promos.filter`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L54).
- **Lo usa** [`latest`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L56) (accede al módulo).

#### [`latest`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L56) · cálculo memorizado · dentro de [`InicioPromos`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L50)

Función auxiliar de `InicioPromos` para `latest`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`filteredPromos.slice`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L56).
- **Lo usa** [`InicioPromos`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L108) (accede al módulo).

#### [`SummaryCard.onClick`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L81) · callback JSX · dentro de [`InicioPromos`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L50)

Responde al evento de interfaz `SummaryCard.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setActiveFilter`.
- **Llamadas directas en el cuerpo** [`setActiveFilter`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L82).

#### [`SummaryCard.onClick`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L89) · callback JSX · dentro de [`InicioPromos`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L50)

Responde al evento de interfaz `SummaryCard.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setActiveFilter`.
- **Llamadas directas en el cuerpo** [`setActiveFilter`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L90).

#### [`SummaryCard.onClick`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L99) · callback JSX · dentro de [`InicioPromos`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L50)

Responde al evento de interfaz `SummaryCard.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setActiveFilter`.
- **Llamadas directas en el cuerpo** [`setActiveFilter`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L100).

### [`apps/referidos-app/src/negocio/inicio/InicioPromosPreview.jsx`](../../../apps/referidos-app/src/negocio/inicio/InicioPromosPreview.jsx#L1)

Proporciona tarjetas o datos de demostración para representar la sección sin un catálogo real.

**Superficie que exporta.** [`MOCK_PROMOS`](../../../apps/referidos-app/src/negocio/inicio/InicioPromosPreview.jsx#L5), [`InicioPromosPreview`](../../../apps/referidos-app/src/negocio/inicio/InicioPromosPreview.jsx#L43).

**Módulos que lo cargan.** [`NegocioInicio.jsx`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L13) (importa).

**Dependencias del archivo.** `react`, [`./InicioPromos`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx).

#### [`MOCK_PROMOS`](../../../apps/referidos-app/src/negocio/inicio/InicioPromosPreview.jsx#L5) · variable de módulo · exportado

Conserva la lista de `MOCK PROMOS` usada por el módulo.

- **Lo usa** [`InicioPromosPreview`](../../../apps/referidos-app/src/negocio/inicio/InicioPromosPreview.jsx#L44) (pasa a promos), [`displayPromos`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L113) (referencia).

#### [`InicioPromosPreview`](../../../apps/referidos-app/src/negocio/inicio/InicioPromosPreview.jsx#L43) · componente React · exportación por defecto

Monta `InicioPromos`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `InicioPromos`.
- **Usa código de** [`InicioPromos`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L50) (renderiza).

### [`apps/referidos-app/src/negocio/inicio/InicioSkeleton.jsx`](../../../apps/referidos-app/src/negocio/inicio/InicioSkeleton.jsx#L1)

Implementa el esqueleto de carga de la pantalla comercial para mantener estable el layout.

**Superficie que exporta.** [`InicioSkeleton`](../../../apps/referidos-app/src/negocio/inicio/InicioSkeleton.jsx#L39).

**Módulos que lo cargan.** [`NegocioInicio.jsx`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L12) (importa).

**Dependencias del archivo.** [`../../components/ui/skeleton/SkeletonBlock`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx), [`../../components/ui/skeleton/SkeletonText`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx).

#### [`MetricsRow`](../../../apps/referidos-app/src/negocio/inicio/InicioSkeleton.jsx#L4) · componente React

Monta `SkeletonBlock`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SkeletonBlock`.
- **Usa código de** [`SkeletonBlock`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx#L3) (renderiza).
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-app/src/negocio/inicio/InicioSkeleton.jsx#L7).
- **Lo usa** [`InicioSkeleton`](../../../apps/referidos-app/src/negocio/inicio/InicioSkeleton.jsx#L45) (renderiza).

#### [`PromoSkeletonCard`](../../../apps/referidos-app/src/negocio/inicio/InicioSkeleton.jsx#L22) · componente React

Monta `SkeletonBlock`, `SkeletonText`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{index}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SkeletonBlock`, `SkeletonText`.
- **Usa código de** [`SkeletonBlock`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx#L3) (renderiza), [`SkeletonText`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx#L8) (renderiza).
- **Lo usa** [`InicioSkeleton`](../../../apps/referidos-app/src/negocio/inicio/InicioSkeleton.jsx#L56) (renderiza).

#### [`InicioSkeleton`](../../../apps/referidos-app/src/negocio/inicio/InicioSkeleton.jsx#L39) · componente React · exportación por defecto

Monta `SkeletonBlock`, `MetricsRow`, `PromoSkeletonCard`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SkeletonBlock`, `MetricsRow`, `PromoSkeletonCard`.
- **Usa código de** [`SkeletonBlock`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx#L3) (renderiza).
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-app/src/negocio/inicio/InicioSkeleton.jsx#L55).
- **Lo usa** [`NegocioInicio`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L145) (renderiza).

### [`apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L1)

Resuelve el negocio del usuario, consulta sus promos, gestiona carga y errores y utiliza promos de ejemplo cuando su vista previa está activa.

**Superficie que exporta.** [`NegocioInicio`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L15).

**Módulos que lo cargan.** [`NegocioInicioBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioInicioBase.jsx#L2) (importa).

**Dependencias del archivo.** `react`, [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../../components/ui/LoaderOverlay`](../../../apps/referidos-app/src/components/ui/LoaderOverlay.jsx), [`../layout/NegocioHeaderContext`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx), [`../../cache/cacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js), [`../../cache/cacheKeys`](../../../apps/referidos-app/src/cache/cacheKeys.js), [`./InicioHero`](../../../apps/referidos-app/src/negocio/inicio/InicioHero.jsx), [`./InicioPromos`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx), [`./InicioBeneficios`](../../../apps/referidos-app/src/negocio/inicio/InicioBeneficios.jsx), [`./InicioEmptyState`](../../../apps/referidos-app/src/negocio/inicio/InicioEmptyState.jsx), [`./InicioSkeleton`](../../../apps/referidos-app/src/negocio/inicio/InicioSkeleton.jsx), [`./InicioPromosPreview`](../../../apps/referidos-app/src/negocio/inicio/InicioPromosPreview.jsx).

#### [`NegocioInicio`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L15) · componente React · exportación por defecto

Monta `LoaderOverlay`, `InicioSkeleton`, `InicioHero`, `InicioEmptyState`, `InicioPromos`, `InicioBeneficios`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `onboarding mediante useAppStore`, `selector s.onboarding`, `[promos, setPromos] mediante useState`, `[loading, setLoading] mediante useState`, `[error, setError] mediante useState`, `[reloadKey, setReloadKey] mediante useState`.
- **Interfaz que monta** `LoaderOverlay`, `InicioSkeleton`, `InicioHero`, `InicioEmptyState`, `InicioPromos`, `InicioBeneficios`.
- **Hooks que llama** `useAppStore`, `useNegocioHeader`, `useCacheStore`, `useState`, `useEffect`, `useLayoutEffect`.
- **Condiciones que evalúa** `showSkeleton`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`useNegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L91) (llama), [`useCacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js#L12) (llama), [`CACHE_KEYS`](../../../apps/referidos-app/src/cache/cacheKeys.js#L1) (accede al módulo), [`LoaderOverlay`](../../../apps/referidos-app/src/components/ui/LoaderOverlay.jsx#L1) (renderiza), [`InicioSkeleton`](../../../apps/referidos-app/src/negocio/inicio/InicioSkeleton.jsx#L39) (renderiza), [`InicioHero`](../../../apps/referidos-app/src/negocio/inicio/InicioHero.jsx#L22) (renderiza), [`InicioEmptyState`](../../../apps/referidos-app/src/negocio/inicio/InicioEmptyState.jsx#L18) (renderiza), [`InicioPromos`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L50) (renderiza), [`InicioBeneficios`](../../../apps/referidos-app/src/negocio/inicio/InicioBeneficios.jsx#L33) (renderiza).
- **Lo usa** [`NegocioInicioBase`](../../../apps/referidos-app/src/negocio/base/NegocioInicioBase.jsx#L5) (renderiza).

#### [`useEffect · callback`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L28) · callback de infraestructura · dentro de [`NegocioInicio`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L15)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioInicio`.

- **Llamadas directas en el cuerpo** [`fetchPromos`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L102).

#### [`fetchPromos`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L31) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L28)

Consulta o invoca tabla o vista [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) y coordina las demás operaciones de esta ficha.

- **Actualizaciones de estado o acciones** `setLoading`, `setError`, `setPromos`.
- **Condiciones que evalúa** `undefined`, `ausencia de usuario o usuario.role`, `negErr`, `ausencia de negocioId`, `ausencia de active`, `promoErr`.
- **Contrato de datos** tabla o vista [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) (`select`) en [`NegocioInicio.jsx:45`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L45), tabla o bucket [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) en [`NegocioInicio.jsx:45`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L45), tabla o vista [`promos`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L82) (`select`) en [`NegocioInicio.jsx:62`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L62), tabla o bucket [`promos`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L82) en [`NegocioInicio.jsx:62`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L62).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L34), [`setError`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L40), [`maybeSingle`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L45), [`eq`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L45), [`select`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L45), [`supabase.from`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L45), [`setPromos`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L56), [`order`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L62), [`map`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L83).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L102) (llama).

#### [`displayPromos`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L112) · cálculo memorizado · dentro de [`NegocioInicio`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L15)

Formatea el valor de promociones para que el consumidor lo pueda presentar.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `showPreview`.
- **Usa código de** [`MOCK_PROMOS`](../../../apps/referidos-app/src/negocio/inicio/InicioPromosPreview.jsx#L5) (referencia).
- **Lo usa** [`displayStats`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L119) (accede al módulo), [`NegocioInicio`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L170) (pasa a promos).

#### [`displayStats`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L117) · cálculo memorizado · dentro de [`NegocioInicio`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L15)

Formatea `Stats` para que el consumidor lo pueda presentar.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `promo.estado`.
- **Llamadas directas en el cuerpo** [`displayPromos.forEach`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L119).
- **Lo usa** [`NegocioInicio`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L158) (pasa a stats).

#### [`useLayoutEffect · callback`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L130) · callback de infraestructura · dentro de [`NegocioInicio`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L15)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioInicio`.

- **Actualizaciones de estado o acciones** `setHeaderOptions`.
- **Condiciones que evalúa** `ausencia de isActive`.
- **Llamadas directas en el cuerpo** [`setHeaderOptions`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L132).

#### [`InicioEmptyState.onRetry`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L165) · callback JSX · dentro de [`NegocioInicio`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L15)

Responde al evento de interfaz `InicioEmptyState.onRetry`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setReloadKey`.
- **Llamadas directas en el cuerpo** [`setReloadKey`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L165).

### [`apps/referidos-app/src/negocio/layout/NegocioFooter.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioFooter.jsx#L1)

Declara la navegación inferior de negocio y usa la base de pestañas compartida.

**Superficie que exporta.** [`NegocioFooter`](../../../apps/referidos-app/src/negocio/layout/NegocioFooter.jsx#L8).

**Módulos que lo cargan.** [`NegocioLayout.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L4) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, `lucide-react`, `framer-motion`, [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js).

#### [`NegocioFooter`](../../../apps/referidos-app/src/negocio/layout/NegocioFooter.jsx#L8) · componente React · exportación por defecto

Monta `Link`, `TEMP_MOTION_SPLASH_TAG`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `onboarding mediante useAppStore`, `selector s.onboarding`, `bootstrap mediante useAppStore`, `selector s.bootstrap`.
- **Interfaz que monta** `Link`, `TEMP_MOTION_SPLASH_TAG`.
- **Hooks que llama** `useLocation`, `useAppStore`.
- **Condiciones que evalúa** `bootstrap o undefined`, `ausencia de usuario o ausencia de onboarding.allowAccess`, `usuario.role`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama).
- **Llamadas directas en el cuerpo** [`links.map`](../../../apps/referidos-app/src/negocio/layout/NegocioFooter.jsx#L38), [`isActive`](../../../apps/referidos-app/src/negocio/layout/NegocioFooter.jsx#L39), [`React.createElement`](../../../apps/referidos-app/src/negocio/layout/NegocioFooter.jsx#L54).
- **Lo usa** [`NegocioLayoutInner`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L312) (renderiza).

#### [`isActive`](../../../apps/referidos-app/src/negocio/layout/NegocioFooter.jsx#L28) · función · dentro de [`NegocioFooter`](../../../apps/referidos-app/src/negocio/layout/NegocioFooter.jsx#L8)

Comprueba `Active` para decidir si se admite o continúa la operación.

- **Entradas** `path`.
- **Llamadas directas en el cuerpo** [`location.pathname.startsWith`](../../../apps/referidos-app/src/negocio/layout/NegocioFooter.jsx#L30).
- **Lo usa** [`NegocioFooter`](../../../apps/referidos-app/src/negocio/layout/NegocioFooter.jsx#L39) (llama).

### [`apps/referidos-app/src/negocio/layout/NegocioHeader.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L1)

Selecciona título y paneles de cabecera desde el contexto de negocio.

**Superficie que exporta.** [`NegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L44).

**Módulos que lo cargan.** [`NegocioLayout.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L3) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, `lucide-react`, [`../../layouts/header-panels`](../../../apps/referidos-app/src/layouts/header-panels/index.js), [`../../layouts/header-elements`](../../../apps/referidos-app/src/layouts/header-elements/index.js), [`../../search/SearchHeader`](../../../apps/referidos-app/src/search/SearchHeader.jsx), [`./NegocioHeaderContext`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx), [`../services/negocioUI`](../../../apps/referidos-app/src/negocio/services/negocioUI.js).

#### [`QrewLogo`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L16) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{title}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`NegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L178) (renderiza).

#### [`NegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L44) · componente React · exportación por defecto

Monta `SearchHeader`, `TabTitle`, `button`, `LogOut`, `ChevronLeft`, `Link`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{usuario, avatarSrc, onOpenNotifications, onLogout, isElevated}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[supportOpen, setSupportOpen] mediante useState`, `[supportVisible, setSupportVisible] mediante useState`, `[notificationsOpen, setNotificationsOpen] mediante useState`, `[notificationsVisible, setNotificationsVisible] mediante useState`, `scrollDistanceRef mediante useRef`, `lastScrollTopRef mediante useRef`.
- **Interfaz que monta** `SearchHeader`, `TabTitle`, `button`, `LogOut`, `ChevronLeft`, `Link`, `img`, `QrewLogo`, `HelpCircle`, `HeaderPanelContainer`, `Bell`, `NotificationsPanel`.
- **Hooks que llama** `useState`, `useNegocioHeader`, `useRef`, `useEffect`.
- **Usa código de** [`useNegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L91) (llama), [`getAvatarSrc`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L37) (llama), [`getUserShortName`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L20) (llama), [`SearchHeader`](../../../apps/referidos-app/src/search/SearchHeader.jsx#L3) (renderiza), [`TabTitle`](../../../apps/referidos-app/src/layouts/header-elements/TabTitle.jsx#L1) (renderiza), [`HeaderPanelContainer`](../../../apps/referidos-app/src/layouts/header-panels/HeaderPanelContainer.jsx#L3) (renderiza), [`NotificationsPanel`](../../../apps/referidos-app/src/layouts/header-panels/NotificationsPanel.jsx#L1) (renderiza).
- **Llamadas directas en el cuerpo** [`getAvatarSrc`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L61), [`getUserShortName`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L62), [`displayName.0.toUpperCase`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L172).
- **Lo usa** [`NegocioLayoutInner`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L275) (renderiza).

#### [`getScrollTop`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L65) · función · dentro de [`NegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L44)

Obtiene o resuelve `Scroll Top` para entregarlo al consumidor.

- **Entradas** `target`.
- **Condiciones que evalúa** `target y number`.
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L89) (llama), [`handleScroll`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L91) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L72) · callback de infraestructura · dentro de [`NegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L44)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioHeader`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `setTimeout`, `clearTimeout`.
- **Condiciones que evalúa** `supportOpen`, `ausencia de supportVisible`.
- **Llamadas directas en el cuerpo** [`setTimeout`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L75), [`clearTimeout`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L76).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L75) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L72)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setSupportVisible`.
- **Llamadas directas en el cuerpo** [`setSupportVisible`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L75).

#### [`useEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L79) · callback de infraestructura · dentro de [`NegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L44)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioHeader`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `setTimeout`, `clearTimeout`.
- **Condiciones que evalúa** `notificationsOpen`, `ausencia de notificationsVisible`.
- **Llamadas directas en el cuerpo** [`setTimeout`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L82), [`clearTimeout`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L83).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L82) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L79)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setNotificationsVisible`.
- **Llamadas directas en el cuerpo** [`setNotificationsVisible`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L82).

#### [`useEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L86) · callback de infraestructura · dentro de [`NegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L44)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioHeader`.

- **Efectos y APIs** `document.addEventListener`, `document.removeEventListener`.
- **Condiciones que evalúa** `ausencia de supportOpen y ausencia de notificationsOpen`.
- **Llamadas directas en el cuerpo** [`getScrollTop`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L89), [`document.addEventListener`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L102), [`document.removeEventListener`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L104).

#### [`handleScroll`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L90) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L86)

Maneja `Scroll` y coordina las acciones indicadas abajo.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setSupportOpen`, `setNotificationsOpen`.
- **Condiciones que evalúa** `ausencia de Number.isFinite`, `scrollDistanceRef.current`.
- **Llamadas directas en el cuerpo** [`getScrollTop`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L91), [`setSupportOpen`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L97), [`setNotificationsOpen`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L98).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L102) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L108) · callback de infraestructura · dentro de [`NegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L44)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioHeader`.

- **Actualizaciones de estado o acciones** `setSupportOpen`, `setSupportVisible`, `setNotificationsOpen`, `setNotificationsVisible`.
- **Condiciones que evalúa** `mode`.
- **Llamadas directas en el cuerpo** [`setSupportOpen`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L110), [`setSupportVisible`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L111), [`setNotificationsOpen`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L112), [`setNotificationsVisible`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L113).

#### [`button.onClick`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L185) · callback JSX · dentro de [`NegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L44)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setNotificationsOpen`, `setSupportVisible`, `setSupportOpen`.
- **Condiciones que evalúa** `ausencia de supportOpen`.
- **Llamadas directas en el cuerpo** [`setNotificationsOpen`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L186), [`setSupportVisible`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L188), [`setSupportOpen`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L189).

#### [`button.onClick`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L226) · callback JSX · dentro de [`NegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L44)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSupportOpen`, `setNotificationsVisible`, `setNotificationsOpen`.
- **Condiciones que evalúa** `ausencia de notificationsOpen`, `function`.
- **Llamadas directas en el cuerpo** [`setSupportOpen`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L227), [`setNotificationsVisible`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L229), [`setNotificationsOpen`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L230), [`onOpenNotifications`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L235).

### [`apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L1)

Guarda modos y opciones del encabezado y da acceso a las vistas anidadas.

**Superficie que exporta.** [`NegocioHeaderProvider`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L22), [`useNegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L91).

**Módulos que lo cargan.** [`NegocioEscanerBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L12) (importa), [`NegocioGestionarBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L4) (importa), [`NegocioInicio.jsx`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L5) (importa), [`NegocioHeader.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L10) (importa), [`NegocioLayout.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L8) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L47) (importa).

**Dependencias del archivo.** `react`.

#### [`NegocioHeaderContext`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L12) · variable de módulo

Comparte el estado o valor de `Negocio Header Context` mediante contexto de React.

- **Llamadas directas en el cuerpo** [`createContext`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L12).
- **Lo usa** [`NegocioHeaderProvider`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L85) (renderiza), [`useNegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L92) (referencia).

#### [`setHeaderOptions`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L19) · función

Aplica o guarda `Header Options` para que el estado refleje la operación.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`NegocioHeaderProvider`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L22) · componente React · exportado

Monta `NegocioHeaderContext.Provider`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{children}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[mode, setMode] mediante useState`, `[onSearchBack, setOnSearchBack] mediante useState`, `[headerVisible, setHeaderVisible] mediante useState`, `[headerEntering, setHeaderEntering] mediante useState`, `[profileDockOpen, setProfileDockOpen] mediante useState`, `[profileTitle, setProfileTitle] mediante useState`, `prevHeaderVisible mediante useRef`.
- **Interfaz que monta** `NegocioHeaderContext.Provider`.
- **Hooks que llama** `useState`, `useRef`, `useEffect`.
- **Lo usa** [`NegocioLayout`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L327) (renderiza).

#### [`setHeaderOptions`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L31) · callback React · dentro de [`NegocioHeaderProvider`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L22)

Aplica o guarda `Header Options` para que el estado refleje la operación.

- **Entradas** `options = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setMode`, `setOnSearchBack`, `setHeaderVisible`, `setProfileDockOpen`, `setProfileTitle`.
- **Condiciones que evalúa** `boolean`, `string`.
- **Llamadas directas en el cuerpo** [`setMode`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L33), [`setOnSearchBack`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L34), [`setHeaderVisible`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L37), [`setProfileDockOpen`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L39), [`setProfileTitle`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L42).
- **Lo usa** [`value`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L71) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L46) · callback de infraestructura · dentro de [`NegocioHeaderProvider`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L22)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioHeaderProvider`.

- **Actualizaciones de estado o acciones** `setHeaderEntering`, `clearTimeout`.
- **Efectos y APIs** `setTimeout`, `clearTimeout`.
- **Condiciones que evalúa** `ausencia de wasVisible y headerVisible`, `ausencia de headerVisible`.
- **Llamadas directas en el cuerpo** [`setHeaderEntering`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L49), [`setTimeout`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L50), [`clearTimeout`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L54).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L50) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L46)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setHeaderEntering`.
- **Llamadas directas en el cuerpo** [`setHeaderEntering`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L51).

#### [`value`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L64) · cálculo memorizado · dentro de [`NegocioHeaderProvider`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L22)

Función auxiliar de `NegocioHeaderProvider` para `value`.

- **Retorno visible o tipo declarado** `mode`, `onSearchBack`, `headerVisible`, `headerEntering`, `profileDockOpen`, `profileTitle`, `setHeaderOptions`.
- **Hooks que llama** `useMemo`.
- **Lo usa** [`NegocioHeaderProvider`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L85) (pasa a value).

#### [`useNegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L91) · hook React · exportado

Agrupa estado, contexto o efectos de `Negocio Header` para sus consumidores React.

- **Hooks que llama** `useContext`.
- **Lo usa** [`NegocioEscanerBase`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L17) (llama), [`NegocioGestionarBase`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L16) (llama), [`NegocioInicio`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L18) (llama), [`NegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L56) (llama), [`NegocioLayoutInner`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L44) (llama), [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L138) (llama).

### [`apps/referidos-app/src/negocio/layout/NegocioLayout.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L1)

Compone cabecera, navegación inferior, menú y precarga de pestañas de negocio. Coordina scroll y material local del usuario.

**Superficie que exporta.** [`NegocioLayout`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L325).

**Módulos que lo cargan.** [`NegocioEscaner.jsx`](../../../apps/referidos-app/src/pages/negocio/NegocioEscaner.jsx#L2) (importa), [`NegocioGestionar.jsx`](../../../apps/referidos-app/src/pages/negocio/NegocioGestionar.jsx#L1) (importa), [`NegocioInicio.jsx`](../../../apps/referidos-app/src/pages/negocio/NegocioInicio.jsx#L2) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/pages/negocio/NegocioPerfil.jsx#L2) (importa), [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L9) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, [`./NegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx), [`./NegocioFooter`](../../../apps/referidos-app/src/negocio/layout/NegocioFooter.jsx), [`../../components/menus/MenuLateral`](../../../apps/referidos-app/src/components/menus/MenuLateral.jsx), [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../services/negocioUI`](../../../apps/referidos-app/src/negocio/services/negocioUI.js), [`./NegocioHeaderContext`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx), [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js), [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../../services/secureStorageService`](../../../apps/referidos-app/src/services/secureStorageService.js), [`../../cache/CacheOutlet`](../../../apps/referidos-app/src/cache/CacheOutlet.jsx), [`../../cache/cacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js), [`../../cache/cacheKeys`](../../../apps/referidos-app/src/cache/cacheKeys.js), [`../base/NegocioInicioBase`](../../../apps/referidos-app/src/negocio/base/NegocioInicioBase.jsx), [`../base/NegocioEscanerBase`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx), [`../base/NegocioGestionarBase`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx), [`../base/NegocioPerfilBase`](../../../apps/referidos-app/src/negocio/base/NegocioPerfilBase.jsx).

#### [`FALLBACK_HEADER_HEIGHT`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L24) · variable de módulo

Declara `FALLBACK_HEADER_HEIGHT` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`NegocioLayoutInner`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L35) (referencia), [`updateHeaderHeight`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L94) (referencia).

#### [`NegocioLayoutInner`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L26) · componente React

Monta `NegocioHeader`, `CacheOutlet`, `Outlet`, `NegocioFooter`, `MenuLateral`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{children}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `bootstrap mediante useAppStore`, `selector s.bootstrap`, `logout mediante useAppStore`, `selector s.logout`, `setAccessMethods mediante useAppStore`, `selector s.setAccessMethods`, `setUser mediante useAppStore`, `selector s.setUser`, `[menuOpen, setMenuOpen] mediante useState`, `[headerHeight, setHeaderHeight] mediante useState`, `[headerElevated, setHeaderElevated] mediante useState`, `[viewportMetrics, setViewportMetrics] mediante useState` y 11 más.
- **Interfaz que monta** `NegocioHeader`, `CacheOutlet`, `Outlet`, `NegocioFooter`, `MenuLateral`.
- **Hooks que llama** `useAppStore`, `useModal`, `useState`, `useRef`, `useNegocioHeader`, `useLocation`, `useCacheStore`, `useLayoutEffect`, `useEffect`.
- **Condiciones que evalúa** `bootstrap o undefined`, `hideUntilPreloaded`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama), [`useNegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L91) (llama), [`useCacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js#L12) (llama), [`NegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L44) (renderiza), [`getAvatarSrc`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L37) (llama), [`CacheOutlet`](../../../apps/referidos-app/src/cache/CacheOutlet.jsx#L6) (renderiza), [`NegocioFooter`](../../../apps/referidos-app/src/negocio/layout/NegocioFooter.jsx#L8) (renderiza), [`MenuLateral`](../../../apps/referidos-app/src/components/menus/MenuLateral.jsx#L7) (renderiza).
- **Llamadas directas en el cuerpo** [`getAvatarSrc`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L277).
- **Lo usa** [`NegocioLayout`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L328) (renderiza).

#### [`cacheEntries`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L69) · cálculo memorizado · dentro de [`NegocioLayoutInner`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L26)

Prepara contenido JSX usando `NegocioInicioBase`, `NegocioEscanerBase`, `NegocioGestionarBase`, `NegocioPerfilBase`.

- **Retorno visible o tipo declarado** `lista`.
- **Interfaz que monta** `NegocioInicioBase`, `NegocioEscanerBase`, `NegocioGestionarBase`, `NegocioPerfilBase`.
- **Hooks que llama** `useMemo`.
- **Usa código de** [`CACHE_KEYS`](../../../apps/referidos-app/src/cache/cacheKeys.js#L1) (accede al módulo), [`NegocioInicioBase`](../../../apps/referidos-app/src/negocio/base/NegocioInicioBase.jsx#L4) (renderiza), [`NegocioEscanerBase`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L16) (renderiza), [`NegocioGestionarBase`](../../../apps/referidos-app/src/negocio/base/NegocioGestionarBase.jsx#L14) (renderiza), [`NegocioPerfilBase`](../../../apps/referidos-app/src/negocio/base/NegocioPerfilBase.jsx#L4) (renderiza).
- **Lo usa** [`useLayoutEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L85) (referencia), [`NegocioLayoutInner`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L86) (referencia).

#### [`useLayoutEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L82) · callback de infraestructura · dentro de [`NegocioLayoutInner`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L26)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioLayoutInner`.

- **Condiciones que evalúa** `ausencia de useCache`, `isPreloaded`.
- **Llamadas directas en el cuerpo** [`preloadScope`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L85).

#### [`updateHeaderHeight`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L88) · callback React · dentro de [`NegocioLayoutInner`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L26)

Aplica o guarda `Header Height` para que el estado refleje la operación.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setHeaderHeight`.
- **Condiciones que evalúa** `ausencia de headerVisible`, `ausencia de headerRef.current`.
- **Llamadas directas en el cuerpo** [`setHeaderHeight`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L90).
- **Lo usa** [`useLayoutEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L101) (llama), [`NegocioLayoutInner`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L120) (referencia).

#### [`useLayoutEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L100) · callback de infraestructura · dentro de [`NegocioLayoutInner`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L26)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioLayoutInner`.

- **Efectos y APIs** `window.addEventListener`, `window.removeEventListener`.
- **Condiciones que evalúa** `headerVisible y undefined y headerRef.current`, `headerVisible`, `observer`.
- **Llamadas directas en el cuerpo** [`updateHeaderHeight`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L101), [`observer.observe`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L109), [`window.addEventListener`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L111), [`observer.disconnect`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L115), [`window.removeEventListener`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L117).

#### [`useEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L122) · callback de infraestructura · dentro de [`NegocioLayoutInner`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L26)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioLayoutInner`.

- **Efectos y APIs** `window.visualViewport.addEventListener`, `window.addEventListener`, `window.visualViewport.removeEventListener`, `window.removeEventListener`.
- **Llamadas directas en el cuerpo** [`updateViewport`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L138), [`window.visualViewport.addEventListener`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L139), [`window.addEventListener`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L141), [`window.visualViewport.removeEventListener`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L143), [`window.removeEventListener`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L145).

#### [`updateViewport`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L123) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L122)

Aplica o guarda `Viewport` para que el estado refleje la operación.

- **Actualizaciones de estado o acciones** `setViewportMetrics`, `setSuspendViewportAfterNext`, `setSuspendViewportResize`.
- **Condiciones que evalúa** `suspendViewportResize`, `suspendViewportAfterNext`.
- **Llamadas directas en el cuerpo** [`setViewportMetrics`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L128), [`setSuspendViewportAfterNext`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L134), [`setSuspendViewportResize`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L135).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L138) (llama).

#### [`updateHeaderElevation`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L154) · callback React · dentro de [`NegocioLayoutInner`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L26)

Aplica o guarda `Header Elevation` para que el estado refleje la operación.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setHeaderElevated`.
- **Llamadas directas en el cuerpo** [`setHeaderElevated`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L159).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L163) (llama), [`NegocioLayoutInner`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L179) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L162) · callback de infraestructura · dentro de [`NegocioLayoutInner`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L26)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioLayoutInner`.

- **Efectos y APIs** `current.addEventListener`, `window.addEventListener`, `current.removeEventListener`, `window.removeEventListener`.
- **Condiciones que evalúa** `current`.
- **Llamadas directas en el cuerpo** [`updateHeaderElevation`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L163), [`current.addEventListener`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L166), [`window.addEventListener`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L170), [`current.removeEventListener`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L175), [`window.removeEventListener`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L177).

#### [`useEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L181) · callback de infraestructura · dentro de [`NegocioLayoutInner`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L26)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioLayoutInner`.

- **Efectos y APIs** `current.addEventListener`, `current.removeEventListener`.
- **Condiciones que evalúa** `ausencia de current o ausencia de activeCacheKey`.
- **Llamadas directas en el cuerpo** [`current.addEventListener`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L187), [`current.removeEventListener`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L189).

#### [`handleScroll`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L184) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L181)

Maneja `Scroll` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setScrollPosition`.
- **Llamadas directas en el cuerpo** [`setScrollPosition`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L185).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L187) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L193) · callback de infraestructura · dentro de [`NegocioLayoutInner`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L26)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioLayoutInner`.

- **Condiciones que evalúa** `ausencia de current o ausencia de activeCacheKey`.
- **Llamadas directas en el cuerpo** [`getScrollPosition`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L196), [`document.activeElement.blur`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L198).

#### [`useEffect · callback`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L201) · callback de infraestructura · dentro de [`NegocioLayoutInner`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L26)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Actualizaciones de estado o acciones** `setAccessMethods`, `setUser`, `setItem`.
- **Efectos y APIs** `window.localStorage.getItem`, `window.sessionStorage.getItem`, `window.sessionStorage.setItem`, `openModal`.
- **Condiciones que evalúa** `bootstrap o ausencia de usuario`, `undefined`, `ausencia de active o storageMode.mode`, `ausencia de active o ausencia de token`, `ausencia de userId`, `ausencia de active`, `usuario.has_pin`, `usuario.has_biometrics` y 5 más.
- **Contrato de datos** Auth `getSession` en [`NegocioLayout.jsx:208`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L208), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`NegocioLayout.jsx:224`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L224), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`NegocioLayout.jsx:224`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L224).
- **Usa código de** [`getSecureStorageMode`](../../../apps/referidos-app/src/services/secureStorageService.js#L56) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo), [`loadPinHash`](../../../apps/referidos-app/src/services/secureStorageService.js#L207) (llama), [`loadBiometricToken`](../../../apps/referidos-app/src/services/secureStorageService.js#L187) (llama).
- **Llamadas directas en el cuerpo** [`getSecureStorageMode`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L206), [`supabase.auth.getSession`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L208), [`loadPinHash`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L214), [`loadBiometricToken`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L215), [`setAccessMethods`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L219), [`eq`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L224), [`update`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L224), [`supabase.from`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L224), [`setUser`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L226), [`window.localStorage.getItem`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L229), [`window.sessionStorage.getItem`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L232), [`window.sessionStorage.setItem`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L234) y 1 más.

#### [`NegocioHeader.onOpenMenu`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L278) · callback JSX · dentro de [`NegocioLayoutInner`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L26)

Responde al evento de interfaz `NegocioHeader.onOpenMenu`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setMenuOpen`.
- **Llamadas directas en el cuerpo** [`setMenuOpen`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L278).

#### [`MenuLateral.onClose`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L316) · callback JSX · dentro de [`NegocioLayoutInner`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L26)

Responde al evento de interfaz `MenuLateral.onClose`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setMenuOpen`.
- **Llamadas directas en el cuerpo** [`setMenuOpen`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L316).

#### [`NegocioLayout`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L325) · componente React · exportación por defecto

Monta `NegocioHeaderProvider`, `NegocioLayoutInner`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{children}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `NegocioHeaderProvider`, `NegocioLayoutInner`.
- **Usa código de** [`NegocioHeaderProvider`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L22) (renderiza).
- **Lo usa** [`NegocioEscaner`](../../../apps/referidos-app/src/pages/negocio/NegocioEscaner.jsx#L7) (renderiza), [`NegocioGestionar`](../../../apps/referidos-app/src/pages/negocio/NegocioGestionar.jsx#L6) (renderiza), [`NegocioInicio`](../../../apps/referidos-app/src/pages/negocio/NegocioInicio.jsx#L7) (renderiza), [`NegocioPerfil`](../../../apps/referidos-app/src/pages/negocio/NegocioPerfil.jsx#L7) (renderiza), [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L99) (renderiza).

### [`apps/referidos-app/src/negocio/services/negocioUI.js`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L1)

Adapta información del usuario y su negocio a las piezas comunes de su interfaz.

**Superficie que exporta.** [`formatCompactNumber`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L12), [`getUserShortName`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L20), [`getNegocioRoleLabel`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L30), [`getAvatarSrc`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L37), [`getNegocioPlanMeta`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L45), [`getNegocioNombre`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L57), [`getNegocioSector`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L66), [`getNegocioDireccion`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L70), [`getNegocioImagen`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L82), [`getNegocioReferidos`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L86).

**Módulos que lo cargan.** [`InicioBeneficios.jsx`](../../../apps/referidos-app/src/negocio/inicio/InicioBeneficios.jsx#L10) (importa), [`InicioHero.jsx`](../../../apps/referidos-app/src/negocio/inicio/InicioHero.jsx#L13) (importa), [`NegocioHeader.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L11) (importa), [`NegocioLayout.jsx`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L7) (importa).

#### [`AVATAR_FEMALE`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L1) · variable de módulo

Declara `AVATAR_FEMALE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`getAvatarSrc`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L40) (referencia).

#### [`AVATAR_MALE`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L2) · variable de módulo

Declara `AVATAR_MALE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`getAvatarSrc`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L41) (referencia).

#### [`AVATAR_NEUTRAL`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L3) · variable de módulo

Declara `AVATAR_NEUTRAL` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`getAvatarSrc`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L42) (referencia).

#### [`PLAN_META`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L6) · variable de módulo

Agrupa la configuración o catálogo de `PLAN META` para que sus consumidores lean claves comunes.

- **Campos o contexto** `free`, `plus`, `pro`.
- **Lo usa** [`getNegocioPlanMeta`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L54) (accede al módulo).

#### [`formatCompactNumber`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L12) · función · exportado

Formatea `Compact Number` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de Number.isFinite`, `number`.
- **Llamadas directas en el cuerpo** [`toFixed`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L16).

#### [`getUserShortName`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L20) · función · exportado

Obtiene o resuelve `User Short Name` para entregarlo al consumidor.

- **Entradas** `usuario`.
- **Llamadas directas en el cuerpo** [`base.split`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L27).
- **Lo usa** [`NegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L62) (llama).

#### [`getNegocioRoleLabel`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L30) · función · exportado

Obtiene o resuelve `Negocio Role Label` para entregarlo al consumidor.

- **Entradas** `usuario`.
- **Condiciones que evalúa** `role`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L31), [`usuario.role.toString`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L31).
- **Lo usa** [`InicioHero`](../../../apps/referidos-app/src/negocio/inicio/InicioHero.jsx#L31) (llama).

#### [`getAvatarSrc`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L37) · función · exportado

Obtiene o resuelve `Avatar Src` para entregarlo al consumidor.

- **Entradas** `usuario`, `explicit`.
- **Condiciones que evalúa** `explicit`, `usuario.avatarUrl o usuario.avatar`, `usuario.genero`.
- **Lo usa** [`NegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeader.jsx#L61) (llama), [`NegocioLayoutInner`](../../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx#L277) (llama).

#### [`getNegocioPlanMeta`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L45) · función · exportado

Obtiene o resuelve `Negocio Plan Meta` para entregarlo al consumidor.

- **Entradas** `{negocio, usuario, plan} = valor por defecto`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L53), [`raw.toString`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L53).
- **Lo usa** [`InicioBeneficios`](../../../apps/referidos-app/src/negocio/inicio/InicioBeneficios.jsx#L34) (llama), [`InicioHero`](../../../apps/referidos-app/src/negocio/inicio/InicioHero.jsx#L26) (llama).

#### [`getNegocioNombre`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L57) · función · exportado

Obtiene o resuelve `Negocio Nombre` para entregarlo al consumidor.

- **Entradas** `{negocio, usuario} = valor por defecto`.
- **Lo usa** [`InicioHero`](../../../apps/referidos-app/src/negocio/inicio/InicioHero.jsx#L27) (llama).

#### [`getNegocioSector`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L66) · función · exportado

Obtiene o resuelve `Negocio Sector` para entregarlo al consumidor.

- **Entradas** `{negocio, usuario} = valor por defecto`.
- **Lo usa** [`InicioHero`](../../../apps/referidos-app/src/negocio/inicio/InicioHero.jsx#L28) (llama).

#### [`getNegocioDireccion`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L70) · función · exportado

Obtiene o resuelve `Negocio Direccion` para entregarlo al consumidor.

- **Entradas** `{negocio, usuario} = valor por defecto`.
- **Condiciones que evalúa** `ausencia de raw`, `parts.length`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L72), [`filter`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L74), [`map`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L74), [`raw.split`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L74), [`item.trim`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L76).
- **Lo usa** [`InicioHero`](../../../apps/referidos-app/src/negocio/inicio/InicioHero.jsx#L29) (llama).

#### [`getNegocioImagen`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L82) · función · exportado

Obtiene o resuelve `Negocio Imagen` para entregarlo al consumidor.

- **Entradas** `{negocio, usuario} = valor por defecto`.
- **Lo usa** [`InicioHero`](../../../apps/referidos-app/src/negocio/inicio/InicioHero.jsx#L30) (llama).

#### [`getNegocioReferidos`](../../../apps/referidos-app/src/negocio/services/negocioUI.js#L86) · función · exportado

Obtiene o resuelve `Negocio Referidos` para entregarlo al consumidor.

- **Entradas** `{negocio, usuario} = valor por defecto`.

### [`apps/referidos-app/src/negocio/views/NegocioEscanerView.jsx`](../../../apps/referidos-app/src/negocio/views/NegocioEscanerView.jsx#L1)

Punto de enrutado que activa `NEGOCIO_ESCANEAR` en el scope `negocio` mediante `CacheView`. El contenido real lo monta el layout, con `NEGOCIO_INICIO` como destino de arranque si hace falta precargar el caché.

**Superficie que exporta.** [`NegocioEscanerView`](../../../apps/referidos-app/src/negocio/views/NegocioEscanerView.jsx#L5).

**Módulos que lo cargan.** [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L15) (importa).

**Dependencias del archivo.** `react`, [`../../cache/CacheView`](../../../apps/referidos-app/src/cache/CacheView.jsx), [`../../cache/cacheKeys`](../../../apps/referidos-app/src/cache/cacheKeys.js).

#### [`NegocioEscanerView`](../../../apps/referidos-app/src/negocio/views/NegocioEscanerView.jsx#L5) · componente React · exportación por defecto

Monta `CacheView`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `CacheView`.
- **Usa código de** [`CacheView`](../../../apps/referidos-app/src/cache/CacheView.jsx#L5) (renderiza), [`CACHE_KEYS`](../../../apps/referidos-app/src/cache/cacheKeys.js#L1) (accede al módulo).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L106) (renderiza).

### [`apps/referidos-app/src/negocio/views/NegocioGestionarView.jsx`](../../../apps/referidos-app/src/negocio/views/NegocioGestionarView.jsx#L1)

Punto de enrutado que activa `NEGOCIO_GESTIONAR` en el scope `negocio` mediante `CacheView`. El contenido real lo monta el layout, con `NEGOCIO_INICIO` como destino de arranque si hace falta precargar el caché.

**Superficie que exporta.** [`NegocioGestionarView`](../../../apps/referidos-app/src/negocio/views/NegocioGestionarView.jsx#L5).

**Módulos que lo cargan.** [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L16) (importa).

**Dependencias del archivo.** `react`, [`../../cache/CacheView`](../../../apps/referidos-app/src/cache/CacheView.jsx), [`../../cache/cacheKeys`](../../../apps/referidos-app/src/cache/cacheKeys.js).

#### [`NegocioGestionarView`](../../../apps/referidos-app/src/negocio/views/NegocioGestionarView.jsx#L5) · componente React · exportación por defecto

Monta `CacheView`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `CacheView`.
- **Usa código de** [`CacheView`](../../../apps/referidos-app/src/cache/CacheView.jsx#L5) (renderiza), [`CACHE_KEYS`](../../../apps/referidos-app/src/cache/cacheKeys.js#L1) (accede al módulo).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L108) (renderiza).

### [`apps/referidos-app/src/negocio/views/NegocioInicioView.jsx`](../../../apps/referidos-app/src/negocio/views/NegocioInicioView.jsx#L1)

Punto de enrutado que activa `NEGOCIO_INICIO` en el scope `negocio` mediante `CacheView`. El contenido real lo monta el layout.

**Superficie que exporta.** [`NegocioInicioView`](../../../apps/referidos-app/src/negocio/views/NegocioInicioView.jsx#L5).

**Módulos que lo cargan.** [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L14) (importa).

**Dependencias del archivo.** `react`, [`../../cache/CacheView`](../../../apps/referidos-app/src/cache/CacheView.jsx), [`../../cache/cacheKeys`](../../../apps/referidos-app/src/cache/cacheKeys.js).

#### [`NegocioInicioView`](../../../apps/referidos-app/src/negocio/views/NegocioInicioView.jsx#L5) · componente React · exportación por defecto

Monta `CacheView`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `CacheView`.
- **Usa código de** [`CacheView`](../../../apps/referidos-app/src/cache/CacheView.jsx#L5) (renderiza), [`CACHE_KEYS`](../../../apps/referidos-app/src/cache/cacheKeys.js#L1) (accede al módulo).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L105) (renderiza).

### [`apps/referidos-app/src/negocio/views/NegocioPerfilView.jsx`](../../../apps/referidos-app/src/negocio/views/NegocioPerfilView.jsx#L1)

Punto de enrutado que activa `NEGOCIO_PERFIL` en el scope `negocio` mediante `CacheView`. El contenido real lo monta el layout, con `NEGOCIO_INICIO` como destino de arranque si hace falta precargar el caché.

**Superficie que exporta.** [`NegocioPerfilView`](../../../apps/referidos-app/src/negocio/views/NegocioPerfilView.jsx#L5).

**Módulos que lo cargan.** [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L17) (importa).

**Dependencias del archivo.** `react`, [`../../cache/CacheView`](../../../apps/referidos-app/src/cache/CacheView.jsx), [`../../cache/cacheKeys`](../../../apps/referidos-app/src/cache/cacheKeys.js).

#### [`NegocioPerfilView`](../../../apps/referidos-app/src/negocio/views/NegocioPerfilView.jsx#L5) · componente React · exportación por defecto

Monta `CacheView`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `CacheView`.
- **Usa código de** [`CacheView`](../../../apps/referidos-app/src/cache/CacheView.jsx#L5) (renderiza), [`CACHE_KEYS`](../../../apps/referidos-app/src/cache/cacheKeys.js#L1) (accede al módulo).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L107) (renderiza).
