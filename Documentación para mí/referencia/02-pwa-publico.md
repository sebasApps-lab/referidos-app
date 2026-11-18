# PWA principal · Configuración, activos y archivos públicos

[Volver a la guía de la PWA](../02-pwa-principal.md) · [Índice general](../README.md)

Los archivos públicos pueden servirse directamente por URL, incluidos aquellos sin una importación de React. Las imágenes de src se empaquetan según las referencias encontradas desde el frontend.

32 archivos de `apps/referidos-app`. Las rutas de esta referencia se leen desde ese workspace. Los enlaces de importación y exportación se extraen del código actual y muestran las conexiones más cercanas a cada pieza.

## `docs`

### [`README.md`](../../apps/referidos-app/docs/README.md)

Guía original de la PWA y sus comandos. Presenta su rol funcional dentro del monorepo.

## `.`

### [`index.html`](../../apps/referidos-app/index.html)

Entrada de Vite con metadatos de sitio, nodo React, manifiesto estático y script de configuración pública previo a JavaScript.

### [`package.json`](../../apps/referidos-app/package.json)

Declara el workspace principal web y sus scripts de desarrollo, build, preview y lint. Sus paquetes internos se resuelven en el monorepo.

### [`vite.config.js`](../../apps/referidos-app/vite.config.js)

Configura Vite, React, Tailwind, resolución de paquetes y construcción PWA, incluidos manifiesto y mapas de origen.

**Exporta** `default`.

**Se apoya en** `vite`, `@vitejs/plugin-react`, `@tailwindcss/vite`, `vite-plugin-pwa`, `node:path`, `node:url`.

## `public`

### [`app-config.js`](../../apps/referidos-app/public/app-config.js)

Inicializa el objeto público de configuración para que el código web lo lea antes de elegir los valores VITE de respaldo.

### [`manifest.json`](../../apps/referidos-app/public/manifest.json)

Manifiesto estático histórico que menciona el worker público manual. Contrasta metadatos con el archivo webmanifest y con Vite.

### [`manifest.webmanifest`](../../apps/referidos-app/public/manifest.webmanifest)

Manifiesto estático enlazado desde index.html. Define lo que el navegador lee del enlace de instalación.

### [`noise.png`](../../apps/referidos-app/public/noise.png)

Textura de ruido disponible como activo público para fondos.

**Dimensiones** 128 × 128 px.

### [`robots.txt`](../../apps/referidos-app/public/robots.txt)

Directivas públicas para rastreadores del sitio.

### [`service-worker.js`](../../apps/referidos-app/public/service-worker.js)

Worker estático con caché simple de inicio. main.jsx registra el worker generado por Vite en el camino actual.

### [`sitemap.xml`](../../apps/referidos-app/public/sitemap.xml)

Mapa público de URLs que pueden consultar los motores de búsqueda.

### [`vite.svg`](../../apps/referidos-app/public/vite.svg)

Activo público de Vite conservado en el workspace.

## `public/icons`

### [`icon-192.png`](../../apps/referidos-app/public/icons/icon-192.png)

Icono de aplicación PWA en resolución de 192 píxeles.

**Dimensiones** 192 × 192 px.

### [`icon-512.png`](../../apps/referidos-app/public/icons/icon-512.png)

Icono de aplicación PWA en resolución de 512 píxeles.

**Dimensiones** 512 × 512 px.

## `public/inec`

### [`organizacion-territorial-cantonal-2025.ods`](../../apps/referidos-app/public/inec/organizacion-territorial-cantonal-2025.ods)

Hoja original del catálogo territorial de nivel cantonal.

### [`organizacion-territorial-ecuador-2025.csv`](../../apps/referidos-app/public/inec/organizacion-territorial-ecuador-2025.csv)

Catálogo INEC en texto separado para importación o consulta del mapa territorial. El selector de UI consulta tablas de territorio.

### [`organizacion-territorial-parroquial-2025.ods`](../../apps/referidos-app/public/inec/organizacion-territorial-parroquial-2025.ods)

Hoja original del catálogo territorial de nivel parroquial.

### [`organizacion-territorial-provincial-2025.ods`](../../apps/referidos-app/public/inec/organizacion-territorial-provincial-2025.ods)

Hoja original del catálogo territorial de nivel provincial.

## `public/screenshots`

### [`desktop-1.png`](../../apps/referidos-app/public/screenshots/desktop-1.png)

Captura pública 1 de la variante escritorio. Está disponible para las vistas previas y referencias del manifiesto que apunten a esta ruta.

**Dimensiones** 1155 × 745 px.

### [`desktop-2.png`](../../apps/referidos-app/public/screenshots/desktop-2.png)

Captura pública 2 de la variante escritorio. Está disponible para las vistas previas y referencias del manifiesto que apunten a esta ruta.

**Dimensiones** 1129 × 787 px.

### [`mobile-1.png`](../../apps/referidos-app/public/screenshots/mobile-1.png)

Captura pública 1 de la variante móvil. Está disponible para las vistas previas y referencias del manifiesto que apunten a esta ruta.

**Dimensiones** 2580 × 5592 px.

### [`mobile-2.png`](../../apps/referidos-app/public/screenshots/mobile-2.png)

Captura pública 2 de la variante móvil. Está disponible para las vistas previas y referencias del manifiesto que apunten a esta ruta.

**Dimensiones** 1082 × 2402 px.

### [`mobile-3.png`](../../apps/referidos-app/public/screenshots/mobile-3.png)

Captura pública 3 de la variante móvil. Está disponible para las vistas previas y referencias del manifiesto que apunten a esta ruta.

**Dimensiones** 2580 × 5592 px.

## `public/zohoverify`

### [`verifyforzoho.html`](../../apps/referidos-app/public/zohoverify/verifyforzoho.html)

Archivo de verificación pública de dominio para Zoho. Se sirve por ruta, sin import de React.

## `src/assets/badges`

### [`badge-promo-hot.png`](../../apps/referidos-app/src/assets/badges/badge-promo-hot.png)

Insignia de promociones para la variante destacada.

**Lo importa** [`components/cards/PromoCardHot.jsx`](../../apps/referidos-app/src/components/cards/PromoCardHot.jsx).

**Dimensiones** 305 × 135 px.

## `src/assets`

### [`bg-home.png`](../../apps/referidos-app/src/assets/bg-home.png)

Imagen de fondo para composiciones de inicio.

**Lo importa** [`negocio/inicio/InicioHero.jsx`](../../apps/referidos-app/src/negocio/inicio/InicioHero.jsx).

**Dimensiones** 2000 × 2000 px.

### [`react.svg`](../../apps/referidos-app/src/assets/react.svg)

Activo SVG de React conservado en el árbol fuente de la PWA.

## `src/assets/categories`

### [`tipica.png`](../../apps/referidos-app/src/assets/categories/tipica.png)

Imagen de categoría típica que puede usar el catálogo visual de promociones.

**Dimensiones** 512 × 387 px.

## `src/assets/images`

### [`embers-bg.png`](../../apps/referidos-app/src/assets/images/embers-bg.png)

Imagen de brasas disponible para el fondo de la composición destacada.

**Lo importa** [`components/cards/PromoCardHot.jsx`](../../apps/referidos-app/src/components/cards/PromoCardHot.jsx).

**Dimensiones** 1180 × 640 px.

### [`embers-bg1.png`](../../apps/referidos-app/src/assets/images/embers-bg1.png)

Variante del fondo de brasas. Mantiene una ruta separada para poder escoger la composición.

**Dimensiones** 731 × 640 px.

## `src/assets/masks`

### [`gradient-embers.svg`](../../apps/referidos-app/src/assets/masks/gradient-embers.svg)

Máscara vectorial de gradiente para la composición de brasas.

## `src/assets/overlays`

### [`hot-sparkles-overlay.png`](../../apps/referidos-app/src/assets/overlays/hot-sparkles-overlay.png)

Capa gráfica de destellos para la tarjeta promocional destacada.

**Lo importa** [`components/cards/PromoCardHot.jsx`](../../apps/referidos-app/src/components/cards/PromoCardHot.jsx).

**Dimensiones** 1136 × 640 px.
