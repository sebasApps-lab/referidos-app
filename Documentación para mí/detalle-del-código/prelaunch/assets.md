# Prelaunch · assets

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/prelaunch/src/assets/svgMaskUrl.js`](../../../apps/prelaunch/src/assets/svgMaskUrl.js#L1)

## Símbolos y conexiones

### [`apps/prelaunch/src/assets/svgMaskUrl.js`](../../../apps/prelaunch/src/assets/svgMaskUrl.js#L1)

Construye URLs de máscaras SVG que se pueden pasar a estilos, evitando repetir la adaptación en los componentes que las renderizan.

**Superficie que exporta.** [`svgMaskUrl`](../../../apps/prelaunch/src/assets/svgMaskUrl.js#L18).

**Módulos que lo cargan.** [`DesktopHeroBackground.jsx`](../../../apps/prelaunch/src/waitlist-landing/desktop/components/DesktopHeroBackground.jsx#L2) (importa), [`MobileBottomBackground.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileBottomBackground.jsx#L3) (importa), [`MobileHeroBackground.jsx`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileHeroBackground.jsx#L2) (importa).

#### [`ensureStretchingSvgMask`](../../../apps/prelaunch/src/assets/svgMaskUrl.js#L1) · función

Implementa `ensure Stretching Svg Mask` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `svgMarkup`.
- **Efectos y APIs** `svgMarkup.replace`.
- **Condiciones que evalúa** `ausencia de svgMarkup`, `test`.
- **Llamadas directas en el cuerpo** [`test`](../../../apps/prelaunch/src/assets/svgMaskUrl.js#L6), [`svgMarkup.replace`](../../../apps/prelaunch/src/assets/svgMaskUrl.js#L7).
- **Lo usa** [`svgMaskUrl`](../../../apps/prelaunch/src/assets/svgMaskUrl.js#L19) (llama).

#### [`svgMaskUrlCache`](../../../apps/prelaunch/src/assets/svgMaskUrl.js#L16) · variable de módulo

Declara `svgMaskUrlCache` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`svgMaskUrl`](../../../apps/prelaunch/src/assets/svgMaskUrl.js#L21) (accede al módulo).

#### [`svgMaskUrl`](../../../apps/prelaunch/src/assets/svgMaskUrl.js#L18) · función · exportado

Implementa `svg Mask Url` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `svgMarkup`.
- **Condiciones que evalúa** `svgMaskUrlCache.has`, `undefined y function`.
- **Llamadas directas en el cuerpo** [`ensureStretchingSvgMask`](../../../apps/prelaunch/src/assets/svgMaskUrl.js#L19), [`svgMaskUrlCache.has`](../../../apps/prelaunch/src/assets/svgMaskUrl.js#L21), [`svgMaskUrlCache.get`](../../../apps/prelaunch/src/assets/svgMaskUrl.js#L22), [`encodeURIComponent`](../../../apps/prelaunch/src/assets/svgMaskUrl.js#L25), [`URL.createObjectURL`](../../../apps/prelaunch/src/assets/svgMaskUrl.js#L32), [`svgMaskUrlCache.set`](../../../apps/prelaunch/src/assets/svgMaskUrl.js#L37).
- **Lo usa** [`heroDesktopMask`](../../../apps/prelaunch/src/waitlist-landing/desktop/components/DesktopHeroBackground.jsx#L9) (llama), [`bottomMobileMask`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileBottomBackground.jsx#L10) (llama), [`heroMobileMask`](../../../apps/prelaunch/src/waitlist-landing/mobile/components/MobileHeroBackground.jsx#L9) (llama).
