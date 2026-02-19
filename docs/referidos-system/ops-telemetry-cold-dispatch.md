# Ops telemetry cold dispatch (runtime config)

Fecha de referencia: `2026-02-18`.

Objetivo:
- configurar `public.ops_sync_runtime_config` con el helper SQL idempotente
- dejar el mismo procedimiento reutilizable en `dev`, `staging` y `prod`

Helper disponible:
- `public.ops_sync_upsert_runtime_config(...)`

Prerequisito:
- migracion aplicada en runtime:
  - `apps/referidos-app/supabase/migrations/20260301_000023_ops_sync_runtime_config_helper.sql`

## SQL oficial (plantilla)

```sql
select public.ops_sync_upsert_runtime_config(
  p_runtime_base_url := 'https://<RUNTIME_PROJECT_REF>.supabase.co',
  p_cron_token := '<CRON_TOKEN_LARGO>',
  p_enabled := true,
  p_tenant_name := 'ReferidosAPP'
);
```

Reglas:
- este SQL se ejecuta en la DB runtime del entorno que estas configurando
- no guardar `CRON_TOKEN_LARGO` en git ni en migraciones
- usar token distinto por entorno

## Ejemplos por entorno

`dev` (`btvrtxdizqsqrzdsgvsj`)
```sql
select public.ops_sync_upsert_runtime_config(
  p_runtime_base_url := 'https://btvrtxdizqsqrzdsgvsj.supabase.co',
  p_cron_token := '<CRON_TOKEN_LARGO_DEV>',
  p_enabled := true,
  p_tenant_name := 'ReferidosAPP'
);
```

`staging` (`iegjfeaadayfvqockwov`) cuando lo habilites
```sql
select public.ops_sync_upsert_runtime_config(
  p_runtime_base_url := 'https://iegjfeaadayfvqockwov.supabase.co',
  p_cron_token := '<CRON_TOKEN_LARGO_STAGING>',
  p_enabled := true,
  p_tenant_name := 'ReferidosAPP'
);
```

`prod` (`ztcsrfwvjgqnmhnlpeye`) cuando lo habilites
```sql
select public.ops_sync_upsert_runtime_config(
  p_runtime_base_url := 'https://ztcsrfwvjgqnmhnlpeye.supabase.co',
  p_cron_token := '<CRON_TOKEN_LARGO_PROD>',
  p_enabled := true,
  p_tenant_name := 'ReferidosAPP'
);
```

## Verificacion

```sql
select tenant_id, runtime_base_url, enabled, updated_at
from public.ops_sync_runtime_config;
```

## Desactivar temporalmente

```sql
select public.ops_sync_upsert_runtime_config(
  p_runtime_base_url := 'https://<RUNTIME_PROJECT_REF>.supabase.co',
  p_cron_token := '<CRON_TOKEN_LARGO>',
  p_enabled := false,
  p_tenant_name := 'ReferidosAPP'
);
```
