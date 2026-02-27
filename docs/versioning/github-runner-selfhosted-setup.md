# GitHub Runner Self-Hosted + Setup Manual (Versioning Artifacts)

## Alcance
Este documento cubre el setup para:
- Sincronizar artifacts de release desde GitHub Actions hacia tu PC.
- Ejecutar el workflow `versioning-local-artifact-sync.yml` en un runner local.
- Completar el flujo desde el panel de versionado (tab `Builds`).

---

## 1) Pre-requisitos ya implementados en código
- Migración OPS de registry/sync local:
  - `apps/referidos-ops/supabase/migrations/20260315_000031_versioning_artifact_registry_local_sync.sql`
- Edge function OPS:
  - `apps/referidos-ops/supabase/functions/versioning-artifact-sync`
- Proxy runtime (admin panel):
  - `apps/referidos-app/supabase/functions/versioning-ops-proxy`
- Workflow de sync local:
  - `.github/workflows/versioning-local-artifact-sync.yml`
- UI:
  - `apps/referidos-app/src/admin/versioning/VersioningArtifactsPanel.jsx`

---

## 2) Pasos manuales obligatorios

### 2.1. Empujar migraciones
Ejecutar en terminal local:

```powershell
cd apps/referidos-ops
supabase db push --yes
```

Si en runtime tienes pendiente `20260313_000035_versioning_runtime_migrations_rpc.sql`:

```powershell
cd apps/referidos-app
supabase db push --yes
```

### 2.2. Desplegar funciones

OPS project:

```powershell
cd apps/referidos-ops
supabase functions deploy versioning-artifact-sync
supabase functions deploy versioning-release-gate
supabase functions deploy versioning-release-sync
supabase functions deploy versioning-deploy-callback
```

Runtime project (`referidos-app`):

```powershell
cd apps/referidos-app
supabase functions deploy versioning-ops-proxy
```

---

## 3) Secrets/variables obligatorias

### 3.1. En Supabase OPS (Edge Function secrets)
Configurar (si no existen):

- `VERSIONING_LOCAL_SYNC_WORKFLOW=versioning-local-artifact-sync.yml`
- `VERSIONING_LOCAL_SYNC_WORKFLOW_REF=dev`
- `VERSIONING_LOCAL_SYNC_TOKEN=<token-seguro-aleatorio>`
- `VERSIONING_ARTIFACTS_BUCKET=versioning-artifacts` (opcional si usas bucket custom)

Opcional:
- `VERSIONING_LOCAL_ARTIFACTS_DIR=D:\\referidos-builds`

`VERSIONING_LOCAL_SYNC_TOKEN` debe ser exactamente igual al secret de GitHub homónimo.

### 3.2. En GitHub (repo secrets)
Configurar:

- `VERSIONING_LOCAL_SYNC_TOKEN=<mismo-valor-que-en-OPS>`

Y mantener los existentes de versioning/deploy (`SUPABASE_URL`, `SUPABASE_SECRET_KEY`, Netlify, etc.).

---

## 4) Instalar runner self-hosted en Windows (exacto)

### 4.1. Descargar runner oficial
En GitHub del repo:
1. `Settings`
2. `Actions`
3. `Runners`
4. `New self-hosted runner`
5. Seleccionar `Windows` y `x64`
6. Descargar zip oficial sugerido por GitHub.

### 4.2. Instalar runner
Ejemplo (PowerShell, como admin recomendado):

```powershell
mkdir C:\actions-runner\pc-sebas -Force
cd C:\actions-runner\pc-sebas
# Descomprimir aqui el zip descargado
```

En la misma pantalla de GitHub se te da un token temporal de registro (`RUNNER_TOKEN`).

Configurar:

```powershell
.\config.cmd `
  --url https://github.com/<OWNER>/<REPO> `
  --token <RUNNER_TOKEN> `
  --name pc-sebas `
  --labels self-hosted,windows,pc-sebas `
  --work _work `
  --unattended `
  --replace
```

### 4.3. Ejecutar como servicio (Windows)
En Windows reciente del runner, no siempre existe `svc.cmd`.

Regla correcta:
- El modo servicio se define durante `config.cmd` (te pregunta si deseas instalar como servicio).
- Si ya lo configuraste sin servicio, debes remover y volver a configurar el runner eligiendo servicio.

Opciones:
1. Reconfigurar runner:
   - En GitHub elimina ese runner (UI).
   - Vuelve a ejecutar `config.cmd` y acepta instalación como servicio.
2. Si no quieres reconfigurar ahora:
   - Ejecuta manualmente con `.\run.cmd` (requiere dejar esa consola abierta).

Verifica en GitHub `Settings > Actions > Runners` que quede `Online`.

---

## 5) Conectar runner con el panel (tab Builds)
En panel de versionado -> tab `Builds`, registrar nodo:

- `nodeKey`: `pc-sebas`
- `displayName`: `PC Sebas`
- `runnerLabel`: `pc-sebas`

`runnerLabel` debe coincidir con label real del runner en GitHub.

---

## 6) Flujo operativo esperado
1. Crear release en `dev` para producto (`referidos_app` o `prelaunch_web`).
2. Workflow `versioning-release-dev.yml` genera build y la sube como artifact.
3. En tab `Builds`, seleccionar nodo y click `Sync a PC`.
4. OPS encola request y dispara `versioning-local-artifact-sync.yml`.
5. Runner local descarga artifact y lo copia en `VERSIONING_LOCAL_ARTIFACTS_DIR` (o fallback local).
6. Panel muestra estado de sync (`pending/queued/running/success/failed`).

---

## 7) Sobre storage privado en Supabase
No es obligatorio para este flujo actual.

Actualmente:
- Artifact canónico: Supabase Storage privado (`versioning-artifacts`).
- Copia local: tu PC vía runner self-hosted (descarga desde signed URL de storage).

Si luego quieres bucket privado adicional en OPS:
- Es posible en plan free con límites de cuota.
- Requiere agregar lógica extra de upload/retention (no es necesario para que este flujo funcione).

---

## 8) Checklist de validación final
- [ ] Migraciones empujadas (`ops` y `runtime` si aplica).
- [ ] Funciones desplegadas.
- [ ] Secret `VERSIONING_LOCAL_SYNC_TOKEN` configurado igual en OPS + GitHub.
- [ ] Runner `Online` con label correcto.
- [ ] Nodo registrado en panel con `runnerLabel` correcto.
- [ ] Release dev crea artifact.
- [ ] `Sync a PC` finaliza en `success`.
