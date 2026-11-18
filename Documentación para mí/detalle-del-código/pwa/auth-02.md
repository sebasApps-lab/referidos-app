# PWA principal · Auth y onboarding · 2 de 5

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/auth/hooks/useAuthFlow.js`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L1)
- [`apps/referidos-app/src/auth/hooks/useAuthPrefill.js`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L1)
- [`apps/referidos-app/src/auth/hooks/useContactPhone.js`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L1)
- [`apps/referidos-app/src/auth/hooks/useEmailVerification.js`](../../../apps/referidos-app/src/auth/hooks/useEmailVerification.js#L1)
- [`apps/referidos-app/src/auth/hooks/useLocationStep.js`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L1)
- [`apps/referidos-app/src/auth/hooks/usePasswordAccess.js`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L1)
- [`apps/referidos-app/src/auth/hooks/useRegisterPasswordUI.js`](../../../apps/referidos-app/src/auth/hooks/useRegisterPasswordUI.js#L1)
- [`apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L1)
- [`apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L1)
- [`apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L1)
- [`apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L1)
- [`apps/referidos-app/src/auth/steps/AddPasswordStep.jsx`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L1)
- [`apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/auth/hooks/useAuthFlow.js`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L1)

Mantiene el estado de formularios, paso actual y mediciones de transición. Expone las referencias y setters que usa AuthFlow.

**Superficie que exporta.** [`useAuthFlow`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L4).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L24) (importa).

**Dependencias del archivo.** `react`, [`../constants/authSteps`](../../../apps/referidos-app/src/auth/constants/authSteps.js).

#### [`useAuthFlow`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L4) · hook React · exportación por defecto

Agrupa estado, contexto o efectos de `Auth Flow` para sus consumidores React.

- **Entradas** `{initialStep} = valor por defecto`.
- **Retorno visible o tipo declarado** `cardHeight`, `sliderHeight`, `animating`, `step`, `emailError`, `welcomeError`, `loginLoading`, `oauthLoading`, `oauthProvider`, `welcomeLoading`, `isAddressSearchModeOpen`, `isAddressPrefillReady`, `cardRef`, `cardInnerRef`, `sliderRef`, `regPage1Ref`, `regPage2Ref`, `email` y 57 más.
- **Estado o valores vinculados** `[cardHeight, setCardHeight] mediante useState`, `[sliderHeight, setSliderHeight] mediante useState`, `[animating, setAnimating] mediante useState`, `[step, setStep] mediante useState`, `[emailError, setEmailError] mediante useState`, `[welcomeError, setWelcomeError] mediante useState`, `[loginLoading, setLoginLoading] mediante useState`, `[oauthLoading, setOauthLoading] mediante useState`, `[oauthProvider, setOauthProvider] mediante useState`, `[welcomeLoading, setWelcomeLoading] mediante useState`, `[isAddressSearchModeOpen, setIsAddressSearchModeOpen] mediante useState`, `[isAddressPrefillReady, setIsAddressPrefillReady] mediante useState`, `cardRef mediante useRef`, `cardInnerRef mediante useRef` y 25 más.
- **Hooks que llama** `useState`, `useRef`, `useLayoutEffect`, `useEffect`.
- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L169) (llama).

#### [`containerStyle`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L90) · cálculo memorizado · dentro de [`useAuthFlow`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L4)

Función auxiliar de `useAuthFlow` para `container Style`.

- **Retorno visible o tipo declarado** `display`, `flexDirection`, `gap`, `transition`, `filter`, `opacity`, `width`, `boxSizing`.
- **Hooks que llama** `useMemo`.
- **Lo usa** [`useAuthFlow`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L214) (referencia).

#### [`getActiveFormRef`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L104) · callback React · dentro de [`useAuthFlow`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L4)

Obtiene o resuelve `Active Form Ref` para entregarlo al consumidor.

- **Entradas** `targetStep = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`includes`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L105).
- **Lo usa** [`measureHeights`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L132) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L161) (llama), [`useAuthFlow`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L166) (referencia).

#### [`measureHeights`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L124) · callback React · dentro de [`useAuthFlow`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L4)

Coordina cambios de estado durante `measure Heights`.

- **Entradas** `targetStep = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSliderHeight`, `setCardHeight`.
- **Condiciones que evalúa** `targetStep`, `ausencia de inner o ausencia de active`.
- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`getActiveFormRef`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L132), [`window.getComputedStyle`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L137), [`parseFloat`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L138), [`setSliderHeight`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L144), [`setCardHeight`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L145).
- **Lo usa** [`useLayoutEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L152) (llama), [`useAuthFlow`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L153) (referencia), [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L156) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L163) (llama).

#### [`useLayoutEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L151) · callback de infraestructura · dentro de [`useAuthFlow`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L4)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useAuthFlow`.

- **Llamadas directas en el cuerpo** [`measureHeights`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L152).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L155) · callback de infraestructura · dentro de [`useAuthFlow`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L4)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useAuthFlow`.

- **Efectos y APIs** `requestAnimationFrame`.
- **Llamadas directas en el cuerpo** [`requestAnimationFrame`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L156), [`measureHeights`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L156), [`cancelAnimationFrame`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L157).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L160) · callback de infraestructura · dentro de [`useAuthFlow`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L4)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useAuthFlow`.

- **Condiciones que evalúa** `ausencia de active`.
- **Llamadas directas en el cuerpo** [`getActiveFormRef`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L161), [`measureHeights`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L163), [`ro.observe`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L164), [`ro.disconnect`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L165).

#### [`goToStep`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L168) · callback React · dentro de [`useAuthFlow`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L4)

Coordina cambios de estado durante `go To Step`.

- **Entradas** `nextStep`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setAnimating`, `setStep`.
- **Efectos y APIs** `setTimeout`.
- **Llamadas directas en el cuerpo** [`setAnimating`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L169), [`setStep`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L170), [`setTimeout`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L171).
- **Lo usa** [`useAuthFlow`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L249) (referencia).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L171) · callback de infraestructura · dentro de [`goToStep`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L168)

Ejecuta trabajo diferido o periódico iniciado por `goToStep`.

- **Actualizaciones de estado o acciones** `setAnimating`.
- **Llamadas directas en el cuerpo** [`setAnimating`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L171).

### [`apps/referidos-app/src/auth/hooks/useAuthPrefill.js`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L1)

Transforma el usuario y onboarding existentes en valores iniciales para evitar pedir datos por segunda vez.

**Superficie que exporta.** [`useAuthPrefill`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L10).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L26) (importa).

**Dependencias del archivo.** `react`, [`../constants/authSteps`](../../../apps/referidos-app/src/auth/constants/authSteps.js), [`../utils/authMappers`](../../../apps/referidos-app/src/auth/utils/authMappers.js), [`../utils/userProfileUtils`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js), [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js).

#### [`useAuthPrefill`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L10) · hook React · exportación por defecto

Agrupa estado, contexto o efectos de `Auth Prefill` para sus consumidores React.

- **Entradas** `{usuario, onboarding, setStep, setEmailError, setNombreDueno, setApellidoDueno, setGenero, setTelefono, setFechaNacimiento, setOwnerPrefill, setBusinessPrefill, setNombreNegocio, setCategoriaNegocio, setIsSucursalPrincipal, setHorarios, setSectorNegocio, setCalle1, setCalle2, setDireccionPayload, setIsAddressPrefillReady, skipStepChange}`.
- **Estado o valores vinculados** `choiceOpenedRef mediante useRef`, `direccionRequestRef mediante useRef`.
- **Hooks que llama** `useRef`, `useEffect`.
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L281) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L36) · callback de infraestructura · dentro de [`useAuthPrefill`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L10)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useAuthPrefill`.

- **Actualizaciones de estado o acciones** `setIsAddressPrefillReady`, `setOwnerPrefill`, `setGenero`, `setBusinessPrefill`, `setCategoriaNegocio`, `setIsSucursalPrincipal`, `setDireccionPayload`.
- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`setIsAddressPrefillReady`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L39), [`setOwnerPrefill`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L40), [`setGenero`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L46), [`setBusinessPrefill`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L47), [`setCategoriaNegocio`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L52), [`setIsSucursalPrincipal`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L53), [`setDireccionPayload`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L54).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L86) · callback de infraestructura · dentro de [`useAuthPrefill`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L10)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useAuthPrefill`.

- **Actualizaciones de estado o acciones** `setIsAddressPrefillReady`, `setOwnerPrefill`, `setGenero`, `setBusinessPrefill`, `setCategoriaNegocio`, `setIsSucursalPrincipal`, `setDireccionPayload`, `setStep`, `setEmailError`, `setNombreDueno`, `setApellidoDueno`, `setTelefono` y 5 más.
- **Condiciones que evalúa** `undefined`, `ausencia de usuario`, `onboardingOk y ausencia de choiceOpenedRef.current`, `ausencia de usuario.role`, `ausencia de choiceOpenedRef.current`, `allowAccess y ausencia de u.role y clientSteps.profilePending o clientSteps.addressPending`, `u.role`, `ausencia de allowAccess` y 6 más.
- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo), [`mapClientePrefill`](../../../apps/referidos-app/src/auth/utils/authMappers.js#L23) (llama), [`normalizeUserName`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L28) (llama), [`formatBirthdateForInput`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L133) (llama), [`mapNegocioPrefill`](../../../apps/referidos-app/src/auth/utils/authMappers.js#L6) (llama).
- **Llamadas directas en el cuerpo** [`setIsAddressPrefillReady`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L92), [`setOwnerPrefill`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L93), [`setGenero`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L99), [`setBusinessPrefill`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L100), [`setCategoriaNegocio`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L105), [`setIsSucursalPrincipal`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L106), [`setDireccionPayload`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L107), [`setStep`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L129), [`resolveClientSteps`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L195), [`setEmailError`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L215), [`boot.reasons.join`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L215), [`mapClientePrefill`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L220) y 18 más.

#### [`resolveClientSteps`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L182) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L86)

Obtiene o resuelve `Client Steps` para entregarlo al consumidor.

- **Entradas** `state`.
- **Retorno visible o tipo declarado** `profilePending`, `addressPending`.
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L195) (llama).

#### [`finalizeDireccion`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L252) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L86)

Coordina cambios de estado durante `finalize Direccion`.

- **Actualizaciones de estado o acciones** `setIsAddressPrefillReady`.
- **Condiciones que evalúa** `requestId`.
- **Llamadas directas en el cuerpo** [`setIsAddressPrefillReady`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L254).
- **Lo usa** [`loadDireccion`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L260) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L320) (llama).

#### [`loadDireccion`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L258) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L86)

Consulta o invoca tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) y coordina las demás operaciones de esta ficha.

- **Actualizaciones de estado o acciones** `setCalle1`, `setCalle2`, `setSectorNegocio`, `setDireccionPayload`.
- **Condiciones que evalúa** `ausencia de u.id`, `requestId`, `dirErr o ausencia de dirData`, `hasDireccionFields`.
- **Contrato de datos** tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) (`select`) en [`useAuthPrefill.js:264`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L264), tabla o bucket [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) en [`useAuthPrefill.js:264`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L264).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`finalizeDireccion`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L260), [`maybeSingle`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L264), [`order`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L264), [`eq`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L264), [`select`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L264), [`supabase.from`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L264), [`setCalle1`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L278), [`setCalle2`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L279), [`setSectorNegocio`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L280), [`setDireccionPayload`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L295).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L320) (llama).

#### [`finalizeDireccion`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L385) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L86)

Coordina cambios de estado durante `finalize Direccion`.

- **Actualizaciones de estado o acciones** `setIsAddressPrefillReady`.
- **Condiciones que evalúa** `requestId`.
- **Llamadas directas en el cuerpo** [`setIsAddressPrefillReady`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L387).
- **Lo usa** [`loadSucursal`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L401) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L542) (llama).

#### [`loadSucursal`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L390) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L86)

Consulta o invoca tabla o vista [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) y coordina las demás operaciones de esta ficha.

- **Actualizaciones de estado o acciones** `setIsSucursalPrincipal`, `setHorarios`, `setCalle1`, `setCalle2`, `setSectorNegocio`, `setDireccionPayload`.
- **Condiciones que evalúa** `ausencia de negocioId y u.id`, `ausencia de negocioId`, `requestId`, `error o ausencia de data`, `picked.tipo`, `picked.horarios`, `picked.direccion_id`, `dirErr o ausencia de dirData` y 2 más.
- **Contrato de datos** tabla o vista [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) (`select`) en [`useAuthPrefill.js:393`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L393), tabla o bucket [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) en [`useAuthPrefill.js:393`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L393), tabla o vista [`sucursales`](../../../apps/referidos-app/supabase/migrations/20250227_000001_restore_sucursales_flags_verificacion.sql#L6) (`select`) en [`useAuthPrefill.js:405`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L405), tabla o bucket [`sucursales`](../../../apps/referidos-app/supabase/migrations/20250227_000001_restore_sucursales_flags_verificacion.sql#L6) en [`useAuthPrefill.js:405`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L405), tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) (`select`) en [`useAuthPrefill.js:432`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L432), tabla o bucket [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) en [`useAuthPrefill.js:432`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L432).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`maybeSingle`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L393), [`eq`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L393), [`select`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L393), [`supabase.from`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L393), [`finalizeDireccion`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L401), [`order`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L405), [`rows.find`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L418), [`toLowerCase`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L419), [`setIsSucursalPrincipal`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L426), [`setHorarios`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L429), [`setCalle1`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L443), [`setCalle2`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L444) y 2 más.
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L542) (llama).

### [`apps/referidos-app/src/auth/hooks/useContactPhone.js`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L1)

Controla entrada, normalización y validación del teléfono de contacto.

**Superficie que exporta.** [`useContactPhone`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L12).

**Módulos que lo cargan.** [`ContactPhoneBlock.jsx`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L1) (importa).

**Dependencias del archivo.** `react`.

#### [`COUNTRY_CODES`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L3) · variable de módulo

Conserva la lista de `COUNTRY CODES` usada por el módulo.

- **Lo usa** [`parsed`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L28) (accede al módulo), [`useContactPhone`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L99) (referencia).

#### [`useContactPhone`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L12) · hook React · exportación por defecto

Agrupa estado, contexto o efectos de `Contact Phone` para sus consumidores React.

- **Entradas** `{initialPhone, onSave, onStatusChange} = valor por defecto`.
- **Retorno visible o tipo declarado** `COUNTRY_CODES`, `editingPhone`, `setEditingPhone`, `dropdownOpen`, `setDropdownOpen`, `phoneConfirmed`, `setPhoneConfirmed`, `phoneMessage`, `phoneError`, `savingPhone`, `countryCode`, `normalizedDigits`, `phoneValid`, `normalizedPhone`, `handleDigitsChange`, `handleSelectCountry`, `handleConfirmPhone`.
- **Estado o valores vinculados** `[editingPhone, setEditingPhone] mediante useState`, `[dropdownOpen, setDropdownOpen] mediante useState`, `[phoneConfirmed, setPhoneConfirmed] mediante useState`, `[phoneMessage, setPhoneMessage] mediante useState`, `[phoneError, setPhoneError] mediante useState`, `[savingPhone, setSavingPhone] mediante useState`, `[countryCode, setCountryCode] mediante useState`, `[digits, setDigits] mediante useState`.
- **Hooks que llama** `useState`, `useEffect`.
- **Efectos y APIs** `digits.replace`.
- **Llamadas directas en el cuerpo** [`digits.replace`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L38).
- **Lo usa** [`ContactPhoneBlock`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L44) (llama).

#### [`parsed`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L24) · cálculo memorizado · dentro de [`useContactPhone`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L12)

Función auxiliar de `useContactPhone` para `parsed`.

- **Retorno visible o tipo declarado** `code`, `digits`.
- **Hooks que llama** `useMemo`.
- **Efectos y APIs** `initialPhone.replace`.
- **Condiciones que evalúa** `ausencia de initialPhone`, `match`.
- **Llamadas directas en el cuerpo** [`COUNTRY_CODES.find`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L28), [`initialPhone.startsWith`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L28), [`initialPhone.slice`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L30), [`initialPhone.replace`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L32).
- **Lo usa** [`useContactPhone`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L35) (accede al módulo).

#### [`handleDigitsChange`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L45) · función · dentro de [`useContactPhone`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L12)

Maneja `Digits Change` y coordina las acciones indicadas abajo.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setDigits`, `setPhoneConfirmed`, `setPhoneMessage`, `setPhoneError`.
- **Efectos y APIs** `replace`, `next.replace`.
- **Condiciones que evalúa** `isEcuador`, `next.startsWith`.
- **Llamadas directas en el cuerpo** [`replace`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L46), [`next.startsWith`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L48), [`next.replace`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L49), [`next.slice`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L51), [`setDigits`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L53), [`setPhoneConfirmed`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L54), [`setPhoneMessage`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L55), [`setPhoneError`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L56).
- **Lo usa** [`useContactPhone`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L113) (referencia).

#### [`handleSelectCountry`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L59) · función · dentro de [`useContactPhone`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L12)

Maneja `Select Country` y coordina las acciones indicadas abajo.

- **Entradas** `code`.
- **Actualizaciones de estado o acciones** `setCountryCode`, `setDropdownOpen`, `setPhoneConfirmed`, `setPhoneMessage`, `setPhoneError`.
- **Llamadas directas en el cuerpo** [`setCountryCode`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L60), [`setDropdownOpen`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L61), [`setPhoneConfirmed`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L62), [`setPhoneMessage`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L63), [`setPhoneError`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L64).
- **Lo usa** [`useContactPhone`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L114) (referencia).

#### [`handleConfirmPhone`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L67) · función · asíncrona · dentro de [`useContactPhone`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L12)

Maneja `Confirm Phone` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setPhoneError`, `setPhoneMessage`, `setPhoneConfirmed`, `setSavingPhone`, `setEditingPhone`.
- **Condiciones que evalúa** `ausencia de phoneValid o savingPhone`, `ausencia de onSave`, `result.ok`.
- **Llamadas directas en el cuerpo** [`setPhoneError`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L69), [`setPhoneMessage`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L70), [`setPhoneConfirmed`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L72), [`setSavingPhone`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L75), [`onSave`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L77), [`setEditingPhone`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L83).
- **Lo usa** [`useContactPhone`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L115) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L90) · callback de infraestructura · dentro de [`useContactPhone`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L12)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useContactPhone`.

- **Condiciones que evalúa** `ausencia de onStatusChange`.
- **Llamadas directas en el cuerpo** [`onStatusChange`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L92).

### [`apps/referidos-app/src/auth/hooks/useEmailVerification.js`](../../../apps/referidos-app/src/auth/hooks/useEmailVerification.js#L1)

Coordina la solicitud y comprobación de verificación de correo y el estado de la pantalla mientras espera.

**Superficie que exporta.** [`useEmailVerification`](../../../apps/referidos-app/src/auth/hooks/useEmailVerification.js#L4).

**Módulos que lo cargan.** [`EmailVerificationBlock.jsx`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx#L2) (importa).

**Dependencias del archivo.** `react`, [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js).

#### [`useEmailVerification`](../../../apps/referidos-app/src/auth/hooks/useEmailVerification.js#L4) · hook React · exportación por defecto

Agrupa estado, contexto o efectos de `Email Verification` para sus consumidores React.

- **Entradas** `{initialEmail} = valor por defecto`.
- **Retorno visible o tipo declarado** `emailValue`, `setEmailValue`, `editingEmail`, `setEditingEmail`, `message`, `error`, `sending`, `emailSent`, `handleSendEmail`.
- **Estado o valores vinculados** `[emailValue, setEmailValue] mediante useState`, `[editingEmail, setEditingEmail] mediante useState`, `[message, setMessage] mediante useState`, `[error, setError] mediante useState`, `[sending, setSending] mediante useState`, `[emailSent, setEmailSent] mediante useState`.
- **Hooks que llama** `useState`, `useEffect`.
- **Lo usa** [`EmailVerificationBlock`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx#L37) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useEmailVerification.js#L12) · callback de infraestructura · dentro de [`useEmailVerification`](../../../apps/referidos-app/src/auth/hooks/useEmailVerification.js#L4)

Opera sobre Auth `getUser`. El resultado se adapta al contrato del consumidor.

- **Actualizaciones de estado o acciones** `setEmailValue`.
- **Condiciones que evalúa** `initialEmail`, `active y authEmail`.
- **Contrato de datos** Auth `getUser` en [`useEmailVerification.js:16`](../../../apps/referidos-app/src/auth/hooks/useEmailVerification.js#L16).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.getUser`](../../../apps/referidos-app/src/auth/hooks/useEmailVerification.js#L16), [`setEmailValue`](../../../apps/referidos-app/src/auth/hooks/useEmailVerification.js#L19).

#### [`handleSendEmail`](../../../apps/referidos-app/src/auth/hooks/useEmailVerification.js#L27) · callback React · asíncrona · dentro de [`useEmailVerification`](../../../apps/referidos-app/src/auth/hooks/useEmailVerification.js#L4)

Opera sobre Auth `resend`. El resultado se adapta al contrato del consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`, `setMessage`, `setSending`, `setEmailSent`.
- **Condiciones que evalúa** `ausencia de emailValue`, `resendError`.
- **Contrato de datos** Auth `resend` en [`useEmailVerification.js:36`](../../../apps/referidos-app/src/auth/hooks/useEmailVerification.js#L36).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-app/src/auth/hooks/useEmailVerification.js#L28), [`setMessage`](../../../apps/referidos-app/src/auth/hooks/useEmailVerification.js#L29), [`setSending`](../../../apps/referidos-app/src/auth/hooks/useEmailVerification.js#L34), [`supabase.auth.resend`](../../../apps/referidos-app/src/auth/hooks/useEmailVerification.js#L36), [`setEmailSent`](../../../apps/referidos-app/src/auth/hooks/useEmailVerification.js#L42).
- **Lo usa** [`useEmailVerification`](../../../apps/referidos-app/src/auth/hooks/useEmailVerification.js#L59) (referencia).

### [`apps/referidos-app/src/auth/hooks/useLocationStep.js`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L1)

Coordina territorio, búsqueda de dirección, mapa y posición para completar la ubicación de cliente o negocio.

**Superficie que exporta.** [`useLocationStep`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L5).

**Módulos que lo cargan.** [`UserAddressStep.jsx`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L14) (importa).

**Dependencias del archivo.** `react`, [`../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js), [`../../services/gpsFallbackClient`](../../../apps/referidos-app/src/services/gpsFallbackClient.js).

#### [`useLocationStep`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L5) · hook React · exportación por defecto

Agrupa estado, contexto o efectos de `Location Step` para sus consumidores React.

- **Entradas** `{stage, coords, direccionPayload, setCoords, setCoordsSource, setMapZoom, updateDireccionPayload, programmaticMoveRef, programmaticZoomRef, closeZoom, locationTitle}`.
- **Retorno visible o tipo declarado** `requestLocation`, `permissionState`, `geoAttempted`, `geoErrorCode`.
- **Estado o valores vinculados** `[permissionState, setPermissionState] mediante useState`, `[geoAttempted, setGeoAttempted] mediante useState`, `[geoErrorCode, setGeoErrorCode] mediante useState`, `[isRequestingLocation, setIsRequestingLocation] mediante useState`, `didAutoLocateRef mediante useRef`, `didPromptLocationRef mediante useRef`, `didDeniedLocationRef mediante useRef`, `updateDireccionPayloadRef mediante useRef`.
- **Hooks que llama** `useModal`, `useState`, `useRef`, `useEffect`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Lo usa** [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L289) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L29) · callback de infraestructura · dentro de [`useLocationStep`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L5)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useLocationStep`.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`closeLocationModal`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L33) · callback React · dentro de [`useLocationStep`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L5)

Finaliza `Location Modal` y ajusta el estado que depende de esa operación.

- **Hooks que llama** `useCallback`.
- **Efectos y APIs** `closeModal`.
- **Condiciones que evalúa** `activeModal`.
- **Llamadas directas en el cuerpo** [`closeModal`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L35).
- **Lo usa** [`handlePermissionState`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L124) (llama), [`useLocationStep`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L171) (referencia), [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L183) (llama).

#### [`closeLocationDeniedModal`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L39) · callback React · dentro de [`useLocationStep`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L5)

Finaliza `Location Denied Modal` y ajusta el estado que depende de esa operación.

- **Hooks que llama** `useCallback`.
- **Efectos y APIs** `closeModal`.
- **Condiciones que evalúa** `activeModal`.
- **Llamadas directas en el cuerpo** [`closeModal`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L41).
- **Lo usa** [`handlePermissionState`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L125) (llama), [`useLocationStep`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L170) (referencia), [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L184) (llama).

#### [`closeLocationUnavailableModal`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L45) · callback React · dentro de [`useLocationStep`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L5)

Finaliza `Location Unavailable Modal` y ajusta el estado que depende de esa operación.

- **Hooks que llama** `useCallback`.
- **Efectos y APIs** `closeModal`.
- **Condiciones que evalúa** `activeModal`.
- **Llamadas directas en el cuerpo** [`closeModal`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L47).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L185) (llama), [`useLocationStep`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L190) (referencia).

#### [`requestLocation`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L51) · callback React · dentro de [`useLocationStep`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L5)

Coordina cambios de estado durante `request Location`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setIsRequestingLocation`, `setGeoAttempted`, `setGeoErrorCode`, `setCoords`, `setCoordsSource`, `setMapZoom`, `setPermissionState`.
- **Efectos y APIs** `navigator.geolocation.getCurrentPosition`, `openModal`.
- **Condiciones que evalúa** `ausencia de navigator.geolocation`, `isRequestingLocation`, `code`.
- **Usa código de** [`saveGpsFallbackLocation`](../../../apps/referidos-app/src/services/gpsFallbackClient.js#L3) (llama).
- **Llamadas directas en el cuerpo** [`setIsRequestingLocation`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L56), [`setGeoAttempted`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L57), [`setGeoErrorCode`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L58), [`navigator.geolocation.getCurrentPosition`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L59), [`setCoords`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L66), [`setCoordsSource`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L67), [`setMapZoom`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L69), [`updateDireccionPayloadRef.current`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L70), [`catch`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L74), [`saveGpsFallbackLocation`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L74), [`setPermissionState`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L82), [`openModal`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L83).
- **Lo usa** [`onRetry`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L88) (llama), [`handlePermissionState`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L132) (llama), [`onConfirm`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L149) (llama), [`useLocationStep`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L177) (referencia).

#### [`onRetry`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L88) · función · dentro de [`requestLocation`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L51)

Maneja `Retry` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`requestLocation`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L88).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L105) · callback de infraestructura · dentro de [`useLocationStep`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L5)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useLocationStep`.

- **Condiciones que evalúa** `ausencia de navigator.geolocation`.
- **Llamadas directas en el cuerpo** [`checkPermission`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L165).

#### [`checkPermission`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L111) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L105)

Comprueba `Permission` para decidir si se admite o continúa la operación.

- **Efectos y APIs** `navigator.permissions.query`.
- **Condiciones que evalúa** `stage`, `ausencia de navigator.permissions.query`, `ausencia de active`.
- **Llamadas directas en el cuerpo** [`navigator.permissions.query`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L117), [`handlePermissionState`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L155).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L165) (llama).

#### [`handlePermissionState`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L121) · función · dentro de [`checkPermission`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L111)

Maneja `Permission State` y coordina las acciones indicadas abajo.

- **Entradas** `state`.
- **Actualizaciones de estado o acciones** `setPermissionState`.
- **Efectos y APIs** `openModal`.
- **Condiciones que evalúa** `state`, `ausencia de didAutoLocateRef.current`, `ausencia de hasCoords`, `ausencia de didDeniedLocationRef.current`, `ausencia de didPromptLocationRef.current`.
- **Llamadas directas en el cuerpo** [`setPermissionState`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L122), [`closeLocationModal`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L124), [`closeLocationDeniedModal`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L125), [`requestLocation`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L132), [`openModal`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L141).
- **Lo usa** [`checkPermission`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L155) (llama), [`status.onchange`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L158) (llama).

#### [`onConfirm`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L149) · función · dentro de [`handlePermissionState`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L121)

Maneja `Confirm` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`requestLocation`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L149).

#### [`status.onchange`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L156) · función asignada · dentro de [`checkPermission`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L111)

Maneja `change` y coordina las acciones indicadas abajo.

- **Condiciones que evalúa** `ausencia de active`.
- **Llamadas directas en el cuerpo** [`handlePermissionState`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L158).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L181) · callback de infraestructura · dentro de [`useLocationStep`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L5)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useLocationStep`.

- **Condiciones que evalúa** `stage`.
- **Llamadas directas en el cuerpo** [`closeLocationModal`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L183), [`closeLocationDeniedModal`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L184), [`closeLocationUnavailableModal`](../../../apps/referidos-app/src/auth/hooks/useLocationStep.js#L185).

### [`apps/referidos-app/src/auth/hooks/usePasswordAccess.js`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L1)

Coordina la activación y comprobación de contraseña y su relación con acceso local.

**Superficie que exporta.** [`usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L5).

**Módulos que lo cargan.** [`PasswordSetupBlock.jsx`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L3) (importa), [`ModalForcePasswordChange.jsx`](../../../apps/referidos-app/src/components/modals/ModalForcePasswordChange.jsx#L3) (importa).

**Dependencias del archivo.** `react`, [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js).

#### [`usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L5) · hook React · exportación por defecto

Agrupa estado, contexto o efectos de `Password Access` para sus consumidores React.

- **Entradas** `{provider} = valor por defecto`.
- **Retorno visible o tipo declarado** `passwordActive`, `showPasswordForm`, `passwordMode`, `currentPassword`, `passwordValue`, `passwordConfirm`, `showPassword`, `showPasswordConfirm`, `showCurrentPassword`, `hasMinLength`, `hasNumberAndSymbol`, `passwordsMatch`, `showPasswordRules`, `showPasswordErrors`, `showConfirmErrors`, `showConfirmRule`, `canSavePassword`, `showCurrentPasswordError` y 21 más.
- **Estado o valores vinculados** `[passwordMode, setPasswordMode] mediante useState`, `[passwordValue, setPasswordValue] mediante useState`, `[passwordConfirm, setPasswordConfirm] mediante useState`, `[currentPassword, setCurrentPassword] mediante useState`, `[passwordAttempted, setPasswordAttempted] mediante useState`, `[passwordEnabled, setPasswordEnabled] mediante useState`, `[showPasswordForm, setShowPasswordForm] mediante useState`, `[showPassword, setShowPassword] mediante useState`, `[showPasswordConfirm, setShowPasswordConfirm] mediante useState`, `[showCurrentPassword, setShowCurrentPassword] mediante useState`, `[focusedField, setFocusedField] mediante useState`, `[saving, setSaving] mediante useState`, `[error, setError] mediante useState`, `[message, setMessage] mediante useState` y 4 más.
- **Hooks que llama** `useState`, `useRef`, `useEffect`.
- **Llamadas directas en el cuerpo** [`test`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L60), [`currentPassword.trim`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L75).
- **Lo usa** [`PasswordSetupBlock`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L37) (llama), [`ModalForcePasswordChange`](../../../apps/referidos-app/src/components/modals/ModalForcePasswordChange.jsx#L50) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L29) · callback de infraestructura · dentro de [`usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L5)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `usePasswordAccess`.

- **Actualizaciones de estado o acciones** `setShowPasswordForm`, `setPasswordMode`.
- **Condiciones que evalúa** `ausencia de hasPassword`.
- **Llamadas directas en el cuerpo** [`setShowPasswordForm`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L31), [`setPasswordMode`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L32).

#### [`handlePasswordFocus`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L36) · callback React · dentro de [`usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L5)

Maneja `Password Focus` y coordina las acciones indicadas abajo.

- **Entradas** `field`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setFocusedField`.
- **Llamadas directas en el cuerpo** [`setFocusedField`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L37).
- **Lo usa** [`usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L185) (referencia).

#### [`handlePasswordBlur`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L40) · callback React · dentro de [`usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L5)

Maneja `Password Blur` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setFocusedField`.
- **Efectos y APIs** `requestAnimationFrame`.
- **Condiciones que evalúa** `active`.
- **Llamadas directas en el cuerpo** [`requestAnimationFrame`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L41), [`setFocusedField`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L44).
- **Lo usa** [`usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L186) (referencia).

#### [`handlePasswordCancel`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L77) · función · dentro de [`usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L5)

Maneja `Password Cancel` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setPasswordValue`, `setPasswordConfirm`, `setCurrentPassword`, `setFocusedField`, `setPasswordMode`, `setPasswordAttempted`, `setShowPasswordForm`, `setError`, `setMessage`.
- **Llamadas directas en el cuerpo** [`setPasswordValue`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L78), [`setPasswordConfirm`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L79), [`setCurrentPassword`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L80), [`setFocusedField`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L81), [`setPasswordMode`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L82), [`setPasswordAttempted`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L83), [`setShowPasswordForm`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L84), [`setError`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L85), [`setMessage`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L86), [`document.activeElement.blur`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L87).
- **Lo usa** [`usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L173) (referencia).

#### [`handlePasswordSave`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L90) · callback React · asíncrona · dentro de [`usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L5)

Consulta o invoca Edge [`set-password`](../../../apps/referidos-app/supabase/functions/set-password/index.ts) y coordina las demás operaciones de esta ficha.

- **Retorno visible o tipo declarado** `ok`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setPasswordAttempted`, `setError`, `setMessage`, `setSaving`, `setPasswordEnabled`, `setShowPasswordForm`, `setPasswordMode`.
- **Condiciones que evalúa** `ausencia de canSavePassword`, `passwordMode y ausencia de currentPassword.trim`, `fnErr o data.ok`, `userId`.
- **Contrato de datos** Edge [`set-password`](../../../apps/referidos-app/supabase/functions/set-password/index.ts) en [`usePasswordAccess.js:98`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L98), Auth `getSession` en [`usePasswordAccess.js:115`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L115), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`usePasswordAccess.js:118`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L118), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`usePasswordAccess.js:118`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L118).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setPasswordAttempted`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L91), [`setError`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L92), [`setMessage`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L93), [`currentPassword.trim`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L95), [`setSaving`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L96), [`supabase.functions.invoke`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L98), [`setPasswordEnabled`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L110), [`setShowPasswordForm`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L111), [`setPasswordMode`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L112), [`supabase.auth.getSession`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L115), [`eq`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L118), [`update`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L118) y 1 más.
- **Lo usa** [`usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L174) (referencia).

#### [`openAddPassword`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L129) · función · dentro de [`usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L5)

Inicia `Add Password` y prepara sus dependencias.

- **Actualizaciones de estado o acciones** `setPasswordMode`, `setCurrentPassword`, `setPasswordValue`, `setPasswordConfirm`, `setPasswordAttempted`, `setShowPasswordForm`.
- **Llamadas directas en el cuerpo** [`setPasswordMode`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L130), [`setCurrentPassword`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L131), [`setPasswordValue`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L132), [`setPasswordConfirm`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L133), [`setPasswordAttempted`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L134), [`setShowPasswordForm`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L135).
- **Lo usa** [`usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L175) (referencia).

#### [`openChangePassword`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L138) · función · dentro de [`usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L5)

Inicia `Change Password` y prepara sus dependencias.

- **Actualizaciones de estado o acciones** `setPasswordMode`, `setCurrentPassword`, `setPasswordValue`, `setPasswordConfirm`, `setPasswordAttempted`, `setShowPasswordForm`.
- **Llamadas directas en el cuerpo** [`setPasswordMode`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L139), [`setCurrentPassword`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L140), [`setPasswordValue`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L141), [`setPasswordConfirm`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L142), [`setPasswordAttempted`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L143), [`setShowPasswordForm`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L144).
- **Lo usa** [`usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L176) (referencia).

#### [`removePassword`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L147) · función · dentro de [`usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L5)

Limpia o restablece el valor de contraseña como parte de este flujo.

- **Actualizaciones de estado o acciones** `setPasswordEnabled`, `setShowPasswordForm`.
- **Llamadas directas en el cuerpo** [`setPasswordEnabled`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L148), [`setShowPasswordForm`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L149).
- **Lo usa** [`usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L177) (referencia).

#### [`onToggleShowPassword`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L178) · función · dentro de [`usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L5)

Maneja `Toggle Show Password` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setShowPassword`.
- **Llamadas directas en el cuerpo** [`setShowPassword`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L178).

#### [`onToggleShowPasswordConfirm`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L179) · función · dentro de [`usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L5)

Maneja `Toggle Show Password Confirm` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setShowPasswordConfirm`.
- **Llamadas directas en el cuerpo** [`setShowPasswordConfirm`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L179).

#### [`onToggleShowCurrentPassword`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L180) · función · dentro de [`usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L5)

Maneja `Toggle Show Current Password` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setShowCurrentPassword`.
- **Llamadas directas en el cuerpo** [`setShowCurrentPassword`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L181).

#### [`onChangeCurrentPassword`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L182) · función · dentro de [`usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L5)

Maneja `Change Current Password` y coordina las acciones indicadas abajo.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setCurrentPassword`.
- **Llamadas directas en el cuerpo** [`setCurrentPassword`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L182).

#### [`onChangePasswordValue`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L183) · función · dentro de [`usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L5)

Maneja `Change Password Value` y coordina las acciones indicadas abajo.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setPasswordValue`.
- **Llamadas directas en el cuerpo** [`setPasswordValue`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L183).

#### [`onChangePasswordConfirm`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L184) · función · dentro de [`usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L5)

Maneja `Change Password Confirm` y coordina las acciones indicadas abajo.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setPasswordConfirm`.
- **Llamadas directas en el cuerpo** [`setPasswordConfirm`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L184).

### [`apps/referidos-app/src/auth/hooks/useRegisterPasswordUI.js`](../../../apps/referidos-app/src/auth/hooks/useRegisterPasswordUI.js#L1)

Organiza la presentación de requisitos, visibilidad y estado de contraseña en registro.

**Superficie que exporta.** [`useRegisterPasswordUI`](../../../apps/referidos-app/src/auth/hooks/useRegisterPasswordUI.js#L3).

**Módulos que lo cargan.** [`EmailRegisterStep.jsx`](../../../apps/referidos-app/src/auth/steps/EmailRegisterStep.jsx#L6) (importa).

**Dependencias del archivo.** `react`.

#### [`useRegisterPasswordUI`](../../../apps/referidos-app/src/auth/hooks/useRegisterPasswordUI.js#L3) · hook React · exportación por defecto

Aplica o guarda `Password UI` para que el estado refleje la operación.

- **Entradas** `{password, passwordConfirm, passwordInputRef, confirmInputRef, hasMinLength, hasNumberAndSymbol}`.
- **Retorno visible o tipo declarado** `onFocusField`, `onBlurField`, `showPasswordRules`, `showPasswordErrors`, `showConfirmErrors`, `showConfirmRule`.
- **Estado o valores vinculados** `[focusedField, setFocusedField] mediante useState`.
- **Hooks que llama** `useState`.
- **Lo usa** [`EmailRegisterStep`](../../../apps/referidos-app/src/auth/steps/EmailRegisterStep.jsx#L32) (llama).

#### [`onFocusField`](../../../apps/referidos-app/src/auth/hooks/useRegisterPasswordUI.js#L13) · callback React · dentro de [`useRegisterPasswordUI`](../../../apps/referidos-app/src/auth/hooks/useRegisterPasswordUI.js#L3)

Maneja `Focus Field` y coordina las acciones indicadas abajo.

- **Entradas** `field`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setFocusedField`.
- **Llamadas directas en el cuerpo** [`setFocusedField`](../../../apps/referidos-app/src/auth/hooks/useRegisterPasswordUI.js#L14).
- **Lo usa** [`useRegisterPasswordUI`](../../../apps/referidos-app/src/auth/hooks/useRegisterPasswordUI.js#L40) (referencia).

#### [`onBlurField`](../../../apps/referidos-app/src/auth/hooks/useRegisterPasswordUI.js#L17) · callback React · dentro de [`useRegisterPasswordUI`](../../../apps/referidos-app/src/auth/hooks/useRegisterPasswordUI.js#L3)

Maneja `Blur Field` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setFocusedField`.
- **Efectos y APIs** `requestAnimationFrame`.
- **Condiciones que evalúa** `active`.
- **Llamadas directas en el cuerpo** [`requestAnimationFrame`](../../../apps/referidos-app/src/auth/hooks/useRegisterPasswordUI.js#L18), [`setFocusedField`](../../../apps/referidos-app/src/auth/hooks/useRegisterPasswordUI.js#L21).
- **Lo usa** [`useRegisterPasswordUI`](../../../apps/referidos-app/src/auth/hooks/useRegisterPasswordUI.js#L41) (referencia).

### [`apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L1)

Permite elegir con qué mecanismos completar el acceso y pasar a configurar contraseña o segundo factor.

**Superficie que exporta.** [`AccountVerifyMethodStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L6).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L20) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js).

#### [`AccountVerifyMethodStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L6) · componente React · exportación por defecto

Monta `button`, `Lock`, `ShieldCheck`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{innerRef, hasPassword, hasMfa, onGoAddPassword, onGoAddMfa, onContinue, onSkip}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[error, setError] mediante useState`, `[saving, setSaving] mediante useState`, `bootstrapAuth mediante useAppStore`, `selector s.bootstrapAuth`.
- **Interfaz que monta** `button`, `Lock`, `ShieldCheck`.
- **Hooks que llama** `useState`, `useAppStore`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L768) (renderiza).

#### [`updateStatus`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L20) · función · asíncrona · dentro de [`AccountVerifyMethodStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L6)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Entradas** `nextStatus`.
- **Actualizaciones de estado o acciones** `setSaving`, `setError`, `window.location.href`.
- **Condiciones que evalúa** `saving`, `ausencia de userId`, `updErr`, `nextStatus`, `onSkip`.
- **Contrato de datos** Auth `getSession` en [`AccountVerifyMethodStep.jsx:25`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L25), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`AccountVerifyMethodStep.jsx:31`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L31), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`AccountVerifyMethodStep.jsx:31`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L31).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setSaving`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L22), [`setError`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L23), [`supabase.auth.getSession`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L25), [`eq`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L31), [`update`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L31), [`supabase.from`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L31), [`bootstrapAuth`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L39), [`onContinue`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L41), [`onSkip`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L43).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L117) (llama), [`button.onClick`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L125) (llama).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L117) · callback JSX · dentro de [`AccountVerifyMethodStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L6)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`updateStatus`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L117).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L125) · callback JSX · dentro de [`AccountVerifyMethodStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L6)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`updateStatus`](../../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx#L125).

### [`apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L1)

Introduce la verificación y presenta si el usuario puede posponerla en ese punto.

**Superficie que exporta.** [`AccountVerifyPrompt`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L5).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L16) (importa).

**Dependencias del archivo.** `react`, [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js).

#### [`AccountVerifyPrompt`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L5) · componente React · exportación por defecto

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{innerRef, onSkip, onVerify, mode}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[saving, setSaving] mediante useState`, `[error, setError] mediante useState`, `bootstrapAuth mediante useAppStore`, `selector s.bootstrapAuth`.
- **Interfaz que monta** `button`.
- **Hooks que llama** `useState`, `useAppStore`.
- **Condiciones que evalúa** `ausencia de isBusiness y index`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama).
- **Llamadas directas en el cuerpo** [`benefits.map`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L78).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L724) (renderiza).

#### [`updateStatus`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L28) · función · asíncrona · dentro de [`AccountVerifyPrompt`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L5)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Entradas** `nextStatus`.
- **Actualizaciones de estado o acciones** `setSaving`, `setError`, `window.location.href`.
- **Condiciones que evalúa** `saving`, `ausencia de userId`, `updErr`, `nextStatus`, `onSkip`.
- **Contrato de datos** Auth `getSession` en [`AccountVerifyPrompt.jsx:33`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L33), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`AccountVerifyPrompt.jsx:39`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L39), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`AccountVerifyPrompt.jsx:39`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L39).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setSaving`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L30), [`setError`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L31), [`supabase.auth.getSession`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L33), [`eq`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L39), [`update`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L39), [`supabase.from`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L39), [`bootstrapAuth`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L47), [`onVerify`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L49), [`onSkip`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L51).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L115) (llama), [`button.onClick`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L123) (llama).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L85) · callback JSX · dentro de [`AccountVerifyPrompt`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L5)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`event.preventDefault`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L85).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L115) · callback JSX · dentro de [`AccountVerifyPrompt`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L5)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`updateStatus`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L115).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L123) · callback JSX · dentro de [`AccountVerifyPrompt`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L5)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`updateStatus`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx#L123).

### [`apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L1)

Muestra el estado final de preparación de la cuenta y ofrece continuar a la app.

**Superficie que exporta.** [`AccountVerifyReadyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L6).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L21) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js).

#### [`AccountVerifyReadyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L6) · componente React · exportación por defecto

Monta `BadgeCheck`, `button`, `input`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{innerRef, isVerified, termsAccepted, privacyAccepted, onBackToVerify}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[acceptTerms, setAcceptTerms] mediante useState`, `[acceptPrivacy, setAcceptPrivacy] mediante useState`, `[saving, setSaving] mediante useState`, `[error, setError] mediante useState`, `bootstrapAuth mediante useAppStore`, `selector s.bootstrapAuth`.
- **Interfaz que monta** `BadgeCheck`, `button`, `input`.
- **Hooks que llama** `useState`, `useAppStore`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L799) (renderiza).

#### [`handleEnter`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L24) · función · asíncrona · dentro de [`AccountVerifyReadyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L6)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setSaving`, `setError`, `window.location.href`.
- **Condiciones que evalúa** `ausencia de canEnter`, `ausencia de userId`, `updErr`.
- **Contrato de datos** Auth `getSession` en [`AccountVerifyReadyStep.jsx:29`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L29), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`AccountVerifyReadyStep.jsx:35`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L35), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`AccountVerifyReadyStep.jsx:35`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L35).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setSaving`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L26), [`setError`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L27), [`supabase.auth.getSession`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L29), [`eq`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L35), [`update`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L35), [`supabase.from`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L35), [`bootstrapAuth`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L46).
- **Lo usa** [`AccountVerifyReadyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L141) (pasa a onClick).

#### [`handleBackToVerify`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L53) · función · asíncrona · dentro de [`AccountVerifyReadyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L6)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setSaving`, `setError`.
- **Condiciones que evalúa** `saving`, `ausencia de userId`, `updErr`.
- **Contrato de datos** Auth `getSession` en [`AccountVerifyReadyStep.jsx:58`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L58), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`AccountVerifyReadyStep.jsx:64`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L64), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`AccountVerifyReadyStep.jsx:64`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L64).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setSaving`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L55), [`setError`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L56), [`supabase.auth.getSession`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L58), [`eq`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L64), [`update`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L64), [`supabase.from`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L64), [`bootstrapAuth`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L72), [`onBackToVerify`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L73).
- **Lo usa** [`AccountVerifyReadyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L99) (pasa a onClick).

#### [`input.onChange`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L112) · callback JSX · dentro de [`AccountVerifyReadyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L6)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setAcceptTerms`.
- **Llamadas directas en el cuerpo** [`setAcceptTerms`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L112).

#### [`input.onChange`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L123) · callback JSX · dentro de [`AccountVerifyReadyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L6)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setAcceptPrivacy`.
- **Llamadas directas en el cuerpo** [`setAcceptPrivacy`](../../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx#L123).

### [`apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L1)

Presenta el paso de verificación de cuenta dentro del flujo.

**Superficie que exporta.** [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L10).

**Dependencias del archivo.** `react`, [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../../utils/validators`](../../../apps/referidos-app/src/utils/validators.js), [`../blocks/ContactPhoneBlock`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx), [`../blocks/EmailVerificationBlock`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx), [`../blocks/PasswordSetupBlock`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx), `lucide-react`.

#### [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L10) · componente React · exportación por defecto

Monta `button`, `Lock`, `ShieldCheck`, `EmailVerificationBlock`, `PasswordSetupBlock`, `input`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{innerRef, phone, ruc, emailConfirmed, provider, providers, hasPassword, hasMfa, onGoAddPassword, onGoAdd2FA, onSkip, onVerified, mode}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[currentScreen, setCurrentScreen] mediante useState`, `[savingRuc, setSavingRuc] mediante useState`, `[phoneConfirmed, setPhoneConfirmed] mediante useState`, `[rucValue, setRucValue] mediante useState`, `[rucConfirmed, setRucConfirmed] mediante useState`, `[editingRuc, setEditingRuc] mediante useState`, `[rucError, setRucError] mediante useState`, `[emailValue, setEmailValue] mediante useState`, `[passwordSave, setPasswordSave] mediante useState`, `[finalizeError, setFinalizeError] mediante useState`, `[skipError, setSkipError] mediante useState`, `bootstrapAuth mediante useAppStore`, `selector s.bootstrapAuth`.
- **Interfaz que monta** `button`, `Lock`, `ShieldCheck`, `EmailVerificationBlock`, `PasswordSetupBlock`, `input`, `ContactPhoneBlock`.
- **Hooks que llama** `useState`, `useAppStore`, `useEffect`.
- **Efectos y APIs** `rucValue.replace`.
- **Condiciones que evalúa** `isBusiness`, `phone y ruc y emailConfirmed`, `phone y emailConfirmed`, `showOauthChoice`, `currentScreen`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`validarCedula`](../../../apps/referidos-app/src/utils/validators.js#L17) (llama), [`EmailVerificationBlock`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx#L21) (renderiza), [`PasswordSetupBlock`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L5) (renderiza), [`ContactPhoneBlock`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L36) (renderiza).
- **Llamadas directas en el cuerpo** [`providerList.includes`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L57), [`slice`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L64), [`rucValue.replace`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L64), [`normalizedRuc.slice`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L66), [`validarCedula`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L72).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L76) · callback de infraestructura · dentro de [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L10)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AccountVerifyStep`.

- **Actualizaciones de estado o acciones** `setRucValue`, `setRucConfirmed`, `setEditingRuc`.
- **Condiciones que evalúa** `ausencia de isBusiness`, `ausencia de ruc o rucValue`.
- **Llamadas directas en el cuerpo** [`setRucValue`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L79), [`setRucConfirmed`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L80), [`setEditingRuc`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L81).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L84) · callback de infraestructura · dentro de [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L10)

Opera sobre Auth `getUser`. El resultado se adapta al contrato del consumidor.

- **Actualizaciones de estado o acciones** `setEmailValue`.
- **Condiciones que evalúa** `emailValue`, `active y authEmail`.
- **Contrato de datos** Auth `getUser` en [`AccountVerifyStep.jsx:90`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L90).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.getUser`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L90), [`setEmailValue`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L93).

#### [`handleFinalize`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L101) · función · asíncrona · dentro de [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L10)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setFinalizeError`, `setSkipError`.
- **Condiciones que evalúa** `ausencia de userId`, `ausencia de isOauthPrimary`, `authErr`, `ausencia de data.user.email_confirmed_at`, `ausencia de canVerifyWithOauth`, `updErr`.
- **Contrato de datos** Auth `getSession` en [`AccountVerifyStep.jsx:104`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L104), Auth `getUser` en [`AccountVerifyStep.jsx:111`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L111), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`AccountVerifyStep.jsx:128`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L128), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`AccountVerifyStep.jsx:128`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L128).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setFinalizeError`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L102), [`setSkipError`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L103), [`supabase.auth.getSession`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L104), [`supabase.auth.getUser`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L111), [`eq`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L128), [`update`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L128), [`supabase.from`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L128), [`bootstrapAuth`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L136), [`onVerified`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L137).
- **Lo usa** [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L305) (pasa a onClick).

#### [`handleSkipVerification`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L140) · función · asíncrona · dentro de [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L10)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setSkipError`, `window.location.href`.
- **Condiciones que evalúa** `ausencia de userId`, `updErr`, `onSkip`.
- **Contrato de datos** Auth `getSession` en [`AccountVerifyStep.jsx:142`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L142), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`AccountVerifyStep.jsx:148`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L148), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`AccountVerifyStep.jsx:148`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L148).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setSkipError`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L141), [`supabase.auth.getSession`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L142), [`eq`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L148), [`update`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L148), [`supabase.from`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L148), [`bootstrapAuth`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L156), [`onSkip`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L158).
- **Lo usa** [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L313) (pasa a onClick).

#### [`handleSavePhone`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L164) · función · asíncrona · dentro de [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L10)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Entradas** `normalizedPhone`.
- **Retorno visible o tipo declarado** `ok`, `error`, `message`.
- **Recibe eventos de** `ContactPhoneBlock.onSave`.
- **Condiciones que evalúa** `ausencia de userId`, `updErr`.
- **Contrato de datos** Auth `getSession` en [`AccountVerifyStep.jsx:165`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L165), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`AccountVerifyStep.jsx:170`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L170), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`AccountVerifyStep.jsx:170`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L170).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.getSession`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L165), [`eq`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L170), [`update`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L170), [`supabase.from`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L170).
- **Lo usa** [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L478) (pasa a onSave).

#### [`handleSaveRuc`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L183) · función · asíncrona · dentro de [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L10)

Consulta o invoca tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setSavingRuc`, `setRucError`, `setRucConfirmed`, `setEditingRuc`.
- **Condiciones que evalúa** `ausencia de rucValid o savingRuc`, `ausencia de userId`, `usuarioErr o ausencia de usuarioRow.id`, `negocioErr o ausencia de negocioRow.id`, `updErr`.
- **Contrato de datos** Auth `getSession` en [`AccountVerifyStep.jsx:188`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L188), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`AccountVerifyStep.jsx:194`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L194), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`AccountVerifyStep.jsx:194`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L194), tabla o vista [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) (`select`) en [`AccountVerifyStep.jsx:203`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L203), tabla o bucket [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) en [`AccountVerifyStep.jsx:203`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L203), tabla o vista [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) (`update`) en [`AccountVerifyStep.jsx:214`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L214).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setSavingRuc`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L185), [`setRucError`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L186), [`supabase.auth.getSession`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L188), [`maybeSingle`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L194), [`eq`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L194), [`select`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L194), [`supabase.from`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L194), [`limit`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L203), [`order`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L203), [`update`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L214), [`setRucConfirmed`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L222), [`setEditingRuc`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L223).
- **Lo usa** [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L456) (pasa a onClick).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L416) · callback JSX · dentro de [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L10)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setEditingRuc`.
- **Llamadas directas en el cuerpo** [`setEditingRuc`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L416).

#### [`input.onChange`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L440) · callback JSX · dentro de [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L10)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setRucValue`, `setRucConfirmed`, `setRucError`.
- **Efectos y APIs** `event.target.value.replace`.
- **Llamadas directas en el cuerpo** [`slice`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L441), [`event.target.value.replace`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L441), [`setRucValue`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L442), [`setRucConfirmed`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L443), [`setRucError`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L444).

#### [`ContactPhoneBlock.onStatusChange`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L479) · callback JSX · dentro de [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L10)

Responde al evento de interfaz `ContactPhoneBlock.onStatusChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `{confirmed}`.
- **Actualizaciones de estado o acciones** `setPhoneConfirmed`.
- **Llamadas directas en el cuerpo** [`setPhoneConfirmed`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L479).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L486) · callback JSX · dentro de [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L10)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setCurrentScreen`.
- **Llamadas directas en el cuerpo** [`setCurrentScreen`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L486).

### [`apps/referidos-app/src/auth/steps/AddPasswordStep.jsx`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L1)

Permite habilitar el acceso con contraseña como parte del alta o verificación.

**Superficie que exporta.** [`AddPasswordStep`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L6).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L17) (importa).

**Dependencias del archivo.** `react`, [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../blocks/PasswordSetupBlock`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx).

#### [`AddPasswordStep`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L6) · componente React · exportación por defecto

Monta `PasswordSetupBlock`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{innerRef, provider, providers, hasPassword, onContinue, onSkip}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[passwordSave, setPasswordSave] mediante useState`, `[skipError, setSkipError] mediante useState`, `bootstrapAuth mediante useAppStore`, `selector s.bootstrapAuth`.
- **Interfaz que monta** `PasswordSetupBlock`, `button`.
- **Hooks que llama** `useState`, `useAppStore`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`PasswordSetupBlock`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L5) (renderiza).
- **Llamadas directas en el cuerpo** [`providerList.includes`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L26).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L780) (renderiza).

#### [`handleContinue`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L39) · función · asíncrona · dentro de [`AddPasswordStep`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L6)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Condiciones que evalúa** `ausencia de passwordSaved`.
- **Llamadas directas en el cuerpo** [`bootstrapAuth`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L41), [`onContinue`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L42).
- **Lo usa** [`AddPasswordStep`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L104) (pasa a onClick).

#### [`handleSkipVerification`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L45) · función · asíncrona · dentro de [`AddPasswordStep`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L6)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setSkipError`, `window.location.href`.
- **Condiciones que evalúa** `ausencia de userId`, `updErr`, `onSkip`.
- **Contrato de datos** Auth `getSession` en [`AddPasswordStep.jsx:47`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L47), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`AddPasswordStep.jsx:53`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L53), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`AddPasswordStep.jsx:53`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L53).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setSkipError`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L46), [`supabase.auth.getSession`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L47), [`eq`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L53), [`update`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L53), [`supabase.from`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L53), [`bootstrapAuth`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L61), [`onSkip`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L63).
- **Lo usa** [`AddPasswordStep`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L112) (pasa a onClick).

### [`apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L1)

Presenta el paso para incorporar un segundo factor durante onboarding.

**Superficie que exporta.** [`AddTwoFAStep`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L33).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L18) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, `react-qr-code`, [`../../services/mfaService`](../../../apps/referidos-app/src/services/mfaService.js).

#### [`FRIENDLY_NAME`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L13) · variable de módulo

Declara `FRIENDLY_NAME` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`startEnroll`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L66) (referencia), [`prepareEnrollment`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L86) (referencia).

#### [`isActiveStatus`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L15) · función

Comprueba `Active Status` para decidir si se admite o continúa la operación.

- **Entradas** `status`.
- **Llamadas directas en el cuerpo** [`includes`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L16), [`toLowerCase`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L16).
- **Lo usa** [`prepareEnrollment`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L88) (llama).

#### [`isPendingStatus`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L17) · función

Comprueba `Pending Status` para decidir si se admite o continúa la operación.

- **Entradas** `status`.
- **Llamadas directas en el cuerpo** [`includes`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L18), [`toLowerCase`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L18).
- **Lo usa** [`prepareEnrollment`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L110) (llama).

#### [`getFriendlyName`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L19) · función

Obtiene o resuelve `Friendly Name` para entregarlo al consumidor.

- **Entradas** `factor`.
- **Lo usa** [`prepareEnrollment`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L86) (llama).

#### [`getTotpFactors`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L21) · función

Obtiene o resuelve `Totp Factors` para entregarlo al consumidor.

- **Entradas** `data`.
- **Retorno visible o tipo declarado** `lista`.
- **Condiciones que evalúa** `ausencia de data`, `Array.isArray`.
- **Llamadas directas en el cuerpo** [`data.all.filter`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L26), [`toLowerCase`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L27).
- **Lo usa** [`prepareEnrollment`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L84) (llama).

#### [`AddTwoFAStep`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L33) · componente React · exportación por defecto

Monta `QrCode`, `button`, `input`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{innerRef, onCancel, onContinue}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[loading, setLoading] mediante useState`, `[enrollError, setEnrollError] mediante useState`, `[mode, setMode] mediante useState`, `[factorId, setFactorId] mediante useState`, `[qrCode, setQrCode] mediante useState`, `[qrUri, setQrUri] mediante useState`, `[secret, setSecret] mediante useState`, `[code, setCode] mediante useState`, `[submitting, setSubmitting] mediante useState`, `[verifyError, setVerifyError] mediante useState`, `preparingRef mediante useRef`, `initializedRef mediante useRef`.
- **Interfaz que monta** `QrCode`, `button`, `input`.
- **Hooks que llama** `useState`, `useRef`, `useEffect`.
- **Llamadas directas en el cuerpo** [`code.trim`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L48), [`renderQr`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L296).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L791) (renderiza).

#### [`resetEnrollState`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L50) · función · dentro de [`AddTwoFAStep`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L33)

Limpia o restablece `Enroll State` como parte de este flujo.

- **Actualizaciones de estado o acciones** `setFactorId`, `setQrCode`, `setQrUri`, `setSecret`.
- **Llamadas directas en el cuerpo** [`setFactorId`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L51), [`setQrCode`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L52), [`setQrUri`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L53), [`setSecret`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L54).
- **Lo usa** [`prepareEnrollment`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L80) (llama).

#### [`applyEnrollPayload`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L57) · función · dentro de [`AddTwoFAStep`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L33)

Aplica o guarda `Enroll Payload` para que el estado refleje la operación.

- **Entradas** `data`.
- **Actualizaciones de estado o acciones** `setFactorId`, `setQrCode`, `setQrUri`, `setSecret`.
- **Llamadas directas en el cuerpo** [`setFactorId`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L59), [`setQrCode`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L60), [`setQrUri`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L61), [`setSecret`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L62).
- **Lo usa** [`startEnroll`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L70) (llama).

#### [`startEnroll`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L65) · función · asíncrona · dentro de [`AddTwoFAStep`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L33)

Inicia `Enroll` y prepara sus dependencias.

- **Retorno visible o tipo declarado** `ok`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`enrollTotp`](../../../apps/referidos-app/src/services/mfaService.js#L61) (llama).
- **Llamadas directas en el cuerpo** [`enrollTotp`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L66), [`applyEnrollPayload`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L70).
- **Lo usa** [`prepareEnrollment`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L126) (llama).

#### [`prepareEnrollment`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L74) · función · asíncrona · dentro de [`AddTwoFAStep`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L33)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setLoading`, `setEnrollError`, `setMode`, `setFactorId`.
- **Condiciones que evalúa** `preparingRef.current o factorId`, `list.ok`, `named y isActiveStatus`, `named`, `active y isActiveStatus`, `pending.length`, `ausencia de removed.ok`, `ausencia de result.ok` y 2 más.
- **Usa código de** [`listMfaFactors`](../../../apps/referidos-app/src/services/mfaService.js#L15) (llama), [`pickActiveTotpFactor`](../../../apps/referidos-app/src/services/mfaService.js#L151) (llama), [`unenrollFactor`](../../../apps/referidos-app/src/services/mfaService.js#L123) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L77), [`setEnrollError`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L78), [`setMode`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L79), [`resetEnrollState`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L80), [`listMfaFactors`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L82), [`getTotpFactors`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L84), [`factors.find`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L85), [`getFriendlyName`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L86), [`isActiveStatus`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L88), [`setFactorId`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L90), [`pickActiveTotpFactor`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L102), [`factors.filter`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L110) y 4 más.
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L199) (llama), [`AddTwoFAStep`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L289) (pasa a onClick).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L194) · callback de infraestructura · dentro de [`AddTwoFAStep`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L33)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AddTwoFAStep`.

- **Condiciones que evalúa** `initializedRef.current`, `ausencia de active`.
- **Llamadas directas en el cuerpo** [`prepareEnrollment`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L199).

#### [`helperText`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L207) · cálculo memorizado · dentro de [`AddTwoFAStep`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L33)

Función auxiliar de `AddTwoFAStep` para `helper Text`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `loading`, `enrollError`, `mode`.
- **Lo usa** [`AddTwoFAStep`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L275) (referencia).

#### [`handleVerify`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L216) · función · asíncrona · dentro de [`AddTwoFAStep`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L33)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setVerifyError`, `setSubmitting`.
- **Condiciones que evalúa** `ausencia de factorId`, `ausencia de result.ok`.
- **Usa código de** [`challengeAndVerifyTotp`](../../../apps/referidos-app/src/services/mfaService.js#L102) (llama), [`syncTotpFlags`](../../../apps/referidos-app/src/services/mfaService.js#L131) (llama).
- **Llamadas directas en el cuerpo** [`setVerifyError`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L218), [`setSubmitting`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L222), [`challengeAndVerifyTotp`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L223), [`code.trim`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L225), [`syncTotpFlags`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L232), [`onContinue`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L234).
- **Lo usa** [`AddTwoFAStep`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L339) (pasa a onClick).

#### [`renderQr`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L237) · función · dentro de [`AddTwoFAStep`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L33)

Prepara contenido JSX usando `img`, `QRCode`.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `img`, `QRCode`.
- **Condiciones que evalúa** `qrCode`, `isSvg`, `qrUri`.
- **Llamadas directas en el cuerpo** [`qrCode.trim`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L239), [`trimmed.startsWith`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L240).
- **Lo usa** [`AddTwoFAStep`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L296) (llama).

#### [`input.onChange`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L319) · callback JSX · dentro de [`AddTwoFAStep`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L33)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setCode`.
- **Llamadas directas en el cuerpo** [`setCode`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx#L319).
