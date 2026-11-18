# PWA principal · Cliente · 1 de 2

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L1)
- [`apps/referidos-app/src/cliente/base/ClienteHistorialBase.jsx`](../../../apps/referidos-app/src/cliente/base/ClienteHistorialBase.jsx#L1)
- [`apps/referidos-app/src/cliente/base/ClienteInicioBase.jsx`](../../../apps/referidos-app/src/cliente/base/ClienteInicioBase.jsx#L1)
- [`apps/referidos-app/src/cliente/base/ClientePerfilBase.jsx`](../../../apps/referidos-app/src/cliente/base/ClientePerfilBase.jsx#L1)
- [`apps/referidos-app/src/cliente/historial/HistorialEmpty.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialEmpty.jsx#L1)
- [`apps/referidos-app/src/cliente/historial/HistorialItem.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L1)
- [`apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L1)
- [`apps/referidos-app/src/cliente/historial/HistorialList.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialList.jsx#L1)
- [`apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L1)
- [`apps/referidos-app/src/cliente/historial/HistorialSkeleton.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialSkeleton.jsx#L1)
- [`apps/referidos-app/src/cliente/historial/HistorialView.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L1)
- [`apps/referidos-app/src/cliente/hooks/useClienteUI.js`](../../../apps/referidos-app/src/cliente/hooks/useClienteUI.js#L1)
- [`apps/referidos-app/src/cliente/hooks/useSearchDock.js`](../../../apps/referidos-app/src/cliente/hooks/useSearchDock.js#L1)
- [`apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L1)
- [`apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx#L1)
- [`apps/referidos-app/src/cliente/inicio/InicioBeneficios.jsx`](../../../apps/referidos-app/src/cliente/inicio/InicioBeneficios.jsx#L1)
- [`apps/referidos-app/src/cliente/inicio/InicioEmptyState.jsx`](../../../apps/referidos-app/src/cliente/inicio/InicioEmptyState.jsx#L1)
- [`apps/referidos-app/src/cliente/inicio/InicioHero.jsx`](../../../apps/referidos-app/src/cliente/inicio/InicioHero.jsx#L1)
- [`apps/referidos-app/src/cliente/inicio/InicioPromos.jsx`](../../../apps/referidos-app/src/cliente/inicio/InicioPromos.jsx#L1)
- [`apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L1)
- [`apps/referidos-app/src/cliente/layout/ClienteFooter.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteFooter.jsx#L1)
- [`apps/referidos-app/src/cliente/layout/ClienteHeader.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L1)
- [`apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L1)

Monta ScannerView con rol cliente y coordina estado activo, cabecera y limpiado al abandonar la pestaña.

**Superficie que exporta.** [`ClienteEscanerBase`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L16).

**Módulos que lo cargan.** [`ClienteLayout.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L20) (importa), [`ClienteEscaner.jsx`](../../../apps/referidos-app/src/pages/cliente/ClienteEscaner.jsx#L3) (importa).

**Dependencias del archivo.** `react`, [`../../scanner/ScannerView`](../../../apps/referidos-app/src/scanner/ScannerView.jsx), [`../../scanner/blocks/ScannerCameraBlock`](../../../apps/referidos-app/src/scanner/blocks/ScannerCameraBlock.jsx), [`../../scanner/blocks/ScannerHeader`](../../../apps/referidos-app/src/scanner/blocks/ScannerHeader.jsx), [`../../scanner/blocks/ScannerManualEntry`](../../../apps/referidos-app/src/scanner/blocks/ScannerManualEntry.jsx), [`../../scanner/blocks/ScannerPermissionCard`](../../../apps/referidos-app/src/scanner/blocks/ScannerPermissionCard.jsx), [`../../scanner/blocks/ScannerPermissionIntro`](../../../apps/referidos-app/src/scanner/blocks/ScannerPermissionIntro.jsx), [`../../scanner/blocks/ScannerProcessingHint`](../../../apps/referidos-app/src/scanner/blocks/ScannerProcessingHint.jsx), [`../../scanner/blocks/ScannerResultCard`](../../../apps/referidos-app/src/scanner/blocks/ScannerResultCard.jsx), [`../../scanner/constants/scannerCopy`](../../../apps/referidos-app/src/scanner/constants/scannerCopy.ts), [`../../scanner/hooks/useScannerState`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts), [`../layout/ClienteHeaderContext`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx), [`../../cache/cacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js), [`../../cache/cacheKeys`](../../../apps/referidos-app/src/cache/cacheKeys.js).

#### [`ClienteEscanerBase`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L16) · componente React · exportación por defecto

Monta `ScannerView`, `ScannerHeader`, `ScannerProcessingHint`, `ScannerCameraBlock`, `ScannerPermissionIntro`, `ScannerPermissionCard`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `ScannerView`, `ScannerHeader`, `ScannerProcessingHint`, `ScannerCameraBlock`, `ScannerPermissionIntro`, `ScannerPermissionCard`, `ScannerManualEntry`, `ScannerResultCard`.
- **Hooks que llama** `useClienteHeader`, `useCacheStore`, `useScannerState`, `useLayoutEffect`.
- **Usa código de** [`useClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L91) (llama), [`useCacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js#L12) (llama), [`CACHE_KEYS`](../../../apps/referidos-app/src/cache/cacheKeys.js#L1) (accede al módulo), [`useScannerState`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L27) (llama), [`scannerCopy`](../../../apps/referidos-app/src/scanner/constants/scannerCopy.ts#L3) (accede al módulo), [`ScannerView`](../../../apps/referidos-app/src/scanner/ScannerView.jsx#L3) (renderiza), [`ScannerHeader`](../../../apps/referidos-app/src/scanner/blocks/ScannerHeader.jsx#L3) (renderiza), [`ScannerProcessingHint`](../../../apps/referidos-app/src/scanner/blocks/ScannerProcessingHint.jsx#L3) (renderiza), [`ScannerCameraBlock`](../../../apps/referidos-app/src/scanner/blocks/ScannerCameraBlock.jsx#L4) (renderiza), [`ScannerPermissionIntro`](../../../apps/referidos-app/src/scanner/blocks/ScannerPermissionIntro.jsx#L4) (renderiza) y 3 más.
- **Lo usa** [`cacheEntries`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L70) (renderiza), [`ClienteEscaner`](../../../apps/referidos-app/src/pages/cliente/ClienteEscaner.jsx#L8) (renderiza).

#### [`useLayoutEffect · callback`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L45) · callback de infraestructura · dentro de [`ClienteEscanerBase`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L16)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClienteEscanerBase`.

- **Actualizaciones de estado o acciones** `setHeaderOptions`.
- **Condiciones que evalúa** `ausencia de isActive`.
- **Llamadas directas en el cuerpo** [`setHeaderOptions`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L47).

#### [`ScannerCameraBlock.onFallback`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L89) · callback JSX · dentro de [`ClienteEscanerBase`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L16)

Responde al evento de interfaz `ScannerCameraBlock.onFallback`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setCamGranted`.
- **Llamadas directas en el cuerpo** [`setCamGranted`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L89).

#### [`ScannerManualEntry.onSubmit`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L118) · callback JSX · dentro de [`ClienteEscanerBase`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L16)

Responde al evento de interfaz `ScannerManualEntry.onSubmit`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleCode`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L118).

### [`apps/referidos-app/src/cliente/base/ClienteHistorialBase.jsx`](../../../apps/referidos-app/src/cliente/base/ClienteHistorialBase.jsx#L1)

Entrega HistorialView al caché del layout para preservar el estado del listado de QR.

**Superficie que exporta.** [`ClienteHistorialBase`](../../../apps/referidos-app/src/cliente/base/ClienteHistorialBase.jsx#L4).

**Módulos que lo cargan.** [`ClienteLayout.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L21) (importa), [`ClienteHistorial.jsx`](../../../apps/referidos-app/src/pages/cliente/ClienteHistorial.jsx#L3) (importa).

**Dependencias del archivo.** `react`, [`../historial/HistorialView`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx).

#### [`ClienteHistorialBase`](../../../apps/referidos-app/src/cliente/base/ClienteHistorialBase.jsx#L4) · componente React · exportación por defecto

Monta `HistorialView`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `HistorialView`.
- **Usa código de** [`HistorialView`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L48) (renderiza).
- **Lo usa** [`cacheEntries`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L71) (renderiza), [`ClienteHistorial`](../../../apps/referidos-app/src/pages/cliente/ClienteHistorial.jsx#L8) (renderiza).

### [`apps/referidos-app/src/cliente/base/ClienteInicioBase.jsx`](../../../apps/referidos-app/src/cliente/base/ClienteInicioBase.jsx#L1)

Entrega la implementación de inicio desde cliente/inicio al caché del layout.

**Superficie que exporta.** [`ClienteInicioBase`](../../../apps/referidos-app/src/cliente/base/ClienteInicioBase.jsx#L4).

**Módulos que lo cargan.** [`ClienteLayout.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L19) (importa), [`ClienteInicio.jsx`](../../../apps/referidos-app/src/pages/cliente/ClienteInicio.jsx#L3) (importa).

**Dependencias del archivo.** `react`, [`../inicio/ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx).

#### [`ClienteInicioBase`](../../../apps/referidos-app/src/cliente/base/ClienteInicioBase.jsx#L4) · componente React · exportación por defecto

Monta `ClienteInicioView`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `ClienteInicioView`.
- **Usa código de** [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L28) (renderiza).
- **Lo usa** [`cacheEntries`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L69) (renderiza), [`ClienteInicio`](../../../apps/referidos-app/src/pages/cliente/ClienteInicio.jsx#L8) (renderiza).

### [`apps/referidos-app/src/cliente/base/ClientePerfilBase.jsx`](../../../apps/referidos-app/src/cliente/base/ClientePerfilBase.jsx#L1)

Monta el perfil de cliente del directorio profile en la pestaña conservada.

**Superficie que exporta.** [`ClientePerfilBase`](../../../apps/referidos-app/src/cliente/base/ClientePerfilBase.jsx#L4).

**Módulos que lo cargan.** [`ClienteLayout.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L22) (importa), [`ClientePerfil.jsx`](../../../apps/referidos-app/src/pages/cliente/ClientePerfil.jsx#L3) (importa).

**Dependencias del archivo.** `react`, [`../../profile/cliente/ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx).

#### [`ClientePerfilBase`](../../../apps/referidos-app/src/cliente/base/ClientePerfilBase.jsx#L4) · componente React · exportación por defecto

Monta `ClientePerfilView`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `ClientePerfilView`.
- **Usa código de** [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126) (renderiza).
- **Lo usa** [`cacheEntries`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L72) (renderiza), [`ClientePerfil`](../../../apps/referidos-app/src/pages/cliente/ClientePerfil.jsx#L8) (renderiza).

### [`apps/referidos-app/src/cliente/historial/HistorialEmpty.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialEmpty.jsx#L1)

Explica por qué la pestaña no tiene actividad de QR y permite distinguir vacío de carga.

**Superficie que exporta.** [`HistorialEmpty`](../../../apps/referidos-app/src/cliente/historial/HistorialEmpty.jsx#L10).

**Módulos que lo cargan.** [`HistorialView.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L11) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`EMPTY_COPY`](../../../apps/referidos-app/src/cliente/historial/HistorialEmpty.jsx#L4) · variable de módulo

Agrupa la configuración o catálogo de `EMPTY COPY` para que sus consumidores lean claves comunes.

- **Campos o contexto** `activos`, `canjeados`, `expirados`.
- **Lo usa** [`HistorialEmpty`](../../../apps/referidos-app/src/cliente/historial/HistorialEmpty.jsx#L38) (accede al módulo).

#### [`HistorialEmpty`](../../../apps/referidos-app/src/cliente/historial/HistorialEmpty.jsx#L10) · componente React · exportación por defecto

Monta `QrCode`, `Check`, `X`, `BadgeCheck`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{variant}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `QrCode`, `Check`, `X`, `BadgeCheck`.
- **Lo usa** [`HistorialView`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L217) (renderiza).

### [`apps/referidos-app/src/cliente/historial/HistorialItem.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L1)

Representa un elemento histórico en el listado con su estado y datos relevantes.

**Superficie que exporta.** [`HistorialItem`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L227).

**Módulos que lo cargan.** [`HistorialList.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialList.jsx#L3) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, `lucide-react`, [`../../utils/sanitize`](../../../apps/referidos-app/src/utils/sanitize.js).

#### [`VALID_WINDOW_MS`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L6) · variable de módulo

Declara `VALID_WINDOW_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`PacmanTimer`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L167) (referencia), [`HistorialItem`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L250) (referencia).

#### [`createSeededRng`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L8) · función

Construye `Seeded Rng` a partir de los datos del flujo.

- **Entradas** `seed`.
- **Lo usa** [`createQrModules`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L21) (llama).

#### [`createQrModules`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L18) · función

Construye `Qr Modules` a partir de los datos del flujo.

- **Entradas** `seed = valor por defecto`.
- **Efectos y APIs** `modules.push`.
- **Condiciones que evalúa** `x o y o x o y`, `isFinder`, `isTiming`, `0.58`.
- **Llamadas directas en el cuerpo** [`createSeededRng`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L21), [`isFinder`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L31), [`isTiming`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L32), [`modules.push`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L33), [`rng`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L36).
- **Lo usa** [`QR_MODULES`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L43) (llama).

#### [`isFinder`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L22) · función · dentro de [`createQrModules`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L18)

Comprueba `Finder` para decidir si se admite o continúa la operación.

- **Entradas** `x`, `y`.
- **Lo usa** [`createQrModules`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L31) (llama).

#### [`isTiming`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L26) · función · dentro de [`createQrModules`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L18)

Comprueba `Timing` para decidir si se admite o continúa la operación.

- **Entradas** `x`, `y`.
- **Lo usa** [`createQrModules`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L32) (llama).

#### [`QR_MODULES`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L43) · variable de módulo

Declara `QR_MODULES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`createQrModules`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L43).
- **Lo usa** [`QrGlyph`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L64) (accede al módulo).

#### [`QrGlyph`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L45) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className, style, holeFill}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`QR_MODULES.map`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L64).
- **Lo usa** [`QrBadge`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L85) (renderiza).

#### [`QrBadge`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L70) · componente React

Monta `QrGlyph`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{progress}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `QrGlyph`.
- **Lo usa** [`HistorialItem`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L333) (renderiza).

#### [`getPreviewPoints`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L157) · función

Obtiene o resuelve `Preview Points` para entregarlo al consumidor.

- **Entradas** `id`.
- **Condiciones que evalúa** `ausencia de id`.
- **Llamadas directas en el cuerpo** [`id.charCodeAt`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L161).
- **Lo usa** [`HistorialItem`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L256) (llama).

#### [`PacmanTimer`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L166) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{timeLeftMs}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`HistorialItem`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L290) (renderiza).

#### [`StatusBadge`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L195) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{variant}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Condiciones que evalúa** `ausencia de styles`.
- **Lo usa** [`HistorialItem`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L337) (renderiza).

#### [`HistorialItem`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L227) · componente React · exportación por defecto

Monta `PacmanTimer`, `MapPin`, `QrBadge`, `StatusBadge`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{item, variant, now}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `localNameRef mediante useRef`, `[isLocalNameWrapped, setIsLocalNameWrapped] mediante useState`.
- **Interfaz que monta** `PacmanTimer`, `MapPin`, `QrBadge`, `StatusBadge`.
- **Hooks que llama** `useNavigate`, `useRef`, `useState`, `useEffect`.
- **Usa código de** [`sanitizeText`](../../../apps/referidos-app/src/utils/sanitize.js#L2) (llama).
- **Llamadas directas en el cuerpo** [`sanitizeText`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L234), [`getTime`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L246), [`getPreviewPoints`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L256).
- **Lo usa** [`HistorialList`](../../../apps/referidos-app/src/cliente/historial/HistorialList.jsx#L38) (renderiza).

#### [`goDetalle`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L241) · función · dentro de [`HistorialItem`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L227)

Función auxiliar de `HistorialItem` para `go Detalle`.

- **Efectos y APIs** `navigate`.
- **Condiciones que evalúa** `promo.id`.
- **Llamadas directas en el cuerpo** [`navigate`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L242).
- **Lo usa** [`HistorialItem`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L288) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L262) · callback de infraestructura · dentro de [`HistorialItem`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L227)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `HistorialItem`.

- **Efectos y APIs** `window.addEventListener`, `window.removeEventListener`.
- **Condiciones que evalúa** `ausencia de el o undefined`.
- **Llamadas directas en el cuerpo** [`measure`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L278), [`window.addEventListener`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L279), [`window.removeEventListener`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L280).

#### [`measure`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L266) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L262)

Coordina cambios de estado durante `measure`.

- **Actualizaciones de estado o acciones** `setIsLocalNameWrapped`.
- **Llamadas directas en el cuerpo** [`window.getComputedStyle`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L267), [`parseFloat`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L268), [`setIsLocalNameWrapped`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L275).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L278) (llama).

### [`apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L1)

Presenta el estado específico de un QR activo mientras sigue disponible.

**Superficie que exporta.** [`HistorialItemActivo`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L196).

**Módulos que lo cargan.** [`HistorialList.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialList.jsx#L4) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, `lucide-react`, [`../../utils/sanitize`](../../../apps/referidos-app/src/utils/sanitize.js).

#### [`VALID_WINDOW_MS`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L7) · variable de módulo

Declara `VALID_WINDOW_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`PacmanTimer`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L168) (referencia), [`HistorialItemActivo`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L223) (referencia).

#### [`createSeededRng`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L9) · función

Construye `Seeded Rng` a partir de los datos del flujo.

- **Entradas** `seed`.
- **Lo usa** [`createQrModules`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L22) (llama).

#### [`createQrModules`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L19) · función

Construye `Qr Modules` a partir de los datos del flujo.

- **Entradas** `seed = valor por defecto`.
- **Efectos y APIs** `modules.push`.
- **Condiciones que evalúa** `x o y o x o y`, `isFinder`, `isTiming`, `0.58`.
- **Llamadas directas en el cuerpo** [`createSeededRng`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L22), [`isFinder`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L32), [`isTiming`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L33), [`modules.push`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L34), [`rng`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L37).
- **Lo usa** [`QR_MODULES`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L44) (llama).

#### [`isFinder`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L23) · función · dentro de [`createQrModules`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L19)

Comprueba `Finder` para decidir si se admite o continúa la operación.

- **Entradas** `x`, `y`.
- **Lo usa** [`createQrModules`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L32) (llama).

#### [`isTiming`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L27) · función · dentro de [`createQrModules`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L19)

Comprueba `Timing` para decidir si se admite o continúa la operación.

- **Entradas** `x`, `y`.
- **Lo usa** [`createQrModules`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L33) (llama).

#### [`QR_MODULES`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L44) · variable de módulo

Declara `QR_MODULES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`createQrModules`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L44).
- **Lo usa** [`QrGlyph`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L65) (accede al módulo).

#### [`QrGlyph`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L46) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className, style, holeFill}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`QR_MODULES.map`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L65).
- **Lo usa** [`QrBadge`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L95) (renderiza).

#### [`QrBadge`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L78) · componente React

Monta `QrGlyph`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{progress, className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `QrGlyph`.
- **Lo usa** [`HistorialItemActivo`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L321) (renderiza).

#### [`PacmanTimer`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L167) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{timeLeftMs}`.
- **Retorno visible o tipo declarado** `JSX`.

#### [`HistorialItemActivo`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L196) · componente React · exportación por defecto

Monta `QrBadge`, `MapPin`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{item, now}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `localNameRef mediante useRef`, `addressWrapperRef mediante useRef`, `addressMeasureRef mediante useRef`, `[isAddressMarquee, setIsAddressMarquee] mediante useState`, `[addressDistance, setAddressDistance] mediante useState`, `[addressDuration, setAddressDuration] mediante useState`, `[isLocalNameWrapped, setIsLocalNameWrapped] mediante useState`.
- **Interfaz que monta** `QrBadge`, `MapPin`.
- **Hooks que llama** `useNavigate`, `useRef`, `useState`, `useEffect`.
- **Usa código de** [`sanitizeText`](../../../apps/referidos-app/src/utils/sanitize.js#L2) (llama).
- **Llamadas directas en el cuerpo** [`sanitizeText`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L208), [`getTime`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L221), [`join`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L233), [`filter`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L233).
- **Lo usa** [`HistorialList`](../../../apps/referidos-app/src/cliente/historial/HistorialList.jsx#L36) (renderiza).

#### [`goDetalle`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L216) · función · dentro de [`HistorialItemActivo`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L196)

Función auxiliar de `HistorialItemActivo` para `go Detalle`.

- **Efectos y APIs** `navigate`.
- **Condiciones que evalúa** `promo.id`.
- **Llamadas directas en el cuerpo** [`navigate`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L217).
- **Lo usa** [`HistorialItemActivo`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L292) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L240) · callback de infraestructura · dentro de [`HistorialItemActivo`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L196)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `HistorialItemActivo`.

- **Efectos y APIs** `window.addEventListener`, `window.removeEventListener`.
- **Condiciones que evalúa** `ausencia de el o undefined`.
- **Llamadas directas en el cuerpo** [`measure`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L256), [`window.addEventListener`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L257), [`window.removeEventListener`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L258).

#### [`measure`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L244) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L240)

Coordina cambios de estado durante `measure`.

- **Actualizaciones de estado o acciones** `setIsLocalNameWrapped`.
- **Llamadas directas en el cuerpo** [`window.getComputedStyle`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L245), [`parseFloat`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L246), [`setIsLocalNameWrapped`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L253).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L256) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L261) · callback de infraestructura · dentro de [`HistorialItemActivo`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L196)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `HistorialItemActivo`.

- **Efectos y APIs** `window.addEventListener`, `window.removeEventListener`.
- **Condiciones que evalúa** `ausencia de wrapper o ausencia de measure`.
- **Llamadas directas en el cuerpo** [`update`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L282), [`window.addEventListener`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L283), [`window.removeEventListener`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L284).

#### [`update`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L266) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L261)

Coordina cambios de estado durante `update`.

- **Actualizaciones de estado o acciones** `setIsAddressMarquee`, `setAddressDistance`, `setAddressDuration`.
- **Condiciones que evalúa** `ausencia de overflow`.
- **Llamadas directas en el cuerpo** [`setIsAddressMarquee`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L270), [`setAddressDistance`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L272), [`setAddressDuration`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L273).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L282) (llama).

### [`apps/referidos-app/src/cliente/historial/HistorialList.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialList.jsx#L1)

Compone las filas de historial y transmite acciones a la pantalla que posee la consulta.

**Superficie que exporta.** [`HistorialList`](../../../apps/referidos-app/src/cliente/historial/HistorialList.jsx#L6).

**Módulos que lo cargan.** [`HistorialView.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L10) (importa).

**Dependencias del archivo.** `react`, `framer-motion`, [`./HistorialItem`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx), [`./HistorialItemActivo`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx).

#### [`HistorialList`](../../../apps/referidos-app/src/cliente/historial/HistorialList.jsx#L6) · componente React · exportación por defecto

Monta `TEMP_MOTION_SPLASH_TAG`, `AnimatePresence`, `HistorialItemActivo`, `HistorialItem`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{items, variant, now}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `TEMP_MOTION_SPLASH_TAG`, `AnimatePresence`, `HistorialItemActivo`, `HistorialItem`.
- **Usa código de** [`HistorialItemActivo`](../../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx#L196) (renderiza), [`HistorialItem`](../../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx#L227) (renderiza).
- **Llamadas directas en el cuerpo** [`items.map`](../../../apps/referidos-app/src/cliente/historial/HistorialList.jsx#L22).
- **Lo usa** [`HistorialView`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L221) (renderiza).

### [`apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L1)

Proporciona ejemplos de actividad para previsualizar la interfaz y sus distintos estados.

**Superficie que exporta.** [`buildHistorialPreview`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L76), [`HISTORIAL_PREVIEW_BY_TAB`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L98).

**Módulos que lo cargan.** [`HistorialView.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L12) (importa).

**Dependencias del archivo.** [`../inicio/InicioPromosPreview`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx).

#### [`MINUTE_MS`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L3) · variable de módulo

Declara `MINUTE_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`buildItem`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L36) (referencia).

#### [`createSeededRng`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L5) · función

Construye `Seeded Rng` a partir de los datos del flujo.

- **Entradas** `seed`.
- **Lo usa** [`shuffleWithSeed`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L19) (llama), [`buildList`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L85) (llama).

#### [`seedFromString`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L15) · función

Implementa `seed From String` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`reduce`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L16), [`value.split`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L16), [`char.charCodeAt`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L16).
- **Lo usa** [`buildList`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L82) (llama).

#### [`shuffleWithSeed`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L18) · función

Implementa `shuffle With Seed` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `list`, `seed`.
- **Llamadas directas en el cuerpo** [`createSeededRng`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L19), [`rng`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L22).
- **Lo usa** [`buildList`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L83) (llama).

#### [`buildItem`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L28) · función

Construye `Item` a partir de los datos del flujo.

- **Entradas** `promo`, `index`, `variant`, `now`, `timeRng`.
- **Retorno visible o tipo declarado** `id`, `code`, `status`, `createdAt`, `expiresAt`, `redeemedAt`, `promoId`, `promo`, `timeLeftMs`.
- **Llamadas directas en el cuerpo** [`timeRng`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L36), [`toISOString`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L40), [`getTime`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L72).
- **Lo usa** [`buildList`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L87) (llama).

#### [`buildHistorialPreview`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L76) · función · exportado

Construye `Historial Preview` a partir de los datos del flujo.

- **Entradas** `{seed, baseTime} = valor por defecto`.
- **Retorno visible o tipo declarado** `activos`, `canjeados`, `expirados`.
- **Llamadas directas en el cuerpo** [`buildList`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L92).
- **Lo usa** [`HISTORIAL_PREVIEW_BY_TAB`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L98) (llama), [`HistorialView`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L61) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L96) (llama).

#### [`buildList`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L81) · función · dentro de [`buildHistorialPreview`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L76)

Construye `List` a partir de los datos del flujo.

- **Entradas** `variant`.
- **Usa código de** [`MOCK_PROMOS`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L8) (referencia).
- **Llamadas directas en el cuerpo** [`seedFromString`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L82), [`shuffleWithSeed`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L83), [`createSeededRng`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L85), [`shuffled.map`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L86), [`buildItem`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L87).
- **Lo usa** [`buildHistorialPreview`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L92) (llama).

#### [`HISTORIAL_PREVIEW_BY_TAB`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L98) · variable de módulo · exportado

Declara `HISTORIAL_PREVIEW_BY_TAB` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`buildHistorialPreview`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L98).

### [`apps/referidos-app/src/cliente/historial/HistorialSkeleton.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialSkeleton.jsx#L1)

Anticipa la estructura del historial mientras se ejecuta la consulta.

**Superficie que exporta.** [`HistorialSkeleton`](../../../apps/referidos-app/src/cliente/historial/HistorialSkeleton.jsx#L4).

**Módulos que lo cargan.** [`HistorialView.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L13) (importa).

**Dependencias del archivo.** [`../../components/ui/skeleton/SkeletonBlock`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx), [`../../components/ui/skeleton/SkeletonText`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx).

#### [`HistorialSkeleton`](../../../apps/referidos-app/src/cliente/historial/HistorialSkeleton.jsx#L4) · componente React · exportación por defecto

Monta `SkeletonBlock`, `SkeletonText`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{rows}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SkeletonBlock`, `SkeletonText`.
- **Usa código de** [`SkeletonBlock`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx#L3) (renderiza), [`SkeletonText`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx#L8) (renderiza).
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-app/src/cliente/historial/HistorialSkeleton.jsx#L7).
- **Lo usa** [`HistorialView`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L211) (renderiza).

### [`apps/referidos-app/src/cliente/historial/HistorialView.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L1)

Carga getQrHistory, filtra y organiza por estado visible y actualiza la hora que usa su presentación.

**Superficie que exporta.** [`HistorialView`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L48).

**Módulos que lo cargan.** [`ClienteHistorialBase.jsx`](../../../apps/referidos-app/src/cliente/base/ClienteHistorialBase.jsx#L2) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../../services/qrService`](../../../apps/referidos-app/src/services/qrService.js), [`../../utils/errorUtils`](../../../apps/referidos-app/src/utils/errorUtils.js), [`../hooks/useClienteUI`](../../../apps/referidos-app/src/cliente/hooks/useClienteUI.js), [`../layout/ClienteHeaderContext`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx), [`../../cache/cacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js), [`../../cache/cacheKeys`](../../../apps/referidos-app/src/cache/cacheKeys.js), [`./HistorialList`](../../../apps/referidos-app/src/cliente/historial/HistorialList.jsx), [`./HistorialEmpty`](../../../apps/referidos-app/src/cliente/historial/HistorialEmpty.jsx), [`./HistorialPromosPreview`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js), [`./HistorialSkeleton`](../../../apps/referidos-app/src/cliente/historial/HistorialSkeleton.jsx).

#### [`Tabs`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L15) · componente React

Monta `React.Fragment`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{active, onChange}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `React.Fragment`, `button`.
- **Llamadas directas en el cuerpo** [`tabs.map`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L24).
- **Lo usa** [`HistorialView`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L203) (renderiza).

#### [`button.onClick`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L29) · callback JSX · dentro de [`Tabs`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L15)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onChange`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L29).

#### [`HistorialView`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L48) · componente React · exportación por defecto

Monta `Link`, `Tabs`, `HistorialSkeleton`, `HistorialEmpty`, `HistorialList`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `[historial, setHistorial] mediante useState`, `[loading, setLoading] mediante useState`, `[error, setError] mediante useState`, `[now, setNow] mediante useState`, `previewSeedRef mediante useRef`, `[previewByTab, setPreviewByTab] mediante useState`.
- **Interfaz que monta** `Link`, `Tabs`, `HistorialSkeleton`, `HistorialEmpty`, `HistorialList`.
- **Hooks que llama** `useAppStore`, `useClienteUI`, `useClienteHeader`, `useCacheStore`, `useState`, `useRef`, `useLayoutEffect`, `useEffect`.
- **Condiciones que evalúa** `ausencia de usuario`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`useClienteUI`](../../../apps/referidos-app/src/cliente/hooks/useClienteUI.js#L3) (llama), [`useClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L91) (llama), [`useCacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js#L12) (llama), [`CACHE_KEYS`](../../../apps/referidos-app/src/cache/cacheKeys.js#L1) (accede al módulo), [`buildHistorialPreview`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L76) (llama), [`HistorialSkeleton`](../../../apps/referidos-app/src/cliente/historial/HistorialSkeleton.jsx#L4) (renderiza), [`HistorialEmpty`](../../../apps/referidos-app/src/cliente/historial/HistorialEmpty.jsx#L10) (renderiza), [`HistorialList`](../../../apps/referidos-app/src/cliente/historial/HistorialList.jsx#L6) (renderiza).
- **Llamadas directas en el cuerpo** [`buildHistorialPreview`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L61).
- **Lo usa** [`ClienteHistorialBase`](../../../apps/referidos-app/src/cliente/base/ClienteHistorialBase.jsx#L5) (renderiza).

#### [`useLayoutEffect · callback`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L68) · callback de infraestructura · dentro de [`HistorialView`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L48)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `HistorialView`.

- **Actualizaciones de estado o acciones** `setHeaderOptions`.
- **Condiciones que evalúa** `ausencia de isActive`.
- **Llamadas directas en el cuerpo** [`setHeaderOptions`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L70).

#### [`useEffect · callback`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L88) · callback de infraestructura · dentro de [`HistorialView`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L48)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `HistorialView`.

- **Actualizaciones de estado o acciones** `clearInterval`.
- **Efectos y APIs** `setInterval`, `clearInterval`.
- **Llamadas directas en el cuerpo** [`setInterval`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L89), [`clearInterval`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L90).

#### [`setInterval · callback`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L89) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L88)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setNow`.
- **Llamadas directas en el cuerpo** [`setNow`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L89).

#### [`useEffect · callback`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L93) · callback de infraestructura · dentro de [`HistorialView`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L48)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `HistorialView`.

- **Actualizaciones de estado o acciones** `setPreviewByTab`.
- **Condiciones que evalúa** `ausencia de useHistorialPreview`.
- **Usa código de** [`buildHistorialPreview`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L76) (llama).
- **Llamadas directas en el cuerpo** [`setPreviewByTab`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L95), [`buildHistorialPreview`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L96).

#### [`useEffect · callback`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L103) · callback de infraestructura · dentro de [`HistorialView`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L48)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `HistorialView`.

- **Condiciones que evalúa** `useHistorialPreview o ausencia de usuario.id`.
- **Llamadas directas en el cuerpo** [`fetchData`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L132).

#### [`fetchData`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L105) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L103)

Obtiene o resuelve `Data` para entregarlo al consumidor.

- **Retorno visible o tipo declarado** `estado`, `timeLeftMs`.
- **Actualizaciones de estado o acciones** `setLoading`, `setError`, `setHistorial`.
- **Condiciones que evalúa** `ausencia de ok`.
- **Usa código de** [`getQrHistory`](../../../apps/referidos-app/src/services/qrService.js#L87) (llama), [`handleError`](../../../apps/referidos-app/src/utils/errorUtils.js#L4) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L106), [`setError`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L107), [`getQrHistory`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L109), [`data.map`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L113), [`getTime`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L114), [`setHistorial`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L125), [`handleError`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L127).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L132) (llama).

#### [`grouped`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L135) · cálculo memorizado · dentro de [`HistorialView`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L48)

Procesa `ed` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Efectos y APIs** `base.canjeados.push`, `base.expirados.push`, `base.activos.push`.
- **Condiciones que evalúa** `item.estado`.
- **Llamadas directas en el cuerpo** [`historial.forEach`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L137), [`base.canjeados.push`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L138), [`base.expirados.push`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L139), [`base.activos.push`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L140).
- **Lo usa** [`HistorialView`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L188) (accede al módulo).

#### [`previewGrouped`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L145) · cálculo memorizado · dentro de [`HistorialView`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L48)

Función auxiliar de `HistorialView` para `preview Grouped`.

- **Hooks que llama** `useMemo`.
- **Efectos y APIs** `base.expirados.push`, `base.activos.push`.
- **Condiciones que evalúa** `timeLeftMs`.
- **Llamadas directas en el cuerpo** [`previewByTab.activos.forEach`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L152), [`getTime`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L153), [`base.expirados.push`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L156), [`base.activos.push`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L163).
- **Lo usa** [`HistorialView`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L187) (accede al módulo).

### [`apps/referidos-app/src/cliente/hooks/useClienteUI.js`](../../../apps/referidos-app/src/cliente/hooks/useClienteUI.js#L1)

Agrupa información y callbacks comunes de la UI de cliente para sus distintas pantallas.

**Superficie que exporta.** [`useClienteUI`](../../../apps/referidos-app/src/cliente/hooks/useClienteUI.js#L3).

**Módulos que lo cargan.** [`HistorialView.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L6) (importa), [`ClienteInicio.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L20) (importa), [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L32) (importa).

**Dependencias del archivo.** `react`.

#### [`useClienteUI`](../../../apps/referidos-app/src/cliente/hooks/useClienteUI.js#L3) · hook React · exportado

Agrupa estado, contexto o efectos de `Cliente UI` para sus consumidores React.

- **Entradas** `options = valor por defecto`.
- **Retorno visible o tipo declarado** `historyTab`, `setHistoryTab`, `profileTab`, `setProfileTab`, `filtersOpen`, `setFiltersOpen`, `toggleFilters`, `searchVisible`, `toggleSearch`.
- **Estado o valores vinculados** `[historyTab, setHistoryTab] mediante useState`, `[profileTab, setProfileTab] mediante useState`, `[filtersOpen, setFiltersOpen] mediante useState`, `[searchVisible, setSearchVisible] mediante useState`.
- **Hooks que llama** `useState`.
- **Lo usa** [`HistorialView`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L50) (llama), [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L29) (llama), [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L145) (llama).

#### [`toggleFilters`](../../../apps/referidos-app/src/cliente/hooks/useClienteUI.js#L15) · callback React · dentro de [`useClienteUI`](../../../apps/referidos-app/src/cliente/hooks/useClienteUI.js#L3)

Coordina cambios de estado durante `toggle Filters`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setFiltersOpen`.
- **Llamadas directas en el cuerpo** [`setFiltersOpen`](../../../apps/referidos-app/src/cliente/hooks/useClienteUI.js#L16).
- **Lo usa** [`useClienteUI`](../../../apps/referidos-app/src/cliente/hooks/useClienteUI.js#L30) (referencia).

#### [`toggleSearch`](../../../apps/referidos-app/src/cliente/hooks/useClienteUI.js#L19) · callback React · dentro de [`useClienteUI`](../../../apps/referidos-app/src/cliente/hooks/useClienteUI.js#L3)

Coordina cambios de estado durante `toggle Search`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSearchVisible`.
- **Llamadas directas en el cuerpo** [`setSearchVisible`](../../../apps/referidos-app/src/cliente/hooks/useClienteUI.js#L20).
- **Lo usa** [`useClienteUI`](../../../apps/referidos-app/src/cliente/hooks/useClienteUI.js#L32) (referencia).

### [`apps/referidos-app/src/cliente/hooks/useSearchDock.js`](../../../apps/referidos-app/src/cliente/hooks/useSearchDock.js#L1)

Coordina apertura y estado de los controles de búsqueda puestos en una barra de interfaz.

**Superficie que exporta.** [`useSearchDock`](../../../apps/referidos-app/src/cliente/hooks/useSearchDock.js#L3).

**Módulos que lo cargan.** [`ClienteInicio.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L21) (importa).

**Dependencias del archivo.** `react`.

#### [`useSearchDock`](../../../apps/referidos-app/src/cliente/hooks/useSearchDock.js#L3) · hook React · exportado

Obtiene o resuelve `Dock` para entregarlo al consumidor.

- **Entradas** `{headerId, heroSelector, heroSearchSelector, scrollContainerId, dockOffset, rootSelector, enabled} = valor por defecto`.
- **Retorno visible o tipo declarado** `docked`, `heroVisible`.
- **Estado o valores vinculados** `[docked, setDocked] mediante useState`, `[heroVisible, setHeroVisible] mediante useState`.
- **Hooks que llama** `useState`, `useLayoutEffect`.
- **Lo usa** [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L60) (llama).

#### [`update`](../../../apps/referidos-app/src/cliente/hooks/useSearchDock.js#L15) · callback React · dentro de [`useSearchDock`](../../../apps/referidos-app/src/cliente/hooks/useSearchDock.js#L3)

Coordina cambios de estado durante `update`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setDocked`, `setHeroVisible`.
- **Condiciones que evalúa** `ausencia de enabled`, `ausencia de headerEl o ausencia de heroEl`.
- **Llamadas directas en el cuerpo** [`setDocked`](../../../apps/referidos-app/src/cliente/hooks/useSearchDock.js#L17), [`setHeroVisible`](../../../apps/referidos-app/src/cliente/hooks/useSearchDock.js#L18), [`document.getElementById`](../../../apps/referidos-app/src/cliente/hooks/useSearchDock.js#L21), [`document.querySelector`](../../../apps/referidos-app/src/cliente/hooks/useSearchDock.js#L22), [`rootEl.querySelector`](../../../apps/referidos-app/src/cliente/hooks/useSearchDock.js#L23), [`getBoundingClientRect`](../../../apps/referidos-app/src/cliente/hooks/useSearchDock.js#L32).
- **Lo usa** [`useLayoutEffect · callback`](../../../apps/referidos-app/src/cliente/hooks/useSearchDock.js#L45) (llama), [`useSearchDock`](../../../apps/referidos-app/src/cliente/hooks/useSearchDock.js#L62) (referencia).

#### [`useLayoutEffect · callback`](../../../apps/referidos-app/src/cliente/hooks/useSearchDock.js#L41) · callback de infraestructura · dentro de [`useSearchDock`](../../../apps/referidos-app/src/cliente/hooks/useSearchDock.js#L3)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useSearchDock`.

- **Efectos y APIs** `scrollContainer.addEventListener`, `window.addEventListener`, `scrollContainer.removeEventListener`, `window.removeEventListener`.
- **Condiciones que evalúa** `ausencia de enabled`, `scrollContainer`.
- **Llamadas directas en el cuerpo** [`update`](../../../apps/referidos-app/src/cliente/hooks/useSearchDock.js#L45), [`document.getElementById`](../../../apps/referidos-app/src/cliente/hooks/useSearchDock.js#L47), [`scrollContainer.addEventListener`](../../../apps/referidos-app/src/cliente/hooks/useSearchDock.js#L51), [`window.addEventListener`](../../../apps/referidos-app/src/cliente/hooks/useSearchDock.js#L53), [`scrollContainer.removeEventListener`](../../../apps/referidos-app/src/cliente/hooks/useSearchDock.js#L57), [`window.removeEventListener`](../../../apps/referidos-app/src/cliente/hooks/useSearchDock.js#L59).

### [`apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L1)

Compone cabecera, promos y beneficios. Coordina carga y visibilidad de promociones mediante el store y el contexto del rol.

**Superficie que exporta.** [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L28).

**Módulos que lo cargan.** [`ClienteInicioBase.jsx`](../../../apps/referidos-app/src/cliente/base/ClienteInicioBase.jsx#L2) (importa).

**Dependencias del archivo.** `react`, `react-dom`, [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../../components/menus/MenuFilters`](../../../apps/referidos-app/src/components/menus/MenuFilters.jsx), [`../../components/cards/PromoCardCercanas`](../../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx), [`../../components/header-panels`](../../../apps/referidos-app/src/components/header-panels/index.js), [`../../search/cliente/ClienteInicioSearch`](../../../apps/referidos-app/src/search/cliente/ClienteInicioSearch.jsx), [`../../search/SearchResults`](../../../apps/referidos-app/src/search/SearchResults.jsx), [`../../search/hooks/useSearchMode`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js), [`../../search/SearchIdle`](../../../apps/referidos-app/src/search/SearchIdle.jsx), [`../../hooks/usePromoSearch`](../../../apps/referidos-app/src/hooks/usePromoSearch.js), [`../../utils/sanitize`](../../../apps/referidos-app/src/utils/sanitize.js), [`../../components/ui/LoaderOverlay`](../../../apps/referidos-app/src/components/ui/LoaderOverlay.jsx), [`../layout/ClienteHeaderContext`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx), [`../../cache/cacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js), [`../../cache/cacheKeys`](../../../apps/referidos-app/src/cache/cacheKeys.js), [`../hooks/useClienteUI`](../../../apps/referidos-app/src/cliente/hooks/useClienteUI.js), [`../hooks/useSearchDock`](../../../apps/referidos-app/src/cliente/hooks/useSearchDock.js) y 5 más.

#### [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L28) · componente React · exportación por defecto

Monta `LoaderOverlay`, `ClienteInicioSkeleton`, `ClienteInicioSearch`, `HeaderPanelContainer`, `SearchbarPanel`, `SearchResults`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[dockTarget, setDockTarget] mediante useState`, `loadPromos mediante useAppStore`, `selector s.loadPromos`, `startPromosAutoRefresh mediante useAppStore`, `selector s.startPromosAutoRefresh`, `setPromosVisible mediante useAppStore`, `selector s.setPromosVisible`, `promos mediante useAppStore`, `selector s.promos`, `promosLoadedAt mediante useAppStore`, `selector s.promosLoadedAt`, `promosRefreshing mediante useAppStore`, `selector s.promosRefreshing`, `ratings mediante useAppStore` y 7 más.
- **Interfaz que monta** `LoaderOverlay`, `ClienteInicioSkeleton`, `ClienteInicioSearch`, `HeaderPanelContainer`, `SearchbarPanel`, `SearchResults`, `PromoCardCercanas`, `InicioEmptyState`, `SearchIdle`, `InicioHero`, `MenuFilters`, `InicioPromosPreview`, `InicioBeneficios`.
- **Hooks que llama** `useClienteUI`, `useState`, `useAppStore`, `useEffect`, `useSearchMode`, `usePromoSearch`, `useCacheStore`, `useSearchDock`, `useClienteHeader`, `useLayoutEffect`.
- **Condiciones que evalúa** `loading y promos.length`, `ausencia de isActive`.
- **Usa código de** [`useClienteUI`](../../../apps/referidos-app/src/cliente/hooks/useClienteUI.js#L3) (llama), [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`useSearchMode`](../../../apps/referidos-app/src/search/hooks/useSearchMode.js#L3) (llama), [`usePromoSearch`](../../../apps/referidos-app/src/hooks/usePromoSearch.js#L1) (llama), [`useCacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js#L12) (llama), [`CACHE_KEYS`](../../../apps/referidos-app/src/cache/cacheKeys.js#L1) (accede al módulo), [`useSearchDock`](../../../apps/referidos-app/src/cliente/hooks/useSearchDock.js#L3) (llama), [`useClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L91) (llama), [`LoaderOverlay`](../../../apps/referidos-app/src/components/ui/LoaderOverlay.jsx#L1) (renderiza), [`ClienteInicioSkeleton`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx#L71) (renderiza) y 11 más.
- **Llamadas directas en el cuerpo** [`filterPromos`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L55), [`query.trim`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L56), [`createPortal`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L152).
- **Lo usa** [`ClienteInicioBase`](../../../apps/referidos-app/src/cliente/base/ClienteInicioBase.jsx#L5) (renderiza).

#### [`useEffect · callback`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L43) · callback de infraestructura · dentro de [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L28)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClienteInicio`.

- **Condiciones que evalúa** `ausencia de promosLoadedAt y promos.length`.
- **Llamadas directas en el cuerpo** [`loadPromos`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L45).

#### [`useEffect · callback`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L49) · callback de infraestructura · dentro de [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L28)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClienteInicio`.

- **Condiciones que evalúa** `promos.length`.
- **Llamadas directas en el cuerpo** [`initRatings`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L50).

#### [`safeResults`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L69) · cálculo memorizado · dentro de [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L28)

Función auxiliar de `ClienteInicio` para `safe Results`.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`sanitizeText`](../../../apps/referidos-app/src/utils/sanitize.js#L2) (llama).
- **Llamadas directas en el cuerpo** [`searchResults.map`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L70), [`sanitizeText`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L72).
- **Lo usa** [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L175) (pasa a items).

#### [`hotPromos`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L80) · cálculo memorizado · dentro de [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L28)

Función auxiliar de `ClienteInicio` para `hot Promos`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`promos.slice`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L80).
- **Lo usa** [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L195) (pasa a hotPromos).

#### [`useEffect · callback`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L88) · callback de infraestructura · dentro de [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L28)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClienteInicio`.

- **Actualizaciones de estado o acciones** `setDockTarget`.
- **Condiciones que evalúa** `ausencia de headerVisible o ausencia de isActive`, `frameId`.
- **Llamadas directas en el cuerpo** [`setDockTarget`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L90), [`resolveTarget`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L106), [`cancelAnimationFrame`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L108).

#### [`resolveTarget`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L95) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L88)

Obtiene o resuelve `Target` para entregarlo al consumidor.

- **Actualizaciones de estado o acciones** `setDockTarget`.
- **Efectos y APIs** `requestAnimationFrame`.
- **Condiciones que evalúa** `target`, `tries`.
- **Llamadas directas en el cuerpo** [`document.getElementById`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L96), [`setDockTarget`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L98), [`requestAnimationFrame`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L103).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L106) (llama).

#### [`useLayoutEffect · callback`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L112) · callback de infraestructura · dentro de [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L28)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClienteInicio`.

- **Actualizaciones de estado o acciones** `setHeaderOptions`.
- **Condiciones que evalúa** `ausencia de isActive`.
- **Llamadas directas en el cuerpo** [`setHeaderOptions`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L114).

#### [`useEffect · callback`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L124) · callback de infraestructura · dentro de [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L28)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClienteInicio`.

- **Actualizaciones de estado o acciones** `setPromosVisible`.
- **Condiciones que evalúa** `ausencia de isActive`.
- **Llamadas directas en el cuerpo** [`startPromosAutoRefresh`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L126), [`setPromosVisible`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L127).

#### [`SearchIdle.onSelectSuggestion`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L197) · callback JSX · dentro de [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L28)

Responde al evento de interfaz `SearchIdle.onSelectSuggestion`. La lógica ocurre al interactuar con ese control.

- **Entradas** `term`.
- **Actualizaciones de estado o acciones** `setQuery`.
- **Llamadas directas en el cuerpo** [`setQuery`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L197).

#### [`MenuFilters.onClose`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L213) · callback JSX · dentro de [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L28)

Responde al evento de interfaz `MenuFilters.onClose`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setFiltersOpen`.
- **Llamadas directas en el cuerpo** [`setFiltersOpen`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L213).

### [`apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx#L1)

Replica la estructura básica del inicio cliente durante su arranque y carga.

**Superficie que exporta.** [`ClienteInicioSkeleton`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx#L71).

**Módulos que lo cargan.** [`ClienteInicio.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L26) (importa).

**Dependencias del archivo.** [`../../components/ui/skeleton/SkeletonBlock`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx), [`../../components/ui/skeleton/SkeletonText`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx), [`../../components/ui/skeleton/SkeletonCard`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonCard.jsx).

#### [`NuevasRow`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx#L5) · componente React

Monta `SkeletonBlock`, `SkeletonText`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SkeletonBlock`, `SkeletonText`.
- **Usa código de** [`SkeletonBlock`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx#L3) (renderiza), [`SkeletonText`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx#L8) (renderiza).
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx#L8).
- **Lo usa** [`ClienteInicioSkeleton`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx#L86) (renderiza).

#### [`CercanasRow`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx#L32) · componente React

Monta `SkeletonCard`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SkeletonCard`.
- **Usa código de** [`SkeletonCard`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonCard.jsx#L5) (renderiza).
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx#L35).
- **Lo usa** [`ClienteInicioSkeleton`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx#L93) (renderiza).

#### [`HotRow`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx#L47) · componente React

Monta `SkeletonBlock`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SkeletonBlock`.
- **Usa código de** [`SkeletonBlock`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx#L3) (renderiza).
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx#L50).
- **Lo usa** [`ClienteInicioSkeleton`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx#L100) (renderiza).

#### [`ClienteInicioSkeleton`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx#L71) · componente React · exportación por defecto

Monta `SkeletonBlock`, `NuevasRow`, `CercanasRow`, `HotRow`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SkeletonBlock`, `NuevasRow`, `CercanasRow`, `HotRow`.
- **Usa código de** [`SkeletonBlock`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx#L3) (renderiza).
- **Lo usa** [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L136) (renderiza).

### [`apps/referidos-app/src/cliente/inicio/InicioBeneficios.jsx`](../../../apps/referidos-app/src/cliente/inicio/InicioBeneficios.jsx#L1)

Presenta beneficios y acceso relacionado dentro del inicio cliente.

**Superficie que exporta.** [`InicioBeneficios`](../../../apps/referidos-app/src/cliente/inicio/InicioBeneficios.jsx#L32).

**Módulos que lo cargan.** [`ClienteInicio.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L23) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../services/clienteUI`](../../../apps/referidos-app/src/cliente/services/clienteUI.js).

#### [`BENEFITS`](../../../apps/referidos-app/src/cliente/inicio/InicioBeneficios.jsx#L5) · variable de módulo

Conserva la lista de `BENEFITS` usada por el módulo.

- **Lo usa** [`InicioBeneficios`](../../../apps/referidos-app/src/cliente/inicio/InicioBeneficios.jsx#L52) (accede al módulo).

#### [`InicioBeneficios`](../../../apps/referidos-app/src/cliente/inicio/InicioBeneficios.jsx#L32) · componente React · exportación por defecto

Monta `Icon`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{usuario}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Icon`.
- **Usa código de** [`getTierMeta`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L74) (llama).
- **Llamadas directas en el cuerpo** [`getTierMeta`](../../../apps/referidos-app/src/cliente/inicio/InicioBeneficios.jsx#L33), [`BENEFITS.map`](../../../apps/referidos-app/src/cliente/inicio/InicioBeneficios.jsx#L52).
- **Lo usa** [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L231) (renderiza).

### [`apps/referidos-app/src/cliente/inicio/InicioEmptyState.jsx`](../../../apps/referidos-app/src/cliente/inicio/InicioEmptyState.jsx#L1)

Muestra contexto y acciones cuando faltan datos en la sección de inicio.

**Superficie que exporta.** [`InicioEmptyState`](../../../apps/referidos-app/src/cliente/inicio/InicioEmptyState.jsx#L18).

**Módulos que lo cargan.** [`ClienteInicio.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L24) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, `lucide-react`.

#### [`EMPTY_COPY`](../../../apps/referidos-app/src/cliente/inicio/InicioEmptyState.jsx#L5) · variable de módulo

Agrupa la configuración o catálogo de `EMPTY COPY` para que sus consumidores lean claves comunes.

- **Campos o contexto** `promos`, `search`.
- **Lo usa** [`InicioEmptyState`](../../../apps/referidos-app/src/cliente/inicio/InicioEmptyState.jsx#L19) (accede al módulo).

#### [`InicioEmptyState`](../../../apps/referidos-app/src/cliente/inicio/InicioEmptyState.jsx#L18) · componente React · exportación por defecto

Monta `Sparkles`, `button`, `Search`, `Link`, `QrCode`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{variant, onClear}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Sparkles`, `button`, `Search`, `Link`, `QrCode`.
- **Lo usa** [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L184) (renderiza).

### [`apps/referidos-app/src/cliente/inicio/InicioHero.jsx`](../../../apps/referidos-app/src/cliente/inicio/InicioHero.jsx#L1)

Compone la tarjeta principal del rol con contenido introductorio y sus acciones.

**Superficie que exporta.** [`InicioHero`](../../../apps/referidos-app/src/cliente/inicio/InicioHero.jsx#L11).

**Módulos que lo cargan.** [`ClienteInicio.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L22) (importa).

**Dependencias del archivo.** `react`, `framer-motion`, `lucide-react`, [`../services/clienteUI`](../../../apps/referidos-app/src/cliente/services/clienteUI.js), [`../../search/SearchBar`](../../../apps/referidos-app/src/search/SearchBar.jsx).

#### [`InicioHero`](../../../apps/referidos-app/src/cliente/inicio/InicioHero.jsx#L11) · componente React · exportación por defecto

Monta `TEMP_MOTION_SPLASH_TAG`, `CurrentIcon`, `NextIcon`, `SearchBar`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{usuario, searchValue, onSearchChange, onSearchFocus, hideSearch}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `TEMP_MOTION_SPLASH_TAG`, `CurrentIcon`, `NextIcon`, `SearchBar`.
- **Usa código de** [`getTierProgress`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L101) (llama), [`getTierJourney`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L87) (llama), [`formatCompactNumber`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L41) (llama), [`SearchBar`](../../../apps/referidos-app/src/search/SearchBar.jsx#L3) (renderiza).
- **Llamadas directas en el cuerpo** [`getTierProgress`](../../../apps/referidos-app/src/cliente/inicio/InicioHero.jsx#L21), [`getTierJourney`](../../../apps/referidos-app/src/cliente/inicio/InicioHero.jsx#L22), [`formatCompactNumber`](../../../apps/referidos-app/src/cliente/inicio/InicioHero.jsx#L55).
- **Lo usa** [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L203) (renderiza).

### [`apps/referidos-app/src/cliente/inicio/InicioPromos.jsx`](../../../apps/referidos-app/src/cliente/inicio/InicioPromos.jsx#L1)

Ordena la presentación de promos de cliente en secciones y conecta navegación a detalle.

**Superficie que exporta.** [`InicioPromos`](../../../apps/referidos-app/src/cliente/inicio/InicioPromos.jsx#L4).

**Módulos que lo cargan.** [`InicioPromosPreview.jsx`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L3) (importa).

**Dependencias del archivo.** `react`, [`../../components/sections/PromoSection`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx).

#### [`InicioPromos`](../../../apps/referidos-app/src/cliente/inicio/InicioPromos.jsx#L4) · componente React · exportación por defecto

Monta `PromoSection`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{sections, ratings}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Interfaz que monta** `PromoSection`.
- **Condiciones que evalúa** `ausencia de sections o sections.length`.
- **Usa código de** [`PromoSection`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L8) (renderiza).
- **Llamadas directas en el cuerpo** [`sections.map`](../../../apps/referidos-app/src/cliente/inicio/InicioPromos.jsx#L9).
- **Lo usa** [`InicioPromosPreview`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L220) (renderiza).

### [`apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L1)

Proporciona tarjetas o datos de demostración para representar la sección sin un catálogo real.

**Superficie que exporta.** [`MOCK_PROMOS`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L8), [`HOT_PROMOS`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L191), [`InicioPromosPreview`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L219).

**Módulos que lo cargan.** [`HistorialPromosPreview.js`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L1) (importa), [`ClienteInicio.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L25) (importa), [`SearchIdle.jsx`](../../../apps/referidos-app/src/components/search/SearchIdle.jsx#L4) (importa), [`SearchIdle.jsx`](../../../apps/referidos-app/src/search/SearchIdle.jsx#L4) (importa).

**Dependencias del archivo.** `react`, [`./InicioPromos`](../../../apps/referidos-app/src/cliente/inicio/InicioPromos.jsx), [`../../components/cards/PromoCardCercanas`](../../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx), [`../../components/cards/PromoCardHot`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx), [`../../components/cards/PromoCardNuevas`](../../../apps/referidos-app/src/components/cards/PromoCardNuevas.jsx).

#### [`MOCK_PROMOS`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L8) · variable de módulo · exportado

Conserva la lista de `MOCK PROMOS` usada por el módulo.

- **Lo usa** [`HOT_PROMOS`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L191) (accede al módulo), [`SECTIONS`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L197) (accede al módulo), [`buildList`](../../../apps/referidos-app/src/cliente/historial/HistorialPromosPreview.js#L83) (referencia).

#### [`HOT_PROMOS`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L191) · variable de módulo · exportado

Declara `HOT_PROMOS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`MOCK_PROMOS.slice`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L191).
- **Lo usa** [`SECTIONS`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L213) (referencia), [`SearchIdle`](../../../apps/referidos-app/src/components/search/SearchIdle.jsx#L24) (referencia), [`SearchIdle`](../../../apps/referidos-app/src/search/SearchIdle.jsx#L24) (referencia).

#### [`SECTIONS`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L193) · variable de módulo

Conserva la lista de `SECTIONS` usada por el módulo.

- **Usa código de** [`PromoCardNuevas`](../../../apps/referidos-app/src/components/cards/PromoCardNuevas.jsx#L7) (referencia), [`PromoCardCercanas`](../../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx#L7) (referencia), [`PromoCardHot`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L8) (referencia).
- **Llamadas directas en el cuerpo** [`MOCK_PROMOS.slice`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L197).
- **Lo usa** [`InicioPromosPreview`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L220) (pasa a sections).

#### [`InicioPromosPreview`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L219) · componente React · exportación por defecto

Monta `InicioPromos`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `InicioPromos`.
- **Usa código de** [`InicioPromos`](../../../apps/referidos-app/src/cliente/inicio/InicioPromos.jsx#L4) (renderiza).
- **Lo usa** [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L226) (renderiza).

### [`apps/referidos-app/src/cliente/layout/ClienteFooter.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteFooter.jsx#L1)

Declara y compone las acciones de navegación inferior específicas de cliente.

**Superficie que exporta.** [`ClienteFooter`](../../../apps/referidos-app/src/cliente/layout/ClienteFooter.jsx#L8).

**Módulos que lo cargan.** [`ClienteLayout.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L4) (importa), [`Footer.jsx`](../../../apps/referidos-app/src/components/footer/Footer.jsx#L7) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, `lucide-react`, `framer-motion`, [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js).

#### [`ClienteFooter`](../../../apps/referidos-app/src/cliente/layout/ClienteFooter.jsx#L8) · componente React · exportación por defecto

Monta `Link`, `TEMP_MOTION_SPLASH_TAG`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `onboarding mediante useAppStore`, `selector s.onboarding`, `bootstrap mediante useAppStore`, `selector s.bootstrap`.
- **Interfaz que monta** `Link`, `TEMP_MOTION_SPLASH_TAG`.
- **Hooks que llama** `useLocation`, `useAppStore`.
- **Condiciones que evalúa** `bootstrap o undefined`, `ausencia de usuario o ausencia de onboarding.allowAccess`, `usuario.role`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama).
- **Llamadas directas en el cuerpo** [`links.map`](../../../apps/referidos-app/src/cliente/layout/ClienteFooter.jsx#L43), [`isActive`](../../../apps/referidos-app/src/cliente/layout/ClienteFooter.jsx#L44), [`React.createElement`](../../../apps/referidos-app/src/cliente/layout/ClienteFooter.jsx#L59).
- **Lo usa** [`ClienteLayoutInner`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L309) (renderiza), [`Footer`](../../../apps/referidos-app/src/components/footer/Footer.jsx#L26) (renderiza).

#### [`isActive`](../../../apps/referidos-app/src/cliente/layout/ClienteFooter.jsx#L33) · función · dentro de [`ClienteFooter`](../../../apps/referidos-app/src/cliente/layout/ClienteFooter.jsx#L8)

Comprueba `Active` para decidir si se admite o continúa la operación.

- **Entradas** `path`.
- **Llamadas directas en el cuerpo** [`location.pathname.startsWith`](../../../apps/referidos-app/src/cliente/layout/ClienteFooter.jsx#L35).
- **Lo usa** [`ClienteFooter`](../../../apps/referidos-app/src/cliente/layout/ClienteFooter.jsx#L44) (llama).

### [`apps/referidos-app/src/cliente/layout/ClienteHeader.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L1)

Lee el contexto de cliente y selecciona título, identidad o paneles de búsqueda, ubicación y notificaciones.

**Superficie que exporta.** [`ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L23).

**Módulos que lo cargan.** [`ClienteLayout.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L3) (importa), [`HeaderCliente.jsx`](../../../apps/referidos-app/src/components/header/cliente/HeaderCliente.jsx#L2) (importa).

**Dependencias del archivo.** `react`, [`../../components/header-panels`](../../../apps/referidos-app/src/components/header-panels/index.js), `lucide-react`, [`../../components/header-elements`](../../../apps/referidos-app/src/components/header-elements/index.js), [`../../search/SearchHeader`](../../../apps/referidos-app/src/search/SearchHeader.jsx), [`./ClienteHeaderContext`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx), [`../services/clienteUI`](../../../apps/referidos-app/src/cliente/services/clienteUI.js).

#### [`ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L23) · componente React · exportación por defecto

Monta `SearchHeader`, `TabTitle`, `button`, `LogOut`, `ChevronLeft`, `UserIdentity`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{usuario, avatarSrc, onOpenNotifications, onLogout, isElevated}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[locationOpen, setLocationOpen] mediante useState`, `[locationVisible, setLocationVisible] mediante useState`, `[notificationsOpen, setNotificationsOpen] mediante useState`, `[notificationsVisible, setNotificationsVisible] mediante useState`, `[queueOpen, setQueueOpen] mediante useState`, `[queueVisible, setQueueVisible] mediante useState`, `scrollDistanceRef mediante useRef`, `lastScrollTopRef mediante useRef`.
- **Interfaz que monta** `SearchHeader`, `TabTitle`, `button`, `LogOut`, `ChevronLeft`, `UserIdentity`, `HeaderActions`, `HeaderPanelContainer`, `LocationPanel`, `NotificationsPanel`, `QueuePanel`.
- **Hooks que llama** `useState`, `useClienteHeader`, `useRef`, `useEffect`.
- **Usa código de** [`useClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L91) (llama), [`getTierMeta`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L74) (llama), [`getUserShortName`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L60) (llama), [`getAvatarSrc`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L116) (llama), [`SearchHeader`](../../../apps/referidos-app/src/search/SearchHeader.jsx#L3) (renderiza), [`TabTitle`](../../../apps/referidos-app/src/components/header-elements/TabTitle.jsx#L1) (renderiza), [`UserIdentity`](../../../apps/referidos-app/src/components/header-elements/UserIdentity.jsx#L3) (renderiza), [`HeaderActions`](../../../apps/referidos-app/src/components/header-elements/HeaderActions.jsx#L3) (renderiza), [`HeaderPanelContainer`](../../../apps/referidos-app/src/components/header-panels/HeaderPanelContainer.jsx#L3) (renderiza), [`LocationPanel`](../../../apps/referidos-app/src/components/header-panels/LocationPanel.jsx#L4) (renderiza) y 2 más.
- **Llamadas directas en el cuerpo** [`getTierMeta`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L40), [`getUserShortName`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L41), [`getAvatarSrc`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L44).
- **Lo usa** [`ClienteLayoutInner`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L272) (renderiza), [`HeaderCliente`](../../../apps/referidos-app/src/components/header/cliente/HeaderCliente.jsx#L7) (renderiza).

#### [`getScrollTop`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L47) · función · dentro de [`ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L23)

Obtiene o resuelve `Scroll Top` para entregarlo al consumidor.

- **Entradas** `target`.
- **Condiciones que evalúa** `target y number`.
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L78) (llama), [`handleScroll`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L80) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L54) · callback de infraestructura · dentro de [`ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L23)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClienteHeader`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `setTimeout`, `clearTimeout`.
- **Condiciones que evalúa** `locationOpen`, `ausencia de locationVisible`.
- **Llamadas directas en el cuerpo** [`setTimeout`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L57), [`clearTimeout`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L58).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L57) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L54)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setLocationVisible`.
- **Llamadas directas en el cuerpo** [`setLocationVisible`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L57).

#### [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L61) · callback de infraestructura · dentro de [`ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L23)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClienteHeader`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `setTimeout`, `clearTimeout`.
- **Condiciones que evalúa** `notificationsOpen`, `ausencia de notificationsVisible`.
- **Llamadas directas en el cuerpo** [`setTimeout`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L64), [`clearTimeout`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L65).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L64) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L61)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setNotificationsVisible`.
- **Llamadas directas en el cuerpo** [`setNotificationsVisible`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L64).

#### [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L68) · callback de infraestructura · dentro de [`ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L23)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClienteHeader`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `setTimeout`, `clearTimeout`.
- **Condiciones que evalúa** `queueOpen`, `ausencia de queueVisible`.
- **Llamadas directas en el cuerpo** [`setTimeout`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L71), [`clearTimeout`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L72).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L71) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L68)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setQueueVisible`.
- **Llamadas directas en el cuerpo** [`setQueueVisible`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L71).

#### [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L75) · callback de infraestructura · dentro de [`ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L23)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClienteHeader`.

- **Efectos y APIs** `document.addEventListener`, `document.removeEventListener`.
- **Condiciones que evalúa** `ausencia de locationOpen y ausencia de notificationsOpen y ausencia de queueOpen`.
- **Llamadas directas en el cuerpo** [`getScrollTop`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L78), [`document.addEventListener`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L92), [`document.removeEventListener`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L94).

#### [`handleScroll`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L79) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L75)

Maneja `Scroll` y coordina las acciones indicadas abajo.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setLocationOpen`, `setNotificationsOpen`, `setQueueOpen`.
- **Condiciones que evalúa** `ausencia de Number.isFinite`, `scrollDistanceRef.current`.
- **Llamadas directas en el cuerpo** [`getScrollTop`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L80), [`setLocationOpen`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L86), [`setNotificationsOpen`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L87), [`setQueueOpen`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L88).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L92) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L98) · callback de infraestructura · dentro de [`ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L23)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClienteHeader`.

- **Actualizaciones de estado o acciones** `setLocationOpen`, `setLocationVisible`, `setNotificationsOpen`, `setNotificationsVisible`, `setQueueOpen`, `setQueueVisible`.
- **Condiciones que evalúa** `mode`.
- **Llamadas directas en el cuerpo** [`setLocationOpen`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L100), [`setLocationVisible`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L101), [`setNotificationsOpen`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L102), [`setNotificationsVisible`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L103), [`setQueueOpen`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L104), [`setQueueVisible`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L105).

#### [`HeaderActions.onToggleLocation`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L157) · callback JSX · dentro de [`ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L23)

Responde al evento de interfaz `HeaderActions.onToggleLocation`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setNotificationsOpen`, `setQueueOpen`, `setLocationVisible`, `setLocationOpen`.
- **Condiciones que evalúa** `ausencia de locationOpen`.
- **Llamadas directas en el cuerpo** [`setNotificationsOpen`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L158), [`setQueueOpen`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L159), [`setLocationVisible`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L161), [`setLocationOpen`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L162).

#### [`HeaderActions.onToggleNotifications`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L180) · callback JSX · dentro de [`ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L23)

Responde al evento de interfaz `HeaderActions.onToggleNotifications`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setLocationOpen`, `setQueueOpen`, `setNotificationsVisible`, `setNotificationsOpen`.
- **Condiciones que evalúa** `ausencia de notificationsOpen`, `function`.
- **Llamadas directas en el cuerpo** [`setLocationOpen`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L181), [`setQueueOpen`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L182), [`setNotificationsVisible`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L184), [`setNotificationsOpen`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L185), [`onOpenNotifications`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L190).

#### [`HeaderActions.onToggleQueue`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L208) · callback JSX · dentro de [`ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L23)

Responde al evento de interfaz `HeaderActions.onToggleQueue`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setLocationOpen`, `setNotificationsOpen`, `setQueueVisible`, `setQueueOpen`.
- **Condiciones que evalúa** `ausencia de queueOpen`.
- **Llamadas directas en el cuerpo** [`setLocationOpen`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L209), [`setNotificationsOpen`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L210), [`setQueueVisible`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L212), [`setQueueOpen`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L213).

### [`apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L1)

Expone opciones y visibilidad de cabecera y permite que las pantallas del rol las actualicen sin remontar el layout.

**Superficie que exporta.** [`ClienteHeaderProvider`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L22), [`useClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L91).

**Módulos que lo cargan.** [`ClienteEscanerBase.jsx`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L12) (importa), [`HistorialView.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L7) (importa), [`ClienteInicio.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L17) (importa), [`ClienteHeader.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L15) (importa), [`ClienteLayout.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L8) (importa), [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L49) (importa).

**Dependencias del archivo.** `react`.

#### [`ClienteHeaderContext`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L12) · variable de módulo

Comparte el estado o valor de `Cliente Header Context` mediante contexto de React.

- **Llamadas directas en el cuerpo** [`createContext`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L12).
- **Lo usa** [`ClienteHeaderProvider`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L85) (renderiza), [`useClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L92) (referencia).

#### [`setHeaderOptions`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L19) · función

Aplica o guarda `Header Options` para que el estado refleje la operación.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`ClienteHeaderProvider`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L22) · componente React · exportado

Monta `ClienteHeaderContext.Provider`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{children}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[mode, setMode] mediante useState`, `[onSearchBack, setOnSearchBack] mediante useState`, `[headerVisible, setHeaderVisible] mediante useState`, `[headerEntering, setHeaderEntering] mediante useState`, `[profileDockOpen, setProfileDockOpen] mediante useState`, `[profileTitle, setProfileTitle] mediante useState`, `prevHeaderVisible mediante useRef`.
- **Interfaz que monta** `ClienteHeaderContext.Provider`.
- **Hooks que llama** `useState`, `useRef`, `useEffect`.
- **Lo usa** [`ClienteLayout`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L324) (renderiza).

#### [`setHeaderOptions`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L31) · callback React · dentro de [`ClienteHeaderProvider`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L22)

Aplica o guarda `Header Options` para que el estado refleje la operación.

- **Entradas** `options = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setMode`, `setOnSearchBack`, `setHeaderVisible`, `setProfileDockOpen`, `setProfileTitle`.
- **Condiciones que evalúa** `boolean`, `string`.
- **Llamadas directas en el cuerpo** [`setMode`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L33), [`setOnSearchBack`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L34), [`setHeaderVisible`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L37), [`setProfileDockOpen`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L39), [`setProfileTitle`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L42).
- **Lo usa** [`value`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L71) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L46) · callback de infraestructura · dentro de [`ClienteHeaderProvider`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L22)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClienteHeaderProvider`.

- **Actualizaciones de estado o acciones** `setHeaderEntering`, `clearTimeout`.
- **Efectos y APIs** `setTimeout`, `clearTimeout`.
- **Condiciones que evalúa** `ausencia de wasVisible y headerVisible`, `ausencia de headerVisible`.
- **Llamadas directas en el cuerpo** [`setHeaderEntering`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L49), [`setTimeout`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L50), [`clearTimeout`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L54).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L50) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L46)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setHeaderEntering`.
- **Llamadas directas en el cuerpo** [`setHeaderEntering`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L51).

#### [`value`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L64) · cálculo memorizado · dentro de [`ClienteHeaderProvider`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L22)

Función auxiliar de `ClienteHeaderProvider` para `value`.

- **Retorno visible o tipo declarado** `mode`, `onSearchBack`, `headerVisible`, `headerEntering`, `profileDockOpen`, `profileTitle`, `setHeaderOptions`.
- **Hooks que llama** `useMemo`.
- **Lo usa** [`ClienteHeaderProvider`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L85) (pasa a value).

#### [`useClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L91) · hook React · exportado

Agrupa estado, contexto o efectos de `Cliente Header` para sus consumidores React.

- **Hooks que llama** `useContext`.
- **Lo usa** [`ClienteEscanerBase`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L17) (llama), [`HistorialView`](../../../apps/referidos-app/src/cliente/historial/HistorialView.jsx#L51) (llama), [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L64) (llama), [`ClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeader.jsx#L37) (llama), [`ClienteLayoutInner`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L43) (llama), [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L141) (llama).
