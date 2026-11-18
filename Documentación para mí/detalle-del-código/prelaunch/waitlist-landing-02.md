# Prelaunch · Landing principal · 2 de 2

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx#L1)
- [`apps/prelaunch/src/waitlist-landing/mobile/components/MobileFooterPanels.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileFooterPanels.jsx#L1)
- [`apps/prelaunch/src/waitlist-landing/mobile/components/MobileHeroBackground.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileHeroBackground.jsx#L1)
- [`apps/prelaunch/src/waitlist-landing/mobile/components/MobileInvitationModal.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileInvitationModal.jsx#L1)
- [`apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalAssets.js`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalAssets.js#L1)
- [`apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx#L1)
- [`apps/prelaunch/src/waitlist-landing/mobile/components/MobileMockupSteps.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileMockupSteps.jsx#L1)
- [`apps/prelaunch/src/waitlist-landing/mobile/components/MobilePhoneSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobilePhoneSection.jsx#L1)
- [`apps/prelaunch/src/waitlist-landing/mobile/components/MobilePlatformModal.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobilePlatformModal.jsx#L1)
- [`apps/prelaunch/src/waitlist-landing/mobile/components/MobileStepCard.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileStepCard.jsx#L1)
- [`apps/prelaunch/src/waitlist-landing/mobile/components/MobileWaitlistForm.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWaitlistForm.jsx#L1)
- [`apps/prelaunch/src/waitlist-landing/mobile/components/MobileWhoWeAreModal.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWhoWeAreModal.jsx#L1)
- [`apps/prelaunch/src/waitlist-landing/mobile/mobileWaitlistLandingContent.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/mobileWaitlistLandingContent.jsx#L1)
- [`apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L1)
- [`apps/prelaunch/src/waitlist-landing/mobile/sections/MobileContactSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileContactSection.jsx#L1)
- [`apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L1)
- [`apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L1)
- [`apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistSection.jsx#L1)
- [`apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistStepsSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistStepsSection.jsx#L1)
- [`apps/prelaunch/src/waitlist-landing/scrollToSection.js`](../../../apps/prelaunch/src/waitlist-landing/scrollToSection.js#L1)
- [`apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx#L1)

## Símbolos y conexiones

### [`apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx#L1)

Presenta entradas de contacto y comunica eventos al componente de sección.

**Superficie que exporta.** [`MobileContactForm`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx#L4).

**Módulos que lo cargan.** [`MobileContactSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileContactSection.jsx#L3) (importa).

**Dependencias del archivo.** `react`, [`../../../assets/landing/bottom/purple-button-glow-optimized.webp`](../../../apps/prelaunch/src/assets/landing/bottom/purple-button-glow-optimized.webp).

#### [`MobileContactForm`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx#L4) · componente React · exportación por defecto

Monta `button`, `input`, `textarea`, `img`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onFeedbackClick, onHelpClick, onLinkClick}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[name, setName] mediante useState`, `[email, setEmail] mediante useState`, `[message, setMessage] mediante useState`.
- **Interfaz que monta** `button`, `input`, `textarea`, `img`.
- **Hooks que llama** `useState`.
- **Usa código de** [`purpleButtonGlow`](../../../apps/prelaunch/src/assets/landing/bottom/purple-button-glow-optimized.webp) (pasa a src).
- **Lo usa** [`MobileContactSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileContactSection.jsx#L13) (renderiza).

#### [`button.onClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx#L20) · callback JSX · dentro de [`MobileContactForm`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx#L4)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onLinkClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx#L21), [`onHelpClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx#L28).

#### [`input.onChange`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx#L42) · callback JSX · dentro de [`MobileContactForm`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx#L4)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setName`.
- **Llamadas directas en el cuerpo** [`setName`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx#L42).

#### [`input.onChange`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx#L52) · callback JSX · dentro de [`MobileContactForm`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx#L4)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setEmail`.
- **Llamadas directas en el cuerpo** [`setEmail`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx#L52).

#### [`textarea.onChange`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx#L61) · callback JSX · dentro de [`MobileContactForm`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx#L4)

Responde al evento de interfaz `textarea.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setMessage`.
- **Condiciones que evalúa** `event.target.value.length`.
- **Llamadas directas en el cuerpo** [`setMessage`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx#L63).

#### [`button.onClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx#L83) · callback JSX · dentro de [`MobileContactForm`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx#L4)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onLinkClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx#L84), [`onFeedbackClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx#L91).

### [`apps/prelaunch/src/waitlist-landing/mobile/components/MobileFooterPanels.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileFooterPanels.jsx#L1)

Agrupa acciones de pie en paneles adecuados al espacio móvil.

**Superficie que exporta.** [`MobileFooterPanels`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileFooterPanels.jsx#L1).

**Módulos que lo cargan.** [`MobileFooterSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L7) (importa).

#### [`MobileFooterPanels`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileFooterPanels.jsx#L1) · componente React · exportación por defecto

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{panels, onPanelClick, className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileFooterPanels.jsx#L3), [`panels.map`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileFooterPanels.jsx#L4).
- **Lo usa** [`MobileFooterSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L74) (renderiza).

#### [`button.onClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileFooterPanels.jsx#L9) · callback JSX · dentro de [`MobileFooterPanels`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileFooterPanels.jsx#L1)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`onPanelClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileFooterPanels.jsx#L9).

### [`apps/prelaunch/src/waitlist-landing/mobile/components/MobileHeroBackground.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileHeroBackground.jsx#L1)

Selecciona fondos optimizados del hero mobile y los compone con la máscara visual.

**Superficie que exporta.** [`MobileHeroBackground`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileHeroBackground.jsx#L11).

**Módulos que lo cargan.** [`MobileHeroSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L6) (importa).

**Dependencias del archivo.** [`../../../assets/landing/hero/bg/hero-mobile-mask.svg?raw`](../../../apps/prelaunch/src/assets/landing/hero/bg/hero-mobile-mask.svg), [`../../../assets/svgMaskUrl`](../../../apps/prelaunch/src/assets/svgMaskUrl.js), [`../../../assets/landing/hero/bg/hero-mobile-optimized-960.webp`](../../../apps/prelaunch/src/assets/landing/hero/bg/hero-mobile-optimized-960.webp), [`../../../assets/landing/hero/bg/hero-mobile-optimized-1280.webp`](../../../apps/prelaunch/src/assets/landing/hero/bg/hero-mobile-optimized-1280.webp), [`../../../assets/landing/hero/bg/hero-mobile-optimized-1605.webp`](../../../apps/prelaunch/src/assets/landing/hero/bg/hero-mobile-optimized-1605.webp), [`../../../assets/landing/hero/bg/hero-mobile-optimized-960.avif`](../../../apps/prelaunch/src/assets/landing/hero/bg/hero-mobile-optimized-960.avif), [`../../../assets/landing/hero/bg/hero-mobile-optimized-1280.avif`](../../../apps/prelaunch/src/assets/landing/hero/bg/hero-mobile-optimized-1280.avif), [`../../../assets/landing/hero/bg/hero-mobile-optimized-1605.avif`](../../../apps/prelaunch/src/assets/landing/hero/bg/hero-mobile-optimized-1605.avif).

#### [`heroMobileMask`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileHeroBackground.jsx#L9) · variable de módulo

Declara `heroMobileMask` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Usa código de** [`svgMaskUrl`](../../../apps/prelaunch/src/assets/svgMaskUrl.js#L18) (llama), [`heroMobileMaskRaw`](../../../apps/prelaunch/src/assets/landing/hero/bg/hero-mobile-mask.svg) (referencia).
- **Llamadas directas en el cuerpo** [`svgMaskUrl`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileHeroBackground.jsx#L9).
- **Lo usa** [`MobileHeroBackground`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileHeroBackground.jsx#L33) (referencia).

#### [`MobileHeroBackground`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileHeroBackground.jsx#L11) · componente React · exportación por defecto

Monta `img`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `img`.
- **Usa código de** [`heroMobile960Avif`](../../../apps/prelaunch/src/assets/landing/hero/bg/hero-mobile-optimized-960.avif) (referencia), [`heroMobile1280Avif`](../../../apps/prelaunch/src/assets/landing/hero/bg/hero-mobile-optimized-1280.avif) (referencia), [`heroMobile1605Avif`](../../../apps/prelaunch/src/assets/landing/hero/bg/hero-mobile-optimized-1605.avif) (referencia), [`heroMobile960Webp`](../../../apps/prelaunch/src/assets/landing/hero/bg/hero-mobile-optimized-960.webp) (referencia), [`heroMobile1280Webp`](../../../apps/prelaunch/src/assets/landing/hero/bg/hero-mobile-optimized-1280.webp) (referencia), [`heroMobile1605Webp`](../../../apps/prelaunch/src/assets/landing/hero/bg/hero-mobile-optimized-1605.webp) (referencia).
- **Lo usa** [`MobileHeroSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L63) (renderiza).

### [`apps/prelaunch/src/waitlist-landing/mobile/components/MobileInvitationModal.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileInvitationModal.jsx#L1)

Muestra el diálogo de invitación del recorrido mobile.

**Superficie que exporta.** [`MobileInvitationModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileInvitationModal.jsx#L5).

**Módulos que lo cargan.** [`MobileWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L19) (carga diferida).

**Dependencias del archivo.** [`./MobileLandingModalFrame`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx), [`./MobileLandingModalAssets`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalAssets.js), [`../../../assets/modals/modal-line.png`](../../../apps/prelaunch/src/assets/modals/modal-line.png).

#### [`MobileInvitationModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileInvitationModal.jsx#L5) · componente React · exportación por defecto

Monta `MobileLandingModalFrame`, `button`, `CloseIcon`, `img`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{isOpen, onClose, onPrimaryAction}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `MobileLandingModalFrame`, `button`, `CloseIcon`, `img`.
- **Usa código de** [`MobileLandingModalFrame`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx#L4) (renderiza), [`LANDING_MODAL_ASSETS`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalAssets.js#L13) (accede al módulo), [`modalDivider`](../../../apps/prelaunch/src/assets/modals/modal-line.png) (pasa a src).
- **Lo usa** [`MobileInvitationModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L19) (carga diferida).

#### [`CloseIcon`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileInvitationModal.jsx#L76) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`MobileInvitationModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileInvitationModal.jsx#L21) (renderiza).

### [`apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalAssets.js`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalAssets.js#L1)

Agrupa recursos visuales usados por los modales mobile.

**Superficie que exporta.** [`LANDING_MODAL_ASSETS`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalAssets.js#L13).

**Módulos que lo cargan.** [`MobileCongratsModal.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileCongratsModal.jsx#L3) (importa), [`MobileInvitationModal.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileInvitationModal.jsx#L2) (importa), [`MobilePlatformModal.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobilePlatformModal.jsx#L2) (importa), [`MobileWhoWeAreModal.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWhoWeAreModal.jsx#L2) (importa).

**Dependencias del archivo.** [`../../../assets/modals/yellow-icon-congrats-modal-optimized.webp`](../../../apps/prelaunch/src/assets/modals/yellow-icon-congrats-modal-optimized.webp), [`../../../assets/modals/yellow-icon-platform-modal-optimized.webp`](../../../apps/prelaunch/src/assets/modals/yellow-icon-platform-modal-optimized.webp), [`../../../assets/modals/yellow-icon-about-us-modal-optimized.webp`](../../../apps/prelaunch/src/assets/modals/yellow-icon-about-us-modal-optimized.webp), [`../../../assets/modals/yellow-icon-info-modal-optimized.webp`](../../../apps/prelaunch/src/assets/modals/yellow-icon-info-modal-optimized.webp), [`../../../assets/modals/lets-icons_check-fill.svg`](../../../apps/prelaunch/src/assets/modals/lets-icons_check-fill.svg), [`../../../assets/modals/tabler_copy.svg`](../../../apps/prelaunch/src/assets/modals/tabler_copy.svg), [`../../../assets/modals/logos_whatsapp-icon.svg`](../../../apps/prelaunch/src/assets/modals/logos_whatsapp-icon.svg), [`../../../assets/modals/ic_baseline-facebook.svg`](../../../apps/prelaunch/src/assets/modals/ic_baseline-facebook.svg), [`../../../assets/modals/skill-icons_instagram.svg`](../../../apps/prelaunch/src/assets/modals/skill-icons_instagram.svg), [`../../../assets/modals/bi_twitter-x.svg`](../../../apps/prelaunch/src/assets/modals/bi_twitter-x.svg), [`../../../assets/modals/mdi_bell.svg`](../../../apps/prelaunch/src/assets/modals/mdi_bell.svg).

#### [`LANDING_MODAL_ASSETS`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalAssets.js#L13) · variable de módulo · exportado

Agrupa la configuración o catálogo de `LANDING MODAL ASSETS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `congratsIcon`, `platformIcon`, `teamIcon`, `invitationClockIcon`, `checkBullet`, `copyIcon`, `whatsappIcon`, `facebookIcon`, `instagramIcon`, `twitterXIcon`, `notifyBellIcon`.
- **Usa código de** [`yellowCongratsIcon`](../../../apps/prelaunch/src/assets/modals/yellow-icon-congrats-modal-optimized.webp) (referencia), [`yellowPlatformIcon`](../../../apps/prelaunch/src/assets/modals/yellow-icon-platform-modal-optimized.webp) (referencia), [`yellowAboutUsIcon`](../../../apps/prelaunch/src/assets/modals/yellow-icon-about-us-modal-optimized.webp) (referencia), [`yellowInfoModalIcon`](../../../apps/prelaunch/src/assets/modals/yellow-icon-info-modal-optimized.webp) (referencia), [`checkBulletIcon`](../../../apps/prelaunch/src/assets/modals/lets-icons_check-fill.svg) (referencia), [`copyIcon`](../../../apps/prelaunch/src/assets/modals/tabler_copy.svg) (referencia), [`whatsappIcon`](../../../apps/prelaunch/src/assets/modals/logos_whatsapp-icon.svg) (referencia), [`facebookIcon`](../../../apps/prelaunch/src/assets/modals/ic_baseline-facebook.svg) (referencia), [`instagramIcon`](../../../apps/prelaunch/src/assets/modals/skill-icons_instagram.svg) (referencia), [`twitterXIcon`](../../../apps/prelaunch/src/assets/modals/bi_twitter-x.svg) (referencia) y 1 más.
- **Lo usa** [`MobileCongratsModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileCongratsModal.jsx#L78) (accede al módulo), [`MobileInvitationModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileInvitationModal.jsx#L27) (accede al módulo), [`MobilePlatformModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobilePlatformModal.jsx#L32) (accede al módulo), [`MobileWhoWeAreModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWhoWeAreModal.jsx#L32) (accede al módulo).

### [`apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx#L1)

Provee el marco y el cierre común de los diálogos mobile.

**Superficie que exporta.** [`MobileLandingModalFrame`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx#L4).

**Módulos que lo cargan.** [`MobileCongratsModal.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileCongratsModal.jsx#L2) (importa), [`MobileInvitationModal.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileInvitationModal.jsx#L1) (importa), [`MobilePlatformModal.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobilePlatformModal.jsx#L1) (importa), [`MobileWhoWeAreModal.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWhoWeAreModal.jsx#L1) (importa).

**Dependencias del archivo.** `react`.

#### [`MobileLandingModalFrame`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx#L4) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{isOpen, onClose, dialogLabel, rootClassName, children}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Hooks que llama** `useEffect`.
- **Condiciones que evalúa** `ausencia de isOpen`.
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx#L45).
- **Lo usa** [`MobileCongratsModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileCongratsModal.jsx#L57) (renderiza), [`MobileInvitationModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileInvitationModal.jsx#L7) (renderiza), [`MobilePlatformModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobilePlatformModal.jsx#L12) (renderiza), [`MobileWhoWeAreModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWhoWeAreModal.jsx#L12) (renderiza).

#### [`useEffect · callback`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx#L11) · callback de infraestructura · dentro de [`MobileLandingModalFrame`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx#L4)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `MobileLandingModalFrame`.

- **Efectos y APIs** `window.addEventListener`, `window.removeEventListener`.
- **Condiciones que evalúa** `ausencia de isOpen`.
- **Llamadas directas en el cuerpo** [`window.addEventListener`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx#L22), [`window.removeEventListener`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx#L23).

#### [`handleKeyDown`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx#L16) · función · dentro de [`useEffect · callback`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx#L11)

Maneja `Key Down` y coordina las acciones indicadas abajo.

- **Entradas** `event`.
- **Condiciones que evalúa** `event.key`.
- **Llamadas directas en el cuerpo** [`onClose`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx#L18).
- **Lo usa** [`useEffect · callback`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx#L22) (referencia).

#### [`useEffect · callback`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx#L26) · callback de infraestructura · dentro de [`MobileLandingModalFrame`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx#L4)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `MobileLandingModalFrame`.

- **Condiciones que evalúa** `ausencia de isOpen`.

#### [`div.onClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx#L47) · callback JSX · dentro de [`MobileLandingModalFrame`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx#L4)

Responde al evento de interfaz `div.onClick`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Condiciones que evalúa** `event.target`.
- **Llamadas directas en el cuerpo** [`onClose`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx#L49).

### [`apps/prelaunch/src/waitlist-landing/mobile/components/MobileMockupSteps.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileMockupSteps.jsx#L1)

Composición móvil de la maqueta de pasos.

**Superficie que exporta.** [`MobileMockupSteps`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileMockupSteps.jsx#L3).

**Módulos que lo cargan.** [`MobileWaitlistSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistSection.jsx#L5) (importa).

**Dependencias del archivo.** [`../../../assets/landing/bottom/mockup-how-to-use-optimized.webp`](../../../apps/prelaunch/src/assets/landing/bottom/mockup-how-to-use-optimized.webp).

#### [`MobileMockupSteps`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileMockupSteps.jsx#L3) · componente React · exportación por defecto

Monta `img`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `img`.
- **Usa código de** [`mockupHowToUse`](../../../apps/prelaunch/src/assets/landing/bottom/mockup-how-to-use-optimized.webp) (pasa a src).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileMockupSteps.jsx#L6).
- **Lo usa** [`MobileWaitlistSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistSection.jsx#L56) (renderiza).

### [`apps/prelaunch/src/waitlist-landing/mobile/components/MobilePhoneSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobilePhoneSection.jsx#L1)

Monta la maqueta de teléfono en móvil y asigna sus capas, clase y recursos.

**Superficie que exporta.** [`MobilePhoneSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobilePhoneSection.jsx#L4).

**Módulos que lo cargan.** [`MobileWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L11) (importa), [`MobileHeroSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L7) (importa), [`MobileWaitlistStepsSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistStepsSection.jsx#L6) (importa).

**Dependencias del archivo.** [`../../../assets/landing/hero/nothing-phone-2a-optimized.webp`](../../../apps/prelaunch/src/assets/landing/hero/nothing-phone-2a-optimized.webp).

#### [`MobilePhoneSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobilePhoneSection.jsx#L4) · componente React · exportación por defecto

Monta `img`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{isHeroLayout, className, showDisclaimer}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `img`.
- **Usa código de** [`phoneMockup`](../../../apps/prelaunch/src/assets/landing/hero/nothing-phone-2a-optimized.webp) (pasa a src).
- **Llamadas directas en el cuerpo** [`trim`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobilePhoneSection.jsx#L11).
- **Lo usa** [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L328) (renderiza), [`MobileHeroSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L214) (renderiza), [`MobileWaitlistStepsSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistStepsSection.jsx#L16) (renderiza).

### [`apps/prelaunch/src/waitlist-landing/mobile/components/MobilePlatformModal.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobilePlatformModal.jsx#L1)

Diálogo móvil sobre la plataforma.

**Superficie que exporta.** [`MobilePlatformModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobilePlatformModal.jsx#L10).

**Módulos que lo cargan.** [`MobileWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L20) (carga diferida).

**Dependencias del archivo.** [`./MobileLandingModalFrame`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx), [`./MobileLandingModalAssets`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalAssets.js).

#### [`PLATFORM_FEATURES`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobilePlatformModal.jsx#L4) · variable de módulo

Conserva la lista de `PLATFORM FEATURES` usada por el módulo.

- **Lo usa** [`MobilePlatformModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobilePlatformModal.jsx#L49) (accede al módulo).

#### [`MobilePlatformModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobilePlatformModal.jsx#L10) · componente React · exportación por defecto

Monta `MobileLandingModalFrame`, `button`, `CloseIcon`, `img`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{isOpen, onClose}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `MobileLandingModalFrame`, `button`, `CloseIcon`, `img`.
- **Usa código de** [`MobileLandingModalFrame`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx#L4) (renderiza), [`LANDING_MODAL_ASSETS`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalAssets.js#L13) (accede al módulo).
- **Llamadas directas en el cuerpo** [`PLATFORM_FEATURES.map`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobilePlatformModal.jsx#L49).
- **Lo usa** [`MobilePlatformModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L20) (carga diferida).

#### [`CloseIcon`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobilePlatformModal.jsx#L74) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`MobilePlatformModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobilePlatformModal.jsx#L26) (renderiza).

### [`apps/prelaunch/src/waitlist-landing/mobile/components/MobileStepCard.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileStepCard.jsx#L1)

Presentación de una tarjeta individual de pasos en el tamaño y orden mobile.

**Superficie que exporta.** [`MobileStepCard`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileStepCard.jsx#L1).

**Módulos que lo cargan.** [`MobileWaitlistStepsSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistStepsSection.jsx#L7) (importa).

#### [`MobileStepCard`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileStepCard.jsx#L1) · componente React · exportación por defecto

Monta `img`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{step, index}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `img`.
- **Lo usa** [`MobileWaitlistStepsSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistStepsSection.jsx#L41) (renderiza).

### [`apps/prelaunch/src/waitlist-landing/mobile/components/MobileWaitlistForm.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWaitlistForm.jsx#L1)

Presenta el campo y el envío de waitlist en mobile, junto con su estado de error o carga.

**Superficie que exporta.** [`MobileWaitlistForm`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWaitlistForm.jsx#L6).

**Módulos que lo cargan.** [`MobileWaitlistSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistSection.jsx#L6) (importa).

**Dependencias del archivo.** `react-router-dom`, [`../../../assets/landing/bottom/green-button-glow-optimized.webp`](../../../apps/prelaunch/src/assets/landing/bottom/green-button-glow-optimized.webp), [`../../../assets/modals/lets-icons_check-fill.svg`](../../../apps/prelaunch/src/assets/modals/lets-icons_check-fill.svg), [`../../../assets/modals/majesticons_lock.svg`](../../../apps/prelaunch/src/assets/modals/majesticons_lock.svg).

#### [`MobileWaitlistForm`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWaitlistForm.jsx#L6) · componente React · exportación por defecto

Monta `form`, `input`, `img`, `button`, `Link`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{email, onEmailChange, honeypot, onHoneypotChange, onSubmit, status, errorMessage}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `form`, `input`, `img`, `button`, `Link`.
- **Usa código de** [`greenButtonGlow`](../../../apps/prelaunch/src/assets/landing/bottom/green-button-glow-optimized.webp) (pasa a src), [`checkIcon`](../../../apps/prelaunch/src/assets/modals/lets-icons_check-fill.svg) (pasa a src), [`lockIcon`](../../../apps/prelaunch/src/assets/modals/majesticons_lock.svg) (pasa a src).
- **Lo usa** [`MobileWaitlistSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistSection.jsx#L35) (renderiza).

#### [`input.onChange`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWaitlistForm.jsx#L28) · callback JSX · dentro de [`MobileWaitlistForm`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWaitlistForm.jsx#L6)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`onHoneypotChange`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWaitlistForm.jsx#L28).

#### [`input.onChange`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWaitlistForm.jsx#L36) · callback JSX · dentro de [`MobileWaitlistForm`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWaitlistForm.jsx#L6)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`onEmailChange`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWaitlistForm.jsx#L36).

### [`apps/prelaunch/src/waitlist-landing/mobile/components/MobileWhoWeAreModal.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWhoWeAreModal.jsx#L1)

Expone el diálogo de quiénes somos en móvil y las acciones asociadas.

**Superficie que exporta.** [`MobileWhoWeAreModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWhoWeAreModal.jsx#L10).

**Módulos que lo cargan.** [`MobileWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L21) (carga diferida).

**Dependencias del archivo.** [`./MobileLandingModalFrame`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx), [`./MobileLandingModalAssets`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalAssets.js).

#### [`TEAM_VALUES`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWhoWeAreModal.jsx#L4) · variable de módulo

Conserva la lista de `TEAM VALUES` usada por el módulo.

- **Lo usa** [`MobileWhoWeAreModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWhoWeAreModal.jsx#L52) (accede al módulo).

#### [`MobileWhoWeAreModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWhoWeAreModal.jsx#L10) · componente React · exportación por defecto

Monta `MobileLandingModalFrame`, `button`, `CloseIcon`, `img`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{isOpen, onClose}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `MobileLandingModalFrame`, `button`, `CloseIcon`, `img`.
- **Usa código de** [`MobileLandingModalFrame`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalFrame.jsx#L4) (renderiza), [`LANDING_MODAL_ASSETS`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileLandingModalAssets.js#L13) (accede al módulo).
- **Llamadas directas en el cuerpo** [`TEAM_VALUES.map`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWhoWeAreModal.jsx#L52).
- **Lo usa** [`MobileWhoWeAreModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L21) (carga diferida).

#### [`CloseIcon`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWhoWeAreModal.jsx#L74) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`MobileWhoWeAreModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWhoWeAreModal.jsx#L26) (renderiza).

### [`apps/prelaunch/src/waitlist-landing/mobile/mobileWaitlistLandingContent.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/mobileWaitlistLandingContent.jsx#L1)

Define datos y textos de las secciones mobile. Facilita ajustar el contenido sin editar la composición.

**Superficie que exporta.** [`steps`](../../../apps/prelaunch/src/waitlist-landing/mobile/mobileWaitlistLandingContent.jsx#L8), [`footerPanels`](../../../apps/prelaunch/src/waitlist-landing/mobile/mobileWaitlistLandingContent.jsx#L80).

**Módulos que lo cargan.** [`MobileFooterSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L6) (importa), [`MobileWaitlistStepsSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistStepsSection.jsx#L5) (importa).

**Dependencias del archivo.** [`../../assets/landing/steps/n1-blue-optimized.webp`](../../../apps/prelaunch/src/assets/landing/steps/n1-blue-optimized.webp), [`../../assets/landing/steps/n2-purple-optimized.webp`](../../../apps/prelaunch/src/assets/landing/steps/n2-purple-optimized.webp), [`../../assets/landing/steps/n3-cyan-optimized.webp`](../../../apps/prelaunch/src/assets/landing/steps/n3-cyan-optimized.webp), [`../../assets/landing/steps/mail-optimized.webp`](../../../apps/prelaunch/src/assets/landing/steps/mail-optimized.webp), [`../../assets/landing/steps/gift-optimized.webp`](../../../apps/prelaunch/src/assets/landing/steps/gift-optimized.webp), [`../../assets/landing/steps/coin-optimized.webp`](../../../apps/prelaunch/src/assets/landing/steps/coin-optimized.webp).

#### [`steps`](../../../apps/prelaunch/src/waitlist-landing/mobile/mobileWaitlistLandingContent.jsx#L8) · variable de módulo · exportado

Conserva la lista de `steps` usada por el módulo.

- **Usa código de** [`iconNumber1Blue`](../../../apps/prelaunch/src/assets/landing/steps/n1-blue-optimized.webp) (referencia), [`iconMailBlue`](../../../apps/prelaunch/src/assets/landing/steps/mail-optimized.webp) (referencia), [`iconNumber2Purple`](../../../apps/prelaunch/src/assets/landing/steps/n2-purple-optimized.webp) (referencia), [`iconGift`](../../../apps/prelaunch/src/assets/landing/steps/gift-optimized.webp) (referencia), [`iconNumber3BlueCyan`](../../../apps/prelaunch/src/assets/landing/steps/n3-cyan-optimized.webp) (referencia), [`iconCoins`](../../../apps/prelaunch/src/assets/landing/steps/coin-optimized.webp) (referencia).
- **Lo usa** [`MobileWaitlistStepsSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistStepsSection.jsx#L40) (accede al módulo).

#### [`footerPanels`](../../../apps/prelaunch/src/waitlist-landing/mobile/mobileWaitlistLandingContent.jsx#L80) · variable de módulo · exportado

Conserva la lista de `footer Panels` usada por el módulo.

- **Lo usa** [`MobileFooterSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L75) (pasa a panels).

### [`apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L1)

Coordina drawer, modales, tracking, contactos y secciones con montaje diferido. Orquesta el recorrido móvil.

**Superficie que exporta.** [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26).

**Módulos que lo cargan.** [`WaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx#L39) (carga diferida).

**Dependencias del archivo.** `react`, `react-router-dom`, [`../../performance/DeferredRender`](../../../apps/prelaunch/src/performance/DeferredRender.jsx), [`../../landing-logic/useLandingLeadCapture`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js), [`../../observability/usePrelaunchPageTracking`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js), [`../../services/prelaunchSystem`](../../../apps/prelaunch/src/services/prelaunchSystem.js), [`../../waitlist/referralLinks`](../../../apps/prelaunch/src/waitlist/referralLinks.js), [`../scrollToSection`](../../../apps/prelaunch/src/waitlist-landing/scrollToSection.js), [`./components/MobileBottomBackground`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileBottomBackground.jsx), [`./components/MobilePhoneSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobilePhoneSection.jsx), [`./sections/MobileHeroSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx), [`./sections/MobileWaitlistSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistSection.jsx).

#### [`MobileBusinessInterestModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L15) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`MobileBusinessInterestModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileBusinessInterestModal.jsx#L26) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L15).
- **Lo usa** [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L382) (renderiza).

#### [`MobileCongratsModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L18) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`MobileCongratsModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileCongratsModal.jsx#L11) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L18).
- **Lo usa** [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L398) (renderiza).

#### [`MobileInvitationModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L19) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`MobileInvitationModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileInvitationModal.jsx#L5) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L19).
- **Lo usa** [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L385) (renderiza).

#### [`MobilePlatformModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L20) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`MobilePlatformModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobilePlatformModal.jsx#L10) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L20).
- **Lo usa** [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L392) (renderiza).

#### [`MobileWhoWeAreModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L21) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`MobileWhoWeAreModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWhoWeAreModal.jsx#L10) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L21).
- **Lo usa** [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L395) (renderiza).

#### [`MobileContactSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L22) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`MobileContactSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileContactSection.jsx#L5) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L22).
- **Lo usa** [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L358) (renderiza).

#### [`MobileFooterSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L23) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`MobileFooterSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L10) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L23).
- **Lo usa** [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L371) (renderiza).

#### [`MobileWaitlistStepsSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L24) · cargador diferido

Carga el módulo de la vista mediante React.lazy cuando el router o el componente necesita montarla.

- **Usa código de** [`MobileWaitlistStepsSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistStepsSection.jsx#L9) (carga diferida).
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L24).
- **Lo usa** [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L336) (renderiza).

#### [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26) · componente React · exportación por defecto

Monta `MobileHeroSection`, `DeferredRender`, `MobilePhoneSection`, `MobileWaitlistStepsSection`, `MobileBottomBackground`, `MobileWaitlistSection`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[activeModal, setActiveModal] mediante useState`, `[businessModalSurface, setBusinessModalSurface] mediante useState`, `[congratsReferralLink, setCongratsReferralLink] mediante useState`, `[isHeroSectionReady, setIsHeroSectionReady] mediante useState`.
- **Interfaz que monta** `MobileHeroSection`, `DeferredRender`, `MobilePhoneSection`, `MobileWaitlistStepsSection`, `MobileBottomBackground`, `MobileWaitlistSection`, `MobileContactSection`, `MobileFooterSection`, `Suspense`, `MobileBusinessInterestModal`, `MobileInvitationModal`, `MobilePlatformModal`, `MobileWhoWeAreModal`, `MobileCongratsModal`.
- **Hooks que llama** `useState`, `useNavigate`, `useId`, `usePrelaunchPageTracking`, `useLandingLeadCapture`.
- **Efectos y APIs** `replace`.
- **Usa código de** [`usePrelaunchPageTracking`](../../../apps/prelaunch/src/observability/usePrelaunchPageTracking.js#L12) (llama), [`useLandingLeadCapture`](../../../apps/prelaunch/src/landing-logic/useLandingLeadCapture.js#L17) (llama), [`MobileHeroSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L12) (renderiza), [`DeferredRender`](../../../apps/prelaunch/src/performance/DeferredRender.jsx#L13) (renderiza), [`MobilePhoneSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobilePhoneSection.jsx#L4) (renderiza), [`MobileBottomBackground`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileBottomBackground.jsx#L12) (renderiza), [`MobileWaitlistSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistSection.jsx#L8) (renderiza).
- **Llamadas directas en el cuerpo** [`replace`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L32).
- **Lo usa** [`WaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx#L39) (carga diferida).

#### [`trackedSections`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L35) · cálculo memorizado · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Emite o envía `ed Sections` en el flujo del archivo.

- **Retorno visible o tipo declarado** `lista`.
- **Hooks que llama** `useMemo`.
- **Lo usa** [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L83) (referencia).

#### [`handleScrollToWaitlist`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L96) · función · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Maneja `Scroll To Waitlist` y coordina las acciones indicadas abajo.

- **Entradas** `surface = valor por defecto`.
- **Usa código de** [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L56) (llama), [`scrollToSection`](../../../apps/prelaunch/src/waitlist-landing/scrollToSection.js#L1) (llama).
- **Llamadas directas en el cuerpo** [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L97), [`scrollToSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L106).
- **Lo usa** [`handleInvitationPrimaryAction`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L237) (llama), [`MobileHeroSection.onWaitlistClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L317) (llama).

#### [`handleHowItWorksClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L109) · función · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Atiende `MobileHeroSection.onHowItWorksClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `MobileHeroSection.onHowItWorksClick`.
- **Llamadas directas en el cuerpo** [`trackLinkClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L110).
- **Lo usa** [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L315) (pasa a onHowItWorksClick).

#### [`openBusinessModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L119) · función · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Inicia `Business Modal` y prepara sus dependencias.

- **Entradas** `surface = valor por defecto`.
- **Actualizaciones de estado o acciones** `setBusinessModalSurface`, `setActiveModal`.
- **Usa código de** [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L56) (llama).
- **Llamadas directas en el cuerpo** [`setBusinessModalSurface`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L120), [`setActiveModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L121), [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L122), [`trackModalView`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L130).
- **Lo usa** [`MobileHeroSection.onBusinessClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L313) (llama), [`MobileFooterSection.onBusinessClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L372) (llama).

#### [`closeBusinessModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L136) · función · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Finaliza `Business Modal` y ajusta el estado que depende de esa operación.

- **Entradas** `reason = valor por defecto`.
- **Actualizaciones de estado o acciones** `setActiveModal`, `setBusinessModalSurface`.
- **Usa código de** [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L56) (llama).
- **Llamadas directas en el cuerpo** [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L137), [`trackModalClose`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L146), [`setActiveModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L151), [`setBusinessModalSurface`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L152).
- **Lo usa** [`MobileBusinessInterestModal.onClose`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L382) (llama).

#### [`openInvitationModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L155) · función · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Atiende `MobileHeroSection.onInvitationClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `MobileHeroSection.onInvitationClick`.
- **Actualizaciones de estado o acciones** `setActiveModal`.
- **Llamadas directas en el cuerpo** [`setActiveModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L156), [`trackModalView`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L157).
- **Lo usa** [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L316) (pasa a onInvitationClick).

#### [`closeInvitationModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L163) · función · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Finaliza `Invitation Modal` y ajusta el estado que depende de esa operación.

- **Entradas** `reason = valor por defecto`.
- **Actualizaciones de estado o acciones** `setActiveModal`.
- **Llamadas directas en el cuerpo** [`trackModalClose`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L164), [`setActiveModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L169).
- **Lo usa** [`handleInvitationPrimaryAction`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L236) (llama), [`MobileInvitationModal.onClose`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L387) (llama).

#### [`openPlatformModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L172) · función · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Atiende `MobileFooterSection.onPlatformClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `MobileFooterSection.onPlatformClick`.
- **Actualizaciones de estado o acciones** `setActiveModal`.
- **Llamadas directas en el cuerpo** [`setActiveModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L173), [`trackModalView`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L174).
- **Lo usa** [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L374) (pasa a onPlatformClick).

#### [`closePlatformModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L180) · función · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Finaliza `Platform Modal` y ajusta el estado que depende de esa operación.

- **Entradas** `reason = valor por defecto`.
- **Actualizaciones de estado o acciones** `setActiveModal`.
- **Llamadas directas en el cuerpo** [`trackModalClose`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L181), [`setActiveModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L186).
- **Lo usa** [`MobilePlatformModal.onClose`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L392) (llama).

#### [`openTeamModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L189) · función · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Atiende `MobileFooterSection.onWhoWeAreClick` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `MobileFooterSection.onWhoWeAreClick`.
- **Actualizaciones de estado o acciones** `setActiveModal`.
- **Llamadas directas en el cuerpo** [`setActiveModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L190), [`trackModalView`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L191).
- **Lo usa** [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L375) (pasa a onWhoWeAreClick).

#### [`closeTeamModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L197) · función · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Finaliza `Team Modal` y ajusta el estado que depende de esa operación.

- **Entradas** `reason = valor por defecto`.
- **Actualizaciones de estado o acciones** `setActiveModal`.
- **Llamadas directas en el cuerpo** [`trackModalClose`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L198), [`setActiveModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L203).
- **Lo usa** [`MobileWhoWeAreModal.onClose`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L395) (llama).

#### [`handleWaitlistSubmit`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L206) · función · asíncrona · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Atiende `MobileWaitlistSection.onSubmit` y aplica la acción vinculada a ese control.

- **Entradas** `event`.
- **Recibe eventos de** `MobileWaitlistSection.onSubmit`.
- **Actualizaciones de estado o acciones** `setCongratsReferralLink`, `setActiveModal`.
- **Condiciones que evalúa** `ausencia de result.ok`.
- **Usa código de** [`buildAbsoluteReferralLink`](../../../apps/prelaunch/src/waitlist/referralLinks.js#L10) (llama).
- **Llamadas directas en el cuerpo** [`event.preventDefault`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L207), [`waitlistCapture.submit`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L208), [`setCongratsReferralLink`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L213), [`buildAbsoluteReferralLink`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L214), [`waitlistCapture.clear`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L216), [`setActiveModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L217), [`trackModalView`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L218).
- **Lo usa** [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L351) (pasa a onSubmit).

#### [`handleCloseCongrats`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L224) · función · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Atiende `MobileCongratsModal.onClose` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `MobileCongratsModal.onClose`.
- **Actualizaciones de estado o acciones** `setActiveModal`, `setCongratsReferralLink`.
- **Llamadas directas en el cuerpo** [`trackModalClose`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L225), [`setActiveModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L230), [`setCongratsReferralLink`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L231), [`waitlistCapture.clear`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L232).
- **Lo usa** [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L400) (pasa a onClose).

#### [`handleInvitationPrimaryAction`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L235) · función · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Atiende `MobileInvitationModal.onPrimaryAction` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `MobileInvitationModal.onPrimaryAction`.
- **Llamadas directas en el cuerpo** [`closeInvitationModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L236), [`handleScrollToWaitlist`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L237).
- **Lo usa** [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L388) (pasa a onPrimaryAction).

#### [`handleFeedbackOpen`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L240) · función · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Atiende `MobileContactSection.onFeedbackClick` y aplica la acción vinculada a ese control.

- **Entradas** `prefill = valor por defecto`.
- **Recibe eventos de** `MobileContactSection.onFeedbackClick`.
- **Efectos y APIs** `navigate`.
- **Usa código de** [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L56) (llama).
- **Llamadas directas en el cuerpo** [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L241), [`navigate`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L249).
- **Lo usa** [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L359) (pasa a onFeedbackClick).

#### [`handleHelpOpen`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L259) · función · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Maneja `Help Open` y coordina las acciones indicadas abajo.

- **Entradas** `surface = valor por defecto`.
- **Efectos y APIs** `navigate`.
- **Condiciones que evalúa** `surface`.
- **Usa código de** [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L56) (llama).
- **Llamadas directas en el cuerpo** [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L260), [`trackLinkClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L269), [`navigate`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L277).
- **Lo usa** [`MobileHeroSection.onHelpClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L314) (llama), [`MobileContactSection.onHelpClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L360) (llama).

#### [`handleLandingLinkClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L280) · función · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Atiende `MobileContactSection.onLinkClick`, `MobileFooterSection.onLinkClick` y aplica la acción vinculada a ese control.

- **Entradas** `payload`.
- **Recibe eventos de** `MobileContactSection.onLinkClick`, `MobileFooterSection.onLinkClick`.
- **Llamadas directas en el cuerpo** [`trackLinkClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L281).
- **Lo usa** [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L361) (pasa a onLinkClick).

#### [`handleCopyReferralLink`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L284) · función · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Atiende `MobileCongratsModal.onCopyLink` y aplica la acción vinculada a ese control.

- **Recibe eventos de** `MobileCongratsModal.onCopyLink`.
- **Usa código de** [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/services/prelaunchSystem.js#L56) (llama).
- **Llamadas directas en el cuerpo** [`ingestPrelaunchEvent`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L285).
- **Lo usa** [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L401) (pasa a onCopyLink).

#### [`handleShareReferralLink`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L295) · función · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Atiende `MobileCongratsModal.onShareLink` y aplica la acción vinculada a ese control.

- **Entradas** `channel`, `targetUrl`.
- **Recibe eventos de** `MobileCongratsModal.onShareLink`.
- **Llamadas directas en el cuerpo** [`trackLinkClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L296).
- **Lo usa** [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L402) (pasa a onShareLink).

#### [`MobileHeroSection.onBusinessClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L313) · callback JSX · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Responde al evento de interfaz `MobileHeroSection.onBusinessClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openBusinessModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L313).

#### [`MobileHeroSection.onHelpClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L314) · callback JSX · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Responde al evento de interfaz `MobileHeroSection.onHelpClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleHelpOpen`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L314).

#### [`MobileHeroSection.onWaitlistClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L317) · callback JSX · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Responde al evento de interfaz `MobileHeroSection.onWaitlistClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleScrollToWaitlist`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L317).

#### [`MobileContactSection.onHelpClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L360) · callback JSX · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Responde al evento de interfaz `MobileContactSection.onHelpClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleHelpOpen`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L360).

#### [`MobileFooterSection.onBusinessClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L372) · callback JSX · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Responde al evento de interfaz `MobileFooterSection.onBusinessClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`openBusinessModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L372).

#### [`MobileBusinessInterestModal.onClose`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L382) · callback JSX · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Responde al evento de interfaz `MobileBusinessInterestModal.onClose`. La lógica ocurre al interactuar con ese control.

- **Entradas** `reason`.
- **Llamadas directas en el cuerpo** [`closeBusinessModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L382).

#### [`MobileInvitationModal.onClose`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L387) · callback JSX · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Responde al evento de interfaz `MobileInvitationModal.onClose`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`closeInvitationModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L387).

#### [`MobilePlatformModal.onClose`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L392) · callback JSX · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Responde al evento de interfaz `MobilePlatformModal.onClose`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`closePlatformModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L392).

#### [`MobileWhoWeAreModal.onClose`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L395) · callback JSX · dentro de [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26)

Responde al evento de interfaz `MobileWhoWeAreModal.onClose`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`closeTeamModal`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L395).

### [`apps/prelaunch/src/waitlist-landing/mobile/sections/MobileContactSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileContactSection.jsx#L1)

Agrupa la invitación a contactar y la acción de feedback en la composición móvil.

**Superficie que exporta.** [`MobileContactSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileContactSection.jsx#L5).

**Módulos que lo cargan.** [`MobileWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L22) (carga diferida).

**Dependencias del archivo.** [`../../../observability/PrelaunchCheckpoint`](../../../apps/prelaunch/src/observability/PrelaunchCheckpoint.jsx), [`../components/MobileContactForm`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx).

#### [`MobileContactSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileContactSection.jsx#L5) · componente React · exportación por defecto

Monta `PrelaunchCheckpoint`, `MobileContactForm`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onFeedbackClick, onHelpClick, onLinkClick}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `PrelaunchCheckpoint`, `MobileContactForm`.
- **Usa código de** [`PrelaunchCheckpoint`](../../../apps/prelaunch/src/observability/PrelaunchCheckpoint.jsx#L1) (renderiza), [`MobileContactForm`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileContactForm.jsx#L4) (renderiza).
- **Lo usa** [`MobileContactSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L22) (carga diferida).

### [`apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L1)

Compone el cierre y navega a acciones de ayuda y modales mediante callbacks del contenedor.

**Superficie que exporta.** [`MobileFooterSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L10).

**Módulos que lo cargan.** [`MobileWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L23) (carga diferida).

**Dependencias del archivo.** `react`, `react-router-dom`, [`../../../observability/PrelaunchCheckpoint`](../../../apps/prelaunch/src/observability/PrelaunchCheckpoint.jsx), [`../../../performance/useSectionAssetsReady`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js), [`../mobileWaitlistLandingContent`](../../../apps/prelaunch/src/waitlist-landing/mobile/mobileWaitlistLandingContent.jsx), [`../components/MobileFooterPanels`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileFooterPanels.jsx), [`../../../assets/logo/go-plip-black-gray.svg`](../../../apps/prelaunch/src/assets/logo/go-plip-black-gray.svg).

#### [`MobileFooterSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L10) · componente React · exportación por defecto

Monta `PrelaunchCheckpoint`, `MobileFooterPanels`, `img`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onBusinessClick, onLinkClick, onPlatformClick, onWhoWeAreClick}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `sectionRef mediante useRef`.
- **Interfaz que monta** `PrelaunchCheckpoint`, `MobileFooterPanels`, `img`, `button`.
- **Hooks que llama** `useNavigate`, `useRef`, `useSectionAssetsReady`.
- **Usa código de** [`useSectionAssetsReady`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L34) (llama), [`PrelaunchCheckpoint`](../../../apps/prelaunch/src/observability/PrelaunchCheckpoint.jsx#L1) (renderiza), [`MobileFooterPanels`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileFooterPanels.jsx#L1) (renderiza), [`footerPanels`](../../../apps/prelaunch/src/waitlist-landing/mobile/mobileWaitlistLandingContent.jsx#L80) (pasa a panels), [`footerLogo`](../../../apps/prelaunch/src/assets/logo/go-plip-black-gray.svg) (pasa a src).
- **Lo usa** [`MobileFooterSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L23) (carga diferida).

#### [`trackAndNavigate`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L20) · función · dentro de [`MobileFooterSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L10)

Emite o envía `And Navigate` en el flujo del archivo.

- **Entradas** `{linkId, targetPath, surface, label}`.
- **Efectos y APIs** `navigate`.
- **Llamadas directas en el cuerpo** [`onLinkClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L21), [`navigate`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L28).
- **Lo usa** [`handleFooterPanelClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L33) (llama), [`button.onClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L97) (llama), [`button.onClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L110) (llama).

#### [`handleFooterPanelClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L31) · función · dentro de [`MobileFooterSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L10)

Atiende `MobileFooterPanels.onPanelClick` y aplica la acción vinculada a ese control.

- **Entradas** `panelKey`.
- **Recibe eventos de** `MobileFooterPanels.onPanelClick`.
- **Condiciones que evalúa** `panelKey`.
- **Llamadas directas en el cuerpo** [`trackAndNavigate`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L33), [`onBusinessClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L43), [`onPlatformClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L48), [`onWhoWeAreClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L53).
- **Lo usa** [`MobileFooterSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L76) (pasa a onPanelClick).

#### [`button.onClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L96) · callback JSX · dentro de [`MobileFooterSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L10)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`trackAndNavigate`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L97).

#### [`button.onClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L109) · callback JSX · dentro de [`MobileFooterSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L10)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`trackAndNavigate`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L110).

### [`apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L1)

Compone el primer bloque móvil, navegación y elementos de invitación o captura.

**Superficie que exporta.** [`MobileHeroSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L12).

**Módulos que lo cargan.** [`MobileWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L12) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, [`../../../observability/PrelaunchCheckpoint`](../../../apps/prelaunch/src/observability/PrelaunchCheckpoint.jsx), [`../../../performance/useSectionAssetsReady`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js), [`../../scrollToSection`](../../../apps/prelaunch/src/waitlist-landing/scrollToSection.js), [`../components/MobileHeroBackground`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileHeroBackground.jsx), [`../components/MobilePhoneSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobilePhoneSection.jsx), [`../../../assets/landing/hero/nothing-phone-2a-optimized.webp`](../../../apps/prelaunch/src/assets/landing/hero/nothing-phone-2a-optimized.webp), [`../../../assets/logo/go-plip-white-lila.svg`](../../../apps/prelaunch/src/assets/logo/go-plip-white-lila.svg), [`../../../assets/logo/go-plip-dark-light-purple.svg`](../../../apps/prelaunch/src/assets/logo/go-plip-dark-light-purple.svg).

#### [`MobileHeroSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L12) · componente React · exportación por defecto

Monta `PrelaunchCheckpoint`, `MobileHeroBackground`, `img`, `button`, `MobilePhoneSection`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onAssetsReadyChange, onBusinessClick, onHelpClick, onHowItWorksClick, onInvitationClick, onWaitlistClick}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[isMenuOpen, setIsMenuOpen] mediante useState`, `sectionRef mediante useRef`.
- **Interfaz que monta** `PrelaunchCheckpoint`, `MobileHeroBackground`, `img`, `button`, `MobilePhoneSection`.
- **Hooks que llama** `useState`, `useId`, `useNavigate`, `useRef`, `useSectionAssetsReady`, `useEffect`.
- **Usa código de** [`useSectionAssetsReady`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L34) (llama), [`phoneMockup`](../../../apps/prelaunch/src/assets/landing/hero/nothing-phone-2a-optimized.webp) (referencia), [`PrelaunchCheckpoint`](../../../apps/prelaunch/src/observability/PrelaunchCheckpoint.jsx#L1) (renderiza), [`MobileHeroBackground`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileHeroBackground.jsx#L11) (renderiza), [`headerLogo`](../../../apps/prelaunch/src/assets/logo/go-plip-white-lila.svg) (pasa a src), [`drawerLogo`](../../../apps/prelaunch/src/assets/logo/go-plip-dark-light-purple.svg) (pasa a src), [`MobilePhoneSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobilePhoneSection.jsx#L4) (renderiza).
- **Llamadas directas en el cuerpo** [`join`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L92), [`filter`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L92).
- **Lo usa** [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L311) (renderiza).

#### [`useEffect · callback`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L26) · callback de infraestructura · dentro de [`MobileHeroSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L12)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `MobileHeroSection`.

- **Efectos y APIs** `window.addEventListener`, `window.removeEventListener`.
- **Condiciones que evalúa** `ausencia de isMenuOpen`.
- **Llamadas directas en el cuerpo** [`window.addEventListener`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L40), [`window.removeEventListener`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L43).

#### [`handleKeyDown`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L34) · función · dentro de [`useEffect · callback`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L26)

Maneja `Key Down` y coordina las acciones indicadas abajo.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setIsMenuOpen`.
- **Condiciones que evalúa** `event.key`.
- **Llamadas directas en el cuerpo** [`setIsMenuOpen`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L36).
- **Lo usa** [`useEffect · callback`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L40) (referencia).

#### [`useEffect · callback`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L47) · callback de infraestructura · dentro de [`MobileHeroSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L12)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `MobileHeroSection`.

- **Llamadas directas en el cuerpo** [`onAssetsReadyChange`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L48).

#### [`handleMenuAction`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L51) · función · dentro de [`MobileHeroSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L12)

Maneja `Menu Action` y coordina las acciones indicadas abajo.

- **Entradas** `callback`.
- **Actualizaciones de estado o acciones** `setIsMenuOpen`.
- **Efectos y APIs** `window.setTimeout`.
- **Llamadas directas en el cuerpo** [`setIsMenuOpen`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L52), [`window.setTimeout`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L53).
- **Lo usa** [`button.onClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L129) (llama), [`button.onClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L144) (llama), [`button.onClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L152) (llama).

#### [`button.onClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L81) · callback JSX · dentro de [`MobileHeroSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L12)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setIsMenuOpen`.
- **Llamadas directas en el cuerpo** [`setIsMenuOpen`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L81).

#### [`button.onClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L98) · callback JSX · dentro de [`MobileHeroSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L12)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setIsMenuOpen`.
- **Llamadas directas en el cuerpo** [`setIsMenuOpen`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L98).

#### [`button.onClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L117) · callback JSX · dentro de [`MobileHeroSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L12)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setIsMenuOpen`.
- **Llamadas directas en el cuerpo** [`setIsMenuOpen`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L117).

#### [`button.onClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L128) · callback JSX · dentro de [`MobileHeroSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L12)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Efectos y APIs** `navigate`.
- **Condiciones que evalúa** `onHelpClick`.
- **Llamadas directas en el cuerpo** [`handleMenuAction`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L129), [`onHelpClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L131), [`navigate`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L134).

#### [`button.onClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L144) · callback JSX · dentro de [`MobileHeroSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L12)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleMenuAction`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L144).

#### [`button.onClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L152) · callback JSX · dentro de [`MobileHeroSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L12)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Llamadas directas en el cuerpo** [`handleMenuAction`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L152).

#### [`button.onClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L189) · callback JSX · dentro de [`MobileHeroSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L12)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Condiciones que evalúa** `onWaitlistClick`.
- **Usa código de** [`scrollToSection`](../../../apps/prelaunch/src/waitlist-landing/scrollToSection.js#L1) (llama).
- **Llamadas directas en el cuerpo** [`onWaitlistClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L191), [`scrollToSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L194).

#### [`button.onClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L204) · callback JSX · dentro de [`MobileHeroSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L12)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`scrollToSection`](../../../apps/prelaunch/src/waitlist-landing/scrollToSection.js#L1) (llama).
- **Llamadas directas en el cuerpo** [`onHowItWorksClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L205), [`scrollToSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L206).

### [`apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistSection.jsx#L1)

Presenta captura móvil, conecta formulario y deriva el resultado al nivel de página.

**Superficie que exporta.** [`MobileWaitlistSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistSection.jsx#L8).

**Módulos que lo cargan.** [`MobileWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L13) (importa).

**Dependencias del archivo.** `react`, [`../../../observability/PrelaunchCheckpoint`](../../../apps/prelaunch/src/observability/PrelaunchCheckpoint.jsx), [`../../../performance/useSectionAssetsReady`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js), [`../components/MobileMockupSteps`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileMockupSteps.jsx), [`../components/MobileWaitlistForm`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWaitlistForm.jsx).

#### [`MobileWaitlistSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistSection.jsx#L8) · componente React · exportación por defecto

Monta `PrelaunchCheckpoint`, `MobileWaitlistForm`, `MobileMockupSteps`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{email, honeypot, status, errorMessage, onEmailChange, onHoneypotChange, onSubmit}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `sectionRef mediante useRef`.
- **Interfaz que monta** `PrelaunchCheckpoint`, `MobileWaitlistForm`, `MobileMockupSteps`.
- **Hooks que llama** `useRef`, `useSectionAssetsReady`.
- **Usa código de** [`useSectionAssetsReady`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L34) (llama), [`PrelaunchCheckpoint`](../../../apps/prelaunch/src/observability/PrelaunchCheckpoint.jsx#L1) (renderiza), [`MobileWaitlistForm`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileWaitlistForm.jsx#L6) (renderiza), [`MobileMockupSteps`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileMockupSteps.jsx#L3) (renderiza).
- **Lo usa** [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L344) (renderiza).

### [`apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistStepsSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistStepsSection.jsx#L1)

Compone la explicación de pasos para mobile y la coordina con sus recursos.

**Superficie que exporta.** [`MobileWaitlistStepsSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistStepsSection.jsx#L9).

**Módulos que lo cargan.** [`MobileWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L24) (carga diferida).

**Dependencias del archivo.** `react`, [`../../../observability/PrelaunchCheckpoint`](../../../apps/prelaunch/src/observability/PrelaunchCheckpoint.jsx), [`../../../performance/useSectionAssetsReady`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js), [`../mobileWaitlistLandingContent`](../../../apps/prelaunch/src/waitlist-landing/mobile/mobileWaitlistLandingContent.jsx), [`../components/MobilePhoneSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobilePhoneSection.jsx), [`../components/MobileStepCard`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileStepCard.jsx).

#### [`MobileWaitlistStepsSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistStepsSection.jsx#L9) · componente React · exportación por defecto

Monta `PrelaunchCheckpoint`, `MobilePhoneSection`, `MobileStepCard`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `aboutBlockRef mediante useRef`.
- **Interfaz que monta** `PrelaunchCheckpoint`, `MobilePhoneSection`, `MobileStepCard`.
- **Hooks que llama** `useRef`, `useSectionAssetsReady`.
- **Usa código de** [`useSectionAssetsReady`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L34) (llama), [`PrelaunchCheckpoint`](../../../apps/prelaunch/src/observability/PrelaunchCheckpoint.jsx#L1) (renderiza), [`MobilePhoneSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobilePhoneSection.jsx#L4) (renderiza), [`steps`](../../../apps/prelaunch/src/waitlist-landing/mobile/mobileWaitlistLandingContent.jsx#L8) (accede al módulo), [`MobileStepCard`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileStepCard.jsx#L1) (renderiza).
- **Llamadas directas en el cuerpo** [`steps.map`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistStepsSection.jsx#L40).
- **Lo usa** [`MobileWaitlistStepsSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L24) (carga diferida).

### [`apps/prelaunch/src/waitlist-landing/scrollToSection.js`](../../../apps/prelaunch/src/waitlist-landing/scrollToSection.js#L1)

Helper para llevar la vista a una sección por identificador. Se invoca desde acciones dentro de la landing.

**Superficie que exporta.** [`scrollToSection`](../../../apps/prelaunch/src/waitlist-landing/scrollToSection.js#L1).

**Módulos que lo cargan.** [`DesktopWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/desktop/DesktopWaitlistLandingPage.jsx#L8) (importa), [`DesktopNavigationHeader.jsx`](../../../apps/prelaunch/src/waitlist-landing/desktop/components/DesktopNavigationHeader.jsx#L3) (importa), [`DesktopHeroSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/desktop/sections/DesktopHeroSection.jsx#L3) (importa), [`MobileWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L8) (importa), [`MobileHeroSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L5) (importa).

#### [`scrollToSection`](../../../apps/prelaunch/src/waitlist-landing/scrollToSection.js#L1) · función · exportado

Implementa `scroll To Section` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `sectionId`.
- **Condiciones que evalúa** `undefined`, `ausencia de section`.
- **Llamadas directas en el cuerpo** [`document.getElementById`](../../../apps/prelaunch/src/waitlist-landing/scrollToSection.js#L6), [`section.scrollIntoView`](../../../apps/prelaunch/src/waitlist-landing/scrollToSection.js#L11).
- **Lo usa** [`handleScrollToWaitlist`](../../../apps/prelaunch/src/waitlist-landing/desktop/DesktopWaitlistLandingPage.jsx#L95) (llama), [`handleScroll`](../../../apps/prelaunch/src/waitlist-landing/desktop/components/DesktopNavigationHeader.jsx#L19) (llama), [`button.onClick`](../../../apps/prelaunch/src/waitlist-landing/desktop/sections/DesktopHeroSection.jsx#L87) (llama), [`handleScrollToWaitlist`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L106) (llama), [`button.onClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L194) (llama), [`button.onClick`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L206) (llama).

### [`apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx#L1)

Entrada de la landing raíz. Selecciona el árbol y maneja el scroll a hashes al entrar o al cambiar la ubicación.

**Superficie que exporta.** [`WaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx#L5).

**Módulos que lo cargan.** [`main.jsx`](../../../apps/prelaunch/src/main.jsx#L7) (importa).

**Dependencias del archivo.** `react`, [`../UI-detect/AdaptiveRoute`](../../../apps/prelaunch/src/UI-detect/AdaptiveRoute.jsx).

#### [`WaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx#L5) · componente React · exportación por defecto

Monta `AdaptiveRoute`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `AdaptiveRoute`.
- **Hooks que llama** `useEffect`.
- **Usa código de** [`DesktopWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/desktop/DesktopWaitlistLandingPage.jsx#L24) (carga diferida), [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L26) (carga diferida), [`AdaptiveRoute`](../../../apps/prelaunch/src/UI-detect/AdaptiveRoute.jsx#L4) (renderiza).
- **Lo usa** [`main.jsx`](../../../apps/prelaunch/src/main.jsx#L50) (renderiza).

#### [`useEffect · callback`](../../../apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx#L6) · callback de infraestructura · dentro de [`WaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx#L5)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `WaitlistLandingPage`.

- **Efectos y APIs** `window.addEventListener`, `window.removeEventListener`.
- **Condiciones que evalúa** `undefined`.
- **Llamadas directas en el cuerpo** [`scrollToHashTarget`](../../../apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx#L28), [`window.addEventListener`](../../../apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx#L29), [`window.removeEventListener`](../../../apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx#L32).

#### [`scrollToHashTarget`](../../../apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx#L11) · función · dentro de [`useEffect · callback`](../../../apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx#L6)

Función auxiliar de `useEffect · callback` para `scroll To Hash Target`.

- **Efectos y APIs** `requestAnimationFrame`.
- **Condiciones que evalúa** `ausencia de hash`, `ausencia de section`.
- **Llamadas directas en el cuerpo** [`decodeURIComponent`](../../../apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx#L17), [`hash.slice`](../../../apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx#L17), [`requestAnimationFrame`](../../../apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx#L18), [`document.getElementById`](../../../apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx#L19), [`section.scrollIntoView`](../../../apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx#L24).
- **Lo usa** [`useEffect · callback`](../../../apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx#L28) (llama).
