-- 20260320_000035_support_apps_ops_registry.sql
-- Registro canonico de identidad de apps en OPS (fuente de verdad).

begin;

create extension if not exists "pgcrypto" with schema extensions;

create or replace function public.support_apps_normalize_aliases(p_values text[])
returns text[]
language sql
immutable
as $$
  select coalesce(array_agg(distinct normalized order by normalized), '{}'::text[])
  from (
    select lower(trim(value)) as normalized
    from unnest(coalesce(p_values, '{}'::text[])) as raw(value)
  ) normalized_values
  where normalized <> '';
$$;

create table if not exists public.support_apps (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  app_key text not null,
  app_code text not null,
  display_name text not null,
  origin_source_default text not null default 'user',
  aliases text[] not null default '{}'::text[],
  is_active boolean not null default true,
  soft_deleted_at timestamptz null,
  purge_after timestamptz null,
  metadata jsonb not null default '{}'::jsonb,
  created_by text,
  updated_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint support_apps_app_key_check
    check (app_key ~ '^[a-z0-9_]+$'),
  constraint support_apps_app_code_check
    check (app_code ~ '^[a-z0-9][a-z0-9_-]*$'),
  constraint support_apps_origin_source_default_check
    check (origin_source_default in ('user', 'admin_support')),
  constraint support_apps_soft_delete_consistency_check
    check (
      (is_active = true and soft_deleted_at is null and purge_after is null)
      or (
        is_active = false
        and soft_deleted_at is not null
        and purge_after is not null
        and purge_after > soft_deleted_at
      )
    ),
  unique (tenant_id, app_key)
);

create unique index if not exists idx_support_apps_tenant_app_code
  on public.support_apps (tenant_id, lower(app_code));

create index if not exists idx_support_apps_tenant_active
  on public.support_apps (tenant_id, is_active, purge_after);

create index if not exists idx_support_apps_aliases_gin
  on public.support_apps using gin (aliases);

create or replace function public.trg_support_apps_before_write()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_old_code text;
begin
  new.app_key := lower(trim(coalesce(new.app_key, '')));
  new.app_code := lower(trim(coalesce(new.app_code, '')));
  new.display_name := trim(coalesce(new.display_name, ''));
  new.origin_source_default := lower(trim(coalesce(new.origin_source_default, 'user')));
  new.aliases := public.support_apps_normalize_aliases(new.aliases);

  if new.app_key = '' then
    raise exception 'support_apps: app_key requerido';
  end if;
  if new.app_code = '' then
    raise exception 'support_apps: app_code requerido';
  end if;
  if new.display_name = '' then
    raise exception 'support_apps: display_name requerido';
  end if;

  if tg_op = 'UPDATE' and new.app_key is distinct from old.app_key then
    raise exception 'support_apps: app_key es inmutable';
  end if;

  if tg_op = 'UPDATE' then
    v_old_code := lower(trim(coalesce(old.app_code, '')));
    if v_old_code <> '' and v_old_code is distinct from new.app_code then
      new.aliases := public.support_apps_normalize_aliases(new.aliases || array[v_old_code]);
    end if;
  end if;

  new.aliases := public.support_apps_normalize_aliases(new.aliases || array[new.app_code]);

  if new.is_active then
    new.soft_deleted_at := null;
    new.purge_after := null;
  else
    new.soft_deleted_at := coalesce(new.soft_deleted_at, case when tg_op = 'UPDATE' then old.soft_deleted_at else null end, now());
    new.purge_after := coalesce(new.purge_after, case when tg_op = 'UPDATE' then old.purge_after else null end, new.soft_deleted_at + interval '30 days');
  end if;

  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists trg_support_apps_before_write on public.support_apps;
create trigger trg_support_apps_before_write
before insert or update on public.support_apps
for each row execute function public.trg_support_apps_before_write();

create or replace function public.support_apps_default_tenant_id(
  p_tenant_name text default 'ReferidosAPP'
)
returns uuid
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_tenant_id uuid;
begin
  select t.id
    into v_tenant_id
  from public.tenants t
  where lower(t.name) = lower(coalesce(trim(p_tenant_name), ''))
  order by t.created_at asc
  limit 1;

  if v_tenant_id is null then
    select t.id
      into v_tenant_id
    from public.tenants t
    order by t.created_at asc
    limit 1;
  end if;

  return v_tenant_id;
end;
$$;

create or replace function public.support_apps_prune_expired(
  p_tenant_id uuid default null
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_tenant_id uuid;
  v_deleted_count integer := 0;
begin
  v_tenant_id := coalesce(p_tenant_id, public.support_apps_default_tenant_id('ReferidosAPP'));
  if v_tenant_id is null then
    return 0;
  end if;

  with deleted_rows as (
    delete from public.support_apps
    where tenant_id = v_tenant_id
      and is_active = false
      and purge_after is not null
      and purge_after <= now()
    returning 1
  )
  select count(*) into v_deleted_count
  from deleted_rows;

  return coalesce(v_deleted_count, 0);
end;
$$;

grant execute on function public.support_apps_default_tenant_id(text) to authenticated;
grant execute on function public.support_apps_default_tenant_id(text) to service_role;
grant execute on function public.support_apps_prune_expired(uuid) to authenticated;
grant execute on function public.support_apps_prune_expired(uuid) to service_role;

grant select, insert, update, delete on public.support_apps to service_role;
revoke all on public.support_apps from authenticated;
revoke all on public.support_apps from anon;

alter table public.support_apps disable row level security;

with target_tenant as (
  select public.support_apps_default_tenant_id('ReferidosAPP') as tenant_id
)
insert into public.support_apps (
  tenant_id,
  app_key,
  app_code,
  display_name,
  origin_source_default,
  aliases,
  is_active,
  metadata,
  created_by,
  updated_by
)
select
  t.tenant_id,
  seed.app_key,
  seed.app_code,
  seed.display_name,
  seed.origin_source_default,
  public.support_apps_normalize_aliases(seed.aliases),
  true,
  '{}'::jsonb,
  'migration:20260320_000035',
  'migration:20260320_000035'
from target_tenant t
join (
  values
    ('referidos_app', 'referidos-pwa', 'PWA', 'user', '{app,pwa,referidos-app,referidos-pwa}'::text[]),
    ('prelaunch_web', 'prelaunch', 'waitlist', 'user', '{prelaunch-web,landing,waitlist}'::text[]),
    ('android_app', 'android-app', 'Android', 'user', '{android,referidos-android}'::text[])
) as seed(app_key, app_code, display_name, origin_source_default, aliases)
  on true
where t.tenant_id is not null
on conflict (tenant_id, app_key) do nothing;

commit;
