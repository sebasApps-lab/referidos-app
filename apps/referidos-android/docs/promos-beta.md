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
