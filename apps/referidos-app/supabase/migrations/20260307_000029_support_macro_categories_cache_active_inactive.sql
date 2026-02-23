-- 20260307_000029_support_macro_categories_cache_active_inactive.sql
-- Cache runtime: categorias de macros con estado active/inactive.

begin;

alter table public.support_macro_categories_cache
  alter column status drop default;

alter table public.support_macro_categories_cache
  drop constraint if exists support_macro_categories_cache_status_check;

update public.support_macro_categories_cache
set status = case
  when status = 'active' then 'active'
  when status = 'published' then 'active'
  else 'inactive'
end
where status is distinct from case
  when status = 'active' then 'active'
  when status = 'published' then 'active'
  else 'inactive'
end;

alter table public.support_macro_categories_cache
  add constraint support_macro_categories_cache_status_check
  check (status in ('active', 'inactive'));

alter table public.support_macro_categories_cache
  alter column status set default 'active';

commit;
