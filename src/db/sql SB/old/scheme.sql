-- src/db/schema.sql
-- Schema para Supabase (Postgres). Ejecutar en SQL editor de Supabase.
-- Idempotente (usa CREATE TABLE IF NOT EXISTS).

create table if not exists usuarios (
  id text primary key,
  nombre text,
  email text unique,
  password text,
  role text not null,
  telefono text,
  emailConfirmado boolean default false,
  referidosCount int default 0,
  fechaCreacion timestamptz default now()
);

create table if not exists negocios (
  id text primary key,
  usuarioId text references usuarios(id) on delete cascade,
  nombre text,
  categoria text,
  sector text,
  direccion text,
  lat numeric,
  lng numeric,
  imagen text,
  referidosCount int default 0,
  fechaCreacion timestamptz default now()
);

create table if not exists sucursales (
  id text primary key,
  negocioId text references negocios(id) on delete cascade,
  direccion text,
  sector text,
  lat numeric,
  lng numeric,
  imagen text,
  fechaCreacion timestamptz default now()
);

create table if not exists promos (
  id text primary key,
  negocioId text references negocios(id) on delete cascade,
  titulo text,
  descripcion text,
  inicio date,
  fin date,
  estado text default 'activo',
  canjeadosCount int default 0,
  imagen text,
  fechaCreacion timestamptz default now()
);

create table if not exists promos_sucursales (
  id serial primary key,
  promoId text references promos(id) on delete cascade,
  sucursalId text references sucursales(id) on delete cascade
);

create table if not exists comentarios (
  id text primary key,
  promoId text references promos(id) on delete cascade,
  clienteId text references usuarios(id) on delete cascade,
  estrellas numeric,
  texto text,
  fechaCreacion timestamptz default now()
);

create table if not exists qr_validos (
  id text primary key,
  promoId text references promos(id) on delete cascade,
  clienteId text references usuarios(id) on delete cascade,
  negocioId text references negocios(id) on delete cascade,
  sucursalId text,
  fechaCreacion timestamptz default now(),
  fechaExpira timestamptz,
  canjeado boolean default false,
  fechaCanje timestamptz
);

create table if not exists escaneos (
  id text primary key,
  qrValidoId text references qr_validos(id) on delete cascade,
  clienteId text references usuarios(id),
  fechaCreacion timestamptz default now()
);

create table if not exists reportes (
  id text primary key,
  reporterId text references usuarios(id),
  reporterRole text,
  targetId text,
  targetType text,
  texto text,
  fechaCreacion timestamptz default now()
);

create index if not exists idx_promos_negocio on promos(negocioId);
create index if not exists idx_qr_promo on qr_validos(promoId);
create index if not exists idx_qr_cliente on qr_validos(clienteId);
create index if not exists idx_coment_promo on comentarios(promoId);
