-- 20260307_000025_support_macro_categories_active_inactive.sql
-- Categorias de macros: mover estado a active/inactive.

begin;

alter table public.support_macro_categories
  alter column status drop default;

alter table public.support_macro_categories
  drop constraint if exists support_macro_categories_status_check;

update public.support_macro_categories
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

alter table public.support_macro_categories
  add constraint support_macro_categories_status_check
  check (status in ('active', 'inactive'));

alter table public.support_macro_categories
  alter column status set default 'active';

commit;
