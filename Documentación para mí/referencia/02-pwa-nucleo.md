# PWA principal · Arranque, estado, autenticación y servicios

[Volver a la guía de la PWA](../02-pwa-principal.md) · [Índice general](../README.md)

Estos módulos convierten la URL y la sesión en una pantalla. Las mutaciones llaman a Supabase Auth, las tablas protegidas, RPC y Edge Functions. La vista de auth y el backend de onboarding se deben entender juntos.

113 archivos de `apps/referidos-app`. Las rutas de esta referencia se leen desde ese workspace. Los enlaces de importación y exportación se extraen del código actual y muestran las conexiones más cercanas a cada pieza.

## `src`

### [`App.jsx`](../../apps/referidos-app/src/App.jsx)

Coordina bootstrap y telemetría, monta los modales, captura fallos React y permite que Suspense cubra las rutas diferidas.

**Exporta** `default App`.

**Estado en el módulo** `usuario`, `bootstrap`.

**Se apoya en** [`./store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`./router/guards/pwaGuard`](../../apps/referidos-app/src/router/guards/pwaGuard.js), [`./routes`](../../apps/referidos-app/src/routes.jsx), [`./modals/ModalProvider`](../../apps/referidos-app/src/modals/ModalProvider.jsx), [`./hooks/useBootstrapAuth`](../../apps/referidos-app/src/hooks/useBootstrapAuth.js), [`./hooks/useAppLogger`](../../apps/referidos-app/src/hooks/useAppLogger.js), [`./components/errors/AppErrorBoundary`](../../apps/referidos-app/src/components/errors/AppErrorBoundary.jsx), [`./errors/ErrorRuntimeBridge`](../../apps/referidos-app/src/errors/ErrorRuntimeBridge.jsx).

**Lo importa** [`main.jsx`](../../apps/referidos-app/src/main.jsx).

### [`index.css`](../../apps/referidos-app/src/index.css)

Carga las capas CSS globales y reglas comunes de estilos y comportamiento visual de la aplicación.

**Lo importa** [`main.jsx`](../../apps/referidos-app/src/main.jsx).

**Reglas para ubicar cambios** `.no-scrollbar`, `.hide-scrollbar`, `.negocio-title-lines`, `.negocio-title-lines--collapse`, `.location-popover`, `.location-surface`, `.header-panel-surface`, `.location-text-reveal`.

### [`main.jsx`](../../apps/referidos-app/src/main.jsx)

Arranca React y BrowserRouter, carga estilos compartidos y registra el worker del plugin en hosts productivos.

**Se apoya en** `react-dom/client`, [`./App`](../../apps/referidos-app/src/App.jsx), [`./styles/carousel.css`](../../apps/referidos-app/src/styles/carousel.css), [`./styles/no-scrollbar.css`](../../apps/referidos-app/src/styles/no-scrollbar.css), `leaflet/dist/leaflet.css`, [`./index.css`](../../apps/referidos-app/src/index.css), `virtual:pwa-register`.

### [`routes.jsx`](../../apps/referidos-app/src/routes.jsx)

Declara el árbol navegable y enlaza guard, layout y pantalla. Usa las rutas de aquí para distinguir wrappers históricos y entradas vigentes.

**Exporta** `default AppRoutes`.

**Se apoya en** [`./router/guards/RequireAuth`](../../apps/referidos-app/src/router/guards/RequireAuth.jsx), [`./router/guards/RequireRole`](../../apps/referidos-app/src/router/guards/RequireRole.jsx), [`./cliente/layout/ClienteLayout`](../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx), [`./negocio/layout/NegocioLayout`](../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx), [`./cliente/views/ClienteInicioView`](../../apps/referidos-app/src/cliente/views/ClienteInicioView.jsx), [`./cliente/views/ClienteEscanerView`](../../apps/referidos-app/src/cliente/views/ClienteEscanerView.jsx), [`./cliente/views/ClienteHistorialView`](../../apps/referidos-app/src/cliente/views/ClienteHistorialView.jsx), [`./cliente/views/ClientePerfilView`](../../apps/referidos-app/src/cliente/views/ClientePerfilView.jsx), [`./negocio/views/NegocioInicioView`](../../apps/referidos-app/src/negocio/views/NegocioInicioView.jsx), [`./negocio/views/NegocioEscanerView`](../../apps/referidos-app/src/negocio/views/NegocioEscanerView.jsx) y 39 dependencias más del módulo.

**Lo importa** [`App.jsx`](../../apps/referidos-app/src/App.jsx).

## `src/auth`

### [`AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx)

Orquesta los pasos de acceso y registro. Cruza datos precargados, verificación, legal y estado de onboarding para escoger la vista y conectar cada acción.

**Exporta** `default AuthFlow`.

**Estado en el módulo** `systemFlags`, `showExitConfirm`, `usuario`, `onboarding`, `logout`, `bootstrapAuth`.

**Se apoya en** [`../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`./AuthView`](../../apps/referidos-app/src/auth/AuthView.jsx), [`./blocks/AuthBranderHeader`](../../apps/referidos-app/src/auth/blocks/AuthBranderHeader.jsx), [`./blocks/AuthFooter`](../../apps/referidos-app/src/auth/blocks/AuthFooter.jsx), [`./blocks/BackButton`](../../apps/referidos-app/src/auth/blocks/BackButton.jsx), [`./blocks/StepProgress`](../../apps/referidos-app/src/auth/blocks/StepProgress.jsx), [`./steps/EmailLoginStep`](../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx), [`./steps/EmailRegisterStep`](../../apps/referidos-app/src/auth/steps/EmailRegisterStep.jsx), [`./steps/WelcomeStep`](../../apps/referidos-app/src/auth/steps/WelcomeStep.jsx), [`./steps/UserProfileStep`](../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx) y 19 dependencias más del módulo.

**Lo importa** [`pages/AuthEntry.jsx`](../../apps/referidos-app/src/pages/AuthEntry.jsx).

### [`AuthView.jsx`](../../apps/referidos-app/src/auth/AuthView.jsx)

Construye el marco visual del flujo de autenticación y del paso que se inserta en él.

**Exporta** `default AuthView`.

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx).

## `src/auth/blocks`

### [`AuthBranderHeader.jsx`](../../apps/referidos-app/src/auth/blocks/AuthBranderHeader.jsx)

Pinta la cabecera de marca usada en los distintos pasos del flujo.

**Exporta** `default AuthBranderHeader`.

**Se apoya en** [`../constants/authCopy`](../../apps/referidos-app/src/auth/constants/authCopy.js).

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx).

### [`AuthCard.jsx`](../../apps/referidos-app/src/auth/blocks/AuthCard.jsx)

Define la tarjeta contenedora para formularios de acceso, con estilo y estructura comunes.

**Exporta** `default AuthCard`.

**Lo importa** [`auth/steps/EmailLoginStep.jsx`](../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx), [`auth/steps/EmailRegisterStep.jsx`](../../apps/referidos-app/src/auth/steps/EmailRegisterStep.jsx), [`auth/steps/ErrorStep.jsx`](../../apps/referidos-app/src/auth/steps/ErrorStep.jsx), [`auth/steps/OAuthCallbackStep.jsx`](../../apps/referidos-app/src/auth/steps/OAuthCallbackStep.jsx), [`auth/steps/PendingStep.jsx`](../../apps/referidos-app/src/auth/steps/PendingStep.jsx), [`auth/steps/WelcomeStep.jsx`](../../apps/referidos-app/src/auth/steps/WelcomeStep.jsx).

### [`AuthFooter.jsx`](../../apps/referidos-app/src/auth/blocks/AuthFooter.jsx)

Coloca el pie común de autenticación y sus opciones de navegación.

**Exporta** `default AuthFooter`.

**Se apoya en** [`../constants/authCopy`](../../apps/referidos-app/src/auth/constants/authCopy.js).

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx).

### [`AuthHeader.jsx`](../../apps/referidos-app/src/auth/blocks/AuthHeader.jsx)

Presenta introducción y título por etapa del acceso.

**Exporta** `default AuthHeader`.

**Lo importa** [`auth/steps/WelcomeStep.jsx`](../../apps/referidos-app/src/auth/steps/WelcomeStep.jsx).

### [`AuthTabs.jsx`](../../apps/referidos-app/src/auth/blocks/AuthTabs.jsx)

Alterna las opciones de acceso y registro con una misma composición.

**Exporta** `default AuthTabs`.

**Lo importa** [`auth/steps/EmailLoginStep.jsx`](../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx), [`auth/steps/EmailRegisterStep.jsx`](../../apps/referidos-app/src/auth/steps/EmailRegisterStep.jsx).

### [`BackButton.jsx`](../../apps/referidos-app/src/auth/blocks/BackButton.jsx)

Expone el control visual de retroceso para que la pantalla conecte su propia transición.

**Exporta** `default BackButton`.

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx).

### [`ContactPhoneBlock.jsx`](../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx)

Muestra la entrada de teléfono y su estado de validación. El hook asociado lleva la lógica.

**Exporta** `default ContactPhoneBlock`.

**Se apoya en** [`../hooks/useContactPhone`](../../apps/referidos-app/src/auth/hooks/useContactPhone.js).

**Lo importa** [`auth/steps/AccountVerifyStep.jsx`](../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx), [`auth/steps/BusinessVerifyStep.jsx`](../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx).

### [`EmailPasswordForm.jsx`](../../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx)

Reutiliza campos, errores y entrega de credenciales entre las variantes del formulario.

**Exporta** `default EmailPasswordForm`.

**Lo importa** [`auth/steps/EmailLoginStep.jsx`](../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx), [`auth/steps/EmailRegisterStep.jsx`](../../apps/referidos-app/src/auth/steps/EmailRegisterStep.jsx).

### [`EmailVerificationBlock.jsx`](../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx)

Compone el mensaje y controles de comprobación de correo. La operación de Auth vive en el hook.

**Exporta** `default EmailVerificationBlock`.

**Se apoya en** [`../hooks/useEmailVerification`](../../apps/referidos-app/src/auth/hooks/useEmailVerification.js).

**Lo importa** [`auth/steps/AccountVerifyStep.jsx`](../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx), [`auth/steps/VerifyEmailStep.jsx`](../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx), [`components/modals/ModalEmailVerification.jsx`](../../apps/referidos-app/src/components/modals/ModalEmailVerification.jsx).

### [`ErrorBanner.jsx`](../../apps/referidos-app/src/auth/blocks/ErrorBanner.jsx)

Muestra errores del paso de auth en un lugar común sin replicar las transiciones.

**Exporta** `default ErrorBanner`.

**Lo importa** [`auth/steps/BusinessDataStep.jsx`](../../apps/referidos-app/src/auth/steps/BusinessDataStep.jsx), [`auth/steps/EmailLoginStep.jsx`](../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx), [`auth/steps/EmailRegisterStep.jsx`](../../apps/referidos-app/src/auth/steps/EmailRegisterStep.jsx), [`auth/steps/UserAddressStep.jsx`](../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx), [`auth/steps/UserProfileStep.jsx`](../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx), [`auth/steps/WelcomeStep.jsx`](../../apps/referidos-app/src/auth/steps/WelcomeStep.jsx).

### [`OAuthButtons.jsx`](../../apps/referidos-app/src/auth/blocks/OAuthButtons.jsx)

Presenta los proveedores de acceso y delega el inicio del flujo a los handlers.

**Exporta** `default OAuthButtons`.

**Lo importa** [`auth/steps/WelcomeStep.jsx`](../../apps/referidos-app/src/auth/steps/WelcomeStep.jsx).

### [`PasswordSetupBlock.jsx`](../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx)

Dibuja entradas y requisitos de preparación de contraseña reutilizables entre pasos.

**Exporta** `default PasswordSetupBlock`.

**Estado en el módulo** `showMatchMessage`.

**Se apoya en** [`../hooks/usePasswordAccess`](../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js).

**Lo importa** [`auth/steps/AccountVerifyStep.jsx`](../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx), [`auth/steps/AddPasswordStep.jsx`](../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx).

### [`RoleCard.jsx`](../../apps/referidos-app/src/auth/blocks/RoleCard.jsx)

Representa cada opción de registro por rol y entrega la selección al flujo.

**Exporta** `default RoleCard`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`StepProgress.jsx`](../../apps/referidos-app/src/auth/blocks/StepProgress.jsx)

Representa avance de onboarding para dar contexto al usuario entre pantallas.

**Exporta** `default StepProgress`.

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx).

## `src/auth/constants`

### [`authCopy.js`](../../apps/referidos-app/src/auth/constants/authCopy.js)

Catálogo central de textos del flujo. Modifica aquí etiquetas y mensajes que comparten pasos.

**Exporta** `AUTH_BRAND`.

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx), [`auth/blocks/AuthBranderHeader.jsx`](../../apps/referidos-app/src/auth/blocks/AuthBranderHeader.jsx), [`auth/blocks/AuthFooter.jsx`](../../apps/referidos-app/src/auth/blocks/AuthFooter.jsx).

### [`authRoles.js`](../../apps/referidos-app/src/auth/constants/authRoles.js)

Identificadores de roles usados en selección y ramas de onboarding.

**Exporta** `AUTH_ROLES`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`authSteps.js`](../../apps/referidos-app/src/auth/constants/authSteps.js)

Identificadores de paso para reanudar registro y renderizar la pantalla correcta a partir del estado.

**Exporta** `AUTH_STEPS`, `AUTH_FORM_STEPS`.

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx), [`auth/hooks/useAuthActions.js`](../../apps/referidos-app/src/auth/hooks/useAuthActions.js), [`auth/hooks/useAuthFlow.js`](../../apps/referidos-app/src/auth/hooks/useAuthFlow.js), [`auth/hooks/useAuthPrefill.js`](../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js).

### [`businessCategories.js`](../../apps/referidos-app/src/auth/constants/businessCategories.js)

Catálogo de actividad de negocio que alimenta el selector de categoría.

**Exporta** `BUSINESS_CATEGORIES`, `BUSINESS_SUBCATEGORIES`, `getBusinessCategoryPath`.

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx).

## `src/auth/hooks`

### [`useAuthActions.js`](../../apps/referidos-app/src/auth/hooks/useAuthActions.js)

Realiza las acciones del flujo. Maneja alta y acceso por email u OAuth, crea perfiles, valida códigos, persiste datos y conduce el avance.

**Exporta** `default useAuthActions`.

**Acceso directo** tabla o vista `usuarios`, `supabase.auth.getSession`, Edge `validate-registration-code`, `supabase.auth.signUp`, tabla o vista `negocios`, tabla o vista `direcciones`, tabla o vista `sucursales`.

**Estado en el módulo** `login`, `bootstrapAuth`, `setJustCompletedRegistration`, `usuario`.

**Se apoya en** [`../../utils/validators`](../../apps/referidos-app/src/utils/validators.js), [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../../services/authService`](../../apps/referidos-app/src/services/authService.js), [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`../../utils/googleOneTap`](../../apps/referidos-app/src/utils/googleOneTap.js), [`../constants/authSteps`](../../apps/referidos-app/src/auth/constants/authSteps.js), [`../utils/userProfileUtils`](../../apps/referidos-app/src/auth/utils/userProfileUtils.js), [`../utils/businessDataUtils`](../../apps/referidos-app/src/auth/utils/businessDataUtils.js), [`../../services/registrationClient`](../../apps/referidos-app/src/services/registrationClient.js), [`../../services/loggingClient`](../../apps/referidos-app/src/services/loggingClient.js) y 2 dependencias más del módulo.

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx).

### [`useAuthFlow.js`](../../apps/referidos-app/src/auth/hooks/useAuthFlow.js)

Mantiene el estado de formularios, paso actual y mediciones de transición. Expone las referencias y setters que usa AuthFlow.

**Exporta** `default useAuthFlow`.

**Estado en el módulo** `cardHeight`, `sliderHeight`, `animating`, `step`, `emailError`, `welcomeError`.

**Se apoya en** [`../constants/authSteps`](../../apps/referidos-app/src/auth/constants/authSteps.js).

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx).

### [`useAuthPrefill.js`](../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js)

Transforma el usuario y onboarding existentes en valores iniciales para evitar pedir datos por segunda vez.

**Exporta** `default useAuthPrefill`.

**Acceso directo** tabla o vista `direcciones`, tabla o vista `negocios`, tabla o vista `sucursales`.

**Se apoya en** [`../constants/authSteps`](../../apps/referidos-app/src/auth/constants/authSteps.js), [`../utils/authMappers`](../../apps/referidos-app/src/auth/utils/authMappers.js), [`../utils/userProfileUtils`](../../apps/referidos-app/src/auth/utils/userProfileUtils.js), [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js).

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx).

### [`useContactPhone.js`](../../apps/referidos-app/src/auth/hooks/useContactPhone.js)

Controla entrada, normalización y validación del teléfono de contacto.

**Exporta** `default useContactPhone`.

**Estado en el módulo** `editingPhone`, `dropdownOpen`, `phoneConfirmed`, `phoneMessage`, `phoneError`, `savingPhone`.

**Lo importa** [`auth/blocks/ContactPhoneBlock.jsx`](../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx).

### [`useEmailVerification.js`](../../apps/referidos-app/src/auth/hooks/useEmailVerification.js)

Coordina la solicitud y comprobación de verificación de correo y el estado de la pantalla mientras espera.

**Exporta** `default useEmailVerification`.

**Acceso directo** `supabase.auth.getUser`, `supabase.auth.resend`.

**Estado en el módulo** `emailValue`, `editingEmail`, `message`, `error`, `sending`, `emailSent`.

**Se apoya en** [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js).

**Lo importa** [`auth/blocks/EmailVerificationBlock.jsx`](../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx).

### [`useLocationStep.js`](../../apps/referidos-app/src/auth/hooks/useLocationStep.js)

Coordina territorio, búsqueda de dirección, mapa y posición para completar la ubicación de cliente o negocio.

**Exporta** `default useLocationStep`.

**Estado en el módulo** `permissionState`, `geoAttempted`, `geoErrorCode`, `isRequestingLocation`.

**Se apoya en** [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js), [`../../services/gpsFallbackClient`](../../apps/referidos-app/src/services/gpsFallbackClient.js).

**Lo importa** [`auth/steps/UserAddressStep.jsx`](../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx).

### [`usePasswordAccess.js`](../../apps/referidos-app/src/auth/hooks/usePasswordAccess.js)

Coordina la activación y comprobación de contraseña y su relación con acceso local.

**Exporta** `default usePasswordAccess`.

**Acceso directo** Edge `set-password`, `supabase.auth.getSession`, tabla o vista `usuarios`.

**Estado en el módulo** `passwordMode`, `passwordValue`, `passwordConfirm`, `currentPassword`, `passwordAttempted`, `passwordEnabled`.

**Se apoya en** [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js).

**Lo importa** [`auth/blocks/PasswordSetupBlock.jsx`](../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx), [`components/modals/ModalForcePasswordChange.jsx`](../../apps/referidos-app/src/components/modals/ModalForcePasswordChange.jsx).

### [`useRegisterPasswordUI.js`](../../apps/referidos-app/src/auth/hooks/useRegisterPasswordUI.js)

Organiza la presentación de requisitos, visibilidad y estado de contraseña en registro.

**Exporta** `default useRegisterPasswordUI`.

**Estado en el módulo** `focusedField`.

**Lo importa** [`auth/steps/EmailRegisterStep.jsx`](../../apps/referidos-app/src/auth/steps/EmailRegisterStep.jsx).

## `src/auth/steps`

### [`AccountVerifyMethodStep.jsx`](../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx)

Permite elegir con qué mecanismos completar el acceso y pasar a configurar contraseña o segundo factor.

**Exporta** `default AccountVerifyMethodStep`.

**Acceso directo** `supabase.auth.getSession`, tabla o vista `usuarios`.

**Estado en el módulo** `error`, `saving`, `bootstrapAuth`.

**Se apoya en** [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js).

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx).

### [`AccountVerifyPrompt.jsx`](../../apps/referidos-app/src/auth/steps/AccountVerifyPrompt.jsx)

Introduce la verificación y presenta si el usuario puede posponerla en ese punto.

**Exporta** `default AccountVerifyPrompt`.

**Acceso directo** `supabase.auth.getSession`, tabla o vista `usuarios`.

**Estado en el módulo** `saving`, `error`, `bootstrapAuth`.

**Se apoya en** [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js).

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx).

### [`AccountVerifyReadyStep.jsx`](../../apps/referidos-app/src/auth/steps/AccountVerifyReadyStep.jsx)

Muestra el estado final de preparación de la cuenta y ofrece continuar a la app.

**Exporta** `default AccountVerifyReadyStep`.

**Acceso directo** `supabase.auth.getSession`, tabla o vista `usuarios`.

**Estado en el módulo** `acceptTerms`, `acceptPrivacy`, `saving`, `error`, `bootstrapAuth`.

**Se apoya en** [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js).

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx).

### [`AccountVerifyStep.jsx`](../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx)

Presenta el paso de verificación de cuenta dentro del flujo.

**Exporta** `default AccountVerifyStep`.

**Acceso directo** `supabase.auth.getUser`, `supabase.auth.getSession`, tabla o vista `usuarios`, tabla o vista `negocios`.

**Estado en el módulo** `currentScreen`, `savingRuc`, `phoneConfirmed`, `rucValue`, `rucConfirmed`, `editingRuc`, `bootstrapAuth`.

**Se apoya en** [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../../utils/validators`](../../apps/referidos-app/src/utils/validators.js), [`../blocks/ContactPhoneBlock`](../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx), [`../blocks/EmailVerificationBlock`](../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx), [`../blocks/PasswordSetupBlock`](../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`AddPasswordStep.jsx`](../../apps/referidos-app/src/auth/steps/AddPasswordStep.jsx)

Permite habilitar el acceso con contraseña como parte del alta o verificación.

**Exporta** `default AddPasswordStep`.

**Acceso directo** `supabase.auth.getSession`, tabla o vista `usuarios`.

**Estado en el módulo** `passwordSave`, `skipError`, `bootstrapAuth`.

**Se apoya en** [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../blocks/PasswordSetupBlock`](../../apps/referidos-app/src/auth/blocks/PasswordSetupBlock.jsx).

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx).

### [`AddTwoFAStep.jsx`](../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx)

Presenta el paso para incorporar un segundo factor durante onboarding.

**Exporta** `default AddTwoFAStep`.

**Estado en el módulo** `loading`, `enrollError`, `mode`, `factorId`, `qrCode`, `qrUri`.

**Se apoya en** `react-qr-code`, [`../../services/mfaService`](../../apps/referidos-app/src/services/mfaService.js).

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx).

### [`BusinessCategoryStep.jsx`](../../apps/referidos-app/src/auth/steps/BusinessCategoryStep.jsx)

Muestra los rubros que puede elegir un negocio y devuelve la selección a sus datos principales.

**Exporta** `default BusinessCategoryStep`.

**Estado en el módulo** `selectedParent`, `selectedSub`.

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx).

### [`BusinessDataStep.jsx`](../../apps/referidos-app/src/auth/steps/BusinessDataStep.jsx)

Captura los datos comerciales del negocio mediante el estado y las validaciones del flujo.

**Exporta** `default BusinessDataStep`.

**Se apoya en** [`../blocks/ErrorBanner`](../../apps/referidos-app/src/auth/blocks/ErrorBanner.jsx), [`../utils/businessDataUtils`](../../apps/referidos-app/src/auth/utils/businessDataUtils.js).

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx).

### [`BusinessVerifyStep.jsx`](../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx)

Presenta el flujo de verificación de negocio y sus datos de contacto e identificación.

**Exporta** `default BusinessVerifyStep`.

**Acceso directo** `supabase.auth.getUser`, `supabase.auth.getSession`, tabla o vista `usuarios`, tabla o vista `negocios`.

**Estado en el módulo** `savingRuc`, `phoneConfirmed`, `rucValue`, `rucConfirmed`, `editingRuc`, `rucError`, `bootstrapAuth`.

**Se apoya en** [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../../utils/validators`](../../apps/referidos-app/src/utils/validators.js), [`../blocks/ContactPhoneBlock`](../../apps/referidos-app/src/auth/blocks/ContactPhoneBlock.jsx).

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx).

### [`EmailLoginStep.jsx`](../../apps/referidos-app/src/auth/steps/EmailLoginStep.jsx)

Presenta el acceso por correo y contraseña y entrega las credenciales al flujo.

**Exporta** `default EmailLoginStep`.

**Se apoya en** [`../blocks/AuthCard`](../../apps/referidos-app/src/auth/blocks/AuthCard.jsx), [`../blocks/AuthTabs`](../../apps/referidos-app/src/auth/blocks/AuthTabs.jsx), [`../blocks/EmailPasswordForm`](../../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx), [`../blocks/ErrorBanner`](../../apps/referidos-app/src/auth/blocks/ErrorBanner.jsx).

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx).

### [`EmailRegisterStep.jsx`](../../apps/referidos-app/src/auth/steps/EmailRegisterStep.jsx)

Presenta el alta por correo, sus requisitos y validación de credenciales.

**Exporta** `default EmailRegisterStep`.

**Se apoya en** [`../blocks/AuthCard`](../../apps/referidos-app/src/auth/blocks/AuthCard.jsx), [`../blocks/AuthTabs`](../../apps/referidos-app/src/auth/blocks/AuthTabs.jsx), [`../blocks/EmailPasswordForm`](../../apps/referidos-app/src/auth/blocks/EmailPasswordForm.jsx), [`../blocks/ErrorBanner`](../../apps/referidos-app/src/auth/blocks/ErrorBanner.jsx), [`../hooks/useRegisterPasswordUI`](../../apps/referidos-app/src/auth/hooks/useRegisterPasswordUI.js).

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx).

### [`EmailVerifyStep.jsx`](../../apps/referidos-app/src/auth/steps/EmailVerifyStep.jsx)

Compone el paso de verificación de correo con su estado y callbacks de auth.

**Exporta** `default AccountVerifyStep`.

**Acceso directo** `supabase.auth.resend`, `supabase.auth.getSession`, tabla o vista `usuarios`.

**Estado en el módulo** `message`, `error`, `sending`, `saving`, `editingPhone`, `editingEmail`.

**Se apoya en** [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js), [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`ErrorStep.jsx`](../../apps/referidos-app/src/auth/steps/ErrorStep.jsx)

Da un estado y una acción de salida para un fallo del flujo.

**Exporta** `default ErrorStep`.

**Se apoya en** [`../blocks/AuthCard`](../../apps/referidos-app/src/auth/blocks/AuthCard.jsx).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`OAuthCallbackStep.jsx`](../../apps/referidos-app/src/auth/steps/OAuthCallbackStep.jsx)

Presenta el estado de regreso desde el proveedor de OAuth mientras la app resuelve el resultado.

**Exporta** `default OAuthCallbackStep`.

**Se apoya en** [`../blocks/AuthCard`](../../apps/referidos-app/src/auth/blocks/AuthCard.jsx).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`PendingStep.jsx`](../../apps/referidos-app/src/auth/steps/PendingStep.jsx)

Presenta el estado pendiente cuando el flujo aún no puede continuar.

**Exporta** `default PendingStep`.

**Se apoya en** [`../blocks/AuthCard`](../../apps/referidos-app/src/auth/blocks/AuthCard.jsx).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`RoleSelectStep.jsx`](../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx)

Ofrece la elección entre cliente y negocio durante el alta.

**Exporta** `default RoleSelectStep`.

**Estado en el módulo** `selected`, `mounted`, `persisting`, `showCodeModal`, `codigo`, `codigoError`.

**Se apoya en** [`../../utils/validators`](../../apps/referidos-app/src/utils/validators.js).

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx).

### [`UserAddressStep.jsx`](../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx)

Monta los controles de búsqueda, mapa y territorio para completar la dirección.

**Exporta** `default UserAddressStep`.

**Estado en el módulo** `stage`, `searchValue`, `selectedSearchItem`, `isSearching`, `searchError`, `hasSearched`.

**Se apoya en** [`../blocks/ErrorBanner`](../../apps/referidos-app/src/auth/blocks/ErrorBanner.jsx), [`../../services/addressSearchClient`](../../apps/referidos-app/src/services/addressSearchClient.js), [`../../services/addressReverseClient`](../../apps/referidos-app/src/services/addressReverseClient.js), [`../../services/gpsFallbackClient`](../../apps/referidos-app/src/services/gpsFallbackClient.js), [`../../services/territoryClient`](../../apps/referidos-app/src/services/territoryClient.js), [`../../components/maps/LeafletMapPicker`](../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx), [`../../search/auth/AddressStepSearch`](../../apps/referidos-app/src/search/auth/AddressStepSearch.jsx), [`../../utils/textCase`](../../apps/referidos-app/src/utils/textCase.js), [`../hooks/useLocationStep`](../../apps/referidos-app/src/auth/hooks/useLocationStep.js), [`../../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js).

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx).

### [`UserProfileStep.jsx`](../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx)

Captura los datos personales según el rol y la fase del alta.

**Exporta** `default UserProfileStep`.

**Se apoya en** [`../blocks/ErrorBanner`](../../apps/referidos-app/src/auth/blocks/ErrorBanner.jsx), [`../utils/userProfileUtils`](../../apps/referidos-app/src/auth/utils/userProfileUtils.js).

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx).

### [`VerifyEmailStep.jsx`](../../apps/referidos-app/src/auth/steps/VerifyEmailStep.jsx)

Muestra la variante de confirmación de correo que monta el paso VERIFY_EMAIL.

**Exporta** `default VerifyEmailStep`.

**Acceso directo** `supabase.auth.getUser`, `supabase.auth.getSession`, tabla o vista `usuarios`.

**Estado en el módulo** `emailValue`, `error`, `saving`, `acceptsUpdates`, `bootstrapAuth`.

**Se apoya en** [`../../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../blocks/EmailVerificationBlock`](../../apps/referidos-app/src/auth/blocks/EmailVerificationBlock.jsx).

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx).

### [`WelcomeStep.jsx`](../../apps/referidos-app/src/auth/steps/WelcomeStep.jsx)

Expone las opciones iniciales de acceso y alta que disparan AuthFlow.

**Exporta** `default WelcomeStep`.

**Se apoya en** [`../blocks/AuthCard`](../../apps/referidos-app/src/auth/blocks/AuthCard.jsx), [`../blocks/AuthHeader`](../../apps/referidos-app/src/auth/blocks/AuthHeader.jsx), [`../blocks/ErrorBanner`](../../apps/referidos-app/src/auth/blocks/ErrorBanner.jsx), [`../blocks/OAuthButtons`](../../apps/referidos-app/src/auth/blocks/OAuthButtons.jsx).

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx).

## `src/auth/utils`

### [`authMappers.js`](../../apps/referidos-app/src/auth/utils/authMappers.js)

Transforma la respuesta de onboarding al estado de pasos y vista.

**Exporta** `splitDireccion`, `mapNegocioPrefill`, `mapClientePrefill`.

**Lo importa** [`auth/hooks/useAuthPrefill.js`](../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js).

### [`businessDataUtils.js`](../../apps/referidos-app/src/auth/utils/businessDataUtils.js)

Agrupa transformaciones y comprobaciones de los campos comerciales.

**Exporta** `BUSINESS_NAME_MAX`, `normalizeBusinessName`, `normalizeBusinessRuc`, `getBusinessDataStatus`.

**Lo importa** [`auth/hooks/useAuthActions.js`](../../apps/referidos-app/src/auth/hooks/useAuthActions.js), [`auth/steps/BusinessDataStep.jsx`](../../apps/referidos-app/src/auth/steps/BusinessDataStep.jsx).

### [`userProfileUtils.js`](../../apps/referidos-app/src/auth/utils/userProfileUtils.js)

Agrupa transformaciones y validación de identificación y datos personales.

**Exporta** `USER_NAME_MAX`, `normalizeUserName`, `formatBirthdateInput`, `parseBirthdate`, `getBirthdateStatus`, `formatBirthdateForInput`, `buildBirthdateISO`, `getUserProfileStatus`.

**Lo importa** [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx), [`auth/hooks/useAuthActions.js`](../../apps/referidos-app/src/auth/hooks/useAuthActions.js), [`auth/hooks/useAuthPrefill.js`](../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js), [`auth/steps/UserProfileStep.jsx`](../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx).

## `src/cache`

### [`cacheKeys.js`](../../apps/referidos-app/src/cache/cacheKeys.js)

Fija identificadores por rol y pantalla para que el layout, la ruta y la restauración de scroll usen las mismas claves.

**Exporta** `CACHE_KEYS`.

**Lo importa** [`cliente/base/ClienteEscanerBase.jsx`](../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx), [`cliente/historial/HistorialView.jsx`](../../apps/referidos-app/src/cliente/historial/HistorialView.jsx), [`cliente/inicio/ClienteInicio.jsx`](../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx), [`cliente/layout/ClienteLayout.jsx`](../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx), [`cliente/views/ClienteEscanerView.jsx`](../../apps/referidos-app/src/cliente/views/ClienteEscanerView.jsx), [`cliente/views/ClienteHistorialView.jsx`](../../apps/referidos-app/src/cliente/views/ClienteHistorialView.jsx), [`cliente/views/ClienteInicioView.jsx`](../../apps/referidos-app/src/cliente/views/ClienteInicioView.jsx) y 11 módulos más.

### [`CacheOutlet.jsx`](../../apps/referidos-app/src/cache/CacheOutlet.jsx)

Renderiza todos los elementos registrados del rol y oculta las vistas que no son la pestaña activa.

**Exporta** `default CacheOutlet`.

**Estado en el módulo** `order`, `views`, `activeKey`.

**Se apoya en** [`./cacheStore`](../../apps/referidos-app/src/cache/cacheStore.js).

**Lo importa** [`cliente/layout/ClienteLayout.jsx`](../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx), [`negocio/layout/NegocioLayout.jsx`](../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx).

### [`cacheStore.js`](../../apps/referidos-app/src/cache/cacheStore.js)

Conserva elementos montados, orden, clave activa, precarga y scroll por rol. Permite limpiar la vista al terminar la sesión.

**Exporta** `useCacheStore`.

**Se apoya en** `zustand`.

**Lo importa** [`cache/CacheOutlet.jsx`](../../apps/referidos-app/src/cache/CacheOutlet.jsx), [`cache/CacheView.jsx`](../../apps/referidos-app/src/cache/CacheView.jsx), [`cliente/base/ClienteEscanerBase.jsx`](../../apps/referidos-app/src/cliente/base/ClienteEscanerBase.jsx), [`cliente/historial/HistorialView.jsx`](../../apps/referidos-app/src/cliente/historial/HistorialView.jsx), [`cliente/inicio/ClienteInicio.jsx`](../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx), [`cliente/layout/ClienteLayout.jsx`](../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx), [`negocio/base/NegocioEscanerBase.jsx`](../../apps/referidos-app/src/negocio/base/NegocioEscanerBase.jsx) y 6 módulos más.

### [`CacheView.jsx`](../../apps/referidos-app/src/cache/CacheView.jsx)

Fija la pestaña activa cuando se monta la ruta. Si el scope aún no estaba precargado, puede redirigir a la pestaña de inicio configurada. Devuelve null y el layout monta los componentes.

**Exporta** `default CacheView`.

**Estado en el módulo** `setActive`, `preloaded`.

**Se apoya en** [`./cacheStore`](../../apps/referidos-app/src/cache/cacheStore.js).

**Lo importa** [`cliente/views/ClienteEscanerView.jsx`](../../apps/referidos-app/src/cliente/views/ClienteEscanerView.jsx), [`cliente/views/ClienteHistorialView.jsx`](../../apps/referidos-app/src/cliente/views/ClienteHistorialView.jsx), [`cliente/views/ClienteInicioView.jsx`](../../apps/referidos-app/src/cliente/views/ClienteInicioView.jsx), [`cliente/views/ClientePerfilView.jsx`](../../apps/referidos-app/src/cliente/views/ClientePerfilView.jsx), [`negocio/views/NegocioEscanerView.jsx`](../../apps/referidos-app/src/negocio/views/NegocioEscanerView.jsx), [`negocio/views/NegocioGestionarView.jsx`](../../apps/referidos-app/src/negocio/views/NegocioGestionarView.jsx), [`negocio/views/NegocioInicioView.jsx`](../../apps/referidos-app/src/negocio/views/NegocioInicioView.jsx) y 1 módulos más.

## `src/components/errors`

### [`AppErrorBoundary.jsx`](../../apps/referidos-app/src/components/errors/AppErrorBoundary.jsx)

Captura errores lanzados por el render React para registrar el fallo y mostrar una recuperación de interfaz.

**Exporta** `default AppErrorBoundary`.

**Se apoya en** [`../../services/loggingClient`](../../apps/referidos-app/src/services/loggingClient.js).

**Lo importa** [`App.jsx`](../../apps/referidos-app/src/App.jsx).

## `src/config`

### [`runtimeConfig.js`](../../apps/referidos-app/src/config/runtimeConfig.js)

Normaliza la configuración de ventana y variables Vite para que cada artefacto pueda señalar a su propio runtime.

**Exporta** `runtimeConfig`, `getRuntimeConfig`.

**Lo importa** [`admin/layout/AdminTopbar.jsx`](../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx), [`auth/hooks/useAuthActions.js`](../../apps/referidos-app/src/auth/hooks/useAuthActions.js), [`components/maps/LeafletMapPicker.jsx`](../../apps/referidos-app/src/components/maps/LeafletMapPicker.jsx), [`lib/supabaseClient.js`](../../apps/referidos-app/src/lib/supabaseClient.js), [`profile/shared/blocks/SupportChatHubBlock.jsx`](../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx), [`services/authService.js`](../../apps/referidos-app/src/services/authService.js), [`services/loggingClient.js`](../../apps/referidos-app/src/services/loggingClient.js) y 1 módulos más.

## `src/constants`

### [`branding.js`](../../apps/referidos-app/src/constants/branding.js)

Define referencias de marca que usan pantallas comunes para mantener nombres y activos alineados.

**Exporta** `COLORS`, `ROUTES`.

**Lo importa** [`pages/PromoDetalle.jsx`](../../apps/referidos-app/src/pages/PromoDetalle.jsx).

## `src/errors`

### [`ErrorRuntimeBridge.jsx`](../../apps/referidos-app/src/errors/ErrorRuntimeBridge.jsx)

Conecta el bus de errores y decisiones de política con acciones de UI y modales.

**Exporta** `default ErrorRuntimeBridge`.

**Se apoya en** [`../services/errorPolicyService`](../../apps/referidos-app/src/services/errorPolicyService.js), [`../services/loggingClient`](../../apps/referidos-app/src/services/loggingClient.js).

**Lo importa** [`App.jsx`](../../apps/referidos-app/src/App.jsx).

## `src/hooks`

### [`useAppLogger.js`](../../apps/referidos-app/src/hooks/useAppLogger.js)

Inicializa el cliente de observabilidad web y sincroniza el contexto conforme cambian ruta o usuario.

**Exporta** `default useAppLogger`.

**Estado en el módulo** `usuario`, `onboarding`.

**Se apoya en** [`../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../services/loggingClient`](../../apps/referidos-app/src/services/loggingClient.js).

**Lo importa** [`App.jsx`](../../apps/referidos-app/src/App.jsx).

### [`useAutoCarousel.js`](../../apps/referidos-app/src/hooks/useAutoCarousel.js)

Coordina el avance automático de un carrusel y la pausa de la animación.

**Exporta** `useAutoCarousel`.

**Lo importa** [`components/sections/PromoSection.jsx`](../../apps/referidos-app/src/components/sections/PromoSection.jsx).

### [`useBootstrapAuth.js`](../../apps/referidos-app/src/hooks/useBootstrapAuth.js)

Arranca la acción bootstrapAuth del store al montar y expone estado de arranque al llamador.

**Exporta** `useBootstrapAuth`, `default useBootstrapAuth`.

**Estado en el módulo** `bootstrap`, `usuario`, `error`, `bootstrapAuth`.

**Se apoya en** [`../store/appStore`](../../apps/referidos-app/src/store/appStore.js).

**Lo importa** [`App.jsx`](../../apps/referidos-app/src/App.jsx).

### [`useCarousel.js`](../../apps/referidos-app/src/hooks/useCarousel.js)

Agrupa navegación y estado reutilizable de carrusel para que la pantalla no replique sus cálculos.

**Exporta** `useCarousel`.

**Estado en el módulo** `canLeft`, `canRight`.

**Lo importa** [`components/sections/PromoSection.jsx`](../../apps/referidos-app/src/components/sections/PromoSection.jsx).

### [`useMfaGate.js`](../../apps/referidos-app/src/hooks/useMfaGate.js)

Determina si el TOTP presente bloquea la acción o la ruta y coordina la presentación del modal de verificación.

**Exporta** `default useMfaGate`.

**Estado en el módulo** `checking`, `required`, `usuario`, `bootstrap`, `logout`.

**Se apoya en** [`../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js), [`../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../services/mfaService`](../../apps/referidos-app/src/services/mfaService.js).

**Lo importa** [`pages/AppGate.jsx`](../../apps/referidos-app/src/pages/AppGate.jsx), [`router/guards/RequireAuth.jsx`](../../apps/referidos-app/src/router/guards/RequireAuth.jsx).

### [`usePinSetup.js`](../../apps/referidos-app/src/hooks/usePinSetup.js)

Controla alta o reemplazo de PIN, validación de interfaz y almacenamiento de su hash.

**Exporta** `default usePinSetup`.

**Estado en el módulo** `pinValue`, `pinFirst`, `pinStep`, `pinReveal`, `saving`, `error`.

**Lo importa** [`components/modals/ModalAccessMethods.jsx`](../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx), [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx).

### [`usePromoSearch.js`](../../apps/referidos-app/src/hooks/usePromoSearch.js)

Filtra el listado en memoria por texto y características elegidas en la interfaz.

**Exporta** `usePromoSearch`.

**Lo importa** [`cliente/inicio/ClienteInicio.jsx`](../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx).

### [`useSearchDock.js`](../../apps/referidos-app/src/hooks/useSearchDock.js)

Coordina apertura y estado de los controles de búsqueda puestos en una barra de interfaz.

**Exporta** `useSearchDock`.

**Estado en el módulo** `docked`, `heroVisible`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

## `src/landing`

### [`LandingPage.jsx`](../../apps/referidos-app/src/landing/LandingPage.jsx)

Monta la landing interna de la PWA accesible por /inicio, con secciones y llamadas a la acción propias.

**Exporta** `default LandingPage`.

**Estado en el módulo** `role`.

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

## `src/legal/blocks`

### [`LegalContent.jsx`](../../apps/referidos-app/src/legal/blocks/LegalContent.jsx)

Renderiza el contenido de los documentos legales dentro del esquema visual común.

**Exporta** `default`.

**Se apoya en** `@referidos/legal-content`.

**Lo importa** [`legal/index.js`](../../apps/referidos-app/src/legal/index.js), [`legal/LegalRouter.jsx`](../../apps/referidos-app/src/legal/LegalRouter.jsx), [`legal/pages/DataDeletionPage.jsx`](../../apps/referidos-app/src/legal/pages/DataDeletionPage.jsx), [`legal/pages/PrivacyPage.jsx`](../../apps/referidos-app/src/legal/pages/PrivacyPage.jsx), [`legal/pages/TermsPage.jsx`](../../apps/referidos-app/src/legal/pages/TermsPage.jsx).

### [`LegalFooter.jsx`](../../apps/referidos-app/src/legal/blocks/LegalFooter.jsx)

Muestra los enlaces de pie de la sección legal.

**Exporta** `default LegalFooter`.

**Lo importa** [`legal/index.js`](../../apps/referidos-app/src/legal/index.js), [`legal/LegalLayout.jsx`](../../apps/referidos-app/src/legal/LegalLayout.jsx).

### [`LegalHeader.jsx`](../../apps/referidos-app/src/legal/blocks/LegalHeader.jsx)

Muestra el encabezado común y guía el regreso desde la sección legal.

**Exporta** `default LegalHeader`.

**Lo importa** [`legal/index.js`](../../apps/referidos-app/src/legal/index.js), [`legal/LegalLayout.jsx`](../../apps/referidos-app/src/legal/LegalLayout.jsx).

## `src/legal`

### [`index.js`](../../apps/referidos-app/src/legal/index.js)

Punto de importación público de `legal`. Reexporta sus piezas para que un consumidor pueda importar desde la carpeta.

**Exporta** `LegalRouter`, `LegalLayout`, `LegalHeader`, `LegalFooter`, `LegalContent`, `TermsPage`, `PrivacyPage`, `DataDeletionPage`.

**Se apoya en** [`./LegalRouter`](../../apps/referidos-app/src/legal/LegalRouter.jsx), [`./LegalLayout`](../../apps/referidos-app/src/legal/LegalLayout.jsx), [`./blocks/LegalHeader`](../../apps/referidos-app/src/legal/blocks/LegalHeader.jsx), [`./blocks/LegalFooter`](../../apps/referidos-app/src/legal/blocks/LegalFooter.jsx), [`./blocks/LegalContent`](../../apps/referidos-app/src/legal/blocks/LegalContent.jsx), [`./pages/TermsPage`](../../apps/referidos-app/src/legal/pages/TermsPage.jsx), [`./pages/PrivacyPage`](../../apps/referidos-app/src/legal/pages/PrivacyPage.jsx), [`./pages/DataDeletionPage`](../../apps/referidos-app/src/legal/pages/DataDeletionPage.jsx).

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`LegalLayout.jsx`](../../apps/referidos-app/src/legal/LegalLayout.jsx)

Compone el marco común de documentos públicos y navegación legal.

**Exporta** `default LegalLayout`.

**Se apoya en** [`./blocks/LegalHeader`](../../apps/referidos-app/src/legal/blocks/LegalHeader.jsx), [`./blocks/LegalFooter`](../../apps/referidos-app/src/legal/blocks/LegalFooter.jsx).

**Lo importa** [`legal/index.js`](../../apps/referidos-app/src/legal/index.js), [`legal/LegalRouter.jsx`](../../apps/referidos-app/src/legal/LegalRouter.jsx), [`legal/pages/DataDeletionPage.jsx`](../../apps/referidos-app/src/legal/pages/DataDeletionPage.jsx), [`legal/pages/PrivacyPage.jsx`](../../apps/referidos-app/src/legal/pages/PrivacyPage.jsx), [`legal/pages/TermsPage.jsx`](../../apps/referidos-app/src/legal/pages/TermsPage.jsx).

### [`LegalRouter.jsx`](../../apps/referidos-app/src/legal/LegalRouter.jsx)

Resuelve locale y documento de la URL para montar el contenido público.

**Exporta** `default LegalRouter`.

**Se apoya en** [`./pages/TermsPage`](../../apps/referidos-app/src/legal/pages/TermsPage.jsx), [`./pages/PrivacyPage`](../../apps/referidos-app/src/legal/pages/PrivacyPage.jsx), [`./pages/DataDeletionPage`](../../apps/referidos-app/src/legal/pages/DataDeletionPage.jsx), [`./LegalLayout`](../../apps/referidos-app/src/legal/LegalLayout.jsx), [`./blocks/LegalContent`](../../apps/referidos-app/src/legal/blocks/LegalContent.jsx).

**Lo importa** [`legal/index.js`](../../apps/referidos-app/src/legal/index.js), [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

## `src/legal/pages`

### [`DataDeletionPage.jsx`](../../apps/referidos-app/src/legal/pages/DataDeletionPage.jsx)

Selecciona y muestra la política e instrucciones de eliminación de datos.

**Exporta** `default DataDeletionPage`.

**Se apoya en** [`../LegalLayout`](../../apps/referidos-app/src/legal/LegalLayout.jsx), [`../blocks/LegalContent`](../../apps/referidos-app/src/legal/blocks/LegalContent.jsx), `@referidos/legal-content`.

**Lo importa** [`legal/index.js`](../../apps/referidos-app/src/legal/index.js), [`legal/LegalRouter.jsx`](../../apps/referidos-app/src/legal/LegalRouter.jsx).

### [`PrivacyPage.jsx`](../../apps/referidos-app/src/legal/pages/PrivacyPage.jsx)

Selecciona y muestra el contenido vigente de privacidad desde el catálogo importado.

**Exporta** `default PrivacyPage`.

**Se apoya en** [`../LegalLayout`](../../apps/referidos-app/src/legal/LegalLayout.jsx), [`../blocks/LegalContent`](../../apps/referidos-app/src/legal/blocks/LegalContent.jsx), `@referidos/legal-content`.

**Lo importa** [`legal/index.js`](../../apps/referidos-app/src/legal/index.js), [`legal/LegalRouter.jsx`](../../apps/referidos-app/src/legal/LegalRouter.jsx).

### [`TermsPage.jsx`](../../apps/referidos-app/src/legal/pages/TermsPage.jsx)

Selecciona y muestra los términos desde el catálogo importado.

**Exporta** `default TermsPage`.

**Se apoya en** [`../LegalLayout`](../../apps/referidos-app/src/legal/LegalLayout.jsx), [`../blocks/LegalContent`](../../apps/referidos-app/src/legal/blocks/LegalContent.jsx), `@referidos/legal-content`.

**Lo importa** [`legal/index.js`](../../apps/referidos-app/src/legal/index.js), [`legal/LegalRouter.jsx`](../../apps/referidos-app/src/legal/LegalRouter.jsx).

## `src/lib`

### [`supabaseClient.js`](../../apps/referidos-app/src/lib/supabaseClient.js)

Instancia un cliente de Supabase bajo clave pública y PKCE. Es el punto común para sesiones y consultas desde navegador.

**Exporta** `supabase`, `default supabase`.

**Se apoya en** `@supabase/supabase-js`, [`../config/runtimeConfig`](../../apps/referidos-app/src/config/runtimeConfig.js).

**Lo importa** [`admin/apps/services/supportAppsService.js`](../../apps/referidos-app/src/admin/apps/services/supportAppsService.js), [`admin/dashboard/services/opsTelemetryDlqService.js`](../../apps/referidos-app/src/admin/dashboard/services/opsTelemetryDlqService.js), [`admin/logs/LogsTable.jsx`](../../apps/referidos-app/src/admin/logs/LogsTable.jsx), [`admin/observability/ErrorCatalogTable.jsx`](../../apps/referidos-app/src/admin/observability/ErrorCatalogTable.jsx), [`admin/observability/IssuesTable.jsx`](../../apps/referidos-app/src/admin/observability/IssuesTable.jsx), [`admin/ops/useOpsTelemetryHotSync.js`](../../apps/referidos-app/src/admin/ops/useOpsTelemetryHotSync.js), [`admin/prelaunch/services/prelaunchMetrics.js`](../../apps/referidos-app/src/admin/prelaunch/services/prelaunchMetrics.js) y 47 módulos más.

## `src/pages`

### [`AppGate.jsx`](../../apps/referidos-app/src/pages/AppGate.jsx)

Decide si la sesión lleva a onboarding o a su rol. Reintenta validación si el estado de cuenta lo permite y presenta el cambio de contraseña obligatorio.

**Exporta** `default AppGate`.

**Estado en el módulo** `validatePending`, `usuario`, `onboarding`, `bootstrap`, `bootstrapError`.

**Se apoya en** [`../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../services/registrationClient`](../../apps/referidos-app/src/services/registrationClient.js), [`../modals/useModal`](../../apps/referidos-app/src/modals/useModal.js), [`../hooks/useMfaGate`](../../apps/referidos-app/src/hooks/useMfaGate.js).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`AuthEntry.jsx`](../../apps/referidos-app/src/pages/AuthEntry.jsx)

Hace de frontera de carga diferida entre el enrutador y el flujo de autenticación.

**Exporta** `default AuthEntry`.

**Se apoya en** [`../auth/AuthFlow`](../../apps/referidos-app/src/auth/AuthFlow.jsx).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`RecuperarPassword.jsx`](../../apps/referidos-app/src/pages/RecuperarPassword.jsx)

Pantalla separada para recuperar credenciales. Su existencia no implica que tenga ruta activa en routes.jsx.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

## `src/router/guards`

### [`pwaGuard.js`](../../apps/referidos-app/src/router/guards/pwaGuard.js)

Detecta standalone y propone redirecciones por autenticación y rol. Su firma posicional difiere del llamado en App.jsx.

**Exporta** `isPWA`, `pwaGuard`.

**Lo importa** [`App.jsx`](../../apps/referidos-app/src/App.jsx).

### [`RequireAuth.jsx`](../../apps/referidos-app/src/router/guards/RequireAuth.jsx)

Protege la experiencia de navegación durante bootstrap y exige usuario y un estado MFA aceptable.

**Exporta** `default RequireAuth`.

**Estado en el módulo** `usuario`, `bootstrap`.

**Se apoya en** [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../../hooks/useMfaGate`](../../apps/referidos-app/src/hooks/useMfaGate.js).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

### [`RequireRole.jsx`](../../apps/referidos-app/src/router/guards/RequireRole.jsx)

Comprueba el rol, allowAccess y aceptaciones legales antes de montar el área requerida.

**Exporta** `default RequireRole`.

**Estado en el módulo** `usuario`, `bootstrap`, `onboarding`.

**Se apoya en** [`../../store/appStore`](../../apps/referidos-app/src/store/appStore.js).

**Lo importa** [`routes.jsx`](../../apps/referidos-app/src/routes.jsx).

## `src/services`

### [`addressReverseClient.js`](../../apps/referidos-app/src/services/addressReverseClient.js)

Envía coordenadas a address-reverse y entrega dirección normalizada para el flujo del mapa.

**Exporta** `reverseGeocode`.

**Acceso directo** `supabase.auth.getSession`, Edge `address-reverse`.

**Se apoya en** [`../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js).

**Lo importa** [`auth/steps/UserAddressStep.jsx`](../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx).

### [`addressSearchClient.js`](../../apps/referidos-app/src/services/addressSearchClient.js)

Valida y envía búsqueda a address-search. Traduce la respuesta geográfica a sugerencias seleccionables.

**Exporta** `searchAddresses`.

**Acceso directo** `supabase.auth.getSession`, Edge `address-search`.

**Se apoya en** [`../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js).

**Lo importa** [`auth/steps/UserAddressStep.jsx`](../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx).

### [`authService.js`](../../apps/referidos-app/src/services/authService.js)

Adapta inicio de sesión, registro y cierre a Supabase Auth, espera el perfil y llama a delete-account para la baja.

**Exporta** `signInWithOAuth`, `signInWithGoogleIdToken`, `signInWithEmail`, `signUpWithEmail`, `signOut`, `deleteUserAccount`, `updateUserProfile`, `getSessionUserProfile`.

**Acceso directo** tabla o vista `usuarios`, `supabase.auth.signInWithOAuth`, `supabase.auth.signInWithIdToken`, `supabase.auth.signInWithPassword`, `supabase.auth.signUp`, `supabase.auth.signOut`, `supabase.auth.getSession`, Edge `delete-account`.

**Se apoya en** [`../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`./loggingClient`](../../apps/referidos-app/src/services/loggingClient.js), [`../config/runtimeConfig`](../../apps/referidos-app/src/config/runtimeConfig.js).

**Lo importa** [`auth/hooks/useAuthActions.js`](../../apps/referidos-app/src/auth/hooks/useAuthActions.js), [`profile/shared/blocks/DangerZone.jsx`](../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx), [`store/appStore.js`](../../apps/referidos-app/src/store/appStore.js).

### [`commentService.js`](../../apps/referidos-app/src/services/commentService.js)

Inserta el comentario y la valoración de una promoción en Supabase.

**Exporta** `addComentario`.

**Acceso directo** tabla o vista `comentarios`.

**Se apoya en** [`../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js).

**Lo importa** [`store/appStore.js`](../../apps/referidos-app/src/store/appStore.js).

### [`errorPolicyService.js`](../../apps/referidos-app/src/services/errorPolicyService.js)

Interpreta decisiones del runtime de errores para convertirlas en acciones de recuperación y política de sesión.

**Exporta** `executeErrorPolicy`.

**Se apoya en** [`../store/appStore`](../../apps/referidos-app/src/store/appStore.js), [`../modals/modalStore`](../../apps/referidos-app/src/modals/modalStore.js), [`./sessionDevicesService`](../../apps/referidos-app/src/services/sessionDevicesService.js), [`./loggingClient`](../../apps/referidos-app/src/services/loggingClient.js).

**Lo importa** [`errors/ErrorRuntimeBridge.jsx`](../../apps/referidos-app/src/errors/ErrorRuntimeBridge.jsx).

### [`gpsFallbackClient.js`](../../apps/referidos-app/src/services/gpsFallbackClient.js)

Lee o guarda para el usuario una dirección de respaldo que puede usarse cuando no hay posición actual.

**Exporta** `saveGpsFallbackLocation`, `getGpsFallbackLocation`.

**Acceso directo** `supabase.auth.getSession`, tabla o vista `usuarios`, tabla o vista `direcciones`.

**Se apoya en** [`../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js).

**Lo importa** [`auth/hooks/useLocationStep.js`](../../apps/referidos-app/src/auth/hooks/useLocationStep.js), [`auth/steps/UserAddressStep.jsx`](../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx).

### [`loggingClient.js`](../../apps/referidos-app/src/services/loggingClient.js)

Configura observabilidad compartida, registro de release, eventos, breadcrumbs, flush y evaluación de política desde navegador.

**Exporta** `initLogger`, `setLoggerEnabled`, `setLoggerUser`, `setLoggerContext`, `logEvent`, `logBreadcrumb`, `logCatalogBreadcrumb`, `logError`, `reportError`, `subscribeErrorEvents`, `flushLogs`, `evaluateErrorPolicy`, `beginPolicyAction`, `endPolicyAction`.

**Acceso directo** Edge `obs-release`.

**Se apoya en** `@referidos/observability`, [`../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`../config/runtimeConfig`](../../apps/referidos-app/src/config/runtimeConfig.js).

**Lo importa** [`admin/observability/AdminRuntimeErrorModalHost.jsx`](../../apps/referidos-app/src/admin/observability/AdminRuntimeErrorModalHost.jsx), [`auth/hooks/useAuthActions.js`](../../apps/referidos-app/src/auth/hooks/useAuthActions.js), [`components/errors/AppErrorBoundary.jsx`](../../apps/referidos-app/src/components/errors/AppErrorBoundary.jsx), [`errors/ErrorRuntimeBridge.jsx`](../../apps/referidos-app/src/errors/ErrorRuntimeBridge.jsx), [`hooks/useAppLogger.js`](../../apps/referidos-app/src/hooks/useAppLogger.js), [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx) y 10 módulos más.

### [`mfaService.js`](../../apps/referidos-app/src/services/mfaService.js)

Adapta alta, desafío, verificación y baja de TOTP, consulta el nivel de garantía y sincroniza flags del perfil.

**Exporta** `getMfaAssuranceLevel`, `listMfaFactors`, `enrollTotp`, `challengeTotp`, `verifyTotp`, `challengeAndVerifyTotp`, `unenrollFactor`, `syncTotpFlags`, `pickActiveTotpFactor`.

**Acceso directo** `supabase.auth.mfa.getAuthenticatorAssuranceLevel`, `supabase.auth.mfa.listFactors`, `supabase.auth.getSession`, `supabase.auth.mfa.enroll`, `supabase.auth.mfa.challenge`, `supabase.auth.mfa.verify`, `supabase.auth.mfa.challengeAndVerify`, `supabase.auth.mfa.unenroll`, tabla o vista `usuarios`.

**Se apoya en** [`../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`../config/runtimeConfig`](../../apps/referidos-app/src/config/runtimeConfig.js).

**Lo importa** [`auth/steps/AddTwoFAStep.jsx`](../../apps/referidos-app/src/auth/steps/AddTwoFAStep.jsx), [`components/modals/ModalTwoFADisable.jsx`](../../apps/referidos-app/src/components/modals/ModalTwoFADisable.jsx), [`components/modals/ModalTwoFAEnroll.jsx`](../../apps/referidos-app/src/components/modals/ModalTwoFAEnroll.jsx), [`components/modals/ModalTwoFAVerify.jsx`](../../apps/referidos-app/src/components/modals/ModalTwoFAVerify.jsx), [`hooks/useMfaGate.js`](../../apps/referidos-app/src/hooks/useMfaGate.js), [`profile/shared/hooks/useMfaState.js`](../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js).

### [`onboardingClient.js`](../../apps/referidos-app/src/services/onboardingClient.js)

Obtiene una sesión y consulta la función onboarding para resolver perfil, pasos y acceso.

**Exporta** `runOnboardingCheck`.

**Acceso directo** `supabase.auth.getSession`, Edge `onboarding`.

**Se apoya en** [`../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`./loggingClient`](../../apps/referidos-app/src/services/loggingClient.js).

**Lo importa** [`store/appStore.js`](../../apps/referidos-app/src/store/appStore.js).

### [`promoService.js`](../../apps/referidos-app/src/services/promoService.js)

Consulta promociones activas y detalle e incluye información relacionada para componer las tarjetas de producto.

**Exporta** `getActivePromos`, `getPromoById`.

**Acceso directo** tabla o vista `promos`.

**Se apoya en** [`../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js).

**Lo importa** [`pages/PromoDetalle.jsx`](../../apps/referidos-app/src/pages/PromoDetalle.jsx), [`store/appStore.js`](../../apps/referidos-app/src/store/appStore.js).

### [`qrService.js`](../../apps/referidos-app/src/services/qrService.js)

Adapta las cinco RPC de QR a resultados de UI. Distingue QR de promo, QR válido y temporal, consulta de historial y canje.

**Exporta** `generatePromoQr`, `generateValidQr`, `getActiveValidQr`, `getQrHistory`, `redeemValidQr`.

**Acceso directo** RPC `generate_promo_qr`, RPC `generate_valid_qr`, RPC `get_active_valid_qr`, RPC `get_qr_history`, RPC `redeem_valid_qr`.

**Se apoya en** [`../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js).

**Lo importa** [`cliente/historial/HistorialView.jsx`](../../apps/referidos-app/src/cliente/historial/HistorialView.jsx), [`pages/PromoDetalle.jsx`](../../apps/referidos-app/src/pages/PromoDetalle.jsx), [`scanner/EscanerView.jsx`](../../apps/referidos-app/src/scanner/EscanerView.jsx), [`scanner/hooks/useScannerState.ts`](../../apps/referidos-app/src/scanner/hooks/useScannerState.ts), [`store/appStore.js`](../../apps/referidos-app/src/store/appStore.js).

### [`registrationClient.js`](../../apps/referidos-app/src/services/registrationClient.js)

Envía la sesión a validate-registration y normaliza el resultado que procesa AppGate.

**Exporta** `runValidateRegistration`.

**Acceso directo** `supabase.auth.getSession`, Edge `validate-registration`.

**Se apoya en** [`../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js).

**Lo importa** [`auth/hooks/useAuthActions.js`](../../apps/referidos-app/src/auth/hooks/useAuthActions.js), [`pages/AppGate.jsx`](../../apps/referidos-app/src/pages/AppGate.jsx).

### [`secureStorageService.js`](../../apps/referidos-app/src/services/secureStorageService.js)

Guarda en IndexedDB material cifrado de dispositivo y hashes de PIN con Web Crypto. Administra intentos y limpieza por usuario.

**Exporta** `getSecureStorageMode`, `generatePinSalt`, `hashPin`, `saveBiometricToken`, `loadBiometricToken`, `deleteBiometricToken`, `savePinHash`, `loadPinHash`, `deletePinHash`, `saveDeviceSecret`, `loadDeviceSecret`, `deleteDeviceSecret`, `getPinAttemptState`, `recordPinAttempt`, `clearUserSecurityMaterial`.

**Lo importa** [`cliente/layout/ClienteLayout.jsx`](../../apps/referidos-app/src/cliente/layout/ClienteLayout.jsx), [`components/modals/ModalAccessMethods.jsx`](../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx), [`components/modals/ModalPinVerify.jsx`](../../apps/referidos-app/src/components/modals/ModalPinVerify.jsx), [`negocio/layout/NegocioLayout.jsx`](../../apps/referidos-app/src/negocio/layout/NegocioLayout.jsx), [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx), [`store/appStore.js`](../../apps/referidos-app/src/store/appStore.js).

### [`sessionDevicesService.js`](../../apps/referidos-app/src/services/sessionDevicesService.js)

Invoca las funciones de registro, listado y revocación de sesiones de dispositivo. Adjunta metadatos del navegador donde corresponde.

**Exporta** `registerCurrentSessionDevice`, `listCurrentUserSessions`, `revokeSessionById`, `revokeAllSessions`.

**Acceso directo** `supabase.auth.getSession`.

**Se apoya en** [`../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js).

**Lo importa** [`profile/cliente/ClientePerfil.jsx`](../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx), [`profile/negocio/NegocioPerfil.jsx`](../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx), [`services/errorPolicyService.js`](../../apps/referidos-app/src/services/errorPolicyService.js), [`store/appStore.js`](../../apps/referidos-app/src/store/appStore.js).

### [`territoryClient.js`](../../apps/referidos-app/src/services/territoryClient.js)

Consulta provincias, cantones y parroquias para construir selectores encadenados de territorio.

**Exporta** `fetchProvincias`, `fetchCantonesByProvincia`, `fetchParroquiasByCanton`.

**Acceso directo** tabla o vista `provincias`, tabla o vista `cantones`, tabla o vista `parroquias`.

**Se apoya en** [`../lib/supabaseClient`](../../apps/referidos-app/src/lib/supabaseClient.js), [`../utils/textCase`](../../apps/referidos-app/src/utils/textCase.js).

**Lo importa** [`auth/steps/UserAddressStep.jsx`](../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx).

## `src/store`

### [`appStore.js`](../../apps/referidos-app/src/store/appStore.js)

Centraliza bootstrap, sesión, perfil, acceso local, promociones y acciones de QR. Coordina deduplicación del arranque, reintentos de dispositivo y limpieza al salir.

**Exporta** `useAppStore`.

**Acceso directo** `supabase.auth.getSession`, `supabase.auth.getUser`, `supabase.auth.signOut`.

**Se apoya en** `zustand`, `zustand/middleware`, [`../services/authService`](../../apps/referidos-app/src/services/authService.js), `@referidos/support-sdk/supportClient`, [`../services/promoService`](../../apps/referidos-app/src/services/promoService.js), [`../services/qrService`](../../apps/referidos-app/src/services/qrService.js), [`../services/commentService`](../../apps/referidos-app/src/services/commentService.js), [`../utils/errorUtils`](../../apps/referidos-app/src/utils/errorUtils.js), [`../services/onboardingClient`](../../apps/referidos-app/src/services/onboardingClient.js), [`../services/sessionDevicesService`](../../apps/referidos-app/src/services/sessionDevicesService.js) y 5 dependencias más del módulo.

**Lo importa** [`admin/layout/AdminTopbar.jsx`](../../apps/referidos-app/src/admin/layout/AdminTopbar.jsx), [`admin/sistema/FeatureFlags.jsx`](../../apps/referidos-app/src/admin/sistema/FeatureFlags.jsx), [`admin/support/AdminSupportDesk.jsx`](../../apps/referidos-app/src/admin/support/AdminSupportDesk.jsx), [`App.jsx`](../../apps/referidos-app/src/App.jsx), [`auth/AuthFlow.jsx`](../../apps/referidos-app/src/auth/AuthFlow.jsx), [`auth/hooks/useAuthActions.js`](../../apps/referidos-app/src/auth/hooks/useAuthActions.js), [`auth/steps/AccountVerifyMethodStep.jsx`](../../apps/referidos-app/src/auth/steps/AccountVerifyMethodStep.jsx) y 39 módulos más.

## `src/styles`

### [`carousel.css`](../../apps/referidos-app/src/styles/carousel.css)

Define reglas de presentación y desplazamiento que comparten los carruseles.

**Lo importa** [`main.jsx`](../../apps/referidos-app/src/main.jsx).

**Reglas para ubicar cambios** `.carousel-fade-left`, `.carousel-fade-right`.

### [`no-scrollbar.css`](../../apps/referidos-app/src/styles/no-scrollbar.css)

Oculta visualmente la barra en elementos seleccionados que siguen siendo desplazables.

**Lo importa** [`main.jsx`](../../apps/referidos-app/src/main.jsx).

**Reglas para ubicar cambios** `.no-scrollbar`.

## `src/utils`

### [`dateUtils.js`](../../apps/referidos-app/src/utils/dateUtils.js)

Unifica el tratamiento de fechas que aparecen en pantallas y servicios.

**Exporta** `formatDateIsoToDdMmYyyy`.

**Lo importa** [`components/cards/PromoCardCercanas.jsx`](../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx), [`negocio/inicio/InicioPromos.jsx`](../../apps/referidos-app/src/negocio/inicio/InicioPromos.jsx), [`pages/PromoDetalle.jsx`](../../apps/referidos-app/src/pages/PromoDetalle.jsx).

### [`errorUtils.js`](../../apps/referidos-app/src/utils/errorUtils.js)

Normaliza excepciones y valores de error a mensajes consumibles por la interfaz.

**Exporta** `handleError`.

**Se apoya en** [`../services/loggingClient`](../../apps/referidos-app/src/services/loggingClient.js).

**Lo importa** [`cliente/historial/HistorialView.jsx`](../../apps/referidos-app/src/cliente/historial/HistorialView.jsx), [`scanner/EscanerView.jsx`](../../apps/referidos-app/src/scanner/EscanerView.jsx), [`scanner/hooks/useScannerState.ts`](../../apps/referidos-app/src/scanner/hooks/useScannerState.ts), [`store/appStore.js`](../../apps/referidos-app/src/store/appStore.js).

### [`googleOneTap.js`](../../apps/referidos-app/src/utils/googleOneTap.js)

Aísla la inicialización de Google One Tap y el intercambio de credenciales desde navegador.

**Exporta** `requestGoogleCredential`.

**Lo importa** [`auth/hooks/useAuthActions.js`](../../apps/referidos-app/src/auth/hooks/useAuthActions.js).

### [`sanitize.js`](../../apps/referidos-app/src/utils/sanitize.js)

Limpia valores de texto para su uso en formularios y resultados.

**Exporta** `sanitizeText`.

**Lo importa** [`cliente/historial/HistorialItem.jsx`](../../apps/referidos-app/src/cliente/historial/HistorialItem.jsx), [`cliente/historial/HistorialItemActivo.jsx`](../../apps/referidos-app/src/cliente/historial/HistorialItemActivo.jsx), [`cliente/inicio/ClienteInicio.jsx`](../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx), [`components/cards/PromoCardCercanas.jsx`](../../apps/referidos-app/src/components/cards/PromoCardCercanas.jsx), [`components/cards/PromoCardHot.jsx`](../../apps/referidos-app/src/components/cards/PromoCardHot.jsx), [`components/cards/PromoCardNuevas.jsx`](../../apps/referidos-app/src/components/cards/PromoCardNuevas.jsx), [`components/cards/PromoCardVariant.jsx`](../../apps/referidos-app/src/components/cards/PromoCardVariant.jsx) y 3 módulos más.

### [`storage.js`](../../apps/referidos-app/src/utils/storage.js)

Agrupa utilidades de almacenamiento del navegador para persistencias de poca escala.

**Exporta** `safeGetItem`, `safeSetItem`, `safeRemoveItem`.

**Referencia directa** No apareció una importación interna explícita en este inventario. Antes de retirarlo, comprueba rutas dinámicas, alias y consumidores externos.

### [`textCase.js`](../../apps/referidos-app/src/utils/textCase.js)

Estandariza capitalización de texto visible y etiquetas.

**Exporta** `toTitleCaseEs`.

**Lo importa** [`auth/hooks/useAuthActions.js`](../../apps/referidos-app/src/auth/hooks/useAuthActions.js), [`auth/steps/UserAddressStep.jsx`](../../apps/referidos-app/src/auth/steps/UserAddressStep.jsx), [`services/territoryClient.js`](../../apps/referidos-app/src/services/territoryClient.js).

### [`validators.js`](../../apps/referidos-app/src/utils/validators.js)

Agrupa validaciones de formularios para que los pasos manejen reglas y mensajes de forma coherente.

**Exporta** `EMAIL_RE`, `PHONE_RE`, `CODE_RE`, `validateEmail`, `validatePhone`, `validateCode`, `validarCedula`.

**Lo importa** [`auth/hooks/useAuthActions.js`](../../apps/referidos-app/src/auth/hooks/useAuthActions.js), [`auth/steps/AccountVerifyStep.jsx`](../../apps/referidos-app/src/auth/steps/AccountVerifyStep.jsx), [`auth/steps/BusinessVerifyStep.jsx`](../../apps/referidos-app/src/auth/steps/BusinessVerifyStep.jsx), [`auth/steps/RoleSelectStep.jsx`](../../apps/referidos-app/src/auth/steps/RoleSelectStep.jsx), [`components/modals/ModalCodigoNegocio.jsx`](../../apps/referidos-app/src/components/modals/ModalCodigoNegocio.jsx), [`components/modals/ModalSplashChoiceOverlay.jsx`](../../apps/referidos-app/src/components/modals/ModalSplashChoiceOverlay.jsx).
