-- 20260219_000014_ops_versioning_prereq_helpers.sql
-- Helper functions required by versioning RLS/functions in referidos-ops.

begin;

create or replace function public.current_usuario_tenant_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select u.tenant_id
  from public.usuarios u
  where u.id_auth = auth.uid()
  order by u.id desc
  limit 1;
$$;

grant execute on function public.current_usuario_tenant_id() to authenticated;
grant execute on function public.current_usuario_tenant_id() to service_role;

commit;
