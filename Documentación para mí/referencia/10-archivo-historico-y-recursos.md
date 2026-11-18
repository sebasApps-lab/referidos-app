# Archivo histórico y recursos del repositorio

Este catálogo permite recuperar los documentos y archivos de trabajo anteriores a esta guía. Los documentos describen el momento en que se redactaron. Para saber qué ejecuta hoy la aplicación, usa las referencias de código de cada capítulo. Se incluyen 51 documentos de `docs/`, 170 archivos de `assets/`, ocho entradas locales de la CLI de Supabase y 30 archivos históricos o auxiliares en la raíz.

- Si buscas el **procedimiento histórico** de un despliegue, mira los runbooks de operación y versionado.
- Si buscas **por qué se ve así** una portada, una tarjeta o un mockup, mira las capturas y fuentes de diseño.
- Si buscas **qué ruta o módulo ejecutar hoy**, empieza en el [índice principal](../README.md) y sigue sus enlaces al código.

## Documentación preexistente

Las guías de usuario explican lo que ve cada rol. Las notas de desarrollo ubican entradas y contratos. Los runbooks conservan procedimientos para operadores. La fecha, el commit y el proyecto desplegado son referencias distintas en todos esos archivos.


### Documentación general y operación

| Archivo | Papel en el repositorio |
|---|---|
| [README.md](../../docs/README.md) | Índice original. Lleva a la guía del sistema, los documentos de cada app y las notas técnicas y de usuario. |
| [referidos-system/README.md](../../docs/referidos-system/README.md) | Recorrido operativo del monorepo: control plane, versiones, promoción, despliegue, observabilidad y catálogo de soporte. |
| [referidos-system/entornos-y-secrets.md](../../docs/referidos-system/entornos-y-secrets.md) | Mapa de proyectos, variables y responsabilidades de Supabase, GitHub y Netlify. Consulta los nombres de configuración y verifica estados en el proveedor antes de ejecutar instrucciones. |
| [referidos-system/operacion-sin-pr-netlify.md](../../docs/referidos-system/operacion-sin-pr-netlify.md) | Runbook de la ruta desde commits hasta promoción y publicación por Netlify, con versionado centralizado en OPS. Aclara el significado operativo de promover y desplegar. |
| [referidos-system/ops-telemetry-cold-dispatch.md](../../docs/referidos-system/ops-telemetry-cold-dispatch.md) | Plantilla de configuración del envío de telemetría operativa en lote, ejemplos por entorno y acciones para ver o pausar su programación. |
| [referidos-system/support-macros-ops-cache.md](../../docs/referidos-system/support-macros-ops-cache.md) | Describe cómo se escribe el catálogo de macros en OPS y cómo cada runtime consume una caché de solo lectura. Útil para diagnosticar diferencias entre panel y ticket. |
| [referidos-system/android-support-cleanup-pending.md](../../docs/referidos-system/android-support-cleanup-pending.md) | Registra el cierre de la migración de macros y categorías del agente en Android. El nombre sigue diciendo pendiente por historia del archivo. |
| [support-ticket-screens.md](../../docs/support-ticket-screens.md) | Especificación funcional de pantallas de atención desde apertura por WhatsApp hasta seguimiento, cierre y resolución. Sirve para entender estados y decisiones de interfaz. |
| [versioning-system.md](../../docs/versioning-system.md) | Atajo al material de releases y observabilidad de builds y configuración por entorno. |
| [versioning/github-runner-selfhosted-setup.md](../../docs/versioning/github-runner-selfhosted-setup.md) | Guía de prerrequisitos, migraciones, funciones, variables y puesta en marcha del runner autohospedado que sincroniza artefactos locales. |
| [versioning/runtime-config-and-local-artifacts.md](../../docs/versioning/runtime-config-and-local-artifacts.md) | Explica el bundle web promovible, su configuración inyectada por entorno, los artefactos canónicos de Storage y la copia al nodo local. |

### Android e historial de paridad

La [guía Android actual de esta carpeta](../04-android.md) cruza los planes históricos con navegación, contratos, servicios y adaptadores del checkout.

| Archivo | Papel en el repositorio |
|---|---|
| [android-console-runbook.md](../../docs/android-console-runbook.md) | Procedimiento Windows para Java, SDK, Metro, emulador/terminal y APK de prueba, con diagnóstico de puerto y Gradle. |
| [android-migration-plan.md](../../docs/android-migration-plan.md) | Plan histórico de migración hacia una app hermana React Native. Explica el alcance inicial, las fases y restricciones de trabajo de entonces. |
| [android-parity-certification-matrix.md](../../docs/android-parity-certification-matrix.md) | Matriz histórica de equivalencias PWA–Android con archivos y comandos. Es un mapa de recorridos para revisar la paridad del checkout actual. |
| [android-parity-checklist.md](../../docs/android-parity-checklist.md) | Inventario de superficies de auth, roles, seguridad y observabilidad que se querían cubrir en Android. |
| [android-phase-playbook.md](../../docs/android-phase-playbook.md) | Bitácora ordenada por fase de implementación, guardrails y evidencias. Sirve para recuperar por qué existen los scripts de comprobación. |

### Política de iconos

Esta carpeta contiene notas de marca para el repositorio. El contenido y las pantallas legales que se publican tienen su propio recorrido dentro de las apps.

| Archivo | Papel en el repositorio |
|---|---|
| [legal/README.md](../../docs/legal/README.md) | Índice de gobernanza de marca. Vincula la política de iconos a su inventario y a los usos en código. |
| [legal/brand-icon-policy.md](../../docs/legal/brand-icon-policy.md) | Criterios del proyecto para iconos de proveedores, alcance, estados de aprobación, atribución y mantenimiento. |
| [legal/brand-icon-manifest.md](../../docs/legal/brand-icon-manifest.md) | Inventario de iconos de navegadores, proveedores y sistemas operativos. Permite ubicar cada caso antes de sustituir una marca. |

### Guías técnicas existentes

| Archivo | Papel en el repositorio |
|---|---|
| [notas-desarrolladores/README.md](../../docs/notas-desarrolladores/README.md) | Entrada a notas de arquitectura por app y orden de lectura para desarrolladores. |
| [notas-desarrolladores/arquitectura-compartida.md](../../docs/notas-desarrolladores/arquitectura-compartida.md) | Organización del workspace, paquetes comunes, configuración runtime y separación entre proyectos Supabase. |
| [notas-desarrolladores/prelaunch/README.md](../../docs/notas-desarrolladores/prelaunch/README.md) | Mapa de la landing pública, captación, centro de ayuda, soporte y otros módulos. |
| [notas-desarrolladores/prelaunch/runtime-rutas-y-servicios.md](../../docs/notas-desarrolladores/prelaunch/runtime-rutas-y-servicios.md) | Punto de entrada, rutas, configuración runtime, servicios de waitlist/soporte y analytics de Prelaunch. |
| [notas-desarrolladores/referidos-android/README.md](../../docs/notas-desarrolladores/referidos-android/README.md) | Índice del workspace nativo y sus notas de entrada, flujos y entorno. |
| [notas-desarrolladores/referidos-android/arranque-navegacion-y-stores.md](../../docs/notas-desarrolladores/referidos-android/arranque-navegacion-y-stores.md) | Descripción de la app shell, navegación por rol, stores y componentes comunes del cliente nativo. |
| [notas-desarrolladores/referidos-android/flujos-y-servicios.md](../../docs/notas-desarrolladores/referidos-android/flujos-y-servicios.md) | Describe auth móvil, servicios y flujos por rol. Útil al comparar una pantalla con su equivalente web. |
| [notas-desarrolladores/referidos-android/native-y-entorno.md](../../docs/notas-desarrolladores/referidos-android/native-y-entorno.md) | Configuración del runtime móvil y módulos nativos, junto a comandos y verificaciones por fase. |
| [notas-desarrolladores/referidos-app/README.md](../../docs/notas-desarrolladores/referidos-app/README.md) | Índice técnico de la PWA principal y mapa de sus carpetas. |
| [notas-desarrolladores/referidos-app/arranque-auth-y-estado.md](../../docs/notas-desarrolladores/referidos-app/arranque-auth-y-estado.md) | Secuencia de inicio, gate, bootstrap, store, seguridad local y layouts con caché de la PWA. |
| [notas-desarrolladores/referidos-app/backend-y-edge-functions.md](../../docs/notas-desarrolladores/referidos-app/backend-y-edge-functions.md) | Clasifica las llamadas del cliente runtime y familias de Edge Functions por dominio. |
| [notas-desarrolladores/referidos-app/modulos-y-rutas.md](../../docs/notas-desarrolladores/referidos-app/modulos-y-rutas.md) | Rutas web y mapa del código de cliente, negocio, admin, soporte, perfil, QR y legal. |
| [notas-desarrolladores/referidos-ops/README.md](../../docs/notas-desarrolladores/referidos-ops/README.md) | Índice del plano OPS y sus responsabilidades respecto al runtime. |
| [notas-desarrolladores/referidos-ops/funciones-y-responsabilidades.md](../../docs/notas-desarrolladores/referidos-ops/funciones-y-responsabilidades.md) | Clasifica funciones y migraciones de versionado, despliegue, soporte y telemetría de OPS. |
| [notas-desarrolladores/referidos-pwa/README.md](../../docs/notas-desarrolladores/referidos-pwa/README.md) | Entrada al workspace experimental y su alcance de prototipo. |
| [notas-desarrolladores/referidos-pwa/arquitectura-y-superficies.md](../../docs/notas-desarrolladores/referidos-pwa/arquitectura-y-superficies.md) | Explica el entry point, la autenticación local de maqueta y sus pantallas de prueba. |

### Guías de producto existentes

| Archivo | Papel en el repositorio |
|---|---|
| [notas-usuarios/README.md](../../docs/notas-usuarios/README.md) | Índice por aplicación y mapa rápido del papel de cada superficie. |
| [notas-usuarios/prelaunch/README.md](../../docs/notas-usuarios/prelaunch/README.md) | Resumen de la web pública, captación y ayuda antes de entrar al producto. |
| [notas-usuarios/prelaunch/ayuda-y-soporte.md](../../docs/notas-usuarios/prelaunch/ayuda-y-soporte.md) | Recorrido visible de centro de ayuda y canales para abrir contactos de soporte. |
| [notas-usuarios/prelaunch/captacion-y-waitlist.md](../../docs/notas-usuarios/prelaunch/captacion-y-waitlist.md) | Qué busca la landing y qué intenta guardar el formulario de registro anticipado. |
| [notas-usuarios/referidos-android/README.md](../../docs/notas-usuarios/referidos-android/README.md) | Resumen funcional de la app nativa y sus perfiles. |
| [notas-usuarios/referidos-android/acceso-y-onboarding.md](../../docs/notas-usuarios/referidos-android/acceso-y-onboarding.md) | Pasos visibles para entrar, registrarse, verificar y volver desde el navegador OAuth. |
| [notas-usuarios/referidos-android/roles-y-pantallas.md](../../docs/notas-usuarios/referidos-android/roles-y-pantallas.md) | Pestañas y destinos de cliente, negocio, administración y soporte en Android. |
| [notas-usuarios/referidos-app/README.md](../../docs/notas-usuarios/referidos-app/README.md) | Mapa funcional de la PWA principal y enlaces a sus guías por rol. |
| [notas-usuarios/referidos-app/acceso-y-cuenta.md](../../docs/notas-usuarios/referidos-app/acceso-y-cuenta.md) | Puntos de entrada, pasos de login y situaciones que pueden exigir completar un perfil antes de entrar. |
| [notas-usuarios/referidos-app/admin-y-soporte.md](../../docs/notas-usuarios/referidos-app/admin-y-soporte.md) | Capacidades de los paneles internos y recorrido operativo de mesa de ayuda. |
| [notas-usuarios/referidos-app/cliente.md](../../docs/notas-usuarios/referidos-app/cliente.md) | Qué puede hacer cliente en inicio, escáner, historial y perfil. |
| [notas-usuarios/referidos-app/legal-landing-y-perfil.md](../../docs/notas-usuarios/referidos-app/legal-landing-y-perfil.md) | Describe la landing pública, la lectura de documentos legales y la experiencia común de perfil. |
| [notas-usuarios/referidos-app/negocio.md](../../docs/notas-usuarios/referidos-app/negocio.md) | Describe el tablero de negocio, escáner, gestión, perfil y relación con onboarding. |
| [notas-usuarios/referidos-ops/README.md](../../docs/notas-usuarios/referidos-ops/README.md) | Qué aporta OPS visto desde las aplicaciones, sin entrar en la implementación de sus funciones. |
| [notas-usuarios/referidos-pwa/README.md](../../docs/notas-usuarios/referidos-pwa/README.md) | Señala qué rutas y pantallas pertenecen al laboratorio visual. |
| [notas-usuarios/referidos-pwa/auth-y-prototipos.md](../../docs/notas-usuarios/referidos-pwa/auth-y-prototipos.md) | Qué muestran la maqueta de auth, páginas de prueba y experiencia de creación de promociones. |

## Piezas históricas en la raíz

| Archivo | Papel en el repositorio |
|---|---|
| [audit.json](../../audit.json) | Exportación histórica de auditoría de dependencias. Sirve para contrastar el diagnóstico de aquel checkout con una auditoría futura. |
| [contexto.ai.codex.md](../../contexto.ai.codex.md) | Contexto histórico para el asistente sobre reglas de producto, auth, RLS y esquema. Contrasta sus supuestos con las migraciones y código vigentes. |
| [estilo_splashchoice.txt](../../estilo_splashchoice.txt) | Nota del fondo, color y estilo de contenedor que se usaban en SplashChoice antes de un cambio visual. |
| [flujoqr.md](../../flujoqr.md) | Pedido histórico para el historial de QR de cliente, sus estados, sus escenarios de escaneo e indicaciones visuales. Contrasta el flujo aplicado con servicios de QR y migraciones. |
| [repo-tree.txt](../../repo-tree.txt) | Captura antigua del árbol, con rutas anteriores a la organización actual del monorepo. Puede ayudar a rastrear nombres al consultar el historial. |
| [triggers en auth](../../triggers%20en%20auth) | Apunte de los triggers de sincronización de perfil/Auth. Compáralo con los archivos de migración para entender la evolución del registro. |

## Capturas de referencia en la raíz

El PNG sirve para comparar un estado visual concreto. El tamaño indicado en los nombres corresponde al ancho registrado en el nombre del archivo.

| Archivo | Papel en el repositorio |
|---|---|
| [anima-prototype-hero-check.png](../../anima-prototype-hero-check.png) | Captura de comprobación del hero del prototipo de Anima. |
| [anima-prototype-icons-check.png](../../anima-prototype-icons-check.png) | Captura de la comprobación visual de iconos del prototipo de Anima. |
| [figma-prototype-current-bottom.png](../../figma-prototype-current-bottom.png) | Captura del tramo inferior del prototipo comparado con Figma. |
| [figma-prototype-current-full.png](../../figma-prototype-current-full.png) | Captura de página completa del prototipo comparado con Figma. |
| [figma-prototype-current-hero.png](../../figma-prototype-current-hero.png) | Captura del hero del prototipo comparado con Figma. |
| [mobile-phone-section-check.png](../../mobile-phone-section-check.png) | Referencia de la sección visual del teléfono en móvil. |
| [mobile-root-full-430.png](../../mobile-root-full-430.png) | Referencia de la página raíz completa con viewport de 430 px de ancho. |
| [mobile-root-full-768.png](../../mobile-root-full-768.png) | Referencia de la página raíz completa con viewport de 768 px de ancho. |
| [mobile-root-hero-430.png](../../mobile-root-hero-430.png) | Comprobación del hero de raíz a 430 px de ancho. |
| [mobile-root-hero-768.png](../../mobile-root-hero-768.png) | Comprobación del hero de raíz a 768 px de ancho. |
| [mobile-top-viewport-check.png](../../mobile-top-viewport-check.png) | Comprobación del recorte superior de la página inicial en un viewport móvil. |
| [mobile-viewport-390-check.png](../../mobile-viewport-390-check.png) | Comprobación de distribución móvil con ancho de 390 px. |
| [phone-centering-360.png](../../phone-centering-360.png) | Comprobación del alineado del teléfono ilustrado a 360 px. |
| [phone-centering-430.png](../../phone-centering-430.png) | Comprobación del alineado del teléfono ilustrado a 430 px. |
| [phone-scale-360.png](../../phone-scale-360.png) | Comprobación de la escala del teléfono ilustrado a 360 px. |
| [phone-scale-430.png](../../phone-scale-430.png) | Comprobación de la escala del teléfono ilustrado a 430 px. |
| [prueba3-tight-pass.png](../../prueba3-tight-pass.png) | Captura de un ajuste de espaciado visual de la superficie Prueba3. |

## Archivos de trabajo conservados en Git

Descripción por nombre y ruta. El catálogo no abre ni reproduce el contenido de volcados, bundles de prueba o archivos de diagnóstico.

| Archivo | Papel en el repositorio |
|---|---|
| [.tmp-check-glow.cjs](../../.tmp-check-glow.cjs) | Nombre de script de diagnóstico visual del resplandor. Referencia de un trabajo puntual. |
| [.tmp-eslint-referidos-app.json](../../.tmp-eslint-referidos-app.json) | Nombre de reporte exportado de ESLint para la PWA. Trata el resultado como una captura de otro momento. |
| [.tmp-job-logs.txt](../../.tmp-job-logs.txt) | Nombre de volcado de logs de un job, potencialmente con datos de configuración o diagnóstico. |
| [.tmp-prelaunch-server.cjs](../../.tmp-prelaunch-server.cjs) | Nombre de script de servidor auxiliar para la landing durante una sesión de trabajo. |
| [.tmp-staging-index.html](../../.tmp-staging-index.html) | Nombre de una copia de HTML de staging durante diagnóstico. |
| [.tmp-vendor-BnQceuYe.js](../../.tmp-vendor-BnQceuYe.js) | Nombre de una copia de bundle de proveedores generado para diagnóstico. |
| [.tmp-vendor-react-Bgu9GZ02.js](../../.tmp-vendor-react-Bgu9GZ02.js) | Nombre de una copia del bundle generado de React correspondiente a un build anterior. |

## Metadatos del Supabase CLI

Archivos bajo `supabase/.temp/` en la raíz. Son metadatos del enlace o del estado de una CLI. Los árboles de migraciones y Edge Functions viven dentro de los proyectos del monorepo. El catálogo referencia las rutas.

| Archivo | Papel en el repositorio |
|---|---|
| [supabase/.temp/cli-latest](../../supabase/.temp/cli-latest) | Archivo de estado local de la CLI para la versión disponible. |
| [supabase/.temp/gotrue-version](../../supabase/.temp/gotrue-version) | Marcador de la versión del servicio de autenticación. |
| [supabase/.temp/pooler-url](../../supabase/.temp/pooler-url) | Referencia de conexión al pooler que registra la CLI. Se cataloga por ruta. Su valor requiere revisión antes de compartirlo. |
| [supabase/.temp/postgres-version](../../supabase/.temp/postgres-version) | Marcador de la versión del servicio de base de datos PostgreSQL. |
| [supabase/.temp/project-ref](../../supabase/.temp/project-ref) | Proyecto enlazado que registró esta instalación local de la CLI. El identificador local puede diferir del entorno activo para la PWA y Android. |
| [supabase/.temp/rest-version](../../supabase/.temp/rest-version) | Marcador de versión del servidor REST/PostgREST. |
| [supabase/.temp/storage-migration](../../supabase/.temp/storage-migration) | Marcador del estado de migración del servicio de almacenamiento. |
| [supabase/.temp/storage-version](../../supabase/.temp/storage-version) | Marcador de versión del servicio de almacenamiento. |

## Recursos de diseño compartidos

La finalidad de los archivos de imagen se describe por su familia, formato y nombre de exportación. Esa clasificación permite localizar recursos candidatos. La ruta del import en una aplicación determina si un archivo participa en el build de esa app.

### Copia de publicación histórica de Netlify

La galería de este árbol referencia sus PNG relativos y los organiza por raíz, cliente y negocio. Las aplicaciones tienen sus propias rutas de recursos y sus propios builds.

| Archivo | Papel en el repositorio |
|---|---|
| [cliente/chat-support-icon-cliente.png](../../assets/.netlify-assets-publish-legacy/assets/shared/help-center/cliente/chat-support-icon-cliente.png) | Icono PNG de la copia de publicación de cliente para chat o contacto con soporte. |
| [cliente/delete-data-icon-cliente.png](../../assets/.netlify-assets-publish-legacy/assets/shared/help-center/cliente/delete-data-icon-cliente.png) | Icono PNG de la copia de publicación de cliente para eliminación de datos. |
| [cliente/gift-promos-icon-cliente.png](../../assets/.netlify-assets-publish-legacy/assets/shared/help-center/cliente/gift-promos-icon-cliente.png) | Icono PNG de la copia de publicación de cliente para promociones y regalos. |
| [cliente/key-icon-cliente.png](../../assets/.netlify-assets-publish-legacy/assets/shared/help-center/cliente/key-icon-cliente.png) | Icono PNG de la copia de publicación de cliente para acceso y credenciales. |
| [cliente/negocio-icon-cliente.png](../../assets/.netlify-assets-publish-legacy/assets/shared/help-center/cliente/negocio-icon-cliente.png) | Icono PNG de la copia de publicación de cliente para negocios. |
| [cliente/points-icon-cliente.png](../../assets/.netlify-assets-publish-legacy/assets/shared/help-center/cliente/points-icon-cliente.png) | Icono PNG de la copia de publicación de cliente para puntos o recompensas. |
| [cliente/privacy-icon-cliente.png](../../assets/.netlify-assets-publish-legacy/assets/shared/help-center/cliente/privacy-icon-cliente.png) | Icono PNG de la copia de publicación de cliente para privacidad. |
| [cliente/terms-icon-cliente.png](../../assets/.netlify-assets-publish-legacy/assets/shared/help-center/cliente/terms-icon-cliente.png) | Icono PNG de la copia de publicación de cliente para términos. |
| [cliente/verify-account-icon-cliente.png](../../assets/.netlify-assets-publish-legacy/assets/shared/help-center/cliente/verify-account-icon-cliente.png) | Icono PNG de la copia de publicación de cliente para verificación de cuenta. |
| [help-center-icon-negocio.png](../../assets/.netlify-assets-publish-legacy/assets/shared/help-center/help-center-icon-negocio.png) | Icono PNG de la copia de publicación común para entrada general del centro de ayuda. |
| [ir-right-arrow-negocio.png](../../assets/.netlify-assets-publish-legacy/assets/shared/help-center/ir-right-arrow-negocio.png) | Icono PNG de la copia de publicación común para avance o navegación lateral. |
| [negocio/chat-support-icon-negocio.png](../../assets/.netlify-assets-publish-legacy/assets/shared/help-center/negocio/chat-support-icon-negocio.png) | Icono PNG de la copia de publicación de negocio para chat o contacto con soporte. |
| [negocio/clientes-icon-negocio.png](../../assets/.netlify-assets-publish-legacy/assets/shared/help-center/negocio/clientes-icon-negocio.png) | Icono PNG de la copia de publicación de negocio para gestión o visibilidad de clientes. |
| [negocio/delete-data-icon-negocio.png](../../assets/.netlify-assets-publish-legacy/assets/shared/help-center/negocio/delete-data-icon-negocio.png) | Icono PNG de la copia de publicación de negocio para eliminación de datos. |
| [negocio/gift-promos-icon-negocio.png](../../assets/.netlify-assets-publish-legacy/assets/shared/help-center/negocio/gift-promos-icon-negocio.png) | Icono PNG de la copia de publicación de negocio para promociones y regalos. |
| [negocio/key-icon-negocio.png](../../assets/.netlify-assets-publish-legacy/assets/shared/help-center/negocio/key-icon-negocio.png) | Icono PNG de la copia de publicación de negocio para acceso y credenciales. |
| [negocio/mail-icon-negocio.png](../../assets/.netlify-assets-publish-legacy/assets/shared/help-center/negocio/mail-icon-negocio.png) | Icono PNG de la copia de publicación de negocio para correo. |
| [negocio/negocio-icon-negocio.png](../../assets/.netlify-assets-publish-legacy/assets/shared/help-center/negocio/negocio-icon-negocio.png) | Icono PNG de la copia de publicación de negocio para negocios. |
| [negocio/points-icon-negocio.png](../../assets/.netlify-assets-publish-legacy/assets/shared/help-center/negocio/points-icon-negocio.png) | Icono PNG de la copia de publicación de negocio para puntos o recompensas. |
| [negocio/privacy-icon-negocio.png](../../assets/.netlify-assets-publish-legacy/assets/shared/help-center/negocio/privacy-icon-negocio.png) | Icono PNG de la copia de publicación de negocio para privacidad. |
| [negocio/terms-icon-negocio.png](../../assets/.netlify-assets-publish-legacy/assets/shared/help-center/negocio/terms-icon-negocio.png) | Icono PNG de la copia de publicación de negocio para términos. |
| [negocio/verify-account-icon-negocio.png](../../assets/.netlify-assets-publish-legacy/assets/shared/help-center/negocio/verify-account-icon-negocio.png) | Icono PNG de la copia de publicación de negocio para verificación de cuenta. |
| [.netlify-assets-publish-legacy/index.html](../../assets/.netlify-assets-publish-legacy/index.html) | Índice HTML estático que monta una galería con enlaces y vistas de los iconos de ayuda publicados en esta copia. |

### Recursos de la landing comercial

Hay dos familias del hero con nombres duplicados. Los componentes de negocio de Prelaunch que se cargan en desarrollo intentan importar la copia `assets/dev/business`. Sus rutas relativas suben cinco niveles y apuntan a `apps/assets/dev/business`, que no está en Git. Desde las carpetas actuales hace falta alcanzar la raíz un nivel más arriba o importar mediante una ruta de la aplicación. Esto surge de la lectura de rutas. [Componente de fondo](../../apps/prelaunch/src/business-landing/desktop/components/DesktopHeroBackground.jsx) · [Mockup](../../apps/prelaunch/src/business-landing/desktop/components/DesktopHeroPhoneShowcase.jsx) · [Entrada de Prelaunch](../../apps/prelaunch/src/main.jsx)

| Archivo | Papel en el repositorio |
|---|---|
| [business/bg-hero-negocio.png](../../assets/business/bg-hero-negocio.png) | Fondo raster del hero orientado a negocios. |
| [business/iMac-panel-promos-mockup-BLUE.png](../../assets/business/iMac-panel-promos-mockup-BLUE.png) | Mockup de iMac azul con un panel de promociones para la versión comercial de la landing. |
| [business/iphone-mockup-negocio.png](../../assets/business/iphone-mockup-negocio.png) | Mockup de iPhone para ilustrar el uso por comercios. |
| [dev/business/bg-hero-negocio.png](../../assets/dev/business/bg-hero-negocio.png) | Fondo raster del hero de negocios en la copia de desarrollo a la que apunta DesktopHeroBackground.jsx. |
| [dev/business/iMac-panel-promos-mockup-BLUE.png](../../assets/dev/business/iMac-panel-promos-mockup-BLUE.png) | Mockup azul del panel de promociones en la copia de desarrollo a la que apunta DesktopHeroPhoneShowcase.jsx. |

### Dispositivo, mockups editoriales y fuentes visuales

Variantes fuente para comparar dirección gráfica y reutilizar composiciones por decisión de diseño.

| Archivo | Papel en el repositorio |
|---|---|
| [devices/Nothing Phone 2a.png](../../assets/devices/Nothing%20Phone%202a.png) | Imagen fuente de un Nothing Phone 2a para composiciones que muestran pantallas móviles. |
| [editorial/Waitlist - Landing - referencia.png](../../assets/editorial/Waitlist%20-%20Landing%20-%20referencia.png) | Referencia editorial del diseño de página de espera. |
| [editorial/landing-waitlist/landing-bottom-bg.png](../../assets/editorial/landing-waitlist/landing-bottom-bg.png) | Fondo fuente del tramo inferior de la landing de espera. |
| [editorial/landing-waitlist/landing-bottom-footer-bg.png](../../assets/editorial/landing-waitlist/landing-bottom-footer-bg.png) | Fondo de pie de página de la landing. La ruta identifica si es material editorial o copia histórica. |
| [editorial/landing-waitlist/landing-hero-2-bg.png](../../assets/editorial/landing-waitlist/landing-hero-2-bg.png) | Segundo fondo o variante del hero de la landing de espera. |
| [editorial/landing-waitlist/landing-hero-bg.png](../../assets/editorial/landing-waitlist/landing-hero-bg.png) | Fondo fuente del hero de la landing de espera. |
| [editorial/v4-qr-checkout.jpg](../../assets/editorial/v4-qr-checkout.jpg) | Fotografía de un flujo con QR en caja para la dirección editorial v4. |
| [editorial/v4-shop-owners.jpg](../../assets/editorial/v4-shop-owners.jpg) | Fotografía de comerciantes usada como alternativa editorial v4. |
| [editorial/v5-cafe-customer.jpg](../../assets/editorial/v5-cafe-customer.jpg) | Fotografía de cliente de una cafetería para la dirección editorial v5. |
| [editorial/v5-store-owner.jpg](../../assets/editorial/v5-store-owner.jpg) | Fotografía de propietaria o propietario de tienda para la dirección editorial v5. |

### Fuentes originales para Prelaunch

El generador lee los TTF de raíz, incluye los caracteres de los textos de la aplicación y escribe subconjuntos WOFF2 consumidos por su CSS de fuentes. Cambia las fuentes originales aquí y sigue el generador cuando necesites nuevos pesos o cobertura. [Generador de subconjuntos](../../tooling/fonts/subset-prelaunch-fonts.mjs) · [Fuentes de Prelaunch](../../apps/prelaunch/src/fonts.css)

| Archivo | Papel en el repositorio |
|---|---|
| [fonts/poppins/Poppins-Bold.ttf](../../assets/fonts/poppins/Poppins-Bold.ttf) | Fuente TrueType Poppins de peso 700, entrada del generador de subconjuntos de la landing. |
| [fonts/poppins/Poppins-ExtraLight.ttf](../../assets/fonts/poppins/Poppins-ExtraLight.ttf) | Fuente TrueType Poppins de peso 200, entrada del generador de subconjuntos de la landing. |
| [fonts/poppins/Poppins-Light.ttf](../../assets/fonts/poppins/Poppins-Light.ttf) | Fuente TrueType Poppins de peso 300, entrada del generador de subconjuntos de la landing. |
| [fonts/poppins/Poppins-Medium.ttf](../../assets/fonts/poppins/Poppins-Medium.ttf) | Fuente TrueType Poppins de peso 500, entrada del generador de subconjuntos de la landing. |
| [fonts/poppins/Poppins-Regular.ttf](../../assets/fonts/poppins/Poppins-Regular.ttf) | Fuente TrueType Poppins de peso 400, entrada del generador de subconjuntos de la landing. |
| [fonts/poppins/Poppins-SemiBold.ttf](../../assets/fonts/poppins/Poppins-SemiBold.ttf) | Fuente TrueType Poppins de peso 600, entrada del generador de subconjuntos de la landing. |
| [fonts/roboto/Roboto-Medium.ttf](../../assets/fonts/roboto/Roboto-Medium.ttf) | Fuente TrueType Roboto de peso 500, entrada del generador de subconjuntos de la landing. |
| [fonts/roboto/Roboto-Regular.ttf](../../assets/fonts/roboto/Roboto-Regular.ttf) | Fuente TrueType Roboto de peso 400, entrada del generador de subconjuntos de la landing. |

### Iconos, QR y capturas generales

| Archivo | Papel en el repositorio |
|---|---|
| [icons/icon-1.png](../../assets/icons/icon-1.png) | Icono raster auxiliar de la serie numerada. Número de exportación 1. |
| [icons/icon-2.png](../../assets/icons/icon-2.png) | Icono raster auxiliar de la serie numerada. Número de exportación 2. |
| [icons/icon-3.png](../../assets/icons/icon-3.png) | Icono raster auxiliar de la serie numerada. Número de exportación 3. |
| [qr/historial-qr.svg](../../assets/qr/historial-qr.svg) | Recurso vectorial para identificar visualmente el historial de QR. |
| [screenshots/Mockup img 1.png](../../assets/screenshots/Mockup%20img%201.png) | Primer mockup identificado por el número de exportación. |
| [screenshots/Mockup img 2.png](../../assets/screenshots/Mockup%20img%202.png) | Segundo mockup identificado por el número de exportación. |
| [screenshots/Mockup img 6.png](../../assets/screenshots/Mockup%20img%206.png) | Sexto mockup identificado por el número de exportación. |
| [screenshots/desktop-1.png](../../assets/screenshots/desktop-1.png) | Captura de referencia de interfaz en escritorio. |
| [screenshots/mobile-1.png](../../assets/screenshots/mobile-1.png) | Captura de referencia de interfaz en móvil. |

### Logos de variantes históricas

Familias y paletas de exploraciones anteriores. Antes de reutilizar un símbolo o título, revisa la marca activa de la superficie y la política correspondiente.

| Archivo | Papel en el repositorio |
|---|---|
| [legacy-logo/blanco-lila-1.svg](../../assets/legacy-logo/blanco-lila-1.svg) | Logo histórico en blanco y lila, variante 1. El formato vectorial conserva la escala. |
| [legacy-logo/blanco-lila-2.svg](../../assets/legacy-logo/blanco-lila-2.svg) | Logo histórico en blanco y lila, variante 2. El formato vectorial conserva la escala. |
| [legacy-logo/blanco-lila-3.svg](../../assets/legacy-logo/blanco-lila-3.svg) | Logo histórico en blanco y lila, variante 3. El formato vectorial conserva la escala. |
| [legacy-logo/blanco-lila-4.svg](../../assets/legacy-logo/blanco-lila-4.svg) | Logo histórico en blanco y lila, variante 4. El formato vectorial conserva la escala. |
| [legacy-logo/blanco-lila-5.svg](../../assets/legacy-logo/blanco-lila-5.svg) | Logo histórico en blanco y lila, variante 5. El formato vectorial conserva la escala. |
| [legacy-logo/blanco-lila-6.svg](../../assets/legacy-logo/blanco-lila-6.svg) | Logo histórico en blanco y lila, variante 6. El formato vectorial conserva la escala. |
| [legacy-logo/blanco.svg](../../assets/legacy-logo/blanco.svg) | Logo histórico en blanco. El formato vectorial conserva la escala. |
| [legacy-logo/lila.svg](../../assets/legacy-logo/lila.svg) | Logo histórico en lila. El formato vectorial conserva la escala. |
| [legacy-logo/morado-blanco-1.svg](../../assets/legacy-logo/morado-blanco-1.svg) | Logo histórico en morado y blanco, variante 1. El formato vectorial conserva la escala. |
| [legacy-logo/morado-blanco-2.svg](../../assets/legacy-logo/morado-blanco-2.svg) | Logo histórico en morado y blanco, variante 2. El formato vectorial conserva la escala. |
| [legacy-logo/morado-blanco-5.svg](../../assets/legacy-logo/morado-blanco-5.svg) | Logo histórico en morado y blanco, variante 5. El formato vectorial conserva la escala. |
| [legacy-logo/morado.svg](../../assets/legacy-logo/morado.svg) | Logo histórico en morado. El formato vectorial conserva la escala. |
| [legacy-logo/naranja.svg](../../assets/legacy-logo/naranja.svg) | Logo histórico en naranja. El formato vectorial conserva la escala. |
| [legacy-logo/negro-naranja-1.svg](../../assets/legacy-logo/negro-naranja-1.svg) | Logo histórico en negro y naranja, variante 1. El formato vectorial conserva la escala. |
| [legacy-logo/negro-naranja-2.svg](../../assets/legacy-logo/negro-naranja-2.svg) | Logo histórico en negro y naranja, variante 2. El formato vectorial conserva la escala. |
| [legacy-logo/negro-naranja-5.svg](../../assets/legacy-logo/negro-naranja-5.svg) | Logo histórico en negro y naranja, variante 5. El formato vectorial conserva la escala. |
| [legacy-logo/negro.svg](../../assets/legacy-logo/negro.svg) | Logo histórico en negro. El formato vectorial conserva la escala. |
| [legacy-logo/no usar/acceso-anticipado-title.svg](../../assets/legacy-logo/no%20usar/acceso-anticipado-title.svg) | Export vectorial de la palabra o título Acceso anticipado, conservado en la carpeta histórica «no usar». |
| [legacy-logo/no usar/qrew-title.svg](../../assets/legacy-logo/no%20usar/qrew-title.svg) | Export vectorial de la palabra o título Qrew, conservado en la carpeta histórica «no usar». |
| [legacy/logo/go-plip-black-blue-legacy.svg](../../assets/legacy/logo/go-plip-black-blue-legacy.svg) | Logo vectorial histórico Go Plip en negro y azul. |
| [legacy/logo/go-plip-black-gray-legacy.svg](../../assets/legacy/logo/go-plip-black-gray-legacy.svg) | Logo vectorial histórico Go Plip en negro y gris. |
| [legacy/logo/go-plip-dark-light-purple-legacy.svg](../../assets/legacy/logo/go-plip-dark-light-purple-legacy.svg) | Logo vectorial histórico Go Plip en morado oscuro y claro. |
| [legacy/logo/go-plip-white-lila-legacy.svg](../../assets/legacy/logo/go-plip-white-lila-legacy.svg) | Logo vectorial histórico Go Plip en blanco y lila. |

### Capas gráficas y composiciones históricas

Incluye fondos, máscaras, brillos, sombras, iconos y mockups de varias exploraciones. Algunos efectos están duplicados en raster y vector porque eran formatos de exportación distintos.

| Archivo | Papel en el repositorio |
|---|---|
| [legacy/2x1-icon 2.png](../../assets/legacy/2x1-icon%202.png) | Variante raster del motivo de promoción 2×1. |
| [legacy/BG-mask-vector.svg](../../assets/legacy/BG-mask-vector.svg) | Máscara vectorial de fondo de la exploración gráfica. |
| [legacy/Line 6.svg](../../assets/legacy/Line%206.svg) | Línea vectorial exportada desde el diseño con el nombre de capa original. |
| [legacy/bg-mask-group.png](../../assets/legacy/bg-mask-group.png) | Composición rasterizada del grupo de máscaras del fondo. |
| [legacy/bg-mask.png](../../assets/legacy/bg-mask.png) | Versión raster de la máscara de fondo. |
| [legacy/bg-mask.svg](../../assets/legacy/bg-mask.svg) | Versión vectorial de la máscara de fondo. |
| [legacy/bottom-bg-mask-shape.svg](../../assets/legacy/bottom-bg-mask-shape.svg) | Silueta vectorial de la máscara de fondo para la sección inferior. |
| [legacy/bottom-bg-mask.png](../../assets/legacy/bottom-bg-mask.png) | Versión raster del recorte de fondo de la sección inferior. |
| [legacy/bottom-bg-mask.svg](../../assets/legacy/bottom-bg-mask.svg) | Máscara vectorial de fondo de la sección inferior. |
| [legacy/bottom-card-dotted-line.svg](../../assets/legacy/bottom-card-dotted-line.svg) | Línea punteada de una tarjeta de la sección inferior. |
| [legacy/bottom-card-shadow.svg](../../assets/legacy/bottom-card-shadow.svg) | Sombra de la tarjeta de la sección inferior. |
| [legacy/bottom-glow.svg](../../assets/legacy/bottom-glow.svg) | Brillo vectorial de la sección inferior. |
| [legacy/bottom-shadow.svg](../../assets/legacy/bottom-shadow.svg) | Sombra general de la composición inferior. |
| [legacy/card-bg.svg](../../assets/legacy/card-bg.svg) | Fondo vectorial de tarjeta. |
| [legacy/card-carousel-glow.svg](../../assets/legacy/card-carousel-glow.svg) | Brillo vectorial del carrusel de tarjetas. |
| [legacy/card-carousle-glass.png](../../assets/legacy/card-carousle-glass.png) | Versión raster del efecto de vidrio para tarjeta de carrusel. La ruta mantiene la grafía del export original. |
| [legacy/card-carousle-glass.svg](../../assets/legacy/card-carousle-glass.svg) | Versión vectorial del efecto de vidrio para tarjeta de carrusel. |
| [legacy/card-glow.svg](../../assets/legacy/card-glow.svg) | Capa de brillo de tarjeta. |
| [legacy/card-shadow.svg](../../assets/legacy/card-shadow.svg) | Capa de sombra de tarjeta. |
| [legacy/card-volume.png](../../assets/legacy/card-volume.png) | Volumen/decoración de tarjeta en formato raster. |
| [legacy/card-volume.svg](../../assets/legacy/card-volume.svg) | Volumen/decoración de tarjeta vectorial. |
| [legacy/discount-bomb.png](../../assets/legacy/discount-bomb.png) | Ilustración raster de descuento usada como motivo de tarjeta. |
| [legacy/fluent-color_mail-16.svg](../../assets/legacy/fluent-color_mail-16.svg) | Icono vectorial de correo con el nombre de su set de origen. |
| [legacy/food-bg-hero-negocio.png](../../assets/legacy/food-bg-hero-negocio.png) | Fondo fotográfico de comida para una variante del hero de negocios. |
| [legacy/gift-icon-black 1.png](../../assets/legacy/gift-icon-black%201.png) | Variante negra rasterizada del icono de regalo. |
| [legacy/glow-bottom.svg](../../assets/legacy/glow-bottom.svg) | Brillo de base de la exploración de landing. |
| [legacy/green-button-glow-legacy.png](../../assets/legacy/green-button-glow-legacy.png) | Halo verde raster para un botón de una variante histórica. |
| [legacy/green-button-glow.svg](../../assets/legacy/green-button-glow.svg) | Halo verde vectorial para botón. |
| [legacy/hero-header-bg-image.png](../../assets/legacy/hero-header-bg-image.png) | Capa raster de imagen del fondo de la cabecera hero. |
| [legacy/hero-header-bg.png](../../assets/legacy/hero-header-bg.png) | Fondo raster de la cabecera hero. |
| [legacy/iMac-panel-promos-mockup-SILVER.png](../../assets/legacy/iMac-panel-promos-mockup-SILVER.png) | Variante plateada del mockup del panel de promociones en iMac. |
| [legacy/icon-coins-legacy.png](../../assets/legacy/icon-coins-legacy.png) | Ilustración histórica de monedas. |
| [legacy/icon-gift-legacy.png](../../assets/legacy/icon-gift-legacy.png) | Ilustración histórica de regalo. |
| [legacy/icon-mail-blue-legacy.png](../../assets/legacy/icon-mail-blue-legacy.png) | Ilustración histórica azul de correo. |
| [legacy/icon-mail-blue-shadow-2.png](../../assets/legacy/icon-mail-blue-shadow-2.png) | Variante o capa de sombra del icono azul de correo. |
| [legacy/icon-number-1-blue-legacy.png](../../assets/legacy/icon-number-1-blue-legacy.png) | Indicador gráfico del paso uno en azul. |
| [legacy/icon-number-2-purple-legacy.png](../../assets/legacy/icon-number-2-purple-legacy.png) | Indicador gráfico del paso dos en morado. |
| [legacy/icon-number-3-blue-cyan-legacy.png](../../assets/legacy/icon-number-3-blue-cyan-legacy.png) | Indicador gráfico del paso tres en azul/cian. |
| [legacy/icon-park-outline_check-one.svg](../../assets/legacy/icon-park-outline_check-one.svg) | Icono vectorial de check/confirmación con el nombre de su set de origen. |
| [legacy/icon2.1.png](../../assets/legacy/icon2.1.png) | Variante raster de icono con numeración de exportación 2.1. |
| [legacy/icon3.png](../../assets/legacy/icon3.png) | Variante raster de icono con numeración de exportación 3. |
| [legacy/landing-bottom-footer-bg.png](../../assets/legacy/landing-bottom-footer-bg.png) | Fondo de pie de página de la landing. La ruta identifica si es material editorial o copia histórica. |
| [legacy/mail-icon-shadow.svg](../../assets/legacy/mail-icon-shadow.svg) | Sombra vectorial del icono de correo. |
| [legacy/material-icon-theme_google.svg](../../assets/legacy/material-icon-theme_google.svg) | Export vectorial histórico con el nombre de Google y su set de origen. |
| [legacy/mid-card-glow.svg](../../assets/legacy/mid-card-glow.svg) | Brillo de la tarjeta de la sección media. |
| [legacy/mid-card-icon-2.png](../../assets/legacy/mid-card-icon-2.png) | Segundo icono raster de la sección media de tarjetas. |
| [legacy/mid-card-icon-3.png](../../assets/legacy/mid-card-icon-3.png) | Tercer icono raster de la sección media de tarjetas. |
| [legacy/mid-card-icon-shadow-1-legacy.svg](../../assets/legacy/mid-card-icon-shadow-1-legacy.svg) | Sombra vectorial histórica del primer icono de la tarjeta media. |
| [legacy/mid-card-icon-shadow-2-legacy.svg](../../assets/legacy/mid-card-icon-shadow-2-legacy.svg) | Sombra vectorial histórica del segundo icono de la tarjeta media. |
| [legacy/mid-card-icon-shadow-3-legacy.svg](../../assets/legacy/mid-card-icon-shadow-3-legacy.svg) | Sombra vectorial histórica del tercer icono de la tarjeta media. |
| [legacy/mid-card-icon.png](../../assets/legacy/mid-card-icon.png) | Icono raster base de la tarjeta de la sección media. |
| [legacy/mid-card-volume.svg](../../assets/legacy/mid-card-volume.svg) | Capa vectorial de volumen de la tarjeta de la sección media. |
| [legacy/mobile-phone-glow-legacy.svg](../../assets/legacy/mobile-phone-glow-legacy.svg) | Resplandor vectorial histórico del teléfono de la landing en móvil. |
| [legacy/nothing-phone-2a-optimized-legacy.webp](../../assets/legacy/nothing-phone-2a-optimized-legacy.webp) | Export WebP optimizado histórico del mockup Nothing Phone 2a. |
| [legacy/phone-back-shadow-container-legacy.webp](../../assets/legacy/phone-back-shadow-container-legacy.webp) | Contenedor raster optimizado de la sombra posterior del teléfono. |
| [legacy/phone-back-shadow-container.svg](../../assets/legacy/phone-back-shadow-container.svg) | Composición vectorial de la sombra posterior del teléfono. |
| [legacy/phone-back-shadow-legacy.svg](../../assets/legacy/phone-back-shadow-legacy.svg) | Capa vectorial histórica de sombra posterior del teléfono. |
| [legacy/phone-glow-legacy.svg](../../assets/legacy/phone-glow-legacy.svg) | Resplandor vectorial histórico del teléfono. |
| [legacy/phone-glow.png](../../assets/legacy/phone-glow.png) | Resplandor raster del teléfono. |
| [legacy/phone-shadow.svg](../../assets/legacy/phone-shadow.svg) | Sombra vectorial del teléfono. |
| [legacy/promo-card-bg.png](../../assets/legacy/promo-card-bg.png) | Fondo raster de la tarjeta de promoción. |
| [legacy/promo-card-bg.svg](../../assets/legacy/promo-card-bg.svg) | Fondo vectorial de la tarjeta de promoción. |
| [legacy/promo-card-dotted-line.png](../../assets/legacy/promo-card-dotted-line.png) | Línea punteada de tarjeta de promoción en raster. |
| [legacy/promo-card-dotted-line.svg](../../assets/legacy/promo-card-dotted-line.svg) | Línea punteada de tarjeta de promoción vectorial. |
| [legacy/purple-button-glow-legacy.png](../../assets/legacy/purple-button-glow-legacy.png) | Halo morado en raster de una variante histórica de botón. |
| [legacy/restaurant-bg-hero-negocio.png](../../assets/legacy/restaurant-bg-hero-negocio.png) | Variante fotográfica de restaurante para el hero de negocios. |
| [legacy/shadow-pink-base-legacy.svg](../../assets/legacy/shadow-pink-base-legacy.svg) | Base de sombra rosa de una composición anterior. |
| [legacy/shadow-pink-glow-legacy.svg](../../assets/legacy/shadow-pink-glow-legacy.svg) | Resplandor de sombra rosa de una composición anterior. |
| [legacy/shadow-purple-base-legacy.svg](../../assets/legacy/shadow-purple-base-legacy.svg) | Base de sombra morada de una composición anterior. |
| [legacy/shadow-purple-glow-legacy.svg](../../assets/legacy/shadow-purple-glow-legacy.svg) | Resplandor de sombra morada de una composición anterior. |
| [legacy/shield-check-icon.svg](../../assets/legacy/shield-check-icon.svg) | Motivo vectorial de escudo con check para seguridad o validación visual. |
| [legacy/sign-up-card-BG-legacy.svg](../../assets/legacy/sign-up-card-BG-legacy.svg) | Fondo vectorial histórico de la tarjeta de alta. |
| [legacy/sign-up-card-bg.png](../../assets/legacy/sign-up-card-bg.png) | Fondo raster de la tarjeta de alta. |
| [legacy/sign-up-card-bg.svg](../../assets/legacy/sign-up-card-bg.svg) | Fondo vectorial de la tarjeta de alta. |
| [legacy/sign-up-card-glow-legacy.svg](../../assets/legacy/sign-up-card-glow-legacy.svg) | Brillo vectorial histórico de la tarjeta de alta. |
| [legacy/tabler_copy.png](../../assets/legacy/tabler_copy.png) | Export raster histórico del icono de copiar con identificador de set Tabler. |
| [legacy/vaadin_qrcode.png](../../assets/legacy/vaadin_qrcode.png) | Export raster histórico del icono genérico QR de Vaadin. |
| [legacy/vaadin_qrcode.svg](../../assets/legacy/vaadin_qrcode.svg) | Export vectorial histórico del icono genérico QR de Vaadin. |
| [legacy/yellow-icon-about-us-modal-legacy.svg](../../assets/legacy/yellow-icon-about-us-modal-legacy.svg) | Icono amarillo histórico del modal Sobre nosotros. |
| [legacy/yellow-icon-congrats-modal-legacy.svg](../../assets/legacy/yellow-icon-congrats-modal-legacy.svg) | Icono amarillo histórico del modal de felicitación. |
| [legacy/yellow-icon-info-card-legacy.svg](../../assets/legacy/yellow-icon-info-card-legacy.svg) | Icono amarillo histórico de la tarjeta informativa. |
| [legacy/yellow-icon-info-modal-legacy.svg](../../assets/legacy/yellow-icon-info-modal-legacy.svg) | Icono amarillo histórico del modal de información. |
| [legacy/yellow-icon-platform-modal-legacy.svg](../../assets/legacy/yellow-icon-platform-modal-legacy.svg) | Icono amarillo histórico del modal de plataforma. |

### Centro de ayuda en formato histórico WebP

Copias optimizadas de una familia anterior. Sirven para comparar con los iconos que hoy importan los componentes de ayuda.

| Archivo | Papel en el repositorio |
|---|---|
| [legacy/help-center/chat-support-icon-cliente-legacy.webp](../../assets/legacy/help-center/chat-support-icon-cliente-legacy.webp) | Icono WebP histórico común para chat o contacto con soporte. |
| [legacy/help-center/delete-data-icon-cliente-legacy.webp](../../assets/legacy/help-center/delete-data-icon-cliente-legacy.webp) | Icono WebP histórico común para eliminación de datos. |
| [legacy/help-center/gift-promos-icon-cliente-legacy.webp](../../assets/legacy/help-center/gift-promos-icon-cliente-legacy.webp) | Icono WebP histórico común para promociones y regalos. |
| [legacy/help-center/key-icon-cliente-legacy.webp](../../assets/legacy/help-center/key-icon-cliente-legacy.webp) | Icono WebP histórico común para acceso y credenciales. |
| [legacy/help-center/negocio-icon-cliente-legacy.webp](../../assets/legacy/help-center/negocio-icon-cliente-legacy.webp) | Icono WebP histórico común para negocios. |
| [legacy/help-center/points-icon-cliente-legacy.webp](../../assets/legacy/help-center/points-icon-cliente-legacy.webp) | Icono WebP histórico común para puntos o recompensas. |
| [legacy/help-center/privacy-icon-cliente-legacy.webp](../../assets/legacy/help-center/privacy-icon-cliente-legacy.webp) | Icono WebP histórico común para privacidad. |
| [legacy/help-center/terms-icon-cliente-legacy.webp](../../assets/legacy/help-center/terms-icon-cliente-legacy.webp) | Icono WebP histórico común para términos. |
| [legacy/help-center/verify-account-icon-cliente-legacy.webp](../../assets/legacy/help-center/verify-account-icon-cliente-legacy.webp) | Icono WebP histórico común para verificación de cuenta. |
