# Referidos Android - Guia completa de ejecucion por consola

Esta guia documenta, de forma operativa y detallada, como iniciar y mantener la app `apps/referidos-android` desde consola en este monorepo, con variantes de flujo, cold starts, validaciones y troubleshooting real.

## 1. Alcance de esta guia

Esta documentacion cubre:

- Inicio de Metro.
- Instalacion y lanzamiento en emulador o telefono.
- Comandos del repo para build y health checks.
- Flujo recomendado de 2 terminales.
- Flujo rapido de 1 terminal.
- Cold start, warm start y re-apertura.
- Errores frecuentes (puertos, procesos colgados, env, cache, gradle/cmake).

No cubre despliegue de Play Store ni signing release final.
Incluye smoke de `assembleRelease` con keystore local no-debug y minify/proguard.

---

## 2. Estructura relevante del repo

- App RN: `apps/referidos-android`
- Scripts Windows: `scripts/`
- Tooling Android: `tooling/android/`
- Playbook de fases: `docs/android-phase-playbook.md`

---

## 3. Requisitos base (host Windows)

## 3.1 Toolchain esperada

- Node/NPM instalados.
- JDK 21 (ruta esperada por scripts):
  - `C:\Program Files\Java\jdk-21.0.10`
- Android SDK en:
  - `C:\Users\Sebas\AppData\Local\Android\Sdk`
- Paquetes Android requeridos:
  - `platforms;android-35`
  - `build-tools;35.0.0`
  - `ndk;27.1.12297006`
  - `cmdline-tools;latest`

## 3.2 Variables Android recomendadas

- Mantener `ANDROID_USER_HOME` (cache local Android) y evitar mezclar con `ANDROID_SDK_HOME`.
- Scripts del repo ya fuerzan entorno controlado para build.

## 3.3 Verificacion rapida del entorno

Desde root del repo:

```powershell
cmd.exe /c scripts\check_android_env.cmd
```

Si falta cmdline-tools:

```powershell
cmd.exe /c scripts\install_android_cmdline_tools.cmd
cmd.exe /c scripts\install_android_sdk_required.cmd
```

Si falta JAVA_HOME a JDK 21:

```powershell
cmd.exe /c scripts\set_java21_env.cmd
```

---

## 4. Variables de runtime de la app (Supabase y OAuth)

La app lee `apps/referidos-android/env.json` (local, no versionado) como primera prioridad.

Template:

```json
{
  "SUPABASE_URL": "https://YOUR_PROJECT.supabase.co",
  "SUPABASE_ANON_KEY": "YOUR_ANON_KEY",
  "APP_VERSION": "0.1.0-mobile",
  "AUTH_REDIRECT_URL": "referidosandroid://auth/callback"
}
```

Referencia:

- `apps/referidos-android/env.example.json`
- `apps/referidos-android/env.development.example.json`
- `apps/referidos-android/env.staging.example.json`
- `apps/referidos-android/env.production.example.json`
- Resolucion runtime: `apps/referidos-android/src/shared/constants/env.ts`

Si faltan `SUPABASE_URL` o `SUPABASE_ANON_KEY`, la app se queda en bootstrap con error.

---

## 5. Scripts disponibles (root)

## 5.1 Scripts Android del root `package.json`

- `npm run android:metro`
  - Lanza Metro en `8081` con reset-cache.
  - Si Metro ya esta corriendo, termina rapido con mensaje informativo.
- `npm run android:run`
  - Instala/lanza app via RN CLI usando `--port 8081 --no-packager`.
  - Requiere Metro ya encendido en otro terminal.
- `npm run android:gradle:tasks`
  - Lista tareas Gradle Android (wrapper local).
- `npm run android:assemble:debug`
  - Build debug robusto con timeout y control de bloqueos.
- `npm run android:phase1:health`
  - Health check de resolucion de dependencias RN criticas.
- `npm run android:phase2:auth-check`
  - Paridad logica de auth/onboarding.
- `npm run android:phase3:shell-check`
  - Paridad shell/navigation/modals/cache.

## 5.2 Scripts del workspace app

- `npm run start -w @apps/referidos-android`
  - Metro interactivo (permite atajos de teclado).
- `npm run android -w @apps/referidos-android`
  - Run Android (instala y abre la app).
- `npm run typecheck -w @apps/referidos-android`
  - Verificacion TS.

---

## 6. Flujo recomendado diario (2 terminales)

Este es el flujo mas estable para desarrollo:

## Terminal A (Metro)

Opcion A (script root, auto-deteccion):

```powershell
npm run android:metro
```

Opcion B (metro interactivo completo):

```powershell
npm run start -w @apps/referidos-android -- --port 8081 --reset-cache
```

Usa la opcion B cuando quieras interaccion directa con Metro (atajos, logs continuos, control manual).

## Terminal B (instalar/abrir app)

```powershell
npm run android:run
```

o equivalente:

```powershell
npm run android -w @apps/referidos-android -- --port 8081 --no-packager
```

Notas:

- `--no-packager` evita que RN intente levantar otro Metro.
- Si trabajas con telefono fisico, asegura `adb reverse` (ver seccion 10).

---

## 7. Flujo rapido (1 terminal)

Si no quieres separar terminales:

```powershell
npm run android -w @apps/referidos-android -- --port 8081
```

RN intentara usar/levantar Metro en ese mismo flujo.

Tradeoff:

- Es mas rapido para pruebas simples.
- Menos control para troubleshooting de puertos o logs de Metro.

---

## 8. Cold start, warm start y re-apertura

## 8.1 Definiciones

- Cold start:
  - App completamente cerrada (proceso muerto) y apertura desde cero.
- Warm start:
  - App en background y se vuelve al foreground.
- Re-apertura:
  - Similar a cold start desde launcher luego de forzar cierre.

## 8.2 Validacion recomendada

1. Metro activo.
2. Abrir app y validar pantalla inicial esperada.
3. Forzar cierre del proceso (desde sistema Android).
4. Reabrir app y validar que entra sin redbox.
5. Repetir con emulador y dispositivo fisico.

## 8.3 Comandos de apoyo

Build debug robusto:

```powershell
npm run android:assemble:debug
```

Health deps:

```powershell
npm run android:phase1:health
```

Paridad auth:

```powershell
npm run android:phase2:auth-check
```

Paridad shell:

```powershell
npm run android:phase3:shell-check
```

---

## 9. Build-only (sin instalar) para validar entorno

## 9.1 Ruta recomendada (timeout/locks manejados por script)

```powershell
npm run android:assemble:debug
```

Internamente usa:

- `scripts/run_android_assemble_debug.cmd`
- `scripts/run_android_assemble_debug_inner.ps1`

Con:

- Timeout configurable (default 600 por script root, 1800 interno base).
- Kill controlado de arbol de procesos si hay timeout.
- Retry unico cuando detecta lock de `.cxx` en `react-native-screens`.
- `GRADLE_USER_HOME` local: `.gradle-local`
- `ANDROID_USER_HOME` local: `.android-local`

## 9.2 Build directo (manual)

```powershell
cd apps/referidos-android/android
.\gradlew.bat -g ..\..\..\.gradle-local app:assembleDebug --no-daemon --console=plain
```

Usar solo cuando necesites inspeccion manual de gradle.

## 9.3 Build release smoke (minify/proguard + signing no-debug local)

Comando recomendado (usa script robusto con timeout y genera keystore local si falta):

```powershell
npm run android:assemble:release
```

Este flujo:

- genera/usa keystore local en `.android-local/release-keystore/` (no versionado),
- fuerza `minifyEnabled` via `-Pandroid.enableProguardInReleaseBuilds=true`,
- firma release con keystore no-debug para validar ruta de firma,
- produce:
  - `apps/referidos-android/android/app/build/outputs/apk/release/app-release.apk`
  - `apps/referidos-android/android/app/build/outputs/mapping/release/mapping.txt`

No reemplaza la firma de producción final, pero valida la ruta técnica completa de release.

---

## 10. Dispositivo fisico (USB) y ADB

## 10.1 Verificar dispositivo conectado

```powershell
& "$env:ANDROID_SDK_ROOT\platform-tools\adb.exe" devices
```

Si no tienes `ANDROID_SDK_ROOT` en sesion:

```powershell
& "C:\Users\Sebas\AppData\Local\Android\Sdk\platform-tools\adb.exe" devices
```

## 10.2 Reverse del puerto Metro

```powershell
& "C:\Users\Sebas\AppData\Local\Android\Sdk\platform-tools\adb.exe" reverse tcp:8081 tcp:8081
```

Verificar:

```powershell
& "C:\Users\Sebas\AppData\Local\Android\Sdk\platform-tools\adb.exe" reverse --list
```

Esto evita que el telefono intente resolver `localhost` en su propia red interna.

## 10.3 Logs Android desde ADB

```powershell
& "C:\Users\Sebas\AppData\Local\Android\Sdk\platform-tools\adb.exe" logcat
```

Filtrado basico:

```powershell
& "C:\Users\Sebas\AppData\Local\Android\Sdk\platform-tools\adb.exe" logcat | Select-String -Pattern "ReactNative|ReactNativeJS|AndroidRuntime"
```

---

## 11. Puertos Metro y colisiones (EADDRINUSE)

## 11.1 Detectar que hay en 8081

```powershell
Invoke-WebRequest http://127.0.0.1:8081/status -UseBasicParsing
```

Si responde con status de packager, Metro ya esta arriba.

## 11.2 Cuando `android:metro` termina "rapido"

Es esperado si Metro ya corria:

- Script `tooling/android/start-android-metro.mjs` detecta estado y sale con codigo 0.
- En ese caso no hay proceso "nuevo" que cerrar porque ya existia uno.

## 11.3 Si quieres Metro interactivo siempre

Levanta manualmente:

```powershell
npm run start -w @apps/referidos-android -- --port 8081 --reset-cache
```

Ese si queda adjunto al terminal (Ctrl+C para parar).

## 11.4 Si el puerto esta tomado por algo que no es Metro

El script `android:metro` falla con mensaje de puerto ocupado.

Para identificar PID:

```powershell
netstat -ano | findstr :8081
```

Para matar proceso (usa con cuidado):

```powershell
taskkill /PID <PID> /F
```

---

## 12. Troubleshooting de comandos "estancados"

En este repo se mejoro el flujo para evitar cuelgues largos de gradle, pero pueden aparecer por entorno host.

## 12.1 Causas comunes reales

- Daemons colgados de Java/Gradle/CMake/Ninja.
- Locks en `node_modules/react-native-screens/android/.cxx`.
- Variables Android inconsistentes (`ANDROID_SDK_HOME` mezclado).
- Directorios de cache sin permisos correctos.
- Colisiones de puerto/metro.

## 12.2 Solucion recomendada (sin parches ad-hoc)

1. Usar siempre script robusto para assemble:

```powershell
npm run android:assemble:debug
```

2. Mantener cadena fija:

- JDK 21.
- SDK/NDK requeridos.
- Wrapper Gradle del proyecto.

3. Evitar ejecutar builds largos manuales sin timeout si no es necesario.

4. Verificar toolchain con:

```powershell
cmd.exe /c scripts\check_android_env.cmd
```

5. Si npm falla por cache/proxy, limpiar variables de sesion y verificar `npm config get offline` en `false`.

## 12.3 Si un comando parece colgado

- No esperar indefinidamente.
- Cancela y usa comandos de diagnostico:

```powershell
Get-Process java,gradle,node,adb -ErrorAction SilentlyContinue
```

```powershell
Invoke-WebRequest http://127.0.0.1:8081/status -UseBasicParsing
```

Luego relanza via scripts del repo.

---

## 13. Flujo recomendado de "inicio limpio" (clean dev session)

1. Verifica entorno:

```powershell
cmd.exe /c scripts\check_android_env.cmd
```

2. Levanta Metro:

```powershell
npm run android:metro
```

3. Instala y abre app:

```powershell
npm run android:run
```

4. Verifica estado tecnico:

```powershell
npm run android:phase1:health
npm run android:phase2:auth-check
npm run android:phase3:shell-check
```

5. Si haces cambios nativos o dependencias:

```powershell
npm run android:assemble:debug
```

---

## 14. Flujo para Android Studio (sin Expo)

Si prefieres IDE para lanzar emulador y ejecutar app:

1. Abre `apps/referidos-android/android` en Android Studio.
2. Asegura SDK/JDK correctos.
3. Inicia emulador.
4. Metro en terminal aparte:

```powershell
npm run android:metro
```

5. Run desde Android Studio o desde consola:

```powershell
npm run android:run
```

Importante:

- Este proyecto esta pensado para React Native CLI (no Expo runtime).
- Puedes usar Android Studio como launcher/build UI, pero Metro sigue siendo parte del flujo RN CLI.

---

## 15. Comandos utiles de referencia rapida

## 15.1 Diario

```powershell
npm run android:metro
npm run android:run
```

## 15.2 Checks

```powershell
npm run android:phase1:health
npm run android:phase2:auth-check
npm run android:phase3:shell-check
npm run typecheck -w @apps/referidos-android
```

## 15.3 Build debug robusto

```powershell
npm run android:assemble:debug
```

## 15.4 Build release smoke robusto

```powershell
npm run android:assemble:release
```

## 15.5 SDK/JDK setup helpers

```powershell
cmd.exe /c scripts\set_java21_env.cmd
cmd.exe /c scripts\install_android_cmdline_tools.cmd
cmd.exe /c scripts\install_android_sdk_required.cmd
cmd.exe /c scripts\check_android_env.cmd
```

---

## 16. Convenciones operativas recomendadas para este repo

- Usar 2 terminales (Metro + run) para sesiones largas.
- Mantener `env.json` de Android correcto antes de arrancar.
- Ejecutar checks de fase antes de reportar "listo".
- No mezclar comandos manuales largos cuando existe script robusto equivalente.
- Preferir scripts de root para consistencia del equipo.

---

## 17. Estado actual esperado cuando todo esta bien

- `npm run android:metro`:
  - Si Metro no existe, lo levanta.
  - Si ya existe, informa y sale.
- `npm run android:run`:
  - instala APK debug y abre `MainActivity`.
- App:
  - llega a login/auth sin redbox de version mismatch.
- Checks:
  - `android:phase1:health` en OK.
  - `android:phase2:auth-check` en OK.
  - `android:phase3:shell-check` en OK.

Con ese estado, el entorno Android CLI esta operativo para continuar fases de paridad.
