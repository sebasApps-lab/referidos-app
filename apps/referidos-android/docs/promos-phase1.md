# Referidos Promos · Fase 1

Rama `beta/android-mvp`, base `f00eafd`. Seguimiento de la [auditoría de cuentas y sincronización](promos-accounts-sync-audit.md) y de la [beta 1.1](promos-beta.md).

| Estado | Resultado |
| --- | --- |
| Implementado y probado | Contrato DEV y validación del build. Configuraciones válidas e inválidas, prototipo SQLite y prueba aislada de permisos de sesión. |
| Diseñado para aprobación | Migración reanudable, IDs de negocios, confirmación del nombre en ambas exportaciones y papelera. Borrador local del ajuste de permisos. |
| Bloqueado por configuración o autorización | Cambios remotos de grants, verificación de clientes/allowlist OAuth y presupuesto contratado. El DEV actual solo acredita una clave `anon` heredada para el contrato. |
| Fases posteriores | Migración Android a SQLite, UX de negocios, Google, OTP, sincronización, restauración, soporte y purga. |

## 1. Destino explícito y APK

Android tradicional conserva `env.json`/variables como fuentes y su entrypoint `index.js`. La PWA mantiene `app-config.js` y su fallback Vite. El editor Promos sigue arrancando por `index.promos.js` en ambos modos. [Android tradicional](../src/shared/constants/env.ts) · [Runtime PWA](../../referidos-app/src/config/runtimeConfig.js) · [Entrypoint Promos](../index.promos.js)

- **Offline por defecto.** `-PreferidosPromosBeta=true` conserva la configuración y el manifest sin internet, sin archivo de Supabase. El espacio de datos, firma de desarrollo, identificador y versionado 1.1 siguen vigentes.
- **DEV explícito.** `-PreferidosPromosBeta=true -PreferidosPromosBackend=dev -PreferidosPromosConfig=<archivo>` obliga a una release standalone. Valida los cinco campos antes de preparar recursos. El único asset de configuración se genera dentro de `build/`. La release DEV habilita internet y deshabilita tráfico HTTP claro. Conserva permisos reducidos y el proveedor de exportación. El artefacto prepara la configuración, sin inicializar un cliente de Auth, sincronización ni peticiones de Supabase desde el editor.
- **Claves.** Se verificó un GET de Auth en DEV con la clave pública histórica de DEV. El build exige su huella SHA-256 explícita. El formato de JWT heredado además exige rol `anon` y la referencia DEV. El validador reconoce formato `sb_publishable_`, pero en esta fase no hay una huella de ese tipo aprobada. Para rotar, comprobar en el panel el proyecto y carácter público de la clave, probarla con un GET al host DEV sin redirecciones, revisar el cambio de huella y reconstruir el APK. Nunca incluir una clave secreta, de servicio o de firma en el JSON.
- **Límites del control.** El archivo se valida por igualdad exacta de referencia, host HTTPS y callback, sin fallback a `env.json`, al entorno de la shell o al enlace de Supabase CLI. El permiso de internet de Android no aplica una lista de dominios. En la fase OAuth, el cliente deberá usar solo esta configuración y validar el callback y el issuer de sesión. El manifest compartido registra `/callback` como prefijo. Antes de consumir callbacks, exigir coincidencia de esquema, host y ruta y confirmar el intento PKCE pendiente. [Contrato y huella](../tooling/promos-dev-config.mjs) · [Gradle](../android/app/build.gradle) · [Manifest DEV](../android/app/src/promosDevRelease/AndroidManifest.xml) · [Claves de Supabase](https://supabase.com/docs/guides/getting-started/api-keys)

Ejemplo de archivo local en `.android-local/promos-dev-config.json`, directorio ignorado. Sustituir solo la clave pública de DEV.

```json
{
  "environment": "dev",
  "projectRef": "btvrtxdizqsqrzdsgvsj",
  "supabaseUrl": "https://btvrtxdizqsqrzdsgvsj.supabase.co",
  "publicKey": "<clave pública DEV aprobada>",
  "authRedirectUrl": "referidospromosbeta://auth/callback"
}
```

PowerShell desde la raíz del worktree. Para emulador usar `x86_64` y para teléfono ARM64 usar `arm64-v8a` si se compila para un solo ABI.

```powershell
$promosDevPath = (Resolve-Path '.android-local/promos-dev-config.json').Path
Push-Location apps/referidos-android/android
try {
    .\gradlew.bat :app:assembleRelease -PreferidosPromosBeta=true -PreferidosPromosBackend=dev "-PreferidosPromosConfig=$promosDevPath" -PreactNativeArchitectures=x86_64
    if ($LASTEXITCODE -ne 0) { throw 'Compilación DEV rechazada' }
} finally { Pop-Location }
$buildTools = Join-Path $env:ANDROID_HOME 'build-tools/36.1.0'
& powershell.exe -NoProfile -ExecutionPolicy RemoteSigned -File apps/referidos-android/tooling/verify-promos-apk.ps1 -Mode dev -BuildToolsDirectory $buildTools -Apk apps/referidos-android/android/app/build/outputs/apk/release/app-release.apk
```

Gradle comparte la ruta de salida entre modos. Verificar y copiar cada APK aprobado con un nombre propio antes de cambiar de modo. El verificador inspecciona paquete, permisos, callback y autoridad de exportación, bundle Hermes y número/contenido de assets backend. Para offline usar el mismo verificador con `-Mode offline`. Comparar el SHA-256 del certificado de los dos artefactos con el de una 1.1 conocida usando `apksigner verify --print-certs` antes de actualizar en sitio. Instalar con `adb install -r`, sin desinstalar.

Toda consulta futura a Supabase debe identificar el proyecto por referencia y cotejar organización, nombre y destino mediante inventario. Las herramientas que requieran un enlace de CLI deben trabajar desde un directorio aislado que documente la referencia. El enlace de la raíz apunta a OPS y queda fuera de los procedimientos Promos.

## 2. Registro de sesiones y compatibilidad

**Medido en DEV.** `authenticated` tiene grants efectivos de INSERT y UPDATE sobre las 10 columnas actuales de `user_session_devices`, incluidos `user_id`, `session_id`, `device_id` y `revoked_at`. También tiene grant DELETE. RLS permite SELECT del propio usuario con un `session_id` presente y tiene una política UPDATE para filas propias activas con `WITH CHECK` de mismo usuario y `revoked_at IS NULL`. Esa política no limita qué columnas puede cambiar el usuario. No hay política INSERT o DELETE, por lo que los grants de tabla no bastan para autorizar esas operaciones bajo RLS. No se ensayaron escrituras remotas.

`public.is_current_session_valid()` es `SECURITY INVOKER`. Devuelve falso sin `auth.uid()` o `session_id`. Requiere una fila de ese usuario y esa sesión con `revoked_at IS NULL`. La consulta depende de RLS del invocador. No depende de la existencia de un perfil en `public.usuarios`. La comprobación remota en transacción de solo lectura fue falsa para dos contextos sintéticos `authenticated`, uno con sesión no registrada y otro sin ese claim. La validez de JWT la aporta la capa Auth/API. Un claim no vacío permite evaluar el SELECT de la tabla de sesiones, pero por sí solo no acredita que la sesión siga activa.

**Corrección propuesta.** El [borrador SQL](sql/promos-phase1-session-grants-dev.draft.sql) elimina la política UPDATE y revoca DML/TRUNCATE de clientes. Conserva la lectura existente y comprueba que `service_role` conserva permisos requeridos. Si quedan privilegios heredados o de columna, la transacción falla. Se probó en PostgreSQL 18 temporal en localhost con [roles y datos sintéticos](../tests/promos-session-grants.pg.sql). El titular de una sesión registrada y sin perfil pasó el guard, vio solo sus sesiones y no pudo insertar, actualizar ni borrar filas directamente. Sesiones de otra cuenta, vacías, revocadas o no registradas quedaron rechazadas por el guard. El servidor pudo revocar y el guard rechazó la sesión después. Esto no sustituye probar JWT reales y endpoints en el DEV futuro.

**Impacto esperado.** Android tradicional y PWA registran, listan y revocan mediante Edge Functions. Sus datos de perfil conservan el guard actual. El borrador cambia la tabla de dispositivos, por lo que antes de aplicar hay que repetir login y alta de sesión, consulta, revocación de una y de todas, y revisar posibles clientes desplegados que hicieran UPDATE directo de etiqueta. Mantener activos permisos y prerrequisitos de `session-register`. La revocación de una sesión no resuelve por sí sola el alcance de «cerrar todas» entre apps. [Servicios Android](../src/shared/services/sessionDevices.ts) · [Servicios PWA](../../referidos-app/src/services/sessionDevicesService.js) · [Hardening versionado](../../referidos-app/supabase/migrations/20260208_000003_user_session_devices_hardening.sql)

Promos debe registrar el `session_id` antes de entrar a sus rutas privadas. En DEV el registro carece de FK a `usuarios`, y el guard revisado solo mira la identidad Auth y sesión. Falta verificar emisión real de `session_id` y el contrato Edge con una cuenta ligera, incluidas RLS y Storage después de instalar la nueva estructura. Los gates de rol, MFA, invitación, perfil y catálogo siguen siendo del flujo tradicional. El futuro alta comercial crea o vincula el perfil por el mismo UUID. Definir política para bloqueo, suspensión y eliminación de una identidad compartida. Revisar los triggers de UPDATE de `auth.users` y el borrado por correo del endpoint existente antes de autorizar tablas o cambios de ciclo de cuenta. [Onboarding](../../referidos-app/supabase/functions/onboarding/index.ts) · [Eliminación actual](../../referidos-app/supabase/functions/delete-account/index.ts)

## 3. AsyncStorage frente a SQLite

| Criterio | A · AsyncStorage con cola | B · SQLite con transacciones |
| --- | --- | --- |
| Datos y cierre inesperado | Cola en otra clave permite desfase con la biblioteca si se corta la escritura. Incluir todo en una instantánea reduce líneas de fallo, pero exige reescribirla y reconciliar archivos. | Borrador, referencia y operación de salida son una transacción. Una foto de filesystem requiere un protocolo de dos pasos en ambos modelos. |
| Compatibilidad con v1 | Conserva forma y lectura actuales. La complejidad aumenta con varias cuentas, cuarentena y cola. | Requiere importación, recibo y política de regreso. Conservar v1 y originales hasta validar el primer arranque nuevo. |
| Seguridad local | Aislamiento de app, con separación lógica a cargo del código. | Añade claves y restricciones. La base por sí sola no cifra archivos o tokens; Android Keystore y separación por cuenta siguen siendo necesarios. |
| Rendimiento y operación | Suficiente para 1.1. Reescritura y deserialización completas por edición, consultas y deduplicación en memoria. | Escrituras parciales e índices para biblioteca, negocio, papelera y cola. Mayor costo inicial de integración nativa y pruebas de actualización. |
| Duplicados y recuperación | Exige un registro de operaciones y reparaciones coordinadas entre claves, especialmente tras pérdida de respuesta. | UNIQUE/FK y recibos permiten reintentos consistentes. Revisiones, idempotencia del servidor y conflictos siguen siendo responsabilidad del protocolo. |
| Varios negocios y cuentas | Más validaciones manuales y riesgo de cruzar colas o referencias al crecer. | Espacios por cuenta y proyecto, relaciones explícitas y mantenimiento más claro al crecer. |

**Recomendación.** Aprobar SQLite para la fase que introduce negocios y sincronización. El commit atómico de negocio, promoción, foto referenciada y operación pendiente es el factor decisivo. AsyncStorage v1 sigue siendo la fuente principal en Fase 1. El [prototipo de pruebas](../tests/promos-library-migration.test.mjs) usa SQLite de Node con una copia sintética. No instala una dependencia SQLite en producción. [Commit atómico de SQLite](https://www.sqlite.org/atomiccommit.html) · [SQLite en Node](https://nodejs.org/api/sqlite.html)

### Migración reanudable

1. Terminar escrituras v1 y abrir una importación local exclusiva. Leer y validar la instantánea existente. Si está corrupta, informar y conservar los bytes. Calcular hash de origen y usar el lector actual para resolver IDs duplicados de forma reproducible.
2. En una transacción, crear negocios pendientes, promociones, mapa de ID legacy a UUID, referencias y recibo. Conservar título, beneficio, descripción, nombre de tarjeta, fecha, plantilla, color, foto, orden y fecha de edición. Mantener un perfil pendiente con ID propio por promoción ambigua. Sugerir nombre desde el registro legacy y el valor recordado, sin agrupar por igualdad de nombre. Permitir asignación explícita por lote. Los perfiles pendientes no van al respaldo ni consumen cuota de negocios confirmados.
3. Conservar las mismas fotos en disco durante la transición. Verificar referencias y contenido antes de aceptar el recibo. Dos duplicados deben compartir la referencia. Si una foto falta, detener la finalización y ofrecer recuperación o retirada explícita de esa referencia. No borrar ni modificar el original para terminar una importación.
4. Confirmar el recibo junto al commit. Después de cierre inesperado se reabre, se comprueba el recibo y, si falta, se reintenta. Si el origen cambió después de importar, conservar ambos estados y pedir conciliación. Probar el primer arranque, conteo, campos, IDs, fotos y exportación antes de activar la nueva biblioteca. El retorno a 1.1 tras nuevas ediciones requiere un mecanismo explícito para conservarlas. Mantener un original v1 hasta contar con recuperación validada.
5. Tras consentimiento posterior, generar la cola de nube y separar invitados de `project_ref + auth.uid()`. Deshabilitar limpieza que no conozca todas las referencias mientras dure la transición.

En el prototipo se verificaron campos con Unicode, nombres idénticos, IDs legacy repetidos, foto compartida, IDs persistidos al reabrir y reintentar, origen intacto, archivo faltante, instantánea discrepante y rollback ante falla inyectada. Quedan por probar en Android elección de componente SQLite, almacenamiento cifrado por cuenta, cierre forzado real en mitad de transacción y recuperación de binarios.

## 4. Nombre comercial y exportación

**Diseño para la fase SQLite.** La creación y edición siguen disponibles en invitado. Elegir o crear un negocio local por ID y recordarlo como el último usado. Para una ficha legacy ambiguamente asignada, permitir editar con su perfil pendiente y confirmar o reasignar antes de exportar. En las dos acciones, aplicar la misma validación dentro de `exportImage`. Después de los campos obligatorios del borrador, verificar que el perfil tenga nombre válido confirmado. Pedirlo una sola vez por negocio, persistir la selección, confirmación y nombre a mostrar y solo después entregar el PNG a galería o selector. Si se cancela o falla la escritura, quedarse en el editor con el borrador y no exportar.

Guardar un nombre de tarjeta independiente del nombre vigente del perfil. Nuevas promociones toman el nombre confirmado vigente. Históricas y duplicados conservan su texto hasta que el dueño elija actualizarlo. Cada negocio tiene su ID aun si se llama igual que otro. Mantener la futura verificación únicamente para catálogo. La regla aún no está activa en 1.1 y depende de aprobar la migración SQLite. El punto de entrada está identificado en [exportImage](../src/features/promos-beta/PromoBetaApp.tsx#L214).

Pruebas futuras. Guardar y Compartir bloquean la primera vez, cancelar retiene borrador y archivo, confirmar queda guardado tras reiniciar, segundo negocio pide su confirmación, renombrar no cambia exportaciones antiguas, foto compartida se conserva y una confirmación con fallo de disco permite reintentar.

## 5. Criterios para Google y respaldo

Google primero y OTP en fase posterior. Usar el UUID de Supabase Auth y permitir completar el perfil tradicional voluntariamente después. Probar misma identidad al cambiar método, acceso sin RUC/rol/invitación, varias cuentas y negocios, sign-out sin fuga del invitado o de otra cuenta y acceso por RLS/Storage negado al cambiar un ID o ruta. Pedir consentimiento antes de asociar espacios locales. Respaldar promociones, negocios, configuraciones y fotos. Reintentar cuando vuelva internet, resolver conflictos por revisión y mantener el editor offline.

El estado actualizado exige ACK de la revisión y del archivo verificado. Antes de ofrecer una beta de respaldo a negocios reales, demostrar restauración completa tras reinstalar o cambiar de teléfono con fotos y todos los atributos. Una prueba aislada de Google en DEV será técnica.

## 6. Papelera, soporte y cuenta

Adoptar los 30 días aprobados, sujetos a revisión legal. Eliminar una promoción crea estado `trashed` con plazo de restauración. Al vencer o confirmar el borrado definitivo pasa a `support_hold`, inaccesible al usuario, con 48 horas adicionales medidas por servidor UTC. Soporte verifica identidad, autorización, alcance de cuenta y vencimiento en una RPC, registra caso y motivo y deja auditoría de acceso y resultado. Reutilizar la identidad y gestión del caso de soporte donde proceda, con permiso dedicado por caso y sin roles generales de lectura de fotos ni acceso a OPS.

Al vencer, purgar contenido de forma idempotente y borrar fotos mediante API de Storage cuando dejen de tener referencias activas, en papelera o retención, reservas y conflictos. Transacción que marca purga y bloquea referencias nuevas, worker que verifica eliminación y reintenta, marcador técnico mínimo sin contenido para impedir reaparición. La sincronización con cursor demasiado antiguo debe refrescar estado antes de escribir. Pruebas previstas para concurrencia entre edición/borrado/restauración, fotos de duplicados, plazo de soporte en el límite, soporte no autorizado, reintento tras purga parcial y dispositivos desfasados. No hay limpieza remota en esta fase.

El borrado integral de cuenta y el ejercicio de derechos de supresión tienen flujos propios. El endpoint tradicional borra perfil, negocios y Auth por pasos y no contempla borradores privados. El futuro flujo debe reautenticar, cortar acceso y revocar, determinar alcance vinculado por UUID, eliminar datos y archivos, finalizar Auth y reintentar fallas. Aplicar retención solo a categorías y plazos aprobados. Retirar el respaldo de Promos puede ser una opción independiente. Las copias en galería o entregadas a terceros quedan fuera de una purga remota. [Eliminación tradicional](../../referidos-app/supabase/functions/delete-account/index.ts)

## 7. Cambios legales para revisión

| Texto vigente | Ajuste propuesto |
| --- | --- |
| Privacidad ES §2 describe perfiles por rol y §5 permisos de ubicación. Términos ES §4 enumera OAuth planeado o actual. | Añadir uso local sin cuenta, Google como acceso opcional, datos de cuenta y sesiones y diferencia entre nombre autodeclarado y verificación del catálogo. |
| Privacidad ES §4 menciona consentimiento y §14 almacenamiento web. | Añadir almacenamiento del editor Android y consentimiento específico y versionado para subir promociones, negocios y fotos. Describir destinatarios y qué ocurre al cambiar de cuenta o retirar el respaldo. |
| Privacidad ES §6 describe archivos de verificación y su retención de 20–30 días. Términos ES §11 habla de licencia al publicar. | Describir fotos privadas de borradores, acceso limitado, finalidad de respaldo y cuándo el propietario entrega un PNG a terceros. Separar retención de verificación, papelera y exportaciones. |
| Privacidad ES §10 indica São Paulo. | Precisar regiones confirmadas por entorno. DEV está en São Paulo, STAGING en Oregón y PROD en Virginia del Norte. Revisar qué datos se transfieren, por qué y con qué encargados. |
| Eliminación ES se titula Facebook Login / Meta y remite a Perfil → Gestionar cuenta. | Explicar la cuenta compartida Google/Supabase, rutas web y app, alcance entre productos y proceso para usuarios sin rol tradicional. |
| Eliminación ES §4 describe retención limitada sin desglose de borradores/fotos. | Añadir 30 días de papelera, 48 horas excepcionales, acceso y auditoría de soporte, plazos de borrado físico, referencias compartidas, copias de seguridad y regla para supresión válida. |

Actualizar equivalentes en inglés y resolver la fecha pendiente de términos EN cuando estén aprobados. Confirmar autoridad responsable, jurisdicción, base del tratamiento y plazos con revisión legal. [Privacidad ES](../../../packages/legal-content/content/es/privacy.md) · [Términos ES](../../../packages/legal-content/content/es/terms.md) · [Eliminación ES](../../../packages/legal-content/content/es/data-deletion.md) · [Equivalentes EN](../../../packages/legal-content/content/en)

## 8. Verificaciones y decisiones

- Ejecutado. Lint, TypeScript y guardrail Android. **18 pruebas Node** con biblioteca v1, contrato DEV y prototipo de migración. Node 24.11.0 avisó sobre formato de módulo y sobre SQLite experimental para el prototipo.
- Ejecutado. Pruebas de sesión en PostgreSQL 18 aislado y comprobación remota de metadatos y casos sintéticos de lectura solo en DEV. El servidor local de pruebas se detuvo al finalizar.
- Ejecutado. `:app:preReleaseBuild` rechazó una URL de STAGING con el resto de la configuración DEV válida, sin hacer peticiones. Las pruebas de contrato rechazaron referencias, URL y nombres de STAGING, PROD y OPS, claves no verificadas o privilegiadas y callbacks incorrectos.
- Ejecutado. Gradle compiló los APK Promos DEV y offline `x86_64`. La inspección encontró un solo asset backend válido en DEV y ninguno en offline, con internet solo en DEV. Ambos conservan identificador y certificado de 1.1.
- Ejecutado. En el emulador `emulator-5572`, con modo avión activo, Wi-Fi apagado y sin red predeterminada, actualicé `1.1 → DEV → offline` con `adb install -r` y arranque frío. Ambas variantes abrieron el editor invitado y conservaron las promociones de prueba de 1.1. Una promoción con foto de prueba exportó un PNG de 1080 × 1080 idéntico byte a byte antes y después de cada actualización. Se cotejó el beneficio para identificar el borrador entre dos con el mismo título. No hubo teléfono físico conectado.
- Ejecutado. Compilación y revisión del APK release del Android tradicional con configuración pública DEV y firma de desarrollo. Conserva `com.referidosandroid`, el callback `referidosandroid://auth/callback`, permisos de internet y cámara y su bundle independiente. El APK carece de asset backend Promos. No se inició sesión en Android tradicional ni PWA. Los archivos modificados pertenecen a `apps/referidos-android/`.
- Pendiente de autorización posterior. Aplicar SQL remoto, validar OAuth y sesión real, aprobar SQLite y el flujo de negocios, y revisar alcance de eliminación, soporte y documentos legales.

APK locales bajo `.android-local/`, para emulador `x86_64`.

| Artefacto | Bytes | SHA-256 |
| --- | ---: | --- |
| `Referidos-Promos-Fase1-DEV-x86_64.apk` | 30.856.296 | `f5882362d760db6c526d22456ea030484b1ff0b3286b6e3eef27ef43b5f21ade` |
| `Referidos-Promos-Fase1-Offline-x86_64.apk` | 30.855.812 | `a50302e6a29c77d276ff917289b367678ee21cad8fc16cfe9a2632bb789b9c62` |

El siguiente paso tras revisión es aprobar SQLite y el contrato de negocio/exportación, y autorizar por separado el ajuste de grants en DEV con regresión de las sesiones tradicionales.
