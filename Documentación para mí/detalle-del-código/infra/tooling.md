# Tooling: funciones de versión, guardrails y herramientas de desarrollo

[Volver a la referencia de infraestructura](README.md)

Los enlaces a líneas apuntan al checkout analizado. Las relaciones se obtuvieron leyendo declaraciones, imports y configuraciones. Los valores de credenciales y datos operativos se dejan en sus archivos de origen.

## Archivos en este capítulo

- [.tmp-check-glow.cjs](#tmp-check-glowcjs)
- [.tmp-prelaunch-server.cjs](#tmp-prelaunch-servercjs)
- [tooling/android/phase1-runtime-health.mjs](#toolingandroidphase1-runtime-healthmjs)
- [tooling/android/phase2-auth-parity-check.mjs](#toolingandroidphase2-auth-parity-checkmjs)
- [tooling/android/phase3-shell-check.mjs](#toolingandroidphase3-shell-checkmjs)
- [tooling/android/phase4-cliente-check.mjs](#toolingandroidphase4-cliente-checkmjs)
- [tooling/android/phase5-negocio-check.mjs](#toolingandroidphase5-negocio-checkmjs)
- [tooling/android/phase6-native-check.mjs](#toolingandroidphase6-native-checkmjs)
- [tooling/android/phase7-observability-check.mjs](#toolingandroidphase7-observability-checkmjs)
- [tooling/android/phase8-support-admin-check.mjs](#toolingandroidphase8-support-admin-checkmjs)
- [tooling/android/phase9-parity-check.mjs](#toolingandroidphase9-parity-checkmjs)
- [tooling/android/phase9-release-check.mjs](#toolingandroidphase9-release-checkmjs)
- [tooling/android/start-android-metro.mjs](#toolingandroidstart-android-metromjs)
- [tooling/fonts/subset-prelaunch-fonts.mjs](#toolingfontssubset-prelaunch-fontsmjs)
- [tooling/guardrails/check-mojibake.mjs](#toolingguardrailscheck-mojibakemjs)
- [tooling/guardrails/verify-android-scope.mjs](#toolingguardrailsverify-android-scopemjs)
- [tooling/observability/upload-sourcemaps.mjs](#toolingobservabilityupload-sourcemapsmjs)
- [tooling/scripts/migrate_auth_and_sync.js](#toolingscriptsmigrate_auth_and_syncjs)
- [tooling/versioning/apply-changeset.mjs](#toolingversioningapply-changesetmjs)
- [tooling/versioning/archive-local-artifact.mjs](#toolingversioningarchive-local-artifactmjs)
- [tooling/versioning/bootstrap-baseline.mjs](#toolingversioningbootstrap-baselinemjs)
- [tooling/versioning/detect-changes.mjs](#toolingversioningdetect-changesmjs)
- [tooling/versioning/promote-release.mjs](#toolingversioningpromote-releasemjs)
- [tooling/versioning/record-deployment.mjs](#toolingversioningrecord-deploymentmjs)
- [tooling/versioning/shared.mjs](#toolingversioningsharedmjs)
- [tooling/versioning/supabase-client.mjs](#toolingversioningsupabase-clientmjs)

## .tmp-check-glow.cjs

[Abrir fuente](../../../.tmp-check-glow.cjs) · 30 líneas de texto.

Utilidad histórica de diagnóstico visual de glow que quedó versionada como archivo temporal.

Dependencias importadas: `puppeteer`.

En el nivel del módulo se invocan `require`, `puppeteer.launch`, `browser.newPage`, `page.goto`, `page.evaluate`, `document.querySelector`, `getComputedStyle`, `el.getBoundingClientRect`.


## .tmp-prelaunch-server.cjs

[Abrir fuente](../../../.tmp-prelaunch-server.cjs) · 52 líneas de texto.

Servidor local histórico para observar el build de Prelaunch. Se conserva como herramienta de prueba y no participa en el pipeline de publicación.

Dependencias importadas: `http`, `fs`, `path`.

### Funciones y callbacks

- [sendFile](../../../.tmp-prelaunch-server.cjs#L19) `(res, file)`. Establece el tipo de archivo y transmite el contenido al navegador en el servidor local de prueba. Usa `res.writeHead`, `path.extname.toLowerCase`, `path.extname`, `fs.createReadStream.pipe`, `fs.createReadStream`.

En el nivel del módulo se invocan `require`, `http.createServer.listen`, `http.createServer`, `decodeURIComponent`, `target.startsWith`, `res.writeHead`, `res.end`, `stat.isDirectory`.


## tooling/android/phase1-runtime-health.mjs

[Abrir fuente](../../../tooling/android/phase1-runtime-health.mjs) · 205 líneas de texto.

Comprueba resolución de dependencias críticas y coherencia del autolinking. Advierte de duplicados de paquetes nativos que pueden causar error antes de montar una pantalla.

Dependencias importadas: `node:fs`, `node:path`, `node:module`.

Se inicia o consume desde `npm run android:phase1:health`.

### Funciones y callbacks

- [asPosix](../../../tooling/android/phase1-runtime-health.mjs#L29) `(value)`. Normaliza separadores de rutas para comparar claves de archivos o incorporarlas a un manifiesto independiente de Windows. Usa `value.replace`. Consumidores: [L33](../../../tooling/android/phase1-runtime-health.mjs#L33) `resolvePkg`, [L67](../../../tooling/android/phase1-runtime-health.mjs#L67) `preferredPathFor`, [L95](../../../tooling/android/phase1-runtime-health.mjs#L95) `checkAutolinking`.
- [resolvePkg](../../../tooling/android/phase1-runtime-health.mjs#L33) `(name)`. Localiza un paquete desde el contexto de la aplicación Android y recupera su ruta y metadatos de resolución. Usa `appRequire.resolve`, `asPosix`, `path.dirname`, `path.join`, `fs.existsSync`, `fs.readFileSync`.
- [preferredPathFor](../../../tooling/android/phase1-runtime-health.mjs#L67) `(name)`. Predice la copia del paquete que debe resolver el entorno Android según ubicación en el monorepo. Usa `asPosix`, `path.resolve`, `fs.existsSync`. Consumidores: [L95](../../../tooling/android/phase1-runtime-health.mjs#L95) `checkAutolinking`.
- [packageVersionAt](../../../tooling/android/phase1-runtime-health.mjs#L74) `(baseNodeModules, name)`. Obtiene la versión instalada de una dependencia desde una raíz concreta de node_modules para contrastarlas. Usa `path.resolve`, `fs.existsSync`, `fs.readFileSync`.
- [collectNativeDepsFromRnPackage](../../../tooling/android/phase1-runtime-health.mjs#L85) `()`. Lee la configuración de paquetes nativos de React Native para establecer la referencia de autolinking. Usa `dep.startsWith`, `fs.existsSync`, `fs.readFileSync`, `deps.filter.filter.sort`, `deps.filter.filter`, `deps.filter`. Consumidores: [L95](../../../tooling/android/phase1-runtime-health.mjs#L95) `checkAutolinking`.
- [checkAutolinking](../../../tooling/android/phase1-runtime-health.mjs#L95) `()`. Inspecciona el autolinking de React Native para detectar dependencias nativas omitidas o resueltas desde un lugar inesperado. Usa `collectNativeDepsFromRnPackage`, `preferredPathFor`, `asPosix`, `path.resolve`, `fs.existsSync`, `fs.readFileSync`, `nativeDeps.map`, `errors.push`.

En el nivel del módulo se invocan `createRequire`, `resolvePkg`, `preferredPathFor`, `checkAutolinking`, `packageVersionAt`, `path.resolve`, `process.cwd`, `path.join`.


## tooling/android/phase2-auth-parity-check.mjs

[Abrir fuente](../../../tooling/android/phase2-auth-parity-check.mjs) · 289 líneas de texto.

Ejecuta aserciones de reglas compartidas de resolución de pasos de registro y verificación. Sirve durante cambios al dominio de auth que impactan la máquina móvil.

Dependencias importadas: `../../packages/domain/src/index.js`.

Se inicia o consume desde `npm run android:phase2:auth-check`.

Módulos locales conectados: [index.js](../../../packages/domain/src/index.js).

### Funciones y callbacks

- [assertEqual](../../../tooling/android/phase2-auth-parity-check.mjs#L12) `(actual, expected, label)`. Compara casos del dominio de registro y detiene la matriz cuando el resultado difiere. Consumidores: [L26](../../../tooling/android/phase2-auth-parity-check.mjs#L26) `runRegistrationMatrix`, [L162](../../../tooling/android/phase2-auth-parity-check.mjs#L162) `runVerificationMatrix`, [L248](../../../tooling/android/phase2-auth-parity-check.mjs#L248) `runValidationMatrix`.
- [assertTrue](../../../tooling/android/phase2-auth-parity-check.mjs#L18) `(value, label)`. Compara casos del dominio de registro y detiene la matriz cuando el resultado difiere. Consumidores: [L248](../../../tooling/android/phase2-auth-parity-check.mjs#L248) `runValidationMatrix`.
- [assertFalse](../../../tooling/android/phase2-auth-parity-check.mjs#L22) `(value, label)`. Compara casos del dominio de registro y detiene la matriz cuando el resultado difiere. Consumidores: [L248](../../../tooling/android/phase2-auth-parity-check.mjs#L248) `runValidationMatrix`.
- [runRegistrationMatrix](../../../tooling/android/phase2-auth-parity-check.mjs#L26) `()`. Ejercita casos de navegación y registro a partir de las funciones del dominio móvil. Usa `assertEqual`, `resolveRegistrationStep`. Consumidores: [L281](../../../tooling/android/phase2-auth-parity-check.mjs#L281) `main`.
- [runVerificationMatrix](../../../tooling/android/phase2-auth-parity-check.mjs#L162) `()`. Ejercita estados de verificación y el paso de auth que corresponde a cada caso. Usa `assertEqual`, `resolveVerificationStep`. Consumidores: [L281](../../../tooling/android/phase2-auth-parity-check.mjs#L281) `main`.
- [runValidationMatrix](../../../tooling/android/phase2-auth-parity-check.mjs#L248) `()`. Comprueba cómo el dominio interpreta las respuestas de validación de registro. Usa `parsePhoneWithCountry`, `assertEqual`, `assertTrue`, `isPhoneValidForCountry`, `toStoragePhone`, `getUserProfileStatus`, `assertFalse`, `validateRucFromCedula`. Consumidores: [L281](../../../tooling/android/phase2-auth-parity-check.mjs#L281) `main`.
- [main](../../../tooling/android/phase2-auth-parity-check.mjs#L281) `()`. Orquesta los chequeos de esta fase y fija el resultado del comando de validación. Usa `runRegistrationMatrix`, `runVerificationMatrix`, `runValidationMatrix`.

En el nivel del módulo se invocan `main`.


## tooling/android/phase3-shell-check.mjs

[Abrir fuente](../../../tooling/android/phase3-shell-check.mjs) · 47 líneas de texto.

Inspecciona textos y piezas esperadas del shell: persistencia de pestañas, historial, reseteo de estado y modales.

Dependencias importadas: `node:fs`, `node:path`.

Se inicia o consume desde `npm run android:phase3:shell-check`.

### Funciones y callbacks

- [readText](../../../tooling/android/phase3-shell-check.mjs#L6) `(relativePath)`. Lee el fuente local que la comprobación estática inspecciona. Usa `path.join`, `fs.existsSync`, `fs.readFileSync`. Consumidores: [L20](../../../tooling/android/phase3-shell-check.mjs#L20) `main`.
- [assertIncludes](../../../tooling/android/phase3-shell-check.mjs#L14) `(content, needle, label)`. Contrasta una cadena esperada con el archivo inspeccionado y hace visible la condición que rompió la fase. Usa `content.includes`. Consumidores: [L20](../../../tooling/android/phase3-shell-check.mjs#L20) `main`.
- [main](../../../tooling/android/phase3-shell-check.mjs#L20) `()`. Orquesta los chequeos de esta fase y fija el resultado del comando de validación. Usa `readText`, `assertIncludes`. Lee [RoleTabs.tsx](../../../apps/referidos-android/src/navigation/RoleTabs.tsx), [appStore.ts](../../../apps/referidos-android/src/shared/store/appStore.ts), [ModalHost.tsx](../../../apps/referidos-android/src/shared/modals/ModalHost.tsx), [FeaturePlaceholder.tsx](../../../apps/referidos-android/src/shared/ui/FeaturePlaceholder.tsx), [modalStore.ts](../../../apps/referidos-android/src/shared/store/modalStore.ts).

En el nivel del módulo se invocan `main`, `process.cwd`.


## tooling/android/phase4-cliente-check.mjs

[Abrir fuente](../../../tooling/android/phase4-cliente-check.mjs) · 52 líneas de texto.

Revisa anclas de la implementación de cliente: accesos de inicio, clasificación QR, historial, perfil y operaciones relacionadas.

Dependencias importadas: `node:fs`, `node:path`.

Se inicia o consume desde `npm run android:phase4:cliente-check`.

### Funciones y callbacks

- [readText](../../../tooling/android/phase4-cliente-check.mjs#L6) `(relativePath)`. Lee el fuente local que la comprobación estática inspecciona. Usa `path.join`, `fs.existsSync`, `fs.readFileSync`. Consumidores: [L20](../../../tooling/android/phase4-cliente-check.mjs#L20) `main`.
- [assertIncludes](../../../tooling/android/phase4-cliente-check.mjs#L14) `(content, needle, label)`. Contrasta una cadena esperada con el archivo inspeccionado y hace visible la condición que rompió la fase. Usa `content.includes`. Consumidores: [L20](../../../tooling/android/phase4-cliente-check.mjs#L20) `main`.
- [main](../../../tooling/android/phase4-cliente-check.mjs#L20) `()`. Orquesta los chequeos de esta fase y fija el resultado del comando de validación. Usa `readText`, `assertIncludes`. Lee [ClienteInicioScreen.tsx](../../../apps/referidos-android/src/features/cliente/ClienteInicioScreen.tsx), [ClienteEscanerScreen.tsx](../../../apps/referidos-android/src/features/cliente/ClienteEscanerScreen.tsx), [ClienteHistorialScreen.tsx](../../../apps/referidos-android/src/features/cliente/ClienteHistorialScreen.tsx), [ClientePerfilScreen.tsx](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx), [entityQueries.ts](../../../apps/referidos-android/src/shared/services/entityQueries.ts).

En el nivel del módulo se invocan `main`, `process.cwd`.


## tooling/android/phase5-negocio-check.mjs

[Abrir fuente](../../../tooling/android/phase5-negocio-check.mjs) · 61 líneas de texto.

Revisa presencia de lógica de negocio para inicio, escáner, canje, gestión de promociones/sucursales y perfil.

Dependencias importadas: `node:fs`, `node:path`.

Se inicia o consume desde `npm run android:phase5:negocio-check`.

### Funciones y callbacks

- [readText](../../../tooling/android/phase5-negocio-check.mjs#L6) `(relativePath)`. Lee el fuente local que la comprobación estática inspecciona. Usa `path.join`, `fs.existsSync`, `fs.readFileSync`. Consumidores: [L20](../../../tooling/android/phase5-negocio-check.mjs#L20) `main`.
- [assertIncludes](../../../tooling/android/phase5-negocio-check.mjs#L14) `(content, needle, label)`. Contrasta una cadena esperada con el archivo inspeccionado y hace visible la condición que rompió la fase. Usa `content.includes`. Consumidores: [L20](../../../tooling/android/phase5-negocio-check.mjs#L20) `main`.
- [main](../../../tooling/android/phase5-negocio-check.mjs#L20) `()`. Orquesta los chequeos de esta fase y fija el resultado del comando de validación. Usa `readText`, `assertIncludes`. Lee [NegocioInicioScreen.tsx](../../../apps/referidos-android/src/features/negocio/NegocioInicioScreen.tsx), [NegocioEscanerScreen.tsx](../../../apps/referidos-android/src/features/negocio/NegocioEscanerScreen.tsx), [NegocioGestionarScreen.tsx](../../../apps/referidos-android/src/features/negocio/NegocioGestionarScreen.tsx), [NegocioPerfilScreen.tsx](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx), [entityQueries.ts](../../../apps/referidos-android/src/shared/services/entityQueries.ts).

En el nivel del módulo se invocan `main`, `process.cwd`.


## tooling/android/phase6-native-check.mjs

[Abrir fuente](../../../tooling/android/phase6-native-check.mjs) · 74 líneas de texto.

Comprueba presencia del mapa nativo, GPS, lector, permisos e integración de políticas de seguridad y perfil.

Dependencias importadas: `node:fs`, `node:path`.

Se inicia o consume desde `npm run android:phase6:native-check`.

### Funciones y callbacks

- [readText](../../../tooling/android/phase6-native-check.mjs#L6) `(relativePath)`. Lee el fuente local que la comprobación estática inspecciona. Usa `path.join`, `fs.existsSync`, `fs.readFileSync`. Consumidores: [L20](../../../tooling/android/phase6-native-check.mjs#L20) `main`.
- [assertIncludes](../../../tooling/android/phase6-native-check.mjs#L14) `(content, needle, label)`. Contrasta una cadena esperada con el archivo inspeccionado y hace visible la condición que rompió la fase. Usa `content.includes`. Consumidores: [L20](../../../tooling/android/phase6-native-check.mjs#L20) `main`.
- [main](../../../tooling/android/phase6-native-check.mjs#L20) `()`. Orquesta los chequeos de esta fase y fija el resultado del comando de validación. Usa `readText`, `assertIncludes`. Lee [AddressStepBlock.tsx](../../../apps/referidos-android/src/features/auth/blocks/AddressStepBlock.tsx), [NativeQrScannerBlock.tsx](../../../apps/referidos-android/src/features/scanner/NativeQrScannerBlock.tsx), [localAccessSecurity.ts](../../../apps/referidos-android/src/shared/security/localAccessSecurity.ts), [securityStore.ts](../../../apps/referidos-android/src/shared/store/securityStore.ts), [appStore.ts](../../../apps/referidos-android/src/shared/store/appStore.ts), [ClientePerfilScreen.tsx](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx), [NegocioPerfilScreen.tsx](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx), [createMobileApi.js](../../../packages/api-client/src/createMobileApi.js), [territory.js](../../../packages/api-client/src/address/territory.js).

En el nivel del módulo se invocan `main`, `process.cwd`.


## tooling/android/phase7-observability-check.mjs

[Abrir fuente](../../../tooling/android/phase7-observability-check.mjs) · 52 líneas de texto.

Comprueba componentes de saneamiento, deduplicación, muestreo, límites, identificación y lectura de eventos.

Dependencias importadas: `node:fs`, `node:path`.

Se inicia o consume desde `npm run android:phase7:observability-check`.

### Funciones y callbacks

- [readText](../../../tooling/android/phase7-observability-check.mjs#L6) `(relativePath)`. Lee el fuente local que la comprobación estática inspecciona. Usa `path.join`, `fs.existsSync`, `fs.readFileSync`. Consumidores: [L20](../../../tooling/android/phase7-observability-check.mjs#L20) `main`.
- [assertIncludes](../../../tooling/android/phase7-observability-check.mjs#L14) `(content, needle, label)`. Contrasta una cadena esperada con el archivo inspeccionado y hace visible la condición que rompió la fase. Usa `content.includes`. Consumidores: [L20](../../../tooling/android/phase7-observability-check.mjs#L20) `main`.
- [main](../../../tooling/android/phase7-observability-check.mjs#L20) `()`. Orquesta los chequeos de esta fase y fija el resultado del comando de validación. Usa `readText`, `assertIncludes`. Lee [createMobileObservabilityClient.js](../../../packages/observability-sdk/src/createMobileObservabilityClient.js), [App.tsx](../../../apps/referidos-android/src/app/App.tsx), [entityQueries.ts](../../../apps/referidos-android/src/shared/services/entityQueries.ts), [AdminObservabilidadScreen.tsx](../../../apps/referidos-android/src/features/admin/AdminObservabilidadScreen.tsx), [SoporteInboxScreen.tsx](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx).

En el nivel del módulo se invocan `main`, `process.cwd`.


## tooling/android/phase8-support-admin-check.mjs

[Abrir fuente](../../../tooling/android/phase8-support-admin-check.mjs) · 85 líneas de texto.

Revisa conexiones entre perfiles, tickets, inbox, soporte operativo, pantallas de administración y catálogo vigente.

Dependencias importadas: `node:fs`, `node:path`.

Se inicia o consume desde `npm run android:phase8:support-admin-check`.

### Funciones y callbacks

- [readText](../../../tooling/android/phase8-support-admin-check.mjs#L6) `(relativePath)`. Lee el fuente local que la comprobación estática inspecciona. Usa `path.join`, `fs.existsSync`, `fs.readFileSync`. Consumidores: [L26](../../../tooling/android/phase8-support-admin-check.mjs#L26) `main`.
- [assertIncludes](../../../tooling/android/phase8-support-admin-check.mjs#L14) `(content, needle, label)`. Contrasta una cadena esperada con el archivo inspeccionado y hace visible la condición que rompió la fase. Usa `content.includes`. Consumidores: [L26](../../../tooling/android/phase8-support-admin-check.mjs#L26) `main`.
- [assertNotIncludes](../../../tooling/android/phase8-support-admin-check.mjs#L20) `(content, needle, label)`. Contrasta una cadena esperada con el archivo inspeccionado y hace visible la condición que rompió la fase. Usa `content.includes`. Consumidores: [L26](../../../tooling/android/phase8-support-admin-check.mjs#L26) `main`.
- [main](../../../tooling/android/phase8-support-admin-check.mjs#L26) `()`. Orquesta los chequeos de esta fase y fija el resultado del comando de validación. Usa `readText`, `assertIncludes`, `assertNotIncludes`. Lee [ClientePerfilScreen.tsx](../../../apps/referidos-android/src/features/profile/ClientePerfilScreen.tsx), [NegocioPerfilScreen.tsx](../../../apps/referidos-android/src/features/profile/NegocioPerfilScreen.tsx), [SoporteInboxScreen.tsx](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx), [SoporteTicketScreen.tsx](../../../apps/referidos-android/src/features/support/SoporteTicketScreen.tsx), [SoporteIrregularScreen.tsx](../../../apps/referidos-android/src/features/support/SoporteIrregularScreen.tsx), [SoportePerfilScreen.tsx](../../../apps/referidos-android/src/features/profile/SoportePerfilScreen.tsx), [AdminSoporteScreen.tsx](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx), [AdminInicioScreen.tsx](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx), [AdminUsuariosScreen.tsx](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx), [RoleTabs.tsx](../../../apps/referidos-android/src/navigation/RoleTabs.tsx), [android-phase-playbook.md](../../../docs/android-phase-playbook.md).

En el nivel del módulo se invocan `main`, `process.cwd`.


## tooling/android/phase9-parity-check.mjs

[Abrir fuente](../../../tooling/android/phase9-parity-check.mjs) · 69 líneas de texto.

Comprueba la matriz histórica y diferentes partes del alcance de paridad, incluidas pantallas administrativas y telemetría de arranque.

Dependencias importadas: `node:fs`, `node:path`.

Se inicia o consume desde `npm run android:phase9:parity-check`.

### Funciones y callbacks

- [readText](../../../tooling/android/phase9-parity-check.mjs#L6) `(relativePath)`. Lee el fuente local que la comprobación estática inspecciona. Usa `path.join`, `fs.existsSync`, `fs.readFileSync`. Consumidores: [L26](../../../tooling/android/phase9-parity-check.mjs#L26) `main`.
- [assertIncludes](../../../tooling/android/phase9-parity-check.mjs#L14) `(content, needle, label)`. Contrasta una cadena esperada con el archivo inspeccionado y hace visible la condición que rompió la fase. Usa `content.includes`. Consumidores: [L26](../../../tooling/android/phase9-parity-check.mjs#L26) `main`.
- [assertNotIncludes](../../../tooling/android/phase9-parity-check.mjs#L20) `(content, needle, label)`. Contrasta una cadena esperada con el archivo inspeccionado y hace visible la condición que rompió la fase. Usa `content.includes`. Consumidores: [L26](../../../tooling/android/phase9-parity-check.mjs#L26) `main`.
- [main](../../../tooling/android/phase9-parity-check.mjs#L26) `()`. Orquesta los chequeos de esta fase y fija el resultado del comando de validación. Usa `readText`, `assertIncludes`, `assertNotIncludes`. Lee [android-parity-certification-matrix.md](../../../docs/android-parity-certification-matrix.md), [android-phase-playbook.md](../../../docs/android-phase-playbook.md), [App.tsx](../../../apps/referidos-android/src/app/App.tsx), [AdminInicioScreen.tsx](../../../apps/referidos-android/src/features/admin/AdminInicioScreen.tsx), [AdminUsuariosScreen.tsx](../../../apps/referidos-android/src/features/admin/AdminUsuariosScreen.tsx), [AdminSoporteScreen.tsx](../../../apps/referidos-android/src/features/admin/AdminSoporteScreen.tsx), [SoporteInboxScreen.tsx](../../../apps/referidos-android/src/features/support/SoporteInboxScreen.tsx).

En el nivel del módulo se invocan `main`, `process.cwd`.


## tooling/android/phase9-release-check.mjs

[Abrir fuente](../../../tooling/android/phase9-release-check.mjs) · 77 líneas de texto.

Inspecciona configuración de firma/templates y espera APK debug/release, metadata de firma y mapping de minificación. Comprueba artefactos presentes en disco como parte del flujo de prueba.

Dependencias importadas: `node:fs`, `node:path`.

Se inicia o consume desde `npm run android:phase9:release-check`.

### Funciones y callbacks

- [readText](../../../tooling/android/phase9-release-check.mjs#L6) `(relativePath)`. Lee el fuente local que la comprobación estática inspecciona. Usa `path.join`, `fs.existsSync`, `fs.readFileSync`. Consumidores: [L36](../../../tooling/android/phase9-release-check.mjs#L36) `main`.
- [assertIncludes](../../../tooling/android/phase9-release-check.mjs#L14) `(content, needle, label)`. Contrasta una cadena esperada con el archivo inspeccionado y hace visible la condición que rompió la fase. Usa `content.includes`. Consumidores: [L36](../../../tooling/android/phase9-release-check.mjs#L36) `main`.
- [assertFileExists](../../../tooling/android/phase9-release-check.mjs#L20) `(relativePath, label)`. Comprueba la existencia o tamaño de un artefacto Android que la fase espera haber generado. Usa `path.join`, `fs.existsSync`. Consumidores: [L28](../../../tooling/android/phase9-release-check.mjs#L28) `assertFileSize`, [L36](../../../tooling/android/phase9-release-check.mjs#L36) `main`.
- [assertFileSize](../../../tooling/android/phase9-release-check.mjs#L28) `(relativePath, minBytes, label)`. Comprueba la existencia o tamaño de un artefacto Android que la fase espera haber generado. Usa `assertFileExists`, `fs.statSync`. Consumidores: [L36](../../../tooling/android/phase9-release-check.mjs#L36) `main`.
- [main](../../../tooling/android/phase9-release-check.mjs#L36) `()`. Orquesta los chequeos de esta fase y fija el resultado del comando de validación. Usa `readText`, `assertIncludes`, `assertFileSize`, `assertFileExists`. Lee [package.json](../../../package.json), [build.gradle](../../../apps/referidos-android/android/app/build.gradle), [.gitignore](../../../.gitignore), [env.example.json](../../../apps/referidos-android/env.example.json), [env.development.example.json](../../../apps/referidos-android/env.development.example.json), [env.staging.example.json](../../../apps/referidos-android/env.staging.example.json), [env.production.example.json](../../../apps/referidos-android/env.production.example.json), [android-console-runbook.md](../../../docs/android-console-runbook.md).

En el nivel del módulo se invocan `main`, `process.cwd`.


## tooling/android/start-android-metro.mjs

[Abrir fuente](../../../tooling/android/start-android-metro.mjs) · 91 líneas de texto.

Comprueba si Metro ya responde en el puerto, distingue un conflicto de otro proceso y ejecuta el script del workspace con `--reset-cache`. Usa la invocación adecuada para Windows o Unix.

Dependencias importadas: `node:net`, `node:child_process`.

Se inicia o consume desde `npm run android:metro`.

### Funciones y callbacks

- [withTimeout](../../../tooling/android/start-android-metro.mjs#L8) `(promise, ms)`. Acota una espera asíncrona de diagnóstico para evitar que la detección de Metro bloquee el inicio. Usa `setTimeout`, `resolve`, `promise.then.catch.finally`, `clearTimeout`, `promise.then.catch`, `promise.then`. Consumidores: [L33](../../../tooling/android/start-android-metro.mjs#L33) `isPortOpen`.
- [isMetroRunning](../../../tooling/android/start-android-metro.mjs#L17) `(targetPort)` · asíncrona. Pregunta al endpoint de estado del puerto si el proceso que responde es Metro. Usa `setTimeout`, `controller.abort`, `fetch`, `response.text`, `clearTimeout`, `text.includes`.
- [isPortOpen](../../../tooling/android/start-android-metro.mjs#L33) `(targetPort)`. Comprueba si hay un proceso escuchando en el puerto para distinguir Metro de otro servicio. Usa `withTimeout`, `socket.once`, `socket.destroy`, `resolve`, `socket.connect`.

En el nivel del módulo se invocan `isMetroRunning`, `isPortOpen`, `spawn`, `child.on`, `process.exit`.


## tooling/fonts/subset-prelaunch-fonts.mjs

[Abrir fuente](../../../tooling/fonts/subset-prelaunch-fonts.mjs) · 117 líneas de texto.

Produce archivos de fuente reducidos para Prelaunch a partir de fuentes originales. Revisa la carga del CSS antes de ajustar fuentes o pesos.

Dependencias importadas: `node:fs/promises`, `node:path`, `node:module`, `node:url`, `subset-font`.

Se inicia o consume desde `npm run fonts:subset:prelaunch`.

### Funciones y callbacks

- [collectTextFiles](../../../tooling/fonts/subset-prelaunch-fonts.mjs#L59) `(dir)` · asíncrona. Recorre la entrada de Prelaunch y retiene los archivos de texto usados para seleccionar glifos. Usa `entry.isDirectory`, `collectTextFiles`, `TEXT_FILE_EXTENSIONS.has`, `fs.readdir`, `path.join`, `files.push`, `path.extname`. Consumidores: [L78](../../../tooling/fonts/subset-prelaunch-fonts.mjs#L78) `buildSubsetText`.
- [buildSubsetText](../../../tooling/fonts/subset-prelaunch-fonts.mjs#L78) `()` · asíncrona. Construye el conjunto de caracteres de los archivos y textos base que orientan el recorte de fuentes. Usa `collectTextFiles`, `char.codePointAt`, `characters.add`, `files.push`, `fs.readFile`. Consumidores: [L97](../../../tooling/fonts/subset-prelaunch-fonts.mjs#L97) `main`.
- [main](../../../tooling/fonts/subset-prelaunch-fonts.mjs#L97) `()` · asíncrona. Orquesta la entrada del script y coordina lectura de argumentos, operaciones y resultado. Usa `buildSubsetText`, `subsetFont`, `fs.mkdir`, `path.dirname`, `fs.readFile`, `fs.writeFile`.
- [callback de main.catch](../../../tooling/fonts/subset-prelaunch-fonts.mjs#L113) `(error)`. Captura una excepción al ejecutar main y comunica el fallo al proceso que invocó este comando.

En el nivel del módulo se invocan `createRequire`, `require`, `fileURLToPath`, `main`, `path.dirname`, `path.resolve`, `path.join`, `main.catch`.


## tooling/guardrails/check-mojibake.mjs

[Abrir fuente](../../../tooling/guardrails/check-mojibake.mjs) · 105 líneas de texto.

Detecta caracteres mal decodificados en archivos de texto. Forma parte del comando lint de la raíz.

Dependencias importadas: `node:fs`, `node:path`.

Se inicia o consume desde `npm run lint:mojibake`.

### Funciones y callbacks

- [listTextFiles](../../../tooling/guardrails/check-mojibake.mjs#L39) `(rootDir = …)`. Recorre el checkout siguiendo las exclusiones del guard de codificación. Usa `stack.pop`, `readdirSync`, `entry.name.startsWith`, `entry.isDirectory`, `SKIP_DIRS.has`, `shouldScan`, `join`, `stack.push`.
- [shouldScan](../../../tooling/guardrails/check-mojibake.mjs#L67) `(filePath)`. Decide si se debe escanear un archivo según extensión y excepciones conocidas. Usa `extname.toLowerCase`, `extname`, `TEXT_EXTENSIONS.has`. Consumidores: [L39](../../../tooling/guardrails/check-mojibake.mjs#L39) `listTextFiles`.
- [checkFile](../../../tooling/guardrails/check-mojibake.mjs#L72) `(filePath)`. Busca indicadores de mojibake y ubica la evidencia por línea para el guard de codificación. Usa `filePath.replaceAll`, `ALLOWED_LEGACY_FILES.has`, `readFileSync`, `MOJIBAKE_PATTERN.test`, `content.match`, `filePath.replaceAll.replace`.

En el nivel del módulo se invocan `listTextFiles`, `shouldScan`, `checkFile`, `offenders.push`, `process.exit`.


## tooling/guardrails/verify-android-scope.mjs

[Abrir fuente](../../../tooling/guardrails/verify-android-scope.mjs) · 86 líneas de texto.

Compara `git diff --name-only` con una lista de prefijos y una línea base opcional. Pertenece al circuito de migración Android. Sus prefijos históricos no incluyen todos los nombres actuales de los paquetes compartidos y el diff sin argumentos cubre los cambios unstaged.

Dependencias importadas: `node:child_process`, `node:fs`, `node:path`.

Se inicia o consume desde `npm run android:guardrail`, `npm run android:guardrail:print`.

### Funciones y callbacks

- [readChangedFiles](../../../tooling/guardrails/verify-android-scope.mjs#L22) `()`. Obtiene archivos modificados para el guard de alcance de Android. Usa `execFileSync`, `execFileSync.trim`, `raw.split.map.filter`, `raw.split.map`, `raw.split`, `line.trim`, `fallback.split.map.filter`, `fallback.split.map`.
- [isAllowed](../../../tooling/guardrails/verify-android-scope.mjs#L45) `(filePath)`. Comprueba si un archivo pertenece a los prefijos admitidos por ese guard. Usa `ALLOWED_PREFIXES.some`, `prefix.endsWith`, `filePath.startsWith`.

En el nivel del módulo se invocan `args.has`, `readChangedFiles`, `baselineSet.has`, `isAllowed`, `process.argv.slice`, `path.resolve`, `process.cwd`, `fs.existsSync`.


## tooling/observability/upload-sourcemaps.mjs

[Abrir fuente](../../../tooling/observability/upload-sourcemaps.mjs) · 424 líneas de texto.

Recorre los mapas del dist, comprueba sourcesContent, los copia a Storage, registra el manifiesto de release y gestiona limpieza de versiones anteriores. El workflow decide qué directorio termina en Netlify.

Dependencias importadas: `node:fs/promises`, `node:path`, `node:child_process`, `@supabase/supabase-js`.

Se inicia o consume desde `npm run build:app:release`, `npm run build:prelaunch:release`, [versioning-deploy-artifact.yml](../../../.github/workflows/versioning-deploy-artifact.yml#L623).

### Funciones y callbacks

- [parseArgs](../../../tooling/observability/upload-sourcemaps.mjs#L10) `(argv)`. Lee las opciones del comando y prepara los argumentos que consume la operación principal. Usa `token.startsWith`, `next.startsWith`, `token.slice`. Consumidores: [L175](../../../tooling/observability/upload-sourcemaps.mjs#L175) `main`.
- [safeSegment](../../../tooling/observability/upload-sourcemaps.mjs#L27) `(value)`. Convierte un segmento de ruta o identificador a caracteres apropiados para almacenamiento y nombres de archivo. Consumidores: [L175](../../../tooling/observability/upload-sourcemaps.mjs#L175) `main`.
- [toPosix](../../../tooling/observability/upload-sourcemaps.mjs#L35) `(filePath)`. Normaliza separadores de rutas para comparar claves de archivos o incorporarlas a un manifiesto independiente de Windows. Usa `filePath.split.join`, `filePath.split`. Consumidores: [L175](../../../tooling/observability/upload-sourcemaps.mjs#L175) `main`.
- [readGitBuildId](../../../tooling/observability/upload-sourcemaps.mjs#L39) `()`. Toma un identificador de Git como respaldo si no se proporcionó el de la compilación publicada. Usa `execSync`, `execSync.trim`. Consumidores: [L175](../../../tooling/observability/upload-sourcemaps.mjs#L175) `main`.
- [collectMapFiles](../../../tooling/observability/upload-sourcemaps.mjs#L51) `(baseDir, current = …)` · asíncrona. Recorre la salida compilada y reúne sourcemaps para construir el inventario que se sube a Storage. Usa `entry.isDirectory`, `collectMapFiles`, `entry.isFile`, `entry.name.endsWith`, `path.join`, `fs.readdir`, `files.push`. Consumidores: [L175](../../../tooling/observability/upload-sourcemaps.mjs#L175) `main`.
- [chunk](../../../tooling/observability/upload-sourcemaps.mjs#L69) `(items, size)`. Agrupa elementos en bloques para procesarlos por lotes. Usa `out.push`, `items.slice`. Consumidores: [L103](../../../tooling/observability/upload-sourcemaps.mjs#L103) `removeStoragePaths`.
- [normalizeTenantLabel](../../../tooling/observability/upload-sourcemaps.mjs#L77) `(value)`. Homogeneiza el nombre de tenant antes de comparar las referencias de observabilidad. Consumidores: [L112](../../../tooling/observability/upload-sourcemaps.mjs#L112) `resolveTenant`.
- [hasUsableSourcesContent](../../../tooling/observability/upload-sourcemaps.mjs#L83) `(mapJson)`. Comprueba si un sourcemap incluye contenidos de origen suficientes para simbolicación. Usa `sourcesContent.some`, `entry.trim`. Consumidores: [L175](../../../tooling/observability/upload-sourcemaps.mjs#L175) `main`.
- [downloadJson](../../../tooling/observability/upload-sourcemaps.mjs#L92) `(supabase, bucket, storagePath)` · asíncrona. Obtiene y convierte un objeto JSON de Storage usado en el registro de sourcemaps. Usa `supabase.storage.from.download`, `supabase.storage.from`, `data.text`. Consumidores: [L175](../../../tooling/observability/upload-sourcemaps.mjs#L175) `main`.
- [removeStoragePaths](../../../tooling/observability/upload-sourcemaps.mjs#L103) `(supabase, bucket, paths)` · asíncrona. Retira de Storage un lote de objetos antiguos durante la retención de sourcemaps. Usa `chunk`, `supabase.storage.from.remove`, `supabase.storage.from`. Consumidores: [L175](../../../tooling/observability/upload-sourcemaps.mjs#L175) `main`.
- [resolveTenant](../../../tooling/observability/upload-sourcemaps.mjs#L112) `({ supabase, tenantIdHint, tenantNameHint })` · asíncrona. Resuelve el registro de tenant con el que se asocia el manifiesto de observabilidad. Usa `supabase.from.select.eq.limit.maybeSingle`, `supabase.from.select.eq.limit`, `supabase.from.select.eq`, `supabase.from.select`, `supabase.from`, `supabase.from.select.ilike.limit.maybeSingle`, `supabase.from.select.ilike.limit`, `supabase.from.select.ilike`. Consumidores: [L175](../../../tooling/observability/upload-sourcemaps.mjs#L175) `main`.
- [main](../../../tooling/observability/upload-sourcemaps.mjs#L175) `()` · asíncrona. Orquesta la entrada del script y coordina lectura de argumentos, operaciones y resultado. Usa `parseArgs`, `readGitBuildId`, `collectMapFiles`, `createClient`, `resolveTenant`, `safeSegment`, `toPosix`, `hasUsableSourcesContent`.
- [callback de main.catch](../../../tooling/observability/upload-sourcemaps.mjs#L420) `(error)`. Captura una excepción al ejecutar main y comunica el fallo al proceso que invocó este comando. Usa `process.exit`.

### Contacto con Supabase

- [L121](../../../tooling/observability/upload-sourcemaps.mjs#L121) · `from`: `tenants`.
- [L132](../../../tooling/observability/upload-sourcemaps.mjs#L132) · `from`: `tenants`.
- [L141](../../../tooling/observability/upload-sourcemaps.mjs#L141) · `from`: `tenants`.
- [L305](../../../tooling/observability/upload-sourcemaps.mjs#L305) · `from`: `obs_releases`.
- [L329](../../../tooling/observability/upload-sourcemaps.mjs#L329) · `from`: `obs_releases`.
- [L342](../../../tooling/observability/upload-sourcemaps.mjs#L342) · `from`: `obs_releases`.
- [L391](../../../tooling/observability/upload-sourcemaps.mjs#L391) · `from`: `obs_releases`.

En el nivel del módulo se invocan `main`, `process.cwd`, `main.catch`.


## tooling/scripts/migrate_auth_and_sync.js

[Abrir fuente](../../../tooling/scripts/migrate_auth_and_sync.js) · 142 líneas de texto.

Script de mantenimiento histórico para migrar o sincronizar perfiles con Auth. Revisa cuidadosamente entradas, destino y comportamiento antes de considerar su uso.

Dependencias importadas: `dotenv`, `@supabase/supabase-js`.

### Funciones y callbacks

- [findAuthUserByEmail](../../../tooling/scripts/migrate_auth_and_sync.js#L57) `(email)` · asíncrona. Busca paginando los usuarios de Supabase Auth para reutilizar un registro existente durante la migración histórica. Usa `supabase.auth.admin.listUsers`, `data.users.find`. Consumidores: [L70](../../../tooling/scripts/migrate_auth_and_sync.js#L70) `ensureAuthUser`.
- [ensureAuthUser](../../../tooling/scripts/migrate_auth_and_sync.js#L70) `({ email, password })` · asíncrona. Reutiliza un usuario Auth o lo crea desde los datos del lote histórico. Usa `findAuthUserByEmail`, `supabase.auth.admin.updateUserById`, `supabase.auth.admin.createUser`. Consumidores: [L125](../../../tooling/scripts/migrate_auth_and_sync.js#L125) `run`.
- [reloadSchemaCache](../../../tooling/scripts/migrate_auth_and_sync.js#L88) `()` · asíncrona. Solicita la recarga de metadata que utiliza la API cuando la sincronización detecta un desajuste de esquema. Usa `supabase.rpc`. Consumidores: [L98](../../../tooling/scripts/migrate_auth_and_sync.js#L98) `syncProfile`.
- [syncProfile](../../../tooling/scripts/migrate_auth_and_sync.js#L98) `(authUser, { role, telefono })` · asíncrona. Sincroniza el perfil en la base de la app después de resolver el usuario Auth. Reintenta cuando se recarga la metadata. Usa `upsert`, `reloadSchemaCache`. Consumidores: [L125](../../../tooling/scripts/migrate_auth_and_sync.js#L125) `run`.
- [upsert](../../../tooling/scripts/migrate_auth_and_sync.js#L99) `()`. Encapsula la escritura del perfil para poder reutilizarla en el reintento. Usa `supabase.from.upsert`, `supabase.from`. Consumidores: [L98](../../../tooling/scripts/migrate_auth_and_sync.js#L98) `syncProfile`.
- [run](../../../tooling/scripts/migrate_auth_and_sync.js#L125) `()` · asíncrona. Recorre el lote histórico, asegura el usuario Auth y sincroniza su perfil. Usa `ensureAuthUser`, `syncProfile`.

### Contacto con Supabase

- [L90](../../../tooling/scripts/migrate_auth_and_sync.js#L90) · `rpc`: `postgrest_reload_schema`.
- [L100](../../../tooling/scripts/migrate_auth_and_sync.js#L100) · `from`: `usuarios`.

En el nivel del módulo se invocan `dotenv.config`, `createClient`, `run`, `process.exit`.


## tooling/versioning/apply-changeset.mjs

[Abrir fuente](../../../tooling/versioning/apply-changeset.mjs) · 588 líneas de texto.

Lee el changeset, valida el destino y lo aplica en OPS con contexto de commit y versión. Sirve de entrada del workflow dev.

Dependencias importadas: `node:fs`, `node:path`, `./shared.mjs`, `./supabase-client.mjs`.

Se inicia o consume desde `npm run versioning:apply`, [versioning-release-dev.yml](../../../.github/workflows/versioning-release-dev.yml#L171).

Módulos locales conectados: [shared.mjs](../../../tooling/versioning/shared.mjs), [supabase-client.mjs](../../../tooling/versioning/supabase-client.mjs).

### Funciones y callbacks

- [parseArgs](../../../tooling/versioning/apply-changeset.mjs#L14) `(argv)`. Lee las opciones del comando y prepara los argumentos que consume la operación principal. Usa `trim`. Consumidores: [L343](../../../tooling/versioning/apply-changeset.mjs#L343) `main`.
- [semverLabel](../../../tooling/versioning/apply-changeset.mjs#L39) `(major, minor, patch)`. Construye la etiqueta legible de versión a partir de sus tres componentes. Consumidores: [L220](../../../tooling/versioning/apply-changeset.mjs#L220) `createInitialReleaseWithoutDiff`, [L343](../../../tooling/versioning/apply-changeset.mjs#L343) `main`.
- [compareSemver](../../../tooling/versioning/apply-changeset.mjs#L43) `(a, b)`. Compara releases por componentes numéricos de SemVer. Usa `parseSemver`. Consumidores: [L343](../../../tooling/versioning/apply-changeset.mjs#L343) `main`.
- [getLatestRelease](../../../tooling/versioning/apply-changeset.mjs#L51) `(supabase, tenantId, productId, envId)` · asíncrona. Busca la última release del tenant, producto y entorno para tener base al aplicar el changeset. Usa `mustData`, `supabase.from.select.eq.eq.eq.is.order.order.order.order.limit`, `supabase.from.select.eq.eq.eq.is.order.order.order.order`, `supabase.from.select.eq.eq.eq.is.order.order.order`, `supabase.from.select.eq.eq.eq.is.order.order`, `supabase.from.select.eq.eq.eq.is.order`, `supabase.from.select.eq.eq.eq.is`, `supabase.from.select.eq.eq.eq`. Consumidores: [L220](../../../tooling/versioning/apply-changeset.mjs#L220) `createInitialReleaseWithoutDiff`, [L343](../../../tooling/versioning/apply-changeset.mjs#L343) `main`.
- [upsertComponent](../../../tooling/versioning/apply-changeset.mjs#L70) `({ supabase, tenantId, productId, component })` · asíncrona. Crea o actualiza el registro del componente versionable antes de calcular su revisión. Usa `mustData`, `supabase.from.upsert.select.limit`, `supabase.from.upsert.select`, `supabase.from.upsert`, `supabase.from`. Consumidores: [L343](../../../tooling/versioning/apply-changeset.mjs#L343) `main`.
- [getLatestComponentRevision](../../../tooling/versioning/apply-changeset.mjs#L101) `(supabase, tenantId, componentId)` · asíncrona. Consulta la revisión más reciente del componente para identificar su base y numeración. Usa `mustData`, `supabase.from.select.eq.eq.order.limit`, `supabase.from.select.eq.eq.order`, `supabase.from.select.eq.eq`, `supabase.from.select.eq`, `supabase.from.select`, `supabase.from`. Consumidores: [L343](../../../tooling/versioning/apply-changeset.mjs#L343) `main`.
- [createComponentRevision](../../../tooling/versioning/apply-changeset.mjs#L115) `({ supabase, tenantId, componentId, latestRevision, component, branch, commitSha })` · asíncrona. Persiste el snapshot de componente y su huella como revisión asociada a un changeset. Usa `mustData`, `supabase.from.insert.select.limit`, `supabase.from.insert.select`, `supabase.from.insert`, `supabase.from`. Consumidores: [L343](../../../tooling/versioning/apply-changeset.mjs#L343) `main`.
- [createReleaseSnapshot](../../../tooling/versioning/apply-changeset.mjs#L159) `({ supabase, tenantId, releaseId, previousReleaseId, productId, changedRevisionMap })` · asíncrona. Agrega las revisiones seleccionadas y el resultado de versionado al snapshot de release. Usa `mustData`, `supabase.from.select.eq.eq`, `supabase.from.select.eq`, `supabase.from.select`, `supabase.from`, `snapshotMap.set`, `changedRevisionMap.entries`, `snapshotMap.entries`. Consumidores: [L220](../../../tooling/versioning/apply-changeset.mjs#L220) `createInitialReleaseWithoutDiff`, [L343](../../../tooling/versioning/apply-changeset.mjs#L343) `main`.
- [createInitialReleaseWithoutDiff](../../../tooling/versioning/apply-changeset.mjs#L220) `({ supabase, args, targetEnv, changeset })` · asíncrona. Permite la primera release con un snapshot inicial cuando todavía no hay un diff base utilizable. Usa `mustSingle`, `supabase.from.select.eq.eq.limit.single`, `supabase.from.select.eq.eq.limit`, `supabase.from.select.eq.eq`, `supabase.from.select.eq`, `supabase.from.select`, `supabase.from`, `getLatestRelease`. Consumidores: [L343](../../../tooling/versioning/apply-changeset.mjs#L343) `main`.
- [main](../../../tooling/versioning/apply-changeset.mjs#L343) `()` · asíncrona. Orquesta la entrada del script y coordina lectura de argumentos, operaciones y resultado. Usa `parseArgs`, `toPosixPath`, `getSupabaseAdminClient`, `mustSingle`, `supabase.from.select.eq.limit.single`, `supabase.from.select.eq.limit`, `supabase.from.select.eq`, `supabase.from.select`.
- [callback de main.catch](../../../tooling/versioning/apply-changeset.mjs#L584) `(error)`. Captura una excepción al ejecutar main y comunica el fallo al proceso que invocó este comando. Usa `process.exit`.

### Contacto con Supabase

- [L53](../../../tooling/versioning/apply-changeset.mjs#L53) · `from`: `version_releases`.
- [L77](../../../tooling/versioning/apply-changeset.mjs#L77) · `from`: `version_components`.
- [L103](../../../tooling/versioning/apply-changeset.mjs#L103) · `from`: `version_component_revisions`.
- [L134](../../../tooling/versioning/apply-changeset.mjs#L134) · `from`: `version_component_revisions`.
- [L171](../../../tooling/versioning/apply-changeset.mjs#L171) · `from`: `version_release_components`.
- [L183](../../../tooling/versioning/apply-changeset.mjs#L183) · `from`: `version_component_latest_revisions`.
- [L212](../../../tooling/versioning/apply-changeset.mjs#L212) · `from`: `version_release_components`.
- [L231](../../../tooling/versioning/apply-changeset.mjs#L231) · `from`: `version_products`.
- [L260](../../../tooling/versioning/apply-changeset.mjs#L260) · `from`: `version_changesets`.
- [L280](../../../tooling/versioning/apply-changeset.mjs#L280) · `from`: `version_releases`.
- [L327](../../../tooling/versioning/apply-changeset.mjs#L327) · `from`: `version_changesets`.
- [L354](../../../tooling/versioning/apply-changeset.mjs#L354) · `from`: `version_environments`.
- [L373](../../../tooling/versioning/apply-changeset.mjs#L373) · `from`: `version_products`.
- [L384](../../../tooling/versioning/apply-changeset.mjs#L384) · `from`: `version_changesets`.
- [L437](../../../tooling/versioning/apply-changeset.mjs#L437) · `from`: `version_changeset_items`.
- [L503](../../../tooling/versioning/apply-changeset.mjs#L503) · `from`: `version_releases`.
- [L551](../../../tooling/versioning/apply-changeset.mjs#L551) · `from`: `version_changesets`.

En el nivel del módulo se invocan `main`, `main.catch`.


## tooling/versioning/archive-local-artifact.mjs

[Abrir fuente](../../../tooling/versioning/archive-local-artifact.mjs) · 175 líneas de texto.

Prepara una copia local de artefactos de build junto a información para identificar la versión.

Dependencias importadas: `node:fs`, `node:path`, `./shared.mjs`.

Se inicia o consume desde `npm run versioning:archive-local`.

Módulos locales conectados: [shared.mjs](../../../tooling/versioning/shared.mjs).

### Funciones y callbacks

- [parseArgs](../../../tooling/versioning/archive-local-artifact.mjs#L6) `(argv)`. Lee las opciones del comando y prepara los argumentos que consume la operación principal. Consumidores: [L116](../../../tooling/versioning/archive-local-artifact.mjs#L116) `main`.
- [ensureValidArgs](../../../tooling/versioning/archive-local-artifact.mjs#L33) `(args)`. Valida que los identificadores y rutas requeridos para archivar un artefacto tienen forma utilizable. Usa `parseSemver`, `includes`. Consumidores: [L116](../../../tooling/versioning/archive-local-artifact.mjs#L116) `main`.
- [sanitizePathSegment](../../../tooling/versioning/archive-local-artifact.mjs#L53) `(value)`. Convierte un segmento de ruta o identificador a caracteres apropiados para almacenamiento y nombres de archivo. Consumidores: [L116](../../../tooling/versioning/archive-local-artifact.mjs#L116) `main`.
- [readRegistry](../../../tooling/versioning/archive-local-artifact.mjs#L61) `(registryPath)`. Carga el índice local de artefactos y prepara su forma de respaldo cuando corresponde. Usa `fs.existsSync`, `fs.readFileSync`. Consumidores: [L116](../../../tooling/versioning/archive-local-artifact.mjs#L116) `main`.
- [writeRegistry](../../../tooling/versioning/archive-local-artifact.mjs#L72) `(registryPath, payload)`. Persiste el índice local actualizado para que la copia y sus metadatos sean localizables. Usa `fs.mkdirSync`, `path.dirname`, `fs.writeFileSync`. Consumidores: [L116](../../../tooling/versioning/archive-local-artifact.mjs#L116) `main`.
- [countFilesRecursive](../../../tooling/versioning/archive-local-artifact.mjs#L77) `(absDir)`. Cuenta los contenidos de un artefacto en disco para registrar el resumen de la copia. Usa `walk`. Consumidores: [L116](../../../tooling/versioning/archive-local-artifact.mjs#L116) `main`.
- [walk](../../../tooling/versioning/archive-local-artifact.mjs#L79) `(current)`. Recorre directorios de forma recursiva para el conteo o la selección de archivos que pide la operación que lo invoca. Usa `entry.isDirectory`, `walk`, `entry.isFile`, `fs.readdirSync`, `path.join`. Consumidores: [L77](../../../tooling/versioning/archive-local-artifact.mjs#L77) `countFilesRecursive`.
- [upsertRecord](../../../tooling/versioning/archive-local-artifact.mjs#L94) `({ registry, key, payload })`. Agrega o reemplaza la entrada de un artefacto en el índice local usando su clave. Usa `registry.items.findIndex`, `toISOString`, `registry.items.push`. Consumidores: [L116](../../../tooling/versioning/archive-local-artifact.mjs#L116) `main`.
- [main](../../../tooling/versioning/archive-local-artifact.mjs#L116) `()` · asíncrona. Orquesta la entrada del script y coordina lectura de argumentos, operaciones y resultado. Usa `parseArgs`, `ensureValidArgs`, `sanitizePathSegment`, `readRegistry`, `upsertRecord`, `toPosixPath`, `countFilesRecursive`, `writeRegistry`.
- [callback de main.catch](../../../tooling/versioning/archive-local-artifact.mjs#L170) `(error)`. Captura una excepción al ejecutar main y comunica el fallo al proceso que invocó este comando. Usa `process.exit`.

En el nivel del módulo se invocan `main`, `main.catch`.


## tooling/versioning/bootstrap-baseline.mjs

[Abrir fuente](../../../tooling/versioning/bootstrap-baseline.mjs) · 242 líneas de texto.

Inicializa el catálogo y baseline de productos/componentes de OPS. Corresponde a arranque o backfill controlado.

Dependencias importadas: `./shared.mjs`, `./supabase-client.mjs`.

Se inicia o consume desde `npm run versioning:bootstrap`.

Módulos locales conectados: [shared.mjs](../../../tooling/versioning/shared.mjs), [supabase-client.mjs](../../../tooling/versioning/supabase-client.mjs).

### Funciones y callbacks

- [parseArgs](../../../tooling/versioning/bootstrap-baseline.mjs#L10) `(argv)`. Lee las opciones del comando y prepara los argumentos que consume la operación principal. Usa `item.trim`, `out.products.push`. Consumidores: [L142](../../../tooling/versioning/bootstrap-baseline.mjs#L142) `main`.
- [buildFileComponents](../../../tooling/versioning/bootstrap-baseline.mjs#L52) `(productKey, files)`. Construye identificadores de componentes para archivos concretos que el catálogo versiona. Usa `files.map`. Consumidores: [L142](../../../tooling/versioning/bootstrap-baseline.mjs#L142) `main`.
- [buildLogicalComponents](../../../tooling/versioning/bootstrap-baseline.mjs#L61) `(product, files)`. Construye el alcance de una agrupación lógica de archivos según el mapa de componentes. Usa `matchesAnyGlob`, `files.filter`, `components.push`. Consumidores: [L142](../../../tooling/versioning/bootstrap-baseline.mjs#L142) `main`.
- [upsertComponentAndRevision](../../../tooling/versioning/bootstrap-baseline.mjs#L75) `({ supabase, tenantId, productId, component, baseline })` · asíncrona. Registra el componente y su revisión inicial con una huella reproducible de los archivos de base. Usa `mustSingle`, `supabase.from.upsert.select.single`, `supabase.from.upsert.select`, `supabase.from.upsert`, `supabase.from`, `mustData`, `supabase.from.select.eq.eq.order.limit`, `supabase.from.select.eq.eq.order`. Consumidores: [L142](../../../tooling/versioning/bootstrap-baseline.mjs#L142) `main`.
- [main](../../../tooling/versioning/bootstrap-baseline.mjs#L142) `()` · asíncrona. Orquesta la entrada del script y coordina lectura de argumentos, operaciones y resultado. Usa `parseArgs`, `loadComponentMap`, `getSupabaseAdminClient`, `mustData`, `supabase.from.select.in`, `supabase.from.select`, `supabase.from`, `selectedProductKeys.has`.
- [callback de main.catch](../../../tooling/versioning/bootstrap-baseline.mjs#L238) `(error)`. Captura una excepción al ejecutar main y comunica el fallo al proceso que invocó este comando. Usa `process.exit`.

### Contacto con Supabase

- [L83](../../../tooling/versioning/bootstrap-baseline.mjs#L83) · `from`: `version_components`.
- [L104](../../../tooling/versioning/bootstrap-baseline.mjs#L104) · `from`: `version_component_revisions`.
- [L121](../../../tooling/versioning/bootstrap-baseline.mjs#L121) · `from`: `version_component_revisions`.
- [L149](../../../tooling/versioning/bootstrap-baseline.mjs#L149) · `from`: `version_environments`.
- [L171](../../../tooling/versioning/bootstrap-baseline.mjs#L171) · `from`: `version_products`.
- [L213](../../../tooling/versioning/bootstrap-baseline.mjs#L213) · `from`: `version_products`.

En el nivel del módulo se invocan `main`, `main.catch`.


## tooling/versioning/detect-changes.mjs

[Abrir fuente](../../../tooling/versioning/detect-changes.mjs) · 285 líneas de texto.

Lee el diff entre referencias, aplica el mapa de rutas y arma el changeset. Es el sitio para investigar por qué un archivo incrementa o no un producto.

Dependencias importadas: `node:fs`, `node:path`, `./shared.mjs`.

Se inicia o consume desde `npm run versioning:detect`, [versioning-detect-dev.yml](../../../.github/workflows/versioning-detect-dev.yml#L82), [versioning-detect-pr.yml](../../../.github/workflows/versioning-detect-pr.yml#L31), [versioning-release-dev.yml](../../../.github/workflows/versioning-release-dev.yml#L95).

Módulos locales conectados: [shared.mjs](../../../tooling/versioning/shared.mjs).

### Funciones y callbacks

- [parseArgs](../../../tooling/versioning/detect-changes.mjs#L19) `(argv)`. Lee las opciones del comando y prepara los argumentos que consume la operación principal. Usa `trim`. Consumidores: [L97](../../../tooling/versioning/detect-changes.mjs#L97) `main`.
- [rootContainsFile](../../../tooling/versioning/detect-changes.mjs#L44) `(root, file)`. Delimita si un archivo cambiado cae dentro de una raíz de producto. Usa `toPosixPath`, `normalizedFile.startsWith`, `toPosixPath.replace`. Consumidores: [L97](../../../tooling/versioning/detect-changes.mjs#L97) `main`.
- [buildFileComponent](../../../tooling/versioning/detect-changes.mjs#L51) `(productKey, relFile)`. Construye identificadores de componentes para archivos concretos que el catálogo versiona. Consumidores: [L97](../../../tooling/versioning/detect-changes.mjs#L97) `main`.
- [componentFromLogical](../../../tooling/versioning/detect-changes.mjs#L60) `(logical, files)`. Construye el alcance de una agrupación lógica de archivos según el mapa de componentes. Consumidores: [L97](../../../tooling/versioning/detect-changes.mjs#L97) `main`.
- [buildSpecialGroup](../../../tooling/versioning/detect-changes.mjs#L69) `(group, changedFiles, statusByPath)`. Aplica la selección de un grupo especial sobre archivos cambiados para la clasificación. Usa `classifyLogicalChange`, `statusByPath.get`, `hashFiles`, `changedFiles.map.filter`, `changedFiles.map`. Consumidores: [L97](../../../tooling/versioning/detect-changes.mjs#L97) `main`.
- [classifyFileChange](../../../tooling/versioning/detect-changes.mjs#L81) `(status)`. Convierte los estados de Git en categorías de cambio que aplica el detector de release. Consumidores: [L97](../../../tooling/versioning/detect-changes.mjs#L97) `main`.
- [classifyLogicalChange](../../../tooling/versioning/detect-changes.mjs#L87) `(statuses = …)`. Convierte los estados de Git en categorías de cambio que aplica el detector de release. Usa `set.has`. Consumidores: [L69](../../../tooling/versioning/detect-changes.mjs#L69) `buildSpecialGroup`, [L97](../../../tooling/versioning/detect-changes.mjs#L97) `main`.
- [main](../../../tooling/versioning/detect-changes.mjs#L97) `()`. Orquesta la entrada del script y coordina lectura de argumentos, operaciones y resultado. Usa `parseArgs`, `loadComponentMap`, `getChangedFilesWithStatus`, `matchesAnyGlob`, `getCommitMessages`, `runGitCommand`, `mappedFiles.add`, `buildSpecialGroup`.

En el nivel del módulo se invocan `main`.


## tooling/versioning/promote-release.mjs

[Abrir fuente](../../../tooling/versioning/promote-release.mjs) · 53 líneas de texto.

Llama a OPS para promover la release por SemVer de un entorno a otro.

Dependencias importadas: `./supabase-client.mjs`.

Se inicia o consume desde `npm run versioning:promote`, [versioning-promote.yml](../../../.github/workflows/versioning-promote.yml#L57).

Módulos locales conectados: [supabase-client.mjs](../../../tooling/versioning/supabase-client.mjs).

### Funciones y callbacks

- [parseArgs](../../../tooling/versioning/promote-release.mjs#L4) `(argv)`. Lee las opciones del comando y prepara los argumentos que consume la operación principal. Consumidores: [L26](../../../tooling/versioning/promote-release.mjs#L26) `main`.
- [main](../../../tooling/versioning/promote-release.mjs#L26) `()` · asíncrona. Orquesta la entrada del script y coordina lectura de argumentos, operaciones y resultado. Usa `parseArgs`, `getSupabaseAdminClient`, `mustSingle`, `supabase.rpc`, `process.argv.slice`.
- [callback de main.catch](../../../tooling/versioning/promote-release.mjs#L49) `(error)`. Captura una excepción al ejecutar main y comunica el fallo al proceso que invocó este comando. Usa `process.exit`.

### Contacto con Supabase

- [L33](../../../tooling/versioning/promote-release.mjs#L33) · `rpc`: `versioning_promote_release`.

En el nivel del módulo se invocan `main`, `main.catch`.


## tooling/versioning/record-deployment.mjs

[Abrir fuente](../../../tooling/versioning/record-deployment.mjs) · 100 líneas de texto.

Persiste estado, identificador y contexto del despliegue en OPS.

Dependencias importadas: `./supabase-client.mjs`, `./shared.mjs`.

Se inicia o consume desde `npm run versioning:record-deploy`, [versioning-record-deployment.yml](../../../.github/workflows/versioning-record-deployment.yml#L62).

Módulos locales conectados: [supabase-client.mjs](../../../tooling/versioning/supabase-client.mjs), [shared.mjs](../../../tooling/versioning/shared.mjs).

### Funciones y callbacks

- [parseArgs](../../../tooling/versioning/record-deployment.mjs#L5) `(argv)`. Lee las opciones del comando y prepara los argumentos que consume la operación principal. Consumidores: [L26](../../../tooling/versioning/record-deployment.mjs#L26) `main`.
- [main](../../../tooling/versioning/record-deployment.mjs#L26) `()` · asíncrona. Orquesta la entrada del script y coordina lectura de argumentos, operaciones y resultado. Usa `parseArgs`, `parseSemver`, `getSupabaseAdminClient`, `mustSingle`, `supabase.from.select.eq.single`, `supabase.from.select.eq`, `supabase.from.select`, `supabase.from`.
- [callback de main.catch](../../../tooling/versioning/record-deployment.mjs#L96) `(error)`. Captura una excepción al ejecutar main y comunica el fallo al proceso que invocó este comando. Usa `process.exit`.

### Contacto con Supabase

- [L39](../../../tooling/versioning/record-deployment.mjs#L39) · `from`: `version_environments`.
- [L47](../../../tooling/versioning/record-deployment.mjs#L47) · `from`: `version_products`.
- [L57](../../../tooling/versioning/record-deployment.mjs#L57) · `from`: `version_releases`.
- [L77](../../../tooling/versioning/record-deployment.mjs#L77) · `from`: `version_deployments`.

En el nivel del módulo se invocan `main`, `main.catch`.


## tooling/versioning/shared.mjs

[Abrir fuente](../../../tooling/versioning/shared.mjs) · 315 líneas de texto.

Utilidades de errores, entorno, semver, cambios y normalización reutilizadas por comandos de versionado.

Dependencias importadas: `node:crypto`, `node:fs`, `node:path`, `node:child_process`.

Se inicia o consume desde [apply-changeset.mjs](../../../tooling/versioning/apply-changeset.mjs), [archive-local-artifact.mjs](../../../tooling/versioning/archive-local-artifact.mjs), [bootstrap-baseline.mjs](../../../tooling/versioning/bootstrap-baseline.mjs), [detect-changes.mjs](../../../tooling/versioning/detect-changes.mjs), [record-deployment.mjs](../../../tooling/versioning/record-deployment.mjs).

### Funciones y callbacks

- [loadComponentMap](../../../tooling/versioning/shared.mjs#L15) `(mapPath = …)`. Lee y valida el mapa de componentes que alimenta alcance y clasificación de versiones. Usa `path.resolve`, `fs.readFileSync`. Consumidores: [bootstrap-baseline.mjs](../../../tooling/versioning/bootstrap-baseline.mjs#L144), [detect-changes.mjs](../../../tooling/versioning/detect-changes.mjs#L99).
- [toPosixPath](../../../tooling/versioning/shared.mjs#L25) `(value)`. Normaliza separadores de rutas para comparar claves de archivos o incorporarlas a un manifiesto independiente de Windows. Usa `value.replace.replace`, `value.replace`. Consumidores: [L55](../../../tooling/versioning/shared.mjs#L55) `globToRegExp`, [L63](../../../tooling/versioning/shared.mjs#L63) `matchesGlob`, [L75](../../../tooling/versioning/shared.mjs#L75) `walk`, [L114](../../../tooling/versioning/shared.mjs#L114) `getChangedFilesWithStatus`, [apply-changeset.mjs](../../../tooling/versioning/apply-changeset.mjs#L347), [archive-local-artifact.mjs](../../../tooling/versioning/archive-local-artifact.mjs#L141), [detect-changes.mjs](../../../tooling/versioning/detect-changes.mjs#L45).
- [unique](../../../tooling/versioning/shared.mjs#L29) `(values)`. Deduplica valores manteniendo la lista utilizable por los consumidores del detector. Consumidores: [L72](../../../tooling/versioning/shared.mjs#L72) `listFilesFromRoots`, [L174](../../../tooling/versioning/shared.mjs#L174) `getChangedFiles`, [detect-changes.mjs](../../../tooling/versioning/detect-changes.mjs#L224).
- [ensureDir](../../../tooling/versioning/shared.mjs#L33) `(dirPath)`. Crea la ruta de salida donde se guardarán los metadatos de tooling. Usa `fs.mkdirSync`. Consumidores: [detect-changes.mjs](../../../tooling/versioning/detect-changes.mjs#L272).
- [hashText](../../../tooling/versioning/shared.mjs#L37) `(value)`. Calcula una huella del contenido usado para detectar cambios de revisión. Usa `crypto.createHash.update.digest`, `crypto.createHash.update`, `crypto.createHash`.
- [hashFiles](../../../tooling/versioning/shared.mjs#L41) `(files)`. Calcula una huella del contenido usado para detectar cambios de revisión. Usa `crypto.createHash`, `hash.update`, `hash.digest`, `sort`, `path.resolve`, `fs.existsSync`, `fs.statSync.isFile`, `fs.statSync`. Consumidores: [bootstrap-baseline.mjs](../../../tooling/versioning/bootstrap-baseline.mjs#L115), [detect-changes.mjs](../../../tooling/versioning/detect-changes.mjs#L77).
- [globToRegExp](../../../tooling/versioning/shared.mjs#L55) `(glob)`. Traduce y evalúa los patrones del mapa sobre las rutas normalizadas. Usa `toPosixPath`, `toPosixPath.replace`, `pattern.replace`. Consumidores: [L63](../../../tooling/versioning/shared.mjs#L63) `matchesGlob`.
- [matchesGlob](../../../tooling/versioning/shared.mjs#L63) `(filePath, glob)`. Traduce y evalúa los patrones del mapa sobre las rutas normalizadas. Usa `toPosixPath`, `globToRegExp.test`, `globToRegExp`. Consumidores: [L68](../../../tooling/versioning/shared.mjs#L68) `matchesAnyGlob`.
- [matchesAnyGlob](../../../tooling/versioning/shared.mjs#L68) `(filePath, globs = …)`. Traduce y evalúa los patrones del mapa sobre las rutas normalizadas. Usa `globs.some`, `matchesGlob`. Consumidores: [L75](../../../tooling/versioning/shared.mjs#L75) `walk`, [L230](../../../tooling/versioning/shared.mjs#L230) `computeBumpForProduct`, [bootstrap-baseline.mjs](../../../tooling/versioning/bootstrap-baseline.mjs#L64), [detect-changes.mjs](../../../tooling/versioning/detect-changes.mjs#L107).
- [listFilesFromRoots](../../../tooling/versioning/shared.mjs#L72) `(roots, ignoreGlobs = …)`. Descubre archivos de las raíces de producto y aplica exclusiones del catálogo. Usa `walk`, `unique`, `path.resolve`, `fs.existsSync`, `unique.sort`. Consumidores: [bootstrap-baseline.mjs](../../../tooling/versioning/bootstrap-baseline.mjs#L180), [detect-changes.mjs](../../../tooling/versioning/detect-changes.mjs#L155).
- [walk](../../../tooling/versioning/shared.mjs#L75) `(absPath)`. Recorre directorios de forma recursiva para el conteo o la selección de archivos que pide la operación que lo invoca. Usa `toPosixPath`, `rel.startsWith`, `matchesAnyGlob`, `stat.isDirectory`, `walk`, `stat.isFile`, `path.relative`, `fs.statSync`. Consumidores: [L72](../../../tooling/versioning/shared.mjs#L72) `listFilesFromRoots`, [archive-local-artifact.mjs](../../../tooling/versioning/archive-local-artifact.mjs#L84).
- [runGitCommand](../../../tooling/versioning/shared.mjs#L102) `(args, fallback = …)`. Ejecuta una lectura de Git en contexto del repo y devuelve su salida o el fallback. Usa `execSync`, `execSync.toString.trim`, `execSync.toString`. Consumidores: [L114](../../../tooling/versioning/shared.mjs#L114) `getChangedFilesWithStatus`, [L178](../../../tooling/versioning/shared.mjs#L178) `getCommitMessages`, [detect-changes.mjs](../../../tooling/versioning/detect-changes.mjs#L114).
- [getChangedFilesWithStatus](../../../tooling/versioning/shared.mjs#L114) `(baseRef, headRef)`. Obtiene el diff entre referencias y expone rutas y, cuando aplica, sus estados. Usa `runGitCommand`, `toPosixPath`, `dedup.get`, `dedup.set`, `dedup.values`, `raw.split.map.filter`, `raw.split.map`, `raw.split`. Consumidores: [L174](../../../tooling/versioning/shared.mjs#L174) `getChangedFiles`, [detect-changes.mjs](../../../tooling/versioning/detect-changes.mjs#L105).
- [getChangedFiles](../../../tooling/versioning/shared.mjs#L174) `(baseRef, headRef)`. Obtiene el diff entre referencias y expone rutas y, cuando aplica, sus estados. Usa `unique`, `getChangedFilesWithStatus`, `getChangedFilesWithStatus.map`.
- [getCommitMessages](../../../tooling/versioning/shared.mjs#L178) `(baseRef, headRef)`. Lee los mensajes de commits del intervalo para determinar intención de versión. Usa `runGitCommand`, `out.split.map.filter`, `out.split.map`, `out.split`, `line.trim`. Consumidores: [detect-changes.mjs](../../../tooling/versioning/detect-changes.mjs#L113).
- [highestBump](../../../tooling/versioning/shared.mjs#L189) `(...levels)`. Selecciona la categoría de incremento con las señales que alimentan la decisión de SemVer. Consumidores: [L207](../../../tooling/versioning/shared.mjs#L207) `deriveBumpFromCommits`, [L230](../../../tooling/versioning/shared.mjs#L230) `computeBumpForProduct`.
- [deriveBumpFromLabels](../../../tooling/versioning/shared.mjs#L198) `(labels = …)`. Selecciona la categoría de incremento con las señales que alimentan la decisión de SemVer. Usa `item.toLowerCase`, `labels.map`, `item.toLowerCase.trim`, `norm.includes`. Consumidores: [L230](../../../tooling/versioning/shared.mjs#L230) `computeBumpForProduct`.
- [deriveBumpFromCommits](../../../tooling/versioning/shared.mjs#L207) `(messages = …)`. Selecciona la categoría de incremento con las señales que alimentan la decisión de SemVer. Usa `msg.toLowerCase`, `test`, `highestBump`, `line.startsWith`, `line.includes`. Consumidores: [L230](../../../tooling/versioning/shared.mjs#L230) `computeBumpForProduct`.
- [computeBumpForProduct](../../../tooling/versioning/shared.mjs#L230) `({ changedFiles, labels, commitMessages, docOnlyGlobs, contractGlobs, minorGlobs })`. Selecciona la categoría de incremento con las señales que alimentan la decisión de SemVer. Usa `deriveBumpFromLabels`, `deriveBumpFromCommits`, `changedFiles.every`, `matchesAnyGlob`, `changedFiles.some`, `highestBump`. Consumidores: [detect-changes.mjs](../../../tooling/versioning/detect-changes.mjs#L146).
- [parseSemver](../../../tooling/versioning/shared.mjs#L278) `(value)`. Interpreta una versión o calcula la siguiente conforme al incremento elegido. Consumidores: [L294](../../../tooling/versioning/shared.mjs#L294) `bumpSemver`, [apply-changeset.mjs](../../../tooling/versioning/apply-changeset.mjs#L44), [archive-local-artifact.mjs](../../../tooling/versioning/archive-local-artifact.mjs#L38), [record-deployment.mjs](../../../tooling/versioning/record-deployment.mjs#L35).
- [formatSemver](../../../tooling/versioning/shared.mjs#L290) `({ major, minor, patch })`. Construye la etiqueta legible de versión a partir de sus tres componentes. Consumidores: [L294](../../../tooling/versioning/shared.mjs#L294) `bumpSemver`.
- [bumpSemver](../../../tooling/versioning/shared.mjs#L294) `(currentSemver, bumpLevel)`. Interpreta una versión o calcula la siguiente conforme al incremento elegido. Usa `parseSemver`, `formatSemver`. Consumidores: [apply-changeset.mjs](../../../tooling/versioning/apply-changeset.mjs#L478).

En el nivel del módulo se invocan `process.cwd`.


## tooling/versioning/supabase-client.mjs

[Abrir fuente](../../../tooling/versioning/supabase-client.mjs) · 37 líneas de texto.

Crea el cliente Supabase usado por el tooling con credenciales de servidor del proceso.

Dependencias importadas: `@supabase/supabase-js`.

Se inicia o consume desde [apply-changeset.mjs](../../../tooling/versioning/apply-changeset.mjs), [bootstrap-baseline.mjs](../../../tooling/versioning/bootstrap-baseline.mjs), [promote-release.mjs](../../../tooling/versioning/promote-release.mjs), [record-deployment.mjs](../../../tooling/versioning/record-deployment.mjs).

### Funciones y callbacks

- [getSupabaseAdminClient](../../../tooling/versioning/supabase-client.mjs#L3) `()`. Construye el cliente administrativo de tooling con credenciales que recibe del entorno de ejecución. Usa `createClient`. Consumidores: [apply-changeset.mjs](../../../tooling/versioning/apply-changeset.mjs#L351), [bootstrap-baseline.mjs](../../../tooling/versioning/bootstrap-baseline.mjs#L145), [promote-release.mjs](../../../tooling/versioning/promote-release.mjs#L31), [record-deployment.mjs](../../../tooling/versioning/record-deployment.mjs#L36).
- [mustSingle](../../../tooling/versioning/supabase-client.mjs#L25) `(queryPromise, context)` · asíncrona. Convierte fallos de una operación Supabase en errores contextualizados y devuelve datos cuando la operación es válida. Consumidores: [apply-changeset.mjs](../../../tooling/versioning/apply-changeset.mjs#L230), [bootstrap-baseline.mjs](../../../tooling/versioning/bootstrap-baseline.mjs#L82), [promote-release.mjs](../../../tooling/versioning/promote-release.mjs#L32), [record-deployment.mjs](../../../tooling/versioning/record-deployment.mjs#L38).
- [mustData](../../../tooling/versioning/supabase-client.mjs#L32) `(queryPromise, context)` · asíncrona. Convierte fallos de una operación Supabase en errores contextualizados y devuelve datos cuando la operación es válida. Consumidores: [apply-changeset.mjs](../../../tooling/versioning/apply-changeset.mjs#L52), [bootstrap-baseline.mjs](../../../tooling/versioning/bootstrap-baseline.mjs#L103), [record-deployment.mjs](../../../tooling/versioning/record-deployment.mjs#L56).
