# Android · Servicios, estado y UI compartida · 4 de 4

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-android/src/shared/store/appStore.ts`](../../../apps/referidos-android/src/shared/store/appStore.ts#L1)
- [`apps/referidos-android/src/shared/store/modalStore.ts`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L1)
- [`apps/referidos-android/src/shared/store/securityStore.ts`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L1)
- [`apps/referidos-android/src/shared/store/shellStore.ts`](../../../apps/referidos-android/src/shared/store/shellStore.ts#L1)
- [`apps/referidos-android/src/shared/store/supportDeskStore.ts`](../../../apps/referidos-android/src/shared/store/supportDeskStore.ts#L1)
- [`apps/referidos-android/src/shared/ui/BlockSkeleton.tsx`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L1)
- [`apps/referidos-android/src/shared/ui/FeaturePlaceholder.tsx`](../../../apps/referidos-android/src/shared/ui/FeaturePlaceholder.tsx#L1)
- [`apps/referidos-android/src/shared/ui/GlobalLoader.tsx`](../../../apps/referidos-android/src/shared/ui/GlobalLoader.tsx#L1)
- [`apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L1)
- [`apps/referidos-android/src/shared/ui/ScreenScaffold.tsx`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L1)
- [`apps/referidos-android/src/shared/ui/SectionCard.tsx`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L1)

## Símbolos y conexiones

### [`apps/referidos-android/src/shared/store/appStore.ts`](../../../apps/referidos-android/src/shared/store/appStore.ts#L1)

Estado raíz de sesión y onboarding. Usa `getSession`, el resultado de `onboarding` y los roles reconocidos para decidir acceso y verificación. Resetea estados al perder la sesión y maneja cierre de sesión y métodos de acceso disponibles.

**Superficie que exporta.** [`AppRole`](../../../apps/referidos-android/src/shared/store/appStore.ts#L8), [`BootStatus`](../../../apps/referidos-android/src/shared/store/appStore.ts#L9), [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37).

**Módulos que lo cargan.** [`App.tsx`](../../../apps/referidos-android/src/app/App.tsx#L14) (importa), [`AdminSistemaScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L6) (importa), [`AdminSoporteScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L9) (importa), [`useAuthEngine.ts`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L18) (importa), [`ClienteEscanerScreen.tsx`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L7) (importa), [`ClienteHistorialScreen.tsx`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L7) (importa), [`ClienteInicioScreen.tsx`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L8) (importa), [`NegocioEscanerScreen.tsx`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L7) (importa), [`NegocioGestionarScreen.tsx`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L7) (importa), [`NegocioInicioScreen.tsx`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L8) (importa), [`AdminPerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L5) (importa), [`ClientePerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L15) (importa), [`NegocioPerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L15) (importa), [`SoportePerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L5) (importa), [`AccessSecurityPanel.tsx`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L4) (importa), [`SoporteInboxScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L10) (importa) y 5 más.

**Dependencias del archivo.** `zustand`, [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/store/modalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts), [`@shared/store/shellStore`](../../../apps/referidos-android/src/shared/store/shellStore.ts), [`@shared/store/securityStore`](../../../apps/referidos-android/src/shared/store/securityStore.ts), [`@shared/security/localAccessSecurity`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts).

#### [`AppRole`](../../../apps/referidos-android/src/shared/store/appStore.ts#L8) · tipo TypeScript · exportado

Describe la forma del contrato de `App Role`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`BootStatus`](../../../apps/referidos-android/src/shared/store/appStore.ts#L9) · tipo TypeScript · exportado

Describe la forma del contrato de `Boot Status`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`AppState`](../../../apps/referidos-android/src/shared/store/appStore.ts#L11) · tipo TypeScript

Describe la forma del contrato de `App State`, con campos `bootStatus`, `bootError`, `role`, `allowAccess`, `requiresVerificationFlow`, `reasons`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `bootStatus`, `bootError`, `role`, `allowAccess`, `requiresVerificationFlow`, `reasons`, `onboarding`, `justCompletedRegistration`, `accessMethods`, `bootstrapAuth`, `forceRoleForDebug`, `setJustCompletedRegistration`, `setAccessMethods`, `signOut`.
- **Usa código de** [`AccessMethods`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L27) (referencia).

#### [`resolveRole`](../../../apps/referidos-android/src/shared/store/appStore.ts#L28) · función

Obtiene o resuelve el valor de rol para entregarlo al consumidor.

- **Entradas** `onboardingData`.
- **Retorno visible o tipo declarado** `AppRole`, `null`.
- **Condiciones que evalúa** `role`.
- **Lo usa** [`bootstrapAuth`](../../../apps/referidos-android/src/shared/store/appStore.ts#L111) (llama).

#### [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37) · inicializador de store · exportado

Configura el estado inicial y las acciones del store `useAppStore`.

- **Entradas** `set`, `get`.
- **Retorno visible o tipo declarado** `bootStatus`, `bootError`, `role`, `allowAccess`, `requiresVerificationFlow`, `reasons`, `onboarding`, `justCompletedRegistration`, `accessMethods`, `bootstrapAuth`, `forceRoleForDebug`, `setJustCompletedRegistration`, `setAccessMethods`, `signOut`.
- **Llamadas directas en el cuerpo** [`create`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37).
- **Lo usa** [`App`](../../../apps/referidos-android/src/app/App.tsx#L124) (llama), [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L72) (llama), [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L29) (llama), [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L83) (llama), [`startVerification`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L813) (accede al módulo), [`ClienteEscanerScreen`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L26) (llama), [`ClienteHistorialScreen`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L39) (llama), [`ClienteInicioScreen`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L15) (llama), [`NegocioEscanerScreen`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L35) (llama), [`NegocioGestionarScreen`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L49) (llama), [`NegocioInicioScreen`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L28) (llama), [`AdminPerfilScreen`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L15) (llama) y 10 más.

#### [`bootstrapAuth`](../../../apps/referidos-android/src/shared/store/appStore.ts#L52) · función · asíncrona · dentro de [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37)

Opera sobre Auth `getSession` y coordina las demás operaciones de esta ficha.

- **Actualizaciones de estado o acciones** `clearSessionCache`.
- **Efectos y APIs** `reset`.
- **Condiciones que evalúa** `ausencia de session.access_token`, `ausencia de onboarding.ok`, `previousRole`.
- **Contrato de datos** Auth `getSession` en [`appStore.ts:55`](../../../apps/referidos-android/src/shared/store/appStore.ts#L55), Auth `runOnboardingCheck` en [`appStore.ts:82`](../../../apps/referidos-android/src/shared/store/appStore.ts#L82).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo), [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo), [`useShellStore`](../../../apps/referidos-android/src/shared/store/shellStore.ts#L23) (accede al módulo), [`useModalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70) (accede al módulo), [`useSecurityStore`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L63) (accede al módulo), [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo), [`buildAccessMethodsFromUser`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L49) (llama).
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-android/src/shared/store/appStore.ts#L53), [`supabase.auth.getSession`](../../../apps/referidos-android/src/shared/store/appStore.ts#L55), [`observability.track`](../../../apps/referidos-android/src/shared/store/appStore.ts#L57), [`clearSessionCache`](../../../apps/referidos-android/src/shared/store/appStore.ts#L63), [`useShellStore.getState`](../../../apps/referidos-android/src/shared/store/appStore.ts#L63), [`reset`](../../../apps/referidos-android/src/shared/store/appStore.ts#L64), [`useModalStore.getState`](../../../apps/referidos-android/src/shared/store/appStore.ts#L64), [`useSecurityStore.getState`](../../../apps/referidos-android/src/shared/store/appStore.ts#L65), [`mobileApi.auth.runOnboardingCheck`](../../../apps/referidos-android/src/shared/store/appStore.ts#L82), [`get`](../../../apps/referidos-android/src/shared/store/appStore.ts#L110), [`resolveRole`](../../../apps/referidos-android/src/shared/store/appStore.ts#L111), [`buildAccessMethodsFromUser`](../../../apps/referidos-android/src/shared/store/appStore.ts#L120).

#### [`forceRoleForDebug`](../../../apps/referidos-android/src/shared/store/appStore.ts#L158) · función · dentro de [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37)

Función auxiliar de `useAppStore` para `force Role For Debug`.

- **Entradas** `role`.
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-android/src/shared/store/appStore.ts#L159).

#### [`setJustCompletedRegistration`](../../../apps/referidos-android/src/shared/store/appStore.ts#L162) · función · dentro de [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37)

Aplica o guarda `Just Completed Registration` para que el estado refleje la operación.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-android/src/shared/store/appStore.ts#L163).

#### [`setAccessMethods`](../../../apps/referidos-android/src/shared/store/appStore.ts#L166) · función · dentro de [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37)

Aplica o guarda `Access Methods` para que el estado refleje la operación.

- **Entradas** `methods`.
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-android/src/shared/store/appStore.ts#L167).

#### [`signOut`](../../../apps/referidos-android/src/shared/store/appStore.ts#L175) · función · asíncrona · dentro de [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37)

Opera sobre Auth `signOut`. El resultado se adapta al contrato del consumidor.

- **Actualizaciones de estado o acciones** `clearSessionCache`.
- **Efectos y APIs** `reset`.
- **Contrato de datos** Auth `signOut` en [`appStore.ts:182`](../../../apps/referidos-android/src/shared/store/appStore.ts#L182).
- **Usa código de** [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo), [`useShellStore`](../../../apps/referidos-android/src/shared/store/shellStore.ts#L23) (accede al módulo), [`useModalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70) (accede al módulo), [`useSecurityStore`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L63) (accede al módulo).
- **Llamadas directas en el cuerpo** [`observability.track`](../../../apps/referidos-android/src/shared/store/appStore.ts#L176), [`supabase.auth.signOut`](../../../apps/referidos-android/src/shared/store/appStore.ts#L182), [`clearSessionCache`](../../../apps/referidos-android/src/shared/store/appStore.ts#L183), [`useShellStore.getState`](../../../apps/referidos-android/src/shared/store/appStore.ts#L183), [`reset`](../../../apps/referidos-android/src/shared/store/appStore.ts#L184), [`useModalStore.getState`](../../../apps/referidos-android/src/shared/store/appStore.ts#L184), [`useSecurityStore.getState`](../../../apps/referidos-android/src/shared/store/appStore.ts#L185), [`set`](../../../apps/referidos-android/src/shared/store/appStore.ts#L186).

### [`apps/referidos-android/src/shared/store/modalStore.ts`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L1)

Define modelos de confirmación, alerta y selector. Almacena el modal activo y funciones para abrir, cerrar o resetearlo. La pantalla aporta la acción específica y reutiliza el render del host.

**Superficie que exporta.** [`ModalTone`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L3), [`ModalPickerOption`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L5), [`ConfirmModal`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L19), [`AlertModal`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L28), [`PickerModal`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L35), [`AppModal`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L46), [`useModalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70).

**Módulos que lo cargan.** [`AdminPromosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L11) (importa), [`AdminReportesScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L8) (importa), [`AdminSupportTicketsPanelScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L8) (importa), [`AddressStepBlock.tsx`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L16) (importa), [`ClienteInicioScreen.tsx`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L9) (importa), [`NegocioGestionarScreen.tsx`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L8) (importa), [`AdminPerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L6) (importa), [`ClientePerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L16) (importa), [`NegocioPerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L16) (importa), [`SoportePerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L6) (importa), [`ModalHost.tsx`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L12) (importa), [`appStore.ts`](../../../apps/referidos-android/src/shared/store/appStore.ts#L3) (importa).

**Dependencias del archivo.** `zustand`.

#### [`ModalTone`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L3) · tipo TypeScript · exportado

Describe la forma del contrato de `Modal Tone`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`ModalPickerOption`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L5) · tipo TypeScript · exportado

Describe la forma del contrato de `Modal Picker Option`, con campos `id`, `label`, `description`, `disabled`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `id`, `label`, `description`, `disabled`.

#### [`BaseModal`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L12) · tipo TypeScript

Describe la forma del contrato de `Base Modal`, con campos `id`, `title`, `message`, `dismissible`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `id`, `title`, `message`, `dismissible`.

#### [`ConfirmModal`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L19) · tipo TypeScript · exportado

Describe la forma del contrato de `Confirm Modal`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`AlertModal`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L28) · tipo TypeScript · exportado

Describe la forma del contrato de `Alert Modal`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`PickerModal`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L35) · tipo TypeScript · exportado

Describe la forma del contrato de `Picker Modal`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`AppModal`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L46) · tipo TypeScript · exportado

Describe la forma del contrato de `App Modal`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`ConfirmInput`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L48) · tipo TypeScript

Describe la forma del contrato de `Confirm Input`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`AlertInput`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L49) · tipo TypeScript

Describe la forma del contrato de `Alert Input`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`PickerInput`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L50) · tipo TypeScript

Describe la forma del contrato de `Picker Input`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`ModalState`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L52) · tipo TypeScript

Describe la forma del contrato de `Modal State`, con campos `activeModal`, `openConfirm`, `openAlert`, `openPicker`, `closeModal`, `confirm`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `activeModal`, `openConfirm`, `openAlert`, `openPicker`, `closeModal`, `confirm`, `acknowledge`, `cancel`, `pickOption`, `applyPicker`, `reset`.

#### [`nextModalId`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L66) · función

Implementa `next Modal Id` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Llamadas directas en el cuerpo** [`slice`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L67), [`toString`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L67).
- **Lo usa** [`openConfirm`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L77) (llama), [`openAlert`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L87) (llama), [`openPicker`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L98) (llama).

#### [`useModalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70) · inicializador de store · exportado

Configura el estado inicial y las acciones del store `useModalStore`.

- **Entradas** `set`, `get`.
- **Retorno visible o tipo declarado** `activeModal`, `openConfirm`, `openAlert`, `openPicker`, `closeModal`, `confirm`, `acknowledge`, `cancel`, `pickOption`, `applyPicker`, `reset`.
- **Llamadas directas en el cuerpo** [`create`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70).
- **Lo usa** [`AdminPromosScreen`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L22) (llama), [`AdminReportesScreen`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L18) (llama), [`AdminSupportTicketsPanelScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketsPanelScreen.tsx#L28) (llama), [`AddressStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx#L161) (llama), [`ClienteInicioScreen`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L17) (llama), [`NegocioGestionarScreen`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L50) (llama), [`AdminPerfilScreen`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L17) (llama), [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L49) (llama), [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L50) (llama), [`SoportePerfilScreen`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L24) (llama), [`ModalHost`](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx#L21) (llama), [`bootstrapAuth`](../../../apps/referidos-android/src/shared/store/appStore.ts#L64) (accede al módulo) y 1 más.

#### [`openConfirm`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L73) · función · dentro de [`useModalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70)

Inicia `Confirm` y prepara sus dependencias.

- **Entradas** `payload`.
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L74), [`nextModalId`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L77).

#### [`openAlert`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L83) · función · dentro de [`useModalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70)

Inicia `Alert` y prepara sus dependencias.

- **Entradas** `payload`.
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L84), [`nextModalId`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L87).

#### [`openPicker`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L93) · función · dentro de [`useModalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70)

Inicia `Picker` y prepara sus dependencias.

- **Entradas** `payload`.
- **Llamadas directas en el cuerpo** [`payload.options.find`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L94), [`set`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L95), [`nextModalId`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L98).

#### [`closeModal`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L105) · función · dentro de [`useModalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70)

Finaliza `Modal` y ajusta el estado que depende de esa operación.

- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L105).

#### [`confirm`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L107) · función · dentro de [`useModalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70)

Función auxiliar de `useModalStore` para `confirm`.

- **Condiciones que evalúa** `ausencia de active o active.kind`.
- **Llamadas directas en el cuerpo** [`get`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L108), [`active.onConfirm`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L110), [`set`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L111).

#### [`acknowledge`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L114) · función · dentro de [`useModalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70)

Función auxiliar de `useModalStore` para `acknowledge`.

- **Condiciones que evalúa** `ausencia de active o active.kind`.
- **Llamadas directas en el cuerpo** [`get`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L115), [`active.onAcknowledge`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L117), [`set`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L118).

#### [`cancel`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L121) · función · dentro de [`useModalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70)

Comprueba `cel` para decidir si se admite o continúa la operación.

- **Condiciones que evalúa** `ausencia de active`, `active.kind`.
- **Llamadas directas en el cuerpo** [`get`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L122), [`active.onCancel`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L124), [`set`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L126).

#### [`pickOption`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L129) · función · dentro de [`useModalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70)

Extrae o interpreta `Option` de los argumentos, estado o datos de entrada.

- **Entradas** `id`.
- **Condiciones que evalúa** `ausencia de active o active.kind`.
- **Llamadas directas en el cuerpo** [`get`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L130), [`set`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L132).

#### [`applyPicker`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L135) · función · dentro de [`useModalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70)

Aplica o guarda `Picker` para que el estado refleje la operación.

- **Condiciones que evalúa** `ausencia de active o active.kind`, `active.selectedId`.
- **Llamadas directas en el cuerpo** [`get`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L136), [`active.onSelect`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L139), [`set`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L141).

#### [`reset`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L144) · función · dentro de [`useModalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70)

Función auxiliar de `useModalStore` para `reset`.

- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L144).

### [`apps/referidos-android/src/shared/store/securityStore.ts`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L1)

Implementa máquina local de acceso con `LOCKED`, `UNLOCK_LOCAL` y `REAUTH_SENSITIVE`. Usa reglas de `security-core`, validez temporal y acciones pendientes. El desbloqueo local dura por defecto diez minutos y el sensible cinco.

**Superficie que exporta.** [`UnlockLevel`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L8), [`UnlockMethod`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L9), [`PendingMethod`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L10), [`SecurityRequirementResult`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L12), [`useSecurityStore`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L63).

**Módulos que lo cargan.** [`AccessSecurityPanel.tsx`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L5) (importa), [`localAccessSecurity.ts`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L22) (importa), [`appStore.ts`](../../../apps/referidos-android/src/shared/store/appStore.ts#L5) (importa).

**Dependencias del archivo.** `zustand`, [`@referidos/security-core`](../../../packages/security-core/src/index.js).

#### [`UnlockLevel`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L8) · tipo TypeScript · exportado

Describe la forma del contrato de `Unlock Level`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`UnlockMethod`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L9) · tipo TypeScript · exportado

Describe la forma del contrato de `Unlock Method`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`PendingMethod`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L10) · tipo TypeScript · exportado

Describe la forma del contrato de `Pending Method`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`SecurityRequirementResult`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L12) · tipo TypeScript · exportado

Describe la forma del contrato de `Security Requirement Result`, con campos `ok`, `action`, `requiredLevel`, `currentLevel`, `pendingMethod`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `ok`, `action`, `requiredLevel`, `currentLevel`, `pendingMethod`.
- **Lo usa** [`requireSecurityForAction`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L58) (referencia).

#### [`UNLOCK_LOCAL_TTL_MS`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L20) · variable de módulo

Declara `UNLOCK_LOCAL_TTL_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`unlockWithPin`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L159) (referencia), [`unlockWithBiometrics`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L172) (referencia).

#### [`REAUTH_SENSITIVE_TTL_MS`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L21) · variable de módulo

Declara `REAUTH_SENSITIVE_TTL_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`unlockWithPassword`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L185) (referencia).

#### [`SecurityState`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L23) · tipo TypeScript

Describe la forma del contrato de `Security State`, con campos `unlockLevel`, `unlockMethod`, `unlockedAt`, `unlockExpiresAt`, `pendingAction`, `pendingLevel`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `unlockLevel`, `unlockMethod`, `unlockedAt`, `unlockExpiresAt`, `pendingAction`, `pendingLevel`, `pendingMethod`, `rules`, `require`, `requireAction`, `setRule`, `setRules`, `clearPending`, `getCurrentLevel` y 5 más.

#### [`hasValidUnlock`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L45) · función

Comprueba `Valid Unlock` para decidir si se admite o continúa la operación.

- **Entradas** `level`, `expiresAt`.
- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `level`, `ausencia de expiresAt`.
- **Lo usa** [`require`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L79) (llama), [`getCurrentLevel`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L144) (llama).

#### [`normalizeLevel`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L51) · función

Normaliza `Level` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `UnlockLevel`.
- **Condiciones que evalúa** `value`.
- **Usa código de** [`UNLOCK_LEVELS`](../../../packages/security-core/src/unlock/unlockPolicy.js#L1) (accede al módulo).
- **Lo usa** [`require`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L75) (llama), [`setRule`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L125) (llama), [`setRules`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L133) (llama).

#### [`requiredMethod`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L57) · función

Comprueba `d Method` para decidir si se admite o continúa la operación.

- **Entradas** `level`.
- **Retorno visible o tipo declarado** `PendingMethod`, `null`.
- **Condiciones que evalúa** `level`.
- **Lo usa** [`require`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L104) (llama).

#### [`useSecurityStore`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L63) · inicializador de store · exportado

Configura el estado inicial y las acciones del store `useSecurityStore`.

- **Entradas** `set`, `get`.
- **Retorno visible o tipo declarado** `unlockLevel`, `unlockMethod`, `unlockedAt`, `unlockExpiresAt`, `pendingAction`, `pendingLevel`, `pendingMethod`, `rules`, `require`, `requireAction`, `setRule`, `setRules`, `clearPending`, `getCurrentLevel`, `unlockWithPin`, `unlockWithBiometrics`, `unlockWithPassword`, `invalidate` y 1 más.
- **Llamadas directas en el cuerpo** [`create`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L63).
- **Lo usa** [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L32) (llama), [`requireSecurityForAction`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L59) (accede al módulo), [`verifyPinAndUnlock`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L160) (accede al módulo), [`unlockWithBiometricAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L239) (accede al módulo), [`confirmSensitiveReauth`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L282) (accede al módulo), [`bootstrapAuth`](../../../apps/referidos-android/src/shared/store/appStore.ts#L65) (accede al módulo), [`signOut`](../../../apps/referidos-android/src/shared/store/appStore.ts#L185) (accede al módulo).

#### [`require`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L73) · función · dentro de [`useSecurityStore`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L63)

Función auxiliar de `useSecurityStore` para `require`.

- **Entradas** `action`, `level`.
- **Retorno visible o tipo declarado** `ok`, `action`, `requiredLevel`, `currentLevel`, `pendingMethod`.
- **Condiciones que evalúa** `ausencia de unlocked`, `state.unlockLevel`, `allowed`.
- **Usa código de** [`getRequiredLevelForAction`](../../../packages/security-core/src/unlock/unlockPolicy.js#L15) (llama), [`isLevelSatisfied`](../../../packages/security-core/src/unlock/unlockPolicy.js#L28) (llama).
- **Llamadas directas en el cuerpo** [`get`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L74), [`normalizeLevel`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L75), [`getRequiredLevelForAction`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L76), [`hasValidUnlock`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L79), [`set`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L83), [`isLevelSatisfied`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L92), [`requiredMethod`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L104).

#### [`requireAction`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L119) · función · dentro de [`useSecurityStore`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L63)

Comprueba el valor de acción para decidir si se admite o continúa la operación.

- **Entradas** `action`.
- **Llamadas directas en el cuerpo** [`require`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L119), [`get`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L119).

#### [`setRule`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L121) · función · dentro de [`useSecurityStore`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L63)

Aplica o guarda `Rule` para que el estado refleje la operación.

- **Entradas** `action`, `level`.
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L122), [`normalizeLevel`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L125).

#### [`setRules`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L130) · función · dentro de [`useSecurityStore`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L63)

Aplica o guarda `Rules` para que el estado refleje la operación.

- **Entradas** `rules`.
- **Llamadas directas en el cuerpo** [`normalizeLevel`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L133), [`set`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L135).

#### [`clearPending`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L138) · función · dentro de [`useSecurityStore`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L63)

Limpia o restablece `Pending` como parte de este flujo.

- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L139).

#### [`getCurrentLevel`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L142) · función · dentro de [`useSecurityStore`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L63)

Obtiene o resuelve `Current Level` para entregarlo al consumidor.

- **Condiciones que evalúa** `ausencia de unlocked`, `state.unlockLevel`.
- **Llamadas directas en el cuerpo** [`get`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L143), [`hasValidUnlock`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L144), [`set`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L147).

#### [`unlockWithPin`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L159) · función · dentro de [`useSecurityStore`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L63)

Función auxiliar de `useSecurityStore` para `unlock With Pin`.

- **Entradas** `ttlMs = valor por defecto`.
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L161).

#### [`unlockWithBiometrics`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L172) · función · dentro de [`useSecurityStore`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L63)

Función auxiliar de `useSecurityStore` para `unlock With Biometrics`.

- **Entradas** `ttlMs = valor por defecto`.
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L174).

#### [`unlockWithPassword`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L185) · función · dentro de [`useSecurityStore`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L63)

Función auxiliar de `useSecurityStore` para `unlock With Password`.

- **Entradas** `ttlMs = valor por defecto`.
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L187).

#### [`invalidate`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L198) · función · dentro de [`useSecurityStore`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L63)

Función auxiliar de `useSecurityStore` para `invalidate`.

- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L199).

#### [`reset`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L210) · función · dentro de [`useSecurityStore`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L63)

Función auxiliar de `useSecurityStore` para `reset`.

- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L211).

### [`apps/referidos-android/src/shared/store/shellStore.ts`](../../../apps/referidos-android/src/shared/store/shellStore.ts#L1)

Mantiene la pestaña activa por rol y un contador para desmontar el árbol anterior cuando se limpia la sesión. Preserva la posición dentro de la app durante cambios normales de pestaña.

**Superficie que exporta.** [`ShellRoleKey`](../../../apps/referidos-android/src/shared/store/shellStore.ts#L3), [`useShellStore`](../../../apps/referidos-android/src/shared/store/shellStore.ts#L23).

**Módulos que lo cargan.** [`RoleTabs.tsx`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L24) (importa), [`appStore.ts`](../../../apps/referidos-android/src/shared/store/appStore.ts#L4) (importa).

**Dependencias del archivo.** `zustand`.

#### [`ShellRoleKey`](../../../apps/referidos-android/src/shared/store/shellStore.ts#L3) · tipo TypeScript · exportado

Describe la forma del contrato de `Shell Role Key`. TypeScript lo comprueba al compilar.

- **Lo usa** [`RoleTabConfig`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L35) (referencia).

#### [`ActiveTabs`](../../../apps/referidos-android/src/shared/store/shellStore.ts#L5) · tipo TypeScript

Describe la forma del contrato de `Active Tabs`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`ShellState`](../../../apps/referidos-android/src/shared/store/shellStore.ts#L7) · tipo TypeScript

Describe la forma del contrato de `Shell State`, con campos `cacheEpoch`, `activeTabs`, `setActiveTab`, `clearSessionCache`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `cacheEpoch`, `activeTabs`, `setActiveTab`, `clearSessionCache`.

#### [`createInitialTabs`](../../../apps/referidos-android/src/shared/store/shellStore.ts#L14) · función

Construye `Initial Tabs` a partir de los datos del flujo.

- **Retorno visible o tipo declarado** `ActiveTabs`, `cliente`, `negocio`, `admin`, `soporte`.
- **Lo usa** [`useShellStore`](../../../apps/referidos-android/src/shared/store/shellStore.ts#L25) (llama), [`clearSessionCache`](../../../apps/referidos-android/src/shared/store/shellStore.ts#L39) (llama).

#### [`useShellStore`](../../../apps/referidos-android/src/shared/store/shellStore.ts#L23) · inicializador de store · exportado

Configura el estado inicial y las acciones del store `useShellStore`.

- **Entradas** `set`, `get`.
- **Retorno visible o tipo declarado** `cacheEpoch`, `activeTabs`, `setActiveTab`, `clearSessionCache`.
- **Llamadas directas en el cuerpo** [`create`](../../../apps/referidos-android/src/shared/store/shellStore.ts#L23), [`createInitialTabs`](../../../apps/referidos-android/src/shared/store/shellStore.ts#L25).
- **Lo usa** [`RoleTabNavigator`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L63) (llama), [`bootstrapAuth`](../../../apps/referidos-android/src/shared/store/appStore.ts#L63) (accede al módulo), [`signOut`](../../../apps/referidos-android/src/shared/store/appStore.ts#L183) (accede al módulo).

#### [`setActiveTab`](../../../apps/referidos-android/src/shared/store/shellStore.ts#L27) · función · dentro de [`useShellStore`](../../../apps/referidos-android/src/shared/store/shellStore.ts#L23)

Aplica o guarda `Active Tab` para que el estado refleje la operación.

- **Entradas** `role`, `routeName`.
- **Condiciones que evalúa** `ausencia de routeName`, `current`.
- **Llamadas directas en el cuerpo** [`get`](../../../apps/referidos-android/src/shared/store/shellStore.ts#L29), [`set`](../../../apps/referidos-android/src/shared/store/shellStore.ts#L31).

#### [`clearSessionCache`](../../../apps/referidos-android/src/shared/store/shellStore.ts#L36) · función · dentro de [`useShellStore`](../../../apps/referidos-android/src/shared/store/shellStore.ts#L23)

Limpia o restablece `Session Cache` como parte de este flujo.

- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-android/src/shared/store/shellStore.ts#L37), [`createInitialTabs`](../../../apps/referidos-android/src/shared/store/shellStore.ts#L39).

### [`apps/referidos-android/src/shared/store/supportDeskStore.ts`](../../../apps/referidos-android/src/shared/store/supportDeskStore.ts#L1)

Conserva el ID público del hilo seleccionado, de modo que inbox, router administrativo y ficha compartan el mismo puntero al abrir un ticket.

**Superficie que exporta.** [`useSupportDeskStore`](../../../apps/referidos-android/src/shared/store/supportDeskStore.ts#L9).

**Módulos que lo cargan.** [`AdminSupportTicketScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketScreen.tsx#L3) (importa), [`SoporteInboxScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L11) (importa), [`SoporteIrregularScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L8) (importa), [`SoporteTicketScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L10) (importa).

**Dependencias del archivo.** `zustand`.

#### [`SupportDeskState`](../../../apps/referidos-android/src/shared/store/supportDeskStore.ts#L3) · tipo TypeScript

Describe la forma del contrato de `Support Desk State`, con campos `selectedThreadPublicId`, `setSelectedThreadPublicId`, `clearSelectedThread`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `selectedThreadPublicId`, `setSelectedThreadPublicId`, `clearSelectedThread`.

#### [`useSupportDeskStore`](../../../apps/referidos-android/src/shared/store/supportDeskStore.ts#L9) · inicializador de store · exportado

Configura el estado inicial y las acciones del store `useSupportDeskStore`.

- **Entradas** `set`.
- **Retorno visible o tipo declarado** `selectedThreadPublicId`, `setSelectedThreadPublicId`, `clearSelectedThread`.
- **Llamadas directas en el cuerpo** [`create`](../../../apps/referidos-android/src/shared/store/supportDeskStore.ts#L9).
- **Lo usa** [`AdminSupportTicketScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportTicketScreen.tsx#L8) (llama), [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L30) (llama), [`SoporteIrregularScreen`](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx#L14) (llama), [`SoporteTicketScreen`](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx#L105) (llama).

#### [`setSelectedThreadPublicId`](../../../apps/referidos-android/src/shared/store/supportDeskStore.ts#L11) · función · dentro de [`useSupportDeskStore`](../../../apps/referidos-android/src/shared/store/supportDeskStore.ts#L9)

Aplica o guarda `Selected Thread Public Id` para que el estado refleje la operación.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-android/src/shared/store/supportDeskStore.ts#L12), [`trim`](../../../apps/referidos-android/src/shared/store/supportDeskStore.ts#L13).

#### [`clearSelectedThread`](../../../apps/referidos-android/src/shared/store/supportDeskStore.ts#L15) · función · dentro de [`useSupportDeskStore`](../../../apps/referidos-android/src/shared/store/supportDeskStore.ts#L9)

Limpia o restablece `Selected Thread` como parte de este flujo.

- **Llamadas directas en el cuerpo** [`set`](../../../apps/referidos-android/src/shared/store/supportDeskStore.ts#L15).

### [`apps/referidos-android/src/shared/ui/BlockSkeleton.tsx`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L1)

Dibuja filas de marcador de carga con cantidad y variante compacta. Permite mostrar que una sección está consultando datos sin cubrir toda la aplicación.

**Superficie que exporta.** [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L9).

**Módulos que lo cargan.** [`AdminAppsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L5) (importa), [`AdminInicioScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L7) (importa), [`AdminSistemaScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L5) (importa), [`AdminSoporteScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L7) (importa), [`AdminSupportCatalogScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L5) (importa), [`AdminUsuariosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L5) (importa), [`AdminVersioningScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L5) (importa), [`AdminCollectionScreen.tsx`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L12) (importa), [`ClienteEscanerScreen.tsx`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L5) (importa), [`ClienteHistorialScreen.tsx`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L5) (importa), [`ClienteInicioScreen.tsx`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L6) (importa), [`NegocioEscanerScreen.tsx`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L5) (importa), [`NegocioGestionarScreen.tsx`](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx#L5) (importa), [`NegocioInicioScreen.tsx`](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx#L6) (importa), [`ClientePerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L13) (importa), [`NegocioPerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L13) (importa) y 8 más.

**Dependencias del archivo.** `react`, `react-native`.

#### [`Props`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L4) · tipo TypeScript

Describe la forma del contrato de `Props`, con campos `lines`, `compact`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `lines`, `compact`.

#### [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L9) · componente React · exportación por defecto

Monta `View`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{lines, compact}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `View`.
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L12).
- **Lo usa** [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L232) (renderiza), [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L309) (renderiza), [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L238) (renderiza), [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L282) (renderiza), [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L409) (renderiza), [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L442) (renderiza), [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L431) (renderiza), [`AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L107) (renderiza), [`ClienteEscanerScreen`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L160) (renderiza), [`ClienteHistorialScreen`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L144) (renderiza), [`ClienteInicioScreen`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L149) (renderiza), [`NegocioEscanerScreen`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L191) (renderiza) y 13 más.

#### [`styles`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L27) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L27).
- **Lo usa** [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L11) (accede al módulo).

### [`apps/referidos-android/src/shared/ui/FeaturePlaceholder.tsx`](../../../apps/referidos-android/src/shared/ui/FeaturePlaceholder.tsx#L1)

Componente provisional que alterna entre un skeleton y un texto después de un tiempo de simulación. Lo usa el antiguo `ScannerGateway` fuera de las pestañas activas.

**Superficie que exporta.** [`FeaturePlaceholder`](../../../apps/referidos-android/src/shared/ui/FeaturePlaceholder.tsx#L11).

**Módulos que lo cargan.** [`ScannerGateway.tsx`](../../../apps/referidos-android/src/features/scanner/ScannerGateway.tsx#L3) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@shared/ui/BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx).

#### [`Props`](../../../apps/referidos-android/src/shared/ui/FeaturePlaceholder.tsx#L5) · tipo TypeScript

Describe la forma del contrato de `Props`, con campos `feature`, `description`, `loadingMs`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `feature`, `description`, `loadingMs`.

#### [`FeaturePlaceholder`](../../../apps/referidos-android/src/shared/ui/FeaturePlaceholder.tsx#L11) · componente React · exportación por defecto

Monta `View`, `BlockSkeleton`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{feature, description, loadingMs}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[ready, setReady] mediante useState`.
- **Interfaz que monta** `View`, `BlockSkeleton`, `Text`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L9) (renderiza).
- **Lo usa** [`ScannerGateway`](../../../apps/referidos-android/src/features/scanner/ScannerGateway.tsx#L8) (renderiza).

#### [`useEffect · callback`](../../../apps/referidos-android/src/shared/ui/FeaturePlaceholder.tsx#L18) · callback de infraestructura · dentro de [`FeaturePlaceholder`](../../../apps/referidos-android/src/shared/ui/FeaturePlaceholder.tsx#L11)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `FeaturePlaceholder`.

- **Actualizaciones de estado o acciones** `setReady`, `clearTimeout`.
- **Efectos y APIs** `setTimeout`, `clearTimeout`.
- **Llamadas directas en el cuerpo** [`setReady`](../../../apps/referidos-android/src/shared/ui/FeaturePlaceholder.tsx#L19), [`setTimeout`](../../../apps/referidos-android/src/shared/ui/FeaturePlaceholder.tsx#L20), [`clearTimeout`](../../../apps/referidos-android/src/shared/ui/FeaturePlaceholder.tsx#L21).

#### [`setTimeout · callback`](../../../apps/referidos-android/src/shared/ui/FeaturePlaceholder.tsx#L20) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-android/src/shared/ui/FeaturePlaceholder.tsx#L18)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setReady`.
- **Llamadas directas en el cuerpo** [`setReady`](../../../apps/referidos-android/src/shared/ui/FeaturePlaceholder.tsx#L20).

#### [`styles`](../../../apps/referidos-android/src/shared/ui/FeaturePlaceholder.tsx#L38) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/shared/ui/FeaturePlaceholder.tsx#L38).
- **Lo usa** [`FeaturePlaceholder`](../../../apps/referidos-android/src/shared/ui/FeaturePlaceholder.tsx#L25) (accede al módulo).

### [`apps/referidos-android/src/shared/ui/GlobalLoader.tsx`](../../../apps/referidos-android/src/shared/ui/GlobalLoader.tsx#L1)

Renderiza indicador y texto de arranque global para estados que anteceden al montaje de rutas. Se usa también para comunicar un error de bootstrap con su etiqueta.

**Superficie que exporta.** [`GlobalLoader`](../../../apps/referidos-android/src/shared/ui/GlobalLoader.tsx#L8).

**Módulos que lo cargan.** [`App.tsx`](../../../apps/referidos-android/src/app/App.tsx#L13) (importa).

**Dependencias del archivo.** `react`, `react-native`.

#### [`Props`](../../../apps/referidos-android/src/shared/ui/GlobalLoader.tsx#L4) · tipo TypeScript

Describe la forma del contrato de `Props`, con campos `label`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `label`.

#### [`GlobalLoader`](../../../apps/referidos-android/src/shared/ui/GlobalLoader.tsx#L8) · componente React · exportación por defecto

Monta `View`, `ActivityIndicator`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{label}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `View`, `ActivityIndicator`, `Text`.
- **Lo usa** [`App`](../../../apps/referidos-android/src/app/App.tsx#L239) (renderiza).

#### [`styles`](../../../apps/referidos-android/src/shared/ui/GlobalLoader.tsx#L17) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/shared/ui/GlobalLoader.tsx#L17).
- **Lo usa** [`GlobalLoader`](../../../apps/referidos-android/src/shared/ui/GlobalLoader.tsx#L10) (accede al módulo).

### [`apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L1)

Lista eventos por nivel y dominio, ofrece búsqueda por texto y los identificadores de correlación y reutiliza las consultas de observabilidad. La misma base visual se puede montar desde distintos roles bajo sus permisos.

**Superficie que exporta.** [`ObservabilityEventFeed`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L73).

**Módulos que lo cargan.** [`AdminObservabilidadScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L7) (importa), [`SoporteInboxScreen.tsx`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L8) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts).

#### [`ObsDomain`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L14) · tipo TypeScript

Describe la forma del contrato de `Obs Domain`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`LevelFilter`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L15) · tipo TypeScript

Describe la forma del contrato de `Level Filter`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`Props`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L17) · tipo TypeScript

Describe la forma del contrato de `Props`, con campos `title`, `subtitle`, `defaultDomain`, `allowedDomains`, `limit`, `screenTag`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `title`, `subtitle`, `defaultDomain`, `allowedDomains`, `limit`, `screenTag`.

#### [`LEVEL_OPTIONS`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L26) · variable de módulo

Conserva la lista de `LEVEL OPTIONS` usada por el módulo.

- **Lo usa** [`ObservabilityEventFeed`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L143) (accede al módulo).

#### [`normalizeDomain`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L28) · función

Normaliza `Domain` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Condiciones que evalúa** `value`.
- **Lo usa** [`ObservabilityEventFeed`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L87) (llama).

#### [`shortId`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L34) · función

Implementa `short Id` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de text`, `text.length`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L35), [`text.slice`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L38).
- **Lo usa** [`ObservabilityEventFeed`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L233) (llama).

#### [`readContextObject`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L41) · función

Extrae o interpreta `Context Object` de los argumentos, estado o datos de entrada.

- **Entradas** `value`.
- **Condiciones que evalúa** `value y object y ausencia de Array.isArray`.
- **Lo usa** [`toSearchBucket`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L49) (llama), [`ObservabilityEventFeed`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L209) (llama).

#### [`toSearchBucket`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L48) · función

Implementa `to Search Bucket` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`readContextObject`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L49), [`toLowerCase`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L50), [`join`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L50).
- **Lo usa** [`filteredEvents`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L133) (llama).

#### [`levelChipStyle`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L65) · función

Implementa `level Chip Style` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `level`.
- **Condiciones que evalúa** `safeLevel`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L66).
- **Lo usa** [`ObservabilityEventFeed`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L220) (llama).

#### [`ObservabilityEventFeed`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L73) · componente React · exportación por defecto

Monta `View`, `Text`, `Pressable`, `TextInput`, `ActivityIndicator`, `ScrollView`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, subtitle, defaultDomain, allowedDomains, limit, screenTag}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[loading, setLoading] mediante useState`, `[error, setError] mediante useState`, `[events, setEvents] mediante useState`, `[search, setSearch] mediante useState`, `[levelFilter, setLevelFilter] mediante useState`, `[domainFilter, setDomainFilter] mediante useState`.
- **Interfaz que monta** `View`, `Text`, `Pressable`, `TextInput`, `ActivityIndicator`, `ScrollView`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama).
- **Llamadas directas en el cuerpo** [`normalizeDomain`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L87), [`LEVEL_OPTIONS.map`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L143), [`level.toUpperCase`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L152), [`domainOptions.map`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L161), [`toUpperCase`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L170), [`filteredEvents.map`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L208), [`readContextObject`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L209), [`toLowerCase`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L210), [`levelChipStyle`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L220), [`formatDateTime`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L222), [`shortId`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L233).
- **Lo usa** [`AdminObservabilidadScreen`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L37) (renderiza), [`SoporteInboxScreen`](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx#L350) (renderiza).

#### [`domainOptions`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L90) · cálculo memorizado · dentro de [`ObservabilityEventFeed`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L73)

Función auxiliar de `ObservabilityEventFeed` para `domain Options`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de allowedDomains.length`, `allowedDomains.length`.
- **Lo usa** [`ObservabilityEventFeed`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L161) (accede al módulo).

#### [`loadEvents`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L96) · callback React · asíncrona · dentro de [`ObservabilityEventFeed`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L73)

Obtiene o resuelve el valor de eventos para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setError`, `setEvents`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`fetchObservabilityEvents`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L204) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia), [`observability`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L14) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L97), [`setError`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L98), [`fetchObservabilityEvents`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L99), [`setEvents`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L106), [`observability.track`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L108).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L127) (llama), [`ObservabilityEventFeed`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L128) (referencia), [`Pressable.onPress`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L187) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L126) · callback de infraestructura · dentro de [`ObservabilityEventFeed`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L73)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ObservabilityEventFeed`.

- **Llamadas directas en el cuerpo** [`loadEvents`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L127).

#### [`filteredEvents`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L130) · cálculo memorizado · dentro de [`ObservabilityEventFeed`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L73)

Procesa `ed Events` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de term`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L131), [`search.trim`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L131), [`events.filter`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L133), [`includes`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L133), [`toSearchBucket`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L133).
- **Lo usa** [`ObservabilityEventFeed`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L201) (accede al módulo).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L148) · callback JSX · dentro de [`ObservabilityEventFeed`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L73)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setLevelFilter`.
- **Llamadas directas en el cuerpo** [`setLevelFilter`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L148).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L166) · callback JSX · dentro de [`ObservabilityEventFeed`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L73)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setDomainFilter`.
- **Llamadas directas en el cuerpo** [`setDomainFilter`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L166).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L187) · callback JSX · dentro de [`ObservabilityEventFeed`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L73)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`loadEvents`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L187).

#### [`styles`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L244) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L244).
- **Lo usa** [`levelChipStyle`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L67) (accede al módulo), [`ObservabilityEventFeed`](../../../apps/referidos-android/src/shared/ui/ObservabilityEventFeed.tsx#L137) (accede al módulo).

### [`apps/referidos-android/src/shared/ui/ScreenScaffold.tsx`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L1)

Proporciona layout de pantalla con encabezado, subtítulo o nombre de ruta y distintivo del rol. Es base visual para las pantallas que manejan su propio scroll o contenido.

**Superficie que exporta.** [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12).

**Módulos que lo cargan.** [`AdminAppsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L3) (importa), [`AdminDocumentationScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L3) (importa), [`AdminInicioScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L5) (importa), [`AdminLegalScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminLegalScreen.tsx#L3) (importa), [`AdminObservabilidadScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L5) (importa), [`AdminSistemaScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L3) (importa), [`AdminSoporteScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L5) (importa), [`AdminSupportCatalogScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L3) (importa), [`AdminUsuariosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L3) (importa), [`AdminVersioningScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L3) (importa), [`AdminCollectionScreen.tsx`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L10) (importa), [`AuthFlowScreen.tsx`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L11) (importa), [`ClienteEscanerScreen.tsx`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L3) (importa), [`ClienteHistorialScreen.tsx`](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx#L3) (importa), [`ClienteInicioScreen.tsx`](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx#L4) (importa), [`NegocioEscanerScreen.tsx`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L3) (importa) y 14 más.

**Dependencias del archivo.** `react`, `@react-navigation/native`, `react-native`, [`@shared/store/appStore`](../../../apps/referidos-android/src/shared/store/appStore.ts).

#### [`Props`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L6) · tipo TypeScript

Describe la forma del contrato de `Props`, con campos `title`, `subtitle`, `children`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `title`, `subtitle`, `children`.

#### [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) · componente React · exportación por defecto

Monta `View`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, subtitle, children}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `role mediante useAppStore`, `selector state.role`.
- **Interfaz que monta** `View`, `Text`.
- **Hooks que llama** `useRoute`, `useAppStore`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37) (llama).
- **Llamadas directas en el cuerpo** [`role.toUpperCase`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L21).
- **Lo usa** [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L161) (renderiza), [`AdminDocumentationScreen`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L22) (renderiza), [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L294) (renderiza), [`AdminLegalScreen`](../../../apps/referidos-android/src/features/admin/AdminLegalScreen.tsx#L9) (renderiza), [`AdminObservabilidadScreen`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L13) (renderiza), [`AdminSistemaScreen`](../../../apps/referidos-android/src/features/admin/AdminSistemaScreen.tsx#L222) (renderiza), [`AdminSoporteScreen`](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx#L244) (renderiza), [`AdminSupportCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminSupportCatalogScreen.tsx#L291) (renderiza), [`AdminUsuariosScreen`](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx#L307) (renderiza), [`AdminVersioningScreen`](../../../apps/referidos-android/src/features/admin/AdminVersioningScreen.tsx#L363) (renderiza), [`AdminCollectionScreen`](../../../apps/referidos-android/src/features/admin/components/AdminCollectionScreen.tsx#L74) (renderiza), [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L68) (renderiza) y 18 más.

#### [`styles`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L30) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L30).
- **Lo usa** [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L18) (accede al módulo).

### [`apps/referidos-android/src/shared/ui/SectionCard.tsx`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L1)

Agrupa contenido bajo título y subtítulo opcional, con lugar para acción o métrica lateral. Reduce la duplicación de contenedores en perfiles, soporte y admin.

**Superficie que exporta.** [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11).

**Módulos que lo cargan.** [`AdminAnalyticsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L4) (importa), [`AdminAppsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L4) (importa), [`AdminDatosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L4) (importa), [`AdminDocumentationScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L4) (importa), [`AdminErrorCatalogScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L4) (importa), [`AdminInicioScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L6) (importa), [`AdminIssueEventDetailScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L5) (importa), [`AdminIssueEventsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L5) (importa), [`AdminIssuesScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L5) (importa), [`AdminLegalScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminLegalScreen.tsx#L4) (importa), [`AdminLogsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L4) (importa), [`AdminNegociosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L4) (importa), [`AdminObservabilidadScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx#L6) (importa), [`AdminPromosScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminPromosScreen.tsx#L4) (importa), [`AdminQRsScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminQRsScreen.tsx#L4) (importa), [`AdminReportesScreen.tsx`](../../../apps/referidos-android/src/features/admin/AdminReportesScreen.tsx#L4) (importa) y 27 más.

**Dependencias del archivo.** `react`, `react-native`.

#### [`Props`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L4) · tipo TypeScript

Describe la forma del contrato de `Props`, con campos `title`, `subtitle`, `right`, `children`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `title`, `subtitle`, `right`, `children`.

#### [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) · componente React · exportación por defecto

Monta `View`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, subtitle, right, children}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `View`, `Text`.
- **Lo usa** [`AdminAnalyticsScreen`](../../../apps/referidos-android/src/features/admin/AdminAnalyticsScreen.tsx#L132) (renderiza), [`AdminAppsScreen`](../../../apps/referidos-android/src/features/admin/AdminAppsScreen.tsx#L166) (renderiza), [`AdminDatosScreen`](../../../apps/referidos-android/src/features/admin/AdminDatosScreen.tsx#L155) (renderiza), [`AdminDocumentationScreen`](../../../apps/referidos-android/src/features/admin/AdminDocumentationScreen.tsx#L24) (renderiza), [`AdminErrorCatalogScreen`](../../../apps/referidos-android/src/features/admin/AdminErrorCatalogScreen.tsx#L106) (renderiza), [`AdminInicioScreen`](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx#L296) (renderiza), [`AdminIssueEventDetailScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventDetailScreen.tsx#L76) (renderiza), [`AdminIssueEventsScreen`](../../../apps/referidos-android/src/features/admin/AdminIssueEventsScreen.tsx#L129) (renderiza), [`AdminIssuesScreen`](../../../apps/referidos-android/src/features/admin/AdminIssuesScreen.tsx#L106) (renderiza), [`AdminLegalScreen`](../../../apps/referidos-android/src/features/admin/AdminLegalScreen.tsx#L11) (renderiza), [`AdminLogsScreen`](../../../apps/referidos-android/src/features/admin/AdminLogsScreen.tsx#L108) (renderiza), [`AdminNegociosScreen`](../../../apps/referidos-android/src/features/admin/AdminNegociosScreen.tsx#L124) (renderiza) y 35 más.

#### [`styles`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L26) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L26).
- **Lo usa** [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L13) (accede al módulo).
