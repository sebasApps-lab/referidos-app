-- ============================================
-- 20250205_000003_auth_and_users_clean.sql
-- Esquema limpio 2025 sin roles legacy (anon/service_role)
-- PK autodetectable (UUID por defecto) pero permite IDs explícitos
-- Incluye índices en FKs y políticas RLS completas
-- ============================================

------------------------------------------------
-- EXTENSIONES
------------------------------------------------
create extension if not exists "pgcrypto" with schema extensions;

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
drop function if exists public.sync_auth_user_profile() cascade;

drop trigger if exists on_auth_user_created on auth.users;
drop trigger if exists trg_sync_auth_user_to_usuarios on auth.users;
drop trigger if exists trg_sync_auth_user_profile on auth.users;

------------------------------------------------
-- ESQUEMA
------------------------------------------------

-- USUARIOS
create table usuarios (
  id text primary key default gen_random_uuid()::text,
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

-- NEGOCIOS
create table negocios (
  id text primary key default gen_random_uuid()::text,
  usuarioId text references usuarios(id) on delete set null,
  nombre text not null,
  sector text,
  direccion text,
  lat numeric,
  lng numeric,
  imagen text,
  fechaCreacion timestamptz default now()
);
create index idx_negocios_usuarioId on negocios(usuarioId);

-- SUCURSALES
create table sucursales (
  id text primary key default gen_random_uuid()::text,
  negocioId text references negocios(id) on delete cascade,
  direccion text not null,
  sector text,
  lat numeric,
  lng numeric,
  imagen text,
  fechaCreacion timestamptz default now()
);
create index idx_sucursales_negocioId on sucursales(negocioId);

-- PROMOS
create table promos (
  id text primary key default gen_random_uuid()::text,
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
create index idx_promos_negocioId on promos(negocioId);

-- PROMOS x SUCURSALES
create table promos_sucursales (
  promoId text references promos(id) on delete cascade,
  sucursalId text references sucursales(id) on delete cascade,
  primary key (promoId, sucursalId)
);
create index idx_promos_sucursales_promo on promos_sucursales(promoId);
create index idx_promos_sucursales_sucursal on promos_sucursales(sucursalId);

-- QR VALIDOS
create table qr_validos (
  id text primary key default gen_random_uuid()::text,
  promoId text references promos(id) on delete cascade,
  clienteId text references usuarios(id) on delete set null,
  negocioId text references negocios(id) on delete cascade,
  sucursalId text references sucursales(id) on delete cascade,
  fechaExpira timestamptz,
  canjeado boolean default false,
  fechaCanje timestamptz,
  fechaCreacion timestamptz default now()
);
create index idx_qr_validos_promoId on qr_validos(promoId);
create index idx_qr_validos_clienteId on qr_validos(clienteId);
create index idx_qr_validos_negocioId on qr_validos(negocioId);
create index idx_qr_validos_sucursalId on qr_validos(sucursalId);

-- ESCANEOS
create table escaneos (
  id text primary key default gen_random_uuid()::text,
  qrValidoId text references qr_validos(id) on delete cascade,
  clienteId text references usuarios(id) on delete set null,
  fechaCreacion timestamptz default now()
);
create index idx_escaneos_qrValidoId on escaneos(qrValidoId);

-- COMENTARIOS
create table comentarios (
  id text primary key default gen_random_uuid()::text,
  promoId text references promos(id) on delete cascade,
  clienteId text references usuarios(id) on delete set null,
  estrellas numeric,
  texto text,
  fechaCreacion timestamptz default now()
);
create index idx_comentarios_promoId on comentarios(promoId);
create index idx_comentarios_clienteId on comentarios(clienteId);

-- REPORTES
create table reportes (
  id text primary key default gen_random_uuid()::text,
  reporterId text references usuarios(id) on delete set null,
  reporterRole text,
  targetId text,
  targetType text,
  texto text,
  fechaCreacion timestamptz default now()
);
create index idx_reportes_reporterId on reportes(reporterId);
create index idx_reportes_targetId on reportes(targetId);

------------------------------------------------
-- RLS
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

-- USUARIOS
create policy usuarios_insert_self on usuarios
  for insert to authenticated
  with check (id_auth = auth.uid());

create policy usuarios_select_self on usuarios
  for select to authenticated
  using (id_auth = auth.uid());

create policy usuarios_update_self on usuarios
  for update to authenticated
  using (id_auth = auth.uid())
  with check (id_auth = auth.uid());

-- NEGOCIOS (dueño)
create policy negocios_select_authenticated on negocios
  for select to authenticated
  using (true);

create policy negocios_insert_owner on negocios
  for insert to authenticated
  with check (
    exists (
      select 1 from usuarios u
      where u.id = usuarioId
        and u.id_auth = auth.uid()
    )
  );

create policy negocios_update_owner on negocios
  for update to authenticated
  using (
    exists (
      select 1 from usuarios u
      where u.id = negocios.usuarioId
        and u.id_auth = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from usuarios u
      where u.id = negocios.usuarioId
        and u.id_auth = auth.uid()
    )
  );

create policy negocios_delete_owner on negocios
  for delete to authenticated
  using (
    exists (
      select 1 from usuarios u
      where u.id = negocios.usuarioId
        and u.id_auth = auth.uid()
    )
  );

-- SUCURSALES (dueño del negocio)
create policy sucursales_select_authenticated on sucursales
  for select to authenticated
  using (true);

create policy sucursales_insert_by_business on sucursales
  for insert to authenticated
  with check (
    exists (
      select 1
      from negocios n
      join usuarios u on u.id = n.usuarioId
      where n.id = sucursales.negocioId
        and u.id_auth = auth.uid()
    )
  );

create policy sucursales_update_by_business on sucursales
  for update to authenticated
  using (
    exists (
      select 1
      from negocios n
      join usuarios u on u.id = n.usuarioId
      where n.id = sucursales.negocioId
        and u.id_auth = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from negocios n
      join usuarios u on u.id = n.usuarioId
      where n.id = sucursales.negocioId
        and u.id_auth = auth.uid()
    )
  );

create policy sucursales_delete_by_business on sucursales
  for delete to authenticated
  using (
    exists (
      select 1
      from negocios n
      join usuarios u on u.id = n.usuarioId
      where n.id = sucursales.negocioId
        and u.id_auth = auth.uid()
    )
  );

-- PROMOS (dueño del negocio)
create policy promos_public_select on promos
  for select using (true);

create policy promos_insert_by_business on promos
  for insert to authenticated
  with check (
    exists (
      select 1
      from negocios n
      join usuarios u on u.id = n.usuarioId
      where n.id = promos.negocioId
        and u.id_auth = auth.uid()
    )
  );

create policy promos_update_by_business on promos
  for update to authenticated
  using (
    exists (
      select 1
      from negocios n
      join usuarios u on u.id = n.usuarioId
      where n.id = promos.negocioId
        and u.id_auth = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from negocios n
      join usuarios u on u.id = n.usuarioId
      where n.id = promos.negocioId
        and u.id_auth = auth.uid()
    )
  );

create policy promos_delete_by_business on promos
  for delete to authenticated
  using (
    exists (
      select 1
      from negocios n
      join usuarios u on u.id = n.usuarioId
      where n.id = promos.negocioId
        and u.id_auth = auth.uid()
    )
  );

-- PROMOS x SUCURSALES (dueño del negocio)
create policy promos_sucursales_select_authenticated on promos_sucursales
  for select to authenticated
  using (true);

create policy promos_sucursales_insert_by_business on promos_sucursales
  for insert to authenticated
  with check (
    exists (
      select 1
      from sucursales s
      join negocios n on n.id = s.negocioId
      join usuarios u on u.id = n.usuarioId
      where s.id = promos_sucursales.sucursalId
        and u.id_auth = auth.uid()
    )
  );

create policy promos_sucursales_delete_by_business on promos_sucursales
  for delete to authenticated
  using (
    exists (
      select 1
      from sucursales s
      join negocios n on n.id = s.negocioId
      join usuarios u on u.id = n.usuarioId
      where s.id = promos_sucursales.sucursalId
        and u.id_auth = auth.uid()
    )
  );

-- QR VALIDOS
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
  for insert to authenticated
  with check (
    exists (
      select 1
      from usuarios u
      where u.id = clienteId
        and u.id_auth = auth.uid()
        and u.emailConfirmado = true
    )
  );

create policy qr_update_by_client on qr_validos
  for update to authenticated
  using (
    exists (
      select 1
      from usuarios u
      where u.id = qr_validos.clienteId
        and u.id_auth = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from usuarios u
      where u.id = qr_validos.clienteId
        and u.id_auth = auth.uid()
    )
  );

-- ESCANEOS
create policy escaneos_insert_by_client on escaneos
  for insert to authenticated
  with check (
    exists (
      select 1
      from qr_validos q
      join usuarios u on u.id = q.clienteId
      where q.id = escaneos.qrValidoId
        and u.id_auth = auth.uid()
    )
  );

-- COMENTARIOS
create policy coment_select_public on comentarios
  for select using (true);

create policy coment_insert_by_client on comentarios
  for insert to authenticated
  with check (
    exists (
      select 1
      from usuarios u
      where u.id = clienteId
        and u.id_auth = auth.uid()
        and u.emailConfirmado = true
    )
  );

create policy coment_update_owner_or_admin on comentarios
  for update to authenticated
  using (
    exists (
      select 1 from usuarios u
      where u.id_auth = auth.uid()
        and (u.role = 'admin' or u.id = comentarios.clienteId)
    )
  )
  with check (
    exists (
      select 1 from usuarios u
      where u.id_auth = auth.uid()
        and (u.role = 'admin' or u.id = comentarios.clienteId)
    )
  );

create policy coment_delete_owner_or_admin on comentarios
  for delete to authenticated
  using (
    exists (
      select 1 from usuarios u
      where u.id_auth = auth.uid()
        and (u.role = 'admin' or u.id = comentarios.clienteId)
    )
  );

-- REPORTES
create policy reportes_select_owner_or_admin on reportes
  for select to authenticated
  using (
    exists (
      select 1 from usuarios u
      where u.id_auth = auth.uid()
        and (u.role = 'admin' or u.id = reportes.reporterId)
    )
  );

create policy reportes_insert_owner on reportes
  for insert to authenticated
  with check (
    exists (
      select 1 from usuarios u
      where u.id = reporterId
        and u.id_auth = auth.uid()
    )
  );

create policy reportes_delete_admin on reportes
  for delete to authenticated
  using (
    exists (
      select 1 from usuarios u
      where u.id_auth = auth.uid()
        and u.role = 'admin'
    )
  );

------------------------------------------------
-- TRIGGERS
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
  nombre_meta text;
  telefono_meta text;
begin
  role := coalesce(new.raw_user_meta_data->>'role', 'cliente');
  nombre_meta := coalesce(new.raw_user_meta_data->>'nombre', split_part(new.email,'@',1));
  telefono_meta := coalesce(new.raw_user_meta_data->>'telefono', new.phone, '');
  new_id := coalesce(new.raw_user_meta_data->>'id', 'USR_' || substr(md5(new.id::text), 1, 12));

  insert into usuarios (
    id, id_auth, email, telefono, nombre, apellido, role, emailConfirmado
  ) values (
    new_id,
    new.id,
    new.email,
    telefono_meta,
    nombre_meta,
    '',
    role,
    new.email_confirmed_at is not null
  ) on conflict (email) do update set
    id_auth = excluded.id_auth,
    telefono = excluded.telefono,
    nombre = excluded.nombre,
    role = excluded.role,
    emailConfirmado = excluded.emailConfirmado;

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

-- Sincronizar datos básicos (email/telefono/nombre/role) al actualizar en Auth
create or replace function public.sync_auth_user_profile()
returns trigger
security definer
set search_path = public
language plpgsql
as $$
begin
  update usuarios
  set email = new.email,
      telefono = coalesce(new.raw_user_meta_data->>'telefono', new.phone, telefono),
      nombre = coalesce(new.raw_user_meta_data->>'nombre', nombre),
      role = coalesce(new.raw_user_meta_data->>'role', role)
  where id_auth = new.id;
  return new;
end $$;

create trigger trg_sync_auth_user_profile
after update of email, phone, raw_user_meta_data on auth.users
for each row execute function public.sync_auth_user_profile();
