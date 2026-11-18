# PWA principal · Perfil · 1 de 4

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/profile/cliente/ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/profile/cliente/ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1)

Coordina las secciones y acciones reales de perfil de cliente, incluidas actualizaciones de cuenta y desbloqueos locales.

**Superficie que exporta.** [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126).

**Módulos que lo cargan.** [`ClientePerfilBase.jsx`](../../../apps/referidos-app/src/cliente/base/ClientePerfilBase.jsx#L2) (importa).

**Dependencias del archivo.** `react`, `react-dom`, `framer-motion`, `lucide-react`, [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../../cliente/hooks/useClienteUI`](../../../apps/referidos-app/src/cliente/hooks/useClienteUI.js), [`../../hooks/usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js), [`../../cliente/services/clienteUI`](../../../apps/referidos-app/src/cliente/services/clienteUI.js), [`../shared/ProfileTabs`](../../../apps/referidos-app/src/profile/shared/ProfileTabs.jsx), [`../shared/ProfilePanel`](../../../apps/referidos-app/src/profile/shared/ProfilePanel.jsx), [`../../components/header-panels`](../../../apps/referidos-app/src/components/header-panels/index.js), [`../../cliente/layout/ClienteHeaderContext`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx), [`../../cache/cacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js), [`../../cache/cacheKeys`](../../../apps/referidos-app/src/cache/cacheKeys.js), [`../shared/sections/ProfileOverview`](../../../apps/referidos-app/src/profile/shared/sections/ProfileOverview.jsx), [`../shared/sections/PersonalData`](../../../apps/referidos-app/src/profile/shared/sections/PersonalData.jsx), [`../shared/sections/Access`](../../../apps/referidos-app/src/profile/shared/sections/Access.jsx), [`../shared/sections/LinkedAccounts`](../../../apps/referidos-app/src/profile/shared/sections/LinkedAccounts.jsx) y 40 más.

#### [`getDeviceIcon`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L115) · función

Obtiene o resuelve `Device Icon` para entregarlo al consumidor.

- **Entradas** `session`.
- **Condiciones que evalúa** `raw.includes`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L116), [`raw.includes`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L117).
- **Lo usa** [`SessionsPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L246) (llama).

#### [`accessInfoDismissed`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L124) · variable de módulo

Declara `accessInfoDismissed` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L452) (referencia).

#### [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126) · componente React · exportación por defecto

Monta `HeaderPanelContainer`, `TEMP_MOTION_SPLASH_TAG`, `SearchbarPanel`, `AnimatePresence`, `ProfileTabs`, `ProfilePanel`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `setUser mediante useAppStore`, `selector s.setUser`, `logout mediante useAppStore`, `selector s.logout`, `accessMethods mediante useAppStore`, `selector s.accessMethods`, `requestLocalVerification mediante useAppStore`, `selector s.security.requestLocalVerification`, `requestPasswordVerification mediante useAppStore`, `selector s.security.requestPasswordVerification`, `[profileView, setProfileView] mediante useState`, `[tabsActiveKey, setTabsActiveKey] mediante useState` y 11 más.
- **Interfaz que monta** `HeaderPanelContainer`, `TEMP_MOTION_SPLASH_TAG`, `SearchbarPanel`, `AnimatePresence`, `ProfileTabs`, `ProfilePanel`.
- **Hooks que llama** `useAppStore`, `useModal`, `useClienteHeader`, `useCacheStore`, `useClienteUI`, `useState`, `useRef`, `useMfaState`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama), [`useClienteHeader`](../../../apps/referidos-app/src/cliente/layout/ClienteHeaderContext.jsx#L91) (llama), [`useCacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js#L12) (llama), [`CACHE_KEYS`](../../../apps/referidos-app/src/cache/cacheKeys.js#L1) (accede al módulo), [`useClienteUI`](../../../apps/referidos-app/src/cliente/hooks/useClienteUI.js#L3) (llama), [`useMfaState`](../../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js#L4) (llama), [`HeaderPanelContainer`](../../../apps/referidos-app/src/components/header-panels/HeaderPanelContainer.jsx#L3) (renderiza), [`SearchbarPanel`](../../../apps/referidos-app/src/components/header-panels/SearchbarPanel.jsx#L3) (renderiza), [`ProfileTabs`](../../../apps/referidos-app/src/profile/shared/ProfileTabs.jsx#L3) (renderiza) y 1 más.
- **Llamadas directas en el cuerpo** [`createPortal`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1815).
- **Lo usa** [`ClientePerfilBase`](../../../apps/referidos-app/src/cliente/base/ClientePerfilBase.jsx#L5) (renderiza).

#### [`loadSessions`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L171) · callback React · asíncrona · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSessionsLoading`, `setSessionsError`, `setSessions`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`listCurrentUserSessions`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L138) (llama).
- **Llamadas directas en el cuerpo** [`setSessionsLoading`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L172), [`setSessionsError`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L173), [`listCurrentUserSessions`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L174), [`setSessions`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L180).
- **Lo usa** [`handleCloseSession`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L199) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L218) (llama), [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L219) (referencia), [`SessionsPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L231) (pasa a onClick).

#### [`handleCloseSession`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L185) · callback React · asíncrona · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Maneja `Close Session` y coordina las acciones indicadas abajo.

- **Entradas** `session`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSessionsLoading`, `setSessionsError`.
- **Condiciones que evalúa** `ausencia de session.sessionId`, `ausencia de result.ok`, `result.current_session_revoked`.
- **Usa código de** [`revokeSessionById`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L148) (llama).
- **Llamadas directas en el cuerpo** [`setSessionsLoading`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L187), [`setSessionsError`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L188), [`revokeSessionById`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L189), [`logout`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L196), [`loadSessions`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L199).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L261) (llama), [`SessionsPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L310) (referencia).

#### [`handleCloseAllSessions`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L204) · callback React · asíncrona · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSessionsLoading`, `setSessionsError`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`revokeAllSessions`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L152) (llama).
- **Llamadas directas en el cuerpo** [`setSessionsLoading`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L205), [`setSessionsError`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L206), [`revokeAllSessions`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L207), [`logout`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L213).
- **Lo usa** [`SessionsPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L288) (pasa a onClick).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L216) · callback de infraestructura · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClientePerfil`.

- **Condiciones que evalúa** `profileView o profileTab`.
- **Llamadas directas en el cuerpo** [`loadSessions`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L218).

#### [`SessionsPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L222) · callback React · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Prepara contenido JSX usando `Sessions`, `button`, `RefreshCcw`, `SessionsList`.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Sessions`, `button`, `RefreshCcw`, `SessionsList`, `Icon`, `LogOut`.
- **Hooks que llama** `useCallback`.
- **Usa código de** [`Sessions`](../../../apps/referidos-app/src/profile/shared/sections/Sessions.jsx#L3) (renderiza), [`SessionsList`](../../../apps/referidos-app/src/profile/shared/blocks/SessionsList.jsx#L3) (renderiza).
- **Llamadas directas en el cuerpo** [`getDeviceIcon`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L246).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1671) (referencia).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L261) · callback JSX · dentro de [`SessionsPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L222)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleCloseSession`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L261).

#### [`aliasConfig`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L318) · cálculo memorizado · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Función auxiliar de `ClientePerfil` para `alias Config`.

- **Retorno visible o tipo declarado** `panelTitle`, `emptyMessage`, `editMessage`, `viewMessage`, `editTitle`, `fieldLabel`, `placeholder`, `displayLabel`, `emptyValue`, `valueClass`, `minLettersText`.
- **Hooks que llama** `useMemo`.
- **Lo usa** [`OverviewPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1418) (pasa a config).

#### [`TwoFAPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L335) · callback React · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Prepara contenido JSX usando `TwoFA`, `TwoFACard`, `ShieldCheck`, `button`.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `TwoFA`, `TwoFACard`, `ShieldCheck`, `button`, `X`.
- **Hooks que llama** `useCallback`.
- **Usa código de** [`TwoFA`](../../../apps/referidos-app/src/profile/shared/sections/TwoFA.jsx#L3) (renderiza), [`TwoFACard`](../../../apps/referidos-app/src/profile/shared/blocks/TwoFACard.jsx#L18) (renderiza).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1670) (referencia).

#### [`onChange`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L349) · función · dentro de [`TwoFAPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L335)

Maneja `Change` y coordina las acciones indicadas abajo.

- **Efectos y APIs** `openModal`.
- **Condiciones que evalúa** `mfaLoading`, `totpEnabled`.
- **Llamadas directas en el cuerpo** [`openModal`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L352).

#### [`onChange`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L373) · función · dentro de [`TwoFAPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L335)

Maneja `Change` y coordina las acciones indicadas abajo.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`button.onClick`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L395) · callback JSX · dentro de [`TwoFAPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L335)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setTwoFADismissed`.
- **Llamadas directas en el cuerpo** [`setTwoFADismissed`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L395).

#### [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418) · callback React · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Prepara contenido JSX usando `Access`, `AlertTriangle`, `button`, `X`.

- **Entradas** `{usuario}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `setAccessMethods mediante useAppStore`, `selector s.setAccessMethods`, `setSuspendViewportResize mediante useAppStore`, `selector s.setSuspendViewportResize`, `setSuspendViewportAfterNext mediante useAppStore`, `selector s.setSuspendViewportAfterNext`, `freezeViewportAfterNextUpdate mediante useAppStore`, `selector s.freezeViewportAfterNextUpdate`, `onboarding mediante useAppStore`, `selector s.onboarding`, `emailVerifiedSessionAt mediante useAppStore`, `selector s.emailVerifiedSessionAt`, `setEmailVerifiedSessionAt mediante useAppStore`, `selector s.setEmailVerifiedSessionAt` y 25 más.
- **Interfaz que monta** `Access`, `AlertTriangle`, `button`, `X`, `TriangleAlert`, `PasswordAccessCard`, `FingerprintAccessCard`, `PinAccessCard`, `KeyRound`.
- **Hooks que llama** `useCallback`, `useModal`, `useAppStore`, `useState`, `useRef`, `useEffect`, `usePinSetup`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama), [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L3) (llama), [`Access`](../../../apps/referidos-app/src/profile/shared/sections/Access.jsx#L3) (renderiza), [`PasswordAccessCard`](../../../apps/referidos-app/src/profile/shared/blocks/PasswordAccessCard.jsx#L12) (renderiza), [`FingerprintAccessCard`](../../../apps/referidos-app/src/profile/shared/blocks/FingerprintAccessCard.jsx#L4) (renderiza), [`PinAccessCard`](../../../apps/referidos-app/src/profile/shared/blocks/PinAccessCard.jsx#L4) (renderiza).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L460), [`test`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L587).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1667) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L481) · callback de infraestructura · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AccessPanel`.

- **Actualizaciones de estado o acciones** `setEmailWarningOpen`.
- **Condiciones que evalúa** `ausencia de emailConfirmed`.
- **Llamadas directas en el cuerpo** [`setEmailWarningOpen`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L483).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L487) · callback de infraestructura · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AccessPanel`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `setTimeout`, `clearTimeout`.
- **Condiciones que evalúa** `ausencia de emailWarningPulse`.
- **Llamadas directas en el cuerpo** [`setTimeout`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L489), [`clearTimeout`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L490).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L489) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L487)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setEmailWarningPulse`.
- **Llamadas directas en el cuerpo** [`setEmailWarningPulse`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L489).

#### [`triggerEmailWarning`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L493) · callback React · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Coordina cambios de estado durante `trigger Email Warning`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setEmailWarningPulse`, `setEmailWarningOpen`.
- **Condiciones que evalúa** `emailWarningOpen`.
- **Llamadas directas en el cuerpo** [`setEmailWarningPulse`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L495), [`setEmailWarningOpen`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L498).
- **Lo usa** [`openAddPassword`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L639) (llama), [`openChangePassword`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L671) (referencia), [`handleTogglePinForm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L880) (referencia), [`handleAddFingerprint`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L920) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L501) · callback de infraestructura · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AccessPanel`.

- **Llamadas directas en el cuerpo** [`loadProvider`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L510).

#### [`loadProvider`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L503) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L501)

Opera sobre Auth `getSession`. El resultado se adapta al contrato del consumidor.

- **Actualizaciones de estado o acciones** `setAuthProvider`.
- **Condiciones que evalúa** `active`.
- **Contrato de datos** Auth `getSession` en [`ClientePerfil.jsx:504`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L504).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.getSession`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L504), [`setAuthProvider`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L507).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L510) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L516) · callback de infraestructura · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AccessPanel`.

- **Actualizaciones de estado o acciones** `setPasswordEnabled`.
- **Condiciones que evalúa** `passwordEnabled`, `ausencia de hasPassword y passwordEnabled`.
- **Llamadas directas en el cuerpo** [`setPasswordEnabled`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L518).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L526) · callback de infraestructura · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AccessPanel`.

- **Actualizaciones de estado o acciones** `setShowPasswordForm`.
- **Condiciones que evalúa** `passwordActive y showPasswordForm y passwordMode`.
- **Llamadas directas en el cuerpo** [`setShowPasswordForm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L528).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L532) · callback de infraestructura · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AccessPanel`.

- **Actualizaciones de estado o acciones** `setDismissedMethodsWarning`.
- **Condiciones que evalúa** `methodsCount`.
- **Llamadas directas en el cuerpo** [`setDismissedMethodsWarning`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L534).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L538) · callback de infraestructura · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AccessPanel`.

- **Actualizaciones de estado o acciones** `setAccessMethods`.
- **Llamadas directas en el cuerpo** [`setAccessMethods`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L539).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L546) · callback de infraestructura · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AccessPanel`.

- **Actualizaciones de estado o acciones** `setDismissedInfo`, `setFingerprintEnabled`, `setPinEnabled`.
- **Condiciones que evalúa** `prevUserIdRef.current`.
- **Llamadas directas en el cuerpo** [`setDismissedInfo`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L551), [`setFingerprintEnabled`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L553), [`setPinEnabled`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L554).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L557) · callback de infraestructura · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AccessPanel`.

- **Actualizaciones de estado o acciones** `setRemovalBlocked`.
- **Condiciones que evalúa** `methodsCount y removalBlocked`.
- **Llamadas directas en el cuerpo** [`setRemovalBlocked`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L559).

#### [`handlePasswordFocus`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L563) · callback React · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Atiende `PasswordAccessCard.onFocusField` y aplica la acción vinculada a ese control.

- **Entradas** `field`.
- **Recibe eventos de** `PasswordAccessCard.onFocusField`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setFocusedField`.
- **Llamadas directas en el cuerpo** [`setFocusedField`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L564).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1025) (pasa a onFocusField).

#### [`handlePasswordBlur`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L567) · callback React · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Atiende `PasswordAccessCard.onBlurField` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PasswordAccessCard.onBlurField`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setFocusedField`.
- **Efectos y APIs** `requestAnimationFrame`.
- **Condiciones que evalúa** `active`.
- **Llamadas directas en el cuerpo** [`requestAnimationFrame`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L568), [`setFocusedField`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L571).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1026) (pasa a onBlurField).

#### [`handlePasswordCancel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L603) · función · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Atiende `PasswordAccessCard.onPasswordCancel` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PasswordAccessCard.onPasswordCancel`.
- **Actualizaciones de estado o acciones** `setPasswordValue`, `setPasswordConfirm`, `setCurrentPassword`, `setFocusedField`, `setPasswordMode`, `setPasswordAttempted`, `setShowPasswordForm`.
- **Llamadas directas en el cuerpo** [`setPasswordValue`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L604), [`setPasswordConfirm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L605), [`setCurrentPassword`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L606), [`setFocusedField`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L607), [`setPasswordMode`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L608), [`setPasswordAttempted`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L609), [`setShowPasswordForm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L610), [`document.activeElement.blur`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L611).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1005) (pasa a onPasswordCancel).

#### [`handlePasswordSave`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L614) · función · asíncrona · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Recibe eventos de** `PasswordAccessCard.onPasswordSave`.
- **Actualizaciones de estado o acciones** `setPasswordAttempted`, `setPasswordEnabled`, `setShowPasswordForm`, `setPasswordMode`, `setUser`.
- **Condiciones que evalúa** `ausencia de canSavePassword`, `userId`, `accessUser`.
- **Contrato de datos** tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`ClientePerfil.jsx:623`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L623), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`ClientePerfil.jsx:623`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L623).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setPasswordAttempted`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L615), [`setPasswordEnabled`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L617), [`setShowPasswordForm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L618), [`setPasswordMode`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L619), [`eq`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L623), [`update`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L623), [`supabase.from`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L623), [`setUser`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L629).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1006) (pasa a onPasswordSave).

#### [`openAddPassword`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L637) · función · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Atiende `PasswordAccessCard.onOpenAdd` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PasswordAccessCard.onOpenAdd`.
- **Actualizaciones de estado o acciones** `setPasswordMode`, `setCurrentPassword`, `setPasswordValue`, `setPasswordConfirm`, `setPasswordAttempted`, `setShowPasswordForm`.
- **Efectos y APIs** `openModal`.
- **Condiciones que evalúa** `ausencia de emailConfirmed`, `ausencia de emailRecentlyVerified`.
- **Llamadas directas en el cuerpo** [`triggerEmailWarning`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L639), [`openModal`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L640), [`setPasswordMode`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L660), [`setCurrentPassword`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L661), [`setPasswordValue`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L662), [`setPasswordConfirm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L663), [`setPasswordAttempted`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L664), [`setShowPasswordForm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L665).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1007) (pasa a onOpenAdd).

#### [`onConfirm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L648) · función · dentro de [`openAddPassword`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L637)

Maneja `Confirm` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setEmailVerifiedSessionAt`, `setPasswordMode`, `setCurrentPassword`, `setPasswordValue`, `setPasswordConfirm`, `setPasswordAttempted`, `setShowPasswordForm`.
- **Llamadas directas en el cuerpo** [`setEmailVerifiedSessionAt`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L649), [`setPasswordMode`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L650), [`setCurrentPassword`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L651), [`setPasswordValue`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L652), [`setPasswordConfirm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L653), [`setPasswordAttempted`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L654), [`setShowPasswordForm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L655).

#### [`openChangePassword`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L668) · función · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Atiende `PasswordAccessCard.onOpenChange` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PasswordAccessCard.onOpenChange`.
- **Llamadas directas en el cuerpo** [`requestPasswordVerification`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L669).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1008) (pasa a onOpenChange).

#### [`onVerified`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L672) · función · dentro de [`openChangePassword`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L668)

Maneja `Verified` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setPasswordMode`, `setCurrentPassword`, `setPasswordValue`, `setPasswordConfirm`, `setPasswordAttempted`, `setShowPasswordForm`.
- **Llamadas directas en el cuerpo** [`setPasswordMode`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L673), [`setCurrentPassword`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L674), [`setPasswordValue`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L675), [`setPasswordConfirm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L676), [`setPasswordAttempted`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L677), [`setShowPasswordForm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L678).

#### [`savePin`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L684) · callback React · asíncrona · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Entradas** `nextPin`.
- **Retorno visible o tipo declarado** `ok`, `error`.
- **Hooks que llama** `useCallback`.
- **Efectos y APIs** `window.crypto.getRandomValues`.
- **Condiciones que evalúa** `ausencia de userId`, `ausencia de existingSecret`, `ausencia de saved.ok`, `updErr`.
- **Contrato de datos** tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`ClientePerfil.jsx:706`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L706), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`ClientePerfil.jsx:706`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L706).
- **Usa código de** [`loadDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L227) (llama), [`saveDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L219) (llama), [`generatePinSalt`](../../../apps/referidos-app/src/services/secureStorageService.js#L155) (llama), [`hashPin`](../../../apps/referidos-app/src/services/secureStorageService.js#L158) (llama), [`savePinHash`](../../../apps/referidos-app/src/services/secureStorageService.js#L199) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`loadDeviceSecret`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L689), [`window.crypto.getRandomValues`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L691), [`btoa`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L692), [`saveDeviceSecret`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L693), [`toISOString`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L693), [`generatePinSalt`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L695), [`hashPin`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L696), [`savePinHash`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L697), [`eq`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L706), [`update`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L706), [`supabase.from`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L706).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L716) (referencia).

#### [`resetPinForm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L725) · callback React · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Atiende `PinAccessCard.onResetPinForm` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PinAccessCard.onResetPinForm`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setShowPinForm`, `setSuspendViewportResize`, `setSuspendViewportAfterNext`.
- **Llamadas directas en el cuerpo** [`pinSetup.resetPinForm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L726), [`setShowPinForm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L727), [`setSuspendViewportResize`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L728), [`setSuspendViewportAfterNext`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L729), [`document.activeElement.blur`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L730).
- **Lo usa** [`handlePinConfirm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L758) (llama), [`handleTogglePinForm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L873) (llama), [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1056) (pasa a onResetPinForm).

#### [`openPinForm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L733) · función · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Inicia `Pin Form` y prepara sus dependencias.

- **Actualizaciones de estado o acciones** `setShowPinForm`.
- **Efectos y APIs** `window.requestAnimationFrame`.
- **Llamadas directas en el cuerpo** [`pinSetup.resetPinForm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L734), [`setShowPinForm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L735), [`window.requestAnimationFrame`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L736), [`pinSetup.focusHiddenInput`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L737).
- **Lo usa** [`onVerified`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L878) (llama).

#### [`handlePinNext`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L741) · función · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Atiende `PinAccessCard.onPinNext` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PinAccessCard.onPinNext`.
- **Actualizaciones de estado o acciones** `setSuspendViewportAfterNext`, `setSuspendViewportResize`.
- **Efectos y APIs** `window.requestAnimationFrame`.
- **Condiciones que evalúa** `ausencia de pinComplete`.
- **Llamadas directas en el cuerpo** [`setSuspendViewportAfterNext`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L743), [`setSuspendViewportResize`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L744), [`pinSetup.handlePinNext`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L745), [`window.requestAnimationFrame`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L746), [`pinSetup.focusHiddenInput`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L747).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1057) (pasa a onPinNext).

#### [`handlePinConfirm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L751) · función · asíncrona · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Atiende `PinAccessCard.onPinConfirm` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PinAccessCard.onPinConfirm`.
- **Actualizaciones de estado o acciones** `setPinEnabled`, `setUser`.
- **Condiciones que evalúa** `ausencia de result.ok`, `accessUser`.
- **Llamadas directas en el cuerpo** [`pinSetup.handlePinConfirm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L752), [`setPinEnabled`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L754), [`setUser`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L756), [`resetPinForm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L758).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1058) (pasa a onPinConfirm).

#### [`handleRemoveFingerprint`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L761) · función · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Atiende `FingerprintAccessCard.onRemove` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `FingerprintAccessCard.onRemove`.
- **Actualizaciones de estado o acciones** `setRemovalBlocked`, `setDismissedMethodsWarning`.
- **Condiciones que evalúa** `methodsCount`.
- **Llamadas directas en el cuerpo** [`setRemovalBlocked`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L763), [`setDismissedMethodsWarning`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L764), [`requestLocalVerification`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L767).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1036) (pasa a onRemove).

#### [`onVerified`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L768) · función · dentro de [`handleRemoveFingerprint`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L761)

Maneja `Verified` y coordina las acciones indicadas abajo.

- **Efectos y APIs** `openModal`.
- **Llamadas directas en el cuerpo** [`openModal`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L769).

#### [`onConfirm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L774) · función · asíncrona · dentro de [`onVerified`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L768)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Actualizaciones de estado o acciones** `setFingerprintEnabled`, `setUser`.
- **Condiciones que evalúa** `userId`, `accessUser`.
- **Contrato de datos** tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`ClientePerfil.jsx:777`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L777), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`ClientePerfil.jsx:777`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L777).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo), [`deleteBiometricToken`](../../../apps/referidos-app/src/services/secureStorageService.js#L195) (llama).
- **Llamadas directas en el cuerpo** [`eq`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L777), [`update`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L777), [`supabase.from`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L777), [`deleteBiometricToken`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L781), [`setFingerprintEnabled`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L783), [`setUser`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L785).

#### [`handleRemovePin`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L796) · función · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Atiende `PinAccessCard.onRemovePin` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PinAccessCard.onRemovePin`.
- **Actualizaciones de estado o acciones** `setRemovalBlocked`, `setDismissedMethodsWarning`.
- **Condiciones que evalúa** `methodsCount`.
- **Llamadas directas en el cuerpo** [`setRemovalBlocked`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L798), [`setDismissedMethodsWarning`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L799), [`requestLocalVerification`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L802).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1049) (pasa a onRemovePin).

#### [`onVerified`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L803) · función · dentro de [`handleRemovePin`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L796)

Maneja `Verified` y coordina las acciones indicadas abajo.

- **Efectos y APIs** `openModal`.
- **Llamadas directas en el cuerpo** [`openModal`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L804).

#### [`onConfirm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L809) · función · asíncrona · dentro de [`onVerified`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L803)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Actualizaciones de estado o acciones** `setPinEnabled`, `setUser`.
- **Condiciones que evalúa** `userId`, `accessUser`.
- **Contrato de datos** tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`ClientePerfil.jsx:812`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L812), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`ClientePerfil.jsx:812`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L812).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo), [`deletePinHash`](../../../apps/referidos-app/src/services/secureStorageService.js#L215) (llama).
- **Llamadas directas en el cuerpo** [`eq`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L812), [`update`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L812), [`supabase.from`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L812), [`deletePinHash`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L816), [`setPinEnabled`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L818), [`setUser`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L820).

#### [`handlePinPointerDown`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L831) · función · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Atiende `PinAccessCard.onPinPointerDown` y aplica la acción vinculada a ese control.

- **Entradas** `event`.
- **Recibe eventos de** `PinAccessCard.onPinPointerDown`.
- **Llamadas directas en el cuerpo** [`event.preventDefault`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L832), [`pinSetup.focusHiddenInput`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L833).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1051) (pasa a onPinPointerDown).

#### [`registerHiddenRef`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L836) · función · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Aplica o guarda `Hidden Ref` para que el estado refleje la operación.

- **Entradas** `el`.
- **Llamadas directas en el cuerpo** [`pinSetup.registerHiddenRef`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L837).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1055) (pasa a registerHiddenRef).

#### [`handlePinFocus`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L840) · callback React · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Atiende `PinAccessCard.onPinFocus` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PinAccessCard.onPinFocus`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSuspendViewportAfterNext`, `setSuspendViewportResize`, `setPinFocus`.
- **Condiciones que evalúa** `keyboardOpen`.
- **Llamadas directas en el cuerpo** [`setSuspendViewportAfterNext`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L845), [`setSuspendViewportResize`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L846), [`freezeViewportAfterNextUpdate`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L848), [`pinSetup.setPinFocus`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L850).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1053) (pasa a onPinFocus).

#### [`handlePinBlur`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L858) · callback React · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Atiende `PinAccessCard.onPinBlur` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PinAccessCard.onPinBlur`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSuspendViewportResize`, `setSuspendViewportAfterNext`, `setPinFocus`.
- **Condiciones que evalúa** `ausencia de showPinForm`.
- **Llamadas directas en el cuerpo** [`setSuspendViewportResize`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L860), [`setSuspendViewportAfterNext`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L861), [`pinSetup.setPinFocus`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L863).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1054) (pasa a onPinBlur).

#### [`handleTogglePinForm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L871) · función · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Atiende `PinAccessCard.onTogglePinForm` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PinAccessCard.onTogglePinForm`.
- **Condiciones que evalúa** `showPinForm`.
- **Llamadas directas en el cuerpo** [`resetPinForm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L873), [`requestLocalVerification`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L876).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1050) (pasa a onTogglePinForm).

#### [`onVerified`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L877) · función · dentro de [`handleTogglePinForm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L871)

Maneja `Verified` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`openPinForm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L878).

#### [`handleAddFingerprint`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L888) · función · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Atiende `FingerprintAccessCard.onAdd` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `FingerprintAccessCard.onAdd`.
- **Llamadas directas en el cuerpo** [`requestLocalVerification`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L889).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1035) (pasa a onAdd).

#### [`onVerified`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L890) · función · dentro de [`handleAddFingerprint`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L888)

Maneja `Verified` y coordina las acciones indicadas abajo.

- **Efectos y APIs** `openModal`.
- **Llamadas directas en el cuerpo** [`openModal`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L891).

#### [`onConfirm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L892) · función · asíncrona · dentro de [`onVerified`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L890)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Entradas** `credentialId`.
- **Actualizaciones de estado o acciones** `setFingerprintEnabled`, `setUser`.
- **Efectos y APIs** `window.crypto.getRandomValues`.
- **Condiciones que evalúa** `ausencia de userId`, `ausencia de existingSecret`, `ausencia de credentialId`, `accessUser`.
- **Contrato de datos** tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`ClientePerfil.jsx:906`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L906), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`ClientePerfil.jsx:906`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L906).
- **Usa código de** [`loadDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L227) (llama), [`saveDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L219) (llama), [`saveBiometricToken`](../../../apps/referidos-app/src/services/secureStorageService.js#L179) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`loadDeviceSecret`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L895), [`window.crypto.getRandomValues`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L897), [`btoa`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L898), [`saveDeviceSecret`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L899), [`toISOString`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L899), [`saveBiometricToken`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L902), [`eq`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L906), [`update`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L906), [`supabase.from`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L906), [`setFingerprintEnabled`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L910), [`setUser`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L912).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L943) · callback JSX · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `openModal`.
- **Llamadas directas en el cuerpo** [`openModal`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L944).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L955) · callback JSX · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setEmailWarningOpen`, `setEmailWarningPulse`.
- **Llamadas directas en el cuerpo** [`setEmailWarningOpen`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L956), [`setEmailWarningPulse`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L957).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L973) · callback JSX · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setDismissedMethodsWarning`.
- **Llamadas directas en el cuerpo** [`setDismissedMethodsWarning`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L973).

#### [`PasswordAccessCard.onToggleShowPassword`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1009) · callback JSX · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Responde al evento de interfaz `PasswordAccessCard.onToggleShowPassword`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setShowPassword`.
- **Llamadas directas en el cuerpo** [`setShowPassword`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1009).

#### [`PasswordAccessCard.onToggleShowPasswordConfirm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1010) · callback JSX · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Responde al evento de interfaz `PasswordAccessCard.onToggleShowPasswordConfirm`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setShowPasswordConfirm`.
- **Llamadas directas en el cuerpo** [`setShowPasswordConfirm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1011).

#### [`PasswordAccessCard.onToggleShowCurrentPassword`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1013) · callback JSX · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Responde al evento de interfaz `PasswordAccessCard.onToggleShowCurrentPassword`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setShowCurrentPassword`.
- **Llamadas directas en el cuerpo** [`setShowCurrentPassword`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1014).

#### [`PasswordAccessCard.onChangeCurrentPassword`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1016) · callback JSX · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Responde al evento de interfaz `PasswordAccessCard.onChangeCurrentPassword`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setCurrentPassword`.
- **Llamadas directas en el cuerpo** [`setCurrentPassword`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1017).

#### [`PasswordAccessCard.onChangePasswordValue`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1019) · callback JSX · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Responde al evento de interfaz `PasswordAccessCard.onChangePasswordValue`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setPasswordValue`.
- **Llamadas directas en el cuerpo** [`setPasswordValue`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1020).

#### [`PasswordAccessCard.onChangePasswordConfirm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1022) · callback JSX · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Responde al evento de interfaz `PasswordAccessCard.onChangePasswordConfirm`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setPasswordConfirm`.
- **Llamadas directas en el cuerpo** [`setPasswordConfirm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1023).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1068) · callback JSX · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L418)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setDismissedInfo`.
- **Llamadas directas en el cuerpo** [`setDismissedInfo`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1070).

#### [`LinkedAccountsPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1084) · callback React · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Prepara contenido JSX usando `LinkedAccounts`, `LinkedAccountsCard`, `KeyRound`, `button`.

- **Entradas** `{usuario}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[linked, setLinked] mediante useState`, `[verified] mediante useState`, `[dismissedInfo, setDismissedInfo] mediante useState`.
- **Interfaz que monta** `LinkedAccounts`, `LinkedAccountsCard`, `KeyRound`, `button`, `X`.
- **Hooks que llama** `useCallback`, `useState`, `useEffect`.
- **Usa código de** [`LinkedAccounts`](../../../apps/referidos-app/src/profile/shared/sections/LinkedAccounts.jsx#L3) (renderiza), [`LinkedAccountsCard`](../../../apps/referidos-app/src/profile/shared/blocks/LinkedAccountsCard.jsx#L17) (renderiza).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1668) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1091) · callback de infraestructura · dentro de [`LinkedAccountsPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1084)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `LinkedAccountsPanel`.

- **Actualizaciones de estado o acciones** `setLinked`.
- **Condiciones que evalúa** `ausencia de provider`, `ausencia de mapped`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1092), [`setLinked`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1107).

#### [`toggleProvider`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1110) · callback React · dentro de [`LinkedAccountsPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1084)

Atiende `LinkedAccountsCard.onToggle` y aplica la acción vinculada a ese control.

- **Entradas** `providerKey`.
- **Recibe eventos de** `LinkedAccountsCard.onToggle`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLinked`.
- **Llamadas directas en el cuerpo** [`setLinked`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1111).
- **Lo usa** [`LinkedAccountsPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1121) (pasa a onToggle).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1131) · callback JSX · dentro de [`LinkedAccountsPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1084)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setDismissedInfo`.
- **Llamadas directas en el cuerpo** [`setDismissedInfo`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1131).

#### [`NotificationsPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1144) · callback React · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Prepara contenido JSX usando `Notifications`, `NotificationsPreferencesCard`.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[prefs, setPrefs] mediante useState`, `[permission, setPermission] mediante useState`, `[, setPushEnabled] mediante useState`, `[dismissedWarning, setDismissedWarning] mediante useState`.
- **Interfaz que monta** `Notifications`, `NotificationsPreferencesCard`.
- **Hooks que llama** `useCallback`, `useModal`, `useState`, `useEffect`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama), [`DEFAULT_NOTIFICATION_PREFS`](../../../apps/referidos-app/src/profile/shared/blocks/NotificationsPreferencesCard.jsx#L19) (referencia), [`Notifications`](../../../apps/referidos-app/src/profile/shared/sections/Notifications.jsx#L3) (renderiza), [`NotificationsPreferencesCard`](../../../apps/referidos-app/src/profile/shared/blocks/NotificationsPreferencesCard.jsx#L31) (renderiza), [`NOTIFICATION_CHANNELS`](../../../apps/referidos-app/src/profile/shared/blocks/NotificationsPreferencesCard.jsx#L25) (pasa a channels).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1672) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1151) · callback de infraestructura · dentro de [`NotificationsPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1144)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NotificationsPanel`.

- **Actualizaciones de estado o acciones** `setPermission`, `setPushEnabled`.
- **Efectos y APIs** `navigator.serviceWorker.ready.then`.
- **Condiciones que evalúa** `undefined`, `ausencia de serviceWorker`.
- **Llamadas directas en el cuerpo** [`setPermission`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1155), [`catch`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1158), [`then`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1158), [`navigator.serviceWorker.ready.then`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1158), [`reg.pushManager.getSubscription`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1159), [`setPushEnabled`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1161).

#### [`toggle`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1169) · callback React · dentro de [`NotificationsPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1144)

Atiende `NotificationsPreferencesCard.onToggle` y aplica la acción vinculada a ese control.

- **Entradas** `section`.
- **Recibe eventos de** `NotificationsPreferencesCard.onToggle`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setPrefs`.
- **Efectos y APIs** `openModal`.
- **Llamadas directas en el cuerpo** [`setPrefs`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1170), [`openModal`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1174).
- **Lo usa** [`NotificationsPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1198) (pasa a onToggle).

#### [`NotificationsPreferencesCard.onDismissWarning`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1201) · callback JSX · dentro de [`NotificationsPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1144)

Responde al evento de interfaz `NotificationsPreferencesCard.onDismissWarning`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setDismissedWarning`.
- **Llamadas directas en el cuerpo** [`setDismissedWarning`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1201).

#### [`AppAppearancePanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1208) · callback React · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Prepara contenido JSX usando `AppAppearance`, `ThemeSelector`, `FontSelector`.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[theme, setTheme] mediante useState`, `[font, setFont] mediante useState`.
- **Interfaz que monta** `AppAppearance`, `ThemeSelector`, `FontSelector`.
- **Hooks que llama** `useCallback`, `useState`.
- **Usa código de** [`AppAppearance`](../../../apps/referidos-app/src/profile/shared/sections/AppAppearance.jsx#L3) (renderiza), [`ThemeSelector`](../../../apps/referidos-app/src/profile/shared/blocks/ThemeSelector.jsx#L4) (renderiza), [`FontSelector`](../../../apps/referidos-app/src/profile/shared/blocks/FontSelector.jsx#L4) (renderiza).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1674) (referencia).

#### [`LanguagePanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1222) · callback React · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Prepara contenido JSX usando `Language`, `LanguageSelector`.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[language, setLanguage] mediante useState`.
- **Interfaz que monta** `Language`, `LanguageSelector`.
- **Hooks que llama** `useCallback`, `useState`.
- **Usa código de** [`Language`](../../../apps/referidos-app/src/profile/shared/sections/Language.jsx#L3) (renderiza), [`LanguageSelector`](../../../apps/referidos-app/src/profile/shared/blocks/LanguageSelector.jsx#L10) (renderiza).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1675) (referencia).

#### [`handleHelpSelect`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1238) · callback React · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Atiende `SupportHelpOptions.onSelect` y aplica la acción vinculada a ese control.

- **Entradas** `option`.
- **Recibe eventos de** `SupportHelpOptions.onSelect`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setHelpView`.
- **Condiciones que evalúa** `option`.
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama).
- **Llamadas directas en el cuerpo** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1239), [`setHelpView`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1244).
- **Lo usa** [`HelpPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1286) (pasa a onSelect).

#### [`HelpPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1257) · callback React · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Prepara contenido JSX usando `Help`, `FaqContent`, `SupportChat`, `SupportEmail`.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Help`, `FaqContent`, `SupportChat`, `SupportEmail`, `SupportHelpOptions`.
- **Hooks que llama** `useCallback`.
- **Usa código de** [`Help`](../../../apps/referidos-app/src/profile/shared/sections/Help.jsx#L3) (renderiza), [`FaqContent`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L56) (renderiza), [`SupportChat`](../../../apps/referidos-app/src/profile/shared/sections/SupportChat.jsx#L6) (renderiza), [`SupportEmail`](../../../apps/referidos-app/src/profile/shared/sections/SupportEmail.jsx#L7) (renderiza), [`SupportHelpOptions`](../../../apps/referidos-app/src/profile/shared/blocks/SupportHelpOptions.jsx#L3) (renderiza).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1676) (referencia).

#### [`FaqContent.onBack`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1265) · callback JSX · dentro de [`HelpPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1257)

Responde al evento de interfaz `FaqContent.onBack`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setHelpView`.
- **Llamadas directas en el cuerpo** [`setHelpView`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1265).

#### [`SupportChat.onBack`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1271) · callback JSX · dentro de [`HelpPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1257)

Responde al evento de interfaz `SupportChat.onBack`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setHelpView`.
- **Llamadas directas en el cuerpo** [`setHelpView`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1271).

#### [`SupportEmail.onBack`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1276) · callback JSX · dentro de [`HelpPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1257)

Responde al evento de interfaz `SupportEmail.onBack`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setHelpView`.
- **Llamadas directas en el cuerpo** [`setHelpView`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1276).

#### [`FeedbackPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1296) · callback React · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Prepara contenido JSX usando `Feedback`, `SupportFeedbackForm`.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[message, setMessage] mediante useState`, `[email, setEmail] mediante useState`.
- **Interfaz que monta** `Feedback`, `SupportFeedbackForm`.
- **Hooks que llama** `useCallback`, `useState`.
- **Usa código de** [`Feedback`](../../../apps/referidos-app/src/profile/shared/sections/Feedback.jsx#L3) (renderiza), [`SupportFeedbackForm`](../../../apps/referidos-app/src/profile/shared/blocks/SupportFeedbackForm.jsx#L3) (renderiza).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1677) (referencia).

#### [`BeneficiosPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1316) · callback React · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Prepara contenido JSX usando `Beneficios`, `TierCurrentCard`, `TierNextCard`, `ExploreTiersCard`.

- **Entradas** `{usuario}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Beneficios`, `TierCurrentCard`, `TierNextCard`, `ExploreTiersCard`.
- **Hooks que llama** `useCallback`.
- **Usa código de** [`getPlanFallback`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L207) (llama), [`getTierMeta`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L74) (llama), [`getTierProgress`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L101) (llama), [`Beneficios`](../../../apps/referidos-app/src/profile/shared/sections/Beneficios.jsx#L3) (renderiza), [`TierCurrentCard`](../../../apps/referidos-app/src/profile/shared/blocks/TierCurrentCard.jsx#L4) (renderiza), [`formatCompactNumber`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L41) (llama), [`TierNextCard`](../../../apps/referidos-app/src/profile/shared/blocks/TierNextCard.jsx#L4) (renderiza), [`ExploreTiersCard`](../../../apps/referidos-app/src/profile/shared/blocks/ExploreTiersCard.jsx#L4) (renderiza).
- **Llamadas directas en el cuerpo** [`getPlanFallback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1317), [`getTierMeta`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1318), [`getTierProgress`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1319), [`formatCompactNumber`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1329).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1673) (referencia).

#### [`ManageAccountPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1344) · callback React · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Prepara contenido JSX usando `ManageAccount`, `AccountStatusCard`, `DangerZone`.

- **Entradas** `{usuario, setUser, verification}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `ManageAccount`, `AccountStatusCard`, `DangerZone`.
- **Hooks que llama** `useCallback`.
- **Usa código de** [`ManageAccount`](../../../apps/referidos-app/src/profile/shared/sections/ManageAccount.jsx#L3) (renderiza), [`AccountStatusCard`](../../../apps/referidos-app/src/profile/shared/blocks/AccountStatusCard.jsx#L4) (renderiza), [`DangerZone`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L9) (renderiza).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1678) (referencia).

#### [`openVerificationMethods`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1360) · callback React · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Inicia `Verification Methods` y prepara sus dependencias.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setProfileTab`, `setProfileView`.
- **Llamadas directas en el cuerpo** [`setProfileTab`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1361), [`setProfileView`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1362).
- **Lo usa** [`handleSaveContact`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1526) (referencia).

#### [`OverviewPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1366) · callback React · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Prepara contenido JSX usando `ProfileOverview`, `VerificationCard`, `IdentityCard`, `BenefitsCard`.

- **Entradas** `{usuario, setUser, verification}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `ProfileOverview`, `VerificationCard`, `IdentityCard`, `BenefitsCard`, `AliasCard`.
- **Hooks que llama** `useCallback`.
- **Efectos y APIs** `createdAtRaw.replace`.
- **Usa código de** [`formatReadableDate`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L158) (llama), [`getRoleLabel`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L70) (llama), [`getTierMeta`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L74) (llama), [`getPlanFallback`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L207) (llama), [`ProfileOverview`](../../../apps/referidos-app/src/profile/shared/sections/ProfileOverview.jsx#L3) (renderiza), [`VerificationCard`](../../../apps/referidos-app/src/profile/shared/blocks/VerificationCard.jsx#L4) (renderiza), [`IdentityCard`](../../../apps/referidos-app/src/profile/shared/blocks/IdentityCard.jsx#L4) (renderiza), [`getAvatarSrc`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L116) (llama), [`BenefitsCard`](../../../apps/referidos-app/src/profile/shared/blocks/BenefitsCard.jsx#L3) (renderiza), [`AliasCard`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L4) (renderiza).
- **Llamadas directas en el cuerpo** [`createdAtRaw.includes`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1370), [`createdAtRaw.replace`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1372), [`formatReadableDate`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1374), [`getRoleLabel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1377), [`getTierMeta`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1379), [`getPlanFallback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1380), [`getAvatarSrc`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1394).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1669) (referencia).

#### [`IdentityCard.onAvatarSelect`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1396) · callback JSX · dentro de [`OverviewPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1366)

Responde al evento de interfaz `IdentityCard.onAvatarSelect`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setAliasStatus`.
- **Llamadas directas en el cuerpo** [`setAliasStatus`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1397).

#### [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1429) · componente React · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Monta `PersonalData`, `PersonalDataBlock`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{usuario, setUser, verification}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[form, setForm] mediante useState`, `[confirmedSensitive, setConfirmedSensitive] mediante useState`, `[editing, setEditing] mediante useState`, `[expandedEmail, setExpandedEmail] mediante useState`.
- **Interfaz que monta** `PersonalData`, `PersonalDataBlock`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`PersonalData`](../../../apps/referidos-app/src/profile/shared/sections/PersonalData.jsx#L3) (renderiza), [`PersonalDataBlock`](../../../apps/referidos-app/src/profile/shared/blocks/PersonalDataBlock.jsx#L4) (renderiza).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1476), [`join`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1560), [`filter`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1560), [`form.direccion.trim`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1561), [`form.nombres.trim`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1564), [`form.apellidos.trim`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1564), [`form.email.trim`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1565), [`form.telefono.trim`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1565), [`handleChange`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1586).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1666) (referencia).

#### [`initial`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1430) · cálculo memorizado · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1429)

Inicia `ial` y prepara sus dependencias.

- **Retorno visible o tipo declarado** `nombres`, `apellidos`, `direccion`, `email`, `telefono`.
- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1432), [`nombre.split`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1432), [`join`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1434), [`parts.slice`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1434).
- **Lo usa** [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1446) (referencia), [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1455) (referencia), [`handleCancelNames`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1536) (accede al módulo), [`handleCancelContact`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1549) (accede al módulo).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1454) · callback de infraestructura · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1429)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `PersonalDataPanel`.

- **Actualizaciones de estado o acciones** `setForm`.
- **Llamadas directas en el cuerpo** [`setForm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1455).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1464) · callback de infraestructura · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1429)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `PersonalDataPanel`.

- **Actualizaciones de estado o acciones** `setExpandedEmail`.
- **Condiciones que evalúa** `editing.contact`.
- **Llamadas directas en el cuerpo** [`setExpandedEmail`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1466).

#### [`handleChange`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1479) · función · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1429)

Maneja `Change` y coordina las acciones indicadas abajo.

- **Entradas** `field`.
- **Actualizaciones de estado o acciones** `setForm`.
- **Llamadas directas en el cuerpo** [`setForm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1480).
- **Lo usa** [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1586) (llama).

#### [`handleSaveNames`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1483) · función · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1429)

Atiende `PersonalDataBlock.onSaveNames` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PersonalDataBlock.onSaveNames`.
- **Actualizaciones de estado o acciones** `setPersonalUser`, `setEditing`.
- **Condiciones que evalúa** `ausencia de personalUser`, `form.nombres.trim y form.apellidos.trim`.
- **Llamadas directas en el cuerpo** [`join`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1485), [`filter`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1485), [`setPersonalUser`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1488), [`form.nombres.trim`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1494), [`form.apellidos.trim`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1494), [`setEditing`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1495).
- **Lo usa** [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1592) (pasa a onSaveNames).

#### [`persistContact`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1499) · función · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1429)

Aplica o guarda `Contact` para que el estado refleje la operación.

- **Entradas** `overrideSensitive = valor por defecto`.
- **Actualizaciones de estado o acciones** `setPersonalUser`, `setEditing`.
- **Condiciones que evalúa** `ausencia de personalUser`, `ausencia de baseVerified`, `ausencia de overrideSensitive y needsSensitiveVerification y ausencia de confirmedSensitive`, `form.email.trim y form.telefono.trim`.
- **Llamadas directas en el cuerpo** [`setPersonalUser`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1505), [`form.email.trim`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1506), [`form.telefono.trim`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1506), [`setEditing`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1507).
- **Lo usa** [`onConfirm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1523) (llama), [`handleSaveContact`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1530) (llama).

#### [`handleSaveContact`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1511) · función · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1429)

Atiende `PersonalDataBlock.onSaveContact` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PersonalDataBlock.onSaveContact`.
- **Efectos y APIs** `openModal`.
- **Condiciones que evalúa** `needsSensitiveVerification y ausencia de confirmedSensitive`.
- **Llamadas directas en el cuerpo** [`openModal`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1513), [`persistContact`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1530).
- **Lo usa** [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1593) (pasa a onSaveContact).

#### [`onConfirm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1520) · función · dentro de [`handleSaveContact`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1511)

Maneja `Confirm` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setConfirmedSensitive`.
- **Efectos y APIs** `requestAnimationFrame`.
- **Llamadas directas en el cuerpo** [`setConfirmedSensitive`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1521), [`requestAnimationFrame`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1522), [`persistContact`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1523).

#### [`handleCancelNames`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1533) · función · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1429)

Atiende `PersonalDataBlock.onCancelNames` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PersonalDataBlock.onCancelNames`.
- **Actualizaciones de estado o acciones** `setForm`, `setEditing`.
- **Llamadas directas en el cuerpo** [`setForm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1534), [`setEditing`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1539), [`document.activeElement.blur`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1543).
- **Lo usa** [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1590) (pasa a onCancelNames).

#### [`handleCancelContact`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1546) · función · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1429)

Atiende `PersonalDataBlock.onCancelContact` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PersonalDataBlock.onCancelContact`.
- **Actualizaciones de estado o acciones** `setForm`, `setConfirmedSensitive`, `setEditing`.
- **Llamadas directas en el cuerpo** [`setForm`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1547), [`setConfirmedSensitive`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1552), [`setEditing`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1553), [`document.activeElement.blur`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1557).
- **Lo usa** [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1591) (pasa a onCancelContact).

#### [`PersonalDataBlock.onEditNames`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1583) · callback JSX · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1429)

Responde al evento de interfaz `PersonalDataBlock.onEditNames`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setEditing`.
- **Llamadas directas en el cuerpo** [`setEditing`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1583).

#### [`PersonalDataBlock.onEditAddress`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1584) · callback JSX · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1429)

Responde al evento de interfaz `PersonalDataBlock.onEditAddress`. La lógica ocurre al interactuar con ese control.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`PersonalDataBlock.onEditContact`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1585) · callback JSX · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1429)

Responde al evento de interfaz `PersonalDataBlock.onEditContact`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setEditing`.
- **Llamadas directas en el cuerpo** [`setEditing`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1585).

#### [`PersonalDataBlock.onToggleExpandedEmail`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1597) · callback JSX · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1429)

Responde al evento de interfaz `PersonalDataBlock.onToggleExpandedEmail`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setExpandedEmail`.
- **Llamadas directas en el cuerpo** [`setExpandedEmail`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1597).

#### [`tabGroups`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1605) · cálculo memorizado · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Función auxiliar de `ClientePerfil` para `tab Groups`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Lo usa** [`tabLabelMap`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1656) (accede al módulo), [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1857) (pasa a groups).

#### [`tabLabelMap`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1654) · cálculo memorizado · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Función auxiliar de `ClientePerfil` para `tab Label Map`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`tabGroups.forEach`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1656), [`group.items.forEach`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1657).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1740) (accede al módulo), [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1765) (referencia).

#### [`sections`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1665) · cálculo memorizado · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Función auxiliar de `ClientePerfil` para `sections`.

- **Retorno visible o tipo declarado** `personal`, `security-access`, `security-links`, `overview`, `twofa`, `sessions`, `notifications`, `plan`, `appearance`, `language`, `help`, `feedback`, `manage`.
- **Hooks que llama** `useMemo`.
- **Lo usa** [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1876) (pasa a sections).

#### [`handleTabChange`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1698) · callback React · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Atiende `ProfileTabs.onChange` y aplica la acción vinculada a ese control.

- **Entradas** `nextTab`.
- **Recibe eventos de** `ProfileTabs.onChange`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `clearTimeout`, `setTabsActiveKey`, `setProfileTab`.
- **Efectos y APIs** `clearTimeout`, `setTimeout`.
- **Condiciones que evalúa** `nextTab`, `tabTransitionRef.current`.
- **Llamadas directas en el cuerpo** [`clearTimeout`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1701), [`setTabsActiveKey`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1703), [`setTimeout`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1704), [`setProfileTab`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1714).
- **Lo usa** [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1859) (pasa a onChange).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1704) · callback de infraestructura · dentro de [`handleTabChange`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1698)

Ejecuta trabajo diferido o periódico iniciado por `handleTabChange`.

- **Actualizaciones de estado o acciones** `setTabsActiveKey`.
- **Llamadas directas en el cuerpo** [`setTabsActiveKey`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1705), [`logout`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1706).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1715) · callback de infraestructura · dentro de [`handleTabChange`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1698)

Ejecuta trabajo diferido o periódico iniciado por `handleTabChange`.

- **Actualizaciones de estado o acciones** `setProfileView`.
- **Llamadas directas en el cuerpo** [`setProfileView`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1716).

#### [`handleBack`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1722) · callback React · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Maneja `Back` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setProfileView`, `setTabsActiveKey`.
- **Llamadas directas en el cuerpo** [`setProfileView`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1723), [`setTabsActiveKey`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1724).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1744) (referencia), [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1760) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1727) · callback de infraestructura · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClientePerfil`.

- **Actualizaciones de estado o acciones** `setHeaderOptions`.
- **Condiciones que evalúa** `ausencia de isActive`.
- **Llamadas directas en el cuerpo** [`setHeaderOptions`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1729).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1768) · callback de infraestructura · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClientePerfil`.

- **Actualizaciones de estado o acciones** `setDockOpenForHeader`, `clearTimeout`.
- **Efectos y APIs** `setTimeout`, `clearTimeout`.
- **Condiciones que evalúa** `ausencia de showSearchDock`, `ausencia de prev y showSearchDock`.
- **Llamadas directas en el cuerpo** [`setDockOpenForHeader`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1773), [`setTimeout`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1778), [`clearTimeout`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1781).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1778) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1768)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setDockOpenForHeader`.
- **Llamadas directas en el cuerpo** [`setDockOpenForHeader`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1779).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1789) · callback de infraestructura · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClientePerfil`.

- **Actualizaciones de estado o acciones** `setDockTarget`, `setDockOpenForHeader`.
- **Condiciones que evalúa** `ausencia de isActive`.
- **Llamadas directas en el cuerpo** [`setDockTarget`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1791), [`setDockOpenForHeader`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1792), [`document.getElementById`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1795).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1798) · callback de infraestructura · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClientePerfil`.

- **Actualizaciones de estado o acciones** `setTabsActiveKey`.
- **Condiciones que evalúa** `profileView`.
- **Llamadas directas en el cuerpo** [`setTabsActiveKey`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1800).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1804) · callback de infraestructura · dentro de [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L126)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `ClientePerfil`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `clearTimeout`.
- **Condiciones que evalúa** `tabTransitionRef.current`.
- **Llamadas directas en el cuerpo** [`clearTimeout`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1807).
