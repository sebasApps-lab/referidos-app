# Prelaunch · Selección de árbol

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/prelaunch/src/UI-detect/AdaptiveRoute.jsx`](../../../apps/prelaunch/src/UI-detect/AdaptiveRoute.jsx#L1)
- [`apps/prelaunch/src/UI-detect/detectTree.js`](../../../apps/prelaunch/src/UI-detect/detectTree.js#L1)
- [`apps/prelaunch/src/UI-detect/TreeProvider.jsx`](../../../apps/prelaunch/src/UI-detect/TreeProvider.jsx#L1)
- [`apps/prelaunch/src/UI-detect/useTree.js`](../../../apps/prelaunch/src/UI-detect/useTree.js#L1)

## Símbolos y conexiones

### [`apps/prelaunch/src/UI-detect/AdaptiveRoute.jsx`](../../../apps/prelaunch/src/UI-detect/AdaptiveRoute.jsx#L1)

Resuelve qué componente cargar por el árbol activo. Usa lazy y Suspense para evitar cargar ambas variantes de la página.

**Superficie que exporta.** [`AdaptiveRoute`](../../../apps/prelaunch/src/UI-detect/AdaptiveRoute.jsx#L4).

**Módulos que lo cargan.** [`BusinessLandingPage.jsx`](../../../apps/prelaunch/src/business-landing/BusinessLandingPage.jsx#L1) (importa), [`HelpCenterTreeRoute.jsx`](../../../apps/prelaunch/src/legal/help-center/HelpCenterTreeRoute.jsx#L1) (importa), [`FeedbackRoute.jsx`](../../../apps/prelaunch/src/support/FeedbackRoute.jsx#L1) (importa), [`SupportOpenTicketPage.jsx`](../../../apps/prelaunch/src/support/SupportOpenTicketPage.jsx#L1) (importa), [`WaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx#L2) (importa).

**Dependencias del archivo.** `react`, [`./useTree`](../../../apps/prelaunch/src/UI-detect/useTree.js).

#### [`AdaptiveRoute`](../../../apps/prelaunch/src/UI-detect/AdaptiveRoute.jsx#L4) · componente React · exportación por defecto

Monta `Suspense`, `ActiveView`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{DesktopComponent, MobileComponent, desktopLoader, mobileLoader, fallback}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `Suspense`, `ActiveView`.
- **Hooks que llama** `useTree`.
- **Condiciones que evalúa** `ausencia de ActiveView`.
- **Usa código de** [`useTree`](../../../apps/prelaunch/src/UI-detect/useTree.js#L5) (llama).
- **Lo usa** [`BusinessLandingPage`](../../../apps/prelaunch/src/business-landing/BusinessLandingPage.jsx#L6) (renderiza), [`HelpCenterTreeRoute`](../../../apps/prelaunch/src/legal/help-center/HelpCenterTreeRoute.jsx#L10) (renderiza), [`FeedbackRoute`](../../../apps/prelaunch/src/support/FeedbackRoute.jsx#L7) (renderiza), [`SupportOpenTicketPage`](../../../apps/prelaunch/src/support/SupportOpenTicketPage.jsx#L6) (renderiza), [`WaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/WaitlistLandingPage.jsx#L37) (renderiza).

#### [`LazyDesktopView`](../../../apps/prelaunch/src/UI-detect/AdaptiveRoute.jsx#L13) · cálculo memorizado · dentro de [`AdaptiveRoute`](../../../apps/prelaunch/src/UI-detect/AdaptiveRoute.jsx#L4)

Función auxiliar de `AdaptiveRoute` para `Lazy Desktop View`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/prelaunch/src/UI-detect/AdaptiveRoute.jsx#L13).
- **Lo usa** [`AdaptiveRoute`](../../../apps/prelaunch/src/UI-detect/AdaptiveRoute.jsx#L21) (referencia).

#### [`LazyMobileView`](../../../apps/prelaunch/src/UI-detect/AdaptiveRoute.jsx#L17) · cálculo memorizado · dentro de [`AdaptiveRoute`](../../../apps/prelaunch/src/UI-detect/AdaptiveRoute.jsx#L4)

Función auxiliar de `AdaptiveRoute` para `Lazy Mobile View`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`lazy`](../../../apps/prelaunch/src/UI-detect/AdaptiveRoute.jsx#L17).
- **Lo usa** [`AdaptiveRoute`](../../../apps/prelaunch/src/UI-detect/AdaptiveRoute.jsx#L22) (referencia).

### [`apps/prelaunch/src/UI-detect/detectTree.js`](../../../apps/prelaunch/src/UI-detect/detectTree.js#L1)

Decide mobile a partir de userAgentData y patrones del user-agent. La decisión no deriva del ancho de CSS.

**Superficie que exporta.** [`detectTree`](../../../apps/prelaunch/src/UI-detect/detectTree.js#L1).

**Módulos que lo cargan.** [`TreeProvider.jsx`](../../../apps/prelaunch/src/UI-detect/TreeProvider.jsx#L2) (importa).

#### [`detectTree`](../../../apps/prelaunch/src/UI-detect/detectTree.js#L1) · función · exportado

Implementa `detect Tree` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Condiciones que evalúa** `undefined`, `uaDataMobile`, `boolean y ausencia de isMobileUserAgent`.
- **Llamadas directas en el cuerpo** [`test`](../../../apps/prelaunch/src/UI-detect/detectTree.js#L6).
- **Lo usa** [`TreeProvider`](../../../apps/prelaunch/src/UI-detect/TreeProvider.jsx#L9) (llama).

### [`apps/prelaunch/src/UI-detect/TreeProvider.jsx`](../../../apps/prelaunch/src/UI-detect/TreeProvider.jsx#L1)

Calcula la elección del árbol y la publica por contexto. Permite que las rutas distingan mobile y desktop sin repetir detección.

**Superficie que exporta.** [`TreeProvider`](../../../apps/prelaunch/src/UI-detect/TreeProvider.jsx#L8).

**Módulos que lo cargan.** [`main.jsx`](../../../apps/prelaunch/src/main.jsx#L6) (importa).

**Dependencias del archivo.** `react`, [`./detectTree`](../../../apps/prelaunch/src/UI-detect/detectTree.js), [`./useTree`](../../../apps/prelaunch/src/UI-detect/useTree.js).

#### [`TREE_ATTR`](../../../apps/prelaunch/src/UI-detect/TreeProvider.jsx#L5) · variable de módulo

Declara `TREE_ATTR` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`useEffect · callback`](../../../apps/prelaunch/src/UI-detect/TreeProvider.jsx#L22) (referencia).

#### [`LEGACY_TREE_ATTR`](../../../apps/prelaunch/src/UI-detect/TreeProvider.jsx#L6) · variable de módulo

Declara `LEGACY_TREE_ATTR` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`useEffect · callback`](../../../apps/prelaunch/src/UI-detect/TreeProvider.jsx#L23) (referencia).

#### [`TreeProvider`](../../../apps/prelaunch/src/UI-detect/TreeProvider.jsx#L8) · componente React · exportación por defecto

Monta `TreeContext.Provider`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{children}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[tree] mediante useState`.
- **Interfaz que monta** `TreeContext.Provider`.
- **Hooks que llama** `useState`, `useEffect`.
- **Usa código de** [`detectTree`](../../../apps/prelaunch/src/UI-detect/detectTree.js#L1) (llama), [`TreeContext`](../../../apps/prelaunch/src/UI-detect/useTree.js#L3) (renderiza).
- **Llamadas directas en el cuerpo** [`detectTree`](../../../apps/prelaunch/src/UI-detect/TreeProvider.jsx#L9).
- **Lo usa** [`main.jsx`](../../../apps/prelaunch/src/main.jsx#L46) (renderiza).

#### [`useEffect · callback`](../../../apps/prelaunch/src/UI-detect/TreeProvider.jsx#L11) · callback de infraestructura · dentro de [`TreeProvider`](../../../apps/prelaunch/src/UI-detect/TreeProvider.jsx#L8)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `TreeProvider`.

- **Actualizaciones de estado o acciones** `setAttribute`.
- **Condiciones que evalúa** `undefined`, `ausencia de node`.
- **Llamadas directas en el cuerpo** [`document.getElementById`](../../../apps/prelaunch/src/UI-detect/TreeProvider.jsx#L18), [`node.setAttribute`](../../../apps/prelaunch/src/UI-detect/TreeProvider.jsx#L22), [`node.removeAttribute`](../../../apps/prelaunch/src/UI-detect/TreeProvider.jsx#L29).

### [`apps/prelaunch/src/UI-detect/useTree.js`](../../../apps/prelaunch/src/UI-detect/useTree.js#L1)

Hook que lee el contexto de árbol y ofrece la elección a rutas y componentes.

**Superficie que exporta.** [`TreeContext`](../../../apps/prelaunch/src/UI-detect/useTree.js#L3), [`useTree`](../../../apps/prelaunch/src/UI-detect/useTree.js#L5).

**Módulos que lo cargan.** [`AdaptiveRoute.jsx`](../../../apps/prelaunch/src/UI-detect/AdaptiveRoute.jsx#L2) (importa), [`TreeProvider.jsx`](../../../apps/prelaunch/src/UI-detect/TreeProvider.jsx#L3) (importa).

**Dependencias del archivo.** `react`.

#### [`TreeContext`](../../../apps/prelaunch/src/UI-detect/useTree.js#L3) · variable de módulo · exportado

Comparte el estado o valor de `Tree Context` mediante contexto de React.

- **Llamadas directas en el cuerpo** [`createContext`](../../../apps/prelaunch/src/UI-detect/useTree.js#L3).
- **Lo usa** [`useTree`](../../../apps/prelaunch/src/UI-detect/useTree.js#L6) (referencia), [`TreeProvider`](../../../apps/prelaunch/src/UI-detect/TreeProvider.jsx#L35) (renderiza).

#### [`useTree`](../../../apps/prelaunch/src/UI-detect/useTree.js#L5) · hook React · exportado

Agrupa estado, contexto o efectos de `Tree` para sus consumidores React.

- **Hooks que llama** `useContext`.
- **Lo usa** [`AdaptiveRoute`](../../../apps/prelaunch/src/UI-detect/AdaptiveRoute.jsx#L11) (llama).
