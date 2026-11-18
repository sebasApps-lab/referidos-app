# Android por archivo: compilación, integración nativa y scripts

[Volver a Android](../04-android.md) · [Pantallas](04-android-pantallas.md) · [Servicios y estado](04-android-servicios.md)

## Workspace y configuración

| Archivo | Qué hace y por qué existe |
|---|---|
| [README.md](../../apps/referidos-android/README.md) | Describe el propósito de la app, instalación y comandos Android. Léelo antes de intentar levantar Metro o abrir el módulo en Android Studio. |
| [docs/README.md](../../apps/referidos-android/docs/README.md) | Referencia del workspace dentro del monorepo. Explica el flujo operativo, comandos y alcance sobre componentes compartidos. El runbook de raíz desarrolla el procedimiento Windows. |
| [package.json](../../apps/referidos-android/package.json) | Declara workspace, scripts `start`, `android`, lint y typecheck. Especifica React Native y las bibliotecas de navegación, cámara, geolocalización, mapas y estado junto a los paquetes reutilizados desde el monorepo. |
| [app.json](../../apps/referidos-android/app.json) | Declara el nombre usado por `AppRegistry` y `MainActivity`, además del nombre visible del proyecto. Un cambio del nombre de registro requiere coordinación con Kotlin. |
| [babel.config.cjs](../../apps/referidos-android/babel.config.cjs) | Aplica el preset React Native y resuelve aliases `@app`, `@navigation`, `@features` y `@shared` en tiempo de empaquetado. Mantén estos aliases alineados con TypeScript. |
| [tsconfig.json](../../apps/referidos-android/tsconfig.json) | Extiende la configuración TypeScript de React Native, incluye tipos necesarios y replica los aliases de Babel para que editor y compilación encuentren los mismos módulos. |
| [metro.config.cjs](../../apps/referidos-android/metro.config.cjs) | Observa la raíz del workspace y busca dependencias tanto locales como compartidas. Fuerza una copia de React, React Native, navegación y módulos nativos críticos, bloqueando rutas duplicadas para evitar dos registros del mismo componente nativo. |
| [react-native.config.js](../../apps/referidos-android/react-native.config.js) | Fija el package de Android para la CLI de React Native, que lo necesita al compilar e instalar el workspace dentro del monorepo. |
| [env.example.json](../../apps/referidos-android/env.example.json) | Plantilla general del archivo `env.json` local. Documenta las variables consumidas por `env.ts`, con valores de ejemplo. |
| [env.development.example.json](../../apps/referidos-android/env.development.example.json) | Variante de referencia para el runtime de desarrollo. Copia sus campos al archivo local antes de trabajar con desarrollo. |
| [env.staging.example.json](../../apps/referidos-android/env.staging.example.json) | Variante de referencia para staging. Sirve para validar flujos contra ese runtime al configurar URL y clave publicable correspondientes. |
| [env.production.example.json](../../apps/referidos-android/env.production.example.json) | Variante de referencia para producción. Separa la configuración de lanzamiento de los entornos donde se desarrolla o valida. |

## Android nativo y Gradle

| Archivo | Qué hace y por qué existe |
|---|---|
| [android/settings.gradle](../../apps/referidos-android/android/settings.gradle) | Registra `:app`, usa el plugin React Native instalado en el monorepo y llama al autolinking desde el plugin de ajustes. Define el nombre del proyecto Gradle. |
| [android/build.gradle](../../apps/referidos-android/android/build.gradle) | Declara las versiones comunes de SDK/build tools, NDK y Kotlin, configura repositorios y activa el plugin de raíz de React Native. Centraliza versiones de plataforma que también esperan los scripts Windows. |
| [android/gradle.properties](../../apps/referidos-android/android/gradle.properties) | Ajusta memoria Gradle, AndroidX y arquitecturas permitidas. Activa Hermes y deja la nueva arquitectura desactivada en el checkout revisado. |
| [android/gradlew](../../apps/referidos-android/android/gradlew) | Script de Gradle Wrapper para shells Unix. Arranca la versión declarada por el proyecto mediante el JAR incluido. |
| [android/gradlew.bat](../../apps/referidos-android/android/gradlew.bat) | Equivalente del Wrapper para Windows. Los scripts locales invocan este archivo para que se mantenga la misma versión de Gradle. |
| [android/gradle/wrapper/gradle-wrapper.jar](../../apps/referidos-android/android/gradle/wrapper/gradle-wrapper.jar) | Binario del Wrapper que obtiene y ejecuta la distribución fijada en el archivo de propiedades. |
| [android/gradle/wrapper/gradle-wrapper.properties](../../apps/referidos-android/android/gradle/wrapper/gradle-wrapper.properties) | Fija Gradle 8.13 y opciones de descarga/caché de la distribución. Úsalo para rastrear incompatibilidades entre Wrapper y plugin de Android. |
| [android/app/build.gradle](../../apps/referidos-android/android/app/build.gradle) | Módulo que compila el APK. Fija entrada JavaScript, config Metro, enlace nativo, namespace, SDKs, versión y tipos de build. El release acepta propiedades externas de firma y recurre a debug cuando faltan. También tiene una opción para minificar y elige Hermes o JSC según configuración. |
| [android/app/proguard-rules.pro](../../apps/referidos-android/android/app/proguard-rules.pro) | Punto de extensión para reglas de preservación de clases/miembros cuando se activa R8/ProGuard. Gradle lo aplica junto con el archivo base. |
| [android/app/debug.keystore](../../apps/referidos-android/android/app/debug.keystore) | Binario de firma debug usado por Gradle para instalaciones de desarrollo. La firma de distribución requiere un circuito de firma aparte. |
| [android/app/src/main/AndroidManifest.xml](../../apps/referidos-android/android/app/src/main/AndroidManifest.xml) | Declara Activity principal, tema, aplicación, permisos de internet/cámara/localización y el filtro del deep link de auth. Desactiva backup y usa `singleTask`, de modo que el callback se pueda abrir sobre una Activity existente. |
| [android/app/src/debug/AndroidManifest.xml](../../apps/referidos-android/android/app/src/debug/AndroidManifest.xml) | Overlay de debug que permite tráfico HTTP sin cifrar para herramientas locales como Metro. El manifest de `main` no trae ese ajuste. |
| [MainActivity.kt](../../apps/referidos-android/android/app/src/main/java/com/referidosandroid/MainActivity.kt) | Activity Kotlin de React Native. Devuelve el nombre del componente y usa el delegado estándar para iniciar su render. |
| [MainApplication.kt](../../apps/referidos-android/android/app/src/main/java/com/referidosandroid/MainApplication.kt) | Crea el host React Native, carga paquetes autovinculados e inicializa SoLoader. Activa soporte de desarrollo, Hermes y el punto de arranque de nueva arquitectura de acuerdo con `BuildConfig`. |
| [rn_edit_text_material.xml](../../apps/referidos-android/android/app/src/main/res/drawable/rn_edit_text_material.xml) | Drawable de campos de texto. Conserva un workaround de React Native para el selector de estado que podía provocar un error al instanciar el recurso nativo. |
| [strings.xml](../../apps/referidos-android/android/app/src/main/res/values/strings.xml) | Recurso de texto del nombre de la app usado por el manifest. Android lo puede leer antes de que arranque JavaScript. |
| [styles.xml](../../apps/referidos-android/android/app/src/main/res/values/styles.xml) | Declara `AppTheme` de AppCompat para día/noche sin barra de acción y conecta el fondo corregido de campos de texto. |

### Iconos que Android empaqueta

Las dos variantes están declaradas en el manifest. Cada carpeta de densidad aporta la resolución adecuada para que el launcher elija el recurso correspondiente.

| Densidad | Icono normal | Icono redondo |
|---|---|---|
| hdpi | [mipmap-hdpi/ic_launcher.png](../../apps/referidos-android/android/app/src/main/res/mipmap-hdpi/ic_launcher.png) | [mipmap-hdpi/ic_launcher_round.png](../../apps/referidos-android/android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png) |
| mdpi | [mipmap-mdpi/ic_launcher.png](../../apps/referidos-android/android/app/src/main/res/mipmap-mdpi/ic_launcher.png) | [mipmap-mdpi/ic_launcher_round.png](../../apps/referidos-android/android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png) |
| xhdpi | [mipmap-xhdpi/ic_launcher.png](../../apps/referidos-android/android/app/src/main/res/mipmap-xhdpi/ic_launcher.png) | [mipmap-xhdpi/ic_launcher_round.png](../../apps/referidos-android/android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png) |
| xxhdpi | [mipmap-xxhdpi/ic_launcher.png](../../apps/referidos-android/android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png) | [mipmap-xxhdpi/ic_launcher_round.png](../../apps/referidos-android/android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png) |
| xxxhdpi | [mipmap-xxxhdpi/ic_launcher.png](../../apps/referidos-android/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png) | [mipmap-xxxhdpi/ic_launcher_round.png](../../apps/referidos-android/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png) |

## Scripts Windows

| Archivo | Qué hace y por qué existe |
|---|---|
| [check_android_env.cmd](../../scripts/check_android_env.cmd) | Muestra el estado de Java y del SDK para diagnosticar si los comandos dependerán del PATH o de instalaciones locales. |
| [find_sdkmanager.cmd](../../scripts/find_sdkmanager.cmd) | Localiza el ejecutable `sdkmanager` en directorios de herramientas frecuentes del SDK. Sirve cuando la versión `latest` no está ubicada donde la esperan los demás scripts. |
| [install_android_cmdline_tools.cmd](../../scripts/install_android_cmdline_tools.cmd) | Descarga y prepara Command-line Tools de Android para disponer de `sdkmanager`. Es un paso de instalación del equipo. |
| [install_android_sdk_required.cmd](../../scripts/install_android_sdk_required.cmd) | Instala, mediante `sdkmanager`, platform-tools, plataforma, build tools y NDK que requieren las tareas Gradle del repositorio. |
| [install_rn_cli_in_android_app.cmd](../../scripts/install_rn_cli_in_android_app.cmd) | Instala la CLI comunitaria de React Native en el workspace Android usando la ruta de npm de Windows del proyecto. Históricamente resolvía que la app no tuviera CLI disponible. |
| [set_java21_env.cmd](../../scripts/set_java21_env.cmd) | Configura Java 21 y las variables de Android para la sesión de Windows, y comprueba las herramientas disponibles. Las rutas deben corresponder al equipo actual. |
| [run_npm_ci_with_path.cmd](../../scripts/run_npm_ci_with_path.cmd) | Prepara el PATH de Windows para ejecutar `npm ci` donde Node/npm están instalados fuera de un PATH normal. |
| [run_rn_config_android.cmd](../../scripts/run_rn_config_android.cmd) | Ejecuta la inspección de configuración de React Native desde el workspace correcto. Sirve para investigar el autolinking y la detección de proyecto. |
| [run_android_gradle_tasks.cmd](../../scripts/run_android_gradle_tasks.cmd) | Configura Java/SDK y ejecuta la lista de tareas con `gradlew.bat`. Es un diagnóstico del módulo antes de ensamblar. |
| [run_android_assemble_debug.cmd](../../scripts/run_android_assemble_debug.cmd) | Prepara rutas del toolchain y directorios de caché, comprueba versiones esperadas y llama al ejecutor PowerShell del armado debug. |
| [run_android_assemble_debug_inner.ps1](../../scripts/run_android_assemble_debug_inner.ps1) | Lanza Gradle con timeout y captura de logs, mata el árbol de procesos si se bloquea y controla un reintento. Contiene además limpieza de procesos Java/Gradle por nombre que puede interferir con otras sesiones de compilación del equipo. |
| [run_android_assemble_release.cmd](../../scripts/run_android_assemble_release.cmd) | Configura SDK/JDK, elige variables de firma, prepara un keystore de prueba si falta y pasa el control al ejecutor PowerShell. Se usa para ensamblado local de prueba de release. |
| [run_android_assemble_release_inner.ps1](../../scripts/run_android_assemble_release_inner.ps1) | Establece variables para firma y caché, activa minificación y ejecuta `app:assembleRelease` con timeout y capturas. Es el último paso antes del APK de prueba. |

## Herramientas de desarrollo y fases

| Archivo | Qué hace y por qué existe |
|---|---|
| [start-android-metro.mjs](../../tooling/android/start-android-metro.mjs) | Comprueba si Metro ya responde en el puerto, distingue un conflicto de otro proceso y ejecuta el script del workspace con `--reset-cache`. Usa la invocación adecuada para Windows o Unix. |
| [phase1-runtime-health.mjs](../../tooling/android/phase1-runtime-health.mjs) | Comprueba resolución de dependencias críticas y coherencia del autolinking. Advierte de duplicados de paquetes nativos que pueden causar error antes de montar una pantalla. |
| [phase2-auth-parity-check.mjs](../../tooling/android/phase2-auth-parity-check.mjs) | Ejecuta aserciones de reglas compartidas de resolución de pasos de registro y verificación. Sirve durante cambios al dominio de auth que impactan la máquina móvil. |
| [phase3-shell-check.mjs](../../tooling/android/phase3-shell-check.mjs) | Inspecciona textos y piezas esperadas del shell: persistencia de pestañas, historial, reseteo de estado y modales. |
| [phase4-cliente-check.mjs](../../tooling/android/phase4-cliente-check.mjs) | Revisa anclas de la implementación de cliente: accesos de inicio, clasificación QR, historial, perfil y operaciones relacionadas. |
| [phase5-negocio-check.mjs](../../tooling/android/phase5-negocio-check.mjs) | Revisa presencia de lógica de negocio para inicio, escáner, canje, gestión de promociones/sucursales y perfil. |
| [phase6-native-check.mjs](../../tooling/android/phase6-native-check.mjs) | Comprueba presencia del mapa nativo, GPS, lector, permisos e integración de políticas de seguridad y perfil. |
| [phase7-observability-check.mjs](../../tooling/android/phase7-observability-check.mjs) | Comprueba componentes de saneamiento, deduplicación, muestreo, límites, identificación y lectura de eventos. |
| [phase8-support-admin-check.mjs](../../tooling/android/phase8-support-admin-check.mjs) | Revisa conexiones entre perfiles, tickets, inbox, soporte operativo, pantallas de administración y catálogo vigente. |
| [phase9-parity-check.mjs](../../tooling/android/phase9-parity-check.mjs) | Comprueba la matriz histórica y diferentes partes del alcance de paridad, incluidas pantallas administrativas y telemetría de arranque. |
| [phase9-release-check.mjs](../../tooling/android/phase9-release-check.mjs) | Inspecciona configuración de firma/templates y espera APK debug/release, metadata de firma y mapping de minificación. Comprueba artefactos presentes en disco como parte del flujo de prueba. |
| [verify-android-scope.mjs](../../tooling/guardrails/verify-android-scope.mjs) | Compara `git diff --name-only` con una lista de prefijos y una línea base opcional. Pertenece al circuito de migración Android. Sus prefijos históricos no incluyen todos los nombres actuales de los paquetes compartidos y el diff sin argumentos cubre los cambios unstaged. |
| [ci-android-pr.yml](../../.github/workflows/ci-android-pr.yml) | Workflow de lint y typecheck para cambios Android y de sus paquetes relevantes en PR hacia staging/main. El flujo de compilación local y firma tiene sus propios scripts. |

La mayoría de los checks de fases busca símbolos en archivos. La compilación confirma el empaquetado y la prueba en un dispositivo confirma el recorrido real. El runbook y la matriz de paridad históricas ayudan a elegir qué recorrido intentar para un cambio concreto. [Runbook Android](../../docs/android-console-runbook.md) · [Matriz de paridad](../../docs/android-parity-certification-matrix.md)
