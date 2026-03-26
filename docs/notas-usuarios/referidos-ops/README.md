# Referidos Ops

## Que es

`referidos-ops` no es una app para usuarios finales.
Es el control plane interno montado sobre un proyecto Supabase separado.

## Para que sirve

- versionado de productos
- gating de releases
- ejecucion y callback de despliegues
- sincronizacion de artifacts
- catalogos operativos de soporte
- ingestion de telemetry operativa

## Como se consume desde fuera

- `referidos-app` usa `versioning-ops-proxy` y `support-ops-proxy`
- Android replica el consumo de versionado mediante el mismo bridge

## Lectura de uso

Si eres usuario final, aqui no tienes una interfaz propia que operar.
Si eres parte de admin o devops, esta app existe detras de los paneles de operacion del resto del monorepo.
