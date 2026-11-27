# Referidos Promos para Android

La beta abre un creador de promociones local. Usa un punto de entrada de React Native propio y se instala como `com.referidosandroid.promosbeta`. La compilación habitual de Referidos usa `index.js` y conserva el flujo por roles.

## Ejecutar en Android

Se necesita Node 22.18 o posterior para las pruebas, el JDK y el SDK Android configurados para esta app. Desde la raíz del monorepo, compila una APK local con el bundle incluido.

```powershell
npm.cmd ci
Push-Location apps/referidos-android/android
.\gradlew.bat :app:assembleRelease -PreferidosPromosBeta=true
Pop-Location
$adb = Join-Path $env:ANDROID_HOME 'platform-tools/adb.exe'
& $adb install -r apps/referidos-android/android/app/build/outputs/apk/release/app-release.apk
& $adb shell am start -n com.referidosandroid.promosbeta/com.referidosandroid.MainActivity
```

Para acelerar la compilación en un emulador x86_64, añade `-PreactNativeArchitectures=x86_64`. Para un teléfono ARM de 64 bits, usa `-PreactNativeArchitectures=arm64-v8a`. La beta usa la firma de depuración para pruebas locales y se ejecuta sin Metro ni configuración de Supabase. Usa un dispositivo o emulador de prueba conectado a ADB. Verifica el identificador de paquete en cualquier APK antes de instalarla si alternas compilaciones beta y normales, porque ambas escriben al mismo directorio de salida de Gradle.

## Flujo de prueba

1. Abre **Referidos Promos** en modo avión. Toca **Crear promoción** y escribe un título y un beneficio. La tarjeta cambia al escribir. El nombre del negocio se recuerda en este dispositivo.
2. Abre **Personalizar**. Elige entre Esencial, Editorial e Impacto, cambia el color y añade una foto grande con la vista previa fija. Regresa al editor y abre **Detalles opcionales** para escribir condiciones y elegir una fecha.
3. Toca **Guardar imagen**. Android 10 o posterior guarda un PNG de 1080 × 1080 en `Pictures/Referidos Promos`. Android 7 a 9 abre el selector para que elijas el destino. Abre el resultado y comprueba que coincide con la tarjeta.
4. Toca **Compartir** y comprueba que el selector de Android recibe una imagen, incluida la vista previa cuando el sistema la muestre. Cierra el selector y vuelve a abrirlo para probar con otra app instalada.
5. En **Mis promociones**, edita la tarjeta, duplica y cambia la copia. Fuerza el cierre y vuelve a abrir la app. Comprueba que sobreviven ambos registros y su foto. Elimina el original con confirmación y vuelve a comprobar la foto de la copia.
6. Intenta compartir un borrador con título o beneficio vacío. El editor debe enfocar el primer obligatorio vacío y mostrar el error junto al campo. Escribe más de 64 caracteres en el título, 42 en el beneficio o 144 en las condiciones. Comprueba que el exceso siga en el borrador, que el contador lo indique y que se pueda exportar al corregirlo.

La biblioteca conserva el formato `v1` de AsyncStorage. Se escribe una instantánea a la vez, agrupando los cambios que esperan turno. Reintentar vuelve a enviar la versión completa en memoria. Los datos ilegibles se conservan para poder reintentar su lectura. Las fotos se redimensionan hasta 1.600 píxeles y se guardan con un nombre privado. Al arrancar con una biblioteca válida se limpian los archivos huérfanos de más de un día. Los PNG temporales de compartir se retiran en una exportación posterior cuando superan un día. Los borradores se pierden al borrar el almacenamiento de la app o desinstalarla.

## Hallazgos de interacción e interfaz

Revisión del 27 de noviembre de 2026 sobre `7042ea9` en un teléfono ARM64 con Android 13 y en el emulador Android x86_64. El primer intento de instalación por USB se canceló en el diálogo de confirmación del sistema. La instalación se completó al relanzarla y la beta abrió directamente en **Crear**.

### Prioridad media

- **El PNG puede salir con el texto de ejemplo «Tu negocio».** Crea una promoción con título y beneficio, deja el negocio vacío y usa **Guardar imagen**. El PNG del teléfono muestra «Tu negocio» como si fuera el nombre real. Si el nombre es opcional, la tarjeta final debe omitir ese texto al exportar. [Renderizador](../android/app/src/main/java/com/referidosandroid/promos/PromoCardRenderer.kt#L36)
- **Los controles de estilo quedan fuera de la vista previa.** Desplázate a **Estilo de la tarjeta** y cambia a Editorial o elige un color. Tanto en el teléfono como en el emulador, la tarjeta queda por encima del área visible y hace falta desplazarse de vuelta para comprobar cada cambio. El editor debería mantener visible la vista previa o dar acceso directo a ella desde esos controles. [Editor](../src/features/promos-beta/PromoEditor.tsx#L49)
- **La validación puede devolver al principio y dejar el error del campo fuera de pantalla.** Deja vacío un campo obligatorio y toca **Compartir**. El editor lleva a la cabecera de la vista previa. En la pantalla del emulador, la indicación del beneficio quedó debajo del área visible. En el teléfono, de mayor altura, ambos mensajes quedaron visibles. El desplazamiento debería llevar al primer campo incompleto. [Acción de exportar](../src/features/promos-beta/PromoBetaApp.tsx#L158)
- **El título se corta sin aviso al alcanzar el límite.** En el teléfono se introdujo un título de 65 caracteres y el campo conservó 64, dejando la última palabra incompleta. La pantalla debería indicar el límite junto al campo y avisar al alcanzarlo. [Campo de título](../src/features/promos-beta/PromoEditor.tsx#L59)

### Prioridad baja

- **El aviso de duplicación sigue visible después de editar la copia.** En **Mis promociones**, duplica una tarjeta y cambia el título o el beneficio. «Copia creada. Puedes editarla aquí» permanece en la parte inferior y ocupa espacio de edición. La confirmación debería retirarse al empezar a editar. [Acción de duplicar](../src/features/promos-beta/PromoBetaApp.tsx#L112)
- **El aviso de compartir sigue dando instrucciones al cerrar el selector.** Toca **Compartir** y vuelve con el gesto Atrás. En el teléfono, el editor mantuvo «Imagen preparada. Elige una app para compartirla» incluso después de cerrar el selector. La instrucción debería desaparecer al volver al editor. [Aviso de compartir](../src/features/promos-beta/PromoBetaApp.tsx#L168)
- **Las etiquetas accesibles de las plantillas incluyen sus símbolos decorativos.** En la jerarquía accesible del teléfono, Esencial y Editorial aparecen con «✦» e Impacto con «≋» antes del nombre. El nombre debe identificar por sí solo cada opción. [Controles de plantilla](../src/features/promos-beta/PromoEditor.tsx#L74)

### Comprobaciones en el teléfono

- Entrada a la beta sin cuenta, validación de campos, edición con teclado, selección de plantilla y color e importación de una foto de prueba de 6000 × 4000.
- PNG válido de 1080 × 1080 en la galería. El selector de MIUI mostró WhatsApp y se cerró con Atrás.
- Edición de una copia y reapertura de la aplicación tras forzar su cierre. El original y la copia conservaron sus cambios. La copia se pudo exportar con la foto después de retirar el archivo de prueba de Descargas.

## Correcciones de la beta 1.1

- **Editor.** La vista previa está fija en Personalizar, se restaura la posición al volver al editor y los campos obligatorios reciben foco al intentar exportar. Los contadores indican el exceso de texto y permiten corregirlo antes de generar la imagen. Los avisos se retiran al editar o cambiar de pantalla. Al volver del selector de Android, la app conserva la promoción y su posición.
- **Biblioteca.** La clave de AsyncStorage conserva la compatibilidad con las promociones de 1.0. Los nuevos identificadores combinan un UUID de sesión y una secuencia que descarta identificadores ocupados. Si el archivo anterior contiene un identificador repetido, se conserva el contenido de cada borrador.
- **Medios.** Se preserva la orientación al importar, se descartan tareas de vista previa reemplazadas y se protege una imagen mientras al menos una promoción la referencia. La tarjeta y el PNG comparten los datos y el renderizador. Los campos opcionales vacíos quedan fuera de la composición.
- **Compilación.** La beta autónoma mantiene `com.referidosandroid.promosbeta`, usa `index.promos.js`, `versionCode 2`, `versionName 1.1` y firma de depuración. Sus paquetes React Native se limitan a los utilizados por el editor y el APK respeta el filtro ABI. El manifest de release beta retira el acceso a internet, cámara, ubicación y almacenamiento general. `FileProvider` concede acceso temporal a los PNG del directorio de exportaciones.

### Resultados de la revisión 1.1

- ESLint, TypeScript, las 10 pruebas de `promo-library.test.mjs`, el guardrail de Android y las comprobaciones de paridad de autenticación, shell, cliente y negocio pasaron. Las pruebas en JavaScript cubren recuperación tras un fallo simulado de escritura, versiones de datos, duplicados, validación, referencias de fotos y datos para exportar.
- `assembleRelease` pasó para ARM64 y x86_64. Los APK pesaron 27.683.066 y 28.944.691 bytes. El APK ARM64 anterior pesaba 75.505.144 bytes e incluía bibliotecas de otras ABI. Se verificaron el certificado de depuración y la alineación ZIP de 16 KiB del APK ARM64. El manifest release tradicional conserva `com.referidosandroid`, el callback `referidosandroid` y sus permisos de internet y cámara.
- En Android 13 se instaló la 1.1 sobre la 1.0 con `adb install -r`. Los dos borradores de prueba existentes siguieron visibles. Se verificaron la validación, la tecla Siguiente, la personalización, la duplicación y la reapertura después del cierre de la app. La foto de prueba de 6000 × 4000 con EXIF de rotación apareció orientada en el PNG de 1080 × 1080.
- En el emulador Android 16 en modo avión se comprobó el foco en los campos obligatorios, el contador con texto por encima del límite y la exportación tras corregirlo. El PNG verificado conserva el título de 64 caracteres y omite nombre, descripción y vencimiento cuando están vacíos. El selector de Android mostró la miniatura y se cerró sin dejar instrucciones de compartir en el editor.
- Se quitó una foto de una copia en el emulador y se retiró el archivo de Descargas. Tras reiniciar Android en modo avión, la copia conservó el cambio y la promoción original se pudo exportar con la foto orientada. Una lectura de memoria durante la prueba reportó 66.226 KiB de PSS.
- En el teléfono se abrió el selector de MIUI, se entregó `ACTION_SEND` con `image/png` a WhatsApp y se envió la imagen de prueba al chat propio. La imagen quedó visible en ese chat y se cotejaron los colores de la foto contra el archivo exportado. También se canceló el selector y se comprobó el regreso al editor sin aviso de compartir.
- Se inspeccionaron las etiquetas y los estados marcados de plantilla y color en la jerarquía accesible. Volver, Personalizar, Guardar imagen y Compartir midieron al menos 48 × 48 dp. TalkBack se activó en el emulador y el editor mostró el foco de accesibilidad al recorrer los controles con gestos. Queda pendiente verificar el audio de los anuncios.

### Capturar las pantallas

En el teléfono de prueba se guardaron `01-inicio.png`, `02-editor.png`, `03-personalizacion.png`, `04-biblioteca.png` y `05-png-exportado.png` en `Pictures/Referidos-Promos-QA-1.1`. Para repetir la captura, abre la pantalla correspondiente. Para obtener el quinto archivo, usa **Guardar imagen** y copia el PNG desde `Pictures/Referidos Promos` al álbum de pruebas.

```powershell
$adb = Join-Path $env:ANDROID_HOME 'platform-tools/adb.exe'
& $adb devices
$serial = 'SERIAL_DEL_TELEFONO'
$album = '/sdcard/Pictures/Referidos-Promos-QA-1.1'
& $adb -s $serial shell mkdir -p $album
& $adb -s $serial shell screencap -p "$album/01-inicio.png"
& $adb -s $serial shell am broadcast -a android.intent.action.MEDIA_SCANNER_SCAN_FILE -d "file://$album/01-inicio.png"
```

### Preparación para distribución externa

La beta 1.1 está lista para otra ronda supervisada de pruebas con usuarios. Quedan pendientes el guardado con el selector de archivos en Android 7 a 9, la limpieza de huérfanos tras el periodo de 24 horas y una prueba prolongada de memoria. Un cierre forzado mientras falla el almacenamiento puede perder los cambios que siguen únicamente en memoria.

Para una distribución externa, definir el identificador definitivo, un canal y una llave de firma de distribución separada. Android exige una firma compatible para actualizar una instalación existente. El paso de la firma de depuración a la definitiva necesita un plan de continuidad de borradores. Completar también la validación de bibliotecas nativas con páginas de 16 KiB y los requisitos del canal elegido. Las compilaciones de esta revisión están destinadas a pruebas locales.

## Verificación en el repo

```powershell
npm.cmd run lint -w @apps/referidos-android
npm.cmd run typecheck -w @apps/referidos-android
npm.cmd test -w @apps/referidos-android
npm.cmd run android:guardrail
```

Se reutilizan React Native, el contenedor de áreas seguras, AsyncStorage, el launcher y la paleta de Referidos. De las tarjetas de la PWA se conserva la jerarquía entre foto, negocio, título y descripción. La vista nativa de la beta y el PNG comparten el mismo renderizador. Las pantallas originales de negocio, los navegadores por rol, el onboarding y sus servicios siguen en el flujo normal.

## Cuenta y sincronización futura

- Reutilizar la autenticación de Supabase después de revisar el onboarding actual. Probar enlace de acceso por correo y Google con redirección específica de la beta, intercambio de sesión y almacenamiento seguro. La sesión daría acceso al respaldo del propietario. La verificación del negocio seguiría siendo requisito de una futura publicación en catálogo.
- Diseñar un esquema privado de borradores por propietario y almacenamiento privado de imágenes. Una migración futura deberá definir RLS para propietario, límites, borrado y recuperación. El contrato actual de `promos` vincula los registros a un negocio y representa un ciclo diferente del borrador de este editor.
- Ante la primera sesión, ofrecer importar los borradores locales con consentimiento. Usar identificadores estables, operaciones idempotentes, una estrategia de conflictos y un modo sin conexión. Mantener el flujo local disponible durante fallos de red. Mapear después `title`, `description` y `expiration` al modelo existente, y conservar beneficio, plantilla y color en el esquema de edición.
- Una etapa posterior puede usar esos identificadores para enlaces editables y habilitar la publicación en catálogo tras la verificación del negocio.
- Para evaluar la experiencia, proponer primera promoción completada, tiempo desde creación hasta exportación, apertura del selector, regreso, duplicación e interés en respaldo. Evaluar consentimiento y retención antes de cualquier envío remoto. La beta actual funciona sin esa instrumentación.
