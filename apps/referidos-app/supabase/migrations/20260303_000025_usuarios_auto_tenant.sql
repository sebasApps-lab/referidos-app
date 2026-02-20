-- Auto-assign tenant_id for usuarios inserts to keep auth/register flows stable
-- after tenant_id became NOT NULL.

begin;

create or replace function public.resolve_default_tenant_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select t.id
  from public.tenants t
  where lower(t.name) = lower('ReferidosAPP')
    and t.status = 'active'
  order by t.created_at asc
  limit 1;
$$;

grant execute on function public.resolve_default_tenant_id() to authenticated;
grant execute on function public.resolve_default_tenant_id() to service_role;

create or replace function public.set_usuarios_tenant_id_before_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_tenant_id uuid;
begin
  if new.tenant_id is not null then
    return new;
  end if;

  if new.id_auth is not null then
    select u.tenant_id
      into v_tenant_id
    from public.usuarios u
    where u.id_auth = new.id_auth
      and u.tenant_id is not null
    order by u.id desc
    limit 1;
  end if;

  if v_tenant_id is null then
    v_tenant_id := public.resolve_default_tenant_id();
  end if;

  if v_tenant_id is null then
    raise exception 'usuarios_tenant_resolution_failed';
  end if;

  new.tenant_id := v_tenant_id;
  return new;
end;
$$;

drop trigger if exists trg_usuarios_set_tenant_id on public.usuarios;
create trigger trg_usuarios_set_tenant_id
before insert on public.usuarios
for each row execute function public.set_usuarios_tenant_id_before_insert();

update public.usuarios
set tenant_id = public.resolve_default_tenant_id()
where tenant_id is null;

commit;

