-- Support app identity registry with soft-delete retention window (30 days).
-- This protects ticket/log/macro integrity by keeping an immutable internal key (app_key)
-- while allowing editable public identity fields (app_code/display_name/aliases).

create extension if not exists pgcrypto;

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
  tenant_id uuid not null default coalesce(public.current_usuario_tenant_id(), public.resolve_default_tenant_id()) references public.tenants(id) on delete cascade,
  app_key text not null,
  app_code text not null,
  display_name text not null,
  origin_source_default text not null default 'app',
  aliases text[] not null default '{}'::text[],
  is_active boolean not null default true,
  soft_deleted_at timestamptz null,
  purge_after timestamptz null,
  created_by uuid null,
  updated_by uuid null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint support_apps_app_key_check
    check (app_key ~ '^[a-z0-9_]+$'),
  constraint support_apps_app_code_check
    check (app_code ~ '^[a-z0-9][a-z0-9_-]*$'),
  constraint support_apps_origin_source_default_check
    check (origin_source_default ~ '^[a-z0-9][a-z0-9_-]*$'),
  constraint support_apps_soft_delete_consistency_check
    check (
      (is_active = true and soft_deleted_at is null and purge_after is null)
      or (
        is_active = false
        and soft_deleted_at is not null
        and purge_after is not null
        and purge_after > soft_deleted_at
      )
    )
);

create unique index if not exists idx_support_apps_tenant_app_key
  on public.support_apps (tenant_id, app_key);

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
  v_actor_id uuid;
  v_old_code text;
begin
  if new.tenant_id is null then
    new.tenant_id := coalesce(public.current_usuario_tenant_id(), public.resolve_default_tenant_id());
  end if;

  new.app_key := lower(trim(coalesce(new.app_key, '')));
  new.app_code := lower(trim(coalesce(new.app_code, '')));
  new.display_name := trim(coalesce(new.display_name, ''));
  new.origin_source_default := lower(trim(coalesce(new.origin_source_default, 'app')));
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

  v_actor_id := auth.uid();

  if tg_op = 'INSERT' then
    new.created_by := coalesce(new.created_by, v_actor_id);
  end if;
  new.updated_by := coalesce(new.updated_by, v_actor_id);
  new.updated_at := now();

  return new;
end;
$$;

drop trigger if exists trg_support_apps_before_write on public.support_apps;
create trigger trg_support_apps_before_write
before insert or update on public.support_apps
for each row execute function public.trg_support_apps_before_write();

create or replace function public.support_apps_prune_expired(p_tenant_id uuid default null)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_tenant_id uuid;
  v_deleted_count integer := 0;
begin
  v_tenant_id := coalesce(p_tenant_id, public.current_usuario_tenant_id(), public.resolve_default_tenant_id());
  if v_tenant_id is null then
    return 0;
  end if;

  if auth.uid() is not null and not public.is_admin() then
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

create or replace function public.support_normalize_app_key(p_value text, p_fallback text default 'referidos_app')
returns text
language plpgsql
immutable
as $$
declare
  v_value text := lower(trim(coalesce(p_value, '')));
  v_fallback text := lower(trim(coalesce(p_fallback, 'referidos_app')));
begin
  if v_fallback = '' then
    v_fallback := 'referidos_app';
  end if;

  v_fallback := case
    when v_fallback in ('app', 'pwa', 'referidos-pwa', 'referidos-app') then 'referidos_app'
    when v_fallback in ('prelaunch', 'prelaunch-web', 'landing') then 'prelaunch_web'
    when v_fallback in ('android', 'android-app', 'referidos-android') then 'android_app'
    else v_fallback
  end;

  if v_value = '' then
    return v_fallback;
  end if;

  return case
    when v_value in ('app', 'pwa', 'referidos-pwa', 'referidos-app') then 'referidos_app'
    when v_value in ('prelaunch', 'prelaunch-web', 'landing') then 'prelaunch_web'
    when v_value in ('android', 'android-app', 'referidos-android') then 'android_app'
    else v_value
  end;
end;
$$;

create or replace function public.support_resolve_app_identity(
  p_value text,
  p_fallback text default 'referidos_app'
)
returns table(
  app_key text,
  app_code text,
  display_name text,
  origin_source_default text,
  is_active boolean,
  purge_after timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_tenant_id uuid;
  v_value text;
  v_fallback text;
  v_row public.support_apps%rowtype;
begin
  v_tenant_id := coalesce(public.current_usuario_tenant_id(), public.resolve_default_tenant_id());
  if v_tenant_id is null then
    raise exception 'support_resolve_app_identity: tenant_id unresolved';
  end if;

  perform public.support_apps_prune_expired(v_tenant_id);

  v_fallback := public.support_normalize_app_key(p_fallback, 'referidos_app');
  v_value := public.support_normalize_app_key(p_value, v_fallback);

  select s.*
    into v_row
  from public.support_apps s
  where s.tenant_id = v_tenant_id
    and (
      s.app_key = v_value
      or lower(s.app_code) = v_value
      or v_value = any(s.aliases)
    )
  order by case when s.is_active then 0 else 1 end, s.updated_at desc
  limit 1;

  if v_row.id is null then
    select s.*
      into v_row
    from public.support_apps s
    where s.tenant_id = v_tenant_id
      and s.app_key = v_fallback
    order by case when s.is_active then 0 else 1 end, s.updated_at desc
    limit 1;
  end if;

  if v_row.id is null then
    return query
      select
        v_fallback,
        case
          when v_fallback = 'referidos_app' then 'referidos-pwa'
          when v_fallback = 'prelaunch_web' then 'prelaunch'
          when v_fallback = 'android_app' then 'android-app'
          when v_fallback = 'admin_support' then 'soporte'
          else v_fallback
        end,
        case
          when v_fallback = 'referidos_app' then 'PWA'
          when v_fallback = 'prelaunch_web' then 'waitlist'
          when v_fallback = 'android_app' then 'Android'
          when v_fallback = 'admin_support' then 'Soporte'
          else initcap(replace(v_fallback, '_', ' '))
        end,
        case
          when v_fallback = 'prelaunch_web' then 'prelaunch'
          when v_fallback = 'admin_support' then 'admin_support'
          else 'app'
        end,
        true,
        null::timestamptz;
    return;
  end if;

  return query
    select
      v_row.app_key,
      v_row.app_code,
      v_row.display_name,
      v_row.origin_source_default,
      v_row.is_active,
      v_row.purge_after;
end;
$$;

create or replace function public.support_resolve_app_channel(
  p_value text,
  p_fallback text default 'referidos_app'
)
returns text
language sql
security definer
set search_path = public
as $$
  select app_key
  from public.support_resolve_app_identity(p_value, p_fallback)
  limit 1;
$$;

grant execute on function public.support_apps_prune_expired(uuid) to authenticated;
grant execute on function public.support_apps_prune_expired(uuid) to service_role;
grant execute on function public.support_normalize_app_key(text, text) to authenticated;
grant execute on function public.support_normalize_app_key(text, text) to service_role;
grant execute on function public.support_resolve_app_identity(text, text) to authenticated;
grant execute on function public.support_resolve_app_identity(text, text) to service_role;
grant execute on function public.support_resolve_app_channel(text, text) to authenticated;
grant execute on function public.support_resolve_app_channel(text, text) to service_role;

insert into public.support_apps (
  tenant_id,
  app_key,
  app_code,
  display_name,
  origin_source_default,
  aliases,
  is_active
)
select
  t.id,
  seed.app_key,
  seed.app_code,
  seed.display_name,
  seed.origin_source_default,
  seed.aliases,
  true
from public.tenants t
cross join (
  values
    ('referidos_app', 'referidos-pwa', 'PWA', 'app', array['app', 'pwa', 'referidos-app', 'referidos_app', 'referidos-pwa']),
    ('prelaunch_web', 'prelaunch', 'waitlist', 'prelaunch', array['prelaunch', 'prelaunch_web', 'prelaunch-web', 'landing']),
    ('android_app', 'android-app', 'Android', 'app', array['android', 'android_app', 'android-app', 'referidos-android']),
    ('admin_support', 'soporte', 'Soporte', 'admin_support', array['admin_support', 'support_admin', 'soporte'])
) as seed(app_key, app_code, display_name, origin_source_default, aliases)
on conflict (tenant_id, app_key) do nothing;

update public.support_threads
set app_channel = public.support_resolve_app_channel(app_channel, 'referidos_app')
where app_channel is not null
  and length(trim(app_channel)) > 0;

update public.support_threads
set app_channel = 'referidos_app'
where app_channel is null
   or length(trim(app_channel)) = 0;

alter table public.support_threads
  alter column app_channel set default 'referidos_app';

grant select, insert, update on public.support_apps to authenticated;
grant all on public.support_apps to service_role;

alter table public.support_apps enable row level security;

drop policy if exists support_apps_select_support_admin on public.support_apps;
create policy support_apps_select_support_admin
  on public.support_apps
  for select
  to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and (public.is_admin() or public.is_support())
  );

drop policy if exists support_apps_admin_insert on public.support_apps;
create policy support_apps_admin_insert
  on public.support_apps
  for insert
  to authenticated
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.is_admin()
  );

drop policy if exists support_apps_admin_update on public.support_apps;
create policy support_apps_admin_update
  on public.support_apps
  for update
  to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.is_admin()
  );

drop policy if exists support_apps_admin_delete on public.support_apps;
create policy support_apps_admin_delete
  on public.support_apps
  for delete
  to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.is_admin()
  );
