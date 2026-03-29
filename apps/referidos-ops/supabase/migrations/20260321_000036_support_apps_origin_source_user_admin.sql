-- 20260320_000036_support_apps_origin_source_user_admin.sql
-- Ajusta semantica: app_channel = app real; origin_source = user|admin_support.

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

commit;
