-- Enforce a single draft sucursal per negocio (and thus per usuario).

BEGIN;

create unique index if not exists sucursales_one_draft_per_negocio
  on public.sucursales(negocioId)
  where status = 'draft' and negocioId is not null;

-- Direcciones: unificar calles y agregar parroquia/parroquia_id
alter table public.direcciones
  add column if not exists parroquia text,
  add column if not exists parroquia_id text references public.parroquias(id) on delete set null;

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'direcciones'
      and column_name = 'calle_1'
  ) then
    if not exists (
      select 1 from information_schema.columns
      where table_schema = 'public'
        and table_name = 'direcciones'
        and column_name = 'calles'
    ) then
      alter table public.direcciones rename column calle_1 to calles;
    else
      update public.direcciones
      set calles = coalesce(nullif(calles, ''), calle_1)
      where calle_1 is not null;
      alter table public.direcciones drop column calle_1;
    end if;
  elsif not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'direcciones'
      and column_name = 'calles'
  ) then
    alter table public.direcciones add column calles text;
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'direcciones'
      and column_name = 'calle_2'
  ) then
    update public.direcciones
    set calles = trim(both ' ' from concat_ws(' ', calles, calle_2))
    where calle_2 is not null;
    alter table public.direcciones drop column calle_2;
  end if;
end $$;

create index if not exists idx_direcciones_parroquia_id
  on public.direcciones(parroquia_id);

create or replace view public.negocios_publicos as
select
  n.id,
  n.nombre,
  d.sector,
  d.calles as direccion,
  n.logo as logo_url
from public.negocios n
left join public.sucursales s on s.negocioId = n.id and s.tipo = 'principal'
left join public.direcciones d on d.id = s.direccion_id
where n.puede_aparecer_publico = true;

COMMIT;
