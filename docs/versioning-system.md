# Versioning system (atajo)

Documentacion completa:

- `docs/referidos-system/README.md`
- `docs/referidos-system/entornos-y-secrets.md`
- `docs/referidos-system/operacion-sin-pr-netlify.md`

Comandos clave (desde raiz):

```powershell
npm run versioning:detect
```

```powershell
$env:VERSIONING_TARGET_ENV = "dev"
npm run versioning:apply
```

```powershell
npm run versioning:promote -- --product referidos_app --from dev --to staging --semver 0.5.3
```

```powershell
npm run versioning:record-deploy -- --product referidos_app --env prod --semver 0.5.3 --deployment-id deploy-123 --status success
```

Notas:

- Push a `dev/develop` hoy ejecuta solo `detect`.
- El release de `dev` se crea manualmente desde panel o `versioning-dev-release-create`.
- El deploy de `staging/prod` usa workflow artifact exacto por `source_commit_sha` (`versioning-deploy-artifact.yml`).
- En deploy `success`, `versioning-deploy-callback` sincroniza snapshot a runtime (`obs-release-sync`) para enriquecer `obs_events` con componente/revision.
- `npm run versioning:bootstrap` se usa solo para inicializacion/backfill.
- El panel de versionado en PWA esta aislado via `versioning-ops-proxy` hacia `referidos-ops` (single source of truth).
- Para secrets, rollout por entorno y errores reales (`missing_ops_env`, `release_sync_required`), ver `docs/referidos-system/entornos-y-secrets.md`.
