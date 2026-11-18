# Prelaunch · Rendimiento

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/prelaunch/src/performance/DeferredRender.jsx`](../../../apps/prelaunch/src/performance/DeferredRender.jsx#L1)
- [`apps/prelaunch/src/performance/useSectionAssetsReady.js`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L1)

## Símbolos y conexiones

### [`apps/prelaunch/src/performance/DeferredRender.jsx`](../../../apps/prelaunch/src/performance/DeferredRender.jsx#L1)

Pospone el montaje de secciones pesadas hasta que corresponda según visibilidad o fallback. Mantiene un espacio de transición para el contenido diferido.

**Superficie que exporta.** [`DeferredRender`](../../../apps/prelaunch/src/performance/DeferredRender.jsx#L13).

**Módulos que lo cargan.** [`DesktopWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/desktop/DesktopWaitlistLandingPage.jsx#L2) (importa), [`MobileWaitlistLandingPage.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L3) (importa).

**Dependencias del archivo.** `react`.

#### [`buildPlaceholderStyle`](../../../apps/prelaunch/src/performance/DeferredRender.jsx#L3) · función

Construye `Placeholder Style` a partir de los datos del flujo.

- **Entradas** `placeholderHeight`.
- **Retorno visible o tipo declarado** `minHeight`.
- **Condiciones que evalúa** `ausencia de placeholderHeight`.
- **Lo usa** [`renderPlaceholder`](../../../apps/prelaunch/src/performance/DeferredRender.jsx#L35) (llama).

#### [`DeferredRender`](../../../apps/prelaunch/src/performance/DeferredRender.jsx#L13) · componente React · exportación por defecto

Monta `Suspense`. Las props y el estado determinan el contenido de esta vista.

- **Entradas** `{children, rootMargin, placeholderAs, placeholderId, placeholderClassName, placeholderHeight, placeholderContent, fallback, immediate}`.
- **Retorno visible o tipo declarado** `JSX`.
- **Estado o valores vinculados** `[shouldRender, setShouldRender] mediante useState`, `placeholderRef mediante useRef`.
- **Interfaz que monta** `Suspense`.
- **Hooks que llama** `useState`, `useRef`, `useEffect`.
- **Condiciones que evalúa** `shouldRender`.
- **Llamadas directas en el cuerpo** [`renderPlaceholder`](../../../apps/prelaunch/src/performance/DeferredRender.jsx#L71).
- **Lo usa** [`DesktopWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/desktop/DesktopWaitlistLandingPage.jsx#L284) (renderiza), [`MobileWaitlistLandingPage`](../../../apps/prelaunch/src/waitlist-landing/mobile/MobileWaitlistLandingPage.jsx#L319) (renderiza).

#### [`renderPlaceholder`](../../../apps/prelaunch/src/performance/DeferredRender.jsx#L28) · función · dentro de [`DeferredRender`](../../../apps/prelaunch/src/performance/DeferredRender.jsx#L13)

Prepara contenido JSX usando `PlaceholderTag`.

- **Entradas** `ref = valor por defecto`.
- **Retorno visible o tipo declarado** `JSX`.
- **Interfaz que monta** `PlaceholderTag`.
- **Llamadas directas en el cuerpo** [`buildPlaceholderStyle`](../../../apps/prelaunch/src/performance/DeferredRender.jsx#L35).
- **Lo usa** [`DeferredRender`](../../../apps/prelaunch/src/performance/DeferredRender.jsx#L71) (llama).

#### [`useEffect · callback`](../../../apps/prelaunch/src/performance/DeferredRender.jsx#L42) · callback de infraestructura · dentro de [`DeferredRender`](../../../apps/prelaunch/src/performance/DeferredRender.jsx#L13)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `DeferredRender`.

- **Actualizaciones de estado o acciones** `setShouldRender`.
- **Condiciones que evalúa** `shouldRender`, `ausencia de node o undefined`, `entries.some`.
- **Llamadas directas en el cuerpo** [`setShouldRender`](../../../apps/prelaunch/src/performance/DeferredRender.jsx#L49), [`entries.some`](../../../apps/prelaunch/src/performance/DeferredRender.jsx#L55), [`observer.disconnect`](../../../apps/prelaunch/src/performance/DeferredRender.jsx#L57), [`observer.observe`](../../../apps/prelaunch/src/performance/DeferredRender.jsx#L66).

### [`apps/prelaunch/src/performance/useSectionAssetsReady.js`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L1)

Coordina la carga de recursos de una sección y expone cuándo iniciar transición o mostrar contenido.

**Superficie que exporta.** [`useSectionAssetsReady`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L34).

**Módulos que lo cargan.** [`DesktopHeroSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/desktop/sections/DesktopHeroSection.jsx#L2) (importa), [`DesktopWaitlistSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/desktop/sections/DesktopWaitlistSection.jsx#L3) (importa), [`DesktopWaitlistStepsSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/desktop/sections/DesktopWaitlistStepsSection.jsx#L3) (importa), [`MobileFooterSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L5) (importa), [`MobileHeroSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L4) (importa), [`MobileWaitlistSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistSection.jsx#L3) (importa), [`MobileWaitlistStepsSection.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistStepsSection.jsx#L3) (importa).

**Dependencias del archivo.** `react`.

#### [`SECTION_ASSET_TIMEOUT_MS`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L3) · variable de módulo

Declara `SECTION_ASSET_TIMEOUT_MS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`useEffect · callback`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L85) (referencia).

#### [`waitForImageLoad`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L5) · función

Coordina `For Image Load` con la planificación o reintento del flujo.

- **Entradas** `image`.
- **Efectos y APIs** `image.addEventListener`.
- **Condiciones que evalúa** `image.complete y image.naturalWidth`.
- **Llamadas directas en el cuerpo** [`image.addEventListener`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L17).
- **Lo usa** [`waitForImageReady`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L23) (llama).

#### [`handleDone`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L11) · función · dentro de [`waitForImageLoad`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L5)

Maneja `Done` y coordina las acciones indicadas abajo.

- **Efectos y APIs** `image.removeEventListener`.
- **Llamadas directas en el cuerpo** [`image.removeEventListener`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L12), [`resolve`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L14).
- **Lo usa** [`waitForImageLoad`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L17) (referencia).

#### [`waitForImageReady`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L22) · función · asíncrona

Coordina `For Image Ready` con la planificación o reintento del flujo.

- **Entradas** `image`.
- **Condiciones que evalúa** `function`.
- **Llamadas directas en el cuerpo** [`waitForImageLoad`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L23), [`image.decode`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L27).
- **Lo usa** [`useEffect · callback`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L88) (llama).

#### [`useSectionAssetsReady`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L34) · hook React · exportación por defecto

Agrupa estado, contexto o efectos de `Section Assets Ready` para sus consumidores React.

- **Entradas** `sectionRef`, `deps = valor por defecto`, `extraAssetSrcs = valor por defecto`.
- **Estado o valores vinculados** `[isReady, setIsReady] mediante useState`.
- **Hooks que llama** `useState`, `useEffect`.
- **Lo usa** [`DesktopHeroSection`](../../../apps/prelaunch/src/waitlist-landing/desktop/sections/DesktopHeroSection.jsx#L16) (llama), [`DesktopWaitlistSection`](../../../apps/prelaunch/src/waitlist-landing/desktop/sections/DesktopWaitlistSection.jsx#L18) (llama), [`DesktopWaitlistStepsSection`](../../../apps/prelaunch/src/waitlist-landing/desktop/sections/DesktopWaitlistStepsSection.jsx#L10) (llama), [`MobileFooterSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileFooterSection.jsx#L18) (llama), [`MobileHeroSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileHeroSection.jsx#L24) (llama), [`MobileWaitlistSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistSection.jsx#L18) (llama), [`MobileWaitlistStepsSection`](../../../apps/prelaunch/src/waitlist-landing/mobile/sections/MobileWaitlistStepsSection.jsx#L11) (llama).

#### [`normalizedExtraAssetSrcs`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L37) · cálculo memorizado · dentro de [`useSectionAssetsReady`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L34)

Normaliza `d Extra Asset Srcs` antes de validarlo, mostrarlo o enviarlo.

- **Hooks que llama** `useMemo`.
- **Llamadas directas en el cuerpo** [`extraAssetSrcs.filter`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L37).
- **Lo usa** [`useEffect · callback`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L56) (accede al módulo), [`useSectionAssetsReady`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L104) (referencia).

#### [`useEffect · callback`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L41) · callback de infraestructura · dentro de [`useSectionAssetsReady`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L34)

Sincroniza esta vista con el ciclo de vida o el cambio de dependencias del efecto en `useSectionAssetsReady`.

- **Actualizaciones de estado o acciones** `setIsReady`, `clearTimeout`.
- **Efectos y APIs** `window.setTimeout`, `window.clearTimeout`.
- **Condiciones que evalúa** `ausencia de node`, `timeoutId`, `rafId`.
- **Llamadas directas en el cuerpo** [`setIsReady`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L44), [`node.querySelectorAll`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L52), [`filter`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L54), [`images.map`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L54), [`map`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L56), [`normalizedExtraAssetSrcs.filter`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L56), [`seenAssetSrcs.has`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L57), [`window.setTimeout`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L83), [`then`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L87), [`waitForImageReady`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L88), [`extraImages.map`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L89), [`finalize`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L91) y 2 más.

#### [`finalize`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L64) · función · dentro de [`useEffect · callback`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L41)

Coordina cambios de estado durante `finalize`.

- **Actualizaciones de estado o acciones** `clearTimeout`, `setIsReady`.
- **Efectos y APIs** `window.clearTimeout`, `window.requestAnimationFrame`.
- **Condiciones que evalúa** `cancelled`, `timeoutId`, `ausencia de cancelled`.
- **Llamadas directas en el cuerpo** [`window.clearTimeout`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L70), [`window.requestAnimationFrame`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L74), [`setIsReady`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L76).
- **Lo usa** [`setTimeout · callback`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L84) (llama), [`useEffect · callback`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L91) (llama).

#### [`setTimeout · callback`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L83) · callback de infraestructura · dentro de [`useEffect · callback`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L41)

Ejecuta trabajo diferido o periódico iniciado por `useEffect · callback`.

- **Llamadas directas en el cuerpo** [`finalize`](../../../apps/prelaunch/src/performance/useSectionAssetsReady.js#L84).
