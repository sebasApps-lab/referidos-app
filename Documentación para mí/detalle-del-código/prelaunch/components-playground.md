# Prelaunch · components-playground

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/prelaunch/src/components-playground/ComponentsPlaygroundPage.jsx`](../../../apps/prelaunch/src/components-playground/ComponentsPlaygroundPage.jsx#L1)
- [`apps/prelaunch/src/components-playground/SignupCard.jsx`](../../../apps/prelaunch/src/components-playground/SignupCard.jsx#L1)

## Símbolos y conexiones

### [`apps/prelaunch/src/components-playground/ComponentsPlaygroundPage.jsx`](../../../apps/prelaunch/src/components-playground/ComponentsPlaygroundPage.jsx#L1)

Reúne variantes de componentes para comparación durante desarrollo. Es un punto de prueba visual separado de la captura pública.

**Superficie que exporta.** [`ComponentsPlaygroundPage`](../../../apps/prelaunch/src/components-playground/ComponentsPlaygroundPage.jsx#L3).

**Módulos que lo cargan.** [`main.jsx`](../../../apps/prelaunch/src/main.jsx#L18) (carga diferida).

**Dependencias del archivo.** [`./SignupCard`](../../../apps/prelaunch/src/components-playground/SignupCard.jsx).

#### [`ComponentsPlaygroundPage`](../../../apps/prelaunch/src/components-playground/ComponentsPlaygroundPage.jsx#L3) · componente React · exportación por defecto

Monta `SignupCard`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `SignupCard`.
- **Usa código de** [`SignupCard`](../../../apps/prelaunch/src/components-playground/SignupCard.jsx#L25) (renderiza).
- **Lo usa** [`ComponentsPlaygroundPage`](../../../apps/prelaunch/src/main.jsx#L18) (carga diferida).

### [`apps/prelaunch/src/components-playground/SignupCard.jsx`](../../../apps/prelaunch/src/components-playground/SignupCard.jsx#L1)

Tarjeta experimental de registro que recibe contenido y acciones. Útil para aislar la composición sin cambiar la landing pública.

**Superficie que exporta.** [`SignupCard`](../../../apps/prelaunch/src/components-playground/SignupCard.jsx#L25).

**Módulos que lo cargan.** [`ComponentsPlaygroundPage.jsx`](../../../apps/prelaunch/src/components-playground/ComponentsPlaygroundPage.jsx#L1) (importa).

**Dependencias del archivo.** [`../assets/landing/hero/hero-register-card-line.png`](../../../apps/prelaunch/src/assets/landing/hero/hero-register-card-line.png), [`../assets/landing/hero/info-card-BG-optimized.webp`](../../../apps/prelaunch/src/assets/landing/hero/info-card-BG-optimized.webp), [`../assets/landing/hero/info-card-glow-optimized.webp`](../../../apps/prelaunch/src/assets/landing/hero/info-card-glow-optimized.webp), [`../assets/shared/material-icon-theme-google.svg`](../../../apps/prelaunch/src/assets/shared/material-icon-theme-google.svg), [`../assets/support/fluent-color-mail-16.svg`](../../../apps/prelaunch/src/assets/support/fluent-color-mail-16.svg).

#### [`ASSETS`](../../../apps/prelaunch/src/components-playground/SignupCard.jsx#L8) · variable de módulo

Agrupa la configuración o catálogo de `ASSETS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `blur`, `bg`, `google`, `mail`, `line`.
- **Usa código de** [`signUpCardGlow`](../../../apps/prelaunch/src/assets/landing/hero/info-card-glow-optimized.webp) (referencia), [`signUpCardBg`](../../../apps/prelaunch/src/assets/landing/hero/info-card-BG-optimized.webp) (referencia), [`googleIcon`](../../../apps/prelaunch/src/assets/shared/material-icon-theme-google.svg) (referencia), [`supportMailIcon`](../../../apps/prelaunch/src/assets/support/fluent-color-mail-16.svg) (referencia), [`heroRegisterCardLine`](../../../apps/prelaunch/src/assets/landing/hero/hero-register-card-line.png) (referencia).
- **Lo usa** [`SignupCard`](../../../apps/prelaunch/src/components-playground/SignupCard.jsx#L31) (accede al módulo).

#### [`SignupCardButton`](../../../apps/prelaunch/src/components-playground/SignupCard.jsx#L16) · componente React

Monta `button`, `img`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{className, iconSrc, label}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `button`, `img`.
- **Lo usa** [`SignupCard`](../../../apps/prelaunch/src/components-playground/SignupCard.jsx#L45) (renderiza).

#### [`SignupCard`](../../../apps/prelaunch/src/components-playground/SignupCard.jsx#L25) · componente React · exportación por defecto

Monta `img`, `SignupCardButton`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `img`, `SignupCardButton`.
- **Lo usa** [`ComponentsPlaygroundPage`](../../../apps/prelaunch/src/components-playground/ComponentsPlaygroundPage.jsx#L6) (renderiza).
