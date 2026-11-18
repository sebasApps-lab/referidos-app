# Android nativo y scripts del toolchain

[Volver a la referencia de infraestructura](README.md)

Los enlaces a líneas apuntan al checkout analizado. Las relaciones se obtuvieron leyendo declaraciones, imports y configuraciones. Los valores de credenciales y datos operativos se dejan en sus archivos de origen.

## Archivos en este capítulo

- [apps/referidos-android/android/app/build.gradle](#appsreferidos-androidandroidappbuildgradle)
- [apps/referidos-android/android/app/proguard-rules.pro](#appsreferidos-androidandroidappproguard-rulespro)
- [apps/referidos-android/android/app/src/debug/AndroidManifest.xml](#appsreferidos-androidandroidappsrcdebugandroidmanifestxml)
- [apps/referidos-android/android/app/src/main/AndroidManifest.xml](#appsreferidos-androidandroidappsrcmainandroidmanifestxml)
- [apps/referidos-android/android/app/src/main/java/com/referidosandroid/MainActivity.kt](#appsreferidos-androidandroidappsrcmainjavacomreferidosandroidmainactivitykt)
- [apps/referidos-android/android/app/src/main/java/com/referidosandroid/MainApplication.kt](#appsreferidos-androidandroidappsrcmainjavacomreferidosandroidmainapplicationkt)
- [apps/referidos-android/android/app/src/main/res/drawable/rn_edit_text_material.xml](#appsreferidos-androidandroidappsrcmainresdrawablern_edit_text_materialxml)
- [apps/referidos-android/android/app/src/main/res/values/strings.xml](#appsreferidos-androidandroidappsrcmainresvaluesstringsxml)
- [apps/referidos-android/android/app/src/main/res/values/styles.xml](#appsreferidos-androidandroidappsrcmainresvaluesstylesxml)
- [apps/referidos-android/android/build.gradle](#appsreferidos-androidandroidbuildgradle)
- [apps/referidos-android/android/gradle.properties](#appsreferidos-androidandroidgradleproperties)
- [apps/referidos-android/android/gradle/wrapper/gradle-wrapper.properties](#appsreferidos-androidandroidgradlewrappergradle-wrapperproperties)
- [apps/referidos-android/android/gradlew](#appsreferidos-androidandroidgradlew)
- [apps/referidos-android/android/gradlew.bat](#appsreferidos-androidandroidgradlewbat)
- [apps/referidos-android/android/settings.gradle](#appsreferidos-androidandroidsettingsgradle)
- [scripts/check_android_env.cmd](#scriptscheck_android_envcmd)
- [scripts/find_sdkmanager.cmd](#scriptsfind_sdkmanagercmd)
- [scripts/install_android_cmdline_tools.cmd](#scriptsinstall_android_cmdline_toolscmd)
- [scripts/install_android_sdk_required.cmd](#scriptsinstall_android_sdk_requiredcmd)
- [scripts/install_rn_cli_in_android_app.cmd](#scriptsinstall_rn_cli_in_android_appcmd)
- [scripts/run_android_assemble_debug.cmd](#scriptsrun_android_assemble_debugcmd)
- [scripts/run_android_assemble_debug_inner.ps1](#scriptsrun_android_assemble_debug_innerps1)
- [scripts/run_android_assemble_release.cmd](#scriptsrun_android_assemble_releasecmd)
- [scripts/run_android_assemble_release_inner.ps1](#scriptsrun_android_assemble_release_innerps1)
- [scripts/run_android_gradle_tasks.cmd](#scriptsrun_android_gradle_taskscmd)
- [scripts/run_npm_ci_with_path.cmd](#scriptsrun_npm_ci_with_pathcmd)
- [scripts/run_rn_config_android.cmd](#scriptsrun_rn_config_androidcmd)
- [scripts/set_java21_env.cmd](#scriptsset_java21_envcmd)

## apps/referidos-android/android/app/build.gradle

[Abrir fuente](../../../apps/referidos-android/android/app/build.gradle) · 146 líneas de texto.

Módulo que compila el APK. Fija entrada JavaScript, config Metro, enlace nativo, namespace, SDKs, versión y tipos de build. El release acepta propiedades externas de firma y recurre a debug cuando faltan. También tiene una opción para minificar y elige Hermes o JSC según configuración.

- [apply plugin](../../../apps/referidos-android/android/app/build.gradle#L1). Parámetro del bloque Gradle que organiza esta etapa de compilación.
- [apply plugin](../../../apps/referidos-android/android/app/build.gradle#L2). Parámetro del bloque Gradle que organiza esta etapa de compilación.
- [apply plugin](../../../apps/referidos-android/android/app/build.gradle#L3). Parámetro del bloque Gradle que organiza esta etapa de compilación.
- [react](../../../apps/referidos-android/android/app/build.gradle#L9). Opciones del plugin React Native para ubicar archivos y empaquetar JavaScript.
- [autolinkLibrariesWithApp](../../../apps/referidos-android/android/app/build.gradle#L56). Vincula al módulo :app las dependencias detectadas por autolinking.
- [android](../../../apps/referidos-android/android/app/build.gradle#L93). Opciones del módulo de aplicación, SDK, identidad y variantes.
- [ndkVersion](../../../apps/referidos-android/android/app/build.gradle#L94). Versión de NDK compartida con los wrappers de compilación y módulos de C/C++.
- [buildToolsVersion](../../../apps/referidos-android/android/app/build.gradle#L95). Versión de Android Build Tools usada en las tareas Gradle.
- [compileSdk](../../../apps/referidos-android/android/app/build.gradle#L96). Parámetro del bloque Gradle que organiza esta etapa de compilación.
- [defaultConfig](../../../apps/referidos-android/android/app/build.gradle#L99). Valores base de identificador, versión y SDK para todas las variantes del módulo.
- [minSdkVersion](../../../apps/referidos-android/android/app/build.gradle#L101). Menor API Android admitida al instalar.
- [targetSdkVersion](../../../apps/referidos-android/android/app/build.gradle#L102). Comportamiento de plataforma que declara la aplicación compilada.
- [signingConfigs](../../../apps/referidos-android/android/app/build.gradle#L106). Configura los materiales de firma que pueden usar las variantes. Revisa la diferencia entre credenciales externas y la firma de prueba.
- [debug](../../../apps/referidos-android/android/app/build.gradle#L107). Bloque de la variante debug. Según el padre, configura su firma o cómo se compila.
- [release](../../../apps/referidos-android/android/app/build.gradle#L113). Bloque de la variante release. Según el padre, configura firma o el empaquetado y minificación.
- [storeFile](../../../apps/referidos-android/android/app/build.gradle#L115). Parámetro del bloque Gradle que organiza esta etapa de compilación.
- [buildTypes](../../../apps/referidos-android/android/app/build.gradle#L122). Define diferencias de empaquetado y publicación entre debug y release.
- [debug](../../../apps/referidos-android/android/app/build.gradle#L123). Bloque de la variante debug. Según el padre, configura su firma o cómo se compila.
- [release](../../../apps/referidos-android/android/app/build.gradle#L126). Bloque de la variante release. Según el padre, configura firma o el empaquetado y minificación.
- [proguardFiles](../../../apps/referidos-android/android/app/build.gradle#L131). Parámetro del bloque Gradle que organiza esta etapa de compilación.
- [dependencies](../../../apps/referidos-android/android/app/build.gradle#L136). Dependencias usadas por el plugin o la aplicación, según el bloque que contiene la declaración.
- [implementation](../../../apps/referidos-android/android/app/build.gradle#L138). Dependencia requerida al construir o ejecutar la aplicación.
- [implementation](../../../apps/referidos-android/android/app/build.gradle#L141). Dependencia requerida al construir o ejecutar la aplicación.
- [implementation](../../../apps/referidos-android/android/app/build.gradle#L143). Dependencia requerida al construir o ejecutar la aplicación.

## apps/referidos-android/android/app/proguard-rules.pro

[Abrir fuente](../../../apps/referidos-android/android/app/proguard-rules.pro) · 11 líneas de texto.

Punto de extensión para reglas de preservación de clases/miembros cuando se activa R8/ProGuard. Gradle lo aplica junto con el archivo base.

Punto de configuración local de minificación del módulo Android. El pipeline lo lee cuando la variante selecciona las reglas ProGuard. [Gradle de app](../../../apps/referidos-android/android/app/build.gradle#L128).

## apps/referidos-android/android/app/src/debug/AndroidManifest.xml

[Abrir fuente](../../../apps/referidos-android/android/app/src/debug/AndroidManifest.xml) · 10 líneas de texto.

Overlay de debug que permite tráfico HTTP sin cifrar para herramientas locales como Metro. El manifest de `main` no trae ese ajuste.

- [L2](../../../apps/referidos-android/android/app/src/debug/AndroidManifest.xml#L2) `<manifest>` `http://schemas.android.com/apk/res/android`. Raíz del manifiesto que Android combina con recursos y overlays.
- [L5](../../../apps/referidos-android/android/app/src/debug/AndroidManifest.xml#L5) `<application>`. Identidad y atributos que Android aplica al proceso de la aplicación. Atributos `android:usesCleartextTraffic`, `tools:targetApi`, `tools:ignore`.

## apps/referidos-android/android/app/src/main/AndroidManifest.xml

[Abrir fuente](../../../apps/referidos-android/android/app/src/main/AndroidManifest.xml) · 39 líneas de texto.

Declara Activity principal, tema, aplicación, permisos de internet/cámara/localización y el filtro del deep link de auth. Desactiva backup y usa `singleTask`, de modo que el callback se pueda abrir sobre una Activity existente.

- [L1](../../../apps/referidos-android/android/app/src/main/AndroidManifest.xml#L1) `<manifest>` `http://schemas.android.com/apk/res/android`. Raíz del manifiesto que Android combina con recursos y overlays.
- [L3](../../../apps/referidos-android/android/app/src/main/AndroidManifest.xml#L3) `<uses-permission>` `android.permission.INTERNET`. Permiso que necesita declarar la aplicación antes de usar esa capacidad. Atributos `android:name`.
- [L4](../../../apps/referidos-android/android/app/src/main/AndroidManifest.xml#L4) `<uses-permission>` `android.permission.CAMERA`. Permiso que necesita declarar la aplicación antes de usar esa capacidad. Atributos `android:name`.
- [L5](../../../apps/referidos-android/android/app/src/main/AndroidManifest.xml#L5) `<uses-permission>` `android.permission.ACCESS_FINE_LOCATION`. Permiso que necesita declarar la aplicación antes de usar esa capacidad. Atributos `android:name`.
- [L6](../../../apps/referidos-android/android/app/src/main/AndroidManifest.xml#L6) `<uses-permission>` `android.permission.ACCESS_COARSE_LOCATION`. Permiso que necesita declarar la aplicación antes de usar esa capacidad. Atributos `android:name`.
- [L8](../../../apps/referidos-android/android/app/src/main/AndroidManifest.xml#L8) `<application>` `.MainApplication`. Identidad y atributos que Android aplica al proceso de la aplicación. Atributos `android:name`, `android:label`, `android:icon`, `android:roundIcon`, `android:allowBackup`, `android:theme`, `android:supportsRtl`.
- [L16](../../../apps/referidos-android/android/app/src/main/AndroidManifest.xml#L16) `<activity>` `.MainActivity`. Componente Android que Android inicia según manifest o filtro. Atributos `android:name`, `android:label`, `android:configChanges`, `android:launchMode`, `android:windowSoftInputMode`, `android:exported`.
- [L23](../../../apps/referidos-android/android/app/src/main/AndroidManifest.xml#L23) `<intent-filter>`. Agrupa acciones, categorías y datos que determinan qué intent acepta la Activity.
- [L24](../../../apps/referidos-android/android/app/src/main/AndroidManifest.xml#L24) `<action>` `android.intent.action.MAIN`. Acción de intent que participa en la selección de Activity. Atributos `android:name`.
- [L25](../../../apps/referidos-android/android/app/src/main/AndroidManifest.xml#L25) `<category>` `android.intent.category.LAUNCHER`. Categoría que debe satisfacer el intent para abrir esta Activity. Atributos `android:name`.
- [L27](../../../apps/referidos-android/android/app/src/main/AndroidManifest.xml#L27) `<intent-filter>`. Agrupa acciones, categorías y datos que determinan qué intent acepta la Activity.
- [L28](../../../apps/referidos-android/android/app/src/main/AndroidManifest.xml#L28) `<action>` `android.intent.action.VIEW`. Acción de intent que participa en la selección de Activity. Atributos `android:name`.
- [L29](../../../apps/referidos-android/android/app/src/main/AndroidManifest.xml#L29) `<category>` `android.intent.category.DEFAULT`. Categoría que debe satisfacer el intent para abrir esta Activity. Atributos `android:name`.
- [L30](../../../apps/referidos-android/android/app/src/main/AndroidManifest.xml#L30) `<category>` `android.intent.category.BROWSABLE`. Categoría que debe satisfacer el intent para abrir esta Activity. Atributos `android:name`.
- [L31](../../../apps/referidos-android/android/app/src/main/AndroidManifest.xml#L31) `<data>`. Restringe el filtro por esquema, host o ruta para dirigir enlaces a la Activity correcta. Atributos `android:scheme`, `android:host`, `android:pathPrefix`.

## apps/referidos-android/android/app/src/main/java/com/referidosandroid/MainActivity.kt

[Abrir fuente](../../../apps/referidos-android/android/app/src/main/java/com/referidosandroid/MainActivity.kt) · 23 líneas de texto.

Activity Kotlin de React Native. Devuelve el nombre del componente y usa el delegado estándar para iniciar su render.

- [MainActivity](../../../apps/referidos-android/android/app/src/main/java/com/referidosandroid/MainActivity.kt#L8). Activity declarada en el manifest. Arranca el componente registrado por JavaScript.
- [getMainComponentName](../../../apps/referidos-android/android/app/src/main/java/com/referidosandroid/MainActivity.kt#L14). Devuelve el nombre esperado en AppRegistry para conectar Kotlin con index.js.
- [createReactActivityDelegate](../../../apps/referidos-android/android/app/src/main/java/com/referidosandroid/MainActivity.kt#L20). Crea el delegado estándar para renderizar el componente principal con el flag Fabric de compilación.

Relacionado: [registro AppRegistry en index.js](../../../apps/referidos-android/index.js).

## apps/referidos-android/android/app/src/main/java/com/referidosandroid/MainApplication.kt

[Abrir fuente](../../../apps/referidos-android/android/app/src/main/java/com/referidosandroid/MainApplication.kt) · 45 líneas de texto.

Crea el host React Native, carga paquetes autovinculados e inicializa SoLoader. Activa soporte de desarrollo, Hermes y el punto de arranque de nueva arquitectura de acuerdo con `BuildConfig`.

- [MainApplication](../../../apps/referidos-android/android/app/src/main/java/com/referidosandroid/MainApplication.kt#L15). Application creada por Android al abrir el proceso. Configura el host encargado del runtime de React Native.
- [reactNativeHost](../../../apps/referidos-android/android/app/src/main/java/com/referidosandroid/MainApplication.kt#L17). Define el host y las opciones nativas que necesita React Native.
- [getPackages](../../../apps/referidos-android/android/app/src/main/java/com/referidosandroid/MainApplication.kt#L19). Entrega los paquetes nativos detectados por autolinking para registro del host.
- [getJSMainModuleName](../../../apps/referidos-android/android/app/src/main/java/com/referidosandroid/MainApplication.kt#L25). Selecciona el módulo JavaScript que arranca Metro en desarrollo.
- [getUseDeveloperSupport](../../../apps/referidos-android/android/app/src/main/java/com/referidosandroid/MainApplication.kt#L27). Vincula las opciones de depuración del host al tipo de build.
- [isNewArchEnabled](../../../apps/referidos-android/android/app/src/main/java/com/referidosandroid/MainApplication.kt#L29). Propaga el flag de compilación de nueva arquitectura al host.
- [isHermesEnabled](../../../apps/referidos-android/android/app/src/main/java/com/referidosandroid/MainApplication.kt#L30). Propaga la selección del motor Hermes al host.
- [reactHost](../../../apps/referidos-android/android/app/src/main/java/com/referidosandroid/MainApplication.kt#L33). Expone el host de nueva API conectado al contexto de aplicación.
- [onCreate](../../../apps/referidos-android/android/app/src/main/java/com/referidosandroid/MainApplication.kt#L36). Inicializa SoLoader y, cuando BuildConfig lo pide, carga la nueva arquitectura antes de ejecutar JavaScript.

## apps/referidos-android/android/app/src/main/res/drawable/rn_edit_text_material.xml

[Abrir fuente](../../../apps/referidos-android/android/app/src/main/res/drawable/rn_edit_text_material.xml) · 38 líneas de texto.

Drawable de campos de texto. Conserva un workaround de React Native para el selector de estado que podía provocar un error al instanciar el recurso nativo.

- [L23](../../../apps/referidos-android/android/app/src/main/res/drawable/rn_edit_text_material.xml#L23) `<selector>`. Elegibilidad de los drawables según estado del control.
- [L29](../../../apps/referidos-android/android/app/src/main/res/drawable/rn_edit_text_material.xml#L29) `<item>`. Entrada dentro del tema, selector o configuración XML. Atributos `android:state_pressed`, `android:state_focused`, `android:drawable`.
- [L33](../../../apps/referidos-android/android/app/src/main/res/drawable/rn_edit_text_material.xml#L33) `<item>`. Entrada dentro del tema, selector o configuración XML. Atributos `android:state_enabled`, `android:drawable`.
- [L34](../../../apps/referidos-android/android/app/src/main/res/drawable/rn_edit_text_material.xml#L34) `<item>`. Entrada dentro del tema, selector o configuración XML. Atributos `android:drawable`.

## apps/referidos-android/android/app/src/main/res/values/strings.xml

[Abrir fuente](../../../apps/referidos-android/android/app/src/main/res/values/strings.xml) · 4 líneas de texto.

Recurso de texto del nombre de la app usado por el manifest. Android lo puede leer antes de que arranque JavaScript.

- [L1](../../../apps/referidos-android/android/app/src/main/res/values/strings.xml#L1) `<resources>`. Catálogo de recursos compilados por Android.
- [L2](../../../apps/referidos-android/android/app/src/main/res/values/strings.xml#L2) `<string>` `app_name`. Recurso de texto que se consume desde el manifest u otros recursos nativos. Atributos `name`.

## apps/referidos-android/android/app/src/main/res/values/styles.xml

[Abrir fuente](../../../apps/referidos-android/android/app/src/main/res/values/styles.xml) · 10 líneas de texto.

Declara `AppTheme` de AppCompat para día/noche sin barra de acción y conecta el fondo corregido de campos de texto.

- [L1](../../../apps/referidos-android/android/app/src/main/res/values/styles.xml#L1) `<resources>`. Catálogo de recursos compilados por Android.
- [L4](../../../apps/referidos-android/android/app/src/main/res/values/styles.xml#L4) `<style>` `AppTheme`. Tema o estilo nombrado que Android aplica a la Activity. Atributos `name`, `parent`.
- [L6](../../../apps/referidos-android/android/app/src/main/res/values/styles.xml#L6) `<item>` `android:editTextBackground`. Entrada dentro del tema, selector o configuración XML. Atributos `name`.

## apps/referidos-android/android/build.gradle

[Abrir fuente](../../../apps/referidos-android/android/build.gradle) · 22 líneas de texto.

Declara las versiones comunes de SDK/build tools, NDK y Kotlin, configura repositorios y activa el plugin de raíz de React Native. Centraliza versiones de plataforma que también esperan los scripts Windows.

- [buildscript](../../../apps/referidos-android/android/build.gradle#L1). Configuración de herramientas y dependencias de build compartida por módulos Android.
- [ext](../../../apps/referidos-android/android/build.gradle#L2). Declara versiones y propiedades comunes que los módulos leen de rootProject.
- [repositories](../../../apps/referidos-android/android/build.gradle#L10). Declara los repositorios donde Gradle resuelve plugins y bibliotecas.
- [dependencies](../../../apps/referidos-android/android/build.gradle#L14). Dependencias usadas por el plugin o la aplicación, según el bloque que contiene la declaración.
- [apply plugin](../../../apps/referidos-android/android/build.gradle#L21). Parámetro del bloque Gradle que organiza esta etapa de compilación.

## apps/referidos-android/android/gradle.properties

[Abrir fuente](../../../apps/referidos-android/android/gradle.properties) · 43 líneas de texto.

Ajusta memoria Gradle, AndroidX y arquitecturas permitidas. Activa Hermes y deja la nueva arquitectura desactivada en el checkout revisado.

- [org.gradle.jvmargs](../../../apps/referidos-android/android/gradle.properties#L13). Memoria y opciones de la JVM que ejecuta Gradle.
- [kotlin.compiler.execution.strategy](../../../apps/referidos-android/android/gradle.properties#L16). Controla cómo se inicia el compilador Kotlin para el build.
- [android.useAndroidX](../../../apps/referidos-android/android/gradle.properties#L26). Selecciona la familia de componentes AndroidX.
- [reactNativeArchitectures](../../../apps/referidos-android/android/gradle.properties#L31). Lista las arquitecturas de CPU empaquetadas por defecto.
- [newArchEnabled](../../../apps/referidos-android/android/gradle.properties#L38). Controla si el build usa la nueva arquitectura de React Native.
- [hermesEnabled](../../../apps/referidos-android/android/gradle.properties#L42). Selecciona Hermes en vez del motor alternativo.

## apps/referidos-android/android/gradle/wrapper/gradle-wrapper.properties

[Abrir fuente](../../../apps/referidos-android/android/gradle/wrapper/gradle-wrapper.properties) · 8 líneas de texto.

Fija Gradle 8.13 y opciones de descarga/caché de la distribución. Úsalo para rastrear incompatibilidades entre Wrapper y plugin de Android.

- [distributionBase](../../../apps/referidos-android/android/gradle/wrapper/gradle-wrapper.properties#L1). Base donde el Gradle Wrapper guarda su distribución descargada.
- [distributionPath](../../../apps/referidos-android/android/gradle/wrapper/gradle-wrapper.properties#L2). Ruta relativa donde el Wrapper conserva la distribución.
- [distributionUrl](../../../apps/referidos-android/android/gradle/wrapper/gradle-wrapper.properties#L3). Ubicación de la distribución de Gradle fijada por el repositorio.
- [networkTimeout](../../../apps/referidos-android/android/gradle/wrapper/gradle-wrapper.properties#L4). Tiempo máximo que espera el Wrapper al descargar Gradle.
- [validateDistributionUrl](../../../apps/referidos-android/android/gradle/wrapper/gradle-wrapper.properties#L5). Activa comprobaciones sobre la URL de la distribución.
- [zipStoreBase](../../../apps/referidos-android/android/gradle/wrapper/gradle-wrapper.properties#L6). Base usada para guardar el ZIP de Gradle.
- [zipStorePath](../../../apps/referidos-android/android/gradle/wrapper/gradle-wrapper.properties#L7). Ruta relativa del ZIP de Gradle.

## apps/referidos-android/android/gradlew

[Abrir fuente](../../../apps/referidos-android/android/gradlew) · 252 líneas de texto.

Script de Gradle Wrapper para shells Unix. Arranca la versión declarada por el proyecto mediante el JAR incluido.

El Wrapper resuelve Java y llama a la clase principal del JAR de Gradle del proyecto. [Distribución fijada](../../../apps/referidos-android/android/gradle/wrapper/gradle-wrapper.properties).

- [L74](../../../apps/referidos-android/android/gradlew#L74) `APP_HOME`. Etapa de arranque del lanzador y resolución del proceso Java.
- [L89](../../../apps/referidos-android/android/gradlew#L89) `APP_HOME`. Etapa de arranque del lanzador y resolución del proceso Java.
- [L117](../../../apps/referidos-android/android/gradlew#L117) `CLASSPATH`. Etapa de arranque del lanzador y resolución del proceso Java.
- [L124](../../../apps/referidos-android/android/gradlew#L124) `JAVACMD`. Etapa de arranque del lanzador y resolución del proceso Java.
- [L126](../../../apps/referidos-android/android/gradlew#L126) `JAVACMD`. Etapa de arranque del lanzador y resolución del proceso Java.
- [L135](../../../apps/referidos-android/android/gradlew#L135) `JAVACMD`. Etapa de arranque del lanzador y resolución del proceso Java.
- [L174](../../../apps/referidos-android/android/gradlew#L174) `APP_HOME`. Etapa de arranque del lanzador y resolución del proceso Java.
- [L175](../../../apps/referidos-android/android/gradlew#L175) `CLASSPATH`. Etapa de arranque del lanzador y resolución del proceso Java.
- [L177](../../../apps/referidos-android/android/gradlew#L177) `JAVACMD`. Etapa de arranque del lanzador y resolución del proceso Java.
- [L251](../../../apps/referidos-android/android/gradlew#L251) `exec`. Etapa de arranque del lanzador y resolución del proceso Java.

## apps/referidos-android/android/gradlew.bat

[Abrir fuente](../../../apps/referidos-android/android/gradlew.bat) · 95 líneas de texto.

Equivalente del Wrapper para Windows. Los scripts locales invocan este archivo para que se mantenga la misma versión de Gradle.

El Wrapper resuelve Java y llama a la clase principal del JAR de Gradle del proyecto. [Distribución fijada](../../../apps/referidos-android/android/gradle/wrapper/gradle-wrapper.properties).

- [L33](../../../apps/referidos-android/android/gradlew.bat#L33) `APP_HOME`. Etapa de arranque del lanzador y resolución del proceso Java.
- [L44](../../../apps/referidos-android/android/gradlew.bat#L44) `JAVA_EXE`. Etapa de arranque del lanzador y resolución del proceso Java.
- [L56](../../../apps/referidos-android/android/gradlew.bat#L56) `:findJavaFromJavaHome`. Etapa de arranque del lanzador y resolución del proceso Java.
- [L58](../../../apps/referidos-android/android/gradlew.bat#L58) `JAVA_EXE`. Etapa de arranque del lanzador y resolución del proceso Java.
- [L70](../../../apps/referidos-android/android/gradlew.bat#L70) `:execute`. Etapa de arranque del lanzador y resolución del proceso Java.
- [L73](../../../apps/referidos-android/android/gradlew.bat#L73) `CLASSPATH`. Etapa de arranque del lanzador y resolución del proceso Java.
- [L79](../../../apps/referidos-android/android/gradlew.bat#L79) `:end`. Etapa de arranque del lanzador y resolución del proceso Java.
- [L83](../../../apps/referidos-android/android/gradlew.bat#L83) `:fail`. Etapa de arranque del lanzador y resolución del proceso Java.

## apps/referidos-android/android/settings.gradle

[Abrir fuente](../../../apps/referidos-android/android/settings.gradle) · 7 líneas de texto.

Registra `:app`, usa el plugin React Native instalado en el monorepo y llama al autolinking desde el plugin de ajustes. Define el nombre del proyecto Gradle.

- [pluginManagement](../../../apps/referidos-android/android/settings.gradle#L1). Localización del plugin de Gradle de React Native dentro del monorepo.
- [plugins](../../../apps/referidos-android/android/settings.gradle#L2). Plugins Gradle que configuran la aplicación, Kotlin o React Native.
- [extensions.configure](../../../apps/referidos-android/android/settings.gradle#L3). Pide al plugin descubrir módulos nativos leyendo la configuración de la CLI.
- [rootProject.name](../../../apps/referidos-android/android/settings.gradle#L4). Nombre que Gradle presenta para el proyecto.
- [include](../../../apps/referidos-android/android/settings.gradle#L5). Conecta un módulo o build auxiliar al proyecto registrado por Gradle.
- [includeBuild](../../../apps/referidos-android/android/settings.gradle#L6). Conecta un módulo o build auxiliar al proyecto registrado por Gradle.

## scripts/check_android_env.cmd

[Abrir fuente](../../../scripts/check_android_env.cmd) · 59 líneas de texto.

Muestra el estado de Java y del SDK para diagnosticar si los comandos dependerán del PATH o de instalaciones locales.

- [L3](../../../scripts/check_android_env.cmd#L3) Selección o validación de la instalación de Java.
- [L7](../../../scripts/check_android_env.cmd#L7) Decide o propaga el estado de ejecución al proceso que lo invocó.
- [L10](../../../scripts/check_android_env.cmd#L10) Valida una ruta o herramienta antes de continuar.
- [L33](../../../scripts/check_android_env.cmd#L33) Descubrimiento, comprobación o instalación de herramientas del Android SDK.
- [L53](../../../scripts/check_android_env.cmd#L53) Delegación al Gradle Wrapper o preparación de la tarea del módulo Android.

## scripts/find_sdkmanager.cmd

[Abrir fuente](../../../scripts/find_sdkmanager.cmd) · 15 líneas de texto.

Localiza el ejecutable `sdkmanager` en directorios de herramientas frecuentes del SDK. Sirve cuando la versión `latest` no está ubicada donde la esperan los demás scripts.

- [L3](../../../scripts/find_sdkmanager.cmd#L3) Descubrimiento, comprobación o instalación de herramientas del Android SDK.
- [L4](../../../scripts/find_sdkmanager.cmd#L4) Valida una ruta o herramienta antes de continuar.

## scripts/install_android_cmdline_tools.cmd

[Abrir fuente](../../../scripts/install_android_cmdline_tools.cmd) · 62 líneas de texto.

Descarga y prepara Command-line Tools de Android para disponer de `sdkmanager`. Es un paso de instalación del equipo.

- [L12](../../../scripts/install_android_cmdline_tools.cmd#L12) Descubrimiento, comprobación o instalación de herramientas del Android SDK.
- [L14](../../../scripts/install_android_cmdline_tools.cmd#L14) Decide o propaga el estado de ejecución al proceso que lo invocó.
- [L17](../../../scripts/install_android_cmdline_tools.cmd#L17) Valida una ruta o herramienta antes de continuar.
- [L24](../../../scripts/install_android_cmdline_tools.cmd#L24) Adquisición o extracción de los archivos de herramientas del SDK.
- [L31](../../../scripts/install_android_cmdline_tools.cmd#L31) Prepara directorios de trabajo para el comando.

## scripts/install_android_sdk_required.cmd

[Abrir fuente](../../../scripts/install_android_sdk_required.cmd) · 18 líneas de texto.

Instala, mediante `sdkmanager`, platform-tools, plataforma, build tools y NDK que requieren las tareas Gradle del repositorio.

- [L3](../../../scripts/install_android_sdk_required.cmd#L3) Descubrimiento, comprobación o instalación de herramientas del Android SDK.
- [L6](../../../scripts/install_android_sdk_required.cmd#L6) Decide o propaga el estado de ejecución al proceso que lo invocó.

## scripts/install_rn_cli_in_android_app.cmd

[Abrir fuente](../../../scripts/install_rn_cli_in_android_app.cmd) · 8 líneas de texto.

Instala la CLI comunitaria de React Native en el workspace Android usando la ruta de npm de Windows del proyecto. Históricamente resolvía que la app no tuviera CLI disponible.

- [L4](../../../scripts/install_rn_cli_in_android_app.cmd#L4) Instalación de las dependencias del workspace desde la herramienta npm.
- [L5](../../../scripts/install_rn_cli_in_android_app.cmd#L5) Decide o propaga el estado de ejecución al proceso que lo invocó.

## scripts/run_android_assemble_debug.cmd

[Abrir fuente](../../../scripts/run_android_assemble_debug.cmd) · 52 líneas de texto.

Prepara rutas del toolchain y directorios de caché, comprueba versiones esperadas y llama al ejecutor PowerShell del armado debug.

Se inicia desde `npm run android:assemble:debug`.

- [L14](../../../scripts/run_android_assemble_debug.cmd#L14) Límite de tiempo y tratamiento de ejecuciones fuera del plazo.
- [L17](../../../scripts/run_android_assemble_debug.cmd#L17) Selección o validación de la instalación de Java.
- [L22](../../../scripts/run_android_assemble_debug.cmd#L22) Decide o propaga el estado de ejecución al proceso que lo invocó.
- [L24](../../../scripts/run_android_assemble_debug.cmd#L24) Valida una ruta o herramienta antes de continuar.

## scripts/run_android_assemble_debug_inner.ps1

[Abrir fuente](../../../scripts/run_android_assemble_debug_inner.ps1) · 162 líneas de texto.

Lanza Gradle con timeout y captura de logs, mata el árbol de procesos si se bloquea y controla un reintento. Contiene además limpieza de procesos Java/Gradle por nombre que puede interferir con otras sesiones de compilación del equipo.

Se inicia desde [run_android_assemble_debug.cmd](../../../scripts/run_android_assemble_debug.cmd#L46).

- [L1](../../../scripts/run_android_assemble_debug_inner.ps1#L1) Parámetros que recibe desde el wrapper: `ErrorActionPreference`.
- [L8](../../../scripts/run_android_assemble_debug_inner.ps1#L8) Límite de tiempo y tratamiento de ejecuciones fuera del plazo.
- [L13](../../../scripts/run_android_assemble_debug_inner.ps1#L13) Valida una ruta o herramienta antes de continuar.
- [L15](../../../scripts/run_android_assemble_debug_inner.ps1#L15) Decide o propaga el estado de ejecución al proceso que lo invocó.
- [L18](../../../scripts/run_android_assemble_debug_inner.ps1#L18) Delegación al Gradle Wrapper o preparación de la tarea del módulo Android.
- [L24](../../../scripts/run_android_assemble_debug_inner.ps1#L24) Prepara directorios de trabajo para el comando.
- [L38](../../../scripts/run_android_assemble_debug_inner.ps1#L38) Trata el caché de compilación nativa en la recuperación de un bloqueo.
- [Kill-BuildProcesses](../../../scripts/run_android_assemble_debug_inner.ps1#L49). Encierra la limpieza de procesos que puede ejecutar el wrapper ante fallos o timeout.
- [L51](../../../scripts/run_android_assemble_debug_inner.ps1#L51) Rutina de parada de procesos Gradle o Java para recuperar de un bloqueo.
- [Invoke-GradleWithTimeout](../../../scripts/run_android_assemble_debug_inner.ps1#L55). Inicia Gradle, captura sus logs y devuelve el resultado o el timeout al control del wrapper.
- [L56](../../../scripts/run_android_assemble_debug_inner.ps1#L56) Parámetros que recibe desde el wrapper: `safeArgs`, `cmdLine`, `stdout`, `stderr`, `proc`.
- [L76](../../../scripts/run_android_assemble_debug_inner.ps1#L76) Inicia el proceso hijo destinado a ejecutarse con salida registrada.

## scripts/run_android_assemble_release.cmd

[Abrir fuente](../../../scripts/run_android_assemble_release.cmd) · 96 líneas de texto.

Configura SDK/JDK, elige variables de firma, prepara un keystore de prueba si falta y pasa el control al ejecutor PowerShell. Se usa para ensamblado local de prueba de release.

Se inicia desde `npm run android:assemble:release`.

- [L14](../../../scripts/run_android_assemble_release.cmd#L14) Límite de tiempo y tratamiento de ejecuciones fuera del plazo.
- [L17](../../../scripts/run_android_assemble_release.cmd#L17) Selección o validación de la instalación de Java.
- [L22](../../../scripts/run_android_assemble_release.cmd#L22) Decide o propaga el estado de ejecución al proceso que lo invocó.
- [L28](../../../scripts/run_android_assemble_release.cmd#L28) Valida una ruta o herramienta antes de continuar.
- [L43](../../../scripts/run_android_assemble_release.cmd#L43) Verifica o prepara los parámetros del material de firma del build release de prueba.

## scripts/run_android_assemble_release_inner.ps1

[Abrir fuente](../../../scripts/run_android_assemble_release_inner.ps1) · 157 líneas de texto.

Establece variables para firma y caché, activa minificación y ejecuta `app:assembleRelease` con timeout y capturas. Es el último paso antes del APK de prueba.

Se inicia desde [run_android_assemble_release.cmd](../../../scripts/run_android_assemble_release.cmd#L82).

- [L1](../../../scripts/run_android_assemble_release_inner.ps1#L1) Parámetros que recibe desde el wrapper: `ErrorActionPreference`.
- [L9](../../../scripts/run_android_assemble_release_inner.ps1#L9) Verifica o prepara los parámetros del material de firma del build release de prueba.
- [L16](../../../scripts/run_android_assemble_release_inner.ps1#L16) Límite de tiempo y tratamiento de ejecuciones fuera del plazo.
- [L21](../../../scripts/run_android_assemble_release_inner.ps1#L21) Valida una ruta o herramienta antes de continuar.
- [L23](../../../scripts/run_android_assemble_release_inner.ps1#L23) Decide o propaga el estado de ejecución al proceso que lo invocó.
- [L26](../../../scripts/run_android_assemble_release_inner.ps1#L26) Delegación al Gradle Wrapper o preparación de la tarea del módulo Android.
- [L32](../../../scripts/run_android_assemble_release_inner.ps1#L32) Prepara directorios de trabajo para el comando.
- [Kill-BuildProcesses](../../../scripts/run_android_assemble_release_inner.ps1#L68). Encierra la limpieza de procesos que puede ejecutar el wrapper ante fallos o timeout.
- [L70](../../../scripts/run_android_assemble_release_inner.ps1#L70) Rutina de parada de procesos Gradle o Java para recuperar de un bloqueo.
- [Invoke-GradleWithTimeout](../../../scripts/run_android_assemble_release_inner.ps1#L74). Inicia Gradle, captura sus logs y devuelve el resultado o el timeout al control del wrapper.
- [L75](../../../scripts/run_android_assemble_release_inner.ps1#L75) Parámetros que recibe desde el wrapper: `safeArgs`, `cmdLine`, `stdout`, `stderr`, `cmdWithRedirect`, `cmdEscaped`, `cmdArguments`.

## scripts/run_android_gradle_tasks.cmd

[Abrir fuente](../../../scripts/run_android_gradle_tasks.cmd) · 25 líneas de texto.

Configura Java/SDK y ejecuta la lista de tareas con `gradlew.bat`. Es un diagnóstico del módulo antes de ensamblar.

Se inicia desde `npm run android:gradle:tasks`.

- [L13](../../../scripts/run_android_gradle_tasks.cmd#L13) Selección o validación de la instalación de Java.
- [L15](../../../scripts/run_android_gradle_tasks.cmd#L15) Valida una ruta o herramienta antes de continuar.
- [L17](../../../scripts/run_android_gradle_tasks.cmd#L17) Delegación al Gradle Wrapper o preparación de la tarea del módulo Android.
- [L19](../../../scripts/run_android_gradle_tasks.cmd#L19) Decide o propaga el estado de ejecución al proceso que lo invocó.

## scripts/run_npm_ci_with_path.cmd

[Abrir fuente](../../../scripts/run_npm_ci_with_path.cmd) · 6 líneas de texto.

Prepara el PATH de Windows para ejecutar `npm ci` donde Node/npm están instalados fuera de un PATH normal.

- [L4](../../../scripts/run_npm_ci_with_path.cmd#L4) Instalación de las dependencias del workspace desde la herramienta npm.
- [L5](../../../scripts/run_npm_ci_with_path.cmd#L5) Decide o propaga el estado de ejecución al proceso que lo invocó.

## scripts/run_rn_config_android.cmd

[Abrir fuente](../../../scripts/run_rn_config_android.cmd) · 10 líneas de texto.

Ejecuta la inspección de configuración de React Native desde el workspace correcto. Sirve para investigar el autolinking y la detección de proyecto.

- [L3](../../../scripts/run_rn_config_android.cmd#L3) Selección o validación de la instalación de Java.
- [L6](../../../scripts/run_rn_config_android.cmd#L6) Consulta de la configuración visible para la CLI React Native.
- [L7](../../../scripts/run_rn_config_android.cmd#L7) Decide o propaga el estado de ejecución al proceso que lo invocó.

## scripts/set_java21_env.cmd

[Abrir fuente](../../../scripts/set_java21_env.cmd) · 32 líneas de texto.

Configura Java 21 y las variables de Android para la sesión de Windows, y comprueba las herramientas disponibles. Las rutas deben corresponder al equipo actual.

- [L3](../../../scripts/set_java21_env.cmd#L3) Selección o validación de la instalación de Java.
- [L6](../../../scripts/set_java21_env.cmd#L6) Decide o propaga el estado de ejecución al proceso que lo invocó.
- [L16](../../../scripts/set_java21_env.cmd#L16) Actualización o consulta de configuración persistente de la sesión Windows.
