-- 20260301_000023_ops_sync_runtime_config_helper.sql
-- Helper idempotente para configurar ops_sync_runtime_config por entorno.

begin;

create or replace function public.ops_sync_upsert_runtime_config(
  p_runtime_base_url text,
  p_cron_token text,
  p_enabled boolean default true,
  p_tenant_name text default 'ReferidosAPP'
)
returns public.ops_sync_runtime_config
language plpgsql
security definer
set search_path = public
as $$
declare
  v_tenant_id uuid;
  v_row public.ops_sync_runtime_config%rowtype;
begin
  if auth.uid() is not null and not public.is_admin() then
    raise exception 'ops_sync_upsert_runtime_config: forbidden' using errcode = '42501';
  end if;

  if p_runtime_base_url is null
     or length(trim(p_runtime_base_url)) = 0
     or p_runtime_base_url !~* '^https://' then
    raise exception 'ops_sync_upsert_runtime_config: runtime_base_url invalido' using errcode = '22023';
  end if;

  if p_cron_token is null or length(trim(p_cron_token)) < 24 then
    raise exception 'ops_sync_upsert_runtime_config: cron_token invalido (min 24 chars)' using errcode = '22023';
  end if;

  select t.id
    into v_tenant_id
  from public.tenants t
  where lower(t.name) = lower(coalesce(trim(p_tenant_name), ''))
  order by t.created_at asc
  limit 1;

  if v_tenant_id is null then
    v_tenant_id := public.ops_sync_default_tenant_id();
  end if;

  if v_tenant_id is null then
    raise exception 'ops_sync_upsert_runtime_config: tenant no encontrado' using errcode = '22023';
  end if;

  insert into public.ops_sync_runtime_config (
    tenant_id,
    runtime_base_url,
    cron_token,
    enabled
  )
  values (
    v_tenant_id,
    trim(p_runtime_base_url),
    trim(p_cron_token),
    coalesce(p_enabled, true)
  )
  on conflict (tenant_id) do update
  set
    runtime_base_url = excluded.runtime_base_url,
    cron_token = excluded.cron_token,
    enabled = excluded.enabled,
    updated_at = now()
  returning * into v_row;

  return v_row;
end;
$$;

grant execute on function public.ops_sync_upsert_runtime_config(text, text, boolean, text) to authenticated;
grant execute on function public.ops_sync_upsert_runtime_config(text, text, boolean, text) to service_role;

insert into public.ops_sync_runtime_config (tenant_id, runtime_base_url, cron_token, enabled)
select
  t.id,
  'https://invalid.local',
  repeat('x', 24),
  false
from public.tenants t
where not exists (
  select 1
  from public.ops_sync_runtime_config c
  where c.tenant_id = t.id
);

commit;