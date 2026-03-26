# Documentacion de Referidos

## 1) Referidos-system (core)

Documentacion central del monorepo:

- `docs/referidos-system/README.md`

Incluye:

- arquitectura del sistema de versionado
- flujo de git actualizado
- comandos operativos
- CI y promociones entre entornos
- troubleshooting para evitar romper versionado
- guia detallada para flujo sin PR y despliegue con Netlify (`operacion-sin-pr-netlify.md`)
- guia de entornos y secretos por proyecto (`entornos-y-secrets.md`)
- guia de macros de soporte en OPS con cache runtime read-only (`support-macros-ops-cache.md`)
- pendientes Android para limpieza de macros legacy (`android-support-cleanup-pending.md`)
- arquitectura de aislamiento del panel de versionado hacia `referidos-ops` via `versioning-ops-proxy`
- runbook de activacion por fases (dev -> staging -> prod) y troubleshooting real

## 2) Apps hermanas

PWA principal:

- `apps/referidos-app/docs/README.md`

Prelaunch:

- `apps/prelaunch/docs/README.md`

Android app:

- `apps/referidos-android/docs/README.md`

Control plane de versionado:

- `apps/referidos-ops/README.md`

## 3) Otras guias tecnicas existentes

- `docs/android-migration-plan.md`
- `docs/android-parity-checklist.md`
- `docs/android-phase-playbook.md`
- `docs/versioning-system.md` (resumen/atajo)

## 4) Nuevas notas por audiencia

Revision documental adicional creada desde el codigo actual del monorepo:

- `docs/notas-usuarios/README.md`
- `docs/notas-desarrolladores/README.md`

Organizacion:

- `docs/notas-usuarios/**`: explica que hace cada app y cada seccion desde uso funcional.
- `docs/notas-desarrolladores/**`: explica arquitectura, rutas, stores, servicios y dependencias por app.
