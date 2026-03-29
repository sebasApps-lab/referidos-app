-- 20260320_000040_support_origin_source_user_admin_support.sql
-- Separa semantica:
-- - app_channel: app real (referidos_app, prelaunch_web, android_app)
-- - origin_source: origen operativo (user, admin_support)

begin;

alter table public.support_apps
  alter column origin_source_default set default 'user';

update public.support_apps
set origin_source_default = case
  when lower(trim(coalesce(origin_source_default, ''))) = 'admin_support' then 'admin_support'
  else 'user'
end;

alter table public.support_apps
  drop constraint if exists support_apps_origin_source_default_check;

alter table public.support_apps
  add constraint support_apps_origin_source_default_check
  check (origin_source_default in ('user', 'admin_support'));

delete from public.support_apps
where app_key = 'admin_support';

update public.support_apps
set aliases = public.support_apps_normalize_aliases(
  array_remove(
    array_remove(
      array_remove(coalesce(aliases, '{}'::text[]), 'admin_support'),
      'support_admin'
    ),
    'soporte'
  )
)
where aliases && array['admin_support', 'support_admin', 'soporte']::text[];

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
    when v_fallback in ('app', 'pwa', 'referidos-pwa', 'referidos-app', 'support', 'soporte', 'admin_support', 'support_admin') then 'referidos_app'
    when v_fallback in ('prelaunch', 'prelaunch-web', 'landing') then 'prelaunch_web'
    when v_fallback in ('android', 'android-app', 'referidos-android') then 'android_app'
    else v_fallback
  end;

  if v_value = '' then
    return v_fallback;
  end if;

  return case
    when v_value in ('app', 'pwa', 'referidos-pwa', 'referidos-app', 'support', 'soporte', 'admin_support', 'support_admin') then 'referidos_app'
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
          else v_fallback
        end,
        case
          when v_fallback = 'referidos_app' then 'PWA'
          when v_fallback = 'prelaunch_web' then 'waitlist'
          when v_fallback = 'android_app' then 'Android'
          else initcap(replace(v_fallback, '_', ' '))
        end,
        'user',
        true,
        null::timestamptz;
    return;
  end if;

  return query
    select
      v_row.app_key,
      v_row.app_code,
      v_row.display_name,
      case
        when lower(trim(coalesce(v_row.origin_source_default, ''))) = 'admin_support' then 'admin_support'
        else 'user'
      end,
      v_row.is_active,
      v_row.purge_after;
end;
$$;

update public.support_threads
set origin_source = case
  when created_by_agent_id is not null then 'admin_support'
  when lower(trim(coalesce(origin_source, ''))) in ('admin_support', 'support_admin', 'support', 'soporte') then 'admin_support'
  else 'user'
end;

alter table public.support_threads
  alter column origin_source set default 'user';

alter table public.support_threads
  drop constraint if exists support_threads_origin_source_check;

alter table public.support_threads
  add constraint support_threads_origin_source_check
  check (origin_source in ('user', 'admin_support'));

commit;
