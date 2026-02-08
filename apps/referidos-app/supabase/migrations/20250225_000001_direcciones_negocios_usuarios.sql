-- 20250225_000001_direcciones_negocios_usuarios.sql
-- Reestructura sucursales/direcciones y amplias columnas de seguridad.

BEGIN;

-- Direcciones
create table if not exists public.direcciones (
  id text primary key default gen_random_uuid()::text,
  calle_1 text,
  calle_2 text,
  referencia text,
  ciudad text,
  sector text,
  lat numeric,
  lng numeric,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Codigos de registro
create table if not exists public.codigosregistro (
  id text primary key default gen_random_uuid()::text,
  code text not null unique,
  role text not null default 'negocio',
  expires_at timestamptz,
  used_at timestamptz,
  used_by_user_id text references public.usuarios(id) on delete set null,
  created_by text references public.usuarios(id) on delete set null,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

-- Usuarios
alter table public.usuarios
  add column if not exists apodo text,
  add column if not exists imagen_perfil text,
  add column if not exists direccion_id text references public.direcciones(id) on delete set null,
  add column if not exists fecha_nacimiento date,
  add column if not exists primary_auth_method text,
  add column if not exists last_auth_method text,
  add column if not exists has_password boolean default false,
  add column if not exists has_pin boolean default false,
  add column if not exists has_biometrics boolean default false,
  add column if not exists has_google boolean default false,
  add column if not exists has_facebook boolean default false,
  add column if not exists has_apple boolean default false,
  add column if not exists has_instagram boolean default false,
  add column if not exists has_discord boolean default false,
  add column if not exists mfa_totp_enabled boolean default false,
  add column if not exists mfa_sms_enabled boolean default false,
  add column if not exists mfa_email_enabled boolean default false,
  add column if not exists mfa_method text,
  add column if not exists mfa_enrolled_at timestamptz,
  add column if not exists mfa_primary_method text,
  add column if not exists security_level text;

-- Negocios
alter table public.negocios
  add column if not exists direccion_id text references public.direcciones(id) on delete set null,
  add column if not exists horarios jsonb,
  add column if not exists tipo text default 'principal',
  add column if not exists categoria text;

-- Backfill direcciones desde negocios si existen columnas legacy
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'negocios'
      and column_name = 'direccion'
  ) then
    with to_insert as (
      select
        n.id as negocio_id,
        gen_random_uuid()::text as direccion_id,
        n.direccion as calle_1,
        n.sector as sector,
        n.lat as lat,
        n.lng as lng
      from public.negocios n
      where (n.direccion is not null or n.lat is not null or n.lng is not null)
        and n.direccion_id is null
    ),
    inserted as (
      insert into public.direcciones (id, calle_1, sector, lat, lng, created_at, updated_at)
      select direccion_id, calle_1, sector, lat, lng, now(), now()
      from to_insert
      on conflict (id) do nothing
      returning id
    )
    update public.negocios n
    set direccion_id = t.direccion_id
    from to_insert t
    where n.id = t.negocio_id;
  end if;
end$$;

-- Validar tipo (principal | sucursal)
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'negocios_tipo_check'
  ) then
    alter table public.negocios
      add constraint negocios_tipo_check
      check (tipo in ('principal', 'sucursal'));
  end if;
end$$;

-- Indices utiles
create index if not exists idx_negocios_direccion_id on public.negocios (direccion_id);
create index if not exists idx_usuarios_direccion_id on public.usuarios (direccion_id);
create index if not exists idx_codigosregistro_used_by on public.codigosregistro (used_by_user_id);
create index if not exists idx_codigosregistro_created_by on public.codigosregistro (created_by);

-- Remover columnas legacy y tabla sucursales
alter table public.negocios
  drop column if exists sector,
  drop column if exists direccion,
  drop column if exists lat,
  drop column if exists lng;

drop table if exists public.sucursales cascade;

-- Ajuste de RPC para evitar dependencia en negocios.sector
create or replace function public.get_qr_history(p_limit int default 50)
returns table(
  id uuid,
  code text,
  status public.qr_status,
  status_effective public.qr_status,
  created_at timestamptz,
  expires_at timestamptz,
  redeemed_at timestamptz,
  promo_id text,
  promo_titulo text,
  promo_descripcion text,
  promo_imagen text,
  negocio_nombre text,
  negocio_sector text
) language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  cliente text;
begin
  if uid is null then
    raise exception 'not_authenticated';
  end if;

  select u.id into cliente from public.usuarios u where u.id_auth = uid;
  if cliente is null then
    raise exception 'user_not_found';
  end if;

  return query
  select
    q.id,
    q.code,
    q.status,
    public.compute_qr_status(q.status, q.expires_at) as status_effective,
    q.created_at,
    q.expires_at,
    q.redeemed_at,
    q.promo_id,
    p.titulo,
    p.descripcion,
    p.imagen,
    n.nombre,
    d.sector as negocio_sector
  from public.qr_validos q
  join public.promos p on p.id = q.promo_id
  join public.negocios n on n.id = q.negocio_id
  left join public.direcciones d on d.id = n.direccion_id
  where q.cliente_id = cliente
  order by q.created_at desc
  limit p_limit;
end;
$$;

COMMIT;
