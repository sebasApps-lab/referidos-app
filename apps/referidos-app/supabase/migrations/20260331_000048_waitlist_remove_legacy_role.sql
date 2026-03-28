-- 20260328_000048_waitlist_remove_legacy_role.sql
-- Remove legacy waitlist role column/enum now that role_intent is canonical.

begin;

update public.waitlist_signups
set role_intent = case
  when role_intent in ('cliente', 'negocio') then role_intent
  when role::text = 'negocio_interest' then 'negocio'
  else 'cliente'
end
where role_intent is null
   or length(trim(role_intent)) = 0
   or role_intent not in ('cliente', 'negocio');

drop index if exists public.waitlist_signups_email_key;

alter table public.waitlist_signups
  drop column if exists role;

do $$
begin
  if exists (
    select 1
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where t.typname = 'waitlist_role'
      and n.nspname = 'public'
  ) then
    drop type public.waitlist_role;
  end if;
exception
  when dependent_objects_still_exist then
    raise notice 'waitlist_role still has dependents, skipping drop';
end $$;

commit;
