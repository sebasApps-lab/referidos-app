# PWA principal · Perfil · 4 de 4

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/profile/shared/sections/Access.jsx`](../../../apps/referidos-app/src/profile/shared/sections/Access.jsx#L1)
- [`apps/referidos-app/src/profile/shared/sections/AppAppearance.jsx`](../../../apps/referidos-app/src/profile/shared/sections/AppAppearance.jsx#L1)
- [`apps/referidos-app/src/profile/shared/sections/Beneficios.jsx`](../../../apps/referidos-app/src/profile/shared/sections/Beneficios.jsx#L1)
- [`apps/referidos-app/src/profile/shared/sections/Feedback.jsx`](../../../apps/referidos-app/src/profile/shared/sections/Feedback.jsx#L1)
- [`apps/referidos-app/src/profile/shared/sections/Help.jsx`](../../../apps/referidos-app/src/profile/shared/sections/Help.jsx#L1)
- [`apps/referidos-app/src/profile/shared/sections/Language.jsx`](../../../apps/referidos-app/src/profile/shared/sections/Language.jsx#L1)
- [`apps/referidos-app/src/profile/shared/sections/LinkedAccounts.jsx`](../../../apps/referidos-app/src/profile/shared/sections/LinkedAccounts.jsx#L1)
- [`apps/referidos-app/src/profile/shared/sections/ManageAccount.jsx`](../../../apps/referidos-app/src/profile/shared/sections/ManageAccount.jsx#L1)
- [`apps/referidos-app/src/profile/shared/sections/Notifications.jsx`](../../../apps/referidos-app/src/profile/shared/sections/Notifications.jsx#L1)
- [`apps/referidos-app/src/profile/shared/sections/PersonalData.jsx`](../../../apps/referidos-app/src/profile/shared/sections/PersonalData.jsx#L1)
- [`apps/referidos-app/src/profile/shared/sections/ProfileOverview.jsx`](../../../apps/referidos-app/src/profile/shared/sections/ProfileOverview.jsx#L1)
- [`apps/referidos-app/src/profile/shared/sections/Sessions.jsx`](../../../apps/referidos-app/src/profile/shared/sections/Sessions.jsx#L1)
- [`apps/referidos-app/src/profile/shared/sections/SupportChat.jsx`](../../../apps/referidos-app/src/profile/shared/sections/SupportChat.jsx#L1)
- [`apps/referidos-app/src/profile/shared/sections/SupportEmail.jsx`](../../../apps/referidos-app/src/profile/shared/sections/SupportEmail.jsx#L1)
- [`apps/referidos-app/src/profile/shared/sections/TwoFA.jsx`](../../../apps/referidos-app/src/profile/shared/sections/TwoFA.jsx#L1)
- [`apps/referidos-app/src/profile/shared/services/supportChatClient.js`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/profile/shared/sections/Access.jsx`](../../../apps/referidos-app/src/profile/shared/sections/Access.jsx#L1)

Reúne contraseña, PIN y biometría como métodos de acceso y envía cada acción a su handler.

**Superficie que exporta.** [`Access`](../../../apps/referidos-app/src/profile/shared/sections/Access.jsx#L3).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L54) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L52) (importa).

**Dependencias del archivo.** `react`.

#### [`Access`](../../../apps/referidos-app/src/profile/shared/sections/Access.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{title, subtitle, warningBlock, blocks, infoBlock, footer}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`React.Children.toArray`](../../../apps/referidos-app/src/profile/shared/sections/Access.jsx#L11).
- **Lo usa** [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L929) (renderiza), [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L912) (renderiza).

### [`apps/referidos-app/src/profile/shared/sections/AppAppearance.jsx`](../../../apps/referidos-app/src/profile/shared/sections/AppAppearance.jsx#L1)

Agrupa el selector de tema y otros controles visuales de apariencia del perfil.

**Superficie que exporta.** [`AppAppearance`](../../../apps/referidos-app/src/profile/shared/sections/AppAppearance.jsx#L3).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L63) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L59) (importa).

**Dependencias del archivo.** `react`.

#### [`AppAppearance`](../../../apps/referidos-app/src/profile/shared/sections/AppAppearance.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{title, subtitle, blocks, footer}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`React.Children.toArray`](../../../apps/referidos-app/src/profile/shared/sections/AppAppearance.jsx#L9).
- **Lo usa** [`AppAppearancePanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1213) (renderiza), [`AppAppearancePanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1196) (renderiza).

### [`apps/referidos-app/src/profile/shared/sections/Beneficios.jsx`](../../../apps/referidos-app/src/profile/shared/sections/Beneficios.jsx#L1)

Monta el contenido de beneficios actuales y próximos según las props del perfil.

**Superficie que exporta.** [`Beneficios`](../../../apps/referidos-app/src/profile/shared/sections/Beneficios.jsx#L3).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L59) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L57) (importa).

**Dependencias del archivo.** `react`.

#### [`Beneficios`](../../../apps/referidos-app/src/profile/shared/sections/Beneficios.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{title, subtitle, blocks, footer}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`React.Children.toArray`](../../../apps/referidos-app/src/profile/shared/sections/Beneficios.jsx#L9).
- **Lo usa** [`BeneficiosPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1322) (renderiza), [`BeneficiosPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1302) (renderiza).

### [`apps/referidos-app/src/profile/shared/sections/Feedback.jsx`](../../../apps/referidos-app/src/profile/shared/sections/Feedback.jsx#L1)

Expone el formulario de feedback dentro de las secciones del menú de perfil.

**Superficie que exporta.** [`Feedback`](../../../apps/referidos-app/src/profile/shared/sections/Feedback.jsx#L3).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L68) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L66) (importa).

**Dependencias del archivo.** `react`.

#### [`Feedback`](../../../apps/referidos-app/src/profile/shared/sections/Feedback.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{title, subtitle, blocks, footer}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`React.Children.toArray`](../../../apps/referidos-app/src/profile/shared/sections/Feedback.jsx#L9).
- **Lo usa** [`FeedbackPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1301) (renderiza), [`FeedbackPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1284) (renderiza).

### [`apps/referidos-app/src/profile/shared/sections/Help.jsx`](../../../apps/referidos-app/src/profile/shared/sections/Help.jsx#L1)

Organiza FAQ y opciones de ayuda como entrada a los canales de soporte.

**Superficie que exporta.** [`Help`](../../../apps/referidos-app/src/profile/shared/sections/Help.jsx#L3).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L65) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L61) (importa).

**Dependencias del archivo.** `react`.

#### [`Help`](../../../apps/referidos-app/src/profile/shared/sections/Help.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{title, subtitle, blocks, footer}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`React.Children.toArray`](../../../apps/referidos-app/src/profile/shared/sections/Help.jsx#L9).
- **Lo usa** [`HelpPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1259) (renderiza), [`HelpPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1242) (renderiza).

### [`apps/referidos-app/src/profile/shared/sections/Language.jsx`](../../../apps/referidos-app/src/profile/shared/sections/Language.jsx#L1)

Expone opciones de idioma del perfil mediante su bloque de selector.

**Superficie que exporta.** [`Language`](../../../apps/referidos-app/src/profile/shared/sections/Language.jsx#L3).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L64) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L60) (importa).

**Dependencias del archivo.** `react`.

#### [`Language`](../../../apps/referidos-app/src/profile/shared/sections/Language.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{title, subtitle, blocks, footer}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`React.Children.toArray`](../../../apps/referidos-app/src/profile/shared/sections/Language.jsx#L9).
- **Lo usa** [`LanguagePanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1226) (renderiza), [`LanguagePanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1209) (renderiza).

### [`apps/referidos-app/src/profile/shared/sections/LinkedAccounts.jsx`](../../../apps/referidos-app/src/profile/shared/sections/LinkedAccounts.jsx#L1)

Pinta las cuentas o proveedores enlazables dentro de la navegación de perfil.

**Superficie que exporta.** [`LinkedAccounts`](../../../apps/referidos-app/src/profile/shared/sections/LinkedAccounts.jsx#L3).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L55) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L53) (importa).

**Dependencias del archivo.** `react`.

#### [`LinkedAccounts`](../../../apps/referidos-app/src/profile/shared/sections/LinkedAccounts.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{title, subtitle, blocks, infoBlock, footer}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`React.Children.toArray`](../../../apps/referidos-app/src/profile/shared/sections/LinkedAccounts.jsx#L10).
- **Lo usa** [`LinkedAccountsPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1115) (renderiza), [`LinkedAccountsPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1098) (renderiza).

### [`apps/referidos-app/src/profile/shared/sections/ManageAccount.jsx`](../../../apps/referidos-app/src/profile/shared/sections/ManageAccount.jsx#L1)

Agrupa cambios y acciones sensibles de cuenta. Usa callbacks del perfil en lugar de ser el dueño de credenciales.

**Superficie que exporta.** [`ManageAccount`](../../../apps/referidos-app/src/profile/shared/sections/ManageAccount.jsx#L3).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L60) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L58) (importa).

**Dependencias del archivo.** `react`.

#### [`ManageAccount`](../../../apps/referidos-app/src/profile/shared/sections/ManageAccount.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{blocks, footer}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`React.Children.toArray`](../../../apps/referidos-app/src/profile/shared/sections/ManageAccount.jsx#L4).
- **Lo usa** [`ManageAccountPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1345) (renderiza), [`ManageAccountPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1323) (renderiza).

### [`apps/referidos-app/src/profile/shared/sections/Notifications.jsx`](../../../apps/referidos-app/src/profile/shared/sections/Notifications.jsx#L1)

Monta las preferencias de notificaciones dentro del perfil.

**Superficie que exporta.** [`Notifications`](../../../apps/referidos-app/src/profile/shared/sections/Notifications.jsx#L3).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L58) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L56) (importa).

**Dependencias del archivo.** `react`.

#### [`Notifications`](../../../apps/referidos-app/src/profile/shared/sections/Notifications.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{title, subtitle, blocks, footer}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`React.Children.toArray`](../../../apps/referidos-app/src/profile/shared/sections/Notifications.jsx#L9).
- **Lo usa** [`NotificationsPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1190) (renderiza), [`NotificationsPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1173) (renderiza).

### [`apps/referidos-app/src/profile/shared/sections/PersonalData.jsx`](../../../apps/referidos-app/src/profile/shared/sections/PersonalData.jsx#L1)

Monta el bloque de datos personales y su modo de edición dentro del perfil.

**Superficie que exporta.** [`PersonalData`](../../../apps/referidos-app/src/profile/shared/sections/PersonalData.jsx#L3).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L53) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L51) (importa).

**Dependencias del archivo.** `react`.

#### [`PersonalData`](../../../apps/referidos-app/src/profile/shared/sections/PersonalData.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{title, subtitle, blocks, footer}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`React.Children.toArray`](../../../apps/referidos-app/src/profile/shared/sections/PersonalData.jsx#L9).
- **Lo usa** [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1569) (renderiza), [`PersonalDataPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1625) (renderiza).

### [`apps/referidos-app/src/profile/shared/sections/ProfileOverview.jsx`](../../../apps/referidos-app/src/profile/shared/sections/ProfileOverview.jsx#L1)

Define la vista inicial de perfil con identidad, estado y accesos a otras secciones.

**Superficie que exporta.** [`ProfileOverview`](../../../apps/referidos-app/src/profile/shared/sections/ProfileOverview.jsx#L3).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L52) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L50) (importa).

**Dependencias del archivo.** `react`.

#### [`ProfileOverview`](../../../apps/referidos-app/src/profile/shared/sections/ProfileOverview.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{headerBadge, verificationBlock, identityBlock, primaryBlock, secondaryBlock, extraBlocks}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`React.Children.toArray`](../../../apps/referidos-app/src/profile/shared/sections/ProfileOverview.jsx#L11), [`filter`](../../../apps/referidos-app/src/profile/shared/sections/ProfileOverview.jsx#L12).
- **Lo usa** [`OverviewPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1383) (renderiza), [`OverviewPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1443) (renderiza).

### [`apps/referidos-app/src/profile/shared/sections/Sessions.jsx`](../../../apps/referidos-app/src/profile/shared/sections/Sessions.jsx#L1)

Entrega la lista de dispositivos y acciones de revocación al bloque correspondiente.

**Superficie que exporta.** [`Sessions`](../../../apps/referidos-app/src/profile/shared/sections/Sessions.jsx#L3).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L57) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L55) (importa).

**Dependencias del archivo.** `react`.

#### [`Sessions`](../../../apps/referidos-app/src/profile/shared/sections/Sessions.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{title, subtitle, subtitleAction, blocks, footer}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`React.Children.toArray`](../../../apps/referidos-app/src/profile/shared/sections/Sessions.jsx#L10).
- **Lo usa** [`SessionsPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L223) (renderiza), [`SessionsPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L222) (renderiza).

### [`apps/referidos-app/src/profile/shared/sections/SupportChat.jsx`](../../../apps/referidos-app/src/profile/shared/sections/SupportChat.jsx#L1)

Coordina el contenido de chat y lista de solicitudes en la sección de perfil.

**Superficie que exporta.** [`SupportChat`](../../../apps/referidos-app/src/profile/shared/sections/SupportChat.jsx#L6).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L66) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L64) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../blocks/SupportChatHubBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx), [`../blocks/SupportChatTicketsBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx).

#### [`SupportChat`](../../../apps/referidos-app/src/profile/shared/sections/SupportChat.jsx#L6) · componente React · exportación por defecto

Monta `button`, `ChevronLeft`, `SupportChatTicketsBlock`, `SupportChatHubBlock`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{role, onBack}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[view, setView] mediante useState`.
- **Interfaz que monta** `button`, `ChevronLeft`, `SupportChatTicketsBlock`, `SupportChatHubBlock`.
- **Hooks que llama** `useState`.
- **Usa código de** [`SupportChatTicketsBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L14) (renderiza), [`SupportChatHubBlock`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L22) (renderiza).
- **Lo usa** [`HelpPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1268) (renderiza), [`HelpPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1251) (renderiza).

#### [`SupportChatTicketsBlock.onBackToHub`](../../../apps/referidos-app/src/profile/shared/sections/SupportChat.jsx#L33) · callback JSX · dentro de [`SupportChat`](../../../apps/referidos-app/src/profile/shared/sections/SupportChat.jsx#L6)

Responde al evento de interfaz `SupportChatTicketsBlock.onBackToHub`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setView`.
- **Llamadas directas en el cuerpo** [`setView`](../../../apps/referidos-app/src/profile/shared/sections/SupportChat.jsx#L33).

#### [`SupportChatHubBlock.onShowTickets`](../../../apps/referidos-app/src/profile/shared/sections/SupportChat.jsx#L37) · callback JSX · dentro de [`SupportChat`](../../../apps/referidos-app/src/profile/shared/sections/SupportChat.jsx#L6)

Responde al evento de interfaz `SupportChatHubBlock.onShowTickets`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setView`.
- **Llamadas directas en el cuerpo** [`setView`](../../../apps/referidos-app/src/profile/shared/sections/SupportChat.jsx#L37).

### [`apps/referidos-app/src/profile/shared/sections/SupportEmail.jsx`](../../../apps/referidos-app/src/profile/shared/sections/SupportEmail.jsx#L1)

Presenta el canal de soporte por correo en el árbol del perfil.

**Superficie que exporta.** [`SupportEmail`](../../../apps/referidos-app/src/profile/shared/sections/SupportEmail.jsx#L7).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L67) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L65) (importa).

**Dependencias del archivo.** `react`, `lucide-react`, [`../../../services/loggingClient`](../../../apps/referidos-app/src/services/loggingClient.js).

#### [`SUPPORT_EMAIL`](../../../apps/referidos-app/src/profile/shared/sections/SupportEmail.jsx#L5) · variable de módulo

Declara `SUPPORT_EMAIL` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`SupportEmail`](../../../apps/referidos-app/src/profile/shared/sections/SupportEmail.jsx#L36) (referencia), [`button.onClick`](../../../apps/referidos-app/src/profile/shared/sections/SupportEmail.jsx#L43) (referencia).

#### [`SupportEmail`](../../../apps/referidos-app/src/profile/shared/sections/SupportEmail.jsx#L7) · componente React · exportación por defecto

Monta `button`, `ChevronLeft`, `Mail`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onBack}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `ChevronLeft`, `Mail`.
- **Lo usa** [`HelpPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L1274) (renderiza), [`HelpPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L1257) (renderiza).

#### [`button.onClick`](../../../apps/referidos-app/src/profile/shared/sections/SupportEmail.jsx#L40) · callback JSX · dentro de [`SupportEmail`](../../../apps/referidos-app/src/profile/shared/sections/SupportEmail.jsx#L7)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `window.location.href`.
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama).
- **Llamadas directas en el cuerpo** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/profile/shared/sections/SupportEmail.jsx#L41).

### [`apps/referidos-app/src/profile/shared/sections/TwoFA.jsx`](../../../apps/referidos-app/src/profile/shared/sections/TwoFA.jsx#L1)

Monta gestión del segundo factor dentro de la navegación de perfil.

**Superficie que exporta.** [`TwoFA`](../../../apps/referidos-app/src/profile/shared/sections/TwoFA.jsx#L3).

**Módulos que lo cargan.** [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L56) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L54) (importa).

**Dependencias del archivo.** `react`.

#### [`TwoFA`](../../../apps/referidos-app/src/profile/shared/sections/TwoFA.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{title, subtitle, blocks, notice, footer}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`React.Children.toArray`](../../../apps/referidos-app/src/profile/shared/sections/TwoFA.jsx#L10).
- **Lo usa** [`TwoFAPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L336) (renderiza), [`TwoFAPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L319) (renderiza).

### [`apps/referidos-app/src/profile/shared/services/supportChatClient.js`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L1)

Abre y retoma hilos mediante Edge Functions y consulta support_threads_public para el estado de los tickets del usuario.

**Superficie que exporta.** [`createSupportChatThread`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L4), [`fetchSupportChatTickets`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L28), [`requestSupportChatRetake`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L48).

**Módulos que lo cargan.** [`SupportChatHubBlock.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L7) (importa), [`SupportChatTicketsBlock.jsx`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L2) (importa).

**Dependencias del archivo.** [`../../../lib/supabaseClient`](../../../apps/referidos-app/src/lib/supabaseClient.js), [`../../../services/loggingClient`](../../../apps/referidos-app/src/services/loggingClient.js).

#### [`createSupportChatThread`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L4) · función · asíncrona · exportado

Consulta o invoca Edge [`support-create-thread`](../../../apps/referidos-app/supabase/functions/support-create-thread/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Edge [`support-create-thread`](../../../apps/referidos-app/supabase/functions/support-create-thread/index.ts) en [`supportChatClient.js:9`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L9).
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L5), [`supabase.functions.invoke`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L9).
- **Lo usa** [`handleCreate`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatHubBlock.jsx#L114) (llama).

#### [`fetchSupportChatTickets`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L28) · función · asíncrona · exportado

Consulta o invoca tabla o vista [`support_threads_public`](../../../apps/referidos-app/supabase/migrations/20260327_000046_support_handoff_abandonment.sql#L97) y coordina las demás operaciones de esta ficha.

- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** tabla o vista [`support_threads_public`](../../../apps/referidos-app/supabase/migrations/20260327_000046_support_handoff_abandonment.sql#L97) (`select`) en [`supportChatClient.js:30`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L30), tabla o bucket [`support_threads_public`](../../../apps/referidos-app/supabase/migrations/20260327_000046_support_handoff_abandonment.sql#L97) en [`supportChatClient.js:30`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L30).
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L29), [`order`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L30), [`select`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L30), [`supabase.from`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L30).
- **Lo usa** [`loadTickets`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L45) (llama).

#### [`requestSupportChatRetake`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L48) · función · asíncrona · exportado

Consulta o invoca Edge [`support-retake-thread`](../../../apps/referidos-app/supabase/functions/support-retake-thread/index.ts). El resultado se adapta al contrato del consumidor.

- **Entradas** `payload = valor por defecto`.
- **Retorno visible o tipo declarado** `ok`, `error`, `data`.
- **Condiciones que evalúa** `error`.
- **Contrato de datos** Edge [`support-retake-thread`](../../../apps/referidos-app/supabase/functions/support-retake-thread/index.ts) en [`supportChatClient.js:52`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L52).
- **Usa código de** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L171) (llama), [`supabase`](../../../apps/referidos-app/src/lib/supabaseClient.js#L31) (accede al módulo).
- **Llamadas directas en el cuerpo** [`logCatalogBreadcrumb`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L49), [`supabase.functions.invoke`](../../../apps/referidos-app/src/profile/shared/services/supportChatClient.js#L52).
- **Lo usa** [`button.onClick`](../../../apps/referidos-app/src/profile/shared/blocks/SupportChatTicketsBlock.jsx#L191) (llama).
