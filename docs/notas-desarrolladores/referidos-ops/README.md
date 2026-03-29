# Referidos Ops

## Alcance

`referidos-ops` es el proyecto Supabase del control plane.
No tiene frontend propio en el repo; expone migraciones y edge functions operativas.

## Ubicacion

- `apps/referidos-ops/supabase/migrations`
- `apps/referidos-ops/supabase/functions`

## Hallazgos de la revision

- El foco principal es versionado y deploy orchestration.
- Tambien concentra catalogos y sync de soporte, ademas de telemetry operativa.
- La UI de admin lo consume por proxy desde otras apps; ese aislamiento es una decision de arquitectura visible en el repo.

## Archivo de detalle

- `funciones-y-responsabilidades.md`
