begin;

create or replace function public.versioning_list_applied_migrations()
returns table(
  version text,
  name text,
  statements text
)
language sql
security definer
set search_path = public, supabase_migrations
as $$
  select
    m.version::text,
    coalesce(m.name, '')::text,
    coalesce(m.statements::text, '')::text
  from supabase_migrations.schema_migrations m
  order by m.version::text asc;
$$;

grant execute on function public.versioning_list_applied_migrations() to authenticated;
grant execute on function public.versioning_list_applied_migrations() to service_role;

commit;
