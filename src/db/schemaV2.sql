-- Elimina todas las tablas previas para asegurar limpieza total
drop table if exists reportes cascade;
drop table if exists comentarios cascade;
drop table if exists escaneos cascade;
drop table if exists qr_validos cascade;
drop table if exists promos_sucursales cascade;
drop table if exists promos cascade;
drop table if exists sucursales cascade;
drop table if exists negocios cascade;
drop table if exists usuarios cascade;

-- ============================================
-- USUARIOS
-- ============================================
create table usuarios (
  id text primary key,
  email text unique not null,
  password text not null,
  telefono text,
  nombre text,
  apellido text,
  cedula text,
  ruc text,
  role text not null,
  fechaCreacion timestamptz default now()
);

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
-- PROMO ↔ SUCURSAL
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
