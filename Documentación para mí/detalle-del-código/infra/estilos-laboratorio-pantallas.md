# Laboratorio: estilo de las pantallas de prueba y promoción

[Volver a la referencia de infraestructura](README.md)

Los enlaces a líneas apuntan al checkout analizado. Las relaciones se obtuvieron leyendo declaraciones, imports y configuraciones. Los valores de credenciales y datos operativos se dejan en sus archivos de origen.

## Archivos en este capítulo

- [apps/referidos-pwa/src/pages/negocio-crear-promo.css](#appsreferidos-pwasrcpagesnegocio-crear-promocss)
- [apps/referidos-pwa/src/pages/prueba.css](#appsreferidos-pwasrcpagespruebacss)
- [apps/referidos-pwa/src/pages/prueba1.css](#appsreferidos-pwasrcpagesprueba1css)
- [apps/referidos-pwa/src/pages/prueba2.css](#appsreferidos-pwasrcpagesprueba2css)
- [apps/referidos-pwa/src/pages/prueba3.css](#appsreferidos-pwasrcpagesprueba3css)
- [apps/referidos-pwa/src/pages/prueba4.css](#appsreferidos-pwasrcpagesprueba4css)

## apps/referidos-pwa/src/pages/negocio-crear-promo.css

[Abrir fuente](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css) · 1887 líneas de texto.

Reglas de la maqueta de creación de promoción y su previsualización. **Selectores de entrada:** `.negocio-crear-promo-page`, `.negocio-crear-promo-topbar`, `.negocio-crear-promo-topbar__left`, `.negocio-crear-promo-topbar__right`.

Importaciones directas: [NegocioCrearPromoPage.jsx](../../../apps/referidos-pwa/src/pages/NegocioCrearPromoPage.jsx#L2).

### Reglas y condiciones

- [L1](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1) `.negocio-crear-promo-page`. Controla tamaño y espaciado, apariencia, texto. `min-height`, `background`, `color`, `font-family`.
- [L18](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L18) `.negocio-crear-promo-topbar`. Controla posición y capas, distribución, renderizado, tamaño y espaciado, apariencia. `position`, `top`, `z-index`, `display`, `grid-template-columns`, `align-items`, `column-gap`, `height`, `padding`, `background`, `box-shadow`.
- [L34](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L34) `.negocio-crear-promo-topbar__left, .negocio-crear-promo-topbar__right`. Controla distribución. `display`, `align-items`.
- [L40](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L40) `.negocio-crear-promo-topbar__left`. Controla distribución, tamaño y espaciado. `gap`, `flex`, `min-width`.
- [L46](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L46) `.negocio-crear-promo-brand`. Controla distribución, texto, apariencia. `display`, `align-items`, `gap`, `font-size`, `font-weight`, `line-height`, `color`, `letter-spacing`, `text-transform`, `white-space`.
- [L59](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L59) `.negocio-crear-promo-brand span`. Controla distribución, texto, posición y capas. `display`, `font-family`, `font-weight`, `letter-spacing`, `transform`.
- [L71](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L71) `.negocio-crear-promo-brand svg`. Controla tamaño y espaciado, distribución. `width`, `height`, `display`.
- [L77](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L77) `.negocio-crear-promo-divider`. Controla tamaño y espaciado, apariencia. `width`, `height`, `background`.
- [L83](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L83) `.negocio-crear-promo-breadcrumbs`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `gap`, `min-width`, `color`, `font-size`, `font-weight`.
- [L93](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L93) `.negocio-crear-promo-breadcrumbs a, .negocio-crear-promo-breadcrumbs span`. Controla apariencia, texto. `color`, `text-decoration`, `white-space`.
- [L100](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L100) `.negocio-crear-promo-breadcrumbs__home`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `justify-content`, `width`, `height`, `color`.
- [L109](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L109) `.negocio-crear-promo-breadcrumbs__home svg`. Controla tamaño y espaciado. `width`, `height`.
- [L114](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L114) `.negocio-crear-promo-breadcrumbs__dot`. Controla tamaño y espaciado, apariencia. `width`, `height`, `border-radius`, `background`, `opacity`.
- [L122](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L122) `.negocio-crear-promo-breadcrumbs .is-current`. Controla apariencia, texto. `color`, `font-weight`.
- [L127](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L127) `.negocio-crear-promo-topbar__search-gap`. Controla tamaño y espaciado. `width`, `min-width`.
- [L132](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L132) `.negocio-crear-promo-stats-button`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `gap`, `justify-self`, `height`, `padding`, `border`, `border-radius`, `background`, `color`, `font-size`, `font-weight`, `box-shadow`.
- [L148](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L148) `.negocio-crear-promo-stats-button svg`. Controla tamaño y espaciado, apariencia. `width`, `height`, `color`.
- [L154](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L154) `.negocio-crear-promo-topbar__right`. Controla distribución. `justify-self`, `gap`.
- [L159](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L159) `.negocio-crear-promo-icon-button`. Controla posición y capas, distribución, tamaño y espaciado, apariencia. `position`, `display`, `align-items`, `justify-content`, `width`, `height`, `padding`, `border`, `background`, `color`.
- [L172](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L172) `.negocio-crear-promo-icon-button svg`. Controla tamaño y espaciado. `width`, `height`.
- [L177](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L177) `.negocio-crear-promo-badge`. Controla posición y capas, tamaño y espaciado, apariencia, texto. `position`, `top`, `right`, `min-width`, `height`, `padding`, `border-radius`, `background`, `color`, `font-size`, `font-weight`, `line-height`, `box-shadow`.
- [L193](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L193) `.negocio-crear-promo-profile`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `gap`, `height`, `padding`, `border`, `border-radius`, `background`, `box-shadow`, `color`, `font-size`, `font-weight`.
- [L208](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L208) `.negocio-crear-promo-avatar`. Controla tamaño y espaciado, apariencia. `width`, `height`, `border-radius`, `background`, `box-shadow`.
- [L222](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L222) `.negocio-crear-promo-profile svg`. Controla tamaño y espaciado. `width`, `height`, `margin-left`.
- [L228](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L228) `.negocio-crear-promo-main`. Controla posición y capas, distribución, tamaño y espaciado. `position`, `display`, `grid-template-columns`, `justify-content`, `gap`, `padding`.
- [L237](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L237) `.negocio-crear-promo-editor`. Controla posición y capas, tamaño y espaciado, apariencia, interacción y desborde. `position`, `min-height`, `border-radius`, `padding`, `overflow`, `background`, `box-shadow`.
- [L252](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L252) `.negocio-crear-promo-editor__glow`. Controla posición y capas, apariencia, interacción y desborde. `position`, `inset`, `border-radius`, `background`, `pointer-events`.
- [L260](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L260) `.negocio-crear-promo-editor__glow--secondary`. Controla posición y capas, apariencia. `inset`, `background`.
- [L265](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L265) `.negocio-crear-promo-pill-switch`. Controla distribución, tamaño y espaciado, apariencia. `display`, `grid-template-columns`, `width`, `padding`, `border-radius`, `background`, `box-shadow`.
- [L275](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L275) `.negocio-crear-promo-pill-switch button, .negocio-crear-promo-speed-switch button`. Controla apariencia, texto. `border`, `background`, `color`, `font`.
- [L283](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L283) `.negocio-crear-promo-pill-switch button`. Controla tamaño y espaciado, apariencia, texto. `height`, `border-radius`, `font-size`, `font-weight`.
- [L290](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L290) `.negocio-crear-promo-pill-switch button.is-active`. Controla apariencia. `color`, `background`, `box-shadow`.
- [L299](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L299) `.negocio-crear-promo-field`. Controla tamaño y espaciado. `margin-top`.
- [L303](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L303) `.negocio-crear-promo-field label`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `margin-bottom`, `color`, `font-size`, `font-weight`.
- [L311](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L311) `.negocio-crear-promo-input, .negocio-crear-promo-textarea, .negocio-crear-promo-group, .negocio-crear-promo-chip-input, .negocio-crear-promo-mini-input, .negocio-crear-promo-select, .negocio-crear-promo-add, .negocio-crear-promo-secondary, .negocio-crear-promo-primary`. Controla tamaño y espaciado. `box-sizing`.
- [L323](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L323) `.negocio-crear-promo-input, .negocio-crear-promo-textarea`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `justify-content`, `width`, `border-radius`.
- [L332](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L332) `.negocio-crear-promo-input`. Controla tamaño y espaciado, apariencia, texto. `min-height`, `padding`, `background`, `color`, `font-size`, `box-shadow`.
- [L343](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L343) `.negocio-crear-promo-input svg`. Controla tamaño y espaciado, apariencia, distribución. `width`, `height`, `color`, `flex`.
- [L350](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L350) `.negocio-crear-promo-input--select`. Controla apariencia. `background`, `color`, `box-shadow`.
- [L358](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L358) `.negocio-crear-promo-input--select svg, .negocio-crear-promo-select svg`. Controla apariencia. `color`.
- [L363](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L363) `.negocio-crear-promo-textarea`. Controla tamaño y espaciado, distribución, apariencia, texto. `min-height`, `align-items`, `padding`, `background`, `color`, `font-size`.
- [L372](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L372) `.negocio-crear-promo-group`. Controla apariencia, tamaño y espaciado. `border-radius`, `padding`, `background`, `box-shadow`.
- [L381](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L381) `.negocio-crear-promo-group--stacked`. Controla tamaño y espaciado. `padding-top`, `padding-bottom`.
- [L386](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L386) `.negocio-crear-promo-condition-row, .negocio-crear-promo-benefit-row`. Controla distribución, apariencia, texto. `display`, `align-items`, `gap`, `color`, `font-size`, `white-space`.
- [L396](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L396) `.negocio-crear-promo-condition-row + .negocio-crear-promo-condition-row, .negocio-crear-promo-benefit-row + .negocio-crear-promo-benefit-row`. Controla tamaño y espaciado. `margin-top`.
- [L401](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L401) `.negocio-crear-promo-inline-icon`. Controla tamaño y espaciado, distribución. `width`, `height`, `flex`.
- [L407](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L407) `.negocio-crear-promo-inline-icon svg`. Controla tamaño y espaciado, distribución. `width`, `height`, `display`.
- [L413](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L413) `.negocio-crear-promo-select`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `justify-content`, `height`, `padding`, `border-radius`, `background`, `color`, `box-shadow`.
- [L425](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L425) `.negocio-crear-promo-select svg`. Controla tamaño y espaciado. `width`, `height`, `margin-left`.
- [L431](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L431) `.negocio-crear-promo-inline-x`. Controla tamaño y espaciado, apariencia. `margin-right`, `opacity`.
- [L436](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L436) `.negocio-crear-promo-chip-input`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `height`, `min-width`, `padding`, `border-radius`, `background`, `color`, `box-shadow`.
- [L448](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L448) `.negocio-crear-promo-mini-input`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `justify-content`, `width`, `height`, `border-radius`, `background`, `box-shadow`.
- [L459](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L459) `.negocio-crear-promo-trash`. Controla tamaño y espaciado, apariencia. `margin-left`, `width`, `height`, `padding`, `border`, `color`, `background`.
- [L469](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L469) `.negocio-crear-promo-trash svg`. Controla tamaño y espaciado, distribución. `width`, `height`, `display`.
- [L475](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L475) `.negocio-crear-promo-add`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `gap`, `height`, `margin-top`, `padding`, `border`, `border-radius`, `background`, `color`, `font-size`, `font-weight`, `box-shadow`.
- [L491](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L491) `.negocio-crear-promo-add svg`. Controla tamaño y espaciado. `width`, `height`.
- [L496](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L496) `.negocio-crear-promo-actions`. Controla distribución, tamaño y espaciado. `display`, `align-items`, `justify-content`, `gap`, `margin-top`.
- [L504](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L504) `.negocio-crear-promo-save-state`. Controla distribución, apariencia, texto. `display`, `align-items`, `gap`, `color`, `font-size`.
- [L512](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L512) `.negocio-crear-promo-save-dot`. Controla tamaño y espaciado, apariencia. `width`, `height`, `border-radius`, `background`, `box-shadow`.
- [L520](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L520) `.negocio-crear-promo-actions__buttons`. Controla distribución. `display`, `align-items`, `gap`.
- [L526](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L526) `.negocio-crear-promo-primary, .negocio-crear-promo-secondary`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `justify-content`, `gap`, `height`, `padding`, `border`, `border-radius`, `color`, `font-size`, `font-weight`.
- [L541](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L541) `.negocio-crear-promo-primary`. Controla apariencia. `background`, `box-shadow`.
- [L546](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L546) `.negocio-crear-promo-secondary`. Controla apariencia. `background`, `box-shadow`.
- [L551](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L551) `.negocio-crear-promo-primary svg, .negocio-crear-promo-secondary svg`. Controla tamaño y espaciado. `width`, `height`.
- [L557](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L557) `.negocio-crear-promo-preview-wrap`. Controla posición y capas, tamaño y espaciado. `position`, `padding-top`.
- [L562](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L562) `.negocio-crear-promo-speed-switch`. Controla distribución, tamaño y espaciado, apariencia. `display`, `grid-template-columns`, `width`, `margin`, `padding`, `border-radius`, `background`, `box-shadow`.
- [L573](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L573) `.negocio-crear-promo-speed-switch button`. Controla tamaño y espaciado, apariencia, texto. `height`, `border-radius`, `color`, `font-size`, `font-weight`.
- [L581](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L581) `.negocio-crear-promo-speed-switch button.is-active`. Controla apariencia. `color`, `background`, `box-shadow`.
- [L587](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L587) `.negocio-crear-promo-help-link`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `width`, `margin`, `color`, `font-size`, `text-underline-offset`.
- [L596](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L596) `.negocio-crear-promo-dots`. Controla posición y capas, tamaño y espaciado, apariencia. `position`, `width`, `height`, `opacity`, `background-image`, `background-size`.
- [L605](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L605) `.negocio-crear-promo-dots--left`. Controla posición y capas. `left`, `bottom`.
- [L610](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L610) `.negocio-crear-promo-dots--right`. Controla posición y capas. `right`, `bottom`.
- [L615](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L615) `.negocio-crear-promo-card`. Controla posición y capas, tamaño y espaciado, apariencia, interacción y desborde. `position`, `width`, `margin`, `border-radius`, `background`, `box-shadow`, `overflow`.
- [L627](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L627) `.negocio-crear-promo-card::before`. Controla renderizado, posición y capas, apariencia, interacción y desborde. `content`, `position`, `inset`, `border-radius`, `border`, `pointer-events`.
- [L636](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L636) `.negocio-crear-promo-card__media`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `justify-content`, `height`, `margin`, `border-radius`, `color`, `background`.
- [L649](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L649) `.negocio-crear-promo-card__media svg`. Controla tamaño y espaciado. `width`, `height`.
- [L654](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L654) `.negocio-crear-promo-card__body`. Controla tamaño y espaciado. `padding`.
- [L658](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L658) `.negocio-crear-promo-card__body h1`. Controla tamaño y espaciado, apariencia, texto. `margin`, `color`, `font-size`, `font-weight`, `letter-spacing`.
- [L666](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L666) `.negocio-crear-promo-card__body p`. Controla tamaño y espaciado, apariencia, texto. `margin`, `color`, `font-size`.
- [L672](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L672) `.negocio-crear-promo-separator`. Controla tamaño y espaciado, apariencia. `height`, `margin`, `background`.
- [L678](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L678) `.negocio-crear-promo-card__conditions`. Controla apariencia, tamaño y espaciado. `border-radius`, `padding`, `background`.
- [L684](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L684) `.negocio-crear-promo-card__conditions h2`. Controla tamaño y espaciado, apariencia, texto. `margin`, `color`, `font-size`, `font-weight`, `letter-spacing`.
- [L692](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L692) `.negocio-crear-promo-card__pill`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `gap`, `min-height`, `padding`, `border-radius`, `background`, `color`, `font-size`.
- [L704](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L704) `.negocio-crear-promo-card__pill + .negocio-crear-promo-card__pill`. Controla tamaño y espaciado. `margin-top`.
- [L708](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L708) `.negocio-crear-promo-card__pill svg`. Controla tamaño y espaciado, distribución. `width`, `height`, `flex`.
- [L714](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L714) `.negocio-crear-promo-card__pill--alt`. Controla tamaño y espaciado. `width`, `max-width`.
- [L719](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L719) `.negocio-crear-promo-card__pill strong`. Controla texto. `font-weight`.
- [L723](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L723) `.negocio-crear-promo-meta`. Controla distribución. `display`, `gap`.
- [L728](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L728) `.negocio-crear-promo-meta__row`. Controla distribución, apariencia, texto. `display`, `align-items`, `gap`, `color`, `font-size`.
- [L736](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L736) `.negocio-crear-promo-meta__row svg`. Controla tamaño y espaciado, apariencia. `width`, `height`, `color`.
- [L742](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L742) `@media (max-width: 924.6px)`. Restringe las reglas por tamaño, dispositivo, accesibilidad o forma de visualización según la condición.
- [L743](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L743) `.negocio-crear-promo-main`. Controla distribución. `gap`. Dentro de `@media (max-width: 924.6px)`.
- [L747](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L747) `.negocio-crear-promo-card`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 924.6px)`.
- [L752](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L752) `@media (max-width: 817.4px)`. Restringe las reglas por tamaño, dispositivo, accesibilidad o forma de visualización según la condición.
- [L753](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L753) `.negocio-crear-promo-topbar`. Controla tamaño y espaciado, distribución. `height`, `padding-top`, `padding-bottom`, `flex-direction`, `gap`, `align-items`. Dentro de `@media (max-width: 817.4px)`.
- [L762](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L762) `.negocio-crear-promo-topbar__left`. Controla distribución. `flex-wrap`, `gap`. Dentro de `@media (max-width: 817.4px)`.
- [L767](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L767) `.negocio-crear-promo-main`. Controla distribución. `grid-template-columns`, `justify-items`, `gap`. Dentro de `@media (max-width: 817.4px)`.
- [L773](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L773) `.negocio-crear-promo-preview-wrap`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 817.4px)`.
- [L778](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L778) `@media (max-width: 482.4px)`. Restringe las reglas por tamaño, dispositivo, accesibilidad o forma de visualización según la condición.
- [L779](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L779) `.negocio-crear-promo-main`. Controla tamaño y espaciado. `padding`. Dentro de `@media (max-width: 482.4px)`.
- [L783](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L783) `.negocio-crear-promo-editor,   .negocio-crear-promo-card`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 482.4px)`.
- [L788](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L788) `.negocio-crear-promo-editor`. Controla tamaño y espaciado. `min-height`, `padding`. Dentro de `@media (max-width: 482.4px)`.
- [L793](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L793) `.negocio-crear-promo-pill-switch,   .negocio-crear-promo-speed-switch`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 482.4px)`.
- [L798](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L798) `.negocio-crear-promo-condition-row,   .negocio-crear-promo-benefit-row,   .negocio-crear-promo-actions`. Controla distribución. `flex-wrap`. Dentro de `@media (max-width: 482.4px)`.
- [L804](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L804) `.negocio-crear-promo-chip-input`. Controla tamaño y espaciado. `min-width`, `width`. Dentro de `@media (max-width: 482.4px)`.
- [L809](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L809) `.negocio-crear-promo-actions`. Controla distribución. `align-items`. Dentro de `@media (max-width: 482.4px)`.
- [L813](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L813) `.negocio-crear-promo-actions__buttons`. Controla tamaño y espaciado, distribución. `width`, `flex-direction`. Dentro de `@media (max-width: 482.4px)`.
- [L818](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L818) `.negocio-crear-promo-primary,   .negocio-crear-promo-secondary`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 482.4px)`.
- [L823](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L823) `.negocio-crear-promo-card__body`. Controla tamaño y espaciado. `padding`. Dentro de `@media (max-width: 482.4px)`.
- [L828](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L828) `.negocio-crear-promo-actions__buttons`. Controla distribución. `flex`.
- [L832](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L832) `.negocio-crear-promo-primary, .negocio-crear-promo-secondary`. Controla texto. `white-space`.
- [L837](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L837) `.negocio-crear-promo-editor__glow`. Controla apariencia. `background`.
- [L841](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L841) `.negocio-crear-promo-editor__glow--secondary`. Controla apariencia. `background`.
- [L845](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L845) `.negocio-crear-promo-pill-switch button.is-active`. Controla apariencia. `box-shadow`.
- [L852](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L852) `.negocio-crear-promo-speed-switch button.is-active`. Controla apariencia. `box-shadow`.
- [L856](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L856) `.negocio-crear-promo-help-link`. Controla texto. `font-size`, `font-weight`.
- [L861](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L861) `.negocio-crear-promo-card`. Controla tamaño y espaciado, texto. `width`, `margin-top`, `font-family`.
- [L867](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L867) `.negocio-crear-promo-card::before`. Controla posición y capas. `inset`.
- [L871](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L871) `.negocio-crear-promo-card__media`. Controla tamaño y espaciado. `height`.
- [L875](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L875) `.negocio-crear-promo-card__media svg`. Controla tamaño y espaciado. `width`, `height`.
- [L880](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L880) `.negocio-crear-promo-card__body`. Controla tamaño y espaciado. `padding`.
- [L884](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L884) `.negocio-crear-promo-card__body h1`. Controla texto. `font-size`, `font-weight`, `letter-spacing`.
- [L890](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L890) `.negocio-crear-promo-card__body p`. Controla tamaño y espaciado, apariencia, texto. `margin-top`, `color`, `font-size`, `font-weight`, `line-height`.
- [L898](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L898) `.negocio-crear-promo-separator`. Controla tamaño y espaciado. `margin`.
- [L902](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L902) `.negocio-crear-promo-card__conditions`. Controla tamaño y espaciado. `padding`.
- [L906](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L906) `.negocio-crear-promo-card__conditions h2`. Controla texto. `font-size`, `font-weight`.
- [L911](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L911) `.negocio-crear-promo-card__pill`. Controla distribución, tamaño y espaciado, texto. `gap`, `min-height`, `font-size`, `font-weight`, `line-height`.
- [L919](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L919) `.negocio-crear-promo-card__pill strong`. Controla texto. `font-weight`.
- [L923](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L923) `.negocio-crear-promo-card__tone`. Controla apariencia, texto. `color`, `font-weight`.
- [L928](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L928) `.negocio-crear-promo-card__accent`. Controla apariencia, texto. `color`, `font-weight`.
- [L933](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L933) `.negocio-crear-promo-meta`. Controla distribución. `gap`.
- [L937](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L937) `.negocio-crear-promo-meta__row`. Controla texto. `font-size`, `font-weight`.
- [L942](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L942) `.negocio-crear-promo-card`. Controla tamaño y espaciado. `width`.
- [L946](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L946) `.negocio-crear-promo-card__media`. Controla tamaño y espaciado. `height`.
- [L950](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L950) `.negocio-crear-promo-card__body`. Controla tamaño y espaciado. `padding`.
- [L954](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L954) `.negocio-crear-promo-card__body h1`. Controla texto. `font-size`, `font-weight`.
- [L959](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L959) `.negocio-crear-promo-card__conditions h2`. Controla texto. `font-size`, `font-weight`.
- [L964](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L964) `.negocio-crear-promo-card__tone`. Controla texto. `font-weight`.
- [L968](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L968) `.negocio-crear-promo-meta__row`. Controla texto. `font-size`.
- [L972](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L972) `.negocio-crear-promo-editor`. Controla apariencia. `background`.
- [L979](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L979) `.negocio-crear-promo-editor__glow`. Controla posición y capas, apariencia. `inset`, `background`.
- [L984](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L984) `.negocio-crear-promo-editor__glow--secondary`. Controla posición y capas, apariencia. `inset`, `background`.
- [L989](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L989) `.negocio-crear-promo-pill-switch`. Controla apariencia. `background`.
- [L993](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L993) `.negocio-crear-promo-pill-switch button.is-active`. Controla apariencia. `box-shadow`.
- [L1000](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1000) `.negocio-crear-promo-card__body h1`. Controla texto. `font-weight`.
- [L1004](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1004) `.negocio-crear-promo-card__conditions h2`. Controla texto. `font-weight`.
- [L1008](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1008) `.negocio-crear-promo-editor`. Controla apariencia. `background`.
- [L1015](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1015) `.negocio-crear-promo-editor__glow`. Controla apariencia. `background`.
- [L1019](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1019) `.negocio-crear-promo-editor__glow--secondary`. Controla apariencia. `background`.
- [L1023](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1023) `.negocio-crear-promo-card__body h1`. Controla texto. `font-weight`.
- [L1027](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1027) `.negocio-crear-promo-card__conditions h2`. Controla texto. `font-weight`.
- [L1031](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1031) `.negocio-crear-promo-editor`. Controla apariencia. `background`.
- [L1038](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1038) `.negocio-crear-promo-editor__glow`. Controla posición y capas, apariencia. `inset`, `background`.
- [L1043](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1043) `.negocio-crear-promo-editor__glow--secondary`. Controla posición y capas, apariencia. `inset`, `background`.
- [L1048](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1048) `.negocio-crear-promo-pill-switch`. Controla apariencia. `background`.
- [L1052](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1052) `.negocio-crear-promo-editor`. Controla apariencia. `background`.
- [L1059](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1059) `.negocio-crear-promo-editor__glow--secondary`. Controla posición y capas, apariencia. `inset`, `background`.
- [L1064](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1064) `.negocio-crear-promo-input--select`. Controla tamaño y espaciado. `min-height`, `padding`.
- [L1069](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1069) `.negocio-crear-promo-field--benefits`. Controla tamaño y espaciado. `margin-top`.
- [L1073](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1073) `.negocio-crear-promo-primary, .negocio-crear-promo-secondary`. Controla tamaño y espaciado, texto. `height`, `padding`, `font-size`, `font-weight`, `letter-spacing`.
- [L1082](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1082) `.negocio-crear-promo-input--select`. Controla tamaño y espaciado. `min-height`.
- [L1086](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1086) `.negocio-crear-promo-field--benefits`. Controla tamaño y espaciado. `margin-top`.
- [L1090](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1090) `.negocio-crear-promo-primary, .negocio-crear-promo-secondary`. Controla tamaño y espaciado, texto. `height`, `padding`, `font-size`.
- [L1097](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1097) `.negocio-crear-promo-input--select`. Controla tamaño y espaciado. `min-height`, `padding`.
- [L1102](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1102) `.negocio-crear-promo-field--benefits`. Controla tamaño y espaciado. `margin-top`.
- [L1106](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1106) `.negocio-crear-promo-primary, .negocio-crear-promo-secondary`. Controla tamaño y espaciado, texto. `height`, `padding`, `font-size`, `font-weight`, `letter-spacing`.
- [L1115](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1115) `.negocio-crear-promo-primary, .negocio-crear-promo-secondary`. Controla distribución. `gap`.
- [L1120](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1120) `.negocio-crear-promo-primary, .negocio-crear-promo-secondary`. Controla texto. `font-weight`.
- [L1125](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1125) `.negocio-crear-promo-input, .negocio-crear-promo-textarea`. Controla apariencia. `color`.
- [L1130](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1130) `.negocio-crear-promo-select`. Controla tamaño y espaciado, distribución. `width`, `min-width`, `flex`, `justify-content`, `gap`, `padding`.
- [L1139](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1139) `.negocio-crear-promo-select svg`. Controla tamaño y espaciado. `margin-left`.
- [L1143](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1143) `.negocio-crear-promo-speed-switch`. Controla posición y capas, tamaño y espaciado, distribución, interacción y desborde, apariencia. `position`, `padding`, `min-height`, `height`, `align-items`, `overflow`, `background`, `box-shadow`.
- [L1154](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1154) `.negocio-crear-promo-speed-switch::before`. Controla renderizado, posición y capas, apariencia, interacción y desborde. `content`, `position`, `inset`, `background`, `border-radius`, `pointer-events`.
- [L1163](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1163) `.negocio-crear-promo-speed-switch button`. Controla distribución, posición y capas, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `justify-content`, `position`, `z-index`, `min-height`, `height`, `padding`, `background`, `border-radius`, `color`, `font-size`, `line-height`.
- [L1179](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1179) `.negocio-crear-promo-speed-switch button:first-child`. Controla apariencia. `border-radius`.
- [L1183](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1183) `.negocio-crear-promo-speed-switch button:last-child`. Controla apariencia. `border-radius`.
- [L1187](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1187) `.negocio-crear-promo-speed-switch button.is-active`. Controla apariencia, distribución, tamaño y espaciado. `background`, `box-shadow`, `align-self`, `height`, `min-height`, `margin-top`, `margin-bottom`, `border-radius`.
- [L1198](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1198) `.negocio-crear-promo-speed-switch button.is-active:first-child`. Controla tamaño y espaciado, apariencia. `margin-left`, `margin-right`, `padding-left`, `padding-right`, `border-radius`.
- [L1206](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1206) `.negocio-crear-promo-speed-switch button.is-active:last-child`. Controla tamaño y espaciado, apariencia. `margin-left`, `margin-right`, `padding-left`, `padding-right`, `border-radius`.
- [L1214](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1214) `.negocio-crear-promo-input--select`. Controla tamaño y espaciado, apariencia. `min-height`, `background`, `color`, `box-shadow`.
- [L1223](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1223) `.negocio-crear-promo-group`. Controla apariencia. `background`, `box-shadow`.
- [L1230](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1230) `.negocio-crear-promo-select`. Controla apariencia. `background`, `box-shadow`.
- [L1235](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1235) `.negocio-crear-promo-chip-input, .negocio-crear-promo-mini-input`. Controla apariencia. `background`, `box-shadow`.
- [L1241](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1241) `.negocio-crear-promo-chip-input`. Controla apariencia. `color`.
- [L1245](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1245) `.negocio-crear-promo-add, .negocio-crear-promo-secondary`. Controla apariencia. `background`, `box-shadow`.
- [L1251](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1251) `.negocio-crear-promo-input--select`. Controla tamaño y espaciado, apariencia. `min-height`, `background`.
- [L1256](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1256) `.negocio-crear-promo-group`. Controla apariencia. `background`.
- [L1260](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1260) `.negocio-crear-promo-select`. Controla apariencia. `background`.
- [L1264](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1264) `.negocio-crear-promo-chip-input, .negocio-crear-promo-mini-input`. Controla apariencia. `background`.
- [L1269](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1269) `.negocio-crear-promo-add, .negocio-crear-promo-secondary`. Controla apariencia. `background`.
- [L1274](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1274) `.negocio-crear-promo-group`. Controla apariencia. `background`.
- [L1278](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1278) `.negocio-crear-promo-select`. Controla apariencia. `background`.
- [L1282](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1282) `.negocio-crear-promo-chip-input, .negocio-crear-promo-mini-input`. Controla apariencia. `background`.
- [L1287](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1287) `.negocio-crear-promo-add, .negocio-crear-promo-secondary`. Controla apariencia. `background`.
- [L1292](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1292) `.negocio-crear-promo-group`. Controla apariencia. `background`, `box-shadow`.
- [L1299](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1299) `.negocio-crear-promo-select`. Controla apariencia. `background`, `box-shadow`.
- [L1304](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1304) `.negocio-crear-promo-chip-input, .negocio-crear-promo-mini-input`. Controla apariencia. `background`, `box-shadow`.
- [L1310](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1310) `.negocio-crear-promo-add, .negocio-crear-promo-secondary`. Controla apariencia. `background`, `box-shadow`.
- [L1316](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1316) `.negocio-crear-promo-editor`. Controla apariencia. `background`.
- [L1323](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1323) `.negocio-crear-promo-editor__glow`. Controla apariencia. `background`.
- [L1327](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1327) `.negocio-crear-promo-editor__glow--secondary`. Controla posición y capas, apariencia. `inset`, `background`.
- [L1332](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1332) `.negocio-crear-promo-editor`. Controla apariencia. `background`.
- [L1339](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1339) `.negocio-crear-promo-editor__glow`. Controla apariencia. `background`.
- [L1343](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1343) `.negocio-crear-promo-editor__glow--secondary`. Controla apariencia. `background`.
- [L1347](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1347) `.negocio-crear-promo-editor`. Controla apariencia. `background`.
- [L1354](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1354) `.negocio-crear-promo-editor__glow`. Controla apariencia. `background`.
- [L1358](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1358) `.negocio-crear-promo-editor__glow--secondary`. Controla apariencia. `background`.
- [L1362](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1362) `.negocio-crear-promo-editor`. Controla apariencia. `background`.
- [L1369](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1369) `.negocio-crear-promo-editor__glow--secondary`. Controla apariencia. `background`.
- [L1373](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1373) `.negocio-crear-promo-group`. Controla apariencia. `background`.
- [L1377](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1377) `.negocio-crear-promo-primary`. Controla apariencia. `box-shadow`.
- [L1381](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1381) `.negocio-crear-promo-field label`. Controla apariencia. `color`.
- [L1385](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1385) `.negocio-crear-promo-input, .negocio-crear-promo-textarea`. Controla apariencia. `background`, `color`, `box-shadow`.
- [L1392](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1392) `.negocio-crear-promo-input svg`. Controla apariencia. `color`.
- [L1396](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1396) `.negocio-crear-promo-textarea`. Controla apariencia. `color`.
- [L1400](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1400) `.negocio-crear-promo-condition-row, .negocio-crear-promo-benefit-row`. Controla apariencia. `color`.
- [L1405](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1405) `.negocio-crear-promo-group`. Controla apariencia. `background`, `box-shadow`.
- [L1410](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1410) `.negocio-crear-promo-input--select`. Controla tamaño y espaciado, apariencia. `min-height`, `background`, `color`, `box-shadow`.
- [L1417](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1417) `.negocio-crear-promo-select`. Controla apariencia. `background`.
- [L1421](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1421) `.negocio-crear-promo-chip-input, .negocio-crear-promo-mini-input`. Controla apariencia. `background`.
- [L1426](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1426) `.negocio-crear-promo-add, .negocio-crear-promo-secondary`. Controla apariencia. `background`.
- [L1431](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1431) `.negocio-crear-promo-primary, .negocio-crear-promo-secondary`. Controla tamaño y espaciado, texto. `height`, `padding`, `font-size`, `font-weight`.
- [L1439](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1439) `.negocio-crear-promo-primary`. Controla apariencia. `background`, `box-shadow`.
- [L1446](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1446) `.negocio-crear-promo-editor`. Controla apariencia. `background`.
- [L1453](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1453) `.negocio-crear-promo-editor__glow`. Controla apariencia. `background`.
- [L1457](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1457) `.negocio-crear-promo-editor__glow--secondary`. Controla apariencia. `background`.
- [L1461](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1461) `.negocio-crear-promo-input--select`. Controla apariencia. `box-shadow`.
- [L1465](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1465) `.negocio-crear-promo-group`. Controla apariencia. `box-shadow`.
- [L1469](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1469) `.negocio-crear-promo-add, .negocio-crear-promo-secondary`. Controla apariencia. `box-shadow`.
- [L1474](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1474) `.negocio-crear-promo-input--select, .negocio-crear-promo-group, .negocio-crear-promo-add, .negocio-crear-promo-secondary`. Controla apariencia. `box-shadow`.
- [L1481](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1481) `.negocio-crear-promo-input, .negocio-crear-promo-textarea`. Controla apariencia. `border-radius`.
- [L1486](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1486) `.negocio-crear-promo-input--select, .negocio-crear-promo-group, .negocio-crear-promo-select, .negocio-crear-promo-chip-input, .negocio-crear-promo-add`. Controla apariencia. `border-radius`.
- [L1494](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1494) `.negocio-crear-promo-mini-input`. Controla apariencia. `border-radius`.
- [L1498](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1498) `.negocio-crear-promo-primary, .negocio-crear-promo-secondary`. Controla apariencia, tamaño y espaciado, texto. `border-radius`, `height`, `padding`, `font-size`.
- [L1506](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1506) `.negocio-crear-promo-actions__buttons`. Controla distribución. `gap`, `flex`.
- [L1511](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1511) `.negocio-crear-promo-save-state`. Controla distribución, tamaño y espaciado. `flex`, `min-width`.
- [L1516](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1516) `.negocio-crear-promo-save-dot`. Controla apariencia. `box-shadow`.
- [L1520](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1520) `.negocio-crear-promo-primary`. Controla apariencia. `background`, `box-shadow`.
- [L1525](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1525) `.negocio-crear-promo-primary, .negocio-crear-promo-secondary`. Controla tamaño y espaciado. `padding`.
- [L1530](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1530) `.negocio-crear-promo-primary`. Controla apariencia. `background`.
- [L1533](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1533) `.negocio-crear-promo-profile`. Controla apariencia. `border-radius`.
- [L1537](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1537) `.negocio-crear-promo-editor`. Controla apariencia. `border-radius`.
- [L1541](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1541) `.negocio-crear-promo-pill-switch, .negocio-crear-promo-speed-switch`. Controla apariencia. `border-radius`.
- [L1546](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1546) `.negocio-crear-promo-pill-switch button, .negocio-crear-promo-speed-switch button`. Controla apariencia. `border-radius`.
- [L1551](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1551) `.negocio-crear-promo-card`. Controla apariencia. `border-radius`.
- [L1555](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1555) `.negocio-crear-promo-card::before`. Controla apariencia. `border-radius`.
- [L1559](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1559) `.negocio-crear-promo-card__media`. Controla apariencia. `border-radius`.
- [L1563](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1563) `.negocio-crear-promo-card__conditions, .negocio-crear-promo-card__pill`. Controla apariencia. `border-radius`.
- [L1568](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1568) `.negocio-crear-promo-save-dot`. Controla apariencia. `box-shadow`.
- [L1572](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1572) `.negocio-crear-promo-primary, .negocio-crear-promo-secondary`. Controla tamaño y espaciado. `padding`.
- [L1577](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1577) `.negocio-crear-promo-primary`. Controla apariencia. `background`.
- [L1580](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1580) `.negocio-crear-promo-group`. Controla apariencia. `background`, `border`, `box-shadow`.
- [L1586](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1586) `.negocio-crear-promo-input--select`. Controla apariencia. `background`, `border`, `box-shadow`, `color`.
- [L1593](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1593) `.negocio-crear-promo-select`. Controla apariencia. `background`, `border`, `box-shadow`.
- [L1599](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1599) `.negocio-crear-promo-chip-input`. Controla apariencia. `background`, `border`, `box-shadow`.
- [L1605](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1605) `.negocio-crear-promo-mini-input`. Controla apariencia. `background`, `border`, `box-shadow`.
- [L1611](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1611) `.negocio-crear-promo-add, .negocio-crear-promo-secondary`. Controla apariencia. `background`, `border`, `box-shadow`.
- [L1618](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1618) `.negocio-crear-promo-condition-row, .negocio-crear-promo-benefit-row`. Controla apariencia. `color`.
- [L1622](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1622) `.negocio-crear-promo-group`. Controla apariencia. `background`, `border`.
- [L1627](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1627) `.negocio-crear-promo-input--select`. Controla apariencia. `background`, `border`.
- [L1632](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1632) `.negocio-crear-promo-select`. Controla apariencia. `background`, `border`.
- [L1637](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1637) `.negocio-crear-promo-chip-input`. Controla apariencia. `background`, `border`.
- [L1642](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1642) `.negocio-crear-promo-mini-input`. Controla apariencia. `background`, `border`.
- [L1647](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1647) `.negocio-crear-promo-add, .negocio-crear-promo-secondary`. Controla apariencia. `background`, `border`.
- [L1653](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1653) `.negocio-crear-promo-condition-row, .negocio-crear-promo-benefit-row`. Controla apariencia. `color`.
- [L1658](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1658) `.negocio-crear-promo-group`. Controla apariencia. `border-radius`, `background`, `border`.
- [L1664](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1664) `.negocio-crear-promo-input--select`. Controla apariencia. `border-radius`, `background`, `border`, `color`.
- [L1671](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1671) `.negocio-crear-promo-input--select svg`. Controla apariencia. `color`.
- [L1675](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1675) `.negocio-crear-promo-add, .negocio-crear-promo-secondary`. Controla apariencia. `border-radius`, `border`.
- [L1681](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1681) `.negocio-crear-promo-input, .negocio-crear-promo-textarea`. Controla apariencia. `border-radius`.
- [L1686](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1686) `.negocio-crear-promo-page`. Controla tamaño y espaciado. `min-height`.
- [L1690](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1690) `.negocio-crear-promo-canvas`. Controla posición y capas, tamaño y espaciado. `position`, `inset`, `width`, `min-height`, `transform`.
- [L1698](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1698) `.negocio-crear-promo-main`. Controla distribución, apariencia. `grid-template-columns`, `justify-content`, `align-items`, `background-image`, `background-size`, `background-position`.
- [L1707](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1707) `.negocio-crear-promo-preview-wrap`. Controla posición y capas, tamaño y espaciado, distribución, apariencia. `position`, `width`, `min-width`, `justify-self`, `display`, `flex-direction`, `align-items`, `box-sizing`, `padding`, `background`.
- [L1720](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1720) `.negocio-crear-promo-preview-wrap::after`. Controla renderizado. `content`.
- [L1724](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1724) `.negocio-crear-promo-speed-switch, .negocio-crear-promo-help-link, .negocio-crear-promo-card`. Controla posición y capas, distribución. `position`, `z-index`, `align-self`.
- [L1732](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1732) `.negocio-crear-promo-dots`. Controla distribución. `display`.
- [L1736](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1736) `@media (max-width: 817.4px)`. Restringe las reglas por tamaño, dispositivo, accesibilidad o forma de visualización según la condición.
- [L1737](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1737) `.negocio-crear-promo-main`. Controla distribución. `grid-template-columns`. Dentro de `@media (max-width: 817.4px)`.
- [L1741](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1741) `.negocio-crear-promo-preview-wrap`. Controla tamaño y espaciado. `width`, `min-width`, `padding`. Dentro de `@media (max-width: 817.4px)`.
- [L1748](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1748) `.negocio-crear-promo-input, .negocio-crear-promo-textarea`. Controla apariencia. `color`.
- [L1753](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1753) `.negocio-crear-promo-input svg`. Controla apariencia. `color`.
- [L1757](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1757) `.negocio-crear-promo-card__body h1`. Controla texto. `font-weight`.
- [L1761](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1761) `.negocio-crear-promo-card__conditions h2`. Controla texto. `font-weight`.
- [L1765](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1765) `.negocio-crear-promo-card__body p`. Controla texto. `font-size`.
- [L1769](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1769) `.negocio-crear-promo-card__body`. Controla tamaño y espaciado. `padding`.
- [L1773](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1773) `.negocio-crear-promo-card__body p`. Controla tamaño y espaciado, texto. `margin-top`, `line-height`.
- [L1778](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1778) `.negocio-crear-promo-separator`. Controla tamaño y espaciado. `margin`.
- [L1782](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1782) `.negocio-crear-promo-card__conditions`. Controla tamaño y espaciado. `padding`.
- [L1786](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1786) `.negocio-crear-promo-card__conditions h2`. Controla tamaño y espaciado. `margin-bottom`.
- [L1790](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1790) `.negocio-crear-promo-card__pill`. Controla tamaño y espaciado. `min-height`.
- [L1794](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1794) `.negocio-crear-promo-card__pill + .negocio-crear-promo-card__pill`. Controla tamaño y espaciado. `margin-top`.
- [L1798](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1798) `.negocio-crear-promo-meta`. Controla distribución. `gap`.
- [L1802](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1802) `.negocio-crear-promo-meta__row`. Controla texto. `font-size`.
- [L1806](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1806) `.negocio-crear-promo-meta__row svg`. Controla tamaño y espaciado. `width`, `height`.
- [L1811](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1811) `.negocio-crear-promo-card__body > .negocio-crear-promo-separator:first-of-type`. Controla tamaño y espaciado. `margin-top`, `margin-bottom`.
- [L1816](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1816) `.negocio-crear-promo-card__conditions + .negocio-crear-promo-separator`. Controla tamaño y espaciado. `margin-top`, `margin-bottom`.
- [L1821](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1821) `.negocio-crear-promo-page`. Controla tema. `--negocio-crear-promo-card-conditions-text`, `--negocio-crear-promo-select-placeholder`.
- [L1826](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1826) `.negocio-crear-promo-breadcrumbs`. Controla texto. `font-size`.
- [L1830](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1830) `.negocio-crear-promo-breadcrumbs__label`. Controla texto. `font-weight`.
- [L1834](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1834) `.negocio-crear-promo-breadcrumbs .is-current`. Controla texto. `font-weight`.
- [L1838](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1838) `.negocio-crear-promo-card__pill`. Controla apariencia. `color`.
- [L1842](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1842) `.negocio-crear-promo-input--select`. Controla apariencia. `color`.
- [L1846](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1846) `.negocio-crear-promo-input--select svg`. Controla apariencia. `color`.
- [L1850](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1850) `.negocio-crear-promo-input--select-placeholder`. Controla apariencia. `color`.
- [L1854](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1854) `.negocio-crear-promo-input__placeholder`. Controla texto. `font-size`, `font-weight`.
- [L1859](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1859) `.negocio-crear-promo-stats-button`. Controla texto, tamaño y espaciado, distribución, apariencia. `font-size`, `height`, `padding`, `gap`, `border-radius`.
- [L1867](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1867) `.negocio-crear-promo-stats-button svg`. Controla tamaño y espaciado. `width`, `height`.
- [L1872](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1872) `.negocio-crear-promo-breadcrumbs__home`. Controla tamaño y espaciado. `width`, `height`.
- [L1877](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1877) `.negocio-crear-promo-breadcrumbs__home svg`. Controla tamaño y espaciado. `width`, `height`.
- [L1882](../../../apps/referidos-pwa/src/pages/negocio-crear-promo.css#L1882) `.negocio-crear-promo-breadcrumbs__dot`. Controla tamaño y espaciado. `width`, `height`.

## apps/referidos-pwa/src/pages/prueba.css

[Abrir fuente](../../../apps/referidos-pwa/src/pages/prueba.css) · 788 líneas de texto.

Estilos base de la página /prueba. **Selectores de entrada:** `.prueba-page`, `.prueba-topbar`, `.prueba-topbar__left`, `.prueba-topbar__right`.

Importaciones directas: [PruebaPage.jsx](../../../apps/referidos-pwa/src/pages/PruebaPage.jsx#L2).

### Reglas y condiciones

- [L1](../../../apps/referidos-pwa/src/pages/prueba.css#L1) `.prueba-page`. Controla tamaño y espaciado, apariencia, texto. `min-height`, `background`, `color`, `font-family`.
- [L18](../../../apps/referidos-pwa/src/pages/prueba.css#L18) `.prueba-topbar`. Controla posición y capas, distribución, tamaño y espaciado, apariencia. `position`, `top`, `z-index`, `display`, `align-items`, `justify-content`, `height`, `padding`, `background`, `box-shadow`.
- [L33](../../../apps/referidos-pwa/src/pages/prueba.css#L33) `.prueba-topbar__left, .prueba-topbar__right`. Controla distribución. `display`, `align-items`.
- [L39](../../../apps/referidos-pwa/src/pages/prueba.css#L39) `.prueba-topbar__left`. Controla distribución. `gap`.
- [L43](../../../apps/referidos-pwa/src/pages/prueba.css#L43) `.prueba-brand`. Controla distribución, texto, apariencia. `display`, `align-items`, `gap`, `font-size`, `font-weight`, `line-height`, `color`, `letter-spacing`.
- [L54](../../../apps/referidos-pwa/src/pages/prueba.css#L54) `.prueba-brand svg`. Controla tamaño y espaciado, distribución. `width`, `height`, `display`.
- [L60](../../../apps/referidos-pwa/src/pages/prueba.css#L60) `.prueba-divider`. Controla tamaño y espaciado, apariencia. `width`, `height`, `background`.
- [L66](../../../apps/referidos-pwa/src/pages/prueba.css#L66) `.prueba-title`. Controla texto, apariencia. `font-size`, `font-weight`, `color`, `letter-spacing`, `white-space`.
- [L74](../../../apps/referidos-pwa/src/pages/prueba.css#L74) `.prueba-mainnav`. Controla distribución, tamaño y espaciado. `display`, `align-items`, `gap`, `margin-left`.
- [L81](../../../apps/referidos-pwa/src/pages/prueba.css#L81) `.prueba-mainnav a`. Controla posición y capas, tamaño y espaciado, apariencia, texto. `position`, `padding`, `color`, `text-decoration`, `font-size`, `font-weight`.
- [L90](../../../apps/referidos-pwa/src/pages/prueba.css#L90) `.prueba-mainnav a.is-active`. Controla apariencia, texto. `color`, `font-weight`.
- [L95](../../../apps/referidos-pwa/src/pages/prueba.css#L95) `.prueba-mainnav a.is-active::after`. Controla renderizado, posición y capas, tamaño y espaciado, apariencia. `content`, `position`, `left`, `right`, `bottom`, `height`, `border-radius`, `background`, `box-shadow`.
- [L107](../../../apps/referidos-pwa/src/pages/prueba.css#L107) `.prueba-topbar__right`. Controla distribución. `gap`.
- [L111](../../../apps/referidos-pwa/src/pages/prueba.css#L111) `.prueba-icon-button`. Controla posición y capas, distribución, tamaño y espaciado, apariencia. `position`, `display`, `align-items`, `justify-content`, `width`, `height`, `padding`, `border`, `background`, `color`.
- [L124](../../../apps/referidos-pwa/src/pages/prueba.css#L124) `.prueba-icon-button svg`. Controla tamaño y espaciado. `width`, `height`.
- [L129](../../../apps/referidos-pwa/src/pages/prueba.css#L129) `.prueba-badge`. Controla posición y capas, tamaño y espaciado, apariencia, texto. `position`, `top`, `right`, `min-width`, `height`, `padding`, `border-radius`, `background`, `color`, `font-size`, `font-weight`, `line-height`, `box-shadow`.
- [L145](../../../apps/referidos-pwa/src/pages/prueba.css#L145) `.prueba-profile`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `gap`, `height`, `padding`, `border`, `border-radius`, `background`, `box-shadow`, `color`, `font-size`, `font-weight`.
- [L160](../../../apps/referidos-pwa/src/pages/prueba.css#L160) `.prueba-avatar`. Controla tamaño y espaciado, apariencia. `width`, `height`, `border-radius`, `background`, `box-shadow`.
- [L174](../../../apps/referidos-pwa/src/pages/prueba.css#L174) `.prueba-profile svg`. Controla tamaño y espaciado. `width`, `height`, `margin-left`.
- [L180](../../../apps/referidos-pwa/src/pages/prueba.css#L180) `.prueba-main`. Controla posición y capas, distribución, tamaño y espaciado. `position`, `display`, `grid-template-columns`, `justify-content`, `gap`, `padding`.
- [L189](../../../apps/referidos-pwa/src/pages/prueba.css#L189) `.prueba-editor`. Controla posición y capas, tamaño y espaciado, apariencia, interacción y desborde. `position`, `min-height`, `border-radius`, `padding`, `overflow`, `background`, `box-shadow`.
- [L204](../../../apps/referidos-pwa/src/pages/prueba.css#L204) `.prueba-editor__glow`. Controla posición y capas, apariencia, interacción y desborde. `position`, `inset`, `border-radius`, `background`, `pointer-events`.
- [L212](../../../apps/referidos-pwa/src/pages/prueba.css#L212) `.prueba-editor__glow--secondary`. Controla posición y capas, apariencia. `inset`, `background`.
- [L217](../../../apps/referidos-pwa/src/pages/prueba.css#L217) `.prueba-pill-switch`. Controla distribución, tamaño y espaciado, apariencia. `display`, `grid-template-columns`, `width`, `padding`, `border-radius`, `background`, `box-shadow`.
- [L227](../../../apps/referidos-pwa/src/pages/prueba.css#L227) `.prueba-pill-switch button, .prueba-speed-switch button`. Controla apariencia, texto. `border`, `background`, `color`, `font`.
- [L235](../../../apps/referidos-pwa/src/pages/prueba.css#L235) `.prueba-pill-switch button`. Controla tamaño y espaciado, apariencia, texto. `height`, `border-radius`, `font-size`, `font-weight`.
- [L242](../../../apps/referidos-pwa/src/pages/prueba.css#L242) `.prueba-pill-switch button.is-active`. Controla apariencia. `color`, `background`, `box-shadow`.
- [L251](../../../apps/referidos-pwa/src/pages/prueba.css#L251) `.prueba-field`. Controla tamaño y espaciado. `margin-top`.
- [L255](../../../apps/referidos-pwa/src/pages/prueba.css#L255) `.prueba-field label`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `margin-bottom`, `color`, `font-size`, `font-weight`.
- [L263](../../../apps/referidos-pwa/src/pages/prueba.css#L263) `.prueba-input, .prueba-textarea, .prueba-group, .prueba-chip-input, .prueba-mini-input, .prueba-select, .prueba-add, .prueba-secondary, .prueba-primary`. Controla tamaño y espaciado. `box-sizing`.
- [L275](../../../apps/referidos-pwa/src/pages/prueba.css#L275) `.prueba-input, .prueba-textarea`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `justify-content`, `width`, `border-radius`.
- [L284](../../../apps/referidos-pwa/src/pages/prueba.css#L284) `.prueba-input`. Controla tamaño y espaciado, apariencia, texto. `min-height`, `padding`, `background`, `color`, `font-size`, `box-shadow`.
- [L295](../../../apps/referidos-pwa/src/pages/prueba.css#L295) `.prueba-input svg`. Controla tamaño y espaciado, apariencia, distribución. `width`, `height`, `color`, `flex`.
- [L302](../../../apps/referidos-pwa/src/pages/prueba.css#L302) `.prueba-input--select`. Controla apariencia. `background`, `color`, `box-shadow`.
- [L310](../../../apps/referidos-pwa/src/pages/prueba.css#L310) `.prueba-input--select svg, .prueba-select svg`. Controla apariencia. `color`.
- [L315](../../../apps/referidos-pwa/src/pages/prueba.css#L315) `.prueba-textarea`. Controla tamaño y espaciado, distribución, apariencia, texto. `min-height`, `align-items`, `padding`, `background`, `color`, `font-size`.
- [L324](../../../apps/referidos-pwa/src/pages/prueba.css#L324) `.prueba-group`. Controla apariencia, tamaño y espaciado. `border-radius`, `padding`, `background`, `box-shadow`.
- [L333](../../../apps/referidos-pwa/src/pages/prueba.css#L333) `.prueba-group--stacked`. Controla tamaño y espaciado. `padding-top`, `padding-bottom`.
- [L338](../../../apps/referidos-pwa/src/pages/prueba.css#L338) `.prueba-condition-row, .prueba-benefit-row`. Controla distribución, apariencia, texto. `display`, `align-items`, `gap`, `color`, `font-size`, `white-space`.
- [L348](../../../apps/referidos-pwa/src/pages/prueba.css#L348) `.prueba-condition-row + .prueba-condition-row, .prueba-benefit-row + .prueba-benefit-row`. Controla tamaño y espaciado. `margin-top`.
- [L353](../../../apps/referidos-pwa/src/pages/prueba.css#L353) `.prueba-inline-icon`. Controla tamaño y espaciado, distribución. `width`, `height`, `flex`.
- [L359](../../../apps/referidos-pwa/src/pages/prueba.css#L359) `.prueba-inline-icon svg`. Controla tamaño y espaciado, distribución. `width`, `height`, `display`.
- [L365](../../../apps/referidos-pwa/src/pages/prueba.css#L365) `.prueba-select`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `justify-content`, `height`, `padding`, `border-radius`, `background`, `color`, `box-shadow`.
- [L377](../../../apps/referidos-pwa/src/pages/prueba.css#L377) `.prueba-select svg`. Controla tamaño y espaciado. `width`, `height`, `margin-left`.
- [L383](../../../apps/referidos-pwa/src/pages/prueba.css#L383) `.prueba-inline-x`. Controla tamaño y espaciado, apariencia. `margin-right`, `opacity`.
- [L388](../../../apps/referidos-pwa/src/pages/prueba.css#L388) `.prueba-chip-input`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `height`, `min-width`, `padding`, `border-radius`, `background`, `color`, `box-shadow`.
- [L400](../../../apps/referidos-pwa/src/pages/prueba.css#L400) `.prueba-mini-input`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `justify-content`, `width`, `height`, `border-radius`, `background`, `box-shadow`.
- [L411](../../../apps/referidos-pwa/src/pages/prueba.css#L411) `.prueba-trash`. Controla tamaño y espaciado, apariencia. `margin-left`, `width`, `height`, `padding`, `border`, `color`, `background`.
- [L421](../../../apps/referidos-pwa/src/pages/prueba.css#L421) `.prueba-trash svg`. Controla tamaño y espaciado, distribución. `width`, `height`, `display`.
- [L427](../../../apps/referidos-pwa/src/pages/prueba.css#L427) `.prueba-add`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `gap`, `height`, `margin-top`, `padding`, `border`, `border-radius`, `background`, `color`, `font-size`, `font-weight`, `box-shadow`.
- [L443](../../../apps/referidos-pwa/src/pages/prueba.css#L443) `.prueba-add svg`. Controla tamaño y espaciado. `width`, `height`.
- [L448](../../../apps/referidos-pwa/src/pages/prueba.css#L448) `.prueba-actions`. Controla distribución, tamaño y espaciado. `display`, `align-items`, `justify-content`, `gap`, `margin-top`.
- [L456](../../../apps/referidos-pwa/src/pages/prueba.css#L456) `.prueba-save-state`. Controla distribución, apariencia, texto. `display`, `align-items`, `gap`, `color`, `font-size`.
- [L464](../../../apps/referidos-pwa/src/pages/prueba.css#L464) `.prueba-save-dot`. Controla tamaño y espaciado, apariencia. `width`, `height`, `border-radius`, `background`, `box-shadow`.
- [L472](../../../apps/referidos-pwa/src/pages/prueba.css#L472) `.prueba-actions__buttons`. Controla distribución. `display`, `align-items`, `gap`.
- [L478](../../../apps/referidos-pwa/src/pages/prueba.css#L478) `.prueba-primary, .prueba-secondary`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `justify-content`, `gap`, `height`, `padding`, `border`, `border-radius`, `color`, `font-size`, `font-weight`.
- [L493](../../../apps/referidos-pwa/src/pages/prueba.css#L493) `.prueba-primary`. Controla apariencia. `background`, `box-shadow`.
- [L498](../../../apps/referidos-pwa/src/pages/prueba.css#L498) `.prueba-secondary`. Controla apariencia. `background`, `box-shadow`.
- [L503](../../../apps/referidos-pwa/src/pages/prueba.css#L503) `.prueba-primary svg, .prueba-secondary svg`. Controla tamaño y espaciado. `width`, `height`.
- [L509](../../../apps/referidos-pwa/src/pages/prueba.css#L509) `.prueba-preview-wrap`. Controla posición y capas, tamaño y espaciado. `position`, `padding-top`.
- [L514](../../../apps/referidos-pwa/src/pages/prueba.css#L514) `.prueba-speed-switch`. Controla distribución, tamaño y espaciado, apariencia. `display`, `grid-template-columns`, `width`, `margin`, `padding`, `border-radius`, `background`, `box-shadow`.
- [L525](../../../apps/referidos-pwa/src/pages/prueba.css#L525) `.prueba-speed-switch button`. Controla tamaño y espaciado, apariencia, texto. `height`, `border-radius`, `color`, `font-size`, `font-weight`.
- [L533](../../../apps/referidos-pwa/src/pages/prueba.css#L533) `.prueba-speed-switch button.is-active`. Controla apariencia. `color`, `background`, `box-shadow`.
- [L539](../../../apps/referidos-pwa/src/pages/prueba.css#L539) `.prueba-help-link`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `width`, `margin`, `color`, `font-size`, `text-underline-offset`.
- [L548](../../../apps/referidos-pwa/src/pages/prueba.css#L548) `.prueba-dots`. Controla posición y capas, tamaño y espaciado, apariencia. `position`, `width`, `height`, `opacity`, `background-image`, `background-size`.
- [L557](../../../apps/referidos-pwa/src/pages/prueba.css#L557) `.prueba-dots--left`. Controla posición y capas. `left`, `bottom`.
- [L562](../../../apps/referidos-pwa/src/pages/prueba.css#L562) `.prueba-dots--right`. Controla posición y capas. `right`, `bottom`.
- [L567](../../../apps/referidos-pwa/src/pages/prueba.css#L567) `.prueba-card`. Controla posición y capas, tamaño y espaciado, apariencia, interacción y desborde. `position`, `width`, `margin`, `border-radius`, `background`, `box-shadow`, `overflow`.
- [L579](../../../apps/referidos-pwa/src/pages/prueba.css#L579) `.prueba-card::before`. Controla renderizado, posición y capas, apariencia, interacción y desborde. `content`, `position`, `inset`, `border-radius`, `border`, `pointer-events`.
- [L588](../../../apps/referidos-pwa/src/pages/prueba.css#L588) `.prueba-card__media`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `justify-content`, `height`, `margin`, `border-radius`, `color`, `background`.
- [L601](../../../apps/referidos-pwa/src/pages/prueba.css#L601) `.prueba-card__media svg`. Controla tamaño y espaciado. `width`, `height`.
- [L606](../../../apps/referidos-pwa/src/pages/prueba.css#L606) `.prueba-card__body`. Controla tamaño y espaciado. `padding`.
- [L610](../../../apps/referidos-pwa/src/pages/prueba.css#L610) `.prueba-card__body h1`. Controla tamaño y espaciado, apariencia, texto. `margin`, `color`, `font-size`, `font-weight`, `letter-spacing`.
- [L618](../../../apps/referidos-pwa/src/pages/prueba.css#L618) `.prueba-card__body p`. Controla tamaño y espaciado, apariencia, texto. `margin`, `color`, `font-size`.
- [L624](../../../apps/referidos-pwa/src/pages/prueba.css#L624) `.prueba-separator`. Controla tamaño y espaciado, apariencia. `height`, `margin`, `background`.
- [L630](../../../apps/referidos-pwa/src/pages/prueba.css#L630) `.prueba-card__conditions`. Controla apariencia, tamaño y espaciado. `border-radius`, `padding`, `background`.
- [L636](../../../apps/referidos-pwa/src/pages/prueba.css#L636) `.prueba-card__conditions h2`. Controla tamaño y espaciado, apariencia, texto. `margin`, `color`, `font-size`, `font-weight`, `letter-spacing`.
- [L644](../../../apps/referidos-pwa/src/pages/prueba.css#L644) `.prueba-card__pill`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `gap`, `min-height`, `padding`, `border-radius`, `background`, `color`, `font-size`.
- [L656](../../../apps/referidos-pwa/src/pages/prueba.css#L656) `.prueba-card__pill + .prueba-card__pill`. Controla tamaño y espaciado. `margin-top`.
- [L660](../../../apps/referidos-pwa/src/pages/prueba.css#L660) `.prueba-card__pill svg`. Controla tamaño y espaciado, distribución. `width`, `height`, `flex`.
- [L666](../../../apps/referidos-pwa/src/pages/prueba.css#L666) `.prueba-card__pill--alt`. Controla tamaño y espaciado. `width`, `max-width`.
- [L671](../../../apps/referidos-pwa/src/pages/prueba.css#L671) `.prueba-card__pill strong`. Controla texto. `font-weight`.
- [L675](../../../apps/referidos-pwa/src/pages/prueba.css#L675) `.prueba-meta`. Controla distribución. `display`, `gap`.
- [L680](../../../apps/referidos-pwa/src/pages/prueba.css#L680) `.prueba-meta__row`. Controla distribución, apariencia, texto. `display`, `align-items`, `gap`, `color`, `font-size`.
- [L688](../../../apps/referidos-pwa/src/pages/prueba.css#L688) `.prueba-meta__row svg`. Controla tamaño y espaciado, apariencia. `width`, `height`, `color`.
- [L694](../../../apps/referidos-pwa/src/pages/prueba.css#L694) `@media (max-width: 1380px)`. Restringe las reglas por tamaño, dispositivo, accesibilidad o forma de visualización según la condición.
- [L695](../../../apps/referidos-pwa/src/pages/prueba.css#L695) `.prueba-main`. Controla distribución. `gap`. Dentro de `@media (max-width: 1380px)`.
- [L699](../../../apps/referidos-pwa/src/pages/prueba.css#L699) `.prueba-card`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 1380px)`.
- [L704](../../../apps/referidos-pwa/src/pages/prueba.css#L704) `@media (max-width: 1220px)`. Restringe las reglas por tamaño, dispositivo, accesibilidad o forma de visualización según la condición.
- [L705](../../../apps/referidos-pwa/src/pages/prueba.css#L705) `.prueba-topbar`. Controla tamaño y espaciado, distribución. `height`, `padding-top`, `padding-bottom`, `flex-direction`, `gap`, `align-items`. Dentro de `@media (max-width: 1220px)`.
- [L714](../../../apps/referidos-pwa/src/pages/prueba.css#L714) `.prueba-topbar__left`. Controla distribución. `flex-wrap`, `gap`. Dentro de `@media (max-width: 1220px)`.
- [L719](../../../apps/referidos-pwa/src/pages/prueba.css#L719) `.prueba-main`. Controla distribución. `grid-template-columns`, `justify-items`, `gap`. Dentro de `@media (max-width: 1220px)`.
- [L725](../../../apps/referidos-pwa/src/pages/prueba.css#L725) `.prueba-preview-wrap`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 1220px)`.
- [L730](../../../apps/referidos-pwa/src/pages/prueba.css#L730) `@media (max-width: 720px)`. Restringe las reglas por tamaño, dispositivo, accesibilidad o forma de visualización según la condición.
- [L731](../../../apps/referidos-pwa/src/pages/prueba.css#L731) `.prueba-main`. Controla tamaño y espaciado. `padding`. Dentro de `@media (max-width: 720px)`.
- [L735](../../../apps/referidos-pwa/src/pages/prueba.css#L735) `.prueba-editor,   .prueba-card`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 720px)`.
- [L740](../../../apps/referidos-pwa/src/pages/prueba.css#L740) `.prueba-editor`. Controla tamaño y espaciado. `min-height`, `padding`. Dentro de `@media (max-width: 720px)`.
- [L745](../../../apps/referidos-pwa/src/pages/prueba.css#L745) `.prueba-pill-switch,   .prueba-speed-switch`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 720px)`.
- [L750](../../../apps/referidos-pwa/src/pages/prueba.css#L750) `.prueba-condition-row,   .prueba-benefit-row,   .prueba-actions`. Controla distribución. `flex-wrap`. Dentro de `@media (max-width: 720px)`.
- [L756](../../../apps/referidos-pwa/src/pages/prueba.css#L756) `.prueba-chip-input`. Controla tamaño y espaciado. `min-width`, `width`. Dentro de `@media (max-width: 720px)`.
- [L761](../../../apps/referidos-pwa/src/pages/prueba.css#L761) `.prueba-actions`. Controla distribución. `align-items`. Dentro de `@media (max-width: 720px)`.
- [L765](../../../apps/referidos-pwa/src/pages/prueba.css#L765) `.prueba-actions__buttons`. Controla tamaño y espaciado, distribución. `width`, `flex-direction`. Dentro de `@media (max-width: 720px)`.
- [L770](../../../apps/referidos-pwa/src/pages/prueba.css#L770) `.prueba-primary,   .prueba-secondary`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 720px)`.
- [L775](../../../apps/referidos-pwa/src/pages/prueba.css#L775) `.prueba-card__body`. Controla tamaño y espaciado. `padding`. Dentro de `@media (max-width: 720px)`.
- [L780](../../../apps/referidos-pwa/src/pages/prueba.css#L780) `.prueba-actions__buttons`. Controla distribución. `flex`.
- [L784](../../../apps/referidos-pwa/src/pages/prueba.css#L784) `.prueba-primary, .prueba-secondary`. Controla texto. `white-space`.

## apps/referidos-pwa/src/pages/prueba1.css

[Abrir fuente](../../../apps/referidos-pwa/src/pages/prueba1.css) · 923 líneas de texto.

Estilos de /prueba1. Cambiarla mantiene las otras variantes comparables. **Selectores de entrada:** `.prueba1-page`, `.prueba1-topbar`, `.prueba1-topbar__left`, `.prueba1-topbar__right`.

Importaciones directas: [Prueba1Page.jsx](../../../apps/referidos-pwa/src/pages/Prueba1Page.jsx#L2).

### Reglas y condiciones

- [L1](../../../apps/referidos-pwa/src/pages/prueba1.css#L1) `.prueba1-page`. Controla tamaño y espaciado, apariencia, texto. `min-height`, `background`, `color`, `font-family`.
- [L18](../../../apps/referidos-pwa/src/pages/prueba1.css#L18) `.prueba1-topbar`. Controla posición y capas, distribución, tamaño y espaciado, apariencia. `position`, `top`, `z-index`, `display`, `align-items`, `justify-content`, `height`, `padding`, `background`, `box-shadow`.
- [L33](../../../apps/referidos-pwa/src/pages/prueba1.css#L33) `.prueba1-topbar__left, .prueba1-topbar__right`. Controla distribución. `display`, `align-items`.
- [L39](../../../apps/referidos-pwa/src/pages/prueba1.css#L39) `.prueba1-topbar__left`. Controla distribución. `gap`.
- [L43](../../../apps/referidos-pwa/src/pages/prueba1.css#L43) `.prueba1-brand`. Controla distribución, texto, apariencia. `display`, `align-items`, `gap`, `font-size`, `font-weight`, `line-height`, `color`, `letter-spacing`.
- [L54](../../../apps/referidos-pwa/src/pages/prueba1.css#L54) `.prueba1-brand svg`. Controla tamaño y espaciado, distribución. `width`, `height`, `display`.
- [L60](../../../apps/referidos-pwa/src/pages/prueba1.css#L60) `.prueba1-divider`. Controla tamaño y espaciado, apariencia. `width`, `height`, `background`.
- [L66](../../../apps/referidos-pwa/src/pages/prueba1.css#L66) `.prueba1-title`. Controla texto, apariencia. `font-size`, `font-weight`, `color`, `letter-spacing`, `white-space`.
- [L74](../../../apps/referidos-pwa/src/pages/prueba1.css#L74) `.prueba1-mainnav`. Controla distribución, tamaño y espaciado. `display`, `align-items`, `gap`, `margin-left`.
- [L81](../../../apps/referidos-pwa/src/pages/prueba1.css#L81) `.prueba1-mainnav a`. Controla posición y capas, tamaño y espaciado, apariencia, texto. `position`, `padding`, `color`, `text-decoration`, `font-size`, `font-weight`.
- [L90](../../../apps/referidos-pwa/src/pages/prueba1.css#L90) `.prueba1-mainnav a.is-active`. Controla apariencia, texto. `color`, `font-weight`.
- [L95](../../../apps/referidos-pwa/src/pages/prueba1.css#L95) `.prueba1-mainnav a.is-active::after`. Controla renderizado, posición y capas, tamaño y espaciado, apariencia. `content`, `position`, `left`, `right`, `bottom`, `height`, `border-radius`, `background`, `box-shadow`.
- [L107](../../../apps/referidos-pwa/src/pages/prueba1.css#L107) `.prueba1-topbar__right`. Controla distribución. `gap`.
- [L111](../../../apps/referidos-pwa/src/pages/prueba1.css#L111) `.prueba1-icon-button`. Controla posición y capas, distribución, tamaño y espaciado, apariencia. `position`, `display`, `align-items`, `justify-content`, `width`, `height`, `padding`, `border`, `background`, `color`.
- [L124](../../../apps/referidos-pwa/src/pages/prueba1.css#L124) `.prueba1-icon-button svg`. Controla tamaño y espaciado. `width`, `height`.
- [L129](../../../apps/referidos-pwa/src/pages/prueba1.css#L129) `.prueba1-badge`. Controla posición y capas, tamaño y espaciado, apariencia, texto. `position`, `top`, `right`, `min-width`, `height`, `padding`, `border-radius`, `background`, `color`, `font-size`, `font-weight`, `line-height`, `box-shadow`.
- [L145](../../../apps/referidos-pwa/src/pages/prueba1.css#L145) `.prueba1-profile`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `gap`, `height`, `padding`, `border`, `border-radius`, `background`, `box-shadow`, `color`, `font-size`, `font-weight`.
- [L160](../../../apps/referidos-pwa/src/pages/prueba1.css#L160) `.prueba1-avatar`. Controla tamaño y espaciado, apariencia. `width`, `height`, `border-radius`, `background`, `box-shadow`.
- [L174](../../../apps/referidos-pwa/src/pages/prueba1.css#L174) `.prueba1-profile svg`. Controla tamaño y espaciado. `width`, `height`, `margin-left`.
- [L180](../../../apps/referidos-pwa/src/pages/prueba1.css#L180) `.prueba1-main`. Controla posición y capas, distribución, tamaño y espaciado. `position`, `display`, `grid-template-columns`, `justify-content`, `gap`, `padding`.
- [L189](../../../apps/referidos-pwa/src/pages/prueba1.css#L189) `.prueba1-editor`. Controla posición y capas, tamaño y espaciado, apariencia, interacción y desborde. `position`, `min-height`, `border-radius`, `padding`, `overflow`, `background`, `box-shadow`.
- [L204](../../../apps/referidos-pwa/src/pages/prueba1.css#L204) `.prueba1-editor__glow`. Controla posición y capas, apariencia, interacción y desborde. `position`, `inset`, `border-radius`, `background`, `pointer-events`.
- [L212](../../../apps/referidos-pwa/src/pages/prueba1.css#L212) `.prueba1-editor__glow--secondary`. Controla posición y capas, apariencia. `inset`, `background`.
- [L217](../../../apps/referidos-pwa/src/pages/prueba1.css#L217) `.prueba1-pill-switch`. Controla distribución, tamaño y espaciado, apariencia. `display`, `grid-template-columns`, `width`, `padding`, `border-radius`, `background`, `box-shadow`.
- [L227](../../../apps/referidos-pwa/src/pages/prueba1.css#L227) `.prueba1-pill-switch button, .prueba1-speed-switch button`. Controla apariencia, texto. `border`, `background`, `color`, `font`.
- [L235](../../../apps/referidos-pwa/src/pages/prueba1.css#L235) `.prueba1-pill-switch button`. Controla tamaño y espaciado, apariencia, texto. `height`, `border-radius`, `font-size`, `font-weight`.
- [L242](../../../apps/referidos-pwa/src/pages/prueba1.css#L242) `.prueba1-pill-switch button.is-active`. Controla apariencia. `color`, `background`, `box-shadow`.
- [L251](../../../apps/referidos-pwa/src/pages/prueba1.css#L251) `.prueba1-field`. Controla tamaño y espaciado. `margin-top`.
- [L255](../../../apps/referidos-pwa/src/pages/prueba1.css#L255) `.prueba1-field label`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `margin-bottom`, `color`, `font-size`, `font-weight`.
- [L263](../../../apps/referidos-pwa/src/pages/prueba1.css#L263) `.prueba1-input, .prueba1-textarea, .prueba1-group, .prueba1-chip-input, .prueba1-mini-input, .prueba1-select, .prueba1-add, .prueba1-secondary, .prueba1-primary`. Controla tamaño y espaciado. `box-sizing`.
- [L275](../../../apps/referidos-pwa/src/pages/prueba1.css#L275) `.prueba1-input, .prueba1-textarea`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `justify-content`, `width`, `border-radius`.
- [L284](../../../apps/referidos-pwa/src/pages/prueba1.css#L284) `.prueba1-input`. Controla tamaño y espaciado, apariencia, texto. `min-height`, `padding`, `background`, `color`, `font-size`, `box-shadow`.
- [L295](../../../apps/referidos-pwa/src/pages/prueba1.css#L295) `.prueba1-input svg`. Controla tamaño y espaciado, apariencia, distribución. `width`, `height`, `color`, `flex`.
- [L302](../../../apps/referidos-pwa/src/pages/prueba1.css#L302) `.prueba1-input--select`. Controla apariencia. `background`, `color`, `box-shadow`.
- [L310](../../../apps/referidos-pwa/src/pages/prueba1.css#L310) `.prueba1-input--select svg, .prueba1-select svg`. Controla apariencia. `color`.
- [L315](../../../apps/referidos-pwa/src/pages/prueba1.css#L315) `.prueba1-textarea`. Controla tamaño y espaciado, distribución, apariencia, texto. `min-height`, `align-items`, `padding`, `background`, `color`, `font-size`.
- [L324](../../../apps/referidos-pwa/src/pages/prueba1.css#L324) `.prueba1-group`. Controla apariencia, tamaño y espaciado. `border-radius`, `padding`, `background`, `box-shadow`.
- [L333](../../../apps/referidos-pwa/src/pages/prueba1.css#L333) `.prueba1-group--stacked`. Controla tamaño y espaciado. `padding-top`, `padding-bottom`.
- [L338](../../../apps/referidos-pwa/src/pages/prueba1.css#L338) `.prueba1-condition-row, .prueba1-benefit-row`. Controla distribución, apariencia, texto. `display`, `align-items`, `gap`, `color`, `font-size`, `white-space`.
- [L348](../../../apps/referidos-pwa/src/pages/prueba1.css#L348) `.prueba1-condition-row + .prueba1-condition-row, .prueba1-benefit-row + .prueba1-benefit-row`. Controla tamaño y espaciado. `margin-top`.
- [L353](../../../apps/referidos-pwa/src/pages/prueba1.css#L353) `.prueba1-inline-icon`. Controla tamaño y espaciado, distribución. `width`, `height`, `flex`.
- [L359](../../../apps/referidos-pwa/src/pages/prueba1.css#L359) `.prueba1-inline-icon svg`. Controla tamaño y espaciado, distribución. `width`, `height`, `display`.
- [L365](../../../apps/referidos-pwa/src/pages/prueba1.css#L365) `.prueba1-select`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `justify-content`, `height`, `padding`, `border-radius`, `background`, `color`, `box-shadow`.
- [L377](../../../apps/referidos-pwa/src/pages/prueba1.css#L377) `.prueba1-select svg`. Controla tamaño y espaciado. `width`, `height`, `margin-left`.
- [L383](../../../apps/referidos-pwa/src/pages/prueba1.css#L383) `.prueba1-inline-x`. Controla tamaño y espaciado, apariencia. `margin-right`, `opacity`.
- [L388](../../../apps/referidos-pwa/src/pages/prueba1.css#L388) `.prueba1-chip-input`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `height`, `min-width`, `padding`, `border-radius`, `background`, `color`, `box-shadow`.
- [L400](../../../apps/referidos-pwa/src/pages/prueba1.css#L400) `.prueba1-mini-input`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `justify-content`, `width`, `height`, `border-radius`, `background`, `box-shadow`.
- [L411](../../../apps/referidos-pwa/src/pages/prueba1.css#L411) `.prueba1-trash`. Controla tamaño y espaciado, apariencia. `margin-left`, `width`, `height`, `padding`, `border`, `color`, `background`.
- [L421](../../../apps/referidos-pwa/src/pages/prueba1.css#L421) `.prueba1-trash svg`. Controla tamaño y espaciado, distribución. `width`, `height`, `display`.
- [L427](../../../apps/referidos-pwa/src/pages/prueba1.css#L427) `.prueba1-add`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `gap`, `height`, `margin-top`, `padding`, `border`, `border-radius`, `background`, `color`, `font-size`, `font-weight`, `box-shadow`.
- [L443](../../../apps/referidos-pwa/src/pages/prueba1.css#L443) `.prueba1-add svg`. Controla tamaño y espaciado. `width`, `height`.
- [L448](../../../apps/referidos-pwa/src/pages/prueba1.css#L448) `.prueba1-actions`. Controla distribución, tamaño y espaciado. `display`, `align-items`, `justify-content`, `gap`, `margin-top`.
- [L456](../../../apps/referidos-pwa/src/pages/prueba1.css#L456) `.prueba1-save-state`. Controla distribución, apariencia, texto. `display`, `align-items`, `gap`, `color`, `font-size`.
- [L464](../../../apps/referidos-pwa/src/pages/prueba1.css#L464) `.prueba1-save-dot`. Controla tamaño y espaciado, apariencia. `width`, `height`, `border-radius`, `background`, `box-shadow`.
- [L472](../../../apps/referidos-pwa/src/pages/prueba1.css#L472) `.prueba1-actions__buttons`. Controla distribución. `display`, `align-items`, `gap`.
- [L478](../../../apps/referidos-pwa/src/pages/prueba1.css#L478) `.prueba1-primary, .prueba1-secondary`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `justify-content`, `gap`, `height`, `padding`, `border`, `border-radius`, `color`, `font-size`, `font-weight`.
- [L493](../../../apps/referidos-pwa/src/pages/prueba1.css#L493) `.prueba1-primary`. Controla apariencia. `background`, `box-shadow`.
- [L498](../../../apps/referidos-pwa/src/pages/prueba1.css#L498) `.prueba1-secondary`. Controla apariencia. `background`, `box-shadow`.
- [L503](../../../apps/referidos-pwa/src/pages/prueba1.css#L503) `.prueba1-primary svg, .prueba1-secondary svg`. Controla tamaño y espaciado. `width`, `height`.
- [L509](../../../apps/referidos-pwa/src/pages/prueba1.css#L509) `.prueba1-preview-wrap`. Controla posición y capas, tamaño y espaciado. `position`, `padding-top`.
- [L514](../../../apps/referidos-pwa/src/pages/prueba1.css#L514) `.prueba1-speed-switch`. Controla distribución, tamaño y espaciado, apariencia. `display`, `grid-template-columns`, `width`, `margin`, `padding`, `border-radius`, `background`, `box-shadow`.
- [L525](../../../apps/referidos-pwa/src/pages/prueba1.css#L525) `.prueba1-speed-switch button`. Controla tamaño y espaciado, apariencia, texto. `height`, `border-radius`, `color`, `font-size`, `font-weight`.
- [L533](../../../apps/referidos-pwa/src/pages/prueba1.css#L533) `.prueba1-speed-switch button.is-active`. Controla apariencia. `color`, `background`, `box-shadow`.
- [L539](../../../apps/referidos-pwa/src/pages/prueba1.css#L539) `.prueba1-help-link`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `width`, `margin`, `color`, `font-size`, `text-underline-offset`.
- [L548](../../../apps/referidos-pwa/src/pages/prueba1.css#L548) `.prueba1-dots`. Controla posición y capas, tamaño y espaciado, apariencia. `position`, `width`, `height`, `opacity`, `background-image`, `background-size`.
- [L557](../../../apps/referidos-pwa/src/pages/prueba1.css#L557) `.prueba1-dots--left`. Controla posición y capas. `left`, `bottom`.
- [L562](../../../apps/referidos-pwa/src/pages/prueba1.css#L562) `.prueba1-dots--right`. Controla posición y capas. `right`, `bottom`.
- [L567](../../../apps/referidos-pwa/src/pages/prueba1.css#L567) `.prueba1-card`. Controla posición y capas, tamaño y espaciado, apariencia, interacción y desborde. `position`, `width`, `margin`, `border-radius`, `background`, `box-shadow`, `overflow`.
- [L579](../../../apps/referidos-pwa/src/pages/prueba1.css#L579) `.prueba1-card::before`. Controla renderizado, posición y capas, apariencia, interacción y desborde. `content`, `position`, `inset`, `border-radius`, `border`, `pointer-events`.
- [L588](../../../apps/referidos-pwa/src/pages/prueba1.css#L588) `.prueba1-card__media`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `justify-content`, `height`, `margin`, `border-radius`, `color`, `background`.
- [L601](../../../apps/referidos-pwa/src/pages/prueba1.css#L601) `.prueba1-card__media svg`. Controla tamaño y espaciado. `width`, `height`.
- [L606](../../../apps/referidos-pwa/src/pages/prueba1.css#L606) `.prueba1-card__body`. Controla tamaño y espaciado. `padding`.
- [L610](../../../apps/referidos-pwa/src/pages/prueba1.css#L610) `.prueba1-card__body h1`. Controla tamaño y espaciado, apariencia, texto. `margin`, `color`, `font-size`, `font-weight`, `letter-spacing`.
- [L618](../../../apps/referidos-pwa/src/pages/prueba1.css#L618) `.prueba1-card__body p`. Controla tamaño y espaciado, apariencia, texto. `margin`, `color`, `font-size`.
- [L624](../../../apps/referidos-pwa/src/pages/prueba1.css#L624) `.prueba1-separator`. Controla tamaño y espaciado, apariencia. `height`, `margin`, `background`.
- [L630](../../../apps/referidos-pwa/src/pages/prueba1.css#L630) `.prueba1-card__conditions`. Controla apariencia, tamaño y espaciado. `border-radius`, `padding`, `background`.
- [L636](../../../apps/referidos-pwa/src/pages/prueba1.css#L636) `.prueba1-card__conditions h2`. Controla tamaño y espaciado, apariencia, texto. `margin`, `color`, `font-size`, `font-weight`, `letter-spacing`.
- [L644](../../../apps/referidos-pwa/src/pages/prueba1.css#L644) `.prueba1-card__pill`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `gap`, `min-height`, `padding`, `border-radius`, `background`, `color`, `font-size`.
- [L656](../../../apps/referidos-pwa/src/pages/prueba1.css#L656) `.prueba1-card__pill + .prueba1-card__pill`. Controla tamaño y espaciado. `margin-top`.
- [L660](../../../apps/referidos-pwa/src/pages/prueba1.css#L660) `.prueba1-card__pill svg`. Controla tamaño y espaciado, distribución. `width`, `height`, `flex`.
- [L666](../../../apps/referidos-pwa/src/pages/prueba1.css#L666) `.prueba1-card__pill--alt`. Controla tamaño y espaciado. `width`, `max-width`.
- [L671](../../../apps/referidos-pwa/src/pages/prueba1.css#L671) `.prueba1-card__pill strong`. Controla texto. `font-weight`.
- [L675](../../../apps/referidos-pwa/src/pages/prueba1.css#L675) `.prueba1-meta`. Controla distribución. `display`, `gap`.
- [L680](../../../apps/referidos-pwa/src/pages/prueba1.css#L680) `.prueba1-meta__row`. Controla distribución, apariencia, texto. `display`, `align-items`, `gap`, `color`, `font-size`.
- [L688](../../../apps/referidos-pwa/src/pages/prueba1.css#L688) `.prueba1-meta__row svg`. Controla tamaño y espaciado, apariencia. `width`, `height`, `color`.
- [L694](../../../apps/referidos-pwa/src/pages/prueba1.css#L694) `@media (max-width: 1380px)`. Restringe las reglas por tamaño, dispositivo, accesibilidad o forma de visualización según la condición.
- [L695](../../../apps/referidos-pwa/src/pages/prueba1.css#L695) `.prueba1-main`. Controla distribución. `gap`. Dentro de `@media (max-width: 1380px)`.
- [L699](../../../apps/referidos-pwa/src/pages/prueba1.css#L699) `.prueba1-card`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 1380px)`.
- [L704](../../../apps/referidos-pwa/src/pages/prueba1.css#L704) `@media (max-width: 1220px)`. Restringe las reglas por tamaño, dispositivo, accesibilidad o forma de visualización según la condición.
- [L705](../../../apps/referidos-pwa/src/pages/prueba1.css#L705) `.prueba1-topbar`. Controla tamaño y espaciado, distribución. `height`, `padding-top`, `padding-bottom`, `flex-direction`, `gap`, `align-items`. Dentro de `@media (max-width: 1220px)`.
- [L714](../../../apps/referidos-pwa/src/pages/prueba1.css#L714) `.prueba1-topbar__left`. Controla distribución. `flex-wrap`, `gap`. Dentro de `@media (max-width: 1220px)`.
- [L719](../../../apps/referidos-pwa/src/pages/prueba1.css#L719) `.prueba1-main`. Controla distribución. `grid-template-columns`, `justify-items`, `gap`. Dentro de `@media (max-width: 1220px)`.
- [L725](../../../apps/referidos-pwa/src/pages/prueba1.css#L725) `.prueba1-preview-wrap`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 1220px)`.
- [L730](../../../apps/referidos-pwa/src/pages/prueba1.css#L730) `@media (max-width: 720px)`. Restringe las reglas por tamaño, dispositivo, accesibilidad o forma de visualización según la condición.
- [L731](../../../apps/referidos-pwa/src/pages/prueba1.css#L731) `.prueba1-main`. Controla tamaño y espaciado. `padding`. Dentro de `@media (max-width: 720px)`.
- [L735](../../../apps/referidos-pwa/src/pages/prueba1.css#L735) `.prueba1-editor,   .prueba1-card`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 720px)`.
- [L740](../../../apps/referidos-pwa/src/pages/prueba1.css#L740) `.prueba1-editor`. Controla tamaño y espaciado. `min-height`, `padding`. Dentro de `@media (max-width: 720px)`.
- [L745](../../../apps/referidos-pwa/src/pages/prueba1.css#L745) `.prueba1-pill-switch,   .prueba1-speed-switch`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 720px)`.
- [L750](../../../apps/referidos-pwa/src/pages/prueba1.css#L750) `.prueba1-condition-row,   .prueba1-benefit-row,   .prueba1-actions`. Controla distribución. `flex-wrap`. Dentro de `@media (max-width: 720px)`.
- [L756](../../../apps/referidos-pwa/src/pages/prueba1.css#L756) `.prueba1-chip-input`. Controla tamaño y espaciado. `min-width`, `width`. Dentro de `@media (max-width: 720px)`.
- [L761](../../../apps/referidos-pwa/src/pages/prueba1.css#L761) `.prueba1-actions`. Controla distribución. `align-items`. Dentro de `@media (max-width: 720px)`.
- [L765](../../../apps/referidos-pwa/src/pages/prueba1.css#L765) `.prueba1-actions__buttons`. Controla tamaño y espaciado, distribución. `width`, `flex-direction`. Dentro de `@media (max-width: 720px)`.
- [L770](../../../apps/referidos-pwa/src/pages/prueba1.css#L770) `.prueba1-primary,   .prueba1-secondary`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 720px)`.
- [L775](../../../apps/referidos-pwa/src/pages/prueba1.css#L775) `.prueba1-card__body`. Controla tamaño y espaciado. `padding`. Dentro de `@media (max-width: 720px)`.
- [L780](../../../apps/referidos-pwa/src/pages/prueba1.css#L780) `.prueba1-actions__buttons`. Controla distribución. `flex`.
- [L784](../../../apps/referidos-pwa/src/pages/prueba1.css#L784) `.prueba1-primary, .prueba1-secondary`. Controla texto. `white-space`.
- [L789](../../../apps/referidos-pwa/src/pages/prueba1.css#L789) `.prueba1-editor__glow`. Controla apariencia. `background`.
- [L793](../../../apps/referidos-pwa/src/pages/prueba1.css#L793) `.prueba1-editor__glow--secondary`. Controla apariencia. `background`.
- [L797](../../../apps/referidos-pwa/src/pages/prueba1.css#L797) `.prueba1-pill-switch button.is-active`. Controla apariencia. `box-shadow`.
- [L804](../../../apps/referidos-pwa/src/pages/prueba1.css#L804) `.prueba1-speed-switch button.is-active`. Controla apariencia. `box-shadow`.
- [L808](../../../apps/referidos-pwa/src/pages/prueba1.css#L808) `.prueba1-help-link`. Controla texto. `font-size`, `font-weight`.
- [L813](../../../apps/referidos-pwa/src/pages/prueba1.css#L813) `.prueba1-card`. Controla tamaño y espaciado, texto. `width`, `margin-top`, `font-family`.
- [L819](../../../apps/referidos-pwa/src/pages/prueba1.css#L819) `.prueba1-card::before`. Controla posición y capas. `inset`.
- [L823](../../../apps/referidos-pwa/src/pages/prueba1.css#L823) `.prueba1-card__media`. Controla tamaño y espaciado. `height`.
- [L827](../../../apps/referidos-pwa/src/pages/prueba1.css#L827) `.prueba1-card__media svg`. Controla tamaño y espaciado. `width`, `height`.
- [L832](../../../apps/referidos-pwa/src/pages/prueba1.css#L832) `.prueba1-card__body`. Controla tamaño y espaciado. `padding`.
- [L836](../../../apps/referidos-pwa/src/pages/prueba1.css#L836) `.prueba1-card__body h1`. Controla texto. `font-size`, `font-weight`, `letter-spacing`.
- [L842](../../../apps/referidos-pwa/src/pages/prueba1.css#L842) `.prueba1-card__body p`. Controla tamaño y espaciado, apariencia, texto. `margin-top`, `color`, `font-size`, `font-weight`, `line-height`.
- [L850](../../../apps/referidos-pwa/src/pages/prueba1.css#L850) `.prueba1-separator`. Controla tamaño y espaciado. `margin`.
- [L854](../../../apps/referidos-pwa/src/pages/prueba1.css#L854) `.prueba1-card__conditions`. Controla tamaño y espaciado. `padding`.
- [L858](../../../apps/referidos-pwa/src/pages/prueba1.css#L858) `.prueba1-card__conditions h2`. Controla texto. `font-size`, `font-weight`.
- [L863](../../../apps/referidos-pwa/src/pages/prueba1.css#L863) `.prueba1-card__pill`. Controla distribución, tamaño y espaciado, texto. `gap`, `min-height`, `font-size`, `font-weight`, `line-height`.
- [L871](../../../apps/referidos-pwa/src/pages/prueba1.css#L871) `.prueba1-card__pill strong`. Controla texto. `font-weight`.
- [L875](../../../apps/referidos-pwa/src/pages/prueba1.css#L875) `.prueba1-card__tone`. Controla apariencia, texto. `color`, `font-weight`.
- [L880](../../../apps/referidos-pwa/src/pages/prueba1.css#L880) `.prueba1-card__accent`. Controla apariencia, texto. `color`, `font-weight`.
- [L885](../../../apps/referidos-pwa/src/pages/prueba1.css#L885) `.prueba1-meta`. Controla distribución. `gap`.
- [L889](../../../apps/referidos-pwa/src/pages/prueba1.css#L889) `.prueba1-meta__row`. Controla texto. `font-size`, `font-weight`.
- [L894](../../../apps/referidos-pwa/src/pages/prueba1.css#L894) `.prueba1-card`. Controla tamaño y espaciado. `width`.
- [L898](../../../apps/referidos-pwa/src/pages/prueba1.css#L898) `.prueba1-card__media`. Controla tamaño y espaciado. `height`.
- [L902](../../../apps/referidos-pwa/src/pages/prueba1.css#L902) `.prueba1-card__body`. Controla tamaño y espaciado. `padding`.
- [L906](../../../apps/referidos-pwa/src/pages/prueba1.css#L906) `.prueba1-card__body h1`. Controla texto. `font-size`, `font-weight`.
- [L911](../../../apps/referidos-pwa/src/pages/prueba1.css#L911) `.prueba1-card__conditions h2`. Controla texto. `font-size`, `font-weight`.
- [L916](../../../apps/referidos-pwa/src/pages/prueba1.css#L916) `.prueba1-card__tone`. Controla texto. `font-weight`.
- [L920](../../../apps/referidos-pwa/src/pages/prueba1.css#L920) `.prueba1-meta__row`. Controla texto. `font-size`.

## apps/referidos-pwa/src/pages/prueba2.css

[Abrir fuente](../../../apps/referidos-pwa/src/pages/prueba2.css) · 982 líneas de texto.

Estilos de /prueba2. **Selectores de entrada:** `.prueba2-page`, `.prueba2-topbar`, `.prueba2-topbar__left`, `.prueba2-topbar__right`.

Importaciones directas: [Prueba2Page.jsx](../../../apps/referidos-pwa/src/pages/Prueba2Page.jsx#L2).

### Reglas y condiciones

- [L1](../../../apps/referidos-pwa/src/pages/prueba2.css#L1) `.prueba2-page`. Controla tamaño y espaciado, apariencia, texto. `min-height`, `background`, `color`, `font-family`.
- [L18](../../../apps/referidos-pwa/src/pages/prueba2.css#L18) `.prueba2-topbar`. Controla posición y capas, distribución, tamaño y espaciado, apariencia. `position`, `top`, `z-index`, `display`, `align-items`, `justify-content`, `height`, `padding`, `background`, `box-shadow`.
- [L33](../../../apps/referidos-pwa/src/pages/prueba2.css#L33) `.prueba2-topbar__left, .prueba2-topbar__right`. Controla distribución. `display`, `align-items`.
- [L39](../../../apps/referidos-pwa/src/pages/prueba2.css#L39) `.prueba2-topbar__left`. Controla distribución. `gap`.
- [L43](../../../apps/referidos-pwa/src/pages/prueba2.css#L43) `.prueba2-brand`. Controla distribución, texto, apariencia. `display`, `align-items`, `gap`, `font-size`, `font-weight`, `line-height`, `color`, `letter-spacing`.
- [L54](../../../apps/referidos-pwa/src/pages/prueba2.css#L54) `.prueba2-brand svg`. Controla tamaño y espaciado, distribución. `width`, `height`, `display`.
- [L60](../../../apps/referidos-pwa/src/pages/prueba2.css#L60) `.prueba2-divider`. Controla tamaño y espaciado, apariencia. `width`, `height`, `background`.
- [L66](../../../apps/referidos-pwa/src/pages/prueba2.css#L66) `.prueba2-title`. Controla texto, apariencia. `font-size`, `font-weight`, `color`, `letter-spacing`, `white-space`.
- [L74](../../../apps/referidos-pwa/src/pages/prueba2.css#L74) `.prueba2-mainnav`. Controla distribución, tamaño y espaciado. `display`, `align-items`, `gap`, `margin-left`.
- [L81](../../../apps/referidos-pwa/src/pages/prueba2.css#L81) `.prueba2-mainnav a`. Controla posición y capas, tamaño y espaciado, apariencia, texto. `position`, `padding`, `color`, `text-decoration`, `font-size`, `font-weight`.
- [L90](../../../apps/referidos-pwa/src/pages/prueba2.css#L90) `.prueba2-mainnav a.is-active`. Controla apariencia, texto. `color`, `font-weight`.
- [L95](../../../apps/referidos-pwa/src/pages/prueba2.css#L95) `.prueba2-mainnav a.is-active::after`. Controla renderizado, posición y capas, tamaño y espaciado, apariencia. `content`, `position`, `left`, `right`, `bottom`, `height`, `border-radius`, `background`, `box-shadow`.
- [L107](../../../apps/referidos-pwa/src/pages/prueba2.css#L107) `.prueba2-topbar__right`. Controla distribución. `gap`.
- [L111](../../../apps/referidos-pwa/src/pages/prueba2.css#L111) `.prueba2-icon-button`. Controla posición y capas, distribución, tamaño y espaciado, apariencia. `position`, `display`, `align-items`, `justify-content`, `width`, `height`, `padding`, `border`, `background`, `color`.
- [L124](../../../apps/referidos-pwa/src/pages/prueba2.css#L124) `.prueba2-icon-button svg`. Controla tamaño y espaciado. `width`, `height`.
- [L129](../../../apps/referidos-pwa/src/pages/prueba2.css#L129) `.prueba2-badge`. Controla posición y capas, tamaño y espaciado, apariencia, texto. `position`, `top`, `right`, `min-width`, `height`, `padding`, `border-radius`, `background`, `color`, `font-size`, `font-weight`, `line-height`, `box-shadow`.
- [L145](../../../apps/referidos-pwa/src/pages/prueba2.css#L145) `.prueba2-profile`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `gap`, `height`, `padding`, `border`, `border-radius`, `background`, `box-shadow`, `color`, `font-size`, `font-weight`.
- [L160](../../../apps/referidos-pwa/src/pages/prueba2.css#L160) `.prueba2-avatar`. Controla tamaño y espaciado, apariencia. `width`, `height`, `border-radius`, `background`, `box-shadow`.
- [L174](../../../apps/referidos-pwa/src/pages/prueba2.css#L174) `.prueba2-profile svg`. Controla tamaño y espaciado. `width`, `height`, `margin-left`.
- [L180](../../../apps/referidos-pwa/src/pages/prueba2.css#L180) `.prueba2-main`. Controla posición y capas, distribución, tamaño y espaciado. `position`, `display`, `grid-template-columns`, `justify-content`, `gap`, `padding`.
- [L189](../../../apps/referidos-pwa/src/pages/prueba2.css#L189) `.prueba2-editor`. Controla posición y capas, tamaño y espaciado, apariencia, interacción y desborde. `position`, `min-height`, `border-radius`, `padding`, `overflow`, `background`, `box-shadow`.
- [L204](../../../apps/referidos-pwa/src/pages/prueba2.css#L204) `.prueba2-editor__glow`. Controla posición y capas, apariencia, interacción y desborde. `position`, `inset`, `border-radius`, `background`, `pointer-events`.
- [L212](../../../apps/referidos-pwa/src/pages/prueba2.css#L212) `.prueba2-editor__glow--secondary`. Controla posición y capas, apariencia. `inset`, `background`.
- [L217](../../../apps/referidos-pwa/src/pages/prueba2.css#L217) `.prueba2-pill-switch`. Controla distribución, tamaño y espaciado, apariencia. `display`, `grid-template-columns`, `width`, `padding`, `border-radius`, `background`, `box-shadow`.
- [L227](../../../apps/referidos-pwa/src/pages/prueba2.css#L227) `.prueba2-pill-switch button, .prueba2-speed-switch button`. Controla apariencia, texto. `border`, `background`, `color`, `font`.
- [L235](../../../apps/referidos-pwa/src/pages/prueba2.css#L235) `.prueba2-pill-switch button`. Controla tamaño y espaciado, apariencia, texto. `height`, `border-radius`, `font-size`, `font-weight`.
- [L242](../../../apps/referidos-pwa/src/pages/prueba2.css#L242) `.prueba2-pill-switch button.is-active`. Controla apariencia. `color`, `background`, `box-shadow`.
- [L251](../../../apps/referidos-pwa/src/pages/prueba2.css#L251) `.prueba2-field`. Controla tamaño y espaciado. `margin-top`.
- [L255](../../../apps/referidos-pwa/src/pages/prueba2.css#L255) `.prueba2-field label`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `margin-bottom`, `color`, `font-size`, `font-weight`.
- [L263](../../../apps/referidos-pwa/src/pages/prueba2.css#L263) `.prueba2-input, .prueba2-textarea, .prueba2-group, .prueba2-chip-input, .prueba2-mini-input, .prueba2-select, .prueba2-add, .prueba2-secondary, .prueba2-primary`. Controla tamaño y espaciado. `box-sizing`.
- [L275](../../../apps/referidos-pwa/src/pages/prueba2.css#L275) `.prueba2-input, .prueba2-textarea`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `justify-content`, `width`, `border-radius`.
- [L284](../../../apps/referidos-pwa/src/pages/prueba2.css#L284) `.prueba2-input`. Controla tamaño y espaciado, apariencia, texto. `min-height`, `padding`, `background`, `color`, `font-size`, `box-shadow`.
- [L295](../../../apps/referidos-pwa/src/pages/prueba2.css#L295) `.prueba2-input svg`. Controla tamaño y espaciado, apariencia, distribución. `width`, `height`, `color`, `flex`.
- [L302](../../../apps/referidos-pwa/src/pages/prueba2.css#L302) `.prueba2-input--select`. Controla apariencia. `background`, `color`, `box-shadow`.
- [L310](../../../apps/referidos-pwa/src/pages/prueba2.css#L310) `.prueba2-input--select svg, .prueba2-select svg`. Controla apariencia. `color`.
- [L315](../../../apps/referidos-pwa/src/pages/prueba2.css#L315) `.prueba2-textarea`. Controla tamaño y espaciado, distribución, apariencia, texto. `min-height`, `align-items`, `padding`, `background`, `color`, `font-size`.
- [L324](../../../apps/referidos-pwa/src/pages/prueba2.css#L324) `.prueba2-group`. Controla apariencia, tamaño y espaciado. `border-radius`, `padding`, `background`, `box-shadow`.
- [L333](../../../apps/referidos-pwa/src/pages/prueba2.css#L333) `.prueba2-group--stacked`. Controla tamaño y espaciado. `padding-top`, `padding-bottom`.
- [L338](../../../apps/referidos-pwa/src/pages/prueba2.css#L338) `.prueba2-condition-row, .prueba2-benefit-row`. Controla distribución, apariencia, texto. `display`, `align-items`, `gap`, `color`, `font-size`, `white-space`.
- [L348](../../../apps/referidos-pwa/src/pages/prueba2.css#L348) `.prueba2-condition-row + .prueba2-condition-row, .prueba2-benefit-row + .prueba2-benefit-row`. Controla tamaño y espaciado. `margin-top`.
- [L353](../../../apps/referidos-pwa/src/pages/prueba2.css#L353) `.prueba2-inline-icon`. Controla tamaño y espaciado, distribución. `width`, `height`, `flex`.
- [L359](../../../apps/referidos-pwa/src/pages/prueba2.css#L359) `.prueba2-inline-icon svg`. Controla tamaño y espaciado, distribución. `width`, `height`, `display`.
- [L365](../../../apps/referidos-pwa/src/pages/prueba2.css#L365) `.prueba2-select`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `justify-content`, `height`, `padding`, `border-radius`, `background`, `color`, `box-shadow`.
- [L377](../../../apps/referidos-pwa/src/pages/prueba2.css#L377) `.prueba2-select svg`. Controla tamaño y espaciado. `width`, `height`, `margin-left`.
- [L383](../../../apps/referidos-pwa/src/pages/prueba2.css#L383) `.prueba2-inline-x`. Controla tamaño y espaciado, apariencia. `margin-right`, `opacity`.
- [L388](../../../apps/referidos-pwa/src/pages/prueba2.css#L388) `.prueba2-chip-input`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `height`, `min-width`, `padding`, `border-radius`, `background`, `color`, `box-shadow`.
- [L400](../../../apps/referidos-pwa/src/pages/prueba2.css#L400) `.prueba2-mini-input`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `justify-content`, `width`, `height`, `border-radius`, `background`, `box-shadow`.
- [L411](../../../apps/referidos-pwa/src/pages/prueba2.css#L411) `.prueba2-trash`. Controla tamaño y espaciado, apariencia. `margin-left`, `width`, `height`, `padding`, `border`, `color`, `background`.
- [L421](../../../apps/referidos-pwa/src/pages/prueba2.css#L421) `.prueba2-trash svg`. Controla tamaño y espaciado, distribución. `width`, `height`, `display`.
- [L427](../../../apps/referidos-pwa/src/pages/prueba2.css#L427) `.prueba2-add`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `gap`, `height`, `margin-top`, `padding`, `border`, `border-radius`, `background`, `color`, `font-size`, `font-weight`, `box-shadow`.
- [L443](../../../apps/referidos-pwa/src/pages/prueba2.css#L443) `.prueba2-add svg`. Controla tamaño y espaciado. `width`, `height`.
- [L448](../../../apps/referidos-pwa/src/pages/prueba2.css#L448) `.prueba2-actions`. Controla distribución, tamaño y espaciado. `display`, `align-items`, `justify-content`, `gap`, `margin-top`.
- [L456](../../../apps/referidos-pwa/src/pages/prueba2.css#L456) `.prueba2-save-state`. Controla distribución, apariencia, texto. `display`, `align-items`, `gap`, `color`, `font-size`.
- [L464](../../../apps/referidos-pwa/src/pages/prueba2.css#L464) `.prueba2-save-dot`. Controla tamaño y espaciado, apariencia. `width`, `height`, `border-radius`, `background`, `box-shadow`.
- [L472](../../../apps/referidos-pwa/src/pages/prueba2.css#L472) `.prueba2-actions__buttons`. Controla distribución. `display`, `align-items`, `gap`.
- [L478](../../../apps/referidos-pwa/src/pages/prueba2.css#L478) `.prueba2-primary, .prueba2-secondary`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `justify-content`, `gap`, `height`, `padding`, `border`, `border-radius`, `color`, `font-size`, `font-weight`.
- [L493](../../../apps/referidos-pwa/src/pages/prueba2.css#L493) `.prueba2-primary`. Controla apariencia. `background`, `box-shadow`.
- [L498](../../../apps/referidos-pwa/src/pages/prueba2.css#L498) `.prueba2-secondary`. Controla apariencia. `background`, `box-shadow`.
- [L503](../../../apps/referidos-pwa/src/pages/prueba2.css#L503) `.prueba2-primary svg, .prueba2-secondary svg`. Controla tamaño y espaciado. `width`, `height`.
- [L509](../../../apps/referidos-pwa/src/pages/prueba2.css#L509) `.prueba2-preview-wrap`. Controla posición y capas, tamaño y espaciado. `position`, `padding-top`.
- [L514](../../../apps/referidos-pwa/src/pages/prueba2.css#L514) `.prueba2-speed-switch`. Controla distribución, tamaño y espaciado, apariencia. `display`, `grid-template-columns`, `width`, `margin`, `padding`, `border-radius`, `background`, `box-shadow`.
- [L525](../../../apps/referidos-pwa/src/pages/prueba2.css#L525) `.prueba2-speed-switch button`. Controla tamaño y espaciado, apariencia, texto. `height`, `border-radius`, `color`, `font-size`, `font-weight`.
- [L533](../../../apps/referidos-pwa/src/pages/prueba2.css#L533) `.prueba2-speed-switch button.is-active`. Controla apariencia. `color`, `background`, `box-shadow`.
- [L539](../../../apps/referidos-pwa/src/pages/prueba2.css#L539) `.prueba2-help-link`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `width`, `margin`, `color`, `font-size`, `text-underline-offset`.
- [L548](../../../apps/referidos-pwa/src/pages/prueba2.css#L548) `.prueba2-dots`. Controla posición y capas, tamaño y espaciado, apariencia. `position`, `width`, `height`, `opacity`, `background-image`, `background-size`.
- [L557](../../../apps/referidos-pwa/src/pages/prueba2.css#L557) `.prueba2-dots--left`. Controla posición y capas. `left`, `bottom`.
- [L562](../../../apps/referidos-pwa/src/pages/prueba2.css#L562) `.prueba2-dots--right`. Controla posición y capas. `right`, `bottom`.
- [L567](../../../apps/referidos-pwa/src/pages/prueba2.css#L567) `.prueba2-card`. Controla posición y capas, tamaño y espaciado, apariencia, interacción y desborde. `position`, `width`, `margin`, `border-radius`, `background`, `box-shadow`, `overflow`.
- [L579](../../../apps/referidos-pwa/src/pages/prueba2.css#L579) `.prueba2-card::before`. Controla renderizado, posición y capas, apariencia, interacción y desborde. `content`, `position`, `inset`, `border-radius`, `border`, `pointer-events`.
- [L588](../../../apps/referidos-pwa/src/pages/prueba2.css#L588) `.prueba2-card__media`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `justify-content`, `height`, `margin`, `border-radius`, `color`, `background`.
- [L601](../../../apps/referidos-pwa/src/pages/prueba2.css#L601) `.prueba2-card__media svg`. Controla tamaño y espaciado. `width`, `height`.
- [L606](../../../apps/referidos-pwa/src/pages/prueba2.css#L606) `.prueba2-card__body`. Controla tamaño y espaciado. `padding`.
- [L610](../../../apps/referidos-pwa/src/pages/prueba2.css#L610) `.prueba2-card__body h1`. Controla tamaño y espaciado, apariencia, texto. `margin`, `color`, `font-size`, `font-weight`, `letter-spacing`.
- [L618](../../../apps/referidos-pwa/src/pages/prueba2.css#L618) `.prueba2-card__body p`. Controla tamaño y espaciado, apariencia, texto. `margin`, `color`, `font-size`.
- [L624](../../../apps/referidos-pwa/src/pages/prueba2.css#L624) `.prueba2-separator`. Controla tamaño y espaciado, apariencia. `height`, `margin`, `background`.
- [L630](../../../apps/referidos-pwa/src/pages/prueba2.css#L630) `.prueba2-card__conditions`. Controla apariencia, tamaño y espaciado. `border-radius`, `padding`, `background`.
- [L636](../../../apps/referidos-pwa/src/pages/prueba2.css#L636) `.prueba2-card__conditions h2`. Controla tamaño y espaciado, apariencia, texto. `margin`, `color`, `font-size`, `font-weight`, `letter-spacing`.
- [L644](../../../apps/referidos-pwa/src/pages/prueba2.css#L644) `.prueba2-card__pill`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `gap`, `min-height`, `padding`, `border-radius`, `background`, `color`, `font-size`.
- [L656](../../../apps/referidos-pwa/src/pages/prueba2.css#L656) `.prueba2-card__pill + .prueba2-card__pill`. Controla tamaño y espaciado. `margin-top`.
- [L660](../../../apps/referidos-pwa/src/pages/prueba2.css#L660) `.prueba2-card__pill svg`. Controla tamaño y espaciado, distribución. `width`, `height`, `flex`.
- [L666](../../../apps/referidos-pwa/src/pages/prueba2.css#L666) `.prueba2-card__pill--alt`. Controla tamaño y espaciado. `width`, `max-width`.
- [L671](../../../apps/referidos-pwa/src/pages/prueba2.css#L671) `.prueba2-card__pill strong`. Controla texto. `font-weight`.
- [L675](../../../apps/referidos-pwa/src/pages/prueba2.css#L675) `.prueba2-meta`. Controla distribución. `display`, `gap`.
- [L680](../../../apps/referidos-pwa/src/pages/prueba2.css#L680) `.prueba2-meta__row`. Controla distribución, apariencia, texto. `display`, `align-items`, `gap`, `color`, `font-size`.
- [L688](../../../apps/referidos-pwa/src/pages/prueba2.css#L688) `.prueba2-meta__row svg`. Controla tamaño y espaciado, apariencia. `width`, `height`, `color`.
- [L694](../../../apps/referidos-pwa/src/pages/prueba2.css#L694) `@media (max-width: 1380px)`. Restringe las reglas por tamaño, dispositivo, accesibilidad o forma de visualización según la condición.
- [L695](../../../apps/referidos-pwa/src/pages/prueba2.css#L695) `.prueba2-main`. Controla distribución. `gap`. Dentro de `@media (max-width: 1380px)`.
- [L699](../../../apps/referidos-pwa/src/pages/prueba2.css#L699) `.prueba2-card`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 1380px)`.
- [L704](../../../apps/referidos-pwa/src/pages/prueba2.css#L704) `@media (max-width: 1220px)`. Restringe las reglas por tamaño, dispositivo, accesibilidad o forma de visualización según la condición.
- [L705](../../../apps/referidos-pwa/src/pages/prueba2.css#L705) `.prueba2-topbar`. Controla tamaño y espaciado, distribución. `height`, `padding-top`, `padding-bottom`, `flex-direction`, `gap`, `align-items`. Dentro de `@media (max-width: 1220px)`.
- [L714](../../../apps/referidos-pwa/src/pages/prueba2.css#L714) `.prueba2-topbar__left`. Controla distribución. `flex-wrap`, `gap`. Dentro de `@media (max-width: 1220px)`.
- [L719](../../../apps/referidos-pwa/src/pages/prueba2.css#L719) `.prueba2-main`. Controla distribución. `grid-template-columns`, `justify-items`, `gap`. Dentro de `@media (max-width: 1220px)`.
- [L725](../../../apps/referidos-pwa/src/pages/prueba2.css#L725) `.prueba2-preview-wrap`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 1220px)`.
- [L730](../../../apps/referidos-pwa/src/pages/prueba2.css#L730) `@media (max-width: 720px)`. Restringe las reglas por tamaño, dispositivo, accesibilidad o forma de visualización según la condición.
- [L731](../../../apps/referidos-pwa/src/pages/prueba2.css#L731) `.prueba2-main`. Controla tamaño y espaciado. `padding`. Dentro de `@media (max-width: 720px)`.
- [L735](../../../apps/referidos-pwa/src/pages/prueba2.css#L735) `.prueba2-editor,   .prueba2-card`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 720px)`.
- [L740](../../../apps/referidos-pwa/src/pages/prueba2.css#L740) `.prueba2-editor`. Controla tamaño y espaciado. `min-height`, `padding`. Dentro de `@media (max-width: 720px)`.
- [L745](../../../apps/referidos-pwa/src/pages/prueba2.css#L745) `.prueba2-pill-switch,   .prueba2-speed-switch`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 720px)`.
- [L750](../../../apps/referidos-pwa/src/pages/prueba2.css#L750) `.prueba2-condition-row,   .prueba2-benefit-row,   .prueba2-actions`. Controla distribución. `flex-wrap`. Dentro de `@media (max-width: 720px)`.
- [L756](../../../apps/referidos-pwa/src/pages/prueba2.css#L756) `.prueba2-chip-input`. Controla tamaño y espaciado. `min-width`, `width`. Dentro de `@media (max-width: 720px)`.
- [L761](../../../apps/referidos-pwa/src/pages/prueba2.css#L761) `.prueba2-actions`. Controla distribución. `align-items`. Dentro de `@media (max-width: 720px)`.
- [L765](../../../apps/referidos-pwa/src/pages/prueba2.css#L765) `.prueba2-actions__buttons`. Controla tamaño y espaciado, distribución. `width`, `flex-direction`. Dentro de `@media (max-width: 720px)`.
- [L770](../../../apps/referidos-pwa/src/pages/prueba2.css#L770) `.prueba2-primary,   .prueba2-secondary`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 720px)`.
- [L775](../../../apps/referidos-pwa/src/pages/prueba2.css#L775) `.prueba2-card__body`. Controla tamaño y espaciado. `padding`. Dentro de `@media (max-width: 720px)`.
- [L780](../../../apps/referidos-pwa/src/pages/prueba2.css#L780) `.prueba2-actions__buttons`. Controla distribución. `flex`.
- [L784](../../../apps/referidos-pwa/src/pages/prueba2.css#L784) `.prueba2-primary, .prueba2-secondary`. Controla texto. `white-space`.
- [L789](../../../apps/referidos-pwa/src/pages/prueba2.css#L789) `.prueba2-editor__glow`. Controla apariencia. `background`.
- [L793](../../../apps/referidos-pwa/src/pages/prueba2.css#L793) `.prueba2-editor__glow--secondary`. Controla apariencia. `background`.
- [L797](../../../apps/referidos-pwa/src/pages/prueba2.css#L797) `.prueba2-pill-switch button.is-active`. Controla apariencia. `box-shadow`.
- [L804](../../../apps/referidos-pwa/src/pages/prueba2.css#L804) `.prueba2-speed-switch button.is-active`. Controla apariencia. `box-shadow`.
- [L808](../../../apps/referidos-pwa/src/pages/prueba2.css#L808) `.prueba2-help-link`. Controla texto. `font-size`, `font-weight`.
- [L813](../../../apps/referidos-pwa/src/pages/prueba2.css#L813) `.prueba2-card`. Controla tamaño y espaciado, texto. `width`, `margin-top`, `font-family`.
- [L819](../../../apps/referidos-pwa/src/pages/prueba2.css#L819) `.prueba2-card::before`. Controla posición y capas. `inset`.
- [L823](../../../apps/referidos-pwa/src/pages/prueba2.css#L823) `.prueba2-card__media`. Controla tamaño y espaciado. `height`.
- [L827](../../../apps/referidos-pwa/src/pages/prueba2.css#L827) `.prueba2-card__media svg`. Controla tamaño y espaciado. `width`, `height`.
- [L832](../../../apps/referidos-pwa/src/pages/prueba2.css#L832) `.prueba2-card__body`. Controla tamaño y espaciado. `padding`.
- [L836](../../../apps/referidos-pwa/src/pages/prueba2.css#L836) `.prueba2-card__body h1`. Controla texto. `font-size`, `font-weight`, `letter-spacing`.
- [L842](../../../apps/referidos-pwa/src/pages/prueba2.css#L842) `.prueba2-card__body p`. Controla tamaño y espaciado, apariencia, texto. `margin-top`, `color`, `font-size`, `font-weight`, `line-height`.
- [L850](../../../apps/referidos-pwa/src/pages/prueba2.css#L850) `.prueba2-separator`. Controla tamaño y espaciado. `margin`.
- [L854](../../../apps/referidos-pwa/src/pages/prueba2.css#L854) `.prueba2-card__conditions`. Controla tamaño y espaciado. `padding`.
- [L858](../../../apps/referidos-pwa/src/pages/prueba2.css#L858) `.prueba2-card__conditions h2`. Controla texto. `font-size`, `font-weight`.
- [L863](../../../apps/referidos-pwa/src/pages/prueba2.css#L863) `.prueba2-card__pill`. Controla distribución, tamaño y espaciado, texto. `gap`, `min-height`, `font-size`, `font-weight`, `line-height`.
- [L871](../../../apps/referidos-pwa/src/pages/prueba2.css#L871) `.prueba2-card__pill strong`. Controla texto. `font-weight`.
- [L875](../../../apps/referidos-pwa/src/pages/prueba2.css#L875) `.prueba2-card__tone`. Controla apariencia, texto. `color`, `font-weight`.
- [L880](../../../apps/referidos-pwa/src/pages/prueba2.css#L880) `.prueba2-card__accent`. Controla apariencia, texto. `color`, `font-weight`.
- [L885](../../../apps/referidos-pwa/src/pages/prueba2.css#L885) `.prueba2-meta`. Controla distribución. `gap`.
- [L889](../../../apps/referidos-pwa/src/pages/prueba2.css#L889) `.prueba2-meta__row`. Controla texto. `font-size`, `font-weight`.
- [L894](../../../apps/referidos-pwa/src/pages/prueba2.css#L894) `.prueba2-card`. Controla tamaño y espaciado. `width`.
- [L898](../../../apps/referidos-pwa/src/pages/prueba2.css#L898) `.prueba2-card__media`. Controla tamaño y espaciado. `height`.
- [L902](../../../apps/referidos-pwa/src/pages/prueba2.css#L902) `.prueba2-card__body`. Controla tamaño y espaciado. `padding`.
- [L906](../../../apps/referidos-pwa/src/pages/prueba2.css#L906) `.prueba2-card__body h1`. Controla texto. `font-size`, `font-weight`.
- [L911](../../../apps/referidos-pwa/src/pages/prueba2.css#L911) `.prueba2-card__conditions h2`. Controla texto. `font-size`, `font-weight`.
- [L916](../../../apps/referidos-pwa/src/pages/prueba2.css#L916) `.prueba2-card__tone`. Controla texto. `font-weight`.
- [L920](../../../apps/referidos-pwa/src/pages/prueba2.css#L920) `.prueba2-meta__row`. Controla texto. `font-size`.
- [L924](../../../apps/referidos-pwa/src/pages/prueba2.css#L924) `.prueba2-editor`. Controla apariencia. `background`.
- [L931](../../../apps/referidos-pwa/src/pages/prueba2.css#L931) `.prueba2-editor__glow`. Controla posición y capas, apariencia. `inset`, `background`.
- [L936](../../../apps/referidos-pwa/src/pages/prueba2.css#L936) `.prueba2-editor__glow--secondary`. Controla posición y capas, apariencia. `inset`, `background`.
- [L941](../../../apps/referidos-pwa/src/pages/prueba2.css#L941) `.prueba2-pill-switch`. Controla apariencia. `background`.
- [L945](../../../apps/referidos-pwa/src/pages/prueba2.css#L945) `.prueba2-pill-switch button.is-active`. Controla apariencia. `box-shadow`.
- [L952](../../../apps/referidos-pwa/src/pages/prueba2.css#L952) `.prueba2-card__body h1`. Controla texto. `font-weight`.
- [L956](../../../apps/referidos-pwa/src/pages/prueba2.css#L956) `.prueba2-card__conditions h2`. Controla texto. `font-weight`.
- [L960](../../../apps/referidos-pwa/src/pages/prueba2.css#L960) `.prueba2-editor`. Controla apariencia. `background`.
- [L967](../../../apps/referidos-pwa/src/pages/prueba2.css#L967) `.prueba2-editor__glow`. Controla apariencia. `background`.
- [L971](../../../apps/referidos-pwa/src/pages/prueba2.css#L971) `.prueba2-editor__glow--secondary`. Controla apariencia. `background`.
- [L975](../../../apps/referidos-pwa/src/pages/prueba2.css#L975) `.prueba2-card__body h1`. Controla texto. `font-weight`.
- [L979](../../../apps/referidos-pwa/src/pages/prueba2.css#L979) `.prueba2-card__conditions h2`. Controla texto. `font-weight`.

## apps/referidos-pwa/src/pages/prueba3.css

[Abrir fuente](../../../apps/referidos-pwa/src/pages/prueba3.css) · 1569 líneas de texto.

Estilos de /prueba3. **Selectores de entrada:** `.prueba3-page`, `.prueba3-topbar`, `.prueba3-topbar__left`, `.prueba3-topbar__right`.

Importaciones directas: [Prueba3Page.jsx](../../../apps/referidos-pwa/src/pages/Prueba3Page.jsx#L2).

### Reglas y condiciones

- [L1](../../../apps/referidos-pwa/src/pages/prueba3.css#L1) `.prueba3-page`. Controla tamaño y espaciado, apariencia, texto. `min-height`, `background`, `color`, `font-family`.
- [L18](../../../apps/referidos-pwa/src/pages/prueba3.css#L18) `.prueba3-topbar`. Controla posición y capas, distribución, tamaño y espaciado, apariencia. `position`, `top`, `z-index`, `display`, `align-items`, `justify-content`, `height`, `padding`, `background`, `box-shadow`.
- [L33](../../../apps/referidos-pwa/src/pages/prueba3.css#L33) `.prueba3-topbar__left, .prueba3-topbar__right`. Controla distribución. `display`, `align-items`.
- [L39](../../../apps/referidos-pwa/src/pages/prueba3.css#L39) `.prueba3-topbar__left`. Controla distribución. `gap`.
- [L43](../../../apps/referidos-pwa/src/pages/prueba3.css#L43) `.prueba3-brand`. Controla distribución, texto, apariencia. `display`, `align-items`, `gap`, `font-size`, `font-weight`, `line-height`, `color`, `letter-spacing`.
- [L54](../../../apps/referidos-pwa/src/pages/prueba3.css#L54) `.prueba3-brand svg`. Controla tamaño y espaciado, distribución. `width`, `height`, `display`.
- [L60](../../../apps/referidos-pwa/src/pages/prueba3.css#L60) `.prueba3-divider`. Controla tamaño y espaciado, apariencia. `width`, `height`, `background`.
- [L66](../../../apps/referidos-pwa/src/pages/prueba3.css#L66) `.prueba3-title`. Controla texto, apariencia. `font-size`, `font-weight`, `color`, `letter-spacing`, `white-space`.
- [L74](../../../apps/referidos-pwa/src/pages/prueba3.css#L74) `.prueba3-mainnav`. Controla distribución, tamaño y espaciado. `display`, `align-items`, `gap`, `margin-left`.
- [L81](../../../apps/referidos-pwa/src/pages/prueba3.css#L81) `.prueba3-mainnav a`. Controla posición y capas, tamaño y espaciado, apariencia, texto. `position`, `padding`, `color`, `text-decoration`, `font-size`, `font-weight`.
- [L90](../../../apps/referidos-pwa/src/pages/prueba3.css#L90) `.prueba3-mainnav a.is-active`. Controla apariencia, texto. `color`, `font-weight`.
- [L95](../../../apps/referidos-pwa/src/pages/prueba3.css#L95) `.prueba3-mainnav a.is-active::after`. Controla renderizado, posición y capas, tamaño y espaciado, apariencia. `content`, `position`, `left`, `right`, `bottom`, `height`, `border-radius`, `background`, `box-shadow`.
- [L107](../../../apps/referidos-pwa/src/pages/prueba3.css#L107) `.prueba3-topbar__right`. Controla distribución. `gap`.
- [L111](../../../apps/referidos-pwa/src/pages/prueba3.css#L111) `.prueba3-icon-button`. Controla posición y capas, distribución, tamaño y espaciado, apariencia. `position`, `display`, `align-items`, `justify-content`, `width`, `height`, `padding`, `border`, `background`, `color`.
- [L124](../../../apps/referidos-pwa/src/pages/prueba3.css#L124) `.prueba3-icon-button svg`. Controla tamaño y espaciado. `width`, `height`.
- [L129](../../../apps/referidos-pwa/src/pages/prueba3.css#L129) `.prueba3-badge`. Controla posición y capas, tamaño y espaciado, apariencia, texto. `position`, `top`, `right`, `min-width`, `height`, `padding`, `border-radius`, `background`, `color`, `font-size`, `font-weight`, `line-height`, `box-shadow`.
- [L145](../../../apps/referidos-pwa/src/pages/prueba3.css#L145) `.prueba3-profile`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `gap`, `height`, `padding`, `border`, `border-radius`, `background`, `box-shadow`, `color`, `font-size`, `font-weight`.
- [L160](../../../apps/referidos-pwa/src/pages/prueba3.css#L160) `.prueba3-avatar`. Controla tamaño y espaciado, apariencia. `width`, `height`, `border-radius`, `background`, `box-shadow`.
- [L174](../../../apps/referidos-pwa/src/pages/prueba3.css#L174) `.prueba3-profile svg`. Controla tamaño y espaciado. `width`, `height`, `margin-left`.
- [L180](../../../apps/referidos-pwa/src/pages/prueba3.css#L180) `.prueba3-main`. Controla posición y capas, distribución, tamaño y espaciado. `position`, `display`, `grid-template-columns`, `justify-content`, `gap`, `padding`.
- [L189](../../../apps/referidos-pwa/src/pages/prueba3.css#L189) `.prueba3-editor`. Controla posición y capas, tamaño y espaciado, apariencia, interacción y desborde. `position`, `min-height`, `border-radius`, `padding`, `overflow`, `background`, `box-shadow`.
- [L204](../../../apps/referidos-pwa/src/pages/prueba3.css#L204) `.prueba3-editor__glow`. Controla posición y capas, apariencia, interacción y desborde. `position`, `inset`, `border-radius`, `background`, `pointer-events`.
- [L212](../../../apps/referidos-pwa/src/pages/prueba3.css#L212) `.prueba3-editor__glow--secondary`. Controla posición y capas, apariencia. `inset`, `background`.
- [L217](../../../apps/referidos-pwa/src/pages/prueba3.css#L217) `.prueba3-pill-switch`. Controla distribución, tamaño y espaciado, apariencia. `display`, `grid-template-columns`, `width`, `padding`, `border-radius`, `background`, `box-shadow`.
- [L227](../../../apps/referidos-pwa/src/pages/prueba3.css#L227) `.prueba3-pill-switch button, .prueba3-speed-switch button`. Controla apariencia, texto. `border`, `background`, `color`, `font`.
- [L235](../../../apps/referidos-pwa/src/pages/prueba3.css#L235) `.prueba3-pill-switch button`. Controla tamaño y espaciado, apariencia, texto. `height`, `border-radius`, `font-size`, `font-weight`.
- [L242](../../../apps/referidos-pwa/src/pages/prueba3.css#L242) `.prueba3-pill-switch button.is-active`. Controla apariencia. `color`, `background`, `box-shadow`.
- [L251](../../../apps/referidos-pwa/src/pages/prueba3.css#L251) `.prueba3-field`. Controla tamaño y espaciado. `margin-top`.
- [L255](../../../apps/referidos-pwa/src/pages/prueba3.css#L255) `.prueba3-field label`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `margin-bottom`, `color`, `font-size`, `font-weight`.
- [L263](../../../apps/referidos-pwa/src/pages/prueba3.css#L263) `.prueba3-input, .prueba3-textarea, .prueba3-group, .prueba3-chip-input, .prueba3-mini-input, .prueba3-select, .prueba3-add, .prueba3-secondary, .prueba3-primary`. Controla tamaño y espaciado. `box-sizing`.
- [L275](../../../apps/referidos-pwa/src/pages/prueba3.css#L275) `.prueba3-input, .prueba3-textarea`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `justify-content`, `width`, `border-radius`.
- [L284](../../../apps/referidos-pwa/src/pages/prueba3.css#L284) `.prueba3-input`. Controla tamaño y espaciado, apariencia, texto. `min-height`, `padding`, `background`, `color`, `font-size`, `box-shadow`.
- [L295](../../../apps/referidos-pwa/src/pages/prueba3.css#L295) `.prueba3-input svg`. Controla tamaño y espaciado, apariencia, distribución. `width`, `height`, `color`, `flex`.
- [L302](../../../apps/referidos-pwa/src/pages/prueba3.css#L302) `.prueba3-input--select`. Controla apariencia. `background`, `color`, `box-shadow`.
- [L310](../../../apps/referidos-pwa/src/pages/prueba3.css#L310) `.prueba3-input--select svg, .prueba3-select svg`. Controla apariencia. `color`.
- [L315](../../../apps/referidos-pwa/src/pages/prueba3.css#L315) `.prueba3-textarea`. Controla tamaño y espaciado, distribución, apariencia, texto. `min-height`, `align-items`, `padding`, `background`, `color`, `font-size`.
- [L324](../../../apps/referidos-pwa/src/pages/prueba3.css#L324) `.prueba3-group`. Controla apariencia, tamaño y espaciado. `border-radius`, `padding`, `background`, `box-shadow`.
- [L333](../../../apps/referidos-pwa/src/pages/prueba3.css#L333) `.prueba3-group--stacked`. Controla tamaño y espaciado. `padding-top`, `padding-bottom`.
- [L338](../../../apps/referidos-pwa/src/pages/prueba3.css#L338) `.prueba3-condition-row, .prueba3-benefit-row`. Controla distribución, apariencia, texto. `display`, `align-items`, `gap`, `color`, `font-size`, `white-space`.
- [L348](../../../apps/referidos-pwa/src/pages/prueba3.css#L348) `.prueba3-condition-row + .prueba3-condition-row, .prueba3-benefit-row + .prueba3-benefit-row`. Controla tamaño y espaciado. `margin-top`.
- [L353](../../../apps/referidos-pwa/src/pages/prueba3.css#L353) `.prueba3-inline-icon`. Controla tamaño y espaciado, distribución. `width`, `height`, `flex`.
- [L359](../../../apps/referidos-pwa/src/pages/prueba3.css#L359) `.prueba3-inline-icon svg`. Controla tamaño y espaciado, distribución. `width`, `height`, `display`.
- [L365](../../../apps/referidos-pwa/src/pages/prueba3.css#L365) `.prueba3-select`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `justify-content`, `height`, `padding`, `border-radius`, `background`, `color`, `box-shadow`.
- [L377](../../../apps/referidos-pwa/src/pages/prueba3.css#L377) `.prueba3-select svg`. Controla tamaño y espaciado. `width`, `height`, `margin-left`.
- [L383](../../../apps/referidos-pwa/src/pages/prueba3.css#L383) `.prueba3-inline-x`. Controla tamaño y espaciado, apariencia. `margin-right`, `opacity`.
- [L388](../../../apps/referidos-pwa/src/pages/prueba3.css#L388) `.prueba3-chip-input`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `height`, `min-width`, `padding`, `border-radius`, `background`, `color`, `box-shadow`.
- [L400](../../../apps/referidos-pwa/src/pages/prueba3.css#L400) `.prueba3-mini-input`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `justify-content`, `width`, `height`, `border-radius`, `background`, `box-shadow`.
- [L411](../../../apps/referidos-pwa/src/pages/prueba3.css#L411) `.prueba3-trash`. Controla tamaño y espaciado, apariencia. `margin-left`, `width`, `height`, `padding`, `border`, `color`, `background`.
- [L421](../../../apps/referidos-pwa/src/pages/prueba3.css#L421) `.prueba3-trash svg`. Controla tamaño y espaciado, distribución. `width`, `height`, `display`.
- [L427](../../../apps/referidos-pwa/src/pages/prueba3.css#L427) `.prueba3-add`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `gap`, `height`, `margin-top`, `padding`, `border`, `border-radius`, `background`, `color`, `font-size`, `font-weight`, `box-shadow`.
- [L443](../../../apps/referidos-pwa/src/pages/prueba3.css#L443) `.prueba3-add svg`. Controla tamaño y espaciado. `width`, `height`.
- [L448](../../../apps/referidos-pwa/src/pages/prueba3.css#L448) `.prueba3-actions`. Controla distribución, tamaño y espaciado. `display`, `align-items`, `justify-content`, `gap`, `margin-top`.
- [L456](../../../apps/referidos-pwa/src/pages/prueba3.css#L456) `.prueba3-save-state`. Controla distribución, apariencia, texto. `display`, `align-items`, `gap`, `color`, `font-size`.
- [L464](../../../apps/referidos-pwa/src/pages/prueba3.css#L464) `.prueba3-save-dot`. Controla tamaño y espaciado, apariencia. `width`, `height`, `border-radius`, `background`, `box-shadow`.
- [L472](../../../apps/referidos-pwa/src/pages/prueba3.css#L472) `.prueba3-actions__buttons`. Controla distribución. `display`, `align-items`, `gap`.
- [L478](../../../apps/referidos-pwa/src/pages/prueba3.css#L478) `.prueba3-primary, .prueba3-secondary`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `justify-content`, `gap`, `height`, `padding`, `border`, `border-radius`, `color`, `font-size`, `font-weight`.
- [L493](../../../apps/referidos-pwa/src/pages/prueba3.css#L493) `.prueba3-primary`. Controla apariencia. `background`, `box-shadow`.
- [L498](../../../apps/referidos-pwa/src/pages/prueba3.css#L498) `.prueba3-secondary`. Controla apariencia. `background`, `box-shadow`.
- [L503](../../../apps/referidos-pwa/src/pages/prueba3.css#L503) `.prueba3-primary svg, .prueba3-secondary svg`. Controla tamaño y espaciado. `width`, `height`.
- [L509](../../../apps/referidos-pwa/src/pages/prueba3.css#L509) `.prueba3-preview-wrap`. Controla posición y capas, tamaño y espaciado. `position`, `padding-top`.
- [L514](../../../apps/referidos-pwa/src/pages/prueba3.css#L514) `.prueba3-speed-switch`. Controla distribución, tamaño y espaciado, apariencia. `display`, `grid-template-columns`, `width`, `margin`, `padding`, `border-radius`, `background`, `box-shadow`.
- [L525](../../../apps/referidos-pwa/src/pages/prueba3.css#L525) `.prueba3-speed-switch button`. Controla tamaño y espaciado, apariencia, texto. `height`, `border-radius`, `color`, `font-size`, `font-weight`.
- [L533](../../../apps/referidos-pwa/src/pages/prueba3.css#L533) `.prueba3-speed-switch button.is-active`. Controla apariencia. `color`, `background`, `box-shadow`.
- [L539](../../../apps/referidos-pwa/src/pages/prueba3.css#L539) `.prueba3-help-link`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `width`, `margin`, `color`, `font-size`, `text-underline-offset`.
- [L548](../../../apps/referidos-pwa/src/pages/prueba3.css#L548) `.prueba3-dots`. Controla posición y capas, tamaño y espaciado, apariencia. `position`, `width`, `height`, `opacity`, `background-image`, `background-size`.
- [L557](../../../apps/referidos-pwa/src/pages/prueba3.css#L557) `.prueba3-dots--left`. Controla posición y capas. `left`, `bottom`.
- [L562](../../../apps/referidos-pwa/src/pages/prueba3.css#L562) `.prueba3-dots--right`. Controla posición y capas. `right`, `bottom`.
- [L567](../../../apps/referidos-pwa/src/pages/prueba3.css#L567) `.prueba3-card`. Controla posición y capas, tamaño y espaciado, apariencia, interacción y desborde. `position`, `width`, `margin`, `border-radius`, `background`, `box-shadow`, `overflow`.
- [L579](../../../apps/referidos-pwa/src/pages/prueba3.css#L579) `.prueba3-card::before`. Controla renderizado, posición y capas, apariencia, interacción y desborde. `content`, `position`, `inset`, `border-radius`, `border`, `pointer-events`.
- [L588](../../../apps/referidos-pwa/src/pages/prueba3.css#L588) `.prueba3-card__media`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `justify-content`, `height`, `margin`, `border-radius`, `color`, `background`.
- [L601](../../../apps/referidos-pwa/src/pages/prueba3.css#L601) `.prueba3-card__media svg`. Controla tamaño y espaciado. `width`, `height`.
- [L606](../../../apps/referidos-pwa/src/pages/prueba3.css#L606) `.prueba3-card__body`. Controla tamaño y espaciado. `padding`.
- [L610](../../../apps/referidos-pwa/src/pages/prueba3.css#L610) `.prueba3-card__body h1`. Controla tamaño y espaciado, apariencia, texto. `margin`, `color`, `font-size`, `font-weight`, `letter-spacing`.
- [L618](../../../apps/referidos-pwa/src/pages/prueba3.css#L618) `.prueba3-card__body p`. Controla tamaño y espaciado, apariencia, texto. `margin`, `color`, `font-size`.
- [L624](../../../apps/referidos-pwa/src/pages/prueba3.css#L624) `.prueba3-separator`. Controla tamaño y espaciado, apariencia. `height`, `margin`, `background`.
- [L630](../../../apps/referidos-pwa/src/pages/prueba3.css#L630) `.prueba3-card__conditions`. Controla apariencia, tamaño y espaciado. `border-radius`, `padding`, `background`.
- [L636](../../../apps/referidos-pwa/src/pages/prueba3.css#L636) `.prueba3-card__conditions h2`. Controla tamaño y espaciado, apariencia, texto. `margin`, `color`, `font-size`, `font-weight`, `letter-spacing`.
- [L644](../../../apps/referidos-pwa/src/pages/prueba3.css#L644) `.prueba3-card__pill`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `gap`, `min-height`, `padding`, `border-radius`, `background`, `color`, `font-size`.
- [L656](../../../apps/referidos-pwa/src/pages/prueba3.css#L656) `.prueba3-card__pill + .prueba3-card__pill`. Controla tamaño y espaciado. `margin-top`.
- [L660](../../../apps/referidos-pwa/src/pages/prueba3.css#L660) `.prueba3-card__pill svg`. Controla tamaño y espaciado, distribución. `width`, `height`, `flex`.
- [L666](../../../apps/referidos-pwa/src/pages/prueba3.css#L666) `.prueba3-card__pill--alt`. Controla tamaño y espaciado. `width`, `max-width`.
- [L671](../../../apps/referidos-pwa/src/pages/prueba3.css#L671) `.prueba3-card__pill strong`. Controla texto. `font-weight`.
- [L675](../../../apps/referidos-pwa/src/pages/prueba3.css#L675) `.prueba3-meta`. Controla distribución. `display`, `gap`.
- [L680](../../../apps/referidos-pwa/src/pages/prueba3.css#L680) `.prueba3-meta__row`. Controla distribución, apariencia, texto. `display`, `align-items`, `gap`, `color`, `font-size`.
- [L688](../../../apps/referidos-pwa/src/pages/prueba3.css#L688) `.prueba3-meta__row svg`. Controla tamaño y espaciado, apariencia. `width`, `height`, `color`.
- [L694](../../../apps/referidos-pwa/src/pages/prueba3.css#L694) `@media (max-width: 1380px)`. Restringe las reglas por tamaño, dispositivo, accesibilidad o forma de visualización según la condición.
- [L695](../../../apps/referidos-pwa/src/pages/prueba3.css#L695) `.prueba3-main`. Controla distribución. `gap`. Dentro de `@media (max-width: 1380px)`.
- [L699](../../../apps/referidos-pwa/src/pages/prueba3.css#L699) `.prueba3-card`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 1380px)`.
- [L704](../../../apps/referidos-pwa/src/pages/prueba3.css#L704) `@media (max-width: 1220px)`. Restringe las reglas por tamaño, dispositivo, accesibilidad o forma de visualización según la condición.
- [L705](../../../apps/referidos-pwa/src/pages/prueba3.css#L705) `.prueba3-topbar`. Controla tamaño y espaciado, distribución. `height`, `padding-top`, `padding-bottom`, `flex-direction`, `gap`, `align-items`. Dentro de `@media (max-width: 1220px)`.
- [L714](../../../apps/referidos-pwa/src/pages/prueba3.css#L714) `.prueba3-topbar__left`. Controla distribución. `flex-wrap`, `gap`. Dentro de `@media (max-width: 1220px)`.
- [L719](../../../apps/referidos-pwa/src/pages/prueba3.css#L719) `.prueba3-main`. Controla distribución. `grid-template-columns`, `justify-items`, `gap`. Dentro de `@media (max-width: 1220px)`.
- [L725](../../../apps/referidos-pwa/src/pages/prueba3.css#L725) `.prueba3-preview-wrap`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 1220px)`.
- [L730](../../../apps/referidos-pwa/src/pages/prueba3.css#L730) `@media (max-width: 720px)`. Restringe las reglas por tamaño, dispositivo, accesibilidad o forma de visualización según la condición.
- [L731](../../../apps/referidos-pwa/src/pages/prueba3.css#L731) `.prueba3-main`. Controla tamaño y espaciado. `padding`. Dentro de `@media (max-width: 720px)`.
- [L735](../../../apps/referidos-pwa/src/pages/prueba3.css#L735) `.prueba3-editor,   .prueba3-card`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 720px)`.
- [L740](../../../apps/referidos-pwa/src/pages/prueba3.css#L740) `.prueba3-editor`. Controla tamaño y espaciado. `min-height`, `padding`. Dentro de `@media (max-width: 720px)`.
- [L745](../../../apps/referidos-pwa/src/pages/prueba3.css#L745) `.prueba3-pill-switch,   .prueba3-speed-switch`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 720px)`.
- [L750](../../../apps/referidos-pwa/src/pages/prueba3.css#L750) `.prueba3-condition-row,   .prueba3-benefit-row,   .prueba3-actions`. Controla distribución. `flex-wrap`. Dentro de `@media (max-width: 720px)`.
- [L756](../../../apps/referidos-pwa/src/pages/prueba3.css#L756) `.prueba3-chip-input`. Controla tamaño y espaciado. `min-width`, `width`. Dentro de `@media (max-width: 720px)`.
- [L761](../../../apps/referidos-pwa/src/pages/prueba3.css#L761) `.prueba3-actions`. Controla distribución. `align-items`. Dentro de `@media (max-width: 720px)`.
- [L765](../../../apps/referidos-pwa/src/pages/prueba3.css#L765) `.prueba3-actions__buttons`. Controla tamaño y espaciado, distribución. `width`, `flex-direction`. Dentro de `@media (max-width: 720px)`.
- [L770](../../../apps/referidos-pwa/src/pages/prueba3.css#L770) `.prueba3-primary,   .prueba3-secondary`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 720px)`.
- [L775](../../../apps/referidos-pwa/src/pages/prueba3.css#L775) `.prueba3-card__body`. Controla tamaño y espaciado. `padding`. Dentro de `@media (max-width: 720px)`.
- [L780](../../../apps/referidos-pwa/src/pages/prueba3.css#L780) `.prueba3-actions__buttons`. Controla distribución. `flex`.
- [L784](../../../apps/referidos-pwa/src/pages/prueba3.css#L784) `.prueba3-primary, .prueba3-secondary`. Controla texto. `white-space`.
- [L789](../../../apps/referidos-pwa/src/pages/prueba3.css#L789) `.prueba3-editor__glow`. Controla apariencia. `background`.
- [L793](../../../apps/referidos-pwa/src/pages/prueba3.css#L793) `.prueba3-editor__glow--secondary`. Controla apariencia. `background`.
- [L797](../../../apps/referidos-pwa/src/pages/prueba3.css#L797) `.prueba3-pill-switch button.is-active`. Controla apariencia. `box-shadow`.
- [L804](../../../apps/referidos-pwa/src/pages/prueba3.css#L804) `.prueba3-speed-switch button.is-active`. Controla apariencia. `box-shadow`.
- [L808](../../../apps/referidos-pwa/src/pages/prueba3.css#L808) `.prueba3-help-link`. Controla texto. `font-size`, `font-weight`.
- [L813](../../../apps/referidos-pwa/src/pages/prueba3.css#L813) `.prueba3-card`. Controla tamaño y espaciado, texto. `width`, `margin-top`, `font-family`.
- [L819](../../../apps/referidos-pwa/src/pages/prueba3.css#L819) `.prueba3-card::before`. Controla posición y capas. `inset`.
- [L823](../../../apps/referidos-pwa/src/pages/prueba3.css#L823) `.prueba3-card__media`. Controla tamaño y espaciado. `height`.
- [L827](../../../apps/referidos-pwa/src/pages/prueba3.css#L827) `.prueba3-card__media svg`. Controla tamaño y espaciado. `width`, `height`.
- [L832](../../../apps/referidos-pwa/src/pages/prueba3.css#L832) `.prueba3-card__body`. Controla tamaño y espaciado. `padding`.
- [L836](../../../apps/referidos-pwa/src/pages/prueba3.css#L836) `.prueba3-card__body h1`. Controla texto. `font-size`, `font-weight`, `letter-spacing`.
- [L842](../../../apps/referidos-pwa/src/pages/prueba3.css#L842) `.prueba3-card__body p`. Controla tamaño y espaciado, apariencia, texto. `margin-top`, `color`, `font-size`, `font-weight`, `line-height`.
- [L850](../../../apps/referidos-pwa/src/pages/prueba3.css#L850) `.prueba3-separator`. Controla tamaño y espaciado. `margin`.
- [L854](../../../apps/referidos-pwa/src/pages/prueba3.css#L854) `.prueba3-card__conditions`. Controla tamaño y espaciado. `padding`.
- [L858](../../../apps/referidos-pwa/src/pages/prueba3.css#L858) `.prueba3-card__conditions h2`. Controla texto. `font-size`, `font-weight`.
- [L863](../../../apps/referidos-pwa/src/pages/prueba3.css#L863) `.prueba3-card__pill`. Controla distribución, tamaño y espaciado, texto. `gap`, `min-height`, `font-size`, `font-weight`, `line-height`.
- [L871](../../../apps/referidos-pwa/src/pages/prueba3.css#L871) `.prueba3-card__pill strong`. Controla texto. `font-weight`.
- [L875](../../../apps/referidos-pwa/src/pages/prueba3.css#L875) `.prueba3-card__tone`. Controla apariencia, texto. `color`, `font-weight`.
- [L880](../../../apps/referidos-pwa/src/pages/prueba3.css#L880) `.prueba3-card__accent`. Controla apariencia, texto. `color`, `font-weight`.
- [L885](../../../apps/referidos-pwa/src/pages/prueba3.css#L885) `.prueba3-meta`. Controla distribución. `gap`.
- [L889](../../../apps/referidos-pwa/src/pages/prueba3.css#L889) `.prueba3-meta__row`. Controla texto. `font-size`, `font-weight`.
- [L894](../../../apps/referidos-pwa/src/pages/prueba3.css#L894) `.prueba3-card`. Controla tamaño y espaciado. `width`.
- [L898](../../../apps/referidos-pwa/src/pages/prueba3.css#L898) `.prueba3-card__media`. Controla tamaño y espaciado. `height`.
- [L902](../../../apps/referidos-pwa/src/pages/prueba3.css#L902) `.prueba3-card__body`. Controla tamaño y espaciado. `padding`.
- [L906](../../../apps/referidos-pwa/src/pages/prueba3.css#L906) `.prueba3-card__body h1`. Controla texto. `font-size`, `font-weight`.
- [L911](../../../apps/referidos-pwa/src/pages/prueba3.css#L911) `.prueba3-card__conditions h2`. Controla texto. `font-size`, `font-weight`.
- [L916](../../../apps/referidos-pwa/src/pages/prueba3.css#L916) `.prueba3-card__tone`. Controla texto. `font-weight`.
- [L920](../../../apps/referidos-pwa/src/pages/prueba3.css#L920) `.prueba3-meta__row`. Controla texto. `font-size`.
- [L924](../../../apps/referidos-pwa/src/pages/prueba3.css#L924) `.prueba3-editor`. Controla apariencia. `background`.
- [L931](../../../apps/referidos-pwa/src/pages/prueba3.css#L931) `.prueba3-editor__glow`. Controla posición y capas, apariencia. `inset`, `background`.
- [L936](../../../apps/referidos-pwa/src/pages/prueba3.css#L936) `.prueba3-editor__glow--secondary`. Controla posición y capas, apariencia. `inset`, `background`.
- [L941](../../../apps/referidos-pwa/src/pages/prueba3.css#L941) `.prueba3-pill-switch`. Controla apariencia. `background`.
- [L945](../../../apps/referidos-pwa/src/pages/prueba3.css#L945) `.prueba3-pill-switch button.is-active`. Controla apariencia. `box-shadow`.
- [L952](../../../apps/referidos-pwa/src/pages/prueba3.css#L952) `.prueba3-card__body h1`. Controla texto. `font-weight`.
- [L956](../../../apps/referidos-pwa/src/pages/prueba3.css#L956) `.prueba3-card__conditions h2`. Controla texto. `font-weight`.
- [L960](../../../apps/referidos-pwa/src/pages/prueba3.css#L960) `.prueba3-editor`. Controla apariencia. `background`.
- [L967](../../../apps/referidos-pwa/src/pages/prueba3.css#L967) `.prueba3-editor__glow`. Controla apariencia. `background`.
- [L971](../../../apps/referidos-pwa/src/pages/prueba3.css#L971) `.prueba3-editor__glow--secondary`. Controla apariencia. `background`.
- [L975](../../../apps/referidos-pwa/src/pages/prueba3.css#L975) `.prueba3-card__body h1`. Controla texto. `font-weight`.
- [L979](../../../apps/referidos-pwa/src/pages/prueba3.css#L979) `.prueba3-card__conditions h2`. Controla texto. `font-weight`.
- [L983](../../../apps/referidos-pwa/src/pages/prueba3.css#L983) `.prueba3-editor`. Controla apariencia. `background`.
- [L990](../../../apps/referidos-pwa/src/pages/prueba3.css#L990) `.prueba3-editor__glow`. Controla posición y capas, apariencia. `inset`, `background`.
- [L995](../../../apps/referidos-pwa/src/pages/prueba3.css#L995) `.prueba3-editor__glow--secondary`. Controla posición y capas, apariencia. `inset`, `background`.
- [L1000](../../../apps/referidos-pwa/src/pages/prueba3.css#L1000) `.prueba3-pill-switch`. Controla apariencia. `background`.
- [L1004](../../../apps/referidos-pwa/src/pages/prueba3.css#L1004) `.prueba3-editor`. Controla apariencia. `background`.
- [L1011](../../../apps/referidos-pwa/src/pages/prueba3.css#L1011) `.prueba3-editor__glow--secondary`. Controla posición y capas, apariencia. `inset`, `background`.
- [L1016](../../../apps/referidos-pwa/src/pages/prueba3.css#L1016) `.prueba3-page`. Controla tema, posición y capas, interacción y desborde, tamaño y espaciado. `--prueba3-scale`, `--prueba3-desktop-height`, `position`, `overflow-x`, `min-height`.
- [L1024](../../../apps/referidos-pwa/src/pages/prueba3.css#L1024) `.prueba3-canvas`. Controla posición y capas, tamaño y espaciado. `position`, `inset`, `width`, `min-height`, `transform`, `transform-origin`.
- [L1033](../../../apps/referidos-pwa/src/pages/prueba3.css#L1033) `@media (max-width: 1220px)`. Restringe las reglas por tamaño, dispositivo, accesibilidad o forma de visualización según la condición.
- [L1034](../../../apps/referidos-pwa/src/pages/prueba3.css#L1034) `.prueba3-page`. Controla tema, tamaño y espaciado. `--prueba3-scale`, `min-height`. Dentro de `@media (max-width: 1220px)`.
- [L1039](../../../apps/referidos-pwa/src/pages/prueba3.css#L1039) `.prueba3-canvas`. Controla posición y capas, tamaño y espaciado. `position`, `width`, `min-height`, `transform`. Dentro de `@media (max-width: 1220px)`.
- [L1047](../../../apps/referidos-pwa/src/pages/prueba3.css#L1047) `.prueba3-input--select`. Controla tamaño y espaciado. `min-height`, `padding`.
- [L1052](../../../apps/referidos-pwa/src/pages/prueba3.css#L1052) `.prueba3-field--benefits`. Controla tamaño y espaciado. `margin-top`.
- [L1056](../../../apps/referidos-pwa/src/pages/prueba3.css#L1056) `.prueba3-primary, .prueba3-secondary`. Controla tamaño y espaciado, texto. `height`, `padding`, `font-size`, `font-weight`, `letter-spacing`.
- [L1065](../../../apps/referidos-pwa/src/pages/prueba3.css#L1065) `.prueba3-input--select`. Controla tamaño y espaciado. `min-height`.
- [L1069](../../../apps/referidos-pwa/src/pages/prueba3.css#L1069) `.prueba3-field--benefits`. Controla tamaño y espaciado. `margin-top`.
- [L1073](../../../apps/referidos-pwa/src/pages/prueba3.css#L1073) `.prueba3-primary, .prueba3-secondary`. Controla tamaño y espaciado, texto. `height`, `padding`, `font-size`.
- [L1080](../../../apps/referidos-pwa/src/pages/prueba3.css#L1080) `.prueba3-input--select`. Controla tamaño y espaciado. `min-height`, `padding`.
- [L1085](../../../apps/referidos-pwa/src/pages/prueba3.css#L1085) `.prueba3-field--benefits`. Controla tamaño y espaciado. `margin-top`.
- [L1089](../../../apps/referidos-pwa/src/pages/prueba3.css#L1089) `.prueba3-primary, .prueba3-secondary`. Controla tamaño y espaciado, texto. `height`, `padding`, `font-size`, `font-weight`, `letter-spacing`.
- [L1098](../../../apps/referidos-pwa/src/pages/prueba3.css#L1098) `.prueba3-input--select`. Controla tamaño y espaciado, apariencia. `min-height`, `background`, `color`, `box-shadow`.
- [L1107](../../../apps/referidos-pwa/src/pages/prueba3.css#L1107) `.prueba3-group`. Controla apariencia. `background`, `box-shadow`.
- [L1114](../../../apps/referidos-pwa/src/pages/prueba3.css#L1114) `.prueba3-select`. Controla apariencia. `background`, `box-shadow`.
- [L1119](../../../apps/referidos-pwa/src/pages/prueba3.css#L1119) `.prueba3-chip-input, .prueba3-mini-input`. Controla apariencia. `background`, `box-shadow`.
- [L1125](../../../apps/referidos-pwa/src/pages/prueba3.css#L1125) `.prueba3-chip-input`. Controla apariencia. `color`.
- [L1129](../../../apps/referidos-pwa/src/pages/prueba3.css#L1129) `.prueba3-add, .prueba3-secondary`. Controla apariencia. `background`, `box-shadow`.
- [L1135](../../../apps/referidos-pwa/src/pages/prueba3.css#L1135) `.prueba3-input--select`. Controla tamaño y espaciado, apariencia. `min-height`, `background`.
- [L1140](../../../apps/referidos-pwa/src/pages/prueba3.css#L1140) `.prueba3-group`. Controla apariencia. `background`.
- [L1144](../../../apps/referidos-pwa/src/pages/prueba3.css#L1144) `.prueba3-select`. Controla apariencia. `background`.
- [L1148](../../../apps/referidos-pwa/src/pages/prueba3.css#L1148) `.prueba3-chip-input, .prueba3-mini-input`. Controla apariencia. `background`.
- [L1153](../../../apps/referidos-pwa/src/pages/prueba3.css#L1153) `.prueba3-add, .prueba3-secondary`. Controla apariencia. `background`.
- [L1158](../../../apps/referidos-pwa/src/pages/prueba3.css#L1158) `.prueba3-group`. Controla apariencia. `background`.
- [L1162](../../../apps/referidos-pwa/src/pages/prueba3.css#L1162) `.prueba3-select`. Controla apariencia. `background`.
- [L1166](../../../apps/referidos-pwa/src/pages/prueba3.css#L1166) `.prueba3-chip-input, .prueba3-mini-input`. Controla apariencia. `background`.
- [L1171](../../../apps/referidos-pwa/src/pages/prueba3.css#L1171) `.prueba3-add, .prueba3-secondary`. Controla apariencia. `background`.
- [L1176](../../../apps/referidos-pwa/src/pages/prueba3.css#L1176) `.prueba3-group`. Controla apariencia. `background`, `box-shadow`.
- [L1183](../../../apps/referidos-pwa/src/pages/prueba3.css#L1183) `.prueba3-select`. Controla apariencia. `background`, `box-shadow`.
- [L1188](../../../apps/referidos-pwa/src/pages/prueba3.css#L1188) `.prueba3-chip-input, .prueba3-mini-input`. Controla apariencia. `background`, `box-shadow`.
- [L1194](../../../apps/referidos-pwa/src/pages/prueba3.css#L1194) `.prueba3-add, .prueba3-secondary`. Controla apariencia. `background`, `box-shadow`.
- [L1200](../../../apps/referidos-pwa/src/pages/prueba3.css#L1200) `.prueba3-editor`. Controla apariencia. `background`.
- [L1207](../../../apps/referidos-pwa/src/pages/prueba3.css#L1207) `.prueba3-editor__glow`. Controla apariencia. `background`.
- [L1211](../../../apps/referidos-pwa/src/pages/prueba3.css#L1211) `.prueba3-editor__glow--secondary`. Controla posición y capas, apariencia. `inset`, `background`.
- [L1216](../../../apps/referidos-pwa/src/pages/prueba3.css#L1216) `.prueba3-editor`. Controla apariencia. `background`.
- [L1223](../../../apps/referidos-pwa/src/pages/prueba3.css#L1223) `.prueba3-editor__glow`. Controla apariencia. `background`.
- [L1227](../../../apps/referidos-pwa/src/pages/prueba3.css#L1227) `.prueba3-editor__glow--secondary`. Controla apariencia. `background`.
- [L1231](../../../apps/referidos-pwa/src/pages/prueba3.css#L1231) `.prueba3-editor`. Controla apariencia. `background`.
- [L1238](../../../apps/referidos-pwa/src/pages/prueba3.css#L1238) `.prueba3-editor__glow`. Controla apariencia. `background`.
- [L1242](../../../apps/referidos-pwa/src/pages/prueba3.css#L1242) `.prueba3-editor__glow--secondary`. Controla apariencia. `background`.
- [L1246](../../../apps/referidos-pwa/src/pages/prueba3.css#L1246) `.prueba3-editor`. Controla apariencia. `background`.
- [L1253](../../../apps/referidos-pwa/src/pages/prueba3.css#L1253) `.prueba3-editor__glow--secondary`. Controla apariencia. `background`.
- [L1257](../../../apps/referidos-pwa/src/pages/prueba3.css#L1257) `.prueba3-group`. Controla apariencia. `background`.
- [L1261](../../../apps/referidos-pwa/src/pages/prueba3.css#L1261) `.prueba3-primary`. Controla apariencia. `box-shadow`.
- [L1265](../../../apps/referidos-pwa/src/pages/prueba3.css#L1265) `.prueba3-field label`. Controla apariencia. `color`.
- [L1269](../../../apps/referidos-pwa/src/pages/prueba3.css#L1269) `.prueba3-input, .prueba3-textarea`. Controla apariencia. `background`, `color`, `box-shadow`.
- [L1276](../../../apps/referidos-pwa/src/pages/prueba3.css#L1276) `.prueba3-input svg`. Controla apariencia. `color`.
- [L1280](../../../apps/referidos-pwa/src/pages/prueba3.css#L1280) `.prueba3-textarea`. Controla apariencia. `color`.
- [L1284](../../../apps/referidos-pwa/src/pages/prueba3.css#L1284) `.prueba3-condition-row, .prueba3-benefit-row`. Controla apariencia. `color`.
- [L1289](../../../apps/referidos-pwa/src/pages/prueba3.css#L1289) `.prueba3-group`. Controla apariencia. `background`, `box-shadow`.
- [L1294](../../../apps/referidos-pwa/src/pages/prueba3.css#L1294) `.prueba3-input--select`. Controla tamaño y espaciado, apariencia. `min-height`, `background`, `color`, `box-shadow`.
- [L1301](../../../apps/referidos-pwa/src/pages/prueba3.css#L1301) `.prueba3-select`. Controla apariencia. `background`.
- [L1305](../../../apps/referidos-pwa/src/pages/prueba3.css#L1305) `.prueba3-chip-input, .prueba3-mini-input`. Controla apariencia. `background`.
- [L1310](../../../apps/referidos-pwa/src/pages/prueba3.css#L1310) `.prueba3-add, .prueba3-secondary`. Controla apariencia. `background`.
- [L1315](../../../apps/referidos-pwa/src/pages/prueba3.css#L1315) `.prueba3-primary, .prueba3-secondary`. Controla tamaño y espaciado, texto. `height`, `padding`, `font-size`, `font-weight`.
- [L1323](../../../apps/referidos-pwa/src/pages/prueba3.css#L1323) `.prueba3-primary`. Controla apariencia. `background`, `box-shadow`.
- [L1330](../../../apps/referidos-pwa/src/pages/prueba3.css#L1330) `.prueba3-editor`. Controla apariencia. `background`.
- [L1337](../../../apps/referidos-pwa/src/pages/prueba3.css#L1337) `.prueba3-editor__glow`. Controla apariencia. `background`.
- [L1341](../../../apps/referidos-pwa/src/pages/prueba3.css#L1341) `.prueba3-editor__glow--secondary`. Controla apariencia. `background`.
- [L1345](../../../apps/referidos-pwa/src/pages/prueba3.css#L1345) `.prueba3-input--select`. Controla apariencia. `box-shadow`.
- [L1349](../../../apps/referidos-pwa/src/pages/prueba3.css#L1349) `.prueba3-group`. Controla apariencia. `box-shadow`.
- [L1353](../../../apps/referidos-pwa/src/pages/prueba3.css#L1353) `.prueba3-add, .prueba3-secondary`. Controla apariencia. `box-shadow`.
- [L1358](../../../apps/referidos-pwa/src/pages/prueba3.css#L1358) `.prueba3-input--select, .prueba3-group, .prueba3-add, .prueba3-secondary`. Controla apariencia. `box-shadow`.
- [L1365](../../../apps/referidos-pwa/src/pages/prueba3.css#L1365) `.prueba3-input, .prueba3-textarea`. Controla apariencia. `border-radius`.
- [L1370](../../../apps/referidos-pwa/src/pages/prueba3.css#L1370) `.prueba3-input--select, .prueba3-group, .prueba3-select, .prueba3-chip-input, .prueba3-add`. Controla apariencia. `border-radius`.
- [L1378](../../../apps/referidos-pwa/src/pages/prueba3.css#L1378) `.prueba3-mini-input`. Controla apariencia. `border-radius`.
- [L1382](../../../apps/referidos-pwa/src/pages/prueba3.css#L1382) `.prueba3-primary, .prueba3-secondary`. Controla apariencia, tamaño y espaciado, texto. `border-radius`, `height`, `padding`, `font-size`.
- [L1390](../../../apps/referidos-pwa/src/pages/prueba3.css#L1390) `.prueba3-actions__buttons`. Controla distribución. `gap`, `flex`.
- [L1395](../../../apps/referidos-pwa/src/pages/prueba3.css#L1395) `.prueba3-save-state`. Controla distribución, tamaño y espaciado. `flex`, `min-width`.
- [L1400](../../../apps/referidos-pwa/src/pages/prueba3.css#L1400) `.prueba3-save-dot`. Controla apariencia. `box-shadow`.
- [L1404](../../../apps/referidos-pwa/src/pages/prueba3.css#L1404) `.prueba3-primary`. Controla apariencia. `background`, `box-shadow`.
- [L1409](../../../apps/referidos-pwa/src/pages/prueba3.css#L1409) `.prueba3-primary, .prueba3-secondary`. Controla tamaño y espaciado. `padding`.
- [L1414](../../../apps/referidos-pwa/src/pages/prueba3.css#L1414) `.prueba3-primary`. Controla apariencia. `background`.
- [L1417](../../../apps/referidos-pwa/src/pages/prueba3.css#L1417) `.prueba3-profile`. Controla apariencia. `border-radius`.
- [L1421](../../../apps/referidos-pwa/src/pages/prueba3.css#L1421) `.prueba3-editor`. Controla apariencia. `border-radius`.
- [L1425](../../../apps/referidos-pwa/src/pages/prueba3.css#L1425) `.prueba3-pill-switch, .prueba3-speed-switch`. Controla apariencia. `border-radius`.
- [L1430](../../../apps/referidos-pwa/src/pages/prueba3.css#L1430) `.prueba3-pill-switch button, .prueba3-speed-switch button`. Controla apariencia. `border-radius`.
- [L1435](../../../apps/referidos-pwa/src/pages/prueba3.css#L1435) `.prueba3-card`. Controla apariencia. `border-radius`.
- [L1439](../../../apps/referidos-pwa/src/pages/prueba3.css#L1439) `.prueba3-card::before`. Controla apariencia. `border-radius`.
- [L1443](../../../apps/referidos-pwa/src/pages/prueba3.css#L1443) `.prueba3-card__media`. Controla apariencia. `border-radius`.
- [L1447](../../../apps/referidos-pwa/src/pages/prueba3.css#L1447) `.prueba3-card__conditions, .prueba3-card__pill`. Controla apariencia. `border-radius`.
- [L1452](../../../apps/referidos-pwa/src/pages/prueba3.css#L1452) `.prueba3-save-dot`. Controla apariencia. `box-shadow`.
- [L1456](../../../apps/referidos-pwa/src/pages/prueba3.css#L1456) `.prueba3-primary, .prueba3-secondary`. Controla tamaño y espaciado. `padding`.
- [L1461](../../../apps/referidos-pwa/src/pages/prueba3.css#L1461) `.prueba3-primary`. Controla apariencia. `background`.
- [L1464](../../../apps/referidos-pwa/src/pages/prueba3.css#L1464) `.prueba3-group`. Controla apariencia. `background`, `border`, `box-shadow`.
- [L1470](../../../apps/referidos-pwa/src/pages/prueba3.css#L1470) `.prueba3-input--select`. Controla apariencia. `background`, `border`, `box-shadow`, `color`.
- [L1477](../../../apps/referidos-pwa/src/pages/prueba3.css#L1477) `.prueba3-select`. Controla apariencia. `background`, `border`, `box-shadow`.
- [L1483](../../../apps/referidos-pwa/src/pages/prueba3.css#L1483) `.prueba3-chip-input`. Controla apariencia. `background`, `border`, `box-shadow`.
- [L1489](../../../apps/referidos-pwa/src/pages/prueba3.css#L1489) `.prueba3-mini-input`. Controla apariencia. `background`, `border`, `box-shadow`.
- [L1495](../../../apps/referidos-pwa/src/pages/prueba3.css#L1495) `.prueba3-add, .prueba3-secondary`. Controla apariencia. `background`, `border`, `box-shadow`.
- [L1502](../../../apps/referidos-pwa/src/pages/prueba3.css#L1502) `.prueba3-condition-row, .prueba3-benefit-row`. Controla apariencia. `color`.
- [L1506](../../../apps/referidos-pwa/src/pages/prueba3.css#L1506) `.prueba3-group`. Controla apariencia. `background`, `border`.
- [L1511](../../../apps/referidos-pwa/src/pages/prueba3.css#L1511) `.prueba3-input--select`. Controla apariencia. `background`, `border`.
- [L1516](../../../apps/referidos-pwa/src/pages/prueba3.css#L1516) `.prueba3-select`. Controla apariencia. `background`, `border`.
- [L1521](../../../apps/referidos-pwa/src/pages/prueba3.css#L1521) `.prueba3-chip-input`. Controla apariencia. `background`, `border`.
- [L1526](../../../apps/referidos-pwa/src/pages/prueba3.css#L1526) `.prueba3-mini-input`. Controla apariencia. `background`, `border`.
- [L1531](../../../apps/referidos-pwa/src/pages/prueba3.css#L1531) `.prueba3-add, .prueba3-secondary`. Controla apariencia. `background`, `border`.
- [L1537](../../../apps/referidos-pwa/src/pages/prueba3.css#L1537) `.prueba3-condition-row, .prueba3-benefit-row`. Controla apariencia. `color`.
- [L1542](../../../apps/referidos-pwa/src/pages/prueba3.css#L1542) `.prueba3-group`. Controla apariencia. `border-radius`, `background`, `border`.
- [L1548](../../../apps/referidos-pwa/src/pages/prueba3.css#L1548) `.prueba3-input--select`. Controla apariencia. `border-radius`, `background`, `border`, `color`.
- [L1555](../../../apps/referidos-pwa/src/pages/prueba3.css#L1555) `.prueba3-input--select svg`. Controla apariencia. `color`.
- [L1559](../../../apps/referidos-pwa/src/pages/prueba3.css#L1559) `.prueba3-add, .prueba3-secondary`. Controla apariencia. `border-radius`, `border`.
- [L1565](../../../apps/referidos-pwa/src/pages/prueba3.css#L1565) `.prueba3-input, .prueba3-textarea`. Controla apariencia. `border-radius`.

## apps/referidos-pwa/src/pages/prueba4.css

[Abrir fuente](../../../apps/referidos-pwa/src/pages/prueba4.css) · 1772 líneas de texto.

Estilos de /prueba4. **Selectores de entrada:** `.prueba4-page`, `.prueba4-topbar`, `.prueba4-topbar__left`, `.prueba4-topbar__right`.

Importaciones directas: [Prueba4Page.jsx](../../../apps/referidos-pwa/src/pages/Prueba4Page.jsx#L2).

### Reglas y condiciones

- [L1](../../../apps/referidos-pwa/src/pages/prueba4.css#L1) `.prueba4-page`. Controla tamaño y espaciado, apariencia, texto. `min-height`, `background`, `color`, `font-family`.
- [L18](../../../apps/referidos-pwa/src/pages/prueba4.css#L18) `.prueba4-topbar`. Controla posición y capas, distribución, tamaño y espaciado, apariencia. `position`, `top`, `z-index`, `display`, `align-items`, `justify-content`, `height`, `padding`, `background`, `box-shadow`.
- [L33](../../../apps/referidos-pwa/src/pages/prueba4.css#L33) `.prueba4-topbar__left, .prueba4-topbar__right`. Controla distribución. `display`, `align-items`.
- [L39](../../../apps/referidos-pwa/src/pages/prueba4.css#L39) `.prueba4-topbar__left`. Controla distribución. `gap`.
- [L43](../../../apps/referidos-pwa/src/pages/prueba4.css#L43) `.prueba4-brand`. Controla distribución, texto, apariencia. `display`, `align-items`, `gap`, `font-size`, `font-weight`, `line-height`, `color`, `letter-spacing`.
- [L54](../../../apps/referidos-pwa/src/pages/prueba4.css#L54) `.prueba4-brand svg`. Controla tamaño y espaciado, distribución. `width`, `height`, `display`.
- [L60](../../../apps/referidos-pwa/src/pages/prueba4.css#L60) `.prueba4-divider`. Controla tamaño y espaciado, apariencia. `width`, `height`, `background`.
- [L66](../../../apps/referidos-pwa/src/pages/prueba4.css#L66) `.prueba4-title`. Controla texto, apariencia. `font-size`, `font-weight`, `color`, `letter-spacing`, `white-space`.
- [L74](../../../apps/referidos-pwa/src/pages/prueba4.css#L74) `.prueba4-mainnav`. Controla distribución, tamaño y espaciado. `display`, `align-items`, `gap`, `margin-left`.
- [L81](../../../apps/referidos-pwa/src/pages/prueba4.css#L81) `.prueba4-mainnav a`. Controla posición y capas, tamaño y espaciado, apariencia, texto. `position`, `padding`, `color`, `text-decoration`, `font-size`, `font-weight`.
- [L90](../../../apps/referidos-pwa/src/pages/prueba4.css#L90) `.prueba4-mainnav a.is-active`. Controla apariencia, texto. `color`, `font-weight`.
- [L95](../../../apps/referidos-pwa/src/pages/prueba4.css#L95) `.prueba4-mainnav a.is-active::after`. Controla renderizado, posición y capas, tamaño y espaciado, apariencia. `content`, `position`, `left`, `right`, `bottom`, `height`, `border-radius`, `background`, `box-shadow`.
- [L107](../../../apps/referidos-pwa/src/pages/prueba4.css#L107) `.prueba4-topbar__right`. Controla distribución. `gap`.
- [L111](../../../apps/referidos-pwa/src/pages/prueba4.css#L111) `.prueba4-icon-button`. Controla posición y capas, distribución, tamaño y espaciado, apariencia. `position`, `display`, `align-items`, `justify-content`, `width`, `height`, `padding`, `border`, `background`, `color`.
- [L124](../../../apps/referidos-pwa/src/pages/prueba4.css#L124) `.prueba4-icon-button svg`. Controla tamaño y espaciado. `width`, `height`.
- [L129](../../../apps/referidos-pwa/src/pages/prueba4.css#L129) `.prueba4-badge`. Controla posición y capas, tamaño y espaciado, apariencia, texto. `position`, `top`, `right`, `min-width`, `height`, `padding`, `border-radius`, `background`, `color`, `font-size`, `font-weight`, `line-height`, `box-shadow`.
- [L145](../../../apps/referidos-pwa/src/pages/prueba4.css#L145) `.prueba4-profile`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `gap`, `height`, `padding`, `border`, `border-radius`, `background`, `box-shadow`, `color`, `font-size`, `font-weight`.
- [L160](../../../apps/referidos-pwa/src/pages/prueba4.css#L160) `.prueba4-avatar`. Controla tamaño y espaciado, apariencia. `width`, `height`, `border-radius`, `background`, `box-shadow`.
- [L174](../../../apps/referidos-pwa/src/pages/prueba4.css#L174) `.prueba4-profile svg`. Controla tamaño y espaciado. `width`, `height`, `margin-left`.
- [L180](../../../apps/referidos-pwa/src/pages/prueba4.css#L180) `.prueba4-main`. Controla posición y capas, distribución, tamaño y espaciado. `position`, `display`, `grid-template-columns`, `justify-content`, `gap`, `padding`.
- [L189](../../../apps/referidos-pwa/src/pages/prueba4.css#L189) `.prueba4-editor`. Controla posición y capas, tamaño y espaciado, apariencia, interacción y desborde. `position`, `min-height`, `border-radius`, `padding`, `overflow`, `background`, `box-shadow`.
- [L204](../../../apps/referidos-pwa/src/pages/prueba4.css#L204) `.prueba4-editor__glow`. Controla posición y capas, apariencia, interacción y desborde. `position`, `inset`, `border-radius`, `background`, `pointer-events`.
- [L212](../../../apps/referidos-pwa/src/pages/prueba4.css#L212) `.prueba4-editor__glow--secondary`. Controla posición y capas, apariencia. `inset`, `background`.
- [L217](../../../apps/referidos-pwa/src/pages/prueba4.css#L217) `.prueba4-pill-switch`. Controla distribución, tamaño y espaciado, apariencia. `display`, `grid-template-columns`, `width`, `padding`, `border-radius`, `background`, `box-shadow`.
- [L227](../../../apps/referidos-pwa/src/pages/prueba4.css#L227) `.prueba4-pill-switch button, .prueba4-speed-switch button`. Controla apariencia, texto. `border`, `background`, `color`, `font`.
- [L235](../../../apps/referidos-pwa/src/pages/prueba4.css#L235) `.prueba4-pill-switch button`. Controla tamaño y espaciado, apariencia, texto. `height`, `border-radius`, `font-size`, `font-weight`.
- [L242](../../../apps/referidos-pwa/src/pages/prueba4.css#L242) `.prueba4-pill-switch button.is-active`. Controla apariencia. `color`, `background`, `box-shadow`.
- [L251](../../../apps/referidos-pwa/src/pages/prueba4.css#L251) `.prueba4-field`. Controla tamaño y espaciado. `margin-top`.
- [L255](../../../apps/referidos-pwa/src/pages/prueba4.css#L255) `.prueba4-field label`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `margin-bottom`, `color`, `font-size`, `font-weight`.
- [L263](../../../apps/referidos-pwa/src/pages/prueba4.css#L263) `.prueba4-input, .prueba4-textarea, .prueba4-group, .prueba4-chip-input, .prueba4-mini-input, .prueba4-select, .prueba4-add, .prueba4-secondary, .prueba4-primary`. Controla tamaño y espaciado. `box-sizing`.
- [L275](../../../apps/referidos-pwa/src/pages/prueba4.css#L275) `.prueba4-input, .prueba4-textarea`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `justify-content`, `width`, `border-radius`.
- [L284](../../../apps/referidos-pwa/src/pages/prueba4.css#L284) `.prueba4-input`. Controla tamaño y espaciado, apariencia, texto. `min-height`, `padding`, `background`, `color`, `font-size`, `box-shadow`.
- [L295](../../../apps/referidos-pwa/src/pages/prueba4.css#L295) `.prueba4-input svg`. Controla tamaño y espaciado, apariencia, distribución. `width`, `height`, `color`, `flex`.
- [L302](../../../apps/referidos-pwa/src/pages/prueba4.css#L302) `.prueba4-input--select`. Controla apariencia. `background`, `color`, `box-shadow`.
- [L310](../../../apps/referidos-pwa/src/pages/prueba4.css#L310) `.prueba4-input--select svg, .prueba4-select svg`. Controla apariencia. `color`.
- [L315](../../../apps/referidos-pwa/src/pages/prueba4.css#L315) `.prueba4-textarea`. Controla tamaño y espaciado, distribución, apariencia, texto. `min-height`, `align-items`, `padding`, `background`, `color`, `font-size`.
- [L324](../../../apps/referidos-pwa/src/pages/prueba4.css#L324) `.prueba4-group`. Controla apariencia, tamaño y espaciado. `border-radius`, `padding`, `background`, `box-shadow`.
- [L333](../../../apps/referidos-pwa/src/pages/prueba4.css#L333) `.prueba4-group--stacked`. Controla tamaño y espaciado. `padding-top`, `padding-bottom`.
- [L338](../../../apps/referidos-pwa/src/pages/prueba4.css#L338) `.prueba4-condition-row, .prueba4-benefit-row`. Controla distribución, apariencia, texto. `display`, `align-items`, `gap`, `color`, `font-size`, `white-space`.
- [L348](../../../apps/referidos-pwa/src/pages/prueba4.css#L348) `.prueba4-condition-row + .prueba4-condition-row, .prueba4-benefit-row + .prueba4-benefit-row`. Controla tamaño y espaciado. `margin-top`.
- [L353](../../../apps/referidos-pwa/src/pages/prueba4.css#L353) `.prueba4-inline-icon`. Controla tamaño y espaciado, distribución. `width`, `height`, `flex`.
- [L359](../../../apps/referidos-pwa/src/pages/prueba4.css#L359) `.prueba4-inline-icon svg`. Controla tamaño y espaciado, distribución. `width`, `height`, `display`.
- [L365](../../../apps/referidos-pwa/src/pages/prueba4.css#L365) `.prueba4-select`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `justify-content`, `height`, `padding`, `border-radius`, `background`, `color`, `box-shadow`.
- [L377](../../../apps/referidos-pwa/src/pages/prueba4.css#L377) `.prueba4-select svg`. Controla tamaño y espaciado. `width`, `height`, `margin-left`.
- [L383](../../../apps/referidos-pwa/src/pages/prueba4.css#L383) `.prueba4-inline-x`. Controla tamaño y espaciado, apariencia. `margin-right`, `opacity`.
- [L388](../../../apps/referidos-pwa/src/pages/prueba4.css#L388) `.prueba4-chip-input`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `height`, `min-width`, `padding`, `border-radius`, `background`, `color`, `box-shadow`.
- [L400](../../../apps/referidos-pwa/src/pages/prueba4.css#L400) `.prueba4-mini-input`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `justify-content`, `width`, `height`, `border-radius`, `background`, `box-shadow`.
- [L411](../../../apps/referidos-pwa/src/pages/prueba4.css#L411) `.prueba4-trash`. Controla tamaño y espaciado, apariencia. `margin-left`, `width`, `height`, `padding`, `border`, `color`, `background`.
- [L421](../../../apps/referidos-pwa/src/pages/prueba4.css#L421) `.prueba4-trash svg`. Controla tamaño y espaciado, distribución. `width`, `height`, `display`.
- [L427](../../../apps/referidos-pwa/src/pages/prueba4.css#L427) `.prueba4-add`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `gap`, `height`, `margin-top`, `padding`, `border`, `border-radius`, `background`, `color`, `font-size`, `font-weight`, `box-shadow`.
- [L443](../../../apps/referidos-pwa/src/pages/prueba4.css#L443) `.prueba4-add svg`. Controla tamaño y espaciado. `width`, `height`.
- [L448](../../../apps/referidos-pwa/src/pages/prueba4.css#L448) `.prueba4-actions`. Controla distribución, tamaño y espaciado. `display`, `align-items`, `justify-content`, `gap`, `margin-top`.
- [L456](../../../apps/referidos-pwa/src/pages/prueba4.css#L456) `.prueba4-save-state`. Controla distribución, apariencia, texto. `display`, `align-items`, `gap`, `color`, `font-size`.
- [L464](../../../apps/referidos-pwa/src/pages/prueba4.css#L464) `.prueba4-save-dot`. Controla tamaño y espaciado, apariencia. `width`, `height`, `border-radius`, `background`, `box-shadow`.
- [L472](../../../apps/referidos-pwa/src/pages/prueba4.css#L472) `.prueba4-actions__buttons`. Controla distribución. `display`, `align-items`, `gap`.
- [L478](../../../apps/referidos-pwa/src/pages/prueba4.css#L478) `.prueba4-primary, .prueba4-secondary`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `justify-content`, `gap`, `height`, `padding`, `border`, `border-radius`, `color`, `font-size`, `font-weight`.
- [L493](../../../apps/referidos-pwa/src/pages/prueba4.css#L493) `.prueba4-primary`. Controla apariencia. `background`, `box-shadow`.
- [L498](../../../apps/referidos-pwa/src/pages/prueba4.css#L498) `.prueba4-secondary`. Controla apariencia. `background`, `box-shadow`.
- [L503](../../../apps/referidos-pwa/src/pages/prueba4.css#L503) `.prueba4-primary svg, .prueba4-secondary svg`. Controla tamaño y espaciado. `width`, `height`.
- [L509](../../../apps/referidos-pwa/src/pages/prueba4.css#L509) `.prueba4-preview-wrap`. Controla posición y capas, tamaño y espaciado. `position`, `padding-top`.
- [L514](../../../apps/referidos-pwa/src/pages/prueba4.css#L514) `.prueba4-speed-switch`. Controla distribución, tamaño y espaciado, apariencia. `display`, `grid-template-columns`, `width`, `margin`, `padding`, `border-radius`, `background`, `box-shadow`.
- [L525](../../../apps/referidos-pwa/src/pages/prueba4.css#L525) `.prueba4-speed-switch button`. Controla tamaño y espaciado, apariencia, texto. `height`, `border-radius`, `color`, `font-size`, `font-weight`.
- [L533](../../../apps/referidos-pwa/src/pages/prueba4.css#L533) `.prueba4-speed-switch button.is-active`. Controla apariencia. `color`, `background`, `box-shadow`.
- [L539](../../../apps/referidos-pwa/src/pages/prueba4.css#L539) `.prueba4-help-link`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `width`, `margin`, `color`, `font-size`, `text-underline-offset`.
- [L548](../../../apps/referidos-pwa/src/pages/prueba4.css#L548) `.prueba4-dots`. Controla posición y capas, tamaño y espaciado, apariencia. `position`, `width`, `height`, `opacity`, `background-image`, `background-size`.
- [L557](../../../apps/referidos-pwa/src/pages/prueba4.css#L557) `.prueba4-dots--left`. Controla posición y capas. `left`, `bottom`.
- [L562](../../../apps/referidos-pwa/src/pages/prueba4.css#L562) `.prueba4-dots--right`. Controla posición y capas. `right`, `bottom`.
- [L567](../../../apps/referidos-pwa/src/pages/prueba4.css#L567) `.prueba4-card`. Controla posición y capas, tamaño y espaciado, apariencia, interacción y desborde. `position`, `width`, `margin`, `border-radius`, `background`, `box-shadow`, `overflow`.
- [L579](../../../apps/referidos-pwa/src/pages/prueba4.css#L579) `.prueba4-card::before`. Controla renderizado, posición y capas, apariencia, interacción y desborde. `content`, `position`, `inset`, `border-radius`, `border`, `pointer-events`.
- [L588](../../../apps/referidos-pwa/src/pages/prueba4.css#L588) `.prueba4-card__media`. Controla distribución, tamaño y espaciado, apariencia. `display`, `align-items`, `justify-content`, `height`, `margin`, `border-radius`, `color`, `background`.
- [L601](../../../apps/referidos-pwa/src/pages/prueba4.css#L601) `.prueba4-card__media svg`. Controla tamaño y espaciado. `width`, `height`.
- [L606](../../../apps/referidos-pwa/src/pages/prueba4.css#L606) `.prueba4-card__body`. Controla tamaño y espaciado. `padding`.
- [L610](../../../apps/referidos-pwa/src/pages/prueba4.css#L610) `.prueba4-card__body h1`. Controla tamaño y espaciado, apariencia, texto. `margin`, `color`, `font-size`, `font-weight`, `letter-spacing`.
- [L618](../../../apps/referidos-pwa/src/pages/prueba4.css#L618) `.prueba4-card__body p`. Controla tamaño y espaciado, apariencia, texto. `margin`, `color`, `font-size`.
- [L624](../../../apps/referidos-pwa/src/pages/prueba4.css#L624) `.prueba4-separator`. Controla tamaño y espaciado, apariencia. `height`, `margin`, `background`.
- [L630](../../../apps/referidos-pwa/src/pages/prueba4.css#L630) `.prueba4-card__conditions`. Controla apariencia, tamaño y espaciado. `border-radius`, `padding`, `background`.
- [L636](../../../apps/referidos-pwa/src/pages/prueba4.css#L636) `.prueba4-card__conditions h2`. Controla tamaño y espaciado, apariencia, texto. `margin`, `color`, `font-size`, `font-weight`, `letter-spacing`.
- [L644](../../../apps/referidos-pwa/src/pages/prueba4.css#L644) `.prueba4-card__pill`. Controla distribución, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `gap`, `min-height`, `padding`, `border-radius`, `background`, `color`, `font-size`.
- [L656](../../../apps/referidos-pwa/src/pages/prueba4.css#L656) `.prueba4-card__pill + .prueba4-card__pill`. Controla tamaño y espaciado. `margin-top`.
- [L660](../../../apps/referidos-pwa/src/pages/prueba4.css#L660) `.prueba4-card__pill svg`. Controla tamaño y espaciado, distribución. `width`, `height`, `flex`.
- [L666](../../../apps/referidos-pwa/src/pages/prueba4.css#L666) `.prueba4-card__pill--alt`. Controla tamaño y espaciado. `width`, `max-width`.
- [L671](../../../apps/referidos-pwa/src/pages/prueba4.css#L671) `.prueba4-card__pill strong`. Controla texto. `font-weight`.
- [L675](../../../apps/referidos-pwa/src/pages/prueba4.css#L675) `.prueba4-meta`. Controla distribución. `display`, `gap`.
- [L680](../../../apps/referidos-pwa/src/pages/prueba4.css#L680) `.prueba4-meta__row`. Controla distribución, apariencia, texto. `display`, `align-items`, `gap`, `color`, `font-size`.
- [L688](../../../apps/referidos-pwa/src/pages/prueba4.css#L688) `.prueba4-meta__row svg`. Controla tamaño y espaciado, apariencia. `width`, `height`, `color`.
- [L694](../../../apps/referidos-pwa/src/pages/prueba4.css#L694) `@media (max-width: 924.6px)`. Restringe las reglas por tamaño, dispositivo, accesibilidad o forma de visualización según la condición.
- [L695](../../../apps/referidos-pwa/src/pages/prueba4.css#L695) `.prueba4-main`. Controla distribución. `gap`. Dentro de `@media (max-width: 924.6px)`.
- [L699](../../../apps/referidos-pwa/src/pages/prueba4.css#L699) `.prueba4-card`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 924.6px)`.
- [L704](../../../apps/referidos-pwa/src/pages/prueba4.css#L704) `@media (max-width: 817.4px)`. Restringe las reglas por tamaño, dispositivo, accesibilidad o forma de visualización según la condición.
- [L705](../../../apps/referidos-pwa/src/pages/prueba4.css#L705) `.prueba4-topbar`. Controla tamaño y espaciado, distribución. `height`, `padding-top`, `padding-bottom`, `flex-direction`, `gap`, `align-items`. Dentro de `@media (max-width: 817.4px)`.
- [L714](../../../apps/referidos-pwa/src/pages/prueba4.css#L714) `.prueba4-topbar__left`. Controla distribución. `flex-wrap`, `gap`. Dentro de `@media (max-width: 817.4px)`.
- [L719](../../../apps/referidos-pwa/src/pages/prueba4.css#L719) `.prueba4-main`. Controla distribución. `grid-template-columns`, `justify-items`, `gap`. Dentro de `@media (max-width: 817.4px)`.
- [L725](../../../apps/referidos-pwa/src/pages/prueba4.css#L725) `.prueba4-preview-wrap`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 817.4px)`.
- [L730](../../../apps/referidos-pwa/src/pages/prueba4.css#L730) `@media (max-width: 482.4px)`. Restringe las reglas por tamaño, dispositivo, accesibilidad o forma de visualización según la condición.
- [L731](../../../apps/referidos-pwa/src/pages/prueba4.css#L731) `.prueba4-main`. Controla tamaño y espaciado. `padding`. Dentro de `@media (max-width: 482.4px)`.
- [L735](../../../apps/referidos-pwa/src/pages/prueba4.css#L735) `.prueba4-editor,   .prueba4-card`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 482.4px)`.
- [L740](../../../apps/referidos-pwa/src/pages/prueba4.css#L740) `.prueba4-editor`. Controla tamaño y espaciado. `min-height`, `padding`. Dentro de `@media (max-width: 482.4px)`.
- [L745](../../../apps/referidos-pwa/src/pages/prueba4.css#L745) `.prueba4-pill-switch,   .prueba4-speed-switch`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 482.4px)`.
- [L750](../../../apps/referidos-pwa/src/pages/prueba4.css#L750) `.prueba4-condition-row,   .prueba4-benefit-row,   .prueba4-actions`. Controla distribución. `flex-wrap`. Dentro de `@media (max-width: 482.4px)`.
- [L756](../../../apps/referidos-pwa/src/pages/prueba4.css#L756) `.prueba4-chip-input`. Controla tamaño y espaciado. `min-width`, `width`. Dentro de `@media (max-width: 482.4px)`.
- [L761](../../../apps/referidos-pwa/src/pages/prueba4.css#L761) `.prueba4-actions`. Controla distribución. `align-items`. Dentro de `@media (max-width: 482.4px)`.
- [L765](../../../apps/referidos-pwa/src/pages/prueba4.css#L765) `.prueba4-actions__buttons`. Controla tamaño y espaciado, distribución. `width`, `flex-direction`. Dentro de `@media (max-width: 482.4px)`.
- [L770](../../../apps/referidos-pwa/src/pages/prueba4.css#L770) `.prueba4-primary,   .prueba4-secondary`. Controla tamaño y espaciado. `width`. Dentro de `@media (max-width: 482.4px)`.
- [L775](../../../apps/referidos-pwa/src/pages/prueba4.css#L775) `.prueba4-card__body`. Controla tamaño y espaciado. `padding`. Dentro de `@media (max-width: 482.4px)`.
- [L780](../../../apps/referidos-pwa/src/pages/prueba4.css#L780) `.prueba4-actions__buttons`. Controla distribución. `flex`.
- [L784](../../../apps/referidos-pwa/src/pages/prueba4.css#L784) `.prueba4-primary, .prueba4-secondary`. Controla texto. `white-space`.
- [L789](../../../apps/referidos-pwa/src/pages/prueba4.css#L789) `.prueba4-editor__glow`. Controla apariencia. `background`.
- [L793](../../../apps/referidos-pwa/src/pages/prueba4.css#L793) `.prueba4-editor__glow--secondary`. Controla apariencia. `background`.
- [L797](../../../apps/referidos-pwa/src/pages/prueba4.css#L797) `.prueba4-pill-switch button.is-active`. Controla apariencia. `box-shadow`.
- [L804](../../../apps/referidos-pwa/src/pages/prueba4.css#L804) `.prueba4-speed-switch button.is-active`. Controla apariencia. `box-shadow`.
- [L808](../../../apps/referidos-pwa/src/pages/prueba4.css#L808) `.prueba4-help-link`. Controla texto. `font-size`, `font-weight`.
- [L813](../../../apps/referidos-pwa/src/pages/prueba4.css#L813) `.prueba4-card`. Controla tamaño y espaciado, texto. `width`, `margin-top`, `font-family`.
- [L819](../../../apps/referidos-pwa/src/pages/prueba4.css#L819) `.prueba4-card::before`. Controla posición y capas. `inset`.
- [L823](../../../apps/referidos-pwa/src/pages/prueba4.css#L823) `.prueba4-card__media`. Controla tamaño y espaciado. `height`.
- [L827](../../../apps/referidos-pwa/src/pages/prueba4.css#L827) `.prueba4-card__media svg`. Controla tamaño y espaciado. `width`, `height`.
- [L832](../../../apps/referidos-pwa/src/pages/prueba4.css#L832) `.prueba4-card__body`. Controla tamaño y espaciado. `padding`.
- [L836](../../../apps/referidos-pwa/src/pages/prueba4.css#L836) `.prueba4-card__body h1`. Controla texto. `font-size`, `font-weight`, `letter-spacing`.
- [L842](../../../apps/referidos-pwa/src/pages/prueba4.css#L842) `.prueba4-card__body p`. Controla tamaño y espaciado, apariencia, texto. `margin-top`, `color`, `font-size`, `font-weight`, `line-height`.
- [L850](../../../apps/referidos-pwa/src/pages/prueba4.css#L850) `.prueba4-separator`. Controla tamaño y espaciado. `margin`.
- [L854](../../../apps/referidos-pwa/src/pages/prueba4.css#L854) `.prueba4-card__conditions`. Controla tamaño y espaciado. `padding`.
- [L858](../../../apps/referidos-pwa/src/pages/prueba4.css#L858) `.prueba4-card__conditions h2`. Controla texto. `font-size`, `font-weight`.
- [L863](../../../apps/referidos-pwa/src/pages/prueba4.css#L863) `.prueba4-card__pill`. Controla distribución, tamaño y espaciado, texto. `gap`, `min-height`, `font-size`, `font-weight`, `line-height`.
- [L871](../../../apps/referidos-pwa/src/pages/prueba4.css#L871) `.prueba4-card__pill strong`. Controla texto. `font-weight`.
- [L875](../../../apps/referidos-pwa/src/pages/prueba4.css#L875) `.prueba4-card__tone`. Controla apariencia, texto. `color`, `font-weight`.
- [L880](../../../apps/referidos-pwa/src/pages/prueba4.css#L880) `.prueba4-card__accent`. Controla apariencia, texto. `color`, `font-weight`.
- [L885](../../../apps/referidos-pwa/src/pages/prueba4.css#L885) `.prueba4-meta`. Controla distribución. `gap`.
- [L889](../../../apps/referidos-pwa/src/pages/prueba4.css#L889) `.prueba4-meta__row`. Controla texto. `font-size`, `font-weight`.
- [L894](../../../apps/referidos-pwa/src/pages/prueba4.css#L894) `.prueba4-card`. Controla tamaño y espaciado. `width`.
- [L898](../../../apps/referidos-pwa/src/pages/prueba4.css#L898) `.prueba4-card__media`. Controla tamaño y espaciado. `height`.
- [L902](../../../apps/referidos-pwa/src/pages/prueba4.css#L902) `.prueba4-card__body`. Controla tamaño y espaciado. `padding`.
- [L906](../../../apps/referidos-pwa/src/pages/prueba4.css#L906) `.prueba4-card__body h1`. Controla texto. `font-size`, `font-weight`.
- [L911](../../../apps/referidos-pwa/src/pages/prueba4.css#L911) `.prueba4-card__conditions h2`. Controla texto. `font-size`, `font-weight`.
- [L916](../../../apps/referidos-pwa/src/pages/prueba4.css#L916) `.prueba4-card__tone`. Controla texto. `font-weight`.
- [L920](../../../apps/referidos-pwa/src/pages/prueba4.css#L920) `.prueba4-meta__row`. Controla texto. `font-size`.
- [L924](../../../apps/referidos-pwa/src/pages/prueba4.css#L924) `.prueba4-editor`. Controla apariencia. `background`.
- [L931](../../../apps/referidos-pwa/src/pages/prueba4.css#L931) `.prueba4-editor__glow`. Controla posición y capas, apariencia. `inset`, `background`.
- [L936](../../../apps/referidos-pwa/src/pages/prueba4.css#L936) `.prueba4-editor__glow--secondary`. Controla posición y capas, apariencia. `inset`, `background`.
- [L941](../../../apps/referidos-pwa/src/pages/prueba4.css#L941) `.prueba4-pill-switch`. Controla apariencia. `background`.
- [L945](../../../apps/referidos-pwa/src/pages/prueba4.css#L945) `.prueba4-pill-switch button.is-active`. Controla apariencia. `box-shadow`.
- [L952](../../../apps/referidos-pwa/src/pages/prueba4.css#L952) `.prueba4-card__body h1`. Controla texto. `font-weight`.
- [L956](../../../apps/referidos-pwa/src/pages/prueba4.css#L956) `.prueba4-card__conditions h2`. Controla texto. `font-weight`.
- [L960](../../../apps/referidos-pwa/src/pages/prueba4.css#L960) `.prueba4-editor`. Controla apariencia. `background`.
- [L967](../../../apps/referidos-pwa/src/pages/prueba4.css#L967) `.prueba4-editor__glow`. Controla apariencia. `background`.
- [L971](../../../apps/referidos-pwa/src/pages/prueba4.css#L971) `.prueba4-editor__glow--secondary`. Controla apariencia. `background`.
- [L975](../../../apps/referidos-pwa/src/pages/prueba4.css#L975) `.prueba4-card__body h1`. Controla texto. `font-weight`.
- [L979](../../../apps/referidos-pwa/src/pages/prueba4.css#L979) `.prueba4-card__conditions h2`. Controla texto. `font-weight`.
- [L983](../../../apps/referidos-pwa/src/pages/prueba4.css#L983) `.prueba4-editor`. Controla apariencia. `background`.
- [L990](../../../apps/referidos-pwa/src/pages/prueba4.css#L990) `.prueba4-editor__glow`. Controla posición y capas, apariencia. `inset`, `background`.
- [L995](../../../apps/referidos-pwa/src/pages/prueba4.css#L995) `.prueba4-editor__glow--secondary`. Controla posición y capas, apariencia. `inset`, `background`.
- [L1000](../../../apps/referidos-pwa/src/pages/prueba4.css#L1000) `.prueba4-pill-switch`. Controla apariencia. `background`.
- [L1004](../../../apps/referidos-pwa/src/pages/prueba4.css#L1004) `.prueba4-editor`. Controla apariencia. `background`.
- [L1011](../../../apps/referidos-pwa/src/pages/prueba4.css#L1011) `.prueba4-editor__glow--secondary`. Controla posición y capas, apariencia. `inset`, `background`.
- [L1016](../../../apps/referidos-pwa/src/pages/prueba4.css#L1016) `.prueba4-input--select`. Controla tamaño y espaciado. `min-height`, `padding`.
- [L1021](../../../apps/referidos-pwa/src/pages/prueba4.css#L1021) `.prueba4-field--benefits`. Controla tamaño y espaciado. `margin-top`.
- [L1025](../../../apps/referidos-pwa/src/pages/prueba4.css#L1025) `.prueba4-primary, .prueba4-secondary`. Controla tamaño y espaciado, texto. `height`, `padding`, `font-size`, `font-weight`, `letter-spacing`.
- [L1034](../../../apps/referidos-pwa/src/pages/prueba4.css#L1034) `.prueba4-input--select`. Controla tamaño y espaciado. `min-height`.
- [L1038](../../../apps/referidos-pwa/src/pages/prueba4.css#L1038) `.prueba4-field--benefits`. Controla tamaño y espaciado. `margin-top`.
- [L1042](../../../apps/referidos-pwa/src/pages/prueba4.css#L1042) `.prueba4-primary, .prueba4-secondary`. Controla tamaño y espaciado, texto. `height`, `padding`, `font-size`.
- [L1049](../../../apps/referidos-pwa/src/pages/prueba4.css#L1049) `.prueba4-input--select`. Controla tamaño y espaciado. `min-height`, `padding`.
- [L1054](../../../apps/referidos-pwa/src/pages/prueba4.css#L1054) `.prueba4-field--benefits`. Controla tamaño y espaciado. `margin-top`.
- [L1058](../../../apps/referidos-pwa/src/pages/prueba4.css#L1058) `.prueba4-primary, .prueba4-secondary`. Controla tamaño y espaciado, texto. `height`, `padding`, `font-size`, `font-weight`, `letter-spacing`.
- [L1067](../../../apps/referidos-pwa/src/pages/prueba4.css#L1067) `.prueba4-primary, .prueba4-secondary`. Controla distribución. `gap`.
- [L1072](../../../apps/referidos-pwa/src/pages/prueba4.css#L1072) `.prueba4-primary, .prueba4-secondary`. Controla texto. `font-weight`.
- [L1077](../../../apps/referidos-pwa/src/pages/prueba4.css#L1077) `.prueba4-input, .prueba4-textarea`. Controla apariencia. `color`.
- [L1082](../../../apps/referidos-pwa/src/pages/prueba4.css#L1082) `.prueba4-select`. Controla tamaño y espaciado, distribución. `width`, `min-width`, `flex`, `justify-content`, `gap`, `padding`.
- [L1091](../../../apps/referidos-pwa/src/pages/prueba4.css#L1091) `.prueba4-select svg`. Controla tamaño y espaciado. `margin-left`.
- [L1095](../../../apps/referidos-pwa/src/pages/prueba4.css#L1095) `.prueba4-speed-switch`. Controla posición y capas, tamaño y espaciado, distribución, interacción y desborde, apariencia. `position`, `padding`, `min-height`, `height`, `align-items`, `overflow`, `background`, `box-shadow`.
- [L1106](../../../apps/referidos-pwa/src/pages/prueba4.css#L1106) `.prueba4-speed-switch::before`. Controla renderizado, posición y capas, apariencia, interacción y desborde. `content`, `position`, `inset`, `background`, `border-radius`, `pointer-events`.
- [L1115](../../../apps/referidos-pwa/src/pages/prueba4.css#L1115) `.prueba4-speed-switch button`. Controla distribución, posición y capas, tamaño y espaciado, apariencia, texto. `display`, `align-items`, `justify-content`, `position`, `z-index`, `min-height`, `height`, `padding`, `background`, `border-radius`, `color`, `font-size`, `line-height`.
- [L1131](../../../apps/referidos-pwa/src/pages/prueba4.css#L1131) `.prueba4-speed-switch button:first-child`. Controla apariencia. `border-radius`.
- [L1135](../../../apps/referidos-pwa/src/pages/prueba4.css#L1135) `.prueba4-speed-switch button:last-child`. Controla apariencia. `border-radius`.
- [L1139](../../../apps/referidos-pwa/src/pages/prueba4.css#L1139) `.prueba4-speed-switch button.is-active`. Controla apariencia, distribución, tamaño y espaciado. `background`, `box-shadow`, `align-self`, `height`, `min-height`, `margin-top`, `margin-bottom`, `border-radius`.
- [L1150](../../../apps/referidos-pwa/src/pages/prueba4.css#L1150) `.prueba4-speed-switch button.is-active:first-child`. Controla tamaño y espaciado, apariencia. `margin-left`, `margin-right`, `padding-left`, `padding-right`, `border-radius`.
- [L1158](../../../apps/referidos-pwa/src/pages/prueba4.css#L1158) `.prueba4-speed-switch button.is-active:last-child`. Controla tamaño y espaciado, apariencia. `margin-left`, `margin-right`, `padding-left`, `padding-right`, `border-radius`.
- [L1166](../../../apps/referidos-pwa/src/pages/prueba4.css#L1166) `.prueba4-input--select`. Controla tamaño y espaciado, apariencia. `min-height`, `background`, `color`, `box-shadow`.
- [L1175](../../../apps/referidos-pwa/src/pages/prueba4.css#L1175) `.prueba4-group`. Controla apariencia. `background`, `box-shadow`.
- [L1182](../../../apps/referidos-pwa/src/pages/prueba4.css#L1182) `.prueba4-select`. Controla apariencia. `background`, `box-shadow`.
- [L1187](../../../apps/referidos-pwa/src/pages/prueba4.css#L1187) `.prueba4-chip-input, .prueba4-mini-input`. Controla apariencia. `background`, `box-shadow`.
- [L1193](../../../apps/referidos-pwa/src/pages/prueba4.css#L1193) `.prueba4-chip-input`. Controla apariencia. `color`.
- [L1197](../../../apps/referidos-pwa/src/pages/prueba4.css#L1197) `.prueba4-add, .prueba4-secondary`. Controla apariencia. `background`, `box-shadow`.
- [L1203](../../../apps/referidos-pwa/src/pages/prueba4.css#L1203) `.prueba4-input--select`. Controla tamaño y espaciado, apariencia. `min-height`, `background`.
- [L1208](../../../apps/referidos-pwa/src/pages/prueba4.css#L1208) `.prueba4-group`. Controla apariencia. `background`.
- [L1212](../../../apps/referidos-pwa/src/pages/prueba4.css#L1212) `.prueba4-select`. Controla apariencia. `background`.
- [L1216](../../../apps/referidos-pwa/src/pages/prueba4.css#L1216) `.prueba4-chip-input, .prueba4-mini-input`. Controla apariencia. `background`.
- [L1221](../../../apps/referidos-pwa/src/pages/prueba4.css#L1221) `.prueba4-add, .prueba4-secondary`. Controla apariencia. `background`.
- [L1226](../../../apps/referidos-pwa/src/pages/prueba4.css#L1226) `.prueba4-group`. Controla apariencia. `background`.
- [L1230](../../../apps/referidos-pwa/src/pages/prueba4.css#L1230) `.prueba4-select`. Controla apariencia. `background`.
- [L1234](../../../apps/referidos-pwa/src/pages/prueba4.css#L1234) `.prueba4-chip-input, .prueba4-mini-input`. Controla apariencia. `background`.
- [L1239](../../../apps/referidos-pwa/src/pages/prueba4.css#L1239) `.prueba4-add, .prueba4-secondary`. Controla apariencia. `background`.
- [L1244](../../../apps/referidos-pwa/src/pages/prueba4.css#L1244) `.prueba4-group`. Controla apariencia. `background`, `box-shadow`.
- [L1251](../../../apps/referidos-pwa/src/pages/prueba4.css#L1251) `.prueba4-select`. Controla apariencia. `background`, `box-shadow`.
- [L1256](../../../apps/referidos-pwa/src/pages/prueba4.css#L1256) `.prueba4-chip-input, .prueba4-mini-input`. Controla apariencia. `background`, `box-shadow`.
- [L1262](../../../apps/referidos-pwa/src/pages/prueba4.css#L1262) `.prueba4-add, .prueba4-secondary`. Controla apariencia. `background`, `box-shadow`.
- [L1268](../../../apps/referidos-pwa/src/pages/prueba4.css#L1268) `.prueba4-editor`. Controla apariencia. `background`.
- [L1275](../../../apps/referidos-pwa/src/pages/prueba4.css#L1275) `.prueba4-editor__glow`. Controla apariencia. `background`.
- [L1279](../../../apps/referidos-pwa/src/pages/prueba4.css#L1279) `.prueba4-editor__glow--secondary`. Controla posición y capas, apariencia. `inset`, `background`.
- [L1284](../../../apps/referidos-pwa/src/pages/prueba4.css#L1284) `.prueba4-editor`. Controla apariencia. `background`.
- [L1291](../../../apps/referidos-pwa/src/pages/prueba4.css#L1291) `.prueba4-editor__glow`. Controla apariencia. `background`.
- [L1295](../../../apps/referidos-pwa/src/pages/prueba4.css#L1295) `.prueba4-editor__glow--secondary`. Controla apariencia. `background`.
- [L1299](../../../apps/referidos-pwa/src/pages/prueba4.css#L1299) `.prueba4-editor`. Controla apariencia. `background`.
- [L1306](../../../apps/referidos-pwa/src/pages/prueba4.css#L1306) `.prueba4-editor__glow`. Controla apariencia. `background`.
- [L1310](../../../apps/referidos-pwa/src/pages/prueba4.css#L1310) `.prueba4-editor__glow--secondary`. Controla apariencia. `background`.
- [L1314](../../../apps/referidos-pwa/src/pages/prueba4.css#L1314) `.prueba4-editor`. Controla apariencia. `background`.
- [L1321](../../../apps/referidos-pwa/src/pages/prueba4.css#L1321) `.prueba4-editor__glow--secondary`. Controla apariencia. `background`.
- [L1325](../../../apps/referidos-pwa/src/pages/prueba4.css#L1325) `.prueba4-group`. Controla apariencia. `background`.
- [L1329](../../../apps/referidos-pwa/src/pages/prueba4.css#L1329) `.prueba4-primary`. Controla apariencia. `box-shadow`.
- [L1333](../../../apps/referidos-pwa/src/pages/prueba4.css#L1333) `.prueba4-field label`. Controla apariencia. `color`.
- [L1337](../../../apps/referidos-pwa/src/pages/prueba4.css#L1337) `.prueba4-input, .prueba4-textarea`. Controla apariencia. `background`, `color`, `box-shadow`.
- [L1344](../../../apps/referidos-pwa/src/pages/prueba4.css#L1344) `.prueba4-input svg`. Controla apariencia. `color`.
- [L1348](../../../apps/referidos-pwa/src/pages/prueba4.css#L1348) `.prueba4-textarea`. Controla apariencia. `color`.
- [L1352](../../../apps/referidos-pwa/src/pages/prueba4.css#L1352) `.prueba4-condition-row, .prueba4-benefit-row`. Controla apariencia. `color`.
- [L1357](../../../apps/referidos-pwa/src/pages/prueba4.css#L1357) `.prueba4-group`. Controla apariencia. `background`, `box-shadow`.
- [L1362](../../../apps/referidos-pwa/src/pages/prueba4.css#L1362) `.prueba4-input--select`. Controla tamaño y espaciado, apariencia. `min-height`, `background`, `color`, `box-shadow`.
- [L1369](../../../apps/referidos-pwa/src/pages/prueba4.css#L1369) `.prueba4-select`. Controla apariencia. `background`.
- [L1373](../../../apps/referidos-pwa/src/pages/prueba4.css#L1373) `.prueba4-chip-input, .prueba4-mini-input`. Controla apariencia. `background`.
- [L1378](../../../apps/referidos-pwa/src/pages/prueba4.css#L1378) `.prueba4-add, .prueba4-secondary`. Controla apariencia. `background`.
- [L1383](../../../apps/referidos-pwa/src/pages/prueba4.css#L1383) `.prueba4-primary, .prueba4-secondary`. Controla tamaño y espaciado, texto. `height`, `padding`, `font-size`, `font-weight`.
- [L1391](../../../apps/referidos-pwa/src/pages/prueba4.css#L1391) `.prueba4-primary`. Controla apariencia. `background`, `box-shadow`.
- [L1398](../../../apps/referidos-pwa/src/pages/prueba4.css#L1398) `.prueba4-editor`. Controla apariencia. `background`.
- [L1405](../../../apps/referidos-pwa/src/pages/prueba4.css#L1405) `.prueba4-editor__glow`. Controla apariencia. `background`.
- [L1409](../../../apps/referidos-pwa/src/pages/prueba4.css#L1409) `.prueba4-editor__glow--secondary`. Controla apariencia. `background`.
- [L1413](../../../apps/referidos-pwa/src/pages/prueba4.css#L1413) `.prueba4-input--select`. Controla apariencia. `box-shadow`.
- [L1417](../../../apps/referidos-pwa/src/pages/prueba4.css#L1417) `.prueba4-group`. Controla apariencia. `box-shadow`.
- [L1421](../../../apps/referidos-pwa/src/pages/prueba4.css#L1421) `.prueba4-add, .prueba4-secondary`. Controla apariencia. `box-shadow`.
- [L1426](../../../apps/referidos-pwa/src/pages/prueba4.css#L1426) `.prueba4-input--select, .prueba4-group, .prueba4-add, .prueba4-secondary`. Controla apariencia. `box-shadow`.
- [L1433](../../../apps/referidos-pwa/src/pages/prueba4.css#L1433) `.prueba4-input, .prueba4-textarea`. Controla apariencia. `border-radius`.
- [L1438](../../../apps/referidos-pwa/src/pages/prueba4.css#L1438) `.prueba4-input--select, .prueba4-group, .prueba4-select, .prueba4-chip-input, .prueba4-add`. Controla apariencia. `border-radius`.
- [L1446](../../../apps/referidos-pwa/src/pages/prueba4.css#L1446) `.prueba4-mini-input`. Controla apariencia. `border-radius`.
- [L1450](../../../apps/referidos-pwa/src/pages/prueba4.css#L1450) `.prueba4-primary, .prueba4-secondary`. Controla apariencia, tamaño y espaciado, texto. `border-radius`, `height`, `padding`, `font-size`.
- [L1458](../../../apps/referidos-pwa/src/pages/prueba4.css#L1458) `.prueba4-actions__buttons`. Controla distribución. `gap`, `flex`.
- [L1463](../../../apps/referidos-pwa/src/pages/prueba4.css#L1463) `.prueba4-save-state`. Controla distribución, tamaño y espaciado. `flex`, `min-width`.
- [L1468](../../../apps/referidos-pwa/src/pages/prueba4.css#L1468) `.prueba4-save-dot`. Controla apariencia. `box-shadow`.
- [L1472](../../../apps/referidos-pwa/src/pages/prueba4.css#L1472) `.prueba4-primary`. Controla apariencia. `background`, `box-shadow`.
- [L1477](../../../apps/referidos-pwa/src/pages/prueba4.css#L1477) `.prueba4-primary, .prueba4-secondary`. Controla tamaño y espaciado. `padding`.
- [L1482](../../../apps/referidos-pwa/src/pages/prueba4.css#L1482) `.prueba4-primary`. Controla apariencia. `background`.
- [L1485](../../../apps/referidos-pwa/src/pages/prueba4.css#L1485) `.prueba4-profile`. Controla apariencia. `border-radius`.
- [L1489](../../../apps/referidos-pwa/src/pages/prueba4.css#L1489) `.prueba4-editor`. Controla apariencia. `border-radius`.
- [L1493](../../../apps/referidos-pwa/src/pages/prueba4.css#L1493) `.prueba4-pill-switch, .prueba4-speed-switch`. Controla apariencia. `border-radius`.
- [L1498](../../../apps/referidos-pwa/src/pages/prueba4.css#L1498) `.prueba4-pill-switch button, .prueba4-speed-switch button`. Controla apariencia. `border-radius`.
- [L1503](../../../apps/referidos-pwa/src/pages/prueba4.css#L1503) `.prueba4-card`. Controla apariencia. `border-radius`.
- [L1507](../../../apps/referidos-pwa/src/pages/prueba4.css#L1507) `.prueba4-card::before`. Controla apariencia. `border-radius`.
- [L1511](../../../apps/referidos-pwa/src/pages/prueba4.css#L1511) `.prueba4-card__media`. Controla apariencia. `border-radius`.
- [L1515](../../../apps/referidos-pwa/src/pages/prueba4.css#L1515) `.prueba4-card__conditions, .prueba4-card__pill`. Controla apariencia. `border-radius`.
- [L1520](../../../apps/referidos-pwa/src/pages/prueba4.css#L1520) `.prueba4-save-dot`. Controla apariencia. `box-shadow`.
- [L1524](../../../apps/referidos-pwa/src/pages/prueba4.css#L1524) `.prueba4-primary, .prueba4-secondary`. Controla tamaño y espaciado. `padding`.
- [L1529](../../../apps/referidos-pwa/src/pages/prueba4.css#L1529) `.prueba4-primary`. Controla apariencia. `background`.
- [L1532](../../../apps/referidos-pwa/src/pages/prueba4.css#L1532) `.prueba4-group`. Controla apariencia. `background`, `border`, `box-shadow`.
- [L1538](../../../apps/referidos-pwa/src/pages/prueba4.css#L1538) `.prueba4-input--select`. Controla apariencia. `background`, `border`, `box-shadow`, `color`.
- [L1545](../../../apps/referidos-pwa/src/pages/prueba4.css#L1545) `.prueba4-select`. Controla apariencia. `background`, `border`, `box-shadow`.
- [L1551](../../../apps/referidos-pwa/src/pages/prueba4.css#L1551) `.prueba4-chip-input`. Controla apariencia. `background`, `border`, `box-shadow`.
- [L1557](../../../apps/referidos-pwa/src/pages/prueba4.css#L1557) `.prueba4-mini-input`. Controla apariencia. `background`, `border`, `box-shadow`.
- [L1563](../../../apps/referidos-pwa/src/pages/prueba4.css#L1563) `.prueba4-add, .prueba4-secondary`. Controla apariencia. `background`, `border`, `box-shadow`.
- [L1570](../../../apps/referidos-pwa/src/pages/prueba4.css#L1570) `.prueba4-condition-row, .prueba4-benefit-row`. Controla apariencia. `color`.
- [L1574](../../../apps/referidos-pwa/src/pages/prueba4.css#L1574) `.prueba4-group`. Controla apariencia. `background`, `border`.
- [L1579](../../../apps/referidos-pwa/src/pages/prueba4.css#L1579) `.prueba4-input--select`. Controla apariencia. `background`, `border`.
- [L1584](../../../apps/referidos-pwa/src/pages/prueba4.css#L1584) `.prueba4-select`. Controla apariencia. `background`, `border`.
- [L1589](../../../apps/referidos-pwa/src/pages/prueba4.css#L1589) `.prueba4-chip-input`. Controla apariencia. `background`, `border`.
- [L1594](../../../apps/referidos-pwa/src/pages/prueba4.css#L1594) `.prueba4-mini-input`. Controla apariencia. `background`, `border`.
- [L1599](../../../apps/referidos-pwa/src/pages/prueba4.css#L1599) `.prueba4-add, .prueba4-secondary`. Controla apariencia. `background`, `border`.
- [L1605](../../../apps/referidos-pwa/src/pages/prueba4.css#L1605) `.prueba4-condition-row, .prueba4-benefit-row`. Controla apariencia. `color`.
- [L1610](../../../apps/referidos-pwa/src/pages/prueba4.css#L1610) `.prueba4-group`. Controla apariencia. `border-radius`, `background`, `border`.
- [L1616](../../../apps/referidos-pwa/src/pages/prueba4.css#L1616) `.prueba4-input--select`. Controla apariencia. `border-radius`, `background`, `border`, `color`.
- [L1623](../../../apps/referidos-pwa/src/pages/prueba4.css#L1623) `.prueba4-input--select svg`. Controla apariencia. `color`.
- [L1627](../../../apps/referidos-pwa/src/pages/prueba4.css#L1627) `.prueba4-add, .prueba4-secondary`. Controla apariencia. `border-radius`, `border`.
- [L1633](../../../apps/referidos-pwa/src/pages/prueba4.css#L1633) `.prueba4-input, .prueba4-textarea`. Controla apariencia. `border-radius`.
- [L1638](../../../apps/referidos-pwa/src/pages/prueba4.css#L1638) `.prueba4-page`. Controla tamaño y espaciado. `min-height`.
- [L1642](../../../apps/referidos-pwa/src/pages/prueba4.css#L1642) `.prueba4-canvas`. Controla posición y capas, tamaño y espaciado. `position`, `inset`, `width`, `min-height`, `transform`.
- [L1650](../../../apps/referidos-pwa/src/pages/prueba4.css#L1650) `.prueba4-main`. Controla distribución, apariencia. `grid-template-columns`, `justify-content`, `align-items`, `background-image`, `background-size`, `background-position`.
- [L1659](../../../apps/referidos-pwa/src/pages/prueba4.css#L1659) `.prueba4-preview-wrap`. Controla posición y capas, tamaño y espaciado, distribución, apariencia. `position`, `width`, `min-width`, `justify-self`, `display`, `flex-direction`, `align-items`, `box-sizing`, `padding`, `background`.
- [L1672](../../../apps/referidos-pwa/src/pages/prueba4.css#L1672) `.prueba4-preview-wrap::after`. Controla renderizado. `content`.
- [L1676](../../../apps/referidos-pwa/src/pages/prueba4.css#L1676) `.prueba4-speed-switch, .prueba4-help-link, .prueba4-card`. Controla posición y capas, distribución. `position`, `z-index`, `align-self`.
- [L1684](../../../apps/referidos-pwa/src/pages/prueba4.css#L1684) `.prueba4-dots`. Controla distribución. `display`.
- [L1688](../../../apps/referidos-pwa/src/pages/prueba4.css#L1688) `@media (max-width: 817.4px)`. Restringe las reglas por tamaño, dispositivo, accesibilidad o forma de visualización según la condición.
- [L1689](../../../apps/referidos-pwa/src/pages/prueba4.css#L1689) `.prueba4-main`. Controla distribución. `grid-template-columns`. Dentro de `@media (max-width: 817.4px)`.
- [L1693](../../../apps/referidos-pwa/src/pages/prueba4.css#L1693) `.prueba4-preview-wrap`. Controla tamaño y espaciado. `width`, `min-width`, `padding`. Dentro de `@media (max-width: 817.4px)`.
- [L1700](../../../apps/referidos-pwa/src/pages/prueba4.css#L1700) `.prueba4-input, .prueba4-textarea`. Controla apariencia. `color`.
- [L1705](../../../apps/referidos-pwa/src/pages/prueba4.css#L1705) `.prueba4-input svg`. Controla apariencia. `color`.
- [L1709](../../../apps/referidos-pwa/src/pages/prueba4.css#L1709) `.prueba4-card__body h1`. Controla texto. `font-weight`.
- [L1713](../../../apps/referidos-pwa/src/pages/prueba4.css#L1713) `.prueba4-card__conditions h2`. Controla texto. `font-weight`.
- [L1717](../../../apps/referidos-pwa/src/pages/prueba4.css#L1717) `.prueba4-card__body p`. Controla texto. `font-size`.
- [L1721](../../../apps/referidos-pwa/src/pages/prueba4.css#L1721) `.prueba4-card__body`. Controla tamaño y espaciado. `padding`.
- [L1725](../../../apps/referidos-pwa/src/pages/prueba4.css#L1725) `.prueba4-card__body p`. Controla tamaño y espaciado, texto. `margin-top`, `line-height`.
- [L1730](../../../apps/referidos-pwa/src/pages/prueba4.css#L1730) `.prueba4-separator`. Controla tamaño y espaciado. `margin`.
- [L1734](../../../apps/referidos-pwa/src/pages/prueba4.css#L1734) `.prueba4-card__conditions`. Controla tamaño y espaciado. `padding`.
- [L1738](../../../apps/referidos-pwa/src/pages/prueba4.css#L1738) `.prueba4-card__conditions h2`. Controla tamaño y espaciado. `margin-bottom`.
- [L1742](../../../apps/referidos-pwa/src/pages/prueba4.css#L1742) `.prueba4-card__pill`. Controla tamaño y espaciado. `min-height`.
- [L1746](../../../apps/referidos-pwa/src/pages/prueba4.css#L1746) `.prueba4-card__pill + .prueba4-card__pill`. Controla tamaño y espaciado. `margin-top`.
- [L1750](../../../apps/referidos-pwa/src/pages/prueba4.css#L1750) `.prueba4-meta`. Controla distribución. `gap`.
- [L1754](../../../apps/referidos-pwa/src/pages/prueba4.css#L1754) `.prueba4-meta__row`. Controla texto. `font-size`.
- [L1758](../../../apps/referidos-pwa/src/pages/prueba4.css#L1758) `.prueba4-meta__row svg`. Controla tamaño y espaciado. `width`, `height`.
- [L1763](../../../apps/referidos-pwa/src/pages/prueba4.css#L1763) `.prueba4-card__body > .prueba4-separator:first-of-type`. Controla tamaño y espaciado. `margin-top`, `margin-bottom`.
- [L1768](../../../apps/referidos-pwa/src/pages/prueba4.css#L1768) `.prueba4-card__conditions + .prueba4-separator`. Controla tamaño y espaciado. `margin-top`, `margin-bottom`.
