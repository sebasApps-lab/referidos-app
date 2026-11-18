# PWA principal · Componentes reutilizables · 3 de 4

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalSupportQueue.jsx`](../../../apps/referidos-app/src/components/modals/ModalSupportQueue.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalSupportQueueCancel.jsx`](../../../apps/referidos-app/src/components/modals/ModalSupportQueueCancel.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalTier.jsx`](../../../apps/referidos-app/src/components/modals/ModalTier.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalTimePicker.jsx`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L1)
- [`apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L1)
- [`apps/referidos-app/src/components/search/SearchBar.jsx`](../../../apps/referidos-app/src/components/search/SearchBar.jsx#L1)
- [`apps/referidos-app/src/components/search/SearchContainer.jsx`](../../../apps/referidos-app/src/components/search/SearchContainer.jsx#L1)
- [`apps/referidos-app/src/components/search/SearchEmpty.jsx`](../../../apps/referidos-app/src/components/search/SearchEmpty.jsx#L1)
- [`apps/referidos-app/src/components/search/SearchHeader.jsx`](../../../apps/referidos-app/src/components/search/SearchHeader.jsx#L1)
- [`apps/referidos-app/src/components/search/SearchIdle.jsx`](../../../apps/referidos-app/src/components/search/SearchIdle.jsx#L1)
- [`apps/referidos-app/src/components/search/SearchResults.jsx`](../../../apps/referidos-app/src/components/search/SearchResults.jsx#L1)
- [`apps/referidos-app/src/components/search/useSearchMode.js`](../../../apps/referidos-app/src/components/search/useSearchMode.js#L1)
- [`apps/referidos-app/src/components/sections/PromoSection.jsx`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L1)
- [`apps/referidos-app/src/components/sections/SectionTitle.jsx`](../../../apps/referidos-app/src/components/sections/SectionTitle.jsx#L1)
- [`apps/referidos-app/src/components/ui/Badge.jsx`](../../../apps/referidos-app/src/components/ui/Badge.jsx#L1)
- [`apps/referidos-app/src/components/ui/ConfirmDialog.jsx`](../../../apps/referidos-app/src/components/ui/ConfirmDialog.jsx#L1)
- [`apps/referidos-app/src/components/ui/LoaderOverlay.jsx`](../../../apps/referidos-app/src/components/ui/LoaderOverlay.jsx#L1)
- [`apps/referidos-app/src/components/ui/SearchBar.jsx`](../../../apps/referidos-app/src/components/ui/SearchBar.jsx#L1)
- [`apps/referidos-app/src/components/ui/skeleton/SkeletonAvatar.jsx`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonAvatar.jsx#L1)
- [`apps/referidos-app/src/components/ui/skeleton/SkeletonBase.jsx`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBase.jsx#L1)
- [`apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx#L1)
- [`apps/referidos-app/src/components/ui/skeleton/SkeletonCard.jsx`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonCard.jsx#L1)
- [`apps/referidos-app/src/components/ui/skeleton/SkeletonList.jsx`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonList.jsx#L1)
- [`apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx#L1)
- [`apps/referidos-app/src/components/ui/Spinner.jsx`](../../../apps/referidos-app/src/components/ui/Spinner.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L1)

Muestra una elección dentro de la transición visual de auth.

**Superficie que exporta.** [`ModalSplashChoiceOverlay`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L22).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L9) (importa).

**Dependencias del archivo.** `react`, [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js), [`../../utils/validators`](../../../apps/referidos-app/src/utils/validators.js).

#### [`cards`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L6) · variable de módulo

Conserva la lista de `cards` usada por el módulo.

- **Lo usa** [`ModalSplashChoiceOverlay`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L109) (accede al módulo).

#### [`isPartialFormat`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L13) · función

Comprueba `Partial Format` para decidir si se admite o continúa la operación.

- **Entradas** `code`.
- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `ausencia de code`, `code`, `ausencia de code.startsWith`.
- **Llamadas directas en el cuerpo** [`code.startsWith`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L16), [`code.slice`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L17), [`test`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L18).
- **Lo usa** [`handleCodeChange`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L66) (llama).

#### [`ModalSplashChoiceOverlay`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L22) · componente React · exportación por defecto

Monta `button`, `input`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{authCreds, onCliente, onNegocio, onBack}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[selected, setSelected] mediante useState`, `[mounted, setMounted] mediante useState`, `[error, setError] mediante useState`, `[showCodeModal, setShowCodeModal] mediante useState`, `[code, setCode] mediante useState`, `[codeFormatOk, setCodeFormatOk] mediante useState`, `[codeValid] mediante useState`, `[persisting, setPersisting] mediante useState`.
- **Interfaz que monta** `button`, `input`.
- **Hooks que llama** `useState`, `useModal`, `useEffect`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Llamadas directas en el cuerpo** [`cards.map`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L109), [`encodeURIComponent`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L182).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L39) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L38) · callback de infraestructura · dentro de [`ModalSplashChoiceOverlay`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L22)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ModalSplashChoiceOverlay`.

- **Actualizaciones de estado o acciones** `setMounted`.
- **Efectos y APIs** `requestAnimationFrame`.
- **Llamadas directas en el cuerpo** [`requestAnimationFrame`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L39), [`setMounted`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L39), [`cancelAnimationFrame`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L40).

#### [`proceedNegocio`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L43) · función · asíncrona · dentro de [`ModalSplashChoiceOverlay`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L22)

Coordina cambios de estado durante `proceed Negocio`.

- **Entradas** `codeVal`.
- **Actualizaciones de estado o acciones** `setPersisting`.
- **Condiciones que evalúa** `ausencia de onNegocio`.
- **Llamadas directas en el cuerpo** [`setPersisting`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L46), [`onNegocio`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L47).
- **Lo usa** [`confirmCode`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L76) (llama).

#### [`handleNext`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L53) · función · dentro de [`ModalSplashChoiceOverlay`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L22)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setError`.
- **Condiciones que evalúa** `ausencia de selected`, `selected`.
- **Llamadas directas en el cuerpo** [`onCliente`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L56), [`setError`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L59).
- **Lo usa** [`ModalSplashChoiceOverlay`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L142) (pasa a onClick).

#### [`handleCodeChange`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L63) · función · dentro de [`ModalSplashChoiceOverlay`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L22)

Maneja `Code Change` y coordina las acciones indicadas abajo.

- **Entradas** `val`.
- **Actualizaciones de estado o acciones** `setCode`, `setCodeFormatOk`.
- **Llamadas directas en el cuerpo** [`val.toUpperCase`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L64), [`setCode`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L65), [`isPartialFormat`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L66), [`setCodeFormatOk`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L67).
- **Lo usa** [`input.onChange`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L177) (llama).

#### [`confirmCode`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L73) · función · dentro de [`ModalSplashChoiceOverlay`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L22)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setShowCodeModal`.
- **Llamadas directas en el cuerpo** [`proceedNegocio`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L76), [`setShowCodeModal`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L77).
- **Lo usa** [`ModalSplashChoiceOverlay`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L199) (pasa a onClick).

#### [`button.onClick`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L83) · callback JSX · dentro de [`ModalSplashChoiceOverlay`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L22)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `closeModal`.
- **Condiciones que evalúa** `onBack`.
- **Llamadas directas en el cuerpo** [`onBack`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L84), [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L85).

#### [`button.onClick`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L114) · callback JSX · dentro de [`ModalSplashChoiceOverlay`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L22)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSelected`.
- **Llamadas directas en el cuerpo** [`setSelected`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L114).

#### [`input.onChange`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L177) · callback JSX · dentro de [`ModalSplashChoiceOverlay`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L22)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Llamadas directas en el cuerpo** [`handleCodeChange`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L177).

#### [`button.onClick`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L193) · callback JSX · dentro de [`ModalSplashChoiceOverlay`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L22)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setShowCodeModal`.
- **Llamadas directas en el cuerpo** [`setShowCodeModal`](../../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx#L193).

### [`apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L1)

Presenta confirmación de correo con la composición splash del flujo de auth.

**Superficie que exporta.** [`ModalSplashEmailConfirmation`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L6).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L10) (importa).

**Dependencias del archivo.** `react`, [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js).

#### [`ModalSplashEmailConfirmation`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L6) · componente React · exportación por defecto

Monta `button`, `input`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{email, initialError, onBack, onSend, onSkip, readOnlyEmail}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[email, setEmail] mediante useState`, `[loading, setLoading] mediante useState`, `[message, setMessage] mediante useState`, `[error, setError] mediante useState`, `[signedUp, setSignedUp] mediante useState`.
- **Interfaz que monta** `button`, `input`.
- **Hooks que llama** `useState`, `useModal`, `useEffect`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L40) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L21) · callback de infraestructura · dentro de [`ModalSplashEmailConfirmation`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L6)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ModalSplashEmailConfirmation`.

- **Actualizaciones de estado o acciones** `setEmail`, `setSignedUp`.
- **Llamadas directas en el cuerpo** [`setEmail`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L22), [`setSignedUp`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L23).

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L26) · callback de infraestructura · dentro de [`ModalSplashEmailConfirmation`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L6)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ModalSplashEmailConfirmation`.

- **Actualizaciones de estado o acciones** `setError`, `setMessage`.
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L27), [`setMessage`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L28).

#### [`sendCode`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L31) · función · asíncrona · dentro de [`ModalSplashEmailConfirmation`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L6)

Opera sobre Auth `resend`. El resultado se adapta al contrato del consumidor.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setError`, `setMessage`, `setLoading`, `setSignedUp`.
- **Condiciones que evalúa** `ausencia de email`, `onSend y ausencia de signedUp`, `ausencia de res.ok`, `resendError`.
- **Contrato de datos** Auth `resend` en [`ModalSplashEmailConfirmation.jsx:49`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L49).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L32), [`setMessage`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L33), [`setLoading`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L38), [`onSend`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L41), [`setSignedUp`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L45), [`supabase.auth.resend`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L49).
- **Lo usa** [`ModalSplashEmailConfirmation`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L118) (pasa a onClick).

#### [`button.onClick`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L76) · callback JSX · dentro de [`ModalSplashEmailConfirmation`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L6)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `closeModal`.
- **Llamadas directas en el cuerpo** [`onBack`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L76), [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L76).

#### [`input.onChange`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L106) · callback JSX · dentro de [`ModalSplashEmailConfirmation`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L6)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setEmail`.
- **Llamadas directas en el cuerpo** [`setEmail`](../../../apps/referidos-app/src/components/modals/ModalSplashEmailConfirmation.jsx#L106).

### [`apps/referidos-app/src/components/modals/ModalSupportQueue.jsx`](../../../apps/referidos-app/src/components/modals/ModalSupportQueue.jsx#L1)

Presenta el seguimiento de cola de un ticket abierta desde la app.

**Superficie que exporta.** [`ModalSupportQueue`](../../../apps/referidos-app/src/components/modals/ModalSupportQueue.jsx#L6).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L26) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js).

#### [`ModalSupportQueue`](../../../apps/referidos-app/src/components/modals/ModalSupportQueue.jsx#L6) · componente React · exportación por defecto

Monta `button`, `X`, `Loader2`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onConfirmUnderstand, onRequestCancel}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `X`, `Loader2`.
- **Hooks que llama** `useModal`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L56) (referencia).

#### [`button.onClick`](../../../apps/referidos-app/src/components/modals/ModalSupportQueue.jsx#L20) · callback JSX · dentro de [`ModalSupportQueue`](../../../apps/referidos-app/src/components/modals/ModalSupportQueue.jsx#L6)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `closeModal`.
- **Llamadas directas en el cuerpo** [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalSupportQueue.jsx#L21), [`onConfirmUnderstand`](../../../apps/referidos-app/src/components/modals/ModalSupportQueue.jsx#L22).

#### [`button.onClick`](../../../apps/referidos-app/src/components/modals/ModalSupportQueue.jsx#L44) · callback JSX · dentro de [`ModalSupportQueue`](../../../apps/referidos-app/src/components/modals/ModalSupportQueue.jsx#L6)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `closeModal`.
- **Llamadas directas en el cuerpo** [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalSupportQueue.jsx#L45), [`onConfirmUnderstand`](../../../apps/referidos-app/src/components/modals/ModalSupportQueue.jsx#L46).

#### [`button.onClick`](../../../apps/referidos-app/src/components/modals/ModalSupportQueue.jsx#L54) · callback JSX · dentro de [`ModalSupportQueue`](../../../apps/referidos-app/src/components/modals/ModalSupportQueue.jsx#L6)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `closeModal`.
- **Llamadas directas en el cuerpo** [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalSupportQueue.jsx#L55), [`onRequestCancel`](../../../apps/referidos-app/src/components/modals/ModalSupportQueue.jsx#L56).

### [`apps/referidos-app/src/components/modals/ModalSupportQueueCancel.jsx`](../../../apps/referidos-app/src/components/modals/ModalSupportQueueCancel.jsx#L1)

Pide consentimiento antes de cancelar una solicitud en espera.

**Superficie que exporta.** [`ModalSupportQueueCancel`](../../../apps/referidos-app/src/components/modals/ModalSupportQueueCancel.jsx#L4).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L27) (importa).

**Dependencias del archivo.** `react`, [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js).

#### [`ModalSupportQueueCancel`](../../../apps/referidos-app/src/components/modals/ModalSupportQueueCancel.jsx#L4) · componente React · exportación por defecto

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onConfirmCancel, onContinueQueue}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`.
- **Hooks que llama** `useModal`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L57) (referencia).

#### [`button.onClick`](../../../apps/referidos-app/src/components/modals/ModalSupportQueueCancel.jsx#L21) · callback JSX · dentro de [`ModalSupportQueueCancel`](../../../apps/referidos-app/src/components/modals/ModalSupportQueueCancel.jsx#L4)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `closeModal`.
- **Llamadas directas en el cuerpo** [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalSupportQueueCancel.jsx#L22), [`onContinueQueue`](../../../apps/referidos-app/src/components/modals/ModalSupportQueueCancel.jsx#L23).

#### [`button.onClick`](../../../apps/referidos-app/src/components/modals/ModalSupportQueueCancel.jsx#L31) · callback JSX · dentro de [`ModalSupportQueueCancel`](../../../apps/referidos-app/src/components/modals/ModalSupportQueueCancel.jsx#L4)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `closeModal`.
- **Llamadas directas en el cuerpo** [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalSupportQueueCancel.jsx#L32), [`onConfirmCancel`](../../../apps/referidos-app/src/components/modals/ModalSupportQueueCancel.jsx#L33).

### [`apps/referidos-app/src/components/modals/ModalTier.jsx`](../../../apps/referidos-app/src/components/modals/ModalTier.jsx#L1)

Amplía información de nivel que se abre desde el perfil o beneficios.

**Superficie que exporta.** [`ModalTier`](../../../apps/referidos-app/src/components/modals/ModalTier.jsx#L6).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L3) (importa).

**Dependencias del archivo.** `react`, [`./ModalBase`](../../../apps/referidos-app/src/components/modals/ModalBase.jsx), [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js).

#### [`ModalTier`](../../../apps/referidos-app/src/components/modals/ModalTier.jsx#L6) · componente React · exportación por defecto

Monta `ModalBase`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `ModalBase`, `button`.
- **Hooks que llama** `useModal`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama), [`ModalBase`](../../../apps/referidos-app/src/components/modals/ModalBase.jsx#L6) (renderiza).
- **Llamadas directas en el cuerpo** [`tiers.map`](../../../apps/referidos-app/src/components/modals/ModalTier.jsx#L21).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L33) (referencia).

#### [`button.onClick`](../../../apps/referidos-app/src/components/modals/ModalTier.jsx#L53) · callback JSX · dentro de [`ModalTier`](../../../apps/referidos-app/src/components/modals/ModalTier.jsx#L6)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `openModal`.
- **Llamadas directas en el cuerpo** [`openModal`](../../../apps/referidos-app/src/components/modals/ModalTier.jsx#L53).

### [`apps/referidos-app/src/components/modals/ModalTimePicker.jsx`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L1)

Selecciona una hora para el formulario que lo invoca sin duplicar controles.

**Superficie que exporta.** [`ModalTimePicker`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L17).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L17) (importa).

**Dependencias del archivo.** `react`, [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js).

#### [`HOURS`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L4) · variable de módulo

Declara `HOURS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`padStart`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L4).
- **Lo usa** [`ModalTimePicker`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L40) (accede al módulo).

#### [`MINUTES`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L5) · variable de módulo

Conserva la lista de `MINUTES` usada por el módulo.

- **Lo usa** [`ModalTimePicker`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L52) (accede al módulo).

#### [`parseTime`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L7) · función

Extrae o interpreta el valor de hora de los argumentos, estado o datos de entrada.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `hour`, `minute`.
- **Condiciones que evalúa** `ausencia de text`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L8), [`text.split`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L10), [`hour.padStart`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L12), [`minute.padStart`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L13).
- **Lo usa** [`initial`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L24) (llama).

#### [`ModalTimePicker`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L17) · componente React · exportación por defecto

Monta `select`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, helperText, initialTime, onConfirm}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[hour, setHour] mediante useState`, `[minute, setMinute] mediante useState`.
- **Interfaz que monta** `select`, `button`.
- **Hooks que llama** `useModal`, `useState`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Llamadas directas en el cuerpo** [`HOURS.map`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L40), [`MINUTES.map`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L52).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L47) (referencia).

#### [`initial`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L24) · cálculo memorizado · dentro de [`ModalTimePicker`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L17)

Inicia `ial` y prepara sus dependencias.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`parseTime`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L24).
- **Lo usa** [`ModalTimePicker`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L25) (accede al módulo).

#### [`select.onChange`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L37) · callback JSX · dentro de [`ModalTimePicker`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L17)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setHour`.
- **Llamadas directas en el cuerpo** [`setHour`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L37).

#### [`select.onChange`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L49) · callback JSX · dentro de [`ModalTimePicker`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L17)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setMinute`.
- **Llamadas directas en el cuerpo** [`setMinute`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L49).

#### [`button.onClick`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L69) · callback JSX · dentro de [`ModalTimePicker`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L17)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `closeModal`.
- **Llamadas directas en el cuerpo** [`onConfirm`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L70), [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalTimePicker.jsx#L71).

### [`apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L1)

Coordina confirmación y desactivación de un factor desde la interfaz.

**Superficie que exporta.** [`ModalTwoFADisable`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L7).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L30) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js), [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../../services/mfaService`](../../../apps/referidos-app/src/services/mfaService.js).

#### [`ModalTwoFADisable`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L7) · componente React · exportación por defecto

Monta `AlertTriangle`, `button`, `X`, `input`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{factorId, onDisabled}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[email, setEmail] mediante useState`, `[password, setPassword] mediante useState`, `[sending, setSending] mediante useState`, `[error, setError] mediante useState`.
- **Interfaz que monta** `AlertTriangle`, `button`, `X`, `input`.
- **Hooks que llama** `useModal`, `useState`, `useEffect`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L60) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L14) · callback de infraestructura · dentro de [`ModalTwoFADisable`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L7)

Opera sobre Auth `getSession`. El resultado se adapta al contrato del consumidor.

- **Actualizaciones de estado o acciones** `setEmail`.
- **Condiciones que evalúa** `ausencia de active`.
- **Contrato de datos** Auth `getSession` en [`ModalTwoFADisable.jsx:17`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L17).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.getSession`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L17), [`setEmail`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L19).

#### [`handleDisable`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L26) · función · asíncrona · dentro de [`ModalTwoFADisable`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L7)

Opera sobre Auth `signInWithPassword`. El resultado se adapta al contrato del consumidor.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setError`, `setSending`.
- **Efectos y APIs** `closeModal`.
- **Condiciones que evalúa** `ausencia de email`, `ausencia de password`, `ausencia de factorId`, `signInError`, `ausencia de result.ok`.
- **Contrato de datos** Auth `signInWithPassword` en [`ModalTwoFADisable.jsx:42`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L42).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo), [`unenrollFactor`](../../../apps/referidos-app/src/services/mfaService.js#L123) (llama), [`syncTotpFlags`](../../../apps/referidos-app/src/services/mfaService.js#L131) (llama).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L27), [`setSending`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L40), [`supabase.auth.signInWithPassword`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L42), [`unenrollFactor`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L48), [`syncTotpFlags`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L52), [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L53), [`onDisabled`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L54).
- **Lo usa** [`ModalTwoFADisable`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L103) (pasa a onClick).

#### [`input.onChange`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L87) · callback JSX · dentro de [`ModalTwoFADisable`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L7)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setPassword`.
- **Llamadas directas en el cuerpo** [`setPassword`](../../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx#L87).

### [`apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L1)

Presenta alta TOTP, QR o secreto de enrolamiento y confirmación de código.

**Superficie que exporta.** [`ModalTwoFAEnroll`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L18).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L28) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, `react-qr-code`, [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js), [`../../services/mfaService`](../../../apps/referidos-app/src/services/mfaService.js).

#### [`FRIENDLY_NAME`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L13) · variable de módulo

Declara `FRIENDLY_NAME` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`startEnroll`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L50) (referencia).

#### [`isActiveStatus`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L15) · función

Comprueba `Active Status` para decidir si se admite o continúa la operación.

- **Entradas** `status`.
- **Llamadas directas en el cuerpo** [`includes`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L16), [`toLowerCase`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L16).
- **Lo usa** [`prepareEnrollment`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L67) (llama).

#### [`ModalTwoFAEnroll`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L18) · componente React · exportación por defecto

Monta `ShieldCheck`, `button`, `X`, `QrCode`, `input`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onComplete}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[loading, setLoading] mediante useState`, `[enrollError, setEnrollError] mediante useState`, `[mode, setMode] mediante useState`, `[factorId, setFactorId] mediante useState`, `[qrCode, setQrCode] mediante useState`, `[qrUri, setQrUri] mediante useState`, `[secret, setSecret] mediante useState`, `[code, setCode] mediante useState`, `[submitting, setSubmitting] mediante useState`, `[verifyError, setVerifyError] mediante useState`.
- **Interfaz que monta** `ShieldCheck`, `button`, `X`, `QrCode`, `input`.
- **Hooks que llama** `useModal`, `useState`, `useEffect`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Llamadas directas en el cuerpo** [`code.trim`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L32), [`renderQr`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L230).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L58) (referencia).

#### [`resetEnrollState`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L34) · función · dentro de [`ModalTwoFAEnroll`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L18)

Limpia o restablece `Enroll State` como parte de este flujo.

- **Actualizaciones de estado o acciones** `setFactorId`, `setQrCode`, `setQrUri`, `setSecret`.
- **Llamadas directas en el cuerpo** [`setFactorId`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L35), [`setQrCode`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L36), [`setQrUri`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L37), [`setSecret`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L38).
- **Lo usa** [`prepareEnrollment`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L62) (llama).

#### [`applyEnrollPayload`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L41) · función · dentro de [`ModalTwoFAEnroll`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L18)

Aplica o guarda `Enroll Payload` para que el estado refleje la operación.

- **Entradas** `data`.
- **Actualizaciones de estado o acciones** `setFactorId`, `setQrCode`, `setQrUri`, `setSecret`.
- **Llamadas directas en el cuerpo** [`setFactorId`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L43), [`setQrCode`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L44), [`setQrUri`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L45), [`setSecret`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L46).
- **Lo usa** [`startEnroll`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L54) (llama).

#### [`startEnroll`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L49) · función · asíncrona · dentro de [`ModalTwoFAEnroll`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L18)

Inicia `Enroll` y prepara sus dependencias.

- **Retorno visible o tipo declarado** `ok`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`enrollTotp`](../../../apps/referidos-app/src/services/mfaService.js#L61) (llama).
- **Llamadas directas en el cuerpo** [`enrollTotp`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L50), [`applyEnrollPayload`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L54).
- **Lo usa** [`prepareEnrollment`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L82) (llama).

#### [`prepareEnrollment`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L58) · función · asíncrona · dentro de [`ModalTwoFAEnroll`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L18)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setLoading`, `setEnrollError`, `setMode`, `setFactorId`.
- **Condiciones que evalúa** `list.ok`, `active`, `pending`, `ausencia de result.ok`, `result.errorCode`, `retry.ok`.
- **Usa código de** [`listMfaFactors`](../../../apps/referidos-app/src/services/mfaService.js#L15) (llama), [`unenrollFactor`](../../../apps/referidos-app/src/services/mfaService.js#L123) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L59), [`setEnrollError`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L60), [`setMode`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L61), [`resetEnrollState`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L62), [`listMfaFactors`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L64), [`factors.find`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L67), [`isActiveStatus`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L67), [`setFactorId`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L70), [`toLowerCase`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L75), [`unenrollFactor`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L78), [`startEnroll`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L82).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L120) (llama), [`ModalTwoFAEnroll`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L223) (pasa a onClick).

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L117) · callback de infraestructura · dentro de [`ModalTwoFAEnroll`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L18)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ModalTwoFAEnroll`.

- **Condiciones que evalúa** `ausencia de active`.
- **Llamadas directas en el cuerpo** [`prepareEnrollment`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L120).

#### [`helperText`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L128) · cálculo memorizado · dentro de [`ModalTwoFAEnroll`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L18)

Función auxiliar de `ModalTwoFAEnroll` para `helper Text`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `loading`, `enrollError`, `mode`.
- **Lo usa** [`ModalTwoFAEnroll`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L209) (referencia).

#### [`handleVerify`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L137) · función · asíncrona · dentro de [`ModalTwoFAEnroll`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L18)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setVerifyError`, `setSubmitting`.
- **Efectos y APIs** `closeModal`.
- **Condiciones que evalúa** `ausencia de factorId`, `ausencia de result.ok`.
- **Usa código de** [`challengeAndVerifyTotp`](../../../apps/referidos-app/src/services/mfaService.js#L102) (llama), [`syncTotpFlags`](../../../apps/referidos-app/src/services/mfaService.js#L131) (llama).
- **Llamadas directas en el cuerpo** [`setVerifyError`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L139), [`setSubmitting`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L143), [`challengeAndVerifyTotp`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L144), [`code.trim`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L146), [`syncTotpFlags`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L153), [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L155), [`onComplete`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L156).
- **Lo usa** [`ModalTwoFAEnroll`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L269) (pasa a onClick).

#### [`renderQr`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L159) · función · dentro de [`ModalTwoFAEnroll`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L18)

Prepara contenido JSX usando `img`, `QRCode`.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `img`, `QRCode`.
- **Condiciones que evalúa** `qrCode`, `isSvg`, `qrUri`.
- **Llamadas directas en el cuerpo** [`qrCode.trim`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L161), [`trimmed.startsWith`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L162).
- **Lo usa** [`ModalTwoFAEnroll`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L230) (llama).

#### [`input.onChange`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L250) · callback JSX · dentro de [`ModalTwoFAEnroll`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L18)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setCode`.
- **Llamadas directas en el cuerpo** [`setCode`](../../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx#L250).

### [`apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L1)

Presenta el desafío de segundo factor y recibe el código que debe verificarse.

**Superficie que exporta.** [`ModalTwoFAVerify`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L10).

**Módulos que lo cargan.** [`modalRegistry.js`](../../../apps/referidos-app/src/modals/modalRegistry.js#L29) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js), [`../../services/mfaService`](../../../apps/referidos-app/src/services/mfaService.js).

#### [`ModalTwoFAVerify`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L10) · componente React · exportación por defecto

Monta `ShieldCheck`, `button`, `X`, `input`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onVerified, onCancel}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[loading, setLoading] mediante useState`, `[factorId, setFactorId] mediante useState`, `[error, setError] mediante useState`, `[code, setCode] mediante useState`, `[submitting, setSubmitting] mediante useState`.
- **Interfaz que monta** `ShieldCheck`, `button`, `X`, `input`.
- **Hooks que llama** `useModal`, `useState`, `useEffect`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Llamadas directas en el cuerpo** [`code.trim`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L18).
- **Lo usa** [`modalRegistry`](../../../apps/referidos-app/src/modals/modalRegistry.js#L59) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L20) · callback de infraestructura · dentro de [`ModalTwoFAVerify`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L10)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ModalTwoFAVerify`.

- **Actualizaciones de estado o acciones** `setLoading`, `setError`, `setFactorId`.
- **Condiciones que evalúa** `ausencia de active`, `ausencia de result.ok`, `ausencia de picked`.
- **Usa código de** [`listMfaFactors`](../../../apps/referidos-app/src/services/mfaService.js#L15) (llama), [`pickActiveTotpFactor`](../../../apps/referidos-app/src/services/mfaService.js#L151) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L23), [`setError`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L24), [`listMfaFactors`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L25), [`pickActiveTotpFactor`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L33), [`setFactorId`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L34).

#### [`handleVerify`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L45) · función · asíncrona · dentro de [`ModalTwoFAVerify`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L10)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setError`, `setSubmitting`.
- **Efectos y APIs** `closeModal`.
- **Condiciones que evalúa** `ausencia de factorId`, `ausencia de result.ok`.
- **Usa código de** [`challengeAndVerifyTotp`](../../../apps/referidos-app/src/services/mfaService.js#L102) (llama).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L47), [`setSubmitting`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L50), [`challengeAndVerifyTotp`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L52), [`code.trim`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L54), [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L62), [`onVerified`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L63).
- **Lo usa** [`ModalTwoFAVerify`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L127) (pasa a onClick).

#### [`handleCancel`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L66) · función · asíncrona · dentro de [`ModalTwoFAVerify`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L10)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Efectos y APIs** `closeModal`.
- **Condiciones que evalúa** `onCancel`.
- **Llamadas directas en el cuerpo** [`closeModal`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L67), [`onCancel`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L69).
- **Lo usa** [`ModalTwoFAVerify`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L87) (pasa a onClick).

#### [`helperText`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L73) · cálculo memorizado · dentro de [`ModalTwoFAVerify`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L10)

Función auxiliar de `ModalTwoFAVerify` para `helper Text`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `loading`.
- **Lo usa** [`ModalTwoFAVerify`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L95) (referencia).

#### [`input.onChange`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L106) · callback JSX · dentro de [`ModalTwoFAVerify`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L10)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setCode`.
- **Llamadas directas en el cuerpo** [`setCode`](../../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx#L106).

### [`apps/referidos-app/src/components/search/SearchBar.jsx`](../../../apps/referidos-app/src/components/search/SearchBar.jsx#L1)

Implementa el campo de búsqueda y propaga texto o teclado a su contenedor. Hay variantes para distintos shells.

**Superficie que exporta.** [`SearchBar`](../../../apps/referidos-app/src/components/search/SearchBar.jsx#L1).

#### [`SearchBar`](../../../apps/referidos-app/src/components/search/SearchBar.jsx#L1) · componente React · exportación por defecto

Monta `button`, `input`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{value, onChange, onFilters, onFocus, onCancel, showBack, autoFocus}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `input`.

#### [`handleCancel`](../../../apps/referidos-app/src/components/search/SearchBar.jsx#L10) · función · dentro de [`SearchBar`](../../../apps/referidos-app/src/components/search/SearchBar.jsx#L1)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Condiciones que evalúa** `onCancel`.
- **Llamadas directas en el cuerpo** [`onCancel`](../../../apps/referidos-app/src/components/search/SearchBar.jsx#L12), [`onChange`](../../../apps/referidos-app/src/components/search/SearchBar.jsx#L15).
- **Lo usa** [`SearchBar`](../../../apps/referidos-app/src/components/search/SearchBar.jsx#L23) (pasa a onClick).

#### [`input.onChange`](../../../apps/referidos-app/src/components/search/SearchBar.jsx#L65) · callback JSX · dentro de [`SearchBar`](../../../apps/referidos-app/src/components/search/SearchBar.jsx#L1)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Llamadas directas en el cuerpo** [`onChange`](../../../apps/referidos-app/src/components/search/SearchBar.jsx#L65).

#### [`button.onClick`](../../../apps/referidos-app/src/components/search/SearchBar.jsx#L77) · callback JSX · dentro de [`SearchBar`](../../../apps/referidos-app/src/components/search/SearchBar.jsx#L1)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onChange`](../../../apps/referidos-app/src/components/search/SearchBar.jsx#L77).

### [`apps/referidos-app/src/components/search/SearchContainer.jsx`](../../../apps/referidos-app/src/components/search/SearchContainer.jsx#L1)

Une el campo de búsqueda y sus estados visuales para un consumidor de components/search.

**Superficie que exporta.** [`SearchContainer`](../../../apps/referidos-app/src/components/search/SearchContainer.jsx#L1).

#### [`SearchContainer`](../../../apps/referidos-app/src/components/search/SearchContainer.jsx#L1) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{mode, searchBar, results, children}`.
- **Retorno visible o tipo declarado** `JSX`.

### [`apps/referidos-app/src/components/search/SearchEmpty.jsx`](../../../apps/referidos-app/src/components/search/SearchEmpty.jsx#L1)

Representa que una consulta no devolvió resultados.

**Superficie que exporta.** [`SearchEmpty`](../../../apps/referidos-app/src/components/search/SearchEmpty.jsx#L1).

**Módulos que lo cargan.** [`SearchResults.jsx`](../../../apps/referidos-app/src/components/search/SearchResults.jsx#L1) (importa).

#### [`SearchEmpty`](../../../apps/referidos-app/src/components/search/SearchEmpty.jsx#L1) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{message}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`SearchResults`](../../../apps/referidos-app/src/components/search/SearchResults.jsx#L22) (renderiza).

### [`apps/referidos-app/src/components/search/SearchHeader.jsx`](../../../apps/referidos-app/src/components/search/SearchHeader.jsx#L1)

Compone la barra de cabecera del modo de búsqueda y su retorno.

**Superficie que exporta.** [`SearchHeader`](../../../apps/referidos-app/src/components/search/SearchHeader.jsx#L3).

**Dependencias del archivo.** `lucide-react`.

#### [`SearchHeader`](../../../apps/referidos-app/src/components/search/SearchHeader.jsx#L3) · componente React · exportación por defecto

Monta `button`, `ArrowLeft`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, onBack}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `ArrowLeft`.

### [`apps/referidos-app/src/components/search/SearchIdle.jsx`](../../../apps/referidos-app/src/components/search/SearchIdle.jsx#L1)

Presenta el estado de búsqueda antes de ingresar un criterio.

**Superficie que exporta.** [`SearchIdle`](../../../apps/referidos-app/src/components/search/SearchIdle.jsx#L15).

**Dependencias del archivo.** [`../cards/PromoCardHot`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx), [`../sections/PromoSection`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx), [`../sections/SectionTitle`](../../../apps/referidos-app/src/components/sections/SectionTitle.jsx), [`../../cliente/inicio/InicioPromosPreview`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx).

#### [`DEFAULT_SUGGESTIONS`](../../../apps/referidos-app/src/components/search/SearchIdle.jsx#L6) · variable de módulo

Conserva la lista de `DEFAULT SUGGESTIONS` usada por el módulo.

- **Lo usa** [`SearchIdle`](../../../apps/referidos-app/src/components/search/SearchIdle.jsx#L18) (referencia).

#### [`SearchIdle`](../../../apps/referidos-app/src/components/search/SearchIdle.jsx#L15) · componente React · exportación por defecto

Monta `PromoSection`, `SectionTitle`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{hotPromos, ratings, suggestions, onSelectSuggestion}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `PromoSection`, `SectionTitle`, `button`.
- **Usa código de** [`HOT_PROMOS`](../../../apps/referidos-app/src/cliente/inicio/InicioPromosPreview.jsx#L191) (referencia), [`PromoSection`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L8) (renderiza), [`PromoCardHot`](../../../apps/referidos-app/src/components/cards/PromoCardHot.jsx#L8) (pasa a CardComponent), [`SectionTitle`](../../../apps/referidos-app/src/components/sections/SectionTitle.jsx#L2) (renderiza).
- **Llamadas directas en el cuerpo** [`suggestions.map`](../../../apps/referidos-app/src/components/search/SearchIdle.jsx#L43).

#### [`button.onClick`](../../../apps/referidos-app/src/components/search/SearchIdle.jsx#L47) · callback JSX · dentro de [`SearchIdle`](../../../apps/referidos-app/src/components/search/SearchIdle.jsx#L15)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onSelectSuggestion`](../../../apps/referidos-app/src/components/search/SearchIdle.jsx#L47).

### [`apps/referidos-app/src/components/search/SearchResults.jsx`](../../../apps/referidos-app/src/components/search/SearchResults.jsx#L1)

Dibuja el conjunto de resultados que prepara el contexto que activó la búsqueda.

**Superficie que exporta.** [`SearchResults`](../../../apps/referidos-app/src/components/search/SearchResults.jsx#L3).

**Dependencias del archivo.** [`./SearchEmpty`](../../../apps/referidos-app/src/components/search/SearchEmpty.jsx).

#### [`SearchResults`](../../../apps/referidos-app/src/components/search/SearchResults.jsx#L3) · componente React · exportación por defecto

Monta `SearchEmpty`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, showTitle, items, renderItem, emptyState, showEmpty, wrapperClassName, listClassName, titleClassName}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SearchEmpty`.
- **Usa código de** [`SearchEmpty`](../../../apps/referidos-app/src/components/search/SearchEmpty.jsx#L1) (renderiza).
- **Llamadas directas en el cuerpo** [`items.map`](../../../apps/referidos-app/src/components/search/SearchResults.jsx#L20).

### [`apps/referidos-app/src/components/search/useSearchMode.js`](../../../apps/referidos-app/src/components/search/useSearchMode.js#L1)

Coordina apertura, cierre y estado contextual del modo de búsqueda.

**Superficie que exporta.** [`useSearchMode`](../../../apps/referidos-app/src/components/search/useSearchMode.js#L3).

**Dependencias del archivo.** `react`.

#### [`useSearchMode`](../../../apps/referidos-app/src/components/search/useSearchMode.js#L3) · hook React · exportado

Obtiene o resuelve `Mode` para entregarlo al consumidor.

- **Entradas** `{defaultQuery} = valor por defecto`.
- **Retorno visible o tipo declarado** `query`, `setQuery`, `isSearching`, `onFocus`, `onCancel`.
- **Estado o valores vinculados** `[query, setQueryState] mediante useState`, `[active, setActive] mediante useState`.
- **Hooks que llama** `useState`.

#### [`setQuery`](../../../apps/referidos-app/src/components/search/useSearchMode.js#L7) · callback React · dentro de [`useSearchMode`](../../../apps/referidos-app/src/components/search/useSearchMode.js#L3)

Aplica o guarda `Query` para que el estado refleje la operación.

- **Entradas** `next`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setQueryState`, `setActive`.
- **Condiciones que evalúa** `trimmed.length`.
- **Llamadas directas en el cuerpo** [`next.trim`](../../../apps/referidos-app/src/components/search/useSearchMode.js#L8), [`setQueryState`](../../../apps/referidos-app/src/components/search/useSearchMode.js#L9), [`setActive`](../../../apps/referidos-app/src/components/search/useSearchMode.js#L11).
- **Lo usa** [`useSearchMode`](../../../apps/referidos-app/src/components/search/useSearchMode.js#L29) (referencia).

#### [`onFocus`](../../../apps/referidos-app/src/components/search/useSearchMode.js#L15) · callback React · dentro de [`useSearchMode`](../../../apps/referidos-app/src/components/search/useSearchMode.js#L3)

Maneja `Focus` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setActive`.
- **Llamadas directas en el cuerpo** [`setActive`](../../../apps/referidos-app/src/components/search/useSearchMode.js#L16).
- **Lo usa** [`useSearchMode`](../../../apps/referidos-app/src/components/search/useSearchMode.js#L29) (referencia).

#### [`onCancel`](../../../apps/referidos-app/src/components/search/useSearchMode.js#L19) · callback React · dentro de [`useSearchMode`](../../../apps/referidos-app/src/components/search/useSearchMode.js#L3)

Maneja `Cancel` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setQueryState`, `setActive`.
- **Llamadas directas en el cuerpo** [`setQueryState`](../../../apps/referidos-app/src/components/search/useSearchMode.js#L20), [`setActive`](../../../apps/referidos-app/src/components/search/useSearchMode.js#L21).
- **Lo usa** [`useSearchMode`](../../../apps/referidos-app/src/components/search/useSearchMode.js#L29) (referencia).

#### [`isSearching`](../../../apps/referidos-app/src/components/search/useSearchMode.js#L25) · cálculo memorizado · dentro de [`useSearchMode`](../../../apps/referidos-app/src/components/search/useSearchMode.js#L3)

Comprueba `Searching` para decidir si se admite o continúa la operación.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`query.trim`](../../../apps/referidos-app/src/components/search/useSearchMode.js#L25).
- **Lo usa** [`useSearchMode`](../../../apps/referidos-app/src/components/search/useSearchMode.js#L29) (referencia).

### [`apps/referidos-app/src/components/sections/PromoSection.jsx`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L1)

Compone encabezado y contenido de una sección de promociones a partir de props.

**Superficie que exporta.** [`PromoSection`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L8).

**Módulos que lo cargan.** [`InicioPromos.jsx`](../../../apps/referidos-app/src/cliente/inicio/InicioPromos.jsx#L2) (importa), [`SearchIdle.jsx`](../../../apps/referidos-app/src/components/search/SearchIdle.jsx#L2) (importa), [`SearchIdle.jsx`](../../../apps/referidos-app/src/search/SearchIdle.jsx#L2) (importa).

**Dependencias del archivo.** `react`, [`../cards/PromoCardCercanas`](../../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx), [`./SectionTitle`](../../../apps/referidos-app/src/components/sections/SectionTitle.jsx), [`../../hooks/useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js), [`../../hooks/useAutoCarousel`](../../../apps/referidos-app/src/hooks/useAutoCarousel.js).

#### [`PromoSection`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L8) · componente React · exportación por defecto

Monta `SectionTitle`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, promos, ratings, CardComponent, autoScroll, autoScrollInterval, loop, loopPeek, gapClassName}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Estado o valores vinculados** `ref mediante useRef`, `[autoActive, setAutoActive] mediante useState`, `resumeTimerRef mediante useRef`.
- **Interfaz que monta** `SectionTitle`.
- **Hooks que llama** `useRef`, `useState`, `useCarousel`, `useAutoCarousel`, `useEffect`.
- **Condiciones que evalúa** `ausencia de promos o promos.length`.
- **Usa código de** [`PromoCardCercanas`](../../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx#L7) (referencia), [`useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js#L5) (llama), [`useAutoCarousel`](../../../apps/referidos-app/src/hooks/useAutoCarousel.js#L3) (llama), [`SectionTitle`](../../../apps/referidos-app/src/components/sections/SectionTitle.jsx#L2) (renderiza).
- **Llamadas directas en el cuerpo** [`flatMap`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L70), [`promos.map`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L71), [`renderItems.map`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L103), [`React.createElement`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L104).
- **Lo usa** [`InicioPromos`](../../../apps/referidos-app/src/cliente/inicio/InicioPromos.jsx#L10) (renderiza), [`SearchIdle`](../../../apps/referidos-app/src/components/search/SearchIdle.jsx#L29) (renderiza), [`SearchIdle`](../../../apps/referidos-app/src/search/SearchIdle.jsx#L29) (renderiza).

#### [`onInteract`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L28) · función · dentro de [`PromoSection`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L8)

Maneja `Interact` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setAutoActive`, `clearTimeout`.
- **Efectos y APIs** `clearTimeout`, `setTimeout`.
- **Condiciones que evalúa** `ausencia de autoScroll`, `resumeTimerRef.current`.
- **Llamadas directas en el cuerpo** [`setAutoActive`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L30), [`clearTimeout`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L32), [`setTimeout`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L34).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L34) · callback de infraestructura · dentro de [`onInteract`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L28)

Ejecuta trabajo diferido o periódico iniciado por `onInteract`.

- **Actualizaciones de estado o acciones** `setAutoActive`.
- **Llamadas directas en el cuerpo** [`setAutoActive`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L35), [`scroll`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L36).

#### [`onTick`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L44) · función · dentro de [`PromoSection`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L8)

Maneja `Tick` y coordina las acciones indicadas abajo.

- **Condiciones que evalúa** `loopEnabled`, `canRight`, `canLeft`.
- **Llamadas directas en el cuerpo** [`scroll`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L46), [`scrollToStart`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L54).

#### [`useEffect · callback`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L59) · callback de infraestructura · dentro de [`PromoSection`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L8)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `PromoSection`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `clearTimeout`.
- **Condiciones que evalúa** `resumeTimerRef.current`.
- **Llamadas directas en el cuerpo** [`clearTimeout`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L62).

### [`apps/referidos-app/src/components/sections/SectionTitle.jsx`](../../../apps/referidos-app/src/components/sections/SectionTitle.jsx#L1)

Presenta títulos reutilizables de secciones de promociones.

**Superficie que exporta.** [`SectionTitle`](../../../apps/referidos-app/src/components/sections/SectionTitle.jsx#L2).

**Módulos que lo cargan.** [`SearchIdle.jsx`](../../../apps/referidos-app/src/components/search/SearchIdle.jsx#L3) (importa), [`PromoSection.jsx`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L3) (importa), [`InicioPromos.jsx`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L4) (importa), [`SearchIdle.jsx`](../../../apps/referidos-app/src/search/SearchIdle.jsx#L3) (importa).

#### [`SectionTitle`](../../../apps/referidos-app/src/components/sections/SectionTitle.jsx#L2) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{children}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`SearchIdle`](../../../apps/referidos-app/src/components/search/SearchIdle.jsx#L41) (renderiza), [`PromoSection`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L93) (renderiza), [`InicioPromos`](../../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx#L63) (renderiza), [`SearchIdle`](../../../apps/referidos-app/src/search/SearchIdle.jsx#L41) (renderiza).

### [`apps/referidos-app/src/components/ui/Badge.jsx`](../../../apps/referidos-app/src/components/ui/Badge.jsx#L1)

Etiqueta visual reutilizable para estados o categorías.

**Superficie que exporta.** [`Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx#L1).

**Módulos que lo cargan.** [`AdminSidebar.jsx`](../../../apps/referidos-app/src/admin/layout/AdminSidebar.jsx#L22) (importa), [`LogsTable.jsx`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L4) (importa), [`NegocioDetalle.jsx`](../../../apps/referidos-app/src/admin/negocios/NegocioDetalle.jsx#L4) (importa), [`NegociosTable.jsx`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L4) (importa), [`ErrorCatalogTable.jsx`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L5) (importa), [`IssuesTable.jsx`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L21) (importa), [`PromosTable.jsx`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L4) (importa), [`QRDetalle.jsx`](../../../apps/referidos-app/src/admin/qrs/QRDetalle.jsx#L4) (importa), [`QRsTable.jsx`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L4) (importa), [`ReportesTable.jsx`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L4) (importa), [`RegistroCodes.jsx`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L4) (importa), [`UsuarioDrawer.jsx`](../../../apps/referidos-app/src/admin/usuarios/UsuarioDrawer.jsx#L4) (importa), [`UsuariosTable.jsx`](../../../apps/referidos-app/src/admin/usuarios/UsuariosTable.jsx#L4) (importa), [`LocationPanel.jsx`](../../../apps/referidos-app/src/components/header-panels/LocationPanel.jsx#L2) (importa), [`LocationPanel.jsx`](../../../apps/referidos-app/src/layouts/header-panels/LocationPanel.jsx#L2) (importa).

#### [`Badge`](../../../apps/referidos-app/src/components/ui/Badge.jsx#L1) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{children, className, ...props}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`AdminSidebar`](../../../apps/referidos-app/src/admin/layout/AdminSidebar.jsx#L120) (renderiza), [`LogsTable`](../../../apps/referidos-app/src/admin/logs/LogsTable.jsx#L169) (renderiza), [`NegocioDetalle`](../../../apps/referidos-app/src/admin/negocios/NegocioDetalle.jsx#L37) (renderiza), [`NegociosTable`](../../../apps/referidos-app/src/admin/negocios/NegociosTable.jsx#L132) (renderiza), [`ErrorCatalogTable`](../../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx#L166) (renderiza), [`IssuesTable`](../../../apps/referidos-app/src/admin/observability/IssuesTable.jsx#L1457) (renderiza), [`PromosTable`](../../../apps/referidos-app/src/admin/promos/PromosTable.jsx#L119) (renderiza), [`QRDetalle`](../../../apps/referidos-app/src/admin/qrs/QRDetalle.jsx#L35) (renderiza), [`QRsTable`](../../../apps/referidos-app/src/admin/qrs/QRsTable.jsx#L129) (renderiza), [`ReportesTable`](../../../apps/referidos-app/src/admin/reportes/ReportesTable.jsx#L127) (renderiza), [`RegistroCodes`](../../../apps/referidos-app/src/admin/sistema/RegistroCodes.jsx#L186) (renderiza), [`UsuarioDrawer`](../../../apps/referidos-app/src/admin/usuarios/UsuarioDrawer.jsx#L37) (renderiza) y 3 más.

### [`apps/referidos-app/src/components/ui/ConfirmDialog.jsx`](../../../apps/referidos-app/src/components/ui/ConfirmDialog.jsx#L1)

Presenta decisiones de confirmación con una composición compartida.

**Superficie que exporta.** [`ConfirmDialog`](../../../apps/referidos-app/src/components/ui/ConfirmDialog.jsx#L4).

**Dependencias del archivo.** `react`.

#### [`ConfirmDialog`](../../../apps/referidos-app/src/components/ui/ConfirmDialog.jsx#L4) · componente React · exportación por defecto

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{open, title, description, confirmLabel, cancelLabel, onConfirm, onCancel, tone}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Interfaz que monta** `button`.
- **Condiciones que evalúa** `ausencia de open`.

### [`apps/referidos-app/src/components/ui/LoaderOverlay.jsx`](../../../apps/referidos-app/src/components/ui/LoaderOverlay.jsx#L1)

Cubre una pantalla mientras hay carga y permite diferenciar interacción bloqueada.

**Superficie que exporta.** [`LoaderOverlay`](../../../apps/referidos-app/src/components/ui/LoaderOverlay.jsx#L1).

**Módulos que lo cargan.** [`ClienteInicio.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L16) (importa), [`NegocioInicio.jsx`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L4) (importa).

#### [`LoaderOverlay`](../../../apps/referidos-app/src/components/ui/LoaderOverlay.jsx#L1) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{children}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L135) (renderiza), [`NegocioInicio`](../../../apps/referidos-app/src/negocio/inicio/NegocioInicio.jsx#L144) (renderiza).

### [`apps/referidos-app/src/components/ui/SearchBar.jsx`](../../../apps/referidos-app/src/components/ui/SearchBar.jsx#L1)

Implementa el campo de búsqueda y propaga texto o teclado a su contenedor. Hay variantes para distintos shells.

**Dependencias del archivo.** [`../../search/SearchBar`](../../../apps/referidos-app/src/search/SearchBar.jsx).

El archivo participa como entrada, adaptador de imports o reexportación.

### [`apps/referidos-app/src/components/ui/skeleton/SkeletonAvatar.jsx`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonAvatar.jsx#L1)

Dibuja un placeholder con forma de avatar al cargar.

**Superficie que exporta.** [`SkeletonAvatar`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonAvatar.jsx#L3).

**Módulos que lo cargan.** [`SkeletonCard.jsx`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonCard.jsx#L3) (importa).

**Dependencias del archivo.** [`./SkeletonBase`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBase.jsx).

#### [`SkeletonAvatar`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonAvatar.jsx#L3) · componente React · exportación por defecto

Monta `SkeletonBase`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{size, shape, className, style}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SkeletonBase`.
- **Usa código de** [`SkeletonBase`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBase.jsx#L8) (renderiza).
- **Lo usa** [`SkeletonCard`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonCard.jsx#L26) (renderiza).

### [`apps/referidos-app/src/components/ui/skeleton/SkeletonBase.jsx`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBase.jsx#L1)

Define el elemento básico utilizado por los skeletons de distintas piezas.

**Superficie que exporta.** [`SkeletonBase`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBase.jsx#L8).

**Módulos que lo cargan.** [`SkeletonAvatar.jsx`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonAvatar.jsx#L1) (importa), [`SkeletonBlock.jsx`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx#L1) (importa).

#### [`toSize`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBase.jsx#L3) · función

Implementa `to Size` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`, `fallback`.
- **Condiciones que evalúa** `number`.
- **Lo usa** [`SkeletonBase`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBase.jsx#L16) (llama).

#### [`SkeletonBase`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBase.jsx#L8) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{width, height, radius, className, style}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`toSize`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBase.jsx#L16), [`trim`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBase.jsx#L25).
- **Lo usa** [`SkeletonAvatar`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonAvatar.jsx#L11) (renderiza), [`SkeletonBlock`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx#L11) (renderiza).

### [`apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx#L1)

Dibuja un bloque de contenido en espera.

**Superficie que exporta.** [`SkeletonBlock`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx#L3).

**Módulos que lo cargan.** [`HistorialSkeleton.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialSkeleton.jsx#L1) (importa), [`ClienteInicioSkeleton.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx#L1) (importa), [`SkeletonCard.jsx`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonCard.jsx#L1) (importa), [`SkeletonText.jsx`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx#L1) (importa), [`InicioSkeleton.jsx`](../../../apps/referidos-app/src/negocio/inicio/InicioSkeleton.jsx#L1) (importa).

**Dependencias del archivo.** [`./SkeletonBase`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBase.jsx).

#### [`SkeletonBlock`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx#L3) · componente React · exportación por defecto

Monta `SkeletonBase`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{width, height, radius, className, style}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SkeletonBase`.
- **Usa código de** [`SkeletonBase`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBase.jsx#L8) (renderiza).
- **Lo usa** [`HistorialSkeleton`](../../../apps/referidos-app/src/cliente/historial/HistorialSkeleton.jsx#L13) (renderiza), [`NuevasRow`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx#L18) (renderiza), [`HotRow`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx#L57) (renderiza), [`ClienteInicioSkeleton`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx#L75) (renderiza), [`SkeletonCard`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonCard.jsx#L21) (renderiza), [`SkeletonText`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx#L28) (renderiza), [`MetricsRow`](../../../apps/referidos-app/src/negocio/inicio/InicioSkeleton.jsx#L12) (renderiza), [`PromoSkeletonCard`](../../../apps/referidos-app/src/negocio/inicio/InicioSkeleton.jsx#L28) (renderiza), [`InicioSkeleton`](../../../apps/referidos-app/src/negocio/inicio/InicioSkeleton.jsx#L43) (renderiza).

### [`apps/referidos-app/src/components/ui/skeleton/SkeletonCard.jsx`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonCard.jsx#L1)

Dibuja la forma esperada de una tarjeta antes de recibir datos.

**Superficie que exporta.** [`SkeletonCard`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonCard.jsx#L5).

**Módulos que lo cargan.** [`ClienteInicioSkeleton.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx#L3) (importa).

**Dependencias del archivo.** [`./SkeletonBlock`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx), [`./SkeletonText`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx), [`./SkeletonAvatar`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonAvatar.jsx).

#### [`SkeletonCard`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonCard.jsx#L5) · componente React · exportación por defecto

Monta `SkeletonBlock`, `SkeletonText`, `SkeletonAvatar`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{imageHeight, lines, showAvatar, className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SkeletonBlock`, `SkeletonText`, `SkeletonAvatar`.
- **Usa código de** [`SkeletonBlock`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx#L3) (renderiza), [`SkeletonText`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx#L8) (renderiza), [`SkeletonAvatar`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonAvatar.jsx#L3) (renderiza).
- **Lo usa** [`CercanasRow`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx#L36) (renderiza).

### [`apps/referidos-app/src/components/ui/skeleton/SkeletonList.jsx`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonList.jsx#L1)

Repite partes de skeleton para anticipar una lista durante carga.

**Superficie que exporta.** [`SkeletonList`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonList.jsx#L1).

#### [`SkeletonList`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonList.jsx#L1) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{count, item, gap, className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonList.jsx#L17), [`renderItem`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonList.jsx#L18).

### [`apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx#L1)

Anticipa líneas de texto y conserva la estructura antes de cargar.

**Superficie que exporta.** [`SkeletonText`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx#L8).

**Módulos que lo cargan.** [`HistorialSkeleton.jsx`](../../../apps/referidos-app/src/cliente/historial/HistorialSkeleton.jsx#L2) (importa), [`ClienteInicioSkeleton.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx#L2) (importa), [`SkeletonCard.jsx`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonCard.jsx#L2) (importa), [`InicioSkeleton.jsx`](../../../apps/referidos-app/src/negocio/inicio/InicioSkeleton.jsx#L2) (importa).

**Dependencias del archivo.** [`./SkeletonBlock`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx).

#### [`toSize`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx#L3) · función

Implementa `to Size` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`, `fallback`.
- **Condiciones que evalúa** `number`.
- **Lo usa** [`SkeletonText`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx#L22) (llama).

#### [`SkeletonText`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx#L8) · componente React · exportación por defecto

Monta `SkeletonBlock`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{lines, lineHeight, gap, lastLineWidth, className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SkeletonBlock`.
- **Usa código de** [`SkeletonBlock`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBlock.jsx#L3) (renderiza).
- **Llamadas directas en el cuerpo** [`toSize`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx#L22), [`map`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonText.jsx#L25).
- **Lo usa** [`HistorialSkeleton`](../../../apps/referidos-app/src/cliente/historial/HistorialSkeleton.jsx#L17) (renderiza), [`NuevasRow`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicioSkeleton.jsx#L22) (renderiza), [`SkeletonCard`](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonCard.jsx#L23) (renderiza), [`PromoSkeletonCard`](../../../apps/referidos-app/src/negocio/inicio/InicioSkeleton.jsx#L30) (renderiza).

### [`apps/referidos-app/src/components/ui/Spinner.jsx`](../../../apps/referidos-app/src/components/ui/Spinner.jsx#L1)

Renderiza el indicador de progreso genérico que consumen paneles y botones.

El archivo participa como entrada, adaptador de imports o reexportación.
