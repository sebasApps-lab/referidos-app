# PWA principal · Auth y onboarding · 1 de 5

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/auth/AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L1)
- [`apps/referidos-app/src/auth/AuthView.jsx`](../../../apps/referidos-app/src/auth/AuthView.jsx#L1)
- [`apps/referidos-app/src/auth/blocks/AuthBranderHeader.jsx`](../../../apps/referidos-app/src/auth/blocks/AuthBranderHeader.jsx#L1)
- [`apps/referidos-app/src/auth/blocks/AuthCard.jsx`](../../../apps/referidos-app/src/auth/blocks/AuthCard.jsx#L1)
- [`apps/referidos-app/src/auth/blocks/AuthFooter.jsx`](../../../apps/referidos-app/src/auth/blocks/AuthFooter.jsx#L1)
- [`apps/referidos-app/src/auth/blocks/AuthHeader.jsx`](../../../apps/referidos-app/src/auth/blocks/AuthHeader.jsx#L1)
- [`apps/referidos-app/src/auth/blocks/AuthTabs.jsx`](../../../apps/referidos-app/src/auth/blocks/AuthTabs.jsx#L1)
- [`apps/referidos-app/src/auth/blocks/BackButton.jsx`](../../../apps/referidos-app/src/auth/blocks/BackButton.jsx#L1)
- [`apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L1)
- [`apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx`](../../../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx#L1)
- [`apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx#L1)
- [`apps/referidos-app/src/auth/blocks/ErrorBanner.jsx`](../../../apps/referidos-app/src/auth/blocks/ErrorBanner.jsx#L1)
- [`apps/referidos-app/src/auth/blocks/OAuthButtons.jsx`](../../../apps/referidos-app/src/auth/blocks/OAuthButtons.jsx#L1)
- [`apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L1)
- [`apps/referidos-app/src/auth/blocks/RoleCard.jsx`](../../../apps/referidos-app/src/auth/blocks/RoleCard.jsx#L1)
- [`apps/referidos-app/src/auth/blocks/StepProgress.jsx`](../../../apps/referidos-app/src/auth/blocks/StepProgress.jsx#L1)
- [`apps/referidos-app/src/auth/constants/authCopy.js`](../../../apps/referidos-app/src/auth/constants/authCopy.js#L1)
- [`apps/referidos-app/src/auth/constants/authRoles.js`](../../../apps/referidos-app/src/auth/constants/authRoles.js#L1)
- [`apps/referidos-app/src/auth/constants/authSteps.js`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1)
- [`apps/referidos-app/src/auth/constants/businessCategories.js`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L1)
- [`apps/referidos-app/src/auth/hooks/useAuthActions.js`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/auth/AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L1)

Orquesta los pasos de acceso y registro. Cruza datos precargados, verificación, legal y estado de onboarding para escoger la vista y conectar cada acción.

**Superficie que exporta.** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147).

**Módulos que lo cargan.** [`AuthEntry.jsx`](../../../apps/referidos-app/src/pages/AuthEntry.jsx#L2) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, [`../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`./AuthView`](../../../apps/referidos-app/src/auth/AuthView.jsx), [`./blocks/AuthBranderHeader`](../../../apps/referidos-app/src/auth/blocks/AuthBranderHeader.jsx), [`./blocks/AuthFooter`](../../../apps/referidos-app/src/auth/blocks/AuthFooter.jsx), [`./blocks/BackButton`](../../../apps/referidos-app/src/auth/blocks/BackButton.jsx), [`./blocks/StepProgress`](../../../apps/referidos-app/src/auth/blocks/StepProgress.jsx), [`./steps/EmailLoginStep`](../../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx), [`./steps/EmailRegisterStep`](../../../apps/referidos-app/src/auth/steps/EmailRegisterStep.jsx), [`./steps/WelcomeStep`](../../../apps/referidos-app/src/auth/steps/WelcomeStep.jsx), [`./steps/UserProfileStep`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx), [`./steps/BusinessDataStep`](../../../apps/referidos-app/src/auth/steps/BusinessDataStep.jsx), [`./steps/BusinessCategoryStep`](../../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx), [`./steps/UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx), [`./steps/AccountVerifyPrompt`](../../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx), [`./steps/AddPasswordStep`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx), [`./steps/AddTwoFAStep`](../../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx) y 13 más.

#### [`BUSINESS_STEP_COPY`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L40) · variable de módulo

Declara `BUSINESS_STEP_COPY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L439) (referencia).

#### [`CLIENT_STEP_COPY`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L101) · variable de módulo

Declara `CLIENT_STEP_COPY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L439) (referencia).

#### [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147) · componente React · exportación por defecto

Monta `AuthView`, `AuthBranderHeader`, `AuthFooter`, `BackButton`, `StepProgress`, `WelcomeStep`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `onboarding mediante useAppStore`, `selector s.onboarding`, `logout mediante useAppStore`, `selector s.logout`, `bootstrapAuth mediante useAppStore`, `selector s.bootstrapAuth`, `[systemFlags, setSystemFlags] mediante useState`, `[showExitConfirm, setShowExitConfirm] mediante useState`, `statusErrorRef mediante useRef`.
- **Interfaz que monta** `AuthView`, `AuthBranderHeader`, `AuthFooter`, `BackButton`, `StepProgress`, `WelcomeStep`, `RoleSelectStep`, `EmailLoginStep`, `EmailRegisterStep`, `UserProfileStep`, `BusinessDataStep`, `BusinessCategoryStep`, `UserAddressStep`, `AccountVerifyPrompt`, `BusinessVerifyStep`, `VerifyEmailStep`, `AccountVerifyMethodStep`, `AddPasswordStep`, `AddTwoFAStep` y 2 más.
- **Hooks que llama** `useLocation`, `useAppStore`, `useState`, `useEffect`, `useAuthFlow`, `useAuthActions`, `useAuthPrefill`, `useRef`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`getSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L28) (llama), [`useAuthFlow`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L4) (llama), [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo), [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91) (llama), [`useAuthPrefill`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L10) (llama), [`AUTH_BRAND`](../../../apps/referidos-app/src/auth/constants/authCopy.js#L1) (accede al módulo), [`AuthView`](../../../apps/referidos-app/src/auth/AuthView.jsx#L3) (renderiza), [`AuthBranderHeader`](../../../apps/referidos-app/src/auth/blocks/AuthBranderHeader.jsx#L4) (renderiza), [`AuthFooter`](../../../apps/referidos-app/src/auth/blocks/AuthFooter.jsx#L4) (renderiza) y 19 más.
- **Llamadas directas en el cuerpo** [`getSystemFeatureFlags`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L165), [`includes`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L170), [`test`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L388).
- **Lo usa** [`AuthEntry`](../../../apps/referidos-app/src/pages/AuthEntry.jsx#L5) (renderiza).

#### [`initialStep`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L158) · cálculo memorizado · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Inicia `ial Step` y prepara sus dependencias.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L169) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L167) · callback de infraestructura · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AuthFlow`.

- **Usa código de** [`subscribeSystemFeatureFlags`](../../../packages/support-sdk/src/runtime/systemFeatureFlags.js#L71) (llama).
- **Llamadas directas en el cuerpo** [`subscribeSystemFeatureFlags`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L167).

#### [`resetToWelcome`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L180) · callback React · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Atiende `UserProfileStep.onGoWelcome`, `BusinessDataStep.onGoWelcome`, `BusinessCategoryStep.onGoWelcome` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `UserProfileStep.onGoWelcome`, `BusinessDataStep.onGoWelcome`, `BusinessCategoryStep.onGoWelcome`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setEmail`, `setPassword`, `setPasswordConfirm`, `setTelefono`, `setCodigo`, `setNombreDueno`, `setApellidoDueno`, `setGenero`, `setFechaNacimiento`, `setOwnerPrefill`, `setBusinessPrefill`, `setNombreNegocio` y 18 más.
- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`flow.setEmail`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L181), [`flow.setPassword`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L182), [`flow.setPasswordConfirm`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L183), [`flow.setTelefono`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L184), [`flow.setCodigo`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L185), [`flow.setNombreDueno`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L186), [`flow.setApellidoDueno`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L187), [`flow.setGenero`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L188), [`flow.setFechaNacimiento`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L189), [`flow.setOwnerPrefill`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L190), [`flow.setBusinessPrefill`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L196), [`flow.setNombreNegocio`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L201) y 18 más.
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L278) (referencia), [`handleBack`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L494) (llama).

#### [`verificationSteps`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L340) · cálculo memorizado · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Función auxiliar de `AuthFlow` para `verification Steps`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L366) (accede al módulo), [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L384) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L350) · callback de infraestructura · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AuthFlow`.

- **Actualizaciones de estado o acciones** `setStep`.
- **Condiciones que evalúa** `ausencia de onboarding.allowAccess`, `clientStepsPending`, `status`, `flow.step`, `ausencia de verificationSteps.includes y flow.step`.
- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`flow.setStep`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L356), [`verificationSteps.includes`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L366).

#### [`ownerStatus`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L397) · cálculo memorizado · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Función auxiliar de `AuthFlow` para `owner Status`.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`getUserProfileStatus`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L153) (llama).
- **Llamadas directas en el cuerpo** [`getUserProfileStatus`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L398).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L665) (accede al módulo).

#### [`categoryPath`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L456) · cálculo memorizado · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Función auxiliar de `AuthFlow` para `category Path`.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`getBusinessCategoryPath`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L351) (llama).
- **Llamadas directas en el cuerpo** [`getBusinessCategoryPath`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L456).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L676) (accede al módulo).

#### [`handleVerificationExit`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L460) · callback React · asíncrona · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Atiende `AccountVerifyPrompt.onSkip`, `BusinessVerifyStep.onSkip`, `VerifyEmailStep.onSkip`, `AccountVerifyMethodStep.onContinue`, `AccountVerifyMethodStep.onSkip` y 1 más y aplica la acción vinculada a ese control.

- **Recibe eventos de** `AccountVerifyPrompt.onSkip`, `BusinessVerifyStep.onSkip`, `VerifyEmailStep.onSkip`, `AccountVerifyMethodStep.onContinue`, `AccountVerifyMethodStep.onSkip`, `AddPasswordStep.onSkip`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setStep`.
- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`bootstrapAuth`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L461), [`flow.setStep`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L462).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L737) (pasa a onSkip).

#### [`handleBackToMethod`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L465) · callback React · asíncrona · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Atiende `AddPasswordStep.onContinue`, `AddTwoFAStep.onContinue` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `AddPasswordStep.onContinue`, `AddTwoFAStep.onContinue`.
- **Hooks que llama** `useCallback`.
- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`bootstrapAuth`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L466), [`flow.goToStep`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L467).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L785) (pasa a onContinue).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L474) · callback de infraestructura · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AuthFlow`.

- **Actualizaciones de estado o acciones** `setWelcomeError`.
- **Efectos y APIs** `sessionStorage.getItem`, `sessionStorage.removeItem`.
- **Condiciones que evalúa** `statusErrorRef.current`, `ausencia de message`.
- **Llamadas directas en el cuerpo** [`sessionStorage.getItem`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L476), [`sessionStorage.removeItem`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L479), [`flow.setWelcomeError`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L480).

#### [`handleOwnerExit`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L483) · callback React · asíncrona · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setShowExitConfirm`, `setStep`.
- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setShowExitConfirm`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L484), [`logout`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L485), [`flow.setStep`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L486).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L837) (pasa a onClick).

#### [`handleBack`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L489) · función · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Atiende `BackButton.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `BackButton.onClick`.
- **Actualizaciones de estado o acciones** `setIsAddressSearchModeOpen`, `setShowExitConfirm`.
- **Condiciones que evalúa** `flow.step`, `flow.step y flow.isAddressSearchModeOpen`, `flow.step y isBusiness`.
- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`resetToWelcome`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L494), [`flow.setIsAddressSearchModeOpen`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L501), [`setShowExitConfirm`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L505), [`actions.handleButtonBack`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L508).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L525) (pasa a onClick).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L511) · callback de infraestructura · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AuthFlow`.

- **Actualizaciones de estado o acciones** `setIsAddressSearchModeOpen`.
- **Condiciones que evalúa** `flow.step y flow.isAddressSearchModeOpen`.
- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`flow.setIsAddressSearchModeOpen`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L513).

#### [`WelcomeStep.onEmail`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L556) · callback JSX · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Responde al evento de interfaz `WelcomeStep.onEmail`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setWelcomeError`, `setStep`.
- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`flow.setWelcomeError`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L557), [`flow.setStep`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L558).

#### [`EmailLoginStep.onToggleShowPassword`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L587) · callback JSX · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Responde al evento de interfaz `EmailLoginStep.onToggleShowPassword`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setShowPassword`.
- **Llamadas directas en el cuerpo** [`flow.setShowPassword`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L588).

#### [`EmailRegisterStep.onToggleShowPassword`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L610) · callback JSX · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Responde al evento de interfaz `EmailRegisterStep.onToggleShowPassword`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setShowPassword`.
- **Llamadas directas en el cuerpo** [`flow.setShowPassword`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L611).

#### [`EmailRegisterStep.onToggleShowPasswordConfirm`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L613) · callback JSX · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Responde al evento de interfaz `EmailRegisterStep.onToggleShowPasswordConfirm`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setShowPasswordConfirm`.
- **Llamadas directas en el cuerpo** [`flow.setShowPasswordConfirm`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L614).

#### [`BusinessDataStep.onOpenCategory`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L679) · callback JSX · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Responde al evento de interfaz `BusinessDataStep.onOpenCategory`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`flow.goToStep`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L679).

#### [`BusinessCategoryStep.onConfirmCategory`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L693) · callback JSX · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Responde al evento de interfaz `BusinessCategoryStep.onConfirmCategory`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setCategoriaNegocio`.
- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`flow.setCategoriaNegocio`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L694), [`flow.goToStep`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L695).

#### [`AccountVerifyPrompt.onVerify`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L726) · callback JSX · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Responde al evento de interfaz `AccountVerifyPrompt.onVerify`. La lógica ocurre al interactuar con ese control.

- **Condiciones que evalúa** `isBusiness`.
- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`flow.goToStep`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L728).

#### [`BusinessVerifyStep.onContinue`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L747) · callback JSX · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Responde al evento de interfaz `BusinessVerifyStep.onContinue`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`flow.goToStep`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L748).

#### [`VerifyEmailStep.onContinue`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L762) · callback JSX · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Responde al evento de interfaz `VerifyEmailStep.onContinue`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`flow.goToStep`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L762).

#### [`AccountVerifyMethodStep.onGoAddPassword`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L772) · callback JSX · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Responde al evento de interfaz `AccountVerifyMethodStep.onGoAddPassword`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`flow.goToStep`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L772).

#### [`AccountVerifyMethodStep.onGoAddMfa`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L773) · callback JSX · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Responde al evento de interfaz `AccountVerifyMethodStep.onGoAddMfa`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`flow.goToStep`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L773).

#### [`AddTwoFAStep.onCancel`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L793) · callback JSX · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Responde al evento de interfaz `AddTwoFAStep.onCancel`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`flow.goToStep`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L793).

#### [`AccountVerifyReadyStep.onBackToVerify`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L808) · callback JSX · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Responde al evento de interfaz `AccountVerifyReadyStep.onBackToVerify`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`flow.goToStep`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L809).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L830) · callback JSX · dentro de [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L147)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setShowExitConfirm`.
- **Llamadas directas en el cuerpo** [`setShowExitConfirm`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L830).

### [`apps/referidos-app/src/auth/AuthView.jsx`](../../../apps/referidos-app/src/auth/AuthView.jsx#L1)

Construye el marco visual del flujo de autenticación y del paso que se inserta en él.

**Superficie que exporta.** [`AuthView`](../../../apps/referidos-app/src/auth/AuthView.jsx#L3).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L4) (importa).

**Dependencias del archivo.** `react`.

#### [`AuthView`](../../../apps/referidos-app/src/auth/AuthView.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className, header, children, footer}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L518) (renderiza).

### [`apps/referidos-app/src/auth/blocks/AuthBranderHeader.jsx`](../../../apps/referidos-app/src/auth/blocks/AuthBranderHeader.jsx#L1)

Pinta la cabecera de marca usada en los distintos pasos del flujo.

**Superficie que exporta.** [`AuthBranderHeader`](../../../apps/referidos-app/src/auth/blocks/AuthBranderHeader.jsx#L4).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L5) (importa).

**Dependencias del archivo.** `react`, [`../constants/authCopy`](../../../apps/referidos-app/src/auth/constants/authCopy.js).

#### [`AuthBranderHeader`](../../../apps/referidos-app/src/auth/blocks/AuthBranderHeader.jsx#L4) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className, text}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Usa código de** [`AUTH_BRAND`](../../../apps/referidos-app/src/auth/constants/authCopy.js#L1) (accede al módulo).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L520) (renderiza).

### [`apps/referidos-app/src/auth/blocks/AuthCard.jsx`](../../../apps/referidos-app/src/auth/blocks/AuthCard.jsx#L1)

Define la tarjeta contenedora para formularios de acceso, con estilo y estructura comunes.

**Superficie que exporta.** [`AuthCard`](../../../apps/referidos-app/src/auth/blocks/AuthCard.jsx#L3).

**Módulos que lo cargan.** [`EmailLoginStep.jsx`](../../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx#L2) (importa), [`EmailRegisterStep.jsx`](../../../apps/referidos-app/src/auth/steps/EmailRegisterStep.jsx#L2) (importa), [`ErrorStep.jsx`](../../../apps/referidos-app/src/auth/steps/ErrorStep.jsx#L2) (importa), [`OAuthCallbackStep.jsx`](../../../apps/referidos-app/src/auth/steps/OAuthCallbackStep.jsx#L2) (importa), [`PendingStep.jsx`](../../../apps/referidos-app/src/auth/steps/PendingStep.jsx#L2) (importa), [`WelcomeStep.jsx`](../../../apps/referidos-app/src/auth/steps/WelcomeStep.jsx#L3) (importa).

**Dependencias del archivo.** `react`.

#### [`AuthCard`](../../../apps/referidos-app/src/auth/blocks/AuthCard.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className, children}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`EmailLoginStep`](../../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx#L25) (renderiza), [`EmailRegisterStep`](../../../apps/referidos-app/src/auth/steps/EmailRegisterStep.jsx#L43) (renderiza), [`ErrorStep`](../../../apps/referidos-app/src/auth/steps/ErrorStep.jsx#L7) (renderiza), [`OAuthCallbackStep`](../../../apps/referidos-app/src/auth/steps/OAuthCallbackStep.jsx#L7) (renderiza), [`PendingStep`](../../../apps/referidos-app/src/auth/steps/PendingStep.jsx#L7) (renderiza), [`WelcomeStep`](../../../apps/referidos-app/src/auth/steps/WelcomeStep.jsx#L23) (renderiza).

### [`apps/referidos-app/src/auth/blocks/AuthFooter.jsx`](../../../apps/referidos-app/src/auth/blocks/AuthFooter.jsx#L1)

Coloca el pie común de autenticación y sus opciones de navegación.

**Superficie que exporta.** [`AuthFooter`](../../../apps/referidos-app/src/auth/blocks/AuthFooter.jsx#L4).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L6) (importa).

**Dependencias del archivo.** `react`, [`../constants/authCopy`](../../../apps/referidos-app/src/auth/constants/authCopy.js).

#### [`AuthFooter`](../../../apps/referidos-app/src/auth/blocks/AuthFooter.jsx#L4) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Usa código de** [`AUTH_BRAND`](../../../apps/referidos-app/src/auth/constants/authCopy.js#L1) (accede al módulo).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L521) (renderiza).

### [`apps/referidos-app/src/auth/blocks/AuthHeader.jsx`](../../../apps/referidos-app/src/auth/blocks/AuthHeader.jsx#L1)

Presenta introducción y título por etapa del acceso.

**Superficie que exporta.** [`AuthHeader`](../../../apps/referidos-app/src/auth/blocks/AuthHeader.jsx#L3).

**Módulos que lo cargan.** [`WelcomeStep.jsx`](../../../apps/referidos-app/src/auth/steps/WelcomeStep.jsx#L4) (importa).

**Dependencias del archivo.** `react`.

#### [`AuthHeader`](../../../apps/referidos-app/src/auth/blocks/AuthHeader.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{title, subtitle, titleClassName, subtitleClassName}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`WelcomeStep`](../../../apps/referidos-app/src/auth/steps/WelcomeStep.jsx#L27) (renderiza).

### [`apps/referidos-app/src/auth/blocks/AuthTabs.jsx`](../../../apps/referidos-app/src/auth/blocks/AuthTabs.jsx#L1)

Alterna las opciones de acceso y registro con una misma composición.

**Superficie que exporta.** [`AuthTabs`](../../../apps/referidos-app/src/auth/blocks/AuthTabs.jsx#L3).

**Módulos que lo cargan.** [`EmailLoginStep.jsx`](../../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx#L3) (importa), [`EmailRegisterStep.jsx`](../../../apps/referidos-app/src/auth/steps/EmailRegisterStep.jsx#L3) (importa).

**Dependencias del archivo.** `react`.

#### [`AuthTabs`](../../../apps/referidos-app/src/auth/blocks/AuthTabs.jsx#L3) · componente React · exportación por defecto

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{activeTab, onLogin, onRegister}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`.
- **Lo usa** [`EmailLoginStep`](../../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx#L28) (renderiza), [`EmailRegisterStep`](../../../apps/referidos-app/src/auth/steps/EmailRegisterStep.jsx#L46) (renderiza).

### [`apps/referidos-app/src/auth/blocks/BackButton.jsx`](../../../apps/referidos-app/src/auth/blocks/BackButton.jsx#L1)

Expone el control visual de retroceso para que la pantalla conecte su propia transición.

**Superficie que exporta.** [`BackButton`](../../../apps/referidos-app/src/auth/blocks/BackButton.jsx#L3).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L7) (importa).

**Dependencias del archivo.** `react`.

#### [`BackButton`](../../../apps/referidos-app/src/auth/blocks/BackButton.jsx#L3) · componente React · exportación por defecto

Monta `button`, `ArrowRightIcon`, `ArrowLeftIcon`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onClick, direction, className, ariaLabel}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `ArrowRightIcon`, `ArrowLeftIcon`.
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L524) (renderiza).

#### [`ArrowLeftIcon`](../../../apps/referidos-app/src/auth/blocks/BackButton.jsx#L20) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`BackButton`](../../../apps/referidos-app/src/auth/blocks/BackButton.jsx#L15) (renderiza).

#### [`ArrowRightIcon`](../../../apps/referidos-app/src/auth/blocks/BackButton.jsx#L39) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`BackButton`](../../../apps/referidos-app/src/auth/blocks/BackButton.jsx#L15) (renderiza).

### [`apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L1)

Muestra la entrada de teléfono y su estado de validación. El hook asociado lleva la lógica.

**Superficie que exporta.** [`ContactPhoneBlock`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L36).

**Módulos que lo cargan.** [`AccountVerifyStep.jsx`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L5) (importa), [`BusinessVerifyStep.jsx`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L5) (importa).

**Dependencias del archivo.** [`../hooks/useContactPhone`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js).

#### [`PencilIcon`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L3) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`ContactPhoneBlock`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L79) (renderiza).

#### [`ChevronIcon`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L20) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`ContactPhoneBlock`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L100) (renderiza).

#### [`ContactPhoneBlock`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L36) · componente React · exportación por defecto

Monta `button`, `PencilIcon`, `ChevronIcon`, `input`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{phone, email, showEmail, onEmailChange, onSave, onStatusChange}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `PencilIcon`, `ChevronIcon`, `input`.
- **Hooks que llama** `useContactPhone`.
- **Efectos y APIs** `replace`.
- **Usa código de** [`useContactPhone`](../../../apps/referidos-app/src/auth/hooks/useContactPhone.js#L12) (llama).
- **Llamadas directas en el cuerpo** [`replace`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L65), [`join`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L67), [`filter`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L67), [`phoneState.COUNTRY_CODES.map`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L130).
- **Lo usa** [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L473) (renderiza), [`BusinessVerifyStep`](../../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx#L222) (renderiza).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L75) · callback JSX · dentro de [`ContactPhoneBlock`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L36)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setEditingPhone`.
- **Llamadas directas en el cuerpo** [`phoneState.setEditingPhone`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L75).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L90) · callback JSX · dentro de [`ContactPhoneBlock`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L36)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setDropdownOpen`.
- **Llamadas directas en el cuerpo** [`phoneState.setDropdownOpen`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L91).

#### [`input.onChange`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L106) · callback JSX · dentro de [`ContactPhoneBlock`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L36)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`phoneState.handleDigitsChange`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L107).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L134) · callback JSX · dentro de [`ContactPhoneBlock`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L36)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`phoneState.handleSelectCountry`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L135).

#### [`input.onChange`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L159) · callback JSX · dentro de [`ContactPhoneBlock`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L36)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`onEmailChange`](../../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx#L159).

### [`apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx`](../../../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx#L1)

Reutiliza campos, errores y entrega de credenciales entre las variantes del formulario.

**Superficie que exporta.** [`EmailPasswordForm`](../../../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx#L5).

**Módulos que lo cargan.** [`EmailLoginStep.jsx`](../../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx#L4) (importa), [`EmailRegisterStep.jsx`](../../../apps/referidos-app/src/auth/steps/EmailRegisterStep.jsx#L4) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, `lucide-react`.

#### [`EmailPasswordForm`](../../../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx#L5) · componente React · exportación por defecto

Monta `input`, `button`, `EyeOff`, `Eye`, `Icon`, `Link`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{mode, email, password, passwordConfirm, showPassword, showPasswordConfirm, hasMinLength, hasNumberAndSymbol, passwordsMatch, showPasswordRules, showPasswordErrors, showConfirmRule, showConfirmErrors, onChangeEmail, onChangePassword, onChangePasswordConfirm, onToggleShowPassword, onToggleShowPasswordConfirm, onFocusField, onBlurField, passwordInputRef, confirmInputRef, onSubmit, primaryLabel, primaryDisabled, inputClassName, inputDisabled}`.
- **Retorno visible o tipo declarado** `JSX`, `null`.
- **Interfaz que monta** `input`, `button`, `EyeOff`, `Eye`, `Icon`, `Link`.
- **Condiciones que evalúa** `showPasswordErrors y item.ok`, `showConfirmErrors y passwordsMatch`.
- **Llamadas directas en el cuerpo** [`onFocusField`](../../../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx#L61), [`map`](../../../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx#L79).
- **Lo usa** [`EmailLoginStep`](../../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx#L34) (renderiza), [`EmailRegisterStep`](../../../apps/referidos-app/src/auth/steps/EmailRegisterStep.jsx#L52) (renderiza).

#### [`input.onChange`](../../../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx#L48) · callback JSX · dentro de [`EmailPasswordForm`](../../../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx#L5)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`onChangeEmail`](../../../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx#L48).

#### [`input.onChange`](../../../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx#L60) · callback JSX · dentro de [`EmailPasswordForm`](../../../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx#L5)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`onChangePassword`](../../../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx#L60).

#### [`input.onChange`](../../../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx#L118) · callback JSX · dentro de [`EmailPasswordForm`](../../../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx#L5)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`onChangePasswordConfirm`](../../../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx#L118).

#### [`input.onFocus`](../../../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx#L119) · callback JSX · dentro de [`EmailPasswordForm`](../../../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx#L5)

Responde al evento de interfaz `input.onFocus`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onFocusField`](../../../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx#L119).

### [`apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx#L1)

Compone el mensaje y controles de comprobación de correo. La operación de Auth vive en el hook.

**Superficie que exporta.** [`EmailVerificationBlock`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx#L21).

**Módulos que lo cargan.** [`AccountVerifyStep.jsx`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L6) (importa), [`VerifyEmailStep.jsx`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L4) (importa), [`ModalEmailVerification.jsx`](../../../apps/referidos-app/src/components/modals/ModalEmailVerification.jsx#L5) (importa).

**Dependencias del archivo.** `react`, [`../hooks/useEmailVerification`](../../../apps/referidos-app/src/auth/hooks/useEmailVerification.js).

#### [`PencilIcon`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx#L4) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`EmailVerificationBlock`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx#L102) (renderiza).

#### [`EmailVerificationBlock`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx#L21) · componente React · exportación por defecto

Monta `button`, `PencilIcon`, `input`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{email, showActions, emailConfirmed, onStateChange}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `PencilIcon`, `input`.
- **Hooks que llama** `useEmailVerification`, `useEffect`.
- **Condiciones que evalúa** `emailConfirmed`.
- **Usa código de** [`useEmailVerification`](../../../apps/referidos-app/src/auth/hooks/useEmailVerification.js#L4) (llama).
- **Llamadas directas en el cuerpo** [`emailValue.includes`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx#L114).
- **Lo usa** [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L336) (renderiza), [`VerifyEmailStep`](../../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx#L91) (renderiza), [`ModalEmailVerification`](../../../apps/referidos-app/src/components/modals/ModalEmailVerification.jsx#L41) (renderiza).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx#L39) · callback de infraestructura · dentro de [`EmailVerificationBlock`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx#L21)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `EmailVerificationBlock`.

- **Condiciones que evalúa** `ausencia de onStateChange`.
- **Llamadas directas en el cuerpo** [`onStateChange`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx#L41).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx#L98) · callback JSX · dentro de [`EmailVerificationBlock`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx#L21)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setEditingEmail`.
- **Llamadas directas en el cuerpo** [`setEditingEmail`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx#L98).

#### [`input.onChange`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx#L110) · callback JSX · dentro de [`EmailVerificationBlock`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx#L21)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setEmailValue`.
- **Llamadas directas en el cuerpo** [`setEmailValue`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx#L110).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx#L117) · callback JSX · dentro de [`EmailVerificationBlock`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx#L21)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setEditingEmail`.
- **Llamadas directas en el cuerpo** [`setEditingEmail`](../../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx#L117).

### [`apps/referidos-app/src/auth/blocks/ErrorBanner.jsx`](../../../apps/referidos-app/src/auth/blocks/ErrorBanner.jsx#L1)

Muestra errores del paso de auth en un lugar común sin replicar las transiciones.

**Superficie que exporta.** [`ErrorBanner`](../../../apps/referidos-app/src/auth/blocks/ErrorBanner.jsx#L3).

**Módulos que lo cargan.** [`BusinessDataStep.jsx`](../../../apps/referidos-app/src/auth/steps/BusinessDataStep.jsx#L2) (importa), [`EmailLoginStep.jsx`](../../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx#L5) (importa), [`EmailRegisterStep.jsx`](../../../apps/referidos-app/src/auth/steps/EmailRegisterStep.jsx#L5) (importa), [`UserAddressStep.jsx`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L2) (importa), [`UserProfileStep.jsx`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L2) (importa), [`WelcomeStep.jsx`](../../../apps/referidos-app/src/auth/steps/WelcomeStep.jsx#L5) (importa).

**Dependencias del archivo.** `react`.

#### [`ErrorBanner`](../../../apps/referidos-app/src/auth/blocks/ErrorBanner.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{message, className}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Condiciones que evalúa** `ausencia de message`.
- **Lo usa** [`BusinessDataStep`](../../../apps/referidos-app/src/auth/steps/BusinessDataStep.jsx#L37) (renderiza), [`EmailLoginStep`](../../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx#L26) (renderiza), [`EmailRegisterStep`](../../../apps/referidos-app/src/auth/steps/EmailRegisterStep.jsx#L44) (renderiza), [`UserAddressStep`](../../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx#L1155) (renderiza), [`UserProfileStep`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L55) (renderiza), [`WelcomeStep`](../../../apps/referidos-app/src/auth/steps/WelcomeStep.jsx#L24) (renderiza).

### [`apps/referidos-app/src/auth/blocks/OAuthButtons.jsx`](../../../apps/referidos-app/src/auth/blocks/OAuthButtons.jsx#L1)

Presenta los proveedores de acceso y delega el inicio del flujo a los handlers.

**Superficie que exporta.** [`OAuthButtons`](../../../apps/referidos-app/src/auth/blocks/OAuthButtons.jsx#L3).

**Módulos que lo cargan.** [`WelcomeStep.jsx`](../../../apps/referidos-app/src/auth/steps/WelcomeStep.jsx#L6) (importa).

**Dependencias del archivo.** `react`.

#### [`OAuthButtons`](../../../apps/referidos-app/src/auth/blocks/OAuthButtons.jsx#L3) · componente React · exportación por defecto

Monta `GoogleIcon`, `FacebookIcon`, `AppleIcon`, `XIcon`, `DiscordIcon`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onGoogle, onFacebook, onApple, enableApple, onTwitter, onDiscord, loading, oauthLoading, oauthProvider}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `GoogleIcon`, `FacebookIcon`, `AppleIcon`, `XIcon`, `DiscordIcon`, `button`.
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-app/src/auth/blocks/OAuthButtons.jsx#L15), [`buttons.map`](../../../apps/referidos-app/src/auth/blocks/OAuthButtons.jsx#L50).
- **Lo usa** [`WelcomeStep`](../../../apps/referidos-app/src/auth/steps/WelcomeStep.jsx#L57) (renderiza).

#### [`GoogleIcon`](../../../apps/referidos-app/src/auth/blocks/OAuthButtons.jsx#L77) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`OAuthButtons`](../../../apps/referidos-app/src/auth/blocks/OAuthButtons.jsx#L20) (renderiza).

#### [`FacebookIcon`](../../../apps/referidos-app/src/auth/blocks/OAuthButtons.jsx#L106) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`OAuthButtons`](../../../apps/referidos-app/src/auth/blocks/OAuthButtons.jsx#L26) (renderiza).

#### [`AppleIcon`](../../../apps/referidos-app/src/auth/blocks/OAuthButtons.jsx#L123) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`OAuthButtons`](../../../apps/referidos-app/src/auth/blocks/OAuthButtons.jsx#L32) (renderiza).

#### [`XIcon`](../../../apps/referidos-app/src/auth/blocks/OAuthButtons.jsx#L144) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`OAuthButtons`](../../../apps/referidos-app/src/auth/blocks/OAuthButtons.jsx#L38) (renderiza).

#### [`DiscordIcon`](../../../apps/referidos-app/src/auth/blocks/OAuthButtons.jsx#L161) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`OAuthButtons`](../../../apps/referidos-app/src/auth/blocks/OAuthButtons.jsx#L44) (renderiza).

### [`apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L1)

Dibuja entradas y requisitos de preparación de contraseña reutilizables entre pasos.

**Superficie que exporta.** [`PasswordSetupBlock`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L5).

**Módulos que lo cargan.** [`AccountVerifyStep.jsx`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L7) (importa), [`AddPasswordStep.jsx`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L4) (importa).

**Dependencias del archivo.** `lucide-react`, `react`, [`../hooks/usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js).

#### [`PasswordSetupBlock`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L5) · componente React · exportación por defecto

Monta `Check`, `input`, `button`, `EyeOff`, `Eye`, `Icon`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{provider, onValidityChange, onSaveChange}`.
- **Retorno visible o tipo declarado** `JSX`, `null`.
- **Estado o valores vinculados** `lastValidityRef mediante useRef`, `lastSaveRef mediante useRef`, `[showMatchMessage, setShowMatchMessage] mediante useState`, `matchTimerRef mediante useRef`.
- **Interfaz que monta** `Check`, `input`, `button`, `EyeOff`, `Eye`, `Icon`, `X`.
- **Hooks que llama** `usePasswordAccess`, `useRef`, `useState`, `useEffect`.
- **Condiciones que evalúa** `showPasswordErrors y item.ok`.
- **Usa código de** [`usePasswordAccess`](../../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js#L5) (llama).
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L153).
- **Lo usa** [`AccountVerifyStep`](../../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx#L359) (renderiza), [`AddPasswordStep`](../../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx#L92) (renderiza).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L49) · callback de infraestructura · dentro de [`PasswordSetupBlock`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L5)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `PasswordSetupBlock`.

- **Condiciones que evalúa** `ausencia de onValidityChange`, `lastValidityRef.current`.
- **Llamadas directas en el cuerpo** [`onValidityChange`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L53).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L56) · callback de infraestructura · dentro de [`PasswordSetupBlock`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L5)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `PasswordSetupBlock`.

- **Condiciones que evalúa** `ausencia de onSaveChange`, `prev.save y prev.saving y prev.error y prev.message`.
- **Llamadas directas en el cuerpo** [`onSaveChange`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L73).

#### [`useEffect · callback`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L82) · callback de infraestructura · dentro de [`PasswordSetupBlock`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L5)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `PasswordSetupBlock`.

- **Actualizaciones de estado o acciones** `setShowMatchMessage`, `clearTimeout`.
- **Efectos y APIs** `clearTimeout`, `setTimeout`.
- **Condiciones que evalúa** `ausencia de passwordsMatch o ausencia de showConfirmRule`, `matchTimerRef.current`.
- **Llamadas directas en el cuerpo** [`setShowMatchMessage`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L84), [`clearTimeout`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L86), [`setTimeout`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L95).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L95) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L82)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setShowMatchMessage`.
- **Llamadas directas en el cuerpo** [`setShowMatchMessage`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L96).

#### [`input.onFocus`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L132) · callback JSX · dentro de [`PasswordSetupBlock`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L5)

Responde al evento de interfaz `input.onFocus`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onFocusField`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L132).

#### [`input.onFocus`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L192) · callback JSX · dentro de [`PasswordSetupBlock`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L5)

Responde al evento de interfaz `input.onFocus`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onFocusField`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L192).

#### [`button.onClick`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L235) · callback JSX · dentro de [`PasswordSetupBlock`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L5)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onChangePasswordValue`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L236), [`onChangePasswordConfirm`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L237), [`passwordInputRef.current.blur`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L238), [`confirmInputRef.current.blur`](../../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx#L239).

### [`apps/referidos-app/src/auth/blocks/RoleCard.jsx`](../../../apps/referidos-app/src/auth/blocks/RoleCard.jsx#L1)

Representa cada opción de registro por rol y entrega la selección al flujo.

**Superficie que exporta.** [`RoleCard`](../../../apps/referidos-app/src/auth/blocks/RoleCard.jsx#L3).

**Dependencias del archivo.** `react`.

#### [`RoleCard`](../../../apps/referidos-app/src/auth/blocks/RoleCard.jsx#L3) · componente React · exportación por defecto

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, description, onClick, className, children}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`.

### [`apps/referidos-app/src/auth/blocks/StepProgress.jsx`](../../../apps/referidos-app/src/auth/blocks/StepProgress.jsx#L1)

Representa avance de onboarding para dar contexto al usuario entre pantallas.

**Superficie que exporta.** [`StepProgress`](../../../apps/referidos-app/src/auth/blocks/StepProgress.jsx#L3).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L8) (importa).

**Dependencias del archivo.** `react`.

#### [`StepProgress`](../../../apps/referidos-app/src/auth/blocks/StepProgress.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{page}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`segment`](../../../apps/referidos-app/src/auth/blocks/StepProgress.jsx#L19).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L537) (renderiza).

#### [`segment`](../../../apps/referidos-app/src/auth/blocks/StepProgress.jsx#L4) · función · dentro de [`StepProgress`](../../../apps/referidos-app/src/auth/blocks/StepProgress.jsx#L3)

Función auxiliar de `StepProgress` para `segment`.

- **Entradas** `n`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`StepProgress`](../../../apps/referidos-app/src/auth/blocks/StepProgress.jsx#L19) (llama).

### [`apps/referidos-app/src/auth/constants/authCopy.js`](../../../apps/referidos-app/src/auth/constants/authCopy.js#L1)

Catálogo central de textos del flujo. Modifica aquí etiquetas y mensajes que comparten pasos.

**Superficie que exporta.** [`AUTH_BRAND`](../../../apps/referidos-app/src/auth/constants/authCopy.js#L1).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L29) (importa), [`AuthBranderHeader.jsx`](../../../apps/referidos-app/src/auth/blocks/AuthBranderHeader.jsx#L2) (importa), [`AuthFooter.jsx`](../../../apps/referidos-app/src/auth/blocks/AuthFooter.jsx#L2) (importa).

#### [`AUTH_BRAND`](../../../apps/referidos-app/src/auth/constants/authCopy.js#L1) · variable de módulo · exportado

Agrupa la configuración o catálogo de `AUTH BRAND` para que sus consumidores lean claves comunes.

- **Campos o contexto** `name`, `alpha`.
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L443) (accede al módulo), [`AuthBranderHeader`](../../../apps/referidos-app/src/auth/blocks/AuthBranderHeader.jsx#L7) (accede al módulo), [`AuthFooter`](../../../apps/referidos-app/src/auth/blocks/AuthFooter.jsx#L7) (accede al módulo).

### [`apps/referidos-app/src/auth/constants/authRoles.js`](../../../apps/referidos-app/src/auth/constants/authRoles.js#L1)

Identificadores de roles usados en selección y ramas de onboarding.

**Superficie que exporta.** [`AUTH_ROLES`](../../../apps/referidos-app/src/auth/constants/authRoles.js#L1).

#### [`AUTH_ROLES`](../../../apps/referidos-app/src/auth/constants/authRoles.js#L1) · variable de módulo · exportado

Agrupa la configuración o catálogo de `AUTH ROLES` para que sus consumidores lean claves comunes.

- **Campos o contexto** `CLIENTE`, `NEGOCIO`, `ADMIN`.

### [`apps/referidos-app/src/auth/constants/authSteps.js`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1)

Identificadores de paso para reanudar registro y renderizar la pantalla correcta a partir del estado.

**Superficie que exporta.** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1), [`AUTH_FORM_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L23).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L27) (importa), [`useAuthActions.js`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L11) (importa), [`useAuthFlow.js`](../../../apps/referidos-app/src/auth/hooks/useAuthFlow.js#L2) (importa), [`useAuthPrefill.js`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L2) (importa).

#### [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) · variable de módulo · exportado

Agrupa la configuración o catálogo de `AUTH STEPS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `WELCOME`, `EMAIL_LOGIN`, `EMAIL_REGISTER`, `OAUTH_CALLBACK`, `ROLE_SELECT`, `USER_PROFILE`, `BUSINESS_DATA`, `BUSINESS_CATEGORY`, `USER_ADDRESS`, `BUSINESS_VERIFY`, `ACCOUNT_VERIFY_PROMPT`, `ACCOUNT_VERIFY`, `VERIFY_EMAIL`, `ACCOUNT_VERIFY_METHOD` y 5 más.
- **Lo usa** [`BUSINESS_STEP_COPY`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L41) (accede al módulo), [`CLIENT_STEP_COPY`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L102) (accede al módulo), [`initialStep`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L160) (accede al módulo), [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L171) (accede al módulo), [`resetToWelcome`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L250) (accede al módulo), [`verificationSteps`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L341) (accede al módulo), [`useEffect · callback`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L355) (accede al módulo), [`handleVerificationExit`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L462) (accede al módulo), [`handleBackToMethod`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L467) (accede al módulo), [`handleOwnerExit`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L486) (accede al módulo), [`handleBack`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L491) (accede al módulo), [`useEffect · callback`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L512) (accede al módulo) y 21 más.

#### [`AUTH_FORM_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L23) · variable de módulo · exportado

Agrupa la configuración o catálogo de `AUTH FORM STEPS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `USER_PROFILE`, `BUSINESS`, `BUSINESS_CATEGORY`, `USER_ADDRESS`, `BUSINESS_VERIFY`, `ACCOUNT_VERIFY`, `ACCOUNT_VERIFY_PROMPT`, `VERIFY_EMAIL`, `ACCOUNT_VERIFY_METHOD`, `ACCOUNT_VERIFY_READY`, `ADD_PASSWORD`, `ADD_MFA`.

### [`apps/referidos-app/src/auth/constants/businessCategories.js`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L1)

Catálogo de actividad de negocio que alimenta el selector de categoría.

**Superficie que exporta.** [`BUSINESS_CATEGORIES`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L148), [`BUSINESS_SUBCATEGORIES`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L252), [`getBusinessCategoryPath`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L351).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L30) (importa).

#### [`makeIcon`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L1) · función

Construye `Icon` a partir de los datos del flujo.

- **Entradas** `paths`, `viewBox = valor por defecto`.
- **Retorno visible o tipo declarado** `viewBox`, `paths`.
- **Lo usa** [`DEFAULT_SUBCATEGORY_ICON`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L6) (llama), [`SUB_ICONS`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L19) (llama), [`BUSINESS_CATEGORIES`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L152) (llama).

#### [`DEFAULT_SUBCATEGORY_ICON`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L6) · variable de módulo

Declara `DEFAULT_SUBCATEGORY_ICON` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`makeIcon`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L6).
- **Lo usa** [`makeSub`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L12) (referencia).

#### [`makeSub`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L12) · función

Construye `Sub` a partir de los datos del flujo.

- **Entradas** `id`, `label`, `icon = valor por defecto`.
- **Retorno visible o tipo declarado** `id`, `label`, `icon`.
- **Lo usa** [`BUSINESS_SUBCATEGORIES`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L254) (llama).

#### [`SUB_ICONS`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L18) · variable de módulo

Agrupa la configuración o catálogo de `SUB ICONS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `comidaRapida`, `hamburguesas`, `pizzeria`, `comidaTipica`, `parrilladas`, `mariscos`, `gourmet`, `asiatica`, `vegetariana`, `foodTruck`, `comidaOtra`, `ropa`, `zapatos`, `accesorios` y 59 más.
- **Llamadas directas en el cuerpo** [`makeIcon`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L19).
- **Lo usa** [`BUSINESS_CATEGORIES`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L180) (accede al módulo), [`BUSINESS_SUBCATEGORIES`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L254) (accede al módulo).

#### [`BUSINESS_CATEGORIES`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L148) · variable de módulo · exportado

Conserva la lista de `BUSINESS CATEGORIES` usada por el módulo.

- **Llamadas directas en el cuerpo** [`makeIcon`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L152).
- **Lo usa** [`getBusinessCategoryPath`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L357) (accede al módulo), [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L690) (pasa a categories).

#### [`BUSINESS_SUBCATEGORIES`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L252) · variable de módulo · exportado

Agrupa la configuración o catálogo de `BUSINESS SUBCATEGORIES` para que sus consumidores lean claves comunes.

- **Campos o contexto** `restaurante`, `cafe`, `compras`, `farmacia`, `belleza`, `salud`, `fitness`, `deporte-recreacion`, `servicios-profesionales`, `tecnologia`, `mascotas`, `educacion`, `otras`.
- **Llamadas directas en el cuerpo** [`makeSub`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L254).
- **Lo usa** [`getBusinessCategoryPath`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L362) (referencia), [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L691) (pasa a subcategories).

#### [`getBusinessCategoryPath`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L351) · función · exportado

Obtiene o resuelve `Business Category Path` para entregarlo al consumidor.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `parentLabel`, `subLabel`.
- **Condiciones que evalúa** `ausencia de label`, `parentMatch`, `ausencia de Array.isArray`, `subMatch`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L352), [`BUSINESS_CATEGORIES.find`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L357), [`list.find`](../../../apps/referidos-app/src/auth/constants/businessCategories.js#L364).
- **Lo usa** [`categoryPath`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L456) (llama).

### [`apps/referidos-app/src/auth/hooks/useAuthActions.js`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1)

Realiza las acciones del flujo. Maneja alta y acceso por email u OAuth, crea perfiles, valida códigos, persiste datos y conduce el avance.

**Superficie que exporta.** [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L25) (importa).

**Dependencias del archivo.** `react`, [`../../utils/validators`](../../../apps/referidos-app/src/utils/validators.js), [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../../services/authService`](../../../apps/referidos-app/src/services/authService.js), [`../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../../utils/googleOneTap`](../../../apps/referidos-app/src/utils/googleOneTap.js), [`../constants/authSteps`](../../../apps/referidos-app/src/auth/constants/authSteps.js), [`../utils/userProfileUtils`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js), [`../utils/businessDataUtils`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js), [`../../services/registrationClient`](../../../apps/referidos-app/src/services/registrationClient.js), [`../../services/loggingClient`](../../../apps/referidos-app/src/services/loggingClient.js), [`../../utils/textCase`](../../../apps/referidos-app/src/utils/textCase.js), [`../../config/runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js).

#### [`OAUTH_INTENT_KEY`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L27) · variable de módulo

Declara `OAUTH_INTENT_KEY` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`startOAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L737) (referencia).

#### [`OAUTH_LOGIN_PENDING`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L28) · variable de módulo

Declara `OAUTH_LOGIN_PENDING` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`startGoogleOneTap`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L781) (referencia).

#### [`GOOGLE_ONE_TAP_CLIENT_ID`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L29) · variable de módulo

Declara `GOOGLE_ONE_TAP_CLIENT_ID` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L81) (accede al módulo).
- **Lo usa** [`startGoogleOneTap`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L763) (referencia).

#### [`DEFAULT_SUCURSAL_HORARIOS`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L32) · variable de módulo

Agrupa la configuración o catálogo de `DEFAULT SUCURSAL HORARIOS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `semanal`, `excepciones`.
- **Lo usa** [`handleBusinessAddress`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1165) (referencia).

#### [`normalizeNullableString`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L45) · función

Normaliza `Nullable String` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L46).
- **Lo usa** [`areDireccionesEqual`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L59) (llama).

#### [`normalizeNullableNumber`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L50) · función

Normaliza `Nullable Number` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `value`.
- **Lo usa** [`areDireccionesEqual`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L83) (llama).

#### [`areDireccionesEqual`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L56) · función

Implementa `are Direcciones Equal` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `current`, `next`.
- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `ausencia de current o ausencia de next`.
- **Llamadas directas en el cuerpo** [`normalizeNullableString`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L59), [`normalizeNullableNumber`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L83).
- **Lo usa** [`handleClientAddress`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L921) (llama), [`handleBusinessAddress`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1070) (llama).

#### [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91) · hook React · exportación por defecto

Da a AuthFlow los manejadores que ejecutan acciones del registro y login. Conserva los detalles de Auth, datos y telemetría fuera de cada paso visual.

- **Entradas** `{email, password, passwordConfirm, telefono, nombreDueno, apellidoDueno, genero, fechaNacimiento, ownerPrefill, businessPrefill, nombreNegocio, categoriaNegocio, isSucursalPrincipal, horarios, direccionPayload, step, setEmailError, setWelcomeError, setLoginLoading, setOauthLoading, setOauthProvider, setWelcomeLoading, setStep, goToStep, onResetToWelcome}`.
- **Retorno visible o tipo declarado** `goToEmailLogin`, `goToEmailRegister`, `handleEmailLogin`, `handleEmailRegister`, `handleUserProfile`, `handleBusinessData`, `handleUserAddress`, `handleRoleSelect`, `skipUserProfile`, `skipUserAddress`, `startOAuth`, `startGoogleOAuth`, `startFacebookOAuth`, `startAppleOAuth`, `startTwitterOAuth`, `startDiscordOAuth`, `startGoogleOneTap`, `startFacebookOneTap` y 2 más.
- **Estado o valores vinculados** `login mediante useAppStore`, `selector s.login`, `bootstrapAuth mediante useAppStore`, `selector s.bootstrapAuth`, `setJustCompletedRegistration mediante useAppStore`, `selector s.setJustCompletedRegistration`, `usuario mediante useAppStore`, `selector s.usuario`, `onboarding mediante useAppStore`, `selector s.onboarding`.
- **Hooks que llama** `useAppStore`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L81) (accede al módulo).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L253) (llama).

#### [`resolveClientSteps`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L131) · callback React · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Obtiene o resuelve `Client Steps` para entregarlo al consumidor.

- **Entradas** `state = valor por defecto`.
- **Retorno visible o tipo declarado** `profilePending`, `addressPending`.
- **Hooks que llama** `useCallback`.
- **Lo usa** [`advanceClientFlow`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L148) (llama).

#### [`advanceClientFlow`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L145) · callback React · asíncrona · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Función auxiliar de `useAuthActions` para `advance Client Flow`.

- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `profilePending`, `addressPending`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (accede al módulo), [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`bootstrapAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L146), [`useAppStore.getState`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L147), [`resolveClientSteps`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L148), [`goToStep`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L150).
- **Lo usa** [`handleUserProfile`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L572) (llama), [`skipUserProfile`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L814) (llama), [`skipUserAddress`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L832) (llama), [`handleClientAddress`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L953) (llama).

#### [`goToEmailLogin`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L158) · callback React · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Coordina cambios de estado durante `go To Email Login`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setStep`, `setEmailError`.
- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setStep`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L159), [`setEmailError`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L160).
- **Lo usa** [`handleEmailRegister`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L458) (llama), [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1269) (referencia).

#### [`goToEmailRegister`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L163) · callback React · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Coordina cambios de estado durante `go To Email Register`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setStep`, `setEmailError`.
- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setStep`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L164), [`setEmailError`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L165).
- **Lo usa** [`handleButtonBack`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1262) (llama), [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1270) (referencia).

#### [`validateEmailRegister`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L168) · callback React · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Comprueba `Email Register` para decidir si se admite o continúa la operación.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setEmailError`.
- **Condiciones que evalúa** `ausencia de EMAIL_RE.test`, `ausencia de hasMinLength`, `ausencia de hasNumberAndSymbol`, `password`.
- **Usa código de** [`EMAIL_RE`](../../../apps/referidos-app/src/utils/validators.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`EMAIL_RE.test`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L169), [`setEmailError`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L170), [`test`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L174).
- **Lo usa** [`handleEmailRegister`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L433) (llama).

#### [`handleEmailLogin`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L194) · callback React · asíncrona · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Consulta o invoca tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setEmailError`, `setLoginLoading`.
- **Condiciones que evalúa** `ausencia de email`, `ausencia de validateEmail`, `ausencia de password`, `ausencia de result.ok`, `msg.includes`, `oauthUser`.
- **Contrato de datos** tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`useAuthActions.js:214`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L214), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`useAuthActions.js:214`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L214).
- **Usa código de** [`validateEmail`](../../../apps/referidos-app/src/utils/validators.js#L5) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setEmailError`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L195), [`validateEmail`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L198), [`setLoginLoading`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L201), [`login`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L202), [`toLowerCase`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L206), [`msg.includes`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L210), [`maybeSingle`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L214), [`eq`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L214), [`select`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L214), [`supabase.from`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L214).
- **Lo usa** [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1271) (referencia).

#### [`createClienteProfile`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L231) · callback React · asíncrona · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Consulta o invoca tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Retorno visible o tipo declarado** `ok`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setEmailError`.
- **Condiciones que evalúa** `ausencia de session.user`, `ausencia de authEmail`, `exErr`, `ausencia de existing.role`, `error`.
- **Contrato de datos** Auth `getSession` en [`useAuthActions.js:234`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L234), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`useAuthActions.js:246`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L246), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`useAuthActions.js:246`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L246), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`insert + select`) en [`useAuthActions.js:258`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L258), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`insert`) en [`useAuthActions.js:258`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L258).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setEmailError`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L232), [`supabase.auth.getSession`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L234), [`maybeSingle`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L246), [`eq`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L246), [`select`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L246), [`supabase.from`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L246), [`insert`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L258), [`authEmail.split`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L263), [`bootstrapAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L276).
- **Lo usa** [`handleRoleSelect`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L337) (llama).

#### [`createNegocioProfile`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L280) · callback React · asíncrona · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Consulta o invoca tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Entradas** `{bootstrap, silent} = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `error`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `ausencia de session.user`, `ausencia de authEmail`, `exErr`, `ausencia de existing.role`, `error`, `bootstrap`.
- **Contrato de datos** Auth `getSession` en [`useAuthActions.js:287`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L287), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`useAuthActions.js:299`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L299), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`useAuthActions.js:299`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L299), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`insert + select`) en [`useAuthActions.js:311`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L311), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`insert`) en [`useAuthActions.js:311`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L311).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo), [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`reportError`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L285), [`supabase.auth.getSession`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L287), [`maybeSingle`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L299), [`eq`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L299), [`select`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L299), [`supabase.from`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L299), [`insert`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L311), [`bootstrapAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L328), [`goToStep`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L329).
- **Lo usa** [`handleRoleSelect`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L340) (llama), [`validateNegocioCode`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L393) (llama).

#### [`handleRoleSelect`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L335) · callback React · asíncrona · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Aplica la selección de rol y dirige el registro al bloque que corresponde al perfil.

- **Entradas** `role`.
- **Retorno visible o tipo declarado** `ok`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `role`.
- **Llamadas directas en el cuerpo** [`createClienteProfile`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L337), [`createNegocioProfile`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L340).
- **Lo usa** [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1276) (referencia).

#### [`validateNegocioCode`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L348) · callback React · asíncrona · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Consulta o invoca Edge [`validate-registration-code`](../../../apps/referidos-app/supabase/functions/validate-registration-code/index.ts) y coordina las demás operaciones de esta ficha.

- **Entradas** `codeRaw`.
- **Retorno visible o tipo declarado** `ok`, `error`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `ausencia de CODE_RE.test`, `ausencia de session.access_token`, `validationError`, `ausencia de validation.ok o ausencia de validation.valid`, `ausencia de created.ok`, `consumeError`, `ausencia de consumed.ok o ausencia de consumed.valid`.
- **Contrato de datos** Auth `getSession` en [`useAuthActions.js:354`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L354), Edge [`validate-registration-code`](../../../apps/referidos-app/supabase/functions/validate-registration-code/index.ts) en [`useAuthActions.js:360`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L360).
- **Usa código de** [`CODE_RE`](../../../apps/referidos-app/src/utils/validators.js#L3) (accede al módulo), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`toUpperCase`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L349), [`trim`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L349), [`CODE_RE.test`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L350), [`supabase.auth.getSession`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L354), [`supabase.functions.invoke`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L360), [`createNegocioProfile`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L393).
- **Lo usa** [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1288) (referencia).

#### [`handleEmailRegister`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L432) · callback React · asíncrona · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Valida la entrada, crea la cuenta en Supabase Auth y comprueba la sesión antes de continuar con la creación del perfil.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setEmailError`.
- **Condiciones que evalúa** `ausencia de validateEmailRegister`, `error`, `msg.includes`, `onResetToWelcome`, `ausencia de session.user`, `ausencia de boot.ok`.
- **Contrato de datos** Auth `signUp` en [`useAuthActions.js:441`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L441), Auth `getSession` en [`useAuthActions.js:466`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L466).
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`validateEmailRegister`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L433), [`setEmailError`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L434), [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L435), [`supabase.auth.signUp`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L441), [`error.message.toLowerCase`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L447), [`msg.includes`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L452), [`onResetToWelcome`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L455), [`goToEmailLogin`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L458), [`supabase.auth.getSession`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L466), [`bootstrapAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L476).
- **Lo usa** [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1272) (referencia).

#### [`handleUserProfile`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L506) · callback React · asíncrona · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Reúne la información de identidad del paso de perfil y coordina su guardado y la continuación del registro.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setEmailError`.
- **Condiciones que evalúa** `ausencia de profileStatus.nombre.trim`, `ausencia de profileStatus.apellido.trim`, `ausencia de profileStatus.genero.trim`, `ausencia de profileStatus.birthStatus.isValid`, `ausencia de session.user`, `exErr`, `ausencia de existing.role`, `existing.role` y 3 más.
- **Contrato de datos** Auth `getSession` en [`useAuthActions.js:533`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L533), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`useAuthActions.js:538`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L538), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`useAuthActions.js:538`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L538), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`useAuthActions.js:586`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L586).
- **Usa código de** [`getUserProfileStatus`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L153) (llama), [`normalizeUserName`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L28) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo), [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo), [`buildBirthdateISO`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L144) (llama).
- **Llamadas directas en el cuerpo** [`getUserProfileStatus`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L508), [`profileStatus.nombre.trim`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L515), [`setEmailError`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L515), [`profileStatus.apellido.trim`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L516), [`profileStatus.genero.trim`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L517), [`normalizeUserName`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L523), [`supabase.auth.getSession`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L533), [`maybeSingle`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L538), [`eq`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L538), [`select`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L538), [`supabase.from`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L538), [`goToStep`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L569) y 4 más.
- **Lo usa** [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1273) (referencia).

#### [`handleBusinessData`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L616) · callback React · asíncrona · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Consulta o invoca tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setEmailError`.
- **Condiciones que evalúa** `ausencia de businessStatus.nombre.trim`, `ausencia de businessStatus.categoria`, `ausencia de userId o ausencia de session.access_token`, `userErr`, `ausencia de userRow`, `userRow.role`, `negReadErr`, `existingNeg y ausencia de unchanged` y 4 más.
- **Contrato de datos** Auth `getSession` en [`useAuthActions.js:643`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L643), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`useAuthActions.js:651`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L651), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`useAuthActions.js:651`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L651), tabla o vista [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) (`select`) en [`useAuthActions.js:672`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L672), tabla o bucket [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) en [`useAuthActions.js:672`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L672), tabla o vista [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) (`update + select`) en [`useAuthActions.js:691`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L691), tabla o vista [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) (`update`) en [`useAuthActions.js:691`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L691), tabla o vista [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) (`insert + select`) en [`useAuthActions.js:703`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L703), tabla o vista [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) (`insert`) en [`useAuthActions.js:703`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L703).
- **Usa código de** [`getBusinessDataStatus`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L19) (llama), [`normalizeBusinessName`](../../../apps/referidos-app/src/auth/utils/businessDataUtils.js#L7) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo), [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`getBusinessDataStatus`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L618), [`businessStatus.nombre.trim`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L623), [`setEmailError`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L624), [`normalizeBusinessName`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L633), [`trim`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L636), [`supabase.auth.getSession`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L643), [`maybeSingle`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L651), [`limit`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L651), [`order`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L651), [`eq`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L651), [`select`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L651), [`supabase.from`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L651) y 4 más.
- **Lo usa** [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1274) (referencia).

#### [`startOAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L729) · callback React · asíncrona · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Inicia `O Auth` y prepara sus dependencias.

- **Entradas** `provider`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setEmailError`, `setOauthProvider`, `setOauthLoading`.
- **Efectos y APIs** `localStorage.removeItem`.
- **Usa código de** [`signInWithOAuth`](../../../apps/referidos-app/src/services/authService.js#L25) (llama).
- **Llamadas directas en el cuerpo** [`setEmailError`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L730), [`setOauthProvider`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L731), [`setOauthLoading`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L732), [`signInWithOAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L735), [`localStorage.removeItem`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L737).
- **Lo usa** [`startGoogleOAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L744) (llama), [`startFacebookOAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L745) (llama), [`startAppleOAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L746) (llama), [`startTwitterOAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L747) (llama), [`startDiscordOAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L748) (llama), [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1279) (referencia).

#### [`startGoogleOAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L744) · callback React · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Inicia `Google O Auth` y prepara sus dependencias.

- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`startOAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L744).
- **Lo usa** [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1280) (referencia).

#### [`startFacebookOAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L745) · callback React · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Inicia `Facebook O Auth` y prepara sus dependencias.

- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`startOAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L745).
- **Lo usa** [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1281) (referencia).

#### [`startAppleOAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L746) · callback React · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Inicia `Apple O Auth` y prepara sus dependencias.

- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`startOAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L746).
- **Lo usa** [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1282) (referencia).

#### [`startTwitterOAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L747) · callback React · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Inicia `Twitter O Auth` y prepara sus dependencias.

- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`startOAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L747).
- **Lo usa** [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1283) (referencia).

#### [`startDiscordOAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L748) · callback React · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Inicia `Discord O Auth` y prepara sus dependencias.

- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`startOAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L748).
- **Lo usa** [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1284) (referencia).

#### [`startGoogleOneTap`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L750) · callback React · asíncrona · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Inicia `Google One Tap` y prepara sus dependencias.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setWelcomeError`, `setWelcomeLoading`, `setItem`.
- **Efectos y APIs** `localStorage.setItem`.
- **Condiciones que evalúa** `ausencia de GOOGLE_ONE_TAP_CLIENT_ID`, `ausencia de result o result.type`, `ausencia de redirected`.
- **Usa código de** [`requestGoogleCredential`](../../../apps/referidos-app/src/utils/googleOneTap.js#L39) (llama), [`signInWithGoogleIdToken`](../../../apps/referidos-app/src/services/authService.js#L72) (llama).
- **Llamadas directas en el cuerpo** [`setWelcomeError`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L751), [`setWelcomeLoading`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L752), [`fallbackToOAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L764), [`requestGoogleCredential`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L769), [`localStorage.setItem`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L781), [`signInWithGoogleIdToken`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L782), [`bootstrapAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L786).
- **Lo usa** [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1285) (referencia).

#### [`fallbackToOAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L753) · función · asíncrona · dentro de [`startGoogleOneTap`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L750)

Coordina cambios de estado durante `fallback To O Auth`.

- **Retorno visible o tipo declarado** `booleano`.
- **Actualizaciones de estado o acciones** `setWelcomeError`.
- **Usa código de** [`signInWithOAuth`](../../../apps/referidos-app/src/services/authService.js#L25) (llama).
- **Llamadas directas en el cuerpo** [`signInWithOAuth`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L755), [`setWelcomeError`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L758).
- **Lo usa** [`startGoogleOneTap`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L764) (llama).

#### [`startFacebookOneTap`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L797) · callback React · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Inicia `Facebook One Tap` y prepara sus dependencias.

- **Hooks que llama** `useCallback`.
- **Lo usa** [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1286) (referencia).

#### [`skipUserProfile`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L799) · callback React · asíncrona · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setEmailError`.
- **Condiciones que evalúa** `ausencia de session.user`, `error`.
- **Contrato de datos** Auth `getSession` en [`useAuthActions.js:801`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L801), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`useAuthActions.js:806`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L806), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`useAuthActions.js:806`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L806).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setEmailError`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L800), [`supabase.auth.getSession`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L801), [`eq`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L806), [`update`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L806), [`supabase.from`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L806), [`advanceClientFlow`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L814).
- **Lo usa** [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1277) (referencia).

#### [`skipUserAddress`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L817) · callback React · asíncrona · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setEmailError`.
- **Condiciones que evalúa** `ausencia de session.user`, `error`.
- **Contrato de datos** Auth `getSession` en [`useAuthActions.js:819`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L819), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`useAuthActions.js:824`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L824), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`useAuthActions.js:824`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L824).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setEmailError`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L818), [`supabase.auth.getSession`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L819), [`eq`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L824), [`update`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L824), [`supabase.from`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L824), [`advanceClientFlow`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L832).
- **Lo usa** [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1278) (referencia).

#### [`handleClientAddress`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L835) · callback React · asíncrona · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Consulta o invoca tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setEmailError`.
- **Condiciones que evalúa** `ausencia de placeId o ausencia de label`, `latValue o lngValue`, `ausencia de userId`, `userErr o ausencia de userRow`, `userRow.role`, `existingErr`, `existingDir.id`, `needsUpdate` y 2 más.
- **Contrato de datos** Auth `getSession` en [`useAuthActions.js:863`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L863), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`useAuthActions.js:870`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L870), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`useAuthActions.js:870`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L870), tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) (`select`) en [`useAuthActions.js:903`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L903), tabla o bucket [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) en [`useAuthActions.js:903`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L903), tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) (`update`) en [`useAuthActions.js:923`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L923), tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) (`insert + select`) en [`useAuthActions.js:933`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L933), tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) (`insert`) en [`useAuthActions.js:933`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L933), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`useAuthActions.js:944`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L944).
- **Usa código de** [`toTitleCaseEs`](../../../apps/referidos-app/src/utils/textCase.js#L17) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setEmailError`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L836), [`trim`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L837), [`toTitleCaseEs`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L838), [`supabase.auth.getSession`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L863), [`maybeSingle`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L870), [`eq`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L870), [`select`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L870), [`supabase.from`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L870), [`limit`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L903), [`order`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L903), [`areDireccionesEqual`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L921), [`update`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L923) y 2 más.
- **Lo usa** [`handleUserAddress`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1221) (llama).

#### [`handleBusinessAddress`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L956) · callback React · asíncrona · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Valida y registra la dirección del negocio antes de mover el flujo al siguiente estado.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setEmailError`, `setJustCompletedRegistration`.
- **Efectos y APIs** `linkedDireccionIds.push`.
- **Condiciones que evalúa** `ausencia de placeId o ausencia de label`, `latValue o lngValue`, `ausencia de userId`, `userErr o ausencia de userRow`, `userRow.role`, `negErr o ausencia de negocioRow`, `sucErr`, `direccionId` y 12 más.
- **Contrato de datos** Auth `getSession` en [`useAuthActions.js:984`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L984), tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`select`) en [`useAuthActions.js:991`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L991), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`useAuthActions.js:991`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L991), tabla o vista [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) (`select`) en [`useAuthActions.js:1006`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1006), tabla o bucket [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) en [`useAuthActions.js:1006`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1006), tabla o vista [`sucursales`](../../../apps/referidos-app/supabase/migrations/20250227_000001_restore_sucursales_flags_verificacion.sql#L6) (`select`) en [`useAuthActions.js:1017`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1017), tabla o bucket [`sucursales`](../../../apps/referidos-app/supabase/migrations/20250227_000001_restore_sucursales_flags_verificacion.sql#L6) en [`useAuthActions.js:1017`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1017), tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) (`select`) en [`useAuthActions.js:1057`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1057), tabla o bucket [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) en [`useAuthActions.js:1057`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1057), tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) (`update`) en [`useAuthActions.js:1072`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1072), tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) (`insert + select`) en [`useAuthActions.js:1146`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1146), tabla o vista [`direcciones`](../../../apps/referidos-app/supabase/migrations/20250225_000001_direcciones_negocios_usuarios.sql#L6) (`insert`) en [`useAuthActions.js:1146`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1146), tabla o vista [`sucursales`](../../../apps/referidos-app/supabase/migrations/20250227_000001_restore_sucursales_flags_verificacion.sql#L6) (`update`) en [`useAuthActions.js:1168`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1168), tabla o vista [`sucursales`](../../../apps/referidos-app/supabase/migrations/20250227_000001_restore_sucursales_flags_verificacion.sql#L6) (`insert + select`) en [`useAuthActions.js:1183`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1183), tabla o vista [`sucursales`](../../../apps/referidos-app/supabase/migrations/20250227_000001_restore_sucursales_flags_verificacion.sql#L6) (`insert`) en [`useAuthActions.js:1183`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1183).
- **Usa código de** [`toTitleCaseEs`](../../../apps/referidos-app/src/utils/textCase.js#L17) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo), [`runValidateRegistration`](../../../apps/referidos-app/src/services/registrationClient.js#L4) (llama).
- **Llamadas directas en el cuerpo** [`setEmailError`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L957), [`trim`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L958), [`toTitleCaseEs`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L959), [`supabase.auth.getSession`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L984), [`maybeSingle`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L991), [`eq`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L991), [`select`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L991), [`supabase.from`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L991), [`order`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1017), [`allSucursales.find`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1029), [`toLowerCase`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1030), [`areDireccionesEqual`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1070) y 11 más.
- **Lo usa** [`handleUserAddress`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1224) (llama).

#### [`handleUserAddress`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1218) · callback React · asíncrona · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Maneja `User Address` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `role`.
- **Llamadas directas en el cuerpo** [`handleClientAddress`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1221), [`handleBusinessAddress`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1224).
- **Lo usa** [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1275) (referencia).

#### [`handleButtonBack`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1227) · callback React · dentro de [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L91)

Maneja `Button Back` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `step`, `role`.
- **Usa código de** [`AUTH_STEPS`](../../../apps/referidos-app/src/auth/constants/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`goToStep`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1230), [`goToEmailRegister`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1262).
- **Lo usa** [`useAuthActions`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L1287) (referencia).
