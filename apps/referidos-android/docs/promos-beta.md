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
2. Elige entre Esencial, Editorial e Impacto, y prueba otro color. Añade una foto de gran tamaño. Abre **Detalles opcionales** para escribir condiciones y elegir una fecha. Comprueba el resultado con el teclado abierto y cerrado.
3. Toca **Guardar imagen**. Android 10 o posterior guarda un PNG de 1080 × 1080 en `Pictures/Referidos Promos`. Android 7 a 9 abre el selector para que elijas el destino. Abre el resultado y comprueba que coincide con la tarjeta.
4. Toca **Compartir** y comprueba que el selector de Android recibe una imagen, incluida la vista previa cuando el sistema la muestre. Cierra el selector y vuelve a abrirlo para probar con otra app instalada.
5. En **Mis promociones**, edita la tarjeta, duplica y cambia la copia. Fuerza el cierre y vuelve a abrir la app. Comprueba que sobreviven ambos registros y su foto. Elimina el original con confirmación y vuelve a comprobar la foto de la copia.
6. Intenta compartir un borrador con título o beneficio vacío. Después prueba un título de 64 caracteres, beneficio de 42 y condiciones de 144. Los límites dan espacio a la composición cuadrada.

La biblioteca usa AsyncStorage. Las fotos se redimensionan hasta 1.600 píxeles en el lado mayor y se copian al almacenamiento privado de la app. Las fotos que ya no están asociadas a una promoción se limpian al abrir la biblioteca después de un reinicio. Abrir el selector de compartir solo confirma que el PNG está listo. Los PNG de compartir se almacenan en caché y se retiran en una exportación posterior cuando superan un día. Los datos se pierden al borrar el almacenamiento de la app o desinstalarla.

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
