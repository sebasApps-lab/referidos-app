# PWA principal · Perfil · 3 de 4

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/ExploreTiersCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/ExploreTiersCard.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/FingerprintAccessCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/FingerprintAccessCard.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/FontSelector.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/FontSelector.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/IdentityCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/IdentityCard.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/LanguageSelector.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/LanguageSelector.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/LinkedAccountsCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/LinkedAccountsCard.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/NegocioIdentityCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/NegocioIdentityCard.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/NotificationsPreferencesCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/NotificationsPreferencesCard.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/PasswordAccessCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/PasswordAccessCard.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/PersonalDataBlock.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/PersonalDataBlock.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/PinAccessCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/PinAccessCard.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/PlanBenefitsCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/PlanBenefitsCard.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/SessionsList.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/SessionsList.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/SupportFeedbackForm.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/SupportFeedbackForm.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/SupportHelpOptions.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/SupportHelpOptions.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/ThemeSelector.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/ThemeSelector.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/TierCurrentCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/TierCurrentCard.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/TierNextCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/TierNextCard.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/TwoFACard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/TwoFACard.jsx#L1)
- [`apps/referidos-app/src/profile/shared/blocks/VerificationCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/VerificationCard.jsx#L1)
- [`apps/referidos-app/src/profile/shared/data/faqContent.js`](../../../apps/referidos-app/src/profile/shared/data/faqContent.js#L1)
- [`apps/referidos-app/src/profile/shared/data/supportChatCategories.js`](../../../apps/referidos-app/src/profile/shared/data/supportChatCategories.js#L1)
- [`apps/referidos-app/src/profile/shared/hooks/useMfaState.js`](../../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js#L1)
- [`apps/referidos-app/src/profile/shared/ProfilePanel.jsx`](../../../apps/referidos-app/src/profile/shared/ProfilePanel.jsx#L1)
- [`apps/referidos-app/src/profile/shared/ProfileTabs.jsx`](../../../apps/referidos-app/src/profile/shared/ProfileTabs.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L1)

Aísla controles de acción destructiva para que el flujo de cuenta pida confirmación explícita.

**Superficie que exporta.** [`DangerZone`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L9).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L72) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L69) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, `lucide-react`, [`../../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js), [`../../../services/authService`](../../../apps/referidos-app/src/services/authService.js), [`../../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js).

#### [`DangerZone`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L9) · componente React · exportación por defecto

Monta `AlertTriangle`, `button`, `LogOut`, `Power`, `Trash2`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{usuario, setUser}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `logout mediante useAppStore`, `selector s.logout`, `[deleting, setDeleting] mediante useState`, `[deleteError, setDeleteError] mediante useState`.
- **Interfaz que monta** `AlertTriangle`, `button`, `LogOut`, `Power`, `Trash2`.
- **Hooks que llama** `useNavigate`, `useModal`, `useAppStore`, `useState`.
- **Usa código de** [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama), [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama).
- **Lo usa** [`ManageAccountPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1353) (renderiza), [`ManageAccountPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1346) (renderiza).

#### [`confirmDelete`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L16) · función · dentro de [`DangerZone`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L9)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setDeleteError`.
- **Efectos y APIs** `openModal`.
- **Condiciones que evalúa** `ausencia de usuario.id_auth`.
- **Llamadas directas en el cuerpo** [`setDeleteError`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L17), [`openModal`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L24).
- **Lo usa** [`DangerZone`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L117) (pasa a onClick).

#### [`onConfirm`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L26) · función · asíncrona · dentro de [`confirmDelete`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L16)

Maneja `Confirm` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setDeleting`, `setDeleteError`, `setUser`.
- **Efectos y APIs** `closeModal`, `localStorage.removeItem`, `window.location.replace`.
- **Condiciones que evalúa** `deleting`, `ausencia de res.ok`.
- **Usa código de** [`deleteUserAccount`](../../../apps/referidos-app/src/services/authService.js#L188) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`setDeleting`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L29), [`deleteUserAccount`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L30), [`closeModal`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L33), [`setDeleteError`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L36), [`setUser`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L40), [`localStorage.removeItem`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L43), [`window.location.replace`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L56).

#### [`onCancel`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L58) · función · dentro de [`confirmDelete`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L16)

Maneja `Cancel` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setDeleting`.
- **Llamadas directas en el cuerpo** [`setDeleting`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L59).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L129) · callback JSX · dentro de [`DangerZone`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L9)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigate`.
- **Llamadas directas en el cuerpo** [`navigate`](../../../apps/referidos-app/src/profile/shared/blocks/DangerZone.jsx#L129).

### [`apps/referidos-app/src/profile/shared/blocks/ExploreTiersCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/ExploreTiersCard.jsx#L1)

Presenta la entrada a los niveles y beneficios disponibles.

**Superficie que exporta.** [`ExploreTiersCard`](../../../apps/referidos-app/src/profile/shared/blocks/ExploreTiersCard.jsx#L4).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L73) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`ExploreTiersCard`](../../../apps/referidos-app/src/profile/shared/blocks/ExploreTiersCard.jsx#L4) · componente React · exportación por defecto

Monta `Sparkles`, `button`, `ArrowRight`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, description, onExplore}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Sparkles`, `button`, `ArrowRight`.
- **Lo usa** [`BeneficiosPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1335) (renderiza).

### [`apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L1)

Renderiza el catálogo de preguntas frecuentes dentro de ayuda.

**Superficie que exporta.** [`FaqContent`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L56).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L89) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L85) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../data/faqContent`](../../../apps/referidos-app/src/profile/shared/data/faqContent.js).

#### [`AnswerBlock`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L5) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{blocks}`.
- **Retorno visible o tipo declarado** `JSX`, `null`.
- **Condiciones que evalúa** `block.type`.
- **Llamadas directas en el cuerpo** [`blocks.map`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L8), [`block.items.map`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L18).
- **Lo usa** [`FaqContent`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L141) (renderiza).

#### [`FaqContent`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L56) · componente React · exportación por defecto

Monta `button`, `ChevronLeft`, `ChevronDown`, `AnswerBlock`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onBack, audience}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[openItems, setOpenItems] mediante useState`.
- **Interfaz que monta** `button`, `ChevronLeft`, `ChevronDown`, `AnswerBlock`.
- **Hooks que llama** `useState`.
- **Llamadas directas en el cuerpo** [`sections.map`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L109), [`section.items.map`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L115), [`openItems.has`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L116).
- **Lo usa** [`HelpPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1262) (renderiza), [`HelpPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1245) (renderiza).

#### [`toggleItem`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L59) · función · dentro de [`FaqContent`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L56)

Coordina cambios de estado durante `toggle Item`.

- **Entradas** `id`.
- **Actualizaciones de estado o acciones** `setOpenItems`.
- **Condiciones que evalúa** `next.has`.
- **Llamadas directas en el cuerpo** [`setOpenItems`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L60), [`next.has`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L62), [`next.delete`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L63), [`next.add`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L65).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L126) (llama).

#### [`sections`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L71) · cálculo memorizado · dentro de [`FaqContent`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L56)

Función auxiliar de `FaqContent` para `sections`.

- **Retorno visible o tipo declarado** `items`, `booleano`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de audience`, `sectionAudience y ausencia de sectionAudience.includes`, `ausencia de item.audience`.
- **Usa código de** [`FAQ_SECTIONS`](../../../apps/referidos-app/src/profile/shared/data/faqContent.js#L1) (referencia).
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L73), [`FAQ_SECTIONS.map`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L73), [`sectionAudience.includes`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L75), [`section.items.filter`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L78), [`item.audience.includes`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L80).
- **Lo usa** [`FaqContent`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L109) (accede al módulo).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L126) · callback JSX · dentro de [`FaqContent`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L56)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`toggleItem`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L126).

### [`apps/referidos-app/src/profile/shared/blocks/FingerprintAccessCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/FingerprintAccessCard.jsx#L1)

Expone estado y acción de biometría local. La comprobación real está en servicios y modales.

**Superficie que exporta.** [`FingerprintAccessCard`](../../../apps/referidos-app/src/profile/shared/blocks/FingerprintAccessCard.jsx#L4).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L74) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L70) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`FingerprintAccessCard`](../../../apps/referidos-app/src/profile/shared/blocks/FingerprintAccessCard.jsx#L4) · componente React · exportación por defecto

Monta `Fingerprint`, `Check`, `button`, `Minus`, `Plus`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{enabled, onAdd, onRemove}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Fingerprint`, `Check`, `button`, `Minus`, `Plus`.
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1032) (renderiza), [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1015) (renderiza).

### [`apps/referidos-app/src/profile/shared/blocks/FontSelector.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/FontSelector.jsx#L1)

Pinta controles de representación tipográfica de la sección de apariencia.

**Superficie que exporta.** [`FontSelector`](../../../apps/referidos-app/src/profile/shared/blocks/FontSelector.jsx#L4).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L75) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L71) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`FontSelector`](../../../apps/referidos-app/src/profile/shared/blocks/FontSelector.jsx#L4) · componente React · exportación por defecto

Monta `Type`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{value, onChange}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Type`, `button`.
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-app/src/profile/shared/blocks/FontSelector.jsx#L15).
- **Lo usa** [`AppAppearancePanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1216) (renderiza), [`AppAppearancePanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1199) (renderiza).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/shared/blocks/FontSelector.jsx#L23) · callback JSX · dentro de [`FontSelector`](../../../apps/referidos-app/src/profile/shared/blocks/FontSelector.jsx#L4)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onChange`](../../../apps/referidos-app/src/profile/shared/blocks/FontSelector.jsx#L23).

### [`apps/referidos-app/src/profile/shared/blocks/IdentityCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/IdentityCard.jsx#L1)

Muestra la identidad de cliente para personalizar el perfil sin repetir la estructura.

**Superficie que exporta.** [`IdentityCard`](../../../apps/referidos-app/src/profile/shared/blocks/IdentityCard.jsx#L4).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L76) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L72) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`IdentityCard`](../../../apps/referidos-app/src/profile/shared/blocks/IdentityCard.jsx#L4) · componente React · exportación por defecto

Monta `ShieldCheck`, `img`, `button`, `Camera`, `input`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, name, meta, avatarSrc, showVerified, onAvatarSelect}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `fileRef mediante useRef`.
- **Interfaz que monta** `ShieldCheck`, `img`, `button`, `Camera`, `input`.
- **Hooks que llama** `useRef`.
- **Lo usa** [`OverviewPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1390) (renderiza), [`OverviewPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1451) (renderiza).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/shared/blocks/IdentityCard.jsx#L37) · callback JSX · dentro de [`IdentityCard`](../../../apps/referidos-app/src/profile/shared/blocks/IdentityCard.jsx#L4)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`fileRef.current.click`](../../../apps/referidos-app/src/profile/shared/blocks/IdentityCard.jsx#L37).

#### [`input.onChange`](../../../apps/referidos-app/src/profile/shared/blocks/IdentityCard.jsx#L47) · callback JSX · dentro de [`IdentityCard`](../../../apps/referidos-app/src/profile/shared/blocks/IdentityCard.jsx#L4)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Condiciones que evalúa** `onAvatarSelect`.
- **Llamadas directas en el cuerpo** [`onAvatarSelect`](../../../apps/referidos-app/src/profile/shared/blocks/IdentityCard.jsx#L49).

### [`apps/referidos-app/src/profile/shared/blocks/LanguageSelector.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/LanguageSelector.jsx#L1)

Muestra las opciones de idioma que presenta o admite la interfaz del perfil.

**Superficie que exporta.** [`LanguageSelector`](../../../apps/referidos-app/src/profile/shared/blocks/LanguageSelector.jsx#L10).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L77) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L73) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`DEFAULT_LANGUAGES`](../../../apps/referidos-app/src/profile/shared/blocks/LanguageSelector.jsx#L4) · variable de módulo

Conserva la lista de `DEFAULT LANGUAGES` usada por el módulo.

- **Lo usa** [`LanguageSelector`](../../../apps/referidos-app/src/profile/shared/blocks/LanguageSelector.jsx#L13) (referencia).

#### [`LanguageSelector`](../../../apps/referidos-app/src/profile/shared/blocks/LanguageSelector.jsx#L10) · componente React · exportación por defecto

Monta `Languages`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{value, onChange, options}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Languages`, `button`.
- **Llamadas directas en el cuerpo** [`options.map`](../../../apps/referidos-app/src/profile/shared/blocks/LanguageSelector.jsx#L24).
- **Lo usa** [`LanguagePanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1228) (renderiza), [`LanguagePanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1211) (renderiza).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/shared/blocks/LanguageSelector.jsx#L30) · callback JSX · dentro de [`LanguageSelector`](../../../apps/referidos-app/src/profile/shared/blocks/LanguageSelector.jsx#L10)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onChange`](../../../apps/referidos-app/src/profile/shared/blocks/LanguageSelector.jsx#L30).

### [`apps/referidos-app/src/profile/shared/blocks/LinkedAccountsCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/LinkedAccountsCard.jsx#L1)

Dibuja proveedores o cuentas enlazadas y expone las acciones del flujo.

**Superficie que exporta.** [`LinkedAccountsCard`](../../../apps/referidos-app/src/profile/shared/blocks/LinkedAccountsCard.jsx#L17).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L78) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L75) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`DEFAULT_PROVIDERS`](../../../apps/referidos-app/src/profile/shared/blocks/LinkedAccountsCard.jsx#L4) · variable de módulo

Conserva la lista de `DEFAULT PROVIDERS` usada por el módulo.

- **Lo usa** [`LinkedAccountsCard`](../../../apps/referidos-app/src/profile/shared/blocks/LinkedAccountsCard.jsx#L19) (referencia).

#### [`LinkedAccountsCard`](../../../apps/referidos-app/src/profile/shared/blocks/LinkedAccountsCard.jsx#L17) · componente React · exportación por defecto

Monta `button`, `Minus`, `Plus`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, providers, linked, verified, onToggle, verificationHint}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `Minus`, `Plus`.
- **Llamadas directas en el cuerpo** [`providers.map`](../../../apps/referidos-app/src/profile/shared/blocks/LinkedAccountsCard.jsx#L31).
- **Lo usa** [`LinkedAccountsPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1117) (renderiza), [`LinkedAccountsPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1100) (renderiza).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/shared/blocks/LinkedAccountsCard.jsx#L49) · callback JSX · dentro de [`LinkedAccountsCard`](../../../apps/referidos-app/src/profile/shared/blocks/LinkedAccountsCard.jsx#L17)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onToggle`](../../../apps/referidos-app/src/profile/shared/blocks/LinkedAccountsCard.jsx#L49).

### [`apps/referidos-app/src/profile/shared/blocks/NegocioIdentityCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/NegocioIdentityCard.jsx#L1)

Muestra identidad y datos visuales propios del perfil comercial.

**Superficie que exporta.** [`NegocioIdentityCard`](../../../apps/referidos-app/src/profile/shared/blocks/NegocioIdentityCard.jsx#L4).

**Módulos que lo cargan.** [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L74) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`NegocioIdentityCard`](../../../apps/referidos-app/src/profile/shared/blocks/NegocioIdentityCard.jsx#L4) · componente React · exportación por defecto

Monta `TriangleAlert`, `button`, `Pencil`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, subtitle, warningText, showWarning, items, onEdit, valueClass}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `TriangleAlert`, `button`, `Pencil`.
- **Llamadas directas en el cuerpo** [`items.map`](../../../apps/referidos-app/src/profile/shared/blocks/NegocioIdentityCard.jsx#L32).
- **Lo usa** [`OverviewPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1469) (renderiza).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/shared/blocks/NegocioIdentityCard.jsx#L50) · callback JSX · dentro de [`NegocioIdentityCard`](../../../apps/referidos-app/src/profile/shared/blocks/NegocioIdentityCard.jsx#L4)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onEdit`](../../../apps/referidos-app/src/profile/shared/blocks/NegocioIdentityCard.jsx#L50).

### [`apps/referidos-app/src/profile/shared/blocks/NotificationsPreferencesCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/NotificationsPreferencesCard.jsx#L1)

Organiza los controles visibles de preferencias de avisos.

**Superficie que exporta.** [`DEFAULT_NOTIFICATION_PREFS`](../../../apps/referidos-app/src/profile/shared/blocks/NotificationsPreferencesCard.jsx#L19), [`NOTIFICATION_CHANNELS`](../../../apps/referidos-app/src/profile/shared/blocks/NotificationsPreferencesCard.jsx#L25), [`NotificationsPreferencesCard`](../../../apps/referidos-app/src/profile/shared/blocks/NotificationsPreferencesCard.jsx#L31).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L91) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L87) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`Toggle`](../../../apps/referidos-app/src/profile/shared/blocks/NotificationsPreferencesCard.jsx#L5) · componente React

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{active, onChange}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`.
- **Lo usa** [`NotificationsPreferencesCard`](../../../apps/referidos-app/src/profile/shared/blocks/NotificationsPreferencesCard.jsx#L76) (renderiza).

#### [`DEFAULT_NOTIFICATION_PREFS`](../../../apps/referidos-app/src/profile/shared/blocks/NotificationsPreferencesCard.jsx#L19) · variable de módulo · exportado

Agrupa la configuración o catálogo de `DEFAULT NOTIFICATION PREFS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `promos`, `novedades`, `seguridad`.
- **Lo usa** [`NotificationsPreferencesCard`](../../../apps/referidos-app/src/profile/shared/blocks/NotificationsPreferencesCard.jsx#L35) (referencia), [`NotificationsPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1146) (referencia), [`NotificationsPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1129) (referencia).

#### [`NOTIFICATION_CHANNELS`](../../../apps/referidos-app/src/profile/shared/blocks/NotificationsPreferencesCard.jsx#L25) · variable de módulo · exportado

Conserva la lista de `NOTIFICATION CHANNELS` usada por el módulo.

- **Lo usa** [`NotificationsPreferencesCard`](../../../apps/referidos-app/src/profile/shared/blocks/NotificationsPreferencesCard.jsx#L34) (referencia), [`NotificationsPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1196) (pasa a channels), [`NotificationsPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1179) (pasa a channels).

#### [`NotificationsPreferencesCard`](../../../apps/referidos-app/src/profile/shared/blocks/NotificationsPreferencesCard.jsx#L31) · componente React · exportación por defecto

Monta `Bell`, `Toggle`, `button`, `X`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{permission, statusLabel, channels, prefs, showChannels, showWarning, onToggle, onDismissWarning}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Bell`, `Toggle`, `button`, `X`.
- **Llamadas directas en el cuerpo** [`channels.map`](../../../apps/referidos-app/src/profile/shared/blocks/NotificationsPreferencesCard.jsx#L70).
- **Lo usa** [`NotificationsPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1192) (renderiza), [`NotificationsPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1175) (renderiza).

#### [`Toggle.onChange`](../../../apps/referidos-app/src/profile/shared/blocks/NotificationsPreferencesCard.jsx#L78) · callback JSX · dentro de [`NotificationsPreferencesCard`](../../../apps/referidos-app/src/profile/shared/blocks/NotificationsPreferencesCard.jsx#L31)

Responde al evento de interfaz `Toggle.onChange`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onToggle`](../../../apps/referidos-app/src/profile/shared/blocks/NotificationsPreferencesCard.jsx#L78).

### [`apps/referidos-app/src/profile/shared/blocks/PasswordAccessCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/PasswordAccessCard.jsx#L1)

Presenta si la cuenta tiene contraseña y los controles para activarla o modificarla.

**Superficie que exporta.** [`PasswordAccessCard`](../../../apps/referidos-app/src/profile/shared/blocks/PasswordAccessCard.jsx#L12).

**Módulos que lo cargan.** [`ModalForcePasswordChange.jsx`](../../../apps/referidos-app/src/components/modals/ModalForcePasswordChange.jsx#L2) (importa), [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L79) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L77) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`PasswordAccessCard`](../../../apps/referidos-app/src/profile/shared/blocks/PasswordAccessCard.jsx#L12) · componente React · exportación por defecto

Monta `Asterisk`, `Check`, `button`, `X`, `Pencil`, `Plus`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{passwordActive, showPasswordForm, passwordMode, passwordValue, passwordConfirm, showPassword, showPasswordConfirm, hasMinLength, hasNumberAndSymbol, passwordsMatch, showPasswordRules, showPasswordErrors, showConfirmErrors, showConfirmRule, canSavePassword, onPasswordCancel, onPasswordSave, onOpenAdd, onOpenChange, onToggleShowPassword, onToggleShowPasswordConfirm, onChangePasswordValue, onChangePasswordConfirm, onFocusField, onBlurField, passwordFormRef, passwordInputRef, confirmInputRef, hideClose, hideCancel}`.
- **Retorno visible o tipo declarado** `JSX`, `null`.
- **Interfaz que monta** `Asterisk`, `Check`, `button`, `X`, `Pencil`, `Plus`, `input`, `EyeOff`, `Eye`, `Icon`.
- **Condiciones que evalúa** `showPasswordErrors y item.ok`, `showConfirmErrors y passwordsMatch`.
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-app/src/profile/shared/blocks/PasswordAccessCard.jsx#L135).
- **Lo usa** [`ModalForcePasswordChange`](../../../apps/referidos-app/src/components/modals/ModalForcePasswordChange.jsx#L82) (renderiza), [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L985) (renderiza), [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L968) (renderiza).

#### [`input.onFocus`](../../../apps/referidos-app/src/profile/shared/blocks/PasswordAccessCard.jsx#L115) · callback JSX · dentro de [`PasswordAccessCard`](../../../apps/referidos-app/src/profile/shared/blocks/PasswordAccessCard.jsx#L12)

Responde al evento de interfaz `input.onFocus`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onFocusField`](../../../apps/referidos-app/src/profile/shared/blocks/PasswordAccessCard.jsx#L115).

#### [`input.onFocus`](../../../apps/referidos-app/src/profile/shared/blocks/PasswordAccessCard.jsx#L175) · callback JSX · dentro de [`PasswordAccessCard`](../../../apps/referidos-app/src/profile/shared/blocks/PasswordAccessCard.jsx#L12)

Responde al evento de interfaz `input.onFocus`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onFocusField`](../../../apps/referidos-app/src/profile/shared/blocks/PasswordAccessCard.jsx#L175).

### [`apps/referidos-app/src/profile/shared/blocks/PersonalDataBlock.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/PersonalDataBlock.jsx#L1)

Distribuye el formulario o la lectura de datos personales y entrega cambios al contenedor.

**Superficie que exporta.** [`PersonalDataBlock`](../../../apps/referidos-app/src/profile/shared/blocks/PersonalDataBlock.jsx#L4).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L81) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L79) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`PersonalDataBlock`](../../../apps/referidos-app/src/profile/shared/blocks/PersonalDataBlock.jsx#L4) · componente React · exportación por defecto

Monta `button`, `Pencil`, `User`, `input`, `Mail`, `Phone`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{editingNames, editingContact, fullName, nombres, apellidos, addressItems, addressEmptyText, email, telefono, expandedEmail, emailVerified, onEditNames, onEditAddress, onEditContact, onChangeNombres, onChangeApellidos, onChangeEmail, onChangeTelefono, onCancelNames, onCancelContact, onSaveNames, onSaveContact, showSaveNames, showSaveContact, saveContactDisabled, onToggleExpandedEmail}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `Pencil`, `User`, `input`, `Mail`, `Phone`, `Check`.
- **Llamadas directas en el cuerpo** [`addressItems.map`](../../../apps/referidos-app/src/profile/shared/blocks/PersonalDataBlock.jsx#L118), [`telefono.trim`](../../../apps/referidos-app/src/profile/shared/blocks/PersonalDataBlock.jsx#L237).
- **Lo usa** [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1571) (renderiza), [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1627) (renderiza).

### [`apps/referidos-app/src/profile/shared/blocks/PinAccessCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/PinAccessCard.jsx#L1)

Presenta disponibilidad y cambios del PIN local. El hash y verificación se manejan fuera de esta vista.

**Superficie que exporta.** [`PinAccessCard`](../../../apps/referidos-app/src/profile/shared/blocks/PinAccessCard.jsx#L4).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L80) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L78) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`PinAccessCard`](../../../apps/referidos-app/src/profile/shared/blocks/PinAccessCard.jsx#L4) · componente React · exportación por defecto

Monta `Lock`, `Check`, `button`, `Minus`, `X`, `Plus`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{showPinForm, pinEnabled, pinStep, pinValue, pinSlots, pinReveal, pinComplete, pinMatches, pinFocused, onRemovePin, onTogglePinForm, onPinPointerDown, onPinValueChange, onPinFocus, onPinBlur, registerHiddenRef, onResetPinForm, onPinNext, onPinConfirm}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Lock`, `Check`, `button`, `Minus`, `X`, `Plus`, `input`, `Icon`.
- **Llamadas directas en el cuerpo** [`pinSlots.findIndex`](../../../apps/referidos-app/src/profile/shared/blocks/PinAccessCard.jsx#L25), [`pinSlots.map`](../../../apps/referidos-app/src/profile/shared/blocks/PinAccessCard.jsx#L93).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1038) (renderiza), [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1021) (renderiza).

#### [`input.onChange`](../../../apps/referidos-app/src/profile/shared/blocks/PinAccessCard.jsx#L85) · callback JSX · dentro de [`PinAccessCard`](../../../apps/referidos-app/src/profile/shared/blocks/PinAccessCard.jsx#L4)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`onPinValueChange`](../../../apps/referidos-app/src/profile/shared/blocks/PinAccessCard.jsx#L85).

### [`apps/referidos-app/src/profile/shared/blocks/PlanBenefitsCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/PlanBenefitsCard.jsx#L1)

Muestra beneficios que el panel de perfil asocia a un plan.

**Superficie que exporta.** [`PlanBenefitsCard`](../../../apps/referidos-app/src/profile/shared/blocks/PlanBenefitsCard.jsx#L4).

**Módulos que lo cargan.** [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L76) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`PlanBenefitsCard`](../../../apps/referidos-app/src/profile/shared/blocks/PlanBenefitsCard.jsx#L4) · componente React · exportación por defecto

Monta `Crown`, `BadgeCheck`, `button`, `ArrowUpRight`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, planLabel, perks, history, onUpgrade, upgradeLabel}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Crown`, `BadgeCheck`, `button`, `ArrowUpRight`.
- **Llamadas directas en el cuerpo** [`perks.map`](../../../apps/referidos-app/src/profile/shared/blocks/PlanBenefitsCard.jsx#L22), [`history.map`](../../../apps/referidos-app/src/profile/shared/blocks/PlanBenefitsCard.jsx#L34).
- **Lo usa** [`BeneficiosPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1306) (renderiza).

### [`apps/referidos-app/src/profile/shared/blocks/SessionsList.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/SessionsList.jsx#L1)

Renderiza sesiones de dispositivos y acciones de revocación que expone el contenedor.

**Superficie que exporta.** [`SessionsList`](../../../apps/referidos-app/src/profile/shared/blocks/SessionsList.jsx#L3).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L84) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L80) (importa).

**Dependencias del archivo.** `react`.

#### [`SessionsList`](../../../apps/referidos-app/src/profile/shared/blocks/SessionsList.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{items, renderLeading, leadingClassName, getPrimaryText, getSecondaryText, renderTrailing}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`items.map`](../../../apps/referidos-app/src/profile/shared/blocks/SessionsList.jsx#L13), [`renderLeading`](../../../apps/referidos-app/src/profile/shared/blocks/SessionsList.jsx#L22), [`getPrimaryText`](../../../apps/referidos-app/src/profile/shared/blocks/SessionsList.jsx#L26), [`getSecondaryText`](../../../apps/referidos-app/src/profile/shared/blocks/SessionsList.jsx#L29), [`renderTrailing`](../../../apps/referidos-app/src/profile/shared/blocks/SessionsList.jsx#L34).
- **Lo usa** [`SessionsPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L242) (renderiza), [`SessionsPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L241) (renderiza).

### [`apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L1)

Composición de chat, categorías y acciones para abrir una solicitud desde el perfil.

**Superficie que exporta.** [`SupportChatHubBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L22).

**Módulos que lo cargan.** [`SupportChat.jsx`](../../../apps/referidos-app/src/profile/shared/sections/SupportChat.jsx#L3) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, `react-router-dom`, [`../../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../../../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js), [`../data/supportChatCategories`](../../../apps/referidos-app/src/profile/shared/data/supportChatCategories.js), [`../services/supportChatClient`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js), [`@referidos/support-sdk/supportClient`](../../../packages/support-sdk/src/supportClient.js), [`../../../services/loggingClient`](../../../apps/referidos-app/src/services/loggingClient.js), [`../../../config/runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js).

#### [`resolveSupportAppChannel`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L13) · función

Obtiene o resuelve `Support App Channel` para entregarlo al consumidor.

- **Condiciones que evalúa** `explicitChannel`, `appId.includes`.
- **Usa código de** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L81) (accede al módulo).
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L14), [`trim`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L14), [`appId.includes`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L17).
- **Lo usa** [`handleCreate`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L104) (llama).

#### [`SupportChatHubBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L22) · componente React · exportación por defecto

Monta `button`, `input`, `MessageSquareText`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{role, onShowTickets}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `onboarding mediante useAppStore`, `selector s.onboarding`, `[category, setCategory] mediante useState`, `[summary, setSummary] mediante useState`, `[includeContext, setIncludeContext] mediante useState`, `[loading, setLoading] mediante useState`, `[created, setCreated] mediante useState`, `[queueCanceled, setQueueCanceled] mediante useState`.
- **Interfaz que monta** `button`, `input`, `MessageSquareText`.
- **Hooks que llama** `useAppStore`, `useLocation`, `useModal`, `useState`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Llamadas directas en el cuerpo** [`summary.trim`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L90), [`categories.map`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L170).
- **Lo usa** [`SupportChat`](../../../apps/referidos-app/src/profile/shared/sections/SupportChat.jsx#L35) (renderiza).

#### [`categories`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L34) · cálculo memorizado · dentro de [`SupportChatHubBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L22)

Función auxiliar de `SupportChatHubBlock` para `categories`.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`SUPPORT_CHAT_CATEGORIES`](../../../apps/referidos-app/src/profile/shared/data/supportChatCategories.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`SUPPORT_CHAT_CATEGORIES.filter`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L34), [`item.roles.includes`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L34).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L39) (accede al módulo), [`SupportChatHubBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L43) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L38) · callback de infraestructura · dentro de [`SupportChatHubBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L22)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportChatHubBlock`.

- **Actualizaciones de estado o acciones** `setCategory`.
- **Condiciones que evalúa** `ausencia de categories.length`, `ausencia de categories.some`.
- **Llamadas directas en el cuerpo** [`categories.some`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L40), [`setCategory`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L41).

#### [`context`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L45) · cálculo memorizado · dentro de [`SupportChatHubBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L22)

Función auxiliar de `SupportChatHubBlock` para `context`.

- **Retorno visible o tipo declarado** `route`, `role`, `negocio_id`, `promo_id`, `app_version`, `device`, `browser`, `runtime`, `build`.
- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de includeContext`.
- **Usa código de** [`runtimeConfig`](../../../apps/referidos-app/src/config/runtimeConfig.js#L81) (accede al módulo).
- **Llamadas directas en el cuerpo** [`resolvedOptions`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L48), [`Intl.DateTimeFormat`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L48).
- **Lo usa** [`handleCreate`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L103) (referencia).

#### [`handleCreate`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L92) · función · asíncrona · dentro de [`SupportChatHubBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L22)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Actualizaciones de estado o acciones** `setLoading`, `setCreated`, `setQueueCanceled`.
- **Efectos y APIs** `crypto.randomUUID`, `openModal`.
- **Condiciones que evalúa** `ausencia de canSubmit`, `ausencia de result.ok`.
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama), [`createSupportChatThread`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L4) (llama).
- **Llamadas directas en el cuerpo** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L94), [`setLoading`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L99), [`summary.trim`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L102), [`resolveSupportAppChannel`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L104), [`resolvedOptions`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L108), [`Intl.DateTimeFormat`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L108), [`crypto.randomUUID`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L112), [`createSupportChatThread`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L114), [`setCreated`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L117), [`setQueueCanceled`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L122), [`openModal`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L151).
- **Lo usa** [`SupportChatHubBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L220) (pasa a onClick).

#### [`onConfirmUnderstand`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L124) · función · dentro de [`handleCreate`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L92)

Maneja `Confirm Understand` y coordina las acciones indicadas abajo.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`onRequestCancel`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L125) · función · dentro de [`handleCreate`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L92)

Maneja `Request Cancel` y coordina las acciones indicadas abajo.

- **Efectos y APIs** `openModal`.
- **Llamadas directas en el cuerpo** [`openModal`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L126).

#### [`onContinueQueue`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L127) · función · dentro de [`onRequestCancel`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L125)

Maneja `Continue Queue` y coordina las acciones indicadas abajo.

- **Efectos y APIs** `openModal`.
- **Llamadas directas en el cuerpo** [`openModal`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L127).

#### [`onConfirmCancel`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L128) · función · asíncrona · dentro de [`onRequestCancel`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L125)

Maneja `Confirm Cancel` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setQueueCanceled`.
- **Condiciones que evalúa** `ausencia de threadPublicId`, `cancelResult.ok`.
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama), [`cancelSupportThread`](../../../packages/support-sdk/src/supportClient.js#L266) (llama).
- **Llamadas directas en el cuerpo** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L130), [`cancelSupportThread`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L133), [`setQueueCanceled`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L140).

#### [`handleOpenWhatsapp`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L154) · función · dentro de [`SupportChatHubBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L22)

Atiende `button.onClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `button.onClick`.
- **Condiciones que evalúa** `created.wa_link`.
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama).
- **Llamadas directas en el cuerpo** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L156), [`window.open`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L159).
- **Lo usa** [`SupportChatHubBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L255) (pasa a onClick).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L174) · callback JSX · dentro de [`SupportChatHubBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L22)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setCategory`.
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama).
- **Llamadas directas en el cuerpo** [`setCategory`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L175), [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L176).

#### [`input.onChange`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L202) · callback JSX · dentro de [`SupportChatHubBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L22)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setSummary`.
- **Llamadas directas en el cuerpo** [`setSummary`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L202).

#### [`input.onChange`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L212) · callback JSX · dentro de [`SupportChatHubBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L22)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `e`.
- **Actualizaciones de estado o acciones** `setIncludeContext`.
- **Llamadas directas en el cuerpo** [`setIncludeContext`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L212).

### [`apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L1)

Muestra las solicitudes del usuario y opciones permitidas por su estado.

**Superficie que exporta.** [`SupportChatTicketsBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L14).

**Módulos que lo cargan.** [`SupportChat.jsx`](../../../apps/referidos-app/src/profile/shared/sections/SupportChat.jsx#L4) (importa).

**Dependencias del archivo.** `react`, [`../services/supportChatClient`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js), [`../../../services/loggingClient`](../../../apps/referidos-app/src/services/loggingClient.js), [`../../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`@referidos/notifications-sdk`](../../../packages/notifications-sdk/src/index.js).

#### [`SupportChatTicketsBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L14) · componente React · exportación por defecto

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onBackToHub}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `[tickets, setTickets] mediante useState`, `[loading, setLoading] mediante useState`, `[retakeTarget, setRetakeTarget] mediante useState`, `[retakeLoading, setRetakeLoading] mediante useState`, `[retakeError, setRetakeError] mediante useState`.
- **Interfaz que monta** `button`.
- **Hooks que llama** `useAppStore`, `useState`, `useRoleNotifications`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`useRoleNotifications`](../../../packages/notifications-sdk/src/useRoleNotifications.js#L21) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (referencia).
- **Llamadas directas en el cuerpo** [`tickets.map`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L91), [`toLocaleString`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L104).
- **Lo usa** [`SupportChat`](../../../apps/referidos-app/src/profile/shared/sections/SupportChat.jsx#L33) (renderiza).

#### [`notificationsPolicy`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L22) · cálculo memorizado · dentro de [`SupportChatTicketsBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L14)

Función auxiliar de `SupportChatTicketsBlock` para `notifications Policy`.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`createNotificationPolicy`](../../../packages/notifications-sdk/src/policies.js#L45) (llama).
- **Llamadas directas en el cuerpo** [`createNotificationPolicy`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L23).
- **Lo usa** [`SupportChatTicketsBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L34) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L41) · callback de infraestructura · dentro de [`SupportChatTicketsBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L14)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportChatTicketsBlock`.

- **Llamadas directas en el cuerpo** [`loadTickets`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L52).

#### [`loadTickets`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L43) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L41)

Obtiene o resuelve `Tickets` para entregarlo al consumidor.

- **Actualizaciones de estado o acciones** `setLoading`, `setTickets`.
- **Condiciones que evalúa** `ausencia de active`, `result.ok`.
- **Usa código de** [`fetchSupportChatTickets`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L28) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L44), [`fetchSupportChatTickets`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L45), [`setTickets`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L48).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L52) (llama).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L64) · callback JSX · dentro de [`SupportChatTicketsBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L14)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama).
- **Llamadas directas en el cuerpo** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L65), [`onBackToHub`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L68).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L115) · callback JSX · dentro de [`SupportChatTicketsBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L14)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `replace`.
- **Condiciones que evalúa** `waLink`.
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama).
- **Llamadas directas en el cuerpo** [`replace`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L116), [`encodeURIComponent`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L122), [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L125), [`window.open`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L130).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L144) · callback JSX · dentro de [`SupportChatTicketsBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L14)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setRetakeError`, `setRetakeTarget`.
- **Llamadas directas en el cuerpo** [`setRetakeError`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L145), [`setRetakeTarget`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L146).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L180) · callback JSX · dentro de [`SupportChatTicketsBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L14)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setRetakeTarget`.
- **Llamadas directas en el cuerpo** [`setRetakeTarget`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L180).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L188) · callback JSX · asíncrona · dentro de [`SupportChatTicketsBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L14)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setRetakeLoading`, `setRetakeError`, `setTickets`, `setRetakeTarget`.
- **Condiciones que evalúa** `ausencia de result.ok o ausencia de result.data.ok`.
- **Usa código de** [`requestSupportChatRetake`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L48) (llama).
- **Llamadas directas en el cuerpo** [`setRetakeLoading`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L189), [`setRetakeError`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L190), [`requestSupportChatRetake`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L191), [`setTickets`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L199), [`prev.map`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L200), [`toISOString`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L205), [`setRetakeTarget`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L210).

### [`apps/referidos-app/src/profile/shared/blocks/SupportFeedbackForm.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/SupportFeedbackForm.jsx#L1)

Capta datos del comentario o problema y coordina la presentación del envío de feedback.

**Superficie que exporta.** [`SupportFeedbackForm`](../../../apps/referidos-app/src/profile/shared/blocks/SupportFeedbackForm.jsx#L3).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L90) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L86) (importa).

**Dependencias del archivo.** `react`.

#### [`SupportFeedbackForm`](../../../apps/referidos-app/src/profile/shared/blocks/SupportFeedbackForm.jsx#L3) · componente React · exportación por defecto

Monta `textarea`, `input`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{message, email, maxChars, onChangeMessage, onChangeEmail, onSubmit, submitLabel}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `textarea`, `input`, `button`.
- **Lo usa** [`FeedbackPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1303) (renderiza), [`FeedbackPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1286) (renderiza).

#### [`textarea.onChange`](../../../apps/referidos-app/src/profile/shared/blocks/SupportFeedbackForm.jsx#L17) · callback JSX · dentro de [`SupportFeedbackForm`](../../../apps/referidos-app/src/profile/shared/blocks/SupportFeedbackForm.jsx#L3)

Responde al evento de interfaz `textarea.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`onChangeMessage`](../../../apps/referidos-app/src/profile/shared/blocks/SupportFeedbackForm.jsx#L17), [`event.target.value.slice`](../../../apps/referidos-app/src/profile/shared/blocks/SupportFeedbackForm.jsx#L17).

#### [`input.onChange`](../../../apps/referidos-app/src/profile/shared/blocks/SupportFeedbackForm.jsx#L30) · callback JSX · dentro de [`SupportFeedbackForm`](../../../apps/referidos-app/src/profile/shared/blocks/SupportFeedbackForm.jsx#L3)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`onChangeEmail`](../../../apps/referidos-app/src/profile/shared/blocks/SupportFeedbackForm.jsx#L30).

### [`apps/referidos-app/src/profile/shared/blocks/SupportHelpOptions.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/SupportHelpOptions.jsx#L1)

Reúne las entradas de ayuda y canales de soporte disponibles desde el perfil.

**Superficie que exporta.** [`SupportHelpOptions`](../../../apps/referidos-app/src/profile/shared/blocks/SupportHelpOptions.jsx#L3).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L88) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L84) (importa).

**Dependencias del archivo.** `react`.

#### [`SupportHelpOptions`](../../../apps/referidos-app/src/profile/shared/blocks/SupportHelpOptions.jsx#L3) · componente React · exportación por defecto

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{options, onSelect}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`.
- **Llamadas directas en el cuerpo** [`options.map`](../../../apps/referidos-app/src/profile/shared/blocks/SupportHelpOptions.jsx#L6).
- **Lo usa** [`HelpPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1279) (renderiza), [`HelpPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1262) (renderiza).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/shared/blocks/SupportHelpOptions.jsx#L10) · callback JSX · dentro de [`SupportHelpOptions`](../../../apps/referidos-app/src/profile/shared/blocks/SupportHelpOptions.jsx#L3)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onSelect`](../../../apps/referidos-app/src/profile/shared/blocks/SupportHelpOptions.jsx#L10).

### [`apps/referidos-app/src/profile/shared/blocks/ThemeSelector.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/ThemeSelector.jsx#L1)

Presenta las opciones visuales de tema de la sección de apariencia.

**Superficie que exporta.** [`ThemeSelector`](../../../apps/referidos-app/src/profile/shared/blocks/ThemeSelector.jsx#L4).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L85) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L81) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`ThemeSelector`](../../../apps/referidos-app/src/profile/shared/blocks/ThemeSelector.jsx#L4) · componente React · exportación por defecto

Monta `Moon`, `button`, `Icon`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{value, onChange}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Moon`, `button`, `Icon`.
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-app/src/profile/shared/blocks/ThemeSelector.jsx#L20).
- **Lo usa** [`AppAppearancePanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1215) (renderiza), [`AppAppearancePanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1198) (renderiza).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/shared/blocks/ThemeSelector.jsx#L30) · callback JSX · dentro de [`ThemeSelector`](../../../apps/referidos-app/src/profile/shared/blocks/ThemeSelector.jsx#L4)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onChange`](../../../apps/referidos-app/src/profile/shared/blocks/ThemeSelector.jsx#L30).

### [`apps/referidos-app/src/profile/shared/blocks/TierCurrentCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/TierCurrentCard.jsx#L1)

Resume el nivel de beneficios que figura como actual para el usuario.

**Superficie que exporta.** [`TierCurrentCard`](../../../apps/referidos-app/src/profile/shared/blocks/TierCurrentCard.jsx#L4).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L82) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`TierCurrentCard`](../../../apps/referidos-app/src/profile/shared/blocks/TierCurrentCard.jsx#L4) · componente React · exportación por defecto

Monta `Sparkles`, `BadgeCheck`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, badgeLabel, pointsLabel, goalLabel, progress, perks}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Sparkles`, `BadgeCheck`.
- **Llamadas directas en el cuerpo** [`perks.map`](../../../apps/referidos-app/src/profile/shared/blocks/TierCurrentCard.jsx#L48).
- **Lo usa** [`BeneficiosPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1326) (renderiza).

### [`apps/referidos-app/src/profile/shared/blocks/TierNextCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/TierNextCard.jsx#L1)

Presenta el siguiente nivel y la información de avance disponible.

**Superficie que exporta.** [`TierNextCard`](../../../apps/referidos-app/src/profile/shared/blocks/TierNextCard.jsx#L4).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L83) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`TierNextCard`](../../../apps/referidos-app/src/profile/shared/blocks/TierNextCard.jsx#L4) · componente React · exportación por defecto

Monta `Sparkles`, `BadgeCheck`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{title, badgeLabel, perks}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Sparkles`, `BadgeCheck`.
- **Llamadas directas en el cuerpo** [`perks.map`](../../../apps/referidos-app/src/profile/shared/blocks/TierNextCard.jsx#L26).
- **Lo usa** [`BeneficiosPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1334) (renderiza).

### [`apps/referidos-app/src/profile/shared/blocks/TwoFACard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/TwoFACard.jsx#L1)

Muestra el estado del segundo factor y ofrece acceso a sus acciones de alta o baja.

**Superficie que exporta.** [`TwoFACard`](../../../apps/referidos-app/src/profile/shared/blocks/TwoFACard.jsx#L18).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L86) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L82) (importa).

**Dependencias del archivo.** `react`.

#### [`Toggle`](../../../apps/referidos-app/src/profile/shared/blocks/TwoFACard.jsx#L3) · componente React

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{active, onChange, disabled}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`.
- **Lo usa** [`TwoFACard`](../../../apps/referidos-app/src/profile/shared/blocks/TwoFACard.jsx#L39) (renderiza).

#### [`TwoFACard`](../../../apps/referidos-app/src/profile/shared/blocks/TwoFACard.jsx#L18) · componente React · exportación por defecto

Monta `Toggle`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{factors}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Toggle`.
- **Llamadas directas en el cuerpo** [`factors.map`](../../../apps/referidos-app/src/profile/shared/blocks/TwoFACard.jsx#L21).
- **Lo usa** [`TwoFAPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L340) (renderiza), [`TwoFAPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L323) (renderiza).

### [`apps/referidos-app/src/profile/shared/blocks/VerificationCard.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/VerificationCard.jsx#L1)

Presenta la indicación de verificación y la acción para completar el estado de cuenta.

**Superficie que exporta.** [`VerificationCard`](../../../apps/referidos-app/src/profile/shared/blocks/VerificationCard.jsx#L4).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L95) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L91) (importa).

**Dependencias del archivo.** `react`, `lucide-react`.

#### [`VerificationCard`](../../../apps/referidos-app/src/profile/shared/blocks/VerificationCard.jsx#L4) · componente React · exportación por defecto

Monta `button`, `ShieldCheck`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onVerify}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `ShieldCheck`.
- **Lo usa** [`OverviewPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1386) (renderiza), [`OverviewPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1447) (renderiza).

### [`apps/referidos-app/src/profile/shared/data/faqContent.js`](../../../apps/referidos-app/src/profile/shared/data/faqContent.js#L1)

Catálogo de contenido de ayuda consumido por el perfil.

**Superficie que exporta.** [`FAQ_SECTIONS`](../../../apps/referidos-app/src/profile/shared/data/faqContent.js#L1).

**Módulos que lo cargan.** [`FaqContent.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L3) (importa).

#### [`FAQ_SECTIONS`](../../../apps/referidos-app/src/profile/shared/data/faqContent.js#L1) · variable de módulo · exportado

Conserva la lista de `FAQ SECTIONS` usada por el módulo.

- **Lo usa** [`sections`](../../../apps/referidos-app/src/profile/shared/blocks/FaqContent.jsx#L72) (referencia).

### [`apps/referidos-app/src/profile/shared/data/supportChatCategories.js`](../../../apps/referidos-app/src/profile/shared/data/supportChatCategories.js#L1)

Define categorías y copy que el perfil utiliza para orientar el comienzo de un ticket.

**Superficie que exporta.** [`SUPPORT_CHAT_CATEGORIES`](../../../apps/referidos-app/src/profile/shared/data/supportChatCategories.js#L1).

**Módulos que lo cargan.** [`SupportChatHubBlock.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L6) (importa).

#### [`SUPPORT_CHAT_CATEGORIES`](../../../apps/referidos-app/src/profile/shared/data/supportChatCategories.js#L1) · variable de módulo · exportado

Conserva la lista de `SUPPORT CHAT CATEGORIES` usada por el módulo.

- **Lo usa** [`categories`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L34) (accede al módulo).

### [`apps/referidos-app/src/profile/shared/hooks/useMfaState.js`](../../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js#L1)

Mantiene estado de factores TOTP y refresca la vista de perfil después de alta o baja de un factor.

**Superficie que exporta.** [`useMfaState`](../../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js#L4).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L87) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L83) (importa).

**Dependencias del archivo.** `react`, [`../../../services/mfaService`](../../../apps/referidos-app/src/services/mfaService.js).

#### [`useMfaState`](../../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js#L4) · hook React · exportación por defecto

Agrupa estado, contexto o efectos de `Mfa State` para sus consumidores React.

- **Retorno visible o tipo declarado** `loading`, `error`, `totpEnabled`, `totpFactorId`, `totpStatus`, `totpFactors`, `refresh`.
- **Estado o valores vinculados** `[loading, setLoading] mediante useState`, `[error, setError] mediante useState`, `[totpFactors, setTotpFactors] mediante useState`, `[activeTotp, setActiveTotp] mediante useState`, `[totpStatus, setTotpStatus] mediante useState`.
- **Hooks que llama** `useState`, `useEffect`.
- **Llamadas directas en el cuerpo** [`includes`](../../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js#L38).
- **Lo usa** [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L166) (llama), [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L165) (llama).

#### [`refresh`](../../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js#L11) · callback React · asíncrona · dentro de [`useMfaState`](../../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js#L4)

Coordina cambios de estado durante `refresh`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setLoading`, `setError`, `setTotpFactors`, `setActiveTotp`, `setTotpStatus`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`listMfaFactors`](../../../apps/referidos-app/src/services/mfaService.js#L15) (llama), [`pickActiveTotpFactor`](../../../apps/referidos-app/src/services/mfaService.js#L151) (llama).
- **Llamadas directas en el cuerpo** [`setLoading`](../../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js#L12), [`setError`](../../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js#L13), [`listMfaFactors`](../../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js#L14), [`setTotpFactors`](../../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js#L17), [`setActiveTotp`](../../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js#L18), [`pickActiveTotpFactor`](../../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js#L23), [`toLowerCase`](../../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js#L24), [`setTotpStatus`](../../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js#L27).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js#L32) (llama), [`useMfaState`](../../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js#L33) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js#L31) · callback de infraestructura · dentro de [`useMfaState`](../../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js#L4)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useMfaState`.

- **Llamadas directas en el cuerpo** [`refresh`](../../../apps/referidos-app/src/profile/shared/hooks/useMfaState.js#L32).

### [`apps/referidos-app/src/profile/shared/ProfilePanel.jsx`](../../../apps/referidos-app/src/profile/shared/ProfilePanel.jsx#L1)

Compone el marco de contenidos del perfil y entrega la sección activa.

**Superficie que exporta.** [`ProfilePanel`](../../../apps/referidos-app/src/profile/shared/ProfilePanel.jsx#L4).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L44) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L42) (importa).

**Dependencias del archivo.** `react`, [`../../cliente/services/clienteUI`](../../../apps/referidos-app/src/cliente/services/clienteUI.js).

#### [`ProfilePanel`](../../../apps/referidos-app/src/profile/shared/ProfilePanel.jsx#L4) · componente React · exportación por defecto

Monta `Section`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{activeTab, sections, usuario, setUser}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Section`.
- **Usa código de** [`getVerificationStatus`](../../../apps/referidos-app/src/cliente/services/clienteUI.js#L134) (llama).
- **Llamadas directas en el cuerpo** [`getVerificationStatus`](../../../apps/referidos-app/src/profile/shared/ProfilePanel.jsx#L6).
- **Lo usa** [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1874) (renderiza), [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1940) (renderiza).

### [`apps/referidos-app/src/profile/shared/ProfileTabs.jsx`](../../../apps/referidos-app/src/profile/shared/ProfileTabs.jsx#L1)

Ubica las pestañas del perfil y notifica cuándo hay que montar otra sección.

**Superficie que exporta.** [`ProfileTabs`](../../../apps/referidos-app/src/profile/shared/ProfileTabs.jsx#L3).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L43) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L41) (importa).

**Dependencias del archivo.** `react`.

#### [`ProfileTabs`](../../../apps/referidos-app/src/profile/shared/ProfileTabs.jsx#L3) · componente React · exportación por defecto

Monta `button`, `Icon`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{groups, active, onChange}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `Icon`.
- **Llamadas directas en el cuerpo** [`groups.map`](../../../apps/referidos-app/src/profile/shared/ProfileTabs.jsx#L10), [`group.items.map`](../../../apps/referidos-app/src/profile/shared/ProfileTabs.jsx#L26).
- **Lo usa** [`ClientePerfil`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1856) (renderiza), [`NegocioPerfil`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1922) (renderiza).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/shared/ProfileTabs.jsx#L35) · callback JSX · dentro de [`ProfileTabs`](../../../apps/referidos-app/src/profile/shared/ProfileTabs.jsx#L3)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Condiciones que evalúa** `ausencia de isDisabled`.
- **Llamadas directas en el cuerpo** [`onChange`](../../../apps/referidos-app/src/profile/shared/ProfileTabs.jsx#L36).
