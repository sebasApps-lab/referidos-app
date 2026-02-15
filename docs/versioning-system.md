# Versioning system (atajo)

Documentacion completa:

- `docs/referidos-system/README.md`

Comandos clave (desde raiz):

```powershell
npm run versioning:detect
```

```powershell
$env:VERSIONING_TARGET_ENV = "dev"
npm run versioning:apply
```

```powershell
npm run versioning:promote -- --product referidos_app --from staging --to prod --semver 0.5.3
```

```powershell
npm run versioning:record-deploy -- --product referidos_app --env prod --semver 0.5.3 --deployment-id deploy-123 --status success
```

`npm run versioning:bootstrap` solo para inicializacion/backfill, no para cada cambio.
