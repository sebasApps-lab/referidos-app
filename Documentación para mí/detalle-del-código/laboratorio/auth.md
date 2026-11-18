# Laboratorio web · auth

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-pwa/src/auth/AuthFlow.jsx`](../../../apps/referidos-pwa/src/auth/AuthFlow.jsx#L1)
- [`apps/referidos-pwa/src/auth/AuthView.jsx`](../../../apps/referidos-pwa/src/auth/AuthView.jsx#L1)
- [`apps/referidos-pwa/src/auth/blocks/AuthBranderHeader.jsx`](../../../apps/referidos-pwa/src/auth/blocks/AuthBranderHeader.jsx#L1)
- [`apps/referidos-pwa/src/auth/blocks/AuthCard.jsx`](../../../apps/referidos-pwa/src/auth/blocks/AuthCard.jsx#L1)
- [`apps/referidos-pwa/src/auth/blocks/AuthFooter.jsx`](../../../apps/referidos-pwa/src/auth/blocks/AuthFooter.jsx#L1)
- [`apps/referidos-pwa/src/auth/blocks/AuthHeader.jsx`](../../../apps/referidos-pwa/src/auth/blocks/AuthHeader.jsx#L1)
- [`apps/referidos-pwa/src/auth/blocks/ErrorBanner.jsx`](../../../apps/referidos-pwa/src/auth/blocks/ErrorBanner.jsx#L1)
- [`apps/referidos-pwa/src/auth/blocks/OAuthButtons.jsx`](../../../apps/referidos-pwa/src/auth/blocks/OAuthButtons.jsx#L1)
- [`apps/referidos-pwa/src/auth/constants/authCopy.js`](../../../apps/referidos-pwa/src/auth/constants/authCopy.js#L1)
- [`apps/referidos-pwa/src/auth/steps/WelcomeStep.jsx`](../../../apps/referidos-pwa/src/auth/steps/WelcomeStep.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-pwa/src/auth/AuthFlow.jsx`](../../../apps/referidos-pwa/src/auth/AuthFlow.jsx#L1)

Compone bienvenida, marca y pie. Pasa callbacks vacíos a los proveedores. Es la evidencia de un flujo visual sin autenticación de backend.

**Superficie que exporta.** [`AuthFlow`](../../../apps/referidos-pwa/src/auth/AuthFlow.jsx#L9).

**Módulos que lo cargan.** [`AuthEntry.jsx`](../../../apps/referidos-pwa/src/pages/AuthEntry.jsx#L2) (importa).

**Dependencias del archivo.** `react`, [`./AuthView`](../../../apps/referidos-pwa/src/auth/AuthView.jsx), [`./blocks/AuthBranderHeader`](../../../apps/referidos-pwa/src/auth/blocks/AuthBranderHeader.jsx), [`./blocks/AuthFooter`](../../../apps/referidos-pwa/src/auth/blocks/AuthFooter.jsx), [`./steps/WelcomeStep`](../../../apps/referidos-pwa/src/auth/steps/WelcomeStep.jsx).

#### [`noop`](../../../apps/referidos-pwa/src/auth/AuthFlow.jsx#L7) · función

Atiende `WelcomeStep.onEmail`, `WelcomeStep.onGoogle`, `WelcomeStep.onFacebook`, `WelcomeStep.onApple`, `WelcomeStep.onTwitter` y 1 más y aplica la acción vinculada a ese control.

- **Recibe eventos de** `WelcomeStep.onEmail`, `WelcomeStep.onGoogle`, `WelcomeStep.onFacebook`, `WelcomeStep.onApple`, `WelcomeStep.onTwitter`, `WelcomeStep.onDiscord`.
- **Lo usa** [`AuthFlow`](../../../apps/referidos-pwa/src/auth/AuthFlow.jsx#L18) (pasa a onEmail).

#### [`AuthFlow`](../../../apps/referidos-pwa/src/auth/AuthFlow.jsx#L9) · componente React · exportación por defecto

Monta `AuthView`, `AuthBranderHeader`, `AuthFooter`, `WelcomeStep`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `AuthView`, `AuthBranderHeader`, `AuthFooter`, `WelcomeStep`.
- **Usa código de** [`AuthView`](../../../apps/referidos-pwa/src/auth/AuthView.jsx#L3) (renderiza), [`AuthBranderHeader`](../../../apps/referidos-pwa/src/auth/blocks/AuthBranderHeader.jsx#L4) (renderiza), [`AuthFooter`](../../../apps/referidos-pwa/src/auth/blocks/AuthFooter.jsx#L4) (renderiza), [`WelcomeStep`](../../../apps/referidos-pwa/src/auth/steps/WelcomeStep.jsx#L8) (renderiza).
- **Lo usa** [`AuthEntry`](../../../apps/referidos-pwa/src/pages/AuthEntry.jsx#L5) (renderiza).

### [`apps/referidos-pwa/src/auth/AuthView.jsx`](../../../apps/referidos-pwa/src/auth/AuthView.jsx#L1)

Armazón visual que dispone cabecera, pantalla y pie de auth.

**Superficie que exporta.** [`AuthView`](../../../apps/referidos-pwa/src/auth/AuthView.jsx#L3).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-pwa/src/auth/AuthFlow.jsx#L2) (importa).

**Dependencias del archivo.** `react`.

#### [`AuthView`](../../../apps/referidos-pwa/src/auth/AuthView.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className, header, children, footer}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`AuthFlow`](../../../apps/referidos-pwa/src/auth/AuthFlow.jsx#L11) (renderiza).

### [`apps/referidos-pwa/src/auth/blocks/AuthBranderHeader.jsx`](../../../apps/referidos-pwa/src/auth/blocks/AuthBranderHeader.jsx#L1)

Cabecera de identidad de marca para la pantalla de acceso.

**Superficie que exporta.** [`AuthBranderHeader`](../../../apps/referidos-pwa/src/auth/blocks/AuthBranderHeader.jsx#L4).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-pwa/src/auth/AuthFlow.jsx#L3) (importa).

**Dependencias del archivo.** `react`, [`../constants/authCopy`](../../../apps/referidos-pwa/src/auth/constants/authCopy.js).

#### [`AuthBranderHeader`](../../../apps/referidos-pwa/src/auth/blocks/AuthBranderHeader.jsx#L4) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className, text}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Usa código de** [`AUTH_BRAND`](../../../apps/referidos-pwa/src/auth/constants/authCopy.js#L1) (accede al módulo).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-pwa/src/auth/AuthFlow.jsx#L13) (renderiza).

### [`apps/referidos-pwa/src/auth/blocks/AuthCard.jsx`](../../../apps/referidos-pwa/src/auth/blocks/AuthCard.jsx#L1)

Contenedor estilizado para presentar bloques del flujo de acceso.

**Superficie que exporta.** [`AuthCard`](../../../apps/referidos-pwa/src/auth/blocks/AuthCard.jsx#L3).

**Módulos que lo cargan.** [`WelcomeStep.jsx`](../../../apps/referidos-pwa/src/auth/steps/WelcomeStep.jsx#L3) (importa).

**Dependencias del archivo.** `react`.

#### [`AuthCard`](../../../apps/referidos-pwa/src/auth/blocks/AuthCard.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className, children}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`WelcomeStep`](../../../apps/referidos-pwa/src/auth/steps/WelcomeStep.jsx#L23) (renderiza).

### [`apps/referidos-pwa/src/auth/blocks/AuthFooter.jsx`](../../../apps/referidos-pwa/src/auth/blocks/AuthFooter.jsx#L1)

Acciones y texto compactos al pie de la maqueta de auth.

**Superficie que exporta.** [`AuthFooter`](../../../apps/referidos-pwa/src/auth/blocks/AuthFooter.jsx#L4).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-pwa/src/auth/AuthFlow.jsx#L4) (importa).

**Dependencias del archivo.** `react`, [`../constants/authCopy`](../../../apps/referidos-pwa/src/auth/constants/authCopy.js).

#### [`AuthFooter`](../../../apps/referidos-pwa/src/auth/blocks/AuthFooter.jsx#L4) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{className}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Usa código de** [`AUTH_BRAND`](../../../apps/referidos-pwa/src/auth/constants/authCopy.js#L1) (accede al módulo).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-pwa/src/auth/AuthFlow.jsx#L14) (renderiza).

### [`apps/referidos-pwa/src/auth/blocks/AuthHeader.jsx`](../../../apps/referidos-pwa/src/auth/blocks/AuthHeader.jsx#L1)

Componente de título y subtítulo para una tarjeta de auth.

**Superficie que exporta.** [`AuthHeader`](../../../apps/referidos-pwa/src/auth/blocks/AuthHeader.jsx#L3).

**Módulos que lo cargan.** [`WelcomeStep.jsx`](../../../apps/referidos-pwa/src/auth/steps/WelcomeStep.jsx#L4) (importa).

**Dependencias del archivo.** `react`.

#### [`AuthHeader`](../../../apps/referidos-pwa/src/auth/blocks/AuthHeader.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{title, subtitle, titleClassName, subtitleClassName}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`WelcomeStep`](../../../apps/referidos-pwa/src/auth/steps/WelcomeStep.jsx#L29) (renderiza).

### [`apps/referidos-pwa/src/auth/blocks/ErrorBanner.jsx`](../../../apps/referidos-pwa/src/auth/blocks/ErrorBanner.jsx#L1)

Presentación de un error cuando el componente padre proporciona un mensaje.

**Superficie que exporta.** [`ErrorBanner`](../../../apps/referidos-pwa/src/auth/blocks/ErrorBanner.jsx#L3).

**Módulos que lo cargan.** [`WelcomeStep.jsx`](../../../apps/referidos-pwa/src/auth/steps/WelcomeStep.jsx#L5) (importa).

**Dependencias del archivo.** `react`.

#### [`ErrorBanner`](../../../apps/referidos-pwa/src/auth/blocks/ErrorBanner.jsx#L3) · componente React · exportación por defecto

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{message, className}`.
- **Retorno visible o tipo declarado** `null`, `JSX`.
- **Condiciones que evalúa** `ausencia de message`.
- **Lo usa** [`WelcomeStep`](../../../apps/referidos-pwa/src/auth/steps/WelcomeStep.jsx#L25) (renderiza).

### [`apps/referidos-pwa/src/auth/blocks/OAuthButtons.jsx`](../../../apps/referidos-pwa/src/auth/blocks/OAuthButtons.jsx#L1)

Controles visuales para proveedores. Delegan acciones a callbacks.

**Superficie que exporta.** [`OAuthButtons`](../../../apps/referidos-pwa/src/auth/blocks/OAuthButtons.jsx#L3).

**Módulos que lo cargan.** [`WelcomeStep.jsx`](../../../apps/referidos-pwa/src/auth/steps/WelcomeStep.jsx#L6) (importa).

**Dependencias del archivo.** `react`.

#### [`OAuthButtons`](../../../apps/referidos-pwa/src/auth/blocks/OAuthButtons.jsx#L3) · componente React · exportación por defecto

Monta `GoogleIcon`, `FacebookIcon`, `AppleIcon`, `XIcon`, `DiscordIcon`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{onGoogle, onFacebook, onApple, enableApple, onTwitter, onDiscord, loading, oauthLoading, oauthProvider}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `GoogleIcon`, `FacebookIcon`, `AppleIcon`, `XIcon`, `DiscordIcon`, `button`.
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-pwa/src/auth/blocks/OAuthButtons.jsx#L15), [`buttons.map`](../../../apps/referidos-pwa/src/auth/blocks/OAuthButtons.jsx#L50).
- **Lo usa** [`WelcomeStep`](../../../apps/referidos-pwa/src/auth/steps/WelcomeStep.jsx#L65) (renderiza).

#### [`GoogleIcon`](../../../apps/referidos-pwa/src/auth/blocks/OAuthButtons.jsx#L77) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`OAuthButtons`](../../../apps/referidos-pwa/src/auth/blocks/OAuthButtons.jsx#L20) (renderiza).

#### [`FacebookIcon`](../../../apps/referidos-pwa/src/auth/blocks/OAuthButtons.jsx#L106) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`OAuthButtons`](../../../apps/referidos-pwa/src/auth/blocks/OAuthButtons.jsx#L26) (renderiza).

#### [`AppleIcon`](../../../apps/referidos-pwa/src/auth/blocks/OAuthButtons.jsx#L123) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`OAuthButtons`](../../../apps/referidos-pwa/src/auth/blocks/OAuthButtons.jsx#L32) (renderiza).

#### [`XIcon`](../../../apps/referidos-pwa/src/auth/blocks/OAuthButtons.jsx#L144) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`OAuthButtons`](../../../apps/referidos-pwa/src/auth/blocks/OAuthButtons.jsx#L38) (renderiza).

#### [`DiscordIcon`](../../../apps/referidos-pwa/src/auth/blocks/OAuthButtons.jsx#L161) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`OAuthButtons`](../../../apps/referidos-pwa/src/auth/blocks/OAuthButtons.jsx#L44) (renderiza).

### [`apps/referidos-pwa/src/auth/constants/authCopy.js`](../../../apps/referidos-pwa/src/auth/constants/authCopy.js#L1)

Cadenas reutilizadas en auth de maqueta. Permite cambiar texto sin cambiar el layout de los botones.

**Superficie que exporta.** [`AUTH_BRAND`](../../../apps/referidos-pwa/src/auth/constants/authCopy.js#L1).

**Módulos que lo cargan.** [`AuthBranderHeader.jsx`](../../../apps/referidos-pwa/src/auth/blocks/AuthBranderHeader.jsx#L2) (importa), [`AuthFooter.jsx`](../../../apps/referidos-pwa/src/auth/blocks/AuthFooter.jsx#L2) (importa).

#### [`AUTH_BRAND`](../../../apps/referidos-pwa/src/auth/constants/authCopy.js#L1) · variable de módulo · exportado

Agrupa la configuración o catálogo de `AUTH BRAND` para que sus consumidores lean claves comunes.

- **Campos o contexto** `name`, `alpha`.
- **Lo usa** [`AuthBranderHeader`](../../../apps/referidos-pwa/src/auth/blocks/AuthBranderHeader.jsx#L7) (accede al módulo), [`AuthFooter`](../../../apps/referidos-pwa/src/auth/blocks/AuthFooter.jsx#L9) (accede al módulo).

### [`apps/referidos-pwa/src/auth/steps/WelcomeStep.jsx`](../../../apps/referidos-pwa/src/auth/steps/WelcomeStep.jsx#L1)

Paso inicial visible con correo y botones sociales. Recibe el comportamiento como props del flujo.

**Superficie que exporta.** [`WelcomeStep`](../../../apps/referidos-pwa/src/auth/steps/WelcomeStep.jsx#L8).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-pwa/src/auth/AuthFlow.jsx#L5) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, [`../blocks/AuthCard`](../../../apps/referidos-pwa/src/auth/blocks/AuthCard.jsx), [`../blocks/AuthHeader`](../../../apps/referidos-pwa/src/auth/blocks/AuthHeader.jsx), [`../blocks/ErrorBanner`](../../../apps/referidos-pwa/src/auth/blocks/ErrorBanner.jsx), [`../blocks/OAuthButtons`](../../../apps/referidos-pwa/src/auth/blocks/OAuthButtons.jsx).

#### [`WelcomeStep`](../../../apps/referidos-pwa/src/auth/steps/WelcomeStep.jsx#L8) · componente React · exportación por defecto

Monta `AuthCard`, `ErrorBanner`, `AuthHeader`, `Link`, `MailIcon`, `OAuthButtons`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{error, loading, oauthLoading, oauthProvider, enableApple, onEmail, onGoogle, onFacebook, onApple, onTwitter, onDiscord}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `AuthCard`, `ErrorBanner`, `AuthHeader`, `Link`, `MailIcon`, `OAuthButtons`.
- **Usa código de** [`AuthCard`](../../../apps/referidos-pwa/src/auth/blocks/AuthCard.jsx#L3) (renderiza), [`ErrorBanner`](../../../apps/referidos-pwa/src/auth/blocks/ErrorBanner.jsx#L3) (renderiza), [`AuthHeader`](../../../apps/referidos-pwa/src/auth/blocks/AuthHeader.jsx#L3) (renderiza), [`OAuthButtons`](../../../apps/referidos-pwa/src/auth/blocks/OAuthButtons.jsx#L3) (renderiza).
- **Lo usa** [`AuthFlow`](../../../apps/referidos-pwa/src/auth/AuthFlow.jsx#L16) (renderiza).

#### [`MailIcon`](../../../apps/referidos-pwa/src/auth/steps/WelcomeStep.jsx#L89) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`WelcomeStep`](../../../apps/referidos-pwa/src/auth/steps/WelcomeStep.jsx#L42) (renderiza).
