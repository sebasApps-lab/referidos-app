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
- `versioning-dev-release-create`
- `versioning-deploy-execute`
- `versioning-deploy-callback`

## Aplicar migraciones al control plane

```powershell
cd apps/referidos-ops
supabase db push --project-ref ymhaveuksdzlfuecvkmx
```

## Deploy de funciones del control plane

```powershell
cd apps/referidos-ops
supabase functions deploy versioning-deploy-execute --project-ref ymhaveuksdzlfuecvkmx
supabase functions deploy versioning-dev-release-create --project-ref ymhaveuksdzlfuecvkmx
supabase functions deploy versioning-deploy-callback --project-ref ymhaveuksdzlfuecvkmx --no-verify-jwt
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
