# Android · Pantallas por función y rol · 7 de 9

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L1)
- [`apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L1)
- [`apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L1)
- [`apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L1)
- [`apps/referidos-android/src/features/profile/profileFaqContent.ts`](../../../apps/referidos-android/src/features/profile/profileFaqContent.ts#L1)
- [`apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L1)
- [`apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L1)
- [`apps/referidos-android/src/features/scanner/ScannerGateway.tsx`](../../../apps/referidos-android/src/features/scanner/ScannerGateway.tsx#L1)

## Símbolos y conexiones

### [`apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L1)

Delega al servicio de seguridad alta, modificación y comprobación de PIN/biometría y la reautenticación local. Gestiona mensajes, loading y cambios de email/contraseña. La autorización sensible que representa la interfaz necesita garantía del servidor.

**Superficie que exporta.** [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L29).

**Módulos que lo cargan.** [`ClientePerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L19) (importa), [`NegocioPerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L19) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/store/appStore`](../../../apps/referidos-android/src/shared/store/appStore.ts), [`@shared/store/securityStore`](../../../apps/referidos-android/src/shared/store/securityStore.ts), [`@shared/security/localAccessSecurity`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts).

#### [`Props`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L19) · tipo TypeScript

Describe la forma del contrato de `Props`, con campos `usuario`, `onReload`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `usuario`, `onReload`.

#### [`isValidEmail`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L24) · función

Comprueba `Valid Email` para decidir si se admite o continúa la operación.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L25), [`test`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L26).
- **Lo usa** [`handleSendReauthEmail`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L163) (llama), [`handleChangeEmail`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L186) (llama).

#### [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L29) · componente React · exportación por defecto

Monta `View`, `Text`, `TextInput`, `Pressable`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{usuario, onReload}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `accessMethods mediante useAppStore`, `selector state.accessMethods`, `setAccessMethods mediante useAppStore`, `selector state.setAccessMethods`, `[pinSetup, setPinSetup] mediante useState`, `[pinVerify, setPinVerify] mediante useState`, `[reauthSending, setReauthSending] mediante useState`, `[actionLoading, setActionLoading] mediante useState`, `[newEmail, setNewEmail] mediante useState`, `[newPassword, setNewPassword] mediante useState`, `[newPasswordConfirm, setNewPasswordConfirm] mediante useState`, `[error, setError] mediante useState`, `[info, setInfo] mediante useState`.
- **Interfaz que monta** `View`, `Text`, `TextInput`, `Pressable`.
- **Hooks que llama** `useAppStore`, `useSecurityStore`, `useState`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37) (llama), [`useSecurityStore`](../../../apps/referidos-android/src/shared/store/securityStore.ts#L63) (llama), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L46), [`readFirst`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L46), [`newEmail.trim`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L344).
- **Lo usa** [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L466) (renderiza), [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L527) (renderiza).

#### [`unlockExpiresLabel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L52) · cálculo memorizado · dentro de [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L29)

Función auxiliar de `AccessSecurityPanel` para `unlock Expires Label`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de unlockExpiresAt`.
- **Llamadas directas en el cuerpo** [`toLocaleTimeString`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L54).
- **Lo usa** [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L235) (referencia).

#### [`requireSensitive`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L57) · función · dentro de [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L29)

Comprueba `Sensitive` para decidir si se admite o continúa la operación.

- **Entradas** `action`.
- **Retorno visible o tipo declarado** `booleano`.
- **Actualizaciones de estado o acciones** `setError`.
- **Condiciones que evalúa** `requirement.ok`.
- **Usa código de** [`requireSecurityForAction`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L58) (llama).
- **Llamadas directas en el cuerpo** [`requireSecurityForAction`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L58), [`setError`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L60).
- **Lo usa** [`handleSavePin`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L81) (llama), [`handleDisablePin`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L113) (llama), [`handleEnrollBiometric`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L126) (llama), [`handleDisableBiometric`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L149) (llama), [`handleChangeEmail`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L185) (llama), [`handleChangePassword`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L202) (llama).

#### [`runAction`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L68) · función · asíncrona · dentro de [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L29)

Maneja el valor de acción y coordina las acciones indicadas abajo.

- **Entradas** `fn`.
- **Actualizaciones de estado o acciones** `setError`, `setInfo`, `setActionLoading`.
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L69), [`setInfo`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L70), [`setActionLoading`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L71), [`fn`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L73).
- **Lo usa** [`handleSavePin`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L80) (llama), [`handleVerifyPin`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L98) (llama), [`handleDisablePin`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L112) (llama), [`handleEnrollBiometric`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L125) (llama), [`handleUnlockBiometric`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L138) (llama), [`handleDisableBiometric`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L148) (llama), [`handleChangeEmail`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L184) (llama), [`handleChangePassword`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L201) (llama).

#### [`handleSavePin`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L79) · función · dentro de [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L29)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Actualizaciones de estado o acciones** `setError`, `setPinSetup`, `setAccessMethods`, `setInfo`.
- **Condiciones que evalúa** `ausencia de requireSensitive`, `ausencia de result.ok`.
- **Usa código de** [`configurePinAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L77) (llama).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L80), [`requireSensitive`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L81), [`configurePinAccess`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L82), [`setError`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L88), [`setPinSetup`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L91), [`setAccessMethods`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L92), [`setInfo`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L93), [`onReload`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L94).
- **Lo usa** [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L256) (pasa a onPress).

#### [`handleVerifyPin`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L97) · función · dentro de [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L29)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Actualizaciones de estado o acciones** `setError`, `setPinVerify`, `setInfo`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`verifyPinAndUnlock`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L120) (llama).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L98), [`verifyPinAndUnlock`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L99), [`setError`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L104), [`setPinVerify`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L107), [`setInfo`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L108).
- **Lo usa** [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L279) (pasa a onPress).

#### [`handleDisablePin`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L111) · función · dentro de [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L29)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Actualizaciones de estado o acciones** `setError`, `setAccessMethods`, `setInfo`.
- **Condiciones que evalúa** `ausencia de requireSensitive`, `ausencia de result.ok`.
- **Usa código de** [`disablePinAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L164) (llama).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L112), [`requireSensitive`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L113), [`disablePinAccess`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L114), [`setError`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L116), [`setAccessMethods`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L119), [`setInfo`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L120), [`onReload`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L121).
- **Lo usa** [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L263) (pasa a onPress).

#### [`handleEnrollBiometric`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L124) · función · dentro de [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L29)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Actualizaciones de estado o acciones** `setError`, `setAccessMethods`, `setInfo`.
- **Condiciones que evalúa** `ausencia de requireSensitive`, `ausencia de result.ok`.
- **Usa código de** [`enrollBiometricAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L179) (llama).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L125), [`requireSensitive`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L126), [`enrollBiometricAccess`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L127), [`setError`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L129), [`setAccessMethods`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L132), [`setInfo`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L133), [`onReload`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L134).
- **Lo usa** [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L291) (pasa a onPress).

#### [`handleUnlockBiometric`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L137) · función · dentro de [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L29)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Actualizaciones de estado o acciones** `setError`, `setInfo`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`unlockWithBiometricAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L215) (llama).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L138), [`unlockWithBiometricAccess`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L139), [`setError`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L141), [`setInfo`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L144).
- **Lo usa** [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L306) (pasa a onPress).

#### [`handleDisableBiometric`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L147) · función · dentro de [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L29)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Actualizaciones de estado o acciones** `setError`, `setAccessMethods`, `setInfo`.
- **Condiciones que evalúa** `ausencia de requireSensitive`, `ausencia de result.ok`.
- **Usa código de** [`disableBiometricAccess`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L243) (llama).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L148), [`requireSensitive`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L149), [`disableBiometricAccess`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L150), [`setError`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L152), [`setAccessMethods`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L155), [`setInfo`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L156), [`onReload`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L157).
- **Lo usa** [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L298) (pasa a onPress).

#### [`handleSendReauthEmail`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L160) · función · asíncrona · dentro de [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L29)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Actualizaciones de estado o acciones** `setError`, `setInfo`, `setReauthSending`.
- **Condiciones que evalúa** `ausencia de isValidEmail`, `ausencia de result.ok`.
- **Usa código de** [`sendSensitiveReauthEmail`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L257) (llama).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L161), [`setInfo`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L162), [`isValidEmail`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L163), [`setReauthSending`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L167), [`sendSensitiveReauthEmail`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L168).
- **Lo usa** [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L319) (pasa a onPress).

#### [`handleConfirmReauth`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L177) · función · dentro de [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L29)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Actualizaciones de estado o acciones** `setError`, `setInfo`.
- **Usa código de** [`confirmSensitiveReauth`](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts#L281) (llama).
- **Llamadas directas en el cuerpo** [`confirmSensitiveReauth`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L178), [`setError`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L179), [`setInfo`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L180).
- **Lo usa** [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L327) (pasa a onPress).

#### [`handleChangeEmail`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L183) · función · dentro de [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L29)

Opera sobre Auth `updateUser`. El resultado se adapta al contrato del consumidor.

- **Recibe eventos de** `Pressable.onPress`.
- **Actualizaciones de estado o acciones** `setError`, `setInfo`, `setNewEmail`.
- **Condiciones que evalúa** `ausencia de requireSensitive`, `ausencia de isValidEmail`, `updateError`.
- **Contrato de datos** Auth `updateUser` en [`AccessSecurityPanel.tsx:190`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L190).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L184), [`requireSensitive`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L185), [`isValidEmail`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L186), [`setError`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L187), [`supabase.auth.updateUser`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L190), [`newEmail.trim`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L190), [`setInfo`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L195), [`setNewEmail`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L196), [`onReload`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L197).
- **Lo usa** [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L343) (pasa a onPress).

#### [`handleChangePassword`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L200) · función · dentro de [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L29)

Opera sobre Auth `updateUser`. El resultado se adapta al contrato del consumidor.

- **Recibe eventos de** `Pressable.onPress`.
- **Actualizaciones de estado o acciones** `setError`, `setInfo`, `setNewPassword`, `setNewPasswordConfirm`, `setAccessMethods`.
- **Condiciones que evalúa** `ausencia de requireSensitive`, `newPassword.length`, `ausencia de test`, `newPassword`, `updateError`.
- **Contrato de datos** Auth `updateUser` en [`AccessSecurityPanel.tsx:215`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L215).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo).
- **Llamadas directas en el cuerpo** [`runAction`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L201), [`requireSensitive`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L202), [`setError`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L204), [`test`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L207), [`supabase.auth.updateUser`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L215), [`setInfo`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L222), [`setNewPassword`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L223), [`setNewPasswordConfirm`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L224), [`setAccessMethods`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L225), [`onReload`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L226).
- **Lo usa** [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L365) (pasa a onPress).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L250) · callback JSX · dentro de [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L29)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setPinSetup`.
- **Efectos y APIs** `value.replace`.
- **Llamadas directas en el cuerpo** [`setPinSetup`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L250), [`slice`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L250), [`value.replace`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L250).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L274) · callback JSX · dentro de [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L29)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setPinVerify`.
- **Efectos y APIs** `value.replace`.
- **Llamadas directas en el cuerpo** [`setPinVerify`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L274), [`slice`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L274), [`value.replace`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L274).

#### [`styles`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L382) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L382).
- **Lo usa** [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L230) (accede al módulo).

### [`apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L1)

Encapsula secciones FAQ, preferencias y beneficios. Usa el rol para mostrar tier/beneficios de cliente o plan/beneficios de negocio.

**Superficie que exporta.** [`ProfileFaqSection`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L6), [`ProfileBenefitsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L48), [`ProfilePreferencesSection`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L82).

**Módulos que lo cargan.** [`ClientePerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L25) (importa), [`NegocioPerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L25) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`../profileFaqContent`](../../../apps/referidos-android/src/features/profile/profileFaqContent.ts).

#### [`ProfileFaqSection`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L6) · componente React · exportado

Monta `SectionCard`, `View`, `Text`, `Pressable`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{audience}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[expandedId, setExpandedId] mediante useState`.
- **Interfaz que monta** `SectionCard`, `View`, `Text`, `Pressable`.
- **Hooks que llama** `useState`.
- **Usa código de** [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza).
- **Llamadas directas en el cuerpo** [`sections.map`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L17), [`section.items.map`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L20), [`item.answer.map`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L31).
- **Lo usa** [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L491) (renderiza), [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L552) (renderiza).

#### [`sections`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L11) · cálculo memorizado · dentro de [`ProfileFaqSection`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L6)

Función auxiliar de `ProfileFaqSection` para `sections`.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`getFaqSectionsForAudience`](../../../apps/referidos-android/src/features/profile/profileFaqContent.ts#L255) (llama).
- **Llamadas directas en el cuerpo** [`getFaqSectionsForAudience`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L11).
- **Lo usa** [`ProfileFaqSection`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L17) (accede al módulo).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L25) · callback JSX · dentro de [`ProfileFaqSection`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L6)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setExpandedId`.
- **Llamadas directas en el cuerpo** [`setExpandedId`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L25).

#### [`ProfileBenefitsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L48) · componente React · exportado

Monta `SectionCard`, `View`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{role, accountLabel, accountHelper}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SectionCard`, `View`, `Text`.
- **Usa código de** [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza).
- **Lo usa** [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L413) (renderiza), [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L474) (renderiza).

#### [`ProfilePreferencesSection`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L82) · componente React · exportado

Monta `View`, `SectionCard`, `Pressable`, `Text`, `TextInput`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{role}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[theme, setTheme] mediante useState`, `[language, setLanguage] mediante useState`, `[feedbackMessage, setFeedbackMessage] mediante useState`, `[feedbackEmail, setFeedbackEmail] mediante useState`, `[feedbackSent, setFeedbackSent] mediante useState`.
- **Interfaz que monta** `View`, `SectionCard`, `Pressable`, `Text`, `TextInput`.
- **Hooks que llama** `useState`.
- **Usa código de** [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza).
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L97).
- **Lo usa** [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L485) (renderiza), [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L546) (renderiza).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L102) · callback JSX · dentro de [`ProfilePreferencesSection`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L82)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setTheme`.
- **Llamadas directas en el cuerpo** [`setTheme`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L102).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L122) · callback JSX · dentro de [`ProfilePreferencesSection`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L82)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setLanguage`.
- **Llamadas directas en el cuerpo** [`setLanguage`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L122).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L135) · callback JSX · dentro de [`ProfilePreferencesSection`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L82)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setFeedbackSent`, `setFeedbackMessage`.
- **Llamadas directas en el cuerpo** [`setFeedbackSent`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L136), [`setFeedbackMessage`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L137), [`value.slice`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L137).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L147) · callback JSX · dentro de [`ProfilePreferencesSection`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L82)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setFeedbackSent`, `setFeedbackEmail`.
- **Llamadas directas en el cuerpo** [`setFeedbackSent`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L148), [`setFeedbackEmail`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L149).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L155) · callback JSX · dentro de [`ProfilePreferencesSection`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L82)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setFeedbackSent`.
- **Llamadas directas en el cuerpo** [`setFeedbackSent`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L155), [`feedbackMessage.trim`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L155).

#### [`styles`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L168) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L168).
- **Lo usa** [`ProfileFaqSection`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L16) (accede al módulo), [`ProfileBenefitsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L62) (accede al módulo), [`ProfilePreferencesSection`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L94) (accede al módulo).

### [`apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L1)

Alberga proveedores vinculados, notificaciones y sesiones. Registra el dispositivo al cargar sesiones, lista y revoca sesiones con servicios del runtime y mantiene preferencias de notificaciones en este dispositivo.

**Superficie que exporta.** [`LinkedProvidersSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L27), [`NotificationsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L67), [`SessionsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L144).

**Módulos que lo cargan.** [`AdminPerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L8) (importa), [`ClientePerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L20) (importa), [`NegocioPerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L20) (importa), [`SoportePerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L14) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/ui/BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx), [`@shared/hooks/useRoleNotifications`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts), [`@shared/services/appNotifications`](../../../apps/referidos-android/src/shared/services/appNotifications.ts), [`@shared/services/sessionDevices`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts).

#### [`PROVIDER_META`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L18) · variable de módulo

Declara `PROVIDER_META` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`LinkedProvidersSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L37) (accede al módulo).

#### [`LinkedProvidersSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L27) · componente React · exportado

Monta `SectionCard`, `View`, `Text`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{providers, primaryProvider, appleEnabled}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SectionCard`, `View`, `Text`.
- **Usa código de** [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza).
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L36), [`toLowerCase`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L36), [`trim`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L36), [`PROVIDER_META.filter`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L37), [`normalized.has`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L38), [`visibleProviders.map`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L43).
- **Lo usa** [`AdminPerfilScreen`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L70) (renderiza), [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L473) (renderiza), [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L534) (renderiza), [`SoportePerfilScreen`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L161) (renderiza).

#### [`NotificationsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L67) · componente React · exportado

Monta `SectionCard`, `View`, `Pressable`, `Text`, `BlockSkeleton`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{role}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[prefs, setPrefs] mediante useState`.
- **Interfaz que monta** `SectionCard`, `View`, `Pressable`, `Text`, `BlockSkeleton`.
- **Hooks que llama** `useRoleNotifications`, `useState`, `useEffect`.
- **Usa código de** [`useRoleNotifications`](../../../apps/referidos-android/src/shared/hooks/useRoleNotifications.ts#L22) (llama), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`getDeviceNotificationPermissionLabel`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L180) (llama), [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L9) (renderiza).
- **Llamadas directas en el cuerpo** [`getDeviceNotificationPermissionLabel`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L93), [`map`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L106), [`notifications.rows.map`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L122).
- **Lo usa** [`AdminPerfilScreen`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L75) (renderiza), [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L484) (renderiza), [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L545) (renderiza), [`SoportePerfilScreen`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L166) (renderiza).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L75) · callback de infraestructura · dentro de [`NotificationsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L67)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NotificationsSection`.

- **Actualizaciones de estado o acciones** `setPrefs`.
- **Condiciones que evalúa** `mounted`.
- **Usa código de** [`getNotificationPrefs`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L152) (llama).
- **Llamadas directas en el cuerpo** [`then`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L77), [`getNotificationPrefs`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L77), [`setPrefs`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L78).

#### [`handleTogglePref`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L85) · callback React · asíncrona · dentro de [`NotificationsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L67)

Maneja `Toggle Pref` y coordina las acciones indicadas abajo.

- **Entradas** `key`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setPrefs`.
- **Usa código de** [`toggleNotificationPref`](../../../apps/referidos-android/src/shared/services/appNotifications.ts#L171) (llama).
- **Llamadas directas en el cuerpo** [`toggleNotificationPref`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L86), [`setPrefs`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L87).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L109) (llama).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L96) · callback JSX · dentro de [`NotificationsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L67)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`notifications.refresh`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L96).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L99) · callback JSX · dentro de [`NotificationsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L67)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `markAllRead`.
- **Llamadas directas en el cuerpo** [`notifications.markAllRead`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L99).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L109) · callback JSX · dentro de [`NotificationsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L67)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleTogglePref`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L109).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L131) · callback JSX · dentro de [`NotificationsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L67)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `markRead`.
- **Llamadas directas en el cuerpo** [`notifications.markRead`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L131).

#### [`SessionsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L144) · componente React · exportado

Monta `SectionCard`, `View`, `Pressable`, `Text`, `BlockSkeleton`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onCurrentSessionRevoked}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[loading, setLoading] mediante useState`, `[error, setError] mediante useState`, `[rows, setRows] mediante useState`.
- **Interfaz que monta** `SectionCard`, `View`, `Pressable`, `Text`, `BlockSkeleton`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx#L9) (renderiza).
- **Llamadas directas en el cuerpo** [`rows.map`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L217).
- **Lo usa** [`AdminPerfilScreen`](../../../apps/referidos-android/src/features/profile/AdminPerfilScreen.tsx#L76) (renderiza), [`ClientePerfilScreen`](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx#L478) (renderiza), [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L539) (renderiza), [`SoportePerfilScreen`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L167) (renderiza).

#### [`loadSessions`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L153) · callback React · asíncrona · dentro de [`SessionsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L144)

Obtiene o resuelve `Sessions` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setError`, `setRows`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`registerCurrentSessionDevice`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L133) (llama), [`listCurrentUserSessions`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L142) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L154), [`setError`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L155), [`registerCurrentSessionDevice`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L156), [`listCurrentUserSessions`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L157), [`setRows`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L159).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L169) (llama), [`SessionsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L170) (referencia), [`handleCloseSession`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L182) (llama), [`handleCloseOtherSessions`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L195) (llama), [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L204) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L168) · callback de infraestructura · dentro de [`SessionsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L144)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SessionsSection`.

- **Llamadas directas en el cuerpo** [`loadSessions`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L169).

#### [`handleCloseSession`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L172) · callback React · asíncrona · dentro de [`SessionsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L144)

Maneja `Close Session` y coordina las acciones indicadas abajo.

- **Entradas** `session`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`.
- **Condiciones que evalúa** `ausencia de result.ok`, `result.current_session_revoked`.
- **Usa código de** [`revokeSessionById`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L152) (llama).
- **Llamadas directas en el cuerpo** [`revokeSessionById`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L173), [`setError`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L175), [`onCurrentSessionRevoked`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L179), [`loadSessions`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L182).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L228) (llama).

#### [`handleCloseOtherSessions`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L185) · callback React · asíncrona · dentro de [`SessionsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L144)

Maneja `Close Other Sessions` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`.
- **Condiciones que evalúa** `ausencia de result.ok`, `result.current_session_revoked`.
- **Usa código de** [`revokeAllSessions`](../../../apps/referidos-android/src/shared/services/sessionDevices.ts#L156) (llama).
- **Llamadas directas en el cuerpo** [`revokeAllSessions`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L186), [`setError`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L188), [`onCurrentSessionRevoked`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L192), [`loadSessions`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L195).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L207) (llama).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L204) · callback JSX · dentro de [`SessionsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L144)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`loadSessions`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L204).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L207) · callback JSX · dentro de [`SessionsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L144)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleCloseOtherSessions`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L207).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L228) · callback JSX · dentro de [`SessionsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L144)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleCloseSession`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L228).

#### [`styles`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L239) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L239).
- **Lo usa** [`LinkedProvidersSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L47) (accede al módulo), [`NotificationsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L95) (accede al módulo), [`SessionsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L203) (accede al módulo).

### [`apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L1)

Adapta el perfil al titular de un negocio y carga la ficha comercial además de los datos personales. Reutiliza los paneles de seguridad, sesiones, FAQ y notificaciones, con soporte y acciones de cuenta para su rol.

**Superficie que exporta.** [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46).

**Módulos que lo cargan.** [`RoleTabs.tsx`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L14) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/ui/BlockSkeleton`](../../../apps/referidos-android/src/shared/ui/BlockSkeleton.tsx), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/store/appStore`](../../../apps/referidos-android/src/shared/store/appStore.ts), [`@shared/store/modalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts), [`@shared/constants/supportCategories`](../../../apps/referidos-android/src/shared/constants/supportCategories.ts), [`@shared/services/systemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts), [`./components/AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx), [`./components/ProfileRuntimePanels`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx), [`./components/ProfileExtendedSections`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts), [`@shared/services/accountLifecycle`](../../../apps/referidos-android/src/shared/services/accountLifecycle.ts).

#### [`ProfileTab`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L40) · tipo TypeScript

Describe la forma del contrato de `Profile Tab`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`generateClientRequestId`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L42) · función

Implementa `generate Client Request Id` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Llamadas directas en el cuerpo** [`slice`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L43), [`toString`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L43).
- **Lo usa** [`handleCreateTicket`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L208) (llama).

#### [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `View`, `Pressable`, `Text`, `SectionCard`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `onboarding mediante useAppStore`, `selector state.onboarding`, `bootstrapAuth mediante useAppStore`, `selector state.bootstrapAuth`, `signOut mediante useAppStore`, `selector state.signOut`, `openConfirm mediante useModalStore`, `selector state.openConfirm`, `openAlert mediante useModalStore`, `selector state.openAlert`, `openPicker mediante useModalStore`, `selector state.openPicker`, `[profileTab, setProfileTab] mediante useState`, `[business, setBusiness] mediante useState` y 12 más.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `View`, `Pressable`, `Text`, `SectionCard`, `TextInput`, `ProfileBenefitsSection`, `AccessSecurityPanel`, `LinkedProvidersSection`, `SessionsSection`, `NotificationsSection`, `ProfilePreferencesSection`, `ProfileFaqSection`, `BlockSkeleton`.
- **Hooks que llama** `useAppStore`, `useModalStore`, `useState`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37) (llama), [`useModalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70) (llama), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`ProfileBenefitsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L48) (renderiza), [`AccessSecurityPanel`](../../../apps/referidos-android/src/features/profile/components/AccessSecurityPanel.tsx#L29) (renderiza), [`LinkedProvidersSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L27) (renderiza), [`SessionsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L144) (renderiza), [`NotificationsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L67) (renderiza) y 5 más.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L88), [`trim`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L88), [`readFirst`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L90), [`map`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L397), [`visibleCategories.find`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L566), [`visibleCategories.map`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L573), [`tickets.map`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L636), [`toDisplayStatus`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L643), [`formatDateTime`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L650).
- **Lo usa** [`NegocioTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L133) (referencia).

#### [`visibleCategories`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L76) · cálculo memorizado · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Función auxiliar de `NegocioPerfilScreen` para `visible Categories`.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`SUPPORT_CHAT_CATEGORIES`](../../../apps/referidos-android/src/shared/constants/supportCategories.ts#L10) (accede al módulo).
- **Llamadas directas en el cuerpo** [`SUPPORT_CHAT_CATEGORIES.filter`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L76), [`item.roles.includes`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L76).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L93) (accede al módulo), [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L97) (referencia), [`openCategoryPicker`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L238) (accede al módulo).

#### [`linkedProviders`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L79) · cálculo memorizado · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Función auxiliar de `NegocioPerfilScreen` para `linked Providers`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `usuario.email`.
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L81), [`map`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L81), [`toLowerCase`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L82), [`trim`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L82), [`unique.add`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L85).
- **Lo usa** [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L535) (pasa a providers).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L92) · callback de infraestructura · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioPerfilScreen`.

- **Actualizaciones de estado o acciones** `setCategory`.
- **Condiciones que evalúa** `ausencia de visibleCategories.length`, `ausencia de visibleCategories.some`.
- **Llamadas directas en el cuerpo** [`visibleCategories.some`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L94), [`setCategory`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L95).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L99) · callback de infraestructura · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioPerfilScreen`.

- **Actualizaciones de estado o acciones** `setOwnerDraft`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`setOwnerDraft`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L100), [`trim`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L101), [`readFirst`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L101).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L106) · callback de infraestructura · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioPerfilScreen`.

- **Actualizaciones de estado o acciones** `setBusinessDraft`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`setBusinessDraft`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L107), [`trim`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L108), [`readFirst`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L108).

#### [`loadBusiness`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L114) · callback React · asíncrona · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Obtiene o resuelve el valor de negocio para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setBusiness`.
- **Condiciones que evalúa** `ausencia de userId`, `result.ok`.
- **Usa código de** [`fetchCurrentUserRow`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L99) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia), [`fetchBusinessByUserId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L115) (llama).
- **Llamadas directas en el cuerpo** [`fetchCurrentUserRow`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L118), [`setBusiness`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L122), [`fetchBusinessByUserId`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L125).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L164) (llama), [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L166) (referencia), [`refreshAll`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L180) (llama).

#### [`loadTickets`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L129) · callback React · asíncrona · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setTicketsLoading`, `setTicketsError`, `setTicketOwnerPublicId`, `setTickets`.
- **Condiciones que evalúa** `ausencia de ownerPublicId`, `current.ok y current.data`, `ausencia de result.ok`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`fetchCurrentUserRow`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L99) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia), [`fetchSupportTicketsByUserPublicId`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L176) (llama).
- **Llamadas directas en el cuerpo** [`setTicketsLoading`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L130), [`setTicketsError`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L131), [`trim`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L133), [`readFirst`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L134), [`fetchCurrentUserRow`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L137), [`setTicketOwnerPublicId`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L143), [`setTickets`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L144), [`fetchSupportTicketsByUserPublicId`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L151).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L165) (llama), [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L166) (referencia), [`refreshAll`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L181) (llama), [`handleCreateTicket`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L218) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L163) · callback de infraestructura · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioPerfilScreen`.

- **Llamadas directas en el cuerpo** [`loadBusiness`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L164), [`loadTickets`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L165).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L168) · callback de infraestructura · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioPerfilScreen`.

- **Actualizaciones de estado o acciones** `setAppleEnabled`.
- **Condiciones que evalúa** `mounted`.
- **Usa código de** [`fetchSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L45) (llama).
- **Llamadas directas en el cuerpo** [`then`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L170), [`fetchSystemFeatureFlags`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L170), [`setAppleEnabled`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L171).

#### [`refreshAll`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L178) · callback React · asíncrona · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`bootstrapAuth`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L179), [`loadBusiness`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L180), [`loadTickets`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L181).
- **Lo usa** [`handleSaveProfile`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L385) (llama), [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L466) (pasa a onPress), [`AccessSecurityPanel.onReload`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L530) (llama).

#### [`handleCreateTicket`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L184) · callback React · asíncrona · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`, `setCreating`, `setCreated`, `setSummary`.
- **Condiciones que evalúa** `length`, `ausencia de result.ok`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama), [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setError`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L185), [`summary.trim`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L186), [`openAlert`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L188), [`setCreating`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L196), [`readFirst`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L205), [`generateClientRequestId`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L208), [`mobileApi.support.createThread`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L210), [`setCreated`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L216), [`setSummary`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L217), [`loadTickets`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L218).
- **Lo usa** [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L595) (pasa a onPress).

#### [`handleSignOut`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L221) · callback React · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Atiende `Pressable.onPress`, `SessionsSection.onCurrentSessionRevoked` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`, `SessionsSection.onCurrentSessionRevoked`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`openConfirm`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L222).
- **Lo usa** [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L469) (pasa a onPress).

#### [`onConfirm`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L228) · función · dentro de [`handleSignOut`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L221)

Maneja `Confirm` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`signOut`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L229).

#### [`openCategoryPicker`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L234) · callback React · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`openPicker`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L235), [`visibleCategories.map`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L238).
- **Lo usa** [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L568) (pasa a onPress).

#### [`onSelect`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L246) · función · dentro de [`openCategoryPicker`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L234)

Maneja `Select` y coordina las acciones indicadas abajo.

- **Entradas** `id`.
- **Actualizaciones de estado o acciones** `setCategory`.
- **Llamadas directas en el cuerpo** [`setCategory`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L246).

#### [`handleOpenWhatsapp`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L250) · callback React · asíncrona · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Efectos y APIs** `Linking.openURL`.
- **Condiciones que evalúa** `ausencia de link`.
- **Llamadas directas en el cuerpo** [`Linking.openURL`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L253).
- **Lo usa** [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L609) (pasa a onPress).

#### [`handleOpenSupportEmail`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L256) · callback React · asíncrona · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Efectos y APIs** `Linking.openURL`.
- **Llamadas directas en el cuerpo** [`Linking.openURL`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L258), [`openAlert`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L260).
- **Lo usa** [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L556) (pasa a onPress).

#### [`handleOpenTicketWhatsapp`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L274) · callback React · asíncrona · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Maneja `Open Ticket Whatsapp` y coordina las acciones indicadas abajo.

- **Entradas** `ticket`.
- **Hooks que llama** `useCallback`.
- **Efectos y APIs** `Linking.openURL`.
- **Condiciones que evalúa** `ausencia de link`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L275), [`readFirst`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L275), [`Linking.openURL`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L278), [`openAlert`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L280).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L655) (llama).

#### [`handleRequestRetake`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L291) · callback React · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Maneja `Request Retake` y coordina las acciones indicadas abajo.

- **Entradas** `ticket`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `ausencia de threadPublicId`.
- **Usa código de** [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L292), [`readFirst`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L292), [`openConfirm`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L294).
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L664) (llama).

#### [`onConfirm`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L300) · función · asíncrona · dentro de [`handleRequestRetake`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L291)

Maneja `Confirm` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setTickets`.
- **Condiciones que evalúa** `ausencia de result.ok o result.data.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`mobileApi.support.requestRetake`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L301), [`openAlert`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L305), [`setTickets`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L312), [`current.map`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L313), [`readFirst`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L314), [`toISOString`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L318).

#### [`handleDeleteAccount`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L329) · callback React · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`openConfirm`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L330).
- **Lo usa** [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L492) (pasa a onPress).

#### [`onConfirm`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L336) · función · asíncrona · dentro de [`handleDeleteAccount`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L329)

Maneja `Confirm` y coordina las acciones indicadas abajo.

- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`deleteCurrentUserAccount`](../../../apps/referidos-android/src/shared/services/accountLifecycle.ts#L7) (llama).
- **Llamadas directas en el cuerpo** [`deleteCurrentUserAccount`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L337), [`openAlert`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L339), [`signOut`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L346).

#### [`handleSaveProfile`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L351) · callback React · asíncrona · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Hooks que llama** `useCallback`.
- **Efectos y APIs** `results.push`.
- **Condiciones que evalúa** `ausencia de userAuthId`, `businessId`, `failed.error`.
- **Contrato de datos** tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`NegocioPerfilScreen.tsx:355`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L355), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`NegocioPerfilScreen.tsx:355`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L355), tabla o vista [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) (`update`) en [`NegocioPerfilScreen.tsx:366`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L366), tabla o bucket [`negocios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L55) en [`NegocioPerfilScreen.tsx:366`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L366).
- **Usa código de** [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (accede al módulo), [`readFirst`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L499) (llama).
- **Llamadas directas en el cuerpo** [`eq`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L355), [`update`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L355), [`supabase.from`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L355), [`ownerDraft.nombre.trim`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L358), [`ownerDraft.telefono.trim`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L359), [`results.push`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L362), [`trim`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L364), [`readFirst`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L364), [`businessDraft.nombre.trim`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L369), [`businessDraft.categoria.trim`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L370), [`businessDraft.direccion.trim`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L371), [`results.find`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L376) y 2 más.
- **Lo usa** [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L463) (llama).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L400) · callback JSX · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setProfileTab`.
- **Llamadas directas en el cuerpo** [`setProfileTab`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L400).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L417) · callback JSX · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setOwnerDraft`.
- **Llamadas directas en el cuerpo** [`setOwnerDraft`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L417).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L430) · callback JSX · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setOwnerDraft`.
- **Llamadas directas en el cuerpo** [`setOwnerDraft`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L430).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L439) · callback JSX · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setBusinessDraft`.
- **Llamadas directas en el cuerpo** [`setBusinessDraft`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L439).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L448) · callback JSX · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setBusinessDraft`.
- **Llamadas directas en el cuerpo** [`setBusinessDraft`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L448).

#### [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L457) · callback JSX · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Responde al evento de interfaz `TextInput.onChangeText`. La lógica ocurre al interactuar con ese control.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setBusinessDraft`.
- **Llamadas directas en el cuerpo** [`setBusinessDraft`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L457).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L463) · callback JSX · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleSaveProfile`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L463).

#### [`AccessSecurityPanel.onReload`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L529) · callback JSX · asíncrona · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Responde al evento de interfaz `AccessSecurityPanel.onReload`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`refreshAll`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L530).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L576) · callback JSX · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setCategory`.
- **Llamadas directas en el cuerpo** [`setCategory`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L576).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L655) · callback JSX · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleOpenTicketWhatsapp`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L655).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L664) · callback JSX · dentro de [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L46)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleRequestRetake`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L664).

#### [`styles`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L691) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L691).
- **Lo usa** [`NegocioPerfilScreen`](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx#L395) (accede al módulo).

### [`apps/referidos-android/src/features/profile/profileFaqContent.ts`](../../../apps/referidos-android/src/features/profile/profileFaqContent.ts#L1)

Agrupa los textos FAQ seleccionables por audiencia. Editar aquí cambia el contenido del perfil sin tocar controles ni navegación.

**Superficie que exporta.** [`getFaqSectionsForAudience`](../../../apps/referidos-android/src/features/profile/profileFaqContent.ts#L255).

**Módulos que lo cargan.** [`ProfileExtendedSections.tsx`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L4) (importa).

#### [`Audience`](../../../apps/referidos-android/src/features/profile/profileFaqContent.ts#L1) · tipo TypeScript

Describe la forma del contrato de `Audience`. TypeScript lo comprueba al compilar.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`FaqItem`](../../../apps/referidos-android/src/features/profile/profileFaqContent.ts#L3) · tipo TypeScript

Describe la forma del contrato de `Faq Item`, con campos `id`, `question`, `answer`, `audience`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `id`, `question`, `answer`, `audience`.

#### [`FaqSection`](../../../apps/referidos-android/src/features/profile/profileFaqContent.ts#L10) · tipo TypeScript

Describe la forma del contrato de `Faq Section`, con campos `id`, `title`, `audience`, `items`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `id`, `title`, `audience`, `items`.

#### [`FAQ_SECTIONS`](../../../apps/referidos-android/src/features/profile/profileFaqContent.ts#L17) · variable de módulo

Conserva la lista de `FAQ SECTIONS` usada por el módulo.

- **Lo usa** [`getFaqSectionsForAudience`](../../../apps/referidos-android/src/features/profile/profileFaqContent.ts#L256) (accede al módulo).

#### [`getFaqSectionsForAudience`](../../../apps/referidos-android/src/features/profile/profileFaqContent.ts#L255) · función · exportado

Obtiene o resuelve `Faq Sections For Audience` para entregarlo al consumidor.

- **Entradas** `audience`.
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-android/src/features/profile/profileFaqContent.ts#L256), [`map`](../../../apps/referidos-android/src/features/profile/profileFaqContent.ts#L256), [`FAQ_SECTIONS.filter`](../../../apps/referidos-android/src/features/profile/profileFaqContent.ts#L256), [`section.audience.includes`](../../../apps/referidos-android/src/features/profile/profileFaqContent.ts#L257), [`section.items.filter`](../../../apps/referidos-android/src/features/profile/profileFaqContent.ts#L260), [`item.audience.includes`](../../../apps/referidos-android/src/features/profile/profileFaqContent.ts#L260).
- **Lo usa** [`sections`](../../../apps/referidos-android/src/features/profile/components/ProfileExtendedSections.tsx#L11) (llama).

### [`apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L1)

Muestra la identidad y estado operativo del asesor, permite iniciar/finalizar jornada y hace ping de actividad. Incluye opciones de perfil que se comparten con otros roles.

**Superficie que exporta.** [`SoportePerfilScreen`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L20).

**Módulos que lo cargan.** [`RoleTabs.tsx`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L23) (importa).

**Dependencias del archivo.** `react`, `react-native`, [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx), [`@shared/store/appStore`](../../../apps/referidos-android/src/shared/store/appStore.ts), [`@shared/store/modalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts), [`@shared/services/mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts), [`@shared/services/systemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts), [`@shared/services/supportDeskQueries`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts), [`@shared/services/entityQueries`](../../../apps/referidos-android/src/shared/services/entityQueries.ts), [`./components/ProfileRuntimePanels`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx).

#### [`SoportePerfilScreen`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L20) · componente React · exportación por defecto

Monta `ScreenScaffold`, `ScrollView`, `SectionCard`, `Text`, `View`, `Pressable`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `signOut mediante useAppStore`, `selector state.signOut`, `onboarding mediante useAppStore`, `selector state.onboarding`, `openConfirm mediante useModalStore`, `selector state.openConfirm`, `[loading, setLoading] mediante useState`, `[error, setError] mediante useState`, `[profile, setProfile] mediante useState`, `[session, setSession] mediante useState`, `[appleEnabled, setAppleEnabled] mediante useState`.
- **Interfaz que monta** `ScreenScaffold`, `ScrollView`, `SectionCard`, `Text`, `View`, `Pressable`, `LinkedProvidersSection`, `NotificationsSection`, `SessionsSection`.
- **Hooks que llama** `useAppStore`, `useModalStore`, `useState`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-android/src/shared/store/appStore.ts#L37) (llama), [`useModalStore`](../../../apps/referidos-android/src/shared/store/modalStore.ts#L70) (llama), [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`SectionCard`](../../../apps/referidos-android/src/shared/ui/SectionCard.tsx#L11) (renderiza), [`formatDateTime`](../../../apps/referidos-android/src/shared/services/entityQueries.ts#L510) (llama), [`LinkedProvidersSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L27) (renderiza), [`NotificationsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L67) (renderiza), [`SessionsSection`](../../../apps/referidos-android/src/features/profile/components/ProfileRuntimePanels.tsx#L144) (renderiza).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L23), [`concat`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L79), [`filter`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L79), [`map`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L79), [`toLowerCase`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L80), [`formatDateTime`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L131).
- **Lo usa** [`SoporteTabs`](../../../apps/referidos-android/src/navigation/RoleTabs.tsx#L172) (referencia).

#### [`handleSignOut`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L31) · callback React · dentro de [`SoportePerfilScreen`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L20)

Atiende `Pressable.onPress`, `SessionsSection.onCurrentSessionRevoked` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`, `SessionsSection.onCurrentSessionRevoked`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`openConfirm`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L32).
- **Lo usa** [`SoportePerfilScreen`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L157) (pasa a onPress).

#### [`onConfirm`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L38) · función · dentro de [`handleSignOut`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L31)

Maneja `Confirm` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`signOut`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L39).

#### [`loadState`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L44) · callback React · asíncrona · dentro de [`SoportePerfilScreen`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L20)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setError`, `setProfile`, `setSession`.
- **Condiciones que evalúa** `ausencia de usuarioId`, `ausencia de profileResult.ok`, `ausencia de sessionResult.ok`.
- **Usa código de** [`fetchSupportAgentProfile`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L267) (llama), [`supabase`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L7) (referencia), [`fetchActiveAgentSession`](../../../apps/referidos-android/src/shared/services/supportDeskQueries.ts#L284) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L46), [`fetchSupportAgentProfile`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L48), [`fetchActiveAgentSession`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L49), [`setError`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L52), [`setProfile`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L58), [`setSession`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L59).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L64) (llama), [`SoportePerfilScreen`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L65) (referencia), [`handleRequestSession`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L93) (llama), [`handleEndSession`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L102) (llama), [`handlePing`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L111) (llama).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L63) · callback de infraestructura · dentro de [`SoportePerfilScreen`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L20)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SoportePerfilScreen`.

- **Llamadas directas en el cuerpo** [`loadState`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L64).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L67) · callback de infraestructura · dentro de [`SoportePerfilScreen`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L20)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SoportePerfilScreen`.

- **Actualizaciones de estado o acciones** `setAppleEnabled`.
- **Condiciones que evalúa** `mounted`.
- **Usa código de** [`fetchSystemFeatureFlags`](../../../apps/referidos-android/src/shared/services/systemFeatureFlags.ts#L45) (llama).
- **Llamadas directas en el cuerpo** [`then`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L69), [`fetchSystemFeatureFlags`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L69), [`setAppleEnabled`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L70).

#### [`handleRequestSession`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L87) · callback React · asíncrona · dentro de [`SoportePerfilScreen`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L20)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`mobileApi.support.startSession`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L88), [`setError`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L90), [`loadState`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L93).
- **Lo usa** [`SoportePerfilScreen`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L139) (pasa a onPress).

#### [`handleEndSession`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L96) · callback React · asíncrona · dentro de [`SoportePerfilScreen`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L20)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`mobileApi.support.endSession`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L97), [`setError`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L99), [`loadState`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L102).
- **Lo usa** [`SoportePerfilScreen`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L143) (pasa a onPress).

#### [`handlePing`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L105) · callback React · asíncrona · dentro de [`SoportePerfilScreen`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L20)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setError`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`mobileApi`](../../../apps/referidos-android/src/shared/services/mobileApi.ts#L12) (accede al módulo).
- **Llamadas directas en el cuerpo** [`mobileApi.support.pingSession`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L106), [`setError`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L108), [`loadState`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L111).
- **Lo usa** [`SoportePerfilScreen`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L147) (pasa a onPress).

#### [`styles`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L173) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L173).
- **Lo usa** [`SoportePerfilScreen`](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx#L116) (accede al módulo).

### [`apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L1)

Pide permiso de cámara, controla montaje y errores, usa Camera Kit para leer códigos y entrega detecciones al padre. La política de qué hacer con un QR queda en la pantalla de cada rol.

**Superficie que exporta.** [`NativeQrScannerBlock`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L11).

**Módulos que lo cargan.** [`ClienteEscanerScreen.tsx`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L8) (importa), [`NegocioEscanerScreen.tsx`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L8) (importa).

**Dependencias del archivo.** `react`, `react-native`, `react-native-camera-kit`.

#### [`Props`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L5) · tipo TypeScript

Describe la forma del contrato de `Props`, con campos `onDetected`, `title`, `helper`. TypeScript lo comprueba al compilar.

- **Campos o contexto** `onDetected`, `title`, `helper`.

#### [`NativeQrScannerBlock`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L11) · componente React · exportación por defecto

Monta `View`, `Text`, `Camera`, `Pressable`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onDetected, title, helper}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[hasPermission, setHasPermission] mediante useState`, `[permissionChecked, setPermissionChecked] mediante useState`, `[cameraError, setCameraError] mediante useState`, `[paused, setPaused] mediante useState`, `[torchMode, setTorchMode] mediante useState`, `[lastCode, setLastCode] mediante useState`, `[lastDetectedAt, setLastDetectedAt] mediante useState`, `lastEmitRef mediante useRef`.
- **Interfaz que monta** `View`, `Text`, `Camera`, `Pressable`.
- **Hooks que llama** `useState`, `useRef`, `useEffect`.
- **Llamadas directas en el cuerpo** [`toLocaleTimeString`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L184).
- **Lo usa** [`ClienteEscanerScreen`](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx#L102) (renderiza), [`NegocioEscanerScreen`](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx#L128) (renderiza).

#### [`useEffect · callback`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L29) · callback de infraestructura · dentro de [`NativeQrScannerBlock`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L11)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NativeQrScannerBlock`.

- **Actualizaciones de estado o acciones** `setPermissionChecked`, `setHasPermission`.
- **Condiciones que evalúa** `Platform.OS`, `ausencia de mounted`.
- **Llamadas directas en el cuerpo** [`setPermissionChecked`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L33), [`setHasPermission`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L34), [`PermissionsAndroid.check`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L37).

#### [`requestCameraPermission`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L48) · callback React · asíncrona · dentro de [`NativeQrScannerBlock`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L11)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setCameraError`, `setHasPermission`, `setPermissionChecked`.
- **Condiciones que evalúa** `Platform.OS`, `current`.
- **Llamadas directas en el cuerpo** [`setCameraError`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L49), [`setHasPermission`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L51), [`setPermissionChecked`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L52), [`PermissionsAndroid.check`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L56), [`PermissionsAndroid.request`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L63).
- **Lo usa** [`NativeQrScannerBlock`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L149) (pasa a onPress).

#### [`onReadCode`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L77) · callback React · dentro de [`NativeQrScannerBlock`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L11)

Atiende `Camera.onReadCode` y aplica la acción vinculada a ese control.

- **Entradas** `event`.
- **Recibe eventos de** `Camera.onReadCode`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLastCode`, `setLastDetectedAt`.
- **Condiciones que evalúa** `paused o cameraError`, `ausencia de code o code.length`, `elapsed`, `isSameCode y elapsed`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L79), [`setLastCode`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L88), [`setLastDetectedAt`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L89), [`onDetected`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L90).
- **Lo usa** [`NativeQrScannerBlock`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L123) (pasa a onReadCode).

#### [`permissionText`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L95) · cálculo memorizado · dentro de [`NativeQrScannerBlock`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L11)

Función auxiliar de `NativeQrScannerBlock` para `permission Text`.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de permissionChecked`, `hasPermission`.
- **Lo usa** [`NativeQrScannerBlock`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L148) (referencia).

#### [`handleCameraError`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L101) · callback React · dentro de [`NativeQrScannerBlock`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L11)

Atiende `Camera.onError` y aplica la acción vinculada a ese control.

- **Entradas** `event`.
- **Recibe eventos de** `Camera.onError`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setCameraError`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L102), [`setCameraError`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L103).
- **Lo usa** [`NativeQrScannerBlock`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L124) (pasa a onError).

#### [`resetCamera`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L106) · callback React · dentro de [`NativeQrScannerBlock`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L11)

Atiende `Pressable.onPress` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `Pressable.onPress`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setCameraError`, `setPaused`.
- **Llamadas directas en el cuerpo** [`setCameraError`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L107), [`setPaused`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L108).
- **Lo usa** [`NativeQrScannerBlock`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L140) (pasa a onPress).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L157) · callback JSX · dentro de [`NativeQrScannerBlock`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L11)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setPaused`.
- **Llamadas directas en el cuerpo** [`setPaused`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L157).

#### [`Pressable.onPress`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L161) · callback JSX · dentro de [`NativeQrScannerBlock`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L11)

Responde al evento de interfaz `Pressable.onPress`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setTorchMode`.
- **Llamadas directas en el cuerpo** [`setTorchMode`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L161).

#### [`styles`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L191) · variable de módulo

Declara `styles` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Llamadas directas en el cuerpo** [`StyleSheet.create`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L191).
- **Lo usa** [`NativeQrScannerBlock`](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx#L112) (accede al módulo).

### [`apps/referidos-android/src/features/scanner/ScannerGateway.tsx`](../../../apps/referidos-android/src/features/scanner/ScannerGateway.tsx#L1)

Placeholder histórico que monta `FeaturePlaceholder`. Las pestañas activas usan los escáneres de cliente y negocio directamente.

**Superficie que exporta.** [`ScannerGateway`](../../../apps/referidos-android/src/features/scanner/ScannerGateway.tsx#L5).

**Dependencias del archivo.** `react`, [`@shared/ui/ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx), [`@shared/ui/FeaturePlaceholder`](../../../apps/referidos-android/src/shared/ui/FeaturePlaceholder.tsx).

#### [`ScannerGateway`](../../../apps/referidos-android/src/features/scanner/ScannerGateway.tsx#L5) · componente React · exportación por defecto

Monta `ScreenScaffold`, `FeaturePlaceholder`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `ScreenScaffold`, `FeaturePlaceholder`.
- **Usa código de** [`ScreenScaffold`](../../../apps/referidos-android/src/shared/ui/ScreenScaffold.tsx#L12) (renderiza), [`FeaturePlaceholder`](../../../apps/referidos-android/src/shared/ui/FeaturePlaceholder.tsx#L11) (renderiza).
