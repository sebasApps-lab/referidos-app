# Operacion sin PR + Netlify (versionado aislado en ops)

## 1) Supuestos

- flujo diario sin PR obligatorio
- `git add .`, `git commit -m`, `git push`
- Netlify auto-deploy desactivado
- deploy desde gate/panel
- control plane en `referidos-ops`

## 2) Flujo end-to-end

1. Trabajas en `dev`:
```powershell
git checkout dev
git add .
git commit -m "feat: descripcion"
git push
```

2. Push dispara detect:
- workflow `versioning-detect-dev.yml`
- detecta cambios
- no crea release automaticamente

3. Crear release DEVELOPMENT:
- boton `Relase` en panel
- o edge `versioning-dev-release-create`

4. Promocion:
- `dev -> staging`
- `staging -> prod`

5. Deploy:
- crear/aprobar request
- si falta commit en rama destino: `Subir release`
- ejecutar deploy exacto por commit
- callback finaliza request

## 3) Commit message -> bump

`major`:
```text
feat!: romper contrato
BREAKING CHANGE: detalle
```

`minor`:
```text
feat: funcionalidad nueva
```

`patch`:
```text
fix: correccion
refactor: mejora interna
perf: optimizacion
```

`none`:
```text
docs: actualizacion documental
```

## 4) Promover vs Deploy

Promover:
- mueve semver entre entornos del sistema
- no publica por si sola

Deploy:
- publica en Netlify el commit exacto del release
- deja trazabilidad `started/success/failed`

## 5) Donde se ejecuta cada cosa

Versionado central:
- `referidos-ops`

Panel admin:
- vive en PWA runtime
- usa `versioning-ops-proxy` para hablar con ops

Resto admin:
- sigue leyendo runtime del entorno

## 6) Troubleshooting

`missing_ops_env` en proxy:
- setear `VERSIONING_OPS_URL`, `VERSIONING_OPS_SECRET_KEY`, `VERSIONING_PROXY_SHARED_TOKEN` en runtime

`invalid_proxy_token` o unauthorized interno:
- revisar `VERSIONING_PROXY_SHARED_TOKEN` (mismo valor en runtime y ops)

`release_sync_required`:
- usar `Subir release` y volver a ejecutar deploy

`github_workflow_dispatch_failed`:
- revisar `GITHUB_DEPLOY_*`, workflow y permisos del token

`netlify deploy failed`:
- revisar `NETLIFY_AUTH_TOKEN` y `NETLIFY_SITE_ID_*` en GitHub secrets
