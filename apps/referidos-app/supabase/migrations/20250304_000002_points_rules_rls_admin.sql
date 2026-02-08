-- ============================================
-- RLS para points_rules: solo admin
-- ============================================

alter table public.points_rules enable row level security;

drop policy if exists points_rules_admin_select on public.points_rules;
create policy points_rules_admin_select on public.points_rules
  for select to authenticated
  using (
    exists (
      select 1 from public.usuarios u
      where u.id_auth = auth.uid()
        and u.role = 'admin'
    )
  );

-- Sin policies de write: se bloquea insert/update/delete desde el cliente.
-- Los cambios se deben hacer via RPC security definer.

-- ============================================
-- Direcciones: owner_id obligatorio + cascade
-- ============================================
update public.direcciones d
set owner_id = n.usuarioid
from public.sucursales s
join public.negocios n on n.id = s.negocioid
where d.owner_id is null
  and s.direccion_id = d.id;

delete from public.direcciones
where owner_id is null;

do $$
declare
  fk_name text;
begin
  select c.conname into fk_name
  from pg_constraint c
  join pg_class t on t.oid = c.conrelid
  join pg_namespace n on n.oid = t.relnamespace
  where n.nspname = 'public'
    and t.relname = 'direcciones'
    and c.contype = 'f'
    and exists (
      select 1
      from unnest(c.conkey) as k(attnum)
      join pg_attribute a on a.attrelid = t.oid and a.attnum = k.attnum
      where a.attname = 'owner_id'
    )
  limit 1;

  if fk_name is not null then
    execute format('alter table public.direcciones drop constraint %I', fk_name);
  end if;
end$$;

alter table public.direcciones
  alter column owner_id set not null;

alter table public.direcciones
  add constraint direcciones_owner_id_fkey
  foreign key (owner_id)
  references public.usuarios(id)
  on delete cascade;

create or replace function public.delete_direccion_on_sucursal_delete()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.direccion_id is not null then
    delete from public.direcciones where id = old.direccion_id;
  end if;
  return old;
end;
$$;

drop trigger if exists trg_delete_direccion_on_sucursal_delete on public.sucursales;
create trigger trg_delete_direccion_on_sucursal_delete
after delete on public.sucursales
for each row execute function public.delete_direccion_on_sucursal_delete();

-- ============================================
-- RLS: tiers (select publico, write solo admin)
-- ============================================
alter table public.tiers enable row level security;

drop policy if exists tiers_select_public on public.tiers;
create policy tiers_select_public on public.tiers
  for select to anon, authenticated
  using (true);

drop policy if exists tiers_admin_insert on public.tiers;
create policy tiers_admin_insert on public.tiers
  for insert to authenticated
  with check (
    exists (
      select 1 from public.usuarios u
      where u.id_auth = auth.uid()
        and u.role = 'admin'
    )
  );

drop policy if exists tiers_admin_update on public.tiers;
create policy tiers_admin_update on public.tiers
  for update to authenticated
  using (
    exists (
      select 1 from public.usuarios u
      where u.id_auth = auth.uid()
        and u.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.usuarios u
      where u.id_auth = auth.uid()
        and u.role = 'admin'
    )
  );

drop policy if exists tiers_admin_delete on public.tiers;
create policy tiers_admin_delete on public.tiers
  for delete to authenticated
  using (
    exists (
      select 1 from public.usuarios u
      where u.id_auth = auth.uid()
        and u.role = 'admin'
    )
  );
