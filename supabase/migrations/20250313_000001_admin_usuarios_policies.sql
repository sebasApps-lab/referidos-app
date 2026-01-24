-- Admin can read/update usuarios (RLS)
alter table public.usuarios enable row level security;

drop policy if exists usuarios_select_admin on public.usuarios;
create policy usuarios_select_admin on public.usuarios
  for select to authenticated
  using (public.is_admin());

drop policy if exists usuarios_update_admin on public.usuarios;
create policy usuarios_update_admin on public.usuarios
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Admin read access to core tables
alter table public.negocios enable row level security;
alter table public.sucursales enable row level security;
alter table public.promos enable row level security;
alter table public.promos_sucursales enable row level security;
alter table public.qr_validos enable row level security;
alter table public.reportes enable row level security;
alter table public.direcciones enable row level security;
alter table public.comentarios enable row level security;
alter table public.escaneos enable row level security;

drop policy if exists negocios_select_admin on public.negocios;
create policy negocios_select_admin on public.negocios
  for select to authenticated
  using (public.is_admin());

drop policy if exists sucursales_select_admin on public.sucursales;
create policy sucursales_select_admin on public.sucursales
  for select to authenticated
  using (public.is_admin());

drop policy if exists promos_select_admin on public.promos;
create policy promos_select_admin on public.promos
  for select to authenticated
  using (public.is_admin());

drop policy if exists promos_sucursales_select_admin on public.promos_sucursales;
create policy promos_sucursales_select_admin on public.promos_sucursales
  for select to authenticated
  using (public.is_admin());

drop policy if exists qr_validos_select_admin on public.qr_validos;
create policy qr_validos_select_admin on public.qr_validos
  for select to authenticated
  using (public.is_admin());

drop policy if exists reportes_select_admin on public.reportes;
create policy reportes_select_admin on public.reportes
  for select to authenticated
  using (public.is_admin());

drop policy if exists direcciones_select_admin on public.direcciones;
create policy direcciones_select_admin on public.direcciones
  for select to authenticated
  using (public.is_admin());

drop policy if exists comentarios_select_admin on public.comentarios;
create policy comentarios_select_admin on public.comentarios
  for select to authenticated
  using (public.is_admin());

drop policy if exists escaneos_select_admin on public.escaneos;
create policy escaneos_select_admin on public.escaneos
  for select to authenticated
  using (public.is_admin());

-- Reportes status for admin workflow
alter table public.reportes
  add column if not exists estado text default 'abierto';

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'reportes_estado_check'
  ) then
    alter table public.reportes
      add constraint reportes_estado_check
      check (estado in ('abierto', 'en_revision', 'resuelto'));
  end if;
end $$;
