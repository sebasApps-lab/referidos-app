-- 20250228_000003_direcciones_place_provider.sql
-- Store external geocoding identifiers for addresses and add territorial tables.

BEGIN;

create table if not exists public.provincias (
  id text primary key,
  nombre text not null
);

create table if not exists public.cantones (
  id text primary key,
  provincia_id text references public.provincias(id) on delete restrict,
  nombre text not null
);

create index if not exists idx_cantones_provincia_id on public.cantones (provincia_id);

create table if not exists public.parroquias (
  id text primary key,
  canton_id text references public.cantones(id) on delete restrict,
  provincia_id text references public.provincias(id) on delete restrict,
  nombre text not null,
  tipo text
);

create index if not exists idx_parroquias_canton_id on public.parroquias (canton_id);
create index if not exists idx_parroquias_provincia_id on public.parroquias (provincia_id);

alter table public.direcciones
  add column if not exists place_id text,
  add column if not exists label text,
  add column if not exists provider text,
  add column if not exists provincia_id text references public.provincias(id) on delete set null,
  add column if not exists canton_id text references public.cantones(id) on delete set null;

create index if not exists idx_direcciones_provincia_id on public.direcciones (provincia_id);
create index if not exists idx_direcciones_canton_id on public.direcciones (canton_id);

alter table public.provincias enable row level security;
alter table public.cantones enable row level security;
alter table public.parroquias enable row level security;

drop policy if exists provincias_select_public on public.provincias;
create policy provincias_select_public on public.provincias
  for select to anon, authenticated
  using (true);

drop policy if exists cantones_select_public on public.cantones;
create policy cantones_select_public on public.cantones
  for select to anon, authenticated
  using (true);

drop policy if exists parroquias_select_public on public.parroquias;
create policy parroquias_select_public on public.parroquias
  for select to anon, authenticated
  using (true);

grant select on public.provincias to anon, authenticated;
grant select on public.cantones to anon, authenticated;
grant select on public.parroquias to anon, authenticated;

COMMIT;
