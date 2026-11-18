# PWA principal · Modales

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/modals/ModalProvider.jsx`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L1)
- [`apps/referidos-app/src/modals/modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L1)
- [`apps/referidos-app/src/modals/modalStore.js`](../../../apps/referidos-app/src/modals/modalStore.js#L1)
- [`apps/referidos-app/src/modals/useModal.js`](../../../apps/referidos-app/src/modals/useModal.js#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/modals/ModalProvider.jsx`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L1)

Monta el diálogo activo consultando el store y el registro global.

**Superficie que exporta.** [`ModalProvider`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L7).

**Módulos que lo cargan.** [`App.jsx`](../../../apps/referidos-app/src/App.jsx#L7) (importa).

**Dependencias del archivo.** `react`, `react-dom`, [`./modalStore`](../../../apps/referidos-app/src/modals/modalStore.js), [`./modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js).

#### [`ModalProvider`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L7) · componente React · exportación por defecto

Monta `ModalComponent`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `null`.
- **Estado o valores vinculados** `activeModal mediante useModalStore`, `selector s.activeModal`, `modalProps mediante useModalStore`, `selector s.modalProps`, `closeModal mediante useModalStore`, `selector s.closeModal`, `modalContentRef mediante useRef`, `viewportLockRef mediante useRef`, `unlockTimerRef mediante useRef`, `keyboardOpenRef mediante useRef`, `[viewportH, setViewportH] mediante useState`, `[baseH, setBaseH] mediante useState`.
- **Interfaz que monta** `ModalComponent`.
- **Hooks que llama** `useModalStore`, `useRef`, `useState`, `useEffect`.
- **Condiciones que evalúa** `ausencia de activeModal`, `undefined`, `ausencia de ModalComponent`.
- **Usa código de** [`useModalStore`](../../../apps/referidos-app/src/modals/modalStore.js#L4) (llama), [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L32) (accede al módulo).
- **Llamadas directas en el cuerpo** [`createPortal`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L99).
- **Lo usa** [`App`](../../../apps/referidos-app/src/App.jsx#L45) (renderiza).

#### [`updateViewport`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L28) · callback React · dentro de [`ModalProvider`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L7)

Aplica o guarda `Viewport` para que el estado refleje la operación.

- **Entradas** `force = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setBaseH`, `setViewportH`.
- **Condiciones que evalúa** `ausencia de force y viewportLockRef.current`, `activeModal`, `ausencia de keyboardOpenRef.current`, `delta`.
- **Llamadas directas en el cuerpo** [`setBaseH`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L32), [`setViewportH`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L36).
- **Lo usa** [`update`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L52) (llama), [`ModalProvider`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L60) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L51) · callback de infraestructura · dentro de [`ModalProvider`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L7)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ModalProvider`.

- **Efectos y APIs** `window.visualViewport.addEventListener`, `window.addEventListener`, `window.visualViewport.removeEventListener`, `window.removeEventListener`.
- **Llamadas directas en el cuerpo** [`update`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L53), [`window.visualViewport.addEventListener`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L54), [`window.addEventListener`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L55), [`window.visualViewport.removeEventListener`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L57), [`window.removeEventListener`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L58).

#### [`update`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L52) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L51)

Función auxiliar de `useEffect · callback` para `update`.

- **Llamadas directas en el cuerpo** [`updateViewport`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L52).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L53) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L62) · callback de infraestructura · dentro de [`ModalProvider`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L7)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ModalProvider`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `window.clearTimeout`.
- **Condiciones que evalúa** `activeModal`, `unlockTimerRef.current`.
- **Llamadas directas en el cuerpo** [`window.clearTimeout`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L70).

#### [`useEffect · callback`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L76) · callback de infraestructura · dentro de [`ModalProvider`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L7)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ModalProvider`.

- **Condiciones que evalúa** `ausencia de activeModal`.

#### [`div.onClick`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L119) · callback JSX · dentro de [`ModalProvider`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L7)

Responde al evento de interfaz `div.onClick`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Llamadas directas en el cuerpo** [`e.stopPropagation`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L119).

### [`apps/referidos-app/src/modals/modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L1)

Asocia nombres que reciben los handlers de openModal a componentes concretos.

**Superficie que exporta.** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L32).

**Módulos que lo cargan.** [`ModalProvider.jsx`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L5) (importa).

**Dependencias del archivo.** [`../components/modals/ModalTier`](../../../apps/referidos-app/src/components/modals/ModalTier.jsx), [`../components/modals/ModalBeneficios`](../../../apps/referidos-app/src/components/modals/ModalBeneficios.jsx), [`../components/modals/ModalCodigoNegocio`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx), [`../components/modals/ModalCuentaExistente`](../../../apps/referidos-app/src/components/modals/ModalCuentaExistente.jsx), [`../components/modals/ModalAbandonarRegistro`](../../../apps/referidos-app/src/components/modals/ModalAbandonarRegistro.jsx), [`../components/modals/ModalEliminarCuenta`](../../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx), [`../components/modals/ModalSplashChoiceOverlay`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx), [`../components/modals/ModalSplashEmailConfirmation`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx), [`../components/modals/ModalFingerprintPrompt`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx), [`../components/modals/ModalNotifications`](../../../apps/referidos-app/src/components/modals/ModalNotifications.jsx), [`../components/modals/ModalConfirmarCambios`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx), [`../components/modals/ModalLocationPermission`](../../../apps/referidos-app/src/components/modals/ModalLocationPermission.jsx), [`../components/modals/ModalLocationDenied`](../../../apps/referidos-app/src/components/modals/ModalLocationDenied.jsx), [`../components/modals/ModalLocationUnavailable`](../../../apps/referidos-app/src/components/modals/ModalLocationUnavailable.jsx), [`../components/modals/ModalTimePicker`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx), [`../components/modals/ModalAccountVerifySkip`](../../../apps/referidos-app/src/components/modals/ModalAccountVerifySkip.jsx), [`../components/modals/ModalAccessMethods`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx), [`../components/modals/ModalConfirmAction`](../../../apps/referidos-app/src/components/modals/ModalConfirmAction.jsx) y 10 más.

#### [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L32) · variable de módulo · exportado

Agrupa la configuración o catálogo de `modal Registry` para que sus consumidores lean claves comunes.

- **Campos o contexto** `Tier`, `Beneficios`, `CodigoNegocio`, `CuentaExistente`, `AbandonarRegistro`, `EliminarCuenta`, `SplashChoiceOverlay`, `SplashEmailConfirmation`, `FingerprintPrompt`, `Notifications`, `ConfirmarCambios`, `LocationPermission`, `LocationDenied`, `LocationUnavailable` y 14 más.
- **Usa código de** [`ModalTier`](../../../apps/referidos-app/src/components/modals/ModalTier.jsx#L6) (referencia), [`ModalBeneficios`](../../../apps/referidos-app/src/components/modals/ModalBeneficios.jsx#L6) (referencia), [`ModalCodigoNegocio`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L17) (referencia), [`ModalCuentaExistente`](../../../apps/referidos-app/src/components/modals/ModalCuentaExistente.jsx#L4) (referencia), [`ModalAbandonarRegistro`](../../../apps/referidos-app/src/components/modals/ModalAbandonarRegistro.jsx#L4) (referencia), [`ModalEliminarCuenta`](../../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx#L4) (referencia), [`ModalSplashChoiceOverlay`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L22) (referencia), [`ModalSplashEmailConfirmation`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L6) (referencia), [`ModalFingerprintPrompt`](../../../apps/referidos-app/src/components/modals/ModalFingerprintPrompt.jsx#L16) (referencia), [`ModalNotifications`](../../../apps/referidos-app/src/components/modals/ModalNotifications.jsx#L5) (referencia) y 18 más.
- **Lo usa** [`ModalProvider`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L96) (accede al módulo).

### [`apps/referidos-app/src/modals/modalStore.js`](../../../apps/referidos-app/src/modals/modalStore.js#L1)

Guarda nombre, props y acciones para abrir y cerrar modales desde cualquier pantalla.

**Superficie que exporta.** [`useModalStore`](../../../apps/referidos-app/src/modals/modalStore.js#L4).

**Módulos que lo cargan.** [`ModalProvider.jsx`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L4) (importa), [`useModal.js`](../../../apps/referidos-app/src/modals/useModal.js#L2) (importa), [`errorPolicyService.js`](../../../apps/referidos-app/src/services/errorPolicyService.js#L2) (importa), [`appStore.js`](../../../apps/referidos-app/src/store/appStore.js#L31) (importa).

**Dependencias del archivo.** `zustand`.

#### [`useModalStore`](../../../apps/referidos-app/src/modals/modalStore.js#L4) · inicializador de store · exportado

Configura el estado inicial y las acciones del store `useModalStore`.

- **Entradas** `set`.
- **Retorno visible o tipo declarado** `activeModal`, `modalProps`, `openModal`, `closeModal`.
- **Llamadas directas en el cuerpo** [`create`](../../../apps/referidos-app/src/modals/modalStore.js#L4).
- **Lo usa** [`ModalProvider`](../../../apps/referidos-app/src/modals/ModalProvider.jsx#L8) (llama), [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L6) (llama), [`maybeShowModal`](../../../apps/referidos-app/src/services/errorPolicyService.js#L75) (accede al módulo), [`requestLocalVerification`](../../../apps/referidos-app/src/store/appStore.js#L159) (accede al módulo), [`requestPasswordVerification`](../../../apps/referidos-app/src/store/appStore.js#L220) (accede al módulo), [`bootstrapAuth`](../../../apps/referidos-app/src/store/appStore.js#L589) (accede al módulo).

#### [`openModal`](../../../apps/referidos-app/src/modals/modalStore.js#L8) · función · dentro de [`useModalStore`](../../../apps/referidos-app/src/modals/modalStore.js#L4)

Inicia `Modal` y prepara sus dependencias.

- **Entradas** `name`, `props = valor por defecto`.
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-app/src/modals/modalStore.js#L9).

#### [`closeModal`](../../../apps/referidos-app/src/modals/modalStore.js#L14) · función · dentro de [`useModalStore`](../../../apps/referidos-app/src/modals/modalStore.js#L4)

Finaliza `Modal` y ajusta el estado que depende de esa operación.

- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-app/src/modals/modalStore.js#L15).

### [`apps/referidos-app/src/modals/useModal.js`](../../../apps/referidos-app/src/modals/useModal.js#L1)

Da a la pantalla una API de acceso al estado y operaciones de modales sin acoplarla al host global.

**Superficie que exporta.** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4).

**Módulos que lo cargan.** [`useLocationStep.js`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L2) (importa), [`EmailVerifyStep.jsx`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L2) (importa), [`UserAddressStep.jsx`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L15) (importa), [`ClienteLayout.jsx`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L9) (importa), [`ModalAbandonarRegistro.jsx`](../../../apps/referidos-app/src/components/modals/ModalAbandonarRegistro.jsx#L2) (importa), [`ModalAccessMethods.jsx`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L6) (importa), [`ModalAccountVerifySkip.jsx`](../../../apps/referidos-app/src/components/modals/ModalAccountVerifySkip.jsx#L1) (importa), [`ModalBase.jsx`](../../../apps/referidos-app/src/components/modals/ModalBase.jsx#L3) (importa), [`ModalBeneficios.jsx`](../../../apps/referidos-app/src/components/modals/ModalBeneficios.jsx#L4) (importa), [`ModalCodigoNegocio.jsx`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L4) (importa), [`ModalConfirmAction.jsx`](../../../apps/referidos-app/src/components/modals/ModalConfirmAction.jsx#L1) (importa), [`ModalConfirmarCambios.jsx`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L3) (importa), [`ModalCuentaExistente.jsx`](../../../apps/referidos-app/src/components/modals/ModalCuentaExistente.jsx#L2) (importa), [`ModalEliminarCuenta.jsx`](../../../apps/referidos-app/src/components/modals/ModalEliminarCuenta.jsx#L2) (importa), [`ModalEmailReauth.jsx`](../../../apps/referidos-app/src/components/modals/ModalEmailReauth.jsx#L4) (importa), [`ModalEmailVerification.jsx`](../../../apps/referidos-app/src/components/modals/ModalEmailVerification.jsx#L4) (importa) y 25 más.

**Dependencias del archivo.** [`./modalStore`](../../../apps/referidos-app/src/modals/modalStore.js).

#### [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) · hook React · exportado

Agrupa estado, contexto o efectos de `Modal` para sus consumidores React.

- **Retorno visible o tipo declarado** `activeModal`, `modalProps`, `openModal`, `closeModal`.
- **Hooks que llama** `useModalStore`.
- **Usa código de** [`useModalStore`](../../../apps/referidos-app/src/modals/modalStore.js#L4) (llama).
- **Lo usa** [`useLocationStep`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L18) (llama), [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx#L66) (llama), [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L128) (llama), [`ClienteLayoutInner`](../../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx#L32) (llama), [`ModalAbandonarRegistro`](../../../apps/referidos-app/src/components/modals/ModalAbandonarRegistro.jsx#L5) (llama), [`ModalAccessMethods`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L24) (llama), [`ModalAccountVerifySkip`](../../../apps/referidos-app/src/components/modals/ModalAccountVerifySkip.jsx#L4) (llama), [`ModalBase`](../../../apps/referidos-app/src/components/modals/ModalBase.jsx#L7) (llama), [`ModalBeneficios`](../../../apps/referidos-app/src/components/modals/ModalBeneficios.jsx#L7) (llama), [`ModalCodigoNegocio`](../../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx#L18) (llama), [`ModalConfirmAction`](../../../apps/referidos-app/src/components/modals/ModalConfirmAction.jsx#L10) (llama), [`ModalConfirmarCambios`](../../../apps/referidos-app/src/components/modals/ModalConfirmarCambios.jsx#L26) (llama) y 33 más.
