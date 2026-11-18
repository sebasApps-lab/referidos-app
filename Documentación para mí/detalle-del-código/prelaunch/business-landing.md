# Prelaunch · Landing comercial

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/prelaunch/src/business-landing/BusinessLandingPage.jsx`](../../../apps/prelaunch/src/business-landing/BusinessLandingPage.jsx#L1)
- [`apps/prelaunch/src/business-landing/desktop/components/DesktopFooterColumns.jsx`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopFooterColumns.jsx#L1)
- [`apps/prelaunch/src/business-landing/desktop/components/DesktopHeroBackground.jsx`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopHeroBackground.jsx#L1)
- [`apps/prelaunch/src/business-landing/desktop/components/DesktopHeroPhoneShowcase.jsx`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopHeroPhoneShowcase.jsx#L1)
- [`apps/prelaunch/src/business-landing/desktop/components/DesktopHeroShadowGroup.jsx`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopHeroShadowGroup.jsx#L1)
- [`apps/prelaunch/src/business-landing/desktop/components/DesktopMockupSteps.jsx`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopMockupSteps.jsx#L1)
- [`apps/prelaunch/src/business-landing/desktop/components/DesktopNavigationHeader.jsx`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopNavigationHeader.jsx#L1)
- [`apps/prelaunch/src/business-landing/desktop/components/DesktopSignupCard.jsx`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopSignupCard.jsx#L1)
- [`apps/prelaunch/src/business-landing/desktop/components/DesktopSignupProviderButton.jsx`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopSignupProviderButton.jsx#L1)
- [`apps/prelaunch/src/business-landing/desktop/components/DesktopStepCard.jsx`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopStepCard.jsx#L1)
- [`apps/prelaunch/src/business-landing/desktop/components/DesktopWaitlistForm.jsx`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopWaitlistForm.jsx#L1)
- [`apps/prelaunch/src/business-landing/desktop/desktopWaitlistLandingContent.jsx`](../../../apps/prelaunch/src/business-landing/desktop/desktopWaitlistLandingContent.jsx#L1)
- [`apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L1)
- [`apps/prelaunch/src/business-landing/desktop/sections/DesktopBusinessPromoSection.jsx`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopBusinessPromoSection.jsx#L1)
- [`apps/prelaunch/src/business-landing/desktop/sections/DesktopFooterSection.jsx`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopFooterSection.jsx#L1)
- [`apps/prelaunch/src/business-landing/desktop/sections/DesktopHeroSection.jsx`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopHeroSection.jsx#L1)
- [`apps/prelaunch/src/business-landing/desktop/sections/DesktopWaitlistSection.jsx`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopWaitlistSection.jsx#L1)
- [`apps/prelaunch/src/business-landing/desktop/sections/DesktopWaitlistStepsSection.jsx`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopWaitlistStepsSection.jsx#L1)
- [`apps/prelaunch/src/business-landing/mobile/MobileBusinessLandingPage.jsx`](../../../apps/prelaunch/src/business-landing/mobile/MobileBusinessLandingPage.jsx#L1)
- [`apps/prelaunch/src/business-landing/scrollToSection.js`](../../../apps/prelaunch/src/business-landing/scrollToSection.js#L1)

## Símbolos y conexiones

### [`apps/prelaunch/src/business-landing/BusinessLandingPage.jsx`](../../../apps/prelaunch/src/business-landing/BusinessLandingPage.jsx#L1)

Elige la vista comercial mediante AdaptiveRoute. El router raíz decide que se registre solo en dev.

**Superficie que exporta.** [`BusinessLandingPage`](../../../apps/prelaunch/src/business-landing/BusinessLandingPage.jsx#L4).

**Módulos que lo cargan.** [`main.jsx`](../../../apps/prelaunch/src/main.jsx#L15) (carga diferida).

**Dependencias del archivo.** [`../UI-detect/AdaptiveRoute`](../../../apps/prelaunch/src/UI-detect/AdaptiveRoute.jsx).

#### [`BusinessLandingPage`](../../../apps/prelaunch/src/business-landing/BusinessLandingPage.jsx#L4) · componente React · exportación por defecto

Monta `AdaptiveRoute`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `AdaptiveRoute`.
- **Usa código de** [`DesktopWaitlistLandingPage`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L24) (carga diferida), [`MobileBusinessLandingPage`](../../../apps/prelaunch/src/business-landing/mobile/MobileBusinessLandingPage.jsx#L3) (carga diferida), [`AdaptiveRoute`](../../../apps/prelaunch/src/UI-detect/AdaptiveRoute.jsx#L4) (renderiza).
- **Lo usa** [`BusinessLandingPage`](../../../apps/prelaunch/src/main.jsx#L15) (carga diferida).

### [`apps/prelaunch/src/business-landing/desktop/components/DesktopFooterColumns.jsx`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopFooterColumns.jsx#L1)

Distribuye grupos de navegación y contacto del pie comercial.

**Superficie que exporta.** [`DesktopFooterColumns`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopFooterColumns.jsx#L4).

**Módulos que lo cargan.** [`DesktopFooterSection.jsx`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopFooterSection.jsx#L1) (importa).

**Dependencias del archivo.** `react-router-dom`, [`../desktopWaitlistLandingContent`](../../../apps/prelaunch/src/business-landing/desktop/desktopWaitlistLandingContent.jsx).

#### [`DesktopFooterColumns`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopFooterColumns.jsx#L4) · componente React · exportación por defecto

Monta `Link`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Link`.
- **Usa código de** [`footerColumns`](../../../apps/prelaunch/src/business-landing/desktop/desktopWaitlistLandingContent.jsx#L79) (accede al módulo).
- **Llamadas directas en el cuerpo** [`footerColumns.map`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopFooterColumns.jsx#L7), [`column.links.map`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopFooterColumns.jsx#L11).
- **Lo usa** [`DesktopFooterSection`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopFooterSection.jsx#L29) (renderiza).

### [`apps/prelaunch/src/business-landing/desktop/components/DesktopHeroBackground.jsx`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopHeroBackground.jsx#L1)

Arma fondo y recursos visuales del hero comercial.

**Superficie que exporta.** [`DesktopHeroBackground`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopHeroBackground.jsx#L3).

**Módulos que lo cargan.** [`DesktopHeroSection.jsx`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopHeroSection.jsx#L2) (importa).

**Dependencias del archivo.** `../../../../../assets/dev/business/bg-hero-negocio.png`.

#### [`DesktopHeroBackground`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopHeroBackground.jsx#L3) · componente React · exportación por defecto

Monta `img`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `img`.
- **Lo usa** [`DesktopHeroSection`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopHeroSection.jsx#L8) (renderiza).

### [`apps/prelaunch/src/business-landing/desktop/components/DesktopHeroPhoneShowcase.jsx`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopHeroPhoneShowcase.jsx#L1)

Presenta la maqueta con la que la landing explica el producto a un comercio.

**Superficie que exporta.** [`DesktopHeroPhoneShowcase`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopHeroPhoneShowcase.jsx#L3).

**Módulos que lo cargan.** [`DesktopHeroSection.jsx`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopHeroSection.jsx#L3) (importa).

**Dependencias del archivo.** `../../../../../assets/dev/business/iMac-panel-promos-mockup-BLUE.png`.

#### [`DesktopHeroPhoneShowcase`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopHeroPhoneShowcase.jsx#L3) · componente React · exportación por defecto

Monta `img`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `img`.
- **Lo usa** [`DesktopHeroSection`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopHeroSection.jsx#L35) (renderiza).

### [`apps/prelaunch/src/business-landing/desktop/components/DesktopHeroShadowGroup.jsx`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopHeroShadowGroup.jsx#L1)

Capas de sombra y elementos decorativos del encabezado comercial.

**Superficie que exporta.** [`DesktopHeroShadowGroup`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopHeroShadowGroup.jsx#L6).

**Dependencias del archivo.** `../../../assets/landing/hero/shadow-pink-base.svg`, `../../../assets/landing/hero/shadow-pink-glow.svg`, `../../../assets/landing/hero/shadow-purple-base.svg`, `../../../assets/landing/hero/shadow-purple-glow.svg`.

#### [`DesktopHeroShadowGroup`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopHeroShadowGroup.jsx#L6) · componente React · exportación por defecto

Monta `img`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `img`.

### [`apps/prelaunch/src/business-landing/desktop/components/DesktopMockupSteps.jsx`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopMockupSteps.jsx#L1)

Composición visual que acompaña los pasos para negocio.

**Superficie que exporta.** [`DesktopMockupSteps`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopMockupSteps.jsx#L4).

**Módulos que lo cargan.** [`DesktopWaitlistSection.jsx`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopWaitlistSection.jsx#L1) (importa).

**Dependencias del archivo.** [`../../../assets/landing/bottom/card-carousel-glow-optimized.webp`](../../../apps/prelaunch/src/assets/landing/bottom/card-carousel-glow-optimized.webp), [`../../../assets/landing/bottom/mockup-how-to-use-optimized.webp`](../../../apps/prelaunch/src/assets/landing/bottom/mockup-how-to-use-optimized.webp).

#### [`DesktopMockupSteps`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopMockupSteps.jsx#L4) · componente React · exportación por defecto

Monta `img`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `img`.
- **Usa código de** [`cardCarouselGlow`](../../../apps/prelaunch/src/assets/landing/bottom/card-carousel-glow-optimized.webp) (pasa a src), [`mockupHowToUse`](../../../apps/prelaunch/src/assets/landing/bottom/mockup-how-to-use-optimized.webp) (pasa a src).
- **Lo usa** [`DesktopWaitlistSection`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopWaitlistSection.jsx#L22) (renderiza).

### [`apps/prelaunch/src/business-landing/desktop/components/DesktopNavigationHeader.jsx`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopNavigationHeader.jsx#L1)

Navegación y llamadas a la acción de la página comercial.

**Superficie que exporta.** [`DesktopNavigationHeader`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopNavigationHeader.jsx#L4).

**Módulos que lo cargan.** [`DesktopWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L3) (importa).

**Dependencias del archivo.** [`../../scrollToSection`](../../../apps/prelaunch/src/business-landing/scrollToSection.js), [`../desktopWaitlistLandingContent`](../../../apps/prelaunch/src/business-landing/desktop/desktopWaitlistLandingContent.jsx).

#### [`DesktopNavigationHeader`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopNavigationHeader.jsx#L4) · componente React · exportación por defecto

Monta `button`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`.
- **Usa código de** [`navigationLinks`](../../../apps/prelaunch/src/business-landing/desktop/desktopWaitlistLandingContent.jsx#L8) (accede al módulo).
- **Llamadas directas en el cuerpo** [`navigationLinks.map`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopNavigationHeader.jsx#L21).
- **Lo usa** [`DesktopWaitlistLandingPage`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L46) (renderiza).

#### [`handleScroll`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopNavigationHeader.jsx#L5) · función · dentro de [`DesktopNavigationHeader`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopNavigationHeader.jsx#L4)

Maneja `Scroll` y coordina las acciones indicadas abajo.

- **Entradas** `event`, `targetId`.
- **Usa código de** [`scrollToSection`](../../../apps/prelaunch/src/business-landing/scrollToSection.js#L1) (llama).
- **Llamadas directas en el cuerpo** [`event.preventDefault`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopNavigationHeader.jsx#L6), [`scrollToSection`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopNavigationHeader.jsx#L7).
- **Lo usa** [`a.onClick`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopNavigationHeader.jsx#L27) (llama).

#### [`a.onClick`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopNavigationHeader.jsx#L27) · callback JSX · dentro de [`DesktopNavigationHeader`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopNavigationHeader.jsx#L4)

Responde al evento de interfaz `a.onClick`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Llamadas directas en el cuerpo** [`handleScroll`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopNavigationHeader.jsx#L27).

### [`apps/prelaunch/src/business-landing/desktop/components/DesktopSignupCard.jsx`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopSignupCard.jsx#L1)

Tarjeta de captación de la landing comercial separada del layout de la página.

**Superficie que exporta.** [`DesktopSignupCard`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopSignupCard.jsx#L8).

**Dependencias del archivo.** [`./DesktopSignupProviderButton`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopSignupProviderButton.jsx), [`../../../assets/landing/hero/hero-register-card-line.png`](../../../apps/prelaunch/src/assets/landing/hero/hero-register-card-line.png), [`../../../assets/landing/hero/info-card-BG-optimized.webp`](../../../apps/prelaunch/src/assets/landing/hero/info-card-BG-optimized.webp), [`../../../assets/landing/hero/info-card-glow-optimized.webp`](../../../apps/prelaunch/src/assets/landing/hero/info-card-glow-optimized.webp), [`../../../assets/shared/material-icon-theme-google.svg`](../../../apps/prelaunch/src/assets/shared/material-icon-theme-google.svg), [`../../../assets/support/fluent-color-mail-16.svg`](../../../apps/prelaunch/src/assets/support/fluent-color-mail-16.svg).

#### [`DesktopSignupCard`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopSignupCard.jsx#L8) · componente React · exportación por defecto

Monta `img`, `SignupCardSvg`, `DesktopSignupProviderButton`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `img`, `SignupCardSvg`, `DesktopSignupProviderButton`.
- **Usa código de** [`signUpCardGlow`](../../../apps/prelaunch/src/assets/landing/hero/info-card-glow-optimized.webp) (pasa a src), [`DesktopSignupProviderButton`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopSignupProviderButton.jsx#L1) (renderiza), [`heroRegisterCardLine`](../../../apps/prelaunch/src/assets/landing/hero/hero-register-card-line.png) (pasa a src).

#### [`SignupCardSvg`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopSignupCard.jsx#L51) · componente React

Monta `img`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `img`.
- **Usa código de** [`signUpCardBg`](../../../apps/prelaunch/src/assets/landing/hero/info-card-BG-optimized.webp) (pasa a src).
- **Lo usa** [`DesktopSignupCard`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopSignupCard.jsx#L14) (renderiza).

#### [`GoogleMark`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopSignupCard.jsx#L55) · componente React

Monta `img`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `img`.
- **Usa código de** [`googleIcon`](../../../apps/prelaunch/src/assets/shared/material-icon-theme-google.svg) (pasa a src).
- **Lo usa** [`DesktopSignupCard`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopSignupCard.jsx#L24) (pasa a Icon).

#### [`MailMark`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopSignupCard.jsx#L59) · componente React

Monta `img`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `img`.
- **Usa código de** [`supportMailIcon`](../../../apps/prelaunch/src/assets/support/fluent-color-mail-16.svg) (pasa a src).
- **Lo usa** [`DesktopSignupCard`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopSignupCard.jsx#L30) (pasa a Icon).

### [`apps/prelaunch/src/business-landing/desktop/components/DesktopSignupProviderButton.jsx`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopSignupProviderButton.jsx#L1)

Presenta la acción de proveedor dentro de la tarjeta comercial.

**Superficie que exporta.** [`DesktopSignupProviderButton`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopSignupProviderButton.jsx#L1).

**Módulos que lo cargan.** [`DesktopSignupCard.jsx`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopSignupCard.jsx#L1) (importa).

#### [`DesktopSignupProviderButton`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopSignupProviderButton.jsx#L1) · componente React · exportación por defecto

Monta `button`, `ProviderIcon`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{className, Icon, label}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `ProviderIcon`.
- **Lo usa** [`DesktopSignupCard`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopSignupCard.jsx#L22) (renderiza).

### [`apps/prelaunch/src/business-landing/desktop/components/DesktopStepCard.jsx`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopStepCard.jsx#L1)

Tarjeta individual que muestra uno de los pasos de la propuesta a negocios.

**Superficie que exporta.** [`DesktopStepCard`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopStepCard.jsx#L1).

**Módulos que lo cargan.** [`DesktopWaitlistStepsSection.jsx`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopWaitlistStepsSection.jsx#L2) (importa).

#### [`DesktopStepCard`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopStepCard.jsx#L1) · componente React · exportación por defecto

Monta `img`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{step}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `img`.
- **Lo usa** [`DesktopWaitlistStepsSection`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopWaitlistStepsSection.jsx#L26) (renderiza).

### [`apps/prelaunch/src/business-landing/desktop/components/DesktopWaitlistForm.jsx`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopWaitlistForm.jsx#L1)

Renderiza captura y estados del envío comercial, dentro del árbol separado de la landing principal.

**Superficie que exporta.** [`DesktopWaitlistForm`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopWaitlistForm.jsx#L4).

**Módulos que lo cargan.** [`DesktopWaitlistSection.jsx`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopWaitlistSection.jsx#L2) (importa).

**Dependencias del archivo.** `react-router-dom`, `react`.

#### [`DesktopWaitlistForm`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopWaitlistForm.jsx#L4) · componente React · exportación por defecto

Monta `input`, `button`, `Link`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[email, setEmail] mediante useState`.
- **Interfaz que monta** `input`, `button`, `Link`.
- **Hooks que llama** `useState`.
- **Lo usa** [`DesktopWaitlistSection`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopWaitlistSection.jsx#L18) (renderiza).

#### [`input.onChange`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopWaitlistForm.jsx#L13) · callback JSX · dentro de [`DesktopWaitlistForm`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopWaitlistForm.jsx#L4)

Responde al evento de interfaz `input.onChange`. La lógica ocurre al interactuar con ese control.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setEmail`.
- **Llamadas directas en el cuerpo** [`setEmail`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopWaitlistForm.jsx#L13).

### [`apps/prelaunch/src/business-landing/desktop/desktopWaitlistLandingContent.jsx`](../../../apps/prelaunch/src/business-landing/desktop/desktopWaitlistLandingContent.jsx#L1)

Centraliza datos y textos de los bloques de captación comercial.

**Superficie que exporta.** [`navigationLinks`](../../../apps/prelaunch/src/business-landing/desktop/desktopWaitlistLandingContent.jsx#L8), [`desktopSteps`](../../../apps/prelaunch/src/business-landing/desktop/desktopWaitlistLandingContent.jsx#L13), [`footerColumns`](../../../apps/prelaunch/src/business-landing/desktop/desktopWaitlistLandingContent.jsx#L79).

**Módulos que lo cargan.** [`DesktopFooterColumns.jsx`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopFooterColumns.jsx#L2) (importa), [`DesktopNavigationHeader.jsx`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopNavigationHeader.jsx#L2) (importa), [`DesktopWaitlistStepsSection.jsx`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopWaitlistStepsSection.jsx#L1) (importa).

**Dependencias del archivo.** [`../../assets/landing/steps/coin-optimized.webp`](../../../apps/prelaunch/src/assets/landing/steps/coin-optimized.webp), [`../../assets/landing/steps/gift-optimized.webp`](../../../apps/prelaunch/src/assets/landing/steps/gift-optimized.webp), [`../../assets/landing/steps/mail-optimized.webp`](../../../apps/prelaunch/src/assets/landing/steps/mail-optimized.webp), [`../../assets/landing/steps/n1-blue-optimized.webp`](../../../apps/prelaunch/src/assets/landing/steps/n1-blue-optimized.webp), [`../../assets/landing/steps/n2-purple-optimized.webp`](../../../apps/prelaunch/src/assets/landing/steps/n2-purple-optimized.webp), [`../../assets/landing/steps/n3-cyan-optimized.webp`](../../../apps/prelaunch/src/assets/landing/steps/n3-cyan-optimized.webp).

#### [`navigationLinks`](../../../apps/prelaunch/src/business-landing/desktop/desktopWaitlistLandingContent.jsx#L8) · variable de módulo · exportado

Conserva la lista de `navigation Links` usada por el módulo.

- **Lo usa** [`DesktopNavigationHeader`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopNavigationHeader.jsx#L21) (accede al módulo).

#### [`desktopSteps`](../../../apps/prelaunch/src/business-landing/desktop/desktopWaitlistLandingContent.jsx#L13) · variable de módulo · exportado

Conserva la lista de `desktop Steps` usada por el módulo.

- **Usa código de** [`iconNumber1Blue`](../../../apps/prelaunch/src/assets/landing/steps/n1-blue-optimized.webp) (referencia), [`iconMailBlue`](../../../apps/prelaunch/src/assets/landing/steps/mail-optimized.webp) (referencia), [`iconNumber2Purple`](../../../apps/prelaunch/src/assets/landing/steps/n2-purple-optimized.webp) (referencia), [`iconGift`](../../../apps/prelaunch/src/assets/landing/steps/gift-optimized.webp) (referencia), [`iconNumber3BlueCyan`](../../../apps/prelaunch/src/assets/landing/steps/n3-cyan-optimized.webp) (referencia), [`iconCoins`](../../../apps/prelaunch/src/assets/landing/steps/coin-optimized.webp) (referencia).
- **Lo usa** [`DesktopWaitlistStepsSection`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopWaitlistStepsSection.jsx#L25) (accede al módulo).

#### [`footerColumns`](../../../apps/prelaunch/src/business-landing/desktop/desktopWaitlistLandingContent.jsx#L79) · variable de módulo · exportado

Conserva la lista de `footer Columns` usada por el módulo.

- **Lo usa** [`DesktopFooterColumns`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopFooterColumns.jsx#L7) (accede al módulo).

### [`apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L1)

Orquesta la landing comercial. Conecta navegación, secciones y captación con intención negocio.

**Superficie que exporta.** [`DesktopWaitlistLandingPage`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L24).

**Módulos que lo cargan.** [`BusinessLandingPage.jsx`](../../../apps/prelaunch/src/business-landing/BusinessLandingPage.jsx#L7) (carga diferida), [`MobileBusinessLandingPage.jsx`](../../../apps/prelaunch/src/business-landing/mobile/MobileBusinessLandingPage.jsx#L1) (importa).

**Dependencias del archivo.** `react`, [`./components/DesktopNavigationHeader`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopNavigationHeader.jsx), [`./sections/DesktopFooterSection`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopFooterSection.jsx), [`./sections/DesktopBusinessPromoSection`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopBusinessPromoSection.jsx), [`./sections/DesktopHeroSection`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopHeroSection.jsx).

#### [`getFooterColumnsScale`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L8) · función

Obtiene o resuelve `Footer Columns Scale` para entregarlo al consumidor.

- **Condiciones que evalúa** `undefined`, `window.innerWidth`.
- **Lo usa** [`DesktopWaitlistLandingPage`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L26) (llama), [`handleResize`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L31) (llama).

#### [`DesktopWaitlistLandingPage`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L24) · componente React · exportación por defecto

Monta `DesktopNavigationHeader`, `DesktopHeroSection`, `DesktopBusinessPromoSection`, `DesktopFooterSection`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[footerColumnsScale, setFooterColumnsScale] mediante useState`.
- **Interfaz que monta** `DesktopNavigationHeader`, `DesktopHeroSection`, `DesktopBusinessPromoSection`, `DesktopFooterSection`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`DesktopNavigationHeader`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopNavigationHeader.jsx#L4) (renderiza), [`DesktopHeroSection`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopHeroSection.jsx#L5) (renderiza), [`DesktopBusinessPromoSection`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopBusinessPromoSection.jsx#L4) (renderiza), [`DesktopFooterSection`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopFooterSection.jsx#L3) (renderiza).
- **Llamadas directas en el cuerpo** [`getFooterColumnsScale`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L26).
- **Lo usa** [`BusinessLandingPage`](../../../apps/prelaunch/src/business-landing/BusinessLandingPage.jsx#L7) (carga diferida), [`MobileBusinessLandingPage`](../../../apps/prelaunch/src/business-landing/mobile/MobileBusinessLandingPage.jsx#L4) (renderiza).

#### [`useEffect · callback`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L29) · callback de infraestructura · dentro de [`DesktopWaitlistLandingPage`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L24)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `DesktopWaitlistLandingPage`.

- **Efectos y APIs** `window.addEventListener`, `window.removeEventListener`.
- **Llamadas directas en el cuerpo** [`window.addEventListener`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L34), [`window.removeEventListener`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L35).

#### [`handleResize`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L30) · función · dentro de [`useEffect · callback`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L29)

Maneja `Resize` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setFooterColumnsScale`.
- **Llamadas directas en el cuerpo** [`setFooterColumnsScale`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L31), [`getFooterColumnsScale`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L31).
- **Lo usa** [`useEffect · callback`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L34) (referencia).

### [`apps/prelaunch/src/business-landing/desktop/sections/DesktopBusinessPromoSection.jsx`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopBusinessPromoSection.jsx#L1)

Presenta la propuesta de valor e ilustración de promoción enfocada a comercios.

**Superficie que exporta.** [`DesktopBusinessPromoSection`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopBusinessPromoSection.jsx#L4).

**Módulos que lo cargan.** [`DesktopWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L5) (importa).

**Dependencias del archivo.** [`../../../assets/shared/qr-code.svg`](../../../apps/prelaunch/src/assets/shared/qr-code.svg), [`../../../assets/support/fluent-color-mail-16.svg`](../../../apps/prelaunch/src/assets/support/fluent-color-mail-16.svg).

#### [`DesktopBusinessPromoSection`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopBusinessPromoSection.jsx#L4) · componente React · exportación por defecto

Monta `img`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `img`, `button`.
- **Usa código de** [`supportMailIcon`](../../../apps/prelaunch/src/assets/support/fluent-color-mail-16.svg) (pasa a src), [`qrCodeIcon`](../../../apps/prelaunch/src/assets/shared/qr-code.svg) (pasa a src).
- **Lo usa** [`DesktopWaitlistLandingPage`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L50) (renderiza).

### [`apps/prelaunch/src/business-landing/desktop/sections/DesktopFooterSection.jsx`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopFooterSection.jsx#L1)

Compone pie y enlaces de la landing comercial.

**Superficie que exporta.** [`DesktopFooterSection`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopFooterSection.jsx#L3).

**Módulos que lo cargan.** [`DesktopWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L4) (importa).

**Dependencias del archivo.** [`../components/DesktopFooterColumns`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopFooterColumns.jsx).

#### [`DesktopFooterSection`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopFooterSection.jsx#L3) · componente React · exportación por defecto

Monta `DesktopFooterColumns`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `DesktopFooterColumns`.
- **Usa código de** [`DesktopFooterColumns`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopFooterColumns.jsx#L4) (renderiza).
- **Lo usa** [`DesktopWaitlistLandingPage`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L51) (renderiza).

### [`apps/prelaunch/src/business-landing/desktop/sections/DesktopHeroSection.jsx`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopHeroSection.jsx#L1)

Primer bloque comercial con fondo, navegación, argumento y acceso a la captura.

**Superficie que exporta.** [`DesktopHeroSection`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopHeroSection.jsx#L5).

**Módulos que lo cargan.** [`DesktopWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L6) (importa).

**Dependencias del archivo.** [`../../scrollToSection`](../../../apps/prelaunch/src/business-landing/scrollToSection.js), [`../components/DesktopHeroBackground`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopHeroBackground.jsx), [`../components/DesktopHeroPhoneShowcase`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopHeroPhoneShowcase.jsx).

#### [`DesktopHeroSection`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopHeroSection.jsx#L5) · componente React · exportación por defecto

Monta `DesktopHeroBackground`, `button`, `DesktopHeroPhoneShowcase`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `DesktopHeroBackground`, `button`, `DesktopHeroPhoneShowcase`.
- **Usa código de** [`DesktopHeroBackground`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopHeroBackground.jsx#L3) (renderiza), [`DesktopHeroPhoneShowcase`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopHeroPhoneShowcase.jsx#L3) (renderiza).
- **Lo usa** [`DesktopWaitlistLandingPage`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L47) (renderiza).

#### [`button.onClick`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopHeroSection.jsx#L27) · callback JSX · dentro de [`DesktopHeroSection`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopHeroSection.jsx#L5)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Usa código de** [`scrollToSection`](../../../apps/prelaunch/src/business-landing/scrollToSection.js#L1) (llama).
- **Llamadas directas en el cuerpo** [`scrollToSection`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopHeroSection.jsx#L27).

### [`apps/prelaunch/src/business-landing/desktop/sections/DesktopWaitlistSection.jsx`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopWaitlistSection.jsx#L1)

Ubica y compone la sección inferior de registro comercial.

**Superficie que exporta.** [`DesktopWaitlistSection`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopWaitlistSection.jsx#L4).

**Dependencias del archivo.** [`../components/DesktopMockupSteps`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopMockupSteps.jsx), [`../components/DesktopWaitlistForm`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopWaitlistForm.jsx).

#### [`DesktopWaitlistSection`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopWaitlistSection.jsx#L4) · componente React · exportación por defecto

Monta `DesktopWaitlistForm`, `DesktopMockupSteps`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `DesktopWaitlistForm`, `DesktopMockupSteps`.
- **Usa código de** [`DesktopWaitlistForm`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopWaitlistForm.jsx#L4) (renderiza), [`DesktopMockupSteps`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopMockupSteps.jsx#L4) (renderiza).

### [`apps/prelaunch/src/business-landing/desktop/sections/DesktopWaitlistStepsSection.jsx`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopWaitlistStepsSection.jsx#L1)

Agrupa las tarjetas de pasos y los recursos de explicación de la landing comercial.

**Superficie que exporta.** [`DesktopWaitlistStepsSection`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopWaitlistStepsSection.jsx#L4).

**Dependencias del archivo.** [`../desktopWaitlistLandingContent`](../../../apps/prelaunch/src/business-landing/desktop/desktopWaitlistLandingContent.jsx), [`../components/DesktopStepCard`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopStepCard.jsx).

#### [`DesktopWaitlistStepsSection`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopWaitlistStepsSection.jsx#L4) · componente React · exportación por defecto

Monta `DesktopStepCard`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `DesktopStepCard`.
- **Usa código de** [`desktopSteps`](../../../apps/prelaunch/src/business-landing/desktop/desktopWaitlistLandingContent.jsx#L13) (accede al módulo), [`DesktopStepCard`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopStepCard.jsx#L1) (renderiza).
- **Llamadas directas en el cuerpo** [`desktopSteps.map`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopWaitlistStepsSection.jsx#L25).

### [`apps/prelaunch/src/business-landing/mobile/MobileBusinessLandingPage.jsx`](../../../apps/prelaunch/src/business-landing/mobile/MobileBusinessLandingPage.jsx#L1)

Punto de entrada mobile que renderiza el árbol desktop existente. Permite mantener la interfaz de carga adaptada mientras no hay una composición comercial mobile distinta.

**Superficie que exporta.** [`MobileBusinessLandingPage`](../../../apps/prelaunch/src/business-landing/mobile/MobileBusinessLandingPage.jsx#L3).

**Módulos que lo cargan.** [`BusinessLandingPage.jsx`](../../../apps/prelaunch/src/business-landing/BusinessLandingPage.jsx#L8) (carga diferida).

**Dependencias del archivo.** [`../desktop/DesktopWaitlistLandingPage`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx).

#### [`MobileBusinessLandingPage`](../../../apps/prelaunch/src/business-landing/mobile/MobileBusinessLandingPage.jsx#L3) · componente React · exportación por defecto

Monta `DesktopWaitlistLandingPage`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `DesktopWaitlistLandingPage`.
- **Usa código de** [`DesktopWaitlistLandingPage`](../../../apps/prelaunch/src/business-landing/desktop/DesktopWaitlistLandingPage.jsx#L24) (renderiza).
- **Lo usa** [`BusinessLandingPage`](../../../apps/prelaunch/src/business-landing/BusinessLandingPage.jsx#L8) (carga diferida).

### [`apps/prelaunch/src/business-landing/scrollToSection.js`](../../../apps/prelaunch/src/business-landing/scrollToSection.js#L1)

Utilidad de navegación a secciones de la landing comercial.

**Superficie que exporta.** [`scrollToSection`](../../../apps/prelaunch/src/business-landing/scrollToSection.js#L1).

**Módulos que lo cargan.** [`DesktopNavigationHeader.jsx`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopNavigationHeader.jsx#L1) (importa), [`DesktopHeroSection.jsx`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopHeroSection.jsx#L1) (importa).

#### [`scrollToSection`](../../../apps/prelaunch/src/business-landing/scrollToSection.js#L1) · función · exportado

Implementa `scroll To Section` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `sectionId`.
- **Condiciones que evalúa** `undefined`, `ausencia de section`.
- **Llamadas directas en el cuerpo** [`document.getElementById`](../../../apps/prelaunch/src/business-landing/scrollToSection.js#L6), [`section.scrollIntoView`](../../../apps/prelaunch/src/business-landing/scrollToSection.js#L11).
- **Lo usa** [`handleScroll`](../../../apps/prelaunch/src/business-landing/desktop/components/DesktopNavigationHeader.jsx#L7) (llama), [`button.onClick`](../../../apps/prelaunch/src/business-landing/desktop/sections/DesktopHeroSection.jsx#L27) (llama).
