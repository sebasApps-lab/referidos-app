-- 20250228_000001_flags_to_negocios_verificacion_update.sql
-- Move flags_confianza into negocios, reshape verificacion_negocio, add sucursales status.

BEGIN;

drop view if exists public.negocios_publicos;

drop table if exists public.flags_confianza;

alter table public.negocios
  add column if not exists verificacion_estado text default 'not_verified',
  add column if not exists puede_publicar boolean default false,
  add column if not exists puede_aparecer_publico boolean default false;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'negocios_verificacion_estado_check'
  ) then
    alter table public.negocios
      add constraint negocios_verificacion_estado_check
      check (verificacion_estado in ('pending', 'verified', 'rejected', 'not_verified'));
  end if;
end $$;

-- Verificacion de negocio (lockdown, reshape columns)
alter table public.verificacion_negocio
  drop constraint if exists verificacion_negocio_pkey;

alter table public.verificacion_negocio
  drop column if exists estado_verificacion,
  drop column if exists fuente,
  drop column if exists verificado_at,
  drop column if exists created_at,
  drop column if exists id,
  drop column if exists negocio_id,
  drop column if exists motivo,
  drop column if exists estado;

alter table public.verificacion_negocio
  add column if not exists id text default gen_random_uuid()::text,
  add column if not exists negocio_id text references public.negocios(id) on delete set null,
  add column if not exists ruc text,
  add column if not exists estado text,
  add column if not exists motivo text,
  add column if not exists fuente text,
  add column if not exists verificado_at timestamptz,
  add column if not exists created_at timestamptz default now();

alter table public.verificacion_negocio
  add primary key (id);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'verificacion_negocio_estado_check'
  ) then
    alter table public.verificacion_negocio
      add constraint verificacion_negocio_estado_check
      check (estado in ('pending', 'verified', 'rejected'));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'verificacion_negocio_fuente_check'
  ) then
    alter table public.verificacion_negocio
      add constraint verificacion_negocio_fuente_check
      check (fuente in ('admin', 'api', 'auto'));
  end if;
end $$;

alter table public.verificacion_negocio enable row level security;

drop policy if exists verificacion_negocio_select_blocked on public.verificacion_negocio;
create policy verificacion_negocio_select_blocked on public.verificacion_negocio
  for select
  using (false);

-- Sucursales status
alter table public.sucursales
  add column if not exists status text default 'draft';

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'sucursales_status_check'
  ) then
    alter table public.sucursales
      add constraint sucursales_status_check
      check (status in ('draft', 'active'));
  end if;
end $$;

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
left join public.sucursales s on s.negocioId = n.id and s.tipo = 'principal'
left join public.direcciones d on d.id = s.direccion_id
where n.puede_aparecer_publico = true;

grant select on public.negocios_publicos to anon, authenticated;

COMMIT;
