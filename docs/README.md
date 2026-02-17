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
- arquitectura de aislamiento del panel de versionado hacia `referidos-ops` via `versioning-ops-proxy`

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
