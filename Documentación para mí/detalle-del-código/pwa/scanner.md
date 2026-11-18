# PWA principal · Escáner

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/scanner/blocks/ScannerCameraBlock.jsx`](../../../apps/referidos-app/src/scanner/blocks/ScannerCameraBlock.jsx#L1)
- [`apps/referidos-app/src/scanner/blocks/ScannerHeader.jsx`](../../../apps/referidos-app/src/scanner/blocks/ScannerHeader.jsx#L1)
- [`apps/referidos-app/src/scanner/blocks/ScannerManualEntry.jsx`](../../../apps/referidos-app/src/scanner/blocks/ScannerManualEntry.jsx#L1)
- [`apps/referidos-app/src/scanner/blocks/ScannerPermissionCard.jsx`](../../../apps/referidos-app/src/scanner/blocks/ScannerPermissionCard.jsx#L1)
- [`apps/referidos-app/src/scanner/blocks/ScannerPermissionIntro.jsx`](../../../apps/referidos-app/src/scanner/blocks/ScannerPermissionIntro.jsx#L1)
- [`apps/referidos-app/src/scanner/blocks/ScannerProcessingHint.jsx`](../../../apps/referidos-app/src/scanner/blocks/ScannerProcessingHint.jsx#L1)
- [`apps/referidos-app/src/scanner/blocks/ScannerResultCard.jsx`](../../../apps/referidos-app/src/scanner/blocks/ScannerResultCard.jsx#L1)
- [`apps/referidos-app/src/scanner/blocks/ScannerStatusBanner.jsx`](../../../apps/referidos-app/src/scanner/blocks/ScannerStatusBanner.jsx#L1)
- [`apps/referidos-app/src/scanner/constants/scannerCopy.ts`](../../../apps/referidos-app/src/scanner/constants/scannerCopy.ts#L1)
- [`apps/referidos-app/src/scanner/constants/scannerTypes.ts`](../../../apps/referidos-app/src/scanner/constants/scannerTypes.ts#L1)
- [`apps/referidos-app/src/scanner/EscanerCamera.jsx`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L1)
- [`apps/referidos-app/src/scanner/EscanerFallback.jsx`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L1)
- [`apps/referidos-app/src/scanner/EscanerPermisos.jsx`](../../../apps/referidos-app/src/scanner/EscanerPermisos.jsx#L1)
- [`apps/referidos-app/src/scanner/EscanerView.jsx`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L1)
- [`apps/referidos-app/src/scanner/hooks/useScannerState.ts`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L1)
- [`apps/referidos-app/src/scanner/ScannerView.jsx`](../../../apps/referidos-app/src/scanner/ScannerView.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/scanner/blocks/ScannerCameraBlock.jsx`](../../../apps/referidos-app/src/scanner/blocks/ScannerCameraBlock.jsx#L1)

Aísla la interfaz y componentes del área de captura para que el hook de estado permanezca reutilizable.

**Superficie que exporta.** [`ScannerCameraBlock`](../../../apps/referidos-app/src/scanner/blocks/ScannerCameraBlock.jsx#L4).

**Módulos que lo cargan.** [`ClienteEscanerBase.jsx`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L3) (importa), [`NegocioEscanerBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L3) (importa).

**Dependencias del archivo.** `react`, [`../EscanerCamera`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx).

#### [`ScannerCameraBlock`](../../../apps/referidos-app/src/scanner/blocks/ScannerCameraBlock.jsx#L4) · componente React · exportación por defecto

Monta `EscanerCamera`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{active, disabled, onDetected, onSupportChange, onPermissionChange, onFallback, onStatus}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `EscanerCamera`.
- **Usa código de** [`EscanerCamera`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L3) (renderiza).
- **Lo usa** [`ClienteEscanerBase`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L83) (renderiza), [`NegocioEscanerBase`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L85) (renderiza).

### [`apps/referidos-app/src/scanner/blocks/ScannerHeader.jsx`](../../../apps/referidos-app/src/scanner/blocks/ScannerHeader.jsx#L1)

Define la cabecera y el contexto visible de la operación de escaneo.

**Superficie que exporta.** [`ScannerHeader`](../../../apps/referidos-app/src/scanner/blocks/ScannerHeader.jsx#L3).

**Módulos que lo cargan.** [`ClienteEscanerBase.jsx`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L4) (importa), [`NegocioEscanerBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L4) (importa).

**Dependencias del archivo.** `react`.

#### [`ScannerHeader`](../../../apps/referidos-app/src/scanner/blocks/ScannerHeader.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{title, right}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`ClienteEscanerBase`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L70) (renderiza), [`NegocioEscanerBase`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L72) (renderiza).

### [`apps/referidos-app/src/scanner/blocks/ScannerManualEntry.jsx`](../../../apps/referidos-app/src/scanner/blocks/ScannerManualEntry.jsx#L1)

Recoge el código y llama al mismo procesador usado por el flujo de cámara.

**Superficie que exporta.** [`ScannerManualEntry`](../../../apps/referidos-app/src/scanner/blocks/ScannerManualEntry.jsx#L4).

**Módulos que lo cargan.** [`ClienteEscanerBase.jsx`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L5) (importa), [`NegocioEscanerBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L5) (importa).

**Dependencias del archivo.** `react`, [`../EscanerFallback`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx).

#### [`ScannerManualEntry`](../../../apps/referidos-app/src/scanner/blocks/ScannerManualEntry.jsx#L4) · componente React · exportación por defecto

Monta `EscanerFallback`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{value, onChange, onSubmit, disabled}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `EscanerFallback`.
- **Usa código de** [`EscanerFallback`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L4) (renderiza).
- **Lo usa** [`ClienteEscanerBase`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L115) (renderiza), [`NegocioEscanerBase`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L117) (renderiza).

### [`apps/referidos-app/src/scanner/blocks/ScannerPermissionCard.jsx`](../../../apps/referidos-app/src/scanner/blocks/ScannerPermissionCard.jsx#L1)

Informa permisos y acciones si la cámara está bloqueada o requiere intervención.

**Superficie que exporta.** [`ScannerPermissionCard`](../../../apps/referidos-app/src/scanner/blocks/ScannerPermissionCard.jsx#L4).

**Módulos que lo cargan.** [`ClienteEscanerBase.jsx`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L6) (importa), [`NegocioEscanerBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L6) (importa).

**Dependencias del archivo.** `react`, [`../EscanerPermisos`](../../../apps/referidos-app/src/scanner/EscanerPermisos.jsx).

#### [`ScannerPermissionCard`](../../../apps/referidos-app/src/scanner/blocks/ScannerPermissionCard.jsx#L4) · componente React · exportación por defecto

Monta `EscanerPermisos`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{canScan, camGranted, onManual, onRequestCamera, showButton, manualDisabled, manualOpen, manualContent}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `EscanerPermisos`.
- **Usa código de** [`EscanerPermisos`](../../../apps/referidos-app/src/scanner/EscanerPermisos.jsx#L4) (renderiza).
- **Lo usa** [`ClienteEscanerBase`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L106) (renderiza), [`NegocioEscanerBase`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L108) (renderiza).

### [`apps/referidos-app/src/scanner/blocks/ScannerPermissionIntro.jsx`](../../../apps/referidos-app/src/scanner/blocks/ScannerPermissionIntro.jsx#L1)

Presenta la introducción antes de solicitar el permiso de cámara.

**Superficie que exporta.** [`ScannerPermissionIntro`](../../../apps/referidos-app/src/scanner/blocks/ScannerPermissionIntro.jsx#L4).

**Módulos que lo cargan.** [`ClienteEscanerBase.jsx`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L7) (importa), [`NegocioEscanerBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L7) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`ScannerPermissionIntro`](../../../apps/referidos-app/src/scanner/blocks/ScannerPermissionIntro.jsx#L4) · componente React · exportación por defecto

Monta `Camera`, `QrCode`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, description, primaryLabel, secondaryLabel, onPrimary, onSecondary}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Camera`, `QrCode`, `button`.
- **Lo usa** [`ClienteEscanerBase`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L95) (renderiza), [`NegocioEscanerBase`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L97) (renderiza).

### [`apps/referidos-app/src/scanner/blocks/ScannerProcessingHint.jsx`](../../../apps/referidos-app/src/scanner/blocks/ScannerProcessingHint.jsx#L1)

Indica el estado ocupado durante el procesamiento de un código.

**Superficie que exporta.** [`ScannerProcessingHint`](../../../apps/referidos-app/src/scanner/blocks/ScannerProcessingHint.jsx#L3).

**Módulos que lo cargan.** [`ClienteEscanerBase.jsx`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L8) (importa), [`NegocioEscanerBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L8) (importa).

**Dependencias del archivo.** `react`.

#### [`ScannerProcessingHint`](../../../apps/referidos-app/src/scanner/blocks/ScannerProcessingHint.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{label}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`ClienteEscanerBase`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L74) (renderiza), [`NegocioEscanerBase`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L76) (renderiza).

### [`apps/referidos-app/src/scanner/blocks/ScannerResultCard.jsx`](../../../apps/referidos-app/src/scanner/blocks/ScannerResultCard.jsx#L1)

Muestra el resultado estructurado que entrega el canje de QR.

**Superficie que exporta.** [`ScannerResultCard`](../../../apps/referidos-app/src/scanner/blocks/ScannerResultCard.jsx#L4).

**Módulos que lo cargan.** [`ClienteEscanerBase.jsx`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L9) (importa), [`NegocioEscanerBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L9) (importa).

**Dependencias del archivo.** `react`, [`../../utils/sanitize`](../../../apps/referidos-app/src/utils/sanitize.js).

#### [`ScannerResultCard`](../../../apps/referidos-app/src/scanner/blocks/ScannerResultCard.jsx#L4) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{data, labels}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Condiciones que evalúa** `ausencia de data`.
- **Usa código de** [`sanitizeText`](../../../apps/referidos-app/src/utils/sanitize.js#L2) (llama).
- **Llamadas directas en el cuerpo** [`sanitizeText`](../../../apps/referidos-app/src/scanner/blocks/ScannerResultCard.jsx#L45), [`toLocaleTimeString`](../../../apps/referidos-app/src/scanner/blocks/ScannerResultCard.jsx#L55).
- **Lo usa** [`ClienteEscanerBase`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L129) (renderiza), [`NegocioEscanerBase`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L131) (renderiza).

### [`apps/referidos-app/src/scanner/blocks/ScannerStatusBanner.jsx`](../../../apps/referidos-app/src/scanner/blocks/ScannerStatusBanner.jsx#L1)

Traduce un estado de procesamiento en texto y estilo de mensaje de la interfaz.

**Superficie que exporta.** [`ScannerStatusBanner`](../../../apps/referidos-app/src/scanner/blocks/ScannerStatusBanner.jsx#L10).

**Dependencias del archivo.** `react`.

#### [`STATUS_STYLES`](../../../apps/referidos-app/src/scanner/blocks/ScannerStatusBanner.jsx#L3) · variable de módulo

Agrupa la configuración o catálogo de `STATUS STYLES` para que sus consumidores lean claves comunes.

- **Campos o contexto** `info`, `valido`, `canjeado`, `expirado`.
- **Lo usa** [`ScannerStatusBanner`](../../../apps/referidos-app/src/scanner/blocks/ScannerStatusBanner.jsx#L12) (accede al módulo).

#### [`ScannerStatusBanner`](../../../apps/referidos-app/src/scanner/blocks/ScannerStatusBanner.jsx#L10) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{message, type}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Condiciones que evalúa** `ausencia de message`.

### [`apps/referidos-app/src/scanner/constants/scannerCopy.ts`](../../../apps/referidos-app/src/scanner/constants/scannerCopy.ts#L1)

Textos por rol y estado para cámara, entrada manual, validación y canje.

**Superficie que exporta.** [`scannerCopy`](../../../apps/referidos-app/src/scanner/constants/scannerCopy.ts#L3).

**Módulos que lo cargan.** [`ClienteEscanerBase.jsx`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L10) (importa), [`NegocioEscanerBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L10) (importa), [`useScannerState.ts`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L6) (importa).

**Dependencias del archivo.** [`./scannerTypes`](../../../apps/referidos-app/src/scanner/constants/scannerTypes.ts).

#### [`scannerCopy`](../../../apps/referidos-app/src/scanner/constants/scannerCopy.ts#L3) · variable de módulo · exportado

Agrupa la configuración o catálogo de `scanner Copy` para que sus consumidores lean claves comunes.

- **Campos o contexto** `header`, `permissionIntro`, `processingHint`, `status`, `resultCard`.
- **Usa código de** [`ScannerCopy`](../../../apps/referidos-app/src/scanner/constants/scannerTypes.ts#L10) (referencia).
- **Lo usa** [`ClienteEscanerBase`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L43) (accede al módulo), [`NegocioEscanerBase`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L44) (accede al módulo), [`useScannerState`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L27) (referencia).

### [`apps/referidos-app/src/scanner/constants/scannerTypes.ts`](../../../apps/referidos-app/src/scanner/constants/scannerTypes.ts#L1)

Contratos TypeScript para rol, códigos, estado y datos de escaneo y presentación.

**Superficie que exporta.** [`ScannerRole`](../../../apps/referidos-app/src/scanner/constants/scannerTypes.ts#L1), [`ScannerStatusType`](../../../apps/referidos-app/src/scanner/constants/scannerTypes.ts#L3), [`ScannerParsedCode`](../../../apps/referidos-app/src/scanner/constants/scannerTypes.ts#L5), [`ScannerCopy`](../../../apps/referidos-app/src/scanner/constants/scannerTypes.ts#L10).

**Módulos que lo cargan.** [`scannerCopy.ts`](../../../apps/referidos-app/src/scanner/constants/scannerCopy.ts#L1) (importa tipo), [`useScannerState.ts`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L7) (importa tipo).

#### [`ScannerRole`](../../../apps/referidos-app/src/scanner/constants/scannerTypes.ts#L1) · tipo TypeScript · exportado

Describe la forma del contrato de `Scanner Role`. TypeScript lo comprueba al compilar.

- **Lo usa** [`ScannerStateOptions`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L23) (referencia).

#### [`ScannerStatusType`](../../../apps/referidos-app/src/scanner/constants/scannerTypes.ts#L3) · tipo TypeScript · exportado

Describe la forma del contrato de `Scanner Status Type`. TypeScript lo comprueba al compilar.

- **Lo usa** [`useScannerState`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L44) (referencia).

#### [`ScannerParsedCode`](../../../apps/referidos-app/src/scanner/constants/scannerTypes.ts#L5) · tipo TypeScript · exportado

Describe la forma del contrato de `Scanner Parsed Code`, con campos `type`, `code`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `type`, `code`.
- **Lo usa** [`parseCode`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L14) (referencia).

#### [`ScannerCopy`](../../../apps/referidos-app/src/scanner/constants/scannerTypes.ts#L10) · tipo TypeScript · exportado

Describe la forma del contrato de `Scanner Copy`, con campos `header`, `permissionIntro`, `processingHint`, `status`, `resultCard`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `header`, `permissionIntro`, `processingHint`, `status`, `resultCard`.
- **Lo usa** [`scannerCopy`](../../../apps/referidos-app/src/scanner/constants/scannerCopy.ts#L3) (referencia), [`ScannerStateOptions`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L24) (referencia).

### [`apps/referidos-app/src/scanner/EscanerCamera.jsx`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L1)

Componente de captura web que abre cámara, detecta contenido y libera recursos cuando termina su ciclo.

**Superficie que exporta.** [`EscanerCamera`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L3).

**Módulos que lo cargan.** [`EscanerView.jsx`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L7) (importa), [`ScannerCameraBlock.jsx`](../../../apps/referidos-app/src/scanner/blocks/ScannerCameraBlock.jsx#L2) (importa).

**Dependencias del archivo.** `react`.

#### [`EscanerCamera`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L3) · componente React · exportación por defecto

Monta `video`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{active, disabled, onDetected, onSupportChange, onPermissionChange, onFallback, onStatus}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `videoRef mediante useRef`, `detectorRef mediante useRef`, `rafRef mediante useRef`, `streamRef mediante useRef`, `disabledRef mediante useRef`.
- **Interfaz que monta** `video`.
- **Hooks que llama** `useRef`, `useEffect`.
- **Lo usa** [`EscanerView`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L281) (renderiza), [`ScannerCameraBlock`](../../../apps/referidos-app/src/scanner/blocks/ScannerCameraBlock.jsx#L15) (renderiza).

#### [`useEffect · callback`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L18) · callback de infraestructura · dentro de [`EscanerCamera`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L3)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `EscanerCamera`.

- **Condiciones que evalúa** `ausencia de active`, `rafRef.current`, `streamRef.current`.
- **Llamadas directas en el cuerpo** [`start`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L69), [`cancelAnimationFrame`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L73), [`forEach`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L75), [`streamRef.current.getTracks`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L75), [`track.stop`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L75).

#### [`start`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L22) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L18)

Función auxiliar de `useEffect · callback` para `start`.

- **Efectos y APIs** `navigator.mediaDevices.getUserMedia`.
- **Condiciones que evalúa** `supportsBarcode`, `cancelled`, `videoRef.current`.
- **Llamadas directas en el cuerpo** [`onSupportChange`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L25), [`navigator.mediaDevices.getUserMedia`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L32), [`onPermissionChange`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L37), [`scanLoop`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L42), [`onFallback`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L45), [`onStatus`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L46).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L69) (llama).

#### [`scanLoop`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L50) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L18)

Función auxiliar de `useEffect · callback` para `scan Loop`.

- **Efectos y APIs** `requestAnimationFrame`.
- **Condiciones que evalúa** `ausencia de disabledRef.current y detectorRef.current y videoRef.current.readyState`, `codes.length`.
- **Llamadas directas en el cuerpo** [`detectorRef.current.detect`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L57), [`onDetected`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L59), [`onStatus`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L63), [`requestAnimationFrame`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L65).
- **Lo usa** [`start`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L42) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L80) · callback de infraestructura · dentro de [`EscanerCamera`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L3)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `EscanerCamera`.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

### [`apps/referidos-app/src/scanner/EscanerFallback.jsx`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L1)

Ofrece una entrada alternativa cuando el flujo automático de escaneo no resulta disponible.

**Superficie que exporta.** [`EscanerFallback`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L4).

**Módulos que lo cargan.** [`EscanerView.jsx`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L9) (importa), [`ScannerManualEntry.jsx`](../../../apps/referidos-app/src/scanner/blocks/ScannerManualEntry.jsx#L2) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`EscanerFallback`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L4) · componente React · exportación por defecto

Monta `input`, `button`, `Check`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{value, onChange, onSubmit, disabled}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `inputRefs mediante useRef`, `rowRef mediante useRef`.
- **Interfaz que monta** `input`, `button`, `Check`.
- **Hooks que llama** `useRef`.
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L92), [`slots.slice`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L92).
- **Lo usa** [`EscanerView`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L361) (renderiza), [`ScannerManualEntry`](../../../apps/referidos-app/src/scanner/blocks/ScannerManualEntry.jsx#L12) (renderiza).

#### [`sanitized`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L14) · cálculo memorizado · dentro de [`EscanerFallback`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L4)

Función auxiliar de `EscanerFallback` para `sanitized`.

- **Hooks que llama** `useMemo`.
- **Efectos y APIs** `replace`.
- **Llamadas directas en el cuerpo** [`slice`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L14), [`replace`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L14).
- **Lo usa** [`slots`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L20) (accede al módulo).

#### [`slots`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L18) · cálculo memorizado · dentro de [`EscanerFallback`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L4)

Función auxiliar de `EscanerFallback` para `slots`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`fill`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L19).
- **Lo usa** [`getFirstEmptyIndex`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L33) (accede al módulo), [`getLastFilledIndex`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L38) (accede al módulo), [`updateSlot`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L49) (referencia), [`handleKeyDown`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L71) (referencia), [`EscanerFallback`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L92) (accede al módulo), [`input.onPointerDown`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L102) (accede al módulo), [`input.onPointerDown`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L126) (accede al módulo).

#### [`focusInput`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L26) · función · dentro de [`EscanerFallback`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L4)

Función auxiliar de `EscanerFallback` para `focus Input`.

- **Entradas** `index`.
- **Efectos y APIs** `window.requestAnimationFrame`.
- **Llamadas directas en el cuerpo** [`window.requestAnimationFrame`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L27), [`inputRefs.current.index.focus`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L28).
- **Lo usa** [`updateSlot`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L60) (llama), [`handleKeyDown`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L74) (llama).

#### [`getFirstEmptyIndex`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L33) · callback React · dentro de [`EscanerFallback`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L4)

Obtiene o resuelve `First Empty Index` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`slots.findIndex`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L33).
- **Lo usa** [`updateSlot`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L50) (llama), [`input.onPointerDown`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L100) (llama), [`input.onPointerDown`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L124) (llama).

#### [`getLastFilledIndex`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L37) · callback React · dentro de [`EscanerFallback`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L4)

Obtiene o resuelve `Last Filled Index` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `slots.i`.
- **Lo usa** [`handleKeyDown`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L69) (llama).

#### [`updateSlot`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L44) · función · dentro de [`EscanerFallback`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L4)

Aplica o guarda `Slot` para que el estado refleje la operación.

- **Entradas** `index`, `nextValue`.
- **Efectos y APIs** `replace`.
- **Condiciones que evalúa** `ausencia de cleaned`, `cursor`.
- **Llamadas directas en el cuerpo** [`replace`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L45), [`cleaned.split`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L48), [`getFirstEmptyIndex`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L50), [`chars.forEach`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L52), [`onChange`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L58), [`nextSlots.join`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L58), [`focusInput`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L60), [`inputRefs.current.blur`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L62).
- **Lo usa** [`input.onChange`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L96) (llama), [`input.onChange`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L120) (llama).

#### [`handleKeyDown`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L66) · función · dentro de [`EscanerFallback`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L4)

Atiende `input.onKeyDown` y aplica la acción vinculada a ese control.

- **Entradas** `event`.
- **Recibe eventos de** `input.onKeyDown`.
- **Condiciones que evalúa** `event.key`, `lastFilled`.
- **Llamadas directas en el cuerpo** [`event.preventDefault`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L68), [`getLastFilledIndex`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L69), [`onChange`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L73), [`nextSlots.join`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L73), [`focusInput`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L74).
- **Lo usa** [`EscanerFallback`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L97) (pasa a onKeyDown).

#### [`handleInputFocus`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L78) · callback React · dentro de [`EscanerFallback`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L4)

Atiende `input.onFocus` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `input.onFocus`.
- **Hooks que llama** `useCallback`.
- **Lo usa** [`EscanerFallback`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L105) (pasa a onFocus).

#### [`input.onChange`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L96) · callback JSX · dentro de [`EscanerFallback`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L4)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Llamadas directas en el cuerpo** [`updateSlot`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L96).

#### [`input.onPointerDown`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L98) · callback JSX · dentro de [`EscanerFallback`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L4)

Responde al evento de interfaz `input.onPointerDown`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Llamadas directas en el cuerpo** [`e.preventDefault`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L99), [`getFirstEmptyIndex`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L100), [`inputRefs.current.targetIndex.focus`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L103).

#### [`input.onChange`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L120) · callback JSX · dentro de [`EscanerFallback`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L4)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Llamadas directas en el cuerpo** [`updateSlot`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L120).

#### [`input.onPointerDown`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L122) · callback JSX · dentro de [`EscanerFallback`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L4)

Responde al evento de interfaz `input.onPointerDown`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Llamadas directas en el cuerpo** [`e.preventDefault`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L123), [`getFirstEmptyIndex`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L124), [`inputRefs.current.targetIndex.focus`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L127).

### [`apps/referidos-app/src/scanner/EscanerPermisos.jsx`](../../../apps/referidos-app/src/scanner/EscanerPermisos.jsx#L1)

Composición para explicar y solicitar el permiso de cámara en la variante de escáner correspondiente.

**Superficie que exporta.** [`EscanerPermisos`](../../../apps/referidos-app/src/scanner/EscanerPermisos.jsx#L4).

**Módulos que lo cargan.** [`EscanerView.jsx`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L8) (importa), [`ScannerPermissionCard.jsx`](../../../apps/referidos-app/src/scanner/blocks/ScannerPermissionCard.jsx#L2) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`EscanerPermisos`](../../../apps/referidos-app/src/scanner/EscanerPermisos.jsx#L4) · componente React · exportación por defecto

Monta `CameraOff`, `ShieldAlert`, `button`, `Settings`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{camSupported, camGranted, onManual, onRequestCamera, showButton, manualDisabled, manualOpen, manualContent}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Interfaz que monta** `CameraOff`, `ShieldAlert`, `button`, `Settings`.
- **Condiciones que evalúa** `camSupported y camGranted`.
- **Lo usa** [`EscanerView`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L351) (renderiza), [`ScannerPermissionCard`](../../../apps/referidos-app/src/scanner/blocks/ScannerPermissionCard.jsx#L21) (renderiza).

### [`apps/referidos-app/src/scanner/EscanerView.jsx`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L1)

Entrada de la interfaz de escaneo con la API de la variante Escaner. Confirma el import real frente al ScannerView usado por las bases.

**Superficie que exporta.** [`EscanerView`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L72).

**Dependencias del archivo.** `react`, `lucide-react`, [`../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../services/qrService`](../../../apps/referidos-app/src/services/qrService.js), [`../utils/errorUtils`](../../../apps/referidos-app/src/utils/errorUtils.js), [`../utils/sanitize`](../../../apps/referidos-app/src/utils/sanitize.js), [`./EscanerCamera`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx), [`./EscanerPermisos`](../../../apps/referidos-app/src/scanner/EscanerPermisos.jsx), [`./EscanerFallback`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx).

#### [`parseCode`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L12) · función

Extrae o interpreta `Code` de los argumentos, estado o datos de entrada.

- **Entradas** `raw`.
- **Retorno visible o tipo declarado** `type`, `code`.
- **Condiciones que evalúa** `ausencia de raw`, `value.startsWith`.
- **Llamadas directas en el cuerpo** [`raw.trim`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L14), [`value.startsWith`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L15).
- **Lo usa** [`handleCode`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L175) (llama).

#### [`ResultCard`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L20) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{data}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Condiciones que evalúa** `ausencia de data`.
- **Usa código de** [`sanitizeText`](../../../apps/referidos-app/src/utils/sanitize.js#L2) (llama).
- **Llamadas directas en el cuerpo** [`sanitizeText`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L49), [`toLocaleTimeString`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L59).
- **Lo usa** [`EscanerView`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L377) (renderiza).

#### [`EscanerView`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L72) · componente React · exportación por defecto

Monta `EscanerCamera`, `Camera`, `QrCode`, `button`, `EscanerPermisos`, `EscanerFallback`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `scannerPermissionPrompted mediante useAppStore`, `selector s.scannerPermissionPrompted`, `setScannerPermissionPrompted mediante useAppStore`, `selector s.setScannerPermissionPrompted`, `manualFallbackShown mediante useAppStore`, `selector s.scannerManualFallbackShown`, `setManualFallbackShown mediante useAppStore`, `selector s.setScannerManualFallbackShown`, `[cameraAvailable, setCameraAvailable] mediante useState`, `[scanSupported, setScanSupported] mediante useState`, `[camGranted, setCamGranted] mediante useState`, `[manualValue, setManualValue] mediante useState` y 5 más.
- **Interfaz que monta** `EscanerCamera`, `Camera`, `QrCode`, `button`, `EscanerPermisos`, `EscanerFallback`, `ResultCard`.
- **Hooks que llama** `useAppStore`, `useState`, `useEffect`.
- **Efectos y APIs** `manualValue.replace`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`EscanerCamera`](../../../apps/referidos-app/src/scanner/EscanerCamera.jsx#L3) (renderiza), [`EscanerPermisos`](../../../apps/referidos-app/src/scanner/EscanerPermisos.jsx#L4) (renderiza), [`EscanerFallback`](../../../apps/referidos-app/src/scanner/EscanerFallback.jsx#L4) (renderiza).
- **Llamadas directas en el cuerpo** [`manualValue.replace`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L239).

#### [`useEffect · callback`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L97) · callback de infraestructura · dentro de [`EscanerView`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L72)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `EscanerView`.

- **Actualizaciones de estado o acciones** `setScanSupported`.
- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`setScanSupported`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L99).

#### [`useEffect · callback`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L102) · callback de infraestructura · dentro de [`EscanerView`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L72)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `EscanerView`.

- **Actualizaciones de estado o acciones** `setCameraAvailable`.
- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`setCameraAvailable`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L104).

#### [`useEffect · callback`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L107) · callback de infraestructura · dentro de [`EscanerView`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L72)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `EscanerView`.

- **Actualizaciones de estado o acciones** `setCamGranted`, `setScannerPermissionPrompted`.
- **Efectos y APIs** `navigator.permissions.query`.
- **Condiciones que evalúa** `undefined`, `ausencia de navigator.permissions.query`, `ausencia de active`, `status.state`, `ausencia de scannerPermissionPrompted`.
- **Llamadas directas en el cuerpo** [`catch`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L111), [`then`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L111), [`navigator.permissions.query`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L111), [`setCamGranted`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L116), [`setScannerPermissionPrompted`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L118).

#### [`isPwaAndroid`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L133) · cálculo memorizado · dentro de [`EscanerView`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L72)

Comprueba `Pwa Android` para decidir si se admite o continúa la operación.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`window.matchMedia`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L138), [`test`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L141).
- **Lo usa** [`requestCameraPermission`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L148) (referencia).

#### [`requestCameraPermission`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L145) · callback React · dentro de [`EscanerView`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L72)

Atiende `button.onClick`, `EscanerPermisos.onRequestCamera` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`, `EscanerPermisos.onRequestCamera`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setScannerPermissionPrompted`, `window.location.href`, `setCameraAvailable`, `setCamGranted`.
- **Efectos y APIs** `navigator.mediaDevices.getUserMedia`.
- **Condiciones que evalúa** `undefined`, `isPwaAndroid`, `ausencia de navigator.mediaDevices.getUserMedia`.
- **Llamadas directas en el cuerpo** [`setScannerPermissionPrompted`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L146), [`setCameraAvailable`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L154), [`setCamGranted`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L155), [`catch`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L158), [`then`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L158), [`navigator.mediaDevices.getUserMedia`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L158), [`forEach`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L161), [`stream.getTracks`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L161), [`track.stop`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L161).
- **Lo usa** [`EscanerView`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L325) (pasa a onClick).

#### [`handleCode`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L169) · función · asíncrona · dentro de [`EscanerView`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L72)

Atiende `EscanerCamera.onDetected` y aplica la acción vinculada a ese control.

- **Entradas** `raw`.
- **Recibe eventos de** `EscanerCamera.onDetected`.
- **Actualizaciones de estado o acciones** `setProcessing`, `setStatusMsg`, `setResult`, `setStatusType`.
- **Condiciones que evalúa** `ausencia de raw o processing`, `ausencia de isNegocio`, `parsed.type`, `ausencia de ok`, `error.includes`, `data.status`.
- **Usa código de** [`redeemValidQr`](../../../apps/referidos-app/src/services/qrService.js#L119) (llama), [`handleError`](../../../apps/referidos-app/src/utils/errorUtils.js#L4) (llama).
- **Llamadas directas en el cuerpo** [`setProcessing`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L171), [`setStatusMsg`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L172), [`setResult`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L173), [`parseCode`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L175), [`setStatusType`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L182), [`redeemValidQr`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L192), [`error.includes`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L194), [`handleError`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L224).
- **Lo usa** [`EscanerView`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L284) (pasa a onDetected), [`EscanerFallback.onSubmit`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L364) (llama).

#### [`handleManualOpen`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L242) · callback React · dentro de [`EscanerView`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L72)

Atiende `EscanerPermisos.onManual` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `EscanerPermisos.onManual`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setManualRequested`, `setManualFallbackShown`.
- **Condiciones que evalúa** `manualRequested`.
- **Llamadas directas en el cuerpo** [`setManualRequested`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L244), [`setManualFallbackShown`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L245).
- **Lo usa** [`EscanerView`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L354) (pasa a onManual).

#### [`EscanerCamera.onFallback`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L287) · callback JSX · dentro de [`EscanerView`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L72)

Responde al evento de interfaz `EscanerCamera.onFallback`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setCamGranted`.
- **Llamadas directas en el cuerpo** [`setCamGranted`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L288).

#### [`EscanerCamera.onStatus`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L290) · callback JSX · dentro de [`EscanerView`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L72)

Responde al evento de interfaz `EscanerCamera.onStatus`. La lógica ocurre al interactuar con ese control.

- **Entradas** `msg`.
- **Actualizaciones de estado o acciones** `setStatusMsg`, `setStatusType`.
- **Llamadas directas en el cuerpo** [`setStatusMsg`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L291), [`setStatusType`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L292).

#### [`button.onClick`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L332) · callback JSX · dentro de [`EscanerView`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L72)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setScannerPermissionPrompted`.
- **Llamadas directas en el cuerpo** [`setScannerPermissionPrompted`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L332).

#### [`EscanerFallback.onSubmit`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L364) · callback JSX · dentro de [`EscanerView`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L72)

Responde al evento de interfaz `EscanerFallback.onSubmit`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleCode`](../../../apps/referidos-app/src/scanner/EscanerView.jsx#L364).

### [`apps/referidos-app/src/scanner/hooks/useScannerState.ts`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L1)

Coordina medios disponibles, permisos, análisis de QR, estado pendiente y llamada de canje para negocio. Cliente recibe información local del tipo de QR.

**Superficie que exporta.** [`useScannerState`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L27).

**Módulos que lo cargan.** [`ClienteEscanerBase.jsx`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L11) (importa), [`NegocioEscanerBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L11) (importa).

**Dependencias del archivo.** `react`, [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../../services/qrService`](../../../apps/referidos-app/src/services/qrService.js), [`../../services/loggingClient`](../../../apps/referidos-app/src/services/loggingClient.js), [`../../utils/errorUtils`](../../../apps/referidos-app/src/utils/errorUtils.js), [`../constants/scannerCopy`](../../../apps/referidos-app/src/scanner/constants/scannerCopy.ts), [`../constants/scannerTypes`](../../../apps/referidos-app/src/scanner/constants/scannerTypes.ts).

#### [`parseCode`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L14) · función

Extrae o interpreta `Code` de los argumentos, estado o datos de entrada.

- **Entradas** `raw`.
- **Retorno visible o tipo declarado** `ScannerParsedCode`, `type`, `code`.
- **Condiciones que evalúa** `ausencia de raw`, `value.startsWith`.
- **Usa código de** [`ScannerParsedCode`](../../../apps/referidos-app/src/scanner/constants/scannerTypes.ts#L5) (referencia).
- **Llamadas directas en el cuerpo** [`raw.trim`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L16), [`value.startsWith`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L17).
- **Lo usa** [`handleCode`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L169) (llama).

#### [`ScannerStateOptions`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L22) · tipo TypeScript

Describe la forma del contrato de `Scanner State Options`, con campos `role`, `copy`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `role`, `copy`.
- **Usa código de** [`ScannerRole`](../../../apps/referidos-app/src/scanner/constants/scannerTypes.ts#L1) (referencia), [`ScannerCopy`](../../../apps/referidos-app/src/scanner/constants/scannerTypes.ts#L10) (referencia).

#### [`useScannerState`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L27) · hook React · exportado

Agrupa estado, contexto o efectos de `Scanner State` para sus consumidores React.

- **Entradas** `{role, copy}`.
- **Retorno visible o tipo declarado** `cameraAvailable`, `scanSupported`, `camGranted`, `setScanSupported`, `setCamGranted`, `manualValue`, `setManualValue`, `statusMsg`, `statusType`, `setStatusMsg`, `setStatusType`, `result`, `processing`, `manualRequested`, `canScan`, `showCamera`, `showPermissionIntro`, `showPermisos` y 8 más.
- **Estado o valores vinculados** `scannerPermissionPrompted mediante useAppStore`, `selector s.scannerPermissionPrompted`, `setScannerPermissionPrompted mediante useAppStore`, `selector s.setScannerPermissionPrompted`, `manualFallbackShown mediante useAppStore`, `selector s.scannerManualFallbackShown`, `setManualFallbackShown mediante useAppStore`, `selector s.setScannerManualFallbackShown`, `[cameraAvailable, setCameraAvailable] mediante useState`, `[scanSupported, setScanSupported] mediante useState`, `[camGranted, setCamGranted] mediante useState`, `[manualValue, setManualValue] mediante useState`, `[statusMsg, setStatusMsg] mediante useState`, `[statusType, setStatusType] mediante useState` y 3 más.
- **Hooks que llama** `useAppStore`, `useState`, `useEffect`.
- **Efectos y APIs** `manualValue.replace`.
- **Usa código de** [`scannerCopy`](../../../apps/referidos-app/src/scanner/constants/scannerCopy.ts#L3) (referencia), [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`ScannerStatusType`](../../../apps/referidos-app/src/scanner/constants/scannerTypes.ts#L3) (referencia).
- **Llamadas directas en el cuerpo** [`manualValue.replace`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L268).
- **Lo usa** [`ClienteEscanerBase`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L41) (llama), [`NegocioEscanerBase`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L41) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L50) · callback de infraestructura · dentro de [`useScannerState`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L27)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useScannerState`.

- **Actualizaciones de estado o acciones** `setScanSupported`.
- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`setScanSupported`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L52).

#### [`useEffect · callback`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L55) · callback de infraestructura · dentro de [`useScannerState`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L27)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useScannerState`.

- **Actualizaciones de estado o acciones** `setCameraAvailable`.
- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`setCameraAvailable`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L57).

#### [`useEffect · callback`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L60) · callback de infraestructura · dentro de [`useScannerState`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L27)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useScannerState`.

- **Actualizaciones de estado o acciones** `setCamGranted`, `setScannerPermissionPrompted`.
- **Efectos y APIs** `navigator.permissions.query`.
- **Condiciones que evalúa** `undefined`, `ausencia de navigator.permissions.query`, `ausencia de active`, `status.state`, `ausencia de scannerPermissionPrompted`.
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama).
- **Llamadas directas en el cuerpo** [`catch`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L64), [`then`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L64), [`navigator.permissions.query`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L64), [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L69), [`setCamGranted`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L73), [`setScannerPermissionPrompted`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L75).

#### [`isPwaAndroid`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L94) · cálculo memorizado · dentro de [`useScannerState`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L27)

Comprueba `Pwa Android` para decidir si se admite o continúa la operación.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`window.matchMedia`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L99), [`test`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L102).
- **Lo usa** [`requestCameraPermission`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L110) (referencia).

#### [`requestCameraPermission`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L106) · callback React · dentro de [`useScannerState`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L27)

Coordina cambios de estado durante `request Camera Permission`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setScannerPermissionPrompted`, `window.location.href`, `setCameraAvailable`, `setCamGranted`.
- **Efectos y APIs** `navigator.mediaDevices.getUserMedia`.
- **Condiciones que evalúa** `undefined`, `isPwaAndroid`, `ausencia de navigator.mediaDevices.getUserMedia`.
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama).
- **Llamadas directas en el cuerpo** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L107), [`setScannerPermissionPrompted`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L108), [`setCameraAvailable`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L124), [`setCamGranted`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L125), [`catch`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L128), [`then`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L128), [`navigator.mediaDevices.getUserMedia`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L128), [`forEach`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L131), [`stream.getTracks`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L131), [`track.stop`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L131).
- **Lo usa** [`useScannerState`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L300) (referencia).

#### [`skipPermissionIntro`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L147) · callback React · dentro de [`useScannerState`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L27)

Coordina cambios de estado durante `skip Permission Intro`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setScannerPermissionPrompted`.
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama).
- **Llamadas directas en el cuerpo** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L148), [`setScannerPermissionPrompted`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L149).
- **Lo usa** [`useScannerState`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L301) (referencia).

#### [`handleStatusInfo`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L152) · callback React · dentro de [`useScannerState`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L27)

Maneja `Status Info` y coordina las acciones indicadas abajo.

- **Entradas** `msg`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setStatusMsg`, `setStatusType`.
- **Llamadas directas en el cuerpo** [`setStatusMsg`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L153), [`setStatusType`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L154).
- **Lo usa** [`useScannerState`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L304) (referencia).

#### [`handleCode`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L158) · callback React · asíncrona · dentro de [`useScannerState`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L27)

Maneja `Code` y coordina las acciones indicadas abajo.

- **Entradas** `raw`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setProcessing`, `setStatusMsg`, `setResult`, `setStatusType`.
- **Condiciones que evalúa** `ausencia de raw o processing`, `ausencia de isNegocio`, `parsed.type`, `ausencia de ok`, `error.includes`, `data.status`, `reason.includes`.
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama), [`redeemValidQr`](../../../apps/referidos-app/src/services/qrService.js#L119) (llama), [`handleError`](../../../apps/referidos-app/src/utils/errorUtils.js#L4) (llama).
- **Llamadas directas en el cuerpo** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L160), [`setProcessing`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L165), [`setStatusMsg`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L166), [`setResult`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L167), [`parseCode`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L169), [`setStatusType`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L176), [`redeemValidQr`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L196), [`error.includes`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L198), [`handleError`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L239), [`toLowerCase`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L242), [`reason.includes`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L243).
- **Lo usa** [`useScannerState`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L303) (referencia).

#### [`handleManualOpen`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L271) · callback React · dentro de [`useScannerState`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L27)

Maneja `Manual Open` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setManualRequested`, `setManualFallbackShown`.
- **Condiciones que evalúa** `manualRequested`.
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama).
- **Llamadas directas en el cuerpo** [`setManualRequested`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L273), [`setManualFallbackShown`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L274), [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L275).
- **Lo usa** [`useScannerState`](../../../apps/referidos-app/src/scanner/hooks/useScannerState.ts#L302) (referencia).

### [`apps/referidos-app/src/scanner/ScannerView.jsx`](../../../apps/referidos-app/src/scanner/ScannerView.jsx#L1)

Compone estados visuales de escaneo, cámara y alternativa manual conectados al hook compartido.

**Superficie que exporta.** [`ScannerView`](../../../apps/referidos-app/src/scanner/ScannerView.jsx#L3).

**Módulos que lo cargan.** [`ClienteEscanerBase.jsx`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L2) (importa), [`NegocioEscanerBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L2) (importa).

**Dependencias del archivo.** `react`.

#### [`ScannerView`](../../../apps/referidos-app/src/scanner/ScannerView.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{showPermissionIntro, header, main, footer}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`ClienteEscanerBase`](../../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx#L66) (renderiza), [`NegocioEscanerBase`](../../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx#L68) (renderiza).
