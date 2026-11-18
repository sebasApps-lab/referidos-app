# 07 · Versionado y despliegue

El sistema registra por separado qué cambió, qué versión se preparó, a qué entorno se promovió y qué artefacto se desplegó. Por eso una release puede existir en OPS antes de que Netlify la publique. El objetivo es relacionar un deploy visible con un commit, un conjunto de componentes y el build que se probó.

## Quienes participan

| Pieza | Responsabilidad |
| --- | --- |
| `versioning/component-map.json` | Asocia directorios con productos, componentes lógicos, cambios de contrato y rutas ignoradas. |
| `tooling/versioning/*` | Opera sobre el diff, la base OPS, el SemVer y los registros de promoción, artefacto y despliegue. |
| GitHub Actions | Ejecuta gates y builds. Usa credenciales separadas para OPS, runtime, versiones y destino Netlify. |
| Panel web de versionado | Permite a un admin ver releases, solicitar operaciones y consultar bloqueos. Pasa por `versioning-ops-proxy`. |
| Supabase OPS | Mantiene changesets, revisiones, releases, promociones, solicitudes, auditoría y metadatos de artefacto. |
| Netlify | Entrega las dos superficies web versionadas. El workflow resuelve su destino según producto y entorno. |
| Runtime Supabase | Guarda los datos del producto y sus migraciones. Recibe un snapshot de la release exitosa para enriquecer observabilidad. |

[Mapa](../versioning/component-map.json) · [Contrato](../versioning/env.contract.json) · [Proxy](../apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts)

## De un cambio a un despliegue

1. **Detectar.** `detect-changes.mjs` compara commits. Clasifica la ruta con el mapa y calcula candidatos de incremento con la información de componentes y del commit. `versioning-detect-dev.yml` y `versioning-detect-pr.yml` generan el changeset ante eventos distintos. Detectar una propuesta no equivale a liberar ese código.
2. **Preparar en dev.** El panel pide una vista previa y la función OPS envía el workflow `versioning-release-dev.yml`. El workflow aplica el changeset, registra release y prepara el artefacto en el flujo correspondiente. El camino web guarda un backup en GitHub y puede registrar el artefacto en Supabase Storage. La release conserva el SHA de origen.
3. **Promover.** OPS asocia esa release al destino `staging` o `prod`. El flujo comprueba la rama de destino, el gate y el estado de migraciones cuando aplica. Revisa “Subir release” y los bloqueos en el panel si la rama aún carece del SHA.
4. **Desplegar.** `versioning-deploy-artifact.yml` valida el destino, recupera el artefacto registrado, prepara el directorio y genera `app-config.js` con parámetros públicos del entorno. Después registra sourcemaps, publica a Netlify y notifica a OPS. Distingue la copia descargada del artefacto, el directorio que usa el uploader y la ruta enviada a Netlify al inspeccionar el workflow.
5. **Cerrar.** El callback registra el resultado, los metadatos de despliegue y, cuando aplica, sincroniza el snapshot de observabilidad al runtime de destino. Un snapshot sirve para relacionar un evento posterior con el componente desplegado.

[Detección](../tooling/versioning/detect-changes.mjs) · [Release dev](../.github/workflows/versioning-release-dev.yml) · [Deploy del artefacto](../.github/workflows/versioning-deploy-artifact.yml) · [Callback OPS](../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts)

## Tres operaciones que conviene distinguir

- **Compilar en tu máquina.** `npm run build:app` o `npm run build:prelaunch` genera `dist`. Los scripts `build:*:release` también llaman al uploader de sourcemaps, que necesita credenciales de servidor.
- **Aplicar migraciones.** El workflow `versioning-apply-migrations.yml` resuelve el proyecto runtime y usa el checkout de la release. Afecta el esquema. La migración del control OPS se gestiona en su proyecto separado.
- **Publicar a Netlify.** El workflow web admite `referidos_app` y `prelaunch_web`. Un build Android y su publicación siguen otra ruta. El mapa de versionado también incluye `android_app`, lo que permite registrar su evolución aunque dicho workflow no publique Android.

[Scripts](../package.json) · [Workflow de migraciones](../.github/workflows/versioning-apply-migrations.yml) · [Runbook original](../docs/referidos-system/operacion-sin-pr-netlify.md) · [Runtime y artefactos locales](../docs/versioning/runtime-config-and-local-artifacts.md)

## Qué mirar si falla

| Si ves | Revisa en orden |
| --- | --- |
| El producto no aparece en el changeset | Rutas y exclusiones del mapa, commits comparados, alcance del workflow. |
| El panel no puede abrir el estado OPS | Sesión y rol en runtime, proxy, variables de OPS y respuesta de la Edge Function. |
| Release creada pero sin artefacto | Paso de build, producto admitido, registro del proveedor y resultado de la subida. |
| Staging abre pero parece apuntar a otra base | `app-config.js`, producto/entorno del workflow y sitio Netlify asociado. |
| Netlify terminó y OPS sigue pendiente | Ejecución GitHub, retorno del callback y registro de deploy. |
| Eventos de una versión no aparecen identificados | Variables de release, callback, snapshot en el runtime y configuración del cliente. |

[Referencia de infraestructura por archivo](referencia/07-versionado-infra-archivos.md)
