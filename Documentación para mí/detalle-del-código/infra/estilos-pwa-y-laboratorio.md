# PWA y laboratorio: estilos globales y componentes

[Volver a la referencia de infraestructura](README.md)

Los enlaces a líneas apuntan al checkout analizado. Las relaciones se obtuvieron leyendo declaraciones, imports y configuraciones. Los valores de credenciales y datos operativos se dejan en sus archivos de origen.

## Archivos en este capítulo

- [apps/referidos-app/src/components/ui/skeleton/skeleton.css](#appsreferidos-appsrccomponentsuiskeletonskeletoncss)
- [apps/referidos-app/src/index.css](#appsreferidos-appsrcindexcss)
- [apps/referidos-app/src/styles/carousel.css](#appsreferidos-appsrcstylescarouselcss)
- [apps/referidos-app/src/styles/no-scrollbar.css](#appsreferidos-appsrcstylesno-scrollbarcss)
- [apps/referidos-pwa/src/index.css](#appsreferidos-pwasrcindexcss)
- [apps/referidos-pwa/src/styles/carousel.css](#appsreferidos-pwasrcstylescarouselcss)
- [apps/referidos-pwa/src/styles/no-scrollbar.css](#appsreferidos-pwasrcstylesno-scrollbarcss)

## apps/referidos-app/src/components/ui/skeleton/skeleton.css

[Abrir fuente](../../../apps/referidos-app/src/components/ui/skeleton/skeleton.css) · 30 líneas de texto.

Hoja de estilos asociada con la pantalla, variantes o componentes de esta ruta.

Importaciones directas: [SkeletonBase.jsx](../../../apps/referidos-app/src/components/ui/skeleton/SkeletonBase.jsx#L1).

### Reglas y condiciones

- [L1](../../../apps/referidos-app/src/components/ui/skeleton/skeleton.css#L1) `.skeleton-base`. Controla posición y capas, distribución, interacción y desborde, apariencia. `position`, `display`, `overflow`, `background`.
- [L8](../../../apps/referidos-app/src/components/ui/skeleton/skeleton.css#L8) `.skeleton-base::after`. Controla renderizado, posición y capas, apariencia, movimiento. `content`, `position`, `inset`, `transform`, `background`, `animation`.
- [L22](../../../apps/referidos-app/src/components/ui/skeleton/skeleton.css#L22) `@keyframes skeleton-shimmer`. Declara estados de animación que un selector activa con animation.
- [L23](../../../apps/referidos-app/src/components/ui/skeleton/skeleton.css#L23) `0%`. Controla posición y capas. `transform`. Dentro de `@keyframes skeleton-shimmer`.
- [L26](../../../apps/referidos-app/src/components/ui/skeleton/skeleton.css#L26) `100%`. Controla posición y capas. `transform`. Dentro de `@keyframes skeleton-shimmer`.

## apps/referidos-app/src/index.css

[Abrir fuente](../../../apps/referidos-app/src/index.css) · 600 líneas de texto.

Hoja de estilos asociada con la pantalla, variantes o componentes de esta ruta.

Importaciones directas: [main.jsx](../../../apps/referidos-app/src/main.jsx#L12).

### Reglas y condiciones

- [L1](../../../apps/referidos-app/src/index.css#L1) `@import "tailwindcss"`. Carga estilos o directivas dentro del pipeline CSS.
- [L3](../../../apps/referidos-app/src/index.css#L3) `body[data-support-modal-open="1"] .support-topbar, body[data-support-modal-open="1"] .support-ticket-floating-actions`. Controla apariencia, interacción y desborde. `opacity`, `pointer-events`.
- [L10](../../../apps/referidos-app/src/index.css#L10) `.no-scrollbar`. Controla renderizado, interacción y desborde. `-ms-overflow-style`, `scrollbar-width`.
- [L15](../../../apps/referidos-app/src/index.css#L15) `.no-scrollbar::-webkit-scrollbar`. Controla distribución. `display`.
- [L20](../../../apps/referidos-app/src/index.css#L20) `html, body`. Controla tamaño y espaciado, interacción y desborde, renderizado. `width`, `max-width`, `overflow-x`, `margin`, `padding`, `overscroll-behavior-y`, `touch-action`.
- [L33](../../../apps/referidos-app/src/index.css#L33) `html`. Controla tamaño y espaciado. `height`, `min-height`.
- [L39](../../../apps/referidos-app/src/index.css#L39) `.hide-scrollbar`. Controla renderizado, interacción y desborde. `-ms-overflow-style`, `scrollbar-width`.
- [L44](../../../apps/referidos-app/src/index.css#L44) `.hide-scrollbar::-webkit-scrollbar`. Controla distribución. `display`.
- [L48](../../../apps/referidos-app/src/index.css#L48) `.negocio-title-lines`. Controla movimiento. `transition-property`, `transition-timing-function`, `transition-duration`.
- [L54](../../../apps/referidos-app/src/index.css#L54) `.negocio-title-lines--collapse`. Controla movimiento. `transition-duration`.
- [L58](../../../apps/referidos-app/src/index.css#L58) `.location-popover`. Controla distribución, posición y capas, apariencia, movimiento, interacción y desborde, tamaño y espaciado. `display`, `transform-origin`, `opacity`, `transform`, `transition`, `pointer-events`, `width`.
- [L69](../../../apps/referidos-app/src/index.css#L69) `.location-popover[data-state="open"]`. Controla apariencia, posición y capas, interacción y desborde. `opacity`, `transform`, `pointer-events`.
- [L75](../../../apps/referidos-app/src/index.css#L75) `.location-surface, .header-panel-surface`. Controla posición y capas, distribución, tamaño y espaciado, apariencia, texto. `position`, `display`, `width`, `padding`, `border-radius`, `background`, `box-shadow`, `white-space`.
- [L87](../../../apps/referidos-app/src/index.css#L87) `.location-surface::before, .header-panel-surface::before`. Controla renderizado, posición y capas, tamaño y espaciado, apariencia. `content`, `position`, `top`, `left`, `transform`, `width`, `height`, `background`, `border-radius`.
- [L100](../../../apps/referidos-app/src/index.css#L100) `.location-text-reveal`. Controla distribución, texto. `display`, `white-space`.
- [L105](../../../apps/referidos-app/src/index.css#L105) `.location-text-reveal[data-state="open"]`. Controla movimiento. `animation`.
- [L109](../../../apps/referidos-app/src/index.css#L109) `.header-panel-body`. Controla distribución, texto. `display`, `flex-direction`, `align-items`, `text-align`, `gap`.
- [L117](../../../apps/referidos-app/src/index.css#L117) `.header-panel-list`. Controla tamaño y espaciado, texto. `width`, `text-align`.
- [L122](../../../apps/referidos-app/src/index.css#L122) `.header-panel-center`. Controla distribución. `flex`, `justify-content`.
- [L127](../../../apps/referidos-app/src/index.css#L127) `.header-panel-anchor`. Controla posición y capas. `position`, `right`, `top`, `z-index`.
- [L137](../../../apps/referidos-app/src/index.css#L137) `.search-header-logo`. Controla distribución, interacción y desborde. `display`, `align-items`, `justify-content`, `pointer-events`.
- [L144](../../../apps/referidos-app/src/index.css#L144) `.search-header-logo-text`. Controla texto, apariencia, renderizado. `font-family`, `font-size`, `font-weight`, `letter-spacing`, `fill`, `stroke`, `stroke-width`, `paint-order`, `filter`.
- [L156](../../../apps/referidos-app/src/index.css#L156) `.search-header-logo-shadow`. Controla texto, apariencia, posición y capas. `font-family`, `font-size`, `font-weight`, `letter-spacing`, `fill`, `opacity`, `transform`.
- [L166](../../../apps/referidos-app/src/index.css#L166) `.search-input-shell`. Controla apariencia, tamaño y espaciado, distribución, movimiento. `background`, `border-radius`, `padding`, `display`, `align-items`, `box-shadow`, `border`, `transition`.
- [L177](../../../apps/referidos-app/src/index.css#L177) `.search-input-icon`. Controla apariencia, movimiento. `color`, `opacity`, `transition`.
- [L183](../../../apps/referidos-app/src/index.css#L183) `.search-input-field`. Controla apariencia, texto. `border`, `outline`, `background`, `font-weight`, `color`.
- [L191](../../../apps/referidos-app/src/index.css#L191) `.search-input-field::placeholder`. Controla apariencia. `color`, `opacity`.
- [L196](../../../apps/referidos-app/src/index.css#L196) `.search-input-shell:focus-within`. Controla apariencia. `border-color`, `box-shadow`.
- [L202](../../../apps/referidos-app/src/index.css#L202) `.search-input-shell:focus-within .search-input-icon, .search-input-shell:focus-within .search-input-field`. Controla apariencia. `color`.
- [L207](../../../apps/referidos-app/src/index.css#L207) `.search-input-shell:focus-within .search-input-field::placeholder`. Controla apariencia. `color`, `opacity`.
- [L212](../../../apps/referidos-app/src/index.css#L212) `.search-input-shell:focus-within .search-input-icon`. Controla apariencia. `opacity`.
- [L216](../../../apps/referidos-app/src/index.css#L216) `.cliente-merge-enter`. Controla movimiento. `animation`, `will-change`.
- [L221](../../../apps/referidos-app/src/index.css#L221) `@keyframes location-text-reveal`. Declara estados de animación que un selector activa con animation.
- [L222](../../../apps/referidos-app/src/index.css#L222) `from`. Controla renderizado. `clip-path`. Dentro de `@keyframes location-text-reveal`.
- [L225](../../../apps/referidos-app/src/index.css#L225) `to`. Controla renderizado. `clip-path`. Dentro de `@keyframes location-text-reveal`.
- [L230](../../../apps/referidos-app/src/index.css#L230) `@keyframes cliente-merge-enter`. Declara estados de animación que un selector activa con animation.
- [L231](../../../apps/referidos-app/src/index.css#L231) `from`. Controla apariencia, posición y capas. `opacity`, `transform`. Dentro de `@keyframes cliente-merge-enter`.
- [L235](../../../apps/referidos-app/src/index.css#L235) `to`. Controla apariencia, posición y capas. `opacity`, `transform`. Dentro de `@keyframes cliente-merge-enter`.
- [L241](../../../apps/referidos-app/src/index.css#L241) `.scoreboard`. Controla distribución. `display`, `align-items`, `gap`.
- [L247](../../../apps/referidos-app/src/index.css#L247) `.scoreboard-digit`. Controla posición y capas, tamaño y espaciado, apariencia, distribución, interacción y desborde. `position`, `width`, `height`, `border-radius`, `background`, `border`, `box-shadow`, `display`, `align-items`, `justify-content`, `overflow`.
- [L262](../../../apps/referidos-app/src/index.css#L262) `.scoreboard-digit::before, .scoreboard-digit::after`. Controla renderizado, posición y capas, tamaño y espaciado, interacción y desborde. `content`, `position`, `left`, `right`, `height`, `pointer-events`.
- [L272](../../../apps/referidos-app/src/index.css#L272) `.scoreboard-digit::before`. Controla posición y capas, apariencia. `top`, `background`, `border-bottom`.
- [L282](../../../apps/referidos-app/src/index.css#L282) `.scoreboard-digit::after`. Controla posición y capas, apariencia. `bottom`, `background`.
- [L291](../../../apps/referidos-app/src/index.css#L291) `.scoreboard-digit-text`. Controla posición y capas, texto, apariencia. `position`, `z-index`, `font-size`, `font-weight`, `color`, `text-shadow`.
- [L300](../../../apps/referidos-app/src/index.css#L300) `.scoreboard-label`. Controla texto, apariencia. `font-size`, `font-weight`, `letter-spacing`, `color`, `text-shadow`.
- [L308](../../../apps/referidos-app/src/index.css#L308) `.hero-search-dock`. Controla posición y capas, movimiento. `transform-origin`, `transition`, `will-change`.
- [L315](../../../apps/referidos-app/src/index.css#L315) `.profile-search-dock`. Controla posición y capas, interacción y desborde, apariencia, movimiento. `position`, `overflow`, `transform`, `opacity`, `border-radius`, `transition`.
- [L324](../../../apps/referidos-app/src/index.css#L324) `.profile-search-dock .hero-search-surface > div`. Controla tamaño y espaciado. `padding-top`.
- [L328](../../../apps/referidos-app/src/index.css#L328) `.profile-search-clip`. Controla interacción y desborde. `overflow`.
- [L332](../../../apps/referidos-app/src/index.css#L332) `.profile-search-clip, .profile-search-panel`. Controla posición y capas. `position`, `z-index`.
- [L338](../../../apps/referidos-app/src/index.css#L338) `.profile-search-dock .hero-search-surface`. Controla movimiento. `transition`.
- [L342](../../../apps/referidos-app/src/index.css#L342) `.profile-search-dock .hero-search-surface`. Controla movimiento. `transition`.
- [L345](../../../apps/referidos-app/src/index.css#L345) `.profile-search-dock[data-state="closed"], .profile-search-dock[data-state="open"]`. Controla posición y capas, apariencia. `transform`, `opacity`.
- [L351](../../../apps/referidos-app/src/index.css#L351) `.profile-search-panel`. Controla posición y capas, movimiento. `transform-origin`, `will-change`.
- [L356](../../../apps/referidos-app/src/index.css#L356) `.profile-header-dock`. Controla posición y capas. `z-index`, `top`.
- [L361](../../../apps/referidos-app/src/index.css#L361) `.profile-header-rounded::before`. Controla renderizado, posición y capas, apariencia. `content`, `position`, `inset`, `background`, `border-radius`, `z-index`.
- [L370](../../../apps/referidos-app/src/index.css#L370) `.hero-search-dock[data-state="closed"]`. Controla apariencia, posición y capas, interacción y desborde. `opacity`, `transform`, `pointer-events`.
- [L376](../../../apps/referidos-app/src/index.css#L376) `.hero-search-dock[data-state="open"]`. Controla apariencia, posición y capas, interacción y desborde. `opacity`, `transform`, `pointer-events`.
- [L382](../../../apps/referidos-app/src/index.css#L382) `.hero-search-reveal`. Controla movimiento. `transition`, `will-change`.
- [L388](../../../apps/referidos-app/src/index.css#L388) `.hero-search-reveal[data-state="hidden"]`. Controla apariencia, posición y capas, interacción y desborde. `opacity`, `transform`, `pointer-events`.
- [L394](../../../apps/referidos-app/src/index.css#L394) `.hero-search-reveal[data-state="visible"]`. Controla apariencia, posición y capas, interacción y desborde. `opacity`, `transform`, `pointer-events`.
- [L400](../../../apps/referidos-app/src/index.css#L400) `.hero-search-surface`. Controla apariencia. `background`, `color`, `border-radius`, `box-shadow`.
- [L407](../../../apps/referidos-app/src/index.css#L407) `.hero-bleed`. Controla posición y capas, apariencia. `position`, `background`, `border-radius`.
- [L413](../../../apps/referidos-app/src/index.css#L413) `.historial-hero.hero-bleed`. Controla apariencia. `border-radius`.
- [L417](../../../apps/referidos-app/src/index.css#L417) `.hero-bleed::before`. Controla renderizado, posición y capas, tamaño y espaciado, apariencia. `content`, `position`, `left`, `right`, `top`, `height`, `background`.
- [L427](../../../apps/referidos-app/src/index.css#L427) `.historial-title-track`. Controla distribución, texto. `display`, `white-space`.
- [L432](../../../apps/referidos-app/src/index.css#L432) `.historial-title-track--animate`. Controla movimiento. `animation`, `will-change`.
- [L438](../../../apps/referidos-app/src/index.css#L438) `@keyframes historial-title-marquee`. Declara estados de animación que un selector activa con animation.
- [L439](../../../apps/referidos-app/src/index.css#L439) `0%`. Controla posición y capas, apariencia. `transform`, `opacity`. Dentro de `@keyframes historial-title-marquee`.
- [L443](../../../apps/referidos-app/src/index.css#L443) `60%`. Controla posición y capas, apariencia. `transform`, `opacity`. Dentro de `@keyframes historial-title-marquee`.
- [L447](../../../apps/referidos-app/src/index.css#L447) `70%`. Controla apariencia. `opacity`. Dentro de `@keyframes historial-title-marquee`.
- [L450](../../../apps/referidos-app/src/index.css#L450) `71%`. Controla posición y capas, apariencia. `transform`, `opacity`. Dentro de `@keyframes historial-title-marquee`.
- [L454](../../../apps/referidos-app/src/index.css#L454) `100%`. Controla posición y capas, apariencia. `transform`, `opacity`. Dentro de `@keyframes historial-title-marquee`.
- [L460](../../../apps/referidos-app/src/index.css#L460) `.ribbon-glass`. Controla posición y capas, tamaño y espaciado, apariencia, texto, interacción y desborde, distribución. `position`, `left`, `right`, `top`, `padding`, `color`, `font-weight`, `letter-spacing`, `background`, `overflow`, `white-space`, `text-overflow`, `display`, `align-items`, `max-width`.
- [L478](../../../apps/referidos-app/src/index.css#L478) `.ribbon-glass::before, .ribbon-glass::after`. Controla renderizado, posición y capas, interacción y desborde. `content`, `position`, `inset`, `pointer-events`.
- [L486](../../../apps/referidos-app/src/index.css#L486) `.ribbon-glass::before`. Controla apariencia, posición y capas. `background`, `filter`, `opacity`, `transform`.
- [L499](../../../apps/referidos-app/src/index.css#L499) `.ribbon-glass::after`. Controla apariencia. `background`, `filter`, `opacity`.
- [L511](../../../apps/referidos-app/src/index.css#L511) `.ribbon-glass`. Controla renderizado, apariencia. `-webkit-mask-image`, `mask-image`.
- [L528](../../../apps/referidos-app/src/index.css#L528) `.hot-local-marquee`. Controla posición y capas, tamaño y espaciado, interacción y desborde, texto, distribución. `position`, `max-width`, `overflow`, `white-space`, `display`.
- [L536](../../../apps/referidos-app/src/index.css#L536) `.hot-local-marquee-track`. Controla distribución, tamaño y espaciado. `display`, `align-items`, `gap`, `width`.
- [L543](../../../apps/referidos-app/src/index.css#L543) `.hot-local-marquee-text`. Controla distribución, texto. `display`, `white-space`.
- [L548](../../../apps/referidos-app/src/index.css#L548) `.hot-local-marquee--animate .hot-local-marquee-track, .hot-local-marquee-track--animate`. Controla movimiento. `animation`, `will-change`.
- [L554](../../../apps/referidos-app/src/index.css#L554) `@keyframes hot-local-marquee`. Declara estados de animación que un selector activa con animation.
- [L555](../../../apps/referidos-app/src/index.css#L555) `0%`. Controla posición y capas, apariencia. `transform`, `opacity`. Dentro de `@keyframes hot-local-marquee`.
- [L559](../../../apps/referidos-app/src/index.css#L559) `60%`. Controla posición y capas, apariencia. `transform`, `opacity`. Dentro de `@keyframes hot-local-marquee`.
- [L563](../../../apps/referidos-app/src/index.css#L563) `70%`. Controla posición y capas, apariencia. `transform`, `opacity`. Dentro de `@keyframes hot-local-marquee`.
- [L567](../../../apps/referidos-app/src/index.css#L567) `71%`. Controla posición y capas, apariencia. `transform`, `opacity`. Dentro de `@keyframes hot-local-marquee`.
- [L571](../../../apps/referidos-app/src/index.css#L571) `100%`. Controla posición y capas, apariencia. `transform`, `opacity`. Dentro de `@keyframes hot-local-marquee`.
- [L577](../../../apps/referidos-app/src/index.css#L577) `.pin-caret`. Controla movimiento. `animation`.
- [L581](../../../apps/referidos-app/src/index.css#L581) `@keyframes pin-caret-blink`. Declara estados de animación que un selector activa con animation.
- [L582](../../../apps/referidos-app/src/index.css#L582) `0%,   50%`. Controla apariencia. `opacity`. Dentro de `@keyframes pin-caret-blink`.
- [L586](../../../apps/referidos-app/src/index.css#L586) `51%,   100%`. Controla apariencia. `opacity`. Dentro de `@keyframes pin-caret-blink`.
- [L592](../../../apps/referidos-app/src/index.css#L592) `@media (prefers-reduced-motion: reduce)`. Restringe las reglas por tamaño, dispositivo, accesibilidad o forma de visualización según la condición.
- [L593](../../../apps/referidos-app/src/index.css#L593) `.hot-local-marquee--animate .hot-local-marquee-track,   .hot-local-marquee-track--animate`. Controla movimiento, posición y capas, apariencia. `animation`, `transform`, `opacity`. Dentro de `@media (prefers-reduced-motion: reduce)`.

## apps/referidos-app/src/styles/carousel.css

[Abrir fuente](../../../apps/referidos-app/src/styles/carousel.css) · 21 líneas de texto.

Hoja de estilos asociada con la pantalla, variantes o componentes de esta ruta.

Importaciones directas: [main.jsx](../../../apps/referidos-app/src/main.jsx#L7).

### Reglas y condiciones

- [L2](../../../apps/referidos-app/src/styles/carousel.css#L2) `.carousel-fade-left, .carousel-fade-right`. Controla posición y capas, tamaño y espaciado, interacción y desborde. `position`, `top`, `bottom`, `width`, `pointer-events`, `z-index`.
- [L12](../../../apps/referidos-app/src/styles/carousel.css#L12) `.carousel-fade-left`. Controla posición y capas, apariencia. `left`, `background`.
- [L17](../../../apps/referidos-app/src/styles/carousel.css#L17) `.carousel-fade-right`. Controla posición y capas, apariencia. `right`, `background`.

## apps/referidos-app/src/styles/no-scrollbar.css

[Abrir fuente](../../../apps/referidos-app/src/styles/no-scrollbar.css) · 10 líneas de texto.

Hoja de estilos asociada con la pantalla, variantes o componentes de esta ruta.

Importaciones directas: [main.jsx](../../../apps/referidos-app/src/main.jsx#L8).

### Reglas y condiciones

- [L2](../../../apps/referidos-app/src/styles/no-scrollbar.css#L2) `.no-scrollbar`. Controla renderizado, interacción y desborde. `-ms-overflow-style`, `scrollbar-width`.
- [L7](../../../apps/referidos-app/src/styles/no-scrollbar.css#L7) `.no-scrollbar::-webkit-scrollbar`. Controla distribución. `display`.

## apps/referidos-pwa/src/index.css

[Abrir fuente](../../../apps/referidos-pwa/src/index.css) · 19 líneas de texto.

Estilos y utilidades globales de la aplicación experimental. **Selectores de entrada:** `#root`.

Importaciones directas: [main.jsx](../../../apps/referidos-pwa/src/main.jsx#L8).

### Reglas y condiciones

- [L1](../../../apps/referidos-pwa/src/index.css#L1) `@import "tailwindcss"`. Carga estilos o directivas dentro del pipeline CSS.
- [L3](../../../apps/referidos-pwa/src/index.css#L3) `html, body, #root`. Controla tamaño y espaciado. `width`, `min-height`.
- [L10](../../../apps/referidos-pwa/src/index.css#L10) `html, body`. Controla tamaño y espaciado, interacción y desborde, renderizado. `max-width`, `overflow-x`, `margin`, `padding`, `overscroll-behavior-y`, `touch-action`.

## apps/referidos-pwa/src/styles/carousel.css

[Abrir fuente](../../../apps/referidos-pwa/src/styles/carousel.css) · 21 líneas de texto.

Reglas de carrusel disponibles para composiciones visuales. **Selectores de entrada:** `.carousel-fade-left`, `.carousel-fade-right`.

Importaciones directas: [main.jsx](../../../apps/referidos-pwa/src/main.jsx#L6).

### Reglas y condiciones

- [L2](../../../apps/referidos-pwa/src/styles/carousel.css#L2) `.carousel-fade-left, .carousel-fade-right`. Controla posición y capas, tamaño y espaciado, interacción y desborde. `position`, `top`, `bottom`, `width`, `pointer-events`, `z-index`.
- [L12](../../../apps/referidos-pwa/src/styles/carousel.css#L12) `.carousel-fade-left`. Controla posición y capas, apariencia. `left`, `background`.
- [L17](../../../apps/referidos-pwa/src/styles/carousel.css#L17) `.carousel-fade-right`. Controla posición y capas, apariencia. `right`, `background`.

## apps/referidos-pwa/src/styles/no-scrollbar.css

[Abrir fuente](../../../apps/referidos-pwa/src/styles/no-scrollbar.css) · 9 líneas de texto.

Utilidad para ocultar barra sin eliminar el comportamiento de scroll. **Selectores de entrada:** `.no-scrollbar`.

Importaciones directas: [main.jsx](../../../apps/referidos-pwa/src/main.jsx#L7).

### Reglas y condiciones

- [L1](../../../apps/referidos-pwa/src/styles/no-scrollbar.css#L1) `.no-scrollbar`. Controla renderizado, interacción y desborde. `-ms-overflow-style`, `scrollbar-width`.
- [L6](../../../apps/referidos-pwa/src/styles/no-scrollbar.css#L6) `.no-scrollbar::-webkit-scrollbar`. Controla distribución. `display`.
