# referidos-system

Monorepo de Referidos con apps hermanas:

- PWA principal: `apps/referidos-app`
- Prelaunch web: `apps/prelaunch`
- Android app: `apps/referidos-android`

Tambien contiene paquetes compartidos en `packages/*`, migraciones/funciones en Supabase, y tooling de CI/CD/versionado.

## Documentacion

Indice general:

- `docs/README.md`

Seccion principal del sistema:

- `docs/referidos-system/README.md`

Secciones por app hermana:

- `apps/referidos-app/docs/README.md`
- `apps/prelaunch/docs/README.md`
- `apps/referidos-android/docs/README.md`

## Reglas rapidas

1. Ejecuta comandos de versionado desde la raiz del repo.
2. No subas secret keys al repo.
3. Usa el flujo de versionado documentado antes de promover releases.
