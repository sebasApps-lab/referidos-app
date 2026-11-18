# PWA principal · Perfil · 2 de 4

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/AccountStatusCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/AccountStatusCard.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/BenefitsCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/BenefitsCard.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1)

Coordina datos, secciones de perfil y operaciones de cuenta del usuario negocio con sus opciones particulares.

**Superficie que exporta.** [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122).

**Módulos que lo cargan.** [`NegocioPerfilBase.jsx`](../../../apps/referidos-app/src/negocio/base/NegocioPerfilBase.jsx#L2) (importa).

**Dependencias del archivo.** `react`, `react-dom`, `framer-motion`, `lucide-react`, [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../../hooks/usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js), `react-router-dom`, [`../../negocio/hooks/useNegocioUI`](../../../apps/referidos-app/src/negocio/hooks/useNegocioUI.js), [`../../cliente/services/clienteUI`](../../../apps/referidos-app/src/cliente/services/clienteUI.js), [`../shared/ProfileTabs`](../../../apps/referidos-app/src/profile/shared/ProfileTabs.jsx), [`../shared/ProfilePanel`](../../../apps/referidos-app/src/profile/shared/ProfilePanel.jsx), [`../../layouts/header-panels`](../../../apps/referidos-app/src/layouts/header-panels/index.js), [`../../negocio/layout/NegocioHeaderContext`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx), [`../../cache/cacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js), [`../../cache/cacheKeys`](../../../apps/referidos-app/src/cache/cacheKeys.js), [`../shared/sections/ProfileOverview`](../../../apps/referidos-app/src/profile/shared/sections/ProfileOverview.jsx), [`../shared/sections/PersonalData`](../../../apps/referidos-app/src/profile/shared/sections/PersonalData.jsx), [`../shared/sections/Access`](../../../apps/referidos-app/src/profile/shared/sections/Access.jsx) y 39 más.

#### [`getDeviceIcon`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L111) · función

Obtiene o resuelve `Device Icon` para entregarlo al consumidor.

- **Entradas** `session`.
- **Condiciones que evalúa** `raw.includes`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L112), [`raw.includes`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L113).
- **Lo usa** [`SessionsPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L245) (llama).

#### [`accessInfoDismissed`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L120) · variable de módulo

Declara `accessInfoDismissed` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L435) (referencia).

#### [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122) · componente React · exportación por defecto

Monta `HeaderPanelContainer`, `TEMP_MOTION_SPLASH_TAG`, `SearchbarPanel`, `AnimatePresence`, `ProfileTabs`, `ProfilePanel`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `onboarding mediante useAppStore`, `selector s.onboarding`, `setUser mediante useAppStore`, `selector s.setUser`, `logout mediante useAppStore`, `selector s.logout`, `accessMethods mediante useAppStore`, `selector s.accessMethods`, `requestLocalVerification mediante useAppStore`, `selector s.security.requestLocalVerification`, `requestPasswordVerification mediante useAppStore`, `selector s.security.requestPasswordVerification` y 13 más.
- **Interfaz que monta** `HeaderPanelContainer`, `TEMP_MOTION_SPLASH_TAG`, `SearchbarPanel`, `AnimatePresence`, `ProfileTabs`, `ProfilePanel`.
- **Hooks que llama** `useAppStore`, `useModal`, `useNegocioHeader`, `useCacheStore`, `useNegocioUI`, `useLocation`, `useState`, `useRef`, `useMfaState`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama), [`useNegocioHeader`](../../../apps/referidos-app/src/negocio/layout/NegocioHeaderContext.jsx#L91) (llama), [`useCacheStore`](../../../apps/referidos-app/src/cache/cacheStore.js#L12) (llama), [`CACHE_KEYS`](../../../apps/referidos-app/src/cache/cacheKeys.js#L1) (accede al módulo), [`useNegocioUI`](../../../apps/referidos-app/src/negocio/hooks/useNegocioUI.js#L3) (llama), [`useMfaState`](../../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js#L4) (llama), [`HeaderPanelContainer`](../../../apps/referidos-app/src/layouts/header-panels/HeaderPanelContainer.jsx#L3) (renderiza), [`SearchbarPanel`](../../../apps/referidos-app/src/layouts/header-panels/SearchbarPanel.jsx#L3) (renderiza), [`ProfileTabs`](../../../apps/referidos-app/src/profile/shared/ProfileTabs.jsx#L3) (renderiza) y 1 más.
- **Llamadas directas en el cuerpo** [`createPortal`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1881).
- **Lo usa** [`NegocioPerfilBase`](../../../apps/referidos-app/src/negocio/base/NegocioPerfilBase.jsx#L5) (renderiza).

#### [`loadOwnerSessions`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L169) · callback React · asíncrona · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSessionsLoading`, `setSessionsError`, `setOwnerSessions`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`listCurrentUserSessions`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L138) (llama).
- **Llamadas directas en el cuerpo** [`setSessionsLoading`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L170), [`setSessionsError`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L171), [`listCurrentUserSessions`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L172), [`setOwnerSessions`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L178).
- **Lo usa** [`handleCloseOwnerSession`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L197) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L216) (llama), [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L217) (referencia), [`SessionsPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L230) (pasa a onClick).

#### [`handleCloseOwnerSession`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L183) · callback React · asíncrona · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Maneja `Close Owner Session` y coordina las acciones indicadas abajo.

- **Entradas** `session`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSessionsLoading`, `setSessionsError`.
- **Condiciones que evalúa** `ausencia de session.sessionId`, `ausencia de result.ok`, `result.current_session_revoked`.
- **Usa código de** [`revokeSessionById`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L148) (llama).
- **Llamadas directas en el cuerpo** [`setSessionsLoading`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L185), [`setSessionsError`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L186), [`revokeSessionById`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L187), [`logout`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L194), [`loadOwnerSessions`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L197).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L260) (llama), [`SessionsPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L310) (referencia).

#### [`handleCloseAllOwners`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L202) · callback React · asíncrona · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSessionsLoading`, `setSessionsError`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`revokeAllSessions`](../../../apps/referidos-app/src/services/sessionDevicesService.js#L152) (llama).
- **Llamadas directas en el cuerpo** [`setSessionsLoading`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L203), [`setSessionsError`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L204), [`revokeAllSessions`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L205), [`logout`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L211).
- **Lo usa** [`SessionsPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L287) (pasa a onClick).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L214) · callback de infraestructura · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioPerfil`.

- **Condiciones que evalúa** `profileView o profileTab`.
- **Llamadas directas en el cuerpo** [`loadOwnerSessions`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L216).

#### [`SessionsPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L220) · callback React · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Prepara contenido JSX usando `Sessions`, `button`, `RefreshCcw`, `SessionsList`.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Sessions`, `button`, `RefreshCcw`, `SessionsList`, `Icon`, `LogOut`.
- **Hooks que llama** `useCallback`.
- **Usa código de** [`Sessions`](../../../apps/referidos-app/src/profile/shared/sections/Sessions.jsx#L3) (renderiza), [`SessionsList`](../../../apps/referidos-app/src/profile/shared/blocks/SessionsList.jsx#L3) (renderiza).
- **Llamadas directas en el cuerpo** [`getDeviceIcon`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L245).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1727) (referencia).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L260) · callback JSX · dentro de [`SessionsPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L220)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleCloseOwnerSession`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L260).

#### [`TwoFAPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L318) · callback React · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Prepara contenido JSX usando `TwoFA`, `TwoFACard`, `ShieldCheck`, `button`.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `TwoFA`, `TwoFACard`, `ShieldCheck`, `button`, `X`.
- **Hooks que llama** `useCallback`.
- **Usa código de** [`TwoFA`](../../../apps/referidos-app/src/profile/shared/sections/TwoFA.jsx#L3) (renderiza), [`TwoFACard`](../../../apps/referidos-app/src/profile/shared/blocks/TwoFACard.jsx#L18) (renderiza).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1726) (referencia).

#### [`onChange`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L332) · función · dentro de [`TwoFAPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L318)

Maneja `Change` y coordina las acciones indicadas abajo.

- **Efectos y APIs** `openModal`.
- **Condiciones que evalúa** `mfaLoading`, `totpEnabled`.
- **Llamadas directas en el cuerpo** [`openModal`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L335).

#### [`onChange`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L356) · función · dentro de [`TwoFAPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L318)

Maneja `Change` y coordina las acciones indicadas abajo.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`button.onClick`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L378) · callback JSX · dentro de [`TwoFAPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L318)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setTwoFADismissed`.
- **Llamadas directas en el cuerpo** [`setTwoFADismissed`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L378).

#### [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401) · callback React · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Prepara contenido JSX usando `Access`, `AlertTriangle`, `button`, `X`.

- **Entradas** `{usuario}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `setAccessMethods mediante useAppStore`, `selector s.setAccessMethods`, `setSuspendViewportResize mediante useAppStore`, `selector s.setSuspendViewportResize`, `setSuspendViewportAfterNext mediante useAppStore`, `selector s.setSuspendViewportAfterNext`, `freezeViewportAfterNextUpdate mediante useAppStore`, `selector s.freezeViewportAfterNextUpdate`, `onboarding mediante useAppStore`, `selector s.onboarding`, `emailVerifiedSessionAt mediante useAppStore`, `selector s.emailVerifiedSessionAt`, `setEmailVerifiedSessionAt mediante useAppStore`, `selector s.setEmailVerifiedSessionAt` y 25 más.
- **Interfaz que monta** `Access`, `AlertTriangle`, `button`, `X`, `TriangleAlert`, `PasswordAccessCard`, `FingerprintAccessCard`, `PinAccessCard`, `KeyRound`.
- **Hooks que llama** `useCallback`, `useModal`, `useAppStore`, `useState`, `useRef`, `useEffect`, `usePinSetup`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama), [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L3) (llama), [`Access`](../../../apps/referidos-app/src/profile/shared/sections/Access.jsx#L3) (renderiza), [`PasswordAccessCard`](../../../apps/referidos-app/src/profile/shared/blocks/PasswordAccessCard.jsx#L12) (renderiza), [`FingerprintAccessCard`](../../../apps/referidos-app/src/profile/shared/blocks/FingerprintAccessCard.jsx#L4) (renderiza), [`PinAccessCard`](../../../apps/referidos-app/src/profile/shared/blocks/PinAccessCard.jsx#L4) (renderiza).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L443), [`test`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L570).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1724) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L464) · callback de infraestructura · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AccessPanel`.

- **Actualizaciones de estado o acciones** `setEmailWarningOpen`.
- **Condiciones que evalúa** `ausencia de emailConfirmed`.
- **Llamadas directas en el cuerpo** [`setEmailWarningOpen`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L466).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L470) · callback de infraestructura · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AccessPanel`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `setTimeout`, `clearTimeout`.
- **Condiciones que evalúa** `ausencia de emailWarningPulse`.
- **Llamadas directas en el cuerpo** [`setTimeout`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L472), [`clearTimeout`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L473).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L472) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L470)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setEmailWarningPulse`.
- **Llamadas directas en el cuerpo** [`setEmailWarningPulse`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L472).

#### [`triggerEmailWarning`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L476) · callback React · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Coordina cambios de estado durante `trigger Email Warning`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setEmailWarningPulse`, `setEmailWarningOpen`.
- **Condiciones que evalúa** `emailWarningOpen`.
- **Llamadas directas en el cuerpo** [`setEmailWarningPulse`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L478), [`setEmailWarningOpen`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L481).
- **Lo usa** [`openAddPassword`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L622) (llama), [`openChangePassword`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L654) (referencia), [`handleTogglePinForm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L863) (referencia), [`handleAddFingerprint`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L903) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L484) · callback de infraestructura · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AccessPanel`.

- **Llamadas directas en el cuerpo** [`loadProvider`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L493).

#### [`loadProvider`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L486) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L484)

Opera sobre Auth `getSession`. El resultado se adapta al contrato del consumidor.

- **Actualizaciones de estado o acciones** `setAuthProvider`.
- **Condiciones que evalúa** `active`.
- **Contrato de datos** Auth `getSession` en [`NegocioPerfil.jsx:487`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L487).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`supabase.auth.getSession`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L487), [`setAuthProvider`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L490).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L493) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L499) · callback de infraestructura · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AccessPanel`.

- **Actualizaciones de estado o acciones** `setPasswordEnabled`.
- **Condiciones que evalúa** `passwordEnabled`, `ausencia de hasPassword y passwordEnabled`.
- **Llamadas directas en el cuerpo** [`setPasswordEnabled`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L501).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L509) · callback de infraestructura · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AccessPanel`.

- **Actualizaciones de estado o acciones** `setShowPasswordForm`.
- **Condiciones que evalúa** `passwordActive y showPasswordForm y passwordMode`.
- **Llamadas directas en el cuerpo** [`setShowPasswordForm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L511).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L515) · callback de infraestructura · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AccessPanel`.

- **Actualizaciones de estado o acciones** `setDismissedMethodsWarning`.
- **Condiciones que evalúa** `methodsCount`.
- **Llamadas directas en el cuerpo** [`setDismissedMethodsWarning`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L517).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L521) · callback de infraestructura · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AccessPanel`.

- **Actualizaciones de estado o acciones** `setAccessMethods`.
- **Llamadas directas en el cuerpo** [`setAccessMethods`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L522).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L529) · callback de infraestructura · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AccessPanel`.

- **Actualizaciones de estado o acciones** `setDismissedInfo`, `setFingerprintEnabled`, `setPinEnabled`.
- **Condiciones que evalúa** `prevUserIdRef.current`.
- **Llamadas directas en el cuerpo** [`setDismissedInfo`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L534), [`setFingerprintEnabled`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L536), [`setPinEnabled`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L537).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L540) · callback de infraestructura · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AccessPanel`.

- **Actualizaciones de estado o acciones** `setRemovalBlocked`.
- **Condiciones que evalúa** `methodsCount y removalBlocked`.
- **Llamadas directas en el cuerpo** [`setRemovalBlocked`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L542).

#### [`handlePasswordFocus`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L546) · callback React · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Atiende `PasswordAccessCard.onFocusField` y aplica la acción vinculada a ese control.

- **Entradas** `field`.
- **Recibe eventos de** `PasswordAccessCard.onFocusField`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setFocusedField`.
- **Llamadas directas en el cuerpo** [`setFocusedField`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L547).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1008) (pasa a onFocusField).

#### [`handlePasswordBlur`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L550) · callback React · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Atiende `PasswordAccessCard.onBlurField` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PasswordAccessCard.onBlurField`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setFocusedField`.
- **Efectos y APIs** `requestAnimationFrame`.
- **Condiciones que evalúa** `active`.
- **Llamadas directas en el cuerpo** [`requestAnimationFrame`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L551), [`setFocusedField`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L554).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1009) (pasa a onBlurField).

#### [`handlePasswordCancel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L586) · función · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Atiende `PasswordAccessCard.onPasswordCancel` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PasswordAccessCard.onPasswordCancel`.
- **Actualizaciones de estado o acciones** `setPasswordValue`, `setPasswordConfirm`, `setCurrentPassword`, `setFocusedField`, `setPasswordMode`, `setPasswordAttempted`, `setShowPasswordForm`.
- **Llamadas directas en el cuerpo** [`setPasswordValue`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L587), [`setPasswordConfirm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L588), [`setCurrentPassword`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L589), [`setFocusedField`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L590), [`setPasswordMode`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L591), [`setPasswordAttempted`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L592), [`setShowPasswordForm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L593), [`document.activeElement.blur`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L594).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L988) (pasa a onPasswordCancel).

#### [`handlePasswordSave`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L597) · función · asíncrona · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Recibe eventos de** `PasswordAccessCard.onPasswordSave`.
- **Actualizaciones de estado o acciones** `setPasswordAttempted`, `setPasswordEnabled`, `setShowPasswordForm`, `setPasswordMode`, `setUser`.
- **Condiciones que evalúa** `ausencia de canSavePassword`, `userId`, `accessUser`.
- **Contrato de datos** tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`NegocioPerfil.jsx:606`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L606), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`NegocioPerfil.jsx:606`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L606).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setPasswordAttempted`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L598), [`setPasswordEnabled`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L600), [`setShowPasswordForm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L601), [`setPasswordMode`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L602), [`eq`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L606), [`update`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L606), [`supabase.from`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L606), [`setUser`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L612).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L989) (pasa a onPasswordSave).

#### [`openAddPassword`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L620) · función · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Atiende `PasswordAccessCard.onOpenAdd` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PasswordAccessCard.onOpenAdd`.
- **Actualizaciones de estado o acciones** `setPasswordMode`, `setCurrentPassword`, `setPasswordValue`, `setPasswordConfirm`, `setPasswordAttempted`, `setShowPasswordForm`.
- **Efectos y APIs** `openModal`.
- **Condiciones que evalúa** `ausencia de emailConfirmed`, `ausencia de emailRecentlyVerified`.
- **Llamadas directas en el cuerpo** [`triggerEmailWarning`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L622), [`openModal`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L623), [`setPasswordMode`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L643), [`setCurrentPassword`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L644), [`setPasswordValue`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L645), [`setPasswordConfirm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L646), [`setPasswordAttempted`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L647), [`setShowPasswordForm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L648).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L990) (pasa a onOpenAdd).

#### [`onConfirm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L631) · función · dentro de [`openAddPassword`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L620)

Maneja `Confirm` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setEmailVerifiedSessionAt`, `setPasswordMode`, `setCurrentPassword`, `setPasswordValue`, `setPasswordConfirm`, `setPasswordAttempted`, `setShowPasswordForm`.
- **Llamadas directas en el cuerpo** [`setEmailVerifiedSessionAt`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L632), [`setPasswordMode`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L633), [`setCurrentPassword`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L634), [`setPasswordValue`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L635), [`setPasswordConfirm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L636), [`setPasswordAttempted`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L637), [`setShowPasswordForm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L638).

#### [`openChangePassword`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L651) · función · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Atiende `PasswordAccessCard.onOpenChange` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PasswordAccessCard.onOpenChange`.
- **Llamadas directas en el cuerpo** [`requestPasswordVerification`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L652).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L991) (pasa a onOpenChange).

#### [`onVerified`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L655) · función · dentro de [`openChangePassword`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L651)

Maneja `Verified` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setPasswordMode`, `setCurrentPassword`, `setPasswordValue`, `setPasswordConfirm`, `setPasswordAttempted`, `setShowPasswordForm`.
- **Llamadas directas en el cuerpo** [`setPasswordMode`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L656), [`setCurrentPassword`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L657), [`setPasswordValue`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L658), [`setPasswordConfirm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L659), [`setPasswordAttempted`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L660), [`setShowPasswordForm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L661).

#### [`savePin`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L667) · callback React · asíncrona · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Entradas** `nextPin`.
- **Retorno visible o tipo declarado** `ok`, `error`.
- **Hooks que llama** `useCallback`.
- **Efectos y APIs** `window.crypto.getRandomValues`.
- **Condiciones que evalúa** `ausencia de userId`, `ausencia de existingSecret`, `ausencia de saved.ok`, `updErr`.
- **Contrato de datos** tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`NegocioPerfil.jsx:689`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L689), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`NegocioPerfil.jsx:689`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L689).
- **Usa código de** [`loadDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L227) (llama), [`saveDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L219) (llama), [`generatePinSalt`](../../../apps/referidos-app/src/services/secureStorageService.js#L155) (llama), [`hashPin`](../../../apps/referidos-app/src/services/secureStorageService.js#L158) (llama), [`savePinHash`](../../../apps/referidos-app/src/services/secureStorageService.js#L199) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`loadDeviceSecret`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L672), [`window.crypto.getRandomValues`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L674), [`btoa`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L675), [`saveDeviceSecret`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L676), [`toISOString`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L676), [`generatePinSalt`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L678), [`hashPin`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L679), [`savePinHash`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L680), [`eq`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L689), [`update`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L689), [`supabase.from`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L689).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L699) (referencia).

#### [`resetPinForm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L708) · callback React · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Atiende `PinAccessCard.onResetPinForm` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PinAccessCard.onResetPinForm`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setShowPinForm`, `setSuspendViewportResize`, `setSuspendViewportAfterNext`.
- **Llamadas directas en el cuerpo** [`pinSetup.resetPinForm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L709), [`setShowPinForm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L710), [`setSuspendViewportResize`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L711), [`setSuspendViewportAfterNext`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L712), [`document.activeElement.blur`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L713).
- **Lo usa** [`handlePinConfirm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L741) (llama), [`handleTogglePinForm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L856) (llama), [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1039) (pasa a onResetPinForm).

#### [`openPinForm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L716) · función · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Inicia `Pin Form` y prepara sus dependencias.

- **Actualizaciones de estado o acciones** `setShowPinForm`.
- **Efectos y APIs** `window.requestAnimationFrame`.
- **Llamadas directas en el cuerpo** [`pinSetup.resetPinForm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L717), [`setShowPinForm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L718), [`window.requestAnimationFrame`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L719), [`pinSetup.focusHiddenInput`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L720).
- **Lo usa** [`onVerified`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L861) (llama).

#### [`handlePinNext`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L724) · función · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Atiende `PinAccessCard.onPinNext` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PinAccessCard.onPinNext`.
- **Actualizaciones de estado o acciones** `setSuspendViewportAfterNext`, `setSuspendViewportResize`.
- **Efectos y APIs** `window.requestAnimationFrame`.
- **Condiciones que evalúa** `ausencia de pinComplete`.
- **Llamadas directas en el cuerpo** [`setSuspendViewportAfterNext`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L726), [`setSuspendViewportResize`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L727), [`pinSetup.handlePinNext`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L728), [`window.requestAnimationFrame`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L729), [`pinSetup.focusHiddenInput`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L730).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1040) (pasa a onPinNext).

#### [`handlePinConfirm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L734) · función · asíncrona · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Atiende `PinAccessCard.onPinConfirm` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PinAccessCard.onPinConfirm`.
- **Actualizaciones de estado o acciones** `setPinEnabled`, `setUser`.
- **Condiciones que evalúa** `ausencia de result.ok`, `accessUser`.
- **Llamadas directas en el cuerpo** [`pinSetup.handlePinConfirm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L735), [`setPinEnabled`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L737), [`setUser`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L739), [`resetPinForm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L741).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1041) (pasa a onPinConfirm).

#### [`handleRemoveFingerprint`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L744) · función · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Atiende `FingerprintAccessCard.onRemove` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `FingerprintAccessCard.onRemove`.
- **Actualizaciones de estado o acciones** `setRemovalBlocked`, `setDismissedMethodsWarning`.
- **Condiciones que evalúa** `methodsCount`.
- **Llamadas directas en el cuerpo** [`setRemovalBlocked`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L746), [`setDismissedMethodsWarning`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L747), [`requestLocalVerification`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L750).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1019) (pasa a onRemove).

#### [`onVerified`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L751) · función · dentro de [`handleRemoveFingerprint`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L744)

Maneja `Verified` y coordina las acciones indicadas abajo.

- **Efectos y APIs** `openModal`.
- **Llamadas directas en el cuerpo** [`openModal`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L752).

#### [`onConfirm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L757) · función · asíncrona · dentro de [`onVerified`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L751)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Actualizaciones de estado o acciones** `setFingerprintEnabled`, `setUser`.
- **Condiciones que evalúa** `userId`, `accessUser`.
- **Contrato de datos** tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`NegocioPerfil.jsx:760`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L760), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`NegocioPerfil.jsx:760`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L760).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo), [`deleteBiometricToken`](../../../apps/referidos-app/src/services/secureStorageService.js#L195) (llama).
- **Llamadas directas en el cuerpo** [`eq`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L760), [`update`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L760), [`supabase.from`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L760), [`deleteBiometricToken`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L764), [`setFingerprintEnabled`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L766), [`setUser`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L768).

#### [`handleRemovePin`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L779) · función · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Atiende `PinAccessCard.onRemovePin` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PinAccessCard.onRemovePin`.
- **Actualizaciones de estado o acciones** `setRemovalBlocked`, `setDismissedMethodsWarning`.
- **Condiciones que evalúa** `methodsCount`.
- **Llamadas directas en el cuerpo** [`setRemovalBlocked`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L781), [`setDismissedMethodsWarning`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L782), [`requestLocalVerification`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L785).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1032) (pasa a onRemovePin).

#### [`onVerified`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L786) · función · dentro de [`handleRemovePin`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L779)

Maneja `Verified` y coordina las acciones indicadas abajo.

- **Efectos y APIs** `openModal`.
- **Llamadas directas en el cuerpo** [`openModal`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L787).

#### [`onConfirm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L792) · función · asíncrona · dentro de [`onVerified`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L786)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Actualizaciones de estado o acciones** `setPinEnabled`, `setUser`.
- **Condiciones que evalúa** `userId`, `accessUser`.
- **Contrato de datos** tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`NegocioPerfil.jsx:795`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L795), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`NegocioPerfil.jsx:795`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L795).
- **Usa código de** [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo), [`deletePinHash`](../../../apps/referidos-app/src/services/secureStorageService.js#L215) (llama).
- **Llamadas directas en el cuerpo** [`eq`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L795), [`update`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L795), [`supabase.from`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L795), [`deletePinHash`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L799), [`setPinEnabled`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L801), [`setUser`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L803).

#### [`handlePinPointerDown`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L814) · función · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Atiende `PinAccessCard.onPinPointerDown` y aplica la acción vinculada a ese control.

- **Entradas** `event`.
- **Recibe eventos de** `PinAccessCard.onPinPointerDown`.
- **Llamadas directas en el cuerpo** [`event.preventDefault`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L815), [`pinSetup.focusHiddenInput`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L816).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1034) (pasa a onPinPointerDown).

#### [`registerHiddenRef`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L819) · función · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Aplica o guarda `Hidden Ref` para que el estado refleje la operación.

- **Entradas** `el`.
- **Llamadas directas en el cuerpo** [`pinSetup.registerHiddenRef`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L820).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1038) (pasa a registerHiddenRef).

#### [`handlePinFocus`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L823) · callback React · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Atiende `PinAccessCard.onPinFocus` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PinAccessCard.onPinFocus`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSuspendViewportAfterNext`, `setSuspendViewportResize`, `setPinFocus`.
- **Condiciones que evalúa** `keyboardOpen`.
- **Llamadas directas en el cuerpo** [`setSuspendViewportAfterNext`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L828), [`setSuspendViewportResize`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L829), [`freezeViewportAfterNextUpdate`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L831), [`pinSetup.setPinFocus`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L833).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1036) (pasa a onPinFocus).

#### [`handlePinBlur`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L841) · callback React · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Atiende `PinAccessCard.onPinBlur` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PinAccessCard.onPinBlur`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSuspendViewportResize`, `setSuspendViewportAfterNext`, `setPinFocus`.
- **Condiciones que evalúa** `ausencia de showPinForm`.
- **Llamadas directas en el cuerpo** [`setSuspendViewportResize`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L843), [`setSuspendViewportAfterNext`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L844), [`pinSetup.setPinFocus`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L846).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1037) (pasa a onPinBlur).

#### [`handleTogglePinForm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L854) · función · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Atiende `PinAccessCard.onTogglePinForm` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PinAccessCard.onTogglePinForm`.
- **Condiciones que evalúa** `showPinForm`.
- **Llamadas directas en el cuerpo** [`resetPinForm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L856), [`requestLocalVerification`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L859).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1033) (pasa a onTogglePinForm).

#### [`onVerified`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L860) · función · dentro de [`handleTogglePinForm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L854)

Maneja `Verified` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`openPinForm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L861).

#### [`handleAddFingerprint`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L871) · función · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Atiende `FingerprintAccessCard.onAdd` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `FingerprintAccessCard.onAdd`.
- **Llamadas directas en el cuerpo** [`requestLocalVerification`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L872).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1018) (pasa a onAdd).

#### [`onVerified`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L873) · función · dentro de [`handleAddFingerprint`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L871)

Maneja `Verified` y coordina las acciones indicadas abajo.

- **Efectos y APIs** `openModal`.
- **Llamadas directas en el cuerpo** [`openModal`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L874).

#### [`onConfirm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L875) · función · asíncrona · dentro de [`onVerified`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L873)

Actualiza datos en tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) y coordina las demás operaciones de esta ficha.

- **Entradas** `credentialId`.
- **Actualizaciones de estado o acciones** `setFingerprintEnabled`, `setUser`.
- **Efectos y APIs** `window.crypto.getRandomValues`.
- **Condiciones que evalúa** `ausencia de userId`, `ausencia de existingSecret`, `ausencia de credentialId`, `accessUser`.
- **Contrato de datos** tabla o vista [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) (`update`) en [`NegocioPerfil.jsx:889`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L889), tabla o bucket [`usuarios`](../../../apps/referidos-app/supabase/migrations/20250205_000003_auth_and_users.sql#L38) en [`NegocioPerfil.jsx:889`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L889).
- **Usa código de** [`loadDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L227) (llama), [`saveDeviceSecret`](../../../apps/referidos-app/src/services/secureStorageService.js#L219) (llama), [`saveBiometricToken`](../../../apps/referidos-app/src/services/secureStorageService.js#L179) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`loadDeviceSecret`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L878), [`window.crypto.getRandomValues`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L880), [`btoa`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L881), [`saveDeviceSecret`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L882), [`toISOString`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L882), [`saveBiometricToken`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L885), [`eq`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L889), [`update`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L889), [`supabase.from`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L889), [`setFingerprintEnabled`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L893), [`setUser`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L895).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L926) · callback JSX · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `openModal`.
- **Llamadas directas en el cuerpo** [`openModal`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L927).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L938) · callback JSX · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setEmailWarningOpen`, `setEmailWarningPulse`.
- **Llamadas directas en el cuerpo** [`setEmailWarningOpen`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L939), [`setEmailWarningPulse`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L940).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L956) · callback JSX · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setDismissedMethodsWarning`.
- **Llamadas directas en el cuerpo** [`setDismissedMethodsWarning`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L956).

#### [`PasswordAccessCard.onToggleShowPassword`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L992) · callback JSX · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Responde al evento de interfaz `PasswordAccessCard.onToggleShowPassword`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setShowPassword`.
- **Llamadas directas en el cuerpo** [`setShowPassword`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L992).

#### [`PasswordAccessCard.onToggleShowPasswordConfirm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L993) · callback JSX · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Responde al evento de interfaz `PasswordAccessCard.onToggleShowPasswordConfirm`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setShowPasswordConfirm`.
- **Llamadas directas en el cuerpo** [`setShowPasswordConfirm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L994).

#### [`PasswordAccessCard.onToggleShowCurrentPassword`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L996) · callback JSX · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Responde al evento de interfaz `PasswordAccessCard.onToggleShowCurrentPassword`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setShowCurrentPassword`.
- **Llamadas directas en el cuerpo** [`setShowCurrentPassword`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L997).

#### [`PasswordAccessCard.onChangeCurrentPassword`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L999) · callback JSX · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Responde al evento de interfaz `PasswordAccessCard.onChangeCurrentPassword`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setCurrentPassword`.
- **Llamadas directas en el cuerpo** [`setCurrentPassword`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1000).

#### [`PasswordAccessCard.onChangePasswordValue`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1002) · callback JSX · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Responde al evento de interfaz `PasswordAccessCard.onChangePasswordValue`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setPasswordValue`.
- **Llamadas directas en el cuerpo** [`setPasswordValue`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1003).

#### [`PasswordAccessCard.onChangePasswordConfirm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1005) · callback JSX · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Responde al evento de interfaz `PasswordAccessCard.onChangePasswordConfirm`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setPasswordConfirm`.
- **Llamadas directas en el cuerpo** [`setPasswordConfirm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1006).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1051) · callback JSX · dentro de [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L401)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setDismissedInfo`.
- **Llamadas directas en el cuerpo** [`setDismissedInfo`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1053).

#### [`LinkedAccountsPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1067) · callback React · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Prepara contenido JSX usando `LinkedAccounts`, `LinkedAccountsCard`, `KeyRound`, `button`.

- **Entradas** `{usuario}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[linked, setLinked] mediante useState`, `[verified] mediante useState`, `[dismissedInfo, setDismissedInfo] mediante useState`.
- **Interfaz que monta** `LinkedAccounts`, `LinkedAccountsCard`, `KeyRound`, `button`, `X`.
- **Hooks que llama** `useCallback`, `useState`, `useEffect`.
- **Usa código de** [`LinkedAccounts`](../../../apps/referidos-app/src/profile/shared/sections/LinkedAccounts.jsx#L3) (renderiza), [`LinkedAccountsCard`](../../../apps/referidos-app/src/profile/shared/blocks/LinkedAccountsCard.jsx#L17) (renderiza).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1725) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1074) · callback de infraestructura · dentro de [`LinkedAccountsPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1067)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `LinkedAccountsPanel`.

- **Actualizaciones de estado o acciones** `setLinked`.
- **Condiciones que evalúa** `ausencia de provider`, `ausencia de mapped`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1075), [`setLinked`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1090).

#### [`toggleProvider`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1093) · callback React · dentro de [`LinkedAccountsPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1067)

Atiende `LinkedAccountsCard.onToggle` y aplica la acción vinculada a ese control.

- **Entradas** `providerKey`.
- **Recibe eventos de** `LinkedAccountsCard.onToggle`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLinked`.
- **Llamadas directas en el cuerpo** [`setLinked`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1094).
- **Lo usa** [`LinkedAccountsPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1104) (pasa a onToggle).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1114) · callback JSX · dentro de [`LinkedAccountsPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1067)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setDismissedInfo`.
- **Llamadas directas en el cuerpo** [`setDismissedInfo`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1114).

#### [`NotificationsPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1127) · callback React · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Prepara contenido JSX usando `Notifications`, `NotificationsPreferencesCard`.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[prefs, setPrefs] mediante useState`, `[permission, setPermission] mediante useState`, `[, setPushEnabled] mediante useState`, `[dismissedWarning, setDismissedWarning] mediante useState`.
- **Interfaz que monta** `Notifications`, `NotificationsPreferencesCard`.
- **Hooks que llama** `useCallback`, `useModal`, `useState`, `useEffect`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama), [`DEFAULT_NOTIFICATION_PREFS`](../../../apps/referidos-app/src/profile/shared/blocks/NotificationsPreferencesCard.jsx#L19) (referencia), [`Notifications`](../../../apps/referidos-app/src/profile/shared/sections/Notifications.jsx#L3) (renderiza), [`NotificationsPreferencesCard`](../../../apps/referidos-app/src/profile/shared/blocks/NotificationsPreferencesCard.jsx#L31) (renderiza), [`NOTIFICATION_CHANNELS`](../../../apps/referidos-app/src/profile/shared/blocks/NotificationsPreferencesCard.jsx#L25) (pasa a channels).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1728) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1134) · callback de infraestructura · dentro de [`NotificationsPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1127)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NotificationsPanel`.

- **Actualizaciones de estado o acciones** `setPermission`, `setPushEnabled`.
- **Efectos y APIs** `navigator.serviceWorker.ready.then`.
- **Condiciones que evalúa** `undefined`, `ausencia de serviceWorker`.
- **Llamadas directas en el cuerpo** [`setPermission`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1138), [`catch`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1141), [`then`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1141), [`navigator.serviceWorker.ready.then`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1141), [`reg.pushManager.getSubscription`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1142), [`setPushEnabled`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1144).

#### [`toggle`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1152) · callback React · dentro de [`NotificationsPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1127)

Atiende `NotificationsPreferencesCard.onToggle` y aplica la acción vinculada a ese control.

- **Entradas** `section`.
- **Recibe eventos de** `NotificationsPreferencesCard.onToggle`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setPrefs`.
- **Efectos y APIs** `openModal`.
- **Llamadas directas en el cuerpo** [`setPrefs`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1153), [`openModal`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1157).
- **Lo usa** [`NotificationsPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1181) (pasa a onToggle).

#### [`NotificationsPreferencesCard.onDismissWarning`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1184) · callback JSX · dentro de [`NotificationsPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1127)

Responde al evento de interfaz `NotificationsPreferencesCard.onDismissWarning`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setDismissedWarning`.
- **Llamadas directas en el cuerpo** [`setDismissedWarning`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1184).

#### [`AppAppearancePanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1191) · callback React · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Prepara contenido JSX usando `AppAppearance`, `ThemeSelector`, `FontSelector`.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[theme, setTheme] mediante useState`, `[font, setFont] mediante useState`.
- **Interfaz que monta** `AppAppearance`, `ThemeSelector`, `FontSelector`.
- **Hooks que llama** `useCallback`, `useState`.
- **Usa código de** [`AppAppearance`](../../../apps/referidos-app/src/profile/shared/sections/AppAppearance.jsx#L3) (renderiza), [`ThemeSelector`](../../../apps/referidos-app/src/profile/shared/blocks/ThemeSelector.jsx#L4) (renderiza), [`FontSelector`](../../../apps/referidos-app/src/profile/shared/blocks/FontSelector.jsx#L4) (renderiza).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1730) (referencia).

#### [`LanguagePanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1205) · callback React · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Prepara contenido JSX usando `Language`, `LanguageSelector`.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[language, setLanguage] mediante useState`.
- **Interfaz que monta** `Language`, `LanguageSelector`.
- **Hooks que llama** `useCallback`, `useState`.
- **Usa código de** [`Language`](../../../apps/referidos-app/src/profile/shared/sections/Language.jsx#L3) (renderiza), [`LanguageSelector`](../../../apps/referidos-app/src/profile/shared/blocks/LanguageSelector.jsx#L10) (renderiza).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1731) (referencia).

#### [`handleHelpSelect`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1221) · callback React · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Atiende `SupportHelpOptions.onSelect` y aplica la acción vinculada a ese control.

- **Entradas** `option`.
- **Recibe eventos de** `SupportHelpOptions.onSelect`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setHelpView`.
- **Condiciones que evalúa** `option`.
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama).
- **Llamadas directas en el cuerpo** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1222), [`setHelpView`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1227).
- **Lo usa** [`HelpPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1269) (pasa a onSelect).

#### [`HelpPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1240) · callback React · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Prepara contenido JSX usando `Help`, `FaqContent`, `SupportChat`, `SupportEmail`.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Help`, `FaqContent`, `SupportChat`, `SupportEmail`, `SupportHelpOptions`.
- **Hooks que llama** `useCallback`.
- **Usa código de** [`Help`](../../../apps/referidos-app/src/profile/shared/sections/Help.jsx#L3) (renderiza), [`FaqContent`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L56) (renderiza), [`SupportChat`](../../../apps/referidos-app/src/profile/shared/sections/SupportChat.jsx#L6) (renderiza), [`SupportEmail`](../../../apps/referidos-app/src/profile/shared/sections/SupportEmail.jsx#L7) (renderiza), [`SupportHelpOptions`](../../../apps/referidos-app/src/profile/shared/blocks/SupportHelpOptions.jsx#L3) (renderiza).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1732) (referencia).

#### [`FaqContent.onBack`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1248) · callback JSX · dentro de [`HelpPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1240)

Responde al evento de interfaz `FaqContent.onBack`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setHelpView`.
- **Llamadas directas en el cuerpo** [`setHelpView`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1248).

#### [`SupportChat.onBack`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1254) · callback JSX · dentro de [`HelpPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1240)

Responde al evento de interfaz `SupportChat.onBack`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setHelpView`.
- **Llamadas directas en el cuerpo** [`setHelpView`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1254).

#### [`SupportEmail.onBack`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1259) · callback JSX · dentro de [`HelpPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1240)

Responde al evento de interfaz `SupportEmail.onBack`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setHelpView`.
- **Llamadas directas en el cuerpo** [`setHelpView`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1259).

#### [`FeedbackPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1279) · callback React · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Prepara contenido JSX usando `Feedback`, `SupportFeedbackForm`.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[message, setMessage] mediante useState`, `[email, setEmail] mediante useState`.
- **Interfaz que monta** `Feedback`, `SupportFeedbackForm`.
- **Hooks que llama** `useCallback`, `useState`.
- **Usa código de** [`Feedback`](../../../apps/referidos-app/src/profile/shared/sections/Feedback.jsx#L3) (renderiza), [`SupportFeedbackForm`](../../../apps/referidos-app/src/profile/shared/blocks/SupportFeedbackForm.jsx#L3) (renderiza).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1733) (referencia).

#### [`BeneficiosPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1299) · callback React · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Prepara contenido JSX usando `Beneficios`, `PlanBenefitsCard`.

- **Entradas** `{usuario}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Beneficios`, `PlanBenefitsCard`.
- **Hooks que llama** `useCallback`.
- **Usa código de** [`getPlanFallback`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L207) (llama), [`Beneficios`](../../../apps/referidos-app/src/profile/shared/sections/Beneficios.jsx#L3) (renderiza), [`PlanBenefitsCard`](../../../apps/referidos-app/src/profile/shared/blocks/PlanBenefitsCard.jsx#L4) (renderiza).
- **Llamadas directas en el cuerpo** [`getPlanFallback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1300).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1729) (referencia).

#### [`ManageAccountPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1320) · callback React · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Prepara contenido JSX usando `ManageAccount`, `AccountStatusCard`, `button`, `DangerZone`.

- **Entradas** `{usuario, setUser, verification}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `ManageAccount`, `AccountStatusCard`, `button`, `DangerZone`.
- **Hooks que llama** `useCallback`.
- **Usa código de** [`getPlanFallback`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L207) (llama), [`ManageAccount`](../../../apps/referidos-app/src/profile/shared/sections/ManageAccount.jsx#L3) (renderiza), [`AccountStatusCard`](../../../apps/referidos-app/src/profile/shared/blocks/AccountStatusCard.jsx#L4) (renderiza), [`DangerZone`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L9) (renderiza).
- **Llamadas directas en el cuerpo** [`getPlanFallback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1321).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1734) (referencia).

#### [`openVerificationMethods`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1354) · callback React · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Inicia `Verification Methods` y prepara sus dependencias.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setProfileTab`, `setProfileView`.
- **Llamadas directas en el cuerpo** [`setProfileTab`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1355), [`setProfileView`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1356).
- **Lo usa** [`handleSaveContact`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1582) (referencia).

#### [`openNegocioIdentity`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1358) · callback React · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Atiende `NegocioIdentityCard.onEdit` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `NegocioIdentityCard.onEdit`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setProfileTab`, `setProfileView`.
- **Llamadas directas en el cuerpo** [`setProfileTab`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1359), [`setProfileView`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1360).
- **Lo usa** [`OverviewPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1476) (pasa a onEdit).

#### [`negocioItems`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1362) · cálculo memorizado · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Función auxiliar de `NegocioPerfil` para `negocio Items`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`base.map`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1385).
- **Lo usa** [`negocioDisplayItems`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1395) (accede al módulo).

#### [`negocioDisplayItems`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1394) · cálculo memorizado · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Función auxiliar de `NegocioPerfil` para `negocio Display Items`.

- **Retorno visible o tipo declarado** `id`, `label`, `value`, `missing`, `raw`, `index`.
- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`items.map`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1405), [`trim`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1406).
- **Lo usa** [`negocioMissing`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1422) (accede al módulo), [`OverviewPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1475) (pasa a items).

#### [`negocioMissing`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1422) · cálculo memorizado · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Función auxiliar de `NegocioPerfil` para `negocio Missing`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`negocioDisplayItems.some`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1422).
- **Lo usa** [`OverviewPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1474) (pasa a showWarning).

#### [`OverviewPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1427) · callback React · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Prepara contenido JSX usando `ProfileOverview`, `VerificationCard`, `IdentityCard`, `BenefitsCard`.

- **Entradas** `{usuario, verification}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `ProfileOverview`, `VerificationCard`, `IdentityCard`, `BenefitsCard`, `NegocioIdentityCard`.
- **Hooks que llama** `useCallback`.
- **Efectos y APIs** `createdAtRaw.replace`.
- **Usa código de** [`formatReadableDate`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L158) (llama), [`getRoleLabel`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L70) (llama), [`getPlanFallback`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L207) (llama), [`ProfileOverview`](../../../apps/referidos-app/src/profile/shared/sections/ProfileOverview.jsx#L3) (renderiza), [`VerificationCard`](../../../apps/referidos-app/src/profile/shared/blocks/VerificationCard.jsx#L4) (renderiza), [`IdentityCard`](../../../apps/referidos-app/src/profile/shared/blocks/IdentityCard.jsx#L4) (renderiza), [`getAvatarSrc`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L116) (llama), [`BenefitsCard`](../../../apps/referidos-app/src/profile/shared/blocks/BenefitsCard.jsx#L3) (renderiza), [`NegocioIdentityCard`](../../../apps/referidos-app/src/profile/shared/blocks/NegocioIdentityCard.jsx#L4) (renderiza).
- **Llamadas directas en el cuerpo** [`createdAtRaw.includes`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1431), [`createdAtRaw.replace`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1433), [`formatReadableDate`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1435), [`getRoleLabel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1438), [`getPlanFallback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1440), [`getAvatarSrc`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1455).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1722) (referencia).

#### [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1485) · componente React · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Monta `PersonalData`, `PersonalDataBlock`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{usuario, setUser, verification}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[form, setForm] mediante useState`, `[confirmedSensitive, setConfirmedSensitive] mediante useState`, `[editing, setEditing] mediante useState`, `[expandedEmail, setExpandedEmail] mediante useState`.
- **Interfaz que monta** `PersonalData`, `PersonalDataBlock`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`PersonalData`](../../../apps/referidos-app/src/profile/shared/sections/PersonalData.jsx#L3) (renderiza), [`PersonalDataBlock`](../../../apps/referidos-app/src/profile/shared/blocks/PersonalDataBlock.jsx#L4) (renderiza).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1532), [`join`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1616), [`filter`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1616), [`form.direccion.trim`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1617), [`form.nombres.trim`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1620), [`form.apellidos.trim`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1620), [`form.email.trim`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1621), [`form.telefono.trim`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1621), [`handleChange`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1642).
- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1723) (referencia).

#### [`initial`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1486) · cálculo memorizado · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1485)

Inicia `ial` y prepara sus dependencias.

- **Retorno visible o tipo declarado** `nombres`, `apellidos`, `direccion`, `email`, `telefono`.
- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1488), [`nombre.split`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1488), [`join`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1490), [`parts.slice`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1490).
- **Lo usa** [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1502) (referencia), [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1511) (referencia), [`handleCancelNames`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1592) (accede al módulo), [`handleCancelContact`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1605) (accede al módulo).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1510) · callback de infraestructura · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1485)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `PersonalDataPanel`.

- **Actualizaciones de estado o acciones** `setForm`.
- **Llamadas directas en el cuerpo** [`setForm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1511).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1520) · callback de infraestructura · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1485)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `PersonalDataPanel`.

- **Actualizaciones de estado o acciones** `setExpandedEmail`.
- **Condiciones que evalúa** `editing.contact`.
- **Llamadas directas en el cuerpo** [`setExpandedEmail`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1522).

#### [`handleChange`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1535) · función · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1485)

Maneja `Change` y coordina las acciones indicadas abajo.

- **Entradas** `field`.
- **Actualizaciones de estado o acciones** `setForm`.
- **Llamadas directas en el cuerpo** [`setForm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1536).
- **Lo usa** [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1642) (llama).

#### [`handleSaveNames`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1539) · función · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1485)

Atiende `PersonalDataBlock.onSaveNames` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PersonalDataBlock.onSaveNames`.
- **Actualizaciones de estado o acciones** `setPersonalUser`, `setEditing`.
- **Condiciones que evalúa** `ausencia de personalUser`, `form.nombres.trim y form.apellidos.trim`.
- **Llamadas directas en el cuerpo** [`join`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1541), [`filter`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1541), [`setPersonalUser`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1544), [`form.nombres.trim`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1550), [`form.apellidos.trim`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1550), [`setEditing`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1551).
- **Lo usa** [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1648) (pasa a onSaveNames).

#### [`persistContact`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1555) · función · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1485)

Aplica o guarda `Contact` para que el estado refleje la operación.

- **Entradas** `overrideSensitive = valor por defecto`.
- **Actualizaciones de estado o acciones** `setPersonalUser`, `setEditing`.
- **Condiciones que evalúa** `ausencia de personalUser`, `ausencia de baseVerified`, `ausencia de overrideSensitive y needsSensitiveVerification y ausencia de confirmedSensitive`, `form.email.trim y form.telefono.trim`.
- **Llamadas directas en el cuerpo** [`setPersonalUser`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1561), [`form.email.trim`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1562), [`form.telefono.trim`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1562), [`setEditing`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1563).
- **Lo usa** [`onConfirm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1579) (llama), [`handleSaveContact`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1586) (llama).

#### [`handleSaveContact`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1567) · función · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1485)

Atiende `PersonalDataBlock.onSaveContact` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PersonalDataBlock.onSaveContact`.
- **Efectos y APIs** `openModal`.
- **Condiciones que evalúa** `needsSensitiveVerification y ausencia de confirmedSensitive`.
- **Llamadas directas en el cuerpo** [`openModal`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1569), [`persistContact`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1586).
- **Lo usa** [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1649) (pasa a onSaveContact).

#### [`onConfirm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1576) · función · dentro de [`handleSaveContact`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1567)

Maneja `Confirm` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setConfirmedSensitive`.
- **Efectos y APIs** `requestAnimationFrame`.
- **Llamadas directas en el cuerpo** [`setConfirmedSensitive`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1577), [`requestAnimationFrame`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1578), [`persistContact`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1579).

#### [`handleCancelNames`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1589) · función · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1485)

Atiende `PersonalDataBlock.onCancelNames` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PersonalDataBlock.onCancelNames`.
- **Actualizaciones de estado o acciones** `setForm`, `setEditing`.
- **Llamadas directas en el cuerpo** [`setForm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1590), [`setEditing`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1595), [`document.activeElement.blur`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1599).
- **Lo usa** [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1646) (pasa a onCancelNames).

#### [`handleCancelContact`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1602) · función · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1485)

Atiende `PersonalDataBlock.onCancelContact` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `PersonalDataBlock.onCancelContact`.
- **Actualizaciones de estado o acciones** `setForm`, `setConfirmedSensitive`, `setEditing`.
- **Llamadas directas en el cuerpo** [`setForm`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1603), [`setConfirmedSensitive`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1608), [`setEditing`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1609), [`document.activeElement.blur`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1613).
- **Lo usa** [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1647) (pasa a onCancelContact).

#### [`PersonalDataBlock.onEditNames`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1639) · callback JSX · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1485)

Responde al evento de interfaz `PersonalDataBlock.onEditNames`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setEditing`.
- **Llamadas directas en el cuerpo** [`setEditing`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1639).

#### [`PersonalDataBlock.onEditAddress`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1640) · callback JSX · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1485)

Responde al evento de interfaz `PersonalDataBlock.onEditAddress`. La lógica ocurre al interactuar con ese control.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`PersonalDataBlock.onEditContact`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1641) · callback JSX · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1485)

Responde al evento de interfaz `PersonalDataBlock.onEditContact`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setEditing`.
- **Llamadas directas en el cuerpo** [`setEditing`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1641).

#### [`PersonalDataBlock.onToggleExpandedEmail`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1653) · callback JSX · dentro de [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1485)

Responde al evento de interfaz `PersonalDataBlock.onToggleExpandedEmail`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setExpandedEmail`.
- **Llamadas directas en el cuerpo** [`setExpandedEmail`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1653).

#### [`tabGroups`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1661) · cálculo memorizado · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Función auxiliar de `NegocioPerfil` para `tab Groups`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Lo usa** [`tabLabelMap`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1712) (accede al módulo), [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1923) (pasa a groups).

#### [`tabLabelMap`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1710) · cálculo memorizado · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Función auxiliar de `NegocioPerfil` para `tab Label Map`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`tabGroups.forEach`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1712), [`group.items.forEach`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1713).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1806) (accede al módulo), [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1831) (referencia).

#### [`sections`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1721) · cálculo memorizado · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Función auxiliar de `NegocioPerfil` para `sections`.

- **Retorno visible o tipo declarado** `overview`, `personal`, `security-access`, `security-links`, `twofa`, `sessions`, `notifications`, `plan`, `appearance`, `language`, `help`, `feedback`, `manage`.
- **Hooks que llama** `useMemo`.
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1757) (accede al módulo), [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1761) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1753) · callback de infraestructura · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioPerfil`.

- **Actualizaciones de estado o acciones** `setProfileTab`, `setProfileView`.
- **Condiciones que evalúa** `deepLinkAppliedRef.current`, `ausencia de targetTab o ausencia de sections.targetTab`.
- **Llamadas directas en el cuerpo** [`params.get`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1756), [`setProfileTab`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1759), [`setProfileView`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1760).

#### [`handleTabChange`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1764) · callback React · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Atiende `ProfileTabs.onChange` y aplica la acción vinculada a ese control.

- **Entradas** `nextTab`.
- **Recibe eventos de** `ProfileTabs.onChange`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `clearTimeout`, `setTabsActiveKey`, `setProfileTab`.
- **Efectos y APIs** `clearTimeout`, `setTimeout`.
- **Condiciones que evalúa** `nextTab`, `tabTransitionRef.current`.
- **Llamadas directas en el cuerpo** [`clearTimeout`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1767), [`setTabsActiveKey`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1769), [`setTimeout`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1770), [`setProfileTab`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1780).
- **Lo usa** [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1925) (pasa a onChange).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1770) · callback de infraestructura · dentro de [`handleTabChange`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1764)

Ejecuta trabajo diferido o periódico iniciado por `handleTabChange`.

- **Actualizaciones de estado o acciones** `setTabsActiveKey`.
- **Llamadas directas en el cuerpo** [`setTabsActiveKey`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1771), [`logout`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1772).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1781) · callback de infraestructura · dentro de [`handleTabChange`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1764)

Ejecuta trabajo diferido o periódico iniciado por `handleTabChange`.

- **Actualizaciones de estado o acciones** `setProfileView`.
- **Llamadas directas en el cuerpo** [`setProfileView`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1782).

#### [`handleBack`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1788) · callback React · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Maneja `Back` y coordina las acciones indicadas abajo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setProfileView`, `setTabsActiveKey`.
- **Llamadas directas en el cuerpo** [`setProfileView`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1789), [`setTabsActiveKey`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1790).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1810) (referencia), [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1826) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1793) · callback de infraestructura · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioPerfil`.

- **Actualizaciones de estado o acciones** `setHeaderOptions`.
- **Condiciones que evalúa** `ausencia de isActive`.
- **Llamadas directas en el cuerpo** [`setHeaderOptions`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1795).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1834) · callback de infraestructura · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioPerfil`.

- **Actualizaciones de estado o acciones** `setDockOpenForHeader`, `clearTimeout`.
- **Efectos y APIs** `setTimeout`, `clearTimeout`.
- **Condiciones que evalúa** `ausencia de showSearchDock`, `ausencia de prev y showSearchDock`.
- **Llamadas directas en el cuerpo** [`setDockOpenForHeader`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1839), [`setTimeout`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1844), [`clearTimeout`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1847).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1844) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1834)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setDockOpenForHeader`.
- **Llamadas directas en el cuerpo** [`setDockOpenForHeader`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1845).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1855) · callback de infraestructura · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioPerfil`.

- **Actualizaciones de estado o acciones** `setDockTarget`, `setDockOpenForHeader`.
- **Condiciones que evalúa** `ausencia de isActive`.
- **Llamadas directas en el cuerpo** [`setDockTarget`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1857), [`setDockOpenForHeader`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1858), [`document.getElementById`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1861).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1864) · callback de infraestructura · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioPerfil`.

- **Actualizaciones de estado o acciones** `setTabsActiveKey`.
- **Condiciones que evalúa** `profileView`.
- **Llamadas directas en el cuerpo** [`setTabsActiveKey`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1866).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1870) · callback de infraestructura · dentro de [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L122)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `NegocioPerfil`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `clearTimeout`.
- **Condiciones que evalúa** `tabTransitionRef.current`.
- **Llamadas directas en el cuerpo** [`clearTimeout`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1873).

### [`apps/referidos-app/src/profile/shared/blocks/AccountStatusCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/AccountStatusCard.jsx#L1)

Resume el estado de cuenta que recibe el perfil para orientar al usuario en accesos restringidos.

**Superficie que exporta.** [`AccountStatusCard`](../../../apps/referidos-app/src/profile/shared/blocks/AccountStatusCard.jsx#L4).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L69) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L67) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`AccountStatusCard`](../../../apps/referidos-app/src/profile/shared/blocks/AccountStatusCard.jsx#L4) · componente React · exportación por defecto

Monta `BadgeCheck`, `button`, `ShieldCheck`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, statusLabel, subtitle, benefitsTitle, benefits, verifyLabel, onVerify, footer}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `BadgeCheck`, `button`, `ShieldCheck`.
- **Llamadas directas en el cuerpo** [`perks.map`](../../../apps/referidos-app/src/profile/shared/blocks/AccountStatusCard.jsx#L41).
- **Lo usa** [`ManageAccountPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1348) (renderiza), [`ManageAccountPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1326) (renderiza).

### [`apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L1)

Presenta el alias visible de usuario con acciones de edición cuando las ofrece la pantalla.

**Superficie que exporta.** [`AliasCard`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L4).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L70) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`AliasCard`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L4) · componente React · exportación por defecto

Monta `input`, `X`, `Check`, `button`, `Pencil`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{usuario, setUser, config, status, onStatus, scrollContainerId}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[alias, setAlias] mediante useState`, `[baseAlias, setBaseAlias] mediante useState`, `[isEditingAlias, setIsEditingAlias] mediante useState`, `[invalidChars, setInvalidChars] mediante useState`, `aliasInputRef mediante useRef`, `aliasRowRef mediante useRef`, `aliasFocusedRef mediante useRef`, `prevViewportRef mediante useRef`, `[viewportH, setViewportH] mediante useState`, `[localStatus, setLocalStatus] mediante useState`.
- **Interfaz que monta** `input`, `X`, `Check`, `button`, `Pencil`.
- **Hooks que llama** `useState`, `useRef`, `useEffect`.
- **Llamadas directas en el cuerpo** [`alias.match`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L123), [`alias.trim`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L127).
- **Lo usa** [`OverviewPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1414) (renderiza).

#### [`aliasConfig`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L13) · cálculo memorizado · dentro de [`AliasCard`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L4)

Función auxiliar de `AliasCard` para `alias Config`.

- **Retorno visible o tipo declarado** `panelTitle`, `emptyMessage`, `editMessage`, `viewMessage`, `editTitle`, `fieldLabel`, `placeholder`, `displayLabel`, `emptyValue`, `valueClass`, `minLettersText`.
- **Hooks que llama** `useMemo`.
- **Lo usa** [`AliasCard`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L44) (accede al módulo).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L49) · callback de infraestructura · dentro de [`AliasCard`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L4)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AliasCard`.

- **Actualizaciones de estado o acciones** `setBaseAlias`, `setAlias`.
- **Condiciones que evalúa** `ausencia de isEditingAlias`.
- **Llamadas directas en el cuerpo** [`setBaseAlias`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L51), [`setAlias`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L53).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L57) · callback de infraestructura · dentro de [`AliasCard`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L4)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AliasCard`.

- **Efectos y APIs** `window.visualViewport.addEventListener`, `window.addEventListener`, `window.visualViewport.removeEventListener`, `window.removeEventListener`.
- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`update`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L63), [`window.visualViewport.addEventListener`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L64), [`window.addEventListener`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L66), [`window.visualViewport.removeEventListener`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L70), [`window.removeEventListener`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L72).

#### [`update`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L59) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L57)

Coordina cambios de estado durante `update`.

- **Actualizaciones de estado o acciones** `setViewportH`.
- **Llamadas directas en el cuerpo** [`setViewportH`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L61).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L63) (llama).

#### [`centerAliasInView`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L78) · callback React · dentro de [`AliasCard`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L4)

Función auxiliar de `AliasCard` para `center Alias In View`.

- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `ausencia de row`, `container`.
- **Llamadas directas en el cuerpo** [`document.getElementById`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L81), [`container.getBoundingClientRect`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L83), [`row.getBoundingClientRect`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L85), [`container.scrollTo`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L94), [`window.scrollTo`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L96).
- **Lo usa** [`handleAliasFocus`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L103) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L118) (llama), [`AliasCard`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L120) (referencia).

#### [`handleAliasFocus`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L100) · callback React · dentro de [`AliasCard`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L4)

Atiende `input.onFocus` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `input.onFocus`.
- **Hooks que llama** `useCallback`.
- **Efectos y APIs** `requestAnimationFrame`.
- **Llamadas directas en el cuerpo** [`requestAnimationFrame`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L102), [`centerAliasInView`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L103).
- **Lo usa** [`AliasCard`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L197) (pasa a onFocus).

#### [`handleAliasBlur`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L107) · callback React · dentro de [`AliasCard`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L4)

Atiende `input.onBlur` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `input.onBlur`.
- **Hooks que llama** `useCallback`.
- **Lo usa** [`AliasCard`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L198) (pasa a onBlur).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L111) · callback de infraestructura · dentro de [`AliasCard`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L4)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AliasCard`.

- **Efectos y APIs** `requestAnimationFrame`.
- **Condiciones que evalúa** `ausencia de viewportH`, `ausencia de aliasFocusedRef.current o ausencia de prev`, `viewportH`.
- **Llamadas directas en el cuerpo** [`requestAnimationFrame`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L117), [`centerAliasInView`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L118).

#### [`handleSave`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L129) · función · dentro de [`AliasCard`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L4)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setStatus`, `setUser`, `setBaseAlias`, `setIsEditingAlias`.
- **Condiciones que evalúa** `ausencia de usuario`, `ausencia de nextAlias o ausencia de hasMinLetters o invalidChars`.
- **Llamadas directas en el cuerpo** [`alias.trim`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L131), [`setStatus`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L133), [`setUser`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L136), [`setBaseAlias`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L137), [`setIsEditingAlias`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L138).
- **Lo usa** [`AliasCard`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L228) (pasa a onClick).

#### [`handleCancel`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L142) · función · dentro de [`AliasCard`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L4)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setAlias`, `setIsEditingAlias`, `setInvalidChars`, `setStatus`.
- **Llamadas directas en el cuerpo** [`setAlias`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L143), [`setIsEditingAlias`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L144), [`setInvalidChars`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L145), [`setStatus`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L146).
- **Lo usa** [`AliasCard`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L221) (pasa a onClick).

#### [`handleAliasChange`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L149) · función · dentro de [`AliasCard`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L4)

Maneja `Alias Change` y coordina las acciones indicadas abajo.

- **Entradas** `value`.
- **Actualizaciones de estado o acciones** `setInvalidChars`, `setAlias`, `setStatus`.
- **Efectos y APIs** `value.replace`.
- **Condiciones que evalúa** `currentStatus`.
- **Llamadas directas en el cuerpo** [`test`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L151), [`value.replace`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L154), [`setInvalidChars`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L158), [`setAlias`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L159), [`setStatus`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L160).
- **Lo usa** [`input.onChange`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L195) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L163) · callback de infraestructura · dentro de [`AliasCard`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L4)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `AliasCard`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `setTimeout`, `clearTimeout`.
- **Condiciones que evalúa** `ausencia de currentStatus`.
- **Llamadas directas en el cuerpo** [`setTimeout`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L165), [`clearTimeout`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L168).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L165) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L163)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Actualizaciones de estado o acciones** `setStatus`.
- **Llamadas directas en el cuerpo** [`setStatus`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L166).

#### [`input.onChange`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L195) · callback JSX · dentro de [`AliasCard`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L4)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Llamadas directas en el cuerpo** [`handleAliasChange`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L195).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L244) · callback JSX · dentro de [`AliasCard`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L4)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setIsEditingAlias`.
- **Llamadas directas en el cuerpo** [`setIsEditingAlias`](../../../apps/referidos-app/src/profile/shared/blocks/AliasCard.jsx#L244).

### [`apps/referidos-app/src/profile/shared/blocks/BenefitsCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/BenefitsCard.jsx#L1)

Resume beneficios y su acceso desde la vista general de perfil.

**Superficie que exporta.** [`BenefitsCard`](../../../apps/referidos-app/src/profile/shared/blocks/BenefitsCard.jsx#L3).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L71) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L68) (importa).

**Dependencias del archivo.** `react`.

#### [`BenefitsCard`](../../../apps/referidos-app/src/profile/shared/blocks/BenefitsCard.jsx#L3) · componente React · exportación por defecto

Monta `BadgeIcon`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, badgeLabel, BadgeIcon, perks}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `BadgeIcon`.
- **Llamadas directas en el cuerpo** [`perks.map`](../../../apps/referidos-app/src/profile/shared/blocks/BenefitsCard.jsx#L16).
- **Lo usa** [`OverviewPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1405) (renderiza), [`OverviewPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1460) (renderiza).
