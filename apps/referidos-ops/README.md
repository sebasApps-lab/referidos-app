# referidos-ops (control plane de versionado)

Proyecto Supabase dedicado para versionado/deploy centralizado.

URL:
- `https://ymhaveuksdzlfuecvkmx.supabase.co`

Project ref:
- `ymhaveuksdzlfuecvkmx`

Estructura en repo:
- Migraciones: `apps/referidos-ops/supabase/migrations`
- Edge Functions: `apps/referidos-ops/supabase/functions`
- Config Supabase CLI: `apps/referidos-ops/supabase/config.toml`

Funciones clave:
- `versioning-dev-release-preview`
- `versioning-dev-release-create`
- `versioning-release-sync`
- `versioning-release-gate`
- `versioning-deploy-execute`
- `versioning-deploy-callback`

## Secrets minimos en ops

- `GITHUB_DEPLOY_OWNER`
- `GITHUB_DEPLOY_REPO`
- `GITHUB_DEPLOY_TOKEN`
- `DEPLOY_BRANCH_DEV`
- `DEPLOY_BRANCH_STAGING`
- `DEPLOY_BRANCH_PROD`
- `VERSIONING_DEV_RELEASE_WORKFLOW`
- `VERSIONING_DEV_RELEASE_REF`
- `VERSIONING_DEV_RELEASE_ALLOWED_REFS`
- `VERSIONING_DEPLOY_WORKFLOW`
- `VERSIONING_DEPLOY_WORKFLOW_REF`
- `VERSIONING_APPLY_MIGRATIONS_WORKFLOW`
- `VERSIONING_APPLY_MIGRATIONS_WORKFLOW_REF`
- `VERSIONING_DEPLOY_CALLBACK_TOKEN`
- `VERSIONING_PROXY_SHARED_TOKEN`
- `VERSIONING_RUNTIME_URL_STAGING`
- `VERSIONING_RUNTIME_URL_PROD`

## Aplicar migraciones al control plane

```powershell
cd apps/referidos-ops
supabase db push --project-ref ymhaveuksdzlfuecvkmx
```

## Deploy de funciones del control plane

```powershell
cd apps/referidos-ops
supabase functions deploy versioning-deploy-execute --project-ref ymhaveuksdzlfuecvkmx
supabase functions deploy versioning-release-sync --project-ref ymhaveuksdzlfuecvkmx
supabase functions deploy versioning-release-gate --project-ref ymhaveuksdzlfuecvkmx
supabase functions deploy versioning-dev-release-preview --project-ref ymhaveuksdzlfuecvkmx
supabase functions deploy versioning-dev-release-create --project-ref ymhaveuksdzlfuecvkmx
supabase functions deploy versioning-deploy-callback --project-ref ymhaveuksdzlfuecvkmx
```

## Integracion con panel admin

La UI admin de PWA NO pega directo a ops.
Usa bridge:
- `apps/referidos-app/supabase/functions/versioning-ops-proxy/index.ts`

Ese bridge:
- valida admin local
- llama a ops con service-role + token compartido

Secret requerido en ops para bridge:
- `VERSIONING_PROXY_SHARED_TOKEN`

Secrets requeridos en runtime para usar el bridge:
- `VERSIONING_OPS_URL`
- `VERSIONING_OPS_SECRET_KEY`
- `VERSIONING_PROXY_SHARED_TOKEN`

## Nota de admin

El control plane usa `public.usuarios` para validar admin en las funciones de versionado.
Debes tener al menos un usuario admin en `referidos-ops`:

```sql
insert into public.usuarios (id_auth, tenant_id, role)
select
  'REEMPLAZA_CON_AUTH_UID'::uuid,
  t.id,
  'admin'
from public.tenants t
where t.name = 'ReferidosAPP'
on conflict (id_auth) do update set role = excluded.role;
```

## Verificacion rapida

```powershell
supabase migration list --project-ref ymhaveuksdzlfuecvkmx
supabase functions list --project-ref ymhaveuksdzlfuecvkmx
```

Si UI admin falla por proxy:
- revisar `versioning-ops-proxy` en runtime
- revisar que `VERSIONING_PROXY_SHARED_TOKEN` coincida entre runtime y ops
