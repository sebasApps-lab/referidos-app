# PWA principal · Hooks de aplicación

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/hooks/useAppLogger.js`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L1)
- [`apps/referidos-app/src/hooks/useAutoCarousel.js`](../../../apps/referidos-app/src/hooks/useAutoCarousel.js#L1)
- [`apps/referidos-app/src/hooks/useBootstrapAuth.js`](../../../apps/referidos-app/src/hooks/useBootstrapAuth.js#L1)
- [`apps/referidos-app/src/hooks/useCarousel.js`](../../../apps/referidos-app/src/hooks/useCarousel.js#L1)
- [`apps/referidos-app/src/hooks/useMfaGate.js`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L1)
- [`apps/referidos-app/src/hooks/usePinSetup.js`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L1)
- [`apps/referidos-app/src/hooks/usePromoSearch.js`](../../../apps/referidos-app/src/hooks/usePromoSearch.js#L1)
- [`apps/referidos-app/src/hooks/useSearchDock.js`](../../../apps/referidos-app/src/hooks/useSearchDock.js#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/hooks/useAppLogger.js`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L1)

Inicializa el cliente de observabilidad web y sincroniza el contexto conforme cambian ruta o usuario.

**Superficie que exporta.** [`useAppLogger`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L21).

**Módulos que lo cargan.** [`App.jsx`](../../../apps/referidos-app/src/App.jsx#L9) (importa).

**Dependencias del archivo.** `react`, `react-router-dom`, [`../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../services/loggingClient`](../../../apps/referidos-app/src/services/loggingClient.js).

#### [`resolveFlow`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L12) · función

Obtiene o resuelve `Flow` para entregarlo al consumidor.

- **Entradas** `pathname = valor por defecto`.
- **Condiciones que evalúa** `pathname.startsWith`.
- **Llamadas directas en el cuerpo** [`pathname.startsWith`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L13).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L42) (llama).

#### [`useAppLogger`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L21) · hook React · exportación por defecto

Agrupa estado, contexto o efectos de `App Logger` para sus consumidores React.

- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `onboarding mediante useAppStore`, `selector s.onboarding`, `lastPath mediante useRef`.
- **Hooks que llama** `useLocation`, `useAppStore`, `useRef`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama).
- **Lo usa** [`App`](../../../apps/referidos-app/src/App.jsx#L40) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L27) · callback de infraestructura · dentro de [`useAppLogger`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L21)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useAppLogger`.

- **Usa código de** [`initLogger`](../../../apps/referidos-app/src/services/loggingClient.js#L125) (llama).
- **Llamadas directas en el cuerpo** [`initLogger`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L28).

#### [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L31) · callback de infraestructura · dentro de [`useAppLogger`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L21)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useAppLogger`.

- **Actualizaciones de estado o acciones** `setLoggerEnabled`, `setLoggerUser`.
- **Usa código de** [`setLoggerEnabled`](../../../apps/referidos-app/src/services/loggingClient.js#L133) (llama), [`setLoggerUser`](../../../apps/referidos-app/src/services/loggingClient.js#L138) (llama).
- **Llamadas directas en el cuerpo** [`setLoggerEnabled`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L33), [`setLoggerUser`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L34).

#### [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L37) · callback de infraestructura · dentro de [`useAppLogger`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L21)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useAppLogger`.

- **Actualizaciones de estado o acciones** `setLoggerContext`.
- **Condiciones que evalúa** `lastPath.current`.
- **Usa código de** [`setLoggerContext`](../../../apps/referidos-app/src/services/loggingClient.js#L144) (llama), [`logBreadcrumb`](../../../apps/referidos-app/src/services/loggingClient.js#L167) (llama).
- **Llamadas directas en el cuerpo** [`resolveFlow`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L42), [`setLoggerContext`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L43), [`logBreadcrumb`](../../../apps/referidos-app/src/hooks/useAppLogger.js#L49).

### [`apps/referidos-app/src/hooks/useAutoCarousel.js`](../../../apps/referidos-app/src/hooks/useAutoCarousel.js#L1)

Coordina el avance automático de un carrusel y la pausa de la animación.

**Superficie que exporta.** [`useAutoCarousel`](../../../apps/referidos-app/src/hooks/useAutoCarousel.js#L3).

**Módulos que lo cargan.** [`PromoSection.jsx`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L5) (importa).

**Dependencias del archivo.** `react`.

#### [`useAutoCarousel`](../../../apps/referidos-app/src/hooks/useAutoCarousel.js#L3) · hook React · exportado

Agrupa estado, contexto o efectos de `Auto Carousel` para sus consumidores React.

- **Entradas** `{enabled, intervalMs, onTick}`.
- **Estado o valores vinculados** `handlerRef mediante useRef`.
- **Hooks que llama** `useRef`, `useEffect`.
- **Lo usa** [`PromoSection`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L41) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useAutoCarousel.js#L6) · callback de infraestructura · dentro de [`useAutoCarousel`](../../../apps/referidos-app/src/hooks/useAutoCarousel.js#L3)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useAutoCarousel`.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useAutoCarousel.js#L10) · callback de infraestructura · dentro de [`useAutoCarousel`](../../../apps/referidos-app/src/hooks/useAutoCarousel.js#L3)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useAutoCarousel`.

- **Actualizaciones de estado o acciones** `clearInterval`.
- **Efectos y APIs** `setInterval`, `clearInterval`.
- **Condiciones que evalúa** `ausencia de enabled`.
- **Llamadas directas en el cuerpo** [`setInterval`](../../../apps/referidos-app/src/hooks/useAutoCarousel.js#L12), [`clearInterval`](../../../apps/referidos-app/src/hooks/useAutoCarousel.js#L16).

#### [`setInterval · callback`](../../../apps/referidos-app/src/hooks/useAutoCarousel.js#L12) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useAutoCarousel.js#L10)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Llamadas directas en el cuerpo** [`handlerRef.current`](../../../apps/referidos-app/src/hooks/useAutoCarousel.js#L13).

### [`apps/referidos-app/src/hooks/useBootstrapAuth.js`](../../../apps/referidos-app/src/hooks/useBootstrapAuth.js#L1)

Arranca la acción bootstrapAuth del store al montar y expone estado de arranque al llamador.

**Superficie que exporta.** [`useBootstrapAuth`](../../../apps/referidos-app/src/hooks/useBootstrapAuth.js#L10).

**Módulos que lo cargan.** [`App.jsx`](../../../apps/referidos-app/src/App.jsx#L8) (importa).

**Dependencias del archivo.** `react`, [`../store/appStore`](../../../apps/referidos-app/src/store/appStore.js).

#### [`useBootstrapAuth`](../../../apps/referidos-app/src/hooks/useBootstrapAuth.js#L10) · hook React · exportación por defecto

Agrupa estado, contexto o efectos de `Bootstrap Auth` para sus consumidores React.

- **Retorno visible o tipo declarado** `bootstrap`, `usuario`, `error`.
- **Estado o valores vinculados** `bootstrap mediante useAppStore`, `selector s.bootstrap`, `usuario mediante useAppStore`, `selector s.usuario`, `error mediante useAppStore`, `selector s.error`, `bootstrapAuth mediante useAppStore`, `selector s.bootstrapAuth`.
- **Hooks que llama** `useAppStore`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama).
- **Lo usa** [`useBootstrapAuth.js`](../../../apps/referidos-app/src/hooks/useBootstrapAuth.js#L26) (referencia), [`App`](../../../apps/referidos-app/src/App.jsx#L39) (llama).

#### [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useBootstrapAuth.js#L16) · callback de infraestructura · dentro de [`useBootstrapAuth`](../../../apps/referidos-app/src/hooks/useBootstrapAuth.js#L10)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useBootstrapAuth`.

- **Condiciones que evalúa** `bootstrap`.
- **Llamadas directas en el cuerpo** [`bootstrapAuth`](../../../apps/referidos-app/src/hooks/useBootstrapAuth.js#L19).

### [`apps/referidos-app/src/hooks/useCarousel.js`](../../../apps/referidos-app/src/hooks/useCarousel.js#L1)

Agrupa navegación y estado reutilizable de carrusel para que la pantalla no replique sus cálculos.

**Superficie que exporta.** [`useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js#L5).

**Módulos que lo cargan.** [`PromoSection.jsx`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L4) (importa).

**Dependencias del archivo.** `react`.

#### [`useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js#L5) · hook React · exportado

Agrupa estado, contexto o efectos de `Carousel` para sus consumidores React.

- **Entradas** `ref`, `{loop, itemsCount, onInteract, snap, snapDelay, itemSelector} = valor por defecto`.
- **Retorno visible o tipo declarado** `canLeft`, `canRight`, `scroll`, `scrollToStart`.
- **Estado o valores vinculados** `[canLeft, setCanLeft] mediante useState`, `[canRight, setCanRight] mediante useState`, `readyRef mediante useRef`, `jumpingRef mediante useRef`, `snappingRef mediante useRef`, `snapTimerRef mediante useRef`, `reanchorTimerRef mediante useRef`, `finalSnapTimerRef mediante useRef`, `skipSnapUntilRef mediante useRef`, `lastScrollLeftRef mediante useRef`, `lastScrollTimeRef mediante useRef`, `velocityRef mediante useRef`, `interactingRef mediante useRef`, `interactionTimerRef mediante useRef`.
- **Hooks que llama** `useState`, `useRef`, `useLayoutEffect`, `useEffect`.
- **Lo usa** [`PromoSection`](../../../apps/referidos-app/src/components/sections/PromoSection.jsx#L24) (llama).

#### [`getItems`](../../../apps/referidos-app/src/hooks/useCarousel.js#L35) · callback React · dentro de [`useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js#L5)

Obtiene o resuelve `Items` para entregarlo al consumidor.

- **Entradas** `el`.
- **Hooks que llama** `useCallback`.
- **Llamadas directas en el cuerpo** [`el.querySelectorAll`](../../../apps/referidos-app/src/hooks/useCarousel.js#L35).
- **Lo usa** [`getClosestItem`](../../../apps/referidos-app/src/hooks/useCarousel.js#L64) (llama), [`centerInitialItem`](../../../apps/referidos-app/src/hooks/useCarousel.js#L151) (llama), [`update`](../../../apps/referidos-app/src/hooks/useCarousel.js#L171) (llama), [`reanchorIfNeeded`](../../../apps/referidos-app/src/hooks/useCarousel.js#L204) (llama), [`scroll`](../../../apps/referidos-app/src/hooks/useCarousel.js#L236) (llama), [`scrollToStart`](../../../apps/referidos-app/src/hooks/useCarousel.js#L269) (llama), [`snapToClosest`](../../../apps/referidos-app/src/hooks/useCarousel.js#L301) (llama), [`ensureFinalSnap`](../../../apps/referidos-app/src/hooks/useCarousel.js#L318) (llama), [`useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js#L468) (referencia).

#### [`jumpTo`](../../../apps/referidos-app/src/hooks/useCarousel.js#L39) · callback React · dentro de [`useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js#L5)

Función auxiliar de `useCarousel` para `jump To`.

- **Entradas** `el`, `nextLeft`, `{suppressSnap} = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Efectos y APIs** `requestAnimationFrame`.
- **Condiciones que evalúa** `ausencia de el o jumpingRef.current`, `suppressSnap`.
- **Llamadas directas en el cuerpo** [`requestAnimationFrame`](../../../apps/referidos-app/src/hooks/useCarousel.js#L49).
- **Lo usa** [`centerItem`](../../../apps/referidos-app/src/hooks/useCarousel.js#L139) (llama), [`reanchorIfNeeded`](../../../apps/referidos-app/src/hooks/useCarousel.js#L221) (llama).

#### [`clampScrollLeft`](../../../apps/referidos-app/src/hooks/useCarousel.js#L58) · callback React · dentro de [`useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js#L5)

Función auxiliar de `useCarousel` para `clamp Scroll Left`.

- **Entradas** `el`, `left`.
- **Hooks que llama** `useCallback`.
- **Lo usa** [`centerItem`](../../../apps/referidos-app/src/hooks/useCarousel.js#L137) (llama), [`reanchorIfNeeded`](../../../apps/referidos-app/src/hooks/useCarousel.js#L217) (llama).

#### [`getClosestItem`](../../../apps/referidos-app/src/hooks/useCarousel.js#L64) · callback React · dentro de [`useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js#L5)

Obtiene o resuelve `Closest Item` para entregarlo al consumidor.

- **Entradas** `el`, `items = valor por defecto`, `preferDup = valor por defecto`.
- **Retorno visible o tipo declarado** `null`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `ausencia de items.length`, `preferDup`, `filtered.length`, `distance`.
- **Llamadas directas en el cuerpo** [`getItems`](../../../apps/referidos-app/src/hooks/useCarousel.js#L64), [`items.filter`](../../../apps/referidos-app/src/hooks/useCarousel.js#L68), [`candidates.forEach`](../../../apps/referidos-app/src/hooks/useCarousel.js#L75).
- **Lo usa** [`update`](../../../apps/referidos-app/src/hooks/useCarousel.js#L179) (llama), [`scroll`](../../../apps/referidos-app/src/hooks/useCarousel.js#L239) (llama), [`snapToClosest`](../../../apps/referidos-app/src/hooks/useCarousel.js#L303) (llama), [`ensureFinalSnap`](../../../apps/referidos-app/src/hooks/useCarousel.js#L320) (llama), [`useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js#L467) (referencia).

#### [`getLoopCenterDup`](../../../apps/referidos-app/src/hooks/useCarousel.js#L87) · callback React · dentro de [`useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js#L5)

Obtiene o resuelve `Loop Center Dup` para entregarlo al consumidor.

- **Entradas** `items`.
- **Retorno visible o tipo declarado** `null`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `ausencia de dupValues.length`.
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-app/src/hooks/useCarousel.js#L90), [`items.map`](../../../apps/referidos-app/src/hooks/useCarousel.js#L90), [`dupValues.sort`](../../../apps/referidos-app/src/hooks/useCarousel.js#L96).
- **Lo usa** [`centerInitialItem`](../../../apps/referidos-app/src/hooks/useCarousel.js#L155) (llama), [`scroll`](../../../apps/referidos-app/src/hooks/useCarousel.js#L238) (llama).

#### [`getLoopGeometry`](../../../apps/referidos-app/src/hooks/useCarousel.js#L100) · callback React · dentro de [`useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js#L5)

Obtiene o resuelve `Loop Geometry` para entregarlo al consumidor.

- **Entradas** `items`.
- **Retorno visible o tipo declarado** `null`, `centerDup`, `centerStart`, `span`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `dupValues.length`, `ausencia de centerDup o ausencia de nextDup`, `ausencia de centerFirst o ausencia de nextFirst`, `ausencia de span`.
- **Llamadas directas en el cuerpo** [`filter`](../../../apps/referidos-app/src/hooks/useCarousel.js#L103), [`items.map`](../../../apps/referidos-app/src/hooks/useCarousel.js#L103), [`dupValues.sort`](../../../apps/referidos-app/src/hooks/useCarousel.js#L109), [`findFirst`](../../../apps/referidos-app/src/hooks/useCarousel.js#L120).
- **Lo usa** [`reanchorIfNeeded`](../../../apps/referidos-app/src/hooks/useCarousel.js#L206) (llama).

#### [`findFirst`](../../../apps/referidos-app/src/hooks/useCarousel.js#L114) · función · dentro de [`getLoopGeometry`](../../../apps/referidos-app/src/hooks/useCarousel.js#L100)

Obtiene o resuelve `First` para entregarlo al consumidor.

- **Entradas** `dup`.
- **Llamadas directas en el cuerpo** [`items.find`](../../../apps/referidos-app/src/hooks/useCarousel.js#L115).
- **Lo usa** [`getLoopGeometry`](../../../apps/referidos-app/src/hooks/useCarousel.js#L120) (llama).

#### [`centerItem`](../../../apps/referidos-app/src/hooks/useCarousel.js#L133) · callback React · dentro de [`useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js#L5)

Función auxiliar de `useCarousel` para `center Item`.

- **Entradas** `el`, `item`, `behavior = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `ausencia de el o ausencia de item`, `behavior`.
- **Llamadas directas en el cuerpo** [`clampScrollLeft`](../../../apps/referidos-app/src/hooks/useCarousel.js#L137), [`jumpTo`](../../../apps/referidos-app/src/hooks/useCarousel.js#L139), [`el.scrollTo`](../../../apps/referidos-app/src/hooks/useCarousel.js#L142).
- **Lo usa** [`centerInitialItem`](../../../apps/referidos-app/src/hooks/useCarousel.js#L163) (llama), [`scroll`](../../../apps/referidos-app/src/hooks/useCarousel.js#L255) (llama), [`scrollToStart`](../../../apps/referidos-app/src/hooks/useCarousel.js#L271) (llama), [`snapToClosest`](../../../apps/referidos-app/src/hooks/useCarousel.js#L306) (llama), [`ensureFinalSnap`](../../../apps/referidos-app/src/hooks/useCarousel.js#L323) (llama), [`useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js#L466) (referencia).

#### [`centerInitialItem`](../../../apps/referidos-app/src/hooks/useCarousel.js#L148) · callback React · dentro de [`useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js#L5)

Función auxiliar de `useCarousel` para `center Initial Item`.

- **Entradas** `behavior = valor por defecto`.
- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `ausencia de el`, `ausencia de items.length`, `loopEnabled`, `candidate`.
- **Llamadas directas en el cuerpo** [`getItems`](../../../apps/referidos-app/src/hooks/useCarousel.js#L151), [`getLoopCenterDup`](../../../apps/referidos-app/src/hooks/useCarousel.js#L155), [`items.find`](../../../apps/referidos-app/src/hooks/useCarousel.js#L156), [`centerItem`](../../../apps/referidos-app/src/hooks/useCarousel.js#L163).
- **Lo usa** [`scrollToStart`](../../../apps/referidos-app/src/hooks/useCarousel.js#L266) (llama), [`useLayoutEffect · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L279) (llama), [`useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js#L284) (referencia).

#### [`update`](../../../apps/referidos-app/src/hooks/useCarousel.js#L168) · callback React · dentro de [`useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js#L5)

Coordina cambios de estado durante `update`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setCanLeft`, `setCanRight`.
- **Condiciones que evalúa** `ausencia de el`, `ausencia de items.length`, `ausencia de closestAny`, `loopEnabled`.
- **Llamadas directas en el cuerpo** [`getItems`](../../../apps/referidos-app/src/hooks/useCarousel.js#L171), [`setCanLeft`](../../../apps/referidos-app/src/hooks/useCarousel.js#L174), [`setCanRight`](../../../apps/referidos-app/src/hooks/useCarousel.js#L175), [`getClosestItem`](../../../apps/referidos-app/src/hooks/useCarousel.js#L179).
- **Lo usa** [`useLayoutEffect · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L281) (llama), [`useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js#L284) (referencia), [`handleScroll`](../../../apps/referidos-app/src/hooks/useCarousel.js#L392) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L400) (llama).

#### [`reanchorIfNeeded`](../../../apps/referidos-app/src/hooks/useCarousel.js#L197) · callback React · dentro de [`useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js#L5)

Coordina cambios de estado durante `reanchor If Needed`.

- **Retorno visible o tipo declarado** `booleano`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `clearTimeout`.
- **Condiciones que evalúa** `ausencia de el`, `ausencia de readyRef.current o jumpingRef.current`, `interactingRef.current`, `idleFor`, `ausencia de items.length`, `ausencia de geometry`, `snapTimerRef.current`, `shiftCopies` y 1 más.
- **Llamadas directas en el cuerpo** [`performance.now`](../../../apps/referidos-app/src/hooks/useCarousel.js#L202), [`getItems`](../../../apps/referidos-app/src/hooks/useCarousel.js#L204), [`getLoopGeometry`](../../../apps/referidos-app/src/hooks/useCarousel.js#L206), [`clearTimeout`](../../../apps/referidos-app/src/hooks/useCarousel.js#L209), [`clampScrollLeft`](../../../apps/referidos-app/src/hooks/useCarousel.js#L217), [`jumpTo`](../../../apps/referidos-app/src/hooks/useCarousel.js#L221).
- **Lo usa** [`setTimeout · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L375) (llama), [`useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js#L471) (referencia).

#### [`scroll`](../../../apps/referidos-app/src/hooks/useCarousel.js#L232) · función · dentro de [`useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js#L5)

Función auxiliar de `useCarousel` para `scroll`.

- **Entradas** `dir`.
- **Condiciones que evalúa** `ausencia de el`, `ausencia de items.length`, `ausencia de closest`, `ausencia de loopEnabled`, `nextIndex`, `loopEnabled y centerDup`.
- **Llamadas directas en el cuerpo** [`getItems`](../../../apps/referidos-app/src/hooks/useCarousel.js#L236), [`getLoopCenterDup`](../../../apps/referidos-app/src/hooks/useCarousel.js#L238), [`getClosestItem`](../../../apps/referidos-app/src/hooks/useCarousel.js#L239), [`items.filter`](../../../apps/referidos-app/src/hooks/useCarousel.js#L251), [`centerItem`](../../../apps/referidos-app/src/hooks/useCarousel.js#L255).
- **Lo usa** [`useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js#L478) (referencia).

#### [`scrollToStart`](../../../apps/referidos-app/src/hooks/useCarousel.js#L262) · función · dentro de [`useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js#L5)

Función auxiliar de `useCarousel` para `scroll To Start`.

- **Condiciones que evalúa** `ausencia de el`, `loopEnabled`, `ausencia de items.length`.
- **Llamadas directas en el cuerpo** [`centerInitialItem`](../../../apps/referidos-app/src/hooks/useCarousel.js#L266), [`getItems`](../../../apps/referidos-app/src/hooks/useCarousel.js#L269), [`centerItem`](../../../apps/referidos-app/src/hooks/useCarousel.js#L271).
- **Lo usa** [`useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js#L478) (referencia).

#### [`useLayoutEffect · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L274) · callback de infraestructura · dentro de [`useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js#L5)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useCarousel`.

- **Efectos y APIs** `requestAnimationFrame`.
- **Condiciones que evalúa** `ausencia de el`.
- **Llamadas directas en el cuerpo** [`requestAnimationFrame`](../../../apps/referidos-app/src/hooks/useCarousel.js#L276), [`centerInitialItem`](../../../apps/referidos-app/src/hooks/useCarousel.js#L279), [`update`](../../../apps/referidos-app/src/hooks/useCarousel.js#L281), [`cancelAnimationFrame`](../../../apps/referidos-app/src/hooks/useCarousel.js#L283).

#### [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L286) · callback de infraestructura · dentro de [`useCarousel`](../../../apps/referidos-app/src/hooks/useCarousel.js#L5)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useCarousel`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `el.addEventListener`, `window.addEventListener`, `el.removeEventListener`, `window.removeEventListener`, `clearTimeout`.
- **Condiciones que evalúa** `ausencia de el`, `loopEnabled y ausencia de readyRef.current`, `snapTimerRef.current`, `reanchorTimerRef.current`, `finalSnapTimerRef.current`, `interactionTimerRef.current`.
- **Llamadas directas en el cuerpo** [`update`](../../../apps/referidos-app/src/hooks/useCarousel.js#L400), [`performance.now`](../../../apps/referidos-app/src/hooks/useCarousel.js#L402), [`el.addEventListener`](../../../apps/referidos-app/src/hooks/useCarousel.js#L406), [`window.addEventListener`](../../../apps/referidos-app/src/hooks/useCarousel.js#L439), [`el.removeEventListener`](../../../apps/referidos-app/src/hooks/useCarousel.js#L443), [`window.removeEventListener`](../../../apps/referidos-app/src/hooks/useCarousel.js#L450), [`clearTimeout`](../../../apps/referidos-app/src/hooks/useCarousel.js#L453).

#### [`snapToClosest`](../../../apps/referidos-app/src/hooks/useCarousel.js#L291) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L286)

Función auxiliar de `useEffect · callback` para `snap To Closest`.

- **Efectos y APIs** `requestAnimationFrame`.
- **Condiciones que evalúa** `ausencia de snap o snappingRef.current`, `loopEnabled y ausencia de readyRef.current`, `jumpingRef.current`, `skipSnapUntilRef.current`, `loopEnabled`, `interactingRef.current`, `idleFor`, `ausencia de items.length` y 1 más.
- **Llamadas directas en el cuerpo** [`performance.now`](../../../apps/referidos-app/src/hooks/useCarousel.js#L295), [`getItems`](../../../apps/referidos-app/src/hooks/useCarousel.js#L301), [`getClosestItem`](../../../apps/referidos-app/src/hooks/useCarousel.js#L303), [`centerItem`](../../../apps/referidos-app/src/hooks/useCarousel.js#L306), [`requestAnimationFrame`](../../../apps/referidos-app/src/hooks/useCarousel.js#L307).
- **Lo usa** [`setTimeout · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L338) (llama).

#### [`ensureFinalSnap`](../../../apps/referidos-app/src/hooks/useCarousel.js#L312) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L286)

Función auxiliar de `useEffect · callback` para `ensure Final Snap`.

- **Retorno visible o tipo declarado** `booleano`.
- **Efectos y APIs** `requestAnimationFrame`.
- **Condiciones que evalúa** `ausencia de loopEnabled o ausencia de snap`, `jumpingRef.current o snappingRef.current`, `interactingRef.current`, `idleFor`, `ausencia de items.length`, `ausencia de closest`.
- **Llamadas directas en el cuerpo** [`performance.now`](../../../apps/referidos-app/src/hooks/useCarousel.js#L316), [`getItems`](../../../apps/referidos-app/src/hooks/useCarousel.js#L318), [`getClosestItem`](../../../apps/referidos-app/src/hooks/useCarousel.js#L320), [`centerItem`](../../../apps/referidos-app/src/hooks/useCarousel.js#L323), [`requestAnimationFrame`](../../../apps/referidos-app/src/hooks/useCarousel.js#L324).
- **Lo usa** [`setTimeout · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L358) (llama).

#### [`scheduleSnap`](../../../apps/referidos-app/src/hooks/useCarousel.js#L330) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L286)

Coordina `Snap` con la planificación o reintento del flujo.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `clearTimeout`, `setTimeout`.
- **Condiciones que evalúa** `ausencia de snap`, `loopEnabled y ausencia de readyRef.current`, `skipSnapUntilRef.current`, `snapTimerRef.current`.
- **Llamadas directas en el cuerpo** [`performance.now`](../../../apps/referidos-app/src/hooks/useCarousel.js#L333), [`clearTimeout`](../../../apps/referidos-app/src/hooks/useCarousel.js#L335), [`setTimeout`](../../../apps/referidos-app/src/hooks/useCarousel.js#L337).
- **Lo usa** [`setTimeout · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L341) (llama), [`handleScroll`](../../../apps/referidos-app/src/hooks/useCarousel.js#L394) (llama), [`handleRelease`](../../../apps/referidos-app/src/hooks/useCarousel.js#L428) (llama).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L337) · callback de infraestructura · dentro de [`scheduleSnap`](../../../apps/referidos-app/src/hooks/useCarousel.js#L330)

Ejecuta trabajo diferido o periódico iniciado por `scheduleSnap`.

- **Condiciones que evalúa** `loopEnabled`, `interactingRef.current`, `idleFor`.
- **Llamadas directas en el cuerpo** [`snapToClosest`](../../../apps/referidos-app/src/hooks/useCarousel.js#L338), [`scheduleSnap`](../../../apps/referidos-app/src/hooks/useCarousel.js#L341), [`performance.now`](../../../apps/referidos-app/src/hooks/useCarousel.js#L344).

#### [`scheduleFinalSnap`](../../../apps/referidos-app/src/hooks/useCarousel.js#L352) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L286)

Coordina `Final Snap` con la planificación o reintento del flujo.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `clearTimeout`, `setTimeout`.
- **Condiciones que evalúa** `ausencia de loopEnabled`, `finalSnapTimerRef.current`.
- **Llamadas directas en el cuerpo** [`clearTimeout`](../../../apps/referidos-app/src/hooks/useCarousel.js#L355), [`setTimeout`](../../../apps/referidos-app/src/hooks/useCarousel.js#L357).
- **Lo usa** [`setTimeout · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L360) (llama), [`setTimeout · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L379) (llama), [`handleScroll`](../../../apps/referidos-app/src/hooks/useCarousel.js#L397) (llama), [`handleRelease`](../../../apps/referidos-app/src/hooks/useCarousel.js#L431) (llama).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L357) · callback de infraestructura · dentro de [`scheduleFinalSnap`](../../../apps/referidos-app/src/hooks/useCarousel.js#L352)

Ejecuta trabajo diferido o periódico iniciado por `scheduleFinalSnap`.

- **Condiciones que evalúa** `ausencia de done`.
- **Llamadas directas en el cuerpo** [`ensureFinalSnap`](../../../apps/referidos-app/src/hooks/useCarousel.js#L358), [`scheduleFinalSnap`](../../../apps/referidos-app/src/hooks/useCarousel.js#L360).

#### [`scheduleReanchor`](../../../apps/referidos-app/src/hooks/useCarousel.js#L365) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L286)

Coordina `Reanchor` con la planificación o reintento del flujo.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `clearTimeout`, `setTimeout`.
- **Condiciones que evalúa** `ausencia de loopEnabled`, `reanchorTimerRef.current`.
- **Llamadas directas en el cuerpo** [`clearTimeout`](../../../apps/referidos-app/src/hooks/useCarousel.js#L368), [`setTimeout`](../../../apps/referidos-app/src/hooks/useCarousel.js#L370).
- **Lo usa** [`setTimeout · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L372) (llama), [`handleScroll`](../../../apps/referidos-app/src/hooks/useCarousel.js#L396) (llama), [`handleRelease`](../../../apps/referidos-app/src/hooks/useCarousel.js#L430) (llama).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L370) · callback de infraestructura · dentro de [`scheduleReanchor`](../../../apps/referidos-app/src/hooks/useCarousel.js#L365)

Ejecuta trabajo diferido o periódico iniciado por `scheduleReanchor`.

- **Condiciones que evalúa** `snappingRef.current o jumpingRef.current`, `ausencia de done`.
- **Llamadas directas en el cuerpo** [`scheduleReanchor`](../../../apps/referidos-app/src/hooks/useCarousel.js#L372), [`reanchorIfNeeded`](../../../apps/referidos-app/src/hooks/useCarousel.js#L375), [`scheduleFinalSnap`](../../../apps/referidos-app/src/hooks/useCarousel.js#L379).

#### [`handleScroll`](../../../apps/referidos-app/src/hooks/useCarousel.js#L383) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L286)

Maneja `Scroll` y coordina las acciones indicadas abajo.

- **Condiciones que evalúa** `ausencia de loopEnabled`.
- **Llamadas directas en el cuerpo** [`performance.now`](../../../apps/referidos-app/src/hooks/useCarousel.js#L384), [`update`](../../../apps/referidos-app/src/hooks/useCarousel.js#L392), [`scheduleSnap`](../../../apps/referidos-app/src/hooks/useCarousel.js#L394), [`scheduleReanchor`](../../../apps/referidos-app/src/hooks/useCarousel.js#L396), [`scheduleFinalSnap`](../../../apps/referidos-app/src/hooks/useCarousel.js#L397).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L406) (referencia).

#### [`handleInteract`](../../../apps/referidos-app/src/hooks/useCarousel.js#L407) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L286)

Maneja `Interact` y coordina las acciones indicadas abajo.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `clearTimeout`, `setTimeout`.
- **Condiciones que evalúa** `interactionTimerRef.current`, `event.type`.
- **Llamadas directas en el cuerpo** [`onInteract`](../../../apps/referidos-app/src/hooks/useCarousel.js#L408), [`clearTimeout`](../../../apps/referidos-app/src/hooks/useCarousel.js#L411), [`setTimeout`](../../../apps/referidos-app/src/hooks/useCarousel.js#L415).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L433) (referencia).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L415) · callback de infraestructura · dentro de [`handleInteract`](../../../apps/referidos-app/src/hooks/useCarousel.js#L407)

Ejecuta trabajo diferido o periódico iniciado por `handleInteract`.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`handleRelease`](../../../apps/referidos-app/src/hooks/useCarousel.js#L421) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L286)

Maneja el valor de release y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `clearTimeout`.
- **Condiciones que evalúa** `interactionTimerRef.current`, `loopEnabled`.
- **Llamadas directas en el cuerpo** [`clearTimeout`](../../../apps/referidos-app/src/hooks/useCarousel.js#L424), [`scheduleSnap`](../../../apps/referidos-app/src/hooks/useCarousel.js#L428), [`scheduleReanchor`](../../../apps/referidos-app/src/hooks/useCarousel.js#L430), [`scheduleFinalSnap`](../../../apps/referidos-app/src/hooks/useCarousel.js#L431).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useCarousel.js#L436) (referencia).

### [`apps/referidos-app/src/hooks/useMfaGate.js`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L1)

Determina si el TOTP presente bloquea la acción o la ruta y coordina la presentación del modal de verificación.

**Superficie que exporta.** [`useMfaGate`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L6).

**Módulos que lo cargan.** [`AppGate.jsx`](../../../apps/referidos-app/src/pages/AppGate.jsx#L7) (importa), [`RequireAuth.jsx`](../../../apps/referidos-app/src/router/guards/RequireAuth.jsx#L4) (importa).

**Dependencias del archivo.** `react`, [`../modals/useModal`](../../../apps/referidos-app/src/modals/useModal.js), [`../store/appStore`](../../../apps/referidos-app/src/store/appStore.js), [`../services/mfaService`](../../../apps/referidos-app/src/services/mfaService.js).

#### [`useMfaGate`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L6) · hook React · exportación por defecto

Agrupa estado, contexto o efectos de `Mfa Gate` para sus consumidores React.

- **Entradas** `{enabled} = valor por defecto`.
- **Retorno visible o tipo declarado** `checking`, `required`, `blockAccess`, `refresh`.
- **Estado o valores vinculados** `usuario mediante useAppStore`, `selector s.usuario`, `bootstrap mediante useAppStore`, `selector s.bootstrap`, `logout mediante useAppStore`, `selector s.logout`, `[checking, setChecking] mediante useState`, `[required, setRequired] mediante useState`, `mountedRef mediante useRef`.
- **Hooks que llama** `useAppStore`, `useModal`, `useState`, `useRef`, `useEffect`.
- **Usa código de** [`useAppStore`](../../../apps/referidos-app/src/store/appStore.js#L87) (llama), [`useModal`](../../../apps/referidos-app/src/modals/useModal.js#L4) (llama).
- **Lo usa** [`AppGate`](../../../apps/referidos-app/src/pages/AppGate.jsx#L40) (llama), [`RequireAuth`](../../../apps/referidos-app/src/router/guards/RequireAuth.jsx#L9) (llama).

#### [`resetGate`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L15) · callback React · dentro de [`useMfaGate`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L6)

Limpia o restablece `Gate` como parte de este flujo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setRequired`, `setChecking`.
- **Llamadas directas en el cuerpo** [`setRequired`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L16), [`setChecking`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L17).
- **Lo usa** [`resolveGate`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L23) (llama).

#### [`resolveGate`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L20) · callback React · asíncrona · dentro de [`useMfaGate`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L6)

Obtiene o resuelve `Gate` para entregarlo al consumidor.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setChecking`, `setRequired`.
- **Condiciones que evalúa** `ausencia de enabled o bootstrap o undefined`, `ausencia de usuario`, `ausencia de mountedRef.current`, `ausencia de result.ok`.
- **Usa código de** [`getMfaAssuranceLevel`](../../../apps/referidos-app/src/services/mfaService.js#L7) (llama).
- **Llamadas directas en el cuerpo** [`resetGate`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L23), [`setChecking`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L27), [`getMfaAssuranceLevel`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L28), [`setRequired`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L32).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L43) (llama), [`useMfaGate`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L47) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L41) · callback de infraestructura · dentro de [`useMfaGate`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L6)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useMfaGate`.

- **Llamadas directas en el cuerpo** [`resolveGate`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L43).

#### [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L49) · callback de infraestructura · dentro de [`useMfaGate`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L6)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useMfaGate`.

- **Efectos y APIs** `openModal`.
- **Condiciones que evalúa** `ausencia de required`, `activeModal`.
- **Llamadas directas en el cuerpo** [`openModal`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L52).

#### [`onVerified`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L53) · función · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L49)

Maneja `Verified` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setRequired`.
- **Llamadas directas en el cuerpo** [`setRequired`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L54).

#### [`onCancel`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L56) · función · asíncrona · dentro de [`useEffect · callback`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L49)

Maneja `Cancel` y coordina las acciones indicadas abajo.

- **Llamadas directas en el cuerpo** [`logout`](../../../apps/referidos-app/src/hooks/useMfaGate.js#L57).

### [`apps/referidos-app/src/hooks/usePinSetup.js`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L1)

Controla alta o reemplazo de PIN, validación de interfaz y almacenamiento de su hash.

**Superficie que exporta.** [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L3).

**Módulos que lo cargan.** [`ModalAccessMethods.jsx`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L5) (importa), [`ClientePerfil.jsx`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L33) (importa), [`NegocioPerfil.jsx`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L32) (importa).

**Dependencias del archivo.** `react`.

#### [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L3) · hook React · exportación por defecto

Agrupa estado, contexto o efectos de `Pin Setup` para sus consumidores React.

- **Entradas** `{onSavePin} = valor por defecto`.
- **Retorno visible o tipo declarado** `pinValue`, `pinSlots`, `pinReveal`, `pinStep`, `pinComplete`, `pinMatches`, `saving`, `error`, `pinFocused`, `setPinFocus`, `setError`, `updatePinSlot`, `updatePinValueDirect`, `handlePinKeyDown`, `handlePinFocus`, `registerPinRef`, `registerHiddenRef`, `resetPinForm` y 4 más.
- **Estado o valores vinculados** `[pinValue, setPinValue] mediante useState`, `[pinFirst, setPinFirst] mediante useState`, `[pinStep, setPinStep] mediante useState`, `[pinReveal, setPinReveal] mediante useState`, `[saving, setSaving] mediante useState`, `[error, setError] mediante useState`, `[pinFocused, setPinFocus] mediante useState`, `pinValueRef mediante useRef`, `pinInputRefs mediante useRef`, `hiddenInputRef mediante useRef`, `pinRevealTimersRef mediante useRef`, `focusLockRef mediante useRef`.
- **Hooks que llama** `useState`, `useRef`, `useEffect`.
- **Llamadas directas en el cuerpo** [`pinSlots.every`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L25).
- **Lo usa** [`ModalAccessMethods`](../../../apps/referidos-app/src/components/modals/ModalAccessMethods.jsx#L99) (llama), [`AccessPanel`](../../../apps/referidos-app/src/profile/cliente/ClientePerfil.jsx#L716) (llama), [`AccessPanel`](../../../apps/referidos-app/src/profile/negocio/NegocioPerfil.jsx#L699) (llama).

#### [`sanitizedPin`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L18) · cálculo memorizado · dentro de [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L3)

Normaliza `d Pin` antes de validarlo, mostrarlo o enviarlo.

- **Hooks que llama** `useMemo`.
- **Efectos y APIs** `pinValue.replace`.
- **Llamadas directas en el cuerpo** [`slice`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L18), [`pinValue.replace`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L18).
- **Lo usa** [`pinSlots`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L22) (accede al módulo).

#### [`pinSlots`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L22) · cálculo memorizado · dentro de [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L3)

Función auxiliar de `usePinSetup` para `pin Slots`.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`map`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L22), [`fill`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L22).
- **Lo usa** [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L25) (accede al módulo), [`getFirstEmptyPinIndex`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L28) (accede al módulo), [`getLastFilledPinIndex`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L30) (accede al módulo), [`updatePinSlot`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L98) (referencia), [`handlePinKeyDown`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L121) (referencia).

#### [`getFirstEmptyPinIndex`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L28) · función · dentro de [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L3)

Obtiene o resuelve `First Empty Pin Index` para entregarlo al consumidor.

- **Llamadas directas en el cuerpo** [`pinSlots.findIndex`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L28).
- **Lo usa** [`updatePinSlot`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L99) (llama), [`handlePinFocus`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L133) (llama).

#### [`getLastFilledPinIndex`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L29) · función · dentro de [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L3)

Obtiene o resuelve `Last Filled Pin Index` para entregarlo al consumidor.

- **Condiciones que evalúa** `pinSlots.i`.
- **Lo usa** [`handlePinKeyDown`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L119) (llama).

#### [`focusPinInput`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L36) · callback React · dentro de [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L3)

Función auxiliar de `usePinSetup` para `focus Pin Input`.

- **Entradas** `index`.
- **Hooks que llama** `useCallback`.
- **Efectos y APIs** `window.requestAnimationFrame`.
- **Condiciones que evalúa** `ausencia de input`.
- **Llamadas directas en el cuerpo** [`window.requestAnimationFrame`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L38), [`input.focus`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L42).
- **Lo usa** [`updatePinSlot`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L110) (llama), [`handlePinKeyDown`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L124) (llama), [`handlePinFocus`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L135) (llama), [`handlePinNext`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L168) (llama), [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L223) (referencia).

#### [`focusHiddenInput`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L49) · callback React · dentro de [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L3)

Función auxiliar de `usePinSetup` para `focus Hidden Input`.

- **Hooks que llama** `useCallback`.
- **Condiciones que evalúa** `ausencia de input`.
- **Llamadas directas en el cuerpo** [`input.focus`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L53).
- **Lo usa** [`handlePinNext`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L166) (llama), [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L224) (referencia).

#### [`setPinRevealIndex`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L59) · callback React · dentro de [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L3)

Aplica o guarda `Pin Reveal Index` para que el estado refleje la operación.

- **Entradas** `index`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setPinReveal`, `clearTimeout`.
- **Efectos y APIs** `clearTimeout`, `setTimeout`.
- **Condiciones que evalúa** `pinRevealTimersRef.current.index`.
- **Llamadas directas en el cuerpo** [`setPinReveal`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L60), [`clearTimeout`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L66), [`setTimeout`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L68).
- **Lo usa** [`updatePinValueDirect`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L85) (llama), [`updatePinSlot`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L104) (llama).

#### [`setTimeout · callback`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L68) · callback de infraestructura · dentro de [`setPinRevealIndex`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L59)

Ejecuta trabajo diferido o periódico iniciado por `setPinRevealIndex`.

- **Actualizaciones de estado o acciones** `setPinReveal`.
- **Llamadas directas en el cuerpo** [`setPinReveal`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L69).

#### [`updatePinValueDirect`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L78) · callback React · dentro de [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L3)

Aplica o guarda `Pin Value Direct` para que el estado refleje la operación.

- **Entradas** `nextValue`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setPinRevealIndex`, `setPinValue`.
- **Efectos y APIs** `replace`.
- **Condiciones que evalúa** `nextClean.length`.
- **Llamadas directas en el cuerpo** [`slice`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L79), [`replace`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L79), [`setPinRevealIndex`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L85), [`setPinValue`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L89).
- **Lo usa** [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L215) (referencia).

#### [`updatePinSlot`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L94) · función · dentro de [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L3)

Aplica o guarda `Pin Slot` para que el estado refleje la operación.

- **Entradas** `nextValue`.
- **Actualizaciones de estado o acciones** `setPinRevealIndex`, `setPinValue`.
- **Efectos y APIs** `replace`.
- **Condiciones que evalúa** `ausencia de cleaned`, `cursor`.
- **Llamadas directas en el cuerpo** [`replace`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L95), [`cleaned.split`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L97), [`getFirstEmptyPinIndex`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L99), [`chars.forEach`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L101), [`setPinRevealIndex`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L104), [`setPinValue`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L108), [`nextSlots.join`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L108), [`focusPinInput`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L110), [`pinInputRefs.current.blur`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L112).
- **Lo usa** [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L214) (referencia).

#### [`handlePinKeyDown`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L116) · función · dentro de [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L3)

Maneja `Pin Key Down` y coordina las acciones indicadas abajo.

- **Entradas** `event`.
- **Actualizaciones de estado o acciones** `setPinValue`.
- **Condiciones que evalúa** `event.key`, `lastFilled`.
- **Llamadas directas en el cuerpo** [`event.preventDefault`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L118), [`getLastFilledPinIndex`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L119), [`setPinValue`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L123), [`nextSlots.join`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L123), [`focusPinInput`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L124).
- **Lo usa** [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L216) (referencia).

#### [`handlePinFocus`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L128) · función · dentro de [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L3)

Maneja `Pin Focus` y coordina las acciones indicadas abajo.

- **Entradas** `index`.
- **Condiciones que evalúa** `focusLockRef.current`, `firstEmpty o index`.
- **Llamadas directas en el cuerpo** [`getFirstEmptyPinIndex`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L133), [`focusPinInput`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L135).
- **Lo usa** [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L217) (referencia).

#### [`registerPinRef`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L138) · función · dentro de [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L3)

Aplica o guarda `Pin Ref` para que el estado refleje la operación.

- **Entradas** `index`.
- **Lo usa** [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L218) (referencia).

#### [`registerHiddenRef`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L142) · función · dentro de [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L3)

Aplica o guarda `Hidden Ref` para que el estado refleje la operación.

- **Entradas** `el`.
- **Lo usa** [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L219) (referencia).

#### [`resetPinForm`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L146) · callback React · dentro de [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L3)

Limpia o restablece `Pin Form` como parte de este flujo.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setPinValue`, `setPinFirst`, `setPinStep`, `setPinReveal`, `setError`, `clearTimeout`.
- **Efectos y APIs** `clearTimeout`.
- **Condiciones que evalúa** `timer`.
- **Llamadas directas en el cuerpo** [`setPinValue`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L147), [`setPinFirst`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L148), [`setPinStep`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L149), [`setPinReveal`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L150), [`setError`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L151), [`pinRevealTimersRef.current.forEach`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L152), [`clearTimeout`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L153), [`document.activeElement.blur`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L156).
- **Lo usa** [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L220) (referencia).

#### [`handlePinNext`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L159) · función · dentro de [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L3)

Maneja `Pin Next` y coordina las acciones indicadas abajo.

- **Actualizaciones de estado o acciones** `setPinFirst`, `setPinValue`, `setPinStep`, `setPinReveal`.
- **Condiciones que evalúa** `ausencia de pinComplete`, `hiddenInputRef.current`.
- **Llamadas directas en el cuerpo** [`setPinFirst`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L161), [`setPinValue`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L162), [`setPinStep`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L163), [`setPinReveal`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L164), [`focusHiddenInput`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L166), [`focusPinInput`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L168).
- **Lo usa** [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L221) (referencia).

#### [`handlePinConfirm`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L172) · callback React · asíncrona · dentro de [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L3)

Maneja `Pin Confirm` y coordina las acciones indicadas abajo.

- **Retorno visible o tipo declarado** `ok`.
- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setSaving`, `setError`.
- **Condiciones que evalúa** `ausencia de pinComplete o ausencia de pinMatches o saving`, `onSavePin`, `ausencia de result.ok`.
- **Llamadas directas en el cuerpo** [`setSaving`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L174), [`setError`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L175), [`onSavePin`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L178).
- **Lo usa** [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L222) (referencia).

#### [`useEffect · callback`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L190) · callback de infraestructura · dentro de [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L3)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `usePinSetup`.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

#### [`useEffect · callback`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L194) · callback de infraestructura · dentro de [`usePinSetup`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L3)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `usePinSetup`.

- **Actualizaciones de estado o acciones** `clearTimeout`.
- **Efectos y APIs** `clearTimeout`.
- **Condiciones que evalúa** `timer`.
- **Llamadas directas en el cuerpo** [`pinRevealTimersRef.current.forEach`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L196), [`clearTimeout`](../../../apps/referidos-app/src/hooks/usePinSetup.js#L197).

### [`apps/referidos-app/src/hooks/usePromoSearch.js`](../../../apps/referidos-app/src/hooks/usePromoSearch.js#L1)

Filtra el listado en memoria por texto y características elegidas en la interfaz.

**Superficie que exporta.** [`usePromoSearch`](../../../apps/referidos-app/src/hooks/usePromoSearch.js#L1).

**Módulos que lo cargan.** [`ClienteInicio.jsx`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L14) (importa).

#### [`usePromoSearch`](../../../apps/referidos-app/src/hooks/usePromoSearch.js#L1) · hook React · exportado

Agrupa estado, contexto o efectos de `Promo Search` para sus consumidores React.

- **Entradas** `query = valor por defecto`.
- **Retorno visible o tipo declarado** `filterPromos`.
- **Lo usa** [`ClienteInicio`](../../../apps/referidos-app/src/cliente/inicio/ClienteInicio.jsx#L54) (llama).

#### [`filterPromos`](../../../apps/referidos-app/src/hooks/usePromoSearch.js#L2) · función · dentro de [`usePromoSearch`](../../../apps/referidos-app/src/hooks/usePromoSearch.js#L1)

Procesa el valor de promociones según el criterio del módulo.

- **Entradas** `promos`.
- **Condiciones que evalúa** `ausencia de query.trim`.
- **Llamadas directas en el cuerpo** [`query.trim`](../../../apps/referidos-app/src/hooks/usePromoSearch.js#L3), [`query.toLowerCase`](../../../apps/referidos-app/src/hooks/usePromoSearch.js#L5), [`promos.filter`](../../../apps/referidos-app/src/hooks/usePromoSearch.js#L7), [`toLowerCase`](../../../apps/referidos-app/src/hooks/usePromoSearch.js#L8), [`titulo.includes`](../../../apps/referidos-app/src/hooks/usePromoSearch.js#L14), [`descripcion.includes`](../../../apps/referidos-app/src/hooks/usePromoSearch.js#L15), [`local.includes`](../../../apps/referidos-app/src/hooks/usePromoSearch.js#L16), [`sector.includes`](../../../apps/referidos-app/src/hooks/usePromoSearch.js#L17).
- **Lo usa** [`usePromoSearch`](../../../apps/referidos-app/src/hooks/usePromoSearch.js#L22) (referencia).

### [`apps/referidos-app/src/hooks/useSearchDock.js`](../../../apps/referidos-app/src/hooks/useSearchDock.js#L1)

Coordina apertura y estado de los controles de búsqueda puestos en una barra de interfaz.

**Superficie que exporta.** [`useSearchDock`](../../../apps/referidos-app/src/hooks/useSearchDock.js#L3).

**Dependencias del archivo.** `react`.

#### [`useSearchDock`](../../../apps/referidos-app/src/hooks/useSearchDock.js#L3) · hook React · exportado

Obtiene o resuelve `Dock` para entregarlo al consumidor.

- **Entradas** `{headerId, heroSelector, heroSearchSelector, scrollContainerId, dockOffset} = valor por defecto`.
- **Retorno visible o tipo declarado** `docked`, `heroVisible`.
- **Estado o valores vinculados** `[docked, setDocked] mediante useState`, `[heroVisible, setHeroVisible] mediante useState`.
- **Hooks que llama** `useState`, `useLayoutEffect`.

#### [`update`](../../../apps/referidos-app/src/hooks/useSearchDock.js#L13) · callback React · dentro de [`useSearchDock`](../../../apps/referidos-app/src/hooks/useSearchDock.js#L3)

Coordina cambios de estado durante `update`.

- **Hooks que llama** `useCallback`.
- **Actualizaciones de estado o acciones** `setDocked`, `setHeroVisible`.
- **Condiciones que evalúa** `ausencia de headerEl o ausencia de heroEl`.
- **Llamadas directas en el cuerpo** [`document.getElementById`](../../../apps/referidos-app/src/hooks/useSearchDock.js#L14), [`document.querySelector`](../../../apps/referidos-app/src/hooks/useSearchDock.js#L15), [`setDocked`](../../../apps/referidos-app/src/hooks/useSearchDock.js#L18), [`setHeroVisible`](../../../apps/referidos-app/src/hooks/useSearchDock.js#L19), [`getBoundingClientRect`](../../../apps/referidos-app/src/hooks/useSearchDock.js#L24).
- **Lo usa** [`useLayoutEffect · callback`](../../../apps/referidos-app/src/hooks/useSearchDock.js#L34) (llama), [`useSearchDock`](../../../apps/referidos-app/src/hooks/useSearchDock.js#L51) (referencia).

#### [`useLayoutEffect · callback`](../../../apps/referidos-app/src/hooks/useSearchDock.js#L33) · callback de infraestructura · dentro de [`useSearchDock`](../../../apps/referidos-app/src/hooks/useSearchDock.js#L3)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useSearchDock`.

- **Efectos y APIs** `scrollContainer.addEventListener`, `window.addEventListener`, `scrollContainer.removeEventListener`, `window.removeEventListener`.
- **Condiciones que evalúa** `scrollContainer`.
- **Llamadas directas en el cuerpo** [`update`](../../../apps/referidos-app/src/hooks/useSearchDock.js#L34), [`document.getElementById`](../../../apps/referidos-app/src/hooks/useSearchDock.js#L36), [`scrollContainer.addEventListener`](../../../apps/referidos-app/src/hooks/useSearchDock.js#L40), [`window.addEventListener`](../../../apps/referidos-app/src/hooks/useSearchDock.js#L42), [`scrollContainer.removeEventListener`](../../../apps/referidos-app/src/hooks/useSearchDock.js#L46), [`window.removeEventListener`](../../../apps/referidos-app/src/hooks/useSearchDock.js#L48).
