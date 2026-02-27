-- 20260312_000034_support_macros_cache_audience_anonimo.sql
-- Habilita rol de audiencia "anonimo" en cache runtime de macros.

begin;

update public.support_macros_cache m
set audience_roles = (
  select coalesce(
    array_agg(distinct normalized_role order by normalized_role),
    array['cliente', 'negocio']::text[]
  )
  from (
    select case
      when lower(trim(role_value)) in ('anonimo', 'anonymous') then 'anonimo'
      when lower(trim(role_value)) in ('negocio', 'business') then 'negocio'
      when lower(trim(role_value)) in ('cliente', 'customer', 'soporte', 'support', 'admin') then 'cliente'
      else null
    end as normalized_role
    from unnest(coalesce(m.audience_roles, array[]::text[])) as role_value
  ) normalized
  where normalized_role is not null
);

alter table public.support_macros_cache
  drop constraint if exists support_macros_cache_audience_roles_check;

alter table public.support_macros_cache
  add constraint support_macros_cache_audience_roles_check
  check (
    cardinality(audience_roles) > 0
    and audience_roles <@ array['cliente', 'negocio', 'anonimo']::text[]
  );

commit;
