# Configuración, manifiestos y entradas de aplicaciones

[Volver a la referencia de infraestructura](README.md)

Los enlaces a líneas apuntan al checkout analizado. Las relaciones se obtuvieron leyendo declaraciones, imports y configuraciones. Los valores de credenciales y datos operativos se dejan en sus archivos de origen.

## Archivos en este capítulo

- [.editorconfig](#editorconfig)
- [.gitignore](#gitignore)
- [.npmrc](#npmrc)
- [.vscode/extensions.json](#vscodeextensionsjson)
- [apps/prelaunch/index.html](#appsprelaunchindexhtml)
- [apps/prelaunch/package.json](#appsprelaunchpackagejson)
- [apps/prelaunch/public/_headers](#appsprelaunchpublic_headers)
- [apps/prelaunch/public/_redirects](#appsprelaunchpublic_redirects)
- [apps/prelaunch/public/favicon/site.webmanifest](#appsprelaunchpublicfaviconsitewebmanifest)
- [apps/prelaunch/vite.config.js](#appsprelaunchviteconfigjs)
- [apps/referidos-android/app.json](#appsreferidos-androidappjson)
- [apps/referidos-android/babel.config.cjs](#appsreferidos-androidbabelconfigcjs)
- [apps/referidos-android/env.development.example.json](#appsreferidos-androidenvdevelopmentexamplejson)
- [apps/referidos-android/env.example.json](#appsreferidos-androidenvexamplejson)
- [apps/referidos-android/env.production.example.json](#appsreferidos-androidenvproductionexamplejson)
- [apps/referidos-android/env.staging.example.json](#appsreferidos-androidenvstagingexamplejson)
- [apps/referidos-android/index.js](#appsreferidos-androidindexjs)
- [apps/referidos-android/metro.config.cjs](#appsreferidos-androidmetroconfigcjs)
- [apps/referidos-android/package.json](#appsreferidos-androidpackagejson)
- [apps/referidos-android/react-native.config.js](#appsreferidos-androidreact-nativeconfigjs)
- [apps/referidos-android/tsconfig.json](#appsreferidos-androidtsconfigjson)
- [apps/referidos-app/index.html](#appsreferidos-appindexhtml)
- [apps/referidos-app/package.json](#appsreferidos-apppackagejson)
- [apps/referidos-app/public/manifest.json](#appsreferidos-apppublicmanifestjson)
- [apps/referidos-app/public/manifest.webmanifest](#appsreferidos-apppublicmanifestwebmanifest)
- [apps/referidos-app/public/robots.txt](#appsreferidos-apppublicrobotstxt)
- [apps/referidos-app/public/sitemap.xml](#appsreferidos-apppublicsitemapxml)
- [apps/referidos-app/public/zohoverify/verifyforzoho.html](#appsreferidos-apppubliczohoverifyverifyforzohohtml)
- [apps/referidos-app/vite.config.js](#appsreferidos-appviteconfigjs)
- [apps/referidos-pwa/index.html](#appsreferidos-pwaindexhtml)
- [apps/referidos-pwa/package.json](#appsreferidos-pwapackagejson)
- [apps/referidos-pwa/vite.config.js](#appsreferidos-pwaviteconfigjs)
- [assets/.netlify-assets-publish-legacy/index.html](#assetsnetlify-assets-publish-legacyindexhtml)
- [eslint.config.js](#eslintconfigjs)
- [package.json](#packagejson)
- [packages/api-client/package.json](#packagesapi-clientpackagejson)
- [packages/domain/package.json](#packagesdomainpackagejson)
- [packages/feedback-sdk/package.json](#packagesfeedback-sdkpackagejson)
- [packages/intake-guard/package.json](#packagesintake-guardpackagejson)
- [packages/legal-content/package.json](#packageslegal-contentpackagejson)
- [packages/notifications-sdk/package.json](#packagesnotifications-sdkpackagejson)
- [packages/observability-sdk/package.json](#packagesobservability-sdkpackagejson)
- [packages/observability/package.json](#packagesobservabilitypackagejson)
- [packages/platform-rn/package.json](#packagesplatform-rnpackagejson)
- [packages/platform-web/package.json](#packagesplatform-webpackagejson)
- [packages/security-core/package.json](#packagessecurity-corepackagejson)
- [packages/support-sdk/package.json](#packagessupport-sdkpackagejson)
- [versioning/component-map.json](#versioningcomponent-mapjson)
- [versioning/env.contract.json](#versioningenvcontractjson)
- [vite.prelaunch.config.js](#viteprelaunchconfigjs)

## .editorconfig

[Abrir fuente](../../../.editorconfig) · 13 líneas de texto.

Fija convenciones compartidas de encoding, fin de línea e indentación. Es la referencia para cambios de formato que cruzan plataformas.

- [L1](../../../.editorconfig#L1) Clave `root` leída por la herramienta.
- [L3](../../../.editorconfig#L3) Bloque `[*]` de configuración.
- [L4](../../../.editorconfig#L4) Clave `charset` leída por la herramienta.
- [L5](../../../.editorconfig#L5) Clave `end_of_line` leída por la herramienta.
- [L6](../../../.editorconfig#L6) Clave `insert_final_newline` leída por la herramienta.
- [L7](../../../.editorconfig#L7) Clave `indent_style` leída por la herramienta.
- [L8](../../../.editorconfig#L8) Clave `indent_size` leída por la herramienta.
- [L9](../../../.editorconfig#L9) Clave `trim_trailing_whitespace` leída por la herramienta.
- [L11](../../../.editorconfig#L11) Bloque `[*.md]` de configuración.
- [L12](../../../.editorconfig#L12) Clave `trim_trailing_whitespace` leída por la herramienta.

## .gitignore

[Abrir fuente](../../../.gitignore) · 90 líneas de texto.

Controla exclusión de productos de build, dependencias, configuración local y logs. La regla general logs afecta al helper móvil no versionado.

- [L2](../../../.gitignore#L2) Patrón `logs`. Excluye rutas de los candidatos a seguimiento de Git.
- [L3](../../../.gitignore#L3) Patrón `!src/admin/logs/`. Reincorpora rutas específicas al conjunto que Git puede seguir.
- [L4](../../../.gitignore#L4) Patrón `!src/admin/logs/**`. Reincorpora rutas específicas al conjunto que Git puede seguir.
- [L5](../../../.gitignore#L5) Patrón `!apps/referidos-app/src/admin/logs/`. Reincorpora rutas específicas al conjunto que Git puede seguir.
- [L6](../../../.gitignore#L6) Patrón `!apps/referidos-app/src/admin/logs/**`. Reincorpora rutas específicas al conjunto que Git puede seguir.
- [L7](../../../.gitignore#L7) Patrón `*.log`. Excluye rutas de los candidatos a seguimiento de Git.
- [L8](../../../.gitignore#L8) Patrón `npm-debug.log*`. Excluye rutas de los candidatos a seguimiento de Git.
- [L9](../../../.gitignore#L9) Patrón `yarn-debug.log*`. Excluye rutas de los candidatos a seguimiento de Git.
- [L10](../../../.gitignore#L10) Patrón `yarn-error.log*`. Excluye rutas de los candidatos a seguimiento de Git.
- [L11](../../../.gitignore#L11) Patrón `pnpm-debug.log*`. Excluye rutas de los candidatos a seguimiento de Git.
- [L12](../../../.gitignore#L12) Patrón `lerna-debug.log*`. Excluye rutas de los candidatos a seguimiento de Git.
- [L14](../../../.gitignore#L14) Patrón `node_modules`. Excluye rutas de los candidatos a seguimiento de Git.
- [L15](../../../.gitignore#L15) Patrón `dist`. Excluye rutas de los candidatos a seguimiento de Git.
- [L16](../../../.gitignore#L16) Patrón `dist-ssr`. Excluye rutas de los candidatos a seguimiento de Git.
- [L17](../../../.gitignore#L17) Patrón `versioning/out/`. Excluye rutas de los candidatos a seguimiento de Git.
- [L18](../../../.gitignore#L18) Patrón `*.local`. Excluye rutas de los candidatos a seguimiento de Git.
- [L19](../../../.gitignore#L19) Patrón `.env`. Excluye rutas de los candidatos a seguimiento de Git.
- [L20](../../../.gitignore#L20) Patrón `.env.*`. Excluye rutas de los candidatos a seguimiento de Git.
- [L21](../../../.gitignore#L21) Patrón `.env.local`. Excluye rutas de los candidatos a seguimiento de Git.
- [L22](../../../.gitignore#L22) Patrón `.env.production`. Excluye rutas de los candidatos a seguimiento de Git.
- [L23](../../../.gitignore#L23) Patrón `.env.development`. Excluye rutas de los candidatos a seguimiento de Git.
- [L24](../../../.gitignore#L24) Patrón `!.env.example`. Reincorpora rutas específicas al conjunto que Git puede seguir.
- [L25](../../../.gitignore#L25) Patrón `public/inec/*.ods`. Excluye rutas de los candidatos a seguimiento de Git.
- [L26](../../../.gitignore#L26) Patrón `public/inec/*.zip`. Excluye rutas de los candidatos a seguimiento de Git.
- [L27](../../../.gitignore#L27) Patrón `!public/inec/*.csv`. Reincorpora rutas específicas al conjunto que Git puede seguir.
- [L28](../../../.gitignore#L28) Patrón `apps/referidos-app/public/inec/*.ods`. Excluye rutas de los candidatos a seguimiento de Git.
- [L29](../../../.gitignore#L29) Patrón `apps/referidos-app/public/inec/*.zip`. Excluye rutas de los candidatos a seguimiento de Git.
- [L30](../../../.gitignore#L30) Patrón `!apps/referidos-app/public/inec/*.csv`. Reincorpora rutas específicas al conjunto que Git puede seguir.
- [L33](../../../.gitignore#L33) Patrón `.vscode/*`. Excluye rutas de los candidatos a seguimiento de Git.
- [L34](../../../.gitignore#L34) Patrón `!.vscode/extensions.json`. Reincorpora rutas específicas al conjunto que Git puede seguir.
- [L35](../../../.gitignore#L35) Patrón `.idea`. Excluye rutas de los candidatos a seguimiento de Git.
- [L36](../../../.gitignore#L36) Patrón `.DS_Store`. Excluye rutas de los candidatos a seguimiento de Git.
- [L37](../../../.gitignore#L37) Patrón `*.suo`. Excluye rutas de los candidatos a seguimiento de Git.
- [L38](../../../.gitignore#L38) Patrón `*.ntvs*`. Excluye rutas de los candidatos a seguimiento de Git.
- [L39](../../../.gitignore#L39) Patrón `*.njsproj`. Excluye rutas de los candidatos a seguimiento de Git.
- [L40](../../../.gitignore#L40) Patrón `*.sln`. Excluye rutas de los candidatos a seguimiento de Git.
- [L41](../../../.gitignore#L41) Patrón `*.sw?`. Excluye rutas de los candidatos a seguimiento de Git.
- [L44](../../../.gitignore#L44) Patrón `/.gradle-local/`. Excluye rutas de los candidatos a seguimiento de Git.
- [L45](../../../.gitignore#L45) Patrón `/.gradle-release-run/`. Excluye rutas de los candidatos a seguimiento de Git.
- [L46](../../../.gitignore#L46) Patrón `/.android-local/`. Excluye rutas de los candidatos a seguimiento de Git.
- [L47](../../../.gitignore#L47) Patrón `apps/referidos-android/android/.gradle/`. Excluye rutas de los candidatos a seguimiento de Git.
- [L48](../../../.gitignore#L48) Patrón `apps/referidos-android/android/.gradle-release-run/`. Excluye rutas de los candidatos a seguimiento de Git.
- [L49](../../../.gitignore#L49) Patrón `apps/referidos-android/android/build/`. Excluye rutas de los candidatos a seguimiento de Git.
- [L50](../../../.gitignore#L50) Patrón `apps/referidos-android/android/app/build/`. Excluye rutas de los candidatos a seguimiento de Git.
- [L51](../../../.gitignore#L51) Patrón `apps/referidos-android/android/app/.cxx/`. Excluye rutas de los candidatos a seguimiento de Git.
- [L52](../../../.gitignore#L52) Patrón `apps/referidos-android/android/local.properties`. Excluye rutas de los candidatos a seguimiento de Git.
- [L53](../../../.gitignore#L53) Patrón `apps/referidos-android/android/.kotlin/`. Excluye rutas de los candidatos a seguimiento de Git.
- [L54](../../../.gitignore#L54) Patrón `apps/referidos-android/env.json`. Excluye rutas de los candidatos a seguimiento de Git.
- [L55](../../../.gitignore#L55) Patrón `apps/referidos-android/env.local.json`. Excluye rutas de los candidatos a seguimiento de Git.
- [L56](../../../.gitignore#L56) Patrón `/.npm-cache-local/`. Excluye rutas de los candidatos a seguimiento de Git.
- [L57](../../../.gitignore#L57) Patrón `apps/referidos-app/.npm-cache-local/`. Excluye rutas de los candidatos a seguimiento de Git.
- [L58](../../../.gitignore#L58) Patrón `apps/referidos-android/.npm-cache-local/`. Excluye rutas de los candidatos a seguimiento de Git.
- [L59](../../../.gitignore#L59) Patrón `/.chrome-shot-profile/`. Excluye rutas de los candidatos a seguimiento de Git.
- [L60](../../../.gitignore#L60) Patrón `/.edge-shot-profile/`. Excluye rutas de los candidatos a seguimiento de Git.
- [L61](../../../.gitignore#L61) Patrón `/.tmp-pwa-server.cjs`. Excluye rutas de los candidatos a seguimiento de Git.
- [L62](../../../.gitignore#L62) Patrón `/.tmp-pwa-server.err`. Excluye rutas de los candidatos a seguimiento de Git.
- [L63](../../../.gitignore#L63) Patrón `/.tmp-pwa-server.out`. Excluye rutas de los candidatos a seguimiento de Git.
- [L64](../../../.gitignore#L64) Patrón `/.tmp-pwa-server.pid`. Excluye rutas de los candidatos a seguimiento de Git.
- [L65](../../../.gitignore#L65) Patrón `/chrome-shot.png`. Excluye rutas de los candidatos a seguimiento de Git.
- [L66](../../../.gitignore#L66) Patrón `/shot.png`. Excluye rutas de los candidatos a seguimiento de Git.
- [L67](../../../.gitignore#L67) Patrón `/prelaunch-dev.err`. Excluye rutas de los candidatos a seguimiento de Git.
- [L68](../../../.gitignore#L68) Patrón `/prelaunch-dev.out`. Excluye rutas de los candidatos a seguimiento de Git.
- [L70](../../../.gitignore#L70) Patrón `/.tmp-*.mjs`. Excluye rutas de los candidatos a seguimiento de Git.
- [L71](../../../.gitignore#L71) Patrón `/.tmp-*.out`. Excluye rutas de los candidatos a seguimiento de Git.
- [L72](../../../.gitignore#L72) Patrón `/.tmp-*.err`. Excluye rutas de los candidatos a seguimiento de Git.
- [L73](../../../.gitignore#L73) Patrón `/*-shot.png`. Excluye rutas de los candidatos a seguimiento de Git.
- [L74](../../../.gitignore#L74) Patrón `/prueba4-*.png`. Excluye rutas de los candidatos a seguimiento de Git.
- [L77](../../../.gitignore#L77) Patrón `__MACOSX/`. Excluye rutas de los candidatos a seguimiento de Git.
- [L78](../../../.gitignore#L78) Patrón `._*`. Excluye rutas de los candidatos a seguimiento de Git.
- [L80](../../../.gitignore#L80) Patrón `/apps/prelaunch/public/editorial/Free_H_Mockups_Google_Pixel_7a/`. Excluye rutas de los candidatos a seguimiento de Git.
- [L81](../../../.gitignore#L81) Patrón `/apps/prelaunch/public/editorial/Free_N_Mockups_Nothing_Phone_2a/`. Excluye rutas de los candidatos a seguimiento de Git.
- [L82](../../../.gitignore#L82) Patrón `/apps/prelaunch/public/screenshots/Mockup img *.png`. Excluye rutas de los candidatos a seguimiento de Git.
- [L83](../../../.gitignore#L83) Patrón `figma-prototype-current-bottom.png`. Excluye rutas de los candidatos a seguimiento de Git.
- [L84](../../../.gitignore#L84) Patrón `figma-prototype-current-bottom.png`. Excluye rutas de los candidatos a seguimiento de Git.
- [L85](../../../.gitignore#L85) Patrón `figma-prototype-current-bottom.png`. Excluye rutas de los candidatos a seguimiento de Git.
- [L86](../../../.gitignore#L86) Patrón `figma-prototype-current-bottom.png`. Excluye rutas de los candidatos a seguimiento de Git.
- [L87](../../../.gitignore#L87) Patrón `figma-prototype-current-bottom.png`. Excluye rutas de los candidatos a seguimiento de Git.
- [L88](../../../.gitignore#L88) Patrón `figma-prototype-current-full.png`. Excluye rutas de los candidatos a seguimiento de Git.
- [L89](../../../.gitignore#L89) Patrón `figma-prototype-current-hero.png`. Excluye rutas de los candidatos a seguimiento de Git.

## .npmrc

[Abrir fuente](../../../.npmrc) · 6 líneas de texto.

Opciones de npm que aplican en la raíz y afectan instalación de los workspaces. Consulta este archivo junto con el lockfile al investigar diferencias.

- [L1](../../../.npmrc#L1) Clave `cache` leída por la herramienta.
- [L2](../../../.npmrc#L2) Clave `offline` leída por la herramienta.
- [L3](../../../.npmrc#L3) Clave `prefer-online` leída por la herramienta.
- [L4](../../../.npmrc#L4) Clave `fetch-retries` leída por la herramienta.
- [L5](../../../.npmrc#L5) Clave `fetch-timeout` leída por la herramienta.

## .vscode/extensions.json

[Abrir fuente](../../../.vscode/extensions.json) · 6 líneas de texto.

Recomendaciones de extensiones para el editor en este repositorio.

- [recommendations](../../../.vscode/extensions.json#L2). Extensiones que el editor muestra como recomendadas para el workspace.

## apps/prelaunch/index.html

[Abrir fuente](../../../apps/prelaunch/index.html) · 23 líneas de texto.

Define la carcasa HTML, el título y los metadatos. Carga el archivo público de configuración antes de la entrada para permitir que cada deploy seleccione su runtime.

- [L2](../../../apps/prelaunch/index.html#L2) `<html>`. Raíz y ajustes del documento servido al navegador. Atributos `lang`.
- [L3](../../../apps/prelaunch/index.html#L3) `<head>`. Sección de configuración anterior al montaje del frontend.
- [L4](../../../apps/prelaunch/index.html#L4) `<meta>`. Metadatos consumidos por el navegador, también para vista previa o layout. Atributos `charset`.
- [L5](../../../apps/prelaunch/index.html#L5) `<link>` `icon`. Vincula favicon, estilo, manifest, precarga u otro recurso público. Atributos `rel`, `type`, `href`, `sizes`. Carga [favicon.svg](../../../apps/prelaunch/public/favicon/favicon.svg).
- [L6](../../../apps/prelaunch/index.html#L6) `<link>` `icon`. Vincula favicon, estilo, manifest, precarga u otro recurso público. Atributos `rel`, `type`, `href`, `sizes`. Carga [favicon-96x96.png](../../../apps/prelaunch/public/favicon/favicon-96x96.png).
- [L7](../../../apps/prelaunch/index.html#L7) `<link>`. Vincula favicon, estilo, manifest, precarga u otro recurso público. Atributos `rel`, `href`. Carga [favicon.ico](../../../apps/prelaunch/public/favicon/favicon.ico).
- [L8](../../../apps/prelaunch/index.html#L8) `<link>` `apple-touch-icon`. Vincula favicon, estilo, manifest, precarga u otro recurso público. Atributos `rel`, `sizes`, `href`. Carga [apple-touch-icon.png](../../../apps/prelaunch/public/favicon/apple-touch-icon.png).
- [L9](../../../apps/prelaunch/index.html#L9) `<meta>` `apple-mobile-web-app-title`. Metadatos consumidos por el navegador, también para vista previa o layout. Atributos `name`, `content`.
- [L10](../../../apps/prelaunch/index.html#L10) `<link>` `manifest`. Vincula favicon, estilo, manifest, precarga u otro recurso público. Atributos `rel`, `href`. Carga [site.webmanifest](../../../apps/prelaunch/public/favicon/site.webmanifest).
- [L11](../../../apps/prelaunch/index.html#L11) `<meta>` `viewport`. Metadatos consumidos por el navegador, también para vista previa o layout. Atributos `name`, `content`.
- [L12](../../../apps/prelaunch/index.html#L12) `<meta>` `theme-color`. Metadatos consumidos por el navegador, también para vista previa o layout. Atributos `name`, `content`.
- [L13](../../../apps/prelaunch/index.html#L13) `<title>`. Título visible del documento en la pestaña o vista previa.
- [L15](../../../apps/prelaunch/index.html#L15) `<body>`. Cuerpo que el navegador presenta al cargar la aplicación.
- [L16](../../../apps/prelaunch/index.html#L16) `<div>` `root`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `id`.
- [L17](../../../apps/prelaunch/index.html#L17) `<script>`. Carga el módulo o la configuración que inicia la aplicación. Atributos `src`. Carga [app-config.js](../../../apps/prelaunch/public/app-config.js).
- [L18](../../../apps/prelaunch/index.html#L18) `<script>` `module`. Carga el módulo o la configuración que inicia la aplicación. Atributos `type`, `src`. Carga [main.jsx](../../../apps/prelaunch/src/main.jsx).

## apps/prelaunch/package.json

[Abrir fuente](../../../apps/prelaunch/package.json) · 18 líneas de texto.

Identifica el workspace y sus scripts Vite. Declara paquetes compartidos para el cliente, observabilidad y textos legales.

- [name](../../../apps/prelaunch/package.json#L2). Nombre registrado por npm o por el runtime de la aplicación.
- [private](../../../apps/prelaunch/package.json#L3). Evita que el workspace se publique accidentalmente como paquete.
- [version](../../../apps/prelaunch/package.json#L4). Versión declarada para las herramientas de gestión de paquetes.
- [type](../../../apps/prelaunch/package.json#L5). Selecciona las reglas de módulos al cargar JavaScript en Node.
- [scripts](../../../apps/prelaunch/package.json#L6). Define comandos invocables mediante npm run.
- [npm run dev](../../../apps/prelaunch/package.json#L7) ejecuta `vite`.
- [npm run build](../../../apps/prelaunch/package.json#L8) ejecuta `vite build`.
- [npm run preview](../../../apps/prelaunch/package.json#L9) ejecuta `vite preview`.
- [npm run lint](../../../apps/prelaunch/package.json#L10) ejecuta `eslint src`.
- [dependencies](../../../apps/prelaunch/package.json#L12). Lista las bibliotecas que el workspace consume para construir o ejecutar código. Incluye `@referidos/api-client`, `@referidos/observability`, `@referidos/legal-content`.

## apps/prelaunch/public/_headers

[Abrir fuente](../../../apps/prelaunch/public/_headers) · 12 líneas de texto.

Cabeceras base de la superficie estática. La versión efectiva del build se escribe desde vite.config.js.

- [L1](../../../apps/prelaunch/public/_headers#L1) Patrón de ruta `/*` que agrupa las cabeceras que siguen.
- [L2](../../../apps/prelaunch/public/_headers#L2) Cabecera `Cache-Control` aplicada al patrón de publicación.
- [L4](../../../apps/prelaunch/public/_headers#L4) Patrón de ruta `/app-config.js` que agrupa las cabeceras que siguen.
- [L5](../../../apps/prelaunch/public/_headers#L5) Cabecera `Cache-Control` aplicada al patrón de publicación.
- [L7](../../../apps/prelaunch/public/_headers#L7) Patrón de ruta `/assets/*` que agrupa las cabeceras que siguen.
- [L8](../../../apps/prelaunch/public/_headers#L8) Cabecera `Cache-Control` aplicada al patrón de publicación.
- [L10](../../../apps/prelaunch/public/_headers#L10) Patrón de ruta `/favicon/*` que agrupa las cabeceras que siguen.
- [L11](../../../apps/prelaunch/public/_headers#L11) Cabecera `Cache-Control` aplicada al patrón de publicación.

## apps/prelaunch/public/_redirects

[Abrir fuente](../../../apps/prelaunch/public/_redirects) · 2 líneas de texto.

Reescritura para que Netlify entregue la entrada React al abrir directamente una ruta interna.

- [L1](../../../apps/prelaunch/public/_redirects#L1) Regla de reescritura o redirección procesada por Netlify: `/* /index.html 200`.

## apps/prelaunch/public/favicon/site.webmanifest

[Abrir fuente](../../../apps/prelaunch/public/favicon/site.webmanifest) · 21 líneas de texto.

Metadatos de nombre e iconos de marca para navegadores. La existencia del manifest es independiente de que haya registro de service worker.

- [name](../../../apps/prelaunch/public/favicon/site.webmanifest#L2). Nombre registrado por npm o por el runtime de la aplicación.
- [short_name](../../../apps/prelaunch/public/favicon/site.webmanifest#L3). Clave de configuración del manifiesto.
- [icons](../../../apps/prelaunch/public/favicon/site.webmanifest#L4). Versiones de iconos que el navegador elige por tamaño, tipo o uso.
  - [L6](../../../apps/prelaunch/public/favicon/site.webmanifest#L6) Icono `/favicon/web-app-manifest-192x192.png` en [web-app-manifest-192x192.png](../../../apps/prelaunch/public/favicon/web-app-manifest-192x192.png).
  - [L12](../../../apps/prelaunch/public/favicon/site.webmanifest#L12) Icono `/favicon/web-app-manifest-512x512.png` en [web-app-manifest-512x512.png](../../../apps/prelaunch/public/favicon/web-app-manifest-512x512.png).
- [theme_color](../../../apps/prelaunch/public/favicon/site.webmanifest#L18). Color empleado por controles del navegador o sistema.
- [background_color](../../../apps/prelaunch/public/favicon/site.webmanifest#L19). Color de fondo antes de completar la carga.
- [display](../../../apps/prelaunch/public/favicon/site.webmanifest#L20). Modo de presentación al instalar la aplicación.

## apps/prelaunch/vite.config.js

[Abrir fuente](../../../apps/prelaunch/vite.config.js) · 80 líneas de texto.

Configura JSX y Tailwind, alias del monorepo, nombres de salida con hash, sourcemaps y generación de _headers. Aquí se cambia el comportamiento del build.

Dependencias importadas: `vite`, `@vitejs/plugin-react`, `@tailwindcss/vite`, `node:fs`, `node:path`, `node:url`.

### Funciones y callbacks

- [emitBuildHeaders](../../../apps/prelaunch/vite.config.js#L10) `()`. Devuelve el plugin Vite que escribe las reglas de cache de Netlify en la salida compilada de Prelaunch.
- [closeBundle](../../../apps/prelaunch/vite.config.js#L13) `()`. Hook de Vite que materializa un archivo de configuración de Netlify en el directorio de salida cuando Rollup termina. Usa `path.resolve`, `path.join`, `fs.writeFileSync`.
- [assetFileNames](../../../apps/prelaunch/vite.config.js#L57) `({ name })`. Selecciona patrón de salida para CSS y otros recursos de Rollup de Prelaunch. Usa `name.endsWith`.

### Bloques de configuración

- [name](../../../apps/prelaunch/vite.config.js#L12). Identificador consumido por el runner o el registro de paquetes.
- [envDir](../../../apps/prelaunch/vite.config.js#L35). Directorio donde Vite busca archivos de entorno para el workspace.
- [resolve](../../../apps/prelaunch/vite.config.js#L36). Reglas de resolución de imports del bundler.
- [alias](../../../apps/prelaunch/vite.config.js#L37). Tabla de nombres cortos para resolver imports a archivos o carpetas concretas.
- [plugins](../../../apps/prelaunch/vite.config.js#L48). Plugins que se cargan durante transformación, compilación o lint.
- [build](../../../apps/prelaunch/vite.config.js#L49). Opciones de empaquetado y los artefactos entregados al workflow.
- [sourcemap](../../../apps/prelaunch/vite.config.js#L50). Control de generación de mapas para vincular errores con el fuente.
- [manifest](../../../apps/prelaunch/vite.config.js#L51). Metadatos de aplicación instalable o inventario de salida, según el plugin que contiene esta llave.
- [rollupOptions](../../../apps/prelaunch/vite.config.js#L52). Opciones transmitidas a Rollup para organizar la salida o los inputs.
- [name](../../../apps/prelaunch/vite.config.js#L57). Identificador consumido por el runner o el registro de paquetes.
- [server](../../../apps/prelaunch/vite.config.js#L67). Opciones del servidor local de desarrollo.
- [allowedHosts](../../../apps/prelaunch/vite.config.js#L72). Hosts permitidos por el servidor de desarrollo.

En el nivel del módulo se invocan `fileURLToPath`, `defineConfig`, `react`, `tailwindcss`, `emitBuildHeaders`, `path.dirname`, `path.resolve`.


## apps/referidos-android/app.json

[Abrir fuente](../../../apps/referidos-android/app.json) · 5 líneas de texto.

Declara el nombre usado por `AppRegistry` y `MainActivity`, además del nombre visible del proyecto. Un cambio del nombre de registro requiere coordinación con Kotlin.

- [name](../../../apps/referidos-android/app.json#L2). Nombre registrado por npm o por el runtime de la aplicación.
- [displayName](../../../apps/referidos-android/app.json#L3). Etiqueta que puede mostrar el runtime o launcher.

## apps/referidos-android/babel.config.cjs

[Abrir fuente](../../../apps/referidos-android/babel.config.cjs) · 18 líneas de texto.

Aplica el preset React Native y resuelve aliases `@app`, `@navigation`, `@features` y `@shared` en tiempo de empaquetado. Mantén estos aliases alineados con TypeScript.

### Bloques de configuración

- [presets](../../../apps/referidos-android/babel.config.cjs#L2). Presets usados por Babel para transformar el JavaScript móvil.
- [plugins](../../../apps/referidos-android/babel.config.cjs#L3). Plugins que se cargan durante transformación, compilación o lint.
- [root](../../../apps/referidos-android/babel.config.cjs#L7). Raíz de archivos de la herramienta.
- [alias](../../../apps/referidos-android/babel.config.cjs#L8). Tabla de nombres cortos para resolver imports a archivos o carpetas concretas.


## apps/referidos-android/env.development.example.json

[Abrir fuente](../../../apps/referidos-android/env.development.example.json) · 7 líneas de texto.

Variante de referencia para el runtime de desarrollo. Copia sus campos al archivo local antes de trabajar con desarrollo.

- [SUPABASE_URL](../../../apps/referidos-android/env.development.example.json#L2). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [SUPABASE_ANON_KEY](../../../apps/referidos-android/env.development.example.json#L3). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [APP_VERSION](../../../apps/referidos-android/env.development.example.json#L4). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [AUTH_REDIRECT_URL](../../../apps/referidos-android/env.development.example.json#L5). Campo que debe resolver la configuración de entorno de Android o del pipeline.

## apps/referidos-android/env.example.json

[Abrir fuente](../../../apps/referidos-android/env.example.json) · 7 líneas de texto.

Plantilla general del archivo `env.json` local. Documenta las variables consumidas por `env.ts`, con valores de ejemplo.

- [SUPABASE_URL](../../../apps/referidos-android/env.example.json#L2). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [SUPABASE_ANON_KEY](../../../apps/referidos-android/env.example.json#L3). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [APP_VERSION](../../../apps/referidos-android/env.example.json#L4). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [AUTH_REDIRECT_URL](../../../apps/referidos-android/env.example.json#L5). Campo que debe resolver la configuración de entorno de Android o del pipeline.

## apps/referidos-android/env.production.example.json

[Abrir fuente](../../../apps/referidos-android/env.production.example.json) · 7 líneas de texto.

Variante de referencia para producción. Separa la configuración de lanzamiento de los entornos donde se desarrolla o valida.

- [SUPABASE_URL](../../../apps/referidos-android/env.production.example.json#L2). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [SUPABASE_ANON_KEY](../../../apps/referidos-android/env.production.example.json#L3). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [APP_VERSION](../../../apps/referidos-android/env.production.example.json#L4). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [AUTH_REDIRECT_URL](../../../apps/referidos-android/env.production.example.json#L5). Campo que debe resolver la configuración de entorno de Android o del pipeline.

## apps/referidos-android/env.staging.example.json

[Abrir fuente](../../../apps/referidos-android/env.staging.example.json) · 7 líneas de texto.

Variante de referencia para staging. Sirve para validar flujos contra ese runtime al configurar URL y clave publicable correspondientes.

- [SUPABASE_URL](../../../apps/referidos-android/env.staging.example.json#L2). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [SUPABASE_ANON_KEY](../../../apps/referidos-android/env.staging.example.json#L3). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [APP_VERSION](../../../apps/referidos-android/env.staging.example.json#L4). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [AUTH_REDIRECT_URL](../../../apps/referidos-android/env.staging.example.json#L5). Campo que debe resolver la configuración de entorno de Android o del pipeline.

## apps/referidos-android/index.js

[Abrir fuente](../../../apps/referidos-android/index.js) · 8 líneas de texto.

Entrada JavaScript del runtime React Native. Registra bajo el nombre de app.json el componente App que arranca la navegación móvil.

Dependencias importadas: `react-native-gesture-handler`, `./src/shared/polyfills/urlHermesPatch`, `react-native`, `./src/app/App`, `./app.json`.

Se inicia o consume desde [entryFile de Gradle](../../../apps/referidos-android/android/app/build.gradle#L40), [registro esperado por MainActivity](../../../apps/referidos-android/android/app/src/main/java/com/referidosandroid/MainActivity.kt#L14).

Módulos locales conectados: [urlHermesPatch.ts](../../../apps/referidos-android/src/shared/polyfills/urlHermesPatch.ts), [App.tsx](../../../apps/referidos-android/src/app/App.tsx), [app.json](../../../apps/referidos-android/app.json).

### Funciones y callbacks

- [callback de AppRegistry.registerComponent](../../../apps/referidos-android/index.js#L7) `()`. Devuelve el componente App al registrador de React Native para que Android pueda montarlo desde MainActivity. Consumidores: [entryFile de Gradle](../../../apps/referidos-android/android/app/build.gradle#L40), [registro esperado por MainActivity](../../../apps/referidos-android/android/app/src/main/java/com/referidosandroid/MainActivity.kt#L14).

En el nivel del módulo se invocan `AppRegistry.registerComponent`.


## apps/referidos-android/metro.config.cjs

[Abrir fuente](../../../apps/referidos-android/metro.config.cjs) · 89 líneas de texto.

Observa la raíz del workspace y busca dependencias tanto locales como compartidas. Fuerza una copia de React, React Native, navegación y módulos nativos críticos, bloqueando rutas duplicadas para evitar dos registros del mismo componente nativo.

Dependencias importadas: `node:path`, `@react-native/metro-config`, `node:fs`.

### Funciones y callbacks

- [resolvePreferredModulePath](../../../apps/referidos-android/metro.config.cjs#L9) `(moduleName)`. Resuelve una dependencia en los node_modules de la app o del workspace y devuelve los datos que usa Metro para elegir una sola copia. Usa `require.existsSync`, `require`, `path.resolve`.
- [escapeRegex](../../../apps/referidos-android/metro.config.cjs#L19) `(value)`. Escapa caracteres de una ruta para que el patrón de exclusión coincida con el texto literal. Usa `value.replace`. Consumidores: [L21](../../../apps/referidos-android/metro.config.cjs#L21) `pathRegex`.
- [pathRegex](../../../apps/referidos-android/metro.config.cjs#L21) `(absolutePath)`. Normaliza una ruta de disco a una expresión que funciona con separadores de Windows y del resto de plataformas. Usa `escapeRegex`, `absolutePath.replace`.

### Bloques de configuración

- [watchFolders](../../../apps/referidos-android/metro.config.cjs#L59). Directorios observados por Metro para ver workspaces enlazados.
- [resolver](../../../apps/referidos-android/metro.config.cjs#L60). Configuración de Metro para elegir rutas y módulos.
- [nodeModulesPaths](../../../apps/referidos-android/metro.config.cjs#L61). Raíces donde Metro busca dependencias.
- [extraNodeModules](../../../apps/referidos-android/metro.config.cjs#L67). Alias de resolución explícitos de paquetes de Metro.
- [blockList](../../../apps/referidos-android/metro.config.cjs#L84). Rutas que Metro excluye para evitar dependencias duplicadas.

En el nivel del módulo se invocan `require`, `resolvePreferredModulePath`, `pathRegex`, `mergeConfig`, `getDefaultConfig`, `path.resolve`, `duplicateBlockList.push`.


## apps/referidos-android/package.json

[Abrir fuente](../../../apps/referidos-android/package.json) · 49 líneas de texto.

Declara workspace, scripts `start`, `android`, lint y typecheck. Especifica React Native y las bibliotecas de navegación, cámara, geolocalización, mapas y estado junto a los paquetes reutilizados desde el monorepo.

- [name](../../../apps/referidos-android/package.json#L2). Nombre registrado por npm o por el runtime de la aplicación.
- [private](../../../apps/referidos-android/package.json#L3). Evita que el workspace se publique accidentalmente como paquete.
- [version](../../../apps/referidos-android/package.json#L4). Versión declarada para las herramientas de gestión de paquetes.
- [main](../../../apps/referidos-android/package.json#L5). Punto de entrada por defecto para el consumidor.
- [scripts](../../../apps/referidos-android/package.json#L6). Define comandos invocables mediante npm run.
- [npm run start](../../../apps/referidos-android/package.json#L7) ejecuta `react-native start`.
- [npm run android](../../../apps/referidos-android/package.json#L8) ejecuta `react-native run-android`.
- [npm run lint](../../../apps/referidos-android/package.json#L9) ejecuta `eslint .`.
- [npm run typecheck](../../../apps/referidos-android/package.json#L10) ejecuta `tsc --noEmit`.
- [dependencies](../../../apps/referidos-android/package.json#L12). Lista las bibliotecas que el workspace consume para construir o ejecutar código. Incluye `@react-native-async-storage/async-storage`, `@react-native-community/geolocation`, `@react-navigation/bottom-tabs`, `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/elements`, `@react-navigation/core`, `@react-navigation/routers`, `@referidos/api-client`, `@referidos/domain`, `@referidos/observability-sdk`, `@referidos/platform-rn`, `@referidos/security-core`, `@supabase/supabase-js`, `react`, `react-native`, `react-native-camera-kit`, `react-native-gesture-handler`, `react-native-maps`, `react-native-safe-area-context`, `react-native-screens`, `zustand`.
- [devDependencies](../../../apps/referidos-android/package.json#L36). Lista dependencias de desarrollo, tipos, lint o compilación. Incluye `@babel/core`, `@babel/preset-env`, `@babel/runtime`, `@react-native-community/cli`, `@react-native/babel-preset`, `@react-native/metro-config`, `@react-native/typescript-config`, `@types/react`, `babel-plugin-module-resolver`, `typescript`.

## apps/referidos-android/react-native.config.js

[Abrir fuente](../../../apps/referidos-android/react-native.config.js) · 8 líneas de texto.

Fija el package de Android para la CLI de React Native, que lo necesita al compilar e instalar el workspace dentro del monorepo.

### Bloques de configuración

- [android](../../../apps/referidos-android/react-native.config.js#L3). Sección consumida por la CLI para descubrir el proyecto Android.
- [packageName](../../../apps/referidos-android/react-native.config.js#L4). Nombre del paquete Android que necesita la CLI para instalar la app.


## apps/referidos-android/tsconfig.json

[Abrir fuente](../../../apps/referidos-android/tsconfig.json) · 30 líneas de texto.

Extiende la configuración TypeScript de React Native, incluye tipos necesarios y replica los aliases de Babel para que editor y compilación encuentren los mismos módulos.

- [extends](../../../apps/referidos-android/tsconfig.json#L2). Configuración de TypeScript que se toma como base.
- [compilerOptions](../../../apps/referidos-android/tsconfig.json#L3). Opciones que TypeScript aplica antes de revisar tipos y resolver archivos.
- [compilerOptions.baseUrl](../../../apps/referidos-android/tsconfig.json#L4). Afecta cómo TypeScript tipa o resuelve el código del workspace.
- [compilerOptions.types](../../../apps/referidos-android/tsconfig.json#L5). Afecta cómo TypeScript tipa o resuelve el código del workspace.
- [compilerOptions.paths](../../../apps/referidos-android/tsconfig.json#L10). Aliases del compilador que deben mantenerse alineados con Babel o Metro.
- [compilerOptions.paths.@app/*](../../../apps/referidos-android/tsconfig.json#L11). Afecta cómo TypeScript tipa o resuelve el código del workspace.
- [compilerOptions.paths.@navigation/*](../../../apps/referidos-android/tsconfig.json#L14). Afecta cómo TypeScript tipa o resuelve el código del workspace.
- [compilerOptions.paths.@features/*](../../../apps/referidos-android/tsconfig.json#L17). Afecta cómo TypeScript tipa o resuelve el código del workspace.
- [compilerOptions.paths.@shared/*](../../../apps/referidos-android/tsconfig.json#L20). Afecta cómo TypeScript tipa o resuelve el código del workspace.
- [include](../../../apps/referidos-android/tsconfig.json#L25). Archivos considerados por TypeScript.

## apps/referidos-app/index.html

[Abrir fuente](../../../apps/referidos-app/index.html) · 33 líneas de texto.

Configuración o artefacto de integración de apps/referidos-app.

- [L2](../../../apps/referidos-app/index.html#L2) `<html>`. Raíz y ajustes del documento servido al navegador. Atributos `lang`.
- [L3](../../../apps/referidos-app/index.html#L3) `<head>`. Sección de configuración anterior al montaje del frontend.
- [L4](../../../apps/referidos-app/index.html#L4) `<meta>`. Metadatos consumidos por el navegador, también para vista previa o layout. Atributos `charset`.
- [L7](../../../apps/referidos-app/index.html#L7) `<link>` `icon`. Vincula favicon, estilo, manifest, precarga u otro recurso público. Atributos `rel`, `type`, `href`.
- [L10](../../../apps/referidos-app/index.html#L10) `<meta>` `viewport`. Metadatos consumidos por el navegador, también para vista previa o layout. Atributos `name`, `content`.
- [L16](../../../apps/referidos-app/index.html#L16) `<meta>` `theme-color`. Metadatos consumidos por el navegador, también para vista previa o layout. Atributos `name`, `content`.
- [L19](../../../apps/referidos-app/index.html#L19) `<link>` `manifest`. Vincula favicon, estilo, manifest, precarga u otro recurso público. Atributos `rel`, `href`. Carga [manifest.webmanifest](../../../apps/referidos-app/public/manifest.webmanifest).
- [L21](../../../apps/referidos-app/index.html#L21) `<title>`. Título visible del documento en la pestaña o vista previa.
- [L24](../../../apps/referidos-app/index.html#L24) `<body>`. Cuerpo que el navegador presenta al cargar la aplicación.
- [L25](../../../apps/referidos-app/index.html#L25) `<div>` `root`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `id`.
- [L27](../../../apps/referidos-app/index.html#L27) `<script>`. Carga el módulo o la configuración que inicia la aplicación. Atributos `src`. Carga [app-config.js](../../../apps/referidos-app/public/app-config.js).
- [L30](../../../apps/referidos-app/index.html#L30) `<script>` `module`. Carga el módulo o la configuración que inicia la aplicación. Atributos `type`, `src`. Carga [main.jsx](../../../apps/referidos-app/src/main.jsx).

## apps/referidos-app/package.json

[Abrir fuente](../../../apps/referidos-app/package.json) · 19 líneas de texto.

Manifiesto del workspace que define sus scripts, dependencias y puntos de importación.

- [name](../../../apps/referidos-app/package.json#L2). Nombre registrado por npm o por el runtime de la aplicación.
- [private](../../../apps/referidos-app/package.json#L3). Evita que el workspace se publique accidentalmente como paquete.
- [version](../../../apps/referidos-app/package.json#L4). Versión declarada para las herramientas de gestión de paquetes.
- [type](../../../apps/referidos-app/package.json#L5). Selecciona las reglas de módulos al cargar JavaScript en Node.
- [scripts](../../../apps/referidos-app/package.json#L6). Define comandos invocables mediante npm run.
- [npm run dev](../../../apps/referidos-app/package.json#L7) ejecuta `vite`.
- [npm run build](../../../apps/referidos-app/package.json#L8) ejecuta `vite build`.
- [npm run preview](../../../apps/referidos-app/package.json#L9) ejecuta `vite preview`.
- [npm run lint](../../../apps/referidos-app/package.json#L10) ejecuta `eslint src`.
- [dependencies](../../../apps/referidos-app/package.json#L12). Lista las bibliotecas que el workspace consume para construir o ejecutar código. Incluye `@referidos/observability`, `@referidos/legal-content`, `@referidos/notifications-sdk`, `@referidos/support-sdk`.

## apps/referidos-app/public/manifest.json

[Abrir fuente](../../../apps/referidos-app/public/manifest.json) · 24 líneas de texto.

Configuración o artefacto de integración de apps/referidos-app/public.

- [name](../../../apps/referidos-app/public/manifest.json#L2). Nombre registrado por npm o por el runtime de la aplicación.
- [short_name](../../../apps/referidos-app/public/manifest.json#L3). Clave de configuración del manifiesto.
- [description](../../../apps/referidos-app/public/manifest.json#L4). Clave de configuración del manifiesto.
- [start_url](../../../apps/referidos-app/public/manifest.json#L5). Ruta inicial usada desde una instalación web.
- [scope](../../../apps/referidos-app/public/manifest.json#L6). Área de navegación asignada a la web instalada.
- [display](../../../apps/referidos-app/public/manifest.json#L7). Modo de presentación al instalar la aplicación.
- [orientation](../../../apps/referidos-app/public/manifest.json#L8). Clave de configuración del manifiesto.
- [background_color](../../../apps/referidos-app/public/manifest.json#L9). Color de fondo antes de completar la carga.
- [theme_color](../../../apps/referidos-app/public/manifest.json#L10). Color empleado por controles del navegador o sistema.
- [icons](../../../apps/referidos-app/public/manifest.json#L11). Versiones de iconos que el navegador elige por tamaño, tipo o uso.
  - [L13](../../../apps/referidos-app/public/manifest.json#L13) Icono `/icons/icon-192.png` en [icon-192.png](../../../apps/referidos-app/public/icons/icon-192.png).
  - [L18](../../../apps/referidos-app/public/manifest.json#L18) Icono `/icons/icon-512.png` en [icon-512.png](../../../apps/referidos-app/public/icons/icon-512.png).

## apps/referidos-app/public/manifest.webmanifest

[Abrir fuente](../../../apps/referidos-app/public/manifest.webmanifest) · 42 líneas de texto.

Configuración o artefacto de integración de apps/referidos-app/public.

- [name](../../../apps/referidos-app/public/manifest.webmanifest#L2). Nombre registrado por npm o por el runtime de la aplicación.
- [short_name](../../../apps/referidos-app/public/manifest.webmanifest#L3). Clave de configuración del manifiesto.
- [description](../../../apps/referidos-app/public/manifest.webmanifest#L4). Clave de configuración del manifiesto.
- [id](../../../apps/referidos-app/public/manifest.webmanifest#L5). Clave de configuración del manifiesto.
- [start_url](../../../apps/referidos-app/public/manifest.webmanifest#L6). Ruta inicial usada desde una instalación web.
- [scope](../../../apps/referidos-app/public/manifest.webmanifest#L7). Área de navegación asignada a la web instalada.
- [display](../../../apps/referidos-app/public/manifest.webmanifest#L8). Modo de presentación al instalar la aplicación.
- [background_color](../../../apps/referidos-app/public/manifest.webmanifest#L9). Color de fondo antes de completar la carga.
- [theme_color](../../../apps/referidos-app/public/manifest.webmanifest#L10). Color empleado por controles del navegador o sistema.
- [orientation](../../../apps/referidos-app/public/manifest.webmanifest#L11). Clave de configuración del manifiesto.
- [lang](../../../apps/referidos-app/public/manifest.webmanifest#L12). Clave de configuración del manifiesto.
- [dir](../../../apps/referidos-app/public/manifest.webmanifest#L13). Clave de configuración del manifiesto.
- [icons](../../../apps/referidos-app/public/manifest.webmanifest#L14). Versiones de iconos que el navegador elige por tamaño, tipo o uso.
  - [L16](../../../apps/referidos-app/public/manifest.webmanifest#L16) Icono `/icons/icon-192.png` en [icon-192.png](../../../apps/referidos-app/public/icons/icon-192.png).
  - [L22](../../../apps/referidos-app/public/manifest.webmanifest#L22) Icono `/icons/icon-512.png` en [icon-512.png](../../../apps/referidos-app/public/icons/icon-512.png).
- [screenshots](../../../apps/referidos-app/public/manifest.webmanifest#L28). Clave de configuración del manifiesto.

## apps/referidos-app/public/robots.txt

[Abrir fuente](../../../apps/referidos-app/public/robots.txt) · 5 líneas de texto.

Configuración o artefacto de integración de apps/referidos-app/public.

- [L1](../../../apps/referidos-app/public/robots.txt#L1) Directiva `User-agent` para rastreadores de búsqueda.
- [L2](../../../apps/referidos-app/public/robots.txt#L2) Directiva `Allow` para rastreadores de búsqueda.
- [L4](../../../apps/referidos-app/public/robots.txt#L4) Directiva `Sitemap` para rastreadores de búsqueda.

## apps/referidos-app/public/sitemap.xml

[Abrir fuente](../../../apps/referidos-app/public/sitemap.xml) · 19 líneas de texto.

Configuración o artefacto de integración de apps/referidos-app/public.

- [L2](../../../apps/referidos-app/public/sitemap.xml#L2) `<urlset>`. Raíz del sitemap que los rastreadores consultan.
- [L3](../../../apps/referidos-app/public/sitemap.xml#L3) `<url>`. URL pública que se comunica a los rastreadores.
- [L4](../../../apps/referidos-app/public/sitemap.xml#L4) `<loc>`. Ubicación canónica publicada en el sitemap.
- [L6](../../../apps/referidos-app/public/sitemap.xml#L6) `<url>`. URL pública que se comunica a los rastreadores.
- [L7](../../../apps/referidos-app/public/sitemap.xml#L7) `<loc>`. Ubicación canónica publicada en el sitemap.
- [L9](../../../apps/referidos-app/public/sitemap.xml#L9) `<url>`. URL pública que se comunica a los rastreadores.
- [L10](../../../apps/referidos-app/public/sitemap.xml#L10) `<loc>`. Ubicación canónica publicada en el sitemap.
- [L12](../../../apps/referidos-app/public/sitemap.xml#L12) `<url>`. URL pública que se comunica a los rastreadores.
- [L13](../../../apps/referidos-app/public/sitemap.xml#L13) `<loc>`. Ubicación canónica publicada en el sitemap.
- [L15](../../../apps/referidos-app/public/sitemap.xml#L15) `<url>`. URL pública que se comunica a los rastreadores.
- [L16](../../../apps/referidos-app/public/sitemap.xml#L16) `<loc>`. Ubicación canónica publicada en el sitemap.

## apps/referidos-app/public/zohoverify/verifyforzoho.html

[Abrir fuente](../../../apps/referidos-app/public/zohoverify/verifyforzoho.html) · 1 líneas de texto.

Archivo de verificación de dominio que atiende una solicitud de Zoho desde una ruta estática. El valor de verificación queda en el archivo original.

El contenido de verificación se sirve como archivo estático. El proveedor lo busca en esa ruta para comprobar control del dominio.

## apps/referidos-app/vite.config.js

[Abrir fuente](../../../apps/referidos-app/vite.config.js) · 84 líneas de texto.

Configuración o artefacto de integración de apps/referidos-app.

Dependencias importadas: `vite`, `@vitejs/plugin-react`, `@tailwindcss/vite`, `vite-plugin-pwa`, `node:path`, `node:url`.

### Funciones y callbacks

- [callback de defineConfig](../../../apps/referidos-app/vite.config.js#L10) `({ mode })`. Construye la configuración del bundler desde sus entradas de compilación. Este callback recibe información como modo dev, remote o build. Usa `react`, `tailwindcss`, `VitePWA`, `path.resolve`.

### Bloques de configuración

- [envDir](../../../apps/referidos-app/vite.config.js#L14). Directorio donde Vite busca archivos de entorno para el workspace.
- [resolve](../../../apps/referidos-app/vite.config.js#L15). Reglas de resolución de imports del bundler.
- [alias](../../../apps/referidos-app/vite.config.js#L16). Tabla de nombres cortos para resolver imports a archivos o carpetas concretas.
- [plugins](../../../apps/referidos-app/vite.config.js#L28). Plugins que se cargan durante transformación, compilación o lint.
- [registerType](../../../apps/referidos-app/vite.config.js#L32). Modo en que la integración PWA registra o actualiza el service worker.
- [manifest](../../../apps/referidos-app/vite.config.js#L34). Metadatos de aplicación instalable o inventario de salida, según el plugin que contiene esta llave.
- [name](../../../apps/referidos-app/vite.config.js#L35). Identificador consumido por el runner o el registro de paquetes.
- [build](../../../apps/referidos-app/vite.config.js#L59). Opciones de empaquetado y los artefactos entregados al workflow.
- [sourcemap](../../../apps/referidos-app/vite.config.js#L60). Control de generación de mapas para vincular errores con el fuente.
- [rollupOptions](../../../apps/referidos-app/vite.config.js#L61). Opciones transmitidas a Rollup para organizar la salida o los inputs.
- [server](../../../apps/referidos-app/vite.config.js#L67). Opciones del servidor local de desarrollo.
- [allowedHosts](../../../apps/referidos-app/vite.config.js#L75). Hosts permitidos por el servidor de desarrollo.

En el nivel del módulo se invocan `fileURLToPath`, `defineConfig`, `path.dirname`.


## apps/referidos-pwa/index.html

[Abrir fuente](../../../apps/referidos-pwa/index.html) · 19 líneas de texto.

Carcasa HTML de la maqueta y punto de entrada a React.

- [L2](../../../apps/referidos-pwa/index.html#L2) `<html>`. Raíz y ajustes del documento servido al navegador. Atributos `lang`.
- [L3](../../../apps/referidos-pwa/index.html#L3) `<head>`. Sección de configuración anterior al montaje del frontend.
- [L4](../../../apps/referidos-pwa/index.html#L4) `<meta>`. Metadatos consumidos por el navegador, también para vista previa o layout. Atributos `charset`.
- [L5](../../../apps/referidos-pwa/index.html#L5) `<meta>` `viewport`. Metadatos consumidos por el navegador, también para vista previa o layout. Atributos `name`, `content`.
- [L9](../../../apps/referidos-pwa/index.html#L9) `<meta>` `theme-color`. Metadatos consumidos por el navegador, también para vista previa o layout. Atributos `name`, `content`.
- [L10](../../../apps/referidos-pwa/index.html#L10) `<link>` `manifest`. Vincula favicon, estilo, manifest, precarga u otro recurso público. Atributos `rel`, `href`.
- [L11](../../../apps/referidos-pwa/index.html#L11) `<title>`. Título visible del documento en la pestaña o vista previa.
- [L13](../../../apps/referidos-pwa/index.html#L13) `<body>`. Cuerpo que el navegador presenta al cargar la aplicación.
- [L14](../../../apps/referidos-pwa/index.html#L14) `<div>` `root`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `id`.
- [L15](../../../apps/referidos-pwa/index.html#L15) `<script>`. Carga el módulo o la configuración que inicia la aplicación. Atributos `src`. Carga [app-config.js](../../../apps/referidos-pwa/public/app-config.js).
- [L16](../../../apps/referidos-pwa/index.html#L16) `<script>` `module`. Carga el módulo o la configuración que inicia la aplicación. Atributos `type`, `src`. Carga [main.jsx](../../../apps/referidos-pwa/src/main.jsx).

## apps/referidos-pwa/package.json

[Abrir fuente](../../../apps/referidos-pwa/package.json) · 13 líneas de texto.

Declara el workspace de prototipos y ofrece dev, build, preview y lint.

- [name](../../../apps/referidos-pwa/package.json#L2). Nombre registrado por npm o por el runtime de la aplicación.
- [private](../../../apps/referidos-pwa/package.json#L3). Evita que el workspace se publique accidentalmente como paquete.
- [version](../../../apps/referidos-pwa/package.json#L4). Versión declarada para las herramientas de gestión de paquetes.
- [type](../../../apps/referidos-pwa/package.json#L5). Selecciona las reglas de módulos al cargar JavaScript en Node.
- [scripts](../../../apps/referidos-pwa/package.json#L6). Define comandos invocables mediante npm run.
- [npm run dev](../../../apps/referidos-pwa/package.json#L7) ejecuta `vite`.
- [npm run build](../../../apps/referidos-pwa/package.json#L8) ejecuta `vite build`.
- [npm run preview](../../../apps/referidos-pwa/package.json#L9) ejecuta `vite preview`.
- [npm run lint](../../../apps/referidos-pwa/package.json#L10) ejecuta `eslint src`.

## apps/referidos-pwa/vite.config.js

[Abrir fuente](../../../apps/referidos-pwa/vite.config.js) · 56 líneas de texto.

Configura Vite, alias de recursos, Tailwind y PWA del laboratorio.

Dependencias importadas: `vite`, `@vitejs/plugin-react`, `@tailwindcss/vite`, `vite-plugin-pwa`, `node:path`, `node:url`.

### Funciones y callbacks

- [callback de defineConfig](../../../apps/referidos-pwa/vite.config.js#L10) `({ mode })`. Construye la configuración del bundler desde sus entradas de compilación. Este callback recibe información como modo dev, remote o build. Usa `react`, `tailwindcss`, `VitePWA`, `path.resolve`.

### Bloques de configuración

- [envDir](../../../apps/referidos-pwa/vite.config.js#L14). Directorio donde Vite busca archivos de entorno para el workspace.
- [plugins](../../../apps/referidos-pwa/vite.config.js#L15). Plugins que se cargan durante transformación, compilación o lint.
- [registerType](../../../apps/referidos-pwa/vite.config.js#L19). Modo en que la integración PWA registra o actualiza el service worker.
- [manifest](../../../apps/referidos-pwa/vite.config.js#L20). Metadatos de aplicación instalable o inventario de salida, según el plugin que contiene esta llave.
- [name](../../../apps/referidos-pwa/vite.config.js#L21). Identificador consumido por el runner o el registro de paquetes.
- [build](../../../apps/referidos-pwa/vite.config.js#L33). Opciones de empaquetado y los artefactos entregados al workflow.
- [sourcemap](../../../apps/referidos-pwa/vite.config.js#L34). Control de generación de mapas para vincular errores con el fuente.
- [rollupOptions](../../../apps/referidos-pwa/vite.config.js#L35). Opciones transmitidas a Rollup para organizar la salida o los inputs.
- [server](../../../apps/referidos-pwa/vite.config.js#L41). Opciones del servidor local de desarrollo.
- [allowedHosts](../../../apps/referidos-pwa/vite.config.js#L47). Hosts permitidos por el servidor de desarrollo.

En el nivel del módulo se invocan `fileURLToPath`, `defineConfig`, `path.dirname`.


## assets/.netlify-assets-publish-legacy/index.html

[Abrir fuente](../../../assets/.netlify-assets-publish-legacy/index.html) · 230 líneas de texto.

Página de entrada histórica del sitio de publicación auxiliar de assets.

- [L2](../../../assets/.netlify-assets-publish-legacy/index.html#L2) `<html>`. Raíz y ajustes del documento servido al navegador. Atributos `lang`.
- [L3](../../../assets/.netlify-assets-publish-legacy/index.html#L3) `<head>`. Sección de configuración anterior al montaje del frontend.
- [L4](../../../assets/.netlify-assets-publish-legacy/index.html#L4) `<meta>`. Metadatos consumidos por el navegador, también para vista previa o layout. Atributos `charset`.
- [L5](../../../assets/.netlify-assets-publish-legacy/index.html#L5) `<meta>` `viewport`. Metadatos consumidos por el navegador, también para vista previa o layout. Atributos `name`, `content`.
- [L6](../../../assets/.netlify-assets-publish-legacy/index.html#L6) `<title>`. Título visible del documento en la pestaña o vista previa.
- [L75](../../../assets/.netlify-assets-publish-legacy/index.html#L75) `<body>`. Cuerpo que el navegador presenta al cargar la aplicación.
- [L81](../../../assets/.netlify-assets-publish-legacy/index.html#L81) `<div>`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `class`.
- [L84](../../../assets/.netlify-assets-publish-legacy/index.html#L84) `<div>`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `class`.
- [L90](../../../assets/.netlify-assets-publish-legacy/index.html#L90) `<div>`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `class`.
- [L99](../../../assets/.netlify-assets-publish-legacy/index.html#L99) `<div>`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `class`.
- [L102](../../../assets/.netlify-assets-publish-legacy/index.html#L102) `<div>`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `class`.
- [L108](../../../assets/.netlify-assets-publish-legacy/index.html#L108) `<div>`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `class`.
- [L114](../../../assets/.netlify-assets-publish-legacy/index.html#L114) `<div>`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `class`.
- [L120](../../../assets/.netlify-assets-publish-legacy/index.html#L120) `<div>`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `class`.
- [L126](../../../assets/.netlify-assets-publish-legacy/index.html#L126) `<div>`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `class`.
- [L132](../../../assets/.netlify-assets-publish-legacy/index.html#L132) `<div>`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `class`.
- [L138](../../../assets/.netlify-assets-publish-legacy/index.html#L138) `<div>`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `class`.
- [L144](../../../assets/.netlify-assets-publish-legacy/index.html#L144) `<div>`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `class`.
- [L150](../../../assets/.netlify-assets-publish-legacy/index.html#L150) `<div>`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `class`.
- [L159](../../../assets/.netlify-assets-publish-legacy/index.html#L159) `<div>`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `class`.
- [L162](../../../assets/.netlify-assets-publish-legacy/index.html#L162) `<div>`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `class`.
- [L168](../../../assets/.netlify-assets-publish-legacy/index.html#L168) `<div>`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `class`.
- [L174](../../../assets/.netlify-assets-publish-legacy/index.html#L174) `<div>`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `class`.
- [L180](../../../assets/.netlify-assets-publish-legacy/index.html#L180) `<div>`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `class`.
- [L186](../../../assets/.netlify-assets-publish-legacy/index.html#L186) `<div>`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `class`.
- [L192](../../../assets/.netlify-assets-publish-legacy/index.html#L192) `<div>`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `class`.
- [L198](../../../assets/.netlify-assets-publish-legacy/index.html#L198) `<div>`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `class`.
- [L204](../../../assets/.netlify-assets-publish-legacy/index.html#L204) `<div>`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `class`.
- [L210](../../../assets/.netlify-assets-publish-legacy/index.html#L210) `<div>`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `class`.
- [L216](../../../assets/.netlify-assets-publish-legacy/index.html#L216) `<div>`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `class`.
- [L222](../../../assets/.netlify-assets-publish-legacy/index.html#L222) `<div>`. Contenedor de interfaz o raíz del montaje cuando tiene ID. Atributos `class`.

## eslint.config.js

[Abrir fuente](../../../eslint.config.js) · 65 líneas de texto.

Configura reglas y entornos para JS/JSX, hooks React, Vite y tooling Node. Define también artefactos excluidos del lint.

Dependencias importadas: `@eslint/js`, `globals`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `eslint/config`.

### Bloques de configuración

- [files](../../../eslint.config.js#L19). Patrones de archivos a los que aplica este bloque.
- [extends](../../../eslint.config.js#L20). Configuración compartida que aplica al grupo de ESLint.
- [languageOptions](../../../eslint.config.js#L25). Parser, ECMAScript y variables globales que ESLint debe conocer.
- [globals](../../../eslint.config.js#L27). Variables que ESLint reconoce en el contexto de ejecución.
- [rules](../../../eslint.config.js#L34). Reglas activas para el conjunto de archivos de ESLint.
- [files](../../../eslint.config.js#L39). Patrones de archivos a los que aplica este bloque.
- [languageOptions](../../../eslint.config.js#L47). Parser, ECMAScript y variables globales que ESLint debe conocer.
- [globals](../../../eslint.config.js#L48). Variables que ESLint reconoce en el contexto de ejecución.
- [files](../../../eslint.config.js#L53). Patrones de archivos a los que aplica este bloque.
- [languageOptions](../../../eslint.config.js#L59). Parser, ECMAScript y variables globales que ESLint debe conocer.
- [globals](../../../eslint.config.js#L60). Variables que ESLint reconoce en el contexto de ejecución.

En el nivel del módulo se invocan `defineConfig`, `globalIgnores`.


## package.json

[Abrir fuente](../../../package.json) · 85 líneas de texto.

Declara workspaces, scripts de cada app, tooling y dependencias comunes. Es el punto para saber qué comando está respaldado por el repo.

- [name](../../../package.json#L2). Nombre registrado por npm o por el runtime de la aplicación.
- [private](../../../package.json#L3). Evita que el workspace se publique accidentalmente como paquete.
- [version](../../../package.json#L4). Versión declarada para las herramientas de gestión de paquetes.
- [type](../../../package.json#L5). Selecciona las reglas de módulos al cargar JavaScript en Node.
- [workspaces](../../../package.json#L6). Enumera los directorios que npm enlaza dentro del monorepo.
- [scripts](../../../package.json#L10). Define comandos invocables mediante npm run.
- [npm run dev:app](../../../package.json#L11) ejecuta `npm run dev -w apps/referidos-app -- --host --mode remote`.
- [npm run dev:pwa](../../../package.json#L12) ejecuta `npm run dev -w apps/referidos-pwa -- --host --mode remote`.
- [npm run dev:prelaunch](../../../package.json#L13) ejecuta `npm run dev -w apps/prelaunch -- --host --mode remote`.
- [npm run android:guardrail](../../../package.json#L14) ejecuta `node tooling/guardrails/verify-android-scope.mjs`. Entrada: [verify-android-scope.mjs](../../../tooling/guardrails/verify-android-scope.mjs).
- [npm run android:guardrail:print](../../../package.json#L15) ejecuta `node tooling/guardrails/verify-android-scope.mjs --print`. Entrada: [verify-android-scope.mjs](../../../tooling/guardrails/verify-android-scope.mjs).
- [npm run android:phase1:health](../../../package.json#L16) ejecuta `node tooling/android/phase1-runtime-health.mjs`. Entrada: [phase1-runtime-health.mjs](../../../tooling/android/phase1-runtime-health.mjs).
- [npm run android:phase2:auth-check](../../../package.json#L17) ejecuta `node tooling/android/phase2-auth-parity-check.mjs`. Entrada: [phase2-auth-parity-check.mjs](../../../tooling/android/phase2-auth-parity-check.mjs).
- [npm run android:phase3:shell-check](../../../package.json#L18) ejecuta `node tooling/android/phase3-shell-check.mjs`. Entrada: [phase3-shell-check.mjs](../../../tooling/android/phase3-shell-check.mjs).
- [npm run android:phase4:cliente-check](../../../package.json#L19) ejecuta `node tooling/android/phase4-cliente-check.mjs`. Entrada: [phase4-cliente-check.mjs](../../../tooling/android/phase4-cliente-check.mjs).
- [npm run android:phase5:negocio-check](../../../package.json#L20) ejecuta `node tooling/android/phase5-negocio-check.mjs`. Entrada: [phase5-negocio-check.mjs](../../../tooling/android/phase5-negocio-check.mjs).
- [npm run android:phase6:native-check](../../../package.json#L21) ejecuta `node tooling/android/phase6-native-check.mjs`. Entrada: [phase6-native-check.mjs](../../../tooling/android/phase6-native-check.mjs).
- [npm run android:phase7:observability-check](../../../package.json#L22) ejecuta `node tooling/android/phase7-observability-check.mjs`. Entrada: [phase7-observability-check.mjs](../../../tooling/android/phase7-observability-check.mjs).
- [npm run android:phase8:support-admin-check](../../../package.json#L23) ejecuta `node tooling/android/phase8-support-admin-check.mjs`. Entrada: [phase8-support-admin-check.mjs](../../../tooling/android/phase8-support-admin-check.mjs).
- [npm run android:phase9:parity-check](../../../package.json#L24) ejecuta `node tooling/android/phase9-parity-check.mjs`. Entrada: [phase9-parity-check.mjs](../../../tooling/android/phase9-parity-check.mjs).
- [npm run android:phase9:release-check](../../../package.json#L25) ejecuta `node tooling/android/phase9-release-check.mjs`. Entrada: [phase9-release-check.mjs](../../../tooling/android/phase9-release-check.mjs).
- [npm run android:phase9:full-check](../../../package.json#L26) ejecuta `npm run android:phase9:parity-check && npm run android:phase9:release-check`.
- [npm run android:metro](../../../package.json#L27) ejecuta `node tooling/android/start-android-metro.mjs`. Entrada: [start-android-metro.mjs](../../../tooling/android/start-android-metro.mjs).
- [npm run android:run](../../../package.json#L28) ejecuta `npm run android -w @apps/referidos-android -- --port 8081 --no-packager`.
- [npm run android:gradle:tasks](../../../package.json#L29) ejecuta `cmd.exe /c scripts\run_android_gradle_tasks.cmd`. Entrada: [run_android_gradle_tasks.cmd](../../../scripts/run_android_gradle_tasks.cmd).
- [npm run android:assemble:debug](../../../package.json#L30) ejecuta `cmd.exe /c scripts\run_android_assemble_debug.cmd 600`. Entrada: [run_android_assemble_debug.cmd](../../../scripts/run_android_assemble_debug.cmd).
- [npm run android:assemble:release](../../../package.json#L31) ejecuta `cmd.exe /c scripts\run_android_assemble_release.cmd 900`. Entrada: [run_android_assemble_release.cmd](../../../scripts/run_android_assemble_release.cmd).
- [npm run versioning:detect](../../../package.json#L32) ejecuta `node tooling/versioning/detect-changes.mjs`. Entrada: [detect-changes.mjs](../../../tooling/versioning/detect-changes.mjs).
- [npm run versioning:apply](../../../package.json#L33) ejecuta `node tooling/versioning/apply-changeset.mjs`. Entrada: [apply-changeset.mjs](../../../tooling/versioning/apply-changeset.mjs).
- [npm run versioning:bootstrap](../../../package.json#L34) ejecuta `node tooling/versioning/bootstrap-baseline.mjs`. Entrada: [bootstrap-baseline.mjs](../../../tooling/versioning/bootstrap-baseline.mjs).
- [npm run versioning:promote](../../../package.json#L35) ejecuta `node tooling/versioning/promote-release.mjs`. Entrada: [promote-release.mjs](../../../tooling/versioning/promote-release.mjs).
- [npm run versioning:record-deploy](../../../package.json#L36) ejecuta `node tooling/versioning/record-deployment.mjs`. Entrada: [record-deployment.mjs](../../../tooling/versioning/record-deployment.mjs).
- [npm run versioning:archive-local](../../../package.json#L37) ejecuta `node tooling/versioning/archive-local-artifact.mjs`. Entrada: [archive-local-artifact.mjs](../../../tooling/versioning/archive-local-artifact.mjs).
- [npm run build:app](../../../package.json#L38) ejecuta `npm run build -w apps/referidos-app`.
- [npm run build:pwa](../../../package.json#L39) ejecuta `npm run build -w apps/referidos-pwa`.
- [npm run build:prelaunch](../../../package.json#L40) ejecuta `npm run build -w apps/prelaunch`.
- [npm run fonts:subset:prelaunch](../../../package.json#L41) ejecuta `node tooling/fonts/subset-prelaunch-fonts.mjs`. Entrada: [subset-prelaunch-fonts.mjs](../../../tooling/fonts/subset-prelaunch-fonts.mjs).
- [npm run build:app:release](../../../package.json#L42) ejecuta `npm run build:app && node tooling/observability/upload-sourcemaps.mjs --app referidos-app`. Entrada: [upload-sourcemaps.mjs](../../../tooling/observability/upload-sourcemaps.mjs).
- [npm run build:prelaunch:release](../../../package.json#L43) ejecuta `npm run build:prelaunch && node tooling/observability/upload-sourcemaps.mjs --app prelaunch`. Entrada: [upload-sourcemaps.mjs](../../../tooling/observability/upload-sourcemaps.mjs).
- [npm run preview:app](../../../package.json#L44) ejecuta `npm run preview -w apps/referidos-app`.
- [npm run preview:pwa](../../../package.json#L45) ejecuta `npm run preview -w apps/referidos-pwa`.
- [npm run preview:prelaunch](../../../package.json#L46) ejecuta `npm run preview -w apps/prelaunch`.
- [npm run lint:mojibake](../../../package.json#L47) ejecuta `node tooling/guardrails/check-mojibake.mjs`. Entrada: [check-mojibake.mjs](../../../tooling/guardrails/check-mojibake.mjs).
- [npm run lint](../../../package.json#L48) ejecuta `npm run lint:mojibake && npm run lint --workspaces --if-present`.
- [npm run test](../../../package.json#L49) ejecuta `npm run test --workspaces --if-present`.
- [dependencies](../../../package.json#L51). Lista las bibliotecas que el workspace consume para construir o ejecutar código. Incluye `@supabase/supabase-js`, `deno`, `dotenv`, `framer-motion`, `leaflet`, `lucide-react`, `pupeteer`, `puppeteer`, `react`, `react-dom`, `react-qr-code`, `react-router-dom`, `uuid`, `vite-plugin-pwa`, `zustand`.
- [devDependencies](../../../package.json#L68). Lista dependencias de desarrollo, tipos, lint o compilación. Incluye `@eslint/js`, `@tailwindcss/vite`, `@types/react`, `@types/react-dom`, `@vitejs/plugin-react`, `eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals`, `subset-font`, `supabase`, `tailwindcss`, `vite`, `vite-plugin-pwa`.

## packages/api-client/package.json

[Abrir fuente](../../../packages/api-client/package.json) · 21 líneas de texto.

Manifiesto con los subpaths móviles y públicos, además de los aliases de compatibilidad. Declara Supabase y dominio.

- [name](../../../packages/api-client/package.json#L2). Nombre registrado por npm o por el runtime de la aplicación.
- [private](../../../packages/api-client/package.json#L3). Evita que el workspace se publique accidentalmente como paquete.
- [version](../../../packages/api-client/package.json#L4). Versión declarada para las herramientas de gestión de paquetes.
- [type](../../../packages/api-client/package.json#L5). Selecciona las reglas de módulos al cargar JavaScript en Node.
- [exports](../../../packages/api-client/package.json#L6). Define puntos de importación públicos que pueden resolver otros workspaces.
- [exports..](../../../packages/api-client/package.json#L7). Publica el subpath que resuelve a [index.js](../../../packages/api-client/src/index.js).
- [exports../clients/createSupabaseClient](../../../packages/api-client/package.json#L8). Publica el subpath que resuelve a [createSupabaseMobileClient.js](../../../packages/api-client/src/clients/createSupabaseMobileClient.js).
- [exports../clients/createSupabaseMobileClient](../../../packages/api-client/package.json#L9). Publica el subpath que resuelve a [createSupabaseMobileClient.js](../../../packages/api-client/src/clients/createSupabaseMobileClient.js).
- [exports../createApiClient](../../../packages/api-client/package.json#L10). Publica el subpath que resuelve a [createMobileApi.js](../../../packages/api-client/src/createMobileApi.js).
- [exports../createMobileApi](../../../packages/api-client/package.json#L11). Publica el subpath que resuelve a [createMobileApi.js](../../../packages/api-client/src/createMobileApi.js).
- [exports../prelaunch](../../../packages/api-client/package.json#L12). Publica el subpath que resuelve a [index.js](../../../packages/api-client/src/prelaunch/index.js).
- [exports../prelaunch/anonIdentity](../../../packages/api-client/package.json#L13). Publica el subpath que resuelve a [anonIdentity.js](../../../packages/api-client/src/prelaunch/anonIdentity.js).
- [exports../prelaunch/createPrelaunchClient](../../../packages/api-client/package.json#L14). Publica el subpath que resuelve a [createPrelaunchClient.js](../../../packages/api-client/src/prelaunch/createPrelaunchClient.js).
- [dependencies](../../../packages/api-client/package.json#L16). Lista las bibliotecas que el workspace consume para construir o ejecutar código. Incluye `@supabase/supabase-js`, `@referidos/domain`.

## packages/domain/package.json

[Abrir fuente](../../../packages/domain/package.json) · 16 líneas de texto.

Declara exports de dominio sin enlazar el paquete a una UI.

- [name](../../../packages/domain/package.json#L2). Nombre registrado por npm o por el runtime de la aplicación.
- [private](../../../packages/domain/package.json#L3). Evita que el workspace se publique accidentalmente como paquete.
- [version](../../../packages/domain/package.json#L4). Versión declarada para las herramientas de gestión de paquetes.
- [type](../../../packages/domain/package.json#L5). Selecciona las reglas de módulos al cargar JavaScript en Node.
- [exports](../../../packages/domain/package.json#L6). Define puntos de importación públicos que pueden resolver otros workspaces.
- [exports..](../../../packages/domain/package.json#L7). Publica el subpath que resuelve a [index.js](../../../packages/domain/src/index.js).
- [exports../auth/authSteps](../../../packages/domain/package.json#L8). Publica el subpath que resuelve a [authSteps.js](../../../packages/domain/src/auth/authSteps.js).
- [exports../auth/authRoles](../../../packages/domain/package.json#L9). Publica el subpath que resuelve a [authRoles.js](../../../packages/domain/src/auth/authRoles.js).
- [exports../auth/flowRules](../../../packages/domain/package.json#L10). Publica el subpath que resuelve a [flowRules.js](../../../packages/domain/src/auth/flowRules.js).
- [exports../validators](../../../packages/domain/package.json#L11). Publica el subpath que resuelve a [index.js](../../../packages/domain/src/validators/index.js).
- [exports../normalizers/text](../../../packages/domain/package.json#L12). Publica el subpath que resuelve a [text.js](../../../packages/domain/src/normalizers/text.js).
- [exports../catalogs/businessCategories](../../../packages/domain/package.json#L13). Publica el subpath que resuelve a [businessCategories.js](../../../packages/domain/src/catalogs/businessCategories.js).

## packages/feedback-sdk/package.json

[Abrir fuente](../../../packages/feedback-sdk/package.json) · 12 líneas de texto.

Expone entrada, contrato compartido y cliente de envío público.

- [name](../../../packages/feedback-sdk/package.json#L2). Nombre registrado por npm o por el runtime de la aplicación.
- [private](../../../packages/feedback-sdk/package.json#L3). Evita que el workspace se publique accidentalmente como paquete.
- [version](../../../packages/feedback-sdk/package.json#L4). Versión declarada para las herramientas de gestión de paquetes.
- [type](../../../packages/feedback-sdk/package.json#L5). Selecciona las reglas de módulos al cargar JavaScript en Node.
- [exports](../../../packages/feedback-sdk/package.json#L6). Define puntos de importación públicos que pueden resolver otros workspaces.
- [exports..](../../../packages/feedback-sdk/package.json#L7). Publica el subpath que resuelve a [index.js](../../../packages/feedback-sdk/src/index.js).
- [exports../shared](../../../packages/feedback-sdk/package.json#L8). Publica el subpath que resuelve a [shared.js](../../../packages/feedback-sdk/src/shared.js).
- [exports../publicClient](../../../packages/feedback-sdk/package.json#L9). Publica el subpath que resuelve a [publicClient.js](../../../packages/feedback-sdk/src/publicClient.js).

## packages/intake-guard/package.json

[Abrir fuente](../../../packages/intake-guard/package.json) · 10 líneas de texto.

Declara punto de entrada único para utilidades del ingreso público.

- [name](../../../packages/intake-guard/package.json#L2). Nombre registrado por npm o por el runtime de la aplicación.
- [private](../../../packages/intake-guard/package.json#L3). Evita que el workspace se publique accidentalmente como paquete.
- [version](../../../packages/intake-guard/package.json#L4). Versión declarada para las herramientas de gestión de paquetes.
- [type](../../../packages/intake-guard/package.json#L5). Selecciona las reglas de módulos al cargar JavaScript en Node.
- [exports](../../../packages/intake-guard/package.json#L6). Define puntos de importación públicos que pueden resolver otros workspaces.
- [exports..](../../../packages/intake-guard/package.json#L7). Publica el subpath que resuelve a [index.js](../../../packages/intake-guard/src/index.js).

## packages/legal-content/package.json

[Abrir fuente](../../../packages/legal-content/package.json) · 11 líneas de texto.

Expone entradas separadas para app principal y Prelaunch.

- [name](../../../packages/legal-content/package.json#L2). Nombre registrado por npm o por el runtime de la aplicación.
- [private](../../../packages/legal-content/package.json#L3). Evita que el workspace se publique accidentalmente como paquete.
- [version](../../../packages/legal-content/package.json#L4). Versión declarada para las herramientas de gestión de paquetes.
- [type](../../../packages/legal-content/package.json#L5). Selecciona las reglas de módulos al cargar JavaScript en Node.
- [exports](../../../packages/legal-content/package.json#L6). Define puntos de importación públicos que pueden resolver otros workspaces.
- [exports..](../../../packages/legal-content/package.json#L7). Publica el subpath que resuelve a [index.js](../../../packages/legal-content/src/index.js).
- [exports../prelaunch](../../../packages/legal-content/package.json#L8). Publica el subpath que resuelve a [prelaunch.js](../../../packages/legal-content/src/prelaunch.js).

## packages/notifications-sdk/package.json

[Abrir fuente](../../../packages/notifications-sdk/package.json) · 10 líneas de texto.

Declara el paquete de hooks, políticas y acceso a notificaciones.

- [name](../../../packages/notifications-sdk/package.json#L2). Nombre registrado por npm o por el runtime de la aplicación.
- [private](../../../packages/notifications-sdk/package.json#L3). Evita que el workspace se publique accidentalmente como paquete.
- [version](../../../packages/notifications-sdk/package.json#L4). Versión declarada para las herramientas de gestión de paquetes.
- [type](../../../packages/notifications-sdk/package.json#L5). Selecciona las reglas de módulos al cargar JavaScript en Node.
- [exports](../../../packages/notifications-sdk/package.json#L6). Define puntos de importación públicos que pueden resolver otros workspaces.
- [exports..](../../../packages/notifications-sdk/package.json#L7). Publica el subpath que resuelve a [index.js](../../../packages/notifications-sdk/src/index.js).

## packages/observability-sdk/package.json

[Abrir fuente](../../../packages/observability-sdk/package.json) · 15 líneas de texto.

Exporta el cliente de observabilidad móvil y alias compatible.

- [name](../../../packages/observability-sdk/package.json#L2). Nombre registrado por npm o por el runtime de la aplicación.
- [private](../../../packages/observability-sdk/package.json#L3). Evita que el workspace se publique accidentalmente como paquete.
- [version](../../../packages/observability-sdk/package.json#L4). Versión declarada para las herramientas de gestión de paquetes.
- [type](../../../packages/observability-sdk/package.json#L5). Selecciona las reglas de módulos al cargar JavaScript en Node.
- [exports](../../../packages/observability-sdk/package.json#L6). Define puntos de importación públicos que pueden resolver otros workspaces.
- [exports..](../../../packages/observability-sdk/package.json#L7). Publica el subpath que resuelve a [index.js](../../../packages/observability-sdk/src/index.js).
- [exports../client](../../../packages/observability-sdk/package.json#L8). Publica el subpath que resuelve a [createMobileObservabilityClient.js](../../../packages/observability-sdk/src/createMobileObservabilityClient.js).
- [exports../createObservabilityClient](../../../packages/observability-sdk/package.json#L9). Publica el subpath que resuelve a [createMobileObservabilityClient.js](../../../packages/observability-sdk/src/createMobileObservabilityClient.js).
- [dependencies](../../../packages/observability-sdk/package.json#L11). Lista las bibliotecas que el workspace consume para construir o ejecutar código. Incluye `@referidos/api-client`.

## packages/observability/package.json

[Abrir fuente](../../../packages/observability/package.json) · 17 líneas de texto.

Publica subpaths de cliente, esquema, políticas, runtime y scrubber.

- [name](../../../packages/observability/package.json#L2). Nombre registrado por npm o por el runtime de la aplicación.
- [private](../../../packages/observability/package.json#L3). Evita que el workspace se publique accidentalmente como paquete.
- [version](../../../packages/observability/package.json#L4). Versión declarada para las herramientas de gestión de paquetes.
- [type](../../../packages/observability/package.json#L5). Selecciona las reglas de módulos al cargar JavaScript en Node.
- [exports](../../../packages/observability/package.json#L6). Define puntos de importación públicos que pueden resolver otros workspaces.
- [exports..](../../../packages/observability/package.json#L7). Publica el subpath que resuelve a [index.js](../../../packages/observability/src/index.js).
- [exports../schema](../../../packages/observability/package.json#L8). Publica el subpath que resuelve a [envelope.js](../../../packages/observability/src/schema/envelope.js).
- [exports../error-codes](../../../packages/observability/package.json#L9). Publica el subpath que resuelve a [errorCodes.js](../../../packages/observability/src/schema/errorCodes.js).
- [exports../client](../../../packages/observability/package.json#L10). Publica el subpath que resuelve a [createObservabilityClient.js](../../../packages/observability/src/client/createObservabilityClient.js).
- [exports../policy](../../../packages/observability/package.json#L11). Publica el subpath que resuelve a [uxPolicy.js](../../../packages/observability/src/policy/uxPolicy.js).
- [exports../runtime](../../../packages/observability/package.json#L12). Publica el subpath que resuelve a [createErrorRuntime.js](../../../packages/observability/src/runtime/createErrorRuntime.js).
- [exports../error-bus](../../../packages/observability/package.json#L13). Publica el subpath que resuelve a [errorBus.js](../../../packages/observability/src/runtime/errorBus.js).
- [exports../utils/scrub](../../../packages/observability/package.json#L14). Publica el subpath que resuelve a [scrub.js](../../../packages/observability/src/utils/scrub.js).

## packages/platform-rn/package.json

[Abrir fuente](../../../packages/platform-rn/package.json) · 16 líneas de texto.

Declara los adaptadores móviles y la dependencia de almacenamiento.

- [name](../../../packages/platform-rn/package.json#L2). Nombre registrado por npm o por el runtime de la aplicación.
- [private](../../../packages/platform-rn/package.json#L3). Evita que el workspace se publique accidentalmente como paquete.
- [version](../../../packages/platform-rn/package.json#L4). Versión declarada para las herramientas de gestión de paquetes.
- [type](../../../packages/platform-rn/package.json#L5). Selecciona las reglas de módulos al cargar JavaScript en Node.
- [exports](../../../packages/platform-rn/package.json#L6). Define puntos de importación públicos que pueden resolver otros workspaces.
- [exports..](../../../packages/platform-rn/package.json#L7). Publica el subpath que resuelve a [index.js](../../../packages/platform-rn/src/index.js).
- [exports../storage](../../../packages/platform-rn/package.json#L8). Publica el subpath que resuelve a [secureStorageService.js](../../../packages/platform-rn/src/storage/secureStorageService.js).
- [exports../biometrics](../../../packages/platform-rn/package.json#L9). Publica el subpath que resuelve a [biometricService.js](../../../packages/platform-rn/src/biometrics/biometricService.js).
- [exports../device](../../../packages/platform-rn/package.json#L10). Publica el subpath que resuelve a [deviceInfo.js](../../../packages/platform-rn/src/device/deviceInfo.js).
- [dependencies](../../../packages/platform-rn/package.json#L12). Lista las bibliotecas que el workspace consume para construir o ejecutar código. Incluye `@react-native-async-storage/async-storage`.

## packages/platform-web/package.json

[Abrir fuente](../../../packages/platform-web/package.json) · 13 líneas de texto.

Expone adaptadores web de almacenamiento, biometría y dispositivo.

- [name](../../../packages/platform-web/package.json#L2). Nombre registrado por npm o por el runtime de la aplicación.
- [private](../../../packages/platform-web/package.json#L3). Evita que el workspace se publique accidentalmente como paquete.
- [version](../../../packages/platform-web/package.json#L4). Versión declarada para las herramientas de gestión de paquetes.
- [type](../../../packages/platform-web/package.json#L5). Selecciona las reglas de módulos al cargar JavaScript en Node.
- [exports](../../../packages/platform-web/package.json#L6). Define puntos de importación públicos que pueden resolver otros workspaces.
- [exports..](../../../packages/platform-web/package.json#L7). Publica el subpath que resuelve a [index.js](../../../packages/platform-web/src/index.js).
- [exports../storage](../../../packages/platform-web/package.json#L8). Publica el subpath que resuelve a [secureStorageService.js](../../../packages/platform-web/src/storage/secureStorageService.js).
- [exports../biometrics](../../../packages/platform-web/package.json#L9). Publica el subpath que resuelve a [biometricService.js](../../../packages/platform-web/src/biometrics/biometricService.js).
- [exports../device](../../../packages/platform-web/package.json#L10). Publica el subpath que resuelve a [deviceInfo.js](../../../packages/platform-web/src/device/deviceInfo.js).

## packages/security-core/package.json

[Abrir fuente](../../../packages/security-core/package.json) · 12 líneas de texto.

Define entrada pública y subpaths de reglas de PIN y desbloqueo.

- [name](../../../packages/security-core/package.json#L2). Nombre registrado por npm o por el runtime de la aplicación.
- [private](../../../packages/security-core/package.json#L3). Evita que el workspace se publique accidentalmente como paquete.
- [version](../../../packages/security-core/package.json#L4). Versión declarada para las herramientas de gestión de paquetes.
- [type](../../../packages/security-core/package.json#L5). Selecciona las reglas de módulos al cargar JavaScript en Node.
- [exports](../../../packages/security-core/package.json#L6). Define puntos de importación públicos que pueden resolver otros workspaces.
- [exports..](../../../packages/security-core/package.json#L7). Publica el subpath que resuelve a [index.js](../../../packages/security-core/src/index.js).
- [exports../pin](../../../packages/security-core/package.json#L8). Publica el subpath que resuelve a [pinPolicy.js](../../../packages/security-core/src/pin/pinPolicy.js).
- [exports../unlock](../../../packages/security-core/package.json#L9). Publica el subpath que resuelve a [unlockPolicy.js](../../../packages/security-core/src/unlock/unlockPolicy.js).

## packages/support-sdk/package.json

[Abrir fuente](../../../packages/support-sdk/package.json) · 10 líneas de texto.

Declara integración con notifications-sdk. La PWA usa alias para importar módulos de agente.

- [name](../../../packages/support-sdk/package.json#L2). Nombre registrado por npm o por el runtime de la aplicación.
- [private](../../../packages/support-sdk/package.json#L3). Evita que el workspace se publique accidentalmente como paquete.
- [version](../../../packages/support-sdk/package.json#L4). Versión declarada para las herramientas de gestión de paquetes.
- [type](../../../packages/support-sdk/package.json#L5). Selecciona las reglas de módulos al cargar JavaScript en Node.
- [dependencies](../../../packages/support-sdk/package.json#L6). Lista las bibliotecas que el workspace consume para construir o ejecutar código. Incluye `@referidos/notifications-sdk`.

## versioning/component-map.json

[Abrir fuente](../../../versioning/component-map.json) · 292 líneas de texto.

Mapa de rutas, grupos, productos y componentes que usa el detector. Distingue cambios de contrato, docs y recursos ignorados.

- [schemaVersion](../../../versioning/component-map.json#L2). Clave leída por las herramientas de versionado o sus validaciones.
- [baselineVersion](../../../versioning/component-map.json#L3). Clave leída por las herramientas de versionado o sus validaciones.
- [globalIgnore](../../../versioning/component-map.json#L4). Clave leída por las herramientas de versionado o sus validaciones.
- [docOnlyGlobs](../../../versioning/component-map.json#L27). Clave leída por las herramientas de versionado o sus validaciones.
- [specialGroups](../../../versioning/component-map.json#L36). Clave leída por las herramientas de versionado o sus validaciones.
- [products](../../../versioning/component-map.json#L83). Describe el alcance funcional y las raíces de cada producto versionable.

## versioning/env.contract.json

[Abrir fuente](../../../versioning/env.contract.json) · 87 líneas de texto.

Lista nombres de variables necesarias u opcionales y algunas reglas de validación por entorno y producto. No es un archivo para cargar secretos.

- [schema_version](../../../versioning/env.contract.json#L2). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [description](../../../versioning/env.contract.json#L3). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [ops_edge](../../../versioning/env.contract.json#L4). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [ops_edge.required](../../../versioning/env.contract.json#L5). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [ops_edge.optional](../../../versioning/env.contract.json#L25). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [runtime_edge](../../../versioning/env.contract.json#L40). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [runtime_edge.required](../../../versioning/env.contract.json#L41). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [runtime_edge.optional](../../../versioning/env.contract.json#L46). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [github_secrets](../../../versioning/env.contract.json#L50). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [github_secrets.global](../../../versioning/env.contract.json#L51). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [github_secrets.by_product_env](../../../versioning/env.contract.json#L67). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [github_secrets.by_product_env.referidos_app/staging](../../../versioning/env.contract.json#L68). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [github_secrets.by_product_env.referidos_app/prod](../../../versioning/env.contract.json#L71). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [github_secrets.by_product_env.prelaunch_web/staging](../../../versioning/env.contract.json#L74). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [github_secrets.by_product_env.prelaunch_web/prod](../../../versioning/env.contract.json#L77). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [validation](../../../versioning/env.contract.json#L82). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [validation.netlify_site_id_regex](../../../versioning/env.contract.json#L83). Campo que debe resolver la configuración de entorno de Android o del pipeline.
- [validation.supabase_url_regex](../../../versioning/env.contract.json#L84). Campo que debe resolver la configuración de entorno de Android o del pipeline.

## vite.prelaunch.config.js

[Abrir fuente](../../../vite.prelaunch.config.js) · 44 líneas de texto.

Configuración Vite alternativa en la raíz. El comando build:prelaunch usa el workspace y su vite.config.js, así que confirma el invocador antes de tocarla.

Dependencias importadas: `vite`, `@vitejs/plugin-react`, `@tailwindcss/vite`, `node:fs`, `node:path`, `node:url`.

### Funciones y callbacks

- [writeBundle](../../../vite.prelaunch.config.js#L12) `()`. Hook alternativo de Vite que escribe las redirecciones de Netlify en el directorio de salida. Usa `path.resolve`, `fs.writeFileSync`.

### Bloques de configuración

- [name](../../../vite.prelaunch.config.js#L11). Identificador consumido por el runner o el registro de paquetes.
- [root](../../../vite.prelaunch.config.js#L19). Raíz de archivos de la herramienta.
- [envDir](../../../vite.prelaunch.config.js#L20). Directorio donde Vite busca archivos de entorno para el workspace.
- [publicDir](../../../vite.prelaunch.config.js#L21). Ubicación de archivos estáticos que se copian sin transformación.
- [plugins](../../../vite.prelaunch.config.js#L22). Plugins que se cargan durante transformación, compilación o lint.
- [build](../../../vite.prelaunch.config.js#L23). Opciones de empaquetado y los artefactos entregados al workflow.
- [outDir](../../../vite.prelaunch.config.js#L24). Directorio de salida para el empaquetado.
- [rollupOptions](../../../vite.prelaunch.config.js#L25). Opciones transmitidas a Rollup para organizar la salida o los inputs.
- [server](../../../vite.prelaunch.config.js#L31). Opciones del servidor local de desarrollo.
- [allowedHosts](../../../vite.prelaunch.config.js#L36). Hosts permitidos por el servidor de desarrollo.

En el nivel del módulo se invocan `fileURLToPath`, `defineConfig`, `react`, `tailwindcss`, `path.dirname`.
