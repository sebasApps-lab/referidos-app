-- ============================================
-- 20250205_000001_auth_and_users.sql
-- MIGRACIÓN FINAL 2025
-- Esquema unificado, triggers modernos, RLS completa,
-- compatible con migrate_auth_and_sync.js
-- ============================================

------------------------------------------------
-- LIMPIEZA TOTAL
------------------------------------------------
drop table if exists reportes cascade;
drop table if exists comentarios cascade;
drop table if exists escaneos cascade;
drop table if exists qr_validos cascade;
drop table if exists promos_sucursales cascade;
drop table if exists promos cascade;
drop table if exists sucursales cascade;
drop table if exists negocios cascade;
drop table if exists usuarios cascade;

drop function if exists public.handle_new_user() cascade;
drop function if exists public.sync_auth_user_to_usuarios() cascade;

drop trigger if exists on_auth_user_created on auth.users;
drop trigger if exists trg_sync_auth_user_to_usuarios on auth.users;

------------------------------------------------
-- ESQUEMA COMPLETO 2025
------------------------------------------------

-- ============================================
-- USUARIOS
-- ============================================
create table usuarios (
  id text primary key,
  id_auth uuid unique,
  email text unique not null,
  telefono text,
  nombre text,
  apellido text,
  cedula text,
  ruc text,
  role text not null default 'cliente',
  emailConfirmado boolean default false,
  fechaCreacion timestamptz default now()
);

create index idx_usuarios_id_auth on usuarios(id_auth);

-- ============================================
-- NEGOCIOS
-- ============================================
create table negocios (
  id text primary key,
  usuarioId text references usuarios(id) on delete set null,
  nombre text not null,
  sector text,
  direccion text,
  lat numeric,
  lng numeric,
  imagen text,
  fechaCreacion timestamptz default now()
);

-- ============================================
-- SUCURSALES
-- ============================================
create table sucursales (
  id text primary key,
  negocioId text references negocios(id) on delete cascade,
  direccion text not null,
  sector text,
  lat numeric,
  lng numeric,
  imagen text,
  fechaCreacion timestamptz default now()
);

-- ============================================
-- PROMOS
-- ============================================
create table promos (
  id text primary key,
  negocioId text references negocios(id) on delete cascade,
  titulo text not null,
  descripcion text,
  inicio date,
  fin date,
  estado text,
  canjeadosCount integer default 0,
  imagen text,
  fechaCreacion timestamptz default now()
);

-- ============================================
-- PROMOS x SUCURSALES
-- ============================================
create table promos_sucursales (
  promoId text references promos(id) on delete cascade,
  sucursalId text references sucursales(id) on delete cascade,
  primary key (promoId, sucursalId)
);

-- ============================================
-- QR VALIDOS
-- ============================================
create table qr_validos (
  id text primary key,
  promoId text references promos(id) on delete cascade,
  clienteId text references usuarios(id) on delete set null,
  negocioId text references negocios(id) on delete cascade,
  sucursalId text references sucursales(id) on delete cascade,
  fechaExpira timestamptz,
  canjeado boolean default false,
  fechaCanje timestamptz,
  fechaCreacion timestamptz default now()
);

-- ============================================
-- ESCANEOS
-- ============================================
create table escaneos (
  id text primary key,
  qrValidoId text references qr_validos(id) on delete cascade,
  clienteId text references usuarios(id) on delete set null,
  fechaCreacion timestamptz default now()
);

-- ============================================
-- COMENTARIOS
-- ============================================
create table comentarios (
  id text primary key,
  promoId text references promos(id) on delete cascade,
  clienteId text references usuarios(id) on delete set null,
  estrellas numeric,
  texto text,
  fechaCreacion timestamptz default now()
);

-- ============================================
-- REPORTES
-- ============================================
create table reportes (
  id text primary key,
  reporterId text references usuarios(id) on delete set null,
  reporterRole text,
  targetId text,
  targetType text,
  texto text,
  fechaCreacion timestamptz default now()
);

------------------------------------------------
-- RLS FINAL 2025
------------------------------------------------

alter table usuarios enable row level security;
alter table negocios enable row level security;
alter table sucursales enable row level security;
alter table promos enable row level security;
alter table promos_sucursales enable row level security;
alter table qr_validos enable row level security;
alter table escaneos enable row level security;
alter table comentarios enable row level security;
alter table reportes enable row level security;

-----------------------------------------------
-- USUARIOS (POLICIES COMPLETAS)
-----------------------------------------------

-- INSERT libre para trigger y service role
create policy usuarios_insert_any on usuarios
  for insert to anon, authenticated
  with check (true);

-- SELECT: el usuario puede verse a sí mismo
create policy usuarios_select_self on usuarios
  for select to authenticated
  using (id_auth = auth.uid());

-- SELECT: permitir leer su fila por email
create policy usuarios_select_by_email on usuarios
  for select to authenticated
  using (email = auth.email());

-- SELECT: service_role puede ver todo (script migrate)
create policy usuarios_select_service_role on usuarios
  for select to service_role
  using (true);

-- UPDATE: usuario actualiza solo su propio perfil
create policy usuarios_update_self on usuarios
  for update to authenticated
  using (id_auth = auth.uid())
  with check (id_auth = auth.uid());

-- UPDATE: service role puede actualizar
create policy usuarios_update_service_role on usuarios
  for update to service_role
  using (true)
  with check (true);

-----------------------------------------------
-- PROMOS (público)
-----------------------------------------------
create policy promos_public_select on promos
  for select using (true);

-----------------------------------------------
-- SUCURSALES (negocio)
-----------------------------------------------
create policy sucursales_insert_by_business on sucursales
  for insert with check (
    exists (
      select 1
      from negocios n
      join usuarios u on u.id = n.usuarioId
      where n.id = negocioId
        and u.id_auth = auth.uid()
    )
  );

create policy sucursales_update_by_business on sucursales
  for update using (
    exists (
      select 1
      from negocios n
      join usuarios u on u.id = n.usuarioId
      where n.id = sucursales.negocioId
        and u.id_auth = auth.uid()
    )
  );

-----------------------------------------------
-- QR VALIDOS
-----------------------------------------------
create policy qr_select_by_client on qr_validos
  for select using (
    exists (
      select 1
      from usuarios u
      where u.id = qr_validos.clienteId
        and u.id_auth = auth.uid()
    )
  );

create policy qr_insert_by_client on qr_validos
  for insert with check (
    exists (
      select 1
      from usuarios u
      where u.id = clienteId
        and u.id_auth = auth.uid()
        and u.emailConfirmado = true
    )
  );

-----------------------------------------------
-- COMENTARIOS
-----------------------------------------------
create policy coment_insert_by_client on comentarios
  for insert with check (
    exists (
      select 1
      from usuarios u
      where u.id = clienteId
        and u.id_auth = auth.uid()
        and u.emailConfirmado = true
    )
  );

create policy coment_select_public on comentarios
  for select using (true);

------------------------------------------------
-- TRIGGERS MODERNOS 2025
------------------------------------------------

-- Crear perfil al registrarse un usuario auth
create or replace function public.handle_new_user()
returns trigger
security definer
set search_path = public
language plpgsql
as $$
declare
  new_id text;
  role text;
begin
  role := coalesce(new.raw_user_meta_data->>'role', 'cliente');
  new_id := 'USR_' || substr(md5(new.id::text), 1, 12);

  insert into usuarios (
    id, id_auth, email, telefono, nombre, apellido, role, emailConfirmado
  ) values (
    new_id,
    new.id,
    new.email,
    coalesce(new.phone, ''),
    coalesce(new.raw_user_meta_data->>'nombre', split_part(new.email,'@',1)),
    '',
    role,
    new.email_confirmed_at is not null
  ) on conflict (id_auth) do nothing;

  return new;
end $$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Mantener emailConfirmado sincronizado
create or replace function public.sync_auth_user_to_usuarios()
returns trigger
security definer
set search_path = public
language plpgsql
as $$
begin
  update usuarios
  set emailConfirmado = (new.email_confirmed_at is not null)
  where id_auth = new.id;

  return new;
end $$;

create trigger trg_sync_auth_user_to_usuarios
after update of email_confirmed_at on auth.users
for each row execute function public.sync_auth_user_to_usuarios();
