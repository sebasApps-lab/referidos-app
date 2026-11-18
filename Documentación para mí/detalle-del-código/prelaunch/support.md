# Prelaunch · Soporte y feedback

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/prelaunch/src/support/desktop/components/DesktopFeedbackMessageBlock.jsx`](../../../apps/prelaunch/src/support/desktop/components/DesktopFeedbackMessageBlock.jsx#L1)
- [`apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L1)
- [`apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketHeader.jsx`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketHeader.jsx#L1)
- [`apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketHero.jsx`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketHero.jsx#L1)
- [`apps/prelaunch/src/support/desktop/DesktopSupportOpenTicketPage.jsx`](../../../apps/prelaunch/src/support/desktop/DesktopSupportOpenTicketPage.jsx#L1)
- [`apps/prelaunch/src/support/desktop/FeedbackDesktopPage.jsx`](../../../apps/prelaunch/src/support/desktop/FeedbackDesktopPage.jsx#L1)
- [`apps/prelaunch/src/support/FeedbackPage.jsx`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L1)
- [`apps/prelaunch/src/support/FeedbackRoute.jsx`](../../../apps/prelaunch/src/support/FeedbackRoute.jsx#L1)
- [`apps/prelaunch/src/support/mobile/components/MobileFeedbackMessageBlock.jsx`](../../../apps/prelaunch/src/support/mobile/components/MobileFeedbackMessageBlock.jsx#L1)
- [`apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L1)
- [`apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketHeader.jsx`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketHeader.jsx#L1)
- [`apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketHero.jsx`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketHero.jsx#L1)
- [`apps/prelaunch/src/support/mobile/FeedbackMobilePage.jsx`](../../../apps/prelaunch/src/support/mobile/FeedbackMobilePage.jsx#L1)
- [`apps/prelaunch/src/support/mobile/MobileSupportOpenTicketPage.jsx`](../../../apps/prelaunch/src/support/mobile/MobileSupportOpenTicketPage.jsx#L1)
- [`apps/prelaunch/src/support/supportApi.js`](../../../apps/prelaunch/src/support/supportApi.js#L1)
- [`apps/prelaunch/src/support/SupportChatPage.jsx`](../../../apps/prelaunch/src/support/SupportChatPage.jsx#L1)
- [`apps/prelaunch/src/support/SupportEmailPage.jsx`](../../../apps/prelaunch/src/support/SupportEmailPage.jsx#L1)
- [`apps/prelaunch/src/support/SupportOpenTicketPage.jsx`](../../../apps/prelaunch/src/support/SupportOpenTicketPage.jsx#L1)
- [`apps/prelaunch/src/support/supportOpenTicketShared.js`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L1)
- [`apps/prelaunch/src/support/SupportRequestPage.jsx`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L1)
- [`apps/prelaunch/src/support/useFeedbackPageController.js`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L1)
- [`apps/prelaunch/src/support/useSupportOpenTicketController.js`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L1)

## Símbolos y conexiones

### [`apps/prelaunch/src/support/desktop/components/DesktopFeedbackMessageBlock.jsx`](../../../apps/prelaunch/src/support/desktop/components/DesktopFeedbackMessageBlock.jsx#L1)

Presenta el contenido y el campo de mensaje del formulario desktop de feedback.

**Superficie que exporta.** [`DesktopFeedbackMessageBlock`](../../../apps/prelaunch/src/support/desktop/components/DesktopFeedbackMessageBlock.jsx#L1).

**Módulos que lo cargan.** [`FeedbackDesktopPage.jsx`](../../../apps/prelaunch/src/support/desktop/FeedbackDesktopPage.jsx#L3) (importa).

#### [`DesktopFeedbackMessageBlock`](../../../apps/prelaunch/src/support/desktop/components/DesktopFeedbackMessageBlock.jsx#L1) · componente React · exportación por defecto

Monta `form`, `input`, `textarea`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{controller}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `form`, `input`, `textarea`, `button`.
- **Lo usa** [`FeedbackDesktopPage`](../../../apps/prelaunch/src/support/desktop/FeedbackDesktopPage.jsx#L18) (renderiza).

#### [`input.onChange`](../../../apps/prelaunch/src/support/desktop/components/DesktopFeedbackMessageBlock.jsx#L23) · callback JSX · dentro de [`DesktopFeedbackMessageBlock`](../../../apps/prelaunch/src/support/desktop/components/DesktopFeedbackMessageBlock.jsx#L1)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setHoneypot`.
- **Llamadas directas en el cuerpo** [`controller.setHoneypot`](../../../apps/prelaunch/src/support/desktop/components/DesktopFeedbackMessageBlock.jsx#L23).

#### [`input.onChange`](../../../apps/prelaunch/src/support/desktop/components/DesktopFeedbackMessageBlock.jsx#L32) · callback JSX · dentro de [`DesktopFeedbackMessageBlock`](../../../apps/prelaunch/src/support/desktop/components/DesktopFeedbackMessageBlock.jsx#L1)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setName`.
- **Llamadas directas en el cuerpo** [`controller.setName`](../../../apps/prelaunch/src/support/desktop/components/DesktopFeedbackMessageBlock.jsx#L32).

#### [`input.onChange`](../../../apps/prelaunch/src/support/desktop/components/DesktopFeedbackMessageBlock.jsx#L42) · callback JSX · dentro de [`DesktopFeedbackMessageBlock`](../../../apps/prelaunch/src/support/desktop/components/DesktopFeedbackMessageBlock.jsx#L1)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setEmail`.
- **Llamadas directas en el cuerpo** [`controller.setEmail`](../../../apps/prelaunch/src/support/desktop/components/DesktopFeedbackMessageBlock.jsx#L42).

#### [`textarea.onChange`](../../../apps/prelaunch/src/support/desktop/components/DesktopFeedbackMessageBlock.jsx#L51) · callback JSX · dentro de [`DesktopFeedbackMessageBlock`](../../../apps/prelaunch/src/support/desktop/components/DesktopFeedbackMessageBlock.jsx#L1)

Responde al evento de interfaz `textarea.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setMessage`.
- **Condiciones que evalúa** `event.target.value.length`.
- **Llamadas directas en el cuerpo** [`controller.setMessage`](../../../apps/prelaunch/src/support/desktop/components/DesktopFeedbackMessageBlock.jsx#L53).

### [`apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L1)

Renderiza campos, canal, categoría y mensajes de validación en escritorio con callbacks del controlador.

**Superficie que exporta.** [`DesktopSupportOpenTicketForm`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L6).

**Módulos que lo cargan.** [`DesktopSupportOpenTicketPage.jsx`](../../../apps/prelaunch/src/support/desktop/DesktopSupportOpenTicketPage.jsx#L3) (importa).

**Dependencias del archivo.** [`../../supportOpenTicketShared`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js).

#### [`DesktopSupportOpenTicketForm`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L6) · componente React · exportación por defecto

Monta `form`, `input`, `img`, `select`, `button`, `MailMethodIcon`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{controller}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `form`, `input`, `img`, `select`, `button`, `MailMethodIcon`, `textarea`.
- **Usa código de** [`ECUADOR_FLAG_SVG_URL`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L4) (pasa a src), [`SUPPORT_FORM_WHATSAPP_ICON_URL`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L6) (pasa a src).
- **Llamadas directas en el cuerpo** [`controller.categoryOptions.map`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L68).
- **Lo usa** [`DesktopSupportOpenTicketPage`](../../../apps/prelaunch/src/support/desktop/DesktopSupportOpenTicketPage.jsx#L19) (renderiza).

#### [`input.onChange`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L16) · callback JSX · dentro de [`DesktopSupportOpenTicketForm`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L6)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setName`.
- **Llamadas directas en el cuerpo** [`controller.setName`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L16).

#### [`input.onChange`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L29) · callback JSX · dentro de [`DesktopSupportOpenTicketForm`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L6)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setEmail`.
- **Llamadas directas en el cuerpo** [`controller.setEmail`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L29).

#### [`input.onChange`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L53) · callback JSX · dentro de [`DesktopSupportOpenTicketForm`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L6)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setPhone`.
- **Llamadas directas en el cuerpo** [`controller.setPhone`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L53).

#### [`select.onChange`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L65) · callback JSX · dentro de [`DesktopSupportOpenTicketForm`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L6)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setCategory`.
- **Llamadas directas en el cuerpo** [`controller.setCategory`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L65).

#### [`button.onClick`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L91) · callback JSX · dentro de [`DesktopSupportOpenTicketForm`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L6)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setPreferredChannel`.
- **Llamadas directas en el cuerpo** [`controller.setPreferredChannel`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L91).

#### [`button.onClick`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L104) · callback JSX · dentro de [`DesktopSupportOpenTicketForm`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L6)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setPreferredChannel`.
- **Llamadas directas en el cuerpo** [`controller.setPreferredChannel`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L104).

#### [`textarea.onChange`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L120) · callback JSX · dentro de [`DesktopSupportOpenTicketForm`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L6)

Responde al evento de interfaz `textarea.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setDescription`.
- **Llamadas directas en el cuerpo** [`controller.setDescription`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L120).

#### [`MailMethodIcon`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L152) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`DesktopSupportOpenTicketForm`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L94) (renderiza).

### [`apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketHeader.jsx`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketHeader.jsx#L1)

Cabecera de soporte desktop con enlaces o acciones de salida.

**Superficie que exporta.** [`DesktopSupportOpenTicketHeader`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketHeader.jsx#L3).

**Módulos que lo cargan.** [`DesktopSupportOpenTicketPage.jsx`](../../../apps/prelaunch/src/support/desktop/DesktopSupportOpenTicketPage.jsx#L4) (importa), [`FeedbackDesktopPage.jsx`](../../../apps/prelaunch/src/support/desktop/FeedbackDesktopPage.jsx#L2) (importa).

**Dependencias del archivo.** [`../../../legal/helpCenterShared`](../../../apps/prelaunch/src/legal/helpCenterShared.jsx).

#### [`DesktopSupportOpenTicketHeader`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketHeader.jsx#L3) · componente React · exportación por defecto

Monta `HelpCenterHeader`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{backTo, headerActions, brandVariant}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `HelpCenterHeader`.
- **Usa código de** [`HelpCenterHeader`](../../../apps/prelaunch/src/legal/helpCenterShared.jsx#L147) (renderiza).
- **Lo usa** [`DesktopSupportOpenTicketPage`](../../../apps/prelaunch/src/support/desktop/DesktopSupportOpenTicketPage.jsx#L12) (renderiza), [`FeedbackDesktopPage`](../../../apps/prelaunch/src/support/desktop/FeedbackDesktopPage.jsx#L11) (renderiza).

### [`apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketHero.jsx`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketHero.jsx#L1)

Introducción desktop al formulario para orientar al visitante antes de enviar.

**Superficie que exporta.** [`DesktopSupportOpenTicketHero`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketHero.jsx#L3).

**Módulos que lo cargan.** [`DesktopSupportOpenTicketPage.jsx`](../../../apps/prelaunch/src/support/desktop/DesktopSupportOpenTicketPage.jsx#L5) (importa).

**Dependencias del archivo.** `react-router-dom`.

#### [`DesktopSupportOpenTicketHero`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketHero.jsx#L3) · componente React · exportación por defecto

Monta `Link`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Link`.
- **Lo usa** [`DesktopSupportOpenTicketPage`](../../../apps/prelaunch/src/support/desktop/DesktopSupportOpenTicketPage.jsx#L18) (renderiza).

### [`apps/prelaunch/src/support/desktop/DesktopSupportOpenTicketPage.jsx`](../../../apps/prelaunch/src/support/desktop/DesktopSupportOpenTicketPage.jsx#L1)

Compone hero, navegación y formulario desktop. Pasa el estado y los handlers del controlador a sus piezas.

**Superficie que exporta.** [`DesktopSupportOpenTicketPage`](../../../apps/prelaunch/src/support/desktop/DesktopSupportOpenTicketPage.jsx#L7).

**Módulos que lo cargan.** [`SupportOpenTicketPage.jsx`](../../../apps/prelaunch/src/support/SupportOpenTicketPage.jsx#L7) (carga diferida).

**Dependencias del archivo.** [`../../legal/helpCenterShared`](../../../apps/prelaunch/src/legal/helpCenterShared.jsx), [`../useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js), [`./components/DesktopSupportOpenTicketForm`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx), [`./components/DesktopSupportOpenTicketHeader`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketHeader.jsx), [`./components/DesktopSupportOpenTicketHero`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketHero.jsx).

#### [`DesktopSupportOpenTicketPage`](../../../apps/prelaunch/src/support/desktop/DesktopSupportOpenTicketPage.jsx#L7) · componente React · exportación por defecto

Monta `DesktopSupportOpenTicketHeader`, `DesktopSupportOpenTicketHero`, `DesktopSupportOpenTicketForm`, `HelpCenterFooter`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `DesktopSupportOpenTicketHeader`, `DesktopSupportOpenTicketHero`, `DesktopSupportOpenTicketForm`, `HelpCenterFooter`.
- **Hooks que llama** `useSupportOpenTicketController`.
- **Usa código de** [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L20) (llama), [`DesktopSupportOpenTicketHeader`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketHeader.jsx#L3) (renderiza), [`DesktopSupportOpenTicketHero`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketHero.jsx#L3) (renderiza), [`DesktopSupportOpenTicketForm`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L6) (renderiza), [`HelpCenterFooter`](../../../apps/prelaunch/src/legal/helpCenterShared.jsx#L205) (renderiza).
- **Lo usa** [`SupportOpenTicketPage`](../../../apps/prelaunch/src/support/SupportOpenTicketPage.jsx#L7) (carga diferida).

### [`apps/prelaunch/src/support/desktop/FeedbackDesktopPage.jsx`](../../../apps/prelaunch/src/support/desktop/FeedbackDesktopPage.jsx#L1)

Compone cabecera y formulario de feedback en formato escritorio. Recibe validaciones y estados del controlador.

**Superficie que exporta.** [`FeedbackDesktopPage`](../../../apps/prelaunch/src/support/desktop/FeedbackDesktopPage.jsx#L6).

**Módulos que lo cargan.** [`FeedbackRoute.jsx`](../../../apps/prelaunch/src/support/FeedbackRoute.jsx#L8) (carga diferida).

**Dependencias del archivo.** [`../../legal/helpCenterShared`](../../../apps/prelaunch/src/legal/helpCenterShared.jsx), [`./components/DesktopSupportOpenTicketHeader`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketHeader.jsx), [`./components/DesktopFeedbackMessageBlock`](../../../apps/prelaunch/src/support/desktop/components/DesktopFeedbackMessageBlock.jsx), [`../useFeedbackPageController`](../../../apps/prelaunch/src/support/useFeedbackPageController.js).

#### [`FeedbackDesktopPage`](../../../apps/prelaunch/src/support/desktop/FeedbackDesktopPage.jsx#L6) · componente React · exportación por defecto

Monta `DesktopSupportOpenTicketHeader`, `DesktopFeedbackMessageBlock`, `HelpCenterFooter`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `DesktopSupportOpenTicketHeader`, `DesktopFeedbackMessageBlock`, `HelpCenterFooter`.
- **Hooks que llama** `useFeedbackPageController`.
- **Usa código de** [`useFeedbackPageController`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L63) (llama), [`DesktopSupportOpenTicketHeader`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketHeader.jsx#L3) (renderiza), [`DesktopFeedbackMessageBlock`](../../../apps/prelaunch/src/support/desktop/components/DesktopFeedbackMessageBlock.jsx#L1) (renderiza), [`HelpCenterFooter`](../../../apps/prelaunch/src/legal/helpCenterShared.jsx#L205) (renderiza).
- **Lo usa** [`FeedbackRoute`](../../../apps/prelaunch/src/support/FeedbackRoute.jsx#L8) (carga diferida).

### [`apps/prelaunch/src/support/FeedbackPage.jsx`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L1)

Mantiene una entrada de feedback en el árbol de pantallas. Confirma si se usa desde el router o un wrapper antes de editarla.

**Superficie que exporta.** [`FeedbackPage`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L31).

**Dependencias del archivo.** `react`, `react-router-dom`, [`../services/prelaunchSystem`](../../../apps/prelaunch/src/services/prelaunchSystem.js).

#### [`ECUADOR_PREFIX`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L5) · variable de módulo

Declara `ECUADOR_PREFIX` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeWhatsappLocal`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L18) (referencia), [`normalizedWhatsapp`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L49) (referencia).

#### [`ECUADOR_FLAG_SVG_URL`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L6) · variable de módulo

Declara `ECUADOR_FLAG_SVG_URL` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`FeedbackPage`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L192) (pasa a src).

#### [`DESCRIPTION_MIN`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L7) · variable de módulo

Declara `DESCRIPTION_MIN` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`FeedbackPage`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L60) (referencia), [`handleSubmit`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L73) (referencia).

#### [`DESCRIPTION_MAX`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L8) · variable de módulo

Declara `DESCRIPTION_MAX` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`FeedbackPage`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L60) (referencia), [`handleSubmit`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L73) (referencia).

#### [`FEEDBACK_TYPES`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L9) · variable de módulo

Conserva la lista de `FEEDBACK TYPES` usada por el módulo.

- **Lo usa** [`selectedType`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L54) (accede al módulo), [`FeedbackPage`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L221) (accede al módulo).

#### [`normalizeWhatsappLocal`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L16) · función

Normaliza `Whatsapp Local` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `null`.
- **Efectos y APIs** `replace`.
- **Condiciones que evalúa** `digits.startsWith`, `digits.length`.
- **Llamadas directas en el cuerpo** [`replace`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L17), [`digits.startsWith`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L18), [`digits.slice`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L19).
- **Lo usa** [`normalizedWhatsappLocal`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L45) (llama).

#### [`normalizeEmail`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L25) · función

Normaliza el valor de correo antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de test`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L26), [`trim`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L26), [`test`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L27).
- **Lo usa** [`normalizedEmail`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L43) (llama).

#### [`FeedbackPage`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L31) · componente React · exportación por defecto

Monta `Link`, `form`, `input`, `img`, `select`, `textarea`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[name, setName] mediante useState`, `[contactMethod, setContactMethod] mediante useState`, `[email, setEmail] mediante useState`, `[whatsapp, setWhatsapp] mediante useState`, `[feedbackType, setFeedbackType] mediante useState`, `[description, setDescription] mediante useState`, `[submitting, setSubmitting] mediante useState`, `[error, setError] mediante useState`, `[ok, setOk] mediante useState`.
- **Interfaz que monta** `Link`, `form`, `input`, `img`, `select`, `textarea`, `button`.
- **Hooks que llama** `useLocation`, `useState`.
- **Llamadas directas en el cuerpo** [`FEEDBACK_TYPES.map`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L221).

#### [`normalizedEmail`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L43) · cálculo memorizado · dentro de [`FeedbackPage`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L31)

Normaliza `d Email` antes de validarlo, mostrarlo o enviarlo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`normalizeEmail`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L43).
- **Lo usa** [`FeedbackPage`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L58) (referencia), [`handleSubmit`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L88) (referencia).

#### [`normalizedWhatsappLocal`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L45) · cálculo memorizado · dentro de [`FeedbackPage`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L31)

Normaliza `d Whatsapp Local` antes de validarlo, mostrarlo o enviarlo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`normalizeWhatsappLocal`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L45).
- **Lo usa** [`normalizedWhatsapp`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L49) (referencia).

#### [`normalizedWhatsapp`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L49) · cálculo memorizado · dentro de [`FeedbackPage`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L31)

Normaliza `d Whatsapp` antes de validarlo, mostrarlo o enviarlo.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`FeedbackPage`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L58) (referencia), [`handleSubmit`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L89) (referencia).

#### [`normalizedDescription`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L52) · cálculo memorizado · dentro de [`FeedbackPage`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L31)

Normaliza `d Description` antes de validarlo, mostrarlo o enviarlo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`description.trim`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L52).
- **Lo usa** [`FeedbackPage`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L59) (accede al módulo).

#### [`selectedType`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L54) · cálculo memorizado · dentro de [`FeedbackPage`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L31)

Procesa `ed Type` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`FEEDBACK_TYPES.find`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L54).
- **Lo usa** [`handleSubmit`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L85) (accede al módulo).

#### [`handleSubmit`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L63) · función · asíncrona · dentro de [`FeedbackPage`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L31)

Atiende `form.onSubmit` y aplica la acción vinculada a ese control.

- **Entradas** `event`.
- **Recibe eventos de** `form.onSubmit`.
- **Actualizaciones de estado o acciones** `setError`, `setSubmitting`, `setOk`, `setDescription`.
- **Condiciones que evalúa** `ausencia de canSubmit`, `ausencia de normalizedContact`, `ausencia de descriptionValid`.
- **Usa código de** [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L56) (llama).
- **Llamadas directas en el cuerpo** [`event.preventDefault`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L64), [`setError`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L67), [`setSubmitting`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L78), [`setOk`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L80), [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L82), [`name.trim`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L90), [`setDescription`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L94).
- **Lo usa** [`FeedbackPage`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L131) (pasa a onSubmit).

#### [`input.onChange`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L137) · callback JSX · dentro de [`FeedbackPage`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L31)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setName`.
- **Llamadas directas en el cuerpo** [`setName`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L137).

#### [`input.onChange`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L155) · callback JSX · dentro de [`FeedbackPage`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L31)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setContactMethod`.
- **Llamadas directas en el cuerpo** [`setContactMethod`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L155).

#### [`input.onChange`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L166) · callback JSX · dentro de [`FeedbackPage`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L31)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setContactMethod`.
- **Llamadas directas en el cuerpo** [`setContactMethod`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L166).

#### [`input.onChange`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L181) · callback JSX · dentro de [`FeedbackPage`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L31)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setEmail`.
- **Llamadas directas en el cuerpo** [`setEmail`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L181).

#### [`input.onChange`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L205) · callback JSX · dentro de [`FeedbackPage`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L31)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setWhatsapp`.
- **Llamadas directas en el cuerpo** [`setWhatsapp`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L205).

#### [`select.onChange`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L218) · callback JSX · dentro de [`FeedbackPage`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L31)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setFeedbackType`.
- **Llamadas directas en el cuerpo** [`setFeedbackType`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L218).

#### [`textarea.onChange`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L235) · callback JSX · dentro de [`FeedbackPage`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L31)

Responde al evento de interfaz `textarea.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setDescription`.
- **Llamadas directas en el cuerpo** [`setDescription`](../../../apps/prelaunch/src/support/FeedbackPage.jsx#L235).

### [`apps/prelaunch/src/support/FeedbackRoute.jsx`](../../../apps/prelaunch/src/support/FeedbackRoute.jsx#L1)

Selecciona la vista desktop/mobile del feedback y deja al controlador el formulario.

**Superficie que exporta.** [`FeedbackRoute`](../../../apps/prelaunch/src/support/FeedbackRoute.jsx#L5).

**Módulos que lo cargan.** [`main.jsx`](../../../apps/prelaunch/src/main.jsx#L13) (carga diferida).

**Dependencias del archivo.** [`../UI-detect/AdaptiveRoute`](../../../apps/prelaunch/src/UI-detect/AdaptiveRoute.jsx).

#### [`FeedbackRoute`](../../../apps/prelaunch/src/support/FeedbackRoute.jsx#L5) · componente React · exportación por defecto

Monta `AdaptiveRoute`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `AdaptiveRoute`.
- **Usa código de** [`FeedbackDesktopPage`](../../../apps/prelaunch/src/support/desktop/FeedbackDesktopPage.jsx#L6) (carga diferida), [`FeedbackMobilePage`](../../../apps/prelaunch/src/support/mobile/FeedbackMobilePage.jsx#L7) (carga diferida), [`AdaptiveRoute`](../../../apps/prelaunch/src/UI-detect/AdaptiveRoute.jsx#L4) (renderiza).
- **Lo usa** [`FeedbackRoute`](../../../apps/prelaunch/src/main.jsx#L13) (carga diferida).

### [`apps/prelaunch/src/support/mobile/components/MobileFeedbackMessageBlock.jsx`](../../../apps/prelaunch/src/support/mobile/components/MobileFeedbackMessageBlock.jsx#L1)

Presenta el mensaje de feedback en la composición móvil.

**Superficie que exporta.** [`MobileFeedbackMessageBlock`](../../../apps/prelaunch/src/support/mobile/components/MobileFeedbackMessageBlock.jsx#L1).

**Módulos que lo cargan.** [`FeedbackMobilePage.jsx`](../../../apps/prelaunch/src/support/mobile/FeedbackMobilePage.jsx#L4) (importa).

#### [`MobileFeedbackMessageBlock`](../../../apps/prelaunch/src/support/mobile/components/MobileFeedbackMessageBlock.jsx#L1) · componente React · exportación por defecto

Monta `form`, `input`, `textarea`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{controller}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `form`, `input`, `textarea`, `button`.
- **Lo usa** [`FeedbackMobilePage`](../../../apps/prelaunch/src/support/mobile/FeedbackMobilePage.jsx#L26) (renderiza).

#### [`input.onChange`](../../../apps/prelaunch/src/support/mobile/components/MobileFeedbackMessageBlock.jsx#L23) · callback JSX · dentro de [`MobileFeedbackMessageBlock`](../../../apps/prelaunch/src/support/mobile/components/MobileFeedbackMessageBlock.jsx#L1)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setHoneypot`.
- **Llamadas directas en el cuerpo** [`controller.setHoneypot`](../../../apps/prelaunch/src/support/mobile/components/MobileFeedbackMessageBlock.jsx#L23).

#### [`input.onChange`](../../../apps/prelaunch/src/support/mobile/components/MobileFeedbackMessageBlock.jsx#L32) · callback JSX · dentro de [`MobileFeedbackMessageBlock`](../../../apps/prelaunch/src/support/mobile/components/MobileFeedbackMessageBlock.jsx#L1)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setName`.
- **Llamadas directas en el cuerpo** [`controller.setName`](../../../apps/prelaunch/src/support/mobile/components/MobileFeedbackMessageBlock.jsx#L32).

#### [`input.onChange`](../../../apps/prelaunch/src/support/mobile/components/MobileFeedbackMessageBlock.jsx#L42) · callback JSX · dentro de [`MobileFeedbackMessageBlock`](../../../apps/prelaunch/src/support/mobile/components/MobileFeedbackMessageBlock.jsx#L1)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setEmail`.
- **Llamadas directas en el cuerpo** [`controller.setEmail`](../../../apps/prelaunch/src/support/mobile/components/MobileFeedbackMessageBlock.jsx#L42).

#### [`textarea.onChange`](../../../apps/prelaunch/src/support/mobile/components/MobileFeedbackMessageBlock.jsx#L51) · callback JSX · dentro de [`MobileFeedbackMessageBlock`](../../../apps/prelaunch/src/support/mobile/components/MobileFeedbackMessageBlock.jsx#L1)

Responde al evento de interfaz `textarea.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setMessage`.
- **Condiciones que evalúa** `event.target.value.length`.
- **Llamadas directas en el cuerpo** [`controller.setMessage`](../../../apps/prelaunch/src/support/mobile/components/MobileFeedbackMessageBlock.jsx#L53).

### [`apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L1)

Muestra controles y errores del formulario de ticket con orden y presentación mobile.

**Superficie que exporta.** [`MobileSupportOpenTicketForm`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L6).

**Módulos que lo cargan.** [`MobileSupportOpenTicketPage.jsx`](../../../apps/prelaunch/src/support/mobile/MobileSupportOpenTicketPage.jsx#L4) (importa).

**Dependencias del archivo.** [`../../supportOpenTicketShared`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js).

#### [`MobileSupportOpenTicketForm`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L6) · componente React · exportación por defecto

Monta `form`, `input`, `img`, `select`, `button`, `MailMethodIcon`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{controller}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `form`, `input`, `img`, `select`, `button`, `MailMethodIcon`, `textarea`.
- **Usa código de** [`ECUADOR_FLAG_SVG_URL`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L4) (pasa a src), [`SUPPORT_FORM_WHATSAPP_ICON_URL`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L6) (pasa a src).
- **Llamadas directas en el cuerpo** [`controller.categoryOptions.map`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L68).
- **Lo usa** [`MobileSupportOpenTicketPage`](../../../apps/prelaunch/src/support/mobile/MobileSupportOpenTicketPage.jsx#L27) (renderiza).

#### [`input.onChange`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L16) · callback JSX · dentro de [`MobileSupportOpenTicketForm`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L6)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setName`.
- **Llamadas directas en el cuerpo** [`controller.setName`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L16).

#### [`input.onChange`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L29) · callback JSX · dentro de [`MobileSupportOpenTicketForm`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L6)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setEmail`.
- **Llamadas directas en el cuerpo** [`controller.setEmail`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L29).

#### [`input.onChange`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L53) · callback JSX · dentro de [`MobileSupportOpenTicketForm`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L6)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setPhone`.
- **Llamadas directas en el cuerpo** [`controller.setPhone`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L53).

#### [`select.onChange`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L65) · callback JSX · dentro de [`MobileSupportOpenTicketForm`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L6)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setCategory`.
- **Llamadas directas en el cuerpo** [`controller.setCategory`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L65).

#### [`button.onClick`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L91) · callback JSX · dentro de [`MobileSupportOpenTicketForm`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L6)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setPreferredChannel`.
- **Llamadas directas en el cuerpo** [`controller.setPreferredChannel`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L91).

#### [`button.onClick`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L104) · callback JSX · dentro de [`MobileSupportOpenTicketForm`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L6)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setPreferredChannel`.
- **Llamadas directas en el cuerpo** [`controller.setPreferredChannel`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L104).

#### [`textarea.onChange`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L120) · callback JSX · dentro de [`MobileSupportOpenTicketForm`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L6)

Responde al evento de interfaz `textarea.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setDescription`.
- **Llamadas directas en el cuerpo** [`controller.setDescription`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L120).

#### [`MailMethodIcon`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L152) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`MobileSupportOpenTicketForm`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L94) (renderiza).

### [`apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketHeader.jsx`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketHeader.jsx#L1)

Organiza navegación y acciones de ayuda en móvil.

**Superficie que exporta.** [`MobileSupportOpenTicketHeader`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketHeader.jsx#L3).

**Módulos que lo cargan.** [`FeedbackMobilePage.jsx`](../../../apps/prelaunch/src/support/mobile/FeedbackMobilePage.jsx#L3) (importa), [`MobileSupportOpenTicketPage.jsx`](../../../apps/prelaunch/src/support/mobile/MobileSupportOpenTicketPage.jsx#L5) (importa).

**Dependencias del archivo.** [`../../../legal/mobile/helpCenterMobileShared`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx).

#### [`MobileSupportOpenTicketHeader`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketHeader.jsx#L3) · componente React · exportación por defecto

Monta `HelpCenterMobileHeader`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{backTo, headerActions, brandVariant, drawerId, drawerItems, isMenuOpen, onToggleMenu, onCloseMenu}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `HelpCenterMobileHeader`.
- **Usa código de** [`HelpCenterMobileHeader`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L93) (renderiza).
- **Lo usa** [`FeedbackMobilePage`](../../../apps/prelaunch/src/support/mobile/FeedbackMobilePage.jsx#L14) (renderiza), [`MobileSupportOpenTicketPage`](../../../apps/prelaunch/src/support/mobile/MobileSupportOpenTicketPage.jsx#L15) (renderiza).

### [`apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketHero.jsx`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketHero.jsx#L1)

Presenta la introducción y jerarquía visual de soporte en móvil.

**Superficie que exporta.** [`MobileSupportOpenTicketHero`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketHero.jsx#L3).

**Módulos que lo cargan.** [`MobileSupportOpenTicketPage.jsx`](../../../apps/prelaunch/src/support/mobile/MobileSupportOpenTicketPage.jsx#L6) (importa).

**Dependencias del archivo.** `react-router-dom`.

#### [`MobileSupportOpenTicketHero`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketHero.jsx#L3) · componente React · exportación por defecto

Monta `Link`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Link`.
- **Lo usa** [`MobileSupportOpenTicketPage`](../../../apps/prelaunch/src/support/mobile/MobileSupportOpenTicketPage.jsx#L26) (renderiza).

### [`apps/prelaunch/src/support/mobile/FeedbackMobilePage.jsx`](../../../apps/prelaunch/src/support/mobile/FeedbackMobilePage.jsx#L1)

Compone el formulario y navegación mobile del feedback con los mismos datos del controlador.

**Superficie que exporta.** [`FeedbackMobilePage`](../../../apps/prelaunch/src/support/mobile/FeedbackMobilePage.jsx#L7).

**Módulos que lo cargan.** [`FeedbackRoute.jsx`](../../../apps/prelaunch/src/support/FeedbackRoute.jsx#L9) (carga diferida).

**Dependencias del archivo.** `react`, [`../../legal/mobile/helpCenterMobileShared`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx), [`./components/MobileSupportOpenTicketHeader`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketHeader.jsx), [`./components/MobileFeedbackMessageBlock`](../../../apps/prelaunch/src/support/mobile/components/MobileFeedbackMessageBlock.jsx), [`../useFeedbackPageController`](../../../apps/prelaunch/src/support/useFeedbackPageController.js).

#### [`FeedbackMobilePage`](../../../apps/prelaunch/src/support/mobile/FeedbackMobilePage.jsx#L7) · componente React · exportación por defecto

Monta `MobileSupportOpenTicketHeader`, `MobileFeedbackMessageBlock`, `HelpCenterMobileFooter`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[isMenuOpen, setIsMenuOpen] mediante useState`.
- **Interfaz que monta** `MobileSupportOpenTicketHeader`, `MobileFeedbackMessageBlock`, `HelpCenterMobileFooter`.
- **Hooks que llama** `useFeedbackPageController`, `useId`, `useState`.
- **Usa código de** [`useFeedbackPageController`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L63) (llama), [`MobileSupportOpenTicketHeader`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketHeader.jsx#L3) (renderiza), [`MobileFeedbackMessageBlock`](../../../apps/prelaunch/src/support/mobile/components/MobileFeedbackMessageBlock.jsx#L1) (renderiza), [`HelpCenterMobileFooter`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L305) (renderiza).
- **Lo usa** [`FeedbackRoute`](../../../apps/prelaunch/src/support/FeedbackRoute.jsx#L9) (carga diferida).

#### [`MobileSupportOpenTicketHeader.onToggleMenu`](../../../apps/prelaunch/src/support/mobile/FeedbackMobilePage.jsx#L21) · callback JSX · dentro de [`FeedbackMobilePage`](../../../apps/prelaunch/src/support/mobile/FeedbackMobilePage.jsx#L7)

Responde al evento de interfaz `MobileSupportOpenTicketHeader.onToggleMenu`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setIsMenuOpen`.
- **Llamadas directas en el cuerpo** [`setIsMenuOpen`](../../../apps/prelaunch/src/support/mobile/FeedbackMobilePage.jsx#L21).

#### [`MobileSupportOpenTicketHeader.onCloseMenu`](../../../apps/prelaunch/src/support/mobile/FeedbackMobilePage.jsx#L22) · callback JSX · dentro de [`FeedbackMobilePage`](../../../apps/prelaunch/src/support/mobile/FeedbackMobilePage.jsx#L7)

Responde al evento de interfaz `MobileSupportOpenTicketHeader.onCloseMenu`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setIsMenuOpen`.
- **Llamadas directas en el cuerpo** [`setIsMenuOpen`](../../../apps/prelaunch/src/support/mobile/FeedbackMobilePage.jsx#L22).

### [`apps/prelaunch/src/support/mobile/MobileSupportOpenTicketPage.jsx`](../../../apps/prelaunch/src/support/mobile/MobileSupportOpenTicketPage.jsx#L1)

Compone apertura de ticket para móvil y conecta navegación, hero y formulario.

**Superficie que exporta.** [`MobileSupportOpenTicketPage`](../../../apps/prelaunch/src/support/mobile/MobileSupportOpenTicketPage.jsx#L8).

**Módulos que lo cargan.** [`SupportOpenTicketPage.jsx`](../../../apps/prelaunch/src/support/SupportOpenTicketPage.jsx#L8) (carga diferida).

**Dependencias del archivo.** `react`, [`../../legal/mobile/helpCenterMobileShared`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx), [`../useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js), [`./components/MobileSupportOpenTicketForm`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx), [`./components/MobileSupportOpenTicketHeader`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketHeader.jsx), [`./components/MobileSupportOpenTicketHero`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketHero.jsx).

#### [`MobileSupportOpenTicketPage`](../../../apps/prelaunch/src/support/mobile/MobileSupportOpenTicketPage.jsx#L8) · componente React · exportación por defecto

Monta `MobileSupportOpenTicketHeader`, `MobileSupportOpenTicketHero`, `MobileSupportOpenTicketForm`, `HelpCenterMobileFooter`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[isMenuOpen, setIsMenuOpen] mediante useState`.
- **Interfaz que monta** `MobileSupportOpenTicketHeader`, `MobileSupportOpenTicketHero`, `MobileSupportOpenTicketForm`, `HelpCenterMobileFooter`.
- **Hooks que llama** `useSupportOpenTicketController`, `useId`, `useState`.
- **Usa código de** [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L20) (llama), [`MobileSupportOpenTicketHeader`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketHeader.jsx#L3) (renderiza), [`MobileSupportOpenTicketHero`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketHero.jsx#L3) (renderiza), [`MobileSupportOpenTicketForm`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L6) (renderiza), [`HelpCenterMobileFooter`](../../../apps/prelaunch/src/legal/mobile/helpCenterMobileShared.jsx#L305) (renderiza).
- **Lo usa** [`SupportOpenTicketPage`](../../../apps/prelaunch/src/support/SupportOpenTicketPage.jsx#L8) (carga diferida).

#### [`MobileSupportOpenTicketHeader.onToggleMenu`](../../../apps/prelaunch/src/support/mobile/MobileSupportOpenTicketPage.jsx#L21) · callback JSX · dentro de [`MobileSupportOpenTicketPage`](../../../apps/prelaunch/src/support/mobile/MobileSupportOpenTicketPage.jsx#L8)

Responde al evento de interfaz `MobileSupportOpenTicketHeader.onToggleMenu`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setIsMenuOpen`.
- **Llamadas directas en el cuerpo** [`setIsMenuOpen`](../../../apps/prelaunch/src/support/mobile/MobileSupportOpenTicketPage.jsx#L21).

#### [`MobileSupportOpenTicketHeader.onCloseMenu`](../../../apps/prelaunch/src/support/mobile/MobileSupportOpenTicketPage.jsx#L22) · callback JSX · dentro de [`MobileSupportOpenTicketPage`](../../../apps/prelaunch/src/support/mobile/MobileSupportOpenTicketPage.jsx#L8)

Responde al evento de interfaz `MobileSupportOpenTicketHeader.onCloseMenu`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setIsMenuOpen`.
- **Llamadas directas en el cuerpo** [`setIsMenuOpen`](../../../apps/prelaunch/src/support/mobile/MobileSupportOpenTicketPage.jsx#L22).

### [`apps/prelaunch/src/support/supportApi.js`](../../../apps/prelaunch/src/support/supportApi.js#L1)

Adapta al cliente Prelaunch las operaciones de categoría, alta, estado, cancelación y retoma del hilo anónimo.

**Superficie que exporta.** [`createAnonymousSupportThread`](../../../apps/prelaunch/src/support/supportApi.js#L3), [`listAnonymousSupportCategories`](../../../apps/prelaunch/src/support/supportApi.js#L9), [`cancelAnonymousSupportThread`](../../../apps/prelaunch/src/support/supportApi.js#L15), [`getAnonymousSupportThreadStatus`](../../../apps/prelaunch/src/support/supportApi.js#L21), [`requestAnonymousSupportThreadRetake`](../../../apps/prelaunch/src/support/supportApi.js#L27).

**Módulos que lo cargan.** [`SupportRequestPage.jsx`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L3) (importa), [`useSupportOpenTicketController.js`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L4) (importa).

**Dependencias del archivo.** [`../services/prelaunchSystem`](../../../apps/prelaunch/src/services/prelaunchSystem.js).

#### [`createAnonymousSupportThread`](../../../apps/prelaunch/src/support/supportApi.js#L3) · función · exportado

Construye `Anonymous Support Thread` a partir de los datos del flujo.

- **Entradas** `payload = valor por defecto`.
- **Condiciones que evalúa** `ausencia de prelaunchClient`.
- **Usa código de** [`getPrelaunchClient`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L24) (llama).
- **Llamadas directas en el cuerpo** [`getPrelaunchClient`](../../../apps/prelaunch/src/support/supportApi.js#L4), [`prelaunchClient.support.createAnonymousThread`](../../../apps/prelaunch/src/support/supportApi.js#L6).
- **Lo usa** [`submitConversation`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L343) (llama), [`handleSubmit`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L163) (llama).

#### [`listAnonymousSupportCategories`](../../../apps/prelaunch/src/support/supportApi.js#L9) · función · exportado

Obtiene o resuelve `Anonymous Support Categories` para entregarlo al consumidor.

- **Entradas** `payload = valor por defecto`.
- **Condiciones que evalúa** `ausencia de prelaunchClient`.
- **Usa código de** [`getPrelaunchClient`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L24) (llama).
- **Llamadas directas en el cuerpo** [`getPrelaunchClient`](../../../apps/prelaunch/src/support/supportApi.js#L10), [`prelaunchClient.support.listAnonymousCategories`](../../../apps/prelaunch/src/support/supportApi.js#L12).
- **Lo usa** [`loadAnonymousCategories`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L195) (llama).

#### [`cancelAnonymousSupportThread`](../../../apps/prelaunch/src/support/supportApi.js#L15) · función · exportado

Comprueba `cel Anonymous Support Thread` para decidir si se admite o continúa la operación.

- **Entradas** `payload = valor por defecto`.
- **Condiciones que evalúa** `ausencia de prelaunchClient`.
- **Usa código de** [`getPrelaunchClient`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L24) (llama).
- **Llamadas directas en el cuerpo** [`getPrelaunchClient`](../../../apps/prelaunch/src/support/supportApi.js#L16), [`prelaunchClient.support.cancelAnonymousThread`](../../../apps/prelaunch/src/support/supportApi.js#L18).
- **Lo usa** [`handleReplaceTicket`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L398) (llama).

#### [`getAnonymousSupportThreadStatus`](../../../apps/prelaunch/src/support/supportApi.js#L21) · función · exportado

Obtiene o resuelve `Anonymous Support Thread Status` para entregarlo al consumidor.

- **Entradas** `payload = valor por defecto`.
- **Condiciones que evalúa** `ausencia de prelaunchClient`.
- **Usa código de** [`getPrelaunchClient`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L24) (llama).
- **Llamadas directas en el cuerpo** [`getPrelaunchClient`](../../../apps/prelaunch/src/support/supportApi.js#L22), [`prelaunchClient.support.getAnonymousThreadStatus`](../../../apps/prelaunch/src/support/supportApi.js#L24).
- **Lo usa** [`submitConversation`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L353) (llama).

#### [`requestAnonymousSupportThreadRetake`](../../../apps/prelaunch/src/support/supportApi.js#L27) · función · exportado

Implementa `request Anonymous Support Thread Retake` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `payload = valor por defecto`.
- **Condiciones que evalúa** `ausencia de prelaunchClient`.
- **Usa código de** [`getPrelaunchClient`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L24) (llama).
- **Llamadas directas en el cuerpo** [`getPrelaunchClient`](../../../apps/prelaunch/src/support/supportApi.js#L28), [`prelaunchClient.support.requestThreadRetake`](../../../apps/prelaunch/src/support/supportApi.js#L30).
- **Lo usa** [`handleRetakeTicket`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L419) (llama).

### [`apps/prelaunch/src/support/SupportChatPage.jsx`](../../../apps/prelaunch/src/support/SupportChatPage.jsx#L1)

Mantiene la superficie del canal chat en el árbol de soporte. El router vigente redirige la URL antigua a abrir ticket.

**Superficie que exporta.** [`SupportChatPage`](../../../apps/prelaunch/src/support/SupportChatPage.jsx#L4).

**Dependencias del archivo.** `react`, [`./SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx).

#### [`SupportChatPage`](../../../apps/prelaunch/src/support/SupportChatPage.jsx#L4) · componente React · exportación por defecto

Monta `SupportRequestPage`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SupportRequestPage`.
- **Usa código de** [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97) (renderiza).

### [`apps/prelaunch/src/support/SupportEmailPage.jsx`](../../../apps/prelaunch/src/support/SupportEmailPage.jsx#L1)

Mantiene la superficie del canal correo. El router vigente atiende la URL antigua mediante redirección.

**Superficie que exporta.** [`SupportEmailPage`](../../../apps/prelaunch/src/support/SupportEmailPage.jsx#L4).

**Dependencias del archivo.** `react`, [`./SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx).

#### [`SupportEmailPage`](../../../apps/prelaunch/src/support/SupportEmailPage.jsx#L4) · componente React · exportación por defecto

Monta `SupportRequestPage`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SupportRequestPage`.
- **Usa código de** [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97) (renderiza).

### [`apps/prelaunch/src/support/SupportOpenTicketPage.jsx`](../../../apps/prelaunch/src/support/SupportOpenTicketPage.jsx#L1)

Entrada adaptativa del formulario unificado. Carga las vistas por árbol.

**Superficie que exporta.** [`SupportOpenTicketPage`](../../../apps/prelaunch/src/support/SupportOpenTicketPage.jsx#L4).

**Módulos que lo cargan.** [`main.jsx`](../../../apps/prelaunch/src/main.jsx#L12) (carga diferida).

**Dependencias del archivo.** [`../UI-detect/AdaptiveRoute`](../../../apps/prelaunch/src/UI-detect/AdaptiveRoute.jsx).

#### [`SupportOpenTicketPage`](../../../apps/prelaunch/src/support/SupportOpenTicketPage.jsx#L4) · componente React · exportación por defecto

Monta `AdaptiveRoute`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `AdaptiveRoute`.
- **Usa código de** [`DesktopSupportOpenTicketPage`](../../../apps/prelaunch/src/support/desktop/DesktopSupportOpenTicketPage.jsx#L7) (carga diferida), [`MobileSupportOpenTicketPage`](../../../apps/prelaunch/src/support/mobile/MobileSupportOpenTicketPage.jsx#L8) (carga diferida), [`AdaptiveRoute`](../../../apps/prelaunch/src/UI-detect/AdaptiveRoute.jsx#L4) (renderiza).
- **Lo usa** [`SupportOpenTicketPage`](../../../apps/prelaunch/src/main.jsx#L12) (carga diferida).

### [`apps/prelaunch/src/support/supportOpenTicketShared.js`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L1)

Comparte categorías de respaldo, helpers de contacto y reglas visuales comunes del formulario.

**Superficie que exporta.** [`ECUADOR_PREFIX`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L3), [`ECUADOR_FLAG_SVG_URL`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L4), [`SUPPORT_FORM_WHATSAPP_ICON_URL`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L6), [`DEFAULT_SUPPORT_CATEGORIES`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L7), [`isOtherSupportCategory`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L12), [`normalizeSupportEmail`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L17), [`normalizeSupportWhatsappLocal`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L25), [`normalizeSupportCategoryOption`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L36), [`buildSupportSuccessMessage`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L50).

**Módulos que lo cargan.** [`DesktopSupportOpenTicketForm.jsx`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L1) (importa), [`MobileSupportOpenTicketForm.jsx`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L1) (importa), [`useSupportOpenTicketController.js`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L5) (importa).

**Dependencias del archivo.** [`../assets/modals/logos_whatsapp-icon.svg`](../../../apps/prelaunch/src/assets/modals/logos_whatsapp-icon.svg).

#### [`ECUADOR_PREFIX`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L3) · variable de módulo · exportado

Declara `ECUADOR_PREFIX` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeSupportWhatsappLocal`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L27) (referencia), [`normalizedWhatsapp`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L80) (referencia).

#### [`ECUADOR_FLAG_SVG_URL`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L4) · variable de módulo · exportado

Declara `ECUADOR_FLAG_SVG_URL` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`DesktopSupportOpenTicketForm`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L40) (pasa a src), [`MobileSupportOpenTicketForm`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L40) (pasa a src).

#### [`SUPPORT_FORM_WHATSAPP_ICON_URL`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L6) · variable de módulo · exportado

Declara `SUPPORT_FORM_WHATSAPP_ICON_URL` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`supportWhatsappIcon`](../../../apps/prelaunch/src/assets/modals/logos_whatsapp-icon.svg) (referencia).
- **Lo usa** [`DesktopSupportOpenTicketForm`](../../../apps/prelaunch/src/support/desktop/components/DesktopSupportOpenTicketForm.jsx#L107) (pasa a src), [`MobileSupportOpenTicketForm`](../../../apps/prelaunch/src/support/mobile/components/MobileSupportOpenTicketForm.jsx#L107) (pasa a src).

#### [`DEFAULT_SUPPORT_CATEGORIES`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L7) · variable de módulo · exportado

Conserva la lista de `DEFAULT SUPPORT CATEGORIES` usada por el módulo.

- **Lo usa** [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L68) (referencia), [`useEffect · callback`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L115) (referencia).

#### [`isOtherSupportCategory`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L12) · función · exportado

Comprueba `Other Support Category` para decidir si se admite o continúa la operación.

- **Entradas** `value`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L13), [`trim`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L13), [`normalized.startsWith`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L14).
- **Lo usa** [`isOtherCategorySelected`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L90) (llama).

#### [`normalizeSupportEmail`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L17) · función · exportado

Normaliza `Support Email` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de test`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L18), [`trim`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L18), [`test`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L19).
- **Lo usa** [`normalizedEmail`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L74) (llama).

#### [`normalizeSupportWhatsappLocal`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L25) · función · exportado

Normaliza `Support Whatsapp Local` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `null`.
- **Efectos y APIs** `replace`.
- **Condiciones que evalúa** `digits.startsWith`, `digits.length`.
- **Llamadas directas en el cuerpo** [`replace`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L26), [`digits.startsWith`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L27), [`digits.slice`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L28).
- **Lo usa** [`normalizedWhatsappLocal`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L76) (llama).

#### [`normalizeSupportCategoryOption`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L36) · función · exportado

Normaliza `Support Category Option` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `item`.
- **Retorno visible o tipo declarado** `null`, `id`, `label`.
- **Condiciones que evalúa** `ausencia de id`, `ausencia de label`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L37), [`trim`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L37).

#### [`buildSupportSuccessMessage`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L50) · función · exportado

Construye `Support Success Message` a partir de los datos del flujo.

- **Entradas** `channel`.
- **Lo usa** [`handleSubmit`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L167) (llama).

### [`apps/prelaunch/src/support/SupportRequestPage.jsx`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L1)

Pantalla de solicitud conservada en el módulo de soporte. Revisa sus consumidores y la entrada unificada si vas a reutilizarla.

**Superficie que exporta.** [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97).

**Módulos que lo cargan.** [`SupportChatPage.jsx`](../../../apps/prelaunch/src/support/SupportChatPage.jsx#L2) (importa), [`SupportEmailPage.jsx`](../../../apps/prelaunch/src/support/SupportEmailPage.jsx#L2) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, [`./supportApi`](../../../apps/prelaunch/src/support/supportApi.js), [`../services/prelaunchSystem`](../../../apps/prelaunch/src/services/prelaunchSystem.js), [`../config/runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js).

#### [`SUMMARY_MAX`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L12) · variable de módulo

Declara `SUMMARY_MAX` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L591) (pasa a maxLength).

#### [`ECUADOR_PREFIX`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L13) · variable de módulo

Declara `ECUADOR_PREFIX` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeWhatsappLocal`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L21) (referencia), [`normalizedWhatsapp`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L132) (referencia).

#### [`ECUADOR_FLAG_SVG_URL`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L14) · variable de módulo

Declara `ECUADOR_FLAG_SVG_URL` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L512) (pasa a src).

#### [`DELETE_WAITLIST_CATEGORY_CODES`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L15) · variable de módulo

Declara `DELETE_WAITLIST_CATEGORY_CODES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`isDeleteWaitlistCategory`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L48) (accede al módulo).

#### [`OTHER_REASON_CATEGORY_CODES`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L16) · variable de módulo

Declara `OTHER_REASON_CATEGORY_CODES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`submitCategoryCode`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L155) (accede al módulo).

#### [`DEFAULT_SUPPORT_CATEGORY_CODE`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L17) · variable de módulo

Declara `DEFAULT_SUPPORT_CATEGORY_CODE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`submitCategoryCode`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L154) (referencia).

#### [`normalizeWhatsappLocal`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L19) · función

Normaliza `Whatsapp Local` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `null`.
- **Efectos y APIs** `replace`.
- **Condiciones que evalúa** `digits.startsWith`, `digits.length`.
- **Llamadas directas en el cuerpo** [`replace`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L20), [`digits.startsWith`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L21), [`digits.slice`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L22).
- **Lo usa** [`normalizedWhatsappLocal`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L130) (llama).

#### [`normalizeEmail`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L28) · función

Normaliza el valor de correo antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de test`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L29), [`trim`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L29), [`test`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L30).
- **Lo usa** [`normalizedEmail`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L135) (llama), [`normalizedDeleteTargetEmail`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L137) (llama).

#### [`normalizeCategoryOption`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L34) · función

Normaliza `Category Option` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `item`.
- **Retorno visible o tipo declarado** `null`, `id`, `label`.
- **Condiciones que evalúa** `ausencia de id`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L35), [`trim`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L35), [`rawLabel.toLowerCase`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L38).
- **Lo usa** [`loadAnonymousCategories`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L214) (llama).

#### [`isDeleteWaitlistCategory`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L45) · función

Comprueba `Delete Waitlist Category` para decidir si se admite o continúa la operación.

- **Entradas** `categoryCode`.
- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `ausencia de normalized`, `DELETE_WAITLIST_CATEGORY_CODES.has`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L46), [`trim`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L46), [`DELETE_WAITLIST_CATEGORY_CODES.has`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L48), [`normalized.startsWith`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L49).
- **Lo usa** [`requiresDeleteTargetEmail`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L145) (llama).

#### [`SupportModal`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L52) · componente React

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{open, title, body, confirmLabel, cancelLabel, onConfirm, onCancel, confirmDisabled, children}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Interfaz que monta** `button`.
- **Condiciones que evalúa** `ausencia de open`.
- **Lo usa** [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L670) (renderiza).

#### [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97) · componente React · exportación por defecto

Monta `Link`, `form`, `input`, `img`, `select`, `textarea`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{channel}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[contact, setContact] mediante useState`, `[summary, setSummary] mediante useState`, `[category, setCategory] mediante useState`, `[deleteTargetEmail, setDeleteTargetEmail] mediante useState`, `[categoryOptions, setCategoryOptions] mediante useState`, `[categoriesLoading, setCategoriesLoading] mediante useState`, `[categoriesError, setCategoriesError] mediante useState`, `[submitting, setSubmitting] mediante useState`, `[error, setError] mediante useState`, `[createdTicket, setCreatedTicket] mediante useState`, `[ticketCopied, setTicketCopied] mediante useState`, `[saveTicketModalOpen, setSaveTicketModalOpen] mediante useState`, `[replacePrompt, setReplacePrompt] mediante useState`, `[replaceLoading, setReplaceLoading] mediante useState` y 3 más.
- **Interfaz que monta** `Link`, `form`, `input`, `img`, `select`, `textarea`, `button`, `SupportModal`.
- **Hooks que llama** `useLocation`, `useSearchParams`, `useState`, `useRef`, `useEffect`.
- **Llamadas directas en el cuerpo** [`location.pathname.toLowerCase`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L102), [`toLowerCase`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L104), [`trim`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L104), [`searchParams.get`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L104), [`categoryOptions.map`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L547).
- **Lo usa** [`SupportChatPage`](../../../apps/prelaunch/src/support/SupportChatPage.jsx#L5) (renderiza), [`SupportEmailPage`](../../../apps/prelaunch/src/support/SupportEmailPage.jsx#L5) (renderiza).

#### [`normalizedWhatsappLocal`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L130) · cálculo memorizado · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Normaliza `d Whatsapp Local` antes de validarlo, mostrarlo o enviarlo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`normalizeWhatsappLocal`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L130).
- **Lo usa** [`normalizedWhatsapp`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L132) (referencia).

#### [`normalizedWhatsapp`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L132) · cálculo memorizado · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Normaliza `d Whatsapp` antes de validarlo, mostrarlo o enviarlo.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`normalizedContact`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L141) (referencia).

#### [`normalizedEmail`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L135) · cálculo memorizado · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Normaliza `d Email` antes de validarlo, mostrarlo o enviarlo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`normalizeEmail`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L135).
- **Lo usa** [`normalizedContact`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L141) (referencia).

#### [`normalizedDeleteTargetEmail`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L137) · cálculo memorizado · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Normaliza `d Delete Target Email` antes de validarlo, mostrarlo o enviarlo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`normalizeEmail`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L137).
- **Lo usa** [`canSubmit`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L163) (referencia), [`submitConversation`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L337) (referencia), [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L574) (referencia).

#### [`normalizedContact`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L141) · cálculo memorizado · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Normaliza `d Contact` antes de validarlo, mostrarlo o enviarlo.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`canSubmit`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L161) (referencia), [`submitConversation`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L317) (referencia).

#### [`requiresDeleteTargetEmail`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L145) · cálculo memorizado · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Comprueba `s Delete Target Email` para decidir si se admite o continúa la operación.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`isDeleteWaitlistCategory`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L145).
- **Lo usa** [`canSubmit`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L163) (referencia), [`submitConversation`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L336) (referencia), [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L561) (referencia).

#### [`hasCategorySelection`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L149) · cálculo memorizado · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Comprueba `Category Selection` para decidir si se admite o continúa la operación.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`categoryOptions.some`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L149).
- **Lo usa** [`canSubmit`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L162) (referencia).

#### [`submitCategoryCode`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L152) · cálculo memorizado · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Emite o envía `Category Code` en el flujo del archivo.

- **Hooks que llama** `useMemo`.
- **Condiciones que evalúa** `ausencia de normalized`, `OTHER_REASON_CATEGORY_CODES.has`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L153), [`trim`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L153), [`OTHER_REASON_CATEGORY_CODES.has`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L155).
- **Lo usa** [`submitConversation`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L319) (referencia).

#### [`canSubmit`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L160) · cálculo memorizado · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Comprueba `Submit` para decidir si se admite o continúa la operación.

- **Hooks que llama** `useMemo`.
- **Lo usa** [`submitConversation`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L284) (referencia), [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L603) (referencia).

#### [`resizeSummaryInput`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L181) · callback React · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Función auxiliar de `SupportRequestPage` para `resize Summary Input`.

- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `ausencia de node`.
- **Lo usa** [`useEffect · callback`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L261) (llama), [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L262) (referencia).

#### [`useEffect · callback`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L188) · callback de infraestructura · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportRequestPage`.

- **Llamadas directas en el cuerpo** [`loadAnonymousCategories`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L229).

#### [`loadAnonymousCategories`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L191) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L188)

Obtiene o resuelve `Anonymous Categories` para entregarlo al consumidor.

- **Retorno visible o tipo declarado** `booleano`.
- **Actualizaciones de estado o acciones** `setCategoriesLoading`, `setCategoriesError`, `setCategoryOptions`.
- **Condiciones que evalúa** `cancelled`, `ausencia de response.ok o ausencia de response.data.ok`, `ausencia de item`, `seen.has`, `nextOptions.length`.
- **Usa código de** [`listAnonymousSupportCategories`](../../../apps/prelaunch/src/support/supportApi.js#L9) (llama).
- **Llamadas directas en el cuerpo** [`setCategoriesLoading`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L192), [`setCategoriesError`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L193), [`listAnonymousSupportCategories`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L195), [`setCategoryOptions`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L201), [`filter`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L213), [`map`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L213), [`normalizeCategoryOption`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L214), [`seen.has`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L217), [`seen.add`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L218).
- **Lo usa** [`useEffect · callback`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L229) (llama).

#### [`useEffect · callback`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L236) · callback de infraestructura · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportRequestPage`.

- **Actualizaciones de estado o acciones** `setCategory`.
- **Condiciones que evalúa** `ausencia de categoryOptions.length`, `requestedCategory y available.has`, `previous y available.has`.
- **Llamadas directas en el cuerpo** [`setCategory`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L238), [`categoryOptions.map`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L242), [`available.has`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L244).

#### [`useEffect · callback`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L250) · callback de infraestructura · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportRequestPage`.

- **Usa código de** [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L56) (llama).
- **Llamadas directas en el cuerpo** [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L251).

#### [`useEffect · callback`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L260) · callback de infraestructura · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `SupportRequestPage`.

- **Llamadas directas en el cuerpo** [`resizeSummaryInput`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L261).

#### [`copyTicketNumber`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L264) · callback React · asíncrona · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Coordina cambios de estado durante `copy Ticket Number`.

- **Entradas** `ticketNumber`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setTicketCopied`.
- **Efectos y APIs** `navigator.clipboard.writeText`, `window.setTimeout`.
- **Condiciones que evalúa** `ausencia de ticketNumber`.
- **Llamadas directas en el cuerpo** [`navigator.clipboard.writeText`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L267), [`document.createElement`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L269), [`document.body.appendChild`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L273), [`hidden.focus`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L274), [`hidden.select`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L275), [`document.execCommand`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L276), [`document.body.removeChild`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L277), [`setTicketCopied`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L279), [`window.setTimeout`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L280).
- **Lo usa** [`submitConversation`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L381) (llama), [`button.onClick`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L688) (llama).

#### [`setTimeout · callback`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L280) · callback de infraestructura · dentro de [`copyTicketNumber`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L264)

Ejecuta trabajo diferido o periódico iniciado por `copyTicketNumber`.

- **Actualizaciones de estado o acciones** `setTicketCopied`.
- **Llamadas directas en el cuerpo** [`setTicketCopied`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L280).

#### [`submitConversation`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L283) · función · asíncrona · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Emite o envía `Conversation` en el flujo del archivo.

- **Actualizaciones de estado o acciones** `setSubmitting`, `setError`, `setReplacePrompt`, `setRetakeFeedback`, `setCreatedTicket`, `setTicketCopied`, `setSaveTicketModalOpen`.
- **Efectos y APIs** `crypto.randomUUID`.
- **Condiciones que evalúa** `ausencia de canSubmit`, `ausencia de response.ok o ausencia de response.data.ok`, `response.error y response.data.thread_public_id y response.data.tracking_token`, `statusResult.ok y statusResult.data.ok`.
- **Usa código de** [`runtimeConfig`](../../../apps/prelaunch/src/config/runtimeConfig.js#L61) (accede al módulo), [`createAnonymousSupportThread`](../../../apps/prelaunch/src/support/supportApi.js#L3) (llama), [`getAnonymousSupportThreadStatus`](../../../apps/prelaunch/src/support/supportApi.js#L21) (llama), [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L56) (llama).
- **Llamadas directas en el cuerpo** [`setSubmitting`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L286), [`setError`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L287), [`resolvedOptions`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L289), [`Intl.DateTimeFormat`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L289), [`summary.trim`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L318), [`crypto.randomUUID`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L330), [`createAnonymousSupportThread`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L343), [`getAnonymousSupportThreadStatus`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L353), [`setReplacePrompt`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L361), [`setRetakeFeedback`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L366), [`setCreatedTicket`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L378), [`setTicketCopied`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L379) y 3 más.
- **Lo usa** [`handleReplaceTicket`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L412) (llama), [`form.onSubmit`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L491) (llama).

#### [`handleReplaceTicket`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L392) · función · asíncrona · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Maneja `Replace Ticket` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setReplaceLoading`, `setError`, `setReplacePrompt`.
- **Condiciones que evalúa** `ausencia de replacePrompt`, `ausencia de cancelResponse.ok y ausencia de cancelResponse.data.already_closed`.
- **Usa código de** [`cancelAnonymousSupportThread`](../../../apps/prelaunch/src/support/supportApi.js#L15) (llama).
- **Llamadas directas en el cuerpo** [`setReplaceLoading`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L395), [`setError`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L396), [`cancelAnonymousSupportThread`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L398), [`setReplacePrompt`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L410), [`submitConversation`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L412).
- **Lo usa** [`SupportModal.onConfirm`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L703) (llama).

#### [`handleRetakeTicket`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L415) · función · asíncrona · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Maneja `Retake Ticket` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setRetakeLoading`, `setRetakeFeedback`.
- **Condiciones que evalúa** `ausencia de replacePrompt.thread_public_id o ausencia de replacePrompt.tracking_token`, `ausencia de result.ok o ausencia de result.data.ok`.
- **Usa código de** [`requestAnonymousSupportThreadRetake`](../../../apps/prelaunch/src/support/supportApi.js#L27) (llama).
- **Llamadas directas en el cuerpo** [`setRetakeLoading`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L417), [`setRetakeFeedback`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L418), [`requestAnonymousSupportThreadRetake`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L419).
- **Lo usa** [`button.onClick`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L710) (llama).

#### [`form.onSubmit`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L489) · callback JSX · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Responde al evento de interfaz `form.onSubmit`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`event.preventDefault`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L490), [`submitConversation`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L491).

#### [`input.onChange`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L503) · callback JSX · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setContact`.
- **Llamadas directas en el cuerpo** [`setContact`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L503).

#### [`input.onChange`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L525) · callback JSX · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setContact`.
- **Llamadas directas en el cuerpo** [`setContact`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L525).

#### [`select.onChange`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L540) · callback JSX · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Responde al evento de interfaz `select.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setCategory`.
- **Llamadas directas en el cuerpo** [`setCategory`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L540).

#### [`input.onChange`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L570) · callback JSX · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setDeleteTargetEmail`.
- **Llamadas directas en el cuerpo** [`setDeleteTargetEmail`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L570).

#### [`textarea.onChange`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L589) · callback JSX · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Responde al evento de interfaz `textarea.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setSummary`.
- **Llamadas directas en el cuerpo** [`setSummary`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L589).

#### [`SupportModal.onConfirm`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L679) · callback JSX · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Responde al evento de interfaz `SupportModal.onConfirm`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setSaveTicketModalOpen`.
- **Llamadas directas en el cuerpo** [`setSaveTicketModalOpen`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L679).

#### [`button.onClick`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L688) · callback JSX · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`copyTicketNumber`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L688).

#### [`SupportModal.onConfirm`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L703) · callback JSX · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Responde al evento de interfaz `SupportModal.onConfirm`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleReplaceTicket`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L703).

#### [`SupportModal.onCancel`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L704) · callback JSX · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Responde al evento de interfaz `SupportModal.onCancel`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setReplacePrompt`.
- **Llamadas directas en el cuerpo** [`setReplacePrompt`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L704).

#### [`button.onClick`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L710) · callback JSX · dentro de [`SupportRequestPage`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L97)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleRetakeTicket`](../../../apps/prelaunch/src/support/SupportRequestPage.jsx#L710).

### [`apps/prelaunch/src/support/useFeedbackPageController.js`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L1)

Gestiona prefill de navegación, nombre/correo/mensaje, honeypot, límites, telemetría y estados de envío.

**Superficie que exporta.** [`useFeedbackPageController`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L63).

**Módulos que lo cargan.** [`FeedbackDesktopPage.jsx`](../../../apps/prelaunch/src/support/desktop/FeedbackDesktopPage.jsx#L4) (importa), [`FeedbackMobilePage.jsx`](../../../apps/prelaunch/src/support/mobile/FeedbackMobilePage.jsx#L5) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, [`../feedback/feedbackApi`](../../../apps/prelaunch/src/feedback/feedbackApi.js), [`../services/prelaunchSystem`](../../../apps/prelaunch/src/services/prelaunchSystem.js).

#### [`MESSAGE_MAX`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L6) · variable de módulo

Declara `MESSAGE_MAX` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`readPrefillFromLocationState`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L58) (referencia), [`useFeedbackPageController`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L274) (referencia).

#### [`normalizeOriginRole`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L8) · función

Normaliza `Origin Role` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Condiciones que evalúa** `normalized`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L9), [`trim`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L9).
- **Lo usa** [`useFeedbackPageController`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L66) (llama).

#### [`normalizeEmail`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L14) · función

Normaliza el valor de correo antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de test`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L15), [`trim`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L15), [`test`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L16).
- **Lo usa** [`normalizedEmail`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L114) (llama).

#### [`bucketMessageLength`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L22) · función

Implementa `bucket Message Length` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `length`.
- **Condiciones que evalúa** `ausencia de Number.isFinite o length`, `length`.
- **Lo usa** [`handleSubmit`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L158) (llama).

#### [`getCurrentTree`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L30) · función

Obtiene o resuelve `Current Tree` para entregarlo al consumidor.

- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `undefined`.
- **Lo usa** [`tree`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L116) (llama).

#### [`getFeedbackErrorMessage`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L39) · función

Obtiene o resuelve `Feedback Error Message` para entregarlo al consumidor.

- **Entradas** `errorCode`.
- **Condiciones que evalúa** `errorCode`.
- **Lo usa** [`handleSubmit`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L147) (llama).

#### [`readPrefillFromLocationState`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L52) · función

Extrae o interpreta `Prefill From Location State` de los argumentos, estado o datos de entrada.

- **Entradas** `locationState`.
- **Retorno visible o tipo declarado** `name`, `email`, `message`, `sourceSurface`.
- **Condiciones que evalúa** `ausencia de locationState o object`.
- **Llamadas directas en el cuerpo** [`slice`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L56).
- **Lo usa** [`prefill`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L68) (llama).

#### [`useFeedbackPageController`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L63) · hook React · exportado

Agrupa estado, contexto o efectos de `Feedback Page Controller` para sus consumidores React.

- **Retorno visible o tipo declarado** `backTo`, `desktopHeaderActions`, `mobileHeaderActions`, `mobileDrawerItems`, `sourceSurface`, `name`, `setName`, `email`, `setEmail`, `message`, `setMessage`, `honeypot`, `setHoneypot`, `messageMax`, `submitting`, `canSubmit`, `error`, `success` y 1 más.
- **Estado o valores vinculados** `[name, setName] mediante useState`, `[email, setEmail] mediante useState`, `[message, setMessage] mediante useState`, `[honeypot, setHoneypot] mediante useState`, `[submitting, setSubmitting] mediante useState`, `[error, setError] mediante useState`, `[success, setSuccess] mediante useState`.
- **Hooks que llama** `useSearchParams`, `useLocation`, `useState`, `useEffect`.
- **Llamadas directas en el cuerpo** [`normalizeOriginRole`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L66), [`searchParams.get`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L66).
- **Lo usa** [`FeedbackDesktopPage`](../../../apps/prelaunch/src/support/desktop/FeedbackDesktopPage.jsx#L7) (llama), [`FeedbackMobilePage`](../../../apps/prelaunch/src/support/mobile/FeedbackMobilePage.jsx#L8) (llama).

#### [`prefill`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L68) · cálculo memorizado · dentro de [`useFeedbackPageController`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L63)

Función auxiliar de `useFeedbackPageController` para `prefill`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`readPrefillFromLocationState`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L68).
- **Lo usa** [`useFeedbackPageController`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L106) (accede al módulo).

#### [`desktopHeaderActions`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L71) · cálculo memorizado · dentro de [`useFeedbackPageController`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L63)

Función auxiliar de `useFeedbackPageController` para `desktop Header Actions`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Lo usa** [`useFeedbackPageController`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L262) (referencia).

#### [`mobileHeaderActions`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L84) · cálculo memorizado · dentro de [`useFeedbackPageController`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L63)

Función auxiliar de `useFeedbackPageController` para `mobile Header Actions`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Lo usa** [`useFeedbackPageController`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L263) (referencia).

#### [`mobileDrawerItems`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L96) · cálculo memorizado · dentro de [`useFeedbackPageController`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L63)

Función auxiliar de `useFeedbackPageController` para `mobile Drawer Items`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Lo usa** [`useFeedbackPageController`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L264) (referencia).

#### [`normalizedEmail`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L114) · cálculo memorizado · dentro de [`useFeedbackPageController`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L63)

Normaliza `d Email` antes de validarlo, mostrarlo o enviarlo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`normalizeEmail`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L114).
- **Lo usa** [`useFeedbackPageController`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L118) (referencia), [`handleSubmit`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L145) (referencia).

#### [`trimmedMessage`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L115) · cálculo memorizado · dentro de [`useFeedbackPageController`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L63)

Normaliza `med Message` antes de validarlo, mostrarlo o enviarlo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`message.trim`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L115).
- **Lo usa** [`useFeedbackPageController`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L118) (referencia), [`handleSubmit`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L158) (accede al módulo).

#### [`tree`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L116) · cálculo memorizado · dentro de [`useFeedbackPageController`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L63)

Función auxiliar de `useFeedbackPageController` para `tree`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`getCurrentTree`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L116).
- **Lo usa** [`useEffect · callback`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L125) (referencia), [`useFeedbackPageController`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L139) (referencia), [`handleSubmit`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L152) (referencia).

#### [`useEffect · callback`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L120) · callback de infraestructura · dentro de [`useFeedbackPageController`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L63)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useFeedbackPageController`.

- **Usa código de** [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L56) (llama).
- **Llamadas directas en el cuerpo** [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L121).

#### [`handleSubmit`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L141) · función · asíncrona · dentro de [`useFeedbackPageController`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L63)

Maneja `Submit` y coordina las acciones indicadas abajo.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setSuccess`, `setError`, `setSubmitting`, `setMessage`, `setHoneypot`.
- **Condiciones que evalúa** `ausencia de canSubmit`, `ausencia de response.ok`, `response.status`.
- **Usa código de** [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L56) (llama), [`submitPublicFeedback`](../../../apps/prelaunch/src/feedback/feedbackApi.js#L3) (llama).
- **Llamadas directas en el cuerpo** [`event.preventDefault`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L142), [`setSuccess`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L146), [`setError`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L147), [`getFeedbackErrorMessage`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L147), [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L148), [`name.trim`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L156), [`bucketMessageLength`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L158), [`setSubmitting`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L164), [`submitPublicFeedback`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L184), [`setMessage`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L219), [`setHoneypot`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L220).
- **Lo usa** [`useFeedbackPageController`](../../../apps/prelaunch/src/support/useFeedbackPageController.js#L279) (referencia).

### [`apps/prelaunch/src/support/useSupportOpenTicketController.js`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L1)

Gestiona nombre, correo, teléfono, categoría, descripción y canal. Busca catálogo de backend y valida requisitos antes de abrir el hilo.

**Superficie que exporta.** [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L20).

**Módulos que lo cargan.** [`DesktopSupportOpenTicketPage.jsx`](../../../apps/prelaunch/src/support/desktop/DesktopSupportOpenTicketPage.jsx#L2) (importa), [`MobileSupportOpenTicketPage.jsx`](../../../apps/prelaunch/src/support/mobile/MobileSupportOpenTicketPage.jsx#L3) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, [`../services/prelaunchSystem`](../../../apps/prelaunch/src/services/prelaunchSystem.js), [`./supportApi`](../../../apps/prelaunch/src/support/supportApi.js), [`./supportOpenTicketShared`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js).

#### [`normalizeOriginRole`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L14) · función

Normaliza `Origin Role` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value`.
- **Condiciones que evalúa** `normalized`.
- **Llamadas directas en el cuerpo** [`toLowerCase`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L15), [`trim`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L15).
- **Lo usa** [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L22) (llama).

#### [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L20) · hook React · exportado

Centraliza selección de canal, contacto, catálogo y validación del formulario de soporte público. Las variantes de UI presentan el mismo contrato.

- **Retorno visible o tipo declarado** `origin`, `backTo`, `desktopHeaderActions`, `mobileHeaderActions`, `mobileDrawerItems`, `name`, `setName`, `email`, `setEmail`, `phone`, `setPhone`, `category`, `setCategory`, `description`, `setDescription`, `isOtherCategorySelected`, `preferredChannel`, `setPreferredChannel` y 7 más.
- **Estado o valores vinculados** `[name, setName] mediante useState`, `[email, setEmail] mediante useState`, `[phone, setPhone] mediante useState`, `[category, setCategory] mediante useState`, `[description, setDescription] mediante useState`, `[preferredChannel, setPreferredChannel] mediante useState`, `[categoryOptions, setCategoryOptions] mediante useState`, `[categoriesLoading, setCategoriesLoading] mediante useState`, `[submitting, setSubmitting] mediante useState`, `[error, setError] mediante useState`, `[success, setSuccess] mediante useState`.
- **Hooks que llama** `useSearchParams`, `useState`, `useEffect`.
- **Usa código de** [`DEFAULT_SUPPORT_CATEGORIES`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L7) (referencia).
- **Llamadas directas en el cuerpo** [`normalizeOriginRole`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L22), [`searchParams.get`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L22), [`name.trim`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L96).
- **Lo usa** [`DesktopSupportOpenTicketPage`](../../../apps/prelaunch/src/support/desktop/DesktopSupportOpenTicketPage.jsx#L8) (llama), [`MobileSupportOpenTicketPage`](../../../apps/prelaunch/src/support/mobile/MobileSupportOpenTicketPage.jsx#L9) (llama).

#### [`desktopHeaderActions`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L27) · cálculo memorizado · dentro de [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L20)

Función auxiliar de `useSupportOpenTicketController` para `desktop Header Actions`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Lo usa** [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L198) (referencia).

#### [`mobileHeaderActions`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L40) · cálculo memorizado · dentro de [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L20)

Función auxiliar de `useSupportOpenTicketController` para `mobile Header Actions`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Lo usa** [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L199) (referencia).

#### [`mobileDrawerItems`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L52) · cálculo memorizado · dentro de [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L20)

Función auxiliar de `useSupportOpenTicketController` para `mobile Drawer Items`.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Lo usa** [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L200) (referencia).

#### [`normalizedEmail`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L74) · cálculo memorizado · dentro de [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L20)

Normaliza `d Email` antes de validarlo, mostrarlo o enviarlo.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`normalizeSupportEmail`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L17) (llama).
- **Llamadas directas en el cuerpo** [`normalizeSupportEmail`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L74).
- **Lo usa** [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L84) (referencia), [`handleSubmit`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L154) (referencia).

#### [`normalizedWhatsappLocal`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L76) · cálculo memorizado · dentro de [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L20)

Normaliza `d Whatsapp Local` antes de validarlo, mostrarlo o enviarlo.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`normalizeSupportWhatsappLocal`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L25) (llama).
- **Llamadas directas en el cuerpo** [`normalizeSupportWhatsappLocal`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L76).
- **Lo usa** [`normalizedWhatsapp`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L80) (referencia).

#### [`normalizedWhatsapp`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L80) · cálculo memorizado · dentro de [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L20)

Normaliza `d Whatsapp` antes de validarlo, mostrarlo o enviarlo.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`ECUADOR_PREFIX`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L3) (referencia).
- **Lo usa** [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L84) (referencia), [`handleSubmit`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L155) (referencia).

#### [`selectedCategory`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L86) · cálculo memorizado · dentro de [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L20)

Procesa `ed Category` según el criterio del módulo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`categoryOptions.find`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L86).
- **Lo usa** [`isOtherCategorySelected`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L90) (referencia), [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L99) (referencia), [`handleSubmit`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L145) (accede al módulo).

#### [`isOtherCategorySelected`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L90) · cálculo memorizado · dentro de [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L20)

Comprueba `Other Category Selected` para decidir si se admite o continúa la operación.

- **Hooks que llama** `useMemo`.
- **Usa código de** [`isOtherSupportCategory`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L12) (llama).
- **Llamadas directas en el cuerpo** [`isOtherSupportCategory`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L90).
- **Lo usa** [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L211) (referencia).

#### [`trimmedDescription`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L93) · cálculo memorizado · dentro de [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L20)

Normaliza `med Description` antes de validarlo, mostrarlo o enviarlo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`description.trim`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L93).
- **Lo usa** [`handleSubmit`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L144) (referencia).

#### [`useEffect · callback`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L104) · callback de infraestructura · dentro de [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L20)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useSupportOpenTicketController`.

- **Usa código de** [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L56) (llama).
- **Llamadas directas en el cuerpo** [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L105).

#### [`useEffect · callback`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L114) · callback de infraestructura · dentro de [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L20)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useSupportOpenTicketController`.

- **Actualizaciones de estado o acciones** `setCategoryOptions`, `setCategoriesLoading`.
- **Usa código de** [`DEFAULT_SUPPORT_CATEGORIES`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L7) (referencia).
- **Llamadas directas en el cuerpo** [`setCategoryOptions`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L115), [`setCategoriesLoading`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L116).

#### [`useEffect · callback`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L119) · callback de infraestructura · dentro de [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L20)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useSupportOpenTicketController`.

- **Actualizaciones de estado o acciones** `setCategory`.
- **Condiciones que evalúa** `current y categoryOptions.some`.
- **Llamadas directas en el cuerpo** [`setCategory`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L120), [`categoryOptions.some`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L121).

#### [`handleSubmit`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L128) · función · asíncrona · dentro de [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L20)

Maneja `Submit` y coordina las acciones indicadas abajo.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setError`, `setSuccess`, `setSubmitting`.
- **Efectos y APIs** `crypto.randomUUID`.
- **Condiciones que evalúa** `ausencia de canSubmit`, `ausencia de response.ok o ausencia de response.data.ok`, `response.error`.
- **Usa código de** [`createAnonymousSupportThread`](../../../apps/prelaunch/src/support/supportApi.js#L3) (llama), [`buildSupportSuccessMessage`](../../../apps/prelaunch/src/support/supportOpenTicketShared.js#L50) (llama), [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L56) (llama).
- **Llamadas directas en el cuerpo** [`event.preventDefault`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L129), [`setError`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L131), [`setSuccess`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L132), [`setSubmitting`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L136), [`crypto.randomUUID`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L150), [`name.trim`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L153), [`createAnonymousSupportThread`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L163), [`buildSupportSuccessMessage`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L167), [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L182).
- **Lo usa** [`useSupportOpenTicketController`](../../../apps/prelaunch/src/support/useSupportOpenTicketController.js#L220) (referencia).
