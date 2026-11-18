# PWA principal · Guards y navegación

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/router/guards/pwaGuard.js`](../../../apps/referidos-app/src/router/guards/pwaGuard.js#L1)
- [`apps/referidos-app/src/router/guards/RequireAuth.jsx`](../../../apps/referidos-app/src/router/guards/RequireAuth.jsx#L1)
- [`apps/referidos-app/src/router/guards/RequireRole.jsx`](../../../apps/referidos-app/src/router/guards/RequireRole.jsx#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/router/guards/pwaGuard.js`](../../../apps/referidos-app/src/router/guards/pwaGuard.js#L1)

Detecta standalone y propone redirecciones por autenticación y rol. Su firma posicional difiere del llamado en App.jsx.

**Superficie que exporta.** [`isPWA`](../../../apps/referidos-app/src/router/guards/pwaGuard.js#L3), [`pwaGuard`](../../../apps/referidos-app/src/router/guards/pwaGuard.js#L16).

**Módulos que lo cargan.** [`App.jsx`](../../../apps/referidos-app/src/App.jsx#L5) (importa).

#### [`isPWA`](../../../apps/referidos-app/src/router/guards/pwaGuard.js#L3) · función · exportado

Comprueba `PWA` para decidir si se admite o continúa la operación.

- **Llamadas directas en el cuerpo** [`window.matchMedia`](../../../apps/referidos-app/src/router/guards/pwaGuard.js#L5).
- **Lo usa** [`pwaGuard`](../../../apps/referidos-app/src/router/guards/pwaGuard.js#L17) (llama).

#### [`pwaGuard`](../../../apps/referidos-app/src/router/guards/pwaGuard.js#L16) · función · exportado

Implementa `pwa Guard` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `usuario`, `pathname`, `bootstrap`, `onboarding`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de isPWA`, `bootstrap`, `pathname.startsWith`, `pathname`, `ausencia de usuario`, `ausencia de onboarding.allowAccess`, `shouldHoldAuth`, `usuario` y 1 más.
- **Llamadas directas en el cuerpo** [`isPWA`](../../../apps/referidos-app/src/router/guards/pwaGuard.js#L17), [`pathname.startsWith`](../../../apps/referidos-app/src/router/guards/pwaGuard.js#L22).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/App.jsx#L22) (llama).

### [`apps/referidos-app/src/router/guards/RequireAuth.jsx`](../../../apps/referidos-app/src/router/guards/RequireAuth.jsx#L1)

Protege la experiencia de navegación durante bootstrap y exige usuario y un estado MFA aceptable.

**Superficie que exporta.** [`RequireAuth`](../../../apps/referidos-app/src/router/guards/RequireAuth.jsx#L6).

**Módulos que lo cargan.** [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L6) (importa).

**Dependencias del archivo.** `react-router-dom`, [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../../hooks/useMfaGate`](../../../apps/referidos-app/src/hooks/useMfaGate.js).

#### [`RequireAuth`](../../../apps/referidos-app/src/router/guards/RequireAuth.jsx#L6) · componente React · exportación por defecto

Monta `Navigate`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{children}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector state.usuario`, `bootstrap mediante useAppStore`, `selector state.bootstrap`.
- **Interfaz que monta** `Navigate`.
- **Hooks que llama** `useAppStore`, `useMfaGate`.
- **Condiciones que evalúa** `bootstrap o undefined`, `usuario`, `blockAccess`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`useMfaGate`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L6) (llama).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L79) (renderiza).

### [`apps/referidos-app/src/router/guards/RequireRole.jsx`](../../../apps/referidos-app/src/router/guards/RequireRole.jsx#L1)

Comprueba el rol, allowAccess y aceptaciones legales antes de montar el área requerida.

**Superficie que exporta.** [`RequireRole`](../../../apps/referidos-app/src/router/guards/RequireRole.jsx#L6).

**Módulos que lo cargan.** [`routes.jsx`](../../../apps/referidos-app/src/routes.jsx#L7) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, [`../../store/appStore`](../../../apps/referidos-app/src/store/appStore.js).

#### [`RequireRole`](../../../apps/referidos-app/src/router/guards/RequireRole.jsx#L6) · componente React · exportación por defecto

Monta `Navigate`, `React.Fragment`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{children, role}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector state.usuario`, `bootstrap mediante useAppStore`, `selector state.bootstrap`, `onboarding mediante useAppStore`, `selector state.onboarding`.
- **Interfaz que monta** `Navigate`, `React.Fragment`.
- **Hooks que llama** `useAppStore`, `useLocation`.
- **Condiciones que evalúa** `bootstrap o undefined`, `usuario`, `ausencia de onboarding.allowAccess`, `usuario.role y ausencia de legalAccepted`, `usuario.role`, `role`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama).
- **Llamadas directas en el cuerpo** [`get`](../../../apps/referidos-app/src/router/guards/RequireRole.jsx#L47).
- **Lo usa** [`AppRoutes`](../../../apps/referidos-app/src/routes.jsx#L80) (renderiza).
