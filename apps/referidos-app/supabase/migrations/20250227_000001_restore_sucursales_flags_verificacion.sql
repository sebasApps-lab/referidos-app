-- 20250227_000001_restore_sucursales_flags_verificacion.sql
-- Restore sucursales with new columns, adjust negocios/usuarios, add flags tables and view.

BEGIN;

-- Sucursales (legacy schema with updated columns)
create table if not exists public.sucursales (
  id text primary key default gen_random_uuid()::text,
  negocioId text references public.negocios(id) on delete cascade,
  direccion_id text references public.direcciones(id) on delete set null,
  horarios jsonb,
  tipo text,
  imagen text,
  fechaCreacion timestamptz default now()
);

alter table public.sucursales
  add column if not exists direccion_id text references public.direcciones(id) on delete set null,
  add column if not exists horarios jsonb,
  add column if not exists tipo text,
  add column if not exists imagen text,
  add column if not exists fechaCreacion timestamptz default now();

alter table public.sucursales
  drop column if exists sector,
  drop column if exists lat,
  drop column if exists lng,
  drop column if exists direccion;

create index if not exists idx_sucursales_negocioId on public.sucursales(negocioId);

alter table public.sucursales enable row level security;

drop policy if exists sucursales_select_authenticated on public.sucursales;
drop policy if exists sucursales_insert_by_business on public.sucursales;
drop policy if exists sucursales_update_by_business on public.sucursales;
drop policy if exists sucursales_delete_by_business on public.sucursales;

create policy sucursales_select_authenticated on public.sucursales
  for select to authenticated
  using (true);

create policy sucursales_insert_by_business on public.sucursales
  for insert to authenticated
  with check (
    exists (
      select 1
      from public.negocios n
      join public.usuarios u on u.id = n.usuarioId
      where n.id = sucursales.negocioId
        and u.id_auth = auth.uid()
    )
  );

create policy sucursales_update_by_business on public.sucursales
  for update to authenticated
  using (
    exists (
      select 1
      from public.negocios n
      join public.usuarios u on u.id = n.usuarioId
      where n.id = sucursales.negocioId
        and u.id_auth = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.negocios n
      join public.usuarios u on u.id = n.usuarioId
      where n.id = sucursales.negocioId
        and u.id_auth = auth.uid()
    )
  );

create policy sucursales_delete_by_business on public.sucursales
  for delete to authenticated
  using (
    exists (
      select 1
      from public.negocios n
      join public.usuarios u on u.id = n.usuarioId
      where n.id = sucursales.negocioId
        and u.id_auth = auth.uid()
    )
  );

-- Negocios: add new fields, drop legacy
alter table public.negocios
  add column if not exists subcategoria text,
  add column if not exists verificado boolean default false,
  add column if not exists logo text;

alter table public.negocios
  drop column if exists direccion_id,
  drop column if exists imagen,
  drop column if exists horarios,
  drop column if exists tipo;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'negocios_usuarioid_unique'
  ) then
    alter table public.negocios
      add constraint negocios_usuarioid_unique unique (usuarioid);
  end if;
end $$;

-- Usuarios: add genero/has_twitter, drop ruc/has_instagram
alter table public.usuarios
  add column if not exists genero text,
  add column if not exists has_twitter boolean default false;

alter table public.usuarios
  drop column if exists ruc,
  drop column if exists has_instagram;

-- Verificacion de negocio (no frontend access)
create table if not exists public.verificacion_negocio (
  ruc text primary key,
  estado_verificacion text,
  verificado_at timestamptz,
  fuente text
);

alter table public.verificacion_negocio enable row level security;

drop policy if exists verificacion_negocio_select_blocked on public.verificacion_negocio;
create policy verificacion_negocio_select_blocked on public.verificacion_negocio
  for select
  using (false);

-- Flags de confianza (read-only from frontend)
create table if not exists public.flags_confianza (
  negocio_id text primary key references public.negocios(id) on delete cascade,
  puede_publicar boolean not null default false,
  puede_aparecer_publico boolean not null default false
);

alter table public.flags_confianza enable row level security;

drop policy if exists flags_confianza_select_owner on public.flags_confianza;
drop policy if exists flags_confianza_select_public on public.flags_confianza;

create policy flags_confianza_select_owner on public.flags_confianza
  for select to authenticated
  using (
    exists (
      select 1
      from public.negocios n
      join public.usuarios u on u.id = n.usuarioId
      where n.id = flags_confianza.negocio_id
        and u.id_auth = auth.uid()
    )
  );

create policy flags_confianza_select_public on public.flags_confianza
  for select
  using (puede_aparecer_publico = true);

-- Public view (RLS applies to base tables)
create or replace view public.negocios_publicos as
select
  n.id,
  n.nombre,
  d.sector,
  case
    when d.calle_1 is null then null
    when d.calle_2 is null or d.calle_2 = '' then d.calle_1
    else d.calle_1 || '|' || d.calle_2
  end as direccion,
  n.logo as logo_url
from public.negocios n
join public.flags_confianza f on f.negocio_id = n.id
left join public.sucursales s on s.negocioId = n.id and s.tipo = 'principal'
left join public.direcciones d on d.id = s.direccion_id
where f.puede_aparecer_publico = true;

grant select on public.negocios_publicos to anon, authenticated;

-- Ensure RLS enabled for all public tables
do $$
declare
  r record;
begin
  for r in
    select table_schema, table_name
    from information_schema.tables
    where table_schema = 'public'
      and table_type = 'BASE TABLE'
  loop
    execute format('alter table %I.%I enable row level security', r.table_schema, r.table_name);
  end loop;
end $$;

COMMIT;
