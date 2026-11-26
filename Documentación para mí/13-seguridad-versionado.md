# Seguridad del despliegue de versiones

La corrección está en `fix/versioning-deploy-integrity`, con el punto de partida `5e07ec2` en una copia de trabajo independiente. La validación se hizo en local con datos ficticios. Las ramas `dev`, `staging` y `main` conservan sus referencias. Las funciones y workflows siguen en este repositorio.

## Qué se encontró al revisar el código

- El workflow recibía `callback_url` por dispatch y enviaba el token tanto al iniciar como al finalizar. El dispatcher de OPS aceptaba un override de URL. El destino autorizado para ambos productos y entornos es el origen HTTPS configurado del proyecto OPS y la ruta fija `/functions/v1/versioning-deploy-callback`. Las dos notificaciones salían del mismo workflow. [Configuración del repositorio](../docs/referidos-system/entornos-y-secrets.md)
- En una promoción se crea o reutiliza una release de destino con su propio ID. El ZIP puede seguir asociado a Desarrollo. El fallback anterior elegía el registro más reciente del producto y versión. La tabla `version_promotions` ya permite seguir el origen exacto. El productor de Desarrollo ya almacena el tamaño y SHA-256 del ZIP, por lo que los ZIP con registro completo se pueden verificar con el esquema existente. [Registro de artefactos](../apps/referidos-ops/supabase/migrations/20260315_000031_versioning_artifact_registry_local_sync.sql)
- El callback de cierre tenía una segunda resolución al escribir el puntero del entorno. El RPC histórico también podía seleccionar por versión. Se conserva el ID real del ZIP en el nuevo camino de cierre. El backfill, además, podía etiquetar los bytes con el SHA de la release registrada aunque el checkout fuera otro. [RPC histórico](../apps/referidos-ops/supabase/migrations/20260316_000032_versioning_artifact_storage_gc.sql)
- El uploader tenía selectores explícitos, un nombre por defecto y un último recurso por descarte. Los nombres normalizados para formar rutas también podían colisionar. El cliente público actual resuelve por nombre en casos donde falta la asignación por origen. El workflow conserva ese dato público y lo toma del tenant verificado, mientras Storage usa el UUID. [Resolución del tenant en runtime](../apps/referidos-app/supabase/functions/_shared/observability.ts)

## Archivos de implementación

| Archivo | Cambio |
| --- | --- |
| [Workflow de despliegue](../.github/workflows/versioning-deploy-artifact.yml) | Carga las herramientas y dependencias del SHA del workflow. El SHA de la release sigue identificando el código publicado y la etiqueta de producción. Valida el endpoint y vincula solicitud, entorno, versión y ejecución con OPS. Descarga el archivo registrado, verifica la integridad antes de preparar el directorio y usa el nombre del tenant comprobado al generar `app-config.js`. Las notificaciones usan el mismo helper y el token se entrega sólo a sus pasos y a la comprobación previa. |
| [Workflow de Desarrollo](../.github/workflows/versioning-release-dev.yml) | El backfill exige que el checkout corresponda al SHA completo de la release. Al registrar el ZIP que se acaba de volver a subir, limpia la marca de borrado del registro anterior. |
| [Normalizador del destino OPS](../apps/referidos-ops/supabase/functions/_shared/deploy-callback-url.mjs) | Construye el endpoint desde el origen HTTPS de confianza. Cuando se proporciona la URL heredada, exige que coincida con el destino completo. |
| [Cliente del callback](../tooling/versioning/deploy-callback.mjs) | Aplica la validación a cada envío, deshabilita redirecciones, limita la espera y requiere confirmación JSON de OPS. Los errores omiten el token, la URL recibida y el cuerpo remoto. |
| [Dispatcher de OPS](../apps/referidos-ops/supabase/functions/versioning-deploy-execute/index.ts) | Aplica la misma política antes de solicitar el workflow a GitHub. El dispatcher histórico del Supabase runtime no forma parte de la ruta central de publicación. |
| [Resolución de release y artefacto](../tooling/versioning/release-artifact-integrity.mjs) | Comprueba el ID de solicitud y la ejecución activa, los IDs de la release, tenant, producto, entorno, versión y SHA completo. Reutiliza el ZIP mediante un origen registrado en cada promoción, rechaza conflictos y exige tamaño y checksum. GitHub requiere repositorio, run, nombre e ID exactos del archivo. [API de artefactos de GitHub](https://docs.github.com/en/rest/actions/artifacts) |
| [Preparación segura del ZIP](../tooling/versioning/prepare-release-artifact.py) | Compara SHA-256 y tamaño antes de extraer. Rechaza archivos sin `index.html` en la raíz, rutas ambiguas, enlaces, entradas especiales y archivos fuera de los límites de extracción. Admite el ZIP registrado dentro del contenedor de GitHub. |
| [Callback de cierre de OPS](../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts) y [verificación del puntero](../apps/referidos-ops/supabase/functions/_shared/deploy-callback-artifact.mjs) | Verifican la identidad del artefacto antes de finalizar y guardan el puntero del entorno con ese mismo ID. Un callback histórico sin ID sólo puede usar el registro exacto de su propia release. El ID que se escribe en la evidencia y la configuración queda asociado al mismo registro. |
| [Uploader de sourcemaps](../tooling/observability/upload-sourcemaps.mjs) | Exige `OBS_TENANT_ID` o `OBS_TENANT_NAME` explícitos y un tenant activo. Con ambos selectores, deben concordar. Mantiene la clave de `obs_releases`, usa rutas por UUID y entorno para objetos nuevos y limita la poda a rutas de propiedad verificable. Expone el ID y nombre confirmados a GitHub Actions. |
| [Sincronizador de workflows](../apps/referidos-ops/supabase/functions/versioning-release-sync/index.ts), [CI Web](../.github/workflows/ci-pr.yml) y [detección en Dev](../.github/workflows/versioning-detect-dev.yml) | Incluyen las nuevas dependencias que necesita el workflow al sincronizarse a otra rama. Las tres listas coinciden y el paquete de workflows mantiene su clasificación. |

## Pruebas locales

Ejecutar desde la copia de trabajo de la rama con las dependencias del repositorio disponibles. Los tests de Node usan dobles de Supabase y HTTP. Python usa archivos temporales y ZIP de prueba.

| Prueba | Resultado | Cobertura |
| --- | --- | --- |
| [Callback de GitHub](../tooling/versioning/deploy-callback.test.mjs) | 8 de 8 | Destino válido, origen inválido, URL no autorizada, ausencia de token, redirecciones, transporte y confirmación HTTP. |
| [Identidad del artefacto](../tooling/versioning/release-artifact-integrity.test.mjs) | 14 de 14 | Correlación con ejecución activa, carrera de registro, promociones válidas y ambiguas, SHA distinto, registro incompleto, borrado y metadatos de GitHub/Storage. |
| [Extracción del ZIP](../tooling/versioning/test-prepare-release-artifact.py) | 7 de 7 | ZIP válido, archivo alterado, tamaño incorrecto, rutas inseguras, enlaces, entradas duplicadas y ZIP interior de GitHub. |
| [Tenant y sourcemaps](../tooling/observability/upload-sourcemaps.test.mjs) | 8 de 8 | UUID y nombre exacto, identidades incompatibles, ausencia de escrituras ante errores, separación de objetos, reintentos y retención. |
| [Puntero de OPS](../tooling/versioning/deploy-callback-artifact.test.mjs) | 8 de 8 | El cierre conserva el ID verificado y rechaza registros incompatibles o sin vínculo exacto. |

```powershell
node --test tooling/versioning/deploy-callback.test.mjs tooling/versioning/deploy-callback-artifact.test.mjs tooling/versioning/release-artifact-integrity.test.mjs tooling/observability/upload-sourcemaps.test.mjs
python -B tooling/versioning/test-prepare-release-artifact.py
npm.cmd test
npm.cmd run lint:mojibake
npm.cmd run lint --workspaces --if-present
git diff --check
```

La revisión de integración analizó cuatro YAML, 53 bloques Bash y 12 bloques Node embebidos, comprobó el orden de las validaciones y contrastó las 18 rutas del paquete de workflows. El callback de cierre se ejercitó con un backend simulado en cuatro flujos. El caso de checksum discrepante devolvió `409` antes de escribir y el caso válido usó el mismo ID en el puntero, la auditoría y la configuración. Pasaron el lint de los workspaces, el lint de los scripts nuevos y la comprobación de codificación. `npm test` terminó correctamente y los workspaces no definían scripts de test. Las suites nuevas se ejecutaron de forma explícita.

## Compatibilidad y riesgos pendientes

- Se mantiene el formato de dispatch con `callback_url`. Los overrides históricos deben apuntar al endpoint exacto de OPS. Un proxy alternativo, un endpoint runtime o una redirección quedan fuera del contrato. Los valores de credenciales y su configuración no se cambiaron.
- El mismo ZIP de Desarrollo sigue siendo válido en Staging y Producción cuando existe una cadena de promoción coherente. Un ZIP histórico con tamaño, SHA-256 e identidad completos conserva su flujo. Si falta evidencia, el error pide regenerar el artefacto de la release exacta en Desarrollo. Una publicación válida nueva necesita que OPS registre la ejecución activa. Un rerun de una ejecución que ya terminó se rechaza.
- Los mapas que ya estaban almacenados por nombre siguen leyéndose por la ruta en su metadata. La limpieza automática preserva esas rutas históricas cuando la propiedad no se puede comprobar. Los comandos locales `build:app:release` y `build:prelaunch:release` necesitan ahora un selector explícito del proyecto usado.
- El cierre registra y finaliza mediante operaciones existentes en OPS. La lectura, la finalización y la actualización del puntero no forman una transacción única. Sigue pendiente la conciliación de fallos entre esas operaciones y de ejecuciones que no llegaron a vincularse. El contraste de configuración, URLs y registros en proyectos alojados queda para una validación controlada.
- La auditoría también detectó que los mapas pueden seguir presentes en el directorio publicado y que el `buildId` del runtime puede diferir del usado por el uploader. Estos dos contratos requieren revisión propia antes de validar la simbolicación de punta a punta. [Guía anterior de versionado](12-guia-de-releases-dev-staging-produccion.md)

## Reversión

El commit previo `5e07ec2` es la referencia de comparación. Desde esta copia de trabajo, identifica el commit de corrección y reviértelo en la misma rama con un nuevo commit.

```powershell
git log --oneline 5e07ec2..HEAD
$fixCommit = git log -1 --format=%H --fixed-strings --grep='fix(versioning): verify deployment targets and release artifacts'
git show --stat $fixCommit
git revert $fixCommit
```

Si se integran los cambios más adelante, la reversión debe incluir YAML, helpers y las funciones de OPS en el mismo cambio, para conservar sus contratos. Conserva los ZIP y las rutas de sourcemaps ya registradas. La reversión de código no requiere revertir un esquema ni rotar credenciales.
