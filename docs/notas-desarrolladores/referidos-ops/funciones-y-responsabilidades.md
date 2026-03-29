# Funciones y responsabilidades

## Contexto

El README del proyecto ya lo define como control plane de versionado.
La revision del codigo confirma que sus responsabilidades estan agrupadas en tres dominios.

## 1. Versionado y despliegue

Funciones clave:

- `versioning-dev-release-preview`
- `versioning-dev-release-create`
- `versioning-release-sync`
- `versioning-release-gate`
- `versioning-deploy-execute`
- `versioning-deploy-callback`
- `versioning-artifact-sync`

Esto cubre:

- preview de release desde `dev`
- creacion de release
- sync entre ramas o entornos
- gating y aprobaciones
- ejecucion de despliegues
- sincronizacion de artifacts

## 2. Soporte OPS

Funciones:

- `ops-support-apps-admin`
- `ops-support-macros-admin`
- `ops-support-macros-sync`

Esto explica por que el runtime principal usa bridges como:

- `support-ops-proxy`
- `ops-support-apps-sync-dispatch`
- `ops-support-macros-sync-dispatch`

## 3. Telemetry operativa

- `ops-telemetry-ingest`

Sirve para consolidar eventos operativos y de versionado fuera del runtime principal.

## Migraciones

Los nombres de migraciones muestran tres series claras:

- `versioning_*`
- `ops_telemetry_*`
- `support_macros_*` y `support_apps_*`

## Contrato con las apps runtime

- `referidos-app` usa bridges para versioning y soporte
- Android replica el consumo de versioning
- los secretos y project refs se manejan separados del runtime del producto

## Lectura de revision

`referidos-ops` es una app backend, no un simple grupo de funciones.
Su presencia separada permite:

- aislar permisos operativos
- evitar que la UI admin hable directo con un plano critico
- mantener el sistema de releases fuera del producto de usuario final
