# PWA principal · Landing de PWA

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/landing/LandingPage.jsx`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/landing/LandingPage.jsx`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L1)

Monta la landing interna de la PWA accesible por /inicio, con secciones y llamadas a la acción propias.

**Superficie que exporta.** [`LandingPage`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L103).

**Módulos que lo cargan.** [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L35) (carga diferida).

**Dependencias del archivo.** `react`, `react-router-dom`.

#### [`HERO_METRICS`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L4) · variable de módulo

Conserva la lista de `HERO METRICS` usada por el módulo.

- **Lo usa** [`LandingPage`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L251) (accede al módulo).

#### [`HOW_STEPS`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L10) · variable de módulo

Conserva la lista de `HOW STEPS` usada por el módulo.

- **Lo usa** [`LandingPage`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L363) (accede al módulo).

#### [`ROLE_STEPS`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L28) · variable de módulo

Agrupa la configuración o catálogo de `ROLE STEPS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `cliente`, `negocio`.
- **Lo usa** [`LandingPage`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L346) (accede al módulo).

#### [`ROLE_BENEFITS`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L41) · variable de módulo

Conserva la lista de `ROLE BENEFITS` usada por el módulo.

- **Lo usa** [`LandingPage`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L382) (accede al módulo).

#### [`TRUST_ITEMS`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L62) · variable de módulo

Conserva la lista de `TRUST ITEMS` usada por el módulo.

- **Lo usa** [`LandingPage`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L441) (accede al módulo).

#### [`FAQ_ITEMS`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L80) · variable de módulo

Conserva la lista de `FAQ ITEMS` usada por el módulo.

- **Lo usa** [`LandingPage`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L464) (accede al módulo).

#### [`LandingPage`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L103) · componente React · exportación por defecto

Monta `img`, `StoreButton`, `button`. Las props y el estado determinan el contenido de esta vista.

- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[role, setRole] mediante useState`.
- **Interfaz que monta** `img`, `StoreButton`, `button`.
- **Hooks que llama** `useState`, `useLocation`, `useEffect`.
- **Llamadas directas en el cuerpo** [`HERO_METRICS.map`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L251), [`map`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L274), [`ROLE_STEPS.role.map`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L346), [`HOW_STEPS.map`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L363), [`ROLE_BENEFITS.map`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L382), [`lane.bullets.map`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L392), [`TRUST_ITEMS.map`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L441), [`FAQ_ITEMS.map`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L464), [`getFullYear`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L481).
- **Lo usa** [`LandingPage`](../../../apps/referidos-app/src/routes.jsx#L35) (carga diferida).

#### [`meta`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L108) · cálculo memorizado · dentro de [`LandingPage`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L103)

Función auxiliar de `LandingPage` para `meta`.

- **Retorno visible o tipo declarado** `title`, `description`, `ogImage`.
- **Hooks que llama** `useMemo`.
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L119) (accede al módulo), [`LandingPage`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L164) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L117) · callback de infraestructura · dentro de [`LandingPage`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L103)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `LandingPage`.

- **Actualizaciones de estado o acciones** `setMeta`, `setProperty`, `setLink`.
- **Llamadas directas en el cuerpo** [`setMeta`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L152), [`setProperty`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L154), [`setLink`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L163).

#### [`setMeta`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L122) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L117)

Aplica o guarda `Meta` para que el estado refleje la operación.

- **Entradas** `name`, `content`.
- **Actualizaciones de estado o acciones** `setAttribute`.
- **Condiciones que evalúa** `ausencia de tag`.
- **Llamadas directas en el cuerpo** [`document.querySelector`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L123), [`document.createElement`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L125), [`tag.setAttribute`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L126), [`document.head.appendChild`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L127).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L152) (llama).

#### [`setProperty`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L132) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L117)

Aplica o guarda `Property` para que el estado refleje la operación.

- **Entradas** `property`, `content`.
- **Actualizaciones de estado o acciones** `setAttribute`.
- **Condiciones que evalúa** `ausencia de tag`.
- **Llamadas directas en el cuerpo** [`document.querySelector`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L133), [`document.createElement`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L135), [`tag.setAttribute`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L136), [`document.head.appendChild`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L137).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L154) (llama).

#### [`setLink`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L142) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L117)

Aplica o guarda `Link` para que el estado refleje la operación.

- **Entradas** `rel`, `href`.
- **Actualizaciones de estado o acciones** `setAttribute`.
- **Condiciones que evalúa** `ausencia de tag`.
- **Llamadas directas en el cuerpo** [`document.querySelector`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L143), [`document.createElement`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L145), [`tag.setAttribute`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L146), [`document.head.appendChild`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L147).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L163) (llama).

#### [`button.onClick`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L332) · callback JSX · dentro de [`LandingPage`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L103)

Responde al evento de interfaz `button.onClick`. La lógica ocurre al interactuar con ese control.

- **Actualizaciones de estado o acciones** `setRole`.
- **Llamadas directas en el cuerpo** [`setRole`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L332).

#### [`StoreButton`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L500) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Entradas** `{href, label, Icon}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Llamadas directas en el cuerpo** [`React.createElement`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L508).
- **Lo usa** [`LandingPage`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L298) (renderiza).

#### [`QrIcon`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L514) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`HOW_STEPS`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L14) (referencia).

#### [`GroupIcon`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L527) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`HOW_STEPS`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L19) (referencia).

#### [`PointsIcon`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L538) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`HOW_STEPS`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L24) (referencia).

#### [`ShieldIcon`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L551) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`TRUST_ITEMS`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L66) (referencia).

#### [`CheckIcon`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L570) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`TRUST_ITEMS`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L71) (referencia).

#### [`SupportIcon`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L584) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`TRUST_ITEMS`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L76) (referencia).

#### [`AndroidIcon`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L597) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`LandingPage`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L301) (pasa a Icon).

#### [`AppleIcon`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L617) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`LandingPage`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L306) (pasa a Icon).

#### [`WindowsIcon`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L632) · componente React

Encapsula una vista React para reutilizar su estructura y sus props.

- **Retorno visible o tipo declarado** `JSX`.
- **Lo usa** [`LandingPage`](../../../apps/referidos-app/src/landing/LandingPage.jsx#L311) (pasa a Icon).
