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
- La sincronizacion de release a rama destino ya es por PR (`versioning-release-sync`), con checks `lint/test/build` y merge de PR (sin `/merges` directo).
- Existe workflow de gates para PR a `staging/main`: `.github/workflows/ci-pr.yml` (jobs: `lint`, `test`, `build`).
- En `prod`, si deploy termina `success`, el workflow crea tag `vX.Y.Z` (idempotente) y el callback registra metadatos en OPS (`build_number`, `tag_name`, `ci_run_id`, `ci_run_number`).
- En deploy `success`, `versioning-deploy-callback` sincroniza snapshot a runtime (`obs-release-sync`) para enriquecer `obs_events` con componente/revision.
- Fase 4: gate de migraciones antes de deploy (panel + backend duro en `versioning-deploy-execute`), accion `Apply migrations` por workflow (`versioning-apply-migrations.yml`) y validacion de entorno desde panel (`versioning-release-gate`).
- `npm run versioning:bootstrap` se usa solo para inicializacion/backfill.
- El panel de versionado en PWA esta aislado via `versioning-ops-proxy` hacia `referidos-ops` (single source of truth).
- Para secrets, rollout por entorno y errores reales (`missing_ops_env`, `release_sync_required`), ver `docs/referidos-system/entornos-y-secrets.md`.

## Observabilidad de builds y config por entorno

Queda habilitado versionado operativo para build/deploy con dos capas:

- **Timeline de build/deploy** (OPS): `public.version_build_events` + vista `public.version_build_timeline_labeled`.
- **Versionado de archivo de config por entorno** (OPS): `public.version_env_config_versions` + vista `public.version_env_config_versions_labeled`.

Flujo:

1. `versioning-deploy-artifact.yml` genera `app-config.js` y calcula `runtime_config_sha256`.
2. El callback de deploy en OPS (`versioning-deploy-callback`) registra:
   - evento de build por hitos (`versioning_emit_build_event`),
   - version de config por entorno (`versioning_register_env_config_version`).
3. Runtime observability (`obs-release`, `obs-release-sync`, `obs-ingest`) persiste `build_number`, `release_id`, `artifact_id`, `channel`.
4. Panel de versionado (`VersioningOverviewPanel`) muestra:
   - card **Timeline de builds**,
   - card **Versionado de configuracion por entorno**.

Consultas rapidas:

```sql
select *
from public.version_build_timeline_labeled
where product_key = 'referidos_app'
order by occurred_at desc
limit 50;
```

```sql
select env_key, version_label, config_key, config_hash_sha256, build_number, created_at
from public.version_env_config_versions_labeled
where product_key = 'referidos_app'
order by created_at desc
limit 50;
```
